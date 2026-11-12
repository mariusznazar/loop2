import assert from "node:assert/strict";
import { spawnSync } from "node:child_process";
import { readdirSync, readFileSync } from "node:fs";
import { join } from "node:path";
import { test } from "node:test";
import { fileURLToPath } from "node:url";

const root = fileURLToPath(new URL("../../", import.meta.url));
const child = "tests/view/memory-limit-child.mjs";
const testRunnerFile = "scripts/test-node-file.mjs";
const harness = "tests/view/page-document.mjs";

// Both sizes stand far below anything that matters and far above nothing: a
// bare Node process takes less than the limit, and the stop leaves the growth
// seconds to pass the limit before the child would end by itself.
const growing = { limitMiB: 128, stopMiB: 512 };
// The same growth past the limit above, under a limit it never meets.
const quiet = { limitMiB: 512, stopMiB: 200 };

function runChild(args, { limitMiB, stopMiB }) {
  const env = {
    ...process.env,
    MEMORY_LIMIT_CHILD_LIMIT_MIB: String(limitMiB),
    MEMORY_LIMIT_CHILD_STOP_MIB: String(stopMiB),
  };
  // Inherited, it runs nothing: the second route ends 1 with no child started
  // and the first 0, so a test reading the exit code alone would prove nothing.
  delete env.NODE_TEST_CONTEXT;
  const result = spawnSync(process.execPath, args, {
    cwd: root,
    encoding: "utf8",
    env,
    timeout: 60000,
    maxBuffer: 1024 * 1024,
  });
  assert.equal(result.error, undefined, result.error?.message);
  return result;
}

function assertKilledSentence(output, limitMiB) {
  const reached = /killed .*memory-limit-child\.mjs at (\d+) MiB/.exec(output);
  assert.ok(reached, `no sentence naming the file in: ${output}`);
  assert.ok(Number(reached[1]) > limitMiB, reached[0]);
  assert.match(output, new RegExp(`limit of ${limitMiB} MiB`));
  assert.match(output, /no flaky test/);
  assert.match(output, /failing comparison on a rendered element/);
}

function importedModules(text) {
  const moduleImport =
    /\b(?:from|import|require)\s*\(?\s*(["'`])([^"'`\n]+)\1/g;
  return Array.from(text.matchAll(moduleImport), (match) => match[2]);
}

// Read as text, so nothing is loaded. A dynamic import of a computed name goes
// round it, as t.assert and a helper's own node:assert do.
function refusals(files) {
  const refused = [];
  for (const [path, text] of Object.entries(files)) {
    const modules = importedModules(text);
    if (
      path !== harness &&
      modules.some((name) => /^(?:jsdom|happy-dom)(?:\/|$)/.test(name))
    ) {
      refused.push(`${path} loads a document imitation outside ${harness}`);
    }
    if (
      modules.some((name) => /(?:^|\/)page-document\.mjs$/.test(name)) &&
      modules.some((name) => /^(?:node:)?assert(?:\/strict)?$/.test(name))
    ) {
      refused.push(
        `${path} imports an assertion module of Node beside the harness`,
      );
    }
  }
  return refused;
}

// Crafted text is built from its parts, so this file's own text holds no such
// import for the guard to trip on.
function imported(name) {
  return `import value from "${name}";`;
}

function testFiles() {
  return Object.fromEntries(
    readdirSync(join(root, "tests"), { recursive: true })
      .map((path) => `tests/${path.replaceAll("\\", "/")}`)
      .filter((path) => /\.[cm]?[jt]sx?$/.test(path))
      .map((path) => [path, readFileSync(join(root, path), "utf8")]),
  );
}

test("a child growing on a stuck main thread is killed before its own stop and says why on standard error", () => {
  // invariant: document-test-memory-limit
  const result = runChild([child], growing);

  // Windows ends a killed process with 1, Linux reports the signal.
  assert.ok(result.status === 1 || result.signal === "SIGKILL", result.stderr);
  assertKilledSentence(result.stderr, growing.limitMiB);
  assert.doesNotMatch(result.stdout, /reached its own stop/);
});

for (const [route, args] of [
  ["node --test", ["--test", child]],
  [testRunnerFile, [testRunnerFile, child]],
]) {
  test(`a killed child reads as a failed run with its sentence through ${route}`, () => {
    // invariant: document-test-memory-limit
    const result = runChild(args, growing);
    const output = result.stdout + result.stderr;

    assert.equal(result.status, 1, output);
    assertKilledSentence(output, growing.limitMiB);
    assert.doesNotMatch(output, /reached its own stop/);
  });
}

test("a child under its limit ends well and nothing kills it", () => {
  // invariant: document-test-memory-limit
  const result = runChild([child], quiet);

  assert.equal(result.status, 0, result.stderr);
  assert.equal(result.stderr, "");
  const stop = /reached its own stop at (\d+) MiB/.exec(result.stdout);
  assert.ok(stop, result.stdout);
  assert.ok(Number(stop[1]) >= quiet.stopMiB, stop[0]);
});

test("the tree holds no file that goes round the harness of a document imitation", () => {
  // invariant: document-test-memory-limit
  const files = testFiles();

  // Precondition: the guard reads the files that matter, this one included.
  assert.ok("tests/view/account-screen.test.mjs" in files);
  assert.ok("tests/view/memory-limit.test.mjs" in files);
  assert.deepEqual(refusals(files), []);
});

for (const [form, source] of [
  ["named import", (name) => `import { JSDOM } from "${name}";`],
  ["bare import", (name) => `import "${name}";`],
  ["import over lines", (name) => `import {\n  JSDOM,\n} from '${name}';`],
  ["re-export", (name) => `export * from "${name}";`],
  ["dynamic import", (name) => `await import("${name}");`],
  ["dynamic import over lines", (name) => `await import(\n  '${name}',\n);`],
  ["require", (name) => `require("${name}");`],
]) {
  for (const name of ["jsdom", "jsdom/lib/api.js", "happy-dom"]) {
    test(`the guard refuses ${name} taken by ${form} outside the harness`, () => {
      // invariant: document-test-memory-limit
      const path = "tests/view/crafted.test.mjs";

      assert.deepEqual(refusals({ [path]: source(name) }), [
        `${path} loads a document imitation outside ${harness}`,
      ]);
    });
  }
}

test("the guard refuses an imitation in a file that only shares the harness's name", () => {
  // invariant: document-test-memory-limit
  const path = "tests/sim/page-document.mjs";

  assert.deepEqual(refusals({ [path]: imported("jsdom") }), [
    `${path} loads a document imitation outside ${harness}`,
  ]);
});

for (const [form, source] of [
  ["default import", (name) => `import assert from "${name}";`],
  ["named import", (name) => `import { equal } from "${name}";`],
  ["dynamic import", (name) => `await import("${name}");`],
]) {
  for (const name of ["assert", "node:assert", "node:assert/strict"]) {
    test(`the guard refuses ${name} taken by ${form} beside the harness`, () => {
      // invariant: document-test-memory-limit
      const path = "tests/view/crafted.test.mjs";
      const onHarness = `import { assert } from "./page-document${".mjs"}";`;

      assert.deepEqual(refusals({ [path]: `${onHarness}\n${source(name)}` }), [
        `${path} imports an assertion module of Node beside the harness`,
      ]);
    });
  }
}

test("the guard leaves the harness its imitation, and Node's assert to a file without the harness", () => {
  // invariant: document-test-memory-limit
  const files = {
    [harness]: imported("jsdom"),
    "tests/view/plain.test.mjs": imported("node:assert/strict"),
    "tests/view/on-harness.test.mjs": imported("../view/page-document.mjs"),
  };

  assert.deepEqual(refusals(files), []);
});
