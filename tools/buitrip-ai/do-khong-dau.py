# Đo câu hỏi KHÔNG DẤU: 24 câu thật bỏ dấu + câu không dấu trong 175 câu diễn đàn.
import json, re, unicodedata
from learner import BuiTripAI
from normalize import norm_text
from evaluate import REAL_QUESTIONS

def bo_dau(s):
    s = s.replace("đ", "d").replace("Đ", "D")
    return "".join(c for c in unicodedata.normalize("NFD", s)
                   if unicodedata.category(c) != "Mn")

ai = BuiTripAI()
ai.load("model.json")

# 1) 24 câu thật, bỏ dấu
ok_i = ok_e = 0
for q, exp_intent, exp_entity in REAL_QUESTIONS:
    a = ai.ask(bo_dau(q))
    if a["intent"] == exp_intent:
        ok_i += 1
    if norm_text(exp_entity) in norm_text(a["entity"] or "") or \
       norm_text(exp_entity) in norm_text(a["answer"]):
        ok_e += 1
    else:
        print("MISS (khong dau):", bo_dau(q), "| intent:", a["intent"], "entity:", a["entity"])
print(f"24 cau that BO DAU: intent {ok_i}/24, entity {ok_e}/24")

# 2) 175 câu diễn đàn: tách câu không dấu / có dấu, đo độ phủ từng nhóm
real = json.load(open("cau-hoi-that-vn.json", encoding="utf-8"))
def co_dau(s):
    return bo_dau(s) != s
kd = [r for r in real if not co_dau(r["q"])]
cd = [r for r in real if co_dau(r["q"])]
def phu(lst):
    g = 0
    for r in lst:
        a = ai.ask(r["q"])
        if a["confidence"] >= 0.9 and a["score"] >= 0.3:
            g += 1
    return g
print(f"175 cau: khong dau {len(kd)} cau -> phu {phu(kd)}/{len(kd)}; co dau {len(cd)} cau -> phu {phu(cd)}/{len(cd)}")
print("Vi du cau khong dau:")
for r in kd[:12]:
    print("  -", r["q"])
