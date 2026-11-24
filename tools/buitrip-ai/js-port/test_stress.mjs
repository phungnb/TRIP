#!/usr/bin/env node
/* Stress-test Suite cho trợ lý AI BuiTrip (Tầng 4 — spec Phần I).
 * Chạy: node test_stress.mjs   (trong tools/buitrip-ai/js-port/)
 * Thoát 0 khi tất cả đạt, 1 khi có ca rớt (để CI bắt).
 * Kiểm song song với tools/buitrip-ai/test_stress.py — kết quả
 * phải khớp từng ca (parity Python <-> JS).
 */
import fs from "fs";
import { BuiTripAI } from "./learner.js";

function check(name, cond, detail) {
  console.log((cond ? "PASS " : "FAIL ") + name + (detail && !cond ? " — " + detail : ""));
  return !!cond;
}

function freshAI() {
  const kb = JSON.parse(fs.readFileSync("kb.json", "utf-8"));
  const model = JSON.parse(fs.readFileSync("ai-model.json", "utf-8"));
  const extra = JSON.parse(fs.readFileSync("extra.json", "utf-8"));
  return new BuiTripAI(kb, model, extra);
}

const results = [];

// ST-01
{
  const ai = freshAI();
  const r = ai.ask("Đi Đà Lạt 3 ngày 2 đêm cho 2 người tầm 5 triệu, thích yên tĩnh đi đâu ăn gì?");
  const s = r.slots;
  results.push(check("ST-01 province Lâm Đồng", s.province === "Lâm Đồng", String(s.province)));
  results.push(check("ST-01 people=2", s.people === 2, String(s.people)));
  results.push(check("ST-01 days=3", s.days === 3, String(s.days)));
  results.push(check("ST-01 budget=5000000", s.budget_vnd === 5000000, String(s.budget_vnd)));
  results.push(check("ST-01 vibe yen-tinh", s.vibe_tags.includes("yen-tinh"), JSON.stringify(s.vibe_tags)));
  results.push(check("ST-01 intents có chi_phi+di_dau+an_gi",
    ["chi_phi", "di_dau", "an_gi"].every((x) => s.intents.includes(x)), JSON.stringify(s.intents)));
  results.push(check("ST-01 đủ 3 khối (Chi phí/Điểm đến/Món ăn)",
    r.answer.includes("💰") && r.answer.includes("🌲") && r.answer.includes("🍲"), r.answer.slice(0, 120)));
}

// ST-02
{
  const ai = freshAI();
  const r = ai.ask("choi gi o vung tau 2 ngay tu sai gon");
  const s = r.slots;
  results.push(check("ST-02 province TP.HCM", s.province === "TP Hồ Chí Minh", String(s.province)));
  results.push(check("ST-02 origin TP.HCM", s.origin === "TP Hồ Chí Minh", String(s.origin)));
  results.push(check("ST-02 days=2", s.days === 2, String(s.days)));
  results.push(check("ST-02 đủ 3 intents di_dau/lich_trinh/di_chuyen",
    ["di_dau", "lich_trinh", "di_chuyen"].every((x) => s.intents.includes(x)), JSON.stringify(s.intents)));
}

// ST-03
{
  const ai = freshAI();
  ai.ask("Ở Huế ăn gì ngon?");
  const r = ai.ask("Quán nào mở khuya sau 22h?");
  const s = r.slots;
  results.push(check("ST-03 lượt 2 giữ province Huế", s.province === "Huế", String(s.province)));
  results.push(check("ST-03 time_filter after 22.0",
    s.time_filter && s.time_filter.type === "after" && s.time_filter.hour === 22.0,
    JSON.stringify(s.time_filter)));
}

// ST-04
{
  const ai = freshAI();
  const r = ai.ask("Từ Hà Nội đi Tam Đảo bằng tàu hỏa hết bao nhiêu?");
  results.push(check("ST-04 phát hiện bẫy (premise no_train)",
    r.premise && r.premise.type === "no_train", JSON.stringify(r.premise)));
  results.push(check("ST-04 câu đính chính lên đầu câu trả lời",
    r.answer.startsWith("Tam Đảo hiện không có tuyến tàu hỏa"), r.answer.slice(0, 80)));
}

// ST-05
{
  const ai = freshAI();
  const r = ai.ask("Chùa Hương ở Ninh Bình mở cửa mấy giờ?");
  results.push(check("ST-05 phát hiện bẫy (premise wrong_province)",
    r.premise && r.premise.type === "wrong_province", JSON.stringify(r.premise)));
  results.push(check("ST-05 đính chính Hà Nội trước giờ mở cửa",
    r.answer.startsWith("Chùa Hương thuộc địa phận Hà Nội"), r.answer.slice(0, 80)));
}

const nPass = results.filter(Boolean).length;
console.log(`\nKết quả: ${nPass}/${results.length} đạt`);
fs.writeFileSync("test_stress_result.json", JSON.stringify({ pass: nPass, total: results.length }));
process.exit(nPass === results.length ? 0 : 1);
