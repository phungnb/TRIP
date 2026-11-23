// BuiTrip AI local — bản gộp 1 file cho app (script cổ điển, không ES module).
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

(function () {
'use strict';
// ===== normalize.js =====
// Chuẩn hóa tiếng Việt cho BuiTrip AI — port từ normalize.py (hành vi giống hệt).
//
// Quy tắc bắt buộc (đã kiểm chứng bằng lỗi thật): đổi đ->d TRƯỚC khi tách dấu NFD,
// vì Đ/đ không tách ra bằng NFD — không đổi trước thì "đất" thành "at", "Đại" thành "ai".

// Viết tắt hay gặp trong câu hỏi thật trên diễn đàn (qn = Quy Nhơn...).
// Đổi TRƯỚC khi tách token để mọi bước (phân loại, truy hồi) đều hiểu.
const ALIASES = {
  qn: "quy nhon", hn: "ha noi", sg: "sai gon",
  hcm: "tp ho chi minh", dn: "da nang", dl: "da lat",
  pq: "phu quoc", nt: "nha trang", hg: "ha giang",
  cb: "cao bang", lc: "lao cai", hp: "hai phong",
};

// Thành phố/khu du lịch -> tỉnh mới (để "ăn gì ở Quy Nhơn" tìm đúng món Gia Lai).
// Khóa là tên hiển thị (có dấu); lúc khớp phải qua normText().
const CITY_TO_PROVINCE = {
  "Quy Nhơn": "Gia Lai", "Pleiku": "Gia Lai", "An Khê": "Gia Lai",
  "Nha Trang": "Khánh Hòa", "Cam Ranh": "Khánh Hòa",
  "Đà Lạt": "Lâm Đồng", "Bảo Lộc": "Lâm Đồng", "Phan Thiết": "Lâm Đồng",
  "Mũi Né": "Lâm Đồng", "La Gi": "Lâm Đồng",
  "Hội An": "Đà Nẵng", "Đà Nẵng": "Đà Nẵng",
  "Huế": "Huế", "Quảng Trị": "Quảng Trị", "Đồng Hới": "Quảng Trị",
  "Phong Nha": "Quảng Trị", "Sa Pa": "Lào Cai", "Lào Cai": "Lào Cai",
  "Hạ Long": "Quảng Ninh", "Cát Bà": "Hải Phòng", "Hải Phòng": "Hải Phòng",
  "Hà Nội": "Hà Nội", "TP Hồ Chí Minh": "TP Hồ Chí Minh",
  "Sài Gòn": "TP Hồ Chí Minh", "Vũng Tàu": "TP Hồ Chí Minh",
  "Cần Giờ": "TP Hồ Chí Minh", "Củ Chi": "TP Hồ Chí Minh",
  "Phú Quốc": "An Giang", "Rạch Giá": "An Giang", "Hà Tiên": "An Giang",
  "Nam Du": "An Giang", "Châu Đốc": "An Giang", "Long Xuyên": "An Giang",
  "Côn Đảo": "TP Hồ Chí Minh", "Phú Quý": "Lâm Đồng",
  "Măng Đen": "Quảng Ngãi", "Kon Tum": "Quảng Ngãi", "Lý Sơn": "Quảng Ngãi",
  "Quảng Ngãi": "Quảng Ngãi",
  "Buôn Ma Thuột": "Đắk Lắk", "Đắk Lắk": "Đắk Lắk", "Tuy Hòa": "Đắk Lắk",
  "Phan Rang": "Khánh Hòa", "Ninh Thuận": "Khánh Hòa",
  "Cần Thơ": "Cần Thơ", "Cà Mau": "Cà Mau", "Sóc Trăng": "Cần Thơ",
  "Bến Tre": "Vĩnh Long", "Mỹ Tho": "Đồng Tháp", "Cao Lãnh": "Đồng Tháp",
  "Sa Đéc": "Đồng Tháp", "Trà Vinh": "Vĩnh Long", "Vĩnh Long": "Vĩnh Long",
  "Tây Ninh": "Tây Ninh", "Biên Hòa": "Đồng Nai", "Vinh": "Nghệ An",
  "Thanh Hóa": "Thanh Hóa", "Sầm Sơn": "Thanh Hóa",
  "Ninh Bình": "Ninh Bình", "Tam Cốc": "Ninh Bình",
  "Hà Giang": "Tuyên Quang", "Đồng Văn": "Tuyên Quang",
  "Cao Bằng": "Cao Bằng", "Điện Biên": "Điện Biên",
  "Mộc Châu": "Sơn La", "Sơn La": "Sơn La",
  "Thái Nguyên": "Thái Nguyên", "Lạng Sơn": "Lạng Sơn",
  "Bắc Giang": "Bắc Ninh", "Bắc Ninh": "Bắc Ninh",
  "Hải Dương": "Hải Phòng", "Hưng Yên": "Hưng Yên",
  "Vĩnh Phúc": "Phú Thọ", "Phú Thọ": "Phú Thọ",
  "Hòa Bình": "Phú Thọ", "Thái Bình": "Hưng Yên",
};

// Tỉnh cũ -> tỉnh mới sau sáp nhập 01/07/2025 (từ data_gen.py).
const OLD_TO_NEW = {
  "Bình Định": "Gia Lai", "Quảng Bình": "Quảng Trị", "Hà Giang": "Tuyên Quang",
  "Kiên Giang": "An Giang", "Bà Rịa-Vũng Tàu": "TP Hồ Chí Minh",
  "Đắk Nông": "Lâm Đồng", "Kon Tum": "Quảng Ngãi", "Phú Yên": "Đắk Lắk",
  "Ninh Thuận": "Khánh Hòa", "Bến Tre": "Vĩnh Long", "Tiền Giang": "Đồng Tháp",
  "Long An": "Tây Ninh", "Hậu Giang": "Cần Thơ", "Sóc Trăng": "Cần Thơ",
  "Bình Dương": "TP Hồ Chí Minh", "Bình Phước": "Đồng Nai",
  "Thái Bình": "Hưng Yên", "Bắc Kạn": "Thái Nguyên", "Vĩnh Phúc": "Phú Thọ",
  "Quảng Nam": "Đà Nẵng", "Bình Thuận": "Lâm Đồng",
};

const ALIAS_RE = Object.entries(ALIASES).map(
  ([short, full]) => [new RegExp(`\\b${short}\\b`, "g"), full],
);

// Chuẩn hóa tên tỉnh để so sánh: bỏ 'thành phố/tp', chỉ giữ token lõi.
function provKey(s) {
  const toks = normText(s || "").split(" ").filter((t) => t !== "" && t !== "thanh" && t !== "pho" && t !== "tp");
  return toks.join(" ");
}

// Tỉnh trong kho có phải tỉnh người hỏi không (so theo token lõi).
function sameProvince(tinhEntry, provNorm) {
  if (!tinhEntry || !provNorm) return false;
  const a = provKey(tinhEntry);
  const b = provKey(provNorm);
  return a === b || a.includes(b) || b.includes(a);
}

function normText(s) {
  let out = (s || "").toLowerCase().replace(/đ/g, "d");
  out = out.normalize("NFD").replace(/\p{Mn}/gu, "");
  out = out.replace(/[^a-z0-9 ]+/g, " ");
  out = out.replace(/\s+/g, " ").trim();
  for (const [re, full] of ALIAS_RE) out = out.replace(re, full);
  return out;
}

// Token + bigram (giúp khớp 'quy nhon', 'ba na', 'sapa'...).
function tokens(s) {
  const t = normText(s).split(" ").filter(Boolean);
  const feats = [...t];
  for (let i = 0; i + 1 < t.length; i++) feats.push(`${t[i]}_${t[i + 1]}`);
  return feats;
}

// ===== tfidf.js =====
// TF-IDF thuần JS — port từ tfidf.py (hành vi giống hệt).
//
// Dùng cho truy hồi mục kiến thức liên quan nhất trong kho.
// Vector là Map (giữ đúng thứ tự chèn như dict Python) để phép cộng
// cosine cho ra đúng từng bit như bản Python.
class Tfidf {
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

// ===== naive-bayes.js =====
// Multinomial Naive Bayes thuần JS — port từ naive_bayes.py.
//
// Khác bản Python ở 1 điểm duy nhất: bản này NẠP mô hình đã huấn luyện sẵn
// từ ai-model.json (labels, log_prior, unk, vocab mảng, log_prob mảng 14 hàng
// theo đúng thứ tự vocab — xem prune_model.py), thay vì fit() lại từ dữ liệu
// train (không ship train.jsonl trong app). Công thức predict giống hệt:
// cộng log_prior + log_prob từng feature (token lạ -> unk), softmax trừ max.
class NaiveBayes {
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

// ===== retriever.js =====
// Truy hồi kiến thức: tìm mục liên quan nhất trong kho bằng TF-IDF cosine.
// Port từ retriever.py (hành vi giống hệt).
//
// Có cộng điểm học được từ phản hồi (learner.feedback): token nào từng được sửa
// đúng về thực thể nào thì lần sau ưu tiên thực thể đó.

class Retriever {
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

// ===== composer.js =====
// Ghép câu trả lời từ (ý định + thực thể + dữ liệu thật).
// Port từ composer.py (hành vi giống hệt).
//
// Luật bắt buộc (giống bản AI dùng Gemini, nhưng ở đây code thực thi, không phải prompt):
// 1. Giá/giờ/tên riêng CHỈ lấy từ dữ liệu truy hồi được. Không có thì nói không có.
// 2. Cấm thay dữ liệu tỉnh khác cho vùng người dùng hỏi.
// 3. Thiếu dữ liệu -> câu dự phòng 3 phần: nói thẳng chưa có + hướng dẫn cách khác
//    cụ thể + gợi ý 2-3 câu gần nhất app trả lời được.
//
// Khác bản Python ở 1 điểm: EXTRA (kien-thuc-bo-sung.json) không đọc từ file
// trong module này nữa mà nhận qua tham số `extra` của compose() — phía app
// tự fetch/lazy-load rồi truyền vào qua BuiTripAI.load(kb, model, extra).

function clean(v) {
  return (v == null ? "" : String(v)).trim();
}

// Cắt ghi chú ở ranh giới từ + dấu …, không cắt giữa từ
// (lỗi cũ: ghi_chu.slice(0, 160) cắt "nên thử một lần ch", "cho quán Ph").
function cut(s, n) {
  s = clean(s || "");
  if (s.length <= n) return s;
  const t = s.slice(0, n).replace(/\s\S*$/, "");
  return (t || s.slice(0, n)) + "…";
}

// Thành phố người hỏi nhắc tới (khớp nguyên từ, lấy tên dài nhất):
// vd "ăn gì ở Quy Nhơn" -> "quy nhon". Trả "" nếu không nhắc thành phố nào.
function cityInQuery(query) {
  const qn = " " + normText(query) + " ";
  let best = "";
  for (const city of Object.keys(CITY_TO_PROVINCE)) {
    const nc = normText(city);
    if (qn.includes(" " + nc + " ") && nc.length > best.length) best = nc;
  }
  return best;
}

function hasPrice(e) {
  const g = clean(e.gia);
  return g !== "" && !g.toLowerCase().includes("chưa kiểm");
}

// Hỏi tỉnh cũ/thành phố thì hiện tên cũ cho người đọc dễ hiểu
// (vd khu Quy Nhơn (Gia Lai), khu Bình Định (Gia Lai)).
function displayPlace(query, tinh) {
  const qn = normText(query);
  for (const [old, nw] of Object.entries(OLD_TO_NEW)) {
    if (qn.includes(normText(old))) return `khu ${old} (${nw})`;
  }
  for (const [city, prov] of Object.entries(CITY_TO_PROVINCE)) {
    if (qn.includes(normText(city))) return `khu ${city} (${prov})`;
  }
  return tinh;
}

function fallbackNoData(name, field) {
  return (
    `App chưa có thông tin ${field} của ${name}.\n` +
    `Bạn kiểm theo cách này: xem web của Ban quản lý ${name} hoặc gọi trực ` +
    `tiếp quầy vé — giá/giờ hay đổi theo mùa nên tra trực tiếp là chuẩn nhất.\n` +
    `Gần nhất app trả lời được, bạn thử hỏi: ` +
    `"${name} có gì chơi", "đi ${name} bằng gì", "${name} mùa nào đẹp".`
  );
}

function capitalize(s) {
  // str.capitalize() của Python: chữ đầu hoa, còn lại thường.
  return s.charAt(0).toUpperCase() + s.slice(1);
}

// entries: list [[score, entry], ...] đã truy hồi. Trả về câu trả lời tiếng Việt.
function compose(intent, entries, query, historyEntities, extra) {
  const top = entries.length ? entries[0][1] : null;
  const score = entries.length ? entries[0][0] : 0.0;

  const name = top ? top.ten || "" : "";
  const tinh = top ? top.tinh || "" : "";
  const gia = top ? clean(top.gia) : "";
  const gio = top ? clean(top.gio) : "";
  const mua = top ? clean(top.mua_dep) : "";
  const note = top ? cut(top.ghi_chu, 300) : "";

  // Món/chỗ ở/chi phí: trả theo danh sách đã lọc theo tỉnh, KHÔNG chặn bởi
  // ngưỡng điểm truy hồi (mục dài làm cosine loãng) — nhánh tự xử khi không có.
  if (intent === "an" || intent === "o") {
    const kind = intent === "an" ? "món ăn" : "chỗ ở";
    const want = intent === "an" ? "mon_an" : "cho_o";
    const got = entries.filter(([, e]) => e.loai === want).map(([, e]) => e);
    if (got.length) {
      // Món/chỗ ở ở khu nào thì món của khu đó lên trước (vd hỏi Quy Nhơn
      // thì bún chả cá Quy Nhơn lên trước món Pleiku) — cùng tỉnh, chỉ đổi
      // thứ tự hiển thị, không đổi thực thể trả về.
      const city = cityInQuery(query);
      if (city) {
        got.sort((a, b) => {
          const ka = normText((a.ten || "") + " " + (a.ghi_chu || "")).includes(city) ? 0 : 1;
          const kb = normText((b.ten || "") + " " + (b.ghi_chu || "")).includes(city) ? 0 : 1;
          return ka - kb;
        });
      }
      const lines = [];
      for (const e of got.slice(0, 5)) {
        let line = `- ${e.ten}`;
        if (clean(e.gia)) line += ` (${e.gia})`;
        if (clean(e.ghi_chu)) line += `: ${cut(e.ghi_chu, 160)}`;
        lines.push(line);
      }
      return (
        `${capitalize(kind)} ở ${displayPlace(query, tinh)} (theo dữ liệu app + tìm Google 23/11/2026):\n` +
        lines.join("\n") +
        "\nGiá có thể đổi; kiểm lại khi đặt."
      );
    }
    return (
      `App chưa có danh sách ${kind} riêng đã kiểm chứng cho ${tinh}. ` +
      `Bạn xem tab Ăn gì / Ở đâu trên trang ${tinh} trong app, hoặc hỏi ` +
      `mình theo điểm cụ thể — vd "ăn gì ở Quy Nhơn" thì mình gợi ý theo ` +
      `điểm đã có trong kho.`
    );
  }

  if (intent === "chi_phi") {
    const got = entries.filter(([, e]) => e.loai === "chi_phi").map(([, e]) => e);
    if (got.length) {
      return (
        `Chi phí đi ${displayPlace(query, got[0].tinh)} (ước tính theo dữ liệu app, ` +
        `kiểm 06/11/2026 — giá tùy thời điểm đặt):\n${got[0].ghi_chu}`
      );
    }
    if (top !== null && hasPrice(top)) {
      return (
        `Chi phí tham quan ${name} (${tinh}): vé ${gia}. Vé máy bay/xe ` +
        "tùy điểm xuất phát và ngày đi nên app chưa có giá cố định — " +
        "bạn tra vé tới sân bay/ga gần nhất rồi cộng thêm."
      );
    }
    return fallbackNoData(tinh || name, "chi phí chuyến đi");
  }

  // Không tìm thấy gì đáng tin -> dự phòng 3 phần
  if (top === null || score < 0.08) {
    return (
      "App chưa có thông tin này.\n" +
      "Bạn tra thêm theo cách này: nếu là giá vé/giờ mở cửa thì xem web của " +
      "Ban quản lý điểm đó hoặc gọi trực tiếp quầy vé (giá hay đổi theo mùa); " +
      "nếu là cách đi thì tra chặng tới sân bay/ga gần nhất trên web hãng bay, " +
      "hãng tàu hoặc bến xe.\n" +
      "Gần nhất app trả lời được, bạn thử hỏi: \"đi Quy Nhơn bằng gì\", " +
      "\"vé Bà Nà Hills bao nhiêu\", \"đi Phú Quốc tháng mấy đẹp\"."
    );
  }

  if (intent === "gia_ve") {
    let ans;
    if (hasPrice(top)) {
      ans = `Vé ${name} (${tinh}): ${gia}.`;
    } else if (gia) {
      ans = `Vé ${name} (${tinh}): ${gia} — giá này app chưa kiểm chứng được, ` +
        "bạn hỏi lại tại quầy trước khi đi.";
    } else {
      return fallbackNoData(name, "giá vé");
    }
    if (gio) ans += ` Giờ mở cửa: ${gio}.`;
    return ans + " Giá, giờ có thể đổi; kiểm lại trước khi đi.";
  }

  if (intent === "gio_mo_cua") {
    if (gio) {
      return `${name} (${tinh}) mở cửa: ${gio}.` + (gia ? ` Vé: ${gia}.` : "");
    }
    // Giờ đôi khi nằm trong ô giá (vd Lăng Bác: "Miễn phí. Giờ: mùa nóng...")
    if (gia && gia.toLowerCase().includes("giờ")) {
      const idx = gia.toLowerCase().indexOf("giờ");
      return `${name} (${tinh}): ${gia.slice(idx, idx + 220)}`;
    }
    return fallbackNoData(name, "giờ mở cửa");
  }

  if (intent === "mua_dep") {
    // Mùa theo vùng cũ đã kiểm chứng — ưu tiên hơn mùa cấp tỉnh trong kho
    const qn = normText(query);
    for (const m of extra.mua_dep_vung_cu || []) {
      const region = m.vung.split("(")[0].trim();
      if (normText(region) && qn.includes(normText(region))) {
        return `Đi ${m.vung} đẹp nhất: ${m.mua} Lưu ý: ${m.sai_can_tranh || ""}`;
      }
    }
    if (mua) return `Đi ${name} (${tinh}) đẹp nhất: ${mua}.`;
    return fallbackNoData(name, "mùa đẹp");
  }

  if (intent === "tinh_cu") {
    const qn = normText(query);
    for (const [old, nw] of Object.entries(OLD_TO_NEW)) {
      if (qn.includes(normText(old))) {
        return (
          `${old} cũ nay thuộc tỉnh ${nw} (sáp nhập từ 01/07/2025). ` +
          `Trên app, bạn tìm điểm chơi theo tên ${nw}, nhưng các điểm ` +
          `thuộc khu ${old} cũ vẫn giữ tên cũ trong mô tả để dễ tìm.`
        );
      }
    }
    return (
      "Tỉnh bạn hỏi vẫn giữ nguyên, không sáp nhập đợt 01/07/2025 — hoặc " +
      "app chưa có dữ liệu sáp nhập cho tên này. Bạn cho mình tên tỉnh cụ " +
      "thể nhé."
    );
  }

  if (intent === "cach_di") {
    // Ưu tiên bảng tuyến đi đã kiểm chứng
    for (const t of extra.tuyen_di || []) {
      if (query.toLowerCase().includes(t.den.toLowerCase()) || name.toLowerCase().includes(t.den.toLowerCase())) {
        return `Đi ${t.den}: ${t.cach} (Nguồn kiểm chứng: ${t.nguon}.)`;
      }
    }
    if (note) return `Cách đi ${name} (${tinh}): ${note}`;
    return fallbackNoData(name, "cách đi");
  }

  if (intent === "diem_choi") {
    if (note) return `${name} (${tinh}): ${note}`;
    return `${name} (${tinh}) là điểm đến thuộc ${tinh}.`;
  }

  if (intent === "vi_tri") {
    const addr = clean(top.dia_chi);
    if (addr) return `${name} nằm ở ${addr} (${tinh}).`;
    return `${name} nằm ở ${tinh}.` + (note ? ` ${note}` : "");
  }

  if (intent === "lich_trinh") {
    return (
      `Gợi ý lịch trình ${name} (${tinh}): ngày 1 tham quan điểm chính, ` +
      `ngày 2 đi điểm lân cận. ${mua ? "Mùa đẹp: " + mua + "." : ""}` +
      " Lịch chi tiết theo số ngày của bạn — cho mình biết đi mấy ngày nhé."
    );
  }

  if (intent === "mang_gi") {
    return (
      "Đi chơi biển/đảo mang: đồ bơi, kem chống nắng, mũ, nước uống, dép " +
      "đi cát, áo khoác mỏng buổi tối. Đi núi mang: giày leo, áo mưa mỏng, " +
      "đèn pin. Cụ thể theo điểm, bạn cho mình biết đi đâu nhé."
    );
  }

  if (intent === "so_sanh") {
    // So sánh 2 mục truy hồi được: mục 1 vs mục 2 (vd Quy Nhơn biển vs Pleiku núi)
    if (entries.length >= 2) {
      const a = entries[0][1];
      const b = entries[1][1];
      const na = a.ten || "";
      const nb = b.ten || "";
      const da = clean(a.ghi_chu).slice(0, 200);
      const db = clean(b.ghi_chu).slice(0, 200);
      return (
        "So sánh theo dữ liệu app:\n" +
        `- ${na} (${a.tinh}): ${da}\n` +
        `- ${nb} (${b.tinh}): ${db}\n` +
        "Muốn so kỹ hơn (mùa đẹp, chi phí, cách đi), bạn nói rõ 2 điểm muốn so nhé."
      );
    }
    return (
      `So sánh theo dữ liệu app: ${name} (${tinh}). ` +
      `${note} Cho mình biết 2 điểm cụ thể muốn so thì mình so chi tiết hơn.`
    );
  }

  if (intent === "chung_chung") {
    return (
      "Cuối tuần 2 ngày thì hợp đi gần: Quy Nhơn, Đà Lạt, Phú Quốc, Hạ Long " +
      "đều đi được. Bạn đi từ đâu, đi mấy ngày, ngân sách khoảng bao nhiêu? " +
      "Cho mình 3 ý đó là mình gợi ý lịch cụ thể."
    );
  }

  // Mặc định: trả thông tin chung của mục tìm được
  const bits = [`${name} (${tinh})`];
  if (gia) bits.push(`vé: ${gia}`);
  if (gio) bits.push(`giờ: ${gio}`);
  if (mua) bits.push(`mùa đẹp: ${mua}`);
  if (note) bits.push(note);
  return bits.join(". ") + ".";
}

// ===== learner.js =====
// BuiTrip AI local — bộ não: học, nhớ, trả lời, tự học từ phản hồi.
// Port từ learner.py (hành vi giống hệt).
//
// Không gọi API nào, không cần mạng, không cần key. Chạy hoàn toàn bằng JS thuần.
// - load(kb, model, extra): nạp kho + mô hình NB đã huấn luyện + dữ liệu EXTRA.
// - ask(): phân loại ý định -> truy hồi kiến thức -> ghép câu trả lời (composer).
// - feedback(): người dùng sửa sai -> cộng điểm truy hồi cho token của tên
//   thực thể đúng (chỉ token tên điểm, KHÔNG token câu hỏi).
//
// Khác bản Python ở 1 điểm: bản Python feedback() huấn luyện lại NB từ
// train.jsonl rồi lưu model.json. Bản JS không ship train.jsonl nên KHÔNG
// huấn luyện lại — chỉ cộng boosts (phần này mới là thứ làm lần hỏi sau
// trả đúng thực thể). Boosts lưu vào localStorage (trình duyệt) hoặc giữ
// trong bộ nhớ (node) — không cần file model.

const STORAGE_KEY = "buitrip_ai_boosts";

function round3(x) {
  // round(x, 3) của Python (làm tròn nửa chẵn) vs Math.round (nửa lên):
  // chỉ lệch nhau ở đúng ngưỡng .0005 — giá trị confidence/score thực tế
  // gần như không bao giờ rơi đúng ngưỡng đó.
  return Math.round(x * 1000) / 1000;
}

function boostKey(token, idx) {
  return token + "\0" + idx;
}

class BuiTripAI {
  constructor(kb, model, extra) {
    this.kb = kb;
    this.extra = extra || {};
    this.retriever = new Retriever(kb);
    this.nb = new NaiveBayes().loadFromModel(model);
    // Boosts học từ phản hồi (model.boosts: [[token, chi_so_muc, diem], ...]).
    this.boosts = new Map();
    for (const [t, i, v] of model.boosts || []) this.boosts.set(boostKey(t, i), v);
    this.retriever.boosts = this.boosts; // cùng 1 Map để feedback cập nhật ngay
    this.historyEntities = [];
    // Tên tỉnh mới (từ kho) để nhận diện tỉnh trong câu hỏi
    const provs = new Set();
    for (const e of kb) {
      if (e.tinh && !e.loai) provs.add(provKey(e.tinh));
    }
    this.provinces = [...provs].sort();
    this._loadStoredBoosts();
  }

  // Trả về tên tỉnh mới (dạng chuẩn hóa) nếu câu hỏi nhắc 1 tỉnh/tỉnh cũ/thành phố.
  provinceOf(q) {
    const qn = normText(q);
    for (const [old, nw] of Object.entries(OLD_TO_NEW)) {
      if (qn.includes(normText(old))) return nw;
    }
    for (const [city, prov] of Object.entries(CITY_TO_PROVINCE)) {
      if (qn.includes(normText(city))) return prov;
    }
    for (const prov of this.provinces) {
      if (prov && qn.includes(prov)) return prov;
    }
    return null;
  }

  ask(q) {
    const feats = tokens(q);
    const [intent, probs] = this.nb.predict(feats);
    const conf = probs[intent] || 0.0;
    // Câu hỏi tiếp nối ("thế...", "còn...", "từ đó...") -> dùng thực thể vừa nhắc
    const qn = normText(q);
    const follow =
      qn.startsWith("the ") || qn.startsWith("con ") || qn.startsWith("tu do ") ||
      qn.startsWith("the con ") || qn.startsWith("o do ") ||
      qn.slice(0, 12).includes("the ");
    let entries = this.retriever.search(q, 3);
    if (intent === "an" || intent === "o" || intent === "chi_phi") {
      // Món/chỗ ở/chi phí PHẢI neo theo tỉnh người hỏi, không lấy top chung chung
      const loai = { an: "mon_an", o: "cho_o", chi_phi: "chi_phi" }[intent];
      const prov = this.provinceOf(q);
      const anchored = this.retriever.search(q, 5, loai, true, prov);
      if (anchored.length) entries = anchored;
    }
    if (follow && this.historyEntities.length && (!entries.length || entries[0][0] < 0.3)) {
      // Truy hồi lại bằng tên thực thể vừa nhắc
      entries = this.retriever.search(this.historyEntities[this.historyEntities.length - 1], 3);
    }
    if ((intent === "gia_ve" || intent === "gio_mo_cua" || intent === "vi_tri" ||
         intent === "cach_di" || intent === "mua_dep" || intent === "diem_choi") &&
        entries.length && entries[0][1].loai) {
      // Hỏi về địa danh mà top hit lại là món/chỗ ở cùng tên
      // (vd "vé Hội An" ra "Cao lầu Hội An" thay vì "Phố cổ Hội An"):
      // ưu tiên mục địa danh (không có loai) trong top 3.
      for (let j = 1; j < entries.length; j++) {
        if (!entries[j][1].loai) {
          entries = [entries[j], ...entries.slice(0, j), ...entries.slice(j + 1)];
          break;
        }
      }
    }
    const answer = compose(intent, entries, q, this.historyEntities, this.extra);
    let entity = entries.length ? entries[0][1].ten || null : null;
    if (intent === "cach_di") {
      // Thực thể đúng là ĐIỂM ĐẾN trong bảng tuyến, không phải điểm xuất phát
      for (const t of this.extra.tuyen_di || []) {
        if (normText(q).includes(normText(t.den))) {
          entity = t.den;
          break;
        }
      }
    }
    if (entries.length) {
      this.historyEntities.push(entries[0][1].ten || "");
      this.historyEntities = this.historyEntities.slice(-3);
    }
    // Tỉnh của mục trả về (để app gắn nút "Mở cẩm nang"): lấy từ mục đầu,
    // không lấy từ tên thực thể (tên thành phố như "Quy Nhơn" không phải
    // tên mục trong kho nên tra tên sẽ không ra tỉnh).
    const entityProv = entries.length ? entries[0][1].tinh || null : null;
    return {
      answer,
      intent,
      confidence: round3(conf),
      entity,
      entity_prov: entityProv,
      score: entries.length ? round3(entries[0][0]) : 0.0,
    };
  }

  // Sửa sai: chỉ tăng điểm cho token trong TÊN ĐIỂM (vd 'lăng', 'bác') —
  // tăng token chung trong câu hỏi (vd 'mấy', 'giờ', 'mở', 'cửa') sẽ làm
  // điểm đó lấn mọi câu hỏi khác có chung từ đó (lỗi cũ đã sửa ở bản Python).
  feedback(q, correctIntent, correctEntityName) {
    if (correctEntityName) {
      const idx = this.retriever.indexOf(correctEntityName);
      if (idx >= 0) {
        for (const t of new Set(tokens(correctEntityName))) {
          const k = boostKey(t, idx);
          this.boosts.set(k, (this.boosts.get(k) || 0) + 0.35);
        }
      }
    }
    this._saveStoredBoosts();
    return true;
  }

  // --- Lưu/đọc boosts đã học (trình duyệt: localStorage; node: bỏ qua) ---
  _loadStoredBoosts() {
    try {
      if (typeof localStorage === "undefined") return;
      const raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) return;
      for (const [t, i, v] of JSON.parse(raw)) this.boosts.set(boostKey(t, i), v);
    } catch (e) { /* bộ nhớ trình duyệt bị chặn/không có — học trong phiên thôi */ }
  }

  _saveStoredBoosts() {
    try {
      if (typeof localStorage === "undefined") return;
      const arr = [...this.boosts.entries()].map(([k, v]) => {
        const sep = k.lastIndexOf("\0");
        return [k.slice(0, sep), Number(k.slice(sep + 1)), v];
      });
      localStorage.setItem(STORAGE_KEY, JSON.stringify(arr));
    } catch (e) { /* lưu không được thì thôi, boosts vẫn có trong bộ nhớ */ }
  }
}

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
})();

// Kiểm nhanh bằng node (trong thư mục js-port/):
// node -e "const fs=require('fs');eval(fs.readFileSync('buitrip-ai-bundle.js','utf8'));const ai=BuiTripAI.load(JSON.parse(fs.readFileSync('../kb.json','utf8')),JSON.parse(fs.readFileSync('../ai-model.json','utf8')),JSON.parse(fs.readFileSync('extra.json','utf8')));console.log(JSON.stringify(ai.ask('vé Bà Nà Hills bao nhiêu'),null,2))"
// Kỳ vọng: intent "gia_ve", entity chứa "Bà Nà", answer bắt đầu "Vé Bà Nà Hills".
