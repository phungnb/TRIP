// Multinomial Naive Bayes thuần JS — port từ naive_bayes.py.
//
// Khác bản Python ở 1 điểm duy nhất: bản này NẠP mô hình đã huấn luyện sẵn
// từ ai-model.json (labels, log_prior, unk, vocab mảng, log_prob mảng 14 hàng
// theo đúng thứ tự vocab — xem prune_model.py), thay vì fit() lại từ dữ liệu
// train (không ship train.jsonl trong app). Công thức predict giống hệt:
// cộng log_prior + log_prob từng feature (token lạ -> unk), softmax trừ max.
export class NaiveBayes {
  constructor() {
    this.labels = [];
    this.logPrior = {};
    this.logProb = []; // mảng hàng, mỗi hàng là mảng số theo đúng thứ tự vocab
    this.unk = {};
    this.vocabIndex = new Map();
  }

  // model: object ai-model.json đã parse.
  loadFromModel(model) {
    this.labels = model.labels;
    this.logPrior = model.log_prior;
    this.unk = model.unk;
    this.logProb = model.log_prob;
    this.vocabIndex = new Map(model.vocab.map((t, i) => [t, i]));
    return this;
  }

  // feats: mảng token (giữ nguyên trùng lặp như Python — mỗi lần xuất hiện
  // đều cộng điểm). Trả về [nhãn tốt nhất, dict nhãn -> xác suất chuẩn hóa].
  predict(feats) {
    const scores = {};
    for (let li = 0; li < this.labels.length; li++) {
      const lab = this.labels[li];
      let s = this.logPrior[lab];
      const row = this.logProb[li];
      const unk = this.unk[lab];
      for (const f of feats) {
        const idx = this.vocabIndex.get(f);
        s += idx === undefined ? unk : row[idx];
      }
      scores[lab] = s;
    }
    // max() của Python trả về nhãn ĐẦU TIÊN đạt max (labels đã xếp a-z) —
    // so sánh > nghiêm ngặt để giữ đúng nhãn đầu tiên khi hòa.
    let best = this.labels[0];
    let mx = scores[best];
    for (const lab of this.labels) {
      if (scores[lab] > mx) { mx = scores[lab]; best = lab; }
    }
    const exps = {};
    let z = 0;
    for (const lab of this.labels) {
      exps[lab] = Math.exp(scores[lab] - mx);
      z += exps[lab];
    }
    z = z || 1.0;
    const probs = {};
    for (const lab of this.labels) probs[lab] = exps[lab] / z;
    return [best, probs];
  }
}
