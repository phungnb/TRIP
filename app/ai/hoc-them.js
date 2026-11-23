/* BuiTrip AI — phần trợ lý đã học từ nhật ký câu hỏi, sau khi người duyệt đồng ý.
   Tệp này do tools/hoc/ap-dung.mjs sinh ra, không sửa tay. Quy trình: tools/hoc/README.md
   bien_the: [cách gõ hay gặp, tên đúng] — nối vào BT_BIEN_THE (hoi-dap.js). */
var BT_HOC = {
  duyet: "",
  bien_the: []
};
(function () {
  if (typeof BT_BIEN_THE === "undefined") return;
  BT_HOC.bien_the.forEach(function (v) { if (!BT_BIEN_THE.some(function (b) { return b[0] === v[0]; })) BT_BIEN_THE.push(v); });
})();
