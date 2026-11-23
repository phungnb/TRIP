#!/usr/bin/env python3
"""Sửa trường `tinh` của kho kiến thức (kho-kien-thuc.json).

Vấn đề (phát hiện 23/11/2026 nhờ pipeline wiki): 157/622 mục địa danh có `tinh`
không phải tên tỉnh — do lúc nhập 153 điểm mới từ web tour, cột "loại" (Chùa,
Bãi biển, Đảo nhỏ...) lọt vào ô tỉnh, cộng thêm các dạng "TP.HCM", "Đà Lạt ·
Lâm Đồng", "Hà Giang → Tuyên Quang", "X (không đổi)". Hậu quả: hàm
same_province() so sánh sai nên trợ lý neo tỉnh sai cho các mục này
(vd hỏi "ăn gì ở Quy Nhơn" có thể không thấy món của Hòn Khô).

Cách sửa:
- Dạng cơ học: "TP.HCM" -> "TP Hồ Chí Minh"; "Đà Lạt · Lâm Đồng" -> "Lâm Đồng";
  "A → B" -> lấy B (tỉnh mới sau sáp nhập); "X (không đổi)" -> X;
  "Bà Rịa-Vũng Tàu (cũ), nay TP Hồ Chí Minh" -> "TP Hồ Chí Minh".
- Dạng tên loại: tra bảng MAP_TEN theo tên mục (địa lý đã xác minh từ file
  tour + bài wiki + ghi_chu của mục). Mục nào không có trong bảng thì IN RA
  để sửa tay, không đoán mò.

Chạy: python3 sua-tinh-kho.py  (ghi đè kho-kien-thuc.json tại chỗ)
"""
import json

KB_PATH = "kho-kien-thuc.json"
TINHS34 = {"Hà Nội", "Hải Phòng", "Quảng Ninh", "Bắc Ninh", "Hưng Yên",
           "Ninh Bình", "Phú Thọ", "Điện Biên", "Lai Châu", "Sơn La",
           "Lào Cai", "Cao Bằng", "Lạng Sơn", "Tuyên Quang", "Thái Nguyên",
           "Thanh Hóa", "Nghệ An", "Hà Tĩnh", "Quảng Trị", "Huế",
           "Đà Nẵng", "Quảng Ngãi", "Gia Lai", "Đắk Lắk", "Khánh Hòa",
           "Lâm Đồng", "Đồng Nai", "TP Hồ Chí Minh", "Tây Ninh",
           "Đồng Tháp", "An Giang", "Vĩnh Long", "Cần Thơ", "Cà Mau"}

# Tên mục -> tỉnh đúng (địa lý đã xác minh 23/11/2026).
MAP_TEN = {
    # Quy Nhơn (Gia Lai)
    "Chùa Thiên Hưng": "Gia Lai", "Hòn Khô": "Gia Lai",
    "Đồi cát Phương Mai": "Gia Lai", "Cầu Thị Nại": "Gia Lai",
    "Khu du lịch Cửa Biển": "Gia Lai", "Làng chài Nhơn Hải": "Gia Lai",
    "Chùa Ông Núi": "Gia Lai", "Suối nước nóng Hội Vân": "Gia Lai",
    "Tịnh xá Ngọc Hòa": "Gia Lai",
    # Măng Đen / Kon Tum cũ (Quảng Ngãi)
    "Đức Mẹ Măng Đen (Trung tâm hành hương)": "Quảng Ngãi",
    "Thác Pa Sỹ": "Quảng Ngãi", "Chùa Khánh Lâm": "Quảng Ngãi",
    "Hồ Đăk Ke": "Quảng Ngãi", "Ngã ba Đông Dương": "Quảng Ngãi",
    "Nhà thờ Gỗ Kon Tum": "Quảng Ngãi",
    # Lý Sơn (Quảng Ngãi)
    "Nhà trưng bày Hải Đội Hoàng Sa": "Quảng Ngãi",
    "Đền thờ Cá Ông (Lý Sơn)": "Quảng Ngãi", "Chùa Đục (Lý Sơn)": "Quảng Ngãi",
    # Quảng Bình cũ (Quảng Trị)
    "Suối Nước Moọc": "Quảng Trị", "Sông Chày – Hang Tối": "Quảng Trị",
    "Bãi Đá Nhảy": "Quảng Trị",
    # Huế / Khánh Hòa / Lâm Đồng
    "Đầm Lập An": "Huế",
    "Hòn Mun": "Khánh Hòa", "Nhà hát Đó": "Khánh Hòa",
    "Khu du lịch suối khoáng I-Resort": "Khánh Hòa",
    "Đồng Cừu Suối Tiên": "Khánh Hòa", "Vườn Nho Thái An": "Khánh Hòa",
    "Núi Tà Cú": "Lâm Đồng", "Bàu Trắng": "Lâm Đồng",
    "Hải đăng Kê Gà": "Lâm Đồng", "Đồi Robin": "Lâm Đồng",
    # Đắk Lắk (Phú Yên cũ + Buôn Ma Thuột)
    "Nhà đày Buôn Ma Thuột": "Đắk Lắk", "Núi Đá Voi Mẹ": "Đắk Lắk",
    "Mũi Điện (Mũi Cực Đông)": "Đắk Lắk", "Nhà thờ Mằng Lăng": "Đắk Lắk",
    "Đầm Ô Loan": "Đắk Lắk",
    # Phú Quốc (An Giang)
    "Grand World Phú Quốc (\"thành phố không ngủ\")": "An Giang",
    "Cầu Hôn (Kiss Bridge)": "An Giang",
    "Thị trấn Địa Trung Hải / Sunset Town": "An Giang",
    "Vinpearl Safari Phú Quốc": "An Giang", "Suối Tranh": "An Giang",
    "Dinh Cậu": "An Giang",
    "Chùa Hộ Quốc (Thiền viện Trúc Lâm Hộ Quốc)": "An Giang",
    "Hòn Mây Rút (tour 4 đảo)": "An Giang",
    "Hòn Thơm — Cáp treo Hòn Thơm + Sun World Hòn Thơm Nature Park": "An Giang",
    "Làng chài Hàm Ninh": "An Giang", "Bãi Khem": "An Giang",
    # Côn Đảo (TP Hồ Chí Minh)
    "Vườn quốc gia Côn Đảo": "TP Hồ Chí Minh",
    "Hòn Bảy Cạnh": "TP Hồ Chí Minh", "Miếu Bà Phi Yến": "TP Hồ Chí Minh",
    "Miếu Năm Cô (Miếu Ngũ Hành)": "TP Hồ Chí Minh",
    "Miếu Cậu (miếu Hoàng tử Cải)": "TP Hồ Chí Minh",
    "Chùa Núi Một": "TP Hồ Chí Minh",
    "Dinh Chúa Đảo + Trại Phú Hải + chuồng cọp Pháp/Mỹ": "TP Hồ Chí Minh",
    "Cầu tàu 914": "TP Hồ Chí Minh",
    # Nam Du (An Giang)
    "Quần đảo Nam Du (mục tổng)": "An Giang",
    "Hòn Lớn (Hòn Củ Tron)": "An Giang", "Bãi Cây Mến": "An Giang",
    "Hòn Mấu": "An Giang", "Hòn Ngang": "An Giang",
    "Hòn Dầu": "An Giang", "Hòn Hai Bờ Đập": "An Giang",
    "Miếu Bà Chúa Xứ (Nam Du)": "An Giang",
    # Phú Quý (Lâm Đồng)
    "Hòn Tranh": "Lâm Đồng",
    "Gành Hang – Bãi Nhỏ – Hồ Vô Cực – Khe Sung Sướng": "Lâm Đồng",
    "Vịnh Triều Dương": "Lâm Đồng",
    "Dốc Phượt (cung đường 27/4) + Cột cờ Phú Quý": "Lâm Đồng",
    "Chùa Linh Sơn – Núi Cao Cát": "Lâm Đồng",
    "Cây Cô Đơn (Phú Quý)": "Lâm Đồng",
    # Cần Giờ (TP Hồ Chí Minh)
    "Chiến khu Rừng Sác": "TP Hồ Chí Minh",
    "Khu du lịch sinh thái Vàm Sát": "TP Hồ Chí Minh",
    "Chợ Hàng Dương": "TP Hồ Chí Minh",
    "Đảo Thạnh An / Thiềng Liềng": "TP Hồ Chí Minh",
    # Vũng Tàu – Hồ Tràm – Bình Châu (TP Hồ Chí Minh)
    "Bãi Dứa": "TP Hồ Chí Minh",
    "Sun World Vũng Tàu (Aqua Adventure)": "TP Hồ Chí Minh",
    "Tháp Tam Thắng": "TP Hồ Chí Minh",
    "Nhà thờ Song Vĩnh": "TP Hồ Chí Minh",
    "Tu viện Phước Hải (chùa Phước Hải)": "TP Hồ Chí Minh",
    "Đảo Long Sơn – Nhà Lớn Long Sơn": "TP Hồ Chí Minh",
    "Hồ Tràm": "TP Hồ Chí Minh", "Hồ Cốc": "TP Hồ Chí Minh",
    "Suối khoáng nóng Bình Châu (Minera Hot Springs) + Khu bảo tồn Bình Châu–Phước Bửu": "TP Hồ Chí Minh",
    "Cầu ngắm biển Hamptons Pier (Hồ Tràm)": "TP Hồ Chí Minh",
    # Núi Sam / Châu Đốc (An Giang), Cà Mau, Cần Thơ
    "Tượng Phật Thích Ca núi Sam": "An Giang",
    "Dinh Sơn Trung": "An Giang",
    "Nhà thờ Tắc Sậy (nhà thờ Cha Diệp)": "Cà Mau",
    "Chùa Monivongsa Bopharam (Cà Mau)": "Cà Mau",
    "Chợ nổi Cà Mau": "Cà Mau",
    "Chùa Munirensay (Cần Thơ)": "Cần Thơ",
    "Cần Thơ Eco Resort (Eco Safari)": "Cần Thơ",
    # Pù Luông (Thanh Hóa)
    "Làng dệt thổ cẩm Bản Lặn": "Thanh Hóa",
}


def fix_mech(t):
    """Chuẩn hoá cơ học, trả về tên tỉnh hoặc None nếu không chuẩn hoá được."""
    if t in TINHS34:
        return t
    if t == "TP.HCM":
        return "TP Hồ Chí Minh"
    if t == "Đà Lạt · Lâm Đồng":
        return "Lâm Đồng"
    if "nay TP Hồ Chí Minh" in t:
        return "TP Hồ Chí Minh"
    if "→" in t:
        return t.split("→")[-1].strip()
    if t.endswith(" (không đổi)"):
        return t[: -len(" (không đổi)")]
    return None


def main():
    kb = json.load(open(KB_PATH, encoding="utf-8"))
    n_fix = n_chua = 0
    chua = []
    for e in kb:
        if e.get("loai"):
            continue
        t = e.get("tinh")
        new = fix_mech(t)
        if new is None:
            new = MAP_TEN.get(e["ten"])
        if new is None:
            n_chua += 1
            chua.append((e["ten"], t))
            continue
        if new != t:
            e["tinh"] = new
            n_fix += 1
    json.dump(kb, open(KB_PATH, "w", encoding="utf-8"), ensure_ascii=False, indent=1)
    bad = [e for e in kb if not e.get("loai") and e.get("tinh") not in TINHS34]
    print(f"SUA XONG: {n_fix} muc da sua tinh, {n_chua} muc chua sua duoc, "
          f"con {len(bad)} muc tinh chua chuan.")
    for ten, t in chua:
        print("  CHUA SUA:", ten, "|", t)


if __name__ == "__main__":
    main()
