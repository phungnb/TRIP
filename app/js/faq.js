/* Trang Câu hỏi thường gặp + ô "Hỏi nhanh".
   Bộ máy trả lời nằm ở ai/ (BuiTrip AI, chạy trên máy). Tệp này chỉ dựng giao diện:
   - askQuick(q): bọc askBuiTrip(q), giữ tên cũ cho tro-ly.js và các nút cũ.
   - renderFaq(): ô hỏi, hỏi nhanh theo tỉnh, và các nhóm FAQ (BT_FAQ trong ai/hoi-dap.js).
   Nạp SAU app.js và explore-extras.js; thay renderFaq của app.js. */
(function(){
  if(typeof PROV_DATA==="undefined"||typeof BTAI==="undefined") return;
  function nPlaces(){ var n=0; PROV_DATA.forEach(function(p){ n+=p.places.length; }); return n; }
  function nDishes(){ var n=0; PROV_DATA.forEach(function(p){ n+=p.dishes.length; }); return n; }
  var FAQ_VN=BT_FAQ; window.FAQ_VN=FAQ_VN;
  function fill(a){ return a.replace(/\{PLACE\}/g,nPlaces().toLocaleString("vi-VN")).replace(/\{DISH\}/g,nDishes().toLocaleString("vi-VN")); }
  function provLabel(p){ return p.id==="lam-dong"?"Lâm Đồng":p.name; }
  window.askQuick=function(q){ var r=window.askBuiTrip(q); return r?r.html+(window.btAiFbBar?btAiFbBar(q,r):""):""; };
  window.btFindProv=function(q){ return BTAI.findProv(q); };
  window.askRun=function(){
    var i=document.getElementById("askInput"), o=document.getElementById("askOut"); if(!i||!o) return;
    var v=i.value.trim(); if(!v){ i.focus(); return; }
    if(window.btTrack) btTrack("tim_kiem",{loai:"hoi_nhanh"});
    o.innerHTML='<div class="ask-ans">'+askQuick(v)+'</div>'; o.hidden=false;
  };
  window.askChip=function(t){ var i=document.getElementById("askInput"); if(i){ i.value=t; askRun(); } };

  function askBox(p){
    var ex=p?[provLabel(p)+" ăn gì?","Ở đâu ở "+provLabel(p)+"?","Đi "+provLabel(p)+" bằng gì?"]:["Quy Nhơn ăn gì?","Phú Quốc ở đâu?","Hà Giang mùa nào đẹp?","Đà Lạt 3 ngày hết bao nhiêu?"];
    return '<div class="ask-box"><label for="askInput" class="ask-lab">Hỏi nhanh</label>'+
      '<form class="ask-row" onsubmit="askRun();return false"><input id="askInput" type="search" enterkeyhint="search" autocomplete="off" placeholder="Ví dụ: Quy Nhơn ăn gì, Sa Pa tháng mấy đẹp"><button class="btn btn-primary" type="submit">Hỏi</button></form>'+
      '<div class="ask-chips">'+ex.map(function(t){ return '<button class="chip" type="button" onclick="askChip(\''+t.replace(/'/g,"\\'")+'\')">'+esc(t)+'</button>'; }).join("")+'</div>'+
      '<div id="askOut" hidden></div><p class="small" style="margin:8px 0 0">Hiểu cả tên tỉnh cũ và tên quen gọi.</p></div>';
  }
  function provFaq(p){
    var name=provLabel(p), qs=[
      ["Đi "+name+" bằng gì?","diden"],["Ăn gì ở "+name+"?","angi"],["Ở đâu ở "+name+", giá bao nhiêu?","odau"],
      ["Đi "+name+" mùa nào đẹp?","mua"],["Đi "+name+" 3 ngày 2 đêm hết bao nhiêu?","chiphi"],["Trời mưa ở "+name+" thì đi đâu?","mua_mua"],["Số khẩn cấp ở "+name+"?","khancap"]
    ];
    return '<h2 class="sec-title">Hỏi nhanh về '+esc(name)+'</h2>'+qs.map(function(x){
      return '<details class="faq-item faq-d"><summary>'+esc(x[0])+'</summary><div class="ask-ans">'+BTAI.answerProv({prov:p,old:""},{intent:x[1],want:[],q:x[0]})+'</div></details>';
    }).join("");
  }

  window.renderFaq=function(){
    var p=currentProv;
    var html='<h2 class="sec-title" style="margin-top:2px">Câu hỏi thường gặp</h2><p class="sec-sub">Cẩm nang tự túc 34 tỉnh thành. Câu trả lời viết từ dữ liệu đã kiểm, có ngày kiểm trong từng mục.</p>'+askBox(p);
    if(p) html+=provFaq(p);
    html+='<div class="faq-groups">'+FAQ_VN.map(function(g){
      return '<h2 class="sec-title">'+esc(g.g)+'</h2>'+g.items.map(function(it){ return '<details class="faq-item faq-d"><summary>'+esc(it.q)+'</summary><p>'+esc(fill(it.a))+'</p></details>'; }).join("");
    }).join("")+'</div>';
    html+='<div class="notebox" style="margin-top:4px">Hỗ trợ và báo thông tin sai: <a href="mailto:'+SUPPORT_EMAIL+'"><b>'+SUPPORT_EMAIL+'</b></a>.</div>';
    if(p) html+='<button class="btn btn-orange btn-block" style="margin-top:14px" onclick="openProvDetail(\''+p.id+'\')">Mở cẩm nang '+esc(provLabel(p))+'</button>';
    else html+='<button class="btn btn-orange btn-block" style="margin-top:14px" onclick="show(\'destinations\')">Xem 34 tỉnh thành</button>';
    document.getElementById("faqRoot").innerHTML=html;
  };
})();
