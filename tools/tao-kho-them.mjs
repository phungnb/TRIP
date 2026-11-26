/* Sinh app/ai/kho-them.js: các mục trong kho tools/buitrip-ai/js-port/kb.json mà dữ liệu app CHƯA có
   (quán ăn, chỗ ở, điểm nhỏ đã dịch từ đợt học 24/11). Trợ lý dùng để trả lời "X ở đâu, giá, giờ" khi app không có mục X.
   Chỉ chép chuỗi có sẵn trong kho, bỏ ghi chú nghiên cứu (nguồn, link, "giá cũ", "mâu thuẫn"): giao diện không hiện nguồn.
   Chạy: node tools/tao-kho-them.mjs  (rồi tăng VER trong app/sw.js) */
import fs from "node:fs";
import path from "node:path";
import vm from "node:vm";
import { fileURLToPath } from "node:url";
const ROOT = path.join(path.dirname(fileURLToPath(import.meta.url)), "..");
const fold = s => String(s || "").toLowerCase().replace(/đ/g, "d").normalize("NFD").replace(/[̀-ͯ]/g, "").replace(/[^a-z0-9]+/g, " ").trim();
const main = s => String(s || "").split(" (")[0].split(" — ")[0].trim();
const kb = JSON.parse(fs.readFileSync(path.join(ROOT, "tools/buitrip-ai/js-port/kb.json"), "utf8"));
const ctx = { console }; ctx.window = ctx; vm.createContext(ctx);
for (const f of ["data/prov-data.js", "data/bo-sung.js", "data/dia-diem-moi.js", "data/an-o-moi.js", "data/lam-giau.js", "data/racehub-places.js"]) {
  const p = path.join(ROOT, "app", f); if (fs.existsSync(p)) try { vm.runInContext(fs.readFileSync(p, "utf8") + "\n;this.PROV_DATA=typeof PROV_DATA!=='undefined'?PROV_DATA:this.PROV_DATA;", ctx); } catch (e) { console.error("bỏ qua", f, e.message); }
}
const TEN = new Set(), TINH = new Set();
(ctx.PROV_DATA || []).forEach(p => { TINH.add(fold(p.name)); ["places", "dishes", "stays"].forEach(k => (p[k] || []).forEach(x => TEN.add(fold(main(x.name || x))))); });
const CAM = /nguồn|wikivoyage|wikipedia|http|link|giá cũ|đã cũ|ghi \d|mâu thuẫn|đối chiếu|kiểm chứng|tìm google|lấy ngày|bối cảnh|theo .*(2018|2019|2020)|cần kiểm/i;
/* bỏ ngoặc và đuôi " — …" chứa ghi chú nghiên cứu; còn ghi chú thì bỏ cả trường */
function sach(s) {
  s = String(s || "").replace(/\s+/g, " ").trim();
  if (!s || /^chưa kiểm được/i.test(s)) return "";
  let t = s.replace(/\s*\([^()]*\)/g, m => CAM.test(m) ? "" : m).replace(/\s+—\s+.*$/, m => CAM.test(m) ? "" : m).trim();
  t = t.replace(/[.;,\s]+$/, "");
  return !t || CAM.test(t) || t.length > 220 ? "" : t;
}
function moTa(g) {
  const cau = String(g || "").replace(/\s+/g, " ").split(/(?<=\.)\s+/).filter(c => c && !CAM.test(c) && !/^Địa chỉ:/i.test(c) && !/hỏi lại|nên hỏi/i.test(c));
  let t = ""; for (const c of cau) { if ((t + " " + c).length > 320) break; t = (t ? t + " " : "") + c; }
  return t;
}
const out = []; let bo = 0;
const LOAI = { mon_an: "an", cho_o: "o" };
for (const e of kb) {
  const ten = String(e.ten || "").trim(), k = fold(main(ten));
  if (!ten || /\(tổng quan\)/.test(ten) || e.loai === "chi_phi" || /bình ba|bình hưng/i.test(ten + " " + e.ghi_chu)) { bo++; continue; }
  /* điểm dọc tuyến mà app đã có trang: chỉ giữ tên + mã tuyến (a: 1) để trợ lý liệt kê đủ khi hỏi "QL51 có gì" */
  if (e.tuyen && TEN.has(k)) { out.push({ t: ten, p: e.tinh || "", l: "d", tu: e.tuyen, a: 1 }); continue; }
  if (TEN.has(k) || TINH.has(k) || k.split(" ").length < 2) { bo++; continue; }
  const dc = sach(e.dia_chi) || sach((String(e.ghi_chu || "").match(/Địa chỉ:\s*([^]*?)(?:\.\s|\.$|$)/) || [])[1]);
  const r = { t: ten, p: e.tinh || "", l: LOAI[e.loai] || "d" };
  if (dc) r.dc = dc;
  const gia = sach(e.gia), gio = sach(e.gio), mt = moTa(e.ghi_chu);
  /* mô tả dịch từ Wikivoyage (CC BY-SA): trợ lý ghi giấy phép dưới mô tả */
  if (mt && /wikivoyage/i.test(e.nguon || "")) r.w = 1;
  if (gia) r.g = gia; if (gio) r.h = gio; if (mt) r.m = mt;
  /* tu: mã tuyến đường điểm nằm dọc (QL51); l "t" là chính mục tuyến đường */
  if (e.tuyen) r.tu = e.tuyen; if (e.loai === "tuyen") r.l = "t";
  if (!r.dc && !r.g && !r.h && !r.m) { bo++; continue; }
  out.push(r);
}
const js = "/* Mục trong kho học (đợt 24/11/2026) mà dữ liệu app chưa có. Sinh bởi tools/tao-kho-them.mjs, không sửa tay.\n" +
  "   t: tên; p: tỉnh; l: d điểm / an quán ăn / o chỗ ở; dc: địa chỉ; g: giá tham khảo; h: giờ; m: mô tả; w: 1 = mô tả dịch từ Wikivoyage (CC BY-SA); tu: mã tuyến đường điểm nằm dọc, l t = mục tuyến đường; a: 1 = app đã có trang. */\nvar BT_KHO_THEM = " + JSON.stringify(out) + ";\n";
fs.writeFileSync(path.join(ROOT, "app/ai/kho-them.js"), js);
console.log("kho-them.js:", out.length, "mục,", Math.round(js.length / 1024), "KB; bỏ", bo);
