/* Đóng góp của người dùng + admin duyệt.
   Tài khoản và dữ liệu nằm ở dự án Neon riêng "BuiTrip" (Neon Auth + Data API, phân quyền bằng RLS).
   SDK @neon/neon-js 0.10.2 đóng gói sẵn ở vendor/neon.js, chỉ tải khi cần (đăng nhập, gửi, duyệt). */
(function(){
  /* Đăng nhập đi qua cùng tên miền (/auth/* chuyển tiếp tới Neon Auth, app/vercel.json "rewrites"): cookie phiên là cookie của
     chính app, Safari/iPhone không chặn như cookie bên thứ ba. Chạy ở máy (localhost) thì gọi thẳng Neon Auth. */
  var AUTH_NEON="https://ep-noisy-cake-aolzjjha.neonauth.c-2.ap-southeast-1.aws.neon.tech/neondb/auth";
  var CFG={
    auth:(/^https:\/\/[^/]+\.vercel\.app$|^https:\/\/(www\.)?buitrip\./.test(location.origin)?location.origin+"/auth":AUTH_NEON),
    data:"https://ep-noisy-cake-aolzjjha.apirest.c-2.ap-southeast-1.aws.neon.tech/neondb/rest/v1"
  };
  var FLAG="bt_signed";
  var client=null, sdkP=null, me=null, isAdmin=false;
  var KINDS=[["sua_thong_tin","Sửa thông tin đang sai"],["bao_loi","Báo địa điểm đóng cửa, nguy hiểm, không còn"],["anh","Gửi link ảnh"],["dia_danh_moi","Gợi ý địa danh mới"],["mon_moi","Thêm món ăn, quán ăn mới"],["cho_o_moi","Thêm chỗ ở, khách sạn mới"],["phuong_tien_moi","Thêm phương tiện, tuyến xe tàu mới"]];
  /* Trường có cấu trúc của 4 loại "thêm mới" (server kiểm lại: neon/003_admin_du_lieu.sql, contrib_validate) */
  var LOAI_O=[["khach_san","Khách sạn"],["homestay","Homestay"],["resort","Resort"],["nha_nghi","Nhà nghỉ"],["hostel","Hostel"],["khac","Khác"]];
  var LOAI_XE=[["xe_khach","Xe khách"],["tau_hoa","Tàu hỏa"],["tau_thuy","Tàu thủy, thuyền, ca nô"],["may_bay","Máy bay"],["xe_may","Thuê xe máy"],["xe_buyt","Xe buýt"],["khac","Khác"]];
  var SF={
    dia_danh_moi:[["ten","Tên địa danh",1],["dia_chi","Địa chỉ"],["lat","Vĩ độ (vd 21.0285)",0,"so"],["lng","Kinh độ (vd 105.8542)",0,"so"],["gia_tu","Giá vé từ (đồng)",0,"so"],["gia_den","Giá vé đến (đồng)",0,"so"],["gio","Giờ mở cửa"],["vi_sao","Vì sao nên đi",0,"dai"],["link","Link ảnh hoặc nguồn",0,"url"]],
    mon_moi:[["ten","Tên món",1],["quan","Quán gợi ý"],["dia_chi","Địa chỉ quán"],["gia_tu","Giá từ (đồng)",0,"so"],["gia_den","Giá đến (đồng)",0,"so"],["mo_ta","Mô tả ngắn",0,"dai"],["link","Link ảnh hoặc nguồn",0,"url"]],
    cho_o_moi:[["ten","Tên chỗ ở",1],["loai","Loại",1,LOAI_O],["dia_chi","Địa chỉ"],["gia_tu","Giá/đêm từ (đồng)",0,"so"],["gia_den","Giá/đêm đến (đồng)",0,"so"],["tien_ich","Tiện ích chính",0,"dai"],["link","Link đặt phòng hoặc nguồn",0,"url"]],
    phuong_tien_moi:[["loai","Loại phương tiện",1,LOAI_XE],["tu","Đi từ",1],["den","Đến",1],["gia_tu","Giá từ (đồng)",0,"so"],["gia_den","Giá đến (đồng)",0,"so"],["thoi_gian","Thời gian đi"],["tan_suat","Tần suất (vd 30 phút/chuyến)"],["don_vi","Đơn vị vận hành"],["link","Link hoặc nguồn",0,"url"]]
  };
  var FIELDS=[["gia","Giá vé / chi phí"],["gio","Giờ mở cửa"],["dia_chi","Địa chỉ / tọa độ"],["dien_thoai","Số điện thoại"],["cach_di","Cách đi"],["mo_ta","Mô tả"],["khac","Khác"]];
  var ST={cho_duyet:"Chờ duyệt",da_duyet:"Đã duyệt",tu_choi:"Từ chối",da_nhap:"Đã đưa vào app"};
  function lbl(arr,k){ for(var i=0;i<arr.length;i++) if(arr[i][0]===k) return arr[i][1]; return k||""; }
  function lsGet(k){ try{ return localStorage.getItem(k); }catch(e){ return null; } }
  function lsSet(k,v){ try{ if(v==null) localStorage.removeItem(k); else localStorage.setItem(k,v); }catch(e){} }
  function fmtTime(t){ var d=new Date(t); return isNaN(d)?"":d.toLocaleDateString("vi-VN")+" "+d.toLocaleTimeString("vi-VN",{hour:"2-digit",minute:"2-digit"}); }

  function loadSdk(){
    if(sdkP) return sdkP;
    sdkP=new Promise(function(res,rej){
      var s=document.createElement("script"); s.src="vendor/neon.js"; s.async=true;
      s.onload=function(){ try{ client=window.BTNeon.createClient({auth:{url:CFG.auth},dataApi:{url:CFG.data}}); res(client); }catch(e){ rej(e); } };
      s.onerror=function(){ sdkP=null; rej(new Error("Không tải được thư viện đăng nhập")); };
      document.head.appendChild(s);
    });
    return sdkP;
  }
  function refreshMe(){
    return loadSdk().then(function(c){ return c.auth.getSession(); }).then(function(r){
      var d=r&&r.data; me=d&&d.session&&d.user?d.user:null;
      lsSet(FLAG,me?"1":null);
      if(!me){ isAdmin=false; return null; }
      return client.rpc("is_admin").then(function(x){ isAdmin=!!(x&&x.data===true); return me; },function(){ isAdmin=false; return me; });
    });
  }

  /* ---------- khung sheet ---------- */
  function sheet(html){
    var v=document.getElementById("dgVeil");
    if(!v){
      v=document.createElement("div"); v.id="dgVeil"; v.className="modal-veil";
      v.innerHTML='<div class="modal dg-modal" role="dialog" aria-modal="true" aria-labelledby="dgTitle"><div id="dgBody"></div></div>';
      v.addEventListener("click",function(e){ if(e.target===v) closeSheet(); });
      document.body.appendChild(v);
    }
    document.getElementById("dgBody").innerHTML=html;
    v.classList.add("show");
  }
  function closeSheet(){ var v=document.getElementById("dgVeil"); if(v) v.classList.remove("show"); }
  window.dgClose=closeSheet;
  function busy(msg){ sheet('<h3 id="dgTitle">'+esc(msg)+'</h3><p class="muted">Đang tải…</p>'); }
  function errBox(m){ return '<p class="dg-err" role="alert">'+esc(m)+'</p>'; }

  /* ---------- đăng nhập ---------- */
  var pending=null; /* việc cần làm sau khi đăng nhập */
  function loginHtml(mode,msg){
    var up=mode==="up";
    return '<h3 id="dgTitle">'+(up?"Tạo tài khoản BuiTrip":"Đăng nhập BuiTrip")+'</h3>'+
      '<p class="muted" style="margin-top:0">Cần tài khoản để gửi đóng góp và theo dõi trạng thái duyệt. Tài khoản BuiTrip riêng, không dùng chung với app khác.</p>'+
      '<div class="notebox" style="margin:0 0 12px"><b>Không muốn tạo tài khoản?</b> Báo sai giá, giờ, địa chỉ qua mục Hỗ trợ của nút Hỏi, không cần đăng nhập. <button type="button" class="linkbtn" onclick="dgClose();if(window.tlOpen)tlOpen(\'ht\')">Mở mục Hỗ trợ</button></div>'+
      '<button class="btn btn-primary btn-block" onclick="dgGoogle()">Tiếp tục với Google</button>'+
      '<div class="dg-or"><span>hoặc dùng email</span></div>'+
      '<form class="rv-form" onsubmit="return dgEmail(event,\''+(up?"up":"in")+'\')">'+
      (up?'<div class="field"><label for="dgName">Tên hiển thị</label><input id="dgName" required maxlength="60" autocomplete="name"></div>':'')+
      '<div class="field"><label for="dgMail">Email</label><input id="dgMail" type="email" required autocomplete="email"></div>'+
      '<div class="field"><label for="dgPass">Mật khẩu</label><input id="dgPass" type="password" required minlength="8" autocomplete="'+(up?"new-password":"current-password")+'"></div>'+
      (msg?errBox(msg):'')+
      '<button class="btn btn-ghost btn-block" type="submit">'+(up?"Tạo tài khoản":"Đăng nhập")+'</button></form>'+
      '<p class="small" style="text-align:center;margin-top:12px"><a href="#" onclick="dgLogin(\''+(up?"in":"up")+'\');return false">'+(up?"Đã có tài khoản? Đăng nhập":"Chưa có tài khoản? Tạo mới")+'</a></p>'+
      '<button class="btn btn-ghost btn-block" style="margin-top:6px" onclick="dgClose()">Để sau</button>';
  }
  window.dgLogin=function(mode,msg){ sheet(loginHtml(mode||"in",msg)); };
  window.dgGoogle=function(){
    lsSet("bt_after_login",pending?JSON.stringify(pending):null);
    busy("Đang chuyển sang Google");
    loadSdk().then(function(c){
      var back=location.origin+location.pathname+location.hash;
      return c.auth.signIn.social({provider:"google",callbackURL:back});
    }).catch(function(e){ dgLogin("in",e.message||"Không đăng nhập được"); });
  };
  window.dgEmail=function(ev,mode){
    ev.preventDefault();
    var mail=document.getElementById("dgMail").value.trim(), pass=document.getElementById("dgPass").value;
    var nameEl=document.getElementById("dgName"), name=nameEl?nameEl.value.trim():"";
    busy(mode==="up"?"Đang tạo tài khoản":"Đang đăng nhập");
    loadSdk().then(function(c){
      return mode==="up"?c.auth.signUp.email({email:mail,password:pass,name:name}):c.auth.signIn.email({email:mail,password:pass});
    }).then(function(r){
      if(r&&r.error) throw new Error(viErr(r.error.message));
      return refreshMe();
    }).then(function(){ afterLogin(); }).catch(function(e){ dgLogin(mode,e.message||"Không đăng nhập được"); });
    return false;
  };
  function viErr(m){
    m=String(m||"");
    if(/invalid.*(password|credential)/i.test(m)) return "Sai email hoặc mật khẩu.";
    if(/already exists|already registered/i.test(m)) return "Email này đã có tài khoản, chọn Đăng nhập.";
    if(/password.*(short|least)/i.test(m)) return "Mật khẩu cần ít nhất 8 ký tự.";
    return m||"Có lỗi, thử lại.";
  }
  function afterLogin(){
    renderAcct();
    /* máy chủ báo đăng nhập được nhưng trình duyệt không giữ phiên: nói rõ, không báo "Đã đăng nhập" sai */
    if(!me){ pending=null; sheet('<h3 id="dgTitle">Chưa giữ được phiên đăng nhập</h3><p>Tài khoản và mật khẩu đúng, nhưng trình duyệt không lưu được phiên đăng nhập. Tải lại trang rồi đăng nhập lại. Nếu vẫn bị, tắt chế độ duyệt riêng tư hoặc thử trình duyệt khác, rồi báo cho BuiTrip qua mục Hỗ trợ.</p><button class="btn btn-ghost btn-block" onclick="dgClose()">Đóng</button>'); return; }
    var p=pending; pending=null;
    if(p&&p.t==="form") openForm(p.prov,p.item,p.kind);
    else if(p&&p.t==="admin"){ closeSheet(); location.hash="#/admin"; }
    else if(p&&p.t==="trang-admin"){ closeSheet(); if(window.btAdminOpen) btAdminOpen(); }
    else { closeSheet(); if(typeof toast==="function") toast("Đã đăng nhập"); }
  }
  window.dgLogout=function(){
    loadSdk().then(function(c){ return c.auth.signOut(); }).catch(function(){}).then(function(){
      me=null; isAdmin=false; lsSet(FLAG,null); renderAcct(); if(typeof toast==="function") toast("Đã đăng xuất");
    });
  };
  function needLogin(next){
    pending=next; busy("Đang kiểm tra tài khoản");
    refreshMe().then(function(u){ if(u) afterLogin(); else dgLogin("in"); }).catch(function(e){ sheet('<h3 id="dgTitle">Chưa kết nối được</h3>'+errBox(e.message||"Lỗi mạng")+'<button class="btn btn-ghost btn-block" onclick="dgClose()">Đóng</button>'); });
  }

  /* ---------- form đóng góp ---------- */
  function findItem(provId,itemId){
    var p=typeof provById==="function"?provById(provId):null; if(!p||!itemId) return null;
    var all=(p.places||[]).concat(p.stays||[],p.dishes||[]);
    for(var i=0;i<all.length;i++) if(all[i].id===itemId) return all[i];
    return null;
  }
  window.dgContribute=function(provId,itemId,kind){ needLogin({t:"form",prov:provId,item:itemId||null,kind:kind||null}); };
  function openForm(provId,itemId,kind){
    var p=typeof provById==="function"?provById(provId):null, it=findItem(provId,itemId);
    kind=kind||(it?"sua_thong_tin":"dia_danh_moi");
    var title=it?it.name:(p?p.name:"BuiTrip");
    var provSel=p?'':'<div class="field"><label for="dgProvSel">Tỉnh/thành *</label><select id="dgProvSel" required><option value="">Chọn tỉnh/thành</option>'+(typeof PROV_DATA!=="undefined"?PROV_DATA:[]).map(function(x){ return '<option value="'+esc(x.id)+'">'+esc(x.name)+'</option>'; }).join("")+'</select></div>';
    sheet('<h3 id="dgTitle">Đóng góp: '+esc(title)+'</h3>'+
      '<p class="muted" style="margin-top:0">'+esc(p?p.name:"")+(it?' · mã '+esc(it.id):'')+'. Bụi Code đọc và kiểm lại trước khi đưa vào app.</p>'+
      '<form class="rv-form" onsubmit="return dgSubmit(event)">'+
      provSel+'<input type="hidden" id="dgProv" value="'+esc(provId||"")+'"><input type="hidden" id="dgItem" value="'+esc(itemId||"")+'"><input type="hidden" id="dgItemName" value="'+esc(it?it.name:"")+'">'+
      '<div class="field"><label for="dgKind">Loại đóng góp</label><select id="dgKind" onchange="dgKindChg()">'+KINDS.map(function(k){ return '<option value="'+k[0]+'"'+(k[0]===kind?" selected":"")+'>'+k[1]+'</option>'; }).join("")+'</select></div>'+
      '<div class="field" id="dgFieldWrap"'+(kind==="sua_thong_tin"?"":' hidden')+'><label for="dgField">Mục cần sửa</label><select id="dgField">'+FIELDS.map(function(f){ return '<option value="'+f[0]+'">'+f[1]+'</option>'; }).join("")+'</select></div>'+
      '<div class="field" id="dgValueWrap"'+(SF[kind]?' hidden':'')+'><label for="dgValue" id="dgValueLbl">'+valueLabel(kind)+'</label><textarea id="dgValue" rows="4" maxlength="2000"></textarea></div>'+
      '<div id="dgStruct">'+structHtml(kind)+'</div>'+
      '<div class="field" id="dgSrcWrap"'+(SF[kind]?' hidden':'')+'><label for="dgSrc">Nguồn (link, không bắt buộc)</label><input id="dgSrc" type="url" maxlength="500" placeholder="https://"></div>'+
      '<div id="dgMsg"></div>'+
      '<div class="row"><button class="btn btn-ghost" type="button" onclick="dgClose()">Hủy</button><button class="btn btn-primary" type="submit">Gửi</button></div></form>'+
      '<p class="small" style="margin-top:10px">Đang đăng nhập: '+esc(me&&(me.name||me.email)||"")+' · <a href="#" onclick="dgMine();return false">Đóng góp của tôi</a></p>');
  }
  function structHtml(k){
    var f=SF[k]; if(!f) return "";
    return f.map(function(x){
      var id="dgS_"+x[0], lab=esc(x[1])+(x[2]?" *":"");
      if(Array.isArray(x[3])) return '<div class="field"><label for="'+id+'">'+lab+'</label><select id="'+id+'"><option value="">Chọn</option>'+x[3].map(function(o){ return '<option value="'+o[0]+'">'+esc(o[1])+'</option>'; }).join("")+'</select></div>';
      if(x[3]==="dai") return '<div class="field"><label for="'+id+'">'+lab+'</label><textarea id="'+id+'" rows="3" maxlength="600"></textarea></div>';
      return '<div class="field"><label for="'+id+'">'+lab+'</label><input id="'+id+'" '+(x[3]==="so"?'type="number" inputmode="decimal" step="any" min="0"':x[3]==="url"?'type="url" placeholder="https://" maxlength="500"':'maxlength="300"')+'></div>';
    }).join("");
  }
  /* đọc trường có cấu trúc; trả {data} hoặc {err} */
  function structRead(k){
    var f=SF[k], d={}; if(!f) return {data:null};
    for(var i=0;i<f.length;i++){
      var x=f[i], el=document.getElementById("dgS_"+x[0]), v=el?String(el.value||"").trim():"";
      if(!v){ if(x[2]) return {err:"Cần điền: "+x[1]}; continue; }
      if(x[3]==="so"){ var n=Number(v.replace(",",".")); if(!isFinite(n)) return {err:x[1]+" phải là số"}; if((x[0]==="gia_tu"||x[0]==="gia_den")&&n<0) return {err:"Giá không âm"}; d[x[0]]=n; }
      else if(x[3]==="url"){ if(!/^https?:\/\//i.test(v)) return {err:"Link phải bắt đầu bằng http:// hoặc https://"}; d[x[0]]=v; }
      else d[x[0]]=v;
    }
    if(d.gia_tu!=null&&d.gia_den!=null&&d.gia_tu>d.gia_den) return {err:"Giá từ lớn hơn giá đến"};
    return {data:d};
  }
  function valueLabel(k){
    return k==="sua_thong_tin"?"Thông tin đúng là":k==="bao_loi"?"Mô tả vấn đề":k==="anh"?"Link ảnh (ảnh do anh/chị chụp hoặc có giấy phép dùng lại)":"Tên, địa chỉ, vì sao nên đi";
  }
  window.dgKindChg=function(){
    var k=document.getElementById("dgKind").value;
    document.getElementById("dgFieldWrap").hidden=k!=="sua_thong_tin";
    document.getElementById("dgValueLbl").textContent=valueLabel(k);
    document.getElementById("dgValueWrap").hidden=!!SF[k]; document.getElementById("dgSrcWrap").hidden=!!SF[k];
    document.getElementById("dgStruct").innerHTML=structHtml(k);
  };
  window.dgSubmit=function(ev){
    ev.preventDefault();
    var k=document.getElementById("dgKind").value, src=document.getElementById("dgSrc").value.trim();
    var ps=document.getElementById("dgProvSel"), pid=document.getElementById("dgProv").value||(ps?ps.value:"");
    if(!pid){ document.getElementById("dgMsg").innerHTML=errBox("Chọn tỉnh/thành."); return false; }
    var sr=structRead(k); if(sr.err){ document.getElementById("dgMsg").innerHTML=errBox(sr.err); return false; }
    var row={kind:k, prov_id:pid, place_id:SF[k]?null:(document.getElementById("dgItem").value||null),
      place_name:SF[k]?null:(document.getElementById("dgItemName").value||null), field:k==="sua_thong_tin"?document.getElementById("dgField").value:null,
      value:SF[k]?"(có cấu trúc)":document.getElementById("dgValue").value.trim(), source_url:SF[k]?null:(src||null)};
    if(sr.data) row.data=sr.data;
    if(row.value.length<3){ document.getElementById("dgMsg").innerHTML=errBox("Nội dung quá ngắn."); return false; }
    if(src && !/^https?:\/\//i.test(src)){ document.getElementById("dgMsg").innerHTML=errBox("Nguồn phải là link bắt đầu bằng http:// hoặc https://"); return false; }
    var btn=ev.target.querySelector('[type=submit]'); btn.disabled=true; btn.textContent="Đang gửi…";
    loadSdk().then(function(c){ return c.from("contributions").insert(row); }).then(function(r){
      if(r&&r.error) throw new Error(/30 đóng góp/.test(r.error.message)?"Quá 30 đóng góp trong 24 giờ, thử lại sau.":"Chưa gửi được: "+r.error.message.replace(/^.*?:\s*(?=[A-ZĐÀ-Ỹ])/,""));
      sheet('<h3 id="dgTitle">Đã nhận đóng góp</h3><p>Cảm ơn anh/chị. Đóng góp đang ở trạng thái <b>Chờ duyệt</b>; theo dõi trong Tài khoản → Đóng góp của tôi.</p>'+
        '<div class="row"><button class="btn btn-ghost" onclick="dgMine()">Đóng góp của tôi</button><button class="btn btn-primary" onclick="dgClose()">Xong</button></div>');
    }).catch(function(e){ btn.disabled=false; btn.textContent="Gửi"; document.getElementById("dgMsg").innerHTML=errBox(e.message); });
    return false;
  };

  /* ---------- đóng góp của tôi ---------- */
  window.dgMine=function(){
    if(!me) return needLogin({t:"mine"});
    busy("Đóng góp của tôi");
    client.from("contributions").select("id,kind,prov_id,place_name,field,value,status,review_note,created_at").order("created_at",{ascending:false}).limit(100).then(function(r){
      if(r.error) throw new Error(r.error.message);
      var rows=r.data||[];
      sheet('<h3 id="dgTitle">Đóng góp của tôi ('+rows.length+')</h3>'+(rows.length?'<div class="dg-list">'+rows.map(function(x){
        var p=typeof provById==="function"?provById(x.prov_id):null;
        return '<div class="dg-item"><div class="dg-top"><b>'+esc(x.place_name||(p?p.name:x.prov_id))+'</b><span class="dg-st st-'+esc(x.status)+'">'+esc(ST[x.status]||x.status)+'</span></div>'+
          '<p class="small">'+esc(lbl(KINDS,x.kind))+(x.field?' · '+esc(lbl(FIELDS,x.field)):'')+' · '+esc(fmtTime(x.created_at))+'</p><p>'+esc(x.value)+'</p>'+
          (x.review_note?'<p class="small"><b>Phản hồi:</b> '+esc(x.review_note)+'</p>':'')+'</div>';
      }).join("")+'</div>':'<p class="muted">Chưa có đóng góp nào. Mở một địa danh, bấm "Gửi đóng góp" để bắt đầu.</p>')+
      '<button class="btn btn-ghost btn-block" style="margin-top:12px" onclick="dgClose()">Đóng</button>');
    }).catch(function(e){ sheet('<h3 id="dgTitle">Đóng góp của tôi</h3>'+errBox(e.message)+'<button class="btn btn-ghost btn-block" onclick="dgClose()">Đóng</button>'); });
  };

  /* ---------- admin duyệt ---------- */
  /* Duyệt đóng góp đã chuyển sang trang admin (#/admin, js/admin.js): duyệt, nhập vào app 1 chạm, sửa dữ liệu, nhật ký */
  window.dgAdmin=function(){ location.hash="#/admin"; };

  /* ---------- admin: tin hỗ trợ (svc.support qua hàm admin_support) ---------- */
  var supRows=[], SUP={moi:"Mới",da_tra_loi:"Đã trả lời",dong:"Đã xong"};
  function openSupport(status){
    if(!isAdmin){ sheet('<h3 id="dgTitle">Không có quyền</h3><button class="btn btn-ghost btn-block" onclick="dgClose()">Đóng</button>'); return; }
    busy("Tin hỗ trợ");
    client.rpc("admin_support",{p_status:status||null}).then(function(r){
      if(r.error) throw new Error(r.error.message);
      supRows=r.data||[];
      var tabs=[["moi","Mới"],["da_tra_loi","Đã trả lời"],["dong","Đã xong"],["","Tất cả"]];
      sheet('<h3 id="dgTitle">Tin hỗ trợ</h3><div class="chiprow chiprow-scroll" style="margin-bottom:10px">'+tabs.map(function(t){
        return '<button class="chip'+((status||"")===t[0]?" on":"")+'" onclick="dgSupport(\''+t[0]+'\')">'+t[1]+'</button>'; }).join("")+'</div>'+
        (supRows.length?'<div class="dg-list">'+supRows.map(function(x,i){
          var mail=/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(x.contact||"");
          return '<div class="dg-item"><div class="dg-top"><b>'+esc(x.name||"(không tên)")+'</b><span class="dg-st st-'+esc(x.status)+'">'+esc(SUP[x.status]||x.status)+'</span></div>'+
            '<p class="small">'+esc(fmtTime(x.at))+(x.contact?' · Liên hệ: '+(mail?'<a href="mailto:'+esc(x.contact)+'?subject='+encodeURIComponent("BuiTrip trả lời")+'">'+esc(x.contact)+'</a>':esc(x.contact)):' · Không để liên hệ (chỉ xem trả lời trong app)')+(x.page?' · Trang '+esc(x.page):'')+'</p>'+
            '<p style="white-space:pre-wrap">'+esc(x.msg)+'</p>'+
            '<textarea id="supRe'+i+'" rows="3" maxlength="2000" placeholder="Trả lời (hiện trong app của người gửi)">'+esc(x.reply||"")+'</textarea>'+
            '<div class="dg-acts"><button class="btn btn-ghost" onclick="dgSupReply('+i+',\'dong\')">Đánh dấu xong</button><button class="btn btn-primary" onclick="dgSupReply('+i+',\'da_tra_loi\')">Gửi trả lời</button></div></div>';
        }).join("")+'</div>':'<p class="muted">Không có tin nào ở mục này.</p>')+
        '<button class="btn btn-ghost btn-block" style="margin-top:12px" onclick="dgClose()">Đóng</button>');
      window._dgSupStatus=status||"";
    }).catch(function(e){ sheet('<h3 id="dgTitle">Tin hỗ trợ</h3>'+errBox(e.message)+'<button class="btn btn-ghost btn-block" onclick="dgClose()">Đóng</button>'); });
  }
  window.dgSupport=function(s){ if(!me) return needLogin({t:"admin"}); openSupport(s); };
  window.dgSupReply=function(i,status){
    var x=supRows[i]; if(!x) return;
    var re=((document.getElementById("supRe"+i)||{}).value||"").trim();
    if(status==="da_tra_loi"&&!re){ if(typeof toast==="function") toast("Nhập nội dung trả lời"); return; }
    client.rpc("admin_support_reply",{p_id:x.id,p_reply:re,p_status:status}).then(function(r){
      if(r.error) throw new Error(r.error.message);
      if(typeof toast==="function") toast(SUP[status]);
      openSupport(window._dgSupStatus);
    }).catch(function(e){ if(typeof toast==="function") toast("Lỗi: "+e.message); });
  };

  /* ---------- khối tài khoản ---------- */
  function renderAcct(){
    var head=document.querySelector("#view-account .acct-head"); if(!head) return;
    var b=head.querySelector("b"), p=head.querySelector("p");
    var box=document.getElementById("dgAcct"), av=head.querySelector(".avatar");
    if(av && !av._svg) av._svg=av.innerHTML;
    if(!box){ box=document.createElement("div"); box.id="dgAcct"; box.className="dg-acct"; head.parentNode.insertBefore(box,head.nextSibling); }
    if(typeof TITLES!=="undefined" && TITLES.account){
      TITLES.account[1]=me?"Đã đăng nhập: "+(me.name||me.email||""):"Chưa đăng nhập — dữ liệu giữ trong trình duyệt này";
      if(typeof currentView!=="undefined" && currentView==="account"){ var ts=document.getElementById("topSub"); if(ts) ts.textContent=TITLES.account[1]; }
    }
    if(me){
      b.textContent=me.name||me.email||"Đã đăng nhập";
      if(av){ av.textContent=String(me.name||me.email||"?").trim().charAt(0).toUpperCase(); av.classList.add("has-name"); }
      p.textContent=(me.email||"")+" · Chuyến đi và mục đã lưu vẫn giữ trong trình duyệt này.";
      box.innerHTML='<div class="dg-acts"><button class="btn btn-ghost" onclick="dgContribute(\'\',null,\'dia_danh_moi\')">Gửi đóng góp mới</button><button class="btn btn-ghost" onclick="dgMine()">Đóng góp của tôi</button>'+(isAdmin?'<a class="btn btn-primary" href="#/admin">Trang admin</a><button class="btn btn-ghost" onclick="dgSupport(\'moi\')">Tin hỗ trợ</button>':'')+'<button class="btn btn-ghost" onclick="dgLogout()">Đăng xuất</button></div>';
    } else {
      b.textContent="Chưa đăng nhập";
      if(av && av._svg){ av.innerHTML=av._svg; av.classList.remove("has-name"); }
      p.textContent="Xem cẩm nang và lập chuyến không cần tài khoản. Đăng nhập để gửi đóng góp sửa thông tin, gợi ý địa danh.";
      box.innerHTML='<button class="btn btn-primary btn-block" onclick="dgLogin(\'in\')">Đăng nhập / Tạo tài khoản</button>';
    }
  }
  window.dgRenderAcct=renderAcct;

  /* Nút "Gửi đóng góp" chèn trước "Báo thông tin sai". chia-se.js nạp SAU tệp này và gán lại reportLinkHtml,
     nên bọc khi trang đã nạp xong mọi script (trước đây bọc ngay lúc nạp nên bị ghi đè, nút không hiện). */
  function wrapReport(){
    if(typeof window.reportLinkHtml!=="function"||window.reportLinkHtml._dg) return;
    var _rep=window.reportLinkHtml;
    var f=function(kind,provId,itemId){
      var base=_rep(kind,provId,itemId); if(!base) return base;
      return '<button class="btn btn-primary btn-block dg-btn" style="margin-top:10px" onclick="dgContribute(\''+esc(provId)+'\',\''+esc(itemId)+'\')">Gửi đóng góp</button><p class="small" style="margin:4px 0 0">Sửa giá, giờ, địa chỉ hoặc gợi ý món, chỗ ở, phương tiện mới. Cần đăng nhập, theo dõi được trạng thái duyệt.</p>'+base;
    };
    f._dg=1; window.reportLinkHtml=f;
    try{ reportLinkHtml=f; }catch(e){}
  }
  if(document.readyState==="loading") document.addEventListener("DOMContentLoaded",wrapReport); else setTimeout(wrapReport,0);
  window.BTDG={ sdk:loadSdk, refreshMe:refreshMe, me:function(){ return me; }, isAdmin:function(){ return isAdmin; }, needLogin:function(next){ needLogin(next); }, login:function(){ dgLogin("in"); }, KINDS:KINDS, FIELDS:FIELDS, ST:ST, LOAI_O:LOAI_O, LOAI_XE:LOAI_XE, fmtTime:fmtTime };

  renderAcct();
  /* Quay về từ Google hoặc đã đăng nhập trước đó: tải SDK để khôi phục phiên */
  var back=/neon_auth_session_verifier/.test(location.search);
  if(back || lsGet(FLAG)){
    refreshMe().then(function(){
      renderAcct();
      if(back){
        var p=null; try{ p=JSON.parse(lsGet("bt_after_login")||"null"); }catch(e){}
        lsSet("bt_after_login",null);
        if(me){ pending=p; afterLogin(); }
      }
    }).catch(function(){});
  }
})();
