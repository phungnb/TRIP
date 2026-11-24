/* GET /api/du-lieu -> {items:[{prov_id, kind, item_id, data, is_new, hidden, deleted, version}]}
   Bản sửa dữ liệu của admin (bảng public.data_overrides, role bt_api chỉ đọc). App hợp nhất với file tĩnh (js/du-lieu-sua.js).
   Lỗi hoặc chưa có kết nối Neon: trả 503, app tự chạy bằng file tĩnh.
   Bộ đệm CDN 30 giây; admin vừa lưu thì app gọi kèm ?t= để lấy bản mới ngay. */
const { sql } = require("./_db");
module.exports = async function handler(req, res) {
  res.setHeader("content-type", "application/json; charset=utf-8");
  if (req.method !== "GET") { res.statusCode = 405; res.setHeader("allow", "GET"); return res.end('{"error":"method"}'); }
  try {
    const rows = await sql("select prov_id, kind, item_id, data, is_new, hidden, deleted, version from public.data_overrides order by updated_at");
    res.statusCode = 200;
    res.setHeader("cache-control", "public, max-age=0, s-maxage=30, stale-while-revalidate=300");
    res.end(JSON.stringify({ items: rows }));
  } catch (e) {
    console.error("du-lieu", e.message);
    res.statusCode = 503; res.setHeader("cache-control", "no-store");
    res.end('{"error":"Chưa tải được bản sửa, dùng dữ liệu có sẵn."}');
  }
};
