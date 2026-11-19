// Applies one mutation at a time to the copied compiled modules and runs the copied tests on each,
// writing exit codes and the first failing assertion to mutate.log (UTF-8).
import { spawnSync } from "node:child_process";
import { readFileSync, writeFileSync, appendFileSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const here = dirname(fileURLToPath(import.meta.url));
const log = join(here, "mutate.log");
writeFileSync(log, "", "utf8");
const state = join(here, "dist/browser/view/run-screen-state.js");
const entry = join(here, "dist/browser/view/run-entry.js");
const originals = new Map(
  [state, entry].map((file) => [file, readFileSync(file, "utf8")]),
);

const GUARD = ["tests/view/run-screen-state.test.mjs"];
const ALL = [
  "tests/view/run-screen-state.test.mjs",
  "tests/view/end-window-game.test.mjs",
  "tests/view/end-question.test.mjs",
  "tests/view/uncaught-failure.test.mjs",
  "tests/view/state-store.test.mjs",
];

const mutations = [
  { name: "none", file: state, from: "", to: "", tests: ALL },
  {
    name: "entered does not reopen the window at halt",
    file: state,
    from: "if (run !== null && mapRunEnded(run))\n                    windowOpen = true;",
    to: "if (!game.halted() && run !== null && mapRunEnded(run))\n                    windowOpen = true;",
    tests: ALL,
  },
  {
    name: "entered stops whole at halt",
    file: state,
    from: "if (onScreen)\n                    return;\n                onScreen = true;",
    to: "if (onScreen || game.halted())\n                    return;\n                onScreen = true;",
    tests: GUARD,
  },
  {
    name: "left keeps the wait at halt",
    file: state,
    from: "closeQuestionNow();\n                effectPending = false;\n                onScreen = false;",
    to: "closeQuestionNow();\n                if (!game.halted()) effectPending = false;\n                onScreen = false;",
    tests: GUARD,
  },
  {
    name: "left closes the question at halt",
    file: state,
    from: "closeQuestionNow();\n                effectPending = false;\n                onScreen = false;",
    to: "closeQuestionNow();\n                question = null;\n                effectPending = false;\n                onScreen = false;",
    tests: GUARD,
  },
  {
    name: "page: Koniec przejscia stops at halt in run-entry",
    file: entry,
    from: "screenState.openWindow();",
    to: "if (!store.halted()) screenState.openWindow();",
    tests: ALL,
  },
  {
    name: "page: end of effect stops at halt in run-entry",
    file: entry,
    from: "screenState.effectEnded();",
    to: "if (!store.halted()) screenState.effectEnded();",
    tests: ALL,
  },
];

for (const m of mutations) {
  for (const [file, text] of originals) writeFileSync(file, text, "utf8");
  const original = originals.get(m.file).replace(/\r\n/g, "\n");
  if (m.from !== "") {
    const count = original.split(m.from).length - 1;
    if (count !== 1) {
      appendFileSync(log, `${m.name}: pattern found ${count} times, skipped\n`, "utf8");
      continue;
    }
    writeFileSync(m.file, original.replace(m.from, m.to), "utf8");
  }
  for (const test of m.tests) {
    const run = spawnSync(process.execPath, ["--test", "--test-reporter=tap", join(here, test)], {
      cwd: here,
      encoding: "utf8",
      maxBuffer: 64 * 1024 * 1024,
    });
    const out = `${run.stdout}\n${run.stderr}`;
    const fails = [...out.matchAll(/^not ok \d+ - (.*)$/gm)].map((x) => x.at(1));
    const pass = out.match(/^# pass (\d+)/m)?.at(1);
    const fail = out.match(/^# fail (\d+)/m)?.at(1);
    appendFileSync(
      log,
      `${m.name} | ${test} | exit ${run.status} | pass ${pass} fail ${fail}${fails.length ? ` | failed: ${fails.join(" ; ")}` : ""}\n`,
      "utf8",
    );
  }
}
for (const [file, text] of originals) writeFileSync(file, text, "utf8");
console.log("done");
