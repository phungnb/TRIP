// BuiTrip AI local — bộ não: học, nhớ, trả lời, tự học từ phản hồi.
// Port từ learner.py (hành vi giống hệt).
//
// Không gọi API nào, không cần mạng, không cần key. Chạy hoàn toàn bằng JS thuần.
// - load(kb, model, extra): nạp kho + mô hình NB đã huấn luyện + dữ liệu EXTRA.
// - ask(): phân loại ý định -> truy hồi kiến thức -> ghép câu trả lời (composer).
// - feedback(): người dùng sửa sai -> cộng điểm truy hồi cho token của tên
//   thực thể đúng (chỉ token tên điểm, KHÔNG token câu hỏi).
//
// Khác bản Python ở 1 điểm: bản Python feedback() huấn luyện lại NB từ
// train.jsonl rồi lưu model.json. Bản JS không ship train.jsonl nên KHÔNG
// huấn luyện lại — chỉ cộng boosts (phần này mới là thứ làm lần hỏi sau
// trả đúng thực thể). Boosts lưu vào localStorage (trình duyệt) hoặc giữ
// trong bộ nhớ (node) — không cần file model.
import { compose } from "./composer.js";
import { CITY_TO_PROVINCE, OLD_TO_NEW, normText, provKey, tokens } from "./normalize.js";
import { NaiveBayes } from "./naive-bayes.js";
import { Retriever } from "./retriever.js";
import { SessionContext, enrichEntry, extractSlots, parseCost, parseCostLow, premiseCheck } from "./slots.js";

function fmtVnd(n) {
  // Định dạng số VNĐ kiểu Việt Nam (4.800.000) — khớp format(x, ",") của Python.
  return String(Math.trunc(n)).replace(/\B(?=(\d{3})+(?!\d))/g, ".");
}

const STORAGE_KEY = "buitrip_ai_boosts";

function round3(x) {
  // Làm tròn 3 chữ số thập phân, NỬA LÊN. Python learner.py dùng cùng luật
  // (math.floor(x*1000+0.5)/1000) thay vì round(x, 3) làm tròn nửa chẵn —
  // lệch 0.001 ở ngưỡng .0005, thực tế 6/31 câu probe chạm ngưỡng (25/11/2026).
  return Math.round(x * 1000) / 1000;
}

function boostKey(token, idx) {
  return token + "\0" + idx;
}

const CITY_NORM = new Set(Object.keys(CITY_TO_PROVINCE).map((c) => normText(c)));

function namedInQuestion(name, featSet) {
  // Tên mục (hoặc phần mô tả trong ngoặc) có đầy đủ trong câu hỏi không.
  // Nới thêm: tên dài mà câu hỏi chỉ nhắc phần đầu (vd "Phù điêu bắt sống
  // phi công Mỹ" thiếu "John McCain") vẫn khớp khi chung >=4 token và >=60%
  // số token tên (gặp 24/11/2026: luật khớp đầy đủ bỏ sót mục này).
  const parts = [(name || "").split("(")[0].trim()];
  const m = (name || "").match(/\(([^)]*)\)/);
  if (m) parts.push(m[1]);
  for (const p of parts) {
    const toks = new Set(tokens(p));
    if (!toks.size) continue;
    if ([...toks].every((t) => featSet.has(t))) return true;
    const shared = [...toks].filter((t) => featSet.has(t)).length;
    if (shared >= 4 && shared / toks.size >= 0.6) return true;
  }
  return false;
}

function isCityOrOverview(name) {
  // Mục chỉ là tên thành phố hoặc mục tổng quan tỉnh.
  const n = normText((name || "").split("(")[0].trim());
  return CITY_NORM.has(n) || normText(name || "").includes("tong quan");
}

// Từ khóa lưu trú RÕ RÀNG (chuỗi đã chuẩn hóa, khớp trọn từ). Chỉ khi câu
// có 1 trong các cụm này mới được coi là hỏi chỗ ở — "ở đâu" đứng một mình
// KHÔNG đủ (lỗi thật 25/11/2026: "Rượu bầu đá ở đâu" ra homestay).
const LODGING_WORDS = ["khach san", "homestay", "resort", "nha nghi",
  "ngu o dau", "nghi o dau", "o dau ngon", "o dau re",
  "o dau tai", "o tai", "cho o", "o dem", "qua dem",
  "ngu dem", "ngu lai", "o lai", "thue phong"];

function hasLodgingWord(qn) {
  const padded = " " + (qn || "") + " ";
  return LODGING_WORDS.some((w) => padded.includes(" " + w + " "));
}

function whereSubject(q) {
  // Chủ thể X của câu '[X] ở đâu' (giữ dấu như người hỏi, vd 'Rượu bầu đá').
  // Bỏ các từ hỏi ở đầu/cuối ('ở đâu', 'cho mình hỏi'...). Trả null khi
  // không còn chủ thể (vd câu chỉ có 'ở đâu').
  let s = String(q || "").trim().replace(/[?!.]+$/, "").trim();
  s = s.replace(/^(cho\s+(minh\s+)?hoi|cho\s+hoi|xin\s+hoi)\s+/i, "").trim();
  s = s.replace(/\s*(ở\s+đâu|o\s+dau)\s*/gi, " ").trim();
  s = s.replace(/^(ở|đâu|o|dau)\s+/i, "").trim();
  s = s.replace(/\s+(ở|đâu|o|dau)$/i, "").trim();
  return s || null;
}

export class BuiTripAI {
  constructor(kb, model, extra) {
    this.kb = kb;
    this.extra = extra || {};
    this.retriever = new Retriever(kb);
    this.nb = new NaiveBayes().loadFromModel(model);
    // Boosts học từ phản hồi (model.boosts: [[token, chi_so_muc, diem], ...]).
    this.boosts = new Map();
    for (const [t, i, v] of model.boosts || []) this.boosts.set(boostKey(t, i), v);
    this.retriever.boosts = this.boosts; // cùng 1 Map để feedback cập nhật ngay
    this.historyEntities = [];
    // Tầng 2 — bộ nhớ hội thoại có cấu trúc (SessionContext).
    this.ctx = new SessionContext();
    // Tầng 3 — kho đã chuẩn hóa (suy trường mới từ dữ liệu sẵn có).
    this.kbEnriched = kb.map((e) => enrichEntry(e));
    // Tên tỉnh mới (từ kho) để nhận diện tỉnh trong câu hỏi
    const provs = new Set();
    for (const e of kb) {
      if (e.tinh && !e.loai) provs.add(provKey(e.tinh));
    }
    this.provinces = [...provs].sort();
    this.provinceNames = [...new Set(kb.map((e) => e.tinh).filter(Boolean))].sort();
    this._loadStoredBoosts();
  }

  // Trả về tên tỉnh mới (dạng chuẩn hóa) nếu câu hỏi nhắc 1 tỉnh/tỉnh cũ/thành phố.
  provinceOf(q) {
    // Thứ tự: (1) tên tỉnh mới nêu rõ, (2) thành phố, (3) tỉnh cũ — để
    // 'Vĩnh Long' thắng 'Long An' trong 'Vĩnh Long ăn gì' (tên tỉnh mới
    // phải thắng tỉnh cũ; lỗi thật 25/11/2026: Vĩnh Long bị neo về Tây Ninh).
    // Khớp trọn từ (đệm khoảng trắng) — 'vinh' trong 'vinh long' không được
    // gán về Nghệ An.
    const qn = normText(q);
    const padded = " " + qn + " ";
    for (const prov of this.provinces) {
      if (prov && padded.includes(" " + prov + " ")) return prov;
    }
    for (const [city, prov] of Object.entries(CITY_TO_PROVINCE)) {
      if (padded.includes(" " + normText(city) + " ")) return prov;
    }
    for (const [old, nw] of Object.entries(OLD_TO_NEW)) {
      if (padded.includes(" " + normText(old) + " ")) return nw;
    }
    return null;
  }

  ask(q) {
    // Tầng 1+2: trích slot, cập nhật context, gộp slot hiệu dụng
    const rawSlots = extractSlots(q, this.kb, this.provinceNames);
    this.ctx.update(rawSlots);
    const slots = this.ctx.effectiveSlots(rawSlots);
    // Tầng 1: kiểm tra tiền đề sai (đính chính lên đầu nếu có)
    const premise = premiseCheck(slots, this.kb);
    const feats = tokens(q);
    let [intent, probs] = this.nb.predict(feats);
    const conf = probs[intent] || 0.0;
    // Câu hỏi tiếp nối ("thế...", "còn...", "từ đó...") -> dùng thực thể vừa nhắc
    const qn = normText(q);
    const follow =
      qn.startsWith("the ") || qn.startsWith("con ") || qn.startsWith("tu do ") ||
      qn.startsWith("the con ") || qn.startsWith("o do ") ||
      qn.slice(0, 12).includes("the ");
    let entries = this.retriever.search(q, 3);
    if (intent === "vi_tri") {
      // NB đoán "vị trí" nhưng câu hỏi thực chất là hỏi chỗ ở hoặc
      // hỏi "[tỉnh/thành] ở đâu": lật về "o" (trừ khi nhắc đích danh
      // 1 chỗ ở cụ thể — "Khách sạn Sakura ở đâu" vẫn là vị trí
      // của khách sạn đó). Lỗi thật 25/11/2026: "ngủ ở đâu tại Hội An"
      // ra vị trí Phố cổ Hội An; "Đà Lạt ở đâu" ra Ga Đà Lạt.
      const qn = normText(q);
      const x0 = whereSubject(q);
      const xn0 = x0 ? normText(x0) : "";
      if (x0 && (CITY_NORM.has(xn0) || this.provinces.includes(xn0) ||
                 xn0.includes("tong quan"))) {
        intent = "o";
      } else if (hasLodgingWord(qn)) {
        const featSet = new Set(feats);
        const namedStay = entries.some(([ , e]) =>
          e.loai === "cho_o" && namedInQuestion(e.ten, featSet));
        if (!namedStay) intent = "o";
      }
    }
    if (intent === "o") {
      // Ý định chỗ ở CHỈ kích hoạt khi câu có từ khóa lưu trú RÕ RÀNG
      // (khách sạn, homestay, ngủ ở đâu, ở đâu tại [tỉnh]...), hoặc
      // hỏi "[tỉnh/thành] ở đâu". "[X] ở đâu" mà X là món/đặc sản/
      // địa danh thì TUYỆT ĐỐI KHÔNG trả danh sách homestay; X không
      // có trong kho thì trả thẳng "App chưa có thông tin về [X]".
      // Lỗi thật 25/11/2026: "Rượu bầu đá ở đâu" ra homestay Hà Giang.
      const qn = normText(q);
      if (!hasLodgingWord(qn)) {
        const x = whereSubject(q);
        const xn = x ? normText(x) : "";
        if (x && (CITY_NORM.has(xn) || this.provinces.includes(xn) ||
                  xn.includes("tong quan"))) {
          // "[tỉnh/thành] ở đâu" -> vẫn là hỏi chỗ ở ở đó.
        } else {
          const featSet = new Set(feats);
          let flipped = false;
          for (let j = 0; j < entries.length; j++) {
            const e = entries[j][1];
            if (e.loai === "cho_o") continue;
            if (isCityOrOverview(e.ten)) continue;
            // Khớp đích danh (đủ token / >=4 token) hoặc khớp
            // >= 2 token tên ("Bún chả" -> "Bún chả Hà Nội"):
            // đều là hỏi vị trí của X, không phải hỏi chỗ ở.
            const nameTok = new Set(tokens(e.ten || ""));
            let shared = 0;
            for (const t of nameTok) if (featSet.has(t)) shared++;
            if (namedInQuestion(e.ten, featSet) || shared >= 2) {
              intent = "vi_tri";
              entries = [entries[j], ...entries.slice(0, j), ...entries.slice(j + 1)];
              flipped = true;
              break;
            }
          }
          if (!flipped && !follow && x) {
            return {
              answer: "App chưa có thông tin về " + x + ".",
              intent,
              confidence: round3(conf),
              entity: null,
              entity_prov: null,
              score: 0.0,
              slots,
              premise,
            };
          }
        }
      }
    }
    if (intent === "vi_tri" && entries.length) {
      // Hỏi vị trí mà mục top không hề khớp tên hỏi (chung < 2 token)
      // thì đó là đáp án rác, không phải X: vd "Phở ở đâu" ra
      // Chùa Trúc Lâm. Trả thẳng "không có thông tin về X" (hoặc
      // dự phòng chung khi câu không có chủ thể, vd chỉ "ở đâu").
      // Câu nối tiếp (follow) được miễn — ngữ cảnh xử lý ở dưới.
      const top = entries[0][1];
      const nameTok = new Set(tokens(top.ten || ""));
      const featSet = new Set(feats);
      let shared = 0;
      for (const t of nameTok) if (featSet.has(t)) shared++;
      if (shared < 2) {
        const x = whereSubject(q);
        if (x && !follow) {
          return {
            answer: "App chưa có thông tin về " + x + ".",
            intent,
            confidence: round3(conf),
            entity: null,
            entity_prov: null,
            score: 0.0,
            slots,
            premise,
          };
        }
        entries = [];
      }
    }
    if (intent === "an" || intent === "o" || intent === "chi_phi") {
      // Món/chỗ ở/chi phí PHẢI neo theo tỉnh người hỏi, không lấy top chung chung
      const loai = { an: "mon_an", o: "cho_o", chi_phi: "chi_phi" }[intent];
      const prov = this.provinceOf(q);
      const anchored = this.retriever.search(q, 5, loai, true, prov);
      if (anchored.length) entries = anchored;
    }
    if (follow && this.historyEntities.length && (!entries.length || entries[0][0] < 0.3)) {
      // Truy hồi lại bằng tên thực thể vừa nhắc
      entries = this.retriever.search(this.historyEntities[this.historyEntities.length - 1], 3);
    }
    if ((intent === "gia_ve" || intent === "gio_mo_cua" || intent === "vi_tri" ||
         intent === "cach_di" || intent === "mua_dep" || intent === "diem_choi") &&
        entries.length && entries[0][1].loai &&
        !namedInQuestion(entries[0][1].ten, new Set(feats))) {
      // Hỏi về địa danh mà top hit lại là món/chỗ ở cùng tên
      // (vd "vé Hội An" ra "Cao lầu Hội An" thay vì "Phố cổ Hội An"):
      // ưu tiên mục địa danh (không có loai) trong top 3.
      // Nhưng KHÔNG hạ khi người hỏi nhắc đích danh quán/món đó
      // (vd "Bánh Khoái Hạnh Huế giá bao nhiêu" — quán có giá thật,
      // hạ xuống mục tổng quan tỉnh là sai; gặp 24/11/2026).
      for (let j = 1; j < entries.length; j++) {
        if (!entries[j][1].loai) {
          entries = [entries[j], ...entries.slice(0, j), ...entries.slice(j + 1)];
          break;
        }
      }
    }
    // Tầng 3: lọc thời gian (close_hour >= giờ hỏi, hoặc mở qua đêm)
    const tf = slots.time_filter;
    if (tf && tf.type === "after" && entries.length) {
      const hour = tf.hour;
      const kept = [];
      for (const [score, e] of entries) {
        const enr = this.kbEnriched.find((x) => x.ten === e.ten);
        const ch = enr ? enr.close_hour : null;
        if (ch === null || ch >= hour || ch <= 5.0) kept.push([score, e]);
      }
      if (kept.length) entries = kept;
    }
    let answer = compose(intent, entries, q, this.historyEntities, this.extra);
    // Tầng 3: tổng hợp đa ý định thành khối (khi >= 2 ý định)
    const multi = this._multiIntentBlocks(slots, q);
    if (multi) answer = multi + "\n\n" + answer;
    // Tầng 1: đính chính tiền đề sai lên ĐẦU câu trả lời
    if (premise) answer = premise.message + "\n\n" + answer;
    // Tầng 1: cảnh báo ngân sách khi nhân số người vượt budget
    const warn = this._budgetWarning(slots);
    if (warn) answer = answer + "\n\n" + warn;
    let entity = entries.length ? entries[0][1].ten || null : null;
    if (intent === "cach_di") {
      // Thực thể đúng là ĐIỂM ĐẾN trong bảng tuyến, không phải điểm xuất phát
      for (const t of this.extra.tuyen_di || []) {
        if (normText(q).includes(normText(t.den))) {
          entity = t.den;
          break;
        }
      }
    }
    if (entries.length) {
      this.historyEntities.push(entries[0][1].ten || "");
      this.historyEntities = this.historyEntities.slice(-3);
    }
    // Tỉnh của mục trả về (để app gắn nút "Mở cẩm nang"): lấy từ mục đầu,
    // không lấy từ tên thực thể (tên thành phố như "Quy Nhơn" không phải
    // tên mục trong kho nên tra tên sẽ không ra tỉnh).
    const entityProv = entries.length ? entries[0][1].tinh || null : null;
    return {
      answer,
      intent,
      confidence: round3(conf),
      entity,
      entity_prov: entityProv,
      score: entries.length ? round3(entries[0][0]) : 0.0,
      slots,
      premise,
    };
  }

  _multiIntentBlocks(slots, q) {
    const intents = slots.intents || [];
    if (intents.length < 2) return null;
    const prov = slots.province;
    const people = slots.people || 1;
    const days = slots.days || 2;
    const blocks = [];
    if (intents.includes("chi_phi") || slots.budget_vnd) {
      const est = this._estimateTrip(prov, people, days);
      if (est !== null && est !== undefined) {
        blocks.push("💰 Ước tính chi phí cho " + people + " người (" + days + "N" + Math.max(days - 1, 1) + "Đ): ~" + fmtVnd(est) + " VNĐ");
      }
    }
    if (intents.includes("di_dau") || intents.includes("lich_trinh")) {
      const spots = this._topForProvince(prov, null, 3);
      if (spots.length) blocks.push("🌲 Điểm đến: " + spots.join(", "));
    }
    if (intents.includes("an_gi")) {
      const dishes = this._topForProvince(prov, "mon_an", 3);
      if (dishes.length) blocks.push("🍲 Món nên thử: " + dishes.join(", "));
    }
    return blocks.length ? blocks.join("\n") : null;
  }

  _topForProvince(prov, loai, n) {
    const out = [];
    for (const e of this.kb) {
      if (prov && e.tinh !== prov) continue;
      if (loai && e.loai !== loai) continue;
      if (!loai && e.loai) continue;
      out.push((e.ten || "").split("(")[0].trim());
      if (out.length >= n) break;
    }
    return out;
  }

  _estimateTrip(prov, people, days) {
    // 'Tổng ước tính' đã là tổng cả chuyến/người nên KHÔNG nhân thêm số ngày.
    // Dùng đầu thấp của khoảng giá (mức tối thiểu đạt được) để ước tính
    // theo ngân sách người dùng nêu.
    for (const e of this.kb) {
      if (e.loai === "chi_phi" && (!prov || e.tinh === prov)) {
        let c = parseCostLow(e.gia || "");
        if (c === null || c === undefined) {
          const gc = e.ghi_chu || "";
          const m = gc.indexOf("Tổng ước tính");
          c = parseCostLow(m >= 0 ? gc.slice(m) : gc);
        }
        if (c) return c * people;
      }
    }
    return null;
  }

  _budgetWarning(slots) {
    const budget = slots.budget_vnd;
    const people = slots.people || 1;
    const days = slots.days || 2;
    if (!budget) return null;
    const est = this._estimateTrip(slots.province, people, days);
    if (est && est > budget) {
      return "⚠️ Với " + people + " người, ước tính ~" + fmtVnd(est) + " VNĐ đã vượt ngân sách " + fmtVnd(budget) + " VNĐ của bạn. Bạn có thể rút ngắn ngày hoặc chọn chỗ ở rẻ hơn.";
    }
    return null;
  }

  // Sửa sai: chỉ tăng điểm cho token trong TÊN ĐIỂM (vd 'lăng', 'bác') —
  // tăng token chung trong câu hỏi (vd 'mấy', 'giờ', 'mở', 'cửa') sẽ làm
  // điểm đó lấn mọi câu hỏi khác có chung từ đó (lỗi cũ đã sửa ở bản Python).
  feedback(q, correctIntent, correctEntityName) {
    if (correctEntityName) {
      const idx = this.retriever.indexOf(correctEntityName);
      if (idx >= 0) {
        for (const t of new Set(tokens(correctEntityName))) {
          const k = boostKey(t, idx);
          this.boosts.set(k, (this.boosts.get(k) || 0) + 0.35);
        }
      }
    }
    this._saveStoredBoosts();
    return true;
  }

  // --- Lưu/đọc boosts đã học (trình duyệt: localStorage; node: bỏ qua) ---
  _loadStoredBoosts() {
    try {
      if (typeof localStorage === "undefined") return;
      const raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) return;
      for (const [t, i, v] of JSON.parse(raw)) this.boosts.set(boostKey(t, i), v);
    } catch (e) { /* bộ nhớ trình duyệt bị chặn/không có — học trong phiên thôi */ }
  }

  _saveStoredBoosts() {
    try {
      if (typeof localStorage === "undefined") return;
      const arr = [...this.boosts.entries()].map(([k, v]) => {
        const sep = k.lastIndexOf("\0");
        return [k.slice(0, sep), Number(k.slice(sep + 1)), v];
      });
      localStorage.setItem(STORAGE_KEY, JSON.stringify(arr));
    } catch (e) { /* lưu không được thì thôi, boosts vẫn có trong bộ nhớ */ }
  }
}
