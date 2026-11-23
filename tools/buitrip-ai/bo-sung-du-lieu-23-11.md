# Bổ sung dữ liệu lớn cho kho kiến thức (23/11/2026 tối)

Theo lệnh anh: bổ sung càng nhiều càng đầy đủ càng tốt, tìm kiếm Google với vai
người dùng. Kết quả đo thật ở cuối.

## 1. Kho kiến thức trước và sau

| Nhóm | Trước | Sau | Nguồn |
|---|---|---|---|
| Địa danh | 622 | 622 | (không thêm điểm mới đợt này) |
| Món ăn | 0 | **626** | 308 từ dữ liệu app + 318 tìm Google |
| Chỗ ở | 0 | **663** | 249 từ dữ liệu app + 414 tìm Google |
| Chi phí đi từng tỉnh | 0 | **34** | dữ liệu app (đủ 34 tỉnh) |
| Tuyến đi (cách đi) | 13 | **206** | 13 kiểm tay + 193 từ dữ liệu app |
| **Tổng mục trong kho** | **622** | **1.945** | |

## 2. Món ăn: 626 món, đủ 34/34 tỉnh

- **308 món từ dữ liệu live của app** (`mon-an-app.json`): tên món, bữa, giá, 1–3 quán
  kèm địa chỉ/giá, nhận xét. App vốn đã có sẵn dữ liệu này mà kho AI chưa dùng.
- **318 món mới tìm Google** (`mon-an-google.json`, Bắc 136 + Trung 98 + Nam 89):
  đủ 34 tỉnh, không tỉnh nào trắng (ít nhất Hải Phòng 5 món, nhiều nhất Hà Nội 13).
  71/318 món có giá thật kèm nguồn + ngày tìm 23/11/2026; 247 món ghi đúng
  "chưa kiểm được" — không bịa giá/địa chỉ. Đã đối chiếu: 0 trùng với 308 món app.
- Nguồn dùng nhiều nhất: Vietnam Airlines (50 món), Dacsanhagiang (22),
  Vietnamnet (19), Triphunter (23), Traveloka (12), Vinpearl (11), VnExpress (11).

## 3. Chỗ ở: 663 chỗ, đủ 34/34 tỉnh

- **249 chỗ từ dữ liệu live của app** (`cho-o-app.json`): tên, địa chỉ, loại, giá,
  khoảng cách, phù hợp ai.
- **414 chỗ mới tìm Google** (`cho-o-google.json`, Bắc 191 + Trung 127 + Nam 96):
  đủ 34 tỉnh (ít nhất Phú Thọ 8, Quảng Trị 9). 242/414 chỗ (58%) có giá/đêm kèm
  nguồn + ngày tìm; 172 chỗ ghi "chưa kiểm được" — chủ yếu homestay vùng cao và
  khách sạn nhỏ không công bố giá. Đã đối chiếu: 0 trùng với 249 chỗ app.
- Lưu ý trung thực: giá/địa chỉ lấy từ kết quả tìm kiếm Google ngày 23/11/2026,
  chưa mở từng trang đặt phòng để đối chiếu — giá có thể đổi theo mùa, kiểm lại
  lúc đặt. 2 chỗ có địa chỉ mâu thuẫn giữa các nguồn đã ghi dạng an toàn trong file.

## 4. Giá vé / giờ mở cửa: mọi địa danh thật đều có giá

- **131/131 điểm thật** trong kho đã có giá vé/giờ (`gia-ve-google.json`): 76 điểm
  miễn phí vào cổng, 55 điểm thu vé. 34 mục còn lại không có giá là các mục
  "(tổng quan)" cấp tỉnh — vốn không có khái niệm vé vào cổng.
- **79/131 điểm ghi cả 2 phía giá mâu thuẫn** + "cần kiểm tại quầy". Đáng chú ý:
  Chùa Hương (lễ hội 2026: thắng cảnh + đò 230k, cáp 260k vs giá cũ 80k + 50k,
  cáp 220k); Kênh Gà/Vân Trình (75–120k cũ vs 450–500k, combo 900k năm 2026);
  Thung Nham (250k từ 01/04/2026 vs 150k cũ); Bảo tàng Điện Biên Phủ (100k từ
  2022 vs 20–25k cũ); Địa đạo Củ Chi (135k khách nước ngoài từ 01/02/2026).
- Nguồn chính thức đích danh chỉ rải rác từng điểm (web Thung Nham, VQG Yok Đôn,
  cổng du lịch Đà Nẵng, Dalattourist, Nghị quyết 51/2025 HĐND Quảng Ninh cho giá
  vịnh Hạ Long); còn lại là trang tổng hợp du lịch (vietnamtourexpert 8, tripi 6,
  vietnamairlines 5, mytour 5, vexere 5).
- 2 cảnh báo đã ghi vào kho: **Hang Kho Mường tạm đóng từ tháng 9/2026** (nguy cơ
  đá rơi, Pù Luông dừng đón khách); **Nhà hát Lớn Hà Nội trùng tu 2 năm từ
  31/1/2026** (tour ban ngày có thể đã dừng).

## 5. Code đã sửa để trả lời được ăn/ở/chi phí (không chỉ "chưa có")

- Món/chỗ ở/chi phí nay **neo theo tỉnh người hỏi** (bảng thành phố → tỉnh mới,
  76 thành phố/khu trong `normalize.py`; vd "Quy Nhơn" → Gia Lai, "Phú Quốc" →
  An Giang) — trước đây trả món/chỗ ở tỉnh khác.
- Câu trả lời liệt kê tối đa 5 món/chỗ ở kèm giá + mô tả, hoặc bảng chi phí cả
  chuyến theo tỉnh (8–10 khoản: vé, ở, ăn, tham quan, đi lại...).
- Hỏi tỉnh cũ/thành phố thì tiêu đề hiện tên cũ cho dễ hiểu: "Món ăn ở khu
  Quy Nhơn (Gia Lai)".
- Sửa 1 lỗi thật trong cơ chế học từ phản hồi: trước đây `feedback()` tăng điểm
  cho mọi token trong câu hỏi (kể cả "mấy", "giờ", "mở", "cửa") nên bài học
  Lăng Bác làm Lăng Bác lấn cả câu "đi Quy Nhơn tháng mấy đẹp"; nay chỉ tăng
  token trong tên điểm. Đã xóa sạch điểm tăng cũ bị ô nhiễm.
- Sửa 1 lỗi hiệu năng: vòng lặp bonus thành phố chạy 76 × 1.945 mục mỗi lần hỏi
  làm đo 175 câu chạy hơn 4 phút; nay tính 1 lần mỗi câu hỏi (đo xong trong 36 giây).

## 6. Số đo cuối cùng (đo thật sau khi bổ sung)

| Chỉ số | Trước bổ sung | Sau bổ sung |
|---|---|---|
| Ý định held-out | 98,4% | **98,0%** (1.702/1.736) |
| 24 câu thật (ý định / thực thể) | 24/24, 23/24 | **24/24, 24/24** |
| Độ phủ 175 câu thật từ diễn đàn | 158/175 = 90,3% | **164/175 = 93,7%** |
| Câu "ăn gì ở Quy Nhơn" | "App chưa có danh sách món ăn" | Liệt kê món Gia Lai đúng (Bún cua thối, Phở khô Gia Lai...) |
| Câu "ở đâu ở Quy Nhơn" | "App chưa có danh sách chỗ ở" | Liệt kê chỗ ở Gia Lai đúng |
| Câu "đi Quy Nhơn 2N1Đ hết bao nhiêu" | "App chưa có chi phí" | Bảng chi phí Gia Lai (vé, ở, ăn, tham quan...) |

- 11 câu thật còn chưa trả lời được: đa số là mảnh câu trong luồng bình luận
  (cần ngữ cảnh chat) và câu hỏi tiếp nối mơ hồ — xem `cau-chua-tra-loi-duoc.json`.

## 7. Còn thiếu (nói thẳng, chưa làm)

- **Xếp hạng món/chỗ ở theo khu trong tỉnh còn chưa chuẩn hẳn:** vd "ăn gì ở
  Phú Quốc" trả đúng tỉnh An Giang nhưng món đầu danh sách là Gà đốt lá chúc
  Ô Thum (Tri Tôn, đất liền) chứ chưa ưu tiên món Phú Quốc, vì nhiều mục món
  không ghi rõ khu trong mô tả. Cần gắn nhãn khu (đảo/đất liền, huyện) cho từng
  mục món/chỗ ở thì mới xếp đúng.
- **Giá Google chưa đối chiếu từng trang đặt phòng** (đội tìm ghi rõ trong báo
  cáo) — giá mùa cao điểm có thể lệch; câu trả lời đã ghi "kiểm lại khi đặt".
- **Chưa thêm địa danh mới đợt này** (kho vẫn 622 điểm): 153 điểm tour đợt trước
  đã có; đợt tìm Google này tập trung món/chỗ ở/giá vé. Muốn thêm điểm mới nữa
  thì tìm theo web tour Vietravel/Saigontourist và web du lịch chính thức
  TP.HCM/Phú Quốc/Côn Đảo/Cần Thơ (đã ghi chú từ đợt trước).
