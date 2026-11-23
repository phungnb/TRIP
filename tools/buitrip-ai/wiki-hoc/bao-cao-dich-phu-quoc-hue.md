# Báo cáo dịch 96 mục ứng cử Phú Quốc + Huế sang tiếng Việt

Ngày dịch + kiểm chứng: 24/11/2026. Nguồn trích: Wikivoyage tiếng Anh, bài Phú Quốc và Huế, trích ngày 23/11/2026 (file `wiki-hoc/ung-cu-muc-moi.json`).
File dịch: `wiki-hoc/ung-cu-phu-quoc-hue-vi.json` (kèm script tái tạo `wiki-hoc/build-ung-cu-phu-quoc-hue.py`). Kho chính `kho-kien-thuc.json` KHÔNG bị sửa (vẫn 1.971 mục).
Làm theo đúng cách đợt Quy Nhơn (102 mục, file `ung-cu-quy-nhon-vi.json`).

## Kết quả tổng

| | Số mục |
|---|---:|
| Tổng mục ứng cử Phú Quốc + Huế | 96 (Phú Quốc 35, Huế 61) |
| **Dịch được, đưa vào file** | **85 (Phú Quốc 34, Huế 51)** |
| Bỏ vì trùng kho | 6 |
| Bỏ vì là bộ phận của mục đã có trong kho | 1 |
| Chưa chắc chắn, loại ra | 2 |
| Loại vì không tên riêng / món chung chung | 2 |

### Dịch được theo loại (85)

| Loại | Phú Quốc | Huế | Tổng |
|---|---:|---:|---:|
| Địa danh (See + Do, không có `loai`) | 13 | 8 | 21 |
| Món ăn / quán ăn, quán uống (`loai = "mon_an"`) | 6 | 22 | 28 |
| Chỗ ở (`loai = "cho_o"`) | 15 | 21 | 36 |

Theo mục Wikivoyage: Phú Quốc See 5, Do 8, Eat 6, Sleep 15; Huế See 5, Do 3, Eat 15, Drink 7, Sleep 21.

### Mức độ đầy đủ giá / giờ trong 85 mục dịch

- Giá = "chưa kiểm được": 75 mục. Trong đó 37 mục ghi rõ giá gốc USD/EUR trong `ghi_chu` (không đổi sang VND theo tỷ giá tự ước).
- Giờ = "chưa kiểm được": 74 mục (đa số listing Wikivoyage không ghi giờ).
- Giá VND giữ lại được: vé 3 lăng Huế (Gia Long, Thiệu Trị, Đồng Khánh: 50.000đ/người lớn, trẻ em miễn phí), vé Nhà tù Phú Quốc (miễn phí), massage Niềm Tin (40.000đ/giờ, 30.000đ/giờ xông hơi), Bánh Khoái Hạnh (20.000–55.000đ/phần, đối chiếu nguồn Việt 2026), Lâm Bảo Long (139.000–255.000đ), Carnosa (255.000–278.000đ), cà phê La Beaute (12.000đ), Brown Eyes (miễn phí vào cửa).

## Danh sách bỏ vì trùng kho (6)

| # | Tên gốc (EN) | Lý do trùng |
|---|---|---|
| Huế [1] | Thien Mu Pagoda | Kho đã có "Chùa Thiên Mụ". |
| Huế [2] | Imperial City of Hue | Kho đã có "Đại Nội Huế (Kinh thành Huế)". |
| Huế [5] | Tomb of Minh Mang | Kho đã có "Lăng Minh Mạng". |
| Huế [7] | Tomb of Tu Duc | Kho đã có "Lăng Tự Đức". |
| Huế [59] | La Residence | Kho đã có "La Residence Hue Hotel & Spa", cùng địa chỉ 5 Lê Lợi — bắt được nhờ kiểm substring, đối chiếu tên chính xác thì trượt (dấu câu + "Hotel & Spa"). |
| Huế [60] | Saigon Morin | Kho đã có "Khách sạn Sài Gòn Morin Huế", cùng địa chỉ 30 Lê Lợi — bắt được nhờ kiểm substring. |

## Danh sách bỏ vì là bộ phận của mục đã có trong kho (1)

| # | Tên gốc (EN) | Lý do |
|---|---|---|
| Phú Quốc [5] | Sunworld Hon Thom Water Park | Công viên nước Aquatopia nằm trong khu Sun World Hòn Thơm — kho đã có mục "Hòn Thơm — Cáp treo Hòn Thơm + Sun World Hòn Thơm Nature Park". Giữ theo tiền lệ Quy Nhơn (tượng trong khuôn viên tịnh xá thì bỏ, không tách mục riêng). |

## Danh sách chưa chắc chắn — loại ra, không đưa vào file (2)

| # | Tên gốc (EN) | Địa chỉ trong nguồn | Lý do |
|---|---|---|---|
| Huế [22] | Hông Thùy | 86 Hàn Thuyên | Không tra được độc lập tên "Hông Thùy"; địa chỉ 86 Hàn Thuyên hiện là quán ốc khác (Ốc Tinh Tế; có tài khoản TikTok "Ốc Thuỳ 2"). Có thể tên đã viết sai hoặc quán đã đổi tên. |
| Huế [32] | Sinh To Place | 30 Bến Nghé | "Sinh To Place" chỉ là nhãn mô tả của Wikivoyage, không tra được tên thật của quán; giá rau má 6.000đ / sinh tố 8.000đ quá cũ. |

## Danh sách loại vì không tên riêng / món chung chung (2)

| # | Tên gốc (EN) | Lý do |
|---|---|---|
| Huế [12] | Banh Bao | Món ăn chung chung ("gánh hàng rong bán bánh bao ngon"), không có tên quán — theo tiền lệ Quy Nhơn (loại "Breakfast bánh xèo"). |
| Huế [37] | Sidewalk Coffee | Cà phê vỉa hè chung chung trên đường Bạch Đằng, không có tên riêng. |

## 3 cờ trùng GIẢ (đã kiểm tay, vẫn giữ trong file)

Kiểm substring 2 chiều báo trùng nhưng thực chất khác thực thể:

| Tên trong file dịch | Tên trong kho | Vì sao giữ |
|---|---|---|
| Phố bánh canh Hàn Thuyên | "Bánh căn", "Bánh canh" | Hai mục trong kho là MÓN ĂN; mục mới là con PHỐ bán bánh canh (địa danh). Tên khác nhau rõ ("Phố..." + tên đường). |
| Ông Táo | "Gà Đông Tảo (gà chân to)" | Dương tính giả của kiểm substring: "ong tao" nằm trong "dong tao" sau khi chuẩn hóa. Hai thực thể không liên quan (quán ăn Huế vs giống gà). |

## Khó khăn gặp phải

1. **Giá USD là rào cản lớn nhất ở Phú Quốc:** 22/34 mục Phú Quốc chỉ có giá USD hoặc EUR (lặn 65–300 USD, khách sạn 6–250 USD) — theo luật đều ghi "chưa kiểm được", chỉ giữ lại giá gốc trong `ghi_chu`. Kết quả: Phú Quốc chỉ còn 1 mục có giá VND dùng được (Nhà tù Phú Quốc: miễn phí). Muốn có giá VND thật cho khách sạn/lặn Phú Quốc phải tra riêng từng trang đặt phòng, không lấy từ Wikivoyage được.
2. **Huế có kho mỏng nên tỉ lệ trùng thấp nhưng tên quán khó tra:** kho Huế chỉ có 16 mục (toàn địa danh lớn) nên 4 lăng/chùa trùng là hết; ngược lại, các quán ăn nhỏ trên Wikivoyage (Hông Thùy, Sinh To Place) không tra được độc lập bằng tên tiếng Việt.
3. **Tên thương hiệu giữ nguyên tiếng Anh:** phần lớn nhà hàng/khách sạn Phú Quốc và khu Tây Huế dùng tên tiếng Anh làm thương hiệu (The Dog Bar, Mango Bay Resort, La Veranda...) — giữ nguyên tên gốc, không dịch nghĩa, vì đó là tên trên biển hiệu.
4. **"Lang Toi" (hostel Bãi Sao):** chỉ Wikivoyage nhắc tới, không có nguồn độc lập nào xác nhận tên có dấu ("Làng Tôi") hay không dấu. Giữ nguyên cách viết "Lang Toi" theo nguồn (email langtoi_restaurant@yahoo.com.vn cho thấy đây là cách cơ sở tự viết tên) và ghi chú rõ trong `ghi_chu`.
5. **Giá cũ trong nguồn:** Bánh Khoái Hạnh (Wikivoyage 1/2018), Quán Chay Thanh Liễu (6/2017), Phố bánh canh Hàn Thuyên (4/2022), Homeland Hotel (5/2015) — đều ghi "chưa kiểm được" và giữ giá cũ trong `ghi_chu` kèm tháng/năm. Riêng Bánh Khoái Hạnh đã đối chiếu được giá + giờ hiện tại từ nguồn Việt 2026 (tourhue.vn, AEON Mall Huế) nên giữ giá 20.000–55.000đ/phần, giờ 10:00–21:00.
6. **"Phú Quốc" trong file ứng cử nằm ở `tinh = "An Giang"`** (tỉnh mới sau sáp nhập 01/07/2025) — file dịch giữ nguyên `tinh = "An Giang"` theo đúng quy ước kho; người dùng hỏi "Phú Quốc" vẫn khớp nhờ bảng thành phố → tỉnh trong code.
