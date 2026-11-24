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
import { CITY_TO_PROVINCE, OLD_TO_NEW, normText, provKey, tokens } from "./normalize.js";
import { NaiveBayes } from "./naive-bayes.js";
import { Retriever } from "./retriever.js";
import { SessionContext, enrichEntry, extractSlots, parseCost, parseCostLow, premiseCheck } from "./slots.js";

function fmtVnd(n) {
  // Định dạng số VNĐ kiểu Việt Nam (4.800.000) — khớp format(x, ",") của Python.
  return String(Math.trunc(n)).replace(/\B(?=(\d{3})+(?!\d))/g, ".");
}

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
    // Tầng 2 — bộ nhớ hội thoại có cấu trúc (SessionContext).
    this.ctx = new SessionContext();
    // Tầng 3 — kho đã chuẩn hóa (suy trường mới từ dữ liệu sẵn có).
    this.kbEnriched = kb.map((e) => enrichEntry(e));
    // Tên tỉnh mới (từ kho) để nhận diện tỉnh trong câu hỏi
    const provs = new Set();
    for (const e of kb) {
      if (e.tinh && !e.loai) provs.add(provKey(e.tinh));
    }
    this.provinces = [...provs].sort();
    this.provinceNames = [...new Set(kb.map((e) => e.tinh).filter(Boolean))].sort();
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
    // Tầng 1+2: trích slot, cập nhật context, gộp slot hiệu dụng
    const rawSlots = extractSlots(q, this.kb, this.provinceNames);
    this.ctx.update(rawSlots);
    const slots = this.ctx.effectiveSlots(rawSlots);
    // Tầng 1: kiểm tra tiền đề sai (đính chính lên đầu nếu có)
    const premise = premiseCheck(slots, this.kb);
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
    if (intent === "o") {
      // "X ở đâu" hỏi vị trí của 1 điểm cụ thể, không phải hỏi chỗ ở.
      // NB hay nhầm sang "o" vì cụm "ở đâu" (gặp 24/11/2026: "Cà phê
      // Tùng Đà Lạt ở đâu" ra homestay, "Phù điêu... ở đâu" ra hostel).
      // Chỉ sửa khi câu hỏi nhắc đích danh 1 mục không phải chỗ ở,
      // không phải tên thành phố hay mục tổng quan tỉnh.
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
    // Tầng 3: lọc thời gian (close_hour >= giờ hỏi, hoặc mở qua đêm)
    const tf = slots.time_filter;
    if (tf && tf.type === "after" && entries.length) {
      const hour = tf.hour;
      const kept = [];
      for (const [score, e] of entries) {
        const enr = this.kbEnriched.find((x) => x.ten === e.ten);
        const ch = enr ? enr.close_hour : null;
        if (ch === null || ch >= hour || ch <= 5.0) kept.push([score, e]);
      }
      if (kept.length) entries = kept;
    }
    let answer = compose(intent, entries, q, this.historyEntities, this.extra);
    // Tầng 3: tổng hợp đa ý định thành khối (khi >= 2 ý định)
    const multi = this._multiIntentBlocks(slots, q);
    if (multi) answer = multi + "\n\n" + answer;
    // Tầng 1: đính chính tiền đề sai lên ĐẦU câu trả lời
    if (premise) answer = premise.message + "\n\n" + answer;
    // Tầng 1: cảnh báo ngân sách khi nhân số người vượt budget
    const warn = this._budgetWarning(slots);
    if (warn) answer = answer + "\n\n" + warn;
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
      slots,
      premise,
    };
  }

  _multiIntentBlocks(slots, q) {
    const intents = slots.intents || [];
    if (intents.length < 2) return null;
    const prov = slots.province;
    const people = slots.people || 1;
    const days = slots.days || 2;
    const blocks = [];
    if (intents.includes("chi_phi") || slots.budget_vnd) {
      const est = this._estimateTrip(prov, people, days);
      if (est !== null && est !== undefined) {
        blocks.push("💰 Ước tính chi phí cho " + people + " người (" + days + "N" + Math.max(days - 1, 1) + "Đ): ~" + fmtVnd(est) + " VNĐ");
      }
    }
    if (intents.includes("di_dau") || intents.includes("lich_trinh")) {
      const spots = this._topForProvince(prov, null, 3);
      if (spots.length) blocks.push("🌲 Điểm đến: " + spots.join(", "));
    }
    if (intents.includes("an_gi")) {
      const dishes = this._topForProvince(prov, "mon_an", 3);
      if (dishes.length) blocks.push("🍲 Món nên thử: " + dishes.join(", "));
    }
    return blocks.length ? blocks.join("\n") : null;
  }

  _topForProvince(prov, loai, n) {
    const out = [];
    for (const e of this.kb) {
      if (prov && e.tinh !== prov) continue;
      if (loai && e.loai !== loai) continue;
      if (!loai && e.loai) continue;
      out.push((e.ten || "").split("(")[0].trim());
      if (out.length >= n) break;
    }
    return out;
  }

  _estimateTrip(prov, people, days) {
    // 'Tổng ước tính' đã là tổng cả chuyến/người nên KHÔNG nhân thêm số ngày.
    // Dùng đầu thấp của khoảng giá (mức tối thiểu đạt được) để ước tính
    // theo ngân sách người dùng nêu.
    for (const e of this.kb) {
      if (e.loai === "chi_phi" && (!prov || e.tinh === prov)) {
        let c = parseCostLow(e.gia || "");
        if (c === null || c === undefined) {
          const gc = e.ghi_chu || "";
          const m = gc.indexOf("Tổng ước tính");
          c = parseCostLow(m >= 0 ? gc.slice(m) : gc);
        }
        if (c) return c * people;
      }
    }
    return null;
  }

  _budgetWarning(slots) {
    const budget = slots.budget_vnd;
    const people = slots.people || 1;
    const days = slots.days || 2;
    if (!budget) return null;
    const est = this._estimateTrip(slots.province, people, days);
    if (est && est > budget) {
      return "⚠️ Với " + people + " người, ước tính ~" + fmtVnd(est) + " VNĐ đã vượt ngân sách " + fmtVnd(budget) + " VNĐ của bạn. Bạn có thể rút ngắn ngày hoặc chọn chỗ ở rẻ hơn.";
    }
    return null;
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
