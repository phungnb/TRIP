/* GET /api/hoc-ngay — việc chạy hằng ngày (Vercel Cron, vercel.json) theo "Chương trình học" admin đặt ở trang admin.
   Với mỗi mục đang học (đến hạn, trong hạn mức trang/ngày): tìm bài trên các nguồn admin bật (chỉ API công khai Wikimedia),
   lấy đoạn giới thiệu, ghi vào hàng chờ (public.ai_candidates) để admin duyệt. Không gì tự lên app.
   Không lấy giá, giờ, số điện thoại: đoạn trích chỉ dùng cho câu hỏi giới thiệu, lịch sử.
   Hạn mức kiểm ở server (bt_hoc_viec, bt_hoc_ghi), gọi thêm lần nữa cũng không vượt hạn mức trong ngày.
   Có biến môi trường CRON_SECRET thì chỉ nhận lời gọi kèm "Authorization: Bearer <CRON_SECRET>" (Vercel Cron tự gửi). */
const { sql } = require("./_db");

const HOST = { wikipedia_vi: "vi.wikipedia.org", wikipedia_en: "en.wikipedia.org", wikivoyage_vi: "vi.wikivoyage.org", wikivoyage_en: "en.wikivoyage.org" };
const UA = "BuiTripBot/1.0 (+https://buitrip.com; hoc-ngay)";

function fold(s) { return String(s || "").toLowerCase().replace(/đ/g, "d").normalize("NFD").replace(/[̀-ͯ]/g, "").replace(/[^a-z0-9 ]+/g, " ").replace(/\s+/g, " ").trim(); }
/* tên bài phải khớp phần lớn chữ của mục cần học, tránh lấy nhầm bài khác */
function khop(target, title) {
  const a = fold(target).split(" ").filter(w => w.length > 1), b = " " + fold(title) + " ";
  if (!a.length) return false;
  const n = a.filter(w => b.indexOf(" " + w + " ") >= 0).length;
  return n / a.length >= 0.6;
}
/* cắt ở câu trọn vẹn, tối đa ~900 ký tự */
function catDoan(t, max) {
  t = String(t || "").replace(/\s+/g, " ").trim(); max = max || 900;
  if (t.length <= max) return t;
  const cut = t.slice(0, max), i = Math.max(cut.lastIndexOf(". "), cut.lastIndexOf("! "), cut.lastIndexOf("? "));
  return i > 80 ? cut.slice(0, i + 1) : cut.replace(/\s+\S*$/, "") + "…";
}
async function getJson(url, fetcher) {
  const ctl = new AbortController(), t = setTimeout(() => ctl.abort(), 4000);
  try {
    const r = await fetcher(url, { headers: { "User-Agent": UA, "Api-User-Agent": UA, accept: "application/json" }, signal: ctl.signal });
    if (!r.ok) return null;
    return await r.json();
  } catch (e) { return null; } finally { clearTimeout(t); }
}
/* Tìm 1 bài cho mục học trên 1 nguồn. Trả {title, url, revid, excerpt} hoặc null. */
async function layMot(source, target, fetcher) {
  const host = HOST[source]; if (!host) return null;
  const s = await getJson("https://" + host + "/w/api.php?action=query&list=search&srnamespace=0&srlimit=3&format=json&utf8=1&srsearch=" + encodeURIComponent(target), fetcher);
  const hits = (s && s.query && s.query.search) || [];
  const hit = hits.find(h => khop(target, h.title));
  if (!hit) return null;
  const sum = await getJson("https://" + host + "/api/rest_v1/page/summary/" + encodeURIComponent(hit.title.replace(/ /g, "_")), fetcher);
  if (!sum || sum.type === "disambiguation" || !sum.extract) return null;
  const excerpt = catDoan(sum.extract);
  if (excerpt.length < 40) return null;
  const url = (sum.content_urls && sum.content_urls.desktop && sum.content_urls.desktop.page) || ("https://" + host + "/wiki/" + encodeURIComponent(hit.title.replace(/ /g, "_")));
  if (!/^https:\/\/[a-z]{2}\.(wikipedia|wikivoyage)\.org\//.test(url)) return null;
  return { title: sum.title || hit.title, url, revid: Number(sum.revision) || null, excerpt };
}

async function chay(db, fetcher) {
  const v = (await db("select public.bt_hoc_viec() as v"))[0].v;
  const out = { con: v.con, muc: 0, ghi: 0, bo: 0 };
  for (const g of v.viec || []) {
    out.muc++;
    const kq = await Promise.all((v.sources || []).map(src => layMot(src, g.target, fetcher).then(x => x && { src, x })));
    for (const k of kq) {
      if (!k) { out.bo++; continue; }
      const r = await db("select public.bt_hoc_ghi($1,$2,$3,$4,$5,$6) as ok", [g.id, k.src, k.x.title, k.x.url, k.x.revid, k.x.excerpt]);
      if (r[0] && r[0].ok) out.ghi++; else out.bo++;
    }
    await db("select public.bt_hoc_xong($1)", [g.id]);
  }
  return out;
}

module.exports = async function handler(req, res) {
  res.setHeader("content-type", "application/json; charset=utf-8");
  res.setHeader("cache-control", "no-store");
  if (req.method !== "GET") { res.statusCode = 405; res.setHeader("allow", "GET"); return res.end('{"error":"method"}'); }
  const key = process.env.CRON_SECRET;
  if (key && (req.headers.authorization || "") !== "Bearer " + key) { res.statusCode = 401; return res.end('{"error":"auth"}'); }
  try {
    const out = await chay(sql, fetch);
    res.statusCode = 200; res.end(JSON.stringify(out));
  } catch (e) {
    console.error("hoc-ngay", e.message);
    res.statusCode = 503; res.end('{"error":"Chưa chạy được, thử lại lần sau."}');
  }
};
module.exports._test = { fold, khop, catDoan, layMot, chay };
