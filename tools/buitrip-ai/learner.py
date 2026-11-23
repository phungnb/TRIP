"""BuiTrip AI local — bộ não: học, nhớ, trả lời, tự học từ phản hồi.

Không gọi API nào, không cần mạng, không cần key. Chạy hoàn toàn bằng Python stdlib.
- train(): học phân loại ý định (Naive Bayes) + lập chỉ mục truy hồi (TF-IDF).
- ask(): phân loại ý định -> truy hồi kiến thức -> ghép câu trả lời (composer).
- feedback(): người dùng sửa sai -> thêm ví dụ huấn luyện + cộng điểm truy hồi cho
  token->thực thể đúng -> huấn luyện lại. Đây là cách AI "học" thêm sau mỗi lần sai.
"""
import json
import os

from composer import compose
from data_gen import OLD_TO_NEW, generate
from naive_bayes import NaiveBayes
from normalize import CITY_TO_PROVINCE, norm_text, prov_key, tokens
from retriever import Retriever
from tfidf import Tfidf

MODEL_PATH = "model.json"


class BuiTripAI:
    def __init__(self):
        with open("kho-kien-thuc.json", encoding="utf-8") as f:
            self.kb = json.load(f)
        self.retriever = Retriever(self.kb)
        self.nb = NaiveBayes()
        self.tfidf_q = Tfidf()
        self.extra_rows = []  # câu hỏi + nhãn do người dùng sửa (học thêm)
        self.history_entities = []
        # Tên tỉnh mới (từ kho) để nhận diện tỉnh trong câu hỏi
        self.provinces = sorted({prov_key(e.get("tinh")) for e in self.kb
                                 if e.get("tinh") and not e.get("loai")})

    def _province_of(self, q):
        """Trả về tên tỉnh mới (dạng chuẩn hóa) nếu câu hỏi nhắc 1 tỉnh/tỉnh cũ/thành phố."""
        qn = norm_text(q)
        for old, new in OLD_TO_NEW.items():
            if norm_text(old) in qn:
                return new
        for city, prov in CITY_TO_PROVINCE.items():
            if norm_text(city) in qn:
                return prov
        for prov in self.provinces:
            if prov and prov in qn:
                return prov
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
        feats = tokens(q)
        intent, probs = self.nb.predict(feats)
        conf = probs.get(intent, 0.0)
        # Câu hỏi tiếp nối ("thế...", "còn...", "từ đó...") -> dùng thực thể vừa nhắc
        qn = norm_text(q)
        follow = qn.startswith(("the ", "con ", "tu do ", "the con ", "o do ")) \
            or "the " in qn[:12]
        entries = self.retriever.search(q, topn=3)
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
                and entries and entries[0][1].get("loai"):
            # Hỏi về địa danh mà top hit lại là món/chỗ ở cùng tên
            # (vd "vé Hội An" ra "Cao lầu Hội An" thay vì "Phố cổ Hội An"):
            # ưu tiên mục địa danh (không có loai) trong top 3.
            for j in range(1, len(entries)):
                if not entries[j][1].get("loai"):
                    entries = [entries[j]] + entries[:j] + entries[j + 1:]
                    break
        answer = compose(intent, entries, q, self.history_entities)
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
        return {"answer": answer, "intent": intent, "confidence": round(conf, 3),
                "entity": entity,
                "score": round(entries[0][0], 3) if entries else 0.0}

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
