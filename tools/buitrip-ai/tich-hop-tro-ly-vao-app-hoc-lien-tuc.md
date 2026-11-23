# Tích hợp trợ lý AI lên app BuiTrip + học liên tục

Bản yêu cầu cho Claude làm. Hướng đã chốt: **không API, không Gemini, chạy 100%
trên máy người dùng** (offline sau lần tải đầu). Trợ lý học liên tục theo 2 vòng:
vòng wiki (máy chủ, mỗi tuần) + vòng góp ý của người dùng (trong app, ngay lập tức).

## 1. Hiện trạng (đã đo thật, 23/11/2026)

- Codebase trợ lý: `~/workspace/buitrip-ai-local/` (đã đủ trên Drive, thư mục
  "Soi lan 2 - 23-11-2026" — 100 file). Python thuần stdlib, không thư viện ngoài.
- Kho kiến thức `kho-kien-thuc.json`: **1.945 mục** (622 địa danh + 626 món ăn +
  663 chỗ ở + 34 bảng chi phí), **1,19 MB**. Gồm cả dữ liệu app + 153 điểm mới
  từ web tour + giá/vé tìm Google + món/chỗ ở tìm Google.
- Model `model.json`: **3,07 MB** — cấu trúc: `nb` (14 ý định, vocab 6.308 token
  gồm bigram, log_prior, log_prob 14×vocab, unk) + `tfidf_q_idf` (6.308 mục) +
  `boosts` (14) + `extra_rows` (352 câu hỏi thật).
- Đo thật: 24 câu hỏi thật **ý định 24/24, thực thể 24/24**; 175 câu hỏi thật
  trên diễn đàn/nhóm: trả lời được **164/175 = 93,7%**.
- Pipeline wiki (`wiki_learn.py` + `wiki_merge.py`): đang chạy vòng đầu cho 622
  điểm (Wikivoyage + Wikipedia VI/EN + Wikidata, API công khai, ghi nguồn).
  Lịch hàng tuần đã đặt: chủ nhật ~3h sáng, chỉ lấy trang đổi revision.
- Điểm tích hợp trong app hiện tại: `window.askQuick(q)` trong `faq.js`
  (trợ lý cũ tìm theo nội dung app). Giữ nguyên giao diện "Hỏi", chỉ thay ruột.
- ⚠️ **Kho hiện tại dựng từ dữ liệu local (463 điểm), không phải bản live
  (739 điểm). Trước khi đưa lên app, Claude phải chạy lại bước trích xuất từ
  file live** (`~/workspace/buitrip-danh-gia/live/`) rồi mới huấn luyện lại —
  không ship kho cũ.

## 2. Kiến trúc tích hợp (app tĩnh, Vercel, không server)

### 2.1 File build-time (Python sinh ra, app chỉ tải về dùng)

| File | Nội dung | Kích thước hiện tại |
|---|---|---|
| `app/data/kb.json` | 1.945 mục: ten, tinh, vung, loai, dia_chi, gia, gio, thoi_gian, mua_dep, ghi_chu, nguon, toa_do, mo_ta_en | 1,19 MB |
| `app/data/ai-model.json` | Model đã cắt gọn (mục 2.2) + `version` (ngày sinh) | mục tiêu < 500 KB sau gzip |

### 2.2 Cắt gọn model trước khi ship (bắt buộc — 3,07 MB là quá nặng)

1. Làm tròn mọi số thực trong `log_prob` / `idf` về **3 chữ số thập phân**.
2. Bỏ token có `log_prob` giống nhau ở cả 14 ý định (không phân biệt được gì).
3. Bỏ token chỉ xuất hiện trong câu hỏi huấn luyện mà không xuất hiện trong
   bất kỳ mục kho nào và không phải tên địa danh/tỉnh/thành phố.
4. `train.jsonl` (1,1 MB) **không ship** — chỉ dùng lúc huấn luyện.
5. Đo lại sau khi cắt: 24 câu thật vẫn 24/24, 175 câu vẫn ≥ 93%. Nếu tụt thì
   hoàn lại bước cắt gây tụt, không chấp nhận "gần đúng".

### 2.3 Port sang JS (trong `app/ai/`)

Port từng hàm một từ Python, giữ nguyên hành vi (không viết lại theo ý mình):

| File JS | Gốc Python | Việc chính |
|---|---|---|
| `normalize.js` | `normalize.py` | Chuẩn hóa tiếng Việt: **đ→d TRƯỚC khi NFD** (Đ/đ không tách được); token + bigram; ALIASES (qn/hn/sg/hcm/dn/dl/pq/nt/hg/cb/lc/hp); CITY_TO_PROVINCE (76 thành phố); OLD_TO_NEW (21 tỉnh cũ); prov_key/same_province |
| `naive-bayes.js` | `naive_bayes.py` | Phân loại ý định (14 ý định) bằng log_prior + log_prob + unk |
| `tfidf.js` | `tfidf.py` | TF-IDF + cosine trên kho |
| `retriever.js` | `retriever.py` | Tìm mục: cosine + cộng điểm tên chính xác (+2.0) + tên đầy đủ (+2.5) + thành phố trong câu hỏi (+2.0); lọc theo `loai` (món/ở/chi phí); neo theo tỉnh (`same_province`) |
| `composer.js` | `composer.py` | Ghép câu trả lời. **Luật sắt: giá/giờ/tên riêng chỉ lấy từ dữ liệu đã tìm được, không bao giờ lấy dữ liệu tỉnh khác thế vào.** Mùa đẹp/cách đi ưu tiên dữ liệu đã kiểm chứng (EXTRA) hơn trường cấp tỉnh. Thiếu dữ liệu thì trả lời 3 phần: nói rõ thiếu gì → hướng dẫn tự kiểm tra ở đâu → gợi ý 2–3 câu hỏi trả lời được |
| `learner.js` | `learner.py` | `ask()` + `feedback()` + nhớ thực thể câu trước (hỏi tiếp "thế ở đó có gì chơi" phải hiểu "đó" là điểm vừa hỏi) |

### 2.4 Cách tải và chạy trong app

1. **Tải chậm (lazy load):** chỉ tải `kb.json` + `ai-model.json` khi người dùng
   mở trợ lý lần đầu. Trước đó app không nặng thêm byte nào.
2. Cache theo `version`: lưu vào Cache Storage; khi `version` đổi thì tải lại.
3. **Dự phòng offline:** nếu tải JSON thất bại (mạng yếu, lần đầu offline) thì
   trợ lý tự quay về `askQuick` cũ để vẫn trả lời được, không được chết lặng.
4. **0 request mạng khi hỏi:** sau lần tải đầu, mọi câu hỏi xử lý hoàn toàn
   trên máy. Không gọi /api/hoi, không gọi Gemini, không gửi câu hỏi đi đâu.
5. Bỏ nút "Hỏi kỹ hơn với trợ lý AI (Gemini)" và bỏ giới hạn 20 câu/ngày.
6. Chân trang trợ lý hiển thị: "Kho cập nhật <ngày> · đã học <N> góp ý từ bạn".

## 3. Học liên tục — vòng 1: wiki (đã có, chạy mỗi tuần)

Đã đặt lịch `buitrip-wiki-weekly` (chủ nhật ~3h sáng, script
`wiki-weekly.sh`): `wiki_learn.py --update` → `wiki_merge.py` → huấn luyện lại
→ sinh `kb.json` + `ai-model.json` mới → ghi nhật ký `wiki-hoc/cron.log`.

- Chỉ gộp tóm tắt **tiếng Việt** vào `ghi_chu` (kèm nguồn). Tóm tắt tiếng Anh
  lưu riêng `mo_ta_en`, chưa dùng để trả lời.
- Tọa độ Wikidata → trường `toa_do` (sau này dùng cho Sổ tem).
- Xung đột tỉnh chỉ ghi ra `wiki-hoc/xung-dot-can-duyet.md`, **không tự sửa kho**.
- Wiki chỉ cho lịch sử/văn hóa/bối cảnh/cách đi — **không cho giá vé, giờ mở
  cửa, giá khách sạn/quán ăn hiện tại**. Những thứ đó vẫn phải kiểm từ nguồn
  quản lý điểm đến.
- Sổ tay/tạp chí du lịch có bản quyền: chỉ đọc, rút **sự thật**, ghi nguồn +
  dẫn link, không chép nguyên văn, không cào hàng loạt.

## 4. Học liên tục — vòng 2: học từ người dùng trong app (phần mới, Claude làm)

### 4.1 Giao diện góp ý (sau mỗi câu trả lời)

- Hai nút 👍 / 👎 và một dòng "Sửa câu trả lời".
- Bấm 👎 hoặc "Sửa" → hiện ô chọn: (a) ý định đúng là gì (chọn trong 14 ý định),
  (b) điểm đúng là gì (gõ tên, gợi ý từ kho khi gõ). Không bắt người dùng gõ
  giải thích dài.
- Nút "Gửi góp ý cho Bụi Code" (tùy chọn, không bắt buộc).

### 4.2 Học ngay trên máy người dùng (không cần mạng, không cần chờ ai)

- Mỗi góp ý được sửa áp dụng **ngay lập tức trên chính máy đó**, đúng logic
  `feedback()` trong `learner.py`: thêm câu hỏi đã sửa vào ví dụ huấn luyện +
  cộng điểm tìm kiếm **chỉ cho token tên điểm đúng** (cấm cộng điểm cho mọi
  token trong câu hỏi — lỗi cũ từng làm "Lăng Bác" thành đáp án cho mọi câu).
- Kiểm chứng tại chỗ: hỏi lại đúng câu vừa sửa → phải ra đáp án đã sửa.
- Góp ý lưu trong `localStorage` (`buitrip_ai_feedback`, `buitrip_ai_boosts`),
  tối đa 200 mục gần nhất; có nút "Xóa những gì trợ lý đã học từ tôi".
- Hiển thị số "đã học <N> góp ý từ bạn" ở chân trang trợ lý — bằng chứng nhìn
  thấy được là nó đang học.
- Riêng tư: góp ý chỉ nằm trên máy người dùng, **không tự gửi đi đâu**.

### 4.3 Gộp góp ý vào kho chung (mỗi tuần, cùng vòng wiki)

- Nút "Gửi góp ý cho Bụi Code" mở link Telegram/mail có sẵn nội dung góp ý
  (không cần server riêng). Đội kiểm chứng rồi thêm câu đúng vào
  `train-cau-hoi-that.json`, huấn luyện lại ở vòng wiki hàng tuần.
- Góp ý chưa kiểm chứng **không bao giờ** tự vào kho chung. Chỉ câu đã kiểm
  chứng mới được thêm — kho chung chỉ học từ sự thật, không học từ tin đồn.

## 5. Nghiệm thu (Claude tự kiểm, báo số đo, không báo miệng)

1. 24 câu hỏi thật trong `evaluate.py`: ý định 24/24, thực thể 24/24.
2. 175 câu hỏi thật (`cau-hoi-that-vn.json`): trả lời được ≥ 93%.
3. Hỏi 20 câu liên tiếp trên điện thoại tầm trung: mỗi câu < 1 giây, **0 request
   mạng** sau lần tải đầu (kiểm bằng tab Network).
4. Vòng góp ý: hỏi sai → sửa → hỏi lại đúng câu → ra đáp án đã sửa; tắt app mở
   lại vẫn nhớ (localStorage còn).
5. Offline: tắt mạng, mở trợ lý lần đầu → vẫn trả lời bằng `askQuick` cũ,
   không màn hình trắng, không lỗi.
6. Tải trang lần đầu (chưa mở trợ lý): không nặng thêm — 2 file JSON chỉ tải
   khi mở trợ lý.
7. Không có API key, không có token, không gọi Gemini trong code client.

## 6. Cấm

- Không đưa Gemini/API vào app dưới mọi hình thức.
- Không tự bịa giá vé, giờ mở cửa, tọa độ.
- Không cào diễn đàn/nhóm/mạng xã hội hàng loạt.
- Không chép nguyên văn bài wiki, sổ tay, tạp chí (chỉ rút sự thật + ghi nguồn).
- Không tự sửa kho chung từ góp ý chưa kiểm chứng.
- Không gửi câu hỏi hay góp ý của người dùng đi đâu khi họ chưa bấm Gửi.
