// Truy hồi kiến thức: tìm mục liên quan nhất trong kho bằng TF-IDF cosine.
// Port từ retriever.py (hành vi giống hệt).
//
// Có cộng điểm học được từ phản hồi (learner.feedback): token nào từng được sửa
// đúng về thực thể nào thì lần sau ưu tiên thực thể đó.
import { CITY_TO_PROVINCE, OLD_TO_NEW, normText, sameProvince, tokens } from "./normalize.js";
import { Tfidf } from "./tfidf.js";

export class Retriever {
  constructor(kb) {
    this.kb = kb;
    this.texts = [];
    for (const e of kb) {
      // Chỉ lập chỉ mục trên dữ liệu gốc của mục. Phần "Bối cảnh" do wiki
      // thêm vào ghi_chu chỉ để HIỂN THỊ (composer), không đưa vào chỉ
      // mục — nếu không văn bản bách khoa làm loãng cosine, câu hỏi ngắn
      // (vd "Mua gì ở Sapa?") tụt dưới ngưỡng trả lời.
      let ghi = String(e.ghi_chu || "");
      ghi = ghi.split(" | Bối cảnh (")[0];
      const text = [e.ten, e.tinh, e.dia_chi, e.gia, e.gio]
        .map((v) => String(v || ""))
        .join(" ") + " " + ghi;
      this.texts.push(tokens(text));
    }
    this.tfidf = new Tfidf().fit(this.texts);
    this.vecs = this.texts.map((t) => this.tfidf.transform(t));
    this.boosts = new Map(); // "token\0chi_so_muc" -> điểm cộng (học từ phản hồi)
  }

  search(query, topn = 3, loai = null, expandOld = false, province = null) {
    let feats = tokens(query);
    const qn = normText(query); // chuỗi đã chuẩn hóa, để khớp tên nguyên vẹn
    // Hỏi tỉnh cũ/thành phố thì cũng khớp mục của tỉnh mới (vd Quy Nhơn -> Gia Lai).
    // Chỉ bật khi lọc theo loại (món/chỗ ở/chi phí), vì mục địa danh đã ghi
    // tên cũ trong mô tả; bật luôn sẽ làm mục tổng quan tỉnh mới lấn mục điểm.
    if (expandOld) {
      for (const [old, nw] of Object.entries(OLD_TO_NEW)) {
        if (qn.includes(normText(old))) feats = feats.concat(tokens(nw));
      }
      for (const [city, prov] of Object.entries(CITY_TO_PROVINCE)) {
        if (qn.includes(normText(city))) feats = feats.concat(tokens(prov));
      }
    }
    // Thành phố trong câu hỏi: tính 1 lần, không lặp 76 thành phố x 1945 mục
    const citiesInQ = [];
    for (const c of Object.keys(CITY_TO_PROVINCE)) {
      if (qn.includes(normText(c))) citiesInQ.push(c);
    }
    const qvec = this.tfidf.transform(feats);
    const qtok = new Set(feats);
    const scored = [];
    for (let i = 0; i < this.vecs.length; i++) {
      if (loai !== null && this.kb[i].loai !== loai) continue;
      // Neo theo tỉnh: món/chỗ ở/chi phí phải cùng tỉnh người hỏi
      if (province !== null && !sameProvince(this.kb[i].tinh, province)) continue;
      let s = Tfidf.cosine(qvec, this.vecs[i]);
      // cộng điểm khi tên mục khớp nhiều token câu hỏi
      const nameTok = new Set(tokens(this.kb[i].ten || ""));
      if (nameTok.size) {
        let inter = 0;
        for (const t of nameTok) if (qtok.has(t)) inter++;
        s += 1.5 * inter / nameTok.size;
      }
      // cộng điểm lớn khi tên điểm (bỏ phần trong ngoặc) xuất hiện nguyên vẹn trong câu hỏi
      const rawName = (this.kb[i].ten || "").split("(")[0].trim();
      const rawNorm = normText(rawName);
      if (rawName && rawNorm && qn.includes(rawNorm)) s += 2.0;
      // cộng điểm khi TOÀN BỘ token tên điểm đều có trong câu hỏi
      // (vd "côn đảo" trong "côn đảo nằm ở đâu" thắng "cồn cỏ" dù gần giống)
      if (nameTok.size && [...nameTok].every((t) => qtok.has(t))) s += 2.5;
      // cộng điểm khi mục nhắc đúng thành phố/khu người hỏi (vd món Phú Quốc
      // trong kho món An Giang — cùng tỉnh nhưng phải ưu tiên đúng khu).
      // LƯU Ý (giữ y bản Python): texts[i] là MẢNG token nên normText(city)
      // có dấu cách ("quy nhon") không bao giờ khớp phần tử nào; chỉ thành
      // phố 1 từ (Pleiku, Huế, Vinh) mới được cộng điểm này.
      for (const city of citiesInQ) {
        if (this.texts[i].includes(normText(city))) { s += 2.0; break; }
      }
      for (const t of qtok) s += this.boosts.get(t + "\0" + i) || 0;
      if (s > 0) scored.push([s, i]);
    }
    // sort() của Python trên tuple (điểm, chỉ số) giảm dần: điểm bằng nhau
    // thì chỉ số lớn hơn đứng trước — giữ đúng thứ tự hòa này.
    scored.sort((a, b) => b[0] - a[0] || b[1] - a[1]);
    return scored.slice(0, topn).map(([s, i]) => [s, this.kb[i]]);
  }

  indexOf(entryName) {
    for (let i = 0; i < this.kb.length; i++) {
      if (String(this.kb[i].ten || "").trim() === String(entryName).trim()) return i;
    }
    return -1;
  }
}
