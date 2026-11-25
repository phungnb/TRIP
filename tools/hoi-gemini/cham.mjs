/* Chấm bộ câu Gemini viết (ra/cau-hoi.json) bằng đúng bộ chấm của tests/hypotheses (cham.mjs):
   đáp án đúng suy từ dữ liệu app, không dùng câu trả lời nào của Gemini.
   Chạy:  node tools/hoi-gemini/cham.mjs [--in-loi 20] [--bai-day]
   Ra:
     ra/ket-qua.md         tỷ lệ đúng theo nhóm, theo loại lỗi, vài câu trượt tiêu biểu
     ra/truot.json         toàn bộ câu trượt (câu hỏi, đích, lỗi, trợ lý trả gì)
     ra/nhat-ky.jsonl      câu trượt dạng {q, ok:false} để đưa vào vòng học có duyệt sẵn có:
                           node tools/hoc/de-xuat.mjs --vao tools/hoi-gemini/ra/nhat-ky.jsonl
     ra/bai-day.json       (chỉ khi --bai-day) file nhập hàng loạt cho thẻ "Định hướng học" của trang admin:
                           câu Gemini hỏi mà trợ lý trượt, ghép với câu trả lời trợ lý ĐÃ trả đúng cho câu mẫu
                           cùng thực thể, cùng loại. Không có câu mẫu đúng thì không đề xuất. Admin đọc rồi mới nhập. */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { moi } from "../../tests/hypotheses/cham.mjs";
import { chu } from "../../tests/nap-ai.mjs";

const DIR = path.dirname(fileURLToPath(import.meta.url)), RA = path.join(DIR, "ra"), VAO = path.join(RA, "cau-hoi.json");
const ARG = process.argv.slice(2), IN = +(ARG[ARG.indexOf("--in-loi") + 1] || 15), BAI = ARG.includes("--bai-day");
if (!fs.existsSync(VAO)) { console.error("Chưa có " + path.relative(process.cwd(), VAO) + ". Chạy trước: node tools/hoi-gemini/hoi-vu-vo.mjs"); process.exit(1); }
const C = moi(), { fold, main } = C;
const xs = JSON.parse(fs.readFileSync(VAO, "utf8")).cau;
const pct = (a, b) => b ? (100 * a / b).toFixed(1) + "%" : "—";

/* Thực thể đích từ "dich" (giống tests/hypotheses/run.mjs) */
const dich = d => d ? C.TEN.find(t => t.t === d.t && !t.tat && (!d.p || t.ref.p.id === d.p) && JSON.stringify(t.ref && (t.ref.x ? t.ref.x.id : t.ref)) === JSON.stringify(d.ref)) || C.dich(d.ten) : null;
function cham(c) {
  const o = { ky: c.ky, ctx: false, tg: dich(c.dich) };
  if (c.loaiHoi) o.loai = c.loaiHoi;
  const k = C.chamHoi(c.q, "", o);
  if (c.duPhong && !/App chưa có thông tin này/.test(k.text)) k.loi.push({ muc: "NẶNG", loai: "thiếu dự phòng", ghi: "câu ngoài phạm vi không dùng dự phòng" });
  return k;
}

/* Câu mẫu chuẩn cho 1 thực thể + loại: để lấy câu trả lời đúng làm bài dạy */
const MAU = { diden: n => "đi " + n + " bằng gì", mua: n => n + " mùa nào đẹp", choi: n => n + " có gì chơi", angi: n => "ăn gì ở " + n, odau: n => "ở đâu ở " + n, chiphi: n => "đi " + n + " 3 ngày 2 đêm hết bao nhiêu", mang: n => "đi " + n + " cần mang gì", gia: n => "vé " + n + " bao nhiêu", anodau: n => n + " ăn ở đâu" };

C.A.ctx.reset();
let ok = 0; const nh = {}, loai = {}, truot = [], bai = [];
for (const c of xs) {
  const k = cham(c), g = c.nhom || "";
  nh[g] = nh[g] || [0, 0]; nh[g][1]++;
  if (!k.loi.length) { ok++; nh[g][0]++; continue; }
  k.loi.forEach(e => { const t = e.muc + " " + e.loai; loai[t] = (loai[t] || 0) + 1; });
  truot.push({ q: c.q, nhom: g, dich: c.dich, loaiHoi: c.loaiHoi, loi: k.loi, tra: k.text.slice(0, 300) });
  /* đề xuất bài dạy: chỉ lỗi nhận dạng (không phải bịa số / nơi cấm), có câu mẫu cùng thực thể trả đúng */
  if (BAI && c.dich && MAU[c.loaiHoi] && !k.loi.some(e => e.loai === "bịa số" || e.loai === "gợi ý nơi cấm")) {
    const qm = c.loaiHoi === "gia" && /món/.test(g) ? c.dich.ten + " giá bao nhiêu" : MAU[c.loaiHoi](c.dich.ten), km = C.chamHoi(qm, "", { tg: dich(c.dich), loai: c.loaiHoi });
    if (!km.loi.length && !/App chưa có thông tin này/.test(km.text)) {
      const pid = c.dich.p || (c.dich.t === "prov" ? c.dich.ref : c.dich.t === "area" ? (C.areaById(c.dich.ref) || {}).prov : null);
      bai.push({ kind: "hoi_dap", data: Object.assign({ q: c.q.slice(0, 200), a: chu(km.text).slice(0, 1500) }, pid ? { prov_id: pid } : {}), _cau_mau: qm });
    }
  }
}

const L = [];
L.push("# Chấm câu Gemini hỏi trợ lý BuiTrip", "", "Ngày chấm: " + new Date().toISOString().slice(0, 10) + ". Bộ chấm: tests/hypotheses/cham.mjs (đáp án suy từ dữ liệu app).", "");
L.push("**ĐÚNG " + ok + "/" + xs.length + " (" + pct(ok, xs.length) + ")**, CHẶN " + truot.filter(t => t.loi.some(e => e.muc === "CHẶN")).length, "");
L.push("| Nhóm | Đúng |", "|---|---|"); Object.keys(nh).sort().forEach(g => L.push("| " + g + " | " + nh[g][0] + "/" + nh[g][1] + " (" + pct(nh[g][0], nh[g][1]) + ") |"));
L.push("", "| Loại lỗi | Số câu |", "|---|---|"); Object.entries(loai).sort((a, b) => b[1] - a[1]).forEach(([t, n]) => L.push("| " + t + " | " + n + " |"));
L.push("", "## Câu trượt tiêu biểu", "");
truot.slice(0, IN).forEach(t => L.push("- `" + t.q.replace(/`/g, "'") + "` (đích: " + (t.dich ? t.dich.ten : "ngoài phạm vi") + ")", "  - " + t.loi.map(e => e.muc + " " + e.loai + ": " + e.ghi).join(" | ").slice(0, 240), "  - trả: " + t.tra.slice(0, 160)));
fs.mkdirSync(RA, { recursive: true });
fs.writeFileSync(path.join(RA, "ket-qua.md"), L.join("\n") + "\n");
fs.writeFileSync(path.join(RA, "truot.json"), JSON.stringify(truot, null, 1));
fs.writeFileSync(path.join(RA, "nhat-ky.jsonl"), truot.map(t => JSON.stringify({ q: t.q, ok: false })).join("\n") + (truot.length ? "\n" : ""));
if (BAI) fs.writeFileSync(path.join(RA, "bai-day.json"), JSON.stringify({ ghi: "Đề xuất, CHƯA duyệt. Đọc từng câu trả lời trước khi nhập ở thẻ Định hướng học. Xóa trường _cau_mau trước khi nhập cũng được (trang admin bỏ qua).", agenda: [], lessons: bai }, null, 1));

console.log(L.slice(0, L.indexOf("## Câu trượt tiêu biểu")).join("\n"));
console.log("\nTrượt " + truot.length + " câu -> ra/truot.json, ra/nhat-ky.jsonl" + (BAI ? "; đề xuất " + bai.length + " bài dạy -> ra/bai-day.json" : ""));
console.log("Bước tiếp: node tools/hoc/de-xuat.mjs --vao tools/hoi-gemini/ra/nhat-ky.jsonl --ra tools/hoi-gemini/ra");
