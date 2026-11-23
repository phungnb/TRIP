# Vòng học của trợ lý BuiTrip (không cần API)

Trợ lý chạy hoàn toàn trên máy người dùng. "Học" ở đây là: gom câu trợ lý trả lời trượt, đề xuất sửa, **người duyệt**, rồi mới phát hành. Không có gì tự lên app.

## Luồng

1. Nhật ký câu hỏi (`.jsonl`, mỗi dòng `{"q": "...", "ok": true|false}`).
   Hiện app **chưa thu** câu người dùng gõ. Chỉ bật khi đã cập nhật chính sách quyền riêng tư và người dùng đồng ý rõ ràng.
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
