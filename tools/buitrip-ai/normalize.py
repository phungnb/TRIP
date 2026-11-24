"""Chuẩn hóa tiếng Việt cho AI local.

Quy tắc bắt buộc (đã kiểm chứng bằng lỗi thật): đổi đ->d TRƯỚC khi tách dấu NFD,
vì Đ/đ không tách ra bằng NFD — không đổi trước thì "đất" thành "at", "Đại" thành "ai".
"""
import re
import unicodedata

# Viết tắt hay gặp trong câu hỏi thật trên diễn đàn (qn = Quy Nhơn...).
# Đổi TRƯỚC khi tách token để mọi bước (phân loại, truy hồi) đều hiểu.
ALIASES = {"qn": "quy nhon", "hn": "ha noi", "sg": "sai gon",
           "hcm": "tp ho chi minh", "dn": "da nang", "dl": "da lat",
           "pq": "phu quoc", "nt": "nha trang", "hg": "ha giang",
           "cb": "cao bang", "lc": "lao cai", "hp": "hai phong"}

# Thành phố/khu du lịch -> tỉnh mới (để "ăn gì ở Quy Nhơn" tìm đúng món Gia Lai).
# Khóa là tên đã chuẩn hóa (không dấu), giá trị là tên tỉnh mới.
CITY_TO_PROVINCE = {
    # Khóa CÓ DẤU để hiện tên đẹp; lúc khớp phải qua norm_text().
    "Quy Nhơn": "Gia Lai", "Pleiku": "Gia Lai", "An Khê": "Gia Lai",
    "Nha Trang": "Khánh Hòa", "Cam Ranh": "Khánh Hòa",
    "Đà Lạt": "Lâm Đồng", "Bảo Lộc": "Lâm Đồng", "Phan Thiết": "Lâm Đồng",
    "Mũi Né": "Lâm Đồng", "La Gi": "Lâm Đồng",
    "Hội An": "Đà Nẵng", "Đà Nẵng": "Đà Nẵng",
    "Huế": "Huế", "Quảng Trị": "Quảng Trị", "Đồng Hới": "Quảng Trị",
    "Phong Nha": "Quảng Trị", "Sa Pa": "Lào Cai", "Lào Cai": "Lào Cai",
    "Hạ Long": "Quảng Ninh", "Cát Bà": "Hải Phòng", "Hải Phòng": "Hải Phòng",
    "Hà Nội": "Hà Nội", "TP Hồ Chí Minh": "TP Hồ Chí Minh",
    "Sài Gòn": "TP Hồ Chí Minh", "Vũng Tàu": "TP Hồ Chí Minh",
    "Cần Giờ": "TP Hồ Chí Minh", "Củ Chi": "TP Hồ Chí Minh",
    "Phú Quốc": "An Giang", "Rạch Giá": "An Giang", "Hà Tiên": "An Giang",
    "Nam Du": "An Giang", "Châu Đốc": "An Giang", "Long Xuyên": "An Giang",
    "Côn Đảo": "TP Hồ Chí Minh", "Phú Quý": "Lâm Đồng",
    "Măng Đen": "Quảng Ngãi", "Kon Tum": "Quảng Ngãi", "Lý Sơn": "Quảng Ngãi",
    "Quảng Ngãi": "Quảng Ngãi",
    "Buôn Ma Thuột": "Đắk Lắk", "Đắk Lắk": "Đắk Lắk", "Tuy Hòa": "Đắk Lắk",
    "Phan Rang": "Khánh Hòa", "Ninh Thuận": "Khánh Hòa",
    "Cần Thơ": "Cần Thơ", "Cà Mau": "Cà Mau", "Sóc Trăng": "Cần Thơ",
    "Bến Tre": "Vĩnh Long", "Mỹ Tho": "Đồng Tháp", "Cao Lãnh": "Đồng Tháp",
    "Sa Đéc": "Đồng Tháp", "Trà Vinh": "Vĩnh Long", "Vĩnh Long": "Vĩnh Long",
    "Tây Ninh": "Tây Ninh", "Biên Hòa": "Đồng Nai", "Vinh": "Nghệ An",
    "Thanh Hóa": "Thanh Hóa", "Sầm Sơn": "Thanh Hóa",
    "Ninh Bình": "Ninh Bình", "Tam Cốc": "Ninh Bình",
    "Hà Giang": "Tuyên Quang", "Đồng Văn": "Tuyên Quang",
    "Cao Bằng": "Cao Bằng", "Điện Biên": "Điện Biên",
    "Mộc Châu": "Sơn La", "Sơn La": "Sơn La",
    "Thái Nguyên": "Thái Nguyên", "Lạng Sơn": "Lạng Sơn",
    "Bắc Giang": "Bắc Ninh", "Bắc Ninh": "Bắc Ninh",
    "Hải Dương": "Hải Phòng", "Hưng Yên": "Hưng Yên",
    "Vĩnh Phúc": "Phú Thọ", "Phú Thọ": "Phú Thọ",
    "Hòa Bình": "Phú Thọ", "Thái Bình": "Hưng Yên",
}


def prov_key(s):
    """Chuẩn hóa tên tỉnh để so sánh: bỏ 'thành phố/tp', chỉ giữ token lõi.
    Chỉ bỏ 'thanh' khi nó đi với 'pho' ('thành phố') — 'Thanh Hóa' là
    tên tỉnh, KHÔNG được rút thành 'hoa' (lỗi thật gặp 25/11/2026: mọi câu
    có chữ 'hoa' đều khớp nhầm tỉnh Thanh Hóa)."""
    toks = norm_text(s or "").split()
    out = []
    i = 0
    while i < len(toks):
        if toks[i] == "thanh" and i + 1 < len(toks) and toks[i + 1] == "pho":
            i += 2
            continue
        if toks[i] in ("tp",):
            i += 1
            continue
        out.append(toks[i])
        i += 1
    return " ".join(out)


def same_province(tinh_entry, prov_norm):
    """tinh trong kho có phải tỉnh người hỏi không (so theo token lõi)."""
    if not tinh_entry or not prov_norm:
        return False
    a, b = prov_key(tinh_entry), prov_key(prov_norm)
    return a == b or a in b or b in a


def norm_text(s):
    s = (s or "").lower().replace("đ", "d")
    s = "".join(c for c in unicodedata.normalize("NFD", s)
                if unicodedata.category(c) != "Mn")
    s = re.sub(r"[^a-z0-9 ]+", " ", s)
    s = re.sub(r"\s+", " ", s).strip()
    for short, full in ALIASES.items():
        s = re.sub(rf"\b{short}\b", full, s)
    return s


def tokens(s):
    """Token + bigram (giúp khớp 'quy nhon', 'ba na', 'sapa'...)."""
    t = norm_text(s).split()
    feats = list(t)
    feats += [f"{a}_{b}" for a, b in zip(t, t[1:])]
    return feats
