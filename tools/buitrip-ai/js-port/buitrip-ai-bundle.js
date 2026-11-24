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

// Tên (vd 'Sa Pa', 'Sơn Đoòng') có trong câu hỏi không — so cả dạng
// viết liền ('sapa') vì câu hỏi thật hay viết liền tên 2 chữ (gặp
// 24/11/2026: 'đi sapa bằng gì' không khớp bảng tuyến vì 'sa pa' có
// dấu cách còn câu hỏi viết liền).
function nameInQ(name, q) {
  const qn = normText(q);
  const nn = normText(name);
  return qn.includes(nn) || qn.replace(/ /g, "").includes(nn.replace(/ /g, ""));
}

// Dạng viết liền của tên tỉnh/thành 2 chữ ("sapa" = "sa pa"): câu hỏi thật
// hay viết liền; tách ra trong tokens() để khớp với dữ liệu (kho ghi "Sa Pa").
// Chỉ tách khi token ĐÚNG bằng dạng viết liền của 1 tên có thật — không tách
// "la", "an", "du" đứng riêng (chúng là từ thường).
const JOINED_PLACE = {};
for (const nm of [...Object.keys(CITY_TO_PROVINCE), ...Object.values(CITY_TO_PROVINCE), ...Object.keys(OLD_TO_NEW), ...Object.values(OLD_TO_NEW)]) {
  const t = normText(nm).split(" ").filter(Boolean);
  if (t.length > 1) JOINED_PLACE[t.join("")] = t;
}

// Token + bigram (giúp khớp 'quy nhon', 'ba na', 'sapa'...).
function tokens(s) {
  const t = normText(s).split(" ").filter(Boolean);
  // Tách tên viết liền ("sapa" -> "sa", "pa") để khớp dữ liệu.
  const exp = [];
  for (const tok of t) exp.push(...(JOINED_PLACE[tok] || [tok]));
  const feats = [...exp];
  for (let i = 0; i + 1 < exp.length; i++) feats.push(`${exp[i]}_${exp[i + 1]}`);
  return feats;
}

// Từ hỏi/chức năng + từ theo ý định + loại địa danh chung + tính từ chung.
// Dùng để tìm "token cụ thể" trong câu hỏi (luật chặn khớp giả, 24/11/2026):
// token nào còn lại sau khi bỏ các từ này và tên tỉnh/thành phố thì là thứ
// cụ thể người hỏi nhắc đích danh (vd "quốc lộ 51" còn lại "quoc lo 51").
// Bỏ sót 1 từ ở đây thì câu đó chỉ thành "chung chung" (không chặn) — an toàn;
// bỏ thừa 1 từ thì câu đó có thể bị chặn nhầm -> rơi về trợ lý cũ (cũng an toàn).
const QUESTION_WORDS = new Set([
  // Từ chức năng / từ hỏi chung
  "co", "o", "la", "cua", "va", "voi", "nao", "gi", "may", "gio", "mo",
  "bao", "nhieu", "the", "cho", "den", "tu", "di", "ve", "tren", "duoi",
  "trong", "ngoai", "nay", "kia", "do", "ay", "thi", "ma", "se", "da",
  "dang", "hay", "hoac", "neu", "khi", "vi", "de", "bang", "cach",
  "sao", "con", "vay", "roi", "dau", "luc", "thoi", "nua", "khong",
  "ko", "duoc",
  // Từ xưng hô / nhờ vả / từ nối hay gặp trong câu hỏi diễn đàn
  "du", "het", "nen", "nhu", "cung", "ca", "tat", "em", "anh", "ban",
  "minh", "ta", "bac", "cac", "nguoi", "xin", "hoi", "nho", "giup",
  "van", "tour", "combo", "lai",
  // Từ đệm trong câu hỏi diễn đàn (thêm 24/11/2026 — không có chúng,
  // "e xin ít đc ăn ngon ở qn" và "cho mh hỏi côn đảo nằm ở đâu" bị
  // chặn nhầm vì còn token đệm; CỐ TÌNH không thêm "ba"/"tam"/"xem"/
  // "gui"/"c" — chúng sẽ mở chặn cho mảnh bình luận không rõ chỗ,
  // và "tam" là token tên "Tam Cốc"/"Tam Đảo")
  "e", "mh", "a", "vs", "dc", "it", "nhung", "ad", "nam",
  "hien", "phai", "kinh", "nghiem", "review", "z", "khu",
  // Giới từ hướng/thời gian hay gặp ("vào tháng mấy", "ra đảo", "lên núi")
  "vao", "ra", "len", "xuong", "qua",
  // Từ theo ý định (giá/giờ/mùa/cách đi/ăn/ở/điểm chơi/lịch trình/chi phí/...)
  "gia", "ve", "gio", "mo", "cua", "dong", "mua", "dep", "thang",
  "cach", "di", "bang", "an", "diem", "choi", "lich", "trinh", "chi",
  "phi", "mang", "so", "sanh", "tinh", "cu", "vi", "tri", "chung",
  "tham", "quan", "dia", "danh", "den", "lai", "thue", "xe", "may",
  "taxi", "grab", "dat", "phong", "khach", "san", "homestay", "resort",
  "nha", "nghi", "luu", "tru", "ngu", "sang", "toi", "hang", "dac",
  "san", "mon", "ngon", "uong",
  // Loại địa danh chung (không phải tên riêng): biển, núi, thác, chùa...
  "bien", "nui", "thac", "ho", "chua", "dao", "lang", "bai", "den",
  "hang", "cho", "suoi", "doi", "deo", "cau", "bao", "tang", "check",
  "in", "song", "ao", "tich", "hon",
  // Loại tuyến đường chung ("quốc lộ", "tỉnh lộ" — số hiệu mới là
  // thứ cụ thể: "Quốc lộ 14" còn lại "14", khác "Quốc lộ 51" còn "51")
  "quoc", "lo",
  // Tính từ chung (ngon/rẻ/đẹp/nổi tiếng...) — không phải tên riêng
  "ngon", "re", "dat", "dep", "noi", "tieng", "nhat", "tot", "xau",
  "rong", "hep", "cao", "thap", "dai", "ngan", "lon", "nho", "moi",
  "trua", "chieu", "dem", "ngay", "tuan", "som", "muon", "nhanh", "cham", "de", "kho",
  "tien", "loi", "gan", "xa", "thuan",
  // Từ phương tiện chung — CỐ TÌNH KHÔNG có "ga"/"tau"/"bay" (gỡ
  // 24/11/2026): "vé máy bay Quy Nhơn bao nhiêu" bị trả giá của
  // quán Jollibee vì "bay" thành từ chung nên luật chặn không chạy;
  // còn "Quy Nhơn có ga tàu/sân bay không" đã được bảng tuyến EXTRA
  // cứu (luật chặn cho qua khi điểm đến có trong bảng tuyến).
  // "lao" (cù lao — từ chung chỉ cù lao, vd "Cù Lao Xanh" khớp nhầm
  // "Cù lao Mây" chỉ nhờ cụm "cu lao" — gặp 24/11/2026; "Lào Cai"
  // không ảnh hưởng vì tên tỉnh/thành được bỏ ra khỏi token cụ thể
  // theo tên, còn namedInQuestion so token thô nên vẫn khớp)
  "lao",
]);

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
      // Tên phụ trong ngoặc cũng là tên gọi thật (vd "(Hồ Gươm)",
      // "(Cầu Vàng)"): khớp nguyên vẹn hoặc đủ token thì cộng như
      // tên chính (gặp 24/11/2026: "Hồ Gươm ở đâu" ra "Hồ Dầu Tiếng",
      // "Cầu Vàng giá bao nhiêu" ra "Cầu Rồng" vì chỉ xét tên trước ngoặc).
      const pm = (this.kb[i].ten || "").match(/\(([^)]*)\)/);
      if (pm) {
        const alias = normText(pm[1]);
        if (alias && qn.includes(alias)) s += 2.0;
        const aliasTok = new Set(tokens(pm[1]));
        if (aliasTok.size && [...aliasTok].every((t) => qtok.has(t))) s += 2.5;
      }
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

// Tên thành phố dạng có dấu từ dạng chuẩn hóa (vd 'quy nhon' -> 'Quy Nhơn').
function cityDisplay(cityNorm) {
  for (const city of Object.keys(CITY_TO_PROVINCE)) {
    if (normText(city) === cityNorm) return city;
  }
  return cityNorm;
}

function hasPrice(e) {
  const g = clean(e.gia);
  return g !== "" && !g.toLowerCase().includes("chưa kiểm");
}

// (thành phố, tỉnh) mà câu hỏi nhắc tới, vd ("Sa Pa", "Lào Cai").
// Dùng cho bảng tuyến: bảng chỉ có tuyến tới tỉnh, câu hỏi có thể hỏi
// 1 thành phố trong tỉnh đó. So cả dạng viết liền ("sapa").
function cityProvOfQuery(query) {
  const qn = normText(query);
  const qnNs = qn.replace(/ /g, "");
  let best = null;
  for (const [city, prov] of Object.entries(CITY_TO_PROVINCE)) {
    const nc = normText(city);
    if (qn.includes(nc) || qnNs.includes(nc.replace(/ /g, ""))) {
      if (!best || nc.length > normText(best[0]).length) best = [city, prov];
    }
  }
  if (best) return best;
  for (const [old, nw] of Object.entries(OLD_TO_NEW)) {
    if (qn.includes(normText(old))) return [old, nw];
  }
  return [null, null];
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
      let cityNote = "";
      if (city) {
        got.sort((a, b) => {
          const ka = normText((a.ten || "") + " " + (a.ghi_chu || "")).includes(city) ? 0 : 1;
          const kb = normText((b.ten || "") + " " + (b.ghi_chu || "")).includes(city) ? 0 : 1;
          return ka - kb;
        });
        // Luật chung 24/11/2026: hỏi món/chỗ ở của 1 thành phố mà
        // không mục nào nhắc tới thành phố đó (vd "ăn gì ở An Khê"
        // mà kho chỉ có món Pleiku) thì nói rõ đây là gợi ý cấp
        // tỉnh, không giả vờ là món riêng của thành phố đó.
        if (!got.slice(0, 5).some((e) => normText((e.ten || "") + " " + (e.ghi_chu || "")).includes(city))) {
          cityNote = `\nChưa có danh sách riêng cho ${cityDisplay(city)} trong kho — dưới đây là gợi ý chung của tỉnh ${tinh}.`;
        }
      }
      const lines = [];
      for (const e of got.slice(0, 5)) {
        let line = `- ${e.ten}`;
        if (clean(e.gia)) line += ` (${e.gia})`;
        if (clean(e.ghi_chu)) line += `: ${cut(e.ghi_chu, 160)}`;
        lines.push(line);
      }
      return (
        `${capitalize(kind)} ở ${displayPlace(query, tinh)} (theo dữ liệu app + tìm Google 23/11/2026):${cityNote}\n` +
        lines.join("\n") +
        "\nGiá có thể đổi; kiểm lại khi đặt."
      );
    }
    if (!tinh) {
      return (
        `App chưa có danh sách ${kind} riêng đã kiểm chứng cho nơi này. ` +
        `Bạn hỏi mình theo điểm cụ thể — vd "ăn gì ở Quy Nhơn" thì mình gợi ý theo ` +
        `điểm đã có trong kho.`
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
    return fallbackNoData(tinh || name || "chuyến đi này", "chi phí chuyến đi");
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
    for (const m of extra.mua_dep_vung_cu || []) {
      const region = m.vung.split("(")[0].trim();
      if (normText(region) && nameInQ(region, query)) {
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
      if (nameInQ(t.den, query) || nameInQ(t.den, name)) {
        return `Đi ${t.den}: ${t.cach} (Nguồn kiểm chứng: ${t.nguon}.)`;
      }
    }
    // Hỏi đi 1 thành phố mà bảng chỉ có tuyến tới TỈNH của thành phố
    // đó (vd "đi Sa Pa bằng gì" -> tuyến "Lào Cai", trong cách đi có
    // nhắc Sa Pa): lấy tuyến tỉnh, ghi rõ theo tuyến tới tỉnh.
    const [cityQ, provQ] = cityProvOfQuery(query);
    if (cityQ && provQ) {
      for (const t of extra.tuyen_di || []) {
        if (normText(t.den) === normText(provQ)) {
          return `Đi ${cityQ} (theo tuyến tới ${provQ}): ${t.cach} (Nguồn kiểm chứng: ${t.nguon}.)`;
        }
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

const CITY_NORM = new Set(Object.keys(CITY_TO_PROVINCE).map((c) => normText(c)));

function namedInQuestion(name, featSet) {
  // Tên mục (hoặc phần mô tả trong ngoặc) có đầy đủ trong câu hỏi không.
  // Nới thêm: tên dài mà câu hỏi chỉ nhắc phần đầu (vd "Phù điêu bắt sống
  // phi công Mỹ" thiếu "John McCain") vẫn khớp khi chung >=4 token và >=60%
  // số token tên (gặp 24/11/2026: luật khớp đầy đủ bỏ sót mục này).
  const parts = [(name || "").split("(")[0].trim()];
  const m = (name || "").match(/\(([^)]*)\)/);
  if (m) parts.push(m[1]);
  for (const p of parts) {
    const toks = new Set(tokens(p));
    if (!toks.size) continue;
    if ([...toks].every((t) => featSet.has(t))) return true;
    const shared = [...toks].filter((t) => featSet.has(t)).length;
    if (shared >= 4 && shared / toks.size >= 0.6) return true;
  }
  return false;
}

function isCityOrOverview(name) {
  // Mục chỉ là tên thành phố hoặc mục tổng quan tỉnh.
  const n = normText((name || "").split("(")[0].trim());
  return CITY_NORM.has(n) || normText(name || "").includes("tong quan");
}

function matchesSpecific(entryName, featSet, specific) {
  // Mục có khớp với thứ cụ thể người hỏi không: nhắc đích danh, hoặc
  // chung đủ token cụ thể với tên mục. Dùng cho luật chặn khớp giả.
  // - Mục tổng quan tỉnh/thành phố KHÔNG tính là khớp (vd 'Gia Lai
  //   (tổng quan)' không khớp 'chùa An Lạc' chỉ vì câu hỏi có nhắc
  //   'Gia Lai' — gặp 24/11/2026).
  // - Cụm 2 chữ liên tiếp của tên mục xuất hiện trong câu hỏi (vd tên
  //   'Khu di tích Yên Tử' chứa cụm 'yên tử', 'Quần thể Tràng An' chứa
  //   'tràng an') — câu hỏi nhắc đúng tên đó dù tên đầy đủ dài hơn
  //   (gặp 24/11/2026: 'Tràng An đi tuyến nào đẹp' bị chặn vì tên mục
  //   dài, 'Sapa tháng 1 có tuyết' chỉ khớp nhờ cụm 'sa pa'). Cụm chỉ
  //   tính khi chung ít nhất 1 token với token cụ thể của câu hỏi —
  //   không thì cụm chung chung ('quốc lộ' trong 'Quốc lộ 14' khớp
  //   nhầm 'Quốc lộ 51', cụm tên tỉnh 'đà lạt' trong 'Hotel Dalat'
  //   khớp nhầm 'khách sạn Mặt Trời Đỏ ở Đà Lạt' — gặp 24/11/2026).
  // - Chia sẻ token: luôn cần >=2 token chung VÀ chiếm HƠN nửa số token
  //   nội dung của tên mục (tránh 'Chùa Thái Lạc' khớp nhầm 'chùa An
  //   Lạc' chỉ vì chung 1 chữ 'Lạc' = đúng nửa, 'Bà bán mấy giờ' khớp
  //   nhầm 'Thác Bản Ba' chỉ nhờ chữ 'Ba', và 'Đảo Hòn Tằm' khớp nhầm
  //   'Tam Đảo' chỉ nhờ chữ 'tam' (Tằm ≠ Đảo) — gặp 24/11/2026).
  //   Câu hỏi 1 token thật (vd 'vé Fansipan') khớp qua
  //   namedInQuestion hoặc cụm 2 chữ ở trên, không cần đường này.
  if (isCityOrOverview(entryName)) return false;
  if (namedInQuestion(entryName, featSet)) return true;
  if (!specific.size) return false;
  if (spanMatches(entryName, featSet, specific)) return true;
  const nameToks = new Set(normText((entryName || "").split("(")[0]).split(" ").filter((t) => t && !QUESTION_WORDS.has(t)));
  if (!nameToks.size) return false;
  let shared = 0;
  for (const t of nameToks) if (specific.has(t)) shared++;
  return shared >= 2 && shared / nameToks.size > 0.5;
}

function spanMatches(entryName, featSet, specific) {
  // Cụm 2 chữ liên tiếp của tên mục xuất hiện trong câu hỏi VÀ chung
  // ít nhất 1 token với token cụ thể — khớp mạnh, dùng cho luật đưa mùa
  // (chỉ đưa lên mục đúng tên, không đưa mục khác tỉnh chỉ vì chung
  // 1 chữ — vd 'Đảo Hòn Tằm' không được đưa lên cho 'Tam Đảo' dù
  // chung chữ 'tam' (Tằm ≠ Đảo), gặp 24/11/2026).
  if (!specific.size) return false;
  const nameBigrams = new Set(tokens(entryName || "").filter((t) => t.includes("_")));
  for (const b of nameBigrams) {
    if (featSet.has(b) && b.split("_").some((t) => specific.has(t))) return true;
  }
  return false;
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
    // Tên tỉnh/thành phố/tỉnh cũ (để tìm token cụ thể: chỉ bỏ token
    // của tên nào câu hỏi NHẮC TRỌN TÊN — xem specificTokens).
    this._placeNames = [
      ...Object.keys(CITY_TO_PROVINCE).map((c) => normText(c)),
      ...this.provinces,
      ...Object.entries(OLD_TO_NEW).flatMap(([o, n]) => [normText(o), normText(n)]),
    ];
    this._loadStoredBoosts();
  }

  // Token 'cụ thể' trong câu hỏi: bỏ từ hỏi/chức năng + token của
  // tên tỉnh/thành mà câu hỏi NHẮC TRỌN TÊN. Còn lại rỗng = câu hỏi
  // chung chung (vd 'điểm tham quan ở Huế'). Còn lại không rỗng =
  // câu hỏi nhắc đích danh 1 thứ cụ thể (vd 'Quốc lộ 51' còn lại
  // '51' sau khi bỏ 'quoc','lo' là từ loại đường). Chỉ bỏ token của
  // tên được nhắc trọn tên: 'Hòn Sơn' không nhắc 'Sơn La' nên 'son'
  // vẫn là token cụ thể (trước đây bảng token phẳng nuốt mất 'son'
  // vì nó nằm trong 'Sơn La' — gặp 24/11/2026, 'Hòn Sơn' bị trả
  // 'Hòn Khoai'). So cả dạng viết liền ('sapa') vì câu hỏi thật hay
  // viết liền tên 2 chữ. Số vẫn giữ làm token cụ thể (số hiệu tuyến
  // '14' khác '51').
  specificTokens(q) {
    const qn = normText(q);
    const qnNs = qn.replace(/ /g, "");
    const qnPad = " " + qn + " ";
    const named = new Set();
    for (const nn of this._placeNames) {
      // Khớp theo RANH GIỚI TỪ (dạng viết liền chỉ khi tên >=2 chữ):
      // khớp chuỗi con trần sẽ nuốt token oan — vd tên tỉnh rút gọn
      // "hoa" (Thanh Hóa qua provKey) là chuỗi con của "khoai"
      // (gặp 24/11/2026).
      if (qnPad.includes(" " + nn + " ")
          || (nn.includes(" ") && qnNs.includes(nn.replace(/ /g, "")))) {
        for (const t of nn.split(" ").filter(Boolean)) named.add(t);
        if (nn.split(" ").filter(Boolean).length > 1) named.add(nn.replace(/ /g, ""));
      }
    }
    const out = new Set();
    for (const t of qn.split(" ")) {
      if (t && !QUESTION_WORDS.has(t) && !named.has(t)) out.add(t);
    }
    return out;
  }

  // Trả về tên tỉnh mới (dạng chuẩn hóa) nếu câu hỏi nhắc 1 tỉnh/tỉnh cũ/thành phố.
  // So cả dạng viết liền ("sapa") vì câu hỏi thật hay viết liền tên 2 chữ.
  // Khớp theo RANH GIỚI TỪ, tên dài khớp trước — vì provKey rút
  // "Thanh Hóa" còn "hoa", mà "hoa" là chuỗi con của "khoai" ("Hòn Khoai
  // ở đâu" bị nhận nhầm tỉnh Thanh Hóa, rồi luật tỉnh chặn mất đáp án
  // đúng — gặp 24/11/2026); và "Vinh" là 1 từ trong "Vĩnh Long" nên
  // tên dài "Vĩnh Long" phải thắng tên ngắn "Vinh".
  provinceOf(q) {
    const qn = normText(q);
    const qnNs = qn.replace(/ /g, "");
    const qnPad = " " + qn + " ";
    const hit = (name) => {
      const nn = normText(name);
      if (qnPad.includes(" " + nn + " ")) return true;
      return nn.includes(" ") && qnNs.includes(nn.replace(/ /g, ""));
    };
    const cands = [
      ...Object.entries(OLD_TO_NEW),
      ...Object.entries(CITY_TO_PROVINCE),
      ...this.provinces.filter(Boolean).map((p) => [p, p]),
    ];
    cands.sort((a, b) => normText(b[0]).length - normText(a[0]).length);
    for (const [name, res] of cands) {
      if (hit(name)) return res;
    }
    return null;
  }

  ask(q) {
    const feats = tokens(q);
    let [intent, probs] = this.nb.predict(feats);
    const conf = probs[intent] || 0.0;
    // Câu hỏi tiếp nối ("thế...", "còn...", "từ đó...") -> dùng thực thể vừa nhắc
    const qn = normText(q);
    const follow =
      qn.startsWith("the ") || qn.startsWith("con ") || qn.startsWith("tu do ") ||
      qn.startsWith("the con ") || qn.startsWith("o do ") ||
      qn.slice(0, 12).includes("the ");
    let entries = this.retriever.search(q, 3);
    if (intent === "o" || intent === "an") {
      // "X ở đâu" hỏi vị trí của 1 điểm cụ thể, không phải hỏi chỗ ở.
      // NB hay nhầm sang "o" vì cụm "ở đâu" (gặp 24/11/2026: "Cà phê
      // Tùng Đà Lạt ở đâu" ra homestay, "Phù điêu... ở đâu" ra hostel).
      // NB cũng nhầm sang "an" khi câu hỏi nhắc 1 điểm có tên dài
      // (gặp 24/11/2026 sau retrain: "massage người khiếm thị ở Huế"
      // ra "Ốc Huế" thay vì Massage Niềm Tin). Chỉ sửa khi câu hỏi
      // nhắc đích danh 1 mục không phải chỗ ở, không phải tên thành
      // phố hay mục tổng quan tỉnh — và với "an" thì câu hỏi KHÔNG
      // được hỏi món thật ("ăn gì"/"món"/"ngon").
      const toks = new Set(feats);
      const foodQ = intent === "an" && (toks.has("mon") || toks.has("ngon") || (toks.has("an") && toks.has("gi")));
      if (!foodQ) {
        const featSet = new Set(feats);
        for (let j = 0; j < entries.length; j++) {
          const e = entries[j][1];
          if (e.loai === "cho_o") continue;
          // Hỏi món ("ăn bún chả cá ở Quy Nhơn") thì món đó không phải
          // "điểm ở đâu" — để nguyên ý định an (danh sách món theo tỉnh,
          // món Quy Nhơn lên trước) chứ đừng đổi thành vị trí của 1 món
          // ở tỉnh khác (gặp 24/11/2026: ra "Bún chả cá nằm ở Khánh Hòa").
          if (intent === "an" && (e.loai === "mon_an" || e.loai === "chi_phi")) continue;
          if (namedInQuestion(e.ten, featSet) && !isCityOrOverview(e.ten)) {
            intent = "vi_tri";
            entries = [entries[j], ...entries.slice(0, j), ...entries.slice(j + 1)];
            break;
          }
        }
      }
    }
    if (intent === "an" || intent === "o" || intent === "chi_phi") {
      // Món/chỗ ở/chi phí PHẢI neo theo tỉnh người hỏi, không lấy top chung chung
      const loai = { an: "mon_an", o: "cho_o", chi_phi: "chi_phi" }[intent];
      const prov = this.provinceOf(q);
      if (prov === null) {
        // Không neo được tỉnh (vd "ăn gì ngon" không nêu nơi, hay
        // "ăn gì ở Quốc lộ 51"): đừng liệt kê món/chỗ ở/chi phí bừa
        // của 1 tỉnh bất kỳ — để composer trả câu "chưa có danh
        // sách cho nơi này" (luật chung 24/11/2026).
        entries = [];
      } else {
        // Chỉ lấy đúng danh sách theo tỉnh; tỉnh không có mục loại
        // này thì để trống (composer nói chưa có) chứ không lấy top
        // chung chung rồi ghi nhầm tên tỉnh khác.
        entries = this.retriever.search(q, 5, loai, true, prov);
      }
      if (entries.length) {
        // Câu hỏi nêu 1 món/quán/khách sạn CỤ THỂ (vd "khách sạn
        // Mặt Trời Đỏ ở Đà Lạt", "ăn bún chả cá Quy Nhơn") mà danh
        // sách theo tỉnh không có mục nào khớp -> đừng liệt kê món
        // bừa; để composer trả câu chưa có danh sách (luật chung
        // 24/11/2026). Câu hỏi chỉ nêu tỉnh/thành phố (vd "ăn gì
        // ở Quy Nhơn", "ăn gì ở An Khê") không bị chặn ở đây —
        // token tỉnh/thành đã được specificTokens bỏ ra.
        // Số (vd "2 ngày 1 đêm", "14h", "2N1Đ") không phải thứ cụ thể
        // ở đây — bỏ mọi token bắt đầu bằng số khi kiểm (số hiệu tuyến
        // như "Quốc lộ 14" đã được luật chặn chính xử lý bằng token số,
        // không qua nhánh này).
        const specific = new Set([...this.specificTokens(q)].filter((t) => !/^\d/.test(t)));
        if (specific.size && !entries.some(([, e]) => matchesSpecific(e.ten, new Set(feats), specific))) {
          entries = [];
        }
      }
    }
    if (follow && this.historyEntities.length && (!entries.length || entries[0][0] < 0.3)) {
      // Truy hồi lại bằng tên thực thể vừa nhắc
      entries = this.retriever.search(this.historyEntities[this.historyEntities.length - 1], 3);
    }
    if ((intent === "gia_ve" || intent === "gio_mo_cua" || intent === "vi_tri" ||
         intent === "cach_di" || intent === "mua_dep" || intent === "diem_choi") &&
        entries.length && entries[0][1].loai &&
        !namedInQuestion(entries[0][1].ten, new Set(feats))) {
      // Hỏi về địa danh mà top hit lại là món/chỗ ở cùng tên
      // (vd "vé Hội An" ra "Cao lầu Hội An" thay vì "Phố cổ Hội An"):
      // ưu tiên mục địa danh (không có loai) trong top 3.
      // Nhưng KHÔNG hạ khi người hỏi nhắc đích danh quán/món đó
      // (vd "Bánh Khoái Hạnh Huế giá bao nhiêu" — quán có giá thật,
      // hạ xuống mục tổng quan tỉnh là sai; gặp 24/11/2026).
      for (let j = 1; j < entries.length; j++) {
        if (!entries[j][1].loai) {
          entries = [entries[j], ...entries.slice(0, j), ...entries.slice(j + 1)];
          break;
        }
      }
    }
    if (intent === "mua_dep" && entries.length) {
      // Mùa đẹp là thuộc tính của ĐIỂM, không phải khách sạn/món ăn.
      // Top truy hồi hay toàn khách sạn (không có dữ liệu mùa) trong
      // khi điểm có mùa nằm sâu hơn (vd "Chợ đêm Sa Pa" hạng 5,
      // "Happy Land Mộc Châu" hạng 7, "Vịnh Hạ Long" hạng 25).
      // Tìm sâu top 30, đưa mục địa danh đầu tiên CÓ dữ liệu mùa
      // lên đầu; vùng đã có trong bảng EXTRA thì không cần (câu
      // trả lời lấy từ bảng đó). Không có thì để nguyên (luật
      // chặn bên dưới sẽ chặn, nhường trợ lý cũ).
      const inExtra = (this.extra.mua_dep_vung_cu || []).some((m) => nameInQ(String(m.vung).split("(")[0].trim(), q));
      const top = entries[0][1];
      if (!inExtra && !(top.mua_dep || "").trim()) {
        // Chỉ đưa lên mục KHỚP với câu hỏi: nhắc đích danh, cụm
        // 2 chữ, HOẶC cùng tỉnh với nơi hỏi (mùa là thuộc tính
        // của vùng — vd "Mộc Châu mùa hoa mận": "Happy Land
        // Mộc Châu" có mùa hoa mận dù tên không chứa "hoa mận").
        // Không đưa mục khác tỉnh chỉ vì nó có dữ liệu mùa (vd
        // 'Đảo Hòn Tằm' cho 'Tam Đảo', 'Hoàng thành Thăng Long'
        // cho 'Hạ Long' — gặp 24/11/2026). Chỉ câu hỏi KHÔNG
        // nêu nơi nào mới lấy mục đầu tiên có mùa (mục nào
        // cũng được, vì câu hỏi không nêu nơi).
        const featSet = new Set(feats);
        const specific = this.specificTokens(q);
        const provQ = this.provinceOf(q);
        // Tìm sâu tới top 30 (không phải top 10): khách sạn hay
        // xếp trên mục địa danh có mùa (vd Vịnh Hạ Long hạng 25,
        // Buôn Akõ Dhông hạng 26, VinWonders Nha Trang hạng 26 —
        // gặp 24/11/2026).
        const deep = this.retriever.search(q, 30);
        for (const [ds, de] of deep) {
          const nameOk = namedInQuestion(de.ten, featSet)
            || spanMatches(de.ten, featSet, specific);
          const placeOk = provQ !== null && sameProvince(de.tinh, provQ);
          const genericOk = provQ === null && !specific.size;
          if (!de.loai && (de.mua_dep || "").trim()
              && (nameOk || placeOk || genericOk)) {
            entries = [[ds, de], ...entries.filter(([, e]) => e !== de)];
            break;
          }
        }
      }
    }
    // Chặn khớp giả — LUẬT CHUNG (24/11/2026, anh chốt "làm luật chung
    // cho mọi câu đi", sau khi M chỉ đắp riêng 1 câu Quốc lộ 51):
    // câu hỏi nhắc đích danh 1 thứ mà top mục không có mục nào khớp
    // tên -> đừng trả bừa; trả độ tin cậy 0 để trợ lý cũ thử (biết
    // thì trả đúng, không biết thì báo chưa có dữ liệu). Áp cho MỌI
    // ý định trả lời về 1 mục/1 tuyến/1 danh sách CỤ THỂ (gia_ve/
    // gio_mo_cua/vi_tri/diem_choi/cach_di/mua_dep/lich_trinh/so_sanh/
    // chi_phi). Không chặn câu tiếp nối (chủ thể ở câu trước).
    // Ngoại lệ: cach_di/mua_dep có nguồn riêng ngoài kho (bảng tuyến/
    // bảng mùa vùng cũ) — thứ hỏi nằm trong bảng thì cho qua; mua_dep
    // cũng cho qua khi câu hỏi nhắc 1 tỉnh/thành cụ thể (vd "Mộc Châu
    // mùa hoa mận nở vào tháng mấy": mùa của Mộc Châu nằm trong mục
    // Mộc Châu, dù mục đó không được nêu tên); chi_phi cho qua khi
    // câu hỏi đã nêu tỉnh (bảng chi phí cấp tỉnh là dữ liệu thật).
    // an/o không chặn ở đây vì đã neo theo tỉnh ở trên (không neo
    // được tỉnh thì danh sách đã rỗng). mang_gi/chung_chung/tinh_cu
    // không chặn: đáp án của chúng là gợi ý chung/khuyên chung,
    // không nhận là dữ liệu của 1 mục cụ thể nào.
    if (!follow && (intent === "gia_ve" || intent === "gio_mo_cua" || intent === "vi_tri" || intent === "diem_choi" || intent === "cach_di" || intent === "mua_dep" || intent === "lich_trinh" || intent === "so_sanh" || intent === "chi_phi") && entries.length) {
      let specific = this.specificTokens(q);
      let extraOk = false;
      // Đáp án có thể đến từ bảng EXTRA (tuyến đi/mùa vùng cũ) chứ không
      // từ mục kho — vd "đi Sơn Đoòng bằng gì" (Sơn Đoòng chưa có trong
      // kho nhưng có trong bảng tuyến). Có trong bảng thì không chặn.
      if (intent === "cach_di") {
        // Tuyến tới tỉnh của thành phố hỏi cũng tính (vd "đi Sa Pa
        // bằng gì": bảng chỉ có tuyến tới "Lào Cai", trong đó cách
        // đi có nhắc Sa Pa — gặp 24/11/2026, trước đây trả chú thích
        // của 1 resort thay vì tuyến).
        const provQ = this.provinceOf(q);
        if ((this.extra.tuyen_di || []).some((t) => nameInQ(t.den, q) || (provQ !== null && normText(t.den) === normText(provQ)))) extraOk = true;
      } else if (intent === "mua_dep") {
        if ((this.extra.mua_dep_vung_cu || []).some((m) => nameInQ(String(m.vung).split("(")[0].trim(), q))) extraOk = true;
        else if (this.provinceOf(q) !== null) {
          // Câu hỏi nhắc 1 tỉnh/thành cụ thể (vd "Mộc Châu mùa hoa
          // mận"): mùa của vùng đó nằm trong mục của vùng, dù mục
          // đó không được nêu tên — không chặn theo tên.
          specific = new Set();
        }
      } else if (intent === "chi_phi" && this.provinceOf(q) !== null) {
        // Chi phí cấp tỉnh là dữ liệu thật (34 tỉnh đều có bảng
        // chi phí) — câu hỏi đã nêu tỉnh thì không chặn theo tên mục.
        extraOk = true;
      }
      const noData = () => ({
        answer: "App chưa có thông tin này trong kho dữ liệu hiện tại — câu hỏi nhắc tới một điểm/tuyến chưa có trong kho nên mình không trả bừa. Bạn thử hỏi về một điểm cụ thể đã có trong cẩm nang, vd \"vé Bà Nà Hills bao nhiêu\", \"đi Quy Nhơn bằng gì\".",
        intent,
        confidence: 0.0,
        entity: null,
        entity_prov: null,
        score: round3(entries[0][0]),
        no_data: true,
      });
      if (extraOk) {
        // đáp án lấy từ bảng EXTRA / bảng chi phí tỉnh, không chặn
      } else if (specific.size) {
        const featSet = new Set(feats);
        // So sánh cần khớp CẢ 2 bên (vd "so sánh A với B" mà chỉ
        // khớp A thì bên B vẫn là mục bừa); các ý định khác cần
        // khớp ít nhất 1 mục.
        const need = intent === "so_sanh" ? 2 : 1;
        // Câu hỏi nêu tỉnh/thành cụ thể thì mục khớp PHẢI ở
        // đúng tỉnh đó — cùng tên ở tỉnh khác là 1 nơi khác
        // (vd "Suối Vàng ở Lâm Đồng": "Thác Tình Yêu (Suối
        // Vàng)" ở Lào Cai không được tính là khớp; mục đúng
        // là "Hồ Suối Vàng" ở Lâm Đồng — gặp 24/11/2026).
        // Mùa là thuộc tính của VÙNG: câu hỏi mùa nêu 1 nơi
        // (vd "Mộc Châu mùa hoa mận") thì mục nào trong tỉnh
        // đó CÓ dữ liệu mùa cũng trả đúng mùa vùng đó.
        const provQ = this.provinceOf(q);
        const hit = (e) => {
          if (provQ !== null && !sameProvince(e.tinh, provQ)) return false;
          if (matchesSpecific(e.ten, featSet, specific)) return true;
          // Mùa là thuộc tính của VÙNG: chỉ tính khi câu hỏi
          // nêu nơi (provQ) và mục ở đúng tỉnh đó CÓ dữ liệu
          // mùa — không thì "Đảo Hòn Tằm" (có mùa) sẽ cứu
          // "Tam Đảo" (không có mục nào) dù khác tỉnh
          // (gặp 24/11/2026).
          return intent === "mua_dep" && provQ !== null && (e.mua_dep || "").trim() !== "";
        };
        const hits = entries.filter(([, e]) => hit(e)).length;
        if (hits < need) {
          return noData();
        }
      } else if (intent === "mua_dep") {
        // Câu mùa chung chung (không nêu tên mục nào): đáp án lấy từ
        // mục đầu; nếu top 3 không mục nào có dữ liệu mùa thì đừng
        // trả câu "chưa có của khách sạn X" — nhường trợ lý cũ trả
        // mùa đúng của cả vùng.
        if (!entries.slice(0, 3).some(([, e]) => (e.mua_dep || "").trim())) {
          return noData();
        }
      }
    }
    if (!follow && entries.length && this.specificTokens(q).size) {
      // Mục khớp đích danh nằm sâu trong top 3 mà mục đầu không khớp
      // (vd truy hồi xếp 1 mục khác lên trên): đưa mục khớp lên đầu
      // để composer trả đúng thực thể. Khớp tính theo
      // matchesSpecific (nhắc tên/cụm 2 chữ/chung >=2 token) —
      // vd "Hòn Khoai ở đâu": mục đầu "Hòn Khô" chỉ khớp nhờ tiền
      // tố "hon kho" của "hon khoai", còn "Đảo Hòn Khoai" khớp
      // cụm "hon khoai" nên được đưa lên (gặp 24/11/2026).
      // Mục khớp còn phải ĐÚNG TỈNH với nơi hỏi nêu (vd "Suối
      // Vàng ở Lâm Đồng": "Thác Tình Yêu (Suối Vàng)" ở Lào Cai
      // không được đưa lên, mục đúng là "Hồ Suối Vàng" ở Lâm
      // Đồng — gặp 24/11/2026).
      const featSet = new Set(feats);
      const specific = this.specificTokens(q);
      const provQ = this.provinceOf(q);
      const match = (e) => matchesSpecific(e.ten, featSet, specific)
        && (provQ === null || sameProvince(e.tinh, provQ));
      if (!match(entries[0][1])) {
        for (let j = 1; j < entries.length; j++) {
          if (match(entries[j][1])) {
            entries = [entries[j], ...entries.slice(0, j), ...entries.slice(j + 1)];
            break;
          }
        }
      }
    }
    const answer = compose(intent, entries, q, this.historyEntities, this.extra);
    let entity = entries.length ? entries[0][1].ten || null : null;
    if (intent === "cach_di") {
      // Thực thể đúng là ĐIỂM ĐẾN trong bảng tuyến, không phải điểm xuất phát
      // (tuyến tới tỉnh của thành phố hỏi cũng tính, vd Sa Pa -> Lào Cai).
      const provQ = this.provinceOf(q);
      for (const t of this.extra.tuyen_di || []) {
        if (nameInQ(t.den, q) || (provQ !== null && normText(t.den) === normText(provQ))) {
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
