# Dữ liệu cẩm nang Vĩnh Long — Giai đoạn 1 (đầy đủ)

- **Trạng thái: published** — đẩy lên theo lệnh anh ngày 06/11/2026 (đẩy hết lên, bỏ vòng duyệt chuyên gia; các nợ dữ liệu vẫn giữ nguyên, xem mục 9).
- Ngày kiểm: 06/11/2026. Mọi giá đều là **khoảng giá tham khảo** từ nguồn công khai, không phải giá chốt. Giá đổi theo mùa, cuối tuần, lễ Tết — kiểm lại trước ngày đi.
- Bổ sung 08/11/2026: số điện thoại chỗ ở (cột Điện thoại, mục 2) + mục 2B Trời mưa thì đi đâu + mục 2C Cho cặp đôi + mục 2D Mùa + tháng đẹp nhất. Số điện thoại tra từ nguồn công khai ngày 08/11/2026; chỗ nào ghi 'Chưa tra được' là chưa tìm thấy số khớp tên + địa chỉ.
- Nguồn sự thật: nghiên cứu từ nguồn công khai ngày 06/11/2026 (tên miền nguồn ghi ở từng mục).
- **Lưu ý địa giới:** từ 01/07/2025, tỉnh Vĩnh Long mới được hình thành trên cơ sở hợp nhất địa bàn ba tỉnh Vĩnh Long, Bến Tre và Trà Vinh trước đây. File này tập trung vào **khu vực Vĩnh Long cũ** (trung tâm TP Vĩnh Long, Cù lao An Bình, Trà Ôn, Mang Thít), giữ phạm vi thống nhất với các nguồn tra được; các điểm thuộc khu vực Bến Tre/Trà Vinh cũ chưa nhập trong đợt này (xem mục 9). Đợt 06/11/2026 đã thêm 3 điểm khu vực Bến Tre/Trà Vinh cũ (làng hoa Cái Mơn, Cồn Phụng, Ao Bà Om — Chùa Âng), chỉ điểm gần, cùng cụm di chuyển được.
- **Khách sạn/homestay: CHỈ giới thiệu sơ.** Tất cả đều ghi "chưa kiểm chứng / chưa đối tác / chưa thu phí". Không dùng chữ uy tín/đảm bảo. Không nhận đặt phòng, không nhận tiền.
- Khoảng cách là đường đi ước tính theo nguồn, không phải đường chim bay. Tọa độ ghi "chưa kiểm được" thì để null trong file JSON, không bịa.
- File JSON máy đọc được: `vinh-long.json` (cùng thư mục).

## 1. Địa danh — 13 điểm chính

Mốc tính khoảng cách: trung tâm TP Vĩnh Long (bến phà An Bình / chợ Vĩnh Long).

### 1.1. Cụm trung tâm TP Vĩnh Long

| # | Tên | Địa chỉ | Tọa độ | Cách trung tâm | Giá vé | Giờ mở cửa | Thời gian | Hợp với ai | Lưu ý | Nguồn |
|---|---|---|---|---|---|---|---|---|---|---|
| 1 | Chùa Phật Ngọc Xá Lợi | 287A QL80 (nay QL1A theo geocode), ấp Vĩnh Hòa, xã Tân Ngãi, TP Vĩnh Long | 10.26938, 105.91565 | ~6–7 km | Miễn phí | Cả ngày (một nguồn ghi 7:00–19:00) | 45–60 phút | Mọi đối tượng, người thích kiến trúc/chùa chiền | Chùa lớn, tháp 9 tầng cao nhất miền Tây; ăn mặc lịch sự, giữ yên lặng | intour.com.vn, thoitiet247.edu.vn, 190travel.com |
| 2 | Văn Thánh Miếu | Đường Trần Phú, Phường 4, TP Vĩnh Long | 10.24432, 105.98427 | ~1 km | Miễn phí | Khoảng 8:00–16:00 (một nguồn ghi Chủ nhật đóng cửa — chưa kiểm được) | 30–45 phút | Người yêu lịch sử/kiến trúc, học sinh | Được gọi là "Quốc Tử Giám của phương Nam", công trình thời Nguyễn; khuôn viên nhỏ, mát | intour.com.vn, thoitiet247.edu.vn, mytour.vn |
| 3 | Chùa Ông — Thất Phủ Miếu | Số 22 Nguyễn Chí Thanh, Phường 5, TP Vĩnh Long | Chưa kiểm được tọa độ chính xác | ~1 km | Miễn phí | Chưa kiểm được giờ chính thức | 30 phút | Người thích kiến trúc Hoa, khách hành hương | Chùa người Hoa lâu đời ở trung tâm; đi cùng cung Văn Thánh Miếu — Chợ Vĩnh Long | khamphadisan.com.vn, mytour.vn |
| 4 | Cầu Mỹ Thuận | Cầu Mỹ Thuận, phường Tân Hòa, TP Vĩnh Long (nối Vĩnh Long — Tiền Giang qua sông Tiền) | 10.27289, 105.9118 | ~8–10 km | Miễn phí (chỉ ngắm/chụp ảnh từ hai đầu cầu, không dừng xe giữa cầu) | 24/7 (không gian giao thông) | 10–15 phút ghé chụp ảnh | Mọi đối tượng, khách đi ngang tuyến SG — Vĩnh Long | Chỉ là điểm ghé ngang chụp ảnh, không cần cố tình tìm đến; không dừng xe giữa cầu | wikidulich.com, dulichviet.com.vn |

### 1.2. Cụm Cù lao An Bình

| # | Tên | Địa chỉ | Tọa độ | Cách trung tâm | Giá vé | Giờ mở cửa | Thời gian | Hợp với ai | Lưu ý | Nguồn |
|---|---|---|---|---|---|---|---|---|---|---|
| 5 | Cù lao An Bình | Giữa sông Tiền và sông Cổ Chiên, huyện Long Hồ (gồm 4 xã An Bình, Bình Hòa Phước, Hòa Ninh, Đồng Phú), qua phà An Bình | 10.25995, 105.97028 (tọa độ bến phà An Bình, mức khu vực) | ~4–6 km (qua phà An Bình) | Miễn phí vào cù lao; vé tham quan vườn trái cây 30.000–50.000đ/người (theo nguồn); tour thuyền tham quan làng nghề: thuyền nhỏ ~350.000đ/chuyến, thuyền lớn ~850.000đ/chuyến | Cả ngày (vườn trái cây thường đón khách ban ngày) | Nửa ngày đến 1 ngày | Gia đình, nhóm bạn, người thích miệt vườn | Đi phà An Bình từ TP Vĩnh Long; hỏi giá vườn/thuyền trước; mang áo chống nắng, thuốc chống muỗi | wikidulich.com, mia.vn, dulichviet.com.vn, facebook.com (KÚN ĐẾN ĐÂY) |
| 6 | Khu du lịch Vinh Sang | Tổ 14, ấp An Thuận, xã An Bình, huyện Long Hồ (đầu cù lao An Bình) | 10.2703, 105.95378 | ~6–8 km | Người lớn 50.000đ, trẻ em (dưới 1,3 m) 35.000đ (ngưỡng trẻ em theo vinhsang.com — kiểm 08/11/2026; một nguồn ghi 70.000–100.000đ/người — mâu thuẫn, xem mục 9) | Khoảng 7:30–17:00 / 9:00–18:00 (các nguồn ghi khác nhau) | 2–3 giờ | Gia đình có trẻ nhỏ, nhóm bạn | Có cưỡi đà điểu, chèo xuồng, bắt cá, vườn trái cây; một số trò/dịch vụ thu thêm | intour.com.vn, thoitiet247.edu.vn, 190travel.com, vietnamairlines.com |
| 7 | Nhà cổ Cai Cường | Xã Bình Hòa Phước, huyện Long Hồ (cù lao An Bình) | 10.28966, 106.00816 | ~10 km | Miễn phí theo đa số nguồn; một nguồn ghi 20.000đ/người (mâu thuẫn, xem mục 9) | Cả ngày (tham quan tự do) | 30–60 phút | Người yêu kiến trúc/nhà cổ, cặp đôi chụp ảnh | Nhà cổ xây khoảng năm 1855, đẹp nhất miền Tây; chỉ tham quan, ít hoạt động giải trí | intour.com.vn, khamphadisan.com.vn, 190travel.com |

### 1.3. Cụm Trà Ôn — Mang Thít

| # | Tên | Địa chỉ | Tọa độ | Cách trung tâm | Giá vé | Giờ mở cửa | Thời gian | Hợp với ai | Lưu ý | Nguồn |
|---|---|---|---|---|---|---|---|---|---|---|
| 8 | Chợ nổi Trà Ôn | Số 44 Trưng Trắc, Lục Sĩ Thành, Trà Ôn (hạ lưu sông Hậu, dài ~300 m) | 10.047, 105.82761 (geocode khớp cầu Trà Ôn gần đó, mức khu vực — chưa phải tọa độ chợ chính xác) | ~25–30 km | Miễn phí vào chợ; thuê thuyền tham quan 20.000–50.000đ/người | Nhộn nhịp 5:00–7:00 sáng; đến muộn chợ tan | 1–2 giờ buổi sáng | Mọi đối tượng, người thích chợ nổi/sông nước | PHẢI đến sớm 5–7h sáng mới đáng; ăn sáng trên ghe (bún bò viên); đi cùng cung Mang Thít | wikidulich.com, mia.vn, tadiha.com |
| 9 | Làng gạch gốm Mang Thít | Xã Mang Thít / khu vực ven sông Cổ Chiên, huyện Mang Thít | Chưa kiểm được tọa độ chính xác (geocode chỉ khớp cầu Mang Thít gần đó, không dùng) | ~25–30 km | Chưa kiểm được vé tham quan riêng (một nguồn ghi 20.000–50.000đ/người cho tour làng nghề — chưa xác nhận) | Ban ngày | 1–2 giờ | Người thích làng nghề/nhiếp ảnh | Làng nghề gạch gốm truyền thống ven sông; đi thuyền ngắm lò gạch từ sông là trải nghiệm chính; hỏi giá tour thuyền trước | dulichviet.com.vn, mia.vn, wikidulich.com |
| 10 | Cù lao Mây | Cù lao trên sông Hậu, huyện Trà Ôn | Chưa kiểm được tọa độ chính xác | ~20–25 km (ước tính, chưa kiểm được chính xác) | Chưa kiểm được vé riêng | Ban ngày | 2–3 giờ | Người thích sinh thái nguyên sơ, miệt vườn | Vẻ đẹp nguyên sơ, vườn trái cây, homestay địa phương; ít dịch vụ du lịch bài bản hơn An Bình — hỏi trước homestay/thuyền | vietnamairlines.com, tadiha.com |

### 1.4. Cụm mở rộng — khu vực Bến Tre/Trà Vinh cũ (thêm 06/11/2026)

| # | Tên | Địa chỉ | Tọa độ | Cách trung tâm | Giá vé | Giờ mở cửa | Thời gian | Hợp với ai | Lưu ý | Nguồn |
|---|---|---|---|---|---|---|---|---|---|---|
| 11 | Làng hoa kiểng Cái Mơn | Xã Vĩnh Thành, huyện Chợ Lách (khu vực Bến Tre cũ, nay thuộc tỉnh Vĩnh Long mới) | 10.20868, 106.21878 (tọa độ xấp xỉ, cần kiểm lại) | ~35 km | Miễn phí vào làng; vườn hoa riêng thu phí theo nhà vườn (chưa kiểm được mức riêng) | Ban ngày; đẹp nhất tháng Chạp Âm lịch (trước Tết) | 1–2 giờ | Người thích hoa kiểng, nhiếp ảnh, gia đình | Thuộc khu vực Bến Tre cũ. Làng hoa lâu đời ven sông Cổ Chiên, cùng cụm di chuyển với Mang Thít — Trà Ôn. Tọa độ xấp xỉ (điểm khu vực nhà thờ Cái Mơn, trung tâm làng), cần kiểm lại. Hỏi giá vườn trước khi vào. | mia.vn, mytour.vn |
| 12 | Cồn Phụng (Cồn Đạo Dừa) | Xã Tân Thạch, huyện Châu Thành (khu vực Bến Tre cũ, nay thuộc tỉnh Vĩnh Long mới); đi đò từ bến Tân Thạch | 10.33626, 106.36929 | ~55 km | Chưa kiểm được giá vé cổng riêng (đi theo tour ghép từ bến Mỹ Tho/Bến Tre, hỏi giá trước) | Ban ngày | 2–3 giờ | Gia đình, nhóm bạn, khách đi tour sông Tiền | Thuộc khu vực Bến Tre cũ. Nổi tiếng với di tích Đạo Dừa và vườn trái cây; đi cùng cụm với Cồn Thới Sơn (Tiền Giang cũ) qua sông Tiền. Nên đi tour ghép có hướng dẫn, tránh đi lẻ giờ trưa nắng. | mia.vn, dulichviet.com.vn |
| 13 | Ao Bà Om + Chùa Âng | Phường 8, TP Trà Vinh (khu vực Trà Vinh cũ, nay thuộc tỉnh Vĩnh Long mới) | 9.91533, 106.30559 | ~60 km | Miễn phí | Ban ngày (Chùa Âng mở cửa cả ngày) | 1–1,5 giờ | Mọi đối tượng, người thích văn hóa Khmer | Thuộc khu vực Trà Vinh cũ, xa nhất trong 3 điểm mở rộng (~60 km từ TP Vĩnh Long) — nên đi trong ngày riêng hoặc kết hợp Trà Vinh. Ao vuông vức, cây sao cổ thụ quanh bờ; đi lễ Ok Om Bok (rằm tháng 10 Âm lịch) rất đông. | mia.vn, dulichviet.com.vn |

## 2. Ở đâu — 7 chỗ ở (CHỈ GIỚI THIỆU SƠ)

**Tất cả các mục dưới đây: "Thông tin tham khảo, chưa kiểm chứng trực tiếp, chưa phải đối tác, chưa thu phí. Người dùng tự kiểm tra giá / phòng trống trước khi đặt." Không dùng chữ uy tín/đảm bảo. Không nhận đặt phòng, không nhận tiền.**

| # | Tên | Địa chỉ | Khu vực | Hạng | Khoảng giá/đêm ngày thường | Điện thoại | Cách trung tâm | Hợp với ai | Trạng thái | Nguồn |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| 1 | Khách sạn Cửu Long | Số 1 đường 1 Tháng 5, Phường 1, TP Vĩnh Long | Trung tâm, ngay bến phà An Bình | 3 sao | Từ ~400.000đ/đêm (khoảng trên chưa kiểm được) | 0270 3823 656 | Ngay trung tâm, sát bến phà An Bình | Gia đình, khách muốn tiện đi cù lao An Bình | Chưa kiểm chứng / chưa đối tác / chưa thu phí | vietfuntravel.com.vn |
| 2 | Mekong Riverside Homestay | 145A/11 (số 11) Ấp Bình Lương, xã An Bình, huyện Long Hồ | Cù lao An Bình | Homestay | ~471.000–650.000đ/đêm (phòng đơn/đôi 471.000–538.000đ; phòng gia đình 538.000–650.000đ; Deluxe tới ~1.200.000đ) | 0909 201 828 | Qua phà An Bình, ~4–6 km | Cặp đôi, gia đình thích miệt vườn, view sông | Chưa kiểm chứng / chưa đối tác / chưa thu phí | luxurytravel.vn, didodidays.com |
| 3 | Riverside Park Eco Resort | 283/20 Ấp Bình Hòa, xã Bình Hòa Phước, huyện Long Hồ | Cù lao An Bình | Resort sinh thái | Từ ~828.000đ/đêm (khoảng trên chưa kiểm được) | 0906 653 969 | Qua phà An Bình, ~8–10 km | Gia đình/nhóm bạn nghỉ dưỡng miệt vườn | Chưa kiểm chứng / chưa đối tác / chưa thu phí | luxurytravel.vn |
| 4 | Phương Thảo Homestay | An Thành, xã An Bình, huyện Long Hồ | Cù lao An Bình | Homestay | ~450.000đ/phòng/đêm (khoảng trên chưa kiểm được) | 0908 195 350 | Qua phà An Bình | Khách thích đổi gió, nhóm nhỏ | Chưa kiểm chứng / chưa đối tác / chưa thu phí | vietfuntravel.com.vn |
| 5 | Song Me Home (Sông Mê Home) | Cù lao An Bình, huyện Long Hồ (địa chỉ chi tiết chưa kiểm được) | Cù lao An Bình | Homestay | ~500.000đ/đêm cho 2 người (gồm ăn sáng, theo video trải nghiệm 08/2026) | 0937 837 865 | Qua phà An Bình | Cặp đôi, khách thích homestay vườn, ăn cơm nhà | Chưa kiểm chứng / chưa đối tác / chưa thu phí | facebook.com (KÚN ĐẾN ĐÂY) |
| 6 | Ngọc Phượng Homestay | 118C/10 Bình Lương, xã An Bình, huyện Long Hồ | Cù lao An Bình | Homestay | ~150.000–300.000đ/đêm (theo nguồn tổng hợp) | 0270 3823 611 | Qua phà An Bình | Khách bụi, cặp đôi tiết kiệm | Chưa kiểm chứng / chưa đối tác / chưa thu phí | luhanhvietnam.com.vn |
| 7 | Khách sạn Khánh Quỳnh | TP Vĩnh Long (địa chỉ chi tiết chưa kiểm được) | Trung tâm | Chưa kiểm được hạng | Từ ~350.000đ/phòng/2 người (khoảng trên chưa kiểm được) | 0907 252 925 | Trung tâm | Khách tiết kiệm ở trung tâm | Chưa kiểm chứng / chưa đối tác / chưa thu phí | vietfuntravel.com.vn |

## 2B. Trời mưa thì đi đâu (bổ sung 08/11/2026)

Các điểm dưới đây đều đã có trong mục 1, chỉ chọn những điểm có mái che/không gian trong nhà, đi mưa được:

- Chùa Phật Ngọc Xá Lợi
- Văn Thánh Miếu
- Chùa Ông — Thất Phủ Miếu
- Nhà cổ Cai Cường

Dặn: Mưa thì vào chùa Phật Ngọc Xá Lợi, Văn Thánh Miếu và nhà cổ Cai Cường — tránh chợ nổi Trà Ôn và cù lao vì đi ghe ngoài trời.

## 2C. Cho cặp đôi (bổ sung 08/11/2026)

Chỗ ở hợp cặp đôi (theo mục 'Hợp với ai' trong file):

- Mekong Riverside Homestay
- Song Me Home (Sông Mê Home)
- Ngọc Phượng Homestay

Điểm hợp cặp đôi (từ mục 1):

- Cù lao An Bình
- Chợ nổi Trà Ôn
- Làng gạch gốm Mang Thít
- Cồn Phụng (Cồn Đạo Dừa)

## 2D. Mùa + tháng đẹp nhất (bổ sung 08/11/2026)

- Tháng đẹp nhất: Tháng 11–tháng 4 (mùa khô, ít mưa); trái cây miệt vườn quanh năm, chôm chôm/măng cụt rộ tháng 5–7; chợ nổi Trà Ôn đẹp nhất sáng sớm mùa nước nổi tháng 9–11
- Nguồn: meta.best_season trong file (nghiên cứu ngày 06/11/2026; nguồn tổng xem meta.nguon_tong)
- Ngày kiểm: 06/11/2026

## 3. Ăn gì — 9 món (đủ quán + địa chỉ + khoảng giá)

| # | Món | Buổi ăn | Khoảng giá | Quán tham khảo (địa chỉ) | Nguồn |
|---|---|---|---|---|---|
| 1 | Cá lóc nướng trui | Ăn trưa / ăn tối (món nhóm) | ~100.000–150.000đ/phần (các nguồn ghi 100.000đ / 120.000–150.000đ) | (1) Quán nướng 7 Bột — đường Võ Thị Sáu, Phường 1, TP Vĩnh Long. (2) Nhà hàng Hương Quê — 88/1 Phạm Thái Bường, TP Vĩnh Long | vietair.com.vn, mytour.vn, misskick.vn |
| 2 | Cá tai tượng chiên xù | Ăn trưa / ăn tối (món nhóm) | ~150.000–200.000đ/phần | (1) Nhà hàng Hương Quê — 88/1 Phạm Thái Bường, TP Vĩnh Long. (2) Nhà hàng Phương Thủy — 1 Phan Bội Châu, Phường 1, TP Vĩnh Long | misskick.vn, mytour.vn |
| 3 | Lẩu cua đồng | Ăn trưa / ăn tối (món nhóm) | ~150.000–300.000đ/nồi (nguồn khác: 220.000–300.000đ/nồi) | (1) Quán lẩu cua đồng — 67 Phó Cơ Điều, Phường 1, TP Vĩnh Long. (2) Lẩu cua đồng — 294D Nguyễn Văn Thiệt, Khóm 2, Phường 3, TP Vĩnh Long | vietair.com.vn, misskick.vn, dulichbinhminh.com |
| 4 | Bánh xèo hến / bánh xèo miền Tây | Ăn trưa / ăn xế | ~10.000đ/cái (bánh xèo hến); bánh xèo miền Tây 20.000–35.000đ/cái | (1) Chợ Vĩnh Long — đường 2/9, Phường 1, TP Vĩnh Long. (2) Các quán miệt vườn Cù lao An Bình, huyện Long Hồ | vietair.com.vn, mytour.vn, dulichbinhminh.com |
| 5 | Cá kèo nướng ống sậy | Ăn trưa / ăn tối | ~120.000–150.000đ/phần | (1) Nhà hàng Phương Thủy — 1 Phan Bội Châu, Phường 1, TP Vĩnh Long. (2) Quán Phượng Thủy — đường Phan Bội Châu, Phường 1, TP Vĩnh Long | tripi.vn, misskick.vn |
| 6 | Nấm mối (món theo mùa) | Ăn trưa / ăn tối (món nhóm) | Chưa kiểm được giá riêng theo món (theo mùa, hỏi giá trước) | (1) Nhà hàng Hương Quê — 88/1 Phạm Thái Bường, TP Vĩnh Long. (2) Các quán miệt vườn Cù lao An Bình | vietair.com.vn, mytour.vn |
| 7 | Lẩu cá linh bông điên điển (mùa nước nổi) | Ăn trưa / ăn tối (món nhóm) | Chưa kiểm được giá riêng tại Vĩnh Long (tham khảo chung miền Tây 120.000–250.000đ/nồi) | (1) Khu du lịch Vinh Sang — Tổ 14, ấp An Thuận, xã An Bình, huyện Long Hồ. (2) Quán miệt vườn An Bình — Cù lao An Bình, huyện Long Hồ | dulichbinhminh.com |
| 8 | Bún bò viên Trà Ôn (ăn trên ghe chợ nổi) | Ăn sáng | Chưa kiểm được giá riêng (món ăn sáng trên ghe, hỏi giá trước) | (1) Chợ nổi Trà Ôn — 44 Trưng Trắc, Lục Sĩ Thành, Trà Ôn (ăn trên ghe, sáng sớm 5–7h) | tadiha.com |
| 9 | Trái cây miệt vườn (ăn tại vườn) | Ăn xế / tham quan | Vé vườn 30.000–50.000đ/người; trái cây mua mang về tính theo giá thị trường/theo mùa | (1) Vườn trái cây Cù lao An Bình — huyện Long Hồ. (2) Khu du lịch Vinh Sang — Tổ 14, ấp An Thuận, xã An Bình | wikidulich.com, mia.vn |

## 3B. Nhận xét của M (06/11/2026) + đánh giá người dùng

Nhận xét dưới đây là chính kiến của M sau khi đọc review/bài viết tham khảo (nguồn ghi ở từng mục), không copy nguyên văn review, không bịa số sao. Mâu thuẫn giữa các nguồn được ghi rõ trong nhận xét. Đánh giá người dùng đang trống — app sẽ lưu đánh giá thật sau này.

### Địa danh

- **Chùa Phật Ngọc Xá Lợi** — Chùa lớn, tháp 9 tầng nhìn từ xa đã thấy, khuôn viên rộng và mát — đây là điểm chùa 'đáng đi nhất' Vĩnh Long nếu chỉ chọn một. Điểm yếu là ngoài tháp và chính điện thì ít hoạt động, đi nhanh sẽ thấy hơi trống. Hợp với mọi đối tượng, nên đi buổi sáng sớm cho mát, ghép với Văn Thánh Miếu trong cùng buổi. _(Nguồn tham khảo: intour.com.vn / thoitiet247.edu.vn; ngày kiểm 06/11/2026)_ — Đánh giá người dùng: chưa có đánh giá — bạn là người đầu tiên.
- **Văn Thánh Miếu** — Văn Thánh Miếu nhỏ, yên tĩnh, mang đúng chất 'Quốc Tử Giám phương Nam' — ai thích lịch sử sẽ thích, ai thích náo nhiệt sẽ thấy buồn. Điểm mạnh là miễn phí, ngay trung tâm, chụp ảnh cổ kính đẹp; điểm yếu là khuôn viên nhỏ, giờ mở cửa các nguồn ghi khác nhau, có nguồn ghi Chủ nhật đóng cửa chưa xác nhận. Hợp với người yêu lịch sử và học sinh, nên ghé 30–45 phút rồi đi tiếp. _(Nguồn tham khảo: intour.com.vn / mytour.vn; ngày kiểm 06/11/2026)_ — Đánh giá người dùng: chưa có đánh giá — bạn là người đầu tiên.
- **Chùa Ông — Thất Phủ Miếu** — Chùa Ông là chùa người Hoa lâu đời ngay trung tâm, kiến trúc chạm khắc đáng xem, nhưng quy mô nhỏ và ít thông tin hướng dẫn — đi không có người kể thì chỉ xem lướt. Điểm mạnh là tiện đường, ghép được với Văn Thánh Miếu và chợ Vĩnh Long; điểm yếu là giờ mở cửa chưa kiểm được chính thức. Hợp với khách hành hương và người thích kiến trúc Hoa, nên đi ban ngày. _(Nguồn tham khảo: khamphadisan.com.vn / mytour.vn; ngày kiểm 06/11/2026)_ — Đánh giá người dùng: chưa có đánh giá — bạn là người đầu tiên.
- **Cầu Mỹ Thuận** — Cầu Mỹ Thuận chỉ nên xem là điểm ghé ngang chụp ảnh 10–15 phút trên đường đi, không phải điểm đến riêng. Điểm mạnh là cầu dây văng đầu tiên của Việt Nam, chụp từ hai đầu cầu buổi chiều rất đẹp; điểm yếu là không được dừng xe giữa cầu, không có dịch vụ gì. Hợp với mọi đối tượng đi ngang tuyến SG — Vĩnh Long, đừng cố tình đi riêng một chuyến. _(Nguồn tham khảo: wikidulich.com / dulichviet.com.vn; ngày kiểm 06/11/2026)_ — Đánh giá người dùng: chưa có đánh giá — bạn là người đầu tiên.
- **Cù lao An Bình** — Cù lao An Bình là 'linh hồn' của Vĩnh Long: vườn trái cây, homestay, đi phà, ăn cơm nhà — đúng chất miệt vườn. Điểm mạnh là ở lại 1 đêm homestay rất đáng; điểm yếu là dịch vụ rải rác từng nhà vườn, không có vé chung, phải hỏi giá từng chỗ. Hợp với gia đình và nhóm bạn, nên ở lại 1 đêm thay vì đi về trong ngày. _(Nguồn tham khảo: wikidulich.com / mia.vn / dulichviet.com.vn; ngày kiểm 06/11/2026)_ — Đánh giá người dùng: chưa có đánh giá — bạn là người đầu tiên.
- **Khu du lịch Vinh Sang** — Vinh Sang là khu vui chơi miệt vườn vui nhất Vĩnh Long: cưỡi đà điểu, tát mương bắt cá, câu cá sấu — trẻ con mê, người lớn cũng vui. Giá vé cổng 50.000đ được nhiều nguồn xác nhận, nhưng có nguồn ghi 70.000–100.000đ, và trò chơi tính riêng từng trò nên tổng chi phí dễ đội lên. Hợp với gia đình có trẻ nhỏ, nên đi buổi sáng, mang đồ thay vì chơi tát mương. _(Nguồn tham khảo: vietfuntravel.com.vn / tintucmientay.baoangiang.com.vn; ngày kiểm 06/11/2026)_ — Đánh giá người dùng: chưa có đánh giá — bạn là người đầu tiên.
- **Nhà cổ Cai Cường** — Nhà cổ Cai Cường đẹp và cổ kính thật — nhà gỗ hơn 150 năm, chạm khắc tinh xảo, chụp ảnh rất ăn. Điểm yếu là chỉ tham quan, không có hoạt động gì thêm, đi 30–60 phút là hết; giá vé các nguồn ghi mâu thuẫn (miễn phí vs 20.000đ). Hợp với người yêu nhà cổ và cặp đôi chụp ảnh, nên ghép với Vinh Sang và vườn trái cây trong cùng buổi. _(Nguồn tham khảo: intour.com.vn / khamphadisan.com.vn; ngày kiểm 06/11/2026)_ — Đánh giá người dùng: chưa có đánh giá — bạn là người đầu tiên.
- **Chợ nổi Trà Ôn** — Chợ nổi Trà Ôn nhỏ, còn nguyên chất chợ quê trên sông Hậu — ai thích Cái Răng sẽ thấy Trà Ôn yên và 'thật' hơn, nhưng cũng ít hàng, ít ghe hơn hẳn. Điểm mạnh là ăn bún bò viên trên ghe buổi sáng rất đáng nhớ; điểm yếu là phải dậy 5h, đến muộn là chợ tan, gần như không còn gì. Hợp với người thích chợ nổi và dậy sớm, nên đi 5–7h sáng, ghép với Mang Thít. _(Nguồn tham khảo: wikidulich.com / mia.vn / tadiha.com; ngày kiểm 06/11/2026)_ — Đánh giá người dùng: chưa có đánh giá — bạn là người đầu tiên.
- **Làng gạch gốm Mang Thít** — Làng gạch gốm Mang Thít là điểm chụp ảnh độc nhất miền Tây: hàng trăm lò gạch đỏ như 'vương quốc đỏ' ven sông Cổ Chiên, nhưng phần lớn lò đã ngừng hoạt động nên cảm giác vừa đẹp vừa hoang tàn. Điểm mạnh là đi thuyền ngắm lò từ sông rất ấn tượng; điểm yếu là nóng, ít bóng mát, chưa có vé tham quan thống nhất. Hợp với người thích nhiếp ảnh và làng nghề, nên đi thuyền buổi sáng, mang nón và nước. _(Nguồn tham khảo: dulichviet.com.vn / mia.vn / luhanhvietnam.com.vn; ngày kiểm 06/11/2026)_ — Đánh giá người dùng: chưa có đánh giá — bạn là người đầu tiên.
- **Cù lao Mây** — Cù lao Mây nguyên sơ hơn An Bình nhiều: vườn trái cây, homestay địa phương, không khí yên tĩnh đúng nghĩa miệt vườn. Điểm mạnh là ít khách du lịch, giá mềm; điểm yếu là dịch vụ chưa bài bản, homestay và thuyền phải hỏi trước, không có thông tin niêm yết rõ. Hợp với người thích sinh thái nguyên sơ và đi chậm, nên liên hệ homestay trước, đừng đi liều buổi chiều muộn. _(Nguồn tham khảo: vietnamairlines.com / tadiha.com; ngày kiểm 06/11/2026)_ — Đánh giá người dùng: chưa có đánh giá — bạn là người đầu tiên.
- **Làng hoa kiểng Cái Mơn** — Cái Mơn là làng hoa kiểng lâu đời, đúng chất miệt vườn chứ không phải khu du lịch dựng sẵn — đi đúng mùa hoa Tết thì đẹp, đi lệch mùa thì chỉ còn vườn cây giống, dễ hụt hẫng. Điểm mạnh là không khí làng quê thật và hoa rẻ hơn chợ thành phố; điểm yếu là không có vé chung, mỗi vườn một giá, phải hỏi trước. Hợp với người thích chụp ảnh và mua hoa, nên đi tháng Chạp, tránh đi sau 23 tháng Chạp vì hoa đã xuất đi nhiều. _(Nguồn tham khảo: mia.vn / mytour.vn / dulich9.com; ngày kiểm 06/11/2026)_ — Đánh giá người dùng: chưa có đánh giá — bạn là người đầu tiên.
- **Cồn Phụng (Cồn Đạo Dừa)** — Cồn Phụng đáng đi vì có câu chuyện Đạo Dừa độc nhất và vườn dừa mát, nhưng bản thân cồn khá nhỏ, đi tour ghép thì hay bị lùa theo lịch trình chung, ít thời gian tự do. Điểm mạnh là dễ kết hợp với Cồn Thới Sơn trong một buổi trên sông Tiền; điểm yếu là dịch vụ ăn uống trong tour thường bình dân, đừng kỳ vọng nhà hàng. Hợp với gia đình có trẻ nhỏ và khách lần đầu đi miền Tây, nên đi buổi sáng mát. _(Nguồn tham khảo: mia.vn / dulichviet.com.vn; ngày kiểm 06/11/2026)_ — Đánh giá người dùng: chưa có đánh giá — bạn là người đầu tiên.
- **Ao Bà Om + Chùa Âng** — Ao Bà Om đẹp ở sự yên tĩnh: mặt ao phẳng, hàng sao cổ thụ rợp bóng, khác hẳn không khí chợ búa của các điểm miền Tây khác. Điểm mạnh là miễn phí, chụp ảnh đẹp cả ngày, chùa Âng Khmer ngay cạnh; điểm yếu là ngoài ao và chùa thì không còn gì khác để ở lại lâu, đi xa 60 km chỉ để xem ao thì hơi ít. Hợp với người thích văn hóa Khmer và chụp ảnh, nên ghép với chợ Trà Vinh hoặc chùa Hang trong cùng ngày. _(Nguồn tham khảo: mia.vn / dulichviet.com.vn; ngày kiểm 06/11/2026)_ — Đánh giá người dùng: chưa có đánh giá — bạn là người đầu tiên.

### Món ăn

- **Cá lóc nướng trui** — Cá lóc nướng trui là món 'quốc dân' miền Tây: cá đồng nướng rơm, thịt ngọt, cuốn bánh tráng rau sống — ăn ở Vĩnh Long đúng vị hơn ở Sài Gòn. Điểm mạnh là giá mềm (100.000–150.000đ/phần), quán nào cũng có; điểm yếu là cá nuôi thì thịt bở hơn cá đồng, nên hỏi quán trước. Hợp với nhóm bạn ăn tối, nên ăn ở Hương Quê hoặc quán 7 Bột. _(Nguồn tham khảo: vietair.com.vn / mytour.vn; ngày kiểm 06/11/2026)_ — Đánh giá người dùng: chưa có đánh giá — bạn là người đầu tiên.
- **Cá tai tượng chiên xù** — Cá tai tượng chiên xù giòn rụm, xù lên như bông, chấm nước mắm chua ngọt — món này làm 'mặt tiền' cho mâm cơm miền Tây. Điểm yếu là giá 150.000–200.000đ/phần khá cao so với cá lóc, và cá nhỏ thì ít thịt. Hợp với nhóm ăn trưa, nên gọi kèm lẩu cua đồng cho đủ mâm. _(Nguồn tham khảo: misskick.vn / mytour.vn; ngày kiểm 06/11/2026)_ — Đánh giá người dùng: chưa có đánh giá — bạn là người đầu tiên.
- **Lẩu cua đồng** — Lẩu cua đồng Vĩnh Long đậm vị cua đồng, rau vườn nhiều — ăn nhóm 3–4 người là vừa nồi. Điểm mạnh là giá 150.000–300.000đ/nồi chia ra rẻ; điểm yếu là cua đồng theo mùa, mùa ít cua thì nồi loãng. Hợp với nhóm bạn, nên ăn buổi tối ở quán Phó Cơ Điều. _(Nguồn tham khảo: vietair.com.vn / misskick.vn; ngày kiểm 06/11/2026)_ — Đánh giá người dùng: chưa có đánh giá — bạn là người đầu tiên.
- **Bánh xèo hến / bánh xèo miền Tây** — Bánh xèo hến Vĩnh Long rẻ và lạ: hến xào, bánh giòn, 10.000đ/cái ăn chơi được nhiều cái. Điểm mạnh là ăn ở chợ Vĩnh Long đúng chất địa phương; điểm yếu là bánh xèo miền Tây 20.000–35.000đ/cái thì nơi nào cũng có, không riêng Vĩnh Long. Hợp với ăn xế, nên ăn ở chợ buổi chiều. _(Nguồn tham khảo: vietair.com.vn / mytour.vn; ngày kiểm 06/11/2026)_ — Đánh giá người dùng: chưa có đánh giá — bạn là người đầu tiên.
- **Cá kèo nướng ống sậy** — Cá kèo nướng ống sậy thơm mùi sậy, thịt cá kèo béo — món đặc trưng ít nơi làm đúng. Điểm yếu là giá 120.000–150.000đ/phần, cá kèo nhỏ nên ăn phải khéo; địa chỉ quán Phượng Thủy chưa kiểm được số nhà. Hợp với người thích món lạ, nên ăn ở Phương Thủy (1 Phan Bội Châu). _(Nguồn tham khảo: tripi.vn / misskick.vn; ngày kiểm 06/11/2026)_ — Đánh giá người dùng: chưa có đánh giá — bạn là người đầu tiên.
- **Nấm mối** — Nấm mối là món theo mùa, ngon thì rất ngon — ngọt tự nhiên, xào hay nấu cháo đều hợp — nhưng giá theo mùa và chưa kiểm được giá riêng tại Vĩnh Long. Điểm yếu là mùa nấm ngắn, đi lệch mùa thì không có; phải hỏi giá trước vì nấm mối đắt. Hợp với người đi đúng mùa nấm, nên hỏi Hương Quê trước khi gọi. _(Nguồn tham khảo: vietair.com.vn / mytour.vn; ngày kiểm 06/11/2026)_ — Đánh giá người dùng: chưa có đánh giá — bạn là người đầu tiên.
- **Lẩu cá linh bông điên điển** — Lẩu cá linh bông điên điển chỉ có mùa nước nổi mới đúng vị: cá linh non, bông điên điển vàng, nước lẩu chua thanh. Điểm yếu là giá riêng tại Vĩnh Long chưa kiểm được, tham khảo chung miền Tây 120.000–250.000đ/nồi; đi lệch mùa thì không có cá linh thật. Hợp với nhóm đi tháng 9–11, nên ăn ở Vinh Sang hoặc quán miệt vườn An Bình. _(Nguồn tham khảo: dulichbinhminh.com; ngày kiểm 06/11/2026)_ — Đánh giá người dùng: chưa có đánh giá — bạn là người đầu tiên.
- **Bún bò viên Trà Ôn** — Bún bò viên ăn trên ghe chợ nổi Trà Ôn 5–7h sáng là trải nghiệm đúng chất sông nước: vừa ăn vừa xem ghe buôn qua lại. Điểm yếu là giá chưa kiểm được, phải hỏi trước; món này chỉ có buổi sáng sớm. Hợp với người dậy sớm đi chợ nổi, nên ăn ngay trên ghe cho đúng vị. _(Nguồn tham khảo: tadiha.com; ngày kiểm 06/11/2026)_ — Đánh giá người dùng: chưa có đánh giá — bạn là người đầu tiên.
- **Trái cây miệt vườn (ăn tại vườn)** — Ăn trái cây tại vườn Cù lao An Bình là trải nghiệm nên có: hái tại cây, ăn tại chỗ, chôm chôm/măng cụt mùa hè rất ngon. Điểm mạnh là vé vườn chỉ 30.000–50.000đ/người; điểm yếu là trái theo mùa, đi lệch mùa thì vườn thưa quả. Hợp với gia đình, nên đi tháng 5–7 mùa trái cây rộ. _(Nguồn tham khảo: wikidulich.com / mia.vn; ngày kiểm 06/11/2026)_ — Đánh giá người dùng: chưa có đánh giá — bạn là người đầu tiên.

### Chỗ ở

Mọi chỗ ở ở mục 2 đều có mục đánh giá người dùng đang trống — chưa có đánh giá, bạn là người đầu tiên.
## 4. Đi đến Vĩnh Long bằng gì

Không có sân bay/ga tàu tại Vĩnh Long. Sân bay gần nhất: Cần Thơ (VCA, cách TP Vĩnh Long ~40 km, ~1 giờ đi xe) hoặc Tân Sơn Nhất (SGN, ~135 km).

### 4.1. Từ TP.HCM (~135 km)

| Phương tiện | Thời gian | Khoảng giá | Hãng / ghi chú | Nguồn |
|---|---|---|---|---|
| Xe khách / giường nằm | 3–3,5 giờ (cao tốc Trung Lương – Mỹ Thuận – Cần Thơ; có nguồn ghi 3,5–4 giờ) | ~120.000–220.000đ/vé (Phương Trang 130.000–150.000đ; Thành Bưởi 150.000–180.000đ; Tân Niên 180.000–220.000đ) | Phương Trang hotline 1900 6067; Thành Bưởi 1900 6079; Tân Niên. Bến xe Vĩnh Long trên QL1A, cách trung tâm ~2 km | vexesapa.vn, limody.vn |
| Limousine | 3–3,5 giờ | ~180.000–220.000đ/vé (giường đôi/limousine VIP) | Tân Niên và các hãng limousine tuyến SG — Vĩnh Long | vexesapa.vn |
| Xe máy / ô tô riêng (QL1A + cao tốc) | Ô tô 3–3,5 giờ; xe máy ~4–5 giờ | Chưa kiểm được giá thuê theo tuyến; thuê xe 4 chỗ có tài xế SG — Vĩnh Long ~1.250.000đ/chiều (tham khảo) | Lộ trình: TP.HCM → cao tốc Trung Lương – Mỹ Thuận → QL1A → cầu Mỹ Thuận → TP Vĩnh Long | vexesapa.vn, xelientinh247.vn |
| Máy bay + xe (qua Cần Thơ) | Bay SGN–VCA ~45–55 phút + xe VCA — Vĩnh Long ~1 giờ | Vé máy bay tùy thời điểm đặt (chưa kiểm được giá riêng tuyến SGN–VCA); xe VCA — Vĩnh Long chưa kiểm được giá riêng | Chỉ hợp khi đã có vé bay rẻ hoặc kết hợp Cần Thơ; đa số khách đi xe khách thẳng | vietjetair.com |

### 4.2. Từ Hà Nội (~1.700 km đường bộ)

| Phương tiện | Thời gian | Khoảng giá | Ghi chú | Nguồn |
|---|---|---|---|---|
| Máy bay HAN–VCA (Cần Thơ) rồi xe về Vĩnh Long | Bay ~2h10 + xe VCA — Vĩnh Long ~1 giờ | Vé máy bay HAN–VCA ~1.300.000đ/chiều đã gồm thuế phí (tham khảo; vé rẻ chưa thuế phí có thể từ ~799.000đ); xe VCA — Vĩnh Long chưa kiểm được giá riêng | Phương án khuyên dùng | vietair.com.vn, vietjetair.com, viet-travel.congtan5918.workers.dev |
| Máy bay HAN–SGN rồi xe lên Vĩnh Long | Bay ~2h05 + xe SG — Vĩnh Long 3–3,5 giờ | Vé HAN–SGN tùy thời điểm đặt (chưa kiểm được giá riêng); xe SG — Vĩnh Long 130.000–220.000đ/vé | Phương án thay thế khi vé về Cần Thơ đắt/hết | vexesapa.vn |
| Xe khách HN — Vĩnh Long | Chưa kiểm được tuyến thẳng + thời gian/giá | Chưa kiểm được | Không khuyến khích; đa số nguồn khuyên bay | Chưa kiểm được |

### 4.3. Từ sân bay Cần Thơ (VCA) vào TP Vĩnh Long (~40 km, ~1 giờ)

| Phương tiện | Khoảng giá | Ghi chú | Nguồn |
|---|---|---|---|
| Taxi / xe công nghệ | Chưa kiểm được giá riêng tuyến VCA — Vĩnh Long (tham khảo taxi sân bay Cần Thơ về trung tâm Cần Thơ 120.000–270.000đ — các nguồn mâu thuẫn) | Hỏi rõ giá trọn gói trước khi lên xe | vietair.com.vn, dvn.com.vn |
| Xe khách Cần Thơ — Vĩnh Long | ~100.000–120.000đ/vé, ~1 giờ | Tuyến Vĩnh Long — Cần Thơ chạy dày; đón tại bến xe Cần Thơ | vexesapa.vn |

## 5. Đi lại trong Vĩnh Long

| Phương tiện | Khoảng giá | Giấy tờ / điều kiện | Ghi chú | Nguồn |
|---|---|---|---|---|
| Thuê xe máy — xe số | ~130.000–250.000đ/ngày (mức chung Vĩnh Long theo nguồn; xe số rẻ hơn tay ga) | CCCD (hoặc hộ chiếu) + bằng lái A1 (bắt buộc với xe trên 50cc); nên nộp bản photo CCCD, giữ bản gốc | Thuê tính theo chu kỳ 24 giờ; lễ Tết giá có thể tăng; nhiều cửa hàng giao xe tận khách sạn | luxurytravel.vn |
| Thuê xe máy — tay ga | Chưa kiểm được mức riêng tại Vĩnh Long (tham khảo chung miền Tây ~150.000–200.000đ/ngày) | Như trên | — | Chưa kiểm được |
| Taxi nội thành / xe công nghệ | Chưa kiểm được bảng giá taxi riêng tại Vĩnh Long | — | Hãng địa phương + Grab/Be (phủ sóng hạn chế hơn TP lớn); hỏi giá trước khi đi | Chưa kiểm được |
| Phà An Bình (qua cù lao) | Chưa kiểm được giá vé phà riêng (thường chỉ vài nghìn–vài chục nghìn đồng/lượt xe máy) | — | Phà là cửa ngõ chính ra Cù lao An Bình; giờ chạy ban ngày, tối muộn có thể hết phà — hỏi trước | wikidulich.com |
| Thuyền/xuồng tham quan cù lao, chợ nổi | Thuyền nhỏ ~350.000đ/chuyến; thuyền lớn ~850.000đ/chuyến (tour làng nghề An Bình); chợ nổi Trà Ôn 20.000–50.000đ/người | — | Hỏi rõ lộ trình + thời gian + gồm ăn uống hay không trước khi thuê; mặc áo phao | facebook.com (KÚN ĐẾN ĐÂY), gtop-stthay.mystrikingly.com |
| Thuê ô tô có tài xế theo ngày (trong tỉnh) | Chưa kiểm được mức riêng tại Vĩnh Long (tham khảo SG — Vĩnh Long 1 chiều ~1.250.000đ/xe 4 chỗ) | — | Hợp nhóm 4–7 người đi Trà Ôn — Mang Thít trong ngày | xelientinh247.vn |

## 6. Lịch trình mẫu

### 6.1. Lịch trình 3N2Đ (chính)

| Ngày | Buổi | Hoạt động | Điểm / quán gắn kèm |
|---|---|---|---|
| Ngày 1 — Trung tâm TP | Sáng | Chùa Phật Ngọc Xá Lợi (45–60 phút) + Văn Thánh Miếu (30–45 phút) + Chùa Ông | Địa danh 1, 2, 3 |
| Ngày 1 | Chiều | Cầu Mỹ Thuận ghé chụp ảnh (10–15 phút) + dạo chợ Vĩnh Long, ăn bánh xèo hến | Địa danh 4; món 4 |
| Ngày 1 | Tối | Cá lóc nướng trui / cá tai tượng chiên xù ở Nhà hàng Hương Quê | Món 1, 2 |
| Ngày 2 — Cù lao An Bình | Sáng | Qua phà An Bình → Khu du lịch Vinh Sang (2–3 giờ) | Địa danh 6 |
| Ngày 2 | Trưa–chiều | Nhà cổ Cai Cường + vườn trái cây, ăn trưa miệt vườn (lẩu cua đồng / lẩu cá linh mùa nước nổi) | Địa danh 7, 5; món 3, 7 |
| Ngày 2 | Tối | Nghỉ homestay Cù lao An Bình (Mekong Riverside / Phương Thảo), ăn cơm nhà | Chỗ ở 2, 4 |
| Ngày 3 — Trà Ôn — Mang Thít | Sáng sớm | Chợ nổi Trà Ôn 5–7h (ăn bún bò viên trên ghe) | Địa danh 8; món 8 |
| Ngày 3 | Trưa–chiều | Làng gạch gốm Mang Thít + Cù lao Mây (chọn 1), về TP Vĩnh Long, trả phòng | Địa danh 9, 10 |
| Ngày 3 | Tối | Về | — |

## 7. Bảng chi phí ước tính (1 người, 3N2Đ từ TP.HCM, ở homestay/khách sạn trung tâm, đi xe khách)

| Hạng mục | Ước tính 3N2Đ / người | Căn cứ |
|---|---|---|
| Xe SG–Vĩnh Long khứ hồi | 260.000–440.000đ | Mục 4.1 (130.000–220.000đ/vé/chiều) |
| Ở 2 đêm (chia đôi phòng) | 300.000–650.000đ | Mục 2 (homestay 150.000–500.000đ/đêm; khách sạn 3 sao từ ~400.000đ/đêm, chia 2 người) |
| Ăn 3 ngày | 450.000–800.000đ | Mục 3 (món 10.000–150.000đ/phần; lẩu nhóm 150.000–300.000đ/nồi chia 2–4 người) |
| Vé tham quan + vườn trái cây | 100.000–250.000đ | Mục 1 (Vinh Sang 50.000đ; vườn 30.000–50.000đ; chùa/miếu miễn phí) |
| Thuê xe máy 2 ngày | 260.000–500.000đ | Mục 5 (130.000–250.000đ/ngày) |
| Phà + thuyền tham quan (chia nhóm) | 50.000–200.000đ | Mục 5 (thuyền nhỏ ~350.000đ/chuyến; chợ nổi 20.000–50.000đ/người) |
| **Tổng ước tính** | **1.420.000–2.840.000đ/người** | Cộng các khoảng trên |
| Nếu đi từ Hà Nội | Vé máy bay là hạng mục lớn nhất: HAN–VCA ~1.300.000đ/chiều (tham khảo) + xe VCA — Vĩnh Long | Mục 4.2 |

Quy tắc hiển thị giá trong app: luôn ghi khoảng giá + ngày kiểm (06/11/2026), không ghi một giá cố định.

## 8. Checklist mang theo

- Áo chống nắng, mũ, kem chống nắng (miền Tây nắng gắt, đi vườn/thuyền ngoài trời nhiều).
- Áo mưa mỏng (mùa mưa tháng 5–10), giày/dép đi vườn, chống trơn.
- CCCD + bằng lái A1 (nếu thuê xe máy), tiền mặt lẻ (chợ nổi, quán vườn, phà — nhiều nơi chỉ nhận tiền mặt).
- Thuốc chống muỗi, thuốc cơ bản; sạc dự phòng.
- Hỏi giá trước khi gọi món/thuê thuyền/vào vườn; đi chợ nổi phải dậy sớm 5h.

## 9. Mục chưa kiểm được / cần xác nhận lại (ghi rõ, không bịa)

1. Giá vé Khu du lịch Vinh Sang (50.000đ vs 70.000–100.000đ/người)
2. Giá vé Nhà cổ Cai Cường (miễn phí vs 20.000đ/người)
3. Giá vé tham quan Làng gạch gốm Mang Thít và Cù lao Mây
4. Giờ mở cửa Văn Thánh Miếu (có nguồn ghi Chủ nhật đóng cửa, chưa xác nhận)
5. Giờ mở cửa Vinh Sang (7:30–17:00 vs 9:00–18:00)
6. Giờ mở cửa Chùa Phật Ngọc Xá Lợi (cả ngày vs 7:00–19:00)
7. Tọa độ GPS: Làng gạch gốm Mang Thít và Cù lao Mây chỉ có tọa độ xấp xỉ (mức xã/cù lao), cần kiểm lại; Chợ nổi Trà Ôn và Cù lao An Bình chỉ có tọa độ mức khu vực
8. Khoảng cách chính xác từ TP Vĩnh Long tới Cù lao Mây, Mang Thít, Trà Ôn
9. Địa giới sau sáp nhập 01/07/2025: đợt 06/11/2026 đã thêm 3 điểm khu vực Bến Tre/Trà Vinh cũ (Cái Mơn, Cồn Phụng, Ao Bà Om); các điểm khác thuộc khu vực này vẫn chưa nhập
10. Giá vé cổng riêng Cồn Phụng và giá vé vườn riêng Làng hoa Cái Mơn chưa kiểm được
11. Khách sạn Khánh Quỳnh: địa chỉ chi tiết + khoảng giá trên
12. Song Me Home: địa chỉ chi tiết
13. Khách sạn Cửu Long: khoảng giá trên
14. Khách sạn Sài Gòn Vĩnh Long, Phước Thành, Vinh Sang: địa chỉ + giá riêng (chưa đưa vào)
15. Giá món nấm mối, lẩu cá linh bông điên điển, bún bò viên Trà Ôn tại Vĩnh Long
16. Địa chỉ quán Phượng Thủy: chưa kiểm được số nhà
17. Giá vé phà An Bình
18. Bảng giá taxi nội thành Vĩnh Long và giá thuê xe máy tay ga tại Vĩnh Long
19. Giá xe VCA (Cần Thơ) — Vĩnh Long và giá vé máy bay SGN–VCA
20. Tuyến xe khách thẳng Hà Nội — Vĩnh Long: chưa kiểm được có tuyến hay không

## 10. Cảnh báo chặt chém + lừa cọc (bổ sung 08/11/2026)

- **Thuê thuyền đi cù lao An Bình, chợ nổi Trà Ôn: giá thuê không thống nhất, phụ thu; có thuyền không đủ áo phao.** Cách tránh: Thuê thuyền tại bến chính thức, hỏi rõ giá đã gồm những gì; kiểm tra áo phao; mặc áo phao suốt chuyến. (Nguồn: Cảnh báo chung theo kinh nghiệm du lịch và báo chí; chưa tra được vụ việc riêng của tỉnh này trên báo chính thống (ngày kiểm 08/11/2026))
- **Ăn uống, mua đặc sản ở chợ Vĩnh Long và khu du lịch Vinh Sang: giá không niêm yết, phụ thu với khách du lịch.** Cách tránh: Hỏi giá trước khi gọi món/mua; ưu tiên quán có menu, bảng giá niêm yết; giữ hóa đơn. (Nguồn: Cảnh báo chung theo kinh nghiệm du lịch và báo chí; chưa tra được vụ việc riêng của tỉnh này trên báo chính thống (ngày kiểm 08/11/2026))
- **Lừa cọc homestay/khách sạn đặt qua Facebook, Zalo: mạo danh chủ nhà, giá rẻ, giục cọc 30-50% rồi chặn liên lạc.** Cách tránh: Chỉ đặt qua nền tảng có cơ chế hoàn tiền hoặc gọi số trên website/fanpage chính thức để xác nhận; yêu cầu gọi video trực tiếp tại phòng. (Nguồn: Báo Nhân Dân — Nhiều chiêu trò lừa đảo đặt phòng khách sạn (05/08/2023): mạo danh chủ khách sạn/homestay, giá rẻ trên Facebook/Zalo, yêu cầu cọc 30-50% rồi chặn liên lạc; một vụ ở Quảng Ninh chiếm đoạt khoảng 100 triệu đồng và đã bị khởi tố (ngày kiểm 08/11/2026))
- **Xe ôm, taxi ở bến xe Vĩnh Long hét giá cao, chở vòng.** Cách tránh: Dùng taxi có đồng hồ/hãng quen hoặc đặt xe qua ứng dụng; thỏa thuận giá trước khi lên xe. (Nguồn: Cảnh báo chung theo kinh nghiệm du lịch và báo chí; chưa tra được vụ việc riêng của tỉnh này trên báo chính thống (ngày kiểm 08/11/2026))


## 11. An toàn đường đèo + thuê xe máy (bổ sung 08/11/2026)

Tỉnh đồng bằng/ven biển, không có đèo.

(Nguồn: Tỉnh đồng bằng sông nước, không có đèo (ngày kiểm 08/11/2026))


## 12. Số khẩn cấp + xử lý sự cố (bổ sung 08/11/2026)

- Công an: 113 — Cấp cứu: 115 — Cứu hỏa: 114
- Số riêng của tỉnh: chưa tra được nguồn chính thức — khi cần gọi 113/115/114.

(Nguồn: số chung cả nước 113/115/114 là số khẩn cấp quốc gia; số riêng theo nguồn ghi trong từng mục (ngày kiểm 08/11/2026))


## 13. Giờ đẹp chụp ảnh (bổ sung 08/11/2026)

| # | Điểm | Giờ đẹp | Nguồn |
|---|---|---|---|
| 1 | Cù lao An Bình | 6:00-8:00 sáng, ánh sáng mềm trên vườn trái cây và sông | Khung giờ vàng chung cho chụp ảnh ngoài trời tại Việt Nam; chưa có hướng dẫn riêng cho điểm này (ngày kiểm 08/11/2026) |
| 2 | Chợ nổi Trà Ôn | 5:30-7:00 sáng, chợ họp đông, ánh sáng đẹp trên sông | Khung giờ vàng chung cho chụp ảnh ngoài trời tại Việt Nam; chưa có hướng dẫn riêng cho điểm này (ngày kiểm 08/11/2026) |
| 3 | Cầu Mỹ Thuận | 16:30-18:00 hoàng hôn trên sông Tiền | Khung giờ vàng chung cho chụp ảnh ngoài trời tại Việt Nam; chưa có hướng dẫn riêng cho điểm này (ngày kiểm 08/11/2026) |


## 14. Cho người chạy giải (bổ sung 08/11/2026)

**Giải chạy (đã kiểm nguồn):**
- Bán Marathon Vĩnh Long mở rộng — Hành trình trái tim Mekong — Tháng 4 (mùa 2025: 27/4/2025) (Nguồn: Đại học Kinh tế TP.HCM (ueh.edu.vn) — Giải Bán Marathon Vĩnh Long mở rộng 2025 - Hành trình trái tim Mekong, thi đấu 04h30 ngày 27/4/2025 (ngày kiểm 08/11/2026))

**Điểm chạy bộ đẹp:** Sân vận động Vĩnh Long, đường Nguyễn Huệ (điểm xuất phát giải); Đường Võ Văn Kiệt, TP Vĩnh Long buổi sáng sớm; Đường ven sông Tiền.

**Chỗ ở gần điểm xuất phát** (lấy từ mục chỗ ở đã có): Khách sạn Cửu Long; Mekong Riverside Homestay.

(Nguồn: UEH về giải Bán Marathon Vĩnh Long; chỗ ở lấy từ dữ liệu chỗ ở đã có của tỉnh (ngày kiểm 08/11/2026))
