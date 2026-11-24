# Code app Cẩm nang du lịch

App "Cẩm nang du lịch tự túc 34 tỉnh thành Việt Nam" — bản web tĩnh (HTML + CSS + JS,
không cần backend, không cần build). Mở `index.html` bằng trình duyệt là chạy;
khuyến nghị chạy qua máy chủ tĩnh (ví dụ `python3 -m http.server`) để bản đồ
Leaflet và font tải ổn định.

## Cây thư mục

```
app/
├── index.html                  Khung trang: head (meta, JSON-LD FAQ) + body + nạp script
├── README.md                   File này
├── YEU-CAU-CHUYEN-GIA.md       Việc còn vướng, nhờ chuyên gia giải quyết
├── css/
│   └── style.css               Toàn bộ giao diện (màu sáng, mobile-first)
├── js/
│   ├── visual.js               Hình minh họa SVG riêng cho 34 tỉnh (nạp trước app.js)
│   ├── theme.js                Nút chuyển nền tối/sáng (bảng màu RaceHub)
│   ├── explore-extras.js       Tỉnh cũ trong ngoặc, "Đi từ trung tâm", sổ tem check-in
│   ├── home.js                 Trang chủ: slide động, điểm khám phá, tháng này đi đâu (nạp sau app.js)
│   └── app.js                  Logic app: dữ liệu → render, tìm kiếm, wizard lập chuyến,
│                               bản đồ, chia tiền nhóm, FAQ, lưu chuyến (localStorage)
├── data/
│   ├── sap-nhap.js             34 tỉnh mới và các tỉnh cũ hợp thành (NQ 202/2025/QH15)
│   └── prov-data.js            Dữ liệu 34 tỉnh (biến PROV_DATA + SPLIT_GUIDE)
└── assets/
    └── images/                 7 ảnh JPEG (xem bảng dưới)
```

## Ảnh

| File | Nội dung | Dùng ở |
|---|---|---|
| `hero-da-lat.jpg` | Hồ Xuân Hương, Đà Lạt lúc bình minh | Banner trang Khám phá |
| `mac-dinh.jpg` | Ảnh mặc định (dùng nhiều nhất) | Ảnh dự phòng cho địa danh/chỗ ở/món chưa có ảnh riêng |
| `cho-da-lat.jpg` | Chợ Đà Lạt | Ảnh riêng của chợ Đà Lạt + ảnh dự phòng Đà Lạt |
| `quang-truong-lam-vien.jpg` | Quảng trường Lâm Viên | Ảnh riêng của địa danh này |
| `ho-tuyen-lam.jpg` | Hồ Tuyền Lâm | Ảnh riêng của địa danh này |
| `thien-vien-truc-lam.jpg` | Thiền viện Trúc Lâm | Ảnh riêng của địa danh này |
| `doi-che-cau-dat.jpg` | Đồi chè Cầu Đất | Ảnh riêng của địa danh này |

Ảnh gốc trong app là base64 nhúng trong file (không có tên file gốc) nên tên trên
là tên đặt lại theo nội dung/vai trò.

## Dữ liệu — nguồn thật ở đâu

- **Nguồn thật duy nhất:** `data/prov-data.js` (biến `PROV_DATA`, kèm `SPLIT_GUIDE`).
  Sửa dữ liệu thì sửa ở đây (hoặc các file nối thêm), rồi chạy
  `node tools/tao-ban-gon.mjs` để sinh lại `data/prov-data.gon.js` (file trình duyệt nạp).
  Danh sách đủ các file dữ liệu xem `README.md` ở gốc repo.
- `../du-lieu-34-tinh/` chỉ là bản lưu cũ, không còn đồng bộ, không sửa.
- Số đếm hiện tại (24/11/2026, `node tests/du-lieu.mjs`): **34 tỉnh, 878 địa danh,
  696 chỗ ở, 646 món**.

## Nội dung đã xử lý trong cây này (so với bản live v24)

- Đổi tên **11/18 câu hỏi FAQ** để ghi rõ Đà Lạt (theo PR #1 — ví dụ "Trời mưa thì
  đi đâu?" → "Đi Đà Lạt trời mưa thì đi đâu?"). Cả JSON-LD trong `index.html` và
  mảng FAQ trong `js/app.js` đều đã đổi, khớp nhau.
- Điền **overview + types** cho Lâm Đồng trong `data/prov-data.js` (trước đây
  overview trống, types trống).

## Thư viện ngoài (CDN, cần mạng)

- Leaflet 1.9.4 (unpkg) — bản đồ; nền bản đồ Esri World Street Map.
- Google Fonts "Be Vietnam Pro".
- Link ra ngoài: OpenStreetMap, Booking.com (tìm khách sạn khi chưa có số điện thoại).

## Lưu ý

- App live duy nhất: https://buitrip.com (Vercel tự triển khai từ nhánh `main`).
- Chỗ ở ghi rõ "chưa kiểm chứng / chưa đối tác / chưa thu phí"; chỉ sau kiểm chứng
  mới gắn "Đã kiểm chứng — ngày …". Không nhận đặt phòng, không thu tiền.
- Việc còn vướng xem `YEU-CAU-CHUYEN-GIA.md`.
