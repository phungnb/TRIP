# Nhiệm vụ của Muse

Vai: **kiểm chứng, chọn, điền đủ trường, xuất JSON** đúng mẫu và đẩy lên repo. Muse không tự đào danh sách địa danh mới từ đầu; danh sách ứng viên do Gemini lập (xem [`gemini.md`](gemini.md)).

Nộp bài: mỗi lần 1 file JSON vào thư mục `du-lieu-bo-sung/`, trên **nhánh mới**, mở **Pull Request** vào `main`. Không sửa trực tiếp `app/` hay `du-lieu-34-tinh/`; Claude nghiệm thu rồi mới nhập vào app.

Thông tin là tham khảo, chấp nhận sai lệch nhỏ, nhưng **không bịa**: không tìm được thì để `null`, giá chưa kiểm được thì ghi `"chưa kiểm được"`.

---

## M1. Làm giàu 275 điểm RaceHub (làm trước)

Đầu vào: `giao-viec/racehub-lam-giau/dot-<n>.csv` (cột `ma, tinh_moi, tinh_cu, ten, lat, lng, thieu`). Mỗi lần khoảng 30 dòng; đợt 5 có 77 dòng thì chia 3 lần.

Mẫu nộp: [`mau/lam-giau-racehub.json`](mau/lam-giau-racehub.json). Tên file: `du-lieu-bo-sung/lam-giau-racehub__dot-<n>[-phan-<k>].json`.

Câu lệnh (dán nguyên văn, đổi phần trong `< >`):

```text
Đọc file giao-viec/racehub-lam-giau/dot-<1>.csv trong repo phungnb/TRIP (đọc trước giao-viec/README.md và giao-viec/muse.md).
Đây là địa danh đã có trong app du lịch, chỉ thiếu thông tin thực tế. Thông tin dùng để tham khảo, chấp nhận sai lệch nhỏ, nhưng không được bịa.
Với từng dòng, giữ nguyên cột ma và điền:
1. dia_chi: xã/phường mới sau 01/07/2025, kèm tên cũ trong ngoặc.
2. lat, lng nếu cột đang trống (Google Maps, 5 số lẻ).
3. loai, gia_ve (khoảng giá, bằng đồng, kèm ngày xem), gio_mo_cua, thoi_gian (nên dành bao lâu), mua_dep, cach_di.
4. Nếu tìm được: gio_dep, phi_gui_xe, hop_tre_em, hop_nguoi_gia, xe_lan, trang_phuc, dat_truoc_giay_phep, le_hoi, canh_bao_an_toan, wc_an_uong_tai_cho, anh (chỉ ảnh giấy phép mở trên Wikimedia Commons, kèm tác giả và giấy phép).
5. nguon: ít nhất 1 link cho mỗi dòng; giá vé và xếp hạng di tích cần 2 link.
Không tìm được thì để null, không đoán. Không viết lại phần câu chuyện (app đã có).
Điểm sai tên, đã đóng cửa hoặc không tồn tại thì đưa vào mảng sai_ten_hoac_dong kèm lý do và link.
Xuất đúng mẫu giao-viec/mau/lam-giau-racehub.json, tên file du-lieu-bo-sung/lam-giau-racehub__dot-<1>.json. Đẩy lên nhánh mới và mở PR vào main.
```

## M2. Kiểm chứng ứng viên của Gemini (mỗi lần 1 tỉnh cũ)

Đầu vào: file kết quả Gemini `giao-viec/ket-qua-gemini/dot-<n>/<tinh-moi>__<tinh-cu>.md` và `dau-moi__dot-<n>.md`, cùng danh sách điểm đã có `du-lieu-34-tinh/<tinh-moi>.json` và `app/data/racehub-places.js`.

Mẫu nộp: [`mau/tinh-cu.json`](mau/tinh-cu.json). Tên file: `du-lieu-bo-sung/<tinh-moi>__<tinh-cu>.json`.

```text
Đọc giao-viec/README.md, giao-viec/muse.md và bảng ứng viên Gemini lập cho <Bình Định cũ> (nay thuộc <Gia Lai>): giao-viec/ket-qua-gemini/dot-<1>/<gia-lai__binh-dinh>.md, cùng giao-viec/ket-qua-gemini/dot-<1>/dau-moi__dot-<1>.md.
Việc của bạn:
1. Kiểm từng dòng bằng nguồn bạn tự mở được: địa danh mới cần ít nhất 2 nguồn độc lập; giá vé, xếp hạng di tích, đầu mối đi lại cần 2 nguồn trong đó 1 nguồn chính thức; trường thường 1 nguồn có ngày xem. Dòng không kiểm được đưa vào chua_kiem_duoc.
2. Chọn đủ chỉ tiêu trong giao-viec/chi-tieu-63-tinh-cu.csv: <22> địa danh mới, <12> món (mỗi món 2–3 quán), 9 chỗ ở 3 mức giá. Không trùng điểm đã có trong du-lieu-34-tinh/<gia-lai>.json và app/data/racehub-places.js (so tên và tọa độ dưới 200 m).
3. Điền đủ trường theo mẫu giao-viec/mau/tinh-cu.json, gồm cả đầu mối đi lại của tỉnh cũ. Km tính từ đầu mối gần nhất cùng tỉnh cũ, theo đường bộ Google Maps.
4. Giá ghi khoảng, bằng đồng, kèm ngày xem; chưa kiểm được thì ghi "chưa kiểm được".
5. nhan_xet_cua_m tự viết 2–3 câu, có điểm cộng và điểm trừ, không chép review, không ghi tên người review.
6. Điểm cũ trong app thấy sai thì ghi vào sua_diem_cu (id, trường, đang ghi, đúng là, nguồn).
Xuất file du-lieu-bo-sung/<gia-lai__binh-dinh>.json đúng mẫu. Đẩy lên nhánh mới và mở PR vào main.
```

## Claude nghiệm thu thế nào

Mỗi PR của Muse chạy qua script:

1. Đúng mẫu, đủ trường bắt buộc, đúng kiểu dữ liệu.
2. Tọa độ nằm trong ranh giới tỉnh cũ (sai tỉnh là dấu hiệu bịa).
3. Km tới đầu mối không lệch quá 2 lần so với đường chim bay.
4. Không trùng tên hoặc tọa độ dưới 200 m với điểm đã có.
5. Link nguồn mở được.
6. Đủ chỉ tiêu tỉnh cũ đó.

Đạt thì Claude nhập vào app và gộp; không đạt thì trả lại danh sách lỗi trên PR.
