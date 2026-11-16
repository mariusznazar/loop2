// Working copy of slice 7: splits the current src/browser/styles.css (a copy of it kept in this
// directory as styles-base.css) into styles.css and the eight new files. Rules move whole, each with
// the comment that stands over it, in their order; the file heads are written from heads7.json.mjs.
//   node .runs/slice-7-executor/split7.mjs   (worktree root)
import { readFileSync, writeFileSync } from "node:fs";
import { createRequire } from "node:module";
import { HEADS, FILES } from "./heads7.json.mjs";
const require = createRequire(import.meta.url);
const csstree = require("css-tree");

const dir = ".runs/slice-7-executor";
const text = readFileSync(`${dir}/styles-base.css`, "utf8");
const ast = csstree.parse(text, { positions: true });

// The destination of a top-level node by the line it starts on in styles-base.css.
const RANGES = [
  [507, 518, "W"], // .session-check, .session-check-text
  [520, 604, "A"], // the screen of the login card, the card, its switch and forms
  [606, 633, "C"], // the folded credits of the card and of Siedziba
  [635, 732, "N"], // the list of accounts
  [753, 917, "H"], // the camp, the headquarters, the team, the chest, the report of earning loops
  [919, 923, "M"], // .rehearsal-mark: drawn by maps-screen.tsx alone
  [925, 927, "H"], // .character-creation-label
  [1034, 1042, "C"], // .credits, .credits a
  [1051, 1135, "X"], // the screen Postać
  [1144, 1342, "M"], // the screen Mapy
  [1354, 1438, "K"], // the screen Wiedza
];
const destinationOf = (line) => RANGES.find(([from, to]) => line >= from && line <= to)?.[2] ?? "S";

const parts = Object.fromEntries(Object.keys(FILES).map((key) => [key, []]));
const report = [];
let previousEnd = 0;
let first = true;
for (const node of ast.children.toArray()) {
  const start = node.loc.start.offset;
  const end = node.loc.end.offset;
  const gap = text.slice(previousEnd, start);
  previousEnd = end;
  let comment = "";
  const at = gap.indexOf("/*");
  if (at !== -1) {
    comment = gap.slice(at);
    if ((gap.match(/\/\*/g) ?? []).length > 1) report.push(`line ${node.loc.start.line}: more than one comment in the gap`);
    const afterLastComment = comment.slice(comment.lastIndexOf("*/") + 2);
    if ((afterLastComment.match(/\n/g) ?? []).length !== 1) report.push(`line ${node.loc.start.line}: blank line between the comment and the rule`);
  }
  const destination = destinationOf(node.loc.start.line);
  const unit = `${first ? "" : comment.replace(/\s+$/, "") + (comment ? "\n" : "")}${text.slice(start, end)}`;
  first = false;
  parts[destination].push({ line: node.loc.start.line, selector: csstree.generate(node.prelude ?? node.block), unit });
}
if (text.slice(previousEnd).trim() !== "") report.push("text after the last rule");

for (const [key, file] of Object.entries(FILES)) {
  const body = parts[key].map((entry) => entry.unit).join("\n\n");
  writeFileSync(`src/browser/${file}`, `${HEADS[key].trimEnd()}\n${key === "S" ? "" : "\n"}${body}\n`, "utf8");
  console.log(file, parts[key].length, "units");
}
console.log(report.length ? report.join("\n") : "no irregular gaps");
