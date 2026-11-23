/* Nhận sự kiện đo lường từ app: POST /api/sukien {ss, ev:[{n, tinh, loai, ngay}]} -> svc.events (Neon).
   Chỉ 4 loại sự kiện. Không lưu IP, không lưu chữ người dùng gõ; ss là mã ngẫu nhiên theo phiên trình duyệt
   để đếm phễu theo phiên, không gắn với người. Xem số: xem neon/002_su_kien.sql. */
const { sql } = require("./_db");
const NAMES = new Set(["tim_kiem", "mo_tinh", "luu_chuyen", "xong_buoc_4"]);
const seen = new Map();
const clean = (s, n) => (s == null ? null : String(s).replace(/[^a-z0-9_-]/gi, "").slice(0, n) || null);
module.exports = async function handler(req, res) {
  res.setHeader("cache-control", "no-store");
  if (req.method !== "POST") { res.statusCode = 405; return res.end(); }
  let b = req.body;
  if (typeof b === "string") { try { b = JSON.parse(b); } catch (e) { b = {}; } }
  b = b || {};
  const ip = String(req.headers["x-forwarded-for"] || "").split(",")[0].trim();
  const n = (seen.get(ip) || 0) + 1; seen.set(ip, n); if (seen.size > 5000) seen.clear();
  const ev = (Array.isArray(b.ev) ? b.ev : []).filter(e => e && NAMES.has(e.n)).slice(0, 20);
  if (n > 60 || !ev.length) { res.statusCode = 204; return res.end(); }
  const ss = clean(b.ss, 24);
  const vals = [], params = [];
  ev.forEach(e => {
    const i = params.length;
    vals.push("($" + (i + 1) + ",$" + (i + 2) + ",$" + (i + 3) + ",$" + (i + 4) + ",$" + (i + 5) + ")");
    const ngay = Number(e.ngay);
    params.push(e.n, clean(e.tinh, 40), clean(e.loai, 20), Number.isFinite(ngay) && ngay >= 0 && ngay < 100 ? Math.round(ngay) : null, ss);
  });
  try { await sql("insert into svc.events(name,tinh,loai,ngay,ss) values " + vals.join(","), params); }
  catch (e) { console.error("sukien", e.message); }
  res.statusCode = 204; res.end();
};
