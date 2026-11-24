/* Trung tâm du lịch để tính khoảng cách cho từng địa danh.
   Sau sáp nhập 01/07/2025 nhiều tỉnh rộng gấp đôi, gấp ba: tính từ thủ phủ tỉnh mới thì sai
   (Phú Quốc tính từ Châu Đốc, Côn Đảo tính từ Quận 1). File này gán mỗi địa danh vào trung tâm
   GẦN NHẤT trong tỉnh của nó (thủ phủ tỉnh mới + thành phố du lịch của tỉnh cũ), rồi tính lại km.
   Tọa độ trung tâm là tọa độ xấp xỉ khu trung tâm thành phố, đủ cho khoảng cách tham khảo.
   km là khoảng cách đường thẳng; đường bộ thực tế thường dài hơn 20–40%.
   island: true nghĩa là phải ra đảo bằng máy bay hoặc tàu, không đi đường bộ. */
var TRUNG_TAM = {
  "an-giang": [["Long Xuyên", 10.386, 105.435], ["Rạch Giá", 10.012, 105.081], ["Hà Tiên", 10.383, 104.488], ["Dương Đông (Phú Quốc)", 10.217, 103.959, 1]],
  "lam-dong": [["Phan Thiết", 10.928, 108.102], ["Gia Nghĩa", 12.004, 107.690], ["Bảo Lộc", 11.548, 107.807]],
  "gia-lai": [["Quy Nhơn", 13.776, 109.224]],
  "quang-tri": [],
  "quang-ngai": [["TP Kon Tum", 14.355, 108.008]],
  "tp-ho-chi-minh": [["TP Vũng Tàu", 10.346, 107.084], ["Thủ Dầu Một", 10.980, 106.652], ["Côn Đảo", 8.683, 106.609, 1]],
  "tuyen-quang": [["TP Hà Giang", 22.823, 104.984]],
  "phu-tho": [["Vĩnh Yên", 21.309, 105.604], ["TP Hòa Bình", 20.817, 105.338]],
  "lao-cai": [["Sa Pa", 22.336, 103.844], ["TP Yên Bái", 21.722, 104.911]],
  "can-tho": [["TP Sóc Trăng", 9.603, 105.980], ["Vị Thanh", 9.784, 105.470]],
  "khanh-hoa": [["Phan Rang", 11.565, 108.988]],
  "dak-lak": [["Tuy Hòa", 13.088, 109.300]],
  "da-nang": [["Hội An", 15.880, 108.335], ["Tam Kỳ", 15.573, 108.474]],
  "dong-nai": [["Đồng Xoài", 11.535, 106.883]],
  "tay-ninh": [["Tân An", 10.535, 106.413]],
  "vinh-long": [["Bến Tre", 10.243, 106.375], ["Trà Vinh", 9.935, 106.345]],
  "dong-thap": [["Mỹ Tho", 10.360, 106.360]],
  "ca-mau": [["Bạc Liêu", 9.285, 105.724]],
  "ninh-binh": [["Phủ Lý", 20.541, 105.914], ["Nam Định", 20.434, 106.177]],
  "hai-phong": [["Hải Dương", 20.938, 106.331], ["Cát Bà", 20.727, 107.048, 1]],
  "hung-yen": [["Thái Bình", 20.446, 106.336]],
  "bac-ninh": [["Bắc Giang", 21.273, 106.195]],
  "thai-nguyen": [["Bắc Kạn", 22.147, 105.835]]
};
/* Điểm gần 1 khu theo đường chim bay nhưng đường bộ đi từ thủ phủ (Cần Giờ cách Vũng Tàu 1 vịnh biển, đi từ TP.HCM): giữ thủ phủ làm gốc */
var TRUNG_TAM_GIU = { "bs-rung-sac-can-gio": 1, "bs-bien-can-gio": 1, "dia-dao-cu-chi": 1 };
/* Tỉnh có km đường bộ kiểm tay từ thủ phủ cho điểm gốc (prov-data.js); điểm thêm sau (mã rh-, bs-, dm-) chưa có km kiểm tay
   nên tính đường thẳng từ thủ phủ. Quảng Trị: thủ phủ TP Đồng Hới (NQ 202/2025/QH15). */
var TRUNG_TAM_TINH_LAI = { "quang-tri": 1 };
(function () {
  if (typeof PROV_DATA === "undefined") return;
  function hav(a, b, c, d) { var R = 6371, r = Math.PI / 180, x = Math.sin((c - a) * r / 2), y = Math.sin((d - b) * r / 2); var h = x * x + Math.cos(a * r) * Math.cos(c * r) * y * y; return 2 * R * Math.asin(Math.sqrt(h)); }
  PROV_DATA.forEach(function (prov) {
    var anchor = prov.id === "lam-dong" ? "Đà Lạt" : (prov.anchor || prov.name);
    var hubs = [{ n: anchor, lat: prov.lat, lng: prov.lng, main: true }];
    (TRUNG_TAM[prov.id] || []).forEach(function (h) { hubs.push({ n: h[0], lat: h[1], lng: h[2], island: !!h[3] }); });
    prov.places.forEach(function (x) {
      x.dist_from = anchor;
      /* điểm chưa có tọa độ mà ghi sẵn khu (hub): gán khu theo tên, không tính km */
      if (x.lat == null && x.hub) { hubs.forEach(function (h) { if (h.n === x.hub && !h.main) { x.dist_from = h.n; x.dist = null; if (h.island) x.island = h.n; } }); return; }
      if (x.lat == null || prov.lat == null || TRUNG_TAM_GIU[x.id]) return;
      var best = null, bd = 1e9;
      /* trung tâm đảo chỉ nhận điểm trên chính đảo đó (trong 30 km): Nam Du không thuộc Phú Quốc */
      hubs.forEach(function (h) { var d = hav(x.lat, x.lng, h.lat, h.lng); if (h.island && d > 30) return; if (d < bd) { bd = d; best = h; } });
      if (!best || best.main) { /* gần thủ phủ nhất: giữ km đã kiểm tay */
        if (best && TRUNG_TAM_TINH_LAI[prov.id] && /^(rh|bs|dm)-/.test(x.id)) x.dist = Math.round(bd);
        return;
      }
      x.dist = Math.round(bd);
      x.dist_from = best.n;
      if (best.island) x.island = best.n;
    });
  });
})();
/* Nhãn khoảng cách dùng chung cho thẻ và trang chi tiết */
function placeDistLabel(x) {
  /* chưa có tọa độ thì không tin số km cũ (có thể tính từ mốc khác) */
  if (x.dist == null || x.dist === "" || ("lat" in x && x.lat == null)) return "Chưa có khoảng cách";
  var from = x.dist_from || "trung tâm";
  return x.dist === 0 ? ("Ngay trung tâm " + from) : ("Cách " + from + " ~" + x.dist + " km");
}
