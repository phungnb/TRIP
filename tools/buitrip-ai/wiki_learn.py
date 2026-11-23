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

Kết quả: wiki-hoc/wiki-facts.json — mỗi điểm 1 bản ghi:
    {ten, tinh, sources: {wikivoyage_vi: {title, revid, url, tom_tat},
                          wikivoyage_en: {...}, wikipedia_vi: {...},
                          wikipedia_en: {...},
                          wikidata: {qid, toa_do, don_vi_hanh_chinh}},
     xung_dot: [câu wiki nhắc tỉnh khác với tỉnh trong kho — cần người duyệt],
     lay_luc: "2026-11-23T..."}
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
import urllib.error
import urllib.parse
import urllib.request

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


def main():
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
