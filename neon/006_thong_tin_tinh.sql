-- BuiTrip: admin sửa thông tin cấp tỉnh (cảnh báo chặt chém, số khẩn cấp, giờ đẹp chụp ảnh,
--   cho người chạy giải, bảng chi phí, lịch trình mẫu). Chạy 1 lần trong Neon SQL Editor,
--   TRƯỚC khi deploy code dùng nó (không thì nút Lưu báo "Loại mục sai").
--   * Thêm kind 'prov' vào data_overrides: 1 dòng / tỉnh, item_id = prov_id,
--     data = {scams, emergency, photoSpots, running, cost, itins}.
--   * File tĩnh (app/data/prov-data.js) vẫn là gốc; app hợp nhất qua /api/du-lieu
--     + js/du-lieu-sua.js (đã xử lý kind 'prov'); mất kết nối Neon thì app chạy bằng file tĩnh.

alter table public.data_overrides drop constraint if exists data_overrides_kind_check;
alter table public.data_overrides add constraint data_overrides_kind_check
  check (kind in ('place','dish','stay','route','local','prov'));

-- ---------- Kiểm 1 trường cấp tỉnh (thêm nhánh 'prov' vào bt_check_field) ----------
create or replace function public.bt_check_field(p_kind text, p_field text, v jsonb) returns text
language plpgsql immutable set search_path = '' as $$
declare allowed text[]; t text; r jsonb; k text; v2 jsonb; d jsonb; s2 jsonb;
begin
  allowed := case p_kind
    when 'place' then array['name','address','lat','lng','price','hours','duration','suitable','note','closed']
    when 'stay'  then array['name','address','kind','price','phone','dist','suitable','note','closed']
    when 'dish'  then array['name','meal','price','desc','restaurants','closed']
    when 'route' then array['from','mode','time','price','note','closed']
    when 'local' then array['mode','price','req','note','closed']
    when 'prov'  then array['scams','emergency','photoSpots','running','cost','itins']
    else array[]::text[] end;
  if not (p_field = any(allowed)) then return 'Trường "' || p_field || '" không sửa được ở loại mục này'; end if;
  if v is null or v = 'null'::jsonb then
    if p_field in ('name','mode') then return 'Tên không được để trống'; end if;
    return null;
  end if;
  if p_kind = 'prov' then
    if p_field = 'scams' then
      if jsonb_typeof(v) <> 'array' or jsonb_array_length(v) > 10 then return 'Tối đa 10 cảnh báo chặt chém'; end if;
      for r in select * from jsonb_array_elements(v) loop
        if jsonb_typeof(r) <> 'object' then return 'Mỗi cảnh báo phải là một mục'; end if;
        if coalesce(char_length(r->>'situation'), 0) > 2000 or coalesce(char_length(r->>'avoid'), 0) > 2000 or coalesce(char_length(r->>'source'), 0) > 500
          then return 'Cảnh báo quá dài (tình huống/cách tránh ≤ 2000 ký tự, nguồn ≤ 500)'; end if;
      end loop;
      return null;
    end if;
    if p_field = 'emergency' then
      if jsonb_typeof(v) <> 'object' then return 'Số khẩn cấp phải là một mục'; end if;
      if coalesce(char_length(v->>'police'), 0) > 20 or coalesce(char_length(v->>'ambulance'), 0) > 20 or coalesce(char_length(v->>'fire'), 0) > 20
         or coalesce(char_length(v->>'source'), 0) > 500 then return 'Số khẩn cấp quá dài'; end if;
      if v ? 'extra' and v->'extra' is not null then
        if jsonb_typeof(v->'extra') <> 'array' or jsonb_array_length(v->'extra') > 10 then return 'Tối đa 10 số liên hệ thêm'; end if;
        for r in select * from jsonb_array_elements(v->'extra') loop
          if jsonb_typeof(r) <> 'object' or coalesce(char_length(r->>'name'), 0) > 160 or coalesce(char_length(r->>'number'), 0) > 40 or coalesce(char_length(r->>'source'), 0) > 500
            then return 'Số liên hệ thêm quá dài (tên ≤ 160, số ≤ 40, nguồn ≤ 500)'; end if;
        end loop;
      end if;
      return null;
    end if;
    if p_field = 'photoSpots' then
      if jsonb_typeof(v) <> 'array' or jsonb_array_length(v) > 20 then return 'Tối đa 20 điểm chụp ảnh'; end if;
      for r in select * from jsonb_array_elements(v) loop
        if jsonb_typeof(r) <> 'object' or coalesce(char_length(r->>'place'), 0) > 160 or coalesce(char_length(r->>'time'), 0) > 1000 or coalesce(char_length(r->>'source'), 0) > 500
          then return 'Điểm chụp ảnh quá dài (điểm ≤ 160, giờ ≤ 1000, nguồn ≤ 500)'; end if;
      end loop;
      return null;
    end if;
    if p_field = 'running' then
      if jsonb_typeof(v) <> 'object' then return 'Mục chạy giải phải là một mục'; end if;
      if v ? 'races' and v->'races' is not null then
        if jsonb_typeof(v->'races') <> 'array' or jsonb_array_length(v->'races') > 10 then return 'Tối đa 10 giải chạy'; end if;
        for r in select * from jsonb_array_elements(v->'races') loop
          if jsonb_typeof(r) <> 'object' or coalesce(char_length(r->>'name'), 0) > 160 or coalesce(char_length(r->>'when'), 0) > 1000 or coalesce(char_length(r->>'source'), 0) > 500
            then return 'Giải chạy quá dài (tên ≤ 160, thời gian ≤ 1000, nguồn ≤ 500)'; end if;
        end loop;
      end if;
      return null;
    end if;
    if p_field = 'cost' then
      if jsonb_typeof(v) <> 'array' or jsonb_array_length(v) > 20 then return 'Tối đa 20 dòng chi phí'; end if;
      for r in select * from jsonb_array_elements(v) loop
        if jsonb_typeof(r) <> 'object' or coalesce(char_length(r->>'label'), 0) > 160 or coalesce(char_length(r->>'value'), 0) > 200
          then return 'Dòng chi phí quá dài (mục ≤ 160, giá ≤ 200)'; end if;
      end loop;
      return null;
    end if;
    if p_field = 'itins' then
      if jsonb_typeof(v) <> 'object' then return 'Lịch trình mẫu phải là một mục'; end if;
      for k, v2 in select * from jsonb_each(v) loop
        if k !~ '^[0-9]+N[0-9]+D$' then return 'Tên lịch trình phải dạng 3N2D'; end if;
        if jsonb_typeof(v2) <> 'array' or jsonb_array_length(v2) > 10 then return 'Mỗi lịch trình tối đa 10 ngày'; end if;
        for d in select * from jsonb_array_elements(v2) loop
          if jsonb_typeof(d) <> 'array' or jsonb_array_length(d) > 10 then return 'Mỗi ngày tối đa 10 buổi'; end if;
          for s2 in select * from jsonb_array_elements(d) loop
            if jsonb_typeof(s2) <> 'object' or coalesce(char_length(s2->>'s'), 0) > 40 or coalesce(char_length(s2->>'t'), 0) > 1000 or coalesce(char_length(s2->>'gan'), 0) > 200
              then return 'Buổi trong lịch trình quá dài (buổi ≤ 40, nội dung ≤ 1000)'; end if;
          end loop;
        end loop;
      end loop;
      return null;
    end if;
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

-- ---------- Lưu 1 dòng thông tin tỉnh (thêm 'prov' vào kiểm loại ở admin_save_item) ----------
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
  if p_kind not in ('place','dish','stay','route','local','prov') then raise exception 'Loại mục sai'; end if;
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
