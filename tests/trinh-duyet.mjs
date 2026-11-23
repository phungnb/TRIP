/* Kiểm trên trình duyệt thật (Chromium, màn hình iPhone). Tự chạy máy chủ tĩnh cho thư mục app.
   Chạy: node tests/trinh-duyet.mjs */
import http from "node:http";
import fs from "node:fs";
import path from "node:path";
import { chromium, devices } from "playwright";
import { APP } from "./nap-du-lieu.mjs";

const TYPES = { ".html": "text/html; charset=utf-8", ".js": "text/javascript; charset=utf-8", ".css": "text/css", ".webp": "image/webp", ".png": "image/png", ".json": "application/json", ".webmanifest": "application/manifest+json", ".svg": "image/svg+xml" };
const server = http.createServer((req, res) => {
  let p = decodeURIComponent(new URL(req.url, "http://x").pathname);
  if (p.endsWith("/")) p += "index.html";
  const f = path.join(APP, p);
  if (!f.startsWith(APP) || !fs.existsSync(f) || fs.statSync(f).isDirectory()) { res.statusCode = 404; return res.end("404"); }
  res.setHeader("content-type", TYPES[path.extname(f)] || "application/octet-stream");
  fs.createReadStream(f).pipe(res);
});
await new Promise(r => server.listen(0, "127.0.0.1", r));
const BASE = "http://localhost:" + server.address().port + "/";

const loi = [];
const ok = (c, m) => { if (!c) loi.push(m); console.log((c ? "  đạt  " : "  LỖI  ") + m); };
const opts = process.env.HTTPS_PROXY ? { proxy: { server: process.env.HTTPS_PROXY, bypass: "localhost,127.0.0.1" } } : {};
const browser = await chromium.launch(opts);
/* Trang chính chặn service worker để mọi yêu cầu đi qua route; thư viện bản đồ vẫn tải thật để bắt lỗi bản đồ */
const ctx = await browser.newContext({ ...devices["iPhone 13"], serviceWorkers: "block" });
await ctx.route(/arcgisonline|tile\.openstreetmap|fonts\.googleapis|gstatic|_vercel/, r => r.abort());
const page = await ctx.newPage();
const pageErr = [];
page.on("pageerror", e => pageErr.push(e.message));

try {
  await page.goto(BASE, { waitUntil: "load" });
  await page.waitForTimeout(500);
  ok(await page.evaluate(() => PROV_DATA.length === 34), "Trang chủ tải đủ 34 tỉnh");

  /* Mở mọi địa danh, chỗ ở, món ăn: không lỗi, có nút báo sai */
  const r = await page.evaluate(() => {
    let n = 0, thieu = [];
    PROV_DATA.forEach(pr => [["places", openProvPlace], ["stays", openProvStay], ["dishes", openProvDish]].forEach(([k, fn]) => pr[k].forEach(x => {
      fn(pr.id, x.id); n++;
      const v = document.querySelector("#view-item-detail");
      if (!v || ![...v.querySelectorAll("a,button")].some(a => a.textContent.trim() === "Báo thông tin sai")) thieu.push(pr.id + "/" + x.id);
    })));
    return { n, thieu: thieu.slice(0, 5), soThieu: thieu.length };
  });
  ok(r.soThieu === 0, "Mở " + r.n + " trang chi tiết, đều có nút Báo thông tin sai" + (r.soThieu ? " (thiếu: " + r.thieu.join(", ") + ")" : ""));

  /* Trang tỉnh: mọi tab mở được, không hiện chữ "Nguồn:" */
  for (const id of ["ha-noi", "lam-dong", "gia-lai", "ca-mau"]) {
    await page.evaluate(i => openProvDetail(i), id);
    const n = await page.locator(".segtabs button").count();
    let txt = "";
    for (let k = 0; k < n; k++) { await page.locator(".segtabs button").nth(k).click(); txt += await page.evaluate(() => document.body.innerText); }
    await page.waitForTimeout(600);
    ok(n >= 5, id + ": có " + n + " tab");
    const lo = (txt.match(/[^\n]*\bNguồn( tham khảo)?:[^\n]*/g) || []);
    ok(lo.length === 0, id + ": không hiện dòng nguồn" + (lo.length ? " (" + lo[0].slice(0, 60) + ")" : ""));
  }

  /* Tìm kiếm */
  async function tim(q) {
    await page.evaluate(() => show("explore"));
    await page.fill("#searchInput", q);
    await page.waitForTimeout(250);
    return page.evaluate(() => ({ n: document.querySelectorAll("#searchResults .listcol > *").length, t: document.getElementById("searchResults").innerText }));
  }
  let s = await tim("bình định");
  ok(s.n >= 5, "Tìm 'bình định' ra " + s.n + " kết quả (cần ≥ 5)");
  s = await tim("Đồng Văn");
  ok(!/chưa có trong app/.test(s.t) && s.n >= 1, "Tìm 'Đồng Văn' ra kết quả, không báo nhầm 'chưa có'");
  s = await tim("zzzqqq");
  ok(/Không thấy kết quả/.test(s.t), "Tìm từ vô nghĩa báo không thấy");

  await page.evaluate(() => { if (window.tlOpen) tlOpen("ht"); });
  await page.waitForTimeout(200);
  const tl = await page.evaluate(() => ({ fab: !!document.getElementById("tlFab"), form: !!document.getElementById("tlMsg"), ai: !!document.querySelector(".tl-seg button[data-t=ai]") }));
  ok(tl.fab && tl.form && tl.ai, "Nút nổi Trợ lý mở được thẻ Hỏi AI và Hỗ trợ");
  await page.evaluate(() => window.tlClose && tlClose());
  ok(pageErr.length === 0, "Không có lỗi JavaScript" + (pageErr.length ? ": " + pageErr.slice(0, 3).join(" | ") : ""));

  /* Mất sóng vẫn mở được (service worker) */
  const c2 = await browser.newContext({ ...devices["iPhone 13"] });
  await c2.route(/tile\.openstreetmap|googleapis|gstatic|unpkg|_vercel/, r => r.abort());
  const p2 = await c2.newPage();
  await p2.goto(BASE, { waitUntil: "load" });
  await p2.evaluate(() => navigator.serviceWorker.ready);
  await p2.waitForTimeout(800);
  await c2.setOffline(true);
  await p2.reload({ waitUntil: "load" });
  ok(await p2.evaluate(() => typeof PROV_DATA !== "undefined" && PROV_DATA.length === 34), "Tắt mạng rồi tải lại vẫn mở được app");
  await c2.close();
} catch (e) {
  loi.push("Lỗi khi chạy kiểm: " + e.message);
  console.error(e);
} finally {
  await browser.close();
  server.close();
}
if (loi.length) { console.error("\nKHÔNG ĐẠT (" + loi.length + "):\n- " + loi.join("\n- ")); process.exit(1); }
console.log("trinh-duyet: đạt");
