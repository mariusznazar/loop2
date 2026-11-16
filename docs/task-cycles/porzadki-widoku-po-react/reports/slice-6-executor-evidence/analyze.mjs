// Working copy of slice 6: lists the top-level units of the base styles.css with the classes of
// their selectors and the files of src/browser/ (not CSS) that name each class.
//   node .runs/slice-6-executor/analyze.mjs <styles.css text file> <report file>
import { readFileSync, readdirSync, statSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { createRequire } from "node:module";
const require = createRequire(import.meta.url);
const csstree = require("css-tree");

const [cssFile, reportFile] = process.argv.slice(2);
const text = readFileSync(cssFile, "utf8");
const ast = csstree.parse(text, { positions: true });

function walk(dir, found = []) {
  for (const name of readdirSync(dir)) {
    const path = join(dir, name);
    if (statSync(path).isDirectory()) walk(path, found);
    else if (/\.(ts|tsx)$/.test(name)) found.push(path);
  }
  return found;
}
const sources = walk("src/browser").map((path) => ({ path: path.replaceAll("\\", "/"), text: readFileSync(path, "utf8") }));

const unitList = [];
let previousEnd = 0;
for (const node of ast.children.toArray()) {
  const start = node.loc.start.offset;
  const end = node.loc.end.offset;
  const gap = text.slice(previousEnd, start);
  const comment = gap.includes("/*") ? gap.trim() : "";
  const classes = new Set();
  const selectors = [];
  csstree.walk(node, {
    visit: "Rule",
    enter(rule) {
      selectors.push(csstree.generate(rule.prelude));
    },
  });
  csstree.walk(node, {
    visit: "ClassSelector",
    enter(sel) {
      classes.add(sel.name);
    },
  });
  unitList.push({ line: node.loc.start.line, endLine: node.loc.end.line, type: node.type, head: node.type === "Atrule" ? `@${node.name} ${node.prelude ? csstree.generate(node.prelude) : ""}` : "", selectors, classes: [...classes], comment: comment.split("\n").slice(0, 2).join(" ").slice(0, 100) });
  previousEnd = end;
}

const PARTS = [
  ["R", /view\/(run-|scene|world-area|tabs-area|now-|discovery-band|end-|chronicle|tile-table|tile-list|terrain-|body-row|status-row|header-rows|clock|combat-line)/],
  ["P", /view\/(program-panel|rule-list|rule-panel|trip-|program-editor|discovery-rule)/],
  ["G", /view\/(program-list|programs-entry)/],
  ["C", /view\/controls\//],
  ["K", /kitchen-sink\//],
];
function partOf(path) {
  for (const [code, re] of PARTS) if (re.test(path)) return code;
  return `o:${path.replace(/^.*\//, "").replace(/\.tsx?$/, "")}`;
}
const lines = [];
for (const unit of unitList) {
  const detail = unit.classes.map((cls) => {
    const re = new RegExp("(?<![\\w-])" + cls.replace(/-/g, "\\-") + "(?![\\w-])");
    const parts = new Set(sources.filter((source) => re.test(source.text)).map((source) => partOf(source.path)));
    return `${cls}[${[...parts].join(",") || "-"}]`;
  });
  const first = unit.selectors[0] ?? unit.head;
  lines.push(`L${unit.line}-${unit.endLine} ${(unit.head || first).slice(0, 70)} :: ${detail.join(" ")}`);
}
writeFileSync(reportFile, lines.join("\n") + "\n", "utf8");
console.log(`units ${unitList.length}`);
