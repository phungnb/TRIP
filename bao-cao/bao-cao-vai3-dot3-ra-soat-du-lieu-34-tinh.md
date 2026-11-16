# BÁO CÁO VAI 3 — CHUYÊN GIA / NGƯỜI ĐỊA PHƯƠNG KIỂM CHỨNG DỮ LIỆU
## Đợt kiểm cuối (đợt 3) — App "Cẩm nang du lịch" (34 tỉnh thành)

- **Ngày kiểm:** 16/11/2026
- **Người kiểm:** Vai 3 (đợt 3) — chỉ kiểm, không sửa app hay file dữ liệu nào.
- **Phạm vi đã kiểm:** 44 mục (6 tỉnh mẫu sâu: Cao Bằng, Đồng Nai, Hưng Yên, Tuyên Quang, Lai Châu, Điện Biên + nợ cũ TONG-HOP mục 12.5 + 5 mục đợt 2 đã sửa, xác minh lại ở file nguồn).
- **Giới hạn quan trọng:** Subagent không có trình duyệt live nên **mục 1 của nhiệm vụ (kiểm lại trên app live bằng cách bấm thật) KHÔNG làm được**. Các mục đợt 2 đã sửa dưới đây chỉ được xác minh ở **file nguồn**, chưa xác minh trên app live — cần cử người kiểm live trước khi chốt. Mọi mục còn lại đối chiếu nguồn công khai trên web (tìm kiếm + đọc trang nguồn), ngày kiểm 16/11/2026.

---

## 1. KẾT LUẬN CHUNG

**CHƯA ĐỦ TIN để giữ public nguyên trạng — sửa 12 lỗi đã có đáp án sẵn (3 nặng, 4 trung bình, 5 nhẹ) rồi mới chốt.**

Lý do 1 câu: 2 điểm hút khách nhất Cao Bằng (Pác Bó, Bản Giốc) đang ghi sai giá vé sau đợt điều chỉnh 04/07/2026, 1 homestay ghi sai huyện, và giải chạy Đồng Nai chỉ nhầm thành phố xuất phát — người dùng làm theo sẽ trả tiền sai và đi nhầm chỗ.

---

## 2. LỖI NẶNG MỚI (sửa trước khi chốt — đã có đáp án đúng)

### 2.1. Pác Bó MIỄN PHÍ vé vào cửa từ 04/07/2026 — file vẫn ghi 25.000đ NL / 5.000đ TE (SAI)
- **File hiện ghi** (`cao-bang.json`): "25.000đ/người lớn, 5.000đ/trẻ em; xe điện 20.000đ/người".
- **Đúng:** Vé vào cửa **MIỄN PHÍ từ ngày 04/07/2026** (trong nước + quốc tế). Xe điện vẫn 20.000đ/người — phần này của file đúng.
- **Bằng chứng:** Thông báo 232/TB-BQLCDTQGĐB ngày 03/07/2026 của Ban Quản lý các di tích quốc gia đặc biệt tỉnh Cao Bằng; Báo Cao Bằng 04/07/2026 ("từ ngày 4/7/2026, du khách trong nước và quốc tế sẽ không phải trả phí khi tham quan Khu di tích Quốc gia đặc biệt Pác Bó"); vietnam.vn (dẫn CAND, nongnghiemmoitruong.vn); vietsensetravel.com. Cùng chính sách miễn phí: rừng Trần Hưng Đạo.
- **Sửa thành:** "Miễn phí vé vào cửa từ 04/07/2026 (Thông báo 232/TB-BQLCDTQGĐB); xe điện 20.000đ/người".

### 2.2. Thác Bản Giốc — file ghi 45.000đ NL, giá mới từ 04/07/2026 là 40.000đ NL (SAI)
- **File hiện ghi** (`cao-bang.json`): "45.000đ/người lớn, 20.000đ/trẻ em; bè máy 50.000đ/người".
- **Đúng:** NL **40.000đ**, HSSV/NCT 20.000đ, TE 6–dưới 16 tuổi 20.000đ, dưới 6 tuổi miễn phí; bè máy 50.000đ (phần bè máy của file đúng).
- **Bằng chứng:** Thông báo 138/TB-BQLKDLTBG ngày 02/07/2026 (caobangecotravel.com); vietsensetravel.com. Các nguồn cũ vẫn ghi 45.000đ — file đang theo giá cũ.
- **Sửa thành:** "40.000đ/người lớn, 20.000đ/trẻ em (từ 04/07/2026, TB 138/TB-BQLKDLTBG); bè máy 50.000đ/người".

### 2.3. Pài Bjooc Homestay — file ghi sai vị trí: "Bản Nà Tông, Lâm Bình" (SAI)
- **File hiện ghi** (`tuyen-quang.json`): vị trí Bản Nà Tông, huyện Lâm Bình; giá 450–650k phòng riêng / 100–120k sàn.
- **Đúng:** **Thôn Tân Quang, xã Thái Bình, huyện Yên Sơn, Tuyên Quang.** SĐT 0398 157 225 (file đã đúng số này).
- **Bằng chứng:** kinhnghiemdulich.vn, tadiha.com, toplist.vn, tripi.vn, motogo.vn, travelviet.net đều ghi Thái Bình, Yên Sơn. File theo nhầm dulichvtv.com (chính nguồn này cũng tự mâu thuẫn: bảng ghi Nà Tông/Lâm Bình). Giá 450–650k phòng riêng / 100–120k sàn là đúng theo dulichvtv — chỉ sai vị trí.
- **Sửa thành:** đổi vị trí thành thôn Tân Quang, xã Thái Bình, huyện Yên Sơn; giữ nguyên SĐT và giá.

---

## 3. LỖI TRUNG BÌNH

### 3.1. Đồng Nai Marathon — `cho_o_gan` và `diem_chay` chỉ nhầm thành phố (Biên Hòa thay vì Bình Phước)
- **File hiện ghi** (`dong-nai.json`): ngày "Tháng 11 hằng năm (mùa 2026: 28-29/11/2026; mùa đầu 2023)" — **ngày này ĐÚNG**; nhưng `cho_o_gan` = The Mira, Aurora Plaza, Mansion Park (đều ở Biên Hòa) và `diem_chay` = Văn miếu Trấn Biên, Công viên Biên Hòa, đường ven sông Đồng Nai.
- **Đúng:** Mùa 2026 (lần 3) diễn ra **28–29/11/2026 tại Quảng trường phường Bình Phước, TP Đồng Nai** (khu vực Đồng Xoài, Bình Phước cũ), 6 cự ly (Kids 2km, đồng hành 3km, 5/10/21/42km), ~10.000 VĐV. Văn miếu Trấn Biên là điểm xuất phát của giải **khác** (Biên Hòa Half Marathon 15/3/2025 — file cũng có giải này, đúng). Bình Phước cách Biên Hòa ~80–90 km.
- **Bằng chứng:** Báo Đồng Nai 27/10/2026 và 30/10/2026 (go.baodongnai.com.vn, baodongnai.com.vn); công văn Thành ủy Đồng Nai (phuhoa.dongnai.gov.vn). Giải vốn là Bình Phước Marathon, đổi tên sau sáp nhập 01/07/2025.
- **Sửa thành:** `diem_chay` = Quảng trường phường Bình Phước (Đồng Xoài); `cho_o_gan` cần khách sạn khu vực Đồng Xoài/Bình Phước (file hiện không có khách sạn nào ở đó — hoặc ghi rõ "giải ở khu vực Bình Phước, cách Biên Hòa ~90 km, nên ở Đồng Xoài").

### 3.2. Aurora Plaza Hotel (Đồng Nai) — file ghi phường Tân Mai, đúng là phường Tam Hiệp
- **File hiện ghi:** "253 Phạm Văn Thuận, phường Tân Mai, TP Biên Hòa", 0251 3918 888.
- **Đúng:** **253 Phạm Văn Thuận, KP17, phường Tam Hiệp, TP Biên Hòa.** SĐT và số nhà đúng.
- **Bằng chứng:** Fanpage chính thức Aurora Hotel Plaza (bài 16/09, 02/11, 07/11, 13/11/2026) + website aurorahotelplaza.com đều ghi Tam Hiệp.

### 3.3. The Mira Central Park Hotel (Đồng Nai) — sai phường + giá sàn file thấp
- **File hiện ghi:** "1809 Nguyễn Ái Quốc, phường Tân Tiến, TP Biên Hòa", 0251 8870 999, "Từ ~800.000đ/đêm (có nguồn ghi từ 1.411.200đ — mâu thuẫn)".
- **Đúng:** Số nhà **1809 Nguyễn Ái Quốc đúng** (tin tuyển dụng chính thức của khách sạn 08/2026, motogo, dulichvietnam); phường là **Tam Hiệp** (tin tuyển dụng chính thức 08/2026), không phải Tân Tiến (tên phường cũ sau sáp nhập). SĐT 0251 8870 999 đúng. Giá: file "~800.000đ" thấp hơn mọi nguồn hiện tại (ongvove từ 1.000.000–1.600.000đ; motogo 1.400.000–30.000.000đ; dongnaitoplist từ 1.800.000đ; chính file đã ghi chú có nguồn 1.411.200đ).
- **Sửa thành:** phường Tam Hiệp; giá sàn nâng lên "Từ ~1.000.000đ/đêm" (ghi chú nguồn 1.411.200đ đã có trong file).

### 3.4. Mường Thanh Lai Châu — file ghi "Đường Hương Phong", đúng nhiều khả năng là đường Lê Duẩn
- **File hiện ghi:** "Đường Hương Phong, phường Tân Phong", 0213 3790 888, ~600.000–1.200.000đ.
- **Đúng:** SĐT 0213 3790 888 **đúng**. Địa chỉ khách sạn: **đường Lê Duẩn, phường Tân Phong** (Sở KH&ĐT Lai Châu — sách du lịch Lai Châu trên pubhtml5; blogyeuphuot; vetet; alltours; Sở VHTTDL Lai Châu). "113 phố Hương Phong" là địa chỉ **nhà hàng** của khách sạn (blogyeuphuot) — file lấy nhầm địa chỉ nhà hàng làm địa chỉ khách sạn. (Số nhà Lê Duẩn có nguồn ghi 113, có nguồn ghi 133 — chưa chốt số nhà, chỉ chốt tên đường.)
- **Sửa thành:** đường Lê Duẩn, phường Tân Phong; bỏ "Đường Hương Phong".

---

## 4. LỖI NHẸ

### 4.1. Tên phường cũ sau sáp nhập 01/07/2025 còn sót ở 3 khách sạn Mường Thanh + 1 tỉnh
- **MT Luxury Cao Bằng:** file ghi phường Hợp Giang → đúng **phường Thục Phán** (danh sách chính thức Mường Thanh, cập nhật 01/07/2025). 42 Kim Đồng + 0206 3888 088 đúng.
- **MT Grand Tuyên Quang:** file ghi tổ 32, phường Tân Quang → đúng **tổ 13, phường Minh Xuân** (danh sách chính thức Mường Thanh, cập nhật 01/07/2025). SĐT 0207 3816 688 đúng — đã xác nhận là số duy nhất chính thức qua Báo Tuyên Quang 16/09/2026 về lừa đảo fanpage giả.
- **MT Grand Điện Biên Phủ:** file ghi phường Him Lam → đúng **phường Điện Biên Phủ** (danh sách chính thức Mường Thanh). 514 Võ Nguyên Giáp + 0215 3810 043 đúng. Lưu ý: vietnam.com.co ghi "Đã đóng cửa" là sai — khách sạn vẫn hoạt động (Sở VHTTDL Điện Biên quảng bá 21/08/2026).
- **Hưng Yên:** file còn ghi phường **Hiến Nam** (đã sáp nhập vào phường Phố Hiến theo NQ 1666/NQ-UBTVQH15 ngày 16/06/2025). Cần rà lại toàn bộ file Hưng Yên, đổi Hiến Nam → Phố Hiến.

### 4.2. The CK Hotel (86 Bạch Đằng, Châu Đốc) — giá file thấp (xem thêm mục 5.3)
- File ghi 150.000–250.000đ; Planet of Hotels ghi từ ~$13 (~325.000đ), trung bình ~$24 (~600.000đ). Nâng khung giá khi đổi tên (mục 5.3).

---

## 5. NỢ CŨ (TONG-HOP mục 12.5) — ĐÃ CHỐT ĐƯỢC ĐÁP ÁN TRONG ĐỢT NÀY

### 5.1. Nhà tổ chim = Birdhouse Bungalow (Lai Châu): 1 cơ sở duy nhất — CẦN GỘP
- **Chốt:** Chỉ có 1 cơ sở tại **Bản Sin Suối Hồ, Phong Thổ, SĐT 0347 665 311** (tripi.vn 06/2025, mytour.vn ×2, taybac.tv, boki.vn đồng nhất). Địa chỉ "Vàng Pha, Sìn Hồ" trong mục thứ hai của file là **sai** — không nguồn nào ủng hộ.
- **Chưa chốt:** giá còn mâu thuẫn — ~650.000đ (mục Nhà tổ chim) vs ~1.200.000–1.500.000đ (mục Birdhouse). Cần đối chiếu thêm trước khi gộp giá.

### 5.2. Him Lam = Him Lam Resort (Điện Biên): cùng 1 khu — CẦN GỘP
- **Chốt:** Cùng 1 khu, Tổ 6, phường Him Lam. Hai số đều đúng nhưng là 2 đầu số khác nhau của cùng cơ sở: **0215 3811 856** (Phòng Kinh doanh — Sở VHTTDL Điện Biên, svhttdl.dienbien.gov.vn) và **0215 3811 666** (hotline đặt phòng — tripi.vn, limoutrip.com). Gộp 1 mục, ghi cả 2 số. Giá khác nhau do loại phòng (600.000–870.000đ phòng KS vs ~1.500.000đ resort).

### 5.3. Tên khách sạn 86 Bạch Đằng, Châu Đốc: ĐÃ ĐỔI TÊN thành The CK Hotel
- **Chốt:** Đổi tên file thành **"The CK Hotel (tên cũ: Khách sạn Trung Nguyễn)"**. SĐT 0296 3561 561 và địa chỉ 86 Bạch Đằng giữ nguyên.
- **Bằng chứng:** Sở Du lịch An Giang, danh sách cơ sở lưu trú phường Châu Đốc ngày 27/07/2026 (sdl.angiang.gov.vn): "The CK — 86 Bạch đằng, P. Châu Đốc — 02963561561"; planetofhotels.com: "Bất động sản này trước đây được biết đến với tên Trung Nguyen Hotel"; bình luận khách: "Tên khách sạn mới là The CK nha!" (vietnamtourism.com.vn).

### 5.4. Nature Na Hang Homestay: SĐT 0988 486 112 ĐÃ XÁC MINH ĐƯỢC
- **Chốt:** SĐT **0988 486 112** (fanpage Du lịch Na Hang trả lời bình luận bằng số này, bài 05/07/2026 và 09/10/2026). Vị trí đúng: **thôn Nà Va, xã Thượng Lâm** — file ghi "thị trấn Na Hang" là chưa chính xác. Giá 600–850k đúng theo dulichvtv.com.

### 5.5. Cầu kính Rồng Mây (Lai Châu): CHỐT ĐƯỢC GIÁ 500.000đ NL / 300.000đ TE
- **Chốt:** NL **500.000đ**, TE (1–1,4m) **300.000đ**, dưới 1m miễn phí; giờ 7:00–17:30; trò chơi 150.000đ/trò. File ghi "chưa kiểm được... 200–500k" — nay chốt 500k/300k.
- **Bằng chứng:** junglebosstours.com (dẫn website bán vé chính thức của khu), asiamystika.com, divui.com (475.000đ online), traveloka.com, wikidulich.com (11/2026). Nguồn phanvantravel.com ghi 200.000đ là cũ/sai. Vị trí trong file đúng: QL4D, xã Sơn Bình, Tam Đường, trên đèo Ô Quy Hồ (thuộc Lai Châu, không phải Sa Pa/Lào Cai).

### 5.6. Homestay Đất Mũi (Quách Văn Ngãi): ứng viên mạnh nhất 0819 828 249 ĐƯỢC CỦNG CỐ
- **Chốt:** Điền **0819 828 249** (mytour.vn, topcamauaz.com ×2, sesoopen.com, tripday.vn, limoutrip.com — 6 nguồn độc lập), địa chỉ Ấp Cồn Mũi, xã Đất Mũi, Ngọc Hiển; giá ngủ đêm ~50.000đ/người (thienhuongtourist.com) / 50.000–200.000đ (sesoopen.com). Số phụ có thể ghi chú: 0918 996 956 (danhsach.top, gonatour.vn). Lưu ý: "01279828249" trong danh sách gonatour chính là dạng 11 số cũ của 0819 828 249 (đổi đầu số 2018) — cùng 1 số, không phải số khác. Số 0918 719 972 vẫn loại (số Homestay Hương Đất Mũi).
- Chưa đủ đồng thuận tuyệt đối (còn vài số lẻ tẻ 0388 810 974, 0915 154 618, 0915 204 944 xuất hiện 1 lần) — nhưng 0819 828 249 là lựa chọn có cơ sở nhất, nên điền kèm ghi chú "số chính theo nhiều nguồn, gọi trước để xác nhận".

### 5.7. BVĐK Sa Pa: CHỐT ĐƯỢC SỐ — hotline 096 797 14 14 + tổng đài 0214 3900 119
- **Chốt:** Hotline **096 797 14 14** (phongkhambacsi.vn 2024; suckhoe.thebank.vn; website benhviendakhoasapa.com) + tổng đài **0214 3900 119** (thuongmaigroup.vn; giayphepdangkykinhdoanh.vn). Địa chỉ: Tổ 1, đường Điện Biên Phủ, TT Sa Pa. Ghi cả 2 số (hotline chính + tổng đài).

### 5.8. Cồn Vành (Hưng Yên): CHỐT ĐƯỢC ĐIỂM ĐÁNH GIÁ 3.9/5 (Google, ~3.800 đánh giá)
- **Chốt:** Điểm Google **3.9/5, ~3.800 đánh giá** (top-rated.online: 3.90, 3.8K reviews; tiphay.vn: 3.9/5; petrothaibinhhotel.vn: 3.8). File ghi mơ hồ "khoảng 3.8–3.9/5 theo các trang tổng hợp" — nay viết gọn thành 3.9/5 (Google). Địa chỉ: xã Nam Phú, huyện Tiền Hải (nay là xã Hưng Phú sau sáp nhập — file ghi "Xã Hưng Phú (Nam Phú cũ)" là đúng). Gửi xe máy 5.000–10.000đ đúng theo petrothaibinhhotel.vn. Lưu ý: file ghi cách trung tâm 60 km (tính từ TP Hưng Yên mới); nguồn cũ ghi ~40 km là tính từ TP Thái Bình cũ — giữ 60 km, không đổi.

### 5.9. Mường Thanh Luxury Điện Biên: CHỐT ĐƯỢC ĐỊA CHỈ 42 Trần Đăng Ninh, phường Thanh Bình
- **Chốt:** Khách sạn CÓ THẬT, khai trương 07/05/2025, 5 sao, 155 phòng. Địa chỉ: **42 Trần Đăng Ninh, phường Thanh Bình, TP Điện Biên Phủ** (muongthanh.com; trip.com; Sở VHTTDL Điện Biên — danh sách Tết 2026: "Tổ 2, Phường Điện Biên Phủ"). Hotline **0215 2216 666 đúng** (muongthanh.com: +84 215 221 6666). Giá từ ~1.097.360đ (trip.com) / 1.320.000đ (vietgoing) — file "Từ ~1.000.000đ/đêm" chấp nhận được. File ghi "(chưa kiểm được số nhà cụ thể)" — nay điền được số nhà.

### 5.10. Giá vé còn thiếu ở Cao Bằng — NAY CÓ SỐ (bổ sung, không phải lỗi sai)
- **Hồ Thang Hen:** file "Chưa kiểm được mức vé" → thực ra **30.000đ/người** (vietsensetravel.com).
- **Làng đá Khuổi Ky:** file "Chưa kiểm được mức vé" → thực ra **40.000đ/người** (vietsensetravel.com).
- **Bản Pác Rằng (làng rèn Phúc Sen):** file "Miễn phí vào làng... có nguồn ghi 50.000đ — chưa thống nhất" → vietsensetravel.com ghi **50.000đ/người** (thêm 1 căn cứ cho mức 50.000đ; vẫn giữ ghi chú mâu thuẫn vì nguồn khác ghi miễn phí vào làng, 50.000–100.000đ chỉ là trải nghiệm làm thợ rèn).

---

## 6. ĐÃ KIỂM VÀ ĐÚNG (không cần sửa)

| # | Mục | Kết quả kiểm (16/11/2026) |
|---|-----|---------------------------|
| 1 | Cà Mau — "18/12/2026" + Vietjet VJ591/VJ592 | File nguồn đúng: "18/12/2026" xuất hiện 5 lần, "29/11/2026" = 0; VJ591 HAN 10:00→CAU 12:15 / VJ592 CAU 12:45→HAN 15:00, A320, bay 2h15, khứ hồi ~2,4 triệu. (Chỉ xác minh file nguồn, chưa kiểm live.) |
| 2 | "Victory" (Tây Ninh) | 0 kết quả trong cả `tay-ninh.json` và `tay-ninh.md` — đã gỡ đúng. |
| 3 | MT Grand Gia Lai | Đã gộp 1 mục "Mường Thanh Grand Gia Lai (tên cũ: Khách sạn Hoàng Anh Gia Lai)", 537 Hùng Vương, TP Pleiku, 0269 3718 450 — đúng. |
| 4 | Hải Châu An Giang | 0296 6260 066, 63 Trương Nguyệt Anh, phường Châu Phú A — đúng. |
| 5 | Cửa Tùng (Quảng Trị) | `cach_trung_tam_km` = "30–35" trong `quang-tri.json` — đúng (app tự thêm "~" khi hiển thị). (Chỉ xác minh file nguồn, chưa kiểm live.) |
| 6 | Động Ngườm Ngao | 45.000đ NL / 25.000đ TE đúng (vietsensetravel.com, phanvantravel.com, divake.com 02/11/2026, north-vietnam.com). Lưu ý: nguồn cũ mytour 07/2025, tripi ghi 40.000/20.000 — file theo đa số nguồn 2026 là đúng. |
| 7 | Pác Bó — xe điện | 20.000đ/người đúng (chỉ vé vào cửa sai — xem 2.1). |
| 8 | MT Luxury Cao Bằng | 42 Kim Đồng, 0206 3888 088 đúng (booking.muongthanh.com). Chỉ sai tên phường (xem 4.1). |
| 9 | Homestay Tít Mít (Cao Bằng) | SĐT 0915 345 200 đúng (travelviet.net: 091 534 52 00). Bổ sung: địa chỉ **10 Đồng Khê, Tân Giang** có sẵn trên travelviet.net — file ghi "chưa kiểm được địa chỉ cụ thể" là thiếu, điền thêm được. |
| 10 | Khách sạn Phố Hiến (Hưng Yên) | SĐT 0221 3862 909 đúng (limoutrip.com, tripi.vn, alltours.vn). Bổ sung: địa chỉ **58 Phạm Ngũ Lão** có sẵn — file chỉ ghi "Khu vực phường Phố Hiến", điền thêm được. |
| 11 | MT Grand Tuyên Quang — SĐT | 0207 3816 688 đúng (số duy nhất chính thức — Báo Tuyên Quang 16/09/2026 về lừa đảo fanpage giả). Chỉ sai phường/tổ (xem 4.1). |
| 12 | Royal Palace Tuyên Quang | 0971 157 157 đúng (số duy nhất chính thức — Báo Tuyên Quang 16/09/2026). |
| 13 | Khách sạn A1 Điện Biên | 3 Hoàng Công Chất, 0215 3952 999, 45 phòng, 550.000–900.000đ đúng (CSDL du lịch quốc gia csdl.vietnamtourism.gov.vn; limoutrip.com; vietmountaintravel.com). File "Từ ~550.000đ" đúng. |
| 14 | MT Grand Điện Biên Phủ | 514 Võ Nguyên Giáp, 0215 3810 043 đúng. Chỉ sai tên phường (xem 4.1). |
| 15 | Vàng A Chỉnh Homestay (Lai Châu) | Bản Sin Suối Hồ, Phong Thổ, 0982 394 333 đúng (tripi.vn 06/2025, mytour.vn, taybac.tv, dulich.laichau.gov.vn, dulichvtv.com 10/2025). Giá file ~400.000–500.000đ/phòng chấp nhận được (dulichvtv: 450.000–600.000đ phòng riêng / 100.000–150.000đ sàn). |
| 16 | Khách sạn Biên Hòa (Đồng Nai) | N30–40 Võ Thị Sáu, phường Thống Nhất, 0922 685 685, từ ~400.000đ/đêm đúng (limoutrip.com; topdongnaiaz.com). |
| 17 | Ecopark Marathon (Hưng Yên) | Ecopark City Trail, race day 07/04/2025, Khu đô thị Ecopark, Văn Giang — đúng theo website chính thức ecoparkmarathon.com. |
| 18 | Đồng Nai Marathon — ngày | "Tháng 11 hằng năm (mùa 2026: 28-29/11/2026)" đúng (Báo Đồng Nai 27/10 + 30/10/2026). Chỉ sai cho_o_gan/diem_chay (xem 3.1). |
| 19 | MT Lai Châu — SĐT | 0213 3790 888 đúng (nhiều nguồn). Chỉ sai địa chỉ (xem 3.4). |

**Tổng đợt 3: 44 mục đã kiểm — 19 đúng, 12 sai cần sửa (3 nặng / 4 trung bình / 5 nhẹ), 12 nợ cũ nay có đáp án để sửa, 1 khoảng trống dữ liệu (mục 7).**

---

## 7. CÒN NỢ CHƯA KIỂM ĐƯỢC (giữ nguyên từ đợt 2, chưa chốt trong đợt này)

1. **Quảng Trị chưa bổ sung điểm Quảng Bình cũ** — vẫn 0 điểm Quảng Bình cũ (13 địa danh, không có Phong Nha/Đồng Hới/Nhật Lệ); khoảng cách vẫn tính từ Đông Hà (lệch ~+100 km khi tính lại từ Đồng Hới, theo đợt 2).
2. **Tọa độ xấp xỉ 189/464 + 8 tọa độ null** — đếm lại 16/11/2026, khớp TONG-HOP mục 12.5. 8 null: Tây Yên Tử + Làng gốm Thổ Hà (Bắc Ninh); Đảo Cò Chi Lăng Nam + Làng gốm Chu Đậu (Hải Phòng); Cồn Vành + Đền Trần Thái Bình (Hưng Yên); Hang Sửng Sốt + Làng chài Cửa Vạn (Quảng Ninh).
3. **5 mục lệch địa chỉ chưa xác minh từng địa chỉ** — Êmm Hotel Huế, Bonjour Hostel, Pù Luông Retreat, Phúc Xuân Resort (Pài Bjooc đã xong trong đợt này — xem 2.3); còn Sài Gòn Kim Liên, MT Bắc Ninh.
4. **Galaxy Thái Nguyên** — chưa đối chiếu (Galaxy River 0208 3930 999 hay Galaxy Hotel Phổ Yên 097 212 12 59).
5. **Giải Tri Tôn Cross Country 14–15/11/2026** chưa nhập vào file An Giang; `cho_o_gan` Tri Tôn còn khách sạn Châu Đốc cách ~45–50 km (cùng lỗi kiểu Đồng Nai Marathon mục 3.1).
6. **Giá phòng gộp Nhà tổ chim / Birdhouse** chưa thống nhất (650k vs 1,2–1,5M) — xem 5.1.
7. **Hưng Yên — `cho_cap_doi.cho_o` trống** (`[]`): mục cặp đôi của Hưng Yên không có chỗ ở nào. Toàn tỉnh chỉ có 7 mục `cho_o`, trong đó 6/7 là mục chung chung không SĐT (chỉ Khách sạn Phố Hiến có số). Tỉnh mỏng, cần bổ sung chỗ ở có SĐT thật.
8. **Chưa kiểm trong đợt này:** Bằng Giang Hotel Cao Bằng (0206 3853 431); giải Hà Giang Discovery Marathon (nay thuộc Tuyên Quang) + THACO Marathon Điện Biên Phủ mùa 2025/2026.
9. **3 lỗi nhỏ đợt vừa sửa + các điểm đợt 2 đã sửa — CHƯA KIỂM LIVE:** Cửa Tùng "~30–35 km", bản đồ Đà Lạt hiện nền + ghim khi mở từ tìm "mưa", dòng dư ngân sách, Cà Mau 18/12/2026, "Victory" = 0, MT Grand Gia Lai, Hải Châu An Giang — tất cả mới chỉ xác minh ở file nguồn. Cần 1 lượt bấm thật trên app live trước khi chốt.

## 8. GỢI Ý BỔ SUNG (không phải lỗi dữ liệu, để parent quyết)

- **Cảnh báo lừa cọc Tuyên Quang:** Báo Tuyên Quang 16/09/2026 (qua baomoi.com) cảnh báo fanpage giả mạo cả MT Grand Tuyên Quang lẫn Royal Palace Tuyên Quang dịp Lễ hội Thành Tuyên 2026 — gợi ý đưa vào mục cảnh báo lừa cọc của Tuyên Quang, vì cả 2 khách sạn này đều là mục đã kiểm trong đợt này.
- **Ghi chú giá Mira:** file đã tự ghi chú mâu thuẫn giá (800k vs 1.411.200đ) — khi sửa phường Tam Hiệp thì chốt luôn giá sàn ~1.000.000đ (mục 3.3).

## 9. QUAN SÁT NGOÀI DỮ LIỆU (ghi lại theo nhiệm vụ, không xác minh độc lập)

- Lượt kiểm vai người dùng 16/11/2026 báo: **tải lại trang trắng ~18 giây mới hiện nội dung** (người không rành có thể tưởng app hỏng). Tôi không kiểm live được nên chỉ ghi lại, không xác minh độc lập — cần người kiểm live đo lại.

---

*Hết báo cáo. Ngày kiểm 16/11/2026. Không sửa bất kỳ file dữ liệu hay app nào trong đợt kiểm này.*
