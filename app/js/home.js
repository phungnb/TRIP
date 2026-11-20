/* Trang chủ (tab Khám phá) cho cả 34 tỉnh: slide động điểm nổi tiếng, điểm khám phá
   theo sở thích, "tháng này đi đâu", đi theo miền, món ngon khắp miền.
   Nạp SAU app.js: dùng provById, openProvDetail, openProvPlace, openProvDish, show,
   esc, priceShort, regionLabel. Hình minh họa từ visual.js. */
(function(){
  /* Điểm nổi tiếng — chỉ những nơi ĐÃ có trong dữ liệu (place id kiểm khi render) */
  var SPOTS=[
    {prov:"quang-ninh",place:"vinh-ha-long",title:"Vịnh Hạ Long",tag:"Hàng nghìn đảo đá vôi giữa vịnh xanh, Di sản thiên nhiên thế giới",themes:["bien","disan"],art:["bay","dawn"],slide:1},
    {prov:"lao-cai",place:"fansipan",title:"Sa Pa · Fansipan",tag:"Nóc nhà Đông Dương 3.143 m, săn mây và ruộng bậc thang",themes:["nui"],art:["mountain","mist"],slide:1},
    {prov:"da-nang",place:"pho-co-hoi-an",title:"Phố cổ Hội An",tag:"Phố đèn lồng bên sông Hoài, Di sản văn hóa thế giới",themes:["disan"],art:["oldtown","lantern"],slide:1},
    {prov:"ninh-binh",place:"trang-an",title:"Tràng An · Ninh Bình",tag:"Đi thuyền xuyên hang giữa núi đá vôi và ruộng lúa",themes:["songnuoc","disan"],art:["river","jade"],slide:1},
    {prov:"hue",place:"dai-noi-hue",title:"Đại Nội Huế",tag:"Kinh thành triều Nguyễn bên dòng sông Hương",themes:["disan"],art:["heritage","royal"],slide:1},
    {prov:"lam-dong",place:"ho-xuan-huong",title:"Đà Lạt",tag:"Thành phố cao nguyên: rừng thông, hồ và sương sớm",themes:["nui"],art:["highland","pine"],slide:1},
    {prov:"gia-lai",place:"eo-gio",title:"Eo Gió · Quy Nhơn",tag:"Vách đá ôm biển xanh, đường đi bộ ven biển",themes:["bien"],art:["beach","sunset"],slide:1},
    {prov:"can-tho",place:"cho-noi-cai-rang",title:"Chợ nổi Cái Răng",tag:"Chợ họp trên sông từ tinh mơ, đặc sản miền Tây",themes:["songnuoc"],art:["delta","delta"],slide:1},
    {prov:"cao-bang",place:"thac-ban-gioc",title:"Thác Bản Giốc",tag:"Thác nước lớn vùng biên giới, đẹp nhất mùa nước",themes:["nui"],art:["falls","falls"]},
    {prov:"hai-phong",place:"cat-ba",title:"Cát Bà – Lan Hạ",tag:"Đảo rừng và vịnh hoang sơ cạnh Hạ Long",themes:["bien"],art:["bay","jade"]},
    {prov:"quang-ngai",place:"dao-ly-son",title:"Đảo Lý Sơn",tag:"Đảo núi lửa, ruộng tỏi và biển trong",themes:["bien"],art:["beach","sea"]},
    {prov:"son-la",place:"doi-che-trai-tim",title:"Mộc Châu",tag:"Đồi chè, mùa hoa mận, hoa cải trên cao nguyên",themes:["nui"],art:["tea","teaPal"]},
    {prov:"ha-noi",place:"pho-co-ha-noi",title:"Phố cổ Hà Nội",tag:"36 phố phường, ăn vặt và đi bộ quanh Hồ Gươm",themes:["disan"],art:["heritage","crimson"]},
    {prov:"khanh-hoa",place:"bai-bien-tran-phu",title:"Biển Nha Trang",tag:"Bãi biển ngay trung tâm, đảo và lặn ngắm san hô",themes:["bien"],art:["beach","sea"]},
    {prov:"tay-ninh",place:"nui-ba-den",title:"Núi Bà Đen",tag:"Nóc nhà Nam Bộ, cáp treo lên đỉnh",themes:["nui"],art:["peak","sunset"]},
    {prov:"dong-thap",place:"lang-hoa-sa-dec",title:"Làng hoa Sa Đéc",tag:"Làng hoa kiểng ven sông, rực rỡ dịp Tết",themes:["songnuoc"],art:["delta","sunset"]},
    {prov:"ca-mau",place:"mui-ca-mau",title:"Mũi Cà Mau",tag:"Điểm cực Nam đất liền, rừng đước ra biển",themes:["songnuoc","bien"],art:["delta","forest"]},
    {prov:"tp-ho-chi-minh",place:"dinh-doc-lap",title:"Sài Gòn",tag:"Thành phố không ngủ: di tích, ẩm thực đêm",themes:["disan"],art:["city","city"]}
  ];
  var THEMES=[["all","Tất cả"],["bien","Biển đảo"],["nui","Núi & săn mây"],["disan","Di sản & phố cổ"],["songnuoc","Sông nước"]];
  var DISH_PICK=[["ha-noi","pho-bo-ha-noi"],["hue","bun-bo-hue"],["da-nang","mi-quang"],["hai-phong","banh-da-cua"],["lam-dong","banh-can"],["khanh-hoa","nem-nuong-ninh-hoa"],["tp-ho-chi-minh","com-tam-suon-bi-cha"],["can-tho","lau-mam-can-tho"]];
  var DISH_COL=["#e86a17","#c0392b","#d4a017","#177a45","#7a4bd1","#1f9cc0","#d9480f","#2f7a3c"];

  function findPlace(s){ var p=provById(s.prov); if(!p) return null; for(var i=0;i<p.places.length;i++) if(p.places[i].id===s.place) return p.places[i]; return null; }
  function spotOpen(i){ var s=SPOTS[i]; if(findPlace(s)) openProvPlace(s.prov,s.place); else openProvDetail(s.prov); }
  window.homeSpotOpen=spotOpen;
  function art(a,h,ph){ return '<div class="poster" style="height:'+h+'px">'+ART_SCENE(a[0],a[1])+photoImg(ph,{sizes:"(max-width:640px) 80vw, 320px"})+'</div>'; }
  function provShort(id){ var p=provById(id); return p?(id==="lam-dong"?"Lâm Đồng":p.name):""; }

  /* ---------- Slide động ---------- */
  function slidesHtml(){
    var list=SPOTS.filter(function(s){ return s.slide && provById(s.prov); });
    var slides=list.map(function(s){
      var i=SPOTS.indexOf(s), p=provById(s.prov);
      return '<div class="hs-slide" role="group" aria-roledescription="slide" aria-label="'+esc(s.title)+'">'+ART_SCENE(s.art[0],s.art[1])+photoImg(spotPhoto(s.place),{eager:list.indexOf(s)===0, sizes:"(max-width:960px) 100vw, 960px"})+
        '<div class="hs-veil"></div><div class="hs-cap"><span class="hs-kicker">'+esc(provShort(s.prov))+' · '+esc(regionLabel(p.region))+'</span>'+
        '<h2>'+esc(s.title)+'</h2><p>'+esc(s.tag)+'</p>'+
        '<button class="hs-cta" onclick="homeSpotOpen('+i+')">Khám phá ngay <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14M13 6l6 6-6 6"/></svg></button></div></div>';
    }).join("");
    var dots=list.map(function(s,k){ return '<button class="hs-dot'+(k===0?" on":"")+'" aria-label="Slide '+(k+1)+'" data-k="'+k+'"></button>'; }).join("");
    return '<div class="hs-track" id="hsTrack">'+slides+'</div><div class="hs-dots" id="hsDots">'+dots+'</div>';
  }
  var hsTimer=null, hsPaused=false, hsIdx=0;
  function hsCount(){ var t=document.getElementById("hsTrack"); return t?t.children.length:0; }
  function hsGo(k,smooth){
    var t=document.getElementById("hsTrack"); if(!t) return;
    var n=hsCount(); hsIdx=(k+n)%n;
    t.scrollTo({left:hsIdx*t.clientWidth,behavior:smooth===false?"auto":"smooth"});
    hsMarkDot();
  }
  function hsMarkDot(){ document.querySelectorAll("#hsDots .hs-dot").forEach(function(d,k){ d.classList.toggle("on",k===hsIdx); }); }
  function hsStart(){
    hsStop();
    if(window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    hsTimer=setInterval(function(){
      var v=document.getElementById("view-explore");
      if(hsPaused||document.hidden||!v||!v.classList.contains("active")||v.classList.contains("searching")) return;
      hsGo(hsIdx+1);
    },5000);
  }
  function hsStop(){ if(hsTimer){ clearInterval(hsTimer); hsTimer=null; } }
  function hsBind(){
    var t=document.getElementById("hsTrack"); if(!t) return;
    var st=null;
    t.addEventListener("scroll",function(){ clearTimeout(st); st=setTimeout(function(){ var k=Math.round(t.scrollLeft/Math.max(1,t.clientWidth)); if(k!==hsIdx){ hsIdx=k; hsMarkDot(); } },80); },{passive:true});
    var pause=function(){ hsPaused=true; clearTimeout(t._rs); t._rs=setTimeout(function(){ hsPaused=false; },8000); };
    t.addEventListener("touchstart",pause,{passive:true}); t.addEventListener("pointerdown",pause);
    document.querySelectorAll("#hsDots .hs-dot").forEach(function(d){ d.addEventListener("click",function(){ pause(); hsGo(+d.getAttribute("data-k")); }); });
    window.addEventListener("resize",function(){ hsGo(hsIdx,false); });
    hsStart();
  }

  /* ---------- Điểm khám phá theo sở thích ---------- */
  var theme="all";
  function spotCard(s){
    /* Không hiện giá ở thẻ: giá nhiều thành phần (vé, tàu, cáp) rút gọn dễ hiểu sai; xem ở trang chi tiết */
    var i=SPOTS.indexOf(s);
    return '<button class="spot" onclick="homeSpotOpen('+i+')">'+art(s.art,210,spotPhoto(s.place))+'<div class="spot-veil"></div><div class="spot-cap"><span class="spot-prov">'+esc(provShort(s.prov))+'</span><h3>'+esc(s.title)+'</h3><p>'+esc(s.tag)+'</p><span class="spot-price">Xem giá, giờ mở cửa</span></div></button>';
  }
  function renderSpots(){
    var box=document.getElementById("homeSpots"); if(!box) return;
    box.innerHTML=SPOTS.filter(function(s){ return provById(s.prov) && (theme==="all"||s.themes.indexOf(theme)>=0); }).map(spotCard).join("");
    box.scrollLeft=0;
    document.querySelectorAll("#homeThemes .chip").forEach(function(c){ c.classList.toggle("on",c.getAttribute("data-t")===theme); });
  }
  window.homeTheme=function(t){ theme=t; renderSpots(); };

  /* ---------- Tháng này đi đâu: đọc khoảng tháng trong "mùa đẹp" của từng tỉnh ---------- */
  function goodInMonth(txt,m){
    var t=String(txt||"").toLowerCase(), cut=t.search(/tránh/); if(cut>=0) t=t.slice(0,cut);
    var re=/tháng\s*(\d{1,2})(?:\s*[–-]\s*(?:tháng\s*)?(\d{1,2}))?(\s*âm lịch)?/g, r;
    while((r=re.exec(t))){
      if(r[3]) continue;
      var a=+r[1], b=r[2]?+r[2]:a; if(a<1||a>12||b<1||b>12) continue;
      if(a<=b ? (m>=a&&m<=b) : (m>=a||m<=b)) return "Tháng "+a+(b!==a?"–"+b:"");
    }
    return "";
  }
  window.goodInMonth=goodInMonth;
  function renderSeason(){
    var box=document.getElementById("homeSeason"), h=document.getElementById("homeSeasonTitle"); if(!box) return;
    var m=new Date().getMonth()+1;
    if(h) h.textContent="Tháng "+m+" đi đâu đẹp?";
    var list=(typeof PROV_DATA!=="undefined"?PROV_DATA:[]).filter(function(p){ return goodInMonth(p.best_season,m); });
    var total=list.length;
    /* Ưu tiên tỉnh có điểm nổi tiếng trong SPOTS, rồi lấy tối đa 10 */
    var hot={}; SPOTS.forEach(function(s,k){ if(hot[s.prov]==null) hot[s.prov]=k; });
    list.sort(function(a,b){ return (hot[a.id]!=null?hot[a.id]:99)-(hot[b.id]!=null?hot[b.id]:99); });
    list=list.slice(0,10);
    var sub=document.getElementById("homeSeasonSub"); if(sub) sub.textContent=total+" tỉnh/thành có mùa đẹp rơi vào tháng "+m+" (theo cẩm nang từng tỉnh).";
    box.innerHTML=list.map(function(p){
      var a=provArt(p.id);
      return '<button class="season" onclick="openProvDetail(\''+p.id+'\')">'+art(a,110,provPhoto(p.id))+'<div class="season-body"><h3>'+esc(p.id==="lam-dong"?"Đà Lạt · Lâm Đồng":p.name)+'</h3><p>Mùa đẹp: '+esc(goodInMonth(p.best_season,m))+'</p></div></button>';
    }).join("") || '<p class="muted">Chưa có tỉnh nào ghi mùa đẹp trùng tháng này.</p>';
  }

  /* ---------- Đi theo miền ---------- */
  function renderRegions(){
    var box=document.getElementById("homeRegions"); if(!box) return;
    var P=typeof PROV_DATA!=="undefined"?PROV_DATA:[];
    box.innerHTML=[["bac","lao-cai","Núi cao, ruộng bậc thang, vịnh đá vôi"],["trung","hue","Cố đô, phố cổ, biển dài và cao nguyên"],["nam","can-tho","Sông nước, chợ nổi, miệt vườn, phố thị"]].map(function(r){
      var n=P.filter(function(p){ return p.region===r[0]; }).length;
      return '<button class="region" onclick="homeRegion(\''+r[0]+'\')">'+art(provArt(r[1]),120,provPhoto(r[1]))+'<div class="region-veil"></div><div class="region-cap"><h3>'+regionLabel(r[0])+'</h3><p>'+n+' tỉnh/thành · '+esc(r[2])+'</p></div></button>';
    }).join("");
  }
  window.homeRegion=function(r){
    navStack=[]; show("destinations",false);
    document.querySelectorAll("#regionChips .chip").forEach(function(c){ c.classList.toggle("on",c.getAttribute("data-region")===r); });
    regionFilter=r; renderDestList();
  };

  /* ---------- Món ngon khắp miền ---------- */
  function renderDishes(){
    var box=document.getElementById("homeDishes"); if(!box) return;
    box.innerHTML=DISH_PICK.map(function(x,k){
      var p=provById(x[0]); if(!p) return "";
      var d=null; p.dishes.forEach(function(y){ if(y.id===x[1]) d=y; }); if(!d) d=p.dishes[0]; if(!d) return "";
      return '<button class="dish" onclick="openProvDish(\''+p.id+'\',\''+d.id+'\')"><span class="dish-ic" style="background:'+DISH_COL[k%DISH_COL.length]+'"><svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 11h18a9 9 0 0 1-18 0Z"/><path d="M8 7c0-1 1-1 1-2M12 7c0-1 1-1 1-2M16 7c0-1 1-1 1-2"/></svg></span><b>'+esc(d.name)+'</b><span class="dish-prov">'+esc(provShort(p.id))+'</span><span class="dish-price">'+esc(priceShort(d.price))+'</span></button>';
    }).join("");
  }

  function renderStats(){
    var box=document.getElementById("homeStats"); if(!box||typeof PROV_DATA==="undefined") return;
    var pl=0,st=0,di=0; PROV_DATA.forEach(function(p){ pl+=p.places.length; st+=p.stays.length; di+=p.dishes.length; });
    var f=function(n){ return String(n).replace(/\B(?=(\d{3})+(?!\d))/g,"."); };
    box.innerHTML='<div><b>'+PROV_DATA.length+'</b><span>tỉnh thành</span></div><div><b>'+f(pl)+'</b><span>địa danh</span></div><div><b>'+f(st)+'</b><span>chỗ ở</span></div><div><b>'+f(di)+'</b><span>món ăn</span></div>';
  }

  /* Khi đang gõ tìm: ẩn phần gợi ý, chỉ còn kết quả */
  function bindSearchMode(){
    var inp=document.getElementById("searchInput"), v=document.getElementById("view-explore");
    if(!inp||!v) return;
    var upd=function(){
      var on=!!inp.value.trim(); v.classList.toggle("searching",on);
      if(!on){ var b=document.getElementById("searchResults"); if(b) b.innerHTML=""; }
    };
    inp.addEventListener("input",upd); inp.addEventListener("search",upd);
  }


  function renderHome(){
    var hs=document.getElementById("homeSlides"); if(hs){ hs.innerHTML=slidesHtml(); hsBind(); }
    var th=document.getElementById("homeThemes");
    if(th) th.innerHTML=THEMES.map(function(t){ return '<button class="chip'+(t[0]===theme?" on":"")+'" data-t="'+t[0]+'" onclick="homeTheme(\''+t[0]+'\')">'+t[1]+'</button>'; }).join("");
    renderStats(); renderSpots(); renderSeason(); renderRegions(); renderDishes(); bindSearchMode();
  }
  window.HOME_SPOTS=SPOTS;
  renderHome();
})();
