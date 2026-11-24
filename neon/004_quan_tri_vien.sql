-- BuiTrip: admin tự cấp / gỡ quyền admin cho tài khoản khác ngay trên trang admin.
--   * Chỉ admin gọi được. Cấp theo email của tài khoản đã đăng ký (Neon Auth).
--   * Không tự gỡ quyền của mình, nên luôn còn ít nhất 1 admin.
--   * Mỗi lần cấp / gỡ ghi 1 dòng nhật ký (data_audit, prov_id 'he-thong', kind 'admin', item_id = id tài khoản).

alter table public.data_audit drop constraint if exists data_audit_action_check;
alter table public.data_audit add constraint data_audit_action_check
  check (action in ('sua','them','an','hien','xoa','hoan_tac','nhap_dong_gop','cap_admin','go_admin'));

create or replace function public.admin_list()
returns table (user_id text, name text, email text, created_at timestamptz, note text, is_me boolean)
language plpgsql stable security definer set search_path = '' as $$
begin
  if not public.is_admin() then raise exception 'Không có quyền'; end if;
  return query
    select a.user_id, u.name::text, u.email::text, a.created_at, a.note, a.user_id = auth.user_id()
    from public.admins a left join neon_auth."user" u on u.id::text = a.user_id
    order by a.created_at;
end $$;

create or replace function public.admin_grant(p_email text, p_note text default null)
returns json language plpgsql security definer set search_path = '' as $$
declare uid text; nm text;
begin
  if not public.is_admin() then raise exception 'Không có quyền'; end if;
  p_email := lower(trim(p_email));
  if p_email is null or p_email !~ '^[^@\s]+@[^@\s]+\.[^@\s]+$' or char_length(p_email) > 200 then
    raise exception 'Email không hợp lệ';
  end if;
  if p_note is not null and char_length(p_note) > 300 then raise exception 'Ghi chú tối đa 300 ký tự'; end if;
  select u.id::text, u.name::text into uid, nm from neon_auth."user" u where lower(u.email) = lower(trim(p_email)) limit 1;
  if uid is null then raise exception 'Chưa có tài khoản với email này. Người đó cần đăng ký trong app trước'; end if;
  if exists (select 1 from public.admins a where a.user_id = uid) then raise exception 'Tài khoản này đã là admin'; end if;
  insert into public.admins(user_id, note) values (uid, nullif(trim(p_note), ''));
  insert into public.data_audit(by_user, prov_id, kind, item_id, action, new_value, note)
    values (auth.user_id(), 'he-thong', 'admin', uid, 'cap_admin', to_jsonb(lower(trim(p_email))), nullif(trim(p_note), ''));
  return json_build_object('user_id', uid, 'name', nm);
end $$;

create or replace function public.admin_revoke(p_user text, p_note text default null)
returns void language plpgsql security definer set search_path = '' as $$
declare em text;
begin
  if not public.is_admin() then raise exception 'Không có quyền'; end if;
  if p_user = auth.user_id() then raise exception 'Không tự gỡ quyền admin của mình'; end if;
  if p_note is not null and char_length(p_note) > 300 then raise exception 'Ghi chú tối đa 300 ký tự'; end if;
  select u.email::text into em from neon_auth."user" u where u.id::text = p_user;
  delete from public.admins a where a.user_id = p_user;
  if not found then raise exception 'Tài khoản này không phải admin'; end if;
  insert into public.data_audit(by_user, prov_id, kind, item_id, action, old_value, note)
    values (auth.user_id(), 'he-thong', 'admin', p_user, 'go_admin', to_jsonb(em), nullif(trim(p_note), ''));
end $$;

do $$ declare f text; begin
  foreach f in array array['public.admin_list()', 'public.admin_grant(text,text)', 'public.admin_revoke(text,text)'] loop
    execute 'revoke all on function ' || f || ' from public, anonymous';
    execute 'grant execute on function ' || f || ' to authenticated';
  end loop;
end $$;
