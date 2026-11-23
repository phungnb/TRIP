"""TF-IDF thuần Python (stdlib only) — không cần numpy/sklearn.

Dùng cho 2 việc: (1) vector hóa câu hỏi để phân loại ý định,
(2) truy hồi mục kiến thức liên quan nhất trong kho.
"""
import math
from collections import Counter


class Tfidf:
    def __init__(self):
        self.idf = {}
        self.vocab = set()

    def fit(self, docs):
        """docs: list[list[str]] — mỗi doc là danh sách feature (token/bigram)."""
        n = len(docs)
        df = Counter()
        for d in docs:
            for t in set(d):
                df[t] += 1
        self.vocab = set(df)
        self.idf = {t: math.log((n + 1) / (c + 1)) + 1.0 for t, c in df.items()}
        return self

    def transform(self, feats):
        tf = Counter(feats)
        vec = {}
        for t, c in tf.items():
            if t in self.idf:
                vec[t] = (1 + math.log(c)) * self.idf[t]
        norm = math.sqrt(sum(v * v for v in vec.values())) or 1.0
        return {t: v / norm for t, v in vec.items()}

    @staticmethod
    def cosine(a, b):
        if len(a) > len(b):
            a, b = b, a
        return sum(v * b.get(t, 0.0) for t, v in a.items())
