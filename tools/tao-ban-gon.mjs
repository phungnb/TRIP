/* Sinh app/data/prov-data.gon.js: bản dữ liệu cho trình duyệt, bỏ các trường ghi nguồn
   (source, sources, review_m_src, phoneSrc, src) vì app đã ẩn hết phần nguồn (.src display:none),
   và viết liền không khoảng trắng. Bản gốc app/data/prov-data.js giữ nguyên cho đội kiểm chứng,
   cho /api/hoi và cho bộ kiểm tra. Giảm khoảng 23 KB (nén Brotli) ở lần tải đầu.
   Chạy lại mỗi khi sửa prov-data.js:  node tools/tao-ban-gon.mjs
   Kiểm tra bản gọn còn khớp bản gốc:   node tools/tao-ban-gon.mjs --kiem */
import fs from "node:fs";
import vm from "node:vm";

const APP = new URL("../app/", import.meta.url);
const GOC = new URL("data/prov-data.js", APP);
const GON = new URL("data/prov-data.gon.js", APP);
const BO = new Set(["source", "sources", "review_m_src", "phoneSrc", "src"]);

export function taoBanGon() {
  const ctx = {};
  vm.createContext(ctx);
  vm.runInContext(fs.readFileSync(GOC, "utf8") + ";this.P=PROV_DATA;", ctx);
  const strip = o => Array.isArray(o) ? o.map(strip)
    : (o && typeof o === "object") ? Object.fromEntries(Object.entries(o).filter(([k]) => !BO.has(k)).map(([k, v]) => [k, strip(v)]))
    : o;
  return "/* SINH TỰ ĐỘNG bởi tools/tao-ban-gon.mjs từ prov-data.js — không sửa tay. */\nvar PROV_DATA=" + JSON.stringify(strip(ctx.P)) + ";\n";
}

if (import.meta.url === `file://${process.argv[1]}`) {
  const moi = taoBanGon();
  if (process.argv.includes("--kiem")) {
    const cu = fs.existsSync(GON) ? fs.readFileSync(GON, "utf8") : "";
    if (cu !== moi) { console.log("prov-data.gon.js cũ, chạy: node tools/tao-ban-gon.mjs"); process.exit(1); }
    console.log("prov-data.gon.js khớp bản gốc");
  } else {
    fs.writeFileSync(GON, moi);
    console.log("Đã ghi prov-data.gon.js: " + Math.round(moi.length / 1024) + " KB");
  }
}
