// Sinh buitrip-ai-bundle.js: gộp 6 module ES thành 1 file script cổ điển
// (<script src>, không ES module, không bundler) cho app BuiTrip.
//
// Cách gộp: nối các module theo đúng thứ tự phụ thuộc, BỎ các dòng import,
// BỎ tiền tố `export `, bọc tất cả trong 1 IIFE, expose duy nhất
// window.BuiTripAI = {load, ask, feedback}.
// Chạy: node build-bundle.mjs  (trong thư mục js-port/)
// Kiểm: xem cuối file buitrip-ai-bundle.js (lệnh node -e ghi trong comment).
import fs from "node:fs";

const MODULES = [
  "normalize.js",
  "tfidf.js",
  "naive-bayes.js",
  "retriever.js",
  "composer.js",
  "learner.js",
];

function stripModule(src, name) {
  const lines = src.split("\n");
  const out = [];
  for (const line of lines) {
    if (/^\s*import\s+.*from\s+["'].*["']\s*;?\s*$/.test(line)) continue;
    if (/^\s*import\s+["'].*["']\s*;?\s*$/.test(line)) continue;
    if (/^export\s+\{[^}]*\}\s*;?\s*$/.test(line)) continue; // export { ... };
    out.push(line.replace(/^export\s+/, ""));
  }
  return `// ===== ${name} =====\n` + out.join("\n").trim() + "\n";
}

const parts = MODULES.map((m) => stripModule(fs.readFileSync(m, "utf-8"), m));

const wiring = `
// ===== Nối vào app: singleton load/ask/feedback =====
let __ai = null;
function load(kbJson, modelJson, extraJson) {
  __ai = new BuiTripAI(kbJson, modelJson, extraJson);
  return __ai;
}
function ask(q) {
  if (!__ai) throw new Error("BuiTripAI chưa load: gọi BuiTripAI.load(kb, model, extra) trước.");
  return __ai.ask(q);
}
function feedback(q, intent, entityName) {
  if (!__ai) throw new Error("BuiTripAI chưa load: gọi BuiTripAI.load(kb, model, extra) trước.");
  return __ai.feedback(q, intent, entityName);
}
// Chỉ expose 1 tên duy nhất; chạy được cả trình duyệt (window) lẫn node (globalThis).
const __root = typeof window !== "undefined" ? window : globalThis;
__root.BuiTripAI = { load, ask, feedback };
`;

const header = `// BuiTrip AI local — bản gộp 1 file cho app (script cổ điển, không ES module).
// Sinh tự động từ 6 module ES (normalize/tfidf/naive-bayes/retriever/composer/
// learner) bằng: node build-bundle.mjs — KHÔNG sửa tay file này, sửa module
// gốc rồi chạy lại lệnh trên. Không dependency, không network, không API key.
// Cách dùng trong app (app tự fetch/lazy-load 3 JSON rồi truyền object đã parse):
//   <script src="ai/buitrip-ai-bundle.js"></script>
//   <script>
//     const ai = BuiTripAI.load(kbJson, modelJson, extraJson);
//     const r = BuiTripAI.ask("vé Bà Nà Hills bao nhiêu");
//     // r = {answer, intent, confidence, entity, score}; answer là TEXT thuần.
//     BuiTripAI.feedback("Lăng Bác mấy giờ mở cửa", "gio_mo_cua", "Lăng Chủ tịch Hồ Chí Minh (Lăng Bác)");
//   </script>
`;

const checkComment = `
// Kiểm nhanh bằng node (trong thư mục js-port/):
// node -e "const fs=require('fs');eval(fs.readFileSync('buitrip-ai-bundle.js','utf8'));const ai=BuiTripAI.load(JSON.parse(fs.readFileSync('../kb.json','utf8')),JSON.parse(fs.readFileSync('../ai-model.json','utf8')),JSON.parse(fs.readFileSync('extra.json','utf8')));console.log(JSON.stringify(ai.ask('vé Bà Nà Hills bao nhiêu'),null,2))"
// Kỳ vọng: intent "gia_ve", entity chứa "Bà Nà", answer bắt đầu "Vé Bà Nà Hills".
`;

const bundle = header + "\n(function () {\n'use strict';\n" + parts.join("\n") + wiring + "})();\n" + checkComment;
fs.writeFileSync("buitrip-ai-bundle.js", bundle, "utf-8");
console.log(`OK buitrip-ai-bundle.js: ${bundle.length} ký tự (${(bundle.length / 1024).toFixed(1)} KB)`);
