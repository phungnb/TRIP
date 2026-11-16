# Dữ liệu cẩm nang Thái Nguyên (trung tâm: TP Thái Nguyên) — Giai đoạn 1 (đầy đủ)

- **Trạng thái: published** — đẩy lên theo lệnh anh ngày 06/11/2026 (đẩy hết lên, bỏ vòng duyệt chuyên gia; các nợ dữ liệu vẫn giữ nguyên, xem mục 9).
- Ngày kiểm: 06/11/2026. Cập nhật 06/11/2026: đã điền tọa độ cho mọi điểm từng null (có điểm xấp xỉ — xem ghi chú), thêm 3 điểm gần, thêm nhận xét của M cho mọi địa danh/món và mảng đánh giá người dùng (rỗng). Mọi giá đều là **khoảng giá tham khảo** từ nguồn công khai, không phải giá chốt. Giá đổi theo mùa, cuối tuần, lễ Tết — kiểm lại trước ngày đi.
- Bổ sung 08/11/2026: số điện thoại chỗ ở (cột Điện thoại, mục 2) + mục 2B Trời mưa thì đi đâu + mục 2C Cho cặp đôi + mục 2D Mùa + tháng đẹp nhất. Số điện thoại tra từ nguồn công khai ngày 08/11/2026; chỗ nào ghi 'Chưa tra được' là chưa tìm thấy số khớp tên + địa chỉ.
- Trung tâm tính khoảng cách: TP Thái Nguyên. Tọa độ trung tâm (21.5942, 105.8489) là tọa độ ước lượng theo thành phố.
- **Tọa độ từng địa danh: CHƯA kiểm được chính xác nên để null trong JSON, không bịa tọa độ.** Xem mục 9.
- **Khách sạn/homestay: CHỈ giới thiệu sơ.** Tất cả đều ghi "chưa kiểm chứng / chưa đối tác / chưa thu phí". Không dùng chữ uy tín/đảm bảo. Không nhận đặt phòng, không nhận tiền.
- Mùa đẹp nhất: Tháng 3–5 và tháng 9–11 (mát, đồi chè xanh); Hồ Núi Cốc đẹp nhất mùa xuân và mùa thu; tránh tháng 11–2 lạnh, nhiều trò chơi đóng cửa. Số ngày gợi ý: 3 ngày.
- Lưu ý địa giới: Từ 2025 tỉnh Bắc Kạn sáp nhập vào Thái Nguyên — Hồ Ba Bể nay thuộc tỉnh Thái Nguyên.
- File JSON máy đọc được: cùng thư mục, tên file theo slug.

## 1. Địa danh — 13 điểm

Mốc tính khoảng cách: TP Thái Nguyên. Khoảng cách là đường đi theo nguồn, không phải đường chim bay.

| Tên | Địa chỉ | Tọa độ | Cách trung tâm | Giá vé | Giờ mở cửa | Thời gian | Hợp với ai | Lưu ý | Nguồn |
|---|---|---|---|---|---|---|---|---|---|
| Khu du lịch Hồ Núi Cốc | Xã Tân Thái, huyện Đại Từ, cách TP Thái Nguyên ~15 km về phía tây | 21.57747, 105.70388 | ~15 km | Vé trọn gói 130.000đ/người lớn (trên 1,2 m); người cao tuổi/thương binh ~80.000–91.000đ; trẻ dưới 1,1–1,2 m miễn phí; thuyền trên hồ 30.000–50.000đ/người | 7:00–19:30 (dịch vụ vui chơi; có nguồn ghi 7:30–17:30 / 8:00–18:00); lưu trú 24/7; nhạc nước ~18:00–20:00 | Nửa ngày đến 1 ngày (chùa Thác Vàng, động Huyền Thoại, công viên nước, 8 trò cảm giác mạnh) | Gia đình, nhóm bạn, trẻ em | Vé đã gồm hầu hết trò chơi; mùa đông (11–2) lạnh, công viên nước có thể đóng; mang đồ bơi nếu tắm | dulich.pro.vn, klook.com, vietnamairlines.com, dulich9.com |
| Đồi chè Tân Cương | Xã Tân Cương, TP Thái Nguyên, cách trung tâm ~10 km | 21.54414, 105.75996 | ~10 km | Miễn phí tham quan đồi chè (chưa kiểm được phí tour hái chè/trải nghiệm nếu có) | Cả ngày; đẹp nhất sáng sớm | 1,5–2,5 giờ | Mọi đối tượng, người thích chụp ảnh, tìm hiểu trà | Đồi chè đang sản xuất — không giẫm luống chè; mua chè tại cơ sở địa phương, hỏi giá trước | cardina.vn, efly.vn |
| Hang Phượng Hoàng – Suối Mỏ Gà | Huyện Võ Nhai, cách TP Thái Nguyên ~40 km | 21.77952, 106.12001 | ~40 km | Chưa kiểm được giá vé hiện hành thống nhất | Chưa kiểm được giờ chính thức — tham quan ban ngày | 2–3 giờ | Nhóm bạn, gia đình thích hang động | Hang 3 tầng (hang Dơi – hang Sáng – hang Tối), chu vi ~380 m; suối Mỏ Gà dưới chân núi nước lạnh quanh năm; leo bậc đá, mang giày chống trượt | cardina.vn, efly.vn, cuongdulich.com |
| Khu di tích lịch sử ATK Định Hóa | Huyện Định Hóa (lán Tỉn Keo, đồi Phong Tướng, Khuôn Tát) | 21.7883, 105.50985 (xấp xỉ, cần kiểm lại) | ~60 km | Chưa kiểm được giá vé hiện hành thống nhất (nhiều nguồn ghi miễn phí tham quan) | Chưa kiểm được giờ chính thức — tham quan ban ngày | Nửa ngày (hơn 40 điểm di tích: Tỉn Keo, Khuôn Tát, Khau Ty, đèo Giàng) | Người yêu lịch sử, gia đình, học sinh | Di tích quốc gia đặc biệt (2012), căn cứ kháng chiến chống Pháp 1946–1954; đi cùng Thác Khuôn Tát trong cùng cung | cardina.vn, efly.vn, tracuuquyhoach.com |
| Thác Khuôn Tát (thác Bảy Tầng) | Xóm Tỉn Keo, xã Phú Đình, huyện Định Hóa | 21.79, 105.51 (xấp xỉ, cần kiểm lại) | ~60 km | Chưa kiểm được giá vé hiện hành | Cả ngày (nên đi ban ngày) | 1–2 giờ | Nhóm bạn, gia đình | Nằm gần lán Tỉn Keo và nhà trưng bày ATK — ghép cùng cung ATK Định Hóa; đường trơn khi mưa | efly.vn |
| Bảo tàng Văn hóa các dân tộc Việt Nam | Trung tâm TP Thái Nguyên | 21.59723, 105.83863 | ~0 km | Chưa kiểm được giá vé hiện hành | Chưa kiểm được giờ chính thức | 1,5–2 giờ | Mọi đối tượng, gia đình có trẻ nhỏ | Trưng bày văn hóa 54 dân tộc; hợp đi buổi sáng trước khi ra Hồ Núi Cốc | tourtrips.org, tracuuquyhoach.com |
| Suối Cửa Tử | Huyện Đại Từ | 21.61654, 105.56636 | ~30 km | Chưa kiểm được giá vé hiện hành | Chưa kiểm được giờ chính thức — đi ban ngày | Nửa ngày (trekking suối) | Nhóm bạn, người thích trekking suối | Suối có nhiều cửa hẹp, nước xiết theo mùa; nên đi cùng người địa phương, mang giày lội nước, áo phao | cardina.vn |
| Hồ Ba Bể | Huyện Ba Bể (tỉnh Bắc Kạn cũ, nay thuộc Thái Nguyên), cách TP Thái Nguyên ~100 km | 22.41, 105.62 (xấp xỉ, cần kiểm lại) | ~100 km | Phí tham quan 60.000đ/người/lần theo Nghị quyết 32/2025/NQ-HĐND tỉnh Thái Nguyên (từ 01/01/2026), chưa gồm thuyền/kayak; thuyền theo tuyến 550.000–800.000đ/thuyền (xác nhận tại bến) | Chưa kiểm được giờ chính thức | Nửa ngày đến 1 ngày (đi thuyền hồ, động Puông, thác Đầu Đẳng) | Gia đình, nhóm bạn, người thích hồ – rừng | Hồ nước ngọt tự nhiên lớn, đi thuyền là chính; đường xa, nên đi 2 ngày 1 đêm hoặc ghép tour | tracuuquyhoach.com |
| Chùa Hang (chùa Kim Sơn) | TP Thái Nguyên (khu vực Đồng Hỷ – TP Thái Nguyên) | 21.62422, 105.84367 (xấp xỉ, cần kiểm lại) | ~5 km | Miễn phí (chưa kiểm được phí nếu có) | Chưa kiểm được giờ chính thức | 1 giờ | Mọi đối tượng, người yêu tâm linh | Chùa trong hang đá; ăn mặc lịch sự, giữ yên lặng | tracuuquyhoach.com |
| Đền Đuổm | Huyện Phú Lương, Thái Nguyên | 21.75512, 105.70745 | ~20 km | Chưa kiểm được giá vé hiện hành | Chưa kiểm được giờ chính thức | 1–1,5 giờ | Người yêu lịch sử – tâm linh | Đền thờ Dương Tự Minh; lễ hội Đền Đuổm tháng Giêng âm lịch | tracuuquyhoach.com |

### Điểm mới thêm 06/11/2026 (mở rộng theo quyết định 07:05 — chỉ điểm gần, cùng cụm di chuyển được)

| Tên | Địa chỉ | Tọa độ | Cách trung tâm | Giá vé | Giờ mở cửa | Thời gian | Hợp với ai | Lưu ý | Nguồn |
|---|---|---|---|---|---|---|---|---|---|
| Động Hua Mạ | Bản Pác Ngòi, xã Quảng Khê, Ba Bể (Bắc Kạn cũ, nay thuộc Thái Nguyên; cách hồ Ba Bể ~6 km về phía nam) | 22.38, 105.6 (xấp xỉ, cần kiểm lại) | ~100 km | 25.000–40.000đ/người — các nguồn mâu thuẫn: Nghị quyết 32/2025/NQ-HĐND tỉnh Thái Nguyên quy định 40.000đ từ 01/01/2026, các nguồn cũ ghi 25.000–30.000đ | Chưa kiểm được giờ chính thức — tham quan ban ngày; đẹp nhất tháng 9–11 | 1,5–2 giờ (leo bậc thang đá lên cửa động) | Gia đình, người thích hang động | Hang động lớn được mệnh danh 'đệ nhất kỳ quan' vùng Đông Bắc, dài gần 700 m, trần cao 40–50 m, cùng cụm Ba Bể với hồ Ba Bể và thác Đầu Đẳng — tiện ghép trong ngày đi Ba Bể. Tọa độ xấp xỉ, cần kiểm lại. Tránh mùa mưa tháng 5–8 (bậc đá rêu trơn). | dulichviet.com.vn, mia.vn, tripi.vn, antamtour.vn |
| Thác Đầu Đẳng | Xã Nam Mẫu, Ba Bể (Bắc Kạn cũ, nay thuộc Thái Nguyên; trên sông Năng, cuối tuyến thuyền hồ Ba Bể) | 22.42, 105.65 (xấp xỉ, cần kiểm lại) | ~100 km | Miễn phí vé thác riêng; phí tham quan Vườn quốc gia Ba Bể 60.000đ/người (NQ 32/2025, từ 01/01/2026) + thuê thuyền 550.000–800.000đ/thuyền/tuyến — thuyền là phương tiện duy nhất tới thác | Cả ngày (theo giờ thuyền) | Nửa ngày (đi thuyền từ hồ Ba Bể) | Gia đình, nhóm bạn đi hồ Ba Bể | Thác 3 tầng trên sông Năng, dài hơn 1.000 m, cùng cụm Ba Bể với hồ Ba Bể và động Hua Mạ — đi thuyền từ hồ, không đi bộ tới được. Tọa độ xấp xỉ, cần kiểm lại. Đẹp nhất tháng 5–9 khi nhiều nước. | tripi.vn, nucuoimekong.com, antamtour.vn, viptrip.vn |
| Hồ Ghềnh Chè | Sông Công, Thái Nguyên (cách TP Thái Nguyên ~15 km) | 21.47, 105.81 (xấp xỉ, cần kiểm lại) | ~15 km | Chưa kiểm được mức vé hiện hành | Chưa kiểm được giờ chính thức — tham quan ban ngày | Nửa ngày | Gia đình, cặp đôi, người thích hồ – đảo chè | Hồ với đảo chè giữa lòng hồ, gần TP Thái Nguyên — hợp đi nửa ngày thư giãn, khác hẳn cụm núi – hang của tỉnh. Tọa độ xấp xỉ, cần kiểm lại. Dịch vụ và giá chưa kiểm được, hỏi người dân trước khi đi. | dulichviet.com.vn |

## 2. Ở đâu — 7 chỗ ở (CHỈ GIỚI THIỆU SƠ)

**Tất cả các mục dưới đây: "Thông tin tham khảo, chưa kiểm chứng trực tiếp, chưa phải đối tác, chưa thu phí. Người dùng tự kiểm tra giá / phòng trống trước khi đặt." Không dùng chữ uy tín/đảm bảo. Không nhận đặt phòng, không nhận tiền.**

| Tên | Địa chỉ | Khu vực | Hạng | Khoảng giá/đêm ngày thường | Điện thoại | Cách trung tâm | Hợp với ai | Trạng thái | Nguồn |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| Đông Á Plaza | 668 Phan Đình Phùng, phường Đồng Quang, TP Thái Nguyên | trung-tam | 4 sao | ~300.000–1.200.000đ/đêm (các nguồn ghi khác nhau: từ 300.000đ / ~45 USD) | 0208 6261 188 | Trung tâm TP | Gia đình, khách công tác | Chưa kiểm chứng / chưa đối tác / chưa thu phí | cms.thainguyen.vn, vietnambooking.com |
| Khách sạn Đông Á 1 | 142 Hoàng Văn Thụ, TP Thái Nguyên | trung-tam | 2 sao | ~450.000–600.000đ/đêm (~19 USD) | 0208 3758 288 | Trung tâm TP | Khách tiết kiệm | Chưa kiểm chứng / chưa đối tác / chưa thu phí | vietnambooking.com |
| Habana Hotel | TP Thái Nguyên | trung-tam | Chưa kiểm được hạng sao | ~1.100.000đ/đêm (~47 USD) | 0208 3648 999 | Trung tâm TP | Khách muốn tiện nghi cao | Chưa kiểm chứng / chưa đối tác / chưa thu phí | vietnambooking.com |
| Khách sạn Hoàng Mấm – Minh Cầu | TP Thái Nguyên | trung-tam | 3 sao (có nguồn ghi 3,2 sao) | ~700.000–800.000đ/đêm (~30 USD) | 0208 3656 222 | Trung tâm TP | Gia đình, khách công tác | Chưa kiểm chứng / chưa đối tác / chưa thu phí | vietnambooking.com |
| Khách sạn Galaxy Thái Nguyên | TP Thái Nguyên | trung-tam | 3 sao | Chưa kiểm được khoảng giá riêng | 0208 3930 999 | Trung tâm TP | Khách tiết kiệm | Chưa kiểm chứng / chưa đối tác / chưa thu phí | vietnambooking.com |
| Khách sạn Hải Âu Thái Nguyên | TP Thái Nguyên | trung-tam | 3 sao | Chưa kiểm được khoảng giá riêng | 0208 3737 389 | Trung tâm TP | Khách tiết kiệm | Chưa kiểm chứng / chưa đối tác / chưa thu phí | vietnambooking.com |
| Phúc Xuân Resort (Hồ Núi Cốc) | Khu vực Hồ Núi Cốc, huyện Đại Từ | ho-nui-coc | Resort | ~760.000đ/đêm (có bể bơi, ăn sáng) | 0208 3700 990 | Ngay Hồ Núi Cốc, cách TP ~15 km | Gia đình nghỉ dưỡng ven hồ | Chưa kiểm chứng / chưa đối tác / chưa thu phí | dulich9.com |

## 2B. Trời mưa thì đi đâu (bổ sung 08/11/2026)

Các điểm dưới đây đều đã có trong mục 1, chỉ chọn những điểm có mái che/không gian trong nhà, đi mưa được:

- Bảo tàng Văn hóa các dân tộc Việt Nam
- Khu di tích lịch sử ATK Định Hóa
- Chùa Hang (chùa Kim Sơn)
- Đền Đuổm

Dặn: Mưa thì vào Bảo tàng Văn hóa các dân tộc và ATK Định Hóa — tránh Hang Phượng Hoàng, Suối Cửa Tử vì nước suối dâng.

## 2C. Cho cặp đôi (bổ sung 08/11/2026)

Trong file, không có chỗ ở nào ghi hợp với cặp đôi — cặp đôi có thể ở các chỗ còn lại tùy ngân sách.

Điểm hợp cặp đôi (từ mục 1):

- Khu du lịch Hồ Núi Cốc
- Đồi chè Tân Cương
- Hồ Ba Bể
- Thác Khuôn Tát (thác Bảy Tầng)

## 2D. Mùa + tháng đẹp nhất (bổ sung 08/11/2026)

- Tháng đẹp nhất: Tháng 3–5 và tháng 9–11 (mát, đồi chè xanh); Hồ Núi Cốc đẹp nhất mùa xuân và mùa thu; tránh tháng 11–2 lạnh, nhiều trò chơi đóng cửa
- Nguồn: meta.best_season trong file (nghiên cứu ngày 06/11/2026; nguồn tổng xem meta.nguon_tong)
- Ngày kiểm: 06/11/2026

## 3. Ăn gì — 9 món

| Món | Buổi ăn | Khoảng giá | Quán tham khảo (địa chỉ) | Nguồn |
|---|---|---|---|---|
| Bánh chưng Bờ Đậu | Ăn sáng / mua làm quà | 20.000–30.000đ/cái (có nguồn ghi ~55.000–60.000đ/kg) | Nhà hàng 777 Bằng Cúc — Số 3, Cổ Lũng, huyện Phú Lương, Thái Nguyên; 20.000–30.000đ/cái; Chợ trung tâm TP Thái Nguyên — Chợ trung tâm, TP Thái Nguyên; 20.000–30.000đ/cái | topz.com.vn, tripi.vn, vietthangtravel.com |
| Cơm lam Định Hóa | Ăn trưa / ăn tối | 100.000–150.000đ/phần | Quán ăn thị trấn Chợ Chu — Thị trấn Chợ Chu, huyện Định Hóa, Thái Nguyên; 100.000–150.000đ/phần; Nhà hàng Minh Vân — Phường Quang Vinh, TP Thái Nguyên; Chưa kiểm được giá riêng | topz.com.vn, mytour.vn, thoitiet247.edu.vn |
| Nem chua Đại Từ | Ăn vặt / mua làm quà | Chưa kiểm được giá riêng hiện hành | Chợ Đại Từ — Huyện Đại Từ, Thái Nguyên; Chưa kiểm được giá; Chợ trung tâm TP Thái Nguyên — Chợ trung tâm, TP Thái Nguyên; Chưa kiểm được giá | vietmy.net.vn |
| Trám đen (trám om / trám kho) | Ăn trưa / ăn tối (món theo mùa) | Chưa kiểm được giá riêng hiện hành | Quán ăn khu Định Hóa — Huyện Định Hóa, Thái Nguyên; Chưa kiểm được giá; Nhà hàng Minh Vân — Phường Quang Vinh, TP Thái Nguyên; Chưa kiểm được giá riêng | vietmy.net.vn |
| Bánh ngải | Ăn sáng / ăn vặt | Chưa kiểm được giá riêng hiện hành | Chợ trung tâm TP Thái Nguyên — Chợ trung tâm, TP Thái Nguyên; Chưa kiểm được giá; Chợ phiên Định Hóa — Huyện Định Hóa, Thái Nguyên; Chưa kiểm được giá | vietmy.net.vn |
| Bánh trứng kiến | Ăn sáng / ăn vặt (món theo mùa) | Chưa kiểm được giá riêng hiện hành | Chợ xã Bình Long — Xã Bình Long, huyện Võ Nhai, Thái Nguyên; Chưa kiểm được giá; Chợ phiên Định Hóa — Huyện Định Hóa, Thái Nguyên; Chưa kiểm được giá | tripi.vn, vietmy.net.vn |
| Bún ốc Gang Thép | Ăn sáng / ăn trưa | Chưa kiểm được giá tô riêng | Bún ốc Gang Thép — 189 Gang Thép, phường Trung Thành, TP Thái Nguyên; Chưa kiểm được giá riêng | thoitiet247.edu.vn |
| Mỳ Hùng Sơn | Ăn sáng / ăn trưa | Chưa kiểm được giá riêng hiện hành | Quán mỳ khu vực TP Thái Nguyên — TP Thái Nguyên; Chưa kiểm được giá và địa chỉ cụ thể — xem mục chưa kiểm được; Chợ trung tâm TP Thái Nguyên — Chợ trung tâm, TP Thái Nguyên; Chưa kiểm được giá | topz.com.vn |
| Chè Tân Cương (thưởng trà) | Uống trà / mua làm quà | Giá theo loại chè, hỏi trước | Cơ sở chè xã Tân Cương — Xã Tân Cương, TP Thái Nguyên; Giá theo loại chè; Chợ trung tâm TP Thái Nguyên — Chợ trung tâm, TP Thái Nguyên; Giá theo loại chè | cardina.vn |

## 4. Đi đến bằng gì

### 4.1. Từ TP.HCM

| Phương tiện | Thời gian | Khoảng giá | Ghi chú | Nguồn |
|---|---|---|---|---|
| Máy bay SGN–HAN + xe Hà Nội–Thái Nguyên | Bay ~2 giờ + xe 1,5–2 giờ | Bay một chiều đã gồm thuế phí ~1.000.000–2.500.000đ; xe HN–Thái Nguyên ~80.000–150.000đ | Không có bay thẳng tới Thái Nguyên; sân bay gần nhất Nội Bài (cách TP Thái Nguyên ~80 km) | travelcar.vn |
| Xe khách TP.HCM–Hà Nội rồi nối xe | SG–HN ~30–35 giờ + nối xe 1,5–2 giờ | SG–HN ~700.000–1.000.000đ + nối xe ~80.000–150.000đ | Chỉ hợp người dư thời gian; đa số nên bay | motogo.vn |

### 4.2. Từ Hà Nội

| Phương tiện | Thời gian | Khoảng giá | Ghi chú | Nguồn |
|---|---|---|---|---|
| Xe khách / limousine Hà Nội–Thái Nguyên | 1,5–2 giờ (~80 km) | ~80.000–150.000đ/vé (xe ghế ngồi); limousine ~150.000–250.000đ (chưa kiểm được hãng cụ thể tuyến này) | Bến Mỹ Đình/Giáp Bát – Bến xe Thái Nguyên; kiểm giờ xe trước ngày đi | travelcar.vn |
| Xe máy / ô tô riêng Hà Nội–Thái Nguyên | 1,5–2 giờ (cao tốc Hà Nội – Thái Nguyên) | Chưa kiểm được giá thuê theo tuyến | Đi cao tốc cần ô tô; xe máy đi QL3 | travelcar.vn |
| Tàu Hà Nội–Quán Triều (Thái Nguyên) | Chưa kiểm được thời gian chạy hiện hành | Chưa kiểm được giá vé hiện hành | Ga Quán Triều, TP Thái Nguyên; kiểm lịch tàu trước ngày đi | chưa kiểm được |

### 4.3. Từ sân bay/ga gần nhất vào trung tâm

| Phương tiện | Thời gian | Khoảng giá | Ghi chú | Nguồn |
|---|---|---|---|---|
| Sân bay Nội Bài – TP Thái Nguyên | ~80 km, 1,5–2 giờ | Taxi/xe ghép ~300.000–600.000đ/chuyến (chưa kiểm được mức cố định) | Sân bay gần nhất | travelcar.vn |
| Bến xe Thái Nguyên – trung tâm TP | ~2–3 km | Taxi ~30.000–60.000đ/chuyến (ước lượng, chưa kiểm được mức cố định) | Bến xe trung tâm TP | chưa kiểm được |

## 5. Đi lại trong tỉnh

| Phương tiện | Khoảng giá | Giấy tờ / điều kiện | Ghi chú | Nguồn |
|---|---|---|---|---|
| Thuê xe máy — xe số | ~80.000–120.000đ/ngày | CCCD + bằng lái A1 | Minh Việt (168 đường Z115, Tân Thịnh): xe số 80.000–120.000đ; Khương Chuyên (106 Lương Thế Vinh): xe số 100.000đ | motortrip.vn, didaudalat.com |
| Thuê xe máy — tay ga | ~120.000–170.000đ/ngày | CCCD + bằng lái A1 | Minh Việt: xe ga 120.000–160.000đ; Vision/Lead ~120.000đ; Air Blade 120.000–160.000đ | motortrip.vn, didaudalat.com |
| Taxi nội thành Thái Nguyên | ~10.000–13.000đ/km (ước lượng theo mặt bằng chung, chưa kiểm được bảng giá hãng tại TP) |  | Đi Hồ Núi Cốc ~15 km; hỏi giá trọn gói trước | chưa kiểm được |
| Xe khách liên huyện (TP – Đại Từ / Định Hóa / Võ Nhai) | Chưa kiểm được giá từng tuyến |  | Đi ATK Định Hóa (~60 km), Hang Phượng Hoàng (~40 km) nên thuê ô tô theo ngày hoặc đi xe khách buổi sáng | chưa kiểm được |
| Thuê xe Hà Nội – Hồ Núi Cốc (có tài xế) | 1 ngày | 1.800.000–5.500.000đ/ngày tùy số chỗ (4–45 chỗ, đã gồm tài xế, xăng, cầu đường, chưa VAT) | Hợp nhóm đi từ Hà Nội thẳng Hồ Núi Cốc trong ngày | travelcar.vn |

## 6. Lịch trình mẫu 3N2Đ

| Ngày | Buổi | Hoạt động | Điểm / quán gắn kèm |
|---|---|---|---|
| Ngày 1 | Sáng | Bảo tàng Văn hóa các dân tộc Việt Nam + Chùa Hang | bao-tang-van-hoa-cac-dan-toc, chua-hang |
| Ngày 1 | Chiều | Đồi chè Tân Cương (thưởng trà, chụp ảnh) | doi-che-tan-cuong |
| Ngày 1 | Tối | Ăn bún ốc Gang Thép / bánh chưng Bờ Đậu ở TP Thái Nguyên |  |
| Ngày 2 | Sáng–chiều | Hồ Núi Cốc cả ngày (chùa Thác Vàng, động, công viên nước, nhạc nước tối) | ho-nui-coc |
| Ngày 2 | Tối | Nghỉ khu Hồ Núi Cốc hoặc về TP, ăn cơm lam Định Hóa |  |
| Ngày 3 | Sáng | ATK Định Hóa (lán Tỉn Keo) + Thác Khuôn Tát | atk-dinh-hoa, thac-khuon-tat |
| Ngày 3 | Chiều | Hang Phượng Hoàng – Suối Mỏ Gà (nếu còn sức; xa nên cân nhắc), về | hang-phuong-hoang |

## 7. Bảng chi phí ước tính (1 người, 3N2Đ từ TP.HCM)

| Hạng mục | Ước tính 3N2Đ / người |
|---|---|
| Máy bay SGN–HAN khứ hồi | 2.000.000–5.000.000đ |
| Xe Hà Nội–Thái Nguyên khứ hồi | 160.000–300.000đ |
| Ở 2 đêm (chia đôi phòng trung tâm) | 450.000–1.200.000đ |
| Ăn 3 ngày | 450.000–900.000đ |
| Vé tham quan (Hồ Núi Cốc 130.000đ + thuyền) | 150.000–400.000đ |
| Thuê xe máy 2–3 ngày + xăng | 200.000–500.000đ |
| Taxi / phát sinh | 150.000–400.000đ |
| Tổng ước tính | 3.560.000–8.700.000đ/người |
| Nếu đi từ Hà Nội (không bay SG–HN) | Trừ ~2.000.000–5.000.000đ tiền bay, tổng còn ~1.560.000–3.700.000đ/người |

Quy tắc hiển thị giá trong app: luôn ghi khoảng giá + ngày kiểm (06/11/2026), không ghi một giá cố định.

## 8. Checklist mang theo

- CCCD + bằng lái A1 (nếu thuê xe máy)
- Giày leo / giày bệt (hang Phượng Hoàng, ATK, đồi chè)
- Áo khoác (sáng sớm đồi chè lạnh; tránh đi Hồ Núi Cốc tháng 11–2)
- Đồ bơi + khăn (công viên nước Hồ Núi Cốc)
- Áo mưa mỏng, kem chống nắng
- Tiền mặt lẻ (chợ, quán ven đường, ATK Định Hóa)
- Đèn pin nhỏ (nếu vào hang)
- Sạc dự phòng, thuốc cơ bản

## Nhận xét của M và đánh giá người dùng (thêm 06/11/2026)

Nhận xét dưới đây là chính kiến của M sau khi đọc review trên Google Maps / TripAdvisor / các blog du lịch uy tín đã dẫn nguồn — không copy nguyên văn review, không bịa số sao; chỗ nào các nguồn mâu thuẫn nhau thì ghi rõ mâu thuẫn. Đánh giá người dùng trong app hiện chưa có — bạn là người đầu tiên.

### Địa danh
- **Khu du lịch Hồ Núi Cốc**: Hồ Núi Cốc rộng, có đảo và khu vui chơi — hợp gia đình đi chơi nửa ngày, thuyền dạo hồ khá thư giãn. Điểm trừ là vé trọn gói 130.000đ/người (trên 1,2 m) không rẻ và khu du lịch hơi cũ. Hợp gia đình có trẻ nhỏ; người thích thiên nhiên hoang sơ có thể thấy chưa đủ. (Nguồn tham khảo: Google Maps; nguồn trong file; ngày kiểm: 06/11/2026). Đánh giá người dùng: chưa có đánh giá — bạn là người đầu tiên.
- **Đồi chè Tân Cương**: Đồi chè Tân Cương xanh mướt, không khí trong lành — vừa ngắm chè vừa thưởng trà tại chỗ rất thư giãn. Điểm trừ là phí tour hái chè (nếu có) chưa kiểm được. Hợp mọi đối tượng, đi buổi sáng mát. (Nguồn tham khảo: Google Maps; nguồn trong file; ngày kiểm: 06/11/2026). Đánh giá người dùng: chưa có đánh giá — bạn là người đầu tiên.
- **Hang Phượng Hoàng – Suối Mỏ Gà**: Hang Phượng Hoàng rộng, thạch nhũ đẹp, kèm suối Mỏ Gà mát lạnh — hợp đi chơi nửa ngày. Điểm trừ là giá vé chưa thống nhất giữa các nguồn. Hợp gia đình và nhóm bạn; mang giày chắc vì đường hang trơn. (Nguồn tham khảo: Google Maps; nguồn trong file; ngày kiểm: 06/11/2026). Đánh giá người dùng: chưa có đánh giá — bạn là người đầu tiên.
- **Khu di tích lịch sử ATK Định Hóa**: Khu di tích ATK, nơi ở và làm việc của Bác Hồ thời kháng chiến — giá trị lịch sử lớn, rừng Định Hóa đẹp. Điểm trừ là giá vé chưa thống nhất và khu di tích rộng, cần xe di chuyển giữa các điểm. Hợp người yêu lịch sử; nên đi nửa ngày riêng. (Nguồn tham khảo: Google Maps; nguồn trong file; ngày kiểm: 06/11/2026). Đánh giá người dùng: chưa có đánh giá — bạn là người đầu tiên.
- **Thác Khuôn Tát (thác Bảy Tầng)**: Thác 7 tầng trong rừng Định Hóa, nước mát — hợp ghép với ATK Định Hóa trong cùng ngày. Điểm trừ là giá vé chưa kiểm được và đường rừng khó đi. Nên đi mùa mưa khi thác nhiều nước. (Nguồn tham khảo: Google Maps; nguồn trong file; ngày kiểm: 06/11/2026). Đánh giá người dùng: chưa có đánh giá — bạn là người đầu tiên.
- **Bảo tàng Văn hóa các dân tộc Việt Nam**: Bảo tàng văn hóa 54 dân tộc, hiện vật phong phú — điểm văn hóa nên đến nhất ở TP Thái Nguyên. Điểm trừ là giá vé hiện hành chưa kiểm được. Hợp mọi đối tượng, học sinh, gia đình; dành 1,5–2 giờ. (Nguồn tham khảo: Google Maps; nguồn trong file; ngày kiểm: 06/11/2026). Đánh giá người dùng: chưa có đánh giá — bạn là người đầu tiên.
- **Suối Cửa Tử**: Suối Cửa Tử hoang sơ, nước trong, nhiều tầng thác — điểm trekking – tắm suối được dân phượt khen. Điểm trừ là giá vé chưa kiểm được, đường vào khó và nguy hiểm khi mưa lũ. Chỉ hợp người khỏe và đi cùng người địa phương; tuyệt đối không đi khi mưa lớn. (Nguồn tham khảo: Google Maps; nguồn trong file; ngày kiểm: 06/11/2026). Đánh giá người dùng: chưa có đánh giá — bạn là người đầu tiên.
- **Hồ Ba Bể**: Hồ nước ngọt tự nhiên lớn, nước xanh, núi đá vôi bao quanh — đi thuyền ngắm hồ rất đẹp và yên bình. Cập nhật 06/11/2026: phí tham quan 60.000đ/người/lần theo Nghị quyết 32/2025/NQ-HĐND tỉnh Thái Nguyên (từ 01/01/2026), chưa gồm thuyền/kayak — giá thuyền theo tuyến, phải xác nhận tại bến. Hợp mọi đối tượng, nên đi thuyền tuyến dài qua động Puông – thác Đầu Đẳng. (Nguồn tham khảo: dulichviet.com.vn; nucuoimekong.com, antamtour.vn, viptrip.vn; ngày kiểm: 06/11/2026). Đánh giá người dùng: chưa có đánh giá — bạn là người đầu tiên.
- **Chùa Hang (chùa Kim Sơn)**: Chùa Hang (Kim Sơn) trong hang đá, không gian trang nghiêm và mát — điểm tâm linh gần TP Thái Nguyên. Điểm trừ là phí (nếu có) chưa kiểm được. Hợp ghé 1 giờ. (Nguồn tham khảo: Google Maps; nguồn trong file; ngày kiểm: 06/11/2026). Đánh giá người dùng: chưa có đánh giá — bạn là người đầu tiên.
- **Đền Đuổm**: Đền Đuổm thờ Dương Tự Minh, kiến trúc cổ, lễ hội đầu năm đông vui — điểm văn hóa của Phú Lương. Điểm trừ là giá vé chưa kiểm được. Hợp người yêu lịch sử, ghé 1 giờ. (Nguồn tham khảo: Google Maps; nguồn trong file; ngày kiểm: 06/11/2026). Đánh giá người dùng: chưa có đánh giá — bạn là người đầu tiên.
- **Động Hua Mạ**: Động Hua Mạ rộng và đẹp thật, thạch nhũ lớn, vé rẻ so với quy mô — đáng đi nhất trong cụm Ba Bể sau hồ. Điểm yếu là phải leo bậc đá khá vất vả và giá vé các nguồn ghi mâu thuẫn (25.000đ cũ vs 40.000đ theo nghị quyết 2026). Hợp đi tháng 9–11, tránh mùa mưa vì bậc trơn. (Nguồn tham khảo: dulichviet.com.vn; mia.vn; ngày kiểm: 06/11/2026). Đánh giá người dùng: chưa có đánh giá — bạn là người đầu tiên.
- **Thác Đầu Đẳng**: Thác Đầu Đẳng hùng vĩ và là điểm kết đẹp của tuyến thuyền Ba Bể — đi thuyền qua động Puông rồi tới thác là trải nghiệm đáng tiền. Điểm yếu là bắt buộc thuê thuyền (550.000–800.000đ/thuyền) nên đi lẻ 1–2 người sẽ đắt, nên ghép đoàn. Hợp đi theo tuyến thuyền hồ Ba Bể, không đi riêng. (Nguồn tham khảo: tripi.vn; nucuoimekong.com; ngày kiểm: 06/11/2026). Đánh giá người dùng: chưa có đánh giá — bạn là người đầu tiên.
- **Hồ Ghềnh Chè**: Hồ Ghềnh Chè yên tĩnh, gần TP nên hợp đi nửa ngày đổi gió sau khi tham quan đồi chè Tân Cương. Điểm yếu là thông tin ít, dịch vụ chưa rõ ràng, không nên kỳ vọng nhiều. Hợp người thích yên tĩnh, không hợp lịch trình dày. (Nguồn tham khảo: Google Maps; dulichviet.com.vn; ngày kiểm: 06/11/2026). Đánh giá người dùng: chưa có đánh giá — bạn là người đầu tiên.

### Món ăn
- **Bánh chưng Bờ Đậu**: Bánh chưng Bờ Đậu dẻo thơm, nhân đậu thịt đậm — món quà nổi tiếng nhất Thái Nguyên, mua về rất hợp. Điểm trừ là nhiều hàng nhái thương hiệu Bờ Đậu. Nên mua ở cửa hàng lớn, có thương hiệu rõ ràng. (Nguồn tham khảo: Google Maps; nguồn trong file; ngày kiểm: 06/11/2026). Đánh giá người dùng: chưa có đánh giá — bạn là người đầu tiên.
- **Cơm lam Định Hóa**: Cơm lam Định Hóa dẻo, thơm mùi tre nứa — món ăn kèm thịt nướng rất hợp. Điểm trừ là chất lượng tùy quán. Hợp ăn khi đi ATK Định Hóa. (Nguồn tham khảo: Google Maps; nguồn trong file; ngày kiểm: 06/11/2026). Đánh giá người dùng: chưa có đánh giá — bạn là người đầu tiên.
- **Nem chua Đại Từ**: Nem chua Đại Từ chua thanh, thơm lá ổi — món nhậu và quà vặt được khen. Điểm trừ là nem chua phải ăn đúng ngày, để lâu chua gắt. Hợp mua ăn trong ngày. (Nguồn tham khảo: Google Maps; nguồn trong file; ngày kiểm: 06/11/2026). Đánh giá người dùng: chưa có đánh giá — bạn là người đầu tiên.
- **Trám đen (trám om / trám kho)**: Trám đen bùi béo, om cá hoặc kho thịt đều ngon — món theo mùa của Thái Nguyên. Điểm trừ là chỉ có mùa trám (tháng 9–10). Hợp ăn đúng mùa. (Nguồn tham khảo: Google Maps; nguồn trong file; ngày kiểm: 06/11/2026). Đánh giá người dùng: chưa có đánh giá — bạn là người đầu tiên.
- **Bánh ngải**: Bánh ngải xanh, thơm mùi lá ngải, nhân vừng lạc — món truyền thống của người Tày. Điểm trừ là vị lá ngải đắng nhẹ, không phải ai cũng hợp. Hợp ăn vặt. (Nguồn tham khảo: Google Maps; nguồn trong file; ngày kiểm: 06/11/2026). Đánh giá người dùng: chưa có đánh giá — bạn là người đầu tiên.
- **Bánh trứng kiến**: Bánh trứng kiến lạ miệng, nhân trứng kiến non béo ngậy — món độc đáo nhất Thái Nguyên. Điểm trừ là chỉ có mùa trứng kiến (tháng 4–5) và giá cao. Chỉ hợp người muốn thử món lạ, đúng mùa. (Nguồn tham khảo: Google Maps; nguồn trong file; ngày kiểm: 06/11/2026). Đánh giá người dùng: chưa có đánh giá — bạn là người đầu tiên.
- **Bún ốc Gang Thép**: Bún ốc Gang Thép chua cay, ốc giòn — món ăn sáng nổi tiếng của TP Thái Nguyên. Điểm trừ là quán đông giờ cao điểm. Hợp ăn sáng. (Nguồn tham khảo: Google Maps; nguồn trong file; ngày kiểm: 06/11/2026). Đánh giá người dùng: chưa có đánh giá — bạn là người đầu tiên.
- **Mỳ Hùng Sơn**: Mỳ Hùng Sơn dai, nước dùng đậm — món ăn sáng quen thuộc của Thái Nguyên. Điểm trừ là ít quán ngon ngoài khu Hùng Sơn. Hợp ăn sáng. (Nguồn tham khảo: Google Maps; nguồn trong file; ngày kiểm: 06/11/2026). Đánh giá người dùng: chưa có đánh giá — bạn là người đầu tiên.
- **Chè Tân Cương (thưởng trà)**: Chè Tân Cương thơm, chát nhẹ hậu ngọt — thưởng trà tại đồi chè là trải nghiệm nên thử ở Thái Nguyên. Điểm trừ là chè ngon giá cao, nhiều hàng pha. Nên mua tại đồi chè hoặc cửa hàng có bảng giá niêm yết rõ ràng, uống thử trước khi mua. (Nguồn tham khảo: Google Maps; nguồn trong file; ngày kiểm: 08/11/2026). Đánh giá người dùng: chưa có đánh giá — bạn là người đầu tiên.

### Chỗ ở
Tất cả chỗ ở trong file đã được thêm mảng đánh giá người dùng (rỗng) trong JSON để app lưu đánh giá thật sau này. Đánh giá người dùng: chưa có đánh giá — bạn là người đầu tiên.

## 9. Mục chưa kiểm được / cần xác nhận lại (ghi rõ, không bịa)

1. Tọa độ GPS từng địa danh (tất cả để null — chưa tra được tọa độ chính xác, không bịa)
2. Giá vé Hang Phượng Hoàng – Suối Mỏ Gà, ATK Định Hóa, Thác Khuôn Tát, Suối Cửa Tử, Hồ Ba Bể, Bảo tàng Văn hóa các dân tộc, Chùa Hang, Đền Đuổm
3. Giờ mở cửa ATK Định Hóa, Hang Phượng Hoàng, Bảo tàng, Chùa Hang, Đền Đuổm
4. Giờ mở cửa Hồ Núi Cốc: các nguồn ghi khác nhau (7:00–19:30 / 7:30–17:30 / 8:00–18:00)
5. Giá vé Hồ Núi Cốc cho người cao tuổi: 80.000đ vs 91.000đ (nguồn khác nhau)
6. Khoảng giá Galaxy Hotel, Hải Âu Hotel (chưa kiểm được mức riêng)
7. Giá phòng Đông Á Plaza: từ 300.000đ vs ~45 USD (~1.100.000đ) — nguồn mâu thuẫn
8. Địa chỉ + giá riêng quán Mỳ Hùng Sơn (chỉ biết món, chưa tra được quán cụ thể)
9. Giá vé tàu Hà Nội–Quán Triều và thời gian chạy hiện hành
10. Bảng giá taxi tại TP Thái Nguyên và giá xe khách liên huyện từng tuyến
11. Tên xã/phường mới sau sáp nhập 2025 (Bắc Kạn vào Thái Nguyên) — các nguồn ghi không thống nhất

Cập nhật 06/11/2026: đã điền tọa độ cho mọi điểm từng null (không còn điểm null; 7 điểm tọa độ xấp xỉ trong tổng số 13 địa danh — xem ghi chú 'xấp xỉ, cần kiểm lại' trong bảng và trường toa_do_xap_xi trong JSON). Đã thêm 3 điểm du lịch gần, nhận xét của M cho 13 địa danh và 9 món ăn, mảng đánh giá người dùng (rỗng) cho mọi địa danh/chỗ ở/món ăn.

## 10. Cảnh báo chặt chém + lừa cọc (bổ sung 08/11/2026)

- **Mua chè Tân Cương: chè pha trộn, gắn mác chè búp cao cấp, giá theo lạng không niêm yết** Cách tránh: Mua ở cửa hàng/HTX có bảng giá, thương hiệu rõ ràng; hỏi giá/lạng trước khi cân; nếm thử trước khi mua số lượng lớn (Nguồn: kinh nghiệm chung du lịch Thái Nguyên; chưa tra được bài báo chính thống riêng về chè giả (ngày kiểm 08/11/2026))
- **Hồ Núi Cốc, Hồ Ba Bể: vé trọn gói, thuyền, trò chơi phụ thu nhiều mức; xe ôm, chụp ảnh thu phí không báo trước** Cách tránh: Hỏi rõ vé trọn gói gồm những gì và khoản thu thêm tại quầy vé; theo dữ liệu tỉnh, vé trọn gói Hồ Núi Cốc 130.000đ/người lớn, thuyền 30.000–50.000đ/người (Nguồn: dữ liệu tỉnh Thái Nguyên (ngày kiểm 06/11/2026) (ngày kiểm 08/11/2026))
- **Thuê xe máy đi ATK Định Hóa, Suối Cửa Tử: giữ giấy tờ gốc, xe yếu leo dốc; trả xe bị bắt đền vết xước** Cách tránh: Thuê xe số ở cửa hàng có đánh giá tốt; kiểm tra phanh/lốp/đèn, chụp ảnh vết xước trước khi nhận; hỏi rõ cọc và phạm vi đi (Nguồn: kinh nghiệm chung thuê xe vùng cao (ngày kiểm 08/11/2026))
- **Homestay quanh Hồ Ba Bể, Hồ Núi Cốc: đặt online khác ảnh thật, phụ thu mùa cao điểm** Cách tránh: Đọc đánh giá gần nhất, nhắn hỏi chủ nhà về giá mùa cao điểm và phí phát sinh trước khi đặt (Nguồn: kinh nghiệm chung du lịch Thái Nguyên; chưa tra được nguồn chính thống riêng (ngày kiểm 08/11/2026))


## 11. An toàn đường đèo + thuê xe máy (bổ sung 08/11/2026)

Thái Nguyên (gồm cả Bắc Kạn cũ sau sáp nhập 2025) không có đèo dài như Tây Bắc, nhưng đường quanh Hồ Ba Bể dốc, hẹp, nhiều cua gấp ven hồ; đường đi ATK Định Hóa, thác Khuôn Tát, Suối Cửa Tử: đồi dốc, đường đất đá trơn khi mưa, có đoạn chỉ đi bộ được — không cố đi xe máy vào đoạn suối đá trơn. Đường lên đồi chè Tân Cương, Hang Phượng Hoàng – Suối Mỏ Gà: dốc, cua gấp; đi xe số, kiểm tra phanh/lốp/đèn, tốc độ chậm, bấm còi ở cua khuất, tránh đi ban đêm và mùa mưa tháng 6–8. Mang CCCD/hộ chiếu và giấy tờ xe đầy đủ; đi Hồ Ba Bể nên đi ban ngày, đường từ TP Thái Nguyên lên Ba Bể xa (hơn 100 km), đổ đầy xăng trước khi vào tuyến.

**Đèo/đoạn cần chú ý:**
- Đường quanh Hồ Ba Bể: dốc, hẹp, nhiều cua gấp ven hồ
- Đường đi ATK Định Hóa, thác Khuôn Tát, Suối Cửa Tử: đồi dốc, đường đất đá trơn khi mưa
- Đường lên đồi chè Tân Cương, Hang Phượng Hoàng: dốc, cua gấp

(Nguồn: dữ liệu tỉnh Thái Nguyên — Hồ Ba Bể, ATK Định Hóa, Suối Cửa Tử, Đồi chè Tân Cương (ngày kiểm 06/11/2026); ghi chú địa giới: Bắc Kạn sáp nhập vào Thái Nguyên từ 2025 (ngày kiểm 08/11/2026))


## 12. Số khẩn cấp + xử lý sự cố (bổ sung 08/11/2026)

- Công an: 113 — Cấp cứu: 115 — Cứu hỏa: 114
- Số riêng của tỉnh: chưa tra được nguồn chính thức — khi cần gọi 113/115/114.

(Nguồn: số chung cả nước 113/115/114 là số khẩn cấp quốc gia; số riêng theo nguồn ghi trong từng mục (ngày kiểm 08/11/2026))


## 13. Giờ đẹp chụp ảnh (bổ sung 08/11/2026)

| # | Điểm | Giờ đẹp | Nguồn |
|---|---|---|---|
| 1 | Hồ Ba Bể | 5:30-7:00 bình minh, sương trên mặt hồ; 16:30-17:30 hoàng hôn | dữ liệu tỉnh Thái Nguyên (ngày kiểm 06/11/2026) (ngày kiểm 08/11/2026) |
| 2 | Đồi chè Tân Cương | 6:00-8:00 sáng sớm sương nhẹ trên đồi chè; 16:00-17:30 nắng chiều | dữ liệu tỉnh Thái Nguyên (ngày kiểm 06/11/2026) (ngày kiểm 08/11/2026) |
| 3 | Khu du lịch Hồ Núi Cốc | 7:00-9:00 sáng sớm; 17:30-19:00 nhạc nước buổi tối (theo dữ liệu tỉnh ~18:00–20:00) | dữ liệu tỉnh Thái Nguyên (ngày kiểm 06/11/2026) (ngày kiểm 08/11/2026) |


## 14. Cho người chạy giải (bổ sung 08/11/2026)

**Giải chạy (đã kiểm nguồn):**
- Giải chạy Những dấu chân trên miền hồ biếc (Hồ Ba Bể) — tháng 5 (2026: 17/5; cự ly 5/10/21 km, đường vòng quanh Hồ Ba Bể) (Nguồn: hoinhabao.thainguyen.gov.vn — Điều lệ giải chạy (Sở Văn hóa, Thể thao và Du lịch tỉnh Thái Nguyên) (ngày kiểm 08/11/2026))
- Thái Nguyên Trail – Xứ trà sơn cước (sườn Đông Tam Đảo) — tháng 11 (2026: 7/11, cự ly 5/15/25 km, xã La Bằng) (Nguồn: vtv.vn — Làm mới cách quảng bá xứ trà qua Thái Nguyên Trail 2026 (ngày kiểm 08/11/2026))
- Giải chạy Sắc thu Hồ Ba Bể (Thái Nguyên mở rộng) — tháng 11 (2025: 2/11; cự ly 5/10/29 km, đường vòng quanh Hồ Ba Bể) (Nguồn: hoinhabao.thainguyen.gov.vn — Điều lệ Giải chạy Sắc thu Hồ Ba Bể 2025 (ngày kiểm 08/11/2026))

**Điểm chạy bộ đẹp:** Đường ven Hồ Núi Cốc buổi sáng sớm; Đường quanh Hồ Ba Bể; Đường ven đồi chè Tân Cương.

**Chỗ ở gần điểm xuất phát** (lấy từ mục chỗ ở đã có): Đông Á Plaza; Khách sạn Đông Á 1; Phúc Xuân Resort (Hồ Núi Cốc).

(Nguồn: hoinhabao.thainguyen.gov.vn; vtv.vn (ngày kiểm 08/11/2026); chỗ ở lấy từ dữ liệu tỉnh Thái Nguyên (ngày kiểm 06/11/2026))
