/* Kiểm dữ liệu tĩnh: không cần trình duyệt. Chạy: node tests/du-lieu.mjs */
import fs from "node:fs";
import path from "node:path";
import { APP, napDuLieu } from "./nap-du-lieu.mjs";
const loi = [];
const ok = (c, m) => { if (!c) loi.push(m); };
const { PROV, SAP, PHOTOS } = napDuLieu();

ok(Array.isArray(PROV) && PROV.length === 34, "Phải có đúng 34 tỉnh thành, đang có " + (PROV && PROV.length));
const provIds = new Set(PROV.map(p => p.id));
let nPlace = 0, nStay = 0, nDish = 0;
for (const p of PROV) {
  ok(p.id && p.name, "Tỉnh thiếu id/tên");
  for (const k of ["places", "stays", "dishes"]) {
    ok(Array.isArray(p[k]) && p[k].length > 0, p.id + ": thiếu " + k);
    const seen = new Set();
    for (const x of p[k] || []) {
      ok(x.id && x.name, p.id + "/" + k + ": mục thiếu id hoặc tên");
      ok(!seen.has(x.id), p.id + "/" + k + ": trùng id " + x.id);
      seen.add(x.id);
      if (x.lat != null && x.lng != null) {
        ok(x.lat > 8 && x.lat < 23.5 && x.lng > 102 && x.lng < 110, p.id + "/" + x.id + ": tọa độ ngoài Việt Nam " + x.lat + "," + x.lng);
      }
    }
  }
  nPlace += p.places.length; nStay += p.stays.length; nDish += p.dishes.length;
  ok(p.itins && p.itins["3N2D"], p.id + ": thiếu lịch trình 3N2Đ");
}
for (const id of Object.keys(SAP || {})) ok(provIds.has(id), "SAP_NHAP có tỉnh lạ: " + id);

/* Người dùng không thấy ghi chú nghiên cứu: chữ hiển thị không còn "theo nguồn", "mâu thuẫn" */
const SKIP = new Set(["source", "sources", "review_m_src", "review_m_date", "phoneSrc", "src", "url"]);
const lo = [];
(function walk(o, k) {
  if (typeof o === "string") { if (!SKIP.has(k) && /theo (các |nhiều |một số )?nguồn|các nguồn mâu thuẫn/i.test(o)) lo.push(k + ": " + o.slice(0, 80)); return; }
  if (o && typeof o === "object") for (const x in o) walk(o[x], Array.isArray(o) ? k : x);
})(PROV, "");
ok(lo.length === 0, "Còn ghi chú nguồn hiện cho người dùng:\n  " + lo.slice(0, 5).join("\n  "));

/* Ảnh khai báo phải có tệp thật */
for (const kind of ["spot", "prov"]) for (const [id, ph] of Object.entries((PHOTOS || {})[kind] || {})) {
  for (const w of [500, 960]) {
    const f = path.join(APP, ph.u.replace("{w}", w).replace(/^\//, ""));
    ok(fs.existsSync(f), "Thiếu ảnh " + f.replace(APP, "app"));
  }
  ok(ph.a && ph.l, "Ảnh " + id + " thiếu tác giả/giấy phép");
}

/* Mọi tệp mà trang và service worker cần đều tồn tại */
const html = fs.readFileSync(path.join(APP, "index.html"), "utf8");
for (const m of html.matchAll(/<script src="([^"]+)"/g)) if (!/^https?:/.test(m[1])) ok(fs.existsSync(path.join(APP, m[1])), "index.html gọi tệp không có: " + m[1]);
const sw = fs.readFileSync(path.join(APP, "sw.js"), "utf8");
const core = JSON.parse(sw.match(/var CORE = (\[[\s\S]*?\]);/)[1]);
for (const f of core) if (f !== "/") ok(fs.existsSync(path.join(APP, f)), "sw.js lưu sẵn tệp không có: " + f);
const mf = JSON.parse(fs.readFileSync(path.join(APP, "manifest.webmanifest"), "utf8"));
for (const ic of mf.icons) ok(fs.existsSync(path.join(APP, ic.src)), "manifest thiếu biểu tượng " + ic.src);

console.log("Dữ liệu: " + PROV.length + " tỉnh, " + nPlace + " địa danh, " + nStay + " chỗ ở, " + nDish + " món");
if (loi.length) { console.error("LỖI (" + loi.length + "):\n- " + loi.join("\n- ")); process.exit(1); }
console.log("du-lieu: đạt");
