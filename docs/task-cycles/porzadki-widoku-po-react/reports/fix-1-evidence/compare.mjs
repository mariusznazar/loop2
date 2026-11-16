// Compares two recordings (directories) state by state: computed styles of every element and pseudo-element,
// and the list of animations. Prints counts; the differences go to the report file.
import { readFileSync, readdirSync, writeFileSync } from "node:fs";
const [dirA, dirB, reportFile] = process.argv.slice(2);
const normalise = (v) => (typeof v === "string" ? v.replace(/127[.]0[.]0[.]1:[0-9]+/g, "127.0.0.1:PORT") : v);
const lines = [];
let total = 0;
for (const file of readdirSync(dirA).filter((n) => n.endsWith(".json")).sort()) {
  const a = JSON.parse(JSON.parse(readFileSync(`${dirA}/${file}`, "utf8")));
  const b = JSON.parse(JSON.parse(readFileSync(`${dirB}/${file}`, "utf8")));
  let diffs = 0;
  for (const k of Object.keys(a.styles)) if (!(k in b.styles)) { lines.push(`${file} ONLY IN A: ${k}`); diffs++; }
  for (const k of Object.keys(b.styles)) if (!(k in a.styles)) { lines.push(`${file} ONLY IN B: ${k}`); diffs++; }
  for (const k of Object.keys(a.styles)) {
    if (!(k in b.styles)) continue;
    for (const p of new Set([...Object.keys(a.styles[k]), ...Object.keys(b.styles[k])]))
      if (normalise(a.styles[k][p]) !== normalise(b.styles[k][p])) { lines.push(`${file} ${k} ${p}: ${JSON.stringify(a.styles[k][p])} -> ${JSON.stringify(b.styles[k][p])}`); diffs++; }
  }
  const sa = JSON.stringify(a.animations), sb = JSON.stringify(b.animations);
  if (sa !== sb) { lines.push(`${file} ANIMATIONS differ`); diffs++; }
  const frames = a.animations.filter((x) => /scene-frames/.test(x));
  const sel = (re) => Object.keys(a.styles).filter((k) => re.test(k.split(">").pop()) && a.styles[k]["animation-name"] === "scene-frames").length;
  console.log(`${file}: elements ${a.count} / ${b.count}, animations ${a.animations.length} / ${b.animations.length} (scene-frames ${frames.length}), scene-frames on mage-sprite img ${sel(/^img/)}, differences ${diffs}`);
  total += diffs;
}
writeFileSync(reportFile, `${lines.join("\n")}\n`, "utf8");
console.log(`total differences ${total}`);
