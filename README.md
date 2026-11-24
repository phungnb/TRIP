# BuiTrip — Cẩm nang du lịch tự túc 34 tỉnh thành Việt Nam

App web cho người đi tự túc: địa danh, chỗ ở, món ăn, phương tiện, lịch trình mẫu và chi phí, kèm ngày kiểm giá.

- **App:** https://buitrip.vercel.app (Vercel tự triển khai từ nhánh `main`, thư mục gốc `app/`).
- **Số đếm hiện tại (24/11/2026):** 878 địa danh · 696 chỗ ở · 646 món · 34 tỉnh/thành. Số này đếm sau khi nạp đủ các file dữ liệu của app (xem mục Nguồn dữ liệu), bằng `node tests/du-lieu.mjs`.
- **Mọi giá là khoảng giá từ nguồn công khai, kèm ngày kiểm.** Chỗ ở chưa kiểm chứng ghi rõ "Chưa kiểm chứng / chưa đối tác / chưa thu phí". Chỗ nào chưa có dữ liệu thì ghi rõ chưa có, không đoán.

## Nguồn dữ liệu: một nguồn duy nhất

**`app/data/prov-data.js` là nguồn dữ liệu duy nhất.** Mọi sửa dữ liệu làm ở đây (hoặc ở các file nối thêm bên dưới), không sửa trong `du-lieu-34-tinh/`.

App nạp dữ liệu theo thứ tự, file sau nối thêm hoặc sửa file trước:

1. `app/data/prov-data.js` — dữ liệu gốc 34 tỉnh.
2. `app/data/sap-nhap.js` — tên tỉnh cũ của từng tỉnh mới.
3. `app/data/racehub-places.js` — địa danh từ Hộ chiếu khám phá RaceHub, sinh tự động bằng `node tools/nhap-racehub.js <repo racehub>`, không sửa tay.
4. `app/data/lam-giau.js` — thông tin làm giàu cho địa danh (sinh bằng `tools/nhap-lam-giau.js`).
5. `app/data/bo-sung.js` — bổ sung điểm hot và giá vé kiểm tay, sửa theo id.
6. `app/data/dia-diem-moi.js` — địa danh bổ sung theo tỉnh (từ các file bổ sung 23/11/2026).
7. `app/data/an-o-moi.js` — món ăn và chỗ ở bổ sung (sinh bằng `tools/nhap-an-o.mjs`).
8. `app/data/gia-tham-khao.js` — giá vé tham khảo kèm ngày kiểm, sinh bằng `node tools/nhap-gia-tham-khao.mjs` từ `tools/nguon/`, không sửa tay.
9. `app/data/trung-tam.js` — mốc tính khoảng cách từng tỉnh và nhãn khoảng cách.
10. `app/data/khu-vuc.js` — khu du lịch trong tỉnh mới sau sáp nhập (tính lịch trình, tiền đi theo khu thay vì thủ phủ).
11. `app/data/ho-so-khu.js` — hồ sơ riêng từng khu và đảo (mùa đẹp, cách đi, chi phí).

File sinh ra từ nguồn, không sửa tay:

- `app/data/prov-data.gon.js` — bản gọn cho trình duyệt (bỏ trường nguồn); **đây là file trình duyệt nạp thay cho `prov-data.js`**. Sửa `prov-data.js` xong chạy `node tools/tao-ban-gon.mjs`; CI báo lỗi nếu quên.
- `app/tinh/*/index.html`, `app/sitemap.xml` — trang tĩnh cho Google, chạy `node tools/tao-trang-tinh.mjs`.
- `faq-aeo-cam-nang-du-lich.json` và khối JSON-LD FAQPage trong `app/index.html` — sinh từ `BT_FAQ` trong `app/ai/hoi-dap.js` (kèm số đếm thật), chạy `node tools/tao-faq.mjs`; CI báo lỗi nếu lệch.

**`du-lieu-34-tinh/` chỉ là bản lưu cũ**, không còn đồng bộ với app (ví dụ Đà Nẵng: 14 địa danh trong JSON, 30 trong app). Giữ lại để tra lịch sử, không dùng làm nguồn.

## Kiểm tra

- `cd tests && node du-lieu.mjs` — kiểm dữ liệu (id trùng trong tỉnh và toàn cục, giá, tọa độ, trang tĩnh và FAQ còn khớp).
- `cd tests && npm install && node trinh-duyet.mjs` — mở app trong trình duyệt thật: tìm kiếm, trang chi tiết, chạy offline, lỗi JavaScript.
- Cả hai chạy tự động mỗi PR (GitHub Actions `kiem-tra.yml`).

## Cấu trúc

- `app/` — code app (HTML, CSS, JS thuần, không có bước build) và API (`app/api/`, hàm Vercel: hỗ trợ, ghi lỗi, sự kiện). Trợ lý "Hỏi" chạy hoàn toàn trên trình duyệt (`js/faq.js` askQuick), không gọi máy chủ; endpoint `/api/hoi` (Gemini) đã bỏ ngày 23/11/2026, biến `GEMINI_API_KEY` trên Vercel không còn dùng.
- `tools/` — công cụ sinh dữ liệu và trang tĩnh.
- `tests/` — bộ kiểm tra tự động.
- `neon/` — cấu trúc cơ sở dữ liệu Neon (đóng góp, hỗ trợ, đếm lượt AI).
- `faq-aeo-cam-nang-du-lich.json` — câu hỏi thường gặp + Schema FAQPage (sinh tự động, xem trên).
- `LICENSE` — giấy phép MIT.

## Ghi chú cho người kiểm tra

Mời kiểm chéo: số điện thoại đặt phòng, địa chỉ, giá vé, giờ xe, giờ mở cửa. Lỗi phát hiện xin ghi theo mẫu: tỉnh → mục → app đang ghi gì → đúng là gì → nguồn + ngày kiểm. Trong app có nút "Báo thông tin sai" ở từng mục.
