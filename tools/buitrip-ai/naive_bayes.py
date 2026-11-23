"""Multinomial Naive Bayes thuần Python — bộ phân loại ý định.

Học từ dữ liệu huấn luyện (câu hỏi -> ý định), không hardcode regex.
Thêm dữ liệu mới (kể cả phản hồi sửa sai của người dùng) rồi huấn luyện lại
là mô hình "học" thêm — xem learner.feedback().
"""
import math
from collections import Counter, defaultdict


class NaiveBayes:
    def __init__(self, alpha=0.5):
        self.alpha = alpha
        self.labels = []
        self.log_prior = {}
        self.log_prob = {}
        self.vocab = set()

    def fit(self, X, y):
        """X: list[list[str]] feature, y: list[str] nhãn."""
        self.labels = sorted(set(y))
        doc_count = Counter(y)
        total = len(y)
        self.log_prior = {l: math.log(doc_count[l] / total) for l in self.labels}
        feat_count = {l: Counter() for l in self.labels}
        feat_total = Counter()
        for feats, label in zip(X, y):
            for f in feats:
                feat_count[label][f] += 1
                feat_total[label] += 1
                self.vocab.add(f)
        V = len(self.vocab) or 1
        self.log_prob = {}
        for l in self.labels:
            denom = feat_total[l] + self.alpha * V
            self.log_prob[l] = {f: math.log((feat_count[l][f] + self.alpha) / denom)
                                for f in self.vocab}
            self._unk = {l: math.log(self.alpha / denom) for l in self.labels}
        return self

    def predict(self, feats):
        """Trả về (nhãn tốt nhất, dict nhãn -> xác suất chuẩn hóa)."""
        scores = {}
        for l in self.labels:
            s = self.log_prior[l]
            lp = self.log_prob[l]
            unk = self._unk[l]
            for f in feats:
                s += lp.get(f, unk)
            scores[l] = s
        best = max(scores, key=scores.get)
        mx = max(scores.values())
        exps = {l: math.exp(v - mx) for l, v in scores.items()}
        z = sum(exps.values()) or 1.0
        return best, {l: v / z for l, v in exps.items()}
