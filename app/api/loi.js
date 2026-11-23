/* Nhận báo lỗi JavaScript từ máy người dùng: POST /api/loi -> ghi svc.client_errors (Neon).
   Không lưu IP, không lưu nội dung người dùng gõ; chỉ thông báo lỗi, tệp, dòng, trình duyệt. */
const { sql } = require("./_db");
const seen = new Map();
function cut(s, n) { s = s == null ? "" : String(s); return s.length > n ? s.slice(0, n) : s; }
module.exports = async function handler(req, res) {
  res.setHeader("cache-control", "no-store");
  if (req.method !== "POST") { res.statusCode = 405; res.setHeader("allow", "POST"); return res.end(); }
  let b = req.body;
  if (typeof b === "string") { try { b = JSON.parse(b); } catch (e) { b = {}; } }
  b = b || {};
  const ip = String(req.headers["x-forwarded-for"] || "").split(",")[0].trim();
  const n = (seen.get(ip) || 0) + 1; seen.set(ip, n); if (seen.size > 5000) seen.clear();
  if (n > 20 || !b.msg) { res.statusCode = 204; return res.end(); }
  try {
    await sql("insert into svc.client_errors(msg,src,line,col,stack,url,ua,ver) values ($1,$2,$3,$4,$5,$6,$7,$8)",
      [cut(b.msg, 500), cut(b.src, 300), Number(b.line) || null, Number(b.col) || null, cut(b.stack, 2000),
       cut(String(b.url || "").split("?")[0], 300), cut(req.headers["user-agent"], 300), cut(b.ver, 40)]);
  } catch (e) { console.error("loi", e.message, cut(b.msg, 200)); }
  res.statusCode = 204; res.end();
};
