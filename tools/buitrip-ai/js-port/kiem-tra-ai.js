// Kiểm chứng bản JS của BuiTrip AI so với bản Python.
// Chạy: node kiem-tra-ai.js  (trong thư mục js-port/)
// Nạp ../ai-model.json + ../kb.json + extra.json rồi:
//   1) chạy 24 câu REAL_QUESTIONS (copy y hệt từ evaluate.py),
//   2) đo độ phủ 175 câu thật trong ../cau-hoi-that-vn.json
//      (đạt khi confidence >= 0.9 và score >= 0.3).
// Số chuẩn bản Python (đo 24/11/2026, model.json + kho-kien-thuc.json 2.319 mục):
//   intent 24/24, entity 24/24, độ phủ 102/175 (58,3%).
// (Trước đó 157/175 — tăng 1 sau khi gộp 348 mục đã dịch.)
import fs from "node:fs";
import { load } from "./buitrip-ai.js";
import { normText } from "./normalize.js";

const REAL_QUESTIONS = [
  ["quy nhơn đi bằng gì", "cach_di", "Quy Nhơn"],
  ["từ TP.HCM đi Quy Nhơn bằng gì", "cach_di", "Quy Nhơn"],
  ["đi Quy Nhơn tháng mấy đẹp", "mua_dep", "Quy Nhơn"],
  ["Quy Nhơn có sân bay không", "cach_di", "Quy Nhơn"],
  ["Quy Nhơn có ga tàu không", "cach_di", "Quy Nhơn"],
  ["ăn gì ở Quy Nhơn", "an", "Quy Nhơn"],
  ["ở đâu ở Quy Nhơn", "o", "Quy Nhơn"],
  ["vé Bà Nà Hills bao nhiêu", "gia_ve", "Bà Nà"],
  ["vé Núi Bà Đen bao nhiêu", "gia_ve", "Núi Bà Đen"],
  ["vé Hội An bao nhiêu", "gia_ve", "Hội An"],
  ["đi Phú Quốc bằng gì", "cach_di", "Phú Quốc"],
  ["đi Phú Quốc tháng mấy đẹp", "mua_dep", "Phú Quốc"],
  ["đi Côn Đảo bằng gì", "cach_di", "Côn Đảo"],
  ["đi Lý Sơn bằng gì", "cach_di", "Lý Sơn"],
  ["đi Nam Du bằng gì", "cach_di", "Nam Du"],
  ["đi Măng Đen bằng gì", "cach_di", "Măng Đen"],
  ["đi Sơn Đoòng bằng gì", "cach_di", "Sơn Đoòng"],
  ["Lăng Bác mấy giờ mở cửa", "gio_mo_cua", "Lăng"],
  ["đi Quy Nhơn 2 ngày 1 đêm hết bao nhiêu", "chi_phi", "Quy Nhơn"],
  ["đi Quy Nhơn cần mang gì", "mang_gi", "Quy Nhơn"],
  ["Quy Nhơn khác Gia Lai như thế nào", "so_sanh", "Quy Nhơn"],
  ["Bình Định nay thuộc tỉnh nào", "tinh_cu", "Bình Định"],
  ["vé Eo Gió bao nhiêu", "gia_ve", "Eo Gió"],
  ["cuối tuần nên đi đâu", "chung_chung", null],
];

const PY_INTENT = "24/24";
const PY_ENTITY = "24/24";
const PY_COVERAGE = "102/175 (58,3%)";

function main() {
  const kb = JSON.parse(fs.readFileSync("../kb.json", "utf-8"));
  const model = JSON.parse(fs.readFileSync("../ai-model.json", "utf-8"));
  const extra = JSON.parse(fs.readFileSync("./extra.json", "utf-8"));
  const ai = load(kb, model, extra);
  console.log(`KB: ${kb.length} mục | intents: ${model.labels.length} | vocab: ${model.vocab.length}`);

  console.log("1) CÂU HỎI THẬT (24 câu):");
  let nIntent = 0;
  let nEntity = 0;
  for (const [q, expIntent, expEnt] of REAL_QUESTIONS) {
    const r = ai.ask(q);
    const okI = r.intent === expIntent;
    // Thực thể đúng nếu tên mục HOẶC câu trả lời nhắc đúng điểm/tỉnh
    // (giống evaluate.py — so theo chuỗi đã chuẩn hóa).
    const okE = entityOk(r, expEnt);
    nIntent += okI ? 1 : 0;
    nEntity += okE ? 1 : 0;
    console.log(
      `- [${okI ? "OK " : "SAI"} intent=${r.intent} (${r.confidence}) | ${okE ? "OK " : "SAI"} entity=${r.entity}] ${q}`,
    );
    console.log(`  -> ${r.answer.slice(0, 220)}`);
  }
  console.log(`TỔNG 24 câu: intent đúng ${nIntent}/24, entity đúng ${nEntity}/24 (Python: ${PY_INTENT}, ${PY_ENTITY})`);

  const qs = JSON.parse(fs.readFileSync("../cau-hoi-that-vn.json", "utf-8"));
  let ok = 0;
  const miss = [];
  for (const item of qs) {
    const r = ai.ask(item.q);
    if (r.confidence >= 0.9 && r.score >= 0.3) ok++;
    else miss.push([item.q.slice(0, 80), r.confidence, r.score, r.intent]);
  }
  console.log(`\n2) ĐỘ PHỦ 175 câu thật: ${ok}/${qs.length} = ${((ok / qs.length) * 100).toFixed(1)}% (Python: ${PY_COVERAGE})`);
  if (miss.length) {
    console.log(`   Chưa đạt (${miss.length} câu):`);
    for (const [q, c, s, intent] of miss) console.log(`   - [conf=${c} score=${s} intent=${intent}] ${q}`);
  }

  const allOk = nIntent === 24 && nEntity === 24 && ok === 102;
  console.log(`\nKẾT LUẬN: ${allOk ? "KHỚP BẢN PYTHON (24/24 intent, 24/24 entity, 102/175 phủ)" : "LỆCH SO VỚI BẢN PYTHON — xem các câu SAI ở trên"}`);
}

function entityOk(r, expEnt) {
  if (expEnt === null) return true;
  const want = normText(expEnt);
  if (r.entity && normText(r.entity).includes(want)) return true;
  if (normText(r.answer).includes(want)) return true;
  return false;
}

main();
