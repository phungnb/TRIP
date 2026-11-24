/* Kiểm phần admin định hướng trợ lý học (thẻ "Định hướng học"):
   - Trợ lý dùng bài admin dạy (app/ai/bai-day.js): câu hỏi + trả lời, cách gõ sai, tên gọi khác, đoạn kiến thức đã duyệt.
   - Gỡ bài thì trợ lý trở lại như cũ; câu khác không bị ảnh hưởng.
   - Việc chạy hằng ngày (app/api/hoc-ngay.js) với Wikimedia và Neon giả: chọn đúng bài, bỏ bài lạc đề / trang định hướng,
     cắt đoạn ở câu trọn vẹn, ghi hàng chờ, đánh dấu đã chạy. */
import { createRequire } from "node:module";
import { napAI, chu } from "./nap-ai.mjs";
const require = createRequire(import.meta.url);
const loi = [], ok = (c, m) => { if (!c) loi.push(m); console.log((c ? "  đạt  " : "  LỖI  ") + m); };

const ctx = napAI(), A = ctx.BTAI;
const hoi = q => { const r = A.ask(q, { noCtx: true, noSua: true }); return { kind: r.kind, t: chu(r.html), html: r.html }; };

const truoc = { thu: hoi("Có cho mang thú cưng không?"), quy: hoi("Quy Nhơn đi bằng gì"), ve: hoi("giá vé Hồ Hoàn Kiếm"), le: hoi("lễ hội Lồng Tồng là gì") };
ok(truoc.thu.kind !== "day", "Chưa có bài dạy: câu thú cưng không trả theo bài dạy (" + truoc.thu.kind + ")");

ctx.BT_DAY = [
  { id: 1, kind: "hoi_dap", data: { q: "Có cho mang thú cưng không?", a: "Tùy từng nơi. Hỏi chỗ ở trước khi đặt phòng.", prov_id: "lam-dong" } },
  { id: 2, kind: "go_sai", data: { sai: "đà lạc", dung: "đà lạt" } },
  { id: 3, kind: "ten_goi", data: { ten: "thành phố ngàn thông", prov_id: "lam-dong" } },
  { id: 4, kind: "kien_thuc", data: { ten: "Hồ Hoàn Kiếm", prov_id: "ha-noi", bai: "Hồ Hoàn Kiếm", t: "Đoạn giới thiệu admin đã duyệt về Hồ Gươm, dùng để thử.", nguon: "wikipedia_vi", url: "https://vi.wikipedia.org/wiki/H%E1%BB%93_Ho%C3%A0n_Ki%E1%BA%BFm" } },
  { id: 5, kind: "kien_thuc", data: { ten: "Lễ hội Lồng Tồng", prov_id: "tuyen-quang", bai: "Lễ hội Lồng Tồng", t: "Lễ hội xuống đồng của người Tày, đoạn thử đã duyệt.", nguon: "wikivoyage_vi", url: "https://vi.wikivoyage.org/wiki/X" } }
];
A.dayTenGoi();

const a1 = hoi("Có cho mang thú cưng không?"), a2 = hoi("co cho mang thu cung khong");
ok(a1.kind === "day" && /Tùy từng nơi/.test(a1.t) && /Cẩm nang Lâm Đồng/.test(a1.t), "Câu admin dạy: trả đúng câu admin viết, kèm nút tới tỉnh đã chọn");
ok(a2.kind === "day", "Câu admin dạy: gõ không dấu vẫn khớp");
const a3 = hoi("Quy Nhơn đi bằng gì");
ok(a3.kind === truoc.quy.kind && a3.t === truoc.quy.t, "Câu khác không bị bài dạy chen vào (Quy Nhơn đi bằng gì giữ nguyên)");
const a4 = hoi("đà lạc tháng mấy đẹp");
ok(/Lâm Đồng|Đà Lạt/.test(a4.t) && a4.kind !== "fallback", "Cách gõ sai admin dạy (đà lạc -> đà lạt) được sửa trước khi trả lời");
const a5 = hoi("thành phố ngàn thông ăn gì");
ok(/Lâm Đồng/.test(a5.t) && a5.kind !== "fallback", "Tên gọi khác admin dạy (thành phố ngàn thông -> Lâm Đồng) được hiểu");
const a6 = hoi("giới thiệu Hồ Hoàn Kiếm");
ok(/admin đã duyệt về Hồ Gươm/.test(a6.t) && /Wikipedia tiếng Việt/.test(a6.t) && /CC BY-SA 4\.0/.test(a6.t), "Giới thiệu địa danh dùng đoạn kiến thức đã duyệt, ghi giấy phép");
const a7 = hoi("lễ hội Lồng Tồng là gì");
ok(a7.kind === "day" && /xuống đồng của người Tày/.test(a7.t) && /Wikivoyage tiếng Việt/.test(a7.t), "Chủ đề admin cho học (lễ hội) trả bằng đoạn đã duyệt");
const a8 = hoi("giá vé Hồ Hoàn Kiếm");
ok(a8.t === truoc.ve.t, "Câu hỏi giá vé không bị đoạn kiến thức thay vào (không lấy giá từ nguồn tự động)");

ctx.BT_DAY = []; A.dayTenGoi();
const b1 = hoi("Có cho mang thú cưng không?"), b7 = hoi("lễ hội Lồng Tồng là gì");
ok(b1.kind === truoc.thu.kind && b7.t === truoc.le.t && !ctx.BT_ALIAS.some(a => a[0] === "thanh pho ngan thong"), "Tắt hết bài dạy: trợ lý trở lại như cũ, tên gọi đã thêm được gỡ");

/* ---------- việc chạy hằng ngày ---------- */
const H = require("../app/api/hoc-ngay.js")._test;
ok(H.khop("Chùa Một Cột", "Chùa Một Cột") && !H.khop("Chùa Một Cột", "Chùa Hương") && H.khop("chùa một cột", "Chùa Một Cột (Hà Nội)"), "Chọn bài: tên bài phải khớp phần lớn chữ của mục cần học");
const dai = "Câu một khá dài để thử cắt đoạn. ".repeat(60);
const cd = H.catDoan(dai, 900);
ok(cd.length <= 900 && /\.$/.test(cd), "Cắt đoạn ở câu trọn vẹn, không quá 900 ký tự");

const TRANG = {
  "vi.wikipedia.org/w/api.php": q => ({ query: { search: /Một Cột/.test(q) ? [{ title: "Chùa Hương" }, { title: "Chùa Một Cột" }] : /Lồng Tồng/.test(q) ? [{ title: "Lồng Tồng" }] : [] } }),
  "vi.wikivoyage.org/w/api.php": q => ({ query: { search: [{ title: "Hà Nội" }] } }),
  "vi.wikipedia.org/api/rest_v1/page/summary/Ch%C3%B9a_M%E1%BB%99t_C%E1%BB%99t": () => ({ type: "standard", title: "Chùa Một Cột", extract: "Chùa Một Cột là một ngôi chùa ở Hà Nội. Chùa có kiến trúc độc đáo.", revision: "123", content_urls: { desktop: { page: "https://vi.wikipedia.org/wiki/Ch%C3%B9a_M%E1%BB%99t_C%E1%BB%99t" } } }),
  "vi.wikipedia.org/api/rest_v1/page/summary/L%E1%BB%93ng_T%E1%BB%93ng": () => ({ type: "disambiguation", title: "Lồng Tồng", extract: "Lồng Tồng có thể là: ..." })
};
const daGoi = [];
const fakeFetch = async (url) => {
  daGoi.push(url);
  const u = new URL(url), k = u.host + u.pathname, f = TRANG[k];
  if (!f) return { ok: false, json: async () => ({}) };
  return { ok: true, json: async () => f(decodeURIComponent(u.searchParams.get("srsearch") || "")) };
};
const ghi = [], xong = [];
const fakeDb = async (q, p) => {
  if (/bt_hoc_viec/.test(q)) return [{ v: { con: 5, sources: ["wikipedia_vi", "wikivoyage_vi"], viec: [{ id: 1, kind: "dia_danh", target: "Chùa Một Cột", prov_id: "ha-noi" }, { id: 2, kind: "chu_de", target: "Lồng Tồng", prov_id: null }] } }];
  if (/bt_hoc_ghi/.test(q)) { ghi.push(p); return [{ ok: true }]; }
  if (/bt_hoc_xong/.test(q)) { xong.push(p[0]); return []; }
  return [];
};
const kq = await H.chay(fakeDb, fakeFetch);
ok(ghi.length === 1 && ghi[0][0] === 1 && ghi[0][2] === "Chùa Một Cột" && /kiến trúc độc đáo/.test(ghi[0][5]) && ghi[0][4] === 123, "Việc hằng ngày: lấy đúng bài Chùa Một Cột (bỏ bài Chùa Hương đứng trước), ghi vào hàng chờ");
ok(!ghi.some(g => g[2] === "Lồng Tồng") && !ghi.some(g => g[2] === "Hà Nội"), "Bỏ trang định hướng và bài lạc đề (Wikivoyage trả Hà Nội cho Chùa Một Cột)");
ok(xong.join(",") === "1,2" && kq.muc === 2 && kq.ghi === 1, "Đánh dấu đã chạy từng mục học (để lần sau không lặp lại trong 6 ngày)");
ok(daGoi.every(u => /^https:\/\/vi\.(wikipedia|wikivoyage)\.org\//.test(u)), "Chỉ gọi API Wikimedia của nguồn admin bật (" + daGoi.length + " lần)");

console.log(loi.length ? "\nbai-day: " + loi.length + " LỖI" : "\nbai-day: đạt");
process.exit(loi.length ? 1 : 0);
