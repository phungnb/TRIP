/* Hồ sơ riêng cho từng khu du lịch nằm trong tỉnh mới và cho các đảo.
   Lý do: sau sáp nhập 01/07/2025, dữ liệu tỉnh (mùa đẹp, cách đi, chi phí) viết theo thủ phủ.
   Quy Nhơn nhận mùa và tuyến bay của Pleiku, Phú Quốc nhận xe SG–Châu Đốc, Phan Thiết nhận áo len của Đà Lạt.
   Luật dùng trong toàn app (trợ lý, trang địa danh, lập kế hoạch):
   1. Nơi hỏi thuộc một khu có hồ sơ → trả theo hồ sơ khu.
   2. Khu chưa có hồ sơ → nói thẳng chưa có, KHÔNG thay bằng dữ liệu thủ phủ; nếu có đưa dữ liệu tỉnh thì ghi rõ
      "đây là dữ liệu <thủ phủ>, không phải <khu>".
   3. Mọi giờ đi, giá vé trong tệp này là ƯỚC TÍNH, CHƯA KIỂM với hãng/cảng; nhãn ghi rõ.
   Nạp sau khu-vuc.js. */
var KHU_HO_SO = {
  "quy-nhon": {
    season: { best: "Tháng 2–8: mùa khô, biển êm, đẹp nhất tháng 3–6", avoid: "Tháng 9–12 mưa nhiều, có bão và áp thấp; biển động, ca nô ra Kỳ Co, Cù Lao Xanh có thể dừng", wear: "Đồ mỏng, thoáng; mũ rộng vành, kính, kem chống nắng; áo khoác mỏng khi đi ca nô" },
    routes: [
      { from: "TP.HCM", mode: "Máy bay SGN–UIH (sân bay Phù Cát, cách trung tâm Quy Nhơn ~30 km)", time: "Bay ~1 giờ + xe vào thành phố ~40 phút", price: "~800.000–1.800.000đ/chiều" },
      { from: "Hà Nội", mode: "Máy bay HAN–UIH (Phù Cát)", time: "Bay ~1 giờ 40 + xe ~40 phút", price: "~1.000.000–2.200.000đ/chiều" },
      { from: "TP.HCM / Hà Nội", mode: "Tàu Thống Nhất, xuống ga Diêu Trì (cách trung tâm ~10 km); vài chuyến vào thẳng ga Quy Nhơn", time: "Từ Sài Gòn ~11–13 giờ; từ Hà Nội ~17–20 giờ", price: "Giường nằm ~500.000–1.500.000đ/chiều" },
      { from: "TP.HCM", mode: "Xe khách giường nằm SG–Quy Nhơn (~650 km)", time: "~11–13 giờ", price: "~350.000–500.000đ/chiều" },
      { from: "Pleiku", mode: "Xe khách Pleiku–Quy Nhơn qua QL19, đèo An Khê (~165 km)", time: "~4 giờ", price: "~150.000–250.000đ/chiều" },
      { from: "Đà Nẵng", mode: "Xe khách hoặc tàu Đà Nẵng–Quy Nhơn (~320 km)", time: "~6 giờ", price: "~200.000–450.000đ/chiều" }],
    local: "Taxi, Grab trong thành phố; thuê xe máy ~120.000–150.000đ/ngày; ra Kỳ Co đi ca nô từ Nhơn Lý.",
    budget: { "2N1Đ": [
      { label: "Máy bay SG–Phù Cát khứ hồi", value: "1.600.000–3.200.000đ" },
      { label: "Ở 1 đêm (chia đôi phòng 3 sao)", value: "250.000–600.000đ" },
      { label: "Ăn 2 ngày", value: "300.000–600.000đ" },
      { label: "Ca nô Kỳ Co + vé điểm (Eo Gió…)", value: "200.000–500.000đ" },
      { label: "Xe máy, taxi", value: "150.000–400.000đ" },
      { label: "Tổng (đi máy bay)", value: "2.500.000–5.300.000đ/người" },
      { label: "Tổng nếu đi xe khách (thay máy bay bằng xe ~700.000–1.000.000đ khứ hồi; mất thêm 2 đêm trên xe)", value: "1.600.000–3.100.000đ/người" }] },
    pack: ["Đồ bơi, khăn nhanh khô", "Kem chống nắng, mũ rộng vành, kính râm", "Dép đi biển; giày bám đá cho Eo Gió, Kỳ Co", "Túi chống nước cho điện thoại khi đi ca nô", "Thuốc say sóng", "Áo khoác mỏng cho ca nô và buổi tối"]
  },
  "phu-quoc": {
    season: { best: "Tháng 11–4: mùa khô, biển bờ tây êm; đẹp nhất tháng 12–3", avoid: "Tháng 5–10 gió tây nam, mưa nhiều, biển bờ tây (Bãi Dài, Dương Đông) động; tắm bờ đông (Bãi Sao, Bãi Khem)", wear: "Đồ đi biển, mỏng, thoáng; kem chống nắng; áo mưa mỏng mùa mưa" },
    access: "Đảo: đi máy bay tới sân bay Phú Quốc (PQC), hoặc xe tới Rạch Giá / Hà Tiên rồi tàu cao tốc. Tàu có thể hủy khi biển động.",
    routes: [
      { from: "TP.HCM", mode: "Máy bay SGN–PQC", time: "Bay ~1 giờ", price: "~700.000–1.600.000đ/chiều" },
      { from: "Hà Nội", mode: "Máy bay HAN–PQC (bay thẳng)", time: "Bay ~2 giờ 10", price: "~1.200.000–2.500.000đ/chiều" },
      { from: "Rạch Giá", mode: "Tàu cao tốc Rạch Giá–Phú Quốc (cảng Bãi Vòng)", time: "~2 giờ 30", price: "~300.000–350.000đ/chiều" },
      { from: "Hà Tiên", mode: "Tàu cao tốc Hà Tiên–Phú Quốc; có phà chở ô tô ~2,5–3 giờ", time: "Tàu cao tốc ~1 giờ 30", price: "~230.000–280.000đ/chiều" },
      { from: "TP.HCM", mode: "Xe khách SG–Rạch Giá (~250 km) hoặc SG–Hà Tiên (~340 km) rồi đi tàu", time: "~5–8 giờ xe + tàu", price: "Xe ~200.000–300.000đ/chiều" }],
    local: "Thuê xe máy ~150.000–250.000đ/ngày; taxi, Grab; đảo dài ~50 km, Bắc đảo và Nam đảo cách nhau ~1 giờ xe.",
    pack: ["Đồ bơi, khăn", "Kem chống nắng, mũ, kính", "Thuốc chống muỗi khi ra Bắc đảo, rừng", "Áo mưa mỏng (tháng 5–10)", "Túi chống nước cho điện thoại khi đi cáp treo, ca nô"]
  },
  "phan-thiet": {
    season: { best: "Tháng 12–4: khô, nắng; gió mạnh hợp lướt ván diều ở Mũi Né", avoid: "Tháng 5–10 mưa rào chiều, ít ảnh hưởng; tháng 8–10 có lúc sóng lớn, triều cường ăn vào bờ Mũi Né", wear: "Đồ mỏng, thoáng, chống nắng. Phan Thiết là thành phố biển nóng, không cần áo len hay áo khoác dày như Đà Lạt" },
    routes: [
      { from: "TP.HCM", mode: "Tàu hỏa ga Sài Gòn–Phan Thiết", time: "~4 giờ", price: "~150.000–300.000đ/chiều" },
      { from: "TP.HCM", mode: "Xe khách, limousine qua cao tốc", time: "~3,5–4 giờ", price: "~150.000–350.000đ/chiều" },
      { from: "Hà Nội", mode: "Bay HAN–SGN rồi tàu hoặc xe, hoặc bay HAN–Cam Ranh rồi xe ~3,5 giờ", time: "~6–7 giờ cả chặng", price: "Bay ~1.200.000–2.500.000đ/chiều + xe" },
      { from: "Đà Lạt", mode: "Xe khách Đà Lạt–Phan Thiết (~160 km)", time: "~4 giờ", price: "~150.000–250.000đ/chiều" }],
    local: "Xe buýt, taxi giữa Phan Thiết và Mũi Né (~20 km); thuê xe máy ~120.000–150.000đ/ngày; xe jeep đồi cát theo tour.",
    pack: ["Đồ bơi", "Kem chống nắng, mũ, kính, khăn che mặt đi đồi cát", "Dép, sandal", "Túi kín cho máy ảnh khi lên đồi cát có gió"]
  },
  "ha-giang": {
    season: { best: "Tháng 9–12: lúa chín Hoàng Su Phì (tháng 9–10), hoa tam giác mạch (tháng 10–12); tháng 1–3 hoa mận, hoa đào", avoid: "Tháng 6–8 mưa lớn, sạt lở đường đèo; tháng 12–1 rét, có lúc dưới 5°C, sương mù đèo Mã Pì Lèng", wear: "Áo ấm, áo gió; tháng 11–2 áo khoác dày, găng tay, khăn khi đi xe máy; giày bám; áo mưa" },
    routes: [
      { from: "Hà Nội", mode: "Xe khách giường nằm Hà Nội–Hà Giang (~300 km)", time: "~6–7 giờ, thường chạy đêm", price: "~250.000–450.000đ/chiều" },
      { from: "TP.HCM", mode: "Bay SGN–HAN rồi xe khách lên Hà Giang", time: "Bay ~2 giờ 10 + xe ~6–7 giờ", price: "Bay ~1.000.000–2.500.000đ/chiều + xe" },
      { from: "Tuyên Quang", mode: "Xe khách TP Tuyên Quang–Hà Giang (~165 km)", time: "~3,5–4 giờ", price: "~120.000–200.000đ/chiều" }],
    local: "Thuê xe máy ở TP Hà Giang ~200.000–300.000đ/ngày, hoặc thuê xe kèm người lái (easy rider); vòng Quản Bạ–Đồng Văn–Mèo Vạc thường 3–4 ngày.",
    pack: ["Áo khoác ấm, găng tay (tháng 11–2)", "Áo mưa bộ", "Giày bám, ủng nhẹ mùa mưa", "Giấy phép lái xe máy hạng A1/A", "Thuốc say xe, đèn pin, sạc dự phòng"]
  },
  "kon-tum": {
    season: { best: "Tháng 11–4 mùa khô; Măng Đen mát quanh năm (~18–23°C, cao ~1.000–1.200 m), mai anh đào nở khoảng tháng 1–2", avoid: "Tháng 5–10 mưa nhiều, đèo Măng Rì, Violak trơn", wear: "Áo khoác mỏng ban ngày, áo ấm buổi tối ở Măng Đen; áo mưa mùa mưa" },
    routes: [
      { from: "TP.HCM / Hà Nội", mode: "Bay tới Pleiku (PXU), xe Pleiku–Kon Tum (~50 km), xe Kon Tum–Măng Đen (~55 km)", time: "Bay ~1–1,5 giờ + xe ~2,5 giờ", price: "Bay ~900.000–2.000.000đ/chiều + xe ~150.000–300.000đ" },
      { from: "TP.HCM", mode: "Xe khách giường nằm SG–Kon Tum", time: "~11–13 giờ", price: "~350.000–500.000đ/chiều" },
      { from: "Quảng Ngãi", mode: "Xe Quảng Ngãi–Măng Đen qua đèo Violak (~120 km)", time: "~3 giờ", price: "~150.000–250.000đ/chiều" },
      { from: "Đà Nẵng", mode: "Xe khách Đà Nẵng–Kon Tum", time: "~6–7 giờ", price: "~250.000–350.000đ/chiều" }],
    local: "Măng Đen không có sân bay, không có ga tàu. Thuê xe máy ở Măng Đen hoặc Kon Tum ~150.000–200.000đ/ngày.",
    pack: ["Áo ấm buổi tối", "Áo mưa", "Giày đi rừng thông, thác", "Thuốc chống côn trùng"]
  },
  "con-dao": {
    season: { best: "Tháng 3–6: biển êm, nước trong; rùa lên đẻ trứng tháng 5–10 (Hòn Bảy Cạnh, phải đăng ký với Vườn quốc gia)", avoid: "Tháng 7–10 gió tây nam, tháng 11–2 gió đông bắc: biển động, tàu hay hủy chuyến", wear: "Đồ đi biển; quần áo kín đáo khi viếng nghĩa trang Hàng Dương, nhà tù" },
    access: "Đảo: máy bay tới sân bay Côn Đảo (Cỏ Ống, cách thị trấn ~15 km) hoặc tàu cao tốc từ cảng Trần Đề / Vũng Tàu tới cảng Bến Đầm.",
    routes: [
      { from: "TP.HCM", mode: "Máy bay SGN–VCS (Côn Đảo)", time: "Bay ~55 phút", price: "~1.200.000–2.500.000đ/chiều; ít chuyến, mùa cao điểm hay hết vé" },
      { from: "Hà Nội", mode: "Máy bay HAN–VCS (bay thẳng)", time: "Bay ~2 giờ 15", price: "~2.000.000–3.500.000đ/chiều" },
      { from: "Cần Thơ / Sóc Trăng", mode: "Tàu cao tốc cảng Trần Đề–Côn Đảo", time: "~2,5–3 giờ", price: "~300.000–450.000đ/chiều" },
      { from: "Vũng Tàu", mode: "Tàu cao tốc Vũng Tàu–Côn Đảo (chạy theo mùa) hoặc tàu khách chạy đêm", time: "Cao tốc ~4–5 giờ; tàu đêm ~12 giờ", price: "Chưa có giá" }],
    local: "Thuê xe máy ~150.000–200.000đ/ngày; taxi sân bay vào thị trấn ~15 km.",
    pack: ["Đồ bơi, kính lặn", "Kem chống nắng", "Quần áo kín đáo, hương hoa khi viếng Hàng Dương", "Thuốc say sóng nếu đi tàu"]
  },
  "cat-ba": {
    season: { best: "Tháng 4–9 biển ấm, tắm được; tháng 9–11 ít khách, trời đẹp", avoid: "Tháng 7–9 có bão, tàu dừng; tháng 12–2 lạnh, không tắm biển", wear: "Mùa hè đồ đi biển; mùa đông áo ấm" },
    access: "Đảo: từ Hải Phòng đi tàu cao tốc bến Bính–Cát Bà, hoặc xe ra đảo Cát Hải rồi cáp treo Cát Hải–Phù Long hay phà Gót–Cái Viềng; từ Hạ Long đi phà Tuần Châu–Gia Luận.",
    routes: [
      { from: "Hà Nội", mode: "Xe combo Hà Nội–Cát Bà (xe + phà hoặc cáp treo)", time: "~3–4 giờ", price: "~250.000–350.000đ/chiều" },
      { from: "Hải Phòng", mode: "Tàu cao tốc bến Bính–Cát Bà", time: "~1 giờ", price: "~150.000–250.000đ/chiều" },
      { from: "Hải Phòng", mode: "Xe qua cầu Tân Vũ–Lạch Huyện ra Cát Hải, cáp treo Cát Hải–Phù Long hoặc phà Gót–Cái Viềng", time: "~1,5–2 giờ", price: "Cáp treo ~100.000–150.000đ/lượt; phà ~50.000đ/người" },
      { from: "Hạ Long", mode: "Phà Tuần Châu–Gia Luận", time: "~1 giờ", price: "~70.000–100.000đ/người" },
      { from: "TP.HCM", mode: "Bay SGN–HPH (Cát Bi) rồi xe + tàu ra đảo", time: "Bay ~2 giờ + ~2 giờ", price: "Bay ~1.000.000–2.200.000đ/chiều" }],
    local: "Thuê xe máy trên đảo ~150.000đ/ngày; tàu đi vịnh Lan Hạ từ bến Bèo.",
    pack: ["Đồ bơi", "Áo phao nếu chèo kayak (thường có sẵn)", "Thuốc say sóng", "Áo ấm (tháng 11–3)"]
  },
  "vung-tau": {
    season: { best: "Tháng 11–4: khô, biển êm hơn", avoid: "Tháng 6–10 mưa rào chiều; cuối tuần, lễ rất đông", wear: "Đồ đi biển, chống nắng" },
    routes: [
      { from: "TP.HCM", mode: "Xe khách, limousine SG–Vũng Tàu (~100 km)", time: "~2–2,5 giờ", price: "~150.000–250.000đ/chiều" },
      { from: "TP.HCM", mode: "Tàu cao tốc SG–Vũng Tàu", time: "~2 giờ", price: "~300.000–350.000đ/chiều" },
      { from: "Hà Nội", mode: "Bay HAN–SGN rồi xe hoặc tàu cao tốc", time: "Bay ~2 giờ 10 + ~2 giờ", price: "Bay ~1.000.000–2.500.000đ/chiều" }],
    local: "Taxi, Grab, thuê xe máy ~120.000–150.000đ/ngày.",
    pack: ["Đồ bơi", "Kem chống nắng"]
  },
  "hoi-an": {
    season: { best: "Tháng 2–8: khô, nắng; đẹp nhất tháng 2–4", avoid: "Tháng 9–12 mưa bão, phố cổ có thể ngập (thường tháng 10–11)", wear: "Đồ mỏng; váy, quần quá gối khi vào chùa, hội quán" },
    routes: [
      { from: "TP.HCM / Hà Nội", mode: "Bay tới Đà Nẵng (DAD), taxi hoặc xe buýt về Hội An (~30 km)", time: "Bay ~1 giờ 20 + xe ~45 phút", price: "Bay ~800.000–2.000.000đ/chiều; taxi ~350.000–450.000đ" },
      { from: "Tàu hỏa", mode: "Tàu Thống Nhất tới ga Đà Nẵng hoặc ga Tam Kỳ rồi xe", time: "Xe thêm ~45 phút–1 giờ", price: "Chưa có giá" }],
    local: "Phố cổ đi bộ, xe đạp; taxi ra biển An Bàng ~10 phút.",
    pack: ["Ô hoặc áo mưa (tháng 9–12)", "Giày đi bộ"]
  },
  "phong-nha": {
    season: { best: "Tháng 3–8: khô, hang mở, sông Son êm; tour Sơn Đoòng chạy khoảng tháng 1–8", avoid: "Tháng 9–12 mưa lũ, nhiều hang và tour đóng", wear: "Đồ thể thao nhanh khô, giày bám; áo ấm mỏng trong hang" },
    routes: [
      { from: "TP.HCM / Hà Nội", mode: "Bay tới Đồng Hới (VDH), xe lên Phong Nha (~45 km)", time: "Bay ~1,5 giờ + xe ~1 giờ", price: "Bay ~800.000–1.800.000đ/chiều" },
      { from: "Tàu hỏa", mode: "Tàu Thống Nhất tới ga Đồng Hới rồi xe", time: "Từ Hà Nội ~10–12 giờ", price: "Chưa có giá" },
      { from: "Huế", mode: "Xe khách Huế–Phong Nha", time: "~4 giờ", price: "~200.000–300.000đ/chiều" }],
    local: "Thuê xe máy ở Phong Nha ~150.000đ/ngày; thuyền sông Son vào động Phong Nha.",
    pack: ["Giày bám, dép quai hậu lội nước", "Đèn pin", "Áo mưa"]
  },
  "tuy-hoa": {
    season: { best: "Tháng 2–8: khô, biển đẹp (khác Buôn Ma Thuột, nơi mùa khô là tháng 11–4)", avoid: "Tháng 9–12 mưa bão, lũ", wear: "Đồ đi biển, chống nắng" },
    routes: [
      { from: "TP.HCM / Hà Nội", mode: "Bay tới Tuy Hòa (TBB)", time: "Bay ~1–1,5 giờ", price: "~800.000–1.800.000đ/chiều" },
      { from: "Tàu hỏa", mode: "Tàu Thống Nhất tới ga Tuy Hòa", time: "Từ Sài Gòn ~9–11 giờ", price: "Chưa có giá" },
      { from: "Buôn Ma Thuột", mode: "Xe khách Buôn Ma Thuột–Tuy Hòa (~170 km)", time: "~4 giờ", price: "~150.000–250.000đ/chiều" }],
    local: "Thuê xe máy ~120.000–150.000đ/ngày.",
    pack: ["Đồ bơi", "Kem chống nắng"]
  },
  "phan-rang": {
    season: { best: "Gần như khô quanh năm; đẹp nhất tháng 1–8", avoid: "Tháng 9–11 mưa nhiều nhất trong năm", wear: "Rất nắng, gió: mũ, kính, khăn che, kem chống nắng" },
    routes: [
      { from: "TP.HCM / Hà Nội", mode: "Bay tới Cam Ranh (CXR), xe về Phan Rang (~60 km)", time: "Bay ~1 giờ (SG) / ~1 giờ 50 (HN) + xe ~1 giờ", price: "Bay ~700.000–2.000.000đ/chiều" },
      { from: "Tàu hỏa", mode: "Tàu Thống Nhất tới ga Tháp Chàm", time: "Từ Sài Gòn ~6–7 giờ", price: "Chưa có giá" },
      { from: "Nha Trang", mode: "Xe khách Nha Trang–Phan Rang (~100 km)", time: "~2 giờ", price: "~100.000–150.000đ/chiều" }],
    local: "Thuê xe máy ~120.000–150.000đ/ngày; Vĩnh Hy cách Phan Rang ~40 km.",
    pack: ["Mũ, kính, khăn che nắng gió", "Đồ bơi, kính lặn ở Vĩnh Hy"]
  },
  "gia-nghia": {
    season: { best: "Tháng 11–4 mùa khô, đường dễ đi; thác nhiều nước nhất tháng 6–10 nhưng đường trơn", avoid: "Tháng 7–9 mưa nhiều", wear: "Không lạnh như Đà Lạt; áo khoác mỏng buổi tối, áo mưa" },
    routes: [
      { from: "TP.HCM", mode: "Xe khách SG–Gia Nghĩa (~230 km)", time: "~5–6 giờ", price: "~200.000–350.000đ/chiều" },
      { from: "Hà Nội", mode: "Bay tới Buôn Ma Thuột (BMV), xe về Gia Nghĩa (~120 km)", time: "Bay ~1 giờ 40 + xe ~3 giờ", price: "Bay ~1.000.000–2.200.000đ/chiều" }],
    local: "Thuê xe máy ~150.000đ/ngày.",
    pack: ["Giày bám đi thác", "Áo mưa"]
  }
};

/* Đảo có tuyến riêng. key: tên đã bỏ dấu, khớp trọn cụm trong câu hỏi hoặc tên địa danh. ban: không đón khách, không đưa vào lịch. */
var DAO_TIEP_CAN = [
  { id: "co-to", name: "Cô Tô", keys: ["co to"], prov: "quang-ninh",
    access: [{ from: "Vân Đồn", mode: "Tàu cao tốc cảng Cái Rồng (Vân Đồn)–Cô Tô", time: "~1 giờ 30–2 giờ", price: "~250.000–300.000đ/chiều" },
      { from: "Hà Nội", mode: "Xe Hà Nội–Vân Đồn rồi tàu", time: "Xe ~3,5 giờ + tàu", price: "Xe ~200.000–300.000đ/chiều" }],
    season: "Tháng 4–9: biển êm, ấm. Tháng 10–3 lạnh, gió mùa, tàu hay hủy; tháng 7–9 có bão, tàu dừng theo lệnh biên phòng." },
  { id: "phu-quy", name: "Phú Quý", keys: ["phu quy"], prov: "lam-dong",
    access: [{ from: "Phan Thiết", mode: "Tàu cao tốc cảng Phan Thiết–Phú Quý", time: "~2,5–3 giờ", price: "~350.000–400.000đ/chiều" },
      { from: "Phan Thiết", mode: "Tàu gỗ, tàu chậm", time: "~4–5 giờ", price: "Chưa có giá" }],
    season: "Tháng 3–8 biển êm. Tháng 10–2 gió bấc, tàu thường hủy." },
  { id: "ly-son", name: "Lý Sơn", keys: ["ly son"], prov: "quang-ngai",
    access: [{ from: "Quảng Ngãi", mode: "Tàu cao tốc cảng Sa Kỳ–Lý Sơn", time: "~30–60 phút tùy tàu", price: "~150.000–200.000đ/chiều" }],
    season: "Tháng 3–8 biển êm. Tháng 9–1 mưa bão, gió mùa đông bắc, tàu hay dừng." },
  { id: "nam-du", name: "Nam Du", keys: ["nam du"], prov: "an-giang",
    access: [{ from: "Rạch Giá", mode: "Tàu cao tốc Rạch Giá–Nam Du (Củ Tron)", time: "~2,5–3 giờ", price: "~250.000–300.000đ/chiều" },
      { from: "TP.HCM", mode: "Xe khách SG–Rạch Giá rồi tàu", time: "Xe ~5–6 giờ + tàu", price: "Xe ~200.000–300.000đ/chiều" }],
    season: "Tháng 11–4 biển êm. Tháng 5–10 gió tây nam, tàu hay hủy." },
  { id: "hon-son", name: "Hòn Sơn", keys: ["hon son", "lai son"], prov: "an-giang",
    access: [{ from: "Rạch Giá", mode: "Tàu cao tốc Rạch Giá–Hòn Sơn", time: "~1,5–2 giờ", price: "~200.000–250.000đ/chiều" }],
    season: "Tháng 11–4 biển êm. Tháng 5–10 gió tây nam, tàu hay hủy." },
  { id: "cu-lao-cham", name: "Cù Lao Chàm", keys: ["cu lao cham"], prov: "da-nang",
    access: [{ from: "Hội An", mode: "Ca nô cảng Cửa Đại–Cù Lao Chàm", time: "~20–30 phút", price: "Thường đi tour ngày ~500.000–700.000đ gồm ca nô, ăn trưa" }],
    season: "Tháng 3–8. Tháng 9–2 thường cấm tàu du lịch ra đảo do biển động." },
  { id: "binh-ba", name: "Bình Ba – Bình Hưng", keys: ["binh ba", "binh hung"], prov: "khanh-hoa", ban: true,
    banNote: "Theo phản ánh ngày 23/11/2026, đảo Bình Ba và Bình Hưng (Cam Ranh) không đón khách du lịch từ 06/2026. App CHƯA kiểm được văn bản của địa phương. App không gợi ý tour, không đưa vào lịch trình. Muốn đi, hỏi chính quyền địa phương hoặc đồn biên phòng trước." }
];

(function () {
  function fold(s) { return " " + String(s || "").toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "").replace(/đ/g, "d").replace(/[^a-z0-9]+/g, " ").trim() + " "; }
  window.btAreaProfile = function (a) { return a ? KHU_HO_SO[a.id] || null : null; };
  /* Khu của 1 địa danh, khi địa danh không thuộc khu thủ phủ */
  window.btAreaOfPlace = function (prov, x) {
    if (!prov || !x || !x.dist_from || typeof btAreaByHub !== "function") return null;
    /* KHU_VUC chỉ gồm trung tâm phụ (TRUNG_TAM không chứa thủ phủ), nên có khu là điểm nằm ngoài khu thủ phủ */
    return btAreaByHub(prov.id, x.dist_from);
  };
  /* Đảo theo câu hỏi hoặc theo tên địa danh. "cô tô" khớp trọn cụm, không khớp "cô tố…" vì so trên từ */
  window.btIsleFor = function (q) {
    var f = fold(q), hit = null;
    DAO_TIEP_CAN.forEach(function (d) { d.keys.forEach(function (k) { if (!hit && f.indexOf(" " + k + " ") >= 0) hit = d; }); });
    return hit;
  };
  window.btBanned = function (x) { var d = x && btIsleFor(x.name.split(" (")[0]); return d && d.ban ? d : null; };
  window.btRouteLabel = function (r) { return r.from + " · " + r.mode + " · " + r.time + " · " + r.price + " (ước tính, chưa kiểm)"; };
})();

/* Trang tỉnh: mỗi khu có hồ sơ hiện riêng mùa đẹp và cách đi, để không ai đọc mùa/tuyến của thủ phủ thành của khu.
   mode "tongquan": mùa + 2 tuyến đầu; mode "diden": đủ tuyến + cách ra đảo. */
function provAreasHtml(p, mode) {
  if (typeof KHU_VUC === "undefined") return "";
  var e = typeof esc === "function" ? esc : function (s) { return String(s == null ? "" : s); };
  var list = KHU_VUC.filter(function (a) { return a.prov === p.id && KHU_HO_SO[a.id]; });
  var isles = DAO_TIEP_CAN.filter(function (d) { return d.prov === p.id; });
  if (!list.length && !isles.length) return "";
  var h = '<h3 style="font-size:var(--fs-body);margin:20px 0 8px">' + (mode === "diden" ? "Đi tới từng khu và đảo trong tỉnh" : "Mùa đẹp và cách đi theo từng khu") + '</h3>' +
    '<p class="small" style="margin:0 0 8px">Mùa đẹp, tuyến đi ở phần trên viết cho khu ' + e(p.anchor || p.name) + '. Các khu dưới đây có dữ liệu riêng; giờ đi và giá vé là ước tính, chưa kiểm.</p><div class="listcol">';
  list.forEach(function (a) {
    var pr = KHU_HO_SO[a.id], rs = mode === "diden" ? pr.routes : pr.routes.slice(0, 2);
    h += '<div class="menurow" style="cursor:default;display:block"><b>' + e(a.name) + (a.old && a.old !== p.name ? " (" + e(a.old) + " cũ)" : "") + '</b>' +
      (pr.season ? '<p class="small" style="margin:4px 0 0"><b>Mùa đẹp:</b> ' + e(pr.season.best) + (pr.season.avoid ? '. <b>Tránh:</b> ' + e(pr.season.avoid) : "") + '</p>' : "") +
      (pr.access ? '<p class="small" style="margin:4px 0 0">' + e(pr.access) + '</p>' : "") +
      '<ul class="small" style="margin:4px 0 0;padding-left:18px">' + rs.map(function (r) { return "<li>" + e(btRouteLabel(r)) + "</li>"; }).join("") + '</ul>' +
      '<button class="btn btn-ghost" style="margin-top:6px" onclick="btPlanArea(\'' + a.id + '\')">Lập kế hoạch đi ' + e(a.name) + '</button></div>';
  });
  isles.forEach(function (d) {
    h += '<div class="menurow" style="cursor:default;display:block"><b>Đảo ' + e(d.name) + '</b>' +
      (d.ban ? '<p class="small" style="margin:4px 0 0;color:var(--danger,#b42318)"><b>Không đón khách du lịch.</b> ' + e(d.banNote) + '</p>' :
        '<p class="small" style="margin:4px 0 0"><b>Mùa:</b> ' + e(d.season) + '</p><ul class="small" style="margin:4px 0 0;padding-left:18px">' + d.access.map(function (r) { return "<li>" + e(btRouteLabel(r)) + "</li>"; }).join("") + '</ul>') + '</div>';
  });
  return h + '</div>';
}
