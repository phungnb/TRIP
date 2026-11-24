/* Neon giả cho tests/trang-admin.mjs: thay vendor/neon.js trong trình duyệt thử.
   Mô phỏng đúng hợp đồng RPC của neon/003_admin_du_lieu.sql (quyền admin, nhập đóng góp, nhật ký, hoàn tác, giới hạn 30/24 giờ)
   để kiểm GIAO DIỆN. Luật thật ở server đã kiểm riêng bằng SQL trên nhánh Neon. Vai: localStorage "mock_role" = admin | user. */
(function () {
  var S = window.__NEON = window.__NEON || { contribs: [], ov: {}, audit: [], n: 0, admins: ["u-admin"], ai: null };
  function aiInit() { if (!S.ai) S.ai = { settings: { id: 1, enabled: true, sources: ["wikipedia_vi", "wikivoyage_vi"], daily_budget: 10 }, agenda: [], cands: [], lessons: [] }; return S.ai; }
  var USERS = { "u-admin": { name: "Admin Thử", email: "admin@thu.local" }, "u-user": { name: "Người Thử", email: "user@thu.local" } };
  function role() { try { return localStorage.getItem("mock_role") || ""; } catch (e) { return ""; } }
  function user() { var r = role(); return r ? { id: "u-" + r, name: r === "admin" ? "Admin Thử" : "Người Thử", email: r + "@thu.local" } : null; }
  function ok(d) { return Promise.resolve({ data: d, error: null }); }
  function no(m) { return Promise.resolve({ data: null, error: { message: m } }); }
  function admin() { var u = user(); return !!u && S.admins.indexOf(u.id) >= 0; }
  function key(p, k, i) { return p + "|" + k + "|" + i; }
  function aud(a) { a.id = ++S.n; a.at = new Date().toISOString(); a.by_name = user().name; a.by_email = user().email; S.audit.unshift(a); }
  function save() { try { localStorage.setItem("mock_neon", JSON.stringify(S)); } catch (e) {} }
  try { var j = JSON.parse(localStorage.getItem("mock_neon") || "null"); if (j) { S.contribs = j.contribs; S.ov = j.ov; S.audit = j.audit; S.n = j.n; S.admins = j.admins || S.admins; S.ai = j.ai || null; } } catch (e) {}
  var RPC = {
    is_admin: function () { return ok(admin()); },
    admin_contributions: function (a) { return ok(S.contribs.filter(function (c) { return !a.p_status || c.status === a.p_status; }).map(function (c) { return Object.assign({ author_name: "Người Thử", author_email: "user@thu.local" }, c); })); },
    admin_review_many: function (a) {
      if (a.p_status === "tu_choi" && !(a.p_note || "").trim()) return no("Từ chối cần ghi lý do cho người gửi");
      var n = 0; S.contribs.forEach(function (c) { if (a.p_ids.indexOf(c.id) >= 0 && c.status !== "da_nhap") { c.status = a.p_status; if (a.p_note) c.review_note = a.p_note; n++; } }); return ok(n);
    },
    admin_overrides: function () { return ok(Object.keys(S.ov).map(function (k) { return S.ov[k]; })); },
    admin_save_item: function (a) {
      var k = key(a.p_prov, a.p_kind, a.p_item), cur = S.ov[k];
      if (a.p_is_new && cur) return no("Mã mục đã có, chọn tên khác");
      Object.keys(a.p_patch).forEach(function (f) {
        var old = cur && f in cur.data ? cur.data[f] : (a.p_base || {})[f];
        if (JSON.stringify(old) !== JSON.stringify(a.p_patch[f])) aud({ prov_id: a.p_prov, kind: a.p_kind, item_id: a.p_item, action: a.p_is_new ? "them" : "sua", field: f, old_value: old == null ? null : old, new_value: a.p_patch[f], note: a.p_note });
      });
      if (!cur) cur = S.ov[k] = { prov_id: a.p_prov, kind: a.p_kind, item_id: a.p_item, data: {}, is_new: !!a.p_is_new, hidden: false, deleted: false, version: 0 };
      Object.assign(cur.data, a.p_patch); cur.version++;
      if (a.p_contrib) { var c = S.contribs.filter(function (x) { return x.id === a.p_contrib; })[0]; if (!c || ["cho_duyet", "da_duyet"].indexOf(c.status) < 0) return no("Đóng góp không còn ở trạng thái chờ hoặc đã duyệt"); c.status = "da_nhap"; c.review_note = a.p_note || c.review_note || "Đã đưa vào app"; aud({ prov_id: a.p_prov, kind: a.p_kind, item_id: a.p_item, action: "nhap_dong_gop" }); }
      save(); return ok({ item_id: a.p_item, changed: 1, version: cur.version });
    },
    admin_set_hidden: function (a) {
      var k = key(a.p_prov, a.p_kind, a.p_item), cur = S.ov[k] || (S.ov[k] = { prov_id: a.p_prov, kind: a.p_kind, item_id: a.p_item, data: {}, is_new: false, hidden: false, deleted: false, version: 0 });
      aud({ prov_id: a.p_prov, kind: a.p_kind, item_id: a.p_item, action: a.p_hidden ? "an" : "hien", field: "hidden", old_value: cur.hidden, new_value: a.p_hidden });
      cur.hidden = a.p_hidden; cur.version++; save(); return ok(null);
    },
    admin_delete_item: function (a) {
      if (a.p_confirm !== a.p_item) return no("Gõ lại đúng mã mục để xác nhận xóa");
      var k = key(a.p_prov, a.p_kind, a.p_item), cur = S.ov[k] || (S.ov[k] = { prov_id: a.p_prov, kind: a.p_kind, item_id: a.p_item, data: {}, is_new: false, hidden: false, deleted: false, version: 0 });
      cur.deleted = cur.hidden = true; cur.version++; aud({ prov_id: a.p_prov, kind: a.p_kind, item_id: a.p_item, action: "xoa", note: a.p_note }); save(); return ok(null);
    },
    admin_revert: function (a) {
      var x = S.audit.filter(function (y) { return y.id === a.p_audit_id; })[0]; if (!x || !x.field) return no("Không quay lại được");
      var cur = S.ov[key(x.prov_id, x.kind, x.item_id)];
      if (x.field === "hidden") cur.hidden = !!x.old_value; else if (x.old_value == null) delete cur.data[x.field]; else cur.data[x.field] = x.old_value;
      cur.version++; aud({ prov_id: x.prov_id, kind: x.kind, item_id: x.item_id, action: "hoan_tac", field: x.field, old_value: x.new_value, new_value: x.old_value }); save(); return ok(null);
    },
    admin_audit: function (a) { return ok(S.audit.filter(function (x) { return (!a.p_prov || x.prov_id === a.p_prov) && (!a.p_kind || x.kind === a.p_kind) && (!a.p_item || x.item_id === a.p_item); })); },
    admin_support: function () { return ok([]); },
    admin_ai_state: function () { var X = aiInit(); return ok({ settings: X.settings, today: X.cands.length, lessons: X.lessons.filter(function (l) { return l.active; }).length,
      agenda: X.agenda.map(function (g) { return Object.assign({}, g, { cho: X.cands.filter(function (c) { return c.agenda_id === g.id && c.status === "cho_duyet"; }).length, duyet: X.cands.filter(function (c) { return c.agenda_id === g.id && c.status === "da_duyet"; }).length }); }) }); },
    admin_ai_settings: function (a) { var X = aiInit(); if (!(a.p_budget >= 0 && a.p_budget <= 50)) return no("Hạn mức 0–50 trang mỗi ngày"); X.settings = { id: 1, enabled: !!a.p_enabled, sources: a.p_sources, daily_budget: a.p_budget }; aud({ prov_id: "he-thong", kind: "tro_ly", item_id: "nguon", action: "sua", new_value: X.settings }); save(); return ok(null); },
    admin_ai_agenda_save: function (a) {
      var X = aiInit(); if (String(a.p_target || "").trim().length < 2) return no("Nội dung cần học cần 2–160 ký tự");
      if (!a.p_id) { var g = { id: ++S.n, kind: a.p_kind, target: a.p_target.trim(), prov_id: a.p_prov || null, priority: a.p_priority || 2, status: a.p_status, note: a.p_note, runs: 0, last_run_at: null }; X.agenda.push(g); aud({ prov_id: "he-thong", kind: "tro_ly", item_id: "ct-" + g.id, action: "them", new_value: { target: g.target } }); save(); return ok(g.id); }
      var o = X.agenda.filter(function (x) { return x.id === a.p_id; })[0]; if (!o) return no("Không thấy mục học");
      aud({ prov_id: "he-thong", kind: "tro_ly", item_id: "ct-" + o.id, action: "sua", old_value: { status: o.status }, new_value: { status: a.p_status } });
      Object.assign(o, { kind: a.p_kind, target: a.p_target, prov_id: a.p_prov || null, priority: a.p_priority, status: a.p_status, note: a.p_note }); save(); return ok(o.id);
    },
    admin_ai_candidates: function (a) { var X = aiInit(); return ok(X.cands.filter(function (c) { return !a.p_status || c.status === a.p_status; }).map(function (c) { var g = X.agenda.filter(function (x) { return x.id === c.agenda_id; })[0] || {}; return Object.assign({ target: g.target, prov_id: g.prov_id }, c); })); },
    admin_ai_review: function (a) {
      var X = aiInit(), c = X.cands.filter(function (x) { return x.id === a.p_id; })[0]; if (!c) return no("Không thấy mục chờ duyệt"); if (c.status !== "cho_duyet") return no("Mục này đã được xử lý");
      var g = X.agenda.filter(function (x) { return x.id === c.agenda_id; })[0] || {};
      if (a.p_status === "tu_choi") { if (String(a.p_note || "").trim().length < 3) return no("Từ chối cần ghi lý do"); c.status = "tu_choi"; save(); return ok(null); }
      var d = { ten: a.p_ten || g.target, prov_id: g.prov_id || "", bai: c.title, t: a.p_text || c.excerpt, nguon: c.source, url: c.url };
      var l = { id: ++S.n, kind: "kien_thuc", data: d, active: true, candidate_id: c.id }; X.lessons.unshift(l); c.status = "da_duyet";
      aud({ prov_id: "he-thong", kind: "tro_ly", item_id: "bai-" + l.id, action: "them", new_value: d }); save(); return ok(l.id);
    },
    admin_ai_lessons: function () { return ok(aiInit().lessons.slice()); },
    admin_ai_lesson_save: function (a) {
      var X = aiInit(), d = {}; Object.keys(a.p_data || {}).forEach(function (k) { var v = String(a.p_data[k] || "").trim(); if (v) d[k] = v; });
      if (a.p_kind === "hoi_dap" && (!(d.q && d.q.length >= 4) || !(d.a && d.a.length >= 4))) return no(!(d.q && d.q.length >= 4) ? "Câu hỏi cần 4–200 ký tự" : "Câu trả lời cần 4–1500 ký tự");
      if (a.p_kind === "ten_goi" && !d.prov_id) return no("Tên gọi khác cần chọn tỉnh");
      if (a.p_kind === "go_sai" && !(d.sai && d.dung)) return no("Cách gõ sai cần 2–60 ký tự");
      if (!a.p_id) { var l = { id: ++S.n, kind: a.p_kind, data: d, active: a.p_active !== false }; X.lessons.unshift(l); aud({ prov_id: "he-thong", kind: "tro_ly", item_id: "bai-" + l.id, action: "them", new_value: d }); save(); return ok(l.id); }
      var o = X.lessons.filter(function (x) { return x.id === a.p_id; })[0]; if (!o) return no("Không thấy bài dạy");
      aud({ prov_id: "he-thong", kind: "tro_ly", item_id: "bai-" + o.id, action: "sua", old_value: Object.assign({ _bat: o.active }, o.data), new_value: Object.assign({ _bat: a.p_active }, d) });
      o.data = d; o.active = a.p_active !== false; save(); return ok(o.id);
    },
    admin_list: function () { return ok(S.admins.map(function (id) { return { user_id: id, name: USERS[id].name, email: USERS[id].email, created_at: new Date().toISOString(), note: null, is_me: id === user().id }; })); },
    admin_grant: function (a) {
      var id = Object.keys(USERS).filter(function (k) { return USERS[k].email === String(a.p_email || "").trim().toLowerCase(); })[0];
      if (!id) return no("Chưa có tài khoản với email này. Người đó cần đăng ký trong app trước");
      if (S.admins.indexOf(id) >= 0) return no("Tài khoản này đã là admin");
      S.admins.push(id); aud({ prov_id: "he-thong", kind: "admin", item_id: id, action: "cap_admin", new_value: USERS[id].email, note: a.p_note }); save(); return ok({ user_id: id });
    },
    admin_revoke: function (a) {
      if (a.p_user === user().id) return no("Không tự gỡ quyền admin của mình");
      var i = S.admins.indexOf(a.p_user); if (i < 0) return no("Tài khoản này không phải admin");
      S.admins.splice(i, 1); aud({ prov_id: "he-thong", kind: "admin", item_id: a.p_user, action: "go_admin", old_value: USERS[a.p_user].email, note: a.p_note }); save(); return ok(null);
    }
  };
  function q(rows) {
    var p = { order: function () { return p; }, limit: function () { return p; }, eq: function () { return p; }, then: function (f, r) { return ok(rows()).then(f, r); } };
    return p;
  }
  window.BTNeon = { createClient: function () {
    return {
      auth: { getSession: function () { var u = user(); return ok(u ? { session: { id: "s" }, user: u } : { session: null, user: null }); }, signOut: function () { return ok(null); } },
      rpc: function (n, a) { a = a || {}; if (n !== "is_admin" && /^admin_/.test(n) && !admin()) return no("Không có quyền"); return RPC[n] ? RPC[n](a) : no("Không có hàm " + n); },
      from: function () {
        return {
          insert: function (row) {
            var u = user(); if (!u) return no("Chưa đăng nhập");
            var mine = S.contribs.filter(function (c) { return c.user_id === u.id; });
            if (mine.length >= 30) return no("Quá 30 đóng góp trong 24 giờ, thử lại sau");
            if (["mon_moi", "cho_o_moi", "phuong_tien_moi"].indexOf(row.kind) >= 0 && !row.data) return no("Thiếu các trường bắt buộc");
            var c = Object.assign({ id: "c" + (++S.n), user_id: u.id, status: "cho_duyet", created_at: new Date().toISOString(), review_note: null }, row);
            if (row.data) { c.place_name = row.data.ten || (row.data.tu + " → " + row.data.den); if (row.data.link) c.source_url = row.data.link; }
            S.contribs.unshift(c); save(); return ok(null);
          },
          select: function () { return q(function () { var u = user(); return S.contribs.filter(function (c) { return u && c.user_id === u.id; }); }); },
          update: function (v) { return { eq: function (f, id) { S.contribs.forEach(function (c) { if (c.id === id) Object.assign(c, v); }); save(); return ok(null); } }; }
        };
      }
    };
  } };
})();
