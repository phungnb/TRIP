/* Sinh app/ai/boi-canh.js: đoạn giới thiệu, bối cảnh lịch sử của địa danh, lấy từ phần "Bối cảnh" (Wikipedia tiếng Việt)
   mà engine học trước đã gom trong tools/buitrip-ai/js-port/kb.json. Chỉ giữ địa danh có trong dữ liệu app, cắt ở câu trọn vẹn cuối cùng.
   Văn bản Wikipedia theo giấy phép CC BY-SA 4.0: trợ lý ghi giấy phép dưới đoạn trích, trang /chinh-sach/ ghi rõ.
   Chạy: node tools/tao-boi-canh.mjs  (rồi tăng VER trong app/sw.js) */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
const ROOT = path.join(path.dirname(fileURLToPath(import.meta.url)), "..");
const fold = s => String(s || "").toLowerCase().replace(/đ/g, "d").normalize("NFD").replace(/[̀-ͯ]/g, "").replace(/[^a-z0-9]+/g, " ").trim();
const main = s => String(s || "").split(" (")[0];
const kb = JSON.parse(fs.readFileSync(path.join(ROOT, "tools/buitrip-ai/js-port/kb.json"), "utf8"));
/* tên địa danh trong dữ liệu app: đọc prov-data.js, bo-sung.js… trong vm cho chắc */
import vm from "node:vm";
const ctx = { window: {}, console }; ctx.window = ctx; vm.createContext(ctx);
for (const f of ["data/prov-data.js", "data/bo-sung.js", "data/dia-diem-moi.js", "data/lam-giau.js", "data/racehub-places.js"]) {
  const p = path.join(ROOT, "app", f); if (fs.existsSync(p)) try { vm.runInContext(fs.readFileSync(p, "utf8") + "\n;this.PROV_DATA=typeof PROV_DATA!=='undefined'?PROV_DATA:this.PROV_DATA;", ctx); } catch (e) { console.error("bỏ qua", f, e.message); }
}
const TEN = new Set(); (ctx.PROV_DATA || []).forEach(p => p.places.forEach(x => TEN.add(fold(main(x.name)))));
const out = {}; let bo = 0;
for (const e of kb) {
  const m = String(e.ghi_chu || "").match(/Bối cảnh \((.*?), Wikipedia[^)]*\):\s*(.*)$/s);
  if (!m) continue;
  const k = fold(main(e.ten));
  if (!TEN.has(k)) { bo++; continue; }
  let t = m[2].replace(/\s+/g, " ").trim();
  const cut = Math.max(t.lastIndexOf(". "), t.endsWith(".") ? t.length - 1 : -1);
  t = cut > 80 ? t.slice(0, cut + 1) : "";
  if (!t || /\b(Loai:|tìm Google|mâu thuẫn)\b/.test(t)) { bo++; continue; }
  out[k] = { bai: m[1].trim(), t };
}
const js = "/* Đoạn giới thiệu địa danh trích Wikipedia tiếng Việt (CC BY-SA 4.0). Sinh bởi tools/tao-boi-canh.mjs, không sửa tay.\n" +
  "   khóa: tên địa danh bỏ dấu; bai: tên bài Wikipedia; t: đoạn trích. */\nvar BT_BOI_CANH = " + JSON.stringify(out) + ";\n";
fs.writeFileSync(path.join(ROOT, "app/ai/boi-canh.js"), js);
console.log("boi-canh.js:", Object.keys(out).length, "địa danh,", Math.round(js.length / 1024), "KB; bỏ", bo);
