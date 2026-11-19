/* Nút chuyển nền tối / sáng (bảng màu tối theo RaceHub). Lựa chọn lưu trên máy. */
(function(){
  var btn=document.getElementById("themeBtn"); if(!btn) return;
  var meta=document.querySelector('meta[name="theme-color"]');
  function cur(){ return document.documentElement.getAttribute("data-theme")==="dark"?"dark":"light"; }
  function apply(t){
    document.documentElement.setAttribute("data-theme",t);
    if(meta) meta.setAttribute("content",t==="dark"?"#0a0d12":"#0f5c33");
    btn.setAttribute("aria-pressed",t==="dark"?"true":"false");
  }
  apply(cur());
  btn.addEventListener("click",function(){
    var t=cur()==="dark"?"light":"dark"; apply(t);
    try{ localStorage.setItem("buitrip_theme",t); }catch(e){}
    if(typeof toast==="function") toast(t==="dark"?"Đã bật nền tối":"Đã bật nền sáng");
  });
})();
