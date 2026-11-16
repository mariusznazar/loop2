// Working copy of slice 7: the comments of the stylesheets before (the four files at the base commit)
// and after, as multisets; prints the comments in one and not the other.
import { readFileSync } from "node:fs";
const grab = (text) => text.match(/\/\*[\s\S]*?\*\//g) ?? [];
const before = ["styles", "run-screen", "program-panel", "programs-screen"].flatMap((n) => grab(readFileSync(`.runs/slice-7-executor/before/${n}.css`, "utf8")));
const names = ["styles", "run-screen", "waiting-screen", "account-card", "credits", "program-panel", "programs-screen", "accounts-screen", "headquarters", "maps-screen", "character-screen", "knowledge-screen"];
const after = names.flatMap((n) => grab(readFileSync(`src/browser/${n}.css`, "utf8")));
const count = (list) => list.reduce((m, c) => m.set(c, (m.get(c) ?? 0) + 1), new Map());
const b = count(before), a = count(after);
let diffs = 0;
for (const [c, n] of b) if (a.get(c) !== n) { console.log(`ONLY BEFORE (${n} vs ${a.get(c) ?? 0}): ${c.slice(0, 70).replace(/\s+/g, " ")}`); diffs++; }
for (const [c, n] of a) if (b.get(c) !== n) { console.log(`ONLY AFTER (${n} vs ${b.get(c) ?? 0}): ${c.slice(0, 70).replace(/\s+/g, " ")}`); diffs++; }
console.log("comments before", before.length, "after", after.length, "differing", diffs);
