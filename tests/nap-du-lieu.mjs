/* Nạp dữ liệu app vào Node giống trình duyệt (dùng chung cho các bài kiểm). */
import fs from "node:fs";
import path from "node:path";
import vm from "node:vm";
import { fileURLToPath } from "node:url";
export const APP = path.join(path.dirname(fileURLToPath(import.meta.url)), "..", "app");
export function napDuLieu(opt) {
  const bo = new Set((opt && opt.bo) || []);
  const ctx = { window: {}, console };
  ctx.window = ctx;
  vm.createContext(ctx);
  for (const f of ["data/prov-data.js", "data/sap-nhap.js", "data/racehub-places.js", "data/lam-giau.js", "data/bo-sung.js", "data/dia-diem-moi.js", "data/an-o-moi.js", "data/trung-tam.js", "js/lam-sach.js", "data/anh.js"]) {
    if (bo.has(f) || !fs.existsSync(path.join(APP, f))) continue;
    vm.runInContext(fs.readFileSync(path.join(APP, f), "utf8"), ctx, { filename: f });
  }
  vm.runInContext("this.__P=PROV_DATA;this.__S=typeof SAP_NHAP!=='undefined'?SAP_NHAP:{};this.__A=typeof PHOTOS!=='undefined'?PHOTOS:{};", ctx);
  return { PROV: ctx.__P, SAP: ctx.__S, PHOTOS: ctx.__A };
}
