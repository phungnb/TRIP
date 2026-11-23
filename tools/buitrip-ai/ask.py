#!/usr/bin/env python3
"""Hỏi BuiTrip AI local: python3 ask.py "quy nhơn đi bằng gì"
Chế độ tương tác: python3 ask.py (gõ câu hỏi, gõ 'sua: <ý định đúng> | <tên điểm đúng>'
để sửa sai cho AI học, gõ 'thoat' để dừng)."""
import sys

from learner import BuiTripAI


def main():
    ai = BuiTripAI()
    if not ai.load():
        ai.train()
        ai.save()
    if len(sys.argv) > 1:
        r = ai.ask(" ".join(sys.argv[1:]))
        print(r["answer"])
        print(f"[intent={r['intent']} conf={r['confidence']} entity={r['entity']} score={r['score']}]")
        return
    print("BuiTrip AI local (không API, không mạng). Gõ câu hỏi, 'thoat' để dừng.")
    print("Sửa sai cho AI học: sua: <ý định đúng> | <tên điểm đúng>  (vd: sua: gia_ve | Núi Bà Đen)")
    last_q = ""
    while True:
        try:
            q = input("Bạn: ").strip()
        except EOFError:
            break
        if not q:
            continue
        if q.lower() in ("thoat", "exit", "quit"):
            break
        if q.startswith("sua:"):
            try:
                _, rest = q.split(":", 1)
                intent, ent = [x.strip() for x in rest.split("|")]
                ai.feedback(last_q, intent, ent or None)
                print(f"AI: Đã học — lần sau hỏi \"{last_q}\" sẽ trả theo ý định {intent}.")
            except ValueError:
                print("AI: Sai cú pháp. Mẫu: sua: gia_ve | Núi Bà Đen")
            continue
        last_q = q
        r = ai.ask(q)
        print("AI:", r["answer"])
        print(f"    [intent={r['intent']} conf={r['confidence']} entity={r['entity']}]")


if __name__ == "__main__":
    main()
