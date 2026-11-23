/* BuiTrip AI — nhớ ngữ cảnh 3 lượt hỏi gần nhất trong phiên (sessionStorage; Node dùng bộ nhớ).
   Câu tiếp nối ("thế vé trẻ em thì sao", "còn chỗ ở", "đi từ đó mất bao lâu") dùng nơi vừa hỏi.
   Bấm "Hỏi lại từ đầu" hoặc đóng phiên thì xóa. */
(function (A) {
  var KEY = "bt_ai_ctx", mem = [];
  function load() { try { if (typeof sessionStorage !== "undefined") return JSON.parse(sessionStorage.getItem(KEY) || "[]"); } catch (e) {} return mem; }
  function save(v) { mem = v; try { if (typeof sessionStorage !== "undefined") sessionStorage.setItem(KEY, JSON.stringify(v)); } catch (e) {} }
  A.ctx = {
    get: function () { return load(); },
    last: function () { var c = load(); for (var i = c.length - 1; i >= 0; i--) if (c[i].ent) return c[i]; return null; },
    push: function (t) { var c = load(); c.push(t); save(c.slice(-3)); },
    reset: function () { save([]); }
  };
})(BTAI);
