# BÁO CÁO RÀ SOÁT VAI 3 — CHUYÊN GIA / NGƯỜI ĐỊA PHƯƠNG KIỂM CHỨNG NỘI DUNG
## Dữ liệu app Cẩm nang du lịch — 34 tỉnh (`~/workspace/your_files/du-lieu-34-tinh/`)

- Ngày kiểm: **08/11/2026**. Chỉ rà soát, ghi lỗi — **không sửa file nào**.
- Phạm vi kiểm chéo nguồn công khai: **8 tỉnh** (4 bắt buộc: Cà Mau, Vĩnh Long, Quảng Trị, Phú Thọ + 4 thêm: Hà Nội, Đà Nẵng, Lâm Đồng, An Giang). Mỗi tỉnh kiểm 2–4 mục (giá vé / giờ mở cửa / địa chỉ / tọa độ).
- Mức độ: **chặn dùng** = sai sự thật hoặc sai địa giới, dùng là hại người đọc; **nên sửa** = có nguồn tốt hơn hoặc mâu thuẫn chưa chốt; **ghi chú** = đúng nhưng cần làm rõ / chưa đối chiếu được.

---

## A. LỖI CHẶN DÙNG (4 lỗi)

### A1. Đầm Vân Hội đang nằm sai tỉnh — phải chuyển sang Lào Cai
- File: `phu-tho.md:27` (bảng địa danh) + `phu-tho.md:154` (nhận xét) + `phu-tho.json` (`id: dam-van-hoi`, dòng 241).
- Trong file: địa chỉ "Huyện Trấn Yên cũ / khu vực Hạ Hòa – Trấn Yên, Phú Thọ", tọa độ 21.66, 104.87 (xấp xỉ), cách Việt Trì "~60 km" (dòng 27) nhưng nhận xét dòng 154 lại ghi "~90 km".
- Đúng theo nguồn: Đầm Vân Hội thuộc xã Vân Hội, huyện Trấn Yên cũ, tỉnh **Yên Bái cũ**; sau sắp xếp 01/07/2025, xã Vân Hội + Việt Cường + Việt Hồng thành **xã Việt Hồng, tỉnh Lào Cai mới** (NQ 202/2025/QH15; NQ 1673/NQ-UBTVQH15). Nguồn tra 08/11/2026: vi.wikipedia.org/wiki/Trấn_Yên_(huyện) — "địa bàn huyện Trấn Yên tương ứng với… tỉnh Lào Cai ngày nay", bảng xã Việt Hồng gồm "Xã Việt Cường, Xã Vân Hội, Xã Việt Hồng"; find-law.asia (danh sách 99 xã Lào Cai mới); ghtk.vn.
- File `lao-cai.md` / `lao-cai.json` hiện **không có** Đầm Vân Hội (grep 0 kết quả) → chuyển sang là thêm mới, không trùng lặp.
- Kèm mâu thuẫn nội bộ: 60 km (dòng 27) vs 90 km (dòng 154, và TONG-HOP-34-TINH.md cũng ghi ~90 km).

### A2. Quảng Trị — mốc trung tâm sai + thiếu toàn bộ nửa tỉnh Quảng Bình cũ
- File: `quang-tri.md:6` tự ghi "trung tâm hành chính mới đặt tại Đồng Hới" nhưng toàn bộ khoảng cách, lịch trình (mục 6), chỗ ở (mục 2) đều tính từ **TP Đông Hà**, và 0/13 địa danh thuộc Quảng Bình cũ (không có Phong Nha, Đồng Hới, Nhật Lệ…).
- Đúng theo nguồn: NQ 202/2025/QH15 ngày 12/6/2025 hợp nhất toàn bộ Quảng Bình + Quảng Trị thành tỉnh Quảng Trị mới, diện tích ~12.700 km², **trung tâm chính trị – hành chính đặt tại Đồng Hới**. Nguồn tra 08/11/2026: vietnam.vn, bài "Quảng Trị: Sức bật từ địa giới mới…" (27/10/2026).
- Hậu quả: người dùng ở Đồng Hới thấy mọi khoảng cách sai (Đông Hà–Đồng Hới ~90 km đường bộ). Kết luận: **đổi mốc sang Đồng Hới + bổ sung điểm Quảng Bình cũ**; nếu giữ Đông Hà thì phải ghi rõ phạm vi file chỉ phủ Quảng Trị cũ.

### A3. Sân bay Cà Mau — câu "không đặt vé bay" sẽ thành sai từ 29/11/2026
- File: `ca-mau.md` mục 4 — "Sân bay Cà Mau đang trong thời gian tạm đóng cửa tại thời điểm rà soát tháng 10/2026… không đặt vé bay tới Cà Mau cho tới khi có thông báo mở lại".
- Đúng theo nguồn tra 08/11/2026: sân bay dự kiến **mở lại 29/11/2026**, Vietnam Airlines bay SGN–CAU hàng ngày bằng Airbus A321, giờ bay 12:50–13:55 / 14:50–15:50, vé 924.000–964.000đ. Nguồn: nguoiquansat.vn (09/10/2026), cafef.vn (dẫn TTXVN), traveldailynews.asia (15/10/2026), tapchihangkhong.vn (09/10/2026). Sân bay đóng từ 30/10/2025 để nâng cấp (quyết định Bộ Xây dựng) — phần "tạm đóng" trong file đúng tới 28/11/2026.
- Chưa chốt được: tần suất/loại máy bay — thanhnienviet.vn (26/10/2026) dẫn VASCO nói 2 chuyến/ngày bằng ATR-72, mâu thuẫn với VNA A321 1 chuyến/ngày ở các nguồn trên. Cần kiểm lại sau 29/11, không chốt vội.

### A4. Phú Thọ — câu mở đầu mâu thuẫn với chính dữ liệu trong file
- File: `phu-tho.md:6` — "Tọa độ từng địa danh: CHƯA kiểm được chính xác nên để null trong JSON, không bịa tọa độ."
- Thực tế trong cùng file: bảng mục 1 ghi tọa độ cho mọi điểm (vd Đền Hùng 21.3677, 105.32283 "xấp xỉ", dòng 17) và `phu-tho.json` có lat/lng thật. Câu này sai so với dữ liệu thật → nên sửa thành "tọa độ xấp xỉ, cần kiểm lại" (không null). Xếp "chặn dùng" ở mức nhẹ: câu chữ sai, không phải số liệu sai — nhưng là câu khẳng định sai sự thật về dữ liệu.

---

## B. LỖI NÊN SỬA — GIÁ VÉ / GIỜ MỞ CỬA (đối chiếu được, 08/11/2026)

### Cà Mau
- **B1. U Minh Hạ — chốt được giá 20.000đ.** `ca-mau.md:34` ghi 10.000–20.000đ (mâu thuẫn). NQ 13/2025/NQ-HĐND Cà Mau (hiệu lực 01/01/2026, Công báo Cà Mau số 174/10-12-2025) niêm yết **20.000đ/người/lượt**; hellocamau.vn 29/09/2026 cũng ghi 20.000đ. Nên bỏ mức 10.000đ.
- **B2. Hòn Đá Bạc — bỏ nguồn "miễn phí" không tên.** `ca-mau.md:35` ghi 20.000–25.000đ + "một nguồn ghi miễn phí". Đối chiếu: hellocamau.vn 29/09/2026 ghi 25.000đ; nvktravel.com, tripi.vn, tiphay.vn ghi 20.000đ NL / 10.000đ TE. Không tìm thấy nguồn nào nói miễn phí → nên ghi 20.000–25.000đ và nêu tên nguồn "miễn phí" hoặc bỏ.
- **B3. Nhà Công tử Bạc Liêu — chốt được khoảng 30.000đ + bổ sung giờ.** `ca-mau.md:45` ghi "Khoảng 20.000–30.000đ… chưa kiểm được mức chốt", giờ chỉ "Ban ngày". Đối chiếu: dulich.pro.vn ghi **30.000đ NL / 20.000đ TE, giờ 08:00–17:30**; travelbui.com (cập nhật 29/10/2026) ghi 15.000–30.000đ; một vlog Facebook 25/10/2026 nói 45.000đ NL. Nên sửa thành 30.000đ (ghi rõ mâu thuẫn 45.000đ) + giờ 08:00–17:30.
- **B4. Mũi Cà Mau — ĐÚNG, không lỗi.** `ca-mau.md:26` ghi 30.000đ NL / 15.000đ TE 6–16t / miễn phí ≤6t, xe điện 10.000đ, giờ 6:00–18:00 — khớp NQ 13/2025 (30k/15k, miễn ≤6t) và nucuoimekong.com (6:00–18:00). Ghi chú: buulong.com.vn ghi 50.000đ/30.000đ, giờ 8:00–18:00 — mâu thuẫn với nghị quyết, không dùng.
- **B5. Cua Năm Căn** (`ca-mau.md` mục 3, món 1): giá 150.000–250.000đ/kg vs 350.000–600.000đ/kg — file đã ghi rõ mâu thuẫn theo loại cua/mùa, không đối chiếu thêm được qua tìm kiếm nhanh → giữ nguyên, không lỗi mới.

### Vĩnh Long
- **B6. Vinh Sang — vé cổng ĐÚNG, nhưng sai ngưỡng trẻ em.** `vinh-long.md:29` ghi NL 50.000đ, "trẻ em trên 1,2 m 35.000đ" + nguồn 70.000–100.000đ mâu thuẫn. Đối chiếu website chính thức **vinhsang.com — "BẢNG GIÁ DỊCH VỤ NĂM 2026": NL 50.000đ, TE 35.000đ (dưới 1,3 m)**; nhiều nguồn khác đồng ý 50/35. → Sửa ngưỡng thành "dưới 1,3 m"; nguồn 70.000–100.000đ là cũ/sai, nên bỏ hoặc ghi rõ là nguồn cũ. Combo 11 trò: FB chính thức của KDL (05/07/2026) ghi 179.000đ, phanvantravel.com ghi ~149.000đ — chưa chốt, giữ "chưa kiểm được" cho combo.
- **B7. Nhà cổ Cai Cường** (`vinh-long.md:30`): miễn phí vs 20.000đ — file đã ghi rõ mâu thuẫn, tìm kiếm ngày 08/11 không phân giải được → giữ nguyên, không lỗi mới.

### Quảng Trị
- **B8. Địa đạo Vĩnh Mốc — vé trẻ em chưa thống nhất + địa chỉ hành chính cũ.** `quang-tri.md:19` ghi 50.000đ NL / 25.000đ TE, địa chỉ "Thôn Vĩnh Thạch, xã Vĩnh Linh". Vé NL 50.000đ khớp đa số nguồn 2026 (hoianit.com 07/2026; vietnamtravel.org 09/2026; viator.com). Vé TE: ecotour.com.vn ghi 25.000đ nhưng sovaba.travel (cập nhật 23/05/2026) ghi **20.000đ/trẻ từ 1m2, miễn phí dưới 1m2** → nên sửa thành 20.000–25.000đ, nêu ngưỡng chiều cao. Địa chỉ: ecotour.com.vn 2026 ghi nay thuộc **xã Cửa Tùng** (sau sắp xếp xã) → nên sửa địa chỉ hành chính.
- **B9. Khe Sanh — có thể chốt 50.000đ.** `quang-tri.md:21` ghi "chưa kiểm được… nguồn cũ 20.000–50.000đ". vietnamtravel.org (09/2026) ghi vé Khe Sanh **50.000đ** (cùng mức Vĩnh Mốc, Hiền Lương). Nên cập nhật 50.000đ theo nguồn 09/2026 hoặc giữ "chưa kiểm được" — ghi chú, không chặn.
- **B10. Cầu Hiền Lương — file ghi miễn phí, nguồn 09/2026 ghi thu vé.** `quang-tri.md:20` ghi "Miễn phí (khu di tích ngoài trời)". vietnamtravel.org (09/2026) ghi vé **50.000đ** + audio guide 20.000đ. Mâu thuẫn → nên sửa: ghi rõ khu vực nào thu vé 50.000đ (nhà trưng bày/cầu) thay vì "miễn phí".

### Phú Thọ
- **B11. Đền Hùng — ĐÚNG với đa số nguồn, có 1 mâu thuẫn nhỏ.** `phu-tho.md:17` ghi vào đền 10.000đ NL / TE miễn phí, Bảo tàng 15.000đ, xe điện 15.000–50.000đ, giờ 7:00–18:00 — khớp dulich.pro.vn, hoabinhtourist.com, dulich9.com (cập nhật 07/05/2026). Mâu thuẫn: cinvestratravel.vn và tour.pro.vn ghi "Vé vào tham quan di tích: Miễn phí" (chỉ bảo tàng thu 15k) → nên ghi chú mâu thuẫn này trong file, giữ mức 10k.

### Hà Nội
- **B12. Văn Miếu — ĐÚNG.** `ha-noi.md:20` ghi 70.000đ NL, 35.000đ HS/SV/>60t, tour đêm 199.000đ/99.000đ — khớp kisstour.com (70k, không đổi từ 01/2024; giờ 8:00–17:00) và Viator (tour đêm 199k/99k).
- **B13. Hoàng thành Thăng Long — mâu thuẫn giữa 2 nguồn 2026.** `ha-noi.md:21` ghi 100.000đ "tăng từ 70.000đ từ đầu 2025". daytripsvietnam.com (Vietnam Entrance Fee Index 2026) xác nhận 100.000đ và "nhảy lên 100.000đ đầu 2025" — khớp file. NHƯNG vietnamtourism.com (kiểm tháng 01/2026) ghi **70.000đ**. Chưa chốt tuyệt đối → giữ 100.000đ + ghi chú mâu thuẫn, kiểm quầy vé.
- **B14. Đền Ngọc Sơn** (`ha-noi.md:18`): 50.000đ NL (nguồn cũ 30.000đ) — không đối chiếu riêng ngày 08/11, ghi "chưa kiểm được" mục này (không kết luận sai).

### Đà Nẵng
- **B15. Bà Nà Hills — ĐÚNG, chỉ cần ghi rõ giá niêm yết vs đại lý.** `da-nang.md:17` ghi 950.000–1.000.000đ NL. Đối chiếu: giá niêm yết Sun World 2026 là **1.000.000đ** NL ngoại tỉnh (junglebosstours.com, mytour.vn, vietnambooking.com), đại lý ~950.000đ; vé Đà Nẵng 650.000đ; vé dùng 3 ngày liên tiếp từ 01/01/2026 (file đã ghi đúng, dòng 17 + nhận xét dòng 34).
- **B16. Ngũ Hành Sơn** (`da-nang.md:18`): Thủy Sơn 40.000đ — không đối chiếu riêng ngày 08/11, ghi "chưa kiểm được" mục này.

### Lâm Đồng (Đà Lạt)
- **B17. Dinh Bảo Đại III — file ghi "chưa kiểm được" nhưng giá tra được.** `lam-dong.md:54` ghi "Chưa kiểm được mức vé riêng — hỏi giá tại cổng". Đối chiếu: **60.000đ NL / 40.000đ TE, giờ 7:00–17:30** (newlifetravel.vn 11/2026; lamdongtours.com 2026; tatravel.vn); nhưng nguồn khác ghi 25.000–40.000đ (tatinta.com 08/11/2026 ghi 30.000đ; soctrangtourism.vn 30.000đ). Nên sửa: bổ sung khoảng **30.000–60.000đ** + giờ 7:00–17:30, ghi rõ mâu thuẫn. Địa chỉ 1 Triệu Việt Vương trong file là đúng (một số nguồn ghi sai thành 12 Hoàng Diệu / Nguyễn Thị Minh Khai — đó là nhầm với Dinh I/II).
- **B18. Langbiang jeep / cáp treo Robin** (`lam-dong.md:31,40`): file đã ghi rõ mâu thuẫn (jeep 100.000–120.000đ vs ~200.000đ; cáp treo 80.000đ/chiều vs 120.000đ khảo sát 16/10/2026) → giữ nguyên, không lỗi mới.

### An Giang
- **B19. Trà Sư — combo trong file thấp hơn nguồn mới nhất.** `an-giang.md:29` ghi vé 120.000đ + tàu máy 60.000đ + xuồng 60.000đ, trọn gói ~200.000–240.000đ. Đối chiếu: phetravel.com 100.000 + 50.000 + 50.000 = combo 200.000đ; **sundaygo.vn (giá điều chỉnh 07/2026): 120.000 + 70.000 + 70.000 = combo 260.000đ**; buulong.com.vn 150.000đ cổng. Nên sửa khoảng combo thành **200.000–260.000đ**, ghi rõ 3 mức cổng 100/120/150k.
- **B20. Núi Cấm cáp treo — ĐÚNG.** `an-giang.md:30` ghi khứ hồi 300.000đ NL / 200.000đ TE, lên 180k, xuống 120–140k, vé cổng 20k/10k, cáp 7:00–17:00 — khớp dulich.pro.vn (300k/200k; lên 180k; xuống 120k). (Giá 350.000đ trong tour dulichdemen.vn là giá tour, không tính.)

---

## C. CHỖ Ở — CHỮ "UY TÍN" / "ĐẢM BẢO"

- **Kết quả tốt:** toàn bộ mục chỗ ở trong 34 file đều ghi "chưa kiểm chứng / chưa đối tác / chưa thu phí", **không có chỗ ở nào** dùng chữ uy tín/đảm bảo để bảo chứng. Quy tắc chung được giữ ở mục chỗ ở.
- **Còn sót trong Nhận xét món ăn (`nhan_xet_cua_m`) — 9 vị trí .md + 9 vị trí .json, ở 5 tỉnh** (đếm bằng script, đã loại các dòng disclaimer "Không dùng chữ uy tín/đảm bảo" và "blog du lịch uy tín"):
  - `thai-nguyen.md:166` + `thai-nguyen.json:599` — Chè Tân Cương: "Nên mua ở cửa hàng uy tín hoặc tại đồi chè."
  - `quang-ninh.md:235,241` + `quang-ninh.json:472,611` — Chả mực: "nên mua ở cửa hàng uy tín"; Sá sùng/sam: "nên ăn ở nhà hàng lớn có uy tín."
  - `bac-ninh.md:232` + `bac-ninh.json:504` — Gà Hồ: "phải đặt trước ở nhà hàng uy tín…"
  - `hung-yen.md:224,229` + `hung-yen.json:454,554` — Gà Đông Tảo: "Nên ăn ở nhà hàng uy tín…"; Gỏi cá mòi: "phải ăn ở quán uy tín…"
  - `ninh-binh.md:221,223` (+1 vị trí nữa trong file, tổng 3) + `ninh-binh.json` (3 vị trí) — Thịt dê: "nên ăn ở nhà hàng lớn có uy tín"; Gỏi cá nhệch: tương tự.
  - `lai-chau.json:72` — chữ "đảm bảo" trong `luu_y` Cầu kính Rồng Mây: "an toàn tạm thời được đảm bảo" (trích văn bản doanh nghiệp, không phải cam kết của app).
- Đánh giá: đây là **lời khuyên chung chung, không gắn với cơ sở cụ thể nào** — không bảo chứng cho một quán/khách sạn nào. Mức **ghi chú**: vi phạm chữ của quy tắc chung, nên sửa thành "nên mua ở cửa hàng có tên tuổi, hỏi giá trước" hoặc tương đương. Không chặn dùng.

---

## D. "NHẬN XÉT CỦA M" — NGUỒN + NGÀY KIỂM, SỐ SAO

- **Cấu trúc ĐÚNG:** kiểm 8/8 file mẫu (Cà Mau, Vĩnh Long, Quảng Trị, Phú Thọ, Hà Nội, Đà Nẵng, Lâm Đồng, An Giang) — mọi `nhan_xet_cua_m` trong JSON đều có đủ `{nhan_xet, nguon_tham_khao, ngay_kiem: 06/11/2026}`; bản .md cũng ghi "(Nguồn tham khảo: …; ngày kiểm: 06/11/2026)" từng mục. Không thiếu nguồn/ngày ở file mẫu.
- **Số sao/đánh giá số — 8 con số x/5 trong 8 file .md, đều có ghi nguồn, nhưng chưa đối chiếu độc lập được ngày 08/11/2026:**
  1. `quang-tri.md:35` — Vĩnh Mốc: "TripAdvisor chấm 4,6/5". Tra 08/11: Viator ghi tour Vĩnh Mốc 5.0 (1.245 đánh giá) — đó là điểm tour Viator, **không phải** điểm TripAdvisor của địa điểm → **chưa kiểm được** con số 4,6/5.
  2. `da-nang.md:40` — Mỹ Sơn: "TripAdvisor chấm 4,2/5 với 3.715 review" — con số đếm 3.715 chưa đối chiếu được → **chưa kiểm được**.
  3. `khanh-hoa.md:205` — VinWonders Nha Trang: "TripAdvisor 4.2/5" — có ghi nguồn + ngày kiểm, chưa đối chiếu độc lập → ghi chú.
  4. `dak-lak.md:33` — Bảo tàng Cà phê: "TripAdvisor chấm 3,4/5" — như trên, ghi chú.
  5. `can-tho.md:90` — Mỹ Khánh: "được đánh giá 4.0/5 trên Google Maps với hơn 6.000 lượt đánh giá" — con số 6.000+ chưa đối chiếu được → **chưa kiểm được**.
  6. `cao-bang.md:194` — Làng rèn Phúc Sen: "Google Maps (4.1/5)" — có ghi nguồn + ngày kiểm, chưa đối chiếu độc lập → ghi chú.
  7. `hung-yen.md:217` — Cồn Vành: "Google Maps ghi khoảng 3.8–3.9/5 theo các trang tổng hợp" — nguồn mơ hồ ("các trang tổng hợp" không nêu tên) → **nên sửa**: nêu tên trang hoặc bỏ con số.
  8. `lai-chau.md:179` — Pu Sam Cáp: "có tour chấm 4.9/5 (chỉ 7 đánh giá nên chưa đủ tin)" — file **tự ghi rõ hạn chế** → không lỗi, làm gương tốt.
- Kết luận mục D: **không phát hiện con số sao nào bịa trơn** (mọi con số đều kèm tên nguồn + ngày kiểm 06/11/2026); nhưng điểm số TripAdvisor/Google thay đổi theo thời gian và 3 con số cụ thể (4,6/5 Vĩnh Mốc; 3.715 review Mỹ Sơn; 6.000+ lượt Mỹ Khánh) chưa đối chiếu được độc lập ngày 08/11 → trước khi hiển thị trong app nên kiểm trực tiếp TripAdvisor/Google Maps hoặc bỏ số đếm, chỉ giữ nhận định định tính.

---

## E. KẾT LUẬN 2 CÂU HỞ

### (a) Quảng Trị — trung tâm hành chính mới ở Đồng Hới hay vẫn Đông Hà?
- **Kết luận: Đồng Hới.** NQ 202/2025/QH15 (12/6/2025) hợp nhất Quảng Bình + Quảng Trị, trung tâm chính trị – hành chính đặt tại Đồng Hới (nguồn: vietnam.vn 27/10/2026). Dữ liệu hiện tính từ **Đông Hà** (quang-tri.md:6, mục 1, mục 6) và không có điểm Quảng Bình cũ nào.
- Đề xuất vai 3: đổi mốc tính khoảng cách sang Đồng Hới và bổ sung điểm Quảng Bình cũ (Phong Nha – Kẻ Bàng, Đồng Hới, Nhật Lệ, hang Sơn Đoòng theo khả năng); nếu chưa làm thì ghi rõ trên đầu file: "File này chỉ phủ khu vực Quảng Trị cũ, trung tâm Đông Hà — chưa gồm Quảng Bình cũ".

### (b) Đầm Vân Hội — có nên chuyển từ Phú Thọ sang Lào Cai?
- **Kết luận: CÓ, chuyển sang Lào Cai.** Đầm Vân Hội thuộc xã Vân Hội, huyện Trấn Yên cũ, tỉnh Yên Bái cũ → nay là xã Việt Hồng, tỉnh Lào Cai mới (NQ 202/2025/QH15 + NQ 1673/NQ-UBTVQH15; nguồn: vi.wikipedia.org/wiki/Trấn_Yên_(huyện), find-law.asia, ghtk.vn — tra 08/11/2026). File Phú Thọ ghi sai tỉnh ("…Trấn Yên, Phú Thọ", phu-tho.md:27) và sai khoảng cách nội bộ (60 km vs 90 km). File Lào Cai hiện chưa có điểm này nên chuyển là thêm mới, không trùng. Sau khi chuyển, sửa khoảng cách Việt Trì → đầm theo đường bộ thật (kiểm lại bằng bản đồ; con số 90 km trong nhận xét có vẻ gần đúng hơn 60 km, nhưng chưa đo độc lập).

---

## F. MỤC CHƯA KIỂM ĐƯỢC (đã thử, không chốt ngày 08/11/2026)

- Tọa độ mốc GPS 0001 Mũi Cà Mau thật (file ghi 8.59973, 104.75603 và tự nhận là geocode mức xã Đất Mũi — chưa đối chiếu được tọa độ mốc thật).
- Tần suất/loại máy bay SGN–CAU sau 29/11/2026 (VNA A321 1 chuyến/ngày vs VASCO ATR-72 2 chuyến/ngày).
- Giá vé Đền Ngọc Sơn 50.000đ (ha-noi.md:18) và Ngũ Hành Sơn Thủy Sơn 40.000đ (da-nang.md:18) — chưa đối chiếu riêng.
- Giá vé Cồn Cỏ, giá tàu ra đảo; giờ mở cửa chính xác nhiều điểm Quảng Trị — file đã tự ghi "chưa kiểm được" trong mục 9, không lặp lại ở đây.
- Các con số sao/đếm review ở mục D (điểm 1, 2, 5).

---

## G. TỔNG KẾT ĐẾM

- Tỉnh kiểm chéo: 8/34 (Cà Mau, Vĩnh Long, Quảng Trị, Phú Thọ, Hà Nội, Đà Nẵng, Lâm Đồng, An Giang).
- Mục kiểm đối chiếu: ~22 mục (giá vé/giờ/địa chỉ/tọa độ).
- Kết quả: ĐÚNG 6 mục (Mũi Cà Mau, Văn Miếu, Bà Nà Hills, Núi Cấm cáp treo, Đền Hùng cơ bản, Vinh Sang vé cổng) — chi tiết ở mục B; CHẶN DÙNG 4 lỗi (A1–A4, trong đó A4 là câu chữ); NÊN SỬA ~10 mục (B1–B3, B6, B8–B11, B13, B17, B19); GHI CHÚ: chữ "uy tín" 18 dòng/5 tỉnh + 8 con số sao.
- Nhận xét chung vai 3: dữ liệu trung thực ở chỗ **ghi rõ mâu thuẫn và "chưa kiểm được"** thay vì chốt số giả (điểm mạnh nhất của đợt này); lỗi nặng nhất tập trung ở **địa giới sau sáp nhập 01/07/2025** (Quảng Trị, Đầm Vân Hội) và **thông tin hết hạn theo thời gian** (sân bay Cà Mau mở lại 29/11/2026) — hai loại lỗi mà kiểm tra giá vé đơn lẻ không bắt được.
