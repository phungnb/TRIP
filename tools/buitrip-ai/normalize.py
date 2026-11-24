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
    """Chuẩn hóa tên tỉnh để so sánh: bỏ 'thành phố/tp', chỉ giữ token lõi."""
    toks = [t for t in norm_text(s or "").split()
            if t not in ("thanh", "pho", "tp")]
    return " ".join(toks)


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


def name_in_q(name, q):
    """Tên (vd 'Sa Pa', 'Sơn Đoòng') có trong câu hỏi không — so cả dạng
    viết liền ('sapa') vì câu hỏi thật hay viết liền tên 2 chữ (gặp
    24/11/2026: 'đi sapa bằng gì' không khớp bảng tuyến vì 'sa pa' có
    dấu cách còn câu hỏi viết liền)."""
    qn = norm_text(q)
    nn = norm_text(name)
    return nn in qn or nn.replace(" ", "") in qn.replace(" ", "")


# Tên tỉnh cũ (sáp nhập 01/07/2025) — để tách dạng viết liền ("binhdinh").
# (Trùng OLD_TO_NEW trong data_gen.py; normalize.py không import data_gen
# để tránh vòng tròn.)
OLD_PROVINCES = ("Bình Định", "Quảng Bình", "Kiên Giang", "Bà Rịa-Vũng Tàu",
                 "Đắk Nông", "Phú Yên", "Tiền Giang", "Long An", "Hậu Giang",
                 "Bình Dương", "Bình Phước", "Bắc Kạn", "Quảng Nam", "Bình Thuận")

# Dạng viết liền của tên tỉnh/thành 2 chữ ("sapa" = "sa pa"): câu hỏi thật
# hay viết liền; tách ra trong tokens() để khớp với dữ liệu (kho ghi "Sa Pa").
# Chỉ tách khi token ĐÚNG bằng dạng viết liền của 1 tên có thật — không tách
# "la", "an", "du" đứng riêng (chúng là từ thường).
JOINED_PLACE = {}
for _nm in (list(CITY_TO_PROVINCE.keys()) + list(CITY_TO_PROVINCE.values())
            + list(OLD_PROVINCES)):
    _t = norm_text(_nm).split()
    if len(_t) > 1:
        JOINED_PLACE["".join(_t)] = _t


def tokens(s):
    """Token + bigram (giúp khớp 'quy nhon', 'ba na', 'sapa'...)."""
    t = norm_text(s).split()
    # Tách tên viết liền ("sapa" -> "sa", "pa") để khớp dữ liệu.
    exp = []
    for tok in t:
        exp.extend(JOINED_PLACE.get(tok, [tok]))
    feats = list(exp)
    feats += [f"{a}_{b}" for a, b in zip(exp, exp[1:])]
    return feats


# Từ hỏi/chức năng + từ theo ý định + loại địa danh chung + tính từ chung.
# Dùng để tìm "token cụ thể" trong câu hỏi (luật chặn khớp giả, 24/11/2026):
# token nào còn lại sau khi bỏ các từ này và tên tỉnh/thành phố thì là thứ
# cụ thể người hỏi nhắc đích danh (vd "quốc lộ 51" còn lại "quoc lo 51").
# Bỏ sót 1 từ ở đây thì câu đó chỉ thành "chung chung" (không chặn) — an toàn;
# bỏ thừa 1 từ thì câu đó có thể bị chặn nhầm -> rơi về trợ lý cũ (cũng an toàn).
QUESTION_WORDS = {
    # Từ chức năng / từ hỏi chung
    "co", "o", "la", "cua", "va", "voi", "nao", "gi", "may", "gio", "mo",
    "bao", "nhieu", "the", "cho", "den", "tu", "di", "ve", "tren", "duoi",
    "trong", "ngoai", "nay", "kia", "do", "ay", "thi", "ma", "se", "da",
    "dang", "hay", "hoac", "neu", "khi", "vi", "de", "bang", "cach",
    "sao", "con", "vay", "roi", "dau", "luc", "thoi", "nua", "khong",
    "ko", "duoc",
    # Từ xưng hô / nhờ vả / từ nối hay gặp trong câu hỏi diễn đàn
    "du", "het", "nen", "nhu", "cung", "ca", "tat", "em", "anh", "ban",
    "minh", "ta", "bac", "cac", "nguoi", "xin", "hoi", "nho", "giup",
    "van", "tour", "combo", "lai",
    # Từ đệm trong câu hỏi diễn đàn (thêm 24/11/2026 — không có chúng,
    # "e xin ít đc ăn ngon ở qn" và "cho mh hỏi côn đảo nằm ở đâu" bị
    # chặn nhầm vì còn token đệm; CỐ TÌNH không thêm "ba"/"tam"/"xem"/
    # "gui"/"c" — chúng sẽ mở chặn cho mảnh bình luận không rõ chỗ,
    # và "tam" là token tên "Tam Cốc"/"Tam Đảo")
    "e", "mh", "a", "vs", "dc", "it", "nhung", "ad", "nam",
    "hien", "phai", "kinh", "nghiem", "review", "z", "khu",
    # Giới từ hướng/thời gian hay gặp ("vào tháng mấy", "ra đảo", "lên núi")
    "vao", "ra", "len", "xuong", "qua",
    # Từ theo ý định (giá/giờ/mùa/cách đi/ăn/ở/điểm chơi/lịch trình/chi phí/...)
    "gia", "ve", "gio", "mo", "cua", "dong", "mua", "dep", "thang",
    "cach", "di", "bang", "an", "diem", "choi", "lich", "trinh", "chi",
    "phi", "mang", "so", "sanh", "tinh", "cu", "vi", "tri", "chung",
    "tham", "quan", "dia", "danh", "den", "lai", "thue", "xe", "may",
    "taxi", "grab", "dat", "phong", "khach", "san", "homestay", "resort",
    "nha", "nghi", "luu", "tru", "ngu", "sang", "toi", "hang", "dac",
    "san", "mon", "ngon", "uong",
    # Loại địa danh chung (không phải tên riêng): biển, núi, thác, chùa...
    "bien", "nui", "thac", "ho", "chua", "dao", "lang", "bai", "den",
    "hang", "cho", "suoi", "doi", "deo", "cau", "bao", "tang", "check",
    "in", "song", "ao", "tich", "hon",
    # Loại tuyến đường chung ("quốc lộ", "tỉnh lộ" — số hiệu mới là
    # thứ cụ thể: "Quốc lộ 14" còn lại "14", khác "Quốc lộ 51" còn "51")
    "quoc", "lo",
    # Tính từ chung (ngon/rẻ/đẹp/nổi tiếng...) — không phải tên riêng
    "ngon", "re", "dat", "dep", "noi", "tieng", "nhat", "tot", "xau",
    "rong", "hep", "cao", "thap", "dai", "ngan", "lon", "nho", "moi",
    "trua", "chieu", "dem", "ngay", "tuan", "som", "muon", "nhanh", "cham", "de", "kho",
    "tien", "loi", "gan", "xa", "thuan",
    # Từ phương tiện chung — CỐ TÌNH KHÔNG có "ga"/"tau"/"bay" (gỡ
    # 24/11/2026): "vé máy bay Quy Nhơn bao nhiêu" bị trả giá của
    # quán Jollibee vì "bay" thành từ chung nên luật chặn không chạy;
    # còn "Quy Nhơn có ga tàu/sân bay không" đã được bảng tuyến EXTRA
    # cứu (luật chặn cho qua khi điểm đến có trong bảng tuyến).
    # "lao" (cù lao — từ chung chỉ cù lao, vd "Cù Lao Xanh" khớp nhầm
    # "Cù lao Mây" chỉ nhờ cụm "cu lao" — gặp 24/11/2026; "Lào Cai"
    # không ảnh hưởng vì tên tỉnh/thành được bỏ ra khỏi token cụ thể
    # theo tên, còn _named_in_question so token thô nên vẫn khớp)
    "lao",
}
