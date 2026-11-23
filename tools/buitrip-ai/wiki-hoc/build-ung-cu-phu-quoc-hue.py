#!/usr/bin/env python3
"""Dịch 96 mục ứng cử Phú Quốc + Huế (Wikivoyage tiếng Anh) sang tiếng Việt.
- Nguồn: wiki-hoc/ung-cu-muc-moi.json (trích 23/11/2026).
- Chỉ dịch, KHÔNG sửa kho-kien-thuc.json.
- Kiểm trùng với kho bằng chuẩn hóa (đ->d trước NFD) + substring 2 chiều.
- Giá USD/EUR-only hoặc ghi năm trước 2024 -> "chưa kiểm được" (không đổi tỷ giá).
Đầu ra: wiki-hoc/ung-cu-phu-quoc-hue-vi.json + in thống kê ra stdout.
"""
import json, re, unicodedata

BASE = "/home/hatch/workspace/buitrip-ai-local/wiki-hoc/"
NGUON_PQ = "Wikivoyage tiếng Anh — https://en.wikivoyage.org/wiki/Phu_Quoc (lấy ngày 24/11/2026)"
NGUON_HUE = "Wikivoyage tiếng Anh — https://en.wikivoyage.org/wiki/Hue (lấy ngày 24/11/2026)"
CKD = "chưa kiểm được"

def norm(s):
    s = (s or "").lower().replace("đ", "d")
    s = "".join(c for c in unicodedata.normalize("NFD", s) if unicodedata.category(c) != "Mn")
    return " ".join(re.sub(r"[^a-z0-9 ]+", " ", s).split())

def E(ten, tinh, gia, gio, ghi, nguon, loai=None):
    d = {"ten": ten, "tinh": tinh, "gia": gia, "gio": gio, "ghi_chu": ghi, "nguon": nguon}
    if loai:
        d["loai"] = loai
    return d

PQ = [
    # See
    E("Sông Cửa Cạn", "An Giang", CKD, CKD,
      "Sông ở phía bắc đảo Phú Quốc, đổ ra biển tại khu vực Cửa Cạn.", NGUON_PQ),
    E("Thị trấn An Thới", "An Giang", CKD, CKD,
      "Thị trấn ở mũi nam đảo Phú Quốc, cửa ngõ đi cáp treo Hòn Thơm và tour các đảo phía nam.", NGUON_PQ),
    E("Bãi Sao", "An Giang", CKD, CKD,
      "Bãi biển đẹp nhất đảo theo Wikivoyage, có nhà hàng/quán cà phê và ghế tắm nắng. Nằm ở góc đông nam đảo, cách thị trấn An Thới vài km về phía bắc.", NGUON_PQ),
    E("Bãi Ông Lang", "An Giang", CKD, CKD,
      "Bãi biển đẹp để ngắm hoàng hôn; phần lớn do các resort quản lý và dọn dẹp, du khách vẫn có thể trải khăn tắm nắng, hoặc ra đoạn bờ đá ở đầu bắc, xa khu resort.", NGUON_PQ),
    E("Nhà tù Phú Quốc", "An Giang", "Miễn phí", CKD,
      "Nhà tù do Pháp xây, dùng giam tù binh trong chiến tranh chống Mỹ. Địa chỉ: 350 Nguyễn Văn Cừ.", NGUON_PQ),
    # Do
    E("Jerry's Jungle Tours", "An Giang", CKD, CKD,
      "Tour khám phá quần đảo bằng thuyền, lặn ngắm san hô, câu cá, tour đảo 1 ngày và nhiều ngày, tour xe máy, leo núi đá, ngắm chim, đi bộ và tour văn hóa quanh Phú Quốc. Địa chỉ: Dương Đông.", NGUON_PQ),
    E("Flipper Diving Club", "An Giang", CKD, "Hằng ngày 09:00–20:00",
      "Trung tâm lặn duy nhất trên đảo vừa là trung tâm PADI vừa là trung tâm SSI; dạy từ mới bắt đầu đến divemaster, có ngày dọn rác biển. Giá gốc theo USD (lặn fun dive 65 USD). Địa chỉ: 42 Trần Hưng Đạo, Dương Đông.", NGUON_PQ),
    E("John's Tour", "An Giang", CKD, CKD,
      "Tour lặn ngắm san hô. Giá gốc từ 15 USD.", NGUON_PQ),
    E("Phú Quốc Explorer", "An Giang", CKD, CKD,
      "Tour lặn ngắm san hô. Giá gốc từ 15 USD.", NGUON_PQ),
    E("Vietnam Explorers", "An Giang", CKD, "Hằng ngày 08:00–21:00",
      "Trung tâm lặn lâu đời nhất đảo (trước đây là Rainbow Divers); có khóa PADI, lặn ngắm san hô và lặn bình, hướng dẫn nhiều ngôn ngữ châu Âu và tiếng Việt. Giá gốc: fun dive 90 USD. Địa chỉ: ĐT 47, tổ 2, Suối Mây, xã Dương Tơ.", NGUON_PQ),
    E("Sunny Boat Trip", "An Giang", CKD, CKD,
      "Tour thuyền lặn ngắm san hô. Giá gốc từ 15 USD.", NGUON_PQ),
    E("X-Dive", "An Giang", CKD, CKD,
      "Lặn ở phía bắc và phía nam đảo tùy điều kiện biển; không dạy khóa PADI. Địa chỉ: Dương Đông.", NGUON_PQ),
    E("Phú Quốc Island Tours", "An Giang", CKD, CKD,
      "Hướng dẫn viên tiếng Anh và tiếng Việt đưa đi các điểm nóng trên đảo bằng đường bộ và đường biển; có cắm trại, chèo kayak + cắm trại, trekking Vườn quốc gia. Địa chỉ: 1 Trần Hưng Đạo (gần Salinda Resort).", NGUON_PQ),
    # Eat
    E("The Dog Bar", "An Giang", CKD, "Mở đến khuya",
      "Quán bar phục vụ burger, pizza, món Tây, món Việt và hải sản; xem thể thao trực tiếp, chơi bi-a, phi tiêu, nhạc sống; có thể đặt tour lặn tại đây. Địa chỉ: 88 Trần Hưng Đạo, Dương Đông.", NGUON_PQ, "mon_an"),
    E("Ganesh Indian Restaurant", "An Giang", CKD, CKD,
      "Nhà hàng Ấn Độ. Địa chỉ: 97 Trần Hưng Đạo, Dương Đông.", NGUON_PQ, "mon_an"),
    E("Nhà hàng Gió Biển", "An Giang", CKD, CKD,
      "Hải sản tươi và món Việt; bãi biển cách bàn ăn chỉ vài mét; nên thử lẩu cá kho (cá kho caramel) buổi trưa hoặc tối. Địa chỉ: xã Gành Dầu.", NGUON_PQ, "mon_an"),
    E("Ocean Bar and Grill", "An Giang", CKD, CKD,
      "Hải sản tươi nấu theo yêu cầu, phục vụ tốt. Địa chỉ: 60 Trần Hưng Đạo, Dương Đông.", NGUON_PQ, "mon_an"),
    E("Rory's Beach Bar", "An Giang", CKD, CKD,
      "Quán bar bãi biển của ông chủ người Úc; bia tươi khoảng 35.000đ, cocktail khoảng 100.000đ, món ăn trung bình 120.000đ. Địa chỉ: 118/10 Trần Hưng Đạo.", NGUON_PQ, "mon_an"),
    E("The Rabbit Hole Irish Sports Bar", "An Giang", CKD, "Hằng ngày 10:00–02:00",
      "Quán bar thể thao kiểu Ireland; nhân viên nói tiếng Anh, có chỗ ngồi ngoài trời, điều hòa, wifi miễn phí, món Tây và món Việt, nhiều màn hình xem thể thao, bàn bi-a, phi tiêu. Địa chỉ: 118/2/1 Trần Hưng Đạo, khu phố 7.", NGUON_PQ, "mon_an"),
    # Sleep
    E("Amigos Guesthouse", "An Giang", CKD, CKD,
      "Bungalow sạch sẽ, nước nóng/lạnh, điều hòa, tủ lạnh, TV vệ tinh, giường đôi; ngay bãi biển, có nhà hàng và bar, wifi miễn phí. Địa chỉ: 118/10 Trần Hưng Đạo.", NGUON_PQ, "cho_o"),
    E("Bamboo Cottages", "An Giang", CKD, CKD,
      "15 bungalow bê tông nhìn ra biển (trực diện hoặc một phần) và 4 nhà gỗ kiểu ngư dân Phú Quốc xưa; gần bãi biển riêng, dùng điện mặt trời, vườn cây bao quanh; chèo kayak và lặn miễn phí, cho thuê xe máy. Giá gốc 45–125 USD. Địa chỉ: Bãi Vũng Bầu.", NGUON_PQ, "cho_o"),
    E("Cassia Cottage", "An Giang", CKD, CKD,
      "Bungalow nhìn biển và bungalow vườn. Giá gốc 85–170 USD.", NGUON_PQ, "cho_o"),
    E("Chez Carole", "An Giang", CKD, CKD,
      "Resort khoảng 12 bungalow ở cửa sông Cửa Cạn, cách Dương Đông và sân bay khoảng 15 km về phía bắc; có hồ bơi, nhà hàng, bar, vườn; không có bãi biển nhưng có cồn cát nhỏ ở cửa sông, đi thuyền hoặc bơi ra được; chèo kayak, canoe. Giá gốc từ 160 USD.", NGUON_PQ, "cho_o"),
    E("Eden Resort", "An Giang", CKD, CKD,
      "Phòng rộng, thiết kế hiện đại, ban công, bồn tắm, minibar, điều hòa; resort dọc bãi cát, có nhà hàng bên hồ bơi, bar nhỏ, wifi miễn phí, phòng gym nhỏ. Giá gốc 150 USD.", NGUON_PQ, "cho_o"),
    E("Lang Toi", "An Giang", CKD, CKD,
      "Một trong hai hostel trên Bãi Sao (bãi đẹp nhất đảo); có điều hòa, nước nóng; đêm trăng tròn có thể ngắm trăng mọc từ biển (Bãi Sao ở phía đông đảo). Tên ghi theo nguồn (không dấu). Giá gốc từ 60 USD. Địa chỉ: Bãi Sao.", NGUON_PQ, "cho_o"),
    E("Little Garden Bungalow", "An Giang", CKD, CKD,
      "Bungalow quanh vườn hồ bơi, nhiều cây xanh; gần Dương Đông, cách bãi biển khoảng 500 m; 26 phòng, điều hòa, wifi. Giá gốc từ 35 USD. Địa chỉ: 113/5 Trần Hưng Đạo.", NGUON_PQ, "cho_o"),
    E("Mai House", "An Giang", CKD, CKD,
      "14 villa mái lá chất lượng cao trong vườn ven biển, có ghế tắm nắng; không có tủ lạnh và hồ bơi, có điều hòa, két, ấm trà/cà phê, khăn tắm biển, wifi miễn phí ở sảnh và nhà hàng; có bữa sáng. Giá gốc 50 USD mùa thấp điểm, 90 USD mùa cao điểm.", NGUON_PQ, "cho_o"),
    E("Mango Bay Resort", "An Giang", CKD, CKD,
      "Resort yên tĩnh giữa biển và khu rừng bảo tồn; bãi biển của resort nhỏ nhưng bãi bên cạnh còn hoang sơ, có rạn san hô đẹp để lặn; bungalow tách biệt nhau, có vườn rau và gia vị. Giá gốc 90–150 USD.", NGUON_PQ, "cho_o"),
    E("Paris Beach Resort", "An Giang", CKD, CKD,
      "Resort giá rẻ, chủ là cặp vợ chồng giáo sư người Pháp – Việt, thân thiện; đồ ăn ngon, giá hợp lý. Giá gốc 20–40 USD. Địa chỉ: Cầu Bà Phong, Cửa Lấp, Dương Tơ.", NGUON_PQ, "cho_o"),
    E("Peppercorn Beach", "An Giang", CKD, CKD,
      "8 bungalow sang trọng có điều hòa, cách bãi biển vài mét, nhìn ra đất liền Campuchia và Việt Nam. Giá gốc 110–160 USD. Địa chỉ: tổ 8, ấp Chuồng Vích, Gành Dầu.", NGUON_PQ, "cho_o"),
    E("Saigon Phu Quoc Resort & Spa", "An Giang", CKD, CKD,
      "Khách sạn lớn lâu đời nhất trên đảo, gần trung tâm Dương Đông và khu nhà hàng. Giá gốc từ 200 USD.", NGUON_PQ, "cho_o"),
    E("La Veranda", "An Giang", CKD, CKD,
      "43 phòng và villa quanh hồ bơi, trong tòa nhà thuộc địa kiểu Pháp (La Veranda Resort Phú Quốc). Giá gốc 25–250 USD.", NGUON_PQ, "cho_o"),
    E("Việt Thanh Bungalow", "An Giang", CKD, CKD,
      "Bungalow có màn chống muỗi, nước nóng, wifi miễn phí (chỉ bungalow phía trước). Giá gốc 6–15 USD. Địa chỉ: khu phố 7, Dương Đông.", NGUON_PQ, "cho_o"),
    E("Salinda Resort & Spa", "An Giang", CKD, CKD,
      "121 phòng deluxe, villa và suite tổng thống, kiến trúc hiện đại. Giá gốc 200 EUR. Địa chỉ: ấp Cửa Lấp, xã Dương Tơ.", NGUON_PQ, "cho_o"),
]

HUE = [
    # See
    E("Sân bay Quốc tế Phú Bài", "Huế", CKD, CKD,
      "Sân bay của Huế; thời chiến từng là đường băng đất, quân đội Mỹ xây hầm bê tông và đường băng trải nhựa; nay đã cải tạo thành sân bay dân dụng. Cách trung tâm Huế khoảng 15 km.", NGUON_HUE),
    E("Bảo tàng Mỹ thuật Cung đình Huế", "Huế", CKD, CKD,
      "Bảo tàng mỹ thuật cung đình triều Nguyễn (trong Hoàng thành, điện Long An).", NGUON_HUE),
    E("Lăng Gia Long", "Huế", "50.000đ/người lớn; trẻ em miễn phí", CKD,
      "Lăng xa nhất trong các lăng vua Nguyễn, yên tĩnh, đã xuống cấp nhiều; Gia Long là vị vua đầu tiên của nhà Nguyễn.", NGUON_HUE),
    E("Lăng Thiệu Trị", "Huế", "50.000đ/người lớn; trẻ em miễn phí", CKD,
      "Xây năm 1848; vua Thiệu Trị và vợ là những người được kính trọng nhất; di nguyện của vua là lăng không xa hoa, khác truyền thống lăng tẩm lộng lẫy.", NGUON_HUE),
    E("Lăng Đồng Khánh", "Huế", "50.000đ/người lớn; trẻ em miễn phí", CKD,
      "Xây năm 1917; tranh tường nội thất đẹp; lăng xây bằng đá cẩm thạch và gốm sứ sặc sỡ; khoảng 100 bậc thang, người khó đi lại nên lưu ý.", NGUON_HUE),
    # Do
    E("Massage Niềm Tin (massage người khiếm thị)", "Huế", "Massage 40.000đ/giờ; xông hơi 30.000đ/giờ", CKD,
      "Cơ sở massage của Hội Người mù (Công ty Niềm Tin 17-4); nhân viên đều là người khiếm thị, sống và làm việc tại cơ sở, nói được chút tiếng Anh; được người dân địa phương ưa chuộng. Giá theo Wikivoyage, nên hỏi lại tại chỗ. Địa chỉ: 1/180 Phan Bội Châu.", NGUON_HUE),
    E("Suối nước nóng Mỹ An", "Huế", CKD, CKD,
      "Nước suối có hàm lượng lưu huỳnh cao, được cho là tốt cho sức khỏe; có hồ bơi và 2 hồ nước nóng. Giá gốc 3 USD cho khách nước ngoài (theo Wikivoyage).", NGUON_HUE),
    E("Suối nước nóng Thanh Tân", "Huế", CKD, CKD,
      "Giống Mỹ An nhưng không có mùi lưu huỳnh; khu vực có rừng, có các bể nước nhiệt độ tăng dần (bể nóng nhất đóng cửa vì quá nóng), bể riêng cho 2–4 người, hồ bơi và nhà hàng nhỏ; đây cũng là nguồn nước khoáng đóng chai Thanh Tân.", NGUON_HUE),
    # Eat
    E("Quán Chay Thanh Liễu", "Huế", CKD, "09:00–20:00",
      "Quán chay thuần chay, ăn cùng người địa phương; lẩu chay ngon, suất lớn. Giá lẩu 50.000đ là giá tháng 6/2017, nay chưa kiểm được. Địa chỉ: 50 Nguyễn Công Trứ.", NGUON_HUE, "mon_an"),
    E("Cafe on Thu Wheels", "Huế", CKD, CKD,
      "Quán ăn cho khách du lịch, nhiều món đơn giản ngon, có cả rượu vang trắng và đỏ; quán gia đình, bà chủ tự tay quán xuyến. Địa chỉ: 3 kiệt 34 Nguyễn Tri Phương.", NGUON_HUE, "mon_an"),
    E("Family Home Restaurant", "Huế", CKD, CKD,
      "Quán nhỏ như phòng khách nhà bà ngoại; món Huế ngon, cay, đúng vị, không Tây hóa; nhân viên thân thiện. Địa chỉ: 11 kiệt 34 Nguyễn Tri Phương.", NGUON_HUE, "mon_an"),
    E("Nina's Cafe Restaurant", "Huế", CKD, CKD,
      "Quán trong hẻm, phục vụ khách nước ngoài; menu tiếng Anh, nhân viên nói tiếng Anh, nhạc hay, không gian đẹp. Địa chỉ: 16/34 Nguyễn Tri Phương.", NGUON_HUE, "mon_an"),
    E("Liên Hoa", "Huế", CKD, CKD,
      "Quán chay; các sư thầy và sư cô thường ghé ăn trưa. Địa chỉ: 3 Lê Quý Đôn.", NGUON_HUE, "mon_an"),
    E("Cơm Chay Diệu Lạc", "Huế", CKD, CKD,
      "Cơm chay đơn giản, ngon. Địa chỉ: 1 Hàn Mặc Tử, Vỹ Dạ.", NGUON_HUE, "mon_an"),
    E("Bánh Khoái Hồng Mai", "Huế", CKD, CKD,
      "Bánh khoái, nem lụi (thịt băm nướng sả trên than) và bánh bèo được khuyên thử. Địa chỉ: 110 Đinh Tiên Hoàng (góc Nguyễn Biểu).", NGUON_HUE, "mon_an"),
    E("Quán Cơm Chay Nhật Lệ", "Huế", CKD, CKD,
      "Quán chay đông khách; chỉ cần nói muốn ăn cơm hay bún/mì là chủ quán lo; sữa đậu nành và sữa hạt sen ngon, có bún xào chay. Địa chỉ: 85 Nhật Lệ.", NGUON_HUE, "mon_an"),
    E("Phố bánh canh Hàn Thuyên", "Huế", CKD, CKD,
      "Dãy quán bánh canh vỉa hè bán đến khuya; ngồi vỉa hè mát. Giá 15.000–20.000đ/tô là giá tháng 4/2022, nay chưa kiểm được. Địa chỉ: đường Hàn Thuyên, Phú Hậu.", NGUON_HUE, "mon_an"),
    E("Bánh Khoái Hạnh", "Huế", "20.000–55.000đ/phần", "10:00–21:00",
      "Quán bánh khoái nổi tiếng hơn 30 năm ở Huế; vỏ vàng giòn, nhân tôm thịt đầy đặn, nước lèo sánh; còn có nem lụi, bánh bèo, bánh nậm, bánh lọc, gỏi cuốn. Giá Wikivoyage tháng 1/2018 đã cũ; giá và giờ hiện tại đối chiếu nguồn Việt 2026 (tourhue.vn, AEON Mall Huế). Địa chỉ: 11–15 Phó Đức Chính.", NGUON_HUE, "mon_an"),
    E("La Carambole", "Huế", CKD, CKD,
      "Món Pháp, món Việt và pizza; khá đông khách du lịch. Địa chỉ: 19 Phạm Ngũ Lão.", NGUON_HUE, "mon_an"),
    E("Hot Tuna", "Huế", CKD, CKD,
      "Nên thử ức gà sốt nấm với khoai tây nghiền; vịt cũng ngon. Địa chỉ: 37 Võ Thị Sáu.", NGUON_HUE, "mon_an"),
    E("Ta.ke Japanese Restaurant", "Huế", CKD, CKD,
      "Nhà hàng Nhật, đồ ăn rất ngon. Địa chỉ: 34 Trần Cao Vân.", NGUON_HUE, "mon_an"),
    E("Ông Táo", "Huế", CKD, CKD,
      "Món Huế truyền thống; nên thử chả cuốn (cuốn lá bạc hà) hoặc chả giò chiên, rất giòn; có suất nhỏ và suất lớn để gọi nhiều món. Địa chỉ: 31 Chu Văn An.", NGUON_HUE, "mon_an"),
    E("Nhà hàng Ancient Hue (Ẩm thực Cung đình Huế xưa)", "Huế", CKD, CKD,
      "Một trong những nhà hàng lớn nhất thành phố; món ngon, rất sạch; khu nhà cổ trong vườn rộng, có chạm khắc món ăn. Địa chỉ: 104/47 Kim Long.", NGUON_HUE, "mon_an"),
    # Drink
    E("B4 Bar-Café", "Huế", CKD, CKD,
      "Quán bar của chủ người Bỉ – Việt, nội thất ấm cúng, có bi-a miễn phí. Địa chỉ: 75 Bến Nghé.", NGUON_HUE, "mon_an"),
    E("Brown Eyes", "Huế", "Miễn phí vào cửa", "Happy hour 17:00–22:00",
      "Bar-club có DJ, bàn bi-a miễn phí, không khí vui; nhóm từ 4 người trở lên được trả tiền taxi từ khách sạn; mở đến khi khách cuối cùng về. Địa chỉ: 56 Chu Văn An.", NGUON_HUE, "mon_an"),
    E("DMZ Bar", "Huế", CKD, "Mở đến khuya",
      "Bar & café. Địa chỉ: 44 Lê Lợi.", NGUON_HUE, "mon_an"),
    E("Vỹ Dạ Xưa", "Huế", CKD, CKD,
      "Uống cà phê Việt hoặc đồ uống khác trong nhà rường truyền thống, vườn và suối nhỏ, nghe chim hót và nhạc nhẹ. Địa chỉ: 131 Nguyễn Sinh Cung.", NGUON_HUE, "mon_an"),
    E("Why Not?", "Huế", CKD, CKD,
      "Bar & café. Địa chỉ: 21 Võ Thị Sáu.", NGUON_HUE, "mon_an"),
    E("Garden River Bar Coffee", "Huế", CKD, "07:00–22:30",
      "Quán cà phê bar giữa trung tâm Huế; vừa uống vừa nghe nhạc bên bờ sông trong vườn; đội ngũ Việt – Pháp. Địa chỉ: 1/7 Nguyễn Công Trứ.", NGUON_HUE, "mon_an"),
    E("La Beaute", "Huế", "Cà phê 12.000đ", "12:00–22:00",
      "Quán cà phê yên tĩnh trong hẻm nhỏ, nhạc nhẹ, tre xanh; nhiều loại cà phê và bánh, nên thử cà phê cacao; giá rẻ bằng nửa khu du lịch cách đó 200 m. Địa chỉ: 87 Võ Thị Sáu.", NGUON_HUE, "mon_an"),
    # Sleep
    E("Amigo Hotel", "Huế", CKD, CKD,
      "Khách sạn trong khu nhà nghỉ giá rẻ; nhân viên thân thiện, phòng tốt, giá có thể thương lượng; wifi và máy tính miễn phí, điều hòa, TV vệ tinh, giặt ủi 20.000đ/kg; nhà hàng tầng dưới giá hợp lý. Giá gốc 13–25 USD. Địa chỉ: 66/3 Lê Lợi.", NGUON_HUE, "cho_o"),
    E("Hue Amazing Homestay", "Huế", CKD, "Lễ tân 24/24",
      "Homestay, nhân viên nhiệt tình, wifi và bữa sáng miễn phí, lễ tân 24 giờ. Giá gốc dorm 5 USD. Địa chỉ: 21/1 Phạm Ngũ Lão.", NGUON_HUE, "cho_o"),
    E("Bamboo Hotel", "Huế", CKD, CKD,
      "Khách sạn tốt, nhân viên thân thiện, phòng sạch sẽ gọn gàng, internet miễn phí. Giá gốc từ 10 USD. Địa chỉ: 61 Hùng Vương.", NGUON_HUE, "cho_o"),
    E("Khách sạn Bình Dương I", "Huế", CKD, CKD,
      "Điều hòa, nước nóng, TV vệ tinh; được khách Nhật ưa chuộng; nhân viên thân thiện; một số phòng có bồn tắm và/hoặc ban công riêng. Giá gốc từ 10 USD, dorm 4 USD. Địa chỉ: 17/34 Nguyễn Tri Phương.", NGUON_HUE, "cho_o"),
    E("Canary Hotel", "Huế", CKD, CKD,
      "Phòng có điều hòa, TV LCD 32 inch, vòi sen + bồn tắm, minibar; có bar, nhà hàng, phòng internet, cửa hàng lưu niệm, giặt ủi. Giá gốc 16 USD. Địa chỉ: 37 Nguyễn Công Trứ.", NGUON_HUE, "cho_o"),
    E("Vietnam Backpacker Hostels – Huế", "Huế", CKD, CKD,
      "Cùng chủ với Hanoi Backpacker's Hostel; chỗ ở rẻ, sạch, ban công rộng; internet/wifi miễn phí, nhân viên thân thiện; tầng dưới là bar và nhà hàng, có cho thuê xe đạp, tour, lớp nấu ăn. Giá gốc từ 5 USD. Địa chỉ: 40 Chu Văn An.", NGUON_HUE, "cho_o"),
    E("Khách sạn Lâm Bảo Long", "Huế", "139.000–255.000đ/phòng", CKD,
      "15 phòng không hút thuốc, điều hòa, áo choàng tắm, báo hằng ngày, bàn làm việc, máy sấy tóc. Địa chỉ: 10 Phạm Ngũ Lão.", NGUON_HUE, "cho_o"),
    E("Mimosa Guesthouse", "Huế", CKD, CKD,
      "Nhà nghỉ thân thiện, yên tĩnh, trong hẻm khách sạn gần Lê Lợi. Giá gốc từ 4 USD. Địa chỉ: đường Lê Lợi.", NGUON_HUE, "cho_o"),
    E("Khách sạn Minh Hiếu", "Huế", CKD, CKD,
      "Khách sạn gia đình; phòng sạch, TV vệ tinh, nước nóng, tủ lạnh mini; mỗi tầng có ban công; bữa sáng 1 USD. Giá gốc từ 10 USD. Địa chỉ: 3 Chu Văn An.", NGUON_HUE, "cho_o"),
    E("Khách sạn Phong Lan", "Huế", CKD, CKD,
      "Khách sạn sạch đẹp trên phố nhỏ yên tĩnh gần Phạm Ngũ Lão; phòng có ban công, điều hòa, phòng tắm riêng, cho 2–4 người; wifi, thuê xe đạp và xe máy miễn phí. Giá gốc 10 USD. Địa chỉ: 12/66 Lê Lợi.", NGUON_HUE, "cho_o"),
    E("Sports Hotel", "Huế", CKD, CKD,
      "Khách sạn giá rẻ trên phố du lịch chính; phòng sạch, rộng, gần sông. Giá gốc từ 10 USD. Địa chỉ: 15 Phạm Ngũ Lão.", NGUON_HUE, "cho_o"),
    E("Valentine Hotel", "Huế", CKD, CKD,
      "Giá gốc 12 USD. Địa chỉ: 7A kiệt 64 Nguyễn Công Trứ.", NGUON_HUE, "cho_o"),
    E("Homeland Hotel", "Huế", CKD, CKD,
      "Khách sạn boutique gần sông Hương; phòng sàn gỗ, điện thoại IDD, điều hòa, TV cáp, tủ lạnh, bồn tắm, máy sấy tóc, máy tính riêng. Giá 325.000đ là giá tháng 5/2015, nay chưa kiểm được. Địa chỉ: 35/42 Nguyễn Công Trứ.", NGUON_HUE, "cho_o"),
    E("Carnosa Hotel Huế", "Huế", "255.000–278.000đ/phòng", CKD,
      "Thay thế Tigon Hostel; có wifi, điều hòa, buffet sáng, nhà hàng/bar, spa. Địa chỉ: 11B Nguyễn Công Trứ.", NGUON_HUE, "cho_o"),
    E("Khách sạn Á Châu (Asia Hotel Huế)", "Huế", CKD, CKD,
      "Khách sạn 4 sao, 87 phòng, có nhà hàng Á – Âu, gym, spa, bể bơi trong nhà, bar sân thượng; gần phố đi bộ, nhìn ra cầu Trường Tiền và sông Hương. Giá gốc từ 36 USD; giá VND 1.000.000–2.300.000đ là giá năm 2022, nay chưa kiểm được. Địa chỉ: 17 Phạm Ngũ Lão.", NGUON_HUE, "cho_o"),
    E("Holiday Hotel", "Huế", CKD, CKD,
      "Giá rất tốt; phòng sạch, có điều hòa, tiện nghi đầy đủ, tủ khóa được; bữa sáng thịnh soạn; nhân viên chu đáo, có nước chanh và nước ngô miễn phí mỗi khi khách về. Giá gốc 20–35 USD. Địa chỉ: 6/14 Nguyễn Công Trứ. (Còn gọi là Diamond Hotel.)", NGUON_HUE, "cho_o"),
    E("Jade Hotel", "Huế", CKD, CKD,
      "Cùng chủ với Holiday Hotel, phòng đơn giản hơn; đón ở ga tàu nếu đặt trước. Giá gốc 15–20 USD. Địa chỉ: 17 Nguyễn Thái Học.", NGUON_HUE, "cho_o"),
    E("Khách sạn Hạnh Đạt", "Huế", CKD, CKD,
      "Phòng có điều hòa, wifi, TV LCD 32 inch; có nhà hàng, trung tâm dịch vụ, fax và photocopy. Giá gốc từ 25 USD. Địa chỉ: 15 Phạm Văn Đồng.", NGUON_HUE, "cho_o"),
    E("New Star Hotel", "Huế", CKD, CKD,
      "56 phòng có điều hòa, TV cáp, internet, minibar; có massage, xông hơi, hồ bơi ngoài trời, cửa hàng lưu niệm. Giá gốc từ 45 USD. Địa chỉ: 36 Chu Văn An.", NGUON_HUE, "cho_o"),
    E("Orchid Hotel", "Huế", CKD, CKD,
      "Nhân viên chuyên nghiệp, thân thiện; phòng sạch, rộng, thiết kế đẹp; bữa sáng buffet ngon; đón miễn phí ở ga tàu. Giá gốc 35 USD.", NGUON_HUE, "cho_o"),
    E("Park View Hotel Huế", "Huế", CKD, CKD,
      "Ngay trung tâm thành phố, gần sông Hương; đi bộ 10 phút tới Hoàng thành. Địa chỉ: 9 Ngô Quyền.", NGUON_HUE, "cho_o"),
    # (BỎ 2 mục sau khi kiểm trùng với kho: "La Résidence Huế" = KB đã có
    # "La Residence Hue Hotel & Spa" 5 Lê Lợi; "Khách sạn Sài Gòn Morin" =
    # KB đã có "Khách sạn Sài Gòn Morin Huế" 30 Lê Lợi.)
]

if __name__ == "__main__":
    kb = json.load(open("/home/hatch/workspace/buitrip-ai-local/kho-kien-thuc.json", encoding="utf-8"))
    kb_names = [(e.get("ten") or "", norm(e.get("ten") or "")) for e in kb]
    out = PQ + HUE
    # kiểm trùng: exact + substring 2 chiều trên tên chuẩn hóa
    dup = []
    for e in out:
        n = norm(e["ten"])
        for kname, kn in kb_names:
            if n == kn or (len(n) >= 6 and n in kn) or (len(kn) >= 6 and kn in n):
                dup.append((e["ten"], kname))
    # trùng nội bộ
    seen = {}
    indup = []
    for e in out:
        n = norm(e["ten"])
        if n in seen:
            indup.append((e["ten"], seen[n]))
        seen[n] = e["ten"]
    print("tong muc dich:", len(out), "| PQ:", len(PQ), "| Hue:", len(HUE))
    print("trung voi kho:", dup if dup else "KHONG CO")
    print("trung noi bo:", indup if indup else "KHONG CO")
    from collections import Counter
    print("theo loai:", Counter(e.get("loai") or "diem" for e in out))
    print("gia CKD:", sum(1 for e in out if e["gia"] == CKD), "| gio CKD:", sum(1 for e in out if e["gio"] == CKD))
    print("gia USD-only -> CKD (ghi chu co 'USD'/'EUR'):", sum(1 for e in out if "USD" in e["ghi_chu"] or "EUR" in e["ghi_chu"]))
    json.dump(out, open(BASE + "ung-cu-phu-quoc-hue-vi.json", "w", encoding="utf-8"),
              ensure_ascii=False, indent=1)
    print("da ghi:", BASE + "ung-cu-phu-quoc-hue-vi.json")
