# Dữ liệu cẩm nang Đà Lạt — Giai đoạn 1 (đầy đủ)

- Ngày kiểm: 05–06/11/2026.
- Bổ sung 08/11/2026: SĐT chỗ ở + mục trời mưa, cặp đôi, dặn an toàn xe máy, mùa/tháng (nguồn ghi ở từng mục).
- Vùng: **Miền Trung** (Tây Nguyên — trung tâm Đà Lạt; tỉnh Lâm Đồng mới gồm Lâm Đồng + Bình Thuận + Đắk Nông cũ). Đã bổ sung ngày 06/11/2026: file JSON gốc thiếu trường `region`, bảng tổng hợp ghi nhầm Miền Nam.
- **Trạng thái: published** — Đà Lạt đã đủ dữ liệu, mở công khai theo quyết định 06/11/2026 (thêm trường "status": "published" vào meta của lam-dong.json; dữ liệu gốc 13 địa danh / 10 chỗ ở / 10 món giữ nguyên, đối chiếu khớp file gốc du-lieu-cam-nang-da-lat.json).
- Mọi giá đều là **khoảng giá tham khảo** từ nguồn công khai, không phải giá chốt. Giá đổi theo mùa, cuối tuần, lễ Tết — kiểm lại trước ngày đi.
- Nguồn sự thật: khung `khung-cam-nang-da-lat.md` + nghiên cứu lại từ nguồn công khai ngày 06/11/2026 (URL nguồn ghi ở từng mục).
- **Khách sạn/homestay: CHỈ giới thiệu sơ.** Tất cả đều ghi "chưa kiểm chứng / chưa đối tác / chưa thu phí". Không dùng chữ uy tín/đảm bảo. Không nhận đặt phòng, không nhận tiền.
- Lưu ý địa giới: từ 07/2025 Đà Lạt sáp nhập phường, tên phường cũ/mới trong các nguồn không thống nhất — file này ghi đường + số nhà là chính, tên phường theo nguồn và ghi chú khi mâu thuẫn.
- File JSON máy đọc được: `lam-dong.json` (cùng thư mục).

## 1. Địa danh — 15 điểm chính + 1 điểm phụ (13 cũ + 3 mở rộng gần Đà Lạt)

Mốc tính khoảng cách: Hồ Xuân Hương (trung tâm). Khoảng cách là đường đi theo nguồn, không phải đường chim bay.

### 1.1. Cụm trung tâm

| # | Tên | Địa chỉ | Tọa độ | Cách trung tâm | Giá vé | Giờ mở cửa | Thời gian | Hợp với ai | Lưu ý | Nguồn |
|---|---|---|---|---|---|---|---|---|---|---|
| 1 | Hồ Xuân Hương | Trung tâm TP. Đà Lạt, giáp Trần Quốc Toản, Nguyễn Thái Học, Bà Huyện Thanh Quan, Lê Đại Hành, Yersin | 11.94187, 108.44666 | 0 km (mốc trung tâm), chu vi bờ hồ ~5 km | Miễn phí; đạp vịt 60.000–120.000đ/giờ; xe đạp đôi ~20.000–25.000đ/giờ; xe ngựa ~200.000đ/chuyến 4–6 người | 24/7 (không gian công cộng) | 1–2 giờ; đẹp nhất 5h–8h và hoàng hôn | Mọi đối tượng, cặp đôi, gia đình, người lớn tuổi, chạy bộ buổi sáng | Sáng sớm/chiều tối gió mạnh, trời lạnh — mang áo khoác; hỏi giá đạp vịt/xe ngựa trước | onelife.vn, vietnamonline.com, saigonstartravel.com |
| 2 | Quảng trường Lâm Viên | Đường Trần Quốc Toản (số nhà chưa thống nhất: 1 Hùng Vương / 2 Trần Quốc Toản / 112 Trần Quốc Toản), bờ Hồ Xuân Hương | 11.93947, 108.44516 | ~0 km, sát bờ hồ | Miễn phí; Doha Cafe trong nụ atiso 45.000–90.000đ (có nguồn ghi 20.000–60.000đ) | Chưa kiểm được giờ chính thức thống nhất (các nguồn ghi 24/7 / 7:00–22:00 / 5:00–22:00); Doha Cafe ~6:30–22:30 | 30–45 phút; đẹp nhất 5h–7h hoặc 16h–18h | Giới trẻ check-in, gia đình có trẻ nhỏ | Tránh 11h–14h nắng gắt, gió ven hồ mạnh; tối đông, giữ tư trang | blog.vexere.com, namthientravel.com.vn, tourdalattravel.com |
| 3 | Chợ Đà Lạt / chợ đêm | Đường Nguyễn Thị Minh Khai, khu Hòa Bình, phường Xuân Hương | 11.94299, 108.43693 | ~1 km, đi bộ được | Miễn phí vào chợ; bánh tráng nướng 15.000–35.000đ/chiếc; món ăn vặt 15.000–30.000đ/món | Chợ ngày ~6:00/7:00–17:00/18:00; chợ đêm ~18:00–23:00 (giờ đóng chưa kiểm được chính xác, có nguồn ghi tới 2h–3h sáng) | Chợ ngày 1 giờ (7h–10h); chợ đêm 60–120 phút | Mọi đối tượng, người thích ẩm thực đường phố, mua đặc sản | Hầu hết quầy chỉ nhận tiền mặt, mang tiền lẻ; hỏi giá trước khi gọi món/mua đồ | hoadalattravel.vn, namthientravel.com.vn |
| 4 | Ga Đà Lạt | Số 1 Quang Trung, phường Xuân Hương | 11.94178, 108.45375 | 1,5–2,5 km (các nguồn ghi khác nhau), ~10 phút đi xe | Tham quan 50.000đ/người lớn (từ 1/10/2024); tàu Đà Lạt–Trại Mát khứ hồi 100.000–170.000đ/người lớn (toa thường 100.000–122.000đ, VIP 135.000–170.000đ); trẻ em ~71.000đ; người Lâm Đồng giảm 40% vé tàu đến 31/12/2026 | Chưa kiểm được giờ đóng chính xác (các nguồn ghi 6:00–17:00 / 7:00–18:00 / 7:00–19:00 / 7:30–17:00). Giờ tàu: 7:45, 9:50, 11:55, 14:00, 16:05 (+ tàu đêm 18:15, 20:20); tàu cần tối thiểu ~15–20 khách mới khởi hành | 1–1,5 giờ (chỉ tham quan); 2–2,5 giờ nếu đi tàu khứ hồi | Người yêu kiến trúc/hoài cổ, gia đình có trẻ nhỏ | Vé tàu hợp lệ được miễn vé tham quan riêng; gọi hỏi ga trước vì lịch tàu đổi theo mùa/lượng khách | hoadalattravel.vn, namthientravel.com.vn, agotourist.com |

### 1.2. Cụm phía Bắc

| # | Tên | Địa chỉ | Tọa độ | Cách trung tâm | Giá vé | Giờ mở cửa | Thời gian | Hợp với ai | Lưu ý | Nguồn |
|---|---|---|---|---|---|---|---|---|---|---|
| 5 | Thung lũng Tình Yêu (TTC World, gồm Đồi Mộng Mơ) | Số 3–5–7 Mai Anh Đào, phường Lâm Viên (phường 8 cũ), quanh hồ Đa Thiện; rộng ~137 ha | 11.97746, 108.44978 | 5–7 km, xe máy 15–20 phút | Người lớn 250.000đ; trẻ em 1–1,39 m và người trên 60 tuổi 125.000đ; dưới 1 m miễn phí; combo vé + xe điện + Đồi Mộng Mơ từ 225.000đ/người (2026); combo vé + buffet 360.000đ, vé + ăn sáng 320.000đ. Khoảng: 225.000–250.000đ/người lớn | Khoảng 7:00–17:30 (chưa kiểm được giờ đóng chính xác: các nguồn ghi 7:00–17:00 / 7:30–17:00 / 7:00–17:30) | Nửa ngày (3–4 giờ); đẹp nhất 8h–10h hoặc 15h–17h | Cặp đôi, gia đình, nhóm bạn | Vé gồm xe điện, đạp vịt, cồng chiêng, game 9D và một số trò — một số khu/trò thu thêm, hỏi rõ ở quầy; khu rất rộng, mang giày bệt | vinpearl.com, travelbui.com, agotourist.com, travelfish.org |
| 6 | Núi Langbiang | 305 Langbiang, thị trấn Lạc Dương / phường Lang Biang, phía bắc Đà Lạt. Đỉnh Núi Bà 2.167 m; đồi Radar 1.929–1.950 m | Đỉnh 12.01964, 108.42435; cổng KDL 11.98295, 108.41756 (mức đường, chưa xác minh cổng chính xác) | ~12 km, 25–30 phút đi xe | Vé vào cổng người lớn 50.000đ, trẻ em 25.000đ. Xe jeep lên Radar khứ hồi 100.000–120.000đ/người (chưa kiểm được giá chính thức — có nguồn ghi ~200.000đ, mâu thuẫn); bao nguyên xe 600.000–700.000đ/xe (tối đa 6 người) | 7:00–17:00 (đa số nguồn; chưa kiểm được chính xác) | 2–3 giờ (phổ thông); nửa ngày nếu leo bộ | Người thích ngắm toàn cảnh/săn mây, nhóm bạn, người leo núi nhẹ; gia đình đi jeep vẫn hợp | Jeep chỉ lên đồi Radar, KHÔNG lên đỉnh Núi Bà (leo bộ 3–4 giờ); không tự chạy xe máy/ô tô lên đỉnh; jeep chỉ xuất phát khi đủ 5–6 khách nên có thể phải chờ | hoadalattravel.vn, namthientravel.com.vn, agotourist.com, travelfish.org |
| 7 | Làng Cù Lần | Thôn Suối Cạn, phường Lang Biang (xã Lát cũ), dưới chân núi Langbiang, hướng Suối Vàng – Ankroet (ĐT722); rộng ~30 ha | 12.02588, 108.36370 | ~22 km (có nguồn ghi 20–25 km), 40–60 phút đi xe | Chưa kiểm được mức hiện hành — các nguồn ghi 100.000đ / 150.000đ / 200.000đ (website KDL niêm yết 200.000đ đã gồm VAT, 10/2026). Khoảng ghi: 100.000–200.000đ/người lớn, cần xác nhận lại. Jeep địa hình riêng 200.000đ/người | Khoảng 7:00–17:30 (chưa kiểm được chính xác) | 2–4 giờ (nên dành nửa ngày tính cả di chuyển) | Gia đình, nhóm bạn, đoàn team-building | Đường Ankroet quanh co, dốc — người chưa quen nên đi ô tô/tour; gọi hotline KDL (0914 914 400, theo New Life Travel) xác nhận giá trước ngày đi | lamdongtours.com, hoadalattravel.vn, newlifetravel.vn |
| 8 | Đồi chè Cầu Đất (Cầu Đất Farm) | Thôn Trường Thọ / thôn Cầu Đất, xã Xuân Trường (nay phường Xuân Trường), phía đông nam Đà Lạt, cao ~1.650 m, ~220–230 ha | 11.88348, 108.55226 (mức đường/thôn, chưa phải tọa độ cổng farm chính xác) | 23–25 km (có nguồn ghi 20 km), 40–60 phút đi xe | Chưa kiểm được mức hiện hành — mâu thuẫn: nhiều nguồn 2026 ghi miễn phí vào cổng (có nguồn ghi "từ 3/11 miễn phí trở lại"); nguồn khác ghi 30.000đ/lượt. Khoảng: 0–30.000đ vé vào. Tour văn hóa trà 90.000đ/người; combo tour + nước 130.000đ; tour săn mây trọn gói 250.000đ/người | 7:30–17:00; săn mây 5:30–6:30 sáng (liên hệ trước để vào sớm) | 1,5–2,5 giờ; đi trước 8:30 sáng hoặc sau 16:00 | Giới trẻ check-in/săn mây, cặp đôi, gia đình | Đồi chè là nông trại đang hoạt động — không giẫm luống chè, không hái lá; đường xa, đổ xăng/đi xe tốt, mang áo ấm | tatravel.vn, mia.vn, fptshop.com.vn, newlifetravel.vn |

### 1.3. Cụm phía Nam / Hồ Tuyền Lâm

| # | Tên | Địa chỉ | Tọa độ | Cách trung tâm | Giá vé | Giờ mở cửa | Thời gian | Hợp với ai | Lưu ý | Nguồn |
|---|---|---|---|---|---|---|---|---|---|---|
| 9 | Hồ Tuyền Lâm | Khu du lịch quốc gia Hồ Tuyền Lâm, phường Xuân Hương (phường 4 cũ), phía nam Đà Lạt, dưới chân núi Phụng Hoàng; mặt nước ~320–360 ha | 11.89937, 108.43714 | ~7 km (có nguồn ghi 5–8 km), 15–20 phút đi xe; cách thác Datanla ~2 km | Miễn phí vào khu hồ; gửi xe máy 5.000–10.000đ. Kayak ~150.000–500.000đ, thuyền tham quan 300.000–500.000đ/chuyến, thuyền thiên nga ~100.000đ/giờ, cắm trại từ 200.000đ/đêm | Khu hồ mở cả ngày/24h (không gian mở); kayak thường từ 8:30; cáp treo Đồi Robin chạy 7:30–11:30 và 13:00–17:00 ngày thường, liền mạch 7:30–17:00 cuối tuần | 1,5–2,5 giờ; đẹp nhất sáng sớm hoặc hoàng hôn | Cặp đôi, gia đình, nhóm bạn | Hồ rất rộng (đường vòng ~20 km) — chọn 1 điểm dừng (bến thuyền dưới Thiền viện) thay vì cố đi hết; đi kayak mặc áo phao, kiểm tra thời tiết | travelbui.com, mia.vn, saigonstartravel.com |
| 10 | Thiền viện Trúc Lâm | Đường Trúc Lâm Yên Tử (đường Trần Thánh Tông), núi Phụng Hoàng, phường Xuân Hương (phường 3 cũ), trên Hồ Tuyền Lâm. Cáp treo Đồi Robin dài ~2,2 km, 12 phút/chiều | 11.90360, 108.43674 | 5–6 km về phía nam, 15–20 phút đi xe | Vào thiền viện miễn phí. Cáp treo: chưa kiểm được mức hiện hành — nhiều nguồn ghi 80.000đ/chiều, 100.000đ/khứ hồi (trẻ dưới 1,2 m: 60.000đ/70.000đ); Hoa Dalat Travel khảo sát 16/10/2026 ghi 120.000đ/chiều, 150.000đ/khứ hồi. Khoảng: 80.000–120.000đ/chiều; 100.000–150.000đ/khứ hồi | Chưa kiểm được — mâu thuẫn lớn: nhiều nguồn ghi 5:00–21:00; Hoa Dalat Travel + lamdongtours ghi 7:00–17:00. Cáp treo 7:30–17:00 (ngày thường nghỉ trưa 11:30–13:00), nhận khách cuối 16:45 | 1–1,5 giờ (đi xe) hoặc 2 giờ nếu đi cáp treo khứ hồi | Mọi đối tượng; gia đình có người lớn tuổi (đi cáp treo đỡ leo dốc) | Nơi tu hành — ăn mặc kín đáo, giữ yên lặng, không chụp ảnh ồn ào trong chánh điện; đi cáp treo buổi trưa ngày thường có thể phải chờ qua giờ nghỉ | travelbui.com, hoadalattravel.vn, mia.vn |
| 11 | Thác Datanla | Quốc lộ 20, đèo Prenn, phường Xuân Hương (phường 3 cũ), phía nam Đà Lạt. Thác cao ~20 m; máng trượt Alpine Coaster số 1 dài ~1.200 m, số 3 dài ~2.400 m | 11.90417, 108.44954 (Mapcarta ghi 11.90118, 108.44884 — lệch ~300 m) | ~5 km về phía nam (một nguồn ghi 10 km — thiểu số), 10–15 phút đi xe | Vé tham quan 50.000đ/người lớn, 25.000đ/trẻ em (nguồn cũ/2025) vs 80.000đ/người lớn, 50.000đ/trẻ em (Hoa Dalat Travel + New Life Travel, 11/2026). Khoảng: 50.000–80.000đ/người lớn. Máng trượt số 1 khứ hồi 130.000đ/người lớn; số 3 khứ hồi 250.000đ; High Rope 350.000–360.000đ; zipline ~1.000.000đ; canyoning ~1.650.000–1.886.000đ | Khoảng 7:15–17:00; máng trượt nhận khách đến ~16:30 | 2–3 giờ; đi lúc mở cửa 7:30–8:00 hoặc 11:30–12:30 để tránh xếp hàng máng trượt | Gia đình, nhóm bạn, người thích mạo hiểm nhẹ | Vé tham quan và vé trò chơi tính riêng — mua đúng ga máng trượt (số 1 và số 3 ở 2 ga khác nhau, dễ nhầm); đường đi bộ xuống thác ~600 m, trơn khi mưa | hoadalattravel.vn, newlifetravel.vn, mapcarta.com |
| 12 | Thác Prenn | Số 20 đường cao tốc Liên Khương – Prenn (QL20, Km 222), chân đèo Prenn, phường 3, cửa ngõ phía nam Đà Lạt. Nay trong tổ hợp Tea Resort Prenn (~70 ha, gồm thác + đền Hùng Vương). Thác cao ~9–10 m, rộng ~20 m | 11.87652, 108.47010 (thác); khu Tea Resort Prenn 11.87467, 108.47213 | 10–12 km, 20–30 phút đi xe | Giá cũ 30.000–50.000đ đã lỗi thời sau khi tái khai thác thành Tea Resort Prenn. Giá 2026: gói tham quan 110.000–288.000đ/người lớn tùy gói (Prenn Goodline 220.000đ ngày thường / 255.000đ lễ; + xe điện đền Hùng 270.000–299.000đ). Khoảng: 110.000–288.000đ/người lớn, cần xác nhận lại trước ngày đi | Khoảng 7:00–17:00 | 2–3 giờ; bắt đầu từ 7:30 sáng để tránh nắng gắt 10:00–14:00 | Gia đình, người lớn tuổi, đoàn riêng — lịch trình nhẹ | Điểm xa nhất trong nhóm thác gần trung tâm — ghép cùng cung đèo Prenn (Datanla, Tuyền Lâm, Thiền viện); chọn gói vé trước ở quầy vì nhiều gói/combo dễ nhầm | hoadalattravel.vn, mapcarta.com |

### 1.4. Điểm phụ (dùng trong lịch trình ngày 1)

| Tên | Địa chỉ | Tọa độ | Cách trung tâm | Giá vé | Giờ mở cửa | Thời gian | Hợp với ai | Lưu ý | Nguồn |
|---|---|---|---|---|---|---|---|---|---|
| Nhà thờ Domaine de Marie (Nhà thờ Mai Anh) | Số 1 Ngô Quyền, phường 6 (phường Cam Ly theo tên mới), trên đồi Mai Anh. Kiến trúc Gothic Pháp + mái nhà rông, xây từ 1940 | 11.94848, 108.43017 (geocode lệch đường Mai Hắc Đế gần đó — chưa kiểm được tọa độ chính xác) | 1,5–2,5 km (các nguồn ghi 1 / 1,5 / 2,5 km), ~5–10 phút đi xe | Miễn phí (đa số nguồn; 1 nguồn duy nhất ghi 30.000đ — trái với tất cả nguồn còn lại, không dùng) | Tham quan tự do — khung tham khảo 7:00–17:00; nhiều nguồn ghi 7:00–11:00 & 14:00–17:00. Giờ lễ: ngày thường 17:00; Chủ nhật 5:45, 8:00 & 16:30 | 30–60 phút; đẹp nhất 7:00–10:00 hoặc 14:00–16:00 | Người yêu kiến trúc/lịch sử, cặp đôi chụp ảnh, khách hành hương | Nhà thờ + tu viện đang hoạt động — tránh giờ lễ, ăn mặc lịch sự, giữ yên lặng | hoadalattravel.vn, tatravel.vn, agotourist.com |

### 1.5. Điểm mở rộng — gần Đà Lạt

| # | Tên | Địa chỉ | Tọa độ | Cách trung tâm | Giá vé | Giờ mở cửa | Thời gian | Hợp với ai | Lưu ý | Nguồn |
|---|---|---|---|---|---|---|---|---|---|---|
| 1 | Dinh Bảo Đại III (Dinh 3) | Số 1 Triệu Việt Vương, Đà Lạt, cách trung tâm ~2 km về phía tây nam | 11.9342, 108.4318 (xấp xỉ) | ~2 km | 30.000–60.000đ/người (các nguồn 2026 ghi khác nhau — kiểm lại tại cổng; kiểm 08/11/2026) | 7:00–17:30 hằng ngày | 1–1,5 giờ | Người yêu lịch sử, gia đình | Gần Đà Lạt, cùng cụm Hồ Tuyền Lâm – Crazy House – Thiền viện Trúc Lâm; 3 dinh dễ nhầm nhau (Dinh I/II/III ở 3 đồi khác nhau) — ghi rõ Dinh III; tọa độ xấp xỉ, cần kiểm lại | tripi.vn, vietfuntravel.com.vn |
| 2 | Biệt thự Hằng Nga (Crazy House) | Số 3 Huỳnh Thúc Kháng, Đà Lạt, cách chợ ~1,5–2 km | 11.937, 108.4297 (xấp xỉ) | ~2 km | Chưa kiểm được mức vé riêng — hỏi giá tại cổng | Ban ngày (chưa kiểm được giờ chính xác) | 1–1,5 giờ | Giới trẻ, gia đình có trẻ lớn | Gần Đà Lạt, cùng cụm Dinh III – Hồ Tuyền Lâm; lọt top 10 nhà kỳ lạ thế giới; cầu thang hẹp và dốc, không hợp người sợ độ cao/trẻ nhỏ chạy nhảy; tọa độ xấp xỉ, cần kiểm lại | tripi.vn, gtrip.vn, vietfuntravel.com.vn |
| 3 | Hồ Suối Vàng | Phía tây bắc Đà Lạt, hướng đi Làng Cù Lần – Langbiang (ĐT722), xã Lát cũ | 12.005, 108.375 (xấp xỉ) | ~20 km | Miễn phí vào khu vực hồ; dịch vụ riêng thu thêm (chưa kiểm được) | Cả ngày; săn mây trước bình minh | 1,5–2,5 giờ (đi sáng sớm) | Người săn mây, nhiếp ảnh, nhóm bạn | Gần Đà Lạt, cùng cung Suối Vàng – Làng Cù Lần – Langbiang (đã nhắc trong lịch trình 4N3Đ ngày 4); phải dậy rất sớm, đường đi tối và lạnh; tọa độ xấp xỉ, cần kiểm lại | dichoithoi.com, home.vn |

## 2. Ở đâu — 9 chỗ ở + 1 homestay (CHỈ GIỚI THIỆU SƠ)

**Tất cả các mục dưới đây: "Thông tin tham khảo, chưa kiểm chứng trực tiếp, chưa phải đối tác, chưa thu phí. Người dùng tự kiểm tra giá / phòng trống trước khi đặt." Không dùng chữ uy tín/đảm bảo. Không nhận đặt phòng, không nhận tiền.**
Giá tăng cuối tuần, lễ Tết, Festival Hoa (tháng 12). Tên phường cũ/mới không thống nhất sau sáp nhập 07/2025 — giữ nguyên địa chỉ đường + số nhà theo nguồn.

| # | Tên | Địa chỉ | Khu vực | Hạng | Khoảng giá/đêm ngày thường | SĐT (ngày kiểm 08/11/2026) | Cách Hồ Xuân Hương / chợ | Hợp với ai | Trạng thái | Nguồn |
|---|---|---|---|---|---|---|---|---|---|
| 1 | Khách sạn Ngọc Phát | 10 Hồ Tùng Mậu, Phường Xuân Hương | Trung tâm, ven Hồ Xuân Hương | 3 sao | ~800.000–1.600.000đ (Standard–Family; Deluxe/Suite cao hơn, tới ~2.485.000đ) | 02633 683 979 (ngocphatdalathotel.com) | Đối diện Quảng trường Lâm Viên, sát Hồ Xuân Hương; chợ trong khu trung tâm, đi bộ được | Gia đình, cặp đôi muốn ở trung tâm, view hồ, có buffet sáng | Chưa kiểm chứng / chưa đối tác / chưa thu phí | lamdongtours.com, dulichyenviet.com |
| 2 | Nice Dream Hotel | 1 Nguyễn Thị Minh Khai, Phường Xuân Hương | Trung tâm, ngay vòng xoay chợ đêm | 3 sao | ~750.000–1.200.000đ (hạng cao hơn tới ~1.800.000–2.500.000đ theo một số nguồn) | 0263 3822 379 (dalattourism.vn; mytour.vn) | Cách chợ đêm ~110 m; Hồ Xuân Hương đi bộ vài phút | Khách thích đi chợ đêm, cặp đôi/nhóm bạn ở trung tâm | Chưa kiểm chứng / chưa đối tác / chưa thu phí | newlifetravel.vn, vietgoing.com |
| 3 | Sandals Flora Hotel | 37–40 Nguyễn Thị Minh Khai, Phường Xuân Hương | Trung tâm, trục Nguyễn Thị Minh Khai | 3 sao | ~800.000–1.600.000đ | 0263 3558 816 (mytour.vn) | Cách Hồ Xuân Hương ~100 m, chợ đêm ~150 m | Cặp đôi, khách muốn view chợ đêm, ở ngay trung tâm | Chưa kiểm chứng / chưa đối tác / chưa thu phí | newlifetravel.vn, mytour.vn |
| 4 | Hôtel Colline | 10 Phan Bội Châu, Phường Xuân Hương | Trung tâm, ngay trên chợ Đà Lạt | 4 sao | ~1.450.000–2.200.000đ (Superior–Deluxe; Suite cao hơn, tới ~3.870.000đ) | 0263 3665 588 (agotourist.com; mytour.vn; tripi.vn) | Cách Hồ Xuân Hương ~200 m, chợ ~300 m, Quảng trường Lâm Viên ~500 m | Khách muốn tiện nghi 4 sao ngay trung tâm, cặp đôi/gia đình nhỏ | Chưa kiểm chứng / chưa đối tác / chưa thu phí | dalattourism.vn, newlifetravel.vn |
| 5 | Mường Thanh Holiday Đà Lạt | 42 Phan Bội Châu, Phường Xuân Hương | Trung tâm, đường Phan Bội Châu | 4 sao | ~1.250.000–1.600.000đ (có nguồn ghi từ 1.155.000–1.200.000đ) | 0263 357 8888 (booking.muongthanh.com) | Cách Hồ Xuân Hương 100 m, chợ đêm 600–750 m (nguồn ghi khác nhau) | Gia đình, khách đoàn, khách muốn hồ bơi/spa trong trung tâm | Chưa kiểm chứng / chưa đối tác / chưa thu phí | newlifetravel.vn, hoadalattravel.vn |
| 6 | Zen Valley Dalat | 38 Khe Sanh, Phường 10 | Sườn đồi, đầu đèo Mimosa, view rừng thông/thung lũng | 3 sao | ~800.000–1.950.000đ (có nguồn niêm yết cao hơn: 1.675.860–2.928.250đ tùy hạng) | 0263 3577 277 (fanpage chính thức; mytour.vn) | Cách Hồ Xuân Hương ~2,24 km, Ga Đà Lạt ~1,44 km, trung tâm ~3 km | Cặp đôi/gia đình muốn yên tĩnh, view thông, nghỉ dưỡng bungalow/villa; không hợp khách muốn đi bộ ra chợ | Chưa kiểm chứng / chưa đối tác / chưa thu phí | tadiha.com, traveloka.com |
| 7 | New Life Hotel | 6 Đống Đa, Phường 3 | Triền đồi gần trung tâm, view thành phố/thung lũng | 3 sao | ~550.000–1.200.000đ | 0263 3586 888 (fanpage chính thức; happygo24h.com) | Cách Quảng trường Lâm Viên ~2,7 km; chợ cần đi xe ~5 phút, không đi bộ thuận tiện | Khách tiết kiệm, cặp đôi/gia đình muốn yên tĩnh, view đồi | Chưa kiểm chứng / chưa đối tác / chưa thu phí | newlifetravel.vn, vietgoing.com |
| 8 | Dalat Wonder Resort | 19 Hoa Hồng, Khu du lịch Hồ Tuyền Lâm, Phường 4 | Ven Hồ Tuyền Lâm, kiểu làng châu Âu | 4 sao (có nguồn ghi resort công bố tiêu chuẩn dịch vụ 5 sao — mâu thuẫn, chưa chốt) | ~1.150.000–2.000.000đ (phòng Classic–Family; villa cao hơn, 5,6–16,5 triệuđ/đêm) | 0263 3800 099 (mia.vn; agotourist.com; tripi.vn) | Cách Hồ Xuân Hương ~6,07 km; trung tâm ~6–8,5 km, đi xe ~20–30 phút | Gia đình/nhóm bạn nghỉ dưỡng ven hồ, chụp ảnh | Chưa kiểm chứng / chưa đối tác / chưa thu phí | didaudalat.com, bestprice.vn |
| 9 | Terracotta Hotel & Resort Dalat | Phân khu 7.9, Khu du lịch Hồ Tuyền Lâm, Phường 3 | Ven Hồ Tuyền Lâm, khuôn viên ~17 ha | 4 sao (một số nguồn ghi 5 sao — mâu thuẫn, chưa chốt) | ~1.300.000–1.950.000đ (phòng khách sạn; villa 3–5 phòng ngủ 11,35–17,35 triệuđ/đêm) | 0263 3883 838 (motogo.vn; mytour.vn; tripi.vn) | Cách trung tâm ~6 km; ngay bờ Hồ Tuyền Lâm | Gia đình/đoàn, khách nghỉ dưỡng dài, muốn hồ bơi/spa/khuôn viên rộng | Chưa kiểm chứng / chưa đối tác / chưa thu phí | agotourist.com, hoadalattravel.vn |
| 10 | Homestay Thị Trấn Cổ | 31 Đặng Thái Thân, Đà Lạt | Đường Đặng Thái Thân, khu trung tâm | Homestay (không hạng sao) | Từ khoảng 400.000đ/đêm — chỉ 1 nguồn ghi mức này, chưa kiểm được khoảng trên | 0901 399 179 (dalat.vn — chỉ 1 nguồn) | Chưa kiểm được con số chính xác | Khách bụi, cặp đôi tiết kiệm, muốn homestay sạch, view đẹp | Chưa kiểm chứng / chưa đối tác / chưa thu phí | abay.vn |

## 3. Ăn gì — 10 món (đủ quán + địa chỉ + khoảng giá)

| # | Món | Buổi ăn | Khoảng giá | Quán tham khảo (địa chỉ) | Nguồn |
|---|---|---|---|---|---|
| 1 | Bánh mì xíu mại | Ăn sáng | 15.000–30.000đ/phần (1 chén xíu mại + bánh mì) | (1) Bánh mì xíu mại Hoàng Diệu (Bé Linh) — 26 và 37 Hoàng Diệu, Phường 5; 15.000–20.000đ, chỉ bán sáng 06:00–10:00. (2) Bánh mì xíu mại Cô Hồng/Bà Hồng — 72 Yersin, Phường 10; 15.000–20.000đ | luhanhvietnam.com.vn, agotourist.com |
| 2 | Bánh căn | Ăn sáng / ăn xế | 20.000–60.000đ/phần (tùy nhân trứng/tôm/mực/bò, thập cẩm) | (1) Bánh căn Lệ — 27/44 Yersin, Phường 10; 30.000–60.000đ (có nguồn ghi 35.000–65.000đ). (2) Bánh căn xíu mại Cây Bơ — 56 Tăng Bạt Hổ, Phường 1; 20.000–35.000đ | travel.com.vn, agotourist.com |
| 3 | Bánh ướt lòng gà | Ăn trưa / ăn xế / ăn tối | 30.000–60.000đ/phần | (1) Bánh ướt lòng gà Trang — 15F Tăng Bạt Hổ, Phường 1 (CN2: 3B Mai Trang Sơn, Phường 5); 30.000–60.000đ, cách chợ ~400 m. (2) Bánh ướt lòng gà Long — Hẻm 202 Phan Đình Phùng / 68 Trần Phú (2 nguồn ghi địa chỉ khác nhau, ưu tiên Trang khi đăng); ~25.000–50.000đ | bachhoaxanh.com, caonguyentourist.com |
| 4 | Lẩu gà lá é | Ăn trưa / ăn tối (món nhóm) | 200.000–400.000đ/nồi (2–4 người; Tao Ngộ: nồi 2 người 250.000đ, 3 người 300.000đ, 4 người 350.000đ) | (1) Lẩu gà lá é Tao Ngộ — 5 Ba Tháng Tư (đường 3/4), Phường 3 (có nhiều quán cùng tên: 28B Hải Thượng, 89 Hai Bà Trưng, 99 Phù Đổng Thiên Vương — ghi rõ cơ sở 5 Ba Tháng Tư). (2) Lẩu gà lá é 668 — 2B Chu Văn An, Phường 3; 200.000–300.000đ/nồi | agotourist.com, hoadalattravel.vn |
| 5 | Bánh tráng nướng | Ăn tối / ăn vặt chợ đêm | 15.000–25.000đ/cái (nhiều topping tới ~40.000đ/cái) | (1) Chợ đêm Đà Lạt — đường Nguyễn Thị Minh Khai, Phường Xuân Hương; nhiều quầy, 17:00–23:00. (2) Bánh tráng nướng Dì Đinh — 26 Hoàng Diệu, Phường 5; ~20.000–40.000đ/cái, 15:30–18:30 | hoadalattravel.vn, vinpearl.com |
| 6 | Nem nướng | Ăn trưa / ăn tối | 30.000–60.000đ/phần (có nguồn ghi ~40.000đ/phần) | (1) Nem nướng Bà Hùng — 328 Phan Đình Phùng, Phường 2 (cơ sở đông khách nhất); CN khác: 52 KQH Hoàng Văn Thụ, Phường 4 và 3 Trần Hưng Đạo, Phường 3; 09:30–21:00. (2) Nem nướng Bà Nghĩa — 4 Bùi Thị Xuân; ~40.000–45.000đ/phần | agotourist.com, cuongdulich.com |
| 7 | Gà nướng cơm lam | Ăn trưa / ăn tối (món nhóm) | ~230.000–400.000đ cho 1 con gà + cơm lam, nhóm 2–4 người | (1) Gà nướng ôm xôi Tư Béo — 321 Hai Bà Trưng; gà ~230.000đ/con (1,2–1,4 kg), tổng món 59.000–369.000đ. (2) Nhà hàng Trên Đỉnh Đồi Trăng — 27K Ngô Thì Sỹ, Phường 4; món 80.000–250.000đ, cách chợ ~2,4 km. (3) Cơm lam gà nướng Khương Duy — QL722, ngã ba Mangline, Phường 7 (CN2: Làng hoa Vạn Thành); món 35.000–200.000đ | mia.vn, caonguyentourist.com |
| 8 | Bún bò ấp Ánh Sáng | Ăn sáng / ăn trưa | 30.000–50.000đ/tô | (1) Bún bò ấp Ánh Sáng — Quán Út Phi — 10 ấp Ánh Sáng, Phường 1; ~35.000–50.000đ/tô. (2) Bún bò Huế – Mì Quảng Út Vân — 36/36A ấp Ánh Sáng, Phường 1; 30.000–40.000đ/tô, 06:00–20:00 | saigonstartravel.com, agotourist.com |
| 9 | Bánh canh | Ăn sáng / ăn trưa / ăn tối | 25.000–50.000đ/tô (menu cũ 18.000–30.000đ; nguồn mới 30.000–44.000đ) | (1) Bánh canh Xuân An — 15A Nhà Chung, Phường 3; 30.000–44.000đ/tô, 07:00–21:30, hơn 30 năm. (2) Bánh canh Phan Rang — đường Trần Phú hoặc Hai Bà Trưng (chỉ có tên đường, chưa kiểm được số nhà cụ thể) | zalopay.vn, agotourist.com |
| 10 | Sữa đậu nành nóng / dâu tây | Ăn tối (chợ đêm) | Sữa đậu nành nóng 7.000–15.000đ/ly (nguồn mới: 10.000–15.000đ/ly); dâu tây lắc 15.000–20.000đ/hũ–ly; kem dâu tây 20.000đ/ly | (1) Sữa đậu nành Hoa Sữa — Tăng Bạt Hổ, Phường 1, 16:00–22:00, cách chợ đêm ~50 m — số nhà mâu thuẫn giữa các nguồn (64 / 50 / 3F Tăng Bạt Hổ), cần kiểm lại trước khi đăng. (2) Dâu tây lắc — 276 Phan Đình Phùng, 15.000–20.000đ/hũ (nguồn cũ); kem dâu: phố Phan Đình Phùng, 20.000đ/ly | vinwonders.com, namthientravel.com.vn, riviu.vn |

## 4. Đi đến Đà Lạt bằng gì

Sân bay Liên Khương đã mở cửa hoạt động trở lại từ 19/08/2026 sau thời gian tạm đóng để nâng cấp đường băng (nhiều bài cũ đầu 2026 vẫn ghi sân bay đóng — đã lỗi thời).

### 4.1. Từ TP.HCM (~300–310 km)

| Phương tiện | Thời gian | Khoảng giá | Hãng / ghi chú | Nguồn |
|---|---|---|---|---|
| Xe khách / giường nằm | 6–8 tiếng; phần lớn chạy đêm, sáng tới nơi | Giường nằm phổ thông từ ~180.000đ; limousine/phòng đôi VIP tới 750.000đ/vé. Phương Trang (FUTA) ~290.000–300.000đ/vé; Thành Bưởi giường 34 chỗ 325.000đ, phòng nằm 22 khoang 500.000đ, ~6h20–6h50 | Phương Trang hotline 1900 6067; Thành Bưởi; An Anh; Tiến Oanh. Chuyến đêm phổ biến (Thành Bưởi 22h/23h/24h; Phương Trang 00:00–02:00). Số chuyến/ngày các nguồn mâu thuẫn — không chốt con số | motogo.vn, motortrip.vn, vexere.com, topdalat.vn, hoadalattravel.vn |
| Limousine | 6–8 tiếng | ~250.000–500.000đ/vé (phòng đôi VIP tới ~650.000–750.000đ); giá trung bình Vexere 11/2026 ~324.500–344.500đ/vé. Ví dụ: An Anh phòng đơn 350.000đ / đôi 750.000đ; Tiến Oanh 279.000đ; Điền Linh 270.000đ, phòng đôi VIP 330.000–380.000đ; Nguyễn Kim đơn 449.000đ / đôi 749.000đ | — | hoadalattravel.vn, motortrip.vn, vnpayapp.vn, vexere.com |
| Máy bay SGN–DLI | Bay ~50–55 phút | Một chiều đã gồm thuế phí ~700.000–1.800.000đ (Vietjet ~717.000đ, Vietnam Airlines ~991.000đ theo BestPrice; vé rẻ nhất trong ngày ~894.781đ, khứ hồi rẻ nhất ~1.789.562đ theo Vexere). Vé khuyến mãi chưa thuế phí có thể từ ~81.000–90.000đ — ghi rõ "chưa gồm thuế phí" nếu dùng | Vietnam Airlines, Vietjet Air, Pacific Airlines, Bamboo Airways, Vietravel Airlines; chuyến sớm nhất ~06:10, muộn nhất ~19:50 | bestprice.vn, traveloka.com, vexere.com, vietnambooking.com |
| Xe máy / ô tô riêng (QL20) | Ô tô 6–7 tiếng; xe máy 7–10 tiếng tùy tốc độ và số lần nghỉ | Chưa kiểm được giá thuê theo tuyến (xem mục 5.4 thuê ô tô trong thành phố) | Lộ trình: TP.HCM → cao tốc Long Thành – Dầu Giây → QL20 → đèo Chuối → đèo Bảo Lộc → đèo Prenn → Đà Lạt (~310–320 km). Kẹt xe cuối tuần/lễ, nhất là đèo Bảo Lộc và Prenn. Xe máy: xuất phát 4–5h sáng, ưu tiên xe số, KHÔNG đi vào cao tốc, tránh chạy đèo ban đêm và ngày mưa. Mùa thuận tiện: tháng 11–tháng 4 | buulong.com.vn, datxeviet.vn, lamdongtours.com |

### 4.2. Từ Hà Nội (~1.450–1.500 km)

| Phương tiện | Thời gian | Khoảng giá | Ghi chú | Nguồn |
|---|---|---|---|---|
| Máy bay HAN–DLI | Bay thẳng 1h50 (có nguồn ghi 1h50–1h55); ~8–12 chuyến/ngày | Một chiều đã gồm thuế phí ~1.400.000–2.650.000đ/chiều (Vietjet ~1.100.000–2.500.000đ; Vietnam Airlines ~1.400.000–2.800.000đ). Traveloka: một chiều từ 1.415.022đ, khứ hồi từ 2.965.829đ. Giá chưa thuế phí có thể từ ~199.000đ (khuyến mãi) | Phương án khuyên dùng | traveloka.com, vnpayapp.vn, vietnambooking.com, bestprice.vn |
| Xe khách | Không có một con số duy nhất — các nguồn ghi ~20h30 đến 32 giờ, thường gặp nhất 30–32 giờ | ~700.000–950.000đ/vé (nguồn cũ 700.000–800.000đ; nguồn 10/2026: Liên Khoa ~850.000đ, Ngọc Hùng Văn Nhân ~950.000đ) | Chỉ phù hợp người có sức khỏe tốt và dư thời gian; đa số nguồn khuyên bay | hoadalattravel.vn, dailyxehanoi.com, agotourist.com, sigo.vn |
| Tàu tới Nha Trang rồi xe lên Đà Lạt | Tàu HN–Nha Trang ~24–27 giờ (SE1 ~24h05; SE5 ~26h26–26h38; SE7 ~27h16) + xe Nha Trang–Đà Lạt 3–4 giờ (~134 km, QL27C). Tổng ~28–35 giờ | Tàu: ghế mềm điều hòa ~1.050.000–1.250.000đ; giường khoang 6 ~1.350.000–1.900.000đ; khoang 4 ~1.950.000–2.350.000đ. Xe Nha Trang–Đà Lạt ~125.000–160.000đ/vé (có nguồn ghi 150.000–250.000đ). Tổng ~1.200.000–2.600.000đ/người (chưa tính ăn dọc đường) | Không có tàu thẳng HN–Đà Lạt. Lộ trình thay thế: xuống ga Tháp Chàm (Phan Rang) rồi xe lên Đà Lạt chỉ ~80 km, ~2–2,5 giờ | duongsatvietnam.vn, vetau247.vn, crystalbay.com, buulong.com.vn |

### 4.3. Từ sân bay Liên Khương (DLI) vào trung tâm (~28–30 km, ~40–50 phút)

| Phương tiện | Khoảng giá | Ghi chú | Nguồn |
|---|---|---|---|
| Taxi | Chênh lớn giữa các nguồn: gói trọn gói đặt trước (Lado) ~155.000–190.000đ (xe 4 chỗ); gói chung ~200.000–280.000đ/chuyến; taxi đồng hồ ~250.000–300.000đ/lượt (có nguồn ghi 300.000–500.000đ tùy hãng/giờ đêm/lễ; Mai Linh ~280.000–350.000đ); Grab/Be ~250.000–380.000đ | Hãng: Lado, Mai Linh, Thắng Lợi, Quốc Tế, Xanh SM. Hỏi rõ giá trọn gói trước khi lên xe, tránh đi đồng hồ vào giờ cao điểm | saigonlocals.com, vietnambooking.com, latour.vn, buulong.com.vn |
| Xe buýt sân bay | ~30.000–50.000đ/lượt (phổ biến 40.000–50.000đ; FUTA/Phương Trang 50.000đ) | Điểm trả: đường Lê Thị Hồng Gấm (cạnh chợ Đà Lạt) hoặc số 2 Lê Quý Đôn. Thời gian ~45–60 phút; chạy theo giờ hạ cánh, khoảng 6h00–18h00 | vietnambooking.com, saigonlocals.com, buulong.com.vn, vietnamairlines.com |
| Xe đưa đón khách sạn | Không có mức chung — hỏi lễ tân khi đặt phòng. Ví dụ: Dalat Edensee 480.000đ/chiều/xe 4–7 chỗ; La Da Lat 520.000đ/chiều/xe 5 chỗ; đặt qua Chudu24 ~240.000–430.000đ/chiều; xe riêng đặt trước ~300.000–450.000đ (xe 4–7 chỗ). Một số resort có shuttle bus miễn phí vào trung tâm | — | vietnamairlines.com, saigonlocals.com, khachsan.chudu24.com |

## 5. Đi lại trong Đà Lạt

| Phương tiện | Khoảng giá | Giấy tờ / điều kiện | Ghi chú | Nguồn |
|---|---|---|---|---|
| Thuê xe máy — xe số | ~80.000–130.000đ/ngày (đời cũ 80.000–100.000đ; đời mới Wave/Sirius/Future/Jupiter 100.000–130.000đ) | CCCD (hoặc hộ chiếu) + bằng lái A1 (bắt buộc với xe trên 50cc); nên nộp bản photo CCCD, giữ bản gốc | Thuê tính theo chu kỳ 24 giờ; lễ Tết giá có thể tăng 30–50%; nhiều cửa hàng giao xe tận khách sạn miễn phí | vexere.com, agotourist.com, didaudalat.com, wikidulich.com |
| Thuê xe máy — tay ga phổ thông (Vision, Air Blade 125) | ~120.000–150.000đ/ngày | Như trên | Xe số leo dốc tốt hơn và rẻ hơn xe ga ~30.000–50.000đ/ngày | vexere.com, agotourist.com |
| Thuê xe máy — tay ga 150cc / côn tay (Vario, Air Blade 150, Exciter, Winner) | ~150.000–200.000đ/ngày | Như trên | Tiền cọc: nhiều nơi không yêu cầu cọc tiền mặt (chỉ giữ giấy tờ); một số nơi ~500.000–1.000.000đ tùy xe | vexere.com, agotourist.com, wikidulich.com |
| Thuê xe máy điện theo ngày | Chưa kiểm được mức giá riêng trong đợt tra này | — | Xe điện du lịch 4 bánh chở khách tham quan đã tạm ngừng hoạt động từ đầu năm 2025 (từ 16/02/2025, Nghị định 165/2024/NĐ-CP) — không giới thiệu như dịch vụ đang chạy | datxeviet.vn |
| Taxi nội thành | ~11.500–13.500đ/km (dưới 20 km), ~9.000–10.000đ/km (trên 20 km). Đi lại chủ yếu trong trung tâm 3N2Đ bằng taxi ước tính ~300.000–600.000đ | — | Hãng: Mai Linh, Thắng Lợi, Lado, Xanh SM; có Grab/Be | soctrangtourism.vn, latour.vn |
| Xe đạp / đi bộ quanh Hồ Xuân Hương | Thuê xe đạp đơn/đôi ~20.000–50.000đ/giờ (xe đạp đôi ~20.000đ/giờ); xe đạp thể thao theo ngày từ ~30.000–50.000đ (mức này theo Mytour, cần kiểm lại tại điểm thuê). Cần mang CCCD/CMND khi thuê | — | Hồ chu vi hơn 5 km, đường ven hồ lát phẳng; đi bộ sáng sớm hoặc chiều hoàng hôn. Thuyền thiên nga ~50.000đ/giờ, xe ngựa ~100.000đ/chuyến (thêm, không phải phương tiện chính) | 123tadi.com, ivivu.com, mytour.vn, datphongdalat.vn |
| Thuê ô tô tự lái theo ngày | Xe 4 chỗ ~500.000–950.000đ/ngày (VF3 ~500.000đ; Wigo ~528.000đ; Attrage/i10 ~600.000đ; Mazda 3 ~650.000đ; Creta ~850.000đ); xe 7 chỗ ~700.000–1.500.000đ/ngày (Xpander/XL7 ~700.000đ; Avanza ~850.000đ; Lux SA/Custin ~1.400.000–1.500.000đ). Lễ Tết tăng 50–80% | Bằng lái B2 trở lên + giấy tờ tùy thân; tiền cọc (thế chấp) thường 10.000.000–30.000.000đ tùy xe | — | agotourist.com, sigo.vn, danangtravelcar.com.vn, taxininhthuan.vn |
| Thuê ô tô có tài xế theo ngày (trong TP) | Xe 4 chỗ ~900.000đ/ngày, xe 7 chỗ ~1.000.000đ/ngày (AGO Tourist); nguồn khác: 4 chỗ 700.000–900.000đ, 7 chỗ 800.000–1.200.000đ tùy tuyến xa/gần. Quá giờ ~80.000–100.000đ/giờ | — | — | agotourist.com, taxininhthuan.vn |

## 6. Lịch trình mẫu

### 6.1. Lịch trình 3N2Đ (chính — đủ điểm chính)

| Ngày | Buổi | Hoạt động | Điểm / quán gắn kèm |
|---|---|---|---|
| Ngày 1 — Trung tâm | Sáng | Hồ Xuân Hương (đi bộ/đạp xe quanh hồ, 1–2 giờ) + Quảng trường Lâm Viên (30–45 phút) | Địa danh 1, 2 |
| Ngày 1 | Chiều | Ga Đà Lạt (1–1,5 giờ) + Nhà thờ Domaine de Marie (30–60 phút) | Địa danh 4, điểm phụ |
| Ngày 1 | Tối | Chợ đêm Đà Lạt (60–120 phút) + bánh tráng nướng + sữa đậu nành nóng | Địa danh 3; món 5, 10 |
| Ngày 2 — Phía Bắc | Sáng sớm | Đồi chè Cầu Đất săn mây (đi trước 8:30; 1,5–2,5 giờ) | Địa danh 8 |
| Ngày 2 | Trưa–chiều | Thung lũng Tình Yêu (3–4 giờ) | Địa danh 5 |
| Ngày 2 | Chiều | Núi Langbiang (jeep lên đồi Radar, 2–3 giờ) | Địa danh 6 |
| Ngày 2 | Tối | Lẩu gà lá é (nhóm 2–4 người) | Món 4 |
| Ngày 3 — Phía Nam | Sáng | Hồ Tuyền Lâm (1,5–2,5 giờ) + Thiền viện Trúc Lâm (1–1,5 giờ, đi cáp treo Đồi Robin nếu thích) | Địa danh 9, 10 |
| Ngày 3 | Chiều | Thác Datanla (2–3 giờ, máng trượt) | Địa danh 11 |
| Ngày 3 | Tối | Về, trả phòng | — |

### 6.2. Lịch trình 2N1Đ (bản gấp — chỉ trung tâm + 1 cụm, sẽ bỏ nhiều điểm)

| Ngày | Buổi | Hoạt động |
|---|---|---|
| Ngày 1 | Sáng | Hồ Xuân Hương + Quảng trường Lâm Viên |
| Ngày 1 | Chiều | Ga Đà Lạt + Nhà thờ Domaine de Marie |
| Ngày 1 | Tối | Chợ đêm + bánh tráng nướng + sữa đậu nành |
| Ngày 2 | Sáng | Thung lũng Tình Yêu (hoặc Hồ Tuyền Lâm + Thiền viện Trúc Lâm — chọn 1 cụm) |
| Ngày 2 | Chiều | Thác Datanla (nếu chọn cụm Nam) hoặc Langbiang (nếu chọn cụm Bắc); tối về |

### 6.3. Lịch trình 4N3Đ (bản chậm — hợp gia đình có trẻ nhỏ)

| Ngày | Buổi | Hoạt động |
|---|---|---|
| Ngày 1 | Cả ngày | Như ngày 1 của lịch trình 3N2Đ (trung tâm) |
| Ngày 2 | Cả ngày | Như ngày 2 của lịch trình 3N2Đ (phía Bắc: Cầu Đất + Thung lũng Tình Yêu + Langbiang) |
| Ngày 3 | Sáng | Hồ Tuyền Lâm + Thiền viện Trúc Lâm |
| Ngày 3 | Chiều | Thác Datanla |
| Ngày 4 | Sáng | Làng Cù Lần (nửa ngày, tính cả di chuyển) hoặc Hồ Suối Vàng |
| Ngày 4 | Chiều | Dinh Bảo Đại III + Biệt thự Hằng Nga (Crazy House), mua đặc sản, về |

## 7. Bảng chi phí ước tính (1 người, 3N2Đ từ TP.HCM, ở 3 sao trung tâm, đi xe khách đêm)

| Hạng mục | Ước tính 3N2Đ / người | Căn cứ |
|---|---|---|
| Xe SG–Đà Lạt khứ hồi (giường nằm) | 300.000–900.000đ | Mục 4.1 (Phương Trang ~290.000–300.000đ/vé; Thành Bưởi 325.000–500.000đ/vé) |
| Ở 2 đêm (chia đôi phòng 3 sao) | 600.000–1.200.000đ | Mục 2 (3 sao trung tâm ~750.000–1.200.000đ/đêm, chia 2 người) |
| Ăn 3 ngày (sáng 20k + trưa/tối 50–150k/bữa) | 450.000–900.000đ | Mục 3 (món 15.000–60.000đ/phần; lẩu nhóm 200.000–400.000đ/nồi chia 2–4 người) |
| Vé tham quan (Langbiang, Thung lũng Tình Yêu, thác…) | 150.000–400.000đ | Mục 1 (Thung lũng 225.000–250.000đ là khoản lớn nhất; Ga 50.000đ; Datanla 50.000–80.000đ; Langbiang cổng 50.000đ + jeep 100.000–120.000đ) |
| Thuê xe máy 2–3 ngày | 200.000–450.000đ | Mục 5 (xe số 80.000–130.000đ/ngày; tay ga 120.000–200.000đ/ngày) |
| Taxi sân bay / phát sinh | 100.000–300.000đ | Mục 4.3 (taxi sân bay 155.000–300.000đ/chuyến nếu không đi buýt 30.000–50.000đ) |
| **Tổng ước tính** | **1.800.000–4.150.000đ/người** | Cộng các khoảng trên |
| Nếu đi máy bay thay xe khách | Cộng thêm ~700.000–1.500.000đ/chiều so với vé xe | Mục 4.1 (vé SGN–DLI ~700.000–1.800.000đ/chiều) |
| Nếu đi từ Hà Nội | Vé máy bay là hạng mục lớn nhất: ~1.400.000–2.650.000đ/chiều | Mục 4.2 |

Quy tắc hiển thị giá trong app: luôn ghi khoảng giá + ngày kiểm (05–06/11/2026), không ghi một giá cố định.

## 8. Checklist mang theo

- Áo khoác (Đà Lạt lạnh buổi sáng/tối), áo mưa mỏng, giày đi bộ / leo Langbiang (đi bộ nhiều ở Thung lũng Tình Yêu, đường xuống thác Datanla ~600 m).
- CCCD + bằng lái A1 (nếu thuê xe máy), tiền mặt lẻ (chợ đêm, quán nhỏ — hầu hết quầy chợ chỉ nhận tiền mặt).
- Sạc dự phòng, thuốc cơ bản, kem chống nắng (nắng cao nguyên gắt dù trời mát).
- Hỏi giá trước khi gọi món/mua đồ ở chợ đêm và trước khi lên đạp vịt/xe ngựa/thuyền.

## 9. Mục chưa kiểm được / cần xác nhận lại (ghi rõ, không bịa)

**Địa danh:**
1. Giá vé xe jeep Langbiang — đa số nguồn 2026 ghi 100.000–120.000đ/khứ hồi, onelife.vn ghi ~200.000đ. Chưa có nguồn chính thức từ KDL.
2. Giá vé Làng Cù Lần — 100.000đ / 150.000đ / 200.000đ cùng tồn tại.
3. Giá vé vào Đồi chè Cầu Đất — miễn phí hay 30.000đ, nguồn mâu thuẫn.
4. Giá cáp treo Đồi Robin – Thiền viện Trúc Lâm — 80.000/100.000đ vs 120.000/150.000đ (khảo sát 16/10/2026).
5. Giá vé tham quan Thác Datanla — 50.000đ (nguồn cũ) vs 80.000đ (11/2026).
6. Giá vé Thác Prenn — mô hình Tea Resort Prenn mới (110.000–288.000đ) vs giá cũ 30.000–50.000đ.
7. Giờ mở cửa Thiền viện Trúc Lâm — 5:00–21:00 vs 7:00–17:00.
8. Giờ mở cửa Quảng trường Lâm Viên — 24/7 vs 7:00–22:00 vs 5:00–22:00.
9. Giờ mở cửa Ga Đà Lạt — 4 khung khác nhau.
10. Giờ đóng chợ đêm Đà Lạt — 23:00 vs 2:00–3:00 sáng.
11. Giờ mở cửa Thung lũng Tình Yêu — 7:00–17:00 / 7:30–17:00 / 7:00–17:30.
12. Giờ mở cửa Làng Cù Lần — 7:00–17:00 / 7:30–17:30.
13. Tọa độ GPS chưa chắc chắn: Đồi chè Cầu Đất (mức đường/thôn), Nhà thờ Domaine de Marie (geocode lệch đường), cổng KDL Langbiang (chỉ có tọa độ đỉnh, cổng chưa xác minh). 3 điểm mới (Dinh Bảo Đại III, Biệt thự Hằng Nga, Hồ Suối Vàng) tọa độ xấp xỉ, cần kiểm lại. Các điểm còn lại đã có tọa độ.
14. Diện tích Hồ Xuân Hương — 25 ha / 32 ha / 43 ha, chưa thống nhất; không ghi con số tuyệt đối.
15. Tên phường mới sau sáp nhập 07/2025 — nhiều nguồn vẫn dùng tên phường cũ.

**Khách sạn/homestay:**
16. Thị Trấn Cổ: chỉ 1 nguồn cho "từ ~400.000đ/đêm", chưa kiểm được khoảng giá trên và khoảng cách tới Hồ Xuân Hương/chợ.
17. Hạng sao Dalat Wonder và Terracotta: nguồn mâu thuẫn 4 sao vs 5 sao.
18. Khoảng cách chính xác của Ngọc Phát, Nice Dream tới Hồ Xuân Hương (chỉ có mô tả "sát hồ"/"đối diện quảng trường"/"cách chợ đêm 110 m").

**Ăn uống:**
19. Bánh canh Phan Rang (quán thứ 2): chỉ có tên đường Trần Phú/Hai Bà Trưng, chưa kiểm được số nhà + giá riêng.
20. Sữa đậu nành Hoa Sữa: số nhà mâu thuẫn (64 / 50 / 3F Tăng Bạt Hổ).
21. Bánh ướt lòng gà Long: 2 nguồn ghi địa chỉ khác nhau (Hẻm 202 Phan Đình Phùng / 68 Trần Phú).

**Phương tiện:**
22. Giá thuê xe máy điện theo ngày: chưa kiểm được mức riêng.
23. Giá xe đưa đón sân bay chung cho mọi khách sạn: không có mức chung, chỉ có ví dụ theo từng khách sạn.
24. Số chuyến xe khách/ngày chính xác từng hãng TP.HCM–Đà Lạt: các nguồn mâu thuẫn nhau.
25. SĐT Homestay Thị Trấn Cổ (0901 399 179) chỉ tra được 1 nguồn (dalat.vn) — chưa đối chiếu được nguồn thứ hai. Số hotline 02633 576 888 của Hoa Dalat Travel là số đại lý du lịch, KHÔNG phải số khách sạn — đã loại bỏ, không ghi vào file. Các SĐT còn lại đã tra được (ngày kiểm 08/11/2026).

## 10. Nhận xét của M và đánh giá người dùng (bổ sung 06/11/2026)

Nhận xét dưới đây là chính kiến của M sau khi đọc review trên Google Maps / TripAdvisor / Foody / blog du lịch uy tín — viết lại bằng lời của M, KHÔNG copy nguyên văn review, KHÔNG bịa số sao. Đánh giá người dùng trong app hiện chưa có — bạn là người đầu tiên.

### 10.1. Địa danh

- **Hồ Xuân Hương**: Hồ trung tâm Đà Lạt, đi bộ/đạp xe quanh hồ sáng sớm và hoàng hôn là trải nghiệm 'phải có'. Điểm yếu: diện tích hồ các nguồn ghi mâu thuẫn (25/32/43 ha); đạp vịt/xe ngựa phải hỏi giá trước. Hợp mọi đối tượng; đi 5h–8h hoặc hoàng hôn, mang áo khoác. (Nguồn tham khảo: Google Maps; hoadalattravel.vn; agotourist.com; ngày kiểm 06/11/2026). Đánh giá người dùng: chưa có đánh giá — bạn là người đầu tiên.
- **Quảng trường Lâm Viên**: Quảng trường biểu tượng với nụ atiso, check-in đẹp nhất sáng sớm/chiều. Điểm yếu: giờ mở cửa mâu thuẫn (24/7 vs 7:00–22:00 vs 5:00–22:00); trưa nắng gắt, tối đông. Hợp giới trẻ, gia đình; đi 5h–7h hoặc 16h–18h. (Nguồn tham khảo: Google Maps; blog.vexere.com; ngày kiểm 06/11/2026). Đánh giá người dùng: chưa có đánh giá — bạn là người đầu tiên.
- **Chợ Đà Lạt / chợ đêm**: Chợ ngày và chợ đêm là linh hồn ẩm thực Đà Lạt: bánh tráng nướng, sữa đậu nành, đặc sản. Điểm yếu: giờ đóng chợ đêm mâu thuẫn (23:00 vs 2:00–3:00 sáng); hầu hết quầy chỉ nhận tiền mặt. Hợp mọi đối tượng; mang tiền lẻ, hỏi giá trước. (Nguồn tham khảo: Google Maps; hoadalattravel.vn; ngày kiểm 06/11/2026). Đánh giá người dùng: chưa có đánh giá — bạn là người đầu tiên.
- **Ga Đà Lạt**: Ga cổ đẹp nhất Việt Nam, tàu Đà Lạt–Trại Mát là trải nghiệm hoài cổ hiếm có. Điểm yếu: giờ mở cửa 4 khung khác nhau, tàu cần tối thiểu ~15–20 khách mới chạy — gọi hỏi ga trước. Hợp người yêu kiến trúc, gia đình; đi sáng, hỏi lịch tàu trước. (Nguồn tham khảo: Google Maps; hoadalattravel.vn; ngày kiểm 06/11/2026). Đánh giá người dùng: chưa có đánh giá — bạn là người đầu tiên.
- **Thung lũng Tình Yêu (TTC World, gồm Đồi Mộng Mơ)**: Khu rộng 137 ha, cảnh quan và trò chơi nhiều, hợp cặp đôi/gia đình chơi nửa ngày. Điểm yếu: vé 225.000–250.000đ cao, một số trò thu thêm; khu rất rộng, đi bộ nhiều. Hợp cặp đôi, gia đình; mang giày bệt, đi 8h–10h hoặc 15h–17h. (Nguồn tham khảo: Google Maps; vinpearl.com; agotourist.com; ngày kiểm 06/11/2026). Đánh giá người dùng: chưa có đánh giá — bạn là người đầu tiên.
- **Núi Langbiang**: Ngắm toàn cảnh Đà Lạt từ đồi Radar, săn mây buổi sáng đẹp. Điểm yếu: jeep chỉ lên Radar, không lên đỉnh Núi Bà (leo bộ 3–4 giờ); giá jeep mâu thuẫn (100.000–120.000đ vs ~200.000đ); jeep chờ đủ 5–6 khách. Hợp người thích ngắm cảnh, nhóm bạn; đi sớm, hỏi giá jeep trước. (Nguồn tham khảo: Google Maps; hoadalattravel.vn; ngày kiểm 06/11/2026). Đánh giá người dùng: chưa có đánh giá — bạn là người đầu tiên.
- **Làng Cù Lần**: Làng dưới chân Langbiang, không gian yên tĩnh, hợp gia đình/team-building nửa ngày. Điểm yếu: vé mâu thuẫn (100.000/150.000/200.000đ); đường Ankroet quanh co, dốc. Hợp gia đình, nhóm bạn; gọi hotline KDL xác nhận giá trước. (Nguồn tham khảo: Google Maps; hoadalattravel.vn; ngày kiểm 06/11/2026). Đánh giá người dùng: chưa có đánh giá — bạn là người đầu tiên.
- **Đồi chè Cầu Đất (Cầu Đất Farm)**: Đồi chè săn mây đẹp nhất Đà Lạt, tour trà 90.000đ, combo săn mây 250.000đ. Điểm yếu: vé vào mâu thuẫn (miễn phí hay 30.000đ); tọa độ chỉ ở mức đường/thôn, chưa phải cổng farm chính xác. Hợp giới trẻ, cặp đôi; đi trước 8:30 sáng. (Nguồn tham khảo: Google Maps; mia.vn; tatravel.vn; ngày kiểm 06/11/2026). Đánh giá người dùng: chưa có đánh giá — bạn là người đầu tiên.
- **Hồ Tuyền Lâm**: Hồ lớn yên tĩnh, kayak và cắm trại đẹp, hoàng hôn rất ăn ảnh. Điểm yếu: hồ rất rộng, phải chọn 1 điểm dừng; kayak 150.000–500.000đ tùy loại. Hợp cặp đôi, gia đình; đi sáng sớm hoặc hoàng hôn, mặc áo phao khi kayak. (Nguồn tham khảo: Google Maps; travelbui.com; mia.vn; ngày kiểm 06/11/2026). Đánh giá người dùng: chưa có đánh giá — bạn là người đầu tiên.
- **Thiền viện Trúc Lâm**: Thiền viện trên Hồ Tuyền Lâm, yên tĩnh, đi cáp treo Đồi Robin là trải nghiệm đẹp. Điểm yếu: giờ mở cửa mâu thuẫn lớn (5:00–21:00 vs 7:00–17:00); cáp treo 80.000–120.000đ/chiều vs 120.000–150.000đ khứ hồi (khảo sát 16/10/2026). Hợp mọi đối tượng; ăn mặc kín đáo, đi cáp treo buổi sáng. (Nguồn tham khảo: Google Maps; hoadalattravel.vn; ngày kiểm 06/11/2026). Đánh giá người dùng: chưa có đánh giá — bạn là người đầu tiên.
- **Thác Datanla**: Thác đẹp, máng trượt Alpine Coaster là trò 'phải thử' ở Đà Lạt. Điểm yếu: vé tham quan 50.000đ (cũ) vs 80.000đ (11/2026); vé tham quan và vé trò tính riêng, số 1 và số 3 ở 2 ga khác nhau dễ nhầm. Hợp gia đình, nhóm bạn; đi 7:30–8:00 hoặc 11:30–12:30 tránh xếp hàng. (Nguồn tham khảo: Google Maps; hoadalattravel.vn; ngày kiểm 06/11/2026). Đánh giá người dùng: chưa có đánh giá — bạn là người đầu tiên.
- **Thác Prenn**: Thác trong tổ hợp Tea Resort Prenn mới, không gian rộng, hợp gia đình/người lớn tuổi. Điểm yếu: giá mới 110.000–288.000đ tùy gói, khác hẳn giá cũ 30.000–50.000đ; nhiều gói/combo dễ nhầm. Hợp gia đình; chọn gói vé trước ở quầy. (Nguồn tham khảo: Google Maps; hoadalattravel.vn; ngày kiểm 06/11/2026). Đánh giá người dùng: chưa có đánh giá — bạn là người đầu tiên.
- **Nhà thờ Domaine de Marie (Nhà thờ Mai Anh)**: Nhà thờ đá hồng kiến trúc Gothic Pháp + mái nhà rông, chụp ảnh đẹp. Điểm yếu: tọa độ geocode lệch đường Mai Hắc Đế — chưa kiểm được chính xác; giờ tham quan nhiều khung (7:00–11:00 & 14:00–17:00). Hợp người yêu kiến trúc, cặp đôi; tránh giờ lễ. (Nguồn tham khảo: Google Maps; hoadalattravel.vn; ngày kiểm 06/11/2026). Đánh giá người dùng: chưa có đánh giá — bạn là người đầu tiên.
- **Dinh Bảo Đại III (Dinh 3)**: Dinh III là dinh Bảo Đại được tham quan nhiều nhất, kiến trúc Pháp và vườn thông đẹp, cách trung tâm ~2 km. Điểm yếu: giá vé các nguồn 2026 ghi khác nhau (30.000–60.000đ), nên hỏi tại cổng; 3 dinh dễ nhầm nhau (Dinh I/II/III ở 3 đồi khác nhau). Hợp người yêu lịch sử; ghép cùng Crazy House và Hồ Tuyền Lâm. (Nguồn tham khảo: tripi.vn; Google Maps; newlifetravel.vn; ngày kiểm 08/11/2026). Đánh giá người dùng: chưa có đánh giá — bạn là người đầu tiên.
- **Biệt thự Hằng Nga (Crazy House)**: Crazy House lọt top 10 nhà kỳ lạ thế giới, kiến trúc uốn lượn như cổ tích — điểm check-in độc nhất Đà Lạt. Điểm yếu: chưa kiểm được vé/giờ riêng; cầu thang hẹp và dốc, không hợp người sợ độ cao/trẻ nhỏ chạy nhảy. Hợp giới trẻ, gia đình có trẻ lớn; đi sáng, mang giày bệt. (Nguồn tham khảo: gtrip.vn; tripi.vn; Google Maps; ngày kiểm 06/11/2026). Đánh giá người dùng: chưa có đánh giá — bạn là người đầu tiên.
- **Hồ Suối Vàng**: Hồ Suối Vàng là điểm săn mây buổi sáng nổi tiếng, gần Làng Cù Lần – Langbiang. Điểm yếu: phải dậy rất sớm (trước bình minh), đường đi tối và lạnh; chưa kiểm được dịch vụ/giờ riêng. Hợp người săn mây, nhiếp ảnh; đi cùng cung Suối Vàng – Cù Lần, mang áo ấm. (Nguồn tham khảo: home.vn; Google Maps; ngày kiểm 06/11/2026). Đánh giá người dùng: chưa có đánh giá — bạn là người đầu tiên.

### 10.2. Món ăn

- **Bánh mì xíu mại**: Xíu mại nóng chấm bánh mì — món sáng 'phải thử' ở Đà Lạt, 15.000–20.000đ rẻ. Điểm yếu: quán Hoàng Diệu chỉ bán sáng 06:00–10:00, hết sớm; quán đông. Hợp ăn sáng; đi trước 9h. (Nguồn tham khảo: Google Maps; luhanhvietnam.com.vn; agotourist.com; ngày kiểm 06/11/2026). Đánh giá người dùng: chưa có đánh giá — bạn là người đầu tiên.
- **Bánh căn**: Bánh căn giòn, nhân trứng/tôm/mực — ăn sáng/xế ấm bụng trời lạnh. Điểm yếu: quán Lệ giá 30.000–60.000đ (có nguồn ghi 35.000–65.000đ); chờ lâu giờ cao điểm. Hợp ăn sáng. (Nguồn tham khảo: Google Maps; travel.com.vn; agotourist.com; ngày kiểm 06/11/2026). Đánh giá người dùng: chưa có đánh giá — bạn là người đầu tiên.
- **Bánh ướt lòng gà**: Bánh ướt mềm, lòng gà dai — món riêng Đà Lạt, quán Trang được nhắc nhiều nhất. Điểm yếu: địa chỉ quán Long 2 nguồn ghi khác nhau (ưu tiên Trang); giá 30.000–60.000đ. Hợp ăn trưa/xế. (Nguồn tham khảo: Google Maps; bachhoaxanh.com; ngày kiểm 06/11/2026). Đánh giá người dùng: chưa có đánh giá — bạn là người đầu tiên.
- **Lẩu gà lá é**: Lẩu gà lá é cay thơm, nồi 2–4 người 200.000–400.000đ — món tối nhóm 'phải thử'. Điểm yếu: nhiều quán cùng tên Tao Ngộ, phải ghi rõ cơ sở 5 Ba Tháng Tư; quán đông, chờ lâu. Hợp nhóm 2–4 người ăn tối. (Nguồn tham khảo: Google Maps; agotourist.com; hoadalattravel.vn; ngày kiểm 06/11/2026). Đánh giá người dùng: chưa có đánh giá — bạn là người đầu tiên.
- **Bánh tráng nướng**: 'Pizza Đà Lạt', ăn vặt chợ đêm, 15.000–25.000đ/cái. Điểm yếu: quầy chợ đêm đông, giá topping tới 40.000đ; ăn nhiều dễ ngán. Hợp ăn tối/chợ đêm. (Nguồn tham khảo: Google Maps; hoadalattravel.vn; vinpearl.com; ngày kiểm 06/11/2026). Đánh giá người dùng: chưa có đánh giá — bạn là người đầu tiên.
- **Nem nướng**: Nem nướng Đà Lạt cuốn rau, quán Bà Hùng đông khách nhất. Điểm yếu: giá 30.000–60.000đ tùy phần; quán đông giờ ăn. Hợp ăn trưa/tối. (Nguồn tham khảo: Google Maps; agotourist.com; ngày kiểm 06/11/2026). Đánh giá người dùng: chưa có đánh giá — bạn là người đầu tiên.
- **Gà nướng cơm lam**: Gà nướng + cơm lam ống tre — món nhóm đặc trưng Tây Nguyên, 230.000–400.000đ/nhóm 2–4 người. Điểm yếu: quán Tư Béo/Trên Đỉnh Đồi Trăng/Khương Duy ở 3 hướng khác nhau, cần chọn theo cung đường. Hợp nhóm ăn trưa/tối. (Nguồn tham khảo: Google Maps; mia.vn; ngày kiểm 06/11/2026). Đánh giá người dùng: chưa có đánh giá — bạn là người đầu tiên.
- **Bún bò ấp Ánh Sáng**: Bún bò khu ấp Ánh Sáng, tô 30.000–50.000đ, ăn sáng ấm bụng. Điểm yếu: khu ấp nhỏ, quán Út Phi/Út Vân dễ nhầm. Hợp ăn sáng. (Nguồn tham khảo: Google Maps; saigonstartravel.com; agotourist.com; ngày kiểm 06/11/2026). Đánh giá người dùng: chưa có đánh giá — bạn là người đầu tiên.
- **Bánh canh**: Bánh canh Xuân An hơn 30 năm, tô 30.000–44.000đ. Điểm yếu: quán Phan Rang chưa kiểm được số nhà + giá riêng; menu cũ 18.000–30.000đ đã lỗi thời. Hợp ăn sáng/trưa; ưu tiên Xuân An (15A Nhà Chung). (Nguồn tham khảo: Google Maps; zalopay.vn; agotourist.com; ngày kiểm 06/11/2026). Đánh giá người dùng: chưa có đánh giá — bạn là người đầu tiên.
- **Sữa đậu nành nóng / dâu tây**: Sữa đậu nành nóng chợ đêm là 'nghi thức' tối Đà Lạt, 7.000–15.000đ/ly. Điểm yếu: số nhà Hoa Sữa mâu thuẫn (64/50/3F Tăng Bạt Hổ); dâu tây lắc giá theo nguồn cũ. Hợp ăn tối chợ đêm; uống nóng, ngồi vỉa hè ngắm phố. (Nguồn tham khảo: Google Maps; vinwonders.com; riviu.vn; ngày kiểm 06/11/2026). Đánh giá người dùng: chưa có đánh giá — bạn là người đầu tiên.

### 10.3. Chỗ ở

Tất cả chỗ ở đã có trường đánh giá người dùng (mảng rỗng trong JSON) — chưa có đánh giá, bạn là người đầu tiên.

## 11. Trời mưa thì đi đâu (bổ sung 08/11/2026)

Mưa nhỏ vẫn đi được các điểm có mái che trong trung tâm; mưa lớn thì bỏ thác, đồi chè và điểm xa, ở lại trung tâm ăn món nóng, ngồi cà phê ngắm mưa.

| # | Điểm | Ghi chú |
|---|---|---|
| 1 | Ga Đà Lạt | Nhà ga cổ có mái che, tham quan trong nhà; tàu Đà Lạt–Trại Mát cần hỏi lịch trước |
| 2 | Nhà thờ Domaine de Marie | Nhà thờ có mái, tham quan trong nhà; tránh giờ lễ |
| 3 | Dinh Bảo Đại III | Dinh thự tham quan trong nhà |
| 4 | Biệt thự Hằng Nga (Crazy House) | Tham quan trong nhà; cầu thang hẹp và dốc, đi chậm khi ướt |
| 5 | Chợ Đà Lạt / chợ đêm | Chợ có mái che, ăn vặt và mua đặc sản; mang tiền lẻ |

Nguồn: hoadalattravel.vn — "Kinh nghiệm du lịch Đà Lạt mùa mưa" và "47 địa điểm du lịch Đà Lạt 2026" (ngày kiểm 08/11/2026). Các điểm đều đã có trong mục 1, chỉ chọn lại theo tiêu chí trú mưa.

## 12. Đi cặp đôi (bổ sung 08/11/2026)

**Chỗ ở hợp cặp đôi** (theo trường "Hợp với ai" trong mục 2): Khách sạn Ngọc Phát, Nice Dream Hotel, Sandals Flora Hotel, Zen Valley Dalat, New Life Hotel, Homestay Thị Trấn Cổ.

**Điểm hợp cặp đôi** (từ mục 1): Thung lũng Tình Yêu (TTC World, gồm Đồi Mộng Mơ), Hồ Tuyền Lâm, Nhà thờ Domaine de Marie (Nhà thờ Mai Anh), Đồi chè Cầu Đất (Cầu Đất Farm).

## 13. Dặn an toàn xe máy + đặt phòng (bổ sung 08/11/2026)

Đà Lạt nhiều dốc cao và đường đèo, sương mù dày buổi sáng và chiều tối, mưa làm mặt đường trơn. Thuê xe số (Wave, Sirius) leo dốc và đổ đèo an toàn hơn xe ga yếu; lên dốc giữ ga đều, xuống dốc dài về số thấp (số 2–3), không rà phanh liên tục, không tắt máy thả trôi; trời mưa đi chậm, giữ khoảng cách, bật đèn cos cả ban ngày. Kiểm tra phanh, lốp, đèn trước khi nhận xe. Đặt phòng trước 2–3 tuần nếu đi cuối tuần, 30–60 ngày nếu đi lễ/Tết. (Nguồn: xemayanthanhphat.com; agotourist.com; hoadalattravel.vn — ngày kiểm 08/11/2026.)

**Khung chung cho tỉnh miền núi/đèo:** Khung chung cho tỉnh miền núi/đèo: đường dốc, đèo quanh co, sương mù và mưa làm đường trơn — đi chậm, giữ khoảng cách, bật đèn khi sương mù; thuê xe số leo dốc tốt hơn xe ga yếu; xuống dốc dài về số thấp (số 2–3), không rà phanh liên tục, không tắt máy thả trôi; kiểm tra phanh, lốp, đèn trước khi nhận xe; đặt phòng trước 2–3 tuần vào cuối tuần, sớm hơn vào lễ/Tết. (Khung chung — không phải chi tiết riêng của từng tỉnh. Nguồn: xemayanthanhphat.com; agotourist.com; hoadalattravel.vn — ngày kiểm 08/11/2026.)

## 14. Mùa + tháng — tháng 11/2026 (bổ sung 08/11/2026)

- **Mùa:** tháng chuyển giao từ mùa mưa (tháng 5–10) sang mùa khô (tháng 11–4); mưa giảm dần nhưng vẫn có thể mưa bất chợt buổi chiều.
- **Nhiệt độ:** ban ngày 20–25°C; ban đêm và sáng sớm 14–16°C (13°C chỉ gặp ngày mưa), sương mù sáng sớm và chiều tối.
- **Mặc gì:** mặc nhiều lớp — áo len mỏng hoặc áo nỉ + áo khoác chắn gió ban ngày; áo khoác dày + khăn choàng buổi tối; mang theo áo mưa mỏng hoặc ô gấp.

Nguồn: newlifetravel.vn; weatherspark.com; worldweatheronline.com; thongxanhspa.com (ngày kiểm 08/11/2026).

## 15. Cảnh báo chặt chém + lừa cọc (bổ sung 08/11/2026)

- **Lừa cọc đặt phòng: kẻ gian lấy ảnh/video thật của khách sạn, villa, homestay ở Đà Lạt đăng lên các hội nhóm du lịch, giả làm chủ nhà, yêu cầu chuyển cọc 50% - 100% với lý do lễ/Tết hết phòng, rồi chặn liên lạc sát ngày khách đến.** Cách tránh: Chỉ đặt qua ứng dụng/website đã kiểm chứng hoặc kênh chính thức của cơ sở lưu trú; gọi lại số điện thoại tìm độc lập (không dùng số người rao đưa) để xác nhận booking và tên chủ tài khoản nhận tiền trước khi chuyển cọc. (Nguồn: dalat.vn — Cảnh giác thủ đoạn lừa tiền cọc khách sạn, villa, homestay (theo baolamdong.vn, Công an tỉnh Lâm Đồng) (ngày kiểm 08/11/2026))
- **Chặt chém ở chợ đêm Đà Lạt: quán cóc sát chợ không niêm yết giá; từng có khách ăn 3 tô cháo bị tính 400.000đ.** Cách tránh: Hỏi giá thật kỹ và chỉ ăn ở quán có menu niêm yết giá; tránh ăn uống ở các hàng quán cóc sát chợ Đà Lạt khi chưa biết rõ giá. (Nguồn: cuongdulich.com — Note ngay 5 KHÔNG để tránh dính 5 CÚ LỪA khi đi du lịch Đà Lạt (ngày kiểm 08/11/2026))
- **Taxi và 'cò' vườn dâu: một số tài xế taxi làm cò, đưa khách tới quán ăn, quán cà phê, homestay hoặc vườn dâu để ăn hoa hồng; có chiêu 'tham quan thử dâu miễn phí' rồi bán dâu giá cao.** Cách tránh: Tự chọn quán/homestay đã tìm hiểu trước, không đi theo giới thiệu của tài xế hay người chèo kéo dọc đường; vào vườn dâu thì hỏi giá vé và giá dâu trước khi hái. (Nguồn: cuongdulich.com — Note ngay 5 KHÔNG để tránh dính 5 CÚ LỪA khi đi du lịch Đà Lạt (ngày kiểm 08/11/2026))
- **Lừa đảo thuê xe máy: giá rẻ bất thường, thúc chuyển cọc ngay, không cho quay tình trạng xe lúc giao, giữ giấy tờ không lập biên nhận, sau đó dựng lỗi trầy xước để đòi tiền bồi thường.** Cách tránh: Không chuyển cọc chỉ vì giá rẻ; khi nhận xe quay video liền mạch toàn bộ vết trầy, kiểm phanh/lốp/đèn/còi, chốt bằng tin nhắn rõ dòng xe, giá, giờ nhận-trả, tiền cọc và điều kiện hoàn cọc; chỉ đưa bản photo CCCD, không đưa bản gốc. (Nguồn: hoadalattravel.vn — Lừa đảo thuê xe máy Đà Lạt: 12 dấu hiệu & cách tránh (ngày kiểm 08/11/2026))
- **Homestay giá rẻ 'treo đầu dê bán thịt chó': rao phòng đẹp lung linh chỉ 60.000đ/người trong khi mặt bằng Đà Lạt thường 300.000 - 600.000đ/đêm; đến nơi phòng dơ bẩn, tối tăm, xa trung tâm, không đòi lại được cọc.** Cách tránh: Nghi ngờ mọi phòng giá thấp bất thường kèm ảnh quá đẹp; đọc đánh giá thật, kiểm tra vị trí trên bản đồ và chính sách hoàn cọc trước khi chuyển tiền. (Nguồn: cuongdulich.com — Note ngay 5 KHÔNG để tránh dính 5 CÚ LỪA khi đi du lịch Đà Lạt (ngày kiểm 08/11/2026))


## 16. An toàn đường đèo + thuê xe máy (bổ sung 08/11/2026)

Đà Lạt nhiều dốc cao và đường đèo, sương mù dày buổi sáng và chiều tối, mưa làm mặt đường trơn — đã dặn trong dữ liệu tỉnh (dan_an_toan_xe_may). BỔ SUNG theo tình hình mới: đèo Prenn đang sạt lở, tháng 9/2026 UBND tỉnh Lâm Đồng đã công bố tình huống khẩn cấp về thiên tai đối với đèo Prenn; đến 03/11/2026 cơ quan chức năng vẫn rào chắn 2 làn (lưu thông 2 làn còn lại) để khắc phục sạt lở đoạn Km225+250, taluy cao 20-25m mất ổn định khi mưa. Qua đoạn này phải đi chậm, giữ khoảng cách, tuyệt đối không dừng chụp ảnh dưới chân taluy, tránh đi khi mưa lớn. Đèo Bảo Lộc (QL20, 10–15 km, khoảng 107 khúc cua gấp) và đèo Chuối mặt đường ẩm trơn do sương tích tụ — giữ tốc độ 30-40km/h ở điểm mù, không vượt ở cua khuất. Đèo Mimosa nhiều xe tải, thiếu đèn chiếu sáng sau 18h — tránh đi tối. Đèo Hòn Giao (Khánh Lê, 33km nối Nha Trang - Đà Lạt) dài, sương mù dày, chỉ đi ban ngày khi tay lái vững. Xuống dốc dài về số thấp (số 2-3), không rà phanh liên tục, không tắt máy thả trôi; thuê xe số leo dốc/đổ đèo an toàn hơn xe ga yếu; kiểm tra phanh, lốp, đèn trước khi nhận xe.

**Đèo/đoạn cần chú ý:**
- Đèo Prenn (QL20, cửa ngõ Đà Lạt) — sạt lở Km225+250, taluy 20-25m mất ổn định khi mưa; tình huống khẩn cấp công bố tháng 9/2026, đến 03/11/2026 vẫn rào chắn 2 làn để khắc phục
- Đèo Bảo Lộc (QL20, 10–15 km, khoảng 107 khúc cua gấp) — dốc cao, cua gấp liên tiếp, mặt đường ẩm trơn do sương
- Đèo Mimosa (đèo Prenn 2) — nhiều xe tải trọng lớn, thiếu đèn chiếu sáng sau 18h
- Đèo Chuối (QL20, huyện Đạ Huoai) — cua gấp, mặt đường ẩm trơn do sương tích tụ
- Đèo Hòn Giao / Khánh Lê (tỉnh lộ 723, Nha Trang - Đà Lạt, dài 33km) — đèo dài, sương mù dày, nhiều cua

(Nguồn: baomoi.com (Báo Sài Gòn Giải Phóng) — Lâm Đồng khắc phục sạt lở trên đèo Prenn, quốc lộ 28, 03/11/2026; hoadalattravel.vn — Top 7 cung đường đèo Đà Lạt 2026; 2banh.vn — 8 cung đèo ngoạn mục đưa lối về Đà Lạt; 2banh.vn — 18 con đèo đẹp nhất Việt Nam (ngày kiểm 08/11/2026))


## 17. Số khẩn cấp + xử lý sự cố (bổ sung 08/11/2026)

- Công an: 113 — Cấp cứu: 115 — Cứu hỏa: 114
- Bệnh viện Hoàn Mỹ Đà Lạt (khoa cấp cứu trực 24/24): 0263 3510878 (Nguồn: website Bệnh viện Hoàn Mỹ Đà Lạt — hoanmy.com/dalat (ngày kiểm 08/11/2026))

(Nguồn: số chung cả nước 113/115/114 là số khẩn cấp quốc gia; số riêng theo nguồn ghi trong từng mục (ngày kiểm 08/11/2026))


## 18. Giờ đẹp chụp ảnh (bổ sung 08/11/2026)

| # | Điểm | Giờ đẹp | Nguồn |
|---|---|---|---|
| 1 | Đồi chè Cầu Đất (Cầu Đất Farm) | Xuất phát 4:00-4:30 sáng, mây đẹp 5:00-6:30; mùa mây đẹp nhất tháng 8-12 | hoadalattravel.vn; caonguyentourist.com; newlifetravel.vn (ngày kiểm 08/11/2026) |
| 2 | Hồ Xuân Hương | 5:30-7:00 sáng sớm ánh sáng dịu, ít người; 16:30-18:00 hoàng hôn mặt hồ vàng ấm | Kinh nghiệm chụp ảnh Đà Lạt — khung giờ vàng sáng sớm và chiều muộn (hoadalattravel.vn) (ngày kiểm 08/11/2026) |
| 3 | Hồ Tuyền Lâm | 16:30-18:00 hoàng hôn, mặt hồ lặng phản chiếu rừng thông; sáng sớm 5:30-7:00 có sương mỏng trên mặt hồ | Kinh nghiệm chụp ảnh Đà Lạt — khung giờ vàng sáng sớm và chiều muộn (hoadalattravel.vn) (ngày kiểm 08/11/2026) |


## 19. Cho người chạy giải (bổ sung 08/11/2026)

**Giải chạy (đã kiểm nguồn):**
- Dalat Ultra Trail — tháng 3 hằng năm (mùa 2026: 27-29/3/2026, xuất phát tại Thung lũng Tình Yêu) (Nguồn: ticket.irace.vn — Giải siêu marathon địa hình Dalat Ultra Trail 2026; trailrunner.com — Dalat Ultra Trail (tổ chức hằng năm vào tháng 3) (ngày kiểm 08/11/2026))
- Lâm Đồng Trail — tháng 11 (mùa 2026: 7-8/11/2026, xuất phát tại Thung lũng Tình Yêu, các cự ly 5-85km) (Nguồn: vietnam.vn — Lâm Đồng Trail 2026 thu hút hơn 5.600 vận động viên; Lâm Đồng Trail 2026 gọi tên những nhà vô địch, 08/11/2026 (ngày kiểm 08/11/2026))

**Điểm chạy bộ đẹp:** Quanh Hồ Xuân Hương (đường ven hồ bằng phẳng, trung tâm); Hồ Tuyền Lâm (đường ven hồ, rừng thông, ít xe); Đường lên núi Langbiang (dốc dài, tập leo dốc cho trail).

**Chỗ ở gần điểm xuất phát** (lấy từ mục chỗ ở đã có): Khách sạn Ngọc Phát; Nice Dream Hotel; Sandals Flora Hotel.

(Nguồn: Tên giải + thời gian theo ticket.irace.vn, trailrunner.com, vietnam.vn; chỗ ở lấy từ dữ liệu chỗ ở đã có của tỉnh (ngày kiểm 08/11/2026))


## 20. Hướng dẫn chia tiền nhóm / quỹ chung (bổ sung 08/11/2026 — mẫu chung cho mọi tỉnh)

Trước chuyến đi, cả nhóm lập quỹ chung: mỗi người đóng một khoản bằng nhau vào quỹ, cử 1 người giữ quỹ và ghi mọi khoản chi chung (ăn, xe, vé) vào một sổ chung (sổ giấy hoặc ghi chú điện thoại cả nhóm cùng xem được). Tiền ăn chung, tiền xe chung, vé tham quan chung thì trả từ quỹ; tiền riêng (mua sắm, ăn vặt riêng) mỗi người tự trả, không lấy từ quỹ. Cuối mỗi ngày, người giữ quỹ chốt sổ: đọc to các khoản đã chi trong ngày cho cả nhóm cùng đối chiếu. Cuối chuyến, tổng chi quỹ chia đều theo đầu người, thừa thì trả lại, thiếu thì mỗi người bù thêm phần bằng nhau. Giữ lại toàn bộ hóa đơn/biên lai đến khi chốt sổ xong.
