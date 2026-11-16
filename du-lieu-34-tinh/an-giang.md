# Dữ liệu cẩm nang An Giang — Giai đoạn 1 (đầy đủ)

- **Trạng thái: published** — đẩy lên theo lệnh anh ngày 06/11/2026 (đẩy hết lên, bỏ vòng duyệt chuyên gia; các nợ dữ liệu vẫn giữ nguyên, xem mục 9).
- Ngày kiểm: 06/11/2026. Mọi giá đều là **khoảng giá tham khảo** từ nguồn công khai, không phải giá chốt. Giá đổi theo mùa, cuối tuần, lễ Tết — kiểm lại trước ngày đi.
- Bổ sung 08/11/2026: số điện thoại chỗ ở (cột Điện thoại, mục 2) + mục 2B Trời mưa thì đi đâu + mục 2C Cho cặp đôi + mục 2D Mùa + tháng đẹp nhất. Số điện thoại tra từ nguồn công khai ngày 08/11/2026; chỗ nào ghi 'Chưa tra được' là chưa tìm thấy số khớp tên + địa chỉ.
- Nguồn sự thật: nghiên cứu từ nguồn công khai ngày 06/11/2026 (tên miền nguồn ghi ở từng mục).
- **Lưu ý địa giới:** từ 01/07/2025, An Giang và Kiên Giang hợp nhất thành tỉnh An Giang mới, trung tâm tỉnh đặt ở Rạch Giá. File này tập trung vào **vùng An Giang cũ** (Châu Đốc, Núi Sam, Bảy Núi, Trà Sư, Long Xuyên), trung tâm tính khoảng cách là TP Châu Đốc theo nhiệm vụ; các điểm thuộc khu vực Kiên Giang cũ (Phú Quốc, Hà Tiên, Rạch Giá, Nam Du…) chưa nhập trong đợt này (xem mục 9). Đợt 06/11/2026 đã thêm 3 điểm khu vực Kiên Giang cũ (Mũi Nai, Thạch Động, Cổng Tam Quan Rạch Giá), chỉ điểm gần, cùng cụm di chuyển được; Phú Quốc/Nam Du xa cụm nên chưa nhập.
- **Khách sạn/homestay: CHỈ giới thiệu sơ.** Tất cả đều ghi "chưa kiểm chứng / chưa đối tác / chưa thu phí". Không dùng chữ uy tín/đảm bảo. Không nhận đặt phòng, không nhận tiền.
- Khoảng cách là đường đi ước tính theo nguồn, không phải đường chim bay. Tọa độ ghi "chưa kiểm được" thì để null trong file JSON, không bịa.
- File JSON máy đọc được: `an-giang.json` (cùng thư mục).

## 1. Địa danh — 13 điểm chính

Mốc tính khoảng cách: TP Châu Đốc.

### 1.1. Cụm Châu Đốc — Núi Sam

| # | Tên | Địa chỉ | Tọa độ | Cách trung tâm | Giá vé | Giờ mở cửa | Thời gian | Hợp với ai | Lưu ý | Nguồn |
|---|---|---|---|---|---|---|---|---|---|---|
| 1 | Miếu Bà Chúa Xứ Núi Sam | Đường Vòng Núi Sam, phường Núi Sam (nay phường Vĩnh Tế), TP Châu Đốc | 10.68202, 105.07975 | ~6–7 km | Miễn phí vào miếu (lễ vật, giữ xe tính riêng; coi chừng người mời mua lễ/xin xăm/coi bói — từ chối dứt khoát nếu không mua, đồ lễ nên mua ở sạp có niêm yết giá) | 5:00–22:00 (theo viet-travel, cập nhật 09/2026) | 1–1,5 giờ | Người hành hương, gia đình, mọi đối tượng | Lễ hội Vía Bà Chúa Xứ 22–27 tháng 4 Âm lịch (năm 2026 rơi vào 19–24/5 dương lịch), rất đông — đặt phòng trước; lễ hội được UNESCO ghi danh di sản văn hóa phi vật thể đại diện của nhân loại ngày 04/12/2024 | nucuoimekong.com, travelbui.com, viet-travel.congtan5918.workers.dev |
| 2 | Lăng Thoại Ngọc Hầu | Đường Vòng Núi Sam, phường Núi Sam, TP Châu Đốc (sát Miếu Bà) | 10.68239, 105.07923 | ~6–7 km | Miễn phí | Ban ngày (đi cùng cung Miếu Bà) | 30–45 phút | Người thích lịch sử, khách hành hương | Nơi an nghỉ của Thoại Ngọc Hầu — vị quan có công đào kênh Vĩnh Tế; đi bộ vài phút từ Miếu Bà | saigonstartravel.com, travelbui.com |
| 3 | Chùa Tây An (Tây An Cổ Tự) | Đường Vòng Núi Sam, phường Núi Sam, TP Châu Đốc | 10.68147, 105.0811 | ~6–7 km | Miễn phí | Ban ngày | 30–45 phút | Người thích kiến trúc/tâm linh | Xây năm 1847, mái vòm và tháp mang dáng kiến trúc Ấn Độ pha lối Việt, di tích kiến trúc nghệ thuật cấp quốc gia | travelbui.com, dicungdien.com |
| 4 | Chùa Hang — Phước Điền Tự | Sườn núi Sam, QL91, phường Núi Sam, TP Châu Đốc | 10.67684, 105.07309 | ~6 km | Miễn phí | Ban ngày | 45–60 phút | Người thích tâm linh/truyền thuyết, gia đình | Di tích Lịch sử — Văn hóa cấp Quốc gia; gắn truyền thuyết đôi rắn thần; leo bậc đá lên chùa, mang giày bệt | nucuoimekong.com, dicungdien.com |
| 5 | Chợ Châu Đốc | Đường Bạch Đằng, phường Châu Phú A, TP Châu Đốc | Chưa kiểm được tọa độ chính xác | ~1–2 km | Miễn phí vào chợ (mua sắm/ăn uống tính riêng) | Chợ họp ban ngày, đông nhất buổi sáng | 1–1,5 giờ | Mọi đối tượng, người thích chợ/mắm | Chợ mắm nổi tiếng — nhiều loại mắm cá linh, cá lóc, cá sặc (100.000–200.000đ/kg); hỏi giá trước khi mua | mytour.vn, tiphay.vn, travelbui.com |

### 1.2. Cụm Bảy Núi — Tịnh Biên — Tri Tôn

| # | Tên | Địa chỉ | Tọa độ | Cách trung tâm | Giá vé | Giờ mở cửa | Thời gian | Hợp với ai | Lưu ý | Nguồn |
|---|---|---|---|---|---|---|---|---|---|---|
| 6 | Rừng tràm Trà Sư | Ấp Văn Trà, xã An Cư (xã Văn Giáo theo một số nguồn), huyện Tịnh Biên; cách Châu Đốc 20–30 km theo QL91 và đường Tân Lộ Kiều Lương | 10.58439, 105.05902 | ~25–30 km | Vé vào cổng 120.000đ/khách (điều chỉnh từ 100.000đ tháng 07/2026); tàu máy 70.000đ/khách/lượt; xuồng chèo tay 70.000đ/khách/lượt; trọn gói 200.000–260.000đ/người (mức mới nhất 07/2026 là 260.000đ — sundaygo.vn; kiểm 08/11/2026); trẻ em dưới 1,3 m miễn phí vé cổng | 6:30–17:30 (một số nguồn ghi 7:00–17:00/17:15) | 2–3 giờ | Mọi đối tượng, gia đình, người thích thiên nhiên/chụp ảnh | Đẹp nhất mùa nước nổi tháng 9–11 (bèo xanh phủ mặt nước); khung giờ vàng 7:00–9:00 và 15:30–17:00 (chim về tổ); đi tắc ráng (xuồng máy) rồi đổi xuồng chèo vào lối nhỏ | izitour.com, ivivu.com, mia.vn, tourdulichbentre.com |
| 7 | Khu du lịch Lâm Viên Núi Cấm | Xã An Hảo, huyện Tịnh Biên; cách Châu Đốc ~37 km, cách Long Xuyên ~63 km; núi cao nhất dãy Thất Sơn (705 m) | 10.4886, 105.02272 (tọa độ cổng vào KDL) | ~37 km | Vé vào cổng 20.000đ/người lớn, 10.000đ/trẻ em 1–1,3 m; cáp treo khứ hồi 300.000đ/người lớn, 200.000đ/trẻ em (lên 180.000đ, xuống 120.000–140.000đ — các nguồn ghi khác nhau, xem mục 9); xe lên đỉnh khứ hồi ~180.000đ/người lớn | Cáp treo 7:00–17:00 hằng ngày | Nửa ngày (3–4 giờ) | Gia đình, người lớn tuổi (đi cáp treo), người thích leo núi/tâm linh | Trên núi có chùa Vạn Linh, chùa Phật Lớn, hồ Thủy Liêm, Vồ Thiên Tuế; đi cáp treo ~15 phút; không tự chạy xe máy/ô tô lên đỉnh; đi bộ leo mất 1,5–2 giờ | dulich.pro.vn, thamhiemmekong.com, klook.com |
| 8 | Làng Chăm Châu Giang (Châu Phong) | Xã Châu Phong, thị xã Tân Châu; qua phà Châu Giang từ Châu Đốc | 10.70991, 105.12872 (tọa độ bến phà Châu Giang, mức khu vực) | ~5 km (qua phà) | Miễn phí tham quan làng; vé phà 5.000–30.000đ/lượt tùy phương tiện | Ban ngày; tránh giờ làm lễ ở thánh đường | 1,5–2 giờ | Người thích văn hóa Chăm/Hồi giáo, nhiếp ảnh | Thánh đường Jamiul Azhar Mosque (tổ 8, ấp Châu Giang) miễn phí tham quan, tránh giờ làm lễ; làng giữ nếp sống truyền thống người Chăm; thử món tung lò mò (lạp xưởng bò) | dicungdien.com, klook.com |

### 1.3. Cụm Tri Tôn — Long Xuyên

| # | Tên | Địa chỉ | Tọa độ | Cách trung tâm | Giá vé | Giờ mở cửa | Thời gian | Hợp với ai | Lưu ý | Nguồn |
|---|---|---|---|---|---|---|---|---|---|---|
| 9 | Tà Pạ (cánh đồng — hồ — chùa Tà Pạ) | Xã Núi Tô, huyện Tri Tôn | Chưa kiểm được tọa độ chính xác | ~45–50 km (ước tính, chưa kiểm được chính xác) | Miễn phí (tham quan tự do) | Ban ngày | 1,5–2 giờ | Người thích chụp ảnh/phượt, cặp đôi | Lúa chín đẹp nhất cuối tháng 11–đầu tháng 12; hồ Tà Pạ, chùa Tà Pạ trên đồi; đường Tri Tôn quanh co, đi xe máy cẩn thận | travelbui.com |
| 10 | Chợ nổi Long Xuyên | Trên sông Hậu, TP Long Xuyên (bến phà Ô Môi) | Chưa kiểm được tọa độ chính xác | ~60 km | Thuê ghe 150.000–200.000đ/chuyến (tùy ghe, nên thỏa giá trước) | Họp sáng sớm (đi từ ~5–6h) | 1,5–2 giờ buổi sáng | Người thích chợ nổi/sông nước | Chợ nổi còn giữ nét buôn bán thật, ít du lịch hóa hơn Cái Răng; đi từ Long Xuyên, có thể ghép cùng ngày về Châu Đốc | dicungdien.com |

### 1.4. Cụm mở rộng — khu vực Kiên Giang cũ (thêm 06/11/2026)

| # | Tên | Địa chỉ | Tọa độ | Cách trung tâm | Giá vé | Giờ mở cửa | Thời gian | Hợp với ai | Lưu ý | Nguồn |
|---|---|---|---|---|---|---|---|---|---|---|
| 11 | Bãi biển Mũi Nai | Phường Pháo Đài, TP Hà Tiên (khu vực Kiên Giang cũ, nay thuộc tỉnh An Giang mới) | 10.37915, 104.4822 | ~90 km | Miễn phí vào bãi (ghế, tắm nước ngọt tính riêng, chưa kiểm được mức riêng) | Cả ngày; tắm đẹp nhất buổi chiều | 2–3 giờ | Gia đình, nhóm bạn, khách thích biển | Thuộc khu vực Kiên Giang cũ, xa Châu Đốc ~90 km — nên đi trong ngày riêng Hà Tiên hoặc ngủ lại Hà Tiên. Bãi cát đen đặc trưng, nước không trong như Phú Quốc; có cáp treo lên núi Tà Bàng ngắm vịnh. Tránh mùa mưa sóng lớn. | mia.vn, dulichviet.com.vn |
| 12 | Thạch Động (Thạch Động Thôn Vân) | QL80, phường Mỹ Đức, TP Hà Tiên (khu vực Kiên Giang cũ, nay thuộc tỉnh An Giang mới) | 10.40977, 104.47517 | ~85 km | Chưa kiểm được giá vé riêng | Ban ngày | 1–1,5 giờ | Người thích truyền thuyết, hang động, gia đình | Thuộc khu vực Kiên Giang cũ. Núi đá vôi gắn truyền thuyết Thạch Sanh, có chùa Tiên Sơn trong hang. Đi cùng cụm Hà Tiên với Mũi Nai. Đường lên dốc đá, mang giày chống trơn. | mia.vn, dulichviet.com.vn |
| 13 | Cổng Tam Quan (Rạch Giá) | 339 Nguyễn Trung Trực, phường Vĩnh Lạc, TP Rạch Giá (khu vực Kiên Giang cũ, nay thuộc tỉnh An Giang mới; trung tâm tỉnh đặt tại Rạch Giá) | 9.99803, 105.0918 | ~95 km | Miễn phí | Cả ngày | 30 phút ghé chụp ảnh | Mọi đối tượng, khách quá cảnh Rạch Giá | Thuộc khu vực Kiên Giang cũ; Rạch Giá là trung tâm hành chính của tỉnh An Giang mới. Cổng là biểu tượng thành phố, chỉ là điểm ghé chụp ảnh, không cần đi riêng. Kết hợp ăn hải sản Rạch Giá và đi phà ra Phú Quốc/Nam Du nếu có thời gian. | mia.vn, dulichviet.com.vn |

## 2. Ở đâu — 8 chỗ ở (CHỈ GIỚI THIỆU SƠ)

**Tất cả các mục dưới đây: "Thông tin tham khảo, chưa kiểm chứng trực tiếp, chưa phải đối tác, chưa thu phí. Người dùng tự kiểm tra giá / phòng trống trước khi đặt." Không dùng chữ uy tín/đảm bảo. Không nhận đặt phòng, không nhận tiền.**
**Lưu ý:** danh sách Châu Đốc mỏng hơn các tỉnh khác — chỉ 3 chỗ có địa chỉ + giá kiểm được; 3 chỗ còn lại chỉ có tên + khoảng giá, địa chỉ chi tiết chưa kiểm được (ghi rõ trong bảng).

| # | Tên | Địa chỉ | Khu vực | Hạng | Khoảng giá/đêm ngày thường | Điện thoại | Cách Miếu Bà | Hợp với ai | Trạng thái | Nguồn |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| 1 | Khách sạn Victoria Châu Đốc | Số 1 Lê Lợi, phường Châu Phú B, TP Châu Đốc (bờ sông Hậu) | Trung tâm Châu Đốc, bờ sông | 4 sao | ~1.700.000–2.050.000đ/đêm (Superior từ 2.050.000đ; Deluxe từ 2.440.000đ; một số nguồn ghi từ 1.500.000đ hoặc 3.200.000đ — xem mục 9) | 0296 3865 010 | ~6–7 km | Gia đình, cặp đôi muốn nghỉ dưỡng ven sông, khách hành hương cao cấp | Chưa kiểm chứng / chưa đối tác / chưa thu phí | khachsan.chudu24.com, traveloka.com, vivutour.vn, homecredit.vn |
| 2 | Victoria Núi Sam Lodge | Vĩnh Đông 1, phường Núi Sam, TP Châu Đốc | Chân Núi Sam | 4 sao (lodge) | ~1.400.000–2.000.000đ/đêm (một nguồn ghi 1.500.000–3.000.000đ) | 0296 3575 888 | Sát Miếu Bà, view toàn cảnh Châu Đốc từ trên cao | Cặp đôi, gia đình đi lễ Núi Sam | Chưa kiểm chứng / chưa đối tác / chưa thu phí | traveloka.com, vietfuntravel.com.vn, tadiha.com, 2banh.vn |
| 3 | The CK Hotel (tên cũ: Khách sạn Trung Nguyễn) | 86 Bạch Đằng, TP Châu Đốc | Trung tâm, cạnh chợ Châu Đốc | Chưa kiểm được hạng | Từ ~325.000đ/đêm (Planet of Hotels ghi từ ~$13, trung bình ~$24 ~600.000đ) | 0296 3561 561 | ~6–7 km | Khách bụi, khách hành hương tiết kiệm | Chưa kiểm chứng / chưa đối tác / chưa thu phí | 2banh.vn |
| 4 | Khách sạn Châu Phố | TP Châu Đốc (địa chỉ chi tiết chưa kiểm được) | Châu Đốc | Chưa kiểm được hạng | Từ ~990.000đ/đêm | 0296 3564 139 | Chưa kiểm được | Gia đình, khách hành hương | Chưa kiểm chứng / chưa đối tác / chưa thu phí | vietfuntravel.com.vn |
| 5 | Phi Mai Hotel | Tổ 7, đường Lê Đại Cương, khóm Vĩnh Đông 2, phường Núi Sam, TP Châu Đốc (khu Núi Sam, cách chợ Châu Đốc ~6–7 km, không phải gần chợ) | Núi Sam | Chưa kiểm được hạng | Từ ~529.000đ/đêm | 0979 017 395 | ~6–7 km | Khách tiết kiệm, khách đi Núi Sam/Miếu Bà | Chưa kiểm chứng / chưa đối tác / chưa thu phí | traveloka.com |
| 6 | Khách sạn Hải Châu | 63 Trương Nguyệt Anh, phường Châu Phú A, TP Châu Đốc | Châu Đốc | Chưa kiểm được hạng | Chưa kiểm được khoảng giá | 0296 6260 066 | Chưa kiểm được | Khách hành hương bình dân | Chưa kiểm chứng / chưa đối tác / chưa thu phí | 2banh.vn |

| 7 | Khách sạn Hùng Cường | 96 Đống Đa, TP Châu Đốc | chau-doc | 3 sao | Từ ~550.000đ/đêm (các nguồn ghi 550.000–1.050.000đ/đêm — chênh lớn theo kênh/thời điểm) | 0296 3568 111 | Trung tâm Châu Đốc, cách Miếu Bà ~5 km | Gia đình, khách muốn ở trung tâm Châu Đốc, view sông | Chưa kiểm chứng / chưa đối tác / chưa thu phí | traveloka.com, vietnambooking.com, datviettour.com.vn |
| 8 | Khách sạn Hòa Bình | 130 Trần Hưng Đạo, Phường Mỹ Bình, TP Long Xuyên | long-xuyen | 3 sao | Từ ~800.000–1.200.000đ/đêm (theo nguồn công khai) | 0296 6252 999 | Trung tâm Long Xuyên, ~60 km từ Châu Đốc | Khách công tác, gia đình nghỉ tại Long Xuyên | Chưa kiểm chứng / chưa đối tác / chưa thu phí | datviettour.com.vn |

## 2B. Trời mưa thì đi đâu (bổ sung 08/11/2026)

Các điểm dưới đây đều đã có trong mục 1, chỉ chọn những điểm có mái che/không gian trong nhà, đi mưa được:

- Chùa Tây An (Tây An Cổ Tự)
- Miếu Bà Chúa Xứ Núi Sam
- Lăng Thoại Ngọc Hầu
- Chợ Châu Đốc

Dặn: Mưa thì ghé chùa/miếu và chợ có mái — tránh Trà Sư, Núi Cấm, Tà Pạ vì đường trơn và toàn ngoài trời.

## 2C. Cho cặp đôi (bổ sung 08/11/2026)

Chỗ ở hợp cặp đôi (theo mục 'Hợp với ai' trong file):

- Khách sạn Victoria Châu Đốc
- Victoria Núi Sam Lodge

Điểm hợp cặp đôi (từ mục 1):

- Rừng tràm Trà Sư
- Tà Pạ (cánh đồng — hồ — chùa Tà Pạ)
- Bãi biển Mũi Nai
- Miếu Bà Chúa Xứ Núi Sam

## 2D. Mùa + tháng đẹp nhất (bổ sung 08/11/2026)

- Tháng đẹp nhất: Tháng 9–11 (mùa nước nổi: Trà Sư bèo xanh đẹp nhất); tháng 3–5 (mùa khô, đường núi dễ đi); lễ hội Vía Bà Chúa Xứ 22–27 tháng 4 Âm lịch; lúa Tà Pạ chín cuối tháng 11–đầu tháng 12
- Nguồn: meta.best_season trong file (nghiên cứu ngày 06/11/2026; nguồn tổng xem meta.nguon_tong)
- Ngày kiểm: 06/11/2026

## 3. Ăn gì — 9 món (đủ quán + địa chỉ + khoảng giá)

| # | Món | Buổi ăn | Khoảng giá | Quán tham khảo (địa chỉ) | Nguồn |
|---|---|---|---|---|---|
| 1 | Bún cá Châu Đốc (bún nước lèo) | Ăn sáng / ăn trưa | 15.000–25.000đ/tô (một nguồn ghi 30.000–50.000đ/tô tại chợ Châu Đốc — xem mục 9) | (1) Bún cá Vân — 105 Phan Đình Phùng, phường Châu Phú B, TP Châu Đốc. (2) Quán bún cá Châu Đốc — 22 Nguyễn Thái Học, phường Mỹ Bình, TP Long Xuyên | mytour.vn, tripi.vn, tiphay.vn |
| 2 | Lẩu mắm Châu Đốc | Ăn trưa / ăn tối (món nhóm) | 100.000–150.000đ/phần 4 người (một nguồn ghi 150.000–300.000đ — xem mục 9) | (1) Hội quán Châu Đốc — 64 Hoàng Diệu, phường Châu Phú B, TP Châu Đốc. (2) Quán ăn Bảy Bồng 2 — 121 Trưng Nữ Vương, phường Châu Phú B, TP Châu Đốc | mytour.vn, tripi.vn, tiphay.vn |
| 3 | Bò bảy món Núi Sam | Ăn trưa / ăn tối (món nhóm) | 50.000–150.000đ/món (một nguồn ghi 150.000–300.000đ/người — xem mục 9) | (1) Quán bò Tư Thiêng — 654 Khóm Vĩnh Tây, phường Núi Sam, TP Châu Đốc. (2) Quán bò 7 món Trường Nhựt — Tân Lộ Kiều Lương, phường Núi Sam, TP Châu Đốc | mytour.vn, tripi.vn, tiphay.vn |
| 4 | Bánh bò thốt nốt | Ăn xế / mua về | Chưa kiểm được giá riêng | (1) Chợ Châu Đốc — đường Bạch Đằng, phường Châu Phú A, TP Châu Đốc. (2) Chợ Tịnh Biên — 350 Khóm Xuân Hòa, huyện Tịnh Biên | mytour.vn, klook.com |
| 5 | Gỏi sầu đâu | Ăn trưa / ăn tối | Chưa kiểm được giá riêng | (1) Hội quán Châu Đốc — 64 Hoàng Diệu, phường Châu Phú B, TP Châu Đốc | klook.com |
| 6 | Canh chua cá linh bông điên điển (mùa nước nổi) | Ăn trưa | 30.000–50.000đ/tô | (1) Quán ăn Bảy Bồng 2 — 121 Trưng Nữ Vương, phường Châu Phú B, TP Châu Đốc | mytour.vn, tiphay.vn |
| 7 | Mắm Châu Đốc (mua về) | Mua về làm quà | ~100.000–200.000đ/kg | (1) Chợ Châu Đốc — đường Bạch Đằng, phường Châu Phú A, TP Châu Đốc | mytour.vn, tiphay.vn |
| 8 | Tung lò mò (lạp xưởng bò, người Chăm) | Ăn xế / mua về | Chưa kiểm được giá riêng | (1) Làng Chăm Châu Giang — xã Châu Phong, thị xã Tân Châu (mua tại làng) | dicungdien.com |
| 9 | Lẩu cá linh bông điên điển (mùa nước nổi) | Ăn trưa / ăn tối (món nhóm) | Chưa kiểm được giá riêng tại Châu Đốc (tham khảo chung miền Tây 120.000–250.000đ/nồi) | (1) Hội quán Châu Đốc — 64 Hoàng Diệu, phường Châu Phú B, TP Châu Đốc | viet-travel.congtan5918.workers.dev |

## 3B. Nhận xét của M (06/11/2026) + đánh giá người dùng

Nhận xét dưới đây là chính kiến của M sau khi đọc review/bài viết tham khảo (nguồn ghi ở từng mục), không copy nguyên văn review, không bịa số sao. Mâu thuẫn giữa các nguồn được ghi rõ trong nhận xét. Đánh giá người dùng đang trống — app sẽ lưu đánh giá thật sau này.

### Địa danh

- **Miếu Bà Chúa Xứ Núi Sam** — Miếu Bà Chúa Xứ là trung tâm tín ngưỡng lớn nhất Nam Bộ, linh thiêng và lúc nào cũng đông — đi viếng thì đáng, đi chơi thì nên cân nhắc. Điểm mạnh là không gian trang nghiêm, lễ vía Bà (22–27 tháng 4 Âm lịch) đã được UNESCO ghi danh; điểm yếu là rất đông, khói nhang nồng, quanh miếu nhiều người chèo kéo mua lễ, giá cả đắt đỏ (theo phản ánh trên Foody). Hợp với khách hành hương, nên đi ban đêm sau 12h cho thanh tịnh, tránh mùa lễ nếu sợ chen lấn, giữ kỹ tư trang. _(Nguồn tham khảo: foody.vn / laodong.vn / buulong.com.vn; ngày kiểm 06/11/2026)_ — Đánh giá người dùng: chưa có đánh giá — bạn là người đầu tiên.
- **Lăng Thoại Ngọc Hầu** — Lăng Thoại Ngọc Hầu nằm sát Miếu Bà, là nơi an nghỉ của người khai phá vùng đất này — đi cùng cung Miếu Bà thì tiện, nhưng ít người biết nên thường vắng. Điểm mạnh là miễn phí, kiến trúc cổ, không gian yên tĩnh; điểm yếu là ít thông tin trưng bày, đi không có người kể thì khó cảm hết. Hợp với người thích lịch sử, nên ghép với Miếu Bà và Chùa Tây An trong cùng buổi. _(Nguồn tham khảo: saigonstartravel.com / travelbui.com; ngày kiểm 06/11/2026)_ — Đánh giá người dùng: chưa có đánh giá — bạn là người đầu tiên.
- **Chùa Tây An (Tây An Cổ Tự)** — Chùa Tây An cổ kính, kiến trúc pha Ấn–Hồi độc đáo ngay chân núi Sam — đẹp và yên hơn Miếu Bà nhiều. Điểm mạnh là miễn phí, khuôn viên mát, chụp ảnh đẹp; điểm yếu là ít được quảng bá nên nhiều đoàn bỏ qua. Hợp với người thích kiến trúc chùa, nên đi cùng cung Miếu Bà — Lăng Thoại Ngọc Hầu. _(Nguồn tham khảo: travelbui.com / dicungdien.com; ngày kiểm 06/11/2026)_ — Đánh giá người dùng: chưa có đánh giá — bạn là người đầu tiên.
- **Chùa Hang — Phước Điền Tự** — Chùa Hang (Phước Điền Tự) nằm trên sườn núi Sam, có hang đá và tượng Phật — đi lên vừa viếng vừa ngắm cảnh Châu Đốc từ trên cao. Điểm mạnh là miễn phí, không gian núi non mát mẻ; điểm yếu là phải leo bậc đá, người lớn tuổi và trẻ nhỏ nên đi chậm. Hợp với khách hành hương và người thích leo núi nhẹ, nên đi buổi sáng. _(Nguồn tham khảo: nucuoimekong.com / dicungdien.com; ngày kiểm 06/11/2026)_ — Đánh giá người dùng: chưa có đánh giá — bạn là người đầu tiên.
- **Chợ Châu Đốc** — Chợ Châu Đốc là chợ đầu mối mắm lớn nhất miền Tây — đi chợ buổi sáng, nếm mắm, mua đặc sản mới đúng chất Châu Đốc. Điểm mạnh là hàng hóa phong phú, giá mềm, người bán nhiệt tình; điểm yếu là chợ đông, mùi mắm nồng, dễ bị mời mua liên tục. Hợp với người thích ẩm thực và mua đặc sản, nên đi sáng sớm, mặc cả nhẹ nhàng. _(Nguồn tham khảo: mytour.vn / tiphay.vn / travelbui.com; ngày kiểm 06/11/2026)_ — Đánh giá người dùng: chưa có đánh giá — bạn là người đầu tiên.
- **Rừng tràm Trà Sư** — Trà Sư là điểm sinh thái đẹp nhất An Giang mùa nước nổi: xuồng chèo len qua thảm bèo xanh, chim về tổ chiều tà — cảnh này không nơi nào giống. Điểm mạnh là trải nghiệm xuồng ba lá rất đáng tiền; điểm yếu là vé tổng (vào cổng 120.000đ + tàu 70.000đ + xuồng 70.000đ = 260.000đ theo giá mới nhất 07/2026; các nguồn khác ghi trọn gói 200.000–250.000đ), mùa khô bèo thưa thì kém đẹp hẳn. Hợp với người thích thiên nhiên và chụp ảnh, nên đi tháng 9–11, sáng sớm 6–9h hoặc chiều 15–17h. _(Nguồn tham khảo: mia.vn / tourdulichbentre.com / sundaygo.vn; ngày kiểm 08/11/2026)_ — Đánh giá người dùng: chưa có đánh giá — bạn là người đầu tiên.
- **Khu du lịch Lâm Viên Núi Cấm** — Núi Cấm là nóc nhà miền Tây (705 m), lên đỉnh bằng cáp treo ngắm toàn cảnh Bảy Núi — trải nghiệm đáng tiền nhất An Giang sau Trà Sư. Điểm mạnh là cáp treo tiện, trên đỉnh có chùa Vạn Linh và tượng Phật Di Lặc lớn; điểm yếu là vé cáp treo khứ hồi 300.000đ khá cao, giá chiều xuống các nguồn ghi 120.000đ vs 140.000đ. Hợp với gia đình và người thích núi, nên đi sáng sớm, tránh ngày lễ đông. _(Nguồn tham khảo: dulich.pro.vn / thamhiemmekong.com / klook.com; ngày kiểm 06/11/2026)_ — Đánh giá người dùng: chưa có đánh giá — bạn là người đầu tiên.
- **Làng Chăm Châu Giang (Châu Phong)** — Làng Chăm Châu Giang là trải nghiệm văn hóa độc nhất: thánh đường Hồi giáo, dệt thổ cẩm, món tung lò mò — khác hẳn mọi điểm còn lại ở An Giang. Điểm mạnh là miễn phí tham quan làng, người Chăm thân thiện; điểm yếu là phải qua phà Châu Giang, nên tránh giờ làm lễ ở thánh đường. Hợp với người thích văn hóa và ẩm thực, nên đi buổi sáng, ăn mặc kín đáo khi vào thánh đường. _(Nguồn tham khảo: dicungdien.com / klook.com; ngày kiểm 06/11/2026)_ — Đánh giá người dùng: chưa có đánh giá — bạn là người đầu tiên.
- **Tà Pạ (cánh đồng — hồ — chùa Tà Pạ)** — Tà Pạ đẹp nhất khi lúa chín (cuối tháng 11–đầu tháng 12): cánh đồng, hồ Tà Pạ xanh ngọc và chùa Tà Pạ trên đồi tạo thành một khung hình hiếm có ở miền Tây. Điểm mạnh là miễn phí, cảnh hoang sơ; điểm yếu là xa Châu Đốc (~48 km), đường Tri Tôn nhỏ, đi lệch mùa lúa thì cảnh kém hẳn. Hợp với người thích chụp ảnh và phượt, nên đi mùa lúa chín, ghép với chợ nổi Long Xuyên. _(Nguồn tham khảo: travelbui.com; ngày kiểm 06/11/2026)_ — Đánh giá người dùng: chưa có đánh giá — bạn là người đầu tiên.
- **Chợ nổi Long Xuyên** — Chợ nổi Long Xuyên nhỏ và yên hơn Cái Răng, còn giữ nét chợ họp sớm cho dân địa phương — ai thích sự chân chất sẽ thích, ai thích náo nhiệt sẽ thấy vắng. Điểm mạnh là thuê ghe rẻ (150.000–200.000đ/chuyến), không khí buổi sáng trong lành; điểm yếu là xa Châu Đốc (~60 km), chợ tan sớm. Hợp với người thích chợ nổi nguyên bản, nên đi 5–6h sáng từ Long Xuyên. _(Nguồn tham khảo: dicungdien.com; ngày kiểm 06/11/2026)_ — Đánh giá người dùng: chưa có đánh giá — bạn là người đầu tiên.
- **Bãi biển Mũi Nai** — Mũi Nai đáng đi vì nó là bãi biển 'độc': cát đen, hai núi kẹp vịnh, hoàng hôn đẹp, khác hẳn bãi cát trắng quen thuộc. Điểm yếu phải nói thẳng: nước biển không trong, cát đen nên nhiều người mới tới hơi thất vọng nếu kỳ vọng tắm biển như Phú Quốc. Hợp với người thích ngắm cảnh và chụp hoàng hôn hơn là tắm; nên đi chiều muộn, ghép với Thạch Động trong ngày Hà Tiên. _(Nguồn tham khảo: mia.vn / dulichviet.com.vn; ngày kiểm 06/11/2026)_ — Đánh giá người dùng: chưa có đánh giá — bạn là người đầu tiên.
- **Thạch Động (Thạch Động Thôn Vân)** — Thạch Động nhỏ nhưng có hồn: hang đá, chùa trong lòng núi, câu chuyện Thạch Sanh mà trẻ con nào cũng biết — đi với trẻ nhỏ rất hợp. Điểm yếu là quy mô nhỏ, leo dốc đá trơn, chỉ ở lại được khoảng một giờ là hết thứ xem. Hợp với gia đình có trẻ em và người thích truyền thuyết, nên ghép với Mũi Nai trong cùng buổi chiều Hà Tiên. _(Nguồn tham khảo: mia.vn / dulichviet.com.vn; ngày kiểm 06/11/2026)_ — Đánh giá người dùng: chưa có đánh giá — bạn là người đầu tiên.
- **Cổng Tam Quan (Rạch Giá)** — Cổng Tam Quan là biểu tượng của Rạch Giá, chụp ảnh kỷ niệm thì được, nhưng nói thẳng: ngoài cổng ra thì khu vực này không có gì để tham quan lâu. Điểm mạnh là miễn phí, nằm ngay trung tâm, tiện ghé khi quá cảnh; điểm yếu là nếu đi riêng 95 km từ Châu Đốc chỉ để xem cổng thì không đáng. Hợp với khách đang ở Rạch Giá hoặc đi phà ra đảo, nên ghé buổi tối khi lên đèn. _(Nguồn tham khảo: mia.vn / dulichviet.com.vn; ngày kiểm 06/11/2026)_ — Đánh giá người dùng: chưa có đánh giá — bạn là người đầu tiên.

### Món ăn

- **Bún cá Châu Đốc (bún nước lèo)** — Bún cá Châu Đốc là món sáng đúng chất: nước lèo ngọt cá, thịt cá lóc, bông điên điển theo mùa. Điểm mạnh là rẻ (15.000–25.000đ/tô); điểm yếu là giá tại chợ Châu Đốc có nguồn ghi 30.000–50.000đ/tô, chênh gấp đôi nên hỏi giá trước. Hợp với ăn sáng, nên ăn ở Bún cá Vân. _(Nguồn tham khảo: mytour.vn / tripi.vn; ngày kiểm 06/11/2026)_ — Đánh giá người dùng: chưa có đánh giá — bạn là người đầu tiên.
- **Lẩu mắm Châu Đốc** — Lẩu mắm Châu Đốc đậm đà, rau đồng nhiều loại — ăn nhóm 4 người là vừa. Điểm mạnh là 100.000–150.000đ/phần 4 người rất rẻ; điểm yếu là có nguồn ghi 150.000–300.000đ, và mắm nặng mùi nên ai không quen sẽ khó ăn. Hợp với nhóm thích món đậm vị, nên ăn ở Hội quán Châu Đốc. _(Nguồn tham khảo: mytour.vn / tripi.vn; ngày kiểm 06/11/2026)_ — Đánh giá người dùng: chưa có đánh giá — bạn là người đầu tiên.
- **Bò bảy món Núi Sam** — Bò bảy món Núi Sam là món 'phải ăn' khi lên núi Sam: 7 món từ một con bò, nướng, nhúng, tái chanh đủ kiểu. Điểm yếu là giá các nguồn ghi khác nhau lớn (50.000–150.000đ/món vs 150.000–300.000đ/người) nên hỏi giá trước. Hợp với nhóm ăn tối sau khi viếng Miếu Bà, nên ăn ở Tư Thiêng. _(Nguồn tham khảo: mytour.vn / tripi.vn; ngày kiểm 06/11/2026)_ — Đánh giá người dùng: chưa có đánh giá — bạn là người đầu tiên.
- **Bánh bò thốt nốt** — Bánh bò thốt nốt thơm đường thốt nốt, mềm xốp — món ăn vặt đặc trưng Bảy Núi. Điểm yếu là giá riêng chưa kiểm được, bánh bán ở chợ nên chất lượng tùy sạp. Hợp với ăn xế và mua về, nên mua ở chợ Châu Đốc hoặc chợ Tịnh Biên. _(Nguồn tham khảo: mytour.vn / klook.com; ngày kiểm 06/11/2026)_ — Đánh giá người dùng: chưa có đánh giá — bạn là người đầu tiên.
- **Gỏi sầu đâu** — Gỏi sầu đâu đắng nhẹ, lạ miệng — món này kén người ăn nhưng ai ăn quen thì nhớ. Điểm yếu là giá riêng chưa kiểm được, sầu đâu theo mùa. Hợp với người thích món lạ miền Tây, nên ăn ở Hội quán Châu Đốc. _(Nguồn tham khảo: klook.com; ngày kiểm 06/11/2026)_ — Đánh giá người dùng: chưa có đánh giá — bạn là người đầu tiên.
- **Canh chua cá linh bông điên điển (mùa nước nổi)** — Canh chua cá linh bông điên điển là món mùa nước nổi đúng nghĩa: chua thanh, cá linh non, bông điên điển giòn. Điểm mạnh là giá mềm 30.000–50.000đ/tô; điểm yếu là chỉ có mùa nước nổi. Hợp với ăn trưa tháng 9–11, nên ăn ở Bảy Bồng 2. _(Nguồn tham khảo: mytour.vn / tiphay.vn; ngày kiểm 06/11/2026)_ — Đánh giá người dùng: chưa có đánh giá — bạn là người đầu tiên.
- **Mắm Châu Đốc** — Mắm Châu Đốc là đặc sản mua về số một: mắm cá linh, cá sặc, ba khía đủ loại, mua ở chợ đầu mối giá tốt. Điểm mạnh là 100.000–200.000đ/kg, nhiều loại để chọn; điểm yếu là mùi nặng, mang về phải đóng gói kỹ. Hợp với mua quà, nên mua ở chợ Châu Đốc buổi sáng. _(Nguồn tham khảo: mytour.vn / tiphay.vn; ngày kiểm 06/11/2026)_ — Đánh giá người dùng: chưa có đánh giá — bạn là người đầu tiên.
- **Tung lò mò (lạp xưởng bò, người Chăm)** — Tung lò mò là lạp xưởng bò của người Chăm, vị đặc trưng không giống lạp xưởng thường — mua ở làng Chăm mới đúng gốc. Điểm yếu là giá riêng chưa kiểm được, hàng làm sẵn ít. Hợp với mua về và ăn xế, nên mua tại làng Chăm Châu Giang. _(Nguồn tham khảo: dicungdien.com; ngày kiểm 06/11/2026)_ — Đánh giá người dùng: chưa có đánh giá — bạn là người đầu tiên.
- **Lẩu cá linh bông điên điển** — Lẩu cá linh Châu Đốc ngon nhất mùa nước nổi, ăn ở Hội quán Châu Đốc là tiện nhất. Điểm yếu là giá riêng tại Châu Đốc chưa kiểm được, tham khảo chung 120.000–250.000đ/nồi. Hợp với nhóm đi tháng 9–11. _(Nguồn tham khảo: viet-travel.congtan5918.workers.dev; ngày kiểm 06/11/2026)_ — Đánh giá người dùng: chưa có đánh giá — bạn là người đầu tiên.

### Chỗ ở

Mọi chỗ ở ở mục 2 đều có mục đánh giá người dùng đang trống — chưa có đánh giá, bạn là người đầu tiên.
## 4. Đi đến An Giang bằng gì

Không có sân bay/ga tàu tại vùng Châu Đốc — Núi Sam. Sân bay gần nhất: Cần Thơ (VCA, cách Châu Đốc ~120 km, ~3 giờ đi xe) hoặc Tân Sơn Nhất (SGN, cách Châu Đốc ~245 km).

### 4.1. Từ TP.HCM (~245 km tới Châu Đốc)

| Phương tiện | Thời gian | Khoảng giá | Hãng / ghi chú | Nguồn |
|---|---|---|---|---|
| Xe khách / giường nằm | 5–6 giờ | ~120.000–155.000đ/vé (Phương Trang 155.000đ, 34 chuyến/ngày; nguồn khác ghi 120.000–150.000đ; tour xe giường nằm SG — Châu Đốc có nguồn ghi tới 550.000đ — xem mục 9) | Phương Trang hotline 1900 6067; chạy từ Bến xe Miền Tây | limody.vn, 2banh.vn, klook.com |
| Limousine | 5–6 giờ | Chưa kiểm được giá riêng tuyến SG — Châu Đốc (tham khảo chung miền Tây ~180.000–300.000đ/vé) | — | Chưa kiểm được |
| Xe máy / ô tô riêng (QL1A + QL91) | Ô tô 5–6 giờ; xe máy ~7–8 giờ | Thuê xe 4 chỗ có tài xế SG — Châu Đốc ~2.000.000đ/chiều (tham khảo) | Lộ trình: TP.HCM → cao tốc → QL1A → Cần Thơ/Long Xuyên → QL91 → Châu Đốc | xelientinh247.vn |
| Tour xe giường nằm 1 ngày 1 đêm (đi tối thứ 7) | Đi tối thứ 7, về hôm sau | Tour trọn gói từ 1.090.000đ/khách (giường tầng trên), 1.190.000đ (tầng dưới) | Saigon Star Travel — tour hành hương Miếu Bà + Lăng Thoại Ngọc Hầu + Chợ Tịnh Biên + Núi Cấm hoặc Trà Sư | saigonstartravel.com |

### 4.2. Từ Hà Nội

| Phương tiện | Thời gian | Khoảng giá | Ghi chú | Nguồn |
|---|---|---|---|---|
| Máy bay HAN–VCA (Cần Thơ) rồi xe về Châu Đốc | Bay ~2h10 + xe VCA — Châu Đốc ~3 giờ (~120 km) | Vé máy bay HAN–VCA ~1.300.000đ/chiều đã gồm thuế phí (tham khảo; vé rẻ chưa thuế phí có thể từ ~799.000đ); xe VCA — Châu Đốc ~120.000–210.000đ/vé (theo Phương Trang Cần Thơ — Châu Đốc) | Phương án khuyên dùng | vietair.com.vn, limotrip.vn |
| Máy bay HAN–SGN rồi xe lên Châu Đốc | Bay ~2h05 + xe SG — Châu Đốc 5–6 giờ | Vé HAN–SGN tùy thời điểm đặt (chưa kiểm được giá riêng); xe SG — Châu Đốc 120.000–155.000đ/vé | Phương án thay thế | limody.vn |
| Xe khách HN — Châu Đốc | Chưa kiểm được tuyến thẳng + thời gian/giá | Chưa kiểm được | Không khuyến khích; đa số nguồn khuyên bay | Chưa kiểm được |

### 4.3. Từ sân bay Cần Thơ (VCA) vào Châu Đốc (~120 km, ~3 giờ)

| Phương tiện | Khoảng giá | Ghi chú | Nguồn |
|---|---|---|---|
| Xe khách Cần Thơ — Châu Đốc (Phương Trang) | 120.000–210.000đ/vé, ~3 giờ; giờ khởi hành 14:00, 15:00, 16:00, 18:00 (theo limotrip) | Đón tại bến xe Cần Thơ | limotrip.vn |
| Taxi / xe riêng | Chưa kiểm được giá riêng tuyến VCA — Châu Đốc (tham khảo thuê xe 4 chỗ SG — Châu Đốc 2.000.000đ/chiều) | Hỏi rõ giá trọn gói trước khi lên xe | xelientinh247.vn |

## 5. Đi lại trong An Giang

| Phương tiện | Khoảng giá | Giấy tờ / điều kiện | Ghi chú | Nguồn |
|---|---|---|---|---|
| Thuê xe máy — xe số | ~100.000–150.000đ/ngày (tham khảo chung miền Tây; chưa kiểm được mức riêng tại Châu Đốc) | CCCD (hoặc hộ chiếu) + bằng lái A1 (bắt buộc với xe trên 50cc); nên nộp bản photo CCCD, giữ bản gốc | Các điểm cách nhau 25–40 km (Trà Sư, Núi Cấm), xe máy linh hoạt nhất; đường Tri Tôn/Tà Pạ quanh co | luxurytravel.vn |
| Thuê xe máy — tay ga | Chưa kiểm được mức riêng tại Châu Đốc (tham khảo chung miền Tây ~150.000–200.000đ/ngày) | Như trên | — | Chưa kiểm được |
| Taxi nội thành / xe công nghệ | Chưa kiểm được bảng giá taxi riêng tại Châu Đốc | — | Hỏi giá trước khi đi; Grab/Be phủ sóng hạn chế | Chưa kiểm được |
| Phà Châu Giang (qua làng Chăm) | 5.000–30.000đ/lượt tùy phương tiện | — | Phà là cửa ngõ qua làng Chăm Châu Giang | klook.com |
| Xuồng Trà Sư / cáp treo Núi Cấm | Trà Sư: tàu máy 60.000đ + xuồng chèo 60.000đ/khách/lượt; Núi Cấm: cáp treo khứ hồi 300.000đ/người lớn, xe lên đỉnh khứ hồi ~180.000đ/người lớn | — | Không tự chạy xe máy/ô tô lên đỉnh Núi Cấm; cáp treo 7:00–17:00 | mia.vn, dulich.pro.vn |
| Thuê ô tô có tài xế theo ngày (trong tỉnh) | Chưa kiểm được mức riêng tại An Giang (tham khảo chung miền Tây xe 4 chỗ ~900.000–1.400.000đ/ngày) | — | Hợp nhóm 4–7 người đi Trà Sư — Núi Cấm trong ngày | Chưa kiểm được |

## 6. Lịch trình mẫu

### 6.1. Lịch trình 3N2Đ (chính)

| Ngày | Buổi | Hoạt động | Điểm / quán gắn kèm |
|---|---|---|---|
| Ngày 1 — Núi Sam | Sáng | Miếu Bà Chúa Xứ (1–1,5 giờ) + Lăng Thoại Ngọc Hầu + Chùa Tây An | Địa danh 1, 2, 3 |
| Ngày 1 | Trưa | Bún cá Châu Đốc (Bún cá Vân) | Món 1 |
| Ngày 1 | Chiều | Chùa Hang (45–60 phút) + chợ Châu Đốc mua mắm | Địa danh 4, 5; món 7 |
| Ngày 1 | Tối | Lẩu mắm Châu Đốc (Hội quán Châu Đốc) | Món 2 |
| Ngày 2 — Trà Sư — Núi Cấm | Sáng sớm | Rừng tràm Trà Sư 7:00–9:00 (2–3 giờ, tắc ráng + xuồng chèo) | Địa danh 6 |
| Ngày 2 | Trưa–chiều | Núi Cấm (cáp treo lên đỉnh, 3–4 giờ) | Địa danh 7 |
| Ngày 2 | Tối | Bò bảy món Núi Sam (Tư Thiêng) | Món 3 |
| Ngày 3 — Làng Chăm — Tri Tôn | Sáng | Phà Châu Giang → Làng Chăm Châu Giang + Thánh đường Jamiul Azhar (1,5–2 giờ) | Địa danh 8; món 8 |
| Ngày 3 | Trưa–chiều | Tà Pạ (Tri Tôn) hoặc chợ nổi Long Xuyên (chọn 1), về Châu Đốc trả phòng | Địa danh 9, 10 |
| Ngày 3 | Tối | Về | — |

## 7. Bảng chi phí ước tính (1 người, 3N2Đ từ TP.HCM, ở Châu Đốc, đi xe khách)

| Hạng mục | Ước tính 3N2Đ / người | Căn cứ |
|---|---|---|
| Xe SG–Châu Đốc khứ hồi | 240.000–310.000đ | Mục 4.1 (120.000–155.000đ/vé/chiều) |
| Ở 2 đêm (chia đôi phòng) | 300.000–2.050.000đ | Mục 2 (nhà nghỉ 150.000–250.000đ/đêm tới Victoria ~1.700.000–2.050.000đ/đêm, chia 2 người; khoảng rộng do chênh lệch hạng phòng) |
| Ăn 3 ngày | 450.000–900.000đ | Mục 3 (món 15.000–150.000đ; lẩu/bò bảy món nhóm chia 2–4 người) |
| Vé tham quan | 200.000–560.000đ | Mục 1 (Trà Sư trọn gói ~200.000–240.000đ; Núi Cấm cáp treo khứ hồi 300.000đ + cổng 20.000đ; Miếu Bà/chùa miễn phí) |
| Thuê xe máy 2–3 ngày | 200.000–450.000đ | Mục 5 (100.000–150.000đ/ngày) |
| Phà + xe Cần Thơ — Châu Đốc phát sinh | 50.000–150.000đ | Mục 4.3, 5 (phà 5.000–30.000đ/lượt) |
| **Tổng ước tính** | **1.440.000–4.320.000đ/người** | Cộng các khoảng trên (khoảng rộng do chênh lệch hạng phòng) |
| Nếu đi từ Hà Nội | Vé máy bay là hạng mục lớn nhất: HAN–VCA ~1.300.000đ/chiều (tham khảo) + xe VCA — Châu Đốc 120.000–210.000đ/vé | Mục 4.2 |

Quy tắc hiển thị giá trong app: luôn ghi khoảng giá + ngày kiểm (06/11/2026), không ghi một giá cố định.

## 8. Checklist mang theo

- Áo chống nắng, mũ, kem chống nắng (đi Trà Sư/Núi Cấm ngoài trời nhiều).
- Áo mưa mỏng (mùa mưa tháng 5–10; mùa nước nổi tháng 9–11), giày bệt leo chùa/núi.
- CCCD + bằng lái A1 (nếu thuê xe máy), tiền mặt lẻ (phà, chợ, quán nhỏ, lễ vật).
- Thuốc chống muỗi (rừng tràm Trà Sư nhiều muỗi), thuốc cơ bản; sạc dự phòng.
- Ăn mặc lịch sự khi vào miếu/chùa; đi lễ Vía Bà (tháng 4 Âm lịch) rất đông — đặt phòng trước 1–2 tuần.

## 9. Mục chưa kiểm được / cần xác nhận lại (ghi rõ, không bịa)

1. Giá vé Trà Sư (tham quan 120.000đ vs 100.000đ; tàu máy/xuồng chèo 60.000đ vs 50.000đ)
2. Giá vé cáp treo Núi Cấm chiều xuống (120.000đ vs 140.000đ)
3. Giờ mở cửa Trà Sư (6:30–17:30 vs 7:00–17:00/17:15; một nguồn ghi 5:00–21:00, không dùng)
4. Giờ mở cửa Miếu Bà Chúa Xứ (5:00–22:00, một nguồn duy nhất)
5. Khoảng cách chính xác Châu Đốc — Tà Pạ (~45–50 km, ước tính) và Châu Đốc — chợ nổi Long Xuyên (~60 km)
6. Địa giới sau sáp nhập 01/07/2025: đợt 06/11/2026 đã thêm 3 điểm khu vực Kiên Giang cũ (Mũi Nai, Thạch Động, Cổng Tam Quan Rạch Giá); Phú Quốc, Nam Du, Hà Tiên (các điểm còn lại) chưa nhập vì xa cụm Châu Đốc, đi riêng
7. Giá vé riêng Thạch Động và giá dịch vụ ghế/tắm Mũi Nai chưa kiểm được
8. Chùa Huỳnh Đạo, Búng Bình Thiên, chợ Tịnh Biên: chưa kiểm được đủ địa chỉ + giá vé riêng nên chưa đưa vào
9. Giá phòng Victoria Châu Đốc (từ 1.700.000đ vs 2.050.000đ vs 3.200.000đ — chênh lớn theo thời điểm/kênh)
10. Giá phòng Hùng Cường (550.000đ vs 700.000–1.000.000đ vs 1.048.500đ — chênh lớn theo kênh)
11. Khách sạn Châu Phố: địa chỉ chi tiết (Phi Mai, Hải Châu đã có địa chỉ đúng — cập nhật 08/11/2026); Hải Châu chưa kiểm được khoảng giá
12. Giá bún cá (15.000–25.000đ/tô vs 30.000–50.000đ/tô tại chợ Châu Đốc)
13. Giá lẩu mắm (100.000–150.000đ/phần 4 người vs 150.000–300.000đ)
14. Giá bò bảy món (50.000–150.000đ/món vs 150.000–300.000đ/người)
15. Giá bánh bò thốt nốt, gỏi sầu đâu, tung lò mò, lẩu cá linh tại Châu Đốc
16. Giá vé xe khách SG — Châu Đốc (120.000–155.000đ xe lẻ vs tour trọn gói ghi tới 550.000đ — chưa tách được giá xe thuần)
17. Giá limousine SG — Châu Đốc, giá taxi nội thành Châu Đốc, giá thuê xe máy tay ga tại Châu Đốc
18. Giá taxi/xe riêng tuyến VCA — Châu Đốc
19. Tuyến xe khách thẳng Hà Nội — Châu Đốc: chưa kiểm được có tuyến hay không

## 10. Cảnh báo chặt chém + lừa cọc (bổ sung 08/11/2026)

- **Mua đồ lễ, nhang đèn và đặc sản quanh Miếu Bà Chúa Xứ Núi Sam và chợ Châu Đốc dịp lễ hội Vía Bà (tháng 4 âm lịch): giá bị hét cao, cân thiếu, chèo kéo mua thêm.** Cách tránh: Hỏi giá và chốt giá trước khi mua; mua ở sạp có bảng giá niêm yết; tránh mua khi bị vây chèo kéo, đi theo nhóm đông. (Nguồn: Cảnh báo chung theo kinh nghiệm du lịch và báo chí; chưa tra được vụ việc riêng của tỉnh này trên báo chính thống (ngày kiểm 08/11/2026))
- **Xe ôm, taxi dù ở bến xe Châu Đốc và khu vực núi Sam hét giá cao gấp nhiều lần, nhất là khách đi lẻ buổi tối.** Cách tránh: Dùng taxi có đồng hồ/hãng quen hoặc đặt xe qua ứng dụng; thỏa thuận giá và lộ trình trước khi lên xe; tránh xe không biển hiệu. (Nguồn: Cảnh báo chung theo kinh nghiệm du lịch và báo chí; chưa tra được vụ việc riêng của tỉnh này trên báo chính thống (ngày kiểm 08/11/2026))
- **Lừa cọc homestay/khách sạn đặt qua Facebook, Zalo: mạo danh chủ nhà, giá rẻ, giục cọc 30-50% rồi chặn liên lạc.** Cách tránh: Chỉ đặt qua nền tảng có cơ chế hoàn tiền hoặc gọi số trên website/fanpage chính thức để xác nhận; yêu cầu gọi video trực tiếp tại phòng; không chuyển cọc cho tài khoản cá nhân lạ. (Nguồn: Báo Nhân Dân — Nhiều chiêu trò lừa đảo đặt phòng khách sạn (05/08/2023): mạo danh chủ khách sạn/homestay, giá rẻ trên Facebook/Zalo, yêu cầu cọc 30-50% rồi chặn liên lạc; một vụ ở Quảng Ninh chiếm đoạt khoảng 100 triệu đồng và đã bị khởi tố (ngày kiểm 08/11/2026))
- **Thuyền, xuồng tham quan rừng tràm Trà Sư và chợ nổi: giá vé, giá thuê thuyền riêng không thống nhất, phụ thu phát sinh.** Cách tránh: Mua vé tại quầy chính thức của khu du lịch, hỏi rõ vé đã gồm những gì; giữ vé và biên lai để đối chiếu. (Nguồn: Cảnh báo chung theo kinh nghiệm du lịch và báo chí; chưa tra được vụ việc riêng của tỉnh này trên báo chính thống (ngày kiểm 08/11/2026))


## 11. An toàn đường đèo + thuê xe máy (bổ sung 08/11/2026)

An Giang không có đèo mang tên riêng, nhưng đường lên Núi Cấm/Núi Sam dốc, nhiều cua gấp (đường lên Núi Cấm được báo/dân địa phương gọi là 'cung đèo'). Đi núi Sam, núi Cấm bằng xe máy: đường dốc lên núi hẹp, nhiều khúc cua — đi chậm, kiểm tra phanh trước khi lên, không đi khi mưa lớn.

(Nguồn: Tỉnh đồng bằng, không có đèo mang tên riêng; đường lên núi Sam, núi Cấm dốc, nhiều cua gấp (ngày kiểm 08/11/2026))


## 12. Số khẩn cấp + xử lý sự cố (bổ sung 08/11/2026)

- Công an: 113 — Cấp cứu: 115 — Cứu hỏa: 114
- Số riêng của tỉnh: Sở Du lịch An Giang: 02973 781 999 / 02973 504 569. (Nguồn: sdl.angiang.gov.vn, trang liên hệ chính thức — ngày kiểm 08/11/2026)

(Nguồn: số chung cả nước 113/115/114 là số khẩn cấp quốc gia; số riêng theo nguồn ghi trong từng mục (ngày kiểm 08/11/2026))


## 13. Giờ đẹp chụp ảnh (bổ sung 08/11/2026)

| # | Điểm | Giờ đẹp | Nguồn |
|---|---|---|---|
| 1 | Rừng tràm Trà Sư | 7:00-9:00 sáng (chim hoạt động, tia nắng xuyên lá) hoặc 15:30-17:00 chiều (hoàng hôn, chim bay về tổ) | Phan Văn Travel — Trải nghiệm du lịch Trà Sư An Giang; Thám Hiểm Mekong — Hướng dẫn du lịch Rừng Tràm Trà Sư (ngày kiểm 08/11/2026) |
| 2 | Miếu Bà Chúa Xứ Núi Sam | 5:30-7:00 sáng hoặc 16:30-18:00 chiều, tránh nắng gắt giữa trưa | Khung giờ vàng chung cho chụp ảnh ngoài trời tại Việt Nam (bình minh khoảng 5:30, hoàng hôn khoảng 17:30); chưa có hướng dẫn riêng cho điểm này (ngày kiểm 08/11/2026) |
| 3 | Chợ Châu Đốc | 6:00-8:00 sáng lúc chợ họp đông và ánh sáng mềm | Khung giờ vàng chung cho chụp ảnh ngoài trời tại Việt Nam; chưa có hướng dẫn riêng cho điểm này (ngày kiểm 08/11/2026) |


## 14. Cho người chạy giải (bổ sung 08/11/2026)

**Giải chạy (đã kiểm nguồn):**
- Nông thôn Việt Half Marathon Tri Tôn — Về vùng Huyền Tích — Tháng 1 hằng năm (mùa 2025: 4-5/1/2025) (Nguồn: Báo Lao Động — 3.500 vận động viên dự cuộc đua 'Về vùng huyền tích' (16/12/2024) (ngày kiểm 08/11/2026))

**Điểm chạy bộ đẹp:** Đường ven sông Châu Đốc; Khu vực núi Sam (buổi sáng sớm); Đường quanh rừng tràm Trà Sư.

**Chỗ ở gần điểm xuất phát** (lấy từ mục chỗ ở đã có): Khách sạn Victoria Châu Đốc; Khách sạn Châu Phố.

(Nguồn: Báo Lao Động về giải Tri Tôn; chỗ ở lấy từ dữ liệu chỗ ở đã có của tỉnh (ngày kiểm 08/11/2026))
