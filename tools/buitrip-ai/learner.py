"""BuiTrip AI local — bộ não: học, nhớ, trả lời, tự học từ phản hồi.

Không gọi API nào, không cần mạng, không cần key. Chạy hoàn toàn bằng Python stdlib.
- train(): học phân loại ý định (Naive Bayes) + lập chỉ mục truy hồi (TF-IDF).
- ask(): phân loại ý định -> truy hồi kiến thức -> ghép câu trả lời (composer).
- feedback(): người dùng sửa sai -> thêm ví dụ huấn luyện + cộng điểm truy hồi cho
  token->thực thể đúng -> huấn luyện lại. Đây là cách AI "học" thêm sau mỗi lần sai.
"""
import json
import os
import re

from composer import EXTRA, compose
from data_gen import OLD_TO_NEW, generate
from naive_bayes import NaiveBayes
from normalize import CITY_TO_PROVINCE, QUESTION_WORDS, norm_text, prov_key, tokens
from retriever import Retriever
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


def _matches_specific(entry_name, feat_set, specific):
    """Mục có khớp với thứ cụ thể người hỏi không: nhắc đích danh, hoặc
    chung đủ token cụ thể với tên mục (1 token thì chung token đó,
    ≥2 token thì chung ≥2). Dùng cho luật chặn khớp giả."""
    if _named_in_question(entry_name, feat_set):
        return True
    if not specific:
        return False
    name_toks = set(norm_text((entry_name or "").split("(")[0]).split())
    shared = name_toks & specific
    if len(specific) == 1:
        return bool(shared)
    return len(shared) >= 2


def _is_city_or_overview(name):
    """Mục chỉ là tên thành phố hoặc mục tổng quan tỉnh (vd "Quy Nhơn",
    "Huế (tổng quan)") — hỏi "ở đâu ở Quy Nhơn" vẫn là hỏi chỗ ở."""
    n = norm_text((name or "").split("(")[0].strip())
    return n in _CITY_NORM or "tong quan" in norm_text(name or "")


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
        # Token của tên tỉnh/thành phố (để tìm token cụ thể trong câu hỏi).
        # Thêm cả dạng viết liền ("sapa", "phuquoc", "quynhon") vì câu hỏi
        # thật hay viết liền tên 2 chữ.
        self._place_tokens = set()
        for c in CITY_TO_PROVINCE:
            toks = norm_text(c).split()
            self._place_tokens |= set(toks)
            if len(toks) > 1:
                self._place_tokens.add("".join(toks))
        for p in self.provinces:
            toks = p.split()
            self._place_tokens |= set(toks)
            if len(toks) > 1:
                self._place_tokens.add("".join(toks))
        for old, new in OLD_TO_NEW.items():
            for nm in (old, new):
                toks = norm_text(nm).split()
                self._place_tokens |= set(toks)
                if len(toks) > 1:
                    self._place_tokens.add("".join(toks))

    def _specific_tokens(self, q):
        """Token 'cụ thể' trong câu hỏi: bỏ từ hỏi/chức năng + tên tỉnh/thành.
        Còn lại rỗng = câu hỏi chung chung (vd 'điểm tham quan ở Huế').
        Còn lại không rỗng = câu hỏi nhắc đích danh 1 thứ cụ thể
        (vd 'Quốc lộ 51' còn lại 'quoc lo 51')."""
        toks = set(norm_text(q).split())
        return {t for t in toks
                if t not in QUESTION_WORDS and t not in self._place_tokens}

    def _province_of(self, q):
        """Trả về tên tỉnh mới (dạng chuẩn hóa) nếu câu hỏi nhắc 1 tỉnh/tỉnh cũ/thành phố.
        So cả dạng viết liền ("sapa") vì câu hỏi thật hay viết liền tên 2 chữ."""
        qn = norm_text(q)
        qn_ns = qn.replace(" ", "")
        for old, new in OLD_TO_NEW.items():
            if norm_text(old) in qn or norm_text(old).replace(" ", "") in qn_ns:
                return new
        for city, prov in CITY_TO_PROVINCE.items():
            if norm_text(city) in qn or norm_text(city).replace(" ", "") in qn_ns:
                return prov
        for prov in self.provinces:
            if prov and (prov in qn or prov.replace(" ", "") in qn_ns):
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
        if intent in ("o", "an"):
            # "X ở đâu" hỏi vị trí của 1 điểm cụ thể, không phải hỏi chỗ ở.
            # NB hay nhầm sang "o" vì cụm "ở đâu" (gặp 24/11/2026: "Cà phê
            # Tùng Đà Lạt ở đâu" ra homestay, "Phù điêu... ở đâu" ra hostel).
            # NB cũng nhầm sang "an" khi câu hỏi nhắc 1 điểm có tên dài
            # (gặp 24/11/2026 sau retrain: "massage người khiếm thị ở Huế"
            # ra "Ốc Huế" thay vì Massage Niềm Tin). Chỉ sửa khi câu hỏi
            # nhắc đích danh 1 mục không phải chỗ ở, không phải tên thành
            # phố hay mục tổng quan tỉnh — và với "an" thì câu hỏi KHÔNG
            # được hỏi món thật ("ăn gì"/"món"/"ngon").
            _toks = set(feats)
            _food_q = (intent == "an" and ("mon" in _toks or "ngon" in _toks
                                            or ("an" in _toks and "gi" in _toks)))
            if not _food_q:
                feat_set = set(feats)
                for j, (_s, e) in enumerate(entries):
                    if e.get("loai") == "cho_o":
                        continue
                    if _named_in_question(e.get("ten"), feat_set) \
                            and not _is_city_or_overview(e.get("ten")):
                        intent = "vi_tri"
                        entries = [entries[j]] + entries[:j] + entries[j + 1:]
                        break
        if intent in ("an", "o", "chi_phi"):
            # Món/chỗ ở/chi phí PHẢI neo theo tỉnh người hỏi, không lấy top chung chung
            loai = {"an": "mon_an", "o": "cho_o", "chi_phi": "chi_phi"}[intent]
            prov = self._province_of(q)
            if prov is None and self._specific_tokens(q):
                # Hỏi món/chỗ ở/chi phí ở 1 nơi cụ thể mà kho không nhận ra
                # tỉnh (vd "ăn gì ở Quốc lộ 51"): đừng liệt kê món bừa.
                entries = []
            else:
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
        if intent == "mua_dep" and entries:
            # Mùa đẹp là thuộc tính của ĐIỂM, không phải khách sạn/món ăn.
            # Top truy hồi hay toàn khách sạn (không có dữ liệu mùa) trong
            # khi điểm có mùa nằm sâu hơn (vd "Chợ đêm Sa Pa" hạng 5,
            # "Happy Land Mộc Châu" hạng 7). Tìm sâu top 10, đưa mục địa
            # danh đầu tiên CÓ dữ liệu mùa lên đầu; vùng đã có trong bảng
            # EXTRA thì không cần (câu trả lời lấy từ bảng đó). Không có
            # thì để nguyên (luật chặn bên dưới sẽ chặn, nhường trợ lý cũ).
            qn = norm_text(q)
            in_extra = any(norm_text(m["vung"].split("(")[0].strip()) in qn
                           for m in EXTRA.get("mua_dep_vung_cu", []))
            top = entries[0][1]
            if not in_extra and not (top.get("mua_dep") or "").strip():
                for _s, e in self.retriever.search(q, topn=10):
                    if not e.get("loai") and (e.get("mua_dep") or "").strip():
                        entries = [(_s, e)] + [x for x in entries if x[1] is not e]
                        break
        # Chặn khớp giả (gặp 24/11/2026: "Quốc lộ 51 có điểm tham quan nào"
        # trả "Cọ ỏm" Phú Thọ vì token "có"/"cọ" trùng nhau, conf 1.0
        # score 0.591 vẫn qua cổng). Áp cho 6 ý định trả lời về 1 mục/1
        # tuyến CỤ THỂ (gia_ve/gio_mo_cua/vi_tri/diem_choi/cach_di/
        # mua_dep): câu hỏi nhắc đích danh 1 thứ mà top mục không có mục
        # nào khớp tên -> đừng trả bừa; trả độ tin cậy 0 để trợ lý cũ thử
        # (biết thì trả đúng, không biết thì báo chưa có dữ liệu). Các ý
        # định khác (an/o/chi_phi/lich_trinh/so_sanh) trả lời theo tỉnh/
        # vùng nên không chặn — danh sách theo tỉnh vẫn đúng kể cả khi câu
        # hỏi không nêu tên mục nào. Không chặn câu tiếp nối (chủ thể ở
        # câu trước). Ngoại lệ: cach_di/mua_dep có nguồn riêng ngoài kho
        # (bảng tuyến/bảng mùa vùng cũ) — thứ hỏi nằm trong bảng thì cho
        # qua; mua_dep cũng cho qua khi câu hỏi nhắc 1 tỉnh/thành cụ thể
        # (vd "Mộc Châu mùa hoa mận nở vào tháng mấy": mùa của Mộc Châu
        # nằm trong mục Mộc Châu, dù mục đó không được nêu tên).
        if (not follow and intent in ("gia_ve", "gio_mo_cua", "vi_tri", "diem_choi",
                                      "cach_di", "mua_dep")
                and entries):
            specific = self._specific_tokens(q)
            extra_ok = False
            if intent == "cach_di":
                qn = norm_text(q)
                if any(norm_text(t["den"]) in qn
                       for t in EXTRA.get("tuyen_di", [])):
                    extra_ok = True
            elif intent == "mua_dep":
                qn = norm_text(q)
                if any(norm_text(m["vung"].split("(")[0].strip()) in qn
                        for m in EXTRA.get("mua_dep_vung_cu", [])):
                    extra_ok = True
                elif self._province_of(q) is not None:
                    # Câu hỏi nhắc 1 tỉnh/thành cụ thể (vd "Mộc Châu mùa hoa
                    # mận"): mùa của vùng đó nằm trong mục của vùng, dù mục
                    # đó không được nêu tên — không chặn theo tên.
                    specific = set()
            if extra_ok:
                pass  # đáp án lấy từ bảng EXTRA, không chặn
            elif specific:
                feat_set = set(feats)
                if not any(_matches_specific(e.get("ten"), feat_set, specific)
                           for _s, e in entries):
                    return {"answer": ("App chưa có thông tin này trong kho dữ liệu "
                                       "hiện tại — câu hỏi nhắc tới một điểm/tuyến "
                                       "chưa có trong kho nên mình không trả bừa. "
                                       "Bạn thử hỏi về một điểm cụ thể đã có trong "
                                       "cẩm nang, vd \"vé Bà Nà Hills bao nhiêu\", "
                                       "\"đi Quy Nhơn bằng gì\"."),
                            "intent": intent, "confidence": 0.0,
                            "entity": None, "entity_prov": None,
                            "score": round(entries[0][0], 3), "no_data": True}
            elif intent == "mua_dep":
                # Câu mùa chung chung (không nêu tên mục nào): đáp án lấy từ
                # mục đầu; nếu top 3 không mục nào có dữ liệu mùa thì đừng
                # trả câu "chưa có của khách sạn X" — nhường trợ lý cũ trả
                # mùa đúng của cả vùng.
                if not any((e.get("mua_dep") or "").strip()
                           for _s, e in entries[:3]):
                    return {"answer": ("App chưa có thông tin này trong kho dữ liệu "
                                       "hiện tại — câu hỏi nhắc tới một điểm/tuyến "
                                       "chưa có trong kho nên mình không trả bừa. "
                                       "Bạn thử hỏi về một điểm cụ thể đã có trong "
                                       "cẩm nang, vd \"vé Bà Nà Hills bao nhiêu\", "
                                       "\"đi Quy Nhơn bằng gì\"."),
                            "intent": intent, "confidence": 0.0,
                            "entity": None, "entity_prov": None,
                            "score": round(entries[0][0], 3), "no_data": True}
        answer = compose(intent, entries, q, self.history_entities)
        entity = entries[0][1].get("ten") if entries else None
        if intent == "cach_di":
            # Thực thể đúng là ĐIỂM ĐẾN trong bảng tuyến, không phải điểm xuất phát
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
        return {"answer": answer, "intent": intent, "confidence": round(conf, 3),
                "entity": entity, "entity_prov": entity_prov,
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
