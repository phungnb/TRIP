"""Truy hồi kiến thức: tìm mục liên quan nhất trong kho bằng TF-IDF cosine.

Có cộng điểm học được từ phản hồi (learner.feedback): token nào từng được sửa
đúng về thực thể nào thì lần sau ưu tiên thực thể đó.
"""
from data_gen import OLD_TO_NEW
from normalize import CITY_TO_PROVINCE, norm_text, same_province, tokens
from tfidf import Tfidf


class Retriever:
    def __init__(self, kb):
        self.kb = kb
        self.texts = []
        for e in kb:
            # Chỉ lập chỉ mục trên dữ liệu gốc của mục. Phần "Bối cảnh" do wiki
            # thêm vào ghi_chu chỉ để HIỂN THỊ (composer), không đưa vào chỉ
            # mục — nếu không văn bản bách khoa làm loãng cosine, câu hỏi ngắn
            # (vd "Mua gì ở Sapa?") tụt dưới ngưỡng trả lời (gặp 23/11/2026:
            # độ phủ 175 câu tụt 93,7% -> 89,7% sau khi gộp wiki).
            ghi = str(e.get("ghi_chu") or "")
            ghi = ghi.split(" | Bối cảnh (")[0]
            text = " ".join([str(e.get(k) or "") for k in ("ten", "tinh", "dia_chi", "gia", "gio")] + [ghi])
            self.texts.append(tokens(text))
        self.tfidf = Tfidf().fit(self.texts)
        self.vecs = [self.tfidf.transform(t) for t in self.texts]
        self.boosts = {}  # (token, entry_index) -> điểm cộng (học từ phản hồi)

    def search(self, query, topn=3, loai=None, expand_old=False, province=None):
        feats = tokens(query)
        qn = norm_text(query)  # chuỗi đã chuẩn hóa, để khớp tên nguyên vẹn
        # Hỏi tỉnh cũ/thành phố thì cũng khớp mục của tỉnh mới (vd Quy Nhơn -> Gia Lai).
        # Chỉ bật khi lọc theo loại (món/chỗ ở/chi phí), vì mục địa danh đã ghi
        # tên cũ trong mô tả; bật luôn sẽ làm mục tổng quan tỉnh mới lấn mục điểm.
        if expand_old:
            for old, new in OLD_TO_NEW.items():
                if norm_text(old) in qn:
                    feats += tokens(new)
            for city, prov in CITY_TO_PROVINCE.items():
                if norm_text(city) in qn:
                    feats += tokens(prov)
        # Thành phố trong câu hỏi: tính 1 lần, không lặp 76 thành phố x 1945 mục
        cities_in_q = [c for c in CITY_TO_PROVINCE if norm_text(c) in qn]
        qvec = self.tfidf.transform(feats)
        qtok = set(feats)
        scored = []
        for i, vec in enumerate(self.vecs):
            if loai is not None and self.kb[i].get("loai") != loai:
                continue
            # Neo theo tỉnh: món/chỗ ở/chi phí phải cùng tỉnh người hỏi
            if province is not None and not same_province(self.kb[i].get("tinh"), province):
                continue
            s = Tfidf.cosine(qvec, vec)
            # cộng điểm khi tên mục khớp nhiều token câu hỏi
            name_tok = set(tokens(self.kb[i].get("ten") or ""))
            if name_tok:
                s += 1.5 * len(qtok & name_tok) / len(name_tok)
            # cộng điểm lớn khi tên điểm (bỏ phần trong ngoặc) xuất hiện nguyên vẹn trong câu hỏi
            raw_name = (self.kb[i].get("ten") or "").split("(")[0].strip()
            if raw_name and norm_text(raw_name) and norm_text(raw_name) in qn:
                s += 2.0
            # cộng điểm khi TOÀN BỘ token tên điểm đều có trong câu hỏi
            # (vd "côn đảo" trong "côn đảo nằm ở đâu" thắng "cồn cỏ" dù gần giống)
            if name_tok and name_tok <= qtok:
                s += 2.5
            # cộng điểm khi mục nhắc đúng thành phố/khu người hỏi (vd món Phú Quốc
            # trong kho món An Giang — cùng tỉnh nhưng phải ưu tiên đúng khu)
            for city in cities_in_q:
                if norm_text(city) in self.texts[i]:
                    s += 2.0
                    break
            for t in qtok:
                s += self.boosts.get((t, i), 0.0)
            if s > 0:
                scored.append((s, i))
        scored.sort(reverse=True)
        return [(s, self.kb[i]) for s, i in scored[:topn]]

    def index_of(self, entry_name):
        for i, e in enumerate(self.kb):
            if (e.get("ten") or "").strip() == entry_name.strip():
                return i
        return None
