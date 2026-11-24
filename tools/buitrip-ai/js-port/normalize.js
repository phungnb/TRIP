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
  // Chỉ bỏ 'thanh' khi nó đi với 'pho' ('thành phố') — 'Thanh Hóa' là
  // tên tỉnh, KHÔNG được rút thành 'hoa' (lỗi thật gặp 25/11/2026).
  const toks = normText(s || "").split(" ").filter((t) => t !== "");
  const out = [];
  let i = 0;
  while (i < toks.length) {
    if (toks[i] === "thanh" && i + 1 < toks.length && toks[i + 1] === "pho") {
      i += 2;
      continue;
    }
    if (toks[i] === "tp") {
      i += 1;
      continue;
    }
    out.push(toks[i]);
    i += 1;
  }
  return out.join(" ");
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

// Token + bigram (giúp khớp 'quy nhon', 'ba na', 'sapa'...).
export function tokens(s) {
  const t = normText(s).split(" ").filter(Boolean);
  const feats = [...t];
  for (let i = 0; i + 1 < t.length; i++) feats.push(`${t[i]}_${t[i + 1]}`);
  return feats;
}
