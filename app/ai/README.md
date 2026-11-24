# BuiTrip AI

Trợ lý hỏi đáp chạy hoàn toàn trên máy người dùng. Không gọi mạng, không cần khóa API, mất sóng vẫn trả lời. Mỗi câu trả lời dưới 100 ms (đo trong Node, chậm nhất khoảng 50 ms).

Gọi từ trang: `askBuiTrip(câu hỏi, { noCtx })` trả `{ html, kind, intent, ent, ms, followed }`.

## Đường đi của một câu hỏi

| Bước | Tệp | Việc |
|---|---|---|
| 0 | `hoi-dap.js` | Câu hỏi thường gặp (`BT_FAQ`), tên quen gọi (`BT_ALIAS`), cách viết khác (`BT_BIEN_THE`: "Mã Pì Lèng" thành "Mã Pí Lèng") |
| 0 | `de-nham.js` | Nhóm tên dễ nhầm (`BT_DE_NHAM`: Núi Bà Đen / Núi Bà Rá, các "Chùa Ông"). Gặp tên trong nhóm thì hỏi lại |
| 1 | `chuan-hoa.js` | Bỏ dấu, bỏ từ hỏi, giữ nguyên cụm là tên riêng ("Kỳ Co", "Hội An", "Đền Hạ") |
| 2 | `thuc-the.js` | Tìm nơi được hỏi: đảo, khu, tỉnh (tên mới, tên cũ, tên quen gọi), địa danh, món, chỗ ở |
| 3 | `y-dinh.js` | Đoán ý định: đi bằng gì, mùa nào đẹp, ăn gì, ở đâu, chi phí, giá vé, so sánh, ngoài phạm vi… |
| 4–5 | `tra-loi.js` | Lấy dữ liệu thật và ghép câu trả lời, hoặc trả câu dự phòng 3 phần |
| 4 | `goi-y.js` | Suy luận trên dữ liệu: gợi ý nơi đi theo tháng, chủ đề, đối tượng, mát/ấm, vùng, nơi đi, số ngày, ngân sách; giới thiệu, lịch sử địa danh |
| | `boi-canh.js` | Đoạn trích Wikipedia (CC BY-SA 4.0) cho 294 địa danh, nạp lười. Sinh bởi `tools/tao-boi-canh.mjs` |
| | `ai-loader.js` | Nạp lười `boi-canh.js`; thanh Đúng/Chưa đúng dưới mọi câu trả lời, học trên máy, gửi góp ý (`tools/hoc/README.md`). Engine TF-IDF học trước đã gỡ khỏi app, mã ở `tools/buitrip-ai/`, so sánh bằng `npm run so-sanh` |
| 6 | `ngu-canh.js` | Nhớ 3 lượt hỏi gần nhất cho câu nối tiếp ("thế ăn gì"); "Hỏi lại từ đầu" xóa |
| | `index.js` | Nối các bước, chọn nhánh trả lời |

## Luật (vi phạm là trượt test)

1. Không bịa giá, giờ, số điện thoại. Chỉ in chuỗi có sẵn trong dữ liệu.
2. Không lấy dữ liệu tỉnh khác hay khu khác thay vào. Khu nằm sát trung tâm tỉnh (trong 60 km) mới dùng mùa của tỉnh, và ghi rõ.
3. Hỏi nơi nào trả nơi đó. Tên mơ hồ thì hỏi lại.
4. Mỗi câu trả lời có ít nhất một nút tới trang liên quan.
5. Không có dữ liệu thì trả đủ 3 phần: "App chưa có thông tin này.", một cách khác cụ thể để tự tìm, và 2–3 câu gợi ý app trả lời được.

## Thêm một loại câu hỏi

1. Thêm 1 dòng vào `INTENTS` trong `y-dinh.js` (thứ tự là độ ưu tiên).
2. Thêm 1 nhánh trả lời trong `tra-loi.js`, gọi từ `index.js`.
3. Thêm câu thử vào `tests/hypotheses/live-120.json` hoặc mẫu sinh trong `tests/hypotheses/generate.mjs`.

## Kiểm tra

```
cd tests
npm test                 # dữ liệu + bộ hỏi đáp + trình duyệt
npm run hypotheses       # chỉ bộ hỏi đáp
node hypotheses/run.mjs --chi-bank --in-loi 50
```

- `hypotheses/bank.csv`: 1.014 giả thiết. Kết quả máy chấm ghi ra `hypotheses/ket-qua-bank.csv`.
- `hypotheses/live-120.json`: 120 câu đã kiểm trên bản live, phải đạt 120/120.
- `hypotheses/ngoai-du-lieu.json`: 20 câu ngoài dữ liệu, phải dùng đủ dự phòng 3 phần.
- `hypotheses/generate.mjs`: sinh trên 10.000 câu từ dữ liệu ra `sinh-them.json`, phải đạt ít nhất 85% và liệt kê mọi lỗi CHẶN.
- `hypotheses/cham.mjs`: bộ chấm. Đáp án lấy từ dữ liệu app, không dùng hàm tìm thực thể của trợ lý.
  - CHẶN: sai nơi, bịa số, gợi ý đảo cấm.
  - NẶNG: thiếu nội dung, không khớp mục có sẵn, dự phòng thiếu phần.
  - NHẸ: thiếu nút, chậm quá 100 ms.
