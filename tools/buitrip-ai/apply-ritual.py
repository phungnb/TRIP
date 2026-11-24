#!/usr/bin/env python3
"""Áp lại bài học từ phản hồi sau khi huấn luyện lại (bản VPS).

Nghi thức chuẩn (Task 20c): nạp model vừa train, nạp 176 câu hỏi thật
làm extra_rows, áp bài học Lăng Bác (feedback -> tăng điểm token tên điểm
+ huấn luyện lại + lưu). Chạy sau train.py, trước evaluate.py/prune.
"""
import json

from learner import BuiTripAI

if __name__ == "__main__":
    ai = BuiTripAI()
    assert ai.load("model.json"), "không nạp được model.json"
    ai.extra_rows = json.load(open("train-cau-hoi-that.json", encoding="utf-8"))
    ai.feedback("Lăng Bác mấy giờ mở cửa", "gio_mo_cua",
                "Lăng Chủ tịch Hồ Chí Minh (Lăng Bác)")
    print("OK apply-ritual: extra_rows =", len(ai.extra_rows),
          "| boosts =", len(ai.retriever.boosts))
