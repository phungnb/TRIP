/* BuiTrip AI — bài admin dạy (thẻ "Định hướng học" ở trang admin, bảng ai_lessons trên Neon).
   js/du-lieu-sua.js tải bài đang bật từ /api/du-lieu vào window.BT_DAY (lưu cả trên máy, mất mạng vẫn dùng), báo "bt:bai-day".
   Trợ lý vẫn tự học như cũ; phần này là phần admin định hướng, áp ngay, không cần deploy:
   - hoi_dap {q, a, prov_id?}: câu hỏi + câu trả lời admin viết. Khớp câu hỏi thì trả trước mọi nhánh khác.
   - go_sai {sai, dung}: cách gõ sai -> tên đúng (như BT_BIEN_THE).
   - ten_goi {ten, prov_id, ten_cu?}: tên quen gọi của 1 tỉnh (như BT_ALIAS).
   - kien_thuc {ten, prov_id?, bai, t, nguon, url}: đoạn giới thiệu đã duyệt (Wikipedia/Wikivoyage, CC BY-SA). Chỉ dùng cho
     câu hỏi giới thiệu, lịch sử; không lấy giá, giờ từ đây. */
(function (A) {
  var fold = A.fold, esc = A.esc;
  function L(kind) { return (typeof window !== "undefined" && Array.isArray(window.BT_DAY) ? window.BT_DAY : typeof BT_DAY !== "undefined" && Array.isArray(BT_DAY) ? BT_DAY : []).filter(function (x) { return x && x.kind === kind && x.data; }); }
  function prov(id) { if (!id || typeof PROV_DATA === "undefined") return null; for (var i = 0; i < PROV_DATA.length; i++) if (PROV_DATA[i].id === id) return PROV_DATA[i]; return null; }
  function btn(t, js) { return '<button class="chip" onclick="' + js + '">' + esc(t) + '</button>'; }
  function acts(a) { return '<div class="ask-act">' + a.join("") + '</div>'; }
  function reEsc(s) { return String(s).replace(/[.*+?^${}()|[\]\\]/g, "\\$&"); }
  function words(s) { return fold(s).split(" ").filter(function (w) { return w.length > 1 && !A.QSET[w]; }); }
  var NGUON = { wikipedia_vi: "Wikipedia tiếng Việt", wikipedia_en: "Wikipedia tiếng Anh", wikivoyage_vi: "Wikivoyage tiếng Việt", wikivoyage_en: "Wikivoyage tiếng Anh" };
  function giayPhep(d) { return '<p class="small">Đoạn trên trích ' + esc(NGUON[d.nguon] || "Wikipedia") + (d.bai ? ', bài "' + esc(d.bai) + '"' : '') + ', giấy phép CC BY-SA 4.0.</p>'; }

  /* cách gõ sai: chạy cùng chỗ với BT_BIEN_THE (index.js) */
  A.dayGoSai = function (q) {
    L("go_sai").forEach(function (x) {
      var s = String(x.data.sai || "").trim(), d = String(x.data.dung || "").trim(); if (s.length < 2 || !d) return;
      q = q.replace(new RegExp("(^|\\s)" + reEsc(s) + "(?=\\s|$|[?.,!])", "gi"), "$1" + d);
    });
    return q;
  };

  /* tên quen gọi của tỉnh: nối vào BT_ALIAS (thuc-the.js dựng chỉ mục từ đây), gỡ bản cũ khi bài đổi */
  var DA_THEM = [];
  A.dayTenGoi = function () {
    if (typeof BT_ALIAS === "undefined") return;
    DA_THEM.forEach(function (a) { var i = BT_ALIAS.indexOf(a); if (i >= 0) BT_ALIAS.splice(i, 1); });
    DA_THEM = [];
    L("ten_goi").forEach(function (x) {
      var k = fold(x.data.ten), p = prov(x.data.prov_id); if (k.length < 2 || !p) return;
      if (BT_ALIAS.some(function (a) { return a[0] === k; })) return;
      var a = x.data.ten_cu ? [k, p.id, x.data.ten_cu] : [k, p.id]; BT_ALIAS.push(a); DA_THEM.push(a);
    });
    if (A.resetIndex) A.resetIndex();
  };

  /* câu hỏi admin dạy: trùng gần hết từ có nghĩa với câu mẫu (cả 2 chiều) thì trả câu admin viết */
  A.answerDay = function (q) {
    var w = words(q); if (!w.length) return "";
    var best = null;
    L("hoi_dap").forEach(function (x) {
      var m = words(x.data.q); if (!m.length) return;
      var f = " " + w.join(" ") + " ", g = " " + m.join(" ") + " ";
      var a = m.filter(function (t) { return f.indexOf(" " + t + " ") >= 0; }).length / m.length;
      var b = w.filter(function (t) { return g.indexOf(" " + t + " ") >= 0; }).length / w.length;
      var s = Math.min(a, b);
      if (s >= 0.75 && (!best || s > best.s)) best = { s: s, x: x };
    });
    if (!best) return "";
    var d = best.x.data, p = prov(d.prov_id);
    return '<p class="ask-h">' + esc(d.q) + '</p>' + String(d.a).split(/\n+/).map(function (t) { return '<p>' + esc(t) + '</p>'; }).join("") +
      acts([p ? btn("Cẩm nang " + p.name, "goProvSeg('" + p.id + "','tongquan')") : btn("Xem 34 tỉnh thành", "show('destinations')")]);
  };

  /* đoạn kiến thức đã duyệt cho 1 địa danh (goi-y.js answerGioiThieu dùng trước đoạn có sẵn) */
  A.dayKienThuc = function (ten, provId) {
    var k = fold(String(ten || "").split(" (")[0]), hit = null;
    L("kien_thuc").forEach(function (x) { if (fold(x.data.ten) === k && (!x.data.prov_id || !provId || x.data.prov_id === provId)) hit = x.data; });
    return hit ? { bai: hit.bai || hit.ten, t: hit.t, html: '<p>' + esc(hit.t) + '</p>' + giayPhep(hit) } : null;
  };

  /* chủ đề admin cho học (lễ hội, nghề, món...): câu nêu đích danh chủ đề + hỏi giới thiệu, lịch sử, là gì */
  var CUE = /\b(gioi thieu|lich su|la gi|la ai|nguon goc|y nghia|ke ve|tim hieu|co gi dac biet|thong tin ve|biet gi ve)\b/;
  A.answerDayChuDe = function (q) {
    var f = " " + fold(q) + " ", best = null;
    if (!CUE.test(f.trim())) return "";
    L("kien_thuc").forEach(function (x) {
      var k = fold(x.data.ten); if (k.length < 4) return;
      if (f.indexOf(" " + k + " ") >= 0 && (!best || k.length > fold(best.ten).length)) best = x.data;
    });
    if (!best) return "";
    var p = prov(best.prov_id);
    return '<p class="ask-h">' + esc(best.ten) + (p ? ' (' + esc(p.name) + ')' : '') + '</p><p>' + esc(best.t) + '</p>' + giayPhep(best) +
      acts([p ? btn("Cẩm nang " + p.name, "goProvSeg('" + p.id + "','tongquan')") : btn("Xem 34 tỉnh thành", "show('destinations')")]);
  };

  if (typeof document !== "undefined" && document.addEventListener) document.addEventListener("bt:bai-day", function () { A.dayTenGoi(); });
  A.dayTenGoi();
})(BTAI);
