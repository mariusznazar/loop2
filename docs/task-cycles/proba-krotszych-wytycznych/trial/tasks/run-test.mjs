import { spawnSync } from "node:child_process";
import { existsSync } from "node:fs";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";

// node trial-tasks/run-test.mjs <taskId> <runDir>
//
// Builds the run directory (a plain copy of the repository with a
// node_modules link, the agent's files in it) and runs the task's test on the
// build. Prints one JSON line on standard output:
//   {"task":"T1","pass":true|false,"behaviours":{"<name>":true|false},"buildFailed":true|false}
// Exit code 0 whenever it could decide, 2 when it could not run at all.
// Everything else goes to standard error.

const here = dirname(fileURLToPath(import.meta.url));
const [taskId, runArgument] = process.argv.slice(2);

function cannot(message) {
  process.stderr.write(`run-test: ${message}\n`);
  process.exit(2);
}

if (!taskId || !runArgument || process.argv.length > 4)
  cannot("usage: node trial-tasks/run-test.mjs <taskId> <runDir>");
if (!/^T\d+$/.test(taskId)) cannot(`unknown task ${taskId}`);
const testFile = join(here, taskId, "test.mjs");
if (!existsSync(testFile)) cannot(`no test for task ${taskId}`);
const runDir = resolve(runArgument);
if (!existsSync(join(runDir, "scripts", "build.mjs")))
  cannot(`${runDir} holds no scripts/build.mjs`);
if (!existsSync(join(runDir, "node_modules")))
  cannot(`${runDir} holds no node_modules link`);

function tail(text, lines) {
  return text.trimEnd().split(/\r?\n/).slice(-lines).join("\n");
}

const build = spawnSync(process.execPath, ["scripts/build.mjs"], {
  cwd: runDir,
  encoding: "utf8",
  timeout: 280_000,
  maxBuffer: 64 * 1024 * 1024,
});
if (build.error) cannot(`the build did not run: ${build.error.message}`);
if (build.status !== 0) {
  process.stderr.write(
    `run-test: build failed with exit code ${build.status}\n${tail(
      `${build.stdout}\n${build.stderr}`,
      30,
    )}\n`,
  );
  process.stdout.write(
    `${JSON.stringify({ task: taskId, pass: false, behaviours: {}, buildFailed: true })}\n`,
  );
  process.exit(0);
}

const run = spawnSync(
  process.execPath,
  ["--test", "--test-reporter=tap", testFile],
  {
    cwd: here,
    env: { ...process.env, RUN_DIR: runDir },
    encoding: "utf8",
    timeout: 280_000,
    maxBuffer: 64 * 1024 * 1024,
  },
);
if (run.error) cannot(`the test did not run: ${run.error.message}`);

// The reporter writes one line per test at the first level; the lines of
// nested tests and of failure details are indented.
const behaviours = {};
for (const line of run.stdout.split(/\r?\n/)) {
  const match = /^(not )?ok \d+ - (.+?)(?: # (SKIP|TODO).*)?$/.exec(line);
  if (!match) continue;
  behaviours[match[2]] = match[1] === undefined && match[3] === undefined;
}
if (Object.keys(behaviours).length === 0)
  cannot(
    `the test of ${taskId} reported no result:\n${tail(`${run.stdout}\n${run.stderr}`, 30)}`,
  );

const pass = Object.values(behaviours).every(Boolean);
if (!pass)
  process.stderr.write(
    `run-test: failed behaviours of ${taskId}: ${Object.keys(behaviours)
      .filter((name) => !behaviours[name])
      .join(", ")}\n${tail(run.stdout, 60)}\n`,
  );
process.stdout.write(
  `${JSON.stringify({ task: taskId, pass, behaviours, buildFailed: false })}\n`,
);
