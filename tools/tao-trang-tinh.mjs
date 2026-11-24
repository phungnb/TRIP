/* Sinh trang tĩnh cho từng tỉnh (app/tinh/<id>/index.html), sitemap.xml và robots.txt
   để Google đọc được nội dung mà không cần chạy JavaScript.
   Chạy lại mỗi khi dữ liệu đổi: node tools/tao-trang-tinh.mjs
   CI kiểm trang đã sinh có khớp dữ liệu không (tests/du-lieu.mjs). */
import fs from "node:fs";
import path from "node:path";
import { APP, napDuLieu } from "../tests/nap-du-lieu.mjs";

const SITE = "https://buitrip.vercel.app";
const { PROV, SAP } = napDuLieu();

const esc = s => String(s == null ? "" : s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
const cut = (s, n) => { s = String(s || "").trim(); return s.length > n ? s.slice(0, n - 1).replace(/\s+\S*$/, "") + "…" : s; };
const chua = s => !s || /^chưa (có|kiểm)/i.test(String(s).trim());

function tenDayDu(p) {
  const cu = (SAP[p.id] || []).filter(x => x !== p.name);
  return cu.length ? p.name + " (gồm cả " + cu.join(", ") + " cũ)" : p.name;
}

function trang(p) {
  const url = SITE + "/tinh/" + p.id + "/";
  const cu = (SAP[p.id] || []).filter(x => x !== p.name);
  const title = "Du lịch " + p.name + " tự túc: đi đâu, ở đâu, ăn gì, hết bao nhiêu | BuiTrip";
  const desc = cut("Cẩm nang " + tenDayDu(p) + ": " + p.places.length + " địa danh có giá vé, " + p.stays.length + " chỗ ở, " + p.dishes.length + " món kèm quán, chi phí 3 ngày 2 đêm và lịch trình mẫu. " + (p.best_season ? "Mùa đẹp: " + p.best_season : ""), 300);
  const places = p.places.filter(x => x.name);
  const ld = {
    "@context": "https://schema.org", "@type": "TouristDestination", name: p.name, url, description: cut(p.overview || desc, 300),
    touristType: "Du lịch tự túc",
    ...(p.lat != null ? { geo: { "@type": "GeoCoordinates", latitude: p.lat, longitude: p.lng } } : {}),
    includesAttraction: places.slice(0, 30).map(x => ({ "@type": "TouristAttraction", name: x.name, ...(x.address ? { address: x.address } : {}) }))
  };
  const cost = (p.cost || []).filter(r => r && r.label && r.value);
  const it = (p.itins && p.itins["3N2D"]) || [];
  const app = "/#/tinh/" + p.id;

  return `<!doctype html>
<html lang="vi">
<head>
<meta charset="utf-8" />
<meta name="viewport" content="width=device-width, initial-scale=1" />
<title>${esc(title)}</title>
<meta name="description" content="${esc(desc)}" />
<link rel="canonical" href="${url}" />
<meta property="og:type" content="article" />
<meta property="og:title" content="${esc(title)}" />
<meta property="og:description" content="${esc(desc)}" />
<meta property="og:url" content="${url}" />
<meta name="theme-color" content="#0f5c33" />
<link rel="icon" type="image/png" sizes="32x32" href="/img/icon/favicon-32.png" />
<link rel="manifest" href="/manifest.webmanifest" />
<script type="application/ld+json">${JSON.stringify(ld).replace(/</g, "\\u003c")}</script>
<style>
:root{--bg:#f6f4ef;--card:#fff;--ink:#1d2320;--muted:#5b6660;--line:#e3e0d8;--green:#0f5c33;--accent:#c4501d}
@media (prefers-color-scheme:dark){:root{--bg:#121614;--card:#1b211e;--ink:#e8ece9;--muted:#9fb0a7;--line:#2c3631;--green:#6fcf97;--accent:#f0a06a}}
*{box-sizing:border-box}body{margin:0;background:var(--bg);color:var(--ink);font:16px/1.6 system-ui,-apple-system,"Segoe UI",Roboto,sans-serif}
main{max-width:760px;margin:0 auto;padding:16px}a{color:var(--green)}h1{font-size:1.6rem;line-height:1.3;margin:8px 0}
h2{font-size:1.2rem;margin:28px 0 8px}.muted{color:var(--muted)}.cta{display:inline-block;background:var(--green);color:#fff;padding:12px 18px;border-radius:12px;text-decoration:none;font-weight:700;margin:8px 0}
@media (prefers-color-scheme:dark){.cta{color:#0b130f}}
ul.list{list-style:none;padding:0;margin:0}ul.list li{background:var(--card);border:1px solid var(--line);border-radius:12px;padding:12px 14px;margin:8px 0}
ul.list b{display:block}.price{color:var(--accent);font-weight:600}table{width:100%;border-collapse:collapse;background:var(--card);border-radius:12px;overflow:hidden}
td{padding:8px 10px;border-bottom:1px solid var(--line);vertical-align:top}td:last-child{text-align:right;white-space:nowrap;font-weight:600}
nav.tinh{display:flex;flex-wrap:wrap;gap:6px}nav.tinh a{background:var(--card);border:1px solid var(--line);border-radius:999px;padding:4px 10px;text-decoration:none;font-size:.9rem}
footer{margin:32px 0 16px;font-size:.85rem}
</style>
</head>
<body>
<main>
<p class="muted"><a href="/">BuiTrip</a> · Cẩm nang du lịch tự túc 34 tỉnh thành</p>
<h1>Du lịch ${esc(p.name)} tự túc</h1>
${cu.length ? `<p class="muted">Từ 01/07/2025, ${esc(p.name)} gồm ${esc([p.name].concat(cu).join(" + "))} cũ.</p>` : ""}
<p>${esc(p.overview || "")}</p>
${p.best_season ? `<p><b>Mùa đẹp:</b> ${esc(p.best_season)}</p>` : ""}
<a class="cta" href="${app}">Mở cẩm nang ${esc(p.name)} trong app: bản đồ, lập lịch, chi phí</a>

<h2>Đi đâu ở ${esc(p.name)} (${places.length} địa danh)</h2>
<ul class="list">
${places.map(x => `<li><b>${esc(x.name)}</b>${x.address ? `<span class="muted">${esc(cut(x.address, 140))}</span><br/>` : ""}${!chua(x.price) ? `<span class="price">Giá vé tham khảo: ${esc(cut(x.price, 140))}</span>` : ""}${!chua(x.hours) ? ` · ${esc(cut(x.hours, 80))}` : ""}${x.note ? `<br/>${esc(cut(x.note, 220))}` : ""}</li>`).join("\n")}
</ul>

<h2>Ở đâu (${p.stays.length} chỗ ở)</h2>
<ul class="list">
${p.stays.map(x => `<li><b>${esc(x.name)}</b><span class="muted">${esc([x.kind, cut(x.address, 120)].filter(Boolean).join(" · "))}</span>${x.price ? `<br/><span class="price">${esc(cut(x.price, 120))}</span>` : ""}</li>`).join("\n")}
</ul>

<h2>Ăn gì (${p.dishes.length} món)</h2>
<ul class="list">
${p.dishes.map(x => `<li><b>${esc(x.name)}</b>${x.price ? `<span class="price">${esc(cut(x.price, 100))}</span>` : ""}${(x.restaurants || []).length ? `<br/>Quán: ${x.restaurants.slice(0, 3).map(r => esc(r.name) + (r.address ? " (" + esc(cut(r.address, 90)) + ")" : "")).join("; ")}` : ""}</li>`).join("\n")}
</ul>

${cost.length ? `<h2>Chi phí 3 ngày 2 đêm (ước tính, 1 người)</h2>
<table>${cost.map(r => `<tr><td>${esc(r.label)}</td><td>${esc(r.value)}</td></tr>`).join("")}</table>` : ""}

${it.length ? `<h2>Lịch trình mẫu 3 ngày 2 đêm</h2>
${it.map((d, i) => `<p><b>Ngày ${i + 1}:</b> ${d.map(s => esc(s.s) + ": " + esc(s.t)).join(". ")}</p>`).join("\n")}` : ""}

<a class="cta" href="${app}">Lập kế hoạch đi ${esc(p.name)}</a>

<h2>Tỉnh thành khác</h2>
<nav class="tinh">${PROV.filter(x => x.id !== p.id).map(x => `<a href="/tinh/${x.id}/">${esc(x.name)}</a>`).join("")}</nav>
<footer class="muted">Giá là khoảng tham khảo, cập nhật ${esc(p.checked || "")}. Thấy sai, báo ngay trong app ở từng mục. <a href="/chinh-sach/">Giới thiệu, chính sách và điều khoản</a>.</footer>
</main>
</body>
</html>
`;
}

export function sinh() {
  const out = {};
  for (const p of PROV) out["tinh/" + p.id + "/index.html"] = trang(p);
  out["sitemap.xml"] = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
<url><loc>${SITE}/</loc></url>
<url><loc>${SITE}/chinh-sach/</loc></url>
${PROV.map(p => `<url><loc>${SITE}/tinh/${p.id}/</loc></url>`).join("\n")}
</urlset>
`;
  out["robots.txt"] = `User-agent: *\nAllow: /\nDisallow: /api/\nDisallow: /admin/\nSitemap: ${SITE}/sitemap.xml\n`;
  return out;
}

if (import.meta.url === "file://" + process.argv[1]) {
  const files = sinh();
  for (const [rel, s] of Object.entries(files)) {
    const f = path.join(APP, rel);
    fs.mkdirSync(path.dirname(f), { recursive: true });
    fs.writeFileSync(f, s);
  }
  console.log("Đã sinh " + Object.keys(files).length + " tệp");
}
