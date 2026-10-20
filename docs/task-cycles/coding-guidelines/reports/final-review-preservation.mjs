import { execFileSync } from "node:child_process";
import { createRequire } from "node:module";
import { fileURLToPath } from "node:url";
import { resolve } from "node:path";
import { writeFileSync } from "node:fs";

const root = process.cwd();
const require = createRequire(resolve(root, "package.json"));
const ts = require("typescript");
const prettier = require("prettier");
const base = "c379207bfd8bd148d3589ea75604ba5165915d01";
const head = "e31f6a4051f33b832cb8603d67e815240af5464f";
const git = (...args) => execFileSync("git", args, { cwd: root, encoding: "utf8" });
const show = (ref, path) => git("show", `${ref}:${path}`);
const files = git("diff", "--name-only", "--diff-filter=M", base, head)
  .trim().split("\n").filter((name) => /\.(?:ts|mjs|html)$/.test(name));
const printer = ts.createPrinter({ removeComments: false });
const rows = [];
let removed = 0;
for (const path of files) {
  const before = show(base, path);
  const after = show(head, path);
  const row = { path, removedAssertions: [] };
  let source = before;
  if (path.endsWith(".ts")) {
    const parse = (text) => ts.createSourceFile(path, text, ts.ScriptTarget.Latest, true);
    const oldTree = parse(before);
    const newTree = parse(after);
    const kept = new Map();
    const key = (node, tree) => printer.printNode(ts.EmitHint.Expression, node.expression, tree);
    const visitKept = (node) => {
      if (ts.isNonNullExpression(node)) {
        const value = key(node, newTree);
        kept.set(value, (kept.get(value) ?? 0) + 1);
      }
      ts.forEachChild(node, visitKept);
    };
    visitKept(newTree);
    const cuts = [];
    const visitOld = (node) => {
      if (ts.isNonNullExpression(node)) {
        const value = key(node, oldTree);
        if (kept.get(value)) kept.set(value, kept.get(value) - 1);
        else {
          if (before[node.end - 1] !== "!") throw Error("Invalid non-null span");
          cuts.push(node.end - 1);
          row.removedAssertions.push(value);
        }
      }
      ts.forEachChild(node, visitOld);
    };
    visitOld(oldTree);
    if ([...kept.values()].some(Boolean)) throw Error("New non-null assertion " + path);
    for (const index of cuts.sort((a, b) => b - a)) {
      source = source.slice(0, index) + source.slice(index + 1);
    }
    removed += cuts.length;
  }
  if (path === "scripts/build.mjs") {
    source = source.replace("node_modules/typescript/bin/tsc", "node_modules/typescript-compiler/bin/tsc");
    row.compilerAliasChange = true;
  }
  const expected = await prettier.format(source, { filepath: path });
  row.exactExpectedOutput = expected === after;
  rows.push(row);
}
const result = { base, head, files: rows.length, removed, rows };
writeFileSync(resolve(fileURLToPath(new URL(".", import.meta.url)), "final-review-preservation.json"),
  JSON.stringify(result, null, 2) + "\n");
console.log(JSON.stringify({ files: rows.length, removed, failures: rows.filter((r) => !r.exactExpectedOutput) }));
if (removed !== 16 || rows.some((r) => !r.exactExpectedOutput)) process.exit(1);
