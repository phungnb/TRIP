/* Thử vòng học trên nhật ký giả lập (chưa có nhật ký thật):
   1. Lấy tên địa danh có trong dữ liệu, gõ sai kiểu người dùng hay gõ (sai dấu thanh, thiếu 1 chữ, đảo 2 chữ).
   2. Đưa qua tools/hoc/de-xuat.mjs: câu nào trợ lý trượt phải được đề xuất đúng tên gốc.
   3. Áp đề xuất vào trợ lý (trong bộ nhớ): câu đó phải trả đúng địa danh.
   Đạt: đề xuất đúng tên ≥ 90%, sửa được ≥ 80% câu đã đề xuất. Sinh tất định. */
import { napAI } from "./nap-ai.mjs";
import { deXuat } from "../tools/hoc/de-xuat.mjs";

const W = napAI(), A = W.BTAI, main = n => String(n || "").split(" (")[0];
let seed = 20261123;
const rnd = () => (seed = (seed * 1103515245 + 12345) % 2147483648) / 2147483648;
const pick = a => a[Math.floor(rnd() * a.length)];
/* đổi dấu thanh của 1 nguyên âm: "lèng" -> "lẻng" */
const THANH = ["̀", "́", "̃", "̉", "̣"];
function saiDau(w) {
  const d = w.normalize("NFD"), i = [...d].findIndex(c => THANH.includes(c)); if (i < 0) return null;
  const a = [...d]; a[i] = pick(THANH.filter(t => t !== a[i])); return a.join("").normalize("NFC");
}
const thieu = w => w.length < 5 ? null : w.slice(0, 2) + w.slice(3);
const dao = w => w.length < 5 ? null : w.slice(0, 2) + w[3] + w[2] + w.slice(4);
const MAU = [n => n + " ở đâu", n => "vé " + n + " bao nhiêu", n => n + " có gì", n => "đi " + n + " bằng gì"];

const ca = [];
W.PROV_DATA.forEach(p => p.places.forEach(x => {
  if (rnd() > 0.3) return;
  const n = main(x.name), w = n.split(" "); if (w.length < 2) return;
  const k = Math.floor(rnd() * w.length), f = pick([saiDau, thieu, dao]), s = f(w[k]); if (!s || s === w[k]) return;
  const go = w.slice(0, k).concat(s, w.slice(k + 1)).join(" ");
  ca.push({ q: pick(MAU)(go), p: p.id, id: x.id, ten: n.toLowerCase() });
}));
const kq = deXuat(ca, W);
const theoCau = new Map(); kq.muc.forEach(m => m.vi_du.forEach(v => theoCau.set(v, m)));
let deXuatDung = 0, coDeXuat = 0, sua = 0;
const sai = [];
const cauTruot = ca.filter(c => { const r = W.askBuiTrip(c.q, { noCtx: true }); return r.kind === "fallback"; });
for (const c of cauTruot) {
  const m = kq.muc.find(m => m.loai === "bien_the" && m.vi_du.includes(c.q)) || kq.muc.find(m => m.loai === "bien_the" && A.fold(m.go) === A.fold(String(A.rest(c.q)).toLowerCase()));
  if (!m) continue;
  coDeXuat++;
  if (c.ten.endsWith(m.ten_dung) || A.fold(c.ten).endsWith(A.fold(m.ten_dung))) deXuatDung++; else { sai.push(c.q + " -> " + m.ten_dung + " (đúng: " + c.ten + ")"); continue; }
  /* áp thử */
  W.BT_BIEN_THE.push([m.go, m.ten_dung]);
  const r = W.askBuiTrip(c.q, { noCtx: true });
  W.BT_BIEN_THE.pop();
  const key = JSON.stringify(r.ent || {});
  if (key.indexOf(c.id) >= 0 || r.kind === "askback") sua++; else sai.push(c.q + " áp xong vẫn trả " + (r.kind || "") + " " + key);
}
const pDung = coDeXuat ? deXuatDung / coDeXuat : 1, pSua = deXuatDung ? sua / deXuatDung : 1;
console.log(`Nhật ký giả lập: ${ca.length} câu gõ sai, trợ lý hiện tại trượt ${cauTruot.length}`);
console.log(`Có đề xuất biến thể: ${coDeXuat}/${cauTruot.length} · đề xuất đúng tên: ${deXuatDung} (${(pDung * 100).toFixed(1)}%) · áp vào thì trả đúng: ${sua} (${(pSua * 100).toFixed(1)}%)`);
sai.slice(0, 10).forEach(s => console.log("  - " + s));
const dat = pDung >= 0.9 && pSua >= 0.8 && coDeXuat >= cauTruot.length * 0.6;
console.log("hoc: " + (dat ? "đạt" : "TRƯỢT"));
process.exit(dat ? 0 : 1);
