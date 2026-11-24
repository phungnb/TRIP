/* BuiTrip AI — gợi ý nơi đi theo điều kiện (suy luận trên dữ liệu app).
   Trả lời các câu không hỏi một nơi cụ thể mà hỏi "đi đâu" kèm điều kiện:
     tháng ("tháng 6", "tết", "hè"), chủ đề ("lúa chín", "lặn ngắm san hô", "leo núi", "biển"),
     đối tượng ("trẻ nhỏ", "cặp đôi"), vùng ("miền Bắc"), nơi đi và độ gần ("gần Hà Nội", "từ Sài Gòn cuối tuần"),
     số ngày, ngân sách ("5 triệu").
   Cách làm: chấm điểm từng nơi (khu hoặc tỉnh) trên dữ liệu app: mùa đẹp từng mệnh đề ("tháng 9–10 lúa chín…"),
   mô tả, đối tượng phù hợp của từng địa danh, khoảng cách, bảng chi phí. Không thêm số nào ngoài dữ liệu.
   Điều kiện app không có dữ liệu để kiểm (vd nhiệt độ từng tháng) thì nói rõ đã xếp theo gì. */
(function (A) {
  var esc = A.esc, fold = A.fold;
  function btn(t, js) { return '<button class="chip" onclick="' + js + '">' + esc(t) + '</button>'; }
  function chips(qs) { return '<div class="ask-chips">' + qs.map(function (t) { return '<button class="chip" type="button" onclick="btAskChip(this.textContent)">' + esc(t) + '</button>'; }).join("") + '</div>'; }
  function km(a, b) { if (!a || !b || a.lat == null || b.lat == null) return 0; var r = Math.PI / 180, x = Math.sin((b.lat - a.lat) * r / 2), y = Math.sin((b.lng - a.lng) * r / 2); return Math.round(12742 * Math.asin(Math.sqrt(x * x + Math.cos(a.lat * r) * Math.cos(b.lat * r) * y * y))); }

  /* ---------- Chủ đề: tên hiển thị, từ nhận trong câu hỏi, từ tìm trong dữ liệu (đã bỏ dấu) ---------- */
  var THEME = [
    { id: "lua", ten: "ngắm lúa chín, ruộng bậc thang", hoi: /\b(lua chin|ruong bac thang|mua lua|ngam lua|ruong lua)\b/, du: /\b(lua chin|ruong bac thang|lua xanh|mua lua)\b/ },
    { id: "sanho", ten: "lặn ngắm san hô", hoi: /\b(san ho|lan bien|lan ngam|lan bin[hg]|snorkel)\b/, du: /\b(san ho|lan ngam|lan bien|lan bin[hg]|snorkel)/ },
    { id: "leonui", ten: "leo núi, trekking", hoi: /\b(leo nui|trekking|trek|chinh phuc dinh|leo dinh)\b/, du: /\b(leo nui|trekking|trek|chinh phuc|leo bo|dinh nui|nóc nha)\b/ },
    { id: "sanmay", ten: "săn mây", hoi: /\bsan may\b/, du: /\bsan may\b/ },
    { id: "hoa", ten: "mùa hoa", hoi: /\b(hoa (dao|mai|ban|cai|man|le|sen|da quy|tam giac mach|anh dao|do quyen|phuong)|tam giac mach|da quy|mua hoa|ngam hoa)\b/, du: /\b(hoa (dao|mai|ban|cai|man|le|sen|da quy|tam giac mach|anh dao|do quyen|phuong)|tam giac mach|da quy)\b/ },
    { id: "thac", ten: "thác nước", hoi: /\bthac\b/, du: /\bthac\b/ },
    { id: "hang", ten: "hang động", hoi: /\b(hang dong|kham pha hang|hang)\b/, du: /\b(hang dong|hang [a-z]+)\b/ },
    { id: "nuocnoi", ten: "mùa nước nổi", hoi: /\bnuoc noi\b/, du: /\bnuoc noi\b/ },
    { id: "camtrai", ten: "cắm trại", hoi: /\b(cam trai|glamping)\b/, du: /\b(cam trai|glamping)\b/ },
    { id: "suoinong", ten: "tắm suối nước nóng, khoáng nóng", hoi: /\b(suoi nuoc nong|khoang nong|tam khoang|onsen)\b/, du: /\b(suoi nuoc nong|khoang nong|tam khoang|onsen)\b/ },
    { id: "tamlinh", ten: "chùa chiền, tâm linh", hoi: /\b(tam linh|hanh huong|di chua|le chua|vieng chua)\b/, du: /\b(chua|tam linh|hanh huong|thien vien)\b/ },
    { id: "lichsu", ten: "di tích lịch sử", hoi: /\b(di tich|lich su|chien truong|bao tang)\b/, du: /\b(di tich|lich su|chien truong|bao tang)\b/ },
    { id: "bien", ten: "biển", hoi: /\b(bien|tam bien|bai tam|di dao|ra dao)\b/, du: /\b(bien|bai tam|bai [a-z]+|dao|vinh)\b/ }
  ];
  var DOITUONG = [
    { id: "treem", ten: "đi cùng trẻ nhỏ", hoi: /\b(tre nho|tre em|con nho|em be|be nho|gia dinh co con|dan theo con|cho be|cho con)\b/, du: /\b(tre nho|tre em|gia dinh co tre|moi doi tuong)\b/ },
    { id: "capdoi", ten: "cặp đôi", hoi: /\b(cap doi|hon nhan|trang mat|nguoi yeu|ban gai|ban trai|vo chong)\b/, du: /\bcap doi\b/ },
    { id: "nguoigia", ten: "người lớn tuổi", hoi: /\b(nguoi gia|nguoi lon tuoi|bo me|ong ba|cao tuoi)\b/, du: /\b(nguoi lon tuoi|cao tuoi|moi doi tuong)\b/ }
  ];
  var KHIHAU = [
    { id: "mat", ten: "mát", hoi: /\b(mat me|di dau mat|cho mat|noi mat|cho nao mat|tranh nong|tron nong|tron cai nong|mat mat|se lanh|lanh lanh)\b|\bmat\b(?! (troi|xa|tien))/ },
    { id: "am", ten: "ấm", hoi: /\b(am ap|di dau am|noi am|cho am|tranh ret|tron ret|tron lanh|khong lanh)\b|\bam\b(?! (lich|thuc|nhac|thanh))/ }
  ];
  var CUE = /\b(di dau|noi nao|cho nao|choi dau|dia diem nao|diem nao|tinh nao|vung nao|khu nao|bien nao|dao nao|nen di|goi y|o dau (dep|hay|ngon|mat|am|re)|dia diem|dau dep|dau hay|dau choi|dau vui|dau mat|dau am|dau re|dau gan|di choi o dau|du lich o dau|di du lich dau|nen den)\b/;

  /* ---------- Đọc điều kiện trong câu ---------- */
  function months(f, q) {
    var ql = String(q).toLowerCase(), m = [];
    var re = /thang\s*(\d{1,2})(?:\s*(?:den|toi|-|–|hoac|va|,)\s*(?:thang\s*)?(\d{1,2}))?/g, r;
    while ((r = re.exec(f))) { var a = +r[1], b = r[2] ? +r[2] : a; if (a >= 1 && a <= 12 && b >= 1 && b <= 12) for (var i = a; ; i = i % 12 + 1) { m.push(i); if (i === b) break; } }
    if (/\b(tet|giao thua|dau nam)\b/.test(f) && /(tết|tet|đầu năm|dau nam|giao thừa)/.test(ql)) m.push(1, 2);
    if (/\b(mua he|nghi he|dip he|he nay|he nam nay)\b/.test(f)) m.push(6, 7, 8);
    if (/\b(noel|giang sinh|cuoi nam)\b/.test(f)) m.push(12);
    if (/\b(30 4|304|le 30|2 9|quoc khanh)\b/.test(f)) m.push(/\b(2 9|quoc khanh)\b/.test(f) ? 9 : 4);
    if (/\b(thang nay|bay gio|luc nay|dot nay|sap toi)\b/.test(f)) m.push(new Date().getMonth() + 1);
    return m.filter(function (x, i) { return m.indexOf(x) === i; });
  }
  var GOC = [
    { id: "hn", ten: "Hà Nội", re: /\b(ha noi|hn)\b/, prov: "ha-noi" },
    { id: "sg", ten: "TP.HCM", re: /\b(sai gon|sg|hcm|tp hcm|tphcm|ho chi minh)\b/, prov: "tp-ho-chi-minh" },
    { id: "dn", ten: "Đà Nẵng", re: /\b(da nang)\b/, prov: "da-nang" },
    { id: "hp", ten: "Hải Phòng", re: /\b(hai phong)\b/, prov: "hai-phong" },
    { id: "ct", ten: "Cần Thơ", re: /\b(can tho)\b/, prov: "can-tho" },
    { id: "hue", ten: "Huế", re: /\bhue\b/, prov: "hue" },
    { id: "nt", ten: "Nha Trang", re: /\b(nha trang)\b/, prov: "khanh-hoa" },
    { id: "dl", ten: "Đà Lạt", re: /\b(da lat)\b/, prov: "lam-dong" }
  ];
  function origin(f) {
    var m = f.match(/\b(gan|quanh|tu|xung quanh|cach)\s+(.{2,20})$/) || f.match(/\b(gan|quanh|tu|xung quanh)\s+([a-z ]{2,20}?)(?=\s+(di|cuoi|choi|nen|co|mat|bien|tam|\d|trong|khoang|tam)\b|$)/);
    if (!m) return null;
    for (var i = 0; i < GOC.length; i++) if (GOC[i].re.test(m[2])) { var p = provById(GOC[i].prov); if (p) return { ten: GOC[i].ten, id: GOC[i].id, lat: p.lat, lng: p.lng, gan: m[1] !== "tu", cum: m[0] }; }
    return null;
  }
  function provById(id) { for (var i = 0; i < PROV_DATA.length; i++) if (PROV_DATA[i].id === id) return PROV_DATA[i]; return null; }
  function daysN(f, q) { var d = A.daysOf(q); if (d) return +d.charAt(0); if (/\b(cuoi tuan|2 ngay|hai ngay|thu 7 chu nhat)\b/.test(f)) return 2; if (/\b(1 ngay|mot ngay|trong ngay|di ve trong ngay)\b/.test(f)) return 1; return 0; }

  A.dieuKien = function (q) {
    var f = A.fold(q), o = { f: f };
    o.thang = months(f, q);
    o.chude = THEME.filter(function (t) { return t.hoi.test(f); });
    /* hỏi đúng 1 loài hoa thì chỉ tìm loài đó */
    var hoa = f.match(/\b(tam giac mach|da quy|hoa (dao|mai|ban|cai|man|le|sen|da quy|anh dao|do quyen|phuong|tam giac mach))\b/);
    if (hoa) o.chude = o.chude.map(function (t) { return t.id !== "hoa" ? t : { id: "hoa", ten: hoa[1].indexOf("hoa") === 0 ? A.goiYTen(q, hoa[1]) : "hoa " + A.goiYTen(q, hoa[1]), hoi: t.hoi, du: new RegExp("\\b" + (/^hoa (dao|mai|ban|cai|man|le|sen|phuong)$/.test(hoa[1]) ? hoa[1] : hoa[1].replace(/^hoa /, "")) + "\\b") }; });
    /* "biển" đi kèm chủ đề cụ thể hơn (san hô) thì bỏ "biển" */
    if (o.chude.length > 1) o.chude = o.chude.filter(function (t) { return t.id !== "bien" || !o.chude.some(function (u) { return u.id === "sanho"; }); });
    o.doituong = DOITUONG.filter(function (t) { return t.hoi.test(f); });
    o.khihau = KHIHAU.filter(function (t) { return t.hoi.test(f); }).slice(0, 1);
    o.vung = /\bmien bac|phia bac|tay bac|dong bac\b/.test(f) ? "bac" : /\bmien trung|tay nguyen\b/.test(f) ? "trung" : /\bmien nam|mien tay|nam bo|phia nam\b/.test(f) ? "nam" : "";
    o.goc = origin(f);
    o.ngay = daysN(f, q);
    o.tien = A.budgetOf(q);
    o.nhieu = o.thang.length + o.chude.length + o.doituong.length + o.khihau.length + (o.vung ? 1 : 0) + (o.goc ? 1 : 0) + (o.ngay ? 1 : 0) + (o.tien ? 1 : 0);
    return o;
  };

  /* Có phải câu xin gợi ý nơi đi không: có từ gợi ý ("đi đâu", "nơi nào"…) và ít nhất 1 điều kiện,
     và không nhắc nơi đến cụ thể (trừ nơi xuất phát / "gần X"). */
  A.laGoiY = function (q, E) {
    var o = A.dieuKien(q), f = o.f;
    if (!CUE.test(f)) return null;
    if (!o.nhieu) return null;
    /* nơi trong câu chỉ là nơi xuất phát: bỏ cụm "gần/từ X" rồi xét lại */
    var rest = o.goc ? f.replace(o.goc.cum, " ") : f;
    var E2 = { area: A.findArea(rest), prov: A.findProv(rest), isle: A.findIsle(rest) };
    if (E2.area || E2.isle || (E2.prov && !/\b(mien|tay bac|dong bac|tay nguyen|nam bo)\b/.test(rest))) return null;
    return o;
  };

  /* ---------- Mùa: tách mệnh đề, đọc tháng ---------- */
  function clauses(s) {
    s = String(s || "");
    return s.split(/;|\.\s|\s+và\s+(?=tháng)|,\s+(?=tháng)/i).map(function (c) { return c.trim(); }).filter(Boolean);
  }
  function monthsIn(c) {
    var t = String(c).toLowerCase(), m = [], re = /tháng\s*(\d{1,2})(?:\/\d{4})?(?:\s*[–-]\s*(?:tháng\s*)?(\d{1,2}))?(\s*âm lịch)?/g, r;
    if (/quanh năm/.test(t)) for (var k = 1; k <= 12; k++) m.push(k);
    while ((r = re.exec(t))) { if (r[3]) continue; var a = +r[1], b = r[2] ? +r[2] : a; if (a < 1 || a > 12 || b < 1 || b > 12) continue; for (var i = a; ; i = i % 12 + 1) { m.push(i); if (i === b) break; } }
    return m;
  }
  /* mùa của 1 nơi: { tot: [mệnh đề đẹp], tranh: [tháng tránh] } */
  function seasonOf(text, avoid) {
    var good = [], bad = [];
    /* bỏ phần trong ngoặc bị cắt dở, phần sau "tránh" là tháng nên tránh */
    String(text || "").split(/;|\.\s/).forEach(function (seg) {
      var k = seg.toLowerCase().search(/tránh/);
      if (k >= 0) { bad = bad.concat(monthsIn(seg.slice(k))); seg = seg.slice(0, k); }
      clauses(seg).forEach(function (c) {
        if ((c.match(/\(/g) || []).length > (c.match(/\)/g) || []).length) c = c.replace(/\s*\([^)]*$/, "");
        c = c.replace(/[\s,;:–-]+$/, "");
        var m = monthsIn(c); if (m.length) good.push({ c: c, m: m, f: fold(c) });
      });
    });
    if (avoid) bad = bad.concat(monthsIn(avoid));
    return { tot: good, tranh: bad };
  }

  /* ---------- Đơn vị gợi ý: khu (nếu có hồ sơ mùa riêng) hoặc tỉnh ---------- */
  var UNITS = null;
  function units() {
    if (UNITS) return UNITS;
    var U = {}, L = [];
    function unit(key, o) { if (!U[key]) { U[key] = o; o.places = []; L.push(o); } return U[key]; }
    PROV_DATA.forEach(function (p) {
      if (p.status && p.status !== "published") return;
      var base = unit(p.id, { id: p.id, ten: p.name, p: p, a: null, lat: p.lat, lng: p.lng, mua: seasonOf(p.best_season || ""), muaTxt: p.best_season || "", text: fold([p.overview, (p.types || []).join(" "), p.best_season].join(" ")) });
      (p.places || []).forEach(function (x) {
        var ar = typeof btAreaOfPlace === "function" ? btAreaOfPlace(p, x) : null, pr = ar && typeof btAreaProfile === "function" ? btAreaProfile(ar) : null, u = base;
        if (ar && pr && pr.season) u = unit("khu:" + ar.id, { id: ar.id, ten: ar.name, p: p, a: ar, lat: ar.lat, lng: ar.lng, mua: seasonOf(pr.season.best, pr.season.avoid), muaTxt: pr.season.best, text: fold(pr.season.best) });
        u.places.push({ x: x, f: fold([x.name, x.review_m, x.history, x.note, x.duration].join(" ")), ai: fold(x.suitable || "") });
      });
    });
    return (UNITS = L);
  }

  /* ---------- Chấm điểm ---------- */
  function score(u, o) {
    var s = 0, why = [], hits = [], bad = false;
    /* tháng */
    var muaKhop = [];
    if (o.thang.length) {
      if (o.thang.some(function (m) { return u.mua.tranh.indexOf(m) >= 0; }) && !u.mua.tot.some(function (c) { return o.thang.some(function (m) { return c.m.indexOf(m) >= 0; }); })) return null;
      muaKhop = u.mua.tot.filter(function (c) { return o.thang.some(function (m) { return c.m.indexOf(m) >= 0; }); });
      if (!muaKhop.length) return null;
      /* tháng chỉ khớp mệnh đề có cảnh báo (bão, mưa, nóng, rét, đông) thì xếp sau */
      s += muaKhop.some(function (c) { return !/\b(bao|mua nhieu|nong|ret|dong nhat|rat dong)\b/.test(c.f); }) ? 3 : 1;
    }
    /* chủ đề: mệnh đề mùa có chủ đề (và đúng tháng nếu có) mạnh nhất, rồi tới địa danh khớp */
    var themeOk = true;
    o.chude.forEach(function (t) {
      var cs = (muaKhop.length ? muaKhop : u.mua.tot).filter(function (c) { return t.du.test(c.f); });
      var ps = u.places.filter(function (pl) { return t.du.test(pl.f); });
      if (t.id === "bien") ps = ps.filter(function (pl) { var n = fold(pl.x.name); return !/\b(nha tu|bao tang|chua|den|nghia trang|cho)\b/.test(n) && (/\b(bien|bai|vinh|hon|mui|ganh)\b/.test(n) || /\b(tam bien|bai bien|bo bien|bai tam)\b/.test(pl.f)); });
      if (!cs.length && !ps.length && !t.du.test(u.text)) { themeOk = false; return; }
      if (cs.length) { s += 6; why.push("mùa: " + cs[0].c); }
      else if (o.thang.length && !ps.length) { themeOk = false; return; }
      s += Math.min(ps.length, 4) * 1.5 + (t.du.test(u.text) ? 1 : 0);
      hits = hits.concat(ps);
    });
    if (!themeOk) return null;
    /* đối tượng */
    o.doituong.forEach(function (t) {
      var pool = hits.length ? hits : u.places, ps = pool.filter(function (pl) { return t.du.test(pl.ai) || (t.id === "capdoi" && u.p.couple && (u.p.couple.points || []).some(function (n) { return fold(n).indexOf(fold(pl.x.name.split(" (")[0])) >= 0; })); });
      if (!ps.length) { bad = true; return; }
      s += Math.min(ps.length, 4);
      hits = hits.length ? ps : ps;
    });
    if (bad) return null;
    /* khí hậu: chỉ có mô tả chữ, không có số nhiệt độ */
    if (o.khihau.length) {
      if (o.khihau[0].id === "mat") { if (!/\b(mat quanh nam|khi hau mat|mat me|lanh|cao nguyen|san may|suong mu)\b/.test(fold(u.p.overview || "") + " " + (u.a ? u.text : ""))) return null; s += 2; }
      else { if (!(u.lat < 13.5)) return null; s += 2; }
    }
    /* vùng */
    if (o.vung && u.p.region !== o.vung) return null;
    /* nơi đi, độ gần */
    var d = o.goc ? km(o.goc, u) : 0;
    if (o.goc) {
      if (d < 15) return null; /* chính nơi xuất phát */
      var maxKm = o.ngay === 1 ? 150 : o.goc.gan || o.ngay === 2 ? 350 : 0;
      if (maxKm && d > maxKm) return null;
      s -= d / 250;
    }
    /* ngân sách: so với tổng chi phí 3N2Đ ước tính của tỉnh */
    var tong = ((u.p.cost || []).filter(function (r) { return /Tổng/i.test(r.label); })[0] || {}).value || "";
    if (o.tien) { var mm = String(tong).match(/([\d.]+)/); if (!mm) return null; if (+mm[1].replace(/\./g, "") > o.tien) return null; s += 1; }
    /* không hỏi chủ đề: ưu tiên nơi hợp mùa hiện tại, nhiều địa danh; nêu 3 điểm đầu trong cẩm nang */
    if (!o.chude.length && !o.doituong.length) {
      if (!o.thang.length) { var now = new Date().getMonth() + 1; if (u.mua.tot.some(function (c) { return c.m.indexOf(now) >= 0; })) s += 1.5; if (u.mua.tranh.indexOf(now) >= 0) s -= 1; }
      s += Math.min(u.places.length, 20) / 10;
      hits = u.places.slice(0, 3);
    }
    return { u: u, s: s, why: why, hits: hits, muaKhop: muaKhop, d: d, tong: tong };
  }

  function moTa(o) {
    var a = [];
    if (o.chude.length) a.push(o.chude.map(function (t) { return t.ten; }).join(", "));
    if (o.doituong.length) a.push(o.doituong.map(function (t) { return t.ten; }).join(", "));
    if (o.khihau.length) a.push("chỗ " + o.khihau[0].ten);
    if (o.thang.length) a.push("tháng " + o.thang.join(", "));
    if (o.vung) a.push({ bac: "miền Bắc", trung: "miền Trung, Tây Nguyên", nam: "miền Nam" }[o.vung]);
    if (o.goc) a.push((o.goc.gan ? "gần " : "đi từ ") + o.goc.ten);
    if (o.ngay) a.push(o.ngay + " ngày");
    if (o.tien) a.push("ngân sách " + o.tien.toLocaleString("vi-VN") + "đ");
    return a.join(" · ");
  }

  A.answerGoiY = function (q, o) {
    var R = [];
    units().forEach(function (u) { var r = score(u, o); if (r) R.push(r); });
    /* tỉnh có khu riêng khớp thì không lặp lại tỉnh nếu tỉnh chỉ khớp nhờ khu */
    R.sort(function (a, b) { return b.s - a.s || b.hits.length - a.hits.length || a.d - b.d; });
    var top = R.slice(0, 5), h = '<p class="ask-h">Gợi ý nơi đi: ' + esc(moTa(o)) + '</p>';
    if (!top.length) {
      return h + '<p>App chưa có nơi nào khớp đủ các điều kiện này trong dữ liệu.</p>' +
        '<p>Cách khác: bỏ bớt một điều kiện (vd bỏ tháng hoặc ngân sách) rồi hỏi lại, hoặc mở trang chủ chọn vùng để xem từng tỉnh.</p>' +
        chips(["Tháng " + (new Date().getMonth() + 1) + " nên đi đâu", "Đi đâu gần Hà Nội cuối tuần", "Nơi nào ngắm lúa chín tháng 9"]);
    }
    var li = top.map(function (r) {
      var u = r.u, rows = [];
      if (r.why.length) rows.push(esc(r.why[0].charAt(0).toUpperCase() + r.why[0].slice(1)));
      else if (r.muaKhop.length) rows.push("Mùa: " + esc(r.muaKhop[0].c));
      if (r.hits.length) rows.push((o.chude.length || o.doituong.length ? "Điểm hợp: " : "Nên ghé: ") + r.hits.slice(0, 3).map(function (pl) { return esc(pl.x.name.split(" (")[0]); }).join(", "));
      if (o.goc && r.d) rows.push("Cách " + esc(o.goc.ten) + " ~" + r.d + " km đường chim bay");
      if (o.tien && r.tong) rows.push("Chi phí 3N2Đ ước tính: " + esc(r.tong));
      var nm = u.a ? u.ten + " (" + u.p.name + ")" : u.ten;
      return "<li><b>" + esc(nm) + "</b>" + (rows.length ? "<br>" + rows.join("<br>") : "") + "</li>";
    });
    var note = [];
    if (o.khihau.length && o.khihau[0].id === "am") note.push("App chưa có nhiệt độ theo tháng; \"ấm\" xếp theo vị trí phía nam (từ Khánh Hòa trở vào).");
    if (o.khihau.length && o.khihau[0].id === "mat") note.push("App chưa có nhiệt độ theo tháng; \"mát\" xếp theo mô tả vùng núi, cao nguyên trong cẩm nang.");
    if (o.goc) note.push("Khoảng cách là đường chim bay giữa trung tâm hai nơi, đường đi thực tế dài hơn.");
    if (o.tien) note.push("Ngân sách so với tổng chi phí 3 ngày 2 đêm ước tính trong cẩm nang, chưa gồm vé máy bay nếu đi xa.");
    var btns = top.slice(0, 4).map(function (r) {
      return r.u.a && typeof btPlanArea === "function" ? btn("Cẩm nang " + r.u.ten, "btPlanArea('" + r.u.a.id + "')") : btn("Cẩm nang " + r.u.ten, "goProvSeg('" + r.u.p.id + "','tongquan')");
    });
    var next = top[0], nq = [];
    nq.push((next.u.a ? next.u.ten : next.u.p.name) + " đi bằng gì");
    nq.push((next.u.a ? next.u.ten : next.u.p.name) + " có gì chơi");
    return h + '<p>Xếp theo dữ liệu trong app (mùa đẹp, địa danh, khoảng cách, chi phí ước tính):</p><ul class="ask-ul">' + li.join("") + '</ul>' +
      (note.length ? '<p class="small">' + note.map(esc).join(" ") + '</p>' : '') +
      '<div class="ask-act">' + btns.join("") + '</div>' + chips(nq);
  };
  /* ---------- Giới thiệu, lịch sử 1 địa danh ----------
     "lịch sử Hoàng thành Thăng Long", "Chùa Một Cột có gì đặc biệt", "tại sao gọi là Hồ Gươm".
     Lấy đoạn trích Wikipedia (ai/boi-canh.js, ghi giấy phép), không có thì dùng phần lịch sử trong dữ liệu app. */
  var GT = /\b(lich su|gioi thieu|co gi dac biet|dac diem|y nghia|tai sao (goi|lai goi|co ten)|vi sao (goi|lai goi|co ten)|ten goi|xay (dung )?(nam|tu|khi|vao|tu nam) ?(nao|bao gio|luc nao)?|ai xay|nguon goc|truyen thuyet|ke ve|thong tin ve|tim hieu ve|la gi|la cai gi|co tu bao gio|co tu khi nao|bao nhieu tuoi|noi tieng vi|noi tieng ve)\b/;
  var GT_BO = ("lich su|gioi thieu|ve|co gi dac biet|dac diem|y nghia|tai sao|vi sao|goi la|lai goi|co ten|ten goi|xay dung|xay|nam nao|tu nam nao|tu khi nao|khi nao|vao nam nao|bao gio|luc nao|ai|nguon goc|truyen thuyet|ke|thong tin|tim hieu|la gi|la cai gi|co tu|bao nhieu tuoi|noi tieng vi|noi tieng|cua|cho minh|cho toi|hoi|nhe|a|vay|nhi|duoc|nao|dac biet|gi|co|la|duoc xay|nam").split("|").map(function (x) { return x.split(" "); }).sort(function (a, b) { return b.length - a.length; });
  A.laGioiThieu = function (q) {
    var f = A.fold(q); if (!GT.test(f)) return null;
    /* bỏ từ hỏi, giữ tên (có dấu nếu gõ có dấu) */
    var words = String(q).replace(/[?!.,]/g, " ").split(/\s+/).filter(Boolean), fw = words.map(fold), keep = [];
    for (var i = 0; i < words.length;) {
      var n = 0;
      /* cụm nhiều chữ bỏ ở mọi chỗ; chữ đơn ("cờ", "là", "về") chỉ bỏ ở đầu, cuối để không cắt tên */
      for (var g = 0; g < GT_BO.length && !n; g++) { var ph = GT_BO[g]; if (ph.length > 1 && ph.every(function (t, j) { return fw[i + j] === t; })) n = ph.length; }
      if (n) i += n; else keep.push(words[i++]);
    }
    var don = {}; GT_BO.forEach(function (ph) { if (ph.length === 1) don[ph[0]] = 1; });
    while (keep.length && don[fold(keep[0])]) keep.shift();
    while (keep.length && don[fold(keep[keep.length - 1])]) keep.pop();
    var name = keep.join(" ").trim(); if (name.length < 3) return null;
    var it = A.findItem(name, { kinds: ["place"] });
    if (!it || it.ambiguous || !(it.s >= 90 || it.s >= 70 && (" " + fold(it.best.x.name) + " ").indexOf(" " + fold(name) + " ") >= 0)) return null;
    return it.best;
  };
  A.answerGioiThieu = function (e, q) {
    var x = e.x, p = e.prov, k = fold(x.name.split(" (")[0]), bc = typeof BT_BOI_CANH !== "undefined" ? BT_BOI_CANH[k] : null, h = "";
    if (bc) h += '<p>' + esc(bc.t) + '</p><p class="small">Đoạn trên trích Wikipedia tiếng Việt, bài "' + esc(bc.bai) + '", giấy phép CC BY-SA 4.0.</p>';
    else if (x.history) h += '<p>' + esc(String(x.history).replace(/^Theo một số tư liệu chưa chính thống,\s*/i, "").replace(/^./, function (c) { return c.toUpperCase(); })) + '</p><p class="small">Phần lịch sử tổng hợp từ tư liệu công khai, chưa đối chiếu nguồn chính thống.</p>';
    if (x.review_m) h += '<p><b>Nhận xét tổng hợp:</b> ' + esc(x.review_m) + '</p>';
    if (!h) return "";
    /* hỏi năm xây mà đoạn giới thiệu không có năm, thế kỷ: nói thẳng là chưa có */
    if (q && /\b(nam nao|bao gio|khi nao|bao nhieu tuoi|co tu)\b/.test(A.fold(q)) && !/\b(1\d{3}|20\d{2}|thế kỷ|thời (Lý|Trần|Lê|Nguyễn))\b/.test(h))
      h = '<p><b>App chưa có năm xây dựng của ' + esc(x.name.split(" (")[0]) + '.</b> Hỏi ban quản lý di tích hoặc xem bảng giới thiệu tại cổng.</p>' + h;
    return '<p class="ask-h">Giới thiệu ' + esc(x.name.split(" (")[0]) + ' (' + esc(p.name) + ')</p>' + h + A.answerItem(e, []).replace(/^<p class="ask-h">[^<]*<\/p>/, "");
  };
  /* lấy lại chữ có dấu từ câu hỏi cho tên hiển thị */
  A.goiYTen = function (q, folded) { var w = String(q).split(/\s+/), n = folded.split(" ").length; for (var i = 0; i + n <= w.length; i++) { var c = w.slice(i, i + n).join(" "); if (fold(c) === folded) return c.toLowerCase(); } return folded; };
  A._goiYUnits = units;
})(BTAI);
