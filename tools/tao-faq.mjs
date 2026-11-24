/* Sinh câu hỏi thường gặp cho máy tìm kiếm từ một nguồn duy nhất: BT_FAQ trong app/ai/hoi-dap.js.
   Ghi 2 nơi: faq-aeo-cam-nang-du-lich.json (gốc repo) và khối JSON-LD FAQPage trong app/index.html.
   {PLACE}, {DISH} được thay bằng số đếm thật sau khi nạp đủ dữ liệu (giống app/js/faq.js).
   Chạy lại mỗi khi sửa hoi-dap.js hoặc thêm/bớt địa danh, món:  node tools/tao-faq.mjs
   Kiểm tra còn khớp:                                            node tools/tao-faq.mjs --kiem */
import fs from "node:fs";
import vm from "node:vm";
import { napDuLieu } from "../tests/nap-du-lieu.mjs";

const GOC = new URL("../", import.meta.url);
const HOI = new URL("app/ai/hoi-dap.js", GOC);
const JSON_F = new URL("faq-aeo-cam-nang-du-lich.json", GOC);
const HTML_F = new URL("app/index.html", GOC);
const TEN = "Câu hỏi thường gặp — Cẩm nang du lịch tự túc 34 tỉnh thành";
const RE_LD = /<script type="application\/ld\+json">\{"@context":"https:\/\/schema.org","@type":"FAQPage".*?<\/script>/;

export function taoFaq() {
  const { PROV } = napDuLieu();
  let nP = 0, nD = 0;
  PROV.forEach(p => { nP += p.places.length; nD += p.dishes.length; });
  const ctx = {};
  vm.createContext(ctx);
  vm.runInContext(fs.readFileSync(HOI, "utf8") + ";this.F=BT_FAQ;", ctx);
  const fill = s => s.replace(/\{PLACE\}/g, nP.toLocaleString("vi-VN")).replace(/\{DISH\}/g, nD.toLocaleString("vi-VN"));
  const obj = {
    "@context": "https://schema.org", "@type": "FAQPage", name: TEN,
    mainEntity: ctx.F.flatMap(g => g.items.map(it => ({ "@type": "Question", name: fill(it.q), acceptedAnswer: { "@type": "Answer", text: fill(it.a) } })))
  };
  const json = JSON.stringify(obj, null, 2) + "\n";
  const ld = '<script type="application/ld+json">' + JSON.stringify(obj) + "</script>";
  const html = fs.readFileSync(HTML_F, "utf8");
  if (!RE_LD.test(html)) throw new Error("Không thấy khối JSON-LD FAQPage trong app/index.html");
  return { json, html: html.replace(RE_LD, () => ld), soCau: obj.mainEntity.length, nP, nD };
}

if (import.meta.url === `file://${process.argv[1]}`) {
  const r = taoFaq();
  if (process.argv.includes("--kiem")) {
    const lech = [];
    if (fs.readFileSync(JSON_F, "utf8") !== r.json) lech.push("faq-aeo-cam-nang-du-lich.json");
    if (fs.readFileSync(HTML_F, "utf8") !== r.html) lech.push("app/index.html (JSON-LD FAQPage)");
    if (lech.length) { console.log("FAQ lệch hoi-dap.js: " + lech.join(", ") + ". Chạy: node tools/tao-faq.mjs"); process.exit(1); }
    console.log("FAQ khớp hoi-dap.js: " + r.soCau + " câu");
  } else {
    fs.writeFileSync(JSON_F, r.json);
    fs.writeFileSync(HTML_F, r.html);
    console.log("Đã ghi FAQ " + r.soCau + " câu (" + r.nP + " địa danh, " + r.nD + " món)");
  }
}
