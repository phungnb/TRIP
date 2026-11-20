# Cẩm nang du lịch tự túc — Dữ liệu 34 tỉnh thành Việt Nam

Repo dữ liệu cho app **Cẩm nang du lịch** (Bụi Code): địa danh, chỗ ở, món ăn, phương tiện, lịch trình mẫu và chi phí cho người đi tự túc lần đầu.

- **App live:** https://muse.ai/s/cam-nang-du-lich-app-ju6rvmxkxrhmxv/pHslPjdhU_hu_EpK7plG8DSxjuEp_fGvZXl2ky2VimU
- **Số đếm hiện tại (16/11/2026):** 464 địa danh · 249 chỗ ở · 308 món · 34 tỉnh/thành (Bắc 15 / Trung 11 / Nam 8).
- **Mọi giá là khoảng giá từ nguồn công khai, kèm ngày kiểm.** Chỗ ở chưa kiểm chứng được ghi rõ "Chưa kiểm chứng — chưa đối tác — chưa thu phí". Chưa có đánh giá thật của người dùng thì ghi rõ chưa có, không bịa.

## Cấu trúc

- `du-lieu-34-tinh/` — dữ liệu nguồn, mỗi tỉnh 2 file: `<tinh>.json` (dữ liệu máy đọc) + `<tinh>.md` (bảng đọc được). `TONG-HOP-34-TINH.md` là file tổng hợp: số đếm, nhật ký các đợt sửa, nợ dữ liệu còn lại.
- `bao-cao/` — báo cáo rà soát 3 vai (đợt 1, đợt 2, đợt 3) và báo cáo quét AEO/FAQ.
- `faq-aeo-cam-nang-du-lich.json` — 18 câu hỏi thường gặp (chuẩn AEO, trả lời 40–60 từ) + Schema FAQPage JSON-LD đã gắn trong app.

## Trạng thái kiểm chứng

- Vai 3 (chuyên gia) đã rà 3 đợt; đợt 3 kết luận 16/11/2026: đã sửa 12 lỗi + 12 nợ cũ, kiểm live 10/10 trên app.
- Nợ còn lại (xem `TONG-HOP-34-TINH.md` mục mới nhất): ~189/464 tọa độ xấp xỉ, 8 tọa độ null; Quảng Trị chưa bổ sung điểm Quảng Bình cũ; một số giá phòng gộp chưa thống nhất; giải Tri Tôn Cross Country 14–15/11/2026 chưa nhập.

## Ghi chú cho người kiểm tra (chuyên gia)

Mời kiểm chéo: SĐT đặt phòng, địa chỉ, giá vé, giờ xe, ngày mở sân bay, lịch giải chạy — đối chiếu nguồn công khai và ghi rõ nguồn + ngày kiểm cho từng mục. Lỗi phát hiện xin ghi theo mẫu: tỉnh → mục → file đang ghi gì → đúng là gì → nguồn.

## Code app

Code app nằm trong thư mục `app/` (cây thư mục đầy đủ, tách từ bản xuất 1 file
của artifact Muse, v24, dữ liệu đợt 4, 16/11/2026):

- `app/index.html` — khung trang, nạp `css/style.css`, `data/prov-data.js`, `js/app.js`.
- `app/data/prov-data.js` — dữ liệu 34 tỉnh (sinh từ `du-lieu-34-tinh/`).
- `app/js/app.js`, `app/css/style.css`, `app/assets/images/` (7 ảnh).
- Việc còn vướng, nhờ chuyên gia giải quyết: `app/YEU-CAU-CHUYEN-GIA.md`
  (khoảng cách Quảng Trị, 5 điểm vùng sáp nhập, nhãn 772 nhận xét, LICENSE,
  repo public/private, web hay store, trang trắng ~18 giây khi tải lại).
