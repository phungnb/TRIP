#!/usr/bin/env python3
"""Ứng cử mục mới từ listings Wikivoyage (wiki-hoc/wiki-sections.json).

Chỉ THÊM mục mới (tên chuẩn hóa chưa có trong kho) — KHÔNG sửa mục đã có,
KHÔNG ghi đè giá/giờ. Giá/giờ nào không có thì ghi "chưa kiểm được",
TUYỆT ĐỐI không bịa. KHÔNG gộp vào kho-kien-thuc.json — chỉ ghi file ứng cử
+ báo cáo để M duyệt rồi mới gộp.

Quy tắc đối chiếu tên (chuẩn hóa đ->d trước NFD, như normalize.py):
- Tên listing trùng (chuẩn hóa) với tên mục trong kho -> bỏ (đã có).
- Listing tiếng Anh mà tên đã xuất hiện trong mo_ta_en của mục nào đó
  trong kho -> bỏ (cùng địa danh, chỉ khác ngôn ngữ tên gọi).
- Vi và en trùng tên nhau -> giữ bản tiếng Việt (tên tiếng Việt ưu tiên).

Ánh xạ loại mục: Eat/Drink -> mon_an, Sleep -> cho_o, See/Do -> địa danh
(không loai).

Chạy: python3 wiki_sections_merge.py
Đầu ra: wiki-hoc/ung-cu-muc-moi.json + wiki-hoc/bao-cao-muc-moi.md
"""
import json
import os
import re

from normalize import norm_text

KB_PATH = "kho-kien-thuc.json"
SECTIONS_PATH = "wiki-hoc/wiki-sections.json"
OUT_CAND = "wiki-hoc/ung-cu-muc-moi.json"
OUT_REPORT = "wiki-hoc/bao-cao-muc-moi.md"

MUC_TO_LOAI = {"Eat": "mon_an", "Drink": "mon_an", "Sleep": "cho_o"}


def _cut_words(s, n):
    """Cắt ở ranh giới từ + dấu …, không cắt giữa từ."""
    s = (s or "").strip()
    if len(s) <= n:
        return s
    t = s[:n].rsplit(" ", 1)[0]
    return (t or s[:n]) + "…"


def _strip_paren(name):
    """Bỏ phần trong ngoặc ở cuối tên để đối chiếu ('Phở Thìn (Hà Nội)')."""
    return re.sub(r"\s*\([^)]*\)\s*$", "", name or "").strip()


def to_candidate(l, city, tinh, muc, ngon, url, lay_luc):
    """1 listing -> 1 mục ứng cử cho kho."""
    ten = (l.get("name") or "").strip()
    loai = MUC_TO_LOAI.get(muc)
    desc = (l.get("description") or "").strip()
    addr = (l.get("address") or "").strip()
    ghi = desc
    if addr:
        ghi = (ghi + f" | Địa chỉ: {addr}") if ghi else f"Địa chỉ: {addr}"
    if l.get("url"):
        ghi = (ghi + f" | Web: {l['url']}") if ghi else f"Web: {l['url']}"
    ngon_text = ("Wikivoyage tiếng Việt" if ngon == "wikivoyage_vi"
                 else "Wikivoyage tiếng Anh")
    e = {"ten": ten, "tinh": tinh,
         "gia": (l.get("price") or "").strip() or "chưa kiểm được",
         "gio": (l.get("hours") or "").strip() or "chưa kiểm được",
         "ghi_chu": _cut_words(ghi, 600),
         "nguon": f"{ngon_text}, lấy ngày {lay_luc[:10]} — {url}"}
    if loai:
        e["loai"] = loai
    if addr:
        e["dia_chi"] = addr
    if l.get("toa_do"):
        e["toa_do"] = l["toa_do"]
    return e


def main():
    kb = json.load(open(KB_PATH, encoding="utf-8"))
    sections = json.load(open(SECTIONS_PATH, encoding="utf-8"))
    kb_names = {norm_text(e["ten"]) for e in kb}
    kb_names_stripped = {norm_text(_strip_paren(e["ten"])) for e in kb}
    # Tên mục đã có trong kho (để ghi lý do bỏ trùng + tỉnh của mục đó)
    ten_to_tinh = {}
    for e in kb:
        ten_to_tinh.setdefault(norm_text(e["ten"]), []).append(e.get("tinh"))
    # Toàn bộ mô tả tiếng Anh trong kho (để nhận listing tiếng Anh trùng tên)
    en_text = " | ".join(norm_text(e.get("mo_ta_en") or "") for e in kb)

    candidates, skipped = [], []
    seen_cand = {}  # norm ten -> (ngon, chi so) để vi đè en trùng tên
    for r in sections:
        city, tinh, muc = r.get("ten"), r.get("tinh"), r.get("muc")
        ngon, url, lay_luc = r.get("ngon"), r.get("url"), r.get("lay_luc", "")
        if not muc:
            continue
        for l in r.get("listings", []):
            name = (l.get("name") or "").strip()
            if not name:
                continue
            nname = norm_text(name)
            nname_stripped = norm_text(_strip_paren(name))
            if nname in kb_names or nname_stripped in kb_names_stripped:
                tinh_cu = ten_to_tinh.get(nname) or ten_to_tinh.get(nname_stripped) or []
                skipped.append((name, city, muc, ngon,
                                f"đã có trong kho (tỉnh: {', '.join(tinh_cu) or '?'})"))
                continue
            if ngon == "wikivoyage_en" and len(nname) >= 4 and nname in en_text:
                skipped.append((name, city, muc, ngon,
                                "tên tiếng Anh đã có trong mo_ta_en của kho"))
                continue
            cand = to_candidate(l, city, tinh, muc, ngon, url, lay_luc)
            cand["_thanh_pho"] = city
            cand["_muc"] = muc
            cand["_ngon"] = ngon
            if nname in seen_cand:
                prev_ngon, prev_i = seen_cand[nname]
                if prev_ngon == "wikivoyage_en" and ngon == "wikivoyage_vi":
                    candidates[prev_i] = cand  # tiếng Việt đè tiếng Anh trùng tên
                else:
                    skipped.append((name, city, muc, ngon,
                                    "trùng ứng cử viên khác (giữ bản trước)"))
                continue
            seen_cand[nname] = (ngon, len(candidates))
            candidates.append(cand)

    os.makedirs("wiki-hoc", exist_ok=True)
    json.dump(candidates, open(OUT_CAND, "w", encoding="utf-8"),
              ensure_ascii=False, indent=1)

    by_loai = {"diem": 0, "mon_an": 0, "cho_o": 0}
    for c in candidates:
        by_loai[c.get("loai", "diem")] += 1
    by_city = {}
    for c in candidates:
        by_city.setdefault(c["_thanh_pho"], []).append(c)

    with open(OUT_REPORT, "w", encoding="utf-8") as f:
        f.write("# Mục mới ứng cử từ listings Wikivoyage — CHƯA gộp vào kho\n\n")
        f.write("Chỉ thêm mục mới (tên chưa có trong kho). Không sửa mục đã có, "
                "không ghi đè giá/giờ. Giá/giờ nào không có thì ghi "
                '"chưa kiểm được". M duyệt file `ung-cu-muc-moi.json` rồi mới gộp.\n\n')
        f.write(f"- Tổng listings đã lấy: "
                f"{sum(len(r.get('listings', [])) for r in sections)}\n")
        f.write(f"- Ứng cử mới: **{len(candidates)}** "
                f"(địa danh {by_loai['diem']}, món ăn {by_loai['mon_an']}, "
                f"chỗ ở {by_loai['cho_o']})\n")
        f.write(f"- Bỏ qua (đã có trong kho / trùng): **{len(skipped)}**\n\n")
        f.write("## Theo thành phố\n\n")
        for city in sorted(by_city):
            cs = by_city[city]
            f.write(f"### {city} ({len(cs)} mục)\n\n")
            for c in cs:
                loai = {"mon_an": "món ăn", "cho_o": "chỗ ở"}.get(
                    c.get("loai"), "địa danh")
                f.write(f"- **{c['ten']}** ({loai}, mục {c['_muc']}, "
                        f"{'tiếng Việt' if c['_ngon'] == 'wikivoyage_vi' else 'tiếng Anh'})"
                        f" — giá: {c['gia']}; giờ: {c['gio']}\n")
            f.write("\n")
        f.write("## Bỏ qua (đã có trong kho / trùng)\n\n")
        if not skipped:
            f.write("Không có mục nào bị bỏ qua.\n")
        for name, city, muc, ngon, ly_do in skipped:
            f.write(f"- {name} ({city}, mục {muc}, "
                    f"{'tiếng Việt' if ngon == 'wikivoyage_vi' else 'tiếng Anh'})"
                    f" — {ly_do}\n")
    print(f"UNG CU: {len(candidates)} muc moi "
          f"(diem {by_loai['diem']}, mon_an {by_loai['mon_an']}, "
          f"cho_o {by_loai['cho_o']}), bo qua {len(skipped)} muc da co/trung.")
    print(f"Ghi {OUT_CAND} + {OUT_REPORT} (CHUA gop vao kho).")


if __name__ == "__main__":
    main()
