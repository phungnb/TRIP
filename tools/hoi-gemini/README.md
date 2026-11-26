# Gemini hỏi, BuiTrip trả lời, máy chấm, người duyệt

Mục tiêu: khi chưa có người dùng thật, cho Gemini đóng vai hàng nghìn người dùng gõ câu hỏi theo đủ kiểu (không dấu, viết tắt, câu dài kể hoàn cảnh), để tìm chỗ trợ lý BuiTrip hiểu sai.

## Vì sao không lấy câu trả lời của Gemini

- Gemini tự đặt ra giá, giờ, số điện thoại. Dự án cấm điều này (`app/ai/README.md`, luật 1).
- Đã đo ngày 23/11/2026 (`tools/buitrip-ai/README.md`): sinh tới 99.270 câu theo mẫu cũng không làm câu hỏi thật được trả lời tốt hơn. Thứ còn thiếu là cách hỏi đa dạng, không phải số lượng câu.

Vì vậy Gemini **chỉ viết câu hỏi**. Gemini chỉ được gửi tên thực thể và loại câu hỏi, không được gửi dữ liệu. Câu trả lời vẫn do trợ lý trên máy sinh ra từ dữ liệu đã kiểm. `tests/hypotheses/cham.mjs` chấm từng câu, đáp án suy ra từ dữ liệu.

## Luồng

```
hoi-vu-vo.mjs   Gemini viết câu hỏi          -> ra/cau-hoi.json (cộng dồn, bỏ trùng)
cham.mjs        trợ lý trả lời, máy chấm     -> ra/ket-qua.md, ra/truot.json, ra/nhat-ky.jsonl
tools/hoc/de-xuat.mjs --vao ra/nhat-ky.jsonl -> ra/de-xuat.json (biến thể tên, dữ liệu thiếu)
người duyệt: đặt "duyet": true rồi chạy tools/hoc/ap-dung.mjs, hoặc sửa code nhận dạng
cd tests && npm test, rồi mới phát hành
```

Tùy chọn `cham.mjs --bai-day` sinh thêm file `ra/bai-day.json` để nhập hàng loạt ở thẻ "Định hướng học" của trang admin. Mỗi bài ghép một câu Gemini hỏi mà trợ lý trượt với câu trả lời trợ lý đã trả đúng cho câu mẫu cùng thực thể. **Bài dạy đóng băng câu trả lời tại thời điểm sinh**: dữ liệu giá sau này có sửa thì bài dạy không tự cập nhật. Chỉ nên dùng cho số ít câu, và ưu tiên sửa code nhận dạng.

## Chạy

```
node tools/hoi-gemini/hoi-vu-vo.mjs --gia-lap --so 300 --moi 6     # không gọi API, kiểm cả luồng
GEMINI_API_KEY=... node tools/hoi-gemini/hoi-vu-vo.mjs --so 40 --moi 8 --toi-da-goi 50
node tools/hoi-gemini/cham.mjs [--bai-day] [--in-loi 20]
```

- Mỗi thực thể tốn 1 lượt gọi. `--toi-da-goi` là trần số lượt gọi trong một lần chạy, mặc định 200.
- Thực thể đã có đủ câu hỏi thì không gọi lại.
- Model mặc định là `gemini-2.5-flash`, đổi bằng `--model` hoặc biến môi trường `GEMINI_MODEL`. Tên model và hạn mức miễn phí phải kiểm lại trên trang Google AI Studio vào ngày chạy.
- `ra/` không commit: đây là kết quả chạy, có thể chứa câu Gemini viết chưa duyệt.

## Kết quả chạy giả lập 25/11/2026 (không gọi Gemini)

Lệnh `--gia-lap --so 300 --moi 6 --hat 7` sinh 1.143 câu. Đúng 1.057/1.143 (92,5%), CHẶN 11, có 86 câu trượt nội dung. `--bai-day` đề xuất 24 bài.

Lỗi "chậm" (trả sau 100 ms) **không tính** vào tỷ lệ đúng, vì nó phụ thuộc máy chạy. Ví dụ cùng bộ câu này:
- máy chạy CI không có câu chậm nào;
- máy kiểm chứng của Muse có 231–294 câu chậm, nên nếu tính lỗi chậm thì chỉ còn đúng 791–853/1.143.

`cham.mjs` in riêng số câu chậm. Thêm `--tinh-cham` để chấm như `tests/hypotheses`.

Lỗi thật tìm được ngay ở chế độ giả lập: câu có hoàn cảnh đứng trước, ví dụ "nhà mình có con nhỏ, cho hỏi Làng Quan họ Diềm ở đâu", bị nhánh gợi ý theo đối tượng (`goi-y.js`) trả lời thay. Trợ lý bỏ qua địa danh đã nêu đích danh. Lỗi này nằm trong 64 câu "nhận dạng sai".

Một phần CHẶN "bịa số" là do bộ chấm báo nhầm với tên địa danh dài, ví dụ "Cổng Trời Quản Bạ và núi đôi Cô Tiên". Cần đọc tay trước khi sửa.
