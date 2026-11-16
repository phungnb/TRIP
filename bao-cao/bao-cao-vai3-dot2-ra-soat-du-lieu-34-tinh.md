# BÁO CÁO VAI 3 — ĐỢT RÀ SOÁT 2 (sau khi sửa lỗi đợt 1)
**Ngày kiểm: 08/11/2026. Vai: chuyên gia / người địa phương kiểm chứng dữ liệu.**
**Phạm vi:** 8 tỉnh mẫu (Lâm Đồng, Hà Nội, Quảng Trị, Cà Mau, Quảng Ninh, Lào Cai, Gia Lai, An Giang) + các mục xuyên tỉnh (Victory Tây Ninh, 7 cặp trùng lặp, 17 mục lệch địa chỉ, lỗi đợt 1). Chỉ đọc file + tra nguồn công khai bằng web search, KHÔNG sửa file nào, KHÔNG mở trình duyệt.
**Phương pháp:** 4 agent kiểm chéo song song (mỗi agent 2 tỉnh, kiểm toàn bộ SĐT chỗ ở + 8 mục mới bước 1/2) + tôi tự kiểm các mục xuyên tỉnh.

## KẾT LUẬN CHUNG
**CHƯA đủ tin để giữ public nguyên trạng — còn lỗi nặng phải sửa trước.** Phần lớn SĐT (~90% mẫu kiểm) và các mục cảnh báo/giải chạy/đèo đã đúng, khung dữ liệu tốt — nhưng các lỗi nặng đều nằm đúng ở thông tin hành động trực tiếp (đặt phòng, đặt vé, tìm đường), tức chỗ người dùng tin nhất. Ưu tiên sửa: (1) sân bay Cà Mau; (2) gỡ Victory Hotel Tây Ninh; (3) gộp 5 cặp trùng + sửa địa chỉ sai; (4) sửa SĐT sai cơ sở + bổ sung số khẩn cấp riêng còn thiếu; (5) cập nhật giải Quy Nhơn + chỗ ở gần giải.

## A. LỖI MỚI — NẶNG (phải sửa trước)

### A1. Sân bay Cà Mau — toàn bộ mục hết hiệu lực (nặng nhất)
- File ghi: mở lại 29/11/2026, VNA + Vietjet bay từ ngày đó.
- **Đúng: ACV có văn bản ngày 06/11/2026 gửi UBND tỉnh Cà Mau, lùi khai thác trở lại đến 0h ngày 18/12/2026** (mưa lớn tháng 10/2026 + thiếu vật liệu; bay hiệu chuẩn 26/11). Nguồn: vietnam.vn 06/11/2026; baotintuc.vn 06/11/2026 18:52; nguoiquansat.vn 07/11/2026. Lịch bay mới sau 18/12 chưa có nguồn nào công bố — chưa tra được.
- Vietjet HAN–CAU: file ghi thứ 2, 4, 6, bay ~2h05. **Đúng: thứ 3, 5, 7; VJ591 HAN 10:00 → CAU 12:15, VJ592 CAU 12:45 → HAN 15:00, A320, bay 2h15**; khai thác thường lệ từ 30/11/2026 (chuyến khai trương 29/11). Nguồn: AeroRoutes 02/11/2026 + thông báo Văn phòng miền Bắc Vietjet 01–03/11/2026. Giá khứ hồi ~2,4 triệu đồng thì ĐÚNG (2.263.000đ/khứ hồi).
- "VNA dự kiến mở HAN–CAU hàng ngày": **không có cơ sở, gần như chắc chắn sai.** Không nguồn tiếng Việt nào xác nhận. Nguồn duy nhất là bản tiếng Anh tapchihangkhong.vn ghi HAN 12:50 → CAU 13:55 — trùng y hệt giờ SGN–CAU, mà HAN–CAU ~1.344 km không thể bay trong 65 phút → lỗi copy của nguồn đó. Các nguồn Việt đều ghi HAN–CAU chỉ có Vietjet; VNA chỉ bay SGN–CAU.
- VNA SGN–CAU: nội dung ĐÚNG theo kế hoạch cũ (A321 thay ATR-72, hàng ngày, SGN 12:50 → CAU 13:55, CAU 14:50 → SGN 15:50, vé 924.000–964.000đ/chiều — nguoiquansat.vn 04/11/2026), nhưng ngày đã lùi; giá sau 18/12 chưa rõ (đại lý Facebook rao 1.165.000–1.200.000đ/chiều, mâu thuẫn). Tạm đóng từ 30/10/2025 7h thì ĐÚNG.

### A2. Victory Hotel Tây Ninh đã đóng cửa nhưng file vẫn giới thiệu (nặng)
- **Đúng: fanpage chính thức đăng "THÔNG BÁO DỪNG VẬN HÀNH" ngày 30/07/2026, dừng hoạt động từ 30/07/2026**, khách chuyển sang Sunrise Hotel Tây Ninh, 81 Hoàng Lê Kha. Nguồn: Facebook Victory Hotel Tây Ninh, đăng 30/07/2026.
- File `tay-ninh.json` vẫn còn nguyên 2 chỗ: trong `cho_o` (SĐT 0276 3717 888, giá ~909.300đ/đêm, "Chưa kiểm chứng") VÀ trong `cho_cap_doi.cho_o` (gợi ý cho cặp đôi). `tay-ninh.md` dòng 58 + 77 cũng còn.

### A3. Trùng lặp 1 cơ sở còn nguyên — 5 cặp chắc chắn (nặng)
| Cặp trùng | Bằng chứng |
|---|---|
| MT Grand Gia Lai = Hoàng Anh Gia Lai cũ | Cùng SĐT 0269 3718 450; HAGL đổi biển 09/09/2024, Mường Thanh tiếp quản 08/2024 (Vietcap 11/09/2024); iVivu ghi rõ "Khách sạn Hoàng Anh Gia Lai cũ" |
| Four Points by Sheraton Lạng Sơn = Vinpearl Lạng Sơn cũ | Cùng SĐT 0205 3782 999; đổi tên 2022 (vinpearl.com 22/06/2022) |
| Royal Palace = Royal Tuyên Quang Hotel | Cùng SĐT 0971 157 157 |
| Thảo Nguyên Resort = Thảo Nguyên Hotel (Mộc Châu) | Cùng SĐT 0212 3869 666, cùng khu Phiêng Luông |
| SOJO Việt Trì = Tru by Hilton Việt Trì | Cùng SĐT 0210 3636 555 |
- Nghi trùng: Him Lam Điện Biên 2 mục cùng địa chỉ Tổ 6, phường Him Lam (SĐT khác nhau 0215 3811 856 / 0215 3811 666).
- Nhà tổ chim = Birdhouse Bungalow (Lai Châu): cùng SĐT 0347 665 311 nhưng 2 địa chỉ khác nhau (Sin Suối Hồ, Phong Thổ vs Vàng Pha, Sìn Hồ) — 1 trong 2 địa chỉ sai, chưa tra được cái nào đúng.
- Đã gộp đúng: MT Luxury/Holiday Mộc Châu đã là 1 mục trong file — không còn lỗi.
- Hệ quả lan: trùng lặp lan sang `cho_nguoi_chay_giai.cho_o_gan` (liệt kê cả 2 tên như 2 khách sạn khác nhau, vd giải Quy Nhơn).

### A4. SĐT sai cơ sở / mục sai cơ sở (nặng)
- Sơn Thủy Homestay (Quảng Trị): số 0975 617 365 trong file là số Google Travel của **Mũi Si Homestays cửa tùng**, không phải Sơn Thủy. Sơn Thủy là cơ sở riêng (chủ Lê Sỹ Huế, 7 phòng — Báo Quảng Trị/Tuổi Trẻ 01/08/2023); SĐT riêng chưa tra được. Địa chỉ "thị trấn Cửa Tùng" cũng chưa chính xác.
- Khách sạn Hải Châu (An Giang): số file 0296 3897 897 không nguồn nào khớp (tra chuỗi chính xác ngày 08/11/2026: 0 kết quả liên quan). **Số đúng theo 2 nguồn: 0296 6260 066**, địa chỉ 63 Trương Nguyệt Anh (1 nguồn ghi Sương Nguyệt Anh), phường Châu Phú A, Châu Đốc (kenhhomestay.com; dulichvietnam.com.vn).
- Khách sạn Hương Giang (Hà Nội): không tìm thấy cơ sở nào tên Hương Giang ở Đống Đa/gần Văn Miếu (các cơ sở cùng tên đều ở chỗ khác: Sao Mai–Hương Giang 187 Lò Đúc; Hương Giang Hotel & Apartment 30C Hạ Hồi; DNTN Khách sạn Hương Giang 39 ngõ 172 Ngọc Hà). File để `null` là đúng, nhưng **bản thân mục có thể sai cơ sở** — nguồn buulong.com.vn có thể gán nhầm tên hoặc cơ sở đã đổi tên/ngừng hoạt động.

### A5. Địa chỉ sai (nặng)
| Mục | File ghi | Đúng theo nguồn |
|---|---|---|
| MT Grand Gia Lai | 37 Hùng Vương, Pleiku | **537 Hùng Vương** (muongthanh.com chính thức; iVivu; Chudu24). Lưu ý: chính booking.muongthanh.com có chỗ ghi "37 Hùng Vương" — nguồn nội bộ Mường Thanh mâu thuẫn nhau, nhưng danh sách chính thức ghi 537 |
| Khách sạn Pleiku | Đường Hùng Vương – Nguyễn Văn Trỗi | **03 Nguyễn Tất Thành, phường Hoa Lư, Pleiku** (tadiha.com; tripi.vn; mytour.vn). Nghi lẫn với Khách sạn Pleiku & EM (86 Nguyễn Văn Trỗi, 0269 3760 777) |
| Khách sạn Tre Xanh (Pleiku) | Đường Trần Hưng Đạo | **18 Lê Lai, Pleiku** (Google Travel; Sở VHTTDL Gia Lai) |
| Hữu Nghị (Quảng Trị) | 74 Lê Duẩn | **68 Trần Hưng Đạo, Phường 1, TP Đông Hà** (limoutrip.com 07/11/2026; tripi.vn; mytour.vn). File đã tự ghi chú trong `nguon_dien_thoai` nhưng chưa sửa `dia_chi` |
| Khách sạn Nam Đông Hà (Quảng Trị) | Tên "Nam Đông Hà", đường Hùng Vương, SĐT null | Tên đúng **Khách sạn Nam Đông**; **348 Lê Duẩn, Phường Đông Lễ, TP Đông Hà**; SĐT **0233 3854 531** (tripi.vn; nhadatquangtri.vn; limoutrip.com 07/11/2026) |
| Hải Châu (Cà Mau) | 299 Hùng Vương | **229 Hùng Vương, Phường 7** (Google Travel; hellocamau.vn: "Địa chỉ mới: 229 Hùng Vương"). Số 299 chỉ ở nhóm tadiha/cattour/vietfuntravel copy nhau |
| Mường Thanh Luxury Cà Mau | Phường 9 (1 nguồn ghi Phường An Xuyên) | **Phường An Xuyên** (địa chỉ thuế chính thức cập nhật 07/11/2026, masothue.com; muongthanh.com) |
| Hotel Continental Saigon | 142–144 Đồng Khởi | **132–134 Đồng Khởi** (Wikipedia; Expedia; Trivago) |
| Mường Thanh Luxury Phú Thọ | Đường Trần Phú, phường Gia Cẩm | **Lô CC17, Quảng trường Hùng Vương** (web Mường Thanh; Sở Du lịch Phú Thọ; Trip.com). SĐT 0210 3616 666 thì đúng |
| ÊMM Saigon | Tên "ÊMM Saigon Hotel" (157 Pasteur đúng) | Đã đổi tên thành **G8 Center Hotel Saigon từ 02/06/2026** (bài đăng G8 Center Hotel Saigon 02/03/2026; Tripadvisor đã đổi tên) |
| Phi Mai Hotel (An Giang) | "Gần chợ Châu Đốc" | **Tổ 7, đường Lê Đại Cương, khóm Vĩnh Đông 2, phường Núi Sam** — khu Núi Sam, cách chợ Châu Đốc ~6–7 km, không phải gần chợ (leadtour.vn; traveloka.com; iVivu) |
| Nam Kiều (Cà Mau) | 132 Ngô Quyền (1 nguồn ghi 151A) | Mâu thuẫn chưa ngã ngũ: 132 (CSDL du lịch quốc gia; hellocamau.vn) vs 151/151A (dulichcamau.info; vietnamtourism.com.vn). File đã ghi chú mâu thuẫn — giữ cảnh báo, nghiêng về 132 |

### A6. Giải chạy lỗi thời + chỗ ở "gần" không hề gần (nặng)
- VnExpress Marathon Quy Nhơn: file "Tháng 6 hằng năm (mùa 2025: 15/6/2025)". Mùa 2025 đúng (15/6/2025, ~12.000 VĐV — TTXVN). Nhưng **mùa 2026 đã dời sang 13/9/2026, tạm dừng cự ly 42 km, chỉ còn 5/10/21 km, ~8.000 VĐV, đã diễn ra xong** (VnExpress 12/8/2026 + 14/9/2026; Báo Gia Lai 08/09/2026; UBND tỉnh Gia Lai công văn 10456). "Tháng 6 hằng năm" sai với 2026; chưa có công bố mùa 2027.
- `cho_o_gan` giải Quy Nhơn liệt kê Mường Thanh Grand Gia Lai + Hoàng Anh Gia Lai — đều ở Pleiku, **cách điểm xuất phát Quảng trường Nguyễn Tất Thành (Quy Nhơn) ~160 km**. Phải thay bằng khách sạn ở Quy Nhơn. (Khoảng cách ~160 km thì đúng ở mức xấp xỉ: 162 km QL19; nên ghi "162–170 km, 3,5–4 giờ".)
- Marathon Cà Mau: `cho_o_gan` là Mường Thanh Luxury + Ánh Nguyệt ở TP Cà Mau, cách điểm xuất phát Quảng trường Hùng Vương (phường Bạc Liêu) **~60 km**. Chỗ ở gần phải tìm ở TP Bạc Liêu.
- Tri Tôn (An Giang): file "Tháng 1 hằng năm (mùa 2025: 4–5/1/2025)" đúng cho 2025, nhưng **không tìm được mùa tháng 1/2026** → "hằng năm" chưa chứng minh được cho 2026. Bổ sung: giải **Tri Tôn Cross Country 2026** (5/12/21/45 km + xe đạp địa hình 35 km) dự kiến **14–15/11/2026**, ~1.850 VĐV (Báo An Giang 06/11/2026).

### A7. Cửa Tùng cách Đông Hà sai (trung bình–nặng)
- File ghi 20 km (2 chỗ: `dia_danh.cach_trung_tam_km` và `cho_o` "cách Đông Hà ~20 km"). **Đúng: ~30–35 km** (vmstyle.vn: 35–40 km; ancotnam.vn, vntrip.vn, leadtour.vn: 35 km; travelviet.net: ~30 km). Các khoảng cách khác từ Đông Hà kiểm mẫu đều ĐÚNG: Thành Cổ 14, Vĩnh Mốc 35, Khe Sanh 65, Cửa Việt 15, La Vang 15, Nghĩa trang Trường Sơn 25, cầu Đakrông 55 km.

### A8. Đèo Sa Mù sai tuyến đường (trung bình)
- File ghi "quốc lộ 9". **Đúng: đường Hồ Chí Minh nhánh Tây**, nối xã Hướng Phùng – Hướng Việt (Hướng Hóa), cách Khe Sanh ~35 km theo đường HCM Tây (sknc.qdnd.vn 17/07/2026; mytour.vn). Mô tả còn lại ĐÚNG: cao ~1.400 m, dài ~20 km, sương mù dày đặc, tên từ suối Xê Samu. File ghi "chưa tra được bài báo riêng" là trung thực.

### A9. `cho_cap_doi.cho_o = []` ở Quảng Trị + Cà Mau sai về thực chất (trung bình)
- File chỉ đúng theo nghĩa "chưa gắn tag cặp đôi cho chỗ ở nào trong danh sách". Thực tế: Quảng Trị — Traveloka mô tả Mường Thanh Grand Quảng Trị là "perfect choice for couples seeking a romantic getaway or a honeymoon retreat"; boki.vn liệt kê 8 homestay cho cặp đôi ở Đông Hà. Cà Mau — Traveloka/Hotels.com xếp Mường Thanh Luxury Cà Mau là khách sạn lãng mạn cho cặp đôi; phòng Deluxe King/Grand Suite ghi "Best for couples, honeymooners". Tối thiểu Mường Thanh ở mỗi tỉnh phải được đưa vào `cho_o`.

## B. LỖI MỚI — TRUNG BÌNH / NHẸ

### B1. Giờ chụp ảnh sai theo mùa / mâu thuẫn nội bộ
- Hạ Long hoàng hôn: file "17:30–18:30 hoàng hôn trên du thuyền". Tháng 11 mặt trời lặn **17:12** (weather.com 08/11/2026: mọc 5:57, lặn 17:12) — khung 17:30–18:30 đã tối hẳn vào tháng 11 (mùa đẹp nhất 9–11 mà file khuyên đi); giờ vàng thực tế tháng 11 khoảng 16:30–17:30. Khung 17:30–18:30 chỉ đúng mùa hè. Bình minh 5:30–7:00 đúng cho tháng 11, nhưng "bình minh không muộn hơn 6h" sai vào mùa đông (mặt trời mọc ~6:30). Nên ghi giờ theo mùa.
- Cầu Đất săn mây: file "4:30–6:00 săn mây". **Đúng: xuất phát 4:00–4:30, mây đẹp 5:00–6:30** (hoadalattravel.vn; caonguyentourist.com; newlifetravel.vn). 4:30 là giờ xuất phát, không phải giờ săn mây; 6:00–6:30 vẫn còn mây đẹp. Mùa mây tháng 8–12 thì khớp.
- Trà Sư mâu thuẫn nội bộ: `gio_dep_chup_anh` 7:00–9:00 và 15:30–17:00 vs `dia_danh.luu_y` 6:00–9:00 và 15:00–17:00. Khung 7–9h/15:30–17h ĐÚNG (Klook: "Đi sớm từ 7h đến 9h hoặc chiều 15h30 đến 17h là lúc rừng đẹp nhất") — thống nhất theo khung này.
- Chư Đăng Ya hoa dã quỳ mâu thuẫn nội bộ: `dia_danh` + `meta.best_season` "tháng 10–11" vs `gio_dep_chup_anh` "tháng 11–12". Đúng: hoa nở **cuối tháng 10 đến đầu tháng 11, rộ 2–3 tuần**; Tuần lễ Hoa Dã quỳ 2026 diễn ra 30/10–8/11/2026 (Tuổi Trẻ). Thống nhất "cuối tháng 10 – đầu tháng 11".
- Đèo Bảo Lộc "~10 km": nguồn chia đôi 10 km vs 15 km → ghi "10–15 km (các nguồn ghi khác nhau)". Số 107 khúc cua thì ĐÚNG.
- Đèo An Khê "rơi xuống vực sâu khoảng 30–40 m": nguồn nói **"khoảng 40 m" / "hơn 40 m"** (VOV + Thanh Niên 11/5/2026, Km61+100 QL19, ~22h55 ngày 10/5/2026, 1 chết 11 bị thương). Sửa thành "khoảng 40 m".
- Đà Lạt đêm tháng 11 "13–16°C": ngày 20–25°C khớp nhiều nguồn; đêm điển hình **14–16°C**, 13°C chỉ gặp ngày mưa (vinwonders.com). Nên ghi đêm 14–16°C.

### B2. `khi_troi_mua` thiếu / liệt kê điểm không thực tế
- Lào Cai chỉ 2 điểm là THIẾU: bỏ sót Bảo tàng Sa Pa (trong nhà), chợ Sa Pa (có mái), quán cà phê trung tâm, Sun Plaza. Dinh Hoàng A Tưởng ở Bắc Hà, cách Sa Pa ~70 km — không phải điểm trú mưa thực tế cho khách ở Sa Pa, file không kèm cảnh báo khoảng cách. Nhà thờ đá chỉ trú được khi mở cửa làm lễ.
- Gia Lai liệt kê Quảng trường Đại Đoàn Kết làm điểm trú mưa — quảng trường ngoài trời, không mái che; "bảo tàng ở quảng trường" chưa tra được tên cụ thể.
- An Giang liệt kê Chùa Hang — nằm trên sườn núi, phải leo bậc đá, ngoài trời một phần.
- Quảng Ninh liệt kê Hang Sửng Sốt — chính `dan` của file nói mưa to/bão thì tàu cấm chạy, tức hang không tới được khi mưa to. Nên bỏ.

### B3. `so_khan_cap.rieng` để trống trong khi có số riêng chính thức (trung bình)
- Gia Lai: **đường dây nóng du lịch 0932 40 42 46** (Sở VHTTDL Gia Lai; UBND phường Pleiku vận động >100 cơ sở công khai số này, 31/10/2026). Thêm: QLTT Gia Lai 0913 469 475, Ban Chỉ đạo 389 tỉnh 0977 666 389 / 0978 666 389.
- An Giang: **Sở Du lịch An Giang 02973 781 999 / 02973 504 569** (sdl.angiang.gov.vn, trang liên hệ chính thức); Phòng Truyền thông – Hỗ trợ khách du lịch, Trưởng phòng 0941 277 879. (Số VnExpress cũ 0911 575 911 / 0969 536 584 từ ~2016 chưa kiểm được còn hiệu lực — không nên đưa vào.)
- Lào Cai: thiếu **Bệnh viện Đa khoa Sa Pa** (đường Điện Biên Phủ, ngay thị trấn) — BVĐK số 1 Lào Cai trong file ở xa Sa Pa. Hotline BVĐK Sa Pa 096 797 14 14 theo nguồn 2024, chưa xác minh được số hiện hành — cần xác minh thêm trước khi đưa vào.
- Quảng Trị/Cà Mau để `rieng: []` là ĐÚNG — không tra được số đường dây nóng du lịch chính thức nào của 2 tỉnh này.
- Quảng Ninh: file chỉ ghi 1 số BVĐK tỉnh 0203 3825 489, thiếu 0203 3825 499 (bvlvpqn.vn + Sở Y tế Quảng Ninh).

### B4. Diễn đạt gây hiểu lầm — vụ lừa cọc Quảng Ninh
- File: "một vụ ở Quảng Ninh chiếm đoạt khoảng 100 triệu đồng". Đúng: Phạm Trung Anh (SN 1993, Vĩnh Bảo, Hải Phòng) bị Công an tỉnh Quảng Ninh khởi tố + tạm giam, tội "Lừa đảo chiếm đoạt tài sản" (Nhân Dân 05/08/2023). Nhưng **100 triệu là tổng của nhiều bị hại từ tháng 6/2022 đến nay**; vụ tố giác cụ thể chỉ **8,86 triệu đồng** (chị Đ.T.N.A, đặt 6 phòng + 11 vé tàu đi **Cô Tô**, 12/06/2023). Nên sửa thành "nhiều vụ lừa đặt phòng ở Cô Tô, tổng khoảng 100 triệu đồng, đối tượng đã bị khởi tố". Đường dây nóng du lịch Quảng Ninh 0913 265 009 trong cùng mục thì ĐÚNG.

### B5. Mâu thuẫn nội bộ + nghi vấn đổi tên (nhẹ–trung bình)
- Quảng Trị: `meta.best_season` "Tháng 3–8" vs `mua_thang` "Tháng 3–5" — thống nhất 1 khung.
- Trung Nguyễn (86 Bạch Đằng, Châu Đốc): SĐT 0296 3561 561 và địa chỉ đúng, nhưng danh sách cơ sở lưu trú của **Sở Du lịch An Giang ngày 27/07/2026** ghi tại 86 Bạch Đằng là khách sạn **"The CK"**, cùng số 02963561561 — nghi đổi tên, cần xác minh thêm trước khi sửa.
- An Giang "không có đèo": đúng về tên gọi (87% đồng bằng, núi cao nhất Núi Cấm 705 m), nhưng nên viết "không có đèo mang tên riêng, nhưng đường lên Núi Cấm/Núi Sam dốc, nhiều cua gấp" (đường lên Núi Cấm được báo/dân địa phương gọi là "cung đèo").
- `cho_nguoi_chay_giai.cho_o_gan` An Giang: Victoria Châu Đốc + Châu Phố ở trung tâm Châu Đốc, cách Tri Tôn ~45–50 km — không phải chỗ ở gần giải. `diem_chay` "Đường quanh rừng tràm Trà Sư" chưa tra được Trà Sư có cho chạy bộ quanh rừng không.

## C. LỖI CŨ ĐỢT 1 — ĐÃ SỬA ĐÚNG (kiểm lại ngày 08/11/2026)
- **Đầm Vân Hội:** đã sang `lao-cai.json` (5 lần nhắc), `phu-tho.json` còn 0. Xã Việt Hồng đúng (sáp nhập Việt Hồng + Việt Cường + Vân Hội); rộng ~400 ha, hơn 40 đảo đúng; khoảng cách từ Sa Pa để null là đúng (không bịa). Chưa xác minh được: "gần nút giao IC12 ~2 km" (chỉ có nguồn nói tuyến IC12–Vân Hội, không chứng minh được ~2 km); ngày khai trương Pause & Pose 02/09/2026 (chỉ xác nhận được ra mắt đầu tháng 9/2026). Lưu ý: đầm trải rộng trên cả Phú Thọ và Lào Cai, không hoàn toàn thuộc Lào Cai.
- **Quảng Trị:** trung tâm hành chính Đồng Hới ĐÚNG (NQ 202/2025/QH15 thông qua 12/6/2025, sáp nhập Quảng Bình + Quảng Trị). Khoảng cách vẫn tính từ Đông Hà — file đã ghi rõ "đang tính lại", là việc tồn đọng đã khai báo. Đông Hà–Đồng Hới ~105–112 km đường bộ → khi tính lại, mọi `cach_trung_tam_km` lệch ~+100 km (vd Cửa Tùng ~90 km từ Đồng Hới).
- **Đèo Prenn:** khớp 100% (sạt lở Km225+250, rào chắn 2 làn, taluy cao 20–25 m, tình huống khẩn cấp tháng 9/2026 — baomoi.com/SGGP 03/11/2026). Bổ sung: Lệnh xây dựng công trình khẩn cấp 08/10/2026, thi công ~4 tháng, kinh phí ~16 tỷ; 27/10/2026 đã rào 2/4 làn.
- **Tàu Minh Hương:** đúng hết (VietnamNet 06/04/2016; tàu Minh Hương 58, BKS QN 2998; 3,2 kg × 650.000đ = 2.080.000đ ghi thành 3.080.000đ; tổng 9.779.000đ; phạt 1.000.000đ + 500.000đ + tạm đình chỉ) — chỉ thiếu số hiệu tàu/BKS.
- **Vụ lừa cọc Nhân Dân 05/08/2023:** đúng bản chất (xem B4 về diễn đạt cần sửa).
- **Vụ xe khách rơi vực đèo An Khê 10/5/2026:** đúng (VOV + Thanh Niên 11/5/2026) — chỉ sửa "30–40 m" thành "khoảng 40 m" (xem B1).
- **Đèo Ô Quy Hồ, Khau Phạ, Mang Yang, đèo Bụt:** mô tả đúng. Đèo Bụt có thêm nguồn: VietQ "Dốc đèo Bụt — Nỗi ám ảnh chết chóc" (QL18A) + ngập sâu >1 m do bão số 4 (Dân Việt/Tiền Phong 24/08/2026) — nên bổ sung cảnh báo ngập lụt.

## D. ĐÃ KIỂM VÀ ĐÚNG (SĐT + mục mới, mẫu 8 tỉnh)
- **SĐT chỗ ở:** Lâm Đồng đúng 9/10 (Thị Trấn Cổ 0901 399 179 vẫn chỉ 1 nguồn — Instagram chính thức xác nhận địa chỉ 31 Đặng Thái Thân nhưng không công khai số); Hà Nội đúng 6/6 (3 mục null để trống là đúng; Queen Hotel Hanoi chỉ có 1 ứng viên kèm cảnh báo "chưa xác thực", không nên điền); Quảng Ninh đúng 2/2; Lào Cai đúng 8/8; An Giang đúng 7/8 (trừ Hải Châu); Gia Lai các số có trong file đều đúng (lỗi là trùng lặp + địa chỉ); Quảng Trị đúng 3/4 (trừ Sơn Thủy); Cà Mau đúng 7/7. **Không số tổng đài OTA/đại lý bên thứ ba nào lọt vào file** (1900 1870 iVIVU, 1900 5454 40 Chudu24, 1900 6067 Phương Trang đều không xuất hiện).
- **Số khẩn cấp riêng đã kiểm đúng:** Hoàn Mỹ Đà Lạt 0263 3510878 (hotline chung của BV, không phải số riêng khoa cấp cứu); Bạch Mai 0969851616 (hotline chung; tổng đài đặt lịch 1900.888.866; cấp cứu gọi 115); BVĐK số 1 Lào Cai 0216 6250 505; BVĐK Quảng Ninh 0203 3825 489; 113/114/115 đúng số quốc gia.
- **Giải chạy phần lớn đúng:** Dalat Ultra Trail 27–29/03/2026; Lâm Đồng Trail thi đấu 07–08/11/2026 (>5.600 VĐV); VPBank Hanoi 18/10/2026; Techcombank Hanoi 04/10/2026; Halong Bay Heritage 23/11/2025 và 22/11/2026; VMM Sa Pa 17–20/9/2026; Tiền Phong lần 66 30/3/2025 tại Đông Hà; Marathon Cà Mau 15–16/11/2025 (xuất phát Quảng trường Hùng Vương, phường Bạc Liêu).
- **Mùa đẹp:** Gia Lai, An Giang, Quảng Trị, Cà Mau đều đúng (Cà Mau tháng 12–4 mùa khô, ba khía ngon nhất tháng 7–8 âm lịch).
- **Giờ Trà Sư 7–9h / 15:30–17h đúng** (Klook). **Xe số leo dốc tốt hơn xe ga có nguồn** (xemayanthanhphat.com). **Đặt phòng trước 2–3 tuần cuối tuần, 30–60 ngày lễ Tết khớp nguồn** (hoadalattravel.vn: 2–4 tuần / 30–60 ngày). **Hà Nội và Cà Mau "không có đèo" đúng.**
- **Cảnh báo lừa cọc Công an Lâm Đồng có thật** (CAND 11/05/2026; dalat.vn theo baolamdong.vn): giả làm chủ nhà, cọc 50%–100%, chặn liên lạc sát ngày khách đến.

## E. LỖI CŨ VẪN CÒN (từ đợt 1 / mục 10.4, chưa sửa)
- Victory Hotel Tây Ninh đóng cửa chưa ghi chú (A2 — nay xác minh lại càng chắc chắn).
- 7 mục trùng lặp còn nguyên (A3).
- 17 mục lệch địa chỉ còn nguyên — đợt này đã xác minh 12/17 mục (MT Grand Gia Lai, MT Luxury Phú Thọ, Continental, ÊMM Saigon, Hữu Nghị, Hải Châu CM, Nam Kiều mâu thuẫn, MT Luxury CM phường cũ, Khách sạn Pleiku, Tre Xanh, Phi Mai, Nam Đông Hà). 5 mục chưa xác minh từng địa chỉ: Êmm Hotel Huế, Bonjour Hostel, Pù Luông Retreat, Phúc Xuân Resort, Pài Bjooc, Sài Gòn Kim Liên, MT Bắc Ninh, MT Lai Châu (8 mục — ghi chú: danh sách 10.4 có 17 tên, một số tên xuất hiện ở 2 tỉnh).
- Galaxy Thái Nguyên (Galaxy River hay Galaxy Hotel Phổ Yên 097 212 12 59) / Nature Na Hang — chưa đối chiếu chắc, không nằm trong mẫu đợt này.
- Homestay Đất Mũi 7 số mâu thuẫn vẫn chưa chốt: ứng viên mạnh nhất 0819 828 249, thứ hai 0918 996 956; **loại 0918 719 972** (số của Homestay Hương Đất Mũi). Hai fanpage khác nhau cùng nhận là của homestay này — cần gọi trực tiếp hoặc kiểm fanpage chính thức mới chốt được.
- 189 tọa độ xấp xỉ, 8 tọa độ null — ngoài phạm vi đợt này, vẫn còn.

## F. CHƯA TRA ĐƯỢC (ghi rõ, không bịa)
- Số cấp cứu riêng hiện hành của BVĐK Sa Pa (chỉ có hotline 096 797 14 14 nguồn 2024 và số Sở Y tế 2022).
- Tên hiện tại của khách sạn 86 Bạch Đằng, Châu Đốc (Trung Nguyễn hay The CK).
- Mùa Nông thôn Việt Half Marathon Tri Tôn tháng 1/2026 có diễn ra không.
- Khoảng cách IC12 → điểm check-in Pause & Pose Đầm Vân Hội; ngày khai trương 02/09/2026.
- Số landline phụ Sapa Jade Hill 0214 3771 199; nguồn riêng về đường lên Yên Tử; vụ nhà hàng M.P 2,3 triệu ở Hạ Long; tên bảo tàng trong gợi ý trú mưa Gia Lai; vụ chặt chém riêng của Gia Lai trên báo chính thống; SĐT riêng Sơn Thủy Homestay; SĐT Queen Hotel Hanoi / Retro Khe Sanh (giữ null là đúng).

## G. ƯU TIÊN SỬA
1. **Gấp:** toàn bộ mục sân bay Cà Mau — đổi ngày mở lại 29/11 → **18/12/2026**, bỏ lịch bay 29/11, chờ hãng công bố lịch mới; sửa Vietjet thành **thứ 3, 5, 7, VJ591 10:00→12:15 / VJ592 12:45→15:00, bay 2h15**; **bỏ** ý "VNA mở HAN–CAU hàng ngày".
2. Gỡ Victory Hotel Tây Ninh khỏi `cho_o` + `cho_cap_doi` (hoặc ghi rõ "Đã đóng cửa từ 30/07/2026").
3. Gộp 5 cặp trùng lặp thành 1 mục mỗi cặp (giữ tên mới + ghi tên cũ trong ngoặc); sửa các địa chỉ sai ở A5.
4. Sửa SĐT sai cơ sở (Sơn Thủy 0975 617 365 — bỏ hoặc ghi rõ là số Mũi Si; Hải Châu An Giang → 0296 6260 066); xác minh lại mục Khách sạn Hương Giang Hà Nội; bổ sung số khẩn cấp riêng Gia Lai / An Giang / BVĐK Sa Pa (sau xác minh).
5. Cập nhật giải Quy Nhơn (tháng 9/2026, không còn 42 km) + thay `cho_o_gan` giải Quy Nhơn và giải Cà Mau bằng khách sạn đúng thành phố thi đấu; sửa Cửa Tùng 20 km → ~30–35 km; sửa đèo Sa Mù QL9 → đường HCM nhánh Tây; bổ sung `cho_cap_doi.cho_o` cho Quảng Trị + Cà Mau (tối thiểu Mường Thanh mỗi tỉnh).
6. Sửa giờ chụp ảnh theo mùa (Hạ Long hoàng hôn, Cầu Đất săn mây); thống nhất các mâu thuẫn nội bộ (Trà Sư, dã quỳ, best_season Quảng Trị, đêm Đà Lạt 14–16°C); sửa diễn đạt vụ lừa cọc Quảng Ninh (100 triệu = tổng nhiều bị hại ở Cô Tô).
