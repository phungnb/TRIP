# Sửa lỗi Quốc lộ 51 + hỏi trợ lý mới trước — 24/11/2026

## Lỗi gốc (anh báo 03:50 24/11, có ảnh chụp)

Hỏi live **"Quốc lộ 51 có điểm tham quan nào"** → trợ lý trả **"Ăn gì ở Phú Thọ"**
(danh sách 5 món: Thịt chua Thanh Sơn, Cơm nắm lá cọ, Trám om cá, Cọ ỏm, Canh rau sắn).

## Chẩn đoán (đã xác minh bằng code + chạy thật, không đoán)

**Một lỗi, hai đường:**
1. **Engine cũ:** `askCu` trong `app/ai/index.js` — `route()` trả null cho QL51
   (không có đảo/khu/tỉnh/mục nào tên đó), rồi nhánh ngữ cảnh
   `if (!res && useCtx && (A.followCue(q) || I.intent || I.want.length))`
   nổ vì `I.intent = "didau"` ("tham quan" khớp regex ý định) — nó lấy ngữ cảnh
   phiên (câu trước hỏi Phú Thọ) rồi gọi `route(q, I, "", E)` → `answerProv(Phú Thọ)`.
   `followCue` tự nó là FALSE cho câu này — lỗi ở chỗ điều kiện ngữ cảnh còn
   chấp nhận bất kỳ intent/want nào.
2. **Engine mới:** cùng câu, chạy đơn lẻ (Python + JS giống hệt): intent `diem_choi`,
   **conf 1.0, score 0.591, entity "Cọ ỏm" (Phú Thọ)**. Nguyên nhân: token chung
   "có"/"cọ" tạo khớp giả; cổng conf≥0.9 + score≥0.3 cho qua; kho KHÔNG có mục
   Quốc lộ 51 nào. Lỗi gốc là một: **trả lời tự tin khi không có mục nào khớp
   với thứ được hỏi.**

## 5 sửa (Python + JS giống hệt nhau, trừ index.js chỉ có bản JS)

### 1. Luật chặn khớp giả — engine mới (`learner.py` / `js-port/learner.js`)
- `normalize.py`: thêm tập `QUESTION_WORDS` (từ hỏi/chức năng + từ theo ý định +
  loại địa danh + tính từ + từ xưng hô/nhờ vả + giới từ hướng/thời gian).
  Bổ sung sau đo: "dau/luc/thoi/nua/khong/ko/duoc", "du/het/nen/nhu/cung/ca/tat/
  em/anh/ban/minh/ta/bac/cac/nguoi/xin/hoi/nho/giup/van/tour/combo/lai",
  "vao/ra/len/xuong/qua" ("vao" bị sót làm câu Sapa mùa đẹp bị chặn nhầm).
- `_place_tokens`: token tên tỉnh/thành + **dạng viết liền** ("sapa", "phuquoc",
  "quynhon") vì câu thật hay viết liền tên 2 chữ.
- `_specific_tokens(q)`: token còn lại sau khi bỏ từ hỏi + tên tỉnh/thành.
- **Luật chặn** (trong `ask()`, sau luật ưu tiên địa danh, trước `compose`):
  áp cho 6 ý định trả lời về 1 mục/tuyến cụ thể
  (`gia_ve`, `gio_mo_cua`, `vi_tri`, `diem_choi`, `cach_di`, `mua_dep`).
  Nếu không phải câu tiếp nối, có token cụ thể, và top mục không có mục nào
  được nêu tên hoặc chung ≥1/≥2 token cụ thể → trả `confidence: 0.0`,
  `no_data: true` (cổng app loại → trợ lý cũ nhận).
  Ngoại lệ: `cach_di` (điểm đến trong bảng `tuyen_di` — Sơn Đoòng chỉ có trong
  bảng tuyến, chưa có trong kho), `mua_dep` (vùng trong bảng `mua_dep_vung_cu`,
  hoặc câu hỏi nhắc 1 tỉnh/thành cụ thể).
  Riêng `mua_dep`: nếu top 3 không mục nào có dữ liệu mùa → cũng chặn (đừng trả
  câu "chưa có mùa của khách sạn X" rồi chặn trợ lý cũ trả mùa đúng của cả vùng).
- Nhánh `an`/`o`/`chi_phi`: nếu không nhận ra tỉnh mà câu hỏi có token cụ thể
  (vd "ăn gì ở Quốc lộ 51") → trả danh sách rỗng (câu "chưa có danh sách… cho
  nơi này") thay vì liệt kê món bừa.

### 2. Bonus tên trong ngoặc — `retriever.py` / `js-port/retriever.js`
Tên trong ngoặc đơn (bí danh) trước đây không được tính điểm tên: "Hồ Gươm ở đâu"
ra Hồ Dầu Tiếng, "Cầu Vàng giá bao nhiêu" ra Cầu Rồng. Nay bí danh được hưởng
cùng bonus tên (+2.0 khớp chuỗi / +2.5 khớp đủ token). Sau sửa: Hồ Gươm →
"Hồ Hoàn Kiếm (Hồ Gươm) + Đền Ngọc Sơn" (score 4.948); Cầu Vàng →
"Sun World Bà Nà Hills (Cầu Vàng)" (conf 0.998, score 4.94).

### 3. Tách tên viết liền — `normalize.py` / `js-port/normalize.js` (`tokens()`)
"Hồ Gươm" đã sửa nhưng "Sapa" vẫn là 1 token, không khớp "Sa Pa" trong kho
(câu "Du lịch Sapa mùa nào đẹp nhất?" ra "Làng du lịch Mỹ Khánh" Cần Thơ!).
`tokens()` nay tách token đúng bằng dạng viết liền của 1 tên tỉnh/thành có thật
(`JOINED_PLACE`: "sapa"→"sa"+"pa", "phuquoc"→"phu"+"quoc", …; chỉ tách khi
đúng tên, không tách "la"/"an"/"du" đứng riêng). Phải retrain sau đổi này
(đã retrain: 5.928 dòng, ritual đủ 176 câu thật + 14 boosts Lăng Bác).
`_province_of` cũng so cả dạng viết liền (trước đây "Sapa" không nhận ra tỉnh).

### 4. Mùa đẹp lấy theo điểm có dữ liệu — `learner.py` / `js-port/learner.js`
Câu mùa ("Sapa tháng mấy đẹp?") hay ra khách sạn đầu bảng (không có dữ liệu mùa)
trong khi điểm có mùa nằm sâu hơn ("Chợ đêm Sa Pa" hạng 5, "Happy Land Mộc Châu"
hạng 7). Nay: với `mua_dep`, nếu mục đầu không có `mua_dep` thì tìm sâu top 10,
đưa mục địa danh đầu tiên CÓ dữ liệu mùa lên đầu (vùng trong bảng EXTRA thì
không cần). Sau sửa: Sapa → "Tháng 9–10 lúa chín…; tháng 12–2 săn mây, có thể
có tuyết; tháng 3–5 hoa đỗ quyên"; Mộc Châu → "Tháng 1–2 hoa đào, hoa mận…".

### 5. Sửa "X ở đâu" bị nhầm sang "ăn" — `learner.py` / `js-port/learner.js`
Sau retrain, "massage người khiếm thị ở Huế" bị NB xếp `an` (conf 0.588) →
ra "Ốc Huế" thay vì Massage Niềm Tin (bộ 17 câu tụt 17→16). Luật sửa "X ở đâu"
(Fix A) nay áp cả cho intent `an` khi câu hỏi KHÔNG hỏi món thật (không có
"ăn gì"/"món"/"ngon"). Sau sửa: 17/17 trở lại.

### 6. Chặn ngữ cảnh cũ + hỏi trợ lý mới trước — `app/ai/index.js` (Fix 4 + Fix 5)
- **Fix 4** (`unknownSpecific` trong `askCu`): bỏ qua ngữ cảnh khi `rest`
  không rỗng, không phải câu tiếp nối, và `rest` không khớp mục nào trong dữ
  liệu (`findItem` null hoặc yếu s < 70), và `rest` có số hoặc ≥2 từ
  (vd "quốc lộ 51"). Câu tiếp nối thật ("giá vé bao nhiêu" → rest rỗng;
  "thế còn chỗ ở" → followCue đúng) không bị ảnh hưởng.
- **Fix 5** (`A.ask`): hỏi trợ lý mới TRƯỚC; nếu conf ≥ 0.9 và score ≥ 0.3
  và không `no_data` thì dùng đáp án mới (kèm nút "Mở cẩm nang" + dòng góp ý);
  nếu không thì dùng trợ lý cũ như trước.
  **Ngoại lệ (CI 23/11/2026 vẫn đúng):** câu chung về 1 khu/đảo/tỉnh thì KHÔNG
  hỏi mới trước — engine mới chỉ trả 1 mục lẻ trong khi engine cũ trả trang
  khu/đảo đầy đủ. Kiểm lại 24/11: "Phú Quốc có gì chơi" → "Phú Quốc Explorer",
  "Quy Nhơn có gì chơi" → "Jollibee Quy Nhơn", "Cát Bà có gì chơi" →
  "Cát Bà Wonder Hotel". Nhận biết câu chung: `A.rest(q)` (phần còn lại sau khi
  bỏ từ hỏi) chỉ còn đúng tên khu/đảo/tỉnh (`entOf`).

## Dữ liệu Quốc lộ 51 mới (9 mục — `quoc-lo-51.json`, `quoc-lo-51-diem-tham-quan.md`)
Tuyến **65 km** (QĐ 1454/QĐ-TTg 01/09/2021; nguồn cũ nói 85,6/86 km tới TP Vũng Tàu),
Ngã tư Vũng Tàu (giao QL1, Long Hưng, Đồng Nai) → Vòng xoay Bà Rịa; sau sáp nhập
01/07/2025: Đồng Nai 37 km + TP.HCM 28 km; TP.HCM–Vũng Tàu 95–110 km, 2–2,5 giờ.
8 điểm dọc tuyến đã kiểm (giờ mâu thuẫn ghi "chưa kiểm được", không bịa):
Thiền viện Thường Chiếu, Chùa Phước Hải (Chùa Bún Riêu), Trạm dừng chân Bánh Việt 70
(Đồng Nai); Chùa Đại Tòng Lâm, Ni viện Thiện Hòa (Chùa Bánh Xèo), Núi Thị Vải,
Núi Dinh, Hồ Đá Xanh (TP.HCM — **nước sâu tới 50 m, tuyệt đối không bơi**).
Loại đúng: Bò Cạp Vàng, Vườn Xoài, Địa đạo Long Phước, Làng bè Long Sơn,
Chùa Bửu Phong, các điểm trong TP Vũng Tàu (QL51 kết thúc ở Vòng xoay Bà Rịa).
Kho: **2.319 → 2.328 mục** (backup `kho-kien-thuc-truoc-gop-ql51.json`).

## Đo lại (kho 2.328, sau retrain + prune)

| Chỉ số | Trước sửa (PR #49) | Sau sửa |
|---|---|---|
| Held-out intent | 97,2% (1.153/1.186) | **98,1% (1.164/1.186)** |
| 24 câu thật (intent/entity) | 24/24 + 24/24 | **24/24 + 24/24** |
| Độ phủ 175 câu thật (mới tự trả, conf≥0.9 + score≥0.3) | 158/175 | **102/175** |
| Bộ 17 câu kiểm chứng gộp | 17/17 | **17/17** |
| Cổng live-120 (mới tự trả, đúng/sai) | 81/120, 81 đúng, 0 sai | **73/120, 73 đúng, 0 sai** |
| Live-120 qua `A.ask` (cả 2 engine, Node) | — | **120/120 đúng** |
| Kiểm định tuyến mới (12 câu, Node) | — | **12/12 đúng** |
| JS khớp Python | khớp | **khớp** (24/24 + 24/24, 102/175) |

**Giải thích trung thực về 2 số tụt:**
- **Độ phủ 175 (158→102):** 56 câu mới không còn "tự trả" — phần lớn là câu
  engine mới trước đây trả tự tin nhưng SAI thực thể (vd "Giá vé cáp treo Yên Tử",
  "Cảng quốc tế Ao Tiên", "đi Mộc Châu gặp sương mù bật đèn pha", "Sapa tháng 1
  có tuyết không", "Nên đi Sapa bằng tàu hay ô tô?") hoặc mảnh bình luận không
  nêu tên mục nào. Nay luật chặn trả chúng về trợ lý cũ (biết thì trả đúng,
  không biết thì báo chưa có). Đây là đánh đổi cố ý: **độ phủ thấp hơn nhưng
  không còn đáp án sai tự tin.** 24 câu bị chặn đã kiểm tay từng câu — đều là
  câu ngoài miền/không có dữ liệu, không có câu nào bị chặn oan vì thiếu từ hỏi.
- **Cổng live-120 (81→73):** 8 câu mới bị chặn, đều là câu engine mới trả sai
  hoặc trả câu "chưa có" cho thực thể sai: "đi Pleiku từ Quy Nhơn mất bao lâu",
  "vé máy bay Quy Nhơn bao nhiêu", "đi Kỳ Co bằng gì" (trước ra "Cọ ỏm"),
  "đi Cù Lao Xanh bằng gì", "vé Sơn Đoòng bao nhiêu", "Mã Pì Lèng" (×2),
  "son doong", và 3 câu mùa ("đi Hạ Long/Buôn Ma Thuột/Nha Trang tháng mấy đẹp"
  — kho có dữ liệu mùa nhưng truy hồi xếp khách sạn lên đầu, ngoài top 10).
  Tất cả đều rơi về trợ lý cũ — và **live-120 qua `A.ask` vẫn 120/120 đúng**,
  tức người dùng không mất đáp án nào. 0 sai qua cổng được giữ nguyên.

**Câu QL51 sau sửa (đã kiểm):** "Quốc lộ 51 có điểm tham quan nào" →
diem_choi conf 1.0, score 6.089, entity "Quốc lộ 51", đáp án liệt kê đúng 8 điểm
(có dấu và không dấu giống hệt); nối tiếp sau câu Phú Thọ vẫn trả đúng (không
còn "Ăn gì ở Phú Thọ"); "Hồ Đá Xanh giá bao nhiêu" → 20.000đ…; "Chùa Đại Tòng
Lâm ở đâu" → Km 80–81 QL51; "ăn gì ở Quốc lộ 51" → câu "chưa có danh sách món
ăn… cho nơi này" (không liệt kê món bừa); "vé Fansipan bao nhiêu" → chặn
(trợ lý cũ trả đúng 800.000–850.000đ); "Yên Tử ở đâu?" không đổi (conf 0.887
< 0.9 → trợ lý cũ, vẫn an toàn).

## Còn tồn (không sửa trong PR này)
- "Yên Tử ở đâu?" vẫn trượt cổng mới (conf 0,887): mục thật "Khu di tích Yên Tử"
  xếp hạng 4 sau "Khách sạn Uông Bí (gần Yên Tử)" — yếu ở xếp hạng truy hồi,
  không phải lỗi logic. Trợ lý cũ trả đúng nên người dùng không thấy sai.
- 1.189 mục wiki mới (tiếng Anh) chờ dịch + kiểm giá; 19 xung đột wiki chờ duyệt.
- 3 câu mùa Hạ Long/Buôn Ma Thuột/Nha Trang: kho có dữ liệu mùa nhưng truy hồi
  xếp khách sạn lên đầu (ngoài top 10) — cần cải thiện xếp hạng truy hồi cho
  `mua_dep` ở vòng sau.
- Lịch học hàng tuần: **đã xóa cả 2** (cron VM + timer VPS) theo lệnh anh 03:52
  24/11 — anh chưa bao giờ ra lệnh chạy hàng tuần. Pipeline nằm trên VPS
  (`/root/buitrip-ai`), chỉ chạy khi anh ra lệnh. Vòng chạy thử 1 lần trên VPS
  (bắt đầu 03:47) lúc kiểm 04:4x vẫn đang ở bước `--update` (lấy wiki 621 mục,
  chậm vì API) — chưa xong, sẽ kiểm chứng riêng khi nó xong; code sửa Task 29
  chưa đồng bộ lên VPS (đợi vòng chạy xong mới đồng bộ, tránh sửa giữa chừng).
- Cách đưa kho mới lên app sau mỗi vòng học (PR GitHub như hiện tại hay VPS
  host file) vẫn chờ anh chọn.
