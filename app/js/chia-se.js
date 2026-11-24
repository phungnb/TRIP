/* Soi lần 2, mục 9: nút Chia sẻ, Báo sai gửi ngay trong app, link sâu #/tinh/…, nhắc sao lưu.
   Nạp sau app.js và tro-ly.js. */
(function () {
  function base() { return location.origin + location.pathname; }
  var KIND_PATH = { pplace: "dia-danh", pdish: "mon", pstay: "cho-o" };
  function findItem(kind, provId, itemId) {
    var p = provById(provId); if (!p) return null;
    var arr = kind === "pplace" ? p.places : (kind === "pstay" ? p.stays : p.dishes), it = null;
    arr.forEach(function (x) { if (x.id === itemId) it = x; });
    return it;
  }

  /* ---------- Chia sẻ ---------- */
  function copyText(t) {
    if (navigator.clipboard && navigator.clipboard.writeText) return navigator.clipboard.writeText(t);
    return new Promise(function (ok, no) {
      try {
        var i = document.createElement("textarea"); i.value = t; i.setAttribute("readonly", ""); i.style.position = "fixed"; i.style.opacity = "0";
        document.body.appendChild(i); i.select(); var r = document.execCommand("copy"); document.body.removeChild(i); r ? ok() : no();
      } catch (e) { no(e); }
    });
  }
  window.btShare = function (title, hash) {
    var url = base() + (hash || "");
    if (window.btTrack) btTrack("chia_se", {});
    if (navigator.share) { navigator.share({ title: title, text: title + " · cẩm nang BuiTrip", url: url }).catch(function () {}); return; }
    copyText(url).then(function () { toast("Đã chép link, dán vào Zalo hoặc Messenger để gửi"); },
      function () { toast("Chưa chép được, link: " + url); });
  };
  window.btShareItem = function (kind, provId, itemId) {
    var it = findItem(kind, provId, itemId), p = provById(provId);
    btShare((it ? it.name : "") + (p ? " · " + p.name : ""), "#/tinh/" + provId + "/" + KIND_PATH[kind] + "/" + itemId);
  };
  window.btShareProv = function (provId) {
    var p = provById(provId); btShare("Cẩm nang " + (p ? p.name : ""), "#/tinh/" + provId);
  };
  var SHARE_ICON = '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" style="vertical-align:-3px;margin-right:6px"><circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><path d="m8.6 13.5 6.8 4M15.4 6.5l-6.8 4"/></svg>';
  window.shareBtnHtml = function (onclick) {
    return '<button class="btn btn-ghost btn-block" style="margin-top:10px" onclick="' + onclick + '">' + SHARE_ICON + 'Chia sẻ</button>';
  };
  var _actions = window.provItemActionsHtml;
  if (typeof _actions === "function") {
    window.provItemActionsHtml = provItemActionsHtml = function (kind, provId, itemId) {
      var h = _actions(kind, provId, itemId), cut = h.indexOf("</div>") + 6;
      return h.slice(0, cut) + shareBtnHtml("btShareItem('" + kind + "','" + provId + "','" + itemId + "')") + h.slice(cut);
    };
  }

  /* ---------- Gửi nhanh (không cần đăng nhập): gửi ngay trong app (mục Hỗ trợ) ----------
     Nút "Gửi đóng góp" (cần đăng nhập, theo dõi được) do dong-gop.js chèn trước nút này.
     Đổi tên nút này để khỏi trùng nhãn với "Gửi đóng góp". ---------- */
  window.tlReport = function (kind, provId, itemId) {
    var p = provById(provId), it = findItem(kind, provId, itemId);
    var label = kind === "pplace" ? "Địa danh" : (kind === "pstay" ? "Chỗ ở" : "Món ăn");
    var txt = "Gửi đóng góp\nTỉnh/thành: " + (p ? p.name : provId) + "\n" + label + ": " + (it ? it.name : itemId) + " (mã: " + itemId + ")\n" +
      "App đang ghi sai ở đâu (giá, giờ, địa chỉ...): \nThông tin đúng là: \nNguồn (link, ảnh bảng giá, hoặc 'tôi là chủ cơ sở'): ";
    if (typeof window.tlOpen !== "function") { location.href = reportMailto("[Cẩm nang] Gửi đóng góp", txt.split("\n")); return; }
    tlOpen("ht");
    var m = document.getElementById("tlMsg");
    if (m) { m.value = txt; m.focus(); try { var k = txt.indexOf("(giá, giờ, địa chỉ...): ") + 24; m.setSelectionRange(k, k); } catch (e) {} }
  };
  window.reportLinkHtml = reportLinkHtml = function (kind, provId, itemId) {
    if (!provById(provId)) return "";
    return '<button class="btn btn-ghost btn-block" style="margin-top:10px" onclick="tlReport(\'' + kind + '\',\'' + provId + '\',\'' + itemId + '\')">Gửi nhanh (không cần đăng nhập)</button>' +
      '<p class="small" style="margin:6px 0 0">Gửi ngay trong app, không cần đăng nhập; đội BuiTrip trả lời ở mục Hỗ trợ của nút Hỏi. Chủ cơ sở muốn sửa thông tin cũng gửi qua đây, hoặc thư tới ' + esc(SUPPORT_EMAIL) + '.</p>';
  };

  /* ---------- Link sâu: #/tinh/<tỉnh> và #/tinh/<tỉnh>/<dia-danh|mon|cho-o>/<mã> ---------- */
  var RE = /^#\/tinh\/([a-z0-9-]+)(?:\/(dia-danh|mon|cho-o)\/([a-z0-9-]+))?$/;
  function route(h) {
    var m = RE.exec(h || ""); if (!m || !provById(m[1])) return false;
    if (!m[2]) { openProvDetail(m[1]); return true; }
    var kind = { "dia-danh": "pplace", mon: "pdish", "cho-o": "pstay" }[m[2]];
    if (!findItem(kind, m[1], m[3])) { openProvDetail(m[1]); return true; }
    openProvDetail(m[1]);
    if (kind === "pplace") openProvPlace(m[1], m[3]); else if (kind === "pdish") openProvDish(m[1], m[3]); else openProvStay(m[1], m[3]);
    return true;
  }
  /* Tab đang mở mà dán link mới vào thanh địa chỉ: trước đây không tải tỉnh cho tới khi tải lại trang */
  window.btRouteHash = route;
  window.addEventListener("hashchange", function () { if (location.hash && location.hash !== viewHash()) route(location.hash); });
  /* Mở app bằng link tới 1 địa danh (link tỉnh đã do app.js mở) */
  if (typeof startHash === "string" && RE.test(startHash) && RE.exec(startHash)[2]) route(startHash);

  /* ---------- Nhắc sao lưu ---------- */
  var KB = "bt_backup_at";
  function lastBackup() { try { return JSON.parse(localStorage.getItem(KB) || "null"); } catch (e) { return null; } }
  var _export = window.exportTrips;
  if (typeof _export === "function") {
    window.exportTrips = function () {
      _export.apply(this, arguments);
      try { localStorage.setItem(KB, JSON.stringify({ at: Date.now(), n: trips.length })); } catch (e) {}
      if (typeof renderTrips === "function") renderTrips();
    };
  }
  window.backupDue = function () {
    if (!trips || !trips.length) return false;
    var b = lastBackup();
    return !b || trips.length > (b.n || 0) || Date.now() - (b.at || 0) > 14 * 86400000;
  };
  var _renderTrips = window.renderTrips;
  if (typeof _renderTrips === "function") {
    window.renderTrips = renderTrips = function () {
      _renderTrips.apply(this, arguments);
      if (!backupDue()) return;
      var wrap = document.getElementById("tripListWrap"); if (!wrap) return;
      var b = lastBackup(), d = document.createElement("div");
      d.className = "notebox backup-due"; d.style.marginBottom = "12px";
      d.innerHTML = "<b>" + (b ? "Có chuyến mới chưa sao lưu" : "Chưa sao lưu chuyến nào") + "</b><br/><span class=\"small\">" + trips.length +
        " chuyến chỉ nằm trong trình duyệt này; đổi máy hoặc xóa dữ liệu trình duyệt là mất.</span>" +
        '<div style="margin-top:8px"><button class="btn btn-ghost" onclick="exportTrips()">Tải file sao lưu</button></div>';
      var h = wrap.querySelector(".sec-sub") || wrap.firstChild;
      if (h && h.nextSibling) wrap.insertBefore(d, h.nextSibling); else wrap.appendChild(d);
    };
    try { renderTrips(); } catch (e) {}
  }
})();
