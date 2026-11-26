/* Khu du lịch trong tỉnh mới sau sáp nhập 01/07/2025.
   Vấn đề gốc: dữ liệu mỗi tỉnh tính lịch trình và tiền đi theo thủ phủ, nên gõ một nơi xa thủ phủ
   (Quy Nhơn thuộc Gia Lai, Phú Quốc thuộc An Giang, Móng Cái thuộc Quảng Ninh…) rồi lập kế hoạch
   sẽ ra lịch của thủ phủ, cách nơi đó cả trăm km.
   Cách làm chung cho mọi nơi:
   - Mỗi trung tâm trong TRUNG_TAM (trung-tam.js) tự thành một "khu". KHU_META thêm tên hiển thị,
     tên tỉnh cũ, cách gõ thường gặp và tuyến đi riêng nếu có.
   - Lịch trình theo điểm: lấy địa danh của khu (dist_from = trung tâm), thiếu thì bù địa danh gần nhất
     trong bán kính nới dần 50 → 80 → 120 → 160 km; xếp tối đa 3 điểm/ngày, nối điểm gần nhau.
   - Chọn một địa danh xa thủ phủ (Móng Cái, Pù Luông…) cũng dựng lịch quanh chính địa danh đó.
   - Tiền đi: khu có tuyến riêng thì dùng; không có mà nơi đến cách thủ phủ trên 80 km thì ghi rõ
     tiền đi đang tính tới thủ phủ, chưa cộng chặng còn lại.
   Giá vé trong KHU_META là ƯỚC TÍNH, CHƯA KIỂM với hãng; ghi rõ trong nhãn. */
var KHU_META = {
  "Quy Nhơn": { id: "quy-nhon", old: "Bình Định", keys: ["binh dinh"],
    cost: [
      { label: "Máy bay SG–Quy Nhơn (Phù Cát) khứ hồi (ước tính, chưa kiểm)", value: "1.600.000–3.200.000đ" },
      { label: "Nếu đi từ Hà Nội: máy bay HN–Quy Nhơn khứ hồi thay máy bay SG (ước tính, chưa kiểm)", value: "2.000.000–4.000.000đ" }] },
  "Phan Thiết": { id: "phan-thiet", name: "Phan Thiết – Mũi Né", old: "Bình Thuận", keys: ["phan thiet", "mui ne", "binh thuan"],
    cost: [
      { label: "Tàu hỏa hoặc xe khách SG–Phan Thiết khứ hồi (ước tính, chưa kiểm)", value: "300.000–700.000đ" },
      { label: "Nếu đi từ Hà Nội: máy bay HN–SG khứ hồi + xe đi Phan Thiết, thay máy bay SG (ước tính, chưa kiểm)", value: "2.300.000–4.500.000đ" }] },
  "Gia Nghĩa": { id: "gia-nghia", old: "Đắk Nông", keys: ["dak nong"],
    cost: [
      { label: "Xe khách SG–Gia Nghĩa khứ hồi (ước tính, chưa kiểm)", value: "400.000–700.000đ" },
      { label: "Nếu đi từ Hà Nội: máy bay HN–SG khứ hồi + xe đi tiếp, thay máy bay SG (ước tính, chưa kiểm)", value: "2.400.000–4.500.000đ" }] },
  "Bảo Lộc": { id: "bao-loc", old: "", keys: [],
    cost: [
      { label: "Xe khách SG–Bảo Lộc khứ hồi (ước tính, chưa kiểm)", value: "400.000–700.000đ" },
      { label: "Nếu đi từ Hà Nội: máy bay HN–SG khứ hồi + xe đi tiếp, thay máy bay SG (ước tính, chưa kiểm)", value: "2.400.000–4.500.000đ" }] },
  "TP Vũng Tàu": { id: "vung-tau", name: "Vũng Tàu", old: "Bà Rịa – Vũng Tàu", keys: ["ba ria vung tau", "ba ria", "brvt"],
    cost: [
      { label: "Xe khách hoặc tàu cao tốc SG–Vũng Tàu khứ hồi (ước tính, chưa kiểm)", value: "300.000–700.000đ" },
      { label: "Nếu đi từ Hà Nội: máy bay HN–SG khứ hồi + xe đi Vũng Tàu, thay máy bay SG (ước tính, chưa kiểm)", value: "2.300.000–4.300.000đ" }] },
  "Thủ Dầu Một": { id: "thu-dau-mot", old: "Bình Dương", keys: ["binh duong"] },
  "Côn Đảo": { id: "con-dao", old: "Bà Rịa – Vũng Tàu", keys: [],
    cost: [
      { label: "Máy bay SG–Côn Đảo khứ hồi (ước tính, chưa kiểm)", value: "2.500.000–5.000.000đ" },
      { label: "Nếu đi từ Hà Nội: máy bay HN–Côn Đảo khứ hồi thay máy bay SG (ước tính, chưa kiểm)", value: "4.000.000–7.000.000đ" }] },
  "Dương Đông (Phú Quốc)": { id: "phu-quoc", name: "Phú Quốc", old: "Kiên Giang", keys: ["phu quoc", "duong dong", "kien giang"],
    cost: [
      { label: "Máy bay SG–Phú Quốc khứ hồi (ước tính, chưa kiểm)", value: "1.400.000–3.000.000đ" },
      { label: "Nếu đi từ Hà Nội: máy bay HN–Phú Quốc khứ hồi thay máy bay SG (ước tính, chưa kiểm)", value: "2.400.000–4.500.000đ" }] },
  "Rạch Giá": { id: "rach-gia", old: "Kiên Giang", keys: [],
    cost: [
      { label: "Xe khách SG–Rạch Giá khứ hồi (ước tính, chưa kiểm)", value: "400.000–700.000đ" },
      { label: "Nếu đi từ Hà Nội: máy bay HN–SG khứ hồi + xe đi tiếp, thay máy bay SG (ước tính, chưa kiểm)", value: "2.400.000–4.500.000đ" }] },
  "Hà Tiên": { id: "ha-tien", old: "Kiên Giang", keys: [],
    cost: [
      { label: "Xe khách SG–Hà Tiên khứ hồi (ước tính, chưa kiểm)", value: "500.000–800.000đ" },
      { label: "Nếu đi từ Hà Nội: máy bay HN–SG khứ hồi + xe đi tiếp, thay máy bay SG (ước tính, chưa kiểm)", value: "2.500.000–4.600.000đ" }] },
  "Long Xuyên": { id: "long-xuyen", old: "", keys: [],
    cost: [
      { label: "Xe khách SG–Long Xuyên khứ hồi (ước tính, chưa kiểm)", value: "300.000–600.000đ" },
      { label: "Nếu đi từ Hà Nội: máy bay HN–SG khứ hồi + xe đi tiếp, thay máy bay SG (ước tính, chưa kiểm)", value: "2.300.000–4.400.000đ" }] },
  "TP Hà Giang": { id: "ha-giang", name: "Hà Giang", old: "Hà Giang", keys: ["dong van", "meo vac"],
    cost: [
      { label: "Máy bay SG–HN khứ hồi + xe khách HN–Hà Giang khứ hồi (ước tính, chưa kiểm)", value: "2.600.000–4.800.000đ" },
      { label: "Nếu đi từ Hà Nội: xe khách HN–Hà Giang khứ hồi thay máy bay SG (ước tính, chưa kiểm)", value: "500.000–900.000đ" }] },
  "Đồng Hới": { id: "phong-nha", name: "Đồng Hới – Phong Nha", old: "Quảng Bình", keys: ["dong hoi", "phong nha", "quang binh"],
    cost: [
      { label: "Máy bay SG–Đồng Hới khứ hồi (ước tính, chưa kiểm)", value: "1.600.000–3.200.000đ" },
      { label: "Nếu đi từ Hà Nội: máy bay HN–Đồng Hới khứ hồi thay máy bay SG (ước tính, chưa kiểm)", value: "1.400.000–3.000.000đ" }] },
  "Hội An": { id: "hoi-an", old: "Quảng Nam", keys: ["quang nam"] },
  "Tam Kỳ": { id: "tam-ky", old: "Quảng Nam", keys: [] },
  "Tuy Hòa": { id: "tuy-hoa", old: "Phú Yên", keys: ["phu yen"],
    cost: [
      { label: "Máy bay SG–Tuy Hòa khứ hồi (ước tính, chưa kiểm)", value: "1.500.000–3.000.000đ" },
      { label: "Nếu đi từ Hà Nội: máy bay HN–Tuy Hòa khứ hồi thay máy bay SG (ước tính, chưa kiểm)", value: "2.000.000–4.000.000đ" }] },
  "TP Kon Tum": { id: "kon-tum", name: "Kon Tum – Măng Đen", old: "Kon Tum", keys: ["kon tum", "mang den"],
    cost: [
      { label: "Máy bay SG–Pleiku khứ hồi + xe Pleiku–Kon Tum (ước tính, chưa kiểm)", value: "2.000.000–3.700.000đ" },
      { label: "Nếu đi từ Hà Nội: máy bay HN–Pleiku khứ hồi + xe Pleiku–Kon Tum, thay máy bay SG (ước tính, chưa kiểm)", value: "2.400.000–4.500.000đ" }] },
  "Phan Rang": { id: "phan-rang", name: "Phan Rang – Vĩnh Hy", old: "Ninh Thuận", keys: ["phan rang", "ninh thuan", "ninh chu", "vinh hy"],
    cost: [
      { label: "Máy bay SG–Cam Ranh khứ hồi + xe đi Phan Rang (ước tính, chưa kiểm)", value: "1.500.000–3.000.000đ" },
      { label: "Nếu đi từ Hà Nội: máy bay HN–Cam Ranh khứ hồi + xe đi Phan Rang, thay máy bay SG (ước tính, chưa kiểm)", value: "2.200.000–4.300.000đ" }] },
  "Cát Bà": { id: "cat-ba", old: "", keys: [] },
  "Hải Dương": { id: "hai-duong", old: "Hải Dương", keys: [] },
  "Thái Bình": { id: "thai-binh", old: "Thái Bình", keys: [] },
  "Bắc Giang": { id: "bac-giang", old: "Bắc Giang", keys: [] },
  "Phủ Lý": { id: "phu-ly", old: "Hà Nam", keys: ["ha nam"] },
  "Nam Định": { id: "nam-dinh", old: "Nam Định", keys: [] },
  "Vĩnh Yên": { id: "vinh-yen", old: "Vĩnh Phúc", keys: ["vinh phuc"],
    cost: [
      { label: "Máy bay SG–HN khứ hồi + xe HN–Vĩnh Yên khứ hồi (ước tính, chưa kiểm)", value: "2.300.000–4.200.000đ" },
      { label: "Nếu đi từ Hà Nội: xe khách HN–Vĩnh Yên khứ hồi, thay máy bay SG (ước tính, chưa kiểm)", value: "150.000–300.000đ" }] },
  "TP Hòa Bình": { id: "hoa-binh", name: "Hòa Bình", old: "Hòa Bình", keys: [],
    cost: [
      { label: "Máy bay SG–HN khứ hồi + xe HN–Hòa Bình khứ hồi (ước tính, chưa kiểm)", value: "2.300.000–4.200.000đ" },
      { label: "Nếu đi từ Hà Nội: xe khách HN–Hòa Bình khứ hồi, thay máy bay SG (ước tính, chưa kiểm)", value: "200.000–400.000đ" }] },
  "Sa Pa": { id: "sa-pa", old: "", keys: ["sapa"] },
  "TP Yên Bái": { id: "yen-bai", name: "Yên Bái", old: "Yên Bái", keys: [],
    cost: [
      { label: "Máy bay SG–HN khứ hồi + xe HN–Yên Bái khứ hồi (ước tính, chưa kiểm)", value: "2.400.000–4.400.000đ" },
      { label: "Nếu đi từ Hà Nội: xe khách HN–Yên Bái khứ hồi, thay máy bay SG (ước tính, chưa kiểm)", value: "300.000–600.000đ" }] },
  "Bắc Kạn": { id: "bac-kan", old: "Bắc Kạn", keys: [],
    cost: [
      { label: "Máy bay SG–HN khứ hồi + xe HN–Bắc Kạn khứ hồi (ước tính, chưa kiểm)", value: "2.400.000–4.400.000đ" },
      { label: "Nếu đi từ Hà Nội: xe khách HN–Bắc Kạn khứ hồi, thay máy bay SG (ước tính, chưa kiểm)", value: "300.000–600.000đ" }] },
  "TP Sóc Trăng": { id: "soc-trang", name: "Sóc Trăng", old: "Sóc Trăng", keys: [],
    cost: [
      { label: "Xe khách SG–Sóc Trăng khứ hồi (ước tính, chưa kiểm)", value: "400.000–700.000đ" },
      { label: "Nếu đi từ Hà Nội: máy bay HN–SG khứ hồi + xe đi tiếp, thay máy bay SG (ước tính, chưa kiểm)", value: "2.400.000–4.500.000đ" }] },
  "Vị Thanh": { id: "vi-thanh", old: "Hậu Giang", keys: ["hau giang"],
    cost: [
      { label: "Xe khách SG–Vị Thanh khứ hồi (ước tính, chưa kiểm)", value: "300.000–600.000đ" },
      { label: "Nếu đi từ Hà Nội: máy bay HN–SG khứ hồi + xe đi tiếp, thay máy bay SG (ước tính, chưa kiểm)", value: "2.300.000–4.400.000đ" }] },
  "Đồng Xoài": { id: "dong-xoai", old: "Bình Phước", keys: ["binh phuoc"],
    cost: [
      { label: "Xe khách SG–Đồng Xoài khứ hồi (ước tính, chưa kiểm)", value: "200.000–400.000đ" },
      { label: "Nếu đi từ Hà Nội: máy bay HN–SG khứ hồi + xe đi tiếp, thay máy bay SG (ước tính, chưa kiểm)", value: "2.200.000–4.200.000đ" }] },
  "Tân An": { id: "tan-an", old: "Long An", keys: ["long an"],
    cost: [
      { label: "Xe khách SG–Tân An khứ hồi (ước tính, chưa kiểm)", value: "100.000–250.000đ" },
      { label: "Nếu đi từ Hà Nội: máy bay HN–SG khứ hồi + xe đi tiếp, thay máy bay SG (ước tính, chưa kiểm)", value: "2.100.000–4.000.000đ" }] },
  "Bến Tre": { id: "ben-tre", old: "Bến Tre", keys: [],
    cost: [
      { label: "Xe khách SG–Bến Tre khứ hồi (ước tính, chưa kiểm)", value: "200.000–400.000đ" },
      { label: "Nếu đi từ Hà Nội: máy bay HN–SG khứ hồi + xe đi tiếp, thay máy bay SG (ước tính, chưa kiểm)", value: "2.200.000–4.200.000đ" }] },
  "Trà Vinh": { id: "tra-vinh", old: "Trà Vinh", keys: [],
    cost: [
      { label: "Xe khách SG–Trà Vinh khứ hồi (ước tính, chưa kiểm)", value: "300.000–500.000đ" },
      { label: "Nếu đi từ Hà Nội: máy bay HN–SG khứ hồi + xe đi tiếp, thay máy bay SG (ước tính, chưa kiểm)", value: "2.300.000–4.300.000đ" }] },
  "Mỹ Tho": { id: "my-tho", old: "Tiền Giang", keys: ["tien giang"],
    cost: [
      { label: "Xe khách SG–Mỹ Tho khứ hồi (ước tính, chưa kiểm)", value: "150.000–300.000đ" },
      { label: "Nếu đi từ Hà Nội: máy bay HN–SG khứ hồi + xe đi tiếp, thay máy bay SG (ước tính, chưa kiểm)", value: "2.100.000–4.100.000đ" }] },
  "Bạc Liêu": { id: "bac-lieu", old: "Bạc Liêu", keys: [],
    cost: [
      { label: "Xe khách SG–Bạc Liêu khứ hồi (ước tính, chưa kiểm)", value: "400.000–700.000đ" },
      { label: "Nếu đi từ Hà Nội: máy bay HN–SG khứ hồi + xe đi tiếp, thay máy bay SG (ước tính, chưa kiểm)", value: "2.400.000–4.500.000đ" }] }
};
var KHU_VUC = [];
(function () {
  function fold(s) { return String(s || "").toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "").replace(/đ/g, "d").replace(/[^a-z0-9]+/g, " ").trim(); }
  function low(s) { return " " + String(s || "").toLowerCase().normalize("NFC").replace(/[^0-9a-zà-ỹđ]+/g, " ").trim() + " "; }
  function P(id) { return typeof provById === "function" ? provById(id) : null; }
  if (typeof TRUNG_TAM !== "undefined") Object.keys(TRUNG_TAM).forEach(function (pid) {
    TRUNG_TAM[pid].forEach(function (h) {
      var m = KHU_META[h[0]] || {}, name = m.name || h[0].replace(/^TP\s+/, "");
      var plain = h[0].replace(/^TP\s+/, "").replace(/\s*\(.*?\)/g, "");
      KHU_VUC.push({ id: m.id || fold(name).replace(/ /g, "-"), prov: pid, name: name, old: m.old || "", hub: h[0], lat: h[1], lng: h[2], island: !!h[3],
        exact: [low(name).trim(), low(plain).trim()], keys: m.keys || [], cost: m.cost || null });
    });
  });
  window.btAreaById = function (id) { for (var i = 0; i < KHU_VUC.length; i++) if (KHU_VUC[i].id === id) return KHU_VUC[i]; return null; };
  window.btAreaByHub = function (prov, hub) { for (var i = 0; i < KHU_VUC.length; i++) if (KHU_VUC[i].prov === prov && KHU_VUC[i].hub === hub) return KHU_VUC[i]; return null; };
  /* Khu khớp câu gõ, theo từ. Gõ có dấu thì so có dấu với tên khu (gõ "Vĩnh Phúc" không khớp nhầm "Vinh");
     gõ không dấu thì so bỏ dấu. keys là cách gõ khác (tên tỉnh cũ…), luôn so bỏ dấu.
     Khớp trên danh sách từ đã tách, không khớp chuỗi con trên chuỗi đã nối: "long an" trong
     "Vĩnh Long ăn gì" là "Long" (đuôi tên tỉnh Vĩnh Long) + "ăn" nối qua biên từ, không phải khu Tân An.
     Một keys chỉ được khớp khi không cắt ngang tên tỉnh/khu có trong câu — trừ khi keys đó chính là
     trọn tên tỉnh/khu đó (vd "Bình Định" vẫn ra khu Quy Nhơn, "Long An" vẫn ra khu Tân An). */
  window.btAreaFor = function (q) {
    var f = " " + fold(q) + " ", lq = low(q), marked = /[à-ỹđ]/i.test(String(q || "").normalize("NFC")) /* chỉ chữ có dấu tiếng Việt; gạch nối "–" không tính là gõ có dấu */, best = null, bl = 0;
    var toks = fold(q).split(" ").filter(Boolean), ltoks = low(q).split(" ").filter(Boolean);
    function take(a, len) { if (len > bl) { best = a; bl = len; } }
    /* các đoạn từ là tên tỉnh/tỉnh cũ/khu có trong câu: keys không được cắt ngang đoạn này */
    var spans = [];
    function addSpan(words) {
      if (!words.length) return;
      for (var i = 0; i + words.length <= toks.length; i++) {
        var ok = true;
        for (var j = 0; j < words.length; j++) if (toks[i + j] !== words[j]) { ok = false; break; }
        if (ok) spans.push([i, i + words.length]);
      }
    }
    if (typeof PROV_DATA !== "undefined") PROV_DATA.forEach(function (p) { addSpan(fold(p.name).split(" ")); });
    if (typeof SAP_NHAP !== "undefined") Object.keys(SAP_NHAP).forEach(function (id) { SAP_NHAP[id].forEach(function (o) { addSpan(fold(o).split(" ")); }); });
    KHU_VUC.forEach(function (a) { a.exact.forEach(function (e) { addSpan(fold(e).split(" ")); }); });
    /* đoạn khớp [s,e) cắt ngang tên khi giao nhau mà không bao trọn tên đó. Khớp dài bao trọn 1 tên ngắn hơn
       thì không tính là cắt ngang: "Phan Thiết – Mũi Né" chứa trọn "Phan Thiết" (cũng là tên khu) vẫn phải khớp. */
    function catNgang(s, e) {
      for (var i = 0; i < spans.length; i++) { var sp = spans[i]; if (s < sp[1] && sp[0] < e && !(s <= sp[0] && sp[1] <= e)) return true; }
      return false;
    }
    function matchTokens(words, useLow) {
      var T = useLow ? ltoks : toks, out = [];
      if (!words.length) return out;
      for (var i = 0; i + words.length <= T.length; i++) {
        var ok = true;
        for (var j = 0; j < words.length; j++) if (T[i + j] !== words[j]) { ok = false; break; }
        if (ok) out.push([i, i + words.length]);
      }
      return out;
    }
    KHU_VUC.forEach(function (a) {
      a.exact.forEach(function (e) {
        if (!e || e.length < 3) return;
        var words = (marked ? low(e) : fold(e)).split(" ").filter(Boolean);
        matchTokens(words, marked).forEach(function (sp) { if (!catNgang(sp[0], sp[1])) take(a, e.length); });
      });
      a.keys.forEach(function (k) {
        if (!k) return;
        var words = fold(k).split(" ").filter(Boolean);
        matchTokens(words, false).forEach(function (sp) { if (!catNgang(sp[0], sp[1])) take(a, k.length); });
      });
      /* gõ liền cả tên thành 1 chữ: "quynhon", "phuquoc" */
      var one = f.trim();
      if (one.indexOf(" ") < 0 && one.length >= 5) a.exact.concat(a.keys).forEach(function (e) { if (e && fold(e).replace(/ /g, "") === one) take(a, one.length); });
    });
    return best;
  };
  function isIsle(x) { return !!(x && /(^|\s)(đảo|quần đảo|hòn|cù lao)(\s|$)/i.test(x.name) && !/bán đảo/i.test(x.name)); }
  window.btIsIsle = isIsle;
  function usable(x) { return !x.banned && !/tổng quan/i.test(x.name) && !/chỉ đi theo tour/i.test(x.name); }
  window.btAreaPlaces = function (a) {
    var p = P(a.prov); if (!p) return [];
    return p.places.filter(function (x) { return x.dist_from === a.hub && usable(x); });
  };
  function km(a, b, c, d) { var r = Math.PI / 180, x = Math.sin((c - a) * r / 2), y = Math.sin((d - b) * r / 2); return 12742 * Math.asin(Math.sqrt(x * x + Math.cos(a * r) * Math.cos(c * r) * y * y)); }
  window.btKm = km;
  /* Lịch quanh một điểm. center {lat,lng}; start: địa danh mở đầu (nếu có); area: khu (lấy địa danh của khu trước; khu đảo chỉ lấy điểm trên đảo) */
  window.btPointDays = function (prov, center, n, start, area) {
    var need = Math.max(2, 3 * n), pool = [], seen = {};
    function add(x) { if (x && !seen[x.id] && usable(x) && pool.length < need) { seen[x.id] = 1; pool.push(x); } }
    add(start);
    if (area) btAreaPlaces(area).slice().sort(function (a, b) {
      if ((a.lat == null) !== (b.lat == null)) return a.lat == null ? 1 : -1;
      return a.lat == null ? 0 : km(center.lat, center.lng, a.lat, a.lng) - km(center.lat, center.lng, b.lat, b.lng);
    }).forEach(add);
    var islandHub = (area && area.island) ? area.hub : ((start && start.island) || "");
    if (!islandHub && isIsle(start)) {
      /* chọn một hòn đảo: chỉ lấy điểm trên chính đảo đó (trong 15 km), ngày còn lại để tự do trên đảo */
      prov.places.forEach(function (x) { if (x.lat != null && start.lat != null && km(start.lat, start.lng, x.lat, x.lng) <= 15) add(x); });
    } else if (islandHub) {
      prov.places.forEach(function (x) { if (x.dist_from === islandHub) add(x); });
    } else {
      var cand = prov.places.filter(function (x) { return x.lat != null && !seen[x.id] && !x.island && usable(x); })
        .map(function (x) { return { x: x, d: km(center.lat, center.lng, x.lat, x.lng) }; })
        .sort(function (a, b) { return a.d - b.d; });
      [50, 80, 120, 160].some(function (R) { cand.forEach(function (c) { if (c.d <= R) add(c.x); }); return pool.length >= need; });
    }
    var has = pool.filter(function (x) { return x.lat != null; }), no = pool.filter(function (x) { return x.lat == null; }), order = [];
    if (has.length) {
      var cur = (start && start.lat != null) ? start : has.slice().sort(function (a, b) { return km(center.lat, center.lng, a.lat, a.lng) - km(center.lat, center.lng, b.lat, b.lng); })[0];
      has.splice(has.indexOf(cur), 1); order.push(cur);
      while (has.length) {
        var bi = 0, bd = 1e9;
        has.forEach(function (x, i) { var d = km(cur.lat, cur.lng, x.lat, x.lng); if (d < bd) { bd = d; bi = i; } });
        cur = has.splice(bi, 1)[0]; order.push(cur);
      }
    }
    order = order.concat(no);
    var per = Math.max(1, Math.min(3, Math.ceil(order.length / Math.max(1, n)))), SES = ["Sáng", "Chiều", "Tối"], days = [];
    for (var d = 0; d < n; d++) days.push(order.slice(d * per, d * per + per).map(function (x, i) { return { place: x, session: SES[i] || "Tự chọn" }; }));
    return days;
  };
  window.btAreaDays = function (a, n) { var p = P(a.prov); return p ? btPointDays(p, { lat: a.lat, lng: a.lng }, n, null, a) : []; };
  /* Tỉnh dùng để tính tiền đi. Khu có tuyến riêng: thay dòng tiền đi. Không có mà nơi đến cách thủ phủ
     trên 80 km: giữ tuyến tới thủ phủ nhưng gắn _farNote để app ghi rõ chưa cộng chặng còn lại. */
  window.btAreaCostProv = function (a, focus) {
    var p = P(a ? a.prov : focus && focus.prov); if (!p) return null;
    var o = {}; for (var k in p) o[k] = p[k];
    var isle = focus && focus.x && isIsle(focus.x) && !(a && a.island) ? " Chưa cộng vé tàu, thuyền ra " + focus.x.name.split(" (")[0] + "." : "";
    if (a && a.cost) {
      var stay = (p.cost || []).filter(function (c) { return (c.label || "").toLowerCase().indexOf("ở") === 0; });
      o.cost = a.cost.concat(stay);
      o._areaName = a.name;
      if (isle) o._farNote = isle.trim();
      return o;
    }
    var pt = focus && focus.x && focus.x.lat != null ? { lat: focus.x.lat, lng: focus.x.lng, name: focus.x.name } : (a ? { lat: a.lat, lng: a.lng, name: a.name } : null);
    if (pt && p.lat != null) {
      var d = Math.round(km(pt.lat, pt.lng, p.lat, p.lng));
      if (d > 80) o._farNote = "Tiền đi đang tính tới " + (p.anchor || p.name) + "; " + pt.name + " cách đó khoảng " + d + " km đường chim bay, chưa cộng chặng này.";
    }
    if (isle) o._farNote = ((o._farNote || "") + isle).trim();
    return o;
  };
})();
