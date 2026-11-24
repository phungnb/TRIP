/* Học từ nhật ký câu hỏi: đọc nhật ký (mỗi dòng 1 JSON {q, ok?}), cho trợ lý hiện tại trả lời lại từng câu,
   gom các câu vẫn trượt theo phần tên được hỏi, rồi đề xuất:
   - bien_the: cách gõ gần với 1 tên có trong dữ liệu (sai dấu, sai 1–2 chữ) -> thêm vào bảng biến thể
   - thieu:    nơi/món được hỏi nhiều lần mà dữ liệu chưa có -> việc bổ sung dữ liệu
   - ngoai:    câu ngoài phạm vi (thời tiết, đặt phòng...) -> chỉ đếm, không học
   - sai:      người dùng bấm "sai" dù trợ lý có trả lời -> đọc tay
   Không có gì tự lên app: người duyệt đặt "duyet": true trong de-xuat.json rồi chạy ap-dung.mjs.
   Chạy: node tools/hoc/de-xuat.mjs --vao <nhat-ky.jsonl> [--ra tools/hoc/ra] */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { napAI } from "../../tests/nap-ai.mjs";

const DIR = path.dirname(fileURLToPath(import.meta.url));
const arg = k => { const i = process.argv.indexOf(k); return i > 0 ? process.argv[i + 1] : null; };
const VAO = arg("--vao"), RA = arg("--ra") || path.join(DIR, "ra");

/* Xóa thông tin nhận dạng trước khi xử lý (nhật ký đã xóa ở máy người dùng, đây là lớp thứ hai) */
export const xoaRieng = s => String(s || "")
  .replace(/[\w.+-]+@[\w-]+\.[\w.]+/g, "[email]")
  .replace(/(\+?84|0)[\d .-]{8,12}\d/g, "[số]")
  .replace(/\d{6,}/g, "[số]")
  .slice(0, 200);

export function lev(a, b) {
  if (a === b) return 0;
  const m = a.length, n = b.length; if (!m || !n) return m || n;
  let p = Array.from({ length: n + 1 }, (_, j) => j);
  for (let i = 1; i <= m; i++) {
    const c = [i];
    for (let j = 1; j <= n; j++) c[j] = Math.min(p[j] + 1, c[j - 1] + 1, p[j - 1] + (a[i - 1] === b[j - 1] ? 0 : 1));
    p = c;
  }
  return p[n];
}

export function deXuat(dong, W = napAI()) {
  const A = W.BTAI, fold = A.fold, main = n => String(n || "").split(" (")[0];
  /* bảng tên: tên đầy đủ và đuôi tên từ 2 chữ ("Thác Bản Giốc" -> "bản giốc") */
  const TEN = [], seen = new Set();
  const add = (n, loai) => { const l = String(n).toLowerCase().trim(), f = fold(l); if (f.length >= 4 && !seen.has(f)) { seen.add(f); TEN.push({ f, l, loai }); } };
  W.PROV_DATA.forEach(p => {
    add(p.name, "tỉnh");
    p.places.forEach(x => { const n = main(x.name); add(n, "địa danh"); const w = n.split(/\s+/); for (let i = 1; i + 2 <= w.length; i++) add(w.slice(i).join(" "), "địa danh"); });
    p.dishes.forEach(x => add(main(x.name), "món"));
  });
  (W.KHU_VUC || []).forEach(a => add(a.name, "khu"));
  (W.DAO_TIEP_CAN || []).forEach(d => add(d.name, "đảo"));
  Object.keys(W.SAP_NHAP || {}).forEach(k => W.SAP_NHAP[k].forEach(o => add(o, "tỉnh cũ")));

  const gan = (go) => {
    const f = fold(go); if (f.length < 4) return null;
    let best = null;
    for (const t of TEN) {
      if (Math.abs(t.f.length - f.length) > 2) continue;
      const d = lev(f, t.f), cho = Math.max(1, Math.floor(t.f.length * 0.2));
      if (d <= cho && (!best || d < best.d)) best = { ...t, d };
    }
    /* gõ không dấu đúng tên mà vẫn trượt: biến thể là chính tên có dấu */
    return best;
  };

  const tenDung = s => { const ar = A.findArea(s), pv = A.findProv(s), it = A.findItem(s); return ar ? ar.name : pv ? pv.prov.name : it && it.s >= 90 && !it.ambiguous ? main(it.best.x.name) : ""; };
  const nhom = new Map();
  let tong = 0, truot = 0;
  for (const r of dong) {
    const q = xoaRieng(r.q).trim(); if (!q) continue;
    tong++;
    const res = W.askBuiTrip(q, { noCtx: true });
    const intent = A.intentOf(q);
    const fb = res.kind === "fallback" || res.kind === "out";
    if (!fb && r.ok !== false) continue;
    truot++;
    const rest = String(A.rest(q) || "").toLowerCase().trim();
    let loai, ten = null;
    if (intent === "ngoai_mien") loai = "ngoai";
    /* người dùng ghi nơi đúng và app có nơi đó: đề xuất cụm họ gõ -> tên đúng (vẫn cần người duyệt) */
    else if (r.fix && rest && tenDung(r.fix) && fold(tenDung(r.fix)) !== fold(rest)) { loai = "bien_the"; ten = { l: tenDung(r.fix), loai: "người dùng sửa" }; }
    else if (!fb && r.ok === false) loai = "sai";
    else { const g = gan(rest); if (g && g.f !== fold(rest)) { loai = "bien_the"; ten = g; } else if (g) { loai = "bien_the"; ten = g; } else loai = "thieu"; }
    const key = loai + "|" + (loai === "ngoai" ? intent : fold(rest));
    const e = nhom.get(key) || { loai, go: rest, ten_dung: ten ? ten.l : null, loai_ten: ten ? ten.loai : null, so_lan: 0, vi_du: [] };
    e.so_lan++; if (e.vi_du.length < 3 && !e.vi_du.includes(q)) e.vi_du.push(q);
    nhom.set(key, e);
  }
  const muc = [...nhom.values()]
    /* biến thể gõ trùng tên đúng (chỉ khác dấu) vẫn trượt là lỗi tìm, không phải biến thể: chuyển sang đọc tay */
    .map(e => (e.loai === "bien_the" && e.go === e.ten_dung ? Object.assign(e, { loai: "sai", ghi: "gõ đúng tên mà vẫn trượt: lỗi tìm kiếm" }) : e))
    .sort((a, b) => b.so_lan - a.so_lan)
    .map((e, i) => Object.assign({ id: i + 1 }, e, { duyet: false }));
  return { tong, truot, muc };
}

function bang(muc, loai, cot) {
  const l = muc.filter(m => m.loai === loai); if (!l.length) return "_Không có._\n";
  return "| " + cot.map(c => c[0]).join(" | ") + " |\n|" + cot.map(() => "---").join("|") + "|\n" +
    l.map(m => "| " + cot.map(c => String(c[1](m)).replace(/\|/g, "/")).join(" | ") + " |").join("\n") + "\n";
}

if (process.argv[1] && fileURLToPath(import.meta.url) === path.resolve(process.argv[1])) {
  if (!VAO) { console.error("Thiếu --vao <nhat-ky.jsonl>"); process.exit(1); }
  const dong = fs.readFileSync(VAO, "utf8").split("\n").filter(Boolean).map(s => { try { return JSON.parse(s); } catch { return null; } }).filter(Boolean);
  const kq = deXuat(dong);
  fs.mkdirSync(RA, { recursive: true });
  const ngay = new Date().toISOString().slice(0, 10);
  fs.writeFileSync(path.join(RA, "de-xuat.json"), JSON.stringify({ tao: ngay, nguon: path.basename(VAO), tong: kq.tong, truot: kq.truot, muc: kq.muc }, null, 1));
  const md = `# Đề xuất học từ nhật ký ${ngay}\n\n${kq.tong} câu, ${kq.truot} câu trượt. Duyệt: mở de-xuat.json, đặt "duyet": true cho mục đúng, rồi chạy \`node tools/hoc/ap-dung.mjs\`.\n\n` +
    `## Biến thể cách gõ (thêm được ngay)\n\n` + bang(kq.muc, "bien_the", [["#", m => m.id], ["Người gõ", m => m.go], ["Tên đúng", m => m.ten_dung], ["Loại", m => m.loai_ten], ["Số lần", m => m.so_lan]]) +
    `\n## Nơi/món được hỏi mà app chưa có (bổ sung dữ liệu)\n\n` + bang(kq.muc, "thieu", [["#", m => m.id], ["Hỏi về", m => m.go], ["Số lần", m => m.so_lan], ["Ví dụ", m => m.vi_du[0]]]) +
    `\n## Người dùng báo sai, cần đọc tay\n\n` + bang(kq.muc, "sai", [["#", m => m.id], ["Câu", m => m.vi_du[0]], ["Số lần", m => m.so_lan], ["Ghi", m => m.ghi || ""]]) +
    `\n## Ngoài phạm vi (chỉ đếm)\n\n` + bang(kq.muc, "ngoai", [["Số lần", m => m.so_lan], ["Ví dụ", m => m.vi_du[0]]]);
  fs.writeFileSync(path.join(RA, "de-xuat.md"), md);
  const dem = {}; kq.muc.forEach(m => dem[m.loai] = (dem[m.loai] || 0) + 1);
  console.log(`${kq.tong} câu, ${kq.truot} trượt -> ${kq.muc.length} đề xuất`, JSON.stringify(dem), "->", path.relative(process.cwd(), RA));
}
