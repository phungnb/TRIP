// Đo engine JS với 120 câu đã kiểm live của app (tests/hypotheses/live-120.json).
// Đạt: câu trả lời chứa ít nhất 1 chuỗi phaiCo (so chuẩn hóa, không dấu).
// Câu không có phaiCo: chỉ tính đạt khi engine tự tin (conf>=0.9, score>=0.3).
import fs from "node:fs";
import { load } from "./buitrip-ai.js";

const kb = JSON.parse(fs.readFileSync("../kb.json", "utf-8"));
const model = JSON.parse(fs.readFileSync("../ai-model.json", "utf-8"));
const extra = JSON.parse(fs.readFileSync("./extra.json", "utf-8"));
const bank = JSON.parse(fs.readFileSync("/tmp/live-120.json", "utf-8"));
const ai = load(kb, model, extra);
const norm = (s) => (s || "").toLowerCase().replace(/đ/g, "d")
  .normalize("NFD").replace(/[\u0300-\u036f]/g, "");
let dat = 0, miss = [];
for (const c of bank.cau) {
  const r = ai.ask(c.q);
  const ans = norm(r.answer);
  const ok = c.phaiCo
    ? c.phaiCo.some((p) => ans.includes(norm(p)))
    : (r.confidence >= 0.9 && r.score >= 0.3);
  if (ok) dat++;
  else miss.push({ q: c.q, nhom: c.nhom, phaiCo: c.phaiCo || null,
                   conf: r.confidence, score: r.score, intent: r.intent,
                   entity: r.entity, ans: r.answer.slice(0, 160) });
}
console.log(`LIVE-120: ${dat}/120 = ${(dat / 120 * 100).toFixed(1)}%`);
for (const m of miss) console.log("MISS:", JSON.stringify(m, null, 0).slice(0, 400));
