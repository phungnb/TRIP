# Đánh giá app Cẩm nang du lịch theo 3 vai — 18/11/2026

Phạm vi: code trong `app/` (commit `c4bf53e` + nhánh `them-anh-app`), chạy thật bằng trình duyệt mô phỏng iPhone 13.
Ký hiệu: **[Đã kiểm]** = chạy/đo thật; **[Giả định]** = nhận định chưa đo.

## Kết luận

Bản web chạy ổn để công khai sau PR này. Chưa nên quảng bá mạnh khi chưa có 2 việc: (1) điểm du lịch lớn của vùng sáp nhập (Phú Quốc, Mũi Né, Phong Nha, Hà Giang), (2) cách kiếm tiền rõ ràng.

## 1. Vai CTO

| Mục | Hiện trạng | Mức |
|---|---|---|
| Chạy đúng | **[Đã kiểm]** Mở cả 34 tỉnh × 7 tab, 464 địa danh + 249 chỗ ở + 308 món: 0 lỗi JS, không hiện `undefined`/`NaN`. Lập kế hoạch 4 bước → lưu chuyến chạy hết cho 4 tỉnh thử. | Ổn |
| Trắng trang | **[Đã kiểm]** Nguyên nhân là font + Leaflet nạp chặn từ CDN. Đã sửa trong PR này (CDN chậm 10 giây: trước trắng 10 giây, sau hiện nội dung ~0,15 giây). | Đã sửa |
| Bảo mật | **[Đã kiểm]** Không có secret/API key. Đánh giá người dùng được `esc()` trước khi hiện, không thấy lỗ XSS. | Ổn |
| Cấu trúc code | **[Đã kiểm]** `js/app.js` 2.090 dòng một file; 13 hàm khai báo trùng tên (bản sau đè bản trước, ví dụ `renderExplore`, `initMap`, `destCard`) — dấu vết bản Đà Lạt cũ. Chạy đúng nhưng khó sửa, dễ sửa nhầm bản chết. | Nên dọn |
| Đường dữ liệu | **[Đã kiểm]** `data/prov-data.js` (1,37 MB) "sinh từ" `du-lieu-34-tinh/*.json` nhưng repo **không có script chuyển đổi**. Sửa JSON không tự sang app → hai nguồn sẽ lệch dần. | Rủi ro lớn nhất |
| Lưu trữ | Chuyến, mục đã lưu, đánh giá chỉ nằm trong `localStorage` của 1 trình duyệt. Đổi máy/xóa dữ liệu là mất; đánh giá không ai khác thấy. | Biết trước, chấp nhận ở bản 1 |
| SEO/chia sẻ | Có JSON-LD FAQ; thiếu `meta description`, ảnh xem trước khi chia sẻ (Open Graph), `manifest` để cài lên màn hình điện thoại. | Nên thêm |

Việc kỹ thuật tiếp theo, theo thứ tự: (1) viết `scripts/build-prov-data.py` sinh `prov-data.js` từ JSON và chạy kiểm số đếm; (2) xóa 13 hàm chết; (3) thêm meta description + Open Graph + manifest.

## 2. Vai người dùng (người đi tự túc lần đầu)

- **Tốt [Đã kiểm]:** chọn tỉnh → đủ đi đâu / ở đâu / ăn gì / đi lại / lịch trình / chi phí; giá luôn ghi khoảng + ngày kiểm; chỗ ở ghi rõ "chưa kiểm chứng"; có số khẩn cấp bấm gọi.
- **Đã sửa trong PR này:**
  - Tìm "Phú Quốc", "Mũi Né", "Phong Nha", "Côn Đảo"… trước đây ra "Không thấy kết quả" hoặc kết quả sai (tìm "Phong Nha" ra Nhà hát Lớn Hải Phòng). Nay báo thẳng "chưa có trong app, thuộc tỉnh X" + nút sang tỉnh đó.
  - 6 tỉnh (Quảng Trị, Huế, Đà Nẵng, Quảng Ngãi, Gia Lai, Đắk Lắk) hiện 2 dòng "Tổng ước tính" khác số mà cùng tên. Nay ghi rõ "— đi xe khách" / "— đi máy bay"…
  - Quảng Trị: số km tính từ Đông Hà nhưng mốc ghi Đồng Hới. Nay ghi rõ cả hai.
  - "Nhận xét của Bụi Code" viết như đã đi thật. Nay ghi rõ là tổng hợp từ nguồn công khai.
- **Còn thiếu:** 63/249 chỗ ở không có số điện thoại; 8 địa danh chưa có tọa độ; ~211 địa chỉ còn tên huyện/quận cũ. **[Giả định]** Người dùng mới sẽ thấy trang chủ thiên về Đà Lạt (banner + lịch trình mẫu Đà Lạt) dù app là 34 tỉnh.

## 3. Vai khách hàng (người trả tiền)

**[Đã kiểm]** App hiện không có nguồn thu: không quảng cáo, không đối tác, không thu phí, ghi rõ "không nhận đặt phòng, không nhận tiền". Nghĩa là **chưa có khách hàng**, chỉ có người dùng.

Ba hướng có thể có (đều là **[Giả định]**, chưa kiểm thị trường):

| Hướng | Ai trả | Ưu | Rủi ro lớn nhất |
|---|---|---|---|
| A. Chỗ ở trả phí để được "kiểm chứng" + nổi bật | Homestay, khách sạn nhỏ | Khớp dữ liệu đã có (249 chỗ ở, SĐT) | Mất uy tín "không quảng cáo" nếu không tách rõ mục trả phí |
| B. Link tiếp thị liên kết (affiliate) đặt phòng / vé xe | Booking, Traveloka, vexere… | Không phải bán hàng | Hoa hồng thấp, cần lượng truy cập lớn |
| C. Gói cho người chạy giải (kết hợp RaceHub) | Người chạy / ban tổ chức giải | Có sẵn mục "Cho người chạy giải" 34 tỉnh + kênh RaceHub | Tập khách hẹp |

Khuyến nghị: **C trước** — tận dụng RaceHub sẵn có, ít tốn giờ nhất trong quỹ 6 giờ/tuần. Rủi ro: tập khách nhỏ, có thể không đủ doanh thu.

## Đợt 2 — kiểm theo vai sau khi gộp PR #2, #3 (18/11/2026)

**Người dùng [Đã kiểm]**
- Nút Back của điện thoại/trình duyệt trước đây thoát hẳn app. Đã sửa: Back = về màn trước (địa danh → tỉnh → danh sách); ở màn gốc mới thoát.
- Màn hình 320px (điện thoại nhỏ): bảng chi phí tràn ngang, cột giá bị đẩy ra ngoài màn hình, nút "Gọi đặt phòng" lệch 4px. Đã sửa; kiểm lại 6 màn chính + 3 tỉnh × 7 tab: không còn tràn.
- Trang Tài khoản ghi "kiểm 05–06/11/2026" và "25 mục chưa kiểm (jeep Langbiang…)" — chỉ đúng cho Đà Lạt. Đã đổi thành mô tả chung cho 34 tỉnh.

**Khách hàng / chủ chỗ ở [Đã kiểm]**
- Tìm được mục của mình (tìm theo tên khách sạn có kết quả).
- **Không có cách nào báo sửa thông tin**: không email, Zalo hay form; trang Tài khoản ghi "Số hỗ trợ đang cập nhật". Cần anh cung cấp một kênh liên hệ để gắn nút "Báo thông tin sai" vào mỗi mục.

**CTO [Đã kiểm]**
- Link chia sẻ: trước đây không có. Đã thêm `#/tinh/<mã tỉnh>` mở thẳng trang tỉnh (ví dụ `#/tinh/ca-mau`). Lưu ý: khi app chạy trong khung muse.ai, người dùng không thấy địa chỉ này; chỉ có ích khi app có tên miền riêng.
- SEO: đã thêm `meta description`, Open Graph (tiêu đề, mô tả), `theme-color`. Chưa có ảnh xem trước (cần tên miền thật để có đường dẫn tuyệt đối).
- Dung lượng tải (nén gzip): dữ liệu 341 KB, `app.js` 56 KB, HTML + CSS 13 KB, ảnh banner 76 KB. Dữ liệu là phần lớn nhất; tách theo tỉnh chỉ đáng làm khi thêm nhiều tỉnh/ảnh.
