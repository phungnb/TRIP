/* Bản sửa dữ liệu của admin (Neon, bảng data_overrides) hợp nhất với file tĩnh.
   - File tĩnh (data/*.js) là bản gốc và bản dự phòng: không tải được bản sửa thì app vẫn chạy như cũ.
   - Nạp NGAY sau các file data, trước ai/ và app.js: áp bản sửa đã lưu trên máy (localStorage) đồng bộ,
     rồi khi trang rảnh tải bản mới ở /api/du-lieu, áp lại nếu có đổi.
   - Áp lại được nhiều lần: giữ bản gốc của mỗi mảng đã đụng tới, mỗi lần áp dựng lại từ bản gốc.
   Mã mục: địa danh / món / chỗ ở theo id; tuyến đi đến "sg:0" (nơi đi:thứ tự); đi lại trong tỉnh "0" (thứ tự). */
(function () {
  if (typeof PROV_DATA === "undefined") return;
  var KEY = "bt_du_lieu_sua", KEY_DAY = "bt_bai_day", API = "/api/du-lieu";
  var BASE = {};   /* "prov|kind|from" -> { arr, items: [đối tượng gốc], snap: [bản chép nội dung gốc] } */
  var SIG = "";
  function clone(o) { return JSON.parse(JSON.stringify(o)); }
  function prov(id) { for (var i = 0; i < PROV_DATA.length; i++) if (PROV_DATA[i].id === id) return PROV_DATA[i]; return null; }
  function arrOf(p, kind, from, make) {
    if (kind === "place") return p.places || (p.places = []);
    if (kind === "dish") return p.dishes || (p.dishes = []);
    if (kind === "stay") return p.stays || (p.stays = []);
    if (kind === "local") return p.local || (make ? (p.local = []) : null);
    if (kind === "route") { if (!p.routes) { if (!make) return null; p.routes = {}; } return p.routes[from] || (make ? (p.routes[from] = []) : null); }
    return null;
  }
  function base(p, kind, from) {
    var k = p.id + "|" + kind + "|" + (from || ""), b = BASE[k];
    if (b) return b;
    var arr = arrOf(p, kind, from, true);
    b = BASE[k] = { arr: arr, items: arr.slice(), snap: arr.map(clone) };
    return b;
  }
  /* dựng lại mảng về đúng bản gốc (giữ nguyên đối tượng để chỗ khác đang trỏ tới vẫn đúng) */
  function restore(b) {
    b.items.forEach(function (o, i) { Object.keys(o).forEach(function (k) { delete o[k]; }); Object.assign(o, clone(b.snap[i])); });
    b.arr.length = 0; Array.prototype.push.apply(b.arr, b.items);
  }
  var DONG = { tam_dong: "tạm đóng cửa", dong_han: "đã đóng cửa" };
  function patch(o, d) {
    Object.keys(d).forEach(function (k) {
      if (k === "closed" || k === "from") return;
      if (d[k] === null) { if (k === "lat" || k === "lng") o[k] = null; else o[k] = ""; }
      else o[k] = clone(d[k]);
    });
    if (d.lat != null && d.lng != null) o.approx = false;
    var nk = "name" in o || !("mode" in o) ? "name" : "mode";
    if (d.closed && DONG[d.closed]) { o.closed = d.closed; o[nk] = String(o[nk] || "").split(" (" + DONG.tam_dong)[0].split(" (" + DONG.dong_han)[0] + " (" + DONG[d.closed] + ")"; }
    else if (d.closed === "") delete o.closed;
  }
  function newItem(kind, id, d) {
    var o;
    if (kind === "place") o = { id: id, name: "", address: "", lat: null, lng: null, approx: true, dist: null, price: "Chưa kiểm được", hours: "Chưa kiểm được", duration: "", suitable: "", note: "" };
    else if (kind === "stay") o = { id: id, name: "", address: "", kind: "", price: "Chưa kiểm được giá", dist: "", suitable: "", status_text: "Chưa kiểm chứng / chưa đối tác / chưa thu phí" };
    else if (kind === "dish") o = { id: id, name: "", meal: "Đặc sản địa phương", price: "Chưa kiểm được", desc: "", restaurants: [] };
    else if (kind === "route") o = { id: id, mode: "", time: "", price: "", note: "" };
    else o = { id: id, mode: "", price: "", req: "", note: "" };
    o._moi = 1;
    patch(o, d);
    return o;
  }
  /* rows: [{prov_id, kind, item_id, data, is_new, hidden, deleted}] */
  function apply(rows) {
    rows = Array.isArray(rows) ? rows : [];
    Object.keys(BASE).forEach(function (k) { restore(BASE[k]); });
    var rm = [], add = [];
    rows.forEach(function (r) {
      var p = prov(r.prov_id); if (!p || !r.data) return;
      var d = r.data || {}, kind = r.kind, from = "", idx = -1, id = r.item_id;
      if (kind === "route") { from = d.from || String(id).split(":")[0]; if (!r.is_new) idx = +String(id).split(":")[1]; }
      else if (kind === "local" && !r.is_new) idx = +id;
      if (!/^(sg|hn|dn)?$/.test(from)) return;
      var b = base(p, kind, from);
      if (r.is_new) { if (!r.deleted && !r.hidden) add.push({ b: b, o: newItem(kind, id, d) }); return; }
      var o = null;
      if (idx >= 0) o = b.items[idx] || null;
      else for (var i = 0; i < b.items.length; i++) if (b.items[i].id === id) { o = b.items[i]; break; }
      if (!o) return;
      patch(o, d);
      if (r.hidden || r.deleted) rm.push({ b: b, o: o });
    });
    rm.forEach(function (x) { var i = x.b.arr.indexOf(x.o); if (i >= 0) x.b.arr.splice(i, 1); });
    add.forEach(function (x) { x.b.arr.push(x.o); });
    if (typeof BTAI !== "undefined" && BTAI.resetIndex) BTAI.resetIndex();
  }
  function sig(rows) { return (rows || []).map(function (r) { return r.prov_id + "|" + r.kind + "|" + r.item_id + "|" + r.version; }).sort().join(","); }
  function cacheGet() { try { var j = JSON.parse(localStorage.getItem(KEY) || "null"); return j && Array.isArray(j.items) ? j.items : []; } catch (e) { return []; } }
  function cacheSet(rows) { try { localStorage.setItem(KEY, JSON.stringify({ at: Date.now(), items: rows })); } catch (e) {} }
  function use(rows, save) {
    var s = sig(rows); if (s === SIG) return false;
    SIG = s; apply(rows); if (save) cacheSet(rows);
    try { document.dispatchEvent(new CustomEvent("bt:du-lieu", { detail: { n: rows.length } })); } catch (e) {}
    return true;
  }
  /* Bài admin dạy trợ lý (ai_lessons, thẻ "Định hướng học"): window.BT_DAY, ai/bai-day.js đọc lúc trả lời */
  var SIG_DAY = "";
  function useDay(ai, save) {
    ai = Array.isArray(ai) ? ai.filter(function (x) { return x && x.kind && x.data && typeof x.data === "object"; }) : [];
    var s = JSON.stringify(ai); if (s === SIG_DAY) return false;
    SIG_DAY = s; window.BT_DAY = ai;
    if (save) { try { localStorage.setItem(KEY_DAY, s); } catch (e) {} }
    try { document.dispatchEvent(new CustomEvent("bt:bai-day", { detail: { n: ai.length } })); } catch (e) {}
    return true;
  }
  try { useDay(JSON.parse(localStorage.getItem(KEY_DAY) || "[]"), false); } catch (e) { window.BT_DAY = []; }
  /* tải bản mới; fresh = bỏ qua bộ đệm CDN (admin vừa lưu) */
  function refresh(fresh) {
    if (typeof fetch !== "function") return Promise.resolve(false);
    return fetch(API + (fresh ? "?t=" + Date.now() : ""), { cache: fresh ? "no-store" : "default" })
      .then(function (r) { if (!r.ok) throw new Error("du-lieu " + r.status); return r.json(); })
      .then(function (j) { if (j && Array.isArray(j.ai)) useDay(j.ai, true); return use(j && Array.isArray(j.items) ? j.items : [], true); })
      .catch(function () { return false; });
  }
  window.BTSua = {
    apply: function (rows) { return use(rows, false); },
    day: function (ai) { return useDay(ai, true); },
    refresh: refresh,
    /* admin vừa lưu 1 dòng: áp ngay trên máy này, không chờ mạng */
    put: function (row) {
      var rows = cacheGet().filter(function (r) { return !(r.prov_id === row.prov_id && r.kind === row.kind && r.item_id === row.item_id); });
      rows.push(row); cacheSet(rows); use(rows, false);
    },
    rows: cacheGet,
    /* mọi mục của 1 mảng theo thứ tự gốc, kể cả mục đang ẩn, cộng mục admin thêm: [{id, o, an}] */
    items: function (provId, kind, from) {
      var p = prov(provId); if (!p) return [];
      var b = BASE[provId + "|" + kind + "|" + (from || "")], cur = arrOf(p, kind, from, false) || [];
      var goc = b ? b.items : cur.filter(function (o) { return !o._moi; });
      var out = goc.map(function (o, i) { return { id: kind === "route" ? from + ":" + i : kind === "local" ? String(i) : o.id, o: o, an: cur.indexOf(o) < 0 }; });
      cur.forEach(function (o) { if (o._moi) out.push({ id: o.id, o: o, an: false, moi: true }); });
      return out;
    },
    original: function (provId, kind, from, idOrIdx) {
      var p = prov(provId); if (!p) return null;
      var b = BASE[provId + "|" + kind + "|" + (from || "")];
      var items = b ? b.snap : (arrOf(p, kind, from, false) || []).map(clone);
      if (typeof idOrIdx === "number") return items[idOrIdx] || null;
      for (var i = 0; i < items.length; i++) if (items[i].id === idOrIdx) return items[i];
      return null;
    }
  };
  use(cacheGet(), false);
  if (typeof window.addEventListener === "function")
    window.addEventListener("load", function () { setTimeout(function () { refresh(false); }, 800); });
})();
