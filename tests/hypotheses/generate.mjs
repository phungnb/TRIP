/* Sinh bộ câu hỏi thêm từ dữ liệu app: node hypotheses/generate.mjs → sinh-them.json
   Mỗi câu = thực thể có trong dữ liệu (tỉnh, tỉnh cũ, khu, đảo, địa danh, món) × ý định × cách gõ
   (có dấu / không dấu / viết thường / "cho mình hỏi" / đảo trật tự), cộng so sánh, hỏi nối tiếp 2–3 lượt,
   câu ngoài dữ liệu và bẫy (tên dễ nhầm, đảo cấm, nơi chưa có).
   Kỳ vọng và mức lỗi không viết tay: run.mjs đưa từng câu qua cham.mjs, đáp án đúng lấy từ dữ liệu.
   Sinh tất định (hạt giống cố định) để hai lần chạy ra cùng một bộ. */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { moi } from "./cham.mjs";

const DIR = path.dirname(fileURLToPath(import.meta.url));
const C = moi(), { W, KV, DAO, main } = C, P = W.PROV_DATA;
let seed = 20261123;
const rnd = () => (seed = (seed * 1103515245 + 12345) % 2147483648) / 2147483648;
const pick = a => a[Math.floor(rnd() * a.length)];
const boDau = s => s.normalize("NFD").replace(/[̀-ͯ]/g, "").replace(/đ/g, "d").replace(/Đ/g, "D");
/* Cách gõ: giữ nguyên, bỏ dấu, viết thường, thêm lời mở */
const MO = ["cho mình hỏi ", "cho em hỏi ", "bạn ơi ", "hỏi chút: "];
function bien(q) { const r = rnd(); return r < 0.45 ? q : r < 0.7 ? boDau(q).toLowerCase() : r < 0.85 ? q.toLowerCase() : pick(MO) + q.charAt(0).toLowerCase() + q.slice(1); }

const out = [];
const seen = new Set();
const them = (nhom, q, dich, x) => { q = q.replace(/\s+/g, " ").trim(); const k = q + "|" + (x && x.truoc ? x.truoc.join("|") : ""); if (seen.has(k)) return; seen.add(k); out.push(Object.assign({ nhom, q }, dich ? { dich } : {}, x || {})); };
const dProv = p => ({ t: "prov", ref: p.id, ten: p.name });
const dArea = a => ({ t: "area", ref: a.id, ten: a.name });
const dIsle = d => ({ t: "isle", ref: d.id, ten: d.name });
const dItem = (x, p) => ({ t: "item", ref: x.id, p: p.id, ten: main(x.name) });

/* 1. Tỉnh mới (34) */
const MAU_VUNG = [
  n => n + " có gì chơi", n => "đi " + n + " chơi gì", n => "đi " + n + " bằng gì", n => "đi " + n + " mùa nào đẹp", n => "đi " + n + " tháng mấy đẹp",
  n => "ăn gì ở " + n, n => n + " có đặc sản gì", n => "ở đâu ở " + n, n => n + " nên ở khu nào", n => "đi " + n + " 3 ngày 2 đêm hết bao nhiêu",
  n => "đi " + n + " cần mang gì", n => "từ Hà Nội đi " + n + " bằng gì", n => "từ TP.HCM đi " + n + " bằng gì", n => n + " có sân bay không",
  n => "lịch trình " + n + " 3 ngày", n => n + " trời mưa đi đâu", n => "đi " + n + " có an toàn không", n => "số khẩn cấp ở " + n
];
P.forEach(p => MAU_VUNG.forEach(m => { const q = m(p.name); them("1. Tỉnh mới", bien(q), dProv(p)); if (rnd() < 0.5) them("1. Tỉnh mới", boDau(q).toLowerCase(), dProv(p)); }));

/* 2. Tỉnh cũ (trước sáp nhập 2025) */
Object.keys(W.SAP_NHAP || {}).forEach(id => W.SAP_NHAP[id].slice(1).forEach(o => {
  const d = { t: "old", ref: { prov: id, old: o }, ten: o };
  [n => n + " nay thuộc tỉnh nào", n => n + " sáp nhập vào tỉnh nào", n => n + " có gì chơi", n => "đi " + n + " bằng gì", n => "đi " + n + " mùa nào đẹp", n => "ăn gì ở " + n, n => "ở đâu ở " + n]
    .forEach(m => them("2. Tỉnh cũ", bien(m(o)), d));
  them("2. Tỉnh cũ (gõ tìm)", o, null, { loai: "tim" });
}));

/* 3. Khu (thành phố, thị trấn du lịch có hồ sơ riêng) */
KV.forEach(a => MAU_VUNG.slice(0, 16).forEach(m => them("3. Khu du lịch", bien(m(a.name)), dArea(a))));

/* 4. Đảo */
DAO.forEach(d => [n => "đi " + n + " bằng gì", n => n + " mùa nào đẹp", n => "đi " + n + " được không", n => "ra " + n + " đi tàu mấy tiếng", n => n + " có gì chơi"]
  .forEach(m => them("4. Đảo", bien(m(d.name)), dIsle(d))));

/* 5. Địa danh (739) */
const MAU_DIEM = [
  n => "vé " + n + " bao nhiêu", n => n + " giá vé bao nhiêu", n => n + " mấy giờ mở cửa", n => n + " ở đâu", n => n + " thuộc tỉnh nào",
  n => "đi " + n + " bằng gì", n => n + " có gì", n => n + " mùa nào đẹp"
];
P.forEach(p => p.places.forEach(x => {
  const n = main(x.name);
  MAU_DIEM.forEach(m => them("5. Địa danh", bien(m(n)), dItem(x, p)));
  them("5. Địa danh (gõ tìm)", rnd() < 0.5 ? n : boDau(n).toLowerCase(), null, { loai: "tim" });
}));

/* 6. Món ăn (332) */
P.forEach(p => p.dishes.forEach(x => {
  const n = main(x.name);
  [m => m + " ăn ở đâu", m => m + " là món gì", m => m + " giá bao nhiêu", m => "ăn " + m + " ở đâu ngon"].forEach(f => them("6. Món ăn", bien(f(n)), dItem(x, p)));
}));

/* 7. So sánh 2 tỉnh / 2 khu */
for (let i = 0; i < 300; i++) {
  const a = pick(P), b = pick(P); if (a === b) continue;
  them("7. So sánh", bien(pick([`${a.name} khác ${b.name} như thế nào`, `so sánh ${a.name} và ${b.name}`, `nên đi ${a.name} hay ${b.name}`])), dProv(a), { loaiHoi: "sosanh" });
}

/* 8. Hỏi nối tiếp: lượt trước nêu nơi, lượt sau chỉ hỏi "thế/còn …" */
const TIEP = [["thế ăn gì", "angi"], ["còn mùa nào đẹp", "mua"], ["thế ở đâu", "odau"], ["còn đi bằng gì", "diden"], ["thế có gì chơi", "choi"], ["còn cần mang gì", "mang"]];
for (let i = 0; i < 400; i++) {
  const r = rnd(); let d, n;
  if (r < 0.6) { const p = pick(P); d = dProv(p); n = p.name; } else { const a = pick(KV); d = dArea(a); n = a.name; }
  const [q, lh] = pick(TIEP), mo = pick([`đi ${n} bằng gì`, `${n} có gì chơi`, `đi ${n} mùa nào đẹp`]);
  them("8. Hỏi nối tiếp", q, d, { truoc: [mo], loaiHoi: lh });
}

/* 9. Ngoài dữ liệu: phải trả dự phòng 3 phần */
const NGOAI = [n => "thời tiết " + n + " hôm nay", n => "mai " + n + " có mưa không", n => "đặt giúp mình khách sạn ở " + n, n => "số điện thoại khách sạn ở " + n, n => "giá taxi ở " + n + " hôm nay"];
P.forEach(p => NGOAI.forEach(m => them("9. Ngoài dữ liệu", m(p.name), null, { duPhong: true, loaiHoi: "ngoai" })));
["Paris", "Tokyo", "Bangkok", "Seoul", "Singapore", "Bali", "Hồng Kông", "London"].forEach(n => ["đi " + n + " mùa nào đẹp", "đi " + n + " bằng gì"].forEach(q => them("9. Ngoài dữ liệu", q, null, { duPhong: true, loaiHoi: "ngoai" })));
["tỷ giá đô hôm nay", "giá vàng hôm nay", "cách nấu bún bò", "kể chuyện cười đi", "mã giảm giá Vietjet", "visa đi Hàn cần gì", "viết code python giúp mình", "kết quả bóng đá tối qua"]
  .forEach(q => them("9. Ngoài dữ liệu", q, null, { duPhong: true, loaiHoi: "ngoai" }));

/* 10. Bẫy: tên dễ nhầm, đảo cấm, nơi chưa có */
(W.BT_DE_NHAM || []).forEach(g => g.forEach(([pid, iid]) => { const p = C.provById(pid), x = p && p.places.find(y => y.id === iid); if (x) ["vé " + main(x.name) + " bao nhiêu", main(x.name) + " ở đâu"].forEach(q => them("10. Bẫy", q, dItem(x, p))); }));
DAO.filter(d => d.ban).forEach(d => ["đi " + d.name + " được không", "du lịch " + d.name + " thế nào", d.name + " có gì chơi"].forEach(q => them("10. Bẫy", q, dIsle(d))));
["Đảo Hòn Mơ Hồ", "Thác Không Tên", "Làng cổ Tưởng Tượng", "Bãi biển Chưa Có", "Chùa Gió Ảo"].forEach(n => ["vé " + n + " bao nhiêu", "đi " + n + " bằng gì", n + " mấy giờ mở cửa"].forEach(q => them("10. Bẫy", q, null, { duPhong: true, loaiHoi: "ngoai" })));

const nh = {}; out.forEach(c => nh[c.nhom] = (nh[c.nhom] || 0) + 1);
fs.writeFileSync(path.join(DIR, "sinh-them.json"), JSON.stringify({ ghi: "Sinh từ dữ liệu bởi generate.mjs; kỳ vọng do cham.mjs suy từ dữ liệu", n: out.length, cau: out }));
console.log("sinh-them.json: " + out.length + " câu");
Object.keys(nh).forEach(k => console.log("  " + k.padEnd(28) + nh[k]));
