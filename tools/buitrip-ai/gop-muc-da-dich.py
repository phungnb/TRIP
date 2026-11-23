#!/usr/bin/env python3
"""Gộp các mục đã dịch sang tiếng Việt vào kho chính.

Dùng SAU KHI vòng học (wiki-weekly.sh) chạy xong — wiki_merge.py trong vòng
học đọc kho rồi ghi lại, gộp trước lúc đó sẽ bị ghi đè mất.
Cách chạy: python3 gop-muc-da-dich.py
- Sao lưu kho ra kho-kien-thuc-truoc-gop-350.json
- Đọc 3 file dịch (QN 102 + PQ/Huế 85 + HN/ĐL 163), kiểm trùng tên chuẩn hóa
  (đ→d trước NFD, exact + substring hai chiều) với kho và trong đợt gộp,
  chỉ thêm mục mới. In số mục thêm được / bỏ qua.
"""
import json, re, shutil, unicodedata

KB = "kho-kien-thuc.json"
FILES = [
    "wiki-hoc/ung-cu-quy-nhon-vi.json",
    "wiki-hoc/ung-cu-phu-quoc-hue-vi.json",
    "wiki-hoc/ung-cu-ha-noi-da-lat-vi.json",
]

def norm(s):
    s = (s or "").lower().replace("đ", "d")
    s = "".join(c for c in unicodedata.normalize("NFD", s)
                if unicodedata.category(c) != "Mn")
    return re.sub(r"[^a-z0-9 ]+", " ", s).strip()

def main():
    kb = json.load(open(KB, encoding="utf-8"))
    shutil.copy2(KB, "kho-kien-thuc-truoc-gop-350.json")
    names = {norm(e.get("ten") or "") for e in kb}
    # Chỉ 2 mục bỏ vì trùng thật (đã kiểm tay 24/11/2026): 2 đoạn phố đường
    # tàu là cùng 1 điểm "Phố đường tàu Hà Nội" đã có trong kho. Các cặp
    # substring khác đều là báo động giả (quán tên theo món ≠ món chung;
    # chi nhánh khác địa chỉ; khách sạn khác tỉnh) nên vẫn gộp.
    SKIP = {norm("Phố đường tàu Hà Nội (đoạn phía Bắc)"),
            norm("Phố đường tàu Hà Nội (đoạn phía Nam)")}
    total_new, total_skip = 0, 0
    for f in FILES:
        items = json.load(open(f, encoding="utf-8"))
        added, skipped = [], []
        for e in items:
            n = norm(e.get("ten") or "")
            if not n or n in names:
                skipped.append((e.get("ten"), "trùng tên kho"))
                continue
            if n in SKIP:
                skipped.append((e.get("ten"), "trùng thật (cùng điểm đã có)"))
                continue
            kb.append(e)
            names.add(n)
            added.append(e.get("ten"))
        print(f"{f}: thêm {len(added)}, bỏ {len(skipped)}")
        for t, r in skipped:
            print(f"  bỏ: {t} ({r})")
        total_new += len(added)
        total_skip += len(skipped)
    json.dump(kb, open(KB, "w", encoding="utf-8"),
              ensure_ascii=False, indent=1)
    print(f"Kho: {len(kb) - total_new} -> {len(kb)} mục "
          f"(thêm {total_new}, bỏ {total_skip})")

if __name__ == "__main__":
    main()
