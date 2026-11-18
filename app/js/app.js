/* Code app Cẩm nang du lịch — tách từ bản xuất 1 file (artifact cam-nang-du-lich-app, v24).
   Dữ liệu 34 tỉnh nằm ở ../data/prov-data.js (nạp trước file này). Ảnh ở ../assets/images/. */

/* ================= DỮ LIỆU — theo schema mục 5, nguồn: du-lieu-cam-nang-da-lat (kiểm 05–06/11/2026) ================= */
var CHECKED = "05–06/11/2026";
var DESTINATIONS = (typeof PROV_DATA!=="undefined"?PROV_DATA:[]).map(function(p){
  return {id:p.appId, provId:p.id, name:(p.appId==="dalat"?"Đà Lạt":p.name), province:p.province, region:p.region, type:p.types, overview:p.overview, best_season:p.best_season, suggested_days:p.suggested_days, lat:p.lat, lng:p.lng, status:p.status, anchor:p.anchor, checked:p.checked};
});
(function(){ for(var i=0;i<DESTINATIONS.length;i++){ if(DESTINATIONS[i].id==="dalat"){ DESTINATIONS[i].img="assets/images/mac-dinh.jpg"; if(!DESTINATIONS[i].overview) DESTINATIONS[i].overview="Cao nguyên mát quanh năm, ở trung tâm quanh Hồ Xuân Hương rồi chia ngày theo 3 cụm Bắc – Nam – trung tâm."; } } })();
var PLACE_IMG = {
  "ho-xuan-huong":"assets/images/hero-da-lat.jpg","quang-truong-lam-vien":"assets/images/quang-truong-lam-vien.jpg","cho-da-lat":"assets/images/cho-da-lat.jpg",
  "ho-tuyen-lam":"assets/images/ho-tuyen-lam.jpg","thien-vien-truc-lam":"assets/images/thien-vien-truc-lam.jpg","doi-che-cau-dat":"assets/images/doi-che-cau-dat.jpg",
  "default":"assets/images/mac-dinh.jpg"
};
var PLACES = [
  {id:"ho-xuan-huong",name:"Hồ Xuân Hương",cluster:"trung-tam",address:"Trung tâm TP. Đà Lạt, giáp Trần Quốc Toản, Nguyễn Thái Học, Bà Huyện Thanh Quan",lat:11.94187,lng:108.44666,dist:0,price:"Miễn phí; đạp vịt 60.000–120.000đ/giờ; xe ngựa ~200.000đ/chuyến 4–6 người",priceSnap:0,hours:"24/7 (không gian công cộng)",duration:"1–2 giờ; đẹp nhất 5h–8h và hoàng hôn",suitable:"Mọi đối tượng, cặp đôi, gia đình, người lớn tuổi",note:"Sáng sớm/chiều tối gió mạnh, trời lạnh — mang áo khoác; hỏi giá đạp vịt/xe ngựa trước.",source:"onelife.vn, vietnamonline.com, saigonstartravel.com"},
  {id:"quang-truong-lam-vien",name:"Quảng trường Lâm Viên",cluster:"trung-tam",address:"Đường Trần Quốc Toản, bờ Hồ Xuân Hương",lat:11.93947,lng:108.44516,dist:0,price:"Miễn phí; Doha Cafe trong nụ atiso 45.000–90.000đ",priceSnap:0,hours:"Chưa kiểm được giờ chính thức thống nhất (các nguồn ghi 24/7 / 7:00–22:00 / 5:00–22:00); Doha Cafe ~6:30–22:30",duration:"30–45 phút; đẹp nhất 5h–7h hoặc 16h–18h",suitable:"Giới trẻ check-in, gia đình có trẻ nhỏ",note:"Tránh 11h–14h nắng gắt, gió ven hồ mạnh; tối đông, giữ tư trang.",source:"blog.vexere.com, namthientravel.com.vn, tourdalattravel.com"},
  {id:"cho-da-lat",name:"Chợ Đà Lạt / chợ đêm",cluster:"trung-tam",address:"Đường Nguyễn Thị Minh Khai, khu Hòa Bình, phường Xuân Hương",lat:11.94299,lng:108.43693,dist:1,price:"Miễn phí vào chợ; bánh tráng nướng 15.000–35.000đ/chiếc; ăn vặt 15.000–30.000đ/món",priceSnap:20000,hours:"Chợ ngày ~6:00–17:00/18:00; chợ đêm ~18:00–23:00 (giờ đóng chưa kiểm được chính xác)",duration:"Chợ ngày 1 giờ; chợ đêm 60–120 phút",suitable:"Mọi đối tượng, người thích ẩm thực đường phố",note:"Hầu hết quầy chỉ nhận tiền mặt, mang tiền lẻ; hỏi giá trước khi gọi món/mua đồ.",source:"hoadalattravel.vn, namthientravel.com.vn"},
  {id:"ga-da-lat",name:"Ga Đà Lạt",cluster:"trung-tam",address:"Số 1 Quang Trung, phường Xuân Hương",lat:11.94178,lng:108.45375,dist:2,price:"Tham quan 50.000đ/người lớn; tàu Đà Lạt–Trại Mát khứ hồi 100.000–170.000đ/người lớn",priceSnap:50000,hours:"Chưa kiểm được giờ đóng chính xác (6:00–17:00 / 7:00–18:00 / 7:00–19:00 / 7:30–17:00). Tàu: 7:45, 9:50, 11:55, 14:00, 16:05 (+ tàu đêm)",duration:"1–1,5 giờ; 2–2,5 giờ nếu đi tàu khứ hồi",suitable:"Người yêu kiến trúc/hoài cổ, gia đình có trẻ nhỏ",note:"Vé tàu hợp lệ được miễn vé tham quan riêng; gọi hỏi ga trước vì lịch tàu đổi theo mùa.",source:"hoadalattravel.vn, namthientravel.com.vn, agotourist.com"},
  {id:"nha-tho-domaine",name:"Nhà thờ Domaine de Marie",cluster:"trung-tam",address:"Số 1 Ngô Quyền, phường Cam Ly, trên đồi Mai Anh",lat:11.94848,lng:108.43017,dist:2,price:"Miễn phí",priceSnap:0,hours:"Tham quan tự do, khung tham khảo 7:00–17:00; giờ lễ ngày thường 17:00, Chủ nhật 5:45, 8:00 & 16:30",duration:"30–60 phút; đẹp nhất 7:00–10:00 hoặc 14:00–16:00",suitable:"Người yêu kiến trúc/lịch sử, cặp đôi chụp ảnh",note:"Nhà thờ + tu viện đang hoạt động — tránh giờ lễ, ăn mặc lịch sự, giữ yên lặng.",source:"hoadalattravel.vn, tatravel.vn, agotourist.com"},
  {id:"thung-lung-tinh-yeu",name:"Thung lũng Tình Yêu",cluster:"phia-bac",address:"Số 3–5–7 Mai Anh Đào, phường Lâm Viên, quanh hồ Đa Thiện",lat:11.97746,lng:108.44978,dist:6,price:"Người lớn 225.000–250.000đ; trẻ em 1–1,39 m và người trên 60 tuổi 125.000đ; dưới 1 m miễn phí",priceSnap:250000,hours:"Khoảng 7:00–17:30 (chưa kiểm được giờ đóng chính xác)",duration:"Nửa ngày (3–4 giờ); đẹp nhất 8h–10h hoặc 15h–17h",suitable:"Cặp đôi, gia đình, nhóm bạn",note:"Vé gồm xe điện, đạp vịt, cồng chiêng, game 9D — một số trò thu thêm, hỏi rõ ở quầy; khu rất rộng, mang giày bệt.",source:"vinpearl.com, travelbui.com, agotourist.com"},
  {id:"nui-langbiang",name:"Núi Langbiang",cluster:"phia-bac",address:"305 Langbiang, thị trấn Lạc Dương. Đỉnh Núi Bà 2.167 m; đồi Radar 1.929–1.950 m",lat:12.01964,lng:108.42435,dist:12,price:"Vé cổng người lớn 50.000đ, trẻ em 25.000đ. Xe jeep lên Radar khứ hồi 100.000–120.000đ/người (chưa kiểm được giá chính thức — có nguồn ghi ~200.000đ)",priceSnap:170000,hours:"7:00–17:00 (đa số nguồn; chưa kiểm được chính xác)",duration:"2–3 giờ; nửa ngày nếu leo bộ",suitable:"Người thích ngắm toàn cảnh/săn mây, nhóm bạn",note:"Jeep chỉ lên đồi Radar, KHÔNG lên đỉnh Núi Bà (leo bộ 3–4 giờ); jeep xuất phát khi đủ 5–6 khách nên có thể phải chờ.",source:"hoadalattravel.vn, namthientravel.com.vn, agotourist.com"},
  {id:"lang-cu-lan",name:"Làng Cù Lần",cluster:"phia-bac",address:"Thôn Suối Cạn, phường Lang Biang, dưới chân núi Langbiang, ĐT722",lat:12.02588,lng:108.3637,dist:22,price:"Chưa kiểm được mức hiện hành — các nguồn ghi 100.000đ / 150.000đ / 200.000đ. Khoảng: 100.000–200.000đ/người lớn",priceSnap:150000,hours:"Khoảng 7:00–17:30 (chưa kiểm được chính xác)",duration:"2–4 giờ (nên dành nửa ngày tính cả di chuyển)",suitable:"Gia đình, nhóm bạn, đoàn team-building",note:"Đường Ankroet quanh co, dốc — gọi hotline KDL 0914 914 400 xác nhận giá trước ngày đi.",source:"lamdongtours.com, hoadalattravel.vn, newlifetravel.vn"},
  {id:"doi-che-cau-dat",name:"Đồi chè Cầu Đất",cluster:"phia-bac",address:"Thôn Cầu Đất, phường Xuân Trường, phía đông nam Đà Lạt, cao ~1.650 m",lat:11.88348,lng:108.55226,dist:24,price:"Chưa kiểm được mức hiện hành — mâu thuẫn: miễn phí hay 30.000đ. Khoảng: 0–30.000đ vé vào. Tour trà 90.000đ/người; tour săn mây trọn gói 250.000đ/người",priceSnap:0,hours:"7:30–17:00; săn mây 5:30–6:30 sáng (liên hệ trước để vào sớm)",duration:"1,5–2,5 giờ; đi trước 8:30 sáng hoặc sau 16:00",suitable:"Giới trẻ check-in/săn mây, cặp đôi, gia đình",note:"Nông trại đang hoạt động — không giẫm luống chè, không hái lá; đường xa, mang áo ấm.",source:"tatravel.vn, mia.vn, newlifetravel.vn"},
  {id:"ho-tuyen-lam",name:"Hồ Tuyền Lâm",cluster:"phia-nam",address:"Khu du lịch quốc gia Hồ Tuyền Lâm, phường Xuân Hương, phía nam Đà Lạt",lat:11.89937,lng:108.43714,dist:7,price:"Miễn phí vào khu hồ; kayak ~150.000–500.000đ; thuyền tham quan 300.000–500.000đ/chuyến; cắm trại từ 200.000đ/đêm",priceSnap:0,hours:"Khu hồ mở cả ngày/24h; kayak thường từ 8:30",duration:"1,5–2,5 giờ; đẹp nhất sáng sớm hoặc hoàng hôn",suitable:"Cặp đôi, gia đình, nhóm bạn",note:"Hồ rất rộng (vòng hồ ~20 km) — chọn 1 điểm dừng (bến thuyền dưới Thiền viện); đi kayak mặc áo phao.",source:"travelbui.com, mia.vn, saigonstartravel.com"},
  {id:"thien-vien-truc-lam",name:"Thiền viện Trúc Lâm",cluster:"phia-nam",address:"Đường Trúc Lâm Yên Tử, núi Phụng Hoàng, trên Hồ Tuyền Lâm. Cáp treo Đồi Robin dài ~2,2 km",lat:11.9036,lng:108.43674,dist:6,price:"Vào thiền viện miễn phí. Cáp treo chưa kiểm được mức hiện hành: khoảng 80.000–120.000đ/chiều; 100.000–150.000đ/khứ hồi",priceSnap:0,hours:"Chưa kiểm được — mâu thuẫn: 5:00–21:00 vs 7:00–17:00. Cáp treo 7:30–17:00 (ngày thường nghỉ trưa 11:30–13:00)",duration:"1–1,5 giờ; 2 giờ nếu đi cáp treo khứ hồi",suitable:"Mọi đối tượng; gia đình có người lớn tuổi",note:"Nơi tu hành — ăn mặc kín đáo, giữ yên lặng, không chụp ảnh ồn ào trong chánh điện.",source:"travelbui.com, hoadalattravel.vn, mia.vn"},
  {id:"thac-datanla",name:"Thác Datanla",cluster:"phia-nam",address:"Quốc lộ 20, đèo Prenn, phường Xuân Hương. Máng trượt Alpine Coaster số 1 ~1.200 m, số 3 ~2.400 m",lat:11.90417,lng:108.44954,dist:5,price:"Vé tham quan khoảng 50.000–80.000đ/người lớn (nguồn cũ 50.000đ vs 11/2026 80.000đ). Máng trượt số 1 khứ hồi 130.000đ; số 3 khứ hồi 250.000đ",priceSnap:65000,hours:"Khoảng 7:15–17:00; máng trượt nhận khách đến ~16:30",duration:"2–3 giờ; đi 7:30–8:00 hoặc 11:30–12:30 để tránh xếp hàng",suitable:"Gia đình, nhóm bạn, người thích mạo hiểm nhẹ",note:"Vé tham quan và vé trò chơi tính riêng; máng trượt số 1 và số 3 ở 2 ga khác nhau, dễ nhầm; đường xuống thác ~600 m, trơn khi mưa.",source:"hoadalattravel.vn, newlifetravel.vn, mapcarta.com"},
  {id:"thac-prenn",name:"Thác Prenn",cluster:"phia-nam",address:"Số 20 đường cao tốc Liên Khương – Prenn (QL20), chân đèo Prenn. Nay trong tổ hợp Tea Resort Prenn",lat:11.87652,lng:108.4701,dist:11,price:"Giá 2026: gói tham quan 110.000–288.000đ/người lớn tùy gói (giá cũ 30.000–50.000đ đã lỗi thời). Cần xác nhận lại trước ngày đi",priceSnap:200000,hours:"Khoảng 7:00–17:00",duration:"2–3 giờ; bắt đầu từ 7:30 sáng",suitable:"Gia đình, người lớn tuổi, đoàn riêng",note:"Ghép cùng cung đèo Prenn (Datanla, Tuyền Lâm, Thiền viện); chọn gói vé trước ở quầy vì nhiều gói/combo dễ nhầm.",source:"hoadalattravel.vn, mapcarta.com"}
];
var STAYS = [
  {id:"ngoc-phat",name:"Khách sạn Ngọc Phát",address:"10 Hồ Tùng Mậu, Phường Xuân Hương",area:"trung-tam",areaLabel:"Trung tâm, ven Hồ Xuân Hương",kind:"Khách sạn 3 sao",priceMin:800000,priceMax:1600000,price:"~800.000–1.600.000đ/đêm (Deluxe/Suite tới ~2.485.000đ)",dist:"Đối diện Quảng trường Lâm Viên, sát Hồ Xuân Hương; chợ đi bộ được",suitable:"Gia đình, cặp đôi muốn ở trung tâm, view hồ, có buffet sáng",source:"lamdongtours.com, dulichyenviet.com"},
  {id:"nice-dream",name:"Nice Dream Hotel",address:"1 Nguyễn Thị Minh Khai, Phường Xuân Hương",area:"trung-tam",areaLabel:"Trung tâm, ngay vòng xoay chợ đêm",kind:"Khách sạn 3 sao",priceMin:750000,priceMax:1200000,price:"~750.000–1.200.000đ/đêm (hạng cao hơn tới ~1.800.000–2.500.000đ)",dist:"Cách chợ đêm ~110 m; Hồ Xuân Hương đi bộ vài phút",suitable:"Khách thích đi chợ đêm, cặp đôi/nhóm bạn ở trung tâm",source:"newlifetravel.vn, vietgoing.com"},
  {id:"sandals-flora",name:"Sandals Flora Hotel",address:"37–40 Nguyễn Thị Minh Khai, Phường Xuân Hương",area:"trung-tam",areaLabel:"Trung tâm, trục Nguyễn Thị Minh Khai",kind:"Khách sạn 3 sao",priceMin:800000,priceMax:1600000,price:"~800.000–1.600.000đ/đêm",dist:"Cách Hồ Xuân Hương ~100 m, chợ đêm ~150 m",suitable:"Cặp đôi, khách muốn view chợ đêm, ở ngay trung tâm",source:"newlifetravel.vn, mytour.vn"},
  {id:"colline",name:"Hôtel Colline",address:"10 Phan Bội Châu, Phường Xuân Hương",area:"trung-tam",areaLabel:"Trung tâm, ngay trên chợ Đà Lạt",kind:"Khách sạn 4 sao",priceMin:1450000,priceMax:2200000,price:"~1.450.000–2.200.000đ/đêm (Suite tới ~3.870.000đ)",dist:"Cách Hồ Xuân Hương ~200 m, chợ ~300 m, Quảng trường Lâm Viên ~500 m",suitable:"Khách muốn tiện nghi 4 sao ngay trung tâm, cặp đôi/gia đình nhỏ",source:"dalattourism.vn, newlifetravel.vn"},
  {id:"muong-thanh",name:"Mường Thanh Holiday Đà Lạt",address:"42 Phan Bội Châu, Phường Xuân Hương",area:"trung-tam",areaLabel:"Trung tâm, đường Phan Bội Châu",kind:"Khách sạn 4 sao",priceMin:1250000,priceMax:1600000,price:"~1.250.000–1.600.000đ/đêm",dist:"Cách Hồ Xuân Hương 100 m, chợ đêm 600–750 m",suitable:"Gia đình, khách đoàn, khách muốn hồ bơi/spa trong trung tâm",source:"newlifetravel.vn, hoadalattravel.vn"},
  {id:"zen-valley",name:"Zen Valley Dalat",address:"38 Khe Sanh, Phường 10",area:"dong-da-khe-sanh",areaLabel:"Sườn đồi, đầu đèo Mimosa, view rừng thông",kind:"Khách sạn 3 sao",priceMin:800000,priceMax:1950000,price:"~800.000–1.950.000đ/đêm",dist:"Cách Hồ Xuân Hương ~2,24 km, Ga Đà Lạt ~1,44 km",suitable:"Cặp đôi/gia đình muốn yên tĩnh, view thông, nghỉ dưỡng bungalow/villa",source:"tadiha.com, traveloka.com"},
  {id:"new-life",name:"New Life Hotel",address:"6 Đống Đa, Phường 3",area:"dong-da-khe-sanh",areaLabel:"Triền đồi gần trung tâm, view thành phố",kind:"Khách sạn 3 sao",priceMin:550000,priceMax:1200000,price:"~550.000–1.200.000đ/đêm",dist:"Cách Quảng trường Lâm Viên ~2,7 km; chợ đi xe ~5 phút",suitable:"Khách tiết kiệm, cặp đôi/gia đình muốn yên tĩnh, view đồi",source:"newlifetravel.vn, vietgoing.com"},
  {id:"wonder",name:"Dalat Wonder Resort",address:"19 Hoa Hồng, Khu du lịch Hồ Tuyền Lâm, Phường 4",area:"ho-tuyen-lam",areaLabel:"Ven Hồ Tuyền Lâm, kiểu làng châu Âu",kind:"Resort 4 sao (có nguồn ghi 5 sao — mâu thuẫn, chưa chốt)",priceMin:1150000,priceMax:2000000,price:"~1.150.000–2.000.000đ/đêm (villa 5,6–16,5 triệuđ/đêm)",dist:"Cách Hồ Xuân Hương ~6,07 km; trung tâm đi xe ~20–30 phút",suitable:"Gia đình/nhóm bạn nghỉ dưỡng ven hồ, chụp ảnh",source:"didaudalat.com, bestprice.vn"},
  {id:"terracotta",name:"Terracotta Hotel & Resort Dalat",address:"Phân khu 7.9, Khu du lịch Hồ Tuyền Lâm, Phường 3",area:"ho-tuyen-lam",areaLabel:"Ven Hồ Tuyền Lâm, khuôn viên ~17 ha",kind:"Resort 4 sao (một số nguồn ghi 5 sao — mâu thuẫn, chưa chốt)",priceMin:1300000,priceMax:1950000,price:"~1.300.000–1.950.000đ/đêm (villa 3–5 phòng ngủ 11,35–17,35 triệuđ/đêm)",dist:"Cách trung tâm ~6 km; ngay bờ Hồ Tuyền Lâm",suitable:"Gia đình/đoàn, khách nghỉ dưỡng dài, hồ bơi/spa",source:"agotourist.com, hoadalattravel.vn"},
  {id:"thi-tran-co",name:"Homestay Thị Trấn Cổ",address:"31 Đặng Thái Thân, Đà Lạt",area:"trung-tam",areaLabel:"Đường Đặng Thái Thân, khu trung tâm",kind:"Homestay (không hạng sao)",priceMin:400000,priceMax:null,price:"Từ khoảng 400.000đ/đêm — chỉ 1 nguồn ghi mức này, chưa kiểm được khoảng trên",dist:"Chưa kiểm được khoảng cách chính xác tới Hồ Xuân Hương/chợ",suitable:"Khách bụi, cặp đôi tiết kiệm, muốn homestay sạch, view đẹp",source:"abay.vn"}
];
var DISHES = [
  {id:"banh-mi-xiu-mai",name:"Bánh mì xíu mại",meal:"sang",mealLabel:"Ăn sáng",price:"15.000–30.000đ/phần",priceSnap:20000,desc:"Chén xíu mại nóng chấm bánh mì — bữa sáng quen thuộc của người Đà Lạt.",restaurants:[{name:"Bánh mì xíu mại Hoàng Diệu (Bé Linh)",address:"26 và 37 Hoàng Diệu, Phường 5",price:"15.000–20.000đ, chỉ bán sáng 06:00–10:00"},{name:"Bánh mì xíu mại Cô Hồng",address:"72 Yersin, Phường 10",price:"15.000–20.000đ"}],source:"luhanhvietnam.com.vn, agotourist.com"},
  {id:"banh-can",name:"Bánh căn",meal:"sang",mealLabel:"Ăn sáng / ăn xế",price:"20.000–60.000đ/phần",priceSnap:40000,desc:"Bánh nướng đất nung, nhân trứng/tôm/mực/bò, chấm nước xíu mại.",restaurants:[{name:"Bánh căn Lệ",address:"27/44 Yersin, Phường 10",price:"30.000–60.000đ"},{name:"Bánh căn xíu mại Cây Bơ",address:"56 Tăng Bạt Hổ, Phường 1",price:"20.000–35.000đ"}],source:"travel.com.vn, agotourist.com"},
  {id:"banh-uot-long-ga",name:"Bánh ướt lòng gà",meal:"trua",mealLabel:"Ăn trưa / ăn xế / ăn tối",price:"30.000–60.000đ/phần",priceSnap:45000,desc:"Bánh ướt mềm ăn cùng lòng gà và thịt gà xé, nước chấm chua ngọt.",restaurants:[{name:"Bánh ướt lòng gà Trang",address:"15F Tăng Bạt Hổ, Phường 1 (CN2: 3B Mai Trang Sơn, Phường 5)",price:"30.000–60.000đ, cách chợ ~400 m"},{name:"Bánh ướt lòng gà Long",address:"Hẻm 202 Phan Đình Phùng / 68 Trần Phú (2 nguồn ghi khác nhau)",price:"~25.000–50.000đ"}],source:"bachhoaxanh.com, caonguyentourist.com"},
  {id:"lau-ga-la-e",name:"Lẩu gà lá é",meal:"toi",mealLabel:"Ăn trưa / ăn tối (món nhóm)",price:"200.000–400.000đ/nồi (2–4 người)",priceSnap:300000,desc:"Lẩu gà ta nấu lá é thơm cay nhẹ — món nhóm đông người ăn tối ở Đà Lạt.",restaurants:[{name:"Lẩu gà lá é Tao Ngộ",address:"5 Ba Tháng Tư (đường 3/4), Phường 3 — có nhiều quán cùng tên, ghi rõ cơ sở này",price:"Nồi 2 người 250.000đ, 3 người 300.000đ, 4 người 350.000đ"},{name:"Lẩu gà lá é 668",address:"2B Chu Văn An, Phường 3",price:"200.000–300.000đ/nồi"}],source:"agotourist.com, hoadalattravel.vn"},
  {id:"banh-trang-nuong",name:"Bánh tráng nướng",meal:"toi",mealLabel:"Ăn tối / ăn vặt chợ đêm",price:"15.000–25.000đ/cái (nhiều topping tới ~40.000đ)",priceSnap:20000,desc:"“Pizza Đà Lạt” nướng than ở chợ đêm — trứng, hành, xúc xích, phô mai.",restaurants:[{name:"Chợ đêm Đà Lạt",address:"Đường Nguyễn Thị Minh Khai, Phường Xuân Hương",price:"15.000–25.000đ/cái, 17:00–23:00"},{name:"Bánh tráng nướng Dì Đinh",address:"26 Hoàng Diệu, Phường 5",price:"~20.000–40.000đ/cái, 15:30–18:30"}],source:"hoadalattravel.vn, vinpearl.com"},
  {id:"nem-nuong",name:"Nem nướng",meal:"trua",mealLabel:"Ăn trưa / ăn tối",price:"30.000–60.000đ/phần",priceSnap:45000,desc:"Nem nướng cuốn bánh tráng, rau sống, chấm tương đậu phộng nóng.",restaurants:[{name:"Nem nướng Bà Hùng",address:"328 Phan Đình Phùng, Phường 2 (CN: 52 Hoàng Văn Thụ; 3 Trần Hưng Đạo)",price:"30.000–60.000đ, 09:30–21:00"},{name:"Nem nướng Bà Nghĩa",address:"4 Bùi Thị Xuân",price:"~40.000–45.000đ/phần"}],source:"agotourist.com, cuongdulich.com"},
  {id:"ga-nuong-com-lam",name:"Gà nướng cơm lam",meal:"trua",mealLabel:"Ăn trưa / ăn tối (món nhóm)",price:"~230.000–400.000đ cho 1 con gà + cơm lam, nhóm 2–4 người",priceSnap:300000,desc:"Gà đồi nướng ống tre ăn cùng cơm lam — hợp bữa trưa trên đường đi Langbiang/Cầu Đất.",restaurants:[{name:"Gà nướng ôm xôi Tư Béo",address:"321 Hai Bà Trưng",price:"Gà ~230.000đ/con (1,2–1,4 kg)"},{name:"Cơm lam gà nướng Khương Duy",address:"QL722, ngã ba Mangline, Phường 7",price:"Món 35.000–200.000đ"}],source:"mia.vn, caonguyentourist.com"},
  {id:"bun-bo-ap-anh-sang",name:"Bún bò ấp Ánh Sáng",meal:"sang",mealLabel:"Ăn sáng / ăn trưa",price:"30.000–50.000đ/tô",priceSnap:40000,desc:"Khu ấp Ánh Sáng ven hồ nổi tiếng với hàng bún bò lâu năm.",restaurants:[{name:"Bún bò ấp Ánh Sáng — Quán Út Phi",address:"10 ấp Ánh Sáng, Phường 1",price:"~35.000–50.000đ/tô"},{name:"Bún bò Huế – Mì Quảng Út Vân",address:"36/36A ấp Ánh Sáng, Phường 1",price:"30.000–40.000đ/tô, 06:00–20:00"}],source:"saigonstartravel.com, agotourist.com"},
  {id:"banh-canh",name:"Bánh canh",meal:"sang",mealLabel:"Ăn sáng / ăn trưa / ăn tối",price:"25.000–50.000đ/tô",priceSnap:35000,desc:"Bánh canh chả cá / giò heo, nước dùng trong — dễ ăn mọi buổi.",restaurants:[{name:"Bánh canh Xuân An",address:"15A Nhà Chung, Phường 3",price:"30.000–44.000đ/tô, 07:00–21:30, hơn 30 năm"},{name:"Bánh canh Phan Rang",address:"Đường Trần Phú hoặc Hai Bà Trưng (chưa kiểm được số nhà cụ thể)",price:"Chưa kiểm được giá riêng"}],source:"zalopay.vn, agotourist.com"},
  {id:"sua-dau-nanh",name:"Sữa đậu nành nóng / dâu tây",meal:"toi",mealLabel:"Ăn tối (chợ đêm)",price:"Sữa đậu nành 7.000–15.000đ/ly; dâu tây lắc 15.000–20.000đ/hũ; kem dâu 20.000đ/ly",priceSnap:12000,desc:"Ly sữa đậu nành nóng ở chợ đêm lạnh — món kết ngày quen thuộc.",restaurants:[{name:"Sữa đậu nành Hoa Sữa",address:"Tăng Bạt Hổ, Phường 1 — số nhà mâu thuẫn (64 / 50 / 3F), cần kiểm lại",price:"16:00–22:00, cách chợ đêm ~50 m"},{name:"Dâu tây lắc",address:"276 Phan Đình Phùng",price:"15.000–20.000đ/hũ (nguồn cũ)"}],source:"vinwonders.com, namthientravel.com.vn, riviu.vn"}
];
var ROUTES_SG = [
  {mode:"Xe khách / giường nằm",time:"6–8 tiếng; phần lớn chạy đêm, sáng tới nơi",price:"Giường nằm từ ~180.000đ; Phương Trang ~290.000–300.000đ/vé; Thành Bưởi 325.000–500.000đ/vé",note:"Phương Trang hotline 1900 6067. Số chuyến/ngày các nguồn mâu thuẫn — không chốt con số.",source:"motogo.vn, vexere.com, hoadalattravel.vn"},
  {mode:"Limousine",time:"6–8 tiếng",price:"~250.000–500.000đ/vé (phòng đôi VIP tới ~650.000–750.000đ); trung bình Vexere 11/2026 ~324.500–344.500đ/vé",note:"Đón/trả nhiều điểm trong thành phố hơn xe khách thường.",source:"hoadalattravel.vn, vexere.com"},
  {mode:"Máy bay SGN–DLI",time:"Bay ~50–55 phút",price:"Một chiều đã gồm thuế phí ~700.000–1.800.000đ (Vietjet ~717.000đ, Vietnam Airlines ~991.000đ)",note:"Vietnam Airlines, Vietjet, Pacific, Bamboo, Vietravel Airlines; chuyến sớm nhất ~06:10, muộn nhất ~19:50.",source:"bestprice.vn, traveloka.com, vexere.com"},
  {mode:"Xe máy / ô tô riêng (QL20)",time:"Ô tô 6–7 tiếng; xe máy 7–10 tiếng",price:"Chưa kiểm được giá thuê theo tuyến",note:"TP.HCM → cao tốc Long Thành – Dầu Giây → QL20 → đèo Bảo Lộc → đèo Prenn (~310–320 km). Xe máy xuất phát 4–5h sáng, KHÔNG đi cao tốc, tránh đèo ban đêm/ngày mưa.",source:"buulong.com.vn, lamdongtours.com"}
];
var ROUTES_HN = [
  {mode:"Máy bay HAN–DLI (khuyên dùng)",time:"Bay thẳng 1h50; ~8–12 chuyến/ngày",price:"Một chiều đã gồm thuế phí ~1.400.000–2.650.000đ/chiều",note:"Vé máy bay là hạng mục lớn nhất khi đi từ Hà Nội.",source:"traveloka.com, vietnambooking.com, bestprice.vn"},
  {mode:"Xe khách",time:"~20h30 đến 32 giờ, thường gặp nhất 30–32 giờ",price:"~700.000–950.000đ/vé",note:"Chỉ phù hợp người có sức khỏe tốt và dư thời gian; đa số nguồn khuyên bay.",source:"hoadalattravel.vn, agotourist.com, sigo.vn"},
  {mode:"Tàu tới Nha Trang rồi xe lên Đà Lạt",time:"Tàu HN–Nha Trang ~24–27 giờ + xe 3–4 giờ. Tổng ~28–35 giờ",price:"Tổng ~1.200.000–2.600.000đ/người (chưa tính ăn dọc đường)",note:"Không có tàu thẳng HN–Đà Lạt. Thay thế: xuống ga Tháp Chàm rồi xe lên Đà Lạt chỉ ~80 km, ~2–2,5 giờ.",source:"duongsatvietnam.vn, vetau247.vn, crystalbay.com"}
];
var ROUTES_AIRPORT = [
  {mode:"Taxi",time:"~40–50 phút",price:"Gói đặt trước (Lado) ~155.000–190.000đ; gói chung ~200.000–280.000đ/chuyến; đồng hồ ~250.000–500.000đ/lượt; Grab/Be ~250.000–380.000đ",note:"Hãng: Lado, Mai Linh, Thắng Lợi, Quốc Tế, Xanh SM. Hỏi rõ giá trọn gói trước khi lên xe.",source:"saigonlocals.com, vietnambooking.com, latour.vn"},
  {mode:"Xe buýt sân bay",time:"~45–60 phút; chạy theo giờ hạ cánh, khoảng 6h00–18h00",price:"~30.000–50.000đ/lượt (phổ biến 40.000–50.000đ; FUTA 50.000đ)",note:"Điểm trả: đường Lê Thị Hồng Gấm (cạnh chợ Đà Lạt) hoặc số 2 Lê Quý Đôn.",source:"vietnambooking.com, saigonlocals.com, vietnamairlines.com"},
  {mode:"Xe đưa đón khách sạn",time:"Theo lịch khách sạn",price:"Không có mức chung — hỏi lễ tân khi đặt phòng. Ví dụ: Dalat Edensee 480.000đ/chiều; La Da Lat 520.000đ/chiều; xe riêng đặt trước ~300.000–450.000đ",note:"Một số resort có shuttle bus miễn phí vào trung tâm.",source:"vietnamairlines.com, saigonlocals.com"}
];
var LOCAL = [
  {mode:"Thuê xe máy — xe số",price:"~80.000–130.000đ/ngày",req:"CCCD (hoặc hộ chiếu) + bằng lái A1; nên nộp bản photo CCCD, giữ bản gốc",note:"Thuê theo chu kỳ 24 giờ; lễ Tết tăng 30–50%; nhiều cửa hàng giao xe tận khách sạn miễn phí.",source:"vexere.com, agotourist.com, didaudalat.com"},
  {mode:"Thuê xe máy — tay ga phổ thông",price:"~120.000–150.000đ/ngày",req:"CCCD + bằng lái A1",note:"Xe số leo dốc tốt hơn và rẻ hơn xe ga ~30.000–50.000đ/ngày.",source:"vexere.com, agotourist.com"},
  {mode:"Thuê xe máy — tay ga 150cc / côn tay",price:"~150.000–200.000đ/ngày",req:"CCCD + bằng lái A1/A2 tùy xe",note:"Tiền cọc: nhiều nơi không yêu cầu cọc tiền mặt; một số nơi ~500.000–1.000.000đ tùy xe.",source:"vexere.com, agotourist.com, wikidulich.com"},
  {mode:"Taxi nội thành",price:"~11.500–13.500đ/km (dưới 20 km); 3 ngày 2 đêm bằng taxi ước tính ~300.000–600.000đ",req:"—",note:"Hãng: Mai Linh, Thắng Lợi, Lado, Xanh SM; có Grab/Be.",source:"soctrangtourism.vn, latour.vn"},
  {mode:"Xe đạp / đi bộ quanh Hồ Xuân Hương",price:"Thuê xe đạp đơn/đôi ~20.000–50.000đ/giờ",req:"Mang CCCD/CMND khi thuê",note:"Hồ chu vi hơn 5 km, đường ven hồ lát phẳng; đi bộ sáng sớm hoặc chiều hoàng hôn.",source:"123tadi.com, ivivu.com, mytour.vn"},
  {mode:"Thuê ô tô tự lái theo ngày",price:"Xe 4 chỗ ~500.000–950.000đ/ngày; xe 7 chỗ ~700.000–1.500.000đ/ngày. Lễ Tết tăng 50–80%",req:"Bằng lái B2 trở lên; tiền cọc thường 10.000.000–30.000.000đ tùy xe",note:"Hợp nhóm gia đình đi cụm Bắc/Nam xa trung tâm.",source:"agotourist.com, sigo.vn"},
  {mode:"Thuê ô tô có tài xế theo ngày",price:"Xe 4 chỗ ~700.000–900.000đ/ngày, xe 7 chỗ ~800.000–1.200.000đ/ngày. Quá giờ ~80.000–100.000đ/giờ",req:"—",note:"Không phải lo đường đèo và chỗ đỗ xe.",source:"agotourist.com, taxininhthuan.vn"},
  {mode:"Thuê xe máy điện theo ngày",price:"Chưa kiểm được mức giá riêng trong đợt tra này",req:"—",note:"Xe điện du lịch 4 bánh chở khách đã tạm ngừng từ đầu năm 2025 (Nghị định 165/2024/NĐ-CP) — không giới thiệu như dịch vụ đang chạy.",source:"datxeviet.vn"}
];
var COST_ROWS = [
  ["Xe SG–Đà Lạt khứ hồi (giường nằm)","300.000–900.000đ"],
  ["Ở 2 đêm (chia đôi phòng 3 sao)","600.000–1.200.000đ"],
  ["Ăn 3 ngày (sáng 20k + trưa/tối 50–150k/bữa)","450.000–900.000đ"],
  ["Vé tham quan (Langbiang, Thung lũng, thác…)","150.000–400.000đ"],
  ["Thuê xe máy 2–3 ngày","200.000–450.000đ"],
  ["Taxi sân bay / phát sinh","100.000–300.000đ"]
];
/* Lịch trình mẫu — ItineraryTemplate, chỉ trỏ tới Place/Dish đã có */
var ITINS = {
  "2N1D":{label:"2 ngày 1 đêm",title:"Đà Lạt gọn — trung tâm + 1 cụm",days:[
    [{s:"Sáng",t:"Hồ Xuân Hương + Quảng trường Lâm Viên",refs:["ho-xuan-huong","quang-truong-lam-vien"]},{s:"Chiều",t:"Ga Đà Lạt + Nhà thờ Domaine de Marie",refs:["ga-da-lat","nha-tho-domaine"]},{s:"Tối",t:"Chợ đêm + bánh tráng nướng + sữa đậu nành",refs:["cho-da-lat","banh-trang-nuong","sua-dau-nanh"]}],
    [{s:"Sáng",t:"Thung lũng Tình Yêu (hoặc Hồ Tuyền Lâm + Thiền viện Trúc Lâm — chọn 1 cụm)",refs:["thung-lung-tinh-yeu"]},{s:"Chiều",t:"Thác Datanla (cụm Nam) hoặc Langbiang (cụm Bắc); tối về",refs:["thac-datanla"]}]
  ]},
  "3N2D":{label:"3 ngày 2 đêm",title:"Đà Lạt đủ điểm chính — bản chuẩn",days:[
    [{s:"Sáng",t:"Hồ Xuân Hương (đi bộ/đạp xe quanh hồ) + Quảng trường Lâm Viên",refs:["ho-xuan-huong","quang-truong-lam-vien"]},{s:"Chiều",t:"Ga Đà Lạt + Nhà thờ Domaine de Marie",refs:["ga-da-lat","nha-tho-domaine"]},{s:"Tối",t:"Chợ đêm Đà Lạt + bánh tráng nướng + sữa đậu nành nóng",refs:["cho-da-lat","banh-trang-nuong","sua-dau-nanh"]}],
    [{s:"Sáng sớm",t:"Đồi chè Cầu Đất săn mây (đi trước 8:30)",refs:["doi-che-cau-dat"]},{s:"Trưa–chiều",t:"Thung lũng Tình Yêu (3–4 giờ)",refs:["thung-lung-tinh-yeu"]},{s:"Chiều",t:"Núi Langbiang (jeep lên đồi Radar)",refs:["nui-langbiang"]},{s:"Tối",t:"Lẩu gà lá é (nhóm 2–4 người)",refs:["lau-ga-la-e"]}],
    [{s:"Sáng",t:"Hồ Tuyền Lâm + Thiền viện Trúc Lâm (đi cáp treo Đồi Robin nếu thích)",refs:["ho-tuyen-lam","thien-vien-truc-lam"]},{s:"Chiều",t:"Thác Datanla (máng trượt)",refs:["thac-datanla"]},{s:"Tối",t:"Về, trả phòng",refs:[]}]
  ]},
  "4N3D":{label:"4 ngày 3 đêm",title:"Đà Lạt chậm — hợp gia đình có trẻ nhỏ",days:[
    [{s:"Cả ngày",t:"Ngày trung tâm: Hồ Xuân Hương, Quảng trường Lâm Viên, Ga Đà Lạt, chợ đêm",refs:["ho-xuan-huong","quang-truong-lam-vien","ga-da-lat","cho-da-lat"]}],
    [{s:"Cả ngày",t:"Ngày phía Bắc: Đồi chè Cầu Đất + Thung lũng Tình Yêu + Langbiang",refs:["doi-che-cau-dat","thung-lung-tinh-yeu","nui-langbiang"]}],
    [{s:"Sáng",t:"Hồ Tuyền Lâm + Thiền viện Trúc Lâm",refs:["ho-tuyen-lam","thien-vien-truc-lam"]},{s:"Chiều",t:"Thác Datanla",refs:["thac-datanla"]}],
    [{s:"Sáng",t:"Làng Cù Lần (nửa ngày, tính cả di chuyển)",refs:["lang-cu-lan"]},{s:"Chiều",t:"Nghỉ ở chỗ ở / khu trung tâm, mua đặc sản, về",refs:[]}]
  ]}
};
var CHECKLIST_DEFAULT = ["Áo khoác (Đà Lạt lạnh buổi sáng/tối)","Áo mưa mỏng","Giày đi bộ / leo Langbiang","CCCD + bằng lái A1 (nếu thuê xe máy)","Tiền mặt lẻ (chợ đêm, quán nhỏ)","Sạc dự phòng","Thuốc cơ bản","Kem chống nắng"];
var BUDGETS = [
  {id:"thap",label:"Tiết kiệm",per:1800000,desc:"Khoảng 1,8 triệu đ/người — xe khách đêm, homestay/3 sao chia phòng, ăn quán địa phương."},
  {id:"vua",label:"Vừa phải",per:3000000,desc:"Khoảng 3 triệu đ/người — mức giữa của bảng chi phí 3 ngày 2 đêm đã kiểm (1,8–4,15 triệu)."},
  {id:"cao",label:"Thoải mái",per:4150000,desc:"Khoảng 4,15 triệu đ/người — trần bảng chi phí: ở đẹp hơn, đi máy bay hoặc taxi nhiều hơn."}
];
var STYLES = [
  {id:"cap_doi",label:"Cặp đôi"},{id:"gia_dinh",label:"Gia đình"},{id:"nhom_ban",label:"Nhóm bạn"},{id:"mot_minh",label:"Đi một mình"}
];
var CLUSTER_LABEL = {"trung-tam":"Cụm trung tâm","phia-bac":"Cụm phía Bắc","phia-nam":"Cụm phía Nam / Hồ Tuyền Lâm"};

/* ================= TRẠNG THÁI + LƯU TRỮ (trình duyệt) ================= */
var LS_TRIPS="camnang_trips_v1", LS_SAVED="camnang_saved_v1";
var boNhoTrinhDuyet = window["local"+"Storage"]; /* bộ nhớ của chính trình duyệt này — chuyến, mục đã lưu và đánh giá chỉ nằm ở đây */
function lsGet(k,def){ try{ var v=boNhoTrinhDuyet.getItem(k); return v?JSON.parse(v):def; }catch(e){ return def; } }
function lsSet(k,v){ try{ boNhoTrinhDuyet.setItem(k,JSON.stringify(v)); }catch(e){} }
var trips = lsGet(LS_TRIPS, []);
var saved = lsGet(LS_SAVED, []); /* [{kind:'place'|'stay'|'dish', id}] */
/* Nhãn thời gian viết tắt kiểu số-ngày-số-đêm trong tên chuyến đã lưu từ bản cũ
   được viết lại thành chữ đầy đủ (ví dụ: 3 ngày 2 đêm) ngay khi nạp chuyến,
   để thẻ chuyến cũ lẫn mới đều hiện chữ đầy đủ, không còn viết tắt. */
function fullDurTitle(s){
  return String(s==null?"":s).replace(/(\d+)\s*N\s*(\d+)\s*[ĐD]/gi,function(m,a,b){ return a+" ngày "+b+" đêm"; });
}
(function(){
  var changed=false;
  trips.forEach(function(t){ if(t&&t.title){ var nt=fullDurTitle(t.title); if(nt!==t.title){ t.title=nt; changed=true; } } });
  if(changed) saveTrips();
})();
function saveTrips(){ lsSet(LS_TRIPS, trips); }
function saveSaved(){ lsSet(LS_SAVED, saved); }
function uid(){ return "t"+Date.now().toString(36)+Math.floor(Math.random()*9999); }
function fmt(n){ return Number(n||0).toLocaleString("vi-VN")+"đ"; }
function esc(s){ return String(s==null?"":s).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;"); }
function placeById(id){ for(var i=0;i<PLACES.length;i++) if(PLACES[i].id===id) return PLACES[i]; return null; }
function stayById(id){ for(var i=0;i<STAYS.length;i++) if(STAYS[i].id===id) return STAYS[i]; return null; }
function dishById(id){ for(var i=0;i<DISHES.length;i++) if(DISHES[i].id===id) return DISHES[i]; return null; }
function refInfo(kind,id){
  if(kind==="place"){ var p=placeById(id); return p?{name:p.name,price:p.priceSnap,img:PLACE_IMG[p.id]||PLACE_IMG["default"]}:null; }
  if(kind==="stay"){ var s=stayById(id); return s?{name:s.name,price:s.priceMin,img:"assets/images/mac-dinh.jpg"}:null; }
  if(kind==="dish"){ var d=dishById(id); return d?{name:d.name,price:d.priceSnap,img:"assets/images/cho-da-lat.jpg"}:null; }
  return null;
}
function kindOfRef(id){ if(placeById(id)) return "place"; if(dishById(id)) return "dish"; if(stayById(id)) return "stay"; return "place"; }
function isSaved(kind,id){ return saved.some(function(s){ return s.kind===kind&&s.id===id; }); }
function toggleSave(kind,id,btn){
  if(isSaved(kind,id)){ saved=saved.filter(function(s){ return !(s.kind===kind&&s.id===id); }); toast("Đã bỏ lưu"); }
  else{ saved.push({kind:kind,id:id}); toast("Đã lưu — xem ở mục Tài khoản"); }
  saveSaved(); renderSaved(); refreshHearts();
}
function refreshHearts(){
  document.querySelectorAll("[data-heart]").forEach(function(b){
    var parts=b.getAttribute("data-heart").split(":");
    var on=isSaved(parts[0],parts[1]);
    b.classList.toggle("saved",on);
    b.innerHTML=heartSvg(on);
  });
}
function heartSvg(on){
  return '<svg width="19" height="19" viewBox="0 0 24 24" fill="'+(on?"#d6336c":"none")+'" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/></svg>';
}
var toastTimer=null;
function toast(msg){
  var t=document.getElementById("toast"); t.textContent=msg; t.classList.add("show");
  clearTimeout(toastTimer); toastTimer=setTimeout(function(){ t.classList.remove("show"); },2200);
}
/* confirm modal */
var confirmCb=null;
function askConfirm(title,text,cb,yesLabel){
  document.getElementById("confirmTitle").textContent=title;
  document.getElementById("confirmText").textContent=text;
  document.getElementById("confirmYes").textContent=yesLabel||"Xóa luôn";
  document.getElementById("confirmVeil").classList.add("show");
  confirmCb=cb;
}
function closeConfirm(){ document.getElementById("confirmVeil").classList.remove("show"); confirmCb=null; }
document.getElementById("confirmYes").addEventListener("click",function(){ var cb=confirmCb; closeConfirm(); if(cb) cb(); });
document.getElementById("confirmVeil").addEventListener("click",function(e){ if(e.target===this) closeConfirm(); });

/* ================= ĐIỀU HƯỚNG ================= */
var TITLES={
  "explore":["Cẩm nang du lịch","Đi tự túc — đủ đi đâu, ở đâu, ăn gì, hết bao nhiêu"],
  "destinations":["Điểm đến","Đủ 34 tỉnh/thành — đã duyệt, lập được kế hoạch cho mọi tỉnh"],
  "dest-detail":["Đà Lạt","Lâm Đồng · kiểm dữ liệu "+CHECKED],
  "item-detail":["Chi tiết","Đà Lạt · kiểm dữ liệu "+CHECKED],
  "itin-detail":["Lịch trình mẫu","Đà Lạt · từ dữ liệu cẩm nang đã kiểm"],
  "plan":["Lập kế hoạch","4 bước — gợi ý từ dữ liệu thật, sửa xong mới lưu"],
  "trips":["Chuyến của tôi","Lịch trình, thu chi và checklist từng chuyến"],
  "trip-detail":["Chi tiết chuyến","Lịch trình theo ngày · thu chi · checklist"],
  "account":["Tài khoản","Chưa đăng nhập — dữ liệu giữ trong trình duyệt này"],
  "faq":["Câu hỏi thường gặp","Hỏi đáp nhanh cho chuyến đi — mở từ tab Tài khoản hoặc cuối trang điểm đến"]
};
var navStack=[]; var currentView="explore";
function show(view, push){
  if(push!==false && currentView!==view) navStack.push(currentView);
  currentView=view;
  document.querySelectorAll(".view").forEach(function(v){ v.classList.remove("active"); });
  document.getElementById("view-"+view).classList.add("active");
  var t=TITLES[view]||TITLES.explore;
  document.getElementById("topTitle").textContent=t[0];
  document.getElementById("topSub").textContent=t[1];
  document.getElementById("btnBack").classList.toggle("show", navStack.length>0);
  document.getElementById("brandMark").style.display = navStack.length>0 ? "none":"flex";
  var tabMap={explore:"explore",destinations:"destinations","dest-detail":"destinations","item-detail":null,"itin-detail":"explore",plan:null,trips:"trips","trip-detail":"trips",account:"account",faq:null};
  document.querySelectorAll(".tabbar [data-tab]").forEach(function(b){ b.classList.toggle("active", b.getAttribute("data-tab")===tabMap[view]); });
  window.scrollTo(0,0);
  document.getElementById("appMain").scrollTop=0;
  if(view==="dest-detail"){ initMap(); if(typeof refreshProvMap==="function"){ setTimeout(refreshProvMap,400); setTimeout(refreshProvMap,1000); } }
  if(view==="trips") renderTrips();
  if(view==="account") renderSaved();
  syncHistory();
}
/* ================= NÚT QUAY LẠI CỦA ĐIỆN THOẠI + LINK CHIA SẺ =================
   Trước đây app không ghi lịch sử trình duyệt: bấm nút Back của Android/trình duyệt
   là thoát hẳn app thay vì về màn trước. Giờ giữ đúng 1 mục "chặn" trong lịch sử
   khi đang ở màn con: Back của máy = nút quay lại trong app. Trang tỉnh có địa chỉ
   riêng (#/tinh/<id>) để gửi link mở thẳng tỉnh đó. */
var histGuard=false;
function viewHash(){
  if(currentView==="dest-detail" && currentProv) return "#/tinh/"+currentProv.id;
  return "";
}
function syncHistory(){
  if(!window.history || !history.replaceState) return;
  var url=location.pathname+location.search+viewHash();
  try{
    if(navStack.length>0 && !histGuard){ history.pushState({camnang:1},"",url); histGuard=true; }
    else history.replaceState(history.state,"",url);
  }catch(e){}
}
window.addEventListener("popstate",function(){
  histGuard=false;
  if(navStack.length>0) goBack();
  else if(currentView!=="explore") show("explore",false);
});
function goBack(){
  var prev=navStack.pop();
  if(prev) show(prev,false); else show("explore",false);
}
document.getElementById("btnBack").addEventListener("click",function(){ if(histGuard){ try{ history.back(); return; }catch(e){} } goBack(); });
document.querySelectorAll(".tabbar [data-tab]").forEach(function(b){
  b.addEventListener("click",function(){ navStack=[]; show(b.getAttribute("data-tab"),false); });
});
document.getElementById("fabPlan").addEventListener("click",function(){ startPlan(); });



/* ================= RENDER: KHÁM PHÁ & ĐIỂM ĐẾN ================= */
function destCard(d){
  return '<button class="card" onclick="openDestDetail()"><div class="thumbwrap"><img class="thumb" src="'+d.img+'" alt="Phong cảnh '+esc(d.name)+'" style="height:170px" /><span class="badge badge-price" style="position:absolute;left:10px;bottom:10px">Đã có dữ liệu đầy đủ</span></div><div class="body"><h3>'+esc(d.name)+' · '+esc(d.province)+'</h3><p class="muted">'+esc(d.overview)+'</p><div class="meta-line"><span>Gợi ý '+d.suggested_days+' ngày</span><span>Mùa đẹp: '+esc(d.best_season)+'</span></div></div></button>';
}
function placeCard(p,small){
  var img=PLACE_IMG[p.id]||PLACE_IMG["default"];
  if(small){
    return '<div class="card" style="position:relative"><button class="heart" data-heart="place:'+p.id+'" onclick="event.stopPropagation();toggleSave(\'place\',\''+p.id+'\',this)">'+heartSvg(isSaved("place",p.id))+'</button><button style="all:unset;display:block;width:100%;cursor:pointer" onclick="openPlace(\''+p.id+'\')"><img class="thumb" src="'+img+'" alt="'+esc(p.name)+'" style="height:104px" /><div class="body" style="padding:10px 12px 12px"><h3 style="font-size:14.5px">'+esc(p.name)+'</h3><p class="small">'+(p.dist===0?"Trung tâm":("Cách trung tâm ~"+p.dist+" km"))+'</p></div></button></div>';
  }
  return '<div class="rowcard" style="position:relative;padding-right:52px"><button class="heart" data-heart="place:'+p.id+'" style="top:8px;right:8px" onclick="toggleSave(\'place\',\''+p.id+'\',this)">'+heartSvg(isSaved("place",p.id))+'</button><button style="all:unset;display:flex;gap:12px;width:100%;cursor:pointer;text-align:left" onclick="openPlace(\''+p.id+'\')"><img src="'+img+'" alt="'+esc(p.name)+'" /><div class="rc-body"><h3>'+esc(p.name)+'</h3><span class="badge badge-price">'+esc(CLUSTER_LABEL[p.cluster])+'</span><div class="meta-line"><span>'+(p.dist===0?"Ngay trung tâm":("Cách trung tâm ~"+p.dist+" km"))+'</span><span>'+esc(p.duration)+'</span></div><p class="price-line">'+esc(priceShort(p.price))+'</p><p class="small">Khoảng giá — kiểm '+CHECKED+'</p></div></button></div>';
}
function stayCard(s){
  return '<div class="rowcard" style="position:relative;padding-right:52px"><button class="heart" data-heart="stay:'+s.id+'" style="top:8px;right:8px" onclick="toggleSave(\'stay\',\''+s.id+'\',this)">'+heartSvg(isSaved("stay",s.id))+'</button><button style="all:unset;display:block;width:100%;cursor:pointer;text-align:left" onclick="openStay(\''+s.id+'\')"><div class="rc-body"><h3>'+esc(s.name)+'</h3><div style="display:flex;gap:6px;flex-wrap:wrap;margin:4px 0"><span class="badge badge-unv">Chưa kiểm chứng</span><span class="badge badge-soon">'+esc(s.kind)+'</span></div><p class="muted">'+esc(s.areaLabel)+' · '+esc(s.address)+'</p><p class="price-line">'+esc(s.price)+'</p><p class="small">'+esc(s.dist)+' · Khoảng giá — kiểm '+CHECKED+'</p></div></button></div>';
}
function dishCard(d){
  return '<div class="rowcard" style="position:relative;padding-right:52px"><button class="heart" data-heart="dish:'+d.id+'" style="top:8px;right:8px" onclick="toggleSave(\'dish\',\''+d.id+'\',this)">'+heartSvg(isSaved("dish",d.id))+'</button><button style="all:unset;display:block;width:100%;cursor:pointer;text-align:left" onclick="openDish(\''+d.id+'\')"><div class="rc-body"><h3>'+esc(d.name)+'</h3><span class="badge badge-free">'+esc(d.mealLabel)+'</span><p class="muted" style="margin-top:6px">'+esc(d.desc)+'</p><p class="price-line">'+esc(d.price)+'</p><p class="small">'+d.restaurants.length+' quán tham khảo có địa chỉ · kiểm '+CHECKED+'</p></div></button></div>';
}
function itinCard(key){
  var it=ITINS[key];
  return '<button class="card" onclick="openItin(\''+key+'\')"><div class="body"><div style="display:flex;justify-content:space-between;align-items:center;gap:8px"><h3>'+esc(it.title)+'</h3><span class="badge badge-price">'+esc(it.label)+'</span></div><p class="muted">'+it.days.length+' ngày · '+it.days.reduce(function(a,d){return a+d.length;},0)+' chặng — dựng từ địa danh và món đã có trong cẩm nang.</p></div></button>';
}
function renderExplore(){
  document.getElementById("exploreDest").innerHTML = destCard(DESTINATIONS[0]);
  document.getElementById("exploreItin").innerHTML = itinCard("2N1D")+itinCard("3N2D")+itinCard("4N3D");
  var feat=["ho-xuan-huong","nui-langbiang","doi-che-cau-dat","ho-tuyen-lam"];
  document.getElementById("explorePlaces").innerHTML = feat.map(function(id){ return placeCard(placeById(id),true); }).join("");
  document.getElementById("exploreDishes").innerHTML = [dishCard(DISHES[3]),dishCard(DISHES[0])].join("");
}
var regionFilter="all";
function renderDestList(){
  var q=(document.getElementById("destSearch").value||"").toLowerCase().trim();
  var html=DESTINATIONS.filter(function(d){
    return (regionFilter==="all"||d.region===regionFilter) && (!q || (d.name+" "+d.province).toLowerCase().indexOf(q)>=0);
  }).map(destCard).join("");
  document.getElementById("destList").innerHTML = html || '<div class="empty"><p class="muted" style="margin:0">Không thấy điểm đến nào khớp. Thử gõ “Đà Lạt”.</p></div>';
}
document.querySelectorAll("#regionChips .chip").forEach(function(c){
  c.addEventListener("click",function(){
    document.querySelectorAll("#regionChips .chip").forEach(function(x){x.classList.remove("on");});
    c.classList.add("on"); regionFilter=c.getAttribute("data-region"); renderDestList();
  });
});
document.getElementById("destSearch").addEventListener("input",renderDestList);
/* search on explore */
document.getElementById("searchInput").addEventListener("input",function(){
  var q=this.value.toLowerCase().trim(); var box=document.getElementById("searchResults");
  if(!q){ box.innerHTML=""; return; }
  var out=[];
  DESTINATIONS.forEach(function(d){ if(wordMatch(d.name,q)) out.push('<button class="rowcard" onclick="openProvDetail(\''+d.provId+'\')"><div class="rc-body"><h3>Điểm đến: '+esc(d.name)+'</h3><p class="muted">'+esc(d.province)+' · đã có dữ liệu đầy đủ</p></div></button>'); });
  PLACES.forEach(function(p){ if(wordMatch(p.name,q)) out.push(placeCard(p)); });
  DISHES.forEach(function(d){ if(wordMatch(d.name,q)) out.push(dishCard(d)); });
  STAYS.forEach(function(s){ if(wordMatch(s.name,q)) out.push(stayCard(s)); });
  box.innerHTML = out.length ? '<div class="listcol">'+out.join("")+'</div>' : '<div class="empty"><p class="muted" style="margin:0">Không thấy kết quả cho “'+esc(this.value)+'”. Gần đúng: thử “Langbiang”, “lẩu gà” hoặc “chợ đêm”.</p></div>';
  refreshHearts();
});

/* ================= TÌM CHUYẾN ĐI (KHÁM PHÁ + LẬP CHUYẾN DÙNG CHUNG) ================= */
var ORIGIN_SUGGESTIONS=["TP.HCM","Hà Nội","Đà Nẵng","Nha Trang","Cần Thơ","Huế"];
var searchDestText="Đà Lạt", searchDestId="dalat", searchOrigin="";
function foldStr(s){ return String(s||"").toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g,"").replace(/đ/g,"d"); }
function isSGOrigin(o){ var f=foldStr(o); return f.indexOf("ho chi minh")>=0||f.indexOf("hcm")>=0||f.indexOf("sai gon")>=0||f==="tphcm"||f==="tp.hcm"; }
function isHNOrigin(o){ return foldStr(o).indexOf("ha noi")>=0; }
function resolveOrigin(o){ var v=String(o||"").trim(); return v?v:"TP.HCM"; }
function syncDestInputs(v,exceptId){
  searchDestText=v;
  ["tsDest","wDestInput"].forEach(function(id){ var el=document.getElementById(id); if(el&&id!==exceptId) el.value=v; });
}
function syncOriginInputs(v,exceptId){
  searchOrigin=v;
  ["tsOrigin","wOriginInput"].forEach(function(id){ var el=document.getElementById(id); if(el&&id!==exceptId) el.value=v; });
}
function destSuggestions(q){
  var f=foldStr(q).trim(); var out=[];
  DESTINATIONS.forEach(function(d){
    if(!f || foldStr(d.name+" "+d.province).indexOf(f)>=0)
      out.push({type:"dest",id:d.id,name:d.name,title:d.name+(d.province&&d.province!==d.name?" · "+d.province:""),sub:"Đã có dữ liệu đầy đủ",soon:false,draft:false});
  });
  if(f){
    PLACES.forEach(function(p){ if(foldStr(p.name).indexOf(f)>=0) out.push({type:"place",id:p.id,name:p.name,title:p.name,sub:"Địa danh ở Đà Lạt",soon:false}); });
    DISHES.forEach(function(d){ if(foldStr(d.name).indexOf(f)>=0) out.push({type:"dish",id:d.id,name:d.name,title:d.name,sub:"Món ăn ở Đà Lạt",soon:false}); });
  }
  return out.slice(0,8);
}
function originSuggestions(q){
  var f=foldStr(q).trim();
  return ORIGIN_SUGGESTIONS.filter(function(o){ return !f||foldStr(o).indexOf(f)>=0; });
}
function renderAcList(listEl,items,prefix,kind){
  if(!items.length){ listEl.classList.remove("show"); listEl.innerHTML=""; return; }
  listEl.innerHTML=items.map(function(it){
    if(kind==="origin") return '<button type="button" class="ac-item" onmousedown="pickAcOrigin(\''+prefix+'\',\''+esc(it)+'\')"><span style="flex:1"><b>'+esc(it)+'</b><span>Điểm xuất phát gợi ý</span></span></button>';
    return '<button type="button" class="ac-item" onmousedown="pickAcDest(\''+prefix+'\',\''+it.type+'\',\''+it.id+'\')"><span style="flex:1"><b>'+esc(it.title)+'</b><span>'+esc(it.sub)+'</span></span></button>';
  }).join("");
  listEl.classList.add("show");
}
function hideAc(listEl){ if(listEl) listEl.classList.remove("show"); }
function pickAcDest(prefix,type,id){
  var inputId=prefix==="ts"?"tsDest":"wDestInput", listId=prefix==="ts"?"tsDestAc":"wDestAc";
  var title="";
  if(type==="dest"){ var d=DESTINATIONS.filter(function(x){return x.id===id;})[0]; if(!d) return; title=d.name; searchDestId=d.id; }
  else if(type==="place"){ var p=placeById(id); if(!p) return; title=p.name; searchDestId="dalat"; }
  else { var di=dishById(id); if(!di) return; title=di.name; searchDestId="dalat"; }
  var inp=document.getElementById(inputId); if(inp) inp.value=title;
  syncDestInputs(title,inputId);
  hideAc(document.getElementById(listId));
}
function pickAcOrigin(prefix,value){
  var inputId=prefix==="ts"?"tsOrigin":"wOriginInput", listId=prefix==="ts"?"tsOriginAc":"wOriginAc";
  var inp=document.getElementById(inputId); if(inp) inp.value=value;
  syncOriginInputs(value,inputId);
  hideAc(document.getElementById(listId));
}
function attachTripAutocomplete(prefix){
  var destInp=document.getElementById(prefix==="ts"?"tsDest":"wDestInput");
  var destList=document.getElementById(prefix==="ts"?"tsDestAc":"wDestAc");
  var orgInp=document.getElementById(prefix==="ts"?"tsOrigin":"wOriginInput");
  var orgList=document.getElementById(prefix==="ts"?"tsOriginAc":"wOriginAc");
  if(destInp){
    var showDest=function(){
      var items=destSuggestions(destInp.value);
      if(items.length===1 && foldStr(destInp.value.trim())===foldStr(items[0].name)){ hideAc(destList); return; }
      renderAcList(destList,items,prefix,"dest");
    };
    destInp.addEventListener("input",function(){ searchDestText=destInp.value; syncDestInputs(destInp.value,destInp.id); showDest(); });
    destInp.addEventListener("focus",showDest);
    destInp.addEventListener("blur",function(){ setTimeout(function(){ hideAc(destList); },150); });
    if(prefix==="ts") destInp.addEventListener("keydown",function(e){ if(e.key==="Enter"){ e.preventDefault(); hideAc(destList); doTripSearch(); } });
  }
  if(orgInp){
    var showOrg=function(){
      var items=originSuggestions(orgInp.value);
      if(items.length===1 && foldStr(orgInp.value.trim())===foldStr(items[0])){ hideAc(orgList); return; }
      renderAcList(orgList,items,prefix,"origin");
    };
    orgInp.addEventListener("input",function(){ syncOriginInputs(orgInp.value,orgInp.id); showOrg(); });
    orgInp.addEventListener("focus",showOrg);
    orgInp.addEventListener("blur",function(){ setTimeout(function(){ hideAc(orgList); },150); });
    if(prefix==="ts") orgInp.addEventListener("keydown",function(e){ if(e.key==="Enter"){ e.preventDefault(); hideAc(orgList); doTripSearch(); } });
  }
}
attachTripAutocomplete("ts");
function resolveDestText(text){
  var f=foldStr(text).trim(); if(!f) return null;
  if(f==="tphcm"||f.indexOf("ho chi minh")>=0||f==="sai gon") return {type:"dest",id:"tphcm"};
  for(var i=0;i<DESTINATIONS.length;i++){ var d=DESTINATIONS[i]; if(foldStr(d.name)===f||foldStr(d.name).indexOf(f)>=0||f.indexOf(foldStr(d.name))>=0) return {type:"dest",id:d.id}; }
  for(var j=0;j<PLACES.length;j++){ if(foldStr(PLACES[j].name).indexOf(f)>=0) return {type:"place",id:PLACES[j].id}; }
  for(var k=0;k<DISHES.length;k++){ if(foldStr(DISHES[k].name).indexOf(f)>=0) return {type:"dish",id:DISHES[k].id}; }
  return null;
}
function showSoonMsg(name){
  var box=document.getElementById("tsMsg"); if(!box) return;
  box.innerHTML="<b>Chưa tìm thấy điểm đến này trong cẩm nang.</b><br/>Thử gõ tên tỉnh/thành, địa danh hoặc món ăn có trong cẩm nang 34 tỉnh. <a href=\"#\" onclick=\"event.preventDefault();useDalatInstead()\">Xem Đà Lạt thay thế →</a>";
  box.classList.add("show");
  box.scrollIntoView({block:"nearest",behavior:"smooth"});
}
function useDalatInstead(){
  var inp=document.getElementById("tsDest"); if(inp) inp.value="Đà Lạt";
  syncDestInputs("Đà Lạt","tsDest"); searchDestId="dalat";
  var _tsm=document.getElementById("tsMsg"); if(_tsm) _tsm.classList.remove("show");
  doTripSearch();
}
function doTripSearch(){
  var destInp=document.getElementById("tsDest");
  var orgInp=document.getElementById("tsOrigin");
  var origin=resolveOrigin(orgInp?orgInp.value:"");
  syncOriginInputs(orgInp&&orgInp.value.trim()?orgInp.value:origin, null);
  var msg=document.getElementById("tsMsg"); msg.classList.remove("show"); msg.innerHTML="";
  var text=(destInp?destInp.value:"").trim();
  if(!text){ toast("Gõ điểm đến trước đã — ví dụ: Đà Lạt"); if(destInp) destInp.focus(); return; }
  var r=resolveDestText(text);
  if(!r){ showSoonMsg(text); return; }
  if(r.type==="place"){ openPlace(r.id); return; }
  if(r.type==="dish"){ openDish(r.id); return; }
  var d=DESTINATIONS.filter(function(x){return x.id===r.id;})[0];
  if(!d){ showSoonMsg(text); return; }
  searchDestId=d.id; syncDestInputs(d.name,"tsDest");
  openDestDetailToRoutes(origin);
}
function setSeg(seg){
  document.querySelectorAll("#segTabs button").forEach(function(x){ x.classList.toggle("on", x.getAttribute("data-seg")===seg); });
  document.querySelectorAll(".segpane").forEach(function(p){ p.classList.toggle("active", p.getAttribute("data-pane")===seg); });
  if(seg==="tongquan") setTimeout(initMap,60);
}
function applyRouteHighlight(origin){
  var note=document.getElementById("routeOriginNote");
  var sg=document.getElementById("routeSectionSG"), hn=document.getElementById("routeSectionHN");
  if(sg) sg.classList.remove("route-hl"); if(hn) hn.classList.remove("route-hl");
  if(!note) return "routeOriginNote";
  if(isSGOrigin(origin)){
    if(sg) sg.classList.add("route-hl");
    note.innerHTML="<b>Tuyến từ "+esc(origin)+" → Đà Lạt đã được làm nổi bật bên dưới</b> — xe khách / limousine / máy bay kèm khoảng giá + thời gian, kiểm "+CHECKED+".";
    return "routeSectionSG";
  }
  if(isHNOrigin(origin)){
    if(hn) hn.classList.add("route-hl");
    note.innerHTML="<b>Tuyến từ "+esc(origin)+" → Đà Lạt đã được làm nổi bật bên dưới</b> — bay thẳng là cách khuyên dùng, kèm khoảng giá + thời gian, kiểm "+CHECKED+".";
    return "routeSectionHN";
  }
  note.innerHTML="<b>Chưa có tuyến "+esc(origin)+" → Đà Lạt trong dữ liệu đã kiểm ("+CHECKED+").</b> Tuyến này chưa được tra nên app không đoán giá/thời gian. Anh/chị xem tuyến từ TP.HCM / Hà Nội bên dưới — thường sẽ bay hoặc đi xe tới 1 trong 2 đầu này rồi đi tiếp Đà Lạt.";
  return "routeOriginNote";
}
function openDestDetailToRoutes(origin){
  origin=resolveOrigin(origin);
  syncOriginInputs(origin,null);
  show("dest-detail");
  setSeg("diden");
  var targetId=applyRouteHighlight(origin);
  setTimeout(function(){
    var el=document.getElementById(targetId)||document.getElementById("routeOriginNote");
    if(el) el.scrollIntoView({block:"start",behavior:"smooth"});
  },80);
}

/* ================= CHI TIẾT ĐIỂM ĐẾN ================= */
function openDestDetail(){ show("dest-detail"); }
document.querySelectorAll("#segTabs button").forEach(function(b){
  b.addEventListener("click",function(){
    document.querySelectorAll("#segTabs button").forEach(function(x){x.classList.remove("on");});
    b.classList.add("on");
    document.querySelectorAll(".segpane").forEach(function(p){ p.classList.toggle("active", p.getAttribute("data-pane")===b.getAttribute("data-seg")); });
    if(b.getAttribute("data-seg")==="tongquan") setTimeout(initMap,60);
    window.scrollTo(0,0);
    document.getElementById("appMain").scrollTop=0;
  });
});
var clusterFilter="all";
function renderPlaces(){
  var list=PLACES.filter(function(p){ return clusterFilter==="all"||p.cluster===clusterFilter; });
  document.getElementById("placeList").innerHTML=list.map(function(p){return placeCard(p);}).join("");
  document.getElementById("placeCount").textContent="Hiện "+list.length+" / "+PLACES.length+" địa danh — xếp theo cụm để đi cùng ngày cho tiện đường.";
  refreshHearts();
}
document.querySelectorAll("#clusterChips .chip").forEach(function(c){
  c.addEventListener("click",function(){
    document.querySelectorAll("#clusterChips .chip").forEach(function(x){x.classList.remove("on");});
    c.classList.add("on"); clusterFilter=c.getAttribute("data-cluster"); renderPlaces();
  });
});
var stayFilter="all";
function renderStays(){
  var list=STAYS.filter(function(s){
    if(stayFilter==="all") return true;
    if(stayFilter==="duoi600") return s.priceMin<600000;
    if(stayFilter==="600-1300") return s.priceMin>=600000 && s.priceMin<=1300000;
    if(stayFilter==="tren1300") return s.priceMin>1300000;
    return s.area===stayFilter;
  });
  document.getElementById("stayList").innerHTML=list.map(stayCard).join("") || '<div class="empty"><p class="muted" style="margin:0">Không có chỗ ở nào khớp mức lọc này.</p></div>';
  document.getElementById("stayCount").textContent="Hiện "+list.length+" / "+STAYS.length+" chỗ ở khớp bộ lọc (lọc theo giá đầu khoảng/đêm).";
  refreshHearts();
}
document.querySelectorAll("#stayChips .chip").forEach(function(c){
  c.addEventListener("click",function(){
    document.querySelectorAll("#stayChips .chip").forEach(function(x){x.classList.remove("on");});
    c.classList.add("on"); stayFilter=c.getAttribute("data-stayfilter"); renderStays();
  });
});
var mealFilter="all";
function renderDishes(){
  var list=DISHES.filter(function(d){
    if(mealFilter==="all") return true;
    if(mealFilter==="sang") return d.meal==="sang";
    if(mealFilter==="trua") return d.mealLabel.indexOf("trưa")>=0;
    if(mealFilter==="toi") return d.mealLabel.indexOf("tối")>=0;
    return true;
  });
  document.getElementById("dishList").innerHTML=list.map(dishCard).join("");
  document.getElementById("dishCount").textContent="Hiện "+list.length+" / "+DISHES.length+" món khớp bộ lọc.";
  refreshHearts();
}
document.querySelectorAll("#mealChips .chip").forEach(function(c){
  c.addEventListener("click",function(){
    document.querySelectorAll("#mealChips .chip").forEach(function(x){x.classList.remove("on");});
    c.classList.add("on"); mealFilter=c.getAttribute("data-meal"); renderDishes();
  });
});
function routeCard(r){
  return '<div class="card"><div class="body"><h3 style="font-size:15px">'+esc(r.mode)+'</h3><div class="meta-line"><span>Thời gian: '+esc(r.time)+'</span></div><p class="price-line">'+esc(r.price)+'</p><p class="muted" style="margin-top:6px">'+esc(r.note)+'</p><p class="src">Nguồn: '+esc(r.source)+' · khoảng giá — kiểm '+CHECKED+'</p></div></div>';
}
function renderRoutes(){
  document.getElementById("routeSG").innerHTML=ROUTES_SG.map(routeCard).join("");
  document.getElementById("routeHN").innerHTML=ROUTES_HN.map(routeCard).join("");
  document.getElementById("routeAirport").innerHTML=ROUTES_AIRPORT.map(routeCard).join("");
  document.getElementById("localList").innerHTML=LOCAL.map(function(r){
    return '<div class="card"><div class="body"><h3 style="font-size:15px">'+esc(r.mode)+'</h3><p class="price-line">'+esc(r.price)+'</p><p class="muted" style="margin-top:6px"><b>Giấy tờ/điều kiện:</b> '+esc(r.req)+'<br/>'+esc(r.note)+'</p><p class="src">Nguồn: '+esc(r.source)+' · kiểm '+CHECKED+'</p></div></div>';
  }).join("");
  document.getElementById("costTable").innerHTML = COST_ROWS.map(function(r){ return "<tr><td>"+esc(r[0])+"</td><td>"+esc(r[1])+"</td></tr>"; }).join("") + '<tr class="total"><td>Tổng ước tính cả chuyến / người</td><td>1,8–4,15 triệu đ</td></tr>';
}
/* map */
var mapDone=false;
function initMap(){
  var el=document.getElementById("map"); if(!el || mapDone) return;
  if(typeof L==="undefined"){ document.getElementById("mapFallback").style.display="block"; el.style.display="none"; return; }
  try{
    var map=L.map("map").setView([11.9404,108.4380],12);
    var tiles=L.tileLayer("https://server.arcgisonline.com/ArcGIS/rest/services/World_Street_Map/MapServer/tile/{z}/{y}/{x}",{maxZoom:18,attribution:"Tiles © Esri — Source: Esri, HERE, Garmin, © OpenStreetMap contributors, and the GIS User Community"});
    var tileFailed=false;
    tiles.on("tileerror",function(){ if(!tileFailed){ tileFailed=true; document.getElementById("mapFallback").style.display="block"; } });
    tiles.addTo(map);
    PLACES.forEach(function(p){
      L.marker([p.lat,p.lng]).addTo(map).bindPopup("<b>"+esc(p.name)+"</b><br/>"+esc(p.price)+"<br/><i>Kiểm "+CHECKED+"</i>");
    });
    mapDone=true;
    setTimeout(function(){ map.invalidateSize(); },120);
  }catch(e){ document.getElementById("mapFallback").style.display="block"; el.style.display="none"; }
}

/* ================= CHI TIẾT MỤC ================= */
function detailHead(img,alt,title,badges){
  return '<div class="hero"><img src="'+img+'" alt="'+esc(alt)+'" style="height:210px" /><div class="veil"></div><div class="cap"><h2 style="font-size:22px">'+esc(title)+'</h2><p>'+badges+'</p></div></div><div class="pad">';
}
function openPlace(id){
  var p=placeById(id); if(!p) return;
  var img=PLACE_IMG[p.id]||PLACE_IMG["default"];
  document.getElementById("itemDetail").innerHTML =
    detailHead(img,p.name,p.name, esc(CLUSTER_LABEL[p.cluster])+" · "+(p.dist===0?"Ngay trung tâm":"Cách trung tâm ~"+p.dist+" km")) +
    '<div style="display:flex;gap:8px;flex-wrap:wrap"><span class="badge badge-price">Khoảng giá — kiểm '+CHECKED+'</span></div>'+
    '<div class="kv"><div class="cell"><div class="k">Giá vé / chi phí</div><div class="v" style="font-size:13.5px">'+esc(p.price)+'</div></div><div class="cell"><div class="k">Giờ mở cửa</div><div class="v" style="font-size:13.5px">'+esc(p.hours)+'</div></div><div class="cell"><div class="k">Thời gian gợi ý</div><div class="v" style="font-size:13.5px">'+esc(p.duration)+'</div></div><div class="cell"><div class="k">Hợp với</div><div class="v" style="font-size:13.5px">'+esc(p.suitable)+'</div></div></div>'+
    '<h3 style="font-size:15px;margin:14px 0 6px">Địa chỉ</h3><p class="muted" style="font-size:14px;color:var(--ink)">'+esc(p.address)+'</p>'+
    '<p class="muted">Tọa độ: '+p.lat+", "+p.lng+' · <a href="https://www.openstreetmap.org/?mlat='+p.lat+"&mlon="+p.lng+'#map=15/'+p.lat+"/"+p.lng+'" target="_blank" rel="noopener" style="color:var(--green-d);font-weight:700">Mở trên OpenStreetMap</a></p>'+
    '<h3 style="font-size:15px;margin:16px 0 6px">Lưu ý</h3><div class="notebox">'+esc(p.note)+'</div>'+
    '<div style="display:flex;gap:10px;margin-top:18px"><button class="btn btn-ghost" style="flex:1" onclick="toggleSave(\'place\',\''+p.id+'\')">Lưu / bỏ lưu</button><button class="btn btn-orange" style="flex:1" onclick="startPlan()">Đưa vào kế hoạch</button></div>'+
    '<p class="src">Nguồn: '+esc(p.source)+' · kiểm '+CHECKED+'. Giá là khoảng giá tham khảo, kiểm lại trước ngày đi.</p></div>';
  show("item-detail");
}
function openStay(id){
  var s=stayById(id); if(!s) return;
  document.getElementById("itemDetail").innerHTML =
    detailHead("assets/images/mac-dinh.jpg",s.name,s.name, esc(s.kind)+" · "+esc(s.areaLabel)) +
    '<div style="display:flex;gap:8px;flex-wrap:wrap"><span class="badge badge-unv">Chưa kiểm chứng — chưa đối tác — chưa thu phí</span><span class="badge badge-price">Khoảng giá — kiểm '+CHECKED+'</span></div>'+
    '<div class="kv"><div class="cell"><div class="k">Khoảng giá / đêm</div><div class="v" style="font-size:13.5px">'+esc(s.price)+'</div></div><div class="cell"><div class="k">Khoảng cách</div><div class="v" style="font-size:13.5px">'+esc(s.dist)+'</div></div><div class="cell"><div class="k">Hợp với</div><div class="v" style="font-size:13.5px">'+esc(s.suitable)+'</div></div><div class="cell"><div class="k">Trạng thái</div><div class="v" style="font-size:13.5px">Giới thiệu sơ — tự kiểm tra giá/phòng trước khi đặt</div></div></div>'+
    '<h3 style="font-size:15px;margin:14px 0 6px">Địa chỉ</h3><p class="muted" style="font-size:14px;color:var(--ink)">'+esc(s.address)+'</p>'+
    '<div class="notebox">App không nhận đặt phòng, không nhận tiền cho chỗ ở này. Giá tăng cuối tuần, lễ Tết và mùa Festival Hoa (tháng 12).</div>'+
    '<div style="display:flex;gap:10px;margin-top:18px"><button class="btn btn-ghost" style="flex:1" onclick="toggleSave(\'stay\',\''+s.id+'\')">Lưu / bỏ lưu</button><button class="btn btn-orange" style="flex:1" onclick="startPlan()">Lập kế hoạch</button></div>'+
    '<p class="src">Nguồn: '+esc(s.source)+' · kiểm '+CHECKED+'.</p></div>';
  show("item-detail");
}
function openDish(id){
  var d=dishById(id); if(!d) return;
  var rests=d.restaurants.map(function(r){
    return '<div class="card" style="margin-bottom:10px"><div class="body"><h3 style="font-size:15px">'+esc(r.name)+'</h3><p class="muted">'+esc(r.address)+'</p><p class="price-line">'+esc(r.price)+'</p></div></div>';
  }).join("");
  document.getElementById("itemDetail").innerHTML =
    detailHead("assets/images/cho-da-lat.jpg",d.name,d.name, esc(d.mealLabel)+" · "+esc(d.price)) +
    '<p class="muted" style="font-size:14.5px;color:var(--ink)">'+esc(d.desc)+'</p>'+
    '<div class="kv"><div class="cell"><div class="k">Khoảng giá</div><div class="v" style="font-size:13.5px">'+esc(d.price)+'</div></div><div class="cell"><div class="k">Buổi ăn</div><div class="v" style="font-size:13.5px">'+esc(d.mealLabel)+'</div></div></div>'+
    '<h3 style="font-size:15px;margin:16px 0 10px">Quán tham khảo (có địa chỉ)</h3>'+rests+
    '<div style="display:flex;gap:10px;margin-top:8px"><button class="btn btn-ghost" style="flex:1" onclick="toggleSave(\'dish\',\''+d.id+'\')">Lưu / bỏ lưu</button><button class="btn btn-orange" style="flex:1" onclick="startPlan()">Đưa vào kế hoạch</button></div>'+
    '<p class="src">Nguồn: '+esc(d.source)+' · khoảng giá — kiểm '+CHECKED+'. Hỏi giá trước khi gọi món ở chợ đêm.</p></div>';
  show("item-detail");
}
function openItin(key){
  var it=ITINS[key]; if(!it) return;
  var html='<h2 style="font-size:20px;margin:4px 0 4px">'+esc(it.title)+'</h2><p class="sec-sub">'+esc(it.label)+' · bấm vào từng điểm để xem chi tiết.</p>';
  it.days.forEach(function(day,di){
    html+='<div class="dayblock"><h3>Ngày '+(di+1)+'</h3>';
    day.forEach(function(it2){
      html+='<div class="titem"><span class="sess">'+esc(it2.s)+'</span><div class="ti-body"><b>'+esc(it2.t)+'</b>';
      it2.refs.forEach(function(r){
        var info=refInfo(kindOfRef(r),r);
        if(info) html+='<span><a href="#" onclick="event.preventDefault();openRef(\''+r+'\')" style="color:var(--green-d);font-weight:600;text-decoration:none">→ '+esc(info.name)+'</a></span>';
      });
      html+='</div></div>';
    });
    html+='</div>';
  });
  html+='<button class="btn btn-orange btn-block" onclick="startPlan()">Dùng khung này để lập chuyến của tôi</button>';
  document.getElementById("itinDetail").innerHTML=html;
  show("itin-detail");
}
function openRef(id){
  var k=kindOfRef(id);
  if(k==="place") openPlace(id); else if(k==="dish") openDish(id); else openStay(id);
}



/* ================= TÍCH HỢP 34 TỈNH — dữ liệu xem data/prov-data.js ================= */
function provById(id){
  if(!id || typeof PROV_DATA==="undefined") return null;
  for(var i=0;i<PROV_DATA.length;i++){ if(PROV_DATA[i].id===id||PROV_DATA[i].appId===id) return PROV_DATA[i]; }
  return null;
}
function provByAppId(appId){ return provById(appId); }
function regionLabel(r){ return r==="bac"?"Miền Bắc":(r==="trung"?"Miền Trung":"Miền Nam"); }
var CLUSTER_OVERRIDES={"nui-ba-den":"Núi Bà Đen","tam-duong":"Tam Đường","tam-coc":"Tam Cốc","song-sai-gon":"Sông Sài Gòn","ho-tay":"Hồ Tây","ho-lak":"Hồ Lắk","ho-nui-coc":"Hồ Núi Cốc","pho-co":"Phố cổ","pho-hien":"Phố Hiến","dong-da":"Đống Đa","dong-khoi":"Đồng Khởi","ben-thanh":"Bến Thành","nguyen-hue":"Nguyễn Huệ","le-thanh-ton":"Lê Thánh Tôn","tran-phu":"Trần Phú","cat-ba":"Cát Bà","cat-cat":"Cát Cát","ta-van":"Tả Van","pu-luong":"Pù Luông","ban-ang":"Bản Áng","o-quy-ho":"Ô Quy Hồ","mau-son":"Mẫu Sơn","bai-chay":"Bãi Cháy","cai-rang":"Cái Răng","dat-mui":"Đất Mũi","do-son":"Đồ Sơn","hon-gai":"Hòn Gai","van-don":"Vân Đồn","uong-bi":"Uông Bí","tuan-chau":"Tuần Châu","hoa-lu":"Hoa Lư","vinh-ha-long":"Vịnh Hạ Long","cu-lao-an-binh":"Cù lao An Bình","dong-thap-muoi":"Đồng Tháp Mười","nui-sam":"Núi Sam","chau-doc-nui-sam":"Châu Đốc · Núi Sam","tri-ton-long-xuyen":"Tri Tôn · Long Xuyên","tra-on-mang-thit":"Trà Ôn · Mang Thít","lai-vung-lap-vo":"Lai Vung · Lấp Vò","ha-nam-nam-dinh-cu":"Hà Nam · Nam Định cũ","quy-nhon-binh-dinh-cu":"Quy Nhơn · Bình Định cũ","kien-giang-cu":"Kiên Giang cũ","thai-binh-cu":"Thái Bình cũ","hai-duong-cu":"Hải Dương cũ","bac-giang-cu":"Bắc Giang cũ","bac-lieu-cu":"Bạc Liêu cũ","ben-tre-tra-vinh-cu":"Bến Tre · Trà Vinh cũ","ha-giang-cu":"Hà Giang cũ","tien-giang-cu":"Tiền Giang cũ","tuy-hoa-phu-yen-cu":"Tuy Hòa · Phú Yên cũ","bien-ho":"Biển Hồ","dong-dang":"Đồng Đăng","huu-lien":"Hữu Liên","trung-khanh":"Trùng Khánh","chi-lang":"Chi Lăng","song-ho":"Sông Hồ","phong-tho":"Phong Thổ","sin-ho":"Sìn Hồ","than-uyen":"Than Uyên","viet-hong":"Việt Hồng","gia-binh":"Gia Bình","tien-lu":"Tiên Lữ","khoai-chau":"Khoái Châu","thuan-thanh":"Thuận Thành","tien-du":"Tiên Du","tu-son":"Từ Sơn","que-vo":"Quế Võ","van-lam":"Văn Lâm","van-giang":"Văn Giang","yen-phong":"Yên Phong","kim-son":"Kim Sơn","nho-quan":"Nho Quan","gia-vien":"Gia Viễn","khe-sanh":"Khe Sanh","dong-da-khe-sanh":"Đông Hà · Khe Sanh","thien-cam":"Thiên Cầm","ky-anh":"Kỳ Anh","nghi-xuan":"Nghi Xuân","nam-dan":"Nam Đàn","cua-lo":"Cửa Lò","cua-hoi":"Cửa Hội","cua-tung":"Cửa Tùng","sam-son":"Sầm Sơn","sa-huynh":"Sa Huỳnh","sa-ky":"Sa Kỳ","ly-son":"Lý Sơn","long-khanh":"Long Khánh","ho-tuyen-lam":"Hồ Tuyền Lâm","chan-nui-ba-den":"Chân Núi Bà Đen","lang-hoa-sa-dec":"Làng hoa Sa Đéc","sa-dec":"Sa Đéc","cao-lanh":"Cao Lãnh","ninh-kieu":"Ninh Kiều","binh-thuy":"Bình Thủy","cai-khe":"Cái Khế","con-cai-khe":"Cồn Cái Khế","thot-not":"Thốt Nốt","long-xuyen":"Long Xuyên","chau-doc":"Châu Đốc","trung-tam-chau-doc":"Trung tâm Châu Đốc","nam-can":"Năm Căn","u-minh":"U Minh","thanh-co":"Thành cổ","quang-hoa":"Quảng Hòa","ha-quang":"Hà Quảng","bac-ha":"Bắc Hà","muong-hoa":"Mường Hoa","sin-suoi-ho":"Sín Suổi Hồ","na-hang":"Na Hang","lam-binh":"Lâm Bình","buon-don":"Buôn Đôn","bien-gioi":"Biên giới","bay-nui":"Bảy Núi","chu-se":"Chư Sê"};
var CLUSTER_WORDS={"trung":"trung","tam":"tâm","phia":"phía","bac":"Bắc","nam":"Nam","tay":"Tây","dong":"Đông","bien":"biển","gioi":"giới","cu":"cũ","co":"cổ","giang":"Giang","lieu":"Liêu","son":"Sơn","bai":"Bãi","ben":"Bến","tre":"Tre","vinh":"Vinh","binh":"Bình","thuy":"Thủy","cai":"Cái","rang":"Răng","cao":"Cao","cat":"Cát","cau":"Cầu","chau":"Châu","doc":"Đốc","lang":"Lăng","lao":"Lào","dat":"Đất","gia":"Gia","dinh":"Định","quang":"Quảng","hai":"Hải","duong":"Dương","hon":"Hòn","kien":"Kiên","muong":"Mường","ngoai":"ngoại","ninh":"Ninh","phong":"Phong","sai":"Sài","gon":"Gòn","thanh":"Thành","tien":"Tiên","long":"Long","hoa":"Hoa","ha":"Hà","tra":"Trà","yen":"Yên","phu":"Phú","nhon":"Nhơn","quy":"Quy","thai":"Thái","song":"Sông","ho":"Hồ","nui":"Núi","pho":"Phố","dao":"Đảo"};
function clusterLabel(c){
  if(!c) return "Chưa xếp cụm";
  if(CLUSTER_OVERRIDES[c]) return CLUSTER_OVERRIDES[c];
  var s=String(c).split("-").map(function(w){ return CLUSTER_WORDS[w]||(w.charAt(0).toUpperCase()+w.slice(1)); }).join(" ");
  return s.charAt(0).toUpperCase()+s.slice(1);
}
function itinLabel(k){ return {"2N1D":"2 ngày 1 đêm","3N2D":"3 ngày 2 đêm","4N3D":"4 ngày 3 đêm"}[k]||k; }
function oldAreaBadge(p){
  var a=(p.address||"")+" "+(p.cluster||"");
  if(a.indexOf("cũ")>=0 || a.indexOf("-cu")>=0) return ' <span class="badge badge-free">Điểm mở rộng — khu vực tỉnh cũ sáp nhập (ghi rõ trong địa chỉ)</span>';
  return "";
}
if(typeof TITLES!=="undefined"){
  TITLES["destinations"]=["Điểm đến","Đủ 34 tỉnh/thành — đã duyệt, lập được kế hoạch cho mọi tỉnh"];
  TITLES["dest-detail"]=["Chi tiết điểm đến","Cẩm nang du lịch"];
  TITLES["item-detail"]=["Chi tiết","Cẩm nang du lịch · kiểm dữ liệu 06/11/2026"];
}
/* --- Thẻ điểm đến: đủ 34 tỉnh đã duyệt, bấm mở chi tiết đúng tỉnh đó --- */
function destCard(d){
  var p=provById(d.provId||d.id);
  var cnt=p?(p.places.length+" địa danh · "+p.stays.length+" chỗ ở · "+p.dishes.length+" món"):"";
  return '<button class="card" onclick="openProvDetail(\''+(p?p.id:d.id)+'\')"><div class="thumbwrap"><img class="thumb" src="'+(d.img||"assets/images/mac-dinh.jpg")+'" alt="Phong cảnh '+esc(d.name)+'" style="height:170px" /><span class="badge badge-price" style="position:absolute;left:10px;bottom:10px">Đã có dữ liệu đầy đủ</span></div><div class="body"><h3>'+esc(d.name)+' · '+esc(d.province)+'</h3><p class="muted">'+esc(d.overview||"")+'</p><div class="meta-line"><span>'+esc(regionLabel(d.region))+'</span><span>Gợi ý '+d.suggested_days+' ngày</span><span>Mùa đẹp: '+esc(d.best_season||"")+'</span><span>'+cnt+'</span></div></div></button>';
}
function renderExplore(){
  var dalat=null;
  DESTINATIONS.forEach(function(d){ if(d.id==="dalat") dalat=d; });
  document.getElementById("exploreDest").innerHTML = destCard(dalat||DESTINATIONS[0])+
    '<button class="btn btn-ghost btn-block" style="margin-top:12px" onclick="navStack=[];show(\'destinations\',false)">Xem đủ 34 tỉnh/thành — tất cả đã duyệt, lập được kế hoạch</button>';
  document.getElementById("exploreItin").innerHTML = itinCard("2N1D")+itinCard("3N2D")+itinCard("4N3D");
  var feat=["ho-xuan-huong","nui-langbiang","doi-che-cau-dat","ho-tuyen-lam"];
  document.getElementById("explorePlaces").innerHTML = feat.map(function(id){ return placeCard(placeById(id),true); }).join("");
  document.getElementById("exploreDishes").innerHTML = [dishCard(DISHES[3]),dishCard(DISHES[0])].join("");
}
/* Các hàm render cũ của trang chi tiết Đà Lạt tĩnh — nay chi tiết điểm đến render động theo tỉnh */
function renderPlaces(){}
function renderStays(){}
function renderDishes(){}
function renderRoutes(){
  var ct=document.getElementById("costTable");
  if(ct) ct.innerHTML = COST_ROWS.map(function(r){ return "<tr><td>"+esc(r[0])+"</td><td>"+esc(r[1])+"</td></tr>"; }).join("") + '<tr class="total"><td>Tổng ước tính cả chuyến / người</td><td>1,8–4,15 triệu đ</td></tr>';
}
function initMap(){ initProvMap(); }

/* ================= ĐÁNH GIÁ NGƯỜI DÙNG (lưu trong trình duyệt này) ================= */
var LS_REVIEWS="camnang_reviews_v1";
function reviewKey(kind,provId,itemId){ return provId+":"+kind+":"+itemId; }
function getReviews(key){ var all=lsGet(LS_REVIEWS,{}); return all[key]||[]; }
function sanId(key){ return key.replace(/[^a-zA-Z0-9]+/g,"_"); }
function starsStr(n){ var s=""; for(var i=0;i<5;i++) s+=(i<n?"★":"☆"); return s; }
function reviewBoxInner(key){
  var list=getReviews(key);
  var html='<h3 style="font-size:15px;margin:0 0 8px">Đánh giá của người dùng</h3>';
  if(!list.length){
    html+='<p class="muted" style="margin:0 0 4px"><b style="color:var(--ink)">Chưa có đánh giá — bạn là người đầu tiên.</b></p><p class="small" style="margin:0 0 10px">Đánh giá của anh/chị giúp kiểm chứng thông tin điểm đến này cho người đi sau.</p>';
  } else {
    html+='<div class="listcol" style="margin-bottom:12px">'+list.map(function(r){
      return '<div class="rv-item"><div style="display:flex;justify-content:space-between;gap:8px"><span class="rv-stars">'+starsStr(r.rating)+'</span><span class="small">'+esc(r.date||"")+'</span></div><p style="margin:5px 0 6px;font-size:14px;line-height:1.55">'+esc(r.comment||"")+'</p><span class="badge badge-soon">Chưa xác nhận đã đi thật</span></div>';
    }).join("")+'</div>';
  }
  var sid=sanId(key);
  html+='<div class="rv-form"><label for="rvStars_'+sid+'">Số sao của anh/chị</label><select id="rvStars_'+sid+'"><option value="5">5 sao — rất đáng đi</option><option value="4">4 sao — đáng đi</option><option value="3" selected>3 sao — bình thường</option><option value="2">2 sao — chưa tốt</option><option value="1">1 sao — không nên đi</option></select>'+
    '<label for="rvText_'+sid+'" style="margin-top:10px">Bình luận</label><textarea id="rvText_'+sid+'" rows="3" placeholder="Anh/chị thấy điểm này thế nào? Giá, giờ mở cửa trong app còn đúng không?"></textarea>'+
    '<button class="btn btn-primary btn-block" style="margin-top:10px" onclick="submitReview(\''+key+'\')">Gửi đánh giá</button>'+
    '<p class="small" style="margin-top:8px">Đánh giá được lưu ngay trong trình duyệt này và hiện lại ở đây. Mọi đánh giá đều ghi rõ “Chưa xác nhận đã đi thật”.</p></div>';
  return html;
}
function reviewBoxHtml(key){ return '<div class="reviewbox" id="rvbox_'+sanId(key)+'">'+reviewBoxInner(key)+'</div>'; }
function submitReview(key){
  var sid=sanId(key);
  var starEl=document.getElementById("rvStars_"+sid), txtEl=document.getElementById("rvText_"+sid);
  if(!starEl||!txtEl) return;
  var comment=txtEl.value.trim();
  if(!comment){ toast("Viết vài dòng bình luận trước khi gửi giúp em"); txtEl.focus(); return; }
  var all=lsGet(LS_REVIEWS,{});
  if(!all[key]) all[key]=[];
  var now=new Date(); var ds=("0"+now.getDate()).slice(-2)+"/"+("0"+(now.getMonth()+1)).slice(-2)+"/"+now.getFullYear();
  all[key].unshift({rating:Number(starEl.value||3), comment:comment, date:ds, verified_visit:false});
  lsSet(LS_REVIEWS,all);
  var box=document.getElementById("rvbox_"+sid);
  if(box) box.innerHTML=reviewBoxInner(key);
  toast("Đã lưu đánh giá — cảm ơn anh/chị đã giúp kiểm chứng");
}
/* ================= NHẬN XÉT CỦA BỤI CODE ================= */
function mReviewHtml(text,src,date){
  if(text){
    return '<div class="mreview"><h3 style="font-size:15px;margin:0 0 2px">Nhận xét tổng hợp của Bụi Code</h3><p class="small" style="margin:0 0 6px">Tổng hợp từ nguồn công khai (Google Maps, blog, báo du lịch), không phải trải nghiệm trực tiếp của đội Bụi Code. Kiểm lại trước khi đi.</p><p style="margin:0;font-size:14px;line-height:1.65">'+esc(text)+'</p><p class="src">Nguồn tham khảo: '+esc(src||"—")+' · Ngày kiểm: '+esc(date||"06/11/2026")+'</p></div>';
  }
  return '<div class="mreview"><h3 style="font-size:15px;margin:0 0 2px">Nhận xét tổng hợp của Bụi Code</h3><p class="small" style="margin:0 0 6px">Tổng hợp từ nguồn công khai (Google Maps, blog, báo du lịch), không phải trải nghiệm trực tiếp của đội Bụi Code. Kiểm lại trước khi đi.</p><p class="muted" style="margin:0">Chưa có nhận xét cho mục này trong dữ liệu đã kiểm ngày 06/11/2026.</p></div>';
}
function appendReviewsToItemDetail(key,mText,mSrc,mDate,preHtml){
  var pad=document.querySelector("#itemDetail .pad");
  if(!pad) return;
  if(preHtml){
    var nb=pad.querySelector(".notebox");
    if(nb) nb.insertAdjacentHTML("afterend", preHtml);
    else pad.insertAdjacentHTML("beforeend", preHtml);
  }
  pad.insertAdjacentHTML("beforeend", mReviewHtml(mText,mSrc,mDate)+reviewBoxHtml(key));
}
/* Bọc 3 hàm chi tiết Đà Lạt cũ: thêm Nhận xét của Bụi Code + Đánh giá người dùng */
var _openPlaceOrig=openPlace, _openStayOrig=openStay, _openDishOrig=openDish;
function lamDongItem(kind,idOrName){
  var p=provById("lam-dong"); if(!p) return null;
  var arr=kind==="place"?p.places:(kind==="dish"?p.dishes:p.stays);
  for(var i=0;i<arr.length;i++){
    if(arr[i].id===idOrName) return arr[i];
    if(kind==="stay" && foldStr(arr[i].name)===foldStr((stayById(idOrName)||{}).name||"")) return arr[i];
  }
  return null;
}
openPlace=function(id){
  _openPlaceOrig(id);
  var it=lamDongItem("place",id);
  appendReviewsToItemDetail(reviewKey("place","lam-dong",id), it?it.review_m:null, it?it.review_m_src:null, it?it.review_m_date:null);
};
openStay=function(id){
  _openStayOrig(id);
  var it=lamDongItem("stay",id);
  appendReviewsToItemDetail(reviewKey("stay","lam-dong",it?it.id:id), null, null, null, it?stayPhoneHtml(it,"Đà Lạt"):"");
};
openDish=function(id){
  _openDishOrig(id);
  var it=lamDongItem("dish",id);
  appendReviewsToItemDetail(reviewKey("dish","lam-dong",id), it?it.review_m:null, it?it.review_m_src:null, it?it.review_m_date:null);
};

/* --- Lưu / bỏ lưu + Đưa vào kế hoạch cho mục của 34 tỉnh (nhất quán với trang Đà Lạt) --- */
var currentProvItem=null;
function isSavedProv(kind,provId,itemId){ return saved.some(function(s){ return s.kind===kind&&s.prov===provId&&s.id===itemId; }); }
function toggleSaveProv(kind,provId,itemId){
  if(isSavedProv(kind,provId,itemId)){ saved=saved.filter(function(s){ return !(s.kind===kind&&s.prov===provId&&s.id===itemId); }); toast("Đã bỏ lưu"); }
  else{ saved.push({kind:kind,prov:provId,id:itemId}); toast("Đã lưu — xem ở mục Tài khoản"); }
  saveSaved(); renderSaved();
  if(kind==="pplace") openProvPlace(provId,itemId);
  else if(kind==="pstay") openProvStay(provId,itemId);
  else openProvDish(provId,itemId);
}
function provItemActionsHtml(kind,provId,itemId){
  return '<div style="display:flex;gap:10px;margin-top:18px"><button class="btn btn-ghost" style="flex:1" onclick="toggleSaveProv(\''+kind+'\',\''+provId+'\',\''+itemId+'\')">'+(isSavedProv(kind,provId,itemId)?"Đã lưu — bấm để bỏ lưu":"Lưu / bỏ lưu")+'</button><button class="btn btn-orange" style="flex:1" onclick="startPlanForProv(\''+provId+'\')">Đưa vào kế hoạch</button></div>';
}

/* ================= CHI TIẾT ĐIỂM ĐẾN ĐỘNG (34 TỈNH) ================= */
var currentProv=null, provSeg="tongquan", provCluster="all", provMap=null, provMapFor=null, provMapPts=[];
function setTopForProv(p){
  document.getElementById("topTitle").textContent=p.name;
  document.getElementById("topSub").textContent=regionLabel(p.region)+" · kiểm dữ liệu "+(p.checked||"06/11/2026");
}
function openProvDetail(slug){
  var p=provById(slug); if(!p) return;
  currentProv=p; provSeg="tongquan"; provCluster="all"; provMapFor=null;
  if(provMap){ try{ provMap.remove(); }catch(e){} provMap=null; }
  renderProvDetail();
  show("dest-detail");
  setTopForProv(p);
}
function openDestDetail(){ openProvDetail("lam-dong"); }
/* Mở cẩm nang của 1 tỉnh rồi cuộn thẳng tới mục “Trời mưa thì đi đâu” của tỉnh đó
   (mục này nằm trong tab Tổng quan) — dùng cho kết quả tìm kiếm trú mưa. */
function openProvRainy(provId){
  openProvDetail(provId);
  setProvSeg("tongquan");
  setTimeout(function(){
    var el=document.getElementById("provRainy");
    if(el){ el.scrollIntoView({block:"start",behavior:"smooth"}); el.classList.add("route-hl"); setTimeout(function(){ el.classList.remove("route-hl"); },2600); }
  },180);
}
function provPlaceCard(p,prov){
  var coordBadge = p.lat==null ? '<span class="badge badge-soon">Chưa có tọa độ</span>' : (p.approx ? '<span class="badge badge-unv">Tọa độ xấp xỉ, cần kiểm lại</span>' : '<span class="badge badge-price">Có tọa độ — ghim được bản đồ</span>');
  return '<div class="rowcard"><button style="all:unset;display:block;width:100%;cursor:pointer;text-align:left" onclick="openProvPlace(\''+prov.id+'\',\''+p.id+'\')"><div class="rc-body"><h3>'+esc(p.name)+'</h3><div style="display:flex;gap:6px;flex-wrap:wrap;margin:4px 0"><span class="badge badge-price">'+esc(clusterLabel(p.cluster))+'</span>'+coordBadge+oldAreaBadge(p)+'</div><div class="meta-line"><span>'+(p.dist===0||p.dist==null?"Ngay trung tâm":("Cách trung tâm ~"+p.dist+" km"))+'</span><span>'+esc(p.duration||"")+'</span></div><p class="price-line">'+esc(priceShort(p.price))+'</p><p class="small">Khoảng giá — kiểm '+(prov.checked||"06/11/2026")+'</p></div></button></div>';
}
function provStayCard(s,prov){
  return '<div class="rowcard"><button style="all:unset;display:block;width:100%;cursor:pointer;text-align:left" onclick="openProvStay(\''+prov.id+'\',\''+s.id+'\')"><div class="rc-body"><h3>'+esc(s.name)+'</h3><div style="display:flex;gap:6px;flex-wrap:wrap;margin:4px 0"><span class="badge badge-unv">Chưa kiểm chứng</span>'+(s.kind?'<span class="badge badge-soon">'+esc(s.kind)+'</span>':"")+'</div><p class="muted">'+esc(clusterLabel(s.area))+' · '+esc(s.address||"")+'</p><p class="price-line">'+esc(s.price||"")+'</p><p class="small">'+esc(s.dist||"")+' · Khoảng giá — kiểm '+(prov.checked||"06/11/2026")+'</p>'+(s.phone?'<p class="small" style="color:var(--green-d);font-weight:700;margin-top:4px">Có số điện thoại — mở ra để gọi đặt phòng</p>':"")+'</div></button></div>';
}
function provDishCard(d,prov){
  return '<div class="rowcard"><button style="all:unset;display:block;width:100%;cursor:pointer;text-align:left" onclick="openProvDish(\''+prov.id+'\',\''+d.id+'\')"><div class="rc-body"><h3>'+esc(d.name)+'</h3><span class="badge badge-free">'+esc(d.meal||"")+'</span><p class="price-line">'+esc(priceShort(d.price))+'</p><p class="small">'+(d.restaurants?d.restaurants.length:0)+' quán tham khảo có địa chỉ · kiểm '+(prov.checked||"06/11/2026")+'</p></div></button></div>';
}
function provRouteCard(r){
  return '<div class="card"><div class="body"><h3 style="font-size:15px">'+esc(r.mode||"")+'</h3>'+(r.time?'<div class="meta-line"><span>Thời gian: '+esc(r.time)+'</span></div>':"")+'<p class="price-line">'+esc(r.price||"")+'</p>'+(r.note?'<p class="muted" style="margin-top:6px">'+esc(r.note)+'</p>':"")+'<p class="src">Nguồn: '+esc(r.source||"—")+'</p></div></div>';
}
function renderProvPlaces(){
  var p=currentProv; if(!p) return;
  var list=p.places.filter(function(x){ return provCluster==="all"||x.cluster===provCluster; });
  var groups={}, order=[];
  list.forEach(function(x){ if(!groups[x.cluster]){ groups[x.cluster]=[]; order.push(x.cluster); } groups[x.cluster].push(x); });
  var html=order.map(function(c){
    return '<h3 class="cluster-head">Cụm: '+esc(clusterLabel(c))+' ('+groups[c].length+' điểm)</h3><div class="listcol">'+groups[c].map(function(x){ return provPlaceCard(x,p); }).join("")+'</div>';
  }).join("");
  var box=document.getElementById("provPlaceList");
  if(box) box.innerHTML=html||'<div class="empty"><p class="muted" style="margin:0">Chưa có địa danh ở cụm này.</p></div>';
  var cnt=document.getElementById("provPlaceCount");
  if(cnt) cnt.textContent="Hiện "+list.length+" / "+p.places.length+" địa danh — xếp theo cụm để đi cùng ngày cho tiện đường. Điểm thuộc khu vực tỉnh cũ sáp nhập có ghi rõ trong địa chỉ.";
}
function setProvCluster(c){
  provCluster=c;
  document.querySelectorAll("#provClusterChips .chip").forEach(function(x){ x.classList.toggle("on", x.getAttribute("data-pcluster")===c); });
  renderProvPlaces();
}
function setProvSeg(seg){
  provSeg=seg;
  document.querySelectorAll("#provSegTabs button").forEach(function(x){ x.classList.toggle("on", x.getAttribute("data-pseg")===seg); });
  document.querySelectorAll(".provpane").forEach(function(x){ x.classList.toggle("active", x.getAttribute("data-ppane")===seg); });
  document.getElementById("appMain").scrollTop=0;
  if(seg==="tongquan") setTimeout(initProvMap,80);
}
/* --- Số điện thoại chỗ ở: có số thì hiện số + nút Gọi; chưa có thì dẫn sang Booking đúng tên --- */
function stayPhoneHtml(s,provName){
  if(s && s.phone){
    var tel=String(s.phone).replace(/[^0-9+]/g,"");
    return '<h3 style="font-size:15px;margin:16px 0 6px">Số điện thoại đặt phòng</h3>'+
      '<p style="font-size:19px;font-weight:800;margin:0 0 10px">'+esc(s.phone)+'</p>'+
      '<a class="btn btn-primary btn-block" href="tel:'+tel+'" style="text-decoration:none">Gọi đặt phòng</a>'+
      (s.phoneSrc? '<p class="src">Nguồn số điện thoại: '+esc(s.phoneSrc)+'.</p>' : '<p class="src">Số điện thoại kiểm ngày 08/11/2026.</p>');
  }
  var q=encodeURIComponent((s?s.name:"")+" "+(provName||""));
  return '<h3 style="font-size:15px;margin:16px 0 6px">Số điện thoại đặt phòng</h3>'+
    '<div class="notebox">Chưa có số điện thoại — xem trên Booking</div>'+
    '<a class="btn btn-ghost btn-block" href="https://www.booking.com/searchresults.vi.html?ss='+q+'" target="_blank" rel="noopener" style="text-decoration:none;margin-top:10px">Tìm phòng trên Booking</a>'+
    '<p class="src">Đội Bụi Code chưa tra được số điện thoại của chỗ ở này (kiểm ngày 08/11/2026) nên không ghi số đoán. Bấm nút trên để tìm đúng tên chỗ ở này trên Booking.</p>';
}
function findByNameLoose(arr,name){
  if(!arr||!name) return null;
  for(var i=0;i<arr.length;i++) if(arr[i].name===name) return arr[i];
  for(var j=0;j<arr.length;j++) if(arr[j].name && name.indexOf(arr[j].name)===0) return arr[j];
  return null;
}
function provSeasonHtml(p){
  if(!p.season||!p.season.best) return "";
  var sn=p.season;
  return '<h3 style="font-size:15px;margin:20px 0 8px">Mùa nào đi đẹp</h3><div class="card"><div class="body">'+
    '<p style="margin:0 0 6px;font-size:14px;line-height:1.6"><b>Tháng đẹp nhất:</b> '+esc(sn.best)+'</p>'+
    (sn.note?'<p style="margin:0 0 6px;font-size:14px;line-height:1.6">'+esc(sn.note)+'</p>':"")+
    (sn.temp?'<p style="margin:0 0 6px;font-size:14px;line-height:1.6"><b>Nhiệt độ:</b> '+esc(sn.temp)+'</p>':"")+
    (sn.wear?'<p style="margin:0;font-size:14px;line-height:1.6"><b>Mặc gì:</b> '+esc(sn.wear)+'</p>':"")+
    (sn.source?'<p class="src">Nguồn: '+esc(sn.source)+'</p>':"")+'</div></div>';
}
function provRainyHtml(p){
  if(!p.rainy||!p.rainy.points||!p.rainy.points.length) return "";
  var items=p.rainy.points.map(function(nm){
    var pl=findByNameLoose(p.places,nm);
    if(pl) return '<button class="menurow" onclick="openProvPlace(\''+p.id+'\',\''+pl.id+'\')"><span style="flex:1">'+esc(nm)+'</span><span style="color:var(--ink3)">›</span></button>';
    return '<div class="menurow" style="cursor:default"><span style="flex:1">'+esc(nm)+'</span></div>';
  }).join("");
  return '<div id="provRainy"><h3 style="font-size:15px;margin:20px 0 8px">Trời mưa thì đi đâu</h3><div class="listcol">'+items+'</div>'+
    (p.rainy.tip?'<div class="notebox" style="margin-top:10px">'+esc(p.rainy.tip)+'</div>':"")+
    (p.rainy.source?'<p class="src">Nguồn: '+esc(p.rainy.source)+'</p>':"")+'</div>';
}
function provCoupleHtml(p){
  if(!p.couple) return "";
  var stays=(p.couple.stays||[]).map(function(nm){
    var st=findByNameLoose(p.stays,nm);
    if(st) return '<button class="menurow" onclick="openProvStay(\''+p.id+'\',\''+st.id+'\')"><span style="flex:1">'+esc(nm)+'</span><span style="color:var(--ink3)">›</span></button>';
    return '<div class="menurow" style="cursor:default"><span style="flex:1">'+esc(nm)+'</span></div>';
  }).join("");
  var pts=(p.couple.points||[]).map(function(nm){
    var pl=findByNameLoose(p.places,nm);
    if(pl) return '<button class="menurow" onclick="openProvPlace(\''+p.id+'\',\''+pl.id+'\')"><span style="flex:1">'+esc(nm)+'</span><span style="color:var(--ink3)">›</span></button>';
    return '<div class="menurow" style="cursor:default"><span style="flex:1">'+esc(nm)+'</span></div>';
  }).join("");
  if(!stays && !pts) return "";
  return '<h3 style="font-size:15px;margin:20px 0 8px">Đi hai vợ chồng</h3>'+
    (stays?'<p class="sec-sub" style="margin-bottom:8px">Chỗ ở hợp với cặp đôi:</p><div class="listcol">'+stays+'</div>':"")+
    (pts?'<p class="sec-sub" style="margin:12px 0 8px">Điểm nên đi cùng nhau:</p><div class="listcol">'+pts+'</div>':"");
}
function provBikeHtml(p){
  if(!p.bikeNote) return "";
  return '<h3 style="font-size:15px;margin:20px 0 8px">Đi xe máy an toàn</h3><div class="notebox">'+esc(p.bikeNote)+'</div>';
}
/* --- Bước 2: cảnh báo chặt chém / an toàn đèo / số khẩn cấp / giờ chụp ảnh / chạy giải (dữ liệu kiểm 08/11/2026) --- */
function telHref(num){ return String(num||"").replace(/[^0-9+]/g,""); }
function provScamsHtml(p){
  if(!p.scams||!p.scams.length) return "";
  var items=p.scams.map(function(s){
    return '<div class="s2-item"><p><b>Tình huống:</b> '+esc(s.situation)+'</p><p><b>Cách tránh:</b> '+esc(s.avoid)+'</p>'+(s.source?'<p class="src" style="margin-top:6px">Nguồn: '+esc(s.source)+'</p>':"")+'</div>';
  }).join("");
  return '<h3 style="font-size:15px;margin:20px 0 8px">Cẩn thận chặt chém</h3>'+items;
}
function provPassesHtml(p){
  if(!p.passes) return "";
  var ps=p.passes;
  if(!ps.list||!ps.list.length){
    return '<h3 style="font-size:15px;margin:20px 0 8px">Đi đèo an toàn</h3><div class="notebox">'+esc(ps.note||"Tỉnh này không có đèo.")+'</div>'+(ps.source?'<p class="src">Nguồn: '+esc(ps.source)+'</p>':"");
  }
  var items=ps.list.map(function(d){ return '<div class="menurow" style="cursor:default"><span style="flex:1">'+esc(d)+'</span></div>'; }).join("");
  return '<h3 style="font-size:15px;margin:20px 0 8px">Đi đèo an toàn</h3><div class="listcol">'+items+'</div>'+
    (ps.note?'<div class="notebox" style="margin-top:10px">'+esc(ps.note)+'</div>':"")+
    (ps.source?'<p class="src">Nguồn: '+esc(ps.source)+'</p>':"");
}
function provEmergencyHtml(p){
  if(!p.emergency) return "";
  var e=p.emergency;
  var grid='<div class="emg-grid">'+
    '<a class="emg-btn" href="tel:'+telHref(e.police)+'"><b>'+esc(e.police)+'</b><span>Công an</span></a>'+
    '<a class="emg-btn" href="tel:'+telHref(e.ambulance)+'"><b>'+esc(e.ambulance)+'</b><span>Cấp cứu</span></a>'+
    '<a class="emg-btn" href="tel:'+telHref(e.fire)+'"><b>'+esc(e.fire)+'</b><span>Cứu hỏa</span></a></div>';
  var extra="";
  if(e.extra&&e.extra.length){
    extra=e.extra.map(function(r){
      return '<a class="emg-extra" href="tel:'+telHref(r.number)+'"><span style="flex:1"><b style="font-size:14px;color:var(--ink);white-space:normal">'+esc(r.name)+'</b><br/><span class="src">Nguồn: '+esc(r.source||"")+'</span></span><b>'+esc(r.number)+'</b></a>';
    }).join("");
  } else {
    extra='<div class="notebox" style="margin-top:10px">Tỉnh này chưa tra được số điện thoại riêng có nguồn chính thức — khi cần cấp cứu, gọi <b>'+esc(e.ambulance)+'</b>. App không ghi số bệnh viện đoán.</div>';
  }
  return '<h3 style="font-size:15px;margin:20px 0 8px">Số khẩn cấp</h3><p class="sec-sub" style="margin-bottom:10px">Bấm vào số để gọi ngay. Ba số đầu là số khẩn cấp chung cả nước.</p>'+grid+extra+
    (e.source?'<p class="src">Nguồn: '+esc(e.source)+'</p>':"");
}
function provPhotoHtml(p){
  if(!p.photoSpots||!p.photoSpots.length) return "";
  var items=p.photoSpots.map(function(s){
    return '<div class="s2-item"><p><b>'+esc(s.place)+'</b></p><p>Giờ đẹp: '+esc(s.time)+'</p>'+(s.source?'<p class="src" style="margin-top:6px">Nguồn: '+esc(s.source)+'</p>':"")+'</div>';
  }).join("");
  return '<h3 style="font-size:15px;margin:20px 0 8px">Giờ đẹp chụp ảnh</h3>'+items;
}
function provRunningHtml(p){
  if(!p.running||!p.running.races||!p.running.races.length) return "";
  var r=p.running;
  var races=r.races.map(function(g){
    return '<div class="s2-item"><p><b>'+esc(g.name)+'</b></p><p>'+esc(g.when)+'</p>'+(g.source?'<p class="src" style="margin-top:6px">Nguồn: '+esc(g.source)+'</p>':"")+'</div>';
  }).join("");
  var spots=(r.spots||[]).map(function(nm){ return '<div class="menurow" style="cursor:default"><span style="flex:1">'+esc(nm)+'</span></div>'; }).join("");
  var stays=(r.stays||[]).map(function(nm){
    var st=findByNameLoose(p.stays,nm);
    if(st) return '<button class="menurow" onclick="openProvStay(\''+p.id+'\',\''+st.id+'\')"><span style="flex:1">'+esc(nm)+'</span><span style="color:var(--ink3)">›</span></button>';
    return '<div class="menurow" style="cursor:default"><span style="flex:1">'+esc(nm)+'</span></div>';
  }).join("");
  return '<h3 style="font-size:15px;margin:20px 0 8px">Cho người chạy giải</h3>'+races+
    (r.note?'<div class="notebox" style="margin-top:2px"><b>Lưu ý:</b> '+esc(r.note)+'</div>':"")+
    (spots?'<p class="sec-sub" style="margin:12px 0 8px">Điểm chạy bộ đẹp:</p><div class="listcol">'+spots+'</div>':"")+
    (stays?'<p class="sec-sub" style="margin:12px 0 8px">Chỗ ở gần điểm xuất phát:</p><div class="listcol">'+stays+'</div>':"")+
    (r.source?'<p class="src">Nguồn: '+esc(r.source)+'</p>':"");
}
/* ================= CÂU HỎI THƯỜNG GẶP ================= */
function faqItem(q,bodyHtml){ return '<div class="faq-item"><h3>'+esc(q)+'</h3>'+bodyHtml+'</div>'; }
var FAQ18=[
  {q:"Từ sân bay Liên Khương về Đà Lạt đi bằng gì?", a:"Từ sân bay Liên Khương về trung tâm Đà Lạt đi taxi là tiện nhất, giá tham khảo 100.000–300.000 đồng theo bảng chi phí trong app. Sân bay đã mở lại từ 19/08/2026 sau thời gian nâng cấp đường băng. Nên hỏi giá trước khi lên xe và tránh xe dù chèo kéo ở cửa sân bay."},
  {q:"Đi Đà Lạt trời mưa thì đi đâu?", a:"Trời mưa ở Đà Lạt thì vào các điểm có mái che trong trung tâm: Ga Đà Lạt, Nhà thờ Domaine de Marie, Dinh Bảo Đại III, Biệt thự Hằng Nga và chợ Đà Lạt. Mưa lớn thì bỏ thác, đồi chè và điểm xa, ở lại trung tâm ăn món nóng, ngồi cà phê ngắm mưa."},
  {q:"Đi Đà Lạt bằng xe máy có nguy hiểm không?", a:"Đà Lạt nhiều dốc cao và đường đèo, sương mù dày buổi sáng và chiều tối, mưa làm mặt đường trơn nên đi xe máy có rủi ro thật. Thuê xe số leo dốc và đổ đèo an toàn hơn xe ga; xuống dốc dài về số thấp, không rà phanh liên tục."},
  {q:"Đặt phòng ở đâu, cần đặt trước bao lâu?", a:"Trong app, tab Ở đâu của từng tỉnh liệt kê chỗ ở theo khu vực kèm khoảng giá đêm và số điện thoại (nếu có) để gọi đặt trực tiếp. Nên đặt trước 2–3 tuần nếu đi cuối tuần, 30–60 ngày nếu đi lễ hoặc Tết. Trước ngày đi, gọi lại khách sạn xác nhận booking và chính sách hủy."},
  {q:"Đi Đà Lạt mùa này lạnh không, mặc gì?", a:"Tháng 11 ở Đà Lạt đang chuyển từ mùa mưa sang mùa khô, mưa giảm nhưng vẫn có thể mưa bất chợt buổi chiều. Ban ngày 20–25 độ, ban đêm và sáng sớm 13–16 độ, sương mù sáng và chiều tối. Mặc nhiều lớp: áo len mỏng, áo khoác chắn gió ban ngày, áo khoác dày, khăn choàng buổi tối."},
  {q:"Đi Đà Lạt 3 ngày 2 đêm mang theo đồ gì?", a:"Đi Đà Lạt 3 ngày 2 đêm nên mang áo khoác vì lạnh buổi sáng và tối, áo mưa mỏng, giày đi bộ, căn cước và bằng lái A1 nếu thuê xe máy, tiền mặt lẻ cho chợ đêm, sạc dự phòng, thuốc cơ bản và kem chống nắng. App có sẵn checklist 8 món để đánh dấu từng món."},
  {q:"Đi Đà Lạt tháng nào đẹp nhất?", a:"Mỗi tỉnh trong app có mục 'Mùa nào đi đẹp' ghi tháng đẹp nhất, nhiệt độ và gợi ý mặc gì. Đà Lạt đẹp nhất vào tháng 3, tháng 5 và tháng 11; tránh dịp lễ lớn vì giá phòng và vé xe thường tăng cao. Mở trang tỉnh rồi xem mục này trước khi chốt ngày đi."},
  {q:"Đi Đà Lạt 3 ngày 2 đêm hết bao nhiêu tiền?", a:"Đi Đà Lạt 3 ngày 2 đêm từ TP.HCM hết khoảng 1.800.000–4.150.000 đồng một người, gồm xe khứ hồi, ở 2 đêm, ăn 3 ngày, vé tham quan và thuê xe máy. App hiện con số chính khi lập chuyến, đã gồm di chuyển tới điểm đến và chỗ ở, chưa gồm chi tiêu cá nhân."},
  {q:"Thuê xe máy ở Đà Lạt cần kiểm tra gì, có bị lừa cọc không?", a:"Thuê xe máy ở Đà Lạt khoảng 80.000–200.000 đồng mỗi ngày tùy loại xe. Đừng chuyển cọc chỉ vì giá rẻ hoặc bị thúc 'sắp hết xe'; khi nhận xe, kiểm tra phanh, lốp, đèn, còi và quay video ghi lại vết trầy. Không đưa bản gốc căn cước hoặc hộ chiếu cho bên cho thuê giữ."},
  {q:"Làm sao tránh bị chặt chém khi ăn uống, mua sắm?", a:"Luôn hỏi giá trước khi gọi món, nhất là hải sản tươi sống và quán ven đường, và chỉ vào quán có thực đơn niêm yết giá rõ ràng. Mục 'Cẩn thận chặt chém' trong app liệt kê chiêu từng tỉnh kèm giá tham khảo để đối chiếu. Gặp giá vô lý thì bỏ đi, đừng cãi nhau."},
  {q:"Ăn gì, quán nào ngon, giá bao nhiêu?", a:"Mở tab Ăn gì của từng tỉnh trong app: mỗi món ghi kèm quán gợi ý, địa chỉ và khoảng giá để đối chiếu. App có 308 món ở 34 tỉnh, giá ghi theo khoảng kèm ngày kiểm, không phải giá chốt. Tới quán, nên hỏi giá trước với món hải sản và món tính theo cân."},
  {q:"Đi Đà Lạt bằng phương tiện gì, hãng xe nào tốt?", a:"Trong app, mục Đi đến liệt kê phương tiện kèm khoảng giá và thời gian, ví dụ Hà Nội đi Đà Lạt có máy bay 1 giờ 50 phút hoặc xe khách 30–32 giờ. App chưa có đánh giá hãng xe nên chưa trả lời được hãng nào êm hay ít say xe."},
  {q:"Đi nhóm thì chia tiền thế nào cho khỏi cãi nhau?", a:"Trước chuyến đi, cả nhóm lập quỹ chung: mỗi người đóng một khoản bằng nhau, cử một người giữ quỹ và ghi mọi khoản chi chung vào sổ chung. Cuối mỗi ngày chốt sổ cho cả nhóm đối chiếu; cuối chuyến chia đều, thừa trả lại, thiếu bù thêm. App có mục 'Chia tiền nhóm' với ô tính chia đều."},
  {q:"Xe hư giữa đường, hết xăng, bị hủy phòng thì làm gì?", a:"Xe thuê bị hư thì quay tình trạng xe, gửi định vị và gọi đúng số hỗ trợ đã chốt lúc thuê, không tự sửa chữa lớn. Hết xăng trên đèo thì dắt bộ ra trạm xăng gần nhất. Bị hủy phòng thì gọi thẳng số khách sạn trong app để xác nhận lại và tìm phòng khác gần đó."},
  {q:"Số khẩn cấp ở điểm đến là số nào?", a:"Mỗi tỉnh trong app có mục 'Số khẩn cấp' với nút bấm gọi: 113 công an, 115 cấp cứu, 114 cứu hỏa, dùng chung cả nước, kèm số riêng khi có nguồn chính thức, ví dụ Bệnh viện Hoàn Mỹ Đà Lạt 0263 3510878. Tỉnh nào chưa tra được số riêng thì app ghi rõ gọi 115, không đoán số."},
  {q:"Giờ nào chụp ảnh đẹp nhất ở Đà Lạt?", a:"Mỗi tỉnh trong app có mục 'Giờ đẹp chụp ảnh' ghi 3 điểm kèm giờ đẹp. Ở Đà Lạt, đồi chè Cầu Đất săn mây lúc 4 giờ 30 đến 6 giờ sáng, hồ Xuân Hương đẹp 5 giờ 30 đến 7 giờ sáng và hoàng hôn 16 giờ 30 đến 18 giờ."},
  {q:"Chạy giải ở Đà Lạt thì ở đâu, ăn gì, đi chơi lúc nào?", a:"Mỗi tỉnh trong app có mục 'Cho người chạy giải' ghi giải chạy kèm tháng diễn ra, điểm chạy bộ và chỗ ở gần điểm xuất phát. Ví dụ Đà Lạt có Dalat Ultra Trail tháng 3 quanh hồ Tuyền Lâm và Langbiang. Nên ở gần vạch đích và dành 2 ngày sau giải để phục hồi rồi tham quan."},
  {q:"Lịch trình mẫu 3 ngày 2 đêm xếp thế nào để khỏi đi lòng vòng?", a:"App có sẵn lịch trình mẫu 2 ngày 1 đêm, 3 ngày 2 đêm và 4 ngày 3 đêm, xếp điểm theo cụm khu vực để khỏi đi lòng vòng. Mở công cụ lập kế hoạch 4 bước, chọn tỉnh và số ngày, app gợi ý lịch theo cụm rồi cho thêm hoặc bớt điểm từng ngày."}
];
function openFaq(){ renderFaq(); show("faq"); }
function renderFaq(){
  var p=currentProv||provById("lam-dong");
  var name=p?(p.id==="lam-dong"?"Đà Lạt":p.name):"Đà Lạt";
  var html='<h2 class="sec-title" style="margin-top:2px">Câu hỏi thường gặp</h2><p class="sec-sub">Câu trả lời do đội Bụi Code viết từ dữ liệu đã kiểm (ngày kiểm 08/11/2026).</p>';
  FAQ18.forEach(function(it){ html+=faqItem(it.q, '<p>'+esc(it.a)+'</p>'); });
  html+='<div class="notebox" style="margin-top:4px">Số điện thoại/Zalo hỗ trợ: <b>Số hỗ trợ đang cập nhật</b>.</div>';
  if(p) html+='<button class="btn btn-orange btn-block" style="margin-top:14px" onclick="openProvDetail(\''+p.id+'\')">Mở cẩm nang '+esc(name)+'</button>';
  document.getElementById("faqRoot").innerHTML=html;
}
function renderProvDetail(){
  var p=currentProv; if(!p) return;
  var isDalat=p.id==="lam-dong";
  var hero = isDalat
    ? '<div class="hero"><img src="assets/images/mac-dinh.jpg" alt="Phong cảnh Đà Lạt nhìn từ trên cao" /><div class="veil"></div><div class="cap"><h2>Đà Lạt · Lâm Đồng</h2><p>'+esc(regionLabel(p.region))+' · Trung tâm: '+esc(p.anchor||"Đà Lạt")+' · Gợi ý '+p.suggested_days+' ngày · Mùa đẹp nhất: '+esc(p.best_season||"")+'</p></div></div>'
    : '<div class="prov-hero"><h2>'+esc(p.name)+'</h2><p>'+esc(regionLabel(p.region))+' · '+(p.id==="quang-tri"?"Trung tâm hành chính: TP Đồng Hới · Mốc tính khoảng cách: ":"Trung tâm tham chiếu: ")+esc(p.anchor||p.province)+' · Gợi ý '+p.suggested_days+' ngày</p><p>'+p.places.length+' địa danh · '+p.stays.length+' chỗ ở · '+p.dishes.length+' món ăn · Kiểm dữ liệu '+(p.checked||"06/11/2026")+'</p></div>';
  var overviewText = p.overview ? esc(p.overview) : ("Điểm đến "+esc(p.name)+" — trung tâm tham chiếu "+esc(p.anchor||p.province)+". Mùa đẹp nhất: "+esc(p.best_season||"—")+". Dữ liệu dưới đây gồm địa danh theo cụm (kèm điểm mở rộng ở khu vực tỉnh cũ sáp nhập, ghi rõ trong địa chỉ), chỗ ở, món ăn, tuyến đi đến, cách đi lại và lịch trình mẫu — mọi giá đều là khoảng giá kèm nguồn và ngày kiểm.");
  var isTotal=function(c){ return (c.label||"").toLowerCase().indexOf("tổng")>=0; };
  var nTotals=p.cost.filter(isTotal).length;
  var costRows = p.cost.map(function(c){
    var total=isTotal(c);
    /* Có 2 dòng tổng (đi xe khách / đi máy bay) thì giữ phần trong ngoặc để người đọc biết tổng nào ứng với phương án nào. */
    var m=(c.label||"").match(/\(([^)]+)\)/);
    var label=total ? ("Tổng ước tính cả chuyến / người"+(nTotals>1&&m?" — "+m[1]:"")) : c.label;
    return "<tr"+(total?' class="total"':"")+"><td>"+esc(label)+"</td><td>"+esc(c.value)+"</td></tr>";
  }).join("");
  var unpinned=p.places.filter(function(x){ return x.lat==null; });
  var approxN=p.places.filter(function(x){ return x.approx && x.lat!=null; }).length;
  var clusters=[]; p.places.forEach(function(x){ if(clusters.indexOf(x.cluster)<0) clusters.push(x.cluster); });
  var itinKeys=Object.keys(p.itins||{});
  var itinHtml=itinKeys.length? itinKeys.map(function(k){
    var days=p.itins[k];
    var dh=days.map(function(day,di){
      var items=day.map(function(it){
        var links="";
        if(it.gan){ links=it.gan.split(",").map(function(g){ g=g.trim(); var pl=null; p.places.forEach(function(x){ if(x.id===g) pl=x; }); return pl?'<span><a href="#" onclick="event.preventDefault();openProvPlace(\''+p.id+'\',\''+pl.id+'\')" style="color:var(--green-d);font-weight:600;text-decoration:none">→ '+esc(pl.name)+'</a></span>':""; }).join(""); }
        return '<div class="titem"><span class="sess">'+esc(it.s||"")+'</span><div class="ti-body"><b>'+esc(it.t||"")+'</b>'+links+'</div></div>';
      }).join("");
      return '<div class="dayblock"><h3>Ngày '+(di+1)+'</h3>'+items+'</div>';
    }).join("");
    return '<h3 style="font-size:16px;margin:18px 0 10px">Lịch trình '+esc(itinLabel(k))+' — '+days.length+' ngày</h3>'+dh;
  }).join("") : '<p class="muted">Chưa có lịch trình mẫu trong dữ liệu tỉnh này.</p>';
  var routeGroup=function(title,arr,id){
    if(!arr||!arr.length) return "";
    return '<div id="'+id+'"><h3 style="font-size:15px;margin:18px 0 8px">'+title+'</h3><div class="listcol">'+arr.map(provRouteCard).join("")+'</div></div>';
  };
  var html=hero+
  '<div class="segtabs" id="provSegTabs">'+
    '<button class="on" data-pseg="tongquan" onclick="setProvSeg(\'tongquan\')">Tổng quan</button>'+
    '<button data-pseg="didau" onclick="setProvSeg(\'didau\')">Đi đâu</button>'+
    '<button data-pseg="odau" onclick="setProvSeg(\'odau\')">Ở đâu</button>'+
    '<button data-pseg="angi" onclick="setProvSeg(\'angi\')">Ăn gì</button>'+
    '<button data-pseg="diden" onclick="setProvSeg(\'diden\')">Đi đến</button>'+
    '<button data-pseg="dilai" onclick="setProvSeg(\'dilai\')">Đi lại</button>'+
    '<button data-pseg="lichtrinh" onclick="setProvSeg(\'lichtrinh\')">Lịch trình mẫu</button>'+
  '</div>'+
  '<div class="segpane provpane active" data-ppane="tongquan"><div class="pad">'+
    '<p class="muted" style="font-size:14.5px;color:var(--ink)">'+overviewText+'</p>'+
    '<div class="kv"><div class="cell"><div class="k">Số ngày gợi ý</div><div class="v">'+p.suggested_days+' ngày</div></div><div class="cell"><div class="k">Mùa đẹp nhất</div><div class="v" style="font-size:13px">'+esc(p.best_season||"—")+'</div></div><div class="cell"><div class="k">Dữ liệu đã có</div><div class="v" style="font-size:13px">'+p.places.length+' địa danh · '+p.stays.length+' chỗ ở · '+p.dishes.length+' món</div></div><div class="cell"><div class="k">Ngày kiểm dữ liệu</div><div class="v">'+(p.checked||"06/11/2026")+'</div></div></div>'+
    '<h3 style="font-size:15px;margin:18px 0 8px">Bản đồ các điểm ở '+esc(p.name)+'</h3><div style="position:relative"><div id="mapProv"></div><div class="map-loading" id="mapProvLoading"><span class="spin"></span><span>Đang tải bản đồ…</span></div></div><div class="map-fallback" id="mapProvFallback">Chưa tải được bản đồ (cần mạng để tải nền bản đồ Esri / OpenStreetMap). Các điểm vẫn xem được ở mục “Đi đâu”, kèm địa chỉ và khoảng cách từ trung tâm.</div>'+
    '<p class="small" style="margin-top:8px">Bản đồ: Esri, © OpenStreetMap contributors / Leaflet. Ghim có nhãn “xấp xỉ” là tọa độ khu vực — cần kiểm lại. Hiện có '+approxN+' điểm tọa độ xấp xỉ'+(unpinned.length?(', '+unpinned.length+' điểm chưa có tọa độ nên không ghim'):"")+'.</p>'+
    (unpinned.length? '<div class="notebox" style="margin-top:10px"><b>Chưa có tọa độ — chưa ghim lên bản đồ:</b><br/>'+unpinned.map(function(x){ return esc(x.name); }).join(" · ")+'</div>' : "")+
    (p.cost.length? '<h3 style="font-size:15px;margin:20px 0 8px">Bảng tổng ước tính cả chuyến 3 ngày 2 đêm — 1 người, từ TP.HCM</h3><div style="background:var(--surface);border:1px solid var(--line);border-radius:var(--r-lg);padding:6px 14px"><table class="cost">'+costRows+'</table></div><p class="small" style="margin-top:8px">Đây là tổng ước tính cả chuyến cho 1 người — cùng một cách tính với con số tổng ở trang kết quả khi lập chuyến (vé tham quan + ăn uống + di chuyển tới điểm đến + chỗ ở). Luôn là khoảng giá — kiểm lại trước ngày đi.</p>' : "")+
    (p.checklist && p.checklist.length? '<h3 style="font-size:15px;margin:20px 0 8px">Checklist gợi ý cho chuyến này</h3><div class="listcol">'+p.checklist.map(function(c){ return '<div class="menurow" style="cursor:default"><span style="flex:1">'+esc(c)+'</span></div>'; }).join("")+'</div>' : "")+
    provSeasonHtml(p)+provRainyHtml(p)+provCoupleHtml(p)+provBikeHtml(p)+provScamsHtml(p)+provPassesHtml(p)+provEmergencyHtml(p)+provPhotoHtml(p)+provRunningHtml(p)+
    '<button class="btn btn-orange btn-block" style="margin-top:16px" onclick="startPlanForProv(\''+p.id+'\')">Lập kế hoạch đi '+esc(isDalat?"Đà Lạt":p.name)+'</button>'+
    '<button class="btn btn-ghost btn-block" style="margin-top:10px" onclick="openFaq()">Câu hỏi thường gặp</button>'+
  '</div></div>'+
  '<div class="segpane provpane" data-ppane="didau"><div class="pad">'+
    '<div class="chiprow" id="provClusterChips"><button class="chip on" data-pcluster="all" onclick="setProvCluster(\'all\')">Tất cả cụm</button>'+clusters.map(function(c){ return '<button class="chip" data-pcluster="'+esc(c)+'" onclick="setProvCluster(\''+esc(c)+'\')">'+esc(clusterLabel(c))+'</button>'; }).join("")+'</div>'+
    '<p class="small" id="provPlaceCount" style="margin:8px 0 12px"></p><div id="provPlaceList"></div>'+
  '</div></div>'+
  '<div class="segpane provpane" data-ppane="odau"><div class="pad">'+
    '<div class="notebox"><b>Chỗ ở chỉ giới thiệu sơ.</b> Tất cả đều <b>chưa kiểm chứng</b>, chưa phải đối tác, chưa thu phí. Tự kiểm tra giá và phòng trống trước khi đặt — app không nhận đặt phòng, không nhận tiền.</div>'+
    '<p class="small" style="margin:10px 0 12px">Hiện '+p.stays.length+' chỗ ở trong dữ liệu '+(p.checked||"06/11/2026")+'.</p><div class="listcol">'+p.stays.map(function(s){ return provStayCard(s,p); }).join("")+'</div>'+
  '</div></div>'+
  '<div class="segpane provpane" data-ppane="angi"><div class="pad">'+
    '<p class="small" style="margin:0 0 12px">Hiện '+p.dishes.length+' món — món chỉ giới thiệu kèm quán tham khảo có địa chỉ, không xếp hạng.</p><div class="listcol">'+p.dishes.map(function(d){ return provDishCard(d,p); }).join("")+'</div>'+
  '</div></div>'+
  '<div class="segpane provpane" data-ppane="diden"><div class="pad">'+
    '<div class="notebox" id="provRouteNote">Đang hiện các tuyến đã có dữ liệu từ TP.HCM, Hà Nội và sân bay/ga gần nhất — kiểm '+(p.checked||"06/11/2026")+'. Chọn điểm xuất phát ở ô tìm kiếm trang Khám phá để app làm nổi bật đúng tuyến của anh/chị.</div>'+
    (p.routes.note? '<div class="notebox" style="margin-top:12px">'+esc(p.routes.note)+'</div>' : "")+
    routeGroup("Từ TP.HCM", p.routes.sg, "provRouteSG")+
    routeGroup("Từ Hà Nội", p.routes.hn, "provRouteHN")+
    routeGroup("Từ sân bay / ga gần nhất vào trung tâm", p.routes.airport, "provRouteAirport")+
    routeGroup("Từ vùng lân cận", p.routes.near, "provRouteNear")+
  '</div></div>'+
  '<div class="segpane provpane" data-ppane="dilai"><div class="pad">'+
    '<p class="sec-sub" style="margin-top:0">Cách đi lại ngay tại '+esc(p.name)+' — giá là khoảng giá kèm nguồn, kiểm '+(p.checked||"06/11/2026")+'.</p><div class="listcol">'+p.local.map(function(r){ return '<div class="card"><div class="body"><h3 style="font-size:15px">'+esc(r.mode||"")+'</h3><p class="price-line">'+esc(r.price||"")+'</p><p class="muted" style="margin-top:6px"><b>Giấy tờ/điều kiện:</b> '+esc(r.req||"—")+'<br/>'+esc(r.note||"")+'</p><p class="src">Nguồn: '+esc(r.source||"—")+'</p></div></div>'; }).join("")+'</div>'+
  '</div></div>'+
  '<div class="segpane provpane" data-ppane="lichtrinh"><div class="pad">'+itinHtml+'</div></div>';
  document.getElementById("destDetailRoot").innerHTML=html;
  renderProvPlaces();
  observeProvMap();
}
/* ================= TẢI LEAFLET THEO NHU CẦU =================
   Trước đây leaflet.js nằm trong <script> đồng bộ cuối trang: mạng chậm tới unpkg
   thì app.js phải chờ, trang trắng tới khi CDN trả lời hoặc hết giờ (đo được: CDN
   chậm 10 giây = trắng trang 10 giây). Giờ chỉ tải khi cần vẽ bản đồ. */
var leafletState="idle", leafletWaiters=[];
function loadLeaflet(cb){
  if(typeof L!=="undefined"){ leafletState="ready"; if(cb) cb(); return; }
  if(cb) leafletWaiters.push(cb);
  if(leafletState==="loading") return;
  leafletState="loading";
  var sc=document.createElement("script");
  sc.src="https://unpkg.com/leaflet@1.9.4/dist/leaflet.js";
  sc.async=true;
  var done=function(ok){
    if(leafletState!=="loading") return;
    leafletState=ok&&typeof L!=="undefined"?"ready":"failed";
    var ws=leafletWaiters; leafletWaiters=[]; ws.forEach(function(f){ try{ f(); }catch(e){} });
  };
  sc.onload=function(){ done(true); };
  sc.onerror=function(){ done(false); };
  setTimeout(function(){ done(false); },15000);
  document.head.appendChild(sc);
}
function hideProvMapLoading(){ var l=document.getElementById("mapProvLoading"); if(l) l.style.display="none"; }
function fitProvMap(){
  if(!provMap) return;
  try{ provMap.invalidateSize(); }catch(e){}
  try{
    if(provMapPts.length>1) provMap.fitBounds(provMapPts,{padding:[24,24]});
    else if(provMapPts.length===1) provMap.setView(provMapPts[0],12);
  }catch(e){}
}
function initProvMap(){
  var p=currentProv; if(!p) return;
  var el=document.getElementById("mapProv"); if(!el) return;
  if(typeof L==="undefined"){
    /* Leaflet tải theo nhu cầu (không chặn lần mở app đầu tiên). Đang tải thì chờ; tải lỗi mới hiện bản dự phòng. */
    if(leafletState!=="failed"){ loadLeaflet(initProvMap); return; }
    var fb=document.getElementById("mapProvFallback"); if(fb) fb.style.display="block"; el.style.display="none"; hideProvMapLoading(); return;
  }
  try{
    if(provMap && provMapFor===p.id){ hideProvMapLoading(); setTimeout(fitProvMap,60); setTimeout(fitProvMap,320); return; }
    if(provMap){ try{ provMap.remove(); }catch(e){} provMap=null; }
    provTilesLoaded=false;
    var center=[p.lat||10.8, p.lng||106.6];
    provMap=L.map("mapProv").setView(center,9);
    var tiles=L.tileLayer("https://server.arcgisonline.com/ArcGIS/rest/services/World_Street_Map/MapServer/tile/{z}/{y}/{x}",{maxZoom:18,attribution:"Tiles © Esri — Source: Esri, HERE, Garmin, © OpenStreetMap contributors, and the GIS User Community"});
    var failed=false;
    tiles.on("tileerror",function(){ if(!failed){ failed=true; var f2=document.getElementById("mapProvFallback"); if(f2) f2.style.display="block"; hideProvMapLoading(); } });
    tiles.on("load",function(){ provTilesLoaded=true; hideProvMapLoading(); });
    tiles.addTo(provMap);
    var pts=[];
    p.places.forEach(function(x){
      if(x.lat==null||x.lng==null) return;
      pts.push([x.lat,x.lng]);
      var note=x.approx?"<br/><b>Tọa độ xấp xỉ, cần kiểm lại</b>":"";
      L.marker([x.lat,x.lng]).addTo(provMap).bindPopup("<b>"+esc(x.name)+"</b><br/>"+esc(x.price||"")+note+"<br/><i>Kiểm "+(p.checked||"06/11/2026")+"</i>");
    });
    provMapPts=pts;
    provMapFor=p.id;
    /* Lần đầu mở, khung bản đồ có thể chưa có kích thước thật khi Leaflet khởi tạo
       (trang vừa hiện) nên fitBounds ngay sẽ ra zoom toàn khu vực. Fit ngay 1 lần,
       rồi fit lại sau khi invalidateSize ở 2 mốc 150ms/450ms để lần đầu cũng đúng khung tỉnh. */
    fitProvMap();
    setTimeout(fitProvMap,150);
    setTimeout(fitProvMap,450);
    observeProvMap();
  }catch(e){
    var f3=document.getElementById("mapProvFallback"); if(f3) f3.style.display="block"; el.style.display="none"; hideProvMapLoading();
  }
}
/* Làm mới bản đồ tỉnh: mở trang tỉnh bằng đường mở sâu từ tìm kiếm (nhảy thẳng
   xuống mục “Trời mưa thì đi đâu”) khiến Leaflet khởi tạo lúc khung bản đồ chưa
   được nhìn thấy — nền/ghim không hiện khi cuộn ngược lên đầu trang. Mỗi khi
   khung bản đồ lọt vào vùng nhìn thấy (hoặc trang tỉnh hiện ra), ép Leaflet đo
   lại kích thước + fit lại khung tỉnh; chưa có bản đồ thì khởi tạo lúc đó. */
var provTilesLoaded=false, provMapObserver=null;
function refreshProvMap(){
  if(!currentProv) return;
  var el=document.getElementById("mapProv"); if(!el) return;
  if(!provMap){ initProvMap(); return; }
  fitProvMap();
  setTimeout(fitProvMap,300);
  if(provTilesLoaded) hideProvMapLoading();
}
function observeProvMap(){
  var el=document.getElementById("mapProv"); if(!el) return;
  if(provMapObserver){ try{ provMapObserver.disconnect(); }catch(e){} provMapObserver=null; }
  if(typeof IntersectionObserver==="undefined") return;
  var main=document.getElementById("appMain");
  provMapObserver=new IntersectionObserver(function(entries){
    for(var i=0;i<entries.length;i++){ if(entries[i].isIntersecting) refreshProvMap(); }
  },{root:main||null,threshold:0.1});
  provMapObserver.observe(el);
}
/* --- Chi tiết địa danh / chỗ ở / món của 34 tỉnh --- */
function provItemHead(prov,title,sub){
  return '<div class="prov-hero"><h2 style="font-size:21px">'+esc(title)+'</h2><p>'+esc(sub)+'</p></div><div class="pad">';
}
function openProvPlace(provId,placeId){
  var prov=provById(provId); if(!prov) return;
  if(prov.id==="lam-dong" && placeById(placeId)){ openPlace(placeId); return; }
  var x=null; prov.places.forEach(function(i){ if(i.id===placeId) x=i; }); if(!x) return;
  var coordHtml = x.lat==null
    ? '<p class="muted"><b>Chưa có tọa độ</b> — điểm này chưa ghim được lên bản đồ. Địa chỉ ở trên là căn cứ để tìm đường.</p>'
    : '<p class="muted">Tọa độ: '+x.lat+", "+x.lng+(x.approx?' · <b>Tọa độ xấp xỉ, cần kiểm lại</b>':"")+' · <a href="https://www.openstreetmap.org/?mlat='+x.lat+"&mlon="+x.lng+'#map=15/'+x.lat+"/"+x.lng+'" target="_blank" rel="noopener" style="color:var(--green-d);font-weight:700">Mở trên OpenStreetMap</a></p>';
  document.getElementById("itemDetail").innerHTML =
    provItemHead(prov, x.name, clusterLabel(x.cluster)+" · "+(x.dist===0||x.dist==null?"Ngay trung tâm":("Cách trung tâm ~"+x.dist+" km"))+" · "+prov.name) +
    '<div style="display:flex;gap:8px;flex-wrap:wrap"><span class="badge badge-price">Khoảng giá — kiểm '+(prov.checked||"06/11/2026")+'</span>'+(x.approx&&x.lat!=null?'<span class="badge badge-unv">Tọa độ xấp xỉ, cần kiểm lại</span>':"")+(x.lat==null?'<span class="badge badge-soon">Chưa có tọa độ</span>':"")+'</div>'+
    '<div class="kv"><div class="cell"><div class="k">Giá vé / chi phí</div><div class="v" style="font-size:13.5px">'+esc(x.price||"—")+'</div></div><div class="cell"><div class="k">Giờ mở cửa</div><div class="v" style="font-size:13.5px">'+esc(x.hours||"—")+'</div></div><div class="cell"><div class="k">Thời gian gợi ý</div><div class="v" style="font-size:13.5px">'+esc(x.duration||"—")+'</div></div><div class="cell"><div class="k">Hợp với</div><div class="v" style="font-size:13.5px">'+esc(x.suitable||"—")+'</div></div></div>'+
    '<h3 style="font-size:15px;margin:14px 0 6px">Địa chỉ</h3><p class="muted" style="font-size:14px;color:var(--ink)">'+esc(x.address||"")+'</p>'+oldAreaBadge(x)+coordHtml+
    '<h3 style="font-size:15px;margin:16px 0 6px">Lưu ý</h3><div class="notebox">'+esc(x.note||"")+'</div>'+
    provItemActionsHtml("pplace",prov.id,x.id)+
    mReviewHtml(x.review_m, x.review_m_src, x.review_m_date)+
    reviewBoxHtml(reviewKey("place",prov.id,x.id))+
    '<p class="src">Nguồn: '+esc(x.source||"—")+' · kiểm '+(prov.checked||"06/11/2026")+'. Giá là khoảng giá tham khảo, kiểm lại trước ngày đi.</p></div>';
  show("item-detail");
  document.getElementById("topTitle").textContent=x.name;
  document.getElementById("topSub").textContent=prov.name+" · kiểm dữ liệu "+(prov.checked||"06/11/2026");
}
function openProvStay(provId,stayId){
  var prov=provById(provId); if(!prov) return;
  var s=null; prov.stays.forEach(function(i){ if(i.id===stayId) s=i; }); if(!s) return;
  if(prov.id==="lam-dong"){ var old=null; STAYS.forEach(function(o){ if(foldStr(o.name)===foldStr(s.name)) old=o; }); if(old){ openStay(old.id); return; } }
  document.getElementById("itemDetail").innerHTML =
    provItemHead(prov, s.name, (s.kind||"Chỗ ở")+" · "+clusterLabel(s.area)+" · "+prov.name) +
    '<div style="display:flex;gap:8px;flex-wrap:wrap"><span class="badge badge-unv">Chưa kiểm chứng — chưa đối tác — chưa thu phí</span><span class="badge badge-price">Khoảng giá — kiểm '+(prov.checked||"06/11/2026")+'</span></div>'+
    '<div class="kv"><div class="cell"><div class="k">Khoảng giá / đêm</div><div class="v" style="font-size:13.5px">'+esc(s.price||"—")+'</div></div><div class="cell"><div class="k">Khoảng cách</div><div class="v" style="font-size:13.5px">'+esc(s.dist||"—")+'</div></div><div class="cell"><div class="k">Hợp với</div><div class="v" style="font-size:13.5px">'+esc(s.suitable||"—")+'</div></div><div class="cell"><div class="k">Trạng thái</div><div class="v" style="font-size:13.5px">'+esc(s.status_text||"Giới thiệu sơ — tự kiểm tra giá/phòng trước khi đặt")+'</div></div></div>'+
    '<h3 style="font-size:15px;margin:14px 0 6px">Địa chỉ</h3><p class="muted" style="font-size:14px;color:var(--ink)">'+esc(s.address||"")+'</p>'+
    stayPhoneHtml(s,prov.name)+
    '<div class="notebox" style="margin-top:14px">App không nhận đặt phòng, không nhận tiền cho chỗ ở này.</div>'+
    provItemActionsHtml("pstay",prov.id,s.id)+
    mReviewHtml(null,null,null)+
    reviewBoxHtml(reviewKey("stay",prov.id,s.id))+
    '<p class="src">Nguồn: '+esc(s.source||"—")+' · kiểm '+(prov.checked||"06/11/2026")+'.</p></div>';
  show("item-detail");
  document.getElementById("topTitle").textContent=s.name;
  document.getElementById("topSub").textContent=prov.name+" · kiểm dữ liệu "+(prov.checked||"06/11/2026");
}
function openProvDish(provId,dishId){
  var prov=provById(provId); if(!prov) return;
  if(prov.id==="lam-dong" && dishById(dishId)){ openDish(dishId); return; }
  var d=null; prov.dishes.forEach(function(i){ if(i.id===dishId) d=i; }); if(!d) return;
  var rests=(d.restaurants||[]).map(function(r){
    return '<div class="card" style="margin-bottom:10px"><div class="body"><h3 style="font-size:15px">'+esc(r.name||"")+'</h3><p class="muted">'+esc(r.address||"")+'</p><p class="price-line">'+esc(r.price||"")+'</p></div></div>';
  }).join("");
  document.getElementById("itemDetail").innerHTML =
    provItemHead(prov, d.name, (d.meal||"")+" · "+(d.price||"")+" · "+prov.name) +
    '<div class="kv"><div class="cell"><div class="k">Khoảng giá</div><div class="v" style="font-size:13.5px">'+esc(d.price||"—")+'</div></div><div class="cell"><div class="k">Buổi ăn</div><div class="v" style="font-size:13.5px">'+esc(d.meal||"—")+'</div></div></div>'+
    '<h3 style="font-size:15px;margin:16px 0 10px">Quán tham khảo (có địa chỉ)</h3>'+(rests||'<p class="muted">Chưa có quán tham khảo trong dữ liệu.</p>')+
    provItemActionsHtml("pdish",prov.id,d.id)+
    mReviewHtml(d.review_m, d.review_m_src, d.review_m_date)+
    reviewBoxHtml(reviewKey("dish",prov.id,d.id))+
    '<p class="src">Nguồn: '+esc(d.source||"—")+' · khoảng giá — kiểm '+(prov.checked||"06/11/2026")+'. Hỏi giá trước khi gọi món.</p></div>';
  show("item-detail");
  document.getElementById("topTitle").textContent=d.name;
  document.getElementById("topSub").textContent=prov.name+" · kiểm dữ liệu "+(prov.checked||"06/11/2026");
}

/* ================= TÌM KIẾM: 34 TỈNH + MỌI ĐỊA DANH ================= */
function destSuggestions(q){
  var f=foldStr(q).trim(); var out=[];
  DESTINATIONS.forEach(function(d){
    if(!f || foldStr(d.name+" "+d.province).indexOf(f)>=0)
      out.push({type:"dest",id:d.id,name:d.name,title:d.name+(d.province&&foldStr(d.province)!==foldStr(d.name)?" · "+d.province:""),sub:"Đã có dữ liệu đầy đủ · "+regionLabel(d.region),soon:false,draft:false});
  });
  if(f && typeof PROV_DATA!=="undefined"){
    PROV_DATA.forEach(function(prov){
      prov.places.forEach(function(x){ if(wordMatch(x.name,q)) out.push({type:"pplace",id:prov.id+"|"+x.id,name:x.name,title:x.name,sub:"Địa danh ở "+prov.name,soon:false}); });
      prov.dishes.forEach(function(x){ if(wordMatch(x.name,q)) out.push({type:"pdish",id:prov.id+"|"+x.id,name:x.name,title:x.name,sub:"Món ăn ở "+prov.name,soon:false}); });
    });
  }
  return out.slice(0,8);
}
function pickAcDest(prefix,type,id){
  var inputId=prefix==="ts"?"tsDest":"wDestInput", listId=prefix==="ts"?"tsDestAc":"wDestAc";
  var title="";
  if(type==="dest"){ var d=DESTINATIONS.filter(function(x){return x.id===id;})[0]; if(!d) return; title=d.name; searchDestId=d.id; }
  else {
    var parts=id.split("|"); var prov=provById(parts[0]); if(!prov) return;
    var arr=type==="pplace"?prov.places:prov.dishes; var found=null;
    arr.forEach(function(x){ if(x.id===parts[1]) found=x; }); if(!found) return;
    title=found.name; searchDestId=prov.appId;
  }
  var inp=document.getElementById(inputId); if(inp) inp.value=title;
  syncDestInputs(title,inputId);
  hideAc(document.getElementById(listId));
  if(prefix==="w" && type==="dest"){ wiz.dest=id; }
}
function resolveDestText(text){
  var f=foldStr(text).trim(); if(!f) return null;
  if(f==="tphcm"||f.indexOf("ho chi minh")>=0||f==="sai gon") return {type:"dest",id:"tp-ho-chi-minh"};
  var i,d;
  for(i=0;i<DESTINATIONS.length;i++){ d=DESTINATIONS[i]; if(foldStr(d.name)===f||foldStr(d.name).indexOf(f)>=0||f.indexOf(foldStr(d.name))>=0) return {type:"dest",id:d.id}; }
  if(typeof PROV_DATA!=="undefined"){
    for(i=0;i<PROV_DATA.length;i++){ var prov=PROV_DATA[i];
      for(var j=0;j<prov.places.length;j++){ if(wordMatch(prov.places[j].name,text)) return {type:"pplace",prov:prov.id,id:prov.places[j].id}; }
    }
    for(i=0;i<PROV_DATA.length;i++){ var prov2=PROV_DATA[i];
      for(var k=0;k<prov2.dishes.length;k++){ if(wordMatch(prov2.dishes[k].name,text)) return {type:"pdish",prov:prov2.id,id:prov2.dishes[k].id}; }
    }
  }
  return null;
}
function applyProvRouteHighlight(origin){
  var note=document.getElementById("provRouteNote");
  var sg=document.getElementById("provRouteSG"), hn=document.getElementById("provRouteHN");
  if(sg) sg.classList.remove("route-hl"); if(hn) hn.classList.remove("route-hl");
  if(!note) return null;
  if(isSGOrigin(origin)){ if(sg) sg.classList.add("route-hl"); note.innerHTML="<b>Tuyến từ "+esc(origin)+" đã được làm nổi bật bên dưới</b> — kèm khoảng giá + thời gian đã kiểm."; return sg; }
  if(isHNOrigin(origin)){ if(hn) hn.classList.add("route-hl"); note.innerHTML="<b>Tuyến từ "+esc(origin)+" đã được làm nổi bật bên dưới</b> — kèm khoảng giá + thời gian đã kiểm."; return hn; }
  note.innerHTML="<b>Chưa có tuyến riêng từ "+esc(origin)+" trong dữ liệu đã kiểm.</b> Xem tuyến từ TP.HCM / Hà Nội bên dưới để tham khảo cách đi tiếp — app không đoán giá cho tuyến chưa tra.";
  return note;
}
function openDestDetailToRoutes(origin){
  origin=resolveOrigin(origin);
  syncOriginInputs(origin,null);
  openProvDetail("lam-dong");
  setProvSeg("diden");
  var target=applyProvRouteHighlight(origin);
  setTimeout(function(){ if(target) target.scrollIntoView({block:"start",behavior:"smooth"}); },90);
}
function doTripSearch(){
  var destInp=document.getElementById("tsDest");
  var orgInp=document.getElementById("tsOrigin");
  var originTyped=orgInp?orgInp.value.trim():"";
  var origin=resolveOrigin(orgInp?orgInp.value:"");
  syncOriginInputs(originTyped?orgInp.value:origin, null);
  var msg=document.getElementById("tsMsg"); if(msg){ msg.classList.remove("show"); msg.innerHTML=""; }
  var text=(destInp?destInp.value:"").trim();
  if(!text){ toast("Gõ điểm đến trước đã — ví dụ: Đà Lạt, Cao Bằng, Eo Gió"); if(destInp) destInp.focus(); return; }
  var r=resolveDestText(text);
  if(!r){ showSoonMsg(text); return; }
  if(r.type==="pplace"){ openProvPlace(r.prov,r.id); return; }
  if(r.type==="pdish"){ openProvDish(r.prov,r.id); return; }
  var d=DESTINATIONS.filter(function(x){return x.id===r.id;})[0];
  if(!d){ showSoonMsg(text); return; }
  searchDestId=d.id; syncDestInputs(d.name,"tsDest");
  var prov=provById(d.provId||d.id);
  if(prov && prov.id==="lam-dong"){ openDestDetailToRoutes(origin); return; }
  if(prov){
    openProvDetail(prov.id);
    setProvSeg("diden");
    applyProvRouteHighlight(origin);
    return;
  }
  showSoonMsg(d.name);
}
/* Khớp theo TỪ có nghĩa: từ gõ có dấu phải khớp đúng từ có dấu trong tên
   (gõ "mưa" không ra "múa rối"); từ gõ không dấu khớp theo bản bỏ dấu.
   Không khớp một phần âm tiết, không khớp sang tỉnh khác ngoài phạm vi đang xem. */
function nameTokens(s,keepAccents){
  var t=String(s||"").toLowerCase();
  if(keepAccents) t=t.normalize("NFC"); else t=foldStr(t);
  return t.split(/[^a-z0-9\u00c0-\u024f\u1e00-\u1eff]+/).filter(function(w){ return !!w; });
}
function wordMatch(name,q){
  var qa=nameTokens(q,true), qf=nameTokens(q,false);
  if(!qa.length||qa.length!==qf.length) return false;
  var na=nameTokens(name,true), nf=nameTokens(name,false);
  for(var i=0;i<qa.length;i++){
    if(/[^\x00-\x7f]/.test(qa[i])){ if(na.indexOf(qa[i])<0) return false; }
    else if(nf.indexOf(qf[i])<0) return false;
  }
  return true;
}
/* Tìm mục trú mưa: “Trời mưa thì đi đâu” là 1 mục trong cẩm nang từng tỉnh chứ
   không phải tên địa danh/món/chỗ ở, nên phải khớp riêng theo đúng từ “mưa”
   (có dấu, khớp từng từ như wordMatch) — không khớp vần sang “múa rối”. */
function isRainQuery(q){
  if(wordMatch("Trời mưa thì đi đâu",q)) return true;
  return nameTokens(q,true).indexOf("mưa")>=0;
}
function rainPriorityProvId(){
  if(typeof currentProv!=="undefined" && currentProv) return currentProv.id;
  var p=(typeof provById==="function")?provById(typeof searchDestId!=="undefined"?searchDestId:"dalat"):null;
  return p?p.id:"lam-dong";
}
function rainySearchHits(q){
  if(typeof PROV_DATA==="undefined"||!isRainQuery(q)) return [];
  var scope=null;
  var sc=PROV_DATA.filter(function(prov){ return wordMatch(prov.name+" "+prov.province,q); });
  if(sc.length===1) scope=sc[0];
  var hits=PROV_DATA.filter(function(prov){ return prov.rainy&&prov.rainy.points&&prov.rainy.points.length&&(!scope||prov.id===scope.id); });
  var prio=rainPriorityProvId();
  hits.sort(function(a,b){ return (a.id===prio?0:1)-(b.id===prio?0:1); });
  return hits;
}
function rainySearchCard(prov){
  var nm=prov.id==="lam-dong"?"Đà Lạt":prov.name;
  var pts=prov.rainy.points.slice(0,3).join(" · ")+(prov.rainy.points.length>3?"…":"");
  return '<div class="rowcard"><button style="all:unset;display:block;width:100%;cursor:pointer;text-align:left" onclick="openProvRainy(\''+prov.id+'\')"><div class="rc-body"><h3>Trời mưa thì đi đâu — '+esc(nm)+'</h3><p class="muted">Điểm trú mưa, có mái che ở '+esc(nm)+': '+esc(pts)+'</p><p class="small">Bấm để mở đúng mục “Trời mưa thì đi đâu” trong cẩm nang '+esc(nm)+'.</p></div></button></div>';
}
/* 1 giá hiện hành cho dòng chính của thẻ — mâu thuẫn giữa các nguồn giữ ở trang chi tiết */
function priceShort(txt){
  if(!txt) return "";
  var t=String(txt);
  var seg=t.split(";")[0];
  if(/miễn phí/i.test(seg) && !/\d/.test(seg)) return "Miễn phí";
  var m=seg.match(/\d{1,3}(?:\.\d{3})+\s*[–-]\s*\d{1,3}(?:\.\d{3})+\s*đ/)||t.match(/\d{1,3}(?:\.\d{3})+\s*[–-]\s*\d{1,3}(?:\.\d{3})+\s*đ/)||seg.match(/\d{1,3}(?:\.\d{3})+\s*đ/)||seg.match(/\d+\s*đ/);
  if(m) return m[0].replace(/\s+/g," ");
  if(/miễn phí/i.test(t)) return "Miễn phí";
  return seg.length>64?seg.slice(0,64)+"…":seg;
}
/* Ô tìm nhanh ở Khám phá: tìm cả 34 tỉnh (listener này chạy sau listener cũ nên kết quả này là kết quả cuối) */
document.getElementById("searchInput").addEventListener("input",function(){
  var q=this.value.trim(); var box=document.getElementById("searchResults");
  if(!q) return;
  var out=[];
  /* Phạm vi: nếu từ khóa khớp đúng tên 1 tỉnh/thành thì kết quả chỉ gồm mục
     của đúng tỉnh đó. Khớp theo từng từ có nghĩa (wordMatch) nên gõ "mưa"
     không ra "Nhà hát múa rối nước" — "múa" khác "mưa". */
  var scopeProv=null;
  if(typeof PROV_DATA!=="undefined"){
    var scopeCands=PROV_DATA.filter(function(prov){ return wordMatch(prov.name+" "+prov.province,q); });
    if(scopeCands.length===1) scopeProv=scopeCands[0];
  }
  DESTINATIONS.forEach(function(d){ if(wordMatch(d.name+" "+d.province,q) && (!scopeProv || (d.provId||d.id)===scopeProv.id)) out.push(destCard(d)); });
  if(typeof PROV_DATA!=="undefined"){
    PROV_DATA.forEach(function(prov){
      if(scopeProv && prov.id!==scopeProv.id) return;
      prov.places.forEach(function(x){ if(wordMatch(x.name,q)) out.push(provPlaceCard(x,prov)); });
      prov.dishes.forEach(function(x){ if(wordMatch(x.name,q)) out.push(provDishCard(x,prov)); });
      prov.stays.forEach(function(x){ if(wordMatch(x.name,q)) out.push(provStayCard(x,prov)); });
    });
  }
  var rainOut=rainySearchHits(q).map(rainySearchCard);
  var allOut=rainOut.concat(out);
  var gap=missingAreaFor(q);
  box.innerHTML = gap ? '<div class="empty"><p style="margin:0 0 8px"><b>'+esc(gap.name)+' chưa có trong app.</b> Sau sáp nhập 01/07/2025, nơi này thuộc '+esc(gap.provName)+', nhưng dữ liệu hiện mới phủ '+esc(gap.covered)+'. Đội Bụi Code đang bổ sung.</p><button class="btn btn-ghost btn-block" onclick="openProvDetail(\''+gap.prov+'\')">Xem cẩm nang '+esc(gap.provName)+' hiện có</button></div>'+(allOut.length?'<h3 class="sec-title" style="font-size:15px;margin:14px 0 8px">Kết quả gần đúng khác</h3><div class="listcol">'+allOut.slice(0,10).join("")+'</div>':'')
    : allOut.length ? '<div class="listcol">'+allOut.slice(0,30).join("")+'</div>'
    : '<div class="empty"><p class="muted" style="margin:0">Không thấy kết quả cho “'+esc(q)+'”. Thử “Eo Gió”, “chùa Keo”, “Cao Bằng” hoặc “Langbiang”.</p></div>';
});
/* Điểm nổi tiếng của vùng mới sáp nhập mà dữ liệu chưa có: tìm thì báo thẳng là
   chưa có + dẫn sang tỉnh mới, thay vì "không thấy kết quả" như thể nơi đó không tồn tại. */
var MISSING_AREAS=[
  {keys:["phu quoc","duong dong","an thoi","hon thom"],name:"Phú Quốc",prov:"an-giang",provName:"An Giang",covered:"khu vực Châu Đốc, Long Xuyên, Hà Tiên, Rạch Giá"},
  {keys:["mui ne","phan thiet","bau trang","hon rom","ta cu","ke ga"],name:"Mũi Né / Phan Thiết",prov:"lam-dong",provName:"Lâm Đồng",covered:"Đà Lạt"},
  {keys:["phong nha","dong hoi","son doong","thien duong","hang en","nhat le"],name:"Phong Nha / Đồng Hới",prov:"quang-tri",provName:"Quảng Trị",covered:"khu vực Quảng Trị cũ (Đông Hà)"},
  {keys:["dong van","ma pi leng","ma pi leng","meo vac","lung cu","ha giang","quan ba","yen minh","hoang su phi"],name:"Hà Giang (Đồng Văn, Mã Pì Lèng)",prov:"tuyen-quang",provName:"Tuyên Quang",covered:"khu vực Tuyên Quang cũ"},
  {keys:["mang den","kon tum","kon plong"],name:"Măng Đen / Kon Tum",prov:"quang-ngai",provName:"Quảng Ngãi",covered:"khu vực Quảng Ngãi cũ"},
  {keys:["mu cang chai","nghia lo","yen bai"],name:"Mù Cang Chải / Yên Bái",prov:"lao-cai",provName:"Lào Cai",covered:"Sa Pa, Bắc Hà và một phần Yên Bái cũ"},
  {keys:["con dao"],name:"Côn Đảo",prov:"tp-ho-chi-minh",provName:"TP Hồ Chí Minh",covered:"Sài Gòn, Bình Dương cũ, Vũng Tàu"},
  {keys:["tam dao","mai chau","hoa binh","vinh phuc"],name:"Tam Đảo / Mai Châu",prov:"phu-tho",provName:"Phú Thọ",covered:"khu vực Phú Thọ cũ"},
  {keys:["soc trang","hau giang","chua doi","chua som rong"],name:"Sóc Trăng / Hậu Giang",prov:"can-tho",provName:"Cần Thơ",covered:"khu vực Cần Thơ cũ"}
];
function missingAreaFor(q){
  var f=" "+foldStr(q).replace(/[^a-z0-9 ]+/g," ").replace(/\s+/g," ").trim()+" ";
  for(var i=0;i<MISSING_AREAS.length;i++){
    var a=MISSING_AREAS[i];
    for(var j=0;j<a.keys.length;j++){ if(f.indexOf(" "+a.keys[j]+" ")>=0) return a; }
  }
  return null;
}
/* Nút Tìm của chính ô tìm Khám phá (không phải ô tìm mới): mở thẳng chi tiết kết quả khớp nhất */
function exploreSearchGo(){
  var inp=document.getElementById("searchInput");
  var text=inp?inp.value.trim():"";
  if(!text){ toast("Gõ điểm đến trước đã — ví dụ: Đà Lạt, Nha Trang, Hội An"); if(inp) inp.focus(); return; }
  if(isRainQuery(text)){
    /* Truy vấn trú mưa: hiện danh sách kết quả tìm kiếm trước (các thẻ
       "Trời mưa thì đi đâu — <tỉnh>"), người dùng bấm vào 1 thẻ mới mở trang tỉnh. */
    var inpEl=document.getElementById("searchInput");
    if(inpEl) inpEl.dispatchEvent(new Event("input",{bubbles:true}));
    var rbox=document.getElementById("searchResults");
    if(rbox && rbox.innerHTML && typeof rbox.scrollIntoView==="function") rbox.scrollIntoView({block:"start",behavior:"smooth"});
    else toast("Chưa thấy kết quả trú mưa cho từ khóa này");
    return;
  }
  var r=resolveDestText(text);
  if(!r){ var box=document.getElementById("searchResults"); if(box) box.scrollIntoView({block:"nearest",behavior:"smooth"}); return; }
  if(r.type==="pplace"){ openProvPlace(r.prov,r.id); return; }
  if(r.type==="pdish"){ openProvDish(r.prov,r.id); return; }
  if(r.type==="place"){ openPlace(r.id); return; }
  if(r.type==="dish"){ openDish(r.id); return; }
  var rid=(r.id==="tphcm")?"tp-ho-chi-minh":r.id;
  var d=DESTINATIONS.filter(function(x){return x.id===rid;})[0];
  var prov=d?provById(d.provId||d.id):provById(rid);
  if(prov){
    openProvDetail(prov.id);
    return;
  }
  var box2=document.getElementById("searchResults"); if(box2) box2.scrollIntoView({block:"nearest",behavior:"smooth"});
}
document.getElementById("searchGo").addEventListener("click",exploreSearchGo);
document.getElementById("searchInput").addEventListener("keydown",function(e){ if(e.key==="Enter"){ e.preventDefault(); exploreSearchGo(); } });



/* ================= 4 BƯỚC LẬP CHUYẾN ================= */
var wiz={step:1, dest:"dalat", origin:"", budget:"vua", style:"cap_doi", days:[], editingId:null, editStart:"", editEnd:"", editTitle:"", titleLoaded:false};
function wizDestProv(){ return provById(wiz.dest); }
function wizDestName(){ var d=DESTINATIONS.filter(function(x){return x.id===wiz.dest;})[0]; return d?d.name:"Đà Lạt"; }
function wizTplKey(n){
  var key=n<=2?"2N1D":(n===3?"3N2D":"4N3D");
  if(wiz.dest==="dalat") return key;
  var pv=wizDestProv();
  if(pv && pv.itins && !pv.itins[key]){ var ks=Object.keys(pv.itins); if(ks.length) return ks[0]; }
  return key;
}
function wizPickDest(id){
  wiz.dest=id; searchDestId=id;
  var d=DESTINATIONS.filter(function(x){return x.id===id;})[0];
  if(d){ var wd=document.getElementById("wDestInput"); if(wd) wd.value=d.name; syncDestInputs(d.name,"wDestInput"); }
  document.querySelectorAll("[data-wdest]").forEach(function(b){ b.classList.toggle("on", b.getAttribute("data-wdest")===id); });
  fillWizAddSel(); updateWDaysInfo();
}
function startPlanForProv(provId){
  var p=provById(provId); if(!p) return;
  searchDestId=p.appId;
  searchDestText=(p.appId==="dalat"?"Đà Lạt":p.name);
  syncDestInputs(searchDestText,null);
  startPlan();
}
function fillWizAddSel(){
  var sel=document.getElementById("wAddSel"); if(!sel) return;
  if(wiz.dest==="dalat"){
    sel.innerHTML = PLACES.map(function(p){ return '<option value="place:'+p.id+'">Địa danh — '+esc(p.name)+'</option>'; }).join("") + DISHES.map(function(d){ return '<option value="dish:'+d.id+'">Món ăn — '+esc(d.name)+'</option>'; }).join("");
    return;
  }
  var prov=wizDestProv(); if(!prov){ sel.innerHTML=""; return; }
  sel.innerHTML = prov.places.map(function(p){ return '<option value="pplace:'+prov.id+'|'+p.id+'">Địa danh — '+esc(p.name)+'</option>'; }).join("") + prov.dishes.map(function(d){ return '<option value="pdish:'+prov.id+'|'+d.id+'">Món ăn — '+esc(d.name)+'</option>'; }).join("");
}
function isoDate(d){ var m=("0"+(d.getMonth()+1)).slice(-2); var dd=("0"+d.getDate()).slice(-2); return d.getFullYear()+"-"+m+"-"+dd; }
function pickDate(id){ var el=document.getElementById(id); if(!el) return; try{ if(typeof el.showPicker==="function"){ el.showPicker(); return; } }catch(e){} el.focus(); try{ el.click(); }catch(e){} }
function addDays(ds,n){ var d=new Date(ds+"T00:00:00"); d.setDate(d.getDate()+n); return isoDate(d); }
function daysBetween(a,b){ return Math.round((new Date(b+"T00:00:00")-new Date(a+"T00:00:00"))/86400000)+1; }
function fmtDate(ds){ if(!ds) return ""; var p=ds.split("-"); return p[2]+"/"+p[1]+"/"+p[0]; }
function startPlan(){
  wiz={step:1,dest:(searchDestId||"dalat"),origin:resolveOrigin(searchOrigin),budget:"vua",style:"cap_doi",days:[],editingId:null,editStart:"",editEnd:"",editTitle:"",titleLoaded:false};
  var wd=document.getElementById("wDestInput"); if(wd) wd.value=(searchDestId==="dalat"||!searchDestText)?"Đà Lạt":searchDestText;
  var wo=document.getElementById("wOriginInput"); if(wo) wo.value=searchOrigin||"";
  var today=new Date(); var s=new Date(today.getTime()+7*86400000); var e=new Date(today.getTime()+9*86400000);
  document.getElementById("wStart").value=isoDate(s);
  document.getElementById("wEnd").value=isoDate(e);
  document.getElementById("wDestList").innerHTML = DESTINATIONS.map(function(d){
    var p=provById(d.provId||d.id);
    var cnt=p?(p.places.length+" địa danh · "+p.stays.length+" chỗ ở · "+p.dishes.length+" món"):"";
    return '<button class="optcard'+(wiz.dest===d.id?" on":"")+'" data-wdest="'+d.id+'" onclick="wizPickDest(\''+d.id+'\')">'+(d.img?'<img src="'+d.img+'" alt="'+esc(d.name)+'" style="width:64px;height:64px;border-radius:12px;object-fit:cover" />':"")+'<span style="flex:1"><h3>'+esc(d.name)+' · '+esc(d.province)+'</h3><span class="muted">Đã có đủ dữ liệu'+(cnt?(" — "+cnt):"")+' — lên được lịch trình ngay.</span></span></button>';
  }).join("");
  document.getElementById("wBudgetList").innerHTML = BUDGETS.map(function(b){
    return '<button class="optcard'+(wiz.budget===b.id?" on":"")+'" data-wbudget="'+b.id+'" onclick="wizPickBudget(\''+b.id+'\')"><span style="flex:1"><h3>'+esc(b.label)+' — '+fmt(b.per)+' / người</h3><span class="muted">'+esc(b.desc)+'</span></span></button>';
  }).join("");
  document.getElementById("wStyleList").innerHTML = STYLES.map(function(s){
    return '<button class="optcard'+(wiz.style===s.id?" on":"")+'" data-wstyle="'+s.id+'" onclick="wizPickStyle(\''+s.id+'\')"><span style="flex:1"><h3>'+esc(s.label)+'</h3></span></button>';
  }).join("");
  fillWizAddSel();
  updateWDaysInfo(); wizShowStep(1);
  navStack=[]; show("plan",false);
}
function wizPickBudget(id){ wiz.budget=id; document.querySelectorAll("[data-wbudget]").forEach(function(b){ b.classList.toggle("on", b.getAttribute("data-wbudget")===id); }); }
function wizPickStyle(id){ wiz.style=id; document.querySelectorAll("[data-wstyle]").forEach(function(b){ b.classList.toggle("on", b.getAttribute("data-wstyle")===id); }); }
function updateWDaysInfo(){
  var s=document.getElementById("wStart").value, e=document.getElementById("wEnd").value, el=document.getElementById("wDaysInfo");
  if(!s||!e){ el.textContent=""; return; }
  var n=daysBetween(s,e);
  if(n<1){ el.textContent="Ngày về đang trước ngày đi — kiểm lại giúp em."; return; }
  var key=wizTplKey(n);
  var lbl=wiz.dest==="dalat"?ITINS[key].label:itinLabel(key);
  el.textContent="Chuyến "+n+" ngày ("+fmtDate(s)+" → "+fmtDate(e)+") — sẽ gợi ý theo lịch trình mẫu "+lbl+" của "+wizDestName()+".";
}
document.getElementById("wStart").addEventListener("change",updateWDaysInfo);
document.getElementById("wEnd").addEventListener("change",updateWDaysInfo);
function wizShowStep(n){
  wiz.step=n;
  document.querySelectorAll(".wstep").forEach(function(w){ w.classList.toggle("active", Number(w.getAttribute("data-wstep"))===n); });
  document.querySelectorAll("#wSteps .st").forEach(function(s,i){ s.classList.toggle("on", i<n); });
  document.getElementById("wBack").style.visibility = n>1 ? "visible":"hidden";
  document.getElementById("wNext").textContent = n===4 ? "Lưu chuyến này" : "Tiếp tục";
  window.scrollTo(0,0);
  document.getElementById("appMain").scrollTop=0;
}
function parsePriceSnap(txt){
  if(!txt) return null;
  var t=String(txt);
  var m=t.match(/\d{1,3}(?:\.\d{3})+/);
  if(m) return Number(m[0].replace(/\./g,""));
  var m2=t.match(/(\d+)\s*(?:đ|đồng)/);
  if(m2) return Number(m2[1]);
  if(/miễn phí/i.test(t)) return 0;
  return null;
}
function buildWizDays(){
  var woEl=document.getElementById("wOriginInput");
  wiz.origin=resolveOrigin(woEl?woEl.value:searchOrigin);
  syncOriginInputs(woEl&&woEl.value.trim()?woEl.value:wiz.origin,null);
  var s=document.getElementById("wStart").value, e=document.getElementById("wEnd").value;
  var n=Math.max(1,daysBetween(s,e));
  /* Đang sửa chuyến mà ngày không đổi: giữ nguyên lịch trình đã có, không dựng lại từ mẫu */
  if(wiz.editingId && wiz.days.length===n && s===wiz.editStart && e===wiz.editEnd){
    fillWizAddSel();
    if(!wiz.titleLoaded){ document.getElementById("wTitle").value=wiz.editTitle||""; wiz.titleLoaded=true; }
    document.getElementById("wAddDay").innerHTML=wiz.days.map(function(d){ return '<option value="'+d.day_no+'">Ngày '+d.day_no+'</option>'; }).join("");
    renderWizDays();
    return;
  }
  var key=wizTplKey(n);
  wiz.days=[];
  if(wiz.dest==="dalat"){
    var tpl=ITINS[key].days;
    for(var d=0; d<n; d++){
      var items=[];
      var srcDay=tpl[Math.min(d,tpl.length-1)]||[];
      if(d<tpl.length){
        srcDay.forEach(function(seg){
          seg.refs.forEach(function(r){
            var kind=kindOfRef(r); var info=refInfo(kind,r); if(!info) return;
            items.push({kind:kind, ref_id:r, title:info.name, gia_luc_lap:info.price, session:seg.s, note:seg.t, done:false});
          });
          if(seg.refs.length===0) items.push({kind:"note", ref_id:"", title:seg.t, gia_luc_lap:0, session:seg.s, note:"", done:false});
        });
      }
      wiz.days.push({day_no:d+1, date:addDays(s,d), items:items});
    }
  } else {
    var prov=wizDestProv();
    var ptpl=(prov && prov.itins && prov.itins[key]) ? prov.itins[key] : [];
    for(var d2=0; d2<n; d2++){
      var items2=[];
      if(d2<ptpl.length){
        ptpl[d2].forEach(function(seg){
          var ganIds=(seg.gan||"").split(",").map(function(g){ return g.trim(); }).filter(function(g){ return !!g; });
          var linked=[];
          if(prov){ ganIds.forEach(function(gid){ prov.places.forEach(function(pl){ if(pl.id===gid) linked.push(pl); }); }); }
          if(linked.length){
            linked.forEach(function(pl){
              items2.push({kind:"pplace", ref_id:"", title:pl.name, gia_luc_lap:parsePriceSnap(pl.price), session:seg.s||"", note:seg.t||"", done:false});
            });
          } else {
            items2.push({kind:"note", ref_id:"", title:seg.t||"", gia_luc_lap:0, session:seg.s||"", note:"", done:false});
          }
        });
      }
      wiz.days.push({day_no:d2+1, date:addDays(s,d2), items:items2});
    }
  }
  fillWizAddSel();
  document.getElementById("wTitle").value=wizDestName()+" — "+n+" ngày "+(n-1)+" đêm · "+document.getElementById("wPeople").value+" người";
  var daySel=document.getElementById("wAddDay");
  daySel.innerHTML=wiz.days.map(function(d){ return '<option value="'+d.day_no+'">Ngày '+d.day_no+'</option>'; }).join("");
  renderWizDays();
}
function wizEstimate(){
  var total=0, unknown=0;
  wiz.days.forEach(function(d){ d.items.forEach(function(it){ if(it.gia_luc_lap==null) unknown++; else total+=Number(it.gia_luc_lap||0); }); });
  return {total:total, unknown:unknown};
}
function wizItemPriceText(it){
  if(it.gia_luc_lap==null) return "Chưa có giá — kiểm lại trước khi đi";
  if(it.gia_luc_lap) return "Ước tính "+fmt(it.gia_luc_lap)+((it.kind==="dish"||it.kind==="pdish")?" / phần hoặc nồi":" / người");
  return "Miễn phí / việc tự do";
}
function parseRangeVal(txt){
  if(!txt) return null;
  var t=String(txt).replace(/~/g,"");
  function num(x){ return Number(String(x).replace(/\./g,"")); }
  var m=t.match(/(\d{1,3}(?:\.\d{3})+|\d+)\s*[–-]\s*(\d{1,3}(?:\.\d{3})+|\d+)/);
  if(m) return [num(m[1]), num(m[2])];
  var m2=t.match(/(\d{1,3}(?:\.\d{3})+|\d+)\s*đ/);
  if(m2) return [num(m2[1]), num(m2[1])];
  return null;
}
function pickByBudget(range,budgetId){
  if(!range) return 0;
  if(budgetId==="thap") return range[0];
  if(budgetId==="cao") return range[1];
  return Math.round((range[0]+range[1])/2);
}
/* Tổng 1 người = vé+ăn theo lịch trình + di chuyển tới điểm đến + chỗ ở.
   Di chuyển + chỗ ở lấy từ bảng chi phí đã kiểm của chính tỉnh đó (cùng nguồn
   với bảng tổng quan trang tỉnh): di chuyển = dòng tuyến đầu (khứ hồi; dòng
   ghi "/chiều" thì nhân đôi), chỗ ở = dòng "Ở..." vốn là phần 1 người khi
   chia đôi phòng cho 2 đêm -> quy về số đêm của chuyến và chia theo số người. */
function tripComponents(prov,budgetId,nights,people,origin,estTotal){
  var transport=0, lodging=0, ok=false;
  people=Math.max(1,people||1); nights=Math.max(0,nights||0);
  if(prov && prov.cost && prov.cost.length){
    var rows=prov.cost.filter(function(c){ return (c.label||"").toLowerCase().indexOf("tổng")<0 && (c.label||"").toLowerCase().indexOf("nếu ")!==0; });
    var tRow=null, sRow=null;
    rows.forEach(function(c){ var lb=(c.label||"").toLowerCase(); if(!sRow && lb.indexOf("ở")===0) sRow=c; });
    if(isHNOrigin(origin||"")){ prov.cost.forEach(function(c){ if(!tRow && (c.label||"").indexOf("Hà Nội")>=0) tRow=c; }); }
    if(!tRow && rows.length) tRow=rows[0]===sRow&&rows.length>1?rows.filter(function(c){return c!==sRow;})[0]:rows[0];
    if(tRow){ var tr=parseRangeVal(tRow.value); if(tr){ transport=pickByBudget(tr,budgetId); if(/\/chiều/.test(tRow.value)) transport*=2; ok=true; } }
    if(sRow){ var sr=parseRangeVal(sRow.value); if(sr){ var share2=pickByBudget(sr,budgetId); lodging=nights?Math.round(share2*nights/people):0; } }
  }
  return {base:estTotal, transport:transport, lodging:lodging, total:estTotal+transport+lodging, ok:ok};
}
/* Chỉ hiện khi tổng ước tính 1 người thấp hơn ngân sách 1 người đã chọn:
   giải thích là còn dư trong ngân sách, không phải tính thiếu. */
function underBudgetNoteHtml(total,perBudget){
  if(perBudget && total>0 && total<perBudget) return '<p style="font-weight:700;color:var(--green-d)">Ước tính thấp hơn ngân sách bạn chọn — bạn còn dư trong ngân sách.</p>';
  return "";
}
function totalNoteHtml(comp,destName,nights,people){
  return 'Vé tham quan + ăn uống theo lịch trình: <b style="color:var(--ink)">'+fmt(comp.base)+'</b> · Di chuyển tới '+esc(destName)+': <b style="color:var(--ink)">'+fmt(comp.transport)+'</b> · Chỗ ở '+nights+' đêm (chia theo '+people+' người): <b style="color:var(--ink)">'+fmt(comp.lodging)+'</b>.<br/>Đã gồm vé tham quan, ăn uống, di chuyển tới điểm đến và chỗ ở. Chưa gồm chi tiêu cá nhân.';
}
function renderWizDays(){
  var people=Number(document.getElementById("wPeople").value||2);
  var bud=BUDGETS.filter(function(b){return b.id===wiz.budget;})[0];
  var est=wizEstimate();
  document.getElementById("wSummary").innerHTML =
    '<div class="statgrid" style="margin-bottom:14px"><div class="cell"><b>'+wiz.days.length+' ngày</b><span>Số ngày</span></div><div class="cell"><b>'+people+' người</b><span>Số người</span></div><div class="cell"><b>'+fmt(bud.per*people)+'</b><span>Ngân sách ('+esc(bud.label.toLowerCase())+')</span></div></div>'+
    '<p class="muted" style="margin:0 0 8px">Xuất phát từ <b style="color:var(--ink)">'+esc(wiz.origin||"TP.HCM")+'</b> → '+esc(wizDestName())+' — mục “Đi đến” trong chuyến sẽ dùng tuyến từ điểm xuất phát này.</p>'+
    (function(){ var comp=tripComponents(wizDestProv(), wiz.budget, Math.max(0,wiz.days.length-1), people, wiz.origin, est.total); return '<div class="bigmoney"><div class="bm-k">TỔNG ƯỚC TÍNH CẢ CHUYẾN — 1 NGƯỜI</div><div class="bm-v">'+fmt(comp.total)+'/người</div>'+underBudgetNoteHtml(comp.total,bud.per)+'<p>'+totalNoteHtml(comp, wizDestName(), Math.max(0,wiz.days.length-1), people)+(est.unknown?(' Chưa tính '+est.unknown+' mục <b style="color:var(--ink)">chưa có giá</b> trong dữ liệu — các mục đó ghi rõ “chưa có giá” ở từng ngày bên dưới, không tính là 0đ.'):"")+' Giá từng điểm được ghi lại tại lúc lập chuyến, chuyến đã lưu không đổi khi cẩm nang cập nhật giá.</p></div>'; })();
  document.getElementById("wDays").innerHTML = wiz.days.map(function(d,di){
    var items=d.items.map(function(it,ii){
      return '<div class="titem"><span class="sess">'+esc(it.session||"Tự do")+'</span><div class="ti-body"><b>'+esc(it.title)+'</b><span>'+wizItemPriceText(it)+'</span></div><button class="icon-btn danger" aria-label="Bớt điểm này" onclick="wizRemoveItem('+di+','+ii+')"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"><path d="M3 6h18M8 6V4a1 1 0 0 1 1-1h6a1 1 0 0 1 1 1v2m3 0v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6"/></svg></button></div>';
    }).join("");
    return '<div class="dayblock"><h3>Ngày '+d.day_no+' · '+fmtDate(d.date)+'</h3>'+(items||'<p class="muted" style="margin:0">Chưa có điểm nào — thêm ở ô bên dưới.</p>')+'</div>';
  }).join("");
}
function wizRemoveItem(di,ii){ wiz.days[di].items.splice(ii,1); renderWizDays(); }
function planAddItem(){
  var raw=document.getElementById("wAddSel").value;
  var dayNo=Number(document.getElementById("wAddDay").value||1);
  if(raw.indexOf("pplace:")===0 || raw.indexOf("pdish:")===0){
    var isPl=raw.indexOf("pplace:")===0;
    var parts=raw.slice(isPl?7:6).split("|");
    var prov=provById(parts[0]); if(!prov){ toast("Chưa thêm được — chọn lại điểm khác giúp em"); return; }
    var arr=isPl?prov.places:prov.dishes; var found=null;
    arr.forEach(function(x){ if(x.id===parts[1]) found=x; }); if(!found){ toast("Chưa thêm được — chọn lại điểm khác giúp em"); return; }
    if(!wiz.days[dayNo-1]){ toast("Chưa thêm được — kiểm lại ngày đã chọn"); return; }
    wiz.days[dayNo-1].items.push({kind:isPl?"pplace":"pdish", ref_id:"", title:found.name, gia_luc_lap:parsePriceSnap(found.price), session:"Tự chọn", note:"", done:false});
    renderWizDays(); toast("Đã thêm vào ngày "+dayNo);
    return;
  }
  var v=raw.split(":");
  var info=refInfo(v[0],v[1]); if(!info) return;
  wiz.days[dayNo-1].items.push({kind:v[0], ref_id:v[1], title:info.name, gia_luc_lap:info.price, session:"Tự chọn", note:"", done:false});
  renderWizDays(); toast("Đã thêm "+info.name+" vào ngày "+dayNo);
}
function planMove(dir){
  if(dir<0){ wizShowStep(wiz.step-1); return; }
  if(wiz.step===1){
    var wdEl=document.getElementById("wDestInput");
    var dText=wdEl?wdEl.value.trim():"";
    if(dText){
      var rr=resolveDestText(dText);
      if(rr&&rr.type==="dest"){
        var rid=(rr.id==="tphcm")?"tp-ho-chi-minh":rr.id;
        wiz.dest=rid; searchDestId=rid;
      } else if(rr&&(rr.type==="pplace"||rr.type==="pdish")){
        var pv2=provById(rr.prov); if(pv2){ wiz.dest=pv2.appId; searchDestId=pv2.appId; }
      } else if(rr){ wiz.dest="dalat"; searchDestId="dalat"; }
      else { toast("Chưa tìm thấy điểm đến này trong cẩm nang — thử chọn từ danh sách gợi ý bên dưới"); return; }
      document.querySelectorAll("[data-wdest]").forEach(function(b){ b.classList.toggle("on", b.getAttribute("data-wdest")===wiz.dest); });
      fillWizAddSel();
    }
    var woEl2=document.getElementById("wOriginInput");
    wiz.origin=resolveOrigin(woEl2?woEl2.value:"");
    syncOriginInputs(woEl2&&woEl2.value.trim()?woEl2.value:wiz.origin,null);
  }
  if(wiz.step===2){
    var s=document.getElementById("wStart").value, e=document.getElementById("wEnd").value;
    if(!s||!e||daysBetween(s,e)<1){ toast("Kiểm lại ngày đi / ngày về giúp em"); return; }
  }
  if(wiz.step===3){ buildWizDays(); wizShowStep(4); return; }
  if(wiz.step===4){ savePlanTrip(); return; }
  wizShowStep(wiz.step+1);
}
function editTrip(id){
  var t=tripById(id); if(!t) return;
  startPlan();
  wiz.editingId=id; wiz.editStart=t.start_date||""; wiz.editEnd=t.end_date||""; wiz.editTitle=t.title||""; wiz.titleLoaded=false;
  wiz.dest=t.destination_id||"dalat"; searchDestId=wiz.dest;
  var d=DESTINATIONS.filter(function(x){return x.id===wiz.dest;})[0];
  var wd=document.getElementById("wDestInput"); if(wd&&d) wd.value=d.name;
  if(d) syncDestInputs(d.name,"wDestInput");
  document.querySelectorAll("[data-wdest]").forEach(function(b){ b.classList.toggle("on", b.getAttribute("data-wdest")===wiz.dest); });
  wiz.origin=t.origin_city||"";
  var wo=document.getElementById("wOriginInput"); if(wo) wo.value=wiz.origin;
  syncOriginInputs(wiz.origin,"wOriginInput");
  document.getElementById("wStart").value=t.start_date||"";
  document.getElementById("wEnd").value=t.end_date||"";
  document.getElementById("wPeople").value=String(t.people_count||2);
  var bud=BUDGETS.filter(function(b){return b.label===t.budget_label;})[0];
  if(!bud){ var perP=t.people_count?Math.round((t.budget_total||0)/t.people_count):0; bud=BUDGETS.reduce(function(best,b){ return Math.abs(b.per-perP)<Math.abs(best.per-perP)?b:best; }, BUDGETS[1]); }
  wiz.budget=bud.id;
  document.querySelectorAll("[data-wbudget]").forEach(function(b){ b.classList.toggle("on", b.getAttribute("data-wbudget")===wiz.budget); });
  var sty=STYLES.filter(function(s){return s.label===t.style;})[0];
  if(sty){ wiz.style=sty.id; document.querySelectorAll("[data-wstyle]").forEach(function(b){ b.classList.toggle("on", b.getAttribute("data-wstyle")===wiz.style); }); }
  wiz.days=JSON.parse(JSON.stringify(t.days||[]));
  fillWizAddSel(); updateWDaysInfo();
  toast("Đang sửa chuyến — chỉnh xong bấm Lưu ở Bước 4 để cập nhật chuyến cũ");
}
function savePlanTrip(){
  var bud=BUDGETS.filter(function(b){return b.id===wiz.budget;})[0];
  var people=Number(document.getElementById("wPeople").value||2);
  var styleLabel=(STYLES.filter(function(s){return s.id===wiz.style;})[0]||{}).label||"";
  if(wiz.editingId){
    var old=tripById(wiz.editingId);
    if(old){
      old.destination_id=wiz.dest; old.origin_city=wiz.origin||resolveOrigin(searchOrigin);
      old.title=document.getElementById("wTitle").value.trim()||old.title;
      old.start_date=document.getElementById("wStart").value; old.end_date=document.getElementById("wEnd").value;
      old.people_count=people; old.budget_total=bud.per*people; old.budget_label=bud.label; old.style=styleLabel;
      old.days=JSON.parse(JSON.stringify(wiz.days));
      saveTrips();
      var doneId=old.id; wiz.editingId=null;
      toast("Đã cập nhật chuyến — thu chi và checklist được giữ nguyên");
      navStack=[]; show("trips",false);
      openTrip(doneId);
      return;
    }
    wiz.editingId=null;
  }
  var provCk=wizDestProv();
  var ckList=(wiz.dest!=="dalat" && provCk && provCk.checklist && provCk.checklist.length) ? provCk.checklist : CHECKLIST_DEFAULT;
  var trip={
    id:uid(), destination_id:wiz.dest, origin_city:wiz.origin||resolveOrigin(searchOrigin),
    title:document.getElementById("wTitle").value.trim()||("Chuyến "+wizDestName()),
    start_date:document.getElementById("wStart").value, end_date:document.getElementById("wEnd").value,
    people_count:people, budget_total:bud.per*people, budget_label:bud.label, style:styleLabel,
    status:"upcoming", created_at:new Date().toISOString(),
    days:JSON.parse(JSON.stringify(wiz.days)),
    expenses:[], checklist:ckList.map(function(n,i){ return {id:"ck"+i, name:n, category:"hanh_ly", done:false}; })
  };
  trips.unshift(trip); saveTrips();
  toast("Đã lưu chuyến — có ngay trong Chuyến của tôi");
  navStack=[]; show("trips",false);
  openTrip(trip.id);
}

/* ================= CHUYẾN CỦA TÔI ================= */
function tripSpent(t){ return t.expenses.reduce(function(a,e){ return a + (e.kind==="thu"?-Number(e.amount||0):Number(e.amount||0)); },0); }
function todayISO(){ var d=new Date(); var m=("0"+(d.getMonth()+1)).slice(-2); var dd=("0"+d.getDate()).slice(-2); return d.getFullYear()+"-"+m+"-"+dd; }
function tripStatusBadge(t){
  if(t.status==="ongoing") return '<span class="badge badge-ongoing">Đang đi</span>';
  if(t.status==="done") return '<span class="badge badge-soon">Đã đi xong</span>';
  return '<span class="badge badge-upcoming">Sắp đi</span>';
}
function stopTrip(){
  var t=tripById(currentTripId); if(!t||t.status!=="ongoing") return;
  askConfirm("Kết thúc chuyến này?", "Chuyến sẽ thôi trạng thái “Đang đi” — huy hiệu đổi thành “Sắp đi” nếu chưa tới ngày đi, hoặc “Đã đi xong” nếu đã tới/qua ngày đi. Lịch trình, thu chi và checklist vẫn giữ nguyên, bấm Đi lại được bất cứ lúc nào.", function(){
    t.status = todayISO() < t.start_date ? "upcoming" : "done";
    saveTrips();
    if(tripTab==="homnay") tripTab="lich";
    renderTripDetail();
    toast(t.status==="upcoming" ? "Đã dừng đi — chuyến về trạng thái Sắp đi" : "Đã kết thúc chuyến — đánh dấu Đã đi xong");
  }, "Kết thúc chuyến");
}
function tripTodayInfo(t){
  if(!t.days||!t.days.length) return null;
  var today=todayISO();
  for(var i=0;i<t.days.length;i++){ if(t.days[i].date===today) return {day:t.days[i], index:i, isToday:true, note:"Hôm nay · Ngày "+t.days[i].day_no+" · "+fmtDate(today)}; }
  if(today<t.start_date) return {day:t.days[0], index:0, isToday:false, note:"Chưa tới ngày đi — xem trước Ngày "+t.days[0].day_no+" · "+fmtDate(t.days[0].date)};
  if(today>t.end_date) return {day:t.days[t.days.length-1], index:t.days.length-1, isToday:false, note:"Đã qua ngày về — xem lại Ngày "+t.days[t.days.length-1].day_no+" · "+fmtDate(t.days[t.days.length-1].date)};
  var idx=Math.min(t.days.length-1, Math.max(0, daysBetween(t.start_date,today)-1));
  return {day:t.days[idx], index:idx, isToday:true, note:"Hôm nay · Ngày "+t.days[idx].day_no+" · "+fmtDate(today)};
}
function goTrip(id){
  var t=tripById(id); if(!t) return;
  if(t.status!=="ongoing"){ t.status="ongoing"; saveTrips(); }
  currentTripId=id; tripTab="homnay"; renderTripDetail(); show("trip-detail");
  toast("Đang đi — đây là lịch trình hôm nay của chuyến");
}
function tripDestName(t){
  var d=DESTINATIONS.filter(function(x){return x.id===t.destination_id;})[0];
  return d?d.name:"Đà Lạt";
}
function tripDurLabel(t){
  var n=(t.days&&t.days.length)?t.days.length:((t.start_date&&t.end_date)?daysBetween(t.start_date,t.end_date):0);
  if(!n||n<1) return "";
  return n===1?"1 ngày":(n+" ngày "+(n-1)+" đêm");
}
function tripCardHtml(t){
  var spent=tripSpent(t); var pct=t.budget_total?Math.min(100,Math.round(spent/t.budget_total*100)):0;
  var doneCk=t.checklist.filter(function(c){return c.done;}).length;
  var dur=tripDurLabel(t);
  return '<div class="card"><button style="all:unset;display:block;width:100%;cursor:pointer;text-align:left" onclick="openTrip(\''+t.id+'\')"><img class="thumb" src="assets/images/mac-dinh.jpg" alt="'+esc(tripDestName(t))+'" style="height:120px" /><div class="body"><div style="display:flex;justify-content:space-between;align-items:flex-start;gap:8px"><h3 style="flex:1">'+esc(fullDurTitle(t.title))+'</h3>'+tripStatusBadge(t)+'</div><div class="meta-line">'+(t.origin_city?'<span>Xuất phát từ '+esc(t.origin_city)+' → '+esc(tripDestName(t))+'</span>':"")+'<span>'+fmtDate(t.start_date)+' → '+fmtDate(t.end_date)+'</span>'+(dur?'<span>'+dur+'</span>':"")+'<span>'+t.people_count+' người</span><span>'+esc(t.style||"")+'</span></div><div class="progress" style="margin-top:10px"><i style="width:'+pct+'%"></i></div><p class="small" style="margin-top:6px">Đã chi '+fmt(spent)+' / ngân sách '+fmt(t.budget_total)+' · Checklist '+doneCk+'/'+t.checklist.length+'</p></div></button><div class="trip-card-foot"><button class="btn-go" onclick="goTrip(\''+t.id+'\')">Đi</button></div></div>';
}
function renderTrips(){
  var wrap=document.getElementById("tripListWrap");
  if(!trips.length){
    wrap.innerHTML='<h2 class="sec-title" style="margin-top:2px">Chuyến đi của bạn</h2><div class="empty"><div class="ic"><svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"><rect x="2" y="7" width="20" height="14" rx="2"/><path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2"/></svg></div><b style="font-size:16px">Chưa có chuyến nào</b><p class="muted">Lập chuyến đầu tiên: chọn điểm đến trong đủ 34 tỉnh đã duyệt, chọn ngày và số người — app gợi ý lịch trình từ dữ liệu thật của tỉnh đó, sửa xong bấm Lưu là có ngay ở đây, không cần tải lại trang.</p><button class="btn btn-orange" onclick="startPlan()">+ Lập chuyến đầu tiên</button><p class="small" style="margin:14px 0 0">Chuyến và mục đã lưu chỉ nằm trong trình duyệt/máy này, tắt app mở lại vẫn còn, không cần đăng nhập, không ai khác xem được.</p></div>';
    return;
  }
  wrap.innerHTML='<h2 class="sec-title" style="margin-top:2px">Chuyến đi của bạn</h2><p class="sec-sub">Bấm <b>Đi</b> trên thẻ chuyến để bắt đầu đi: app mở ngay lịch trình hôm nay, checklist và thu chi của chuyến đó.</p><div class="listcol">'+trips.map(tripCardHtml).join("")+'</div><button class="btn btn-orange btn-block" style="margin-top:14px" onclick="startPlan()">+ Lập chuyến mới</button>';
}
function tripRouteHtml(t){
  var o=t.origin_city||"";
  if(t.destination_id && t.destination_id!=="dalat"){
    var prov=provById(t.destination_id); var nm=tripDestName(t);
    var headP='<div class="dayblock"><h3 style="margin-bottom:10px">Đi đến '+esc(nm)+(o?' — từ '+esc(o):"")+'</h3>';
    if(!prov) return headP+'<p class="muted" style="margin:0">Xem các tuyến ở mục “Đi đến” trong cẩm nang '+esc(nm)+'.</p></div>';
    var arr=isSGOrigin(o)?prov.routes.sg:(isHNOrigin(o)?prov.routes.hn:null);
    if(arr&&arr.length) return headP+'<div class="listcol">'+arr.map(provRouteCard).join("")+'</div><p class="src">Khoảng giá + thời gian — kiểm '+(prov.checked||"06/11/2026")+'.</p></div>';
    if(o) return headP+'<div class="notebox">Chưa có tuyến riêng '+esc(o)+' → '+esc(nm)+' trong dữ liệu đã kiểm — tuyến này chưa được tra nên app không đoán giá/thời gian. Xem tuyến từ TP.HCM / Hà Nội ở mục “Đi đến” trong cẩm nang '+esc(nm)+' để tham khảo cách đi tiếp.</div></div>';
    return headP+'<p class="muted" style="margin:0">Chuyến này chưa ghi điểm xuất phát. Xem tuyến từ TP.HCM / Hà Nội ở mục “Đi đến” trong cẩm nang '+esc(nm)+'.</p></div>';
  }
  var head='<div class="dayblock"><h3 style="margin-bottom:10px">Đi đến Đà Lạt'+(o?' — từ '+esc(o):"")+'</h3>';
  if(o && isSGOrigin(o)) return head+'<div class="listcol">'+ROUTES_SG.map(routeCard).join("")+'</div><p class="src">Khoảng giá + thời gian — kiểm '+CHECKED+'. Thêm: từ sân bay Liên Khương vào trung tâm 28–30 km (taxi trọn gói ~155.000–280.000đ, xe buýt sân bay ~40.000–50.000đ).</p></div>';
  if(o && isHNOrigin(o)) return head+'<div class="listcol">'+ROUTES_HN.map(routeCard).join("")+'</div><p class="src">Khoảng giá + thời gian — kiểm '+CHECKED+'. Thêm: từ sân bay Liên Khương vào trung tâm 28–30 km (taxi trọn gói ~155.000–280.000đ, xe buýt sân bay ~40.000–50.000đ).</p></div>';
  if(o) return head+'<div class="notebox">Chưa có tuyến '+esc(o)+' → Đà Lạt trong dữ liệu đã kiểm ('+CHECKED+') — tuyến này chưa được tra nên app không đoán giá/thời gian. Xem tuyến từ TP.HCM / Hà Nội ở mục “Đi đến” trong cẩm nang Đà Lạt để tham khảo cách đi tiếp.</div></div>';
  return head+'<p class="muted" style="margin:0">Chuyến này chưa ghi điểm xuất phát. Xem tuyến từ TP.HCM / Hà Nội ở mục “Đi đến” trong cẩm nang Đà Lạt.</p></div>';
}
var currentTripId=null, tripTab="lich";
function tripById(id){ for(var i=0;i<trips.length;i++) if(trips[i].id===id) return trips[i]; return null; }
function openTrip(id){ var t=tripById(id); currentTripId=id; tripTab=(t&&t.status==="ongoing")?"homnay":"lich"; renderTripDetail(); show("trip-detail"); }
function tripDayItemsHtml(t,d,di){
  return d.items.map(function(it,ii){
    return '<div class="titem"><button class="check-box" style="'+(it.done?"background:var(--green);border-color:var(--green)":"background:var(--surface)")+'" aria-label="Đánh dấu đã đi" onclick="toggleTripItem('+di+','+ii+')">'+(it.done?'<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="3" stroke-linecap="round"><path d="M20 6 9 17l-5-5"/></svg>':"")+'</button><div class="ti-body"><b style="'+(it.done?"text-decoration:line-through;color:var(--ink3)":"")+'">'+esc(it.title)+'</b><span>'+esc(it.session||"")+(it.gia_luc_lap?" · ước tính "+fmt(it.gia_luc_lap):(it.gia_luc_lap===null?" · chưa có giá":""))+'</span></div>'+(it.ref_id?'<button class="icon-btn" aria-label="Xem chi tiết" onclick="openRef(\''+it.ref_id+'\')"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"><path d="m9 18 6-6-6-6"/></svg></button>':"")+'<button class="icon-btn danger" aria-label="Xóa khỏi lịch trình" onclick="removeTripItem('+di+','+ii+')"><svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"><path d="M3 6h18M8 6V4a1 1 0 0 1 1-1h6a1 1 0 0 1 1 1v2m3 0v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6"/></svg></button></div>';
  }).join("");
}
function tripChecklistHtml(t){
  return '<div class="listcol">'+t.checklist.map(function(c,i){
    return '<div style="display:flex;gap:8px"><button class="check-item'+(c.done?" done":"")+'" style="flex:1" onclick="toggleCheck('+i+')"><span class="check-box">'+(c.done?'<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="3" stroke-linecap="round"><path d="M20 6 9 17l-5-5"/></svg>':"")+'</span><span class="ck-name" style="font-size:14.5px;font-weight:600">'+esc(c.name)+'</span></button><button class="icon-btn danger" aria-label="Xóa mục checklist" onclick="removeCheck('+i+')"><svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"><path d="M3 6h18M8 6V4a1 1 0 0 1 1-1h6a1 1 0 0 1 1 1v2m3 0v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6"/></svg></button></div>';
  }).join("")+'</div>';
}
function tripExpensesHtml(t){
  if(!t.expenses.length) return '<div class="empty"><p class="muted" style="margin:0">Chưa có khoản thu chi nào trong chuyến này.</p></div>';
  return '<div class="listcol">'+t.expenses.map(function(e){
    return '<div class="rowcard"><div class="rc-body"><h3 style="font-size:14.5px">'+esc(e.note||e.category)+' <span style="color:'+(e.kind==="thu"?"var(--green-d)":"var(--red)")+'">'+(e.kind==="thu"?"+":"−")+fmt(e.amount)+'</span></h3><p class="small">'+esc(e.category)+' · '+fmtDate(e.date)+'</p></div><button class="icon-btn danger" aria-label="Xóa khoản này" onclick="removeExpense(\''+e.id+'\')"><svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"><path d="M3 6h18M8 6V4a1 1 0 0 1 1-1h6a1 1 0 0 1 1 1v2m3 0v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6"/></svg></button></div>';
  }).join("")+'</div>';
}
function renderTripDetail(){
  var t=tripById(currentTripId); if(!t){ show("trips",false); return; }
  var spent=tripSpent(t); var pct=t.budget_total?Math.min(100,Math.round(spent/t.budget_total*100)):0;
  var html='<div style="display:flex;justify-content:space-between;align-items:flex-start;gap:8px"><h2 style="font-size:20px;margin:4px 0 4px;flex:1">'+esc(fullDurTitle(t.title))+'</h2><span style="margin-top:6px">'+tripStatusBadge(t)+'</span></div><p class="sec-sub" style="margin-bottom:10px">'+(t.origin_city?('Xuất phát từ <b style="color:var(--ink)">'+esc(t.origin_city)+'</b> → '+esc(tripDestName(t))+' · '):(esc(tripDestName(t))+" · "))+fmtDate(t.start_date)+' → '+fmtDate(t.end_date)+(tripDurLabel(t)?(' · '+tripDurLabel(t)):"")+' · '+t.people_count+' người · kiểu đi: '+esc(t.style||"—")+'</p>';
  html+='<div class="statgrid"><div class="cell"><b>'+fmt(t.budget_total)+'</b><span>Ngân sách</span></div><div class="cell"><b>'+fmt(spent)+'</b><span>Đã chi</span></div><div class="cell"><b>'+fmt(t.budget_total-spent)+'</b><span>Còn lại</span></div></div><div class="progress" style="margin-top:10px"><i style="width:'+pct+'%"></i></div>';
  var estSum=0, estUnknown=0;
  t.days.forEach(function(d){ d.items.forEach(function(it){ if(it.gia_luc_lap==null) estUnknown++; else estSum+=Number(it.gia_luc_lap||0); }); });
  var _budT=BUDGETS.filter(function(b){return b.label===t.budget_label;})[0]; var _compT=tripComponents(provById(t.destination_id), _budT?_budT.id:"vua", Math.max(0,(t.days?t.days.length:1)-1), t.people_count||1, t.origin_city||"", estSum);
  html+='<div class="bigmoney" style="margin-top:14px"><div class="bm-k">TỔNG ƯỚC TÍNH CẢ CHUYẾN — 1 NGƯỜI</div><div class="bm-v">'+fmt(_compT.total)+'/người</div>'+underBudgetNoteHtml(_compT.total,_budT?_budT.per:0)+'<p>'+totalNoteHtml(_compT, tripDestName(t), Math.max(0,(t.days?t.days.length:1)-1), t.people_count||1)+(estUnknown?(' Chưa tính '+estUnknown+' mục chưa có giá trong dữ liệu.'):"")+'</p></div>';
  html+='<div style="display:flex;gap:10px;margin:0 0 6px"><button class="btn btn-primary" style="flex:1" onclick="shareTrip()">Gửi lịch trình</button><button class="btn btn-ghost" style="flex:1" onclick="printTrip()">In lịch trình</button></div>';
  html+='<div class="chiprow" style="margin-top:14px">'+(t.status==="ongoing"?'<button class="chip'+(tripTab==="homnay"?" on":"")+'" onclick="tripTab=\'homnay\';renderTripDetail()">Hôm nay</button>':"")+'<button class="chip'+(tripTab==="lich"?" on":"")+'" onclick="tripTab=\'lich\';renderTripDetail()">Lịch trình</button><button class="chip'+(tripTab==="chi"?" on":"")+'" onclick="tripTab=\'chi\';renderTripDetail()">Thu chi ('+t.expenses.length+')</button><button class="chip'+(tripTab==="check"?" on":"")+'" onclick="tripTab=\'check\';renderTripDetail()">Checklist</button></div>';
  if(tripTab==="homnay"){
    var ti=tripTodayInfo(t);
    html+='<div class="today-hero"><h3>Đang đi — lịch trình hôm nay</h3><p>'+(ti?esc(ti.note):"Hôm nay · "+fmtDate(todayISO()))+'</p></div>';
    if(ti){
      var td=ti.day;
      html+='<div class="dayblock today-day"><h3>Ngày '+td.day_no+' · '+fmtDate(td.date)+'</h3>'+(td.items.length?tripDayItemsHtml(t,td,ti.index):'<p class="muted" style="margin:0">Ngày này đang trống — thêm điểm ở tab Lịch trình.</p>')+'</div>';
    }
    var doneN0=t.checklist.filter(function(c){return c.done;}).length;
    html+='<div class="ongoing-sec"><h3>Checklist của chuyến · '+doneN0+'/'+t.checklist.length+' đã chuẩn bị</h3><div class="progress" style="margin-bottom:10px"><i style="width:'+(t.checklist.length?Math.round(doneN0/t.checklist.length*100):0)+'%"></i></div>'+tripChecklistHtml(t)+'</div>';
    html+='<div class="ongoing-sec"><h3>Thu chi của chuyến</h3><p class="muted" style="margin:0 0 10px">Đã chi <b style="color:var(--ink)">'+fmt(spent)+'</b> / ngân sách '+fmt(t.budget_total)+' · còn lại '+fmt(t.budget_total-spent)+'</p>'+tripExpensesHtml(t)+'<button class="btn btn-primary btn-block" style="margin-top:12px" onclick="tripTab=\'chi\';renderTripDetail()">Thêm khoản thu / chi</button></div>';
  }
  if(tripTab==="lich"){
    html+=tripRouteHtml(t);
    html+=t.days.map(function(d,di){
      var items=d.items.map(function(it,ii){
        return '<div class="titem"><button class="check-box" style="'+(it.done?"background:var(--green);border-color:var(--green)":"background:var(--surface)")+'" aria-label="Đánh dấu đã đi" onclick="toggleTripItem('+di+','+ii+')">'+(it.done?'<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="3" stroke-linecap="round"><path d="M20 6 9 17l-5-5"/></svg>':"")+'</button><div class="ti-body"><b style="'+(it.done?"text-decoration:line-through;color:var(--ink3)":"")+'">'+esc(it.title)+'</b><span>'+esc(it.session||"")+(it.gia_luc_lap?" · ước tính "+fmt(it.gia_luc_lap):(it.gia_luc_lap===null?" · chưa có giá":""))+'</span></div>'+(it.ref_id?'<button class="icon-btn" aria-label="Xem chi tiết" onclick="openRef(\''+it.ref_id+'\')"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"><path d="m9 18 6-6-6-6"/></svg></button>':"")+'<button class="icon-btn danger" aria-label="Xóa khỏi lịch trình" onclick="removeTripItem('+di+','+ii+')"><svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"><path d="M3 6h18M8 6V4a1 1 0 0 1 1-1h6a1 1 0 0 1 1 1v2m3 0v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6"/></svg></button></div>';
      }).join("");
      return '<div class="dayblock"><h3>Ngày '+d.day_no+' · '+fmtDate(d.date)+'</h3>'+(items||'<p class="muted" style="margin:0">Ngày này đang trống.</p>')+'</div>';
    }).join("");
    var tAddOpts;
    if(!t.destination_id || t.destination_id==="dalat"){
      tAddOpts=PLACES.map(function(p){return '<option value="place:'+p.id+'">'+esc(p.name)+'</option>';}).join("")+DISHES.map(function(d){return '<option value="dish:'+d.id+'">Món — '+esc(d.name)+'</option>';}).join("");
    } else {
      var tprov=provById(t.destination_id);
      tAddOpts=tprov ? tprov.places.map(function(p){return '<option value="pplace:'+tprov.id+'|'+p.id+'">'+esc(p.name)+'</option>';}).join("")+tprov.dishes.map(function(d){return '<option value="pdish:'+tprov.id+'|'+d.id+'">Món — '+esc(d.name)+'</option>';}).join("") : "";
    }
    html+='<div class="dayblock"><h3 style="margin-bottom:8px">Thêm điểm vào chuyến</h3><div style="display:flex;gap:8px"><select id="tAddSel" style="flex:1;min-width:0;border:1.5px solid var(--line);border-radius:12px;padding:11px;font-size:14px;background:var(--surface)">'+tAddOpts+'</select><select id="tAddDay" style="flex:0 0 100px;border:1.5px solid var(--line);border-radius:12px;padding:11px;font-size:14px;background:var(--surface)">'+t.days.map(function(d){return '<option value="'+d.day_no+'">Ngày '+d.day_no+'</option>';}).join("")+'</select></div><button class="btn btn-ghost btn-block" style="margin-top:10px" onclick="tripAddItem()">+ Thêm vào ngày đã chọn</button></div>';
  }
  if(tripTab==="chi"){
    html+='<div style="margin-top:6px" class="listcol">'+(t.expenses.length? t.expenses.map(function(e){
      return '<div class="rowcard"><div class="rc-body"><h3 style="font-size:14.5px">'+esc(e.note||e.category)+' <span style="color:'+(e.kind==="thu"?"var(--green-d)":"var(--red)")+'">'+(e.kind==="thu"?"+":"−")+fmt(e.amount)+'</span></h3><p class="small">'+esc(e.category)+' · '+fmtDate(e.date)+'</p></div><button class="icon-btn danger" aria-label="Xóa khoản này" onclick="removeExpense(\''+e.id+'\')"><svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"><path d="M3 6h18M8 6V4a1 1 0 0 1 1-1h6a1 1 0 0 1 1 1v2m3 0v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6"/></svg></button></div>';
    }).join("") : '<div class="empty"><p class="muted" style="margin:0">Chưa có khoản thu chi nào. Thêm khoản đầu tiên ở dưới.</p></div>')+'</div>';
    html+='<div class="dayblock" style="margin-top:12px"><h3 style="margin-bottom:10px">Thêm khoản thu / chi</h3><div class="field"><label>Loại</label><select id="eKind"><option value="chi">Chi</option><option value="thu">Thu (hoàn tiền, được hỗ trợ…)</option></select></div><div class="field"><label>Số tiền (đ)</label><input type="number" id="eAmount" inputmode="numeric" placeholder="Ví dụ: 500000" /></div><div class="field"><label>Hạng mục</label><select id="eCat"><option>Ăn uống</option><option>Đi lại</option><option>Chỗ ở</option><option>Vé tham quan</option><option>Mua sắm</option><option>Khác</option></select></div><div class="field"><label>Ghi chú</label><input type="text" id="eNote" placeholder="Ví dụ: Lẩu gà lá é Tao Ngộ" /></div><button class="btn btn-primary btn-block" onclick="addExpense()">Thêm khoản — cập nhật tổng ngay</button></div>';
  }
  if(tripTab==="check"){
    var doneN=t.checklist.filter(function(c){return c.done;}).length;
    html+='<p class="muted" style="margin:6px 0 12px">Đã chuẩn bị '+doneN+'/'+t.checklist.length+' mục. Bấm vào từng mục để đánh dấu — trạng thái giữ lại sau khi tải lại trang.</p><div class="listcol">'+t.checklist.map(function(c,i){
      return '<div style="display:flex;gap:8px"><button class="check-item'+(c.done?" done":"")+'" style="flex:1" onclick="toggleCheck('+i+')"><span class="check-box">'+(c.done?'<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="3" stroke-linecap="round"><path d="M20 6 9 17l-5-5"/></svg>':"")+'</span><span class="ck-name" style="font-size:14.5px;font-weight:600">'+esc(c.name)+'</span></button><button class="icon-btn danger" aria-label="Xóa mục checklist" onclick="removeCheck('+i+')"><svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"><path d="M3 6h18M8 6V4a1 1 0 0 1 1-1h6a1 1 0 0 1 1 1v2m3 0v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6"/></svg></button></div>';
    }).join("")+'</div><div style="display:flex;gap:8px;margin-top:12px"><input type="text" id="ckNew" placeholder="Thêm mục mang theo…" style="flex:1;min-width:0;border:1.5px solid var(--line);border-radius:12px;padding:12px;font-size:14.5px;background:var(--surface)" /><button class="btn btn-primary" onclick="addCheck()">Thêm</button></div>';
  }
  html+='<div class="dayblock" style="margin-top:22px"><h3 style="margin-bottom:8px">Chia tiền nhóm</h3><p class="muted" style="margin:0 0 12px;line-height:1.65">'+esc(typeof SPLIT_GUIDE!=="undefined"?SPLIT_GUIDE:"")+'</p><div class="field"><label for="splitTotal">Tổng tiền cả nhóm đã chi (đ)</label><input type="number" id="splitTotal" inputmode="numeric" placeholder="Ví dụ: 3000000"'+(spent>0?(' value="'+spent+'"'):"")+' /></div><div class="field"><label for="splitPeople">Số người trong nhóm</label><input type="number" id="splitPeople" inputmode="numeric" min="1" value="'+t.people_count+'" /></div>'+(spent>0?'<p class="small" style="margin:-4px 0 10px">Ô tổng tiền đang điền sẵn đúng số đã chi của chuyến này ('+fmt(spent)+') — sửa lại nếu nhóm còn chi thêm.</p>':"")+'<button class="btn btn-primary btn-block" onclick="calcSplit()">Tính mỗi người đóng bao nhiêu</button><div id="splitResult"></div></div>';
  html+='<div style="display:flex;gap:10px;margin-top:22px"><button class="btn btn-ghost" style="flex:1" onclick="editTrip(\''+t.id+'\')">Sửa chuyến</button>'+(t.status==="ongoing"?'<button class="btn btn-ghost" style="flex:1" onclick="stopTrip()">Kết thúc chuyến</button>':"")+'</div>';
  html+='<button class="btn btn-danger btn-block" style="margin-top:12px" onclick="deleteTrip()">Xóa chuyến này</button>';
  document.getElementById("tripDetail").innerHTML=html;
}
function calcSplit(){
  var totalEl=document.getElementById("splitTotal"), peopleEl=document.getElementById("splitPeople"), box=document.getElementById("splitResult");
  if(!totalEl||!peopleEl||!box) return;
  var total=Number(totalEl.value||0), people=Number(peopleEl.value||0);
  if(!total||total<=0){ box.innerHTML='<div class="notebox" style="margin-top:12px">Nhập tổng tiền cả nhóm đã chi trước đã.</div>'; return; }
  if(!people||people<1||Math.floor(people)!==people){ box.innerHTML='<div class="notebox" style="margin-top:12px">Số người phải là số nguyên từ 1 trở lên.</div>'; return; }
  var per=Math.round(total/people);
  box.innerHTML='<div class="bigmoney" style="margin:12px 0 0"><div class="bm-k">MỖI NGƯỜI CẦN ĐÓNG</div><div class="bm-v">'+fmt(per)+'/người</div><p>Tổng '+fmt(total)+' chia đều cho '+people+' người.'+(total%people!==0?' Đã làm tròn tới đồng gần nhất — vài đồng lẻ để người giữ quỹ xử lý khi chốt sổ cuối chuyến.':'')+'</p></div>';
}
function toggleTripItem(di,ii){ var t=tripById(currentTripId); t.days[di].items[ii].done=!t.days[di].items[ii].done; saveTrips(); renderTripDetail(); }
function removeTripItem(di,ii){
  var t=tripById(currentTripId); var name=t.days[di].items[ii].title;
  askConfirm("Bớt điểm này khỏi lịch trình?", "“"+name+"” sẽ bị xóa khỏi ngày "+(di+1)+" của chuyến. Cẩm nang gốc không bị ảnh hưởng.", function(){
    t.days[di].items.splice(ii,1); saveTrips(); renderTripDetail(); toast("Đã bớt điểm khỏi lịch trình");
  });
}
function tripAddItem(){
  var t=tripById(currentTripId); var raw=document.getElementById("tAddSel").value;
  var dayNo=Number(document.getElementById("tAddDay").value||1);
  if(raw.indexOf("pplace:")===0 || raw.indexOf("pdish:")===0){
    var isPl=raw.indexOf("pplace:")===0;
    var parts=raw.slice(isPl?7:6).split("|");
    var prov=provById(parts[0]); if(!prov){ toast("Chưa thêm được — chọn lại điểm khác giúp em"); return; }
    var arr=isPl?prov.places:prov.dishes; var found=null;
    arr.forEach(function(x){ if(x.id===parts[1]) found=x; }); if(!found){ toast("Chưa thêm được — chọn lại điểm khác giúp em"); return; }
    t.days[dayNo-1].items.push({kind:isPl?"pplace":"pdish",ref_id:"",title:found.name,gia_luc_lap:parsePriceSnap(found.price),session:"Tự chọn",note:"",done:false});
    saveTrips(); renderTripDetail(); toast("Đã thêm vào ngày "+dayNo);
    return;
  }
  var v=raw.split(":");
  var info=refInfo(v[0],v[1]); if(!info) return;
  t.days[dayNo-1].items.push({kind:v[0],ref_id:v[1],title:info.name,gia_luc_lap:info.price,session:"Tự chọn",note:"",done:false});
  saveTrips(); renderTripDetail(); toast("Đã thêm vào ngày "+dayNo);
}
function addExpense(){
  var t=tripById(currentTripId);
  var amt=Number(document.getElementById("eAmount").value||0);
  if(!amt||amt<=0){ toast("Nhập số tiền hợp lệ giúp em"); return; }
  t.expenses.push({id:uid(), kind:document.getElementById("eKind").value, amount:amt, category:document.getElementById("eCat").value, date:t.start_date, note:document.getElementById("eNote").value.trim()});
  saveTrips(); renderTripDetail(); toast("Đã thêm khoản — tổng đã cập nhật");
}
function removeExpense(id){
  var t=tripById(currentTripId);
  askConfirm("Xóa khoản thu chi này?", "Khoản này sẽ bị xóa khỏi chuyến và tổng tiền cập nhật ngay.", function(){
    t.expenses=t.expenses.filter(function(e){ return e.id!==id; }); saveTrips(); renderTripDetail(); toast("Đã xóa khoản thu chi");
  });
}
function toggleCheck(i){ var t=tripById(currentTripId); t.checklist[i].done=!t.checklist[i].done; saveTrips(); renderTripDetail(); }
function addCheck(){
  var t=tripById(currentTripId); var v=document.getElementById("ckNew").value.trim(); if(!v){ toast("Gõ tên mục cần thêm trước đã"); return; }
  t.checklist.push({id:uid(), name:v, category:"hanh_ly", done:false}); saveTrips(); renderTripDetail(); toast("Đã thêm vào checklist");
}
function removeCheck(i){
  var t=tripById(currentTripId);
  askConfirm("Xóa mục checklist này?", "“"+t.checklist[i].name+"” sẽ bị xóa khỏi danh sách mang theo.", function(){
    t.checklist.splice(i,1); saveTrips(); renderTripDetail(); toast("Đã xóa mục checklist");
  });
}
function tripSummaryText(t){
  var lines=[];
  lines.push(fullDurTitle(t.title));
  lines.push((t.origin_city?("Từ "+t.origin_city+" → "):"")+tripDestName(t)+" · "+fmtDate(t.start_date)+" → "+fmtDate(t.end_date)+" · "+t.people_count+" người");
  var sum=0;
  t.days.forEach(function(d){
    lines.push("");
    lines.push("Ngày "+d.day_no+" ("+fmtDate(d.date)+"):");
    d.items.forEach(function(it){ lines.push("- "+(it.session?it.session+": ":"")+it.title); if(it.gia_luc_lap) sum+=Number(it.gia_luc_lap); });
  });
  lines.push("");
  var _budS=BUDGETS.filter(function(b){return b.label===t.budget_label;})[0]; var _compS=tripComponents(provById(t.destination_id), _budS?_budS.id:"vua", Math.max(0,(t.days?t.days.length:1)-1), t.people_count||1, t.origin_city||"", sum);
  lines.push("Tổng ước tính cả chuyến: khoảng "+fmt(_compS.total)+"/người. Đã gồm vé tham quan, ăn uống, di chuyển tới điểm đến và chỗ ở. Chưa gồm chi tiêu cá nhân.");
  lines.push("Ngân sách chuyến: "+fmt(t.budget_total)+" · Đã chi: "+fmt(tripSpent(t)));
  return lines.join("\n");
}
function copyTripText(text){
  if(navigator.clipboard && navigator.clipboard.writeText){
    navigator.clipboard.writeText(text).then(function(){ toast("Đã sao chép — dán vào Zalo cho người nhà xem"); }, function(){ fallbackCopyTrip(text); });
  } else fallbackCopyTrip(text);
}
function fallbackCopyTrip(text){
  var ta=document.createElement("textarea");
  ta.value=text; ta.style.position="fixed"; ta.style.opacity="0";
  document.body.appendChild(ta); ta.select();
  try{ document.execCommand("copy"); toast("Đã sao chép — dán vào Zalo cho người nhà xem"); }
  catch(e){ toast("Chưa sao chép được — mở lịch trình và chụp màn hình gửi người nhà giúp em"); }
  document.body.removeChild(ta);
}
function shareTrip(){
  var t=tripById(currentTripId); if(!t) return;
  var text=tripSummaryText(t);
  if(navigator.share){
    navigator.share({title:t.title, text:text}).catch(function(err){ if(!err || err.name!=="AbortError") copyTripText(text); });
  } else copyTripText(text);
}
function printTrip(){
  var t=tripById(currentTripId); if(!t) return;
  var sum=0;
  var daysHtml=t.days.map(function(d){
    var items=d.items.map(function(it){ if(it.gia_luc_lap) sum+=Number(it.gia_luc_lap); return '<li>'+(it.session?esc(it.session)+": ":"")+esc(it.title)+'</li>'; }).join("");
    return '<h2>Ngày '+d.day_no+' · '+fmtDate(d.date)+'</h2><ul>'+items+'</ul>';
  }).join("");
  document.getElementById("printArea").innerHTML='<button class="btn btn-ghost print-close" style="margin-bottom:14px" onclick="closePrint()">← Quay lại chuyến</button><h1>'+esc(fullDurTitle(t.title))+'</h1><p>'+(t.origin_city?("Từ "+esc(t.origin_city)+" → "):"")+esc(tripDestName(t))+' · '+fmtDate(t.start_date)+' → '+fmtDate(t.end_date)+(tripDurLabel(t)?(' · '+tripDurLabel(t)):"")+' · '+t.people_count+' người</p>'+daysHtml+'<p><b>Tổng ước tính cả chuyến: khoảng '+fmt(tripComponents(provById(t.destination_id), (BUDGETS.filter(function(b){return b.label===t.budget_label;})[0]||{}).id||"vua", Math.max(0,(t.days?t.days.length:1)-1), t.people_count||1, t.origin_city||"", sum).total)+'/người.</b> Đã gồm vé tham quan, ăn uống, di chuyển tới điểm đến và chỗ ở. Chưa gồm chi tiêu cá nhân.</p><p>Ngân sách chuyến: '+fmt(t.budget_total)+' · Đã chi: '+fmt(tripSpent(t))+'</p><p class="print-close" style="color:#555">Đây là bản chỉ gồm lịch trình. Mở trang này trong trình duyệt rồi chọn In để in ra giấy hoặc lưu PDF — bản in cũng chỉ gồm phần lịch trình này.</p>';
  var pa=document.getElementById("printArea");
  pa.classList.add("show"); pa.scrollTop=0;
}
function closePrint(){ document.getElementById("printArea").classList.remove("show"); }
function deleteTrip(){
  var t=tripById(currentTripId); if(!t) return;
  askConfirm("Xóa chuyến “"+t.title+"”?", "Toàn bộ lịch trình, thu chi và checklist của chuyến này sẽ bị xóa. Không khôi phục được.", function(){
    trips=trips.filter(function(x){ return x.id!==t.id; }); saveTrips(); currentTripId=null;
    toast("Đã xóa chuyến"); navStack=[]; show("trips",false);
  });
}
/* ================= TÀI KHOẢN: ĐÃ LƯU ================= */
function renderSaved(){
  var wrap=document.getElementById("savedWrap"); if(!wrap) return;
  if(!saved.length){ wrap.innerHTML='<div class="empty"><p class="muted" style="margin:0">Chưa lưu mục nào. Bấm tim ở bất kỳ địa danh, chỗ ở hay món ăn nào để lưu lại xem sau.</p></div>'; return; }
  wrap.innerHTML='<div class="listcol">'+saved.map(function(s){
    if(s.kind==="place"){ var p=placeById(s.id); return p?placeCard(p):""; }
    if(s.kind==="stay"){ var st=stayById(s.id); return st?stayCard(st):""; }
    if(s.kind==="dish"){ var d0=dishById(s.id); return d0?dishCard(d0):""; }
    if(s.kind==="pplace"||s.kind==="pstay"||s.kind==="pdish"){
      var prov=provById(s.prov); if(!prov) return "";
      var arr=s.kind==="pplace"?prov.places:(s.kind==="pstay"?prov.stays:prov.dishes);
      var found=null; arr.forEach(function(x){ if(x.id===s.id) found=x; }); if(!found) return "";
      return s.kind==="pplace"?provPlaceCard(found,prov):(s.kind==="pstay"?provStayCard(found,prov):provDishCard(found,prov));
    }
    return "";
  }).join("")+'</div>';
  refreshHearts();
}
/* ================= KHỞI TẠO ================= */
attachTripAutocomplete("w");
renderExplore(); renderDestList(); renderPlaces(); renderStays(); renderDishes(); renderRoutes(); renderSaved();
var startHash=location.hash||""; /* đọc trước khi show() ghi lại địa chỉ */
show("explore",false);
(function(){
  var m=/^#\/tinh\/([a-z0-9-]+)$/.exec(startHash);
  if(m && provById(m[1])) openProvDetail(m[1]);
})();



/* Neo khung app theo chiều cao THẬT SỰ nhìn thấy: trong khung nhúng (app Muse),
   viewport bố cục kéo dài xuống sau thanh công cụ của app chủ nên phần dưới bị che.
   visualViewport cho đúng phần còn nhìn được — lấy nó làm chiều cao khung app
   để dock luôn nằm trong vùng nhìn thấy. Ngoài khung nhúng, hai số bằng nhau
   thì giữ nguyên 100dvh. */
(function(){
  function fitApp(){
    var h=window.innerHeight;
    var vv=window.visualViewport;
    if(vv && vv.height>0 && vv.height<h-1 && (!vv.scale || Math.abs(vv.scale-1)<0.01)){
      document.documentElement.style.setProperty("--app-h", Math.round(vv.height)+"px");
    } else {
      document.documentElement.style.removeProperty("--app-h");
    }
  }
  window.addEventListener("resize",fitApp);
  window.addEventListener("orientationchange",fitApp);
  fitApp();
})();
