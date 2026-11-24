/* BuiTrip AI — bước 4–5: lấy dữ liệu thật và ghép câu trả lời.
   Luật (vi phạm là trượt test):
   1. Không bịa giá, giờ, số điện thoại: chỉ in chuỗi có sẵn trong dữ liệu. Không có thì nói không có.
   2. Không thay dữ liệu tỉnh mới cho khu/tỉnh cũ; chỗ nào buộc dùng dữ liệu tỉnh thì ghi rõ đó là dữ liệu khu nào.
   3. Hỏi nơi nào trả nơi đó. 4. Tên mơ hồ thì hỏi lại. 5. Mùa, khoảng cách theo khu/điểm.
   6. Số ước tính ghi rõ "ước tính, chưa kiểm". 7. Câu trả lời luôn có nút tới trang liên quan.
   Không có dữ liệu: câu dự phòng 3 phần (fallback): nói thẳng chưa có → cách tự tra cụ thể → 2–3 câu hỏi app trả lời được. */
(function (A) {
  var esc = A.esc, fold = A.fold;
  function label(p) { return p ? p.name : ""; }
  function btn(t, js) { return '<button class="chip" onclick="' + js + '">' + esc(t) + '</button>'; }
  function goSeg(p, seg, t) { return btn(t || "Mở tab trong cẩm nang", "goProvSeg('" + p.id + "','" + seg + "')"); }
  function openPlace(p, x, t) { return btn(t || "Xem chi tiết, chỉ đường", "openProvPlace('" + p.id + "','" + x.id + "')"); }
  function li(arr) { return '<ul class="ask-ul">' + arr.map(function (t) { return "<li>" + t + "</li>"; }).join("") + "</ul>"; }
  /* cắt ngắn ở ranh giới từ, không cắt giữa 1 con số ("896.…" là sai) */
  function short(s, n) {
    s = String(s || "").replace(/\s*\((chưa kiểm[^)]*)\)/g, "");
    if (s.length <= n) return s;
    var c = s.slice(0, n - 1), k = Math.max(c.lastIndexOf(" "), c.lastIndexOf(";"), c.lastIndexOf(","));
    if (k > n * 0.5) c = c.slice(0, k);
    return c.replace(/[\s;,(–-]*[\d.,~]*$/, "").replace(/[\s;,(]+$/, "") + "…";
  }
  function acts(a) { return '<div class="ask-act">' + a.join("") + '</div>'; }
  function chips(qs) { return qs.length ? '<div class="ask-chips">' + qs.map(function (t) { return '<button class="chip" type="button" onclick="btAskChip(this.textContent)">' + esc(t) + '</button>'; }).join("") + '</div>' : ""; }
  A.priceShort = function (txt) {
    if (!txt) return "";
    var t = String(txt), seg = t.split(";")[0];
    if (/miễn phí/i.test(seg) && !/\d/.test(seg)) return "Miễn phí";
    var R = /\d{1,3}(?:\.\d{3})+\s*[–-]\s*\d{1,3}(?:\.\d{3})+\s*đ/, S = /\d{1,3}(?:\.\d{3})+\s*đ/;
    var m = seg.match(R) || seg.match(S) || seg.match(/\d+\s*đ(?![a-zà-ỹ])/i) || t.match(R) || t.match(S);
    if (m) return m[0].replace(/\s+/g, " ");
    if (/miễn phí/i.test(t)) return "Miễn phí";
    return seg.length > 64 ? seg.slice(0, 64) + "…" : seg;
  };
  function dist(x) { return typeof placeDistLabel === "function" ? placeDistLabel(x) : ""; }
  function kmTo(a, p) { if (a.lat == null || p.lat == null) return 0; var r = Math.PI / 180, x = Math.sin((p.lat - a.lat) * r / 2), y = Math.sin((p.lng - a.lng) * r / 2); return Math.round(12742 * Math.asin(Math.sqrt(x * x + Math.cos(a.lat * r) * Math.cos(p.lat * r) * y * y))); }
  function profile(a) { return (typeof btAreaProfile === "function" && btAreaProfile(a)) || {}; }

  /* Mùa đẹp của 1 địa danh: mùa riêng của điểm → mùa đảo → mùa khu → mùa tỉnh có ghi rõ là của khu thủ phủ */
  /* khu chính là thủ phủ (Sa Pa của Lào Cai) hoặc cách thủ phủ ≤ 60 km: mùa của tỉnh dùng được, ghi rõ vì sao */
  function sameZone(a, p) {
    var an = fold(String(p.anchor || "").replace(/\(.*?\)/g, "").replace(/^\s*(TP|Thành phố)\s+/i, ""));
    if (an && (an === fold(a.name) || A.has(fold(a.name), an))) return "Mùa chung của " + label(p) + " viết theo khu " + a.name + ".";
    var d = kmTo(a, p); if (d && d <= 60) return a.name + " cách " + (p.anchor || label(p)) + " ~" + d + " km, cùng vùng khí hậu; dùng mùa chung của " + label(p) + ".";
    return "";
  }
  A.season = function (x, prov) {
    if (x && x.info && x.info.mua_dep) return x.info.mua_dep;
    var b = prov && (prov.best_season || (prov.season && prov.season.best));
    var isle = x && typeof btIsleFor === "function" ? btIsleFor(x.name.split(" (")[0]) : null;
    if (isle && isle.season) return "Mùa đảo " + isle.name + ": " + isle.season;
    var ar = x && typeof btAreaOfPlace === "function" ? btAreaOfPlace(prov, x) : null, pr = ar && btAreaProfile(ar);
    if (pr && pr.season) return "Mùa khu " + ar.name + ": " + pr.season.best + (pr.season.avoid ? ". Tránh: " + pr.season.avoid : "");
    if (ar && b && sameZone(ar, prov)) return sameZone(ar, prov) + " " + b;
    if (ar) return "Chưa có mùa đẹp riêng cho khu " + ar.name + ". Mùa chung của " + prov.name + " viết theo khu " + (prov.anchor || prov.name) + ", có thể không đúng cho " + ar.name + ": " + (b || "chưa có dữ liệu");
    return b ? ("Theo mùa chung của " + prov.name + ": " + b) : "Chưa có dữ liệu mùa đẹp";
  };

  /* ---------- Sân bay, ga gần nhất (dùng cho câu dự phòng và câu hỏi tàu/máy bay) ---------- */
  var SAN_BAY = { "ha-noi": "Nội Bài (HAN)", "tp-ho-chi-minh": "Tân Sơn Nhất (SGN)", "da-nang": "Đà Nẵng (DAD)", "hue": "Phú Bài (HUI)", "khanh-hoa": "Cam Ranh (CXR)",
    "lam-dong": "Liên Khương (DLI)", "gia-lai": "Pleiku (PXU)", "dak-lak": "Buôn Ma Thuột (BMV)", "quang-ninh": "Vân Đồn (VDO)", "hai-phong": "Cát Bi (HPH)",
    "nghe-an": "Vinh (VII)", "thanh-hoa": "Thọ Xuân (THD)", "quang-tri": "Đồng Hới (VDH)", "quang-ngai": "Chu Lai (VCL)", "can-tho": "Cần Thơ (VCA)",
    "ca-mau": "Cà Mau (CAH)", "an-giang": "Rạch Giá (VKG)", "dien-bien": "Điện Biên Phủ (DIN)",
    "quy-nhon": "Phù Cát (UIH), cách Quy Nhơn ~30 km", "phu-quoc": "Phú Quốc (PQC)", "con-dao": "Côn Đảo (VCS)", "tuy-hoa": "Tuy Hòa (TBB)",
    "phong-nha": "Đồng Hới (VDH), cách Phong Nha ~45 km", "hoi-an": "Đà Nẵng (DAD), cách Hội An ~30 km", "phan-rang": "Cam Ranh (CXR), cách Phan Rang ~60 km",
    "kon-tum": "Pleiku (PXU), cách Kon Tum ~50 km", "ha-giang": "Nội Bài (HAN), rồi xe ~6–7 giờ", "sa-pa": "Nội Bài (HAN), rồi xe ~5–6 giờ",
    "cat-ba": "Cát Bi (HPH), rồi tàu hoặc cáp treo ra đảo", "vung-tau": "Tân Sơn Nhất (SGN), rồi xe ~2 giờ", "gia-nghia": "Buôn Ma Thuột (BMV), cách ~120 km",
    "phan-thiet": "Tân Sơn Nhất (SGN) hoặc Cam Ranh (CXR), rồi tàu/xe" };
  var GA = { "ha-noi": "ga Hà Nội", "tp-ho-chi-minh": "ga Sài Gòn", "da-nang": "ga Đà Nẵng", "hue": "ga Huế", "khanh-hoa": "ga Nha Trang", "nghe-an": "ga Vinh",
    "thanh-hoa": "ga Thanh Hóa", "ninh-binh": "ga Ninh Bình", "quang-ngai": "ga Quảng Ngãi", "lao-cai": "ga Lào Cai", "hai-phong": "ga Hải Phòng", "quang-tri": "ga Đồng Hới",
    "ha-tinh": "ga Yên Trung (Hà Tĩnh)", "quy-nhon": "ga Diêu Trì hoặc ga Quy Nhơn", "phan-thiet": "ga Phan Thiết", "phan-rang": "ga Tháp Chàm", "tuy-hoa": "ga Tuy Hòa",
    "phong-nha": "ga Đồng Hới", "hoi-an": "ga Đà Nẵng hoặc ga Tam Kỳ", "sa-pa": "ga Lào Cai, rồi xe ~1 giờ lên Sa Pa", "lang-son": "ga Đồng Đăng / Lạng Sơn" };
  /* Nơi không có đường sắt chở khách liên tỉnh */
  var KHONG_TAU = { "phu-quoc": 1, "con-dao": 1, "cat-ba": 1, "ha-giang": 1, "kon-tum": 1, "gia-nghia": 1, "vung-tau": 1, "gia-lai": 1, "dak-lak": 1, "lam-dong": 1,
    "can-tho": 1, "an-giang": 1, "ca-mau": 1, "dien-bien": 1, "lai-chau": 1, "son-la": 1, "cao-bang": 1, "tuyen-quang": 1, "dong-thap": 1, "vinh-long": 1, "tay-ninh": 1, "bao-loc": 1 };
  A.SAN_BAY = SAN_BAY; A.GA = GA; A.KHONG_TAU = KHONG_TAU;
  function key(o) { return o.area ? o.area.id : (o.prov ? o.prov.id : ""); }
  function placeOf(o) { return o.area ? o.area.name : (o.isle ? o.isle.name : (o.prov ? label(o.prov) : "")); }

  /* ---------- Câu dự phòng 3 phần ---------- */
  A.howTo = function (topic, o) {
    var n = (o && (o.itemName || placeOf(o))) || "nơi này", k = o ? key(o) : "", sb = SAN_BAY[k], ga = GA[k];
    switch (topic) {
      case "price": return ["Xem bảng giá niêm yết ở cổng hoặc trang, fanpage chính thức của " + n + ".", "Gọi ban quản lý " + n + "; giá vé điểm do nhà nước quản lý thường theo quyết định giá của UBND tỉnh, đăng trên cổng thông tin của tỉnh."];
      case "hours": return ["Gọi ban quản lý " + n + " hoặc xem trang chính thức; giờ dịp lễ, Tết thường khác ngày thường."];
      case "bay": return [sb ? "Tra chặng tới sân bay " + sb + " trên web hoặc ứng dụng của Vietnam Airlines, Vietjet Air, Bamboo Airways; giá đổi theo ngày và giờ bay." : "Tìm sân bay gần " + n + " trên bản đồ rồi tra chặng bay trên web các hãng (Vietnam Airlines, Vietjet Air, Bamboo Airways)."];
      case "tau": return [ga ? "Tra giờ tàu, giá vé tới " + ga + " trên trang đặt vé của Đường sắt Việt Nam (dsvn.vn) hoặc gọi ga." : "Tra trên trang đặt vé của Đường sắt Việt Nam (dsvn.vn) xem ga gần " + n + " nhất."];
      case "xe": return ["Tra nhà xe và giờ chạy trên các ứng dụng đặt vé xe khách, hoặc gọi bến xe của tỉnh đi và tỉnh đến."];
      case "thuy": return ["Gọi cảng tàu khách hoặc ban quản lý cảng để hỏi lịch chạy trong ngày; tàu dừng khi biển động hoặc có lệnh cấm biển."];
      case "season": return ["Xem dự báo của Trung tâm Dự báo khí tượng thủy văn quốc gia (nchmf.gov.vn) cho tuần định đi.", "Hỏi nơi ở tại " + n + " về thời tiết tuần đó trước khi đặt vé."];
      case "food": return ["Tìm tên món kèm " + n + " trên bản đồ (Google Maps), đọc đánh giá gần đây và ảnh bảng giá.", "Hỏi chủ chỗ ở tại " + n + " quán người địa phương hay ăn."];
      case "stay": return ["Tìm chỗ ở quanh " + n + " trên bản đồ hoặc các trang đặt phòng, gọi xác nhận giá và phòng trống trước khi chuyển tiền."];
      case "weather": return ["Xem dự báo hôm nay trên nchmf.gov.vn hoặc ứng dụng thời tiết của điện thoại; app không có số liệu thời tiết theo ngày."];
      case "booking": return ["App không nhận đặt phòng, đặt vé, không giữ chỗ hộ. Gọi thẳng cơ sở, hãng xe, hãng bay hoặc dùng trang đặt chỗ của họ."];
      case "flightdate": return ["Giá vé máy bay theo ngày cụ thể thay đổi liên tục: tra trên web hoặc ứng dụng của hãng bay cho đúng ngày, giờ bay." + (sb ? " Sân bay gần " + n + ": " + sb + "." : "")];
      case "phone": return ["Xem số trên trang chính thức hoặc trang Google Maps của chính cơ sở đó, gọi xác nhận trước khi chuyển tiền.", "Số khẩn cấp toàn quốc: Công an 113, Cứu hỏa 114, Cấp cứu 115."];
      case "event": return ["Theo dõi cổng thông tin du lịch và fanpage chính thức của " + n + "; lịch sự kiện công bố theo từng năm."];
      case "pricenow": return ["Giá trong app là giá tham khảo đã ghi nguồn và ngày kiểm, không phải giá theo giờ.", "Xem giá thật trên ứng dụng gọi xe, trang của hãng hoặc hỏi trực tiếp trước khi đi."];
      case "unknown": return ["Gõ tên tỉnh hoặc thành phố để xem danh sách điểm đã có trong app.", "Báo thiếu điểm này ở thẻ Hỗ trợ của nút Hỏi; đội BuiTrip bổ sung và ghi nguồn."];
      case "offtopic": return ["Trợ lý này chỉ trả lời về du lịch trong nước: đi đâu, đi bằng gì, ăn, ở, giá vé, mùa đẹp, lịch trình, chi phí."];
      default: return ["Mở cẩm nang tỉnh để xem các tab Đi đâu, Ở đâu, Ăn gì, Đi đến, Đi lại.", "Hỏi trực tiếp ban quản lý điểm hoặc chỗ ở tại nơi đến."];
    }
  };
  function suggest(o) {
    var n = placeOf(o), out = [];
    if (o.itemName) { out.push(o.itemName + " mấy giờ mở cửa"); }
    if (n) { out.push("Đi " + n + " bằng gì"); out.push(n + " mùa nào đẹp"); out.push("Ăn gì ở " + n); }
    if (!out.length) out = ["Quy Nhơn đi bằng gì", "Vé Bà Nà bao nhiêu", "Hà Giang mùa nào đẹp"];
    return out.filter(function (t) { return t !== o.asked; }).slice(0, 3);
  }
  A.fallback = function (o) {
    o = o || {};
    var how = o.how || A.howTo(o.topic, o), p = o.prov || (o.area && provById(o.area.prov)) || null;
    return (o.lead || "") + '<p class="ask-h">App chưa có thông tin này.</p>' + (o.what ? '<p>Chưa có: ' + esc(o.what) + '.</p>' : "") +
      '<p><b>Cách khác:</b></p>' + li(how.map(esc)) + '<p class="small">Hỏi thử câu app trả lời được:</p>' + chips(o.ask || suggest(o)) +
      acts([p ? goSeg(p, "tongquan", "Cẩm nang " + label(p)) : btn("Xem 34 tỉnh thành", "show('destinations')")]);
  };

  /* ---------- Tuyến đi: lọc theo nơi đi (HN/SG/ĐN) và phương tiện ---------- */
  var FROM_RE = { hn: /hà nội|han\b|hn\b/i, sg: /tp\.?hcm|sài gòn|sgn|hồ chí minh/i, dn: /đà nẵng|dad\b/i };
  var MODE_RE = { bay: /bay|máy bay|sân bay/i, tau: { test: function (m) { return /(^|\s)tàu\s|ga |đường sắt/i.test(m) && !/tàu cao tốc|tàu gỗ|tàu chậm|tàu khách|ca nô|phà/i.test(m); } }, xe: /xe khách|limousine|xe giường|xe combo/i, thuy: /tàu cao tốc|phà|ca nô|tàu gỗ|tàu khách/i };
  function filterRoutes(rs, from, mode) {
    var f = rs;
    if (from) { var ff = f.filter(function (r) { return FROM_RE[from].test(r.from + " " + r.mode); }); if (ff.length) f = ff; else f = []; }
    if (mode) f = f.filter(function (r) { return MODE_RE[mode].test(r.mode); });
    return f;
  }
  function routeLi(rs) { return li(rs.map(function (r) { return "<b>" + esc(r.from) + "</b> · " + esc(r.mode) + " · " + esc(r.time) + " · " + esc(r.price); })) + '<p class="small">Giờ đi và giá vé là ước tính, chưa kiểm với hãng, cảng. Tra lại trước khi đặt.</p>'; }
  var MODE_NAME = { bay: "máy bay", tau: "tàu hỏa", xe: "xe khách", thuy: "tàu thủy" }, FROM_NAME = { hn: "Hà Nội", sg: "TP.HCM", dn: "Đà Nẵng" };
  /* nơi đi khác (Quy Nhơn, Đà Lạt…): index.js đặt FROM_RE.o / FROM_NAME.o cho câu đang hỏi */
  A.setFrom = function (name) { FROM_NAME.o = name; FROM_RE.o = { test: function (t) { return A.has(fold(t), fold(name)); } }; };
  /* Hỏi tàu hỏa tới nơi không có đường sắt: nói thẳng không có, kèm cách đi khác */
  function noRail(o) { return A.KHONG_TAU[key(o)] || (o.prov && !o.area && A.KHONG_TAU[o.prov.id]); }

  /* ---------- Địa danh, món ---------- */
  /* không in nguồn, ngày kiểm trong câu trả lời (yêu cầu 23/11/2026: nguồn đưa vào mục chính sách của app) */
  function srcLine() { return '<p class="small">Giá, giờ có thể đổi, kiểm lại trước khi đi.</p>'; }
  A.answerItem = function (e, want) {
    var x = e.x, p = e.prov, name = label(p), nm = x.name.split(" (")[0];
    if (x.banned) return '<p class="ask-h">' + esc(x.name) + ' (' + esc(name) + ')</p><p><b>Không đón khách du lịch.</b> ' + esc(x.note || "") + '</p>' + acts([openPlace(p, x, "Xem chi tiết")]);
    if (e.kind === "dish") {
      var r = (x.restaurants || []).slice(0, 3);
      if (!x.price && !r.length) return A.fallback({ prov: p, itemName: nm, what: "giá và quán cho món " + nm, topic: "food" });
      return '<p class="ask-h">' + esc(x.name) + ' (' + esc(name) + ')</p>' + li((x.price ? ["Giá: " + esc(x.price)] : ["Giá: app chưa có"]).concat(r.map(function (q) { return "<b>" + esc(q.name) + "</b>" + (q.address ? " · " + esc(q.address) : "") + (q.price ? " · " + esc(q.price) : ""); }))) +
        srcLine(x, p) + acts([btn("Xem món này", "openProvDish('" + p.id + "','" + x.id + "')"), goSeg(p, "angi", "Món khác ở " + name)]);
    }
    if (e.kind === "stay") {
      return '<p class="ask-h">' + esc(x.name) + ' (' + esc(name) + ')</p>' + li(["Giá: " + esc(x.price || "app chưa có"), esc(x.kind || ""), esc(x.address || "")].filter(function (t) { return t; })) +
        '<p class="small">Chưa kiểm chứng, chưa đối tác, chưa thu phí. Gọi xác nhận trước khi đặt.</p>' + acts([btn("Xem chỗ ở này", "openProvStay('" + p.id + "','" + x.id + "')")]);
    }
    if (!want.length) want = ["price", "hours", "season"];
    else if (want.indexOf("price") >= 0 && want.indexOf("hours") < 0) want = want.concat(["hours"]);
    var miss = [], rows = [];
    if (want.indexOf("price") >= 0) { if (x.price) rows.push("<b>Giá vé tham khảo:</b> " + esc(x.price)); else miss.push("price"); }
    if (want.indexOf("hours") >= 0) { if (x.hours) rows.push("<b>Giờ mở cửa:</b> " + esc(x.hours)); else miss.push("hours"); }
    if (want.indexOf("season") >= 0) rows.push("<b>Mùa đẹp:</b> " + esc(A.season(x, p)));
    var d = dist(x); if (d) rows.push(esc(d));
    if (!rows.length || (miss.length && miss.length === want.filter(function (w) { return w !== "season"; }).length && want.indexOf("season") < 0))
      return A.fallback({ prov: p, itemName: nm, what: (miss[0] === "hours" ? "giờ mở cửa " : "giá vé ") + nm, topic: miss[0] || "price", lead: rows.length ? '<p class="ask-h">' + esc(x.name) + ' (' + esc(name) + ')</p>' + li(rows) : "" });
    return '<p class="ask-h">' + esc(x.name) + ' (' + esc(name) + ')</p>' + li(rows) + (miss.length ? '<p class="small">App chưa có ' + (miss.indexOf("price") >= 0 ? "giá vé" : "giờ mở cửa") + ' của điểm này. ' + esc(A.howTo(miss[0], { itemName: nm })[0]) + '</p>' : "") + srcLine(x, p) +
      acts([openPlace(p, x), goSeg(p, "tongquan", "Cẩm nang " + name)]);
  };
  A.askBack = function (cands, q) {
    var seen = {}, list = cands.filter(function (e) { var k = e.fm + "|" + e.prov.id; if (seen[k]) return false; seen[k] = 1; return true; }).slice(0, 5);
    return '<p class="ask-h">Bạn hỏi nơi nào?</p><p>Có ' + list.length + ' mục trùng hoặc gần trùng tên. Chọn đúng nơi để app trả lời, không tự đoán:</p>' +
      li(list.map(function (e) { return "<b>" + esc(e.x.name.split(" (")[0]) + "</b> · " + esc(label(e.prov)) + (A.ghiDeNham(e) ? " · " + esc(A.ghiDeNham(e)) : e.x.address ? " · " + esc(short(e.x.address, 70)) : ""); })) +
      chips(list.map(function (e) { return e.x.name.split(" (")[0] + " " + label(e.prov) + (q ? " " + q : ""); }));
  };

  /* ---------- Khu trong tỉnh mới ---------- */
  A.answerArea = function (a, I, placeName) {
    var intent = I.intent, want = I.want, p = provById(a.prov), pr = profile(a), anchor = p.anchor || label(p), far = kmTo(a, p);
    var o = { area: a, prov: p, asked: I.q };
    var head = '<p class="ask-old">' + esc(a.name) + (a.old && a.old !== p.name ? ' (' + esc(a.old) + ' cũ)' : '') + ' nay thuộc ' + esc(label(p)) + '. Trả lời theo dữ liệu riêng của khu ' + esc(a.name) + (far > 30 ? ', không dùng dữ liệu ' + esc(anchor) + ' (cách ~' + far + ' km)' : '') + '.</p>';
    var title = placeName ? esc(placeName) + ' (khu ' + esc(a.name) + ')' : esc(a.name);
    var ac = acts([btn("Lập kế hoạch đi " + a.name, "btPlanArea('" + a.id + "')"), goSeg(p, "tongquan", "Cẩm nang " + label(p))]);
    var words = [a.name, a.hub.replace(/^TP\s+/, "").replace(/\s*\(.*?\)/g, "")].concat(a.old && a.old !== p.name ? [a.old] : []).map(fold).concat(a.keys).filter(function (k) { return k && k.length >= 4; });
    function inArea(x) { var nj = fold(JSON.stringify(x).replace(/-/g, " ")); return words.some(function (k) { return A.has(nj, k); }); }
    if (intent && !pr.season && !pr.routes && !a.cost && far <= 40 && ["diden", "dilai", "mua", "chiphi", "mang"].indexOf(intent) >= 0)
      return '<p class="ask-old">' + (far > 5 ? esc(a.name) + ' cách ' + esc(anchor) + ' ~' + far + ' km; ' : '') + 'phần dưới là dữ liệu chung của ' + esc(label(p)) + ' (viết theo khu ' + esc(anchor) + ').</p>' + A.answerProv({ prov: p, old: "" }, I);
    if (intent === "diden") {
      var rs = pr.routes || [];
      if (I.mode === "tau" && !rs.some(function (r) { return MODE_RE.tau.test(r.mode); }) && noRail(o))
        return head + '<p class="ask-h">Tàu hỏa tới ' + title + '</p><p>' + esc(a.name) + ' không có ga tàu khách liên tỉnh.</p>' + (rs.length ? '<p>Cách đi khác:</p>' + routeLi(rs.slice(0, 4)) : "") + ac;
      if (rs.length) {
        var f = filterRoutes(rs, I.from, I.mode);
        if (!f.length) return A.fallback({ area: a, prov: p, asked: I.q, topic: I.mode || "xe", what: "tuyến " + (I.mode ? MODE_NAME[I.mode] + " " : "") + (I.from ? "từ " + FROM_NAME[I.from] + " " : "") + "tới " + a.name, lead: head + '<p>Các tuyến app đang có tới ' + title + ':</p>' + routeLi(rs.slice(0, 4)) });
        return head + '<p class="ask-h">Đi đến ' + title + (I.from ? ' từ ' + FROM_NAME[I.from] : '') + '</p>' + (pr.access ? '<p>' + esc(pr.access) + '</p>' : '') + routeLi(f) + ac;
      }
      if (a.cost && I.from && I.from !== "sg" && I.from !== "hn") return A.fallback({ area: a, prov: p, asked: I.q, topic: I.mode || "xe", what: "tuyến từ " + FROM_NAME[I.from] + " tới " + a.name, lead: head + '<p>App chỉ có tiền đi ước tính từ TP.HCM và Hà Nội tới ' + title + ':</p>' + li(a.cost.filter(function (r) { return !/^Ở/.test(r.label); }).map(function (r) { return esc(r.label) + ": <b>" + esc(r.value) + "</b>"; })) });
      if (a.cost) return head + '<p class="ask-h">Đi đến ' + title + '</p>' + li(a.cost.filter(function (r) { return !/^Ở/.test(r.label); }).map(function (r) { return esc(r.label) + ": <b>" + esc(r.value) + "</b>"; })) + '<p class="small">Chưa có bảng giờ đi riêng cho khu này; dòng trên là tiền đi khứ hồi ước tính, chưa kiểm.</p>' + ac;
      return A.fallback({ area: a, prov: p, asked: I.q, topic: I.mode || "bay", what: "cách đi riêng tới " + a.name + " (app không dùng tuyến tới " + anchor + " thay vào)", lead: head });
    }
    if (intent === "mua" || (!intent && want.indexOf("season") >= 0)) {
      var se = pr.season;
      if (se) return head + '<p class="ask-h">Mùa đẹp ở ' + title + '</p>' + li(["<b>Nên đi:</b> " + esc(se.best)].concat(se.avoid ? ["<b>Tránh:</b> " + esc(se.avoid)] : []).concat(se.wear ? ["<b>Mặc:</b> " + esc(se.wear)] : [])) + ac;
      if (sameZone(a, p) && p.best_season) return head + '<p class="ask-h">Mùa đẹp ở ' + title + '</p><p>' + esc(sameZone(a, p)) + '</p>' + li(["<b>Nên đi:</b> " + esc(p.best_season)]) + ac;
      return A.fallback({ area: a, prov: p, asked: I.q, topic: "season", what: "mùa đẹp riêng cho khu " + a.name, lead: head + '<p class="small">Tham khảo, có ghi rõ: mùa chung của ' + esc(label(p)) + ' viết theo khu ' + esc(anchor) + ', có thể không đúng cho ' + esc(a.name) + ': ' + esc(p.best_season || "chưa có") + '.</p>' });
    }
    if (intent === "mang") {
      if (pr.pack) return head + '<p class="ask-h">Mang gì khi đi ' + title + '</p>' + li(pr.pack.map(esc)) + (pr.season && pr.season.wear ? '<p>Mặc: ' + esc(pr.season.wear) + '</p>' : '') + ac;
      return A.fallback({ area: a, prov: p, asked: I.q, topic: "season", what: "danh sách đồ mang theo cho " + a.name, lead: head });
    }
    if (intent === "chiphi") {
      var b = pr.budget || {}, ks = Object.keys(b), k = I.days && b[I.days] ? I.days : (I.days ? "" : ks[0]);
      if (k && b[k]) return head + '<p class="ask-h">Chi phí ' + esc(k) + ' đi ' + title + ', 1 người từ TP.HCM (ước tính, chưa kiểm)</p>' + li(b[k].map(function (r) { return esc(r.label) + ": <b>" + esc(r.value) + "</b>"; })) + budgetNote(I, b[k]) + ac;
      var body = (ks.length ? '<p>Chưa có bảng ' + esc(I.days || "") + ' cho khu này; app đang có bảng ' + esc(ks.join(", ")) + ':</p>' + li(b[ks[0]].map(function (r) { return esc(r.label) + ": <b>" + esc(r.value) + "</b>"; })) : "") +
        (a.cost ? '<p>Tiền đi khứ hồi (ước tính, chưa kiểm):</p>' + li(a.cost.map(function (r) { return esc(r.label) + ": <b>" + esc(r.value) + "</b>"; })) : "");
      if (!body) return A.fallback({ area: a, prov: p, asked: I.q, what: "bảng chi phí riêng cho " + a.name, how: ["Bấm Lập kế hoạch đi " + a.name + ": app tính chi phí theo khu " + a.name + ", không tính theo " + anchor + "."].concat(A.howTo("stay", o)), lead: head });
      return head + '<p class="ask-h">Chi phí đi ' + title + '</p>' + body + '<p class="small">Bấm Lập kế hoạch, app tính chi phí theo khu ' + esc(a.name) + ', không theo ' + esc(anchor) + '.</p>' + ac;
    }
    if (intent === "dilai") return pr.local ? head + '<p class="ask-h">Đi lại ở ' + title + '</p><p>' + esc(pr.local) + '</p>' + ac : A.fallback({ area: a, prov: p, asked: I.q, what: "cách đi lại trong " + a.name, topic: "xe", lead: head });
    if (intent === "angi" || intent === "odau") {
      var arr = intent === "angi" ? p.dishes : p.stays, fl = arr.filter(inArea), lab = intent === "angi" ? "Ăn gì ở " : "Ở đâu tại ";
      if (!fl.length) return A.fallback({ area: a, prov: p, asked: I.q, topic: intent === "angi" ? "food" : "stay", what: (intent === "angi" ? "món ăn, quán" : "chỗ ở") + " riêng cho khu " + a.name, lead: head });
      var rows = intent === "angi" ? fl.slice(0, 6).map(function (d) { var r = (d.restaurants || [])[0]; return "<b>" + esc(d.name) + "</b> · " + esc(short(A.priceShort(d.price) || d.price, 40)) + (r ? " · " + esc(r.name) : ""); })
        : fl.slice(0, 6).map(function (s) { return "<b>" + esc(s.name.split(" (")[0]) + "</b> · " + esc(short(A.priceShort(s.price) || s.price, 40)) + (s.kind ? " · " + esc(s.kind) : ""); });
      return head + '<p class="ask-h">' + lab + title + '</p>' + li(rows) + (intent === "odau" ? '<p class="small">Chưa kiểm chứng, chưa đối tác, chưa thu phí. Gọi xác nhận trước khi đặt.</p>' : '') + ac;
    }
    if (intent === "khancap") return head + '<p class="ask-h">Số khẩn cấp</p>' + li(['Công an <a href="tel:113"><b>113</b></a>', 'Cứu hỏa <a href="tel:114"><b>114</b></a>', 'Cấp cứu <a href="tel:115"><b>115</b></a>']) + '<p class="small">App chưa có số bệnh viện, đường dây nóng riêng của khu ' + esc(a.name) + '; hỏi chỗ ở hoặc gọi 1022 (tổng đài dịch vụ công tỉnh, nếu tỉnh có) để được nối máy.</p>' + ac;
    if (intent === "chatchem" || intent === "mua_mua") return A.fallback({ area: a, prov: p, asked: I.q, what: (intent === "chatchem" ? "cảnh báo chặt chém" : "gợi ý khi trời mưa") + " riêng cho khu " + a.name, lead: head });
    if (intent === "lichtrinh") return head + '<p class="ask-h">Lịch trình ' + title + '</p><p>Bấm Lập kế hoạch: app xếp lịch theo ngày quanh ' + esc(a.name) + ', tối đa 3 điểm mỗi ngày, nối điểm gần nhau, tính tiền đi tới ' + esc(a.name) + '.</p>' + ac;
    var pl = typeof btAreaPlaces === "function" ? btAreaPlaces(a) : [];
    if (want.indexOf("price") >= 0 && !intent) {
      var nk = fold(a.name), priced = pl.filter(function (x) { return x.price; }).sort(function (x, y) { return (fold(y.name.split(" (")[0]).indexOf(nk) >= 0) - (fold(x.name.split(" (")[0]).indexOf(nk) >= 0); });
      if (!priced.length) return A.fallback({ area: a, prov: p, asked: I.q, topic: "price", what: "giá vé các điểm ở " + a.name, lead: head });
      return head + '<p class="ask-h">Giá vé tham khảo ở ' + title + '</p>' + li(priced.slice(0, 6).map(function (x) { return '<a href="javascript:void 0" onclick="openProvPlace(\'' + p.id + '\',\'' + x.id + '\')">' + esc(x.name.split(" (")[0]) + '</a>: ' + esc(short(x.price, 110)); })) + '<p class="small">Hỏi đúng tên một điểm để xem đủ giá, giờ.</p>' + ac;
    }
    var lines = [];
    if (pr.season) lines.push("<b>Mùa đẹp:</b> " + esc(pr.season.best));
    if (pr.routes) lines.push("<b>Đi đến:</b> " + esc(pr.routes[0].mode) + " · " + esc(pr.routes[0].time) + " (ước tính)");
    return head + '<p class="ask-h">' + title + ' · ' + pl.length + ' địa danh</p>' + (lines.length ? li(lines) : "") +
      li(pl.slice(0, 10).map(function (x) { return '<a href="javascript:void 0" onclick="openProvPlace(\'' + p.id + '\',\'' + x.id + '\')">' + esc(x.name.split(" (")[0]) + '</a> · ' + esc(dist(x)); })) +
      '<p class="small">Hỏi tiếp: "' + esc(a.name) + ' đi bằng gì", "mùa nào đẹp", "ăn gì", "mang gì".</p>' + ac;
  };
  function budgetNote(I, rows) {
    if (!I.budget) return "";
    var tot = rows.filter(function (r) { return /tổng/i.test(r.label); })[0]; if (!tot) return "";
    var m = String(tot.value).match(/([\d.]+)\s*[–-]\s*([\d.]+)/); if (!m) return "";
    var lo = +m[1].replace(/\./g, ""), hi = +m[2].replace(/\./g, "");
    var b = I.budget.toLocaleString("vi-VN") + "đ";
    if (I.budget < lo) return '<p><b>Ngân sách ' + esc(b) + ' thấp hơn mức ước tính thấp nhất (' + esc(tot.value) + ').</b> Cân nhắc đi xe thay máy bay, bớt 1 đêm hoặc ở nhà nghỉ.</p>';
    if (I.budget < hi) return '<p>Ngân sách ' + esc(b) + ' nằm trong khoảng ước tính; nên chọn phương án tiết kiệm.</p>';
    return '<p>Ngân sách ' + esc(b) + ' đủ theo mức ước tính.</p>';
  }

  /* ---------- Đảo ---------- */
  A.answerIsle = function (d, I) {
    var p = provById(d.prov), it = null;
    if (p) p.places.forEach(function (x) { if (!it && btIsleFor(x.name.split(" (")[0]) === d) it = x; });
    var ac = acts((it ? [openPlace(p, it, "Xem mục " + it.name.split(" (")[0])] : []).concat(p ? [goSeg(p, "tongquan", "Cẩm nang " + label(p))] : []));
    if (d.ban) {
      var near = p ? p.places.filter(function (x) { return !x.banned && /đảo|hòn|biển|vịnh/i.test(x.name); }).slice(0, 3) : [];
      return '<p class="ask-h">Đảo ' + esc(d.name) + '</p><p><b>Không đón khách du lịch.</b> ' + esc(d.banNote) + '</p>' + (near.length ? '<p>Điểm biển, đảo khác trong ' + esc(label(p)) + ' đang đón khách:</p>' + li(near.map(function (x) { return esc(x.name.split(" (")[0]); })) : "") + ac;
    }
    var o = { isle: d, prov: p, asked: I.q };
    if (I.intent === "angi" || I.intent === "odau") return A.fallback({ isle: d, prov: p, asked: I.q, topic: I.intent === "angi" ? "food" : "stay", what: (I.intent === "angi" ? "quán ăn" : "chỗ ở") + " riêng trên đảo " + d.name, lead: '<p>Cách ra đảo ' + esc(d.name) + ':</p>' + routeLi(d.access) });
    if (I.mode === "tau" || I.mode === "xe" && !d.access.some(function (r) { return MODE_RE.xe.test(r.mode); })) {
      return '<p class="ask-h">Đi đảo ' + esc(d.name) + '</p><p>Ra đảo chỉ đi được bằng tàu, ca nô' + (I.mode === "tau" ? "; không có tàu hỏa" : "") + '. Cách đi:</p>' + routeLi(d.access) + ac;
    }
    if (I.from) {
      var fr = filterRoutes(d.access, I.from, null);
      if (!fr.length) return A.fallback({ isle: d, prov: p, asked: I.q, topic: "thuy", what: "tuyến từ " + FROM_NAME[I.from] + " ra đảo " + d.name, lead: '<p>Cách ra đảo ' + esc(d.name) + ' app đang có (đi tới các bến này trước):</p>' + routeLi(d.access) });
    }
    return '<p class="ask-h">Đi đảo ' + esc(d.name) + (p ? ' (' + esc(label(p)) + ')' : '') + '</p>' + routeLi(d.access) + '<p><b>Mùa:</b> ' + esc(d.season) + '</p><p class="small">Tàu dừng khi biển động hoặc có lệnh cấm biển; gọi cảng xác nhận lịch chạy trước ngày đi.</p>' + ac;
  };

  /* ---------- Có sân bay / ga tàu không ---------- */
  A.answerHub = function (T, I) {
    var f = fold(I.q), bay = /\bsan bay\b/.test(f), key = T.isle ? T.isle.id : T.area ? T.area.id : T.prov.id, p = T.prov;
    var nm = T.item ? T.item.x.name.split(" (")[0] : T.isle ? "đảo " + T.isle.name : T.area ? T.area.name : (T.alias || label(p));
    var o = { area: T.area, isle: T.isle, prov: p, asked: I.q }, ac = acts([goSeg(p, "diden", "Xem đủ cách đi")]);
    var lead = T.item ? '<p class="ask-old">' + esc(nm) + ' thuộc ' + esc(label(p)) + (T.area ? ', khu ' + esc(T.area.name) : '') + '.</p>' : '';
    if (bay) {
      var sb = SAN_BAY[key] || (!T.area && !T.isle ? SAN_BAY[p.id] : "");
      if (!sb) return A.fallback({ area: T.area, isle: T.isle, prov: p, asked: I.q, topic: "bay", what: "thông tin sân bay gần " + nm, lead: lead });
      var own = !/cách|rồi/.test(sb);
      return lead + '<p class="ask-h">Sân bay ' + (own ? 'ở ' : 'gần ') + esc(nm) + '</p><p>' + (own ? 'Có: sân bay ' : 'Không có sân bay riêng. Gần nhất: ') + esc(sb) + '.</p>' + ac;
    }
    var noR = KHONG_TAU[key] || (!T.area && !T.isle && KHONG_TAU[p.id]), ga = GA[key] || (!T.area && !T.isle ? GA[p.id] : "");
    if (T.isle) return lead + '<p class="ask-h">Ga tàu ở ' + esc(nm) + '</p><p>Không có tàu hỏa ra đảo; chỉ đi tàu, ca nô' + (/bay/i.test(JSON.stringify(T.isle.access)) ? ' hoặc máy bay' : '') + ':</p>' + routeLi(T.isle.access) + ac;
    if (noR) return lead + '<p class="ask-h">Ga tàu ở ' + esc(nm) + '</p><p>Không có ga tàu khách liên tỉnh.' + (ga ? ' Ga gần nhất: ' + esc(ga) + '.' : '') + '</p>' + ac;
    if (ga) return lead + '<p class="ask-h">Ga tàu ở ' + esc(nm) + '</p><p>Có: ' + esc(ga) + '.</p>' + ac;
    return A.fallback({ area: T.area, prov: p, asked: I.q, topic: "tau", what: "thông tin ga tàu gần " + nm, lead: lead });
  };

  /* ---------- Tỉnh ---------- */
  A.answerProv = function (hit, I) {
    var p = hit.prov, name = label(p), old = hit.old, intent = I.intent, o = { prov: p, asked: I.q };
    var keys = []; if (hit.alias) keys.push(hit.alias); if (old) (typeof BT_ALIAS !== "undefined" ? BT_ALIAS : []).forEach(function (a) { if (a[2] === old && a[1] === p.id) keys.push(a[0]); });
    function inOld(x) { var j = JSON.stringify(x); if (old && j.indexOf(old) >= 0) return true; var nj = fold(j.replace(/-/g, " ")); return keys.some(function (k) { return A.has(nj, k); }); }
    function note(scoped) { return old ? '<p class="ask-old">' + esc(old) + ' cũ nay thuộc ' + esc(name) + '.' + (scoped ? '' : ' Chưa có dữ liệu riêng cho khu ' + esc(old) + ' cũ. Phần dưới là dữ liệu khu ' + esc(p.anchor || name) + ', không phải ' + esc(old) + ' cũ; giá, giờ đi và mùa có thể khác.') + '</p>' : ""; }
    function pick(list) { if (!old && !hit.alias) return { l: list, sc: true }; var f = list.filter(inOld); return f.length ? { l: f, sc: true } : { l: list, sc: !old }; }
    var oldNote = note(false);
    if (intent === "angi") {
      var pd = pick(p.dishes); oldNote = note(pd.sc);
      if (!pd.l.length) return A.fallback({ prov: p, asked: I.q, topic: "food", what: "món ăn ở " + name });
      return oldNote + '<p class="ask-h">Ăn gì ở ' + esc(old && pd.sc ? old + " cũ" : name) + '</p>' + li(pd.l.slice(0, 5).map(function (d) { var r = (d.restaurants || [])[0]; return "<b>" + esc(d.name) + "</b> · " + esc(short(A.priceShort(d.price) || d.price, 40)) + (r ? " · " + esc(r.name) : ""); })) + acts([goSeg(p, "angi", "Xem đủ " + p.dishes.length + " món và quán")]);
    }
    if (intent === "odau") {
      var ps = pick(p.stays); oldNote = note(ps.sc);
      if (!ps.l.length) return A.fallback({ prov: p, asked: I.q, topic: "stay", what: "chỗ ở tại " + name });
      return oldNote + '<p class="ask-h">Ở đâu tại ' + esc(old && ps.sc ? old + " cũ" : name) + '</p>' + li(ps.l.slice(0, 5).map(function (s) { return "<b>" + esc(s.name.split(" (")[0]) + "</b> · " + esc(short(A.priceShort(s.price) || s.price, 40)) + (s.kind ? " · " + esc(s.kind) : ""); })) + '<p class="small">Chưa kiểm chứng, chưa đối tác, chưa thu phí. Gọi xác nhận trước khi đặt.</p>' + acts([goSeg(p, "odau", "Xem " + p.stays.length + " chỗ ở theo khu")]);
    }
    if (intent === "chiphi") {
      var c = (p.cost || []).filter(function (r) { return /Tổng/i.test(r.label); });
      if (!(p.cost || []).length) return A.fallback({ prov: p, asked: I.q, what: "bảng chi phí " + name, how: ["Bấm Lập kế hoạch: app cộng tiền đi, ở, ăn, vé theo số ngày bạn chọn."] });
      var dn = I.days && I.days !== "3N2Đ" ? '<p>App chỉ có bảng 3 ngày 2 đêm cho ' + esc(name) + ', chưa có bảng ' + esc(I.days) + '. Bấm Lập kế hoạch và chọn số ngày để app tính lại.</p>' : "";
      return oldNote + '<p class="ask-h">Chi phí 3 ngày 2 đêm đi ' + esc(name) + ', 1 người từ TP.HCM (ước tính)</p>' + dn + li((c.length ? c : p.cost.slice(0, 4)).map(function (r) { return esc(r.label) + ": <b>" + esc(r.value) + "</b>"; })) + budgetNote(I, c.length ? c : p.cost) + acts([goSeg(p, "tongquan", "Xem bảng chi phí"), btn("Lập kế hoạch", "startPlanForProv('" + p.id + "')")]);
    }
    if (intent === "mua" || intent === "mang" && !(p.checklist || []).length) {
      var sb = p.best_season || (p.season && p.season.best);
      if (!sb) return A.fallback({ prov: p, asked: I.q, topic: "season", what: "mùa đẹp " + name });
      return note(true) + (old ? '<p class="small">Mùa dưới đây viết cho khu ' + esc(p.anchor || name) + ', có thể không đúng cho ' + esc(old) + ' cũ.</p>' : '') + '<p class="ask-h">Mùa đẹp ở ' + esc(name) + '</p><p>' + esc(sb) + '</p>' + (p.season && p.season.wear ? '<p>Mặc: ' + esc(p.season.wear) + '</p>' : "") + acts([goSeg(p, "tongquan", "Cẩm nang " + name)]);
    }
    if (intent === "mang") return oldNote + '<p class="ask-h">Mang gì khi đi ' + esc(name) + '</p>' + li(p.checklist.slice(0, 8).map(esc)) + acts([goSeg(p, "tongquan", "Cẩm nang " + name)]);
    if (intent === "mua_mua") {
      var r = p.rainy || {};
      if (!(r.points || []).length && !r.tip) return A.fallback({ prov: p, asked: I.q, what: "gợi ý khi trời mưa ở " + name });
      return oldNote + '<p class="ask-h">Trời mưa ở ' + esc(name) + '</p>' + ((r.points || []).length ? li(r.points.map(esc)) : "") + (r.tip ? '<p>' + esc(short(r.tip, 220)) + '</p>' : "") + acts([goSeg(p, "tongquan", "Cẩm nang " + name)]);
    }
    if (intent === "khancap") {
      var e = p.emergency || {};
      return oldNote + '<p class="ask-h">Số khẩn cấp</p>' + li(['Công an <a href="tel:113"><b>113</b></a>', 'Cứu hỏa <a href="tel:114"><b>114</b></a>', 'Cấp cứu <a href="tel:115"><b>115</b></a>'].concat((e.extra || []).slice(0, 3).map(function (x) { return esc(x.name) + ': <a href="tel:' + esc((x.number || "").replace(/\s/g, "")) + '"><b>' + esc(x.number) + '</b></a>'; }))) + acts([goSeg(p, "tongquan", "Cẩm nang " + name)]);
    }
    if (intent === "chatchem") {
      if (!(p.scams || []).length) return A.fallback({ prov: p, asked: I.q, what: "cảnh báo chặt chém ở " + name, how: ["Hỏi giá trước khi gọi món, lên xe; ưu tiên nơi niêm yết giá.", "Gọi đường dây nóng du lịch của tỉnh nếu bị ép giá."] });
      return oldNote + '<p class="ask-h">Cẩn thận ở ' + esc(name) + '</p>' + li(p.scams.slice(0, 3).map(function (s) { return esc(short(s.situation, 110)) + " <i>Cách tránh:</i> " + esc(short(s.avoid, 110)); })) + acts([goSeg(p, "tongquan", "Cẩm nang " + name)]);
    }
    if (intent === "diden") {
      var R = p.routes || {}, rows = [];
      (R.sg || []).forEach(function (r) { rows.push({ from: "Từ TP.HCM", fk: "sg", mode: r.mode, time: r.time, price: r.price }); });
      (R.hn || []).forEach(function (r) { rows.push({ from: "Từ Hà Nội", fk: "hn", mode: r.mode, time: r.time, price: r.price }); });
      (R.near || R.other || []).forEach && (R.near || R.other || []).forEach(function (r) { rows.push({ from: r.from || "Gần nhất", fk: "", mode: r.mode, time: r.time, price: r.price }); });
      var f = rows.filter(function (r) { return (!I.from || (I.from === "o" ? FROM_RE.o.test(r.from + " " + r.mode) : r.fk === I.from)) && (!I.mode || MODE_RE[I.mode].test(r.mode)); });
      if (I.mode === "tau" && !f.length && noRail(o)) return oldNote + '<p class="ask-h">Tàu hỏa tới ' + esc(name) + '</p><p>' + esc(name) + ' không có ga tàu khách liên tỉnh.</p>' + (rows.length ? '<p>Cách đi khác:</p>' + li(rows.slice(0, 4).map(function (r) { return esc(r.from) + " · " + esc(r.mode) + " · " + esc(short(r.time, 30)) + " · " + esc(short(r.price, 60)); })) : "") + acts([goSeg(p, "diden", "Xem đủ cách đi")]);
      if (!f.length) return A.fallback({ prov: p, asked: I.q, topic: I.mode || "bay", what: "tuyến " + (I.mode ? MODE_NAME[I.mode] + " " : "") + (I.from ? "từ " + FROM_NAME[I.from] + " " : "") + "tới " + name, lead: oldNote + (rows.length ? '<p>Các tuyến app đang có tới ' + esc(p.anchor || name) + ':</p>' + li(rows.slice(0, 4).map(function (r) { return esc(r.from) + " · " + esc(r.mode) + " · " + esc(short(r.time, 30)) + " · " + esc(short(r.price, 60)); })) : "") });
      var railNote = I.mode === "tau" && noRail(o) ? '<p>' + esc(p.anchor || name) + ' không có ga tàu khách liên tỉnh; tuyến dưới đi tàu tới ga gần nhất rồi nối xe.</p>' : "";
      return oldNote + '<p class="ask-h">Đi đến ' + esc(name) + (I.from ? ' từ ' + FROM_NAME[I.from] : '') + '</p>' + railNote + li(f.slice(0, I.from || I.mode ? 6 : 4).map(function (r) { return esc(r.from) + " · " + esc(r.mode) + " · " + esc(short(r.time, 30)) + " · " + esc(short(r.price, 60)); })) + (R.note ? '<p class="small">' + esc(short(R.note, 240)) + '</p>' : "") + acts([goSeg(p, "diden", "Xem đủ cách đi")]);
    }
    if (intent === "dilai") {
      if (!(p.local || []).length) return A.fallback({ prov: p, asked: I.q, topic: "xe", what: "cách đi lại trong " + name });
      return oldNote + '<p class="ask-h">Đi lại trong ' + esc(name) + '</p>' + li(p.local.slice(0, 4).map(function (l) { return "<b>" + esc(l.mode) + "</b> · " + esc(short(l.price, 60)); })) + acts([goSeg(p, "dilai", "Xem tab Đi lại")]);
    }
    if (intent === "lichtrinh") return oldNote + '<p class="ask-h">Lịch trình ' + esc(name) + '</p><p>App có lịch mẫu xếp theo cụm khu vực. Gợi ý: ' + esc(String(p.suggested_days || 3)) + ' ngày.' + (I.days ? ' Muốn ' + esc(I.days) + ' thì bấm Lập kế hoạch và chọn số ngày.' : '') + '</p>' + acts([goSeg(p, "lichtrinh", "Xem lịch mẫu"), btn("Lập kế hoạch", "startPlanForProv('" + p.id + "')")]);
    var pp = pick(p.places), pl = pp.l; oldNote = note(pp.sc);
    return oldNote + '<p class="ask-h">' + esc(name) + (old && pp.sc ? ' · khu ' + esc(old) + ' cũ' : '') + '</p><p>' + esc(short(p.overview, 220)) + '</p>' +
      li(pl.slice(0, 5).map(function (x) { return '<a href="javascript:void 0" onclick="openProvPlace(\'' + p.id + '\',\'' + x.id + '\')">' + esc(x.name.split(" (")[0]) + '</a>' + (x.dist != null && x.dist !== "" ? " · " + esc(dist(x)) : ""); })) +
      '<p class="small">Hỏi tiếp: "ăn gì ở ' + esc(name) + '", "ở đâu", "đi bằng gì", "mùa nào đẹp", "hết bao nhiêu tiền".</p>' + acts([goSeg(p, "didau", "Xem " + p.places.length + " địa danh")]);
  };

  /* ---------- Tỉnh cũ nay thuộc tỉnh nào ---------- */
  A.answerBelongs = function (hit, I) {
    var p = hit.prov, olds = (SAP_NHAP[p.id] || []).slice(1);
    if (hit.old) return '<p class="ask-h">' + esc(hit.old) + ' nay thuộc ' + esc(label(p)) + '</p><p>Từ 01/07/2025, theo Nghị quyết 202/2025/QH15, ' + esc(label(p)) + ' gồm ' + esc([SAP_NHAP[p.id][0]].concat(olds).join(" + ")) + ' cũ.</p>' + acts([goSeg(p, "tongquan", "Cẩm nang " + label(p))]);
    if (hit.alias && hit.kind === "alias") { var a = (BT_ALIAS || []).filter(function (x) { return x[0] === hit.alias; })[0]; return '<p class="ask-h">' + esc(I.q.replace(/\s*(nay|bây giờ|giờ)?\s*thuộc.*$/i, "")) + ' nay thuộc ' + esc(label(p)) + '</p>' + (a && a[2] ? '<p>Trước 01/07/2025 thuộc ' + esc(a[2]) + '.</p>' : '') + acts([goSeg(p, "tongquan", "Cẩm nang " + label(p))]); }
    return '<p class="ask-h">' + esc(label(p)) + ' là tỉnh, thành sau sáp nhập</p><p>' + (olds.length ? 'Từ 01/07/2025 gồm ' + esc([SAP_NHAP[p.id][0]].concat(olds).join(" + ")) + ' cũ.' : 'Không sáp nhập, giữ nguyên tên.') + '</p>' + acts([goSeg(p, "tongquan", "Cẩm nang " + label(p))]);
  };

  /* ---------- So sánh 2 nơi ---------- */
  A.answerCompare = function (L, R, I) {
    function col(t) {
      var p = t.area ? provById(t.area.prov) : t.prov, pr = t.area ? profile(t.area) : {}, nm = t.area ? t.area.name : label(p);
      var season = pr.season ? pr.season.best : (t.area ? "chưa có mùa riêng cho khu này" : (p.best_season || "chưa có"));
      var route = pr.routes ? pr.routes[0].mode + " · " + pr.routes[0].time + " (ước tính)" : (!t.area && p.routes && p.routes.sg && p.routes.sg[0] ? p.routes.sg[0].mode + " · " + p.routes.sg[0].time : "chưa có tuyến riêng");
      var n = t.area ? (typeof btAreaPlaces === "function" ? btAreaPlaces(t.area).length : 0) : p.places.length;
      var tot = !t.area ? (p.cost || []).filter(function (r) { return /Tổng/i.test(r.label); }).map(function (r) { return r.value; })[0] : (pr.budget ? (pr.budget[Object.keys(pr.budget)[0]].filter(function (r) { return /Tổng/i.test(r.label); })[0] || {}).value : "");
      return { nm: nm, p: p, a: t.area, rows: ["Thuộc: " + label(p), "Mùa đẹp: " + season, "Đi từ TP.HCM: " + route, "Địa danh trong app: " + n, "Chi phí: " + (tot || "chưa có bảng riêng")] };
    }
    var a = col(L), b = col(R);
    return '<p class="ask-h">So sánh ' + esc(a.nm) + ' và ' + esc(b.nm) + '</p>' + '<p><b>' + esc(a.nm) + '</b></p>' + li(a.rows.map(esc)) + '<p><b>' + esc(b.nm) + '</b></p>' + li(b.rows.map(esc)) +
      '<p class="small">Số liệu từ dữ liệu app; giờ đi, chi phí là ước tính. Chọn nơi hợp mùa bạn đi trước, rồi so tiền đi.</p>' +
      acts([a.a ? btn("Lập kế hoạch đi " + a.nm, "btPlanArea('" + a.a.id + "')") : goSeg(a.p, "tongquan", "Cẩm nang " + a.nm), b.a ? btn("Lập kế hoạch đi " + b.nm, "btPlanArea('" + b.a.id + "')") : goSeg(b.p, "tongquan", "Cẩm nang " + b.nm)]);
  };

  /* ---------- Câu chung chung: hỏi lại tối đa 2 câu, gợi ý theo tháng và ngân sách ---------- */
  A.answerGeneral = function (I) {
    var m = new Date().getMonth() + 1, good = [];
    PROV_DATA.forEach(function (p) {
      var t = String(p.best_season || "").toLowerCase(), cut = t.search(/tránh/); if (cut >= 0) t = t.slice(0, cut);
      var re = /tháng\s*(\d{1,2})(?:\s*[–-]\s*(?:tháng\s*)?(\d{1,2}))?(\s*âm lịch)?/g, r;
      while ((r = re.exec(t))) { if (r[3]) continue; var a = +r[1], b = r[2] ? +r[2] : a; if (a < 1 || a > 12 || b < 1 || b > 12) continue; if (a <= b ? (m >= a && m <= b) : (m >= a || m <= b)) { good.push(p); break; } }
    });
    if (I.budget) good = good.filter(function (p) { var t = (p.cost || []).filter(function (r) { return /Tổng/i.test(r.label); })[0]; var mm = t && String(t.value).match(/([\d.]+)/); return !mm || +mm[1].replace(/\./g, "") <= I.budget; });
    var ask = [];
    if (!I.from) ask.push("Bạn đi từ đâu (Hà Nội, TP.HCM, Đà Nẵng…)?");
    if (!I.days && !I.budget) ask.push("Đi mấy ngày, ngân sách khoảng bao nhiêu?");
    return '<p class="ask-h">Tháng ' + m + ' đi đâu đẹp</p><p>Theo mùa đẹp trong cẩm nang' + (I.budget ? ' và ngân sách ' + esc(I.budget.toLocaleString("vi-VN")) + 'đ (so với tổng chi phí 3N2Đ ước tính)' : '') + ', tháng này hợp đi:</p>' +
      acts(good.slice(0, 8).map(function (p) { return goSeg(p, "tongquan", label(p)); })) + (ask.length ? '<p>Để gợi ý sát hơn, cho app biết thêm: ' + ask.map(esc).join(" ") + '</p>' : '') +
      chips(["Từ Sài Gòn đi Đà Lạt 3 ngày hết bao nhiêu", "Quy Nhơn đi bằng gì"]);
  };
  A.answerFaq = function (q) {
    /* chỉ tính từ có nghĩa (bỏ từ hỏi), cần ít nhất 2 từ trùng với câu hỏi mẫu */
    var words = fold(q).split(" ").filter(function (w) { return w.length > 1 && !A.QSET[w]; }), best = [];
    (typeof BT_FAQ !== "undefined" ? BT_FAQ : []).forEach(function (g) {
      g.items.forEach(function (it) {
        var fq = fold(it.q), t = fold(it.q + " " + it.a), s = 0, inQ = 0;
        words.forEach(function (w) { if (A.has(t, w)) { var q2 = A.has(fq, w); s += q2 ? 2 : 1; if (q2) inQ++; } });
        if (s > 0) best.push({ s: s, inQ: inQ, it: it });
      });
    });
    best.sort(function (a, b) { return b.s - a.s; });
    /* câu dài mà chỉ trùng 2 từ ngắn với câu mẫu ("ra", "điện") thì không phải câu đó: "Lễ hội diều diễn ra ở đâu" không phải câu cài app */
    if (!best.length || best[0].s < 4 || best[0].inQ < 2 || (words.length >= 5 && best[0].inQ / words.length < 0.4)) return "";
    var it = best[0].it, n = 0, d = 0; PROV_DATA.forEach(function (p) { n += p.places.length; d += p.dishes.length; });
    return '<p class="ask-h">' + esc(it.q) + '</p><p>' + esc(it.a.replace(/\{PLACE\}/g, n.toLocaleString("vi-VN")).replace(/\{DISH\}/g, d.toLocaleString("vi-VN"))) + '</p>' + acts([btn("Xem 34 tỉnh thành", "show('destinations')")]);
  };
})(BTAI);
