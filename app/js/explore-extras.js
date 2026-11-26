/* Bổ sung cho trang tỉnh và trang địa danh:
   1. Tỉnh cũ trong ngoặc (theo data/sap-nhap.js).
   2. "Đi từ trung tâm": km, phương tiện, thời gian ước tính, giá thuê xe của tỉnh, chỗ ở cùng khu, món nên thử.
   3. Sổ tem check-in 34 tỉnh: chỉ tính khi GPS ở gần địa danh (phải ở gần địa danh mới tính).
   Nạp SAU app.js; bọc các hàm render gốc thay vì sửa trong app.js. */
(function(){
  if(typeof PROV_DATA==="undefined") return;

  /* ---------- 1. Tỉnh cũ ---------- */
  function oldList(provId){ return (typeof SAP_NHAP!=="undefined" && SAP_NHAP[provId]) || []; }
  function isMerged(provId){ return oldList(provId).length>1; }
  window.provOldLabel=function(provId){
    var l=oldList(provId); return l.length>1 ? "gồm "+l.map(function(x){ return x+" cũ"; }).join(" + ") : "";
  };
  /* Tỉnh cũ của 1 địa danh: đọc từ địa chỉ "(tỉnh X cũ" / "X cũ"; không có thì là tỉnh giữ tên */
  function placeOldProv(p,provId){
    var l=oldList(provId); if(l.length<2) return "";
    if(p.old_prov && l.indexOf(p.old_prov)>=0) return p.old_prov;
    var a=(p.address||"")+" "+(p.note||"");
    for(var i=1;i<l.length;i++){ if(a.indexOf(l[i])>=0) return l[i]; }
    var m=a.match(/tỉnh\s+([^,()]+?)\s+cũ/); if(m) return m[1];
    /* Địa chỉ không ghi tỉnh cũ: Đà Nẵng cũ nằm phía bắc vĩ độ ~15,93, phía nam là Quảng Nam cũ (Mỹ Sơn, Hội An) */
    if(provId==="da-nang" && p.lat!=null && p.lat<15.93 && l.indexOf("Quảng Nam")>=0) return "Quảng Nam";
    return l[0];
  }
  window.placeOldProv=placeOldProv;
  /* Thay huy hiệu cũ "Điểm mở rộng — khu vực tỉnh cũ" bằng tên tỉnh cũ cụ thể */
  window.oldAreaBadge=function(p){
    var prov=null;
    PROV_DATA.forEach(function(pv){ if(!prov && pv.places.indexOf(p)>=0) prov=pv; });
    if(!prov || !isMerged(prov.id)) return "";
    var o=placeOldProv(p,prov.id);
    /* tên địa danh hoặc nhãn cụm đã ghi "X cũ" thì không thêm nhãn lặp */
    var seen=(p.name||"")+" "+(typeof clusterLabel==="function"?clusterLabel(p.cluster):"");
    if(seen.indexOf(o+" cũ")>=0) return "";
    return ' <span class="badge '+(o===oldList(prov.id)[0]?"badge-soon":"badge-free")+'">('+esc(o)+' cũ)</span>';
  };
  var _destCard=window.destCard;
  window.destCard=function(d){
    var h=_destCard(d), lab=provOldLabel(d.provId||d.id);
    return lab ? h.replace('</h3>',' <span class="old-prov">('+esc(lab)+')</span></h3>') : h;
  };
  var _renderProvDetail=window.renderProvDetail;
  window.renderProvDetail=function(){
    _renderProvDetail.apply(this,arguments);
    var p=currentProv; if(!p) return;
    var lab=provOldLabel(p.id), box=document.querySelector("#destDetailRoot .prov-hero-in h2, #destDetailRoot .hero .cap h2");
    if(lab && box && !box.querySelector(".old-prov")) box.insertAdjacentHTML("beforeend",' <span class="old-prov">('+esc(lab)+')</span>');
    var pane=document.querySelector("#destDetailRoot .prov-hero-in, #destDetailRoot .hero .cap");
    if(pane && !pane.querySelector(".stamp-mini")){
      var n=stampsInProv(p.id).length;
      pane.insertAdjacentHTML("beforeend",'<button class="stamp-mini" onclick="openStampBook()">'+stampIcon(16)+(n?(" Đã check-in "+n+" điểm ở đây"):" Sổ tem: chưa check-in ở tỉnh này")+'</button>');
    }
  };

  /* ---------- 2. Đi từ trung tâm ---------- */
  function provOf(id){ return provById(id); }
  function suggestMode(km){
    if(km==null) return {mode:"Hỏi đường tại chỗ",why:"Chưa có khoảng cách trong dữ liệu."};
    if(km<=2) return {mode:"Đi bộ",why:"Gần, đi bộ khoảng "+Math.max(5,Math.round(km*13))+" phút."};
    if(km<=15) return {mode:"Taxi / xe công nghệ, hoặc xe máy thuê",why:"Khoảng "+Math.max(5,Math.round(km/25*60))+" phút trong phố."};
    if(km<=70) return {mode:"Xe máy thuê hoặc ô tô có tài xế",why:"Khoảng "+fmtDur(km/40)+" đường ngoài phố."};
    return {mode:"Xe khách / ô tô có tài xế, nên ngủ lại gần đó",why:"Khoảng "+fmtDur(km/50)+". Xa trung tâm, đi về trong ngày rất mệt."};
  }
  function fmtDur(h){ var m=Math.round(h*60/5)*5; if(m<60) return m+" phút"; var hh=Math.floor(m/60), mm=m%60; return hh+" giờ"+(mm?" "+mm+" phút":""); }
  function localOptions(prov){
    return (prov.local||[]).filter(function(l){ return /xe máy|ô tô|taxi|grab|xe điện|xe buýt|xe đạp/i.test(l.mode||""); }).slice(0,3);
  }
  function guideHtml(prov,x){
    var km=(x.dist==null||x.dist==="")?null:parseFloat(String(x.dist).replace(",",".")); if(isNaN(km)) km=null;
    var sg=suggestMode(km);
    var old=placeOldProv(x,prov.id);
    var stays=prov.stays.filter(function(s){ return s.area===x.cluster; });
    var sameArea=stays.length>0;
    if(!sameArea) stays=prov.stays.filter(function(s){ return s.area==="trung-tam"; });
    stays=stays.slice(0,3);
    var near=prov.places.filter(function(o){ return o!==x && o.cluster===x.cluster; }).slice(0,4);
    var dishes=prov.dishes.slice(0,3);
    var opts=localOptions(prov);
    var h='<section class="guide"><h3 class="guide-h">Đi từ '+esc(x.dist_from||prov.anchor||prov.name)+'</h3>'+
      (x.island?'<p class="guide-note"><b>Điểm trên đảo:</b> ra '+esc(x.island)+' bằng máy bay hoặc tàu cao tốc, không đi đường bộ được. Km dưới đây tính trên đảo, từ '+esc(x.island)+'.</p>':'')+
      /* Ẩn dòng khoảng cách tự tham chiếu (km = 0) khi đang xem chính điểm trung tâm */
      (km===0?'':'<div class="guide-row"><div class="guide-km"><b>'+(km==null?"—":"~"+km)+'</b><span>km</span></div><div><b>'+esc(sg.mode)+'</b><p>'+esc(sg.why)+'</p></div></div>')+
      (old&&!x.island?'<p class="guide-note">Thuộc khu vực '+esc(old)+' cũ'+(isMerged(prov.id)&&old!==oldList(prov.id)[0]?'. Nếu đi riêng khu này, nên lấy sân bay/bến xe phía '+esc(old)+' làm điểm xuất phát (đang bổ sung dữ liệu).':'.')+'</p>':'')+
      (opts.length?'<div class="guide-opts">'+opts.map(function(o){ return '<div><span>'+esc(o.mode)+'</span><b>'+esc(priceShort(o.price)||o.price||"")+'</b></div>'; }).join("")+'</div>':'')+
      (near.length?'<h4>Gần đó, đi cùng buổi</h4><div class="guide-chips">'+near.map(function(o){ return '<button class="chip" onclick="openProvPlace(\''+prov.id+'\',\''+o.id+'\')">'+esc(o.name.split(" (")[0])+'</button>'; }).join("")+'</div>':'')+
      (stays.length?'<h4>'+(sameArea?'Chỗ ở cùng khu':'Chỗ ở ở trung tâm')+'</h4><div class="guide-list">'+stays.map(function(s){ return '<button onclick="openProvStay(\''+prov.id+'\',\''+s.id+'\')"><span>'+esc(s.name.split(" (")[0])+'</span><b>'+esc(priceShort(s.price)||"")+'</b></button>'; }).join("")+'</div>':'')+
      (dishes.length?'<h4>Món nên thử ở '+esc(prov.id==="lam-dong"?"Đà Lạt":prov.name)+'</h4><div class="guide-list">'+dishes.map(function(d){ return '<button onclick="openProvDish(\''+prov.id+'\',\''+d.id+'\')"><span>'+esc(d.name)+'</span><b>'+esc(priceShort(d.price)||"")+'</b></button>'; }).join("")+'</div>':'')+
      '<p class="small" style="margin:10px 0 0">Km tính từ trung tâm du lịch gần nhất. Thời gian và phương tiện là ước tính theo cự ly; giá thuê xe theo cẩm nang tỉnh.</p></section>';
    return h;
  }

  /* ---------- 3. Sổ tem check-in ---------- */
  var KEY="buitrip_stamps";
  function load(){ try{ return JSON.parse(localStorage.getItem(KEY)||"{}")||{}; }catch(e){ return {}; } }
  function save(s){ try{ localStorage.setItem(KEY,JSON.stringify(s)); }catch(e){} }
  function stampsInProv(pid){ var s=load(); return Object.keys(s).filter(function(k){ return k.indexOf(pid+"|")===0; }); }
  window.stampsInProv=stampsInProv;
  function stampIcon(sz){ return '<svg width="'+sz+'" height="'+sz+'" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="10" r="6"/><path d="m9.5 10 1.8 1.8L15 8"/><path d="M8 15.5 6.5 22 12 19l5.5 3-1.5-6.5"/></svg>'; }
  window.stampIcon=stampIcon;
  function hav(a,b,c,d){ var R=6371,r=Math.PI/180,x=Math.sin((c-a)*r/2),y=Math.sin((d-b)*r/2); var h=x*x+Math.cos(a*r)*Math.cos(c*r)*y*y; return 2*R*Math.asin(Math.sqrt(h)); }
  function checkinBtn(prov,x){
    var k=prov.id+"|"+x.id, s=load()[k];
    if(s) return '<div class="stamp-done">'+stampIcon(22)+'<div><b>Đã có tem</b><span>Check-in '+new Date(s.t).toLocaleDateString("vi-VN")+'</span></div><button class="btn btn-ghost" onclick="openStampBook()">Sổ tem</button></div>';
    if(x.lat==null) return '<p class="small">Điểm này chưa có tọa độ nên chưa check-in được. Tem tỉnh tính khi check-in ở bất kỳ địa danh nào khác của tỉnh. Biết vị trí chính xác, bạn bấm Gửi đóng góp để gửi cho đội BuiTrip.</p>';
    return '<button class="btn btn-primary btn-block stamp-btn" onclick="doCheckin(\''+prov.id+'\',\''+x.id+'\',this)">'+stampIcon(20)+' Check-in lấy tem</button><p class="notebox small" id="stampMsg" role="status" hidden style="margin:8px 0 0"></p><p class="small" style="margin:6px 0 0">Cần bật vị trí; chỉ tính khi bạn đang ở cách điểm này dưới '+(x.approx?'2 km (tọa độ điểm này là ước tính nên nới rộng)':'1 km')+'.</p>';
  }
  /* Báo lỗi ngay dưới nút (không chỉ toast thoáng qua) */
  function say(m){ toast(m); var b=document.getElementById("stampMsg"); if(b){ b.textContent=m; b.hidden=false; } }
  window.doCheckin=function(pid,xid,btn){
    var prov=provOf(pid), x=null; if(!prov) return; prov.places.forEach(function(p){ if(p.id===xid) x=p; }); if(!x) return;
    if(!navigator.geolocation){ toast("Máy không hỗ trợ định vị"); return; }
    if(btn){ btn.disabled=true; btn.textContent="Đang lấy vị trí…"; }
    navigator.geolocation.getCurrentPosition(function(pos){
      var d=hav(pos.coords.latitude,pos.coords.longitude,x.lat,x.lng), lim=x.approx?2:1;
      if(d<=lim){ var s=load(); s[pid+"|"+xid]={t:Date.now(),prov:pid,d:Math.round(d*1000)}; save(s); toast("Đã lấy tem "+x.name.split(" (")[0]); refreshCheckin(prov,x); }
      else { var acc=pos.coords.accuracy?Math.round(pos.coords.accuracy):0;
        say("Bạn đang cách điểm này khoảng "+(d<10?d.toFixed(1).replace(".",","):Math.round(d))+" km, cần dưới "+lim+" km mới lấy được tem."+(acc>500?" GPS đang sai số khoảng "+(acc>=1000?(acc/1000).toFixed(1).replace(".",",")+" km":acc+" m")+", ra chỗ thoáng đợi GPS ổn định rồi thử lại.":" Đến gần hơn rồi bấm lại.")); if(btn){ btn.disabled=false; btn.innerHTML=stampIcon(20)+" Check-in lấy tem"; } }
    },function(err){
      var c=err&&err.code, m=c===1?"Trình duyệt đang chặn quyền vị trí. Bấm biểu tượng ổ khóa cạnh địa chỉ trang → Vị trí → Cho phép, rồi bấm Check-in lại."
        :c===3?"Lấy vị trí quá lâu (GPS yếu). Ra chỗ thoáng, bật Vị trí chính xác trong cài đặt máy, đợi 10–20 giây rồi bấm lại."
        :"Máy chưa bắt được GPS. Bật Vị trí (GPS) trong cài đặt máy, ra chỗ thoáng rồi bấm lại.";
      say(m); if(btn){ btn.disabled=false; btn.innerHTML=stampIcon(20)+" Check-in lấy tem"; } },{enableHighAccuracy:true,timeout:20000,maximumAge:0});
  };
  function refreshCheckin(prov,x){ var b=document.getElementById("stampBox"); if(b) b.innerHTML=checkinBtn(prov,x); }
  window.openStampBook=function(){
    var s=load(), keys=Object.keys(s);
    var byProv={}; keys.forEach(function(k){ var pid=k.split("|")[0]; (byProv[pid]=byProv[pid]||[]).push(k); });
    var nProv=Object.keys(byProv).length;
    var grid=PROV_DATA.map(function(p){
      var n=(byProv[p.id]||[]).length;
      return '<button class="stamp-tile'+(n?" on":"")+'" onclick="openProvDetail(\''+p.id+'\')">'+provPoster(p.id,64)+'<span class="st-name">'+esc(p.id==="lam-dong"?"Lâm Đồng":p.name)+'</span><span class="st-n">'+(n?n+" tem":"chưa có")+'</span></button>';
    }).join("");
    var list=keys.sort(function(a,b){ return s[b].t-s[a].t; }).map(function(k){
      var pr=k.split("|"), prov=provOf(pr[0]), x=null; if(prov) prov.places.forEach(function(p){ if(p.id===pr[1]) x=p; });
      return x?'<button class="rowcard" onclick="openProvPlace(\''+prov.id+'\',\''+x.id+'\')"><div class="rc-body"><h3>'+esc(x.name)+'</h3><p class="muted">'+esc(prov.name)+' · '+new Date(s[k].t).toLocaleDateString("vi-VN")+'</p></div></button>':"";
    }).join("");
    document.getElementById("stampRoot").innerHTML=
      '<div class="stamp-head">'+stampIcon(28)+'<div><b>'+nProv+' / '+PROV_DATA.length+' tỉnh thành</b><span>'+keys.length+' tem check-in · phải đứng gần điểm mới tính</span></div></div>'+
      '<div class="progress" style="margin:12px 0 4px"><i style="width:'+Math.round(nProv/PROV_DATA.length*100)+'%"></i></div>'+
      '<div class="notebox" style="margin:12px 0"><b>Cách tính tem</b><br/><span class="small">Mở một địa danh khi đang ở đó và bấm Check-in lấy tem. App so vị trí GPS với tọa độ điểm: dưới 1 km là được tem; điểm có tọa độ ước tính được nới tới 2 km vì tọa độ có thể lệch. Tỉnh được tính khi có ít nhất 1 tem ở bất kỳ địa danh nào của tỉnh đó. Điểm chưa có tọa độ thì chưa lấy tem được.</span></div>'+
      '<div class="notebox" style="margin:12px 0"><b>Tem chỉ nằm trong trình duyệt này</b><br/><span class="small">Xóa dữ liệu trình duyệt, dùng tab ẩn danh hoặc đổi máy là mất tem. Tải file sao lưu (gồm tem, chuyến và mục đã lưu) rồi nhập lại ở máy mới.</span><div style="display:flex;gap:8px;flex-wrap:wrap;margin-top:10px"><button class="btn btn-ghost" onclick="exportTrips()">Tải file sao lưu</button><button class="btn btn-ghost" onclick="document.getElementById(\'importStampFile\').click()">Nhập từ file</button><input type="file" id="importStampFile" accept=".json,application/json" style="display:none" onchange="importTrips(this)"/></div></div>'+
      '<h2 class="sec-title">34 tỉnh thành</h2><div class="stamp-grid">'+grid+'</div>'+
      '<h2 class="sec-title">Tem đã lấy</h2>'+(list?'<div class="listcol">'+list+'</div>':'<div class="empty"><p class="muted" style="margin:0">Chưa có tem nào. Mở một địa danh khi đang ở đó và bấm "Check-in lấy tem".</p></div>');
    show("stamps");
  };
  if(typeof TITLES!=="undefined") TITLES["stamps"]=["Sổ tem","Check-in đúng nơi để lấy tem 34 tỉnh thành"];

  /* Bọc trang địa danh: chèn "Đi từ trung tâm" sau ô thông tin + nút check-in */
  var _openProvPlace=window.openProvPlace;
  window.openProvPlace=function(pid,xid){
    _openProvPlace.apply(this,arguments);
    var prov=provOf(pid), x=null; if(!prov) return; prov.places.forEach(function(p){ if(p.id===xid) x=p; }); if(!x) return;
    var root=document.getElementById("itemDetail"), kv=root&&root.querySelector(".kv");
    if(!kv || root.querySelector(".guide")) return;
    kv.insertAdjacentHTML("afterend",'<div id="stampBox" class="stamp-box">'+checkinBtn(prov,x)+'</div>'+infoHtml(x)+storyHtml(x)+guideHtml(prov,x)+REF_NOTE);
  };
  /* Thông tin thực tế (Muse bổ sung, có nguồn) */
  var INFO_LBL=[["loai","Loại"],["xep_hang","Xếp hạng"],["cach_di","Cách đi"],["mua_dep","Mùa đẹp"],["gio_dep","Giờ đẹp"],["phi_gui_xe","Gửi xe"],
    ["_hop","Phù hợp"],["trang_phuc","Trang phục"],["dat_truoc_giay_phep","Đặt trước, giấy phép"],
    ["le_hoi","Lễ hội"],["canh_bao_an_toan","Lưu ý an toàn"],["wc_an_uong_tai_cho","Vệ sinh, ăn uống tại chỗ"]];
  function host(u){ try{ return new URL(u).hostname.replace(/^www\./,""); }catch(e){ return "nguồn"; } }
  function infoHtml(x){
    if(!x.enriched) return "";
    var inf=Object.assign({},x.info||{}), hop=[["hop_tre_em","trẻ em"],["hop_nguoi_gia","người lớn tuổi"],["xe_lan","xe lăn"]].filter(function(h){ return inf[h[0]]; }).map(function(h){ return h[1]+": "+inf[h[0]]; });
    if(hop.length) inf._hop=hop.join(" · ");
    var rows=INFO_LBL.filter(function(r){ return inf[r[0]]!=null && inf[r[0]]!==""; }).map(function(r){
      return '<div class="info-row'+(r[0]==="canh_bao_an_toan"?" warn":"")+'"><dt>'+r[1]+'</dt><dd>'+esc(String(inf[r[0]]))+'</dd></div>'; }).join("");
    var src=(x.sources||[]).map(function(s){ return '<a href="'+esc(s.url)+'" target="_blank" rel="noopener nofollow">'+esc(host(s.url))+'</a>'; }).join(" · ");
    if(!rows && !src) return "";
    return '<section class="info-box"><h3 class="guide-h">Thông tin thực tế</h3>'+(rows?'<dl>'+rows+'</dl>':'')+
      (src?'<p class="small src-line">Nguồn'+(x.checked?' (xem '+esc(x.checked.split("-").reverse().join("/"))+')':'')+': '+src+'</p>':'')+'</section>';
  }
  /* Câu chuyện + món gần đó (từ Hộ chiếu khám phá RaceHub) */
  function storyHtml(x){
    var cul=x.from_racehub?"":(x.rh_note||"");
    var his=x.history||"";
    if(/^theo một số tư liệu chưa chính thống,\s*/i.test(his)) his=his.replace(/^theo một số tư liệu chưa chính thống,\s*/i,"").replace(/^./,function(c){return c.toUpperCase();});
    if(!his && !x.food_near && !cul) return "";
    return '<section class="story"><h3 class="guide-h">Câu chuyện nơi này</h3>'+
      (his?'<p>'+esc(his)+'</p>':'')+(cul?'<p>'+esc(cul)+'</p>':'')+
      (x.food_near?'<div class="story-food"><b>Món nên thử gần đó: '+esc(x.food_near.name)+'</b>'+(x.food_near.desc?'<span>'+esc(x.food_near.desc)+'</span>':'')+'</div>':'')+
      (x.from_racehub&&x.runner_note?'<p class="small">Đi bộ, chạy bộ: '+esc(x.runner_note)+'</p>':'')+
      '</section>';
  }
  /* Ghi chú chung: thông tin tham khảo */
  var REF_NOTE='<p class="ref-note">Thông tin tham khảo, có thể lệch so với thực tế (giá, giờ mở cửa, khoảng cách). Kiểm lại trước khi đi; thấy sai thì bấm Gửi đóng góp.</p>';
  window.REF_NOTE=REF_NOTE;
  ["openProvStay","openProvDish"].forEach(function(fn){
    var f=window[fn]; if(typeof f!=="function") return;
    window[fn]=function(){ f.apply(this,arguments); var root=document.getElementById("itemDetail"); if(root && !root.querySelector(".ref-note")) root.insertAdjacentHTML("beforeend",REF_NOTE); };
  });
  /* Nhãn cụm cho địa danh nhập từ RaceHub */
  if(typeof RACEHUB_CLUSTERS!=="undefined" && typeof CLUSTER_OVERRIDES!=="undefined") Object.keys(RACEHUB_CLUSTERS).forEach(function(k){ if(!CLUSTER_OVERRIDES[k]) CLUSTER_OVERRIDES[k]=RACEHUB_CLUSTERS[k]; });

  /* Ô Sổ tem ở trang chủ và trang Tài khoản */
  function stampTeaser(){
    var s=load(), keys=Object.keys(s), np={}; keys.forEach(function(k){ np[k.split("|")[0]]=1; });
    return '<button class="stamp-teaser" onclick="openStampBook()">'+stampIcon(26)+'<span><b>Sổ tem 34 tỉnh</b><small>'+(keys.length?Object.keys(np).length+" tỉnh · "+keys.length+" tem đã lấy":"Đến đúng nơi, bấm check-in để lấy tem")+'</small></span><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><path d="m9 18 6-6-6-6"/></svg></button>';
  }
  function mountTeasers(){
    var a=document.getElementById("homeStampTeaser"); if(a) a.innerHTML=stampTeaser();
    var b=document.getElementById("acctStampTeaser"); if(b) b.innerHTML=stampTeaser();
  }
  var _show=window.show;
  window.show=function(v){ var r=_show.apply(this,arguments); if(v==="explore"||v==="account") mountTeasers(); return r; };
  mountTeasers();
  /* trang danh sách tỉnh đã render trước khi file này nạp: vẽ lại để có tên tỉnh cũ */
  if(typeof renderDestList==="function") renderDestList();
})();
