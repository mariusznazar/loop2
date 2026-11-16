// Working copy of slice 6: compares two recordings of computed styles, state by state.
//   node .runs/slice-6-executor/compare-styles.mjs <dirA> <dirB> <report-file>
// Prints counts only; the list of differences goes to the report file (UTF-8).
import { readFileSync, readdirSync, writeFileSync } from "node:fs";

const [dirA, dirB, reportFile] = process.argv.slice(2);
// A start of the game takes a port of its own, and the icon masks carry the address of their start.
const normalise = (value) => (typeof value === "string" ? value.replace(/127[.]0[.]0[.]1:[0-9]+/g, "127.0.0.1:PORT") : value);
const states = readdirSync(dirA).filter((name) => name.endsWith(".json"));
const lines = [];
let total = 0;
for (const file of states) {
  const a = JSON.parse(JSON.parse(readFileSync(`${dirA}/${file}`, "utf8")));
  const b = JSON.parse(JSON.parse(readFileSync(`${dirB}/${file}`, "utf8")));
  let diffs = 0;
  const only = (x, y, which) => {
    for (const key of Object.keys(x.styles))
      if (!(key in y.styles)) {
        lines.push(`${file} ONLY IN ${which}: ${key}`);
        diffs++;
      }
  };
  only(a, b, "A");
  only(b, a, "B");
  for (const key of Object.keys(a.styles)) {
    if (!(key in b.styles)) continue;
    for (const prop of new Set([...Object.keys(a.styles[key]), ...Object.keys(b.styles[key])])) {
      if (normalise(a.styles[key][prop]) !== normalise(b.styles[key][prop])) {
        lines.push(`${file} ${key} ${prop}: ${JSON.stringify(a.styles[key][prop])} -> ${JSON.stringify(b.styles[key][prop])}`);
        diffs++;
      }
    }
  }
  console.log(`${file}: elements ${a.count} / ${b.count}, hash ${a.hash} / ${b.hash}, differences ${diffs}`);
  total += diffs;
}
writeFileSync(reportFile, `${lines.join("\n")}\n`, "utf8");
console.log(`total differences ${total}`);
