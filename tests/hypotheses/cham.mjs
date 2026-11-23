/* Bộ chấm dùng chung cho run.mjs và generate.mjs.
   Đáp án đúng lấy từ dữ liệu app (data/*.js), không viết tay; bộ chấm KHÔNG dùng hàm tìm thực thể của trợ lý,
   mà tự dò tên dài nhất có trong dữ liệu (tỉnh mới, tỉnh cũ, khu, đảo, địa danh, món) để biết câu hỏi nói về nơi nào.
   Mức lỗi: CHẶN = sai nơi / bịa số / gợi ý nơi cấm; NẶNG = thiếu nội dung cần có, không khớp mục đã có, dự phòng thiếu phần;
   NHẸ = thiếu nút tới trang liên quan, chậm quá 100 ms. */
import fs from "node:fs";
import path from "node:path";
import vm from "node:vm";
import { napAI, napTimKiem, chu } from "../nap-ai.mjs";
import { APP } from "../nap-du-lieu.mjs";

export function moi() {
  return dung(napTimKiem(napAI()));
}

function dung(W) {
  const A = W.BTAI, fold = A.fold, has = A.has, main = n => String(n || "").split(" (")[0];
  const P = W.PROV_DATA, KV = W.KHU_VUC || [], DAO = W.DAO_TIEP_CAN || [], HS = W.KHU_HO_SO || {};
  const provById = id => P.find(p => p.id === id || p.appId === id);
  const areaById = id => KV.find(a => a.id === id);

  /* ---------- Bảng tên: dò thực thể độc lập với trợ lý ---------- */
  const TEN = [];
  const add = (n, t, ref, rank) => { const f = fold(n); if (f && f.length >= 3) TEN.push({ f, t, ref, rank, l: String(n).toLowerCase() }); };
  P.forEach(p => {
    add(p.name, "prov", p.id, 1);
    String(p.anchor || "").split("/").forEach(a => { a = a.replace(/\(.*?\)/g, "").replace(/^\s*(TP|Thành phố)\s+/i, "").trim(); if (a && !KV.some(k => fold(k.name) === fold(a))) add(a, "prov", p.id, 1); });
    (p.places || []).forEach(x => {
      add(main(x.name), "item", { p, x, kind: "place" }, 3);
      /* gọi tắt = đuôi tên từ 2 chữ trở lên: "Thác Bản Giốc" → "Bản Giốc", "Khu du lịch Quốc gia Mũi Cà Mau" → "Mũi Cà Mau" */
      const w = fold(main(x.name)).split(" "), ow = main(x.name).toLowerCase().split(/\s+/);
      for (let i = 1; i + 2 <= w.length; i++) TEN.push({ f: w.slice(i).join(" "), t: "item", ref: { p, x, kind: "place" }, rank: 0.5, tat: 1, l: ow.length === w.length ? ow.slice(i).join(" ") : null });
    });
    (p.dishes || []).forEach(x => add(main(x.name), "item", { p, x, kind: "dish" }, 2));
  });
  Object.keys(W.SAP_NHAP || {}).forEach(id => W.SAP_NHAP[id].forEach((o, i) => { if (i > 0) add(o, "old", { prov: id, old: o }, 2); }));
  KV.forEach(a => { add(a.name, "area", a.id, 4); (a.exact || []).forEach(n => add(n, "area", a.id, 4)); });
  DAO.forEach(d => { add(d.name, "isle", d.id, 5); (d.keys || []).forEach(k => add(k, "isle", d.id, 5)); });
  (W.BT_ALIAS || []).forEach(a => {
    if (TEN.some(t => !t.tat && t.f === a[0])) return;
    const ar = KV.find(k => k.prov === a[1] && ((k.keys || []).includes(a[0]) || has(fold(k.name), a[0])));
    if (ar) add(a[0], "area", ar.id, 4); else add(a[0], a[2] ? "old" : "prov", a[2] ? { prov: a[1], old: a[2], alias: a[0] } : a[1], 1);
  });

  /* tên gọi tắt trùng tên tỉnh/khu/món/địa danh khác thì bỏ (Bảo tàng Cần Thơ ≠ "Cần Thơ") */
  /* trừ khi khác dấu: "Hòn Dấu" (Đảo Hòn Dấu) không phải "Hòn Dầu" (Nam Du) */
  { const full = TEN.filter(t => !t.tat); for (let i = TEN.length - 1; i >= 0; i--) { const t = TEN[i]; if (t.tat && full.some(u => u.f === t.f && (!t.l || !u.l || u.l === t.l || !A.marked(u.l) || !A.marked(t.l)))) TEN.splice(i, 1); } }
  /* đuôi tên chung của nhiều mục: chấp nhận mục nào trong số đó */
  { const by = {}; TEN.filter(t => t.tat).forEach(t => (by[t.f] = by[t.f] || []).push(t.ref)); TEN.filter(t => t.tat).forEach(t => { t.ref = Object.assign({}, t.ref, { alts: by[t.f] }); }); }
  /* Thực thể của 1 câu: tên dài nhất khớp trọn từ; bằng nhau thì đảo > khu > địa danh > món/tỉnh cũ > tỉnh */
  function dich(q) {
    (W.BT_BIEN_THE || []).forEach(v => { q = String(q).replace(new RegExp("(^|\\s)" + v[0] + "(?=\\s|$|[?.,!])", "gi"), "$1" + v[1]); });
    const f = fold(q), ql = String(q).toLowerCase(), mk = A.marked(q), dung = t => mk && t.l && ql.indexOf(t.l) >= 0 ? 1 : 0;
    let best = null;
    TEN.forEach(t => { if (!t.tat && has(f, t.f) && (!best || t.f.length > best.f.length || t.f.length === best.f.length && (dung(t) - dung(best) || t.rank - best.rank) > 0)) best = t; });
    /* tên gọi tắt chỉ dùng khi không có tên đầy đủ nào, hoặc khi nó chứa trọn tên đầy đủ ("mũi cà mau" chứa "cà mau") */
    let bt = null; TEN.forEach(t => { if (t.tat && has(f, t.f) && (!bt || t.f.length > bt.f.length)) bt = t; });
    if (bt && (!best || (bt.f.length > best.f.length && has(bt.f, best.f)) || (bt.f.length >= best.f.length && dung(bt) > dung(best)))) best = bt;
    return best;
  }
  function areaOfItem(it) { return it.kind === "place" && typeof W.btAreaOfPlace === "function" ? W.btAreaOfPlace(it.p, it.x) : null; }
  function itemOfKey(k) { if (!k) return null; const [pid, kind, id] = k.split("|"); const p = provById(pid); const l = p && (kind === "place" ? p.places : kind === "dish" ? p.dishes : p.stays); const x = l && l.find(y => y.id === id); return x ? { p, x, kind } : null; }

  /* ---------- Số trong dữ liệu: câu trả lời chỉ được in số có sẵn ---------- */
  const SO = new Set();
  const nap = s => String(s).replace(/\d[\d.,]*\d|\d/g, m => { SO.add(m.replace(/[.,]$/, "")); return m; });
  nap(JSON.stringify([P, KV, DAO, HS, W.BT_FAQ, A.SAN_BAY, A.GA, W.SAP_NHAP]));
  const ND = P.reduce((n, p) => n + p.places.length, 0), NM = P.reduce((n, p) => n + p.dishes.length, 0);
  [ND, NM].forEach(n => { SO.add(String(n)); SO.add(n.toLocaleString("vi-VN")); });
  function biaSo(text) {
    const out = [];
    const re = /(\d[\d.,]*\d|\d)\s*(km|k(?![a-zà-ỹ])|đ|tr(?![a-zà-ỹ])|triệu|nghìn|giờ|phút|ngày|đêm)?/gi; let m;
    while ((m = re.exec(text))) {
      const s = m[1].replace(/[.,]$/, "");
      if (m[2] && /^km$/i.test(m[2])) continue; /* khoảng cách tính từ tọa độ trong dữ liệu */
      const can = m[2] ? true : s.replace(/\D/g, "").length >= 3; /* số trơn 1–2 chữ số (tháng, ngày) bỏ qua */
      if (!can) continue;
      if (/^(19|20)\d\d$/.test(s)) continue; /* năm */
      if (!SO.has(s)) out.push(m[0]);
    }
    return out;
  }

  /* ---------- Câu hỏi muốn gì (đoán độc lập từ mẫu câu) ---------- */
  function loai(q) {
    const f = fold(q);
    if (/\b(nay thuoc|thuoc tinh nao)\b/.test(f)) return "thuoc";
    if (/\b(thoi tiet|hom nay .* mua|co mua khong)\b/.test(f) && !/\bthang\b/.test(f)) return "ngoai";
    if (/\bco san bay\b/.test(f)) return "sanbay";
    if (/\bco ga tau\b/.test(f)) return "ga";
    if (/\b(tau hoa|tau hoả|tau lua)\b/.test(f) || /tàu hoả|tàu hỏa/.test(q)) return "tau";
    if (/\bve may bay\b/.test(f)) return "vebay";
    if (/\b(bang gi|mat bao lau|duong di|cach di|xe khach)\b/.test(f)) return "diden";
    if (/\b(thang may|mua nao|thang \d+ co mua|khi nao dep)\b/.test(f)) return "mua";
    if (/\b(an gi|dac san|mon)\b/.test(f)) return "angi";
    if (/\ban\b.*\bo dau\b|\bo dau\b.*\ban\b/.test(f)) return "anodau"; /* món X ăn ở đâu: không phải hỏi chỗ ngủ */
    if (/\b(o dau|khach san|homestay|cho o)\b/.test(f)) return "odau";
    if (/\b(het bao nhieu|chi phi|bao nhieu tien)\b/.test(f) && !/\bve\b/.test(f)) return "chiphi";
    if (/\b(ve|gia ve)\b/.test(f) && /\b(bao nhieu|gia)\b/.test(f)) return "gia";
    if (/\b(mang gi|chuan bi)\b/.test(f)) return "mang";
    if (/\b(co gi choi|choi gi|tham quan)\b/.test(f)) return "choi";
    if (/\bdi .* duoc khong\b/.test(f)) return "duockhong";
    if (/\b(dat truoc)\b/.test(f)) return "dattruoc";
    if (/\b(an toan)\b/.test(f)) return "antoan";
    if (/\b(khac .* the nao|so sanh|khac gi)\b/.test(f)) return "sosanh";
    return "";
  }

  const FB = t => /App chưa có thông tin này/.test(t);
  const FB3 = (h, t) => FB(t) && /Cách khác/.test(t) && /btAskChip/.test(h);
  const LINK = h => /onclick=|href=/.test(h);
  const ten = r => r.t === "prov" ? provById(r.ref).name : r.t === "old" ? r.ref.old : r.t === "area" ? areaById(r.ref).name : r.t === "isle" ? DAO.find(d => d.id === r.ref).name : main(r.ref.x.name);

  /* Thực thể trợ lý đã trả có khớp thực thể câu hỏi không */
  function khop(tg, res, text) {
    const e = res.ent || {}, ft = fold(text);
    if (res.kind === "askback") return ft.indexOf(fold(ten(tg))) >= 0 || ft.indexOf(tg.f) >= 0;
    if (res.kind === "compare") return ft.indexOf(fold(ten(tg))) >= 0;
    const it = itemOfKey(e.itemKey);
    if (res.kind === "belongs") { const pid = tg.t === "old" ? tg.ref.prov : tg.t === "area" ? areaById(tg.ref).prov : tg.t === "isle" ? DAO.find(d => d.id === tg.ref).prov : tg.t === "item" ? tg.ref.p.id : tg.ref; return e.prov === pid || (e.area && areaById(e.area).prov === pid); }
    if (tg.t === "isle") { const d = DAO.find(x => x.id === tg.ref); return e.isle === tg.ref || (e.area && fold(areaById(e.area).name) === fold(d.name)) || (it && fold(main(it.x.name)).indexOf(fold(d.name)) >= 0); }
    if (tg.t === "area") { const a = areaById(tg.ref); if (e.area === tg.ref) return true; if (it) { const ia = areaOfItem(it); return (ia && ia.id === tg.ref) || fold(main(it.x.name)).indexOf(fold(a.name)) >= 0; } if (e.isle) return fold(DAO.find(d => d.id === e.isle).name) === fold(a.name); return false; }
    if (tg.t === "item" && tg.ref.alts && tg.ref.alts.length > 1 && !tg.alt1) return tg.ref.alts.some(r => khop(Object.assign({}, tg, { ref: r, alt1: 1 }), res, text));
    if (tg.t === "item") { if (it && it.x === tg.ref.x) return true; if (e.isle && fold(main(tg.ref.x.name)).indexOf(fold(DAO.find(d => d.id === e.isle).name)) >= 0) return true; const n = fold(main(tg.ref.x.name)); if (it && fold(main(it.x.name)) === n) return true; const ia = areaOfItem(tg.ref); if (e.area && ia && e.area === ia.id && ft.indexOf(n) >= 0) return true; if (e.isle && ft.indexOf(n) >= 0) return true; return !e.area && !it && e.prov === tg.ref.p.id && ft.indexOf(n) >= 0; }
    if ((tg.t === "old" || tg.t === "prov") && it && it.p.id === (tg.t === "old" ? tg.ref.prov : tg.ref) && has(fold(main(it.x.name)), tg.f) && fold(main(it.x.name)) !== tg.f) return true;
    if (tg.t === "old") { if (e.prov === tg.ref.prov && !e.itemKey) return true; if (e.area) return areaById(e.area).prov === tg.ref.prov && (!areaById(e.area).old || fold(areaById(e.area).old) === fold(tg.ref.old)); if (it) return it.p.id === tg.ref.prov; return false; }
    if (tg.t === "prov") return e.prov === tg.ref && !it && !e.area;
    return false;
  }

  /* Tên riêng trong cột kỳ vọng mà dữ liệu app có: câu trả lời phải nhắc */
  function canNhac(ky, tg) {
    const out = [], f = fold(ky);
    const SB = Object.values(A.SAN_BAY || {}).concat(Object.values(A.GA || {})).join(" | ");
    const re = /(?:sân bay|ga|cảng|tàu)\s+((?:\S+)(?:\s+\S+){0,2})/g; let m;
    const hoa = w => w && w[0] !== w[0].toLowerCase();
    while ((m = re.exec(ky))) { const ws = []; for (const w of m[1].split(/\s+/)) { const c = w.replace(/[^\wà-ỹÀ-Ỹđ]/g, ""); if (!hoa(c)) break; ws.push(c); } const n = ws.join(" "); if (!n) continue; if (n.length >= 3 && (has(fold(SB), fold(n)) || has(fold(JSON.stringify(HS)), fold(n)))) out.push(n); }
    const tgp = tg && (tg.t === "item" ? tg.ref.p.id : tg.t === "prov" ? tg.ref : tg.t === "old" ? tg.ref.prov : tg.t === "area" ? areaById(tg.ref).prov : null);
    if (tgp) provById(tgp).places.forEach(x => { const n = fold(main(x.name)); if (n.length >= 5 && has(f, n) && (!tg || tg.t !== "item" || n !== fold(main(tg.ref.x.name)))) out.push(main(x.name)); });
    return out;
  }

  /* ---------- Chấm 1 câu hỏi trợ lý ---------- */
  function chamHoi(q, ky, opt) {
    opt = opt || {};
    const res = W.askBuiTrip(q, { noCtx: !opt.ctx }), h = res.html || "", t = chu(h), L = [];
    const err = (muc, loai, ghi) => L.push({ muc, loai, ghi });
    const tg = opt.tg !== undefined ? opt.tg : dich(q), lq = opt.loai || loai(q), ft = fold(t);
    if (!t) err("CHẶN", "không trả lời", "trả rỗng");
    /* 1. sai nơi */
    if (tg && lq !== "ngoai") {
      if (res.ent || res.kind === "askback" || res.kind === "compare") { if (!khop(tg, res, t)) err("CHẶN", "sai điểm đến", "hỏi " + ten(tg) + ", trả " + JSON.stringify(res.ent || res.kind)); }
      else if (!FB(t) && !["general", "faq"].includes(res.kind)) err("NẶNG", "nhận dạng sai", "không nhận ra " + ten(tg));
      else if (FB(t) || res.kind === "faq" || res.kind === "general") err("NẶNG", "không khớp mục đã có", "có " + ten(tg) + " trong dữ liệu nhưng trả " + res.kind);
    }
    /* 2. bịa số */
    const bs = biaSo(t); if (bs.length) err("CHẶN", "bịa số", "số không có trong dữ liệu: " + bs.slice(0, 4).join(", "));
    /* 3. nơi cấm */
    if (tg && tg.t === "isle" && DAO.find(d => d.id === tg.ref).ban && !/không đón khách|cấm|không được/.test(t)) err("CHẶN", "gợi ý nơi cấm", "đảo cấm khách mà không nói rõ");
    /* 4. dự phòng */
    if (FB(t) && !FB3(h, t)) err("NẶNG", "thiếu dự phòng", "câu dự phòng thiếu phần cách khác hoặc câu gợi ý");
    /* 5. nội dung theo loại câu hỏi */
    const cam = (tg && tg.t === "isle" && DAO.find(d => d.id === tg.ref).ban || res.ent && res.ent.isle && (DAO.find(d => d.id === res.ent.isle) || {}).ban) && /không đón khách/i.test(t);
    const fb = FB3(h, t) || cam || (res.kind === "askback" && (!tg || ft.indexOf(fold(ten(tg))) >= 0 || ft.indexOf(tg.f) >= 0));
    const need = (ok, ghi) => { if (!ok && !fb) err("NẶNG", "thiếu nội dung", ghi); };
    if (lq === "thuoc" && opt.dung) need(ft.indexOf(fold(opt.dung)) >= 0 || (opt.dungId && res.ent && res.ent.prov === opt.dungId), "không nêu " + opt.dung);
    if (lq === "thuoc" && tg && !opt.dung) { const pid = tg.t === "old" ? tg.ref.prov : tg.t === "area" ? areaById(tg.ref).prov : tg.t === "isle" ? DAO.find(d => d.id === tg.ref).prov : tg.t === "item" ? tg.ref.p.id : tg.ref; need(ft.indexOf(fold(provById(pid).name)) >= 0, "không nêu tỉnh mới " + provById(pid).name); }
    if (["diden", "tau", "vebay"].includes(lq)) need(/bay|tàu|xe|phà|ca nô|cano|thuyền|đò|tour/i.test(t) && /giờ|phút|tiếng|km|đ(?![a-zà-ỹ])|đ\/|\d+k/i.test(t), "thiếu phương tiện + thời gian/giá");
    if (lq === "tau") need(/\bga\b|không có (tàu|ga|đường sắt)|chỉ đi được bằng tàu|không có tàu hỏa/i.test(t), "không nói có ga/tàu hay không");
    if (lq === "sanbay") need(/sân bay|\([A-Z]{3}\)/.test(t), "không nói sân bay");
    if (lq === "ga") need(/\bga\b|không có (tàu|ga)/i.test(t), "không nói ga tàu");
    if (lq === "diden" && opt.from) { const ALS = { "tp hcm": /\b(tp hcm|sg|sgn|sai gon|ho chi minh)\b/, "ha noi": /\b(ha noi|hn|han)\b/, "da nang": /\b(da nang|dad)\b/ }, k = fold(opt.from); need((ALS[k] ? ALS[k].test(ft) : ft.indexOf(k) >= 0), "không có tuyến từ " + opt.from); }
    if (tg && tg.t === "isle" && ["diden", "tau"].includes(lq)) need(/tàu|ca nô|cano|phà|bay|thuyền/i.test(t), "đảo mà không nói tàu/bay");
    if (lq === "mua") need(/tháng|quanh năm/i.test(t), "không có tháng");
    if (lq === "angi") need(/đ(?![a-zà-ỹ])|\d+k|giá/i.test(t) || /món|đặc sản|ăn gì ở/i.test(t), "không có món");
    if (lq === "odau") need(/đ(?![a-zà-ỹ])|\d+k|đêm|chưa kiểm được (khoảng )?giá/i.test(t), "chỗ ở không có giá");
    if (lq === "chiphi") need(/đ(?![a-zà-ỹ])|\d+k|triệu|tr\b/i.test(t), "không có chi phí");
    if (lq === "gia" && tg && tg.t === "item") { const pr = String(tg.ref.x.price || ""); const ns = pr.match(/\d{1,3}(?:\.\d{3})+|\d+k/g) || []; need(!ns.length || ns.some(n => t.indexOf(n) >= 0) || /miễn phí|không bán vé|không có vé/i.test(t), "giá không khớp trang chi tiết (" + pr.slice(0, 40) + ")"); }
    if (lq === "gia") need(/đ(?![a-zà-ỹ])|\d+k|miễn phí|không bán vé|không có vé|chưa kiểm|tùy điểm/i.test(t), "không có giá");
    if (lq === "choi" && tg) need((t.match(/·|•/g) || []).length >= 1 || /<li>/.test(h), "không liệt kê điểm");
    if (lq === "mang") need(/mang|áo|kem|giày|thuốc|ô\b|dù/i.test(t), "không có đồ mang theo");
    if (lq === "ngoai") need(fb, "câu ngoài dữ liệu phải dùng dự phòng 3 phần");
    if (lq === "sosanh") need(res.kind === "compare" || /cách|khác|so với/.test(t), "không so sánh");
    if (opt.ky) canNhac(opt.ky, tg).forEach(n => need(ft.indexOf(fold(n)) >= 0, "thiếu " + n));
    if (opt.cam) opt.cam.forEach(c => { if (ft.replace(new RegExp("khong (can|phai|co|dung) " + fold(c), "g"), "").indexOf(fold(c)) >= 0) err("CHẶN", "sai điểm đến", "nhắc " + c + " (dữ liệu nơi khác)"); });
    /* 6. nút, tốc độ */
    if (!LINK(h)) err("NHẸ", "thiếu link", "không có nút tới trang liên quan");
    if (res.ms > 100) err("NHẸ", "chậm", res.ms + " ms");
    return { q, res, text: t, tg: tg ? ten(tg) : "", loai: lq, loi: L };
  }

  /* ---------- Chấm 1 câu tìm kiếm ---------- */
  function chamTim(q, ky) {
    const r = W.btSearch(q) || [], L = [], tg = dich(q), fky = fold(ky || "");
    const err = (muc, loai, ghi) => L.push({ muc, loai, ghi });
    const nm = x => fold(main(x.name || (x.x && x.x.name) || (x.area && x.area.name) || (x.prov && x.prov.name) || ""));
    if (!r.length) err("NẶNG", "không tìm ra", "không có kết quả");
    else if (tg) {
      const top = r.slice(0, 6), n = fold(ten(tg));
      const ok = top.some(x => {
        if (tg.t === "prov") return x.prov && x.prov.id === tg.ref;
        if (tg.t === "old") return x.prov && x.prov.id === tg.ref.prov;
        if (tg.t === "area") return (x.kind === "area" && x.area && x.area.id === tg.ref) || nm(x).indexOf(n) >= 0;
        if (tg.t === "isle") { const d = DAO.find(y => y.id === tg.ref); return [fold(d.name)].concat(d.keys || []).some(k => nm(x).indexOf(k) >= 0) || (x.kind === "area" && x.area && fold(x.area.name) === n); }
        return nm(x) === n || nm(x).indexOf(n) >= 0;
      });
      if (!ok) err("NẶNG", "không tìm ra", "6 kết quả đầu không có " + ten(tg));
    }
    if (/chi 1 muc duy nhat/.test(fky) && tg) { const n = fold(ten(tg)); if (r.filter(x => nm(x) === n).length > 1) err("NẶNG", "trùng mục", "có 2 mục cùng tên"); }
    const so = (ky || "").match(/\b(19|20)\d\d\b/g); if (so && tg && tg.t === "item") so.forEach(s => { if (JSON.stringify(tg.ref.x).indexOf(s) < 0) err("NẶNG", "thiếu nội dung", "mục chưa ghi " + s); });
    return { q, res: { kind: "search", n: r.length }, text: r.slice(0, 5).map(x => main(x.name || (x.x && x.x.name) || (x.area && x.area.name) || (x.prov && x.prov.name))).join("; "), tg: tg ? ten(tg) : "", loai: "tim", loi: L };
  }

  /* ---------- Trang chi tiết có mùa đẹp riêng ---------- */
  function chamMua(name) {
    const tg = dich(name), L = [];
    if (!tg) return { q: name, text: "", tg: "", loai: "mua-trang", loi: [{ muc: "NẶNG", loai: "không tìm ra", ghi: "không có mục " + name }] };
    let s = "";
    if (tg.t === "item") s = A.season(tg.ref.x, tg.ref.p);
    else if (tg.t === "area") { const pr = HS[tg.ref]; s = pr && pr.season ? pr.season.best : ""; }
    else if (tg.t === "isle") s = DAO.find(d => d.id === tg.ref).season || "";
    else if (tg.t === "prov" || tg.t === "old") { const p = provById(tg.t === "old" ? tg.ref.prov : tg.ref); s = (tg.t === "prov" || (tg.ref.alias && fold(p.anchor || "") === tg.ref.alias)) ? p.best_season : ""; }
    if (tg.t === "area" && !s) { const a = areaById(tg.ref), p = provById(a.prov), an = fold(String(p.anchor || "").replace(/\(.*?\)/g, "").replace(/^\s*(TP|Thành phố)\s+/i, "")); if (an && has(fold(a.name), an)) s = p.best_season; }
    if ((tg.t === "old" || tg.t === "prov") && !s) { const pp = provById(tg.t === "old" ? tg.ref.prov : tg.ref), ix = tg.ref.alias && pp.places.find(x => has(fold(main(x.name)), tg.ref.alias)); if (ix) s = A.season(ix, pp); else { const p = provById(tg.t === "old" ? tg.ref.prov : tg.ref); if (fold(String(p.anchor || "").replace(/^TP\s+/i, "")).indexOf(tg.ref.alias || "@") === 0) s = p.best_season; } }
    if (!s || /^Chưa có/.test(s)) L.push({ muc: "NẶNG", loai: "thiếu nội dung", ghi: "không có mùa riêng" });
    return { q: name, text: s, tg: ten(tg), loai: "mua-trang", loi: L };
  }

  return { W, A, fold, dich, loai, chamHoi, chamTim, chamMua, biaSo, provById, areaById, DAO, KV, HS, TEN, main, ten, areaOfItem };
}
