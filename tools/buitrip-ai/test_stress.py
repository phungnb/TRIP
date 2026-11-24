#!/usr/bin/env python3
"""Stress-test Suite cho trợ lý AI BuiTrip (Tầng 4 — spec Phần I).
Chạy: python3 test_stress.py   (trong tools/buitrip-ai/)
Thoát 0 khi tất cả đạt, 1 khi có ca rớt (để CI bắt).
Kiểm song song với tools/buitrip-ai/js-port/test_stress.mjs — kết quả
phải khớp từng ca (parity Python <-> JS).
"""
import json
import sys

sys.path.insert(0, ".")

from learner import BuiTripAI


def check(name, cond, detail=""):
    print(("PASS " if cond else "FAIL ") + name + ((" — " + detail) if detail and not cond else ""))
    return bool(cond)


def fresh_ai():
    """AI mới (context rỗng) cho mỗi ca — trừ ST-03 cố tình dùng chung
    1 instance cho 2 lượt để kiểm trí nhớ ngữ cảnh."""
    ai = BuiTripAI()
    if not ai.load():
        ai.train()
    return ai


def main():
    ai = fresh_ai()
    results = []

    # ST-01: đa điều kiện + nhân số người + 3 khối
    r = ai.ask("Đi Đà Lạt 3 ngày 2 đêm cho 2 người tầm 5 triệu, thích yên tĩnh đi đâu ăn gì?")
    s = r["slots"]
    results.append(check("ST-01 province Lâm Đồng", s["province"] == "Lâm Đồng", str(s["province"])))
    results.append(check("ST-01 people=2", s["people"] == 2, str(s["people"])))
    results.append(check("ST-01 days=3", s["days"] == 3, str(s["days"])))
    results.append(check("ST-01 budget=5000000", s["budget_vnd"] == 5000000, str(s["budget_vnd"])))
    results.append(check("ST-01 vibe yen-tinh", "yen-tinh" in s["vibe_tags"], str(s["vibe_tags"])))
    results.append(check("ST-01 intents có chi_phi+di_dau+an_gi",
                         all(x in s["intents"] for x in ("chi_phi", "di_dau", "an_gi")),
                         str(s["intents"])))
    ans = r["answer"]
    results.append(check("ST-01 đủ 3 khối (Chi phí/Điểm đến/Món ăn)",
                         "💰" in ans and "🌲" in ans and "🍲" in ans, ans[:120]))

    # ST-02: không dấu + sáp nhập + đa ý định
    ai = fresh_ai()
    r = ai.ask("choi gi o vung tau 2 ngay tu sai gon")
    s = r["slots"]
    results.append(check("ST-02 province TP.HCM", s["province"] == "TP Hồ Chí Minh", str(s["province"])))
    results.append(check("ST-02 origin TP.HCM", s["origin"] == "TP Hồ Chí Minh", str(s["origin"])))
    results.append(check("ST-02 days=2", s["days"] == 2, str(s["days"])))
    results.append(check("ST-02 đủ 3 intents di_dau/lich_trinh/di_chuyen",
                         all(x in s["intents"] for x in ("di_dau", "lich_trinh", "di_chuyen")),
                         str(s["intents"])))

    # ST-03: trí nhớ ngữ cảnh (multi-turn)
    ai2 = fresh_ai()
    ai2.ask("Ở Huế ăn gì ngon?")
    r = ai2.ask("Quán nào mở khuya sau 22h?")
    s = r["slots"]
    results.append(check("ST-03 lượt 2 giữ province Huế",
                         s["province"] == "Huế", str(s["province"])))
    results.append(check("ST-03 time_filter after 22.0",
                         s["time_filter"] == {"type": "after", "hour": 22.0},
                         str(s["time_filter"])))

    # ST-04: bẫy tàu hỏa Tam Đảo
    ai = fresh_ai()
    r = ai.ask("Từ Hà Nội đi Tam Đảo bằng tàu hỏa hết bao nhiêu?")
    s = r["slots"]
    results.append(check("ST-04 phát hiện bẫy (premise no_train)",
                         r["premise"] is not None and r["premise"]["type"] == "no_train",
                         str(r["premise"])))
    results.append(check("ST-04 câu đính chính lên đầu câu trả lời",
                         r["answer"].startswith("Tam Đảo hiện không có tuyến tàu hỏa"),
                         r["answer"][:80]))

    # ST-05: bẫy Chùa Hương Ninh Bình
    ai = fresh_ai()
    r = ai.ask("Chùa Hương ở Ninh Bình mở cửa mấy giờ?")
    s = r["slots"]
    results.append(check("ST-05 phát hiện bẫy (premise wrong_province)",
                         r["premise"] is not None and r["premise"]["type"] == "wrong_province",
                         str(r["premise"])))
    results.append(check("ST-05 đính chính Hà Nội trước giờ mở cửa",
                         r["answer"].startswith("Chùa Hương thuộc địa phận Hà Nội"),
                         r["answer"][:80]))

    n_pass = sum(results)
    print(f"\nKết quả: {n_pass}/{len(results)} đạt")
    # Xuất JSON để so parity với bản JS
    out = {"pass": n_pass, "total": len(results)}
    with open("test_stress_result.json", "w", encoding="utf-8") as f:
        json.dump(out, f)
    return 0 if n_pass == len(results) else 1


if __name__ == "__main__":
    sys.exit(main())
