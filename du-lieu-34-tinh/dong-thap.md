# Dữ liệu cẩm nang Đồng Tháp — Giai đoạn 1 (đầy đủ)

- **Trạng thái: published** — đẩy lên theo lệnh anh ngày 06/11/2026 (đẩy hết lên, bỏ vòng duyệt chuyên gia; các nợ dữ liệu vẫn giữ nguyên, xem mục 9).
- Ngày kiểm: 06/11/2026. Mọi giá đều là **khoảng giá tham khảo** từ nguồn công khai, không phải giá chốt. Giá đổi theo mùa, cuối tuần, lễ Tết — kiểm lại trước ngày đi.
- Bổ sung 08/11/2026: số điện thoại chỗ ở (cột Điện thoại, mục 2) + mục 2B Trời mưa thì đi đâu + mục 2C Cho cặp đôi + mục 2D Mùa + tháng đẹp nhất. Số điện thoại tra từ nguồn công khai ngày 08/11/2026; chỗ nào ghi 'Chưa tra được' là chưa tìm thấy số khớp tên + địa chỉ.
- Nguồn sự thật: nghiên cứu từ nguồn công khai ngày 06/11/2026 (tên miền nguồn ghi ở từng mục).
- **Lưu ý địa giới:** từ 01/07/2025, tỉnh Đồng Tháp mới bao gồm khu vực Đồng Tháp cũ và Tiền Giang cũ. File này tập trung vào **khu vực Đồng Tháp cũ** (Sa Đéc, Cao Lãnh, Tam Nông, Tháp Mười, Lai Vung, Lấp Vò), trung tâm tính khoảng cách là TP Sa Đéc theo nhiệm vụ; các điểm thuộc khu vực Tiền Giang cũ chưa nhập trong đợt này (xem mục 9). Đợt 06/11/2026 đã thêm 3 điểm khu vực Tiền Giang cũ (chợ nổi Cái Bè, chùa Vĩnh Tràng, Cồn Thới Sơn), chỉ điểm gần, cùng cụm di chuyển được.
- **Khách sạn/homestay: CHỈ giới thiệu sơ.** Tất cả đều ghi "chưa kiểm chứng / chưa đối tác / chưa thu phí". Không dùng chữ uy tín/đảm bảo. Không nhận đặt phòng, không nhận tiền.
- Khoảng cách là đường đi ước tính theo nguồn, không phải đường chim bay. Tọa độ ghi "chưa kiểm được" thì để null trong file JSON, không bịa.
- File JSON máy đọc được: `dong-thap.json` (cùng thư mục).

## 1. Địa danh — 13 điểm chính

Mốc tính khoảng cách: TP Sa Đéc.

### 1.1. Cụm Sa Đéc

| # | Tên | Địa chỉ | Tọa độ | Cách trung tâm | Giá vé | Giờ mở cửa | Thời gian | Hợp với ai | Lưu ý | Nguồn |
|---|---|---|---|---|---|---|---|---|---|---|
| 1 | Làng hoa kiểng Sa Đéc | Đường Hoa Sa Đéc, xã Tân Quy Đông, TP Sa Đéc (hơn 60 ha, tồn tại hơn 100 năm) | 10.30476, 105.75745 (geocode khớp khu vực làng hoa, mức khu vực) | ~2–3 km | Miễn phí vào làng (một số nguồn ghi 20.000–100.000đ/người cho vườn hoa riêng/dịch vụ); xe Jeep, thuê dù, phí vào vườn hoa tính riêng tùy điểm | Cả ngày (đẹp nhất đầu tháng Chạp đến 23 tháng Chạp Âm lịch) | 2–3 giờ; đi buổi sáng hoặc chiều mát | Mọi đối tượng, người thích hoa/chụp ảnh | Đẹp nhất dịp Tết (tháng Chạp); ngày thường vẫn có hoa nhưng ít rực rỡ; hỏi giá từng vườn trước | nucuoimekong.com, htt-furniture.com, mia.vn, tripi.vn |
| 2 | Nhà cổ Huỳnh Thủy Lê | 255A Nguyễn Huệ, Phường 2 (một số nguồn ghi Phường 4), TP Sa Đéc | 10.29405, 105.76853 | ~1 km | 20.000đ/người (gồm hướng dẫn viên + nước trà, mứt gừng; một nguồn ghi 30.000đ — xem mục 9); ăn trưa/tối 100.000đ/người; nghỉ đêm 550.000–1.000.000đ/đêm (gồm ăn) | 7:00–17:00 (một nguồn ghi 8:30–17:30) | 45–60 phút | Người yêu kiến trúc/lịch sử, cặp đôi (chuyện tình trong tiểu thuyết "Người tình" của Marguerite Duras) | Kiến trúc Đông — Tây cuối thế kỷ 19; có dịch vụ nghỉ đêm tại nhà cổ (2 phòng/4 người) | htt-furniture.com, mia.vn, tripi.vn, travelviet.net |

### 1.2. Cụm Cao Lãnh

| # | Tên | Địa chỉ | Tọa độ | Cách trung tâm | Giá vé | Giờ mở cửa | Thời gian | Hợp với ai | Lưu ý | Nguồn |
|---|---|---|---|---|---|---|---|---|---|---|
| 3 | Khu di tích Lăng cụ Phó bảng Nguyễn Sinh Sắc | Số 1 đường Phạm Hữu Lầu, Phường 4, TP Cao Lãnh | 10.44609, 105.63037 | ~25 km | Miễn phí | Chưa kiểm được giờ chính thức (ban ngày) | 1–1,5 giờ | Mọi đối tượng, khách tham quan lịch sử | Nơi yên nghỉ của thân sinh Chủ tịch Hồ Chí Minh, di tích cấp quốc gia; ăn mặc lịch sự, giữ trang nghiêm | htt-furniture.com, mia.vn, travelviet.net |
| 4 | Khu du lịch Xẻo Quýt | Ấp 4, xã Mỹ Hiệp (nay xã Mỹ Long theo geocode), huyện Cao Lãnh; cách trung tâm Cao Lãnh ~30 km | 10.3981, 105.79979 | ~45–50 km | Vào cổng 20.000đ/người lớn, 10.000đ/trẻ em; xuồng chèo trong rừng 15.000đ/khách; xe đạp đôi 20.000đ/chiếc/30 phút | 7:00–18:00 (theo tripi.vn) | 2–3 giờ | Gia đình, nhóm bạn, người thích lịch sử/sinh thái | Rừng tràm + di tích căn cứ kháng chiến; đi xuồng ba lá luồn rừng tràm là trải nghiệm chính; mang thuốc chống muỗi | nucuoimekong.com, htt-furniture.com, mia.vn, tripi.vn |
| 5 | Khu du lịch sinh thái Gáo Giồng | Ấp 6, xã Gáo Giồng, huyện Cao Lãnh (cách trung tâm Cao Lãnh ~17 km); diện tích hơn 2.000 ha rừng tràm | 10.60862, 105.6278 (tọa độ đường dẫn vào KDL) | ~40 km | 10.000–15.000đ/người | Chưa kiểm được giờ chính thức (ban ngày) | 2–3 giờ | Gia đình, nhóm bạn, người thích chim/sinh thái | Được ví là "lá phổi xanh"/"Đồng Tháp Mười thu nhỏ"; đi thuyền ngắm chim, ăn món địa phương | htt-furniture.com, travelviet.net, himlamresort.vn |

### 1.3. Cụm Đồng Tháp Mười — Tam Nông — Tháp Mười

| # | Tên | Địa chỉ | Tọa độ | Cách trung tâm | Giá vé | Giờ mở cửa | Thời gian | Hợp với ai | Lưu ý | Nguồn |
|---|---|---|---|---|---|---|---|---|---|---|
| 6 | Vườn quốc gia Tràm Chim | Khóm 4, thị trấn Tràm Chim, huyện Tam Nông; vùng đất ngập nước Ramsar | 10.68466, 105.55638 | ~40 km | 20.000đ/người (trẻ em dưới 16 tuổi miễn phí); xe điện 30.000đ/người; thuê tàu 500.000đ (tuyến 12 km) hoặc 800.000đ (tuyến 21 km) | Chưa kiểm được giờ chính thức (ban ngày; đi sáng sớm ngắm chim) | Nửa ngày (3–4 giờ) | Người thích chim/thiên nhiên, nhiếp ảnh | Sếu đầu đỏ về mùa khô (tháng 12–4); mùa nước nổi tháng 9–11 sen súng nở; đi tàu phải đặt/đi theo đoàn, hỏi giá trước | nucuoimekong.com, htt-furniture.com, mia.vn, tripi.vn |
| 7 | Khu du lịch sinh thái Đồng Sen Tháp Mười | Số 1, ấp 1, xã Tân Kiều, huyện Tháp Mười; ~11 ha ao hồ sen; cách trung tâm ~39 km (theo mia.vn) | 10.60289, 105.8208 (geocode khớp khu vực, mức khu vực) | ~35–40 km | 20.000đ/ngày thường, 30.000đ/ngày cuối tuần (thứ 6–Chủ nhật) | Chưa kiểm được giờ chính thức (ban ngày) | 2–3 giờ | Cặp đôi, gia đình, người thích chụp ảnh | Sen nở rộ tháng 5–6 (một nguồn ghi mùa sen tháng 8–1 — mâu thuẫn, xem mục 9); có món cá lóc nướng, gỏi bông súng tại chỗ | htt-furniture.com, mia.vn, tripi.vn |
| 8 | Khu di tích Gò Tháp | Xã Mỹ Hòa và Tân Kiều, huyện Tháp Mười | Chưa kiểm được tọa độ chính xác (geocode khớp chợ Tháp Mười gần đó, không dùng) | ~35 km | Miễn phí | Chưa kiểm được giờ chính thức (ban ngày) | 1–2 giờ | Người thích lịch sử/tâm linh, khảo cổ | Quần thể tháp chùa, bia đá, tượng Phật, hầm mộ cổ; đi cùng cung Đồng Sen Tháp Mười | mia.vn, htt-furniture.com |

### 1.4. Cụm Lai Vung — Lấp Vò

| # | Tên | Địa chỉ | Tọa độ | Cách trung tâm | Giá vé | Giờ mở cửa | Thời gian | Hợp với ai | Lưu ý | Nguồn |
|---|---|---|---|---|---|---|---|---|---|---|
| 9 | Vườn quýt hồng Lai Vung | Vườn quýt hồng Hai Kiệt — 1068a Long Khánh A, Long Hậu, huyện Lai Vung | Chưa kiểm được tọa độ chính xác | ~20–25 km | Chưa kiểm được vé vào vườn riêng (ăn tại vườn/mua mang về tính theo giá thị trường) | Ban ngày (mùa quýt chín rộ dịp Tết) | 1–2 giờ | Gia đình, nhóm bạn | Quýt hồng là đặc sản Lai Vung; đi đúng mùa quýt chín mới đẹp; hỏi giá vào vườn + giá quýt trước | ecolotus.vn, tadiha.com |
| 10 | Chợ chiếu Định Yên | Xã Định Yên, huyện Lấp Vò | Chưa kiểm được tọa độ chính xác | ~25–30 km | Miễn phí vào chợ (mua chiếu tính riêng) | Chợ họp ban ngày; chợ đêm chiếu có phiên riêng (chưa kiểm được lịch chính xác) | 1 giờ | Người thích làng nghề, mua đặc sản làm quà | Làng nghề dệt chiếu truyền thống hơn 100 năm; mua chiếu trực tiếp tại chợ/làng | mia.vn |

### 1.5. Cụm mở rộng — khu vực Tiền Giang cũ (thêm 06/11/2026)

| # | Tên | Địa chỉ | Tọa độ | Cách trung tâm | Giá vé | Giờ mở cửa | Thời gian | Hợp với ai | Lưu ý | Nguồn |
|---|---|---|---|---|---|---|---|---|---|---|
| 11 | Chợ nổi Cái Bè | Thị trấn Cái Bè, huyện Cái Bè (khu vực Tiền Giang cũ, nay thuộc tỉnh Đồng Tháp mới); bến đò đường Trưng Nữ Vương | 10.32895, 106.03384 | ~35 km | Miễn phí vào chợ; thuê ghe tham quan hỏi giá trước (chưa kiểm được mức riêng) | Nhộn nhịp 5:00–8:00 sáng | 1,5–2 giờ buổi sáng | Mọi đối tượng, người thích chợ nổi | Thuộc khu vực Tiền Giang cũ, cùng cụm sông Tiền với Sa Đéc, cách Sa Đéc ~35 km. Nhỏ và yên hơn Cái Răng, còn giữ nét chợ đầu mối trái cây. Phải đi sớm, sau 8h chợ vãn. | mia.vn, dulichviet.com.vn |
| 12 | Chùa Vĩnh Tràng | Xã Mỹ Phong, TP Mỹ Tho (khu vực Tiền Giang cũ, nay thuộc tỉnh Đồng Tháp mới) | 10.36235, 106.37349 | ~50 km | Miễn phí | Ban ngày | 45–60 phút | Mọi đối tượng, người thích kiến trúc chùa | Thuộc khu vực Tiền Giang cũ. Chùa cổ nổi tiếng nhất Tiền Giang, kiến trúc pha Á–Âu độc đáo, tượng Phật lớn. Đi cùng cụm Mỹ Tho với Cồn Thới Sơn trong ngày. | mia.vn, dulichviet.com.vn |
| 13 | Cồn Thới Sơn | Xã Thới Sơn, TP Mỹ Tho (khu vực Tiền Giang cũ, nay thuộc tỉnh Đồng Tháp mới); đi đò từ bến Mỹ Tho | 10.34029, 106.31306 | ~50 km | Chưa kiểm được giá vé riêng (đi tour ghép từ bến Mỹ Tho, hỏi giá trước) | Ban ngày | 2–3 giờ | Gia đình, nhóm bạn | Thuộc khu vực Tiền Giang cũ. Cồn lớn nhất trong 4 cồn sông Tiền (Long–Lân–Quy–Phụng), vườn trái cây, đờn ca tài tử. Đi cùng cụm với Chùa Vĩnh Tràng và Cồn Phụng (Vĩnh Long) qua sông Tiền. | mia.vn, dulichviet.com.vn |

## 2. Ở đâu — 8 chỗ ở (CHỈ GIỚI THIỆU SƠ)

**Tất cả các mục dưới đây: "Thông tin tham khảo, chưa kiểm chứng trực tiếp, chưa phải đối tác, chưa thu phí. Người dùng tự kiểm tra giá / phòng trống trước khi đặt." Không dùng chữ uy tín/đảm bảo. Không nhận đặt phòng, không nhận tiền.**

| # | Tên | Địa chỉ | Khu vực | Hạng | Khoảng giá/đêm ngày thường | Điện thoại | Cách Sa Đéc | Hợp với ai | Trạng thái | Nguồn |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| 1 | Khách sạn B.O.B Cao Lãnh | Số 105 Tôn Đức Thắng, Phường 1, TP Cao Lãnh | Cao Lãnh | Chưa kiểm được hạng | Từ ~730.000đ/đêm | 0277 8527 777 | ~25 km | Khách đi Tràm Chim/Xẻo Quýt/Gáo Giồng, công tác | Chưa kiểm chứng / chưa đối tác / chưa thu phí | traveloka.com, vietfuntravel.com.vn |
| 2 | Thư Lê Hotel | Đường 30/4, Phường 1, TP Cao Lãnh | Cao Lãnh | Chưa kiểm được hạng | ~650.000đ/đêm | 0277 3536 667 | ~25 km | Khách đi cụm Cao Lãnh | Chưa kiểm chứng / chưa đối tác / chưa thu phí | travelviet.net |
| 3 | Khách sạn Trí Lê | TP Cao Lãnh (địa chỉ chi tiết chưa kiểm được) | Cao Lãnh | Chưa kiểm được hạng | ~460.000đ/đêm | 091 190 9797 | ~25 km | Khách tiết kiệm ở Cao Lãnh | Chưa kiểm chứng / chưa đối tác / chưa thu phí | travelviet.net |
| 4 | Khách sạn Bông Hồng Sa Đéc | Số 251A Nguyễn Sinh Sắc, Khóm 2, Phường 2, TP Sa Đéc | Sa Đéc | 3 sao | Từ ~500.000đ/đêm | 0277 3868 288 | Trung tâm Sa Đéc | Gia đình, cặp đôi ở Sa Đéc | Chưa kiểm chứng / chưa đối tác / chưa thu phí | traveloka.com |
| 5 | Khách sạn Vạn Kim Long | Số 26 ĐT848, ấp Phú Long, xã Tân Phú Đông, TP Sa Đéc | Sa Đéc | Chưa kiểm được hạng (7 tầng, có villa sân vườn) | Từ ~600.000đ/đêm | 0277 3980 980 | ~3–5 km | Gia đình, nhóm bạn | Chưa kiểm chứng / chưa đối tác / chưa thu phí | traveloka.com |
| 6 | Khách sạn Hương Sen | Số 109 Trần Thị Nhượng, Phường 1, TP Sa Đéc | Sa Đéc | Chưa kiểm được hạng | Từ ~320.000đ/đêm | 0944 100 794 | Trung tâm Sa Đéc | Khách bụi, cặp đôi tiết kiệm | Chưa kiểm chứng / chưa đối tác / chưa thu phí | traveloka.com |
| 7 | Sadec Farmstay | Số 156, Tỉnh lộ ĐT848, ấp Khánh Nhơn, xã Tân Khánh Đông, TP Sa Đéc (trong KDL Hoa Kiểng Sa Đéc, ~3 ha) | Làng hoa Sa Đéc | Homestay/farmstay | 500.000–1.200.000đ/đêm (một nguồn ghi từ 180.000đ/người) | 0919 885 804 | ~3–5 km | Gia đình, nhóm bạn thích ở giữa làng hoa | Chưa kiểm chứng / chưa đối tác / chưa thu phí | motogo.vn, vungtautourism.com |
| 8 | Maison en Bambou Phong – Le Vent (Nhà tre) | Kế số 204A, Khóm Tân Hiệp, Tân Quý Đông, TP Sa Đéc | Làng hoa Sa Đéc | Homestay | ~400.000đ/đêm (một nguồn ghi từ 300.000đ) | 0939 298 388 | ~2–3 km | Cặp đôi, khách thích homestay tre giữa vườn | Chưa kiểm chứng / chưa đối tác / chưa thu phí | travelviet.net, vungtautourism.com |

## 2B. Trời mưa thì đi đâu (bổ sung 08/11/2026)

Các điểm dưới đây đều đã có trong mục 1, chỉ chọn những điểm có mái che/không gian trong nhà, đi mưa được:

- Nhà cổ Huỳnh Thủy Lê
- Khu di tích Lăng cụ Phó bảng Nguyễn Sinh Sắc
- Chùa Vĩnh Tràng
- Chợ chiếu Định Yên

Dặn: Mưa thì vào nhà cổ Huỳnh Thủy Lê và lăng cụ Phó bảng — tránh Tràm Chim, Gáo Giồng vì toàn xuồng ngoài trời.

## 2C. Cho cặp đôi (bổ sung 08/11/2026)

Chỗ ở hợp cặp đôi (theo mục 'Hợp với ai' trong file):

- Khách sạn Bông Hồng Sa Đéc
- Khách sạn Hương Sen
- Maison en Bambou Phong – Le Vent (Nhà tre)

Điểm hợp cặp đôi (từ mục 1):

- Làng hoa kiểng Sa Đéc
- Khu du lịch sinh thái Đồng Sen Tháp Mười
- Cồn Thới Sơn
- Chợ nổi Cái Bè

## 2D. Mùa + tháng đẹp nhất (bổ sung 08/11/2026)

- Tháng đẹp nhất: Tháng 9–11 (mùa nước nổi: Tràm Chim, Xẻo Quýt đẹp nhất); tháng Chạp Âm lịch (làng hoa Sa Đéc rực rỡ đón Tết); sếu đầu đỏ về Tràm Chim tháng 12–4; sen nở tháng 5–6
- Nguồn: meta.best_season trong file (nghiên cứu ngày 06/11/2026; nguồn tổng xem meta.nguon_tong)
- Ngày kiểm: 06/11/2026

## 3. Ăn gì — 9 món (đủ quán + địa chỉ + khoảng giá)

| # | Món | Buổi ăn | Khoảng giá | Quán tham khảo (địa chỉ) | Nguồn |
|---|---|---|---|---|---|
| 1 | Hủ tiếu Sa Đéc | Ăn sáng / ăn trưa | 20.000–30.000đ/tô | (1) Hủ tiếu Bà Sẩm — 188 Trần Hưng Đạo, Phường 1, TP Sa Đéc. (2) Hủ tiếu Cô Liên — 111 Trần Phú, Phường 1, TP Sa Đéc | fptshop.com.vn, ecolotus.vn, nemtv.vn |
| 2 | Bánh tằm bì | Ăn sáng / ăn trưa | Chưa kiểm được giá riêng (tham khảo chung 20.000–30.000đ/phần) | (1) Bánh tằm bì Chú Dũng — 49B Phan Bội Châu, Phường 1, TP Sa Đéc | fptshop.com.vn, ecolotus.vn |
| 3 | Nem Lai Vung (mua về làm quà) | Ăn vặt / mua về | 35.000–60.000đ/xâu hoặc hộp 10 chiếc ~35.000đ (các nguồn ghi khác nhau) | (1) Cơ sở nem Lai Vung — ĐT851, Tân Thành, huyện Lai Vung. (2) Chợ Sa Đéc — 7–12 Lạc Long Quân, TP Sa Đéc | fptshop.com.vn, ecolotus.vn, tadiha.com |
| 4 | Lẩu cá linh bông điên điển (mùa nước nổi) | Ăn trưa / ăn tối (món nhóm) | Chưa kiểm được giá riêng tại Đồng Tháp (tham khảo chung miền Tây 120.000–250.000đ/nồi) | (1) Khu Ẩm thực Sinh Thái Đầm Sen — Phường Mỹ Phú, TP Cao Lãnh. (2) Khu du lịch Đồng Sen Tháp Mười — xã Tân Kiều, huyện Tháp Mười | bachhoaxanh.com, ecolotus.vn |
| 5 | Vịt nướng Sa Đéc | Ăn trưa / ăn tối | Chưa kiểm được giá riêng theo phần | (1) Quán Vịt nướng A Tài — 169 Nguyễn Cư Trinh, Khóm 5, Phường 1, TP Sa Đéc | bachhoaxanh.com, tadiha.com |
| 6 | Bánh phồng tôm Sa Giang (mua về) | Mua về làm quà | ~15.000đ/bịch (200 g) | (1) Cửa hàng thương mại Thịnh Phát — 88/6 Trần Hưng Đạo, TP Sa Đéc. (2) Cửa hàng Bích Vân — 112 Điện Biên Phủ, Phường Mỹ Phú, TP Cao Lãnh | fptshop.com.vn, nemtv.vn |
| 7 | Cá lóc nướng (Đồng Sen) | Ăn trưa | Chưa kiểm được giá riêng | (1) Khu du lịch Đồng Sen Tháp Mười — Số 1, ấp 1, xã Tân Kiều, huyện Tháp Mười | htt-furniture.com |
| 8 | Quýt hồng Lai Vung (ăn tại vườn/mua về) | Ăn xế / mua về | Theo giá thị trường/theo mùa (chưa kiểm được giá riêng) | (1) Vườn quýt hồng Hai Kiệt — 1068a Long Khánh A, Long Hậu, huyện Lai Vung | ecolotus.vn, tadiha.com |
| 9 | Mứt chuối phồng (mua về) | Mua về làm quà | Chưa kiểm được giá riêng | (1) Mứt chuối phồng Tư Bông — ấp Tân Thạnh, xã Phong Hòa, huyện Lai Vung | nemtv.vn |

## 3B. Nhận xét của M (06/11/2026) + đánh giá người dùng

Nhận xét dưới đây là chính kiến của M sau khi đọc review/bài viết tham khảo (nguồn ghi ở từng mục), không copy nguyên văn review, không bịa số sao. Mâu thuẫn giữa các nguồn được ghi rõ trong nhận xét. Đánh giá người dùng đang trống — app sẽ lưu đánh giá thật sau này.

### Địa danh

- **Làng hoa kiểng Sa Đéc** — Làng hoa Sa Đéc là điểm đẹp nhất Đồng Tháp nếu đi đúng mùa: tháng Chạp hoa rực cả làng, trồng trên giàn cao, thuyền chở hoa trên rạch — cảnh chỉ Sa Đéc mới có. Điểm yếu lớn nhất là lệch mùa thì vườn thưa hoa, nhiều du khách đi tháng thường thất vọng; giá vé mỗi vườn một khác (20.000–100.000đ). Hợp với người thích chụp ảnh, nên đi 15–20 tháng Chạp, tránh sau 23 tháng Chạp. _(Nguồn tham khảo: mytour.vn / dulich9.com / tsttourist.com; ngày kiểm 06/11/2026)_ — Đánh giá người dùng: chưa có đánh giá — bạn là người đầu tiên.
- **Nhà cổ Huỳnh Thủy Lê** — Nhà cổ Huỳnh Thủy Lê là điểm văn hóa đáng đi nhất Sa Đéc: kiến trúc Pháp–Hoa độc đáo, lại là bối cảnh tiểu thuyết 'L'Amant' nên có câu chuyện để kể. Điểm mạnh là có hướng dẫn viên và nước trà kèm vé; điểm yếu là giá vé các nguồn ghi 20.000đ vs 30.000đ, giờ mở cửa cũng ghi khác nhau. Hợp với người thích kiến trúc và văn học, nên đi buổi sáng, ghép với làng hoa. _(Nguồn tham khảo: mia.vn / tripi.vn / travelviet.net; ngày kiểm 06/11/2026)_ — Đánh giá người dùng: chưa có đánh giá — bạn là người đầu tiên.
- **Khu di tích Lăng cụ Phó bảng Nguyễn Sinh Sắc** — Lăng cụ Phó bảng Nguyễn Sinh Sắc trang nghiêm, khuôn viên rộng, cây xanh mát — hợp để viếng và tìm hiểu lịch sử, nhưng không có nhiều hoạt động giải trí. Điểm mạnh là miễn phí, không gian yên tĩnh; điểm yếu là giờ mở cửa chưa kiểm được chính thức, khách chỉ thích vui chơi sẽ thấy buồn. Hợp với người thích lịch sử và gia đình có người lớn tuổi, nên đi buổi sáng. _(Nguồn tham khảo: mia.vn / travelviet.net; ngày kiểm 06/11/2026)_ — Đánh giá người dùng: chưa có đánh giá — bạn là người đầu tiên.
- **Khu du lịch Xẻo Quýt** — Xẻo Quýt là rừng tràm chiến khu cũ, đi xuồng ba lá len lỏi dưới tán tràm rất mát và yên — trải nghiệm khác hẳn Trà Sư vì ít khách và mang màu lịch sử. Điểm mạnh là vé rẻ (vào cổng 20.000đ, xuồng 15.000đ); điểm yếu là quy mô nhỏ hơn Trà Sư, mùa khô nước cạn thì xuồng đi ngắn. Hợp với gia đình và người thích sinh thái nhẹ nhàng, nên đi buổi sáng. _(Nguồn tham khảo: nucuoimekong.com / mia.vn / tripi.vn; ngày kiểm 06/11/2026)_ — Đánh giá người dùng: chưa có đánh giá — bạn là người đầu tiên.
- **Khu du lịch sinh thái Gáo Giồng** — Gáo Giồng rộng hơn 2.000 ha rừng tràm, đi xuồng ngắm chim là trải nghiệm chính — nhưng so với Tràm Chim và Trà Sư thì Gáo Giồng ít được nhắc tới, dịch vụ cũng đơn giản hơn. Điểm mạnh là vé rẻ (10.000–15.000đ), không gian rộng, ít đông; điểm yếu là giờ mở cửa chưa kiểm được chính thức, mùa khô chim ít. Hợp với người thích chim và sinh thái, nên đi sáng sớm mùa nước nổi. _(Nguồn tham khảo: travelviet.net / htt-furniture.com; ngày kiểm 06/11/2026)_ — Đánh giá người dùng: chưa có đánh giá — bạn là người đầu tiên.
- **Vườn quốc gia Tràm Chim** — Tràm Chim là vườn quốc gia Ramsar, mùa sếu đầu đỏ (tháng 12–4) là thời điểm vàng — nhưng sếu về ít và không phải ngày nào cũng thấy, nhiều du khách đi lệch mùa chỉ thấy đồng nước mênh mông. Điểm mạnh là hệ sinh thái đặc sắc, đi tàu ngắm chim buổi sáng rất đáng; điểm yếu là vé tàu 500.000–800.000đ/chuyến khá cao nếu đi ít người. Hợp với người thích chim và nhiếp ảnh, nên đi sáng sớm, ghép đoàn để chia tiền tàu. _(Nguồn tham khảo: nucuoimekong.com / mia.vn; ngày kiểm 06/11/2026)_ — Đánh giá người dùng: chưa có đánh giá — bạn là người đầu tiên.
- **Khu du lịch sinh thái Đồng Sen Tháp Mười** — Đồng Sen Tháp Mười đẹp nhất mùa sen nở (tháng 5–6): ao sen rộng, chụp ảnh áo dài/bà ba rất ăn. Điểm yếu là mùa sen các nguồn ghi mâu thuẫn (tháng 5–6 vs tháng 8–1), đi lệch mùa thì ao sen thưa, kém đẹp. Điểm mạnh là vé rẻ (20.000–30.000đ), gần Gò Tháp; điểm yếu là dịch vụ ăn uống trong khu còn đơn giản. Hợp với người thích chụp ảnh, nên kiểm mùa sen trước khi đi. _(Nguồn tham khảo: mia.vn / htt-furniture.com; ngày kiểm 06/11/2026)_ — Đánh giá người dùng: chưa có đánh giá — bạn là người đầu tiên.
- **Khu di tích Gò Tháp** — Gò Tháp là di tích quốc gia đặc biệt gắn với văn hóa Óc Eo và Thiên Hộ Dương — giá trị lịch sử sâu, nhưng cảnh quan là gò đất và đền thờ, không hoành tráng về thị giác. Điểm mạnh là miễn phí, yên tĩnh, hợp tìm hiểu lịch sử; điểm yếu là ít biển chỉ dẫn và dịch vụ, khách chỉ thích check-in sẽ thấy nhạt. Hợp với người thích khảo cổ và lịch sử, nên đi buổi sáng, ghép với Đồng Sen. _(Nguồn tham khảo: mia.vn / dulichbinhminh.com; ngày kiểm 06/11/2026)_ — Đánh giá người dùng: chưa có đánh giá — bạn là người đầu tiên.
- **Vườn quýt hồng Lai Vung** — Vườn quýt hồng Lai Vung đáng đi nhất dịp Tết: quýt chín đỏ rực cả vườn, ăn tại chỗ và mua mang về đều ngon. Điểm mạnh là quýt hồng là đặc sản đúng gốc, giá theo mùa hợp lý; điểm yếu là ngoài mùa quýt thì vườn chỉ còn cây xanh, vé vào vườn riêng chưa kiểm được mức. Hợp với gia đình dịp Tết, nên đi tháng Chạp, hỏi giá trước khi hái. _(Nguồn tham khảo: ecolotus.vn / tadiha.com / dulich9.com; ngày kiểm 06/11/2026)_ — Đánh giá người dùng: chưa có đánh giá — bạn là người đầu tiên.
- **Chợ chiếu Định Yên** — Chợ chiếu Định Yên là chợ làng nghề độc đáo: chiếu thủ công, phiên chợ đêm có đốt đèn — nhưng chợ họp không phải ngày nào cũng đông, đi lệch phiên thì chỉ còn vài sạp. Điểm mạnh là miễn phí, mua chiếu tận gốc rẻ; điểm yếu là lịch chợ đêm chưa kiểm được chính xác, ít thông tin cập nhật. Hợp với người thích làng nghề, nên hỏi lịch phiên chợ trước khi đi. _(Nguồn tham khảo: mia.vn; ngày kiểm 06/11/2026)_ — Đánh giá người dùng: chưa có đánh giá — bạn là người đầu tiên.
- **Chợ nổi Cái Bè** — Cái Bè là chợ nổi 'thật' hơn Cái Răng: ít khách du lịch, ghe hàng vẫn buôn bán đúng nghĩa chứ không phải diễn cho khách xem. Điểm mạnh là không khí chân chất và trái cây đầu mối rẻ; điểm yếu là quy mô nhỏ, đi muộn là hết chợ, dịch vụ ăn uống trên ghe ít hơn Cái Răng. Hợp với người đã đi Cái Răng và muốn thấy chợ nổi còn nguyên bản, nên đi 5–7h sáng. _(Nguồn tham khảo: mia.vn / dulichviet.com.vn; ngày kiểm 06/11/2026)_ — Đánh giá người dùng: chưa có đánh giá — bạn là người đầu tiên.
- **Chùa Vĩnh Tràng** — Vĩnh Tràng là ngôi chùa đẹp nhất vùng này nếu xét kiến trúc: cổng tam quan, tượng Phật, chạm khắc pha Việt–Hoa–Khmer–Pháp, chụp góc nào cũng ra ảnh. Điểm mạnh là miễn phí, khuôn viên rộng, mát; điểm yếu là khách đoàn đông, giờ cao điểm ồn và khó chụp ảnh vắng người. Hợp với mọi đối tượng, nên đi sáng sớm hoặc chiều muộn, ghép với Cồn Thới Sơn. _(Nguồn tham khảo: mia.vn / dulichviet.com.vn; ngày kiểm 06/11/2026)_ — Đánh giá người dùng: chưa có đánh giá — bạn là người đầu tiên.
- **Cồn Thới Sơn** — Thới Sơn là cồn 'quốc dân' của tour miền Tây: vườn trái cây, nghe đờn ca tài tử, ăn trái cây tại vườn — mọi thứ đều có, nhưng cũng vì thế mà cảm giác thương mại rõ nhất trong các cồn. Điểm mạnh là tiện, đi từ Mỹ Tho chỉ mất ít phút đò, phù hợp gia đình có người lớn tuổi; điểm yếu là đông khách đoàn, các điểm dừng na ná nhau. Hợp với khách lần đầu đi miền Tây, nên đi tour buổi sáng, tránh giờ trưa. _(Nguồn tham khảo: mia.vn / dulichviet.com.vn; ngày kiểm 06/11/2026)_ — Đánh giá người dùng: chưa có đánh giá — bạn là người đầu tiên.

### Món ăn

- **Hủ tiếu Sa Đéc** — Hủ tiếu Sa Đéc là món nhất định phải ăn ở Sa Đéc: sợi hủ tiếu dai, nước lèo ngọt xương, giá chỉ 20.000–30.000đ/tô. Điểm mạnh là quán Bà Sẩm nổi tiếng, ăn sáng đúng vị; điểm yếu là quán đông, đến sau 12h có thể hết. Hợp với mọi đối tượng, nên ăn sáng ở Bà Sẩm (188 Trần Hưng Đạo). _(Nguồn tham khảo: fptshop.com.vn / ecolotus.vn; ngày kiểm 06/11/2026)_ — Đánh giá người dùng: chưa có đánh giá — bạn là người đầu tiên.
- **Bánh tằm bì** — Bánh tằm bì Sa Đéc sợi bánh mềm, bì thính, nước cốt dừa béo — món ăn sáng nhẹ nhàng, đúng chất Sa Đéc. Điểm yếu là giá riêng chưa kiểm được (tham khảo chung 20.000–30.000đ/phần), chỉ có một quán tham khảo là Chú Dũng. Hợp với ăn sáng, nên ăn kèm hủ tiếu cho đủ bữa. _(Nguồn tham khảo: fptshop.com.vn / ecolotus.vn; ngày kiểm 06/11/2026)_ — Đánh giá người dùng: chưa có đánh giá — bạn là người đầu tiên.
- **Nem Lai Vung** — Nem Lai Vung chua vừa, thơm lá ổi, mua về làm quà là chuẩn nhất Đồng Tháp. Điểm yếu là giá các nguồn ghi khác nhau theo đơn vị (35.000đ/hộp 10 chiếc vs 40.000–60.000đ/xâu) nên phải hỏi rõ đơn vị tính trước khi mua. Hợp với mua quà, nên mua ở cơ sở trên ĐT851 hoặc chợ Sa Đéc. _(Nguồn tham khảo: fptshop.com.vn / ecolotus.vn / tadiha.com; ngày kiểm 06/11/2026)_ — Đánh giá người dùng: chưa có đánh giá — bạn là người đầu tiên.
- **Lẩu cá linh bông điên điển** — Lẩu cá linh Đồng Tháp ngon nhất mùa nước nổi, ăn ở Cao Lãnh hay Đồng Sen đều được. Điểm yếu là giá riêng tại Đồng Tháp chưa kiểm được, tham khảo chung 120.000–250.000đ/nồi. Hợp với nhóm đi tháng 9–11, nên ăn ở Đầm Sen Cao Lãnh. _(Nguồn tham khảo: bachhoaxanh.com / ecolotus.vn; ngày kiểm 06/11/2026)_ — Đánh giá người dùng: chưa có đánh giá — bạn là người đầu tiên.
- **Vịt nướng Sa Đéc** — Vịt nướng Sa Đéc da giòn, thịt thơm, là món trưa đáng thử ở Sa Đéc. Điểm yếu là giá riêng theo phần chưa kiểm được, chỉ có một quán tham khảo là A Tài. Hợp với ăn trưa nhóm, nên ăn ở A Tài (169 Nguyễn Cư Trinh). _(Nguồn tham khảo: bachhoaxanh.com / tadiha.com; ngày kiểm 06/11/2026)_ — Đánh giá người dùng: chưa có đánh giá — bạn là người đầu tiên.
- **Bánh phồng tôm Sa Giang** — Bánh phồng tôm Sa Giang là quà mang về chuẩn Sa Đéc: giòn, thơm tôm, giá chỉ ~15.000đ/bịch 200 g. Điểm mạnh là rẻ, dễ mua ở nhiều cửa hàng; điểm yếu là hàng nhái nhiều, nên mua ở cửa hàng Thịnh Phát hoặc Bích Vân cho chắc. Hợp với mua quà. _(Nguồn tham khảo: fptshop.com.vn / nemtv.vn; ngày kiểm 06/11/2026)_ — Đánh giá người dùng: chưa có đánh giá — bạn là người đầu tiên.
- **Cá lóc nướng (Đồng Sen)** — Cá lóc nướng ở Đồng Sen ăn giữa ao sen, vừa ăn vừa ngắm sen — không gian là điểm cộng lớn nhất. Điểm yếu là giá riêng chưa kiểm được, món này phụ thuộc vào khu du lịch Đồng Sen. Hợp với ăn trưa khi tham quan Đồng Sen, nên hỏi giá trước khi gọi. _(Nguồn tham khảo: htt-furniture.com; ngày kiểm 06/11/2026)_ — Đánh giá người dùng: chưa có đánh giá — bạn là người đầu tiên.
- **Quýt hồng Lai Vung** — Quýt hồng Lai Vung ngọt thanh, vỏ mỏng, là đặc sản mua về dịp Tết. Điểm yếu là giá theo mùa, chưa kiểm được giá riêng; đi lệch mùa thì không có quýt chín. Hợp với mua quà dịp Tết, nên mua tại vườn Hai Kiệt. _(Nguồn tham khảo: ecolotus.vn / tadiha.com; ngày kiểm 06/11/2026)_ — Đánh giá người dùng: chưa có đánh giá — bạn là người đầu tiên.
- **Mứt chuối phồng** — Mứt chuối phồng Lai Vung dẻo, ngọt vừa, là món quà quê ít nơi có. Điểm yếu là giá riêng chưa kiểm được, chỉ có một cơ sở tham khảo là Tư Bông. Hợp với mua quà, nên mua ở ấp Tân Thạnh, Phong Hòa. _(Nguồn tham khảo: nemtv.vn; ngày kiểm 06/11/2026)_ — Đánh giá người dùng: chưa có đánh giá — bạn là người đầu tiên.

### Chỗ ở

Mọi chỗ ở ở mục 2 đều có mục đánh giá người dùng đang trống — chưa có đánh giá, bạn là người đầu tiên.
## 4. Đi đến Đồng Tháp bằng gì

Không có sân bay/ga tàu tại Đồng Tháp. Sân bay gần nhất: Cần Thơ (VCA, cách Cao Lãnh ~80 km, cách Sa Đéc ~90 km) hoặc Tân Sơn Nhất (SGN, cách Sa Đéc ~140 km).

### 4.1. Từ TP.HCM (~140 km tới Sa Đéc; ~160 km tới Cao Lãnh)

| Phương tiện | Thời gian | Khoảng giá | Hãng / ghi chú | Nguồn |
|---|---|---|---|---|
| Xe khách / giường nằm | 3–3,5 giờ | ~115.000–180.000đ/vé (Phương Trang SG — Cao Lãnh 115.000đ theo limody; tuyến SG — Sa Đéc chưa kiểm được giá riêng từng hãng) | Phương Trang hotline 1900 6067; các hãng tuyến SG — Cao Lãnh/Sa Đéc chạy từ Bến xe Miền Tây | limody.vn, vexesapa.vn |
| Limousine | 3–3,5 giờ | Chưa kiểm được giá riêng tuyến SG — Sa Đéc/Cao Lãnh (tham khảo chung miền Tây ~180.000–250.000đ/vé) | — | Chưa kiểm được |
| Xe máy / ô tô riêng (QL1A + cao tốc) | Ô tô 3–3,5 giờ; xe máy ~4–5 giờ | Chưa kiểm được giá thuê theo tuyến | Lộ trình: TP.HCM → cao tốc Trung Lương – Mỹ Thuận → QL1A → Sa Đéc/Cao Lãnh (qua cầu Mỹ Thuận) | vexesapa.vn |
| Máy bay + xe (qua Cần Thơ) | Bay SGN–VCA ~45–55 phút + xe VCA — Sa Đéc ~2 giờ | Vé máy bay tùy thời điểm đặt (chưa kiểm được giá riêng tuyến SGN–VCA) | Chỉ hợp khi kết hợp Cần Thơ; đa số khách đi xe khách thẳng | vietjetair.com |

### 4.2. Từ Hà Nội

| Phương tiện | Thời gian | Khoảng giá | Ghi chú | Nguồn |
|---|---|---|---|---|
| Máy bay HAN–VCA (Cần Thơ) rồi xe về Sa Đéc/Cao Lãnh | Bay ~2h10 + xe VCA — Sa Đéc ~2 giờ, VCA — Cao Lãnh ~1,5–2 giờ | Vé máy bay HAN–VCA ~1.300.000đ/chiều đã gồm thuế phí (tham khảo; vé rẻ chưa thuế phí có thể từ ~799.000đ) | Phương án khuyên dùng | vietair.com.vn, vietjetair.com |
| Máy bay HAN–SGN rồi xe lên Đồng Tháp | Bay ~2h05 + xe SG — Sa Đéc 3–3,5 giờ | Vé HAN–SGN tùy thời điểm đặt (chưa kiểm được giá riêng); xe SG — Sa Đéc ~115.000–180.000đ/vé | Phương án thay thế | limody.vn |
| Xe khách HN — Đồng Tháp | Chưa kiểm được tuyến thẳng + thời gian/giá | Chưa kiểm được | Không khuyến khích; đa số nguồn khuyên bay | Chưa kiểm được |

### 4.3. Từ sân bay Cần Thơ (VCA) vào Sa Đéc/Cao Lãnh (~80–90 km, ~1,5–2 giờ)

| Phương tiện | Khoảng giá | Ghi chú | Nguồn |
|---|---|---|---|
| Taxi / xe công nghệ | Chưa kiểm được giá riêng tuyến VCA — Sa Đéc/Cao Lãnh | Hỏi rõ giá trọn gói trước khi lên xe; có thể đi taxi về Cần Thơ rồi bắt xe khách đi Cao Lãnh/Sa Đéc | vietair.com.vn |
| Xe khách Cần Thơ — Cao Lãnh/Sa Đéc | Chưa kiểm được giá riêng (tham khảo tuyến Cần Thơ — Cao Lãnh ~100.000–150.000đ/vé) | Đón tại bến xe Cần Thơ | Chưa kiểm được |

## 5. Đi lại trong Đồng Tháp

| Phương tiện | Khoảng giá | Giấy tờ / điều kiện | Ghi chú | Nguồn |
|---|---|---|---|---|
| Thuê xe máy — xe số | ~100.000–150.000đ/ngày (tham khảo chung miền Tây; chưa kiểm được mức riêng tại Sa Đéc/Cao Lãnh) | CCCD (hoặc hộ chiếu) + bằng lái A1 (bắt buộc với xe trên 50cc); nên nộp bản photo CCCD, giữ bản gốc | Các điểm Đồng Tháp cách nhau 20–50 km, xe máy là phương tiện linh hoạt nhất; đổ xăng đầy trước khi đi Tràm Chim/Đồng Sen | luxurytravel.vn |
| Thuê xe máy — tay ga | Chưa kiểm được mức riêng tại Đồng Tháp (tham khảo chung miền Tây ~150.000–200.000đ/ngày) | Như trên | — | Chưa kiểm được |
| Taxi nội thành / xe công nghệ | Chưa kiểm được bảng giá taxi riêng tại Sa Đéc/Cao Lãnh | — | Grab/Be phủ sóng hạn chế ở Cao Lãnh/Sa Đéc; hỏi giá trước khi đi | Chưa kiểm được |
| Xuồng/thuyền tham quan | Xẻo Quýt: xuồng chèo 15.000đ/khách; Tràm Chim: thuê tàu 500.000đ (12 km) hoặc 800.000đ (21 km); xe điện Tràm Chim 30.000đ/người | — | Mặc áo phao; tàu Tràm Chim đi theo đoàn/tuyến, hỏi trước giờ tàu | nucuoimekong.com, tripi.vn |
| Thuê ô tô có tài xế theo ngày (trong tỉnh) | Chưa kiểm được mức riêng tại Đồng Tháp (tham khảo chung miền Tây xe 4 chỗ ~900.000–1.400.000đ/ngày) | — | Hợp nhóm 4–7 người đi Tràm Chim — Đồng Sen trong ngày | Chưa kiểm được |

## 6. Lịch trình mẫu

### 6.1. Lịch trình 3N2Đ (chính)

| Ngày | Buổi | Hoạt động | Điểm / quán gắn kèm |
|---|---|---|---|
| Ngày 1 — Sa Đéc | Sáng | Làng hoa kiểng Sa Đéc (2–3 giờ) | Địa danh 1 |
| Ngày 1 | Trưa | Hủ tiếu Sa Đéc (Bà Sẩm) + bánh tằm bì Chú Dũng | Món 1, 2 |
| Ngày 1 | Chiều | Nhà cổ Huỳnh Thủy Lê (45–60 phút) + dạo chợ Sa Đéc mua nem Lai Vung, bánh phồng tôm Sa Giang | Địa danh 2; món 3, 6 |
| Ngày 1 | Tối | Vịt nướng Sa Đéc (A Tài) | Món 5 |
| Ngày 2 — Cao Lãnh | Sáng | Lăng cụ Phó bảng Nguyễn Sinh Sắc (1–1,5 giờ) | Địa danh 3 |
| Ngày 2 | Trưa–chiều | Khu du lịch Xẻo Quýt (2–3 giờ, xuồng ba lá) | Địa danh 4 |
| Ngày 2 | Chiều | Gáo Giồng (2–3 giờ, ngắm chim) hoặc về Cao Lãnh ăn lẩu cá linh | Địa danh 5; món 4 |
| Ngày 2 | Tối | Nghỉ Cao Lãnh | Chỗ ở 1, 2, 3 |
| Ngày 3 — Đồng Tháp Mười | Sáng sớm | Vườn quốc gia Tràm Chim (nửa ngày, đi tàu) | Địa danh 6 |
| Ngày 3 | Trưa–chiều | Đồng Sen Tháp Mười + Gò Tháp, về Sa Đéc trả phòng | Địa danh 7, 8 |
| Ngày 3 | Tối | Về | — |

## 7. Bảng chi phí ước tính (1 người, 3N2Đ từ TP.HCM, ở khách sạn/homestay Sa Đéc–Cao Lãnh, đi xe khách)

| Hạng mục | Ước tính 3N2Đ / người | Căn cứ |
|---|---|---|
| Xe SG–Đồng Tháp khứ hồi | 230.000–360.000đ | Mục 4.1 (115.000–180.000đ/vé/chiều) |
| Ở 2 đêm (chia đôi phòng) | 320.000–730.000đ | Mục 2 (320.000–730.000đ/đêm, chia 2 người) |
| Ăn 3 ngày | 450.000–800.000đ | Mục 3 (món 20.000–30.000đ/tô; lẩu nhóm chia 2–4 người) |
| Vé tham quan | 60.000–200.000đ | Mục 1 (Tràm Chim 20.000đ + xe điện/tàu chia nhóm; Xẻo Quýt 20.000đ + xuồng 15.000đ; Đồng Sen 20.000–30.000đ) |
| Thuê xe máy 2–3 ngày | 200.000–450.000đ | Mục 5 (100.000–150.000đ/ngày) |
| Xuồng/tàu tham quan (chia nhóm) | 50.000–200.000đ | Mục 5 (tàu Tràm Chim 500.000–800.000đ/chuyến chia nhóm) |
| **Tổng ước tính** | **1.310.000–2.740.000đ/người** | Cộng các khoảng trên |
| Nếu đi từ Hà Nội | Vé máy bay là hạng mục lớn nhất: HAN–VCA ~1.300.000đ/chiều (tham khảo) + xe VCA — Sa Đéc/Cao Lãnh | Mục 4.2 |

Quy tắc hiển thị giá trong app: luôn ghi khoảng giá + ngày kiểm (06/11/2026), không ghi một giá cố định.

## 8. Checklist mang theo

- Áo chống nắng, mũ, kem chống nắng (đi Tràm Chim/Đồng Sen ngoài trời nhiều, nắng gắt).
- Áo mưa mỏng (mùa mưa tháng 5–10; mùa nước nổi tháng 9–11), giày/dép chống trơn.
- CCCD + bằng lái A1 (nếu thuê xe máy), tiền mặt lẻ (vé xuồng/tàu, chợ, quán nhỏ).
- Thuốc chống muỗi (rừng tràm Xẻo Quýt/Gáo Giồng nhiều muỗi), thuốc cơ bản; sạc dự phòng.
- Ống nhòm/máy ảnh nếu đi ngắm chim Tràm Chim; hỏi giá tàu/xuồng trước khi đi.

## 9. Mục chưa kiểm được / cần xác nhận lại (ghi rõ, không bịa)

1. Giá vé Nhà cổ Huỳnh Thủy Lê (20.000đ vs 30.000đ)
2. Giá vé Làng hoa Sa Đéc (miễn phí vào làng vs 20.000–100.000đ/người cho vườn hoa riêng/dịch vụ)
3. Mùa sen Đồng Sen Tháp Mười (tháng 5–6 vs tháng 8–1)
4. Giờ mở cửa Nhà cổ Huỳnh Thủy Lê (7:00–17:00 vs 8:30–17:30)
5. Giờ mở cửa Tràm Chim, Gáo Giồng, Đồng Sen, Gò Tháp, Lăng Nguyễn Sinh Sắc
6. Tọa độ GPS: Gò Tháp chỉ có tọa độ xấp xỉ theo tọa độ công bố (10,583°B 105,8°Đ), cần kiểm lại; Làng hoa Sa Đéc và Đồng Sen chỉ có tọa độ mức khu vực
7. Địa giới sau sáp nhập 01/07/2025: đợt 06/11/2026 đã thêm 3 điểm khu vực Tiền Giang cũ (Chợ nổi Cái Bè, Chùa Vĩnh Tràng, Cồn Thới Sơn); các điểm khác thuộc khu vực này (Trại rắn Đồng Tâm, biển Tân Thành) vẫn chưa nhập
8. Giá vé riêng Cồn Thới Sơn và giá thuê ghe Chợ nổi Cái Bè chưa kiểm được
9. Chùa Lá Sen, Vườn chà là: chưa kiểm được địa chỉ + giá vé riêng nên chưa đưa vào
10. Khách sạn Trí Lê: địa chỉ chi tiết
11. Sadec Farmstay: 500.000–1.200.000đ/đêm vs từ 180.000đ/người — chưa rõ gồm những gì
12. Maison en Bambou Phong – Le Vent: ~400.000đ vs từ 300.000đ
13. Hạng sao các khách sạn Đồng Tháp (trừ Bông Hồng 3 sao)
14. Giá riêng các món bánh tằm bì, vịt nướng Sa Đéc, lẩu cá linh, cá lóc nướng Đồng Sen, quýt hồng, mứt chuối phồng
15. Giá nem Lai Vung (35.000đ/hộp 10 chiếc vs 40.000–60.000đ/xâu — đơn vị tính khác nhau)
16. Giá vé xe khách SG — Sa Đéc từng hãng (chỉ có SG — Cao Lãnh 115.000đ của Phương Trang)
17. Giá limousine SG — Sa Đéc/Cao Lãnh, giá taxi nội thành, giá thuê xe máy tay ga tại Đồng Tháp
18. Giá xe VCA — Sa Đéc/Cao Lãnh và giá xe Cần Thơ — Cao Lãnh/Sa Đéc
19. Tuyến xe khách thẳng Hà Nội — Đồng Tháp: chưa kiểm được có tuyến hay không

## 10. Cảnh báo chặt chém + lừa cọc (bổ sung 08/11/2026)

- **Thuê xuồng, thuyền ở Tràm Chim, Xẻo Quýt, Gáo Giồng: giá thuê không thống nhất, phụ thu; có thuyền không đủ áo phao.** Cách tránh: Mua vé tại quầy chính thức của khu du lịch, hỏi rõ giá đã gồm những gì; kiểm tra áo phao; mặc áo phao suốt chuyến. (Nguồn: Cảnh báo chung theo kinh nghiệm du lịch và báo chí; chưa tra được vụ việc riêng của tỉnh này trên báo chính thống (ngày kiểm 08/11/2026))
- **Mua sen, đặc sản ở làng hoa Sa Đéc và chợ Sa Đéc: giá hét cao với khách lạ, hàng không đúng mô tả.** Cách tránh: Hỏi giá trước khi mua; so giá 2-3 sạp; kiểm tra hàng trước khi trả tiền. (Nguồn: Cảnh báo chung theo kinh nghiệm du lịch và báo chí; chưa tra được vụ việc riêng của tỉnh này trên báo chính thống (ngày kiểm 08/11/2026))
- **Lừa cọc homestay/khách sạn đặt qua Facebook, Zalo: mạo danh chủ nhà, giá rẻ, giục cọc 30-50% rồi chặn liên lạc.** Cách tránh: Chỉ đặt qua nền tảng có cơ chế hoàn tiền hoặc gọi số trên website/fanpage chính thức để xác nhận; yêu cầu gọi video trực tiếp tại phòng. (Nguồn: Báo Nhân Dân — Nhiều chiêu trò lừa đảo đặt phòng khách sạn (05/08/2023): mạo danh chủ khách sạn/homestay, giá rẻ trên Facebook/Zalo, yêu cầu cọc 30-50% rồi chặn liên lạc; một vụ ở Quảng Ninh chiếm đoạt khoảng 100 triệu đồng và đã bị khởi tố (ngày kiểm 08/11/2026))
- **Xe ôm, taxi ở bến xe Cao Lãnh, Sa Đéc hét giá cao, chở vòng.** Cách tránh: Dùng taxi có đồng hồ/hãng quen hoặc đặt xe qua ứng dụng; thỏa thuận giá trước khi lên xe. (Nguồn: Cảnh báo chung theo kinh nghiệm du lịch và báo chí; chưa tra được vụ việc riêng của tỉnh này trên báo chính thống (ngày kiểm 08/11/2026))


## 11. An toàn đường đèo + thuê xe máy (bổ sung 08/11/2026)

Tỉnh đồng bằng/ven biển, không có đèo.

(Nguồn: Tỉnh đồng bằng, không có đèo (ngày kiểm 08/11/2026))


## 12. Số khẩn cấp + xử lý sự cố (bổ sung 08/11/2026)

- Công an: 113 — Cấp cứu: 115 — Cứu hỏa: 114
- Số riêng của tỉnh: chưa tra được nguồn chính thức — khi cần gọi 113/115/114.

(Nguồn: số chung cả nước 113/115/114 là số khẩn cấp quốc gia; số riêng theo nguồn ghi trong từng mục (ngày kiểm 08/11/2026))


## 13. Giờ đẹp chụp ảnh (bổ sung 08/11/2026)

| # | Điểm | Giờ đẹp | Nguồn |
|---|---|---|---|
| 1 | Làng hoa kiểng Sa Đéc | 6:00-8:00 sáng, ánh sáng mềm trên vườn hoa | Khung giờ vàng chung cho chụp ảnh ngoài trời tại Việt Nam; chưa có hướng dẫn riêng cho điểm này (ngày kiểm 08/11/2026) |
| 2 | Vườn quốc gia Tràm Chim | 6:00-8:00 sáng chim hoạt động hoặc 16:30-18:00 chiều chim bay về tổ | Khung giờ vàng chung cho chụp ảnh ngoài trời tại Việt Nam; chưa có hướng dẫn riêng cho điểm này (ngày kiểm 08/11/2026) |
| 3 | Khu du lịch sinh thái Đồng Sen Tháp Mười | 7:00-9:00 sáng hoặc 16:00-17:30 chiều, sen nở đẹp, ánh sáng vàng | Khung giờ vàng chung cho chụp ảnh ngoài trời tại Việt Nam; chưa có hướng dẫn riêng cho điểm này (ngày kiểm 08/11/2026) |


## 14. Cho người chạy giải (bổ sung 08/11/2026)

**Giải chạy (đã kiểm nguồn):**
- VPBank Đất Sen Hồng Music Marathon — Tháng 10 hằng năm (mùa 2025: 10-12/10/2025, thi đấu chính 12/10/2025) (Nguồn: Báo Nhân Dân — Ấn tượng giải chạy VPBank Đất Sen Hồng Music Marathon 2025 (16/10/2025); Tuổi Trẻ — 12.000 runner tham gia giải VPBank Đất Sen Hồng Music Marathon 2025 (16/8/2025) (ngày kiểm 08/11/2026))

**Điểm chạy bộ đẹp:** Quảng trường Văn Miếu, Cao Lãnh (điểm xuất phát/về đích của giải); Đường ven sông Tiền, Cao Lãnh; Đường quanh làng hoa Sa Đéc buổi sáng.

**Chỗ ở gần điểm xuất phát** (lấy từ mục chỗ ở đã có): Khách sạn B.O.B Cao Lãnh; Khách sạn Bông Hồng Sa Đéc.

(Nguồn: Báo Nhân Dân và Tuổi Trẻ về giải Đất Sen Hồng; chỗ ở lấy từ dữ liệu chỗ ở đã có của tỉnh (ngày kiểm 08/11/2026))
