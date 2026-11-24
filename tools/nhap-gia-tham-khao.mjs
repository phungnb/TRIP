/* Giá vé tìm trên Google 23/11/2026 (tools/nguon/gia-ve-google-23-11.csv) -> app/data/gia-tham-khao.js
   Người dùng chốt 23/11: giá chỉ mang tính tham khảo, được thay giá trong app bằng giá Google.
   Làm sạch: bỏ ghi chú nghiên cứu (nguồn, mâu thuẫn, "cần kiểm"), bỏ tên web; không tự thêm số.
   Chạy: node tools/nhap-gia-tham-khao.mjs */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = path.join(path.dirname(fileURLToPath(import.meta.url)), "..");
const SRC = path.join(ROOT, "tools/nguon/gia-ve-google-23-11.csv");

export function docCsv(t) {
  t = t.replace(/^﻿/, "");
  const rows = []; let row = [], cell = "", q = false;
  for (let i = 0; i < t.length; i++) {
    const c = t[i];
    if (q) { if (c === '"') { if (t[i + 1] === '"') { cell += '"'; i++; } else q = false; } else cell += c; }
    else if (c === '"') q = true;
    else if (c === ",") { row.push(cell); cell = ""; }
    else if (c === "\n" || c === "\r") { if (c === "\r" && t[i + 1] === "\n") i++; row.push(cell); rows.push(row); row = []; cell = ""; }
    else cell += c;
  }
  if (cell || row.length) { row.push(cell); rows.push(row); }
  const h = rows.shift();
  return rows.filter(r => r.length > 1).map(r => Object.fromEntries(h.map((k, i) => [k, r[i] || ""])));
}

const GHI = /(mâu thuẫn|\btheo [A-ZĐ]|cập nhật|\bghi\b|không dùng|không đáng tin|lưu ý|không tìm thấy|giá cũ|nguồn|cần kiểm|kiểm tại|kiểm lại|chưa kiểm|xác minh|\.com|\.vn|\.org|\.net|tripadvisor|klook|traveloka|wikipedia|blog)/i;
export function sach(g) {
  let s = String(g || "").trim();
  if (!s || /^chưa (kiểm|tìm|có)/i.test(s)) return null;
  /* ngoặc chứa ghi chú nghiên cứu */
  for (let k = 0; k < 3; k++) s = s.replace(/\s*\([^()]*\)/g, m => (GHI.test(m) ? "" : m));
  /* "theo <web>" */
  s = s.replace(/,?\s*theo\s+[\w-]+\.(com|vn|org|net|travel)[\w./-]*/gi, "");
  /* bỏ vế (tách bởi ; . —) mang ghi chú nghiên cứu */
  const ve = s.split(/(?<=[;.])\s+|\s+—\s+/).map(x => x.trim()).filter(Boolean).filter(x => !GHI.test(x));
  s = ve.join("; ").replace(/\s+/g, " ").replace(/\s+([,;.])/g, "$1").replace(/[,;—-]\s*$/, "").trim();
  s = s.replace(/[.;]\s*;/g, ";").replace(/[;.]\s*$/, "").replace(/; (Ngắm|Phí|Vé|Miễn)\b/g, (m, w) => "; " + w.toLowerCase());
  return s.length >= 3 ? s[0].toUpperCase() + s.slice(1) : null;
}

/* Sửa tay những dòng làm sạch máy chưa gọn (chỉ rút gọn, gộp khoảng giá từ chính các nguồn trong CSV; không thêm số).
   null = giữ giá trong app vì giá Google không rõ hơn. */
export const SUA = {
  "lang-chu-tich": "Miễn phí vào Lăng (mọi đối tượng); Bảo tàng Hồ Chí Minh và khu nhà sàn/Phủ Chủ tịch khoảng 25.000–40.000 VND/người; Chùa Một Cột miễn phí",
  "chua-huong": "Giá lễ hội 2026: vé thắng cảnh + đò tuyến chính 230.000 VND/người lớn, 60.000 VND/trẻ em; cáp treo khứ hồi 260.000 VND/người lớn, 180.000 VND/trẻ em; cáp treo 1 chiều 180.000 VND/người lớn, 120.000 VND/trẻ em; đò tuyến Tuyết Sơn/Long Vân 85.000 VND/người lớn",
  "hon-dau": "Tham quan trên đảo miễn phí; tàu khứ hồi kèm vé vào đảo khoảng 50.000–90.000 VND/người; vé lên hải đăng riêng khoảng 6.000 VND",
  "dao-khi": "Vé tham quan đảo khoảng 50.000–80.000 VND/người lớn, trẻ dưới 1,2m miễn phí; vé vịnh Lan Hạ + Đảo Khỉ 150.000 VND/người lớn, 80.000 VND/trẻ em; tàu ghép ra đảo khoảng 150.000 VND/người",
  "dao-co-chi-lang-nam": "Vé thuyền thăm đảo: người lớn 20.000 VND/lượt, trẻ em 10.000 VND/lượt; có nơi thu 30.000–50.000 VND/người",
  "vinh-bai-tu-long": "Tour ghép 870.000–1.000.000đ/người (tuyến Phất Cờ 6 tiếng 870.000đ; tuyến Hang Nhà Trò – Bản Sen 1.000.000đ; tour 5 tiếng kèm ăn hơn 1.000.000đ — khoảng tham khảo). Tuyến từ cảng Ao Tiên chưa thu phí tham quan (chỉ trả vé tàu + phí qua cảng); tuyến 4 qua vịnh Hạ Long 200.000đ/người/ngày",
  "dao-quan-lan": "Miễn phí vào đảo (không thu vé tham quan); tàu cao tốc từ cảng Ao Tiên 180.000–250.000 VND/lượt, từ cảng Cái Rồng 100.000–200.000 VND/lượt; phí qua cảng Ao Tiên 30.000–50.000 VND/người lớn",
  "dao-co-to": "Miễn phí vào đảo (không thu vé tham quan, bãi biển, hải đăng); tàu cao tốc 220.000–300.000 VND/lượt, tàu gỗ chậm 100.000–150.000 VND/lượt; phí qua cảng khoảng 30.000–50.000 VND/khách (chưa gồm trong vé tàu)",
  "dao-ti-top": "Thuộc tuyến tham quan số 2 vịnh Hạ Long: phí thắng cảnh 250.000 VND/người lớn (Nghị quyết 51/2025 HĐND tỉnh Quảng Ninh); trẻ em dưới 1,2m hoặc dưới 7 tuổi miễn phí, người từ 60 tuổi giảm 50%; vé tàu ghép khoảng 150.000 VND/người (chưa gồm vé tham quan)",
  "hang-sung-sot": "Thuộc tuyến tham quan số 2 vịnh Hạ Long: phí thắng cảnh 250.000 VND/người lớn; trẻ em dưới 1,2m hoặc dưới 7 tuổi miễn phí, người từ 60 tuổi giảm 50%",
  "lang-chai-cua-van": "Thuộc tuyến tham quan số 3 vịnh Hạ Long: phí thắng cảnh 200.000 VND/người lớn (Nghị quyết 51/2025); trẻ em dưới 1,2m miễn phí, người từ 60 tuổi giảm 50%; kayak 50.000–100.000 VND/người, đò nan 60.000–80.000 VND/người",
  "bao-tang-bac-ninh": "Miễn phí vào cửa các ngày thứ 5, 6, 7, Chủ nhật",
  "tay-yen-tu": "Cáp treo 1 chiều 150.000–200.000 VND, khứ hồi 260.000–290.000 VND; trẻ em dưới 1,3m miễn phí cáp treo; vé tham quan khu di tích người lớn 20.000 VND, trẻ em dưới 16 tuổi 10.000 VND, dưới 1,2m miễn phí; xe điện trong khu 15.000 VND/chiều",
  "van-long": "Vé tham quan 20.000đ/người + thuyền 80.000đ/người, tổng khoảng 100.000đ/người; trẻ em dưới khoảng 1m thường miễn phí",
  "thung-nham": "Người lớn và trẻ em từ 1,3m 250.000đ/vé; trẻ em 1m–dưới 1,3m 150.000đ/vé; trẻ dưới 1m và khách từ 80 tuổi miễn phí (giá từ 01/04/2026, gồm VAT, thuyền Vườn chim và thuyền Hang Bụt)",
  "kenh-ga": "Suối Kênh Gà: vé vào cổng 15.000–30.000đ/người, tắm khoáng bể chung 75.000–120.000đ/người, bể riêng VIP 300.000–500.000đ/bể, gói tắm dưỡng sinh khoảng 450.000đ/người; Động Vân Trình khoảng 15.000–100.000đ/người; trẻ em dưới 1m miễn phí",
  "chua-tam-chuc": "Miễn phí vé vào cổng; xe điện khứ hồi 50.000–100.000đ/người lớn, trẻ em 1–dưới 1,3m 25.000đ, dưới 1m miễn phí; thuyền thường 270.000đ/người lớn, 135.000đ/trẻ em; thuyền VIP 320.000đ/người lớn, 160.000đ/trẻ em; combo thuyền + xe điện chùa cổ 290.000đ/người lớn; combo thuyền + buffet trưa + xe điện 450.000đ/người lớn",
  "cho-dem-san-thang": null,
  "thac-ban-ba": "Khoảng 50.000đ/người lớn; trẻ em dưới 1,2m miễn phí",
  "dong-song-long": "Khoảng 20.000đ/người",
  "sun-world-sam-son": "Vé thường khoảng 300.000–320.000đ/người lớn, 150.000–200.000đ/trẻ em 1–1,4m, dưới 1m miễn phí; có đợt ưu đãi đồng giá 150.000đ/người; công viên nước 5/9–31/10/2026 100.000đ/người",
  "nui-than-tai": "Vé Phổ thông 490.000đ/người lớn, 245.000đ/trẻ em (bảng giá 2026); gói Tích Lộc kèm buffet 755.000đ; vé sau 14h 390.000đ; tắm bùn lẻ 200.000đ/khách",
  "dao-be-an-binh": "Ca nô khứ hồi 80.000–120.000đ/người (chưa có mức niêm yết chính thức; giá theo mùa, khoảng tham khảo); tàu gỗ khứ hồi 30.000đ/người; thuê nguyên ca nô khoảng 1.500.000–2.500.000đ/chiếc; không có vé vào đảo riêng",
  "thac-trang-quang-ngai": "Người lớn khoảng 40.000–50.000đ, trẻ em 1–1,3m 20.000đ, dưới 1m miễn phí",
  "thanh-co-chau-sa": "Miễn phí vào cổng (di tích ngoài trời, không có cổng bán vé, nằm xen giữa ruộng vườn nhà dân)",
  "chua-minh-thanh": "Miễn phí vào cổng (miễn phí tham quan và lễ Phật; gửi xe tùy tâm)",
  "bien-ho-tnung": "Miễn phí đến khoảng 10.000đ/lượt tùy thời điểm, khu vực",
  "thac-phu-cuong": "Người lớn 15.000đ, trẻ em 10.000đ; gửi xe máy 5.000đ, ô tô 20.000đ",
  "nui-ham-rong-lao-cai": "Miễn phí vào cổng (núi mở tự do, không thu vé)",
  "thac-chin-tang": "Miễn phí vào cổng (thác hoang sơ, không có cổng bán vé)",
  "thac-dray-sap": null,
  "vuon-quoc-gia-yok-don": "Người lớn 40.000–60.000đ, sinh viên 20.000đ; tour trải nghiệm voi (không cưỡi) 850.000đ/người nửa ngày",
  "thien-vien-truc-lam": "Miễn phí vào thiền viện; cáp treo Đồi Robin khứ hồi 100.000–150.000đ/người lớn, 70.000–120.000đ/trẻ em; một chiều 80.000–120.000đ/người lớn, 60.000–100.000đ/trẻ em",
  "ho-suoi-vang": "Hồ Suối Vàng (Dankia) miễn phí, mở tự do; Khu du lịch Thung Lũng Vàng bên hồ thu vé khoảng 40.000–70.000đ/người lớn, 25.000–30.000đ/trẻ em",
  "ho-thac-mo": "Miễn phí vào cổng hồ; khu du lịch Thác Mơ 10.000–20.000đ/người; thuyền tham quan hồ khoảng 50.000–100.000đ/người",
  "mui-nai": "Vé vào cổng khu du lịch 30.000đ/người",
  "dm-du-gia": "Thác/suối Du Già thường miễn phí, có nơi thu 20.000–30.000đ/người; gửi xe 10.000–20.000đ",
  "dm-dao-ba-goa": "Miễn phí lên đảo; vé thắng cảnh Vườn quốc gia Ba Bể người lớn 70.000đ, trẻ 6–16 tuổi 40.000đ; thuê thuyền máy 300.000–1.200.000đ/thuyền tùy tuyến (tuyến ngắn qua đảo Bà Góa, Ao Tiên, động Puông khoảng 450.000–600.000đ/thuyền)",
  "dm-dong-na-phoong": "Miễn phí vào cửa",
  "dm-lang-chai-vung-vieng": "Vé tuyến tham quan vịnh số 4 ngày 200.000–260.000đ/người lớn, qua đêm 500.000đ; đò nan/kayak tại làng 50.000đ/người/giờ; trẻ dưới 1,2m hoặc dưới 7 tuổi miễn phí",
  "dm-lang-co-viet-hai": "Miễn phí vào làng; tàu từ Bến Bèo 50.000đ/người (ca nô 400.000đ/6 người); vé đi bộ xuyên Vườn quốc gia Cát Bà 80.000–160.000đ/người; xe điện từ bến vào làng 50.000đ/người",
  "dm-thac-tien-sa": "Qua cổng Bản Cát Cát: người lớn 150.000đ, trẻ em 1–1,4m 70.000đ, dưới 1m miễn phí (gồm thác Tiên Sa, guồng nước, nhà máy thủy điện cũ, văn nghệ); phí thắng cảnh tại thác 10.000đ (từ 16 tuổi), 5.000đ (6–dưới 16 tuổi)",
  "dm-hang-kho-muong": null,
  "dm-hang-nau-ruou": "Nằm trong quần thể Tràng An, chỉ đi bằng thuyền tuyến Tràng An: người lớn 250.000đ, trẻ em dưới 1,4m 120.000đ, dưới 1m miễn phí (vé trọn gói thuyền 2–3 giờ)",
  "dm-thac-nam-me": "Thường miễn phí; có nơi tính trong phí tham quan rừng khoảng 20.000đ/người"
};

if (process.argv[1] && fileURLToPath(import.meta.url) === path.resolve(process.argv[1])) {
  const rows = docCsv(fs.readFileSync(SRC, "utf8"));
  const out = {}; let bo = 0;
  for (const r of rows) {
    const id = r["Mã điểm"], g = id in SUA ? SUA[id] : sach(r["Giá tìm Google 23/11"]);
    if (!id || !g) { bo++; continue; }
    /* app viết giá theo kiểu "60.000đ" */
    out[id] = g.replace(/(\d)\+? ?VND\b/g, (m, d) => d + (m.includes("+") ? "đ+" : "đ"));
  }
  const js = `/* Giá vé tham khảo tìm trên Google 23/11/2026 (tools/nguon/gia-ve-google-23-11.csv).
   Sinh bởi tools/nhap-gia-tham-khao.mjs, không sửa tay. Giá chỉ mang tính tham khảo; app đã ghi "kiểm lại trước ngày đi".
   Thay trường price của địa danh cùng mã; không đổi priceSnap (số dùng để cộng chi phí). */
var GIA_THAM_KHAO = {
${Object.entries(out).map(([k, v]) => "  " + JSON.stringify(k) + ": " + JSON.stringify(v)).join(",\n")}
};
(function () {
  var thay = function (x) { if (x && GIA_THAM_KHAO[x.id]) x.price = GIA_THAM_KHAO[x.id]; };
  if (typeof PROV_DATA !== "undefined") PROV_DATA.forEach(function (p) { p.places.forEach(thay); });
  if (typeof PLACES !== "undefined") PLACES.forEach(thay);
})();
`;
  fs.writeFileSync(path.join(ROOT, "app/data/gia-tham-khao.js"), js);
  console.log(`Thay giá ${Object.keys(out).length} điểm, bỏ ${bo} dòng không có giá`);
}
