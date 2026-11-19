// Checks that every top-level declaration of the new kitchen-sink modules appears in the base entry
// file, comments, imports, whitespace and the export keyword left out. Output ASCII only.
import { readFileSync, writeFileSync } from "node:fs";
const dir = process.argv[2];
const NAMES = ["kitchen-sink", "sample-parts", "control-samples", "account-samples", "role-samples", "tile-samples"];
function strip(text) {
  return text
    .replace(/\/\*[\s\S]*?\*\//g, "")
    .split("\n")
    .filter((line) => !/^\s*\/\//.test(line))
    .join("\n");
}
function chunks(text) {
  const noImports = text.replace(/^import[\s\S]*?;\s*$/gm, "");
  return noImports
    .split(/\n(?=(?:export\s+)?(?:function|const|type|let)\s)/)
    .map((c) => c.replace(/^\s*export\s+/, "").replace(/\s+/g, ""))
    .filter((c) => c.length > 0);
}
const base = strip(readFileSync(`${dir}/base.tsx`, "utf8")).replace(/\s+/g, "");
const report = [];
let missing = 0;
let total = 0;
for (const f of NAMES) {
  for (const c of chunks(strip(readFileSync(`${dir}/new-${f}.tsx`, "utf8")))) {
    total += 1;
    if (!base.includes(c)) {
      missing += 1;
      report.push(`MISSING in ${f}: ${c.slice(0, 400)}`);
    }
  }
}
const joined = NAMES.map((f) => chunks(strip(readFileSync(`${dir}/new-${f}.tsx`, "utf8"))).join("")).join("");
let baseMissing = 0;
for (const c of chunks(strip(readFileSync(`${dir}/base.tsx`, "utf8")))) {
  if (!joined.includes(c)) {
    baseMissing += 1;
    report.push(`BASE CHUNK NOT IN NEW: ${c.slice(0, 400)}`);
  }
}
writeFileSync(`${dir}/compare-out.txt`, report.join("\n\n"), "utf8");
console.log(`new chunks ${total}, not in base ${missing}, base chunks not in new ${baseMissing}`);
