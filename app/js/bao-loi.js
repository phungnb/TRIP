/* Tự gửi lỗi JavaScript về /api/loi để đội biết app hỏng ở đâu trên máy người dùng.
   Tối đa 5 lỗi mỗi lần mở trang, bỏ qua lỗi lặp lại và lỗi từ tiện ích trình duyệt. */
(function () {
  if (location.hostname === "localhost" || location.hostname === "127.0.0.1") return;
  var sent = 0, keys = {};
  function send(msg, src, line, col, stack) {
    msg = String(msg || "");
    if (!msg || sent >= 5) return;
    if (/extension:\/\/|ResizeObserver loop|Script error\.?$/i.test(msg + " " + (src || ""))) return;
    var k = msg + "|" + line; if (keys[k]) return; keys[k] = 1; sent++;
    var body = JSON.stringify({ msg: msg, src: src || "", line: line || 0, col: col || 0, stack: String(stack || "").slice(0, 2000), url: location.pathname + location.hash, ver: "web" });
    try {
      if (navigator.sendBeacon) navigator.sendBeacon("/api/loi", new Blob([body], { type: "application/json" }));
      else fetch("/api/loi", { method: "POST", headers: { "Content-Type": "application/json" }, body: body, keepalive: true });
    } catch (e) {}
  }
  window.addEventListener("error", function (e) {
    if (e && e.message) send(e.message, e.filename, e.lineno, e.colno, e.error && e.error.stack);
  });
  window.addEventListener("unhandledrejection", function (e) {
    var r = e && e.reason; send("Promise: " + (r && r.message || r), "", 0, 0, r && r.stack);
  });
})();

/* Sự kiện đo lường gửi về Vercel Web Analytics (không gửi chữ người dùng gõ, chỉ loại sự kiện và mã tỉnh).
   Sự kiện tùy chỉnh chỉ hiện trong Vercel khi gói tài khoản hỗ trợ; gói không hỗ trợ thì lệnh bị bỏ qua, không lỗi. */
window.va=window.va||function(){ (window.vaq=window.vaq||[]).push(arguments); };
/* Đồng thời ghi vào Neon qua /api/sukien (miễn phí, xem được ngay), gom lại gửi một lần mỗi 10 giây hoặc khi rời trang. */
(function(){
  var q=[], ss="";
  try{ ss=sessionStorage.getItem("bt_ss")||""; if(!ss){ ss=Math.random().toString(36).slice(2,12)+Date.now().toString(36); sessionStorage.setItem("bt_ss",ss); } }catch(e){ ss=Math.random().toString(36).slice(2,12); }
  var local=location.hostname==="localhost"||location.hostname==="127.0.0.1";
  function flush(){
    if(!q.length||local) { q=[]; return; }
    var body=JSON.stringify({ss:ss,ev:q.splice(0,20)});
    try{
      if(navigator.sendBeacon) navigator.sendBeacon("/api/sukien",new Blob([body],{type:"application/json"}));
      else fetch("/api/sukien",{method:"POST",headers:{"Content-Type":"application/json"},body:body,keepalive:true});
    }catch(e){}
  }
  setInterval(flush,10000);
  addEventListener("pagehide",flush);
  document.addEventListener("visibilitychange",function(){ if(document.visibilityState==="hidden") flush(); });
  window.btTrack=function(name,data){
    data=data||{};
    try{ window.va("event",{name:name,data:data}); }catch(e){}
    try{ q.push({n:name,tinh:data.tinh||null,loai:data.loai||null,ngay:data.ngay==null?null:data.ngay}); if(q.length>=20) flush(); }catch(e){}
  };
})();
