#!/usr/bin/env python3
"""Gộp thông tin wiki đã lấy (wiki-hoc/wiki-facts.json) vào kho kiến thức.

Quy tắc:
- Chỉ gộp tóm tắt TIẾNG VIỆT (wikipedia_vi / wikivoyage_vi) vào ghi_chu —
  trợ lý trả lời tiếng Việt. Tóm tắt tiếng Anh lưu vào trường mo_ta_en
  (chưa dùng để trả lời; chờ dịch).
- Chỉ thêm câu chưa có trong ghi_chu (so chuẩn hóa), tối đa 400 ký tự, kèm nguồn.
- Tọa độ (Wikidata / trang wiki) lưu vào trường toa_do của mục.
- Tên trùng nhau ở nhiều tỉnh (vd Núi Hàm Rồng) thì gộp cho TẤT CẢ các mục
  cùng tên — tóm tắt wiki phải là trang định hướng chung, không gắn riêng tỉnh.
- Xung đột tỉnh: chỉ tính câu ĐẦU TIÊN của tóm tắt (câu này thường nêu vị trí)
  nhắc tỉnh khác — tránh cờ giả do bài nhắc tỉnh khác ở đoạn sau
  (vd bài Nhà hát Lớn Hà Nội nhắc Nhà hát Lớn Hải Phòng để so sánh).
  Xung đột thật ghi ra wiki-hoc/xung-dot-can-duyet.md, KHÔNG tự sửa kho.

Chạy: python3 wiki_merge.py
"""
import json
import os
import re

from normalize import norm_text

KB_PATH = "kho-kien-thuc.json"
FACTS_PATH = "wiki-hoc/wiki-facts.json"
CONFLICT_PATH = "wiki-hoc/xung-dot-can-duyet.md"

TINHS = ["Hà Nội", "Hải Phòng", "Quảng Ninh", "Bắc Ninh", "Hưng Yên",
         "Ninh Bình", "Phú Thọ", "Điện Biên", "Lai Châu", "Sơn La",
         "Lào Cai", "Cao Bằng", "Lạng Sơn", "Tuyên Quang", "Thái Nguyên",
         "Thanh Hóa", "Nghệ An", "Hà Tĩnh", "Quảng Trị", "Huế",
         "Đà Nẵng", "Quảng Ngãi", "Gia Lai", "Đắk Lắk", "Khánh Hòa",
         "Lâm Đồng", "Đồng Nai", "TP Hồ Chí Minh", "Tây Ninh",
         "Đồng Tháp", "An Giang", "Vĩnh Long", "Cần Thơ", "Cà Mau"]

# (tên mục trong kho, tiêu đề bài wiki) khớp SAI — bài wiki là địa danh khác
# (đã rà tay 23/11/2026 từ 69 xung đột + 23 nghi ngờ). Các cặp này KHÔNG gộp
# tóm tắt/tọa độ vào kho; bài đúng (nếu có) sẽ được tìm lại ở vòng sau.
SAI_TRANG = {
    ("Bảo tàng Bắc Ninh", "Bảo tàng Quảng Ninh"),
    ("Khu du lịch tâm linh – sinh thái Tây Yên Tử", "Khu du lịch sinh thái Tràng An"),
    ("Khu du lịch sinh thái Diễn Lâm (Mường Thanh Safari)", "Khu du lịch sinh thái Tràng An"),
    ("Khu du lịch sinh thái Suối Chí", "Khu du lịch sinh thái Tràng An"),
    ("Khu du lịch sinh thái Ông Đề", "Khu du lịch sinh thái Tràng An"),
    ("Chùa Phật Tích Trúc Lâm Bản Giốc", "Chùa Phật Tích (Viêng Chăn)"),
    ("Làng rèn Phúc Sen (bản Pác Rằng)", "Làng lụa Vạn Phúc"),
    ("Thác Nàng Tiên", "Thác Chiềng Khoa"),
    ("Đảo Quan Lạn (Minh Châu)", "Đảo Cảnh Cước"),
    ("Suối khoáng nóng Bình Châu (Minera Hot Springs) + Khu bảo tồn Bình Châu–Phước Bửu", "Hồ Tràm"),
    ("Khu tưởng niệm Chủ tịch Hồ Chí Minh + Vườn chim TP Cà Mau", "Lăng Chủ tịch Hồ Chí Minh"),
    ("Biệt điện Bảo Đại (hồ Lắk)", "Dinh Bảo Đại"),
    ("Khu du lịch Khai Long", "Khu du lịch Bửu Long"),
    ("Chùa Thiên Hưng", "Chùa Thiên Mụ"),
    ("Tịnh xá Ngọc Hòa", "Tịnh xá Ngọc Quang"),
    ("Suối nước nóng Hội Vân", "Suối nước nóng Kênh Gà"),
    ("Sông Chày – Hang Tối", "Sông Cầu Chày"),
    ("Miếu Bà Chúa Xứ (Nam Du)", "Miếu Bà Chúa Xứ Núi Sam"),
    # Trang định hướng (không có nội dung thật để gộp)
    ("Cung xe đạp Tam Cốc – Bích Động – Thung Nham", "Bích Động (định hướng)"),
    ("Ao Giời – Suối Tiên", "Suối Tiên (định hướng)"),
    ("Thác Mơ (thác Pác Ban)", "Thác Mơ (định hướng)"),
    ("Chùa Linh Sơn – Núi Cao Cát", "Chùa Linh Sơn (định hướng)"),
}


def is_sai_trang(ten, src):
    for key in ("wikipedia_vi", "wikivoyage_vi", "wikipedia_en", "wikivoyage_en"):
        if (ten, (src.get(key) or {}).get("title")) in SAI_TRANG:
            return True
    return False


def first_sentence(text):
    """Câu đầu tiên của tóm tắt (tới dấu chấm đầu tiên, tối thiểu 30 ký tự)."""
    m = re.search(r"\.\s", (text or "")[:400])
    if m and m.start() >= 30:
        return text[:m.start() + 1]
    return (text or "")[:200]


def merge_one(e, src):
    """Gộp 1 bản ghi wiki vào 1 mục kho. Trả về (co_vi, co_en, co_coord)."""
    co_vi = co_en = co_coord = False
    vi = src.get("wikipedia_vi") or src.get("wikivoyage_vi")
    if vi and vi.get("tom_tat"):
        s = re.sub(r"\([^)]*[\u4e00-\u9fff][^)]*\)", "", vi["tom_tat"].strip())
        s = re.sub(r"\s+", " ", s).strip()[:400]
        if s and norm_text(s[:80]) not in norm_text(e.get("ghi_chu") or ""):
            old = (e.get("ghi_chu") or "").strip()
            tag = f" | Bối cảnh ({vi.get('title')}, Wikipedia/Wikivoyage): {s}"
            e["ghi_chu"] = (old + tag) if old else tag.lstrip(" |")
            e["nguon"] = ((e.get("nguon") or "") + f"; wiki {vi.get('url') or ''}").strip("; ")
            co_vi = True
    en = src.get("wikipedia_en") or src.get("wikivoyage_en")
    if en and en.get("tom_tat"):
        e["mo_ta_en"] = en["tom_tat"][:1000]
        co_en = True
    coord = None
    wd = src.get("wikidata", {})
    if wd.get("toa_do"):
        coord = wd["toa_do"]
    else:
        for k in ("wikipedia_vi", "wikipedia_en", "wikivoyage_vi", "wikivoyage_en"):
            if src.get(k, {}).get("toa_do"):
                coord = src[k]["toa_do"]
                break
    if coord and not e.get("toa_do"):
        e["toa_do"] = coord
        co_coord = True
    return co_vi, co_en, co_coord


def main():
    kb = json.load(open(KB_PATH, encoding="utf-8"))
    facts = json.load(open(FACTS_PATH, encoding="utf-8"))
    by_ten = {}
    for e in kb:
        if not e.get("loai"):
            by_ten.setdefault(e["ten"], []).append(e)
    n_vi = n_en = n_coord = 0
    conflicts = []
    for f in facts:
        entries = by_ten.get(f["ten"])
        if not entries:
            continue
        src = f.get("sources", {})
        if is_sai_trang(f["ten"], src):
            continue
        for e in entries:
            co_vi, co_en, co_coord = merge_one(e, src)
            n_vi += co_vi
            n_en += co_en
            n_coord += co_coord
        # Xung đột tỉnh theo câu đầu tiên (tính 1 lần cho mỗi tên)
        for key in ("wikipedia_vi", "wikivoyage_vi"):
            s = src.get(key, {})
            if s.get("tom_tat"):
                first = first_sentence(s["tom_tat"])
                for e in entries:
                    others = [t for t in TINHS if t in first and t != e.get("tinh")]
                    if others:
                        conflicts.append((f["ten"], e.get("tinh"), others,
                                          s.get("title"), s.get("url")))
                break
    json.dump(kb, open(KB_PATH, "w", encoding="utf-8"), ensure_ascii=False, indent=1)
    with open(CONFLICT_PATH, "w", encoding="utf-8") as f:
        f.write("# Xung đột tỉnh từ wiki — cần anh duyệt (không tự sửa)\n\n")
        f.write("Câu đầu tiên của bài wiki nhắc tỉnh khác với tỉnh trong kho. "
                "Đa số là bài nhắc địa danh cùng tên ở tỉnh khác hoặc so sánh — "
                "chỉ sửa kho khi xác minh đúng là kho sai.\n\n")
        if not conflicts:
            f.write("Không có xung đột nào.\n")
        for ten, tinh, others, title, url in conflicts:
            f.write(f"- **{ten}** (kho: {tinh}) — wiki nhắc: {', '.join(others)} "
                    f"(bài [{title}]({url}))\n")
    print(f"GOP XONG: +{n_vi} muc co boi canh tieng Viet, +{n_en} muc co mo ta tieng Anh, "
          f"+{n_coord} muc co toa do, {len(conflicts)} xung dot can duyet.")


if __name__ == "__main__":
    main()
