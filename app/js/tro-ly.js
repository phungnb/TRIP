/* Nút nổi "Trợ lý" trên mọi trang: 2 thẻ
   - Hỏi trợ lý AI (Gemini qua /api/hoi, nhớ 3 lượt hỏi gần nhất để hỏi nối tiếp)
   - Hỗ trợ: gửi tin cho đội BuiTrip (/api/hotro, lưu Neon), xem trả lời ngay trong app; kèm thư buitrip.hotro@gmail.com */
(function(){
  var EMAIL=(typeof SUPPORT_EMAIL!=="undefined"&&SUPPORT_EMAIL)||"buitrip.hotro@gmail.com";
  var KEY_CHAT="bt_chat", KEY_TOK="bt_hotro_toks", KEY_DAY="buitrip_ai_day", LIMIT=20;
  var st={tab:"ai", on:null, busy:false, prov:null};
  function e(s){ return typeof esc==="function"?esc(s):String(s==null?"":s).replace(/[&<>"']/g,function(c){ return {"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]; }); }
  function ss(k,v){ try{ if(v===undefined) return JSON.parse(sessionStorage.getItem(k)||"null"); sessionStorage.setItem(k,JSON.stringify(v)); }catch(x){ return null; } }
  function ls(k,v){ try{ if(v===undefined) return JSON.parse(localStorage.getItem(k)||"null"); localStorage.setItem(k,JSON.stringify(v)); }catch(x){ return null; } }
  function used(){ var d=ls(KEY_DAY)||{}; return d.day===new Date().toISOString().slice(0,10)?(d.n||0):0; }
  function count(){ ls(KEY_DAY,{day:new Date().toISOString().slice(0,10),n:used()+1}); }
  function msgs(){ return ss(KEY_CHAT)||[]; }
  function md(t){ return e(t).replace(/\*\*(.+?)\*\*/g,"<b>$1</b>").split(/\n+/).map(function(l){ l=l.trim(); if(!l) return ""; return /^[-*•]\s+/.test(l)?'<p class="ai-li">'+l.replace(/^[-*•]\s+/,"")+'</p>':"<p>"+l+"</p>"; }).join(""); }

  var ICON='<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M21 12a8 8 0 0 1-11.6 7.1L4 20l1-4.6A8 8 0 1 1 21 12z"/><path d="M8.5 11h.01M12 11h.01M15.5 11h.01"/></svg>';
  var fab=document.createElement("button");
  fab.id="tlFab"; fab.type="button"; fab.className="tl-fab"; fab.setAttribute("aria-label","Hỏi trợ lý hoặc liên hệ hỗ trợ");
  fab.innerHTML=ICON+'<span>Hỏi</span>';
  fab.onclick=function(){ open(); };
  document.body.appendChild(fab);

  function veil(){
    var v=document.getElementById("tlVeil");
    if(!v){
      v=document.createElement("div"); v.id="tlVeil"; v.className="modal-veil";
      v.innerHTML='<div class="modal tl-modal" role="dialog" aria-modal="true" aria-labelledby="tlTitle"><div class="tl-head"><h3 id="tlTitle">Trợ lý BuiTrip</h3><button class="tl-x" type="button" aria-label="Đóng" onclick="tlClose()">×</button></div>'+
        '<div class="seg tl-seg" role="tablist"><button type="button" role="tab" data-t="ai" onclick="tlTab(\'ai\')">Hỏi trợ lý AI</button><button type="button" role="tab" data-t="ht" onclick="tlTab(\'ht\')">Hỗ trợ</button></div><div id="tlBody"></div></div>';
      v.addEventListener("click",function(x){ if(x.target===v) close(); });
      document.body.appendChild(v);
    }
    return v;
  }
  function open(tab){
    if(tab) st.tab=tab;
    st.prov=(typeof currentProv!=="undefined"&&currentProv)?currentProv:st.prov;
    veil().classList.add("show"); render();
    if(st.on===null) fetch("/api/hoi",{cache:"no-store"}).then(function(r){ return r.ok?r.json():{}; }).then(function(j){ st.on=!!(j&&j.enabled); if(st.tab==="ai") render(); }).catch(function(){ st.on=false; if(st.tab==="ai") render(); });
  }
  function close(){ var v=document.getElementById("tlVeil"); if(v) v.classList.remove("show"); }
  window.tlOpen=open; window.tlClose=close;
  window.tlTab=function(t){ st.tab=t; render(); };
  document.addEventListener("keydown",function(x){ if(x.key==="Escape") close(); });

  function render(){
    var v=veil();
    [].forEach.call(v.querySelectorAll(".tl-seg button"),function(b){ var on=b.getAttribute("data-t")===st.tab; b.classList.toggle("on",on); b.setAttribute("aria-selected",on?"true":"false"); });
    document.getElementById("tlBody").innerHTML=st.tab==="ai"?aiHtml():htHtml();
    if(st.tab==="ai"){ var l=document.getElementById("tlLog"); if(l) l.scrollTop=l.scrollHeight; }
    else loadMine();
  }

  /* ---------- Trợ lý AI ---------- */
  function provName(p){ return p?(typeof provLabel==="function"?provLabel(p):p.name):""; }
  function aiHtml(){
    if(st.on===false) return '<p class="muted">Trợ lý AI tạm chưa bật. Dùng ô Hỏi nhanh ở trang Câu hỏi thường gặp, hoặc gửi tin ở thẻ Hỗ trợ.</p>';
    var m=msgs(), p=st.prov;
    var ex=p?["Ăn gì ở "+provName(p)+"?","Ở "+provName(p)+" chỗ nào dưới 500k?","Lịch 2 ngày ở "+provName(p)+"?"]:["Phú Quốc 3 ngày hết bao nhiêu?","Hà Giang tháng mấy đẹp?","Mưa ở Đà Nẵng đi đâu?"];
    return '<div id="tlLog" class="tl-log" aria-live="polite">'+
      (m.length?m.map(function(x){ return x.r==="u"?'<div class="tl-u">'+e(x.t)+'</div>':'<div class="tl-a'+(x.err?" tl-err":"")+'">'+(x.err?e(x.t):md(x.t))+'</div>'; }).join(""):
        '<div class="tl-a"><p>Chào bạn. Hỏi gì về đi lại, ăn ở, giá vé, lịch trình ở 34 tỉnh thành đều được.'+(p?' Đang xem <b>'+e(provName(p))+'</b>, trợ lý sẽ trả lời theo tỉnh này nếu bạn không nêu tỉnh khác.':'')+'</p></div>'+
        '<div class="ask-chips">'+ex.map(function(t){ return '<button class="chip" type="button" onclick="tlAsk(this.textContent)">'+e(t)+'</button>'; }).join("")+'</div>')+
      (st.busy?'<div class="tl-a tl-wait">Trợ lý đang trả lời…</div>':'')+'</div>'+
      '<form class="tl-form" onsubmit="tlAsk();return false"><input id="tlIn" type="text" maxlength="400" enterkeyhint="send" autocomplete="off" placeholder="Nhập câu hỏi…" aria-label="Câu hỏi cho trợ lý"'+(st.busy?" disabled":"")+'><button class="btn btn-primary" type="submit"'+(st.busy?" disabled":"")+'>Gửi</button></form>'+
      '<p class="small tl-note">Trợ lý trả lời từ dữ liệu cẩm nang, có thể sai; kiểm lại giá và giờ mở cửa trước khi đi.'+(m.length?' <button type="button" class="linkbtn" onclick="tlReset()">Hỏi lại từ đầu</button>':'')+'</p>';
  }
  window.tlReset=function(){ ss(KEY_CHAT,[]); render(); };
  window.tlAsk=function(text){
    if(st.busy) return;
    var i=document.getElementById("tlIn"), q=String(text!=null?text:(i?i.value:"")).trim(); if(!q) return;
    var m=msgs();
    if(used()>=LIMIT){ m.push({r:"u",t:q},{r:"a",t:"Hôm nay máy này đã hỏi trợ lý "+LIMIT+" câu. Mai hỏi tiếp nhé, hoặc gửi tin ở thẻ Hỗ trợ.",err:1}); ss(KEY_CHAT,m); render(); return; }
    var hit=typeof window.btFindProv==="function"?window.btFindProv(q):null;
    var hint=st.prov; if(hit&&hit.prov) st.prov=hit.prov;
    var hist=[]; for(var k=0;k<m.length-1;k++){ if(m[k].r==="u"&&m[k+1].r==="a"&&!m[k+1].err) hist.push({q:m[k].t,a:m[k+1].t}); }
    m.push({r:"u",t:q}); ss(KEY_CHAT,m); st.busy=true; render();
    fetch("/api/hoi",{method:"POST",headers:{"content-type":"application/json"},body:JSON.stringify({q:q,prov:hit&&hit.prov?hit.prov.id:null,hint:hint?hint.id:null,old:hit?hit.old:"",hist:hist.slice(-3)})})
      .then(function(r){ return r.json().then(function(j){ return {ok:r.ok,j:j}; },function(){ return {ok:false,j:{}}; }); })
      .then(function(x){
        var m2=msgs();
        if(!x.ok||!x.j.answer) m2.push({r:"a",t:(x.j&&x.j.error)||"Trợ lý đang lỗi, thử lại sau.",err:1});
        else { count(); m2.push({r:"a",t:x.j.answer}); }
        ss(KEY_CHAT,m2.slice(-24));
      })
      .catch(function(){ var m2=msgs(); m2.push({r:"a",t:"Mất kết nối, thử lại.",err:1}); ss(KEY_CHAT,m2); })
      .then(function(){ st.busy=false; if(st.tab==="ai") render(); var n=document.getElementById("tlIn"); if(n) n.focus(); });
  };

  /* ---------- Hỗ trợ ---------- */
  function toks(){ var t=ls(KEY_TOK); return Array.isArray(t)?t:[]; }
  function htHtml(){
    return '<p class="muted" style="margin-top:0">Gặp lỗi, cần hỏi đội BuiTrip, hay muốn góp ý? Gửi tin ở đây, trả lời hiện ngay trong mục này. Hoặc gửi thư: <a href="mailto:'+e(EMAIL)+'"><b>'+e(EMAIL)+'</b></a>.</p>'+
      '<form class="tl-ht" onsubmit="tlSend();return false">'+
      '<label class="tl-lab" for="tlMsg">Nội dung</label><textarea id="tlMsg" rows="4" maxlength="2000" required placeholder="Ví dụ: Giá vé cáp treo Hòn Thơm trong app đã cũ, nay là…"></textarea>'+
      '<label class="tl-lab" for="tlName">Tên (không bắt buộc)</label><input id="tlName" type="text" maxlength="80" autocomplete="name">'+
      '<label class="tl-lab" for="tlContact">Email hoặc số điện thoại để đội BuiTrip liên lạc lại (không bắt buộc)</label><input id="tlContact" type="text" maxlength="120" autocomplete="email">'+
      '<input id="tlWeb" type="text" tabindex="-1" autocomplete="off" class="tl-hp" aria-hidden="true">'+
      '<p id="tlHtErr" class="dg-err" role="alert" hidden></p>'+
      '<button id="tlSendBtn" class="btn btn-primary btn-block" type="submit">Gửi cho đội hỗ trợ</button></form>'+
      '<div id="tlMine"></div>';
  }
  window.tlSend=function(){
    var g=function(id){ var x=document.getElementById(id); return x?x.value.trim():""; };
    var msg=g("tlMsg"), er=document.getElementById("tlHtErr"), b=document.getElementById("tlSendBtn");
    if(msg.length<3){ er.textContent="Nhập nội dung cần hỗ trợ."; er.hidden=false; return; }
    b.disabled=true; b.textContent="Đang gửi…"; er.hidden=true;
    fetch("/api/hotro",{method:"POST",headers:{"content-type":"application/json"},body:JSON.stringify({msg:msg,name:g("tlName"),contact:g("tlContact"),web:g("tlWeb"),page:location.pathname+location.hash})})
      .then(function(r){ return r.json().then(function(j){ return {ok:r.ok,j:j}; },function(){ return {ok:false,j:{}}; }); })
      .then(function(x){
        if(!x.ok||!x.j.tok){ er.textContent=(x.j&&x.j.error)||"Chưa gửi được, thử lại sau."; er.hidden=false; b.disabled=false; b.textContent="Gửi cho đội hỗ trợ"; return; }
        var t=toks(); t.unshift(x.j.tok); ls(KEY_TOK,t.slice(0,20));
        if(typeof toast==="function") toast("Đã gửi. Trả lời sẽ hiện ở mục Hỗ trợ.");
        render();
      })
      .catch(function(){ er.textContent="Mất kết nối, thử lại."; er.hidden=false; b.disabled=false; b.textContent="Gửi cho đội hỗ trợ"; });
  };
  var ST={moi:"Đã nhận, chờ trả lời",da_tra_loi:"Đã trả lời",dong:"Đã xong"};
  function loadMine(){
    var t=toks(), box=document.getElementById("tlMine"); if(!box||!t.length) return;
    box.innerHTML='<p class="small">Đang tải tin đã gửi…</p>';
    fetch("/api/hotro?t="+t.join(","),{cache:"no-store"}).then(function(r){ return r.json(); }).then(function(j){
      var it=(j&&j.items)||[]; if(!document.getElementById("tlMine")) return;
      box.innerHTML=it.length?'<h4 class="tl-h4">Tin đã gửi từ máy này</h4>'+it.map(function(x){
        var d=new Date(x.at);
        return '<div class="dg-item"><div class="dg-top"><span class="small">'+e(isNaN(d)?"":d.toLocaleDateString("vi-VN"))+'</span><span class="dg-st st-'+e(x.status)+'">'+e(ST[x.status]||x.status)+'</span></div><p>'+e(x.msg)+'</p>'+
          (x.reply?'<div class="tl-reply"><b>BuiTrip trả lời:</b> '+e(x.reply)+'</div>':'')+'</div>';
      }).join(""):"";
    }).catch(function(){ box.innerHTML=""; });
  }
  /* Mở thẳng thẻ Hỗ trợ: dùng #/ho-tro hoặc gọi tlOpen("ht") */
  if(/^#\/ho-tro\b/.test(location.hash)) setTimeout(function(){ open("ht"); },300);
})();
