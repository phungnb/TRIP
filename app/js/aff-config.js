/* BuiTrip — cấu hình liên kết Affiliate (tiếp thị liên kết).
   Mặc định TẮT: chưa có ID đối tác thì không hiện nút đặt dịch vụ nào trên giao diện.
   Muốn bật: đặt enabled=true rồi điền tiền tố URL tìm kiếm của từng đối tác.
   File này tôn trọng window.BTAFF đã có sẵn trước khi nạp (chỉ điền mặc định
   cho khóa chưa có) để test có thể bật bằng addInitScript mà không sửa file. */
var BTAFF = window.BTAFF = window.BTAFF || {};
(function () {
  function def(k, v) { if (BTAFF[k] === undefined) BTAFF[k] = v; }
  def("enabled", false);
  /* Tiền tố URL tìm kiếm của từng đối tác (điền khi có ID đối tác).
     Để rỗng "" = chưa có đối tác -> nút của đối tác đó không hiện. */
  def("agoda", "");
  def("traveloka", "");
  def("klook", "");
  def("vexere", "");
  def("NOTE", "Link đối tác, giá bạn trả không đổi");

  function on(partner) {
    return BTAFF.enabled === true && typeof BTAFF[partner] === "string" && BTAFF[partner] !== "";
  }
  /* URL an toàn: tiền tố đối tác + từ khóa đã encode. Trả "" khi tắt hoặc rỗng. */
  function link(partner, keyword) {
    if (!on(partner)) return "";
    return BTAFF[partner] + encodeURIComponent(String(keyword || "").trim());
  }
  function esc(s) { return String(s == null ? "" : s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;"); }
  /* Một nút phụ + dòng chú thích. Trả "" khi không có link (không để nút chết). */
  function btn(url, label) {
    if (!url) return "";
    return '<a class="aff-btn" href="' + esc(url) + '" target="_blank" rel="noopener noreferrer sponsored">' + esc(label) + ' ↗</a>' +
      '<p class="aff-note">' + esc(BTAFF.NOTE) + '</p>';
  }
  /* Chỗ ở: Agoda, fallback Traveloka. Từ khóa: tên chỗ ở + tên tỉnh. */
  BTAFF.stayBtn = function (prov, stay) {
    var kw = (stay && stay.name || "") + " " + (prov && prov.name || "");
    return btn(link("agoda", kw) || link("traveloka", kw), "Xem giá phòng hôm nay");
  };
  /* Địa điểm có thu phí: Klook. Ẩn hẳn khi trường giá chứa "miễn phí". */
  BTAFF.ticketBtn = function (prov, place) {
    if (/miễn phí/i.test(String(place && place.price || ""))) return "";
    var kw = (place && place.name || "") + " " + (prov && prov.name || "");
    return btn(link("klook", kw), "Kiểm tra vé tham quan");
  };
  /* Bước 4 wizard: VeXeRe (vé xe), fallback Traveloka (vé máy bay).
     Chưa chọn điểm xuất phát thì từ khóa chỉ có tên điểm đến. */
  BTAFF.transportBtn = function (origin, destName) {
    var kw = origin ? (origin + " - " + destName) : destName;
    return btn(link("vexere", kw) || link("traveloka", kw), "Tìm vé xe / máy bay");
  };
  BTAFF.on = on;
  BTAFF.link = link;
})();
