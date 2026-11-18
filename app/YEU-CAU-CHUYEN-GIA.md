# Yêu cầu chuyên gia giải quyết

File này liệt kê những việc M (người làm app) đang vướng, cần chuyên gia hoặc anh
Nguyễn quyết/giúp. Mỗi mục ghi rõ: vấn đề là gì, cần gì, và M đã làm tới đâu.
Cập nhật lần cuối: 16/11/2026.

## 1. Khoảng cách Quảng Trị tính sai mốc — ĐÃ XỬ LÝ 18/11/2026

- **Đã xử lý (chuyên gia):** không tính lại số km. 13 điểm đều ở khu vực Quảng Trị cũ và số km theo nguồn đều tính từ Đông Hà, nên đặt lại mốc tính khoảng cách là **TP Đông Hà** (`anchor`, `lat/lng` trong `quang-tri.json` + `prov-data.js`). Trang tỉnh ghi rõ: "Trung tâm hành chính: TP Đồng Hới · Mốc tính khoảng cách: TP Đông Hà". Khi thêm điểm Quảng Bình cũ thì tính từ Đồng Hới và tách cụm riêng.


- Vấn đề: trung tâm hành chính mới của Quảng Trị là **TP Đồng Hới** (sau sáp nhập
  Quảng Bình + Quảng Trị), nhưng khoảng cách trong dữ liệu vẫn tính từ **Đông Hà**
  (trung tâm cũ). Ví dụ: Chợ Đông Hà ghi `cách trung tâm 1 km`, thực tế cách Đồng
  Hới khoảng 88 km.
- Cần: chuyên gia cho khoảng cách đúng từ Đồng Hới cho từng địa danh/chỗ ở của
  Quảng Trị trong file `du-lieu-34-tinh/quang-tri.json`, hoặc xác nhận cách tính
  (từ trung tâm TP Đồng Hới).
- M đã làm: xác nhận lỗi có thật (đối chiếu Chợ Đông Hà). Chưa sửa vì cần số đúng,
  không đoán.

## 2. Thiếu 5 điểm du lịch ở vùng mới sáp nhập — CẦN CHUYÊN GIA XÁC NHẬN DANH SÁCH

- Vấn đề: sau sáp nhập 01/07/2025, 5 tỉnh còn thiếu điểm nổi tiếng của vùng sáp nhập:
  - **An Giang**: không có Phú Quốc.
  - **Lâm Đồng**: chỉ có Đà Lạt, không có Mũi Né / Phan Thiết.
  - **Quảng Trị**: không có Phong Nha.
  - **Tuyên Quang**: không có Đồng Văn / Mã Pì Lèng (mới chỉ nhắc trong mục đèo).
  - **Quảng Ngãi**: không có Măng Đen.
- Cần: chuyên gia xác nhận mỗi vùng nên thêm những điểm nào (tên, địa chỉ, giá vé,
  giờ mở cửa), hoặc cho M tự tra và chuyên gia kiểm lại sau.
- M đã làm: xác nhận cả 5 đều 0 lần xuất hiện trong dữ liệu (trừ ghi chú "chưa làm").

## 3. Nhãn cho 772 nhận xét "của Bụi Code" — ĐÃ XỬ LÝ 18/11/2026

- **Đã xử lý (chuyên gia):** tiêu đề đổi thành "Nhận xét tổng hợp của Bụi Code", dòng phụ: "Tổng hợp từ nguồn công khai (Google Maps, blog, báo du lịch), không phải trải nghiệm trực tiếp của đội Bụi Code. Kiểm lại trước khi đi." Đặt ở đầu mục, áp cho cả 772 mục (`mReviewHtml` trong `js/app.js`).


- Vấn đề: có 772 mục nhận xét (464 địa danh + 308 món) viết như người đã đi thật
  (ví dụ "gọi tái nạm để cảm đủ vị"), nhưng nguồn ghi là "Google Maps / blog".
  Nếu app hiển thị như nhận xét cá nhân thì vừa trái cam kết "không bịa", vừa dễ
  bị coi là đánh giá giả.
- Đề xuất của chuyên gia: gắn nhãn **"tổng hợp từ nguồn công khai"**.
- Cần: anh/chuyên gia chốt (a) câu nhãn chính xác, (b) đặt ở đâu — tiêu đề mục
  "Nhận xét của Bụi Code" hay từng nhận xét. M sẽ áp dụng ngay khi có câu chốt.
- M đã làm: đếm khớp 772 mục; chưa đổi gì vì đây là câu chữ hiển thị, cần duyệt.

## 4. Repo chưa có file LICENSE — CẦN ANH CHỌN LOẠI

- Vấn đề: repo TRIP chưa có LICENSE. Dữ liệu du lịch + code app nên có giấy phép rõ
  ràng trước khi publish rộng.
- Cần: anh/chuyên gia chọn loại (ví dụ MIT cho code, CC BY cho dữ liệu — hoặc một
  loại duy nhất). M sẽ thêm file ngay khi có quyết định.

## 5. Repo đang PUBLIC — CẦN ANH CHỐT CÔNG KHAI HAY RIÊNG TƯ

- Vấn đề: repo TRIP hiện là **Public** (ai cũng đọc được, kể cả các báo cáo nội bộ
  trong thư mục `bao-cao/`).
- Cần: anh chốt giữ Public hay chuyển Private. Nếu giữ Public thì có cần dọn báo
  cáo nội bộ ra khỏi repo không?

## 6. "Lên app" là web hay App Store / Google Play — CẦN ANH CHỐT

- Vấn đề: kế hoạch cũ là web (deploy Vercel), chưa từng chốt đưa lên store.
  Yêu cầu của store (nếu lên store) thì M chưa kiểm.
- Cần: anh chốt hướng — chỉ web, hay thêm App Store/Google Play. Nếu lên store,
  M sẽ kiểm yêu cầu và báo lại.

## 7. Cấp quyền ghi cho chuyên gia trên repo TRIP — CẦN USERNAME GITHUB

- Vấn đề: chuyên gia đọc được repo nhưng không push được.
- Cần: username GitHub của chuyên gia để anh thêm vào Settings → Collaborators
  (hoặc anh tự thêm). M không có thông tin này nên không làm thay được.

## 8. Cài Claude GitHub App cho repo TRIP — CẦN ANH BẤM

- Vấn đề: chuyên gia nhờ cài Claude GitHub App để rà code trực tiếp trên repo.
- Cần: anh mở link "Cài GitHub App" trong tin chuyên gia gửi, chọn repo TRIP,
  bấm Install. Việc này phải làm bằng tài khoản GitHub của anh, M không làm thay được.

## 9. Trang trắng ~18 giây khi tải lại — ĐÃ XỬ LÝ 18/11/2026

- **Nguyên nhân (đã đo):** font Google + `leaflet.css` nạp chặn hiển thị trong `<head>`, `leaflet.js` nạp đồng bộ trước `app.js`. CDN chậm bao lâu thì trang trắng bấy lâu (giả lập CDN chậm 10 giây: trắng 10 giây). Không phải do dung lượng dữ liệu.
- **Đã sửa:** font + CSS bản đồ nạp không chặn; `leaflet.js` chỉ tải khi mở trang tỉnh (`loadLeaflet` trong `js/app.js`). Cùng giả lập CDN chậm 10 giây: nội dung hiện sau ~0,15 giây. Ảnh nén từ 1,9 MB xuống 0,9 MB.


- Vấn đề: tải lại trang app thì trắng khoảng 18 giây mới hiện nội dung (ghi nhận
  16/11). Nghi ngờ do file dữ liệu lớn (1,15 MB) + ảnh base64, nhưng chưa xác minh.
- Cần: chuyên gia xem code trong `app/` và cho hướng khắc phục (ví dụ: tách dữ liệu
  theo tỉnh và tải khi cần, nén ảnh, hay chỉ là do link muse.ai tải chậm).
- M đã làm: cây thư mục này đã tách dữ liệu ra file riêng `data/prov-data.js`
  (không còn nhúng base64 trong HTML), giảm kích thước trang từ 11,6 MB xuống
  còn ~3,5 MB. Chưa kiểm được có hết trắng trang không vì chưa có bản live mới.

## 10. Nợ dữ liệu nhỏ — CẦN CHUYÊN GIA KIỂM/ĐIỀN KHI CÓ THỂ

- 63/249 chỗ ở chưa có số điện thoại (app đã ghi "Chưa có số — xem trên Booking").
- 8 tọa độ còn trống, ~189/464 tọa độ là xấp xỉ (ghi rõ trong dữ liệu).
- 211–254 địa chỉ còn dùng tên huyện/quận/thị trấn cũ (cấp huyện đã bỏ từ
  01/07/2025) — cần rà lại theo địa giới mới.
- Một số mục lẻ: giá gộp Nhà tổ chim/Birdhouse chưa thống nhất (650.000đ vs
  1.200.000–1.500.000đ); số nhà MT Lai Châu (113 hay 133 đường Lê Duẩn) chưa chốt;
  Galaxy Thái Nguyên chưa đối chiếu (Galaxy River hay Galaxy Hotel Phổ Yên).
- Cần: chuyên gia cho đáp án đúng từng mục khi có thời gian; không gấp bằng mục 1–3.

---

## Đã xong trong đợt này (không cần chuyên gia)

- Code app đã xếp thành cây thư mục trong `app/` (trước đây là 1 file HTML 11,6 MB).
- Đổi tên 11 câu hỏi FAQ ghi rõ Đà Lạt (theo PR #1), khớp cả JSON-LD và giao diện.
- Điền overview + types cho Lâm Đồng trong dữ liệu app.
- Ghi chú cũ "dữ liệu đợt 4 chưa nhập vào app" đã sửa (app đã có dữ liệu đợt 4).
