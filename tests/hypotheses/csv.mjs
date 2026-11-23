/* Đọc/ghi CSV (có ngoặc kép, xuống dòng trong ô) không cần thư viện. */
export function docCsv(s) {
  const rows = []; let row = [], cell = "", q = false;
  s = s.replace(/^﻿/, "");
  for (let i = 0; i < s.length; i++) {
    const c = s[i];
    if (q) { if (c === '"') { if (s[i + 1] === '"') { cell += '"'; i++; } else q = false; } else cell += c; continue; }
    if (c === '"') q = true;
    else if (c === ",") { row.push(cell); cell = ""; }
    else if (c === "\n" || c === "\r") { if (c === "\r" && s[i + 1] === "\n") i++; row.push(cell); rows.push(row); row = []; cell = ""; }
    else cell += c;
  }
  if (cell || row.length) { row.push(cell); rows.push(row); }
  const head = rows.shift();
  return { head, rows: rows.filter(r => r.some(Boolean)).map(r => Object.fromEntries(head.map((h, i) => [h, r[i] || ""]))) };
}
export function ghiCsv(head, rows) {
  const e = v => { v = String(v == null ? "" : v); return /[",\n\r]/.test(v) ? '"' + v.replace(/"/g, '""') + '"' : v; };
  return [head.map(e).join(",")].concat(rows.map(r => head.map(h => e(r[h])).join(","))).join("\n") + "\n";
}
