/* /auth/* -> Neon Auth (vercel.json rewrite tới /api/auth-proxy?p=...).
   Vì sao: cookie phiên của Neon Auth nằm ở tên miền neonauth.*.neon.tech. Safari (iPhone, Mac) chặn cookie bên thứ ba,
   nên đăng nhập thành công nhưng phiên không giữ được. Đi qua cùng tên miền app thì cookie là cookie của chính app.
   Rewrite thẳng sang Neon bị từ chối (INVALID_HOSTNAME do Vercel gửi kèm host của app), nên chuyển tiếp ở đây với header sạch.
   Chỉ chuyển tiếp tới đúng 1 địa chỉ Neon Auth cố định, không nhận địa chỉ từ client. */
const UP = "https://ep-noisy-cake-aolzjjha.neonauth.c-2.ap-southeast-1.aws.neon.tech/neondb/auth";
const UP_HOST = new URL(UP).host;
const GIU = ["content-type", "cookie", "origin", "user-agent", "authorization", "accept", "accept-language", "referer", "x-neon-auth-middleware"];
const BO = new Set(["content-length", "content-encoding", "transfer-encoding", "connection", "keep-alive", "set-cookie", "location",
  "access-control-allow-origin", "access-control-allow-credentials", "access-control-allow-headers", "access-control-allow-methods", "access-control-expose-headers", "vary"]);

function duongDan(req) {
  const u = new URL(req.url, "http://x");
  let p = u.searchParams.get("p") || "";
  u.searchParams.delete("p");
  p = p.split("/").filter(s => s && s !== "." && s !== "..").map(encodeURIComponent).join("/");
  const q = u.searchParams.toString();
  return UP + "/" + p + (q ? "?" + q : "");
}
/* bỏ Domain để cookie gắn với tên miền app, Path=/ vì đường dẫn đổi từ /neondb/auth sang /auth; cùng site nên SameSite=Lax là đủ */
function suaCookie(c) {
  return c.split(";").map(s => s.trim()).filter(s => !/^domain=/i.test(s))
    .map(s => /^samesite=/i.test(s) ? "SameSite=Lax" : /^path=/i.test(s) ? "Path=/" : s).join("; ");
}
function docBody(req) {
  return new Promise((ok, loi) => { const b = []; req.on("data", c => b.push(c)); req.on("end", () => ok(Buffer.concat(b))); req.on("error", loi); });
}
function layCookie(h) {
  if (typeof h.getSetCookie === "function") return h.getSetCookie();
  const v = h.get("set-cookie"); return v ? v.split(/,(?=\s*[^;,=\s]+=)/) : [];
}

async function chuyen(req, res, fetcher) {
  const url = duongDan(req);
  const headers = {};
  for (const k of GIU) if (req.headers[k]) headers[k] = req.headers[k];
  const method = req.method || "GET";
  const body = method === "GET" || method === "HEAD" ? undefined : await docBody(req);
  const r = await fetcher(url, { method, headers, body: body && body.length ? body : undefined, redirect: "manual" });
  res.statusCode = r.status;
  r.headers.forEach((v, k) => { if (!BO.has(k)) res.setHeader(k, v); });
  const ck = layCookie(r.headers).map(suaCookie);
  if (ck.length) res.setHeader("set-cookie", ck);
  const loc = r.headers.get("location");
  if (loc) res.setHeader("location", loc.indexOf(UP) === 0 ? "/auth" + loc.slice(UP.length) : loc);
  res.setHeader("cache-control", "no-store");
  res.end(Buffer.from(await r.arrayBuffer()));
}

module.exports = async function handler(req, res) {
  try { await chuyen(req, res, fetch); }
  catch (e) {
    console.error("auth-proxy", e.message);
    res.statusCode = 502; res.setHeader("content-type", "application/json; charset=utf-8"); res.setHeader("cache-control", "no-store");
    res.end('{"error":"Chưa kết nối được máy chủ đăng nhập, thử lại sau."}');
  }
};
module.exports._test = { duongDan, suaCookie, chuyen, UP_HOST };
