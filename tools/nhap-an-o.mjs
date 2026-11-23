/* Nhập món ăn và chỗ ở tìm thêm trên Google (file trên Drive, 23/11/2026) -> app/data/an-o-moi.js
   Chạy: node tools/nhap-an-o.mjs <thư mục chứa mon-an-google.json và cho-o-google.json>
   - Bỏ mục trùng tên với dữ liệu app (so tên đã bỏ dấu, chứa nhau).
   - Giá: bỏ phần ghi nguồn trong ngoặc; "chưa kiểm được" giữ nguyên ý, không tự đặt giá.
   - Đoạn ghi chú gõ không dấu thì bỏ, không tự thêm dấu. */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { napDuLieu } from "../tests/nap-du-lieu.mjs";

const ROOT = path.join(path.dirname(fileURLToPath(import.meta.url)), "..");
const SRC = process.argv[2];
if (!SRC) { console.error("Cần thư mục nguồn"); process.exit(1); }
const NGAY = "23/11/2026";
/* nạp dữ liệu app KHÔNG có an-o-moi.js để so trùng với dữ liệu gốc */
const { PROV } = napDuLieu({ bo: ["data/an-o-moi.js"] });
const fold = s => String(s || "").toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "").replace(/đ/g, "d").replace(/[^a-z0-9]+/g, " ").trim();
const slug = s => fold(s).replace(/ /g, "-").slice(0, 48);
const coDau = s => /[à-ỹđ]/i.test(s);
const TINH = {}; PROV.forEach(p => { TINH[fold(p.name)] = p; });
TINH[fold("Thành phố Huế")] = PROV.find(p => p.id === "hue");
TINH[fold("Thành phố Đà Nẵng")] = PROV.find(p => p.id === "da-nang");
const trung = (list, n) => { const f = fold(n); return list.some(y => { const g = fold(y.name); return g === f || (g.length > 6 && f.includes(g)) || (f.length > 6 && g.includes(f)); }); };
const giaSach = g => {
  g = String(g || "").trim();
  if (!g || /^chưa kiểm/i.test(g)) return null;
  return g.replace(/\s*\([^)]*(20\d\d|tham khảo|tìm|\.com|\.vn)[^)]*\)/gi, "")
    .replace(/,?\s*(đánh giá\s*)?\d+([.,]\d)?\/10(\s+[A-Z][\w.]*)?/g, "")
    .replace(/\s+/g, " ").replace(/[,;]\s*$/, "").trim() || null;
};
const nguon = s => { const m = String(s || "").match(/https?:\/\/\S+/); return { ten: String(s || "").split(/\s+[—-]\s+/)[0].trim(), url: m ? m[0] : "" }; };

const out = {}, dem = { mon: 0, mon_trung: 0, cho: 0, cho_trung: 0, mon_co_gia: 0, cho_co_gia: 0 }, lo = [];
const slot = pid => out[pid] || (out[pid] = { dishes: [], stays: [] });

for (const x of JSON.parse(fs.readFileSync(path.join(SRC, "mon-an-google.json"), "utf8"))) {
  const p = TINH[fold(x.tinh)]; if (!p) { lo.push("tỉnh lạ: " + x.tinh); continue; }
  const s = slot(p.id);
  if (trung(p.dishes, x.ten) || trung(s.dishes, x.ten)) { dem.mon_trung++; continue; }
  let desc = String(x.ghi_chu || ""), restaurants = [];
  const q = desc.match(/\s*Quán gợi ý:\s*(.+)$/i);
  if (q) {
    desc = desc.slice(0, q.index).trim();
    restaurants = [];
    q[1].replace(/\.\s*$/, "").split(/;\s*/).forEach(t => {
      const i = t.indexOf(", "), sau = i > 0 ? t.slice(i + 2).trim() : "";
      /* "cô Báu (Đống Đa), cô Huệ (Hoàn Kiếm)": phần sau dấu phẩy viết thường, không có số nhà là quán thứ hai, không phải địa chỉ */
      if (i > 0 && /^[a-zà-ỹđ]/.test(sau) && !/\d/.test(sau)) sau.split(/,\s*/).concat([]).forEach((n, k) => { if (!k) restaurants.push({ name: t.slice(0, i).trim(), address: "" }); restaurants.push({ name: n.trim(), address: "" }); });
      else restaurants.push(i > 0 ? { name: t.slice(0, i).trim(), address: sau } : { name: t.trim(), address: "" });
    });
    restaurants = restaurants.filter(r => r.name);
  }
  const gia = giaSach(x.gia); if (gia) dem.mon_co_gia++;
  const n = nguon(x.nguon);
  let id = "gg-" + slug(x.ten); while (s.dishes.some(d => d.id === id) || p.dishes.some(d => d.id === id)) id += "-2";
  s.dishes.push({ id, name: x.ten, meal: "Đặc sản địa phương", price: gia || "Chưa kiểm được giá, hỏi giá trước khi gọi món", desc, restaurants, source: n.ten, sources: n.url ? [{ url: n.url, ngay_xem: "2026-11-23" }] : [], checked: NGAY });
  dem.mon++;
}

for (const x of JSON.parse(fs.readFileSync(path.join(SRC, "cho-o-google.json"), "utf8"))) {
  const p = TINH[fold(x.tinh)]; if (!p) { lo.push("tỉnh lạ: " + x.tinh); continue; }
  const s = slot(p.id);
  if (trung(p.stays, x.ten) || trung(s.stays, x.ten)) { dem.cho_trung++; continue; }
  let kind = "", suitable = "", ghi = [];
  String(x.ghi_chu || "").split("|").map(t => t.trim()).filter(Boolean).forEach(t => {
    const m = t.match(/^(lo[aạ]i|ph[uù] h[oợ]p)\s*:\s*(.+)$/i);
    if (m && /^lo/i.test(m[1])) { if (coDau(m[2]) || /^[A-Za-z][A-Za-z -]*(\([^)]*\))?$/.test(m[2]) && !/\b(khach|san|nha|nghi)\b/i.test(m[2])) kind = m[2]; }
    else if (m) { if (coDau(m[2])) suitable = m[2]; }
    else if (coDau(t)) ghi.push(t);
  });
  const gia = giaSach(x.gia); if (gia) dem.cho_co_gia++;
  const n = nguon(x.nguon);
  let id = "gg-" + slug(x.ten); while (s.stays.some(d => d.id === id) || p.stays.some(d => d.id === id)) id += "-2";
  s.stays.push({ id, name: x.ten, address: x.dia_chi || p.name, kind: kind || "Chỗ ở", price: gia || "Chưa kiểm được giá, hỏi khi đặt", dist: ghi.join("; "), suitable, status_text: "Chưa kiểm chứng / chưa đối tác / chưa thu phí", source: n.ten, sources: n.url ? [{ url: n.url, ngay_xem: "2026-11-23" }] : [], checked: NGAY });
  dem.cho++;
}

const pids = PROV.map(p => p.id).filter(id => out[id]);
const js = `/* Món ăn và chỗ ở tìm thêm trên Google ngày ${NGAY} (mon-an-google.json, cho-o-google.json trên Drive).
   Sinh bởi tools/nhap-an-o.mjs, không sửa tay. Chỉ thêm mục app chưa có; giá chỉ ghi khi nguồn có.
   Chỗ ở: chưa kiểm chứng, chưa đối tác, chưa thu phí. */
var AN_O_MOI = {
${pids.map(id => `  ${JSON.stringify(id)}: {\n    dishes: [\n${out[id].dishes.map(d => "      " + JSON.stringify(d)).join(",\n")}\n    ],\n    stays: [\n${out[id].stays.map(d => "      " + JSON.stringify(d)).join(",\n")}\n    ]\n  }`).join(",\n")}
};
(function () {
  if (typeof PROV_DATA === "undefined") return;
  PROV_DATA.forEach(function (p) {
    var a = AN_O_MOI[p.id]; if (!a) return;
    var hd = {}, hs = {}; p.dishes.forEach(function (x) { hd[x.id] = 1; }); p.stays.forEach(function (x) { hs[x.id] = 1; });
    a.dishes.forEach(function (x) { if (!hd[x.id]) p.dishes.push(x); });
    a.stays.forEach(function (x) { if (!hs[x.id]) p.stays.push(x); });
  });
})();
`;
fs.writeFileSync(path.join(ROOT, "app/data/an-o-moi.js"), js);
console.log(JSON.stringify(dem), lo.length ? lo : "");
