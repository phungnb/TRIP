/* Nạp dữ liệu + BuiTrip AI vào Node (không trình duyệt, không DOM), đúng thứ tự như index.html. */
import fs from "node:fs";
import path from "node:path";
import vm from "node:vm";
import { APP } from "./nap-du-lieu.mjs";
export const AI_FILES = ["ai/hoi-dap.js", "ai/hoc-them.js", "ai/de-nham.js", "ai/chuan-hoa.js", "ai/y-dinh.js", "ai/thuc-the.js", "ai/tra-loi.js", "ai/goi-y.js", "ai/ngu-canh.js", "ai/index.js"];
export function napAI() {
  const ctx = { console, Date, Math, JSON };
  ctx.window = ctx;
  vm.createContext(ctx);
  for (const f of ["data/prov-data.js", "data/sap-nhap.js", "data/racehub-places.js", "data/lam-giau.js", "data/bo-sung.js", "data/dia-diem-moi.js", "data/an-o-moi.js", "data/gia-tham-khao.js", "data/trung-tam.js", "data/khu-vuc.js", "data/ho-so-khu.js", "js/lam-sach.js", ...AI_FILES]) {
    vm.runInContext(fs.readFileSync(path.join(APP, f), "utf8"), ctx, { filename: f });
  }
  return ctx;
}
/* HTML -> chữ để chấm */
export const chu = h => String(h || "").replace(/<[^>]+>/g, " ").replace(/&amp;/g, "&").replace(/&quot;/g, '"').replace(/&#39;/g, "'").replace(/&lt;/g, "<").replace(/&gt;/g, ">").replace(/\s+/g, " ").trim();
/* Ô tìm kiếm (js/tim-kiem.js) cần vài hàm của app.js: lấy đúng mã nguồn các hàm đó, không chép tay */
function layHam(src, ten) {
  const i = src.search(new RegExp("^function " + ten + "\\(", "m")); if (i < 0) throw new Error("app.js thiếu hàm " + ten);
  let d = 0, j = src.indexOf("{", i);
  for (; j < src.length; j++) { if (src[j] === "{") d++; else if (src[j] === "}" && --d === 0) break; }
  return src.slice(i, j + 1);
}
export function napTimKiem(ctx) {
  const src = fs.readFileSync(path.join(APP, "js/app.js"), "utf8");
  const dest = src.match(/^var DESTINATIONS = [\s\S]*?\n\}\);/m)[0];
  vm.runInContext([dest, layHam(src, "foldStr"), layHam(src, "nameTokens"), layHam(src, "wordMatch")].join("\n"), ctx, { filename: "app.js (trích)" });
  vm.runInContext(fs.readFileSync(path.join(APP, "js/tim-kiem.js"), "utf8"), ctx, { filename: "js/tim-kiem.js" });
  return ctx;
}
