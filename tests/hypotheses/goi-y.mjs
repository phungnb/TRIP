/* Bộ thử lớp gợi ý nơi đi theo điều kiện (app/ai/goi-y.js).
   Mỗi câu: kind mong đợi (mặc định goiy), "mot" = phải có ít nhất 1 tên trong danh sách gợi ý,
   "cam" = không được có tên nào. Đều phải có nút, không dùng câu dự phòng.
   Chạy: node tests/hypotheses/goi-y.mjs */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { moi } from "./cham.mjs";

const DIR = path.dirname(fileURLToPath(import.meta.url));
const C = moi(), W = C.W;
const B = JSON.parse(fs.readFileSync(path.join(DIR, "goi-y.json"), "utf8"));
const txt = h => String(h || "").replace(/<[^>]+>/g, " ").replace(/&amp;/g, "&").replace(/\s+/g, " ").trim();
const listOf = h => (String(h).match(/<li><b>([^<]+)<\/b>/g) || []).map(s => s.replace(/<[^>]+>/g, ""));
let ok = 0; const loi = [];
for (const c of B) {
  const r = W.askBuiTrip(c.q, { noCtx: true }), L = listOf(r.html), e = [];
  const want = c.kind || "goiy";
  if (want.startsWith("!") ? r.kind === want.slice(1) : r.kind !== want) e.push("kind " + r.kind + ", cần " + want);
  if (r.kind === "goiy") {
    if (!L.length) e.push("không có nơi nào");
    if (!/<button/.test(r.html)) e.push("thiếu nút");
    if (c.mot && !L.some(n => c.mot.some(m => n.indexOf(m) >= 0))) e.push("thiếu một trong: " + c.mot.join(", "));
    (c.cam || []).forEach(m => { const x = L.filter(n => n.indexOf(m) >= 0 || (m.endsWith("(") && n === m.slice(0, -2))); if (x.length) e.push("gợi ý nơi cấm: " + x.join(", ")); });
  }
  if (/Nguồn:|tìm Google|mâu thuẫn|\bLoai:/.test(txt(r.html))) e.push("lộ ghi chú nguồn");
  if (e.length) loi.push({ q: c.q, e, L }); else ok++;
}
loi.forEach(l => console.log("  SAI  " + l.q + "\n       " + l.e.join("; ") + "\n       gợi ý: " + l.L.join(" | ")));
console.log("goi-y: " + ok + "/" + B.length + " đạt");
if (ok < B.length) process.exit(1);
