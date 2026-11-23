/* BuiTrip AI — bước 1: chuẩn hóa câu hỏi.
   Chạy được cả trong trình duyệt lẫn Node (tests/run.mjs): chỉ dùng biến toàn cục của tệp dữ liệu, không đụng DOM.
   Quy tắc bắt buộc: đổi đ→d TRƯỚC khi tách dấu NFD (NFD không tách được chữ đ). */
var BTAI = window.BTAI = window.BTAI || {};
(function (A) {
  A.fold = function (s) {
    return String(s == null ? "" : s).toLowerCase().replace(/đ/g, "d").normalize("NFD").replace(/[̀-ͯ]/g, "").replace(/[^a-z0-9]+/g, " ").trim();
  };
  /* giữ dấu, chỉ hạ chữ thường và bỏ ký tự lạ */
  A.low = function (s) { return String(s == null ? "" : s).toLowerCase().normalize("NFC").replace(/[^0-9a-zà-ỹđ]+/g, " ").trim(); };
  A.marked = function (s) { return /[à-ỹđ]/.test(String(s || "").toLowerCase().normalize("NFC")); };
  A.esc = function (s) { return String(s == null ? "" : s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#39;"); };
  /* f chứa cụm k trọn từ (cả hai đã fold) */
  A.has = function (f, k) { return !!k && (" " + f + " ").indexOf(" " + k + " ") >= 0; };

  /* Từ hỏi và từ chỉ ý định: bỏ đi để còn lại tên nơi/món người dùng hỏi */
  var QWORDS = ["gia ve vao cong", "co san bay", "san bay", "co ga tau", "ga tau", "gia ve", "ve vao cong", "ve vao", "bao nhieu tien", "het bao nhieu", "mat bao nhieu", "bao nhieu", "chi phi",
    "gio mo cua", "gio dong cua", "may gio", "mo cua", "dong cua", "thang may", "thang nao", "mua nao", "khi nao", "luc nao", "mua dep", "thoi diem",
    "dep nhat", "nguoi lon", "tre em", "tham quan", "nhu the nao", "the nao", "bang cach nao", "hien nay", "hien tai", "bang gi", "an gi", "o dau", "di dau", "choi gi", "co gi choi", "co gi",
    "lich trinh", "may ngay", "ngay dem", "khach san", "homestay", "duoc khong", "cho minh hoi", "cho hoi", "minh hoi", "mang gi", "mang theo", "mac gi",
    "can chuan bi", "chuan bi", "dac san", "quan an", "ngon", "re", "dat", "nen", "tot nhat", "o", "mat", "lau", "gio", "dep", "gia", "ve", "tien", "phi",
    "di", "toi", "den", "tu", "thi", "la", "co", "khong", "nhi", "vay", "a", "nhe", "may", "bao", "vao", "len", "xem", "choi", "cua", "oi", "cho", "minh",
    "em", "anh", "chi", "ban", "hoi", "sao", "the", "con", "gi", "nao", "dau", "va", "hay", "voi", "nhe", "ha", "ah", "ạ", "oke", "ok", "voi", "luon", "nhung", "bang",
    "o khu nao", "khu nao", "thuoc tinh nao", "thuoc tinh", "tinh nao", "sap nhap vao", "sap nhap", "mon gi", "la mon gi", "o dau ngon", "hoi chut", "an", "chut", "thuoc", "mon"];
  A.QSET = {}; QWORDS.forEach(function (w) { A.QSET[w] = 1; });
  /* Từ hỏi trùng vần tên riêng: "có"/"Kỳ Co", "hỏi"/"Hội An", "ở"/"Ô Quy Hồ". Gõ có dấu thì chỉ bỏ đúng dạng có dấu của từ hỏi. */
  var ACC = { co: ["có"], hoi: ["hỏi"], o: ["ở"], gio: ["giờ"], gia: ["giá"], dep: ["đẹp"], nen: ["nên"], may: ["mấy", "máy"], len: ["lên"], vao: ["vào"],
    cua: ["của", "cửa"], chi: ["chị"], ban: ["bạn"], a: ["à", "ạ", "a"], lau: ["lâu"], thi: ["thì"], la: ["là"], toi: ["tới", "tôi"], den: ["đến"], di: ["đi"],
    oi: ["ơi"], nhi: ["nhỉ"], vay: ["vậy"], nhe: ["nhé"], choi: ["chơi"], minh: ["mình"], tien: ["tiền"], phi: ["phí"], ve: ["vé", "về"], khong: ["không"],
    xem: ["xem"], cho: ["cho"], em: ["em"], anh: ["anh"], bao: ["bao"], con: ["còn"], the: ["thế"], sao: ["sao"], nao: ["nào"], dau: ["đâu"], gi: ["gì"],
    hay: ["hay"], va: ["và"], voi: ["với"], tu: ["từ"], mat: ["mất"], re: ["rẻ"], dat: ["đặt", "đắt"], ngon: ["ngon"], bang: ["bằng"], ha: ["hả"], an: ["ăn"], chut: ["chút"], thuoc: ["thuộc"], mon: ["món"] };
  A.ACC = ACC;
  /* Cụm 2–3 chữ có trong tên nơi/món (vd "ky co", "hoi an"): không bị bỏ như từ hỏi. Dựng khi nạp chỉ mục (thuc-the.js). */
  A.NAMEGRAM = {}; A.NAMEGRAM_L = {};
  /* Tên đầy đủ (từ 2 chữ) của địa danh, món: gõ trọn tên thì giữ cả cụm, kể cả chữ trùng từ hỏi ("Đền Hạ", "Chợ Lớn — Chùa Bà Thiên Hậu") */
  A.FULLNAME = {}; A.FULLNAME_L = {};
  A.rest = function (q) {
    var marked = A.marked(q);
    var raw = String(q || "").toLowerCase().normalize("NFC").replace(/[?!.,;:"'()]/g, " ").split(/\s+/).filter(function (w) { return A.fold(w); }), f = raw.map(A.fold), out = [], keep = {};
    for (var i = 0; i < f.length; i++) for (var k = Math.min(12, f.length - i); k >= 2; k--) {
      if (marked ? A.FULLNAME_L[raw.slice(i, i + k).join(" ")] : A.FULLNAME[f.slice(i, i + k).join(" ")]) { for (var j = i; j < i + k; j++) keep[j] = 1; break; }
    }
    var full = Object.assign({}, keep);
    for (i = 0; i < f.length; i++) for (var k = 3; k >= 2; k--) {
      if (i + k > f.length) continue;
      var g = f.slice(i, i + k), olap = false; for (j = i; j < i + k; j++) if (full[j]) olap = true; if (olap) continue;
      var allQ = g.every(function (w) { return A.QSET[w] && w !== "an"; });
      if (!allQ && !A.QSET[g.join(" ")] && (marked ? A.NAMEGRAM_L[raw.slice(i, i + k).join(" ")] : A.NAMEGRAM[g.join(" ")])) for (var j = i; j < i + k; j++) keep[j] = 1;
    }
    function okTok(j) { var a = ACC[f[j]]; return !keep[j] && (!marked || !a || a.indexOf(raw[j]) >= 0); }
    for (i = 0; i < raw.length;) {
      var hit = 0;
      for (k = Math.min(4, raw.length - i); k >= 1; k--) {
        if (A.QSET[f.slice(i, i + k).join(" ")]) { var ok = true; for (j = i; j < i + k; j++) if (!okTok(j)) ok = false; if (ok) { hit = k; break; } }
      }
      if (hit) { i += hit; continue; }
      out.push(raw[i]); i++;
    }
    return out.join(" ");
  };
  /* Node không có app.js: tự có provById (app.js nạp sau sẽ định nghĩa lại y hệt) */
  if (typeof window.provById !== "function") window.provById = function (id) {
    if (!id || typeof PROV_DATA === "undefined") return null;
    for (var i = 0; i < PROV_DATA.length; i++) if (PROV_DATA[i].id === id || PROV_DATA[i].appId === id) return PROV_DATA[i];
    return null;
  };
})(BTAI);
