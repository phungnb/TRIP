/* BuiTrip AI — bước 3: đoán ý định.
   Thêm 1 loại câu hỏi: thêm 1 dòng vào INTENTS (thứ tự là độ ưu tiên) + 1 nhánh trả lời trong tra-loi.js + câu thử trong tests. */
(function (A) {
  var INTENTS = [
    ["thuoc_tinh", /\b(nay thuoc|thuoc tinh nao|thuoc tinh gi|thuoc ve tinh|sap nhap vao|nhap vao tinh nao|gio la tinh nao|bay gio la tinh|tinh moi la)\b/],
    ["ngoai_mien", /\b(thoi tiet hom nay|hom nay troi|troi hom nay|du bao thoi tiet|ngay mai troi|ty gia (do|usd|ngoai te|hom nay|euro|yen|won|bao nhieu)|ty gia$|chung khoan|bong da|xo so|dat phong giup|dat phong ho|dat ve giup|dat ve ho|book giup|dat giup|viet code|lap trinh|lam bai tho|viet bai tho|giai toan|gia vang|lai suat|ma giam gia|voucher|cach nau|cong thuc nau|ke chuyen|chuyen cuoi|visa|ho chieu nuoc ngoai|may gio chay|lich chay|gio xe chay|lich ban phao hoa|phao hoa nam nay|hotline)\b|\b(hom nay|bay gio|luc nay)\b.*\bgia\b|\bgia\b.*\b(hom nay|bay gio|luc nay)\b|\b(dat|book)\b.*\b(cho minh|cho toi|cho em|giup|ho)\b|\b(so dien thoai|sdt|so dt)\b.*\b(khach san|nha nghi|homestay|resort|nha hang|quan|nha xe|hang xe|hang bay|tour)\b/],
    ["so_sanh", /\b(so sanh|so voi|khac gi|khac nhau|nen chon|chon .{2,30} hay|nen di .{2,30} hay|khac .{2,40} (nhu )?the nao)\b|\bvs\b/],
    ["chiphi", /\b(ton kem|dat do khong|co dat khong|bao nhieu tien|chi phi|het bao nhieu|ton bao nhieu|ngan sach|het may|tong tien|du tien|\d+ ?trieu|trieu dong)\b/],
    ["mang", /\b(mang gi|mang theo|chuan bi gi|chuan bi nhung gi|can chuan bi|do dac|hanh ly|soan do|mac gi|mac do gi)\b/],
    ["khancap", /\b(khan cap|cap cuu|cong an|benh vien|duong day nong|so dien thoai)\b/],
    ["chatchem", /\b(chat chem|lua dao|bi lua|cam bay|hét gia|het gia|an toan|nguy hiem|can luu y|luu y gi|luu y nhung gi|can than gi|de bi lua)\b/],
    ["hub", /\b(co san bay|san bay nao|san bay gan|co ga tau|co ga|ga tau nao|ga nao gan)\b/],
    ["diden", /\b(di bang gi|bang gi|may bay|xe khach|tau hoa|tau hoả|tau lua|ve xe|ve may bay|ve tau|san bay|ben xe|nha ga|ga tau|tu ha noi|tu sai gon|tu hcm|tu tp hcm|tu tphcm|tu da nang|di den|toi bang|mat bao lau|bao lau|di tu|duong di|cach di|bang cach nao|di the nao|tau cao toc|ca no|ra dao|huong nao|duong nao|loi nao|nga nao|ngo nao|deo nao|nhanh nhat|di nhanh|nhanh hon|bao xa|bao nhieu km|may km|cach bao xa|duong (len|xuong|vao|ra|toi|den|ve|sang)|kho di|de di khong|tuyen duong|cung duong|lo trinh di|di loi|di ngang qua|di may tieng|may tieng|bao nhieu tieng|di sao|sao cho nhanh|di xe gi|xe gi|kieu gi)\b/],
    ["dilai", /\b(thue xe|xe may|taxi|grab|di lai|xe buyt|xe dien|di chuyen trong|di chuyen o|di chuyen quanh|di chuyen noi)\b/],
    ["angi", /\b(co gi an|an uong gi|an cai gi|an gi|an chay|mon chay|do chay|quan chay|mon|quan an|quan nao|quan ngon|dac san|an sang|an toi|nha hang|an uong|ngon)\b/],
    ["odau", /\b(cho nghi|nghi o dau|nghi dem|nen o|o khu nao|o cho nao|o dau|khach san|homestay|dat phong|thue phong|phong o|nha nghi|cho o|ngu o|ngu dau|luu tru)\b/],
    ["mua", /\b(mua nao|thang nao|thang may|thoi tiet|lanh khong|nong khong|thang \d+|mua dep|khi nao dep|luc nao dep|di luc nao|di khi nao|thoi diem|mua nay|co lanh|co ret|co nong)\b/],
    ["lichtrinh", /\b(lich trinh|may ngay|ngay dem|\dn\dd|\d ngay|di dau truoc|ke hoach)\b/],
    ["didau", /\b(choi gi|co gi choi|co gi|di dau|tham quan|dia danh|diem|check in|song ao|di tich|bien|thac|nui)\b/],
    /* "resort" đứng một mình mới là hỏi chỗ ở: "Cần Thơ Eco Resort mùa nào đẹp" là hỏi mùa của 1 địa danh */
    ["odau", /\bresort\b/]
  ];
  var MUA_RE = INTENTS.filter(function (x) { return x[0] === "mua"; })[0][1];
  /* "mưa" và "mùa" bỏ dấu đều thành "mua": xét mưa trên chữ có dấu, gõ không dấu thì cần cụm rõ nghĩa */
  function rainy(q, f) { return /(^|\s)mưa(\s|$)/.test(A.low(q)) || /\b(troi mua|khi mua|mua thi|neu mua|gap mua)\b/.test(f); }
  /* bỏ tên tỉnh, khu khỏi câu trước khi đoán ý: "Lai Châu" không thành "đi lại", "Bến Tre" không thành "bến xe" */
  var NAMES = null;
  function noNames(f, q) {
    if (!NAMES) {
      var L = [], add = function (n) { L.push({ f: A.fold(n), l: String(n).toLowerCase() }); };
      (typeof PROV_DATA !== "undefined" ? PROV_DATA : []).forEach(function (p) { add(p.name); });
      if (typeof SAP_NHAP !== "undefined") Object.keys(SAP_NHAP).forEach(function (k) { SAP_NHAP[k].forEach(add); });
      (typeof KHU_VUC !== "undefined" ? KHU_VUC : []).forEach(function (a) { add(a.name); });
      (typeof BT_ALIAS !== "undefined" ? BT_ALIAS : []).forEach(function (a) { if (a[0].indexOf(" ") > 0) L.push({ f: a[0], l: "" }); });
      NAMES = L.filter(function (n) { return n.f.indexOf(" ") > 0; }).sort(function (a, b) { return b.f.length - a.f.length; });
    }
    /* gõ có dấu: chỉ bỏ tên viết đúng dấu ("hỏi ăn" không phải "Hội An") */
    var ql = q && A.marked(q) ? String(q).toLowerCase() : "";
    /* bỏ theo đoạn từ, tên cắt ngang nhau ("ninh binh duong nao": Ninh Bình / Bình Dương) xử như A.findProv */
    var toks = f.split(" ").filter(Boolean), C = [], lt = q ? A.low(q).split(" ").filter(Boolean) : [];
    if (lt.length !== toks.length) lt = [];
    NAMES.forEach(function (n) {
      if (ql && n.l && ql.indexOf(n.l) < 0) return;
      var w = n.f.split(" ");
      for (var i = 0; i + w.length <= toks.length; i++) {
        var ok = true; for (var j = 0; j < w.length; j++) if (toks[i + j] !== w[j]) { ok = false; break; }
        /* tên quen gọi chỉ có dạng bỏ dấu: câu gõ có dấu thì đoạn đó cũng phải gõ không dấu ("hỏi ăn" không phải "hoi an") */
        if (ok && !n.l && ql && lt.length && lt.slice(i, i + w.length).join(" ") !== n.f) ok = false;
        if (ok) C.push({ s: i, e: i + w.length, ten: n.l });
      }
    });
    if (A.boCatNgang) C = A.boCatNgang(q || f, C);
    var bo = {}; C.forEach(function (m) { for (var i = m.s; i < m.e; i++) bo[i] = 1; });
    return toks.filter(function (t, i) { return !bo[i]; }).join(" ");
  }
  A.intentOf = function (q) {
    var f = noNames(A.fold(q), q);
    /* thời tiết theo ngày (giữ dấu để không lẫn "mưa" với "mùa") */
    var ql = String(q).toLowerCase();
    if (!/tháng\s*\d/.test(ql) && /(hôm nay|ngày mai|(^|\s)mai\s|tuần này|tuần sau|bây giờ|lúc này|tối nay|cuối tuần này|mấy nay|dạo này|mấy hôm nay|cập nhật)/.test(ql) && /(mưa|nắng|sương mù|lạnh|rét|nóng|bão|thời tiết|trời)/.test(ql) || !/tháng\s*\d/.test(ql) && /(có mưa|có bão|có nắng|có sương mù)\s+(không|ko)\b/.test(ql)) return "ngoai_mien";
    if (rainy(q, f) && !/\b(thuoc|so sanh)\b/.test(f)) return "mua_mua";
    /* "đi lại ở Huế bằng gì": "bằng gì" không biến câu thành hỏi đường tới Huế */
    if (/\b(di lai|di chuyen) (o|trong|quanh|noi|tai)\b/.test(f)) return "dilai";
    for (var i = 0; i < INTENTS.length; i++) if (INTENTS[i][1].test(f)) {
      /* "phượt Hà Giang bằng xe máy mùa nào đẹp": xe máy chỉ là cách đi, câu hỏi là mùa */
      if (INTENTS[i][0] === "dilai" && !/\b(thue xe|di lai|taxi|grab|xe buyt)\b/.test(f) && MUA_RE.test(f)) return "mua";
      return INTENTS[i][0];
    }
    return "";
  };
  /* Trường người hỏi cần cho 1 địa danh: giá, giờ, mùa */
  A.noNames = noNames;
  A.wantOf = function (q) {
    var f = noNames(A.fold(q), q), w = [];
    if (/\b(gia|ve|bao nhieu|tien|phi|chi phi)\b/.test(f) && !/\b(ve may bay|ve tau|ve xe)\b/.test(f)) w.push("price");
    if (/\b(gio|mo cua|dong cua)\b/.test(f) && !/\bmay gio bay\b/.test(f)) w.push("hours");
    if (/\b(thang may|thang nao|mua nao|khi nao|luc nao|mua dep|thoi diem)\b/.test(f) && !rainy(q, f)) w.push("season");
    return w;
  };
  /* Phương tiện và nơi đi người hỏi nêu */
  A.modeOf = function (q) {
    var f = A.fold(q);
    if (/\b(may bay|ve may bay|san bay|bay thang)\b/.test(f)) return "bay";
    if (/\b(tau hoa|tau lua|ga tau|nha ga|ve tau|duong sat)\b/.test(f)) return "tau";
    if (/\b(xe khach|ben xe|ve xe|limousine|xe giuong nam)\b/.test(f)) return "xe";
    if (/\b(tau cao toc|ca no|ra dao)\b/.test(f) || /(^|\s)(phà|cảng)(\s|$)/.test(A.low(q))) return "thuy";
    return "";
  };
  A.fromOf = function (q) {
    var f = A.fold(q);
    if (/\btu (ha noi|hn)\b/.test(f)) return "hn";
    if (/\btu (sai gon|sg|hcm|tp hcm|tphcm|ho chi minh|thanh pho ho chi minh)\b/.test(f)) return "sg";
    if (/\btu da nang\b/.test(f)) return "dn";
    /* "Đà Lạt cách Sài Gòn bao xa": nơi sau "cách" là nơi đi */
    if (/\bcach (ha noi|hn)\b/.test(f)) return "hn";
    if (/\bcach (sai gon|sg|hcm|tp hcm|tphcm|ho chi minh|thanh pho ho chi minh)\b/.test(f)) return "sg";
    if (/\bcach da nang\b/.test(f)) return "dn";
    return "";
  };
  A.daysOf = function (q) {
    var f = A.fold(q), m = f.match(/\b(\d)\s*n\s*(\d)\s*d\b/) || f.match(/\b(\d)\s*ngay\s*(\d)\s*dem\b/);
    if (m) return m[1] + "N" + m[2] + "Đ";
    m = f.match(/\b(\d)\s*ngay\b/); if (m) return m[1] + "N" + Math.max(0, m[1] - 1) + "Đ";
    return "";
  };
  /* "3 triệu", "3tr", "3,5 triệu", "500k" -> số đồng */
  A.budgetOf = function (q) {
    var f = String(q || "").toLowerCase().replace(/,/g, "."), m = f.match(/(\d+(?:\.\d+)?)\s*(triệu|trieu|tr)\b/);
    if (m) return Math.round(parseFloat(m[1]) * 1e6);
    m = f.match(/(\d+)\s*k\b/); if (m) return +m[1] * 1000;
    return 0;
  };
  /* Câu hỏi tiếp nối câu trước ("thế vé trẻ em thì sao", "còn chỗ ở", "đi từ đó mất bao lâu") */
  A.followCue = function (q) {
    var l = A.low(q), f = A.fold(q);
    return /^(thế|thế còn|còn|vậy|vậy còn|thì|rồi)\s/.test(l) || /(^|\s)(đó|đấy|ở đó|từ đó|chỗ đó|nơi đó|ở đấy)(\s|$|\?)/.test(l) || /^(the|con|vay)\s/.test(f) && !A.marked(q);
  };
})(BTAI);
