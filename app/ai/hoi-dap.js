/* BuiTrip AI — dữ liệu hỏi đáp chung (FAQ cả nước) và tên quen gọi của nơi chốn.
   BT_FAQ: câu hỏi chung, nhóm theo chủ đề; {PLACE}, {DISH} được thay bằng số đếm thật.
   BT_ALIAS: [cách gõ đã bỏ dấu, mã tỉnh mới, tên tỉnh cũ nếu có]. Thêm tên mới chỉ cần thêm 1 dòng ở đây. */
var BT_FAQ = [
    {g:"Lên kế hoạch", items:[
      {q:"Cẩm nang này dùng thế nào?", a:"Gõ tên tỉnh, địa danh hoặc món ăn ở trang chủ, hoặc chọn từ danh sách 34 tỉnh thành. Mỗi tỉnh có các tab Đi đâu, Ở đâu, Ăn gì, Đi đến, Đi lại và Lịch trình. Muốn có lịch theo ngày và tổng chi phí thì bấm Lập kế hoạch."},
      {q:"Cả nước giờ còn 34 tỉnh, tìm theo tên tỉnh cũ được không?", a:"Từ 01/07/2025, theo Nghị quyết 202/2025/QH15, cả nước còn 34 tỉnh thành. App ghi tên tỉnh cũ trong ngoặc ở thẻ tỉnh và từng địa danh, ví dụ Gia Lai (gồm Gia Lai cũ + Bình Định cũ). Ô Hỏi nhanh ở đầu trang này hiểu cả tên tỉnh cũ như Quảng Bình, Bình Thuận, Hà Giang."},
      {q:"Mùa nào nên đi miền nào?", a:"Khái quát: miền Bắc đẹp mùa thu (tháng 9–11) và mùa xuân (tháng 3–4), mùa đông vùng núi rét đậm. Miền Trung nắng đẹp khoảng tháng 2–8, cuối năm là mùa mưa bão. Tây Nguyên và Nam Bộ đi đẹp mùa khô, khoảng tháng 11 đến tháng 4. Tháng cụ thể của từng tỉnh xem ở tab Tổng quan của tỉnh đó."},
      {q:"Một tỉnh nên đi mấy ngày?", a:"Lịch mẫu trong app tính 3 ngày 2 đêm cho mỗi tỉnh, xếp điểm theo cụm để khỏi đi lòng vòng. Tỉnh mới sau sáp nhập rộng gấp đôi, gấp ba, nên tách thành 2 chặng nếu muốn đi cả hai khu, ví dụ Lâm Đồng gồm Đà Lạt và biển Phan Thiết cách nhau vài giờ xe."},
      {q:"Lịch trình xếp thế nào để khỏi đi lòng vòng?", a:"Mở Lập kế hoạch, chọn tỉnh và số ngày, app gợi ý lịch theo cụm khu vực rồi cho thêm hoặc bớt điểm từng ngày. Nguyên tắc chung: mỗi buổi một cụm, điểm xa đi sáng sớm, chiều về gần chỗ ở."}
    ]},
    {g:"Đi lại", items:[
      {q:"Đi giữa các tỉnh bằng gì cho hợp lý?", a:"Chặng dài Bắc – Nam nên đi máy bay. Dọc bờ biển miền Trung có tàu hỏa Thống Nhất, đi tàu đêm vừa di chuyển vừa ngủ. Xe khách giường nằm rẻ nhất, có ở hầu hết tỉnh. Dịp lễ, Tết nên đặt vé trước vài tuần. Tab Đi đến của từng tỉnh ghi giá và thời gian từ TP.HCM và Hà Nội."},
      {q:"Từ sân bay, bến xe vào trung tâm đi bằng gì?", a:"Tab Đi đến của mỗi tỉnh có mục từ sân bay vào trung tâm, kèm giá taxi và xe đưa đón. Xe công nghệ thường rẻ và minh bạch giá hơn taxi dù ở cửa sân bay. Tỉnh sáp nhập có thể có nhiều sân bay, nhà ga; app đang bổ sung đầu mối của từng tỉnh cũ."},
      {q:"Thuê xe máy cần giấy tờ gì, cần kiểm tra gì?", a:"Cần căn cước và bằng lái xe máy phù hợp loại xe. Không giao bản gốc giấy tờ cho bên cho thuê giữ, không chuyển cọc trước chỉ vì giá rẻ. Khi nhận xe, thử phanh, lốp, đèn, còi và quay video vết trầy. Giá thuê từng tỉnh ở tab Đi lại."},
      {q:"Đi đèo núi bằng xe máy có an toàn không?", a:"Có rủi ro thật, nhất là mùa mưa và lúc sương mù. Đổ đèo dài thì về số thấp, không rà phanh liên tục, không vượt ở cua khuất, không đi đèo ban đêm nếu chưa quen đường. Mưa lớn có thể sạt lở và cấm đường, nên xem tin trước khi đi. Tỉnh nào có đèo nguy hiểm, app ghi ở mục dặn an toàn của tỉnh."}
    ]},
    {g:"Ở đâu, ăn gì", items:[
      {q:"Đặt phòng ở đâu, cần đặt trước bao lâu?", a:"Tab Ở đâu liệt kê chỗ ở theo khu vực, kèm khoảng giá một đêm và số điện thoại chính thức nếu có. Cuối tuần nên đặt trước 2–3 tuần, lễ và Tết nên đặt trước 1–2 tháng. Trước ngày đi, gọi lại xác nhận đặt phòng và chính sách hủy. App chưa nhận đặt phòng và chưa có đối tác."},
      {q:"Ăn gì, quán nào, giá bao nhiêu?", a:"Tab Ăn gì của mỗi tỉnh ghi món đặc sản, quán gợi ý, địa chỉ và khoảng giá kèm ngày kiểm. Hiện có {DISH} món ở 34 tỉnh thành. Giá là khoảng tham khảo, không phải giá chốt; món hải sản và món tính theo cân nên hỏi giá trước."},
      {q:"Làm sao tránh bị chặt chém?", a:"Hỏi giá trước khi gọi món hoặc lên xe, ưu tiên nơi niêm yết giá. Mỗi tỉnh có mục Cẩn thận chặt chém ghi các tình huống hay gặp và cách tránh. Gặp giá vô lý thì bỏ đi, đừng cãi nhau; có thể báo đường dây nóng du lịch của tỉnh nếu app có số."}
    ]},
    {g:"Chi phí", items:[
      {q:"Một chuyến 3 ngày 2 đêm hết bao nhiêu tiền?", a:"Tùy tỉnh và phương tiện. Tab Tổng quan của mỗi tỉnh có bảng chi phí ước tính cho 1 người đi từ TP.HCM: vé đi về, ở 2 đêm, ăn 3 ngày, vé tham quan, thuê xe. Khi lập kế hoạch, app cộng sẵn thành một con số; chưa gồm mua sắm và chi tiêu cá nhân."},
      {q:"Đi nhóm chia tiền thế nào cho khỏi cãi nhau?", a:"Lập quỹ chung trước chuyến, mỗi người góp bằng nhau, cử một người giữ quỹ và ghi mọi khoản chi chung. Cuối mỗi ngày chốt sổ cho cả nhóm xem; cuối chuyến chia đều, thừa trả lại, thiếu góp thêm."}
    ]},
    {g:"An toàn và sự cố", items:[
      {q:"Số khẩn cấp là số nào?", a:"Dùng chung cả nước: 113 công an, 114 cứu hỏa và cứu nạn, 115 cấp cứu, 112 tìm kiếm cứu nạn. Mục Số khẩn cấp của từng tỉnh có nút gọi và số riêng như đường dây nóng du lịch nếu có. Tỉnh nào chưa tra được số riêng thì app ghi rõ, không đoán số."},
      {q:"Gặp trời mưa thì đi đâu?", a:"Mỗi tỉnh có mục Khi trời mưa, gợi ý điểm có mái che như bảo tàng, chùa, chợ, và nói rõ điểm nên bỏ vì đường trơn hoặc nước lớn. Mùa mưa nên để 1 buổi trống trong lịch để đổi linh hoạt."},
      {q:"Xe hư, hết xăng, bị hủy phòng thì làm gì?", a:"Xe thuê hư thì quay lại tình trạng xe, gửi định vị và gọi số hỗ trợ đã chốt lúc thuê, không tự sửa lớn. Bị hủy phòng thì gọi thẳng số khách sạn trong app để xác nhận, rồi tìm chỗ khác cùng khu ở tab Ở đâu."}
    ]},
    {g:"Về app", items:[
      {q:"Sổ tem check-in là gì?", a:"Mỗi địa danh có nút Check-in lấy tem. App chỉ tính khi định vị cho thấy bạn đang ở cách điểm đó dưới 1 km (2 km nếu tọa độ là ước tính). Sổ tem gom tem theo 34 tỉnh thành, xem ở trang chủ hoặc tab Tài khoản. Tem chỉ lưu trên máy này; tải file sao lưu ở trang Sổ tem để khỏi mất khi đổi máy hoặc xóa dữ liệu trình duyệt."},
      {q:"Cài app ra màn hình điện thoại được không? Mất sóng có dùng được không?", a:"Được. iPhone: mở trang bằng Safari, bấm nút Chia sẻ rồi chọn Thêm vào MH chính. Android: mở bằng Chrome, bấm menu ba chấm rồi chọn Cài đặt ứng dụng hoặc Thêm vào màn hình chính. Sau lần mở đầu có sóng, app lưu sẵn dữ liệu 34 tỉnh trên máy, lên đèo mất sóng vẫn xem được địa danh, giá, lịch trình; trợ lý Hỏi chạy ngay trên máy nên mất sóng vẫn hỏi được; riêng bản đồ cần có mạng."},
      {q:"Dữ liệu lấy từ đâu, có đúng không?", a:"Hiện có {PLACE} địa danh và {DISH} món, được tổng hợp và kiểm định kỳ. Đây là thông tin tham khảo, có thể lệch so với thực tế; giá luôn ghi theo khoảng, chỗ nào chưa kiểm được thì app ghi rõ thay vì đoán. Một phần địa danh lấy từ Hộ chiếu khám phá RaceHub, giá và giờ mở cửa đang được bổ sung. Thấy sai thì bấm Báo thông tin sai ở từng mục hoặc gửi thư cho đội hỗ trợ."},
      {q:"App có bán tour, nhận đặt phòng không?", a:"Chưa. Chỗ ở và quán ăn trong app đều chưa phải đối tác và chưa thu phí. Khi có nội dung tài trợ, app sẽ ghi rõ nhãn Tài trợ để bạn phân biệt."}
    ]}
  ];
var BT_ALIAS = [
    ["sai gon","tp-ho-chi-minh"],["hcm","tp-ho-chi-minh"],["ho chi minh","tp-ho-chi-minh"],["vung tau","tp-ho-chi-minh","Bà Rịa – Vũng Tàu"],["con dao","tp-ho-chi-minh","Bà Rịa – Vũng Tàu"],
    ["da lat","lam-dong","Lâm Đồng"],["phan thiet","lam-dong","Bình Thuận"],["mui ne","lam-dong","Bình Thuận"],["gia nghia","lam-dong","Đắk Nông"],
    ["quy nhon","gia-lai","Bình Định"],["pleiku","gia-lai","Gia Lai"],["tuy hoa","dak-lak","Phú Yên"],["buon ma thuot","dak-lak","Đắk Lắk"],
    ["phong nha","quang-tri","Quảng Bình"],["dong hoi","quang-tri","Quảng Bình"],["hoi an","da-nang","Quảng Nam"],["my son","da-nang","Quảng Nam"],
    ["kon tum","quang-ngai","Kon Tum"],["mang den","quang-ngai","Kon Tum"],["ly son","quang-ngai","Quảng Ngãi"],
    ["nha trang","khanh-hoa","Khánh Hòa"],["phan rang","khanh-hoa","Ninh Thuận"],["ha long","quang-ninh"],["cat ba","hai-phong"],
    ["sa pa","lao-cai","Lào Cai"],["sapa","lao-cai","Lào Cai"],["mu cang chai","lao-cai","Yên Bái"],["ha giang","tuyen-quang","Hà Giang"],["dong van","tuyen-quang","Hà Giang"],
    ["moc chau","son-la"],["tam dao","phu-tho","Vĩnh Phúc"],["mai chau","phu-tho","Hòa Bình"],["ba be","thai-nguyen","Bắc Kạn"],
    ["trang an","ninh-binh","Ninh Bình"],["tam coc","ninh-binh","Ninh Bình"],["phu quoc","an-giang","Kiên Giang"],["ha tien","an-giang","Kiên Giang"],["chau doc","an-giang","An Giang"],
    ["sa dec","dong-thap","Đồng Tháp"],["my tho","dong-thap","Tiền Giang"],["ben tre","vinh-long","Bến Tre"],["soc trang","can-tho","Sóc Trăng"],["bac lieu","ca-mau","Bạc Liêu"],
    ["cua lo","nghe-an"],["sam son","thanh-hoa"]
  ];

/* Cách gõ sai dấu hay gặp: đổi về tên đúng trước khi tìm (lưu cả 2 dạng, không bắt người dùng gõ đúng) */
var BT_BIEN_THE = [["mã pì lèng", "mã pí lèng"], ["mã pỳ lèng", "mã pí lèng"], ["hòn dáu", "hòn dấu"], ["sapa", "sa pa"], ["phan thiêt", "phan thiết"]];
