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
  /* Tên thành phố trong tỉnh mới: Quy Nhơn ra thẻ khu, lập kế hoạch ra lịch và tiền đi tới Quy Nhơn, không phải Pleiku */
  const qn = await page.evaluate(() => {
    const r = btSearch("Quy Nhơn")[0];
    const a = btAreaById("quy-nhon"), days = btAreaDays(a, 3), cp = btAreaCostProv(a);
    const pl = days.flat().map(o => o.place.dist_from);
    return { top: r && r.kind, area: r && r.area && r.area.id, n: pl.length, allQN: pl.every(h => h === "Quy Nhơn"), cost: (cp.cost[0] || {}).label || "" };
  });
  ok(qn.top === "area" && qn.area === "quy-nhon", "Tìm Quy Nhơn ra thẻ khu Quy Nhơn đầu tiên");
  ok(qn.n >= 6 && qn.allQN, "Lịch 3 ngày đi Quy Nhơn chỉ gồm điểm ở Quy Nhơn");
  ok(/Quy Nhơn/.test(qn.cost), "Tiền đi tới Quy Nhơn dùng tuyến tới Quy Nhơn");
  /* Câu hỏi sai trong báo cáo 1.014 giả thiết (23/11/2026): trợ lý phải trả theo khu/đảo, không thay dữ liệu thủ phủ */
  const cau = JSON.parse(fs.readFileSync(new URL("./tro-ly-1014.json", import.meta.url), "utf8"));
  const sai = await page.evaluate(cau => cau.map(([q, can, cam]) => {
    const d = document.createElement("div"); d.innerHTML = askQuick(q); const t = d.innerText || d.textContent;
    const thieu = can.filter(w => t.indexOf(w) < 0), nham = cam.filter(w => t.indexOf(w) >= 0);
    return thieu.length || nham.length ? q + " (thiếu: " + thieu.join("/") + "; nhầm: " + nham.join("/") + ")" : null;
  }).filter(Boolean), cau);
  ok(!sai.length, cau.length + " câu trợ lý trong báo cáo 1.014 trả đúng khu/đảo" + (sai.length ? ": " + sai.join(" | ") : ""));
  /* Trợ lý v2: thanh Đúng/Chưa đúng dưới mọi câu, học trên máy, đoạn giới thiệu nạp lười */
  await page.waitForFunction(() => typeof BT_BOI_CANH !== "undefined", null, { timeout: 8000 }).catch(() => {});
  const v2 = await page.evaluate(() => {
    const box = document.createElement("div"); document.body.appendChild(box);
    box.innerHTML = askQuick("tháng 6 nên đi đâu");
    const bar = !!box.querySelector(".bt-ai-fb"), goiy = /Gợi ý nơi đi: tháng 6/.test(box.textContent);
    box.querySelector(".bt-ai-fb button:nth-of-type(2)").click();
    const q = "phố cổ ăn gì";
    box.innerHTML = askQuick(q);
    box.querySelector(".bt-ai-fb button:nth-of-type(2)").click();
    box.querySelector(".bt-ai-ten").value = "Hội An";
    box.querySelector(".bt-ai-fix .btn-primary").click();
    const hs = btAiSua(q), hoc = hs && hs.ten, sau = askQuick(q), suy = askQuick("phố cổ có gì chơi");
    const gt = askQuick("Tại sao gọi là Hồ Gươm");
    box.remove(); localStorage.removeItem("buitrip_ai_sua"); localStorage.removeItem("buitrip_ai_votes");
    return { bar, goiy, hoc, sauHocAn: /Theo sửa bạn đã lưu/.test(sau) && /Hội An/.test(sau), suyRa: /Theo sửa bạn đã lưu/.test(suy) && /Hội An/.test(suy), gt: /CC BY-SA/.test(gt) };
  });
  ok(v2.bar && v2.goiy, "Trợ lý: gợi ý theo tháng, có thanh Đúng/Chưa đúng");
  ok(v2.hoc === "Hội An" && v2.sauHocAn, "Trợ lý học trên máy: sửa 'phố cổ ăn gì' thành Hội An, hỏi lại trả theo Hội An");
  ok(v2.suyRa, "Trợ lý học theo cụm: sau khi sửa, 'phố cổ có gì chơi' cũng hiểu là Hội An");
  ok(v2.gt, "Trợ lý: câu giới thiệu Hồ Gươm có đoạn trích ghi giấy phép (boi-canh.js nạp lười)");
  const tk = await page.evaluate(() => ({
    sapa: btSearch("sapa").filter(r => r.kind === "place" && /Sa Pa/.test(r.x.name)).length,
    hv: btSearch("Hội Vân").some(r => r.x && /Đầm Vân Hội/.test(r.x.name)),
    bb: btSearch("Bình Ba").some(r => r.x && /Bà Rá/.test(r.x.name)),
    nd: btSearch("Nam Du").some(r => r.x && /Đại Nam/.test(r.x.name)),
    plan: btAreaDays(btAreaById("phan-rang") || btAreaById("nha-trang") || KHU_VUC[0], 3).flat().some(o => o.place.banned),
    saved: (JSON.parse(localStorage.getItem("camnang_saved_v1") || "[]")).length
  }));
  ok(tk.sapa >= 2, "Gõ liền 'sapa' ra địa danh Sa Pa");
  ok(!tk.hv && !tk.bb && !tk.nd, "Tìm 'Hội Vân', 'Bình Ba', 'Nam Du' không ra Đầm Vân Hội, Núi Bà Rá, Đại Nam");
  ok(!tk.plan, "Lịch trình không đưa đảo Bình Ba (không đón khách) vào");
  ok(tk.saved === 0, "Trình duyệt mới: mục Đã lưu trống, app không gieo sẵn");
  /* Rà mọi nơi đến người dùng hay gõ (63 tỉnh cũ, tỉnh lỵ cũ, điểm nổi tiếng): tìm ra đúng tỉnh,
     lập kế hoạch ra đúng tỉnh, lịch không xa nơi gõ, nơi xa thủ phủ thì có tuyến riêng hoặc ghi rõ chặng chưa cộng */
  const NOI_DEN = JSON.parse(fs.readFileSync(new URL("./noi-den.json", import.meta.url), "utf8"));
  const nd = await page.evaluate(list => {
    function km(a, b, c, d) { const r = Math.PI / 180, x = Math.sin((c - a) * r / 2), y = Math.sin((d - b) * r / 2); return 12742 * Math.asin(Math.sqrt(x * x + Math.cos(a * r) * Math.cos(c * r) * y * y)); }
    const bad = [];
    list.forEach(([q, exp]) => {
      const top = btSearch(q)[0];
      let loc = null;
      if (top && top.kind === "area") loc = [top.area.lat, top.area.lng];
      else if (top && top.x && top.x.lat != null) loc = [top.x.lat, top.x.lng];
      else if (top) loc = [top.prov.lat, top.prov.lng];
      startPlan(); document.getElementById("wDestInput").value = q; document.getElementById("wOriginInput").value = "TP.HCM"; wiz.step = 1;
      try { planMove(1); } catch (e) {}
      const pv = provById(wiz.dest);
      document.getElementById("wStart").value = "2026-12-01"; document.getElementById("wEnd").value = "2026-12-03";
      try { buildWizDays(); } catch (e) { bad.push(q + ": lỗi dựng lịch " + e.message); return; }
      const pts = wiz.days.flatMap(d => d.items).map(it => pv && pv.places.find(x => x.name === it.title)).filter(x => x && x.lat != null);
      const mean = loc && pts.length ? pts.reduce((s, x) => s + km(loc[0], loc[1], x.lat, x.lng), 0) / pts.length : 0;
      const comp = tripComponents(costProvFor(wiz.dest, wiz.area, wiz.focus), "vua", 2, 2, "TP.HCM", 0);
      const anchorKm = loc && pv ? km(loc[0], loc[1], pv.lat, pv.lng) : 0;
      if (!top || top.prov.id !== exp) bad.push(q + ": tìm ra " + (top ? top.prov.id : "không có") + ", cần " + exp);
      else if (!pv || pv.id !== exp) bad.push(q + ": lập kế hoạch ra " + (pv ? pv.id : "?") + ", cần " + exp);
      else if (!pts.length) bad.push(q + ": lịch trống");
      else if (mean > 90) bad.push(q + ": lịch cách nơi gõ trung bình " + Math.round(mean) + " km");
      else if (anchorKm > 80 && !(wiz.area && btAreaById(wiz.area) && btAreaById(wiz.area).cost) && !comp.farNote) bad.push(q + ": cách thủ phủ " + Math.round(anchorKm) + " km mà tiền đi không có tuyến riêng, không ghi chú");
    });
    return bad;
  }, NOI_DEN);
  ok(nd.length === 0, NOI_DEN.length + " nơi đến: tìm, lập kế hoạch, lịch và tiền đi đúng chỗ" + (nd.length ? ": " + nd.join(" | ") : ""));
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
