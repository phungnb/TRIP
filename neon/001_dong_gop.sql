-- BuiTrip: người dùng đóng góp, admin duyệt. Neon project BuiTrip (wispy-frog-65399700), db neondb.
-- Đăng nhập: Neon Auth; auth.user_id() lấy từ JWT qua Data API.
create table if not exists public.admins (
  user_id text primary key,
  note text,
  created_at timestamptz not null default now()
);
alter table public.admins enable row level security;

create or replace function public.is_admin() returns boolean
language sql stable security definer set search_path = '' as $$
  select exists (select 1 from public.admins a where a.user_id = auth.user_id());
$$;

create table if not exists public.contributions (
  id uuid primary key default gen_random_uuid(),
  user_id text not null default auth.user_id(),
  kind text not null check (kind in ('sua_thong_tin','dia_danh_moi','bao_loi','anh')),
  prov_id text not null check (char_length(prov_id) between 2 and 40),
  place_id text check (place_id is null or char_length(place_id) <= 80),
  place_name text check (place_name is null or char_length(place_name) <= 160),
  field text check (field is null or char_length(field) <= 40),
  value text not null check (char_length(value) between 3 and 2000),
  source_url text check (source_url is null or (char_length(source_url) <= 500 and source_url ~* '^https?://')),
  status text not null default 'cho_duyet' check (status in ('cho_duyet','da_duyet','tu_choi','da_nhap')),
  review_note text check (review_note is null or char_length(review_note) <= 1000),
  reviewed_by text,
  reviewed_at timestamptz,
  created_at timestamptz not null default now()
);
create index if not exists contributions_status_idx on public.contributions(status, created_at desc);
create index if not exists contributions_user_idx on public.contributions(user_id, created_at desc);
alter table public.contributions enable row level security;

create policy contrib_insert_own on public.contributions for insert to authenticated
  with check (user_id = auth.user_id() and status = 'cho_duyet' and reviewed_by is null and reviewed_at is null and review_note is null);
create policy contrib_select on public.contributions for select to authenticated
  using (user_id = auth.user_id() or public.is_admin());
create policy contrib_admin_update on public.contributions for update to authenticated
  using (public.is_admin()) with check (public.is_admin());
create policy contrib_delete_own on public.contributions for delete to authenticated
  using (user_id = auth.user_id() and status = 'cho_duyet');

grant select, insert, update, delete on public.contributions to authenticated;
grant execute on function public.is_admin() to authenticated;
revoke all on public.admins from authenticated, anonymous;
revoke all on public.contributions from anonymous;

-- Chống spam: tối đa 30 đóng góp / người / 24 giờ
create or replace function public.contrib_limit() returns trigger
language plpgsql security definer set search_path = '' as $$
begin
  if (select count(*) from public.contributions
      where user_id = new.user_id and created_at > now() - interval '24 hours') >= 30 then
    raise exception 'Quá 30 đóng góp trong 24 giờ, thử lại sau';
  end if;
  return new;
end $$;
create trigger contrib_limit before insert on public.contributions
  for each row execute function public.contrib_limit();

-- Ghi người duyệt + thời điểm; khóa các cột người gửi
create or replace function public.contrib_review_stamp() returns trigger
language plpgsql security definer set search_path = '' as $$
begin
  if new.status is distinct from old.status then
    new.reviewed_by := auth.user_id(); new.reviewed_at := now();
  end if;
  new.user_id := old.user_id; new.created_at := old.created_at;
  new.kind := old.kind; new.prov_id := old.prov_id; new.place_id := old.place_id;
  new.value := old.value; new.source_url := old.source_url;
  return new;
end $$;
create trigger contrib_review_stamp before update on public.contributions
  for each row execute function public.contrib_review_stamp();

-- Admin xem kèm tên/email người gửi
create or replace function public.admin_contributions(p_status text default 'cho_duyet')
returns table (id uuid, kind text, prov_id text, place_id text, place_name text, field text, value text,
  source_url text, status text, review_note text, created_at timestamptz, reviewed_at timestamptz,
  author_name text, author_email text)
language plpgsql stable security definer set search_path = '' as $$
begin
  if not public.is_admin() then raise exception 'Không có quyền'; end if;
  return query
    select c.id, c.kind, c.prov_id, c.place_id, c.place_name, c.field, c.value, c.source_url, c.status,
           c.review_note, c.created_at, c.reviewed_at, u.name::text, u.email::text
    from public.contributions c left join neon_auth."user" u on u.id::text = c.user_id
    where p_status is null or c.status = p_status
    order by c.created_at desc limit 300;
end $$;
revoke all on function public.admin_contributions(text) from public, anonymous;
grant execute on function public.admin_contributions(text) to authenticated;
