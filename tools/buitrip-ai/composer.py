"""Ghép câu trả lời từ (ý định + thực thể + dữ liệu thật).

Luật bắt buộc (giống bản AI dùng Gemini, nhưng ở đây code thực thi, không phải prompt):
1. Giá/giờ/tên riêng CHỈ lấy từ dữ liệu truy hồi được. Không có thì nói không có.
2. Cấm thay dữ liệu tỉnh khác cho vùng người dùng hỏi.
3. Thiếu dữ liệu -> câu dự phòng 3 phần: nói thẳng chưa có + hướng dẫn cách khác
   cụ thể + gợi ý 2-3 câu gần nhất app trả lời được.
"""
import json

from data_gen import OLD_TO_NEW
from normalize import CITY_TO_PROVINCE, name_in_q, norm_text

with open("kien-thuc-bo-sung.json", encoding="utf-8") as f:
    EXTRA = json.load(f)


def _clean(v):
    return (v or "").strip()


def _cut(s, n):
    """Cắt ghi chú ở ranh giới từ + dấu …, không cắt giữa từ
    (lỗi cũ: ghi_chu[:160] cắt "nên thử một lần ch", "cho quán Ph")."""
    s = (s or "").strip()
    if len(s) <= n:
        return s
    t = s[:n].rsplit(" ", 1)[0]
    return (t or s[:n]) + "…"


def _city_in_query(query):
    """Thành phố người hỏi nhắc tới (khớp nguyên từ, lấy tên dài nhất):
    vd "ăn gì ở Quy Nhơn" -> "quy nhon". Trả "" nếu không nhắc thành phố nào."""
    qn = " " + norm_text(query) + " "
    best = ""
    for c in CITY_TO_PROVINCE:
        nc = norm_text(c)
        if " " + nc + " " in qn and len(nc) > len(best):
            best = nc
    return best


def _city_prov_of_query(query):
    """(thành phố, tỉnh) mà câu hỏi nhắc tới, vd ("Sa Pa", "Lào Cai").
    Dùng cho bảng tuyến: bảng chỉ có tuyến tới tỉnh, câu hỏi có thể hỏi
    1 thành phố trong tỉnh đó. So cả dạng viết liền ("sapa")."""
    qn = norm_text(query)
    qn_ns = qn.replace(" ", "")
    best = None
    for city, prov in CITY_TO_PROVINCE.items():
        nc = norm_text(city)
        if nc in qn or nc.replace(" ", "") in qn_ns:
            if best is None or len(nc) > len(norm_text(best[0])):
                best = (city, prov)
    if best:
        return best
    for old, new in OLD_TO_NEW.items():
        if norm_text(old) in qn:
            return (old, new)
    return (None, None)


def _city_display(city_norm):
    """Tên thành phố dạng có dấu từ dạng chuẩn hóa (vd 'quy nhon' -> 'Quy Nhơn')."""
    for c in CITY_TO_PROVINCE:
        if norm_text(c) == city_norm:
            return c
    return city_norm


def _has_price(e):
    g = _clean(e.get("gia"))
    return g and "chưa kiểm" not in g.lower()


def _display_place(query, tinh):
    """Hỏi tỉnh cũ/thành phố thì hiện tên cũ cho người đọc dễ hiểu
    (vd khu Quy Nhơn (Gia Lai), khu Bình Định (Gia Lai))."""
    qn = norm_text(query)
    for old, new in OLD_TO_NEW.items():
        if norm_text(old) in qn:
            return f"khu {old} ({new})"
    for city, prov in CITY_TO_PROVINCE.items():
        if norm_text(city) in qn:
            return f"khu {city} ({prov})"
    return tinh


def compose(intent, entries, query, history_entities):
    """entries: list[(score, entry)] đã truy hồi. Trả về câu trả lời tiếng Việt."""
    top = entries[0][1] if entries else None
    score = entries[0][0] if entries else 0.0

    name = top.get("ten", "") if top else ""
    tinh = top.get("tinh", "") if top else ""
    gia = _clean(top.get("gia")) if top else ""
    gio = _clean(top.get("gio")) if top else ""
    mua = _clean(top.get("mua_dep")) if top else ""
    note = _cut(top.get("ghi_chu"), 300) if top else ""

    # Món/chỗ ở/chi phí: trả theo danh sách đã lọc theo tỉnh, KHÔNG chặn bởi
    # ngưỡng điểm truy hồi (mục dài làm cosine loãng) — nhánh tự xử khi không có.
    if intent in ("an", "o"):
        kind = "món ăn" if intent == "an" else "chỗ ở"
        got = [e for _, e in entries if e.get("loai") == ("mon_an" if intent == "an" else "cho_o")]
        if got:
            # Món/chỗ ở ở khu nào thì món của khu đó lên trước (vd hỏi Quy Nhơn
            # thì bún chả cá Quy Nhơn lên trước món Pleiku) — cùng tỉnh, chỉ đổi
            # thứ tự hiển thị, không đổi thực thể trả về.
            city = _city_in_query(query)
            city_note = ""
            if city:
                got.sort(key=lambda e: 0 if city in norm_text((e.get("ten") or "") + " " + (e.get("ghi_chu") or "")) else 1)
                # Luật chung 24/11/2026: hỏi món/chỗ ở của 1 thành phố mà
                # không mục nào nhắc tới thành phố đó (vd "ăn gì ở An Khê"
                # mà kho chỉ có món Pleiku) thì nói rõ đây là gợi ý cấp
                # tỉnh, không giả vờ là món riêng của thành phố đó.
                if not any(city in norm_text((e.get("ten") or "") + " " + (e.get("ghi_chu") or "")) for e in got[:5]):
                    city_note = (f"\nChưa có danh sách riêng cho {_city_display(city)} trong kho — "
                                 f"dưới đây là gợi ý chung của tỉnh {tinh}.")
            lines = []
            for e in got[:5]:
                line = f"- {e.get('ten')}"
                if _clean(e.get("gia")):
                    line += f" ({e['gia']})"
                if _clean(e.get("ghi_chu")):
                    line += f": {_cut(e['ghi_chu'], 160)}"
                lines.append(line)
            return (f"{kind.capitalize()} ở {_display_place(query, tinh)} (theo dữ liệu app + tìm Google 23/11/2026):{city_note}\n"
                    + "\n".join(lines)
                    + "\nGiá có thể đổi; kiểm lại khi đặt.")
        if not tinh:
            return (f"App chưa có danh sách {kind} riêng đã kiểm chứng cho nơi này. "
                    f"Bạn hỏi mình theo điểm cụ thể — vd \"ăn gì ở Quy Nhơn\" thì "
                    f"mình gợi ý theo điểm đã có trong kho.")
        return (f"App chưa có danh sách {kind} riêng đã kiểm chứng cho {tinh}. "
                f"Bạn xem tab Ăn gì / Ở đâu trên trang {tinh} trong app, hoặc hỏi "
                f"mình theo điểm cụ thể — vd \"ăn gì ở Quy Nhơn\" thì mình gợi ý theo "
                f"điểm đã có trong kho.")

    if intent == "chi_phi":
        got = [e for _, e in entries if e.get("loai") == "chi_phi"]
        if got:
            return (f"Chi phí đi {_display_place(query, got[0].get('tinh'))} (ước tính theo dữ liệu app, "
                    f"kiểm 06/11/2026 — giá tùy thời điểm đặt):\n{got[0].get('ghi_chu')}")
        if top is not None and _has_price(top):
            return (f"Chi phí tham quan {name} ({tinh}): vé {gia}. Vé máy bay/xe "
                    "tùy điểm xuất phát và ngày đi nên app chưa có giá cố định — "
                    "bạn tra vé tới sân bay/ga gần nhất rồi cộng thêm.")
        return _fallback_no_data(tinh or name or "chuyến đi này", "chi phí chuyến đi")

    # Không tìm thấy gì đáng tin -> dự phòng 3 phần
    if top is None or score < 0.08:
        return ("App chưa có thông tin này.\n"
                "Bạn tra thêm theo cách này: nếu là giá vé/giờ mở cửa thì xem web của "
                "Ban quản lý điểm đó hoặc gọi trực tiếp quầy vé (giá hay đổi theo mùa); "
                "nếu là cách đi thì tra chặng tới sân bay/ga gần nhất trên web hãng bay, "
                "hãng tàu hoặc bến xe.\n"
                "Gần nhất app trả lời được, bạn thử hỏi: \"đi Quy Nhơn bằng gì\", "
                "\"vé Bà Nà Hills bao nhiêu\", \"đi Phú Quốc tháng mấy đẹp\".")

    if intent == "gia_ve":
        if _has_price(top):
            ans = f"Vé {name} ({tinh}): {gia}."
        elif gia:
            ans = (f"Vé {name} ({tinh}): {gia} — giá này app chưa kiểm chứng được, "
                   "bạn hỏi lại tại quầy trước khi đi.")
        else:
            return _fallback_no_data(name, "giá vé")
        if gio:
            ans += f" Giờ mở cửa: {gio}."
        return ans + " Giá, giờ có thể đổi; kiểm lại trước khi đi."

    if intent == "gio_mo_cua":
        if gio:
            return f"{name} ({tinh}) mở cửa: {gio}." + (f" Vé: {gia}." if gia else "")
        # Giờ đôi khi nằm trong ô giá (vd Lăng Bác: "Miễn phí. Giờ: mùa nóng...")
        if gia and "giờ" in gia.lower():
            idx = gia.lower().find("giờ")
            return f"{name} ({tinh}): {gia[idx:idx + 220]}"
        return _fallback_no_data(name, "giờ mở cửa")

    if intent == "mua_dep":
        # Mùa theo vùng cũ đã kiểm chứng — ưu tiên hơn mùa cấp tỉnh trong kho
        qn = norm_text(query)
        for m in EXTRA.get("mua_dep_vung_cu", []):
            region = m["vung"].split("(")[0].strip()
            if norm_text(region) and name_in_q(region, query):
                return (f"Đi {m['vung']} đẹp nhất: {m['mua']} "
                        f"Lưu ý: {m.get('sai_can_tranh', '')}")
        if mua:
            return f"Đi {name} ({tinh}) đẹp nhất: {mua}."
        return _fallback_no_data(name, "mùa đẹp")

    if intent == "tinh_cu":
        qn = norm_text(query)
        for old, new in OLD_TO_NEW.items():
            if norm_text(old) in qn:
                return (f"{old} cũ nay thuộc tỉnh {new} (sáp nhập từ 01/07/2025). "
                        f"Trên app, bạn tìm điểm chơi theo tên {new}, nhưng các điểm "
                        f"thuộc khu {old} cũ vẫn giữ tên cũ trong mô tả để dễ tìm.")
        return ("Tỉnh bạn hỏi vẫn giữ nguyên, không sáp nhập đợt 01/07/2025 — hoặc "
                "app chưa có dữ liệu sáp nhập cho tên này. Bạn cho mình tên tỉnh cụ "
                "thể nhé.")

    if intent == "cach_di":
        # Ưu tiên bảng tuyến đi đã kiểm chứng
        for t in EXTRA.get("tuyen_di", []):
            if name_in_q(t["den"], query) or name_in_q(t["den"], name):
                return (f"Đi {t['den']}: {t['cach']} "
                        f"(Nguồn kiểm chứng: {t['nguon']}.)")
        # Hỏi đi 1 thành phố mà bảng chỉ có tuyến tới TỈNH của thành phố
        # đó (vd "đi Sa Pa bằng gì" -> tuyến "Lào Cai", trong cách đi có
        # nhắc Sa Pa): lấy tuyến tỉnh, ghi rõ theo tuyến tới tỉnh.
        city_q, prov_q = _city_prov_of_query(query)
        if city_q and prov_q:
            for t in EXTRA.get("tuyen_di", []):
                if norm_text(t["den"]) == norm_text(prov_q):
                    return (f"Đi {city_q} (theo tuyến tới {prov_q}): {t['cach']} "
                            f"(Nguồn kiểm chứng: {t['nguon']}.)")
        if note:
            return f"Cách đi {name} ({tinh}): {note}"
        return _fallback_no_data(name, "cách đi")

    if intent == "diem_choi":
        if note:
            return f"{name} ({tinh}): {note}"
        return f"{name} ({tinh}) là điểm đến thuộc {tinh}."

    if intent == "vi_tri":
        addr = _clean(top.get("dia_chi"))
        if addr:
            return f"{name} nằm ở {addr} ({tinh})."
        return f"{name} nằm ở {tinh}." + (f" {note}" if note else "")

    if intent == "lich_trinh":
        return (f"Gợi ý lịch trình {name} ({tinh}): ngày 1 tham quan điểm chính, "
                f"ngày 2 đi điểm lân cận. {('Mùa đẹp: ' + mua + '.') if mua else ''}"
                " Lịch chi tiết theo số ngày của bạn — cho mình biết đi mấy ngày nhé.")

    if intent == "mang_gi":
        return ("Đi chơi biển/đảo mang: đồ bơi, kem chống nắng, mũ, nước uống, dép "
                "đi cát, áo khoác mỏng buổi tối. Đi núi mang: giày leo, áo mưa mỏng, "
                "đèn pin. Cụ thể theo điểm, bạn cho mình biết đi đâu nhé.")

    if intent == "so_sanh":
        # So sánh 2 mục truy hồi được: mục 1 vs mục 2 (vd Quy Nhơn biển vs Pleiku núi)
        if len(entries) >= 2:
            a, b = entries[0][1], entries[1][1]
            na, nb = a.get("ten", ""), b.get("ten", "")
            da = _clean(a.get("ghi_chu"))[:200]
            db = _clean(b.get("ghi_chu"))[:200]
            return (f"So sánh theo dữ liệu app:\n- {na} ({a.get('tinh')}): {da}\n"
                    f"- {nb} ({b.get('tinh')}): {db}\n"
                    "Muốn so kỹ hơn (mùa đẹp, chi phí, cách đi), bạn nói rõ 2 điểm muốn so nhé.")
        return (f"So sánh theo dữ liệu app: {name} ({tinh}). "
                f"{note} Cho mình biết 2 điểm cụ thể muốn so thì mình so chi tiết hơn.")

    if intent == "chung_chung":
        return ("Cuối tuần 2 ngày thì hợp đi gần: Quy Nhơn, Đà Lạt, Phú Quốc, Hạ Long "
                "đều đi được. Bạn đi từ đâu, đi mấy ngày, ngân sách khoảng bao nhiêu? "
                "Cho mình 3 ý đó là mình gợi ý lịch cụ thể.")

    # Mặc định: trả thông tin chung của mục tìm được
    bits = [f"{name} ({tinh})"]
    if gia:
        bits.append(f"vé: {gia}")
    if gio:
        bits.append(f"giờ: {gio}")
    if mua:
        bits.append(f"mùa đẹp: {mua}")
    if note:
        bits.append(note)
    return ". ".join(bits) + "."


def _fallback_no_data(name, field):
    return (f"App chưa có thông tin {field} của {name}.\n"
            f"Bạn kiểm theo cách này: xem web của Ban quản lý {name} hoặc gọi trực "
            "tiếp quầy vé — giá/giờ hay đổi theo mùa nên tra trực tiếp là chuẩn nhất.\n"
            "Gần nhất app trả lời được, bạn thử hỏi: "
            f"\"{name} có gì chơi\", \"đi {name} bằng gì\", \"{name} mùa nào đẹp\".")
