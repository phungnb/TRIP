# Báo cáo dịch 133 mục ứng cử Hà Nội sang tiếng Việt

Ngày dịch + kiểm chứng: 24/11/2026. Nguồn trích: Wikivoyage tiếng Anh, bài Hanoi, trích ngày 23/11/2026 (file `wiki-hoc/ung-cu-ha-noi.json`, 133 mục có `tinh = "Hà Nội"`).
File dịch: `wiki-hoc/ung-cu-ha-noi-vi.json`. Kho chính `kho-kien-thuc.json` KHÔNG bị sửa.

## Kết quả tổng

| | Số mục |
|---|---:|
| Tổng mục ứng cử Hà Nội | 133 |
| **Dịch được, đưa vào file** | **118** |
| Bỏ vì trùng kho | 10 |
| Bỏ vì trùng trong chính danh sách ứng cử | 1 |
| Chưa chắc chắn, loại ra | 2 |
| Loại vì không tên riêng / không phải điểm đến | 2 |

### Dịch được theo loại (118)

| Loại | Số mục |
|---|---:|
| Địa danh (See + Do, không có `loai`) | 36 |
| Món ăn / quán ăn, quán uống (`loai = "mon_an"`) | 47 |
| Chỗ ở (`loai = "cho_o"`) | 35 |

Theo mục Wikivoyage: See 24, Do 12, Eat 35, Drink 12, Sleep 35 — tổng 118.

### Mức độ đầy đủ giá / giờ trong 118 mục dịch

- Giá = "chưa kiểm được": 86 mục. Nguyên nhân chính: 34/35 khách sạn chỉ ghi giá USD hoặc không ghi giá; nhiều điểm tham quan không ghi giá vé trong nguồn.
- Giá USD-only → "chưa kiểm được", KHÔNG đổi sang VND theo tỷ giá tự ước: 20 mục (1 nhà hát [44] Công Nhân + 19 khách sạn); giá USD vẫn được giữ lại trong `ghi_chu` để đối chiếu.
- Giá ghi năm cũ (tháng 8/2021, trước 2024) → "chưa kiểm được": 3 quán ăn ([62] Mediterraneo, [67] Dalcheeni, [69] Ramen Haron); năm ghi giá được giữ lại trong `ghi_chu`.
- Giờ = "chưa kiểm được": 78 mục (toàn bộ 35 khách sạn + 43 mục còn lại không ghi giờ trong nguồn).
- Giá = "Tùy sự kiện": 1 mục ([28] Trung tâm Triển lãm Việt Nam).

## Danh sách bỏ vì trùng kho (10)

| # | Tên gốc (EN) | Lý do trùng |
|---|---|---|
| [7] | Museum of Ethnology | Kho đã có "Bảo tàng Dân tộc học Việt Nam" (trùng tên chính xác). |
| [12] | One-Pillar Pagoda | Kho đã có "Quảng trường Ba Đình – Lăng Chủ tịch Hồ Chí Minh + Chùa Một Cột" (chùa nằm trong mục gộp). |
| [13] | Ngọc Sơn Temple | Kho đã có "Hồ Hoàn Kiếm (Hồ Gươm) + Đền Ngọc Sơn" (đền nằm trong mục gộp). |
| [15] | Trấn Quốc Pagoda | Kho đã có "Hồ Tây + Chùa Trấn Quốc" (chùa nằm trong mục gộp). |
| [22] | Hanoi Citadel | Kho đã có "Hoàng thành Thăng Long" (trùng tên chính xác). |
| [27] | St. Joseph's Cathedral | Kho đã có "Nhà thờ Lớn Hà Nội" (trùng tên chính xác). |
| [31] | Hỏa Lò Prison | Kho đã có "Di tích Nhà tù Hỏa Lò". |
| [42] | Thang Long Water Puppet Theatre | Kho đã có "Nhà hát múa rối nước Thăng Long" (trùng tên chính xác). |
| [46] | Hanoi Opera House | Kho đã có "Nhà hát Lớn Hà Nội" (trùng tên chính xác). |
| [123] | Sofitel Legend Metropole Hanoi | Kho đã có "Sofitel Legend Metropole" (cùng khách sạn, khác hậu tố "Hanoi"). |

## Danh sách bỏ vì trùng trong chính danh sách ứng cử (1)

| # | Tên gốc (EN) | Lý do |
|---|---|---|
| [61] | Little Hanoi | Trùng [51] Little Hanoi Restaurant: cùng tên, cùng địa chỉ 16 Hàng Bè. Giữ [51] (mô tả đầy đủ hơn), bỏ [61]. |

## Danh sách chưa chắc chắn — loại ra, không đưa vào file (2)

| # | Tên gốc (EN) | Địa chỉ trong nguồn | Lý do |
|---|---|---|---|
| [38] | Vietnam Culinary School | — (không có địa chỉ) | Không tra cứu độc lập được trường này (tên chung chung, không địa chỉ, không website trong nguồn); không xác minh được còn hoạt động hay không. |
| [53] | Quán Cơm Bình Dân | 20 P. Bảo Linh | Không tra cứu độc lập được quán ở địa chỉ này (tìm kiếm chỉ ra các "Quán Cơm Bình Dân" khác ở 20 Đặng Tiến Đông, 5 Kim Hoa); tên quá chung chung, có thể đã đổi tên/đóng cửa. |

## Danh sách loại vì không tên riêng / không phải điểm đến (2)

| # | Tên gốc (EN) | Lý do |
|---|---|---|
| [47] | Snake Restaurants | Làng rắn Lệ Mật có nhiều quán, không tên quán riêng — hoạt động chung chung, không phải điểm đến cụ thể. |
| [95] | Highlands Coffee | Chuỗi cà phê chung, không có địa chỉ riêng trong nguồn; vị trí mà listing mô tả (tầng 3 tòa nhà Hàm Cá Mập, Đinh Tiên Hoàng) đã bị phá dỡ từ 25/5/2025, quán tại đó không còn tồn tại. |

## Khó khăn gặp phải

1. **Giá trên Wikivoyage không ghi ngày.** Đã tải wikitext gốc của bài Hanoi qua MediaWiki API ngày 24/11/2026: toàn bài có **0** dấu "(updated ...)" — các listing không ghi năm cập nhật, nên không phân biệt được giá 2018 với giá 2024. Quy tắc đã áp: giá VND không ghi năm thì giữ nguyên, đổi sang định dạng kho, kèm nguồn Wikivoyage; giá chỉ có USD hoặc ghi năm trước 2024 thì ghi "chưa kiểm được", không đổi tỷ giá ước. **Hạn chế này cần nói rõ với anh: giá trong file dịch phải kiểm lại trước khi gộp vào kho chính.**
2. **Kho Hà Nội đã có sẵn 65 mục nên tỷ lệ trùng cao.** 10/133 mục trùng kho, trong đó 3 mục chỉ trùng vì nằm trong mục gộp của kho (Chùa Một Cột, Đền Ngọc Sơn, Chùa Trấn Quốc) — đã bỏ theo tiền lệ Quy Nhơn ([14] Tượng Phật đôi nằm trong mục Tịnh xá Ngọc Hòa).
3. **Tên bảo tàng/quán phải tra cứu ngoài.** "Air Force Museum" → "Bảo tàng Phòng không – Không quân" (173C Trường Chinh; đã kiểm chứng thêm: các nguồn ghi vé 15.000–30.000đ và giờ mở cửa khác nhau nên giữ "chưa kiểm được" và ghi chú mâu thuẫn); "Downed Aircraft Memorial" → "Phù điêu bắt sống phi công Mỹ John McCain" (hồ Trúc Bạch, đường Thanh Niên); "Madam Tu Hong" → "MaDam Tư Hồng" (5 ngõ Hội Vũ, chuyên chả cá).
4. **Ghi chú trong Wikivoyage đã lỗi thời, phải kiểm chứng độc lập.** [32] August Movie Theater ghi "Renovated into a Nightclub" — tra cứu cho thấy Rạp Tháng Tám (45 Hàng Bài) vẫn chiếu phim bình thường, lịch chiếu cập nhật đến 29/11/2026; đã giữ lại với ghi chú đính chính. [9] Bảo tàng Phòng không – Không quân: các nguồn ngoài ghi giờ mở cửa mâu thuẫn nhau (nghỉ Thứ 2 hay Thứ 6), đã giữ "chưa kiểm được" thay vì chọn một bên.
5. **Tòa nhà Hàm Cá Mập đã phá dỡ.** [95] Highlands Coffee mô tả đúng quán ở tầng 3 tòa nhà này; tra cứu cho thấy thành phố đã phá dỡ tòa nhà từ 25/5/2025 (dự kiến xong tháng 8/2025) — mục đã loại ra thay vì đưa vào kho một địa điểm không còn tồn tại.
6. **Phố đường tàu có 3 mục riêng.** [23] mục chung + [24] đoạn Bắc (5 Trần Phú) + [25] đoạn Nam (ngõ 222 Lê Duẩn) là 3 listing riêng trong nguồn, giữ cả 3 với tên phân biệt rõ đoạn, kèm giờ tàu chạy và cảnh báo an toàn.
7. **Tên quán ăn/khách sạn giữ nguyên tên gốc.** Không dịch nghĩa tên quán (Mediterraneo, dragonCELLO, Etēsia, T.U.N.G Dining…); khách sạn tên nước ngoài giữ nguyên tên; quán tên Việt giữ nguyên tên Việt gốc (Bánh Mì Dân Tổ, Phở Tư Lùn, MaDam Tư Hồng…).
8. **Đối chiếu trùng kho có 1 trường hợp cần kiểm tay, đã giữ lại:** "Little Hanoi DX2 Hostel" (46 Hàng Gà) ≠ "Little Hanoi Hostel" trong kho (chi nhánh khác, không có địa chỉ cụ thể trong kho) — substring hai chiều không bắt (do "DX2" chen giữa) và kiểm tay xác nhận là hai cơ sở khác nhau. Tương tự "Nhà hàng Little Hanoi" (16 Hàng Bè) ≠ "Little Hanoi Hostel" trong kho.
9. **Ba quán bia không có địa chỉ trong nguồn** ([85] Hoa Viên, [86] Goldmalt, [87] Legend Beer) — chỉ có tên thương hiệu và website. Đã giữ lại theo tiền lệ Quy Nhơn (đợt đó giữ 13 mục không có địa chỉ cụ thể), kèm ghi chú "cần kiểm địa chỉ cụ thể trước khi gộp".
10. **Ngày trích vs ngày dịch lệch nhau:** trích 23/11/2026, dịch + kiểm chứng 24/11/2026; trường `nguon` trong file dịch ghi thống nhất "lấy ngày 24/11/2026".

## Kiểm chứng đầu ra

- File `wiki-hoc/ung-cu-ha-noi-vi.json`: JSON hợp lệ, 118 mục, 0 lỗi schema (mọi mục có đủ `ten`, `tinh = "Hà Nội"`, `gia`, `gio`, `ghi_chu`, `nguon`; `loai` chỉ là `mon_an`/`cho_o` hoặc bỏ trống).
- Tên chuẩn hóa không trùng nhau trong file (118 tên duy nhất).
- Đối chiếu cuối với `kho-kien-thuc.json` (1.971 mục, chuẩn hóa đ→d trước NFD, substring hai chiều): 0 trùng thật còn sót (10 mục trùng đã bỏ, xem bảng trên; 1 trường hợp kiểm tay đã giữ lại, xem khó khăn #8).
- Không còn giá USD nào sót trong trường `gia` (giá USD chỉ còn trong `ghi_chu` để đối chiếu).
- `kho-kien-thuc.json` không bị sửa (chỉ làm file dịch riêng; script dựng `wiki-hoc/build-ha-noi.py` chỉ đọc kho).
