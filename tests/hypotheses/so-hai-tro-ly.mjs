/* So hai trợ lý trên cùng bộ câu, cùng bộ chấm (cham.mjs):
   - CU:  engine luật (app/ai/*.js), như khi engine mới chưa nạp.
   - MOI: engine học trước (tools/buitrip-ai/js-port: bundle + kb.json, ai-model.json, extra.json, đã gỡ khỏi app 24/11/2026), luôn lấy câu trả lời của nó.
   - GOP: như app đang chạy: engine cũ trước, engine mới chỉ khi cũ ra dự phòng và mới tự tin (confidence ≥ 0.9, score ≥ 0.3).
   Chạy: node tests/hypotheses/so-hai-tro-ly.mjs [--in 15] */
import fs from "node:fs";
import path from "node:path";
import vm from "node:vm";
import { fileURLToPath } from "node:url";
import { moi } from "./cham.mjs";
import { APP } from "../nap-du-lieu.mjs";

const DIR = path.dirname(fileURLToPath(import.meta.url));
const IN = (i => i > 0 ? +process.argv[i + 1] : 12)(process.argv.indexOf("--in"));
const C = moi(), W = C.W, fold = C.fold, main = C.main;
const cu = W.askBuiTrip;

/* nạp engine mới trong vm */
const ctx = { console, Math, JSON, Date, String, Number, Array, Object, RegExp, Set, Map, Infinity, parseFloat, parseInt, isNaN };
ctx.window = ctx; ctx.self = ctx; vm.createContext(ctx);
const JP = path.join(DIR, "..", "..", "tools", "buitrip-ai", "js-port");
vm.runInContext(fs.readFileSync(path.join(JP, "buitrip-ai-bundle.js"), "utf8"), ctx);
const J = f => JSON.parse(fs.readFileSync(path.join(JP, f), "utf8"));
const kb = J("kb.json");
const NEW = ctx.BuiTripAI.load(kb, J("ai-model.json"), J("extra.json"));
const tinhOf = {}; kb.forEach(e => { if (e.ten && !(e.ten in tinhOf)) tinhOf[e.ten] = e.tinh || ""; });

/* tên mục engine mới -> itemKey của app, để bộ chấm kiểm "đúng nơi" như với engine cũ */
const MUC = new Map();
W.PROV_DATA.forEach(p => [["places", "place"], ["dishes", "dish"], ["stays", "stay"]].forEach(([k, kind]) => p[k].forEach(x => { const f = fold(main(x.name)); if (!MUC.has(f)) MUC.set(f, { p, kind, x }); })));
const provByName = n => W.PROV_DATA.find(p => fold(p.name) === fold(n));
const esc = s => String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;");
function hoiMoi(q) {
  const t0 = Date.now(), r = NEW.ask(String(q).trim());
  if (!r || !r.answer) return { kind: "fallback", html: "", ms: Date.now() - t0, tuTin: false };
  let ent = null; const m = r.entity && MUC.get(fold(main(r.entity)));
  if (m) ent = { prov: m.p.id, itemKey: m.p.id + "|" + m.kind + "|" + m.x.id };
  else { const p = provByName(tinhOf[r.entity] || r.entity || ""); if (p) ent = { prov: p.id }; }
  const pid = ent && ent.prov;
  return { kind: "ainew", ent, ms: Date.now() - t0, tuTin: r.confidence >= 0.9 && r.score >= 0.3, conf: r.confidence, score: r.score,
    html: '<div>' + esc(r.answer).replace(/\n/g, "<br>") + '</div>' + (pid ? '<button onclick="openProvDetail(\'' + pid + '\')">Mở cẩm nang</button>' : "") };
}
const MODE = {
  CU: q => cu(q, { noCtx: true }),
  MOI: q => hoiMoi(q),
  GOP: q => { const r = cu(q, { noCtx: true }); if (r.kind !== "fallback") return r; const n = hoiMoi(q); return n.tuTin ? n : r; },
};

function cham(c) {
  const o = { ky: c.ky };
  if (c.tgTen) o.tg = C.dich(c.tgTen);
  if (c.loaiHoi) o.loai = c.loaiHoi;
  if (c.from) o.from = c.from;
  if (c.cam) o.cam = c.cam;
  const k = C.chamHoi(c.q, c.ky, o);
  if (c.duPhong && !/App chưa có thông tin này/.test(k.text)) k.loi.push({ muc: "NẶNG", loai: "thiếu dự phòng", ghi: "câu ngoài dữ liệu không dùng dự phòng" });
  if (c.phaiCo) c.phaiCo.forEach(s => { if (fold(k.text).indexOf(fold(s)) < 0) k.loi.push({ muc: "NẶNG", loai: "thiếu nội dung", ghi: "thiếu '" + s + "'" }); });
  /* lỗi riêng engine mới: in dữ liệu thô, ghi nguồn */
  if (/\bLoai:|\bPhu hop:|tìm Google|tìm ngày|theo nguồn|mâu thuẫn|Nguồn:/i.test(k.text)) k.loi.push({ muc: "NẶNG", loai: "lộ dữ liệu thô", ghi: (k.text.match(/.{0,30}(Loai:|Phu hop:|tìm Google|tìm ngày|theo nguồn|mâu thuẫn|Nguồn:).{0,30}/i) || [""])[0] });
  return k;
}
const BO = [
  ["live-120.json", "120 câu đã kiểm live"],
  ["ngoai-du-lieu.json", "20 câu ngoài dữ liệu"],
  ["cau-hoi-that.json", "161 câu thật từ diễn đàn"],
  ["../../tools/hoc/vai-48.json", "48 câu theo vai (đánh giá 24/11)"],
];
const KQ = {}, MAU = {};
for (const [f, ten] of BO) {
  const p = path.join(DIR, f); if (!fs.existsSync(p)) continue;
  const d = JSON.parse(fs.readFileSync(p, "utf8")), xs = Array.isArray(d) ? d : d.cau;
  KQ[ten] = {};
  for (const [mode, fn] of Object.entries(MODE)) {
    W.askBuiTrip = fn; let ok = 0, chan = 0, tuTin = 0, tuTinDung = 0; const sai = [];
    for (const c of xs) {
      const k = cham(c); const good = !k.loi.length;
      if (good) ok++; else if (k.loi.some(e => e.muc === "CHẶN")) chan++;
      if (mode === "MOI" && k.res.tuTin) { tuTin++; if (good) tuTinDung++; }
      if (!good) sai.push({ q: c.q.slice(0, 90), loi: k.loi.filter(e => e.muc !== "NHẸ").map(e => e.muc + " " + e.loai + ": " + String(e.ghi).slice(0, 70)).join(" | "), tra: k.text.slice(0, 120) });
      if (mode === "MOI") { (MAU[c.q] = MAU[c.q] || {}).moi = k.text.slice(0, 160); }
      if (mode === "CU") { (MAU[c.q] = MAU[c.q] || {}).cu = k.text.slice(0, 160); }
    }
    KQ[ten][mode] = { ok, n: xs.length, chan, tuTin, tuTinDung, sai: sai.filter(s => s.loi) };
    W.askBuiTrip = cu;
  }
  const r = KQ[ten]; console.log(`\n== ${ten}`);
  for (const m of Object.keys(MODE)) console.log(`  ${m.padEnd(4)} ĐÚNG ${r[m].ok}/${r[m].n} (${(100 * r[m].ok / r[m].n).toFixed(1)}%) · CHẶN ${r[m].chan}` + (m === "MOI" ? ` · tự tin ${r[m].tuTin}, trong đó đúng ${r[m].tuTinDung}` : ""));
  r.MOI.sai.filter(s => /CHẶN|lộ dữ liệu/.test(s.loi)).slice(0, IN).forEach(s => console.log("    MOI: " + s.q + "\n         " + s.loi + "\n         -> " + s.tra));
}
fs.writeFileSync(path.join(DIR, "..", "..", "tools", "hoc", "ra-so-hai-tro-ly.json"), JSON.stringify(KQ, null, 1));
