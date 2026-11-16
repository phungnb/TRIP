# -*- coding: utf-8 -*-
"""Cập nhật 10 tỉnh cẩm nang du lịch (ngày kiểm 08/11/2026).
- JSON: thêm dien_thoai + nguon_dien_thoai cho từng cho_o;
  thêm 3 key cấp tỉnh: khi_troi_mua, cho_cap_doi, mua_thang.
- MD: thêm cột SĐT vào bảng 'Ở đâu' + 3 mục mới cuối file.
Giữ nguyên định dạng JSON gốc: 1 dòng, sort_keys, separators (',', ':').
Không đụng file tỉnh khác, không đụng TONG-HOP.
"""
import json, re, sys
from pathlib import Path

BASE = Path.home() / "workspace" / "your_files" / "du-lieu-34-tinh"
NGAY = "08/11/2026"
NULL_MD = "chưa tra được"

def null_src(ly_do=None):
    if ly_do:
        return f"chưa tra được — {ly_do} (ngày kiểm {NGAY})"
    return f"chưa tra được (ngày kiểm {NGAY})"

def src(nguon):
    return f"{nguon} (ngày kiểm {NGAY})"

# ---------------- SĐT ----------------
# value: (dien_thoai hoặc None, nguon_dien_thoai)
SDT = {
"tp-ho-chi-minh": {
  "Rex Hotel Saigon": ("028 3829 2185", src("tierra.vn, thongtindiadiem.com")),
  "Hotel Continental Saigon": ("028 3829 9201", src("website chính thức continentalsaigon.com") + ". Lưu ý: website ghi 132–134 Đồng Khởi, khác địa chỉ 142–144 trong file."),
  "Hotel Majestic Saigon": ("028 3829 5517", src("nhiều nguồn đồng thuận")),
  "Saigon Prince Hotel": ("028 3822 2999", src("nhiều nguồn đồng thuận")),
  "Silverland Sakyo Hotel & Spa": ("0888 100 739", src("hotline website chính thức silverlandhotels.com") + "; số phụ 028 3829 5295 cũng trên site này"),
  "Hương Sen Annex Saigon": ("028 3934 9468", src("website chính thức huongsenhotel.com.vn, eduoka.com, Wanderlog") + ". Số 028 3829 1415 là của Hương Sen Hotel chính (66–70 Đồng Khởi), không dùng."),
  "ÊMM Saigon Hotel": ("028 3936 2100", src("số lễ tân G8 Center Hotel Saigon — ÊMM đã đổi tên thành G8 Center Hotel Saigon từ 02/06/2026 (bài đăng Facebook khách sạn; HotelsCombined, momondo, Kayak đồng thuận)")),
  "California Hotel Saigon": (None, null_src("không tìm được SĐT khách sạn; chỉ thấy số nhà hàng Việt Hoa Lầu trong khách sạn (028 3823 7634), không dùng")),
},
"da-nang": {
  "Mường Thanh Luxury Đà Nẵng": ("0236 3956 789", src("booking.muongthanh.com")),
  "Novotel Danang Premier Han River": ("0236 3929 999", src("all.accor.com")),
  "Furama Resort Đà Nẵng": ("0236 3847 333", src("furamavietnam.com; danangfantasticity.com")),
  "Mường Thanh Grand Đà Nẵng": ("0236 3929 929", src("nhiều nguồn đồng thuận")),
  "Hilton Da Nang": ("0236 3874 000", src("hilton.com")),
  "Khách sạn 3 sao khu vực biển Mỹ Khê": (None, null_src("mục chung chung, không có tên cụ thể")),
  "Homestay khu vực An Thượng": (None, null_src("mục chung chung, không có tên cụ thể")),
},
"hue": {
  "Mường Thanh Holiday Huế": ("0234 3936 688", src("holidayhue.muongthanh.com")),
  "La Residence Hue Hotel & Spa": ("0234 3837 475", src("factsheet chính thức azerai.com (nay là Azerai La Residence)")),
  "Indochine Palace": ("0234 3936 666", src("nhiều nguồn đồng thuận")),
  "Pilgrimage Village Boutique Resort & Spa": ("0234 3885 461", src("pilgrimagevillage.com")),
  "Êmm Hotel Huế": ("0234 3828 255", src("emmhotels.com") + ". Lưu ý: địa chỉ thật là 15 Lý Thường Kiệt, khác 27 Hà Nội trong file."),
  "Bonjour Hostel Huế": ("0935 076 908", src("travelviet.net, vetet.net, cungphuot.info, ohdidi.vn, wanderboat.ai đồng thuận") + ". Lưu ý: địa chỉ thật ở khu Võ Thị Sáu, khác 17/26 Nguyễn Công Trứ trong file."),
  "Alba Spa Hotel Huế": (None, null_src("nhập nhằng 2 cơ sở: Alba Spa Hotel thật ở 29 Trần Quang Khải (0234 3828 444), khu suối khoáng Phong Sơn là Alba Wellness Valley by Fusion (0234 3552 222); không xác định được số nào thuộc đúng địa chỉ trong file")),
},
"can-tho": {
  "Mường Thanh Luxury Cần Thơ": ("0292 3688 888", src("muongthanh.com")),
  "Wink Hotel Cần Thơ Centre": (None, null_src("số duy nhất tìm được 0931 666 900 là hotline đặt phòng của Vietgoing, không phải số khách sạn")),
  "Tru by Hilton Cần Thơ": ("0292 3933 355", src("hilton.com") + "; khách sạn này trước là SOJO Hotel Can Tho, cùng số/địa chỉ 112 Trần Phú"),
  "LION 17 Hotel": (None, null_src()),
  "ON Hotel Cần Thơ": (None, null_src("tìm kiếm không trả về kết quả liên quan")),
  "De Rivé Homestay": ("0789 664 777", src("antamtour.vn (nguồn đơn lẻ, địa chỉ khớp khu vực Bến Ninh Kiều)")),
  "Mekong Daniel's Homestay": ("0919 777 421", src("travelistul.com, bookaweb.com")),
  "Vàm Xáng Rustic Home": ("0968 693 769", src("website chính thức vamxangrustic.com") + "; hotline phụ 0867 093 969"),
},
"quang-ninh": {
  "Vinpearl Resort & Spa Hạ Long": ("0203 3857 858", src("vinpearl.com; trang review cập nhật 06/11/2026") + "; tổng đài 1900 2323 89 nhánh 3"),
  "Khách sạn khu Bãi Cháy 4–5 sao (Mường Thanh, Novotel, Wyndham...)": (None, null_src("mục chung chung, không có tên cụ thể")),
  "Khách sạn khu Bãi Cháy 3 sao": (None, null_src("mục chung chung, không có tên cụ thể")),
  "Khách sạn khu Hòn Gai": (None, null_src("mục chung chung, không có tên cụ thể")),
  "Resort Tuần Châu": ("0366 604 585", src("vnexpress.net, cafef.vn, kenh14.vn (bài 2026)")),
  "Du thuyền ngủ đêm vịnh Hạ Long (4–5 sao)": (None, null_src("mục danh mục, không phải một du thuyền cụ thể")),
  "Homestay/khách sạn đảo Quan Lạn": (None, null_src("mục chung chung, không có tên cụ thể")),
  "Khách sạn Uông Bí (gần Yên Tử)": (None, null_src("mục chung chung, không có tên cụ thể")),
  "Homestay Hạ Long (khu Hòn Gai/Bãi Cháy)": (None, null_src("mục chung chung, không có tên cụ thể")),
},
"ninh-binh": {
  "Tam Coc Garden Resort": ("0378 253 555", src("wanderlog, limo24h.vn, mytour.vn, tripi.vn, cattour.vn đồng thuận") + "; hotline phụ 0964 773 366"),
  "Emeralda Resort Ninh Binh": ("0229 3658 333", src("luhanhvietnam.com.vn, dulich.pro.vn, tripi.vn, kayak, vietnamtotravel.com đồng thuận") + "; hotline phụ 0968 699 690"),
  "Khách sạn trung tâm TP Ninh Bình 3–4 sao": (None, null_src("mục chung chung, không có tên cụ thể")),
  "Homestay Tam Cốc (khu vực Ninh Hải)": (None, null_src("mục chung chung, không có tên cụ thể")),
  "Homestay Tràng An (khu vực Trường Yên)": (None, null_src("mục chung chung, không có tên cụ thể")),
  "Khách sạn Bái Đính (khu vực Gia Viễn)": (None, null_src("mục chung chung, không có tên cụ thể")),
  "Nhà nghỉ/khách sạn giá vừa trung tâm TP": (None, null_src("mục chung chung, không có tên cụ thể")),
},
"lao-cai": {
  "Hôtel de la Coupole – MGallery Sa Pa": ("0214 3629 999", src("tripi.vn, topsapa.vn, mia.vn, netid.vn đồng thuận")),
  "Silk Path Grand Resort & Spa Sa Pa": ("0214 3788 555", src("dulich.attravel.vn, topsapa.vn, limoutrip.com, mia.vn, tripi.vn đồng thuận") + "; hotline phụ 0917 613 000"),
  "Topas Ecolodge": ("024 7307 0899", src("mytour.vn, tripi.vn đồng thuận") + "; số 0962 011 165 cũng xuất hiện"),
  "Pao's Sapa Leisure Hotel": ("0214 6253 999", src("motogo.vn, hotelscombined.com, ltur.com, mytour.vn, topsapa.vn, tripi.vn, tadiha.com, wanderlog.com, Google Travel đồng thuận")),
  "Sapa Jade Hill Resort & Spa": ("0981 066 266", src("tripi.vn, mytour.vn, tadiha.com, justfly.vn đồng thuận") + "; landline phụ 0214 3771 199"),
  "Little Sapa Homestay": ("0988 897 711", src("vietfuntravel.com.vn, tadiha.com, câu trả lời của chủ nhà trên TripAdvisor") + ". Lưu ý: 0988 787 711 là của Little View Homestay cùng địa chỉ — dễ nhầm."),
  "H'Mong CatCat Homestay": ("0393 399 338", src("tripi.vn, toplist.vn, mytour.vn đồng thuận; fanpage facebook.com/homestaydulichcatcat")),
  "Phơri's House": ("0906 231 047", src("bachhoaxanh.com, dulich9.com, tripi.vn, tadiha.com, tophomestay.vn, sapavietnam.vn đồng thuận")),
},
"phu-tho": {
  "Mường Thanh Luxury Phú Thọ": ("0210 3616 666", src("booking.muongthanh.com; dulichphutho.gov.vn") + ". Lưu ý: địa chỉ thật là Lô CC17, Quảng trường Hùng Vương, Gia Cẩm, khác 'Đường Trần Phú' trong file."),
  "Khách sạn Sài Gòn – Phú Thọ": ("0210 2221 999", src("phuthotoplist.com, tripi.vn, mytour.vn, tadiha.com đồng thuận")),
  "SOJO Hotel Viet Tri": ("0210 3636 555", src("tripi.vn, mytour.vn, tadiha.com, toplist.vn, phuthotoplist.com, TUI đồng thuận") + ". Lưu ý: cùng số + địa chỉ 938 Hùng Vương với Tru by Hilton Viet Tri — cùng một khách sạn, đã đổi thương hiệu từ SOJO sang Tru by Hilton."),
  "Cross Vibe Viet Tri Hotel (X2 Vibe)": ("0210 2222 222", src("tripi.vn, mytour.vn, toplist.vn, tadiha.com, phuthotoplist.com đồng thuận; poster tuyển dụng trên fanpage chính thức ngày 22/10/2026")),
  "Tru by Hilton Viet Tri City Centre": ("0210 3636 555", src("hilton.com") + ". Lưu ý: cùng số + địa chỉ 938 Hùng Vương với SOJO Hotel Viet Tri — cùng một khách sạn, đã đổi thương hiệu."),
  "Zen Hotel Việt Trì": ("0968 024 678", src("fanpage chính thức ZEN HOTEL Việt Trì, nhiều bài đăng 10–11/2026") + "; Zalo 0948 818 123"),
  "Vườn Vua Resort & Villas": ("1900 0668 96", src("website chính thức vuonvua.vn; mia.vn đồng thuận") + "; landline 0210 653 8888"),
},
"quang-tri": {
  "Mường Thanh Grand Quảng Trị": ("0233 3898 888", src("booking.muongthanh.com; tripi.vn, kayak.com")),
  "Khách sạn Sài Gòn – Đông Hà": ("0233 3577 888", src("nhadatquangtri.vn, tripi.vn, toplist.vn, toiphuot.net, leadtour.vn đồng thuận; saigondonghahotel.com")),
  "Khách sạn Hữu Nghị": ("0233 3852 361", src("limoutrip.com (bài 07/11/2026), tripi.vn, toplist.vn, mytour.vn, nhadatquangtri.vn, toiphuot.net đồng thuận") + ". Lưu ý: địa chỉ thật là 68 Trần Hưng Đạo, khác 74 Lê Duẩn trong file."),
  "Khách sạn Nam Đông Hà": (None, null_src("chỉ tìm được 'Khách sạn Nam Đông' tại 348 Lê Duẩn (0233 3854 531), tên/địa chỉ không khớp file")),
  "Sơn Thủy Homestays (Mũi Si, Cửa Tùng)": ("0975 617 365", src("Google Travel ('Mũi Si Homestays cửa tùng', +84 975 617 365); vlog Facebook Minh Khánh") + ". Lưu ý: 'Sơn Thủy Retreat' (sonthuyretreat.vn, 0356 151 819) là cơ sở khác ở Thanh Thủy, Phú Thọ — không dùng."),
  "Retro Khe Sanh (Km62 QL9, Lương Lễ, Hướng Hóa)": (None, null_src("cơ sở có thật (Km62 QL9 Lương Lễ, Airbnb host Hung) nhưng không tìm được SĐT ở bất kỳ nguồn nào")),
  "Homestay/nhà nghỉ thị xã Quảng Trị": (None, null_src("mục chung chung, không có tên cụ thể")),
},
"ca-mau": {
  "Mường Thanh Luxury Cà Mau": ("0290 2228 888", src("booking.muongthanh.com; masothue.com, tripi.vn, tadiha.com, toplist.vn đồng thuận")),
  "Khách sạn Ánh Nguyệt": ("0290 3567 666", src("website chính thức anhnguyethotel.com.vn") + "; hotline quản lý 0918 868 586"),
  "Khách sạn Quốc Tế": ("0290 3666 666", src("mytour.vn, tripi.vn, ksvadl.com đồng thuận; dulichcamau.info")),
  "Khách sạn Nam Kiều": ("0290 3589 777", src("toplist.vn, tadiha.com, mytour.vn, csdl.vietnamtourism.gov.vn, hellocamau.vn đồng thuận") + ". Lưu ý: một nguồn ghi 151A Ngô Quyền, khác 132 trong file."),
  "Khách sạn Hải Châu": ("0290 3551 111", src("Google Travel, vietnamtourism.com.vn, ksvadl.com, tadiha.com đồng thuận") + ". Lưu ý: nhiều nguồn ghi 229 Hùng Vương, khác 299 trong file."),
  "Khách sạn Ozon": ("0290 3876 868", src("tripi.vn, mytour.vn, trangtop.com, toplist.vn, hanoidep.vn đồng thuận")),
  "Sao Kim Hotel Cà Mau": ("0290 3650 650", src("camautourism.vn (trang du lịch chính thức); quanlykhachsan.edu.vn")),
  "Homestay Du lịch sinh thái Đất Mũi – Quách Văn Ngãi": (None, null_src("nhiều số mâu thuẫn, không có đồng thuận, không có nguồn chính thức (0819 828 249; 0918 719 972; 0916 124 007; 0388 810 974; 0915 154 618; 0915 204 944; 0918 996 956)")),
},
}

# ---------------- Mùa + tháng ----------------
MUA_THANG = {
"tp-ho-chi-minh": ("Tháng 12–4 (mùa khô, khô ráo ít mưa)", "lonelyplanet.com; royalcaribbean.com (tháng 12–3)"),
"da-nang": ("Tháng 2–5, đẹp nhất tháng 3–5", "tiawellnessresort.com (trích Vietnam Tourism + số liệu WMO 1991–2020); annesttravel.com"),
"hue": ("Tháng 2–4", "camnanghue.com; vinpearl.com (tháng 3–4)"),
"can-tho": ("Tháng 9–11 (mùa nước nổi)", "thienhuongtourist.com; phanvantravel.com; luhanhvietnam.com.vn"),
"quang-ninh": ("Tháng 3–5 và tháng 9–11; tránh tháng 6–7 cao điểm bão", "vinpearl.com; nvktravel.com"),
"ninh-binh": ("Cuối tháng 4–đầu tháng 6 (lúa Tam Cốc chín vàng); tháng 9–11 mát, ít mưa", "bamozo.vn; vietnambackpackerhostels.com"),
"lao-cai": ("Tháng 9–10 (lúa chín Mường Hoa); tháng 12–2 săn mây, có thể có tuyết", "visitsapa.com.vn; blog.vexere.com"),
"phu-tho": ("Tháng 2–4 (giỗ Tổ Hùng Vương 10/3 âm lịch); tháng 9–11 mát", "traveloka.com"),
"quang-tri": ("Tháng 3–5 (đẹp nhất); tránh tháng 9–11 mưa bão", "phanvantravel.com"),
"ca-mau": ("Tháng 12–4 (mùa khô); ba khía ngon nhất tháng 7–8 âm lịch", "vnexpress.net"),
}

# ---------------- Trời mưa (chỉ điểm đã có trong file) ----------------
KHI_TROI_MUA = {
"tp-ho-chi-minh": (["Dinh Độc Lập (Dinh Thống Nhất)", "Bảo tàng Chứng tích Chiến tranh", "Bảo tàng Lịch sử TP.HCM", "Chợ Bến Thành", "Bưu điện Trung tâm Sài Gòn"],
  "Mưa rào Sài Gòn thường tạnh nhanh — trú trong bảo tàng, dinh, chợ có mái rồi đi tiếp khi ngớt."),
"da-nang": (["Bảo tàng Điêu khắc Chăm", "Chợ Hàn – chợ Cồn", "Núi Thần Tài (Suối khoáng nóng)", "Phố cổ Hội An"],
  "Mưa Đà Nẵng hay kéo dài cả ngày — ưu tiên bảo tàng, chợ trong nhà, suối khoáng nóng; tránh đi đảo, đèo Hải Vân khi mưa to."),
"hue": (["Chợ Đông Ba", "Cung An Định", "Làng hương Thủy Xuân", "Chùa Thiên Mụ"],
  "Mưa Huế dai và lạnh — trú chợ, cung, chùa có mái; mang áo mưa, đi giày chống trơn vì sân đá lăng tẩm trơn."),
"can-tho": (["Nhà cổ Bình Thủy", "Chùa Munir Ansay (Chùa Khmer)", "Thiền viện Trúc Lâm Phương Nam", "Chùa Ông (Quảng Triệu Hội Quán)"],
  "Mưa miền Tây thường rào ngắn buổi chiều — trú chùa, nhà cổ có mái rồi ra chợ nổi sáng sớm hôm sau."),
"quang-ninh": (["Bảo tàng Quảng Ninh", "Chùa Ba Vàng", "Hang Sửng Sốt"],
  "Mưa to/bão thì tàu vịnh cấm chạy — ở lại bờ, đi bảo tàng, chùa; chỉ đi hang khi tàu vẫn chạy bình thường."),
"ninh-binh": (["Chùa Bái Đính", "Nhà thờ đá Phát Diệm", "Chùa Bích Động", "Cố đô Hoa Lư (đền Đinh – đền Lê)"],
  "Mưa thì tránh đi thuyền Tràng An/Tam Cốc và leo Hang Múa (đỉnh Ngọa Long, ~500 bậc) (đá trơn) — trú chùa, nhà thờ đá, đền có mái."),
"lao-cai": (["Nhà thờ đá Sa Pa", "Dinh Hoàng A Tưởng (Dinh thự Hoàng Yến Chao)"],
  "Mưa núi lạnh và đường trơn — trú nhà thờ đá, dinh thự có mái; không trekking bản, không lên Fansipan khi mưa to/sương mù dày."),
"phu-tho": (["Bảo tàng Hùng Vương", "Đền Tam Giang và chùa Đại Bi", "Đền Quốc Tổ Lạc Long Quân", "Khu suối khoáng nóng Thanh Thủy (Vườn Vua Resort & Villas)"],
  "Mưa thì trú bảo tàng, đền chùa có mái hoặc ngâm suối khoáng nóng; tránh leo núi Đền Hùng khi mưa to vì bậc đá trơn."),
"quang-tri": (["Địa đạo Vĩnh Mốc", "Chợ Đông Hà", "Nhà thờ La Vang (Thánh địa La Vang)"],
  "Mưa thì xuống địa đạo Vĩnh Mốc (đi trong lòng đất, không ướt), trú chợ, nhà thờ; tránh ra đảo Cồn Cỏ, biển khi mưa bão."),
"ca-mau": (["Chợ Cà Mau", "Nhà Công tử Bạc Liêu", "Chùa Xiêm Cán"],
  "Mưa miền Tây rào ngắn — trú chợ, nhà cổ, chùa có mái; tránh đi rừng U Minh, Đất Mũi khi mưa to vì đường trơn, cano hạn chế."),
}

# ---------------- Cặp đôi ----------------
# cho_o: tên chỗ ở có hop_voi chứa "cặp đôi" (lấy từ file); diem: 3-4 địa danh đã có trong file.
CHO_CAP_DOI = {
"tp-ho-chi-minh": (["Rex Hotel Saigon", "Hotel Majestic Saigon", "Silverland Sakyo Hotel & Spa", "Hương Sen Annex Saigon", "ÊMM Saigon Hotel"],
  ["Nhà thờ Đức Bà Sài Gòn", "Phố đi bộ Nguyễn Huệ", "Bến Bạch Đằng / Buýt đường sông (Water Bus)", "Landmark 81 / khu Vinhomes Central Park"]),
"da-nang": (["Furama Resort Đà Nẵng", "Hilton Da Nang", "Khách sạn 3 sao khu vực biển Mỹ Khê"],
  ["Phố cổ Hội An", "Biển Mỹ Khê", "Cầu Rồng", "Bán đảo Sơn Trà – chùa Linh Ứng"]),
"hue": (["La Residence Hue Hotel & Spa", "Pilgrimage Village Boutique Resort & Spa", "Êmm Hotel Huế"],
  ["Cầu Trường Tiền – sông Hương", "Đồi Vọng Cảnh", "Phá Tam Giang", "Lăng Tự Đức"]),
"can-tho": (["De Rivé Homestay"],
  ["Bến Ninh Kiều", "Chợ nổi Cái Răng", "Cồn Sơn", "Vườn ca cao Mười Cương"]),
"quang-ninh": (["Vinpearl Resort & Spa Hạ Long", "Khách sạn khu Bãi Cháy 3 sao", "Du thuyền ngủ đêm vịnh Hạ Long (4–5 sao)", "Homestay/khách sạn đảo Quan Lạn"],
  ["Vịnh Hạ Long (tàu tham quan VHL1/VHL2)", "Vịnh Bái Tử Long", "Đảo Quan Lạn (Minh Châu)", "Đảo Cô Tô"]),
"ninh-binh": (["Tam Coc Garden Resort", "Homestay Tam Cốc (khu vực Ninh Hải)"],
  ["Tam Cốc – Bích Động (thuyền qua 3 hang, ruộng lúa)", "Hang Múa (đỉnh Ngọa Long, ~500 bậc)", "Đầm Vân Long (thuyền ngắm voọc)", "Nhà thờ đá Phát Diệm"]),
"lao-cai": (["Hôtel de la Coupole – MGallery Sa Pa", "Topas Ecolodge", "Little Sapa Homestay"],
  ["Bản Cát Cát", "Thác Tình Yêu (Suối Vàng)", "Nhà thờ đá Sa Pa", "Thung lũng Mường Hoa"]),
"phu-tho": (["Khách sạn Sài Gòn – Phú Thọ", "Cross Vibe Viet Tri Hotel (X2 Vibe)"],
  ["Đồi chè Long Cốc", "Đầm Ao Châu", "Công viên Văn Lang", "Khu suối khoáng nóng Thanh Thủy (Vườn Vua Resort & Villas)"]),
"quang-tri": ([],
  ["Biển Cửa Tùng", "Biển Cửa Việt", "Biển Mỹ Thủy", "Cầu Hiền Lương – sông Bến Hải (vĩ tuyến 17)"]),
"ca-mau": ([],
  ["Đầm Thị Tường", "Khu du lịch Quốc gia Mũi Cà Mau", "Hòn Đá Bạc", "Chợ Cà Mau"]),
}

TINH = ["tp-ho-chi-minh", "da-nang", "hue", "can-tho", "quang-ninh",
        "ninh-binh", "lao-cai", "phu-tho", "quang-tri", "ca-mau"]

def main():
    for slug in TINH:
        jp = BASE / f"{slug}.json"
        raw = jp.read_bytes()
        ends_nl = raw.endswith(b"\n")
        data = json.loads(raw.decode("utf-8"))

        # --- kiểm tra tên chỗ ở khớp đúng SDT ---
        ten_file = [c["ten"] for c in data["cho_o"]]
        ten_sdt = list(SDT[slug].keys())
        assert ten_file == ten_sdt, f"{slug}: tên cho_o lệch!\nfile={ten_file}\nsdt={ten_sdt}"

        # --- kiểm tra tên địa danh dùng cho khi_troi_mua / cho_cap_doi có trong file ---
        ten_dd = [d["ten"] for d in data["dia_danh"]]
        for ten in KHI_TROI_MUA[slug][0] + CHO_CAP_DOI[slug][1]:
            assert ten in ten_dd, f"{slug}: địa danh không có trong file: {ten!r}"
        # kiểm tra cho_o cặp đôi đúng hop_voi
        hop = {c["ten"]: c.get("hop_voi", "") for c in data["cho_o"]}
        for ten in CHO_CAP_DOI[slug][0]:
            assert "cặp đôi" in hop[ten].lower(), f"{slug}: {ten!r} không có 'cặp đôi' trong hop_voi ({hop[ten]!r})"
        # kiểm tra không sót chỗ ở nào có 'cặp đôi'
        sot = [t for t, h in hop.items() if "cặp đôi" in h.lower() and t not in CHO_CAP_DOI[slug][0]]
        assert not sot, f"{slug}: sót chỗ ở cặp đôi: {sot}"

        # --- ghi SĐT ---
        for c in data["cho_o"]:
            sdt, nguon = SDT[slug][c["ten"]]
            c["dien_thoai"] = sdt
            c["nguon_dien_thoai"] = nguon

        # --- 3 key mới ---
        diem_mua, dan_mua = KHI_TROI_MUA[slug]
        data["khi_troi_mua"] = {"diem": diem_mua, "dan": dan_mua}
        co, diem_cd = CHO_CAP_DOI[slug]
        data["cho_cap_doi"] = {"cho_o": co, "diem": diem_cd}
        thang, nguon_mua = MUA_THANG[slug]
        data["mua_thang"] = {"thang_dep_nhat": thang, "nguon": nguon_mua, "ngay_kiem": NGAY}

        out = json.dumps(data, ensure_ascii=False, sort_keys=True, separators=(",", ":"))
        if ends_nl:
            out += "\n"
        jp.write_text(out, encoding="utf-8")
        n_co = sum(1 for c in data["cho_o"] if c["dien_thoai"])
        print(f"{slug}: {len(data['cho_o'])} chỗ ở, có SĐT {n_co}, null {len(data['cho_o'])-n_co}")

    print("JSON OK")

if __name__ == "__main__":
    main()
