// Working copy of slice 7: for each top-level unit of a stylesheet, the classes of its selectors and
// the files of src/browser/ (TypeScript) that give an element each class (a quoted token on a line
// speaking of a class), plus the first line of the comment over it.
//   node place.mjs <css file> <out file>
import { readFileSync, readdirSync, statSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { createRequire } from "node:module";
const require = createRequire("package.json");
const csstree = require("css-tree");
const [cssFile, outFile] = process.argv.slice(2);
const text = readFileSync(cssFile, "utf8");
const ast = csstree.parse(text, { positions: true });
function walk(dir, found = []) {
  for (const name of readdirSync(dir)) {
    const p = join(dir, name);
    if (statSync(p).isDirectory()) walk(p, found);
    else if (/\.(ts|tsx)$/.test(name)) found.push(p);
  }
  return found;
}
const sources = walk("src/browser").filter((p) => !p.replaceAll("\\", "/").includes("/sim/")).map((p) => {
  const t = readFileSync(p, "utf8");
  const tokens = new Set();
  for (const line of t.split("\n")) {
    if (!/class/i.test(line)) continue;
    for (const lit of line.match(/"[^"]*"|'[^']*'|`[^`]*`/g) ?? [])
      for (const tok of lit.slice(1, -1).replace(/\$\{[^}]*\}/g, " ").split(/\s+/)) if (/^[a-z][a-z0-9-]*$/.test(tok)) tokens.add(tok);
  }
  return { name: p.replaceAll("\\", "/").replace("src/browser/", "").replace(/^view\//, "").replace(/\.tsx?$/, ""), tokens };
});
const lines = [];
let prev = 0;
for (const node of ast.children.toArray()) {
  const gap = text.slice(prev, node.loc.start.offset);
  prev = node.loc.end.offset;
  const comment = gap.includes("/*") ? gap.slice(gap.indexOf("/*")).replace(/\s+/g, " ").slice(0, 110) : "";
  const classes = new Set();
  csstree.walk(node, { visit: "ClassSelector", enter: (n) => classes.add(n.name) });
  const sel = [];
  csstree.walk(node, { visit: "Rule", enter: (r) => sel.push(csstree.generate(r.prelude)) });
  const head = node.type === "Atrule" ? `@${node.name} ${node.prelude ? csstree.generate(node.prelude) : ""}` : "";
  const detail = [...classes].map((c) => `${c}[${sources.filter((s) => s.tokens.has(c)).map((s) => s.name).join(",") || "-"}]`);
  lines.push(`L${node.loc.start.line}-${node.loc.end.line} ${(head || sel[0] || "").slice(0, 80)}${sel.length > 1 && !head ? " (+" + (sel.length - 1) + ")" : ""} :: ${detail.join(" ")}${comment ? "  // " + comment : ""}`);
}
writeFileSync(outFile, lines.join("\n") + "\n", "utf8");
console.log("units", lines.length);
