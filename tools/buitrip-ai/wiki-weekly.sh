#!/bin/bash
# Chạy lại pipeline wiki mỗi tuần: chỉ lấy trang đổi revision, gộp vào kho,
# huấn luyện lại và đo lại. Ghi nhật ký vào wiki-hoc/cron.log.
# Chạy tay: bash wiki-weekly.sh
set -e
cd ~/workspace/buitrip-ai-local
{
  echo "=== $(date '+%Y-%m-%d %H:%M:%S') ==="
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
  python3 evaluate.py 2>&1 | grep -E "HELD-OUT|TỔNG"
  echo "OK"
} >> wiki-hoc/cron.log 2>&1
