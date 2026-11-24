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
import { CITY_TO_PROVINCE, OLD_TO_NEW, QUESTION_WORDS, nameInQ, normText, provKey, sameProvince, tokens } from "./normalize.js";
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
