# -*- coding: utf-8 -*-
"""Cập nhật 10 file .md: thêm cột SĐT vào bảng 'Ở đâu' + 3 mục mới cuối file.
Đọc dữ liệu từ JSON đã cập nhật (đảm bảo khớp 100%).
"""
import json, re
from pathlib import Path

BASE = Path.home() / "workspace" / "your_files" / "du-lieu-34-tinh"
TINH = ["tp-ho-chi-minh", "da-nang", "hue", "can-tho", "quang-ninh",
        "ninh-binh", "lao-cai", "phu-tho", "quang-tri", "ca-mau"]

def split_row(line):
    # '| a | b |' -> ['a', 'b']
    cells = line.strip().strip("|").split("|")
    return [c.strip() for c in cells]

def join_row(cells):
    return "| " + " | ".join(cells) + " |"

for slug in TINH:
    data = json.loads((BASE / f"{slug}.json").read_text(encoding="utf-8"))
    mp = BASE / f"{slug}.md"
    lines = mp.read_text(encoding="utf-8").split("\n")

    # --- tìm bảng 'Ở đâu' ---
    idx_o_dau = next(i for i, l in enumerate(lines) if l.startswith("## ") and "Ở đâu" in l)
    hdr = next(i for i in range(idx_o_dau, len(lines)) if lines[i].startswith("|") and "Khoảng giá" in lines[i])
    h_cells = split_row(lines[hdr])
    price_i = next(i for i, c in enumerate(h_cells) if "giá" in c.lower())
    name_i = next(i for i, c in enumerate(h_cells) if c.strip() == "Tên")
    # chèn cột SĐT sau cột giá
    h_cells.insert(price_i + 1, "SĐT")
    lines[hdr] = join_row(h_cells)
    # dòng phân cách
    sep = hdr + 1
    s_cells = split_row(lines[sep])
    assert all(set(c) <= set("-: ") for c in s_cells), f"{slug}: dòng phân cách lạ: {lines[sep]}"
    s_cells.insert(price_i + 1, "---")
    lines[sep] = join_row(s_cells)
    # các dòng dữ liệu
    phones = {c["ten"]: (c["dien_thoai"] or "chưa tra được") for c in data["cho_o"]}
    n_row = 0
    i = sep + 1
    while i < len(lines) and lines[i].startswith("|"):
        cells = split_row(lines[i])
        ten = cells[name_i]
        assert ten in phones, f"{slug}: tên trong bảng .md không khớp JSON: {ten!r}"
        cells.insert(price_i + 1, phones[ten])
        lines[i] = join_row(cells)
        n_row += 1
        i += 1
    assert n_row == len(data["cho_o"]), f"{slug}: bảng có {n_row} dòng, JSON có {len(data['cho_o'])} chỗ ở"
    # ghi chú SĐT ngay sau đoạn in đậm 'Tất cả...' của mục Ở đâu
    note = "SĐT trong bảng kiểm tra ngày 08/11/2026 (xem cột SĐT; chỗ ghi \"chưa tra được\" là chưa tìm được số tin cậy — xem lý do chi tiết trong file .json, trường `nguon_dien_thoai`)."
    j = next(i for i in range(idx_o_dau, hdr) if lines[i].startswith("**"))
    lines.insert(j + 1, "")
    lines.insert(j + 2, note)

    # --- 3 mục mới cuối file ---
    nums = [int(m.group(1)) for l in lines for m in [re.match(r"## (\d+)\.", l)] if m]
    n0 = max(nums) if nums else 0
    ktm = data["khi_troi_mua"]
    ccd = data["cho_cap_doi"]
    mt = data["mua_thang"]
    sec = []
    sec.append("")
    sec.append(f"## {n0+1}. Trời mưa thì đi đâu")
    sec.append("")
    sec.append("Đi được khi trời mưa (chọn từ các địa danh đã có trong file — bảo tàng, chợ có mái, chùa/nhà thờ/đền có mái, suối khoáng, địa đạo):")
    sec.append("")
    for d in ktm["diem"]:
        sec.append(f"- {d}")
    sec.append("")
    sec.append(f"> Dặn: {ktm['dan']}")
    sec.append("")
    sec.append(f"## {n0+2}. Cho cặp đôi")
    sec.append("")
    if ccd["cho_o"]:
        sec.append("Chỗ ở hợp cặp đôi (theo trường \"hợp với ai\" trong dữ liệu):")
        sec.append("")
        for t in ccd["cho_o"]:
            sec.append(f"- {t}")
    else:
        sec.append("Chỗ ở hợp cặp đôi: không có chỗ ở nào trong file ghi hợp cặp đôi — danh sách để trống, không bịa thêm.")
    sec.append("")
    sec.append("Điểm hợp cặp đôi (từ các địa danh đã có trong file):")
    sec.append("")
    for d in ccd["diem"]:
        sec.append(f"- {d}")
    sec.append("")
    sec.append(f"## {n0+3}. Mùa + tháng đẹp nhất")
    sec.append("")
    sec.append(f"- Tháng đẹp nhất: {mt['thang_dep_nhat']}")
    sec.append(f"- Nguồn: {mt['nguon']} (ngày kiểm {mt['ngay_kiem']})")
    # đảm bảo file kết thúc bằng 1 dòng trống trước khi nối
    while lines and lines[-1] == "":
        lines.pop()
    lines.extend(sec)
    lines.append("")
    mp.write_text("\n".join(lines), encoding="utf-8")
    print(f"{slug}: bảng {n_row} dòng SĐT OK; thêm mục {n0+1}–{n0+3}")

print("MD OK")
