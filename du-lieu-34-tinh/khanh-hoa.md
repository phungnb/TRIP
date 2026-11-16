# Dữ liệu cẩm nang Khánh Hòa (Nha Trang) — Giai đoạn 1 (đầy đủ)

- **Trạng thái: published** — đẩy lên theo lệnh anh ngày 06/11/2026 (đẩy hết lên, bỏ vòng duyệt chuyên gia; các nợ dữ liệu vẫn giữ nguyên, xem mục 9).
- Ngày kiểm: 06/11/2026. Mọi giá đều là **khoảng giá tham khảo** từ nguồn công khai, không phải giá chốt. Giá đổi theo mùa, cuối tuần, lễ Tết — kiểm lại trước ngày đi.
- Bổ sung 08/11/2026: SĐT chỗ ở + mục trời mưa, cặp đôi, dặn an toàn xe máy, mùa/tháng (nguồn ghi ở từng mục).
- Vùng: **Miền Trung** (Duyên hải Nam Trung Bộ — trung tâm Nha Trang). Đã sửa ngày 06/11/2026: trước đây `region` trong JSON và bảng tổng hợp ghi nhầm Miền Nam.
- Lưu ý địa giới: từ 07/2025 tỉnh Ninh Thuận sáp nhập vào Khánh Hòa; tên phường mới trong các nguồn không thống nhất — file này ghi đường + số nhà là chính.
- **Tọa độ GPS (cập nhật 06/11/2026):** đã điền cho toàn bộ 15 địa danh; 7 điểm còn ở mức xấp xỉ (ghi rõ trong bảng và trường toa_do_xap_xi trong JSON) — cần kiểm lại bằng GPS thực tế, TUYỆT ĐỐI không bịa tọa độ.** Tọa độ trung tâm trong meta là tọa độ tham khảo khu vực trung tâm thành phố.
- **Khách sạn/homestay: CHỈ giới thiệu sơ.** Tất cả đều ghi "chưa kiểm chứng / chưa đối tác / chưa thu phí". Không dùng chữ uy tín/đảm bảo. Không nhận đặt phòng, không nhận tiền.
- File JSON máy đọc được: `khanh-hoa.json` (cùng thư mục).

## 1. Địa danh — 15 điểm chính (12 cũ + 3 mở rộng Ninh Thuận cũ)

Mốc tính khoảng cách: Quảng trường 2/4 / Tháp Trầm Hương, đường Trần Phú (trung tâm Nha Trang). Khoảng cách là đường đi theo nguồn, không phải đường chim bay.

### 1.1. Cụm trung tâm — ven biển Trần Phú

| # | Tên | Địa chỉ | Tọa độ | Cách trung tâm | Giá vé | Giờ mở cửa | Thời gian | Hợp với ai | Lưu ý | Nguồn |
|---|---|---|---|---|---|---|---|---|---|---|
| 1 | Bãi biển Trần Phú | Đường Trần Phú, phường Nha Trang; bờ biển dài ~6 km | 12.24, 109.196 (xấp xỉ) | 0 km (mốc trung tâm) | Miễn phí | 24/7 (không gian công cộng); đẹp nhất 5:30–7:30 và sau 16:00 | 1–2 giờ | Mọi đối tượng, gia đình, chạy bộ buổi sáng | Nắng gắt 11h–14h; giữ tư trang, hỏi giá ghế/dù trước khi thuê | reviewnhatrang.com.vn, newlifetravel.vn |
| 2 | Tháp Trầm Hương / Quảng trường 2/4 | Quảng trường 2/4, đường Trần Phú, phường Nha Trang | 12.2386, 109.1966 | 0 km, sát bãi biển | Miễn phí | Mở cửa cả ngày | 30–60 phút; đẹp nhất hoàng hôn | Mọi đối tượng, check-in | Tối đông, giữ tư trang | newlifetravel.vn, vietnamtour.in |
| 3 | Chợ Đầm | Đường Phan Bội Châu / Nguyễn Thái Học, phường Nha Trang (chợ tròn biểu tượng) | 12.2497, 109.1903 | ~1 km | Miễn phí vào chợ; hải sản khô, đặc sản 50.000–300.000đ tùy món | Chợ ngày ~6:00–17:00 (chưa kiểm được giờ đóng chính xác) | 1 giờ | Người thích mua đặc sản, ẩm thực | Hỏi giá trước khi mua; mặc cả nhẹ; tiền mặt | vinpearl.com, mytour.vn |
| 4 | Nhà thờ Núi (Nhà thờ Đá / Chánh tòa Nha Trang) | 01 Thái Nguyên, phường Nha Trang | 12.2464, 109.1887 | ~1 km | Miễn phí (có thu phí tự nguyện/kiểm soát đoàn theo một số nguồn) | Tham quan 5:30–17:00; Chủ nhật hạn chế giờ lễ (5:00–7:00 và 11:00–16:00 theo nguồn) | 30–60 phút | Người yêu kiến trúc, cặp đôi chụp ảnh | Ăn mặc kín đáo, tránh giờ lễ | newlifetravel.vn, onelife.vn |
| 5 | Chùa Long Sơn | 22 đường 23/10, phường Tây Nha Trang | 12.2521, 109.1835 | ~1,5 km | Miễn phí; gửi xe ~5.000–10.000đ | Tự do, nên đi 5:00–18:00 | 1–1,5 giờ (leo 193 bậc lên tượng Phật trắng 24 m) | Mọi đối tượng, người lớn tuổi đi chậm | Leo bậc dốc, mang giày bệt; ăn mặc kín đáo | newlifetravel.vn, vietnamtour.in |

### 1.2. Cụm phía Bắc

| # | Tên | Địa chỉ | Tọa độ | Cách trung tâm | Giá vé | Giờ mở cửa | Thời gian | Hợp với ai | Lưu ý | Nguồn |
|---|---|---|---|---|---|---|---|---|---|---|
| 6 | Tháp Bà Ponagar | Đường 2/4 (số 61 Hai Tháng Tư theo nguồn), phường Bắc Nha Trang | 12.26528, 109.19556 | ~2 km | 30.000đ/người lớn; trẻ em dưới 1 m miễn phí (có nguồn ghi trẻ em 15.000đ) | 6:00–17:30 / 6:00–18:00 (nguồn mâu thuẫn, xem mục 9) | 1–1,5 giờ | Người yêu văn hóa Chăm, gia đình | Ăn mặc kín đáo; lễ vía Bà tháng 3 âm lịch rất đông | newlifetravel.vn, reviewnhatrang.com.vn, vinpearl.com |
| 7 | Hòn Chồng | Đường Phạm Văn Đồng, phường Bắc Nha Trang | 12.2784, 109.2015 | ~3 km | ~22.000đ/người lớn, ~11.000đ/trẻ em (có nguồn ghi 30.000đ — chưa chốt) | 7:00–19:00 | 1–1,5 giờ; đẹp nhất sáng sớm/hoàng hôn | Cặp đôi, giới trẻ check-in | Đá trơn khi có sóng; cẩn thận trẻ nhỏ | reviewnhatrang.com.vn, vietnamtour.in |
| 8 | Suối Ba Hồ | Xã Ninh Ích / khu vực phía bắc Nha Trang, cách trung tâm ~25 km (địa chỉ chi tiết theo xã chưa thống nhất sau sáp nhập) | 12.318, 109.15 (xấp xỉ) | ~25 km, 45–60 phút đi xe | ~135.000đ/người (theo vinpearl.com 7/2025 — cần xác nhận tại cổng) | 8:00–16:30 | Nửa ngày (3–4 giờ) | Nhóm bạn, người thích trekking nhẹ, tắm suối | Đường suối trơn, cần giày chống trượt; mùa mưa nước xiết, không tắm hồ trên | reviewnhatrang.com.vn, vietnamtour.in |

### 1.3. Cụm phía Nam / đảo

| # | Tên | Địa chỉ | Tọa độ | Cách trung tâm | Giá vé | Giờ mở cửa | Thời gian | Hợp với ai | Lưu ý | Nguồn |
|---|---|---|---|---|---|---|---|---|---|---|
| 9 | Viện Hải dương học | Số 1 Cầu Đá, phường Nam Nha Trang | 12.2108, 109.208 | ~6 km | Người lớn 40.000đ; sinh viên 20.000đ; học sinh 10.000đ; trẻ dưới 6 tuổi miễn phí | 6:00–18:00 hàng ngày | 1,5–2 giờ | Gia đình có trẻ nhỏ, người yêu biển | Hơn 20.000 mẫu sinh vật biển; bộ xương cá voi dài ~26 m | newlifetravel.vn, reviewnhatrang.com.vn |
| 10 | VinWonders Nha Trang (đảo Hòn Tre) | Đảo Hòn Tre, phường Nam Nha Trang; đi cáp treo/tàu cao tốc từ cảng Vinpearl, đường Trần Phú | 12.2145, 109.2215 (xấp xỉ) | ~6 km tới cảng + cáp treo ~3,3 km | Người lớn ~800.000–1.050.000đ; trẻ em/người cao tuổi ~600.000–690.000đ (tùy gói, đã gồm cáp treo/tàu khứ hồi); vé sau 16:00 rẻ hơn | 8:00–20:00 (có nguồn ghi 8:30–20:00) | Cả ngày (6–8 giờ) | Gia đình, nhóm bạn | Cáp treo bảo trì 26/10–10/11/2026 theo nguồn — đi tàu cao tốc trong thời gian này, cộng ~15 phút; kiểm lại trước ngày đi | newlifetravel.vn, onelife.vn, reviewnhatrang.com.vn |
| 11 | Đảo Hòn Tằm | Vịnh Nha Trang, phường Nam Nha Trang; cano từ cảng du lịch | 12.188, 109.236 (xấp xỉ) | ~7 km đường biển (cano ~20 phút) | Gói tắm bùn/tắm khoáng + cano ~350.000–800.000đ/người; gói có buffet ~900.000–1.000.000đ/người | 8:00–17:00 | Nửa ngày–cả ngày | Cặp đôi, gia đình nghỉ dưỡng | Đặt gói trước, hỏi rõ gồm buffet hay không; say sóng nên uống thuốc trước | newlifetravel.vn, onelife.vn |
| 12 | Bãi Dài Cam Lâm | Xã Cam Lâm, phía nam Nha Trang, ven QL1A hướng sân bay Cam Ranh | 11.955, 109.185 (xấp xỉ) | ~25–30 km, 30–45 phút đi xe | Miễn phí vào bãi công cộng; ghế/dù và dịch vụ riêng thu thêm (chưa kiểm được mức chung) | Cả ngày | 2–3 giờ | Gia đình, nhóm bạn tắm biển | Bãi dài, sóng có lúc mạnh; không tắm xa bờ; ít hàng quán hơn Trần Phú | reviewnhatrang.com.vn, klook.com |

### 1.4. Điểm mở rộng — Ninh Thuận cũ (gần Nha Trang, cùng cụm ven biển TL702)

| # | Tên | Địa chỉ | Tọa độ | Cách trung tâm | Giá vé | Giờ mở cửa | Thời gian | Hợp với ai | Lưu ý | Nguồn |
|---|---|---|---|---|---|---|---|---|---|---|
| 1 | Vịnh Vĩnh Hy (Ninh Thuận cũ) | Xã Vĩnh Hải, huyện Ninh Hải, tỉnh Ninh Thuận cũ (nay thuộc Khánh Hòa), ven tỉnh lộ 702 | 11.71667, 109.20278 | ~60 km | Miễn phí vào vịnh; tàu tham quan chưa kiểm được mức vé riêng — hỏi giá trước tại bến | Ban ngày; tàu chạy theo giờ bến | Nửa ngày–cả ngày (đi về từ Nha Trang mất cả ngày) | Người thích biển hoang sơ, lặn ngắm san hô | Thuộc khu vực Ninh Thuận cũ (sáp nhập vào Khánh Hòa 07/2025), cách Nha Trang ~60 km về phía nam, cùng cụm di chuyển với Hang Rái – Tháp Po Klong Garai theo cung ven biển TL702; đi mùa khô tháng 1–8, hỏi giá tàu trước | vi.wikipedia.org, buulong.com.vn, tripi.vn |
| 2 | Hang Rái (Ninh Thuận cũ) | Thôn Thái An, xã Vĩnh Hải, huyện Ninh Hải, tỉnh Ninh Thuận cũ (nay thuộc Khánh Hòa), trên tỉnh lộ 702, gần Vịnh Vĩnh Hy | 11.723, 109.21 (xấp xỉ) | ~58 km | Chưa kiểm được mức vé riêng — hỏi giá tại cổng | Ban ngày | 1–1,5 giờ | Giới trẻ check-in, người thích chụp ảnh | Thuộc khu vực Ninh Thuận cũ (sáp nhập vào Khánh Hòa 07/2025), cùng cụm Vĩnh Hy trên cung TL702, cách Nha Trang ~58 km; đá trơn, sóng lớn nguy hiểm nếu đứng sát mép; tọa độ xấp xỉ, cần kiểm lại | tripi.vn, dulichvietnam.com.vn |
| 3 | Tháp Po Klong Garai (Ninh Thuận cũ) | Đồi Trầu, phường Phan Rang, tỉnh Ninh Thuận cũ (nay thuộc Khánh Hòa), cách trung tâm Phan Rang ~7 km về phía tây | 11.5647, 108.9753 (xấp xỉ) | ~100 km | Chưa kiểm được mức vé riêng — hỏi giá tại cổng | Ban ngày | 1–1,5 giờ | Người yêu văn hóa Chăm, gia đình | Thuộc khu vực Ninh Thuận cũ (sáp nhập vào Khánh Hòa 07/2025), cách Nha Trang ~100 km — chỉ hợp ghép tour Phan Rang – Vĩnh Hy 1 ngày, không đi lẻ trong ngày thường; nắng Ninh Thuận rất gắt; tọa độ xấp xỉ, cần kiểm lại | Google Maps, tripi.vn |

## 2. Ở đâu — 8 chỗ ở (CHỈ GIỚI THIỆU SƠ)

**Tất cả: "Thông tin tham khảo, chưa kiểm chứng trực tiếp, chưa phải đối tác, chưa thu phí. Người dùng tự kiểm tra giá / phòng trống trước khi đặt." Không dùng chữ uy tín/đảm bảo. Không nhận đặt phòng, không nhận tiền.**
Giá tăng cuối tuần, lễ Tết, mùa hè tháng 6–8.

| # | Tên | Địa chỉ | Khu vực | Hạng | Khoảng giá/đêm ngày thường | SĐT (ngày kiểm 08/11/2026) | Cách trung tâm | Hợp với ai | Trạng thái | Nguồn |
|---|---|---|---|---|---|---|---|---|---|
| 1 | Sunrise Nha Trang Beach Hotel & Spa | 12–14 Trần Phú, phường Nha Trang | Ven biển Trần Phú | 4 sao | Từ ~950.000đ/đêm (phòng cao hơn tới ~1.800.000đ) | 0258 3820 999 (mytour.vn; kayak.com; tadiha.com) | Sát bãi biển, đối diện Tháp Trầm Hương | Cặp đôi, gia đình muốn view biển | Chưa kiểm chứng / chưa đối tác / chưa thu phí | findtour.vn |
| 2 | Nha Trang Lodge Hotel | 42 Trần Phú, phường Nha Trang | Ven biển Trần Phú | 4 sao | ~700.000–1.200.000đ/đêm (nguồn khác ghi Superior từ ~1.400.000đ — mâu thuẫn, xem mục 9) | 0832 888 665 (nhatranglodgehotel.com — hotline/Zalo; số bàn 0258 3521 500 theo transport10.com) | Sát bãi biển, cách Quảng trường 2/4 ~50 m | Gia đình, cặp đôi | Chưa kiểm chứng / chưa đối tác / chưa thu phí | findtour.vn, mia.vn |
| 3 | Masova Hotel Nha Trang | 100A8–100A9 Trần Phú, phường Nha Trang | Ven biển Trần Phú | 4 sao | ~400.000–3.000.000đ/đêm tùy hạng (khoảng rộng, chưa kiểm được khoảng hẹp) | 0387 458 128 (fanpage chính thức — video 07/11/2026; số bàn 0258 3905 999 theo level.travel) | Cách bãi biển ~7 phút đi bộ | Cặp đôi, gia đình | Chưa kiểm chứng / chưa đối tác / chưa thu phí | mia.vn |
| 4 | Novotel Nha Trang | 50 Trần Phú, phường Nha Trang | Ven biển Trần Phú | 4 sao (chưa kiểm được hạng sao chính thức trong đợt này) | Chưa kiểm được khoảng giá riêng — khung 4 sao Trần Phú ~1.000.000–1.800.000đ/đêm | 0258 6256 900 (tripi.vn; mytour.vn; mia.vn) | Sát bãi biển trung tâm | Khách công tác, gia đình | Chưa kiểm chứng / chưa đối tác / chưa thu phí | findtour.vn |
| 5 | Mường Thanh Luxury Nha Trang | 60 Trần Phú, phường Nha Trang | Ven biển Trần Phú | 4 sao (chưa kiểm được hạng sao chính thức trong đợt này) | Chưa kiểm được khoảng giá riêng — khung 4 sao Trần Phú ~1.000.000–1.800.000đ/đêm | 0258 3898 888 (booking.muongthanh.com) | Sát bãi biển trung tâm | Gia đình, khách đoàn | Chưa kiểm chứng / chưa đối tác / chưa thu phí | findtour.vn |
| 6 | Khách sạn 2–3 sao khu Hùng Vương / Nguyễn Thị Minh Khai (nhóm tham khảo) | Đường Hùng Vương, Nguyễn Thị Minh Khai, Biệt Thự, phường Nha Trang | Trung tâm, sau lưng Trần Phú | 2–3 sao | ~350.000–800.000đ/đêm | Chưa tra được — mục nhóm tham khảo, không có khách sạn cụ thể (ngày kiểm 08/11/2026) | Cách bãi biển 5–10 phút đi bộ | Khách tiết kiệm, cặp đôi, nhóm bạn | Chưa kiểm chứng / chưa đối tác / chưa thu phí | findtour.vn |
| 7 | Vinpearl Resort Nha Trang (đảo Hòn Tre) | Đảo Hòn Tre, phường Nam Nha Trang | Đảo, resort | 5 sao (chưa kiểm được hạng sao chính thức trong đợt này) | Chưa kiểm được khoảng giá riêng trong đợt này | 0258 3598 222 (vinpearl.com) | Đi cáp treo/tàu từ cảng Trần Phú | Gia đình nghỉ dưỡng dài, cặp đôi | Chưa kiểm chứng / chưa đối tác / chưa thu phí | vinpearl.com |
| 8 | Homestay / căn hộ khu vực trung tâm (nhóm tham khảo) | Khu vực phường Nha Trang, gần chợ Đầm / đường Trần Phú | Trung tâm | Homestay/căn hộ (không hạng sao) | Chưa kiểm được khoảng giá riêng trong đợt này | Chưa tra được — mục nhóm tham khảo, không có khách sạn cụ thể (ngày kiểm 08/11/2026) | Đi bộ ra biển/chợ | Nhóm bạn, gia đình đông người | Chưa kiểm chứng / chưa đối tác / chưa thu phí | findtour.vn |

## 3. Ăn gì — 9 món (đủ quán + địa chỉ + khoảng giá)

| # | Món | Buổi ăn | Khoảng giá | Quán tham khảo (địa chỉ) | Nguồn |
|---|---|---|---|---|---|
| 1 | Nem nướng Ninh Hòa | Ăn trưa / ăn tối | 30.000–55.000đ/phần (có nguồn ghi tới 50.000–132.000đ tùy phần lớn) | (1) Nem nướng Đặng Văn Quyên — 16A Lãn Ông và 02–04 Phan Bội Châu; ~40.000đ/phần, 10:00–22:00. (2) Nem nướng Vũ Thành An — 15 Lê Lợi; 20.000–55.000đ/phần | vinpearl.com, mytour.vn, dulich9.com |
| 2 | Bún chả cá | Ăn sáng / ăn trưa | 20.000–50.000đ/tô (có nguồn ghi tới 75.000đ) | (1) Bún cá Nguyên Loan — 123 Ngô Gia Tự (có nguồn ghi 123 Nguyễn Gia Tự); 15.000–30.000đ/tô, 6:30–22:00. (2) Bún cá Năm Beo — Lô B2 chung cư Chợ Đầm, Phan Bội Châu; 20.000–33.000đ/tô, 7:00–21:00 | vinpearl.com, mytour.vn, dulich9.com |
| 3 | Bún sứa | Ăn sáng / ăn trưa | 25.000–35.000đ/tô | (1) Bún sứa — 3 Tăng Bạt Hổ; 25.000–35.000đ/tô, 6:30–22:00. (2) Bún cá Năm Beo — Lô B2 chung cư Chợ Đầm, Phan Bội Châu (cùng quán món 2) | mytour.vn, misskick.vn |
| 4 | Bánh căn hải sản | Ăn sáng / ăn xế | 10.000–60.000đ/phần | (1) Bánh căn Cô Tư — 7A đường Tháp Bà; 20.000–50.000đ/phần, 10:00–21:00. (2) Bánh căn 151 Hoàng Văn Thụ; 20.000–30.000đ/phần, buổi sáng 6:00–11:00 | vinpearl.com, mytour.vn |
| 5 | Bánh canh chả cá | Ăn sáng / ăn trưa / ăn tối | 15.000–55.000đ/tô | (1) Bánh canh bà Thừa — 55 Yersin; 15.000–55.000đ/tô (hết sớm, nên đi trước 8:30). (2) Bánh canh vỉa hè — 9 Trần Văn Ơn; 15.000–30.000đ/tô, 9:00–21:00 | misskick.vn, vietsuntravel.com, dulich9.com |
| 6 | Bò nướng Lạc Cảnh | Ăn trưa / ăn tối (món nhóm) | 35.000–275.000đ/món | (1) Bò nướng Lạc Cảnh — 44 Nguyễn Bỉnh Khiêm; 35.000–275.000đ/món | dulich9.com |
| 7 | Hải sản tươi sống (tôm hùm, ghẹ, ốc) | Ăn trưa / ăn tối | Chưa kiểm được mức chung — theo kg, hỏi giá trước khi gọi | (1) Khu hải sản đường Trần Phú / khu vực cầu Đá, phường Nam Nha Trang — nhiều quán, không ghi tên quán cụ thể khi chưa kiểm được địa chỉ | vinpearl.com |
| 8 | Gỏi cá mai | Ăn trưa / ăn tối | Chưa kiểm được khoảng giá riêng trong đợt này | (1) Chưa ghi quán cụ thể — chỉ ghi món đặc sản cần kiểm thêm quán có địa chỉ | vinpearl.com |
| 9 | Bánh ướt / bánh bèo chén | Ăn sáng / ăn xế | 15.000–30.000đ/phần (khoảng tham khảo chung) | (1) Khu chợ Đầm / chợ Xóm Mới, phường Nha Trang — nhiều quầy, hỏi giá trước | vinpearl.com |

## 4. Đi đến Nha Trang bằng gì

Sân bay gần nhất: Cam Ranh (CXR), cách trung tâm Nha Trang ~35 km, 45–60 phút. Ga Nha Trang ở trung tâm thành phố.

### 4.1. Từ TP.HCM (~430 km đường bộ, cao tốc đã thông)

| Phương tiện | Thời gian | Khoảng giá | Hãng / ghi chú | Nguồn |
|---|---|---|---|---|
| Máy bay SGN–CXR | Bay ~1h10; cộng di chuyển sân bay–trung tâm ~45–60 phút, tổng ~2h55 | Một chiều từ ~570.000đ; khứ hồi ~1.500.000–3.000.000đ (tùy thời điểm đặt) | Vietnam Airlines, Vietjet Air, Bamboo Airways | klook.com, geckoroutes.com |
| Tàu SG–Nha Trang | 7–8,5 giờ (SE8 6:00–13:43; SE6 8:45–16:06; SE22 10:15–18:05) | Ghế mềm từ ~296.000đ; giường nằm khoang 4 từ ~585.000đ | Đường sắt Việt Nam (SE8/SE6/SE22) | vietnamtransportguide.com |
| Xe khách / limousine | 6,5–10,5 giờ (cao tốc rút ngắn còn ~4–5 giờ theo một số nguồn — mâu thuẫn, xem mục 9) | Xe thường từ ~370.000đ; limousine ~350.000–550.000đ/lượt | Phương Trang (FUTA), các hãng limousine | klook.com, geckoroutes.com |
| Ô tô riêng (cao tốc) | ~5–6 giờ (chưa kiểm được con số chính xác) | Chưa kiểm được phí cầu đường toàn tuyến — nguồn ghi phí ETC xe dưới 12 chỗ hơn 500.000đ/lượt | Lộ trình: TP.HCM – Long Thành – Dầu Giây – Phan Thiết – Vĩnh Hảo – Cam Lâm – Nha Trang | klook.com |

### 4.2. Từ Hà Nội (~1.280 km)

| Phương tiện | Thời gian | Khoảng giá | Ghi chú | Nguồn |
|---|---|---|---|---|
| Máy bay HAN–CXR | Bay ~1h50 | Một chiều từ ~914.000đ (theo nguồn 11/2026); giá thường cao hơn nhiều tùy thời điểm | Phương án khuyên dùng | vietnamtransportguide.com, klook.com |
| Tàu HN–Nha Trang | ~24h50 (SE1 21:45–22:35 hôm sau) | Ghế mềm từ ~297.000đ; giường khoang 4 từ ~618.000đ (giá theo chặng, chưa kiểm được toàn chặng HN–Nha Trang chính xác) | Đi tàu dài, chỉ hợp người dư thời gian | vietnamtransportguide.com |
| Xe khách | ~24–26 giờ (chưa kiểm được hãng/giá cụ thể) | Chưa kiểm được | Không khuyên dùng | klook.com |

### 4.3. Từ sân bay Cam Ranh vào trung tâm (~35 km, 45–60 phút)

| Phương tiện | Khoảng giá | Ghi chú | Nguồn |
|---|---|---|---|
| Xe buýt số 18 (Đất Mới) | ~65.000đ/lượt; 5:30–21:30, ~30 phút/chuyến | Điểm trả: 86 Trần Phú | vietnamtransportguide.com, klook.com |
| VinBus tuyến 16-2 | ~50.000đ/lượt | Phù hợp khách ở Vinpearl | klook.com |
| Taxi / xe công nghệ | Taxi 350.000–400.000đ/chuyến; xe công nghệ 250.000–350.000đ/chuyến | Hỏi giá trọn gói trước | vietnamtransportguide.com, klook.com |
| Xe buýt Phương Trang Nha Trang–Cam Ranh | ~24.000đ/vé (tuyến buýt, dừng nhiều điểm, 60–120 phút) | Chuyến 5:30–17:45 | motortrip.vn |

## 5. Đi lại trong Nha Trang

| Phương tiện | Khoảng giá | Giấy tờ / điều kiện | Ghi chú | Nguồn |
|---|---|---|---|---|
| Thuê xe máy | ~100.000–150.000đ/ngày (khoảng tham khảo chung miền biển, chưa kiểm được mức riêng Nha Trang trong đợt này) | CCCD + bằng lái A1 | Đi đảo phải gửi xe ở cảng; đường Trần Phú dễ đi | Chưa kiểm được nguồn riêng — ghi vào mục 9 |
| Taxi nội thành | Chưa kiểm được mức theo km riêng Nha Trang — taxi sân bay 250.000–400.000đ/chuyến (mục 4.3) | — | Hãng: Mai Linh, Vinasun, Xanh SM; có Grab/Be | vietnamtransportguide.com |
| Xe buýt nội thành / VinBus | Xe buýt ~5.000–10.000đ/lượt (khoảng chung, chưa kiểm được tuyến cụ thể); VinBus ~50.000đ/lượt (tuyến sân bay) | — | Tuyến ven biển Trần Phú – Phạm Văn Đồng thuận tiện | klook.com |
| Thuê ô tô tự lái / có tài xế | Chưa kiểm được mức riêng Nha Trang trong đợt này | Bằng lái B2 + CCCD (tự lái) | Thuê theo ngày đi Suối Ba Hồ / Bãi Dài tiện hơn taxi lẻ | Chưa kiểm được — ghi vào mục 9 |
| Cano / tàu ra đảo | Đã gồm trong gói đảo (mục 1: Hòn Tằm 350.000–800.000đ; VinWonders gồm cáp treo/tàu) | — | Đi tour đảo nên đặt trước, kiểm tra giờ cano về | newlifetravel.vn |

## 6. Lịch trình mẫu

### 6.1. Lịch trình 3N2Đ (chính)

| Ngày | Buổi | Hoạt động | Điểm / quán gắn kèm |
|---|---|---|---|
| Ngày 1 — Trung tâm | Sáng | Bãi biển Trần Phú (1–2 giờ) + Tháp Trầm Hương / Quảng trường 2/4 (30–60 phút) | Địa danh 1, 2 |
| Ngày 1 | Chiều | Nhà thờ Núi (30–60 phút) + Chùa Long Sơn (1–1,5 giờ) | Địa danh 4, 5 |
| Ngày 1 | Tối | Chợ Đầm + nem nướng Đặng Văn Quyên | Địa danh 3; món 1 |
| Ngày 2 — Đảo | Sáng–chiều | VinWonders Hòn Tre cả ngày (6–8 giờ) | Địa danh 10 |
| Ngày 2 | Tối | Bún chả cá Nguyên Loan + bánh căn | Món 2, 4 |
| Ngày 3 — Bắc + Nam | Sáng | Tháp Bà Ponagar (1–1,5 giờ) + Hòn Chồng (1–1,5 giờ) | Địa danh 6, 7 |
| Ngày 3 | Chiều | Viện Hải dương học (1,5–2 giờ), tối về | Địa danh 9 |

### 6.2. Lịch trình 2N1Đ (bản gấp)

| Ngày | Buổi | Hoạt động |
|---|---|---|
| Ngày 1 | Sáng | Bãi biển Trần Phú + Tháp Trầm Hương |
| Ngày 1 | Chiều | Tháp Bà Ponagar + Hòn Chồng |
| Ngày 1 | Tối | Chợ Đầm + nem nướng |
| Ngày 2 | Sáng–chiều | VinWonders Hòn Tre hoặc Viện Hải dương học + Bãi Dài; tối về |

### 6.3. Lịch trình 4N3Đ (bản chậm)

| Ngày | Buổi | Hoạt động |
|---|---|---|
| Ngày 1–2 | Cả ngày | Như ngày 1–2 của lịch trình 3N2Đ |
| Ngày 3 | Sáng | Tháp Bà Ponagar + Hòn Chồng |
| Ngày 3 | Chiều | Viện Hải dương học |
| Ngày 4 | Sáng | Suối Ba Hồ (nửa ngày) hoặc Hòn Tằm tắm bùn |
| Ngày 4 | Chiều | Bãi Dài Cam Lâm (hoặc Vịnh Vĩnh Hy – Hang Rái, Ninh Thuận cũ, nếu ở thêm ngày), mua đặc sản, về |

## 7. Bảng chi phí ước tính (1 người, 3N2Đ từ TP.HCM, ở 3–4 sao, đi tàu/xe khách)

| Hạng mục | Ước tính 3N2Đ / người | Căn cứ |
|---|---|---|
| Xe/tàu SG–Nha Trang khứ hồi | 600.000–1.200.000đ | Mục 4.1 (tàu ghế mềm ~296.000đ/chiều; xe ~370.000đ/chiều) |
| Ở 2 đêm (chia đôi phòng 3–4 sao) | 700.000–1.800.000đ | Mục 2 (3 sao ~350.000–800.000đ; 4 sao ~1.000.000–1.800.000đ, chia 2 người) |
| Ăn 3 ngày | 450.000–900.000đ | Mục 3 (món 15.000–55.000đ/phần; bò nướng/hải sản cao hơn) |
| Vé tham quan (VinWonders là khoản lớn nhất) | 900.000–1.400.000đ | Mục 1 (VinWonders 800.000–1.050.000đ; Ponagar 30.000đ; Hòn Chồng ~22.000đ; Viện 40.000đ) |
| Đi lại trong thành phố + xe sân bay | 200.000–500.000đ | Mục 4.3, 5 (buýt sân bay 65.000đ/lượt; taxi 250.000–400.000đ/chuyến) |
| **Tổng ước tính** | **2.850.000–5.800.000đ/người** | Cộng các khoảng trên |
| Nếu đi máy bay thay tàu/xe | Cộng thêm ~500.000–1.000.000đ/chiều so với vé tàu/xe | Mục 4.1 |
| Nếu đi từ Hà Nội | Vé máy bay là hạng mục lớn nhất: từ ~914.000đ/chiều (chưa gồm xe sân bay) | Mục 4.2 |

## 8. Checklist mang theo

- Kem chống nắng, mũ/nón, kính râm, áo khoác mỏng chống nắng; giày đi bộ / dép đi biển.
- CCCD + bằng lái A1 (nếu thuê xe máy), tiền mặt lẻ (chợ, quán nhỏ).
- Đồ bơi, khăn tắm, túi chống nước điện thoại (đi đảo, VinWonders công viên nước).
- Thuốc say sóng (đi cano ra đảo), thuốc cơ bản, sạc dự phòng.
- Hỏi giá trước khi gọi món hải sản / thuê ghế dù ở bãi biển.

## 9. Mục chưa kiểm được / cần xác nhận lại (ghi rõ, không bịa)

1. Tọa độ GPS: đã điền cho toàn bộ 15 địa danh (06/11/2026); 7 điểm còn ở mức xấp xỉ (ghi rõ trong bảng mục 1 và trường toa_do_xap_xi trong JSON) — cần kiểm lại bằng GPS thực tế.
2. Giờ mở cửa Tháp Bà Ponagar — 6:00–17:30 vs 6:00–18:00.
3. Giá vé Hòn Chồng — ~22.000đ vs 30.000đ.
4. Giá vé Suối Ba Hồ — chỉ 1 nguồn (~135.000đ, 7/2025), cần xác nhận tại cổng.
5. Giá vé VinWonders — khoảng rộng 800.000–1.050.000đ tùy gói; cáp treo bảo trì 26/10–10/11/2026.
6. Giá phòng Nha Trang Lodge — 700.000–1.200.000đ vs Superior từ ~1.400.000đ.
7. Giá phòng Novotel / Mường Thanh Luxury / Vinpearl Resort Nha Trang — chưa kiểm được khoảng riêng.
8. Giá thuê xe máy, taxi theo km, thuê ô tô riêng Nha Trang — chưa kiểm được mức riêng.
9. Thời gian xe khách SG–Nha Trang — 6,5–10,5 giờ vs ~4–5 giờ (cao tốc).
10. Giá hải sản theo kg, giá gỏi cá mai — chưa kiểm được mức chung; quán hải sản chưa ghi tên cụ thể.
11. Tên phường mới sau sáp nhập 07/2025 — nhiều nguồn vẫn dùng tên phường cũ.
12. Địa chỉ chi tiết Suối Ba Hồ theo xã mới — chưa thống nhất.
13. Giá vé/giờ 3 điểm mới Ninh Thuận cũ (Vịnh Vĩnh Hy, Hang Rái, Tháp Po Klong Garai) chưa kiểm được mức riêng — hỏi giá tại cổng/bến.
14. Hai mục nhóm tham khảo (khách sạn 2–3 sao khu Hùng Vương / Nguyễn Thị Minh Khai; homestay/căn hộ trung tâm) không có khách sạn cụ thể nên không có SĐT riêng. SĐT Nha Trang Lodge (0832 888 665, website chính thức) và Masova (0387 458 128, fanpage chính thức) có số bàn khác theo nguồn tổng hợp (0258 3521 500 / 0258 3905 999) — file ghi số của kênh chính thức, ghi chú số bàn kèm theo (ngày kiểm 08/11/2026).

## 10. Nhận xét của M và đánh giá người dùng (bổ sung 06/11/2026)

Nhận xét dưới đây là chính kiến của M sau khi đọc review trên Google Maps / TripAdvisor / Foody / blog du lịch uy tín — viết lại bằng lời của M, KHÔNG copy nguyên văn review, KHÔNG bịa số sao. Đánh giá người dùng trong app hiện chưa có — bạn là người đầu tiên.

### 10.1. Địa danh

- **Bãi biển Trần Phú**: Bãi biển dài, cát mịn, nước trong vào mùa khô — điểm mạnh nhất là đi bộ/chạy bộ buổi sáng rất dễ chịu và miễn phí. Điểm yếu: nắng gắt giữa trưa, ghế/dù và dịch vụ ven biển hay bị chê chặt chém nếu không hỏi giá trước. Hợp mọi đối tượng, nhất là gia đình và người thích tắm biển buổi sáng; tránh tắm xa bờ khi sóng lớn. (Nguồn tham khảo: Google Maps; wikidulich.com; TripAdvisor; ngày kiểm 06/11/2026). Đánh giá người dùng: chưa có đánh giá — bạn là người đầu tiên.
- **Tháp Trầm Hương / Quảng trường 2/4**: Biểu tượng check-in của Nha Trang, đẹp nhất lúc hoàng hôn và buổi tối khi lên đèn. Điểm yếu: chỉ là điểm dừng chụp ảnh nhanh, không có gì tham quan sâu bên trong; tối cuối tuần rất đông. Hợp mọi đối tượng, ghé 30–60 phút là đủ; tránh giữa trưa nắng gắt. (Nguồn tham khảo: Google Maps; wikidulich.com; TripAdvisor; ngày kiểm 06/11/2026). Đánh giá người dùng: chưa có đánh giá — bạn là người đầu tiên.
- **Chợ Đầm**: Chợ tròn biểu tượng, mua đặc sản khô và ăn vặt khá tiện, giá mặc cả được. Điểm yếu: nhiều quầy nói thách, không gian nóng và đông; khách không quen mặc cả dễ mua đắt. Hợp người thích mua đặc sản; nên đi buổi sáng, hỏi giá 2–3 quầy trước khi mua. (Nguồn tham khảo: Google Maps; vinpearl.com; mytour.vn; ngày kiểm 06/11/2026). Đánh giá người dùng: chưa có đánh giá — bạn là người đầu tiên.
- **Nhà thờ Núi (Nhà thờ Đá)**: Kiến trúc đá Gothic đẹp, lên đồi ngắm được một góc thành phố; chụp ảnh cưới hay được chọn. Điểm yếu: diện tích nhỏ, tham quan nhanh là hết; phải tránh giờ lễ. Hợp người yêu kiến trúc, cặp đôi; đi sáng sớm hoặc chiều mát. (Nguồn tham khảo: Google Maps; newlifetravel.vn; ngày kiểm 06/11/2026). Đánh giá người dùng: chưa có đánh giá — bạn là người đầu tiên.
- **Chùa Long Sơn**: Tượng Phật trắng 24 m trên đồi là điểm nhấn, leo 193 bậc vừa sức và có view thành phố. Điểm yếu: bậc dốc, trưa nắng leo mệt; người lớn tuổi cần đi chậm, nghỉ giữa chặng. Hợp mọi đối tượng nếu đi sáng sớm; tránh 11h–14h. (Nguồn tham khảo: Google Maps; newlifetravel.vn; ngày kiểm 06/11/2026). Đánh giá người dùng: chưa có đánh giá — bạn là người đầu tiên.
- **Tháp Bà Ponagar**: Di tích Chăm đẹp và có giá trị nhất Nha Trang, kiến trúc gạch nung còn nguyên vẹn, view sông Cái – cầu Xóm Bóng rất ăn ảnh. Điểm yếu: lễ vía Bà tháng 3 âm lịch đông nghẹt; giờ mở cửa các nguồn ghi mâu thuẫn 17:30/18:00. Hợp người yêu văn hóa, gia đình; nên đi sáng sớm. (Nguồn tham khảo: vi.wikipedia.org; newlifetravel.vn; Google Maps; ngày kiểm 06/11/2026). Đánh giá người dùng: chưa có đánh giá — bạn là người đầu tiên.
- **Hòn Chồng**: Bãi đá chồng lên nhau sát biển, chụp ảnh hoàng hôn đẹp, vé rẻ. Điểm yếu: khu nhỏ, tham quan 1–1,5 giờ là hết; đá trơn khi có sóng, trẻ nhỏ cần trông kỹ. Hợp cặp đôi, giới trẻ check-in; đi sáng sớm hoặc hoàng hôn. (Nguồn tham khảo: Google Maps; reviewnhatrang.com.vn; ngày kiểm 06/11/2026). Đánh giá người dùng: chưa có đánh giá — bạn là người đầu tiên.
- **Suối Ba Hồ**: Suối 3 hồ nước trong, leo suối vui, hợp nhóm bạn thích vận động. Điểm yếu: đường suối trơn, mùa mưa nước xiết nguy hiểm; vé chỉ có 1 nguồn (~135.000đ, 7/2025) nên phải xác nhận tại cổng. Hợp nhóm bạn khỏe; tránh mùa mưa và không tắm hồ trên. (Nguồn tham khảo: Google Maps; reviewnhatrang.com.vn; ngày kiểm 06/11/2026). Đánh giá người dùng: chưa có đánh giá — bạn là người đầu tiên.
- **Viện Hải dương học**: Hơn 20.000 mẫu sinh vật biển, bộ xương cá voi dài ~26 m — điểm học mà chơi tốt nhất cho trẻ nhỏ ở Nha Trang, vé chỉ 40.000đ. Điểm yếu: cơ sở vật chất cũ, một số bể trông xuống cấp theo review. Hợp gia đình có trẻ nhỏ; đi buổi sáng cho mát. (Nguồn tham khảo: Google Maps; newlifetravel.vn; ngày kiểm 06/11/2026). Đánh giá người dùng: chưa có đánh giá — bạn là người đầu tiên.
- **VinWonders Nha Trang (đảo Hòn Tre)**: Công viên lớn nhất Nha Trang: cáp treo vượt biển ngắm vịnh, thủy cung và vòng quay hoàng hôn được khen nhiều nhất (TripAdvisor 4.2/5). Điểm yếu: vé cao (~950.000đ vé 1 ngày, 660.000đ sau 16h theo wikidulich 11/2026), đi bộ cả ngày rất mệt, xếp hàng trò hot 1–2 giờ, ăn trong khu giá cao. Hợp gia đình, nhóm bạn khỏe; người lớn tuổi/trẻ nhỏ nên chọn vé chiều. (Nguồn tham khảo: TripAdvisor; wikidulich.com; Google Maps; ngày kiểm 06/11/2026). Đánh giá người dùng: chưa có đánh giá — bạn là người đầu tiên.
- **Đảo Hòn Tằm**: Tắm bùn khoáng trên đảo yên tĩnh, hợp nghỉ dưỡng nửa ngày; biển quanh đảo sạch hơn bãi trung tâm. Điểm yếu: gói vé nhiều loại dễ nhầm (có/không buffet), giá 350.000–1.000.000đ tùy gói; say sóng cần uống thuốc trước. Hợp cặp đôi, gia đình nghỉ dưỡng; đi cano sáng, về trước 17h. (Nguồn tham khảo: Google Maps; newlifetravel.vn; ngày kiểm 06/11/2026). Đánh giá người dùng: chưa có đánh giá — bạn là người đầu tiên.
- **Bãi Dài Cam Lâm**: Bãi dài, cát trắng, ít đông hơn Trần Phú, hợp tắm biển gia đình và picnic. Điểm yếu: sóng có lúc mạnh, ít hàng quán/dịch vụ hơn bãi trung tâm, đi xa (~27 km). Hợp gia đình có ô tô/xe máy; không tắm xa bờ, tránh ngày sóng lớn. (Nguồn tham khảo: Google Maps; reviewnhatrang.com.vn; klook.com; ngày kiểm 06/11/2026). Đánh giá người dùng: chưa có đánh giá — bạn là người đầu tiên.
- **Vịnh Vĩnh Hy (Ninh Thuận cũ)**: Một trong những vịnh đẹp nhất Việt Nam: nước trong, san hô đẹp, tàu đáy kính ngắm san hô tiện. Điểm yếu: cách Nha Trang ~60 km, đi về mất cả ngày; dịch vụ tàu nhiều giá, phải hỏi rõ trước. Hợp người thích biển hoang sơ, lặn ngắm san hô; đi mùa khô tháng 1–8. (Nguồn tham khảo: vi.wikipedia.org; buulong.com.vn; Google Maps; ngày kiểm 06/11/2026). Đánh giá người dùng: chưa có đánh giá — bạn là người đầu tiên.
- **Hang Rái (Ninh Thuận cũ)**: Rạn đá nham thạch sát biển, sóng vỗ tạo hình đẹp, điểm săn ảnh nổi tiếng nhất cung Vĩnh Hy. Điểm yếu: đá trơn, sóng lớn nguy hiểm nếu đứng sát mép; khu nhỏ, tham quan nhanh là hết. Hợp giới trẻ check-in; đi sáng sớm, mang giày chống trượt. (Nguồn tham khảo: tripi.vn; Google Maps; ngày kiểm 06/11/2026). Đánh giá người dùng: chưa có đánh giá — bạn là người đầu tiên.
- **Tháp Po Klong Garai (Ninh Thuận cũ)**: Tháp Chăm còn nguyên vẹn ở Phan Rang, kiến trúc gạch nung và lễ hội Katê đặc sắc. Điểm yếu: cách Nha Trang ~100 km, chỉ hợp ghép tour Phan Rang – Vĩnh Hy 1 ngày; nắng Ninh Thuận rất gắt. Hợp người yêu văn hóa Chăm; đi sáng sớm hoặc chiều mát. (Nguồn tham khảo: Google Maps; tripi.vn; ngày kiểm 06/11/2026). Đánh giá người dùng: chưa có đánh giá — bạn là người đầu tiên.

### 10.2. Món ăn

- **Nem nướng Ninh Hòa**: Nem nướng than thơm, cuốn bánh tráng giòn — món 'phải thử' ở Nha Trang, giá bình dân. Điểm yếu: quán đông giờ ăn, nem nướng sẵn để lâu dễ nguội; quán Đặng Văn Quyên được nhắc nhiều nhất. Hợp ăn trưa/tối; đi trước 19h đỡ xếp hàng. (Nguồn tham khảo: Google Maps; vinpearl.com; mytour.vn; ngày kiểm 06/11/2026). Đánh giá người dùng: chưa có đánh giá — bạn là người đầu tiên.
- **Bún chả cá**: Nước dùng ngọt thanh từ cá, chả cá dai — ăn sáng chuẩn vị biển Nha Trang. Điểm yếu: mỗi quán một vị, quán Nguyên Loan đông và hết sớm. Hợp ăn sáng; đi trước 8h30. (Nguồn tham khảo: Google Maps; vinpearl.com; mytour.vn; ngày kiểm 06/11/2026). Đánh giá người dùng: chưa có đánh giá — bạn là người đầu tiên.
- **Bún sứa**: Sứa giòn sần sật, nước lèo thanh — lạ miệng với khách miền khác. Điểm yếu: không phải ai cũng ăn được sứa; quán nhỏ, chỗ ngồi hạn chế. Hợp người thích thử món lạ; ăn sáng là ngon nhất. (Nguồn tham khảo: Google Maps; mytour.vn; ngày kiểm 06/11/2026). Đánh giá người dùng: chưa có đánh giá — bạn là người đầu tiên.
- **Bánh căn hải sản**: Bánh giòn ngoài, mềm trong, nhân tôm mực tươi — ăn vặt buổi sáng rất hợp. Điểm yếu: quán Cô Tư đông, chờ lâu; dầu mỡ nhiều, ăn nhiều dễ ngán. Hợp ăn sáng/xế. (Nguồn tham khảo: Google Maps; vinpearl.com; mytour.vn; ngày kiểm 06/11/2026). Đánh giá người dùng: chưa có đánh giá — bạn là người đầu tiên.
- **Bánh canh chả cá**: Sợi bánh canh mềm, chả cá thơm, giá rẻ 15.000–55.000đ. Điểm yếu: quán bà Thừa hết sớm (đi trước 8:30), quán vỉa hè chỗ ngồi đơn sơ. Hợp ăn sáng. (Nguồn tham khảo: Google Maps; misskick.vn; ngày kiểm 06/11/2026). Đánh giá người dùng: chưa có đánh giá — bạn là người đầu tiên.
- **Bò nướng Lạc Cảnh**: Bò nướng than hoa tại bàn, thịt ướp đậm — quán lâu đời, khách địa phương cũng hay ăn. Điểm yếu: khói nhiều, giá theo món 35.000–275.000đ dễ gọi lố; không hợp người không ăn được khói than. Hợp nhóm bạn, ăn tối. (Nguồn tham khảo: Google Maps; dulich9.com; ngày kiểm 06/11/2026). Đánh giá người dùng: chưa có đánh giá — bạn là người đầu tiên.
- **Hải sản tươi sống**: Hải sản Nha Trang tươi, nhiều loại, ăn tại quán ven biển. Điểm yếu: giá theo kg, không hỏi giá trước dễ bị tính cao — review nhắc nhiều nhất là phải hỏi giá/cân trước. Hợp nhóm, ăn tối; luôn hỏi giá và cân trước khi gọi. (Nguồn tham khảo: Google Maps; vinpearl.com; ngày kiểm 06/11/2026). Đánh giá người dùng: chưa có đánh giá — bạn là người đầu tiên.
- **Gỏi cá mai**: Cá mai tươi trộn thính, cuốn bánh tráng — món đặc sản ít nơi có. Điểm yếu: chưa kiểm được quán cụ thể có địa chỉ rõ ràng, giá chưa có mức chung; cá sống nên người yếu bụng cân nhắc. Hợp người thích món lạ; chỉ ăn ở quán đông khách, cá tươi trong ngày. (Nguồn tham khảo: Google Maps; vinpearl.com; ngày kiểm 06/11/2026). Đánh giá người dùng: chưa có đánh giá — bạn là người đầu tiên.
- **Bánh ướt / bánh bèo chén**: Bánh mềm, nhân tôm thịt, giá rẻ — ăn sáng nhẹ nhàng kiểu địa phương. Điểm yếu: quán chủ yếu ở chợ, chỗ ngồi đơn sơ, không có địa chỉ cố định. Hợp ăn sáng ở chợ Đầm/Xóm Mới. (Nguồn tham khảo: Google Maps; vinpearl.com; ngày kiểm 06/11/2026). Đánh giá người dùng: chưa có đánh giá — bạn là người đầu tiên.

### 10.3. Chỗ ở

Tất cả chỗ ở đã có trường đánh giá người dùng (mảng rỗng trong JSON) — chưa có đánh giá, bạn là người đầu tiên.

## 11. Trời mưa thì đi đâu (bổ sung 08/11/2026)

Trời mưa thì ưu tiên điểm trong nhà (Viện Hải dương học, thủy cung VinWonders, chợ Đầm có mái); tránh ra đảo, tắm biển và leo suối khi mưa to, sóng lớn.

| # | Điểm | Ghi chú |
|---|---|---|
| 1 | Viện Hải dương học | Tham quan trong nhà, hơn 20.000 mẫu sinh vật biển |
| 2 | Chợ Đầm | Chợ có mái che, mua đặc sản và ăn vặt; hỏi giá trước |
| 3 | VinWonders Nha Trang (đảo Hòn Tre) | Thủy cung và khu trong nhà; đi tàu cao tốc khi cáp treo bảo trì, kiểm tra thời tiết trước khi ra đảo |
| 4 | Nhà thờ Núi (Nhà thờ Đá) | Nhà thờ có mái; ăn mặc kín đáo, tránh giờ lễ |

Các điểm đều đã có trong mục 1, chỉ chọn lại theo tiêu chí trú mưa (ngày kiểm 08/11/2026).

## 12. Đi cặp đôi (bổ sung 08/11/2026)

**Chỗ ở hợp cặp đôi** (theo trường "Hợp với ai" trong mục 2): Sunrise Nha Trang Beach Hotel & Spa, Nha Trang Lodge Hotel, Masova Hotel Nha Trang, Vinpearl Resort Nha Trang (đảo Hòn Tre), Khách sạn 2–3 sao khu Hùng Vương / Nguyễn Thị Minh Khai (nhóm tham khảo).

**Điểm hợp cặp đôi** (từ mục 1): Hòn Chồng, Nhà thờ Núi (Nhà thờ Đá), Đảo Hòn Tằm.

## 13. Dặn an toàn xe máy + đặt phòng — khung chung (bổ sung 08/11/2026)

Khung chung cho tỉnh miền núi/đèo: đường dốc, đèo quanh co, sương mù và mưa làm đường trơn — đi chậm, giữ khoảng cách, bật đèn khi sương mù; thuê xe số leo dốc tốt hơn xe ga yếu; xuống dốc dài về số thấp (số 2–3), không rà phanh liên tục, không tắt máy thả trôi; kiểm tra phanh, lốp, đèn trước khi nhận xe; đặt phòng trước 2–3 tuần vào cuối tuần, sớm hơn vào lễ/Tết. (Khung chung — không phải chi tiết riêng của từng tỉnh. Nguồn: xemayanthanhphat.com; agotourist.com; hoadalattravel.vn — ngày kiểm 08/11/2026.)

## 14. Mùa + tháng — tháng đẹp nhất (bổ sung 08/11/2026)

- **Tháng đẹp nhất:** tháng 1–8 là mùa khô, biển êm, ít mưa; đẹp nhất tháng 2–5 (ít mưa, nắng đẹp, biển êm); tránh tháng 10–11 mưa nhiều, có nguy cơ bão.

Nguồn: vietnamtourism.com; ducminhtrip.com; reviewnhatrang.com.vn; alma-resort.com (ngày kiểm 08/11/2026).

## 15. Cảnh báo chặt chém + lừa cọc (bổ sung 08/11/2026)

- **Taxi chở khách tới quán hải sản 'quen' để ăn hoa hồng rồi cân gian: đoàn 25 du khách từ Hà Nội đặt taxi tới quán ở số 15 Trần Phú nhưng tài xế chở tới quán khác ở 102 Trần Phú; đoàn chọn 3,4kg cá, cân ngay tại bể, nhưng món dọn lên chỉ còn khoảng một nửa. Sở Du lịch Khánh Hòa đã vào kiểm tra, xác minh.** Cách tránh: Tự đặt địa chỉ quán trên bản đồ và đối chiếu số nhà khi xe dừng; không ăn ở quán do tài xế taxi/xích lô giới thiệu; hải sản bán theo cân thì yêu cầu cân lại trước mặt, chốt tổng tiền trước khi đưa vào bếp. (Nguồn: vietnamnet.vn — Du khách tố bị tài xế taxi lừa đưa vào quán hải sản 'cân điêu' ở Nha Trang, 01/04/2024 (ngày kiểm 08/11/2026))
- **Quán vỉa hè không niêm yết giá: 2 đĩa bánh căn tôm và bánh căn mực (mỗi đĩa 6 cái) bị tính 250.000đ tại một quán vỉa hè đường Tô Hiến Thành, Nha Trang; thanh toán bằng miệng, không có hóa đơn. UBND TP Nha Trang đã vào kiểm tra.** Cách tránh: Chỉ ăn ở quán có niêm yết giá rõ ràng; hỏi giá từng món và tổng tiền trước khi gọi món, nhất là quán vỉa hè không menu. (Nguồn: plo.vn (trích lại trên 2banh.vn) — Khách kêu trời với 2 đĩa bánh căn giá 250.000 đồng (ngày kiểm 08/11/2026))
- **Hải sản giá cao gây tranh cãi: tháng 6/2026 du khách phản ánh một nhà hàng ở Nha Trang bán cá bò hòm 2,9 triệu đồng/kg; cơ quan chức năng kiểm tra và kết luận chưa có căn cứ xác định mức giá đó cao bất hợp lý so với mặt bằng thị trường lúc đó — nghĩa là giá cao chưa hẳn là chặt chém, nhưng du khách vẫn dễ bị sốc khi thanh toán.** Cách tránh: Với hải sản bán theo cân, đừng chỉ hỏi đơn giá/kg: yêu cầu cân thực tế, quy đổi ra tổng số tiền và chốt tổng tiền ngay tại bàn trước khi đồng ý cho nhà bếp chế biến. (Nguồn: soha.vn — Giải pháp 'chống chặt chém' khi ăn hải sản ở điểm du lịch, 06/10/2026 (ngày kiểm 08/11/2026))
- **Mực khô giả bán rong: trên đường Trần Phú và gần các khách sạn xuất hiện người bán rong mực khô giá chỉ khoảng 200.000đ/kg (rẻ hơn nhiều so với mực thật 520.000-580.000đ/kg) nhưng thực chất là 'mực ma' làm bằng nhựa — dai, khó xé, đốt có mùi khét và cháy đen; người bán rong không có địa chỉ nên không khiếu nại được.** Cách tránh: Không mua mực khô hay đặc sản từ người bán rong; mua ở chợ Xóm Mới hoặc cửa hàng có địa chỉ rõ ràng, kiểm tra mùi và độ dai trước khi mua. (Nguồn: todaynhatrang.vn — Tránh xa mực ma khô 200K và nhà hàng do taxi, xích lô giới thiệu (ngày kiểm 08/11/2026))
- **Lừa cọc đặt phòng qua fanpage giả (cảnh báo chung, áp dụng cho Nha Trang): kẻ gian lập fanpage/website giả mạo khách sạn, resort uy tín, sao chép hình ảnh trang chính thống, rao giá rẻ bất thường rồi yêu cầu chuyển cọc, sau đó chặn liên lạc.** Cách tránh: Liên hệ trực tiếp khách sạn qua website/số điện thoại chính thức để xác minh mã đặt chỗ trước khi thanh toán; không chuyển tiền khi chỉ thỏa thuận qua tin nhắn. (Nguồn: congan.ninhbinh.gov.vn — Cảnh giác với thủ đoạn lừa đảo trong mùa du lịch 2026 (Công an tỉnh Ninh Bình) (ngày kiểm 08/11/2026))


## 16. An toàn đường đèo + thuê xe máy (bổ sung 08/11/2026)

Trong địa bàn Nha Trang chủ yếu là đường ven biển bằng phẳng, nhưng đi xa về phía Đà Lạt sẽ qua đèo Hòn Giao (Khánh Lê) dài 33km, nhiều cua, sương mù dày — chỉ đi ban ngày, đi chậm, bật đèn cos, không vượt ở cua khuất. Cung đường ven biển Trần Phú - Phạm Văn Đồng lên đèo Lương Sơn (phía bắc Nha Trang) có đoạn đèo dốc, cua gấp ven biển, mặt đường có thể trơn sau mưa; đi chậm và quan sát xe ngược chiều. Không dừng xe giữa đường để chụp ảnh biển.

**Đèo/đoạn cần chú ý:**
- Đèo Hòn Giao / Khánh Lê (tỉnh lộ 723, Nha Trang - Đà Lạt, dài 33km) — đèo dài nhất khu vực, sương mù dày, nhiều cua gấp
- Đèo Lương Sơn (đường ven biển Trần Phú - Phạm Văn Đồng, phía bắc Nha Trang) — đoạn đèo dốc ven biển, cua gấp, trơn sau mưa

(Nguồn: 2banh.vn — 18 con đèo đẹp ngoạn mục hiểm trở nhất Việt Nam (đèo Hòn Giao dài 33km); tienphong.vn — Giải Vô địch Quốc gia Marathon Báo Tiền Phong 2026 (cung đường Trần Phú - Phạm Văn Đồng hướng lên đèo Lương Sơn) (ngày kiểm 08/11/2026))


## 17. Số khẩn cấp + xử lý sự cố (bổ sung 08/11/2026)

- Công an: 113 — Cấp cứu: 115 — Cứu hỏa: 114
- Bệnh viện Đa khoa tỉnh Khánh Hòa (hotline): 0258 3822175 (Nguồn: website chính thức Bệnh viện Đa khoa Khánh Hòa — benhvienkhanhhoa.org.vn (hotline hiển thị trên trang chủ, kiểm ngày 08/11/2026))

(Nguồn: số chung cả nước 113/115/114 là số khẩn cấp quốc gia; số riêng theo nguồn ghi trong từng mục (ngày kiểm 08/11/2026))


## 18. Giờ đẹp chụp ảnh (bổ sung 08/11/2026)

| # | Điểm | Giờ đẹp | Nguồn |
|---|---|---|---|
| 1 | Tháp Bà Ponagar | 6:00-8:30 sáng sớm, ánh sáng xiên đẹp lên tháp gạch, đến sớm trước khi đoàn khách đông (tháp mở cửa 6:00) | vietnamspot.ru — Nha Trang Photo Spots: Where to Get the Best Shots; agoda.com — Discover Photo-Worthy Spots in Nha Trang (ngày kiểm 08/11/2026) |
| 2 | Hòn Chồng | 5:30-6:30 bình minh, nắng đầu ngày chiếu lên khối đá granite và mặt biển; 15:00-16:30 ánh chiều lên đá | vietnamspot.ru — Nha Trang Photo Spots; dulichlive.com — Bảng xếp hạng những địa điểm chụp ảnh đẹp nhất ở Nha Trang 2026 (ngày kiểm 08/11/2026) |
| 3 | Bãi biển Trần Phú | 5:30-6:30 bình minh trên biển; 17:00-18:30 chiều muộn, bầu trời chuyển cam hồng trên vịnh | vietnamspot.ru — Nha Trang Photo Spots (giờ vàng bình minh 5:30-6:30, hoàng hôn 17:30-18:30); agoda.com — Discover Photo-Worthy Spots in Nha Trang (ngày kiểm 08/11/2026) |


## 19. Cho người chạy giải (bổ sung 08/11/2026)

**Giải chạy (đã kiểm nguồn):**
- VnExpress Marathon Nha Trang — tháng 8 hằng năm (mùa 2026: sáng 09/08/2026, các cự ly 5km, 10km, 21km, 42km) (Nguồn: vnexpress.net — VnExpress Marathon Nha Trang qua các năm 2022-2026, 31/07/2026; vnexpress.net — Nha Trang dự báo mưa nhẹ đêm VnExpress Marathon Nha Trang 2026, 03/08/2026 (ngày kiểm 08/11/2026))
- Giải Vô địch Quốc gia Marathon - Báo Tiền Phong — tháng 3 (mùa 2026: 27-29/3/2026, xuất phát - về đích tại Quảng trường 2/4 Nha Trang) (Nguồn: thuonghieucongluan.com.vn — Khánh Hòa: Giải Vô địch quốc gia Marathon - Báo Tiền Phong lần thứ 67 năm 2026, 27/03/2026 (ngày kiểm 08/11/2026))

**Điểm chạy bộ đẹp:** Đường ven biển Trần Phú - Phạm Văn Đồng (cung đường chạy chính của các giải, buổi sáng sớm mát); Quảng trường 2/4 - Tháp Trầm Hương (điểm xuất phát các giải lớn); Đường ven biển hướng lên đèo Lương Sơn (chạy dài cuối tuần của CLB Nha Trang Runners).

**Chỗ ở gần điểm xuất phát** (lấy từ mục chỗ ở đã có): Sunrise Nha Trang Beach Hotel & Spa; Nha Trang Lodge Hotel; Novotel Nha Trang.

(Nguồn: Tên giải + thời gian theo vnexpress.net, thuonghieucongluan.com.vn; điểm chạy theo tienphong.vn (cung đường Trần Phú - Phạm Văn Đồng); chỗ ở lấy từ dữ liệu chỗ ở đã có của tỉnh (đường Trần Phú, gần Quảng trường 2/4) (ngày kiểm 08/11/2026))
