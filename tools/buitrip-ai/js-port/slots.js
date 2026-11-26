/* BuiTrip AI — Tầng 1+2: trích xuất slot, bộ nhớ hội thoại, kiểm tra tiền đề.
 * Port hành vi giống hệt tools/buitrip-ai/slots.py.
 * Mọi thay đổi logic ở đây PHẢI đổi y hệt bên Python (và ngược lại) —
 * kiểm bằng bộ stress test (test_stress.py / test_stress.mjs).
 */
import { CITY_TO_PROVINCE, normText, provKey } from "./normalize.js";

// Alias địa danh -> tỉnh mới. CHỈ dùng khi câu hỏi KHÔNG nêu tên tỉnh rõ ràng.
const SPOT_TO_PROVINCE = {
  "tam dao": "Phú Thọ",
  "ta xua": "Sơn La",
  "moc chau": "Sơn La",
  "chua huong": "Hà Nội",
  "huong son": "Hà Nội",
  "ruou bau da": "Gia Lai",
};

const EXTRA_ALIAS = {
  "tphcm": "TP Hồ Chí Minh",
  "tp hcm": "TP Hồ Chí Minh",
  "ho chi minh": "TP Hồ Chí Minh",
  "sai gon": "TP Hồ Chí Minh",
  "vung tau": "TP Hồ Chí Minh",
  "ba ria vung tau": "TP Hồ Chí Minh",
  "da lat": "Lâm Đồng",
  "mui ne": "Lâm Đồng",
  "phan thiet": "Lâm Đồng",
  "phu quoc": "An Giang",
  "nha trang": "Khánh Hòa",
  "quy nhon": "Gia Lai",
  "hoi an": "Đà Nẵng",
  "sa pa": "Lào Cai",
  "ha long": "Quảng Ninh",
};

function provNorm(name) { return provKey(name || ""); }

const CITY_NORM = new Set(Object.keys(CITY_TO_PROVINCE).map((c) => normText(c)));

function isCityOrOverview(name) {
  const n = normText((name || "").split("(")[0].trim());
  return CITY_NORM.has(n) || normText(name || "").includes("tong quan");
}

function hasWord(text, phrase) {
  // Cụm phrase có xuất hiện trọn từ trong text không (đệm khoảng trắng
  // 2 đầu). Chặn kiểu chuỗi con xuyên từ: 'hue' trong 'huee', 'an' trong
  // 'phan' — từ đơn chỉ được gán tỉnh khi khớp trọn từ (25/11/2026).
  return !!phrase && (" " + (text || "") + " ").includes(" " + phrase + " ");
}

export function detectProvince(qn, provinces, skipOriginText) {
  let text = qn;
  if (skipOriginText) text = text.split(skipOriginText).join(" ");
  // (1) tên tỉnh nêu rõ
  for (const prov of provinces || []) {
    if (prov && hasWord(text, provNorm(prov))) return prov;
  }
  // (2) thành phố/khu du lịch -> tỉnh
  for (const [alias, prov] of Object.entries(EXTRA_ALIAS)) {
    if (hasWord(text, alias)) return prov;
  }
  for (const [city, prov] of Object.entries(CITY_TO_PROVINCE)) {
    if (hasWord(text, normText(city))) return prov;
  }
  // (3) alias địa danh (chỉ khi không có tên tỉnh/thành nào)
  for (const [alias, prov] of Object.entries(SPOT_TO_PROVINCE)) {
    if (hasWord(text, alias)) return prov;
  }
  return null;
}

const TRANSPORT_WORDS = [
  ["tau-hoa", ["tau hoa", "tàu hỏa", "tàu hoả", "tau lua", "duong sat"]],
  ["may-bay", ["may bay", "máy bay", "hang khong", "chuyen bay", "bay "]],
  ["xe-khach", ["xe khach", "xe khách", "limousine", "xe giuong nam", "xe giường nằm"]],
  ["xe-may", ["xe may", "xe máy", "thue xe may", "thuê xe máy"]],
  ["o-to", ["o to", "ô tô", "o-to", "taxi", "grab", "xe hoi", "xe hơi"]],
];

function parseMoney(qn) {
  const m = qn.match(/(\d+(?:[.,]\d+)?)\s*(trieu|triệu|tr|k|nghin|nghìn|dong|đồng|d)\b/);
  if (!m) return null;
  const val = parseFloat(m[1].replace(",", "."));
  const unit = m[2];
  if (unit === "trieu" || unit === "triệu" || unit === "tr") return Math.trunc(val * 1000000);
  if (unit === "k") return Math.trunc(val * 1000);
  if (unit === "nghin" || unit === "nghìn") return Math.trunc(val * 1000);
  return Math.trunc(val);
}

function parseTimeFilter(qn) {
  let m = qn.match(/sau\s+(\d{1,2})\s*h/);
  if (m) return { type: "after", hour: parseFloat(m[1]) };
  if (qn.includes("sang som") || qn.includes("sáng sớm")) return { type: "between", hours: [4.0, 7.0] };
  if (qn.includes("mo khuya") || qn.includes("mở khuya") || qn.includes("khuya")) return { type: "after", hour: 22.0 };
  if (qn.includes("ban dem") || qn.includes("ban đêm") || qn.includes("ve dem") || qn.includes("về đêm")) return { type: "after", hour: 20.0 };
  return null;
}

const VIBE_WORDS = [
  ["yen-tinh", ["yen tinh", "yên tĩnh", "yen binh", "yên bình", "thu gian", "thư giãn"]],
  ["khong-dong", ["khong dong", "không đông", "vang", "vắng", "it nguoi", "ít người"]],
  ["gia-dinh", ["gia dinh", "gia đình", "tre em", "trẻ em", "con nho", "con nhỏ"]],
  ["san-may", ["san may", "săn mây", "may", "mây"]],
  ["mo-khuya", ["mo khuya", "mở khuya", "khuya", "ve dem", "về đêm"]],
];

const INTENT_WORDS = [
  ["di_dau", ["choi gi", "chơi gì", "di dau", "đi đâu", "co gi choi", "có gì chơi",
              "diem nao", "điểm nào", "tham quan", "di choi", "đi chơi"]],
  ["an_gi", ["an gi", "ăn gì", "mon ngon", "món ngon", "dac san", "đặc sản",
             "quan an", "quán ăn", "an o dau", "ăn ở đâu"]],
  ["chi_phi", ["het bao nhieu", "hết bao nhiêu", "chi phi", "chi phí", "gia bao nhieu",
               "giá bao nhiêu", "tien", "tiền", "bao nhieu tien", "bao nhiêu tiền",
               "het bao nhieu tien", "ngan sach", "ngân sách"]],
  ["lich_trinh", ["lich trinh", "lịch trình", "may ngay", "mấy ngày", "ngay", "ngày",
                  "dem", "đêm", "3n2d", "2n1d", "ke hoach", "kế hoạch"]],
  ["di_chuyen", ["di bang gi", "đi bằng gì", "di chuyen", "di chuyển", "tu ", "từ ",
                 "xuat phat", "xuất phát", "phuong tien", "phương tiện", "tau hoa",
                 "tàu hỏa", "may bay", "máy bay", "xe khach", "xe khách"]],
  ["cho_o", ["o dau", "ở đâu", "cho o", "chỗ ở", "khach san", "khách sạn",
             "homestay", "nghi o dau", "nghỉ ở đâu", "phong", "phòng"]],
  ["gio_mo_cua", ["mo cua", "mở cửa", "dong cua", "đóng cửa", "gio mo", "giờ mở",
                  "may gio", "mấy giờ"]],
  ["mua_dep", ["mua nao dep", "mùa nào đẹp", "thang may dep", "tháng mấy đẹp",
               "di thang may", "đi tháng mấy", "mua dep", "mùa đẹp"]],
];

export function extractSlots(query, kb, provinces) {
  const qn = normText(query || "");
  const slots = { province: null, spot: null, origin: null, days: null,
                  people: null, budget_vnd: null, transport: null,
                  time_filter: null, vibe_tags: [], intents: [] };
  // origin TRƯỚC (chỉ bắt khi có "từ X" / "xuất phát từ X").
  let originText = null;
  let m = qn.match(/(xuat phat tu|xuất phát từ|tu|từ)\s+([a-z ]{3,30}?)(?:\s+di|\s+den|\s+đến|\s*$)/);
  if (m) {
    originText = m[0];
    const cand = m[2].trim();
    const prov = detectProvince(cand, provinces);
    slots.origin = prov || cand;
  }
  slots.province = detectProvince(qn, provinces, originText);
  if (kb) {
    let best = null;
    for (const e of kb) {
      // Cắt phần trong ngoặc TRƯỚC khi chuẩn hóa (normText đã bỏ dấu ngoặc).
      // Bỏ qua tên thành phố/mục tổng quan tỉnh (không phải spot).
      const raw = (e.ten || "").split("(")[0].trim();
      const base = normText(raw);
      if (isCityOrOverview(e.ten)) continue;
      if (base.length >= 4 && qn.includes(base)) {
        if (best === null || base.length > best.length) best = base;
      }
    }
    if (best) slots.spot = best;
  }
  // spot ngoài kho (vd Tam Đảo, Tà Xùa chưa có trong kho): bắt theo tên
  // địa danh nổi tiếng để Premise Check vẫn làm việc.
  if (!slots.spot) {
    for (const alias of Object.keys(SPOT_TO_PROVINCE)) {
      if (qn.includes(alias)) { slots.spot = alias; break; }
    }
  }
  m = qn.match(/(\d+)\s*ngay/);
  if (m) slots.days = parseInt(m[1], 10);
  else if (qn.includes("di trong ngay") || qn.includes("đi trong ngày") || qn.includes("trong ngay")) slots.days = 1;
  m = qn.match(/(\d+)\s*(?:nguoi|người|ban|bạn)/);
  if (m) slots.people = parseInt(m[1], 10);
  else {
    const g = qn.match(/nhom\s+(\d+)/);
    if (g) slots.people = parseInt(g[1], 10);
  }
  slots.budget_vnd = parseMoney(qn);
  for (const [code, words] of TRANSPORT_WORDS) {
    if (words.some((w) => qn.includes(w))) { slots.transport = code; break; }
  }
  slots.time_filter = parseTimeFilter(qn);
  for (const [code, words] of VIBE_WORDS) {
    if (words.some((w) => qn.includes(w)) && !slots.vibe_tags.includes(code)) slots.vibe_tags.push(code);
  }
  for (const [code, words] of INTENT_WORDS) {
    if (words.some((w) => qn.includes(w)) && !slots.intents.includes(code)) slots.intents.push(code);
  }
  // Có ngân sách -> cũng là ý định chi phí.
  if (slots.budget_vnd !== null && slots.budget_vnd !== undefined && !slots.intents.includes("chi_phi")) slots.intents.push("chi_phi");
  return slots;
}

export class SessionContext {
  constructor() {
    this.province = null;
    this.area_cluster = null;
    this.spot = null;
    this.origin = null;
    this.days = null;
    this.people = null;
    this.budget_vnd = null;
    this.vibe_tags = [];
    this.last_intents = [];
    this.last_item_ids = [];
    this.time_filter = null;
  }
  toDict() {
    return { province: this.province, area_cluster: this.area_cluster,
             spot: this.spot, origin: this.origin, days: this.days,
             people: this.people, budget_vnd: this.budget_vnd,
             vibe_tags: [...this.vibe_tags],
             last_intents: [...this.last_intents],
             last_item_ids: [...this.last_item_ids] };
  }
  update(slots) {
    const newProv = slots.province;
    const newSpot = slots.spot;
    if (newProv || newSpot) {
      if (newProv && newProv !== this.province) {
        this.province = newProv;
        this.spot = newSpot;
        this.days = slots.days != null ? slots.days : null;
        this.area_cluster = null;
      } else if (newSpot && newSpot !== this.spot) {
        this.spot = newSpot;
        this.days = slots.days != null ? slots.days : null;
      } else {
        this.province = newProv || this.province;
        this.spot = newSpot || this.spot;
      }
      if (slots.people != null) this.people = slots.people;
      if (slots.origin) this.origin = slots.origin;
      if (slots.budget_vnd != null) this.budget_vnd = slots.budget_vnd;
    } else {
      if (slots.days != null) this.days = slots.days;
      if (slots.people != null) this.people = slots.people;
      if (slots.origin) this.origin = slots.origin;
      if (slots.budget_vnd != null) this.budget_vnd = slots.budget_vnd;
    }
    if (slots.time_filter != null) this.time_filter = slots.time_filter;
    for (const t of slots.vibe_tags || []) {
      if (!this.vibe_tags.includes(t)) this.vibe_tags.push(t);
    }
    if (slots.intents && slots.intents.length) this.last_intents = [...slots.intents];
    return this;
  }
  effectiveSlots(slots) {
    const out = { ...slots };
    if (!out.province) out.province = this.province;
    if (!out.spot) out.spot = this.spot;
    if (!out.origin) out.origin = this.origin;
    if (out.days == null) out.days = this.days;
    if (out.people == null) out.people = this.people;
    if (out.budget_vnd == null) out.budget_vnd = this.budget_vnd;
    if (!out.time_filter) out.time_filter = this.time_filter;
    const tags = [...this.vibe_tags];
    for (const t of out.vibe_tags || []) {
      if (!tags.includes(t)) tags.push(t);
    }
    out.vibe_tags = tags;
    return out;
  }
}

const HOUR_RE = /(\d{1,2})[:h](\d{2})?\s*[–\-~]\s*(\d{1,2})[:h](\d{2})?/;
const MONEY_RE = /(\d{1,3}(?:\.\d{3})+|\d+)\s*(?:–|-)\s*(\d{1,3}(?:\.\d{3})+|\d+)/;
const MONEY_ONE = /(\d{1,3}(?:\.\d{3})+|\d+)\s*đ/;
const MONTH_RE = /[Tt]háng\s+(\d{1,2})\s*[–\-]\s*(\d{1,2})/g;

function num(x) { return parseInt(String(x).replace(/\./g, ""), 10); }

export function parseHours(gioText) {
  const t = gioText || "";
  if (t.includes("24/7") || t.includes("24/24")) return [0.0, 24.0];
  const m = t.match(HOUR_RE);
  if (m) {
    const oh = parseFloat(m[1]) + (parseFloat(m[2] || "0") / 60.0);
    const ch = parseFloat(m[3]) + (parseFloat(m[4] || "0") / 60.0);
    return [oh, ch];
  }
  return [null, null];
}

export function parseCost(giaText) {
  const t = (giaText || "").replace(/~/g, "");
  if (/miễn phí/i.test(t) && !/\d/.test(t)) return 0;
  let m = t.match(MONEY_RE);
  if (m) return Math.trunc((num(m[1]) + num(m[2])) / 2);
  m = t.match(MONEY_ONE);
  if (m) return num(m[1]);
  return null;
}

export function parseCostLow(giaText) {
  // Đầu thấp của khoảng giá (để ước tính theo ngân sách).
  const t = (giaText || "").replace(/~/g, "");
  if (/miễn phí/i.test(t) && !/\d/.test(t)) return 0;
  let m = t.match(MONEY_RE);
  if (m) return num(m[1]);
  m = t.match(MONEY_ONE);
  if (m) return num(m[1]);
  return null;
}

export function parseSeason(muaDepText) {
  const t = muaDepText || "";
  const months = [];
  MONTH_RE.lastIndex = 0;
  let m;
  while ((m = MONTH_RE.exec(t)) !== null) {
    const a = parseInt(m[1], 10), b = parseInt(m[2], 10);
    if (a >= 1 && a <= 12 && b >= 1 && b <= 12) {
      let cur = a;
      while (true) {
        months.push(cur);
        if (cur === b) break;
        cur = (cur % 12) + 1;
        if (months.length > 12) break;
      }
    }
  }
  const seen = [];
  for (const x of months) if (!seen.includes(x)) seen.push(x);
  return { best_months: seen, description: t.slice(0, 200) };
}

export function enrichEntry(e) {
  const [oh, ch] = parseHours(e.gio || "");
  const out = { ...e };
  out.aliases = [normText(e.ten || "")];
  out.tags = [];
  const loai = e.loai || "";
  if (loai === "mon_an") out.tags.push("am-thuc");
  else if (loai === "cho_o") out.tags.push("luu-tru");
  else if (!loai) out.tags.push("dia-danh");
  out.hours_raw = e.gio || "";
  out.open_hour = oh;
  out.close_hour = ch;
  out.transports_available = [];
  out.season = parseSeason(e.mua_dep || "");
  out.cost_per_person_avg = parseCost(e.gia || "");
  return out;
}

export const NO_TRAIN_SPOTS = new Set(["tam dao", "tà xùa", "ta xua", "pha luong", "pha đin"]);

export function premiseCheck(slots, kb) {
  const qProv = slots.province;
  const spot = slots.spot;
  const transport = slots.transport;
  if (spot && qProv && kb) {
    for (const e of kb) {
      const raw = (e.ten || "").split("(")[0].trim();
      if (normText(raw) === spot) {
        const real = e.tinh;
        if (real && provNorm(real) !== provNorm(qProv)) {
          const hours = e.gio || "";
          const [oh, ch] = parseHours(hours);
          let hrs = "";
          if (oh !== null && ch !== null) {
            hrs = " Thời gian mở cửa đón khách từ " + fmtHour(oh) + " đến " + fmtHour(ch) + " hàng ngày.";
          }
          return { type: "wrong_province",
                   message: prettySpot(e.ten) + " thuộc địa phận " + real + ", không phải " + qProv + "." + hrs };
        }
        break;
      }
    }
  }
  if (transport === "tau-hoa" && spot) {
    if (NO_TRAIN_SPOTS.has(spot) || spot.includes("tam dao")) {
      return { type: "no_train",
               message: "Tam Đảo hiện không có tuyến tàu hỏa đến trực tiếp. "
                 + "Bạn có thể đi xe khách hoặc limousine từ Hà Nội với "
                 + "chi phí khoảng 150.000 – 200.000 VNĐ/lượt." };
    }
  }
  return null;
}

function fmtHour(h) {
  const hh = Math.floor(h);
  const mm = Math.round((h - hh) * 60);
  return String(hh).padStart(2, "0") + ":" + String(mm).padStart(2, "0");
}

function prettySpot(ten) {
  return (ten || "").split("(")[0].trim() || (ten || "");
}
