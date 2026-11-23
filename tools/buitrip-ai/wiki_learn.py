#!/usr/bin/env python3
"""Pipeline tự học từ wiki cho BuiTrip AI (không API trả phí, không đăng nhập).

Nguồn (đều giấy phép mở CC BY-SA, chỉ cần ghi nguồn):
- Wikivoyage tiếng Việt + tiếng Anh: cẩm nang du lịch (mục Xem/Ăn/Ở/Đi lại).
- Wikipedia tiếng Việt + tiếng Anh: lịch sử, văn hóa, bối cảnh.
- Wikidata: tọa độ, tên chính thức, đơn vị hành chính.

Cách chạy:
    python3 wiki_learn.py            # chạy hết 622 điểm (tiếp tục dở dang nếu dừng giữa chừng)
    python3 wiki_learn.py --update   # chỉ lấy lại trang đã đổi revision kể từ lần trước
    python3 wiki_learn.py --limit 20 # chạy thử 20 điểm đầu
    python3 wiki_learn.py --sections --cities "Hà Nội,Quy Nhơn,Đà Lạt,Huế,Phú Quốc"
                                     # chỉ lấy listings mục See/Do/Eat/Drink/Sleep
                                     # của các thành phố (mặc định: mọi thành phố
                                     # trong CITY_NAMES) -> wiki-hoc/wiki-sections.json

Kết quả: wiki-hoc/wiki-facts.json — mỗi điểm 1 bản ghi:
    {ten, tinh, sources: {wikivoyage_vi: {title, revid, url, tom_tat},
                          wikivoyage_en: {...}, wikipedia_vi: {...},
                          wikipedia_en: {...},
                          wikidata: {qid, toa_do, don_vi_hanh_chinh}},
     xung_dot: [câu wiki nhắc tỉnh khác với tỉnh trong kho — cần người duyệt],
     lay_luc: "2026-11-23T..."}
Kết quả mục: wiki-hoc/wiki-sections.json — mỗi bản ghi 1 mục của 1 thành phố:
    {ten, tinh, muc: "See"|"Do"|"Eat"|"Drink"|"Sleep", ngon: "wikivoyage_vi"|"wikivoyage_en",
     tieu_de, url, listings: [{name, address, hours, price, description, url, toa_do?}],
     lay_luc}
Lưu ý: Wikivoyage tiếng Việt cũ phần lớn viết xuôi, gần như không có template
listing (đã kiểm Hà Nội 23/11/2026: 0 template ở Tham quan/Ẩm thực/Đồ uống/
Nghỉ ngơi) — listings chủ yếu đến từ bản tiếng Anh. Tên mục tiếng Việt:
Tham quan=See, Hoạt động=Do, Ẩm thực=Eat, Đồ uống=Drink, Nghỉ ngơi=Sleep.

Quy tắc tôn trọng nguồn: User-Agent riêng, nghỉ 0,2s giữa các lần gọi,
gặp 429 thì chờ rồi thử lại (tối đa 3 lần). Không cào HTML hàng loạt — chỉ
dùng API công khai của Wikimedia.
"""
import concurrent.futures
import json
import os
import re
import sys
import threading
import time
import unicodedata
import urllib.error
import urllib.parse
import urllib.request

from normalize import CITY_TO_PROVINCE, norm_text

UA = {"User-Agent": "BuiTripAI/1.0 (nghien-cuu du-lich; buicode.com)"}
KB_PATH = "kho-kien-thuc.json"
OUT_DIR = "wiki-hoc"
OUT_PATH = os.path.join(OUT_DIR, "wiki-facts.json")

SOURCES = [
    ("wikivoyage_vi", "https://vi.wikivoyage.org/w/api.php"),
    ("wikivoyage_en", "https://en.wikivoyage.org/w/api.php"),
    ("wikipedia_vi", "https://vi.wikipedia.org/w/api.php"),
    ("wikipedia_en", "https://en.wikipedia.org/w/api.php"),
]
WIKIDATA_API = "https://www.wikidata.org/w/api.php"
SLEEP = 0.1
WORKERS = 10

# Wikivoyage chỉ có bài cấp thành phố/tỉnh, không có bài từng điểm nhỏ —
# chỉ tìm Wikivoyage khi tên điểm là thành phố/tỉnh (tiết kiệm ~3.000 lần gọi).
CITY_NAMES = {"Quy Nhơn", "Nha Trang", "Cam Ranh", "Đà Lạt", "Bảo Lộc",
              "Phan Thiết", "Mũi Né", "Hội An", "Đà Nẵng", "Huế", "Quảng Trị",
              "Đồng Hới", "Phong Nha", "Sa Pa", "Lào Cai", "Hạ Long", "Cát Bà",
              "Hải Phòng", "Hà Nội", "TP Hồ Chí Minh", "Sài Gòn", "Vũng Tàu",
              "Cần Giờ", "Phú Quốc", "Rạch Giá", "Hà Tiên", "Nam Du",
              "Châu Đốc", "Long Xuyên", "Côn Đảo", "Phú Quý", "Măng Đen",
              "Kon Tum", "Lý Sơn", "Quảng Ngãi", "Buôn Ma Thuột", "Đắk Lắk",
              "Tuy Hòa", "Phan Rang", "Ninh Thuận", "Cần Thơ", "Cà Mau",
              "Sóc Trăng", "Bến Tre", "Mỹ Tho", "Cao Lãnh", "Sa Đéc",
              "Trà Vinh", "Vĩnh Long", "Tây Ninh", "Biên Hòa", "Vinh",
              "Thanh Hóa", "Sầm Sơn", "Ninh Bình", "Tam Cốc", "Hà Giang",
              "Đồng Văn", "Cao Bằng", "Điện Biên", "Mộc Châu", "Sơn La",
              "Thái Nguyên", "Lạng Sơn", "Bắc Giang", "Bắc Ninh", "Hải Dương",
              "Hưng Yên", "Vĩnh Phúc", "Phú Thọ", "Hòa Bình", "Thái Bình"}


def api_get(base, params, tries=3):
    """GET JSON qua API Wikimedia, có chờ lại khi bị giới hạn tốc độ."""
    q = urllib.parse.urlencode(params)
    req = urllib.request.Request(base + "?" + q, headers=UA)
    for attempt in range(tries):
        try:
            with urllib.request.urlopen(req, timeout=30) as r:
                time.sleep(SLEEP)
                return json.load(r)
        except urllib.error.HTTPError as e:
            if e.code == 429 and attempt < tries - 1:
                wait = int(e.headers.get("Retry-After", "10"))
                time.sleep(wait)
                continue
            raise
        except urllib.error.URLError:
            # Mạng chập chờn (timeout qua proxy) thì thử lại, không để 1 lần
            # rớt mạng giết cả vòng học 30 phút (gặp thật 24/11/2026: vòng
            # học chết ở --sections vì 1 timeout duy nhất).
            if attempt < tries - 1:
                time.sleep(10 * (attempt + 1))
                continue
            raise
    raise RuntimeError("API that bai sau 3 lan thu")


def resolve_title(base, name):
    """Tìm tiêu đề trang đúng nhất cho 1 tên điểm.
    Tên gộp nhiều điểm ('A + B', 'A – B') thì tách từng phần, lấy phần đầu tiên
    có trang; thử tên chính xác trước, rồi mới tìm kiếm.
    Chấp nhận kết quả tìm kiếm chỉ khi tiêu đề chia sẻ ÍT NHẤT 2 từ dài với tên
    (1 từ chung như 'Quảng' sẽ lấy nhầm 'Quảng Ninh' cho 'Quảng trường Ba Đình')."""
    parts = [p.strip() for p in re.split(r"\s*[+–—]\s*", name) if p.strip()]
    candidates = [name] + parts
    for cand in candidates:
        cand = re.sub(r"\s*\([^)]*\)\s*$", "", cand).strip()
        if not cand:
            continue
        d = api_get(base, {"action": "query", "format": "json", "prop": "info",
                           "titles": cand, "redirects": 1})
        pages = d.get("query", {}).get("pages", {})
        for p in pages.values():
            if "missing" not in p:
                return p.get("title")
    for cand in candidates:
        cand = re.sub(r"\s*\([^)]*\)\s*$", "", cand).strip()
        if not cand:
            continue
        d = api_get(base, {"action": "query", "format": "json", "list": "search",
                           "srsearch": cand, "srlimit": 3})
        for hit in d.get("query", {}).get("search", []):
            title = re.sub(r"<[^>]+>", "", hit.get("title", ""))
            name_toks = {t for t in re.split(r"\W+", cand.lower()) if len(t) > 3}
            title_toks = {t for t in re.split(r"\W+", title.lower()) if len(t) > 3}
            if len(name_toks & title_toks) >= 2:
                return title
    return None


def fetch_page(base, title):
    """Lấy tóm tắt + revision + tọa độ của 1 trang."""
    d = api_get(base, {"action": "query", "format": "json", "prop": "extracts|coordinates|info",
                       "titles": title, "redirects": 1, "explaintext": 1,
                       "exsectionformat": "plain", "exintro": 1, "inprop": "url"})
    pages = d.get("query", {}).get("pages", {})
    for p in pages.values():
        if "missing" in p:
            return None
        out = {"title": p.get("title"), "revid": p.get("lastrevid"),
               "url": p.get("fullurl"),
               "tom_tat": (p.get("extract") or "").strip()[:2000]}
        coords = p.get("coordinates")
        if coords:
            out["toa_do"] = [coords[0].get("lat"), coords[0].get("lon")]
        return out
    return None


def fetch_wikidata(name):
    """Tìm mục Wikidata cho 1 tên điểm: tọa độ + đơn vị hành chính."""
    d = api_get(WIKIDATA_API, {"action": "wbsearchentities", "format": "json",
                               "search": name, "language": "vi", "limit": 3})
    hits = d.get("search", [])
    if not hits:
        d = api_get(WIKIDATA_API, {"action": "wbsearchentities", "format": "json",
                                   "search": name, "language": "en", "limit": 3})
        hits = d.get("search", [])
    for h in hits:
        qid = h.get("id")
        e = api_get(WIKIDATA_API, {"action": "wbgetentities", "format": "json",
                                   "ids": qid, "props": "claims|labels",
                                   "languages": "vi|en"})
        ent = e.get("entities", {}).get(qid, {})
        claims = ent.get("claims", {})
        out = {"qid": qid, "ten": h.get("label")}
        if "P625" in claims:
            v = claims["P625"][0]["mainsnak"]["datavalue"]["value"]
            out["toa_do"] = [v.get("latitude"), v.get("longitude")]
        if "P131" in claims:
            try:
                out["don_vi_hanh_chinh"] = claims["P131"][0]["mainsnak"]["datavalue"]["value"]["id"]
            except (KeyError, IndexError):
                pass
        return out
    return None


def clean_name(ten):
    """Bỏ hậu tố '(tổng quan)' và phần trong ngoặc ở cuối tên để tìm trang wiki."""
    t = re.sub(r"\s*\(tổng quan\)\s*$", "", ten or "").strip()
    t = re.sub(r"\s*\([^)]*\)\s*$", "", t).strip()
    return t or ten


def xung_dot_tinh(tom_tat, tinh_kho):
    """Wiki nhắc tỉnh khác với tỉnh trong kho -> gắn cờ, không tự sửa."""
    if not tom_tat or not tinh_kho:
        return []
    tinhs = ["Hà Nội", "Hải Phòng", "Quảng Ninh", "Bắc Ninh", "Hưng Yên",
             "Ninh Bình", "Phú Thọ", "Điện Biên", "Lai Châu", "Sơn La",
             "Lào Cai", "Cao Bằng", "Lạng Sơn", "Tuyên Quang", "Thái Nguyên",
             "Thanh Hóa", "Nghệ An", "Hà Tĩnh", "Quảng Trị", "Huế",
             "Đà Nẵng", "Quảng Ngãi", "Gia Lai", "Đắk Lắk", "Khánh Hòa",
             "Lâm Đồng", "Đồng Nai", "TP Hồ Chí Minh", "Tây Ninh",
             "Đồng Tháp", "An Giang", "Vĩnh Long", "Cần Thơ", "Cà Mau"]
    found = [t for t in tinhs if t in tom_tat and t != tinh_kho
             and t not in tinh_kho]
    return found


def process_one(e, old, update_only):
    """Xử lý 1 điểm: trả về bản ghi (không ghi file — phần gọi lo việc lưu)."""
    ten = e["ten"]
    name = clean_name(ten)
    prev = old.get(ten)
    rec = {"ten": ten, "tinh": e.get("tinh"), "sources": {},
           "xung_dot": [], "lay_luc": time.strftime("%Y-%m-%dT%H:%M:%S")}
    changed = False
    is_city = "(tổng quan)" in ten or any(c.lower() in name.lower() for c in CITY_NAMES)
    for key, base in SOURCES:
        if key.startswith("wikivoyage") and not is_city:
            continue
        try:
            title = resolve_title(base, name)
            if not title:
                continue
            page = fetch_page(base, title)
            if page:
                rec["sources"][key] = page
                if update_only and prev and prev["sources"].get(key, {}).get("revid") == page.get("revid"):
                    rec["sources"][key]["khong_doi"] = True
                else:
                    changed = True
        except Exception as exc:  # noqa: BLE001 - ghi lỗi, tiếp điểm sau
            rec["sources"][key] = {"loi": str(exc)[:120]}
    try:
        wd = fetch_wikidata(name)
        if wd:
            rec["sources"]["wikidata"] = wd
            changed = True
    except Exception as exc:  # noqa: BLE001
        rec["sources"]["wikidata"] = {"loi": str(exc)[:120]}
    for key in ("wikipedia_vi", "wikipedia_en", "wikivoyage_vi", "wikivoyage_en"):
        s = rec["sources"].get(key, {})
        if s.get("tom_tat"):
            rec["xung_dot"] = sorted(set(rec["xung_dot"]) | set(xung_dot_tinh(s["tom_tat"], e.get("tinh"))))
    if update_only and prev and not changed:
        return prev
    return rec


# ---------------------------------------------------------------------------
# Học từ mục (section) Wikivoyage: See/Do/Eat/Drink/Sleep
# Lấy toàn bộ wikitext của trang 1 lần rồi tách mục tại chỗ (ít gọi API hơn
# nhiều so với lấy từng mục con). Chỉ trích template listing {{see|...}},
# {{do|...}}, {{eat|...}}, {{drink|...}}, {{sleep|...}} và {{listing|...}}.
# ---------------------------------------------------------------------------
SECTION_NAMES_VI = {"tham quan": "See", "xem": "See",
                    "hoat dong": "Do", "lam": "Do",
                    "am thuc": "Eat", "an": "Eat",
                    "do uong": "Drink", "uong": "Drink",
                    "nghi ngoi": "Sleep", "ngu": "Sleep"}
SECTION_NAMES_EN = {"see": "See", "do": "Do", "eat": "Eat",
                    "drink": "Drink", "sleep": "Sleep"}
LISTING_TYPES = {"see": "See", "do": "Do", "eat": "Eat",
                 "drink": "Drink", "sleep": "Sleep"}
SECTION_MUCS = ("See", "Do", "Eat", "Drink", "Sleep")
SECTIONS_PATH = os.path.join(OUT_DIR, "wiki-sections.json")
_CURRENCY = {"vnd": "đ", "usd": " USD", "eur": " EUR", "gbp": " GBP"}


def _cut_words(s, n):
    """Cắt ở ranh giới từ + dấu …, không cắt giữa từ."""
    s = (s or "").strip()
    if len(s) <= n:
        return s
    t = s[:n].rsplit(" ", 1)[0]
    return (t or s[:n]) + "…"


def _find_template_end(text, start):
    """Vị trí sau '}}' đóng của '{{' tại start (đếm template lồng nhau)."""
    depth = 0
    i, n = start, len(text)
    while i < n - 1:
        two = text[i:i + 2]
        if two == "{{":
            depth += 1
            i += 2
        elif two == "}}":
            depth -= 1
            i += 2
            if depth == 0:
                return i
        else:
            i += 1
    return None


def _split_top_level(body):
    """Tách tham số template theo '|' ở độ sâu 0 (không tách trong {{}} / [[]])."""
    parts, depth_b, depth_l, cur = [], 0, 0, []
    i, n = 0, len(body)
    while i < n:
        two = body[i:i + 2]
        if two == "{{":
            depth_b += 1
            cur.append(two)
            i += 2
        elif two == "}}":
            depth_b = max(0, depth_b - 1)
            cur.append(two)
            i += 2
        elif two == "[[":
            depth_l += 1
            cur.append(two)
            i += 2
        elif two == "]]":
            depth_l = max(0, depth_l - 1)
            cur.append(two)
            i += 2
        elif body[i] == "|" and depth_b == 0 and depth_l == 0:
            parts.append("".join(cur))
            cur = []
            i += 1
        else:
            cur.append(body[i])
            i += 1
    parts.append("".join(cur))
    return parts


def clean_value(v):
    """Làm sạch 1 giá trị wikitext: bỏ ref/template/link, chỉ giữ chữ thật."""
    s = v or ""
    s = re.sub(r"<ref[^>]*>.*?</ref>", "", s, flags=re.S | re.I)
    s = re.sub(r"<ref[^>]*/>", "", s, flags=re.I)

    def _tpl(m):
        inner = m.group(1)
        parts = _split_top_level(inner)
        if not parts:
            return ""
        name = parts[0].strip().lower()
        if name in _CURRENCY and len(parts) > 1:
            return (clean_value(parts[1]) + _CURRENCY[name]).strip()
        if name == "phone" and len(parts) > 1:
            return clean_value(parts[1])
        # Template khác: giữ tham số cuối nếu là chữ (vd {{lang|vi|Phở}} -> Phở)
        for p in reversed(parts[1:]):
            t = clean_value(p)
            if t and "{{" not in t and "[[" not in t:
                return t
        return ""

    for _ in range(3):  # lặp vì template có thể lồng nhau
        s2 = re.sub(r"\{\{([^{}]*)\}\}", _tpl, s)
        if s2 == s:
            break
        s = s2
    s = re.sub(r"\{\{[^{}]*\}\}", "", s)  # template còn sót (lồng sâu) -> bỏ

    def _link(m):
        inner = m.group(1)
        if inner.split(":", 1)[0].strip().lower() in (
                "file", "image", "category", "tập tin", "hình", "thể loại", "w"):
            return ""
        return inner.split("|", 1)[-1]

    s = re.sub(r"\[\[([^\]]+)\]\]", _link, s)
    s = re.sub(r"\[https?://[^\s\]]+\s+([^\]]+)\]", r"\1", s)
    s = re.sub(r"\[https?://[^\s\]]+\]", "", s)
    s = re.sub(r"'''?", "", s)
    s = re.sub(r"<[^>]+>", " ", s)
    s = (s.replace("&nbsp;", " ").replace("&amp;", "&")
          .replace("&quot;", '"').replace("&ndash;", "–").replace("&mdash;", "—"))
    s = re.sub(r"\s+", " ", s).strip()
    return s


def parse_listing_templates(wikitext):
    """Trích template listing từ wikitext 1 mục.
    Trả về list: {loai_muc, name, address, hours, price, description, url, toa_do?}."""
    out = []
    for m in re.finditer(r"\{\{\s*(see|do|eat|drink|sleep|listing)\b",
                         wikitext, re.I):
        end = _find_template_end(wikitext, m.start())
        if end is None:
            continue
        inner = wikitext[m.start() + 2:end - 2]
        parts = _split_top_level(inner)
        if not parts:
            continue
        ttype = parts[0].strip().lower()
        params, positional = {}, []
        for p in parts[1:]:
            if "=" in p:
                k, v = p.split("=", 1)
                params[k.strip().lower()] = v.strip()
            else:
                positional.append(p.strip())
        if ttype == "listing":
            ttype = (params.get("type") or "").strip().lower()
        if ttype not in LISTING_TYPES:
            continue
        name = clean_value(params.get("name")
                           or (positional[0] if positional else ""))
        if not name:
            continue
        rec = {"loai_muc": LISTING_TYPES[ttype],
               "name": name,
               "address": clean_value(params.get("address", "")),
               "hours": clean_value(params.get("hours", "")),
               "price": clean_value(params.get("price", "")),
               "description": _cut_words(clean_value(params.get("content", "")), 600),
               "url": clean_value(params.get("url", ""))}
        lat, lon = params.get("lat"), params.get("long")
        if lat and lon:
            try:
                rec["toa_do"] = [float(lat), float(lon)]
            except ValueError:
                pass
        out.append(rec)
    return out


def split_wikitext_sections(wikitext):
    """Tách wikitext cả trang thành list (level, line, body) theo tiêu đề mục."""
    out, cur = [], None
    for line in (wikitext or "").split("\n"):
        m = re.match(r"^(={2,6})\s*(.+?)\s*\1\s*$", line)
        if m:
            if cur is not None:
                out.append(cur)
            cur = (len(m.group(1)), m.group(2).strip(), [])
        elif cur is not None:
            cur[2].append(line)
    if cur is not None:
        out.append(cur)
    return [(lvl, line, "\n".join(body)) for lvl, line, body in out]


def fetch_page_wikitext(base, title):
    """Lấy toàn bộ wikitext 1 trang (để tách mục tại chỗ)."""
    d = api_get(base, {"action": "parse", "format": "json", "page": title,
                       "prop": "wikitext", "redirects": 1})
    return d.get("parse", {}).get("wikitext", {}).get("*", "")


def _title_candidates(name, lang):
    """Tên trang có thể có: tiếng Việt giữ nguyên; tiếng Anh thử cả dạng
    gộp từ ('Hanoi') và dạng giữ khoảng trắng ('Phu Quoc')."""
    if lang == "vi":
        return [name]
    folded = norm_text(name)
    words = " ".join(w.capitalize() for w in folded.split())
    nospace = folded.replace(" ", "").capitalize()
    seen, out = set(), []
    for c in (name, words, nospace):
        if c and c not in seen:
            seen.add(c)
            out.append(c)
    return out


def resolve_section_title(base, name, lang):
    """Tìm tiêu đề trang Wikivoyage cho 1 thành phố (thử các dạng tên)."""
    for cand in _title_candidates(name, lang):
        t = resolve_title(base, cand)
        if t:
            return t
    return None


def fetch_city_sections(city, tinh):
    """Lấy listings mục See/Do/Eat/Drink/Sleep của 1 thành phố từ Wikivoyage
    tiếng Việt trước, tiếng Anh sau. Trả về list bản ghi (mỗi bản ghi = 1 mục
    của 1 ngôn ngữ; mục không có listing vẫn ghi lại với listings=[])."""
    now = time.strftime("%Y-%m-%dT%H:%M:%S")
    recs = []
    for key, base, lang in (("wikivoyage_vi", SOURCES[0][1], "vi"),
                            ("wikivoyage_en", SOURCES[1][1], "en")):
        title = resolve_section_title(base, city, lang)
        if not title:
            recs.append({"ten": city, "tinh": tinh, "muc": None, "ngon": key,
                         "tieu_de": None, "url": None, "listings": [],
                         "loi": "khong tim duoc trang", "lay_luc": now})
            continue
        try:
            wt = fetch_page_wikitext(base, title)
            names = SECTION_NAMES_VI if lang == "vi" else SECTION_NAMES_EN
            by_muc, found_mucs = {}, []
            cur_muc = None
            for lvl, line, body in split_wikitext_sections(wt):
                if lvl == 2:
                    cur_muc = names.get(norm_text(line))
                if cur_muc:
                    if cur_muc not in found_mucs:
                        found_mucs.append(cur_muc)
                    for l in parse_listing_templates(body):
                        if l["loai_muc"] != cur_muc:
                            continue
                        l.pop("loai_muc", None)
                        by_muc.setdefault(cur_muc, []).append(l)
            # Trùng tên trong cùng mục (vd 1 quán xuất hiện ở cả Budget lẫn
            # Mid-range): giữ bản có nhiều trường thật nhất.
            for muc in by_muc:
                best = {}
                for l in by_muc[muc]:
                    k = norm_text(l["name"])
                    filled = sum(1 for f in ("address", "hours", "price",
                                             "description", "url")
                                 if l.get(f))
                    if k not in best or filled > best[k][0]:
                        best[k] = (filled, l)
                by_muc[muc] = [v[1] for v in best.values()]
            domain = "vi" if lang == "vi" else "en"
            url = (f"https://{domain}.wikivoyage.org/wiki/"
                   + urllib.parse.quote(title.replace(" ", "_")))
            for muc in found_mucs:
                recs.append({"ten": city, "tinh": tinh, "muc": muc, "ngon": key,
                             "tieu_de": title, "url": url,
                             "listings": by_muc.get(muc, []), "lay_luc": now})
        except Exception as exc:  # noqa: BLE001 - ghi lỗi, tiếp thành phố sau
            recs.append({"ten": city, "tinh": tinh, "muc": None, "ngon": key,
                         "tieu_de": title, "url": None, "listings": [],
                         "loi": str(exc)[:120], "lay_luc": now})
    return recs


def _tinh_of_city(city, kb):
    """Tỉnh của 1 thành phố: ưu tiên bảng CITY_TO_PROVINCE, rồi mục kho
    có tên chứa thành phố."""
    if city in CITY_TO_PROVINCE:
        return CITY_TO_PROVINCE[city]
    for e in kb:
        if city.lower() in (e.get("ten") or "").lower():
            return e.get("tinh") or ""
    return ""


def run_sections(cities=None):
    """Chạy vòng lấy listings mục cho các thành phố (ghi dần, chạy lại được)."""
    os.makedirs(OUT_DIR, exist_ok=True)
    kb = json.load(open(KB_PATH, encoding="utf-8"))
    if cities is None:
        cities = sorted(CITY_NAMES)
    else:
        # Khớp tên nhập theo chuẩn hóa (vd 'quy nhon' -> 'Quy Nhơn')
        by_norm = {norm_text(c): c for c in CITY_NAMES}
        resolved = []
        for c in cities:
            if c in CITY_NAMES:
                resolved.append(c)
            elif norm_text(c) in by_norm:
                resolved.append(by_norm[norm_text(c)])
            else:
                resolved.append(c)
        cities = resolved
    old = {}
    if os.path.exists(SECTIONS_PATH):
        for r in json.load(open(SECTIONS_PATH, encoding="utf-8")):
            old[(r["ten"], r.get("muc"), r.get("ngon"))] = r
    for city in cities:
        recs = fetch_city_sections(city, _tinh_of_city(city, kb))
        for r in recs:
            old[(r["ten"], r.get("muc"), r.get("ngon"))] = r
        json.dump(list(old.values()), open(SECTIONS_PATH, "w", encoding="utf-8"),
                  ensure_ascii=False, indent=1)
        n_list = sum(len(r.get("listings", [])) for r in recs)
        detail = ", ".join(f"{r['muc']}={len(r['listings'])}"
                           for r in recs if r.get("muc"))
        print(f"  {city}: {n_list} listings ({detail})", flush=True)
    total = sum(len(r.get("listings", [])) for r in old.values())
    print(f"XONG MUC: {len(old)} ban ghi muc, tong {total} listings trong "
          f"{SECTIONS_PATH}.")


def main():
    if "--sections" in sys.argv:
        cities = None
        if "--cities" in sys.argv:
            cities = [c.strip() for c in
                      sys.argv[sys.argv.index("--cities") + 1].split(",")
                      if c.strip()]
        run_sections(cities)
        return
    update_only = "--update" in sys.argv
    limit = None
    if "--limit" in sys.argv:
        limit = int(sys.argv[sys.argv.index("--limit") + 1])
    os.makedirs(OUT_DIR, exist_ok=True)
    kb = json.load(open(KB_PATH, encoding="utf-8"))
    places = [e for e in kb if not e.get("loai")]
    if limit:
        places = places[:limit]
    old = {}
    if os.path.exists(OUT_PATH):
        for r in json.load(open(OUT_PATH, encoding="utf-8")):
            old[r["ten"]] = r
    if not update_only:
        # Chạy thường: bỏ qua điểm đã có bản ghi đầy đủ (khởi động lại không làm lại)
        total_spots = len(places)
        places = [e for e in places if e["ten"] not in old]
        print(f"Bo qua {total_spots - len(places)} diem da xong, con {len(places)} diem.", flush=True)
    lock = threading.Lock()
    counter = {"n": 0}

    def save():
        with lock:
            json.dump(list(old.values()), open(OUT_PATH, "w", encoding="utf-8"),
                      ensure_ascii=False, indent=1)

    def run(e):
        rec = process_one(e, old, update_only)
        with lock:
            old[rec["ten"]] = rec
            counter["n"] += 1
            n = counter["n"]
        if n % 50 == 0:
            save()
            print(f"  {n}/{len(places)} diem...", flush=True)
        return rec

    with concurrent.futures.ThreadPoolExecutor(max_workers=WORKERS) as pool:
        list(pool.map(run, places))
    save()
    done = len(places)
    n_src = sum(1 for r in old.values() if r["sources"])
    print(f"XONG: {done} diem xu ly, {n_src} diem co it nhat 1 nguon wiki.")
    for key, _ in SOURCES:
        n = sum(1 for r in old.values() if r["sources"].get(key, {}).get("tom_tat"))
        print(f"  {key}: {n} diem co tom tat")
    n_wd = sum(1 for r in old.values() if r["sources"].get("wikidata", {}).get("toa_do"))
    print(f"  wikidata co toa do: {n_wd} diem")
    n_conf = sum(1 for r in old.values() if r.get("xung_dot"))
    print(f"  xung dot tinh can duyet: {n_conf} diem")


if __name__ == "__main__":
    main()
