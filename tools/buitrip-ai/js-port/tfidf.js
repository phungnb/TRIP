// TF-IDF thuần JS — port từ tfidf.py (hành vi giống hệt).
//
// Dùng cho truy hồi mục kiến thức liên quan nhất trong kho.
// Vector là Map (giữ đúng thứ tự chèn như dict Python) để phép cộng
// cosine cho ra đúng từng bit như bản Python.
export class Tfidf {
  constructor() {
    this.idf = new Map();
    this.vocab = new Set();
  }

  // docs: mảng, mỗi doc là danh sách feature (token/bigram).
  fit(docs) {
    const n = docs.length;
    const df = new Map();
    for (const d of docs) {
      for (const t of new Set(d)) df.set(t, (df.get(t) || 0) + 1);
    }
    this.vocab = new Set(df.keys());
    for (const [t, c] of df) this.idf.set(t, Math.log((n + 1) / (c + 1)) + 1.0);
    return this;
  }

  transform(feats) {
    const tf = new Map();
    for (const f of feats) tf.set(f, (tf.get(f) || 0) + 1);
    const vec = new Map();
    for (const [t, c] of tf) {
      if (this.idf.has(t)) vec.set(t, (1 + Math.log(c)) * this.idf.get(t));
    }
    let norm = 0;
    for (const v of vec.values()) norm += v * v;
    norm = Math.sqrt(norm) || 1.0;
    for (const [t, v] of vec) vec.set(t, v / norm);
    return vec;
  }

  static cosine(a, b) {
    if (a.size > b.size) [a, b] = [b, a];
    let s = 0;
    for (const [t, v] of a) s += v * (b.get(t) || 0);
    return s;
  }
}
