#!/usr/bin/env python3
"""Thử nghiệm: thêm câu hỏi có làm AI trả lời giống GPT hơn không?

1. Mở rộng dữ liệu huấn luyện từ 7.712 -> ~100.000 câu, đo lại độ đúng ý định
   (held-out) + 24 câu hỏi thật.
2. Nạp 175 câu hỏi thật từ diễn đàn/group (đã lọc tiếng Việt), đo độ phủ:
   tỉ lệ câu được trả lời (intent conf >= 0.9 và truy hồi score >= 0.3)
   TRƯỚC và SAU khi nạp.
3. In mẫu câu trả lời trước/sau để thấy diễn đạt có thay đổi không.
Chạy: python3 run_scale_test.py
"""
import json
import random
import time

from data_gen import generate
from evaluate import REAL_QUESTIONS
from learner import BuiTripAI
from naive_bayes import NaiveBayes
from normalize import tokens


def main():
    t0 = time.time()
    big = generate(big=True)
    print(f"1) DU LIEU MO RONG: {len(big)} cau (sinh trong {time.time()-t0:.1f}s)")
    random.seed(99)
    random.shuffle(big)
    cut = int(len(big) * 0.8)
    nb = NaiveBayes().fit([tokens(r["q"]) for r in big[:cut]],
                          [r["intent"] for r in big[:cut]])
    test = big[cut:]
    ok = sum(1 for r in test if nb.predict(tokens(r["q"]))[0] == r["intent"])
    print(f"   HELD-OUT 100k: {ok}/{len(test)} = {ok/len(test):.1%} "
          f"(so voi 7.712 cau: 98,9%)")

    ai = BuiTripAI()
    ai.train(big)
    print(f"   Train xong trong {time.time()-t0:.1f}s tong")
    n_i = n_e = 0
    for q, exp_intent, exp_ent in REAL_QUESTIONS:
        r = ai.ask(q)
        n_i += r["intent"] == exp_intent
        n_e += exp_ent is None or (r["entity"] and exp_ent.lower() in r["entity"].lower())
    print(f"   24 CAU THAT (100k): intent {n_i}/24, entity {n_e}/24 "
          f"(so voi 7.712 cau: 24/24 va 22/24)")

    # 2) Cau hoi that tu dien dan/group
    real = json.load(open("cau-hoi-that-vn.json", encoding="utf-8"))

    def coverage(model):
        good = 0
        for r in real:
            a = model.ask(r["q"])
            if a["confidence"] >= 0.9 and a["score"] >= 0.3:
                good += 1
        return good

    before = coverage(ai)
    print(f"2) DO PHU 175 CAU THAT: truoc khi nap: {before}/175 = {before/len(real):.1%}")
    # Nap cau that: nhan y dinh bang mo hinh lon + thuc the bang truy hoi
    extra = []
    for r in real:
        a = ai.ask(r["q"])
        extra.append({"q": r["q"], "intent": a["intent"],
                      "entities": [a["entity"]] if a["entity"] else []})
    ai.extra_rows = extra
    ai.train(big)
    after = coverage(ai)
    print(f"   DO PHU 175 CAU THAT: sau khi nap: {after}/175 = {after/len(real):.1%}")
    print("3) MAU CAU TRA LOI (sau khi mo rong + nap cau that):")
    for q in ["quy nhơn đi bằng gì", "đi Nam Du bằng gì",
              "e xin ít đc ăn ngon ở qn vs ạ,", "cho mh hỏi côn đảo nằm ở đâu vậy"]:
        print("   Q:", q)
        print("   A:", ai.ask(q)["answer"][:300].replace("\n", " "))
    json.dump(extra, open("train-cau-hoi-that.json", "w", encoding="utf-8"),
              ensure_ascii=False, indent=1)
    ai.save("model-100k.json")
    print("   Da luu: train-cau-hoi-that.json, model-100k.json")


if __name__ == "__main__":
    main()
