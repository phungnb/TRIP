/* Gọi Neon qua HTTP (không cần thư viện). Biến môi trường BT_DB_URL là chuỗi kết nối
   của role bt_api, chỉ đọc/ghi schema svc (hạn mức trợ lý AI, nhật ký lỗi). */
async function sql(query, params) {
  const url = process.env.BT_DB_URL;
  if (!url) throw new Error("no-db");
  const host = new URL(url).hostname.replace(/^[^.]+\./, "api.");
  const ctl = new AbortController();
  const t = setTimeout(() => ctl.abort(), 4000);
  try {
    const r = await fetch("https://" + host + "/sql", {
      method: "POST",
      headers: { "Content-Type": "application/json", "Neon-Connection-String": url },
      body: JSON.stringify({ query, params: params || [] }),
      signal: ctl.signal
    });
    if (!r.ok) throw new Error("db " + r.status + " " + (await r.text()).slice(0, 200));
    const j = await r.json();
    return j.rows || [];
  } finally { clearTimeout(t); }
}
module.exports = { sql };
