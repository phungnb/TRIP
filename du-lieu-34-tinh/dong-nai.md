# Dữ liệu cẩm nang Đồng Nai (TP Biên Hòa) — Giai đoạn 1 (đầy đủ)

- **Trạng thái: published** — đẩy lên theo lệnh anh ngày 06/11/2026 (đẩy hết lên, bỏ vòng duyệt chuyên gia; các nợ dữ liệu vẫn giữ nguyên, xem mục 9).
- Ngày kiểm: 06/11/2026. Mọi giá đều là **khoảng giá tham khảo** từ nguồn công khai, không phải giá chốt. Giá đổi theo mùa, cuối tuần, lễ Tết — kiểm lại trước ngày đi.
- Bổ sung 08/11/2026: số điện thoại chỗ ở (cột Điện thoại, mục 2) + mục 2B Trời mưa thì đi đâu + mục 2C Cho cặp đôi + mục 2D Mùa + tháng đẹp nhất. Số điện thoại tra từ nguồn công khai ngày 08/11/2026; chỗ nào ghi 'Chưa tra được' là chưa tìm thấy số khớp tên + địa chỉ.
- Lưu ý địa giới: từ 07/2025 tỉnh Bình Phước sáp nhập vào Đồng Nai; tên phường/xã mới trong các nguồn không thống nhất — file này ghi đường + số nhà là chính. Vườn quốc gia Cát Tiên trải dài qua Đồng Nai – Lâm Đồng – Bình Phước (cũ), cổng chính phía Đồng Nai (Nam Cát Tiên, Tân Phú).
- **Tọa độ GPS (cập nhật 06/11/2026):** đã điền cho toàn bộ 13 địa danh; 12 điểm còn ở mức xấp xỉ (ghi rõ trong bảng và trường toa_do_xap_xi trong JSON) — cần kiểm lại bằng GPS thực tế, TUYỆT ĐỐI không bịa tọa độ.** Tọa độ trung tâm trong meta là tọa độ tham khảo khu vực trung tâm thành phố.
- **Khách sạn/homestay: CHỈ giới thiệu sơ.** Tất cả đều ghi "chưa kiểm chứng / chưa đối tác / chưa thu phí". Không dùng chữ uy tín/đảm bảo. Không nhận đặt phòng, không nhận tiền.
- File JSON máy đọc được: `dong-nai.json` (cùng thư mục).

## 1. Địa danh — 13 điểm chính (10 cũ + 3 mở rộng Bình Phước cũ)

Mốc tính khoảng cách: trung tâm TP Biên Hòa (khu vực quảng trường tỉnh / chợ Biên Hòa). Khoảng cách là đường đi theo nguồn.

### 1.1. Cụm Biên Hòa — trung tâm

| # | Tên | Địa chỉ | Tọa độ | Cách trung tâm | Giá vé | Giờ mở cửa | Thời gian | Hợp với ai | Lưu ý | Nguồn |
|---|---|---|---|---|---|---|---|---|---|---|
| 1 | Văn miếu Trấn Biên | Tổ 31, KP5, phường Bửu Long, TP Biên Hòa | 10.966, 106.817 (xấp xỉ) | ~3–5 km | Miễn phí | 7:00–17:00 hàng ngày | 1–1,5 giờ | Người yêu văn hóa/lịch sử, gia đình, học sinh | Di tích hơn 300 năm, được gọi là Quốc Tử Giám miền Nam; ăn mặc lịch sự | mytour.vn, tripi.vn |
| 2 | Khu du lịch Bửu Long | Đường Huỳnh Văn Nghệ, KP4, phường Bửu Long, TP Biên Hòa | 10.958, 106.809 (xấp xỉ) | ~5 km | ~60.000–120.000đ/người (có nguồn ghi 60.000–150.000đ) | 7:00–17:00 (có nguồn ghi 24/24 — mâu thuẫn, xem mục 9) | 2–3 giờ | Gia đình, nhóm bạn | Được ví "Vịnh Hạ Long thu nhỏ"; thăm chùa Bửu Phong, miếu Thiên Hậu trong khu | mytour.vn, tripi.vn, dulichvietnam.com.vn |
| 3 | Làng bưởi Tân Triều | Xã Tân Bình / khu vực Tân Triều, TP Biên Hòa (địa chỉ chi tiết theo xã chưa thống nhất) | 10.985, 106.805 (xấp xỉ) | ~5–10 km | Miễn phí vào làng; mua bưởi/ăn tại vườn theo giá vườn (chưa kiểm được mức chung) | Ban ngày, nên đi 8:00–17:00 | 1,5–2,5 giờ | Gia đình, nhóm bạn | Mùa bưởi rộ đẹp nhất; hỏi giá trước khi hái/mua | mia.vn |

### 1.2. Cụm sông/hồ — Vĩnh Cửu, Trảng Bom

| # | Tên | Địa chỉ | Tọa độ | Cách trung tâm | Giá vé | Giờ mở cửa | Thời gian | Hợp với ai | Lưu ý | Nguồn |
|---|---|---|---|---|---|---|---|---|---|---|
| 4 | Hồ Trị An | Huyện Vĩnh Cửu, cách Biên Hòa ~30 km, cách TP.HCM ~70–80 km | 11.005, 106.975 (xấp xỉ) | ~30 km, 45–60 phút đi xe | Miễn phí vào khu vực hồ; Đảo Ó – Đông Trường: ngày thường 15.000đ, cuối tuần 20.000đ, lễ 25.000đ (theo nguồn cũ — cần xác nhận) | Tự do, cắm trại qua đêm được ở khu vực cho phép | Nửa ngày–cả ngày | Nhóm bạn, gia đình cắm trại | Hồ thủy điện rộng; đi thuyền ra đảo hỏi giá trước; mùa mưa nước lên, cẩn thận khi cắm trại ven hồ | tripi.vn, 52hz.vn, thueleuphuot.com |
| 5 | Thác Giang Điền | 104/4 ấp Hòa Bình, xã Giang Điền, huyện Trảng Bom (có nguồn ghi 248 đường Bình Minh, xã Bình Minh) | 10.925, 106.94 (xấp xỉ) | ~20–25 km | ~80.000đ/người (vé tham quan); gói trọn gói 115.000–500.000đ/người tùy dịch vụ | 7:30–17:00 / 7:30–17:30 (nguồn mâu thuẫn nhẹ) | 2–4 giờ; cắm trại qua đêm được | Gia đình, nhóm bạn | Nước thác có nguồn chê bẩn — chỉ ngắm, kiểm tra thực tế trước khi tắm | mytour.vn, tripi.vn, mia.vn |
| 6 | Khu du lịch Bọ Cạp Vàng | Số 203 ấp 3, xã Đại Phước, huyện Nhơn Trạch (ven sông Đồng Nai) | 10.8, 106.85 (xấp xỉ) | ~25–30 km | Người lớn ~80.000đ, trẻ em dưới 1,4 m ~40.000đ (đã gồm vào cổng + 10+ trò chơi — theo 1 nguồn) | Mở cả ngày (chưa kiểm được giờ chính xác) | Nửa ngày–cả ngày | Gia đình có trẻ nhỏ, nhóm bạn team-building | Trò chơi sông nước nhiều; mang đồ thay, túi chống nước | mia.vn, dulichvietnam.com.vn |
| 7 | Thác Đá Hàn | Xã Trảng Bom / khu vực Trảng Bom, Đồng Nai (địa chỉ chi tiết chưa thống nhất) | 10.97, 107.02 (xấp xỉ) | ~25 km | Người lớn: thứ 2–6 50.000đ, thứ 7–CN 65.000đ, lễ 75.000đ | Chưa kiểm được giờ chính xác trong đợt này | 2–3 giờ | Nhóm bạn, gia đình | Đá trơn, mang giày chống trượt | mytour.vn |

### 1.3. Cụm xa — Tân Phú, Xuân Lộc, Long Khánh

| # | Tên | Địa chỉ | Tọa độ | Cách trung tâm | Giá vé | Giờ mở cửa | Thời gian | Hợp với ai | Lưu ý | Nguồn |
|---|---|---|---|---|---|---|---|---|---|---|
| 8 | Vườn quốc gia Nam Cát Tiên | Xã Nam Cát Tiên, huyện Tân Phú, Đồng Nai | 11.575, 107.3667 (xấp xỉ) | ~130–150 km, 3–3,5 giờ đi xe | Người lớn 60.000đ; người cao tuổi/khuyết tật 40.000đ; sinh viên 20.000đ; học sinh 6–16 tuổi 10.000đ (có nguồn ghi 20.000–40.000đ — mâu thuẫn nhẹ) | 7:30–18:00 / 7:30–19:00 (nguồn mâu thuẫn) | Cả ngày; nên ở lại 2 ngày để đi Bầu Sấu | Người yêu rừng, gia đình, nhóm bạn | Thuê xe đạp ~30.000đ/giờ; xe jeep ~500.000đ/khứ hồi (5–7 người); vé Bầu Sấu ~140.000đ/người (theo nguồn) | tripi.vn, mytour.vn, 52hz.vn, dulichvietnam.com.vn |
| 9 | Núi Chứa Chan (Gia Lào) | Xã Xuân Trường, huyện Xuân Lộc (ga cáp treo: ấp Trung Sơn, xã Xuân Trường) | 10.925, 107.145 (xấp xỉ) | ~80–100 km từ TP.HCM; ~70 km từ Biên Hòa | Vé tham quan người lớn 15.000đ, trẻ em 1–1,4 m 8.000đ; cáp treo khứ hồi người lớn 160.000đ, trẻ em 80.000đ; lên 120.000đ, xuống 80.000đ (có nguồn ghi vé tham quan người lớn 180.000đ — mâu thuẫn, xem mục 9) | Cáp treo ban ngày (chưa kiểm được giờ chính xác) | Nửa ngày; leo bộ 3–4 giờ | Người leo núi, hành hương (chùa trên núi), nhóm bạn | Núi cao 837 m, cao thứ 2 Nam Bộ; leo bộ cần sức khỏe, mang nước; cáp treo đỡ leo | 52hz.vn, dulich.pro.vn, thueleuphuot.com |
| 10 | Công viên Suối Mơ | Số 9 ấp 9, xã Trà Cổ, huyện Tân Phú | 11.195, 107.42 (xấp xỉ) | ~110 km, ~2,5–3 giờ đi xe | 60.000–70.000đ/người (có nguồn ghi 100.000–220.000đ — mâu thuẫn, xem mục 9) | 7:30–17:00 / 8:00–17:00 | Nửa ngày–cả ngày | Gia đình có trẻ nhỏ, nhóm bạn | Suối tự nhiên, hồ bơi; mang đồ bơi, giày đi suối | mytour.vn, tripi.vn, dulichvietnam.com.vn |

### 1.4. Điểm mở rộng — Bình Phước cũ (cùng cụm Cát Tiên – Phước Long)

| # | Tên | Địa chỉ | Tọa độ | Cách trung tâm | Giá vé | Giờ mở cửa | Thời gian | Hợp với ai | Lưu ý | Nguồn |
|---|---|---|---|---|---|---|---|---|---|---|
| 1 | Núi Bà Rá – Hồ Thác Mơ (Bình Phước cũ) | Phường Sơn Giang và phường Thác Mơ, thị xã Phước Long, tỉnh Bình Phước cũ (nay thuộc Đồng Nai) | 11.816906, 107.000906 | ~130 km | Chưa kiểm được mức vé riêng — hỏi giá tại cổng | Ban ngày; leo bộ 1.767 bậc đá từ đồi Bằng Lăng | Nửa ngày (leo bộ 3–4 giờ) | Người thích leo núi, trekking | Thuộc khu vực Bình Phước cũ (sáp nhập vào Đồng Nai 07/2025), cách Biên Hòa ~130 km — chỉ hợp ghép cung Cát Tiên – Phước Long 2 ngày, không đi lẻ trong ngày; đỉnh cao 724 m, ngắm hồ Thác Mơ; leo mệt, cần sức khỏe | vi.wikipedia.org, mytour.vn, wetrek.vn |
| 2 | Hồ Thác Mơ (Bình Phước cũ) | Dưới chân núi Bà Rá, phường Thác Mơ, thị xã Phước Long, tỉnh Bình Phước cũ (nay thuộc Đồng Nai) | 11.81, 107.02 (xấp xỉ) | ~130 km | Miễn phí khu vực hồ; dịch vụ thuyền chưa kiểm được giá | Ban ngày | 1–2 giờ (ngắm cảnh); nửa ngày nếu cắm trại | Nhóm bạn cắm trại, gia đình | Thuộc khu vực Bình Phước cũ (sáp nhập vào Đồng Nai 07/2025), cùng cụm núi Bà Rá, cách Biên Hòa ~130 km; hồ thủy điện rộng ~12.000 ha; tọa độ xấp xỉ, cần kiểm lại | mytour.vn, tripi.vn |
| 3 | Vườn quốc gia Bù Gia Mập (Bình Phước cũ) | Huyện Bù Gia Mập, tỉnh Bình Phước cũ (nay thuộc Đồng Nai), giáp ranh Đắk Nông | 12.0833, 107.1 (xấp xỉ) | ~150 km | Chưa kiểm được mức vé riêng — liên hệ ban quản lý trước | Chưa kiểm được giờ chính xác — liên hệ ban quản lý trước | Cả ngày; nên đi theo tour/nhóm | Người yêu rừng thật sự, nhóm trekking | Thuộc khu vực Bình Phước cũ (sáp nhập vào Đồng Nai 07/2025), cách Biên Hòa ~150 km, gần cung Cát Tiên – Phước Long; rừng nguyên sinh, ít khách nên còn hoang sơ; đường vào rừng khó; tọa độ xấp xỉ, cần kiểm lại | Google Maps |

## 2. Ở đâu — 7 chỗ ở (CHỈ GIỚI THIỆU SƠ)

**Tất cả: "Thông tin tham khảo, chưa kiểm chứng trực tiếp, chưa phải đối tác, chưa thu phí. Người dùng tự kiểm tra giá / phòng trống trước khi đặt." Không dùng chữ uy tín/đảm bảo. Không nhận đặt phòng, không nhận tiền.**

| # | Tên | Địa chỉ | Khu vực | Hạng | Khoảng giá/đêm ngày thường | Điện thoại | Cách trung tâm | Hợp với ai | Trạng thái | Nguồn |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| 1 | The Mira Central Park Hotel | 1809 Nguyễn Ái Quốc, phường Tam Hiệp, TP Biên Hòa | Trung tâm Biên Hòa | 5 sao | Từ ~1.000.000đ/đêm (có nguồn ghi từ 1.411.200đ) | 0251 8870 999 | Trung tâm, gần quảng trường | Khách công tác, gia đình | Chưa kiểm chứng / chưa đối tác / chưa thu phí | traveloka.com, limoutrip.com |
| 2 | Aurora Plaza Hotel | 253 Phạm Văn Thuận, KP17, phường Tam Hiệp, TP Biên Hòa | Trung tâm Biên Hòa | 4 sao | ~600.000–1.300.000đ/đêm (có nguồn ghi giá USD 115–173 — đã lỗi thời) | 0251 3918 888 | Trung tâm | Khách công tác, cặp đôi | Chưa kiểm chứng / chưa đối tác / chưa thu phí | dulichfun.com, traveloka.com |
| 3 | Mansion Park Hotel & Apartment | K73 đường D8, KP7, phường Thống Nhất, TP Biên Hòa | Thống Nhất | 3 sao | ~700.000–1.500.000đ/đêm (có nguồn ghi từ 880.000đ) | 0251 3683 450 | Trung tâm | Cặp đôi, gia đình | Chưa kiểm chứng / chưa đối tác / chưa thu phí | dongnaitoplist.com, traveloka.com |
| 4 | Bcons PS Hotel | A9C Xa lộ Hà Nội, KP4, phường Tân Hiệp, TP Biên Hòa | Cửa ngõ TP.HCM | 3 sao | ~500.000–1.000.000đ/đêm (có nguồn ghi từ 851.580đ) | 0816 646 568 | Cách trung tâm ~5 km | Khách công tác, khách quá cảnh | Chưa kiểm chứng / chưa đối tác / chưa thu phí | dongnaitoplist.com, traveloka.com |
| 5 | Khách sạn Biên Hòa | N30–40 Võ Thị Sáu, phường Thống Nhất, TP Biên Hòa | Trung tâm | 2 sao | Từ ~400.000đ/đêm | 0922 685 685 | Trung tâm, yên tĩnh | Khách tiết kiệm | Chưa kiểm chứng / chưa đối tác / chưa thu phí | limoutrip.com |
| 6 | Khách sạn 3 sao Long Khánh (nhóm tham khảo) | 226 Nguyễn Trãi, Xuân Hòa, Long Khánh, Đồng Nai | Long Khánh | 3 sao | ~600.000–1.200.000đ/đêm (khung 3 sao Đồng Nai) | Chưa tra được | Cách Biên Hòa ~50 km — chỉ hợp khi đi vườn trái cây Long Khánh | Khách đi vườn trái cây | Chưa kiểm chứng / chưa đối tác / chưa thu phí | dongnaitoplist.com |
| 7 | Lưu trú gần Cát Tiên / Suối Mơ (nhóm tham khảo) | Khu vực Tân Phú, Đồng Nai | Tân Phú | Nhà nghỉ/homestay | Chưa kiểm được khoảng giá riêng trong đợt này | Chưa tra được | Cách Biên Hòa ~130 km — chỉ hợp khi đi Cát Tiên | Khách đi rừng 2 ngày | Chưa kiểm chứng / chưa đối tác / chưa thu phí | tripi.vn |

## 2B. Trời mưa thì đi đâu (bổ sung 08/11/2026)

Các điểm dưới đây đều đã có trong mục 1, chỉ chọn những điểm có mái che/không gian trong nhà, đi mưa được:

- Văn miếu Trấn Biên
- Khu du lịch Bửu Long
- Làng bưởi Tân Triều

Dặn: Mưa thì ghé Văn miếu và Bửu Long — tránh thác Giang Điền, Đá Hàn, Nam Cát Tiên vì suối dâng và đường rừng trơn.

## 2C. Cho cặp đôi (bổ sung 08/11/2026)

Chỗ ở hợp cặp đôi (theo mục 'Hợp với ai' trong file):

- Aurora Plaza Hotel
- Mansion Park Hotel & Apartment

Điểm hợp cặp đôi (từ mục 1):

- Hồ Trị An
- Khu du lịch Bửu Long
- Thác Giang Điền
- Công viên Suối Mơ

## 2D. Mùa + tháng đẹp nhất (bổ sung 08/11/2026)

- Tháng đẹp nhất: Tháng 11–4 (mùa khô): đi rừng, leo núi, cắm trại thuận; tránh tháng 5–10 mưa nhiều
- Nguồn: meta.best_season trong file (nghiên cứu ngày 06/11/2026; nguồn tổng xem meta.nguon_tong)
- Ngày kiểm: 06/11/2026

## 3. Ăn gì — 9 món (đủ quán + địa chỉ + khoảng giá)

| # | Món | Buổi ăn | Khoảng giá | Quán tham khảo (địa chỉ) | Nguồn |
|---|---|---|---|---|---|
| 1 | Gỏi cá Tân Mai | Ăn trưa / ăn tối | 80.000–150.000đ/phần (khoảng tham khảo, chưa kiểm được giá niêm yết) | (1) Gỏi cá Tân Mai — khu phố Tân Mai, phường Tân Mai, TP Biên Hòa (hẻm nhỏ, chưa kiểm được số nhà chính xác — xem mục 9); lẩu cua đồng từ ~250.000đ/nồi. (2) Gỏi cá — 160 Huỳnh Văn Hớn, phường Thống Nhất | lofita.vn, topbienhoa.com |
| 2 | Lẩu cá kèo | Ăn trưa / ăn tối (món nhóm) | 50.000–165.000đ/nồi | (1) Lẩu Cá Kèo Thanh Mai — 400/A2 Đỗ Văn Thi, xã Hiệp Hòa, TP Biên Hòa; 10:30–22:00. (2) Lẩu cá Hoàng Oanh 2 — đường Nguyễn Đình Chiểu, khu Trấn Biên, Bửu Long; lẩu cá diêu hồng ~60.000đ | lofita.vn, mytour.vn, foody.vn |
| 3 | Lẩu tôm 5 Ri | Ăn trưa / ăn tối (món nhóm) | Chưa kiểm được khoảng giá riêng trong đợt này | (1) Lẩu Tôm 5 Ri — 20/3B Cách Mạng Tháng 8, hẻm 487, phường Hòa Bình, TP Biên Hòa | topbienhoa.com |
| 4 | Lẩu cá (diêu hồng / lẩu Thái) | Ăn trưa / ăn tối | 60.000–150.000đ/nồi | (1) Lẩu Cá Hoàng Oanh 2 — đường Nguyễn Đình Chiểu, khu Trấn Biên, Bửu Long; lẩu Thái 100.000–150.000đ | foody.vn |
| 5 | Chả lụi | Ăn xế / ăn tối | Chưa kiểm được khoảng giá riêng trong đợt này | (1) Chả lụi Minh Ánh — A38C Huỳnh Văn Nghệ, KP5, phường Bửu Long, TP Biên Hòa | topbienhoa.com |
| 6 | Cơm / món nhậu sông (cá lăng, lươn) | Ăn trưa / ăn tối | 59.000–400.000đ/món (khoảng chung quán nhậu) | (1) Quán nhậu khu vực QL1A, Long Bình, Biên Hòa — ví dụ Draft Beer, QL1A Long Bình; 79.000–400.000đ | mytour.vn |
| 7 | Bánh canh / hủ tiếu Biên Hòa | Ăn sáng / ăn trưa | 25.000–50.000đ/tô (khoảng chung) | (1) Khu vực chợ Biên Hòa / đường Võ Thị Sáu, phường Thống Nhất — nhiều quán, hỏi giá trước | topbienhoa.com |
| 8 | Bưởi Tân Triều (ăn tại vườn / mua về) | Ăn xế / mua về | Chưa kiểm được mức chung — theo giá vườn | (1) Vườn bưởi Tân Triều — khu vực Tân Triều, TP Biên Hòa (địa danh 3) | mia.vn |
| 9 | Ốc / hải sản sông | Ăn tối | Chưa kiểm được khoảng giá riêng trong đợt này | (1) Khu vực đường Đặng Đức Thuật, phường Tam Hòa, TP Biên Hòa — nhiều quán ốc, hỏi giá trước | mytour.vn |

## 4. Đi đến Đồng Nai bằng gì

Không có sân bay/ga lớn trong tỉnh cho khách du lịch (ga Biên Hòa có tàu Bắc–Nam dừng nhưng ít chuyến du lịch). Đi từ TP.HCM chủ yếu bằng xe khách/xe riêng theo QL1A hoặc cao tốc Long Thành – Dầu Giây.

### 4.1. Từ TP.HCM (~30–40 km tới Biên Hòa; ~100–150 km tới Cát Tiên/Chứa Chan)

| Phương tiện | Thời gian | Khoảng giá | Hãng / ghi chú | Nguồn |
|---|---|---|---|---|
| Xe khách / xe buýt SG–Biên Hòa | 1–1,5 giờ (tùy kẹt xe QL1A / xa lộ Hà Nội) | Xe khách ghế ngồi ~80.000–150.000đ/lượt (Quốc Cường 80.000–120.000đ; limousine Trường Thịnh ~120.000đ, trung bình ~150.000đ — Vexere 11/2026; redBus rẻ nhất ~165.000đ); xe buýt tuyến 05/60-1/60-5/60-7 từ 10.000–15.000đ/lượt | Nhiều hãng xe buýt liên tỉnh; xe buýt 150, 60-x | tadiha.com, vexere.com, xelimou.vn, redbus.vn, blog.vexere.com |
| Xe máy / ô tô riêng SG–Biên Hòa | 1–1,5 giờ | Xăng + phí cầu đường (chưa kiểm được mức chung) | Lộ trình: xa lộ Hà Nội / QL1A → Biên Hòa | tripi.vn |
| Xe khách SG–Cát Tiên / Tân Phú | ~3–3,5 giờ | Chưa kiểm được giá vé riêng trong đợt này | Đi tới bến Tân Phú rồi xe ôm/taxi vào cổng vườn | tripi.vn |
| Xe riêng SG–núi Chứa Chan | ~2–2,5 giờ (~100 km) | Chưa kiểm được phí cầu đường | Lộ trình: cao tốc Long Thành – Dầu Giây → QL1A → Xuân Lộc | 52hz.vn |

### 4.2. Từ Hà Nội (~1.700 km)

| Phương tiện | Thời gian | Khoảng giá | Ghi chú | Nguồn |
|---|---|---|---|---|
| Máy bay HAN–SGN + xe lên Biên Hòa | Bay ~2 giờ + xe SG–Biên Hòa 1–1,5 giờ | Vé máy bay tùy thời điểm (chưa kiểm được mức trong đợt này) + xe 30.000–80.000đ | Phương án khuyên dùng — không có bay thẳng tới Đồng Nai | Chưa kiểm được — ghi vào mục 9 |
| Tàu HN–ga Biên Hòa | ~30 giờ (chưa kiểm được giờ/giá chính xác) | Chưa kiểm được | Ít chuyến dừng Biên Hòa; nên xuống ga Sài Gòn rồi đi xe | Chưa kiểm được — ghi vào mục 9 |
| Xe khách HN–Biên Hòa | ~30–35 giờ (chưa kiểm được chính xác) | Chưa kiểm được | Không khuyên dùng | Chưa kiểm được — ghi vào mục 9 |

### 4.3. Từ sân bay Tân Sơn Nhất vào Biên Hòa (~35 km)

| Phương tiện | Khoảng giá | Ghi chú | Nguồn |
|---|---|---|---|
| Taxi / xe công nghệ | ~250.000–400.000đ/chuyến (khoảng chung SG–Biên Hòa, chưa kiểm được mức riêng) | 45–60 phút tùy kẹt xe | Chưa kiểm được — ghi vào mục 9 |
| Xe khách / xe buýt | ~30.000–80.000đ/lượt | Về bến Biên Hòa rồi taxi/xe ôm vào điểm ở | Chưa kiểm được — ghi vào mục 9 |

## 5. Đi lại trong Đồng Nai

| Phương tiện | Khoảng giá | Giấy tờ / điều kiện | Ghi chú | Nguồn |
|---|---|---|---|---|
| Thuê xe máy (Biên Hòa) | Xe số ~80.000–120.000đ/ngày; tay ga ~120.000–180.000đ/ngày (motortrip.vn, dongnaireview.vn, motogo.vn 2026) | CCCD + bằng lái A1 | Đi Trị An / Giang Điền tiện bằng xe máy | motortrip.vn, dongnaireview.vn, motogo.vn |
| Taxi nội thành Biên Hòa | Chưa kiểm được mức theo km riêng | — | Mai Linh, Vinasun; có Grab/Be | Chưa kiểm được — ghi vào mục 9 |
| Xe buýt nội tỉnh | ~5.000–10.000đ/lượt (khoảng chung) | — | Tuyến Biên Hòa – Trảng Bom – Long Khánh | Chưa kiểm được — ghi vào mục 9 |
| Thuê ô tô tự lái / có tài xế | Thuê xe có tài xế từ TP.HCM đi Biên Hòa: xe 4 chỗ ~900.000đ/ngày, 7 chỗ ~1.000.000đ/ngày (đã gồm tài xế + xăng + phí đường — thuexeviet.vn); thuê riêng trong Đồng Nai chưa kiểm được mức riêng | Bằng lái B2 + CCCD (tự lái) | Đi Cát Tiên / Chứa Chan nên thuê ô tô có tài xế theo ngày | thuexeviet.vn |
| Thuyền ra Đảo Ó (hồ Trị An) | Đã gồm trong vé đảo (mục 1.4); thuê thuyền riêng chưa kiểm được giá | — | Hỏi giá trước ở bến Vĩnh An | thueleuphuot.com |

## 6. Lịch trình mẫu

### 6.1. Lịch trình 3N2Đ (chính — Biên Hòa + Trị An + Cát Tiên, đi ô tô)

| Ngày | Buổi | Hoạt động | Điểm / quán gắn kèm |
|---|---|---|---|
| Ngày 1 — Biên Hòa | Sáng | Văn miếu Trấn Biên (1–1,5 giờ) + Khu du lịch Bửu Long (2–3 giờ) | Địa danh 1, 2 |
| Ngày 1 | Chiều | Làng bưởi Tân Triều (1,5–2,5 giờ) | Địa danh 3 |
| Ngày 1 | Tối | Lẩu cá kèo Thanh Mai | Món 2 |
| Ngày 2 — Trị An | Sáng–chiều | Hồ Trị An + Đảo Ó (nửa ngày–cả ngày) | Địa danh 4 |
| Ngày 2 | Tối | Gỏi cá Tân Mai | Món 1 |
| Ngày 3 — Cát Tiên | Sáng | Vườn quốc gia Nam Cát Tiên (cả ngày — đi sớm, về chiều) | Địa danh 8 |
| Ngày 3 | Chiều–tối | Về Biên Hòa, trả phòng | — |

### 6.2. Lịch trình 2N1Đ (bản gấp — chỉ Biên Hòa + Trị An)

| Ngày | Buổi | Hoạt động |
|---|---|---|
| Ngày 1 | Sáng | Văn miếu Trấn Biên + Bửu Long |
| Ngày 1 | Chiều | Làng bưởi Tân Triều |
| Ngày 1 | Tối | Lẩu cá kèo Thanh Mai |
| Ngày 2 | Sáng–chiều | Hồ Trị An + Thác Giang Điền; tối về |

### 6.3. Lịch trình 4N3Đ (bản chậm — thêm Chứa Chan + Suối Mơ)

| Ngày | Buổi | Hoạt động |
|---|---|---|
| Ngày 1–2 | Cả ngày | Như ngày 1–2 của lịch trình 3N2Đ |
| Ngày 3 | Cả ngày | Vườn quốc gia Nam Cát Tiên |
| Ngày 4 | Sáng | Núi Chứa Chan (cáp treo, nửa ngày) hoặc Công viên Suối Mơ — ở thêm ngày thì đi Núi Bà Rá – Hồ Thác Mơ (Bình Phước cũ) |
| Ngày 4 | Chiều | Về Biên Hòa, mua bưởi Tân Triều, về |

## 7. Bảng chi phí ước tính (1 người, 3N2Đ từ TP.HCM, ở 3 sao Biên Hòa, đi xe khách/xe riêng)

| Hạng mục | Ước tính 3N2Đ / người | Căn cứ |
|---|---|---|
| Xe SG–Biên Hòa khứ hồi + xe đi Trị An/Cát Tiên | 300.000–800.000đ | Mục 4.1, 5 (xe SG–Biên Hòa 30.000–80.000đ/chiều; thuê xe đi xa chưa kiểm được — khoảng ước tính) |
| Ở 2 đêm (chia đôi phòng 3 sao) | 500.000–1.500.000đ | Mục 2 (3 sao ~500.000–1.500.000đ/đêm, chia 2 người) |
| Ăn 3 ngày | 450.000–900.000đ | Mục 3 (lẩu nhóm 50.000–165.000đ/nồi; gỏi cá 80.000–150.000đ/phần) |
| Vé tham quan (Cát Tiên + Bửu Long + Giang Điền) | 200.000–400.000đ | Mục 1 (Cát Tiên 60.000đ; Bửu Long 60.000–120.000đ; Giang Điền ~80.000đ) |
| Thuê xe máy 2–3 ngày | 200.000–450.000đ | Mục 5 (100.000–150.000đ/ngày) |
| Phát sinh | 100.000–300.000đ | — |
| **Tổng ước tính** | **1.750.000–4.350.000đ/người** | Cộng các khoảng trên |
| Nếu đi Cát Tiên bằng ô tô thuê riêng cả ngày | Cộng thêm — chưa kiểm được mức riêng, hỏi giá trước | Mục 5 |
| Nếu đi từ Hà Nội | Vé máy bay HAN–SGN là hạng mục lớn nhất (chưa kiểm được mức trong đợt này) | Mục 4.2 |

## 8. Checklist mang theo

- Giày đi bộ / giày trekking nhẹ (Cát Tiên, Chứa Chan, thác), áo mưa mỏng, mũ/nón, kem chống nắng.
- CCCD + bằng lái A1 (nếu thuê xe máy), tiền mặt lẻ (quán nhỏ, vé đảo, thuyền).
- Thuốc chống muỗi/côn trùng (rừng Cát Tiên), thuốc cơ bản, sạc dự phòng.
- Đồ bơi/khăn (Suối Mơ, Bọ Cạp Vàng), túi chống nước.
- Hỏi giá trước khi thuê thuyền/xe jeep ở Cát Tiên và Trị An.

## 9. Mục chưa kiểm được / cần xác nhận lại (ghi rõ, không bịa)

1. Tọa độ GPS: đã điền cho toàn bộ 13 địa danh (06/11/2026); 12 điểm còn ở mức xấp xỉ (ghi rõ trong bảng mục 1 và trường toa_do_xap_xi trong JSON) — cần kiểm lại bằng GPS thực tế.
2. Giờ mở cửa KDL Bửu Long — 7:00–17:00 vs 24/24.
3. Giá vé Công viên Suối Mơ — 60.000–70.000đ vs 100.000–220.000đ.
4. Giá vé núi Chứa Chan — vé tham quan 15.000đ vs nguồn ghi 180.000đ (có thể là cáp treo, chưa phân biệt được).
5. Giá vé Cát Tiên — 60.000đ vs 20.000–40.000đ (nguồn cũ).
6. Giá phòng The Mira Central Park — đã chốt sàn ~1.000.000đ/đêm ngày 16/11/2026 (có nguồn ghi từ 1.411.200đ).
7. Giá vé xe khách SG–Biên Hòa ĐÃ TRA ĐƯỢC 06/11/2026 (xem mục 4.1); còn chưa kiểm được: giá vé xe khách SG–Cát Tiên, giá vé máy bay HAN–SGN, giờ/giá tàu HN–ga Biên Hòa.
8. Giá thuê xe máy Biên Hòa và thuê xe có tài xế TP.HCM–Biên Hòa ĐÃ TRA ĐƯỢC 06/11/2026 (xem mục 5); còn chưa kiểm được mức riêng: taxi theo km, giá taxi sân bay Tân Sơn Nhất–Biên Hòa.
9. Số nhà chính xác quán Gỏi cá Tân Mai; giá lẩu tôm 5 Ri, chả lụi, ốc/hải sản sông — chưa kiểm được.
10. Địa chỉ chi tiết Thác Đá Hàn, Làng bưởi Tân Triều theo xã mới — chưa thống nhất.
11. Tên phường/xã mới sau sáp nhập Bình Phước vào Đồng Nai (07/2025).
12. Giá vé/giờ Vườn quốc gia Bù Gia Mập (Bình Phước cũ); giá thuyền Hồ Thác Mơ.

## 10. Nhận xét của M và đánh giá người dùng (bổ sung 06/11/2026)

Nhận xét dưới đây là chính kiến của M sau khi đọc review trên Google Maps / TripAdvisor / Foody / blog du lịch uy tín — viết lại bằng lời của M, KHÔNG copy nguyên văn review, KHÔNG bịa số sao. Đánh giá người dùng trong app hiện chưa có — bạn là người đầu tiên.

### 10.1. Địa danh

- **Văn miếu Trấn Biên**: Di tích hơn 300 năm, được gọi là Quốc Tử Giám miền Nam — điểm văn hóa yên tĩnh, ít đông. Điểm yếu: quy mô nhỏ, tham quan 1–1,5 giờ là hết; ít dịch vụ ăn uống quanh khu. Hợp người yêu lịch sử, học sinh; đi sáng mát, ăn mặc lịch sự. (Nguồn tham khảo: Google Maps; mytour.vn; tripi.vn; ngày kiểm 06/11/2026). Đánh giá người dùng: chưa có đánh giá — bạn là người đầu tiên.
- **Khu du lịch Bửu Long**: Hồ đá và núi nhân tạo được ví 'Vịnh Hạ Long thu nhỏ', chụp ảnh đẹp, có chùa Bửu Phong trong khu. Điểm yếu: giờ mở cửa mâu thuẫn (7:00–17:00 vs 24/24), vé 60.000–150.000đ chưa chốt; cuối tuần đông. Hợp gia đình, nhóm bạn; đi sáng, hỏi giá vé tại cổng. (Nguồn tham khảo: Google Maps; mytour.vn; tripi.vn; ngày kiểm 06/11/2026). Đánh giá người dùng: chưa có đánh giá — bạn là người đầu tiên.
- **Làng bưởi Tân Triều**: Làng bưởi lâu đời, ăn bưởi tại vườn và chụp ảnh vườn trái cây. Điểm yếu: địa chỉ chi tiết theo xã mới chưa thống nhất, giá theo vườn phải hỏi trước; mùa không có bưởi thì ít thứ xem. Hợp gia đình; đi mùa bưởi rộ, hỏi giá trước khi hái/mua. (Nguồn tham khảo: Google Maps; mia.vn; ngày kiểm 06/11/2026). Đánh giá người dùng: chưa có đánh giá — bạn là người đầu tiên.
- **Hồ Trị An**: Hồ thủy điện rộng, cắm trại và hoàng hôn đẹp, Đảo Ó đi thuyền tiện. Điểm yếu: khu vực hồ rộng, dịch vụ rải rác, giá thuyền phải hỏi trước; mùa mưa nước lên. Hợp nhóm bạn, gia đình cắm trại; đi mùa khô, mang đủ đồ. (Nguồn tham khảo: Google Maps; mytour.vn; tripi.vn; ngày kiểm 06/11/2026). Đánh giá người dùng: chưa có đánh giá — bạn là người đầu tiên.
- **Thác Giang Điền**: Thác và khu cắm trại qua đêm, gần Biên Hòa (~22 km), tiện đi trong ngày. Điểm yếu: có nguồn chê nước thác bẩn — chỉ ngắm, kiểm tra thực tế trước khi tắm; vé gói 115.000–500.000đ dễ nhầm. Hợp nhóm bạn, gia đình; kiểm tra nước trước khi xuống tắm. (Nguồn tham khảo: Google Maps; mytour.vn; tripi.vn; ngày kiểm 06/11/2026). Đánh giá người dùng: chưa có đánh giá — bạn là người đầu tiên.
- **Khu du lịch Bọ Cạp Vàng**: Khu trò chơi sông nước nhiều, trẻ nhỏ chơi được cả ngày, vé ~80.000đ đã gồm nhiều trò. Điểm yếu: chỉ có 1 nguồn cho mức vé, giờ mở cửa chưa kiểm được chính xác; cuối tuần đông. Hợp gia đình có trẻ nhỏ; mang đồ thay, đi sớm. (Nguồn tham khảo: Google Maps; mia.vn; ngày kiểm 06/11/2026). Đánh giá người dùng: chưa có đánh giá — bạn là người đầu tiên.
- **Thác Đá Hàn**: Thác đá tự nhiên, vé rẻ theo ngày (50.000–75.000đ), hợp nhóm bạn đi dã ngoại. Điểm yếu: địa chỉ chi tiết chưa thống nhất, đá trơn; dịch vụ ít. Hợp nhóm bạn; mang giày chống trượt, đi mùa khô. (Nguồn tham khảo: Google Maps; mytour.vn; ngày kiểm 06/11/2026). Đánh giá người dùng: chưa có đánh giá — bạn là người đầu tiên.
- **Vườn quốc gia Nam Cát Tiên**: Rừng nguyên sinh lớn, Bàu Sấu và đường mòn bướm nổi tiếng — điểm rừng đáng đi nhất gần Sài Gòn. Điểm yếu: cách Biên Hòa ~140 km, nên ở 2 ngày; muỗi nhiều, vé jeep/Bàu Sấu tính riêng; tọa độ trong file là tọa độ trung tâm vườn (Wikipedia), cổng chính xã Nam Cát Tiên cần kiểm lại. Hợp người yêu rừng; đi mùa khô tháng 11–4, mang thuốc chống muỗi. (Nguồn tham khảo: Google Maps; tripi.vn; buulong.com.vn; ngày kiểm 06/11/2026). Đánh giá người dùng: chưa có đánh giá — bạn là người đầu tiên.
- **Núi Chứa Chan (Gia Lào)**: Núi cao thứ 2 Nam Bộ (837 m), cáp treo lên chùa tiện cho người lớn tuổi, leo bộ 3–4 giờ cho người khỏe. Điểm yếu: vé tham quan mâu thuẫn (15.000đ vs 180.000đ — có thể nhầm cáp treo), giờ cáp treo chưa kiểm được. Hợp leo núi, hành hương; mang nước, đi sáng sớm. (Nguồn tham khảo: Google Maps; 52hz.vn; ngày kiểm 06/11/2026). Đánh giá người dùng: chưa có đánh giá — bạn là người đầu tiên.
- **Công viên Suối Mơ**: Suối tự nhiên và hồ bơi, trẻ nhỏ tắm được, gần Cát Tiên. Điểm yếu: vé mâu thuẫn lớn (60.000–70.000đ vs 100.000–220.000đ) — phải xác nhận tại cổng; xa Biên Hòa (~110 km). Hợp gia đình có trẻ nhỏ; hỏi giá trước khi mua vé. (Nguồn tham khảo: Google Maps; mytour.vn; tripi.vn; ngày kiểm 06/11/2026). Đánh giá người dùng: chưa có đánh giá — bạn là người đầu tiên.
- **Núi Bà Rá – Hồ Thác Mơ (Bình Phước cũ)**: Núi cao thứ 3 Nam Bộ (724 m), leo 1.767 bậc đá qua rừng trúc, đỉnh ngắm hồ Thác Mơ — điểm trekking đáng nhất Bình Phước cũ. Điểm yếu: cách Biên Hòa ~130 km, chỉ hợp ghép cung Cát Tiên – Phước Long 2 ngày; leo mệt, cần sức khỏe. Hợp người thích leo núi; đi tháng 11–4, mang nước. (Nguồn tham khảo: vi.wikipedia.org; wetrek.vn; Google Maps; ngày kiểm 06/11/2026). Đánh giá người dùng: chưa có đánh giá — bạn là người đầu tiên.
- **Hồ Thác Mơ (Bình Phước cũ)**: Hồ thủy điện rộng ~12.000 ha dưới chân Bà Rá, ngắm từ đỉnh núi đẹp, cắm trại ven hồ yên tĩnh. Điểm yếu: dịch vụ quanh hồ ít, phải tự túc nhiều; chưa kiểm được giá thuyền/dịch vụ riêng. Hợp nhóm bạn cắm trại; đi cùng cung Bà Rá, kiểm tra thời tiết. (Nguồn tham khảo: mytour.vn; Google Maps; ngày kiểm 06/11/2026). Đánh giá người dùng: chưa có đánh giá — bạn là người đầu tiên.
- **Vườn quốc gia Bù Gia Mập (Bình Phước cũ)**: Rừng nguyên sinh Bình Phước cũ, thác và suối đẹp, ít khách du lịch nên còn hoang sơ. Điểm yếu: xa (~150 km từ Biên Hòa), đường vào rừng khó, cần liên hệ ban quản lý trước; dịch vụ gần như không có. Hợp người yêu rừng thật sự, đi theo tour/nhóm; không đi một mình. (Nguồn tham khảo: Google Maps; ngày kiểm 06/11/2026). Đánh giá người dùng: chưa có đánh giá — bạn là người đầu tiên.

### 10.2. Món ăn

- **Gỏi cá Tân Mai**: Gỏi cá tươi kiểu Biên Hòa, ăn kèm lẩu cua đồng — món đặc sản địa phương ít nơi có. Điểm yếu: số nhà quán chưa kiểm được chính xác, giá 80.000–150.000đ chỉ là khoảng tham khảo. Hợp ăn trưa/tối theo nhóm; hỏi địa chỉ/giá trước. (Nguồn tham khảo: Google Maps; lofita.vn; topbienhoa.com; ngày kiểm 06/11/2026). Đánh giá người dùng: chưa có đánh giá — bạn là người đầu tiên.
- **Lẩu cá kèo**: Cá kèo tươi, nước lẩu chua thanh, nồi 50.000–165.000đ rẻ — món nhóm hợp túi tiền. Điểm yếu: quán Thanh Mai ở Hiệp Hòa hơi xa trung tâm. Hợp nhóm bạn, ăn tối. (Nguồn tham khảo: Google Maps; lofita.vn; foody.vn; ngày kiểm 06/11/2026). Đánh giá người dùng: chưa có đánh giá — bạn là người đầu tiên.
- **Lẩu tôm 5 Ri**: Lẩu tôm là món riêng của quán 5 Ri, khách địa phương hay nhắc. Điểm yếu: chưa kiểm được khoảng giá riêng — phải hỏi giá trước khi gọi. Hợp nhóm; hỏi giá nồi trước. (Nguồn tham khảo: Google Maps; topbienhoa.com; ngày kiểm 06/11/2026). Đánh giá người dùng: chưa có đánh giá — bạn là người đầu tiên.
- **Lẩu cá (diêu hồng / lẩu Thái)**: Lẩu cá diêu hồng/lẩu Thái chua cay, nồi 60.000–150.000đ. Điểm yếu: trùng quán với món lẩu cá kèo (Hoàng Oanh 2), ít lựa chọn quán riêng. Hợp ăn tối nhóm nhỏ. (Nguồn tham khảo: Google Maps; foody.vn; ngày kiểm 06/11/2026). Đánh giá người dùng: chưa có đánh giá — bạn là người đầu tiên.
- **Chả lụi**: Chả lụi nướng cuốn bánh tráng, ăn vặt kiểu Biên Hòa. Điểm yếu: chưa kiểm được giá riêng; chỉ có 1 quán ghi rõ (Minh Ánh). Hợp ăn xế; hỏi giá trước. (Nguồn tham khảo: Google Maps; topbienhoa.com; ngày kiểm 06/11/2026). Đánh giá người dùng: chưa có đánh giá — bạn là người đầu tiên.
- **Cơm / món nhậu sông (cá lăng, lươn)**: Cá lăng, lươn sông Đồng Nai — món nhậu địa phương. Điểm yếu: giá theo món 59.000–400.000đ rộng, quán nhậu ven QL1A ồn; không hợp gia đình có trẻ nhỏ buổi tối. Hợp nhóm bạn ăn tối. (Nguồn tham khảo: Google Maps; mytour.vn; ngày kiểm 06/11/2026). Đánh giá người dùng: chưa có đánh giá — bạn là người đầu tiên.
- **Bánh canh / hủ tiếu Biên Hòa**: Ăn sáng bình dân ở chợ Biên Hòa, tô 25.000–50.000đ. Điểm yếu: quán không có địa chỉ cố định, chất lượng tùy quầy. Hợp ăn sáng nhanh. (Nguồn tham khảo: Google Maps; topbienhoa.com; ngày kiểm 06/11/2026). Đánh giá người dùng: chưa có đánh giá — bạn là người đầu tiên.
- **Bưởi Tân Triều**: Bưởi đường lá cam nổi tiếng, ăn tại vườn ngon nhất. Điểm yếu: giá theo vườn, theo mùa — không có mức chung; mua ngoài chợ dễ nhầm bưởi khác. Hợp mua về làm quà; mua tại vườn Tân Triều, hỏi giá trước. (Nguồn tham khảo: Google Maps; mia.vn; ngày kiểm 06/11/2026). Đánh giá người dùng: chưa có đánh giá — bạn là người đầu tiên.
- **Ốc / hải sản sông**: Ốc sông và hải sản sông tươi, quán dọc Đặng Đức Thuật nhiều. Điểm yếu: chưa kiểm được giá riêng, hỏi giá trước; quán ốc buổi tối đông và ồn. Hợp ăn tối nhóm bạn. (Nguồn tham khảo: Google Maps; mytour.vn; ngày kiểm 06/11/2026). Đánh giá người dùng: chưa có đánh giá — bạn là người đầu tiên.

### 10.3. Chỗ ở

Tất cả chỗ ở đã có trường đánh giá người dùng (mảng rỗng trong JSON) — chưa có đánh giá, bạn là người đầu tiên.

## 11. Cảnh báo chặt chém + lừa cọc (bổ sung 08/11/2026)

- **Quán ăn, dịch vụ quanh khu du lịch Bửu Long, thác Giang Điền dịp cuối tuần đông khách: giá không niêm yết, phụ thu.** Cách tránh: Hỏi giá trước khi gọi món; ưu tiên quán có menu niêm yết; giữ hóa đơn. (Nguồn: Cảnh báo chung theo kinh nghiệm du lịch và báo chí; chưa tra được vụ việc riêng của tỉnh này trên báo chính thống (ngày kiểm 08/11/2026))
- **Thuê thuyền, bè ở hồ Trị An và khu Bọ Cạp Vàng: giá thuê không thống nhất, phụ thu; có thuyền không đủ áo phao.** Cách tránh: Hỏi rõ giá đã gồm những gì; kiểm tra áo phao trước khi lên thuyền; mặc áo phao suốt chuyến. (Nguồn: Cảnh báo chung theo kinh nghiệm du lịch và báo chí; chưa tra được vụ việc riêng của tỉnh này trên báo chính thống (ngày kiểm 08/11/2026))
- **Lừa cọc homestay/khách sạn đặt qua Facebook, Zalo: mạo danh chủ nhà, giá rẻ, giục cọc 30-50% rồi chặn liên lạc.** Cách tránh: Chỉ đặt qua nền tảng có cơ chế hoàn tiền hoặc gọi số trên website/fanpage chính thức để xác nhận; yêu cầu gọi video trực tiếp tại phòng. (Nguồn: Báo Nhân Dân — Nhiều chiêu trò lừa đảo đặt phòng khách sạn (05/08/2023): mạo danh chủ khách sạn/homestay, giá rẻ trên Facebook/Zalo, yêu cầu cọc 30-50% rồi chặn liên lạc; một vụ ở Quảng Ninh chiếm đoạt khoảng 100 triệu đồng và đã bị khởi tố (ngày kiểm 08/11/2026))
- **Xe ôm, taxi ở bến xe Biên Hòa hét giá cao, chở vòng.** Cách tránh: Dùng taxi có đồng hồ/hãng quen hoặc đặt xe qua ứng dụng; thỏa thuận giá trước khi lên xe. (Nguồn: Cảnh báo chung theo kinh nghiệm du lịch và báo chí; chưa tra được vụ việc riêng của tỉnh này trên báo chính thống (ngày kiểm 08/11/2026))


## 12. An toàn đường đèo + thuê xe máy (bổ sung 08/11/2026)

Tỉnh đồng bằng, không có đèo. Lưu ý: đèo Bảo Lộc thuộc tỉnh Lâm Đồng, không tính cho Đồng Nai. Đường lên núi Chứa Chan và núi Bà Rá dốc, nhiều cua — đi chậm, kiểm tra phanh.

(Nguồn: Tỉnh đồng bằng, không có đèo; đèo Bảo Lộc thuộc Lâm Đồng, không tính (ngày kiểm 08/11/2026))


## 13. Số khẩn cấp + xử lý sự cố (bổ sung 08/11/2026)

- Công an: 113 — Cấp cứu: 115 — Cứu hỏa: 114
- Số riêng của tỉnh: chưa tra được nguồn chính thức — khi cần gọi 113/115/114.

(Nguồn: số chung cả nước 113/115/114 là số khẩn cấp quốc gia; số riêng theo nguồn ghi trong từng mục (ngày kiểm 08/11/2026))


## 14. Giờ đẹp chụp ảnh (bổ sung 08/11/2026)

| # | Điểm | Giờ đẹp | Nguồn |
|---|---|---|---|
| 1 | Hồ Trị An | 5:30-7:00 sáng bình minh trên hồ hoặc 16:30-18:00 hoàng hôn | Khung giờ vàng chung cho chụp ảnh ngoài trời tại Việt Nam; chưa có hướng dẫn riêng cho điểm này (ngày kiểm 08/11/2026) |
| 2 | Khu du lịch Bửu Long | 7:00-9:00 sáng hoặc 16:00-17:30 chiều, ánh sáng đẹp trên hồ đá | Khung giờ vàng chung cho chụp ảnh ngoài trời tại Việt Nam; chưa có hướng dẫn riêng cho điểm này (ngày kiểm 08/11/2026) |
| 3 | Vườn quốc gia Nam Cát Tiên | 6:00-8:00 sáng, chim thú hoạt động, ánh sáng xuyên rừng | Khung giờ vàng chung cho chụp ảnh ngoài trời tại Việt Nam; chưa có hướng dẫn riêng cho điểm này (ngày kiểm 08/11/2026) |


## 15. Cho người chạy giải (bổ sung 08/11/2026)

**Giải chạy (đã kiểm nguồn):**
- Đồng Nai Marathon — Trường Tươi Group, Cúp Báo và Phát thanh, Truyền hình Đồng Nai — Tháng 11 hằng năm (mùa 2026: 28-29/11/2026; mùa đầu 2023) (Nguồn: Báo Đồng Nai — Tích cực tập luyện, hướng đến ngày hội marathon; iRace — Giải chạy Đồng Nai Marathon - Trường Tươi Group (ngày kiểm 08/11/2026))
- Biên Hòa Half Marathon — Rhythm of The Night — Tháng 3 (mùa 2025: 15/3/2025, xuất phát Văn miếu Trấn Biên) (Nguồn: GearVN — Danh sách giải chạy bộ marathon 2025 đầy đủ nhất (ngày kiểm 08/11/2026))

**Điểm chạy bộ đẹp:** Quảng trường phường Bình Phước, TP Đồng Nai (khu vực Đồng Xoài, Bình Phước cũ).

**Chỗ ở gần điểm xuất phát:** chưa tra được khách sạn khu vực Đồng Xoài — giải ở khu vực Bình Phước, cách Biên Hòa ~90 km, nên ở Đồng Xoài (cập nhật 16/11/2026).

(Nguồn: Báo Đồng Nai và iRace về giải Đồng Nai Marathon (ngày kiểm 08/11/2026). Cập nhật 16/11/2026: điểm chạy mùa 2026 là Quảng trường phường Bình Phước (Đồng Xoài); chỗ ở gần điểm xuất phát chưa tra được — khách sạn Biên Hòa cách ~90 km nên đã gỡ khỏi danh sách, không bịa; giải ở khu vực Bình Phước, nên ở Đồng Xoài.)
