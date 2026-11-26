"""BuiTrip AI local — bộ não: học, nhớ, trả lời, tự học từ phản hồi.

Không gọi API nào, không cần mạng, không cần key. Chạy hoàn toàn bằng Python stdlib.
- train(): học phân loại ý định (Naive Bayes) + lập chỉ mục truy hồi (TF-IDF).
- ask(): phân loại ý định -> truy hồi kiến thức -> ghép câu trả lời (composer).
- feedback(): người dùng sửa sai -> thêm ví dụ huấn luyện + cộng điểm truy hồi cho
  token->thực thể đúng -> huấn luyện lại. Đây là cách AI "học" thêm sau mỗi lần sai.
"""
import json
import math
import os
import re

from composer import compose
from data_gen import OLD_TO_NEW, generate
from naive_bayes import NaiveBayes
from normalize import CITY_TO_PROVINCE, norm_text, prov_key, tokens
from retriever import Retriever
from slots import (SessionContext, enrich_entry, extract_slots, parse_cost,
                   parse_cost_low, parse_hours, premise_check)
from tfidf import Tfidf

MODEL_PATH = "model.json"

_CITY_NORM = {norm_text(c) for c in CITY_TO_PROVINCE}


def _named_in_question(name, feat_set):
    """Tên mục (hoặc phần mô tả trong ngoặc) có đầy đủ trong câu hỏi không.
    Vd "Massage Niềm Tin (massage người khiếm thị)" khớp câu "massage người
    khiếm thị ở Huế" nhờ phần trong ngoặc, dù "Niềm Tin" không có trong câu.
    Nới thêm: tên dài mà câu hỏi chỉ nhắc phần đầu (vd "Phù điêu bắt sống
    phi công Mỹ" thiếu "John McCain") vẫn khớp khi chung ≥4 token và ≥60%
    số token tên (gặp 24/11/2026: luật khớp đầy đủ bỏ sót mục này)."""
    name = name or ""
    parts = [name.split("(")[0].strip()]
    m = re.search(r"\(([^)]*)\)", name)
    if m:
        parts.append(m.group(1))
    for p in parts:
        toks = set(tokens(p))
        if not toks:
            continue
        if toks <= feat_set:
            return True
        shared = toks & feat_set
        if len(shared) >= 4 and len(shared) / len(toks) >= 0.6:
            return True
    return False


def _is_city_or_overview(name):
    """Mục chỉ là tên thành phố hoặc mục tổng quan tỉnh (vd "Quy Nhơn",
    "Huế (tổng quan)") — hỏi "ở đâu ở Quy Nhơn" vẫn là hỏi chỗ ở."""
    n = norm_text((name or "").split("(")[0].strip())
    return n in _CITY_NORM or "tong quan" in norm_text(name or "")


def round3(x):
    """Làm tròn 3 chữ số thập phân, NỬA LÊN (khớp Math.round của JS).
    round(x, 3) của Python làm tròn nửa chẵn nên lệch 0.001 với JS ở đúng
    ngưỡng .0005 — thực tế 6/31 câu probe chạm ngưỡng này (vd 0.654/0.655),
    nên phải dùng cùng một luật để giữ parity (25/11/2026)."""
    return math.floor(x * 1000 + 0.5) / 1000


# Từ khóa lưu trú RÕ RÀNG (chuỗi đã chuẩn hóa, khớp trọn từ). Chỉ khi câu
# có 1 trong các cụm này mới được coi là hỏi chỗ ở — "ở đâu" đứng một mình
# KHÔNG đủ (lỗi thật 25/11/2026: "Rượu bầu đá ở đâu" ra homestay).
_LODGING_WORDS = ("khach san", "homestay", "resort", "nha nghi",
                   "ngu o dau", "nghi o dau", "o dau ngon", "o dau re",
                   "o dau tai", "o tai", "cho o", "o dem", "qua dem",
                   "ngu dem", "ngu lai", "o lai", "thue phong")


def _has_lodging_word(qn):
    padded = " " + (qn or "") + " "
    return any((" " + w + " ") in padded for w in _LODGING_WORDS)


def _where_subject(q):
    """Chủ thể X của câu '[X] ở đâu' (giữ dấu như người hỏi, vd 'Rượu bầu đá').
    Bỏ các từ hỏi ở đầu/cuối ('ở đâu', 'cho mình hỏi'...). Trả None khi
    không còn chủ thể (vd câu chỉ có 'ở đâu')."""
    s = (q or "").strip()
    s = re.sub(r"[?!.]+$", "", s).strip()
    s = re.sub(r"^(cho\s+(minh\s+)?hoi|cho\s+hoi|xin\s+hoi)\s+", "", s, flags=re.I).strip()
    s = re.sub(r"\s*(ở\s+đâu|o\s+dau)\s*", " ", s, flags=re.I).strip()
    s = re.sub(r"^(ở|đâu|o|dau)\s+", "", s, flags=re.I).strip()
    s = re.sub(r"\s+(ở|đâu|o|dau)$", "", s, flags=re.I).strip()
    return s or None


class BuiTripAI:
    def __init__(self):
        with open("kho-kien-thuc.json", encoding="utf-8") as f:
            self.kb = json.load(f)
        self.retriever = Retriever(self.kb)
        self.nb = NaiveBayes()
        self.tfidf_q = Tfidf()
        self.extra_rows = []  # câu hỏi + nhãn do người dùng sửa (học thêm)
        self.history_entities = []
        # Tầng 2 — bộ nhớ hội thoại có cấu trúc (SessionContext).
        self.ctx = SessionContext()
        # Tầng 3 — kho đã chuẩn hóa (suy trường mới từ dữ liệu sẵn có).
        self.kb_enriched = [enrich_entry(e) for e in self.kb]
        # Tên tỉnh mới (từ kho) để nhận diện tỉnh trong câu hỏi
        self.provinces = sorted({prov_key(e.get("tinh")) for e in self.kb
                                 if e.get("tinh") and not e.get("loai")})
        self.province_names = sorted({e.get("tinh") for e in self.kb
                                      if e.get("tinh")})

    def _province_of(self, q):
        """Trả về tên tỉnh mới (dạng chuẩn hóa) nếu câu hỏi nhắc 1 tỉnh/tỉnh cũ/thành phố.
        Thứ tự: (1) tên tỉnh mới nêu rõ, (2) thành phố, (3) tỉnh cũ — để
        'Vĩnh Long' thắng 'Long An' trong 'Vĩnh Long ăn gì' (tên tỉnh mới
        phải thắng tỉnh cũ; lỗi thật 25/11/2026: Vĩnh Long bị neo về Tây Ninh).
        Khớp trọn từ (đệm khoảng trắng) — 'vinh' trong 'vinh long' không được
        gán về Nghệ An."""
        qn = norm_text(q)
        padded = " " + qn + " "
        for prov in self.provinces:
            if prov and (" " + prov + " ") in padded:
                return prov
        for city, prov in CITY_TO_PROVINCE.items():
            if (" " + norm_text(city) + " ") in padded:
                return prov
        for old, new in OLD_TO_NEW.items():
            if (" " + norm_text(old) + " ") in padded:
                return new
        return None

    def train(self, rows=None):
        if rows is None:
            rows = generate()
        rows = rows + self.extra_rows
        X = [tokens(r["q"]) for r in rows]
        y = [r["intent"] for r in rows]
        self.nb.fit(X, y)
        self.tfidf_q.fit(X)
        return len(rows)

    def ask(self, q):
        # --- Tầng 1+2: trích slot, cập nhật context, gộp slot hiệu dụng ---
        raw_slots = extract_slots(q, self.kb, self.province_names)
        self.ctx.update(raw_slots)
        slots = self.ctx.effective_slots(raw_slots)
        # --- Tầng 1: kiểm tra tiền đề sai (đính chính lên đầu nếu có) ---
        premise = premise_check(slots, self.kb)
        feats = tokens(q)
        intent, probs = self.nb.predict(feats)
        conf = probs.get(intent, 0.0)
        # Câu hỏi tiếp nối ("thế...", "còn...", "từ đó...") -> dùng thực thể vừa nhắc
        qn = norm_text(q)
        follow = qn.startswith(("the ", "con ", "tu do ", "the con ", "o do ")) \
            or "the " in qn[:12]
        entries = self.retriever.search(q, topn=3)
        if intent == "vi_tri":
            # NB đoán "vị trí" nhưng câu hỏi thực chất là hỏi chỗ ở hoặc
            # hỏi "[tỉnh/thành] ở đâu": lật về "o" (trừ khi nhắc đích danh
            # 1 chỗ ở cụ thể — "Khách sạn Sakura ở đâu" vẫn là vị trí
            # của khách sạn đó). Lỗi thật 25/11/2026: "ngủ ở đâu tại Hội An"
            # ra vị trí Phố cổ Hội An; "Đà Lạt ở đâu" ra Ga Đà Lạt.
            qn = norm_text(q)
            x0 = _where_subject(q)
            xn0 = norm_text(x0) if x0 else ""
            if x0 and (xn0 in _CITY_NORM or xn0 in set(self.provinces)
                       or "tong quan" in xn0):
                intent = "o"
            elif _has_lodging_word(qn):
                feat_set = set(feats)
                if not any(e.get("loai") == "cho_o"
                           and _named_in_question(e.get("ten"), feat_set)
                           for _s, e in entries):
                    intent = "o"
        if intent == "o":
            # Ý định chỗ ở CHỈ kích hoạt khi câu có từ khóa lưu trú RÕ RÀNG
            # (khách sạn, homestay, ngủ ở đâu, ở đâu tại [tỉnh]...), hoặc
            # hỏi "[tỉnh/thành] ở đâu". "[X] ở đâu" mà X là món/đặc sản/
            # địa danh thì TUYỆT ĐỐI KHÔNG trả danh sách homestay; X không
            # có trong kho thì trả thẳng "App chưa có thông tin về [X]".
            # Lỗi thật 25/11/2026: "Rượu bầu đá ở đâu" ra homestay Hà Giang.
            qn = norm_text(q)
            if not _has_lodging_word(qn):
                x = _where_subject(q)
                xn = norm_text(x) if x else ""
                if x and (xn in _CITY_NORM or xn in set(self.provinces)
                          or "tong quan" in xn):
                    # "[tỉnh/thành] ở đâu" -> vẫn là hỏi chỗ ở ở đó.
                    pass
                else:
                    feat_set = set(feats)
                    flipped = False
                    for j, (_s, e) in enumerate(entries):
                        if e.get("loai") == "cho_o":
                            continue
                        if _is_city_or_overview(e.get("ten")):
                            continue
                        # Khớp đích danh (đủ token / >=4 token) hoặc khớp
                        # >= 2 token tên ("Bún chả" -> "Bún chả Hà Nội"):
                        # đều là hỏi vị trí của X, không phải hỏi chỗ ở.
                        if _named_in_question(e.get("ten"), feat_set) or \
                                len(set(tokens(e.get("ten") or "")) & feat_set) >= 2:
                            intent = "vi_tri"
                            entries = [entries[j]] + entries[:j] + entries[j + 1:]
                            flipped = True
                            break
                    if not flipped and not follow and x:
                        return {"answer": "App chưa có thông tin về %s." % x,
                                "intent": intent, "confidence": round3(conf),
                                "entity": None, "entity_prov": None,
                                "score": 0.0, "slots": slots, "premise": premise}
        if intent == "vi_tri" and entries:
            # Hỏi vị trí mà mục top không hề khớp tên hỏi (chung < 2 token)
            # thì đó là đáp án rác, không phải X: vd "Phở ở đâu" ra
            # Chùa Trúc Lâm. Trả thẳng "không có thông tin về X" (hoặc
            # dự phòng chung khi câu không có chủ thể, vd chỉ "ở đâu").
            # Câu nối tiếp (follow) được miễn — ngữ cảnh xử lý ở dưới.
            top = entries[0][1]
            if len(set(tokens(top.get("ten") or "")) & set(feats)) < 2:
                x = _where_subject(q)
                if x and not follow:
                    return {"answer": "App chưa có thông tin về %s." % x,
                            "intent": intent, "confidence": round3(conf),
                            "entity": None, "entity_prov": None,
                            "score": 0.0, "slots": slots, "premise": premise}
                entries = []
        if intent in ("an", "o", "chi_phi"):
            # Món/chỗ ở/chi phí PHẢI neo theo tỉnh người hỏi, không lấy top chung chung
            loai = {"an": "mon_an", "o": "cho_o", "chi_phi": "chi_phi"}[intent]
            prov = self._province_of(q)
            entries = self.retriever.search(q, topn=5, loai=loai,
                                            expand_old=True, province=prov) or entries
        if follow and self.history_entities and (not entries or entries[0][0] < 0.3):
            # Truy hồi lại bằng tên thực thể vừa nhắc
            entries = self.retriever.search(self.history_entities[-1], topn=3)
        if intent in ("gia_ve", "gio_mo_cua", "vi_tri", "cach_di", "mua_dep", "diem_choi") \
                and entries and entries[0][1].get("loai") \
                and not _named_in_question(entries[0][1].get("ten"), set(feats)):
            # Hỏi về địa danh mà top hit lại là món/chỗ ở cùng tên
            # (vd "vé Hội An" ra "Cao lầu Hội An" thay vì "Phố cổ Hội An"):
            # ưu tiên mục địa danh (không có loai) trong top 3.
            # Nhưng KHÔNG hạ khi người hỏi nhắc đích danh quán/món đó
            # (vd "Bánh Khoái Hạnh Huế giá bao nhiêu" — quán có giá thật,
            # hạ xuống mục tổng quan tỉnh là sai; gặp 24/11/2026).
            for j in range(1, len(entries)):
                if not entries[j][1].get("loai"):
                    entries = [entries[j]] + entries[:j] + entries[j + 1:]
                    break
        # --- Tầng 3: lọc thời gian (close_hour >= giờ hỏi, hoặc mở qua đêm) ---
        tf = slots.get("time_filter")
        if tf and tf.get("type") == "after" and entries:
            hour = tf["hour"]
            kept = []
            for score, e in entries:
                enr = next((x for x in self.kb_enriched
                            if x.get("ten") == e.get("ten")), None)
                ch = enr.get("close_hour") if enr else None
                if ch is None or ch >= hour or ch <= 5.0:
                    kept.append((score, e))
            if kept:
                entries = kept
        answer = compose(intent, entries, q, self.history_entities)
        # --- Tầng 3: tổng hợp đa ý định thành khối (khi >= 2 ý định) ---
        multi = self._multi_intent_blocks(slots, q)
        if multi:
            answer = multi + "\n\n" + answer
        # --- Tầng 1: đính chính tiền đề sai lên ĐẦU câu trả lời (sau khối
        # đa ý định, để câu đính chính luôn là dòng đầu tiên) ---
        if premise:
            answer = premise["message"] + "\n\n" + answer
        # --- Tầng 1: cảnh báo ngân sách khi nhân số người vượt budget ---
        warn = self._budget_warning(slots)
        if warn:
            answer = answer + "\n\n" + warn
        entity = entries[0][1].get("ten") if entries else None
        if intent == "cach_di":
            # Thực thể đúng là ĐIỂM ĐẾN trong bảng tuyến, không phải điểm xuất phát
            from composer import EXTRA
            for t in EXTRA.get("tuyen_di", []):
                if norm_text(t["den"]) in norm_text(q):
                    entity = t["den"]
                    break
        if entries:
            self.history_entities.append(entries[0][1].get("ten") or "")
            self.history_entities = self.history_entities[-3:]
        # Tỉnh của mục trả về (để app gắn nút "Mở cẩm nang"): lấy từ mục đầu,
        # không lấy từ tên thực thể (tên thành phố như "Quy Nhơn" không phải
        # tên mục trong kho nên tra tên sẽ không ra tỉnh).
        entity_prov = entries[0][1].get("tinh") if entries else None
        return {"answer": answer, "intent": intent, "confidence": round3(conf),
                "entity": entity, "entity_prov": entity_prov,
                "score": round3(entries[0][0]) if entries else 0.0,
                "slots": slots, "premise": premise}

    def _multi_intent_blocks(self, slots, q):
        """Khi intents >= 2 (vd [chi_phi, di_dau, an_gi]): trả 3 khối
        Chi phí / Điểm đến / Ẩm thực để hiện trước CTA. Trả None nếu < 2 ý định."""
        intents = slots.get("intents") or []
        if len(intents) < 2:
            return None
        prov = slots.get("province")
        people = slots.get("people") or 1
        days = slots.get("days") or 2
        blocks = []
        # Khối chi phí (khi có chi_phi hoặc budget)
        if "chi_phi" in intents or slots.get("budget_vnd"):
            est = self._estimate_trip(prov, people, days)
            if est is not None:
                blocks.append("💰 Ước tính chi phí cho %d người (%dN%dĐ): ~%s VNĐ" % (
                    people, days, max(days - 1, 1), format(est, ",").replace(",", ".")))
        # Khối điểm đến
        if "di_dau" in intents or "lich_trinh" in intents:
            spots = self._top_for_province(prov, None, 3)
            if spots:
                blocks.append("🌲 Điểm đến: " + ", ".join(spots))
        # Khối ẩm thực
        if "an_gi" in intents:
            dishes = self._top_for_province(prov, "mon_an", 3)
            if dishes:
                blocks.append("🍲 Món nên thử: " + ", ".join(dishes))
        return "\n".join(blocks) if blocks else None

    def _top_for_province(self, prov, loai, n):
        out = []
        for e in self.kb:
            if prov and e.get("tinh") != prov:
                continue
            if loai and e.get("loai") != loai:
                continue
            if not loai and e.get("loai"):
                continue
            out.append((e.get("ten") or "").split("(")[0].strip())
            if len(out) >= n:
                break
        return out

    def _estimate_trip(self, prov, people, days):
        """Ước tính tổng chi phí = (lưu trú + ăn + vé + đi lại) x người.
        Dùng mục chi_phi của tỉnh (nếu có) làm mốc/người/chuyến.
        Giá nằm ở 'gia', hoặc ở 'ghi_chu' sau cụm 'Tổng ước tính:'.
        'Tổng ước tính' đã là tổng cả chuyến/người nên KHÔNG nhân thêm
        số ngày (nhân ngày là sai — lỗi thật 25/11/2026: 2.975.000 x 2
        người x 3 ngày = 17,85 triệu cho ngân sách 5 triệu).
        Dùng đầu thấp của khoảng giá (mức tối thiểu đạt được) để ước tính
        theo ngân sách người dùng nêu."""
        for e in self.kb:
            if e.get("loai") == "chi_phi" and (not prov or e.get("tinh") == prov):
                c = parse_cost_low(e.get("gia") or "")
                if c is None:
                    gc = e.get("ghi_chu") or ""
                    m = gc.find("Tổng ước tính")
                    c = parse_cost_low(gc[m:] if m >= 0 else gc)
                if c:
                    return c * people
        return None

    def _budget_warning(self, slots):
        """Cảnh báo khi tổng ước tính x số người vượt budget."""
        budget = slots.get("budget_vnd")
        people = slots.get("people") or 1
        days = slots.get("days") or 2
        if not budget:
            return None
        est = self._estimate_trip(slots.get("province"), people, days)
        if est and est > budget:
            return ("⚠️ Với %d người, ước tính ~%s VNĐ đã vượt ngân sách %s VNĐ "
                    "của bạn. Bạn có thể rút ngắn ngày hoặc chọn chỗ ở rẻ hơn." % (
                        people, format(est, ",").replace(",", "."),
                        format(budget, ",").replace(",", ".")))
        return None

    def feedback(self, q, correct_intent, correct_entity_name=None):
        """Sửa sai: thêm câu hỏi + nhãn đúng vào dữ liệu, huấn luyện lại ngay.
        Chỉ tăng điểm cho token trong TÊN ĐIỂM (vd 'lăng', 'bác') — tăng token
        chung trong câu hỏi (vd 'mấy', 'giờ', 'mở', 'cửa') sẽ làm điểm đó lấn
        mọi câu hỏi khác có chung từ đó."""
        self.extra_rows.append({"q": q, "intent": correct_intent,
                                "entities": [correct_entity_name] if correct_entity_name else []})
        if correct_entity_name:
            idx = self.retriever.index_of(correct_entity_name)
            if idx is not None:
                for t in set(tokens(correct_entity_name)):
                    self.retriever.boosts[(t, idx)] = \
                        self.retriever.boosts.get((t, idx), 0.0) + 0.35
        self.train()
        self.save()

    def save(self, path=MODEL_PATH):
        data = {"extra_rows": self.extra_rows,
                "boosts": [[t, i, v] for (t, i), v in self.retriever.boosts.items()],
                "nb": {"labels": self.nb.labels, "log_prior": self.nb.log_prior,
                       "log_prob": self.nb.log_prob, "vocab": sorted(self.nb.vocab),
                       "unk": self.nb._unk},
                "tfidf_q_idf": self.tfidf_q.idf}
        with open(path, "w", encoding="utf-8") as f:
            json.dump(data, f, ensure_ascii=False)

    def load(self, path=MODEL_PATH):
        if not os.path.exists(path):
            return False
        with open(path, encoding="utf-8") as f:
            data = json.load(f)
        self.extra_rows = data.get("extra_rows", [])
        self.retriever.boosts = {(t, i): v for t, i, v in data.get("boosts", [])}
        nb = data["nb"]
        self.nb.labels = nb["labels"]
        self.nb.log_prior = {k: float(v) for k, v in nb["log_prior"].items()}
        self.nb.log_prob = {k: {kk: float(vv) for kk, vv in v.items()}
                            for k, v in nb["log_prob"].items()}
        self.nb.vocab = set(nb["vocab"])
        self.nb._unk = {k: float(v) for k, v in nb["unk"].items()}
        self.tfidf_q.idf = data.get("tfidf_q_idf", {})
        self.tfidf_q.vocab = set(self.tfidf_q.idf)
        return True


def build():
    ai = BuiTripAI()
    n = ai.train()
    ai.save()
    print("TRAINED rows:", n, "| KB:", len(ai.kb), "| intents:", len(ai.nb.labels))
    return ai


if __name__ == "__main__":
    build()
