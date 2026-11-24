"""BuiTrip AI — Tầng 1+2: trích xuất slot, bộ nhớ hội thoại, kiểm tra tiền đề.

Triển khai song song tuyệt đối với tools/buitrip-ai/js-port/slots.js.
Mọi thay đổi logic ở đây PHẢI đổi y hệt bên JS (và ngược lại) — kiểm
bằng bộ stress test (tools/buitrip-ai/test_stress.py / .mjs).
"""
import re

from normalize import CITY_TO_PROVINCE, norm_text, prov_key

# Alias địa danh -> tỉnh mới. CHỈ dùng khi câu hỏi KHÔNG nêu tên tỉnh rõ ràng
# (vd "Tam Đảo" -> Phú Thọ khi không có tên tỉnh khác). Tên tỉnh nêu rõ
# trong câu luôn thắng alias — để Premise Check bắt được ca "Chùa Hương
# ở Ninh Bình" (người hỏi ghi Ninh Bình, Chùa Hương thật ở Hà Nội).
_SPOT_TO_PROVINCE = {
    "tam dao": "Phú Thọ",
    "ta xua": "Sơn La",
    "moc chau": "Sơn La",
    "chua huong": "Hà Nội",
    "huong son": "Hà Nội",
}

_EXTRA_ALIAS = {
    "tphcm": "TP Hồ Chí Minh",
    "tp hcm": "TP Hồ Chí Minh",
    "ho chi minh": "TP Hồ Chí Minh",
    "sai gon": "TP Hồ Chí Minh",
    "vung tau": "TP Hồ Chí Minh",
    "ba ria vung tau": "TP Hồ Chí Minh",
    "da lat": "Lâm Đồng",
    "mui ne": "Lâm Đồng",
    "phan thiet": "Lâm Đồng",
    "phu quoc": "An Giang",
    "nha trang": "Khánh Hòa",
    "quy nhon": "Gia Lai",
    "hoi an": "Đà Nẵng",
    "sa pa": "Lào Cai",
    "ha long": "Quảng Ninh",
}


def _prov_norm(name):
    return prov_key(name or "")


_CITY_NORM = {norm_text(c) for c in CITY_TO_PROVINCE}


def _is_city_or_overview(name):
    """Mục chỉ là tên thành phố hoặc mục tổng quan tỉnh — không phải spot."""
    n = norm_text((name or "").split("(")[0].strip())
    return n in _CITY_NORM or "tong quan" in norm_text(name or "")


def detect_province(qn, provinces, skip_origin_text=None):
    """Tìm tỉnh trong câu hỏi (đã chuẩn hóa). Trả về tên tỉnh chuẩn hoặc None.
    Thứ tự: (1) tên tỉnh nêu rõ, (2) thành phố -> tỉnh, (3) alias địa danh.
    skip_origin_text: đoạn 'từ X' đã tách ra — không dùng nó để suy tỉnh đích."""
    text = qn
    if skip_origin_text:
        text = text.replace(skip_origin_text, " ")
    # (1) tên tỉnh nêu rõ (so theo token lõi để 'TP.HCM' khớp 'tp ho chi minh')
    for prov in provinces or []:
        if prov and _prov_norm(prov) in text:
            return prov
    # (2) thành phố/khu du lịch -> tỉnh (trừ alias địa danh)
    for alias, prov in _EXTRA_ALIAS.items():
        if alias in text:
            return prov
    for city, prov in CITY_TO_PROVINCE.items():
        if norm_text(city) in text:
            return prov
    # (3) alias địa danh (chỉ khi không có tên tỉnh/thành nào)
    for alias, prov in _SPOT_TO_PROVINCE.items():
        if alias in text:
            return prov
    return None


_TRANSPORT_WORDS = [
    ("tau-hoa", ["tau hoa", "tau hoa", "tàu hỏa", "tàu hoả", "tau lua", "duong sat"]),
    ("may-bay", ["may bay", "máy bay", "hang khong", "chuyen bay", "bay "]),
    ("xe-khach", ["xe khach", "xe khách", "limousine", "xe giuong nam", "xe giường nằm"]),
    ("xe-may", ["xe may", "xe máy", "thue xe may", "thuê xe máy"]),
    ("o-to", ["o to", "ô tô", "o-to", "taxi", "grab", "xe hoi", "xe hơi"]),
]


def _parse_money(qn):
    """'tầm 5 triệu'->5000000, '5k'->5000, '2tr'->2000000, '500k'->500000."""
    m = re.search(r"(\d+(?:[.,]\d+)?)\s*(trieu|triệu|tr|k|nghin|nghìn|dong|đồng|d)\b", qn)
    if not m:
        return None
    val = float(m.group(1).replace(",", "."))
    unit = m.group(2)
    if unit in ("trieu", "triệu", "tr"):
        return int(val * 1000000)
    if unit == "k":
        return int(val * 1000)
    if unit in ("nghin", "nghìn"):
        return int(val * 1000)
    return int(val)


def _parse_time_filter(qn):
    m = re.search(r"sau\s+(\d{1,2})\s*h", qn)
    if m:
        return {"type": "after", "hour": float(m.group(1))}
    if "sang som" in qn or "sáng sớm" in qn:
        return {"type": "between", "hours": [4.0, 7.0]}
    if "mo khuya" in qn or "mở khuya" in qn or "khuya" in qn:
        return {"type": "after", "hour": 22.0}
    if "ban dem" in qn or "ban đêm" in qn or "ve dem" in qn or "về đêm" in qn:
        return {"type": "after", "hour": 20.0}
    return None


_VIBE_WORDS = [
    ("yen-tinh", ["yen tinh", "yên tĩnh", "yen binh", "yên bình", "thu gian", "thư giãn"]),
    ("khong-dong", ["khong dong", "không đông", "vang", "vắng", "it nguoi", "ít người"]),
    ("gia-dinh", ["gia dinh", "gia đình", "tre em", "trẻ em", "con nho", "con nhỏ"]),
    ("san-may", ["san may", "săn mây", "may", "mây"]),
    ("mo-khuya", ["mo khuya", "mở khuya", "khuya", "ve dem", "về đêm"]),
]

_INTENT_WORDS = [
    ("di_dau", ["choi gi", "chơi gì", "di dau", "đi đâu", "co gi choi", "có gì chơi",
                "diem nao", "điểm nào", "tham quan", "di choi", "đi chơi"]),
    ("an_gi", ["an gi", "ăn gì", "mon ngon", "món ngon", "dac san", "đặc sản",
               "quan an", "quán ăn", "an o dau", "ăn ở đâu"]),
    ("chi_phi", ["het bao nhieu", "hết bao nhiêu", "chi phi", "chi phí", "gia bao nhieu",
                 "giá bao nhiêu", "tien", "tiền", "bao nhieu tien", "bao nhiêu tiền",
                 "het bao nhieu tien", "ngan sach", "ngân sách"]),
    ("lich_trinh", ["lich trinh", "lịch trình", "may ngay", "mấy ngày", "ngay", "ngày",
                    "dem", "đêm", "3n2d", "2n1d", "ke hoach", "kế hoạch"]),
    ("di_chuyen", ["di bang gi", "đi bằng gì", "di chuyen", "di chuyển", "tu ", "từ ",
                   "xuat phat", "xuất phát", "phuong tien", "phương tiện", "tau hoa",
                   "tàu hỏa", "may bay", "máy bay", "xe khach", "xe khách"]),
    ("cho_o", ["o dau", "ở đâu", "cho o", "chỗ ở", "khach san", "khách sạn",
               "homestay", "nghi o dau", "nghỉ ở đâu", "phong", "phòng"]),
    ("gio_mo_cua", ["mo cua", "mở cửa", "dong cua", "đóng cửa", "gio mo", "giờ mở",
                    "may gio", "mấy giờ"]),
    ("mua_dep", ["mua nao dep", "mùa nào đẹp", "thang may dep", "tháng mấy đẹp",
                 "di thang may", "đi tháng mấy", "mua dep", "mùa đẹp"]),
]


def extract_slots(query, kb=None, provinces=None):
    """Trích xuất slot + đa ý định từ câu hỏi. Trả về dict SlotResult."""
    qn = norm_text(query or "")
    slots = {"province": None, "spot": None, "origin": None, "days": None,
             "people": None, "budget_vnd": None, "transport": None,
             "time_filter": None, "vibe_tags": [], "intents": []}
    # origin TRƯỚC (chỉ bắt khi có "từ X" / "xuất phát từ X") — để khi suy
    # tỉnh đích thì loại đoạn 'từ X' ra (vd 'Từ Hà Nội đi Tam Đảo' -> đích
    # là Tam Đảo/Phú Thọ, không phải Hà Nội).
    origin_text = None
    m = re.search(r"(xuat phat tu|xuất phát từ|tu|từ)\s+([a-z ]{3,30}?)(?:\s+di|\s+den|\s+đến|\s*$)", qn)
    if m:
        origin_text = m.group(0)
        cand = m.group(2).strip()
        prov = detect_province(cand, provinces)
        slots["origin"] = prov or cand
    # province (loại đoạn origin ra khi suy tỉnh đích)
    slots["province"] = detect_province(qn, provinces, skip_origin_text=origin_text)
    # spot: tên địa danh trong kho xuất hiện trong câu hỏi
    # (cắt phần trong ngoặc TRƯỚC khi chuẩn hóa — norm_text đã bỏ dấu
    # ngoặc nên split('(') sau norm_text là vô dụng; lỗi thật 25/11/2026)
    # Bỏ qua tên thành phố/mục tổng quan tỉnh (vd 'Hà Nội' không phải spot;
    # lỗi thật 25/11/2026: 'Từ Hà Nội đi Tam Đảo' bắt spot='ha noi' oan).
    if kb:
        best = None
        for e in kb:
            raw = (e.get("ten") or "").split("(")[0].strip()
            base = norm_text(raw)
            if _is_city_or_overview(e.get("ten")):
                continue
            if len(base) >= 4 and base in qn:
                if best is None or len(base) > len(best):
                    best = base
        if best:
            slots["spot"] = best
    # spot ngoài kho (vd Tam Đảo, Tà Xùa chưa có trong kho): bắt theo tên
    # địa danh nổi tiếng để Premise Check vẫn làm việc.
    if not slots["spot"]:
        for alias in _SPOT_TO_PROVINCE:
            if alias in qn:
                slots["spot"] = alias
                break
    # days
    m = re.search(r"(\d+)\s*ngay", qn)
    if m:
        slots["days"] = int(m.group(1))
    elif "di trong ngay" in qn or "đi trong ngày" in qn or "trong ngay" in qn:
        slots["days"] = 1
    # people
    m = re.search(r"(\d+)\s*(?:nguoi|người|ban|bạn)", qn)
    if m:
        slots["people"] = int(m.group(1))
    elif re.search(r"nhom\s+(\d+)", qn):
        slots["people"] = int(re.search(r"nhom\s+(\d+)", qn).group(1))
    # budget
    slots["budget_vnd"] = _parse_money(qn)
    # transport
    for code, words in _TRANSPORT_WORDS:
        if any(w in qn for w in words):
            slots["transport"] = code
            break
    # time_filter
    slots["time_filter"] = _parse_time_filter(qn)
    # vibe_tags
    for code, words in _VIBE_WORDS:
        if any(w in qn for w in words) and code not in slots["vibe_tags"]:
            slots["vibe_tags"].append(code)
    # intents (đa ý định)
    for code, words in _INTENT_WORDS:
        if any(w in qn for w in words) and code not in slots["intents"]:
            slots["intents"].append(code)
    # Có ngân sách -> cũng là ý định chi phí (vd 'tầm 5 triệu' không kèm
    # chữ 'tiền' vẫn phải hiện khối Chi phí trong ST-01).
    if slots["budget_vnd"] is not None and "chi_phi" not in slots["intents"]:
        slots["intents"].append("chi_phi")
    return slots


# ---------------------------------------------------------------------------
# Tầng 2 — SessionContext
# ---------------------------------------------------------------------------
class SessionContext:
    def __init__(self):
        self.province = None
        self.area_cluster = None
        self.spot = None
        self.origin = None
        self.days = None
        self.people = None
        self.budget_vnd = None
        self.vibe_tags = []
        self.last_intents = []
        self.last_item_ids = []

    def to_dict(self):
        return {"province": self.province, "area_cluster": self.area_cluster,
                "spot": self.spot, "origin": self.origin, "days": self.days,
                "people": self.people, "budget_vnd": self.budget_vnd,
                "vibe_tags": list(self.vibe_tags),
                "last_intents": list(self.last_intents),
                "last_item_ids": list(self.last_item_ids)}

    def update(self, slots):
        """Có tỉnh/điểm mới -> reset (giữ people/origin nếu hợp logic).
        Không có -> kế thừa, ghi đè slot mới xuất hiện."""
        new_prov = slots.get("province")
        new_spot = slots.get("spot")
        if new_prov or new_spot:
            if new_prov and new_prov != self.province:
                self.province = new_prov
                self.spot = new_spot
                self.days = slots.get("days")
                self.area_cluster = None
            elif new_spot and new_spot != self.spot:
                self.spot = new_spot
                self.days = slots.get("days")
            else:
                self.province = new_prov or self.province
                self.spot = new_spot or self.spot
            if slots.get("people") is not None:
                self.people = slots["people"]
            if slots.get("origin"):
                self.origin = slots["origin"]
            if slots.get("budget_vnd") is not None:
                self.budget_vnd = slots["budget_vnd"]
        else:
            if slots.get("days") is not None:
                self.days = slots["days"]
            if slots.get("people") is not None:
                self.people = slots["people"]
            if slots.get("origin"):
                self.origin = slots["origin"]
            if slots.get("budget_vnd") is not None:
                self.budget_vnd = slots["budget_vnd"]
        if slots.get("time_filter") is not None:
            self.time_filter = slots["time_filter"]
        else:
            self.time_filter = getattr(self, "time_filter", None)
        for t in slots.get("vibe_tags") or []:
            if t not in self.vibe_tags:
                self.vibe_tags.append(t)
        if slots.get("intents"):
            self.last_intents = list(slots["intents"])
        return self

    def effective_slots(self, slots):
        """Gộp slot lượt này với context đã kế thừa (slot mới thắng)."""
        out = dict(slots)
        if not out.get("province"):
            out["province"] = self.province
        if not out.get("spot"):
            out["spot"] = self.spot
        if not out.get("origin"):
            out["origin"] = self.origin
        if out.get("days") is None:
            out["days"] = self.days
        if out.get("people") is None:
            out["people"] = self.people
        if out.get("budget_vnd") is None:
            out["budget_vnd"] = self.budget_vnd
        if not out.get("time_filter"):
            out["time_filter"] = getattr(self, "time_filter", None)
        tags = list(self.vibe_tags)
        for t in out.get("vibe_tags") or []:
            if t not in tags:
                tags.append(t)
        out["vibe_tags"] = tags
        return out


# ---------------------------------------------------------------------------
# Tầng 3 — Chuẩn hóa bản ghi kho (suy ra trường mới từ dữ liệu sẵn có)
# ---------------------------------------------------------------------------
_HOUR_RE = re.compile(r"(\d{1,2})[:h](\d{2})?\s*[–\-~]\s*(\d{1,2})[:h](\d{2})?")
_HOUR_SINGLE = re.compile(r"(\d{1,2})[:h](\d{2})?")
_MONEY_RE = re.compile(r"(\d{1,3}(?:\.\d{3})+|\d+)\s*(?:–|-)\s*(\d{1,3}(?:\.\d{3})+|\d+)")
_MONEY_ONE = re.compile(r"(\d{1,3}(?:\.\d{3})+|\d+)\s*đ")
_MONTH_RE = re.compile(r"[Tt]háng\s+(\d{1,2})\s*[–\-]\s*(\d{1,2})")


def _num(x):
    return int(str(x).replace(".", ""))


def parse_hours(gio_text):
    """'~7:00–19:00' -> (7.0, 19.0). '24/7' -> (0.0, 24.0). Không rõ -> (None, None)."""
    t = (gio_text or "")
    if "24/7" in t or "24/24" in t:
        return (0.0, 24.0)
    m = _HOUR_RE.search(t)
    if m:
        oh = float(m.group(1)) + (float(m.group(2) or 0) / 60.0)
        ch = float(m.group(3)) + (float(m.group(4) or 0) / 60.0)
        return (oh, ch)
    return (None, None)


def parse_cost(gia_text):
    """Trích chi phí/người trung bình (VNĐ) từ chuỗi giá. Không có số -> None."""
    t = (gia_text or "").replace("~", "")
    if re.search(r"miễn phí", t, re.I) and not re.search(r"\d", t):
        return 0
    m = _MONEY_RE.search(t)
    if m:
        return (_num(m.group(1)) + _num(m.group(2))) // 2
    m = _MONEY_ONE.search(t)
    if m:
        return _num(m.group(1))
    return None


def parse_cost_low(gia_text):
    """Đầu thấp của khoảng giá (để ước tính theo ngân sách: người dùng nói
    'tầm 5 triệu' thì hiện mức tối thiểu đạt được, không phải trung bình).
    '1.800.000–4.150.000đ' -> 1800000. Không có số -> None."""
    t = (gia_text or "").replace("~", "")
    if re.search(r"miễn phí", t, re.I) and not re.search(r"\d", t):
        return 0
    m = _MONEY_RE.search(t)
    if m:
        return _num(m.group(1))
    m = _MONEY_ONE.search(t)
    if m:
        return _num(m.group(1))
    return None


def parse_season(mua_dep_text):
    """'Tháng 10–12' -> [10,11,12]. Trả về dict {best_months, description}."""
    t = (mua_dep_text or "")
    months = []
    for m in _MONTH_RE.finditer(t):
        a, b = int(m.group(1)), int(m.group(2))
        if 1 <= a <= 12 and 1 <= b <= 12:
            cur = a
            while True:
                months.append(cur)
                if cur == b:
                    break
                cur = cur % 12 + 1
                if len(months) > 12:
                    break
    seen = []
    for x in months:
        if x not in seen:
            seen.append(x)
    return {"best_months": seen, "description": t[:200]}


def enrich_entry(e):
    """Bổ sung trường chuẩn hóa cho 1 bản ghi kho (không đổi dữ liệu gốc)."""
    oh, ch = parse_hours(e.get("gio") or "")
    out = dict(e)
    out["aliases"] = [norm_text(e.get("ten") or "")]
    out["tags"] = []
    loai = e.get("loai") or ""
    if loai == "mon_an":
        out["tags"].append("am-thuc")
    elif loai == "cho_o":
        out["tags"].append("luu-tru")
    elif not loai:
        out["tags"].append("dia-danh")
    out["hours_raw"] = e.get("gio") or ""
    out["open_hour"] = oh
    out["close_hour"] = ch
    out["transports_available"] = []
    out["season"] = parse_season(e.get("mua_dep") or "")
    out["cost_per_person_avg"] = parse_cost(e.get("gia") or "")
    return out


# Địa danh núi/đảo nổi tiếng KHÔNG có ga tàu (để Premise Check bắt bẫy tàu hỏa).
# Tam Đảo là ca ST-04 trong spec; Tà Xùa cùng nhóm (đường núi, chỉ xe khách/ô tô).
NO_TRAIN_SPOTS = {"tam dao", "tà xùa", "ta xua", "pha luong", "pha đin"}


def premise_check(slots, kb):
    """Trả về dict {type, message} nếu phát hiện tiền đề sai, else None.
    - Sai địa giới: spot thuộc tỉnh A nhưng câu hỏi gán tỉnh B.
    - Tàu hỏa không khả thi: transport=tau-hoa nhưng spot/tỉnh không có tàu."""
    q_prov = slots.get("province")
    spot = slots.get("spot")
    transport = slots.get("transport")
    if spot and q_prov and kb:
        for e in kb:
            raw = (e.get("ten") or "").split("(")[0].strip()
            if norm_text(raw) == spot:
                real = e.get("tinh")
                if real and _prov_norm(real) != _prov_norm(q_prov):
                    hours = e.get("gio") or ""
                    oh, ch = parse_hours(hours)
                    hrs = ""
                    if oh is not None and ch is not None:
                        hrs = " Thời gian mở cửa đón khách từ %s đến %s hàng ngày." % (
                            _fmt_hour(oh), _fmt_hour(ch))
                    return {"type": "wrong_province",
                            "message": "%s thuộc địa phận %s, không phải %s.%s" % (
                                _pretty_spot(e.get("ten")), real, q_prov, hrs)}
                break
    if transport == "tau-hoa" and spot:
        if spot in NO_TRAIN_SPOTS or "tam dao" in spot:
            return {"type": "no_train",
                    "message": "Tam Đảo hiện không có tuyến tàu hỏa đến trực tiếp. "
                               "Bạn có thể đi xe khách hoặc limousine từ Hà Nội với "
                               "chi phí khoảng 150.000 – 200.000 VNĐ/lượt."}
    return None


def _fmt_hour(h):
    hh = int(h)
    mm = int(round((h - hh) * 60))
    return "%02d:%02d" % (hh, mm)


def _pretty_spot(ten):
    return (ten or "").split("(")[0].strip() or (ten or "")
