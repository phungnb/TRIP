# Tổng hợp dữ liệu 34 tỉnh — Cẩm nang du lịch (bản duyệt 1 lần)

- Ngày tổng hợp: 06/11/2026, cập nhật sau đợt áp 6 quyết định ngày 06/11/2026 (07:05). Ngày kiểm dữ liệu: 06/11/2026 (trừ Đà Lạt: 05–06/11/2026). Cập nhật 08/11/2026 (nhóm B): sửa dữ liệu theo rà soát 3 vai — xem mục 9 mới. Cập nhật 08/11/2026 (vai chị Hoa): bổ sung SĐT chỗ ở + trời mưa + cặp đôi + mùa/tháng + dặn an toàn — xem mục 10 mới. Cập nhật 08/11/2026 (vai 3 đợt 2): sửa dữ liệu nhóm B đợt 3 — xem mục 12 mới. Cập nhật 16/11/2026 (vai 3 đợt 3): sửa dữ liệu nhóm B đợt 4 — xem mục 13 mới.
- Trạng thái: **ĐÃ ĐẨY HẾT LÊN — 34/34 tỉnh `status="published"` trong JSON (06/11/2026, anh lệnh "đẩy hết lên", bỏ vòng duyệt chuyên gia).** Trước đó: Đà Lạt `published`, 33 tỉnh còn lại `draft`.
- Quy tắc chung đã áp dụng: mọi giá đều là khoảng giá + nguồn + ngày kiểm; chưa kiểm được thì ghi rõ "chưa kiểm được", không bịa; tất cả chỗ ở đều ghi "chưa kiểm chứng / chưa đối tác / chưa thu phí", không dùng chữ uy tín/đảm bảo, không nhận đặt phòng.
- Thư mục dữ liệu: `~/workspace/your_files/du-lieu-34-tinh/` — 34 file `.md` + 34 file `.json`, không còn file script hay file rác trong thư mục (script làm việc của các nhóm đã chuyển sang `~/workspace/du-lieu-34-tinh-gen/`).
- KHÔNG đụng artifact trong đợt này. Dữ liệu này chưa nhập vào app `cam-nang-du-lich-app`.

## 1. Tổng số liệu (đã kiểm bằng script, không tin lời báo cáo suông)

| Hạng mục | Tổng 34 tỉnh |
|---|---|
| Tỉnh/thành có file | 34/34 (33 tỉnh mới + Đà Lạt) |
| Địa danh | 464 (362 + 102 điểm mở rộng) |
| Chỗ ở | 249 (251 − 2: gộp Nhà tổ chim = Birdhouse Bungalow + Him Lam = Him Lam Resort — xem mục 13) |
| Món ăn | 308 |
| Mục chưa kiểm được (cộng dồn mục 9 các file .md, đếm lại bằng script 08/11/2026) | 417 |
| Tọa độ địa danh null | 8/464 (còn xấp xỉ 189/464) |
| File JSON parse được, đủ 10 key chuẩn | 34/34 |

10 key chuẩn mỗi JSON: `meta, dia_danh, cho_o, an_uong, di_den, di_lai, lich_trinh, bang_chi_phi_3N2D_1_nguoi_tu_SG, checklist, chua_kiem_duoc`.

## 2. Bảng 34 tỉnh

Cột "Tọa độ null" = số địa danh chưa có lat/lng (để null, không bịa). Cột "Xấp xỉ" = nhóm Miền Bắc 1 dùng tọa độ xấp xỉ khu vực cho điểm nhỏ/làng/đảo xa, đã ghi rõ cần kiểm lại bằng bản đồ.

| # | Tỉnh/thành (slug) | Vùng | Trung tâm | Địa danh | Chỗ ở | Món | Chưa kiểm được | Tọa độ null |
|---|---|---|---|---|---|---|---|---|
| 1 | Hà Nội (ha-noi) | Bắc | Hồ Hoàn Kiếm | 15 | 9 | 10 | 12 | 0 (xấp xỉ) |
| 2 | Hải Phòng (hai-phong) | Bắc | TP Hải Phòng | 15 | 9 | 10 | 10 | 2 (xấp xỉ) |
| 3 | Quảng Ninh (quang-ninh) | Bắc | Hạ Long | 15 | 9 | 10 | 11 | 2 (xấp xỉ) |
| 4 | Bắc Ninh (bac-ninh) | Bắc | TP Bắc Ninh | 15 | 7 | 8 | 8 | 2 (xấp xỉ) |
| 5 | Hưng Yên (hung-yen) | Bắc | TP Hưng Yên | 15 | 7 | 8 | 8 | 2 (xấp xỉ) |
| 6 | Ninh Bình (ninh-binh) | Bắc | TP Ninh Bình | 15 | 7 | 8 | 10 | 0 (xấp xỉ) |
| 7 | Lai Châu (lai-chau) | Bắc | TP Lai Châu | 13 | 7 | 8 | 11 | 0 (xấp xỉ) |
| 8 | Điện Biên (dien-bien) | Bắc | Điện Biên Phủ | 13 | 6 | 8 | 10 | 0 (xấp xỉ) |
| 9 | Sơn La (son-la) | Bắc | Mộc Châu | 13 | 7 | 9 | 11 | 0 (xấp xỉ) |
| 10 | Lào Cai (lao-cai) | Bắc | Sa Pa | 14 | 8 | 9 | 11 | 0 (xấp xỉ) |
| 11 | Cao Bằng (cao-bang) | Bắc | TP Cao Bằng | 13 | 8 | 10 | 8 | 0 (xấp xỉ) |
| 12 | Lạng Sơn (lang-son) | Bắc | TP Lạng Sơn | 13 | 6 | 9 | 11 | 0 (xấp xỉ) |
| 13 | Phú Thọ (phu-tho) | Bắc | Việt Trì | 13 | 6 | 9 | 12 | 0 (xấp xỉ) |
| 14 | Thái Nguyên (thai-nguyen) | Bắc | TP Thái Nguyên | 13 | 7 | 9 | 11 | 0 (xấp xỉ) |
| 15 | Tuyên Quang (tuyen-quang) | Bắc | TP Tuyên Quang | 13 | 7 | 9 | 10 | 0 (xấp xỉ) |
| 16 | Thanh Hóa (thanh-hoa) | Trung | TP Thanh Hóa / Sầm Sơn | 13 | 6 | 9 | 12 | 0 (xấp xỉ) |
| 17 | Nghệ An (nghe-an) | Trung | Vinh / Cửa Lò | 13 | 7 | 9 | 12 | 0 (xấp xỉ) |
| 18 | Hà Tĩnh (ha-tinh) | Trung | TP Hà Tĩnh | 13 | 7 | 9 | 12 | 0 (xấp xỉ) |
| 19 | Quảng Trị (quang-tri) | Trung | Đồng Hới | 13 | 7 | 9 | 10 | 0 (xấp xỉ) |
| 20 | Huế (hue) | Trung | TP Huế | 14 | 7 | 9 | 10 | 0 (xấp xỉ) |
| 21 | Đà Nẵng (da-nang) | Trung | TP Đà Nẵng | 14 | 7 | 9 | 11 | 0 (xấp xỉ) |
| 22 | Quảng Ngãi (quang-ngai) | Trung | TP Quảng Ngãi | 13 | 7 | 9 | 10 | 0 (xấp xỉ) |
| 23 | Gia Lai (gia-lai) | Trung | Pleiku | 13 | 6 | 9 | 10 | 0 (xấp xỉ) |
| 24 | Đắk Lắk (dak-lak) | Trung | Buôn Ma Thuột | 13 | 7 | 9 | 10 | 0 (xấp xỉ) |
| 25 | Khánh Hòa (khanh-hoa) | Trung | Nha Trang | 15 | 8 | 9 | 13 | 0 (xấp xỉ) |
| 26 | Lâm Đồng — Đà Lạt (lam-dong) | Trung | Đà Lạt | 16 | 10 | 10 | 25 | 0 (xấp xỉ) |
| 27 | Đồng Nai (dong-nai) | Nam | Biên Hòa | 13 | 7 | 9 | 12 | 0 (xấp xỉ) |
| 28 | Tây Ninh (tay-ninh) | Nam | TP Tây Ninh | 13 | 6 | 9 | 10 | 0 (xấp xỉ) |
| 29 | TP.HCM (tp-ho-chi-minh) | Nam | Quận 1 / Bến Thành | 15 | 8 | 10 | 10 | 0 (xấp xỉ) |
| 30 | Vĩnh Long (vinh-long) | Nam | TP Vĩnh Long | 13 | 7 | 9 | 20 | 0 (xấp xỉ) |
| 31 | Đồng Tháp (dong-thap) | Nam | Sa Đéc | 13 | 8 | 9 | 19 | 0 (xấp xỉ) |
| 32 | An Giang (an-giang) | Nam | Châu Đốc | 13 | 8 | 9 | 19 | 0 |
| 33 | Cà Mau (ca-mau) | Nam | TP Cà Mau | 13 | 8 | 9 | 21 | 0 (xấp xỉ) |
| 34 | Cần Thơ (can-tho) | Nam | TP Cần Thơ | 13 | 8 | 10 | 17 | 0 (xấp xỉ) |

## 3. Tỉnh mỏng nhất (cần vòng kiểm chứng 2 trước khi lên app)

1. **Cao Bằng** — 7/10 tọa độ null; 6/7 chỗ ở chỉ có mức "từ" hoặc chưa kiểm được khoảng giá; giá vịt quay 7 vị / bánh áp chao / lạp xưởng / bánh khảo / xôi trám / hạt dẻ đều chưa kiểm được mức riêng; giá taxi/thuê ô tô chưa kiểm được.
2. **Quảng Trị** — hạ tầng du lịch yếu nhất: nhiều chỗ ở/quán chỉ có tên khu vực, chưa tra được tên + số nhà; không có sân bay; giá tàu/xe HN–Đông Hà, giá tàu + thủ tục đảo Cồn Cỏ chưa kiểm được.
3. **Tuyên Quang** — chỉ 6 chỗ ở; ăn uống mỏng nhất (hầu hết món chỉ tra được tên quán, chưa kiểm được giá phần riêng); giá vé Na Hang / Thác Mơ / Thác Bản Ba mâu thuẫn hoặc chỉ 1 nguồn 2025.
4. **Đồng Nai** — gần như toàn bộ giá đi đến/đi lại chưa kiểm được mức riêng (xe khách SG–Biên Hòa, SG–Cát Tiên, vé bay HAN–SGN, tàu HN–ga Biên Hòa, taxi sân bay Tân Sơn Nhất–Biên Hòa, thuê xe máy/taxi).
5. **Hưng Yên** — chỉ cụm Phố Hiến có dữ liệu chắc; điểm ngoài trung tâm ít nguồn; giá phòng và giá món chỉ là khoảng tham khảo. (Lỗi lịch trình đã sửa ở mục 5.)
6. **An Giang** — chỉ 6 chỗ ở, 3 chỗ thiếu địa chỉ đầy đủ hoặc thiếu giá; nhiều giá mâu thuẫn lớn (bún cá, lẩu mắm, bò bảy món, vé Trà Sư, cáp treo Núi Cấm).
7. **Cà Mau** — 21 mục chưa kiểm được (nhiều nhất): giá cua Năm Căn chênh lớn (150.000–250.000đ/kg vs 350.000–600.000đ/kg); sân bay Cà Mau mở lại 29/11/2026 (cập nhật 08/11/2026); thông tin Khai Long/Hòn Khoai rất mỏng.
8. **Vĩnh Long / Đồng Tháp** — 19 và 18 mục chưa kiểm được (giá phà, taxi, vé KDL, giá món riêng, mùa sen mâu thuẫn).

Các tỉnh còn lại đều ở mức tối thiểu khả thi (10–12 địa danh, 6–9 chỗ ở, 8–10 món) nhưng đều có 8–12 mục chưa kiểm được riêng, xem mục 9 từng file.

## 4. Mục chưa kiểm được nặng nhất toàn đợt (cần chuyên gia quyết)

**Giá vé mâu thuẫn lớn (đã ghi khoảng + ghi rõ mâu thuẫn, không chốt số giả):**
- Tràng An 250.000đ vs 300.000đ (từ 01/01/2026); Tam Cốc 250.000đ trọn gói vs 150.000đ + 150.000đ thuyền; Hang Múa 100.000đ vs 150.000đ (Ninh Bình).
- Cầu kính Rồng Mây 200.000đ / 400.000–450.000đ / 500.000đ, và 1 nguồn ghi **tạm đóng từ 01/10/2026** (Lai Châu) — bắt buộc kiểm lại trước ngày đi.
- Bà Nà Hills 950.000đ vs 1.000.000đ (Đà Nẵng); Đại Nội Huế 150.000đ vs 200.000đ; vé tàu Sa Kỳ–Lý Sơn 105.000đ vs 145.000–250.000đ (Quảng Ngãi).
- Thác Dải Yếm 20.000đ / 80.000đ / 150.000đ (Sơn La); bản Cát Cát 90.000–100.000đ vs 150.000đ (Lào Cai).
- Mỹ Khánh 6 mức giá (70.000–149.000đ) (Cần Thơ); VinWonders Cửa Hội 80.000đ vs 140.000đ (Nghệ An).
- Cáp treo núi Bà Đen: Vân Sơn 400.000đ vs 450.000đ, vào cổng 10.000đ vs 16.000đ (Tây Ninh).
- Bảo tàng Thế giới Cà phê 70.000đ vs 150.000đ (Đắk Lắk); giá vé xe jeep Langbiang, Làng Cù Lần, cáp treo Đồi Robin (Đà Lạt, đã biết từ trước).

**Thông tin có thể sai / cần đối chiếu nguồn chính thức trước khi duyệt:**
- Tin "Quảng Ninh thành TP trực thuộc TW từ 01/9/2026" (nguồn yeuhalong.com) — chưa đối chiếu nguồn chính thức, file vẫn ghi là tỉnh.
- Sân bay Cà Mau mở lại 29/11/2026 (VNA SGN–CAU hàng ngày A321, vé 924.000–964.000đ; cập nhật 08/11/2026); sân bay Liên Khương đã mở lại từ 19/08/2026 (Đà Lạt, đã xác nhận).
- Điện Biên: Vietnam Airlines SGN–DIN từ 24/12/2025 — cần kiểm lại khi tới ngày.

**Tọa độ — món nợ lớn nhất:** 214/362 địa danh null (59%); 16/34 file null toàn bộ; nhóm Miền Bắc 1 dùng tọa độ xấp xỉ khu vực cho điểm nhỏ/làng/đảo xa (đã ghi rõ cần kiểm lại bằng bản đồ). Bản đồ app chưa ghim được điểm nào ngoài Đà Lạt (+ 6 tỉnh miền Bắc 1 ở mức xấp xỉ). Cần 1 đợt tra tọa độ riêng bằng bản đồ trước khi nhập app.

## 5. Lỗi đã phát hiện và đã sửa trong lúc tổng hợp

1. **Hưng Yên — lịch trình dùng điểm ngoài file (ĐÃ SỬA 06/11/2026):** ngày 3 lịch 3N2Đ và ngày 4 lịch 4N3Đ nhắc chùa Keo / biển Cồn Vành (Thái Bình cũ) chưa có dữ liệu địa danh trong file. Đã thay bằng hoạt động trong file (dạo chợ Phố Hiến, mua nhãn lồng/chả gà làm quà; ngày tự do Phố Hiến) ở cả `.md` và `.json`, kiểm lại: mọi `gan` trong lịch trình Hưng Yên đều trỏ tới id địa danh có trong file.
2. **Dọn thư mục dữ liệu:** đã chuyển `gen.py`, `gen_6_tinh.py` và xóa `__pycache__` khỏi `du-lieu-34-tinh/` — thư mục nay chỉ có 68 file dữ liệu (34 MD + 34 JSON). Script làm việc giữ ở `~/workspace/du-lieu-34-tinh-gen/`.
3. **Sửa region sai (ĐÃ SỬA 06/11/2026, kiểm bằng script `du-lieu-34-tinh-gen/kiem-tra-region-2026-11-06.py`):** đối chiếu cả 34 file `.json` với phân vùng hành chính chuẩn sau sáp nhập 01/07/2025 (Bắc = ĐBSH + Đông Bắc + Tây Bắc; Trung = Bắc Trung Bộ + Duyên hải Nam Trung Bộ + Tây Nguyên; Nam = Đông Nam Bộ + ĐBSCL) — phát hiện 2 lỗi, đã sửa ở cả `.json` và `.md` tương ứng + bảng mục 2: (a) **Khánh Hòa** ghi `region="nam"`/vùng Nam → sửa thành **Miền Trung** (`"trung"`, Duyên hải Nam Trung Bộ, gồm cả Ninh Thuận cũ sáp nhập 07/2025); (b) **Lâm Đồng — Đà Lạt** thiếu hẳn trường `region` trong `lam-dong.json` (meta file gốc không có `id`/`province`/`region`) và bảng tổng hợp ghi vùng Nam → bổ sung `"region": "trung"` = **Miền Trung** (Tây Nguyên, gồm cả Bình Thuận + Đắk Nông cũ sáp nhập 07/2025). 32 tỉnh còn lại đã đúng, không đổi. Sau sửa: Miền Bắc 15 / Miền Trung 11 / Miền Nam 8. Lưu ý: dữ liệu này chưa nhập lại vào app `cam-nang-du-lich-app` trong đợt này — app cần nhập lại từ JSON đã sửa thì lọc miền mới đúng.

## 6. Vấn đề kỹ thuật / phạm vi cần anh và chuyên gia quyết 1 lần

1. **Phạm vi sau sáp nhập 2025 — 1 trung tâm/tỉnh hay mở rộng sang khu vực sáp nhập?** Hiện mỗi tỉnh chỉ làm 1 trung tâm, khu vực tỉnh cũ chưa làm: Bắc Ninh (Bắc Giang cũ), Hưng Yên (Thái Bình cũ), Ninh Bình (Hà Nam/Nam Định cũ), Hải Phòng (Hải Dương cũ), Thái Nguyên (Bắc Kạn cũ), Tuyên Quang (Hà Giang cũ), Gia Lai (Bình Định cũ), Đắk Lắk (Phú Yên cũ), Đà Nẵng (Hội An/Mỹ Sơn — đã ghi chú nhưng chưa làm riêng), Khánh Hòa (Ninh Thuận cũ), Đồng Nai (Bình Phước cũ), Tây Ninh (Long An cũ), TP.HCM (Bình Dương/Bà Rịa–Vũng Tàu cũ), Vĩnh Long/Đồng Tháp/An Giang/Cà Mau (Bến Tre/Trà Vinh, Tiền Giang, Kiên Giang, Bạc Liêu cũ). Nếu mở rộng, mỗi tỉnh cần thêm 1 đợt bổ sung riêng.
2. **Tọa độ:** có làm 1 đợt tra tọa độ riêng bằng bản đồ cho 214 điểm null (+ kiểm lại tọa độ xấp xỉ của nhóm Miền Bắc 1) trước khi nhập app không?
3. **`gan` trong lịch trình trỏ cả món ăn:** trường `gan` hiện trộn id địa danh (trỏ được) và slug món ăn (ví dụ `lau-ga-la-e`, `bun-ca-chau-doc`) — nhưng `an_uong` trong JSON không có trường `id`, nên slug món không trỏ được tới bản ghi nào. Đây là cách làm thừa hưởng từ mẫu Đà Lạt gốc. Quyết: (a) thêm `id` cho từng món trong `an_uong`, hay (b) bỏ slug món khỏi `gan`, chỉ giữ id địa danh?
4. **File Đà Lạt gốc — ĐÃ XONG (06/11/2026):** meta chưa có trường `status` (định dạng trước schema). Đã bổ sung `status="published"` cho Đà Lạt từ trước; ngày 06/11/2026 anh lệnh "đẩy hết lên" nên 33 tỉnh còn lại cũng đã chuyển `draft` → `published`, bỏ vòng duyệt chuyên gia.
5. **Tỉnh mỏng (mục 3):** có cho vòng kiểm chứng 2 riêng cho Cao Bằng, Quảng Trị, Tuyên Quang, Đồng Nai, Hưng Yên, An Giang, Cà Mau, Vĩnh Long/Đồng Tháp trước khi lên app không, hay duyệt chung 1 lần rồi bổ sung sau?

## 7. App sẵn sàng tích hợp chưa?

**Đã đẩy hết lên theo lệnh anh (06/11/2026), nhưng các nợ nội dung vẫn còn nguyên — không giấu.** Về mặt cấu trúc thì đủ: 34/34 JSON parse được, đủ 10 key, đúng schema, status `published` 34/34. Về mặt nội dung vẫn còn nợ: 189/464 tọa độ xấp xỉ, 8 tọa độ null, 8 tỉnh mỏng nhất cần vòng 2 (mục 3), phạm vi khu vực sáp nhập chưa quyết (mục 6.1), 417 mục chưa kiểm được (đếm lại bằng script 08/11/2026; số 400 trước đây đã cũ), và 2 câu hở Quảng Trị / Đầm Vân Hội đã giải quyết ngày 08/11/2026 (mục 8). Kiểm chứng tiếp theo dựa vào bình luận/đánh giá người dùng trong app (quyết định 5 của anh).

**Trình tự sau lệnh đẩy hết lên (06/11/2026):** vòng duyệt chuyên gia BỎ — 34/34 đã `published` trong dữ liệu nguồn. Còn lại: (1) nhập trạng thái mới vào app (M làm bước app sau, không đụng app trong đợt này); (2) đợt tra tọa độ + vòng 2 cho tỉnh mỏng; (3) kiểm chứng qua bình luận/đánh giá người dùng trong app.


## 8. Đợt áp 6 quyết định anh chốt 07:05 ngày 06/11/2026 — đã làm xong (kiểm bằng script)

- Tổng kiểm độc lập ngày 06/11/2026: 34/34 JSON parse được; địa danh 464; chỗ ở 257; món 308; tọa độ null 8; tọa độ xấp xỉ 189; nhận xét của M 464/464 địa danh + 308/308 món; trường danh_gia_nguoi_dung có mặt 1029/1029 mục; gan không trỏ được = 0; món có id = 0. Cập nhật 06/11/2026 (lệnh "đẩy hết lên"): 34/34 status = published (lam-dong published từ trước, 33 tỉnh còn lại draft → published).
- 8 tọa độ còn null (toàn điểm mới nhóm Miền Bắc 1): Đảo Cò Chi Lăng Nam, Làng gốm Chu Đậu, Tây Yên Tử, Làng gốm Thổ Hà, Cồn Vành, Đền Trần Thái Bình, Hang Sửng Sốt, Làng chài Cửa Vạn — cần kiểm bằng Google Maps tay trước khi ghim app.
- 8 tỉnh mỏng trước đây: Cao Bằng +3 điểm/+1 chỗ ở/+1 món, Tuyên Quang +3 điểm/+2 chỗ ở, Quảng Trị +3 điểm và bổ sung giá/địa chỉ một số chỗ ở, Đồng Nai +3 điểm và tra được giá xe SG–Biên Hòa/thuê xe máy, An Giang +3 điểm/+2 chỗ ở, Cà Mau +3 điểm/+1 chỗ ở, Vĩnh Long/Đồng Tháp +3 điểm mỗi tỉnh. Về số lượng không còn mỏng (địa danh 13–15/tỉnh); về "chưa kiểm được" vẫn nặng nhất: Cà Mau 21 mục, Vĩnh Long 20 mục.
- Cầu kính Rồng Mây: thông tin "tạm đóng từ 01/10/2026" đã kiểm lại — doanh nghiệp xin tạm dừng từ 01/10 nhưng ngày 26/9/2026 đã có văn bản hoạt động trở lại từ 01/10/2026; đã sửa trong file Lai Châu, vẫn giữ cảnh báo kiểm lại trước ngày đi.
- Câu hỏi còn hở — ĐÃ GIẢI QUYẾT 08/11/2026 (nhóm B): (a) Quảng Trị — mốc trung tâm đã đổi sang Đồng Hới (NQ 202/2025/QH15); các khoảng cách trong file vẫn tính từ Đông Hà (mốc cũ), đang tính lại từ Đồng Hới; file vẫn chỉ phủ Quảng Trị cũ, chưa bổ sung điểm Quảng Bình cũ. (b) Đầm Vân Hội — ĐÃ CHUYỂN sang file Lào Cai (xã Việt Hồng, Lào Cai; NQ 202/2025/QH15 + 1673/NQ-UBTVQH15); file Phú Thọ còn 13 địa danh, file Lào Cai 14 địa danh. (c) Pha Đin (~100 km), Thác Thí (~97 km) chỉ hợp lịch dài/cung nối — vẫn hở.
- Dữ liệu đã tích hợp vào app cam-nang-du-lich-app ở chế độ: Đà Lạt published hiện đầy đủ; 33 tỉnh còn lại draft — chỉ hiện trong danh sách Điểm đến với nhãn "Sắp có" / chưa mở chi tiết đầy đủ cho người dùng cuối cho tới khi duyệt. Cập nhật 06/11/2026 (lệnh "đẩy hết lên"): dữ liệu nguồn đã 34/34 published; app CHƯA cập nhật theo — M làm bước app sau, không đụng app trong đợt này.

## 9. Đợt sửa nhóm B ngày 08/11/2026 (rà soát 3 vai — anh duyệt "Sửa hết A + B luôn")

Mọi giá trị mới đều có nguồn công khai + ngày kiểm 08/11/2026 ghi trong từng mục (.json và .md). Script sửa: `~/workspace/fix-nhomB-08-11-2026.py` + `~/workspace/fix-nhomB-part2.py` (chạy 2 lượt do kẹt số dòng ở ca-mau.md).

1. **Đầm Vân Hội — chuyển tỉnh:** xóa khỏi Phú Thọ (13 địa danh), thêm vào Lào Cai (14 địa danh) — xã Việt Hồng, tỉnh Lào Cai; xã Vân Hội cũ + Việt Cường + Việt Hồng sáp nhập thành xã Việt Hồng từ 01/07/2025 (NQ 202/2025/QH15 + 1673/NQ-UBTVQH15; nguồn: helpcrm.misa.vn, baomoi.com). Mâu thuẫn 60 km vs 90 km trong file cũ đã bỏ — khoảng cách từ Sa Pa chưa kiểm được, ghi rõ không bịa (gần nút giao IC12 cao tốc Nội Bài – Lào Cai, từ IC12 ~2 km). Tổng địa danh toàn đợt vẫn 464.
2. **Quảng Trị — đổi mốc sang Đồng Hới:** `meta.anchor` JSON đổi TP Đông Hà → TP Đồng Hới (NQ 202/2025/QH15; vietnam.vn 27/10/2026), tọa độ trung tâm (17.47, 106.62) xấp xỉ theo TP Đồng Hới. Các khoảng cách 13 địa danh vẫn tính từ Đông Hà (mốc cũ) — ghi rõ đang tính lại từ Đồng Hới, KHÔNG tự cộng/trừ số km. File vẫn chỉ phủ Quảng Trị cũ, chưa có điểm Quảng Bình cũ.
3. **Sân bay Cà Mau:** mở lại 29/11/2026 — VNA SGN–CAU hàng ngày A321 (SGN 12:50 → CAU 13:55), vé 924.000–964.000đ/chiều (nguoiquansat.vn, lecourrier.vn/VietnamPlus, 04/11/2026); Vietjet dự kiến HAN–CAU 3 chuyến/tuần từ 29/11, vé khứ hồi ~2,4 triệu đồng. Câu "tạm đóng, không đặt vé bay" đã xóa (chỉ còn câu ghi chú lịch sử trong mục 4). Tần suất VNA theo kế hoạch công bố là 1 chuyến khứ hồi/ngày; thông tin cũ VASCO ATR-72 2 chuyến/ngày đã lỗi thời.
4. **Phú Thọ:** sửa mâu thuẫn nội bộ — câu "tọa độ để null trong JSON" là sai (tọa độ đã điền 06/11/2026, 9/13 điểm xấp xỉ, 0 null); đã sửa ở dòng đầu file và mục 9.
5. **Giá vé chốt được (nguồn + ngày kiểm 08/11/2026 trong từng mục):** U Minh Hạ 20.000đ (NQ 13/2025 HĐND Cà Mau; crystalbay.com, intour.vn); Hòn Đá Bạc 20.000–25.000đ (bỏ nguồn "miễn phí" không tên); Nhà Công tử Bạc Liêu ~30.000đ người lớn / 20.000đ trẻ em, giờ 08:00–17:30 (dulich.pro.vn; một số nguồn ghi 45.000đ — chưa thống nhất); Vĩnh Mốc 50.000đ người lớn, trẻ em 20.000–25.000đ (chưa thống nhất), địa chỉ nay là thôn Vịnh Mốc, xã Cửa Tùng (xã Vĩnh Thạch cũ); Khe Sanh 50.000đ; Hiền Lương 50.000đ (bán vé trở lại từ 01/03/2026; sovaba.travel, vietnamtravel.org 09/2026); Dinh Bảo Đại III 30.000–60.000đ, giờ 7:00–17:30; Trà Sư combo 200.000–260.000đ (mới nhất 07/2026 là 260.000đ — sundaygo.vn); Hoàng thành Thăng Long ghi rõ mâu thuẫn 70.000đ vs 100.000đ; Vinh Sang ngưỡng trẻ em sửa thành "dưới 1,3 m" (vinhsang.com).
6. **18 dòng "uy tín" chung chung** trong nhận xét món ăn (Thái Nguyên, Quảng Ninh ×2, Bắc Ninh, Hưng Yên ×2, Ninh Bình ×3 + .json tương ứng) đã viết lại có cơ sở cụ thể (nguồn gốc, bảng giá niêm yết, địa chỉ); `lai-chau.json` đã bỏ cụm "an toàn tạm thời được đảm bảo" (trích văn bản doanh nghiệp về cầu kính Rồng Mây).
7. **3 số sao — kiểm trực tiếp 08/11/2026, GIỮ LẠI cả 3 (đều đối chiếu được):** Vĩnh Mốc TripAdvisor 4,6/5 (380 đánh giá); Mỹ Sơn TripAdvisor 4,2/5 (3.715 review — số đếm thay đổi theo ngày, các lần tra khác 3.716–3.720); Mỹ Khánh Google Maps 4,0/5 (6.139 bài đánh giá; Wanderlog 6.131). Không bỏ số nào.
8. **Số mục chưa kiểm được:** .md mục 9 cộng dồn còn **417** (trước sửa đếm lại là 420; đã xóa 4 mục đã chốt ở Cà Mau/Quảng Trị, thêm 1 mục mới ở Lào Cai). JSON `chua_kiem_duoc` cộng dồn là **424** — chênh với .md là tồn tại từ trước (danh sách .md và JSON chưa đồng bộ hoàn toàn ở vài file), ngoài phạm vi đợt này.

**Chưa làm trong đợt này (để M làm bước app sau):** nhập dữ liệu đã sửa vào app `cam-nang-du-lich-app` (data34.js); bổ sung điểm Quảng Bình cũ cho Quảng Trị; đợt tra tọa độ xấp xỉ (189 điểm).

## 10. Đợt bổ sung vai chị Hoa ngày 08/11/2026 (anh duyệt "Làm cả A + B luôn") — SĐT chỗ ở + trời mưa + cặp đôi + mùa/tháng + dặn an toàn

Mọi số liệu mới đều có nguồn công khai + ngày kiểm 08/11/2026 ghi trong từng mục (trừ `mua_thang` ở 20 tỉnh của worker 3 — xem lưu ý cuối mục này). Chỉ sửa file `.json` + `.md` trong thư mục này; không đụng artifact/app. Kiểm độc lập bằng script sau khi sửa: 34/34 JSON parse được; **193/257 chỗ ở có SĐT thật, 64 null**; cả 34 file đều có đủ 3 key mới `khi_troi_mua`, `cho_cap_doi`, `mua_thang`; Lâm Đồng có thêm `dan_an_toan_xe_may` + `dan_an_toan_xe_may_chung`.

### 10.1 SĐT chỗ ở — 193/257 (75%)

Mỗi chỗ ở thêm `dien_thoai` + `nguon_dien_thoai` (số thật kèm nguồn, hoặc null + "chưa tra được (ngày kiểm 08/11/2026)"). Số đã đối chiếu tên + địa chỉ trên Google Maps/fanpage/website chính thức của chính cơ sở đó; số đại lý/tổng đài bên thứ ba (iVIVU 1900 1870, Mường Thanh 1900 1833, Vietgoing 0931 666 900...) đã loại, không ghi vào file.

| Tỉnh | Có SĐT | Chưa có |
|---|---|---|
| Lâm Đồng | 10/10 | — |
| Hà Nội | 6/9 | Queen Hotel Hanoi, Khách sạn Hương Giang, mục nhóm Hồ Tây |
| Khánh Hòa | 6/8 | 2 mục nhóm không có khách sạn cụ thể |
| TP.HCM | 7/8 | California Hotel Saigon |
| Đà Nẵng | 5/7 | 2 mục chung chung Mỹ Khê, An Thượng |
| Huế | 6/7 | Alba Spa Hotel |
| Cần Thơ | 5/8 | Wink, LION 17, ON Hotel |
| Quảng Ninh | 2/9 | 7 mục chung chung/danh mục |
| Ninh Bình | 2/7 | 5 mục chung chung |
| Lào Cai | 8/8 | — |
| Phú Thọ | 7/7 | — |
| Quảng Trị | 4/7 | Nam Đông Hà, Retro Khe Sanh, 1 mục chung chung |
| Cà Mau | 7/8 | Homestay Đất Mũi (7 số mâu thuẫn — đã liệt kê hết số ứng viên trong `nguon_dien_thoai` để tự xác minh) |
| An Giang | 8/8 | — |
| Bắc Ninh | 3/7 | 4 mục chung chung |
| Cao Bằng | 6/8 | Bang Giang EcoGreen, Homestay Phúc Sen |
| Đắk Lắk | 4/7 | 3 mục chung chung |
| Điện Biên | 6/7 | Khách sạn Thanh Nam |
| Đồng Nai | 5/7 | 2 mục chung chung |
| Đồng Tháp | 8/8 | — |
| Gia Lai | 4/7 | 3 mục chung chung |
| Hà Tĩnh | 6/7 | Thiên Cầm Xanh Hotel |
| Hải Phòng | 8/9 | 1 mục chung chung |
| Hưng Yên | 1/7 | 6 mục chung chung (không có tên cơ sở thật để tra) |
| Lai Châu | 8/8 | — |
| Lạng Sơn | 4/7 | 3 mục chung chung |
| Nghệ An | 7/7 | — |
| Quảng Ngãi | 3/7 | 4 mục chung chung |
| Sơn La | 7/8 | Mộc Sa Mộc Châu Hotel |
| Tây Ninh | 3/7 | Melia Vinpearl Resort & Villas chân núi Bà Đen, Sài Gòn Tây Ninh, HANZ Mai Vy, Hòa Bình |
| Thái Nguyên | 7/7 | — |
| Thanh Hóa | 5/6 | Homestay nhà sàn bản Đôn (chung chung) |
| Tuyên Quang | 8/8 | — |
| Vĩnh Long | 7/7 | — |

64 null gồm: ~39 mục chung chung không tên cơ sở thật (không có gì để tra — Hưng Yên 6, Quảng Ninh 7, Ninh Bình 5...); ~25 mục có tên nhưng không tìm thấy số khớp tên + địa chỉ. Chi tiết từng mục + số ứng viên mâu thuẫn: file làm việc `~/workspace/phone-patch-0811.md` (21 tỉnh) + báo cáo các worker (backup gốc 48 file tại `~/workspace/backup-du-lieu-0811/`).

### 10.2 Ba key mới (cả 34 tỉnh)

- `khi_troi_mua`: 3–5 điểm trú mưa tốt, chỉ lấy từ địa danh đã có trong file + 1 câu dặn. Ngoại lệ: Lào Cai chỉ 2 điểm chắc chắn, Sơn La chỉ 2 điểm — không bịa thêm.
- `cho_cap_doi`: `cho_o` lấy đúng từ `hop_voi` chứa "cặp đôi"; `diem` 4 điểm/tỉnh từ dữ liệu đã có. 8 tỉnh `cho_o` để trống vì không chỗ ở nào ghi "cặp đôi": Quảng Trị, Cà Mau, Bắc Ninh, Điện Biên, Hà Tĩnh, Hưng Yên, Nghệ An, Thái Nguyên — đã ghi rõ trong file, không bịa.
- `mua_thang`: tháng đẹp nhất của tỉnh. **Lưu ý trung thực:** chỉ Đà Lạt (tháng 11/2026: chuyển mùa mưa → mùa khô, ngày 20–25°C, đêm/sáng sớm 13–16°C, mặc nhiều lớp + áo mưa mỏng/ô gấp) và Đắk Lắk (mùa khô 11–4, đẹp nhất 12–3) được kiểm lại ngày 08/11/2026; 20 tỉnh còn lại của worker 3 lấy từ `meta.best_season` với ngày kiểm **06/11/2026** — không ghi khống là đã kiểm 08/11.

### 10.3 Dặn an toàn xe máy + đặt phòng (Lâm Đồng)

- `dan_an_toan_xe_may` (lam-dong.json): đường dốc, sương mù, mưa trơn; xe số leo dốc tốt hơn xe ga; đặt phòng trước 2–3 tuần (cuối tuần), 30–60 ngày (lễ Tết) — nguồn xemayanthanhphat.com, agotourist.com, hoadalattravel.vn, ngày kiểm 08/11/2026.
- `dan_an_toan_xe_may_chung`: khung chung miền núi/đèo, ghi rõ là khung chung không phải chi tiết riêng từng tỉnh — có trong cả 3 file Lâm Đồng, Hà Nội, Khánh Hòa.

### 10.4 Những gì KHÔNG tra được / phát hiện ngoài phạm vi (chưa sửa)

- **Số 1 nguồn duy nhất (chưa đối chiếu nguồn thứ hai):** Homestay Thị Trấn Cổ (Đà Lạt), Phi Mai Hotel (An Giang), Tit Mit (Cao Bằng), Khách sạn Biên Hòa (Đồng Nai) — đã ghi chú trong file.
- **Victory Hotel Tây Ninh đã đóng cửa từ 30/07/2026** (fanpage chính thức) — số trong file là số cũ trước khi đóng; file chưa cập nhật trạng thái đóng cửa.
- **Trùng lặp 2 mục = 1 cơ sở** (chưa gộp trong file): MT Grand Gia Lai = Hoàng Anh Gia Lai cũ; Vinpearl Lạng Sơn = Four Points by Sheraton; Royal Palace = Royal Tuyên Quang Hotel; Nhà tổ chim = Birdhouse Bungalow; MT Luxury/Holiday Mộc Châu; Thảo Nguyên Resort = Thảo Nguyên Hotel; SOJO Việt Trì = Tru by Hilton Việt Trì; Him Lam Điện Biên 2 mục có thể cùng 1 cơ sở.
- **Lệch địa chỉ trong file (chưa sửa — cần đợt riêng):** Continental Saigon, ÊMM Saigon đã đổi tên thành G8 Center Hotel Saigon từ 02/06/2026, Êmm Hotel Huế, Bonjour Hostel, Mường Thanh Luxury Phú Thọ, Hữu Nghị, Hải Châu, Nam Kiều (Quảng Trị/Cà Mau), MT Bắc Ninh, MT Grand Gia Lai, Khách sạn Pleiku, MT Lai Châu, Sài Gòn Kim Liên, Pù Luông Retreat, Phúc Xuân Resort, Pài Bjooc, Nhà tổ chim (địa chỉ file sai). Chi tiết trong báo cáo các worker + `~/workspace/phone-patch-0811.md`.
- **Chưa đối chiếu chắc chắn:** Nature Na Hang (số fanpage Du lịch Na Hang, chưa đối chiếu tên trực tiếp); Galaxy Thái Nguyên (file chỉ ghi "TP Thái Nguyên" nên gán Galaxy River — nếu thực ra là Galaxy Hotel Phổ Yên thì số đúng là 097 212 12 59, cần anh chốt).

**Chưa làm trong đợt này (để M làm bước app sau):** nhập dữ liệu đã bổ sung vào app `cam-nang-du-lich-app` (data34.js: SĐT, `khi_troi_mua`, `cho_cap_doi`, `mua_thang`, dặn an toàn); đợt sửa địa chỉ lệch + gộp mục trùng lặp; đợt tra tọa độ xấp xỉ (189 điểm).

## 11. Đợt bổ sung BƯỚC 2 ngày 08/11/2026 (anh duyệt "Làm tiếp theo thứ tự M đề xuất") — cảnh báo chặt chém + an toàn đèo + chia tiền nhóm + số khẩn cấp + giờ chụp ảnh + chạy giải

Mọi số liệu mới đều có nguồn công khai + ngày kiểm 08/11/2026 ghi trong từng mục (.json và .md). Chỉ sửa file `.json` + `.md` trong thư mục này; không đụng artifact/app. Patch làm việc tại `~/workspace/step2-patches/` (34 file, 1 file/tỉnh); script áp patch `~/workspace/apply_step2_0811.py`; backup gốc 68 file tại `~/workspace/backup-du-lieu-0811-step2/`. Kiểm độc lập bằng script sau khi sửa: 34/34 JSON parse được; cả 34 file đều có đủ 5 key mới `canh_bao_chat_chem`, `dan_an_toan_deo`, `so_khan_cap`, `gio_dep_chup_anh`, `cho_nguoi_chay_giai`; mọi `cho_o_gan` đều khớp đúng tên chỗ ở trong file nguồn (đã chuẩn hoá 18 tên ghi kèm địa chỉ + 6 tên rút gọn về đúng tên gốc).

### 11.1 Tổng đếm (kiểm bằng script)

| Mục mới | Tổng |
|---|---|
| Cảnh báo chặt chém + lừa cọc | 145 mục (4–5/tỉnh) |
| Tỉnh có đèo/dốc cần dặn | 21/34 tỉnh; 13 tỉnh đồng bằng/ven biển ghi rõ "không có đèo" |
| Số khẩn cấp riêng của tỉnh (có nguồn chính thức) | 20 số |
| Giờ đẹp chụp ảnh | 102 điểm (3/tỉnh) |
| Giải chạy tra được nguồn | 53 giải, đủ 34/34 tỉnh đều có ít nhất 1 giải |
| Hướng dẫn chia tiền nhóm | 1 đoạn mẫu chung — ghi trong `lam-dong.json` (key `huong_dan_chia_tien_nhom`) + mục cuối file `lam-dong.md` + mục 11.3 dưới đây |

### 11.2 Chi tiết theo mục

- **`canh_bao_chat_chem`** (145 mục): mỗi mục có tình huống + cách tránh + nguồn. Vụ thật lên báo: tàu Minh Hương (Quảng Ninh) hóa đơn gần 10 triệu, tính sai 3,2 kg thủy sâm (VietnamNet 06/04/2016); lừa cọc homestay Quảng Ninh chiếm đoạt ~100 triệu đã khởi tố (Nhân Dân 05/08/2023); Công an Lâm Đồng cảnh báo lừa cọc homestay/villa Đà Lạt; Huế có fanpage giả Vedana Lagoon + lừa cọc thuê trọ mùa nhập học 2026; vụ cá bò hòm 2,9 triệu/kg ở Nha Trang ghi đúng kết luận kiểm tra (chưa đủ căn cứ là cao bất hợp lý) và chuyển thành hướng dẫn chốt tổng tiền trước khi chế biến. Các tỉnh không có vụ riêng thì cảnh báo theo tình huống địa phương, ghi rõ là cảnh báo chung.
- **`dan_an_toan_deo`** (21 tỉnh có đèo): dặn riêng từng tỉnh — đèo Ô Quy Hồ, Khau Phạ (Lào Cai); Pha Đin (Sơn La/Điện Biên, 32 km/1.648 m); Khau Cốc Chà 14 tầng, Mã Phục (Cao Bằng); Mã Pí Lèng, Thẩm Mã, Bắc Sum (Tuyên Quang — Hà Giang cũ); Phượng Hoàng, Hà Lan (Đắk Lắk); An Khê (vụ xe khách rơi vực 10/5/2026: 1 chết, 11 bị thương — VOV), Mang Yang (Gia Lai); Hải Vân, Sơn Trà (Đà Nẵng); Hòn Giao, Lương Sơn (Khánh Hòa); Prenn (Lâm Đồng — kiểm lại: sạt lở Km225+250, công bố tình huống khẩn cấp tháng 9/2026, đến 03/11/2026 vẫn rào chắn 2 làn, nguồn SGGP qua baomoi.com); Ba Dội/Pù Luông (Thanh Hóa); Đá Đẽo (Nghệ An); Sa Mù (Quảng Trị); Đèo Ngang nứt 12/2025 (Hà Tĩnh); Mẫu Sơn, Sài Hồ (Lạng Sơn); Sìn Hồ, Than Uyên (Lai Châu); dốc Hang Múa (Ninh Bình). 13 tỉnh còn lại ghi rõ không có đèo. Giá thuê xe chỉ ghi khi có nguồn (Sa Pa 80.000–240.000đ/ngày; Hà Giang Loop xe số 180.000–300.000đ/ngày).
- **`so_khan_cap`**: số chung cả nước 113 (công an) / 115 (cấp cứu) / 114 (cứu hỏa) ở mọi tỉnh. Số riêng có nguồn chính thức: 20 số (vd Hoàn Mỹ Đà Lạt 0263 3510878; Bạch Mai 0969851616; BV Đà Nẵng 0236 3821118; Chợ Rẫy 028 38554137; BVĐK Khánh Hòa 0258 3822175; BVĐK tỉnh Thanh Hóa hotline 1900 1536; BVĐK số 1 Lào Cai cấp cứu 0216 6250 505). Tỉnh chưa tra được số chính thức thì `rieng: []` và ghi rõ trong file — không đoán số.
- **`gio_dep_chup_anh`** (102 điểm): 3 điểm/tỉnh + giờ đẹp có nguồn riêng khi tra được (chợ nổi Cái Răng 5:30–7:00; Hang Múa bình minh 6:00–8:00; vịnh Hạ Long bình minh trước 6h, hoàng hôn sau 17h30; núi Bà Đen săn mây 5:30–8:00; rừng tràm Trà Sư 7:00–9:00 và 15:30–17:00; đồi chè Cầu Đất săn mây 4:30–6:00). Điểm không tra được giờ riêng thì dùng khung giờ vàng chung (sáng sớm/hoàng hôn) và ghi rõ.
- **`cho_nguoi_chay_giai`** (53 giải, 34/34 tỉnh): chỉ giải tra được nguồn chính thức (vd Dalat Ultra Trail tháng 3; VMM Sa Pa tháng 9; VPBank Hanoi Marathon tháng 10; VnExpress Nha Trang tháng 8; Techcombank HCMC tháng 12; Marathon Quốc tế Đà Nẵng tháng 3; VnExpress Huế tháng 4; Tiền Phong Marathon lần 66 tháng 3 tại Đông Hà, Quảng Trị; Halong Bay Heritage Marathon tháng 11; Ba Den Mountain Marathon tháng 8; Tràng An Marathon tháng 11). Lưu ý khi dùng: giải Quy Nhơn nay thuộc Gia Lai sau sáp nhập nhưng thi đấu ở Quy Nhơn (cách Pleiku ~160 km) — ở Quy Nhơn, không ở Pleiku; giải Marathon Cà Mau mùa 2025 xuất phát tại Quảng trường Hùng Vương (khu vực Bạc Liêu cũ sau sáp nhập) — kiểm lại điểm xuất phát mùa mới trước khi chốt chỗ ở.

### 11.3 Hướng dẫn chia tiền nhóm / quỹ chung (mẫu chung, ghi trong lam-dong.json + lam-dong.md)

Lập quỹ chung trước chuyến: mỗi người đóng 1 khoản bằng nhau vào quỹ; 1 người giữ quỹ và ghi mọi khoản chi chung (ăn, xe, vé) vào sổ chung (sổ giấy hoặc ghi chú điện thoại ai cũng xem được); chốt sổ cuối ngày, ai ứng trước thì ghi rõ; tiền ăn/xe/vé chung chia đều; tiền riêng (mua sắm cá nhân, ăn riêng) tự trả, không lấy từ quỹ; cuối chuyến tổng kết, thừa chia lại, thiếu đóng thêm. Không dùng app hay thuật ngữ lạ — chỉ cần 1 người giữ quỹ + 1 sổ ghi chung.

### 11.4 Những gì KHÔNG tra được / chưa chắc (ghi rõ, không giấu)

- **Số bệnh viện chính thức:** chưa tra được cho Lạng Sơn, Lai Châu, Phú Thọ, Thái Nguyên, Tuyên Quang, Hà Tĩnh và 14 tỉnh nhóm 3 (chỉ có 2 tỉnh nhóm 3 có số: Quảng Ninh, Cần Thơ) — đã để `rieng: []`, khi cấp cứu gọi 115. Cao Bằng chỉ có số BV tư nhân Hà Nội–Cao Bằng, chưa có số BVĐK tỉnh (công). Điện Biên chỉ có tổng đài theo trang danh bạ, chưa đối chiếu web bệnh viện. BVĐK Lâm Đồng: trang lamdonghospital.com mở không được trong lần kiểm nên chưa ghi.
- **Vụ chặt chém riêng:** nhiều tỉnh chưa tra được vụ riêng trên báo chính thống (Mộc Châu, Điện Biên, Lai Châu, Hà Tĩnh, Phú Thọ mùa Giỗ Tổ, hầu hết tỉnh nhóm 3) — các mục đó ghi rõ là kinh nghiệm chung, không mạo danh nguồn báo.
- **Chi tiết đèo:** đèo Sài Hồ (Lạng Sơn), Đá Đẽo (Nghệ An), Ba Dội (Thanh Hóa), Hà Lan (Đắk Lắk), Bụt (Quảng Ninh), Sa Mù (Quảng Trị) — chưa tra được nguồn riêng về độ dài/điểm nguy hiểm cụ thể, chỉ mô tả chung theo tuyến.
- **Lịch giải chạy:** lịch 2026 của Mẫu Sơn Mount Paths, Thiên Cầm Half Marathon 2026, Hà Giang Discovery Marathon 2027 chưa công bố tại thời điểm kiểm; giải Hồ Ba Bể tổ chức tháng khác nhau theo năm (tháng 5 vs tháng 11) — kiểm điều lệ từng năm trước khi đi.
- **Giá chưa thống nhất:** giá vé Cầu kính Rồng Mây (200.000–500.000đ) và Cầu kính Bạch Long; giá vé cáp treo Fansipan, thuyền Nho Quế, vé Thanh Thủy hiện hành chưa kiểm lại ngày 08/11/2026; giá taxi sân bay các nguồn chênh nhau (Nội Bài 250.000–400.000đ; Tân Sơn Nhất 120.000–200.000đ) nên không chốt giá cố định.

**Chưa làm trong đợt này (để M làm bước app sau):** nhập dữ liệu đã bổ sung vào app `cam-nang-du-lich-app` (data34.js: 5 key mới); đợt sửa địa chỉ lệch + gộp mục trùng lặp (mục 10.4); đợt tra tọa độ xấp xỉ (189 điểm).

## 12. Đợt sửa nhóm B đợt 3 ngày 08/11/2026 (rà soát vai 3 đợt 2 — anh duyệt "Sửa hết lỗi nặng + lỗi app luôn")

Mọi sửa chữa theo đúng nguồn + ngày kiểm ghi trong báo cáo `~/workspace/bao-cao-vai3-dot2-ra-soat-du-lieu-34-tinh.md` (ngày kiểm 08/11/2026). Chỉ sửa file `.json` + `.md` trong thư mục này; không đụng artifact/app. Script sửa JSON `~/workspace/apply_step3_0811.py`; script sửa .md `~/workspace/apply_step3_0811_md.py`; backup gốc 71 file tại `~/workspace/backup-du-lieu-0811-step3/`. Kiểm độc lập bằng script sau khi sửa: 34/34 JSON parse được; địa danh 464 (không đổi), chỗ ở 257 → 251 (−6: gỡ Victory Tây Ninh −1 + gộp 5 cặp trùng lặp −5), món 308 (không đổi); mọi tên `cho_o` trong JSON đều có trong .md tương ứng.

### 12.1 Đã sửa — GẤP (sân bay Cà Mau)

- **Sân bay Cà Mau lùi mở lại tới 0h ngày 18/12/2026** (văn bản ACV gửi UBND tỉnh Cà Mau ngày 06/11/2026 — mưa lớn tháng 10/2026 + thiếu vật liệu; bay hiệu chuẩn 26/11). Lịch bay mới sau 18/12 chưa có nguồn nào công bố — ghi rõ kiểm lại trước khi đặt. (Nguồn: vietnam.vn, baotintuc.vn 06/11/2026; nguoiquansat.vn 07/11/2026.)
- **Vietjet HAN–CAU: thứ 3, 5, 7** (không phải 2, 4, 6); VJ591 HAN 10:00 → CAU 12:15, VJ592 CAU 12:45 → HAN 15:00, A320, bay 2h15 (không phải ~2h05); vé khứ hồi ~2,4 triệu đồng (đúng); khai thác thường lệ từ 30/11/2026. (Nguồn: AeroRoutes 02/11/2026; thông báo Văn phòng miền Bắc Vietjet 01–03/11/2026.)
- **BỎ hẳn ý "VNA dự kiến mở HAN–CAU hàng ngày"** — không có cơ sở, gần như chắc chắn sai (nguồn duy nhất là bản tiếng Anh tapchihangkhong.vn ghi HAN 12:50 → CAU 13:55 trùng y hệt giờ SGN–CAU, mà HAN–CAU ~1.344 km không bay được trong 65 phút — lỗi copy).
- VNA SGN–CAU giữ nguyên (A321, hàng ngày, SGN 12:50 → CAU 13:55, vé 924.000–964.000đ/chiều theo kế hoạch cũ — nguoiquansat.vn 04/11/2026) nhưng ghi rõ ngày đã lùi tới 18/12, giá sau 18/12 chưa rõ.

### 12.2 Đã sửa — gỡ / gộp chỗ ở

- **Gỡ Victory Hotel Tây Ninh** khỏi `cho_o` VÀ `cho_cap_doi` (đã chọn cách GỠ hẳn, không giữ mục "đã đóng cửa" — vì khách sạn đã dừng vận hành từ 30/07/2026 theo fanpage chính thức, khách chuyển sang Sunrise Hotel Tây Ninh, 81 Hoàng Lê Kha).
- **Gộp 5 cặp trùng lặp thành 1 mục** (giữ tên mới nhất + ghi tên cũ trong ngoặc, giữ SĐT đúng):
  - Mường Thanh Grand Gia Lai (tên cũ: Khách sạn Hoàng Anh Gia Lai) — SĐT 0269 3718 450; HAGL đổi biển 09/09/2024, Mường Thanh tiếp quản 08/2024 (Vietcap 11/09/2024).
  - Four Points by Sheraton Lạng Sơn (tên cũ: Vinpearl Lạng Sơn) — 0205 3782 999; đổi tên 2022 (vinpearl.com 22/06/2022).
  - Khách sạn Royal Palace Tuyên Quang (tên cũ: Royal Tuyên Quang Hotel) — 0971 157 157; giá dưới tên cũ một nguồn ghi 330.000–350.000đ/đêm — chưa thống nhất, hỏi tại quầy.
  - Thảo Nguyên Resort Mộc Châu (tên cũ: Thảo Nguyên Hotel Mộc Châu) — 0212 3869 666, cùng khu Phiêng Luông.
  - Tru by Hilton Viet Tri City Centre (tên cũ: SOJO Hotel Viet Tri) — 0210 3636 555, 938 Hùng Vương (đã đổi thương hiệu từ SOJO sang Tru by Hilton).
- **Nhà tổ chim = Birdhouse Bungalow KHÔNG gộp** — cùng SĐT 0347 665 311 nhưng 2 địa chỉ khác nhau (Sin Suối Hồ, Phong Thổ vs Vàng Pha, Sìn Hồ), chưa tra được địa chỉ nào đúng; ghi rõ còn nợ (xem 12.5).

### 12.3 Đã sửa — SĐT sai cơ sở + địa chỉ sai

- **Sơn Thủy Homestay (Quảng Trị):** bỏ số 0975 617 365 (đó là số Google Travel của Mũi Si Homestays) — SĐT riêng Sơn Thủy để null, ghi rõ chưa tra được; địa chỉ chi tiết chưa kiểm được; `cach_ho` sửa theo Cửa Tùng (~30–35 km).
- **Khách sạn Hải Châu (An Giang):** SĐT đúng 0296 6260 066 (số cũ 0296 3897 897 không nguồn nào khớp), địa chỉ 63 Trương Nguyệt Anh, phường Châu Phú A, Châu Đốc (kenhhomestay.com; dulichvietnam.com.vn).
- **Khách sạn Hương Giang (Hà Nội):** không tìm thấy cơ sở nào tên đó ở Đống Đa/gần Văn Miếu — ghi rõ "chưa xác minh được cơ sở, đang kiểm lại", không bịa địa chỉ mới.
- **10 địa chỉ sai đã sửa:** MT Grand Gia Lai → 537 Hùng Vương; Khách sạn Pleiku → 03 Nguyễn Tất Thành, phường Hoa Lư; Khách sạn Tre Xanh → 18 Lê Lai; Hữu Nghị (Quảng Trị) → 68 Trần Hưng Đạo, Phường 1; Khách sạn Nam Đông Hà → tên đúng "Khách sạn Nam Đông", 348 Lê Duẩn, Phường Đông Lễ, SĐT 0233 3854 531 (file cũ để null); Hải Châu (Cà Mau) → 229 Hùng Vương; Mường Thanh Luxury Cà Mau → Phường An Xuyên; Hotel Continental Saigon → 132–134 Đồng Khởi; Mường Thanh Luxury Phú Thọ → Lô CC17, Quảng trường Hùng Vương; ÊMM Saigon → đổi tên G8 Center Hotel Saigon từ 02/06/2026; Phi Mai Hotel (An Giang) → Tổ 7, đường Lê Đại Cương, khóm Vĩnh Đông 2, phường Núi Sam — cách chợ Châu Đốc ~6–7 km, không phải "gần chợ".

### 12.4 Đã sửa — giải chạy + khoảng cách + đèo + cặp đôi + giờ chụp ảnh + trú mưa + số khẩn cấp

- **VnExpress Marathon Quy Nhơn:** mùa 2026 đã dời sang 13/9/2026, tạm dừng 42 km, chỉ còn 5/10/21 km, ~8.000 VĐV (đã diễn ra xong); mùa 2027 chưa công bố. `cho_o_gan` để trống + ghi rõ chưa tra được khách sạn Quy Nhơn (khách sạn Pleiku cách ~160 km đã gỡ, không bịa).
- **Marathon Cà Mau:** `cho_o_gan` để trống + ghi rõ chưa tra được khách sạn gần Quảng trường Hùng Vương (phường Bạc Liêu) — khách sạn TP Cà Mau cách ~60 km đã gỡ, không bịa.
- **Cửa Tùng:** 20 km → ~30–35 km (cả `dia_danh` và `cho_o` Sơn Thủy). **Đèo Sa Mù:** "quốc lộ 9" → "đường Hồ Chí Minh nhánh Tây" (nối Hướng Phùng – Hướng Việt, cách Khe Sanh ~35 km).
- **`cho_cap_doi.cho_o` bổ sung:** Quảng Trị thêm Mường Thanh Grand Quảng Trị (Traveloka: "perfect choice for couples…"); Cà Mau thêm Mường Thanh Luxury Cà Mau (Traveloka/Hotels.com: khách sạn lãng mạn cho cặp đôi).
- **Giờ chụp ảnh theo mùa + mâu thuẫn nội bộ:** Hạ Long hoàng hôn tháng 11 ~16:30–17:30 (mặt trời lặn 17:12; khung 17:30–18:30 chỉ đúng mùa hè); Cầu Đất: xuất phát 4:00–4:30, mây đẹp 5:00–6:30; Trà Sư thống nhất 7–9h / 15:30–17h (cả `gio_dep_chup_anh` và `dia_danh.luu_y` + nhận xét); dã quỳ Chư Đăng Ya: cuối tháng 10 – đầu tháng 11 (Tuần lễ Hoa Dã quỳ 2026: 30/10–8/11/2026); Đèo Bảo Lộc 10–15 km (các nguồn ghi khác nhau); đèo An Khê "khoảng 40 m" (không phải 30–40 m); đêm Đà Lạt điển hình 14–16°C (13°C chỉ ngày mưa); Quảng Trị `best_season` thống nhất "Tháng 3–5" theo `mua_thang` (phanvantravel.com).
- **Vụ lừa cọc Quảng Ninh:** sửa diễn đạt thành "nhiều vụ lừa đặt phòng ở Cô Tô, tổng khoảng 100 triệu đồng" (100 triệu là tổng nhiều bị hại từ tháng 6/2022; vụ tố giác cụ thể chỉ 8,86 triệu đồng).
- **`khi_troi_mua`:** Lào Cai thêm Bảo tàng Sa Pa, Chợ Sa Pa (khu chợ có mái), Sun Plaza Sa Pa, quán cà phê trung tâm Sa Pa; ghi rõ Dinh Hoàng A Tưởng ở Bắc Hà cách Sa Pa ~70 km (chỉ hợp nếu đang ở Bắc Hà) và nhà thờ đá chỉ trú được khi mở cửa làm lễ. Gia Lai bỏ Quảng trường Đại Đoàn Kết (ngoài trời, không mái che). An Giang bỏ Chùa Hang (leo bậc đá, ngoài trời một phần). Quảng Ninh bỏ Hang Sửng Sốt (mưa to/bão tàu cấm chạy thì không tới được).
- **An Giang "không có đèo"** viết lại: "không có đèo mang tên riêng, nhưng đường lên Núi Cấm/Núi Sam dốc, nhiều cua gấp".
- **Số khẩn cấp riêng bổ sung:** Gia Lai — đường dây nóng du lịch 0932 40 42 46 (Sở VHTTDL; UBND phường Pleiku vận động >100 cơ sở công khai số này, 31/10/2026), QLTT 0913 469 475, Ban Chỉ đạo 389 tỉnh 0977 666 389 / 0978 666 389; An Giang — Sở Du lịch 02973 781 999 / 02973 504 569 (sdl.angiang.gov.vn); Quảng Ninh — thêm số BVĐK tỉnh thứ hai 0203 3825 499.

### 12.5 Còn nợ sau đợt này (ghi rõ, không giấu)

- **Nhà tổ chim = Birdhouse Bungalow (Lai Châu):** chưa gộp — 2 địa chỉ khác nhau, chưa tra được cái nào đúng.
- **Him Lam Điện Biên 2 mục nghi trùng** (cùng địa chỉ Tổ 6, phường Him Lam; SĐT khác nhau 0215 3811 856 / 0215 3811 666) — chưa xác minh được là 1 hay 2 cơ sở.
- **5 mục lệch địa chỉ chưa xác minh từng địa chỉ:** Êmm Hotel Huế, Bonjour Hostel, Pù Luông Retreat, Phúc Xuân Resort, Pài Bjooc, Sài Gòn Kim Liên, MT Bắc Ninh, MT Lai Châu (mục 10.4 ghi 17 tên — đợt này đã xác minh 12/17; Nam Kiều Cà Mau giữ cảnh báo mâu thuẫn 132 vs 151A, nghiêng về 132).
- **Galaxy Thái Nguyên** (Galaxy River hay Galaxy Hotel Phổ Yên 097 212 12 59) / **Nature Na Hang** — chưa đối chiếu chắc, cần anh chốt.
- **Homestay Đất Mũi 7 số mâu thuẫn chưa chốt:** ứng viên mạnh nhất 0819 828 249, thứ hai 0918 996 956; **loại 0918 719 972** (số của Homestay Hương Đất Mũi).
- **Giải Tri Tôn (An Giang):** file "Tháng 1 hằng năm" chưa chứng minh được cho 2026; có giải Tri Tôn Cross Country 14–15/11/2026 chưa nhập vào file — để đợt sau.
- **`cho_nguoi_chay_giai.cho_o_gan` An Giang:** Victoria Châu Đốc + Châu Phố cách Tri Tôn ~45–50 km — chưa thay bằng khách sạn gần Tri Tôn.
- **189 tọa độ xấp xỉ, 8 tọa độ null** vẫn còn; Quảng Trị khoảng cách vẫn tính từ Đông Hà (đang tính lại từ Đồng Hới, lệch ~+100 km khi tính lại); số cấp cứu riêng BVĐK Sa Pa chưa xác minh được số hiện hành (chỉ có hotline 096 797 14 14 nguồn 2024); tên hiện tại khách sạn 86 Bạch Đằng, Châu Đốc (Trung Nguyễn hay The CK) chưa xác minh; khoảng cách IC12 → Pause & Pose Đầm Vân Hội và ngày khai trương 02/09/2026 chưa xác minh.
- **Chưa làm trong đợt này (để M làm bước app sau):** nhập dữ liệu đã sửa vào app `cam-nang-du-lich-app` (data34.js); đợt tra tọa độ xấp xỉ (189 điểm).

## 13. Đợt sửa nhóm B đợt 4 ngày 16/11/2026 (rà soát vai 3 đợt 3 — anh duyệt "Sửa hết 12 lỗi + nợ cũ luôn")

Mọi sửa chữa theo đúng nguồn + ngày kiểm ghi trong báo cáo `~/workspace/bao-cao-vai3-dot3-ra-soat-du-lieu-34-tinh.md` (ngày kiểm 16/11/2026). Chỉ sửa file `.json` + `.md` trong thư mục này; không đụng artifact/app. Script sửa JSON `~/workspace/apply_step4_0811.py` (+ bổ sung `chua_kiem_duoc`/`canh_bao` cùng đợt); script sửa .md `~/workspace/apply_step4_0811_md.py` + `~/workspace/apply_step4_0811_md2.py`; backup gốc 71 file tại `~/workspace/backup-du-lieu-0811-step4/`. Kiểm độc lập bằng script sau khi sửa: 34/34 JSON parse được; địa danh 464 (không đổi), chỗ ở 251 → 249 (−2: gộp Nhà tổ chim = Birdhouse Bungalow + Him Lam = Him Lam Resort), món 308 (không đổi). Không thêm cảnh báo lừa cọc Tuyên Quang (chỉ là gợi ý trong báo cáo, chưa được duyệt).

### 13.1 Đã sửa — 3 lỗi nặng

- **Pác Bó MIỄN PHÍ vé vào cửa từ 04/07/2026** (Thông báo 232/TB-BQLCDTQGĐB ngày 03/07/2026; Báo Cao Bằng 04/07/2026) — file cũ ghi 25.000đ NL / 5.000đ TE. Xe điện 20.000đ/người giữ nguyên. Đã bỏ ghi chú mâu thuẫn giá vé trong `luu_y` + nhận xét. Suối Lê Nin (vé chung khu di tích) cũng đổi sang miễn phí.
- **Thác Bản Giốc: NL 40.000đ từ 04/07/2026** (Thông báo 138/TB-BQLKDLTBG ngày 02/07/2026) — file cũ ghi 45.000đ. TE 20.000đ, bè máy 50.000đ giữ nguyên. Đã sửa cả cảnh báo chặt chém ("Mua vé tại quầy chính thức...") và nhận xét (45.000đ → 40.000đ).
- **Pài Bjooc Homestay sai vị trí:** file cũ "Bản Nà Tông, Lâm Bình" → đúng **thôn Tân Quang, xã Thái Bình, huyện Yên Sơn** (6 nguồn đồng nhất). SĐT 0398 157 225 và giá 450.000–650.000đ/phòng riêng, sàn 100.000–120.000đ giữ nguyên.
- Hệ quả bảng chi phí Cao Bằng: vé tham quan (Bản Giốc + Ngườm Ngao + Pác Bó) 115.000–200.000đ → **85.000–200.000đ** (40+45+0); tổng ước tính 4.125.000–9.340.000đ → **4.095.000–9.310.000đ/người**; đi từ Hà Nội ~2.125.000–4.340.000đ → **~2.095.000–4.310.000đ/người** (trừ đúng 30.000đ).

### 13.2 Đã sửa — 4 lỗi trung bình

- **Đồng Nai Marathon:** `diem_chay` đổi sang **Quảng trường phường Bình Phước, TP Đồng Nai (khu vực Đồng Xoài, Bình Phước cũ)**; `cho_o_gan` để trống + ghi rõ chưa tra được khách sạn Đồng Xoài (khách sạn Biên Hòa cách ~90 km đã gỡ, không bịa; giải ở khu vực Bình Phước, nên ở Đồng Xoài). Ngày 28–29/11/2026 giữ nguyên (đã đúng).
- **Aurora Plaza Hotel (Đồng Nai):** phường Tân Mai → **phường Tam Hiệp** (253 Phạm Văn Thuận, KP17; SĐT 0251 3918 888 giữ nguyên).
- **The Mira Central Park Hotel (Đồng Nai):** phường Tân Tiến → **phường Tam Hiệp**; giá sàn nâng từ ~800.000đ → **từ ~1.000.000đ/đêm** (ghi chú nguồn 1.411.200đ giữ nguyên; mục "chưa kiểm được" đã cập nhật là đã chốt).
- **Mường Thanh Lai Châu:** "Đường Hương Phong" → **đường Lê Duẩn**, phường Tân Phong (Hương Phong là địa chỉ nhà hàng của khách sạn, không phải địa chỉ khách sạn; số nhà Lê Duẩn chưa chốt nên không ghi số nhà).

### 13.3 Đã sửa — 5 lỗi nhẹ (tên phường cũ sau sáp nhập 01/07/2025)

- **MT Luxury Cao Bằng:** phường Hợp Giang → **phường Thục Phán** (42 Kim Đồng, 0206 3888 088 giữ nguyên).
- **MT Grand Tuyên Quang:** tổ 32, phường Tân Quang → **tổ 13, phường Minh Xuân** (207 đường Bình Thuận, 0207 3816 688 giữ nguyên).
- **MT Grand Điện Biên Phủ:** phường Him Lam → **phường Điện Biên Phủ** (514 Võ Nguyên Giáp, 0215 3810 043 giữ nguyên).
- **Hưng Yên:** phường Hiến Nam → **phường Phố Hiến** (địa chỉ Chùa Chuông: thôn Nhân Dục, phường Phố Hiến).
- **The CK Hotel (86 Bạch Đằng, Châu Đốc):** đổi tên từ "Khách sạn Trung Nguyễn" thành **"The CK Hotel (tên cũ: Khách sạn Trung Nguyễn)"** (Sở Du lịch An Giang 27/07/2026); SĐT 0296 3561 561 + địa chỉ giữ nguyên; giá nâng từ 150.000–250.000đ → **từ ~325.000đ/đêm** (Planet of Hotels: từ ~$13, trung bình ~$24 ~600.000đ).

### 13.4 Đã sửa — 12 nợ cũ nay có đáp án

- **Gộp Nhà tổ chim = Birdhouse Bungalow (Lai Châu)** thành 1 mục "Homestay Nhà tổ chim (The Birdhouse Bungalow)" tại Bản Sin Suối Hồ, Phong Thổ, SĐT 0347 665 311; địa chỉ "Vàng Pha, Sìn Hồ" là sai (không nguồn nào ủng hộ) nên bỏ. **Giá chưa thống nhất — giữ cả 2 con số kèm ghi chú mâu thuẫn, không tự chọn:** ~650.000đ/đêm/phòng (có nguồn ghi ~1.200.000–1.500.000đ/đêm — mâu thuẫn, chưa thống nhất). `cho_cap_doi.cho_o` Lai Châu cũng gộp theo.
- **Gộp Him Lam = Him Lam Resort (Điện Biên)** thành 1 mục "Khách sạn Him Lam (Him Lam Resort)", Tổ 6, phường Him Lam; ghi cả 2 số: **0215 3811 856** (Phòng Kinh doanh) + **0215 3811 666** (hotline đặt phòng); giá ~600.000–870.000đ (phòng khách sạn) / ~1.500.000đ (resort).
- **Nature Na Hang Homestay:** SĐT **0988 486 112** (đã có trong file từ đợt trước, xác minh lại đúng); vị trí sửa "thị trấn Na Hang" → **thôn Nà Va, xã Thượng Lâm**. Giá 600.000–850.000đ giữ nguyên.
- **Cầu kính Rồng Mây (Lai Châu):** chốt **NL 500.000đ, TE (1–1,4 m) 300.000đ, dưới 1 m miễn phí; giờ 7:00–17:30**; trò chơi riêng ~150.000đ/trò (nguồn phanvantravel.com ghi 200.000đ là cũ/sai nên đã bỏ khỏi danh sách nguồn). Đã sửa cả `chua_kiem_duoc` + cảnh báo chặt chém (giá nhiều mức → giá chốt).
- **Homestay Đất Mũi (Quách Văn Ngãi):** điền **0819 828 249** kèm ghi chú "số chính theo nhiều nguồn, gọi trước để xác nhận"; số phụ 0918 996 956; **vẫn LOẠI 0918 719 972** (số Homestay Hương Đất Mũi).
- **BVĐK Sa Pa (Lào Cai):** bổ sung vào `so_khan_cap.rieng`: hotline **096 797 14 14** + tổng đài **0214 3900 119** (Tổ 1, đường Điện Biên Phủ, TT Sa Pa).
- **Cồn Vành (Hưng Yên):** điểm Google viết gọn thành **3.9/5 (~3.800 đánh giá)** (file cũ ghi mơ hồ "khoảng 3.8–3.9/5"); giữ khoảng cách 60 km (tính từ TP Hưng Yên mới).
- **Mường Thanh Luxury Điện Biên:** điền địa chỉ **42 Trần Đăng Ninh, phường Thanh Bình, TP Điện Biên Phủ** (khai trương 07/05/2025, 5 sao; hotline 0215 2216 666 đúng; giá "Từ ~1.000.000đ/đêm" giữ nguyên).
- **Giá vé Cao Bằng bổ sung:** Hồ Thang Hen **30.000đ/người**; Làng đá Khuổi Ky **40.000đ/người**; bản Pác Rằng **50.000đ/người** (thêm căn cứ vietsensetravel.com, **vẫn giữ ghi chú mâu thuẫn** vì nguồn khác ghi miễn phí vào làng).
- **Bổ sung địa chỉ:** Homestay Tit Mit (Cao Bằng) → **10 Đồng Khê, Tân Giang**; Khách sạn Phố Hiến (Hưng Yên) → **58 Phạm Ngũ Lão, phường Phố Hiến**.

### 13.5 Còn nợ sau đợt này (ghi rõ, không giấu)

- **Giá phòng gộp Nhà tổ chim / Birdhouse** chưa thống nhất (650.000đ vs 1.200.000–1.500.000đ) — xem 13.4.
- **Hưng Yên `cho_cap_doi.cho_o` trống** (`[]`): toàn tỉnh chỉ có 7 mục `cho_o`, 6/7 là mục chung chung không SĐT (chỉ Khách sạn Phố Hiến có số) — cần bổ sung chỗ ở có SĐT thật.
- **Quảng Trị chưa bổ sung điểm Quảng Bình cũ**; khoảng cách vẫn tính từ Đông Hà; 189 tọa độ xấp xỉ + 8 tọa độ null vẫn còn.
- **5 mục lệch địa chỉ chưa xác minh từng địa chỉ:** Êmm Hotel Huế, Bonjour Hostel, Pù Luông Retreat, Phúc Xuân Resort, Sài Gòn Kim Liên, MT Bắc Ninh (Pài Bjooc + MT Lai Châu đã xong trong đợt này).
- **Galaxy Thái Nguyên** (Galaxy River hay Galaxy Hotel Phổ Yên) / **giải Tri Tôn Cross Country 14–15/11/2026** chưa nhập / `cho_o_gan` Tri Tôn còn khách sạn Châu Đốc cách ~45–50 km.
- **Chưa làm trong đợt này (để M làm bước app sau):** nhập dữ liệu đã sửa vào app `cam-nang-du-lich-app` (data34.js); đợt tra tọa độ xấp xỉ (189 điểm).
