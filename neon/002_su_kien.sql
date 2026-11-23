-- Sự kiện đo lường của app (ghi qua /api/sukien). Đã tạo trên Neon BuiTrip ngày 23/11/2026.
create table if not exists svc.events (
  id bigserial primary key,
  at timestamptz not null default now(),
  name text not null check (name in ('tim_kiem','mo_tinh','luu_chuyen','xong_buoc_4')),
  tinh text, loai text, ngay int, ss text
);
create index if not exists events_name_at on svc.events(name, at);
grant select, insert on svc.events to bt_api;
grant usage on sequence svc.events_id_seq to bt_api;

-- Xem số 7 ngày qua: số lượt và số phiên của từng bước phễu
-- select name, count(*) luot, count(distinct ss) phien from svc.events
--  where at > now() - interval '7 days' group by name order by phien desc;
-- Tỉnh được mở nhiều nhất
-- select tinh, count(distinct ss) phien from svc.events where name='mo_tinh' and at > now() - interval '7 days'
--  group by tinh order by phien desc limit 10;
