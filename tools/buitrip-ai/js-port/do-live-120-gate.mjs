import fs from "node:fs";
import { load } from "./buitrip-ai.js";
const kb = JSON.parse(fs.readFileSync("../kb.json", "utf-8"));
const model = JSON.parse(fs.readFileSync("../ai-model.json", "utf-8"));
const extra = JSON.parse(fs.readFileSync("./extra.json", "utf-8"));
const bank = JSON.parse(fs.readFileSync("/tmp/live-120.json", "utf-8"));
const ai = load(kb, model, extra);
const norm = (s) => (s || "").toLowerCase().replace(/đ/g, "d").normalize("NFD").replace(/[\u0300-\u036f]/g, "");
let passGate = 0, passGateWrong = 0, passGateRight = 0;
for (const c of bank.cau) {
  const r = ai.ask(c.q);
  const gate = r.confidence >= 0.9 && r.score >= 0.3;
  if (!gate) continue;
  passGate++;
  const ans = norm(r.answer);
  const ok = c.phaiCo ? c.phaiCo.some((p) => ans.includes(norm(p))) : true;
  if (ok) passGateRight++;
  else { passGateWrong++; console.log("GATE-PASS NHUNG SAI:", c.q, "| phaiCo:", c.phaiCo, "| entity:", r.entity, "| conf:", r.confidence, "| score:", r.score); }
}
console.log(`Qua cong tu tin (conf>=0.9, score>=0.3): ${passGate}/120; trong do dung ${passGateRight}, SAI ${passGateWrong}`);
