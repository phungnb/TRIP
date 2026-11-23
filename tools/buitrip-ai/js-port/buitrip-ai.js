// Entry cho BuiTrip AI bản JS — dùng trong app (script cổ điển qua bundle)
// lẫn node (ES module).
//
// load(kbJson, modelJson, extraJson): nạp 3 object JSON ĐÃ PARSE SẴN
// (phía app tự fetch/lazy-load, module này KHÔNG fetch) và trả về đối tượng
// BuiTripAI có ask(q) -> {answer, intent, confidence, entity, score} và
// feedback(q, intent, entityName). answer là TEXT thuần (không HTML);
// phía app tự escape + hiển thị.
import { BuiTripAI } from "./learner.js";

export { BuiTripAI };

// Singleton dùng chung cho app: load 1 lần rồi ask/feedback nhiều lần.
let _ai = null;

export function load(kbJson, modelJson, extraJson) {
  _ai = new BuiTripAI(kbJson, modelJson, extraJson);
  return _ai;
}

export function ask(q) {
  if (!_ai) throw new Error("BuiTripAI chưa load: gọi BuiTripAI.load(kb, model, extra) trước.");
  return _ai.ask(q);
}

export function feedback(q, intent, entityName) {
  if (!_ai) throw new Error("BuiTripAI chưa load: gọi BuiTripAI.load(kb, model, extra) trước.");
  return _ai.feedback(q, intent, entityName);
}

// Trình duyệt: expose window.BuiTripAI = {load, ask, feedback} (như bundle).
if (typeof window !== "undefined") {
  window.BuiTripAI = { load, ask, feedback };
}
