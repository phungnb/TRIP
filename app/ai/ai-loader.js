/* Trợ lý BuiTrip: nạp lười đoạn giới thiệu địa danh, thanh góp ý dưới câu trả lời, học trên máy.
   Không gọi máy chủ ngoài, không key. Gửi góp ý chỉ khi người dùng bấm gửi (/api/hotro). */
(function () {
  /* ---- Đoạn giới thiệu địa danh (ai/boi-canh.js, ~97 KB) và kho thêm: nạp lười khi trang rảnh ---- */
  /* ai/kho-them.js (~83 KB): quán, chỗ ở, điểm nhỏ trong kho học mà dữ liệu app chưa có */
  function nap(src, có) {
    if (có || !document || !document.createElement) return;
    var s = document.createElement("script"); s.src = src; s.async = true; document.head.appendChild(s);
  }
  function bootBoiCanh() {
    nap("ai/boi-canh.js", typeof BT_BOI_CANH !== "undefined");
    nap("ai/kho-them.js", typeof BT_KHO_THEM !== "undefined");
  }
  if (typeof window.addEventListener === "function")
    window.addEventListener("load", function () { setTimeout(bootBoiCanh, 1500); });

  /* ---- Góp ý dưới mọi câu trả lời của trợ lý, và học trên máy ----
     Đúng / Chưa đúng: ghi trong trình duyệt (localStorage "buitrip_ai_votes"), không gửi đi.
     Chưa đúng + ghi tên nơi đúng: trợ lý nhớ trên máy này, lần sau hỏi lại đúng câu đó thì trả theo nơi bạn sửa
       (localStorage "buitrip_ai_sua", tối đa 100 câu).
     Gửi góp ý: chỉ khi người dùng bấm nút gửi, qua /api/hotro như tin hỗ trợ (chính sách mục 5).
       Đội BuiTrip duyệt rồi đưa vào bản sau (tools/hoc/README.md). */
  function load(k, d) { try { return JSON.parse(localStorage.getItem(k) || d); } catch (e) { return JSON.parse(d); } }
  function save(k, v) { try { localStorage.setItem(k, JSON.stringify(v)); } catch (e) {} }
  function saveVote(v) { var l = load("buitrip_ai_votes", "[]"); l.push(v); save("buitrip_ai_votes", l.slice(-200)); }
  function escQ(s) { return String(s == null ? "" : s).replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "&lt;"); }
  function fold(s) { return typeof BTAI !== "undefined" && BTAI.fold ? BTAI.fold(s) : String(s || "").toLowerCase(); }
  /* Học trên máy theo CỤM TÊN, không chép nguyên câu: sửa "phố cổ ăn gì" thành Hội An thì nhớ "phố cổ" -> Hội An,
     nên "phố cổ có gì chơi", "phố cổ đi bằng gì" cũng hiểu là Hội An. Cụm dài khớp trước. Trả { cum, ten } hoặc null. */
  function cumOf(q) {
    var r = typeof BTAI !== "undefined" && BTAI.rest ? BTAI.rest(q) : q;
    r = fold(r).replace(/\s+/g, " ").trim();
    return r && r.length >= 2 && r.split(" ").length <= 5 ? r : fold(q);
  }
  window.btAiSua = function (q) {
    var m = load("buitrip_ai_sua", "{}"), f = " " + fold(q) + " ", best = null;
    Object.keys(m).forEach(function (k) { if (f.indexOf(" " + k + " ") >= 0 && (!best || k.length > best.cum.length)) best = { cum: k, ten: m[k] }; });
    return best;
  };
  window.btAiQuen = function (btn) {
    var k = btn.getAttribute("data-cum") || "", m = load("buitrip_ai_sua", "{}"); delete m[k]; save("buitrip_ai_sua", m);
    var p = btn.closest ? btn.closest("p") : null; if (p) p.textContent = "Đã quên sửa này trên máy này.";
  };
  window.btAiFbBar = function (q, r) {
    if (!r || !r.html || r.kind === "ainew") return "";
    return '<div class="bt-ai-fb small" style="margin-top:8px">Câu trả lời này đúng ý bạn không? ' +
      '<button class="btn btn-ghost" type="button" onclick="btAiGood(this)" data-q="' + escQ(q) + '">Đúng</button> ' +
      '<button class="btn btn-ghost" type="button" onclick="btAiBad(this)" data-q="' + escQ(q) + '" data-k="' + escQ((r.kind || "") + "/" + (r.intent || "")) + '">Chưa đúng</button></div>';
  };
  window.btAiGood = function (btn) {
    var box = btn && btn.closest ? btn.closest(".bt-ai-fb") : null;
    saveVote({ q: btn.getAttribute("data-q"), ok: true, t: Date.now() });
    if (box) box.innerHTML = '<span class="small">Cảm ơn bạn, mình đã ghi nhận.</span>';
  };
  window.btAiBad = function (btn) {
    var box = btn && btn.closest ? btn.closest(".bt-ai-fb") : null;
    if (!box) return;
    var q = btn.getAttribute("data-q") || "", k = btn.getAttribute("data-k") || "";
    saveVote({ q: q, ok: false, t: Date.now() });
    box.innerHTML = '<div class="bt-ai-fix"><label class="small">Bạn hỏi về nơi nào? <input class="bt-ai-ten" type="text" maxlength="80" placeholder="vd: Phố cổ Hội An"></label> ' +
      '<label class="small">Cần thông tin gì, sai ở đâu? <input class="bt-ai-ghi" type="text" maxlength="300" placeholder="vd: hỏi giờ mở cửa mà trả giá vé"></label> ' +
      '<button class="btn btn-primary" type="button" onclick="btAiFixSave(this,0)" data-q="' + escQ(q) + '" data-k="' + escQ(k) + '">Lưu trên máy này</button> ' +
      '<button class="btn btn-ghost" type="button" onclick="btAiFixSave(this,1)" data-q="' + escQ(q) + '" data-k="' + escQ(k) + '">Lưu và gửi cho BuiTrip</button>' +
      '<p class="small bt-ai-msg" style="margin:6px 0 0">Gửi đi gồm câu hỏi và ghi chú bạn gõ, để đội BuiTrip sửa trợ lý (xem Chính sách, mục 5).</p></div>';
  };
  window.btAiFixSave = function (btn, gui) {
    var box = btn.closest ? btn.closest(".bt-ai-fix") : null; if (!box) return;
    var ten = (box.querySelector(".bt-ai-ten") || {}).value || "", ghi = (box.querySelector(".bt-ai-ghi") || {}).value || "";
    ten = ten.trim(); ghi = ghi.trim();
    var q = btn.getAttribute("data-q") || "", k = btn.getAttribute("data-k") || "", msg = box.querySelector(".bt-ai-msg");
    if (!ten && !ghi) { if (msg) msg.textContent = "Bạn ghi tên nơi đúng hoặc chỗ sai giúp mình nhé."; return; }
    var hoc = "";
    /* chỉ học tên nơi app có trong dữ liệu */
    if (ten && typeof BTAI !== "undefined") {
      var it = BTAI.findItem ? BTAI.findItem(ten) : null, ar = BTAI.findArea(ten), pv = BTAI.findProv(ten);
      var okTen = ar ? ar.name : pv ? pv.prov.name : it && it.s >= 90 && !it.ambiguous ? it.best.x.name.split(" (")[0] : "";
      var cum = cumOf(q);
      if (okTen && cum !== fold(okTen)) { var m = load("buitrip_ai_sua", "{}"), ks = Object.keys(m); if (ks.length >= 100) delete m[ks[0]]; m[cum] = okTen; save("buitrip_ai_sua", m); hoc = okTen; }
    }
    saveVote({ q: q, ok: false, fix: ten, ghi: ghi, t: Date.now() });
    var done = function (t) { var b = btn.closest ? btn.closest(".bt-ai-fb") : null; if (b) b.innerHTML = '<span class="small">' + t + '</span>'; };
    var hocTxt = hoc ? "Đã nhớ trên máy này: từ nay gõ \"" + escQ(cumOf(q)) + "\" mình hiểu là " + hoc + ". " : (ten ? "App chưa có nơi \"" + escQ(ten) + "\" trong dữ liệu nên chưa học được. " : "");
    if (!gui) return done(hocTxt + "Cảm ơn bạn.");
    if (typeof fetch !== "function") return done(hocTxt + "Chưa gửi được.");
    fetch("/api/hotro", { method: "POST", headers: { "content-type": "application/json" },
      body: JSON.stringify({ msg: "[Trợ lý] Câu hỏi: " + q + " | Loại trả lời: " + k + " | Nơi đúng: " + ten + " | Ghi chú: " + ghi, page: "/#tro-ly" }) })
      .then(function (r) { done(hocTxt + (r.ok ? "Đã gửi cho đội BuiTrip, cảm ơn bạn." : "Chưa gửi được, thử lại sau.")); })
      .catch(function () { done(hocTxt + "Chưa gửi được, thử lại sau."); });
  };
})();
