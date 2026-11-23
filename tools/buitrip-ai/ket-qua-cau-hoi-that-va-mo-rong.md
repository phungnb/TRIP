# Thu thập câu hỏi thật từ diễn đàn/group + mở rộng lên ~100.000 câu: kết quả đo thật (23/11/2026)

Câu hỏi đặt ra: thêm câu hỏi (cào từ diễn đàn/group, hoặc sinh thêm) có làm trợ lý
trả lời giống GPT hơn không? Đã làm và đo thật, kết quả dưới đây.

## 1. Câu hỏi thật thu thập được: 216 câu (175 câu tiếng Việt)

- **Miền Bắc — 67 câu** (`cau-hoi-that-mien-bac.jsonl`): 20 câu nguyên văn từ VOZ
  (thread "Hà Giang đi mãi không chán"), Tinhte, OTOFUN; 47 câu dạng câu hỏi trên
  các trang du lịch (FAQ/tiêu đề bài). Nguồn: 28 trang khác nhau, không nguồn nào bị
  chặn. TripAdvisor chỉ có thread tiếng Anh nên không lấy; Facebook chủ yếu trả về
  bài quảng cáo, chỉ lấy được 1 câu.
- **Miền Trung + Tây Nguyên — 77 câu** (`cau-hoi-that-mien-trung.jsonl`): 52 câu
  TripAdvisor — **bằng tiếng Anh** (vd "How does one get from Hue to Nha Trang?"),
  chỉ 24 câu tiếng Việt; 20 câu Facebook nguyên văn (Quy Nhơn, Đà Lạt, Măng Đen,
  Huế — kể cả không dấu/viết tắt); 5 câu FAQ. Voz/Tinhte/Reddit không lấy được câu
  nào qua tìm kiếm công khai.
- **Miền Nam + đảo — 72 câu** (`cau-hoi-that-mien-nam.jsonl`): 62 câu nguyên văn từ
  bình luận/bài đăng Facebook công khai (kể cả teencode, không dấu); 10 câu FAQ.
  Thiếu: câu trực tiếp về Nam Du, Hòn Sơn, TP.HCM và "mang gì đi biển" — không thu
  được câu nguyên văn nào.
- **Sau khi lọc tiếng Việt: 175 câu** (`cau-hoi-that-vn.json`), 0 trùng. Chỉ dùng
  tìm kiếm công khai, không đăng nhập, không cào hàng loạt, không vượt rate limit.

## 2. Mở rộng lên ~100.000 câu: KHÔNG cải thiện câu trả lời thật

| Bộ dữ liệu | Câu huấn luyện | Ý định held-out | 24 câu thật (ý định / thực thể) |
|---|---|---|---|
| Ban đầu | 7.712 | 98,9% | 24/24, 22/24 |
| Mở rộng (toàn bộ điểm + mọi cách mở đầu) | 99.270 | 100,0% | 24/24, 22/24 |

- Mở rộng 13 lần chỉ làm held-out tăng 98,9% → 100,0% — nhưng held-out sinh từ
  cùng mẫu câu nên con số này phình to, không nói lên chất lượng thật.
- **Trên 24 câu hỏi thật: không đổi gì** (24/24 ý định, 22/24 thực thể). Câu trả lời
  vẫn ghép từ mẫu câu + số liệu — diễn đạt không tự nhiên hơn, không giống GPT hơn.
- Kết luận đo được: **cái thiếu không phải số lượng câu hỏi, mà là (a) mô hình ngôn
  ngữ để diễn đạt/suy luận và (b) dữ liệu món ăn/chỗ ở/chi phí trong kho.** Cào hàng
  triệu câu cũng không lấp được 2 cái thiếu này.

## 3. Nạp câu hỏi thật vào huấn luyện: độ phủ tăng rõ

Độ phủ = tỉ lệ câu hỏi thật được trả lời (ý định tin cậy ≥ 0,9 và truy hồi ≥ 0,3):

| Mô hình | Độ phủ 175 câu thật |
|---|---|
| Ban đầu (7.712 câu) | 111/175 = 63,4% |
| + nạp 175 câu thật | 158/175 = 90,3% |

- Câu thật giúp vì nó dạy cách diễn đạt thật: viết tắt ("qn" = Quy Nhơn, "e xin ít
  đc ăn ngon ở qn"), teencode, câu hỏi tiếp nối ("nằm ở đâu vậy"), chứ không phải vì
  số lượng.
- 3 lỗi thật bắt được từ câu thật và đã sửa: (1) viết tắt "qn/hn/sg/hcm/dn/dl/pq/nt"
  chưa hiểu — đã thêm bảng viết tắt vào `normalize.py`; (2) "nằm ở đâu" bị xếp nhầm
  thành ý định "ở" (chỗ ở) — đã thêm ý định mới `vi_tri` (14 ý định); (3) "Côn Đảo
  nằm ở đâu" trả thành Đảo Cồn Cỏ — nguyên nhân: kho không có mục "Côn Đảo" riêng
  (chỉ có "Vườn quốc gia Côn Đảo") — đã thêm mục Côn Đảo + điểm cộng khi toàn bộ
  token tên điểm đều có trong câu hỏi.
- **17 câu vẫn chưa trả lời được** (`cau-chua-tra-loi-duoc.json`): phần lớn là mảnh
  câu trong luồng bình luận, không đứng một mình được ("Gia, sau vay em", "Tv e với
  ạ", "Gửi c lịch đi", "bãi đầm trầu phải k nhỉ?", "Giá này trọn tour hay 1 chiều
  vậy a") — cần ngữ cảnh đoạn chat, không phải câu hỏi độc lập. Còn lại là câu về
  món ăn/chỗ ở/chi phí — kho chưa có bảng đó.

## 4. Số liệu cuối cùng của mô hình đã giao

- Dữ liệu huấn luyện: 8.552 câu sinh + 175 câu thật + bài học phản hồi Lăng Bác.
- Ý định held-out: 98,4% (1.690/1.717). 24 câu thật: ý định 24/24, thực thể 23/24.
- Độ phủ câu hỏi thật từ diễn đàn: 90,3% (158/175).
- Kho kiến thức: 622 mục (thêm mục Côn Đảo).
- Ý định: 14 (thêm `vi_tri`).

## 5. Việc tiếp theo (đề xuất, chưa làm)

- Bổ sung bảng món ăn (332 món) + chỗ ở (286 chỗ) + chi phí vào kho — đây mới là
  thứ chặn 17 câu còn lại và nhóm câu "ăn gì/ở đâu".
- Muốn diễn đạt tự nhiên như GPT mà không dùng API: làm bản thử mô hình ngôn ngữ
  nhỏ chạy trên máy người dùng, đo thật tốc độ/dung lượng/tỉ lệ bịa giá-giờ rồi mới
  quyết (theo khuyến nghị trong so sánh phương án).
- Câu hỏi thật tiếng Anh (53 câu TripAdvisor miền Trung) chưa dùng — trợ lý hiện
  chỉ phục vụ tiếng Việt; nếu muốn phục vụ khách nước ngoài thì huấn luyện thêm
  nhánh tiếng Anh.
