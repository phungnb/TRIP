/* BuiTrip AI — bước 2: tìm thực thể trong câu hỏi.
   Thứ tự: đảo có tuyến riêng → khu trong tỉnh mới (Quy Nhơn, Phú Quốc…) → tỉnh (tên mới, tên cũ, tên quen gọi) → địa danh/món/chỗ ở.
   Địa danh khớp theo TÊN CHÍNH (trước ngoặc), từ đúng thứ tự, chữ có dấu phải đúng dấu; tên dễ nhầm hòa điểm thì hỏi lại. */
(function (A) {
  var fold = A.fold, low = A.low, has = A.has;
  var IDX = null;
  function main(n) { return String(n || "").split(" (")[0]; }
  /* bản sửa của admin vừa áp (js/du-lieu-sua.js): dựng lại chỉ mục lần hỏi sau */
  A.resetIndex = function () { IDX = null; };
  A.index = function () {
    if (IDX) return IDX;
    IDX = [];
    PROV_DATA.forEach(function (p) {
      [["place", p.places], ["dish", p.dishes], ["stay", p.stays]].forEach(function (k) {
        (k[1] || []).forEach(function (x) {
          if (!x || !x.name) return;
          var m = main(x.name);
          IDX.push({ kind: k[0], prov: p, x: x, fm: fold(m), ff: fold(x.name), lw: low(x.name).split(" "), ftok: fold(x.name).split(" ") });
        });
      });
    });
    /* cụm 2–3 chữ trong tên: giữ lại khi bỏ từ hỏi */
    function grams(t, into) { for (var i = 0; i < t.length; i++) for (var k = 2; k <= 3; k++) if (i + k <= t.length) into[t.slice(i, i + k).join(" ")] = 1; }
    IDX.forEach(function (e) { grams(e.fm.split(" "), A.NAMEGRAM); grams(low(main(e.x.name)).split(" "), A.NAMEGRAM_L); if (e.fm.indexOf(" ") > 0) { A.FULLNAME[e.fm] = 1; A.FULLNAME_L[low(main(e.x.name))] = 1; } });
    function nm(n) { A.NAMEGRAM[fold(n)] = 1; A.NAMEGRAM_L[low(n)] = 1; }
    (typeof KHU_VUC !== "undefined" ? KHU_VUC : []).forEach(function (a) { nm(a.name); });
    PROV_DATA.forEach(function (p) { nm(p.name); });
    if (typeof SAP_NHAP !== "undefined") Object.keys(SAP_NHAP).forEach(function (k) { SAP_NHAP[k].forEach(nm); });
    (typeof BT_ALIAS !== "undefined" ? BT_ALIAS : []).forEach(function (a) { if (a[0].indexOf(" ") > 0) A.NAMEGRAM[a[0]] = 1; });
    return IDX;
  };

  /* ---------- Tỉnh: tên mới, tên cũ (SAP_NHAP), tên quen gọi (BT_ALIAS) ---------- */
  A.findProv = function (q) {
    var f = fold(q), hit = null;
    function take(id, old, len, alias, kind) { if (!hit || len > hit.len) hit = { prov: provById(id), old: old || "", len: len, alias: alias || "", kind: kind }; }
    PROV_DATA.forEach(function (p) { var n = fold(p.name); if (n && has(f, n)) take(p.id, "", n.length, "", "prov"); });
    if (typeof SAP_NHAP !== "undefined") Object.keys(SAP_NHAP).forEach(function (id) {
      SAP_NHAP[id].forEach(function (o, i) { var on = fold(o); if (on && has(f, on)) take(id, i > 0 ? o : "", on.length + (i > 0 ? 1 : 0), "", i > 0 ? "old" : "prov"); });
    });
    (typeof BT_ALIAS !== "undefined" ? BT_ALIAS : []).forEach(function (a) {
      if (has(f, a[0])) take(a[1], a[2] && SAP_NHAP[a[1]] && SAP_NHAP[a[1]][0] !== a[2] ? a[2] : "", a[0].length + 2, a[0], "alias");
    });
    return hit && hit.prov ? hit : null;
  };
  A.findArea = function (q) { return typeof btAreaFor === "function" ? btAreaFor(q) : null; };
  A.findIsle = function (q) { return typeof btIsleFor === "function" ? btIsleFor(q) : null; };
  /* Câu hỏi chỉ gồm tên 1 nơi (khu, tỉnh, tỉnh cũ): không bắt 1 địa danh lẻ */
  A.isPlaceName = function (rest) {
    var r = fold(rest), r1 = r.replace(/ /g, "");
    if (!r) return false;
    function eq(n) { n = fold(n); return n === r || n.replace(/ /g, "") === r1; }
    if (PROV_DATA.some(function (p) { return eq(p.name); })) return true;
    /* mốc trung tâm tỉnh trùng đúng tên 1 địa danh (Hồ Hoàn Kiếm): để bước địa danh trả mục đó */
    if (PROV_DATA.some(function (p) { return eq(p.anchor || ""); }) && !A.index().some(function (e) { return e.kind === "place" && e.fm === r; })) return true;
    if (typeof SAP_NHAP !== "undefined" && Object.keys(SAP_NHAP).some(function (k) { return SAP_NHAP[k].some(eq); })) return true;
    if (typeof KHU_VUC !== "undefined" && KHU_VUC.some(function (a) { return eq(a.name) || a.exact.some(eq) || a.keys.some(eq); })) return true;
    /* tên quen gọi trùng đúng tên 1 địa danh (Tam Đảo, Mũi Né…): để bước địa danh trả mục đó */
    if (typeof BT_ALIAS !== "undefined" && BT_ALIAS.some(function (a) { return a[0] === r; }) && !A.index().some(function (e) { return e.kind === "place" && e.fm === r; })) return true;
    return false;
  };

  /* ---------- Địa danh, món, chỗ ở ---------- */
  function inOrder(hay, toks) { var pos = 0, h = " " + hay + " "; for (var i = 0; i < toks.length; i++) { var k = h.indexOf(" " + toks[i] + " ", pos); if (k < 0) return false; pos = k + toks[i].length + 1; } return true; }
  function joined(fm, r) { if (r.indexOf(" ") >= 0 || r.length < 4) return false; var w = fm.split(" "); for (var i = 0; i < w.length; i++) { var s = w[i]; for (var j = i + 1; j < w.length && s.length < r.length; j++) { s += w[j]; if (s === r) return true; } } return false; }
  function score(e, r, rt, acc) {
    /* chữ người dùng gõ có dấu mà tên cũng có chữ đó (bỏ dấu) thì phải đúng dấu: "mưa" không khớp "múa" */
    for (var i = 0; i < acc.length; i++) { var fa = fold(acc[i]); if (e.ftok.indexOf(fa) >= 0 && e.lw.indexOf(acc[i]) < 0) return 0; }
    var fm = e.fm;
    if (fm === r) return 100;
    /* câu gõ chứa trọn tên ("eo gió quy nhơn" chứa "eo gió"): tên phủ càng nhiều câu gõ càng sát */
    if (fm.length >= 4 && has(r, fm)) return 78 + 8 * fm.length / r.length;
    /* tên chứa cụm gõ: cụm phủ càng nhiều phần tên càng sát ("bản giốc" sát "Thác Bản Giốc" hơn "Chùa … Bản Giốc") */
    if (r.length >= 4 && fm.indexOf(r) === 0 && has(fm, r)) return 85 + 3 * r.length / fm.length;
    if (r.length >= 4 && has(fm, r)) return 80 + 8 * r.length / fm.length;
    /* gõ đúng tên phụ trong ngoặc ("Sun World Hòn Thơm" của "Cáp treo Hòn Thơm (Sun World Hòn Thơm)") */
    if (r.length >= 5 && e.ff.length > fm.length && e.ff.replace(fm, "").replace(/[()]/g, " ").replace(/\s+/g, " ").trim() === r) return 82;
    if (r.length >= 5 && has(e.ff, r)) return 70;
    if (joined(fm, r)) return 75;
    /* đủ các chữ, đúng thứ tự, có chữ xen giữa ("làng hoa sa đéc" / "Làng hoa kiểng Sa Đéc") */
    if (rt.length >= 3 && inOrder(fm, rt)) return 60 + 20 * rt.length / fm.split(" ").length;
    if (rt.length >= 2 && inOrder(fm, rt)) return 50;
    return 0;
  }
  A.nhomDeNham = function (e) {
    var G = typeof BT_DE_NHAM !== "undefined" ? BT_DE_NHAM : [];
    for (var i = 0; i < G.length; i++) if (G[i].some(function (m) { return m[0] === e.prov.id && m[1] === e.x.id; })) return G[i];
    return null;
  };
  A.ghiDeNham = function (e) { var g = A.nhomDeNham(e), m = g && g.filter(function (m) { return m[0] === e.prov.id && m[1] === e.x.id; })[0]; return m ? m[2] : ""; };
  /* Trả {best, cands, ambiguous}. prov: chỉ xét trong tỉnh đó (khi câu hỏi nêu tỉnh). */
  A.findItem = function (rest, opt) {
    opt = opt || {};
    var r = fold(rest); if (r.length < 3) return null;
    var rt = r.split(" "), acc = low(rest).split(" ").filter(function (t) { return A.marked(t); });
    var out = [];
    A.index().forEach(function (e) {
      if (opt.prov && e.prov.id !== opt.prov.id) return;
      if (opt.kinds && opt.kinds.indexOf(e.kind) < 0) return;
      var s = score(e, r, rt, acc); if (!s) return;
      if (e.kind === "dish") s -= 3; else if (e.kind === "stay") s -= 10;
      out.push({ e: e, s: s });
    });
    /* không thấy: bỏ danh từ chung đầu câu gõ rồi thử lại ("động Hương Tích" → "Hương Tích", "khu du lịch Tam Chúc" → "Tam Chúc") */
    var low1 = !out.length || out.reduce(function (m, o) { return Math.max(m, o.s); }, 0) < 70;
    if (low1 && !opt.retry) {
      var r2 = r.replace(/^(cap treo|sun world|vinwonders|khu du lich|khu di tich|khu|dong|dao|hon|chua|thac|nui|ho|bai bien|bai|bien|den|lang|cho|hang|dinh|cau|pho co|bao tang|deo) /, "");
      /* phần còn lại là tên tỉnh/khu ("biển Quy Nhơn") thì không thử lại: đó là hỏi cả vùng, không phải 1 mục */
      if (r2 !== r && r2.split(" ").length >= 2 && !A.isPlaceName(r2)) { var lw2 = low(rest).split(" "); var again = A.findItem(lw2.slice(lw2.length - r2.split(" ").length).join(" "), Object.assign({}, opt, { retry: 1 })); if (again && again.s >= 70) return again; }
    }
    if (!out.length) return null;
    out.sort(function (a, b) { return b.s - a.s; });
    var top = out[0].s, tie = out.filter(function (o) { return o.s >= top - 1 && o.s >= 70; });
    /* tên nằm trong bảng dễ nhầm (ai/de-nham.js) mà câu hỏi không nêu tỉnh: kéo cả nhóm vào để hỏi lại */
    if (!opt.prov && top >= 85) {
      var g = A.nhomDeNham(out[0].e);
      if (g) out.forEach(function (o) { if (tie.indexOf(o) < 0 && g.some(function (m) { return m[0] === o.e.prov.id && m[1] === o.e.x.id; }) && o.s >= 70 && has(o.e.fm, r)) tie.push(o); });
    }
    /* hòa điểm giữa các mục khác tên chính hoặc khác tỉnh = mơ hồ */
    var names = {}; tie.forEach(function (o) { names[o.e.fm + "|" + o.e.prov.id] = 1; });
    return { best: out[0].e, s: top, cands: tie.map(function (o) { return o.e; }), ambiguous: Object.keys(names).length > 1, all: out };
  };
})(BTAI);
