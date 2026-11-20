# Nhiệm vụ của Gemini (Deep Research)

Vai: **quét rộng, lập bảng ứng viên kèm link nguồn**. Không viết nội dung cuối, không chọn thay Muse. Mỗi lần chạy 1 tỉnh cũ (G1, G3) hoặc 1 vùng (G2).

Kết quả: anh Phụng xuất bảng (Google Sheets hoặc copy Markdown), lưu thành file vào `giao-viec/ket-qua-gemini/dot-<n>/`, tên file như sau, rồi đưa cho Muse.

| Mảng | Tên file kết quả |
| --- | --- |
| G1 + G3 | `<tinh-moi>__<tinh-cu>.md`, ví dụ `gia-lai__binh-dinh.md` |
| G2 | `dau-moi__dot-<n>.md`, ví dụ `dau-moi__dot-1.md` |

Danh sách tỉnh cũ, chỉ tiêu từng tỉnh: [`chi-tieu-63-tinh-cu.csv`](chi-tieu-63-tinh-cu.csv). Số ứng viên G1 nên gấp khoảng 1,5 lần cột `can_them` để Muse còn loại.

---

## G1 + G3. Ứng viên địa danh, món, quán, chỗ ở (mỗi lần 1 tỉnh cũ)

Đổi phần trong `< >` theo dòng của tỉnh cũ trong `chi-tieu-63-tinh-cu.csv`. Đính kèm file `du-lieu-34-tinh/<tinh-moi>.json` (danh sách điểm đã có) nếu Gemini cho đính kèm.

```text
Nghiên cứu du lịch tỉnh <Bình Định cũ> (nay thuộc tỉnh <Gia Lai> từ 01/07/2025).
Đây là dữ liệu cho một app cẩm nang du lịch tự túc; thông tin dùng để tham khảo, chấp nhận sai lệch nhỏ, nhưng không được bịa.
Lập BẢNG ỨNG VIÊN, KHÔNG viết bài:

1. <33> địa danh tham quan, xếp theo độ nổi tiếng. Mỗi dòng: tên, xã/phường (tên mới sau 01/07/2025 nếu biết, kèm tên cũ), loại (thiên nhiên / biển đảo / di tích / tâm linh / làng nghề / bảo tàng / phố cổ / chợ / trải nghiệm), xếp hạng di tích nếu có, vì sao nên đến (1 câu), giá vé và giờ mở cửa nếu thấy, 2 link nguồn khác nhau.
   Bỏ các điểm đã có trong file đính kèm. Bỏ quán cà phê sống ảo. Bỏ điểm đã đóng cửa hoặc tạm dừng.
2. <12> món đặc sản. Mỗi món: tên, ăn buổi nào, khoảng giá mỗi phần, 3 quán có địa chỉ, giờ bán và link Google Maps hoặc Foody.
3. 9 chỗ ở chia 3 mức giá (dưới 400.000đ, 400.000–1.000.000đ, trên 1.000.000đ mỗi đêm), rải đủ các khu trong tỉnh cũ, kèm link Booking / Agoda / Traveloka và ngày xem giá.
4. Lễ hội trong năm (tên, tháng âm hoặc dương lịch, địa điểm).

Ưu tiên nguồn: cổng du lịch tỉnh, Sở Văn hóa Thể thao và Du lịch, Cục Di sản văn hóa, UNESCO; rồi vietnam.travel, báo lớn (VnExpress, Tuổi Trẻ, Thanh Niên); rồi Google Maps, TripAdvisor, Foody, Booking.
Hội nhóm Facebook, TikTok chỉ dùng để phát hiện điểm; mỗi điểm phải có thêm nguồn khác.
Không ghi tên, ảnh hay số điện thoại người viết review.
Trình bày thành 4 bảng Markdown, mỗi ô link ghi URL đầy đủ.
```

## G2. Đầu mối đi lại (mỗi lần 1 đợt, làm cho cả 8 đợt)

```text
Liệt kê đầu mối giao thông khách du lịch dùng được ở các tỉnh cũ sau (tên tỉnh trước sáp nhập 01/07/2025): <Đà Nẵng, Quảng Nam, Quảng Ngãi, Kon Tum, Gia Lai, Bình Định, Đắk Lắk, Phú Yên>.
Mỗi tỉnh cũ liệt kê đủ: sân bay, ga tàu khách, bến xe khách liên tỉnh chính, cảng tàu khách ra đảo (nếu có).
Mỗi dòng: tỉnh cũ, loại, tên, mã (IATA với sân bay), địa chỉ, tọa độ Google Maps (5 số lẻ), tuyến chính (bay hoặc chạy từ TP.HCM / Hà Nội, tần suất, hãng hoặc nhà xe lớn), cách vào trung tâm (phương tiện, km, khoảng giá taxi hoặc xe buýt), link nguồn chính thức (ACV, Đường sắt Việt Nam, trang bến xe) và ngày xem.
Bỏ đầu mối đã đóng hoặc không còn chuyến khách. Không tìm được thì ghi "chưa kiểm được", không đoán.
Trình bày 1 bảng Markdown.
```

Danh sách tỉnh cũ theo đợt (dán vào phần `< >` của G2):

| Đợt | Tỉnh cũ |
| --- | --- |
| 1 | Đà Nẵng, Quảng Nam, Quảng Ngãi, Kon Tum, Gia Lai, Bình Định, Đắk Lắk, Phú Yên |
| 2 | Khánh Hòa, Ninh Thuận, Lâm Đồng, Đắk Nông, Bình Thuận |
| 3 | Thanh Hóa, Nghệ An, Hà Tĩnh, Quảng Bình, Quảng Trị, Huế |
| 4 | Hà Giang, Tuyên Quang, Lào Cai, Yên Bái, Lai Châu, Điện Biên, Sơn La, Cao Bằng |
| 5 | TP.HCM, Bình Dương, Bà Rịa – Vũng Tàu, Đồng Nai, Bình Phước, Tây Ninh, Long An |
| 6 | Cần Thơ, Sóc Trăng, Hậu Giang, Vĩnh Long, Bến Tre, Trà Vinh, Đồng Tháp, Tiền Giang, An Giang, Kiên Giang, Cà Mau, Bạc Liêu |
| 7 | Hà Nội, Hải Phòng, Hải Dương, Quảng Ninh, Hưng Yên, Thái Bình, Ninh Bình, Hà Nam, Nam Định |
| 8 | Lạng Sơn, Bắc Kạn, Thái Nguyên, Phú Thọ, Vĩnh Phúc, Hòa Bình, Bắc Giang, Bắc Ninh |

## Gemini KHÔNG làm

- Không xuất JSON cho app, không đẩy lên repo (việc của Muse).
- Không làm giàu 275 điểm RaceHub (việc của Muse, mảng M1).
- Không tự điền giá hoặc tọa độ khi không có nguồn.
