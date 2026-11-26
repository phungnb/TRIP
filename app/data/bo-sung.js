/* Bổ sung điểm đến hot còn mỏng dữ liệu: Phú Quốc, Côn Đảo, Hà Giang (Đồng Văn), Mũi Né – Phan Thiết,
   Quy Nhơn, Hội An, Phong Nha. Tổng hợp từ bài cẩm nang công khai đọc ngày 20/11/2026
   (vnexpress, mia.vn, momo.vn, vietnamtourism.com, vinpearl/vinwonders, sunparadiseland, vietnambooking,
   junglebosstours, klook). Giá ghi theo khoảng khi các trang lệch nhau; bài cũ (2021–2023) ghi "giá cũ".
   Tọa độ là vị trí gần đúng (approx) nếu chưa đối chiếu bản đồ.
   - patch: sửa/điền thông tin cho địa danh đã có (theo id)
   - places/stays/dishes: thêm mới */
var BO_SUNG_CHECKED = "20/11/2026";
var BO_SUNG = {
  "an-giang": {
    patch: {
      "rh-kien-giang-bai-sao-phu-quoc": { price: "Miễn phí vào bãi (ghế, tắm nước ngọt tính riêng)", hours: "Cả ngày; tắm đẹp nhất buổi sáng", duration: "2–3 giờ", suitable: "Tắm biển, chụp ảnh, gia đình", note: "Bãi cát trắng nước trong ở phía đông nam đảo, gần An Thới. Đi buổi sáng khi nước lặng; mang kem chống nắng và mũ." },
      "rh-kien-giang-bai-dai-phu-quoc": { price: "Miễn phí", hours: "Cả ngày; đẹp nhất lúc hoàng hôn", duration: "1–2 giờ", note: "Bãi dài hoang sơ ở bắc đảo. Mùa mưa (tháng 5–10) nước có thể đục, sóng lớn; xem thời tiết trước khi xuống tắm." },
      "rh-kien-giang-cho-dem-phu-quoc": { name: "Chợ đêm Phú Quốc (Dinh Cậu – Dương Đông)", price: "Miễn phí vào chợ; món ăn tính theo quầy", hours: "Khoảng 17:00–24:00", duration: "1–2 giờ", note: "Hợp để dạo và ăn vặt. Hải sản ở chợ đắt hơn quán dọc đường Trần Hưng Đạo; hỏi giá theo kg và cân trước khi chế biến." },
      "rh-kien-giang-hon-thom": { name: "Cáp treo Hòn Thơm (Sun World Hòn Thơm)", address: "Ga Ánh Dương, An Thới, Nam đảo Phú Quốc", price: "Người lớn (từ 1,4 m) 850.000–880.000đ; trẻ 1–1,4 m 700.000đ; dưới 1 m miễn phí; combo kèm buffet trưa ~1.150.000đ/900.000đ", hours: "Đón khách từ 9:30; chuyến cuối về đất liền ~17:30; giữa trưa có khung nghỉ", duration: "Nửa ngày đến cả ngày (cáp treo ~15 phút/chiều + công viên nước Aquatopia 10:00–16:45)", suitable: "Gia đình có trẻ nhỏ, nhóm bạn", note: "Đặt vé online trước để khỏi xếp hàng mùa cao điểm. Xem lịch chạy trước khi đi vì cáp treo nghỉ giữa trưa và tạm dừng khi gió lớn." },
      "rh-kien-giang-nha-tu-phu-quoc": { price: "Miễn phí vào tham quan", hours: "Khoảng 7:30–11:00 và 13:30–17:00", duration: "1–1,5 giờ", note: "Di tích nhà tù Cây Dừa ở An Thới, gần cáp treo Hòn Thơm và Bãi Sao nên ghép chung một ngày ở Nam đảo. Giữ trang phục kín đáo." }
    },
    places: [
      { id: "bs-vinwonders-phu-quoc", name: "VinWonders Phú Quốc", address: "Gành Dầu, Bắc đảo Phú Quốc", cluster: "phu-quoc", lat: 10.3365, lng: 103.8905, approx: true, price: "Người lớn ~880.000đ; combo VinWonders + Safari ~1.350.000đ", hours: "Cả ngày (kiểm giờ trên kênh chính thức trước khi đi)", duration: "Cả ngày", suitable: "Gia đình có trẻ nhỏ, nhóm thích trò cảm giác mạnh", note: "Cách Dương Đông ~25 km, có xe buýt miễn phí từ trung tâm. Đi cả VinWonders và Safari thì so giá combo với vé lẻ." },
      { id: "bs-vinpearl-safari", name: "Vinpearl Safari Phú Quốc", address: "Gành Dầu, Bắc đảo Phú Quốc", cluster: "phu-quoc", lat: 10.3418, lng: 103.8926, approx: true, price: "~700.000đ/người", hours: "Ban ngày", duration: "3–4 giờ", suitable: "Gia đình có trẻ em", note: "Đi sáng sớm khi thú còn hoạt động; ngồi xe buýt qua khu thú thả tự do. Không đi cùng trẻ em thì cân nhắc." },
      { id: "bs-grand-world", name: "Grand World Phú Quốc", address: "Gành Dầu, Bắc đảo Phú Quốc", cluster: "phu-quoc", lat: 10.3314, lng: 103.8586, approx: true, price: "Miễn phí vào cổng và xem show nhạc nước buổi tối; thuyền sông Venice ~150.000đ, bảo tàng Gấu Teddy ~200.000đ (giá cũ)", hours: "Chiều tối là đẹp nhất; show nhạc nước buổi tối (kiểm giờ show trước)", duration: "2–3 giờ", suitable: "Cặp đôi, gia đình thích chụp ảnh và xem show", note: "Đi sau khi chơi VinWonders cho tiện đường. Show miễn phí nên đến sớm giữ chỗ đứng." },
      { id: "bs-lang-chai-ham-ninh", name: "Làng chài Hàm Ninh", address: "Xã Hàm Ninh, phía đông đảo Phú Quốc", cluster: "phu-quoc", lat: 10.1809, lng: 104.0496, approx: true, price: "Miễn phí; hải sản tính theo kg", hours: "Buổi sáng và trưa", duration: "1–2 giờ", suitable: "Ăn ghẹ, hải sản tươi, xem làng chài", note: "Cầu cảng chụp ảnh cũ đã bị dỡ từ 2020, đừng đi chỉ để chụp cầu. Hỏi giá ghẹ trước khi chế biến." },
      { id: "bs-thi-tran-hoang-hon", name: "Thị trấn Hoàng Hôn và chợ đêm Vui Phết", address: "Mũi Đèn, An Thới, Nam đảo Phú Quốc", cluster: "phu-quoc", lat: 9.9993, lng: 104.0103, approx: true, price: "Miễn phí vào khu; ăn uống tính riêng", hours: "Chiều tối", duration: "2–3 giờ", suitable: "Ngắm hoàng hôn, ăn tối, dạo phố ven biển", note: "Đến trước giờ mặt trời lặn 45 phút để ngắm hoàng hôn rồi ăn ở chợ đêm Vui Phết ngay đó." }
    ],
    stays: [
      { id: "bs-9-station-hostel", name: "9 Station Hostel", address: "91/3 Trần Hưng Đạo, Khu phố 7, Dương Đông, Phú Quốc", area: "phu-quoc", kind: "Hostel / homestay (có phòng dorm)", price: "Từ ~270.000đ/đêm (giá cũ, có thể đã tăng)", suitable: "Đi một mình, ngân sách thấp" },
      { id: "bs-the-fish-homestay", name: "The Fish Homestay", address: "113/13 Trần Hưng Đạo, Dương Tơ, Phú Quốc", area: "phu-quoc", kind: "Homestay", price: "Từ ~300.000đ/đêm (giá cũ)", suitable: "Khách tự túc tiết kiệm" },
      { id: "bs-chill-house", name: "Chill House by the Beach", address: "Đường Trần Phú, Dương Đông, Phú Quốc", area: "phu-quoc", kind: "Homestay", price: "Từ ~400.000đ/đêm (giá cũ)", suitable: "Ở gần chợ đêm Dương Đông" },
      { id: "bs-the-may-beach", name: "The May Beach Hotel", address: "Đường Trần Hưng Đạo, ấp Cửa Lấp, Dương Tơ, Phú Quốc", area: "phu-quoc", kind: "Khách sạn ven Bãi Trường", price: "Từ ~1.150.000đ/đêm (giá cũ)", suitable: "Gia đình, cặp đôi muốn khách sạn tiện nghi" },
      { id: "bs-mango-bay", name: "Mango Bay Resort", address: "Bãi Ông Lang, Cửa Dương, Phú Quốc", area: "phu-quoc", kind: "Resort sinh thái", price: "Từ ~1.550.000đ/đêm (giá cũ)", suitable: "Cặp đôi cần yên tĩnh, riêng tư" }
    ],
    dishes: [
      { id: "bs-bun-quay", name: "Bún quậy Phú Quốc", meal: "Ăn sáng / trưa", price: "40.000–70.000đ/tô", desc: "Bún tươi làm tại chỗ, chả tôm chả cá, khách tự 'quậy' nước chấm muối đường tắc ớt.", restaurants: [{ name: "Bún quậy Kiến Xây", address: "Đường Bạch Đằng, Dương Đông, Phú Quốc (gần chợ đêm)", price: "40.000–70.000đ/tô" }] },
      { id: "bs-goi-ca-trich", name: "Gỏi cá trích", meal: "Ăn trưa / tối", price: "Theo đĩa, hỏi giá trước", desc: "Cá trích phi lê trộn dừa nạo, hành tây, chanh; cuốn bánh tráng rau sống chấm mắm tỏi ớt.", restaurants: [{ name: "Các quán hải sản đường Trần Hưng Đạo", address: "Đường Trần Hưng Đạo, Dương Đông, Phú Quốc", price: "Hỏi giá theo đĩa" }] },
      { id: "bs-ghe-ham-ninh", name: "Ghẹ Hàm Ninh", meal: "Ăn trưa", price: "Theo kg, theo mùa", desc: "Ghẹ luộc vừa vớt, chấm muối tiêu chanh.", restaurants: [{ name: "Nhà bè, quán ở làng chài Hàm Ninh", address: "Xã Hàm Ninh, Phú Quốc", price: "Hỏi giá theo kg trước khi chế biến" }] },
      { id: "bs-bun-ken", name: "Bún kèn", meal: "Ăn sáng", price: "30.000–50.000đ/tô", desc: "Bún nước cốt dừa với cá xay, rau sống; món sáng bình dân của đảo.", restaurants: [{ name: "Bún kèn Út Lượm", address: "Dương Đông, Phú Quốc", price: "30.000–50.000đ" }] }
    ]
  },

  "tp-ho-chi-minh": {
    patch: {
      "rh-ba-ria-vung-tau-bach-dinh": { price: "Người lớn khoảng 15.000đ (giá năm 2025, nên hỏi lại tại cổng)", hours: "7:00–11:30 và 13:30–17:00", source: "vinwonders.com wonderpedia, bài 03/08/2025, đọc 21/11/2026" },
      "rh-ba-ria-vung-tau-suoi-nuoc-nong-binh-chau": { price: "Ngày thường (T2–T5) người lớn 165.000đ, trẻ em 125.000đ; cuối tuần 200.000đ / 150.000đ; ngày lễ 240.000đ / 185.000đ", hours: "9:00–18:00", source: "mia.vn, bài đăng 01/01/2026, đọc 21/11/2026" },
      "rh-ba-ria-vung-tau-di-tich-nha-tu-con-dao": { name: "Hệ thống nhà tù Côn Đảo (Phú Hải, Phú Sơn, Chuồng Cọp)", address: "Trung tâm đặc khu Côn Đảo (Bà Rịa – Vũng Tàu cũ)", price: "Người lớn 40.000–50.000đ (vé gộp cả cụm); học sinh, sinh viên, trên 60 tuổi 25.000đ; trẻ dưới 1,2 m miễn phí", hours: "7:30–11:30 và 13:30–17:00", duration: "3–4 giờ", suitable: "Người tìm hiểu lịch sử; nên thuê thuyết minh", note: "Giữ cuống vé để soát ở từng cổng. Không tự thắp hương trong buồng giam, dâng ở bàn thờ chung ngoài sân." },
      "rh-ba-ria-vung-tau-nghia-trang-hang-duong-con-dao": { name: "Nghĩa trang Hàng Dương (mộ Võ Thị Sáu)", address: "Trung tâm Côn Đảo", price: "Miễn phí", hours: "Cả ngày; nhiều người viếng mộ chị Võ Thị Sáu lúc nửa đêm", duration: "1 giờ", suitable: "Viếng, tưởng niệm", note: "Ăn mặc kín đáo, giữ trật tự. Lễ vật bán ngay cổng." },
      "rh-ba-ria-vung-tau-bai-dam-trau-con-dao": { name: "Bãi Đầm Trầu", address: "Gần sân bay Cỏ Ống, cách trung tâm ~15 km", price: "Miễn phí", hours: "Cả ngày", duration: "2–3 giờ", suitable: "Tắm biển sóng êm, chụp máy bay hạ cánh", note: "Sóng nhẹ, nước trong. Xa trung tâm nên thuê xe máy hoặc nhờ xe khách sạn; mang nước uống." }
    },
    places: [
      { id: "bs-cau-tau-914", name: "Cầu tàu 914", address: "Trước Dinh Chúa Đảo, trung tâm Côn Đảo", cluster: "con-dao", lat: 8.6826, lng: 106.6058, approx: true, price: "Miễn phí", hours: "Cả ngày; đẹp nhất bình minh", duration: "30 phút", suitable: "Tưởng niệm, ngắm bình minh", note: "Đi sớm để ngắm mặt trời mọc và mua hải sản từ tàu cá cập bến." },
      { id: "bs-vqg-con-dao", name: "Vườn quốc gia Côn Đảo (trekking Ông Đụng)", address: "Phía tây đảo Côn Sơn", cluster: "con-dao", lat: 8.6930, lng: 106.5820, approx: true, price: "Người lớn 60.000đ; sinh viên 20.000đ; trẻ em 10.000đ (chưa gồm tour)", hours: "7:00–17:00", duration: "Trekking ~1 giờ một chiều", suitable: "Người thích đi rừng, lặn ngắm san hô", note: "Mang giày và kem chống côn trùng. Muốn xem rùa đẻ ở Hòn Bảy Cạnh thì đi tour tháng 7–9 (~790.000đ/khách kèm lặn)." },
      { id: "bs-chua-nui-mot", name: "Chùa Núi Một (Vân Sơn Tự)", address: "Núi Một, gần trung tâm Côn Đảo", cluster: "con-dao", lat: 8.6885, lng: 106.6015, approx: true, price: "Miễn phí", hours: "Cả ngày", duration: "45 phút", suitable: "Ngắm toàn cảnh vịnh Côn Sơn", note: "Từ chùa nhìn được rừng, vịnh, thị trấn và hồ sen An Hải." },
      { id: "bs-bai-an-hai", name: "Bãi An Hải", address: "Trung tâm Côn Đảo, đi bộ ~10 phút", cluster: "con-dao", lat: 8.6800, lng: 106.6010, approx: true, price: "Miễn phí", hours: "Cả ngày", duration: "1–2 giờ", suitable: "Gia đình có trẻ nhỏ", note: "Nước êm, gần trung tâm. Tháng 10–3 có gió chướng, vịnh Côn Sơn sóng lớn hơn." }
    ],
    stays: [
      { id: "bs-uyens-house", name: "Uyên's House", address: "Tổ 4, khu 7, đường Phạm Văn Đồng, Côn Đảo", area: "con-dao", kind: "Homestay (có thuê xe máy)", price: "~200.000–800.000đ/đêm tùy phòng", suitable: "Khách tiết kiệm, nhóm muốn nấu ăn chung" },
      { id: "bs-7-condore", name: "7 Condore Homestay", address: "64A1 Nguyễn Huệ, Côn Đảo", area: "con-dao", kind: "Homestay 2 phòng, bếp chung", price: "Từ ~500.000đ/đêm", suitable: "Cặp đôi, nhóm nhỏ" },
      { id: "bs-lighthouse-con-dao", name: "Lighthouse Boutique Hotel", address: "10 Hồ Thanh Tòng, Côn Đảo", area: "con-dao", kind: "Khách sạn mini, cách bãi An Hải ~200 m", price: "~480.000–700.000đ/đêm", suitable: "Gia đình, nhóm 4–5 người" },
      { id: "bs-nam-hai-con-dao", name: "Khách sạn Nam Hải", address: "Khu dân cư số 5, đường Trần Phú, Côn Đảo", area: "con-dao", kind: "3 sao", price: "Từ ~1.650.000đ/đêm", suitable: "Ở trung tâm, đi bộ tới nhà tù, Hàng Dương" },
      { id: "bs-poulo-condor", name: "Poulo Condor Boutique Resort", address: "Suối Ớt, Côn Đảo", area: "con-dao", kind: "Resort 4 sao", price: "~3.800.000–12.000.000đ/đêm", suitable: "Nghỉ dưỡng yên tĩnh" },
      { id: "bs-six-senses-con-dao", name: "Six Senses Côn Đảo", address: "Bãi Đất Dốc, Côn Đảo", area: "con-dao", kind: "Resort 5 sao, biệt thự", price: "~8.000.000–20.000.000đ/đêm", suitable: "Nghỉ dưỡng cao cấp" }
    ],
    dishes: [
      { id: "bs-chao-hau-con-dao", name: "Cháo hàu Côn Đảo", meal: "Ăn sáng / tối", price: "35.000–50.000đ/tô", desc: "Cháo nấu với hàu tươi, tiêu, hành phi.", restaurants: [{ name: "Quán Cây Bàng", address: "Ngã tư Phạm Văn Đồng – Nguyễn Văn Trỗi, Côn Đảo", price: "35.000–50.000đ" }] },
      { id: "bs-oc-vu-nang", name: "Ốc vú nàng", meal: "Ăn tối", price: "70.000–100.000đ/kg", desc: "Đặc sản ốc luộc chấm muối tiêu chanh.", restaurants: [{ name: "Nhà hàng Phương Hạnh", address: "38 Nguyễn Huệ, Côn Đảo", price: "70.000–100.000đ/kg" }] },
      { id: "bs-goi-ca-nham", name: "Gỏi cá mập (cá nhám)", meal: "Ăn trưa / tối", price: "100.000–150.000đ/phần", desc: "Cá nhám trộn khế, dứa, đậu phộng, rau thơm.", restaurants: [{ name: "Nhà hàng Sang Tuyền", address: "Đường Nguyễn Huệ, Côn Đảo", price: "100.000–150.000đ/phần" }] },
      { id: "bs-cua-mat-trang", name: "Cua mặt trăng", meal: "Ăn tối", price: "200.000–300.000đ/kg", desc: "Hấp, chấm muối tiêu chanh; thịt ngọt thanh.", restaurants: [{ name: "Quán hải sản Thu Ba", address: "Gần chợ Côn Đảo", price: "Hỏi giá theo kg" }] }
    ],
    routes: [
      { mode: "Máy bay TP.HCM – Côn Đảo", time: "50–55 phút", price: "~1.500.000–1.750.000đ/chiều", note: "Ít chuyến, đặt sớm cả chiều về. Sân bay Cỏ Ống cách trung tâm ~15 km; taxi 150.000–450.000đ, nhiều khách sạn có xe đón." },
      { mode: "Tàu cao tốc Vũng Tàu – Côn Đảo", time: "3–3,5 giờ", price: "~660.000–950.000đ (thứ 6–CN đắt hơn), VIP ~1.200.000đ", note: "Đi từ cảng Bến Đá Vũng Tàu; từ Sài Gòn ra Vũng Tàu thêm ~2 giờ. Tháng 10–3 biển động, dễ hủy chuyến." },
      { mode: "Tàu cao tốc Trần Đề (Cần Thơ) – Côn Đảo", time: "2–2,5 giờ", price: "~310.000–450.000đ, VIP ~590.000đ", note: "Tuyến biển ngắn nhất; tàu chạy sáng 7–8 giờ." }
    ]
  },

  "tuyen-quang": {
    patch: {
      "rh-ha-giang-cot-co-lung-cu": { price: "25.000đ/người lớn; trẻ dưới 1,2 m miễn phí", hours: "Ban ngày", duration: "1–1,5 giờ", note: "Lên đỉnh qua 389 bậc rồi 140 bậc thang xoắn, mang giày đế chắc. Ghép với bản Lô Lô Chải ngay dưới chân núi." },
      "rh-ha-giang-dinh-thu-ho-vuong": { price: "40.000đ/người lớn; trẻ em miễn phí", hours: "7:00–17:00, mở cả Chủ nhật", duration: "45 phút–1 giờ", note: "Nằm trên đường từ Yên Minh lên Đồng Văn ở thung lũng Sà Phìn, nên ghé cùng ngày đi Lũng Cú." },
      "rh-ha-giang-deo-ma-pi-leng": { price: "Miễn phí", hours: "Ban ngày; đẹp nhất buổi sáng nắng", duration: "1–2 giờ (dừng ngắm, chụp ảnh)", note: "Đèo nhiều cua gắt, vực sâu. Không vượt ở cua, không chạy khi sương mù hoặc trời tối; ngắm sông Nho Quế từ điểm dừng chính thức." },
      "rh-ha-giang-pho-co-dong-van": { price: "Miễn phí dạo phố", hours: "Cả ngày; tối có đèn lồng", duration: "1–2 giờ", note: "Sáng Chủ nhật có chợ phiên ngay cạnh, nên xếp lịch ngủ Đồng Văn đêm thứ Bảy." },
      "rh-ha-giang-song-nho-que": { price: "Thuyền trên sông ~150.000–250.000đ/người; kayak ~50.000đ", hours: "Ban ngày", duration: "1–2 giờ", note: "Xuống bến thuyền qua đường dốc hẹp từ Mã Pí Lèng; đi xe máy cẩn thận. Mặc áo phao khi lên thuyền." },
      "rh-ha-giang-cho-phien-meo-vac": { hours: "Sáng Chủ nhật", price: "Miễn phí", note: "Đến sớm 6–8 giờ là đông vui nhất; thắng cố, bánh tam giác mạch bán ngay trong chợ." }
    },
    places: [
      { id: "bs-cong-troi-quan-ba", name: "Cổng Trời Quản Bạ và núi đôi Cô Tiên", address: "Quản Bạ, khu Hà Giang cũ, trên đường lên Yên Minh", cluster: "khu-ha-giang", lat: 23.0700, lng: 104.9990, approx: true, price: "Miễn phí góc nhìn bên đường; điểm ngắm mới có thu phí", hours: "Ban ngày", duration: "30–45 phút", suitable: "Chụp ảnh phong cảnh", note: "Điểm dừng đầu tiên trên cung đường Hạnh Phúc, cách TP Hà Giang ~45 km." }
    ],
    stays: [
      { id: "bs-dao-lodge", name: "Dao Lodge", address: "Quản Bạ, khu Hà Giang cũ", area: "dong-van", kind: "Homestay nhà tre, phòng đôi và giường tập thể", price: "Từ ~180.000đ (giá cũ)", suitable: "Nhóm nhỏ, thích nhà tre yên tĩnh" },
      { id: "bs-bui-homestay-dong-van", name: "Bụi Homestay Đồng Văn", address: "Thị trấn Đồng Văn, gần phố cổ", area: "dong-van", kind: "Homestay nhà sàn gỗ", price: "~300.000–500.000đ/đêm (mặt bằng homestay Đồng Văn 2026, thường kèm bữa tối)", suitable: "Ở gần phố cổ và chợ phiên" },
      { id: "bs-lo-lo-ancient-house", name: "Lô Lô Ancient House", address: "Bản Lô Lô Chải, dưới chân cột cờ Lũng Cú", area: "dong-van", kind: "Homestay nhà trình tường cổ", price: "~300.000–500.000đ/đêm (mặt bằng 2026)", suitable: "Ngắm cột cờ lúc sớm, trải nghiệm bản" },
      { id: "bs-auberge-meo-vac", name: "Auberge de Mèo Vạc (Chúng Pủa)", address: "Thị trấn Mèo Vạc", area: "dong-van", kind: "Homestay nhà trình tường", price: "~300.000–500.000đ/đêm (mặt bằng 2026)", suitable: "Ở Mèo Vạc, đi chợ phiên sáng Chủ nhật" }
    ],
    dishes: [
      { id: "bs-banh-cuon-trung-dong-van", name: "Bánh cuốn trứng Đồng Văn", meal: "Ăn sáng", price: "30.000–40.000đ/phần", desc: "Bánh cuốn nhân trứng, ăn với nước hầm xương thay nước mắm.", restaurants: [{ name: "Quán bánh cuốn phố cổ", address: "29 Phố Cổ, thị trấn Đồng Văn", price: "30.000–40.000đ" }] },
      { id: "bs-chao-au-tau", name: "Cháo ấu tẩu", meal: "Ăn tối", price: "20.000–40.000đ/bát", desc: "Cháo nấu củ ấu tẩu, chân giò; vị đắng nhẹ, ấm người.", restaurants: [{ name: "Hàng cháo chợ Đồng Văn", address: "Chợ Đồng Văn, thị trấn Đồng Văn", price: "20.000–40.000đ" }] },
      { id: "bs-thang-co", name: "Thắng cố", meal: "Chợ phiên sáng Chủ nhật", price: "50.000–300.000đ/nồi tùy phần", desc: "Món hầm thịt ngựa và nội tạng với thảo mộc của người Mông.", restaurants: [{ name: "Chợ phiên Đồng Văn", address: "Thị trấn Đồng Văn (sáng Chủ nhật)", price: "Hỏi giá theo bát/nồi" }] },
      { id: "bs-banh-tam-giac-mach", name: "Bánh tam giác mạch", meal: "Ăn vặt", price: "10.000–15.000đ/chiếc", desc: "Bánh hạt tam giác mạch hấp rồi nướng, vỏ giòn ruột mềm.", restaurants: [{ name: "Chợ đêm phố cổ Đồng Văn", address: "Phố cổ Đồng Văn", price: "10.000–15.000đ" }] }
    ],
    routes: [
      { mode: "Xe giường nằm Hà Nội – TP Hà Giang", time: "6–7 giờ (chạy đêm)", price: "~250.000–350.000đ/vé", note: "Xe đêm từ Mỹ Đình 20:30–21:30, tới 3:30–5:00 sáng; hỏi nhà xe cho nằm chờ đến sáng." },
      { mode: "Thuê xe máy ở TP Hà Giang", time: "Vòng Hà Giang 3–4 ngày", price: "~250.000–400.000đ/ngày (xe số, xe côn tay)", note: "Cần bằng lái phù hợp; kiểm tra phanh, lốp. Không quen đèo thì thuê Easy Rider (~2–3,2 triệu/ngày trọn gói)." }
    ]
  },

  "lam-dong": {
    patch: {
      "rh-lam-dong-thung-lung-vang": { price: "Người lớn 70.000đ, trẻ em 30.000đ", hours: "7:00–18:00", source: "vinwonders.com wonderpedia, bài 16/07/2025, đọc 21/11/2026" },
      "rh-lam-dong-thac-pongour": { price: "Người lớn khoảng 20.000đ, trẻ em 10.000đ (giá năm 2025, nên hỏi lại tại cổng)", hours: "7:00–17:00", source: "vinwonders.com wonderpedia, bài 20/07/2025, đọc 21/11/2026" },
      "rh-lam-dong-ho-than-tho": { price: "Người lớn khoảng 20.000đ, trẻ em 10.000đ (giá cũ, kiểm lại tại cổng)", hours: "Khoảng 7:00–17:00 (ước tính, chưa kiểm)", source: "vietnambooking.com, bảng giá điểm tham quan Đà Lạt (bài cũ), đọc 21/11/2026" },
      "rh-binh-thuan-doi-cat-mui-ne": { price: "Miễn phí vào đồi; trượt cát, xe địa hình tính riêng", hours: "Đẹp nhất 5:00–8:00 sáng hoặc chiều muộn", duration: "1–2 giờ", note: "Đi sớm khi cát còn mát. Thỏa thuận giá ván trượt, xe ATV trước khi dùng." },
      "rh-binh-thuan-bau-trang": { price: "Xe jeep trong khu ~70.000–150.000đ/người hoặc ~800.000đ/xe (1–8 khách); tour jeep bình minh từ Mũi Né ~280.000đ/người", hours: "Bình minh hoặc hoàng hôn", duration: "2–3 giờ", note: "Hỏi rõ giá theo người hay theo xe trước khi lên. Cách Mũi Né ~40 km, đi tour jeep đón tại khách sạn tiện hơn tự lái." },
      "rh-binh-thuan-lang-chai-mui-ne": { price: "Miễn phí; hải sản theo giá người bán", hours: "Đẹp nhất 5:30–7:30 sáng khi thuyền về", duration: "1 giờ", note: "Ngắm từ trên đường Huỳnh Thúc Kháng nhìn xuống vịnh. Mua hải sản rồi nhờ chế biến tại chỗ, hỏi giá trước." },
      "rh-binh-thuan-thap-cham-po-sah-inu": { duration: "45 phút–1 giờ", note: "Tháp trên đồi Bà Nài, đi bộ lên; kết hợp ngắm biển và thành phố. Hỏi giá vé tại cổng." }
    },
    places: [
      { id: "bs-bao-tang-nuoc-mam", name: "Bảo tàng nước mắm Làng Chài Xưa", address: "30 Nguyễn Thông, Phú Hài, Phan Thiết", cluster: "khu-binh-thuan", lat: 10.9389, lng: 108.1428, approx: true, price: "Người lớn 100.000đ; trẻ dưới 1 m miễn phí", hours: "Ban ngày", duration: "1–1,5 giờ", suitable: "Gia đình, người muốn tìm hiểu nghề nước mắm", note: "14 gian trưng bày, khu tái hiện làng chài. Gần tháp Pô Sah Inư, ghép chung buổi sáng." },
      { id: "bs-hon-rom", name: "Hòn Rơm", address: "Khu phố 14, Mũi Né, Phan Thiết (~28 km từ trung tâm)", cluster: "khu-binh-thuan", lat: 10.9670, lng: 108.3320, approx: true, price: "Miễn phí", hours: "Cả ngày; đẹp lúc hoàng hôn", duration: "1–2 giờ", suitable: "Tắm biển, lướt sóng, ngắm hoàng hôn", note: "Gần đồi cát bay, nên ghép chung một buổi chiều." },
      { id: "bs-mui-ke-ga", name: "Mũi Kê Gà và hải đăng", address: "Tân Thành, Hàm Thuận Nam", cluster: "khu-binh-thuan", lat: 10.7000, lng: 107.9920, approx: true, price: "Vườn đá ven biển miễn phí; ra đảo hải đăng đi thuyền (hỏi giá tại bến)", hours: "Ban ngày", duration: "2–3 giờ", suitable: "Chụp ảnh, ngắm vườn đá", note: "Cách Phan Thiết ~30 km, hợp đi xe riêng. Biển động thì thuyền không ra đảo." }
    ],
    stays: [
      { id: "bs-nha-gio-homestay", name: "Nhà Gió Homestay", address: "15 Lê Lợi, Hưng Long, Phan Thiết", area: "mui-ne", kind: "Homestay", price: "Từ ~350.000đ/đêm (giá cũ)", suitable: "Khách tự túc ngân sách vừa" },
      { id: "bs-cesar-homestay", name: "Cesar Homestay", address: "124 Nguyễn Đình Chiểu, Hàm Tiến, Mũi Né", area: "mui-ne", kind: "Homestay có hồ bơi", price: "~580.000–890.000đ/đêm", suitable: "Nhóm bạn, cặp đôi" },
      { id: "bs-dynasty-beach", name: "Dynasty Beach Resort", address: "140A Nguyễn Đình Chiểu, Hàm Tiến, Mũi Né", area: "mui-ne", kind: "Resort 3 sao", price: "Từ ~940.000đ/đêm", suitable: "Gia đình, gần biển" },
      { id: "bs-canary-beach", name: "Canary Beach Resort", address: "60 Huỳnh Thúc Kháng, Hàm Tiến, Mũi Né", area: "mui-ne", kind: "Resort, hồ bơi ngoài trời", price: "Từ ~1.260.000đ/đêm", suitable: "Gia đình, cặp đôi" },
      { id: "bs-hawaii-beach", name: "Hawaii Beach Resort Mũi Né", address: "40 Nguyễn Đình Chiểu, Hàm Tiến, Mũi Né", area: "mui-ne", kind: "Resort ven biển", price: "~1.000.000–5.000.000đ/đêm tùy mùa", suitable: "Nghỉ dưỡng" }
    ],
    dishes: [
      { id: "bs-banh-can-phan-thiet", name: "Bánh căn Phan Thiết (nước mắm)", meal: "Ăn chiều / tối", price: "Bình dân, hỏi giá theo đĩa", desc: "Bánh đổ khuôn đất, chấm chén nước mắm pha đầy.", restaurants: [{ name: "Quán Lân Nguyệt", address: "8 Hải Thượng Lãn Ông, Phan Thiết", price: "Hỏi giá" }] },
      { id: "bs-banh-canh-cha-ca-pt", name: "Bánh canh chả cá Phan Thiết", meal: "Ăn sáng / trưa", price: "Bình dân", desc: "Nước lèo trong, chả cá chiên vàng thái lát.", restaurants: [{ name: "Bánh canh Xíu", address: "1A Kim Đồng, Đức Nghĩa, Phan Thiết (10:00–22:00)", price: "Hỏi giá" }, { name: "Bánh canh 41", address: "41 Tuyên Quang, Phan Thiết (7:00–22:00)", price: "Hỏi giá" }] },
      { id: "bs-lau-ca-bop", name: "Lẩu cá bớp", meal: "Ăn tối", price: "Theo nồi", desc: "Nước lẩu chua thanh, cá bớp chắc thịt, ăn với bún.", restaurants: [{ name: "Lẩu cá Ngọc Lan", address: "11A Phan Đình Phùng, Phan Thiết", price: "Hỏi giá" }] },
      { id: "bs-hai-san-mui-ne", name: "Hải sản Mũi Né", meal: "Ăn tối", price: "15.000–200.000đ/món", desc: "Nghêu, sò dương, mực, tôm; tháng 3–5 có cua huỳnh đế.", restaurants: [{ name: "Làng Chài quán", address: "119 Huỳnh Thúc Kháng, Mũi Né (9:00–22:30)", price: "20.000–150.000đ/món" }, { name: "Bi Bo quán", address: "191 Nguyễn Đình Chiểu, Hàm Tiến (10:00–22:30)", price: "15.000–150.000đ/món" }] }
    ]
  },

  "gia-lai": {
    patch: {
      "ky-co": { price: "Vé vào bãi 60.000đ/người lớn, 30.000đ/trẻ em (2026); cano từ Eo Gió hoặc xe trung chuyển tính riêng", note: "Ghép với Eo Gió trong một ngày. Hỏi trước giá cano và xe trung chuyển chặng cuối để tránh bị nâng giá." },
      "eo-gio": { price: "25.000đ/người", note: "Con đường đi bộ men sườn núi là phần đáng đi nhất; đi sáng sớm hoặc chiều muộn đỡ nắng." },
      "thap-doi": { price: "Khoảng 10.000–20.000đ/người", duration: "30–45 phút", note: "Ngay trong thành phố trên đường Trần Hưng Đạo, dễ ghé khi đi từ sân bay Phù Cát về." }
    },
    places: [
      { id: "bs-hon-kho", name: "Hòn Khô (Nhơn Hải)", address: "Thôn Hải Đông, xã Nhơn Hải, Quy Nhơn; cano từ cảng làng chài Nhơn Hải", cluster: "quy-nhon-binh-dinh-cu", lat: 13.7380, lng: 109.2890, approx: true, price: "Vé đảo 80.000đ + cano khứ hồi 150.000đ/người (2026)", hours: "Ban ngày", duration: "Nửa ngày", suitable: "Biển hoang sơ, lặn ngắm san hô, chụp cầu gỗ", note: "Chỉ đi ngày biển êm. Cano ra đảo 10–15 phút; nước ròng lộ con đường cát dưới biển." },
      { id: "bs-cu-lao-xanh", name: "Cù Lao Xanh", address: "Xã Nhơn Châu; tàu, cano từ cảng Hàm Tử Quy Nhơn", cluster: "quy-nhon-binh-dinh-cu", lat: 13.6150, lng: 109.3550, approx: true, price: "Cano khứ hồi ~350.000đ/người; tour 1 ngày ~700.000đ/người", hours: "Ban ngày; có thể ngủ lại đảo", duration: "Cả ngày", suitable: "Cắm trại, câu mực đêm, lặn", note: "Hỏi rõ tour đã gồm ăn trưa, lặn hay chưa. Biển động (tháng 10–12) thường ngưng tàu." },
      { id: "bs-thap-banh-it", name: "Tháp Bánh Ít (Tháp Bạc)", address: "Dọc QL1A, Phước Hiệp, Tuy Phước (~20 km từ Quy Nhơn)", cluster: "quy-nhon-binh-dinh-cu", lat: 13.8540, lng: 109.1240, approx: true, price: "Khoảng 10.000–20.000đ/người", hours: "Ban ngày", duration: "45 phút", suitable: "Kiến trúc Chăm, chụp ảnh", note: "Bốn tháp trên đồi, còn khá nguyên vẹn; đi chiều để ngắm hoàng hôn trên cánh đồng." }
    ],
    stays: [
      { id: "bs-lan-anh-homestay", name: "Lan Anh Homestay", address: "36 Xuân Diệu, Quy Nhơn", area: "quy-nhon", kind: "Homestay (nhiều cơ sở)", price: "Từ ~110.000đ/người/đêm giường tầng (giá cũ)", suitable: "Nhóm bạn, tiết kiệm" },
      { id: "bs-quy-nhon-hotel", name: "Quy Nhơn Hotel", address: "08–10 Nguyễn Huệ, Quy Nhơn", area: "quy-nhon", kind: "Khách sạn ven biển", price: "Từ ~350.000đ/đêm (giá cũ)", suitable: "Đi lẻ, cặp đôi" },
      { id: "bs-lifes-a-beach", name: "Life's A Beach", address: "Tổ 2, khu vực 1, Bãi Xép, Ghềnh Ráng, Quy Nhơn", area: "quy-nhon", kind: "Homestay sát biển", price: "~500.000–1.000.000đ/đêm", suitable: "Ở sát biển, yên tĩnh" },
      { id: "bs-muong-thanh-quy-nhon", name: "Mường Thanh Quy Nhơn", address: "2 Nguyễn Huệ, Quy Nhơn", area: "quy-nhon", kind: "Khách sạn 4 sao", price: "Từ ~1.050.000đ/đêm", suitable: "Gia đình, ở trung tâm" },
      { id: "bs-hai-au-quy-nhon", name: "Khách sạn Hải Âu", address: "489 An Dương Vương, Quy Nhơn", area: "quy-nhon", kind: "4 sao, view biển", price: "~1.100.000–4.600.000đ/đêm", suitable: "Gia đình, cặp đôi" },
      { id: "bs-flc-quy-nhon", name: "FLC Quy Nhơn Resort", address: "Khu 4, bãi biển Nhơn Lý, Quy Nhơn", area: "quy-nhon", kind: "Resort 5 sao", price: "~1.500.000–3.500.000đ/đêm", suitable: "Nghỉ dưỡng, gần Eo Gió – Kỳ Co" }
    ],
    dishes: [
      { id: "bs-bun-cha-ca-quy-nhon", name: "Bún chả cá Quy Nhơn", meal: "Ăn sáng", price: "25.000–60.000đ/tô", desc: "Nước dùng xương cá ngọt thanh, chả cá dai, có quán thêm sứa.", restaurants: [{ name: "Bún cá Thùy", address: "261 Tăng Bạt Hổ, Quy Nhơn", price: "35.000–55.000đ" }, { name: "Bún cá Phượng Tèo", address: "211 Nguyễn Huệ, Quy Nhơn", price: "40.000–60.000đ" }] },
      { id: "bs-banh-xeo-tom-nhay", name: "Bánh xèo tôm nhảy", meal: "Ăn chiều / tối", price: "15.000–40.000đ/phần", desc: "Bánh nhỏ đổ khuôn, nhân tôm đất, cuốn rau chấm nước mắm.", restaurants: [{ name: "Bánh xèo tôm nhảy Gia Vỹ", address: "14 Diên Hồng, Lê Hồng Phong, Quy Nhơn", price: "30.000–40.000đ" }] },
      { id: "bs-banh-canh-ba-o", name: "Bánh canh chả cá", meal: "Ăn sáng / trưa", price: "25.000–30.000đ/tô (giá cũ)", desc: "Sợi bánh dai, chả cá giòn, nước lèo đậm.", restaurants: [{ name: "Bánh canh bà O", address: "384 Bạch Đằng, Quy Nhơn", price: "25.000–30.000đ" }] }
    ]
  },

  "da-nang": {
    patch: {
      "rh-quang-nam-thanh-co-chien-dan": { hours: "Khoảng 7:00–17:00 (ước tính, chưa kiểm)" }
    },
    stays: [
      { id: "bs-old-yellow-house", name: "Old Yellow House", address: "51/5B Phan Châu Trinh, Hội An", area: "hoi-an", kind: "Homestay nhà cổ trong phố cổ (bếp, WC chung)", price: "~200.000–500.000đ/đêm", suitable: "Cặp đôi ngân sách thấp, muốn ở sát phố cổ" },
      { id: "bs-loong-boong", name: "Loong Boong Homestay", address: "172 Nguyễn Tri Phương, Cẩm Nam, Hội An", area: "hoi-an", kind: "Homestay kiểu nhà cổ, cách phố cổ ~0,8 km", price: "~300.000–600.000đ/đêm", suitable: "Gần trung tâm mà yên tĩnh" },
      { id: "bs-an-nhien-hoi-an", name: "An Nhiên Hội An Homestay", address: "Tổ 4, khối Tân Thành, Cẩm An, Hội An", area: "hoi-an", kind: "Homestay có hồ bơi, thuê nguyên căn được", price: "Từ ~700.000đ/phòng; nguyên căn từ ~3.000.000đ/đêm", suitable: "Nhóm, gia đình; đi bộ ~10 phút ra biển An Bàng" },
      { id: "bs-emm-hoi-an", name: "Êmm Hội An", address: "187 Lý Thường Kiệt, Minh An, Hội An", area: "hoi-an", kind: "Khách sạn hiện đại, hồ bơi", price: "Từ ~750.000đ/đêm", suitable: "Đi bộ ra phố cổ" },
      { id: "bs-anantara-hoi-an", name: "Anantara Hội An", address: "1 Phạm Hồng Thái, Cẩm Châu, Hội An", area: "hoi-an", kind: "5 sao bên sông Thu Bồn", price: "~3.500.000–6.000.000đ/đêm tùy mùa", suitable: "Dịch vụ cao cấp, sát phố cổ" },
      { id: "bs-victoria-hoi-an", name: "Victoria Hội An Beach Resort", address: "Biển Cửa Đại, Hội An", area: "hoi-an", kind: "Resort ven biển", price: "~1.400.000–6.000.000đ/đêm tùy mùa", suitable: "Ở sát biển, cách phố cổ ~5 km" }
    ],
    dishes: [
      { id: "bs-com-ga-hoi-an", name: "Cơm gà Hội An", meal: "Ăn trưa", price: "40.000–50.000đ/đĩa", desc: "Cơm nấu nước luộc gà, gà xé trộn hành rau răm.", restaurants: [{ name: "Cơm gà Bà Buội", address: "22 Phan Châu Trinh, Hội An", price: "40.000–50.000đ" }] },
      { id: "bs-banh-mi-phuong", name: "Bánh mì Phượng", meal: "Ăn sáng / ăn vặt", price: "~35.000đ/ổ", desc: "Bánh mì thập cẩm nổi tiếng nhất Hội An, thường xếp hàng.", restaurants: [{ name: "Bánh mì Phượng", address: "2B Phan Châu Trinh, Hội An", price: "~35.000đ" }] }
    ]
  },

  "quang-tri": {
    patch: {
      "rh-quang-binh-dong-thien-duong": { price: "Người lớn 250.000đ; trẻ 1,1–1,3 m và khách Việt trên 60 tuổi 125.000đ; xe điện 20.000–60.000đ", hours: "Mùa hè 7:00–16:30; mùa đông 7:30–16:00", duration: "1–2 giờ tuyến cầu gỗ 1 km", note: "Có thể đi bộ ~20 phút thay xe điện. Tháng 10–11 đường dễ trơn, mang giày bám." },
      "rh-quang-binh-dong-phong-nha": { price: "Vé 150.000đ/người lớn; thuyền thuê theo chiếc (tối đa 12 khách), hỏi giá tại bến", hours: "Khoảng 7:00–16:00, thuyền cuối rời bến khoảng 15:30 (ước tính, chưa kiểm)", duration: "2–3 giờ (gồm thuyền trên sông Son)", note: "Đi ghép thuyền với khách khác để chia tiền thuyền. Ghép thêm động Tiên Sơn (80.000đ) cùng bến." },
      "rh-quang-binh-song-chay-hang-toi": { price: "Tour phổ thông ~250.000–450.000đ/người lớn (zipline, chèo kayak, tắm bùn)", hours: "Tour chạy ban ngày, khoảng 8:00–16:00 (ước tính, chưa kiểm)", duration: "Nửa ngày", note: "Mang quần áo thay; không hợp người sợ độ cao hoặc không biết bơi (có áo phao)." },
      "rh-quang-binh-suoi-nuoc-mooc": { price: "Khoảng 100.000–180.000đ/người lớn (các mức đang lệch, hỏi tại cổng)", duration: "2–3 giờ", note: "Hợp mùa hè (tháng 5–8), nước trong mát; mùa mưa có thể đóng cửa." }
    },
    stays: [
      { id: "bs-central-backpackers-pn", name: "Central Backpackers Hostel Phong Nha", address: "Thôn Xuân Tiến, Phong Nha", area: "phong-nha", kind: "Hostel", price: "Từ ~300.000đ", suitable: "Khách bụi, khách trẻ" },
      { id: "bs-amanda-homestay-pn", name: "Phong Nha Amanda Homestay", address: "Thôn Xuân Sơn, Phong Nha", area: "phong-nha", kind: "Homestay bình dân", price: "Từ ~300.000đ/đêm", suitable: "Tiết kiệm, cần chủ nhà hỗ trợ đặt tour" },
      { id: "bs-hung-phat-bungalow", name: "Hưng Phát Bungalow", address: "Thôn Cù Lạc 1, Phong Nha", area: "phong-nha", kind: "Bungalow có hồ bơi giữa đồng lúa", price: "Từ ~500.000đ/đêm", suitable: "Cặp đôi, gia đình nhỏ" },
      { id: "bs-saigon-phong-nha", name: "Sài Gòn Phong Nha Hotel", address: "ĐT20, Sơn Trạch, Phong Nha", area: "phong-nha", kind: "Khách sạn", price: "Từ ~600.000đ/đêm", suitable: "Gia đình, cần phòng tiện nghi" },
      { id: "bs-doan-gia-resort", name: "Đoàn Gia Resort Phong Nha", address: "ĐT20, Sơn Trạch, Phong Nha", area: "phong-nha", kind: "Resort khuôn viên rộng", price: "Từ ~800.000đ/đêm", suitable: "Gia đình, nhóm bạn" }
    ],
    dishes: [
      { id: "bs-ga-nuong-muoi-cheo", name: "Gà đồi nướng chấm muối cheo", meal: "Ăn trưa", price: "Theo con/mẹt", desc: "Gà đồi tẩm mật ong rừng nướng than, chấm muối cheo húng quế rừng.", restaurants: [{ name: "Nhà hàng Động Thiên Đường", address: "Trong khu du lịch Động Thiên Đường, cách quầy vé ~50 m (9:00–15:00)", price: "Hỏi giá" }] },
      { id: "bs-chao-canh-phong-nha", name: "Cháo canh, bánh khoái", meal: "Ăn sáng / xế", price: "Bình dân", desc: "Món sáng quen thuộc của người Quảng Bình.", restaurants: [{ name: "Hàng quán chợ Phong Nha", address: "Chợ Phong Nha, Sơn Trạch", price: "Bình dân" }] },
      { id: "bs-lau-ca-tram-song-son", name: "Lẩu cá trắm sông Son", meal: "Ăn tối", price: "Theo nồi", desc: "Cá trắm đánh bắt trên sông Son nấu lẩu.", restaurants: [{ name: "Quán trên trục đường chính thị trấn Phong Nha", address: "ĐT20, Sơn Trạch, Phong Nha", price: "Hỏi giá" }] }
    ]
  }
};
var BO_SUNG_CUM = { "phu-quoc": "Phú Quốc", "con-dao": "Côn Đảo", "dong-van": "Hà Giang cũ (Đồng Văn, Mèo Vạc)", "mui-ne": "Mũi Né – Phan Thiết", "quy-nhon": "Quy Nhơn", "hoi-an": "Hội An", "phong-nha": "Phong Nha", "can-gio": "Cần Giờ", "vung-tau": "Vũng Tàu", "mang-den": "Măng Đen", "kham-pha-them": "Khám phá thêm" };
/* Soi lần 2 (23/11/2026): điểm còn thiếu. Giá, giờ chưa kiểm ghi rõ "ước tính". */
var BO_SUNG_THEM = {
  "tp-ho-chi-minh": {
    patch: {
      "rh-tp-hcm-can-cu-so-chi-huy-dac-khu-rung-sac": { cluster: "can-gio", lat: 10.4950, lng: 106.7830, approx: true, address: "Trong Khu du lịch Vàm Sát, xã Lý Nhơn, Cần Giờ, TP.HCM", note: "Nằm trong rừng ngập mặn Cần Giờ, đi cùng Vàm Sát trong một ngày." }
    },
    places: [
      { id: "bs-rung-sac-can-gio", name: "Rừng ngập mặn Cần Giờ – Lâm Viên Cần Giờ (Đảo Khỉ)", address: "Long Hòa, Cần Giờ, TP.HCM", cluster: "can-gio", lat: 10.4600, lng: 106.8900, approx: true, price: "Vé vào khoảng 50.000–150.000đ/người lớn tùy gói, có ca nô vào căn cứ Rừng Sác (ước tính, chưa kiểm)", hours: "Khoảng 7:30–17:00 (ước tính, chưa kiểm)", duration: "Nửa ngày", suitable: "Gia đình, nhóm bạn, đi trong ngày từ trung tâm TP.HCM", note: "Đi ô tô ~2 giờ từ Quận 1, qua phà Bình Khánh hoặc cầu Bình Khánh nếu đã thông xe. Khỉ hay giật đồ: cất kính, điện thoại, túi nilon.", info: { mua_dep: "Tháng 12–4 (mùa khô, ít muỗi) (ước tính, chưa kiểm)" } },
      { id: "bs-vam-sat", name: "Khu du lịch sinh thái Vàm Sát", address: "Xã Lý Nhơn, Cần Giờ, TP.HCM", cluster: "can-gio", lat: 10.4935, lng: 106.7840, approx: true, price: "Vé cổng 35.000đ/người; tour ca nô 1.095.000đ (chưa gồm vé cổng); đầm dơi, tháp quan sát tính riêng (vamsat.vn, đọc qua bảng giá 11/2026; kiểm lại trước khi đi)", hours: "8:00–17:00", duration: "Nửa ngày", suitable: "Thích rừng ngập mặn, chim, cá sấu, đầm dơi", note: "Xa hơn Đảo Khỉ ~15 km. Ghép Vàm Sát + căn cứ Rừng Sác trong một ngày; mang thuốc chống muỗi.", info: { mua_dep: "Tháng 12–4 (mùa khô) (ước tính, chưa kiểm)" } },
      { id: "bs-bien-can-gio", name: "Biển Cần Giờ (bãi 30/4)", address: "Đường Duyên Hải, Long Hòa, Cần Giờ, TP.HCM", cluster: "can-gio", lat: 10.3960, lng: 106.9600, approx: true, price: "Bãi công cộng miễn phí; khu có dịch vụ thu phí vào cổng nhỏ (ước tính, chưa kiểm)", hours: "Cả ngày", duration: "2–3 giờ", suitable: "Đi chơi cuối tuần, ăn hải sản", note: "Nước đục phù sa, không đẹp để tắm như Vũng Tàu; đến để ăn hải sản ở chợ Hàng Dương và đi dạo." },
      { id: "bs-tong-quan-con-dao", name: "Côn Đảo (tổng quan)", address: "Đặc khu Côn Đảo, Bà Rịa – Vũng Tàu cũ nay thuộc TP.HCM", cluster: "con-dao", lat: 8.6830, lng: 106.6090, approx: true, price: "Tùy điểm; xem các mục nhà tù Côn Đảo, Hàng Dương, Đầm Trầu, VQG Côn Đảo", hours: "Cả năm", duration: "2–3 ngày", suitable: "Tưởng niệm, biển hoang sơ", note: "Ra đảo bằng máy bay từ TP.HCM (~1 giờ, có chuyến Hà Nội, Cần Thơ) hoặc tàu cao tốc từ Vũng Tàu (~4 giờ) hay Trần Đề, Sóc Trăng cũ (~2,5 giờ) (ước tính, chưa kiểm). Không đi đường bộ.", info: { mua_dep: "Tháng 3–9 (biển êm); tháng 10–2 gió mùa, tàu hay hủy chuyến" } },
      { id: "bs-tong-quan-vung-tau", name: "TP Vũng Tàu (tổng quan)", address: "Phường Vũng Tàu, Bà Rịa – Vũng Tàu cũ nay thuộc TP.HCM", cluster: "vung-tau", lat: 10.3460, lng: 107.0840, approx: true, price: "Tùy điểm; xem Bãi Sau, Tượng Chúa Kitô Vua, Hải đăng, Bạch Dinh", hours: "Cả năm", duration: "1–2 ngày", suitable: "Đi cuối tuần từ TP.HCM, nghỉ biển gần", note: "Từ trung tâm TP.HCM đi ô tô ~2 giờ qua cao tốc Long Thành, hoặc tàu cao tốc từ bến Bạch Đằng ~2 giờ (ước tính, chưa kiểm).", info: { mua_dep: "Tháng 11–4 (mùa khô, biển êm); cuối tuần, lễ rất đông" } }
    ]
  },
  "quang-tri": {
    places: [
      { id: "bs-son-doong", name: "Hang Sơn Đoòng (chỉ đi theo tour)", address: "Vườn quốc gia Phong Nha – Kẻ Bàng, Quảng Bình cũ nay thuộc Quảng Trị", cluster: "phong-nha", lat: 17.4567, lng: 106.2876, approx: true, price: "Chỉ đi tour thám hiểm của Oxalis (đơn vị khai thác duy nhất): 80.000.000đ/người (~3.000 USD), tour 6 ngày 5 đêm, tối đa 10 khách/đoàn, 18–70 tuổi. Không bán vé lẻ. Theo Oxalis, chỗ năm 2027–2028 đã kín (oxalisadventure.com, xem 23/11/2026)", hours: "Tour chạy tháng 1–8; mùa mưa đóng", duration: "6 ngày 5 đêm", suitable: "Người khỏe, có kinh nghiệm trekking; phải qua kiểm tra thể lực", note: "Không tự đi được. Đặt chỗ trước nhiều tháng. Chỉ đặt qua web Oxalis, cẩn thận trang giả mạo bán \"vé Sơn Đoòng\". Muốn trải nghiệm hang nhẹ hơn: hang Én, Tú Làn (1–3 ngày) hoặc động Phong Nha, Thiên Đường đi trong ngày.", info: { mua_dep: "Tháng 2–8 (mùa khô, mùa tour) (ước tính, chưa kiểm)" } }
    ]
  },
  "quang-ngai": {
    places: [
      { id: "bs-thi-tran-mang-den", name: "Thị trấn Măng Đen", address: "Kon Plông, Kon Tum cũ nay thuộc Quảng Ngãi", cluster: "mang-den", lat: 14.6050, lng: 108.2950, approx: true, price: "Thị trấn miễn phí; các điểm như hồ Đắk Ke, thác Pa Sỹ, tượng Đức Mẹ Măng Đen phần lớn miễn phí hoặc vé nhỏ (ước tính, chưa kiểm)", hours: "Cả ngày", duration: "1–2 ngày", suitable: "Thích khí hậu mát, rừng thông, đi xe máy", note: "Cách TP Kon Tum ~54 km theo QL24 (đường đèo). Quanh thị trấn có 7 hồ, 3 thác, chùa Khánh Lâm, làng Kon Bring; cổng xã mangden.quangngai.gov.vn có danh sách ~42 cơ sở lưu trú. Đêm lạnh 12–18°C, mang áo khoác.", info: { mua_dep: "Tháng 11–4 (mát, ít mưa); mai anh đào nở khoảng tháng 1–3 (ước tính, chưa kiểm)" } }
    ]
  },
  "da-nang": {
    places: [
      { id: "bs-cau-vang", name: "Cầu Vàng (Bà Nà Hills)", address: "Sun World Bà Nà Hills, Hòa Vang, Đà Nẵng", cluster: "phia-tay", lat: 15.9953, lng: 107.9963, approx: true, price: "Nằm trong vé Sun World Bà Nà Hills (cáp treo + vào cổng), không có vé lẻ lên Cầu Vàng. Bảng giá 2026: khách ngoài Đà Nẵng người lớn 1.000.000đ, trẻ em/người cao tuổi 800.000đ; khách Đà Nẵng 650.000đ/550.000đ (sunworld.vn)", hours: "Theo giờ Bà Nà Hills: 08:00–22:00 (sunworld.vn)", duration: "30–60 phút trên cầu; cả ngày nếu chơi Bà Nà", suitable: "Chụp ảnh, ngắm mây núi", note: "Lên sớm chuyến cáp đầu để tránh đông. Trời mù thì gần như không thấy cảnh, xem dự báo trước." }
    ]
  },
  "an-giang": {
    places: [
      { id: "bs-tong-quan-phu-quoc", name: "Đảo Phú Quốc (tổng quan)", address: "Đặc khu Phú Quốc, Kiên Giang cũ nay thuộc An Giang", cluster: "phu-quoc", lat: 10.2170, lng: 103.9590, approx: true, price: "Tùy điểm; xem các mục Phú Quốc riêng (VinWonders, Safari, Bãi Sao, Hòn Thơm...)", hours: "Cả năm", duration: "3–4 ngày", suitable: "Nghỉ biển, gia đình, cặp đôi", note: "Ra đảo bằng máy bay (TP.HCM ~1 giờ, Hà Nội ~2 giờ) hoặc tàu cao tốc từ Rạch Giá (~2,5 giờ), Hà Tiên (~1,5 giờ) (ước tính, chưa kiểm). Không đi đường bộ. Trên đảo thuê xe máy hoặc gọi xe công nghệ.", info: { mua_dep: "Tháng 11–4 (mùa khô, biển êm phía tây); tháng 5–10 mưa, nên tắm biển phía đông (Bãi Sao, Bãi Khem)" } }
    ]
  },
  "lam-dong": {
    places: [
      { id: "bs-tong-quan-mui-ne", name: "Mũi Né (tổng quan)", address: "Phường Mũi Né, Bình Thuận cũ nay thuộc Lâm Đồng", cluster: "mui-ne", lat: 10.9460, lng: 108.2870, approx: true, price: "Tùy điểm; xem Đồi cát, Suối Tiên, Làng chài, Bãi biển Mũi Né", hours: "Cả năm", duration: "2–3 ngày", suitable: "Nghỉ biển, chụp ảnh đồi cát, lướt ván diều", note: "Từ TP.HCM ô tô ~3–4 giờ qua cao tốc hoặc tàu SE đến ga Phan Thiết (~4 giờ) rồi taxi ~20 km (ước tính, chưa kiểm). Từ Đà Lạt ~3,5 giờ.", info: { mua_dep: "Tháng 11–4 (khô, gió mạnh hợp lướt ván diều); tháng 5–10 mưa rào ngắn" } }
    ]
  }
};
/* Đợt rà 23/11/2026: điểm nổi tiếng người dùng hay gõ mà app chưa có. Tọa độ gần đúng, giá và giờ CHƯA KIỂM. */
var BO_SUNG_THEM_2 = {
  "lao-cai": [
    { id: "bs-y-ty", name: "Y Tý (Bát Xát)", address: "Xã Y Tý, huyện Bát Xát cũ, Lào Cai", old_prov: "Lào Cai", lat: 22.632, lng: 103.628, approx: true, price: "Miễn phí (ước tính, chưa kiểm)", hours: "Cả ngày; săn mây sáng sớm", duration: "1–2 ngày", suitable: "Săn mây, ruộng bậc thang, bản người Hà Nhì", note: "Đường từ TP Lào Cai lên Y Tý dài và nhiều đèo dốc; đi ban ngày, tránh mưa lớn. Mùa lúa chín khoảng tháng 9, săn mây đẹp mùa khô (tháng 10–4). Thông tin chưa kiểm, xem tin đường sá trước khi đi." }
  ],
  "tuyen-quang": [
    { id: "bs-hoang-su-phi", name: "Ruộng bậc thang Hoàng Su Phì", address: "Huyện Hoàng Su Phì cũ, Hà Giang cũ, nay thuộc Tuyên Quang", old_prov: "Hà Giang", lat: 22.745, lng: 104.678, approx: true, price: "Miễn phí (ước tính, chưa kiểm)", hours: "Ban ngày", duration: "1 ngày", suitable: "Ngắm ruộng bậc thang, chụp ảnh, bản người Dao, Nùng", note: "Lúa nước đổ nước khoảng tháng 5–6, lúa chín khoảng tháng 9–10. Cách TP Hà Giang vài giờ xe đường núi; đi ban ngày. Thông tin chưa kiểm." }
  ],
  "son-la": [
    { id: "bs-ta-xua", name: "Tà Xùa (Bắc Yên)", address: "Xã Tà Xùa, huyện Bắc Yên cũ, Sơn La", lat: 21.318, lng: 104.483, approx: true, price: "Miễn phí (ước tính, chưa kiểm)", hours: "Săn mây sáng sớm", duration: "1–2 ngày", suitable: "Săn mây, trekking sống lưng khủng long, đồi chè Shan tuyết", note: "Mây đẹp mùa khô khoảng tháng 10–4. Đường lên dốc, hẹp; xe máy cần phanh tốt, không đi khi mưa to. Trekking sống lưng khủng long nên thuê người dẫn đường địa phương. Thông tin chưa kiểm." }
  ],
  "lam-dong": [
    { id: "bs-doi-che-tam-chau", name: "Đồi chè Tâm Châu (Bảo Lộc)", address: "Bảo Lộc, Lâm Đồng", lat: 11.548, lng: 107.830, approx: true, price: "Miễn phí vào đồi chè; đồ uống tính riêng (ước tính, chưa kiểm)", hours: "Ban ngày", duration: "1–2 giờ", suitable: "Chụp ảnh đồi chè, uống trà, nghỉ chân trên đường SG – Đà Lạt", note: "Điểm dừng quen thuộc trên quốc lộ 20 giữa TP.HCM và Đà Lạt. Thông tin chưa kiểm." },
    { id: "bs-thac-dambri", name: "Thác Dambri (Bảo Lộc)", address: "Xã Đạm Bri, ngoại ô Bảo Lộc, Lâm Đồng", lat: 11.622, lng: 107.733, approx: true, price: "Có vé vào cổng", hours: "Ban ngày", duration: "2–3 giờ", suitable: "Ngắm thác, chụp ảnh, gia đình", note: "Thác lớn gần Bảo Lộc, nhiều nước nhất mùa mưa (tháng 5–10). Đá trơn, không leo ra mép thác. Giá vé chưa kiểm." }
  ],
  "an-giang": [
    { id: "bs-nam-du", name: "Quần đảo Nam Du", address: "Đặc khu Kiên Hải cũ, Kiên Giang cũ, nay thuộc An Giang", old_prov: "Kiên Giang", lat: 9.680, lng: 104.355, approx: true, price: "Tàu cao tốc từ Rạch Giá", hours: "Tàu chạy ban ngày, đặt trước", duration: "2–3 ngày", suitable: "Biển hoang sơ, đi thuyền quanh đảo, lặn ngắm", note: "Đi tàu cao tốc từ Rạch Giá khoảng vài giờ. Biển êm khoảng tháng 11–4; mùa gió tây nam (tháng 5–10) tàu có thể hủy. Đặt tàu và homestay trước. Thông tin chưa kiểm." },
    { id: "bs-hon-son", name: "Hòn Sơn (Lại Sơn)", address: "Xã Lại Sơn, Kiên Hải cũ, Kiên Giang cũ, nay thuộc An Giang", old_prov: "Kiên Giang", lat: 9.803, lng: 104.630, approx: true, price: "Tàu cao tốc từ Rạch Giá", hours: "Tàu chạy ban ngày, đặt trước", duration: "1–2 ngày", suitable: "Biển, leo núi Ma Thiên Lãnh, ăn hải sản", note: "Gần Rạch Giá hơn Nam Du. Biển êm khoảng tháng 11–4. Thông tin chưa kiểm." }
  ],
  "gia-lai": [
    { id: "bs-chua-ong-nui", name: "Chùa Ông Núi (Linh Phong Thiền Tự)", address: "Núi Bà, xã Cát Tiến, Phù Cát, Bình Định cũ (cách Quy Nhơn khoảng 30–40 km về phía bắc), nay thuộc Gia Lai", old_prov: "Bình Định", lat: 13.912, lng: 109.205, approx: true, price: "Vào chùa miễn phí; gửi xe có thu phí (chưa kiểm được mức)", hours: "Ban ngày (chưa kiểm được giờ chính xác)", duration: "1,5–2 giờ (leo bậc đá lên chùa và tượng Phật)", suitable: "Tâm linh, ngắm biển từ trên núi, người còn sức leo bậc", note: "Có tượng Phật ngồi lớn nhìn ra biển Cát Tiến. Leo nhiều bậc đá, mang giày bám và nước. Không nhầm với Chùa Ông (Quảng Triệu Hội Quán) ở Cần Thơ. Tọa độ xấp xỉ, thông tin chưa kiểm." },
    { id: "bs-suoi-nong-hoi-van", name: "Suối nước nóng Hội Vân", address: "Xã Cát Hiệp, Phù Cát, Bình Định cũ (cách Quy Nhơn khoảng 40 km), nay thuộc Gia Lai", old_prov: "Bình Định", lat: 14.010, lng: 109.040, approx: true, price: "Chưa có giá tắm khoáng", hours: "Chưa kiểm được", duration: "1–2 giờ", suitable: "Tắm khoáng nóng, nghỉ ngơi", note: "Không nhầm với Đầm Vân Hội (Hoài Nhơn, Bình Định cũ). Tọa độ xấp xỉ, thông tin chưa kiểm." }
  ],
  "khanh-hoa": [
    { id: "bs-dao-binh-ba", name: "Đảo Bình Ba (Cam Ranh)", address: "Xã Cam Bình, vịnh Cam Ranh, Khánh Hòa", lat: 11.840, lng: 109.232, approx: true, banned: true, price: "Không đón khách du lịch (theo phản ánh 23/11/2026, app chưa kiểm được văn bản)", hours: "Không áp dụng", duration: "Không gợi ý", suitable: "Không gợi ý đi du lịch", note: "Theo phản ánh ngày 23/11/2026, đảo Bình Ba và Bình Hưng không đón khách du lịch từ 06/2026. App chưa kiểm được văn bản của địa phương, không gợi ý tour và không đưa điểm này vào lịch trình. Muốn đi, hỏi chính quyền địa phương hoặc đồn biên phòng trước." }
  ]
};
(function () {
  for (var pid in BO_SUNG_THEM_2) {
    var dst = BO_SUNG_THEM[pid] || (BO_SUNG_THEM[pid] = {});
    dst.places = (dst.places || []).concat(BO_SUNG_THEM_2[pid]);
  }
})();
(function () {
  for (var pid in BO_SUNG_THEM) {
    var src = BO_SUNG_THEM[pid], dst = BO_SUNG[pid] || (BO_SUNG[pid] = {});
    if (src.patch) { dst.patch = dst.patch || {}; for (var i in src.patch) dst.patch[i] = src.patch[i]; }
    ["places", "stays", "dishes"].forEach(function (f) { if (src[f]) dst[f] = (dst[f] || []).concat(src[f]); });
  }
})();
(function () {
  if (typeof PROV_DATA === "undefined") return;
  function hav(a, b, c, d) { var R = 6371, p = Math.PI / 180, x = Math.sin((c - a) * p / 2), y = Math.sin((d - b) * p / 2); return 2 * R * Math.asin(Math.sqrt(x * x + Math.cos(a * p) * Math.cos(c * p) * y * y)); }
  if (typeof RACEHUB_CLUSTERS !== "undefined") for (var k in BO_SUNG_CUM) if (!RACEHUB_CLUSTERS[k]) RACEHUB_CLUSTERS[k] = BO_SUNG_CUM[k];
  PROV_DATA.forEach(function (p) {
    var b = BO_SUNG[p.id]; if (!b) return;
    if (b.patch) p.places.forEach(function (x) { var e = b.patch[x.id]; if (!e) return; for (var k in e) x[k] = e[k]; x.checked = BO_SUNG_CHECKED; });
    var have = {}; p.places.forEach(function (x) { have[x.id] = 1; });
    (b.places || []).forEach(function (x) {
      if (have[x.id]) return;
      x.checked = BO_SUNG_CHECKED;
      if (p.lat != null && x.lat != null) x.dist = Math.round(hav(p.lat, p.lng, x.lat, x.lng));
      p.places.push(x);
    });
    (b.stays || []).forEach(function (x) { x.status_text = x.status_text || "Chưa kiểm chứng / chưa đối tác / chưa thu phí"; x.areaLabel = x.areaLabel || BO_SUNG_CUM[x.area] || ""; p.stays.push(x); });
    (b.dishes || []).forEach(function (x) { p.dishes.push(x); });
    if (b.routes && p.routes) { p.routes.near = b.routes.concat(p.routes.near || []); }
  });
})();
