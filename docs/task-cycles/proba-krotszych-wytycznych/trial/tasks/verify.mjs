import { spawnSync } from "node:child_process";
import {
  copyFileSync,
  existsSync,
  mkdirSync,
  readdirSync,
  realpathSync,
  rmSync,
  symlinkSync,
  unlinkSync,
} from "node:fs";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";

// node trial-tasks/verify.mjs [T1 T2 ...] [--keep]
//
// For each task: a plain copy of the repository (git archive of HEAD, no .git,
// a node_modules link) under proba-runs/verify-<id>, then
//  - reference/<name>.ts must pass,
//  - alternative/<name>.ts (a second correct solution) must pass,
//  - each violating-<behaviour>[--<label>]/<name>.ts must fail that behaviour,
//    and must still pass `loads` and `works` where they are not the behaviour
//    broken (it fails for that reason and no other).
// Prints a table; exit code 1 when any expectation fails.

const here = dirname(fileURLToPath(import.meta.url));
const worktree = resolve(here, "..");
const runsRoot = resolve(worktree, "..", "proba-runs");
const keep = process.argv.includes("--keep");
const requested = process.argv.slice(2).filter((a) => /^T\d+$/.test(a));

const tasks = [
  { id: "T1", name: "saved-game-overview" },
  { id: "T2", name: "session-end" },
  { id: "T3", name: "account-block-batch" },
].filter((task) => requested.length === 0 || requested.includes(task.id));

function tarProgram() {
  const system = join(
    process.env.SystemRoot ?? "the Windows directory",
    "System32",
    "tar.exe",
  );
  return existsSync(system) ? system : "tar";
}

function copyRepository(destination) {
  removeCopy(destination);
  mkdirSync(destination, { recursive: true });
  const archive = spawnSync(
    "git",
    ["-C", worktree, "archive", "--format=tar", "HEAD"],
    { maxBuffer: 1024 * 1024 * 1024 },
  );
  if (archive.status !== 0)
    throw new Error(`git archive failed: ${archive.stderr}`);
  const extract = spawnSync(tarProgram(), ["-x", "-f", "-"], {
    cwd: destination,
    input: archive.stdout,
    maxBuffer: 64 * 1024 * 1024,
  });
  if (extract.status !== 0) throw new Error(`tar failed: ${extract.stderr}`);
  symlinkSync(
    realpathSync(join(worktree, "node_modules")),
    join(destination, "node_modules"),
    "junction",
  );
}

function removeCopy(destination) {
  const link = join(destination, "node_modules");
  // Unlinked first, so that removing the copy never follows it.
  if (existsSync(link)) unlinkSync(link);
  rmSync(destination, { recursive: true, force: true });
}

function runTest(taskId, runDir) {
  const run = spawnSync(
    process.execPath,
    [join(here, "run-test.mjs"), taskId, runDir],
    { encoding: "utf8", timeout: 600_000, maxBuffer: 64 * 1024 * 1024 },
  );
  if (run.status !== 0)
    return {
      error: `run-test exit ${run.status}: ${run.stderr.trim().slice(-400)}`,
    };
  try {
    return JSON.parse(run.stdout.trim().split(/\r?\n/).at(-1));
  } catch {
    return { error: `no JSON line: ${run.stdout.slice(-200)}` };
  }
}

function install(runDir, task, source) {
  const target = join(runDir, "src", "server", `${task.name}.ts`);
  for (const suffix of [".js", ".js.map", ".d.ts"])
    rmSync(join(runDir, "dist", "server", `${task.name}${suffix}`), {
      force: true,
    });
  copyFileSync(source, target);
}

const rows = [];
let failed = false;

for (const task of tasks) {
  const taskDir = join(here, task.id);
  const runDir = join(runsRoot, `verify-${task.id}`);
  copyRepository(runDir);
  try {
    const variants = [
      { label: "reference", dir: "reference", expect: "pass" },
      { label: "alternative", dir: "alternative", expect: "pass" },
      ...readdirSync(taskDir)
        .filter((entry) => entry.startsWith("violating-"))
        .sort()
        .map((entry) => ({
          label: entry,
          dir: entry,
          expect: "fail",
          behaviour: entry.slice("violating-".length).split("--")[0],
        })),
    ];
    for (const variant of variants) {
      const source = join(taskDir, variant.dir, `${task.name}.ts`);
      if (!existsSync(source)) {
        rows.push([task.id, variant.label, "MISSING FILE", "FAIL"]);
        failed = true;
        continue;
      }
      install(runDir, task, source);
      const result = runTest(task.id, runDir);
      let ok;
      let detail;
      if (result.error) {
        ok = false;
        detail = result.error;
      } else {
        const behaviours = result.behaviours;
        const failing = Object.keys(behaviours).filter((b) => !behaviours[b]);
        detail = result.buildFailed
          ? "BUILD FAILED"
          : `pass=${result.pass} failing=[${failing.join(", ")}]`;
        if (variant.expect === "pass") ok = result.pass === true;
        else {
          const broken = variant.behaviour;
          const mustHold = ["loads", "works"].filter(
            (b) => b !== broken && !(broken === "loads"),
          );
          ok =
            result.buildFailed === false &&
            result.pass === false &&
            behaviours[broken] === false &&
            mustHold.every((b) => behaviours[b] === true);
        }
      }
      rows.push([task.id, variant.label, detail, ok ? "ok" : "FAIL"]);
      if (!ok) failed = true;
    }
  } finally {
    if (!keep) removeCopy(runDir);
  }
}

const widths = [0, 1, 2, 3].map((i) =>
  Math.max(...rows.map((r) => String(r[i]).length)),
);
for (const row of rows)
  process.stdout.write(
    row.map((cell, i) => String(cell).padEnd(widths[i])).join("  ") + "\n",
  );
process.stdout.write(
  failed ? "verify: FAILED\n" : "verify: all expectations hold\n",
);
process.exit(failed ? 1 : 0);
