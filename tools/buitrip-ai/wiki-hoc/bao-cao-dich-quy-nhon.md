# Báo cáo dịch 117 mục ứng cử Quy Nhơn sang tiếng Việt

Ngày dịch + kiểm chứng: 24/11/2026. Nguồn trích: Wikivoyage tiếng Anh, bài Quy Nhơn, trích ngày 23/11/2026 (file `wiki-hoc/ung-cu-muc-moi.json`, 117 mục có `tinh = "Gia Lai"`).
File dịch: `wiki-hoc/ung-cu-quy-nhon-vi.json`. Kho chính `kho-kien-thuc.json` KHÔNG bị sửa.

## Kết quả tổng

| | Số mục |
|---|---:|
| Tổng mục ứng cử Quy Nhơn | 117 |
| **Dịch được, đưa vào file** | **102** |
| Bỏ vì trùng kho | 3 |
| Chưa chắc chắn, loại ra | 5 |
| Loại vì không tên riêng / không phải điểm đến | 7 |

### Dịch được theo loại (102)

| Loại | Số mục |
|---|---:|
| Địa danh (See + Do, không có `loai`) | 31 |
| Món ăn / quán ăn, quán uống (`loai = "mon_an"`) | 54 |
| Chỗ ở (`loai = "cho_o"`) | 17 |

Theo mục Wikivoyage: See 20, Do 10, Eat 38, Drink 17, Sleep 17 — tổng 102. (Một mục Eat là cửa hàng đặc sản nên xếp vào địa danh thay vì món ăn, vì vậy món ăn là 54 chứ không phải 55.)

### Mức độ đầy đủ giá / giờ trong 102 mục dịch

- Giá = "chưa kiểm được": 36 mục.
- Giờ = "chưa kiểm được": 89 mục (đa số listing Wikivoyage không ghi giờ).
- Giá USD-only → "chưa kiểm được", KHÔNG đổi sang VND theo tỷ giá tự ước: 3 khách sạn ([113] Big Tree, [115] Life's a Beach, [116] Avani) + một số quán.

## Danh sách bỏ vì trùng kho (3)

| # | Tên gốc (EN) | Lý do trùng |
|---|---|---|
| [2] | Doi Cham Towers | Kho đã có "Tháp Đôi (Quy Nhơn — Bình Định cũ)". Đối chiếu chuẩn hóa (đ→d trước NFD) kiểu trùng tên chính xác thì trượt, kiểm substring hai chiều mới bắt được. |
| [14] | Tượng Phật đôi | Không phải điểm riêng: là tượng Quan Âm đôi cao 30 m trong khuôn viên **Tịnh xá Ngọc Hòa** (thôn Lý Lương, xã Nhơn Lý, cạnh Eo Gió) — kho đã có mục "Tịnh xá Ngọc Hòa". |
| [51] | Gia Vỹ | Là tên chung của quán Bánh Xèo Tôm Nhảy Gia Vỹ; kho chưa có, nhưng 2 chi nhánh đã dịch riêng: "Bánh Xèo Tôm Nhảy Gia Vỹ" (118 Đống Đa) và "Bánh Xèo Tôm Nhảy Gia Vỹ 2" (14 Diên Hồng). Bỏ mục chung để khỏi trùng. |

## Danh sách chưa chắc chắn — loại ra, không đưa vào file (5)

| # | Tên gốc (EN) | Địa chỉ trong nguồn | Lý do |
|---|---|---|---|
| [26] | Beach Promenade Amusement Park | Bãi biển Quy Nhơn | Không tra được tên tiếng Việt, không xác minh được còn tồn tại hay không. |
| [27] | Children's World | 48 Nguyễn Công Trứ | Không tra được tên tiếng Việt / không xác minh được còn hoạt động. |
| [36] | Sports Complex Tennis | — | Không chốt được tên tiếng Việt (sân tennis trong khu liên hợp thể thao, không rõ tên riêng). |
| [40] | Bốn Quang Tuấn | 85 Lê Lợi | Không tra cứu độc lập được quán này (tên có thể đã viết sai hoặc quán đã đổi tên/đóng cửa). |
| [43] | Mià Hàng 07 | 7 Trần Phú | Không tra cứu độc lập được (tên "Mià" chưa rõ chính tả đúng). |

## Danh sách loại vì không tên riêng / không phải điểm đến (7)

| # | Tên gốc (EN) | Lý do |
|---|---|---|
| [20] | Municipal People's Government Offices | Trụ sở UBND — cơ quan hành chính, không phải điểm tham quan. |
| [29] | Carpet football (soccer) and handball | Hoạt động chung chung, không có tên riêng / địa điểm cố định. |
| [32] | Two nicely-maintained tennis hard courts | Sân tennis chung chung, không tên riêng. |
| [33] | Two volleyball courts | Sân bóng chuyền chung chung, không tên riêng. |
| [56] | Breakfast bánh xèo | Món ăn chung chung, không tên quán. |
| [57] | Bánh xèo market vendors | Quầy hàng trong chợ, không tên riêng. |
| [70] | Nhà hàng | Không có tên riêng. |

## Khó khăn gặp phải

1. **Giá trên Wikivoyage không ghi ngày.** Đã tải wikitext gốc của bài Quy Nhơn qua MediaWiki API ngày 24/11/2026: toàn bài có **0** dấu "(updated ...)" — các listing không ghi năm cập nhật, nên không phân biệt được giá 2018 với giá 2024. Quy tắc đã áp: giá VND không ghi năm thì giữ nguyên, đổi sang định dạng kho, kèm nguồn Wikivoyage; giá chỉ có USD thì ghi "chưa kiểm được", không đổi tỷ giá ước; chỗ nào có mâu thuẫn thì ghi chú "cần kiểm tại quầy". **Hạn chế này cần nói rõ với anh: giá trong file dịch phải kiểm lại trước khi gộp vào kho chính.**
2. **Mâu thuẫn giá vé Bảo tàng Quang Trung:** Wikivoyage ghi 10.000đ, các nguồn khác ghi 30.000–50.000đ. File dịch giữ 10.000đ theo nguồn gốc kèm ghi chú mâu thuẫn.
3. **Mâu thuẫn giờ mở cửa Trung tâm Khám phá Khoa học và Đổi mới sáng tạo Quy Nhơn (ExploraScience):** Wikivoyage ghi Thứ 7–Chủ nhật 8:30–17:00; một nguồn khác (Traveloka) ghi mở cả tuần 8:00–11:00 và 14:00–17:00. File dịch giữ giờ theo Wikivoyage, ghi chú mâu thuẫn trong `ghi_chu`. Vé 120.000đ đã kiểm chứng độc lập.
4. **Tên chùa/tháp/bảo tàng phải tra cứu ngoài.** Một số tên EN không dịch thẳng được: "Ghềnh Ráng Church" → "Nhà thờ đá Ghềnh Ráng" (tên đầy đủ: Trung tâm Thánh Thể và Thánh Mẫu Ghềnh Ráng, 21 Tây Sơn; giờ 7:00–18:00 + miễn phí đã kiểm chứng thêm qua mybinhdinh.vn / TripAdvisor); "ExploraScience" → "Trung tâm Khám phá Khoa học và Đổi mới sáng tạo Quy Nhơn" (số 10 Đại lộ Khoa học, Ghềnh Ráng); các tháp Chăm đã đối chiếu vị trí: Tháp Dương Long (Tháp Ngà, Tây Sơn), Tháp Cánh Tiên (Nhơn Hậu, An Nhơn), Tháp Phú Lốc (còn gọi Phú Lộc/Thốc Lốc, Nhơn Thành, An Nhơn), Tháp Thủ Thiện (Bình Nghi, Tây Sơn), Tháp Bình Lâm (Phước Hòa, Tuy Phước).
5. **Tên quán ăn giữ nguyên tên Việt gốc** (Bảy Quán, Phượng Tèo, Gia Vỹ…), không dịch nghĩa. Một số tên không tra cứu độc lập được (Bốn Quang Tuấn, Mià Hàng 07) đã loại ra thay vì đoán.
6. **Chính tả chưa kiểm chứng được:** "Tiệm bánh Phương Ngá" giữ nguyên cách viết trong nguồn, cần kiểm lại trước khi gộp.
7. **"Tịnh xá Ngọc Nhơn":** đã bỏ tiền tố "Chùa" thừa trong tên dịch (nguồn ghi "Chùa Tịnh xá Ngọc Nhơn" — tịnh xá không phải chùa).
8. **Đối chiếu trùng kho có 3 báo động giả** (substring match nhưng không trùng thật, đã kiểm tay và giữ lại): "Phượng Tèo Bún Chả Cá" (quán Quy Nhơn) ≠ món "Bún chả cá" chung của Nha Trang trong kho; "Quán An Cô Bốn Bún Thịt Nướng" (quán Quy Nhơn) ≠ món "Bún thịt nướng" chung của TP.HCM trong kho; "Eden Hotel" (Quy Nhơn) ≠ "Eden Hotel Cát Bà" (Hải Phòng).
9. **Một mục Eat là cửa hàng, không phải món ăn:** "Cửa hàng Đặc sản hải sản tươi khô" (61 Nguyễn Lữ, Ngô Mây) — tên là nhãn mô tả trong nguồn, không phải tên riêng, nhưng có địa chỉ cụ thể nên giữ lại dưới dạng địa danh. Cần lưu ý khi gộp: đây không phải tên thương hiệu.
10. **"Phương Mai Hotel":** Wikivoyage ghi tạm đóng cửa từ 10/2026 — đã ghi chú trong `ghi_chu`, cần kiểm lại trước khi gộp.
11. **Ngày trích vs ngày dịch lệch nhau:** trích 23/11/2026, dịch + kiểm chứng 24/11/2026; trường `nguon` trong file dịch ghi thống nhất "lấy ngày 24/11/2026".

## Kiểm chứng đầu ra

- File `wiki-hoc/ung-cu-quy-nhon-vi.json`: JSON hợp lệ, 102 mục, 0 lỗi schema (mọi mục có đủ `ten`, `tinh = "Gia Lai"`, `gia`, `gio`, `ghi_chu`, `nguon`; `loai` chỉ là `mon_an`/`cho_o` hoặc bỏ trống).
- Tên chuẩn hóa không trùng nhau trong file (102 tên duy nhất).
- Đối chiếu cuối với `kho-kien-thuc.json` (1.971 mục, chuẩn hóa đ→d trước NFD, substring hai chiều): 0 trùng thật còn sót (3 báo động giả đã kiểm tay, xem khó khăn #8).
- `kho-kien-thuc.json` không bị sửa (chỉ làm file dịch riêng).
