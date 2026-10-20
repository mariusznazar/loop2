import assert from "node:assert/strict";
import { execFileSync } from "node:child_process";
import { copyFileSync, mkdirSync, mkdtempSync, readFileSync, symlinkSync, writeFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const root = fileURLToPath(new URL("../../../../", import.meta.url));
const fixture = mkdtempSync(path.join(root, ".runs/s1-resume-paths-"));
const { ESLint } = await import(pathToFileURL(path.join(root, "node_modules/eslint/lib/api.js")));
symlinkSync(path.join(root, "node_modules"), path.join(fixture, "node_modules"), "junction");
for (const name of ["package.json", "eslint.config.mjs", "prettier.config.mjs", "tsconfig.browser.json", "tsconfig.server.json", ".gitattributes"]) {
  copyFileSync(path.join(root, name), path.join(fixture, name));
}
const cases = [];
for (const directory of ["src/browser/sim/new", "src/browser/view/new", "src/server/new", "scripts/new", "tests/sim/new", "tests/view/new", "tests/quality/new"]) {
  mkdirSync(path.join(fixture, directory), { recursive: true });
  for (const extension of ["ts", "mts", "cts", "tsx", "js", "mjs", "cjs", "jsx"]) {
    const typed = ["ts", "mts", "cts", "tsx"].includes(extension);
    for (const bad of [false, true]) {
      const relative = `${directory}/${bad ? "bad" : "good"}.${extension}`;
      const source = typed
        ? bad ? "Promise.resolve(1);\nexport {};\n" : "export const value: number = 1;\n"
        : bad ? "debugger;\n" : "console.log(1);\n";
      writeFileSync(path.join(fixture, relative), source);
      cases.push({ relative, typed, bad });
    }
  }
}
const engine = new ESLint({ cwd: fixture, overrideConfigFile: path.join(fixture, "eslint.config.mjs") });
for (const item of cases) {
  const absolute = path.join(fixture, item.relative);
  const config = await engine.calculateConfigForFile(absolute);
  assert.ok(config, item.relative);
  const active = Object.values(config.rules).filter((value) => value[0] !== 0);
  assert.equal(active.length, item.typed ? 92 : 64, item.relative);
  const [result] = await engine.lintFiles([absolute]);
  assert.ok(!result.messages.some((message) => message.fatal), JSON.stringify({ item, messages: result.messages }));
  if (item.bad) {
    assert.ok(result.messages.some((message) => message.ruleId === (item.typed ? "@typescript-eslint/no-floating-promises" : "no-debugger")), JSON.stringify({ item, messages: result.messages }));
  } else {
    assert.equal(result.errorCount, 0, JSON.stringify({ item, messages: result.messages }));
  }
}
execFileSync("git", ["init", "--quiet"], { cwd: fixture });
const browserMarkup = ["src/browser/index.html", "src/browser/sim/new/scene.html", "src/browser/view/new/scene.css", "tests/sim/new/scene.css", "tests/view/new/scene.html"];
const selected = [...cases.map((item) => item.relative), ...browserMarkup, "eslint.config.mjs", "prettier.config.mjs", "scripts/build.mjs", "tests/http.test.mjs", "tests/startup.test.mjs"];
for (const relative of selected) {
  const output = execFileSync("git", ["-c", "core.attributesFile=", "check-attr", "text", "eol", "--", relative], { cwd: fixture, encoding: "utf8", env: { ...process.env, GIT_ATTR_NOSYSTEM: "1", GIT_CONFIG_GLOBAL: process.platform === "win32" ? "NUL" : "/dev/null" } });
  assert.ok(output.includes(": text: set") && output.includes(": eol: lf"), output);
}
for (const relative of ["README.md", "assets/icons/example.svg", "scripts/new/helper.py", "src/server/new/page.html", "tests/quality/new/page.css"]) {
  const output = execFileSync("git", ["-c", "core.attributesFile=", "check-attr", "text", "eol", "--", relative], { cwd: fixture, encoding: "utf8", env: { ...process.env, GIT_ATTR_NOSYSTEM: "1", GIT_CONFIG_GLOBAL: process.platform === "win32" ? "NUL" : "/dev/null" } });
  assert.ok(output.includes(": eol: unspecified"), output);
}
const prettier = await import(pathToFileURL(path.join(root, "node_modules/prettier/index.mjs")));
for (const relative of ["scripts/new/good.ts", "src/browser/view/new/scene.css"]) {
  const absolute = path.join(fixture, relative);
  const explicit = await prettier.resolveConfig(absolute, { config: path.join(fixture, "prettier.config.mjs"), editorconfig: false });
  const editor = await prettier.resolveConfig(absolute, { editorconfig: true });
  assert.deepEqual(explicit, editor);
  const formatted = await prettier.format("const value='text'", { ...explicit, filepath: path.join(fixture, "scripts/new/example.mjs") });
  assert.equal(formatted, 'const value = "text";\n');
}
console.log(JSON.stringify({ fixture, lintCases: cases.length, typedGoodAndBadPerDirectory: 8, ruleCounts: [64, 92], attributePaths: selected.length, attributeExclusionControls: 5, sharedEditorOptions: true }));
