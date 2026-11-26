-- BuiTrip: trang admin sửa dữ liệu trực tiếp + 3 loại đóng góp mới. Chạy sau 001_dong_gop.sql.
-- Nguyên tắc:
--   * File tĩnh (app/data/*.js) là bản gốc và bản dự phòng. Neon chỉ giữ BẢN SỬA của admin (data_overrides),
--     app tải về qua /api/du-lieu rồi hợp nhất khi mở trang. Mất kết nối Neon thì app chạy bằng file tĩnh.
--   * Mọi thao tác ghi của admin đi qua RPC security definer có kiểm is_admin(); client không có quyền ghi bảng.
--   * Mỗi thay đổi ghi 1 dòng nhật ký (data_audit): ai, mục nào, trường nào, cũ -> mới, lúc nào. Nhật ký không sửa, không xóa được.
--   * Quay lại giá trị trước: admin_revert(id nhật ký).

-- ---------- 1. Bản sửa dữ liệu ----------
create table if not exists public.data_overrides (
  prov_id text not null check (prov_id ~ '^[a-z0-9-]{2,40}$'),
  kind text not null check (kind in ('place','dish','stay','route','local')),
  item_id text not null check (item_id ~ '^[a-z0-9:-]{1,120}$'),
  data jsonb not null default '{}'::jsonb check (jsonb_typeof(data) = 'object' and pg_column_size(data) <= 20000),
  is_new boolean not null default false,
  hidden boolean not null default false,
  deleted boolean not null default false,
  updated_by text,
  updated_at timestamptz not null default now(),
  version int not null default 1,
  primary key (prov_id, kind, item_id)
);
alter table public.data_overrides enable row level security;
revoke all on public.data_overrides from public, anonymous, authenticated;
-- API công khai /api/du-lieu đọc bằng role bt_api (chỉ đọc)
grant usage on schema public to bt_api;
grant select on public.data_overrides to bt_api;
drop policy if exists ov_api_read on public.data_overrides;
create policy ov_api_read on public.data_overrides for select to bt_api using (true);

-- ---------- 2. Nhật ký thay đổi (chỉ thêm) ----------
create table if not exists public.data_audit (
  id bigserial primary key,
  at timestamptz not null default now(),
  by_user text not null,
  prov_id text not null,
  kind text not null,
  item_id text not null,
  action text not null check (action in ('sua','them','an','hien','xoa','hoan_tac','nhap_dong_gop')),
  field text,
  old_value jsonb,
  new_value jsonb,
  contrib_id uuid,
  note text check (note is null or char_length(note) <= 1000)
);
create index if not exists data_audit_item_idx on public.data_audit(prov_id, kind, item_id, at desc);
create index if not exists data_audit_at_idx on public.data_audit(at desc);
alter table public.data_audit enable row level security;
revoke all on public.data_audit from public, anonymous, authenticated, bt_api;
create or replace function public.data_audit_lock() returns trigger
language plpgsql set search_path = '' as $$
begin raise exception 'Nhật ký thay đổi không sửa, không xóa được'; end $$;
drop trigger if exists data_audit_lock on public.data_audit;
create trigger data_audit_lock before update or delete on public.data_audit
  for each row execute function public.data_audit_lock();

-- ---------- 3. Kiểm 1 trường (phía server) ----------
-- Trả câu lỗi tiếng Việt, hoặc null nếu hợp lệ. v = null nghĩa là xóa giá trị trường đó.
create or replace function public.bt_check_field(p_kind text, p_field text, v jsonb) returns text
language plpgsql immutable set search_path = '' as $$
declare allowed text[]; t text; r jsonb;
begin
  allowed := case p_kind
    when 'place' then array['name','address','lat','lng','price','hours','duration','suitable','note','closed']
    when 'stay'  then array['name','address','kind','price','phone','dist','suitable','note','closed']
    when 'dish'  then array['name','meal','price','desc','restaurants','closed']
    when 'route' then array['from','mode','time','price','note','closed']
    when 'local' then array['mode','price','req','note','closed']
    else array[]::text[] end;
  if not (p_field = any(allowed)) then return 'Trường "' || p_field || '" không sửa được ở loại mục này'; end if;
  if v is null or v = 'null'::jsonb then
    if p_field in ('name','mode') then return 'Tên không được để trống'; end if;
    return null;
  end if;
  if p_field in ('lat','lng') then
    if jsonb_typeof(v) <> 'number' then return 'Tọa độ phải là số'; end if;
    if p_field = 'lat' and ((v #>> '{}')::numeric < 8 or (v #>> '{}')::numeric > 24) then return 'Vĩ độ ngoài Việt Nam (8–24)'; end if;
    if p_field = 'lng' and ((v #>> '{}')::numeric < 102 or (v #>> '{}')::numeric > 118) then return 'Kinh độ ngoài Việt Nam (102–118)'; end if;
    return null;
  end if;
  if p_field = 'restaurants' then
    if jsonb_typeof(v) <> 'array' or jsonb_array_length(v) > 20 then return 'Danh sách quán phải là mảng, tối đa 20'; end if;
    for r in select * from jsonb_array_elements(v) loop
      if jsonb_typeof(r) <> 'object' or coalesce(char_length(r->>'name'),0) not between 2 and 160
         or coalesce(char_length(r->>'address'),0) > 300 or coalesce(char_length(r->>'price'),0) > 200 then
        return 'Mỗi quán cần tên 2–160 ký tự, địa chỉ ≤ 300, giá ≤ 200';
      end if;
    end loop;
    return null;
  end if;
  if jsonb_typeof(v) <> 'string' then return 'Trường "' || p_field || '" phải là chữ'; end if;
  t := v #>> '{}';
  if p_field = 'closed' then
    if t not in ('', 'tam_dong', 'dong_han') then return 'Trạng thái chỉ nhận: đang mở, tạm đóng, đóng hẳn'; end if;
    return null;
  end if;
  if p_field = 'from' then
    if t not in ('sg','hn','dn') then return 'Nơi đi chỉ nhận TP.HCM, Hà Nội, Đà Nẵng'; end if;
    return null;
  end if;
  if p_field in ('name','mode') and char_length(btrim(t)) not between 2 and 160 then return 'Tên cần 2–160 ký tự'; end if;
  if p_field = 'price' and btrim(t) <> '' and t !~* '[0-9]|miễn phí|chưa kiểm được|chưa có giá|không thu' then
    return 'Giá phải có con số, hoặc ghi "Miễn phí" / "Chưa có giá"';
  end if;
  if p_field = 'phone' and btrim(t) <> '' and t !~ '^[0-9 +().–-]{6,40}$' then return 'Số điện thoại chỉ gồm số, dấu cách, + ( ) -'; end if;
  if char_length(t) > 1000 then return 'Trường "' || p_field || '" quá dài (tối đa 1000 ký tự)'; end if;
  if t ~ '<\s*script' then return 'Không nhận mã HTML'; end if;
  return null;
end $$;

-- ---------- 4. Lưu 1 mục (sửa hoặc thêm) ----------
create or replace function public.admin_save_item(
  p_prov text, p_kind text, p_item text, p_patch jsonb,
  p_base jsonb default '{}'::jsonb, p_is_new boolean default false,
  p_contrib uuid default null, p_note text default null)
returns json
language plpgsql security definer set search_path = '' as $$
declare cur public.data_overrides%rowtype; had boolean; k text; v jsonb; old jsonb; err text; n int := 0; me text := auth.user_id(); ver int;
begin
  if not public.is_admin() then raise exception 'Không có quyền'; end if;
  if p_patch is null or jsonb_typeof(p_patch) <> 'object' then raise exception 'Dữ liệu sửa không hợp lệ'; end if;
  if p_prov !~ '^[a-z0-9-]{2,40}$' or p_item !~ '^[a-z0-9:-]{1,120}$' then raise exception 'Mã tỉnh hoặc mã mục sai định dạng'; end if;
  if p_kind not in ('place','dish','stay','route','local') then raise exception 'Loại mục sai'; end if;
  if p_note is not null and char_length(p_note) > 1000 then raise exception 'Ghi chú quá dài'; end if;
  select * into cur from public.data_overrides where prov_id = p_prov and kind = p_kind and item_id = p_item for update;
  had := found;
  if p_is_new then
    if had then raise exception 'Mã mục đã có, chọn tên khác'; end if;
    if coalesce(btrim(p_patch->>(case when p_kind in ('route','local') then 'mode' else 'name' end)), '') = '' then raise exception 'Mục mới cần tên'; end if;
    if p_kind = 'route' and coalesce(p_patch->>'from', '') = '' then raise exception 'Tuyến mới cần nơi đi'; end if;
  elsif had and cur.deleted then raise exception 'Mục đã xóa';
  end if;
  for k, v in select * from jsonb_each(p_patch) loop
    err := public.bt_check_field(p_kind, k, v);
    if err is not null then raise exception '%', err; end if;
    old := case when had and cur.data ? k then cur.data->k else p_base->k end;
    if old is distinct from v then
      insert into public.data_audit(by_user, prov_id, kind, item_id, action, field, old_value, new_value, contrib_id, note)
      values (me, p_prov, p_kind, p_item, case when p_is_new then 'them' else 'sua' end, k, old, v, p_contrib, p_note);
      n := n + 1;
    end if;
  end loop;
  if n = 0 and p_contrib is null then return json_build_object('item_id', p_item, 'changed', 0, 'version', coalesce(cur.version, 0)); end if;
  insert into public.data_overrides as o (prov_id, kind, item_id, data, is_new, updated_by, updated_at)
  values (p_prov, p_kind, p_item, p_patch, p_is_new, me, now())
  on conflict (prov_id, kind, item_id) do update
    set data = o.data || excluded.data, updated_by = me, updated_at = now(), version = o.version + 1
  returning version into ver;
  if p_contrib is not null then
    perform set_config('bt.import', '1', true);
    update public.contributions set status = 'da_nhap',
      review_note = coalesce(nullif(btrim(p_note), ''), review_note, 'Đã đưa vào app')
    where id = p_contrib and status in ('cho_duyet', 'da_duyet');
    if not found then raise exception 'Đóng góp không còn ở trạng thái chờ hoặc đã duyệt'; end if;
    insert into public.data_audit(by_user, prov_id, kind, item_id, action, contrib_id, note)
    values (me, p_prov, p_kind, p_item, 'nhap_dong_gop', p_contrib, p_note);
  end if;
  return json_build_object('item_id', p_item, 'changed', n, 'version', ver);
end $$;

-- ---------- 5. Ẩn / hiện, xóa (2 bước) ----------
create or replace function public.admin_set_hidden(p_prov text, p_kind text, p_item text, p_hidden boolean, p_note text default null)
returns void language plpgsql security definer set search_path = '' as $$
declare me text := auth.user_id(); was boolean;
begin
  if not public.is_admin() then raise exception 'Không có quyền'; end if;
  if p_prov !~ '^[a-z0-9-]{2,40}$' or p_item !~ '^[a-z0-9:-]{1,120}$' or p_kind not in ('place','dish','stay','route','local') then raise exception 'Mã mục sai'; end if;
  select hidden into was from public.data_overrides where prov_id = p_prov and kind = p_kind and item_id = p_item;
  if coalesce(was, false) = p_hidden then return; end if;
  insert into public.data_overrides as o (prov_id, kind, item_id, hidden, updated_by)
  values (p_prov, p_kind, p_item, p_hidden, me)
  on conflict (prov_id, kind, item_id) do update set hidden = p_hidden, updated_by = me, updated_at = now(), version = o.version + 1;
  insert into public.data_audit(by_user, prov_id, kind, item_id, action, field, old_value, new_value, note)
  values (me, p_prov, p_kind, p_item, case when p_hidden then 'an' else 'hien' end, 'hidden', to_jsonb(coalesce(was, false)), to_jsonb(p_hidden), p_note);
end $$;

-- Xóa hẳn: bước 2 phải gõ lại đúng mã mục và ghi lý do. Mục bị đánh dấu xóa, app không hiện; nhật ký giữ nguyên.
create or replace function public.admin_delete_item(p_prov text, p_kind text, p_item text, p_confirm text, p_note text)
returns void language plpgsql security definer set search_path = '' as $$
declare me text := auth.user_id(); cur public.data_overrides%rowtype;
begin
  if not public.is_admin() then raise exception 'Không có quyền'; end if;
  if p_confirm is distinct from p_item then raise exception 'Gõ lại đúng mã mục để xác nhận xóa'; end if;
  if char_length(btrim(coalesce(p_note, ''))) < 3 then raise exception 'Cần ghi lý do xóa'; end if;
  if p_prov !~ '^[a-z0-9-]{2,40}$' or p_item !~ '^[a-z0-9:-]{1,120}$' or p_kind not in ('place','dish','stay','route','local') then raise exception 'Mã mục sai'; end if;
  select * into cur from public.data_overrides where prov_id = p_prov and kind = p_kind and item_id = p_item;
  insert into public.data_overrides as o (prov_id, kind, item_id, deleted, hidden, updated_by)
  values (p_prov, p_kind, p_item, true, true, me)
  on conflict (prov_id, kind, item_id) do update set deleted = true, hidden = true, updated_by = me, updated_at = now(), version = o.version + 1;
  insert into public.data_audit(by_user, prov_id, kind, item_id, action, old_value, note)
  values (me, p_prov, p_kind, p_item, 'xoa', case when cur.prov_id is null then null else to_jsonb(cur.data) end, p_note);
end $$;

-- ---------- 6. Hoàn tác 1 dòng nhật ký ----------
create or replace function public.admin_revert(p_audit_id bigint)
returns void language plpgsql security definer set search_path = '' as $$
declare a public.data_audit%rowtype; me text := auth.user_id(); err text;
begin
  if not public.is_admin() then raise exception 'Không có quyền'; end if;
  select * into a from public.data_audit where id = p_audit_id;
  if not found then raise exception 'Không thấy dòng nhật ký'; end if;
  if a.action in ('an','hien') then
    perform public.admin_set_hidden(a.prov_id, a.kind, a.item_id, a.action = 'hien', 'Hoàn tác #' || a.id);
    return;
  end if;
  if a.action = 'xoa' then
    update public.data_overrides set deleted = false, hidden = false, updated_by = me, updated_at = now(), version = version + 1
      where prov_id = a.prov_id and kind = a.kind and item_id = a.item_id;
    insert into public.data_audit(by_user, prov_id, kind, item_id, action, note)
      values (me, a.prov_id, a.kind, a.item_id, 'hoan_tac', 'Khôi phục mục đã xóa (#' || a.id || ')');
    return;
  end if;
  if a.field is null then raise exception 'Dòng nhật ký này không có giá trị để quay lại'; end if;
  if a.old_value is not null then
    err := public.bt_check_field(a.kind, a.field, a.old_value);
    if err is not null then raise exception '%', err; end if;
  end if;
  update public.data_overrides
    set data = case when a.old_value is null then data - a.field else jsonb_set(data, array[a.field], a.old_value) end,
        updated_by = me, updated_at = now(), version = version + 1
    where prov_id = a.prov_id and kind = a.kind and item_id = a.item_id;
  insert into public.data_audit(by_user, prov_id, kind, item_id, action, field, old_value, new_value, note)
  values (me, a.prov_id, a.kind, a.item_id, 'hoan_tac', a.field, a.new_value, a.old_value, 'Quay lại giá trị trước #' || a.id);
end $$;

-- ---------- 7. Admin đọc bản sửa và nhật ký ----------
create or replace function public.admin_overrides()
returns setof public.data_overrides language plpgsql stable security definer set search_path = '' as $$
begin
  if not public.is_admin() then raise exception 'Không có quyền'; end if;
  return query select * from public.data_overrides order by updated_at desc;
end $$;

create or replace function public.admin_audit(p_prov text default null, p_kind text default null, p_item text default null, p_limit int default 200)
returns table (id bigint, at timestamptz, by_name text, by_email text, prov_id text, kind text, item_id text, action text,
  field text, old_value jsonb, new_value jsonb, contrib_id uuid, note text)
language plpgsql stable security definer set search_path = '' as $$
begin
  if not public.is_admin() then raise exception 'Không có quyền'; end if;
  return query
    select a.id, a.at, coalesce(u.name::text, a.by_user), u.email::text, a.prov_id, a.kind, a.item_id, a.action, a.field, a.old_value, a.new_value, a.contrib_id, a.note
    from public.data_audit a left join neon_auth."user" u on u.id::text = a.by_user
    where (p_prov is null or a.prov_id = p_prov) and (p_kind is null or a.kind = p_kind) and (p_item is null or a.item_id = p_item)
    order by a.at desc, a.id desc limit least(greatest(coalesce(p_limit, 200), 1), 1000);
end $$;

-- ---------- 8. Đóng góp: 3 loại mới + trường có cấu trúc ----------
alter table public.contributions add column if not exists data jsonb
  check (data is null or (jsonb_typeof(data) = 'object' and pg_column_size(data) <= 8000));
alter table public.contributions drop constraint if exists contributions_kind_check;
alter table public.contributions add constraint contributions_kind_check
  check (kind in ('sua_thong_tin','dia_danh_moi','bao_loi','anh','mon_moi','cho_o_moi','phuong_tien_moi'));

-- Kiểm trường có cấu trúc, ghép tóm tắt vào cột value, đưa link vào source_url
create or replace function public.contrib_validate() returns trigger
language plpgsql security definer set search_path = '' as $$
declare d jsonb := new.data; k text; v jsonb; allowed text[]; req text[]; nums text[] := array['gia_tu','gia_den','lat','lng'];
  s text; t text;
begin
  if d is null then
    if new.kind in ('mon_moi','cho_o_moi','phuong_tien_moi') then raise exception 'Thiếu các trường bắt buộc'; end if;
    return new;
  end if;
  allowed := case new.kind
    when 'mon_moi' then array['ten','quan','dia_chi','gia_tu','gia_den','mo_ta','link']
    when 'cho_o_moi' then array['ten','loai','dia_chi','gia_tu','gia_den','tien_ich','link']
    when 'phuong_tien_moi' then array['loai','tu','den','gia_tu','gia_den','thoi_gian','tan_suat','don_vi','link']
    when 'dia_danh_moi' then array['ten','dia_chi','lat','lng','gia_tu','gia_den','gio','vi_sao','link']
    else array[]::text[] end;
  req := case new.kind
    when 'mon_moi' then array['ten'] when 'cho_o_moi' then array['ten','loai']
    when 'phuong_tien_moi' then array['loai','tu','den'] when 'dia_danh_moi' then array['ten']
    else array[]::text[] end;
  if cardinality(allowed) = 0 then raise exception 'Loại đóng góp này không nhận trường có cấu trúc'; end if;
  foreach k in array req loop
    if coalesce(btrim(d->>k), '') = '' then raise exception 'Thiếu trường bắt buộc: %', k; end if;
  end loop;
  for k, v in select * from jsonb_each(d) loop
    if not (k = any(allowed)) then raise exception 'Trường không hợp lệ: %', k; end if;
    if v = 'null'::jsonb then continue; end if;
    if k = any(nums) then
      if jsonb_typeof(v) <> 'number' then raise exception 'Trường % phải là số', k; end if;
      if k in ('gia_tu','gia_den') and ((v #>> '{}')::numeric < 0 or (v #>> '{}')::numeric > 100000000) then raise exception 'Giá ngoài khoảng 0–100.000.000đ'; end if;
      if k = 'lat' and ((v #>> '{}')::numeric < 8 or (v #>> '{}')::numeric > 24) then raise exception 'Vĩ độ ngoài Việt Nam'; end if;
      if k = 'lng' and ((v #>> '{}')::numeric < 102 or (v #>> '{}')::numeric > 118) then raise exception 'Kinh độ ngoài Việt Nam'; end if;
    else
      if jsonb_typeof(v) <> 'string' then raise exception 'Trường % phải là chữ', k; end if;
      t := v #>> '{}';
      if char_length(t) > (case when k in ('mo_ta','vi_sao','tien_ich') then 600 else 300 end) then raise exception 'Trường % quá dài', k; end if;
      if k = 'link' and btrim(t) <> '' and (t !~* '^https?://' or char_length(t) > 500) then raise exception 'Link phải bắt đầu bằng http:// hoặc https://'; end if;
    end if;
  end loop;
  if new.kind = 'cho_o_moi' and d->>'loai' not in ('khach_san','homestay','resort','nha_nghi','hostel','khac') then raise exception 'Loại chỗ ở không hợp lệ'; end if;
  if new.kind = 'phuong_tien_moi' and d->>'loai' not in ('xe_khach','tau_hoa','tau_thuy','may_bay','xe_may','xe_buyt','khac') then raise exception 'Loại phương tiện không hợp lệ'; end if;
  if (d->>'gia_tu') is not null and (d->>'gia_den') is not null and (d->>'gia_tu')::numeric > (d->>'gia_den')::numeric then raise exception 'Giá từ lớn hơn giá đến'; end if;
  -- tóm tắt cho cột value (bắt buộc 3–2000 ký tự) để danh sách cũ vẫn đọc được
  s := concat_ws(' · ',
    coalesce(d->>'ten', nullif(concat_ws(' → ', d->>'tu', d->>'den'), '')),
    d->>'loai', d->>'quan', d->>'dia_chi',
    case when d ? 'gia_tu' or d ? 'gia_den' then 'Giá ' || concat_ws('–', d->>'gia_tu', d->>'gia_den') || 'đ' end,
    d->>'gio', d->>'thoi_gian', d->>'tan_suat', d->>'don_vi', d->>'tien_ich', d->>'mo_ta', d->>'vi_sao');
  new.value := left(s, 2000);
  if char_length(new.value) < 3 then new.value := rpad(new.value, 3, '.'); end if;
  if coalesce(btrim(d->>'link'), '') <> '' then new.source_url := d->>'link'; end if;
  new.place_name := left(coalesce(d->>'ten', concat_ws(' → ', d->>'tu', d->>'den')), 160);
  return new;
end $$;
drop trigger if exists contrib_validate on public.contributions;
create trigger contrib_validate before insert on public.contributions
  for each row execute function public.contrib_validate();

-- Duyệt: khóa cột người gửi (kể cả data); từ chối bắt buộc lý do; "Đã nhập" chỉ do nút Nhập vào app (trừ ảnh)
create or replace function public.contrib_review_stamp() returns trigger
language plpgsql security definer set search_path = '' as $$
begin
  if new.status is distinct from old.status then
    new.reviewed_by := auth.user_id(); new.reviewed_at := now();
    if new.status = 'tu_choi' and char_length(btrim(coalesce(new.review_note, ''))) < 3 then
      raise exception 'Từ chối cần ghi lý do cho người gửi';
    end if;
    if new.status = 'da_nhap' and old.kind <> 'anh' and current_setting('bt.import', true) is distinct from '1' then
      raise exception 'Dùng nút "Nhập vào app" để đưa đóng góp vào app';
    end if;
  end if;
  new.user_id := old.user_id; new.created_at := old.created_at;
  new.kind := old.kind; new.prov_id := old.prov_id; new.place_id := old.place_id; new.place_name := old.place_name;
  new.field := old.field; new.value := old.value; new.source_url := old.source_url; new.data := old.data;
  return new;
end $$;

-- Danh sách cho admin: thêm cột data
drop function if exists public.admin_contributions(text);
create function public.admin_contributions(p_status text default 'cho_duyet')
returns table (id uuid, kind text, prov_id text, place_id text, place_name text, field text, value text, data jsonb,
  source_url text, status text, review_note text, created_at timestamptz, reviewed_at timestamptz,
  author_name text, author_email text)
language plpgsql stable security definer set search_path = '' as $$
begin
  if not public.is_admin() then raise exception 'Không có quyền'; end if;
  return query
    select c.id, c.kind, c.prov_id, c.place_id, c.place_name, c.field, c.value, c.data, c.source_url, c.status,
           c.review_note, c.created_at, c.reviewed_at, u.name::text, u.email::text
    from public.contributions c left join neon_auth."user" u on u.id::text = c.user_id
    where p_status is null or c.status = p_status
    order by c.created_at desc limit 300;
end $$;

-- Duyệt / từ chối nhiều mục cùng lúc
create or replace function public.admin_review_many(p_ids uuid[], p_status text, p_note text default null)
returns int language plpgsql security definer set search_path = '' as $$
declare n int;
begin
  if not public.is_admin() then raise exception 'Không có quyền'; end if;
  if p_status not in ('da_duyet','tu_choi','cho_duyet') then raise exception 'Trạng thái sai'; end if;
  if cardinality(p_ids) > 200 then raise exception 'Tối đa 200 mục mỗi lần'; end if;
  update public.contributions set status = p_status,
    review_note = coalesce(nullif(btrim(p_note), ''), review_note)
  where id = any(p_ids) and status <> 'da_nhap';
  get diagnostics n = row_count;
  return n;
end $$;

-- ---------- 9. Quyền gọi ----------
do $$ declare f text; begin
  foreach f in array array[
    'public.admin_save_item(text,text,text,jsonb,jsonb,boolean,uuid,text)',
    'public.admin_set_hidden(text,text,text,boolean,text)',
    'public.admin_delete_item(text,text,text,text,text)',
    'public.admin_revert(bigint)',
    'public.admin_overrides()',
    'public.admin_audit(text,text,text,int)',
    'public.admin_contributions(text)',
    'public.admin_review_many(uuid[],text,text)'] loop
    execute 'revoke all on function ' || f || ' from public, anonymous';
    execute 'grant execute on function ' || f || ' to authenticated';
  end loop;
end $$;
revoke all on function public.bt_check_field(text,text,jsonb) from public, anonymous;
