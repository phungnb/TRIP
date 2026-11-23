/* BuiTrip AI — đường đi của 1 câu hỏi: chuẩn hóa → thực thể → ý định → lấy dữ liệu → ghép câu / câu dự phòng.
   Chạy hoàn toàn trên máy, không gọi mạng. window.askBuiTrip(q) trả { html, kind, intent, ent, ms }.
   kind: item | area | isle | prov | belongs | compare | askback | general | faq | fallback. */
(function (A) {
  var GENERAL = /\b(nen di dau|di dau choi|cuoi tuan|di choi dau|du lich dau|di dau dep|goi y di dau|dang di dau|nen du lich o dau)\b/;
  var SPLIT = /\s+(?:và|va|với|voi|hay là|hay la|hay|vs\.?|so với|so voi|hoặc|hoac|khác|khac)\s+/i;
  function entOf(q) {
    var isle = A.findIsle(q), area = A.findArea(q), prov = A.findProv(q);
    return { isle: isle, area: area, prov: prov };
  }
  /* gõ có dấu thì chỉ nhận "từ"/"đi" có dấu ("Hẻm Tu Sản" không phải "từ Sản") */
  function unmark(re, q) { return A.marked(q) ? new RegExp(re.source.replace(/\(\?:từ\|tu\)/g, "từ").replace(/\|di\|/g, "|").replace(/\|toi\|/g, "|").replace(/\|den\|/g, "|").replace(/\|vao\|/g, "|").replace(/\|len\|/g, "|").replace(/\|bang gi\|/g, "|").replace(/\|mat bao lau\|/g, "|").replace(/\|het bao nhieu\|/g, "|"), re.flags) : re; }
  /* "tu" trong tên ("nhà tù", "Hẻm Tu Sản") gõ không dấu trùng "từ": chỉ coi là nơi xuất phát khi phần sau là tỉnh/khu có thật */
  function isFrom(s) { var e = entOf(s); return !!(e.area || e.prov); }
  function destPart(q) {
    var m = q.match(unmark(/^(.*?)(?:^|\s)(?:từ|tu)\s+(.{2,40}?)\s+(?:đi|di|tới|toi|đến|den|ra|vào|vao|lên|len|về)\s+(.+)$/i, q));
    if (m && isFrom(m[2])) return (m[1] + " " + m[3]).trim();
    m = q.match(unmark(/^(.*(?:^|\s)(?:đi|di|tới|toi|đến|den|ra|vào|vao|lên|len|về)\s+.{2,40}?)\s+(?:từ|tu)\s+(.{2,40}?)(\s+(?:bằng gì|bang gi|mất bao lâu|mat bao lau|hết bao nhiêu|het bao nhieu|bao xa).*)?$/i, q));
    if (m && isFrom(m[2])) return (m[1] + (m[3] || "")).trim();
    /* "tour ... khởi hành từ Sài Gòn": nơi hỏi là phần trước */
    m = q.match(/^(.*?)[\s,]+(?:khởi hành|xuất phát|khoi hanh|xuat phat)\s+(?:từ|tu)\s+(.{2,40}?)(?:\s+(?:ngày|ngay|lúc|luc)\b.*)?$/i);
    if (m && isFrom(m[2])) return m[1].trim();
    return q;
  }
  function outOfDomain(I, q) {
    var f = A.fold(q);
    var E = entOf(q), ar = E.area, pv = E.prov && E.prov.prov;
    var topic = /\b(so dien thoai|sdt|so dt|hotline)\b/.test(f) ? "phone" : /\b(may gio chay|lich chay|gio xe chay)\b/.test(f) ? "xe" : /\bphao hoa\b/.test(f) ? "event" :
      /\b(thoi tiet|troi|du bao|mua|suong mu|nang|lanh|ret|nong|bao)\b/.test(f) && !/\bgia\b/.test(f) ? "weather" : /\b(dat|book)\b/.test(f) && !/\b(ma giam gia|voucher)\b/.test(f) ? "booking" :
      /\b(hom nay|bay gio|luc nay)\b/.test(f) && /\bgia\b/.test(f) ? "pricenow" : "offtopic";
    var WHAT = { weather: "thời tiết theo ngày", booking: "đặt chỗ hộ", phone: "số điện thoại của từng cơ sở (app không ghi số để tránh sai)", xe: "giờ chạy của từng nhà xe", event: "lịch sự kiện, pháo hoa theo năm", pricenow: "giá theo thời điểm hiện tại", offtopic: "câu hỏi ngoài du lịch trong nước" };
    if (topic === "offtopic") ar = pv = null;
    return { kind: "fallback", html: A.fallback({ topic: topic, area: ar, prov: pv, what: WHAT[topic], asked: q }) };
  }
  function route(q, I, rest, ctxEnt) {
    var f = A.fold(q);
    if (I.intent === "ngoai_mien") return outOfDomain(I, q);
    var E = ctxEnt || entOf(q);
    /* vé máy bay theo ngày cụ thể: không có trong dữ liệu */
    if (/\b(ngay \d{1,2}|\d{1,2} \d{1,2}|thang \d{1,2} nam)\b/.test(f) && I.mode === "bay" && /\b(gia|ve|bao nhieu)\b/.test(f))
      return { kind: "fallback", html: A.fallback({ area: E.area, prov: E.prov && E.prov.prov, topic: "flightdate", what: "giá vé máy bay theo ngày cụ thể", asked: q }) };
    if (I.intent === "thuoc_tinh") {
      /* địa danh, món có tên chứa tên tỉnh khác (Viện Hải dương học, Phố đi bộ Nguyễn Huệ): trả tỉnh của mục đó */
      var ti = rest && !A.isPlaceName(rest) ? A.findItem(rest) : null;
      if (ti && ti.s >= 95 && !ti.ambiguous) { var te = ti.best; return { kind: "item", html: '<p class="ask-old">' + A.esc(te.x.name.split(" (")[0]) + ' thuộc ' + A.esc(te.prov.name) + '.</p>' + A.answerItem(te, []), ent: { item: te, prov: te.prov.id } }; }
      if (E.prov && (E.prov.old || E.prov.kind === "alias" || !E.area)) return { kind: "belongs", html: A.answerBelongs(E.prov, I), ent: { prov: E.prov.prov.id } };
      if (E.area) { var ap = provById(E.area.prov); return { kind: "belongs", html: A.answerBelongs({ prov: ap, old: E.area.old && E.area.old !== ap.name ? E.area.old : "", alias: "", kind: "area" }, I), ent: { area: E.area.id } }; }
    }
    /* so sánh 2 nơi */
    if (!ctxEnt && (I.intent === "so_sanh" || SPLIT.test(q))) {
      var parts = q.replace(/^.*?(so sánh|so sanh)\s+/i, "").replace(/\s+(như thế nào|nhu the nao|thế nào|the nao|ra sao)\s*\??$/i, "").split(SPLIT);
      if (parts.length >= 2) {
        var L = entOf(parts[0]), R = entOf(parts.slice(1).join(" "));
        var l = L.area ? { area: L.area } : L.prov ? { prov: L.prov.prov } : null, r = R.area ? { area: R.area } : R.prov ? { prov: R.prov.prov } : null;
        if (l && r && (l.area || l.prov) !== (r.area || r.prov)) return { kind: "compare", html: A.answerCompare(l, r, I), ent: l.area ? { area: l.area.id, prov: l.area.prov } : { prov: l.prov.id } };
      }
    }
    if (!ctxEnt && GENERAL.test(f) && !E.area && !E.prov && !E.isle) return { kind: "general", html: A.answerGeneral(I) };
    if (I.intent === "hub") {
      var hi = !E.isle && !E.area && rest && !A.isPlaceName(rest) ? A.findItem(rest, { kinds: ["place"] }) : null, T = null;
      if (hi && hi.s >= 80 && !hi.ambiguous) { var ha = typeof btAreaOfPlace === "function" ? btAreaOfPlace(hi.best.prov, hi.best.x) : null; T = { item: hi.best, area: ha, prov: hi.best.prov }; }
      else if (E.isle) T = { isle: E.isle, prov: provById(E.isle.prov) };
      else if (E.area) T = { area: E.area, prov: provById(E.area.prov) };
      else if (E.prov) T = { prov: E.prov.prov, alias: E.prov.alias ? (rest || "").replace(/\s*(sân bay|ga tàu|ga)\s*/g, " ").trim() : "" };
      if (T) return { kind: "hub", html: A.answerHub(T, I), ent: T.item ? { item: T.item, prov: T.prov.id } : T.isle ? { isle: T.isle.id } : T.area ? { area: T.area.id, prov: T.area.prov } : { prov: T.prov.id } };
    }
    /* món, địa danh mang tên đảo ("Cháo hàu Côn Đảo"): gõ trọn tên mục thì trả mục, không trả đảo */
    var pre = E.isle && !ctxEnt && rest && !A.isPlaceName(rest) ? A.findItem(rest) : null;
    if (pre && pre.s >= 95 && !pre.ambiguous && pre.best.fm.length > A.fold(E.isle.name).length) E = { isle: null, area: E.area, prov: E.prov };
    if (E.isle && (E.isle.ban || I.intent || !I.want.length)) return { kind: "isle", html: A.answerIsle(E.isle, I), ent: { isle: E.isle.id } };
    /* địa danh, món, chỗ ở */
    var it = null;
    if (ctxEnt && ctxEnt.item) it = { best: ctxEnt.item, s: 100, cands: [ctxEnt.item] };
    else if (rest && (!A.isPlaceName(rest) || I.intent !== "chiphi" && (I.want.indexOf("price") >= 0 || I.want.indexOf("hours") >= 0))) it = A.findItem(rest);
    /* "vé Hội An": tên khu trùng tên thị trấn có phố cổ → hỏi phố cổ, không lấy mục khác chứa tên đó (Chợ Hội An) */
    if (it && E.area && rest && it.best.fm !== A.fold(rest)) { var pc = A.findItem("phố cổ " + rest); if (pc && pc.s >= 95 && !pc.ambiguous) it = pc; }
    var strong = it && it.s >= (I.intent && I.intent !== "didau" ? (it.ambiguous ? 85 : 80) : 70);
    if (it && strong && !(I.intent === "diden" && I.mode && it.best.kind !== "place")) {
      if (it.ambiguous && E.prov) { var c = it.cands.filter(function (e) { return e.prov.id === E.prov.prov.id; }); if (c.length) it = { best: c[0], s: it.s, cands: c, ambiguous: c.length > 1 && c.some(function (e) { return e.fm !== c[0].fm; }) }; }
      if (it.ambiguous && !ctxEnt) return { kind: "askback", html: A.askBack(it.cands, ""), ent: null };
      var e = it.best, ent = { item: e, prov: e.prov.id };
      if (e.kind === "place" && ["diden", "dilai", "chiphi", "mang", "angi", "odau", "lichtrinh", "khancap", "chatchem", "mua_mua"].indexOf(I.intent) >= 0) {
        var pa = typeof btAreaOfPlace === "function" ? btAreaOfPlace(e.prov, e.x) : null;
        if (pa) return { kind: "area", html: A.answerArea(pa, I, e.x.name.split(" (")[0]), ent: ent };
        var lead = '<p class="ask-old">' + A.esc(e.x.name.split(" (")[0]) + ' thuộc ' + A.esc(e.prov.name) + (e.x.dist != null && typeof placeDistLabel === "function" ? ', ' + A.esc(placeDistLabel(e.x)).replace(/^C/, "c").replace(/^N/, "n") : '') + '.' + (e.x.price ? ' Giá: ' + A.esc(e.x.price) + '.' : '') + (e.x.note && /tàu|thuyền|ca nô|đò|xe|đường/i.test(e.x.note) ? ' ' + A.esc(e.x.note) : '') + ' Cách đi tới ' + A.esc(e.prov.name) + ' bên dưới.</p>' + (I.intent === "diden" ? '' : '');
        /* đi từ chính tỉnh đó (từ TP.HCM đi Cần Giờ): tuyến liên tỉnh vô nghĩa, trả cách đi lại trong tỉnh */
        var FROMP = { sg: "tp-ho-chi-minh", hn: "ha-noi", dn: "da-nang" };
        if (I.intent === "diden" && FROMP[I.from] === e.prov.id) return { kind: "prov", html: lead.replace(' Cách đi tới ' + A.esc(e.prov.name) + ' bên dưới.', ' Đi từ trong ' + A.esc(e.prov.name) + ': xem cách đi lại bên dưới.') + A.answerProv({ prov: e.prov, old: "" }, Object.assign({}, I, { intent: "dilai", from: "" })), ent: ent };
        return { kind: "prov", html: lead + A.answerProv({ prov: e.prov, old: "" }, I), ent: ent };
      }
      if (I.intent === "mua") I.want = ["season"];
      return { kind: "item", html: A.answerItem(e, I.want), ent: ent };
    }
    if (E.isle) return { kind: "isle", html: A.answerIsle(E.isle, I), ent: { isle: E.isle.id } };
    if (E.area) return { kind: "area", html: A.answerArea(E.area, I), ent: { area: E.area.id, prov: E.area.prov } };
    if (E.prov) {
      if (I.want.indexOf("season") >= 0 && !I.intent) I.intent = "mua";
      return { kind: "prov", html: A.answerProv(E.prov, I), ent: { prov: E.prov.prov.id, old: E.prov.old, alias: E.prov.alias } };
    }
    return null;
  }
  function fromCtx(c) {
    var x = c && c.ent; if (!x) return null;
    var E = { isle: null, area: null, prov: null };
    if (x.isle) E.isle = DAO_TIEP_CAN.filter(function (d) { return d.id === x.isle; })[0] || null;
    if (x.area) E.area = btAreaById(x.area);
    if (x.prov) { var p = provById(x.prov); if (p) E.prov = { prov: p, old: x.old || "", alias: x.alias || "", kind: "prov" }; }
    if (x.itemKey) { var k = x.itemKey.split("|"); A.index().forEach(function (e) { if (!E.item && e.prov.id === k[0] && e.kind === k[1] && e.x.id === k[2]) E.item = e; }); }
    return E;
  }

  /* ---- Engine mới (BuiTrip AI học từ phản hồi) — hỏi trước, chỉ dùng khi tự tin.
     Nạp lười bởi ai/ai-loader.js (fetch ai/kb.json + ai-model.json + extra.json
     khi trang rảnh). Không chắc (confidence < 0.9 hoặc score < 0.3) thì trả về
     engine cũ bên dưới — không mất tính năng cũ, không đổi 120/120 câu live. */
  function attrEsc(s) { return A.esc(String(s == null ? "" : s)).replace(/"/g, "&quot;"); }
  function provIdByTinh(tinh) {
    if (!tinh || typeof PROV_DATA === "undefined") return null;
    var f = A.fold(tinh);
    for (var i = 0; i < PROV_DATA.length; i++) {
      if (A.fold(PROV_DATA[i].name) === f) return PROV_DATA[i].id;
    }
    return null;
  }
  var BT_INTENT_VN = { gia_ve: "giá vé", gio_mo_cua: "giờ mở cửa", mua_dep: "mùa đẹp",
    cach_di: "cách đi", an: "món ăn", o: "chỗ ở", diem_choi: "điểm chơi",
    lich_trinh: "lịch trình", chi_phi: "chi phí", mang_gi: "mang gì",
    so_sanh: "so sánh", tinh_cu: "tỉnh cũ", vi_tri: "vị trí", chung_chung: "chung chung" };
  function newAnswer(r, q, t0) {
    var ent = null, provId = null, provName = "";
    if (r.entity && typeof window.__btaiProvOf === "function") {
      try {
        var tinh = window.__btaiProvOf(r.entity);
        if (tinh) { provId = provIdByTinh(tinh); provName = tinh; }
      } catch (e) {}
    }
    if (provId) ent = { prov: provId };
    var html = '<div class="ask-ans-new">' + A.esc(r.answer).replace(/\n/g, "<br>") + "</div>";
    if (provId && typeof openProvDetail === "function")
      html += '<div class="ask-btns"><button class="btn btn-primary" type="button" onclick="openProvDetail(\'' + provId + '\')">Mở cẩm nang ' + A.esc(provName) + '</button></div>';
    html += '<div class="bt-ai-fb small" style="margin-top:8px">Câu trả lời này đúng không? ' +
      '<button class="btn btn-ghost" type="button" onclick="btAiGood(this)" data-q="' + attrEsc(q) + '">Đúng</button> ' +
      '<button class="btn btn-ghost" type="button" onclick="btAiBad(this)" data-q="' + attrEsc(q) + '" data-intent="' + attrEsc(r.intent) + '">Sai, sửa giúp</button></div>';
    return { html: html, kind: "ainew", intent: r.intent, ent: ent, ms: Date.now() - t0 };
  }
  function askCu(q, opt) {
    var t0 = Date.now(); q = String(q == null ? "" : q).trim();
    if (typeof BT_BIEN_THE !== "undefined") BT_BIEN_THE.forEach(function (v) { var re = new RegExp("(^|\\s)" + v[0] + "(?=\\s|$|[?.,!])", "gi"); q = q.replace(re, "$1" + v[1]); });
    if (!q) return { html: "", kind: "", ms: 0 };
    A.index();
    var I = { q: q, intent: A.intentOf(q), want: A.wantOf(q), mode: A.modeOf(q), from: A.fromOf(q), days: A.daysOf(q), budget: A.budgetOf(q) };
    if (I.mode && !I.intent) I.intent = "diden";
    if (!I.from) { var fm = q.match(unmark(/(?:^|\s)(?:từ|tu)\s+(.{2,40}?)\s+(?:đi|di|tới|toi|đến|den|ra|vào|vao|lên|len|về)\s/i, q)) || q.match(unmark(/(?:^|\s)(?:đi|di|tới|toi|đến|den|ra|vào|vao|lên|len|về)\s+.{2,40}?\s+(?:từ|tu)\s+(.{2,40}?)(?:\s+(?:bằng gì|bang gi|mất bao lâu|mat bao lau|hết bao nhiêu|het bao nhieu|bao xa)|\?|$)/i, q));
      if (fm) { var fe = entOf(fm[1]), fn = fe.area ? fe.area.name : fe.prov ? (fe.prov.alias ? fm[1].trim() : fe.prov.prov.name) : ""; if (fn) { I.from = "o"; A.setFrom(fn); if (!I.intent) I.intent = "diden"; } } }
    /* "từ A đi B", "đi B từ A": nơi cần trả lời là B, A chỉ là nơi xuất phát */
    var qd = destPart(q);
    var rest = A.rest(qd), f = A.fold(q), res = null;
    var useCtx = !(opt && opt.noCtx);
    res = route(qd, I, rest, null);
    if (!res && useCtx && (A.followCue(q) || I.intent || I.want.length)) {
      var last = A.ctx.last(), E = fromCtx(last);
      if (E && (E.item || E.area || E.isle || E.prov)) { res = route(q, I, "", E); if (res) res.followed = true; }
    }
    if (!res && (GENERAL.test(f) || (I.intent === "didau" && rest.split(" ").length <= 2 && !/^(thác|hồ|chùa|đảo|núi|làng|bãi|đền|hang|chợ|khu|suối|đồi|đèo|cầu|bảo tàng|thac|ho|chua|dao|nui|lang|bai|den|cho|suoi|doi|deo|cau)\s/i.test(rest)) || (I.budget && !rest))) res = { kind: "general", html: A.answerGeneral(I) };
    if (!res) { var fq = A.answerFaq(q); if (fq) res = { kind: "faq", html: fq }; }
    if (!res) {
      /* phần tên quá dài là cả câu người dùng (mảnh bình luận): không lặp lại nguyên câu, không in số người dùng gõ như dữ liệu */
      var nm = rest && rest.length >= 3 && rest.length <= 40 && rest.split(" ").length <= 6 ? rest.replace(/^\s+|\s+$/g, "") : "", isle = /^(đảo|hòn|cù lao|quần đảo)\s/i.test(nm);
      var topic = I.mode || (isle && I.intent === "diden" ? "thuy" : I.intent === "diden" ? "bay" : I.want[0] || (I.intent === "angi" ? "food" : I.intent === "odau" ? "stay" : I.intent === "mua" ? "season" : "unknown"));
      var how = A.howTo(topic, { itemName: nm }).concat(topic === "unknown" ? [] : A.howTo("unknown", {}));
      res = { kind: "fallback", html: A.fallback({ what: nm ? "mục \"" + nm + "\" trong dữ liệu app" : "câu trả lời cho câu hỏi này", how: how, asked: q }) };
    }
    var ent = res.ent || null;
    if (ent && ent.item) { var it = ent.item; ent = { prov: it.prov.id, itemKey: it.prov.id + "|" + it.kind + "|" + it.x.id }; }
    if (useCtx) A.ctx.push({ q: q, intent: I.intent, ent: ent });
    res.ent = ent; res.intent = I.intent; res.ms = Date.now() - t0;
    return res;
  };
  /* Engine mới (ai/ai-loader.js) chỉ trả lời khi engine cũ không có câu trả lời (fallback) và engine mới tự tin.
     Hỏi engine mới trước làm sai câu theo khu/đảo (Phú Quốc, Quy Nhơn, Cát Bà, Kỳ Co trả về dữ liệu cả tỉnh):
     CI 23/11/2026, tests/trinh-duyet.mjs "23 câu trợ lý trong báo cáo 1.014". */
  A.ask = function (q, opt) {
    var t0 = Date.now(), r = askCu(q, opt);
    if (r && r.kind === "fallback" && window.__btaiNew) {
      try {
        var nr = window.__btaiNew.ask(String(q == null ? "" : q).trim());
        if (nr && nr.confidence >= 0.9 && nr.score >= 0.3) {
          var nres = newAnswer(nr, q, t0);
          if (nres) {
            if (!(opt && opt.noCtx)) A.ctx.push({ q: q, intent: nr.intent, ent: nres.ent });
            return nres;
          }
        }
      } catch (e) {}
    }
    return r;
  };
  window.askBuiTrip = function (q, opt) { return A.ask(q, opt); };
  /* nút trong câu trả lời */
  window.btAskChip = function (t) {
    if (typeof document !== "undefined" && document.getElementById("tlLog") && typeof tlAsk === "function") return tlAsk(t);
    if (typeof askChip === "function") return askChip(t);
  };
  if (typeof window.goProvSeg !== "function") window.goProvSeg = function (id, seg) { openProvDetail(id); if (seg && seg !== "tongquan") setTimeout(function () { setProvSeg(seg); }, 0); };
})(BTAI);
/* dựng sẵn chỉ mục khi trang rảnh, để câu hỏi đầu tiên cũng dưới 100 ms */
if (typeof window.addEventListener === "function") window.addEventListener("load", function () { setTimeout(function () { try { BTAI.index(); } catch (e) {} }, 300); });
