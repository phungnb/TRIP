/* BuiTrip AI — gợi ý nơi đi theo điều kiện (suy luận trên dữ liệu app).
   Trả lời các câu không hỏi một nơi cụ thể mà hỏi "đi đâu" kèm điều kiện:
     tháng ("tháng 6", "tết", "hè"), chủ đề ("lúa chín", "lặn ngắm san hô", "leo núi", "biển"),
     đối tượng ("trẻ nhỏ", "cặp đôi"), vùng ("miền Bắc"), nơi đi và độ gần ("gần Hà Nội", "từ Sài Gòn cuối tuần"),
     số ngày, ngân sách ("5 triệu").
   Cách làm: chấm điểm từng nơi (khu hoặc tỉnh) trên dữ liệu app: mùa đẹp từng mệnh đề ("tháng 9–10 lúa chín…"),
   mô tả, đối tượng phù hợp của từng địa danh, khoảng cách, bảng chi phí. Không thêm số nào ngoài dữ liệu.
   Điều kiện app không có dữ liệu để kiểm (vd nhiệt độ từng tháng) thì nói rõ đã xếp theo gì. */
(function (A) {
  var esc = A.esc;
  /* bỏ dấu làm nhiều chữ trùng nhau: "Điện Biên" thành "dien bien" (giống "biển"), "trăng mật" thành "trang mat" (giống "mát").
     Gộp các cụm đó thành 1 chữ trước khi so chủ đề. */
  var DINH = [[/\bdien bien( phu)?\b/g, "dienbien"], [/\bbien (hoa|gioi|phong|the|dang|ban|lai|tap|che|dich)\b/g, "bien$1"], [/\btrang mat\b/g, "trangmat"], [/\bmat (troi|xa|tien|ong|na|khau|kinh)\b/g, "mat$1"], [/\bbien ho\b/g, "bienho"]];
  function fold(s) { var f = A.fold(s); DINH.forEach(function (d) { f = f.replace(d[0], d[1]); }); return f; }
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
    { id: "deo", ten: "đèo, cung đường đẹp", hoi: /\b(deo|cung duong|con deo)\b/, du: /\bdeo [a-z]+/ },
    { id: "tuyet", ten: "có thể gặp tuyết, băng giá", hoi: /\b(tuyet roi|co tuyet|ngam tuyet|bang gia|bang tuyet)\b/, du: /\b(tuyet|bang gia)\b/ },
    { id: "bien", ten: "biển", hoi: /\b(bien|tam bien|bai tam|bai bien|di dao|ra dao|len dao|dao nao|hon dao)\b/, du: /\b(bien|bai tam|bai [a-z]+|dao|vinh)\b/ }
  ];
  var DOITUONG = [
    { id: "treem", ten: "đi cùng trẻ nhỏ", hoi: /\b(tre nho|tre em|tre con|con nho|em be|be nho|gia dinh co con|dan theo con|dua con|cho be|cho con|voi be|voi con|cac con|\d con nho|hai con|2 con)\b/, du: /\b(tre nho|tre em|gia dinh co tre|moi doi tuong)\b/ },
    { id: "capdoi", ten: "cặp đôi", hoi: /\b(cap doi|hon nhan|trangmat|nguoi yeu|ban gai|ban trai|vo chong|lang man)\b/, du: /\bcap doi\b/ },
    { id: "nguoigia", ten: "người lớn tuổi", hoi: /\b(nguoi gia|nguoi lon tuoi|bo me|ong ba|cao tuoi|nhe nhang)\b/, du: /\b(nguoi lon tuoi|cao tuoi|moi doi tuong)\b/ }
  ];
  var KHIHAU = [
    { id: "mat", ten: "mát", hoi: /\b(mat me|di dau mat|cho mat|noi mat|cho nao mat|tranh nong|tron nong|tron cai nong|mat mat|se lanh|lanh lanh)\b|\bmat\b/ },
    { id: "am", ten: "ấm", hoi: /\b(am ap|di dau am|noi am|cho am|tranh ret|tron ret|tron lanh|khong lanh)\b|\bam\b(?! (lich|thuc|nhac|thanh))/ }
  ];
  var CUE = /\b(dep nhat|[a-z]+ nao (dep|hay|dang di|nen di|ok)|nen o dau|o dau|cho nao|di dau|noi nao|cho nao|choi dau|choi gi|dia diem nao|diem nao|tinh nao|vung nao|khu nao|bien nao|dao nao|nen di|goi y|o dau (dep|hay|ngon|mat|am|re)|dia diem|dau dep|dau hay|dau choi|dau vui|dau mat|dau am|dau re|dau gan|di choi o dau|du lich o dau|di du lich dau|nen den)\b/;

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
    var f = fold(q), o = { f: f };
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
    o.re = /\b(re|gia re|tiet kiem|it tien|sinh vien)\b/.test(f);
    o.nhieu = o.thang.length + o.chude.length + o.doituong.length + o.khihau.length + (o.vung ? 1 : 0) + (o.goc ? 1 : 0) + (o.ngay ? 1 : 0) + (o.tien ? 1 : 0) + (o.re ? 1 : 0);
    return o;
  };

  /* Có phải câu xin gợi ý nơi đi không: có từ gợi ý ("đi đâu", "nơi nào"…) và ít nhất 1 điều kiện,
     và không nhắc nơi đến cụ thể (trừ nơi xuất phát / "gần X"). */
  var NGOAI = /\b(lao|thai lan|campuchia|singapore|malaysia|han quoc|nhat ban|trung quoc|dai loan|bali|chau au|my|uc)\b/;
  A.laGoiY = function (q, E) {
    var o = A.dieuKien(q), f = o.f;
    if (/\b(o|tai|sang|qua|di)\s+(lao|thai lan|campuchia|singapore|malaysia|han quoc|nhat ban|trung quoc|dai loan|bali|chau au)\b/.test(f) && /\b(di dau|choi gi|nen di|o dau)\b/.test(f)) return { ngoaiNuoc: true, f: f };
    var tsai = f.match(/\bthang (1[3-9]|[2-9]\d|0)\b/);
    if (tsai && /\b(di dau|nen di|choi dau)\b/.test(f)) return { thangSai: tsai[1], f: f };
    /* "đưa 2 con nhỏ đi biển gần Hà Nội": không có chữ "đi đâu" nhưng có chủ đề + đối tượng/nơi xuất phát */
    var ngam = (o.chude.length || o.doituong.length) && (o.goc && o.goc.gan || o.doituong.length) && /\b(di|dua|choi|tam)\b/.test(f);
    if (!CUE.test(f) && !ngam) return null;
    /* hỏi KHI NÀO, BẰNG GÌ, BAO NHIÊU mà không hỏi Ở ĐÂU: để nhánh mùa, đường đi, chi phí trả lời */
    var HOI_NOI = /\b(di dau|o dau|noi nao|cho nao|choi dau|choi gi|dia diem|diem nao|tinh nao|vung nao|khu nao|bai nao|bien nao|dao nao|deo nao|goi y|dau dep|dau hay|nen den|dep nhat)\b/;
    if (!HOI_NOI.test(f) && /\b(mua nao|thang may|thang nao|khi nao|luc nao|bang gi|bao lau|bao nhieu|het bao nhieu|chi phi)\b/.test(f)) return null;
    /* "Thác Bản Giốc nằm ở đâu": hỏi vị trí 1 địa danh có tên riêng, không phải xin gợi ý */
    var vq = String(q).replace(/\s*(nằm|nam)?\s*(ở|o)\s*(đâu|dau)\s*(vậy|vay|ạ|a|nhỉ|nhi)?\s*\??\s*$/i, "");
    if (vq !== String(q) && A.findItem) { var vi = A.findItem(vq, { kinds: ["place"] }); if (vi && vi.s >= 95 && !vi.ambiguous) return null; }
    if (!o.nhieu) return null;
    /* "X ở đâu" chỉ là xin gợi ý khi có chủ đề hoặc đối tượng ("săn mây ở đâu"), không phải "Hội An ở đâu" */
    if (!/\b(di dau|noi nao|cho nao|choi dau|dia diem|diem nao|tinh nao|vung nao|khu nao|bien nao|dao nao|nen di|goi y|dau dep|dau hay|dau choi|dau re|dau gan|nen den)\b/.test(f) && !ngam && !(o.chude.length || o.doituong.length)) return null;
    /* nơi trong câu chỉ là nơi xuất phát: bỏ cụm "gần/từ X" rồi xét lại */
    var rest = o.goc ? f.replace(o.goc.cum, " ") : f;
    var E2 = { area: A.findArea(rest), prov: A.findProv(rest), isle: A.findIsle(rest) };
    /* nhắc tên 1 địa danh cụ thể ("gần biển Mỹ Khê"): để nhánh địa danh, chỗ ở trả lời */
    if (A.findItem && A.rest) { var nm = String(A.rest(q) || "").replace(/^(gần|gan|quanh|cạnh|canh|sát|sat|ngay|tại|tai|ở|o)\s+/i, ""), it = nm && nm.length >= 4 ? A.findItem(nm, { kinds: ["place"] }) : null; if (it && it.s >= 95) return null; }
    if (E2.area || E2.isle || (E2.prov && !/\b(mien|tay bac|dong bac|tay nguyen|nam bo)\b/.test(rest))) {
      /* có nơi đến + chủ đề/đối tượng ("trẻ con chơi gì ở Đà Nẵng", "trekking gần Sa Pa"): gợi ý trong nơi đó.
         Đối tượng ("với trẻ con", "với người cao tuổi") không cần chữ hỏi nơi: bản thân đối tượng đã là điều kiện lọc */
      if (!(o.chude.length || o.doituong.length) || (!HOI_NOI.test(f) && !o.doituong.length)) return null;
      o.trong = E2.area ? { a: E2.area } : E2.isle ? null : { p: E2.prov.prov };
      if (!o.trong) return null;
    }
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
        u.places.push({ x: x, f: fold([x.name, x.review_m, x.history, x.note, x.duration].join(" ")), n: fold(x.name), ai: fold(x.suitable || "") });
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
      if (t.id === "bien") ps = ps.filter(function (pl) { var n = pl.n; return !/\b(nha tu|bao tang|chua|den|nghia trang|cho)\b/.test(n) && /\b(bien|bai|vinh|hon|mui|ganh|dao|cu lao)\b/.test(n) && /\b(tam bien|bai bien|bai tam|bai cat|bo bien|nuoc bien|bien|lan ngam|vinh|dao)\b/.test(pl.f.replace(pl.n, " ")) && !/\bbai (da|xe|co|dau|rac)\b/.test(n); });
      if (t.id === "bien" && !(u.p.types || []).some(function (x) { return /biển|đảo/.test(x); }) && !(u.a && u.a.island)) { themeOk = false; return; }
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
    /* chi phí tại chỗ (bỏ dòng xe, tàu, máy bay đi tới vì bảng tính từ TP.HCM): cộng mức thấp của từng dòng */
    var taiCho = 0, dongTC = 0;
    (u.p.cost || []).forEach(function (r) { if (/Tổng|khứ hồi|máy bay|vé xe|xe khách|tàu hỏa|^xe |^tàu |bay /i.test(r.label)) return; var m = String(r.value).match(/^\s*~?([\d.]+)/); if (m) { taiCho += +m[1].replace(/\./g, ""); dongTC++; } });
    if (o.tien) { if (!dongTC) return null; if (taiCho > o.tien) return null; s += 1 - taiCho / o.tien; }
    if (o.re && dongTC) s += 2 - taiCho / 2e6;
    /* không hỏi chủ đề: ưu tiên nơi hợp mùa hiện tại, nhiều địa danh; nêu 3 điểm đầu trong cẩm nang */
    if (!o.chude.length && !o.doituong.length) {
      if (!o.thang.length) { var now = new Date().getMonth() + 1; if (u.mua.tot.some(function (c) { return c.m.indexOf(now) >= 0; })) s += 1.5; if (u.mua.tranh.indexOf(now) >= 0) s -= 1; }
      s += Math.min(u.places.length, 20) / 10;
      hits = u.places.slice(0, 3);
    }
    return { u: u, s: s, why: why, hits: hits, muaKhop: muaKhop, d: d, tong: tong, taiCho: dongTC ? taiCho : 0 };
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
    if (o.re) a.push("tiết kiệm");
    return a.join(" · ");
  }

  /* Gợi ý trong 1 nơi: lọc địa danh của khu/tỉnh theo chủ đề, đối tượng */
  function trong(q, o) {
    var a = o.trong.a, p = a ? provById(a.prov) : o.trong.p, nm = a ? a.name : p.name;
    var L = (a && typeof btAreaPlaces === "function" ? btAreaPlaces(a) : p.places).map(function (x) { return { x: x, f: fold([x.name, x.review_m, x.history, x.note, x.duration].join(" ")), n: fold(x.name), ai: fold(x.suitable || "") }; });
    var ok = L.filter(function (pl) {
      return o.chude.every(function (t) { return t.du.test(pl.f); }) && o.doituong.every(function (t) { return t.du.test(pl.ai); });
    });
    var h = '<p class="ask-h">' + esc(moTa(o)) + ' ở ' + esc(nm) + '</p>';
    if (!ok.length) {
      var dt = o.doituong.map(function (t) { return { treem: "trẻ em", capdoi: "cặp đôi", nguoigia: "người lớn tuổi" }[t.id] || t.ten; }).join(", ");
      return h + '<p>App chưa có địa danh nào ở ' + esc(nm) + (dt ? ' ghi rõ hợp ' + esc(dt) : ' khớp điều kiện này') + ' trong dữ liệu.</p><p>Cách khác: xem danh sách điểm trong cẩm nang ' + esc(nm) + ', hoặc hỏi nơi khác.</p>' +
        '<div class="ask-act">' + btn("Cẩm nang " + nm, a && typeof btPlanArea === "function" ? "btPlanArea('" + a.id + "')" : "goProvSeg('" + p.id + "','tongquan')") + '</div>';
    }
    return h + '<p>Địa danh trong app hợp điều kiện:</p><ul class="ask-ul">' + ok.slice(0, 6).map(function (pl) {
      var x = pl.x, d = typeof placeDistLabel === "function" ? placeDistLabel(x) : "";
      return '<li><b>' + esc(x.name.split(" (")[0]) + '</b>' + (x.suitable ? '<br>Hợp: ' + esc(x.suitable) : '') + (d ? '<br>' + esc(d) : '') + '</li>';
    }).join("") + '</ul><div class="ask-act">' + ok.slice(0, 3).map(function (pl) { return btn(pl.x.name.split(" (")[0], "openProvPlace('" + (a ? a.prov : p.id) + "','" + pl.x.id + "')"); }).join("") + '</div>';
  }
  A.answerGoiY = function (q, o) {
    var goiYKhac = chips(["Tháng " + (new Date().getMonth() + 1) + " nên đi đâu", "Đi đâu gần Hà Nội cuối tuần", "Nơi nào ngắm lúa chín tháng 9"]);
    if (o.ngoaiNuoc) return '<p class="ask-h">App chỉ có cẩm nang trong nước</p><p>BuiTrip có dữ liệu 34 tỉnh thành Việt Nam, chưa có điểm đến nước ngoài.</p><p>Cách khác: xem trang du lịch chính thức của nước đó, hoặc hỏi app nơi đi trong nước.</p>' + goiYKhac;
    if (o.thangSai) return '<p class="ask-h">Không có tháng ' + esc(o.thangSai) + '</p><p>Năm có 12 tháng. Bạn gõ lại tháng định đi (1 đến 12), app gợi ý theo mùa đẹp trong cẩm nang.</p>' + goiYKhac;
    if (o.trong) return trong(q, o);
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
      /* chỉ in chuỗi có sẵn trong dữ liệu; số tự cộng chỉ dùng để lọc, xếp */
      if ((o.tien || o.re) && r.tong) rows.push("Chi phí 3N2Đ trong cẩm nang (tính cả đi lại từ TP.HCM): " + esc(r.tong));
      var nm = u.a ? u.ten + " (" + u.p.name + ")" : u.ten;
      return "<li><b>" + esc(nm) + "</b>" + (rows.length ? "<br>" + rows.join("<br>") : "") + "</li>";
    });
    var note = [];
    if (o.khihau.length && o.khihau[0].id === "am") note.push("App chưa có nhiệt độ theo tháng; \"ấm\" xếp theo vị trí phía nam (từ Khánh Hòa trở vào).");
    if (o.khihau.length && o.khihau[0].id === "mat") note.push("App chưa có nhiệt độ theo tháng; \"mát\" xếp theo mô tả vùng núi, cao nguyên trong cẩm nang.");
    if (o.goc) note.push("Khoảng cách là đường chim bay giữa trung tâm hai nơi, đường đi thực tế dài hơn.");
    if (o.tien || o.re) note.push("Lọc theo mức thấp của các dòng ăn, ở, vé, thuê xe trong bảng chi phí 3 ngày 2 đêm, chưa gồm tiền đi tới nơi; tổng in ở trên tính cả đi lại từ TP.HCM.");
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
    var dk = A.dayKienThuc ? A.dayKienThuc(x.name, p.id) : null;
    if (dk) { h += dk.html; bc = { bai: dk.bai, t: dk.t }; }
    else if (bc) h += '<p>' + esc(bc.t) + '</p><p class="small">Đoạn trên trích Wikipedia tiếng Việt, bài "' + esc(bc.bai) + '", giấy phép CC BY-SA 4.0.</p>';
    else if (x.history) h += '<p>' + esc(String(x.history).replace(/^Theo một số tư liệu chưa chính thống,\s*/i, "").replace(/^./, function (c) { return c.toUpperCase(); })) + '</p><p class="small">Phần lịch sử tổng hợp từ tư liệu công khai, chưa đối chiếu nguồn chính thống.</p>';
    if (x.review_m) h += '<p><b>Nhận xét tổng hợp:</b> ' + esc(x.review_m) + '</p>';
    if (!h) return "";
    /* hỏi năm xây mà đoạn giới thiệu không có năm, thế kỷ: nói thẳng là chưa có */
    if (q && /\b(tai sao|vi sao) (goi|lai goi|co ten)|\bten goi\b|\by nghia ten\b/.test(A.fold(q)) && !/(gọi là|tên gọi|đặt tên|mang tên|có tên)/i.test(h))
      h = '<p><b>App chưa có giải thích tên gọi của ' + esc(x.name.split(" (")[0]) + '.</b> Đoạn dưới là phần giới thiệu chung.</p>' + h;
    /* năm xây: cần có năm hoặc thế kỷ đứng gần chữ xây, dựng, khởi công, hoàn thành, có từ */
    if (q && /\b(nam nao|bao gio|khi nao|bao nhieu tuoi|co tu)\b/.test(A.fold(q)) && !/(xây|dựng|khởi công|hoàn thành|có từ|ra đời|thành lập|khánh thành)[^.]{0,60}(\b1\d{3}\b|\b20\d{2}\b|thế kỷ)|(\b1\d{3}\b|\b20\d{2}\b|thế kỷ [IVXL\d]+)[^.]{0,40}(xây|dựng|khởi công|hoàn thành|ra đời|thành lập|khánh thành)|từ thời (Lý|Trần|Lê|Nguyễn)/i.test(h))
      h = '<p><b>App chưa có năm xây dựng của ' + esc(x.name.split(" (")[0]) + '.</b> Hỏi ban quản lý di tích hoặc xem bảng giới thiệu tại cổng.</p>' + h;
    return '<p class="ask-h">Giới thiệu ' + esc(x.name.split(" (")[0]) + ' (' + esc(p.name) + ')</p>' + h + A.answerItem(e, []).replace(/^<p class="ask-h">[^<]*<\/p>/, "");
  };
  /* viết tắt hay gặp (chỉ khi đứng riêng 1 chữ): "dl tháng 6 có đẹp ko" */
  var TAT = { dl: "Đà Lạt", hn: "Hà Nội", sg: "Sài Gòn", hcm: "TP.HCM", tphcm: "TP.HCM", dn: "Đà Nẵng", pq: "Phú Quốc", nt: "Nha Trang", hg: "Hà Giang", qn: "Quy Nhơn", hl: "Hạ Long", vt: "Vũng Tàu", ko: "không", hok: "không", khum: "không", dc: "được", đc: "được", ntn: "như thế nào", bn: "bao nhiêu", bnhieu: "bao nhiêu" };
  A.vietTat = function (q) { return String(q).replace(/(^|[\s,?.!])([a-zđ]{2,7})(?=$|[\s,?.!])/gi, function (m, a, w) { var v = TAT[w.toLowerCase()]; return v ? a + v : m; }); };
  /* lấy lại chữ có dấu từ câu hỏi cho tên hiển thị */
  A.goiYTen = function (q, folded) { var w = String(q).split(/\s+/), n = folded.split(" ").length; for (var i = 0; i + n <= w.length; i++) { var c = w.slice(i, i + n).join(" "); if (fold(c) === folded) return c.toLowerCase(); } return folded; };
  A._goiYUnits = units;
})(BTAI);
