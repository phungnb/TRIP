# Câu hỏi kiểm chứng sau khi gộp 348 mục đã dịch vào kho (chạy sau retrain).
# Mỗi câu: hỏi -> kỳ vọng thực thể đúng + số liệu đúng (giá/giờ chỉ từ kho).
# "so" có thể là 1 chuỗi hoặc tuple các chuỗi chấp nhận được (câu "ăn gì"
# liệt kê 5 món — chỉ cần 1 món mới trong đó xuất hiện).
# Chạy: python3 cau_hoi_kiem_chung_gop_350.py

CAU_HOI = [
    # Quy Nhơn (mới gộp)
    ("Tháp Bánh Ít giá bao nhiêu", "Tháp Bánh Ít", "10.000"),
    ("Tháp Dương Long ở đâu", "Tháp Dương Long", "Tây Sơn"),
    ("ăn gì ở Quy Nhơn", None, ("Bún chả cá", "Bánh xèo tôm nhảy", "Nem nướng", "Bánh hỏi cháo lòng", "Bún tôm Châu Trúc", "Bánh canh chả cá", "Chè Nhớ", "Cua Huỳnh Đế", "Bún rạm", "Bánh ít lá gai")),
    ("Trung tâm Khám phá Khoa học Quy Nhơn giá vé", "Trung tâm Khám phá Khoa học", "120.000"),
    # Phú Quốc (mới gộp)
    ("Bãi Sao Phú Quốc ở đâu", "Bãi Sao", "An Giang"),
    ("Nhà tù Phú Quốc giá vé", "Nhà tù Phú Quốc", "miễn phí"),
    ("ăn gì ở Phú Quốc", None, ("Gỏi cá trích", "Bún quậy", "Ghẹ Hàm Ninh", "Nhum biển", "Bún kèn", "Bánh canh chả cá", "Bánh tét mật cật", "Bánh khéo", "Tiết canh cua", "Cơm ghẹ")),
    # Huế (mới gộp)
    ("Bánh Khoái Hạnh Huế giá bao nhiêu", "Bánh Khoái Hạnh", "20.000"),
    ("massage người khiếm thị ở Huế", "Niềm Tin", "Phan Bội Châu"),
    # Hà Nội (mới gộp)
    ("Phù điêu bắt sống phi công Mỹ ở đâu", "Phù điêu bắt sống phi công Mỹ", "Thanh Niên"),
    ("Bảo tàng Mỹ thuật Việt Nam giá vé", "Bảo tàng Mỹ thuật Việt Nam", "40.000"),
    # Đà Lạt (mới gộp)
    ("Cà phê Tùng Đà Lạt ở đâu", "Cà phê Tùng", "Hòa Bình"),
    ("Thác Pongour giá vé", "Thác Pongour", "40.000"),
    ("Dinh Bảo Đại I có mở cửa không", "Dinh Bảo Đại I", "mở"),
    # Hồi quy: câu cũ vẫn đúng sau gộp
    ("quy nhơn đi bằng gì", "Quy Nhơn", "Phù Cát"),
    ("Lăng Bác mấy giờ mở cửa", "Lăng Chủ tịch Hồ Chí Minh", "7:30"),
    ("chợ đêm Quy Nhơn ở đâu", "Chợ đêm Quy Nhơn", "Lê Duẩn"),
]

if __name__ == "__main__":
    import json

    from learner import BuiTripAI

    ai = BuiTripAI()
    print("load:", ai.load("model.json"))
    ai.extra_rows = json.load(open("train-cau-hoi-that.json", encoding="utf-8"))
    ok = 0
    for q, ent, so in CAU_HOI:
        r = ai.ask(q)
        ans = r["answer"]
        ans_low = ans.lower()
        sos = so if isinstance(so, tuple) else (so,)
        so_ok = any(s.lower() in ans_low for s in sos)
        # ent=None: câu "ăn gì" liệt kê nhiều món, không có 1 thực thể duy nhất
        ent_ok = True if ent is None else (ent.split()[0] in ans or ent in (r.get("entity") or ""))
        good = ent_ok and so_ok
        ok += 1 if good else 0
        print(("OK  " if good else "SAI "), "|", q, "->", (r.get("entity") or "")[:45],
              "| so:", so if isinstance(so, str) else "1 trong 10 mon moi",
              "co" if so_ok else "KHONG", "| ent:", "dung" if ent_ok else "SAI")
    print(f"KIEM CHUNG GOP 350: {ok}/{len(CAU_HOI)}")
