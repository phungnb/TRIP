/* Hỗ trợ người dùng: POST /api/hotro {name?, contact?, msg, page?} -> lưu svc.support (Neon), trả {id, tok}.
   GET /api/hotro?t=tok1,tok2 -> trạng thái và trả lời của các tin đã gửi từ máy này (tok chỉ máy gửi biết).
   Admin xem và trả lời trong app (hàm public.admin_support, chỉ tài khoản admin gọi được).
   IP chỉ lưu dạng băm, để chặn spam: tối đa 5 tin mỗi IP mỗi ngày. */
const { sql } = require("./_db");
const crypto = require("crypto");

function cut(s, n) { s = s == null ? "" : String(s).trim(); return s.length > n ? s.slice(0, n) : s; }
function send(res, code, obj) {
  res.statusCode = code;
  res.setHeader("content-type", "application/json; charset=utf-8");
  res.setHeader("cache-control", "no-store");
  res.end(JSON.stringify(obj));
}

module.exports = async function handler(req, res) {
  if (req.method === "GET") {
    const url = new URL(req.url, "http://x");
    const toks = String(url.searchParams.get("t") || "").split(",").map(s => s.trim()).filter(s => /^[a-f0-9]{32}$/.test(s)).slice(0, 20);
    if (!toks.length) return send(res, 200, { items: [] });
    try {
      const rows = await sql("select tok, at, msg, status, reply, replied_at from svc.support where tok = any($1::text[]) order by at desc", [toks]);
      return send(res, 200, { items: rows });
    } catch (e) { return send(res, 503, { error: "Chưa tải được, thử lại sau." }); }
  }
  if (req.method !== "POST") return send(res, 405, { error: "method" });
  let b = req.body;
  if (typeof b === "string") { try { b = JSON.parse(b); } catch (e) { b = {}; } }
  b = b || {};
  if (b.web) return send(res, 200, { ok: true }); /* bẫy bot: ô ẩn */
  const msg = cut(b.msg, 2000);
  if (msg.length < 3) return send(res, 400, { error: "Nội dung quá ngắn." });
  const ip = String(req.headers["x-forwarded-for"] || "").split(",")[0].trim() || "?";
  const iph = crypto.createHash("sha256").update(ip + "|bt").digest("hex").slice(0, 24);
  try {
    const c = await sql("select count(*)::int as n from svc.support where ip = $1 and at > now() - interval '1 day'", [iph]);
    if (Number(c[0] && c[0].n) >= 5) return send(res, 429, { error: "Hôm nay máy này đã gửi 5 tin. Cần gấp, gửi thư cho buitrip.hotro@gmail.com." });
    const tok = crypto.randomBytes(16).toString("hex");
    const r = await sql("insert into svc.support(tok,name,contact,msg,page,ua,ip) values ($1,$2,$3,$4,$5,$6,$7) returning id",
      [tok, cut(b.name, 80) || null, cut(b.contact, 120) || null, msg, cut(String(b.page || "").split("?")[0], 300) || null, cut(req.headers["user-agent"], 300), iph]);
    return send(res, 200, { id: r[0] && r[0].id, tok });
  } catch (e) {
    console.error("hotro", e.message);
    return send(res, 503, { error: "Chưa gửi được, thử lại sau hoặc gửi thư cho buitrip.hotro@gmail.com." });
  }
};
