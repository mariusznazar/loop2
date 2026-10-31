import assert from "node:assert/strict";
import { spawn } from "node:child_process";
import { createHash } from "node:crypto";
import {
  mkdir,
  mkdtemp,
  readdir,
  readFile,
  rm,
  writeFile,
} from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { test } from "node:test";
import { backup as sqliteBackup, DatabaseSync } from "node:sqlite";
import { fileURLToPath } from "node:url";
import { AccountDatabase } from "../dist/server/database.js";

// The backup command (D-225) and the method behind it (D-112, D-223, D-230),
// run as
// `docker exec loop2 node dist/server/account-backup.js --to-standard-output`
// runs them: their own process, the database path its only setting, on real
// SQLite files.

const command = fileURLToPath(
  new URL("../dist/server/account-backup.js", import.meta.url),
);
const word = "--to-standard-output";
const sourceDirectory = fileURLToPath(
  new URL("../src/server/", import.meta.url),
);

const SEEDED = 1500;
// 6 KiB of text per row: the backup is some 9 MB, far above a pipe's buffer.
const FILLER = "x".repeat(6144);
const sentinelEmail = "wal-only@example.test";
// Long enough for a loaded computer, short enough that a stuck writer fails the
// test instead of hanging the gate (D-84).
const writerLimitMs = 30_000;

async function sandbox(t) {
  const directory = await mkdtemp(join(tmpdir(), "loop2-backup-test-"));
  // The command's own temporary directory: nothing may stay in it.
  const temporary = join(directory, "tmp");
  await mkdir(temporary);
  const servers = [];
  const writers = [];
  t.after(async () => {
    // A writer left running would hold the files and keep this process open,
    // so a backup that never finishes would hang the run instead of failing.
    for (const writer of writers) await writer.kill();
    for (const server of servers) server.close();
    await rm(directory, { recursive: true, force: true });
  });
  return {
    directory,
    temporary,
    servers,
    writers,
    path: join(directory, "accounts.sqlite"),
  };
}

// A database of SEEDED accounts, and a row committed after them that lives
// only in the write-ahead log. The returned handle stands for the running
// server's connection; while it is open the log is not folded into the file.
function seedDatabase({ path, servers }) {
  const server = new AccountDatabase(path);
  const raw = new DatabaseSync(path);
  raw.exec("BEGIN");
  const insert = raw.prepare(
    "INSERT INTO accounts (id, email, password_hash, created_at) VALUES (?, ?, ?, ?)",
  );
  for (let i = 0; i < SEEDED; i++)
    insert.run(`id-${i}`, `seed-${i}@example.test`, FILLER, 1000 + i);
  raw.exec("COMMIT");
  raw.exec("PRAGMA wal_checkpoint(TRUNCATE)");
  raw.close();
  servers.push(server);
  const account = server.createAccount(sentinelEmail, "wal-only-hash");
  assert.ok(account, "precondition: the sentinel row is committed");
  return server;
}

function emailsOf(path) {
  const database = new DatabaseSync(path, { readOnly: true });
  try {
    return database
      .prepare("SELECT email FROM accounts")
      .all()
      .map((row) => row.email);
  } finally {
    database.close();
  }
}

function sha256(buffer) {
  return createHash("sha256").update(buffer).digest("hex");
}

function environment(databasePath, temporary) {
  const env = { ...process.env };
  for (const name of Object.keys(env))
    if (name.startsWith("LOOP2_")) delete env[name];
  if (databasePath !== undefined) env.LOOP2_DATABASE_PATH = databasePath;
  if (temporary !== undefined) {
    env.TMPDIR = temporary;
    env.TMP = temporary;
    env.TEMP = temporary;
  }
  return env;
}

// Runs the command. `onChunk` may end the run early by destroying the reader.
function runBackup(args, databasePath, temporary, onChunk) {
  const child = spawn(process.execPath, [command, ...args], {
    env: environment(databasePath, temporary),
    stdio: ["ignore", "pipe", "pipe"],
  });
  const chunks = [];
  let stderr = "";
  child.stdout.on("data", (chunk) => {
    chunks.push(chunk);
    onChunk?.(child, chunk);
  });
  child.stdout.on("error", () => {});
  child.stderr.setEncoding("utf8").on("data", (chunk) => {
    stderr += chunk;
  });
  return new Promise((resolve, reject) => {
    const deadline = setTimeout(() => {
      child.kill();
      reject(new Error("backup command deadline"));
    }, 60_000);
    child.once("error", (error) => {
      clearTimeout(deadline);
      reject(error);
    });
    child.once("close", (code) => {
      clearTimeout(deadline);
      resolve({ code, stdout: Buffer.concat(chunks), stderr });
    });
  });
}

// A separate process that commits to the database all the time, in WAL mode
// with full synchronization, as the server's writes do. It prints the number
// of commits so far after each one, and on its standard input closing prints
// the number of failed attempts and ends. It pauses 3 ms between commits: a
// writer that never pauses starves any second connection that wants the write
// lock, the command's own opening of the database included (SQLite's busy
// handler polls, it does not queue), and that is no load the server has.
const writerScript = `
import { DatabaseSync } from "node:sqlite";
const database = new DatabaseSync(process.argv[1], { timeout: 1000 });
database.exec("PRAGMA synchronous = FULL");
const insert = database.prepare(
  "INSERT INTO accounts (id, email, password_hash, created_at) VALUES (?, ?, ?, ?)");
let commits = 0;
let failures = 0;
let stopped = false;
process.stdin.on("data", () => {});
process.stdin.on("end", () => { stopped = true; });
while (!stopped) {
  try {
    insert.run("w-" + commits, "writer-" + commits + "@example.test", "writer-hash", 5);
    commits++;
    process.stdout.write("commit " + commits + "\\n");
  } catch {
    failures++;
  }
  await new Promise((resolve) => setTimeout(resolve, 3));
}
process.stdout.write("failures " + failures + "\\n");
`;

function startWriter({ path, writers }) {
  const child = spawn(
    process.execPath,
    ["--input-type=module", "-e", writerScript, path],
    { stdio: ["pipe", "pipe", "inherit"] },
  );
  const closed = new Promise((resolve) => child.once("close", resolve));
  let commits = 0;
  let failures = null;
  let buffered = "";
  let started;
  const first = new Promise((resolve, reject) => {
    const limit = setTimeout(
      () => reject(new Error("the writer made no commit in time")),
      writerLimitMs,
    );
    started = () => {
      clearTimeout(limit);
      resolve();
    };
    child.once("close", () => {
      clearTimeout(limit);
      reject(new Error("the writer ended before its first commit"));
    });
  });
  child.stdout.setEncoding("utf8").on("data", (chunk) => {
    buffered += chunk;
    const lines = buffered.split("\n");
    buffered = lines.pop();
    for (const line of lines) {
      const [kind, number] = line.split(" ");
      if (kind === "commit") {
        commits = Number(number);
        started();
      } else failures = Number(number);
    }
  });
  const writer = {
    first,
    commits: () => commits,
    async stop() {
      child.stdin.end();
      const limit = setTimeout(() => child.kill(), writerLimitMs);
      await closed;
      clearTimeout(limit);
      return { commits, failures };
    },
    async kill() {
      child.kill();
      await closed;
    },
  };
  writers.push(writer);
  return writer;
}

test("a backup made beside a separate writer finishes, opens and holds everything committed before it started, a row only in the write-ahead log included", async (t) => {
  const box = await sandbox(t);
  const { path, temporary, directory } = box;
  seedDatabase(box);
  // Precondition: the sentinel is only in the write-ahead log, so copying the
  // database file alone would lose it.
  const alone = join(directory, "alone.sqlite");
  await writeFile(alone, await readFile(path));
  assert.ok(
    !emailsOf(alone).includes(sentinelEmail),
    "precondition: the database file alone lacks the sentinel",
  );

  const writer = startWriter(box);
  await writer.first;
  const before = writer.commits();
  const result = await runBackup([word], path, temporary);
  const during = writer.commits();
  const { failures } = await writer.stop();

  assert.equal(result.code, 0, result.stderr);
  assert.equal(result.stderr, "", "a good run says nothing");
  assert.ok(
    result.stdout.length > 1_000_000,
    `the backup is far larger than a pipe's buffer: ${result.stdout.length} bytes`,
  );
  assert.equal(
    result.stdout.subarray(0, 16).toString("latin1"),
    "SQLite format 3\0",
    "standard output holds the database and nothing before it",
  );
  assert.ok(
    during > before,
    `the writer committed while the command ran: ${before} to ${during}`,
  );
  assert.equal(failures, 0, "the writer met no busy error");

  const backup = join(directory, "backup.sqlite");
  await writeFile(backup, result.stdout);
  const opened = new DatabaseSync(backup, { readOnly: true });
  try {
    assert.equal(
      opened.prepare("PRAGMA integrity_check").get().integrity_check,
      "ok",
    );
    assert.equal(opened.prepare("PRAGMA user_version").get().user_version, 4);
  } finally {
    opened.close();
  }
  const emails = new Set(emailsOf(backup));
  for (let i = 0; i < SEEDED; i++)
    assert.ok(emails.has(`seed-${i}@example.test`), `seed ${i} is in`);
  assert.ok(emails.has(sentinelEmail), "the row held only in the log is in");
  assert.deepEqual(await readdir(temporary), [], "nothing stays behind");
});

test("a backup takes one step, where the default rate takes many on the same database", async (t) => {
  const box = await sandbox(t);
  const { path, directory, servers } = box;
  const server = seedDatabase(box);
  // Precondition: counted the same way, the default rate needs more than one
  // step here, so one step below comes from the method, not from a small file.
  const raw = new DatabaseSync(path);
  servers.push(raw);
  let unfinished = 0;
  await sqliteBackup(raw, join(directory, "default-rate.sqlite"), {
    progress: () => {
      unfinished += 1;
    },
  });
  assert.ok(
    unfinished > 0,
    "precondition: the database takes several steps at the default rate",
  );

  const steps = await server.backupTo(join(directory, "one-step.sqlite"));

  assert.equal(steps, 1);
});

test("without the one fixed word, or with anything else, the command refuses before it opens the database and prints nothing to standard output", async (t) => {
  const box = await sandbox(t);
  const { path, temporary, directory } = box;
  seedDatabase(box).close();
  const before = sha256(await readFile(path));
  // A file that is no database: opening it would end in a database failure
  // (exit 1) and a missing path in exit 3, so exit 2 shows the refusal
  // came first.
  const garbage = join(directory, "garbage.sqlite");
  await writeFile(garbage, "not a database");
  const missing = join(directory, "missing.sqlite");
  const listing = (await readdir(directory)).sort();

  for (const args of [
    [],
    ["backup"],
    ["--to-stdout"],
    [`${word}=1`],
    [` ${word}`],
    [word.toUpperCase()],
    [word, word],
    [word, "extra"],
    ["extra", word],
  ]) {
    for (const target of [path, garbage, missing, undefined]) {
      const result = await runBackup(args, target, temporary);
      const label = `${JSON.stringify(args)} on ${target ?? "no path"}`;
      assert.equal(result.code, 2, label + result.stderr);
      assert.equal(result.stdout.length, 0, `${label} printed to stdout`);
      assert.match(result.stderr, /Usage: .*--to-standard-output/);
    }
  }
  assert.equal(
    sha256(await readFile(path)),
    before,
    "the database is unchanged",
  );
  assert.deepEqual(
    (await readdir(directory)).sort(),
    listing,
    "no -wal, -shm or new file appeared",
  );
  assert.equal(await readFile(garbage, "utf8"), "not a database");
  assert.deepEqual(await readdir(temporary), []);
});

test("a missing database file creates nothing and ends with its own code", async (t) => {
  const { path, temporary, directory } = await sandbox(t);
  for (const target of [path, undefined, "", "   ", ":memory:", directory]) {
    const result = await runBackup([word], target, temporary);
    const label = `target ${JSON.stringify(target)}`;
    assert.equal(result.code, 3, label + result.stderr);
    assert.equal(result.stdout.length, 0, `${label} printed to stdout`);
    assert.notEqual(result.stderr, "");
  }
  assert.deepEqual(
    (await readdir(directory)).sort(),
    ["tmp"],
    "no database file was created",
  );
  assert.deepEqual(await readdir(temporary), []);
});

test("a database that cannot be opened and a temporary directory that cannot be made each end with the database-failure code, an empty standard output and no secret in the message", async (t) => {
  const box = await sandbox(t);
  const { path, temporary, directory } = box;
  const garbage = join(directory, "garbage-secret-name.sqlite");
  await writeFile(garbage, "this is not an SQLite database at all, padding");
  const broken = await runBackup([word], garbage, temporary);
  assert.equal(broken.code, 1, broken.stderr);
  assert.equal(broken.stdout.length, 0);
  assert.notEqual(broken.stderr, "");
  assert.doesNotMatch(broken.stderr, /garbage-secret-name|not a database/i);
  assert.deepEqual(await readdir(temporary), [], "nothing stays behind");

  seedDatabase(box).close();
  const noTemporary = join(directory, "no", "such", "directory");
  const result = await runBackup([word], path, noTemporary);
  assert.equal(result.code, 1, result.stderr);
  assert.equal(result.stdout.length, 0);
  assert.doesNotMatch(result.stderr, /no[\\/]such|accounts\.sqlite/);
});

test("a reader that goes away ends the command with a non-zero code and nothing stays in the temporary directory", async (t) => {
  const box = await sandbox(t);
  const { path, temporary } = box;
  seedDatabase(box);
  const result = await runBackup([word], path, temporary, (child) => {
    // Takes the first chunk and walks away, as a broken pipe does.
    child.stdout.destroy();
  });
  assert.notEqual(result.code, 0, "a cut-off stream is no success");
  assert.notEqual(result.code, null, "the command ended by itself");
  assert.ok(
    result.stdout.length < 5_000_000,
    "the reader left before the whole backup",
  );
  assert.deepEqual(await readdir(temporary), [], "nothing stays behind");
});

test("no SQL and no node:sqlite import stand in src/server outside database.ts", async () => {
  const names = (await readdir(sourceDirectory)).filter(
    (name) => name.endsWith(".ts") && name !== "database.ts",
  );
  assert.ok(names.includes("account-backup.ts"), "precondition: it is scanned");
  for (const name of names) {
    const source = await readFile(join(sourceDirectory, name), "utf8");
    assert.doesNotMatch(source, /node:sqlite/, name);
    assert.doesNotMatch(
      source,
      /\b(SELECT\s.+\sFROM|INSERT\s+INTO|UPDATE\s+\w+\s+SET|DELETE\s+FROM|PRAGMA\s|VACUUM)\b/i,
      name,
    );
  }
});
