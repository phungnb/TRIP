/* Gemini đóng vai người dùng hỏi trợ lý BuiTrip (chạy trên máy dev, không chạy trên app).
   Gemini CHỈ viết câu hỏi, không trả lời, không được thấy giá, giờ, số điện thoại trong dữ liệu.
   Câu trả lời vẫn do trợ lý BuiTrip trên máy sinh từ dữ liệu đã kiểm; cham.mjs bên cạnh chấm và gom câu trượt
   vào vòng học có người duyệt sẵn có (tools/hoc/de-xuat.mjs -> duyệt -> ap-dung.mjs).

   Chạy:
     GEMINI_API_KEY=... node tools/hoi-gemini/hoi-vu-vo.mjs --so 40 --moi 8
     node tools/hoi-gemini/hoi-vu-vo.mjs --gia-lap --so 40      # không gọi API: kiểm cả luồng bằng câu giả lập
   Tùy chọn:
     --so N           số thực thể (tỉnh, khu, địa danh, món) lấy mẫu lần này (mặc định 40)
     --moi K          số câu hỏi mỗi thực thể (mặc định 8, tối đa 20)
     --toi-da-goi M   trần số lượt gọi API trong 1 lần chạy (mặc định 200), để chặn chi phí
     --hat S          hạt giống chọn mẫu (mặc định theo ngày), cùng hạt ra cùng bộ thực thể
     --model ID       mặc định env GEMINI_MODEL hoặc "gemini-2.5-flash"
   Ra (cộng dồn qua các lần chạy, bỏ trùng; thực thể đã hỏi đủ thì không gọi lại):
     tools/hoi-gemini/ra/cau-hoi.json   định dạng giống tests/hypotheses/sinh-them.json (có "dich" = thực thể đích) */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { moi } from "../../tests/hypotheses/cham.mjs";
import { xoaRieng } from "../hoc/de-xuat.mjs";

const DIR = path.dirname(fileURLToPath(import.meta.url)), RA = path.join(DIR, "ra"), OUT = path.join(RA, "cau-hoi.json");
const ARG = process.argv.slice(2), arg = (k, d) => { const i = ARG.indexOf(k); return i >= 0 ? ARG[i + 1] : d; };
const SO = +arg("--so", 40), MOI = Math.min(20, +arg("--moi", 8)), TRAN = +arg("--toi-da-goi", 200);
const GIA_LAP = ARG.includes("--gia-lap");
const MODEL = arg("--model", process.env.GEMINI_MODEL || "gemini-2.5-flash");
const KEY = process.env.GEMINI_API_KEY;
if (!GIA_LAP && !KEY) { console.error("Thiếu GEMINI_API_KEY. Chạy thử không cần key: --gia-lap"); process.exit(1); }

const C = moi(), { W, KV, main, fold } = C, P = W.PROV_DATA;
let seed = +arg("--hat", new Date().toISOString().slice(0, 10).replace(/-/g, ""));
const rnd = () => (seed = (seed * 1103515245 + 12345) % 2147483648) / 2147483648;
const tron = a => { a = a.slice(); for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(rnd() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a; };

/* Loại câu hỏi: khóa = giá trị loaiHoi của tests/hypotheses/cham.mjs (để bộ chấm không phải đoán lại từ câu chữ) */
const LOAI = {
  vung: { diden: "đi đến bằng gì, mất bao lâu", mua: "tháng nào/mùa nào đẹp", choi: "có gì chơi, tham quan", angi: "ăn gì, đặc sản", odau: "ở khu nào, chỗ ngủ", chiphi: "chi phí chuyến đi", mang: "cần mang/chuẩn bị gì" },
  diem: { gia: "giá vé vào cửa", gio: "giờ mở cửa", vitri: "nằm ở đâu, thuộc tỉnh nào", diden: "đi đến bằng gì", choi: "có gì hay", mua: "mùa nào đẹp" },
  mon: { anodau: "ăn ở đâu", la: "là món gì", gia: "giá bao nhiêu" }
};
const KIEU = "trộn đủ các kiểu người Việt hay gõ: có dấu chuẩn; không dấu; viết tắt/teencode (ko, j, đc, bn, qn, hn, sg); câu dài kể hoàn cảnh (đi cùng con nhỏ, ba mẹ già, xe máy, ngân sách); câu cụt chỉ vài chữ; gõ sai chính tả nhẹ; gọi tên địa danh theo kiểu dân địa phương hay gọi";

/* ---------- Chọn thực thể ---------- */
function dsThucThe() {
  const a = [];
  P.forEach(p => {
    a.push({ nhom: "Gemini – tỉnh", dich: { t: "prov", ref: p.id, ten: p.name }, ten: p.name, boiCanh: "tỉnh/thành phố của Việt Nam", loai: LOAI.vung });
    p.places.forEach(x => a.push({ nhom: "Gemini – địa danh", dich: { t: "item", ref: x.id, p: p.id, ten: main(x.name) }, ten: main(x.name), boiCanh: "địa danh ở " + p.name, loai: LOAI.diem }));
    p.dishes.forEach(x => a.push({ nhom: "Gemini – món", dich: { t: "item", ref: x.id, p: p.id, ten: main(x.name) }, ten: main(x.name), boiCanh: "món ăn đặc sản " + p.name, loai: LOAI.mon }));
  });
  KV.forEach(k => a.push({ nhom: "Gemini – khu", dich: { t: "area", ref: k.id, ten: k.name }, ten: k.name, boiCanh: "điểm du lịch thuộc " + ((P.find(p => p.id === k.prov) || {}).name || "Việt Nam"), loai: LOAI.vung }));
  return a;
}

/* ---------- Gọi Gemini: chỉ gửi TÊN + loại câu hỏi, không gửi dữ liệu ---------- */
function loiNhac(e) {
  const ds = Object.entries(e.loai).map(([k, v]) => k + " = " + v).join("; ");
  return "Bạn đóng vai nhiều người dùng Việt Nam khác nhau đang hỏi một trợ lý du lịch trong app.\n" +
    "Đối tượng: \"" + e.ten + "\" (" + e.boiCanh + ").\n" +
    "Viết đúng " + MOI + " câu hỏi về đối tượng này, " + KIEU + ".\n" +
    "Mỗi câu gắn 1 nhãn loai trong danh sách: " + ds + "; hoặc ngoai = câu ngoài phạm vi app (thời tiết hôm nay, đặt phòng giúp, giá taxi lúc này), tối đa 1 câu.\n" +
    "Luật: CHỈ viết câu hỏi, không trả lời, không tự đưa ra giá, giờ, số điện thoại hay số liệu nào trong câu hỏi. Mỗi câu phải nhắc tới đối tượng (tên đầy đủ, tên tắt hoặc tên địa phương). Không lặp ý.";
}
const SCHEMA = { type: "ARRAY", items: { type: "OBJECT", properties: { q: { type: "STRING" }, loai: { type: "STRING" } }, required: ["q", "loai"] } };
const ngu = ms => new Promise(r => setTimeout(r, ms));
async function goiGemini(e) {
  const url = "https://generativelanguage.googleapis.com/v1beta/models/" + encodeURIComponent(MODEL) + ":generateContent";
  const body = { contents: [{ role: "user", parts: [{ text: loiNhac(e) }] }], generationConfig: { temperature: 1.0, responseMimeType: "application/json", responseSchema: SCHEMA } };
  for (let lan = 0; lan < 4; lan++) {
    const r = await fetch(url, { method: "POST", headers: { "content-type": "application/json", "x-goog-api-key": KEY }, body: JSON.stringify(body) });
    if (r.status === 429 || r.status >= 500) { await ngu(2000 * 2 ** lan); continue; }
    if (!r.ok) throw new Error("Gemini " + r.status + ": " + (await r.text()).slice(0, 300));
    const j = await r.json(), t = j.candidates && j.candidates[0] && j.candidates[0].content && j.candidates[0].content.parts.map(p => p.text || "").join("");
    try { return JSON.parse(t || "[]"); } catch (er) { return []; }
  }
  throw new Error("Gemini quá tải sau 4 lần thử");
}
/* Giả lập: biến tấu câu mẫu (bỏ dấu, viết tắt, thêm hoàn cảnh) để kiểm cả luồng mà không tốn lượt gọi */
const boDau = s => s.normalize("NFD").replace(/[̀-ͯ]/g, "").replace(/đ/g, "d").replace(/Đ/g, "D");
const MAU = { diden: n => "đi " + n + " bằng gì", mua: n => n + " tháng mấy đẹp", choi: n => n + " có gì chơi", angi: n => "đến " + n + " nên ăn gì", odau: n => "đi " + n + " nên ở đâu", chiphi: n => "đi " + n + " 3 ngày hết bao nhiêu", mang: n => "đi " + n + " cần mang gì", gia: n => "vé " + n + " bao nhiêu", gio: n => n + " mấy giờ mở cửa", vitri: n => n + " ở đâu", la: n => n + " là món gì", anodau: n => n + " ăn ở đâu ngon" };
const BIEN = [q => q, q => boDau(q).toLowerCase(), q => q.replace(/không/g, "ko").replace(/được/g, "đc").replace(/bao nhiêu/g, "bn"), q => "nhà mình có con nhỏ, cho hỏi " + q.charAt(0).toLowerCase() + q.slice(1), q => q + " ạ"];
function giaLap(e) {
  const ks = tron(Object.keys(e.loai)), out = [];
  for (let i = 0; i < MOI; i++) { const k = ks[i % ks.length], m = k === "gia" && e.loai === LOAI.mon ? n => n + " giá bao nhiêu" : MAU[k]; out.push({ q: BIEN[Math.floor(rnd() * BIEN.length)](m(e.ten)), loai: k }); }
  return out;
}

/* ---------- Lọc câu Gemini trả ---------- */
const HOP_LE = new Set([...Object.keys(LOAI.vung), ...Object.keys(LOAI.diem), ...Object.keys(LOAI.mon), "ngoai"]);
function loc(e, xs) {
  return (Array.isArray(xs) ? xs : []).map(x => ({ q: xoaRieng(String((x && x.q) || "")).replace(/\s+/g, " ").trim(), loai: String((x && x.loai) || "") }))
    .filter(x => x.q.length >= 4 && x.q.length <= 300 && HOP_LE.has(x.loai))
    .filter(x => !/\d{3,}\s*(k|đ|đồng|vnd)|\b\d{1,2}[:h]\d{2}\b/i.test(x.q)); /* Gemini tự chèn giá/giờ vào câu hỏi: bỏ, tránh bộ chấm coi là số người dùng gõ */
}

/* ---------- Chạy ---------- */
fs.mkdirSync(RA, { recursive: true });
const cu = fs.existsSync(OUT) ? JSON.parse(fs.readFileSync(OUT, "utf8")) : { cau: [] };
const daCo = new Set(cu.cau.map(c => c.q.toLowerCase())), daHoi = {};
cu.cau.forEach(c => { const k = JSON.stringify(c.dich); daHoi[k] = (daHoi[k] || 0) + 1; });
const chon = tron(dsThucThe()).filter(e => (daHoi[JSON.stringify(e.dich)] || 0) < MOI).slice(0, SO);
let goi = 0, them = 0, loi = 0;
for (const e of chon) {
  if (goi >= TRAN) { console.log("Chạm trần " + TRAN + " lượt gọi, dừng."); break; }
  let xs;
  try { xs = GIA_LAP ? giaLap(e) : await goiGemini(e); goi++; } catch (er) { loi++; console.log("  lỗi " + e.ten + ": " + er.message); if (/ 40[013]/.test(er.message)) break; continue; }
  for (const x of loc(e, xs)) {
    if (daCo.has(x.q.toLowerCase())) continue; daCo.add(x.q.toLowerCase());
    const c = { nhom: e.nhom, q: x.q, dich: x.loai === "ngoai" ? null : e.dich, loaiHoi: x.loai === "gio" || x.loai === "vitri" || x.loai === "la" ? undefined : x.loai, nguon: GIA_LAP ? "gia-lap" : MODEL };
    if (x.loai === "ngoai") c.duPhong = true;
    cu.cau.push(c); them++;
  }
  if (!GIA_LAP) await ngu(400);
}
cu.ghi = "Câu hỏi do Gemini (hoặc --gia-lap) viết, đóng vai người dùng. Không có câu trả lời của Gemini. Chấm: node tools/hoi-gemini/cham.mjs";
cu.n = cu.cau.length;
fs.writeFileSync(OUT, JSON.stringify(cu, null, 1));
console.log((GIA_LAP ? "[giả lập] " : "[" + MODEL + "] ") + "gọi " + goi + " lượt, lỗi " + loi + ", thêm " + them + " câu mới; tổng " + cu.n + " câu -> " + path.relative(process.cwd(), OUT));
