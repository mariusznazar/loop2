// Working copy of slice 6: splits the base src/browser/styles.css (a copy of it kept in this
// directory as styles-base.css) into styles.css and the three new files. Rules move whole, each with
// the comment that stands over it, in their order; the file heads are written by the caller below.
//   node .runs/slice-6-executor/split.mjs
import { readFileSync, writeFileSync } from "node:fs";
import { createRequire } from "node:module";
const require = createRequire(import.meta.url);
const csstree = require("css-tree");

const dir = ".runs/slice-6-executor";
const text = readFileSync(`${dir}/styles-base.css`, "utf8");
const ast = csstree.parse(text, { positions: true });

// The destination of a top-level node by the line it starts on in the base file. S stays in
// styles.css, R goes to run-screen.css, P to program-panel.css and G to programs-screen.css.
const RANGES = [
  [273, 393, "R"], // the grid of the areas of Przejście, the area under the drawing, the chronicle
  [780, 793, "P"], // the list "Program:", its actions and the name field
  [800, 814, "G"], // the confirmation of "Zacznij od zera"
  [916, 984, "P"], // the label, the copy, the notes, the title, the rule list panel, the switch
  [994, 1015, "G"], // the list of programs
  [1017, 1056, "P"], // the rule group, the trip editor, the lists of the trip plan
  [1063, 1066, "R"], // .trip-result (drawn by the world area alone)
  [1073, 1149, "P"], // the trip plan of the panel, the legacy rule rows
  [1171, 1407, "P"], // the rule list, the drop line and the rule panel
  [1555, 1558, "R"], // .run-practice
  [1611, 2021, "R"], // the header, the band, the question, the window, the rows, the body row
  [2043, 2895, "R"], // the world area with the scene, its motion and keyframes, the drawing's frame
];
const destinationOf = (line) => RANGES.find(([from, to]) => line >= from && line <= to)?.[2] ?? "S";

const parts = { S: [], R: [], P: [], G: [] };
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
    if ((gap.match(/\/\*/g) ?? []).length > 1)
      report.push(`line ${node.loc.start.line}: more than one comment in the gap`);
    const afterLastComment = comment.slice(comment.lastIndexOf("*/") + 2);
    if ((afterLastComment.match(/\n/g) ?? []).length !== 1)
      report.push(`line ${node.loc.start.line}: blank line between the comment and the rule`);
  }
  const destination = destinationOf(node.loc.start.line);
  const unit = `${first ? "" : comment.replace(/\s+$/, "") + (comment ? "\n" : "")}${text.slice(start, end)}`;
  first = false;
  parts[destination].push({ line: node.loc.start.line, unit });
}
if (text.slice(previousEnd).trim() !== "") report.push("text after the last rule");

const HEADS = JSON.parse(readFileSync(`${dir}/heads.json`, "utf8"));
for (const [file, key] of [
  ["src/browser/styles.css", "S"],
  ["src/browser/run-screen.css", "R"],
  ["src/browser/program-panel.css", "P"],
  ["src/browser/programs-screen.css", "G"],
]) {
  const body = parts[key].map((entry) => entry.unit).join("\n\n");
  writeFileSync(file, `${HEADS[key].trimEnd()}\n${key === "S" ? "" : "\n"}${body}\n`, "utf8");
  console.log(file, parts[key].length, "units");
}
console.log(report.length ? report.join("\n") : "no irregular gaps");
