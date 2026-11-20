/* Hình minh họa kiểu poster du lịch cho 34 tỉnh — vẽ bằng SVG, không cần ảnh.
   Mục đích: mỗi tỉnh có hình riêng thay vì dùng chung ảnh Đà Lạt; nhẹ (vài KB),
   không vướng bản quyền ảnh. Khi có ảnh thật có bản quyền, đặt vào PROV_PHOTO.
   Nạp TRƯỚC app.js (app.js gọi provPoster khi render thẻ tỉnh). */
(function(){
  var uid=0;
  /* Bảng màu: trời trên, trời dưới, lớp xa, lớp giữa, lớp gần, điểm nhấn, mặt trời */
  var PAL={
    dawn:   ["#ff9a6b","#ffd9b0","#8fb9b4","#5b9a96","#2f6e6c","#e2553d","#fff3d9"],
    jade:   ["#5fb7c9","#d6f1ea","#86b9a5","#4d8f77","#25614d","#f2a03d","#fff8e0"],
    mist:   ["#7c86c8","#e9d9f0","#a9a6d0","#6f73a8","#3c4378","#f0b5c8","#fff4ea"],
    lantern:["#1d1747","#5a2a6e","#3a2d5c","#2a2147","#1a1430","#ffb02e","#ffe6a8"],
    royal:  ["#3d2b6b","#e79a62","#8a5a7a","#5d3a62","#341f40","#f5c04a","#ffe2a1"],
    pine:   ["#7fc8e8","#e8f6f1","#9cc9b1","#4f9a74","#1f5f45","#ffd166","#fffbe8"],
    delta:  ["#ff8a5c","#ffd38a","#e3a76a","#4f8f5d","#2e6b43","#d94f2b","#fff0c9"],
    sea:    ["#38b6e8","#c8f0ff","#79c6d6","#1f9cc0","#0b6b8f","#ff8f3c","#fffbe0"],
    sunset: ["#ff6f61","#ffc98b","#d98a8a","#9b5a72","#5a3355","#ffd34e","#fff1c4"],
    city:   ["#283a7a","#f38d6b","#5b5f9a","#3b3f75","#20244b","#ffcf5c","#ffe6b0"],
    forest: ["#6ec6a6","#e6f7e4","#8fbf8a","#4f8f52","#285c34","#f6b042","#fffbe5"],
    amber:  ["#e8814d","#fbd7a1","#c79a6b","#8d6b4e","#55402f","#c9412f","#fff0cf"],
    teaPal: ["#9ad3f0","#f1fbef","#a8d59a","#5aa35b","#2f7a3c","#ff8c42","#fffbe5"],
    falls:  ["#4fb3a9","#dff5ee","#7fae9a","#3f7d68","#22503f","#ffffff","#fffbe5"],
    crimson:["#b8343c","#f7b787","#a65a5a","#7a3b45","#4a2330","#f6c344","#ffe9b8"]
  };
  function rnd(seed){ var s=seed||1; return function(){ s=(s*9301+49297)%233280; return s/233280; }; }
  function ridge(base,amp,n,seed,col,op){
    var r=rnd(seed), d="M0,260 L0,"+base;
    for(var i=1;i<=n;i++){ var x=400*i/n; var y=base-amp*(.35+r()*.65); d+=" L"+(x-200/n).toFixed(1)+","+y.toFixed(1)+" L"+x.toFixed(1)+","+(base-amp*.15*r()).toFixed(1); }
    return '<path d="'+d+' L400,260 Z" fill="'+col+'"'+(op?' opacity="'+op+'"':'')+'/>';
  }
  function hills(base,amp,col,phase){
    var p=phase||0;
    return '<path d="M0,260 L0,'+base+' C70,'+(base-amp+p)+' 130,'+(base-amp*.3)+' 200,'+(base-amp*.7-p)+' C270,'+(base-amp*1.1)+' 330,'+(base-amp*.2+p)+' 400,'+(base-amp*.6)+' L400,260 Z" fill="'+col+'"/>';
  }
  function karst(base,list,col,op){
    return list.map(function(t){ var x=t[0],w=t[1],h=t[2];
      return '<path d="M'+(x-w/2)+','+base+' C'+(x-w/2)+','+(base-h*.75)+' '+(x-w*.38)+','+(base-h)+' '+x+','+(base-h)+' C'+(x+w*.4)+','+(base-h)+' '+(x+w/2)+','+(base-h*.7)+' '+(x+w/2)+','+base+' Z" fill="'+col+'"'+(op?' opacity="'+op+'"':'')+'/>';
    }).join("");
  }
  function sun(x,y,r,col){ return '<circle cx="'+x+'" cy="'+y+'" r="'+(r*2.2)+'" fill="'+col+'" opacity=".22"/><circle cx="'+x+'" cy="'+y+'" r="'+(r*1.5)+'" fill="'+col+'" opacity=".35"/><circle cx="'+x+'" cy="'+y+'" r="'+r+'" fill="'+col+'"/>'; }
  function cloud(x,y,s,op){ return '<g opacity="'+(op||.85)+'" fill="#fff"><ellipse cx="'+x+'" cy="'+y+'" rx="'+(26*s)+'" ry="'+(9*s)+'"/><ellipse cx="'+(x-12*s)+'" cy="'+(y-6*s)+'" rx="'+(13*s)+'" ry="'+(10*s)+'"/><ellipse cx="'+(x+8*s)+'" cy="'+(y-9*s)+'" rx="'+(15*s)+'" ry="'+(12*s)+'"/></g>'; }
  function water(y,c1,c2,id){
    return '<defs><linearGradient id="w'+id+'" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="'+c1+'"/><stop offset="1" stop-color="'+c2+'"/></linearGradient></defs><rect x="0" y="'+y+'" width="400" height="'+(260-y)+'" fill="url(#w'+id+')"/>'+
      '<g stroke="#fff" stroke-linecap="round" opacity=".45"><path d="M40,'+(y+18)+' h38"/><path d="M150,'+(y+34)+' h54"/><path d="M290,'+(y+22)+' h40"/><path d="M90,'+(y+56)+' h30"/><path d="M240,'+(y+64)+' h46"/></g>';
  }
  function junk(x,y,s,col){
    return '<g transform="translate('+x+','+y+') scale('+s+')"><path d="M-30,0 L30,0 L22,10 L-24,10 Z" fill="#4a2a1a"/><path d="M-14,-2 L-14,-40 Q-2,-30 -4,-2 Z" fill="'+col+'"/><path d="M2,-2 L2,-50 Q18,-36 14,-2 Z" fill="'+col+'"/><path d="M18,-2 L18,-30 Q28,-20 26,-2 Z" fill="'+col+'" opacity=".9"/></g>';
  }
  function sampan(x,y,s,col){
    return '<g transform="translate('+x+','+y+') scale('+s+')"><path d="M-34,0 Q0,12 34,0 Q20,8 0,9 Q-20,8 -34,0 Z" fill="#3b2416"/><path d="M-6,-1 L-6,-12 L6,-12 L6,-1 Z" fill="'+col+'"/><path d="M-12,-12 L0,-20 L12,-12 Z" fill="#f3d27a"/></g>';
  }
  function pines(list,col){
    return list.map(function(t){ var x=t[0],y=t[1],h=t[2];
      return '<path d="M'+x+','+(y-h)+' L'+(x-h*.28)+','+(y-h*.45)+' L'+(x-h*.14)+','+(y-h*.45)+' L'+(x-h*.36)+','+y+' L'+(x+h*.36)+','+y+' L'+(x+h*.14)+','+(y-h*.45)+' L'+(x+h*.28)+','+(y-h*.45)+' Z" fill="'+col+'"/>';
    }).join("");
  }
  function palm(x,y,s,col){
    return '<g transform="translate('+x+','+y+') scale('+s+')" fill="none" stroke="'+col+'" stroke-linecap="round"><path d="M0,0 C4,-30 10,-60 22,-86" stroke-width="5"/><g stroke-width="4"><path d="M22,-86 C6,-96 -12,-92 -22,-80"/><path d="M22,-86 C36,-100 54,-98 64,-88"/><path d="M22,-86 C14,-104 18,-118 30,-124"/><path d="M22,-86 C40,-84 52,-72 56,-58"/><path d="M22,-86 C4,-80 -6,-66 -8,-54"/></g></g>';
  }
  function houses(base,P){
    var out="", xs=[[0,62,58],[60,58,72],[116,66,60],[180,60,76],[238,64,62],[300,58,70],[356,60,60]];
    var walls=["#f2c14e","#e8a33d","#f4d06f","#e9b44c","#f2c14e","#e39b3a","#f4d06f"];
    xs.forEach(function(h,i){ var x=h[0],w=h[1],t=h[2];
      out+='<rect x="'+x+'" y="'+(base-t)+'" width="'+w+'" height="'+t+'" fill="'+walls[i]+'"/>';
      out+='<path d="M'+(x-6)+','+(base-t+4)+' L'+(x+w/2)+','+(base-t-20)+' L'+(x+w+6)+','+(base-t+4)+' Z" fill="#6b2f1f"/>';
      out+='<rect x="'+(x+w/2-8)+'" y="'+(base-24)+'" width="16" height="24" fill="#5a3a22"/><rect x="'+(x+8)+'" y="'+(base-t+16)+'" width="12" height="12" fill="#7a4b2a"/><rect x="'+(x+w-20)+'" y="'+(base-t+16)+'" width="12" height="12" fill="#7a4b2a"/>';
    });
    var lc=[P[5],"#ff5a3c","#ffd34e","#ff7a2e","#ff4f6d"];
    out+='<path d="M0,96 Q100,120 200,98 T400,100" stroke="#2a1a14" stroke-width="1.4" fill="none"/>';
    for(var i=0;i<9;i++){ var x=20+i*45, y=i%2?112:106; out+='<circle cx="'+x+'" cy="'+(y+8)+'" r="16" fill="'+lc[i%5]+'" opacity=".28"/><ellipse cx="'+x+'" cy="'+(y+8)+'" rx="8" ry="10" fill="'+lc[i%5]+'"/><rect x="'+(x-3)+'" y="'+(y-3)+'" width="6" height="3" fill="#2a1a14"/>'; }
    return out;
  }
  function gate(P){
    var w="#7d3b2c", roof=P[5], s="";
    s+='<rect x="70" y="150" width="260" height="70" fill="'+w+'"/><rect x="70" y="150" width="260" height="8" fill="#5a281d"/>';
    [120,200,280].forEach(function(x,i){ var aw=i===1?34:24; s+='<path d="M'+(x-aw/2)+',220 L'+(x-aw/2)+','+(186-(i===1?8:0))+' Q'+x+','+(170-(i===1?10:0))+' '+(x+aw/2)+','+(186-(i===1?8:0))+' L'+(x+aw/2)+',220 Z" fill="#2a120c"/>'; });
    s+='<rect x="120" y="118" width="160" height="32" fill="#a5523a"/><path d="M96,124 Q120,112 140,110 L260,110 Q280,112 304,124 Q290,118 280,120 L120,120 Q110,118 96,124 Z" fill="'+roof+'"/>';
    s+='<rect x="150" y="92" width="100" height="20" fill="#a5523a"/><path d="M128,98 Q150,84 168,82 L232,82 Q250,84 272,98 Q260,92 250,94 L150,94 Q140,92 128,98 Z" fill="'+roof+'"/>';
    s+='<rect x="196" y="40" width="3" height="44" fill="#3a1f14"/><path d="M199,42 L230,50 L199,58 Z" fill="#e2412f"/>';
    return s;
  }
  function falls(P){
    var s='<path d="M0,260 L0,70 L60,60 L110,80 L150,70 L150,260 Z" fill="'+P[3]+'"/><path d="M400,260 L400,64 L330,58 L290,84 L250,72 L250,260 Z" fill="'+P[3]+'"/>';
    s+='<path d="M150,70 Q200,64 250,72 L250,200 L150,200 Z" fill="#e9f7f6"/>';
    for(var i=0;i<9;i++){ var x=156+i*11; s+='<path d="M'+x+',74 L'+(x+2)+',198" stroke="#bfe3e0" stroke-width="2"/>'; }
    s+='<path d="M0,260 L0,140 L50,130 L90,150 L120,146 L120,260 Z" fill="'+P[4]+'"/><path d="M400,260 L400,136 L350,132 L300,150 L280,150 L280,260 Z" fill="'+P[4]+'"/>';
    s+='<ellipse cx="200" cy="204" rx="90" ry="16" fill="#fff" opacity=".8"/><ellipse cx="200" cy="212" rx="120" ry="12" fill="#fff" opacity=".5"/>';
    return s;
  }
  function skyline(base,P){
    var r=rnd(7), s="", x=0;
    while(x<400){ var w=22+r()*28, h=40+r()*80; s+='<rect x="'+x.toFixed(1)+'" y="'+(base-h).toFixed(1)+'" width="'+w.toFixed(1)+'" height="'+h.toFixed(1)+'" fill="'+P[3]+'"/>';
      for(var wy=base-h+8; wy<base-8; wy+=12){ for(var wx=x+5; wx<x+w-6; wx+=9){ if(r()>.45) s+='<rect x="'+wx.toFixed(1)+'" y="'+wy.toFixed(1)+'" width="4" height="5" fill="'+P[5]+'" opacity=".85"/>'; } }
      x+=w+2; }
    s+='<path d="M232,'+base+' L240,40 L246,32 L252,40 L262,'+base+' Z" fill="'+P[4]+'"/><path d="M244,58 h12" stroke="'+P[5]+'" stroke-width="3"/>';
    return s;
  }
  function teaRows(base,P){
    var s=hills(base,40,P[3],4);
    for(var i=0;i<7;i++){ var y=base+8+i*12; s+='<path d="M0,'+(y+10)+' C90,'+(y-14)+' 180,'+(y+8)+' 260,'+(y-6)+' S360,'+(y+6)+' 400,'+(y-4)+'" stroke="'+P[4]+'" stroke-width="5" fill="none" opacity=".75"/>'; }
    return s;
  }
  function scene(kind,palName){
    var P=PAL[palName]||PAL.jade, id="v"+(++uid), b="";
    b+='<defs><linearGradient id="s'+id+'" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="'+P[0]+'"/><stop offset="1" stop-color="'+P[1]+'"/></linearGradient></defs><rect width="400" height="260" fill="url(#s'+id+')"/>';
    if(kind==="bay"){
      b+=sun(300,70,22,P[6])+cloud(90,52,1)+karst(170,[[40,60,90],[110,50,120],[200,70,70],[330,56,110],[380,40,60]],P[2],.8)+water(170,P[3],P[4],id)+karst(176,[[70,44,70],[250,60,96],[360,40,54]],P[4])+junk(310,222,1,P[0]);
    } else if(kind==="river"){
      b+=sun(110,64,18,P[6])+karst(160,[[30,60,110],[120,70,90],[220,50,130],[310,80,100],[390,50,80]],P[2],.75)+karst(170,[[70,56,70],[170,40,60],[280,60,84],[360,50,56]],P[3])+water(170,P[3],P[4],id)+sampan(150,214,1.3,P[5])+sampan(300,196,.8,P[5]);
    } else if(kind==="mountain"){
      b+=sun(310,58,16,P[6])+ridge(120,70,6,3,P[2],.7)+cloud(80,110,1.3,.9)+cloud(300,124,1.6,.8)+ridge(170,80,5,9,P[3])+cloud(200,168,2,.75)+ridge(225,70,4,15,P[4]);
      for(var i=0;i<5;i++) b+='<path d="M0,'+(232+i*7)+' C120,'+(214+i*7)+' 260,'+(244+i*7)+' 400,'+(222+i*7)+'" stroke="'+P[5]+'" stroke-width="2" fill="none" opacity=".35"/>';
    } else if(kind==="oldtown"){
      b+=sun(330,40,12,P[6])+houses(200,P)+water(200,P[2],P[4],id)+sampan(120,236,1,P[5])+'<g opacity=".5">'+[60,170,260,350].map(function(x){return '<ellipse cx="'+x+'" cy="'+(214+(x%3)*6)+'" rx="8" ry="3" fill="#ffb02e"/>';}).join("")+'</g>';
    } else if(kind==="heritage"){
      b+=sun(300,80,26,P[6])+cloud(80,60,1.1,.6)+hills(205,30,P[3])+gate(P)+'<rect x="0" y="218" width="400" height="42" fill="'+P[4]+'"/><path d="M0,226 H400" stroke="'+P[6]+'" stroke-width="2" opacity=".35"/>';
    } else if(kind==="highland"){
      b+=sun(90,60,18,P[6])+cloud(280,50,1.2)+hills(150,50,P[2])+hills(185,40,P[3],10)+water(205,"#8fd3e8","#4aa3c4",id)+pines([[30,206,60],[56,210,44],[330,206,66],[360,210,48],[384,206,40],[300,208,38]],P[4]);
    } else if(kind==="beach"){
      b+=sun(110,70,24,P[6])+cloud(300,50,1.1)+karst(150,[[330,90,60],[380,60,40]],P[2],.8)+water(150,P[2],P[3],id)+'<path d="M0,260 L0,214 C100,200 220,206 400,190 L400,260 Z" fill="#f6e1b0"/><path d="M0,214 C100,200 220,206 400,190" stroke="#fff" stroke-width="3" fill="none" opacity=".8"/>'+palm(320,232,1.15,P[4])+palm(366,240,.85,P[4]);
    } else if(kind==="city"){
      b+=sun(90,86,20,P[6])+skyline(190,P)+water(190,P[3],P[4],id)+'<path d="M0,190 H400" stroke="'+P[5]+'" stroke-width="2" opacity=".6"/>';
    } else if(kind==="delta"){
      b+=sun(300,70,22,P[6])+hills(160,14,P[3])+palm(40,166,.9,P[4])+palm(90,170,.7,P[4])+palm(360,166,.85,P[4])+water(160,"#c98d5a","#8a5a3a",id);
      [[120,200,1],[230,214,1.2],[320,194,.9]].forEach(function(t){ b+=sampan(t[0],t[1],t[2],P[5])+'<g>'+[ -14,-6,2,10].map(function(dx,j){ return '<circle cx="'+(t[0]+dx*t[2])+'" cy="'+(t[1]-4*t[2])+'" r="'+(3.4*t[2])+'" fill="'+["#f6c344","#7cc35a","#e2553d","#ff9a2e"][j]+'"/>'; }).join("")+'</g>'; });
    } else if(kind==="tea"){
      b+=sun(310,56,18,P[6])+cloud(110,54,1)+hills(150,46,P[2])+teaRows(190,P);
    } else if(kind==="falls"){
      b+=sun(330,40,14,P[6])+falls(P)+water(212,"#7fc8c0","#3f8f86",id);
    } else if(kind==="peak"){
      b+=sun(90,60,18,P[6])+'<path d="M40,220 C120,180 170,60 210,48 C250,60 300,170 380,220 Z" fill="'+P[3]+'"/>'+cloud(260,120,1.4,.7)+hills(220,30,P[4]);
    }
    return '<svg class="poster-svg" viewBox="0 0 400 260" preserveAspectRatio="xMidYMid slice" role="img" aria-hidden="true">'+b+'</svg>';
  }
  /* Kiểu hình + bảng màu cho từng tỉnh (34) */
  var PROV_ART={
    "ha-noi":["heritage","crimson"],"hai-phong":["bay","jade"],"quang-ninh":["bay","dawn"],"bac-ninh":["heritage","amber"],
    "hung-yen":["river","forest"],"ninh-binh":["river","jade"],"lai-chau":["mountain","mist"],"dien-bien":["mountain","amber"],
    "son-la":["tea","teaPal"],"lao-cai":["mountain","mist"],"cao-bang":["falls","falls"],"lang-son":["river","forest"],
    "phu-tho":["heritage","forest"],"thai-nguyen":["tea","teaPal"],"tuyen-quang":["bay","forest"],"thanh-hoa":["beach","sea"],
    "nghe-an":["beach","sunset"],"ha-tinh":["beach","sea"],"quang-tri":["heritage","amber"],"hue":["heritage","royal"],
    "da-nang":["beach","sea"],"quang-ngai":["beach","sunset"],"gia-lai":["tea","forest"],"dak-lak":["falls","falls"],
    "khanh-hoa":["beach","sea"],"lam-dong":["highland","pine"],"dong-nai":["highland","forest"],"tay-ninh":["peak","sunset"],
    "tp-ho-chi-minh":["city","city"],"vinh-long":["delta","delta"],"dong-thap":["delta","sunset"],"an-giang":["delta","delta"],
    "ca-mau":["delta","forest"],"can-tho":["delta","delta"]
  };
  window.ART_SCENE=scene;
  window.provArt=function(provId){ return PROV_ART[provId]||["hills","jade"]; };
  /* Thẻ hình tỉnh: trả về khối HTML có SVG phủ kín khung, cao h px */
  /* Ảnh thật (PHOTOS trong data/anh.js) phủ lên tranh vẽ; ảnh lỗi thì tự gỡ, tranh vẽ hiện lại. */
  function escA(t){ return String(t||"").replace(/[&<>"']/g,function(c){ return {"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]; }); }
  window.photoImg=function(ph,opt){
    if(!ph||!ph.u) return "";
    opt=opt||{};
    var s=ph.u.replace("{w}","500"), l=ph.u.replace("{w}","960");
    return '<img class="ph" src="'+s+'" srcset="'+s+' 500w, '+l+' 960w" sizes="'+(opt.sizes||"(max-width:640px) 100vw, 640px")+'" alt="" loading="'+(opt.eager?"eager":"lazy")+'" decoding="async" onerror="var c=this.nextElementSibling;if(c&&c.classList.contains(\'ph-credit\'))c.remove();this.remove()">'+
      (opt.noCredit?"":'<span class="ph-credit">Ảnh: '+escA(ph.a)+' · '+escA(ph.l)+'</span>');
  };
  window.provPhoto=function(provId){ return (window.PHOTOS&&PHOTOS.prov&&PHOTOS.prov[provId])||null; };
  window.spotPhoto=function(placeId){ return (window.PHOTOS&&PHOTOS.spot&&PHOTOS.spot[placeId])||null; };
  window.provPoster=function(provId,h,extraCls){
    var a=window.provArt(provId), ph=window.provPhoto(provId);
    return '<div class="poster'+(extraCls?" "+extraCls:"")+'" style="height:'+(h||170)+'px">'+scene(a[0],a[1])+
      window.photoImg(ph,{noCredit:h&&h<100, sizes:h&&h<100?"120px":null})+'</div>';
  };
})();
