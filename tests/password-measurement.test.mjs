import assert from "node:assert/strict";
import { spawnSync } from "node:child_process";
import { randomBytes } from "node:crypto";
import { existsSync } from "node:fs";
import { mkdir, mkdtemp, rm, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { test } from "node:test";
import { fileURLToPath } from "node:url";
import { measure, parseArguments } from "../scripts/measure-passwords.mjs";

const entryPoint = fileURLToPath(
  new URL("../dist/server/measure-passwords.js", import.meta.url),
);
const commit = "0123456789abcdef0123456789abcdef01234567";
const limit = 536870912; // 512 MiB, compose.yaml mem_limit
// 80% of 512 MiB = 0.8 * 536870912 = 429496729.6 bytes (spec, section 6).
const lastPeakBelowBudget = 429496729;
const firstPeakAtBudget = 429496730;

async function cgroupDirectory(t, files) {
  const directory = await mkdtemp(join(tmpdir(), "loop2-measure-"));
  t.after(() => rm(directory, { recursive: true, force: true }));
  for (const [name, text] of Object.entries(files)) {
    await writeFile(join(directory, name), text);
  }
  return directory;
}

const containerCgroup = {
  "memory.max": "536870912\n",
  "memory.peak": "123456789\n",
  "memory.current": "100000000\n",
  "memory.swap.max": "0\n",
  "memory.events":
    "low 0\nhigh 0\nmax 0\noom 0\noom_kill 0\noom_group_kill 0\n",
};

function runEntryPoint(args, env = {}) {
  const result = spawnSync(process.execPath, [entryPoint, ...args], {
    encoding: "utf8",
    timeout: 180000,
    maxBuffer: 1024 * 1024,
    env: { ...process.env, ...env },
  });
  assert.equal(result.error, undefined, result.error?.message);
  const lines = result.stdout.trim().split("\n");
  return {
    status: result.status,
    stdout: result.stdout,
    result: JSON.parse(lines[lines.length - 1]),
  };
}

test("the entrypoint measures the production profile and gate with synthetic passwords only", async (t) => {
  const directory = await cgroupDirectory(t, containerCgroup);
  // Account settings in the environment must not lead it to open the database or the secret.
  const databasePath = join(directory, "accounts.sqlite");
  const secretPath = join(directory, "session-secrets");
  await writeFile(
    secretPath,
    JSON.stringify([randomBytes(32).toString("base64url")]),
  );
  const run = runEntryPoint(["--cgroup-directory", directory], {
    NODE_ENV: "production",
    LOOP2_DATABASE_PATH: databasePath,
    LOOP2_SESSION_SECRET_FILE: secretPath,
    LOOP2_PUBLIC_ORIGIN: "https://loop2.mariusznazar.com",
    LOOP2_PROXY_MODE: "cloudflare-tunnel",
  });

  assert.equal(run.status, 0, run.stdout);
  const { result } = run;
  assert.equal(result.ok, true);
  assert.deepEqual(result.errors, []);
  // The provisional candidate of the spec, section 5: m=65536 KiB, t=3, p=1, 32 bytes.
  assert.deepEqual(result.profile, {
    type: "argon2id",
    memoryCostKiB: 65536,
    timeCost: 3,
    parallelism: 1,
    hashLength: 32,
  });
  assert.deepEqual(result.gate, {
    admittedTogether: 2,
    thirdRefused: true,
    bothAdmittedAfterRelease: true,
  });
  assert.deepEqual(result.checks, {
    correctAccepted: true,
    wrongRejected: true,
  });
  assert.ok(result.warmup.hashes >= 1 && result.warmup.verifies >= 1);
  assert.equal(result.measured.concurrency, 2);
  assert.equal(result.measured.maxActive, 2);
  assert.ok(result.measured.hashes >= 20, `${result.measured.hashes} hashes`);
  assert.ok(result.measured.verifies >= 20, `${result.measured.verifies}`);
  assert.equal(result.measured.hash.count, result.measured.hashes);
  // The cgroup's own numbers are passed on as read.
  assert.equal(result.memory.cgroupVersion, 2);
  assert.equal(result.memory.cgroupLimitBytes, 536870912);
  assert.equal(result.memory.cgroupPeakBytes, 123456789);
  assert.equal(result.memory.cgroupSwapLimitBytes, 0);
  assert.equal(result.memory.oomEvents, 0);
  assert.equal(result.memory.oomKillEvents, 0);
  assert.equal(result.versions.argon2, "0.45.1"); // package.json pins it
  assert.equal(result.versions.node, process.versions.node);
  assert.doesNotMatch(run.stdout, /\$argon2/);
  assert.equal(existsSync(databasePath), false, "the database was opened");
});

test("the entrypoint reads a cgroup v1 memory controller, counting every hit of its limit", async (t) => {
  // Swap allowed is memsw minus the memory limit: 536870912 - 536870912 = 0.
  const directory = await cgroupDirectory(t, {});
  await mkdir(join(directory, "memory"));
  for (const [name, text] of Object.entries({
    "memory.limit_in_bytes": "536870912\n",
    "memory.memsw.limit_in_bytes": "536870912\n",
    "memory.max_usage_in_bytes": "222222222\n",
    "memory.usage_in_bytes": "111111111\n",
    "memory.failcnt": "3\n",
    "memory.oom_control": "oom_kill_disable 0\nunder_oom 0\noom_kill 1\n",
  }))
    await writeFile(join(directory, "memory", name), text);
  const run = runEntryPoint(["--cgroup-directory", directory]);

  assert.equal(run.status, 0, run.stdout);
  assert.deepEqual(
    { ...run.result.memory, processMaxRssBytes: undefined },
    {
      cgroupVersion: 1,
      cgroupLimitBytes: 536870912,
      cgroupPeakBytes: 222222222,
      cgroupCurrentBytes: 111111111,
      cgroupSwapLimitBytes: 0,
      oomEvents: 3,
      oomKillEvents: 1,
      processMaxRssBytes: undefined,
    },
  );
});

test("the entrypoint refuses to measure where the cgroup reports no peak memory", async (t) => {
  const { "memory.peak": _peak, ...withoutPeak } = containerCgroup;
  const directory = await cgroupDirectory(t, withoutPeak);
  const run = runEntryPoint(["--cgroup-directory", directory]);

  assert.notEqual(run.status, 0);
  assert.equal(run.result.ok, false);
  assert.match(run.result.errors.join(" "), /memory\.peak/);
});

test("the entrypoint stops with a failure when its deadline passes first", async (t) => {
  const directory = await cgroupDirectory(t, containerCgroup);
  const run = runEntryPoint([
    "--cgroup-directory",
    directory,
    "--deadline-ms",
    "1",
  ]);

  assert.notEqual(run.status, 0);
  assert.equal(run.result.ok, false);
  assert.match(run.result.errors.join(" "), /exceeded 1 ms/);
});

// Controlled docker answers: they show how the launcher reacts, not how Docker behaves.
const imageId = "sha256:" + "a".repeat(64);

function passingResult() {
  return {
    ok: true,
    errors: [],
    versions: { node: "24.0.0", argon2: "0.45.1" },
    profile: { type: "argon2id" },
    gate: {
      admittedTogether: 2,
      thirdRefused: true,
      bothAdmittedAfterRelease: true,
    },
    checks: { correctAccepted: true, wrongRejected: true },
    measured: { concurrency: 2, maxActive: 2, hashes: 20, verifies: 20 },
    memory: {
      cgroupLimitBytes: limit,
      cgroupPeakBytes: lastPeakBelowBudget,
      cgroupSwapLimitBytes: 0,
      oomEvents: 0,
      oomKillEvents: 0,
    },
  };
}

function fakeDocker({
  revision = commit,
  oomKilled = false,
  restartCount = 0,
  exitCode = 0,
  memory = limit,
  waitStatus = 0,
  result = passingResult(),
} = {}) {
  const calls = [];
  const docker = (args) => {
    calls.push(args);
    const answer = (stdout) => ({ status: 0, stdout, stderr: "" });
    switch (args[0]) {
      case "image":
        return answer(
          JSON.stringify({
            Id: imageId,
            Config: {
              Labels: {
                "org.opencontainers.image.title": "loop2",
                "org.opencontainers.image.revision": revision,
              },
            },
          }),
        );
      case "run":
        return answer("container-id\n");
      case "wait":
        return { status: waitStatus, stdout: "0\n", stderr: "" };
      case "inspect":
        return answer(
          JSON.stringify({
            Image: imageId,
            RestartCount: restartCount,
            State: { ExitCode: exitCode, OOMKilled: oomKilled },
            HostConfig: { Memory: memory, MemorySwap: memory },
          }),
        );
      case "logs":
        return answer(JSON.stringify(result) + "\n");
      default:
        return answer("");
    }
  };
  return { docker, calls };
}

const request = { image: "loop2-app", commit, memoryBytes: limit };

test("the launcher passes a measured image within every bound and runs it isolated", () => {
  const { docker, calls } = fakeDocker();
  const report = measure(request, docker);

  assert.deepEqual(report.problems, []);
  assert.equal(report.ok, true);
  const run = calls.find((args) => args[0] === "run");
  assert.ok(run, "no container was run");
  const value = (flag) => run[run.indexOf(flag) + 1];
  assert.equal(value("--memory"), "536870912");
  assert.equal(value("--memory-swap"), "536870912");
  assert.equal(value("--network"), "none");
  assert.equal(value("--restart"), "no");
  assert.ok(run.includes(imageId), "the image is run by its inspected id");
  for (const flag of ["-e", "--env", "--env-file", "-v", "--volume", "--mount"])
    assert.equal(run.includes(flag), false, `run passes ${flag}`);
  const name = value("--name");
  assert.deepEqual(calls[calls.length - 1], ["rm", "--force", name]);
});

test("the launcher measures nothing when the image's label names another commit", () => {
  const { docker, calls } = fakeDocker({
    revision: "f".repeat(40),
  });
  const report = measure(request, docker);

  assert.equal(report.ok, false);
  assert.deepEqual(report.problems, [
    "the image's revision label is not the requested commit",
  ]);
  assert.equal(
    calls.some((args) => args[0] === "run"),
    false,
  );
});

test("the launcher fails each run that breaks one bound and still removes its container", () => {
  const overBudget = passingResult();
  overBudget.memory.cgroupPeakBytes = firstPeakAtBudget;
  const oomEvent = passingResult();
  oomEvent.memory.oomKillEvents = 1;
  const reportedError = passingResult();
  reportedError.ok = false;
  reportedError.errors = ["a wrong password was accepted"];
  const tooFew = passingResult();
  tooFew.measured.verifies = 19;
  const thirdAdmitted = passingResult();
  thirdAdmitted.gate.thirdRefused = false;
  const cases = {
    "killed for lack of memory": { oomKilled: true },
    restarted: { restartCount: 1 },
    "nonzero exit": { exitCode: 1 },
    "another memory limit": { memory: 268435456 },
    "peak at 80% of 512 MiB": { result: overBudget },
    "an OOM kill in the cgroup": { result: oomEvent },
    "an error the entrypoint reports": { result: reportedError },
    "19 measured verifications": { result: tooFew },
    "a third operation admitted": { result: thirdAdmitted },
    "no result printed": { result: "not json" },
    "a result without measurements": { result: { ok: true, errors: [] } },
    "the run outlasting its bound": { waitStatus: null },
  };
  for (const [label, options] of Object.entries(cases)) {
    const { docker, calls } = fakeDocker(options);
    const report = measure(request, docker);
    assert.equal(report.ok, false, label);
    assert.notDeepEqual(report.problems, [], label);
    const run = calls.find((args) => args[0] === "run");
    assert.ok(run, `${label}: no container was run`);
    const name = run[run.indexOf("--name") + 1];
    assert.deepEqual(calls[calls.length - 1], ["rm", "--force", name], label);
  }
});

test("the launcher takes only a commit name and a memory limit up to the deployment's", () => {
  assert.deepEqual(
    parseArguments(["--image", "abc", "--commit", commit, "--memory", "512m"]),
    { image: "abc", commit, memoryBytes: 536870912 },
  );
  const refused = [
    ["--image", "abc", "--commit", commit, "--memory", "513m"],
    ["--image", "abc", "--commit", commit, "--memory", "1g"],
    ["--image", "abc", "--commit", commit.toUpperCase(), "--memory", "512m"],
    ["--image", "abc", "--commit", "main", "--memory", "512m"],
    ["--commit", commit, "--memory", "512m"],
    ["--image", "abc", "--commit", commit],
    ["--image", "abc", "--commit", commit, "--memory", "512m", "--env", "x"],
  ];
  for (const args of refused)
    assert.throws(() => parseArguments(args), undefined, args.join(" "));
});
