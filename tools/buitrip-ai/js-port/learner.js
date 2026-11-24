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
import { compose } from "./composer.js";
import { CITY_TO_PROVINCE, OLD_TO_NEW, QUESTION_WORDS, normText, provKey, tokens } from "./normalize.js";
import { NaiveBayes } from "./naive-bayes.js";
import { Retriever } from "./retriever.js";

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
  // chung đủ token cụ thể với tên mục (1 token thì chung token đó,
  // >=2 token thì chung >=2). Dùng cho luật chặn khớp giả.
  if (namedInQuestion(entryName, featSet)) return true;
  if (!specific.size) return false;
  const nameToks = new Set(normText((entryName || "").split("(")[0]).split(" ").filter(Boolean));
  let shared = 0;
  for (const t of nameToks) if (specific.has(t)) shared++;
  if (specific.size === 1) return shared > 0;
  return shared >= 2;
}

export class BuiTripAI {
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
    // Token của tên tỉnh/thành phố (để tìm token cụ thể trong câu hỏi).
    // Thêm cả dạng viết liền ("sapa", "phuquoc", "quynhon") vì câu hỏi
    // thật hay viết liền tên 2 chữ.
    this._placeTokens = new Set();
    const addPlace = (name) => {
      const toks = normText(name).split(" ").filter(Boolean);
      for (const t of toks) this._placeTokens.add(t);
      if (toks.length > 1) this._placeTokens.add(toks.join(""));
    };
    for (const c of Object.keys(CITY_TO_PROVINCE)) addPlace(c);
    for (const p of this.provinces) addPlace(p);
    for (const [old, nw] of Object.entries(OLD_TO_NEW)) {
      addPlace(old);
      addPlace(nw);
    }
    this._loadStoredBoosts();
  }

  // Token 'cụ thể' trong câu hỏi: bỏ từ hỏi/chức năng + tên tỉnh/thành.
  // Còn lại rỗng = câu hỏi chung chung (vd 'điểm tham quan ở Huế').
  // Còn lại không rỗng = câu hỏi nhắc đích danh 1 thứ cụ thể
  // (vd 'Quốc lộ 51' còn lại 'quoc lo 51').
  specificTokens(q) {
    const out = new Set();
    for (const t of normText(q).split(" ")) {
      if (t && !QUESTION_WORDS.has(t) && !this._placeTokens.has(t)) out.add(t);
    }
    return out;
  }

  // Trả về tên tỉnh mới (dạng chuẩn hóa) nếu câu hỏi nhắc 1 tỉnh/tỉnh cũ/thành phố.
  // So cả dạng viết liền ("sapa") vì câu hỏi thật hay viết liền tên 2 chữ.
  provinceOf(q) {
    const qn = normText(q);
    const qnNs = qn.replace(/ /g, "");
    for (const [old, nw] of Object.entries(OLD_TO_NEW)) {
      if (qn.includes(normText(old)) || qnNs.includes(normText(old).replace(/ /g, ""))) return nw;
    }
    for (const [city, prov] of Object.entries(CITY_TO_PROVINCE)) {
      if (qn.includes(normText(city)) || qnNs.includes(normText(city).replace(/ /g, ""))) return prov;
    }
    for (const prov of this.provinces) {
      if (prov && (qn.includes(prov) || qnNs.includes(prov.replace(/ /g, "")))) return prov;
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
      if (prov === null && this.specificTokens(q).size) {
        // Hỏi món/chỗ ở/chi phí ở 1 nơi cụ thể mà kho không nhận ra
        // tỉnh (vd "ăn gì ở Quốc lộ 51"): đừng liệt kê món bừa.
        entries = [];
      } else {
        const anchored = this.retriever.search(q, 5, loai, true, prov);
        if (anchored.length) entries = anchored;
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
      // "Happy Land Mộc Châu" hạng 7). Tìm sâu top 10, đưa mục địa
      // danh đầu tiên CÓ dữ liệu mùa lên đầu; vùng đã có trong bảng
      // EXTRA thì không cần (câu trả lời lấy từ bảng đó). Không có
      // thì để nguyên (luật chặn bên dưới sẽ chặn, nhường trợ lý cũ).
      const qn = normText(q);
      const inExtra = (this.extra.mua_dep_vung_cu || []).some((m) => qn.includes(normText(String(m.vung).split("(")[0].trim())));
      const top = entries[0][1];
      if (!inExtra && !(top.mua_dep || "").trim()) {
        const deep = this.retriever.search(q, 10);
        for (const [ds, de] of deep) {
          if (!de.loai && (de.mua_dep || "").trim()) {
            entries = [[ds, de], ...entries.filter(([, e]) => e !== de)];
            break;
          }
        }
      }
    }
    // Chặn khớp giả (gặp 24/11/2026: "Quốc lộ 51 có điểm tham quan nào"
    // trả "Cọ ỏm" Phú Thọ vì token "có"/"cọ" trùng nhau, conf 1.0
    // score 0.591 vẫn qua cổng). Áp cho 6 ý định trả lời về 1 mục/1
    // tuyến CỤ THỂ (gia_ve/gio_mo_cua/vi_tri/diem_choi/cach_di/
    // mua_dep): câu hỏi nhắc đích danh 1 thứ mà top mục không có mục
    // nào khớp tên -> đừng trả bừa; trả độ tin cậy 0 để trợ lý cũ thử
    // (biết thì trả đúng, không biết thì báo chưa có dữ liệu). Các ý
    // định khác (an/o/chi_phi/lich_trinh/so_sanh) trả lời theo tỉnh/
    // vùng nên không chặn — danh sách theo tỉnh vẫn đúng kể cả khi câu
    // hỏi không nêu tên mục nào. Không chặn câu tiếp nối (chủ thể ở
    // câu trước). Ngoại lệ: cach_di/mua_dep có nguồn riêng ngoài kho
    // (bảng tuyến/bảng mùa vùng cũ) — thứ hỏi nằm trong bảng thì cho
    // qua; mua_dep cũng cho qua khi câu hỏi nhắc 1 tỉnh/thành cụ thể
    // (vd "Mộc Châu mùa hoa mận nở vào tháng mấy": mùa của Mộc Châu
    // nằm trong mục Mộc Châu, dù mục đó không được nêu tên).
    if (!follow && (intent === "gia_ve" || intent === "gio_mo_cua" || intent === "vi_tri" || intent === "diem_choi" || intent === "cach_di" || intent === "mua_dep") && entries.length) {
      let specific = this.specificTokens(q);
      let extraOk = false;
      // Đáp án có thể đến từ bảng EXTRA (tuyến đi/mùa vùng cũ) chứ không
      // từ mục kho — vd "đi Sơn Đoòng bằng gì" (Sơn Đoòng chưa có trong
      // kho nhưng có trong bảng tuyến). Có trong bảng thì không chặn.
      if (intent === "cach_di") {
        const qn = normText(q);
        if ((this.extra.tuyen_di || []).some((t) => qn.includes(normText(t.den)))) extraOk = true;
      } else if (intent === "mua_dep") {
        const qn = normText(q);
        if ((this.extra.mua_dep_vung_cu || []).some((m) => qn.includes(normText(String(m.vung).split("(")[0].trim())))) extraOk = true;
        else if (this.provinceOf(q) !== null) {
          // Câu hỏi nhắc 1 tỉnh/thành cụ thể (vd "Mộc Châu mùa hoa
          // mận"): mùa của vùng đó nằm trong mục của vùng, dù mục
          // đó không được nêu tên — không chặn theo tên.
          specific = new Set();
        }
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
        // đáp án lấy từ bảng EXTRA, không chặn
      } else if (specific.size) {
        const featSet = new Set(feats);
        if (!entries.some(([, e]) => matchesSpecific(e.ten, featSet, specific))) {
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
