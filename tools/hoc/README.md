# Vòng học của trợ lý BuiTrip (không cần API)

Trợ lý chạy hoàn toàn trên máy người dùng. "Học" ở đây là: gom câu trợ lý trả lời trượt, đề xuất sửa, **người duyệt**, rồi mới phát hành. Không có gì tự lên app.

## Luồng

1. Nhật ký câu hỏi (`.jsonl`, mỗi dòng `{"q": "...", "ok": true|false}`).
   App **không tự thu** câu người dùng gõ. Nguồn duy nhất là góp ý người dùng tự bấm gửi:
   dưới mỗi câu trả lời có "Đúng / Chưa đúng"; "Chưa đúng" mở ô ghi nơi đúng, chỗ sai và nút "Lưu và gửi cho BuiTrip"
   (gửi qua `/api/hotro`, lưu `svc.support`, chính sách mục 4).
   `BT_DB_URL=... node tools/hoc/lay-gop-y.mjs` -> `tools/hoc/ra/nhat-ky.jsonl` (chỉ đọc bảng, bỏ tên, liên hệ, IP).
   Học trên máy người dùng (không qua duyệt, chỉ máy đó): khi người dùng ghi nơi đúng mà app có trong dữ liệu,
   trợ lý nhớ câu đó -> nơi đó (localStorage `buitrip_ai_sua`, tối đa 100 câu), hỏi lại đúng câu thì trả theo nơi đã sửa.
2. `node tools/hoc/de-xuat.mjs --vao nhat-ky.jsonl` -> `tools/hoc/ra/de-xuat.json` và `de-xuat.md`.
   - `bien_the`: cách gõ gần với tên có trong dữ liệu (sai dấu, sai 1–2 chữ).
   - `thieu`: nơi/món được hỏi mà dữ liệu chưa có -> làm theo quy trình nhập dữ liệu.
   - `sai`: người dùng báo sai -> đọc tay.
   - `ngoai`: ngoài phạm vi, chỉ đếm.
   Lớp xóa thông tin riêng (email, số điện thoại, dãy số dài) chạy trước khi xử lý.
3. Mở `de-xuat.json`, đặt `"duyet": true` cho mục đúng.
4. `node tools/hoc/ap-dung.mjs` -> ghi vào `app/ai/hoc-them.js` (chỉ loại `bien_the`).
5. `cd tests && npm test` rồi mới phát hành (nhớ tăng `VER` trong `app/sw.js`).

## Kiểm vòng học

`cd tests && npm run hoc`: tạo nhật ký giả lập gõ sai, đạt khi đề xuất đúng tên ≥ 90%, áp vào sửa được ≥ 80%, có đề xuất cho ≥ 60% câu trượt.

## Admin định hướng nội dung học (trang admin, thẻ "Định hướng học")

Vòng học ở trên vẫn chạy như cũ. Thêm phần admin chỉ hướng, không cần dòng lệnh, không cần deploy:

- **Chương trình học**: admin thêm địa danh hoặc chủ đề cần học, đặt ưu tiên, tạm dừng / học tiếp.
- **Nguồn và hạn mức**: chọn nguồn được lấy (Wikipedia / Wikivoyage tiếng Việt, tiếng Anh) và số đoạn tối đa mỗi ngày (0–50, mặc định 10). Hạn mức kiểm ở server.
- **Việc hằng ngày** `app/api/hoc-ngay.js` (Vercel Cron 3 giờ sáng, `app/vercel.json`): với mục đến hạn (mỗi mục tối đa 1 lần / 6 ngày), tìm bài khớp tên trên nguồn đã bật, lấy đoạn giới thiệu, ghi vào hàng chờ. Chỉ API công khai Wikimedia; không lấy giá, giờ, số điện thoại.
- **Chờ duyệt**: admin đọc, sửa (dịch nếu là tiếng Anh), gắn vào địa danh / chủ đề rồi duyệt; từ chối cần lý do. Chỉ đoạn đã duyệt mới lên trợ lý.
- **Dạy trực tiếp**: câu hỏi + trả lời, tên gọi khác của tỉnh, cách gõ sai. Tắt / bật lại từng bài.
- Mọi thay đổi vào nhật ký trang admin. Server: `neon/005_dinh_huong_hoc.sql`. Trợ lý dùng bài qua `app/ai/bai-day.js`.

## Kiến thức mới từ Wikipedia

Engine học trước (`tools/buitrip-ai/wiki_learn.py`, chạy hằng tuần bằng `wiki-weekly.sh`) gom phần bối cảnh Wikipedia vào `app/ai/kb.json`.
`node tools/tao-boi-canh.mjs` lấy phần đó cho địa danh có trong app, cắt ở câu trọn vẹn, ghi `app/ai/boi-canh.js`.
Trợ lý dùng cho câu hỏi giới thiệu, lịch sử ("Hồ Gươm vì sao có tên", "lịch sử Hoàng thành Thăng Long"), ghi giấy phép CC BY-SA 4.0 dưới đoạn trích.
Không lấy giá, giờ, số điện thoại từ Wikipedia.
