/* Đưa các đề xuất ĐÃ DUYỆT ("duyet": true trong de-xuat.json) vào app/ai/hoc-them.js.
   Chỉ nhận loại bien_the (thêm cách gõ -> tên đúng). Loại thieu là việc bổ sung dữ liệu, làm theo quy trình nhập dữ liệu.
   Chạy: node tools/hoc/ap-dung.mjs [--vao tools/hoc/ra/de-xuat.json]   rồi: cd tests && npm test */
import fs from "node:fs";
import path from "node:path";
import vm from "node:vm";
import { fileURLToPath } from "node:url";

const DIR = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.join(DIR, "..", "..");
const OUT = path.join(ROOT, "app", "ai", "hoc-them.js");
const i = process.argv.indexOf("--vao");
const VAO = i > 0 ? process.argv[i + 1] : path.join(DIR, "ra", "de-xuat.json");

/* đọc phần đã học trước đó */
const cu = (() => { const c = {}; vm.createContext(c); vm.runInContext(fs.readFileSync(OUT, "utf8"), c); return c.BT_HOC || { bien_the: [] }; })();
const d = JSON.parse(fs.readFileSync(VAO, "utf8"));
/* bảng biến thể dùng chuỗi làm biểu thức chính quy: chỉ nhận chữ, số, khoảng trắng, gạch nối */
const sach = s => String(s || "").toLowerCase().trim().replace(/\s+/g, " ");
const hopLe = s => /^[\p{L}\p{N} -]{3,60}$/u.test(s);
const moi = [], bo = [];
for (const m of d.muc || []) {
  if (!m.duyet) continue;
  if (m.loai !== "bien_the") { bo.push(`#${m.id} loại ${m.loai}: không tự áp dụng`); continue; }
  const go = sach(m.go), ten = sach(m.ten_dung);
  if (!hopLe(go) || !hopLe(ten) || go === ten) { bo.push(`#${m.id} "${m.go}": ký tự không hợp lệ hoặc trùng tên`); continue; }
  if (cu.bien_the.some(v => v[0] === go) || moi.some(v => v[0] === go)) continue;
  moi.push([go, ten]);
}
const all = cu.bien_the.concat(moi);
const ngay = new Date().toISOString().slice(0, 10);
const src = fs.readFileSync(OUT, "utf8").replace(/var BT_HOC = \{[\s\S]*?\n\};/, "var BT_HOC = {\n  duyet: " + JSON.stringify(moi.length ? ngay : cu.duyet || "") + ",\n  bien_the: [" +
  all.map(v => "\n    " + JSON.stringify(v)).join(",") + (all.length ? "\n  " : "") + "]\n};");
fs.writeFileSync(OUT, src);
console.log(`Thêm ${moi.length} biến thể (tổng ${all.length}) vào app/ai/hoc-them.js`);
bo.forEach(s => console.log("  bỏ qua " + s));
if (moi.length) console.log("Chạy lại bộ test trước khi phát hành: cd tests && npm test");
