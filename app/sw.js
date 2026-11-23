/* BuiTrip: chạy được khi mất sóng.
   - Trang, JS, CSS, dữ liệu: lấy mạng trước (luôn bản mới khi có sóng), mất sóng thì dùng bản đã lưu.
   - Ảnh, thư viện bản đồ, phông chữ: lấy bản đã lưu trước, cập nhật nền.
   - Không lưu /api/ (trợ lý AI) và dịch vụ đăng nhập. */
var VER = "bt-v5";
var CORE = ["/", "/index.html", "/css/style.css", "/manifest.webmanifest",
  "/data/prov-data.gon.js", "/data/sap-nhap.js", "/data/racehub-places.js", "/data/lam-giau.js", "/data/bo-sung.js", "/data/anh.js",
  "/js/bao-loi.js", "/js/lam-sach.js", "/js/visual.js", "/js/app.js", "/js/tim-kiem.js", "/js/home.js", "/js/theme.js",
  "/js/explore-extras.js", "/js/faq.js", "/js/dong-gop.js", "/js/tro-ly.js", "/img/icon/icon-192.png"];
self.addEventListener("install", function (e) {
  e.waitUntil(caches.open(VER).then(function (c) { return c.addAll(CORE); }).then(function () { return self.skipWaiting(); }));
});
self.addEventListener("activate", function (e) {
  e.waitUntil(caches.keys().then(function (ks) {
    return Promise.all(ks.filter(function (k) { return k !== VER; }).map(function (k) { return caches.delete(k); }));
  }).then(function () { return self.clients.claim(); }));
});
function put(req, res) {
  if (res && (res.ok || res.type === "opaque")) { var cp = res.clone(); caches.open(VER).then(function (c) { c.put(req, cp); }); }
  return res;
}
self.addEventListener("fetch", function (e) {
  var req = e.request;
  if (req.method !== "GET") return;
  var u = new URL(req.url);
  var same = u.origin === self.location.origin;
  if (same && (u.pathname.indexOf("/api/") === 0 || u.pathname.indexOf("/_vercel/") === 0)) return;
  var assetHost = /(^|\.)unpkg\.com$|fonts\.(googleapis|gstatic)\.com$/.test(u.hostname);
  if (!same && !assetHost) return;
  var isImg = req.destination === "image" || /\.(webp|png|jpe?g|svg)$/.test(u.pathname);
  if (assetHost || isImg || (same && u.pathname.indexOf("/vendor/") === 0)) {
    e.respondWith(caches.match(req).then(function (hit) {
      var net = fetch(req).then(function (r) { return put(req, r); }).catch(function () { return hit; });
      return hit || net;
    }));
    return;
  }
  e.respondWith(fetch(req).then(function (r) { return put(req, r); }).catch(function () {
    return caches.match(req, { ignoreSearch: req.mode === "navigate" }).then(function (hit) {
      return hit || (req.mode === "navigate" ? caches.match("/index.html") : Response.error());
    });
  }));
});
