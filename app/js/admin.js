/* Trang admin BuiTrip: #/admin (hoặc /admin chuyển về đây).
   3 thẻ: Duyệt đóng góp (lọc trạng thái, loại; duyệt/từ chối hàng loạt; "Nhập vào app" 1 chạm),
          Sửa dữ liệu (tìm mọi địa danh, món, chỗ ở, tuyến đi đến, đi lại; sửa mọi trường; thêm; ẩn/hiện; xóa 2 bước),
          Nhật ký (ai sửa, mục nào, trường nào, cũ -> mới, lúc nào; quay lại giá trị trước).
   Quyền kiểm ở server: mọi lệnh ghi là RPC có is_admin() (neon/003_admin_du_lieu.sql). Tài khoản thường mở trang thì
   chỉ thấy "Không có quyền duyệt", không có dữ liệu nào được trả về.
   Sửa xong: áp ngay trên máy này (BTSua.put) và có trên mọi máy khi họ mở app (bộ đệm /api/du-lieu 30 giây). */
(function () {
  if (typeof document === "undefined") return;
  var DG = function () { return window.BTDG; };
  var client = null, rowsOv = {}, tab = "duyet", st = { status: "cho_duyet", kind: "", prov: "", ek: "place", from: "sg", q: "" }, contribs = [], sel = {};
  var KIND_LBL = { place: "Địa danh", dish: "Món ăn", stay: "Chỗ ở", route: "Đi đến (tuyến)", local: "Đi lại trong tỉnh" };
  var FROM_LBL = { sg: "Từ TP.HCM", hn: "Từ Hà Nội", dn: "Từ Đà Nẵng" };
  var DONG = [["", "Đang mở"], ["tam_dong", "Tạm đóng"], ["dong_han", "Đóng hẳn"]];
  /* Trường sửa được theo loại mục: [khóa, nhãn, kiểu] (khớp bt_check_field ở server) */
  var FIELDS = {
    place: [["name", "Tên"], ["address", "Địa chỉ"], ["price", "Giá vé"], ["hours", "Giờ mở cửa"], ["duration", "Thời gian tham quan"], ["suitable", "Hợp với"], ["note", "Mô tả, cách đi, lưu ý", "dai"], ["lat", "Vĩ độ", "so"], ["lng", "Kinh độ", "so"], ["closed", "Trạng thái", "dong"]],
    stay: [["name", "Tên"], ["kind", "Loại / hạng"], ["address", "Địa chỉ"], ["price", "Giá/đêm"], ["phone", "Số điện thoại"], ["dist", "Khoảng cách"], ["suitable", "Hợp với, tiện ích"], ["note", "Ghi chú", "dai"], ["closed", "Trạng thái", "dong"]],
    dish: [["name", "Tên món"], ["meal", "Bữa / loại"], ["price", "Giá"], ["desc", "Mô tả", "dai"], ["restaurants", "Quán (mỗi dòng: Tên | Địa chỉ | Giá)", "quan"], ["closed", "Trạng thái", "dong"]],
    route: [["from", "Nơi đi", "from"], ["mode", "Phương tiện"], ["time", "Thời gian"], ["price", "Giá"], ["note", "Ghi chú, đơn vị, tần suất", "dai"], ["closed", "Trạng thái", "dong"]],
    local: [["mode", "Phương tiện"], ["price", "Giá"], ["req", "Cần gì (giấy tờ...)"], ["note", "Ghi chú", "dai"], ["closed", "Trạng thái", "dong"]]
  };
  function esc(s) { return String(s == null ? "" : s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#39;"); }
  function provById(id) { for (var i = 0; i < PROV_DATA.length; i++) if (PROV_DATA[i].id === id) return PROV_DATA[i]; return null; }
  function fold(s) { return String(s || "").toLowerCase().replace(/đ/g, "d").normalize("NFD").replace(/[\u0300-\u036f]/g, ""); }
  function slug(s) { return fold(s).replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "").slice(0, 60) || "muc"; }
  function toast_(m) { if (typeof toast === "function") toast(m); }
  function vnd(n) { return n == null ? "" : Number(n).toLocaleString("vi-VN"); }
  function errMsg(e) { var m = String((e && e.message) || e || "Lỗi"); return m.replace(/^.*?(?=[A-ZĐÀ-Ỹ][a-zà-ỹ])/, "") || m; }
  function rpc(name, args) {
    return client.rpc(name, args || {}).then(function (r) { if (r.error) throw new Error(r.error.message); return r.data; });
  }

  /* ---------- khung trang ---------- */
  function root() {
    var v = document.getElementById("admView");
    if (!v) {
      v = document.createElement("div"); v.id = "admView"; v.className = "adm"; v.setAttribute("role", "dialog"); v.setAttribute("aria-modal", "true"); v.setAttribute("aria-labelledby", "admTitle");
      document.body.appendChild(v);
    }
    return v;
  }
  function frame(body) {
    var tabs = [["duyet", "Duyệt đóng góp"], ["sua", "Sửa dữ liệu"], ["tinh", "Thông tin tỉnh"], ["hoc", "Định hướng học"], ["nk", "Nhật ký"], ["qtv", "Quản trị viên"]];
    root().innerHTML = '<div class="adm-in"><div class="adm-top"><h2 id="admTitle">Trang admin</h2><button class="btn btn-ghost" onclick="btAdminClose()">Đóng</button></div>' +
      '<div class="chiprow chiprow-scroll adm-tabs">' + tabs.map(function (t) { return '<button class="chip' + (tab === t[0] ? " on" : "") + '" onclick="btAdminTab(\'' + t[0] + '\')">' + t[1] + '</button>'; }).join("") + '</div>' +
      '<div id="admBody">' + body + '</div></div>';
  }
  function only(html) { root().innerHTML = '<div class="adm-in"><div class="adm-top"><h2 id="admTitle">Trang admin</h2><button class="btn btn-ghost" onclick="btAdminClose()">Đóng</button></div>' + html + '</div>'; }
  function body(html) { var b = document.getElementById("admBody"); if (b) b.innerHTML = html; else frame(html); }
  function loading(t) { body('<p class="muted">' + esc(t || "Đang tải…") + '</p>'); }
  function fail(e) { body('<p class="dg-err" role="alert">' + esc(errMsg(e)) + '</p>'); }

  window.btAdminOpen = function () {
    document.documentElement.classList.add("adm-open");
    only('<p class="muted">Đang kiểm tra quyền…</p>');
    var dg = DG(); if (!dg) { only('<p class="dg-err">Chưa tải được phần đăng nhập.</p>'); return; }
    dg.refreshMe().then(function (u) {
      if (!u) { only('<p>Cần đăng nhập tài khoản admin.</p><button class="btn btn-primary" onclick="BTDG.needLogin({t:\'trang-admin\'})">Đăng nhập</button>'); return; }
      if (!dg.isAdmin()) { only('<h3>Không có quyền duyệt</h3><p class="muted">Tài khoản ' + esc(u.email || u.name || "") + ' chưa được cấp quyền admin.</p>'); return; }
      return dg.sdk().then(function (c) { client = c; tab = "duyet"; frame(""); show(); });
    }).catch(function (e) { only('<p class="dg-err" role="alert">' + esc(errMsg(e)) + '</p>'); });
  };
  window.btAdminClose = function () {
    var v = document.getElementById("admView"); if (v) v.remove();
    document.documentElement.classList.remove("adm-open");
    if (location.hash === "#/admin") history.replaceState(null, "", location.pathname + location.search);
  };
  window.btAdminTab = function (t) { tab = t; frame(""); show(); };
  function show() { if (tab === "duyet") listContrib(); else if (tab === "sua") listItems(); else if (tab === "tinh") listTinh(); else if (tab === "qtv") listAdmins(); else if (tab === "hoc") listHoc(); else listAudit(); }

  /* bản sửa hiện có (kể cả mục ẩn, đã xóa) */
  function loadOv() {
    return rpc("admin_overrides").then(function (rows) { rowsOv = {}; (rows || []).forEach(function (r) { rowsOv[r.prov_id + "|" + r.kind + "|" + r.item_id] = r; }); return rows; });
  }

  /* ================= Duyệt đóng góp ================= */
  function kindLbl(k) { var K = DG().KINDS; for (var i = 0; i < K.length; i++) if (K[i][0] === k) return K[i][1]; return k; }
  function listContrib() {
    loading();
    rpc("admin_contributions", { p_status: st.status || null }).then(function (rows) {
      contribs = rows || []; sel = {};
      var STS = [["cho_duyet", "Chờ duyệt"], ["da_duyet", "Đã duyệt"], ["da_nhap", "Đã nhập"], ["tu_choi", "Từ chối"], ["", "Tất cả"]];
      var KS = [["", "Mọi loại"]].concat(DG().KINDS);
      var L = contribs.filter(function (x) { return !st.kind || x.kind === st.kind; });
      body('<div class="chiprow chiprow-scroll">' + STS.map(function (t) { return '<button class="chip' + (st.status === t[0] ? " on" : "") + '" onclick="btAdmSt(\'status\',\'' + t[0] + '\')">' + t[1] + '</button>'; }).join("") + '</div>' +
        '<div class="field" style="margin:8px 0"><label for="admKind">Loại đóng góp</label><select id="admKind" onchange="btAdmSt(\'kind\',this.value)">' + KS.map(function (k) { return '<option value="' + k[0] + '"' + (st.kind === k[0] ? " selected" : "") + '>' + esc(k[1]) + '</option>'; }).join("") + '</select></div>' +
        (L.length ? '<div class="adm-bulk"><label class="small"><input type="checkbox" onchange="btAdmSelAll(this.checked)"> Chọn tất cả (' + L.length + ')</label>' +
          '<input id="admBulkNote" maxlength="1000" placeholder="Lý do (bắt buộc khi từ chối)"><button class="btn btn-ghost" onclick="btAdmBulk(\'da_duyet\')">Duyệt đã chọn</button><button class="btn btn-ghost" onclick="btAdmBulk(\'tu_choi\')">Từ chối đã chọn</button></div>' : '') +
        (L.length ? '<div class="dg-list">' + L.map(contribHtml).join("") + '</div>' : '<p class="muted">Không có đóng góp nào ở mục này.</p>'));
    }).catch(fail);
  }
  function dataLines(d) {
    if (!d) return "";
    var N = { ten: "Tên", quan: "Quán", dia_chi: "Địa chỉ", loai: "Loại", tu: "Từ", den: "Đến", gia_tu: "Giá từ", gia_den: "Giá đến", gio: "Giờ", thoi_gian: "Thời gian", tan_suat: "Tần suất", don_vi: "Đơn vị", tien_ich: "Tiện ích", mo_ta: "Mô tả", vi_sao: "Vì sao nên đi", lat: "Vĩ độ", lng: "Kinh độ", link: "Link" };
    return '<ul class="small adm-kv">' + Object.keys(d).map(function (k) { var v = d[k]; return '<li><b>' + esc(N[k] || k) + ':</b> ' + (k === "link" ? '<a href="' + esc(v) + '" target="_blank" rel="noopener nofollow">' + esc(v) + '</a>' : esc(/^gia_/.test(k) ? vnd(v) + "đ" : v)) + '</li>'; }).join("") + '</ul>';
  }
  function contribHtml(x) {
    var i = contribs.indexOf(x), p = provById(x.prov_id), F = DG().FIELDS, fl = "";
    for (var j = 0; j < F.length; j++) if (F[j][0] === x.field) fl = F[j][1];
    var done = x.status === "da_nhap";
    return '<div class="dg-item"><div class="dg-top"><label><input type="checkbox" ' + (done ? "disabled" : "") + ' onchange="btAdmSel(' + i + ',this.checked)"> <b>' + esc(x.place_name || "(chưa có tên)") + ' · ' + esc(p ? p.name : x.prov_id) + '</b></label><span class="dg-st st-' + esc(x.status) + '">' + esc(DG().ST[x.status] || x.status) + '</span></div>' +
      '<p class="small">' + esc(kindLbl(x.kind)) + (fl ? ' · ' + esc(fl) : '') + (x.place_id ? ' · mã ' + esc(x.place_id) : '') + ' · ' + esc(DG().fmtTime(x.created_at)) + '<br>Người gửi: ' + esc(x.author_name || "") + ' &lt;' + esc(x.author_email || "") + '&gt;</p>' +
      (x.data ? dataLines(x.data) : '<p>' + esc(x.value) + '</p>') + (x.source_url && !(x.data && x.data.link) ? '<p class="small">Nguồn: <a href="' + esc(x.source_url) + '" target="_blank" rel="noopener nofollow">' + esc(x.source_url) + '</a></p>' : '') +
      (done ? (x.review_note ? '<p class="small"><b>Ghi chú:</b> ' + esc(x.review_note) + '</p>' : '') :
        '<textarea id="admNote' + i + '" rows="2" maxlength="1000" placeholder="Phản hồi cho người gửi (bắt buộc khi từ chối)">' + esc(x.review_note || "") + '</textarea>' +
        '<div class="dg-acts"><button class="btn btn-ghost" onclick="btAdmReview(' + i + ',\'tu_choi\')">Từ chối</button>' + (x.status !== "da_duyet" ? '<button class="btn btn-ghost" onclick="btAdmReview(' + i + ',\'da_duyet\')">Duyệt</button>' : '') +
        (x.kind === "anh" ? '<button class="btn btn-primary" onclick="btAdmPhoto(' + i + ')">Đã đưa ảnh vào app</button>' : '<button class="btn btn-primary" onclick="btAdmImport(' + i + ')">Nhập vào app</button>') + '</div>') + '</div>';
  }
  window.btAdmSt = function (k, v) { st[k] = v; listContrib(); };
  window.btAdmSel = function (i, on) { if (on) sel[i] = 1; else delete sel[i]; };
  window.btAdmSelAll = function (on) {
    sel = {}; document.querySelectorAll("#admBody .dg-item input[type=checkbox]").forEach(function (c) { if (!c.disabled) { c.checked = on; } });
    if (on) contribs.forEach(function (x, i) { if ((!st.kind || x.kind === st.kind) && x.status !== "da_nhap") sel[i] = 1; });
  };
  window.btAdmBulk = function (status) {
    var ids = Object.keys(sel).map(function (i) { return contribs[i] && contribs[i].id; }).filter(Boolean);
    if (!ids.length) return toast_("Chưa chọn mục nào");
    var note = (document.getElementById("admBulkNote") || {}).value || "";
    if (status === "tu_choi" && note.trim().length < 3) return toast_("Từ chối cần ghi lý do");
    rpc("admin_review_many", { p_ids: ids, p_status: status, p_note: note.trim() || null }).then(function (n) { toast_("Đã cập nhật " + n + " mục"); listContrib(); }).catch(function (e) { toast_(errMsg(e)); });
  };
  window.btAdmReview = function (i, status) {
    var x = contribs[i]; if (!x) return;
    var note = ((document.getElementById("admNote" + i) || {}).value || "").trim();
    if (status === "tu_choi" && note.length < 3) return toast_("Từ chối cần ghi lý do cho người gửi");
    rpc("admin_review_many", { p_ids: [x.id], p_status: status, p_note: note || null }).then(function () { toast_(DG().ST[status]); listContrib(); }).catch(function (e) { toast_(errMsg(e)); });
  };
  window.btAdmPhoto = function (i) {
    var x = contribs[i]; if (!x) return;
    var note = ((document.getElementById("admNote" + i) || {}).value || "").trim() || "Ảnh đã đưa vào app";
    client.from("contributions").update({ status: "da_nhap", review_note: note }).eq("id", x.id).then(function (r) { if (r.error) throw new Error(r.error.message); toast_("Đã nhập"); listContrib(); }).catch(function (e) { toast_(errMsg(e)); });
  };

  /* Đóng góp -> mở trình sửa đã điền sẵn; bấm Lưu là nhập vào app và đóng góp tự thành "Đã nhập" */
  var MAPF = { gia: "price", gio: "hours", dia_chi: "address", dien_thoai: "phone", cach_di: "note", mo_ta: "note", khac: "note" };
  function findKind(p, id) {
    var K = [["place", p.places], ["stay", p.stays], ["dish", p.dishes]];
    for (var i = 0; i < K.length; i++) for (var j = 0; j < (K[i][1] || []).length; j++) if (K[i][1][j].id === id) return K[i][0];
    var o = rowsOv; for (var k in o) if (o[k].prov_id === p.id && o[k].item_id === id) return o[k].kind;
    return "";
  }
  function giaTxt(d, unit) { if (d.gia_tu == null && d.gia_den == null) return ""; return (d.gia_tu != null && d.gia_den != null && d.gia_tu !== d.gia_den ? vnd(d.gia_tu) + "–" + vnd(d.gia_den) : vnd(d.gia_tu != null ? d.gia_tu : d.gia_den)) + "đ" + (unit || ""); }
  function lbl(arr, k) { for (var i = 0; i < arr.length; i++) if (arr[i][0] === k) return arr[i][1]; return k || ""; }
  window.btAdmImport = function (i) {
    var x = contribs[i]; if (!x) return;
    var p = provById(x.prov_id); if (!p) return toast_("Không thấy tỉnh " + x.prov_id);
    loadOv().then(function () {
      var d = x.data || {}, pre = {}, kind = "", id = "", isNew = false, from = "";
      if ((x.kind === "sua_thong_tin" || x.kind === "bao_loi") && x.place_id) {
        kind = findKind(p, x.place_id); id = x.place_id;
        if (!kind) return toast_("Không thấy mục " + x.place_id + " trong dữ liệu");
        if (x.kind === "bao_loi") { pre.closed = "tam_dong"; pre.note = x.value; }
        else { var f = MAPF[x.field] || "note"; if (kind === "dish" && f === "note") f = "desc"; if (kind === "dish" && (f === "hours" || f === "address" || f === "phone")) f = "desc"; if (kind === "stay" && f === "hours") f = "note"; pre[f] = x.value; }
      } else if (x.kind === "dia_danh_moi") {
        kind = "place"; isNew = true;
        pre = { name: d.ten || String(x.value).split(/[,.\n]/)[0].slice(0, 120), address: d.dia_chi || "", price: giaTxt(d, "/người") || "Chưa có giá", hours: d.gio || "Chưa kiểm được", note: d.vi_sao || (d.ten ? "" : x.value) };
        if (d.lat != null) pre.lat = d.lat; if (d.lng != null) pre.lng = d.lng;
      } else if (x.kind === "mon_moi") {
        kind = "dish"; isNew = true;
        pre = { name: d.ten, price: giaTxt(d, "/phần") || "Chưa có giá", desc: d.mo_ta || "", restaurants: d.quan ? [{ name: d.quan, address: d.dia_chi || "", price: giaTxt(d, "/phần") }] : [] };
      } else if (x.kind === "cho_o_moi") {
        kind = "stay"; isNew = true;
        pre = { name: d.ten, kind: lbl(DG().LOAI_O, d.loai), address: d.dia_chi || "", price: giaTxt(d, "/đêm") || "Chưa có giá", suitable: d.tien_ich || "" };
      } else if (x.kind === "phuong_tien_moi") {
        var tu = fold(d.tu);
        from = /ho chi minh|hcm|sai gon/.test(tu) ? "sg" : /ha noi/.test(tu) ? "hn" : /da nang/.test(tu) ? "dn" : "";
        kind = from ? "route" : "local"; isNew = true;
        var mode = lbl(DG().LOAI_XE, d.loai) + " " + d.tu + " – " + d.den;
        var note = [d.don_vi, d.tan_suat].filter(Boolean).join("; ");
        pre = kind === "route" ? { from: from, mode: mode, time: d.thoi_gian || "", price: giaTxt(d, "/vé"), note: note } : { mode: mode, price: giaTxt(d, "/vé"), note: [d.thoi_gian, note].filter(Boolean).join("; ") };
      } else return toast_("Loại đóng góp này nhập tay");
      if (isNew) id = "moi-" + slug(pre.name || pre.mode) + "-" + Math.random().toString(36).slice(2, 6);
      tab = "sua"; frame("");
      editor(p.id, kind, from, id, isNew, pre, x);
    }).catch(fail);
  };

  /* ================= Sửa dữ liệu ================= */
  function listItems() {
    loading();
    loadOv().then(function () {
      if (!st.prov) st.prov = (typeof currentProv !== "undefined" && currentProv && currentProv.id) || PROV_DATA[0].id;
      var p = provById(st.prov);
      var head = '<div class="adm-filt"><div class="field"><label for="admProv">Tỉnh/thành</label><select id="admProv" onchange="btAdmF(\'prov\',this.value)">' + PROV_DATA.map(function (x) { return '<option value="' + x.id + '"' + (x.id === st.prov ? " selected" : "") + '>' + esc(x.name) + '</option>'; }).join("") + '</select></div>' +
        '<div class="field"><label for="admEk">Loại mục</label><select id="admEk" onchange="btAdmF(\'ek\',this.value)">' + Object.keys(KIND_LBL).map(function (k) { return '<option value="' + k + '"' + (st.ek === k ? " selected" : "") + '>' + KIND_LBL[k] + '</option>'; }).join("") + '</select></div>' +
        (st.ek === "route" ? '<div class="field"><label for="admFrom">Nơi đi</label><select id="admFrom" onchange="btAdmF(\'from\',this.value)">' + Object.keys(FROM_LBL).map(function (k) { return '<option value="' + k + '"' + (st.from === k ? " selected" : "") + '>' + FROM_LBL[k] + '</option>'; }).join("") + '</select></div>' : '') +
        '<div class="field"><label for="admQ">Tìm theo tên</label><input id="admQ" type="search" value="' + esc(st.q) + '" oninput="btAdmQ(this.value)"></div></div>' +
        '<button class="btn btn-primary" onclick="btAdmNew()">Thêm ' + KIND_LBL[st.ek].toLowerCase() + ' mới</button>';
      body(head + '<div id="admList" class="dg-list" style="margin-top:12px"></div>');
      drawList();
    }).catch(fail);
  }
  function itemsNow() {
    var from = st.ek === "route" ? st.from : "";
    var L = window.BTSua ? BTSua.items(st.prov, st.ek, from) : [];
    /* mục admin thêm rồi ẩn/xóa: không còn trong mảng, lấy từ bản sửa */
    Object.keys(rowsOv).forEach(function (k) {
      var r = rowsOv[k]; if (r.prov_id !== st.prov || r.kind !== st.ek || !r.is_new) return;
      if (st.ek === "route" && (r.data.from || "") !== from) return;
      if (!L.some(function (x) { return x.id === r.item_id; })) L.push({ id: r.item_id, o: r.data, an: true, moi: true });
    });
    return L;
  }
  function drawList() {
    var el = document.getElementById("admList"); if (!el) return;
    var q = fold(st.q).trim(), from = st.ek === "route" ? st.from : "";
    var L = itemsNow().filter(function (x) { return !q || fold(x.o.name || x.o.mode).indexOf(q) >= 0; });
    el.innerHTML = L.length ? L.slice(0, 300).map(function (x) {
      var r = rowsOv[st.prov + "|" + st.ek + "|" + x.id], tag = [];
      if (x.moi) tag.push("mới"); if (r && Object.keys(r.data || {}).length && !x.moi) tag.push("đã sửa"); if (r && r.deleted) tag.push("đã xóa"); else if (x.an || (r && r.hidden)) tag.push("đang ẩn");
      return '<button class="dg-item adm-row" onclick="btAdmEdit(\'' + esc(x.id) + '\')"><b>' + esc(x.o.name || x.o.mode || x.id) + '</b>' + (tag.length ? ' <span class="dg-st">' + tag.join(", ") + '</span>' : '') +
        '<span class="small">' + esc([x.o.price, x.o.hours || x.o.time].filter(Boolean).join(" · ").slice(0, 140)) + '</span></button>';
    }).join("") + (L.length > 300 ? '<p class="small">Còn ' + (L.length - 300) + ' mục, gõ tên để lọc.</p>' : '') : '<p class="muted">Không có mục nào.</p>';
  }
  window.btAdmF = function (k, v) { st[k] = v; st.q = ""; listItems(); };
  var qT = null; window.btAdmQ = function (v) { st.q = v; clearTimeout(qT); qT = setTimeout(drawList, 150); };
  window.btAdmNew = function () {
    var from = st.ek === "route" ? st.from : "";
    editor(st.prov, st.ek, from, "", true, from ? { from: from } : {}, null);
  };
  window.btAdmEdit = function (id) {
    var from = st.ek === "route" ? st.from : "";
    var x = itemsNow().filter(function (y) { return y.id === id; })[0];
    editor(st.prov, st.ek, from, id, !!(x && x.moi), null, null);
  };

  /* giá trị hiện tại của 1 mục: bản gốc + bản sửa (không lấy nhãn "tạm đóng" đã gắn vào tên) */
  function current(provId, kind, from, id) {
    var r = rowsOv[provId + "|" + kind + "|" + id];
    var o = r && r.is_new ? {} : (window.BTSua ? BTSua.original(provId, kind, from, kind === "route" ? +String(id).split(":")[1] : kind === "local" ? +id : id) : null) || {};
    var v = JSON.parse(JSON.stringify(o));
    if (r) Object.keys(r.data || {}).forEach(function (k) { v[k] = r.data[k]; });
    if (kind === "route" && from) v.from = v.from || from;
    return { v: v, orig: o, r: r };
  }
  function inputHtml(f, val) {
    var id = "admE_" + f[0], t = f[2];
    if (t === "dong") return '<select id="' + id + '">' + DONG.map(function (o) { return '<option value="' + o[0] + '"' + ((val || "") === o[0] ? " selected" : "") + '>' + o[1] + '</option>'; }).join("") + '</select>';
    if (t === "from") return '<select id="' + id + '">' + Object.keys(FROM_LBL).map(function (k) { return '<option value="' + k + '"' + (val === k ? " selected" : "") + '>' + FROM_LBL[k] + '</option>'; }).join("") + '</select>';
    if (t === "so") return '<input id="' + id + '" type="number" step="any" inputmode="decimal" value="' + (val == null ? "" : esc(val)) + '">';
    if (t === "quan") return '<textarea id="' + id + '" rows="4">' + esc((val || []).map(function (q) { return [q.name, q.address || "", q.price || ""].join(" | "); }).join("\n")) + '</textarea>';
    if (t === "dai") return '<textarea id="' + id + '" rows="4" maxlength="1000">' + esc(val || "") + '</textarea>';
    return '<input id="' + id + '" maxlength="' + (f[0] === "name" || f[0] === "mode" ? 160 : 1000) + '" value="' + esc(val == null ? "" : val) + '">';
  }
  function readField(f) {
    var el = document.getElementById("admE_" + f[0]); if (!el) return undefined;
    var v = String(el.value || "").trim();
    if (f[2] === "so") { if (!v) return null; var n = Number(v.replace(",", ".")); if (!isFinite(n)) throw new Error(f[1] + " phải là số"); return n; }
    if (f[2] === "quan") return v ? v.split("\n").map(function (l) { var a = l.split("|").map(function (s) { return s.trim(); }); return a[0] ? { name: a[0], address: a[1] || "", price: a[2] || "" } : null; }).filter(Boolean) : [];
    return v;
  }
  function same(a, b) { return JSON.stringify(a == null ? "" : a) === JSON.stringify(b == null ? "" : b); }
  var ED = null;
  function editor(provId, kind, from, id, isNew, pre, contrib) {
    var p = provById(provId), c = id && !(isNew && !rowsOv[provId + "|" + kind + "|" + id]) ? current(provId, kind, from, id) : { v: {}, orig: {}, r: null };
    var v = c.v; if (pre) Object.keys(pre).forEach(function (k) { v[k] = pre[k]; });
    if (kind === "route" && !v.from) v.from = from || "sg";
    var isNewRow = isNew && !c.r;
    ED = { provId: provId, kind: kind, from: from, id: id, isNew: isNewRow, orig: c.orig, cur: current(provId, kind, from, id || "").v, r: c.r, contrib: contrib };
    var F = FIELDS[kind], r = c.r;
    var html = '<button class="btn btn-ghost" onclick="btAdminTab(\'' + (contrib ? "duyet" : "sua") + '\')">← Quay lại</button>' +
      '<h3>' + (isNewRow ? "Thêm " + KIND_LBL[kind].toLowerCase() : esc(v.name || v.mode || id)) + ' · ' + esc(p ? p.name : provId) + '</h3>' +
      (contrib ? '<p class="notebox small">Nhập từ đóng góp của ' + esc(contrib.author_name || contrib.author_email || "người dùng") + '. Kiểm lại các ô đã điền sẵn rồi bấm Lưu; đóng góp sẽ tự chuyển thành "Đã nhập". Ô nào người gửi không có thì để trống hoặc ghi "Chưa kiểm được", không tự điền.</p>' : '') +
      (!isNewRow ? '<p class="small">Mã mục: <code>' + esc(id) + '</code>' + (r && r.hidden ? ' · <b>đang ẩn</b>' : '') + (r && r.deleted ? ' · <b>đã xóa</b>' : '') + '</p>' : '') +
      '<form class="rv-form" onsubmit="return btAdmSave(event)">' + F.map(function (f) {
        if (f[2] === "from" && !isNewRow) return "";
        var changed = pre && f[0] in pre && !same(pre[f[0]], ED.cur[f[0]]);
        return '<div class="field' + (changed ? " adm-pre" : "") + '"><label for="admE_' + f[0] + '">' + esc(f[1]) + (changed ? ' <span class="small">(đề xuất mới)</span>' : '') + '</label>' + inputHtml(f, v[f[0]]) +
          (changed && ED.cur[f[0]] ? '<p class="small">Đang ghi: ' + esc(typeof ED.cur[f[0]] === "string" ? ED.cur[f[0]] : JSON.stringify(ED.cur[f[0]])) + '</p>' : '') + '</div>';
      }).join("") +
      '<div class="field"><label for="admE__note">Ghi chú thay đổi (không bắt buộc, vào nhật ký' + (contrib ? ' và gửi cho người đóng góp' : '') + ')</label><input id="admE__note" maxlength="500"></div>' +
      '<div id="admMsg"></div><div class="dg-acts"><button class="btn btn-primary" type="submit">' + (contrib ? "Lưu và nhập vào app" : "Lưu") + '</button></div></form>' +
      (!isNewRow ? '<div class="dg-acts" style="margin-top:10px">' + (r && r.hidden && !r.deleted ? '<button class="btn btn-ghost" onclick="btAdmHide(false)">Hiện lại</button>' : !(r && r.deleted) ? '<button class="btn btn-ghost" onclick="btAdmHide(true)">Ẩn khỏi app</button>' : '') +
        (!(r && r.deleted) ? '<button class="btn btn-ghost" onclick="btAdmDel1()">Xóa hẳn…</button>' : '') + '</div><div id="admDel"></div>' +
        '<h4 style="margin-top:16px">Nhật ký mục này</h4><div id="admItemLog" class="small">Đang tải…</div>' : '');
    body(html);
    if (!isNewRow) rpc("admin_audit", { p_prov: provId, p_kind: kind, p_item: id, p_limit: 50 }).then(function (L) { var el = document.getElementById("admItemLog"); if (el) el.innerHTML = auditHtml(L, true); }).catch(function (e) { var el = document.getElementById("admItemLog"); if (el) el.textContent = errMsg(e); });
  }
  window.btAdmSave = function (ev) {
    ev.preventDefault();
    var E = ED, F = FIELDS[E.kind], patch = {}, base = {}, msg = document.getElementById("admMsg");
    try {
      F.forEach(function (f) {
        if (f[2] === "from" && !E.isNew) return;
        var v = readField(f); if (v === undefined) return;
        if (E.isNew) { if (v !== "" && v !== null && !(Array.isArray(v) && !v.length)) patch[f[0]] = v; return; }
        if (!same(v, E.cur[f[0]])) { patch[f[0]] = v === "" && f[0] !== "closed" ? null : v; base[f[0]] = E.orig[f[0]] == null ? null : E.orig[f[0]]; }
      });
    } catch (e) { msg.innerHTML = '<p class="dg-err">' + esc(e.message) + '</p>'; return false; }
    if (!Object.keys(patch).length && !E.contrib) { msg.innerHTML = '<p class="small">Không có gì thay đổi.</p>'; return false; }
    var nm = E.kind === "route" || E.kind === "local" ? "mode" : "name";
    if (E.isNew && !patch[nm]) { msg.innerHTML = '<p class="dg-err">Mục mới cần tên.</p>'; return false; }
    var id = E.id || "moi-" + slug(patch[nm]) + "-" + Math.random().toString(36).slice(2, 6);
    var note = (document.getElementById("admE__note") || {}).value || "";
    var btn = ev.target.querySelector("[type=submit]"); btn.disabled = true; btn.textContent = "Đang lưu…";
    rpc("admin_save_item", { p_prov: E.provId, p_kind: E.kind, p_item: id, p_patch: patch, p_base: base, p_is_new: E.isNew, p_contrib: E.contrib ? E.contrib.id : null, p_note: note.trim() || null }).then(function (res) {
      var r = E.r || { prov_id: E.provId, kind: E.kind, item_id: id, data: {}, is_new: E.isNew, hidden: false, deleted: false, version: 0 };
      var data = Object.assign({}, r.data || {}, patch);
      var row = { prov_id: E.provId, kind: E.kind, item_id: id, data: data, is_new: r.is_new, hidden: r.hidden, deleted: r.deleted, version: (res && res.version) || r.version + 1 };
      rowsOv[E.provId + "|" + E.kind + "|" + id] = row;
      if (window.BTSua) { BTSua.put(row); BTSua.refresh(true); }
      toast_(E.contrib ? "Đã nhập vào app" : "Đã lưu, app đã cập nhật");
      if (E.contrib) { tab = "duyet"; frame(""); listContrib(); }
      else { st.prov = E.provId; st.ek = E.kind; if (E.kind === "route") st.from = data.from || E.from; editor(E.provId, E.kind, st.from, id, E.isNew || r.is_new, null, null); }
    }).catch(function (e) { btn.disabled = false; btn.textContent = "Lưu"; msg.innerHTML = '<p class="dg-err" role="alert">' + esc(errMsg(e)) + '</p>'; });
    return false;
  };
  function afterRow(fn) {
    var E = ED;
    return loadOv().then(function () {
      var r = rowsOv[E.provId + "|" + E.kind + "|" + E.id]; if (r && window.BTSua) { BTSua.put(r); BTSua.refresh(true); }
      if (fn) fn(); editor(E.provId, E.kind, E.from, E.id, !!(r && r.is_new), null, null);
    });
  }
  window.btAdmHide = function (on) {
    var E = ED;
    rpc("admin_set_hidden", { p_prov: E.provId, p_kind: E.kind, p_item: E.id, p_hidden: on, p_note: null }).then(function () { return afterRow(function () { toast_(on ? "Đã ẩn khỏi app" : "Đã hiện lại"); }); }).catch(function (e) { toast_(errMsg(e)); });
  };
  window.btAdmDel1 = function () {
    var el = document.getElementById("admDel"); if (!el) return;
    el.innerHTML = '<div class="notebox"><p><b>Xóa hẳn</b> mục này khỏi app. Bước 2: gõ lại mã <code>' + esc(ED.id) + '</code> và ghi lý do. Nhật ký vẫn giữ, quay lại được.</p>' +
      '<div class="field"><label for="admDelId">Mã mục</label><input id="admDelId" autocomplete="off"></div><div class="field"><label for="admDelWhy">Lý do</label><input id="admDelWhy" maxlength="500"></div>' +
      '<button class="btn btn-orange" onclick="btAdmDel2()">Xác nhận xóa</button></div>';
  };
  window.btAdmDel2 = function () {
    var E = ED, c = (document.getElementById("admDelId") || {}).value || "", why = (document.getElementById("admDelWhy") || {}).value || "";
    if (c.trim() !== E.id) return toast_("Mã gõ lại chưa khớp");
    if (why.trim().length < 3) return toast_("Cần ghi lý do xóa");
    rpc("admin_delete_item", { p_prov: E.provId, p_kind: E.kind, p_item: E.id, p_confirm: c.trim(), p_note: why.trim() }).then(function () { return afterRow(function () { toast_("Đã xóa khỏi app"); }); }).catch(function (e) { toast_(errMsg(e)); });
  };

  /* ================= Nhật ký ================= */
  var ACT = { sua: "Sửa", them: "Thêm", an: "Ẩn", hien: "Hiện lại", xoa: "Xóa", hoan_tac: "Quay lại", nhap_dong_gop: "Nhập đóng góp", cap_admin: "Cấp quyền admin", go_admin: "Gỡ quyền admin" };
  function shortV(v) { if (v == null) return "(trống)"; var s = typeof v === "string" ? v : JSON.stringify(v); return s.length > 160 ? s.slice(0, 160) + "…" : s; }
  function auditHtml(L, compact) {
    if (!L || !L.length) return '<p class="muted">Chưa có thay đổi nào.</p>';
    return '<div class="dg-list">' + L.map(function (a) {
      var p = provById(a.prov_id), canRevert = (a.field && a.action !== "nhap_dong_gop") || a.action === "an" || a.action === "hien" || a.action === "xoa";
      if (a.kind === "tro_ly") return '<div class="dg-item"><p class="small">#' + a.id + ' · ' + esc(DG().fmtTime(a.at)) + ' · ' + esc(a.by_name || a.by_email || "") + '</p><p><b>Định hướng học · ' + esc(ACT[a.action] || a.action) + '</b> <code>' + esc(a.item_id) + '</code></p>' + (a.old_value != null ? '<p class="small">' + esc(shortV(a.old_value)) + ' → ' + esc(shortV(a.new_value)) + '</p>' : a.new_value != null ? '<p class="small">' + esc(shortV(a.new_value)) + '</p>' : '') + (a.note ? '<p class="small">Ghi chú: ' + esc(a.note) + '</p>' : '') + '</div>';
      if (a.kind === "admin") return '<div class="dg-item"><p class="small">#' + a.id + ' · ' + esc(DG().fmtTime(a.at)) + ' · ' + esc(a.by_name || a.by_email || "") + '</p><p><b>' + esc(ACT[a.action] || a.action) + '</b> · ' + esc(shortV(a.new_value != null ? a.new_value : a.old_value)) + '</p>' + (a.note ? '<p class="small">Ghi chú: ' + esc(a.note) + '</p>' : '') + '</div>';
      return '<div class="dg-item"><p class="small">#' + a.id + ' · ' + esc(DG().fmtTime(a.at)) + ' · ' + esc(a.by_name || a.by_email || "") + (a.by_email && a.by_name ? ' &lt;' + esc(a.by_email) + '&gt;' : '') + '</p>' +
        '<p><b>' + esc(ACT[a.action] || a.action) + '</b>' + (compact ? '' : ' · ' + esc(a.kind === "prov" ? "Thông tin tỉnh" : (KIND_LBL[a.kind] || a.kind)) + ' <code>' + esc(a.item_id) + '</code> · ' + esc(p ? p.name : a.prov_id)) + (a.field ? ' · trường <code>' + esc(a.field) + '</code>' : '') + '</p>' +
        (a.field ? '<p class="small">' + esc(shortV(a.old_value)) + ' → ' + esc(shortV(a.new_value)) + '</p>' : '') + (a.note ? '<p class="small">Ghi chú: ' + esc(a.note) + '</p>' : '') +
        (canRevert ? '<button class="btn btn-ghost" onclick="btAdmRevert(' + a.id + ')">Quay lại trước thay đổi này</button>' : '') + '</div>';
    }).join("") + '</div>';
  }
  function listAudit() {
    loading();
    rpc("admin_audit", { p_limit: 200 }).then(function (L) { body('<p class="small">200 thay đổi gần nhất. Nhật ký không sửa, không xóa được.</p>' + auditHtml(L, false)); }).catch(fail);
  }
  window.btAdmRevert = function (id) {
    rpc("admin_revert", { p_audit_id: id }).then(function () {
      return loadOv().then(function () {
        if (window.BTSua) { var all = Object.keys(rowsOv).map(function (k) { return rowsOv[k]; }); BTSua.apply(all); BTSua.refresh(true); }
        toast_("Đã quay lại"); if (ED && tab === "sua" && document.getElementById("admItemLog")) editor(ED.provId, ED.kind, ED.from, ED.id, !!(ED.r && ED.r.is_new), null, null); else listAudit();
      });
    }).catch(function (e) { toast_(errMsg(e)); });
  };

  /* ================= Thông tin tỉnh =================
     6 nhóm nội dung cấp tỉnh: cảnh báo chặt chém, số khẩn cấp, giờ đẹp chụp ảnh,
     cho người chạy giải, bảng chi phí, lịch trình mẫu. Lưu qua admin_save_item kind='prov',
     item_id = prov_id (1 dòng / tỉnh, cần chạy neon/006_thong_tin_tinh.sql trước). */
  var TINH_F = ["scams", "emergency", "photoSpots", "running", "cost", "itins"];
  var tinh = { prov: "", d: null };
  function tinhMacDinh(k) {
    if (k === "emergency") return { police: "113", ambulance: "115", fire: "114", source: "", extra: [] };
    if (k === "running") return { races: [] };
    if (k === "itins") return {};
    return [];
  }
  function currentTinh(provId) {
    var p = provById(provId) || {}, d = {};
    TINH_F.forEach(function (k) {
      var v = p[k];
      d[k] = JSON.parse(JSON.stringify(v == null ? tinhMacDinh(k) : v));
    });
    var r = rowsOv[provId + "|prov|" + provId];
    if (r) Object.keys(r.data || {}).forEach(function (k) { if (TINH_F.indexOf(k) >= 0) d[k] = JSON.parse(JSON.stringify(r.data[k])); });
    return d;
  }
  function listTinh() {
    loading();
    loadOv().then(function () {
      if (!tinh.prov) tinh.prov = (typeof currentProv !== "undefined" && currentProv && currentProv.id) || PROV_DATA[0].id;
      if (!tinh.d) tinh.d = currentTinh(tinh.prov);
      tinhVe();
    }).catch(fail);
  }
  function tinhVe() {
    var d = tinh.d, em = d.emergency || {}, ikeys = Object.keys(d.itins || {});
    var h = '<p class="small">Sửa thông tin cấp tỉnh: cảnh báo chặt chém, số khẩn cấp, giờ đẹp chụp ảnh, cho người chạy giải, bảng chi phí, lịch trình mẫu. Lưu xong áp ngay, không cần deploy. Chuyển tỉnh sẽ bỏ các sửa chưa lưu.</p>' +
      '<div class="adm-filt"><div class="field"><label for="admTinhProv">Tỉnh/thành</label><select id="admTinhProv" onchange="btTinhProv(this.value)">' + PROV_DATA.map(function (x) { return '<option value="' + x.id + '"' + (x.id === tinh.prov ? " selected" : "") + '>' + esc(x.name) + '</option>'; }).join("") + '</select></div></div>';
    /* 1. cảnh báo chặt chém */
    h += '<h3>Cảnh báo chặt chém (' + d.scams.length + ')</h3>' + d.scams.map(function (w, i) {
      return '<div class="notebox"><div class="field"><label for="admT_sc_sit' + i + '">Tình huống ' + (i + 1) + '</label><textarea id="admT_sc_sit' + i + '" rows="3" maxlength="2000">' + esc(w.situation || "") + '</textarea></div>' +
        '<div class="field"><label for="admT_sc_av' + i + '">Cách tránh</label><textarea id="admT_sc_av' + i + '" rows="3" maxlength="2000">' + esc(w.avoid || "") + '</textarea></div>' +
        '<div class="field"><label for="admT_sc_src' + i + '">Nguồn</label><input id="admT_sc_src' + i + '" maxlength="500" value="' + esc(w.source || "") + '"></div>' +
        '<button class="btn btn-ghost" onclick="btTinhXoa(\'scams\',' + i + ')">Xóa cảnh báo này</button></div>';
    }).join("") + '<button class="btn btn-ghost" onclick="btTinhThem(\'scams\')">+ Thêm cảnh báo</button>';
    /* 2. số khẩn cấp */
    h += '<h3>Số khẩn cấp</h3><div class="notebox"><div class="field"><label for="admT_em_police">Công an</label><input id="admT_em_police" maxlength="20" value="' + esc(em.police || "") + '"></div>' +
      '<div class="field"><label for="admT_em_amb">Cấp cứu</label><input id="admT_em_amb" maxlength="20" value="' + esc(em.ambulance || "") + '"></div>' +
      '<div class="field"><label for="admT_em_fire">Chữa cháy</label><input id="admT_em_fire" maxlength="20" value="' + esc(em.fire || "") + '"></div>' +
      '<div class="field"><label for="admT_em_src">Nguồn</label><input id="admT_em_src" maxlength="500" value="' + esc(em.source || "") + '"></div>' +
      '<h4>Số liên hệ thêm (' + (em.extra || []).length + ')</h4>' + (em.extra || []).map(function (x, j) {
        return '<div class="field"><label for="admT_emx_name' + j + '">Tên cơ sở ' + (j + 1) + '</label><input id="admT_emx_name' + j + '" maxlength="160" value="' + esc(x.name || "") + '"></div>' +
          '<div class="field"><label for="admT_emx_num' + j + '">Số điện thoại</label><input id="admT_emx_num' + j + '" maxlength="40" value="' + esc(x.number || "") + '"></div>' +
          '<div class="field"><label for="admT_emx_src' + j + '">Nguồn</label><input id="admT_emx_src' + j + '" maxlength="500" value="' + esc(x.source || "") + '"></div>' +
          '<button class="btn btn-ghost" onclick="btTinhXoa(\'emx\',' + j + ')">Xóa số này</button>';
      }).join("") + '<div style="margin-top:8px"><button class="btn btn-ghost" onclick="btTinhThem(\'emx\')">+ Thêm số liên hệ</button></div></div>';
    /* 3. giờ đẹp chụp ảnh */
    h += '<h3>Giờ đẹp chụp ảnh (' + d.photoSpots.length + ')</h3>' + d.photoSpots.map(function (w, i) {
      return '<div class="notebox"><div class="field"><label for="admT_ph_pl' + i + '">Điểm chụp ' + (i + 1) + '</label><input id="admT_ph_pl' + i + '" maxlength="160" value="' + esc(w.place || "") + '"></div>' +
        '<div class="field"><label for="admT_ph_ti' + i + '">Giờ đẹp</label><textarea id="admT_ph_ti' + i + '" rows="3" maxlength="1000">' + esc(w.time || "") + '</textarea></div>' +
        '<div class="field"><label for="admT_ph_src' + i + '">Nguồn</label><input id="admT_ph_src' + i + '" maxlength="500" value="' + esc(w.source || "") + '"></div>' +
        '<button class="btn btn-ghost" onclick="btTinhXoa(\'photoSpots\',' + i + ')">Xóa điểm này</button></div>';
    }).join("") + '<button class="btn btn-ghost" onclick="btTinhThem(\'photoSpots\')">+ Thêm điểm chụp</button>';
    /* 4. cho người chạy giải */
    h += '<h3>Cho người chạy giải (' + (d.running.races || []).length + ' giải)</h3>' + (d.running.races || []).map(function (w, i) {
      return '<div class="notebox"><div class="field"><label for="admT_ru_na' + i + '">Tên giải ' + (i + 1) + '</label><input id="admT_ru_na' + i + '" maxlength="160" value="' + esc(w.name || "") + '"></div>' +
        '<div class="field"><label for="admT_ru_wh' + i + '">Thời gian</label><textarea id="admT_ru_wh' + i + '" rows="3" maxlength="1000">' + esc(w.when || "") + '</textarea></div>' +
        '<div class="field"><label for="admT_ru_src' + i + '">Nguồn</label><input id="admT_ru_src' + i + '" maxlength="500" value="' + esc(w.source || "") + '"></div>' +
        '<button class="btn btn-ghost" onclick="btTinhXoa(\'running\',' + i + ')">Xóa giải này</button></div>';
    }).join("") + '<button class="btn btn-ghost" onclick="btTinhThem(\'running\')">+ Thêm giải chạy</button>';
    /* 5. bảng chi phí */
    h += '<h3>Bảng chi phí (' + d.cost.length + ' dòng)</h3>' + d.cost.map(function (w, i) {
      return '<div class="notebox"><div class="field"><label for="admT_co_la' + i + '">Khoản ' + (i + 1) + '</label><input id="admT_co_la' + i + '" maxlength="160" value="' + esc(w.label || "") + '"></div>' +
        '<div class="field"><label for="admT_co_va' + i + '">Giá</label><input id="admT_co_va' + i + '" maxlength="200" value="' + esc(w.value || "") + '"></div>' +
        '<button class="btn btn-ghost" onclick="btTinhXoa(\'cost\',' + i + ')">Xóa dòng này</button></div>';
    }).join("") + '<button class="btn btn-ghost" onclick="btTinhThem(\'cost\')">+ Thêm dòng chi phí</button>';
    /* 6. lịch trình mẫu */
    h += '<h3>Lịch trình mẫu</h3>' + ikeys.map(function (K, ki) {
      var days = d.itins[K] || [];
      return '<div class="notebox"><h4>' + esc(K) + ' <button class="btn btn-ghost" onclick="btTinhXoa(\'itkey\',' + ki + ')">Xóa lịch trình này</button></h4>' + days.map(function (day, di) {
        var txt = day.map(function (s) { return (s.s || "") + " | " + (s.t || "") + (s.gan ? " | " + s.gan : ""); }).join("\n");
        return '<div class="field"><label for="admT_it_' + ki + '_' + di + '">Ngày ' + (di + 1) + ' (mỗi dòng: Buổi | Nội dung | mã địa danh, phân cách dấu phẩy)</label><textarea id="admT_it_' + ki + '_' + di + '" rows="4">' + esc(txt) + '</textarea></div>' +
          '<button class="btn btn-ghost" onclick="btTinhXoa(\'itday\',' + di + ',' + ki + ')">Xóa ngày này</button>';
      }).join("") + '<div style="margin-top:8px"><button class="btn btn-ghost" onclick="btTinhThem(\'itday\',' + ki + ')">+ Thêm ngày</button></div></div>';
    }).join("") +
      '<div class="field"><label for="admT_it_keymoi">Thêm lịch trình mới (dạng 3N2D)</label><input id="admT_it_keymoi" maxlength="10" placeholder="vd: 5N4D"></div><button class="btn btn-ghost" onclick="btTinhThem(\'itkey\')">+ Thêm lịch trình</button>';
    h += '<div id="admTinhMsg" style="margin-top:12px"></div><button class="btn btn-primary" onclick="btTinhLuu()">Lưu thông tin tỉnh</button>';
    body(h);
  }
  /* gom giá trị đang gõ trên form về bản nháp (gọi trước mọi thao tác thêm/xóa/chuyển tỉnh/lưu) */
  function tinhThu() {
    var d = tinh.d; if (!d) return;
    var g = function (id) { var el = document.getElementById(id); return el ? el.value : ""; };
    d.scams = (d.scams || []).map(function (w, i) { return { situation: g("admT_sc_sit" + i).trim(), avoid: g("admT_sc_av" + i).trim(), source: g("admT_sc_src" + i).trim() }; });
    d.emergency = { police: g("admT_em_police").trim(), ambulance: g("admT_em_amb").trim(), fire: g("admT_em_fire").trim(), source: g("admT_em_src").trim(),
      extra: (d.emergency.extra || []).map(function (x, j) { return { name: g("admT_emx_name" + j).trim(), number: g("admT_emx_num" + j).trim(), source: g("admT_emx_src" + j).trim() }; }) };
    d.photoSpots = (d.photoSpots || []).map(function (w, i) { return { place: g("admT_ph_pl" + i).trim(), time: g("admT_ph_ti" + i).trim(), source: g("admT_ph_src" + i).trim() }; });
    d.running = { races: (d.running.races || []).map(function (w, i) { return { name: g("admT_ru_na" + i).trim(), when: g("admT_ru_wh" + i).trim(), source: g("admT_ru_src" + i).trim() }; }) };
    d.cost = (d.cost || []).map(function (w, i) { return { label: g("admT_co_la" + i).trim(), value: g("admT_co_va" + i).trim() }; });
    Object.keys(d.itins || {}).forEach(function (K, ki) {
      d.itins[K] = (d.itins[K] || []).map(function (day, di) {
        return g("admT_it_" + ki + "_" + di).split("\n").map(function (l) { var a = l.split("|").map(function (s) { return s.trim(); }); return (a[0] || a[1]) ? { s: a[0] || "", t: a[1] || "", gan: a[2] || "" } : null; }).filter(Boolean);
      });
    });
  }
  window.btTinhProv = function (v) { tinhThu(); tinh.prov = v; tinh.d = null; listTinh(); };
  window.btTinhThem = function (kind, arg) {
    tinhThu();
    var d = tinh.d;
    if (kind === "scams") d.scams.push({ situation: "", avoid: "", source: "" });
    else if (kind === "emx") d.emergency.extra.push({ name: "", number: "", source: "" });
    else if (kind === "photoSpots") d.photoSpots.push({ place: "", time: "", source: "" });
    else if (kind === "running") d.running.races.push({ name: "", when: "", source: "" });
    else if (kind === "cost") d.cost.push({ label: "", value: "" });
    else if (kind === "itday") { var K = Object.keys(d.itins)[arg]; if (K) d.itins[K].push([]); }
    else if (kind === "itkey") {
      var el = document.getElementById("admT_it_keymoi"), K2 = (el ? el.value : "").trim().toUpperCase();
      if (!/^[0-9]+N[0-9]+D$/.test(K2)) { toast_("Tên lịch trình phải dạng 3N2D"); return; }
      if (d.itins[K2]) { toast_("Đã có lịch trình " + K2); return; }
      d.itins[K2] = [[]];
    }
    tinhVe();
  };
  window.btTinhXoa = function (kind, i, arg) {
    tinhThu();
    var d = tinh.d;
    if (kind === "scams") d.scams.splice(i, 1);
    else if (kind === "emx") d.emergency.extra.splice(i, 1);
    else if (kind === "photoSpots") d.photoSpots.splice(i, 1);
    else if (kind === "running") d.running.races.splice(i, 1);
    else if (kind === "cost") d.cost.splice(i, 1);
    else if (kind === "itday") { var K = Object.keys(d.itins)[arg]; if (K) d.itins[K].splice(i, 1); }
    else if (kind === "itkey") { var K2 = Object.keys(d.itins)[i]; if (K2) delete d.itins[K2]; }
    tinhVe();
  };
  window.btTinhLuu = function () {
    tinhThu();
    var d = tinh.d, msg = document.getElementById("admTinhMsg");
    var patch = {};
    patch.scams = (d.scams || []).filter(function (w) { return w.situation || w.avoid; });
    patch.emergency = { police: d.emergency.police, ambulance: d.emergency.ambulance, fire: d.emergency.fire, source: d.emergency.source,
      extra: (d.emergency.extra || []).filter(function (x) { return x.name || x.number; }) };
    patch.photoSpots = (d.photoSpots || []).filter(function (w) { return w.place || w.time; });
    patch.running = { races: (d.running.races || []).filter(function (w) { return w.name || w.when; }) };
    patch.cost = (d.cost || []).filter(function (w) { return w.label || w.value; });
    patch.itins = {};
    Object.keys(d.itins || {}).forEach(function (K) {
      var days = (d.itins[K] || []).map(function (day) { return day.filter(function (s) { return s.s || s.t; }); }).filter(function (day) { return day.length; });
      if (days.length) patch.itins[K] = days;
    });
    if (msg) msg.innerHTML = "";
    rpc("admin_save_item", { p_prov: tinh.prov, p_kind: "prov", p_item: tinh.prov, p_patch: patch, p_base: {}, p_is_new: false, p_contrib: null, p_note: null }).then(function (res) {
      var row = { prov_id: tinh.prov, kind: "prov", item_id: tinh.prov, data: patch, is_new: false, hidden: false, deleted: false, version: (res && res.version) || 0 };
      rowsOv[tinh.prov + "|prov|" + tinh.prov] = row;
      if (window.BTSua) { BTSua.put(row); BTSua.refresh(true); }
      toast_("Đã lưu thông tin tỉnh");
      tinh.d = null; listTinh();
    }).catch(function (e) { if (msg) msg.innerHTML = '<p class="dg-err" role="alert">' + esc(errMsg(e)) + '</p>'; else toast_(errMsg(e)); });
  };

  /* ================= Định hướng học (trợ lý) =================
     Trợ lý vẫn tự học như cũ. Ở đây admin: chọn nguồn + hạn mức trang/ngày, đặt chương trình học (địa danh, chủ đề),
     duyệt đoạn kiến thức việc hằng ngày lấy về, và dạy trực tiếp (hỏi đáp, tên gọi khác, cách gõ sai). Server: neon/005_dinh_huong_hoc.sql */
  var NGUON = [["wikipedia_vi", "Wikipedia tiếng Việt"], ["wikivoyage_vi", "Wikivoyage tiếng Việt"], ["wikipedia_en", "Wikipedia tiếng Anh"], ["wikivoyage_en", "Wikivoyage tiếng Anh"]];
  var CT_ST = [["dang_hoc", "Đang học"], ["tam_dung", "Tạm dừng"], ["xong", "Xong"]];
  var BAI = { hoi_dap: ["Hỏi đáp", [["q", "Câu hỏi người dùng hay gõ"], ["a", "Câu trả lời", "dai"], ["prov_id", "Tỉnh liên quan (không bắt buộc)", "tinh"]]],
    ten_goi: ["Tên gọi khác của tỉnh", [["ten", "Tên gọi khác (vd: thành phố ngàn hoa)"], ["prov_id", "Tỉnh", "tinh"], ["ten_cu", "Tên tỉnh cũ (không bắt buộc)"]]],
    go_sai: ["Cách gõ sai", [["sai", "Cách gõ sai hay gặp"], ["dung", "Tên đúng"]]],
    kien_thuc: ["Kiến thức đã duyệt", [["ten", "Gắn vào địa danh / chủ đề"], ["prov_id", "Tỉnh", "tinh"], ["t", "Đoạn kiến thức", "dai"], ["bai", "Tên bài nguồn"], ["url", "Link nguồn"]]] };
  var hoc = { lessons: [], bk: "hoi_dap", sua: null };
  function tinhSel(id, val) { return '<select id="' + id + '"><option value="">(không chọn)</option>' + PROV_DATA.map(function (x) { return '<option value="' + x.id + '"' + (x.id === val ? " selected" : "") + '>' + esc(x.name) + '</option>'; }).join("") + '</select>'; }
  function lbl2(arr, k) { for (var i = 0; i < arr.length; i++) if (arr[i][0] === k) return arr[i][1]; return k || ""; }
  /* áp bài dạy mới ngay trên máy admin (máy khác nhận qua /api/du-lieu) */
  function apDay() { if (window.BTSua && BTSua.day) BTSua.day(hoc.lessons.filter(function (l) { return l.active; }).map(function (l) { return { id: l.id, kind: l.kind, data: l.data }; })); if (window.BTSua) BTSua.refresh(true); }
  function listHoc() {
    loading();
    Promise.all([rpc("admin_ai_state"), rpc("admin_ai_candidates", { p_status: "cho_duyet", p_agenda: null }), rpc("admin_ai_lessons")]).then(function (r) {
      var S = r[0] || {}, s = S.settings || {}, C = r[1] || [], Lx = r[2] || [];
      hoc.lessons = Lx;
      var h = '<p class="small">Trợ lý vẫn tự học như cũ (nhớ câu người dùng sửa, đề xuất cách gõ từ góp ý). Ở đây bạn định hướng: chọn nội dung cần học, nguồn được lấy, duyệt kiến thức trước khi lên app, và dạy trực tiếp. Bài dạy áp ngay, không cần deploy.</p>';
      /* 1. nguồn + hạn mức */
      h += '<h3>Nguồn và hạn mức</h3><div class="notebox"><label class="small"><input type="checkbox" id="admHocOn"' + (s.enabled ? " checked" : "") + '> Cho phép tự lấy dữ liệu hằng ngày</label>' +
        '<div class="adm-src">' + NGUON.map(function (n) { return '<label class="small"><input type="checkbox" class="admSrc" value="' + n[0] + '"' + ((s.sources || []).indexOf(n[0]) >= 0 ? " checked" : "") + '> ' + n[1] + '</label>'; }).join("") + '</div>' +
        '<div class="field"><label for="admBudget">Tối đa số đoạn lấy mỗi ngày (0–50)</label><input id="admBudget" type="number" min="0" max="50" value="' + esc(s.daily_budget) + '"></div>' +
        '<p class="small">Hôm nay đã lấy ' + esc(S.today || 0) + '/' + esc(s.daily_budget) + ' đoạn. Chỉ dùng API công khai của Wikimedia; không lấy giá, giờ, số điện thoại. Đoạn lấy về phải được duyệt mới lên app.</p>' +
        '<button class="btn btn-ghost" onclick="btHocNguon()">Lưu nguồn và hạn mức</button></div>';
      /* 2. chương trình học */
      var AG = S.agenda || [];
      h += '<h3>Chương trình học</h3><div class="notebox"><div class="adm-filt"><div class="field"><label for="admCtKind">Loại</label><select id="admCtKind"><option value="dia_danh">Địa danh</option><option value="chu_de">Chủ đề (lễ hội, nghề, món…)</option></select></div>' +
        '<div class="field"><label for="admCtTarget">Cần học về</label><input id="admCtTarget" maxlength="160" placeholder="vd: Chùa Một Cột"></div>' +
        '<div class="field"><label for="admCtProv">Tỉnh</label>' + tinhSel("admCtProv", "") + '</div>' +
        '<div class="field"><label for="admCtPri">Ưu tiên</label><select id="admCtPri"><option value="1">Cao</option><option value="2" selected>Vừa</option><option value="3">Thấp</option></select></div></div>' +
        '<div class="field"><label for="admCtNote">Ghi chú (không bắt buộc)</label><input id="admCtNote" maxlength="500"></div>' +
        '<button class="btn btn-primary" onclick="btHocCt()">Thêm vào chương trình học</button></div>' +
        (AG.length ? '<div class="dg-list">' + AG.map(function (g) {
          return '<div class="dg-item"><div class="dg-top"><b>' + esc(g.target) + '</b><span class="dg-st">' + esc(lbl2(CT_ST, g.status)) + '</span></div>' +
            '<p class="small">' + (g.kind === "chu_de" ? "Chủ đề" : "Địa danh") + (g.prov_id ? ' · ' + esc((provById(g.prov_id) || {}).name || g.prov_id) : '') + ' · ưu tiên ' + ["", "cao", "vừa", "thấp"][g.priority] + ' · đã chạy ' + g.runs + ' lần' + (g.last_run_at ? ', gần nhất ' + esc(DG().fmtTime(g.last_run_at)) : ', chưa chạy') + ' · chờ duyệt ' + g.cho + ' · đã duyệt ' + g.duyet + '</p>' +
            (g.note ? '<p class="small">Ghi chú: ' + esc(g.note) + '</p>' : '') +
            '<div class="dg-acts">' + CT_ST.filter(function (t) { return t[0] !== g.status; }).map(function (t) { return '<button class="btn btn-ghost" onclick="btHocCtSt(' + g.id + ',\'' + t[0] + '\')">' + (t[0] === "dang_hoc" ? "Học tiếp" : t[1]) + '</button>'; }).join("") + '</div></div>';
        }).join("") + '</div>' : '<p class="muted">Chưa có mục nào. Thêm địa danh hoặc chủ đề bạn muốn trợ lý học.</p>');
      hoc.ag = AG;
      /* 2b. nhập file học liệu hàng loạt (không cần mở Console) */
      h += '<h3>Nhập file học liệu (hàng loạt)</h3><div class="notebox"><p class="small">Chọn file JSON dạng {"agenda": [...], "lessons": [...]}. Mỗi mục agenda cần kind (dia_danh/chu_de), target, prov_id, priority 1–3; mỗi bài cần kind "hoi_dap" với data {q, a, prov_id}. Mục đã có sẵn được bỏ qua, không nhập trùng. Nhập xong bài hỏi đáp áp ngay, không cần deploy.</p>' +
        '<div class="field"><label for="admNhapFile">File JSON học liệu</label><input id="admNhapFile" type="file" accept=".json,application/json"></div>' +
        '<div id="admNhapMsg"></div><button class="btn btn-primary" id="admNhapBtn" onclick="btHocNhapFile()">Nhập file</button></div>';
      /* 3. hàng chờ duyệt */
      hoc.c = C;
      h += '<h3>Chờ duyệt (' + C.length + ')</h3>' + (C.length ? '<div class="dg-list">' + C.map(function (c, i) {
        return '<div class="dg-item"><p><b>' + esc(c.target) + '</b> · ' + esc(lbl2(NGUON, c.source)) + ' · bài <a href="' + esc(c.url) + '" target="_blank" rel="noopener nofollow">' + esc(c.title) + '</a></p>' +
          '<div class="field"><label for="admCdTen' + i + '">Gắn vào địa danh / chủ đề</label><input id="admCdTen' + i + '" maxlength="160" value="' + esc(c.target) + '"></div>' +
          '<div class="field"><label for="admCdT' + i + '">Đoạn kiến thức (sửa được trước khi duyệt; đoạn tiếng Anh nên dịch)</label><textarea id="admCdT' + i + '" rows="5" maxlength="2000">' + esc(c.excerpt) + '</textarea></div>' +
          '<div class="field"><label for="admCdNote' + i + '">Lý do (bắt buộc khi từ chối)</label><input id="admCdNote' + i + '" maxlength="500"></div>' +
          '<div class="dg-acts"><button class="btn btn-ghost" onclick="btHocDuyet(' + i + ',\'tu_choi\')">Từ chối</button><button class="btn btn-primary" onclick="btHocDuyet(' + i + ',\'da_duyet\')">Duyệt, cho trợ lý dùng</button></div></div>';
      }).join("") + '</div>' : '<p class="muted">Không có đoạn nào chờ duyệt. Việc tự lấy chạy mỗi ngày lúc 3 giờ sáng.</p>');
      /* 4. dạy trực tiếp */
      h += '<h3>Dạy trực tiếp</h3><div class="notebox" id="admBaiForm"></div>' +
        '<h4>Bài đã dạy (' + Lx.length + ')</h4>' + (Lx.length ? '<div class="dg-list">' + Lx.map(function (l) {
          var d = l.data || {}, tt = l.kind === "hoi_dap" ? d.q : l.kind === "ten_goi" ? d.ten + " → " + ((provById(d.prov_id) || {}).name || d.prov_id) : l.kind === "go_sai" ? d.sai + " → " + d.dung : d.ten;
          var sub = l.kind === "hoi_dap" ? d.a : l.kind === "kien_thuc" ? d.t : "";
          return '<div class="dg-item"><div class="dg-top"><b>' + esc(tt) + '</b><span class="dg-st">' + esc(BAI[l.kind][0]) + (l.active ? "" : " · đang tắt") + '</span></div>' + (sub ? '<p class="small">' + esc(String(sub).slice(0, 220)) + (String(sub).length > 220 ? "…" : "") + '</p>' : '') +
            '<div class="dg-acts"><button class="btn btn-ghost" onclick="btHocBaiSua(' + l.id + ')">Sửa</button><button class="btn btn-ghost" onclick="btHocBaiBat(' + l.id + ',' + (!l.active) + ')">' + (l.active ? "Tắt" : "Bật lại") + '</button></div></div>';
        }).join("") + '</div>' : '<p class="muted">Chưa có bài nào.</p>');
      body(h); baiForm();
    }).catch(fail);
  }
  function baiForm() {
    var el = document.getElementById("admBaiForm"); if (!el) return;
    var L0 = hoc.sua ? hoc.lessons.filter(function (l) { return l.id === hoc.sua; })[0] : null, k = L0 ? L0.kind : hoc.bk, d = L0 ? L0.data : {};
    el.innerHTML = (L0 ? '<p class="small"><b>Đang sửa bài #' + L0.id + '</b> · <button class="btn btn-ghost" onclick="btHocBaiMoi()">Thôi, dạy bài mới</button></p>' :
      '<div class="field"><label for="admBk">Loại bài</label><select id="admBk" onchange="btHocBk(this.value)">' + ["hoi_dap", "ten_goi", "go_sai"].map(function (x) { return '<option value="' + x + '"' + (x === k ? " selected" : "") + '>' + BAI[x][0] + '</option>'; }).join("") + '</select></div>') +
      BAI[k][1].map(function (f) {
        var id = "admB_" + f[0], v = d[f[0]] || "";
        return '<div class="field"><label for="' + id + '">' + esc(f[1]) + '</label>' + (f[2] === "tinh" ? tinhSel(id, v) : f[2] === "dai" ? '<textarea id="' + id + '" rows="4" maxlength="2000">' + esc(v) + '</textarea>' : '<input id="' + id + '" maxlength="200" value="' + esc(v) + '">') + '</div>';
      }).join("") +
      (k === "hoi_dap" ? '<p class="small">Viết câu trả lời bằng dữ liệu đã kiểm; không ghi giá, giờ khi chưa kiểm được. Trợ lý trả câu này khi người dùng hỏi gần đúng câu hỏi trên.</p>' : '') +
      '<div id="admBMsg"></div><button class="btn btn-primary" onclick="btHocBaiLuu()">' + (L0 ? "Lưu bài" : "Dạy trợ lý") + '</button>';
  }
  window.btHocBk = function (k) { hoc.bk = k; baiForm(); };
  window.btHocBaiMoi = function () { hoc.sua = null; baiForm(); };
  window.btHocBaiSua = function (id) { hoc.sua = id; baiForm(); var el = document.getElementById("admBaiForm"); if (el && el.scrollIntoView) el.scrollIntoView({ block: "start" }); };
  window.btHocBaiLuu = function () {
    var L0 = hoc.sua ? hoc.lessons.filter(function (l) { return l.id === hoc.sua; })[0] : null, k = L0 ? L0.kind : hoc.bk, d = {};
    if (L0) Object.keys(L0.data || {}).forEach(function (x) { d[x] = L0.data[x]; });
    BAI[k][1].forEach(function (f) { var el = document.getElementById("admB_" + f[0]); if (el) d[f[0]] = String(el.value || "").trim(); });
    rpc("admin_ai_lesson_save", { p_id: L0 ? L0.id : null, p_kind: k, p_data: d, p_active: L0 ? L0.active : true, p_note: null }).then(function () {
      hoc.sua = null; toast_(L0 ? "Đã lưu bài" : "Đã dạy trợ lý");
      return rpc("admin_ai_lessons").then(function (Lx) { hoc.lessons = Lx || []; apDay(); listHoc(); });
    }).catch(function (e) { var m = document.getElementById("admBMsg"); if (m) m.innerHTML = '<p class="dg-err" role="alert">' + esc(errMsg(e)) + '</p>'; });
  };
  window.btHocBaiBat = function (id, on) {
    var l = hoc.lessons.filter(function (x) { return x.id === id; })[0]; if (!l) return;
    rpc("admin_ai_lesson_save", { p_id: id, p_kind: l.kind, p_data: l.data, p_active: on, p_note: on ? "Bật lại" : "Tắt" }).then(function () {
      return rpc("admin_ai_lessons").then(function (Lx) { hoc.lessons = Lx || []; apDay(); toast_(on ? "Đã bật lại" : "Đã tắt bài"); listHoc(); });
    }).catch(function (e) { toast_(errMsg(e)); });
  };
  window.btHocNguon = function () {
    var src = [].slice.call(document.querySelectorAll(".admSrc")).filter(function (c) { return c.checked; }).map(function (c) { return c.value; });
    var b = Number((document.getElementById("admBudget") || {}).value), on = !!(document.getElementById("admHocOn") || {}).checked;
    if (!(b >= 0 && b <= 50)) return toast_("Hạn mức 0–50");
    rpc("admin_ai_settings", { p_enabled: on, p_sources: src, p_budget: Math.round(b) }).then(function () { toast_("Đã lưu nguồn và hạn mức"); listHoc(); }).catch(function (e) { toast_(errMsg(e)); });
  };
  window.btHocCt = function () {
    var t = (document.getElementById("admCtTarget").value || "").trim();
    if (t.length < 2) return toast_("Ghi nội dung cần học");
    rpc("admin_ai_agenda_save", { p_id: null, p_kind: document.getElementById("admCtKind").value, p_target: t, p_prov: document.getElementById("admCtProv").value || null,
      p_priority: +document.getElementById("admCtPri").value, p_status: "dang_hoc", p_note: (document.getElementById("admCtNote").value || "").trim() || null })
      .then(function () { toast_("Đã thêm vào chương trình học"); listHoc(); }).catch(function (e) { toast_(errMsg(e)); });
  };
  window.btHocCtSt = function (id, status) {
    var g = (hoc.ag || []).filter(function (x) { return x.id === id; })[0]; if (!g) return;
    rpc("admin_ai_agenda_save", { p_id: id, p_kind: g.kind, p_target: g.target, p_prov: g.prov_id, p_priority: g.priority, p_status: status, p_note: g.note })
      .then(function () { toast_(lbl2(CT_ST, status)); listHoc(); }).catch(function (e) { toast_(errMsg(e)); });
  };
  function sleepMs(ms) { return new Promise(function (r) { setTimeout(r, ms); }); }
  /* Nhập file học liệu hàng loạt: đọc JSON, bỏ qua mục đã có, ghi tuần tự từng mục (thử lại 1 lần khi lỗi). */
  window.btHocNhapFile = function () {
    if (hoc.dangNhap) { toast_("Đang nhập file, chờ xong đã"); return; }
    var inp = document.getElementById("admNhapFile"), msg = document.getElementById("admNhapMsg"), btn = document.getElementById("admNhapBtn");
    var f = inp && inp.files && inp.files[0];
    if (!f) { toast_("Chọn file JSON trước"); return; }
    hoc.dangNhap = true; if (btn) btn.disabled = true;
    if (msg) msg.innerHTML = '<p class="muted">Đang đọc file…</p>';
    var rd = new FileReader();
    rd.onerror = function () { hoc.dangNhap = false; if (btn) btn.disabled = false; if (msg) msg.innerHTML = '<p class="dg-err" role="alert">Không đọc được file.</p>'; };
    rd.onload = function () {
      var data;
      try { data = JSON.parse(rd.result); } catch (e) { hoc.dangNhap = false; if (btn) btn.disabled = false; if (msg) msg.innerHTML = '<p class="dg-err" role="alert">File không phải JSON hợp lệ.</p>'; return; }
      var AG0 = Array.isArray(data.agenda) ? data.agenda : [], LS0 = Array.isArray(data.lessons) ? data.lessons : [];
      if (!AG0.length && !LS0.length) { hoc.dangNhap = false; if (btn) btn.disabled = false; if (msg) msg.innerHTML = '<p class="dg-err" role="alert">File không có mục agenda hay lessons nào.</p>'; return; }
      Promise.all([rpc("admin_ai_state"), rpc("admin_ai_lessons")]).then(function (r) {
        var exAg = {}, exQ = {};
        ((r[0] || {}).agenda || []).forEach(function (g) { exAg[g.kind + "|" + String(g.target || "").trim().toLowerCase() + "|" + (g.prov_id || "")] = 1; });
        (r[1] || []).forEach(function (l) { if (l.kind === "hoi_dap" && l.data && l.data.q) exQ[String(l.data.q).trim().toLowerCase()] = 1; });
        var agOk = 0, agBo = 0, lsOk = 0, lsBo = 0, loi = [];
        var tick = function () { if (msg) msg.innerHTML = '<p class="muted">Đang nhập… agenda ' + agOk + '/' + AG0.length + ', bài ' + lsOk + '/' + LS0.length + (loi.length ? ', lỗi ' + loi.length : '') + '</p>'; };
        var chuoi = Promise.resolve();
        AG0.forEach(function (a) {
          chuoi = chuoi.then(function () {
            var k = String(a.kind || ""), t = String(a.target || "").trim(), p = String(a.prov_id || "").trim(), pr = +a.priority || 2;
            if (exAg[k + "|" + t.toLowerCase() + "|" + p]) { agBo++; return; }
            if ((k !== "dia_danh" && k !== "chu_de") || t.length < 2 || t.length > 160 || !(pr >= 1 && pr <= 3) || !/^[a-z0-9-]{2,40}$/.test(p)) { loi.push("agenda " + (t || "(trống)") + ": thiếu kind/target/tỉnh hoặc ưu tiên sai"); return; }
            var note = a.note ? String(a.note).slice(0, 500) : null;
            var goi = function () { return rpc("admin_ai_agenda_save", { p_id: null, p_kind: k, p_target: t, p_prov: p, p_priority: pr, p_status: "dang_hoc", p_note: note }); };
            return goi().then(function () { agOk++; }, function () { return goi().then(function () { agOk++; }, function (e2) { loi.push("agenda " + t + ": " + errMsg(e2)); }); }).then(tick);
          }).then(function () { return sleepMs(50); });
        });
        LS0.forEach(function (l) {
          chuoi = chuoi.then(function () {
            var d = l.data || {}, q = String(d.q || "").trim(), a = String(d.a || "").trim();
            if (l.kind !== "hoi_dap") { loi.push("bài (kind " + (l.kind || "?") + "): chỉ nhập được bài hỏi đáp"); return; }
            if (exQ[q.toLowerCase()]) { lsBo++; return; }
            if (q.length < 4 || q.length > 200 || a.length < 4 || a.length > 1500) { loi.push("bài " + (q.slice(0, 40) || "(trống)") + ": câu hỏi/câu trả lời sai độ dài"); return; }
            var dd = { q: q, a: a }; if (d.prov_id) dd.prov_id = String(d.prov_id);
            var goi = function () { return rpc("admin_ai_lesson_save", { p_id: null, p_kind: "hoi_dap", p_data: dd, p_active: true, p_note: null }); };
            return goi().then(function () { lsOk++; }, function () { return goi().then(function () { lsOk++; }, function (e2) { loi.push("bài " + q.slice(0, 40) + ": " + errMsg(e2)); }); }).then(tick);
          }).then(function () { return sleepMs(50); });
        });
        return chuoi.then(function () {
          hoc.dangNhap = false; if (btn) btn.disabled = false;
          var tk = "Đã nhập " + agOk + " mục học + " + lsOk + " bài" + ((agBo || lsBo) ? " (bỏ qua " + (agBo + lsBo) + " mục đã có)" : "") + (loi.length ? " · lỗi " + loi.length + " mục: " + loi.slice(0, 3).join(" | ") : "");
          return rpc("admin_ai_lessons").then(function (Lx) { hoc.lessons = Lx || []; apDay(); }, function () { }).then(function () { listHoc(); toast_(tk); });
        });
      }).catch(function (e) {
        hoc.dangNhap = false; if (btn) btn.disabled = false;
        if (msg) msg.innerHTML = '<p class="dg-err" role="alert">' + esc(errMsg(e)) + '</p>';
      });
    };
    rd.readAsText(f);
  };
  window.btHocDuyet = function (i, status) {
    var c = hoc.c && hoc.c[i]; if (!c) return;
    var note = ((document.getElementById("admCdNote" + i) || {}).value || "").trim();
    if (status === "tu_choi" && note.length < 3) return toast_("Từ chối cần ghi lý do");
    rpc("admin_ai_review", { p_id: c.id, p_status: status, p_ten: ((document.getElementById("admCdTen" + i) || {}).value || "").trim() || null,
      p_text: ((document.getElementById("admCdT" + i) || {}).value || "").trim() || null, p_note: note || null }).then(function () {
      if (status !== "da_duyet") { toast_("Đã từ chối"); return listHoc(); }
      return rpc("admin_ai_lessons").then(function (Lx) { hoc.lessons = Lx || []; apDay(); toast_("Đã duyệt, trợ lý dùng ngay"); listHoc(); });
    }).catch(function (e) { toast_(errMsg(e)); });
  };

  /* ================= Quản trị viên ================= */
  function listAdmins() {
    loading();
    rpc("admin_list").then(function (L) {
      body('<p class="small">Người được cấp quyền thấy trang này và sửa được dữ liệu. Người đó cần đăng ký tài khoản trong app trước. Không tự gỡ quyền của mình được, nên luôn còn ít nhất 1 admin.</p>' +
        '<div class="notebox"><div class="field"><label for="admGrEmail">Email tài khoản cần cấp quyền</label><input id="admGrEmail" type="email" maxlength="200" autocomplete="off" placeholder="ten@vidu.com"></div>' +
        '<div class="field"><label for="admGrNote">Ghi chú (không bắt buộc)</label><input id="admGrNote" maxlength="300"></div>' +
        '<button class="btn btn-primary" onclick="btAdmGrant()">Cấp quyền admin</button></div>' +
        '<h3>Đang có ' + (L || []).length + ' admin</h3><div class="dg-list">' + (L || []).map(function (a) {
          return '<div class="dg-item"><p><b>' + esc(a.name || "(chưa đặt tên)") + '</b>' + (a.is_me ? ' <span class="small">(bạn)</span>' : '') + '</p><p class="small">' + esc(a.email || a.user_id) + ' · từ ' + esc(DG().fmtTime(a.created_at)) + '</p>' + (a.note ? '<p class="small">Ghi chú: ' + esc(a.note) + '</p>' : '') +
            (a.is_me ? '' : '<div id="admRv-' + esc(a.user_id) + '"><button class="btn btn-ghost" onclick="btAdmRevoke1(\'' + esc(a.user_id) + '\')">Gỡ quyền</button></div>') + '</div>';
        }).join("") + '</div>');
    }).catch(fail);
  }
  window.btAdmGrant = function () {
    var em = (document.getElementById("admGrEmail").value || "").trim(), note = (document.getElementById("admGrNote").value || "").trim();
    if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(em)) return toast_("Email không hợp lệ");
    rpc("admin_grant", { p_email: em, p_note: note || null }).then(function () { toast_("Đã cấp quyền admin cho " + em); listAdmins(); }).catch(function (e) { toast_(errMsg(e)); });
  };
  window.btAdmRevoke1 = function (uid) {
    var el = document.getElementById("admRv-" + uid); if (!el) return;
    el.innerHTML = '<div class="field"><label for="admRvWhy">Lý do gỡ (không bắt buộc)</label><input id="admRvWhy" maxlength="300"></div>' +
      '<button class="btn btn-orange" onclick="btAdmRevoke2(\'' + esc(uid) + '\')">Xác nhận gỡ quyền</button> <button class="btn btn-ghost" onclick="btAdminTab(\'qtv\')">Thôi</button>';
  };
  window.btAdmRevoke2 = function (uid) {
    var why = ((document.getElementById("admRvWhy") || {}).value || "").trim();
    rpc("admin_revoke", { p_user: uid, p_note: why || null }).then(function () { toast_("Đã gỡ quyền admin"); listAdmins(); }).catch(function (e) { toast_(errMsg(e)); });
  };

  /* ---------- đường vào: #/admin ---------- */
  function route() { if (location.hash === "#/admin" && !document.getElementById("admView")) btAdminOpen(); }
  window.addEventListener("hashchange", route);
  /* mở app bằng link /#/admin (hoặc /admin chuyển về): app.js ghi lại địa chỉ lúc khởi động nên đọc startHash */
  function start() { if (typeof startHash === "string" && startHash === "#/admin" && !document.getElementById("admView")) btAdminOpen(); else route(); }
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", start); else setTimeout(start, 0);
})();
