/* Nhập file làm giàu điểm RaceHub do Muse nộp (du-lieu-34-tinh/lam-giau-racehub/dot-*.json)
   -> app/data/lam-giau.js. Chạy: node tools/nhap-lam-giau.js
   - lam_giau: ghi đè địa chỉ, giá vé, giờ mở cửa, thời gian, tọa độ; thêm thông tin thực tế và nguồn.
   - sai_ten_hoac_dong: điểm đóng cửa / không tồn tại thì gỡ khỏi app; điểm sai tên thì sửa theo SUA_TEN. */
const fs = require("fs"), path = require("path");
const ROOT = path.join(__dirname, "..");
const DIR = path.join(ROOT, "du-lieu-34-tinh", "lam-giau-racehub");
/* Sửa tay theo ghi chú sai_ten của Muse (nguồn ghi trong mục nguon) */
const SUA_TEN = {
  "rh-quang-nam-thanh-co-chien-dan": {
    name: "Tháp Chăm Chiên Đàn", address: "thôn Chiên Đàn, xã Tây Hồ (xã Tam An cũ), TP Đà Nẵng",
    lat: 15.61609, lng: 108.44259, approx: false,
    price: "20.000đ/người/lượt (theo NQ 98/2026/NQ-HĐND Đà Nẵng, xem 20/11/2026)",
    hours: "Chưa có dữ liệu giờ mở cửa",
    info: { loai: "di tích", xep_hang: null },
    sources: [{ url: "https://static.luatvietnam.vn/xem-noi-dung-file-nghi-quyet-98-2026-nq-hdnd-da-nang-sua-doi-bo-sung-phi-tham-quan-cong-trinh-van-hoa-444265-d2/uploaded/vietlawfile/2026/08/17/98_2026_nq_hdnd_110917.pdf.aspx", dung_cho: "tên, giá vé", ngay_xem: "2026-11-20" }]
  }
};
const INFO = ["loai", "xep_hang", "cach_di", "mua_dep", "gio_dep", "phi_gui_xe", "hop_tre_em", "hop_nguoi_gia", "xe_lan",
  "trang_phuc", "dat_truoc_giay_phep", "le_hoi", "canh_bao_an_toan", "wc_an_uong_tai_cho"];
const enrich = {}, remove = {}, files = fs.readdirSync(DIR).filter(f => /^dot-\d+.*\.json$/.test(f)).sort();
let nE = 0, nR = 0, nF = 0;
for (const f of files) {
  const d = JSON.parse(fs.readFileSync(path.join(DIR, f), "utf8"));
  const day = (d.meta && d.meta.ngay_lam) || "";
  for (const x of d.lam_giau || []) {
    const info = {}; INFO.forEach(k => { if (x[k] != null && x[k] !== "") info[k] = x[k]; });
    enrich[x.ma] = {
      address: x.dia_chi || undefined, price: x.gia_ve || undefined, hours: x.gio_mo_cua || undefined, duration: x.thoi_gian || undefined,
      lat: typeof x.lat === "number" ? x.lat : undefined, lng: typeof x.lng === "number" ? x.lng : undefined,
      approx: x.toa_do_xap_xi === true, info, photo: x.anh && x.anh.url ? x.anh : undefined,
      sources: (x.nguon || []).filter(s => s && /^https?:\/\//.test(s.url)), checked: day
    };
    nE++;
  }
  for (const s of d.sai_ten_hoac_dong || []) {
    if (SUA_TEN[s.ma]) { enrich[s.ma] = Object.assign({ checked: day, fixed_name: true }, SUA_TEN[s.ma]); nF++; }
    else { remove[s.ma] = { ly_do: s.ly_do, nguon: s.nguon }; nR++; }
  }
}
const js = "/* SINH TỰ ĐỘNG bởi tools/nhap-lam-giau.js từ file Muse nộp — không sửa tay. */\n" +
  "var LAM_GIAU=" + JSON.stringify(enrich) + ";\nvar LAM_GIAU_GO=" + JSON.stringify(remove) + ";\n" +
  "(function(){ if(typeof PROV_DATA===\"undefined\") return;\n" +
  "  function hav(a,b,c,d){var R=6371,p=Math.PI/180,x=Math.sin((c-a)*p/2),y=Math.sin((d-b)*p/2);return 2*R*Math.asin(Math.sqrt(x*x+Math.cos(a*p)*Math.cos(c*p)*y*y));}\n" +
  "  PROV_DATA.forEach(function(p){\n" +
  "    p.places=p.places.filter(function(x){ return !LAM_GIAU_GO[x.id]; });\n" +
  "    p.places.forEach(function(x){ var e=LAM_GIAU[x.id]; if(!e) return;\n" +
  "      [\"name\",\"address\",\"price\",\"hours\",\"duration\"].forEach(function(k){ if(e[k]) x[k]=e[k]; });\n" +
  "      if(typeof e.lat===\"number\"&&typeof e.lng===\"number\"){ x.lat=e.lat; x.lng=e.lng; x.approx=!!e.approx; if(p.lat!=null) x.dist=Math.round(hav(p.lat,p.lng,e.lat,e.lng)); }\n" +
  "      x.info=e.info||{}; x.sources=e.sources||[]; if(e.photo) x.photo=e.photo; x.checked=e.checked; x.enriched=true;\n" +
  "    });\n" +
  "  });\n" +
  "})();\n";
fs.writeFileSync(path.join(ROOT, "app", "data", "lam-giau.js"), js);
console.log("files", files.length, "enriched", nE, "renamed", nF, "removed", nR);
