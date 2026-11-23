/* Bộ tìm kiếm chung cho ô tìm Khám phá, trang Điểm đến, ô điểm đến khi lập kế hoạch.
   Trả về danh sách đã xếp hạng, KHÔNG tự mở kết quả nào.
   Xếp hạng: trùng tên 100 > tên bắt đầu bằng cụm gõ 85 > tên chứa nguyên cụm 75 > đủ các từ 50.
   Lượt 1 khớp chặt theo dấu (wordMatch: gõ "mưa" không ra "múa rối").
   Chỉ khi lượt 1 trống và gõ từ 2 từ trở lên mới thử lượt 2 bỏ dấu (gõ "Mã Pì Lèng" vẫn ra "Mã Pí Lèng").
   Tên tỉnh cũ (Quảng Nam, Bình Định...) trả về tỉnh mới, ghi rõ "… cũ nay thuộc …". */
(function () {
  var SYN = [["vinpearl", "vinwonders"], ["cau vang", "ba na"], ["dai noi", "kinh thanh hue"],
    ["sai gon", "ho chi minh"], ["tp hcm", "ho chi minh"], ["tphcm", "ho chi minh"], ["hcm", "ho chi minh"],
    ["hang son doong", "son doong"], ["dong phong nha", "phong nha"]];
  function fold(s) { return String(s || "").toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "").replace(/đ/g, "d"); }
  function norm(s) { return " " + fold(s).replace(/[^a-z0-9]+/g, " ").trim() + " "; }
  function variants(q) {
    var f = norm(q).trim(), out = [{ q: q, f: f, pen: 0 }];
    SYN.forEach(function (p) {
      [0, 1].forEach(function (i) {
        var a = p[i], b = p[1 - i], pad = " " + f + " ";
        if (pad.indexOf(" " + a + " ") >= 0) { var nf = pad.replace(" " + a + " ", " " + b + " ").trim(); out.push({ q: nf, f: nf, pen: 5 }); }
      });
    });
    return out;
  }
  function phraseScore(name, f) {
    var fn = norm(name), fq = " " + f + " ";
    if (fn === fq) return 100;
    if (fn.indexOf(fq) === 0) return 85;
    if (fn.indexOf(fq) >= 0) return 75;
    return 0;
  }
  function scoreName(name, v, loose) {
    if (!loose) {
      if (typeof wordMatch === "function" && !wordMatch(name, v.q)) return 0;
      return Math.max(phraseScore(name, v.f), 50);
    }
    var ps = phraseScore(name, v.f);
    if (ps) return ps - 10;
    var fn = norm(name), toks = v.f.split(" ");
    for (var i = 0; i < toks.length; i++) if (fn.indexOf(" " + toks[i] + " ") < 0) return 0;
    return 40;
  }
  function oldNameHits(q) {
    var out = [], f = norm(q).trim();
    if (typeof SAP_NHAP === "undefined" || f.length < 4) return out;
    Object.keys(SAP_NHAP).forEach(function (pid) {
      SAP_NHAP[pid].forEach(function (nm, k) {
        if (k > 0 && norm(nm).trim() === f) out.push({ pid: pid, old: nm });
      });
    });
    return out;
  }
  function run(q, loose) {
    var res = [], seen = {};
    function add(kind, prov, x, s, extra) {
      var key = kind + "|" + prov.id + "|" + (x ? x.id : "");
      if (seen[key] != null && res[seen[key]].s >= s) return;
      var item = { kind: kind, prov: prov, x: x, s: s };
      if (extra) for (var k in extra) item[k] = extra[k];
      if (seen[key] != null) res[seen[key]] = item; else { seen[key] = res.length; res.push(item); }
    }
    var vs = variants(q);
    vs.forEach(function (v) {
      (typeof DESTINATIONS !== "undefined" ? DESTINATIONS : []).forEach(function (d) {
        var prov = provById(d.provId || d.id); if (!prov) return;
        var s = Math.max(scoreName(d.name, v, loose), scoreName(prov.name, v, loose));
        if (s >= 75) add("prov", prov, null, s - v.pen);
      });
      PROV_DATA.forEach(function (prov) {
        prov.places.forEach(function (x) { var s = scoreName(x.name, v, loose); if (s) add("place", prov, x, s - v.pen); });
        prov.dishes.forEach(function (x) { var s = scoreName(x.name, v, loose); if (s) add("dish", prov, x, s - v.pen - 3); });
        prov.stays.forEach(function (x) { var s = scoreName(x.name, v, loose); if (s) add("stay", prov, x, s - v.pen - 10); });
      });
    });
    return res;
  }
  var ORDER = { prov: 0, place: 1, dish: 2, stay: 3 };
  window.btSearch = function (q) {
    q = String(q || "").trim();
    if (!q || typeof PROV_DATA === "undefined") return [];
    var res = run(q, false), loose = false;
    /* Bỏ dấu chỉ khi gõ từ 2 từ trở lên: 1 từ ngắn như "mưa" bỏ dấu sẽ khớp nhầm "múa" */
    if (!res.length && norm(q).trim().split(" ").length >= 2) { res = run(q, true); loose = res.length > 0; }
    oldNameHits(q).forEach(function (o) {
      var prov = provById(o.pid);
      if (prov && !res.some(function (r) { return r.kind === "prov" && r.prov.id === prov.id; }))
        res.push({ kind: "prov", prov: prov, x: null, s: 95, oldName: o.old });
    });
    res.sort(function (a, b) { return (b.s - a.s) || (ORDER[a.kind] - ORDER[b.kind]); });
    res.loose = loose;
    return res;
  };
  /* Thẻ kết quả dùng chung */
  window.btSearchCard = function (r) {
    if (r.kind === "prov") {
      if (r.oldName) return '<button class="card" onclick="openProvDetail(\'' + r.prov.id + '\')"><div class="body"><h3>' + esc(r.oldName) + ' cũ nay thuộc ' + esc(r.prov.name) + '</h3><p class="muted">Từ 01/07/2025, ' + esc(r.oldName) + ' sáp nhập vào ' + esc(r.prov.name) + '. Bấm để xem cẩm nang ' + esc(r.prov.name) + '.</p></div></button>';
      var d = DESTINATIONS.filter(function (x) { return (x.provId || x.id) === r.prov.id; })[0];
      return d ? destCard(d) : "";
    }
    if (r.kind === "place") return provPlaceCard(r.x, r.prov);
    if (r.kind === "dish") return provDishCard(r.x, r.prov);
    return provStayCard(r.x, r.prov);
  };
})();
