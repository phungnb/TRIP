#!/usr/bin/env python3
"""Đánh giá BuiTrip AI local:
1. Độ đúng phân loại ý định trên tập held-out (20% dữ liệu sinh ra, chưa từng học).
2. Chạy thử 24 câu hỏi thật (lấy từ các đợt kiểm live) — in đáp án để đối chiếu.
Chạy: python3 evaluate.py
"""
import random

from data_gen import generate
from learner import BuiTripAI
from naive_bayes import NaiveBayes
from normalize import tokens

REAL_QUESTIONS = [
    ("quy nhơn đi bằng gì", "cach_di", "Quy Nhơn"),
    ("từ TP.HCM đi Quy Nhơn bằng gì", "cach_di", "Quy Nhơn"),
    ("đi Quy Nhơn tháng mấy đẹp", "mua_dep", "Quy Nhơn"),
    ("Quy Nhơn có sân bay không", "cach_di", "Quy Nhơn"),
    ("Quy Nhơn có ga tàu không", "cach_di", "Quy Nhơn"),
    ("ăn gì ở Quy Nhơn", "an", "Quy Nhơn"),
    ("ở đâu ở Quy Nhơn", "o", "Quy Nhơn"),
    ("vé Bà Nà Hills bao nhiêu", "gia_ve", "Bà Nà"),
    ("vé Núi Bà Đen bao nhiêu", "gia_ve", "Núi Bà Đen"),
    ("vé Hội An bao nhiêu", "gia_ve", "Hội An"),
    ("đi Phú Quốc bằng gì", "cach_di", "Phú Quốc"),
    ("đi Phú Quốc tháng mấy đẹp", "mua_dep", "Phú Quốc"),
    ("đi Côn Đảo bằng gì", "cach_di", "Côn Đảo"),
    ("đi Lý Sơn bằng gì", "cach_di", "Lý Sơn"),
    ("đi Nam Du bằng gì", "cach_di", "Nam Du"),
    ("đi Măng Đen bằng gì", "cach_di", "Măng Đen"),
    ("đi Sơn Đoòng bằng gì", "cach_di", "Sơn Đoòng"),
    ("Lăng Bác mấy giờ mở cửa", "gio_mo_cua", "Lăng"),
    ("đi Quy Nhơn 2 ngày 1 đêm hết bao nhiêu", "chi_phi", "Quy Nhơn"),
    ("đi Quy Nhơn cần mang gì", "mang_gi", "Quy Nhơn"),
    ("Quy Nhơn khác Gia Lai như thế nào", "so_sanh", "Quy Nhơn"),
    ("Bình Định nay thuộc tỉnh nào", "tinh_cu", "Bình Định"),
    ("vé Eo Gió bao nhiêu", "gia_ve", "Eo Gió"),
    ("cuối tuần nên đi đâu", "chung_chung", None),
]


def main():
    rows = generate()
    random.seed(99)
    random.shuffle(rows)
    cut = int(len(rows) * 0.8)
    train_rows, test_rows = rows[:cut], rows[cut:]
    nb = NaiveBayes().fit([tokens(r["q"]) for r in train_rows],
                          [r["intent"] for r in train_rows])
    ok = sum(1 for r in test_rows if nb.predict(tokens(r["q"]))[0] == r["intent"])
    print(f"1) HELD-OUT intent accuracy: {ok}/{len(test_rows)} = {ok/len(test_rows):.1%} "
          f"(train {len(train_rows)}, test {len(test_rows)})")

    ai = BuiTripAI()
    if not ai.load():
        ai.train()
        ai.save()
    print("2) CÂU HỎI THẬT:")
    n_intent = n_entity = 0
    for q, exp_intent, exp_ent in REAL_QUESTIONS:
        r = ai.ask(q)
        ok_i = "OK " if r["intent"] == exp_intent else "SAI"
        # Thực thể đúng nếu tên mục HOẶC câu trả lời nhắc đúng điểm/tỉnh
        # (câu ăn/ở/chi phí trả theo tỉnh nên tên mục là món/khách sạn, không phải điểm)
        # So theo chuỗi đã chuẩn hóa để 'Quy Nhơn' khớp 'khu Quy Nhơn (Gia Lai)'.
        from normalize import norm_text as _nt
        ok_e = "OK " if (exp_ent is None
                         or (r["entity"] and _nt(exp_ent) in _nt(r["entity"]))
                         or _nt(exp_ent) in _nt(r["answer"])) else "SAI"
        n_intent += ok_i == "OK "
        n_entity += ok_e == "OK "
        print(f"- [{ok_i} intent={r['intent']} ({r['confidence']}) | {ok_e} entity={r['entity']}] {q}")
        print(f"  -> {r['answer'][:220]}")
    print(f"TỔNG: intent đúng {n_intent}/{len(REAL_QUESTIONS)}, "
          f"entity đúng {n_entity}/{len(REAL_QUESTIONS)}")


if __name__ == "__main__":
    main()
