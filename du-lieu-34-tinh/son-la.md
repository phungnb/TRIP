# Dữ liệu cẩm nang Sơn La — Giai đoạn 1 (đầy đủ)

- **Trạng thái: published** — đẩy lên theo lệnh anh ngày 06/11/2026 (đẩy hết lên, bỏ vòng duyệt chuyên gia; các nợ dữ liệu vẫn giữ nguyên, xem mục 9).
- Ngày kiểm: 06/11/2026. Cập nhật 06/11/2026: đã điền tọa độ cho mọi điểm từng null (có điểm xấp xỉ — xem ghi chú), thêm 3 điểm gần, thêm nhận xét của M cho mọi địa danh/món và mảng đánh giá người dùng (rỗng). Mọi giá đều là **khoảng giá tham khảo** từ nguồn công khai, không phải giá chốt. Giá đổi theo mùa, cuối tuần, lễ Tết — kiểm lại trước ngày đi.
- Bổ sung 08/11/2026: số điện thoại chỗ ở (cột Điện thoại, mục 2) + mục 2B Trời mưa thì đi đâu + mục 2C Cho cặp đôi + mục 2D Mùa + tháng đẹp nhất. Số điện thoại tra từ nguồn công khai ngày 08/11/2026; chỗ nào ghi 'Chưa tra được' là chưa tìm thấy số khớp tên + địa chỉ.
- Trung tâm tính khoảng cách: Mộc Châu. Mùa đẹp nhất: Tháng 1–2 hoa đào, hoa mận; tháng 5–8 mận chín, thác nhiều nước; tháng 9–11 hoa tam giác mạch, dã quỳ, hồng chín; tháng 12 hoa cải trắng.
- Trung tâm của điểm đến này là Mộc Châu (thị xã từ 01/02/2025), cách Hà Nội ~180 km. Điểm mạnh: đồi chè trái tim, thác Dải Yếm, cầu kính Bạch Long, rừng thông Bản Áng, thác Nàng Tiên và các bản làng. Tỉnh Sơn La giữ nguyên địa giới năm 2025, không sáp nhập.
- **Khách sạn/homestay: CHỈ giới thiệu sơ.** Tất cả đều ghi "chưa kiểm chứng / chưa đối tác / chưa thu phí". Không dùng chữ uy tín/đảm bảo. Không nhận đặt phòng, không nhận tiền.
- Lưu ý địa giới: từ 01/07/2025 cả nước sắp xếp đơn vị hành chính, tên xã/phường/huyện cũ-mới trong các nguồn không thống nhất — file này ghi đường + số nhà là chính, tên hành chính theo nguồn và ghi chú khi mâu thuẫn.
- File JSON máy đọc được: `du-lieu-cam-nang-son-la.json` (cùng thư mục).

## 1. Địa danh — 13 điểm chính

Mốc tính khoảng cách: Mộc Châu. Khoảng cách là đường đi theo nguồn, không phải đường chim bay.

### 1.1. Cụm trung tâm

| # | Tên | Địa chỉ | Tọa độ | Cách trung tâm | Giá vé | Giờ mở cửa | Thời gian | Hợp với ai | Lưu ý | Nguồn |
|---|---|---|---|---|---|---|---|---|---|---|
| 1 | Đồi chè trái tim | Tiểu khu Mía Đường, thị trấn Nông trường Mộc Châu | 20.89052, 104.6862 | ~10 km | 20.000–30.000đ/người (nhiều đồi chè khác miễn phí) | Ban ngày (đẹp nhất 7:00–10:00 và 15:00–17:00) | 1–1,5 giờ | Cặp đôi, gia đình, giới trẻ check-in | Đồi chè đang canh tác — không giẫm luống chè; thuê trang phục dân tộc ~20.000–30.000đ/bộ (theo 1 nguồn) | sinhtour.vn, phanvantravel.com, skypetips.com |
### 1.2. Cụm phía Tây (Mường Sang)

| # | Tên | Địa chỉ | Tọa độ | Cách trung tâm | Giá vé | Giờ mở cửa | Thời gian | Hợp với ai | Lưu ý | Nguồn |
|---|---|---|---|---|---|---|---|---|---|---|
| 2 | Thác Dải Yếm | Xã Mường Sang, Mộc Châu (QL43) | 20.81849, 104.59244 | ~7 km | Chưa kiểm được mức hiện hành — các nguồn ghi 20.000đ / 80.000đ / 150.000đ (gồm khu thác). Khoảng: 80.000–150.000đ/người lớn. Cầu kính Tình Yêu tính riêng ~100.000đ | Chưa kiểm được giờ chính thức | 1,5–2,5 giờ; đẹp nhất mùa mưa tháng 5–8 (nước lớn) | Cặp đôi, gia đình, nhóm bạn | Mùa khô nước cạn nhưng lộ phiến đá rêu — hợp chụp ảnh; đường xuống thác trơn khi mưa | sinhtour.vn, phanvantravel.com, skypetips.com |
| 3 | Cầu kính Bạch Long (Mộc Châu Island) | Xã Mường Sang, Mộc Châu | 20.84914, 104.57142 | ~7 km | Vé cầu kính ~550.000đ/người lớn (ngày thường), trẻ em 1–1,4 m ~350.000đ; vé tham quan khu (chưa gồm cầu kính) ~100.000đ. Khoảng: 550.000–650.000đ/người lớn | Chưa kiểm được giờ chính thức | 2–3 giờ | Người thích trải nghiệm mạo hiểm, ngắm cảnh | Cầu kính dài, cao — không hợp người sợ độ cao; vé cuối tuần/lễ có thể cao hơn ngày thường | phanvantravel.com, skypetips.com |
### 1.3. Cụm phía Đông (Đông Sang)

| # | Tên | Địa chỉ | Tọa độ | Cách trung tâm | Giá vé | Giờ mở cửa | Thời gian | Hợp với ai | Lưu ý | Nguồn |
|---|---|---|---|---|---|---|---|---|---|---|
| 4 | Rừng thông Bản Áng (Phoenix) | Xã Đông Sang, Mộc Châu | 20.82724, 104.63031 | ~5 km | 80.000–98.000đ/người (trẻ dưới 1 m miễn phí theo 1 nguồn) | Chưa kiểm được giờ chính thức | 1,5–2,5 giờ | Cặp đôi, gia đình, nhóm bạn | Có hồ, khu cắm trại; hợp picnic nửa ngày | phanvantravel.com, skypetips.com |
### 1.4. Cụm Vân Hồ

| # | Tên | Địa chỉ | Tọa độ | Cách trung tâm | Giá vé | Giờ mở cửa | Thời gian | Hợp với ai | Lưu ý | Nguồn |
|---|---|---|---|---|---|---|---|---|---|---|
| 5 | Thác Nàng Tiên | Xã Chiềng Khoa, Vân Hồ | 20.84208, 104.82576 | ~25 km | 30.000đ/người | Chưa kiểm được giờ chính thức | 1,5–2,5 giờ | Nhóm bạn, người thích thác hoang sơ | Đường vào Vân Hồ có đoạn khó đi; hỏi người dân địa phương trước khi vào | phanvantravel.com |
| 6 | Hang Táu (làng nguyên thủy) | Mộc Châu (khu vực Tà Số — chưa kiểm được địa chỉ chính xác) | 20.885, 104.665 (xấp xỉ, cần kiểm lại) | ~20 km | Chưa kiểm được mức vé hiện hành (thường thuê xe ôm vào bản) | Ban ngày | Nửa ngày | Nhóm bạn, người thích trải nghiệm bản làng hoang sơ | Bản không điện, không sóng điện thoại; đường vào xấu, phải đi xe ôm/xe địa hình; mang đủ nước, sạc dự phòng | phanvantravel.com |
| 7 | Thung lũng mận Nà Ka | Thị trấn Nông trường Mộc Châu | 20.89682, 104.65334 | ~10 km | Vườn mận tư nhân 30.000–50.000đ/người (tiền hái/mua quả tính riêng) | Ban ngày; đẹp nhất tháng 1–2 hoa mận, tháng 5–6 mận chín | 1–2 giờ | Cặp đôi, gia đình, người thích chụp ảnh | Hoa/quả theo mùa — ngoài mùa chỉ còn đồi cây; hỏi chủ vườn trước | phanvantravel.com, cattour.vn |
| 8 | Happy Land Mộc Châu | Bản Lùn, xã Mường Sang, Mộc Châu (chưa kiểm được số nhà) | 20.8366, 104.58436 | ~7 km | ~100.000đ/người (combo cổng + 5 trò — theo 1 nguồn 2026; chưa kiểm được chắc chắn) | Chưa kiểm được giờ chính thức | 2–3 giờ | Gia đình có trẻ nhỏ, nhóm bạn | Khu vui chơi + hoa theo mùa; kiểm tra giá combo tại quầy | phanvantravel.com, cattour.vn |
| 9 | Ngũ Động Bản Ôn | Xã Đông Sang, Mộc Châu (chưa kiểm được địa chỉ chính xác) | 20.84, 104.645 (xấp xỉ, cần kiểm lại) | ~10 km | Chưa kiểm được mức riêng (nhiều nguồn gộp trong khoảng vé tham quan 30.000–100.000đ) | Ban ngày | 1,5–2,5 giờ | Nhóm bạn, người thích hang động | Hệ thống 5 hang động; đường vào có đoạn dốc, mang đèn pin/giày bám tốt | nguoiquansat.vn |
| 10 | Đỉnh Pha Luông (trekking) | Xã Tân Xuân, Vân Hồ (biên giới Việt – Lào) | 20.7833, 104.1833 (xấp xỉ, cần kiểm lại) | ~30 km | Chưa kiểm được mức vé/chi phí porter — cần xin phép đồn biên phòng, đi theo nhóm có hướng dẫn | Theo lịch tour (thường 2 ngày 1 đêm) | 2 ngày | Người đã có kinh nghiệm trekking | Đỉnh cao ~2.000 m, view biên giới; BẮT BUỘC xin phép biên phòng trước, không tự leo; mang giấy tờ tùy thân | phanvantravel.com |

### Điểm mới thêm 06/11/2026 (mở rộng theo quyết định 07:05 — chỉ điểm gần, cùng cụm di chuyển được)

| Tên | Địa chỉ | Tọa độ | Cách trung tâm | Giá vé | Giờ mở cửa | Thời gian | Hợp với ai | Lưu ý | Nguồn |
|---|---|---|---|---|---|---|---|---|---|
| Hang Dơi (Động Sơn Mộc Hương) | Quốc lộ 6, phường Mộc Sơn, Mộc Châu (ngay sát trung tâm thị trấn) | 20.849, 104.63 (xấp xỉ, cần kiểm lại) | ~1 km | Khoảng 10.000–15.000đ/người (các nguồn ghi 10.000đ, có nguồn ghi 15.000đ — chưa thống nhất) | Khoảng 6:00–17:00 (theo nguồn cũ, chưa kiểm được chính xác) | 1–1,5 giờ (leo 240 bậc thang) | Gia đình, người thích hang động | Di tích quốc gia, mệnh danh 'Tây Thiên đệ nhất động', diện tích gần 7.000 m², 3 khoang lớn với thạch nhũ đẹp. Tọa độ xấp xỉ, cần kiểm lại. Leo 240 bậc, đường dốc và trơn khi mưa — mang giày chắc, người yếu tim/khó đi lại cân nhắc. | yootek.vn, sinhtour.vn, tripi.vn, travel.com.vn |
| Thác Tạt Nàng | Xã Chiềng Yên, Vân Hồ (cách Mộc Châu ~35 km) | 20.79, 104.52 (xấp xỉ, cần kiểm lại) | ~35 km | Chưa kiểm được mức vé hiện hành | Chưa kiểm được giờ chính thức — tham quan ban ngày | 1,5–2 giờ | Nhóm bạn, người thích thác hoang sơ | Thác ở Vân Hồ, cùng cụm với thác Nàng Tiên và đỉnh Pha Luông — hợp ghép trong ngày đi Vân Hồ. Tọa độ xấp xỉ, cần kiểm lại. Đường vào có đoạn khó, mùa mưa trơn; hỏi người dân trước khi vào. | dulichviet.com.vn, mia.vn |
| Bản Pá Phách (bản hoa cải) | Xã Đông Sang, Vân Hồ (cách Mộc Châu ~25 km) | 20.8, 104.58 (xấp xỉ, cần kiểm lại) | ~25 km | Miễn phí vào bản (dịch vụ homestay/ăn uống tính riêng) | Cả ngày; đẹp nhất tháng 11–12 mùa hoa cải trắng | Nửa ngày | Người thích chụp ảnh, gia đình | Bản người Mông nổi tiếng với đồi hoa cải trắng nở tháng 11–12, cùng cụm Vân Hồ với thác Nàng Tiên. Tọa độ xấp xỉ, cần kiểm lại. Ngoài mùa hoa thì bản yên bình nhưng ít điểm chơi; đi xe tốt vì đường đồi. | dulichviet.com.vn, mia.vn |

## 2. Ở đâu — 8 chỗ ở (CHỈ GIỚI THIỆU SƠ)

**Tất cả các mục dưới đây: "Thông tin tham khảo, chưa kiểm chứng trực tiếp, chưa phải đối tác, chưa thu phí. Người dùng tự kiểm tra giá / phòng trống trước khi đặt." Không dùng chữ uy tín/đảm bảo. Không nhận đặt phòng, không nhận tiền.**
Giá tăng cuối tuần, lễ Tết. Tên phường/xã cũ-mới không thống nhất sau sáp nhập 2025 — giữ nguyên địa chỉ đường + số nhà theo nguồn.

| # | Tên | Địa chỉ | Khu vực | Hạng | Khoảng giá/đêm ngày thường | Điện thoại | Cách trung tâm | Hợp với ai | Trạng thái | Nguồn |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| 1 | Mường Thanh Luxury Mộc Châu (Mường Thanh Holiday Mộc Châu) | Đường Hoàng Quốc Việt, thị trấn Nông trường Mộc Châu | trung-tam | 4 sao (có nguồn ghi 5 sao — mâu thuẫn, chưa chốt) | ~1.180.000–5.000.000đ/đêm (Traveloka ghi từ 1.277.778đ/đêm) | 0212 2258 886 | Trung tâm thị trấn Nông trường | Gia đình, khách đoàn, khách muốn tiện nghi cao | Chưa kiểm chứng / chưa đối tác / chưa thu phí | ongvove.com, traveloka.com, melodious.edu.vn |
| 2 | Thảo Nguyên Resort Mộc Châu (tên cũ: Thảo Nguyên Hotel Mộc Châu) | Phiêng Luông, Mộc Châu (tiểu khu 32, thị trấn Nông trường) | trung-tam | 4 sao | ~800.000–1.800.000đ/đêm (có nguồn ghi từ 615.000đ/đêm; villa tới 6.000.000đ/đêm) | 0212 3869 666 | Khu Phiêng Luông | Gia đình/nhóm bạn nghỉ dưỡng, khách đoàn | Chưa kiểm chứng / chưa đối tác / chưa thu phí | ongvove.com, vietgoing.com, melodious.edu.vn |
| 3 | Phoenix Mộc Châu Resort | Rừng thông Bản Áng, xã Đông Sang, Mộc Châu | ban-ang | Chưa kiểm được hạng sao chính thức | ~800.000–1.500.000đ/đêm | 0212 2488 666 | Khu Bản Áng | Cặp đôi, gia đình nghỉ dưỡng ven rừng thông | Chưa kiểm chứng / chưa đối tác / chưa thu phí | vietgoing.com, ongvove.com |
| 4 | Mộc Sa Mộc Châu Hotel | Thị trấn Mộc Châu (chưa kiểm được số nhà cụ thể) | trung-tam | Chưa kiểm được hạng sao chính thức | Từ ~700.000đ/đêm (chưa kiểm được khoảng trên) | Chưa tra được | Trung tâm thị trấn | Cặp đôi, gia đình | Chưa kiểm chứng / chưa đối tác / chưa thu phí | vietgoing.com |
| 5 | Mộc Châu Eco Garden | Thảo Nguyên, Mộc Châu | trung-tam | 4 sao (theo Hoteles.com) | Từ ~750.000đ/đêm (chưa kiểm được khoảng trên) | 0965 885 995 | Khu Thảo Nguyên | Gia đình, nhóm bạn | Chưa kiểm chứng / chưa đối tác / chưa thu phí | hoteles.com, vietgoing.com |
| 6 | Bơ House (homestay) | Xóm 2, tiểu khu Cơ quan, thị trấn Nông trường Mộc Châu | trung-tam | Homestay | ~80.000đ/người/đêm | 0971 660 008 | Trung tâm thị trấn Nông trường | Khách bụi, nhóm bạn | Chưa kiểm chứng / chưa đối tác / chưa thu phí | adamviettravel.vn |
| 7 | Mộc Châu Island – Mountain Park and Resort | Xã Mường Sang, Mộc Châu (khu cầu kính Bạch Long) | phia-tay | Resort | Chưa kiểm được khoảng giá hiện hành | 1900 2829 | Khu Mường Sang | Gia đình, khách muốn ở gần cầu kính | Chưa kiểm chứng / chưa đối tác / chưa thu phí | hoteles.com |

## 2B. Trời mưa thì đi đâu (bổ sung 08/11/2026)

Các điểm dưới đây đều đã có trong mục 1, chỉ chọn những điểm có mái che/không gian trong nhà, đi mưa được:

- Hang Dơi (Động Sơn Mộc Hương)
- Ngũ Động Bản Ôn

Dặn: Mưa thì vào hang Dơi và Ngũ Động Bản Ôn — tránh đồi chè, thác và Pha Luông vì đường đất trơn. (Sơn La ít điểm trong nhà, chỉ 2 điểm chắc chắn.)

## 2C. Cho cặp đôi (bổ sung 08/11/2026)

Chỗ ở hợp cặp đôi (theo mục 'Hợp với ai' trong file):

- Phoenix Mộc Châu Resort
- Mộc Sa Mộc Châu Hotel

Điểm hợp cặp đôi (từ mục 1):

- Đồi chè trái tim
- Rừng thông Bản Áng (Phoenix)
- Thác Dải Yếm
- Thung lũng mận Nà Ka

## 2D. Mùa + tháng đẹp nhất (bổ sung 08/11/2026)

- Tháng đẹp nhất: Tháng 1–2 hoa đào, hoa mận; tháng 5–8 mận chín, thác nhiều nước; tháng 9–11 hoa tam giác mạch, dã quỳ, hồng chín; tháng 12 hoa cải trắng
- Nguồn: meta.best_season trong file (nghiên cứu ngày 06/11/2026; nguồn tổng xem meta.nguon_tong)
- Ngày kiểm: 06/11/2026

## 3. Ăn gì — 9 món (đủ quán + địa chỉ + khoảng giá)

| # | Món | Buổi ăn | Khoảng giá | Quán tham khảo (địa chỉ) | Nguồn |
|---|---|---|---|---|---|
| 1 | Bê chao | Ăn trưa / ăn tối | 100.000–150.000đ/đĩa | (1) Quán 70 Nam Hưng — Tiểu khu Chiềng Đi, thị trấn Nông trường Mộc Châu; 100.000–150.000đ/người; (2) Quán Xuân Bắc 181 — Tiểu khu Chiềng Đi, thị trấn Nông trường Mộc Châu; ~100.000đ/người | dulich9.com, vanantravel.vn, mytour.vn |
| 2 | Cá suối | Ăn trưa / ăn tối | 80.000–120.000đ/đĩa | (1) Quán 70 Nam Hưng — Tiểu khu Chiềng Đi, thị trấn Nông trường Mộc Châu; 80.000–120.000đ/đĩa; (2) Nhà hàng Thường Hiền — Số 45 đường Thị trấn Mộc Châu (1 nguồn ghi tỉnh Điện Biên — lỗi nguồn, cần kiểm lại); 80.000–110.000đ/con | vanantravel.vn, buulong.com.vn |
| 3 | Cá hồi | Ăn trưa / ăn tối (món nhóm) | 250.000đ/người (set 6 món); mua mang về ~350.000đ/kg | (1) Nhà hàng Cá hồi 64 — Km179, Quốc lộ 6 (giáp Vân Hồ – Mộc Châu); 100.000–250.000đ/người; (2) Quán Xuân Bắc 181 — Tiểu khu Chiềng Đi, thị trấn Nông trường Mộc Châu; 100.000–250.000đ/người | dulich9.com, sharehomevn.com |
| 4 | Thịt trâu / lẩu trâu | Ăn trưa / ăn tối (món nhóm) | ~100.000đ/người; lẩu trâu 2 người 150.000–200.000đ | (1) Nhà hàng 75 Mộc Châu — Thị trấn Mộc Châu (chưa kiểm được số nhà cụ thể); ~100.000đ/người; (2) Nhà hàng Thường Hiền — Số 45 đường Thị trấn Mộc Châu; Lẩu trâu 150.000–200.000đ/2 người | dulich9.com, buulong.com.vn |
| 5 | Rau cải mèo | Ăn trưa / ăn tối | Chưa kiểm được giá riêng theo đĩa | (1) Nhà hàng Đông Hải — 316 Trần Huy Liệu, thị trấn Mộc Châu; 80.000–250.000đ/người (cả bữa); (2) Quán 70 Nam Hưng — Tiểu khu Chiềng Đi, thị trấn Nông trường Mộc Châu; Chưa kiểm được giá riêng | mytour.vn, dulichmocchau.net |
| 6 | Gà đồi nướng | Ăn trưa / ăn tối (món nhóm) | Chưa kiểm được mức riêng | (1) Nhà hàng Thường Hiền — Số 45 đường Thị trấn Mộc Châu; Chưa kiểm được giá riêng | buulong.com.vn |
| 7 | Nậm pịa | Ăn trưa / ăn tối | Chưa kiểm được mức riêng | (1) Nhà hàng 75 Mộc Châu — Thị trấn Mộc Châu (chưa kiểm được số nhà cụ thể); Chưa kiểm được giá riêng | sharehomevn.com |
| 8 | Cơm lam | Ăn trưa / ăn tối | Chưa kiểm được giá riêng | (1) Nhà hàng Đông Hải — 316 Trần Huy Liệu, thị trấn Mộc Châu; 80.000–250.000đ/người (cả bữa) | dulichmocchau.net |
| 9 | Sữa chua nếp cẩm | Ăn vặt / tráng miệng | Chưa kiểm được giá riêng | (1) Quán 70 Nam Hưng — Tiểu khu Chiềng Đi, thị trấn Nông trường Mộc Châu; Chưa kiểm được giá riêng; (2) Quán Xuân Bắc 181 — Tiểu khu Chiềng Đi, thị trấn Nông trường Mộc Châu; Chưa kiểm được giá riêng | mytour.vn |

## 4. Đi đến bằng gì

Mộc Châu không có sân bay. Sân bay gần nhất: Nội Bài (HAN), cách Mộc Châu ~180 km (đi xe khách 4–5 giờ). Không có ga tàu tới Mộc Châu.

### 4.1. Từ TP.HCM

| Phương tiện | Thời gian | Khoảng giá | Hãng / ghi chú | Nguồn |
|---|---|---|---|---|
| Máy bay SGN–HAN + xe khách Hà Nội–Mộc Châu | Bay ~2h05 + xe 4–5 giờ (~180 km) | Bay SGN–HAN khoảng 1.000.000–2.500.000đ/chiều (chưa kiểm được mức hiện hành); xe HN–Mộc Châu ~250.000–300.000đ/chiều | Phương án thực tế nhất. Mộc Châu không có sân bay; sân bay gần nhất là Nội Bài | nguoiquansat.vn |

### 4.2. Từ Hà Nội

| Phương tiện | Thời gian | Khoảng giá | Ghi chú | Nguồn |
|---|---|---|---|---|
| Xe khách Hà Nội–Mộc Châu | 4–5 giờ, ~180 km (QL6) | ~250.000–300.000đ/chiều (khứ hồi 500.000–600.000đ/người theo 1 nguồn) | Xe chạy từ Bến xe Mỹ Đình; chưa kiểm được tên hãng cụ thể và giờ chạy chi tiết — hỏi bến xe trước ngày đi | nguoiquansat.vn |
| Limousine Hà Nội–Mộc Châu | 4–5 giờ | Chưa kiểm được mức riêng (mặt bằng chung tuyến HN–Tây Bắc 300.000–400.000đ/chiều — chưa kiểm) | Chưa kiểm được tên hãng cụ thể | Chưa kiểm được nguồn riêng tuyến này |
| Xe máy / ô tô riêng Hà Nội–Mộc Châu (QL6) | Ô tô 4–5 giờ; xe máy 5–6 giờ | Chưa kiểm được giá thuê theo tuyến | QL6 qua Hòa Bình, đèo Thung Khe; tránh chạy đèo ban đêm/ngày mưa | cattour.vn |

## 5. Đi lại trong Sơn La

| Phương tiện | Khoảng giá | Giấy tờ / điều kiện | Ghi chú | Nguồn |
|---|---|---|---|---|
| Thuê xe máy — xe số | 100.000–120.000đ/ngày | CCCD + bằng lái A1 | Xe số leo dốc tốt, tiết kiệm xăng; nhiều cửa hàng tặng 1 lít xăng, áo mưa, mũ bảo hiểm | buulong.com.vn, motortrip.vn, xemayanthanhphat.com |
| Thuê xe máy — tay ga | 120.000–200.000đ/ngày | CCCD + bằng lái A1 | Tay ga hợp đi trong thị trấn; leo đèo yếu hơn xe số | buulong.com.vn, xemayanthanhphat.com |
| Taxi nội vùng Mộc Châu | Chưa kiểm được mức riêng tại Mộc Châu |  | Quãng giữa các điểm 5–25 km; thỏa thuận giá trọn gói theo ngày nếu đi nhiều điểm | Chưa kiểm được nguồn riêng Mộc Châu |
| Thuê ô tô có tài xế theo ngày | Chưa kiểm được mức riêng tại Mộc Châu |  | Nên thuê khi đi thác Nàng Tiên, Hang Táu, Pha Luông (đường khó) | Chưa kiểm được nguồn riêng Mộc Châu |
| Xe ôm vào bản/điểm khó | Chưa kiểm được mức riêng (thường tính theo chuyến, hỏi giá trước) |  | Bắt buộc với Hang Táu; nên thỏa thuận giá khứ hồi | phanvantravel.com |

## 6. Lịch trình mẫu

### 6.1. Lịch trình 3N2Đ (chính)

| Ngày | Buổi | Hoạt động | Điểm / quán gắn kèm |
|---|---|---|---|
| Ngày 1 | Sáng | Tới Mộc Châu, nhận phòng; đồi chè trái tim (1–1,5 giờ) | doi-che-trai-tim |
| Ngày 1 | Chiều | Rừng thông Bản Áng (1,5–2,5 giờ); thung lũng mận Nà Ka (theo mùa) | rung-thong-ban-ang, thung-lung-man-na-ka |
| Ngày 1 | Tối | Ăn tối: bê chao, cá suối tại quán 70 / Xuân Bắc 181 | — |
| Ngày 2 | Sáng | Thác Dải Yếm (1,5–2,5 giờ) + cầu kính Bạch Long (2–3 giờ) | thac-dai-yem, cau-kinh-bach-long |
| Ngày 2 | Chiều | Happy Land (2–3 giờ) hoặc Ngũ Động Bản Ôn | happy-land, ngu-dong-ban-on |
| Ngày 2 | Tối | Ăn tối: cá hồi 64 / lẩu trâu | — |
| Ngày 3 | Sáng | Thác Nàng Tiên (1,5–2,5 giờ, Vân Hồ) | thac-nang-tien |
| Ngày 3 | Chiều | Mua đặc sản (sữa chua, mận theo mùa); trả phòng, về Hà Nội | — |

### 6.2. Lịch trình 2N1Đ (bản gấp)

| Ngày | Buổi | Hoạt động |
|---|---|---|
| Ngày 1 | Sáng | Đồi chè trái tim + rừng thông Bản Áng |
| Ngày 1 | Chiều | Thác Dải Yếm + cầu kính Bạch Long |
| Ngày 1 | Tối | Ăn tối: bê chao, cá suối |
| Ngày 2 | Sáng | Thung lũng mận Nà Ka (theo mùa) hoặc thác Nàng Tiên |
| Ngày 2 | Chiều | Về, trả phòng |

### 6.3. Lịch trình 4N3Đ (bản chậm)

| Ngày | Buổi | Hoạt động |
|---|---|---|
| Ngày 1 | Cả ngày | Như ngày 1 lịch trình 3N2Đ (đồi chè + Bản Áng + Nà Ka) |
| Ngày 2 | Cả ngày | Như ngày 2 lịch trình 3N2Đ (Dải Yếm + Bạch Long + Happy Land) |
| Ngày 3 | Cả ngày | Thác Nàng Tiên buổi sáng; chiều Hang Táu (nửa ngày) |
| Ngày 4 | Sáng | Ngũ Động Bản Ôn; chiều mua đặc sản, về |

## 7. Bảng chi phí ước tính (1 người, 3N2Đ từ TP.HCM)

| Hạng mục | Ước tính 3N2Đ / người |
|---|---|
| Máy bay SGN–HAN khứ hồi | 2.000.000–5.000.000đ (chưa kiểm được mức hiện hành) |
| Xe HN–Mộc Châu khứ hồi | 500.000–600.000đ |
| Ở 2 đêm (chia đôi phòng) | 600.000–1.800.000đ |
| Ăn 3 ngày | 450.000–900.000đ |
| Vé tham quan (cầu kính Bạch Long là khoản lớn nhất) | 150.000–700.000đ |
| Thuê xe máy 2–3 ngày | 200.000–450.000đ |
| Phát sinh | 100.000–300.000đ |
| Tổng ước tính | 4.000.000–9.750.000đ/người |
| Nếu đi từ Hà Nội (không bay SGN–HAN) | Tổng còn ~2.000.000–4.750.000đ/người (1 nguồn ước tính ~2.500.000–3.500.000đ/người) |

Quy tắc hiển thị giá trong app: luôn ghi khoảng giá + ngày kiểm (06/11/2026), không ghi một giá cố định.

## 8. Checklist mang theo

- Áo khoác (Mộc Châu se lạnh buổi sáng/tối, nhất là tháng 12–2)
- Áo mưa mỏng, giày đi bộ (đường thác, hang trơn)
- CCCD + bằng lái A1 (nếu thuê xe máy)
- Tiền mặt lẻ (vườn mận, bản làng, quán nhỏ)
- Sạc dự phòng, thuốc cơ bản
- Kem chống nắng
- Hỏi giá vé cầu kính Bạch Long + thác Dải Yếm tại quầy (nhiều mức mâu thuẫn)

## Nhận xét của M và đánh giá người dùng (thêm 06/11/2026)

Nhận xét dưới đây là chính kiến của M sau khi đọc review trên Google Maps / TripAdvisor / các blog du lịch uy tín đã dẫn nguồn — không copy nguyên văn review, không bịa số sao; chỗ nào các nguồn mâu thuẫn nhau thì ghi rõ mâu thuẫn. Đánh giá người dùng trong app hiện chưa có — bạn là người đầu tiên.

### Địa danh
- **Đồi chè trái tim**: Đồi chè hình trái tim chụp ảnh rất ăn hình, nhất là sáng sớm có sương — điểm check-in nổi nhất Mộc Châu. Điểm trừ là đông khách cuối tuần, nhiều đồi chè khác miễn phí mà cũng đẹp không kém. Hợp cặp đôi và người thích chụp ảnh; nên đi sớm tránh đông. (Nguồn tham khảo: Google Maps; nguồn trong file; ngày kiểm: 06/11/2026). Đánh giá người dùng: chưa có đánh giá — bạn là người đầu tiên.
- **Thác Dải Yếm**: Thác đẹp, mùa mưa nước trắng xóa rất ấn tượng, gần trung tâm Mộc Châu. Điểm trừ là giá vé các nguồn ghi mâu thuẫn (20.000đ vs 80.000đ) và mùa khô ít nước. Nên đi tháng 5–9, tránh mùa khô. (Nguồn tham khảo: Google Maps; nguồn trong file; ngày kiểm: 06/11/2026). Đánh giá người dùng: chưa có đánh giá — bạn là người đầu tiên.
- **Cầu kính Bạch Long (Mộc Châu Island)**: Cầu kính dài nhất thế giới từng được ghi nhận, view thung lũng rất đẹp — trải nghiệm đáng tiền nếu trời quang. Điểm trừ là vé ~550.000đ/người khá đắt, cuối tuần đông và xếp hàng lâu. Hợp người thích mạo hiểm nhẹ và có ngân sách; người sợ độ cao nên bỏ qua. (Nguồn tham khảo: Google Maps; nguồn trong file; ngày kiểm: 06/11/2026). Đánh giá người dùng: chưa có đánh giá — bạn là người đầu tiên.
- **Rừng thông Bản Áng (Phoenix)**: Rừng thông và hồ Bản Áng yên bình, hợp dã ngoại, đạp xe và nghỉ dưỡng — khu Phoenix làm dịch vụ khá tốt. Điểm trừ là vé 80.000–98.000đ/người không rẻ và cuối tuần đông. Hợp gia đình có trẻ nhỏ; nên đi buổi sáng mát. (Nguồn tham khảo: Google Maps; nguồn trong file; ngày kiểm: 06/11/2026). Đánh giá người dùng: chưa có đánh giá — bạn là người đầu tiên.
- **Thác Nàng Tiên**: Thác 3 tầng nước xanh ngọc, đẹp nhất trong các thác quanh Mộc Châu — nhiều du khách khen là thác đẹp nhất vùng. Điểm trừ là cách trung tâm ~25 km, đường vào có đoạn khó. Hợp người thích thác và chụp ảnh; nên đi mùa mưa. (Nguồn tham khảo: Google Maps; nguồn trong file; ngày kiểm: 06/11/2026). Đánh giá người dùng: chưa có đánh giá — bạn là người đầu tiên.
- **Hang Táu (làng nguyên thủy)**: Làng Mông nguyên thủy, không điện không sóng — yên bình và khác biệt hoàn toàn với Mộc Châu ồn ào. Điểm trừ là đường vào 3–4 km đường đất đá gập ghềnh, ô tô không vào được, phải thuê xe ôm hoặc đi bộ. Chỉ hợp người thích trải nghiệm thật và đi xe tốt; người say xe hoặc đi ô tô nên cân nhắc. (Nguồn tham khảo: antamtour.vn, aivivu.com, kamesteps.com; Google Maps; ngày kiểm: 06/11/2026). Đánh giá người dùng: chưa có đánh giá — bạn là người đầu tiên.
- **Thung lũng mận Nà Ka**: Thung lũng mận đẹp nhất mùa hoa tháng 1–2 và mùa mận chín tháng 5–6 — chụp ảnh và hái mận đều vui. Điểm trừ là ngoài 2 mùa đó thì chỉ là vườn mận thường, vé vườn 30.000–50.000đ/người. Chỉ nên đi đúng mùa hoa hoặc mùa quả. (Nguồn tham khảo: Google Maps; nguồn trong file; ngày kiểm: 06/11/2026). Đánh giá người dùng: chưa có đánh giá — bạn là người đầu tiên.
- **Happy Land Mộc Châu**: Khu vui chơi – hoa rộng, nhiều góc check-in, hợp gia đình có trẻ nhỏ. Điểm trừ là vé combo ~100.000đ/người (theo 1 nguồn 2026, chưa kiểm chắc) và nhiều trò mang tính dựng cảnh. Hợp gia đình; người thích thiên nhiên hoang sơ có thể thấy không cần thiết. (Nguồn tham khảo: Google Maps; nguồn trong file; ngày kiểm: 06/11/2026). Đánh giá người dùng: chưa có đánh giá — bạn là người đầu tiên.
- **Ngũ Động Bản Ôn**: Hệ thống 5 hang động liên hoàn, thạch nhũ đẹp, ít khách — hợp người thích khám phá hang. Điểm trừ là địa chỉ chính xác và giá vé chưa kiểm được, đường vào khó tìm. Nên đi cùng người địa phương hoặc hỏi kỹ trước. (Nguồn tham khảo: Google Maps; nguồn trong file; ngày kiểm: 06/11/2026). Đánh giá người dùng: chưa có đánh giá — bạn là người đầu tiên.
- **Đỉnh Pha Luông (trekking)**: Đỉnh biên giới nổi tiếng của dân trekking, view mây và núi đá vôi rất đẹp. Điểm trừ là cung khó, phải xin phép đồn biên phòng, chi phí porter chưa có giá công khai. Chỉ hợp người đã trekking và khỏe; người mới không nên tự đi. (Nguồn tham khảo: Google Maps; nguồn trong file; ngày kiểm: 06/11/2026). Đánh giá người dùng: chưa có đánh giá — bạn là người đầu tiên.
- **Hang Dơi (Động Sơn Mộc Hương)**: Hang đẹp và rẻ, ngay trung tâm Mộc Châu nên rất đáng ghép vào buổi sáng hoặc chiều — nhiều du khách khen thạch nhũ và không gian mát. Điểm yếu là phải leo 240 bậc khá dốc, trong hang tối và ẩm. Hợp gia đình khỏe; người sợ tối hoặc khó leo nên cân nhắc. (Nguồn tham khảo: Google Maps (4/5); yootek.vn, tripi.vn, sinhtour.vn; ngày kiểm: 06/11/2026). Đánh giá người dùng: chưa có đánh giá — bạn là người đầu tiên.
- **Thác Tạt Nàng**: Thác hoang sơ, ít người, nước đẹp vào mùa mưa — hợp người thích khám phá hơn là check-in đông đúc. Điểm yếu là thông tin ít, giá vé và đường đi chưa kiểm được chắc. Chỉ hợp đi cùng người địa phương hoặc nhóm đã quen đường rừng. (Nguồn tham khảo: Google Maps; dulichviet.com.vn; ngày kiểm: 06/11/2026). Đánh giá người dùng: chưa có đánh giá — bạn là người đầu tiên.
- **Bản Pá Phách (bản hoa cải)**: Mùa hoa cải trắng tháng 11–12 thì Pá Phách rất đẹp và đáng đi, ảnh lên hình tốt hơn nhiều điểm khác ở Mộc Châu. Điểm yếu là ngoài mùa hoa thì không có gì nổi bật, dễ thất vọng nếu đi sai mùa. Chỉ nên đi đúng mùa hoa, ghép cùng thác Nàng Tiên trong ngày. (Nguồn tham khảo: Google Maps; dulichviet.com.vn; ngày kiểm: 06/11/2026). Đánh giá người dùng: chưa có đánh giá — bạn là người đầu tiên.

### Món ăn
- **Bê chao**: Bê non chao giòn ngoài mềm trong, chấm tương gừng — món signature của Mộc Châu, ai đến cũng nên thử. Điểm trừ là giá theo đĩa khá cao (150.000–200.000đ theo nguồn). Hợp bữa trưa/tối theo nhóm. (Nguồn tham khảo: Google Maps; suntravelgroup.vn; ngày kiểm: 06/11/2026). Đánh giá người dùng: chưa có đánh giá — bạn là người đầu tiên.
- **Cá suối**: Cá suối chiên giòn, ăn cả xương, thơm mùi lá — món dân dã được khen. Điểm trừ là giá tùy quán, không niêm yết. Hợp ăn trưa. (Nguồn tham khảo: Google Maps; nguồn trong file; ngày kiểm: 06/11/2026). Đánh giá người dùng: chưa có đánh giá — bạn là người đầu tiên.
- **Cá hồi**: Cá hồi Mộc Châu tươi, làm gỏi hoặc lẩu đều ngon — khí hậu mát nên cá chắc thịt. Điểm trừ là giá không rẻ. Hợp nhóm ăn tối. (Nguồn tham khảo: Google Maps; nguồn trong file; ngày kiểm: 06/11/2026). Đánh giá người dùng: chưa có đánh giá — bạn là người đầu tiên.
- **Thịt trâu / lẩu trâu**: Trâu gác bếp và lẩu trâu đậm vị Tây Bắc, ăn ấm người mùa lạnh. Điểm trừ là thịt trâu dai, người răng yếu khó ăn. Hợp bữa tối theo nhóm. (Nguồn tham khảo: Google Maps; nguồn trong file; ngày kiểm: 06/11/2026). Đánh giá người dùng: chưa có đánh giá — bạn là người đầu tiên.
- **Rau cải mèo**: Rau cải mèo đắng nhẹ, xào tỏi hoặc luộc chấm chẩm chéo — món rau đặc trưng của Mộc Châu. Điểm trừ là vị đắng, người không quen khó ăn. Hợp ăn kèm thịt nướng. (Nguồn tham khảo: Google Maps; nguồn trong file; ngày kiểm: 06/11/2026). Đánh giá người dùng: chưa có đánh giá — bạn là người đầu tiên.
- **Gà đồi nướng**: Gà đồi thả vườn, thịt dai ngọt, nướng mắc khén — món nhóm được khen nhiều. Điểm trừ là giá theo con, phải hỏi trước. Hợp bữa tối ở homestay. (Nguồn tham khảo: Google Maps; nguồn trong file; ngày kiểm: 06/11/2026). Đánh giá người dùng: chưa có đánh giá — bạn là người đầu tiên.
- **Nậm pịa**: Món truyền thống của người Thái, vị đắng đặc trưng — đáng thử cho ai muốn hiểu ẩm thực bản địa. Điểm yếu là vị đắng và mùi nặng, đa số khách lần đầu không ăn được. Chỉ hợp người ăn được đồ đắng; ai kén nên bỏ qua. (Nguồn tham khảo: Google Maps; nguồn trong file; ngày kiểm: 06/11/2026). Đánh giá người dùng: chưa có đánh giá — bạn là người đầu tiên.
- **Cơm lam**: Cơm lam Mộc Châu dẻo thơm, ăn kèm thịt nướng rất hợp. Điểm yếu là chất lượng tùy quán. Hợp mua mang theo khi đi thác. (Nguồn tham khảo: Google Maps; nguồn trong file; ngày kiểm: 06/11/2026). Đánh giá người dùng: chưa có đánh giá — bạn là người đầu tiên.
- **Sữa chua nếp cẩm**: Sữa chua nếp cẩm Mộc Châu nổi tiếng, chua ngọt vừa, ăn mát — món tráng miệng nên thử. Điểm trừ là nhiều hàng nhái thương hiệu. Nên mua ở cửa hàng lớn, có thương hiệu rõ ràng. (Nguồn tham khảo: Google Maps; nguồn trong file; ngày kiểm: 06/11/2026). Đánh giá người dùng: chưa có đánh giá — bạn là người đầu tiên.

### Chỗ ở
Tất cả chỗ ở trong file đã được thêm mảng đánh giá người dùng (rỗng) trong JSON để app lưu đánh giá thật sau này. Đánh giá người dùng: chưa có đánh giá — bạn là người đầu tiên.

## 9. Mục chưa kiểm được / cần xác nhận lại (ghi rõ, không bịa)

1. Giá vé thác Dải Yếm (20.000đ / 80.000đ / 150.000đ cùng tồn tại) và Happy Land (~100.000đ — chưa kiểm được chắc chắn)
2. Giá vé Ngũ Động Bản Ôn và Hang Táu — chưa kiểm được mức riêng
3. Tọa độ GPS: Hang Táu (geocode trả về Hang Dơi — sai), Happy Land, Ngũ Động Bản Ôn, đỉnh Pha Luông — để null
4. Giờ mở cửa hầu hết các điểm Mộc Châu — chưa kiểm được giờ chính thức
5. Hạng sao Mường Thanh Mộc Châu (4 sao vs 5 sao) — mâu thuẫn, chưa chốt
6. Tên hãng xe + giờ chạy chi tiết tuyến Hà Nội–Mộc Châu; giá limousine tuyến này — chưa kiểm được
7. Địa chỉ Nhà hàng Thường Hiền: 1 nguồn ghi tỉnh Điện Biên (lỗi nguồn) — cần kiểm lại
8. Giá riêng: rau cải mèo, gà đồi, nậm pịa, sữa chua nếp cẩm — chưa kiểm được giá riêng theo đĩa
9. Khoảng giá trên của Thảo Nguyên Resort Mộc Châu (tên cũ Thảo Nguyên Hotel), Mộc Sa Hotel, Mộc Châu Eco Garden, Mộc Châu Island Resort — chưa kiểm được
10. Giá taxi/thuê ô tô tại Mộc Châu — chưa kiểm được mức riêng
11. Giá vé máy bay SGN–HAN — chưa kiểm được mức hiện hành

Cập nhật 06/11/2026: đã điền tọa độ cho mọi điểm từng null (không còn điểm null; 6 điểm tọa độ xấp xỉ trong tổng số 13 địa danh — xem ghi chú 'xấp xỉ, cần kiểm lại' trong bảng và trường toa_do_xap_xi trong JSON). Đã thêm 3 điểm du lịch gần, nhận xét của M cho 13 địa danh và 9 món ăn, mảng đánh giá người dùng (rỗng) cho mọi địa danh/chỗ ở/món ăn.

## 10. Cảnh báo chặt chém + lừa cọc (bổ sung 08/11/2026)

- **Chợ và điểm bán đặc sản Mộc Châu (mận, đào, sữa, chè): hàng cân thiếu, giá nói thách với khách lạ, mận non gắn mác mận chín** Cách tránh: Mua ở cửa hàng có bảng giá niêm yết hoặc trong siêu thị địa phương; yêu cầu cân lại trước mặt, hỏi giá/kg trước khi chọn; không mua hàng rong không có giá (Nguồn: kinh nghiệm chung du lịch Mộc Châu; chưa tra được bài báo chính thống riêng về chặt chém ở Mộc Châu (ngày kiểm 08/11/2026))
- **Thuê xe máy ở Mộc Châu: giữ giấy tờ gốc, xe cũ, trả xe bị bắt đền vết xước có sẵn** Cách tránh: Thuê ở homestay/khách sạn đang ở hoặc cửa hàng có đánh giá tốt; chụp ảnh toàn bộ vết xước, kiểm tra phanh/lốp/đèn trước khi nhận; đặt cọc tiền thay vì để giấy tờ gốc nếu được (Nguồn: kinh nghiệm chung thuê xe vùng cao; wikidulich.com — Kinh nghiệm thuê xe máy ở Sapa (mẫu thủ tục chung vùng Tây Bắc) (ngày kiểm 08/11/2026))
- **Cầu kính Bạch Long và các điểm check-in thu phí: giá vé nhiều mức, phụ thu chụp ảnh/trang phục không báo trước** Cách tránh: Hỏi rõ giá vé trọn gói và các khoản thu thêm ngay tại quầy vé trước khi mua; giữ vé và hóa đơn (Nguồn: dữ liệu tỉnh Sơn La (giá vé Cầu kính Bạch Long chưa thống nhất giữa các nguồn, ngày kiểm 06/11/2026) (ngày kiểm 08/11/2026))
- **Homestay ở Hang Táu, bản Pá Phách: đặt online khác ảnh thật, đường vào khó, phụ thu đưa đón** Cách tránh: Nhắn hỏi chủ nhà về đường vào (ô tô hay chỉ xe máy), phí đưa đón và tiện nghi thật trước khi đặt; đọc đánh giá gần nhất (Nguồn: kinh nghiệm chung du lịch Mộc Châu; chưa tra được nguồn chính thống riêng (ngày kiểm 08/11/2026))


## 11. An toàn đường đèo + thuê xe máy (bổ sung 08/11/2026)

Đèo Pha Đin (QL6, ranh giới Sơn La – Điện Biên) dài 32 km, điểm cao nhất 1.648 m, một bên vách núi một bên vực sâu, có 8 cung đường cua nguy hiểm với bán kính cong dưới 15 m và nhiều khúc cua tay áo, cua chữ A, chữ Z, có đoạn chỉ đủ một ô tô đi qua; lưng chừng đèo thường mịt mờ mây phủ. Hiện có tuyến QL6 mới thấp hơn đèo cũ 200–400 m, ít dốc hơn — nếu tay lái yếu nên đi tuyến mới, chỉ chinh phục đèo Pha Đin cũ khi thời tiết tốt, ban ngày, xe số, kiểm tra phanh/lốp/đèn, tốc độ chậm, bấm còi ở cua khuất. Các tuyến Mộc Châu – Sơn La, đường lên Pha Luông, Ngũ Động Bản Ôn: dốc, trơn khi mưa, tránh đi ban đêm và mùa mưa tháng 5–9 khi có cảnh báo sạt lở. Mang CCCD/hộ chiếu và giấy tờ xe đầy đủ; đổ xăng trước khi vào đoạn đèo dài.

**Đèo/đoạn cần chú ý:**
- Đèo Pha Đin (QL6 Sơn La – Điện Biên): dài 32 km, cao 1.648 m, 8 cung cua nguy hiểm bán kính <15 m, sương mù thường trực
- Đường lên đỉnh Pha Luông (trekking) và Ngũ Động Bản Ôn: dốc đá, trơn khi mưa
- QL6 đoạn Mộc Châu – Sơn La và đường vào Hang Táu, Thác Nàng Tiên: dốc, hẹp, trơn mùa mưa

(Nguồn: 2banh.vn — 4 cung đường đèo thách thức các dân phượt thủ; dailytourviet.vn — 3 con đèo nguy hiểm nhất vùng Tây Bắc (đèo Pha Đin) (ngày kiểm 08/11/2026))


## 12. Số khẩn cấp + xử lý sự cố (bổ sung 08/11/2026)

- Công an: 113 — Cấp cứu: 115 — Cứu hỏa: 114
- Bệnh viện Đa khoa tỉnh Sơn La: 0212 3852 326 (Nguồn: Sở Y tế tỉnh Sơn La — Thông báo cơ sở đủ điều kiện hoạt động tiêm chủng (văn bản đăng trên storage-vnportal.vnpt.vn) (ngày kiểm 08/11/2026))
- Bệnh viện Đa khoa Thảo Nguyên (Mộc Châu): 0212 3866 046 (Nguồn: suckhoe.thebank.vn — danh bạ Bệnh viện Đa khoa Thảo Nguyên (ngày kiểm 08/11/2026))

(Nguồn: số chung cả nước 113/115/114 là số khẩn cấp quốc gia; số riêng theo nguồn ghi trong từng mục (ngày kiểm 08/11/2026))


## 13. Giờ đẹp chụp ảnh (bổ sung 08/11/2026)

| # | Điểm | Giờ đẹp | Nguồn |
|---|---|---|---|
| 1 | Đồi chè trái tim | 7:00-10:00 sáng sớm có sương; 15:00-17:00 nắng chiều | dữ liệu tỉnh Sơn La (ngày kiểm 06/11/2026) (ngày kiểm 08/11/2026) |
| 2 | Thác Dải Yếm | 8:00-10:00 nắng xiên qua thác; đẹp nhất mùa mưa tháng 5–8 nước lớn | dữ liệu tỉnh Sơn La (ngày kiểm 06/11/2026) (ngày kiểm 08/11/2026) |
| 3 | Rừng thông Bản Áng (Phoenix) | 6:30-8:00 bình minh trên hồ; 16:30-17:30 hoàng hôn | dữ liệu tỉnh Sơn La (ngày kiểm 06/11/2026) (ngày kiểm 08/11/2026) |


## 14. Cho người chạy giải (bổ sung 08/11/2026)

**Giải chạy (đã kiểm nguồn):**
- Vietnam Trail Marathon (VTM) — Mộc Châu — tháng 1 hằng năm (2026: 31/1; cự ly 5–70 km, xuất phát khu vực Mường Thanh Holiday Mộc Châu, về đích Đồi chè trái tim) (Nguồn: thongtindoingoai.sonla.gov.vn — Cổng thông tin đối ngoại tỉnh Sơn La; vietnamtrailseries.com (ngày kiểm 08/11/2026))

**Điểm chạy bộ đẹp:** Đồi chè trái tim (đích VTM); Rừng thông Bản Áng buổi sáng sớm; Đường quanh thung lũng mận Nà Ka.

**Chỗ ở gần điểm xuất phát** (lấy từ mục chỗ ở đã có): Mường Thanh Luxury Mộc Châu (Mường Thanh Holiday Mộc Châu); Thảo Nguyên Resort Mộc Châu; Phoenix Mộc Châu Resort.

(Nguồn: thongtindoingoai.sonla.gov.vn — Vietnam Trail Marathon tại Mộc Châu (ngày kiểm 08/11/2026); chỗ ở lấy từ dữ liệu tỉnh Sơn La (ngày kiểm 06/11/2026))
