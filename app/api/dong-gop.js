/* Đóng góp mã nguồn mở: POST /api/dong-gop -> vá app/data/prov-data.js, sinh lại
   prov-data.gon.js, tự mở Pull Request trên GitHub (nhánh dong-gop/<slug>).
   Admin chỉ cần bấm Merge PR là Vercel tự deploy lên site.
   Cần env GITHUB_TOKEN (fine-grained PAT: repo phungnb/TRIP, quyền Contents +
   Pull requests: Read + Write). Chưa có token -> 503, form hiện hướng dẫn gửi qua
   mục Hỗ trợ. Chống spam cơ bản: honeypot (ô website), giới hạn 10 đóng góp/IP/ngày
   (băm sha256, ghi svc.dong_gop_log; nếu Neon chưa có bảng thì bỏ qua giới hạn này
   nhưng vẫn giữ honeypot + kiểm hợp lệ).
   Kiểm hợp lệ theo đúng luật của tests/du-lieu.mjs và neon/003 (bt_check_field):
   chữ hiển thị không chứa mẫu cấm, không chứa thẻ HTML, đúng giới hạn ký tự,
   lat 8-24 / lng 102-118, địa danh mới bắt buộc có tọa độ từ link Google Maps. */
const { sql } = require("./_db");
const crypto = require("crypto");

const OWNER = "phungnb";
const REPO = "TRIP";
const GH = "https://api.github.com";
const BO = new Set(["source", "sources", "review_m_src", "phoneSrc", "src"]);
const BAN = [/theo (các |nhiều |một số)?nguồn/i, /các nguồn mâu thuẫn/i, /\(\s*\)/, /\(\s+\S/, /Tọa độ\s/];
const FIELDS = ["gia", "gio", "dia_chi", "dien_thoai", "cach_di", "mo_ta", "khac"];
const MAPF = { gia: "price", gio: "hours", dia_chi: "address", dien_thoai: "phone", cach_di: "note", mo_ta: "note", khac: "note" };

function cut(s, n) { s = s == null ? "" : String(s).trim(); return s.length > n ? s.slice(0, n) : s; }
function send(res, code, obj) {
  res.statusCode = code;
  res.setHeader("content-type", "application/json; charset=utf-8");
  res.setHeader("cache-control", "no-store");
  res.end(JSON.stringify(obj));
}
function slugify(s) {
  return String(s || "").toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/đ/g, "d")
    .replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "").slice(0, 40) || "muc-moi";
}
function badText(s) {
  if (/[<>]/.test(s)) return "Nội dung chứa ký tự không hợp lệ.";
  if (/<\s*script/i.test(s)) return "Nội dung chứa mã không hợp lệ.";
  for (const r of BAN) if (r.test(s)) return "Nội dung chứa cụm từ chưa được phép (ghi nguồn kiểu \"theo các nguồn\" hoặc ngoặc trống).";
  return null;
}
function checkText(s, min, max, label) {
  s = cut(s, max + 1);
  if (s.length < min) return label + " quá ngắn.";
  if (s.length > max) return label + " quá dài (tối đa " + max + " ký tự).";
  return badText(s);
}
function haversineKm(lat1, lng1, lat2, lng2) {
  const R = 6371, dLa = (lat2 - lat1) * Math.PI / 180, dLo = (lng2 - lng1) * Math.PI / 180;
  const a = Math.sin(dLa / 2) ** 2 + Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * Math.sin(dLo / 2) ** 2;
  return 2 * R * Math.asin(Math.sqrt(a));
}
function strip(o) {
  if (Array.isArray(o)) return o.map(strip);
  if (o && typeof o === "object") return Object.fromEntries(Object.entries(o).filter(([k]) => !BO.has(k)).map(([k, v]) => [k, strip(v)]));
  return o;
}
function gh(path, method, token, body) {
  return fetch(GH + path, {
    method: method || "GET",
    headers: {
      "Authorization": "Bearer " + token,
      "Accept": "application/vnd.github+json",
      "X-GitHub-Api-Version": "2022-11-28",
      "User-Agent": "BuiTrip-dong-gop",
      ...(body ? { "Content-Type": "application/json" } : {})
    },
    body: body ? JSON.stringify(body) : undefined
  });
}

module.exports = async function handler(req, res) {
  if (req.method !== "POST") { res.setHeader("allow", "POST"); return send(res, 405, { error: "method" }); }
  let b = req.body;
  if (typeof b === "string") { try { b = JSON.parse(b); } catch (e) { b = {}; } }
  b = b || {};
  if (b.website) return send(res, 200, { ok: true }); /* bẫy bot: ô ẩn */
  const token = process.env.GITHUB_TOKEN;
  if (!token) return send(res, 503, { error: "chu_bat", message: "Kênh đóng góp tự động chưa bật (thiếu token GitHub trên máy chủ). Gửi tạm qua mục Hỗ trợ của nút Hỏi." });

  /* ---------- kiểm hợp lệ ---------- */
  const mode = b.mode, kind = b.kind;
  if (mode !== "bao-sai" && mode !== "them-moi") return send(res, 400, { error: "Chế độ không hợp lệ." });
  if (!["place", "dish", "stay"].includes(kind)) return send(res, 400, { error: "Loại mục không hợp lệ." });
  const provId = cut(b.prov_id, 40);
  if (!/^[a-z0-9-]{2,40}$/.test(provId)) return send(res, 400, { error: "Tỉnh/thành không hợp lệ." });
  const contributor = cut(b.contributor, 60) || null;
  if (contributor) { const e = badText(contributor); if (e) return send(res, 400, { error: e }); }
  let lat = null, lng = null;
  if (b.lat != null || b.lng != null) {
    lat = Number(b.lat); lng = Number(b.lng);
    if (!isFinite(lat) || !isFinite(lng) || lat < 8 || lat > 24 || lng < 102 || lng > 118)
      return send(res, 400, { error: "Tọa độ ngoài Việt Nam (vĩ độ 8–24, kinh độ 102–118)." });
  }
  let patch = null; /* {prov, arr, item} cho bao-sai; {prov, arr, item} cho them-moi */
  if (mode === "bao-sai") {
    if (!FIELDS.includes(b.field)) return send(res, 400, { error: "Mục cần sửa không hợp lệ." });
    const value = cut(b.value, 1000);
    const e = checkText(value, 3, 1000, "Thông tin đúng");
    if (e) return send(res, 400, { error: e });
    const itemId = cut(b.item_id, 80);
    if (!/^[a-z0-9-]{2,80}$/.test(itemId)) return send(res, 400, { error: "Mã mục không hợp lệ." });
    patch = { itemId, field: b.field, value };
    if (b.field === "dia_chi" && lat != null) patch.lat = lat, patch.lng = lng;
  } else {
    const name = cut(b.name, 160);
    const e = checkText(name, 2, 160, "Tên");
    if (e) return send(res, 400, { error: e });
    const address = cut(b.address, 300), price = cut(b.price, 200), hours = cut(b.hours, 200), note = cut(b.note, 1000);
    for (const [v, lbl, mx] of [[address, "Địa chỉ", 300], [price, "Giá", 200], [hours, "Giờ mở cửa", 200], [note, "Ghi chú", 1000]]) {
      if (v) { const er = badText(v); if (er) return send(res, 400, { error: er }); if (v.length > mx) return send(res, 400, { error: lbl + " quá dài." }); }
    }
    if (kind === "place" && lat == null) return send(res, 400, { error: "Địa danh mới cần link Google Maps để lấy tọa độ." });
    patch = { name, address: address || "", price: price || "Chưa kiểm được", hours: hours || "", note: note || "", lat, lng };
  }

  /* ---------- giới hạn 10 đóng góp/IP/ngày (bỏ qua nếu Neon chưa có bảng) ---------- */
  const ip = String(req.headers["x-forwarded-for"] || "").split(",")[0].trim() || "?";
  const iph = crypto.createHash("sha256").update(ip + "|bt-dong-gop").digest("hex").slice(0, 24);
  try {
    await sql("create table if not exists svc.dong_gop_log(ip text, at timestamptz default now())", []);
    const c = await sql("select count(*)::int as n from svc.dong_gop_log where ip = $1 and at > now() - interval '1 day'", [iph]);
    if (Number(c[0] && c[0].n) >= 10) return send(res, 429, { error: "Hôm nay máy này đã gửi 10 đóng góp. Thử lại ngày mai, hoặc gửi thư cho buitrip.hotro@gmail.com." });
  } catch (e) { console.error("dong-gop rate-limit bỏ qua:", e.message); }

  /* ---------- lấy dữ liệu gốc từ GitHub ---------- */
  let baseSha, fileSha, gonSha, origText;
  try {
    const refR = await gh("/repos/" + OWNER + "/" + REPO + "/git/ref/heads/main", "GET", token);
    if (!refR.ok) throw new Error("github ref " + refR.status);
    baseSha = (await refR.json()).object.sha;
    const fR = await gh("/repos/" + OWNER + "/" + REPO + "/contents/app/data/prov-data.js?ref=main", "GET", token);
    if (!fR.ok) throw new Error("github file " + fR.status);
    const fj = await fR.json();
    fileSha = fj.sha;
    origText = Buffer.from(fj.content.replace(/\n/g, ""), "base64").toString("utf8");
    const gR = await gh("/repos/" + OWNER + "/" + REPO + "/contents/app/data/prov-data.gon.js?ref=main", "GET", token);
    if (!gR.ok) throw new Error("github gon " + gR.status);
    gonSha = (await gR.json()).sha;
  } catch (e) {
    console.error("dong-gop github read:", e.message);
    return send(res, 503, { error: "Chưa lấy được dữ liệu gốc, thử lại sau." });
  }
  const m = origText.match(/([\s\S]*?var PROV_DATA=)(\[[\s\S]*\]);\s*$/);
  if (!m) return send(res, 503, { error: "Dữ liệu gốc không đọc được, thử lại sau." });
  let data;
  try { data = JSON.parse(m[2]); } catch (e) { return send(res, 503, { error: "Dữ liệu gốc không đọc được, thử lại sau." }); }
  const prov = data.find(x => x.id === provId);
  if (!prov) return send(res, 400, { error: "Tỉnh/thành không có trong app." });
  const arrName = kind === "place" ? "places" : kind === "dish" ? "dishes" : "stays";
  const arr = prov[arrName] || (prov[arrName] = []);

  /* ---------- vá dữ liệu ---------- */
  let title, bodyLines, newId = null;
  if (mode === "bao-sai") {
    const item = arr.find(x => x.id === patch.itemId);
    if (!item) return send(res, 400, { error: "Mục này không còn trong app (có thể đã đổi mã)." });
    let f = MAPF[patch.field];
    if (kind === "dish" && f !== "price") f = "desc";
    if (kind === "stay" && f === "hours") f = "note";
    item[f] = patch.value;
    if (patch.lat != null && kind === "place") { item.lat = patch.lat; item.lng = patch.lng; item.approx = true; }
    title = "Sửa " + item.name + " (" + prov.name + ") — đóng góp cộng đồng";
    bodyLines = [
      "Đóng góp từ form \"Đóng góp / Báo sai\" trên buitrip.com (không cần đăng nhập).",
      "",
      "- Tỉnh/thành: " + prov.name + " (" + prov.id + ")",
      "- Mục: " + item.name + " (mã " + item.id + ", loại " + kind + ")",
      "- Sửa trường: " + patch.field + " → " + f,
      "- Giá trị mới: " + patch.value,
      ...(patch.lat != null ? ["- Tọa độ mới (từ link Google Maps): " + patch.lat + ", " + patch.lng] : []),
      ...(b.maps_url ? ["- Link Google Maps: " + cut(b.maps_url, 500)] : []),
      ...(contributor ? ["- Người đóng góp: " + contributor] : []),
      "",
      "Kiểm lại nội dung trước khi Merge. CI sẽ sinh lại prov-data.gon.js + trang tĩnh tỉnh."
    ];
  } else {
    const slug = slugify(patch.name);
    for (let i = 0; i < 5; i++) {
      const cand = "moi-" + slug + "-" + crypto.randomBytes(2).toString("hex");
      if (!origText.includes('"id":"' + cand + '"')) { newId = cand; break; }
    }
    if (!newId) return send(res, 409, { error: "Không sinh được mã mới, thử lại sau." });
    let item;
    if (kind === "place") {
      const dist = Math.round(haversineKm(prov.lat, prov.lng, patch.lat, patch.lng) * 1.6);
      item = { id: newId, name: patch.name, address: patch.address, cluster: "kham-pha-them", lat: patch.lat, lng: patch.lng, approx: true, dist, price: patch.price, hours: patch.hours, duration: "", suitable: "", note: patch.note, source: "Đóng góp cộng đồng" };
    } else if (kind === "dish") {
      const desc = [patch.note, patch.address ? "Địa chỉ quán gợi ý: " + patch.address : "", patch.hours ? "Giờ: " + patch.hours : ""].filter(Boolean).join("; ");
      item = { id: newId, name: patch.name, meal: "", price: patch.price, desc, restaurants: [], source: "Đóng góp cộng đồng" };
    } else {
      const note = [patch.note, patch.hours ? "Giờ nhận/trả phòng: " + patch.hours : ""].filter(Boolean).join("; ");
      item = { id: newId, name: patch.name, address: patch.address, area: "kham-pha-them", kind: "Khác", price: patch.price, dist: "", suitable: "", status_text: "Chưa kiểm chứng / chưa đối tác / chưa thu phí", phone: "", note, source: "Đóng góp cộng đồng" };
    }
    arr.push(item);
    title = "Thêm " + patch.name + " (" + prov.name + ") — đóng góp cộng đồng";
    bodyLines = [
      "Đóng góp từ form \"Đóng góp / Báo sai\" trên buitrip.com (không cần đăng nhập).",
      "",
      "- Tỉnh/thành: " + prov.name + " (" + prov.id + ")",
      "- Mục mới: " + patch.name + " (mã " + newId + ", loại " + kind + ")",
      ...(patch.address ? ["- Địa chỉ: " + patch.address] : []),
      ...(patch.lat != null ? ["- Tọa độ (từ link Google Maps): " + patch.lat + ", " + patch.lng] : []),
      ...(patch.price ? ["- Giá: " + patch.price] : []),
      ...(patch.hours ? ["- Giờ: " + patch.hours] : []),
      ...(patch.note ? ["- Ghi chú: " + patch.note] : []),
      ...(b.maps_url ? ["- Link Google Maps: " + cut(b.maps_url, 500)] : []),
      ...(contributor ? ["- Người đóng góp: " + contributor] : []),
      "",
      "Kiểm lại nội dung trước khi Merge (đặc biệt: giờ mở cửa, giá, cụm khu vực). CI sẽ sinh lại prov-data.gon.js + trang tĩnh tỉnh."
    ];
  }

  /* ---------- sinh lại 2 file ---------- */
  const newProvText = m[1] + JSON.stringify(data) + ";\n";
  const gonText = "/* SINH TỰ ĐỘNG bởi tools/tao-ban-gon.mjs từ prov-data.js — không sửa tay. */\nvar PROV_DATA=" + JSON.stringify(strip(data)) + ";\n";
  const branch = "dong-gop/" + slugify(mode === "bao-sai" ? patch.itemId || patch.name : patch.name) + "-" + crypto.randomBytes(2).toString("hex");

  /* ---------- đẩy lên GitHub + mở PR ---------- */
  try {
    const refR = await gh("/repos/" + OWNER + "/" + REPO + "/git/refs", "POST", token, { ref: "refs/heads/" + branch, sha: baseSha });
    if (!refR.ok) throw new Error("github branch " + refR.status + " " + (await refR.text()).slice(0, 200));
    const put1 = await gh("/repos/" + OWNER + "/" + REPO + "/contents/app/data/prov-data.js", "PUT", token, {
      message: title, content: Buffer.from(newProvText, "utf8").toString("base64"), sha: fileSha, branch
    });
    if (put1.status === 409) return send(res, 409, { error: "Vừa có người gửi đóng góp trước, dữ liệu đã đổi. Thử lại." });
    if (!put1.ok) throw new Error("github put prov-data " + put1.status + " " + (await put1.text()).slice(0, 200));
    const put2 = await gh("/repos/" + OWNER + "/" + REPO + "/contents/app/data/prov-data.gon.js", "PUT", token, {
      message: title + " (bản gọn)", content: Buffer.from(gonText, "utf8").toString("base64"), sha: gonSha, branch
    });
    if (!put2.ok) throw new Error("github put gon " + put2.status + " " + (await put2.text()).slice(0, 200));
    const prR = await gh("/repos/" + OWNER + "/" + REPO + "/pulls", "POST", token, {
      title, head: branch, base: "main", body: bodyLines.join("\n")
    });
    if (!prR.ok) throw new Error("github pr " + prR.status + " " + (await prR.text()).slice(0, 200));
    const pr = await prR.json();
    try { await sql("insert into svc.dong_gop_log(ip) values ($1)", [iph]); } catch (e) { /* đã bỏ qua giới hạn thì cũng bỏ qua ghi log */ }
    return send(res, 200, { ok: true, pr_url: pr.html_url, pr_number: pr.number, branch });
  } catch (e) {
    console.error("dong-gop github write:", e.message);
    return send(res, 503, { error: "Chưa mở được Pull Request, thử lại sau hoặc gửi qua mục Hỗ trợ." });
  }
};
