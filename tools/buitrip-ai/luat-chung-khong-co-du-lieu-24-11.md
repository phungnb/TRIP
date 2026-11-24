# Luật chung "không khớp thì nói không có dữ liệu" — 24/11/2026

## Lệnh của anh (08:04 24/11, sau khi chê đắp riêng 1 câu QL51)

> "Làm luật chung cho mọi câu đi"

QL51 là 1 câu bất kỳ trong vô vàn câu. Đắp 9 mục QL51 chỉ sửa được đúng câu
QL51. Luật chung ở đây: **câu hỏi nhắc đích danh 1 thứ mà không có mục nào
khớp thì nói thẳng không có dữ liệu — cho MỌI câu, ở CẢ HAI trợ lý.** Mở rộng
kho thì để vòng học wiki lo theo hệ thống (VPS đang chạy + 1.189 mục ứng cử
chờ dịch), không đắp từng câu nữa. Dữ liệu QL51 đã kiểm chứng thì giữ nguyên
trong PR #50.

## Bằng chứng lỗ hổng (đo trước khi sửa, bằng Node trên bản sao app)

7 câu bịa đặt + tên tỉnh thật, trợ lý cũ đều trả trang tỉnh (kind `prov`/`area`)
dù `findItem` = null — tức kho không có mục đó:
"vé tham quan chùa An Lạc ở Gia Lai", "thác Nước Trong ở Gia Lai",
"điểm tham quan ở huyện Ia Pa Gia Lai", "khách sạn Mặt Trời Đỏ ở Đà Lạt",
"chùa Phước Quang ở Quy Nhơn", "đi chơi ở thôn An Quang, Gia Lai",
"vé vào cổng khu du lịch Suối Vàng ở Lâm Đồng".
Câu hoàn toàn lạ không nêu tỉnh ("Quốc lộ 14 có điểm tham quan nào") thì
trợ lý cũ đã trả fallback thật — lỗ chỉ mở khi câu hỏi nêu 1 tỉnh có thật.

## Sửa — engine mới (Python + JS giống hệt nhau)

### 1. Luật chặn mở rộng sang 9 ý định (`learner.py` / `js-port/learner.js`)
Thêm `lich_trinh`, `so_sanh`, `chi_phi` vào 6 ý định cũ. `chi_phi` miễn khi
câu hỏi nêu tỉnh (bảng chi phí cấp tỉnh là dữ liệu thật, 34 tỉnh đều có).
Nhánh `an`/`o`/`chi_phi`: không neo được tỉnh → danh sách rỗng; có tỉnh thì
CHỈ lấy đúng danh sách theo tỉnh (không lấy top chung chung rồi ghi nhầm tên
tỉnh khác), và nếu câu hỏi nêu 1 món/quán/khách sạn cụ thể mà danh sách tỉnh
không có mục nào khớp tên → danh sách rỗng (chặn "khách sạn Mặt Trời Đỏ ở
Đà Lạt", "điểm tham quan ở huyện Ia Pa").

### 2. Khớp tên chặt lại (`_matches_specific` / `matchesSpecific`)
- Mục tổng quan tỉnh/thành phố KHÔNG tính là khớp (vd "Gia Lai (tổng quan)"
  không khớp "chùa An Lạc").
- Thêm khớp cụm 2 chữ: cụm liên tiếp của tên mục xuất hiện trong câu hỏi
  (vd "yên tử" trong "Khu di tích Yên Tử", "tràng an" trong "Quần thể
  Tràng An") — nhưng cụm chỉ tính khi chung ≥1 token với token cụ thể
  (không thì "quốc lộ" trong "Quốc lộ 14" khớp nhầm "Quốc lộ 51", cụm tên
  tỉnh "đà lạt" trong "Hotel Dalat" khớp nhầm "khách sạn Mặt Trời Đỏ").
- Chia sẻ token: luôn cần ≥2 token chung VÀ chiếm HƠN nửa token nội dung
  của tên (tránh "Chùa Thái Lạc" khớp "chùa An Lạc" nhờ 1 chữ "Lạc",
  "Thác Bản Ba" khớp "Bà bán mấy giờ" nhờ 1 chữ "Ba", "Đảo Hòn Tằm" khớp
  "Tam Đảo" nhờ 1 chữ "tam" — Tằm ≠ Đảo).
- **Mục khớp phải ĐÚNG TỈNH với nơi hỏi nêu** (cùng tên ở tỉnh khác là 1 nơi
  khác): "Suối Vàng ở Lâm Đồng" không được khớp "Thác Tình Yêu (Suối Vàng)"
  ở Lào Cai — mục đúng là "Hồ Suối Vàng" ở Lâm Đồng. Luật này cũng áp cho
  luật đưa mục khớp lên đầu (promotion).

### 3. Mùa là thuộc tính của vùng, không phải của 1 mục tên riêng
- Luật đưa mùa (promotion): chỉ đưa lên mục KHỚP TÊN (nhắc đích danh/cụm
  2 chữ) HOẶC CÙNG TỈNH với nơi hỏi, hoặc câu hỏi không nêu nơi nào. Không
  đưa mục khác tỉnh chỉ vì nó có dữ liệu mùa ("Đảo Hòn Tằm" cho "Tam Đảo",
  "Hoàng thành Thăng Long" cho "Hạ Long").
- Tìm sâu tới top 30 (không phải top 10): khách sạn hay xếp trên mục địa
  danh có mùa — Vịnh Hạ Long hạng 25, Buôn Akõ Dhông hạng 26, VinWonders
  Nha Trang hạng 26. Ba câu này sửa đúng luôn trong đợt này (xem đo).
- Luật chặn: câu hỏi mùa nêu 1 nơi thì mục nào trong tỉnh đó CÓ dữ liệu mùa
  cũng tính là khớp (vd "Mộc Châu mùa hoa mận" → "Happy Land Mộc Châu",
  mùa của nó chính là mùa hoa mận dù tên không chứa "hoa mận"). Nhưng mục
  có mùa ở tỉnh KHÁC không được cứu câu hỏi không nêu nơi ("Tam Đảo" không
  có mục nào — "Đảo Hòn Tằm" có mùa cũng không được tính).

### 4. Tuyến tới tỉnh cũng tính cho thành phố trong tỉnh đó
"đi Sa Pa bằng gì": bảng tuyến chỉ có tuyến tới "Lào Cai", trong cách đi có
nhắc Sa Pa. Trước đây trả chú thích của 1 resort thay vì tuyến. Nay: luật
chặn, vòng lấy thực thể và composer đều tính tuyến tỉnh cho thành phố
("Đi Sa Pa (theo tuyến tới Lào Cai): Máy bay SGN–HAN + xe khách Hà Nội–Sa
Pa…"). Áp dụng cho cả `name_in_q` ở các chỗ gọi bảng EXTRA (tên viết liền
"sapa" trước đây không khớp "Sa Pa").

### 5. Từ đệm trong `QUESTION_WORDS` (`normalize.py` / `js-port/normalize.js`)
Thêm: "e", "mh", "a", "vs", "dc", "it", "nhung", "ad", "nam", "hien",
"phai", "kinh", "nghiem", "review", "z", "khu", "lao", "hon". Nhờ đó
"e xin ít đc ăn ngon ở qn", "Chị An e xin địa chỉ những món ăn ngon ở Huế",
"cho mh hỏi côn đảo nằm ở đâu vậy", "Quy Nhơn nên ở khu nào" không bị chặn
nhầm. CỐ TÌNH KHÔNG thêm "ba"/"tam"/"xem"/"gui"/"c" (mở chặn cho mảnh bình
luận không rõ chỗ) và GỠ "ga"/"tau"/"bay" ("vé máy bay Quy Nhơn bao nhiêu"
bị trả giá quán Jollibee vì "bay" thành từ chung; còn "Quy Nhơn có ga tàu/
sân bay không" đã được bảng tuyến EXTRA cứu).

### 6. Sửa lỗi nhận diện tỉnh `_province_of` / `provinceOf`
Khớp theo RANH GIỚI TỪ, tên dài khớp trước. Trước đây khớp chuỗi con trần:
`prov_key` rút "Thanh Hóa" còn "hoa", mà "hoa" là chuỗi con của "khoai" —
"Hòn Khoai ở đâu" bị nhận nhầm tỉnh Thanh Hóa, rồi luật tỉnh chặn mất đáp án
đúng. Cùng lỗi: "Vinh" là 1 từ trong "Vĩnh Long" nên tên dài "Vĩnh Long"
phải thắng tên ngắn "Vinh".

### 7. Luật đưa mục khớp lên đầu dùng `_matches_specific`, không chỉ tên đầy đủ
"Hòn Khoai ở đâu": mục đầu "Hòn Khô" chỉ khớp nhờ tiền tố "hon kho" của
"hon khoai", còn "Đảo Hòn Khoai" khớp cụm "hon khoai" nên được đưa lên.

## Sửa — engine cũ (`app/ai/index.js`, 1 chỗ duy nhất)
`A.ask`: sau khi hỏi trợ lý mới (không đạt) và `askCu`, thêm kiểm tra sau
(post-check): nếu `askCu` trả trang khu/tỉnh/đảo mà câu hỏi KHÔNG phải câu hỏi
chung về khu đó (rest không rỗng, không phải tên địa danh, có số hoặc ≥2 từ,
`findItem(rest)` null hoặc yếu <70) → trả `A.fallback` thật ("App chưa có
thông tin này. Chưa có: mục … trong dữ liệu app") thay vì trang tỉnh. Kiểm
chứng: 7/7 câu lỗ hổng về fallback (riêng Suối Vàng nay trợ lý mới trả đúng
"Hồ Suối Vàng" Lâm Đồng nên không rơi xuống đây nữa). Câu khu vực chung
("Phú Quốc có gì chơi") vẫn về trang cũ nhờ ngoại lệ `genericArea`.

## Đo (so với mốc Task 29: held-out 98,1%, 24 câu thật 24/24, 17 câu 17/17,
## phủ 175 = 102, live-120 cổng 73/120, qua A.ask 120/120)
- HELD-OUT: **1.164/1.186 = 98,1%** (không đổi — không đụng `tokens()` nên
  không cần retrain; `kb.json`/`ai-model.json` không đổi).
- 24 câu thật: **intent 24/24, entity 24/24** (không đổi).
- Bộ 17 câu gộp 350: **17/17** (không đổi).
- Phủ 175 câu thật: **102 → 80**. GIẢM CÓ CHỦ Ý. Đọc tay toàn bộ câu bị
  chặn mới: đều là mảnh bình luận không rõ chỗ, câu hỏi ý kiến/lời khuyên,
  ý định phân loại sai (vd "Đảo nào ở Quảng Ninh đẹp để tắm biển?" bị xếp
  nhầm ý định ở), hoặc câu hỏi nêu thứ kho không có — trợ lý cũ nhận lại
  và trả đúng hơn (lịch trình thật, trang khu vực thật). 3 câu mùa sửa đúng
  trong đợt này: Hạ Long → Vịnh Hạ Long, Buôn Ma Thuột → Buôn Akõ Dhông,
  Nha Trang → VinWonders Nha Trang.
- JS khớp Python: **"KHỚP BẢN PYTHON (24/24 intent, 24/24 entity, 80/175
  phủ)"** (`kiem-tra-ai.js`).
- Live-120 cổng (trợ lý mới đứng riêng): **73 → 70**. +4 câu nay được tính
  đạt: 3 câu mùa sửa đúng (Hạ Long, Buôn Ma Thuột, Nha Trang) + "Quy Nhơn
  nên ở khu nào" (nhờ "khu" thành từ chung nên danh sách chỗ ở Quy Nhơn
  hiện ra thay vì câu "chưa có danh sách"). −7 đáp án SAI trước đây nay bị
  chặn: Tam Đảo (trả mùa Hòn Tằm), vé máy bay Quy Nhơn (trả giá Jollibee),
  Cù Lao Xanh (trả Cù lao Mây), Phan Thiết mùa (trả mùa tỉnh khác), Bình Ba
  (kho không có mục), Hầm Hô (kho không có mục — trước đây trả món
  "Bắp hầm"), Đền Hùng (mục đúng xếp dưới top 3, trước đây trả Bảo tàng
  Hùng Vương). Trong 70 câu được tính, không còn đáp án sai nào đã biết.
- Qua A.ask (cả hai trợ lý, Node): **120/120** (không đổi).
- Kiểm định tuyến: **12/12** (không đổi — QL51 đứng riêng + sau câu Phú Thọ,
  Cà phê Tùng, Bánh Khoái Hạnh, Phú Quốc/Quy Nhơn/Cát Bà vẫn trang cũ).
- 18 câu "đi X tháng mấy đẹp" qua A.ask: Hạ Long/Buôn Ma Thuột/Nha Trang/
  Sapa/Mộc Châu về trợ lý mới đúng mùa; Phú Quốc/Quy Nhơn/Huế/Hội An/
  Đà Nẵng/Cần Thơ/Côn Đảo/Hà Giang/Ninh Bình/Quảng Bình/Cát Bà/Lý Sơn về
  trang cũ đúng mùa; Tam Đảo về mục cũ đúng mùa (Tam Đảo Phú Thọ, tháng
  4–9); Phan Thiết về trang khu vực đúng mùa.

## Giới hạn còn lại (đã biết, không giấu)
- "Hòn Dấu ở đâu" trả "Hòn Dầu" (An Giang) thay vì Hòn Dấu (Hải Phòng):
  dấu/dầu thành "dau" sau khi bỏ dấu nên 2 đảo giống hệt nhau với máy.
  Cần khớp có dấu — chưa làm (đụng lõi truy hồi + retrain).
- "Giá vé cáp treo Yên Tử": kho có giá 280k khứ hồi 2 chặng nhưng bản kiểm
  chứng Task 7 (Tùng Lâm 11/2026) ghi 350k — mâu thuẫn giá, chưa đưa vào
  danh sách xung đột chờ duyệt. Hiện trợ lý mới chặn (mục đúng xếp dưới
  top 3), trợ lý cũ trả từ dữ liệu app.
- "Tháng 10 ĐLat có mưa nhiều ko": "ĐLat" chưa nhận ra là Đà Lạt (cần sửa
  `tokens()` + retrain — để đợt sau).
- "Sapa tháng 1 có tuyết không": phân loại sai thành `diem_choi` (đáng ra
  `mua_dep`) nên bị chặn; trợ lý cũ trả. Dữ liệu tuyết có trong kho
  ("tháng 12–2 săn mây, có thể có tuyết") nhưng ý định sai nên không tới
  được.
- "Phan Thiết tháng mấy đẹp": trợ lý mới chặn (không có mục Lâm Đồng nào
  có mùa trong top 30); trợ lý cũ trả từ trang khu vực. Kho thiếu mục
  Phan Thiết/Mũi Né có mùa — để vòng học wiki bổ sung.
- "Yên Tử ở đâu?": ý định `o`, conf 0.885 (< 0.9) nên trợ lý mới nhường;
  trợ lý cũ trả đúng. Lỗi xếp hạng truy hồi, chưa sửa.

## File đổi trong PR #50 (nhánh `buitrip-ai-sua-ql51-24-11`)
`tools/buitrip-ai/normalize.py`, `learner.py`, `composer.py`,
`tools/buitrip-ai/js-port/normalize.js`, `learner.js`, `composer.js`,
`kiem-tra-ai.js`, `buitrip-ai-bundle.js`, `app/ai/buitrip-ai-bundle.js`,
`app/ai/index.js`, + báo cáo này
(`tools/buitrip-ai/luat-chung-khong-co-du-lieu-24-11.md`).
KHÔNG đổi `kb.json`/`ai-model.json` (không retrain, không thêm mục mới).
