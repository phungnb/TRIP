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
from normalize import CITY_TO_PROVINCE, QUESTION_WORDS, name_in_q, norm_text, prov_key, same_province, tokens
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
    chung đủ token cụ thể với tên mục. Dùng cho luật chặn khớp giả.
    - Mục tổng quan tỉnh/thành phố KHÔNG tính là khớp (vd 'Gia Lai
      (tổng quan)' không khớp 'chùa An Lạc' chỉ vì câu hỏi có nhắc
      'Gia Lai' — gặp 24/11/2026).
    - Cụm 2 chữ liên tiếp của tên mục xuất hiện trong câu hỏi (vd tên
      'Khu di tích Yên Tử' chứa cụm 'yên tử', 'Quần thể Tràng An' chứa
      'tràng an') — câu hỏi nhắc đúng tên đó dù tên đầy đủ dài hơn
      (gặp 24/11/2026: 'Tràng An đi tuyến nào đẹp' bị chặn vì tên mục
      dài, 'Sapa tháng 1 có tuyết' chỉ khớp nhờ cụm 'sa pa'). Cụm chỉ
      tính khi chung ít nhất 1 token với token cụ thể của câu hỏi —
      không thì cụm chung chung ('quốc lộ' trong 'Quốc lộ 14' khớp
      nhầm 'Quốc lộ 51', cụm tên tỉnh 'đà lạt' trong 'Hotel Dalat'
      khớp nhầm 'khách sạn Mặt Trời Đỏ ở Đà Lạt' — gặp 24/11/2026).
    - Chia sẻ token: luôn cần ≥2 token chung VÀ chiếm HƠN nửa số token
      nội dung của tên mục (tránh 'Chùa Thái Lạc' khớp nhầm 'chùa An
      Lạc' chỉ vì chung 1 chữ 'Lạc' = đúng nửa, 'Bà bán mấy giờ' khớp
      nhầm 'Thác Bản Ba' chỉ nhờ chữ 'Ba', và 'Đảo Hòn Tằm' khớp nhầm
      'Tam Đảo' chỉ nhờ chữ 'tam' (Tằm ≠ Đảo) — gặp 24/11/2026).
      Câu hỏi 1 token thật (vd 'vé Fansipan') khớp qua
      _named_in_question hoặc cụm 2 chữ ở trên, không cần đường này."""
    if _is_city_or_overview(entry_name):
        return False
    if _named_in_question(entry_name, feat_set):
        return True
    if not specific:
        return False
    if _span_matches(entry_name, feat_set, specific):
        return True
    name_toks = {t for t in set(norm_text((entry_name or "").split("(")[0]).split())
                 if t not in QUESTION_WORDS}
    if not name_toks:
        return False
    shared = name_toks & specific
    return len(shared) >= 2 and len(shared) / len(name_toks) > 0.5


def _span_matches(entry_name, feat_set, specific):
    """Cụm 2 chữ liên tiếp của tên mục xuất hiện trong câu hỏi VÀ chung
    ít nhất 1 token với token cụ thể — khớp mạnh, dùng cho luật đưa mùa
    (chỉ đưa lên mục đúng tên, không đưa mục khác tỉnh chỉ vì chung
    1 chữ — vd 'Đảo Hòn Tằm' không được đưa lên cho 'Tam Đảo' dù
    chung chữ 'tam' (Tằm ≠ Đảo), gặp 24/11/2026)."""
    if not specific:
        return False
    name_bigrams = {t for t in tokens(entry_name or "") if "_" in t}
    return any(b in feat_set and set(b.split("_")) & specific
               for b in name_bigrams)


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
        # Tên tỉnh/thành phố/tỉnh cũ (để tìm token cụ thể: chỉ bỏ token
        # của tên nào câu hỏi NHẮC TRỌN TÊN — xem _specific_tokens).
        self._place_names = (
            [norm_text(c) for c in CITY_TO_PROVINCE]
            + list(self.provinces)
            + [norm_text(n) for pair in OLD_TO_NEW.items() for n in pair]
        )

    def _specific_tokens(self, q):
        """Token 'cụ thể' trong câu hỏi: bỏ từ hỏi/chức năng + token của
        tên tỉnh/thành mà câu hỏi NHẮC TRỌN TÊN. Còn lại rỗng = câu hỏi
        chung chung (vd 'điểm tham quan ở Huế'). Còn lại không rỗng =
        câu hỏi nhắc đích danh 1 thứ cụ thể (vd 'Quốc lộ 51' còn lại
        '51' sau khi bỏ 'quoc','lo' là từ loại đường). Chỉ bỏ token của
        tên được nhắc trọn tên: 'Hòn Sơn' không nhắc 'Sơn La' nên 'son'
        vẫn là token cụ thể (trước đây bảng token phẳng nuốt mất 'son'
        vì nó nằm trong 'Sơn La' — gặp 24/11/2026, 'Hòn Sơn' bị trả
        'Hòn Khoai'). So cả dạng viết liền ('sapa') vì câu hỏi thật hay
        viết liền tên 2 chữ. Số vẫn giữ làm token cụ thể (số hiệu tuyến
        '14' khác '51')."""
        qn = norm_text(q)
        qn_ns = qn.replace(" ", "")
        qn_pad = " " + qn + " "
        named = set()
        for nn in self._place_names:
            # Khớp theo RANH GIỚI TỪ (dạng viết liền chỉ khi tên ≥2 chữ):
            # khớp chuỗi con trần sẽ nuốt token oan — vd tên tỉnh rút gọn
            # "hoa" (Thanh Hóa qua prov_key) là chuỗi con của "khoai"
            # (gặp 24/11/2026).
            if (" " + nn + " " in qn_pad
                    or (" " in nn and nn.replace(" ", "") in qn_ns)):
                named |= set(nn.split())
                if len(nn.split()) > 1:
                    named.add(nn.replace(" ", ""))
        return {t for t in set(qn.split())
                if t not in QUESTION_WORDS and t not in named}

    def _province_of(self, q):
        """Trả về tên tỉnh mới (dạng chuẩn hóa) nếu câu hỏi nhắc 1 tỉnh/tỉnh cũ/thành phố.
        So cả dạng viết liền ("sapa") vì câu hỏi thật hay viết liền tên 2 chữ.
        Khớp theo RANH GIỚI TỪ, tên dài khớp trước — vì prov_key rút
        "Thanh Hóa" còn "hoa", mà "hoa" là chuỗi con của "khoai" ("Hòn Khoai
        ở đâu" bị nhận nhầm tỉnh Thanh Hóa, rồi luật tỉnh chặn mất đáp án
        đúng — gặp 24/11/2026); và "Vinh" là 1 từ trong "Vĩnh Long" nên
        tên dài "Vĩnh Long" phải thắng tên ngắn "Vinh"."""
        qn = norm_text(q)
        qn_ns = qn.replace(" ", "")
        qn_pad = " " + qn + " "

        def _hit(name):
            nn = norm_text(name)
            if " " + nn + " " in qn_pad:
                return True
            return " " in nn and nn.replace(" ", "") in qn_ns

        cands = ([(old, new) for old, new in OLD_TO_NEW.items()]
                 + list(CITY_TO_PROVINCE.items())
                 + [(p, p) for p in self.provinces if p])
        cands.sort(key=lambda c: len(norm_text(c[0])), reverse=True)
        for name, res in cands:
            if _hit(name):
                return res
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
                    if intent == "an" and e.get("loai") in ("mon_an", "chi_phi"):
                        # Hỏi món ("ăn bún chả cá ở Quy Nhơn") thì món đó
                        # không phải "điểm ở đâu" — để nguyên ý định an
                        # (danh sách món theo tỉnh, món Quy Nhơn lên trước)
                        # chứ đừng đổi thành vị trí của 1 món ở tỉnh khác
                        # (gặp 24/11/2026: ra "Bún chả cá nằm ở Khánh Hòa").
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
            if prov is None:
                # Không neo được tỉnh (vd "ăn gì ngon" không nêu nơi, hay
                # "ăn gì ở Quốc lộ 51"): đừng liệt kê món/chỗ ở/chi phí bừa
                # của 1 tỉnh bất kỳ — để composer trả câu "chưa có danh
                # sách cho nơi này" (luật chung 24/11/2026).
                entries = []
            else:
                # Chỉ lấy đúng danh sách theo tỉnh; tỉnh không có mục loại
                # này thì để trống (composer nói chưa có) chứ không lấy top
                # chung chung rồi ghi nhầm tên tỉnh khác.
                entries = self.retriever.search(q, topn=5, loai=loai,
                                                expand_old=True, province=prov)
            if entries:
                # Câu hỏi nêu 1 món/quán/khách sạn CỤ THỂ (vd "khách sạn
                # Mặt Trời Đỏ ở Đà Lạt", "ăn bún chả cá Quy Nhơn") mà danh
                # sách theo tỉnh không có mục nào khớp -> đừng liệt kê món
                # bừa; để composer trả câu chưa có danh sách (luật chung
                # 24/11/2026). Câu hỏi chỉ nêu tỉnh/thành phố (vd "ăn gì
                # ở Quy Nhơn", "ăn gì ở An Khê") không bị chặn ở đây —
                # token tỉnh/thành đã được _specific_tokens bỏ ra.
                # Số (vd "2 ngày 1 đêm", "14h", "2N1Đ") không phải thứ cụ
                # thể ở đây — bỏ mọi token bắt đầu bằng số khi kiểm (số
                # hiệu tuyến như "Quốc lộ 14" đã được luật chặn chính xử
                # lý bằng token số, không qua nhánh này).
                specific = {t for t in self._specific_tokens(q)
                            if not t[0].isdigit()}
                if specific and not any(
                        _matches_specific(e.get("ten"), set(feats), specific)
                        for _s, e in entries):
                    entries = []
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
            # "Happy Land Mộc Châu" hạng 7, "Vịnh Hạ Long" hạng 25).
            # Tìm sâu top 30, đưa mục địa danh đầu tiên CÓ dữ liệu mùa
            # lên đầu; vùng đã có trong bảng EXTRA thì không cần (câu
            # trả lời lấy từ bảng đó). Không có thì để nguyên (luật
            # chặn bên dưới sẽ chặn, nhường trợ lý cũ).
            qn = norm_text(q)
            in_extra = any(name_in_q(m["vung"].split("(")[0].strip(), q)
                           for m in EXTRA.get("mua_dep_vung_cu", []))
            top = entries[0][1]
            if not in_extra and not (top.get("mua_dep") or "").strip():
                # Chỉ đưa lên mục KHỚP với câu hỏi: nhắc đích danh, cụm
                # 2 chữ, HOẶC cùng tỉnh với nơi hỏi (mùa là thuộc tính
                # của vùng — vd "Mộc Châu mùa hoa mận": "Happy Land
                # Mộc Châu" có mùa hoa mận dù tên không chứa "hoa mận").
                # Không đưa mục khác tỉnh chỉ vì nó có dữ liệu mùa (vd
                # 'Đảo Hòn Tằm' cho 'Tam Đảo', 'Hoàng thành Thăng Long'
                # cho 'Hạ Long' — gặp 24/11/2026). Chỉ câu hỏi KHÔNG
                # nêu nơi nào mới lấy mục đầu tiên có mùa (mục nào
                # cũng được, vì câu hỏi không nêu nơi).
                feat_set = set(feats)
                specific = self._specific_tokens(q)
                prov_q = self._province_of(q)
                # Tìm sâu tới top 30 (không phải top 10): khách sạn hay
                # xếp trên mục địa danh có mùa (vd Vịnh Hạ Long hạng 25,
                # Buôn Akõ Dhông hạng 26, VinWonders Nha Trang hạng 26 —
                # gặp 24/11/2026).
                for _s, e in self.retriever.search(q, topn=30):
                    name_ok = (_named_in_question(e.get("ten"), feat_set)
                               or _span_matches(e.get("ten"), feat_set, specific))
                    place_ok = bool(prov_q and same_province(e.get("tinh"), prov_q))
                    generic_ok = prov_q is None and not specific
                    if (not e.get("loai") and (e.get("mua_dep") or "").strip()
                            and (name_ok or place_ok or generic_ok)):
                        entries = [(_s, e)] + [x for x in entries if x[1] is not e]
                        break
        # Chặn khớp giả — LUẬT CHUNG (24/11/2026, anh chốt "làm luật chung
        # cho mọi câu đi", sau khi M chỉ đắp riêng 1 câu Quốc lộ 51):
        # câu hỏi nhắc đích danh 1 thứ mà top mục không có mục nào khớp
        # tên -> đừng trả bừa; trả độ tin cậy 0 để trợ lý cũ thử (biết
        # thì trả đúng, không biết thì báo chưa có dữ liệu). Áp cho MỌI
        # ý định trả lời về 1 mục/1 tuyến/1 danh sách CỤ THỂ (gia_ve/
        # gio_mo_cua/vi_tri/diem_choi/cach_di/mua_dep/lich_trinh/so_sanh/
        # chi_phi). Không chặn câu tiếp nối (chủ thể ở câu trước).
        # Ngoại lệ: cach_di/mua_dep có nguồn riêng ngoài kho (bảng tuyến/
        # bảng mùa vùng cũ) — thứ hỏi nằm trong bảng thì cho qua; mua_dep
        # cũng cho qua khi câu hỏi nhắc 1 tỉnh/thành cụ thể (vd "Mộc Châu
        # mùa hoa mận nở vào tháng mấy": mùa của Mộc Châu nằm trong mục
        # Mộc Châu, dù mục đó không được nêu tên); chi_phi cho qua khi
        # câu hỏi đã nêu tỉnh (bảng chi phí cấp tỉnh là dữ liệu thật).
        # an/o không chặn ở đây vì đã neo theo tỉnh ở trên (không neo
        # được tỉnh thì danh sách đã rỗng). mang_gi/chung_chung/tinh_cu
        # không chặn: đáp án của chúng là gợi ý chung/khuyên chung,
        # không nhận là dữ liệu của 1 mục cụ thể nào.
        if (not follow and intent in ("gia_ve", "gio_mo_cua", "vi_tri", "diem_choi",
                                      "cach_di", "mua_dep", "lich_trinh",
                                      "so_sanh", "chi_phi")
                and entries):
            specific = self._specific_tokens(q)
            extra_ok = False
            if intent == "cach_di":
                # Tuyến tới tỉnh của thành phố hỏi cũng tính (vd "đi Sa Pa
                # bằng gì": bảng chỉ có tuyến tới "Lào Cai", trong đó
                # cách đi có nhắc Sa Pa — gặp 24/11/2026, trước đây trả
                # chú thích của 1 resort thay vì tuyến).
                prov_q = self._province_of(q)
                if any(name_in_q(t["den"], q)
                       or (prov_q and norm_text(t["den"]) == norm_text(prov_q))
                       for t in EXTRA.get("tuyen_di", [])):
                    extra_ok = True
            elif intent == "mua_dep":
                if any(name_in_q(m["vung"].split("(")[0].strip(), q)
                        for m in EXTRA.get("mua_dep_vung_cu", [])):
                    extra_ok = True
                elif self._province_of(q) is not None:
                    # Câu hỏi nhắc 1 tỉnh/thành cụ thể (vd "Mộc Châu mùa hoa
                    # mận"): mùa của vùng đó nằm trong mục của vùng, dù mục
                    # đó không được nêu tên — không chặn theo tên.
                    specific = set()
            elif intent == "chi_phi" and self._province_of(q) is not None:
                # Chi phí cấp tỉnh là dữ liệu thật (34 tỉnh đều có bảng
                # chi phí) — câu hỏi đã nêu tỉnh thì không chặn theo tên
                # mục.
                extra_ok = True
            if extra_ok:
                pass  # đáp án lấy từ bảng EXTRA / bảng chi phí tỉnh, không chặn
            elif specific:
                feat_set = set(feats)
                # So sánh cần khớp CẢ 2 bên (vd "so sánh A với B" mà chỉ
                # khớp A thì bên B vẫn là mục bừa); các ý định khác cần
                # khớp ít nhất 1 mục.
                need = 2 if intent == "so_sanh" else 1
                # Câu hỏi nêu tỉnh/thành cụ thể thì mục khớp PHẢI ở
                # đúng tỉnh đó — cùng tên ở tỉnh khác là 1 nơi khác
                # (vd "Suối Vàng ở Lâm Đồng": "Thác Tình Yêu (Suối
                # Vàng)" ở Lào Cai không được tính là khớp; mục đúng
                # là "Hồ Suối Vàng" ở Lâm Đồng — gặp 24/11/2026).
                # Mùa là thuộc tính của VÙNG: câu hỏi mùa nêu 1 nơi
                # (vd "Mộc Châu mùa hoa mận") thì mục nào trong tỉnh
                # đó CÓ dữ liệu mùa cũng trả đúng mùa vùng đó.
                prov_q = self._province_of(q)

                def _hit(e):
                    if prov_q and not same_province(e.get("tinh"), prov_q):
                        return False
                    if _matches_specific(e.get("ten"), feat_set, specific):
                        return True
                    # Mùa là thuộc tính của VÙNG: chỉ tính khi câu hỏi
                    # nêu nơi (prov_q) và mục ở đúng tỉnh đó CÓ dữ liệu
                    # mùa — không thì "Đảo Hòn Tằm" (có mùa) sẽ cứu
                    # "Tam Đảo" (không có mục nào) dù khác tỉnh
                    # (gặp 24/11/2026).
                    return bool(intent == "mua_dep" and prov_q
                                and (e.get("mua_dep") or "").strip())
                hits = sum(1 for _s, e in entries if _hit(e))
                if hits < need:
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
        if not follow and entries and self._specific_tokens(q):
            # Mục khớp đích danh nằm sâu trong top 3 mà mục đầu không khớp
            # (vd truy hồi xếp 1 mục khác lên trên): đưa mục khớp lên đầu
            # để composer trả đúng thực thể. Khớp tính theo
            # _matches_specific (nhắc tên/cụm 2 chữ/chung ≥2 token) —
            # vd "Hòn Khoai ở đâu": mục đầu "Hòn Khô" chỉ khớp nhờ tiền
            # tố "hon kho" của "hon khoai", còn "Đảo Hòn Khoai" khớp
            # cụm "hon khoai" nên được đưa lên (gặp 24/11/2026).
            # Mục khớp còn phải ĐÚNG TỈNH với nơi hỏi nêu (vd "Suối
            # Vàng ở Lâm Đồng": "Thác Tình Yêu (Suối Vàng)" ở Lào Cai
            # không được đưa lên, mục đúng là "Hồ Suối Vàng" ở Lâm
            # Đồng — gặp 24/11/2026).
            feat_set = set(feats)
            specific = self._specific_tokens(q)
            prov_q = self._province_of(q)

            def _match(e):
                return (_matches_specific(e.get("ten"), feat_set, specific)
                        and (prov_q is None
                             or same_province(e.get("tinh"), prov_q)))
            if not _match(entries[0][1]):
                for j in range(1, len(entries)):
                    if _match(entries[j][1]):
                        entries = [entries[j]] + entries[:j] + entries[j + 1:]
                        break
        answer = compose(intent, entries, q, self.history_entities)
        entity = entries[0][1].get("ten") if entries else None
        if intent == "cach_di":
            # Thực thể đúng là ĐIỂM ĐẾN trong bảng tuyến, không phải điểm xuất phát
            # (tuyến tới tỉnh của thành phố hỏi cũng tính, vd Sa Pa -> Lào Cai).
            prov_q = self._province_of(q)
            for t in EXTRA.get("tuyen_di", []):
                if name_in_q(t["den"], q) or (prov_q and norm_text(t["den"]) == norm_text(prov_q)):
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
