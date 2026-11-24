/* Làm gọn chữ hiển thị: dữ liệu gốc giữ ghi chú nghiên cứu (nguồn, "một số nguồn ghi khác",
   "mâu thuẫn", tên trang web) để đội kiểm chứng; người dùng app chỉ thấy thông tin dùng được.
   Chạy 1 lần lúc tải, sau prov-data/racehub-places/lam-giau. Không đụng trường nguồn (source, sources...). */
(function(){
  var SKIP={source:1,sources:1,review_m_src:1,review_m_date:1,phoneSrc:1,src:1,id:1,checked:1,from_racehub:1,url:1,gan:1};
  var BAD0=/nguồn(?!\s*(gốc|cội))|có nguồn ghi|theo\s+[\w.-]+\.(vn|com|net|org|info)\b|[\w-]+\.(vn|com|net|org)\b|mâu thuẫn|wikipedia|\bfile\b|cần kiểm lại|tra cứu được|bài viết|báo\s+\S+\s+\d{1,2}\/\d{1,2}/i;
  var BAD={test:function(x){ return BAD0.test(String(x).replace(/về nguồn|tại nguồn/gi,"")); }};
  /* Lọc nhanh: chuỗi không chứa từ khóa nào thì chỉ cần dọn dấu câu, khỏi chạy chuỗi regex (tiết kiệm ~0,5 giây lúc tải trên máy chậm) */
  var TRIG=/nguồn|file|tọa độ xấp xỉ|mâu thuẫn|wikipedia|\.(vn|com|net|org|info)\b|cần kiểm lại|tra cứu được|bài viết|báo\s/i;
  /* ngoặc rỗng còn sót sau khi bỏ ghi chú nguồn, vd "100.000đ/phần (theo 1 nguồn)" -> "100.000đ/phần" */
  function boNgoacRong(t){ return t.replace(/(^|[.;]\s*|\s)Tọa độ\s[^.;]*([.;]|$)/g,"$1").replace(/[;,]\s*$/,"").trim().replace(/\s*\(\s*[;,]?\s*\)/g,"").replace(/\s*\(\s+[^()]*\)/g,"").replace(/\s*\(theo\s+(VnExpress|Tuổi Trẻ|Thanh Niên|Dân trí|TikTok|Facebook|Google|Traveloka|Agoda|Booking|Klook|Tripadvisor|Frommer's|Vexere|Lonely Planet|OpenStreetMap)[^()]*\)/gi,""); }
  function clean(s){
    if(typeof s!=="string") return s;
    if(!TRIG.test(s)) return boNgoacRong(s).replace(/[;,]\./g,".").trim()||s;
    var t=s.replace(/\s*Tọa độ xấp xỉ[^.;]*[.;]?/gi,"").replace(/\s*theo\s+(1|một|nhiều|các)\s+nguồn( tra được| đã tra)?/gi,"").replace(/có nguồn ghi ([^,;]+), có nguồn ghi /gi,"$1 hoặc ").replace(/\s*theo (đa số |nhiều |các |một số |1 )?nguồn( tra được| đã tra)?/gi,"").replace(/(được )?nhiều nguồn gọi là/gi,"được gọi là").replace(/các nguồn mâu thuẫn/gi,"chưa thống nhất").replace(/có nguồn chê/gi,"có người chê").replace(/có nguồn gh?i/gi,"có nơi ghi").replace(/\s*[—–]\s*[^—–.]*\bfile\b[^.]*/gi,"").replace(/\s*tên phường\/xã không khớp hẳn file gốc[^.]*\./gi,".").replace(/\s*—?\s*xem kỹ cảnh báo trong file gốc/gi,"").replace(/\s*\(?đã có [^.;]*trong file chỗ ở\)?/gi,"");
    if(!BAD.test(t)) return boNgoacRong(t).replace(/[;,]\./g,".").trim()||s;
    var prev;
    /* 1) bỏ ngoặc chứa ghi chú nghiên cứu (lặp để xử lý ngoặc lồng) */
    do{ prev=t; t=t.replace(/\s*\(([^()]*)\)/g,function(m,inner){ return BAD.test(inner)?"":m; }); }while(t!==prev);
    /* 2) bỏ câu chứa ghi chú nghiên cứu */
    if(BAD.test(t)){
      var sen=t.replace(/([.!?])\s+(?=[A-ZÀ-Ỹ0-9~])/g,"$1\u0001").split("\u0001");
      if(sen.length>1){ var keep=sen.filter(function(x,i){ return i===0 || !BAD.test(x); }); t=keep.join(" "); }
    }
    /* 3) bỏ vế sau " — " hoặc "; " nếu là ghi chú nghiên cứu (giữ vế đầu) */
    if(BAD.test(t)){
      var parts=t.split(/(\s+—\s+|;\s+)/), out=parts[0];
      for(var i=1;i<parts.length;i+=2){ var seg=parts[i+1]||""; if(!BAD.test(seg)) out+=parts[i]+seg; }
      t=out;
    }
    t=boNgoacRong(t).replace(/[;,]\./g,".").replace(/\s{2,}/g," ").replace(/\s+([,.;])/g,"$1").replace(/[;,—\s]+$/,"").trim();
    return t||s;
  }
  function walk(o,depth){
    if(!o || typeof o!=="object" || depth>8) return;
    if(Array.isArray(o)){ for(var i=0;i<o.length;i++){ if(typeof o[i]==="string") o[i]=clean(o[i]); else walk(o[i],depth+1); } return; }
    for(var k in o){ if(!Object.prototype.hasOwnProperty.call(o,k) || SKIP[k]) continue;
      if(typeof o[k]==="string") o[k]=clean(o[k]); else walk(o[k],depth+1); }
  }
  window.lamSachChu=clean;
  window.lamSachDuLieu=function(o){ walk(o,0); };
  if(typeof PROV_DATA!=="undefined") walk(PROV_DATA,0);
})();
