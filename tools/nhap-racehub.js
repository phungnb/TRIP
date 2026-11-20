/* Nhập địa danh "Hộ chiếu khám phá" của RaceHub (63 tỉnh cũ) vào Trip (34 tỉnh mới).
   Chạy: node tools/nhap-racehub.js <đường dẫn repo racehub>
   Ra: app/data/racehub-places.js (nạp sau prov-data.js + sap-nhap.js, nối thêm vào PROV_DATA[i].places)
   - Bỏ điểm trùng với địa danh Trip đang có (tên giống nhau sau khi bỏ dấu, hoặc tọa độ cách < 300 m).
   - Tọa độ RaceHub tra tay trên Google Maps, chưa kiểm thực địa -> approx:true.
   - Không có giá vé, giờ mở cửa: ghi "chưa có dữ liệu", để Muse/Gemini bổ sung sau. */
const fs = require("fs"), path = require("path"), vm = require("vm");
const RH = process.argv[2] || "/home/user/racehub";
const APP = path.join(__dirname, "..", "app");
const ctx = { window: {} };
vm.runInNewContext(fs.readFileSync(path.join(APP, "data/prov-data.js"), "utf8") + ";this.P=PROV_DATA;" +
  fs.readFileSync(path.join(APP, "data/sap-nhap.js"), "utf8") + ";this.S=SAP_NHAP;", ctx);
const P = ctx.P, S = ctx.S;

const src = fs.readFileSync(path.join(RH, "features/explorer/model/places.ts"), "utf8");
const imports = {}; for (const m of src.matchAll(/import (\w+) from '\.\.\/data\/([\w-]+)\.json'/g)) imports[m[1]] = m[2];
const SOURCES = [...src.matchAll(/\{ name: '([^']+)', base: (\d+), data: (\w+) as/g)].map(m => ({ name: m[1], base: +m[2], file: imports[m[3]] }));
const COORDS = JSON.parse(fs.readFileSync(path.join(RH, "features/explorer/data/coords.json"), "utf8"));
const NAME_FIX = { "Thừa Thiên Huế": "Huế", "TP. Hồ Chí Minh": "TP.HCM", "Bà Rịa - Vũng Tàu": "Bà Rịa – Vũng Tàu" };

const norm = s => (s || "").toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "").replace(/đ/g, "d").replace(/\(.*?\)/g, " ").replace(/[^a-z0-9 ]+/g, " ").replace(/\s+/g, " ").trim();
const slug = s => norm(s).replace(/ /g, "-");
const hav = (a, b, c, d) => { const R = 6371, r = Math.PI / 180, x = Math.sin((c - a) * r / 2), y = Math.sin((d - b) * r / 2); return 2 * R * Math.asin(Math.sqrt(x * x + Math.cos(a * r) * Math.cos(c * r) * y * y)); };
const newOf = old => Object.keys(S).find(k => S[k].includes(old));

const out = {}, enrich = {}; const stat = { total: 0, added: 0, dupName: 0, dupNear: 0, enriched: 0, noProv: [] };
for (const s of SOURCES) {
  const old = NAME_FIX[s.name] || s.name, pid = newOf(old);
  const data = JSON.parse(fs.readFileSync(path.join(RH, "features/explorer/data", s.file + ".json"), "utf8"));
  stat.total += data.length;
  if (!pid) { stat.noProv.push(s.name); continue; }
  const prov = P.find(p => p.id === pid), isMain = S[pid][0] === old;
  const have = prov.places.concat(out[pid] || []);
  for (const x of data) {
    const n = norm(x.title), c = COORDS[String(s.base + x.id)];
    const dn = have.find(h => { const hn = norm(h.name); return hn === n || (n.length > 5 && hn.includes(n)) || (hn.length > 5 && n.includes(hn)); });
    if (dn) { stat.dupName++; if (process.env.SHOWDUP) console.log("DUP", old, "|", x.title, "=>", dn.name);
      if (!dn.from_racehub && !dn.history) { (enrich[pid] = enrich[pid] || {})[dn.id] = { history: x.history || "", food_near: x.foodName ? { name: x.foodName, desc: x.food || "" } : null, rh_note: x.culture || "" }; dn.history = x.history; stat.enriched++; }
      continue; }
    if (c && have.some(h => h.lat != null && hav(h.lat, h.lng, c.lat, c.lng) < 0.3)) { stat.dupNear++; continue; }
    const dist = c && prov.lat != null ? Math.round(hav(prov.lat, prov.lng, c.lat, c.lng)) : null;
    const place = {
      id: "rh-" + slug(old) + "-" + slug(x.title), name: x.title,
      address: isMain ? "" : old + " cũ", old_prov: old,
      cluster: isMain ? "kham-pha-them" : "khu-" + slug(old),
      lat: c ? +c.lat.toFixed(6) : null, lng: c ? +c.lng.toFixed(6) : null, approx: true,
      dist: dist,
      price: "Chưa có dữ liệu giá vé (đang bổ sung)", hours: "Chưa có dữ liệu giờ mở cửa", duration: "",
      suitable: "", note: x.culture || "",
      history: x.history || "", food_near: x.foodName ? { name: x.foodName, desc: x.food || "" } : null,
      runner_note: [x.runner && x.runner.noi_dung, x.runnerNote].filter(Boolean).join(" "),
      source: "Hộ chiếu khám phá RaceHub (tọa độ tra tay trên Google Maps, chưa kiểm thực địa)", from_racehub: true
    };
    (out[pid] = out[pid] || []).push(place); have.push(place); stat.added++;
  }
}
const labels = {}; Object.keys(S).forEach(pid => S[pid].slice(1).forEach(o => labels["khu-" + slug(o)] = "Khu " + o + " cũ"));
labels["kham-pha-them"] = "Khám phá thêm";
const js = "/* SINH TỰ ĐỘNG bởi tools/nhap-racehub.js ngày " + new Date().toISOString().slice(0, 10) + " — không sửa tay.\n" +
  "   Địa danh từ Hộ chiếu khám phá RaceHub, đã bỏ điểm trùng với dữ liệu Trip. Thông tin tham khảo. */\n" +
  "var RACEHUB_PLACES=" + JSON.stringify(out) + ";\nvar RACEHUB_ENRICH=" + JSON.stringify(enrich) + ";\nvar RACEHUB_CLUSTERS=" + JSON.stringify(labels) + ";\n" +
  "(function(){ if(typeof PROV_DATA===\"undefined\") return; PROV_DATA.forEach(function(p){ var e=RACEHUB_ENRICH[p.id]; if(e) p.places.forEach(function(x){ var r=e[x.id]; if(r){ x.history=r.history; x.food_near=r.food_near; x.rh_note=r.rh_note; } }); var a=RACEHUB_PLACES[p.id]; if(a) p.places=p.places.concat(a); }); })();\n";
fs.writeFileSync(path.join(APP, "data/racehub-places.js"), js);
console.log(JSON.stringify(stat), "bytes", js.length);
console.log(Object.entries(out).map(([k, v]) => k + ":" + v.length).join(" "));
