/* Kiểm api/auth-proxy.js: chuyển tiếp /auth tới đúng Neon Auth, cookie thành cookie của app (Safari giữ được phiên). */
import { createRequire } from "node:module";
import { Readable } from "node:stream";
const require = createRequire(import.meta.url);
const T = require("../app/api/auth-proxy.js")._test;
const loi = [], ok = (c, m) => { if (!c) loi.push(m); console.log((c ? "  đạt  " : "  LỖI  ") + m); };

ok(T.duongDan({ url: "/api/auth-proxy?p=..%2F..%2Fadmin" }).indexOf("/neondb/auth/admin") > 0 && T.UP_HOST.endsWith(".neon.tech"), "Không thoát ra ngoài đường dẫn auth, chỉ tới 1 máy chủ cố định");
const ck = T.suaCookie("__Secure-neon-auth.session_token=abc; Domain=x.neon.tech; Path=/neondb/auth; HttpOnly; Secure; SameSite=None");
ok(!/domain=/i.test(ck) && /Path=\/(;|$)/.test(ck) && /SameSite=Lax/.test(ck) && /HttpOnly/.test(ck) && /Secure/.test(ck), "Cookie: bỏ Domain, Path=/, SameSite=Lax, giữ HttpOnly + Secure");

let goi = null;
const fakeFetch = async (url, o) => { goi = { url, o }; const h = new Headers({ "content-type": "application/json", "set-auth-jwt": "j" });
  h.append("set-cookie", "a=1; Domain=x.neon.tech; Path=/; Secure; SameSite=None"); h.append("set-cookie", "b=2; Path=/; Secure");
  return new Response('{"user":{"id":"u"}}', { status: 200, headers: h }); };
const req = Object.assign(Readable.from([Buffer.from('{"email":"a@b.c"}')]), { url: "/api/auth-proxy?p=sign-in/email", method: "POST",
  headers: { "content-type": "application/json", origin: "https://buitrip.vercel.app", host: "buitrip.vercel.app", "x-forwarded-host": "buitrip.vercel.app", cookie: "c=3" } });
const out = { h: {}, setHeader(k, v) { this.h[k.toLowerCase()] = v; }, end(b) { this.b = String(b); } };
await T.chuyen(req, out, fakeFetch);
ok(/\/neondb\/auth\/sign-in\/email$/.test(goi.url) && goi.o.method === "POST" && String(goi.o.body) === '{"email":"a@b.c"}', "Đăng nhập: chuyển đúng đường dẫn, phương thức và nội dung");
ok(goi.o.headers.origin === "https://buitrip.vercel.app" && goi.o.headers.cookie === "c=3" && !goi.o.headers["x-forwarded-host"] && !goi.o.headers.host, "Gửi kèm Origin + cookie, không gửi host của app (Neon từ chối)");
ok(out.statusCode === 200 && out.h["set-cookie"].length === 2 && !out.h["set-cookie"].some(c => /domain/i.test(c)) && out.h["set-auth-jwt"] === "j" && /"u"/.test(out.b), "Trả về: giữ thân, header JWT, cả 2 cookie đã gắn tên miền app");

console.log(loi.length ? "\nauth-proxy: " + loi.length + " LỖI" : "\nauth-proxy: đạt");
process.exit(loi.length ? 1 : 0);
