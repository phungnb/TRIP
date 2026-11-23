/* Khu du lịch nằm trong tỉnh mới sau sáp nhập 01/07/2025 nhưng xa thủ phủ tỉnh
   (Quy Nhơn thuộc Gia Lai nhưng cách Pleiku ~170 km). Dữ liệu tỉnh tính lịch trình và tiền đi
   theo thủ phủ, nên tìm "Quy Nhơn" rồi lập kế hoạch sẽ ra lịch Pleiku. File này cho tìm kiếm
   và lập kế hoạch hiểu từng khu:
   - hub: tên trung tâm trong TRUNG_TAM (trung-tam.js); địa danh có dist_from = hub là địa danh của khu.
   - keys: cách gõ thường gặp (đã bỏ dấu, chữ thường), ngoài tên khu.
   - cost: tiền đi khứ hồi 1 người tới khu, theo đúng quy ước bảng cost của tỉnh
     (dòng đầu = từ TP.HCM; dòng "Nếu đi từ Hà Nội … thay máy bay …" = từ Hà Nội).
     Không có cost thì dùng bảng của tỉnh (khu gần thủ phủ, cùng sân bay).
     Giá vé ở đây là ƯỚC TÍNH, CHƯA KIỂM với hãng; ghi rõ trong nhãn. */
var KHU_VUC = [
  { id: "quy-nhon", prov: "gia-lai", name: "Quy Nhơn", old: "Bình Định", hub: "Quy Nhơn", keys: ["quy nhon", "binh dinh"],
    cost: [
      { label: "Máy bay SG–Quy Nhơn (Phù Cát) khứ hồi (ước tính, chưa kiểm)", value: "1.600.000–3.200.000đ" },
      { label: "Nếu đi từ Hà Nội: máy bay HN–Quy Nhơn khứ hồi thay máy bay SG (ước tính, chưa kiểm)", value: "2.000.000–4.000.000đ" }
    ] },
  { id: "phan-thiet", prov: "lam-dong", name: "Phan Thiết – Mũi Né", old: "Bình Thuận", hub: "Phan Thiết", keys: ["phan thiet", "mui ne", "binh thuan"],
    cost: [
      { label: "Tàu hỏa hoặc xe khách SG–Phan Thiết khứ hồi (ước tính, chưa kiểm)", value: "300.000–700.000đ" },
      { label: "Nếu đi từ Hà Nội: máy bay HN–SG khứ hồi + xe đi Phan Thiết, thay máy bay SG (ước tính, chưa kiểm)", value: "2.300.000–4.500.000đ" }
    ] },
  { id: "vung-tau", prov: "tp-ho-chi-minh", name: "Vũng Tàu", old: "Bà Rịa – Vũng Tàu", hub: "TP Vũng Tàu", keys: ["vung tau", "ba ria"],
    cost: [
      { label: "Xe khách hoặc tàu cao tốc SG–Vũng Tàu khứ hồi (ước tính, chưa kiểm)", value: "300.000–700.000đ" },
      { label: "Nếu đi từ Hà Nội: máy bay HN–SG khứ hồi + xe đi Vũng Tàu, thay máy bay SG (ước tính, chưa kiểm)", value: "2.300.000–4.300.000đ" }
    ] },
  { id: "con-dao", prov: "tp-ho-chi-minh", name: "Côn Đảo", old: "Bà Rịa – Vũng Tàu", hub: "Côn Đảo", keys: ["con dao"],
    cost: [
      { label: "Máy bay SG–Côn Đảo khứ hồi (ước tính, chưa kiểm)", value: "2.500.000–5.000.000đ" },
      { label: "Nếu đi từ Hà Nội: máy bay HN–Côn Đảo khứ hồi thay máy bay SG (ước tính, chưa kiểm)", value: "4.000.000–7.000.000đ" }
    ] },
  { id: "phu-quoc", prov: "an-giang", name: "Phú Quốc", old: "Kiên Giang", hub: "Dương Đông (Phú Quốc)", keys: ["phu quoc", "duong dong"],
    cost: [
      { label: "Máy bay SG–Phú Quốc khứ hồi (ước tính, chưa kiểm)", value: "1.400.000–3.000.000đ" },
      { label: "Nếu đi từ Hà Nội: máy bay HN–Phú Quốc khứ hồi thay máy bay SG (ước tính, chưa kiểm)", value: "2.400.000–4.500.000đ" }
    ] },
  { id: "ha-giang", prov: "tuyen-quang", name: "Hà Giang", old: "Hà Giang", hub: "TP Hà Giang", keys: ["ha giang", "dong van", "meo vac"],
    cost: [
      { label: "Máy bay SG–HN khứ hồi + xe khách HN–Hà Giang khứ hồi (ước tính, chưa kiểm)", value: "2.600.000–4.800.000đ" },
      { label: "Nếu đi từ Hà Nội: xe khách HN–Hà Giang khứ hồi thay máy bay SG (ước tính, chưa kiểm)", value: "500.000–900.000đ" }
    ] },
  { id: "phong-nha", prov: "quang-tri", name: "Đồng Hới – Phong Nha", old: "Quảng Bình", hub: "Đồng Hới", keys: ["dong hoi", "phong nha", "quang binh"],
    cost: [
      { label: "Máy bay SG–Đồng Hới khứ hồi (ước tính, chưa kiểm)", value: "1.600.000–3.200.000đ" },
      { label: "Nếu đi từ Hà Nội: máy bay HN–Đồng Hới khứ hồi thay máy bay SG (ước tính, chưa kiểm)", value: "1.400.000–3.000.000đ" }
    ] },
  { id: "hoi-an", prov: "da-nang", name: "Hội An", old: "Quảng Nam", hub: "Hội An", keys: ["hoi an", "quang nam"] },
  { id: "tuy-hoa", prov: "dak-lak", name: "Tuy Hòa", old: "Phú Yên", hub: "Tuy Hòa", keys: ["tuy hoa", "phu yen"],
    cost: [
      { label: "Máy bay SG–Tuy Hòa khứ hồi (ước tính, chưa kiểm)", value: "1.500.000–3.000.000đ" },
      { label: "Nếu đi từ Hà Nội: máy bay HN–Tuy Hòa khứ hồi thay máy bay SG (ước tính, chưa kiểm)", value: "2.000.000–4.000.000đ" }
    ] },
  { id: "kon-tum", prov: "quang-ngai", name: "Kon Tum – Măng Đen", old: "Kon Tum", hub: "TP Kon Tum", keys: ["kon tum", "mang den"],
    cost: [
      { label: "Máy bay SG–Pleiku khứ hồi + xe Pleiku–Kon Tum (ước tính, chưa kiểm)", value: "2.000.000–3.700.000đ" },
      { label: "Nếu đi từ Hà Nội: máy bay HN–Pleiku khứ hồi + xe Pleiku–Kon Tum, thay máy bay SG (ước tính, chưa kiểm)", value: "2.400.000–4.500.000đ" }
    ] },
  { id: "phan-rang", prov: "khanh-hoa", name: "Phan Rang – Vĩnh Hy", old: "Ninh Thuận", hub: "Phan Rang", keys: ["phan rang", "ninh thuan", "ninh chu"],
    cost: [
      { label: "Máy bay SG–Cam Ranh khứ hồi + xe đi Phan Rang (ước tính, chưa kiểm)", value: "1.500.000–3.000.000đ" },
      { label: "Nếu đi từ Hà Nội: máy bay HN–Cam Ranh khứ hồi + xe đi Phan Rang, thay máy bay SG (ước tính, chưa kiểm)", value: "2.200.000–4.300.000đ" }
    ] },
  { id: "cat-ba", prov: "hai-phong", name: "Cát Bà", old: "", hub: "Cát Bà", keys: ["cat ba"] }
];
(function () {
  function fold(s) { return String(s || "").toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "").replace(/đ/g, "d").replace(/[^a-z0-9]+/g, " ").trim(); }
  function prov(a) { return typeof provById === "function" ? provById(a.prov) : null; }
  window.btAreaById = function (id) { for (var i = 0; i < KHU_VUC.length; i++) if (KHU_VUC[i].id === id) return KHU_VUC[i]; return null; };
  /* Khu khớp câu gõ: câu gõ chứa nguyên tên hoặc một key (theo từ) */
  window.btAreaFor = function (q) {
    var f = " " + fold(q) + " ", best = null, bl = 0;
    KHU_VUC.forEach(function (a) {
      [fold(a.name)].concat(a.keys || []).forEach(function (k) {
        if (k && f.indexOf(" " + k + " ") >= 0 && k.length > bl) { best = a; bl = k.length; }
      });
    });
    return best;
  };
  /* Địa danh của khu: đi được trong chuyến thường (bỏ mục tổng quan và mục chỉ đi theo tour giá chục triệu) */
  window.btAreaPlaces = function (a) {
    var p = prov(a); if (!p) return [];
    return p.places.filter(function (x) {
      if (x.dist_from !== a.hub) return false;
      if (/tổng quan/i.test(x.name) || /chỉ đi theo tour/i.test(x.name)) return false;
      return true;
    });
  };
  /* Tỉnh "ảo" để tính tiền đi: giữ id tỉnh (để nhận biết cùng tỉnh), thay dòng tiền đi bằng tuyến tới khu */
  window.btAreaCostProv = function (a) {
    var p = prov(a); if (!p) return null;
    if (!a.cost) return p;
    var stay = (p.cost || []).filter(function (c) { return (c.label || "").toLowerCase().indexOf("ở") === 0; });
    var o = {}; for (var k in p) o[k] = p[k];
    o.cost = a.cost.concat(stay);
    return o;
  };
  /* Lịch theo ngày từ địa danh của khu: điểm nổi bật trước, rồi nối điểm gần nhau (láng giềng gần nhất) */
  function km(a, b) { var r = Math.PI / 180, x = Math.sin((b.lat - a.lat) * r / 2), y = Math.sin((b.lng - a.lng) * r / 2); return 12742 * Math.asin(Math.sqrt(x * x + Math.cos(a.lat * r) * Math.cos(b.lat * r) * y * y)); }
  window.btAreaDays = function (a, n) {
    var list = btAreaPlaces(a).slice(), has = list.filter(function (x) { return x.lat != null; }), no = list.filter(function (x) { return x.lat == null; });
    var order = [];
    if (has.length) {
      var cur = has.shift(); order.push(cur);
      while (has.length) {
        var bi = 0, bd = 1e9;
        has.forEach(function (x, i) { var d = km(cur, x); if (d < bd) { bd = d; bi = i; } });
        cur = has.splice(bi, 1)[0]; order.push(cur);
      }
    }
    order = order.concat(no);
    var per = Math.max(2, Math.min(3, Math.ceil(order.length / Math.max(1, n))));
    var SES = ["Sáng", "Trưa", "Chiều", "Tối"], days = [];
    for (var d = 0; d < n; d++) {
      var chunk = order.slice(d * per, d * per + per);
      days.push(chunk.map(function (x, i) { return { place: x, session: SES[Math.min(i, SES.length - 1)] }; }));
    }
    return days;
  };
})();
