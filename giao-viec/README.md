# Giao việc bổ sung dữ liệu: Muse và Gemini

Cập nhật 20/11/2026. App đang có 739 địa danh (464 điểm gốc + 275 điểm nhập từ Hộ chiếu khám phá RaceHub). Chỉ tiêu 1.334 địa danh theo 63 tỉnh cũ, còn thiếu 626.

Đây là app du lịch: mọi thông tin là **tham khảo**, chấp nhận sai lệch nhỏ (app đã ghi rõ ở từng địa danh, món ăn, chỗ ở). Nhưng **không được bịa**: không tìm được thì để `null`.

## Phân vai

| Ai | Mảng việc | File nhiệm vụ | Nộp vào |
| --- | --- | --- | --- |
| **Gemini** (Deep Research) | G1. Tìm ứng viên địa danh mới cho từng tỉnh cũ (626 điểm)<br>G2. Đầu mối đi lại của 63 tỉnh cũ (sân bay, ga, bến xe, cảng tàu)<br>G3. Ứng viên món đặc sản, quán và chỗ ở theo tỉnh cũ | [`gemini.md`](gemini.md) | `giao-viec/ket-qua-gemini/dot-<n>/` (anh Phụng tải lên) |
| **Muse** | M1. Làm giàu 275 điểm RaceHub (địa chỉ, giá vé, giờ mở cửa, tọa độ còn thiếu)<br>M2. Kiểm chứng bảng ứng viên của Gemini, chọn đủ chỉ tiêu, điền đủ trường, xuất JSON | [`muse.md`](muse.md) | `du-lieu-bo-sung/` (nhánh mới + PR) |
| **Claude** | Nghiệm thu bằng script, nhập vào app, cập nhật thẻ "Đi từ…", mở PR và gộp | — | — |
| **Anh Phụng** | Dán câu lệnh, chuyển kết quả Gemini sang Muse, kiểm ngẫu nhiên 10% mỗi đợt | — | — |

Gemini không ghi nội dung cuối vào app; Gemini quét rộng và đưa link nguồn. Muse không tự đào danh sách từ đầu; Muse kiểm, chọn và viết. Hai bên làm song song được: Muse làm M1 trong lúc Gemini làm G1–G3.

## Thứ tự làm

1. **Muse M1 đợt 1** (37 điểm RaceHub, file `racehub-lam-giau/dot-1.csv`). Làm trước vì 275 điểm này đang hiện trong app với dòng "Chưa có dữ liệu giá vé".
2. **Gemini G2** cho cả 63 tỉnh cũ một lần (đầu mối đi lại ít thay đổi, cần sớm để tính km "Đi từ…").
3. **Gemini G1 + G3 đợt 1**, rồi **Muse M2 đợt 1**.
4. Claude nghiệm thu, nhập app. Đạt thì sang đợt 2. Nếu đợt 1 có trên 10% điểm sai khi anh kiểm tay thì dừng, giảm chỉ tiêu, sửa câu lệnh.

## 8 đợt

| Đợt | Vùng | Địa danh cần thêm (G1, M2) | Điểm RaceHub cần làm giàu (M1) |
| --- | --- | --- | --- |
| 1 | Trung Bộ, Tây Nguyên | 100 | 37 |
| 2 | Nam Trung Bộ, Lâm Đồng | 67 | 32 |
| 3 | Bắc Trung Bộ | 55 | 19 |
| 4 | Tây Bắc, Việt Bắc | 79 | 22 |
| 5 | Đông Nam Bộ | 48 | 77 |
| 6 | Đồng bằng sông Cửu Long | 117 | 36 |
| 7 | Đồng bằng sông Hồng, Quảng Ninh | 78 | 36 |
| 8 | Trung du phía Bắc | 82 | 16 |
| | **Tổng** | **626** | **275** |

Chỉ tiêu chi tiết từng tỉnh cũ: [`chi-tieu-63-tinh-cu.csv`](chi-tieu-63-tinh-cu.csv). Cột `gemini_xong`, `muse_xong`, `da_nhap_app` để đánh dấu tiến độ (ghi ngày).

## Thư mục

```
giao-viec/
  README.md                 file này
  gemini.md                 nhiệm vụ + câu lệnh cho Gemini
  muse.md                   nhiệm vụ + câu lệnh cho Muse
  chi-tieu-63-tinh-cu.csv   chỉ tiêu và tiến độ
  racehub-lam-giau/         275 điểm RaceHub chia theo đợt (đầu vào M1)
  mau/                      mẫu JSON Muse phải nộp
  ket-qua-gemini/           kết quả Gemini (anh tải lên)
du-lieu-bo-sung/            Muse nộp JSON ở đây
```

## Quy tắc nguồn (cả hai bên)

- Trường thường (giờ mở cửa, khoảng giá, mùa đẹp, giờ đẹp, các trường bổ sung): 1 nguồn có ngày xem là đủ.
- Địa danh mới: ít nhất 2 nguồn độc lập để chắc nó có thật.
- Xếp hạng di tích, giá vé, đầu mối đi lại: 2 nguồn, trong đó 1 nguồn chính thức (cổng du lịch tỉnh, Sở VHTTDL, Cục Di sản văn hóa, ACV, Đường sắt Việt Nam, ban quản lý khu du lịch) hoặc báo/cẩm nang lớn.
- Hội nhóm Facebook, TikTok chỉ để phát hiện điểm, không là nguồn duy nhất.
- Giá ghi khoảng, bằng đồng, kèm ngày xem. Không ghi tên, ảnh, số điện thoại người viết review. Không chép review quá 1 câu.
- Ảnh chỉ lấy ảnh giấy phép mở (Wikimedia Commons CC BY / CC BY-SA), ghi tác giả và giấy phép.
