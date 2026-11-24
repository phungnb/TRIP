#!/bin/bash
# Vòng học hàng tuần trên VPS (thay cron trên VM của M).
# Chạy bằng systemd timer buitrip-weekly (Chu nhật 03:15 giờ VN = Thứ 7 20:15 UTC).
# Ghi nhật ký vào wiki-hoc/cron.log. Khác bản VM ở 3 điểm:
#   1. Sao lưu kho trước khi gộp (wiki_merge sửa kho tại chỗ).
#   2. Áp lại nghi thức huấn luyện đầy đủ sau train.py (extra_rows 176 câu
#      thật + bài học Lăng Bác) — nếu không, mỗi tuần train lại sẽ mất bài
#      học phản hồi và 24 câu thật tụt 24/24 -> 23/24.
#   3. Chạy prune_model.py cuối để sinh lại kb.json + ai-model.json cho app.
# Chạy tay: bash wiki-weekly-vps.sh
set -e
cd /root/buitrip-ai
{
  echo "=== $(date '+%Y-%m-%d %H:%M:%S %Z') ==="
  cp kho-kien-thuc.json "kho-kien-thuc-truoc-tuan-$(date '+%Y-%m-%d').json"
  python3 wiki_learn.py --update
  python3 wiki_merge.py
  # Học liên tục thêm ăn uống/khám phá: lấy mục Ăn/Uống/Làm/Xem/Ngủ trên
  # Wikivoyage -> chỉ tạo file ứng cử (ung-cu-muc-moi.json) để duyệt tay,
  # KHÔNG tự gộp vào kho (tên/giá tiếng Anh cần dịch + kiểm lại trước).
  python3 wiki_learn.py --sections
  python3 wiki_sections_merge.py
  rm -f model.json
  python3 data_gen.py
  python3 train.py
  python3 apply-ritual.py
  python3 evaluate.py 2>&1 | grep -E "HELD-OUT|TỔNG"
  python3 prune_model.py
  python3 -c "import json; kb=json.load(open('kb.json',encoding='utf-8')); print('KB:', len(kb), 'muc')"
  echo "OK"
} >> wiki-hoc/cron.log 2>&1
