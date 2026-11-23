#!/usr/bin/env python3
"""Cắt gọn model + sinh file dữ liệu cho app (JS).

Vào: model.json (2,6 MB), kho-kien-thuc.json.
Ra:  ai-model.json — chỉ thứ JS cần lúc trả lời:
       - nb.labels, nb.log_prior, nb.unk
       - nb.vocab: mảng token (1 lần, thay vì lặp 14 lần làm key dict)
       - nb.log_prob: mảng 14 hàng, mỗi hàng là mảng số theo đúng thứ tự vocab
         (làm tròn 3 chữ số thập phân — đủ cho argmax + độ tin cậy)
       - boosts: [[token, chi_so_muc, diem], ...] (bài học từ phản hồi)
     BỎ: extra_rows (chỉ dùng lúc huấn luyện), tfidf_q_idf (không dùng lúc
     trả lời — retriever JS tự tính TF-IDF từ kb.json như bản Python).
     kb.json — toàn bộ kho, JSON gọn 1 dòng (Vercel gzip khi phục vụ).

Chạy: python3 prune_model.py
Kiểm: node kiem-tra-ai.js (so 24 câu thật + 175 câu phủ với bản Python).
"""
import json

MODEL_IN = "model.json"
KB_IN = "kho-kien-thuc.json"
MODEL_OUT = "ai-model.json"
KB_OUT = "kb.json"


def main():
    m = json.load(open(MODEL_IN, encoding="utf-8"))
    nb = m["nb"]
    labels = nb["labels"]
    vocab = nb["vocab"]
    log_prob = nb["log_prob"]
    rows = []
    for lab in labels:
        d = log_prob[lab]
        rows.append([round(float(d.get(t, nb["unk"][lab])), 3) for t in vocab])
    out = {
        "labels": labels,
        "log_prior": {k: round(float(v), 3) for k, v in nb["log_prior"].items()},
        "unk": {k: round(float(v), 3) for k, v in nb["unk"].items()},
        "vocab": vocab,
        "log_prob": rows,
        "boosts": m.get("boosts", []),
    }
    json.dump(out, open(MODEL_OUT, "w", encoding="utf-8"), ensure_ascii=False,
              separators=(",", ":"))
    kb = json.load(open(KB_IN, encoding="utf-8"))
    json.dump(kb, open(KB_OUT, "w", encoding="utf-8"), ensure_ascii=False,
              separators=(",", ":"))
    import os
    import gzip
    for f in (MODEL_OUT, KB_OUT):
        raw = open(f, "rb").read()
        print(f"{f}: {len(raw)/1024:.0f} KB, gzip {len(gzip.compress(raw))/1024:.0f} KB")


if __name__ == "__main__":
    main()
