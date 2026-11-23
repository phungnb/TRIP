/* BuiTrip AI mới (học từ phản hồi) — nạp lười khi trang rảnh.
   Fetch ai/kb.json + ai/ai-model.json + ai/extra.json (~330 KB nén),
   rồi để ai/index.js hỏi engine mới trước (chỉ khi tự tin), không chắc
   thì trả về engine cũ. Lỗi mạng / lỗi parse -> im lặng, app chạy như cũ.
   Không gọi máy chủ ngoài, không key. */
(function () {
  var LOADED = false;
  function loadJSON(url) {
    return fetch(url).then(function (r) { if (!r.ok) throw new Error(url); return r.json(); });
  }
  function boot() {
    if (LOADED || typeof window.BuiTripAI === "undefined") return;
    LOADED = true;
    Promise.all([loadJSON("ai/kb.json"), loadJSON("ai/ai-model.json"), loadJSON("ai/extra.json")])
      .then(function (all) {
        try {
          window.__btaiNew = window.BuiTripAI.load(all[0], all[1], all[2]);
          /* tên mục -> tỉnh, để nút "Mở cẩm nang" trong câu trả lời mới */
          var byName = {};
          all[0].forEach(function (e) { if (e.ten && !byName[e.ten]) byName[e.ten] = e.tinh || ""; });
          window.__btaiProvOf = function (name) { return byName[name] || ""; };
        } catch (e) { window.__btaiNew = null; }
      })
      .catch(function () { window.__btaiNew = null; });
  }
  if (typeof window.addEventListener === "function")
    window.addEventListener("load", function () { setTimeout(boot, 500); });

  /* ---- Góp ý dưới câu trả lời của engine mới ---- */
  var INTENT_VN = [["gia_ve", "giá vé"], ["gio_mo_cua", "giờ mở cửa"], ["mua_dep", "mùa đẹp"],
    ["cach_di", "cách đi"], ["an", "món ăn"], ["o", "chỗ ở"], ["diem_choi", "điểm chơi"],
    ["lich_trinh", "lịch trình"], ["chi_phi", "chi phí"], ["mang_gi", "mang gì"],
    ["so_sanh", "so sánh"], ["tinh_cu", "tỉnh cũ"], ["vi_tri", "vị trí"], ["chung_chung", "chung chung"]];
  function saveVote(v) {
    try {
      var l = JSON.parse(localStorage.getItem("buitrip_ai_votes") || "[]");
      l.push(v); localStorage.setItem("buitrip_ai_votes", JSON.stringify(l.slice(-200)));
    } catch (e) {}
  }
  function escQ(s) { return String(s == null ? "" : s).replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "&lt;"); }
  window.btAiGood = function (btn) {
    var box = btn && btn.closest ? btn.closest(".bt-ai-fb") : null;
    saveVote({ q: btn.getAttribute("data-q"), ok: true, t: Date.now() });
    if (box) box.innerHTML = '<span class="small">Cảm ơn bạn, mình đã ghi nhận.</span>';
  };
  window.btAiBad = function (btn) {
    var box = btn && btn.closest ? btn.closest(".bt-ai-fb") : null;
    if (!box) return;
    var q = btn.getAttribute("data-q") || "";
    var intent = btn.getAttribute("data-intent") || "chung_chung";
    var opts = INTENT_VN.map(function (p) {
      return '<option value="' + p[0] + '"' + (p[0] === intent ? " selected" : "") + ">" + p[1] + "</option>";
    }).join("");
    box.innerHTML = '<div class="bt-ai-fix"><span class="small">Câu này sai ở đâu? </span>' +
      '<label class="small">Địa danh đúng là: <input id="btAiFixName" type="text" placeholder="vd: Phố cổ Hội An"></label> ' +
      '<label class="small">Ý hỏi là: <select id="btAiFixIntent">' + opts + "</select></label> " +
      '<button class="btn btn-primary" type="button" onclick="btAiFixSave(this)" data-q="' + escQ(q) + '">Lưu sửa</button> ' +
      '<span class="small" id="btAiFixMsg"></span></div>';
  };
  window.btAiFixSave = function (btn) {
    var nameEl = document.getElementById("btAiFixName");
    var intentEl = document.getElementById("btAiFixIntent");
    var msgEl = document.getElementById("btAiFixMsg");
    var name = nameEl ? nameEl.value.trim() : "";
    var intent = intentEl ? intentEl.value : "chung_chung";
    var q = btn.getAttribute("data-q") || "";
    if (!name) { if (msgEl) msgEl.textContent = "Bạn ghi tên địa danh đúng giúp mình nhé."; return; }
    try {
      if (window.__btaiNew) window.__btaiNew.feedback(q, intent, name);
      saveVote({ q: q, ok: false, fix: name, intent: intent, t: Date.now() });
    } catch (e) {}
    var box = btn.closest ? btn.closest(".bt-ai-fb") : null;
    if (box) box.innerHTML = '<span class="small">Đã ghi nhận sửa của bạn — lần sau hỏi lại câu này mình sẽ trả đúng hơn.</span>';
  };
})();
