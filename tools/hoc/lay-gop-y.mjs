/* Lấy góp ý trợ lý người dùng đã bấm gửi ("Lưu và gửi cho BuiTrip", ai/ai-loader.js) từ bảng svc.support (Neon),
   ghi thành nhật ký cho de-xuat.mjs. Chỉ đọc, không sửa bảng. Không lấy tên, cách liên hệ, IP.
   Cần BT_DB_URL (chuỗi kết nối role bt_api, như app/api/_db.js); không có thì báo và dừng.
   Chạy: BT_DB_URL=... node tools/hoc/lay-gop-y.mjs [--tu 2026-11-24] [--ra tools/hoc/ra/nhat-ky.jsonl]
   Rồi:  node tools/hoc/de-xuat.mjs --vao tools/hoc/ra/nhat-ky.jsonl */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { xoaRieng } from "./de-xuat.mjs";

const DIR = path.dirname(fileURLToPath(import.meta.url));
const arg = k => { const i = process.argv.indexOf(k); return i > 0 ? process.argv[i + 1] : null; };
const TU = arg("--tu") || "2026-11-24", RA = arg("--ra") || path.join(DIR, "ra", "nhat-ky.jsonl");

/* "[Trợ lý] Câu hỏi: … | Loại trả lời: … | Nơi đúng: … | Ghi chú: …" -> {q, ok:false, fix, ghi, loai} */
export function docTin(msg) {
  const m = String(msg || "").match(/^\[Trợ lý\] Câu hỏi: (.*?) \| Loại trả lời: (.*?) \| Nơi đúng: (.*?) \| Ghi chú: (.*)$/s);
  if (!m) return null;
  return { q: xoaRieng(m[1]), ok: false, loai: m[2], fix: xoaRieng(m[3]), ghi: xoaRieng(m[4]) };
}

if (import.meta.url === "file://" + process.argv[1]) {
  if (!process.env.BT_DB_URL) { console.error("Thiếu BT_DB_URL. Xem tools/hoc/README.md."); process.exit(2); }
  const { sql } = await import("../../app/api/_db.js").then(m => m.default || m);
  const rows = await sql("select msg from svc.support where msg like '[Trợ lý]%' and at >= $1::date order by at", [TU]);
  const L = rows.map(r => docTin(r.msg)).filter(Boolean);
  fs.mkdirSync(path.dirname(RA), { recursive: true });
  fs.writeFileSync(RA, L.map(x => JSON.stringify(x)).join("\n") + (L.length ? "\n" : ""));
  console.log("Đã ghi", L.length, "góp ý vào", RA);
}
