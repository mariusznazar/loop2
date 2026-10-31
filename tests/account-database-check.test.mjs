import assert from "node:assert/strict";
import { spawn } from "node:child_process";
import { mkdtemp, readdir, rm, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { test } from "node:test";
import { fileURLToPath } from "node:url";

// The release check of the image build (D-215, account-save-sqlite-upgrade),
// run as the Dockerfile's RUN step runs it: its own process, on the Node.js
// that starts it, on real SQLite files in its temporary directory.

const check = fileURLToPath(
  new URL("../dist/server/account-database-check.js", import.meta.url),
);
// Long enough for a loaded computer, short enough that a stuck check fails the
// test instead of hanging the gate (D-84).
const limitMs = 60_000;

const standin = new URL("./account-database-check-standin.mjs", import.meta.url)
  .href;

// `mode` runs the built check under the stand-in for `backup` of
// `node:sqlite`, which spoils the backup as the mode says.
function runCheck(temporary, mode) {
  const env = { ...process.env, TMPDIR: temporary, TMP: temporary };
  env.TEMP = temporary;
  const args = [check];
  if (mode !== undefined) {
    env.LOOP2_CHECK_STANDIN = mode;
    args.unshift("--import", standin);
  }
  const child = spawn(process.execPath, args, {
    env,
    stdio: ["ignore", "pipe", "pipe"],
  });
  let stdout = "";
  let stderr = "";
  child.stdout.setEncoding("utf8").on("data", (chunk) => (stdout += chunk));
  child.stderr.setEncoding("utf8").on("data", (chunk) => (stderr += chunk));
  return new Promise((resolve, reject) => {
    const deadline = setTimeout(() => {
      child.kill();
      reject(new Error("release check deadline"));
    }, limitMs);
    child.once("error", (error) => {
      clearTimeout(deadline);
      reject(error);
    });
    child.once("close", (code) => {
      clearTimeout(deadline);
      resolve({ code, stdout, stderr });
    });
  });
}

async function sandbox(t) {
  const directory = await mkdtemp(join(tmpdir(), "loop2-check-test-"));
  t.after(() => rm(directory, { recursive: true, force: true }));
  return directory;
}

test("the check passes on this Node.js, prints the release it checked and leaves no file", async (t) => {
  const directory = await sandbox(t);
  const result = await runCheck(directory);
  assert.equal(result.code, 0, result.stderr);
  assert.ok(
    result.stdout.includes(process.version),
    `the output names the release ${process.version}: ${result.stdout}`,
  );
  assert.deepEqual(await readdir(directory), []);
});

test("the check fails when its temporary directory cannot be written", async (t) => {
  const directory = await sandbox(t);
  // A regular file where the directory should be: nothing can be made in it,
  // on any platform and whoever runs the test.
  const notADirectory = join(directory, "not-a-directory");
  await writeFile(notADirectory, "x");
  const result = await runCheck(notADirectory);
  assert.notEqual(result.code, 0);
  assert.ok(
    !result.stdout.includes(process.version),
    "a failed check does not claim a release passed",
  );
});

// The stand-in must have been reached, or a variant that "fails" proves
// nothing: the control passes the real backup through and still succeeds.
test("the check passes under the pass-through stand-in, which it reached", async (t) => {
  // invariant: account-save-sqlite-upgrade
  const directory = await sandbox(t);
  const result = await runCheck(directory, "pass-through");
  assert.equal(result.code, 0, result.stderr);
  assert.ok(result.stderr.includes("standin-reached"), "stand-in reached");
  assert.ok(result.stdout.includes(process.version));
  assert.deepEqual(await readdir(directory), []);
});

const differences = {
  "an empty backup": "empty",
  "another password hash in the backup": "other-hash",
  "another saved game state in the backup": "other-game",
  "a backup taken in two steps": "two-steps",
  "a release that refuses the backup's rate": "refused-rate",
};
for (const [name, mode] of Object.entries(differences)) {
  test(`the check fails on ${name}`, async (t) => {
    // invariant: account-save-sqlite-upgrade
    const directory = await sandbox(t);
    const result = await runCheck(directory, mode);
    assert.ok(result.stderr.includes("standin-reached"), "stand-in reached");
    assert.notEqual(result.code, 0, result.stdout);
    assert.ok(
      !result.stdout.includes("checked"),
      `no success line: ${result.stdout}`,
    );
    assert.deepEqual(await readdir(directory), []);
  });
}
