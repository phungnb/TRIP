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
import { CITY_TO_PROVINCE, OLD_TO_NEW, normText } from "./normalize.js";

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
  // Thứ tự: thành phố trước, tỉnh cũ sau — để 'Vĩnh Long' không bị hiện
  // thành 'khu Long An (Tây Ninh)' (lỗi thật 25/11/2026).
  const qn = normText(query);
  for (const [city, prov] of Object.entries(CITY_TO_PROVINCE)) {
    if (qn.includes(normText(city))) return `khu ${city} (${prov})`;
  }
  for (const [old, nw] of Object.entries(OLD_TO_NEW)) {
    if (qn.includes(normText(old))) return `khu ${old} (${nw})`;
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
export function compose(intent, entries, query, historyEntities, extra) {
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
