import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { createRequire } from "node:module";
import { fileURLToPath } from "node:url";

const root = new URL("../../../../", import.meta.url);
const require = createRequire(new URL("package.json", root));
const manifest = require("./package.json");
const lock = require("./package-lock.json");
const expected = { "@eslint/js": "10.0.1", eslint: "10.12.0", globals: "17.13.0", npm: "12.2.1", prettier: "3.9.10", "typescript-eslint": "8.71.2" };
const versions = {};
for (const [name, version] of Object.entries(expected)) {
  const installed = JSON.parse(readFileSync(new URL(`node_modules/${name}/package.json`, root), "utf8"));
  assert.equal(manifest.devDependencies[name], version);
  assert.equal(lock.packages[`node_modules/${name}`].version, version);
  assert.equal(installed.version, version);
  versions[name] = installed.version;
}
const parserRequire = createRequire(require.resolve("@typescript-eslint/parser"));
const estreeRequire = createRequire(parserRequire.resolve("@typescript-eslint/typescript-estree"));
const apiRequire = createRequire(estreeRequire.resolve("typescript"));
assert.equal(estreeRequire("typescript").version, "6.0.2");
assert.equal(apiRequire("@typescript/old").version, "6.0.2");
assert.equal(require("typescript-compiler").version, "7.0.2");
assert.equal(manifest.devDependencies.typescript, "npm:@typescript/typescript6@6.0.2");
assert.equal(manifest.devDependencies["typescript-compiler"], "npm:typescript@7.0.2");
assert.equal(manifest.overrides["@typescript/old"], "npm:typescript@6.0.2");
const npmRequire = createRequire(new URL("node_modules/npm/package.json", root));
for (const [name, version] of Object.entries({ semver: "7.8.5", "make-fetch-happen": "16.0.1", "npm-registry-fetch": "20.0.1" })) {
  const installed = npmRequire(`${name}/package.json`);
  assert.equal(installed.version, version);
  versions[`npm/${name}`] = installed.version;
}
console.log(JSON.stringify({ node: process.version, versions, api: estreeRequire("typescript").version, compiler: require("typescript-compiler").version, actualApiPath: apiRequire.resolve("@typescript/old"), root: fileURLToPath(root) }));
