# Học liên tục 24/11/2026 — kho 1.971 → 2.319 + sửa lỗi "ở đâu"

Ngày: 24/11/2026 (00:10–01:15). Hướng đã chốt (anh chọn 00:22): giữ local,
chỉ học liên tục thêm dữ liệu, không hybrid Gemini.

## 1. Vòng học wiki chạy thật — chết 1 lần vì rớt mạng, đã sửa

- `wiki-weekly.sh` chạy tay lúc 00:24 (anh lệnh "bắt tay học liên tục không
  nói chủ nhật"). `--update` + `wiki_merge.py` xong (kho vẫn 1.971 mục, chỉ
  cập nhật ghi_chu/toa_do), nhưng `--sections` chết ở 00:55 sau 30 phút vì
  **1 lần timeout mạng** trong `resolve_title` → `api_get`.
- Nguyên nhân: `api_get` chỉ thử lại khi HTTP 429, còn `URLError`/timeout thì
  chết luôn cả vòng (script có `set -e`).
- Đã sửa `wiki_learn.py`: thử lại cả khi timeout (3 lần, chờ 10s/20s/30s).
  Chạy nốt 54 thành phố còn lại: **xong, 571 bản ghi mục, 1.299 listing,
  72/72 thành phố** trong `wiki-hoc/wiki-sections.json`.
- `wiki_sections_merge.py` chạy xong: **1.189 mục mới ứng cử** (400 điểm,
  413 món, 376 chỗ ở), 110 trùng bỏ qua → `wiki-hoc/ung-cu-muc-moi.json`
  (CHƯA gộp vào kho — toàn tên/giá tiếng Anh, cần dịch + kiểm giá trước
  khi gộp, như đợt 407 trước).

## 2. Gộp 348 mục đã dịch (5 thành phố) — kho 1.971 → 2.319

- 3 file đã dịch: Quy Nhơn 102, Phú Quốc + Huế 85, Hà Nội + Đà Lạt 161
  (sau khi bỏ 2 trùng thật "Phố đường tàu Hà Nội" 2 đoạn).
- `gop-muc-da-dich.py`: backup `kho-kien-thuc-truoc-gop-350.json`, gộp đúng
  348 như dry-run, kho 1.971 → **2.319 mục**.
- Huấn luyện lại (nghi thức chuẩn: rm model → data_gen → train → feedback
  Lăng Bác → evaluate → prune). Boosts: 14.

## 3. Đo lại — so với trước gộp

| Chỉ số | Trước gộp | Sau gộp |
|---|---|---|
| Held-out (câu mẫu) | 98,6% | **97,2%** (1.153/1.186) |
| 24 câu thật (ý định + thực thể) | 24/24 + 24/24 | **24/24 + 24/24** |
| Độ phủ 175 câu diễn đàn | 157/175 (89,7%) | **158/175 (90,3%)** |
| Câu kiểm chứng gộp 350 | — | **17/17** |
| Cổng live-120 (mới trả lời, đúng) | 80/120, 80 đúng, 0 sai | **81/120, 81 đúng, 0 sai** |
| JS == Python | khớp | **khớp** (24/24, 24/24, 158/175) |

- Held-out tụt 1,4 điểm là thật (câu mẫu tổng hợp, không phải câu thật).
  Câu thật và độ phủ vẫn giữ/vượt. Ghi nhận trung thực, không giấu.

## 4. Hai lỗi thật bắt được khi kiểm chứng — đã sửa

**Lỗi A — "X ở đâu" bị hiểu thành hỏi chỗ ở.** NB phân loại "Cà phê Tùng
Đà Lạt ở đâu", "Phù điêu bắt sống phi công Mỹ ở đâu", "massage người
khiếm thị ở Huế" thành ý định `o` (chỗ ở) vì cụm "ở đâu" → trả về homestay/
hostel/khách sạn thay vì địa điểm. Sửa trong `ask()` (Python `learner.py`
+ JS `js-port/learner.js`, giống hệt nhau): khi ý định là `o` mà câu hỏi
nhắc đích danh 1 mục không phải chỗ ở (tên đầy đủ, hoặc phần mô tả trong
ngoặc, hoặc chung ≥4 token và ≥60% số token tên) và mục đó không phải tên
thành phố/tổng quan tỉnh → đổi sang `vi_tri` và đưa mục đó lên đầu.
"ở đâu ở Quy Nhơn" vẫn là hỏi chỗ ở (không đổi). "vé Hội An" vẫn ra
Phố cổ Hội An (luật ưu tiên địa danh giữ nguyên).

**Lỗi B — luật ưu tiên địa danh hạ sai quán có giá thật.** "Bánh Khoái Hạnh
Huế giá bao nhiêu" bị hạ xuống mục "Huế (tổng quan)" vì top hit là món ăn.
Sửa: chỉ hạ khi tên món KHÔNG có đầy đủ trong câu hỏi (quán được nhắc đích
danh thì giữ, vì quán có giá thật 20.000–55.000đ/phần).

Sau sửa, 17/17 câu kiểm chứng đúng, trong đó:
- Cà phê Tùng → vị trí "6 khu Hòa Bình", Đà Lạt.
- Phù điêu bắt sống phi công Mỹ → "đường Thanh Niên", Hà Nội.
- Massage Niềm Tin → "1/180 Phan Bội Châu", Huế.
- Bánh Khoái Hạnh → 20.000–55.000đ/phần, 10:00–21:00.

## 5. Còn tồn đọng (không chặn lần này)

- 1.189 mục ứng cử mới (72 thành phố) chưa dịch — dịch theo đợt như đợt 407.
- 19 xung đột wiki trong `wiki-hoc/xung-dot-can-duyet.md` vẫn chờ anh duyệt.
- "Yên Tử ở đâu?" vẫn trượt (độ tin cậy 0,887 < 0,9; khách sạn Uông Bí lấn
  mục Khu di tích Yên Tử trong top 3) — 1 trong 17 câu diễn đàn chưa đạt.
- Held-out 97,2% (xem mục 3).

## 6. File đổi trong PR này

- Runtime app: `app/ai/kb.json`, `app/ai/ai-model.json`
  (588 KB, gzip 40 KB; kb 1.503 KB, gzip 319 KB), `app/ai/buitrip-ai-bundle.js`.
- Pipeline `tools/buitrip-ai/`: `learner.py`, `js-port/learner.js`,
  `js-port/kiem-tra-ai.js` (baseline phủ 157 → 158),
  `js-port/buitrip-ai-bundle.js`, `wiki_learn.py` (mục sections + thử lại
  khi timeout), `wiki-weekly.sh` (thêm bước sections),
  `wiki_sections_merge.py` (mới), `gop-muc-da-dich.py` (mới),
  `cau_hoi_kiem_chung_gop_350.py` (mới), `kho-kien-thuc.json`,
  `wiki-hoc/wiki-sections.json` (mới), `wiki-hoc/ung-cu-muc-moi.json`,
  `wiki-hoc/bao-cao-muc-moi.md`, `wiki-hoc/ung-cu-*-vi.json` (3 file),
  `wiki-hoc/bao-cao-dich-*.md`, `wiki-hoc/build-ung-cu-phu-quoc-hue.py`,
  báo cáo này.
- Không đổi: `model.json` (tái tạo được, không đẩy), backup kho, `cron.log`.
