// Chuẩn hóa tiếng Việt cho BuiTrip AI — port từ normalize.py (hành vi giống hệt).
//
// Quy tắc bắt buộc (đã kiểm chứng bằng lỗi thật): đổi đ->d TRƯỚC khi tách dấu NFD,
// vì Đ/đ không tách ra bằng NFD — không đổi trước thì "đất" thành "at", "Đại" thành "ai".

// Viết tắt hay gặp trong câu hỏi thật trên diễn đàn (qn = Quy Nhơn...).
// Đổi TRƯỚC khi tách token để mọi bước (phân loại, truy hồi) đều hiểu.
export const ALIASES = {
  qn: "quy nhon", hn: "ha noi", sg: "sai gon",
  hcm: "tp ho chi minh", dn: "da nang", dl: "da lat",
  pq: "phu quoc", nt: "nha trang", hg: "ha giang",
  cb: "cao bang", lc: "lao cai", hp: "hai phong",
};

// Thành phố/khu du lịch -> tỉnh mới (để "ăn gì ở Quy Nhơn" tìm đúng món Gia Lai).
// Khóa là tên hiển thị (có dấu); lúc khớp phải qua normText().
export const CITY_TO_PROVINCE = {
  "Quy Nhơn": "Gia Lai", "Pleiku": "Gia Lai", "An Khê": "Gia Lai",
  "Nha Trang": "Khánh Hòa", "Cam Ranh": "Khánh Hòa",
  "Đà Lạt": "Lâm Đồng", "Bảo Lộc": "Lâm Đồng", "Phan Thiết": "Lâm Đồng",
  "Mũi Né": "Lâm Đồng", "La Gi": "Lâm Đồng",
  "Hội An": "Đà Nẵng", "Đà Nẵng": "Đà Nẵng",
  "Huế": "Huế", "Quảng Trị": "Quảng Trị", "Đồng Hới": "Quảng Trị",
  "Phong Nha": "Quảng Trị", "Sa Pa": "Lào Cai", "Lào Cai": "Lào Cai",
  "Hạ Long": "Quảng Ninh", "Cát Bà": "Hải Phòng", "Hải Phòng": "Hải Phòng",
  "Hà Nội": "Hà Nội", "TP Hồ Chí Minh": "TP Hồ Chí Minh",
  "Sài Gòn": "TP Hồ Chí Minh", "Vũng Tàu": "TP Hồ Chí Minh",
  "Cần Giờ": "TP Hồ Chí Minh", "Củ Chi": "TP Hồ Chí Minh",
  "Phú Quốc": "An Giang", "Rạch Giá": "An Giang", "Hà Tiên": "An Giang",
  "Nam Du": "An Giang", "Châu Đốc": "An Giang", "Long Xuyên": "An Giang",
  "Côn Đảo": "TP Hồ Chí Minh", "Phú Quý": "Lâm Đồng",
  "Măng Đen": "Quảng Ngãi", "Kon Tum": "Quảng Ngãi", "Lý Sơn": "Quảng Ngãi",
  "Quảng Ngãi": "Quảng Ngãi",
  "Buôn Ma Thuột": "Đắk Lắk", "Đắk Lắk": "Đắk Lắk", "Tuy Hòa": "Đắk Lắk",
  "Phan Rang": "Khánh Hòa", "Ninh Thuận": "Khánh Hòa",
  "Cần Thơ": "Cần Thơ", "Cà Mau": "Cà Mau", "Sóc Trăng": "Cần Thơ",
  "Bến Tre": "Vĩnh Long", "Mỹ Tho": "Đồng Tháp", "Cao Lãnh": "Đồng Tháp",
  "Sa Đéc": "Đồng Tháp", "Trà Vinh": "Vĩnh Long", "Vĩnh Long": "Vĩnh Long",
  "Tây Ninh": "Tây Ninh", "Biên Hòa": "Đồng Nai", "Vinh": "Nghệ An",
  "Thanh Hóa": "Thanh Hóa", "Sầm Sơn": "Thanh Hóa",
  "Ninh Bình": "Ninh Bình", "Tam Cốc": "Ninh Bình",
  "Hà Giang": "Tuyên Quang", "Đồng Văn": "Tuyên Quang",
  "Cao Bằng": "Cao Bằng", "Điện Biên": "Điện Biên",
  "Mộc Châu": "Sơn La", "Sơn La": "Sơn La",
  "Thái Nguyên": "Thái Nguyên", "Lạng Sơn": "Lạng Sơn",
  "Bắc Giang": "Bắc Ninh", "Bắc Ninh": "Bắc Ninh",
  "Hải Dương": "Hải Phòng", "Hưng Yên": "Hưng Yên",
  "Vĩnh Phúc": "Phú Thọ", "Phú Thọ": "Phú Thọ",
  "Hòa Bình": "Phú Thọ", "Thái Bình": "Hưng Yên",
};

// Tỉnh cũ -> tỉnh mới sau sáp nhập 01/07/2025 (từ data_gen.py).
export const OLD_TO_NEW = {
  "Bình Định": "Gia Lai", "Quảng Bình": "Quảng Trị", "Hà Giang": "Tuyên Quang",
  "Kiên Giang": "An Giang", "Bà Rịa-Vũng Tàu": "TP Hồ Chí Minh",
  "Đắk Nông": "Lâm Đồng", "Kon Tum": "Quảng Ngãi", "Phú Yên": "Đắk Lắk",
  "Ninh Thuận": "Khánh Hòa", "Bến Tre": "Vĩnh Long", "Tiền Giang": "Đồng Tháp",
  "Long An": "Tây Ninh", "Hậu Giang": "Cần Thơ", "Sóc Trăng": "Cần Thơ",
  "Bình Dương": "TP Hồ Chí Minh", "Bình Phước": "Đồng Nai",
  "Thái Bình": "Hưng Yên", "Bắc Kạn": "Thái Nguyên", "Vĩnh Phúc": "Phú Thọ",
  "Quảng Nam": "Đà Nẵng", "Bình Thuận": "Lâm Đồng",
};

const ALIAS_RE = Object.entries(ALIASES).map(
  ([short, full]) => [new RegExp(`\\b${short}\\b`, "g"), full],
);

// Chuẩn hóa tên tỉnh để so sánh: bỏ 'thành phố/tp', chỉ giữ token lõi.
export function provKey(s) {
  const toks = normText(s || "").split(" ").filter((t) => t !== "" && t !== "thanh" && t !== "pho" && t !== "tp");
  return toks.join(" ");
}

// Tỉnh trong kho có phải tỉnh người hỏi không (so theo token lõi).
export function sameProvince(tinhEntry, provNorm) {
  if (!tinhEntry || !provNorm) return false;
  const a = provKey(tinhEntry);
  const b = provKey(provNorm);
  return a === b || a.includes(b) || b.includes(a);
}

export function normText(s) {
  let out = (s || "").toLowerCase().replace(/đ/g, "d");
  out = out.normalize("NFD").replace(/\p{Mn}/gu, "");
  out = out.replace(/[^a-z0-9 ]+/g, " ");
  out = out.replace(/\s+/g, " ").trim();
  for (const [re, full] of ALIAS_RE) out = out.replace(re, full);
  return out;
}

// Dạng viết liền của tên tỉnh/thành 2 chữ ("sapa" = "sa pa"): câu hỏi thật
// hay viết liền; tách ra trong tokens() để khớp với dữ liệu (kho ghi "Sa Pa").
// Chỉ tách khi token ĐÚNG bằng dạng viết liền của 1 tên có thật — không tách
// "la", "an", "du" đứng riêng (chúng là từ thường).
const JOINED_PLACE = {};
for (const nm of [...Object.keys(CITY_TO_PROVINCE), ...Object.values(CITY_TO_PROVINCE), ...Object.keys(OLD_TO_NEW), ...Object.values(OLD_TO_NEW)]) {
  const t = normText(nm).split(" ").filter(Boolean);
  if (t.length > 1) JOINED_PLACE[t.join("")] = t;
}

// Token + bigram (giúp khớp 'quy nhon', 'ba na', 'sapa'...).
export function tokens(s) {
  const t = normText(s).split(" ").filter(Boolean);
  // Tách tên viết liền ("sapa" -> "sa", "pa") để khớp dữ liệu.
  const exp = [];
  for (const tok of t) exp.push(...(JOINED_PLACE[tok] || [tok]));
  const feats = [...exp];
  for (let i = 0; i + 1 < exp.length; i++) feats.push(`${exp[i]}_${exp[i + 1]}`);
  return feats;
}

// Từ hỏi/chức năng + từ theo ý định + loại địa danh chung + tính từ chung.
// Dùng để tìm "token cụ thể" trong câu hỏi (luật chặn khớp giả, 24/11/2026):
// token nào còn lại sau khi bỏ các từ này và tên tỉnh/thành phố thì là thứ
// cụ thể người hỏi nhắc đích danh (vd "quốc lộ 51" còn lại "quoc lo 51").
// Bỏ sót 1 từ ở đây thì câu đó chỉ thành "chung chung" (không chặn) — an toàn;
// bỏ thừa 1 từ thì câu đó có thể bị chặn nhầm -> rơi về trợ lý cũ (cũng an toàn).
export const QUESTION_WORDS = new Set([
  // Từ chức năng / từ hỏi chung
  "co", "o", "la", "cua", "va", "voi", "nao", "gi", "may", "gio", "mo",
  "bao", "nhieu", "the", "cho", "den", "tu", "di", "ve", "tren", "duoi",
  "trong", "ngoai", "nay", "kia", "do", "ay", "thi", "ma", "se", "da",
  "dang", "hay", "hoac", "neu", "khi", "vi", "de", "bang", "cach",
  "sao", "con", "vay", "roi", "dau", "luc", "thoi", "nua", "khong",
  "ko", "duoc",
  // Từ xưng hô / nhờ vả / từ nối hay gặp trong câu hỏi diễn đàn
  "du", "het", "nen", "nhu", "cung", "ca", "tat", "em", "anh", "ban",
  "minh", "ta", "bac", "cac", "nguoi", "xin", "hoi", "nho", "giup",
  "van", "tour", "combo", "lai",
  // Giới từ hướng/thời gian hay gặp ("vào tháng mấy", "ra đảo", "lên núi")
  "vao", "ra", "len", "xuong", "qua",
  // Từ theo ý định (giá/giờ/mùa/cách đi/ăn/ở/điểm chơi/lịch trình/chi phí/...)
  "gia", "ve", "gio", "mo", "cua", "dong", "mua", "dep", "thang",
  "cach", "di", "bang", "an", "diem", "choi", "lich", "trinh", "chi",
  "phi", "mang", "so", "sanh", "tinh", "cu", "vi", "tri", "chung",
  "tham", "quan", "dia", "danh", "den", "lai", "thue", "xe", "may",
  "taxi", "grab", "dat", "phong", "khach", "san", "homestay", "resort",
  "nha", "nghi", "luu", "tru", "ngu", "sang", "toi", "hang", "dac",
  "san", "mon", "ngon", "uong",
  // Loại địa danh chung (không phải tên riêng): biển, núi, thác, chùa...
  "bien", "nui", "thac", "ho", "chua", "dao", "lang", "bai", "den",
  "hang", "cho", "suoi", "doi", "deo", "cau", "bao", "tang", "check",
  "in", "song", "ao", "tich",
  // Tính từ chung (ngon/rẻ/đẹp/nổi tiếng...) — không phải tên riêng
  "ngon", "re", "dat", "dep", "noi", "tieng", "nhat", "tot", "xau",
  "rong", "hep", "cao", "thap", "dai", "ngan", "lon", "nho", "moi",
  "trua", "chieu", "dem", "som", "muon", "nhanh", "cham", "de", "kho",
  "tien", "loi", "gan", "xa", "thuan",
]);
