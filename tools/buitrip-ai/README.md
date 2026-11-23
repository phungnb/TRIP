# BuiTrip AI Local — AI du lịch tự học, KHÔNG dùng API (23/11/2026)

Trợ lý du lịch chạy hoàn toàn trên máy, không gọi API nào, không cần key, không cần
mạng. Học từ dữ liệu du lịch đã kiểm chứng, trả lời bằng dữ liệu thật, và **tự học
thêm mỗi khi bị sửa sai**.

## Nó "học" như thế nào (3 tầng)

1. **Học từ dữ liệu huấn luyện:** `data_gen.py` sinh 7.712 câu hỏi từ kho kiến thức
   (621 mục: dữ liệu app + 153 điểm mới soi từ web tour) theo mẫu ý định × thực thể
   × cách diễn đạt. Mô hình Naive Bayes (`naive_bayes.py`) học từ đó để đoán ý định
   của câu hỏi mới — 12 ý định: giá vé, giờ mở cửa, mùa đẹp, cách đi, ăn, ở, điểm
   chơi, lịch trình, chi phí, mang gì, so sánh, tỉnh cũ, chung chung.
2. **Học kiến thức:** kho `kho-kien-thuc.json` + `kien-thuc-bo-sung.json` (bảng tuyến
   đi, mùa theo vùng cũ, cặp tên dễ nhầm, điểm cấm) là thứ AI "biết". Thêm điểm/tuyến/
   mùa vào kho rồi huấn luyện lại là AI biết thêm.
3. **Học từ phản hồi (online learning):** khi trả lời sai, người dùng sửa bằng lệnh
   `sua: <ý định đúng> | <tên điểm đúng>` — câu hỏi + nhãn đúng được thêm vào dữ
   liệu huấn luyện, điểm truy hồi của token→thực thể đúng được cộng thêm, mô hình
   huấn luyện lại ngay và lưu vào `model.json`. Lần sau hỏi lại câu đó sẽ đúng.

## Chạy thử

```bash
cd buitrip-ai-local
python3 train.py            # huấn luyện (sinh dữ liệu + học + lưu model.json)
python3 ask.py "quy nhơn đi bằng gì"
python3 ask.py              # chế độ tương tác, gõ "sua: ..." để sửa sai cho AI học
python3 evaluate.py         # đo độ đúng
```

Yêu cầu: Python 3.10+ , chỉ dùng thư viện chuẩn (không cần numpy/sklearn — TF-IDF
và Naive Bayes viết tay trong `tfidf.py`, `naive_bayes.py` để port sang JS cho app
được dễ dàng).

## Kết quả kiểm chứng (23/11/2026)

- **Phân loại ý định trên tập held-out (20% dữ liệu chưa từng học): 98,9%**
  (1.526/1.543 câu, train 6.169 câu).
- **24 câu hỏi thật** (lấy từ các đợt kiểm live): **ý định đúng 24/24, thực thể
  đúng 22/24.** 2 câu thực thể sai đã biết: "Lăng Bác mấy giờ mở cửa" (nhầm Thác
  Bạc — đã sửa bằng 1 lần phản hồi, xem dưới), "Quy Nhơn khác Gia Lai như thế nào"
  (trả lời so sánh còn nông: kể Pleiku núi vs Tháp Đôi biển, chưa so mùa/chi phí).
- **Demo tự học (chạy thật):**
  - Trước: "Lăng Bác mấy giờ mở cửa" → trả Thác Bạc (Lào Cai), "chưa kiểm được giờ".
  - Sửa 1 lần: `sua: gio_mo_cua | Lăng Chủ tịch Hồ Chí Minh (Lăng Bác)`
  - Sau: trả đúng Lăng Bác — giờ mùa nóng 7:30–10:30, mùa lạnh 8:00–11:00, đóng
    thứ 2/6, trùng tu 4/9–2/11/2026.
- **Câu Quy Nhơn của anh:** "quy nhơn đi bằng gì" → bay Phù Cát (UIH), tàu ga Diêu
  Trì/Quy Nhơn, xe khách 10–12h. "đi Quy Nhơn tháng mấy đẹp" → mùa khô tháng 2–8,
  tránh 9–12 mưa/bão (không còn trả mùa Gia Lai). "vé Núi Bà Đen" → cổng 10k/5k,
  cáp 250k/400–450k/combo 650k (không còn nhầm Núi Bà Rá). "đi Nam Du bằng gì" →
  tàu Rạch Giá, tour 3N2Đ từ 2.490.000đ (không còn trả Đại Nam).
- **Hỏi tiếp trong cùng phiên:** "thế ở đó có gì chơi" sau câu Nam Du thì hiểu "đó"
  là Nam Du. Lưu ý: mỗi lần chạy `ask.py "câu"` là phiên mới, không nhớ câu trước —
  hỏi tiếp chỉ đúng trong chế độ tương tác (`python3 ask.py`).

## Luật trả lời (code thực thi trong `composer.py`, không phải lời hứa)

- Giá/giờ/tên riêng CHỈ lấy từ dữ liệu truy hồi được; không có thì nói không có.
- Cấm thay dữ liệu tỉnh khác cho vùng người dùng hỏi (Quy Nhơn thì trả Quy Nhơn,
  không trả Pleiku; Phú Quốc thì trả Phú Quốc, không trả Châu Đốc).
- Mùa đẹp + tuyến đi lấy theo vùng cũ đã kiểm chứng (`kien-thuc-bo-sung.json`).
- Thiếu dữ liệu → câu dự phòng 3 phần: nói thẳng chưa có + hướng dẫn cách tra khác
  cụ thể + gợi ý 2–3 câu gần nhất app trả lời được.

## Hạn chế (nói thẳng)

- Câu trả lời ghép từ mẫu câu + số liệu thật nên **đúng nhưng khô** — hiểu như AI,
  diễn đạt chưa tự nhiên như mô hình ngôn ngữ. Muốn diễn đạt tự do mà vẫn không
  dùng API thì cần thêm mô hình ngôn ngữ nhỏ chạy local (vd Qwen 0,5B) — việc riêng,
  quyết sau.
- Chưa có bảng món ăn/chỗ ở/chi phí riêng trong kho (kho hiện chỉ có địa danh):
  hỏi "ăn gì/ở đâu ở Quy Nhơn" thì AI nói rõ là chưa có danh sách đã kiểm chứng +
  chỉ sang tab Ăn gì/Ở đâu trong app. Cần bổ sung 332 món + 286 chỗ ở vào kho thì
  mới trả lời được như trợ lý cũ.
- So sánh 2 điểm còn nông (chỉ kể 2 mục cạnh nhau, chưa so mùa/chi phí/cách đi).
- `model.json` 2,0 MB (lưu toàn bộ xác suất theo từ vựng) — đưa vào app cần tỉa bớt
  từ vựng (giữ từ quan trọng theo ý định) hoặc lưu dạng đếm thay vì xác suất đầy đủ.
- Kho app local chỉ có 498 mục, ít hơn 739 app công bố (chênh là mục RaceHub mỏng).
  Đưa vào app thật phải xây kho từ dữ liệu live.

## Cấu trúc file

| File | Việc |
|---|---|
| `normalize.py` | Chuẩn hóa tiếng Việt (đ→d TRƯỚC NFD — luật bắt buộc) |
| `tfidf.py` | TF-IDF + cosine (viết tay, stdlib only) |
| `naive_bayes.py` | Phân loại ý định (viết tay) |
| `data_gen.py` | Sinh dữ liệu huấn luyện từ kho + bảng tỉnh cũ |
| `retriever.py` | Truy hồi mục kiến thức + điểm cộng học từ phản hồi |
| `composer.py` | Ghép câu trả lời + câu dự phòng 3 phần (luật bắt buộc) |
| `learner.py` | Bộ não: train / ask / feedback / save / load |
| `train.py`, `ask.py`, `evaluate.py` | Chạy huấn luyện / hỏi / đánh giá |
| `kho-kien-thuc.json` | Kho 621 mục (app + 153 điểm mới) |
| `kien-thuc-bo-sung.json` | Tuyến đi, mùa vùng cũ, tên dễ nhầm, điểm cấm |
| `train.jsonl` | 7.712 câu huấn luyện đã sinh |
| `model.json` | Mô hình đã huấn luyện (kèm 1 bài học từ phản hồi Lăng Bác) |

## Cập nhật 23/11/2026 (tối) — câu hỏi thật + mở rộng 100.000 câu

Chi tiết trong `ket-qua-cau-hoi-that-va-mo-rong.md`. Tóm tắt:

- Thu thập **216 câu hỏi thật** từ diễn đàn/group công khai (Bắc 67, Trung 77, Nam
  72), lọc còn **175 câu tiếng Việt**. Chỉ dùng tìm kiếm công khai, không đăng nhập,
  không cào hàng loạt. 53 câu miền Trung là tiếng Anh (TripAdvisor) — chưa dùng.
- **Mở rộng lên 99.270 câu huấn luyện: không cải thiện câu trả lời thật** (24 câu
  thật vẫn 24/24 ý định, 22/24 thực thể; held-out 100,0% nhưng phình to vì sinh từ
  cùng mẫu). Kết luận đo được: thiếu mô hình ngôn ngữ + thiếu bảng món/chỗ ở/chi phí,
  không phải thiếu số lượng câu hỏi.
- **Nạp 175 câu thật: độ phủ tăng 63,4% → 90,3%** (158/175). Câu thật dạy cách diễn
  đạt thật: viết tắt "qn", teencode, "nằm ở đâu". Sửa 3 lỗi thật: bảng viết tắt
  (`normalize.py`), ý định mới `vi_tri` (14 ý định), thêm mục Côn Đảo + điểm cộng
  tên điểm đầy đủ (`retriever.py`).
- 17 câu chưa trả lời được (`cau-chua-tra-loi-duoc.json`): đa số là mảnh câu trong
  luồng bình luận, cần ngữ cảnh chat; còn lại là món/chỗ ở/chi phí — kho chưa có.
- Số liệu cuối: huấn luyện 8.552 câu sinh + 175 câu thật; held-out 98,4%; 24 câu
  thật 24/24 ý định, 23/24 thực thể; kho 622 mục.

## Cập nhật 23/11/2026 (tối muộn) — bổ sung dữ liệu lớn

Chi tiết trong `bo-sung-du-lieu-23-11.md`. Tóm tắt:

- Kho tăng **622 → 1.945 mục**: món ăn 626 (308 từ dữ liệu app + 318 tìm Google),
  chỗ ở 663 (249 app + 414 Google), chi phí 34 tỉnh, tuyến đi 206 (13 + 193 app).
  Món/chỗ ở đủ 34/34 tỉnh; giá vé giờ có cho mọi địa danh thật (131 điểm, 79 điểm
  ghi cả 2 phía giá mâu thuẫn).
- Code trả lời ăn/ở/chi phí theo đúng tỉnh người hỏi (bảng 76 thành phố → tỉnh
  mới); sửa lỗi học phản hồi tăng cả token chung ("mấy", "giờ") làm Lăng Bác lấn
  câu khác; sửa lỗi hiệu năng vòng bonus thành phố (đo 175 câu từ >4 phút còn 36s).
- Số đo cuối: held-out 98,0%; **24 câu thật 24/24 ý định, 24/24 thực thể**;
  độ phủ 175 câu thật **93,7%** (164/175).
- Còn thiếu: xếp món/chỗ ở theo khu trong tỉnh (vd món Phú Quốc chưa lên đầu
  danh sách An Giang); giá Google chưa đối chiếu từng trang đặt phòng.

## Pipeline tự học từ wiki (23/11/2026)

- `wiki_learn.py` — lấy bài Wikivoyage VI/EN + Wikipedia VI/EN + Wikidata cho 622
  địa danh qua API công khai (CC BY-SA, ghi nguồn; User-Agent riêng, nghỉ 0,1s,
  4 luồng, gặp 429 thì chờ thử lại). Tên gộp nhiều điểm ("A + B") thì tách từng
  phần; kết quả tìm kiếm chỉ nhận khi chia sẻ ít nhất 2 từ dài (tránh lấy nhầm
  "Quảng Ninh" cho "Quảng trường Ba Đình"). Wikivoyage chỉ tìm ở cấp thành
  phố/tỉnh (không có bài từng điểm nhỏ). Lưu dần sau mỗi 50 điểm nên dừng giữa
  chừng vẫn giữ được; chạy lại với `--update` chỉ lấy trang đổi revision.
- `wiki_merge.py` — gộp tóm tắt TIẾNG VIỆT vào ghi_chu (kèm nguồn), tóm tắt
  tiếng Anh vào trường `mo_ta_en` (chưa dùng để trả lời), tọa độ vào `toa_do`.
  Xung đột tỉnh chỉ tính theo câu đầu tiên của bài (tránh cờ giả do bài nhắc tỉnh
  khác ở đoạn sau) và ghi ra `wiki-hoc/xung-dot-can-duyet.md`, không tự sửa kho.
- Chạy lại mỗi tuần bằng cron (xem `wiki-hoc/` để biết lần chạy cuối).
- Giới hạn nói thẳng: wiki cho lịch sử/văn hóa/bối cảnh/cách đi — không cho giá
  vé, giờ mở cửa, giá khách sạn/quán ăn hiện tại. Sổ tay/tạp chí du lịch có bản
  quyền: chỉ đọc, rút sự thật, ghi nguồn + dẫn link, không chép nguyên văn.

## Việc Claude làm tiếp để đưa vào app

1. Port 6 module lõi sang JS (`normalize`, `tfidf`, `naive_bayes`, `retriever`,
   `composer`, `learner`) — toàn bộ dùng toán cơ bản, không phụ thuộc thư viện.
2. Xây kho từ dữ liệu **live** + 153 điểm mới + 332 món + 286 chỗ ở + bảng chi phí.
3. Ô "Hỏi" gọi AI local trước; giữ câu dự phòng 3 phần; lưu phản hồi sửa sai vào
   localStorage rồi đồng bộ về server để huấn luyện lại theo đợt.
4. Chạy lại bộ test 1.014 giả thiết + 120 câu live: mục tiêu 120/120, ngân hàng
   ≥ 90%, 0 lỗi mức CHẶN.

## Cây thư mục trong repo (anh dặn 23/11/2026: mọi codebase đưa lên cây thư mục)

```
app/ai/
  buitrip-ai-bundle.js   Engine mới gộp 1 file (30 KB, sinh từ js-port/ bằng build-bundle.mjs)
  kb.json                Kho 1.945 mục (địa danh/món/chỗ ở/chi phí), JSON gọn
  ai-model.json          Mô hình NB đã cắt gọn (595 KB, gzip 40 KB)
  extra.json             Tuyến đi/mùa đẹp/cấm (kien-thuc-bo-sung.json)
  ai-loader.js           Nạp lười 3 JSON khi trang rảnh + nút góp ý Đúng/Sai
  index.js               Engine cũ + đường đi mới: hỏi engine mới trước,
                         không tự tin (conf < 0.9 hoặc score < 0.3) thì trả về engine cũ
tools/buitrip-ai/        (thư mục này) Pipeline Python + bản JS nguồn
  js-port/               6 module JS nguồn + kiem-tra-ai.js + do-live-120*.mjs
  du-lieu-goc/           Dữ liệu thô đã nhập vào kho (app + Google, có nguồn + ngày)
  wiki-hoc/              Kết quả lấy wiki (wiki-facts.json) + xung đột chờ duyệt
```

## Đưa bản mới lên app (quy trình chuẩn)

1. Sửa kho (`kho-kien-thuc.json`) hoặc thêm câu thật (`cau-hoi-that-vn.json`).
2. `rm model.json && python3 data_gen.py && python3 train.py`, rồi nạp câu thật
   + bài học Lăng Bác (xem "Nghi thức huấn luyện lại" ở trên), đo lại
   (`python3 evaluate.py` + độ phủ 175 câu): mục tiêu 24/24 intent + 24/24 entity.
3. `python3 prune_model.py` -> sinh `ai-model.json` + `kb.json` mới.
4. `cd js-port && node build-bundle.mjs && node kiem-tra-ai.js` (phải khớp bản Python)
   + `node do-live-120.mjs` (đo với 120 câu live của app).
5. Copy 4 file (`buitrip-ai-bundle.js`, `kb.json`, `ai-model.json`, `extra.json`)
   vào `app/ai/`, mở PR — KHÔNG tự gộp, chờ anh bấm Gộp.

## Số đo lúc đưa lên app (23/11/2026, model sau khi sửa tỉnh + gộp wiki)

- 24 câu thật: intent 24/24, entity 24/24. Held-out intent 98,6%.
- 175 câu diễn đàn: 157/175 (89,7%) — tụt từ 93,7% sau khi sửa tỉnh
  (câu huấn luyện sạch còn 5.928 thay vì 8.680; 7 câu mất đều là câu biên:
  độ tin cậy 0,89 hoặc score 0,18–0,28, phần lớn là mảnh câu).
- 120 câu live của app: engine mới tự trả 80/120, trong đó ĐÚNG 80/80
  (qua cổng tự tin conf >= 0,9 và score >= 0,3); 40 câu còn lại trả về
  engine cũ (vốn đạt 120/120) nên không mất câu nào. 1 lỗi đã sửa trước
  khi đưa lên: "vé Hội An" từng trả "Cao lầu Hội An" thay vì "Phố cổ Hội An"
  (nay ưu tiên mục địa danh khi hỏi giá/giờ/vị trí/cách đi).
- Còn thiếu trong kho (ghi rõ để vòng sau bổ sung): Sơn Đoòng chưa có mục
  riêng; "vé Fansipan" vẫn truy hồi sai thực thể (nhưng dưới ngưỡng tự tin
  nên trả về engine cũ, không trả sai cho người dùng).

## Bản sửa 23/11/2026 (sau PR #46): nút Mở cẩm nang + câu hỏi không dấu

- Nút "Mở cẩm nang" từng thiếu ở câu trả lời mà thực thể là tên thành phố
  ("Quy Nhơn"): `ask()` nay trả thêm `entity_prov` (tỉnh của mục đầu tiên
  tìm được), `app/ai/index.js` ưu tiên dùng nó để gắn nút, tra theo tên
  mục chỉ còn là dự phòng.
- Câu hỏi không dấu: đo thật bằng `do-khong-dau.py` — 24 câu thật bỏ dấu:
  intent 24/24, thực thể 24/24; trong 175 câu diễn đàn có 20 câu không
  dấu (phần lớn là tiếng Anh TripAdvisor lọt qua bộ lọc), độ phủ 19/20 —
  câu trượt duy nhất là mảnh câu "Gia,sau vay em" (không phải câu hỏi).
  Kết quả bỏ dấu giống hệt có dấu (cùng thực thể, cùng độ tin cậy, cùng
  điểm) vì cả huấn luyện lẫn truy hồi đều chuẩn hóa bỏ dấu trước khi so.
- Ô tìm kiếm của app cũng đã xử lý không dấu từ trước (wordMatch so theo
  từng từ đã bỏ dấu; gõ liền "sapa"/"phuquoc" có luật ghép từ riêng) —
  kiểm live 23/11: "quy nhon" (25 kết quả, đầu trang Quy Nhơn · Gia Lai),
  "sapa" (28, Sa Pa · Lào Cai), "hue" (29, Huế), "ba na" (2 kết quả đúng
  chỗ — Cầu Vàng, Sun World Bà Nà Hills — nhưng không có mục tiêu đề
  riêng "Bà Nà"). Trợ lý trả lời đúng cả 2 câu không dấu kiểm live
  ("quy nhon di bang gi", "an gi o quy nhon").
- 2 lỗi bắt được khi kiểm live câu "an gi o quy nhon" (đã sửa trong bản này):
  (1) ghi chú món bị cắt giữa từ ("nên thử một lần ch", "cho quán Ph") vì
  composer cắt cứng `ghi_chu[:160]`/`[:300]` — nay cắt ở ranh giới từ + "…".
  (2) danh sách toàn món Pleiku vì kho KHÔNG CÓ món nào của Quy Nhơn/Phú
  Quốc — bản này bổ sung món Quy Nhơn + Phú Quốc (có giá + nguồn, món nào
  không kiểm được giá thì ghi rõ) và xếp món nhắc tới khu hỏi lên trước
  trong danh sách cùng tỉnh.
- Số đo sau sửa: 24/24 + 24/24; 175 câu 157/175; 120 câu live: engine mới
  tự trả 80, đúng 80/80 qua cổng tự tin, 0 sai.
