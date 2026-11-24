-- BuiTrip: admin định hướng nội dung trợ lý học (thẻ "Định hướng học" ở trang admin).
-- Trợ lý vẫn tự học như cũ (nhớ câu người dùng sửa trên máy họ, đề xuất cách gõ từ góp ý). Phần này thêm:
--   * Chương trình học (ai_agenda): admin chọn địa danh / chủ đề cần học, độ ưu tiên, tạm dừng.
--   * Nguồn và hạn mức (ai_settings): chỉ nguồn mở Wikimedia admin bật; tối đa N trang mỗi ngày.
--   * Hàng chờ (ai_candidates): việc chạy hằng ngày (/api/hoc-ngay) lấy đoạn giới thiệu theo chương trình học, chờ admin duyệt.
--   * Bài dạy (ai_lessons): admin dạy trực tiếp (câu hỏi + trả lời, tên gọi khác, cách gõ sai), hoặc đoạn kiến thức đã duyệt.
--     App đọc bài dạy đang bật qua /api/du-lieu, áp ngay, không cần deploy.
-- Mọi thay đổi ghi nhật ký (data_audit, prov_id 'he-thong', kind 'tro_ly').
-- Không lấy giá, giờ, số điện thoại từ nguồn tự động: đoạn kiến thức chỉ dùng cho câu hỏi giới thiệu, lịch sử.

-- ---------- 1. Nguồn và hạn mức (1 dòng) ----------
create table if not exists public.ai_settings (
  id int primary key default 1 check (id = 1),
  enabled boolean not null default true,
  sources text[] not null default array['wikipedia_vi','wikivoyage_vi'],
  daily_budget int not null default 10 check (daily_budget between 0 and 50),
  updated_by text,
  updated_at timestamptz not null default now(),
  check (sources <@ array['wikipedia_vi','wikipedia_en','wikivoyage_vi','wikivoyage_en'])
);
insert into public.ai_settings(id) values (1) on conflict do nothing;

-- ---------- 2. Chương trình học ----------
create table if not exists public.ai_agenda (
  id bigserial primary key,
  kind text not null check (kind in ('dia_danh','chu_de')),
  target text not null check (char_length(btrim(target)) between 2 and 160),
  prov_id text check (prov_id is null or prov_id ~ '^[a-z0-9-]{2,40}$'),
  priority int not null default 2 check (priority between 1 and 3),
  status text not null default 'dang_hoc' check (status in ('dang_hoc','tam_dung','xong')),
  note text check (note is null or char_length(note) <= 500),
  created_by text,
  created_at timestamptz not null default now(),
  last_run_at timestamptz,
  runs int not null default 0
);

-- ---------- 3. Hàng chờ duyệt ----------
create table if not exists public.ai_candidates (
  id bigserial primary key,
  agenda_id bigint not null references public.ai_agenda(id) on delete cascade,
  source text not null check (source in ('wikipedia_vi','wikipedia_en','wikivoyage_vi','wikivoyage_en')),
  title text not null check (char_length(title) <= 300),
  url text not null check (url ~ '^https://[a-z]{2}\.(wikipedia|wikivoyage)\.org/' and char_length(url) <= 600),
  revid bigint,
  excerpt text not null check (char_length(excerpt) between 20 and 2000),
  status text not null default 'cho_duyet' check (status in ('cho_duyet','da_duyet','tu_choi')),
  review_note text check (review_note is null or char_length(review_note) <= 500),
  fetched_at timestamptz not null default now(),
  reviewed_by text,
  reviewed_at timestamptz,
  unique (agenda_id, source, title)
);
create index if not exists ai_candidates_status_idx on public.ai_candidates(status, fetched_at desc);

-- ---------- 4. Bài dạy ----------
create table if not exists public.ai_lessons (
  id bigserial primary key,
  kind text not null check (kind in ('hoi_dap','ten_goi','go_sai','kien_thuc')),
  data jsonb not null check (jsonb_typeof(data) = 'object' and pg_column_size(data) <= 6000),
  active boolean not null default true,
  candidate_id bigint references public.ai_candidates(id) on delete set null,
  created_by text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table public.ai_settings enable row level security;
alter table public.ai_agenda enable row level security;
alter table public.ai_candidates enable row level security;
alter table public.ai_lessons enable row level security;
revoke all on public.ai_settings, public.ai_agenda, public.ai_candidates, public.ai_lessons from public, anonymous, authenticated;
-- /api/du-lieu đọc bài dạy đang bật bằng role bt_api (chỉ đọc)
grant select on public.ai_lessons to bt_api;
drop policy if exists ai_lessons_api_read on public.ai_lessons;
create policy ai_lessons_api_read on public.ai_lessons for select to bt_api using (active);

-- ---------- 5. Kiểm bài dạy (server) ----------
create or replace function public.bt_check_lesson(p_kind text, d jsonb) returns text
language plpgsql immutable set search_path = '' as $$
declare k text; allowed text[]; v text;
begin
  allowed := case p_kind
    when 'hoi_dap' then array['q','a','prov_id']
    when 'ten_goi' then array['ten','prov_id','ten_cu']
    when 'go_sai' then array['sai','dung']
    when 'kien_thuc' then array['ten','prov_id','bai','t','nguon','url']
    else null end;
  if allowed is null then return 'Loại bài dạy không hợp lệ'; end if;
  for k in select jsonb_object_keys(d) loop
    if not (k = any(allowed)) then return 'Trường "' || k || '" không dùng ở loại bài này'; end if;
    if jsonb_typeof(d->k) <> 'string' then return 'Trường "' || k || '" phải là chữ'; end if;
    v := d->>k;
    if v ~* '<\s*/?\s*(script|iframe|object|embed|style)' then return 'Không chèn mã vào bài dạy'; end if;
  end loop;
  if d ? 'prov_id' and (d->>'prov_id') <> '' and (d->>'prov_id') !~ '^[a-z0-9-]{2,40}$' then return 'Mã tỉnh không hợp lệ'; end if;
  if p_kind = 'hoi_dap' then
    if char_length(btrim(coalesce(d->>'q',''))) < 4 or char_length(d->>'q') > 200 then return 'Câu hỏi cần 4–200 ký tự'; end if;
    if char_length(btrim(coalesce(d->>'a',''))) < 4 or char_length(d->>'a') > 1500 then return 'Câu trả lời cần 4–1500 ký tự'; end if;
  elsif p_kind = 'ten_goi' then
    if char_length(btrim(coalesce(d->>'ten',''))) < 2 or char_length(d->>'ten') > 60 then return 'Tên gọi cần 2–60 ký tự'; end if;
    if coalesce(d->>'prov_id','') = '' then return 'Tên gọi khác cần chọn tỉnh'; end if;
    if char_length(coalesce(d->>'ten_cu','')) > 60 then return 'Tên tỉnh cũ tối đa 60 ký tự'; end if;
  elsif p_kind = 'go_sai' then
    if char_length(btrim(coalesce(d->>'sai',''))) < 2 or char_length(d->>'sai') > 60 then return 'Cách gõ sai cần 2–60 ký tự'; end if;
    if char_length(btrim(coalesce(d->>'dung',''))) < 2 or char_length(d->>'dung') > 80 then return 'Tên đúng cần 2–80 ký tự'; end if;
    if lower(btrim(d->>'sai')) = lower(btrim(d->>'dung')) then return 'Cách gõ sai trùng tên đúng'; end if;
  elsif p_kind = 'kien_thuc' then
    if char_length(btrim(coalesce(d->>'ten',''))) < 2 or char_length(d->>'ten') > 160 then return 'Tên địa danh / chủ đề cần 2–160 ký tự'; end if;
    if char_length(btrim(coalesce(d->>'t',''))) < 20 or char_length(d->>'t') > 2000 then return 'Đoạn kiến thức cần 20–2000 ký tự'; end if;
    if coalesce(d->>'url','') <> '' and (d->>'url') !~ '^https?://' then return 'Link phải bắt đầu bằng http:// hoặc https://'; end if;
  end if;
  return null;
end $$;

create or replace function public.bt_ai_audit(p_item text, p_action text, p_field text, p_old jsonb, p_new jsonb, p_note text)
returns void language sql security definer set search_path = '' as $$
  insert into public.data_audit(by_user, prov_id, kind, item_id, action, field, old_value, new_value, note)
  values (auth.user_id(), 'he-thong', 'tro_ly', p_item, p_action, null, p_old, p_new, p_note);
$$;
revoke all on function public.bt_ai_audit(text,text,text,jsonb,jsonb,text) from public, anonymous, authenticated;

-- ---------- 6. RPC cho admin ----------
create or replace function public.admin_ai_state()
returns json language plpgsql stable security definer set search_path = '' as $$
begin
  if not public.is_admin() then raise exception 'Không có quyền'; end if;
  return json_build_object(
    'settings', (select row_to_json(s) from public.ai_settings s where id = 1),
    'agenda', coalesce((select json_agg(a order by a.status = 'xong', a.priority, a.created_at desc) from (
        select g.*, (select count(*) from public.ai_candidates c where c.agenda_id = g.id and c.status = 'cho_duyet') cho,
               (select count(*) from public.ai_candidates c where c.agenda_id = g.id and c.status = 'da_duyet') duyet
        from public.ai_agenda g) a), '[]'::json),
    'today', (select count(*) from public.ai_candidates where fetched_at >= date_trunc('day', now())),
    'lessons', (select count(*) from public.ai_lessons where active));
end $$;

create or replace function public.admin_ai_settings(p_enabled boolean, p_sources text[], p_budget int)
returns void language plpgsql security definer set search_path = '' as $$
declare o public.ai_settings%rowtype;
begin
  if not public.is_admin() then raise exception 'Không có quyền'; end if;
  if p_budget is null or p_budget < 0 or p_budget > 50 then raise exception 'Hạn mức 0–50 trang mỗi ngày'; end if;
  if p_sources is null or not (p_sources <@ array['wikipedia_vi','wikipedia_en','wikivoyage_vi','wikivoyage_en']) then raise exception 'Nguồn không hợp lệ'; end if;
  select * into o from public.ai_settings where id = 1;
  update public.ai_settings set enabled = coalesce(p_enabled, true), sources = p_sources, daily_budget = p_budget, updated_by = auth.user_id(), updated_at = now() where id = 1;
  perform public.bt_ai_audit('nguon', 'sua', null,
    jsonb_build_object('enabled', o.enabled, 'sources', o.sources, 'budget', o.daily_budget),
    jsonb_build_object('enabled', coalesce(p_enabled, true), 'sources', p_sources, 'budget', p_budget), 'Nguồn và hạn mức học');
end $$;

create or replace function public.admin_ai_agenda_save(p_id bigint, p_kind text, p_target text, p_prov text, p_priority int, p_status text, p_note text)
returns bigint language plpgsql security definer set search_path = '' as $$
declare o public.ai_agenda%rowtype; nid bigint;
begin
  if not public.is_admin() then raise exception 'Không có quyền'; end if;
  if p_kind not in ('dia_danh','chu_de') then raise exception 'Loại mục học không hợp lệ'; end if;
  if char_length(btrim(coalesce(p_target,''))) < 2 or char_length(p_target) > 160 then raise exception 'Nội dung cần học cần 2–160 ký tự'; end if;
  if p_target ~* '<\s*/?\s*script' then raise exception 'Không chèn mã'; end if;
  if p_status not in ('dang_hoc','tam_dung','xong') then raise exception 'Trạng thái không hợp lệ'; end if;
  if p_id is null then
    insert into public.ai_agenda(kind, target, prov_id, priority, status, note, created_by)
      values (p_kind, btrim(p_target), nullif(p_prov, ''), coalesce(p_priority, 2), p_status, nullif(btrim(p_note), ''), auth.user_id()) returning id into nid;
    perform public.bt_ai_audit('ct-' || nid, 'them', null, null, jsonb_build_object('target', btrim(p_target), 'kind', p_kind, 'prov', p_prov), p_note);
    return nid;
  end if;
  select * into o from public.ai_agenda where id = p_id;
  if not found then raise exception 'Không thấy mục học'; end if;
  update public.ai_agenda set kind = p_kind, target = btrim(p_target), prov_id = nullif(p_prov, ''), priority = coalesce(p_priority, 2),
    status = p_status, note = nullif(btrim(p_note), ''),
    last_run_at = case when p_status = 'dang_hoc' and o.status <> 'dang_hoc' then null else last_run_at end
    where id = p_id;
  perform public.bt_ai_audit('ct-' || p_id, 'sua', null,
    jsonb_build_object('target', o.target, 'status', o.status, 'priority', o.priority),
    jsonb_build_object('target', btrim(p_target), 'status', p_status, 'priority', p_priority), p_note);
  return p_id;
end $$;

create or replace function public.admin_ai_candidates(p_status text default 'cho_duyet', p_agenda bigint default null)
returns table (id bigint, agenda_id bigint, target text, prov_id text, source text, title text, url text, excerpt text, status text, review_note text, fetched_at timestamptz)
language plpgsql stable security definer set search_path = '' as $$
begin
  if not public.is_admin() then raise exception 'Không có quyền'; end if;
  return query select c.id, c.agenda_id, g.target, g.prov_id, c.source, c.title, c.url, c.excerpt, c.status, c.review_note, c.fetched_at
    from public.ai_candidates c join public.ai_agenda g on g.id = c.agenda_id
    where (p_status is null or c.status = p_status) and (p_agenda is null or c.agenda_id = p_agenda)
    order by g.priority, c.fetched_at desc limit 200;
end $$;

-- Duyệt: tạo bài "kiến thức" (admin có thể sửa đoạn trích và tên gắn vào trước khi duyệt). Từ chối: cần lý do.
create or replace function public.admin_ai_review(p_id bigint, p_status text, p_ten text default null, p_text text default null, p_note text default null)
returns bigint language plpgsql security definer set search_path = '' as $$
declare c public.ai_candidates%rowtype; g public.ai_agenda%rowtype; d jsonb; err text; lid bigint;
begin
  if not public.is_admin() then raise exception 'Không có quyền'; end if;
  select * into c from public.ai_candidates where id = p_id for update;
  if not found then raise exception 'Không thấy mục chờ duyệt'; end if;
  if c.status <> 'cho_duyet' then raise exception 'Mục này đã được xử lý'; end if;
  select * into g from public.ai_agenda where id = c.agenda_id;
  if p_status = 'tu_choi' then
    if char_length(btrim(coalesce(p_note,''))) < 3 then raise exception 'Từ chối cần ghi lý do'; end if;
    update public.ai_candidates set status = 'tu_choi', review_note = btrim(p_note), reviewed_by = auth.user_id(), reviewed_at = now() where id = p_id;
    perform public.bt_ai_audit('hc-' || p_id, 'sua', null, null, to_jsonb('tu_choi'::text), btrim(p_note));
    return null;
  end if;
  if p_status <> 'da_duyet' then raise exception 'Trạng thái không hợp lệ'; end if;
  d := jsonb_build_object('ten', btrim(coalesce(nullif(p_ten, ''), g.target)), 'prov_id', coalesce(g.prov_id, ''), 'bai', c.title,
                          't', btrim(coalesce(nullif(p_text, ''), c.excerpt)), 'nguon', c.source, 'url', c.url);
  err := public.bt_check_lesson('kien_thuc', d);
  if err is not null then raise exception '%', err; end if;
  insert into public.ai_lessons(kind, data, candidate_id, created_by) values ('kien_thuc', d, p_id, auth.user_id()) returning id into lid;
  update public.ai_candidates set status = 'da_duyet', review_note = nullif(btrim(p_note), ''), reviewed_by = auth.user_id(), reviewed_at = now() where id = p_id;
  perform public.bt_ai_audit('bai-' || lid, 'them', null, null, d, coalesce(nullif(btrim(p_note), ''), 'Duyệt kiến thức từ ' || c.source));
  return lid;
end $$;

create or replace function public.admin_ai_lessons()
returns setof public.ai_lessons language plpgsql stable security definer set search_path = '' as $$
begin
  if not public.is_admin() then raise exception 'Không có quyền'; end if;
  return query select * from public.ai_lessons order by active desc, updated_at desc limit 500;
end $$;

create or replace function public.admin_ai_lesson_save(p_id bigint, p_kind text, p_data jsonb, p_active boolean default true, p_note text default null)
returns bigint language plpgsql security definer set search_path = '' as $$
declare o public.ai_lessons%rowtype; err text; nid bigint; d jsonb;
begin
  if not public.is_admin() then raise exception 'Không có quyền'; end if;
  if p_data is null or jsonb_typeof(p_data) <> 'object' then raise exception 'Thiếu nội dung bài dạy'; end if;
  select jsonb_object_agg(k, btrim(v)) into d from jsonb_each_text(p_data) as e(k, v) where btrim(v) <> '';
  d := coalesce(d, '{}'::jsonb);
  err := public.bt_check_lesson(p_kind, d);
  if err is not null then raise exception '%', err; end if;
  if p_id is null then
    insert into public.ai_lessons(kind, data, active, created_by) values (p_kind, d, coalesce(p_active, true), auth.user_id()) returning id into nid;
    perform public.bt_ai_audit('bai-' || nid, 'them', null, null, d, p_note);
    return nid;
  end if;
  select * into o from public.ai_lessons where id = p_id;
  if not found then raise exception 'Không thấy bài dạy'; end if;
  if o.kind <> p_kind then raise exception 'Không đổi loại bài dạy; tạo bài mới'; end if;
  update public.ai_lessons set data = d, active = coalesce(p_active, true), updated_at = now() where id = p_id;
  perform public.bt_ai_audit('bai-' || p_id, 'sua', null,
    o.data || jsonb_build_object('_bat', o.active), d || jsonb_build_object('_bat', coalesce(p_active, true)), p_note);
  return p_id;
end $$;

-- ---------- 7. Việc chạy hằng ngày (role bt_api, gọi từ /api/hoc-ngay) ----------
-- Lấy các mục cần học tiếp, trong hạn mức còn lại của hôm nay.
create or replace function public.bt_hoc_viec()
returns json language plpgsql security definer set search_path = '' as $$
declare s public.ai_settings%rowtype; used int; con int;
begin
  select * into s from public.ai_settings where id = 1;
  select count(*) into used from public.ai_candidates where fetched_at >= date_trunc('day', now());
  con := greatest(0, s.daily_budget - used);
  if not s.enabled or con = 0 or coalesce(array_length(s.sources, 1), 0) = 0 then
    return json_build_object('sources', s.sources, 'con', con, 'viec', '[]'::json);
  end if;
  return json_build_object('sources', s.sources, 'con', con, 'viec', coalesce((select json_agg(x) from (
    select g.id, g.kind, g.target, g.prov_id from public.ai_agenda g
    where g.status = 'dang_hoc' and (g.last_run_at is null or g.last_run_at < now() - interval '6 days')
    order by g.last_run_at nulls first, g.priority, g.created_at limit con) x), '[]'::json));
end $$;

-- Ghi 1 đoạn lấy được vào hàng chờ; vượt hạn mức hôm nay thì bỏ. Trả true nếu đã ghi.
create or replace function public.bt_hoc_ghi(p_agenda bigint, p_source text, p_title text, p_url text, p_revid bigint, p_excerpt text)
returns boolean language plpgsql security definer set search_path = '' as $$
declare s public.ai_settings%rowtype; used int;
begin
  select * into s from public.ai_settings where id = 1;
  if not s.enabled or not (p_source = any(s.sources)) then return false; end if;
  select count(*) into used from public.ai_candidates where fetched_at >= date_trunc('day', now());
  if used >= s.daily_budget then return false; end if;
  if p_excerpt ~* '<\s*/?\s*(script|iframe|object|embed|style)' then return false; end if;
  insert into public.ai_candidates(agenda_id, source, title, url, revid, excerpt)
    values (p_agenda, p_source, left(p_title, 300), p_url, p_revid, left(btrim(p_excerpt), 2000))
    on conflict (agenda_id, source, title) do nothing;
  return found;
end $$;

create or replace function public.bt_hoc_xong(p_agenda bigint)
returns void language sql security definer set search_path = '' as $$
  update public.ai_agenda set last_run_at = now(), runs = runs + 1 where id = p_agenda;
$$;

do $$ declare f text; begin
  foreach f in array array['public.admin_ai_state()', 'public.admin_ai_settings(boolean,text[],int)',
    'public.admin_ai_agenda_save(bigint,text,text,text,int,text,text)', 'public.admin_ai_candidates(text,bigint)',
    'public.admin_ai_review(bigint,text,text,text,text)', 'public.admin_ai_lessons()',
    'public.admin_ai_lesson_save(bigint,text,jsonb,boolean,text)'] loop
    execute 'revoke all on function ' || f || ' from public, anonymous';
    execute 'grant execute on function ' || f || ' to authenticated';
  end loop;
  foreach f in array array['public.bt_hoc_viec()', 'public.bt_hoc_ghi(bigint,text,text,text,bigint,text)', 'public.bt_hoc_xong(bigint)'] loop
    execute 'revoke all on function ' || f || ' from public, anonymous, authenticated';
    execute 'grant execute on function ' || f || ' to bt_api';
  end loop;
end $$;
revoke all on function public.bt_check_lesson(text,jsonb) from public, anonymous;
