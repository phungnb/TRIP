/* Nghiệm thu trang admin + đóng góp trên trình duyệt thật (Chromium, iPhone 13), theo 8 mục của
   yeu-cau-trang-admin-cho-claude.md. Neon được thay bằng bản giả tests/gia-lap-neon.js (cùng hợp đồng RPC);
   luật phía server (quyền, kiểm đầu vào, nhật ký không xóa được, giới hạn 30/24 giờ) kiểm riêng bằng SQL trên nhánh Neon.
   Chạy: node tests/trang-admin.mjs */
import http from "node:http";
import fs from "node:fs";
import path from "node:path";
import { chromium, devices } from "playwright";
import { APP } from "./nap-du-lieu.mjs";

const TYPES = { ".html": "text/html; charset=utf-8", ".js": "text/javascript; charset=utf-8", ".css": "text/css", ".json": "application/json", ".webp": "image/webp", ".png": "image/png", ".svg": "image/svg+xml", ".webmanifest": "application/manifest+json" };
const GIA = fs.readFileSync(new URL("./gia-lap-neon.js", import.meta.url), "utf8");
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
const loi = [], ok = (c, m) => { if (!c) loi.push(m); console.log((c ? "  đạt  " : "  LỖI  ") + m); };
const opts = process.env.HTTPS_PROXY ? { proxy: { server: process.env.HTTPS_PROXY, bypass: "localhost,127.0.0.1" } } : {};
const browser = await chromium.launch(opts);

async function moTrang(role, api) {
  const ctx = await browser.newContext({ ...devices["iPhone 13"], serviceWorkers: "block" });
  await ctx.route(/arcgisonline|tile\.openstreetmap|fonts\.googleapis|gstatic|_vercel|unpkg/, r => r.abort());
  await ctx.route(/\/vendor\/neon\.js/, r => r.fulfill({ contentType: "text/javascript", body: GIA }));
  const page = await ctx.newPage();
  const err = []; page.on("pageerror", e => err.push(e.message));
  /* /api/du-lieu: "db" = trả bản sửa đang có trong Neon giả của chính trang; "loi" = 503 (mất kết nối Neon); mảng = dữ liệu cố định */
  await ctx.route(/\/api\/du-lieu/, async r => {
    if (api === "loi") return r.fulfill({ status: 503, contentType: "application/json", body: '{"error":"x"}' });
    const items = Array.isArray(api) ? api : JSON.parse(await page.evaluate(() => JSON.stringify(Object.values((window.__NEON || { ov: {} }).ov)))).filter(Boolean);
    r.fulfill({ contentType: "application/json", body: JSON.stringify({ items }) });
  });
  await page.addInitScript(rl => { try { if (rl) { localStorage.setItem("mock_role", rl); localStorage.setItem("bt_signed", "1"); } } catch (e) {} }, role);
  await page.goto(BASE, { waitUntil: "load" });
  await page.waitForTimeout(400);
  return { ctx, page, err };
}
const txt = p => p.evaluate(() => document.body.innerText);
const QN = "quang-ninh";

try {
  /* ---------- 8 + 1. Người dùng thường: nút Gửi đóng góp hiện rõ, gửi đủ 7 loại, giới hạn 30, Đóng góp của tôi ---------- */
  const U = await moTrang("user", "db");
  const { page } = U;
  const place = await page.evaluate(q => PROV_DATA.find(p => p.id === q).places[0].id, QN);
  await page.evaluate(([q, i]) => openProvPlace(q, i), [QN, place]);
  await page.waitForTimeout(200);
  const nut = page.locator("#view-item-detail button", { hasText: /^Gửi đóng góp$/ });
  ok(await nut.count() === 1 && await nut.first().isVisible(), "(8) Trang chi tiết địa danh có nút \"Gửi đóng góp\" nhìn thấy được");
  ok(await page.locator("#view-item-detail button", { hasText: "Báo thông tin sai" }).count() === 1, "(8) Nút Báo thông tin sai vẫn còn");

  async function gui(kind, fill) {
    await page.evaluate(([q, i, k]) => dgContribute(q, i, k), [QN, ["mon_moi", "cho_o_moi", "phuong_tien_moi", "dia_danh_moi"].includes(kind) ? null : place, kind]);
    await page.waitForSelector("#dgKind");
    await page.selectOption("#dgKind", kind);
    await fill();
    await page.click("#dgBody button[type=submit]");
    await page.waitForTimeout(150);
    return (await page.locator("#dgBody").innerText());
  }
  const kq = {};
  kq.sua_thong_tin = await gui("sua_thong_tin", async () => { await page.selectOption("#dgField", "gia"); await page.fill("#dgValue", "Phí tham quan 999.000đ/người (giá thử)"); });
  kq.bao_loi = await gui("bao_loi", async () => { await page.fill("#dgValue", "Đang sửa chữa, tạm đóng"); });
  kq.anh = await gui("anh", async () => { await page.fill("#dgValue", "https://example.org/anh.jpg"); });
  kq.dia_danh_moi = await gui("dia_danh_moi", async () => { await page.fill("#dgS_ten", "Đồi Thử Nghiệm"); await page.fill("#dgS_gia_tu", "20000"); await page.fill("#dgS_lat", "21.1"); await page.fill("#dgS_lng", "107.2"); });
  kq.mon_moi = await gui("mon_moi", async () => { await page.fill("#dgS_ten", "Bánh gật gù thử"); await page.fill("#dgS_quan", "Quán Bà Lan"); await page.fill("#dgS_gia_tu", "20000"); await page.fill("#dgS_gia_den", "30000"); });
  kq.cho_o_moi = await gui("cho_o_moi", async () => { await page.fill("#dgS_ten", "Homestay Gió Thử"); await page.selectOption("#dgS_loai", "homestay"); await page.fill("#dgS_gia_tu", "350000"); });
  kq.phuong_tien_moi = await gui("phuong_tien_moi", async () => { await page.selectOption("#dgS_loai", "tau_thuy"); await page.fill("#dgS_tu", "Cái Rồng"); await page.fill("#dgS_den", "Quan Lạn"); await page.fill("#dgS_gia_tu", "120000"); });
  const dat = Object.keys(kq).filter(k => /Đã nhận đóng góp/.test(kq[k]));
  ok(dat.length === 7, "(1) Gửi được cả 7 loại đóng góp: " + dat.length + "/7" + (dat.length < 7 ? " — thiếu " + Object.keys(kq).filter(k => !dat.includes(k)).join(", ") : ""));
  /* kiểm đầu vào phía trình duyệt: giá chữ, link sai, thiếu trường bắt buộc */
  const sai1 = await gui("mon_moi", async () => { await page.fill("#dgS_ten", "X"); await page.fill("#dgS_link", "javascript:alert(1)"); });
  const sai2 = await gui("cho_o_moi", async () => { await page.fill("#dgS_ten", "Y"); });
  ok(/http/.test(sai1) && /Cần điền: Loại/.test(sai2), "(1) Chặn link sai định dạng và thiếu trường bắt buộc");
  /* giới hạn 30/24 giờ (Neon giả mô phỏng trigger contrib_limit) */
  await page.evaluate(() => { const s = window.__NEON; while (s.contribs.filter(c => c.user_id === "u-user").length < 30) s.contribs.push({ id: "f" + s.contribs.length, user_id: "u-user", kind: "bao_loi", prov_id: "ha-noi", value: "đệm", status: "cho_duyet", created_at: new Date().toISOString() }); localStorage.setItem("mock_neon", JSON.stringify(s)); });
  const qua = await gui("bao_loi", async () => { await page.fill("#dgValue", "lần 31"); });
  ok(/Quá 30 đóng góp/.test(qua), "(1) Lần gửi thứ 31 trong 24 giờ bị chặn, báo rõ");
  await page.evaluate(() => { const s = window.__NEON; s.contribs = s.contribs.filter(c => !/^f/.test(c.id)); localStorage.setItem("mock_neon", JSON.stringify(s)); });
  await page.evaluate(() => dgMine()); await page.waitForTimeout(200);
  const mine = await page.locator("#dgBody").innerText();
  ok(/Đóng góp của tôi \(7\)/.test(mine) && /Chờ duyệt/.test(mine), "(1) \"Đóng góp của tôi\" thấy đủ 7 mục với trạng thái");
  await page.evaluate(() => dgClose());

  /* ---------- 2. Tài khoản thường mở #/admin ---------- */
  await page.evaluate(() => { location.hash = "#/admin"; }); await page.waitForTimeout(400);
  const t2 = await page.locator("#admView").innerText();
  ok(/Không có quyền duyệt/.test(t2) && !/Duyệt đóng góp/.test(t2), "(2) Tài khoản thường mở trang admin: \"Không có quyền duyệt\", không thấy dữ liệu");
  const neonState = await page.evaluate(() => localStorage.getItem("mock_neon"));
  ok(U.err.length === 0, "Trang người dùng không lỗi JavaScript" + (U.err.length ? ": " + U.err[0] : ""));
  await U.ctx.close();

  /* ---------- 2–6. Admin ---------- */
  const A = await moTrang("admin", "db");
  const pa = A.page;
  await pa.evaluate(s => { localStorage.setItem("mock_neon", s); }, neonState);
  await pa.reload({ waitUntil: "load" }); await pa.waitForTimeout(300);
  await pa.evaluate(() => { location.hash = "#/admin"; }); await pa.waitForTimeout(500);
  let ta = await pa.locator("#admView").innerText();
  ok(/Duyệt đóng góp/.test(ta) && /Sửa dữ liệu/.test(ta) && /Nhật ký/.test(ta) && /Quản trị viên/.test(ta), "(2) Tài khoản admin mở được trang admin (4 thẻ)");
  ok((ta.match(/Chờ duyệt/g) || []).length >= 7, "(2) Thấy 7 đóng góp chờ duyệt");
  /* lọc theo loại */
  await pa.selectOption("#admKind", "mon_moi"); await pa.waitForTimeout(200);
  ok(await pa.locator("#admBody .dg-item").count() === 1, "Lọc theo loại đóng góp (món ăn mới): 1 mục");
  await pa.selectOption("#admKind", ""); await pa.waitForTimeout(200);

  /* 3. Nhập 1 chạm đóng góp sửa giá */
  const giaCu = await pa.evaluate(([q, i]) => PROV_DATA.find(p => p.id === q).places.find(x => x.id === i).price, [QN, place]);
  const idx = await pa.evaluate(() => [...document.querySelectorAll("#admBody .dg-item")].findIndex(e => /Sửa thông tin đang sai/.test(e.innerText)));
  await pa.locator("#admBody .dg-item").nth(idx).locator("button", { hasText: "Nhập vào app" }).click(); await pa.waitForTimeout(200);
  ok(await pa.inputValue("#admE_price") === "Phí tham quan 999.000đ/người (giá thử)", "(3) Nhập vào app: trình sửa điền sẵn giá đề xuất");
  await pa.click("#admBody button[type=submit]"); await pa.waitForTimeout(400);
  const st3 = await pa.evaluate(() => window.__NEON.contribs.find(c => c.kind === "sua_thong_tin").status);
  await pa.evaluate(() => btAdminClose());
  await pa.evaluate(([q, i]) => openProvPlace(q, i), [QN, place]); await pa.waitForTimeout(200);
  const ct = await pa.locator("#view-item-detail").innerText();
  ok(/999\.000đ/.test(ct) && st3 === "da_nhap", "(3) Mở lại trang địa danh thấy giá mới; đóng góp tự thành \"Đã nhập\" (giá cũ: " + String(giaCu).slice(0, 40) + "…)");

  /* 4. Sửa trực tiếp giá 1 chỗ ở + giờ 1 địa danh */
  const stay = await pa.evaluate(q => PROV_DATA.find(p => p.id === q).stays[0].id, QN);
  const place2 = await pa.evaluate(q => PROV_DATA.find(p => p.id === q).places[1].id, QN);
  await pa.evaluate(() => { location.hash = "#/admin"; }); await pa.waitForTimeout(400);
  await pa.evaluate(() => btAdminTab("sua")); await pa.waitForTimeout(300);
  await pa.selectOption("#admProv", QN); await pa.waitForTimeout(200);
  await pa.selectOption("#admEk", "stay"); await pa.waitForTimeout(200);
  await pa.evaluate(i => btAdmEdit(i), stay); await pa.waitForTimeout(200);
  await pa.fill("#admE_price", "1.234.000đ/đêm (giá thử)"); await pa.click("#admBody button[type=submit]"); await pa.waitForTimeout(300);
  await pa.evaluate(() => btAdmF("ek", "place")); await pa.waitForTimeout(200);
  await pa.evaluate(i => btAdmEdit(i), place2); await pa.waitForTimeout(200);
  await pa.fill("#admE_hours", "6:15–21:45 (giờ thử)"); await pa.click("#admBody button[type=submit]"); await pa.waitForTimeout(300);
  await pa.evaluate(() => btAdminClose());
  await pa.evaluate(([q, i]) => openProvStay(q, i), [QN, stay]); await pa.waitForTimeout(150);
  const c4a = await pa.locator("#view-item-detail").innerText();
  await pa.evaluate(([q, i]) => openProvPlace(q, i), [QN, place2]); await pa.waitForTimeout(150);
  const c4b = await pa.locator("#view-item-detail").innerText();
  ok(/1\.234\.000đ/.test(c4a) && /6:15–21:45/.test(c4b), "(4) Sửa giá chỗ ở + giờ địa danh: lưu xong thấy ngay trên app, không cần deploy");
  /* trợ lý cũng dùng dữ liệu mới */
  const ai = await pa.evaluate(i => { const n = PROV_DATA.find(p => p.id === "quang-ninh").places.find(x => x.id === i).name.split(" (")[0]; return askBuiTrip(n + " mấy giờ mở cửa", { noCtx: true }).html; }, place2);
  ok(/6:15–21:45/.test(ai), "(4) Trợ lý trả giờ mới ngay sau khi sửa");

  /* 5. Thêm món ăn mới từ trang admin (nhập từ đóng góp món mới) */
  await pa.evaluate(() => { location.hash = "#/admin"; }); await pa.waitForTimeout(400);
  const i5 = await pa.evaluate(() => [...document.querySelectorAll("#admBody .dg-item")].findIndex(e => /Thêm món ăn/.test(e.innerText)));
  await pa.locator("#admBody .dg-item").nth(i5).locator("button", { hasText: "Nhập vào app" }).click(); await pa.waitForTimeout(200);
  ok(await pa.inputValue("#admE_name") === "Bánh gật gù thử" && /20\.000–30\.000đ/.test(await pa.inputValue("#admE_price")), "(5) Món mới: điền sẵn tên, giá từ đóng góp");
  await pa.click("#admBody button[type=submit]"); await pa.waitForTimeout(400);
  /* thêm trực tiếp 1 món nữa, không qua đóng góp */
  await pa.evaluate(() => btAdminTab("sua")); await pa.waitForTimeout(300);
  await pa.selectOption("#admProv", QN); await pa.selectOption("#admEk", "dish"); await pa.waitForTimeout(200);
  await pa.evaluate(() => btAdmNew()); await pa.waitForTimeout(200);
  await pa.fill("#admE_name", "Chả mực thử admin"); await pa.fill("#admE_price", "40.000đ/phần"); await pa.click("#admBody button[type=submit]"); await pa.waitForTimeout(400);
  await pa.evaluate(() => btAdminClose());
  await pa.evaluate(q => openProvDetail(q), QN); await pa.waitForTimeout(200);
  const anTab = pa.locator(".segtabs button", { hasText: /Ăn/ }); if (await anTab.count()) { await anTab.first().click(); await pa.waitForTimeout(200); }
  const t5 = await txt(pa);
  ok(/Bánh gật gù thử/.test(t5) && /Chả mực thử admin/.test(t5), "(5) Món mới hiện trong mục Ăn gì của tỉnh");

  /* 6. Nhật ký */
  await pa.evaluate(() => { location.hash = "#/admin"; }); await pa.waitForTimeout(400);
  await pa.evaluate(() => btAdminTab("nk")); await pa.waitForTimeout(300);
  const t6 = await pa.locator("#admBody").innerText();
  ok(/Admin Thử/.test(t6) && /trường price/.test(t6) && /→ 1\.234\.000đ\/đêm/.test(t6) && /trường hours/.test(t6) && /Nhập đóng góp/.test(t6), "(6) Nhật ký ghi ai, mục nào, trường nào, cũ → mới, lúc nào");
  /* quay lại giờ địa danh */
  const aid = await pa.evaluate(() => window.__NEON.audit.find(a => a.field === "hours").id);
  await pa.evaluate(id => btAdmRevert(id), aid); await pa.waitForTimeout(500);
  const hBack = await pa.evaluate(([q, i]) => PROV_DATA.find(p => p.id === q).places.find(x => x.id === i).hours, [QN, place2]);
  ok(!/giờ thử/.test(hBack), "Quay lại giá trị trước: giờ địa danh trở về bản gốc");
  /* ẩn và xóa 2 bước */
  await pa.evaluate(() => btAdminTab("sua")); await pa.waitForTimeout(300);
  await pa.selectOption("#admProv", QN); await pa.selectOption("#admEk", "stay"); await pa.waitForTimeout(200);
  await pa.evaluate(i => btAdmEdit(i), stay); await pa.waitForTimeout(200);
  await pa.evaluate(() => btAdmHide(true)); await pa.waitForTimeout(400);
  const an = await pa.evaluate(([q, i]) => !PROV_DATA.find(p => p.id === q).stays.some(x => x.id === i), [QN, stay]);
  await pa.evaluate(() => btAdmHide(false)); await pa.waitForTimeout(400);
  const hien = await pa.evaluate(([q, i]) => PROV_DATA.find(p => p.id === q).stays.some(x => x.id === i), [QN, stay]);
  ok(an && hien, "Ẩn khỏi app rồi hiện lại được");
  await pa.evaluate(() => btAdmDel1()); await pa.fill("#admDelId", "sai-ma"); await pa.fill("#admDelWhy", "trùng");
  await pa.evaluate(() => btAdmDel2()); await pa.waitForTimeout(300);
  const conSau1 = await pa.evaluate(([q, i]) => PROV_DATA.find(p => p.id === q).stays.some(x => x.id === i), [QN, stay]);
  await pa.fill("#admDelId", stay); await pa.evaluate(() => btAdmDel2()); await pa.waitForTimeout(500);
  const conSau2 = await pa.evaluate(([q, i]) => PROV_DATA.find(p => p.id === q).stays.some(x => x.id === i), [QN, stay]);
  ok(conSau1 && !conSau2, "Xóa hẳn cần gõ lại đúng mã mục (gõ sai không xóa)");
  /* quản trị viên: cấp / gỡ quyền admin cho tài khoản khác */
  await pa.evaluate(() => btAdminTab("qtv")); await pa.waitForTimeout(300);
  const q1 = await pa.locator("#admBody").innerText();
  const goMinh = await pa.locator("#admBody button", { hasText: "Gỡ quyền" }).count();
  await pa.fill("#admGrEmail", "khongco@thu.local"); await pa.evaluate(() => btAdmGrant()); await pa.waitForTimeout(300);
  const q2 = await pa.evaluate(() => window.__NEON.admins.length);
  await pa.fill("#admGrEmail", "USER@thu.local"); await pa.evaluate(() => btAdmGrant()); await pa.waitForTimeout(300);
  const q3 = await pa.locator("#admBody").innerText();
  ok(/Đang có 1 admin/.test(q1) && /\(bạn\)/.test(q1) && goMinh === 0 && q2 === 1 && /Đang có 2 admin/.test(q3) && /user@thu\.local/.test(q3),
    "Admin cấp quyền admin cho tài khoản khác theo email (email chưa đăng ký bị chặn, không tự gỡ quyền mình)");
  await pa.evaluate(() => btAdmRevoke1("u-user")); await pa.fill("#admRvWhy", "thử gỡ"); await pa.evaluate(() => btAdmRevoke2("u-user")); await pa.waitForTimeout(300);
  const q4 = await pa.locator("#admBody").innerText();
  await pa.evaluate(() => btAdminTab("nk")); await pa.waitForTimeout(300);
  const q5 = await pa.locator("#admBody").innerText();
  ok(/Đang có 1 admin/.test(q4) && /Cấp quyền admin · user@thu\.local/.test(q5) && /Gỡ quyền admin · user@thu\.local/.test(q5), "Gỡ quyền admin 2 bước; nhật ký ghi cả cấp và gỡ");
  ok(A.err.length === 0, "Trang admin không lỗi JavaScript" + (A.err.length ? ": " + A.err[0] : ""));
  const banSua = JSON.parse(await pa.evaluate(() => JSON.stringify(Object.values(window.__NEON.ov))));
  await A.ctx.close();

  /* ---------- Vào thẳng bằng link /admin (chuyển về /#/admin) ---------- */
  const D = await moTrang("admin", "db");
  await D.page.goto(BASE + "admin/", { waitUntil: "load" }); await D.page.waitForTimeout(1200);
  const td = await D.page.locator("#admView").innerText().catch(() => "");
  ok(/Duyệt đóng góp/.test(td), "Mở link /admin: vào thẳng trang admin");
  await D.ctx.close();

  /* ---------- Máy khác mở app: nhận bản sửa qua /api/du-lieu ---------- */
  const B = await moTrang("", banSua);
  await B.page.waitForTimeout(1500);
  const giaB = await B.page.evaluate(([q, i]) => PROV_DATA.find(p => p.id === q).places.find(x => x.id === i).price, [QN, place]);
  const monB = await B.page.evaluate(q => PROV_DATA.find(p => p.id === q).dishes.some(x => /Chả mực thử admin/.test(x.name)), QN);
  ok(/999\.000đ/.test(giaB) && monB, "Máy khác (không đăng nhập) mở app: nhận giá mới và món mới từ /api/du-lieu");
  await B.ctx.close();

  /* ---------- 7. Lỗi kết nối Neon: app chạy bằng file tĩnh ---------- */
  const C = await moTrang("", "loi");
  await C.page.waitForTimeout(1500);
  const n7 = await C.page.evaluate(() => PROV_DATA.length);
  const g7 = await C.page.evaluate(([q, i]) => PROV_DATA.find(p => p.id === q).places.find(x => x.id === i).price, [QN, place]);
  await C.page.evaluate(([q, i]) => openProvPlace(q, i), [QN, place]); await C.page.waitForTimeout(150);
  const t7 = await C.page.locator("#view-item-detail").innerText();
  ok(n7 === 34 && g7 === giaCu && t7.length > 100 && C.err.length === 0, "(7) /api/du-lieu lỗi 503: app vẫn chạy bằng dữ liệu file tĩnh (34 tỉnh, giá gốc, không màn hình trắng)");
  await C.ctx.close();
} catch (e) {
  loi.push("Ngoại lệ: " + e.message); console.log("  LỖI  " + e.stack);
} finally {
  await browser.close(); server.close();
}
console.log(loi.length ? "trang-admin: " + loi.length + " lỗi" : "trang-admin: đạt");
process.exit(loi.length ? 1 : 0);
