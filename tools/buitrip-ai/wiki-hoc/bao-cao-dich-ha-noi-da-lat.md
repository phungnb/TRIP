# Báo cáo dịch 194 mục ứng cử Hà Nội + Đà Lạt sang tiếng Việt

Ngày dịch + kiểm chứng: 24/11/2026. Nguồn trích: Wikivoyage tiếng Anh, bài Hanoi và bài Da Lat, trích ngày 23/11/2026 (file `wiki-hoc/ung-cu-muc-moi.json`).
File dịch gộp: `wiki-hoc/ung-cu-ha-noi-da-lat-vi.json` (163 mục). Kho chính `kho-kien-thuc.json` KHÔNG bị sửa (md5 `7c960fa579fc107144d2bbb3b69d66ba`, giữ nguyên).

Làm theo đúng cách đợt Quy Nhơn (102 mục): dịch tay, tra cứu ngoài khi không chắc tên Việt, giá USD/giá cũ → "chưa kiểm được", đối chiếu trùng kho bằng chuẩn hóa đ→d trước NFD + substring hai chiều, mục chưa chắc chắn thì loại ra thay vì đoán. Hai đợt chạy song song: Hà Nội (133 mục) và Đà Lạt (61 mục); báo cáo chi tiết từng đợt ở `wiki-hoc/bao-cao-dich-ha-noi.md` và `wiki-hoc/bao-cao-dich-da-lat.md`.

## Kết quả tổng

| | Hà Nội | Đà Lạt | Tổng |
|---|---:|---:|---:|
| Tổng mục ứng cử | 133 | 61 | **194** |
| **Dịch được, đưa vào file** | **118** | **45** | **163** |
| Bỏ vì trùng kho | 10 | 14 | 24 |
| Bỏ vì trùng trong chính danh sách ứng cử | 1 | 0 | 1 |
| Chưa chắc chắn, loại ra | 2 | 2 | 4 |
| Loại vì không tên riêng / không phải điểm đến | 2 | 1 | 3 |

(Một mục Đà Lạt [1] "Colonial Palaces" tách thành 2 mục riêng — Dinh Bảo Đại I và Dinh Bảo Đại II — nên 61 − 14 − 2 − 1 = 44 mục gốc cho ra 45 mục trong file.)

### Dịch được theo loại (163)

| Loại | Hà Nội | Đà Lạt | Tổng |
|---|---:|---:|---:|
| Địa danh (See + Do, không có `loai`) | 36 | 6 | **42** |
| Món ăn / quán ăn, quán uống (`loai = "mon_an"`) | 47 | 17 | **64** |
| Chỗ ở (`loai = "cho_o"`) | 35 | 22 | **57** |

### Mức độ đầy đủ giá / giờ trong 163 mục dịch

- Giá = "chưa kiểm được": 114 mục (86 Hà Nội + 28 Đà Lạt). Nguyên nhân chính: khách sạn phần lớn chỉ ghi giá USD hoặc không ghi giá (34/35 khách sạn Hà Nội, 11 khách sạn Đà Lạt); nhiều điểm tham quan không ghi giá vé trong nguồn.
- Giờ = "chưa kiểm được": 104 mục (78 Hà Nội + 26 Đà Lạt).
- Giá USD-only → "chưa kiểm được", KHÔNG đổi sang VND theo tỷ giá tự ước: 20 mục Hà Nội + 11 mục Đà Lạt = 31 mục; giá USD giữ lại trong `ghi_chu` để đối chiếu.
- Giá ghi năm cũ (tháng 8/2021, trước 2024) → "chưa kiểm được": 3 quán Hà Nội.
- Giá = "Tùy sự kiện": 1 mục (Trung tâm Triển lãm Việt Nam, Hà Nội).

## Danh sách bỏ vì trùng kho

### Hà Nội (10)

| # | Tên gốc (EN) | Lý do trùng |
|---|---|---|
| [7] | Museum of Ethnology | Kho đã có "Bảo tàng Dân tộc học Việt Nam". |
| [12] | One-Pillar Pagoda | Kho đã có "Quảng trường Ba Đình – Lăng Chủ tịch Hồ Chí Minh + Chùa Một Cột" (chùa nằm trong mục gộp). |
| [13] | Ngọc Sơn Temple | Kho đã có "Hồ Hoàn Kiếm (Hồ Gươm) + Đền Ngọc Sơn" (đền nằm trong mục gộp). |
| [15] | Trấn Quốc Pagoda | Kho đã có "Hồ Tây + Chùa Trấn Quốc" (chùa nằm trong mục gộp). |
| [22] | Hanoi Citadel | Kho đã có "Hoàng thành Thăng Long". |
| [27] | St. Joseph's Cathedral | Kho đã có "Nhà thờ Lớn Hà Nội". |
| [31] | Hỏa Lò Prison | Kho đã có "Di tích Nhà tù Hỏa Lò". |
| [42] | Thang Long Water Puppet Theatre | Kho đã có "Nhà hát múa rối nước Thăng Long". |
| [46] | Hanoi Opera House | Kho đã có "Nhà hát Lớn Hà Nội". |
| [123] | Sofitel Legend Metropole Hanoi | Kho đã có "Sofitel Legend Metropole" (cùng khách sạn, khác hậu tố "Hanoi"). |

Trùng trong chính danh sách ứng cử (1): [61] Little Hanoi = [51] Little Hanoi Restaurant (cùng 16 Hàng Bè); giữ [51].

### Đà Lạt (14)

| # | Tên gốc (EN) | Lý do trùng |
|---|---|---|
| [2] | Crazy House | Kho đã có "Biệt thự Hằng Nga (Crazy House)". Giá vé 80.000đ trong nguồn có thể bổ sung cho mục kho (kho đang ghi "chưa kiểm được mức vé riêng"). |
| [3] | Dalat Market | Kho đã có "Chợ Đà Lạt / chợ đêm". |
| [5] | Golden Spring Lake | Kho đã có "Hồ Suối Vàng". |
| [6] | Truc Lam Zen Monastery | Kho đã có "Thiền viện Trúc Lâm". Mâu thuẫn giá cáp treo: nguồn ghi khứ hồi 150.000đ (2/2026); kho đã ghi mâu thuẫn 100.000đ vs 150.000đ — cần kiểm tại quầy. |
| [8] | Langbiang Mountain | Kho đã có "Núi Langbiang". |
| [11] | Prenn Falls | Kho đã có "Thác Prenn". |
| [12] | Thien Vien Truc Lam Monastery | Trùng kho (Thiền viện Trúc Lâm) và trùng [6] trong cùng đợt. |
| [13] | Tuyen Lam Lake | Kho đã có "Hồ Tuyền Lâm". |
| [14] | Valley of Love | Kho đã có "Thung lũng Tình Yêu (TTC World, gồm Đồi Mộng Mơ)". |
| [15] | Xuan Huong Lake | Kho đã có "Hồ Xuân Hương". |
| [16] | Lak Lake | Kho đã có "Hồ Lắk" (tỉnh Đắk Lắk) — ngoài phạm vi Đà Lạt. |
| [18] | Dalat (Central) Market | Trùng kho "Chợ Đà Lạt / chợ đêm" và trùng [3] trong cùng đợt. |
| [57] | Ana Mandara Villas | Kho đã có "Ana Mandara Villas Dalat Resort & Spa". |
| [59] | The Dalat Palace Heritage | Kho đã có "Dalat Palace Heritage Hotel". |

## Danh sách chưa chắc chắn — loại ra, không đưa vào file (4)

| # | Tên gốc (EN) | Địa chỉ trong nguồn | Lý do |
|---|---|---|---|
| HN [38] | Vietnam Culinary School | — (không có địa chỉ) | Không tra cứu độc lập được; không xác minh được còn hoạt động hay không. |
| HN [53] | Quán Cơm Bình Dân | 20 P. Bảo Linh | Không tra cứu độc lập được quán ở địa chỉ này; tên quá chung chung, có thể đã đổi tên/đóng cửa. |
| ĐL [19] | Curry Chaaa | 32 Ánh Sáng | Không tra cứu độc lập được (tên không tìm thấy ngoài Wikivoyage). |
| ĐL [20] | Quan chay trung hieu | Thành phố Đà Lạt (chung chung) | Không tra cứu độc lập được; địa chỉ trong nguồn chỉ ghi chung chung, không tọa độ để đối chiếu. |

## Danh sách loại vì không tên riêng / không phải điểm đến (3)

| # | Tên gốc (EN) | Lý do |
|---|---|---|
| HN [47] | Snake Restaurants | Làng rắn Lệ Mật có nhiều quán, không tên quán riêng. |
| HN [95] | Highlands Coffee | Chuỗi cà phê chung, không địa chỉ riêng; vị trí mô tả (tầng 3 tòa nhà Hàm Cá Mập) đã bị phá dỡ từ 25/5/2025, quán tại đó không còn tồn tại. |
| ĐL [17] | University of Dalat | Trường đại học, không phải điểm tham quan. |

## Khó khăn gặp phải

1. **Giá trên Wikivoyage không ghi ngày.** Cả hai bài (Hanoi, Da Lat) đều có **0** dấu "(updated ...)" trong wikitext gốc — giống đợt Quy Nhơn, không phân biệt được giá 2018 với giá 2024. Quy tắc đã áp: giá VND không ghi năm thì giữ nguyên, đổi sang định dạng kho; giá chỉ có USD hoặc ghi năm trước 2024 thì ghi "chưa kiểm được". **Hạn chế này cần nói rõ với anh: giá trong file dịch phải kiểm lại trước khi gộp vào kho chính.**
2. **Giá vé nhiều điểm Đà Lạt đã tăng so với Wikivoyage** — đã kiểm chứng độc lập và cập nhật (ghi rõ giá cũ trong ngoặc): Vườn hoa thành phố 70.000đ → 100.000đ/người lớn, 50.000đ/trẻ em (2026); Thác Pongour 10.000đ → 40.000đ/người lớn, 20.000đ/trẻ em (khảo sát 03/2026); Cà phê Tùng 8.000đ → 18.000–25.000đ/ly (10/2026). Mâu thuẫn giá vé Dinh Bảo Đại I (40.000–90.000đ) ghi 90.000đ kèm ghi chú mâu thuẫn.
3. **Ghi chú trong Wikivoyage đã lỗi thời, phải kiểm chứng độc lập.** Rạp Tháng Tám ghi "Renovated into a Nightclub" — tra cứu cho thấy rạp vẫn chiếu phim bình thường, lịch chiếu cập nhật đến 29/11/2026; đã giữ lại với ghi chú đính chính. Bảo tàng Phòng không – Không quân: các nguồn ngoài mâu thuẫn nhau (vé 15.000–30.000đ; nghỉ Thứ 2 hay Thứ 6) — giữ "chưa kiểm được" cả hai trường và ghi chú mâu thuẫn.
4. **Tòa nhà Hàm Cá Mập đã phá dỡ** (từ 25/5/2025) — mục Highlands Coffee mô tả quán ở đó đã loại ra thay vì đưa một địa điểm không còn tồn tại vào kho.
5. **Một listing gộp nhiều điểm (Đà Lạt):** "Colonial Palaces" gộp 3 dinh Bảo Đại + khách sạn + sân golf — tách thành Dinh Bảo Đại I (1 Trần Quang Diệu, mở lại 28/8/2026) và Dinh Bảo Đại II (12 Trần Hưng Đạo, không mở cửa thường xuyên, là nhà khách UBND tỉnh). Dinh III đã có trong kho nên không tách thêm.
6. **Ba cặp tên dễ nhầm (Đà Lạt) đã ghi chú phân biệt trong file:** "Dalat Hotel" (151 Phan Đình Phùng) ≠ "Hotel Dalat" (5 Nguyễn Thái Học); "Khách sạn Hòa Bình 1" ≠ "Khách sạn Hòa Bình (Peace Hotel)"; "Nhà nghỉ Hằng Nga" (chỗ ở) ≠ "Biệt thự Hằng Nga" (địa danh trong kho).
7. **Địa chỉ mâu thuẫn cần kiểm lại (Đà Lạt):** 100 Roofs Cafe — nguồn ghi 26 Phan Bội Châu, các nguồn hiện tại ghi 57 Phan Bội Châu; Nhà nghỉ Hằng Nga — nguồn ghi đường Bùi Thị Xuân, trong khi Crazy House ở đường Huỳnh Thúc Kháng; Mr. Peace — Hostelworld ghi đã chuyển sang 37/10/17 hẻm Hoàng Diệu (nguồn ghi 3/8 Hai Bà Trưng).
8. **Chính tả chưa kiểm chứng được (Đà Lạt):** "Bốn Mùa Guesthouse" (tên Việt suy từ "Bon Mua", 1B1 Bùi Thị Xuân) — có một khách sạn khác cùng tên "Bốn Mùa" ở 23 Lê Duẩn, cần kiểm lại trước khi gộp. "Cafe Noi" (74 Phan Đình Phùng) chỉ xác minh được tên không dấu như nguồn.
9. **Phố đường tàu Hà Nội có 3 mục riêng** ([23] mục chung + [24] đoạn Bắc 5 Trần Phú + [25] đoạn Nam ngõ 222 Lê Duẩn) — giữ cả 3 với tên phân biệt rõ đoạn, kèm giờ tàu chạy và cảnh báo an toàn.
10. **Chuẩn hóa lúc gộp:** 11 mục Đà Lạt có trường `gia` dạng "chưa kiểm được (nguồn chỉ ghi bằng USD, ...)" — lúc gộp đã chuyển phần ghi chú USD sang `ghi_chu` và để `gia` đúng "chưa kiểm được" (theo tiền lệ Quy Nhơn/Hà Nội: không còn giá USD nào trong trường `gia`).
11. **Ngày trích vs ngày dịch lệch nhau:** trích 23/11/2026, dịch + kiểm chứng 24/11/2026; trường `nguon` trong file dịch ghi thống nhất "lấy ngày 24/11/2026".

## Kiểm chứng đầu ra (làm lại độc lập lúc gộp)

- File `wiki-hoc/ung-cu-ha-noi-da-lat-vi.json`: JSON hợp lệ, **163 mục**, 0 lỗi schema (mọi mục có đủ `ten`, `tinh`, `gia`, `gio`, `ghi_chu`, `nguon`; `loai` chỉ là `mon_an`/`cho_o` hoặc bỏ trống).
- Tên chuẩn hóa không trùng nhau trong file gộp (163 tên duy nhất); Hà Nội và Đà Lạt không trùng nhau.
- Đối chiếu cuối với `kho-kien-thuc.json` (1.971 mục, chuẩn hóa đ→d trước NFD, substring hai chiều): còn 6 cặp trùng substring — **tất cả đã kiểm tay là báo động giả, giữ lại**: "Bánh ướt lòng gà Long" (quán 202 Phan Đình Phùng) ≠ món "Bánh ướt lòng gà" chung trong kho; "Bánh Mì Xíu Mại Ri 79" (quán 1 Thông Thiên Học) ≠ món "Bánh mì xíu mại" chung; "Dalat Hotel" (151 Phan Đình Phùng) ≠ "MerPerle Dalat Hotel" / "Sammy Dalat Hotel"; "Khách sạn Hòa Bình 1" và "Khách sạn Hòa Bình (Peace Hotel)" ≠ "Khách sạn Hòa Bình" ở An Giang (khác tỉnh).
- Không còn giá USD nào trong trường `gia` (sau bước chuẩn hóa #10).
- `kho-kien-thuc.json` không bị sửa (md5 `7c960fa579fc107144d2bbb3b69d66ba`).
