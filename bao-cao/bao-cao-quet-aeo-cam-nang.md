# Báo cáo quét AEO — App Cẩm nang du lịch

- **Ngày làm:** 08/11/2026
- **Khung áp dụng:** Bài AEO anh gửi (Query Fan-out, H1 định nghĩa trực diện, FAQ 100% câu hỏi thật 40–60 từ, Schema FAQPage JSON-LD khớp 1:1).
- **Nguồn câu hỏi thật:** `~/workspace/nhu-cau-tu-review-du-lich-phuot.md` — 25 nhu cầu từ 60 nguồn review thật (58 web + 2 mạng xã hội, tiếng Việt 2025–2026) + 6 câu hỏi của chị Hoa (45 tuổi, lần đầu đi Đà Lạt với chồng, 3 ngày 2 đêm).
- **Phạm vi:** Chỉ soạn file. KHÔNG đụng artifact/app/code.
- **Tình trạng FAQ hiện tại của app:** Chỉ có đúng **6 câu của chị Hoa** — chưa có câu nào từ review. Đây là lỗ hổng AEO lớn nhất của app, bên cạnh H1.

---

## 1. Chấm H1 hiện tại

**H1 hiện tại trên trang Khám phá: "Đi đâu, có gì?"**

Chấm theo đúng khung bài AEO: **KHÔNG ĐẠT — đúng lỗi "H1 khẩu hiệu mơ hồ" trong bài.**

- Không nói app là gì (cẩm nang du lịch), không nói cung cấp dịch vụ gì, không nói cho ai, không nói ở đâu.
- Không chứa từ khóa nào mà khách thật gõ: du lịch tự túc, 34 tỉnh, khách sạn, món ăn, chi phí, lịch trình.
- AI đọc vào không phân biệt được đây là cẩm nang du lịch hay trang ảnh, blog cảm xúc hay quảng cáo tour.
- Dòng nhỏ dưới banner ("Cẩm nang đủ 34 tỉnh — Đà Lạt đã duyệt") có chứa thông tin thật nhưng nằm ngoài H1, AI Search ưu tiên H1.

**Đoạn định nghĩa trực diện đề xuất — đặt ngay dưới H1, 210 ký tự (dưới giới hạn 500 ký tự):**

> Cẩm nang du lịch tự túc 34 tỉnh thành Việt Nam: địa danh, khách sạn kèm số điện thoại thật, món ăn kèm quán và giá, chi phí theo mức, lịch trình mẫu 2–4 ngày và công cụ lập kế hoạch 4 bước cho người đi lần đầu.

Đủ 4 yếu tố bài AEO đòi: app là gì (cẩm nang du lịch tự túc) + cung cấp gì (địa danh, khách sạn kèm số, món ăn kèm giá, chi phí, lịch trình, lập kế hoạch) + cho ai (người đi lần đầu) + ở đâu (34 tỉnh thành Việt Nam).

---

## 2. Bảng phủ câu hỏi — 20 câu hỏi thực tế nhất

Tần suất = số nguồn nhắc trong 60 nguồn review đã đọc (đếm tay, xếp hạng tương đối).

| # | Câu hỏi thực tế | Nguồn / tần suất | Trạng thái app |
|---|---|---|---|
| 1 | Từ sân bay về khách sạn đi bằng gì? | Chị Hoa | **ĐÃ TRẢ LỜI — trong FAQ** |
| 2 | Trời mưa thì đi đâu? | Chị Hoa + review 2.3 (~5 nguồn) | **ĐÃ TRẢ LỜI — trong FAQ + mục "Trời mưa thì đi đâu"** |
| 3 | Đi xe máy có nguy hiểm không? | Chị Hoa + review 5.1 (~6 nguồn) | **ĐÃ TRẢ LỜI — trong FAQ + mục "Đi xe máy an toàn"** |
| 4 | Đặt phòng ở đâu, cần đặt trước bao lâu? | Chị Hoa + review 1.6 (~6 nguồn) | **ĐÃ TRẢ LỜI — trong FAQ + tab Ở đâu** |
| 5 | Đi mùa này lạnh không, mặc gì? | Chị Hoa + review 1.1 (~19 nguồn) | **ĐÃ TRẢ LỜI — trong FAQ + mục "Mùa nào đi đẹp"** |
| 6 | Mang theo đồ gì? | Chị Hoa + review 1.7 (~8 nguồn) | **ĐÃ TRẢ LỜI — trong FAQ + checklist** |
| 7 | Đi tháng nào đẹp nhất? | Review 1.1 — ~19 nguồn (nhắc nhiều nhất) | **TRẢ LỜI MỘT PHẦN** — có mục "Mùa nào đi đẹp", chưa có trong FAQ |
| 8 | Chuyến 3 ngày 2 đêm hết bao nhiêu tiền? | Review 1.3 — ~13 nguồn | **TRẢ LỜI MỘT PHẦN** — có bảng chi phí + ước tính wizard, chưa có trong FAQ |
| 9 | Thuê xe máy cần kiểm tra gì, có bị lừa cọc không? | Review 2.1 — ~14 nguồn | **TRẢ LỜI MỘT PHẦN** — có dặn xe máy + cảnh báo lừa cọc, chưa có trong FAQ |
| 10 | Làm sao tránh bị chặt chém khi ăn uống, mua sắm? | Review 4.1 — ~9 nguồn | **TRẢ LỜI MỘT PHẦN** — có mục "Cẩn thận chặt chém", chưa có trong FAQ |
| 11 | Ăn gì, quán nào ngon, giá bao nhiêu? | Review 2.2 — ~14 nguồn | **ĐÃ TRẢ LỜI — trong app (tab Ăn gì, 308 món), chưa có trong FAQ** |
| 12 | Đi đến đó bằng phương tiện gì, hãng xe nào tốt? | Review 1.4 — ~10 nguồn | **TRẢ LỜI MỘT PHẦN** — có tuyến + giá + giờ, chưa có đánh giá hãng xe, chưa có trong FAQ |
| 13 | Đi nhóm thì chia tiền thế nào cho khỏi cãi nhau? | Review 4.2 — ~4 nguồn | **ĐÃ TRẢ LỜI — trong app (mục "Chia tiền nhóm" + ô tính), chưa có trong FAQ** |
| 14 | Xe hư giữa đường, hết xăng, bị hủy phòng thì làm gì? | Review 2.6 — ~6 nguồn | **TRẢ LỜI MỘT PHẦN** — có số khẩn cấp, chưa có bước xử lý từng sự cố, chưa có trong FAQ |
| 15 | Số khẩn cấp ở điểm đến là số nào? | Review top 10 #10 — ~6 nguồn | **ĐÃ TRẢ LỜI — trong app (mục "Số khẩn cấp"), chưa có trong FAQ** |
| 16 | Giờ nào chụp ảnh đẹp nhất ở điểm đến? | Review 2.4 — ~6 nguồn | **ĐÃ TRẢ LỜI — trong app (mục "Giờ đẹp chụp ảnh"), chưa có trong FAQ** |
| 17 | Nữ đi một mình có an toàn không, cần chú ý gì? | Review 5.3 — ~4 nguồn | **CHƯA TRẢ LỜI — app không có mục/chế độ đi một mình** |
| 18 | Đi với trẻ em cần chuẩn bị gì? | Review nhóm gia đình trẻ em (vinpearl/klook) | **CHƯA TRẢ LỜI — app không có mục/chế độ gia đình có trẻ em** |
| 19 | Chạy giải thì ở đâu, ăn gì, đi chơi lúc nào? | Review nhóm chạy giải | **ĐÃ TRẢ LỜI — trong app (mục "Cho người chạy giải", 53 giải), chưa có trong FAQ** |
| 20 | Lịch trình mẫu 3 ngày 2 đêm xếp thế nào để khỏi đi lòng vòng? | Review 1.2 — ~13 nguồn | **ĐÃ TRẢ LỜI — trong app (lịch trình mẫu theo cụm + wizard 4 bước), chưa có trong FAQ** |

**Tổng kết phủ sóng:** ĐÃ TRẢ LỜI 12/20 (6 trong FAQ + 6 chỉ trong mục app) · TRẢ LỜI MỘT PHẦN 6/20 · CHƯA TRẢ LỜI 2/20. Trong FAQ hiện tại chỉ có 6/20 câu — nghĩa là **14/20 câu hỏi thật chưa vào FAQ**, dù 12 trong 14 câu đó app đã có dữ liệu để trả lời.

---

## 3. Câu trả lời mới — 14 câu chưa có trong FAQ (40–60 từ/câu, kiểm bằng script)

Chỉ dùng dữ liệu đã có trong app/dữ liệu nguồn (`du-lieu-34-tinh/`, ngày kiểm 08/11/2026). Số từ đã kiểm bằng script, tất cả đều trong 40–60 từ.

### Câu 7 — Đi tháng nào đẹp nhất? (58 từ)
Mỗi tỉnh trong app có mục 'Mùa nào đi đẹp' ghi tháng đẹp nhất, nhiệt độ và gợi ý mặc gì. Đà Lạt đẹp nhất vào tháng 3, tháng 5 và tháng 11; tránh dịp lễ lớn vì giá phòng và vé xe thường tăng cao. Mở trang tỉnh rồi xem mục này trước khi chốt ngày đi.

### Câu 8 — Chuyến 3 ngày 2 đêm hết bao nhiêu tiền? (58 từ)
Đi Đà Lạt 3 ngày 2 đêm từ TP.HCM hết khoảng 1.800.000–4.150.000 đồng một người, gồm xe khứ hồi, ở 2 đêm, ăn 3 ngày, vé tham quan và thuê xe máy. App hiện con số chính khi lập chuyến, kèm dòng ghi rõ chưa gồm di chuyển tới điểm đến, chỗ ở và chi tiêu cá nhân.

### Câu 9 — Thuê xe máy cần kiểm tra gì, có bị lừa cọc không? (57 từ)
Thuê xe máy ở Đà Lạt khoảng 80.000–200.000 đồng mỗi ngày tùy loại xe. Đừng chuyển cọc chỉ vì giá rẻ hoặc bị thúc 'sắp hết xe'; khi nhận xe, kiểm tra phanh, lốp, đèn, còi và quay video ghi lại vết trầy. Không đưa bản gốc căn cước hoặc hộ chiếu cho bên cho thuê giữ.

### Câu 10 — Làm sao tránh bị chặt chém khi ăn uống, mua sắm? (58 từ)
Luôn hỏi giá trước khi gọi món, nhất là hải sản tươi sống và quán ven đường, và chỉ vào quán có thực đơn niêm yết giá rõ ràng. Mục 'Cẩn thận chặt chém' trong app liệt kê chiêu từng tỉnh kèm giá tham khảo để đối chiếu. Gặp giá vô lý thì bỏ đi, đừng cãi nhau.

### Câu 11 — Ăn gì, quán nào ngon, giá bao nhiêu? (57 từ)
Mở tab Ăn gì của từng tỉnh trong app: mỗi món ghi kèm quán gợi ý, địa chỉ và khoảng giá để đối chiếu. App có 308 món ở 34 tỉnh, giá ghi theo khoảng kèm ngày kiểm, không phải giá chốt. Tới quán, nên hỏi giá trước với món hải sản và món tính theo cân.

### Câu 12 — Đi đến đó bằng phương tiện gì, hãng xe nào tốt? (53 từ)
Trong app, mục Đi đến liệt kê phương tiện kèm khoảng giá và thời gian, ví dụ Hà Nội đi Đà Lạt có máy bay 1 giờ 50 phút hoặc xe khách 30–32 giờ. App chưa có đánh giá hãng xe nên chưa trả lời được hãng nào êm hay ít say xe.

### Câu 13 — Đi nhóm thì chia tiền thế nào cho khỏi cãi nhau? (60 từ)
Trước chuyến đi, cả nhóm lập quỹ chung: mỗi người đóng một khoản bằng nhau, cử một người giữ quỹ và ghi mọi khoản chi chung vào sổ chung. Cuối mỗi ngày chốt sổ cho cả nhóm đối chiếu; cuối chuyến chia đều, thừa trả lại, thiếu bù thêm. App có mục 'Chia tiền nhóm' với ô tính chia đều.

### Câu 14 — Xe hư giữa đường, hết xăng, bị hủy phòng thì làm gì? (60 từ)
Xe thuê bị hư thì quay tình trạng xe, gửi định vị và gọi đúng số hỗ trợ đã chốt lúc thuê, không tự sửa chữa lớn. Hết xăng trên đèo thì dắt bộ ra trạm xăng gần nhất. Bị hủy phòng thì gọi thẳng số khách sạn trong app để xác nhận lại và tìm phòng khác gần đó.

### Câu 15 — Số khẩn cấp ở điểm đến là số nào? (60 từ)
Mỗi tỉnh trong app có mục 'Số khẩn cấp' với nút bấm gọi: 113 công an, 115 cấp cứu, 114 cứu hỏa, dùng chung cả nước, kèm số riêng khi có nguồn chính thức, ví dụ Bệnh viện Hoàn Mỹ Đà Lạt 0263 3510878. Tỉnh nào chưa tra được số riêng thì app ghi rõ gọi 115, không đoán số.

### Câu 16 — Giờ nào chụp ảnh đẹp nhất ở điểm đến? (53 từ)
Mỗi tỉnh trong app có mục 'Giờ đẹp chụp ảnh' ghi 3 điểm kèm giờ đẹp. Ở Đà Lạt, đồi chè Cầu Đất săn mây lúc 4 giờ 30 đến 6 giờ sáng, hồ Xuân Hương đẹp 5 giờ 30 đến 7 giờ sáng và hoàng hôn 16 giờ 30 đến 18 giờ.

### Câu 17 — Nữ đi một mình có an toàn không, cần chú ý gì?
**Chưa có dữ liệu, không bịa.** App không có mục hay chế độ "Đi một mình", không có quy tắc an toàn cho nữ đi một mình, không có lọc chỗ ở gần trung tâm hay có lễ tân 24/7. Review có trích lời khuyên (báo Vietnamnet 21/12/2025, video Thùy Dương 30/10/2026) nhưng đó là lời khuyên chung ngoài app, chưa thành dữ liệu của app — không đưa vào FAQ hay schema cho tới khi có đợt tra riêng và mục riêng trong app.

### Câu 18 — Đi với trẻ em cần chuẩn bị gì?
**Chưa có dữ liệu, không bịa.** App không có mục hay chế độ "Gia đình có trẻ em": không checklist riêng cho bé, không lọc điểm an toàn cho trẻ, không nhắc báo khách sạn có trẻ nhỏ. Review có trích hướng dẫn (vinpearl, klook) nhưng chưa thành dữ liệu của app — không đưa vào FAQ hay schema cho tới khi có đợt tra riêng và mục riêng trong app.

### Câu 19 — Chạy giải thì ở đâu, ăn gì, đi chơi lúc nào? (60 từ)
Mỗi tỉnh trong app có mục 'Cho người chạy giải' ghi giải chạy kèm tháng diễn ra, điểm chạy bộ và chỗ ở gần điểm xuất phát. Ví dụ Đà Lạt có Dalat Ultra Trail tháng 3 quanh hồ Tuyền Lâm và Langbiang. Nên ở gần vạch đích và dành 2 ngày sau giải để phục hồi rồi tham quan.

### Câu 20 — Lịch trình mẫu 3 ngày 2 đêm xếp thế nào để khỏi đi lòng vòng? (57 từ)
App có sẵn lịch trình mẫu 2 ngày 1 đêm, 3 ngày 2 đêm và 4 ngày 3 đêm, xếp điểm theo cụm khu vực để khỏi đi lòng vòng. Mở công cụ lập kế hoạch 4 bước, chọn tỉnh và số ngày, app gợi ý lịch theo cụm rồi cho thêm hoặc bớt điểm từng ngày.

---

## 4. File Schema FAQPage JSON-LD

- **File:** [faq-aeo-cam-nang-du-lich.json](sandbox://workspace/faq-aeo-cam-nang-du-lich.json)
- **Định dạng:** `FAQPage` JSON-LD, `mainEntity` gồm **18 câu hỏi + trả lời** (6 câu chị Hoa + 12 câu mới đã viết được).
- **Kiểm chứng:** JSON parse được; đếm bằng script — cả 18 câu trả lời đều trong 40–60 từ, không câu nào ngoài khoảng.

### 3 lưu ý trung thực khi dùng file này

1. **JSON-LD chỉ có 18/20 câu, không phải 20/20.** Câu 17 (nữ đi một mình) và câu 18 (trẻ em) bị loại khỏi schema vì app chưa có dữ liệu — đưa câu "chưa có dữ liệu" vào schema FAQPage sẽ thành nội dung công khai vô nghĩa và sai chuẩn AEO (FAQ phải là câu trả lời thật). Thêm 2 câu này vào schema chỉ sau khi có đợt tra riêng + mục riêng trong app.
2. **6 câu chị Hoa trong file này viết lại từ cùng dữ liệu nguồn** (sân bay Liên Khương, điểm trú mưa, dặn xe máy, đặt phòng, tháng 11, checklist) vì văn bản FAQ chính xác trong app chỉ nằm trong artifact, không có trong file nguồn nào để đối chiếu. **Trước khi gắn schema lên web thật, phải đối chiếu từng chữ 6 câu này với FAQ đang hiển thị trong app** — schema và HTML FAQ hiển thị phải khớp 1:1 thì AI mới tin.
3. **Chưa gắn được ngay.** App hiện sống trên link chia sẻ muse.ai, không phải tên miền riêng, Google không lập chỉ mục link đó. File JSON-LD + đoạn định nghĩa H1 chỉ phát huy tác dụng khi app có tên miền riêng (sau khi anh tạo repo GitHub và đẩy lên Vercel — việc đang chờ anh). Khi đó: H1 + đoạn định nghĩa vào đầu trang chủ, 20 câu FAQ (18 câu hiện có + 2 câu sau khi đủ dữ liệu) vào cuối trang, JSON-LD vào `<head>`, đồng bộ 1:1 với HTML FAQ hiển thị.

---

## 5. Kết luận quét AEO

- **Điểm mạnh sẵn có:** FAQ hiện tại trả lời đúng câu hỏi thật (chị Hoa), không phải câu tự nghĩ — đúng tinh thần bài AEO. Dữ liệu app đã đủ để trả lời 18/20 câu hỏi thật.
- **2 lỗ hổng lớn nhất:** (1) H1 "Đi đâu, có gì?" là khẩu hiệu mơ hồ, không định nghĩa dịch vụ — sửa bằng đoạn định nghĩa 210 ký tự ở mục 1. (2) FAQ chỉ có 6/20 câu — bổ sung 12 câu mới ở mục 3 (và 2 câu còn lại sau khi tra thêm dữ liệu đi một mình + gia đình trẻ em).
- **Việc cần anh quyết:** tạo repo GitHub + đẩy Vercel để app có tên miền riêng thì schema mới có tác dụng; số điện thoại/Zalo cho nút "Hỏi người thật" (FAQ chỉ trả lời được câu có sẵn, câu ngoài danh sách vẫn cần người thật).
