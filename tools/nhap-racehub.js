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
/* Trùng mà tên và tọa độ không bắt được (tra tay 21/11/2026): tên RaceHub -> tên địa danh Trip */
const ALIAS = { "Hoàng thành Huế (Đại Nội)": "Đại Nội Huế (Kinh thành Huế)", "Cô Tô": "Đảo Cô Tô", "Bãi biển Cát Cò": "Bãi tắm Cát Cò 1, 2, 3",
  "Khu du lịch Đồi Rồng": "Bãi biển Đồ Sơn (khu 1, 2, 3) + Đồi Rồng", "Khu di tích Tân Trào": "Khu di tích lịch sử Tân Trào (ATK Tân Trào)",
  "Quê Bác - Làng Sen": "Khu di tích Kim Liên (Làng Sen quê Bác)", "Sân bay Khe Sanh": "Căn cứ Khe Sanh – sân bay Tà Cơn",
  "Đền Vua Đinh Tiên Hoàng": "Cố đô Hoa Lư (đền Đinh – đền Lê)", "Đỉnh Langbiang": "Núi Langbiang", "Khu danh thắng Bửu Long": "Khu du lịch Bửu Long",
  "Khu di tích Xẻo Quýt": "Khu du lịch Xẻo Quýt", "Cù lao Thới Sơn": "Cồn Thới Sơn", "Vườn quốc gia Mũi Cà Mau": "Khu du lịch Quốc gia Mũi Cà Mau",
  "Rừng U Minh Hạ": "Vườn quốc gia U Minh Hạ", "Vườn quốc gia Cát Tiên": "Vườn quốc gia Nam Cát Tiên" };
/* Điền giá/giờ theo loại địa điểm khi RaceHub không có: chỉ cho nơi công cộng gần như chắc chắn không bán vé.
   Ghi rõ là theo loại địa điểm, chưa kiểm riêng từng nơi. Nơi có thể bán vé (bảo tàng, khu du lịch, vườn quốc gia,
   thác, khu di tích, công viên thú...) giữ "chưa có dữ liệu" để kiểm riêng. */
const LOAI = [
  [/^(Cầu|Phố|Đường|Quảng trường|Đèo|Mốc|Cột mốc|Tượng đài|Hẻm|Bãi|Biển|Bãi biển|Vịnh|Cánh đồng|Ruộng bậc thang|Cao nguyên|Đồi|Thành phố|Khu đô thị)(?=[\s,(-]|$)/i, "Miễn phí (nơi công cộng; theo loại địa điểm, chưa kiểm riêng)", "Cả ngày"],
  [/^(Hồ)(?=[\s,(-]|$)/i, "Miễn phí ngắm hồ; thuyền, dịch vụ tính riêng (theo loại địa điểm, chưa kiểm riêng)", "Cả ngày"],
  [/^Chợ nổi(?=[\s,(-]|$)/i, "Miễn phí; thuê thuyền ra chợ tính riêng (theo loại địa điểm, chưa kiểm riêng)", "Họp sáng sớm, đẹp nhất khoảng 5h–8h (theo loại địa điểm, chưa kiểm riêng)"],
  [/^Chợ(?=[\s,(-]|$)/i, "Miễn phí vào chợ (theo loại địa điểm, chưa kiểm riêng)", "Khoảng 5:00–18:00 (ước tính, chưa kiểm)"],
  [/^Công viên (?!Thủ Lệ|địa chất)/i, "Miễn phí vào công viên (theo loại địa điểm, chưa kiểm riêng)", "Cả ngày"],
  [/^(Chùa|Đền|Đình|Nhà thờ|Miếu|Thiền viện|Tòa Thánh|Dinh Cậu|Dinh Cô|Quan Âm Phật Đài|Thích Ca Phật Đài|Trung tâm Hành hương)(?=[\s,(-]|$)/i, "Thường không bán vé vào cổng, có thể thu phí gửi xe (theo loại địa điểm, chưa kiểm riêng)", "Khoảng 6:00–18:00 (ước tính, chưa kiểm)"]
];
const LOAI_BO = /^(Hồ Than Thở|Đồi Cù|Cánh đồng cừu|Hẻm Tu Sản|Ruộng bậc thang Mù Cang Chải)/; /* có thể bán vé hoặc phải đi thuyền: để kiểm riêng */
/* Nơi có thể bán vé: điền khoảng ước tính theo loại địa điểm (anh Phụng duyệt 23/11/2026: app du lịch, giá đổi liên tục,
   được ghi thông tin chưa kiểm miễn là ghi rõ). Mọi dòng ghi "ước tính, chưa kiểm". */
const UT = " (ước tính, chưa kiểm)";
const UOC = [
  [/^Đồi Cù/i, "Ngắm đồi từ ngoài miễn phí; sân golf tính riêng" + UT, "Ban ngày"],
  [/^Cánh đồng cừu/i, "Khoảng 20.000–50.000đ/người" + UT, "Khoảng 7:00–17:30" + UT],
  [/^Hẻm Tu Sản/i, "Ngắm từ điểm dừng trên đèo miễn phí; thuyền sông Nho Quế khoảng 100.000–150.000đ/người" + UT, "Ban ngày; thuyền chạy khoảng 7:00–17:00" + UT],
  [/^Ruộng bậc thang/i, "Ngắm ven đường miễn phí; một số điểm chụp ảnh thu khoảng 10.000–30.000đ" + UT, "Ban ngày; đẹp nhất mùa lúa chín (tháng 9–10)"],
  [/suối nước nóng|suối khoáng/i, "Khoảng 100.000–300.000đ/người" + UT, "Khoảng 7:00–21:00" + UT],
  [/^Lễ hội/i, "Miễn phí xem lễ hội" + UT, "Theo lịch lễ hội hằng năm"],
  [/^(Bảo tàng)/i, "Khoảng 0–40.000đ/người; nhiều bảo tàng tỉnh miễn phí" + UT, "Khoảng 7:30–11:00 và 13:30–17:00, thường nghỉ thứ Hai" + UT],
  [/^(Thác|Suối|Động|Hang|Ngũ Động)(?=[\s,(-]|$)/i, "Khoảng 20.000–100.000đ/người; dịch vụ tính riêng" + UT, "Khoảng 7:00–17:00" + UT],
  [/^(Khu du lịch|Khu bảo tồn|Vườn quốc gia|Rừng|Sân chim|Vườn chim|Trảng cỏ|Công viên|Thung lũng|Vườn trái cây|Quần thể cây)(?=[\s,(-]|$)/i, "Khoảng 20.000–150.000đ/người; xe điện, thuyền, dịch vụ tính riêng" + UT, "Khoảng 7:00–17:00" + UT],
  [/^(Núi|Đỉnh|Núi lửa|Danh thắng)(?=[\s,(-]|$)/i, "Thường miễn phí lên núi; cáp treo, xe điện nếu có tính riêng" + UT, "Ban ngày" + UT],
  [/^(Làng|Sóc|Cồn|Cù lao|Đảo|Mai Châu|Thung Nai|Tam Đảo|Hà Tiên|Cao nguyên|Mũi)(?=[\s,(-—]|$)/i, "Thường miễn phí vào làng, khu; thuyền, dịch vụ tính riêng" + UT, "Ban ngày"],
  [/^(Căn cứ|Khu di tích|Di tích|Địa đạo|Địa điểm|Khu mộ|Mộ|Nhà tù|Nhà Giao tế|Khu lưu niệm|Thành|Thành cổ|Văn Miếu|Đàn|Quảng Bình Quan|Ải|Tháp|Tượng|Bạch Dinh|Hải đăng|Điểm cuối|Kho)(?=[\s,(-]|$)/i, "Khoảng 0–40.000đ/người; nhiều di tích miễn phí" + UT, "Khoảng 7:00–17:00" + UT]
];
const loai = name => (LOAI_BO.test(name) ? null : LOAI.find(r => r[0].test(name))) || UOC.find(r => r[0].test(name));
const newOf = old => Object.keys(S).find(k => S[k].includes(old));
/* Điểm RaceHub xếp nhầm tỉnh: chuyển sang đúng tỉnh cũ (vd Căn cứ Rừng Sác ở Cần Giờ, TP.HCM, không phải Đồng Nai) */
const MOVE = { "Căn cứ Sở Chỉ huy Đặc khu Rừng Sác": "TP.HCM" };

const out = {}, enrich = {}; const stat = { total: 0, added: 0, dupName: 0, dupNear: 0, enriched: 0, noProv: [] };
for (const s of SOURCES) {
  const old0 = NAME_FIX[s.name] || s.name, pid0 = newOf(old0);
  const data = JSON.parse(fs.readFileSync(path.join(RH, "features/explorer/data", s.file + ".json"), "utf8"));
  stat.total += data.length;
  if (!pid0) { stat.noProv.push(s.name); continue; }
  for (const x0 of data) {
    const x = x0, mvOld = MOVE[x.title];
    const old = mvOld || old0, pid = mvOld ? newOf(mvOld) : pid0;
    const prov = P.find(p => p.id === pid), isMain = S[pid][0] === old;
    const have = prov.places.concat(out[pid] || []);
    const n = norm(x.title), c = COORDS[String(s.base + x.id)];
    const dn = have.find(h => { if (ALIAS[x.title] === h.name) return true; const hn = norm(h.name); return hn === n || (n.length > 5 && hn.includes(n)) || (hn.length > 5 && n.includes(hn)); });
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
      price: (loai(x.title) || [])[1] || "Chưa có dữ liệu giá vé (đang bổ sung)", hours: (loai(x.title) || [])[2] || "Chưa có dữ liệu giờ mở cửa", duration: "",
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
