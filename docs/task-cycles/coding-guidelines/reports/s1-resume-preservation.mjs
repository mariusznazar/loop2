import assert from "node:assert/strict";
import { execFileSync } from "node:child_process";
import { readFileSync } from "node:fs";
import { createRequire } from "node:module";
import { fileURLToPath } from "node:url";

const root = fileURLToPath(new URL("../../../../", import.meta.url));
const require = createRequire(new URL("../../../../package.json", import.meta.url));
const eslintRequire = createRequire(require.resolve("eslint"));
const { parse } = eslintRequire("espree");
const prior = (file) => execFileSync("git", ["show", `HEAD:${file}`], { cwd: root, encoding: "utf8" });
const normalized = (source) => JSON.parse(JSON.stringify(parse(source, { ecmaVersion: "latest", sourceType: "module" }), (key, value) => ["raw", "start", "end"].includes(key) ? undefined : value));
const beforeBuild = prior("scripts/build.mjs");
assert.equal(beforeBuild.split("node_modules/typescript/bin/tsc").length - 1, 1);
assert.deepEqual(normalized(beforeBuild.replace("node_modules/typescript/bin/tsc", "node_modules/typescript-compiler/bin/tsc")), normalized(readFileSync(new URL("../../../../scripts/build.mjs", import.meta.url), "utf8")));
const previousLock = JSON.parse(prior("package-lock.json"));
const currentLock = require("./package-lock.json");
const differences = [];
for (const key of new Set([...Object.keys(previousLock.packages), ...Object.keys(currentLock.packages)])) {
  if (JSON.stringify(previousLock.packages[key]) === JSON.stringify(currentLock.packages[key])) continue;
  differences.push({ path: key, before: previousLock.packages[key]?.version, after: currentLock.packages[key]?.version });
  assert.ok(key === "" || key === "node_modules/npm" || key.startsWith("node_modules/npm/node_modules/") || key.endsWith("node_modules/@typescript/old"), key);
}
console.log(JSON.stringify({ normalizedBuildAst: "only compiler path changes", lockEntryCount: Object.keys(currentLock.packages).length, lockChangedEntries: differences }));
