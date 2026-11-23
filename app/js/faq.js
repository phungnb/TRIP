/* Câu hỏi thường gặp cho cả nước + ô "Hỏi nhanh".
   - FAQ_VN: hỏi đáp chung cho 34 tỉnh thành, nhóm theo chủ đề.
   - askQuick(q): trả lời ngay từ dữ liệu cẩm nang (PROV_DATA, SAP_NHAP), chạy trên máy, không cần máy chủ.
     Đây là bước 1 của trợ lý: hiểu tên tỉnh mới, tỉnh cũ, tên địa danh quen gọi và ý hỏi (ăn, ở, đi lại, mùa, chi phí...).
   Nạp SAU app.js và explore-extras.js; thay renderFaq của app.js. */
(function(){
  if(typeof PROV_DATA==="undefined") return;

  function nPlaces(){ var n=0; PROV_DATA.forEach(function(p){ n+=p.places.length; }); return n; }
  function nDishes(){ var n=0; PROV_DATA.forEach(function(p){ n+=p.dishes.length; }); return n; }

  var FAQ_VN=[
    {g:"Lên kế hoạch", items:[
      {q:"Cẩm nang này dùng thế nào?", a:"Gõ tên tỉnh, địa danh hoặc món ăn ở trang chủ, hoặc chọn từ danh sách 34 tỉnh thành. Mỗi tỉnh có các tab Đi đâu, Ở đâu, Ăn gì, Đi đến, Đi lại và Lịch trình. Muốn có lịch theo ngày và tổng chi phí thì bấm Lập kế hoạch."},
      {q:"Cả nước giờ còn 34 tỉnh, tìm theo tên tỉnh cũ được không?", a:"Từ 01/07/2025, theo Nghị quyết 202/2025/QH15, cả nước còn 34 tỉnh thành. App ghi tên tỉnh cũ trong ngoặc ở thẻ tỉnh và từng địa danh, ví dụ Gia Lai (gồm Gia Lai cũ + Bình Định cũ). Ô Hỏi nhanh ở đầu trang này hiểu cả tên tỉnh cũ như Quảng Bình, Bình Thuận, Hà Giang."},
      {q:"Mùa nào nên đi miền nào?", a:"Khái quát: miền Bắc đẹp mùa thu (tháng 9–11) và mùa xuân (tháng 3–4), mùa đông vùng núi rét đậm. Miền Trung nắng đẹp khoảng tháng 2–8, cuối năm là mùa mưa bão. Tây Nguyên và Nam Bộ đi đẹp mùa khô, khoảng tháng 11 đến tháng 4. Tháng cụ thể của từng tỉnh xem ở tab Tổng quan của tỉnh đó."},
      {q:"Một tỉnh nên đi mấy ngày?", a:"Lịch mẫu trong app tính 3 ngày 2 đêm cho mỗi tỉnh, xếp điểm theo cụm để khỏi đi lòng vòng. Tỉnh mới sau sáp nhập rộng gấp đôi, gấp ba, nên tách thành 2 chặng nếu muốn đi cả hai khu, ví dụ Lâm Đồng gồm Đà Lạt và biển Phan Thiết cách nhau vài giờ xe."},
      {q:"Lịch trình xếp thế nào để khỏi đi lòng vòng?", a:"Mở Lập kế hoạch, chọn tỉnh và số ngày, app gợi ý lịch theo cụm khu vực rồi cho thêm hoặc bớt điểm từng ngày. Nguyên tắc chung: mỗi buổi một cụm, điểm xa đi sáng sớm, chiều về gần chỗ ở."}
    ]},
    {g:"Đi lại", items:[
      {q:"Đi giữa các tỉnh bằng gì cho hợp lý?", a:"Chặng dài Bắc – Nam nên đi máy bay. Dọc bờ biển miền Trung có tàu hỏa Thống Nhất, đi tàu đêm vừa di chuyển vừa ngủ. Xe khách giường nằm rẻ nhất, có ở hầu hết tỉnh. Dịp lễ, Tết nên đặt vé trước vài tuần. Tab Đi đến của từng tỉnh ghi giá và thời gian từ TP.HCM và Hà Nội."},
      {q:"Từ sân bay, bến xe vào trung tâm đi bằng gì?", a:"Tab Đi đến của mỗi tỉnh có mục từ sân bay vào trung tâm, kèm giá taxi và xe đưa đón. Xe công nghệ thường rẻ và minh bạch giá hơn taxi dù ở cửa sân bay. Tỉnh sáp nhập có thể có nhiều sân bay, nhà ga; app đang bổ sung đầu mối của từng tỉnh cũ."},
      {q:"Thuê xe máy cần giấy tờ gì, cần kiểm tra gì?", a:"Cần căn cước và bằng lái xe máy phù hợp loại xe. Không giao bản gốc giấy tờ cho bên cho thuê giữ, không chuyển cọc trước chỉ vì giá rẻ. Khi nhận xe, thử phanh, lốp, đèn, còi và quay video vết trầy. Giá thuê từng tỉnh ở tab Đi lại."},
      {q:"Đi đèo núi bằng xe máy có an toàn không?", a:"Có rủi ro thật, nhất là mùa mưa và lúc sương mù. Đổ đèo dài thì về số thấp, không rà phanh liên tục, không vượt ở cua khuất, không đi đèo ban đêm nếu chưa quen đường. Mưa lớn có thể sạt lở và cấm đường, nên xem tin trước khi đi. Tỉnh nào có đèo nguy hiểm, app ghi ở mục dặn an toàn của tỉnh."}
    ]},
    {g:"Ở đâu, ăn gì", items:[
      {q:"Đặt phòng ở đâu, cần đặt trước bao lâu?", a:"Tab Ở đâu liệt kê chỗ ở theo khu vực, kèm khoảng giá một đêm và số điện thoại chính thức nếu có. Cuối tuần nên đặt trước 2–3 tuần, lễ và Tết nên đặt trước 1–2 tháng. Trước ngày đi, gọi lại xác nhận đặt phòng và chính sách hủy. App chưa nhận đặt phòng và chưa có đối tác."},
      {q:"Ăn gì, quán nào, giá bao nhiêu?", a:"Tab Ăn gì của mỗi tỉnh ghi món đặc sản, quán gợi ý, địa chỉ và khoảng giá kèm ngày kiểm. Hiện có {DISH} món ở 34 tỉnh thành. Giá là khoảng tham khảo, không phải giá chốt; món hải sản và món tính theo cân nên hỏi giá trước."},
      {q:"Làm sao tránh bị chặt chém?", a:"Hỏi giá trước khi gọi món hoặc lên xe, ưu tiên nơi niêm yết giá. Mỗi tỉnh có mục Cẩn thận chặt chém ghi các tình huống hay gặp và cách tránh. Gặp giá vô lý thì bỏ đi, đừng cãi nhau; có thể báo đường dây nóng du lịch của tỉnh nếu app có số."}
    ]},
    {g:"Chi phí", items:[
      {q:"Một chuyến 3 ngày 2 đêm hết bao nhiêu tiền?", a:"Tùy tỉnh và phương tiện. Tab Tổng quan của mỗi tỉnh có bảng chi phí ước tính cho 1 người đi từ TP.HCM: vé đi về, ở 2 đêm, ăn 3 ngày, vé tham quan, thuê xe. Khi lập kế hoạch, app cộng sẵn thành một con số; chưa gồm mua sắm và chi tiêu cá nhân."},
      {q:"Đi nhóm chia tiền thế nào cho khỏi cãi nhau?", a:"Lập quỹ chung trước chuyến, mỗi người góp bằng nhau, cử một người giữ quỹ và ghi mọi khoản chi chung. Cuối mỗi ngày chốt sổ cho cả nhóm xem; cuối chuyến chia đều, thừa trả lại, thiếu góp thêm."}
    ]},
    {g:"An toàn và sự cố", items:[
      {q:"Số khẩn cấp là số nào?", a:"Dùng chung cả nước: 113 công an, 114 cứu hỏa và cứu nạn, 115 cấp cứu, 112 tìm kiếm cứu nạn. Mục Số khẩn cấp của từng tỉnh có nút gọi và số riêng như đường dây nóng du lịch nếu có. Tỉnh nào chưa tra được số riêng thì app ghi rõ, không đoán số."},
      {q:"Gặp trời mưa thì đi đâu?", a:"Mỗi tỉnh có mục Khi trời mưa, gợi ý điểm có mái che như bảo tàng, chùa, chợ, và nói rõ điểm nên bỏ vì đường trơn hoặc nước lớn. Mùa mưa nên để 1 buổi trống trong lịch để đổi linh hoạt."},
      {q:"Xe hư, hết xăng, bị hủy phòng thì làm gì?", a:"Xe thuê hư thì quay lại tình trạng xe, gửi định vị và gọi số hỗ trợ đã chốt lúc thuê, không tự sửa lớn. Bị hủy phòng thì gọi thẳng số khách sạn trong app để xác nhận, rồi tìm chỗ khác cùng khu ở tab Ở đâu."}
    ]},
    {g:"Về app", items:[
      {q:"Sổ tem check-in là gì?", a:"Mỗi địa danh có nút Check-in lấy tem. App chỉ tính khi định vị cho thấy bạn đang ở cách điểm đó dưới 1 km (2 km nếu tọa độ là ước tính). Sổ tem gom tem theo 34 tỉnh thành, xem ở trang chủ hoặc tab Tài khoản. Tem chỉ lưu trên máy này; tải file sao lưu ở trang Sổ tem để khỏi mất khi đổi máy hoặc xóa dữ liệu trình duyệt."},
      {q:"Cài app ra màn hình điện thoại được không? Mất sóng có dùng được không?", a:"Được. iPhone: mở trang bằng Safari, bấm nút Chia sẻ rồi chọn Thêm vào MH chính. Android: mở bằng Chrome, bấm menu ba chấm rồi chọn Cài đặt ứng dụng hoặc Thêm vào màn hình chính. Sau lần mở đầu có sóng, app lưu sẵn dữ liệu 34 tỉnh trên máy, lên đèo mất sóng vẫn xem được địa danh, giá, lịch trình; trợ lý Hỏi chạy ngay trên máy nên mất sóng vẫn hỏi được; riêng bản đồ cần có mạng."},
      {q:"Dữ liệu lấy từ đâu, có đúng không?", a:"Hiện có {PLACE} địa danh và {DISH} món, được tổng hợp và kiểm định kỳ. Đây là thông tin tham khảo, có thể lệch so với thực tế; giá luôn ghi theo khoảng, chỗ nào chưa kiểm được thì app ghi rõ thay vì đoán. Một phần địa danh lấy từ Hộ chiếu khám phá RaceHub, giá và giờ mở cửa đang được bổ sung. Thấy sai thì bấm Báo thông tin sai ở từng mục hoặc gửi thư cho đội hỗ trợ."},
      {q:"App có bán tour, nhận đặt phòng không?", a:"Chưa. Chỗ ở và quán ăn trong app đều chưa phải đối tác và chưa thu phí. Khi có nội dung tài trợ, app sẽ ghi rõ nhãn Tài trợ để bạn phân biệt."}
    ]}
  ];
  window.FAQ_VN=FAQ_VN;
  function fill(a){ return a.replace(/\{PLACE\}/g,nPlaces().toLocaleString("vi-VN")).replace(/\{DISH\}/g,nDishes().toLocaleString("vi-VN")); }

  /* ---------- Hỏi nhanh ---------- */
  function norm(s){ return (s||"").toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g,"").replace(/đ/g,"d").replace(/[^a-z0-9 ]+/g," ").replace(/\s+/g," ").trim(); }
  /* Tên quen gọi -> [tỉnh mới, tỉnh cũ] */
  var ALIAS=[
    ["sai gon","tp-ho-chi-minh"],["hcm","tp-ho-chi-minh"],["ho chi minh","tp-ho-chi-minh"],["vung tau","tp-ho-chi-minh","Bà Rịa – Vũng Tàu"],["con dao","tp-ho-chi-minh","Bà Rịa – Vũng Tàu"],
    ["da lat","lam-dong","Lâm Đồng"],["phan thiet","lam-dong","Bình Thuận"],["mui ne","lam-dong","Bình Thuận"],["gia nghia","lam-dong","Đắk Nông"],
    ["quy nhon","gia-lai","Bình Định"],["pleiku","gia-lai","Gia Lai"],["tuy hoa","dak-lak","Phú Yên"],["buon ma thuot","dak-lak","Đắk Lắk"],
    ["phong nha","quang-tri","Quảng Bình"],["dong hoi","quang-tri","Quảng Bình"],["hoi an","da-nang","Quảng Nam"],["my son","da-nang","Quảng Nam"],
    ["kon tum","quang-ngai","Kon Tum"],["mang den","quang-ngai","Kon Tum"],["ly son","quang-ngai","Quảng Ngãi"],
    ["nha trang","khanh-hoa","Khánh Hòa"],["phan rang","khanh-hoa","Ninh Thuận"],["ha long","quang-ninh"],["cat ba","hai-phong"],
    ["sa pa","lao-cai","Lào Cai"],["sapa","lao-cai","Lào Cai"],["mu cang chai","lao-cai","Yên Bái"],["ha giang","tuyen-quang","Hà Giang"],["dong van","tuyen-quang","Hà Giang"],
    ["moc chau","son-la"],["tam dao","phu-tho","Vĩnh Phúc"],["mai chau","phu-tho","Hòa Bình"],["ba be","thai-nguyen","Bắc Kạn"],
    ["trang an","ninh-binh","Ninh Bình"],["tam coc","ninh-binh","Ninh Bình"],["phu quoc","an-giang","Kiên Giang"],["ha tien","an-giang","Kiên Giang"],["chau doc","an-giang","An Giang"],
    ["sa dec","dong-thap","Đồng Tháp"],["my tho","dong-thap","Tiền Giang"],["ben tre","vinh-long","Bến Tre"],["soc trang","can-tho","Sóc Trăng"],["bac lieu","ca-mau","Bạc Liêu"],
    ["cua lo","nghe-an"],["sam son","thanh-hoa"]
  ];
  function findProv(qn){
    var hit=null;
    function take(id,old,len,place,alias,kind){ if(!hit||len>hit.len) hit={prov:provById(id),old:old||"",len:len,place:place||null,alias:alias||"",kind:kind||""}; }
    PROV_DATA.forEach(function(p){
      var n=norm(p.id==="lam-dong"?"Lâm Đồng":p.name); if(n && (" "+qn+" ").indexOf(" "+n+" ")>=0) take(p.id,"",n.length,null,"","prov");
      p.places.forEach(function(x){ var pn=norm(x.name.split(" (")[0]); if(pn.length>=6 && (" "+qn+" ").indexOf(" "+pn+" ")>=0) take(p.id,"",pn.length+100,x); });
    });
    if(typeof SAP_NHAP!=="undefined") Object.keys(SAP_NHAP).forEach(function(id){
      SAP_NHAP[id].forEach(function(o,i){ var on=norm(o); if(on && (" "+qn+" ").indexOf(" "+on+" ")>=0) take(id,i>0?o:"",on.length+(i>0?1:0),null,"","prov"); });
    });
    ALIAS.forEach(function(a){ if((" "+qn+" ").indexOf(" "+a[0]+" ")>=0) take(a[1],a[2]&&SAP_NHAP[a[1]]&&SAP_NHAP[a[1]][0]!==a[2]?a[2]:"",a[0].length+2,null,a[0],"alias"); });
    return hit&&hit.prov?hit:null;
  }
  var INTENTS=[
    ["angi",/\b(an gi|mon|quan an|quan nao|quan ngon|dac san|an sang|an toi|nha hang|an uong|ngon)\b/],
    ["odau",/\b(o dau|khach san|homestay|dat phong|thue phong|phong o|nha nghi|resort|cho o|ngu o|ngu dau|luu tru)\b/],
    ["chiphi",/\b(bao nhieu tien|chi phi|het bao nhieu|ton bao nhieu|ngan sach|het may)\b/],
    ["mang",/\b(mang gi|mang theo|chuan bi gi|chuan bi nhung gi|do dac|hanh ly|soan do)\b/],
    ["mua",/\b(mua nao|thang nao|thoi tiet|lanh|nong|mac gi|thang)\b/],
    ["mua_mua",/\b(troi mua|mua thi|khi mua)\b/],
    ["khancap",/\b(khan cap|cap cuu|cong an|benh vien|duong day nong|so dien thoai)\b/],
    ["chatchem",/\b(chat chem|lua|lua dao|cam bay)\b/],
    ["diden",/\b(di bang gi|may bay|xe khach|tau hoa|ve xe|ve may bay|san bay|ben xe|tu ha noi|tu sai gon|tu hcm|di den|toi bang|bang gi)\b/],
    ["dilai",/\b(thue xe|xe may|taxi|grab|di lai|xe buyt)\b/],
    ["lichtrinh",/\b(lich trinh|may ngay|ngay dem|\dn\dd|di dau truoc)\b/],
    ["didau",/\b(choi gi|di dau|tham quan|dia danh|diem|check in|song ao|di tich|bien|thac|nui)\b/]
  ];
  function intentOf(qn){ for(var i=0;i<INTENTS.length;i++){ if(INTENTS[i][1].test(qn)) return INTENTS[i][0]; } return ""; }
  function provLabel(p){ return p.id==="lam-dong"?"Lâm Đồng":p.name; }
  function btn(label,js){ return '<button class="chip" onclick="'+js+'">'+esc(label)+'</button>'; }
  function goSeg(p,seg,label){ return btn(label||"Mở tab trong cẩm nang","goProvSeg('"+p.id+"','"+seg+"')"); }
  window.goProvSeg=function(id,seg){ openProvDetail(id); if(seg&&seg!=="tongquan") setTimeout(function(){ setProvSeg(seg); },0); };
  function li(arr){ return '<ul class="ask-ul">'+arr.map(function(t){ return "<li>"+t+"</li>"; }).join("")+"</ul>"; }
  function short(s,n){ s=(s||"").replace(/\s*\((chưa kiểm[^)]*)\)/g,""); return s.length>n?s.slice(0,n-1)+"…":s; }

  function answerProv(hit,intent){
    var p=hit.prov, name=provLabel(p), old=hit.old, h="";
    /* mục thuộc khu tỉnh cũ: ghi tên tỉnh cũ, hoặc tên thành phố quen gọi của khu đó (Bình Định → Quy Nhơn) */
    var keys=[]; if(hit.alias) keys.push(hit.alias); if(old) ALIAS.forEach(function(a){ if(a[2]===old && a[1]===p.id) keys.push(a[0]); });
    function inOld(o){ var j=JSON.stringify(o); if(old && j.indexOf(old)>=0) return true; var nj=norm(j.replace(/-/g," ")); return keys.some(function(k){ return nj.indexOf(k)>=0; }); }
    function note(scoped){ return old?'<p class="ask-old">'+esc(old)+' cũ nay thuộc '+esc(name)+'.'+(scoped?'':' Chưa có dữ liệu riêng cho khu '+esc(old)+' cũ. Phần dưới là dữ liệu khu '+esc(p.anchor||name)+', không phải '+esc(old)+' cũ; giá, giờ đi và mùa có thể khác.')+'</p>':""; }
    function pick(list){ if(!old&&!hit.alias) return {l:list,sc:true}; var f=list.filter(inOld); return f.length?{l:f,sc:true}:{l:list,sc:!old}; }
    var oldNote=note(false);
    if(hit.place){
      var x=hit.place;
      return '<p class="ask-h">'+esc(x.name)+'</p>'+li([
        "Giá vé: "+esc(short(x.price,90)||"chưa kiểm được"),
        "Giờ mở cửa: "+esc(short(x.hours,70)||"chưa kiểm được"),
        "Nên dành: "+esc(short(x.duration,70)||"—"),
        (typeof placeDistLabel==="function"?esc(placeDistLabel(x)):"")
      ].filter(Boolean))+'<div class="ask-act">'+btn("Xem chi tiết, chỉ đường","openProvPlace('"+p.id+"','"+x.id+"')")+goSeg(p,"tongquan","Cẩm nang "+name)+'</div>';
    }
    if(intent==="angi"){
      var pd=pick(p.dishes); oldNote=note(pd.sc);
      h=li(pd.l.slice(0,5).map(function(d){ var r=(d.restaurants||[])[0]; return "<b>"+esc(d.name)+"</b> · "+esc(short(priceShort(d.price)||d.price,40))+(r?" · "+esc(r.name):""); }));
      return oldNote+'<p class="ask-h">Ăn gì ở '+esc(name)+'</p>'+h+'<div class="ask-act">'+goSeg(p,"angi","Xem đủ "+p.dishes.length+" món và quán")+'</div>';
    }
    if(intent==="odau"){
      var ps=pick(p.stays); oldNote=note(ps.sc);
      h=li(ps.l.slice(0,5).map(function(s){ return "<b>"+esc(s.name.split(" (")[0])+"</b> · "+esc(short(priceShort(s.price)||s.price,40))+(s.kind?" · "+esc(s.kind):""); }));
      return oldNote+'<p class="ask-h">Ở đâu tại '+esc(name)+'</p>'+h+'<p class="small">Chưa kiểm chứng, chưa đối tác, chưa thu phí. Gọi xác nhận trước khi đặt.</p><div class="ask-act">'+goSeg(p,"odau","Xem "+p.stays.length+" chỗ ở theo khu")+'</div>';
    }
    if(intent==="chiphi"){
      var c=(p.cost||[]).filter(function(r){ return /Tổng/i.test(r.label); });
      h=li((c.length?c:(p.cost||[]).slice(0,4)).map(function(r){ return esc(r.label)+": <b>"+esc(r.value)+"</b>"; }));
      return oldNote+'<p class="ask-h">Chi phí 3 ngày 2 đêm, 1 người từ TP.HCM (ước tính)</p>'+h+'<div class="ask-act">'+goSeg(p,"tongquan","Xem bảng chi phí")+btn("Lập kế hoạch","startPlan()")+'</div>';
    }
    if(intent==="mua"){
      oldNote=note(true);
      return oldNote+'<p class="ask-h">Mùa đẹp ở '+esc(name)+'</p><p>'+esc(p.best_season||(p.season&&p.season.best)||"Chưa có dữ liệu")+'</p>'+(p.season&&p.season.wear?'<p>Mặc: '+esc(p.season.wear)+'</p>':"")+'<div class="ask-act">'+goSeg(p,"tongquan","Cẩm nang "+name)+'</div>';
    }
    if(intent==="mua_mua"){
      var r=p.rainy||{};
      return oldNote+'<p class="ask-h">Trời mưa ở '+esc(name)+'</p>'+(r.points&&r.points.length?li(r.points.map(esc)):"")+(r.tip?'<p>'+esc(short(r.tip,220))+'</p>':"")+'<div class="ask-act">'+goSeg(p,"tongquan","Cẩm nang "+name)+'</div>';
    }
    if(intent==="khancap"){
      var e=p.emergency||{};
      return oldNote+'<p class="ask-h">Số khẩn cấp</p>'+li(['Công an <a href="tel:113"><b>113</b></a>','Cứu hỏa <a href="tel:114"><b>114</b></a>','Cấp cứu <a href="tel:115"><b>115</b></a>'].concat((e.extra||[]).slice(0,3).map(function(x){ return esc(x.name)+': <a href="tel:'+esc((x.number||"").replace(/\s/g,""))+'"><b>'+esc(x.number)+'</b></a>'; })));
    }
    if(intent==="chatchem"){
      return oldNote+'<p class="ask-h">Cẩn thận ở '+esc(name)+'</p>'+li((p.scams||[]).slice(0,3).map(function(s){ return esc(short(s.situation,110))+" <i>Cách tránh:</i> "+esc(short(s.avoid,110)); }));
    }
    if(intent==="diden"){
      var R=p.routes||{}, rows=[];
      (R.sg||[]).slice(0,2).forEach(function(r){ rows.push("Từ TP.HCM · "+esc(r.mode)+" · "+esc(short(r.time,30))+" · "+esc(short(r.price,60))); });
      (R.hn||[]).slice(0,2).forEach(function(r){ rows.push("Từ Hà Nội · "+esc(r.mode)+" · "+esc(short(r.time,30))+" · "+esc(short(r.price,60))); });
      return oldNote+'<p class="ask-h">Đi đến '+esc(name)+'</p>'+li(rows)+(R.note?'<p class="small">'+esc(short(R.note,240))+'</p>':"")+'<div class="ask-act">'+goSeg(p,"diden","Xem đủ cách đi")+'</div>';
    }
    if(intent==="dilai"){
      return oldNote+'<p class="ask-h">Đi lại trong '+esc(name)+'</p>'+li((p.local||[]).slice(0,4).map(function(l){ return "<b>"+esc(l.mode)+"</b> · "+esc(short(l.price,60)); }))+'<div class="ask-act">'+goSeg(p,"dilai","Xem tab Đi lại")+'</div>';
    }
    if(intent==="lichtrinh"){
      return oldNote+'<p class="ask-h">Lịch trình '+esc(name)+'</p><p>App có lịch mẫu xếp theo cụm khu vực. Gợi ý: '+esc(String(p.suggested_days||3))+' ngày.</p><div class="ask-act">'+goSeg(p,"lichtrinh","Xem lịch mẫu")+btn("Lập kế hoạch","startPlan()")+'</div>';
    }
    /* mặc định: đi đâu + tóm tắt */
    var pp=pick(p.places), pl=pp.l; oldNote=note(pp.sc);
    return oldNote+'<p class="ask-h">'+esc(name)+(old&&pp.sc?' · khu '+esc(old)+' cũ':'')+'</p><p>'+esc(short(p.overview,220))+'</p>'+
      li(pl.slice(0,5).map(function(x){ return '<a href="javascript:void 0" onclick="openProvPlace(\''+p.id+'\',\''+x.id+'\')">'+esc(x.name.split(" (")[0])+'</a>'+(x.dist!=null&&x.dist!==""?" · "+esc(placeDistLabel(x)):""); }))+
      '<p class="small">Hỏi tiếp: "ăn gì ở '+esc(name)+'", "ở đâu", "đi bằng gì", "mùa nào đẹp", "hết bao nhiêu tiền".</p><div class="ask-act">'+goSeg(p,"didau","Xem "+p.places.length+" địa danh")+'</div>';
  }
  /* ---------- Khu trong tỉnh mới (Quy Nhơn, Phú Quốc, Phan Thiết, Măng Đen…) và đảo ----------
     Luật: trả theo hồ sơ khu (ho-so-khu.js). Thiếu mục nào thì nói thẳng là thiếu, không lấy dữ liệu thủ phủ
     thay vào; chỗ nào buộc phải đưa dữ liệu tỉnh thì ghi rõ "đây là dữ liệu <thủ phủ>, không phải <khu>". */
  /* KHU_VUC chỉ chứa trung tâm phụ; thủ phủ không thành khu, nên mọi khu đều trả theo khu */
  function isMainArea(a){ return false; }
  function kmTo(a,p){ if(a.lat==null||p.lat==null) return 0; var r=Math.PI/180,x=Math.sin((p.lat-a.lat)*r/2),y=Math.sin((p.lng-a.lng)*r/2); return Math.round(12742*Math.asin(Math.sqrt(x*x+Math.cos(a.lat*r)*Math.cos(p.lat*r)*y*y))); }
  function routeLi(rs){ return li(rs.map(function(r){ return "<b>"+esc(r.from)+"</b> · "+esc(r.mode)+" · "+esc(r.time)+" · "+esc(r.price); }))+'<p class="small">Giờ đi và giá vé là ước tính, chưa kiểm với hãng, cảng. Tra lại trước khi đặt.</p>'; }
  function costRows(rows){ return li(rows.map(function(r){ return esc(r.label)+": <b>"+esc(r.value)+"</b>"; })); }
  function answerArea(a,intent,want,qn,placeName){
    var p=provById(a.prov), pr=(typeof btAreaProfile==="function"&&btAreaProfile(a))||{}, anchor=p.anchor||provLabel(p), far=kmTo(a,p);
    var head='<p class="ask-old">'+esc(a.name)+(a.old&&a.old!==p.name?' ('+esc(a.old)+' cũ)':'')+' nay thuộc '+esc(provLabel(p))+'. Trả lời theo dữ liệu riêng của khu '+esc(a.name)+(far>30?', không dùng dữ liệu '+esc(anchor)+' (cách ~'+far+' km)':'')+'.</p>';
    var title=placeName?esc(placeName)+' (khu '+esc(a.name)+')':esc(a.name);
    var acts='<div class="ask-act">'+btn("Lập kế hoạch đi "+a.name,"btPlanArea('"+a.id+"')")+goSeg(p,"tongquan","Cẩm nang "+provLabel(p))+'</div>';
    function miss(what,extra){ return '<p>Chưa có dữ liệu '+what+' riêng cho khu '+esc(a.name)+'. App không lấy dữ liệu của '+esc(anchor)+' thay vào vì hai nơi khác nhau'+(far>30?' (cách ~'+far+' km)':'')+'.</p>'+(extra||""); }
    var words=[a.name,a.hub.replace(/^TP\s+/,"").replace(/\s*\(.*?\)/g,"")].concat(a.old&&a.old!==p.name?[a.old]:[]).map(norm).concat(a.keys).filter(function(k){ return k&&k.length>=4; });
    /* khu không có hồ sơ riêng nhưng sát thủ phủ (≤40 km, như Sa Pa): dùng dữ liệu tỉnh, ghi rõ */
    if(intent && !pr.season && !pr.routes && !a.cost && far<=40 && ["diden","dilai","mua","chiphi","mang"].indexOf(intent)>=0)
      return '<p class="ask-old">'+(far>5?esc(a.name)+' cách '+esc(anchor)+' ~'+far+' km; ':'')+'phần dưới là dữ liệu chung của '+esc(provLabel(p))+' (viết theo khu '+esc(anchor)+').</p>'+answerProv({prov:p,old:"",place:null},intent==="mang"?"mua":intent);
    function inArea(o){ var nj=" "+norm(JSON.stringify(o).replace(/-/g," "))+" "; return words.some(function(k){ return nj.indexOf(" "+k+" ")>=0; }); }
    if(intent==="diden"){
      if(pr.routes) return head+'<p class="ask-h">Đi đến '+title+'</p>'+(pr.access?'<p>'+esc(pr.access)+'</p>':'')+routeLi(pr.routes)+acts;
      if(a.cost) return head+'<p class="ask-h">Đi đến '+title+'</p>'+costRows(a.cost.filter(function(r){ return !/^Ở/.test(r.label); }))+'<p class="small">Chưa có bảng giờ đi riêng cho khu này; dòng trên là tiền đi khứ hồi ước tính.</p>'+acts;
      return head+'<p class="ask-h">Đi đến '+title+'</p>'+miss("cách đi",'<p>Tra vé tới sân bay, ga hoặc bến xe gần '+esc(a.name)+' trên trang của hãng; trong app, tab Đi đến của '+esc(provLabel(p))+' là tuyến tới '+esc(anchor)+'.</p>')+acts;
    }
    if(intent==="mua"||(!intent&&want.indexOf("season")>=0)){
      var se=pr.season;
      if(se) return head+'<p class="ask-h">Mùa đẹp ở '+title+'</p>'+li(["<b>Nên đi:</b> "+esc(se.best)].concat(se.avoid?["<b>Tránh:</b> "+esc(se.avoid)]:[]).concat(se.wear?["<b>Mặc:</b> "+esc(se.wear)]:[]))+acts;
      return head+'<p class="ask-h">Mùa đẹp ở '+title+'</p>'+miss("mùa đẹp",'<p class="small">Để tham khảo, có ghi rõ: mùa chung của '+esc(provLabel(p))+' viết theo khu '+esc(anchor)+', có thể không đúng cho '+esc(a.name)+': '+esc(p.best_season||"chưa có")+'.</p>')+acts;
    }
    if(intent==="mang"){
      if(pr.pack) return head+'<p class="ask-h">Mang gì khi đi '+title+'</p>'+li(pr.pack.map(esc))+(pr.season&&pr.season.wear?'<p>Mặc: '+esc(pr.season.wear)+'</p>':'')+acts;
      return head+miss("danh sách đồ mang theo")+acts;
    }
    if(intent==="chiphi"){
      var b=pr.budget||{}, k=/\b(2n1d|2 ngay 1 dem|2 ngay)\b/.test(qn)?"2N1Đ":(/\b(3n2d|3 ngay 2 dem|3 ngay)\b/.test(qn)?"3N2Đ":Object.keys(b)[0]);
      if(k&&b[k]) return head+'<p class="ask-h">Chi phí '+esc(k)+' đi '+title+', 1 người từ TP.HCM (ước tính, chưa kiểm)</p>'+costRows(b[k])+acts;
      var hasB=Object.keys(b);
      return head+'<p class="ask-h">Chi phí đi '+title+'</p>'+(hasB.length&&k?'<p>Chưa có bảng '+esc(k)+' cho khu này; đang có bảng '+esc(hasB.join(", "))+':</p>'+costRows(b[hasB[0]]):"")+
        (a.cost?'<p>Tiền đi khứ hồi (ước tính, chưa kiểm):</p>'+costRows(a.cost):"")+
        '<p class="small">'+(a.cost||hasB.length?"":"Chưa có bảng chi phí riêng cho khu "+esc(a.name)+". ")+'Bấm Lập kế hoạch, app tính chi phí theo khu '+esc(a.name)+', không tính theo '+esc(anchor)+'.</p>'+acts;
    }
    if(intent==="dilai") return head+'<p class="ask-h">Đi lại ở '+title+'</p>'+(pr.local?'<p>'+esc(pr.local)+'</p>':miss("đi lại"))+acts;
    if(intent==="angi"||intent==="odau"){
      var arr=intent==="angi"?p.dishes:p.stays, f=arr.filter(inArea);
      var lab=intent==="angi"?"Ăn gì ở ":"Ở đâu tại ";
      if(!f.length) return head+'<p class="ask-h">'+lab+title+'</p>'+miss(intent==="angi"?"món ăn, quán":"chỗ ở")+'<div class="ask-act">'+goSeg(p,intent,"Xem "+(intent==="angi"?"món":"chỗ ở")+" của cả tỉnh "+provLabel(p)+" (phần lớn ở khu "+anchor+")")+'</div>';
      var rows=intent==="angi"?f.slice(0,6).map(function(d){ var r=(d.restaurants||[])[0]; return "<b>"+esc(d.name)+"</b> · "+esc(short(priceShort(d.price)||d.price,40))+(r?" · "+esc(r.name):""); })
        :f.slice(0,6).map(function(s){ return "<b>"+esc(s.name.split(" (")[0])+"</b> · "+esc(short(priceShort(s.price)||s.price,40))+(s.kind?" · "+esc(s.kind):""); });
      return head+'<p class="ask-h">'+lab+title+'</p>'+li(rows)+(intent==="odau"?'<p class="small">Chưa kiểm chứng, chưa đối tác, chưa thu phí. Gọi xác nhận trước khi đặt.</p>':'')+acts;
    }
    if(intent==="khancap") return head+'<p class="ask-h">Số khẩn cấp</p>'+li(['Công an <a href="tel:113"><b>113</b></a>','Cứu hỏa <a href="tel:114"><b>114</b></a>','Cấp cứu <a href="tel:115"><b>115</b></a>'])+'<p class="small">Chưa có số bệnh viện, đường dây nóng riêng của khu '+esc(a.name)+'.</p>';
    if(intent==="chatchem"||intent==="mua_mua") return head+miss(intent==="chatchem"?"cảnh báo chặt chém":"gợi ý khi trời mưa")+acts;
    var pl=typeof btAreaPlaces==="function"?btAreaPlaces(a):[];
    if(want.indexOf("price")>=0 && !intent){
      var nk=norm(a.name), priced=pl.filter(function(x){ return x.price; }).sort(function(x,y){ return (norm(y.name.split(" (")[0]).indexOf(nk)>=0)-(norm(x.name.split(" (")[0]).indexOf(nk)>=0); });
      return head+'<p class="ask-h">Giá vé ở '+title+'</p>'+li(priced.slice(0,6).map(function(x){ return '<a href="javascript:void 0" onclick="openProvPlace(\''+p.id+'\',\''+x.id+'\')">'+esc(x.name.split(" (")[0])+'</a>: '+esc(short(x.price,110)); }))+'<p class="small">Hỏi đúng tên một điểm để xem đủ giá, giờ: ví dụ "giá vé '+esc((priced[0]||{name:a.name}).name.split(" (")[0])+'".</p>'+acts;
    }
    var lines=[];
    if(pr.season) lines.push("<b>Mùa đẹp:</b> "+esc(pr.season.best));
    if(pr.routes) lines.push("<b>Đi đến:</b> "+esc(pr.routes[0].mode)+" · "+esc(pr.routes[0].time)+" (ước tính)");
    return head+'<p class="ask-h">'+title+' · '+pl.length+' địa danh</p>'+(lines.length?li(lines):"")+
      li(pl.slice(0,6).map(function(x){ return '<a href="javascript:void 0" onclick="openProvPlace(\''+p.id+'\',\''+x.id+'\')">'+esc(x.name.split(" (")[0])+'</a> · '+esc(placeDistLabel(x)); }))+
      '<p class="small">Hỏi tiếp: "'+esc(a.name)+' đi bằng gì", "mùa nào đẹp", "ăn gì", "mang gì", "2 ngày 1 đêm hết bao nhiêu".</p>'+acts;
  }
  function answerIsle(d,intent){
    var p=provById(d.prov), it=null;
    if(p) p.places.forEach(function(x){ if(!it && btIsleFor(x.name.split(" (")[0])===d) it=x; });
    var open=it?'<div class="ask-act">'+btn("Xem mục "+it.name.split(" (")[0],"openProvPlace('"+p.id+"','"+it.id+"')")+'</div>':"";
    if(d.ban) return '<p class="ask-h">Đảo '+esc(d.name)+'</p><p><b>Không đón khách du lịch.</b> '+esc(d.banNote)+'</p>'+open;
    var h='<p class="ask-h">Đi đảo '+esc(d.name)+(p?' ('+esc(provLabel(p))+')':'')+'</p>'+routeLi(d.access)+'<p><b>Mùa:</b> '+esc(d.season)+'</p>';
    if(intent==="angi"||intent==="odau") h='<p>Chưa có dữ liệu '+(intent==="angi"?"quán ăn":"chỗ ở")+' riêng trên đảo '+esc(d.name)+'; đặt homestay trên đảo trước khi ra tàu.</p>'+h;
    return h+'<p class="small">Tàu dừng khi biển động hoặc có lệnh cấm biển; gọi cảng xác nhận lịch chạy trước ngày đi.</p>'+open;
  }
  function answerFaq(qn){
    var words=qn.split(" ").filter(function(w){ return w.length>1; }), best=[];
    FAQ_VN.forEach(function(g){ g.items.forEach(function(it){
      var t=norm(it.q+" "+it.a), s=0; words.forEach(function(w){ if((" "+t+" ").indexOf(" "+w+" ")>=0) s+=(norm(it.q).indexOf(w)>=0?2:1); });
      if(s>0) best.push({s:s,it:it});
    }); });
    best.sort(function(a,b){ return b.s-a.s; });
    if(!best.length || best[0].s<2) return '<p>Chưa hiểu câu hỏi. Thử ghi tên tỉnh hoặc địa danh, ví dụ: "Quy Nhơn ăn gì", "Phú Quốc ở đâu", "Hà Giang mùa nào đẹp".</p>';
    var it=best[0].it;
    return '<p class="ask-h">'+esc(it.q)+'</p><p>'+esc(fill(it.a))+'</p>';
  }
  /* ---------- Trợ lý chạy trên máy (không gọi máy chủ, không cần mạng) ----------
     1. Câu hỏi về 1 địa danh / món cụ thể (giá, giờ, mùa): tra bằng btSearch (tim-kiem.js) trên phần
        còn lại sau khi bỏ từ hỏi, nên tên ngắn như "Bà Nà", "Cầu Vàng" vẫn khớp.
     2. Không có địa danh: tra tỉnh (tên mới, tên cũ, tên quen gọi) rồi trả theo ý hỏi.
     3. Câu chung chung ("cuối tuần nên đi đâu"): gợi ý tỉnh đẹp trong tháng này, hỏi lại đi từ đâu, mấy ngày.
     4. Còn lại: FAQ; hỏi giá mà không nhận ra nơi nào thì nói thẳng app chưa có thông tin. */
  var QWORDS=["gia ve vao cong","gia ve","ve vao cong","ve vao","bao nhieu tien","het bao nhieu","mat bao nhieu","bao nhieu","chi phi","gio mo cua","gio dong cua","may gio","mo cua","dong cua","thang may","thang nao","mua nao","khi nao","luc nao","mua dep","thoi diem","dep nhat","nguoi lon","tre em","tham quan","cap treo","nhu the nao","the nao","gia","ve","tien","phi","gio","dep","nen","di","toi","den","o","thi","la","co","khong","nhi","vay","a","nhe","may","bao","lau","vao","len","xem","choi","cua","oi","cho","minh","em","anh","chi","ban","hoi"];
  function wantOf(qn){
    var w=[];
    if(/\b(gia|ve|bao nhieu|tien|phi|chi phi)\b/.test(qn)) w.push("price");
    if(/\b(gio|mo cua|dong cua)\b/.test(qn)) w.push("hours");
    if(/\b(thang may|thang nao|mua nao|khi nao|luc nao|mua dep|thoi diem)\b/.test(qn)) w.push("season");
    return w;
  }
  /* Bỏ từ hỏi nhưng GIỮ dấu ở phần tên còn lại (btSearch khớp chặt theo dấu trước) */
  var QSET={}; QWORDS.forEach(function(w){ QSET[w]=1; });
  /* Từ hỏi ngắn trùng vần tên riêng: "có"/"Kỳ Co", "hỏi"/"Hội An", "ở"/"Ô Quy Hồ". Người gõ có dấu thì chỉ bỏ đúng dạng có dấu của từ hỏi. */
  var ACC={co:["có"],hoi:["hỏi"],o:["ở"],gio:["giờ"],gia:["giá"],dep:["đẹp"],nen:["nên"],may:["mấy","máy"],len:["lên"],vao:["vào"],cua:["của"],chi:["chị"],ban:["bạn"],a:["à","ạ","a"],lau:["lâu"],thi:["thì"],la:["là"],toi:["tới","tôi"],den:["đến"],di:["đi"],oi:["ơi"],nhi:["nhỉ"],vay:["vậy"],nhe:["nhé"],choi:["chơi"],minh:["mình"],tien:["tiền"],phi:["phí"],ve:["vé","về"],khong:["không"],xem:["xem"],cho:["cho"],em:["em"],anh:["anh"],bao:["bao"]};
  function restOf(q){
    var marked=/[^\x00-\x7f]/.test(String(q||""));
    var raw=String(q||"").toLowerCase().normalize("NFC").replace(/[?!.,;:"'()]/g," ").split(/\s+/).filter(Boolean), f=raw.map(norm), out=[];
    function okTok(j){ var a=ACC[f[j]]; return !marked||!a||a.indexOf(raw[j])>=0; }
    for(var i=0;i<raw.length;){
      var hit=0; for(var k=Math.min(4,raw.length-i);k>=1;k--){ if(QSET[f.slice(i,i+k).join(" ")]){ var ok=true; for(var j=i;j<i+k;j++) if(!okTok(j)) ok=false; if(ok){ hit=k; break; } } }
      if(hit){ i+=hit; continue; } out.push(raw[i]); i++;
    }
    return out.join(" ");
  }
  function itemHit(rest){
    if(rest.length<3 || typeof window.btSearch!=="function") return null;
    var rn=norm(rest);
    /* gõ đúng tên tỉnh mới/cũ ("Hà Giang", "Quảng Bình") thì trả theo tỉnh, không bắt 1 địa danh lẻ */
    if(PROV_DATA.some(function(p){ return norm(provLabel(p))===rn || norm(p.name)===rn; })) return null;
    if(typeof SAP_NHAP!=="undefined" && Object.keys(SAP_NHAP).some(function(k){ return SAP_NHAP[k].some(function(o){ return norm(o)===rn; }); })) return null;
    var ar=typeof btAreaFor==="function"?btAreaFor(rest):null;
    if(ar && (ar.exact.concat(ar.keys,[ar.name]).some(function(e){ return norm(e)===rn || norm(e).replace(/ /g,"")===rn; }))) return null;
    var r=window.btSearch(rest).filter(function(x){ return (x.kind==="place"||x.kind==="dish") && x.s>=75; });
    if(!r.length) return null;
    /* cùng điểm số: ưu tiên tên chính chứa cụm gõ (Sun World Bà Nà Hills hơn "Cầu Vàng (Bà Nà Hills)") */
    var top=r.filter(function(x){ return x.s>=r[0].s-10; });
    var main=top.filter(function(x){ return norm(x.x.name.split(" (")[0]).indexOf(rn)>=0; });
    return main[0]||r[0];
  }
  function seasonOf(x,p){ return typeof placeSeason==="function"?placeSeason(x,p):((x.info&&x.info.mua_dep)||p.best_season||"chưa có dữ liệu"); }
  function srcLine(x,p){ return '<p class="small">Nguồn: '+esc(x.source||"dữ liệu cẩm nang")+' · kiểm '+esc(x.checked||p.checked||"06/11/2026")+'. Giá, giờ có thể đổi, kiểm lại trước khi đi.</p>'; }
  function answerItem(h,want){
    var x=h.x, p=h.prov, name=provLabel(p);
    if(h.kind==="dish"){
      var r=(x.restaurants||[]).slice(0,3);
      return '<p class="ask-h">'+esc(x.name)+' ('+esc(name)+')</p>'+li(["Giá: "+esc(x.price||"app chưa có thông tin này")].concat(r.map(function(q){ return "<b>"+esc(q.name)+"</b>"+(q.address?" · "+esc(q.address):"")+(q.price?" · "+esc(q.price):""); })))+
        srcLine(x,p)+'<div class="ask-act">'+btn("Xem món này","openProvDish('"+p.id+"','"+x.id+"')")+'</div>';
    }
    if(x.banned) return '<p class="ask-h">'+esc(x.name)+' ('+esc(name)+')</p><p><b>Không đón khách du lịch.</b> '+esc(x.note||"")+'</p><div class="ask-act">'+btn("Xem chi tiết","openProvPlace('"+p.id+"','"+x.id+"')")+'</div>';
    var rows=[];
    if(!want.length) want=["price","hours","season"];
    else if(want.indexOf("price")>=0 && want.indexOf("hours")<0) want=want.concat(["hours"]);
    if(want.indexOf("price")>=0) rows.push("<b>Giá:</b> "+esc(x.price||"app chưa có thông tin này"));
    if(want.indexOf("hours")>=0) rows.push("<b>Giờ mở cửa:</b> "+esc(x.hours||"app chưa có thông tin này"));
    if(want.indexOf("season")>=0) rows.push("<b>Mùa đẹp:</b> "+esc(seasonOf(x,p)));
    if(typeof placeDistLabel==="function") rows.push(esc(placeDistLabel(x)));
    return '<p class="ask-h">'+esc(x.name)+' ('+esc(name)+')</p>'+li(rows)+srcLine(x,p)+
      '<div class="ask-act">'+btn("Xem chi tiết, chỉ đường","openProvPlace('"+p.id+"','"+x.id+"')")+goSeg(p,"tongquan","Cẩm nang "+name)+'</div>';
  }
  function answerGeneral(){
    var m=new Date().getMonth()+1, good=[];
    PROV_DATA.forEach(function(p){
      var t=String(p.best_season||"").toLowerCase(), cut=t.search(/tránh/); if(cut>=0) t=t.slice(0,cut);
      var re=/tháng\s*(\d{1,2})(?:\s*[–-]\s*(?:tháng\s*)?(\d{1,2}))?(\s*âm lịch)?/g, r;
      while((r=re.exec(t))){ if(r[3]) continue; var a=+r[1], b=r[2]?+r[2]:a; if(a<1||a>12||b<1||b>12) continue; if(a<=b?(m>=a&&m<=b):(m>=a||m<=b)){ good.push(p); break; } }
    });
    return '<p class="ask-h">Tháng '+m+' đi đâu đẹp</p><p>Theo mùa đẹp trong cẩm nang, tháng này hợp đi:</p>'+
      '<div class="ask-act">'+good.slice(0,8).map(function(p){ return goSeg(p,"tongquan",provLabel(p)); }).join("")+'</div>'+
      '<p class="small">Để gợi ý sát hơn, hỏi kèm: đi từ đâu, mấy ngày, ngân sách khoảng bao nhiêu. Ví dụ: "từ Sài Gòn đi Đà Lạt 3 ngày hết bao nhiêu".</p>';
  }
  window.askQuick=function(q){
    var qn=norm(q); if(!qn) return "";
    var want=wantOf(qn), intent=intentOf(qn), rest=restOf(q);
    /* hỏi giá/giờ/mùa, hoặc gõ đúng tên 1 địa danh/món: trả thẳng mục đó */
    /* đảo có tuyến riêng (Cô Tô, Lý Sơn, Nam Du…) hoặc đảo cấm khách (Bình Ba) */
    var isle=typeof btIsleFor==="function"?btIsleFor(q):null;
    if(isle && (isle.ban || !want.length || intent)) return answerIsle(isle,intent);
    var ih=(want.length||!intent)?itemHit(rest):null;
    if(ih && !(intent==="chiphi" && /\bngay\b/.test(qn))) return answerItem(ih,want);
    if(isle) return answerIsle(isle,intent);
    /* nơi hỏi là một khu không phải thủ phủ (Quy Nhơn, Phú Quốc, Măng Đen…): trả theo khu */
    var area=typeof btAreaFor==="function"?btAreaFor(q):null;
    if(area && !isMainArea(area)){
      if(want.indexOf("season")>=0 && !intent) intent="mua";
      return answerArea(area,intent,want,qn);
    }
    var hit=findProv(qn);
    if(hit && hit.place && intent && ["diden","dilai","mua","chiphi","mang"].indexOf(intent)>=0 && typeof btAreaOfPlace==="function"){
      var pa=btAreaOfPlace(hit.prov,hit.place);
      if(pa) return answerArea(pa,intent,want,qn,hit.place.name.split(" (")[0]);
    }
    if(hit){
      if(want.indexOf("season")>=0 && !intent) intent="mua";
      return answerProv(hit,intent);
    }
    if(/\b(nen di dau|di dau choi|cuoi tuan|di choi dau|du lich dau|di dau dep)\b/.test(qn) || (intent==="didau" && rest.split(" ").length<=2)) return answerGeneral();
    if(want.length) return '<p>App chưa có thông tin này. Thử ghi đúng tên địa danh hoặc tỉnh, ví dụ: "giá vé Bà Nà", "Phong Nha mấy giờ mở cửa", "Hà Giang tháng mấy đẹp".</p>';
    return answerFaq(qn);
  };
  window.btFindProv=function(q){ return findProv(norm(q)); };
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
      '<div id="askOut" hidden></div><p class="small" style="margin:8px 0 0">Trả lời ngay từ dữ liệu cẩm nang trên máy. Hiểu cả tên tỉnh cũ và tên quen gọi.</p></div>';
  }
  function provFaq(p){
    var name=provLabel(p), qs=[
      ["Đi "+name+" bằng gì?","diden"],["Ăn gì ở "+name+"?","angi"],["Ở đâu ở "+name+", giá bao nhiêu?","odau"],
      ["Đi "+name+" mùa nào đẹp?","mua"],["Đi "+name+" 3 ngày 2 đêm hết bao nhiêu?","chiphi"],["Trời mưa ở "+name+" thì đi đâu?","mua_mua"],["Số khẩn cấp ở "+name+"?","khancap"]
    ];
    return '<h2 class="sec-title">Hỏi nhanh về '+esc(name)+'</h2>'+qs.map(function(x){
      return '<details class="faq-item faq-d"><summary>'+esc(x[0])+'</summary><div class="ask-ans">'+answerProv({prov:p,old:"",place:null},x[1])+'</div></details>';
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
