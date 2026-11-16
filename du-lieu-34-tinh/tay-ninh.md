# Dữ liệu cẩm nang Tây Ninh (TP Tây Ninh) — Giai đoạn 1 (đầy đủ)

- **Trạng thái: published** — đẩy lên theo lệnh anh ngày 06/11/2026 (đẩy hết lên, bỏ vòng duyệt chuyên gia; các nợ dữ liệu vẫn giữ nguyên, xem mục 9).
- Ngày kiểm: 06/11/2026. Mọi giá đều là **khoảng giá tham khảo** từ nguồn công khai, không phải giá chốt. Giá đổi theo mùa, cuối tuần, lễ Tết — kiểm lại trước ngày đi.
- Bổ sung 08/11/2026: số điện thoại chỗ ở (cột Điện thoại, mục 2) + mục 2B Trời mưa thì đi đâu + mục 2C Cho cặp đôi + mục 2D Mùa + tháng đẹp nhất. Số điện thoại tra từ nguồn công khai ngày 08/11/2026; chỗ nào ghi 'Chưa tra được' là chưa tìm thấy số khớp tên + địa chỉ.
- Lưu ý địa giới: từ 07/2025 tỉnh Long An sáp nhập vào Tây Ninh; tên phường/xã mới trong các nguồn không thống nhất — file này ghi đường + số nhà là chính. Hồ Dầu Tiếng trải dài qua Tây Ninh – TP.HCM – Đồng Nai (địa giới cũ: Bình Dương, Bình Phước).
- **Tọa độ GPS (cập nhật 06/11/2026):** đã điền cho toàn bộ 13 địa danh; 11 điểm còn ở mức xấp xỉ (ghi rõ trong bảng và trường toa_do_xap_xi trong JSON) — cần kiểm lại bằng GPS thực tế, TUYỆT ĐỐI không bịa tọa độ.** Tọa độ trung tâm trong meta là tọa độ tham khảo khu vực trung tâm thành phố.
- **Khách sạn/homestay: CHỈ giới thiệu sơ.** Tất cả đều ghi "chưa kiểm chứng / chưa đối tác / chưa thu phí". Không dùng chữ uy tín/đảm bảo. Không nhận đặt phòng, không nhận tiền.
- File JSON máy đọc được: `tay-ninh.json` (cùng thư mục).

## 1. Địa danh — 13 điểm chính (10 cũ + 3 mở rộng Long An cũ)

Mốc tính khoảng cách: trung tâm TP Tây Ninh. Khoảng cách là đường đi theo nguồn.

### 1.1. Cụm núi Bà Đen — phía đông bắc TP

| # | Tên | Địa chỉ | Tọa độ | Cách trung tâm | Giá vé | Giờ mở cửa | Thời gian | Hợp với ai | Lưu ý | Nguồn |
|---|---|---|---|---|---|---|---|---|---|---|
| 1 | Núi Bà Đen (Sun World Ba Den Mountain) | Phường Bình Minh / xã Thạnh Tân, TP Tây Ninh; ga cáp treo: khu phố Ninh Phú, phường Ninh Sơn | 11.375, 106.15 (xấp xỉ) | ~11 km về phía đông bắc, 20–30 phút đi xe | Vé vào cổng: người lớn 10.000đ (bảng giá 28/9–31/12/2026), trẻ em 5.000đ (có nguồn ghi 16.000đ — mâu thuẫn). Cáp treo Vân Sơn khứ hồi người lớn 400.000–450.000đ, trẻ em 300.000–350.000đ; Chùa Hang khứ hồi 250.000đ, trẻ em 150.000đ; combo Vân Sơn + Chùa Hang 650.000đ, trẻ em 500.000đ; vé VIP cao hơn | Cáp treo: thứ 2–6 6:00–20:30; thứ 7 5:30–21:00; Chủ nhật 5:30–20:30 (theo lịch 28/9/2026; có nguồn ghi 7:00–17:30 — mâu thuẫn, xem mục 9). Tuyến Tâm An thứ 2–6 không chạy | Nửa ngày–cả ngày (cáp treo 8–15 phút/chiều; đỉnh cao 986 m, nóc nhà Nam Bộ) | Mọi đối tượng, hành hương, gia đình, người săn mây | Tết và rằm tháng Giêng rất đông, xếp hàng 45–60 phút — đi trước 8h; mua vé trước; tuyến Tâm An thứ 2–6 nghỉ | roamdecide.com, dulich.pro.vn, phanvantravel.com, pystravel.vn |
| 2 | Thung lũng Ma Thiên Lãnh | Phường Bình Minh / xã Thạnh Tân, TP Tây Ninh (kẹp giữa núi Bà Đen, núi Phụng, núi Heo) | 11.365, 106.135 (xấp xỉ) | ~10–12 km | Miễn phí | 7:00–18:00 (nên đi ban ngày 6:00–17:00) | 2–3 giờ | Nhóm bạn, người thích trekking nhẹ, check-in | Đường vào qua vách đá, suối Vàng; mang giày tốt; không đi một mình lúc tối | vinpearl.com, mytour.vn, blog.vexere.com |
| 3 | Chùa Linh Sơn Tiên Thạch / quần thể chùa Bà (Chùa Hang) | Sườn núi Bà Đen, phường Bình Minh, TP Tây Ninh (đi cáp treo Chùa Hang hoặc leo bộ) | 11.368, 106.148 (xấp xỉ) | ~11 km + cáp treo/leo bộ | Vào chùa miễn phí; cáp treo Chùa Hang khứ hồi 250.000đ người lớn (mục 1) | Theo giờ cáp treo Chùa Hang 6:00–17:30 | 1–2 giờ | Hành hương, người lớn tuổi (đi cáp treo) | Ăn mặc kín đáo; lễ lớn rất đông | roamdecide.com, dulich.pro.vn |

### 1.2. Cụm trung tâm — TP Tây Ninh, Hòa Thành

| # | Tên | Địa chỉ | Tọa độ | Cách trung tâm | Giá vé | Giờ mở cửa | Thời gian | Hợp với ai | Lưu ý | Nguồn |
|---|---|---|---|---|---|---|---|---|---|---|
| 4 | Tòa Thánh Cao Đài | Đường Phạm Hộ Pháp, phường Long Hoa, Hòa Thành, Tây Ninh (cách TP Tây Ninh ~4 km về phía nam) | 11.3127, 106.1323 | ~4 km | Miễn phí | Tham quan tự do ban ngày 6:00–18:00 (có nguồn ghi tới 22:00); lễ chính 6:00, 12:00, 18:00, 24:00 | 1–1,5 giờ; xem lễ 12:00 là đẹp nhất | Mọi đối tượng, người yêu kiến trúc/tôn giáo | Vào trong không mang giày dép; nam vào cửa phải, nữ cửa trái; ăn mặc kín đáo; chụp ảnh theo quy định | pystravel.vn, phanvantravel.com, blog.vexere.com |
| 5 | Chùa Gò Kén (Thiền Lâm Tự) | Quốc lộ 22B, phường Hòa Thành, Tây Ninh | 11.335, 106.115 (xấp xỉ) | ~5–7 km | Miễn phí | ~6:00–18:00 hàng ngày | 1 giờ | Hành hương, gia đình | Chùa hơn 100 năm; tượng Phật Quan Thế Âm cao ~25 m giữa hồ | pystravel.vn, vinpearl.com, mytour.vn |
| 6 | Khu du lịch Long Điền Sơn | Số 08 Trần Phú, phường Ninh Sơn, TP Tây Ninh | 11.323, 106.102 (xấp xỉ) | ~2–3 km | 30.000–60.000đ/người (nguồn mâu thuẫn: 40.000–60.000đ vs 30.000–50.000đ) | 6:00–18:00 (thứ 2–6); 6:00–22:00 (thứ 7, CN, lễ Tết) | 2–3 giờ | Gia đình có trẻ nhỏ, nhóm bạn | Khu vui chơi tổng hợp; hỏi giá từng trò | vinpearl.com, mytour.vn |
| 7 | Công viên Xuân Hồng / trung tâm TP Tây Ninh | Khu vực trung tâm TP Tây Ninh (gần Melia Vinpearl, đường Lê Duẩn) | 11.311, 106.099 (xấp xỉ) | 0 km | Miễn phí | Cả ngày | 30–60 phút | Mọi đối tượng, đi dạo buổi tối | Điểm dừng nhẹ buổi tối, không phải điểm chính | trip.com |

### 1.3. Cụm xa — hồ, rừng, biên giới

| # | Tên | Địa chỉ | Tọa độ | Cách trung tâm | Giá vé | Giờ mở cửa | Thời gian | Hợp với ai | Lưu ý | Nguồn |
|---|---|---|---|---|---|---|---|---|---|---|
| 8 | Hồ Dầu Tiếng | Huyện Dương Minh Châu / Tân Châu, Tây Ninh; cách TP Tây Ninh ~38 km về phía đông | 11.38, 106.32 (xấp xỉ) | ~38 km, 45–60 phút đi xe | Miễn phí vào khu vực hồ; thuê lều/thuyền SUP dịch vụ riêng (chưa kiểm được giá) | Tự do 24/7; đẹp nhất mùa khô tháng 12–4, sáng sớm/hoàng hôn | Nửa ngày–cả ngày (cắm trại qua đêm) | Nhóm bạn, gia đình cắm trại | Hồ nhân tạo lớn nhất Việt Nam (~270 km² mặt nước); cắm trại tự túc, mang đủ đồ; kiểm tra thời tiết | pystravel.vn, vinpearl.com, blog.vexere.com |
| 9 | Vườn quốc gia Lò Gò – Xa Mát | Huyện Tân Biên, Tây Ninh (gần biên giới Campuchia) | 11.6, 106.02 (xấp xỉ) | ~60–70 km (chưa kiểm được chính xác) | Chưa kiểm được mức vé trong đợt này | Chưa kiểm được giờ chính xác | Nửa ngày–cả ngày | Người yêu rừng, chim, nhóm bạn | Vườn quốc gia, cần liên hệ ban quản lý trước; mang giấy tờ tùy thân (khu vực biên giới) | Chưa kiểm được — ghi vào mục 9 |
| 10 | Cửa khẩu Mộc Bài / khu vực Gò Dầu (điểm phụ, tham quan ngoài) | Huyện Gò Dầu / Bến Cầu, Tây Ninh (cách TP ~50 km) | 11.065, 106.165 | ~50 km | Miễn phí tham quan khu vực ngoài cửa khẩu; qua biên giới cần hộ chiếu/visa theo quy định | Ban ngày | 1–2 giờ (chỉ tham quan ngoài) | Người đi đường, khách mua sắm | Không qua biên giới nếu không có giấy tờ đầy đủ; chỉ ghi làm điểm phụ, không đưa vào lịch trình chính | Chưa kiểm được — ghi vào mục 9 |

### 1.4. Điểm mở rộng — Long An cũ (cùng cụm Đồng Tháp Mười / Đức Huệ)

| # | Tên | Địa chỉ | Tọa độ | Cách trung tâm | Giá vé | Giờ mở cửa | Thời gian | Hợp với ai | Lưu ý | Nguồn |
|---|---|---|---|---|---|---|---|---|---|---|
| 1 | Làng nổi Tân Lập (Long An cũ) | Quốc lộ 62, xã Tân Lập, huyện Mộc Hóa, tỉnh Long An cũ (nay thuộc Tây Ninh) | 10.83, 105.97 (xấp xỉ) | ~100 km | Vào cổng tham quan 85.000đ/người (1 nguồn, chưa kiểm được mức niêm yết riêng) | 7:00–17:00 | Nửa ngày–cả ngày | Nhóm bạn, gia đình, người thích sinh thái | Thuộc khu vực Long An cũ (sáp nhập vào Tây Ninh 07/2025), cách TP Tây Ninh ~100 km về phía tây nam (QL62 qua Mộc Hóa) — chỉ hợp đi riêng 1 ngày từ TP.HCM hoặc ghép cung biên giới, không ghép trong ngày Bà Đen; mùa nước nổi tháng 8–11 âm lịch đẹp nhất | danviet.vn, dulichvietnam.com.vn, vietnamdiemhen.com |
| 2 | Khu du lịch Cánh Đồng Bất Tận (Long An cũ) | Xã Bình Phong Thạnh, huyện Mộc Hóa, tỉnh Long An cũ (nay thuộc Tây Ninh), trong Khu bảo tồn dược liệu Đồng Tháp Mười | 10.79, 105.99 (xấp xỉ) | ~100 km | Chưa kiểm được mức vé riêng — hỏi giá tại cổng | Ban ngày (chưa kiểm được giờ chính xác) | Nửa ngày | Người thích sinh thái, chụp ảnh | Thuộc khu vực Long An cũ (sáp nhập vào Tây Ninh 07/2025), cùng cụm Mộc Hóa với Làng nổi Tân Lập, cách TP Tây Ninh ~100 km; rừng tràm gió nguyên sinh, phim trường 'Cánh đồng bất tận'; tọa độ xấp xỉ, cần kiểm lại | dulichvietnam.com.vn |
| 3 | Vườn thú Mỹ Quỳnh (Long An cũ) | Huyện Đức Huệ, tỉnh Long An cũ (nay thuộc Tây Ninh), gần Đức Hòa | 10.955, 106.29 (xấp xỉ) | ~60 km | Chưa kiểm được mức vé riêng — hỏi giá tại cổng | Ban ngày (chưa kiểm được giờ chính xác) | Nửa ngày | Gia đình có trẻ nhỏ | Thuộc khu vực Long An cũ (sáp nhập vào Tây Ninh 07/2025), cách TP Tây Ninh ~60 km về phía nam, cùng hướng Đức Huệ – Đức Hòa; tọa độ xấp xỉ, cần kiểm lại | Google Maps |

## 2. Ở đâu — 7 chỗ ở (CHỈ GIỚI THIỆU SƠ)

**Tất cả: "Thông tin tham khảo, chưa kiểm chứng trực tiếp, chưa phải đối tác, chưa thu phí. Người dùng tự kiểm tra giá / phòng trống trước khi đặt." Không dùng chữ uy tín/đảm bảo. Không nhận đặt phòng, không nhận tiền.**

| # | Tên | Địa chỉ | Khu vực | Hạng | Khoảng giá/đêm ngày thường | Điện thoại | Cách trung tâm | Hợp với ai | Trạng thái | Nguồn |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| 1 | Melia Vinpearl Tây Ninh | 90 Lê Duẩn, KP5, phường 3, TP Tây Ninh | Trung tâm | 5 sao | ~1.250.000–3.900.000đ/đêm (khoảng rộng theo nguồn; có nguồn ghi từ 1.349.205đ, từ 1.360.000đ) | 0276 3728 888 | Trung tâm; cách núi Bà Đen ~12,7 km | Gia đình, khách nghỉ dưỡng | Chưa kiểm chứng / chưa đối tác / chưa thu phí | trip.com, traveloka.com, ezcloud.vn, truyenhinhcapsongthu.net |
| 2 | Melia Vinpearl Tây Ninh Resort & Villas (chân núi Bà Đen) | Khu vực chân núi Bà Đen, phường Bình Minh (theo nguồn phanvantravel — địa chỉ chi tiết chưa kiểm được) | Chân núi Bà Đen | 5 sao | 2.500.000–6.000.000đ/đêm (theo 1 nguồn — chưa kiểm được khoảng hẹp) | Chưa tra được | Cách trung tâm ~11 km | Gia đình nghỉ dưỡng, khách đi núi sớm | Chưa kiểm chứng / chưa đối tác / chưa thu phí | phanvantravel.com |
| 3 | Sài Gòn Tây Ninh Hotel | Chưa kiểm được số nhà chính xác trong đợt này — trung tâm TP Tây Ninh | Trung tâm | 4 sao | 700.000–1.200.000đ/đêm | Chưa tra được | Trung tâm | Khách công tác, gia đình | Chưa kiểm chứng / chưa đối tác / chưa thu phí | phanvantravel.com |
| 4 | Sunrise Tây Ninh Hotel | 81 Hoàng Lê Kha, phường 3, TP Tây Ninh | Trung tâm | 4 sao | Từ ~1.168.200đ/đêm | 0276 3714 714 | Trung tâm | Khách công tác, cặp đôi | Chưa kiểm chứng / chưa đối tác / chưa thu phí | truyenhinhcapsongthu.net |
| 5 | HANZ Premium Mai Vy Hotel | 150 đường 30/4, phường 3, TP Tây Ninh | Trung tâm | 3–4 sao (nguồn ghi 3 sao và 4 sao — mâu thuẫn) | Từ ~1.000.000đ/đêm | Chưa tra được | Trung tâm | Cặp đôi, gia đình | Chưa kiểm chứng / chưa đối tác / chưa thu phí | truyenhinhcapsongthu.net, ezcloud.vn |
| 6 | Hòa Bình Hotel Tây Ninh | Trung tâm TP Tây Ninh (số nhà chưa kiểm được) | Trung tâm | 3 sao | 400.000–700.000đ/đêm | Chưa tra được | Trung tâm | Khách tiết kiệm | Chưa kiểm chứng / chưa đối tác / chưa thu phí | phanvantravel.com |

## 2B. Trời mưa thì đi đâu (bổ sung 08/11/2026)

Các điểm dưới đây đều đã có trong mục 1, chỉ chọn những điểm có mái che/không gian trong nhà, đi mưa được:

- Tòa Thánh Cao Đài
- Chùa Gò Kén (Thiền Lâm Tự)
- Chùa Linh Sơn Tiên Thạch / quần thể chùa Bà (Chùa Hang)

Dặn: Mưa thì vào Tòa Thánh Cao Đài và chùa Gò Kén — tránh núi Bà Đen vì cáp treo có thể dừng khi mưa to, gió lớn.

## 2C. Cho cặp đôi (bổ sung 08/11/2026)

Chỗ ở hợp cặp đôi (theo mục 'Hợp với ai' trong file):

- Sunrise Tây Ninh Hotel
- HANZ Premium Mai Vy Hotel

Điểm hợp cặp đôi (từ mục 1):

- Núi Bà Đen (Sun World Ba Den Mountain)
- Hồ Dầu Tiếng
- Thung lũng Ma Thiên Lãnh
- Tòa Thánh Cao Đài

## 2D. Mùa + tháng đẹp nhất (bổ sung 08/11/2026)

- Tháng đẹp nhất: Tháng 11–4 (mùa khô): leo núi, cắm trại hồ Dầu Tiếng; rằm tháng Giêng đông nhất ở núi Bà Đen
- Nguồn: meta.best_season trong file (nghiên cứu ngày 06/11/2026; nguồn tổng xem meta.nguon_tong)
- Ngày kiểm: 06/11/2026

## 3. Ăn gì — 9 món (đủ quán + địa chỉ + khoảng giá)

| # | Món | Buổi ăn | Khoảng giá | Quán tham khảo (địa chỉ) | Nguồn |
|---|---|---|---|---|---|
| 1 | Bánh canh Trảng Bàng | Ăn sáng / ăn trưa | 25.000–40.000đ/tô (có nguồn ghi 35.000–100.000đ tùy tô đặc biệt) | (1) Bánh canh Năm Dung — 90 Nguyễn Văn Rốp, Trảng Bàng; 25.000–40.000đ/tô. (2) Bánh canh Út Huệ — 88 Nguyễn Văn Rốp, Trảng Bàng; 25.000–40.000đ/tô. (3) Bánh canh Cô Ba — 300–301 QL22, Trảng Bàng | dulichbinhminh.com, vienmaytinh.com, buulong.com.vn |
| 2 | Bánh tráng phơi sương cuốn thịt heo | Ăn trưa / ăn tối | 80.000–150.000đ/phần cuốn (bánh lẻ 10.000–30.000đ/100g; 50.000–60.000đ/túi 1 kg làm quà) | (1) Quán Năm Dung — 90 Nguyễn Văn Rốp, Trảng Bàng; 100.000–120.000đ/phần. (2) Quán Hoàng Minh — 38 QL22, Trảng Bàng. (3) Bánh tráng Minh Nhựt — QL22B, KP Rạch Sơn, Gò Dầu (mua về) | dulichbinhminh.com, saodaily.com, thesamhouse.com |
| 3 | Bò tơ Tây Ninh | Ăn trưa / ăn tối (món nhóm) | 150.000–300.000đ/kg hoặc /đĩa (tùy phần) | (1) Bò tơ Năm Sánh — QL22B, Hiệp Trường, Hòa Thành (có nguồn ghi đường 30/4 nối dài, phường 2); 50.000–200.000đ/món. (2) Bò tơ Sáu Tâm — 68 Nguyễn Trãi, phường 4, TP Tây Ninh | dulichbinhminh.com, saodaily.com, thesamhouse.com |
| 4 | Muối tôm Tây Ninh (mua về / ăn kèm) | Mua về | 25.000–60.000đ/gói (khoảng chung, chưa kiểm được mức niêm yết) | (1) Chợ Tây Ninh / các sạp bánh tráng QL22, Trảng Bàng — nhiều sạp, hỏi giá trước | vienmaytinh.com |
| 5 | Bánh tráng nướng / bánh tráng trộn | Ăn xế / ăn vặt | 15.000–40.000đ/phần (khoảng chung) | (1) Khu vực chợ Tây Ninh, đường 30/4, TP Tây Ninh — nhiều quầy, hỏi giá trước | dulichbinhminh.com |
| 6 | Cơm / món chay (khu vực Tòa Thánh, núi Bà) | Ăn trưa | 25.000–60.000đ/phần (khoảng chung) | (1) Quán cơm khu vực Hòa Thành / chân núi Bà Đen — nhiều quán, hỏi giá trước | phanvantravel.com |
| 7 | Hủ tiếu / phở (ăn sáng TP Tây Ninh) | Ăn sáng | 30.000–50.000đ/tô (khoảng chung) | (1) Khu vực đường 30/4, phường 3, TP Tây Ninh — nhiều quán, hỏi giá trước | phanvantravel.com |
| 8 | Thằn lằn núi Bà Đen (món lạ, tùy quán) | Ăn tối | Chưa kiểm được khoảng giá riêng trong đợt này | (1) Quán khu vực chân núi Bà Đen — hỏi giá trước, chỉ ăn khi quán có giấy phép/nguồn rõ ràng | Chưa kiểm được — ghi vào mục 9 |
| 9 | Trái cây / nước mía (dọc QL22) | Ăn xế | 10.000–30.000đ/phần | (1) Quán ven QL22, Trảng Bàng – Gò Dầu — nhiều quán, hỏi giá trước | dulichbinhminh.com |

## 4. Đi đến Tây Ninh bằng gì

Không có sân bay/ga tàu khách trong tỉnh. Đi từ TP.HCM chủ yếu bằng xe khách/xe riêng theo QL22 (qua Củ Chi – Trảng Bàng) hoặc QL22B.

### 4.1. Từ TP.HCM (~100 km tới TP Tây Ninh)

| Phương tiện | Thời gian | Khoảng giá | Hãng / ghi chú | Nguồn |
|---|---|---|---|---|
| Xe khách SG–Tây Ninh | 2–2,5 giờ (chưa kiểm được hãng/giá cụ thể) | Chưa kiểm được giá vé riêng trong đợt này (khoảng chung xe khách liên tỉnh ~80.000–150.000đ/lượt — chưa kiểm được) | Bến xe An Sương / bến xe Miền Đông → bến xe Tây Ninh | Chưa kiểm được — ghi vào mục 9 |
| Xe limousine SG–Tây Ninh | 2–2,5 giờ | Chưa kiểm được giá vé riêng | Đón tận nơi ở TP.HCM, trả ở TP Tây Ninh | Chưa kiểm được — ghi vào mục 9 |
| Xe máy / ô tô riêng (QL22) | 2–3 giờ | Xăng + phí (chưa kiểm được mức chung) | Lộ trình: TP.HCM → Củ Chi → Trảng Bàng (QL22) → Gò Dầu → TP Tây Ninh | phanvantravel.com |
| Xe buýt SG–Tây Ninh | ~3 giờ | Chưa kiểm được giá vé riêng | Tuyến buýt liên tỉnh, dừng nhiều điểm | Chưa kiểm được — ghi vào mục 9 |

### 4.2. Từ Hà Nội (~1.700 km)

| Phương tiện | Thời gian | Khoảng giá | Ghi chú | Nguồn |
|---|---|---|---|---|
| Máy bay HAN–SGN + xe lên Tây Ninh | Bay ~2 giờ + xe SG–Tây Ninh 2–2,5 giờ | Vé máy bay tùy thời điểm (chưa kiểm được mức trong đợt này) + xe (chưa kiểm được) | Phương án khuyên dùng | Chưa kiểm được — ghi vào mục 9 |
| Tàu HN–ga Sài Gòn + xe | Tàu ~30 giờ + xe 2–2,5 giờ | Chưa kiểm được | Không khuyên dùng | Chưa kiểm được — ghi vào mục 9 |
| Xe khách HN–Tây Ninh | ~30–35 giờ (chưa kiểm được chính xác) | Chưa kiểm được | Không khuyên dùng | Chưa kiểm được — ghi vào mục 9 |

## 5. Đi lại trong Tây Ninh

| Phương tiện | Khoảng giá | Giấy tờ / điều kiện | Ghi chú | Nguồn |
|---|---|---|---|---|
| Thuê xe máy (TP Tây Ninh) | ~100.000–150.000đ/ngày (khoảng chung, chưa kiểm được mức riêng) | CCCD + bằng lái A1 | Đi núi Bà Đen, Tòa Thánh, hồ Dầu Tiếng tiện bằng xe máy | Chưa kiểm được — ghi vào mục 9 |
| Taxi nội thành | Chưa kiểm được mức theo km riêng | — | Mai Linh, Vinasun; có Grab/Be (phủ sóng hạn chế hơn TP.HCM) | Chưa kiểm được — ghi vào mục 9 |
| Xe ôm / xe công nghệ | Chưa kiểm được mức riêng | — | Đi chặng ngắn trong TP, ra chân núi | Chưa kiểm được — ghi vào mục 9 |
| Thuê ô tô tự lái / có tài xế | Chưa kiểm được mức riêng Tây Ninh | Bằng lái B2 + CCCD (tự lái) | Đi hồ Dầu Tiếng / Lò Gò nên thuê ô tô theo ngày | Chưa kiểm được — ghi vào mục 9 |
| Xe điện nội khu núi Bà Đen | Chưa kiểm được giá riêng | — | Di chuyển trong khu du lịch núi Bà Đen | dulich.pro.vn |

## 6. Lịch trình mẫu

### 6.1. Lịch trình 3N2Đ (chính)

| Ngày | Buổi | Hoạt động | Điểm / quán gắn kèm |
|---|---|---|---|
| Ngày 1 — Núi Bà Đen | Sáng | Cáp treo Vân Sơn lên đỉnh núi Bà Đen (nửa ngày) + chùa Bà | Địa danh 1, 3 |
| Ngày 1 | Chiều | Thung lũng Ma Thiên Lãnh (2–3 giờ) | Địa danh 2 |
| Ngày 1 | Tối | Bò tơ Năm Sánh (Hòa Thành) | Món 3 |
| Ngày 2 — Tâm linh | Sáng | Tòa Thánh Cao Đài, xem lễ 12:00 | Địa danh 4 |
| Ngày 2 | Chiều | Chùa Gò Kén + Long Điền Sơn | Địa danh 5, 6 |
| Ngày 2 | Tối | Bánh tráng phơi sương cuốn thịt | Món 2 |
| Ngày 3 — Hồ | Sáng–chiều | Hồ Dầu Tiếng (cắm trại/ngắm hoàng hôn, nửa ngày–cả ngày) | Địa danh 8 |
| Ngày 3 | Tối | Về, trả phòng | — |

### 6.2. Lịch trình 2N1Đ (bản gấp)

| Ngày | Buổi | Hoạt động |
|---|---|---|
| Ngày 1 | Sáng | Núi Bà Đen (cáp treo đỉnh) |
| Ngày 1 | Chiều | Tòa Thánh Cao Đài (lễ 18:00) |
| Ngày 1 | Tối | Bánh canh Trảng Bàng / bò tơ |
| Ngày 2 | Sáng | Chùa Gò Kén + Ma Thiên Lãnh |
| Ngày 2 | Chiều | Hồ Dầu Tiếng (ngắn) hoặc về |

### 6.3. Lịch trình 4N3Đ (bản chậm)

| Ngày | Buổi | Hoạt động |
|---|---|---|
| Ngày 1–2 | Cả ngày | Như ngày 1–2 của lịch trình 3N2Đ |
| Ngày 3 | Cả ngày | Hồ Dầu Tiếng (cắm trại qua đêm) |
| Ngày 4 | Sáng | Vườn quốc gia Lò Gò – Xa Mát (nửa ngày, liên hệ trước) |
| Ngày 4 | Chiều | Mua bánh tráng/muối tôm về làm quà, về |

## 7. Bảng chi phí ước tính (1 người, 3N2Đ từ TP.HCM, ở 3–4 sao TP Tây Ninh)

| Hạng mục | Ước tính 3N2Đ / người | Căn cứ |
|---|---|---|
| Xe SG–Tây Ninh khứ hồi | Chưa kiểm được — khoảng ước tính 160.000–300.000đ (chưa kiểm được, hỏi giá trước) | Mục 4.1 |
| Ở 2 đêm (chia đôi phòng 3–4 sao) | 400.000–1.200.000đ | Mục 2 (3 sao 400.000–700.000đ; 4 sao 700.000–1.200.000đ, chia 2 người) |
| Ăn 3 ngày | 450.000–900.000đ | Mục 3 (bánh canh 25.000–40.000đ; bò tơ 150.000–300.000đ; bánh tráng cuốn 80.000–150.000đ) |
| Vé tham quan (cáp treo Bà Đen là khoản lớn nhất) | 450.000–700.000đ | Mục 1 (Vân Sơn 400.000–450.000đ; combo 650.000đ; vào cổng 10.000đ) |
| Thuê xe máy 2–3 ngày | 200.000–450.000đ | Mục 5 (100.000–150.000đ/ngày) |
| Phát sinh | 100.000–300.000đ | — |
| **Tổng ước tính** | **1.760.000–3.850.000đ/người** | Cộng các khoảng trên (xe SG–Tây Ninh chưa kiểm được nên tổng có độ lệch) |
| Nếu đi từ Hà Nội | Vé máy bay HAN–SGN là hạng mục lớn nhất (chưa kiểm được mức trong đợt này) | Mục 4.2 |

## 8. Checklist mang theo

- Giày leo núi / giày đi bộ tốt (núi Bà Đen, Ma Thiên Lãnh), mũ/nón, kem chống nắng (Tây Ninh nắng gắt).
- Quần dài/váy kín, khăn choàng (vào Tòa Thánh, chùa Bà — ăn mặc kín đáo).
- CCCD + bằng lái A1 (nếu thuê xe máy), tiền mặt lẻ.
- Nước uống, thuốc cơ bản, sạc dự phòng; đồ cắm trại nếu đi hồ Dầu Tiếng qua đêm.
- Hỏi giá cáp treo theo tuyến trước khi mua (Vân Sơn / Chùa Hang / Tâm An khác giá nhau).

## 9. Mục chưa kiểm được / cần xác nhận lại (ghi rõ, không bịa)

1. Tọa độ GPS: đã điền cho toàn bộ 13 địa danh (06/11/2026); 11 điểm còn ở mức xấp xỉ (ghi rõ trong bảng mục 1 và trường toa_do_xap_xi trong JSON) — cần kiểm lại bằng GPS thực tế.
2. Giá vé cáp treo núi Bà Đen — nhiều bảng giá khác nhau: Vân Sơn 400.000đ vs 450.000đ (bảng 28/9–31/12/2026); vào cổng 10.000đ vs 16.000đ; giờ cáp treo 6:00–20:30 vs 7:00–17:30.
3. Giá vé xe khách/limousine/xe buýt SG–Tây Ninh; giá vé máy bay HAN–SGN — chưa kiểm được.
4. Giá thuê xe máy, taxi theo km, thuê ô tô riêng Tây Ninh — chưa kiểm được mức riêng.
5. Giá vé Vườn quốc gia Lò Gò – Xa Mát, giờ mở cửa; khoảng cách chính xác từ TP Tây Ninh.
6. Địa chỉ/số nhà Sài Gòn Tây Ninh Hotel, Hòa Bình Hotel; hạng sao HANZ Mai Vy (3 vs 4 sao).
7. Giá thằn lằn núi, muối tôm niêm yết, giá xe điện nội khu núi Bà Đen — chưa kiểm được.
8. Địa chỉ chi tiết Melia Vinpearl Resort & Villas chân núi Bà Đen — chưa kiểm được.
9. Tên phường/xã mới sau sáp nhập Long An vào Tây Ninh (07/2025); địa giới hồ Dầu Tiếng qua 3 tỉnh.
10. Giá vé/giờ 3 điểm mới Long An cũ: Làng nổi Tân Lập đã có vé vào cổng 85.000đ theo 1 nguồn; Cánh Đồng Bất Tận và Vườn thú Mỹ Quỳnh chưa kiểm được mức riêng.

## 10. Nhận xét của M và đánh giá người dùng (bổ sung 06/11/2026)

Nhận xét dưới đây là chính kiến của M sau khi đọc review trên Google Maps / TripAdvisor / Foody / blog du lịch uy tín — viết lại bằng lời của M, KHÔNG copy nguyên văn review, KHÔNG bịa số sao. Đánh giá người dùng trong app hiện chưa có — bạn là người đầu tiên.

### 10.1. Địa danh

- **Núi Bà Đen (Sun World Ba Den Mountain)**: Nóc nhà Nam Bộ (986 m), cáp treo Vân Sơn lên đỉnh 8 phút, tượng Phật Bà và view mây đẹp — điểm đáng đi nhất Tây Ninh. Điểm yếu: giá cáp treo mâu thuẫn giữa các nguồn (Vân Sơn 400.000đ vs 450.000đ, vào cổng 10.000đ vs 16.000đ — ghi rõ trong file); Tết/rằm tháng Giêng xếp hàng 45–60 phút. Hợp mọi đối tượng; đi sớm trước 8h, tránh lễ lớn. (Nguồn tham khảo: roamdecide.com; dulich.pro.vn; Google Maps; ngày kiểm 06/11/2026). Đánh giá người dùng: chưa có đánh giá — bạn là người đầu tiên.
- **Thung lũng Ma Thiên Lãnh**: Thung lũng giữa 3 ngọn núi, suối Vàng và vách đá — hoang sơ, chụp ảnh đẹp. Điểm yếu: đường vào khó, không nên đi một mình lúc tối; ít dịch vụ. Hợp nhóm bạn, người thích trekking nhẹ; đi ban ngày, mang giày tốt. (Nguồn tham khảo: Google Maps; vinpearl.com; mytour.vn; ngày kiểm 06/11/2026). Đánh giá người dùng: chưa có đánh giá — bạn là người đầu tiên.
- **Chùa Linh Sơn Tiên Thạch / quần thể chùa Bà (Chùa Hang)**: Quần thể chùa Bà trên sườn núi, linh thiêng, cáp treo Chùa Hang 250.000đ khứ hồi tiện cho người lớn tuổi. Điểm yếu: lễ lớn rất đông; leo bộ mệt. Hợp hành hương, người lớn tuổi; đi cáp treo, ăn mặc kín đáo. (Nguồn tham khảo: Google Maps; roamdecide.com; ngày kiểm 06/11/2026). Đánh giá người dùng: chưa có đánh giá — bạn là người đầu tiên.
- **Tòa Thánh Cao Đài**: Kiến trúc Cao Đài độc đáo bậc nhất Việt Nam, xem lễ 12h rất ấn tượng. Điểm yếu: vào trong không mang giày dép, nam nữ đi cửa riêng — khách không biết dễ lúng túng; giờ tham quan nguồn ghi tới 22h chưa thống nhất. Hợp mọi đối tượng; xem lễ 12:00, ăn mặc kín đáo. (Nguồn tham khảo: Google Maps; pystravel.vn; phanvantravel.com; ngày kiểm 06/11/2026). Đánh giá người dùng: chưa có đánh giá — bạn là người đầu tiên.
- **Chùa Gò Kén (Thiền Lâm Tự)**: Chùa hơn 100 năm, tượng Quan Âm ~25 m giữa hồ — yên tĩnh, ít đông hơn Tòa Thánh. Điểm yếu: quy mô nhỏ, tham quan 1 giờ là hết. Hợp hành hương, gia đình; ghép cùng cung Tòa Thánh – Bà Đen. (Nguồn tham khảo: Google Maps; pystravel.vn; ngày kiểm 06/11/2026). Đánh giá người dùng: chưa có đánh giá — bạn là người đầu tiên.
- **Khu du lịch Long Điền Sơn**: Khu vui chơi tổng hợp gần trung tâm, trẻ nhỏ chơi được 2–3 giờ, vé 30.000–60.000đ rẻ. Điểm yếu: vé mâu thuẫn (30.000–50.000đ vs 40.000–60.000đ), trò chơi tính riêng nên tổng chi phí khó đoán. Hợp gia đình có trẻ nhỏ; hỏi giá từng trò trước. (Nguồn tham khảo: Google Maps; vinpearl.com; mytour.vn; ngày kiểm 06/11/2026). Đánh giá người dùng: chưa có đánh giá — bạn là người đầu tiên.
- **Công viên Xuân Hồng / trung tâm TP Tây Ninh**: Công viên trung tâm, đi dạo buổi tối nhẹ nhàng, miễn phí. Điểm yếu: chỉ là điểm dừng phụ, không có gì tham quan sâu; tối ít đèn ở vài góc. Hợp đi dạo tối sau ăn; không cần dành riêng thời gian. (Nguồn tham khảo: Google Maps; trip.com; ngày kiểm 06/11/2026). Đánh giá người dùng: chưa có đánh giá — bạn là người đầu tiên.
- **Hồ Dầu Tiếng**: Hồ nhân tạo lớn nhất Việt Nam (~270 km²), cắm trại và hoàng hôn đẹp, mùa khô tháng 12–4 là đẹp nhất. Điểm yếu: hồ trải 3 tỉnh, điểm cắm trại tự túc hoàn toàn, thuê lều/SUP chưa kiểm được giá. Hợp nhóm bạn cắm trại; mang đủ đồ, kiểm tra thời tiết. (Nguồn tham khảo: Google Maps; pystravel.vn; vinpearl.com; ngày kiểm 06/11/2026). Đánh giá người dùng: chưa có đánh giá — bạn là người đầu tiên.
- **Vườn quốc gia Lò Gò – Xa Mát**: Vườn quốc gia biên giới, rừng và chim đa dạng — hợp người yêu thiên nhiên thật sự. Điểm yếu: chưa kiểm được vé/giờ, cần liên hệ ban quản lý trước, mang giấy tờ (khu vực biên giới). Hợp nhóm yêu rừng; liên hệ trước, không đi tự phát. (Nguồn tham khảo: Google Maps; ngày kiểm 06/11/2026). Đánh giá người dùng: chưa có đánh giá — bạn là người đầu tiên.
- **Cửa khẩu Mộc Bài / khu vực Gò Dầu (điểm phụ)**: Điểm phụ tham quan ngoài cửa khẩu, mua sắm qua biên giới tiện nếu có giấy tờ. Điểm yếu: chỉ nên ghi làm điểm phụ, không đưa vào lịch trình chính; không qua biên giới nếu thiếu hộ chiếu/visa. Hợp người đi đường; tham quan ngoài 1–2 giờ là đủ. (Nguồn tham khảo: Google Maps; ngày kiểm 06/11/2026). Đánh giá người dùng: chưa có đánh giá — bạn là người đầu tiên.
- **Làng nổi Tân Lập (Long An cũ)**: Rừng tràm Đồng Tháp Mười, cung đường xuyên rừng 5 km và cầu chữ X — mùa nước nổi tháng 8–11 âm lịch đẹp nhất, sen súng nở rộ. Điểm yếu: cách TP Tây Ninh ~100 km, chỉ hợp đi riêng 1 ngày từ TP.HCM hoặc ghép cung biên giới; vé vào cổng 85.000đ chỉ có 1 nguồn. Hợp nhóm bạn, gia đình; đi mùa nước nổi, giờ mở cửa 7:00–17:00. (Nguồn tham khảo: danviet.vn; dulichvietnam.com.vn; Google Maps; ngày kiểm 06/11/2026). Đánh giá người dùng: chưa có đánh giá — bạn là người đầu tiên.
- **Khu du lịch Cánh Đồng Bất Tận (Long An cũ)**: Rừng tràm gió nguyên sinh duy nhất Việt Nam, phim trường 'Cánh đồng bất tận' — không gian dược liệu Đồng Tháp Mười đặc trưng. Điểm yếu: cùng cụm Mộc Hóa, xa TP Tây Ninh (~100 km), chưa kiểm được vé/giờ riêng. Hợp người thích sinh thái, chụp ảnh; ghép cùng Làng nổi Tân Lập 1 ngày. (Nguồn tham khảo: dulichvietnam.com.vn; Google Maps; ngày kiểm 06/11/2026). Đánh giá người dùng: chưa có đánh giá — bạn là người đầu tiên.
- **Vườn thú Mỹ Quỳnh (Long An cũ)**: Vườn thú tư nhân lớn ở Long An cũ, nhiều loài thú, trẻ nhỏ thích. Điểm yếu: cách TP Tây Ninh ~60 km, chưa kiểm được vé/giờ riêng; review khen không gian rộng nhưng trò chơi ít. Hợp gia đình có trẻ nhỏ; ghép cung Đức Huệ – Đức Hòa. (Nguồn tham khảo: Google Maps; ngày kiểm 06/11/2026). Đánh giá người dùng: chưa có đánh giá — bạn là người đầu tiên.

### 10.2. Món ăn

- **Bánh canh Trảng Bàng**: Sợi bánh canh dai, giò heo và huyết — món trứ danh Trảng Bàng, quán Năm Dung/Út Huệ đông khách. Điểm yếu: giá tô đặc biệt tới 100.000đ, quán đông giờ trưa. Hợp ăn sáng/trưa trên đường QL22; đi sớm đỡ chờ. (Nguồn tham khảo: Google Maps; dulichbinhminh.com; ngày kiểm 06/11/2026). Đánh giá người dùng: chưa có đánh giá — bạn là người đầu tiên.
- **Bánh tráng phơi sương cuốn thịt heo**: Bánh tráng dẻo phơi sương cuốn thịt luộc, rau rừng — món 'phải thử' khi qua Trảng Bàng. Điểm yếu: phần cuốn 80.000–150.000đ, mua lẻ làm quà 50.000–60.000đ/kg cần hỏi rõ loại. Hợp ăn trưa/tối; mua về ở Minh Nhựt (QL22B). (Nguồn tham khảo: Google Maps; dulichbinhminh.com; saodaily.com; ngày kiểm 06/11/2026). Đánh giá người dùng: chưa có đánh giá — bạn là người đầu tiên.
- **Bò tơ Tây Ninh**: Bò tơ mềm, món nướng/lẩu hợp nhóm, quán Năm Sánh lâu đời. Điểm yếu: giá theo kg/đĩa 150.000–300.000đ, địa chỉ Năm Sánh 2 nguồn ghi khác nhau (QL22B vs 30/4 nối dài). Hợp nhóm ăn tối; hỏi địa chỉ trước khi đi. (Nguồn tham khảo: Google Maps; dulichbinhminh.com; ngày kiểm 06/11/2026). Đánh giá người dùng: chưa có đánh giá — bạn là người đầu tiên.
- **Muối tôm Tây Ninh**: Muối tôm cay mặn, mua về làm quà rẻ (25.000–60.000đ/gói). Điểm yếu: chưa kiểm được mức niêm yết, hàng giả/nhái nhiều ở sạp dọc QL22. Hợp mua về; mua ở sạp lớn, chợ Tây Ninh, hỏi giá trước. (Nguồn tham khảo: Google Maps; vienmaytinh.com; ngày kiểm 06/11/2026). Đánh giá người dùng: chưa có đánh giá — bạn là người đầu tiên.
- **Bánh tráng nướng / bánh tráng trộn**: Ăn vặt rẻ, nhiều quầy ở chợ Tây Ninh, đường 30/4. Điểm yếu: chất lượng tùy quầy, giá 15.000–40.000đ chỉ là khoảng chung. Hợp ăn xế. (Nguồn tham khảo: Google Maps; dulichbinhminh.com; ngày kiểm 06/11/2026). Đánh giá người dùng: chưa có đánh giá — bạn là người đầu tiên.
- **Cơm / món chay (khu vực Tòa Thánh, núi Bà)**: Quán cơm chay quanh Tòa Thánh và chân núi Bà, phần 25.000–60.000đ. Điểm yếu: quán không có địa chỉ cố định, món chay đơn giản. Hợp ăn trưa khi đi lễ/chùa. (Nguồn tham khảo: Google Maps; phanvantravel.com; ngày kiểm 06/11/2026). Đánh giá người dùng: chưa có đánh giá — bạn là người đầu tiên.
- **Hủ tiếu / phở (ăn sáng TP Tây Ninh)**: Ăn sáng bình dân ở TP Tây Ninh, tô 30.000–50.000đ. Điểm yếu: chỉ là khoảng chung, không có quán cụ thể. Hợp ăn sáng nhanh. (Nguồn tham khảo: Google Maps; phanvantravel.com; ngày kiểm 06/11/2026). Đánh giá người dùng: chưa có đánh giá — bạn là người đầu tiên.
- **Thằn lằn núi Bà Đen (món lạ, tùy quán)**: Món lạ đặc sản núi Bà, khách tò mò hay hỏi. Điểm yếu: chưa kiểm được giá, chỉ ăn khi quán có giấy phép/nguồn rõ ràng — không ăn thịt rừng không rõ nguồn. Hợp người thích món lạ; hỏi rõ nguồn gốc trước. (Nguồn tham khảo: Google Maps; ngày kiểm 06/11/2026). Đánh giá người dùng: chưa có đánh giá — bạn là người đầu tiên.
- **Trái cây / nước mía (dọc QL22)**: Trái cây và nước mía dọc QL22 rẻ, giải khát trên đường. Điểm yếu: giá tùy quán, 10.000–30.000đ chỉ là khoảng chung. Hợp dừng chân trên đường đi. (Nguồn tham khảo: Google Maps; dulichbinhminh.com; ngày kiểm 06/11/2026). Đánh giá người dùng: chưa có đánh giá — bạn là người đầu tiên.

### 10.3. Chỗ ở

Tất cả chỗ ở đã có trường đánh giá người dùng (mảng rỗng trong JSON) — chưa có đánh giá, bạn là người đầu tiên.

## 11. Cảnh báo chặt chém + lừa cọc (bổ sung 08/11/2026)

- **Dịch vụ quanh núi Bà Đen dịp lễ Vía Bà, Tết: vé cáp treo, giữ xe, quán ăn tăng giá; cò vé, cò xe chèo kéo.** Cách tránh: Mua vé cáp treo tại quầy chính thức hoặc website Sun World; gửi xe ở bãi chính thức có bảng giá; hỏi giá ăn uống trước khi gọi món. (Nguồn: Cảnh báo chung theo kinh nghiệm du lịch và báo chí; chưa tra được vụ việc riêng của tỉnh này trên báo chính thống (ngày kiểm 08/11/2026))
- **Quán ăn, mua đặc sản (bánh tráng, muối tôm) ở khu vực Tòa Thánh, chợ Tây Ninh: giá hét cao với khách lạ, hàng giả thương hiệu.** Cách tránh: Mua tại cửa hàng có thương hiệu, bao bì rõ ràng; so giá 2-3 nơi trước khi mua số lượng lớn. (Nguồn: Cảnh báo chung theo kinh nghiệm du lịch và báo chí; chưa tra được vụ việc riêng của tỉnh này trên báo chính thống (ngày kiểm 08/11/2026))
- **Lừa cọc homestay/khách sạn đặt qua Facebook, Zalo: mạo danh chủ nhà, giá rẻ, giục cọc 30-50% rồi chặn liên lạc.** Cách tránh: Chỉ đặt qua nền tảng có cơ chế hoàn tiền hoặc gọi số trên website/fanpage chính thức để xác nhận; yêu cầu gọi video trực tiếp tại phòng. (Nguồn: Báo Nhân Dân — Nhiều chiêu trò lừa đảo đặt phòng khách sạn (05/08/2023): mạo danh chủ khách sạn/homestay, giá rẻ trên Facebook/Zalo, yêu cầu cọc 30-50% rồi chặn liên lạc; một vụ ở Quảng Ninh chiếm đoạt khoảng 100 triệu đồng và đã bị khởi tố (ngày kiểm 08/11/2026))
- **Xe ôm, taxi ở bến xe Tây Ninh và chân núi Bà Đen hét giá cao, chở vòng.** Cách tránh: Dùng taxi có đồng hồ/hãng quen hoặc đặt xe qua ứng dụng; thỏa thuận giá trước khi lên xe. (Nguồn: Cảnh báo chung theo kinh nghiệm du lịch và báo chí; chưa tra được vụ việc riêng của tỉnh này trên báo chính thống (ngày kiểm 08/11/2026))


## 12. An toàn đường đèo + thuê xe máy (bổ sung 08/11/2026)

Tây Ninh đồng bằng, không có đèo. Đường lên núi Bà Đen dốc, nhiều cua — nên đi cáp treo; leo bộ cần giày bám tốt, mang nước, tránh leo trưa nắng và khi mưa (đá trơn).

(Nguồn: Tỉnh đồng bằng, không có đèo; đường lên núi Bà Đen dốc, nên đi cáp treo (ngày kiểm 08/11/2026))


## 13. Số khẩn cấp + xử lý sự cố (bổ sung 08/11/2026)

- Công an: 113 — Cấp cứu: 115 — Cứu hỏa: 114
- Số riêng của tỉnh: chưa tra được nguồn chính thức — khi cần gọi 113/115/114.

(Nguồn: số chung cả nước 113/115/114 là số khẩn cấp quốc gia; số riêng theo nguồn ghi trong từng mục (ngày kiểm 08/11/2026))


## 14. Giờ đẹp chụp ảnh (bổ sung 08/11/2026)

| # | Điểm | Giờ đẹp | Nguồn |
|---|---|---|---|
| 1 | Núi Bà Đen | 5:30-8:00 sáng săn mây và đón bình minh trên đỉnh (mùa khô tháng 11-3 đẹp nhất); hoặc 15:00-17:30 chiều ngắm hoàng hôn | Sun World Ba Den Mountain — Nên đi núi Bà Đen mấy giờ: sáng sớm 5h30-8h00 săn mây, bình minh; chiều 15h00-17h30 hoàng hôn (ngày kiểm 08/11/2026) |
| 2 | Tòa Thánh Cao Đài | 7:00-9:00 sáng hoặc 16:00-17:30 chiều, ánh sáng đẹp trên kiến trúc | Khung giờ vàng chung cho chụp ảnh ngoài trời tại Việt Nam; chưa có hướng dẫn riêng cho điểm này (ngày kiểm 08/11/2026) |
| 3 | Hồ Dầu Tiếng | 5:30-7:00 sáng bình minh hoặc 16:30-18:00 hoàng hôn trên hồ | Khung giờ vàng chung cho chụp ảnh ngoài trời tại Việt Nam; chưa có hướng dẫn riêng cho điểm này (ngày kiểm 08/11/2026) |


## 15. Cho người chạy giải (bổ sung 08/11/2026)

**Giải chạy (đã kiểm nguồn):**
- Ba Den Mountain International Marathon (Baden Mountain International Marathon) — Tháng 8 hằng năm (mùa 2025: 2-3/8/2025, thi đấu chính 3/8/2025) (Nguồn: Bộ VH-TT-DL (bvhttdl.gov.vn) — Tây Ninh tổ chức giải chạy marathon đạt chuẩn quốc tế (09/7/2025); Sun World — Runners are ready to participate in the marathon race at Ba Den Mountain (ngày kiểm 08/11/2026))

**Điểm chạy bộ đẹp:** Quảng trường ga đi cáp treo núi Bà Đen (điểm xuất phát/về đích của giải); Thung lũng Ma Thiên Lãnh buổi sáng sớm; Đường quanh hồ Dầu Tiếng.

**Chỗ ở gần điểm xuất phát** (lấy từ mục chỗ ở đã có): Melia Vinpearl Tây Ninh; Melia Vinpearl Tây Ninh Resort & Villas (chân núi Bà Đen); Sài Gòn Tây Ninh Hotel.

(Nguồn: Bộ VH-TT-DL và Sun World về giải Ba Den Mountain Marathon; chỗ ở lấy từ dữ liệu chỗ ở đã có của tỉnh (ngày kiểm 08/11/2026))
