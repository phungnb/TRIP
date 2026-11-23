"""Sinh dữ liệu huấn luyện từ kho kiến thức — AI học từ dữ liệu, không hardcode.

Mỗi ý định có mẫu câu với chỗ trống {ten} (điểm), {tinh} (tỉnh/vùng cũ),
{tinh2} (tỉnh khác, cho câu so sánh). Sinh ra hàng nghìn câu hỏi kèm nhãn ý định
+ thực thể đúng — mô hình Naive Bayes học từ đó.
Muốn AI giỏi hơn: thêm mẫu câu hoặc thêm điểm vào kho rồi chạy lại train.py.
"""
import json
import random

KB_PATH = "kho-kien-thuc.json"

# Tỉnh cũ -> tỉnh mới (sáp nhập 01/07/2025). Tên cũ phải học được như tên tỉnh.
OLD_TO_NEW = {
    "Bình Định": "Gia Lai", "Quảng Bình": "Quảng Trị", "Hà Giang": "Tuyên Quang",
    "Kiên Giang": "An Giang", "Bà Rịa-Vũng Tàu": "TP Hồ Chí Minh",
    "Đắk Nông": "Lâm Đồng", "Kon Tum": "Quảng Ngãi", "Phú Yên": "Đắk Lắk",
    "Ninh Thuận": "Khánh Hòa", "Bến Tre": "Vĩnh Long", "Tiền Giang": "Đồng Tháp",
    "Long An": "Tây Ninh", "Hậu Giang": "Cần Thơ", "Sóc Trăng": "Cần Thơ",
    "Bình Dương": "TP Hồ Chí Minh", "Bình Phước": "Đồng Nai",
    "Thái Bình": "Hưng Yên", "Bắc Kạn": "Thái Nguyên", "Vĩnh Phúc": "Phú Thọ",
    "Quảng Nam": "Đà Nẵng", "Bình Thuận": "Lâm Đồng",
}

TEMPLATES = {
    "gia_ve": ["vé {ten} bao nhiêu", "giá vé {ten}", "{ten} vé bao nhiêu tiền",
               "vào {ten} mất bao nhiêu", "giá vào {ten}", "vé vào {ten} bao nhiêu"],
    "gio_mo_cua": ["{ten} mấy giờ mở cửa", "{ten} mở cửa lúc mấy giờ",
                   "giờ mở cửa {ten}", "{ten} đóng cửa mấy giờ", "{ten} mở cửa đến mấy giờ"],
    "mua_dep": ["đi {ten} tháng mấy đẹp", "{ten} mùa nào đẹp", "đi {tinh} tháng mấy đẹp",
                "{tinh} mùa nào đẹp", "{tinh} đi tháng mấy đẹp", "đi {tinh} mùa nào đẹp"],
    "cach_di": ["đi {ten} bằng gì", "{ten} đi bằng gì", "đi {tinh} bằng gì",
                "{tinh} có sân bay không", "{tinh} có ga tàu không",
                "từ Hà Nội đi {tinh} bằng gì", "từ TP.HCM đi {tinh} bằng gì",
                "từ Đà Nẵng đi {tinh} bằng gì", "đi {ten} bằng tàu hoả được không"],
    "an": ["ăn gì ở {tinh}", "ăn gì ở {ten}", "{tinh} có món gì ngon",
           "quán ăn ngon ở {ten}", "đặc sản {tinh} là gì"],
    "o": ["ở đâu ở {tinh}", "ở đâu ở {ten}", "{tinh} ở khách sạn nào",
          "chỗ ở {ten}", "khách sạn ở {tinh}"],
    "diem_choi": ["{tinh} có gì chơi", "đi {tinh} có gì chơi", "{ten} có gì chơi",
                  "{tinh} chơi gì", "đi {tinh} chơi gì", "{tinh} có điểm nào hay"],
    "lich_trinh": ["đi {tinh} mấy ngày", "lịch trình đi {ten} 2 ngày",
                   "đi {ten} 2 ngày 1 đêm", "lịch trình {tinh} 3 ngày 2 đêm"],
    "chi_phi": ["đi {ten} hết bao nhiêu", "đi {tinh} 2 ngày 1 đêm hết bao nhiêu",
                "chi phí đi {ten}", "đi {tinh} hết bao nhiêu tiền"],
    "mang_gi": ["đi {ten} cần mang gì", "đi {tinh} mang gì", "đi {tinh} cần mang gì"],
    "so_sanh": ["{tinh} khác {tinh2} như thế nào", "{ten} khác {ten2} thế nào",
                "đi {tinh} hay {tinh2} hơn"],
    "tinh_cu": ["{tinh} nay thuộc tỉnh nào", "{tinh} cũ nay thuộc tỉnh nào",
                "{tinh} sáp nhập vào tỉnh nào", "{tinh} giờ thuộc tỉnh nào",
                "{tinh} thuộc tỉnh nào"],
    "vi_tri": ["{ten} nằm ở đâu", "{ten} ở đâu", "{ten} ở tỉnh nào",
               "{ten} thuộc tỉnh nào", "{ten} nằm ở tỉnh nào",
               "{ten} nằm ở đâu vậy", "cho mình hỏi {ten} nằm ở đâu"],
    "chung_chung": ["cuối tuần nên đi đâu", "đi chơi 2 ngày nên đi đâu",
                    "đi đâu chơi cuối tuần", "cuối tuần đi đâu", "cuối tuần đi đâu chơi",
                    "nên đi đâu cuối tuần", "đi đâu chơi", "gợi ý đi chơi cuối tuần",
                    "2 ngày cuối tuần đi đâu", "cuối tuần này đi đâu"],
}

FILLERS = ["", "cho mình hỏi ", "cho hỏi ", "mình muốn hỏi ", "bạn ơi "]


def load_kb():
    with open(KB_PATH, encoding="utf-8") as f:
        return json.load(f)


def generate(seed=7, big=False):
    """big=True: dùng toàn bộ điểm trong kho + mọi cách mở đầu -> ~100.000 câu."""
    random.seed(seed)
    kb = load_kb()
    places = [e for e in kb if e.get("ten") and "(tổng quan)" not in e["ten"]
              and not e.get("loai")]  # chỉ địa danh, không lấy món/chỗ ở/chi phí
    provinces = sorted({e["tinh"] for e in kb if e.get("tinh")})
    old_names = list(OLD_TO_NEW)
    rows = []
    # Mẫu theo điểm (giới hạn 120 điểm để tập train vừa phải, vẫn đủ đa dạng)
    sample_places = places if big else random.sample(places, min(120, len(places)))
    fillers = FILLERS if big else [None]  # big: nhân bản mọi cách mở đầu

    def with_fillers(q):
        if big:
            return [f + q for f in FILLERS]
        return [random.choice(FILLERS) + q]
    for intent, tmpls in TEMPLATES.items():
        for t in tmpls:
            if "{ten2}" in t:
                for _ in range(6):
                    a, b = random.sample(sample_places, 2)
                    q = t.format(ten=a["ten"], ten2=b["ten"],
                                 tinh=a["tinh"], tinh2=b["tinh"])
                    for qq in with_fillers(q):
                        rows.append({"q": qq, "intent": intent,
                                     "entities": [a["ten"], b["ten"]]})
                continue
            if "{tinh2}" in t:
                for _ in range(8):
                    a, b = random.sample(provinces, 2)
                    q = t.format(tinh=a, tinh2=b, ten="")
                    for qq in with_fillers(q):
                        rows.append({"q": qq, "intent": intent,
                                     "entities": [a, b]})
                continue
            if "{ten}" in t:
                for p in sample_places:
                    q = t.format(ten=p["ten"], tinh=p["tinh"])
                    for qq in with_fillers(q):
                        rows.append({"q": qq, "intent": intent,
                                     "entities": [p["ten"]]})
            elif "{tinh}" in t:
                for prov in provinces + old_names:
                    q = t.format(tinh=prov, ten="")
                    for qq in with_fillers(q):
                        rows.append({"q": qq, "intent": intent,
                                     "entities": [prov]})
            else:
                # Mẫu không có chỗ trống (vd "cuối tuần nên đi đâu") — thêm trực tiếp
                for qq in with_fillers(t):
                    rows.append({"q": qq, "intent": intent, "entities": []})
    random.shuffle(rows)
    # Cân bằng lớp: ý định chung_chung ít mẫu nên nhân bản để không bị lớp "ở" lấn
    extra = [r for r in rows if r["intent"] == "chung_chung"] * 8
    rows = rows + extra
    random.shuffle(rows)
    return rows


if __name__ == "__main__":
    rows = generate()
    with open("train.jsonl", "w", encoding="utf-8") as f:
        for r in rows:
            f.write(json.dumps(r, ensure_ascii=False) + "\n")
    from collections import Counter
    print("TRAIN ROWS:", len(rows), Counter(r["intent"] for r in rows))
