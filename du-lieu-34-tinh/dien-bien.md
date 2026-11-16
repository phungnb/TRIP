# Dữ liệu cẩm nang Điện Biên — Giai đoạn 1 (đầy đủ)

- **Trạng thái: published** — đẩy lên theo lệnh anh ngày 06/11/2026 (đẩy hết lên, bỏ vòng duyệt chuyên gia; các nợ dữ liệu vẫn giữ nguyên, xem mục 9).
- Ngày kiểm: 06/11/2026. Cập nhật 06/11/2026: đã điền tọa độ cho mọi điểm từng null (có điểm xấp xỉ — xem ghi chú), thêm 3 điểm gần, thêm nhận xét của M cho mọi địa danh/món và mảng đánh giá người dùng (rỗng). Mọi giá đều là **khoảng giá tham khảo** từ nguồn công khai, không phải giá chốt. Giá đổi theo mùa, cuối tuần, lễ Tết — kiểm lại trước ngày đi.
- Bổ sung 08/11/2026: số điện thoại chỗ ở (cột Điện thoại, mục 2) + mục 2B Trời mưa thì đi đâu + mục 2C Cho cặp đôi + mục 2D Mùa + tháng đẹp nhất. Số điện thoại tra từ nguồn công khai ngày 08/11/2026; chỗ nào ghi 'Chưa tra được' là chưa tìm thấy số khớp tên + địa chỉ.
- Trung tâm tính khoảng cách: TP Điện Biên Phủ. Mùa đẹp nhất: Tháng 3 hoa ban; tháng 9–10 lúa chín Mường Thanh; tháng 12–3 mùa khô, đi di tích và bản làng thuận tiện; tránh tháng 5–8 mùa mưa, đường đèo trơn.
- Điện Biên Phủ là trung tâm lịch sử của chiến thắng năm 1954: đồi A1, hầm Đờ Cát, Bảo tàng Chiến thắng, tượng đài trên đồi D1 — tất cả gom trong khu vực trung tâm, đi bộ/xe máy trong nửa ngày. Đi xa hơn có hồ Pá Khoang, sở chỉ huy Mường Phăng và suối khoáng nóng. Tỉnh không sáp nhập năm 2025.
- **Khách sạn/homestay: CHỈ giới thiệu sơ.** Tất cả đều ghi "chưa kiểm chứng / chưa đối tác / chưa thu phí". Không dùng chữ uy tín/đảm bảo. Không nhận đặt phòng, không nhận tiền.
- Lưu ý địa giới: từ 01/07/2025 cả nước sắp xếp đơn vị hành chính, tên xã/phường/huyện cũ-mới trong các nguồn không thống nhất — file này ghi đường + số nhà là chính, tên hành chính theo nguồn và ghi chú khi mâu thuẫn.
- File JSON máy đọc được: `du-lieu-cam-nang-dien-bien.json` (cùng thư mục).

## 1. Địa danh — 13 điểm chính

Mốc tính khoảng cách: TP Điện Biên Phủ. Khoảng cách là đường đi theo nguồn, không phải đường chim bay.

### 1.1. Cụm trung tâm

| # | Tên | Địa chỉ | Tọa độ | Cách trung tâm | Giá vé | Giờ mở cửa | Thời gian | Hợp với ai | Lưu ý | Nguồn |
|---|---|---|---|---|---|---|---|---|---|---|
| 1 | Đồi A1 | Phường Mường Thanh, TP Điện Biên Phủ (khu vực cầu A1) | 21.38171, 103.01376 | ~0 km | Chưa kiểm được mức hiện hành — nguồn cũ ghi 5.000đ; nguồn 2025 ghi khoảng 20.000đ/người. Khoảng: 5.000–20.000đ | 7:00–11:00 và 13:30–17:00 (theo Frommer's) | 1–1,5 giờ | Mọi đối tượng, người quan tâm lịch sử | Còn hệ thống chiến hào, lô cốt và hố mìn lớn; đi cùng nghĩa trang liệt sĩ A1 — giữ trang nghiêm, ăn mặc lịch sự | frommers.com, ecotour.com.vn, crystalbay.com |
| 2 | Hầm Đờ Cát (hầm chỉ huy De Castries) | Phường Thanh Trường, TP Điện Biên Phủ, cách đồi A1 ~1,5 km về phía tây bắc | 21.38611, 103.00987 | ~2 km | 20.000đ/người lớn, trẻ em dưới 1,2 m miễn phí | Chưa kiểm được giờ chính thức thống nhất | 30–60 phút | Mọi đối tượng, người quan tâm lịch sử | Hầm dài ~20 m, rộng ~8 m, 4 gian; trong cánh đồng Mường Thanh | crystalbay.com, ecotour.com.vn |
| 3 | Bảo tàng Chiến thắng Điện Biên Phủ | Đường Võ Nguyên Giáp, phường Mường Thanh, TP Điện Biên Phủ (đối diện nghĩa trang A1) | 21.38093, 103.01558 | ~0 km | 40.000đ/người (theo vietnamoriginal; chưa kiểm được mức chính thức hiện hành) | 7:30–11:00 và 13:30–16:30 | 1–1,5 giờ | Mọi đối tượng, gia đình có trẻ nhỏ | Trưng bày hiện vật, sa bàn, phim tư liệu; khởi công 2012, diện tích ~22.000 m² | vietnamoriginal.com, ecotour.com.vn |
| 4 | Tượng đài Chiến thắng Điện Biên Phủ (đồi D1) | Đường Võ Nguyên Giáp, phường Tân Thanh, TP Điện Biên Phủ | 21.39216, 103.01625 | ~1 km | Miễn phí (không gian ngoài trời) | Cả ngày (không gian ngoài trời) | 30–60 phút; đẹp nhất hoàng hôn | Mọi đối tượng | Nằm trên đồi D1 ngay trung tâm TP; leo dốc, mang giày bệt | ecotour.com.vn |
| 5 | Nghĩa trang liệt sĩ A1 | Phường Mường Thanh, TP Điện Biên Phủ, dưới chân đồi A1 | 21.38171, 103.01376 | ~0 km | Miễn phí | Ban ngày | 30 phút | Mọi đối tượng | Nơi an nghỉ của 644 chiến sĩ (đa số vô danh) — dâng hương, giữ yên lặng, ăn mặc lịch sự. Tọa độ ghi theo khu vực đồi A1, chưa phải tọa độ cổng chính xác | vietnamoriginal.com, ecotour.com.vn |
### 1.2. Cụm ngoài thành phố

| # | Tên | Địa chỉ | Tọa độ | Cách trung tâm | Giá vé | Giờ mở cửa | Thời gian | Hợp với ai | Lưu ý | Nguồn |
|---|---|---|---|---|---|---|---|---|---|---|
| 6 | Hồ Pá Khoang | Xã Pá Khoang, Điện Biên Phủ | 21.43586, 103.11031 | ~20 km | Chưa kiểm được mức vé hiện hành (khu vực hồ mở) | Cả ngày (không gian mở) | 1,5–2,5 giờ | Cặp đôi, gia đình, nhóm bạn | Hồ lớn ven TP, hợp picnic, chụp ảnh; đi xe máy/ô tô ~20 km | ecotour.com.vn |
| 7 | Sở chỉ huy chiến dịch Điện Biên Phủ (Mường Phăng) | Xã Mường Phăng, Điện Biên Phủ | 21.44525, 103.1579 | ~35 km | 100.000đ/người (theo 1 nguồn; miễn phí cựu chiến binh, người dưới 18 tuổi; giảm 50% người trên 60 tuổi) | Mùa hè 7:00–11:00 & 13:30–18:00; mùa đông 7:00–11:00 & 13:30–17:30 | 1,5–2 giờ (tính cả di chuyển ~35 km) | Người quan tâm lịch sử | Nằm trong rừng Mường Phăng, cách trung tâm ~35–40 km; đường đèo, đi ô tô/xe máy tốt | bestprice.vn, ecotour.com.vn |
| 8 | Suối khoáng nóng Uva | Xã Noong Luống, Điện Biên | 21.28939, 102.99798 | ~15 km | Chưa kiểm được mức vé tắm hiện hành | Chưa kiểm được giờ chính thức | 1–2 giờ | Gia đình, người muốn thư giãn | Suối khoáng nóng tự nhiên; hỏi giá tắm/bể trước khi vào. Lưu ý: suối Hua Pe (Thanh Luông) là điểm khác, đừng nhầm | ecotour.com.vn |
| 9 | Bản Mển (bản du lịch cộng đồng người Thái) | Xã Thanh Nưa, Điện Biên (cách TP ~10 km) | 21.42, 103.005 (xấp xỉ, cần kiểm lại) | ~10 km | Chưa kiểm được mức vé/dịch vụ hiện hành | Ban ngày | 2–3 giờ (hoặc ngủ lại homestay) | Gia đình, nhóm bạn | Bản Thái với nhà sàn, văn nghệ dân tộc; hỏi trước về ăn tối + ngủ lại tại bản | ecotour.com.vn, bestprice.vn |
| 10 | Cánh đồng Mường Thanh | Phường Mường Thanh – Thanh Trường, TP Điện Biên Phủ | 21.38, 103.018 (xấp xỉ, cần kiểm lại) | ~0 km | Miễn phí (ngắm cảnh ven đường) | Cả ngày | 30–60 phút; đẹp nhất tháng 9–10 lúa chín | Mọi đối tượng, người thích chụp ảnh | Cánh đồng lớn nhất Tây Bắc; đi xe qua QL279 ngắm lúa, không đi vào ruộng | ecotour.com.vn |

### Điểm mới thêm 06/11/2026 (mở rộng theo quyết định 07:05 — chỉ điểm gần, cùng cụm di chuyển được)

| Tên | Địa chỉ | Tọa độ | Cách trung tâm | Giá vé | Giờ mở cửa | Thời gian | Hợp với ai | Lưu ý | Nguồn |
|---|---|---|---|---|---|---|---|---|---|
| Đèo Pha Đin và Khu du lịch Pha Đin Top | Quốc lộ 6/279, xã Bình Thuận (ranh giới Điện Biên – Sơn La), cao hơn 1.000 m | 21.557, 103.252 (xấp xỉ, cần kiểm lại) | ~100 km | Chưa kiểm được mức vé Pha Đin Top hiện hành | Chưa kiểm được giờ chính thức — tham quan ban ngày | 2–3 giờ (điểm dừng chân) | Người đi cung Điện Biên – Sơn La, người thích săn mây và check-in | Một trong 'tứ đại đỉnh đèo' Tây Bắc, cách TP Điện Biên Phủ ~100 km — CHỈ hợp lịch 4N3Đ hoặc đi trên đường về Sơn La, không đi riêng trong ngày. Khu Pha Đin Top có vườn hoa, cầu tình yêu, xích đu vô cực, chợ phiên thứ 7 từ tháng 6/2026. Tọa độ xấp xỉ, cần kiểm lại. Đèo dốc, cua gấp, không đi ban đêm khi mưa/sương. | baomoi.com (07/08/2026), travelviet.net, thuonghieuvang.net.vn |
| Đền Hoàng Công Chất (Bản Phủ) | Bản Phủ, huyện Điện Biên (cách TP Điện Biên Phủ ~5 km) | 21.425, 102.995 (xấp xỉ, cần kiểm lại) | ~5 km | Chưa kiểm được mức vé hiện hành | Chưa kiểm được giờ chính thức — tham quan ban ngày | 1 giờ | Người yêu lịch sử, gia đình | Đền thờ thủ lĩnh Hoàng Công Chất, di tích lịch sử gần trung tâm TP — tiện ghép buổi chiều sau các điểm Điện Biên Phủ. Tọa độ xấp xỉ, cần kiểm lại. | dulichviet.com.vn, dienbien.gov.vn |
| Cầu Mường Thanh (cầu sắt lịch sử) | Bắc qua sông Nậm Rốm, phường Mường Thanh, TP Điện Biên Phủ (gần đồi A1) | 21.382, 103.015 (xấp xỉ, cần kiểm lại) | ~0 km | Miễn phí (cầu giao thông, điểm check-in ven đường) | 24/7 (cầu giao thông) | 15–30 phút dừng chụp ảnh | Mọi đối tượng, người yêu lịch sử | Cầu sắt gắn với chiến dịch Điện Biên Phủ, ngay cạnh đồi A1 — tiện ghép khi tham quan cụm trung tâm. Tọa độ xấp xỉ, cần kiểm lại. Chỉ dừng chụp ảnh ở vị trí an toàn, không dừng xe giữa cầu. | dulichviet.com.vn |

## 2. Ở đâu — 7 chỗ ở (CHỈ GIỚI THIỆU SƠ)

**Tất cả các mục dưới đây: "Thông tin tham khảo, chưa kiểm chứng trực tiếp, chưa phải đối tác, chưa thu phí. Người dùng tự kiểm tra giá / phòng trống trước khi đặt." Không dùng chữ uy tín/đảm bảo. Không nhận đặt phòng, không nhận tiền.**
Giá tăng cuối tuần, lễ Tết. Tên phường/xã cũ-mới không thống nhất sau sáp nhập 2025 — giữ nguyên địa chỉ đường + số nhà theo nguồn.

| # | Tên | Địa chỉ | Khu vực | Hạng | Khoảng giá/đêm ngày thường | Điện thoại | Cách trung tâm | Hợp với ai | Trạng thái | Nguồn |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| 1 | Mường Thanh Grand Điện Biên Phủ | 514 Võ Nguyên Giáp, phường Điện Biên Phủ, TP Điện Biên Phủ | trung-tam | 4 sao | ~900.000–1.500.000đ/đêm (Traveloka ghi từ 1.200.000đ/đêm) | 0215 3810 043 | Trung tâm TP, gần di tích | Gia đình, khách đoàn, khách muốn tiện nghi cao | Chưa kiểm chứng / chưa đối tác / chưa thu phí | traveloka.com, abay.vn, greensm.com |
| 2 | Mường Thanh Luxury Điện Biên | 42 Trần Đăng Ninh, phường Thanh Bình, TP Điện Biên Phủ | trung-tam | 5 sao (theo 1 nguồn TikTok) | Từ ~1.300.000đ/đêm (chưa kiểm được khoảng trên) | 0215 2216 666 | Trung tâm TP | Khách muốn tiện nghi cao, có bể bơi | Chưa kiểm chứng / chưa đối tác / chưa thu phí | tiktok.com (vietnam.happy.tri) |
| 3 | Khách sạn Him Lam (Him Lam Resort) | Tổ 6, phường Him Lam, TP Điện Biên Phủ | trung-tam | 3 sao | Từ ~600.000–870.000đ/đêm (phòng khách sạn); ~1.500.000đ/đêm (resort) — giá khác nhau theo loại phòng | 0215 3811 856 / 0215 3811 666 | Cách trung tâm ~4 km | Gia đình, khách muốn yên tĩnh, khách nghỉ dưỡng | Chưa kiểm chứng / chưa đối tác / chưa thu phí | traveloka.com, abay.vn, greensm.com |
| 4 | Khách sạn A1 | Số 3 Hoàng Công Chất, phường Mường Thanh, TP Điện Biên Phủ | trung-tam | Chưa kiểm được hạng sao chính thức | Từ ~550.000đ/đêm | 0215 3952 999 | Trung tâm TP | Khách tiết kiệm, ở trung tâm | Chưa kiểm chứng / chưa đối tác / chưa thu phí | traveloka.com, greensm.com |
| 5 | Khách sạn Thanh Nam | TP Điện Biên Phủ (chưa kiểm được số nhà cụ thể) | trung-tam | Chưa kiểm được hạng sao chính thức | ~800.000đ/đêm (theo Agoda ~32 USD — chưa kiểm được khoảng) | Chưa tra được | Trung tâm TP | Khách muốn ở trung tâm | Chưa kiểm chứng / chưa đối tác / chưa thu phí | agoda.com |
| 6 | Frontier Hostel & Tours | TP Điện Biên Phủ (chưa kiểm được số nhà cụ thể) | trung-tam | Hostel | ~200.000đ/người/đêm (theo Agoda ~8 USD — chưa kiểm được khoảng) | 0816 900 800 | Trung tâm TP | Khách bụi, đi một mình | Chưa kiểm chứng / chưa đối tác / chưa thu phí | agoda.com, trip.com |

## 2B. Trời mưa thì đi đâu (bổ sung 08/11/2026)

Các điểm dưới đây đều đã có trong mục 1, chỉ chọn những điểm có mái che/không gian trong nhà, đi mưa được:

- Bảo tàng Chiến thắng Điện Biên Phủ
- Hầm Đờ Cát (hầm chỉ huy De Castries)
- Sở chỉ huy chiến dịch Điện Biên Phủ (Mường Phăng)
- Đền Hoàng Công Chất (Bản Phủ)

Dặn: Mưa thì vào bảo tàng và hầm Đờ Cát — tránh đèo Pha Đin và đồi A1 vì trơn.

## 2C. Cho cặp đôi (bổ sung 08/11/2026)

Trong file, không có chỗ ở nào ghi hợp với cặp đôi — cặp đôi có thể ở các chỗ còn lại tùy ngân sách.

Điểm hợp cặp đôi (từ mục 1):

- Hồ Pá Khoang
- Suối khoáng nóng Uva
- Cánh đồng Mường Thanh
- Đồi A1

## 2D. Mùa + tháng đẹp nhất (bổ sung 08/11/2026)

- Tháng đẹp nhất: Tháng 3 hoa ban; tháng 9–10 lúa chín Mường Thanh; tháng 12–3 mùa khô, đi di tích và bản làng thuận tiện; tránh tháng 5–8 mùa mưa, đường đèo trơn
- Nguồn: meta.best_season trong file (nghiên cứu ngày 06/11/2026; nguồn tổng xem meta.nguon_tong)
- Ngày kiểm: 06/11/2026

## 3. Ăn gì — 8 món (đủ quán + địa chỉ + khoảng giá)

| # | Món | Buổi ăn | Khoảng giá | Quán tham khảo (địa chỉ) | Nguồn |
|---|---|---|---|---|---|
| 1 | Pa pỉnh tộp (cá nướng) | Ăn trưa / ăn tối | Chưa kiểm được mức riêng | (1) Nhà hàng Anh Bằng — Mường Phăng, Điện Biên; Chưa kiểm được giá riêng; (2) Nhà hàng Dân Tộc Quán — Thanh Trường, TP Điện Biên Phủ; Chưa kiểm được giá riêng | booking.muongthanh.com |
| 2 | Gà nướng mắc khén | Ăn trưa / ăn tối (món nhóm) | 250.000–350.000đ/con (1 nguồn ghi 20.000–500.000đ/người — mâu thuẫn, lấy khoảng theo con) | (1) Công Hoan Quán — 563 đường 7-5, phường Tân Thanh, TP Điện Biên Phủ; 250.000–350.000đ/con; (2) Mường Thanh Grand Điện Biên Phủ — 514 Võ Nguyên Giáp, phường Điện Biên Phủ, TP Điện Biên Phủ; Chưa kiểm được giá riêng | booking.muongthanh.com, mytour.vn |
| 3 | Xôi chim | Ăn trưa / ăn tối | 80.000–120.000đ/phần | (1) Nhà hàng Dân Tộc Quán — Thanh Trường, TP Điện Biên Phủ; 80.000–120.000đ/phần; (2) Quán đối diện UBND phường Nam Thanh — Phường Nam Thanh, TP Điện Biên Phủ; Chưa kiểm được giá riêng | booking.muongthanh.com, mytour.vn |
| 4 | Xôi nếp nương | Ăn sáng / ăn trưa | 10.000–15.000đ/phần | (1) Nhà hàng Dân Tộc Quán — Thanh Trường, TP Điện Biên Phủ; 10.000–15.000đ/phần | gacbepbamien.com |
| 5 | Thịt lợn xay hấp lá chuối | Ăn trưa / ăn tối | Chưa kiểm được mức riêng | (1) Nhà hàng Song Hỷ Điện Biên — 236 Nguyễn Chí Thanh, phường Mường Thanh, TP Điện Biên Phủ; Chưa kiểm được giá riêng | booking.muongthanh.com |
| 6 | Cá suối nướng / cá sông Đà | Ăn trưa / ăn tối | Chưa kiểm được mức riêng | (1) Nhà hàng Hương Đồng Nội — 68B tổ 6, phường Thanh Trường, TP Điện Biên Phủ; Chưa kiểm được giá riêng; (2) Nhà hàng Điện Biên Phủ — 279A đường 7/5, phường Mường Thanh, TP Điện Biên Phủ; Chưa kiểm được giá riêng | mytour.vn |
| 7 | Thịt trâu gác bếp (mua làm quà) | Ăn vặt / mua về | Chưa kiểm được giá/kg hiện hành | (1) Bà Bích Shop — Thanh Minh, TP Điện Biên Phủ; Chưa kiểm được giá riêng | mytour.vn |
| 8 | Lẩu cá / lẩu gà (món nhóm) | Ăn trưa / ăn tối (món nhóm) | Chưa kiểm được mức riêng | (1) Nhà hàng Điện Biên Phủ — 279A đường 7/5, phường Mường Thanh, TP Điện Biên Phủ; Chưa kiểm được giá riêng; (2) Nhà hàng Song Hỷ Điện Biên — 236 Nguyễn Chí Thanh, phường Mường Thanh, TP Điện Biên Phủ; Chưa kiểm được giá riêng | mytour.vn |

## 4. Đi đến bằng gì

Sân bay Điện Biên Phủ (DIN), phường Thanh Trường, cách trung tâm TP ~4 km.

### 4.1. Từ TP.HCM

| Phương tiện | Thời gian | Khoảng giá | Hãng / ghi chú | Nguồn |
|---|---|---|---|---|
| Máy bay SGN–Điện Biên (thẳng, Vietnam Airlines) | Bay ~2h10 | 1.290.000–2.990.000đ/chiều (chưa gồm thuế phí; khai thác từ 24/12/2025, 3–7 chuyến/tuần) | Đường bay thẳng mới; kiểm tra lại lịch bay trước ngày đi vì tần suất theo nhu cầu | atrip.vn, vietjet.net |
| Máy bay SGN–HAN + HAN–Điện Biên (nối chuyến) | Bay SGN–HAN ~2h10 + HAN–DIN ~1h05 (+ thời gian nối chuyến) | SGN–HAN khoảng 1.000.000–2.500.000đ/chiều (chưa kiểm được mức hiện hành); HAN–DIN 900.000–2.700.000đ/chiều đã gồm thuế phí | Vietnam Airlines khai thác nối chuyến ~1 chuyến/ngày; chuyến sớm nhất SGN 06:15, tới Điện Biên ~14:05 | vietnamairlines.com, vietnambooking.com |
| Máy bay SGN–HAN + xe khách Hà Nội–Điện Biên | Bay ~2h10 + xe 10–12 giờ | Bay như trên + xe 270.000–680.000đ/chiều | Chỉ hợp người dư thời gian; đa số nên bay thẳng/nối chuyến | motortrip.vn |

### 4.2. Từ Hà Nội

| Phương tiện | Thời gian | Khoảng giá | Ghi chú | Nguồn |
|---|---|---|---|---|
| Máy bay HAN–Điện Biên | Bay ~55 phút–1h05 | 900.000–2.700.000đ/chiều đã gồm thuế phí (Economy Light từ ~900.000đ; Classic ~1.300.000đ) | Vietnam Airlines (Vietjet cũng được ghi khai thác theo 1 nguồn — chưa kiểm được chắc chắn). Tần suất ~1–2 chuyến/ngày | vietjet.net, vietnambooking.com, ecotour.com.vn |
| Xe khách / giường nằm Hà Nội–Điện Biên | 10–12 giờ, ~470–490 km | 270.000–680.000đ/chiều (giường nằm phổ thông 270.000–450.000đ; limousine cabin/phòng đơn 500.000–680.000đ) | Hãng: Ngân Hà, Hải Vân Express, Quang Tuấn, Đức Quyến, Năm Liên. Đón Mỹ Đình/Yên Nghĩa/Giáp Bát; đa số chạy tối 18:30–21:00 | motortrip.vn |

### 4.3. Từ sân bay vào trung tâm

| Phương tiện | Khoảng giá | Ghi chú | Nguồn |
|---|---|---|---|
| Taxi sân bay Điện Biên (DIN) – trung tâm | 70.000–80.000đ/chuyến | Bắt tại cổng sân bay hoặc xe khách sạn; hỏi giá trước | vietnamairlines.com |
| Xe ôm sân bay – trung tâm | 50.000đ/chuyến | Bắt tại cổng sân bay | vietnamairlines.com |

## 5. Đi lại trong Điện Biên

| Phương tiện | Khoảng giá | Giấy tờ / điều kiện | Ghi chú | Nguồn |
|---|---|---|---|---|
| Thuê xe máy | 150.000–300.000đ/ngày (nguồn 2025) | CCCD + bằng lái A1 | Đủ đi các di tích trong TP + hồ Pá Khoang; đi Mường Phăng nên thuê ô tô hoặc xe tốt | ecotour.com.vn |
| Taxi nội thành | Chưa kiểm được mức riêng tại Điện Biên Phủ |  | Quãng trong TP ngắn; hỏi giá trước khi lên xe | Chưa kiểm được nguồn riêng Điện Biên |
| Thuê ô tô có tài xế theo ngày | Chưa kiểm được mức riêng tại Điện Biên |  | Nên thuê khi đi Mường Phăng + Pá Khoang + bản Mển trong 1 ngày | Chưa kiểm được nguồn riêng Điện Biên |
| Xe ôm | Chưa kiểm được mức riêng |  | Đi chặng ngắn trong TP | Chưa kiểm được nguồn riêng Điện Biên |

## 6. Lịch trình mẫu

### 6.1. Lịch trình 3N2Đ (chính)

| Ngày | Buổi | Hoạt động | Điểm / quán gắn kèm |
|---|---|---|---|
| Ngày 1 | Sáng | Tới Điện Biên Phủ; Bảo tàng Chiến thắng (1–1,5 giờ) + đồi A1 và nghĩa trang A1 | bao-tang-chien-thang, doi-a1, nghia-trang-a1 |
| Ngày 1 | Chiều | Hầm Đờ Cát (30–60 phút) + tượng đài Chiến thắng trên đồi D1 lúc hoàng hôn | ham-do-cat, tuong-dai-chien-thang |
| Ngày 1 | Tối | Ăn tối TP: gà nướng mắc khén, xôi chim | — |
| Ngày 2 | Sáng | Sở chỉ huy Mường Phăng (1,5–2 giờ, ~35 km) | so-chi-huy-muong-phang |
| Ngày 2 | Chiều | Hồ Pá Khoang (1,5–2,5 giờ); ghé cánh đồng Mường Thanh lúc lúa chín (tháng 9–10) | ho-pa-khoang, canh-dong-muong-thanh |
| Ngày 2 | Tối | Suối khoáng nóng Uva thư giãn (1–2 giờ) hoặc ăn tối tại bản Mển | suoi-khoang-uva, ban-men |
| Ngày 3 | Sáng | Bản Mển (2–3 giờ); mua đặc sản làm quà | ban-men |
| Ngày 3 | Chiều | Về, trả phòng | — |

### 6.2. Lịch trình 2N1Đ (bản gấp)

| Ngày | Buổi | Hoạt động |
|---|---|---|
| Ngày 1 | Sáng | Bảo tàng Chiến thắng + đồi A1 + nghĩa trang A1 |
| Ngày 1 | Chiều | Hầm Đờ Cát + tượng đài Chiến thắng |
| Ngày 1 | Tối | Ăn tối TP: gà nướng mắc khén |
| Ngày 2 | Sáng | Hồ Pá Khoang hoặc sở chỉ huy Mường Phăng (chọn 1) |
| Ngày 2 | Chiều | Về, trả phòng |

### 6.3. Lịch trình 4N3Đ (bản chậm)

| Ngày | Buổi | Hoạt động |
|---|---|---|
| Ngày 1 | Cả ngày | Như ngày 1 lịch trình 3N2Đ (di tích trung tâm) |
| Ngày 2 | Cả ngày | Như ngày 2 lịch trình 3N2Đ (Mường Phăng + Pá Khoang + suối khoáng) |
| Ngày 3 | Cả ngày | Bản Mển cả ngày: tham quan bản, ăn trưa tại bản, ngủ lại homestay |
| Ngày 4 | Sáng | Cánh đồng Mường Thanh buổi sớm; mua đặc sản; chiều về |

## 7. Bảng chi phí ước tính (1 người, 3N2Đ từ TP.HCM)

| Hạng mục | Ước tính 3N2Đ / người |
|---|---|
| Máy bay SGN–Điện Biên khứ hồi (bay thẳng) | 2.580.000–5.980.000đ (chưa gồm thuế phí) |
| Xe sân bay khứ hồi + taxi trong TP | 150.000–300.000đ |
| Ở 2 đêm (chia đôi phòng 3–4 sao) | 600.000–1.500.000đ |
| Ăn 3 ngày | 450.000–900.000đ |
| Vé tham quan (bảo tàng, A1, hầm, Mường Phăng) | 150.000–250.000đ |
| Thuê xe máy 2–3 ngày | 300.000–900.000đ |
| Phát sinh | 100.000–300.000đ |
| Tổng ước tính | 4.330.000–10.130.000đ/người |
| Nếu đi từ Hà Nội bằng xe khách thay máy bay | Xe khứ hồi 540.000–1.360.000đ thay cho vé bay HAN–DIN |

Quy tắc hiển thị giá trong app: luôn ghi khoảng giá + ngày kiểm (06/11/2026), không ghi một giá cố định.

## 8. Checklist mang theo

- Áo khoác (sáng/tối se lạnh, nhất là tháng 12–3)
- Áo mưa mỏng (tránh tháng 5–8 mùa mưa)
- Giày đi bộ (leo đồi A1, D1, đường rừng Mường Phăng)
- CCCD + bằng lái A1 (nếu thuê xe máy)
- Tiền mặt lẻ (bản làng, quán nhỏ)
- Sạc dự phòng, thuốc cơ bản
- Ăn mặc lịch sự khi vào di tích, nghĩa trang

## Nhận xét của M và đánh giá người dùng (thêm 06/11/2026)

Nhận xét dưới đây là chính kiến của M sau khi đọc review trên Google Maps / TripAdvisor / các blog du lịch uy tín đã dẫn nguồn — không copy nguyên văn review, không bịa số sao; chỗ nào các nguồn mâu thuẫn nhau thì ghi rõ mâu thuẫn. Đánh giá người dùng trong app hiện chưa có — bạn là người đầu tiên.

### Địa danh
- **Đồi A1**: Điểm lịch sử quan trọng nhất của Điện Biên Phủ — đứng trên đồi mới cảm nhận được tầm vóc trận đánh. Điểm trừ là giá vé các nguồn ghi mâu thuẫn (5.000đ cũ, 20.000đ mới) và nắng gắt buổi trưa. Nên đi sáng sớm hoặc chiều muộn, thuê thuyết minh tại chỗ sẽ hiểu sâu hơn nhiều. (Nguồn tham khảo: Google Maps; nguồn trong file; ngày kiểm: 06/11/2026). Đánh giá người dùng: chưa có đánh giá — bạn là người đầu tiên.
- **Hầm Đờ Cát (hầm chỉ huy De Castries)**: Hầm chỉ huy của De Castries còn khá nguyên vẹn, xem xong mới thấy rõ thế trận năm 1954. Điểm trừ là không gian hầm chật, tối, đi nhanh là hết. Hợp người yêu lịch sử; nên đi kèm đồi A1 và bảo tàng trong cùng buổi. (Nguồn tham khảo: Google Maps; nguồn trong file; ngày kiểm: 06/11/2026). Đánh giá người dùng: chưa có đánh giá — bạn là người đầu tiên.
- **Bảo tàng Chiến thắng Điện Biên Phủ**: Bảo tàng làm tốt, hiện vật và sa bàn rõ ràng, kiến trúc nón cối độc đáo — nhiều du khách khen là điểm nên đến nhất ở Điện Biên. Điểm yếu là giá vé chưa thống nhất giữa các nguồn (40.000đ theo một nguồn). Hợp mọi đối tượng, dành ít nhất 1,5 giờ. (Nguồn tham khảo: Google Maps; vietnamoriginal; ngày kiểm: 06/11/2026). Đánh giá người dùng: chưa có đánh giá — bạn là người đầu tiên.
- **Tượng đài Chiến thắng Điện Biên Phủ (đồi D1)**: Tượng đài trên đồi D1, view toàn cảnh TP Điện Biên Phủ và cánh đồng Mường Thanh — đẹp nhất lúc hoàng hôn. Điểm trừ là ngoài tượng đài và view thì không có nhiều hoạt động. Hợp ghé nhanh 30 phút chụp ảnh. (Nguồn tham khảo: Google Maps; nguồn trong file; ngày kiểm: 06/11/2026). Đánh giá người dùng: chưa có đánh giá — bạn là người đầu tiên.
- **Nghĩa trang liệt sĩ A1**: Không gian trang nghiêm, nhiều du khách xúc động khi đến viếng — nên đi với thái độ tôn trọng, giữ yên lặng. Điểm yếu là ít thông tin hướng dẫn nếu đi tự túc. Hợp mọi đối tượng, đi kèm đồi A1. (Nguồn tham khảo: Google Maps; nguồn trong file; ngày kiểm: 06/11/2026). Đánh giá người dùng: chưa có đánh giá — bạn là người đầu tiên.
- **Hồ Pá Khoang**: Hồ đẹp, yên tĩnh, không khí mát — hợp nghỉ ngơi, cắm trại nhẹ sau khi tham quan di tích. Điểm trừ là dịch vụ còn ít, giá vé chưa rõ ràng. Hợp người thích thiên nhiên, không hợp người muốn dịch vụ đầy đủ. (Nguồn tham khảo: Google Maps; nguồn trong file; ngày kiểm: 06/11/2026). Đánh giá người dùng: chưa có đánh giá — bạn là người đầu tiên.
- **Sở chỉ huy chiến dịch Điện Biên Phủ (Mường Phăng)**: Rừng nguyên sinh và lán chỉ huy của Đại tướng Võ Nguyên Giáp — giá trị lịch sử lớn, không khí rừng rất trong. Điểm trừ là cách TP ~35 km đường rừng, vé 100.000đ theo một nguồn (khá cao so với các điểm khác). Hợp người yêu lịch sử và thiên nhiên; nên đi nửa ngày riêng. (Nguồn tham khảo: Google Maps; nguồn trong file; ngày kiểm: 06/11/2026). Đánh giá người dùng: chưa có đánh giá — bạn là người đầu tiên.
- **Suối khoáng nóng Uva**: Suối khoáng nóng giữa rừng, tắm khoáng sau ngày đi di tích rất thư giãn — được nhiều gia đình khen. Điểm trừ là giá tắm chưa kiểm được mức hiện hành. Hợp gia đình và người lớn tuổi; tránh ngâm quá lâu. (Nguồn tham khảo: Google Maps; nguồn trong file; ngày kiểm: 06/11/2026). Đánh giá người dùng: chưa có đánh giá — bạn là người đầu tiên.
- **Bản Mển (bản du lịch cộng đồng người Thái)**: Bản Thái làm du lịch cộng đồng, nhà sàn, văn nghệ và ẩm thực bản địa — trải nghiệm văn hóa thật hơn ở trung tâm TP. Điểm trừ là dịch vụ và giá chưa thống nhất, ít review công khai. Hợp người muốn ngủ bản và tìm hiểu văn hóa Thái; nên liên hệ trước. (Nguồn tham khảo: Google Maps; nguồn trong file; ngày kiểm: 06/11/2026). Đánh giá người dùng: chưa có đánh giá — bạn là người đầu tiên.
- **Cánh đồng Mường Thanh**: Cánh đồng lớn nhất Tây Bắc, lúa chín tháng 9–10 vàng rực — đẹp nhất khi nhìn từ đồi A1 hoặc tượng đài D1. Điểm trừ là nếu chỉ đi ngang đường thì khó cảm nhận hết, cần điểm ngắm cao. Hợp mùa lúa chín; ngoài mùa thì chỉ là đồng lúa thường. (Nguồn tham khảo: Google Maps; nguồn trong file; ngày kiểm: 06/11/2026). Đánh giá người dùng: chưa có đánh giá — bạn là người đầu tiên.
- **Đèo Pha Đin và Khu du lịch Pha Đin Top**: Đèo đẹp đúng danh tiếng tứ đại đỉnh đèo, Pha Đin Top làm du lịch khá chỉn chu với nhiều góc check-in và chợ phiên thứ 7. Điểm yếu là quá xa TP Điện Biên Phủ (~100 km) nên nhiều lịch trình phải bỏ qua — chỉ đáng đi nếu đang trên cung về Sơn La. Nên đi sáng sớm săn mây, tránh trưa nắng gắt. (Nguồn tham khảo: Báo Mới 07/08/2026; travelviet.net; ngày kiểm: 06/11/2026). Đánh giá người dùng: chưa có đánh giá — bạn là người đầu tiên.
- **Đền Hoàng Công Chất (Bản Phủ)**: Đền nhỏ, yên tĩnh, gắn với nhân vật lịch sử địa phương nên hợp người đã đi hết cụm A1 – bảo tàng và muốn thêm một điểm văn hóa gần. Điểm yếu là ít thông tin hướng dẫn và ít review công khai. Chỉ nên ghé 1 giờ, không dành cả buổi. (Nguồn tham khảo: Google Maps; dulichviet.com.vn; ngày kiểm: 06/11/2026). Đánh giá người dùng: chưa có đánh giá — bạn là người đầu tiên.
- **Cầu Mường Thanh (cầu sắt lịch sử)**: Điểm nhỏ nhưng ý nghĩa lịch sử thật, lại ngay cạnh đồi A1 nên ghé không tốn thêm thời gian. Điểm yếu là bản thân cầu không có hoạt động gì ngoài chụp ảnh. Hợp ghé 15 phút trên đường đi, không nên đi riêng. (Nguồn tham khảo: Google Maps; dulichviet.com.vn; ngày kiểm: 06/11/2026). Đánh giá người dùng: chưa có đánh giá — bạn là người đầu tiên.

### Món ăn
- **Pa pỉnh tộp (cá nướng)**: Cá nướng mắc khén thơm, thịt chắc — món dễ ăn nhất trong các món Tây Bắc. Điểm trừ là giá tính theo con, phải hỏi trước. Hợp mọi đối tượng, ăn trưa hoặc tối. (Nguồn tham khảo: Google Maps; nguồn trong file; ngày kiểm: 06/11/2026). Đánh giá người dùng: chưa có đánh giá — bạn là người đầu tiên.
- **Gà nướng mắc khén**: Gà bản nướng mắc khén thơm nồng, da giòn thịt ngọt — được nhiều du khách khen là món ngon nhất Điện Biên. Điểm yếu là giá theo con, không niêm yết. Hợp bữa tối theo nhóm. (Nguồn tham khảo: Google Maps; nguồn trong file; ngày kiểm: 06/11/2026). Đánh giá người dùng: chưa có đánh giá — bạn là người đầu tiên.
- **Xôi chim**: Xôi dẻo thơm, chim bồ câu hầm mềm — món lạ miệng, ăn no và ấm bụng. Điểm trừ là không phải quán nào cũng có, phải đặt trước. Hợp ăn tối, người muốn thử món đặc sản. (Nguồn tham khảo: Google Maps; nguồn trong file; ngày kiểm: 06/11/2026). Đánh giá người dùng: chưa có đánh giá — bạn là người đầu tiên.
- **Xôi nếp nương**: Nếp nương dẻo, thơm, ăn kèm thịt nướng hoặc muối vừng đều ngon — món ăn kèm không thể thiếu ở Điện Biên. Điểm yếu là chất lượng tùy quán. Hợp mọi bữa. (Nguồn tham khảo: Google Maps; nguồn trong file; ngày kiểm: 06/11/2026). Đánh giá người dùng: chưa có đánh giá — bạn là người đầu tiên.
- **Thịt lợn xay hấp lá chuối**: Thịt hấp lá chuối thơm, mềm, vị lạ — món bản địa ít nơi có. Điểm trừ là ít quán bán, phải hỏi người địa phương. Hợp người muốn thử món lạ. (Nguồn tham khảo: Google Maps; nguồn trong file; ngày kiểm: 06/11/2026). Đánh giá người dùng: chưa có đánh giá — bạn là người đầu tiên.
- **Cá suối nướng / cá sông Đà**: Cá tươi, nướng than thơm, ăn kèm rau rừng — món dân dã được khen nhiều. Điểm trừ là giá theo con, tùy loại cá. Hợp ăn tối theo nhóm. (Nguồn tham khảo: Google Maps; nguồn trong file; ngày kiểm: 06/11/2026). Đánh giá người dùng: chưa có đánh giá — bạn là người đầu tiên.
- **Thịt trâu gác bếp (mua làm quà)**: Trâu gác bếp chuẩn vị Tây Bắc, dai thơm mùi khói — mua làm quà rất hợp. Điểm trừ là giá cao và nhiều hàng giả, hàng pha. Nên mua ở cửa hàng quen hoặc nhờ người địa phương chỉ chỗ tin cậy. (Nguồn tham khảo: Google Maps; nguồn trong file; ngày kiểm: 06/11/2026). Đánh giá người dùng: chưa có đánh giá — bạn là người đầu tiên.
- **Lẩu cá / lẩu gà (món nhóm)**: Lẩu ấm người, nguyên liệu tươi — hợp bữa tối sau ngày đi di tích. Điểm trừ là giá chưa kiểm được mức riêng. Hợp nhóm 4–6 người. (Nguồn tham khảo: Google Maps; nguồn trong file; ngày kiểm: 06/11/2026). Đánh giá người dùng: chưa có đánh giá — bạn là người đầu tiên.

### Chỗ ở
Tất cả chỗ ở trong file đã được thêm mảng đánh giá người dùng (rỗng) trong JSON để app lưu đánh giá thật sau này. Đánh giá người dùng: chưa có đánh giá — bạn là người đầu tiên.

## 9. Mục chưa kiểm được / cần xác nhận lại (ghi rõ, không bịa)

1. Giá vé đồi A1 (5.000đ nguồn cũ vs ~20.000đ nguồn 2025) và giá vé Bảo tàng (40.000đ — chưa có nguồn chính thức)
2. Tọa độ GPS: hầm Đờ Cát (geocode trả về Buôn Ma Thuột — sai), bản Mển, cánh đồng Mường Thanh — để null; nghĩa trang A1 ghi theo khu vực đồi A1
3. Giờ mở cửa hầm Đờ Cát và suối khoáng Uva — chưa kiểm được giờ chính thức thống nhất
4. Giá vé tắm suối khoáng Uva — chưa kiểm được mức hiện hành
5. Giá vé hồ Pá Khoang và bản Mển — chưa kiểm được mức hiện hành
6. Hãng Vietjet có khai thác HAN–Điện Biên không — 1 nguồn ghi có, chưa kiểm được chắc chắn
7. Số nhà Mường Thanh Luxury Điện Biên đã chốt 16/11/2026 (42 Trần Đăng Ninh, phường Thanh Bình); khoảng giá trên của Thanh Nam, Frontier Hostel — chưa kiểm được
8. Giá taxi/thuê ô tô tại Điện Biên Phủ — chưa kiểm được mức riêng
9. Giá riêng từng món tại các quán (pa pỉnh tộp, thịt lợn hấp lá chuối, cá suối, lẩu) — chưa kiểm được mức riêng
10. Suối Hua Pe (Thanh Luông) vs suối Uva (Noong Luống) — 2 điểm khác nhau, dễ nhầm; file này chỉ ghi Uva

Cập nhật 06/11/2026: đã điền tọa độ cho mọi điểm từng null (không còn điểm null; 5 điểm tọa độ xấp xỉ trong tổng số 13 địa danh — xem ghi chú 'xấp xỉ, cần kiểm lại' trong bảng và trường toa_do_xap_xi trong JSON). Đã thêm 3 điểm du lịch gần, nhận xét của M cho 13 địa danh và 8 món ăn, mảng đánh giá người dùng (rỗng) cho mọi địa danh/chỗ ở/món ăn.

## 10. Cảnh báo chặt chém + lừa cọc (bổ sung 08/11/2026)

- **Chợ và điểm bán đặc sản Điện Biên (gạo Điện Biên, thịt trâu gác bếp): hàng cân thiếu, giá nói thách** Cách tránh: Mua ở cửa hàng có bảng giá niêm yết; yêu cầu cân lại trước mặt, hỏi giá/kg trước khi chọn (Nguồn: kinh nghiệm chung du lịch Điện Biên; chưa tra được bài báo chính thống riêng (ngày kiểm 08/11/2026))
- **Thuê xe máy ở Điện Biên Phủ đi Mường Phăng, Pha Đin: giữ giấy tờ gốc, xe yếu leo đèo; trả xe bị bắt đền vết xước** Cách tránh: Thuê xe số ở cửa hàng/homestay uy tín; kiểm tra phanh/lốp/đèn, chụp ảnh vết xước trước khi nhận; hỏi rõ cọc và phạm vi đi (Nguồn: kinh nghiệm chung thuê xe vùng cao (ngày kiểm 08/11/2026))
- **Xe ôm, hướng dẫn tự phát ở đồi A1, hầm Đờ Cát: mời chào dai dẳng, thu phí hướng dẫn không báo trước** Cách tránh: Thuê thuyết minh tại điểm di tích (theo dữ liệu tỉnh, có thuyết minh tại chỗ); hỏi giá trước khi đồng ý đi cùng (Nguồn: dữ liệu tỉnh Điện Biên (ngày kiểm 06/11/2026) (ngày kiểm 08/11/2026))
- **Homestay bản Mển, bản du lịch cộng đồng: đặt online khác ảnh thật, phụ thu ăn uống, đưa đón** Cách tránh: Nhắn hỏi chủ nhà về bữa ăn, phí đưa đón và tiện nghi thật trước khi đặt; đọc đánh giá gần nhất (Nguồn: kinh nghiệm chung du lịch Điện Biên; chưa tra được nguồn chính thống riêng (ngày kiểm 08/11/2026))


## 11. An toàn đường đèo + thuê xe máy (bổ sung 08/11/2026)

Đèo Pha Đin phía Điện Biên (QL6, xã Tỏa Tình, Tuần Giáo): dài 32 km chung với phía Sơn La, điểm cao nhất 1.648 m, một bên vách núi một bên vực sâu, 8 cung cua nguy hiểm bán kính dưới 15 m, nhiều khúc cua tay áo, cua chữ A, chữ Z, có đoạn chỉ đủ một ô tô đi qua; lưng chừng đèo thường mịt mờ mây phủ, sương tan khoảng 8:30–9:00. Tuyến QL6 mới thấp hơn đèo cũ 200–400 m, ít dốc hơn — tay lái yếu nên đi tuyến mới. Đường đi Mường Phăng (Sở chỉ huy chiến dịch), hồ Pá Khoang, suối khoáng Uva: dốc, hẹp, trơn mùa mưa tháng 5–8; tránh đi ban đêm. Kiểm tra phanh/lốp/đèn, đổ đầy xăng trước khi vào tuyến đèo; mang CCCD/hộ chiếu và giấy tờ xe đầy đủ; tháng 3 hoa ban nở, đường đông khách, đi sớm tránh ùn tắc ở điểm dừng đèo.

**Đèo/đoạn cần chú ý:**
- Đèo Pha Đin phía Điện Biên (QL6, Tuần Giáo): dài 32 km, cao 1.648 m, 8 cung cua nguy hiểm, sương mù thường trực
- Đường lên Sở chỉ huy Mường Phăng và hồ Pá Khoang: dốc, hẹp, trơn mùa mưa
- QL6 đoạn Tuần Giáo – Điện Biên Phủ: đèo dốc, xe lớn nhiều

(Nguồn: 2banh.vn; dailytourviet.vn — đèo Pha Đin (ngày kiểm 08/11/2026); alltours.vn — Đèo Pha Đin huyền ảo mây vờn (sương tan 8:30–9:00) (ngày kiểm 08/11/2026))


## 12. Số khẩn cấp + xử lý sự cố (bổ sung 08/11/2026)

- Công an: 113 — Cấp cứu: 115 — Cứu hỏa: 114
- Bệnh viện Đa khoa tỉnh Điện Biên — Tổng đài: 1900 638 367 (Nguồn: phongkhambacsi.vn — danh bạ Bệnh viện Đa khoa tỉnh Điện Biên (ghi rõ đây là số tổng đài theo trang danh bạ, chưa đối chiếu trực tiếp website bệnh viện) (ngày kiểm 08/11/2026))

(Nguồn: số chung cả nước 113/115/114 là số khẩn cấp quốc gia; số riêng theo nguồn ghi trong từng mục (ngày kiểm 08/11/2026))


## 13. Giờ đẹp chụp ảnh (bổ sung 08/11/2026)

| # | Điểm | Giờ đẹp | Nguồn |
|---|---|---|---|
| 1 | Đồi A1 | 6:30-8:00 sáng sớm mát, nắng xiên; 16:00-17:00 chiều muộn (tránh trưa nắng gắt) | dữ liệu tỉnh Điện Biên (ngày kiểm 06/11/2026) (ngày kiểm 08/11/2026) |
| 2 | Tượng đài Chiến thắng Điện Biên Phủ (đồi D1) | 5:30-7:00 bình minh toàn cảnh TP; 16:30-18:00 hoàng hôn | dữ liệu tỉnh Điện Biên (ngày kiểm 06/11/2026) (ngày kiểm 08/11/2026) |
| 3 | Cánh đồng Mường Thanh | 6:00-7:30 sáng sớm lúa chín tháng 9–10; 16:30-17:30 hoàng hôn | dữ liệu tỉnh Điện Biên (ngày kiểm 06/11/2026) (ngày kiểm 08/11/2026) |


## 14. Cho người chạy giải (bổ sung 08/11/2026)

**Giải chạy (đã kiểm nguồn):**
- THACO Marathon Vì an toàn giao thông – Điện Biên Phủ — tháng 4 (2024: 14/4, cự ly 5/10/21/42/70 km, xuất phát Tượng đài Chiến thắng, đồi D1) (Nguồn: svhttdl.dienbien.gov.vn — Sở Văn hóa, Thể thao và Du lịch tỉnh Điện Biên (ngày kiểm 08/11/2026))
- Tiền Phong Marathon – Điện Biên Discovery — cuối tháng 12 – đầu tháng 1 (2026–2027: 31/12/2026–2/1/2027; cự ly 5/10/21/48 km) (Nguồn: tienphong.vn — Tiền Phong Marathon Điện Biên Discovery (ngày kiểm 08/11/2026))
- Giải chạy địa hình chinh phục đỉnh Pu Tó Cọ – Theo dấu chân Đại tướng — tháng 11 (2026: 28/11, cự ly 6/16/26 km, xã Mường Phăng) (Nguồn: vietnam.vn — Giải chạy chinh phục đỉnh Pu Tó Cọ 2026 (ngày kiểm 08/11/2026))

**Điểm chạy bộ đẹp:** Quanh Tượng đài Chiến thắng (đồi D1) và đồi A1 buổi sáng sớm; Đường ven cánh đồng Mường Thanh; Đường quanh hồ Pá Khoang.

**Chỗ ở gần điểm xuất phát** (lấy từ mục chỗ ở đã có): Mường Thanh Grand Điện Biên Phủ; Mường Thanh Luxury Điện Biên; Khách sạn Him Lam (Him Lam Resort).

(Nguồn: svhttdl.dienbien.gov.vn; tienphong.vn; vietnam.vn (ngày kiểm 08/11/2026); chỗ ở lấy từ dữ liệu tỉnh Điện Biên (ngày kiểm 06/11/2026))
