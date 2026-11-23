/* Chạy ngân hàng giả thiết: node hypotheses/run.mjs [--chi-bank] [--in-loi N]
   - bank.csv (1.014 giả thiết): chấm từng dòng, ghi kết quả máy chấm ra ket-qua-bank.csv (giữ nguyên cột kiểm tay).
   - live-120.json: 120 câu đã kiểm live 23/11 (phải đạt 120/120).
   - ngoai-du-lieu.json: 20 câu ngoài dữ liệu (phải đủ dự phòng 3 phần).
   - sinh-them.json (do generate.mjs tạo): bộ sinh thêm (≥ 85%).
   Thoát mã 1 nếu trượt tiêu chí nghiệm thu. */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { moi } from "./cham.mjs";
import { docCsv, ghiCsv } from "./csv.mjs";

const DIR = path.dirname(fileURLToPath(import.meta.url));
const ARG = process.argv.slice(2), IN = +(ARG[ARG.indexOf("--in-loi") + 1] || 15);
const C = moi(), { fold } = C;
const MUC = { "CHẶN": 3, "NẶNG": 2, "NHẸ": 1 };
const worst = L => L.reduce((m, e) => MUC[e.muc] > MUC[m] ? e.muc : m, "NHẸ");
const pct = (a, b) => b ? (100 * a / b).toFixed(1) + "%" : "—";

/* Nơi xuất phát trong câu "từ A đi B" / "đi B từ A" */
function tachTu(q) {
  let m = q.match(/\btừ\s+(.+?)\s+đi\s+(.+?)(?:\s+bằng gì|\s+mất|\?|$)/i);
  if (m) return { from: m[1], to: m[2] };
  m = q.match(/(?:^|\s)đi\s+(.+?)\s+từ\s+(.+?)(?:\s+bằng gì|\s+mất|\?|$)/i);
  if (m) return { from: m[2], to: m[1] };
  return null;
}
function hoi(q, ky, extra) {
  const o = Object.assign({ ky }, extra || {});
  const t = tachTu(q);
  if (t) { o.tg = C.dich(t.to) || null; const f = C.dich(t.from); o.from = f ? C.ten(f).replace("TP Hồ Chí Minh", "TP.HCM") : t.from; if (/hồ chí minh|tp\.?hcm|sài gòn/i.test(t.from)) o.from = "TP.HCM"; }
  const m = (ky || "").match(/Trả lời đúng:\s*([^(.,]+)/); if (m) { o.dung = m[1].trim(); const d = C.dich(o.dung); if (d && d.t === "prov") o.dungId = d.ref; if (/TP\.?HCM/.test(o.dung)) { o.dung = "Hồ Chí Minh"; o.dungId = "tp-ho-chi-minh"; } }
  if (/^\s*(X\s+)?khác/.test(q) || /khác .* (như )?thế nào/i.test(q)) { const a = q.split(/\s+khác\s+/i)[0]; o.tg = C.dich(a) || null; }
  return C.chamHoi(q, ky, o);
}
function chamDong(r) {
  const g = r["Giả thiết (câu hỏi / thao tác)"], ky = r["Kỳ vọng (thế nào là đúng)"];
  if (/^Hỏi trợ lý/i.test(g)) { const qs = [...g.matchAll(/"([^"]+)"/g)].map(m => m[1]); return qs.map(q => hoi(q, ky)); }
  if (/^Gõ/i.test(g)) { const m = g.match(/"([^"]+)"/) || g.match(/'([^']+)'/); const t = m[1].replace(/\s*\((mục[^)]*|thị trấn)\)/, ""); return [C.chamTim(t, ky)]; }
  if (/^Mở trang chi tiết .*mùa đẹp/i.test(g)) return [C.chamMua(g.match(/chi tiết\s+(.+?):/)[1])];
  if (/^Mở trang chi tiết .*giá vé/i.test(g)) return "KIỂM TAY: so giá trên trang với giá công bố của nơi bán vé (máy không xác minh được giá thật)";
  if (/^Lập kế hoạch/i.test(g)) return "KIỂM TAY: lập kế hoạch chạy trong trình duyệt (trinh-duyet.mjs kiểm 164 nơi đến)";
  return "KIỂM TAY: chưa có mẫu chấm";
}

/* ---------- 1. Ngân hàng 1.014 ---------- */
const bank = docCsv(fs.readFileSync(path.join(DIR, "bank.csv"), "utf8"));
const out = [], nhom = {}, loai = {}, chan = [], sai = [];
let dung = 0, tay = 0, base = 0, baseOk = 0, maxMs = 0;
for (const r of bank.rows) {
  const k = chamDong(r), g = r["Nhóm"];
  nhom[g] = nhom[g] || { n: 0, ok: 0, tay: 0 };
  const o = Object.assign({}, r);
  if (typeof k === "string") { o["Máy chấm"] = "KIỂM TAY"; o["Lỗi máy"] = k; nhom[g].tay++; tay++; out.push(o); continue; }
  const L = k.flatMap(x => x.loi.map(e => Object.assign({ q: x.q }, e)));
  k.forEach(x => { if (x.res && x.res.ms > maxMs) maxMs = x.res.ms; });
  nhom[g].n++;
  if (!L.length) { nhom[g].ok++; dung++; }
  L.forEach(e => { loai[e.loai] = (loai[e.loai] || 0) + 1; });
  if (L.some(e => e.muc === "CHẶN")) chan.push({ stt: r.STT, g: r["Giả thiết (câu hỏi / thao tác)"], L, k });
  else if (L.length) sai.push({ stt: r.STT, g: r["Giả thiết (câu hỏi / thao tác)"], L, k });
  if (r["Kết quả kiểm"]) { base++; if (!L.length) baseOk++; }
  o["Máy chấm"] = L.length ? "SAI" : "ĐÚNG";
  o["Mức lỗi máy"] = L.length ? worst(L) : "";
  o["Lỗi máy"] = L.map(e => e.loai + ": " + e.ghi + (k.length > 1 ? " [" + e.q + "]" : "")).join(" | ");
  o["Trợ lý trả (rút gọn)"] = k.map(x => (x.tg ? "[" + x.tg + "] " : "") + x.text.slice(0, 220)).join(" || ");
  out.push(o);
}
const H = bank.head.concat(["Máy chấm", "Mức lỗi máy", "Lỗi máy", "Trợ lý trả (rút gọn)"]);
fs.writeFileSync(path.join(DIR, "ket-qua-bank.csv"), "﻿" + ghiCsv(H, out));
const N = bank.rows.length - tay;
console.log("\n== Ngân hàng giả thiết: " + bank.rows.length + " dòng, máy chấm " + N + ", kiểm tay " + tay);
console.log("ĐÚNG " + dung + "/" + N + " (" + pct(dung, N) + ") · CHẶN " + chan.length + " · câu hỏi chậm nhất " + maxMs + " ms");
console.log("215 dòng đã kiểm live (mốc): máy chấm ĐÚNG " + baseOk + "/" + base);
Object.keys(nhom).forEach(g => console.log("  " + g.padEnd(26) + " " + (nhom[g].ok + "/" + nhom[g].n).padStart(8) + "  " + pct(nhom[g].ok, nhom[g].n).padStart(6) + (nhom[g].tay ? "  (+" + nhom[g].tay + " kiểm tay)" : "")));
console.log("Phân loại lỗi:", JSON.stringify(loai));
const inL = (arr, ten) => { if (!arr.length) return; console.log("\n-- " + ten + " (" + arr.length + ")"); arr.slice(0, IN).forEach(s => console.log("  #" + s.stt + " " + s.g.slice(0, 90) + "\n     " + s.L.map(e => e.muc + " " + e.loai + ": " + e.ghi).join(" | ").slice(0, 300) + "\n     trả: " + s.k.map(x => x.text.slice(0, 160)).join(" || "))); if (arr.length > IN) console.log("  … xem đủ trong ket-qua-bank.csv"); };
inL(chan, "Lỗi CHẶN");
inL(sai, "Câu sai khác");

let fail = !(N && dung / N >= 0.9 && !chan.length);

/* ---------- 2. 120 câu live, 20 câu ngoài dữ liệu, bộ sinh thêm ---------- */
function bo(file, ten, nguong, dieuKien) {
  const p = path.join(DIR, file); if (!fs.existsSync(p)) { console.log("\n== " + ten + ": chưa có " + file); return; }
  const L = JSON.parse(fs.readFileSync(p, "utf8")), xs = L.cau || L;
  let ok = 0; const bad = [], ch = [], nh = {};
  C.A.ctx.reset();
  for (const c of xs) {
    let k;
    if (c.loai === "tim") k = C.chamTim(c.q, c.ky || "");
    else if (c.loai === "mua-trang") k = C.chamMua(c.q);
    else {
      const o = { ky: c.ky, ctx: !!c.tiep };
      if (c.dich !== undefined) o.tg = c.dich ? C.TEN.find(t => t.t === c.dich.t && !t.tat && (!c.dich.p || t.ref.p.id === c.dich.p) && JSON.stringify(t.ref && (t.ref.x ? t.ref.x.id : t.ref)) === JSON.stringify(c.dich.ref)) || C.dich(c.dich.ten) : null;
      if (c.loaiHoi) o.loai = c.loaiHoi;
      if (c.dung) { o.dung = c.dung; o.dungId = c.dungId; }
      if (c.from) o.from = c.from;
      if (c.cam) o.cam = c.cam;
      if (c.truoc) { C.A.ctx.reset(); c.truoc.forEach(q => C.W.askBuiTrip(q)); o.ctx = true; }
      k = c.tg === undefined && !c.truoc && !c.tiep ? hoi(c.q, c.ky, o) : C.chamHoi(c.q, c.ky, o);
      if (c.duPhong && !/App chưa có thông tin này/.test(k.text)) k.loi.push({ muc: "NẶNG", loai: "thiếu dự phòng", ghi: "câu ngoài dữ liệu không dùng dự phòng" });
      if (c.duPhong && /App chưa có thông tin này/.test(k.text) && !/Cách khác/.test(k.text)) k.loi.push({ muc: "NẶNG", loai: "thiếu dự phòng", ghi: "dừng ở 'App chưa có thông tin này'" });
      if (c.phaiCo) c.phaiCo.forEach(s => { if (fold(k.text).indexOf(fold(s)) < 0) k.loi.push({ muc: "NẶNG", loai: "thiếu nội dung", ghi: "thiếu '" + s + "'" }); });
    }
    const g = c.nhom || "";
    nh[g] = nh[g] || [0, 0]; nh[g][1]++;
    if (!k.loi.length) { ok++; nh[g][0]++; } else { (k.loi.some(e => e.muc === "CHẶN") ? ch : bad).push({ c, k }); }
  }
  const r = ok / xs.length;
  console.log("\n== " + ten + ": ĐÚNG " + ok + "/" + xs.length + " (" + pct(ok, xs.length) + "), CHẶN " + ch.length + "  [cần " + dieuKien + "]");
  if (Object.keys(nh).length > 1) Object.keys(nh).forEach(g => console.log("  " + g.padEnd(30) + " " + nh[g][0] + "/" + nh[g][1]));
  const show = (a, t) => { if (!a.length) return; console.log("  -- " + t + " (" + a.length + ")"); a.slice(0, IN).forEach(({ c, k }) => console.log("    " + (c.truoc ? "[" + c.truoc.join(" → ") + "] → " : "") + c.q + "\n      " + k.loi.map(e => e.muc + " " + e.loai + ": " + e.ghi).join(" | ").slice(0, 260) + "\n      trả: " + k.text.slice(0, 160))); };
  show(ch, "CHẶN"); show(bad, "sai");
  if (r < nguong || (nguong >= 1 && ch.length) || (file === "sinh-them.json" && false)) fail = true;
  return { ok, n: xs.length, ch: ch.length };
}
if (!ARG.includes("--chi-bank")) {
  bo("live-120.json", "120 câu đã kiểm live 23/11", 1, "120/120");
  bo("ngoai-du-lieu.json", "20 câu ngoài dữ liệu", 1, "20/20 dự phòng 3 phần");
  const s = bo("sinh-them.json", "Bộ sinh thêm", 0.85, "≥ 85%");
}
console.log(fail ? "\nhypotheses: TRƯỢT tiêu chí" : "\nhypotheses: đạt");
process.exit(fail ? 1 : 0);
