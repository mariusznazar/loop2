import assert from "node:assert/strict";
import { createHash } from "node:crypto";
import { access, mkdtemp, rm, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { test } from "node:test";
import { DatabaseSync } from "node:sqlite";
import { spawn } from "node:child_process";
import { fileURLToPath } from "node:url";
import { Worker } from "node:worker_threads";
import { AccountDatabase } from "../dist/server/database.js";

const HOUR = 3_600_000;
const DAY = 86_400_000;
// D-105: at most 30 account messages per hour in total, three per address.
const limits = { windowMs: HOUR, total: 30, perAccount: 3 };

async function fixture(t, options = {}) {
  const directory = await mkdtemp(join(tmpdir(), "loop2-owner-"));
  const path = join(directory, "accounts.sqlite");
  let now = 1000;
  const database = new AccountDatabase(path, { now: () => now, ...options });
  const raw = new DatabaseSync(path);
  const connections = [database];
  t.after(async () => {
    for (const connection of connections) connection.close();
    raw.close();
    await rm(directory, { recursive: true, force: true });
  });
  return {
    database,
    raw,
    path,
    // A second connection on the same file, standing in for the owner's
    // command beside the server.
    operator() {
      const connection = new AccountDatabase(path, { now: () => now });
      connections.push(connection);
      return connection;
    },
  };
}

function digest(token) {
  return createHash("sha256").update(token).digest("base64url");
}

function openSession(database, id, accountId) {
  database.saveSession(id, { accountId, data: "{}", expiresAt: 5000 });
}

function sessionsOf(raw, accountId) {
  return raw
    .prepare("SELECT id FROM sessions WHERE account_id = ? ORDER BY id")
    .all(accountId)
    .map((row) => row.id);
}

function linkSpent(raw, token) {
  return raw
    .prepare("SELECT spent FROM emailed_links WHERE token_digest = ?")
    .get(digest(token)).spent;
}

function snapshot(raw) {
  const all = (sql) =>
    raw
      .prepare(sql)
      .all()
      .map((row) => ({ ...row }));
  return {
    accounts: all("SELECT * FROM accounts ORDER BY id"),
    sessions: all("SELECT * FROM sessions ORDER BY id"),
    links: all("SELECT * FROM emailed_links ORDER BY token_digest"),
    savedGames: all("SELECT * FROM saved_games ORDER BY account_id"),
  };
}

test("the list of accounts holds every account sorted by address, each with its address, role, blocked state and previous-save privilege and nothing else", async (t) => {
  // The owner panel's list (D-411) and its four fields: the address, the role, the blocked state and the privilege.
  const { database } = await fixture(t);
  assert.deepEqual(database.listAccounts(), []);
  database.createAccount("charlie@example.test", "hash");
  database.createAccount("alpha@example.test", "hash");
  database.createAccount("bravo@example.test", "hash");
  assert.equal(
    database.setAccountRole("alpha@example.test", "owner").outcome,
    "made-owner",
  );
  assert.equal(database.blockAccount("bravo@example.test").outcome, "blocked");
  assert.equal(
    database.setPreviousSavePrivilege("charlie@example.test", true).outcome,
    "granted",
  );
  assert.deepEqual(database.listAccounts(), [
    {
      email: "alpha@example.test",
      role: "owner",
      blocked: false,
      previousSaveAllowed: false,
    },
    {
      email: "bravo@example.test",
      role: "player",
      blocked: true,
      previousSaveAllowed: false,
    },
    {
      email: "charlie@example.test",
      role: "player",
      blocked: false,
      previousSaveAllowed: true,
    },
  ]);
});

test("a block for the panel of a player ends its sessions and stops its links, and touches no other account", async (t) => {
  // decision: D-137 "Blocking marks the account blocked, deletes every session of the account and stops every emailed link of the account in one transaction"
  const { database, raw } = await fixture(t);
  const player = database.createAccount("player@example.test", "hash");
  const other = database.createAccount("other@example.test", "hash");
  openSession(database, "one", player.id);
  openSession(database, "two", player.id);
  openSession(database, "theirs", other.id);
  database.issueLink(
    {
      accountId: player.id,
      purpose: "email-confirmation",
      tokenDigest: digest("confirm"),
      lifetimeMs: DAY,
    },
    limits,
  );
  database.issueLink(
    {
      accountId: player.id,
      purpose: "password-reset",
      tokenDigest: digest("reset"),
      lifetimeMs: HOUR,
    },
    limits,
  );
  database.issueLink(
    {
      accountId: other.id,
      purpose: "email-confirmation",
      tokenDigest: digest("theirs-link"),
      lifetimeMs: DAY,
    },
    limits,
  );
  assert.deepEqual(
    sessionsOf(raw, player.id),
    ["one", "two"],
    "precondition: two browsers",
  );
  assert.equal(linkSpent(raw, "confirm"), 0, "precondition: a working link");

  assert.deepEqual(database.blockForPanel("player@example.test"), {
    outcome: "blocked",
    accountId: player.id,
  });
  assert.equal(database.findAccountById(player.id).blocked, true);
  assert.deepEqual(sessionsOf(raw, player.id), []);
  assert.equal(linkSpent(raw, "confirm"), 1);
  assert.equal(linkSpent(raw, "reset"), 1);
  assert.deepEqual(sessionsOf(raw, other.id), ["theirs"]);
  assert.equal(linkSpent(raw, "theirs-link"), 0);
  assert.equal(database.findAccountById(other.id).blocked, false);

  assert.deepEqual(database.blockForPanel("player@example.test"), {
    outcome: "already-blocked",
    accountId: player.id,
  });
  assert.deepEqual(database.blockForPanel("nobody@example.test"), {
    outcome: "unknown",
  });
});

test("a block for the panel of an account with the owner role changes nothing, its own sessions and links included", async (t) => {
  // decision: D-137 "The panel never blocks an account that has the owner role, the caller's own included"
  const { database, raw } = await fixture(t);
  const owner = database.createAccount("owner@example.test", "hash");
  assert.equal(
    database.setAccountRole("owner@example.test", "owner").outcome,
    "made-owner",
  );
  openSession(database, "own", owner.id);
  database.issueLink(
    {
      accountId: owner.id,
      purpose: "email-confirmation",
      tokenDigest: digest("own-link"),
      lifetimeMs: DAY,
    },
    limits,
  );
  const before = snapshot(raw);

  assert.deepEqual(database.blockForPanel("owner@example.test"), {
    outcome: "owner",
  });
  assert.deepEqual(snapshot(raw), before);
  assert.deepEqual(sessionsOf(raw, owner.id), ["own"]);
  assert.equal(linkSpent(raw, "own-link"), 0);
  assert.equal(database.findAccountById(owner.id).blocked, false);
});

test("a role given or taken by a second connection just before the block is read by the block, which refuses an owner and blocks a player", async (t) => {
  // decision: D-137 "The panel never blocks an account that has the owner role, the caller's own included"
  const { database, raw, operator } = await fixture(t);
  const account = database.createAccount("player@example.test", "hash");
  openSession(database, "one", account.id);
  const second = operator();

  assert.deepEqual(second.setAccountRole("player@example.test", "owner"), {
    outcome: "made-owner",
    accountId: account.id,
  });
  assert.deepEqual(database.blockForPanel("player@example.test"), {
    outcome: "owner",
  });
  assert.deepEqual(sessionsOf(raw, account.id), ["one"]);
  assert.equal(database.findAccountById(account.id).blocked, false);

  assert.deepEqual(second.setAccountRole("player@example.test", "player"), {
    outcome: "made-player",
    accountId: account.id,
  });
  assert.deepEqual(database.blockForPanel("player@example.test"), {
    outcome: "blocked",
    accountId: account.id,
  });
  assert.deepEqual(sessionsOf(raw, account.id), []);
  assert.equal(database.findAccountById(account.id).blocked, true);
});

// Another connection that takes the write lock, sets the account's role to
// `owner` and holds the lock for `holdMs` before it commits. It reports
// `locked` once the change is written and `committed` after the commit.
function holdWriteLock(t, path, email, holdMs) {
  const worker = new Worker(
    `
    const { parentPort, workerData } = require("node:worker_threads");
    const { DatabaseSync } = require("node:sqlite");
    const connection = new DatabaseSync(workerData.path, { timeout: 3000 });
    connection.exec("BEGIN IMMEDIATE");
    connection.prepare("UPDATE accounts SET role = 'owner' WHERE email = ?")
      .run(workerData.email);
    parentPort.postMessage("locked");
    setTimeout(() => {
      connection.exec("COMMIT");
      connection.close();
      parentPort.postMessage("committed");
    }, workerData.holdMs);
    `,
    { eval: true, workerData: { path, email, holdMs } },
  );
  t.after(() => worker.terminate());
  const reportOf = (word) =>
    new Promise((resolve, reject) => {
      worker.on("message", (message) => {
        if (message === word) resolve();
      });
      worker.once("error", reject);
      worker.once("exit", () => reject(new Error("lock holder exited")));
    });
  return { locked: reportOf("locked"), committed: reportOf("committed") };
}

test("a block reads the role after it takes the write lock, so a role another connection holds uncommitted makes it refuse an owner", async (t) => {
  // This test protects against a block that reads the role before its write
  // transaction: such a read sees `player` while the other connection still
  // holds the lock, and the block would then mark an account that is an owner
  // when it got the lock. A block that reads inside the transaction waits for
  // the lock, sees `owner` and refuses.
  // decision: D-137 "The panel never blocks an account that has the owner role, the caller's own included"
  const { path, database, raw } = await fixture(t, { busyTimeoutMs: 3000 });
  const account = database.createAccount("player@example.test", "hash");
  openSession(database, "one", account.id);
  const holder = holdWriteLock(t, path, "player@example.test", 300);
  await holder.locked;

  // Precondition: outside the lock the role still reads as a player.
  assert.equal(
    database.findAccountByEmail("player@example.test").role,
    "player",
  );
  assert.deepEqual(database.blockForPanel("player@example.test"), {
    outcome: "owner",
  });
  await holder.committed;
  assert.equal(database.findAccountById(account.id).role, "owner");
  assert.equal(database.findAccountById(account.id).blocked, false);
  assert.deepEqual(sessionsOf(raw, account.id), ["one"]);
});

test("the role change answers made owner, already owner, made player, already player and unknown, each with the account's identifier, and changes nothing else", async (t) => {
  // decision: D-410 "The role `owner` is given and taken by the command `account-role`, run in the `loop2` container and naming the account by its email address normalized as at login, which reports that the account was made an owner or made a player, that it already was so, or that no account has that address, which changes nothing when it refuses and ends no session and stops no link, and which only a human runs on the server (D-12)."
  const { database } = await fixture(t);
  const account = database.createAccount("player@example.test", "hash");
  assert.deepEqual(database.setAccountRole("player@example.test", "owner"), {
    outcome: "made-owner",
    accountId: account.id,
  });
  assert.equal(database.findAccountById(account.id).role, "owner");
  assert.deepEqual(database.setAccountRole("player@example.test", "owner"), {
    outcome: "already-owner",
    accountId: account.id,
  });
  assert.deepEqual(database.setAccountRole("player@example.test", "player"), {
    outcome: "made-player",
    accountId: account.id,
  });
  assert.equal(database.findAccountById(account.id).role, "player");
  assert.deepEqual(database.setAccountRole("player@example.test", "player"), {
    outcome: "already-player",
    accountId: account.id,
  });
  assert.deepEqual(database.setAccountRole("nobody@example.test", "owner"), {
    outcome: "unknown",
  });
  assert.equal(database.findAccountById(account.id).role, "player");
});

test("a role change leaves the block, the previous-save privilege, the sessions, the links and the saved games as they were", async (t) => {
  // decision: D-410 "The role `owner` is given and taken by the command `account-role`, run in the `loop2` container and naming the account by its email address normalized as at login, which reports that the account was made an owner or made a player, that it already was so, or that no account has that address, which changes nothing when it refuses and ends no session and stops no link, and which only a human runs on the server (D-12)."
  const { database, raw } = await fixture(t);
  const blocked = database.createAccount("blocked@example.test", "hash");
  database.blockAccount("blocked@example.test");
  const privileged = database.createAccount("privileged@example.test", "hash");
  database.setPreviousSavePrivilege("privileged@example.test", true);
  openSession(database, "kept", privileged.id);
  database.issueLink(
    {
      accountId: privileged.id,
      purpose: "email-confirmation",
      tokenDigest: digest("kept-link"),
      lifetimeMs: DAY,
    },
    limits,
  );
  database.writeSavedGame(privileged.id, {
    version: 1,
    basedOn: 0,
    game: '{"kept":1}',
  });
  const savedGame = { version: 1, revision: 1, game: '{"kept":1}' };

  assert.equal(
    database.setAccountRole("blocked@example.test", "owner").outcome,
    "made-owner",
  );
  assert.equal(database.findAccountById(blocked.id).blocked, true);
  assert.equal(database.findAccountById(blocked.id).role, "owner");

  assert.equal(
    database.setAccountRole("privileged@example.test", "owner").outcome,
    "made-owner",
  );
  assert.equal(
    database.setAccountRole("privileged@example.test", "player").outcome,
    "made-player",
  );
  const after = database.findAccountById(privileged.id);
  assert.equal(after.blocked, false);
  assert.equal(after.previousSaveAllowed, true);
  assert.deepEqual(sessionsOf(raw, privileged.id), ["kept"]);
  assert.equal(linkSpent(raw, "kept-link"), 0);
  assert.deepEqual(database.readSavedGame(privileged.id), savedGame);
});

const roleCommand = fileURLToPath(
  new URL("../dist/server/account-role.js", import.meta.url),
);
const blockCommand = fileURLToPath(
  new URL("../dist/server/account-block.js", import.meta.url),
);
const previousSaveCommand = fileURLToPath(
  new URL("../dist/server/account-previous-save.js", import.meta.url),
);
const standin = new URL("./account-database-check-standin.mjs", import.meta.url)
  .href;

// Runs a command as the container runs it: its own process, with the database
// path as its only setting, under the stand-in for `node:sqlite` when `mode`
// names one.
function runCommand(script, args, databasePath, mode) {
  const env = { ...process.env };
  for (const name of Object.keys(env))
    if (name.startsWith("LOOP2_")) delete env[name];
  if (databasePath !== undefined) env.LOOP2_DATABASE_PATH = databasePath;
  const command = [script, ...args];
  if (mode !== undefined) {
    env.LOOP2_CHECK_STANDIN = mode;
    command.unshift("--import", standin);
  }
  const child = spawn(process.execPath, command, {
    env,
    stdio: ["ignore", "pipe", "pipe"],
  });
  let stdout = "";
  let stderr = "";
  child.stdout.setEncoding("utf8").on("data", (chunk) => {
    stdout += chunk;
  });
  child.stderr.setEncoding("utf8").on("data", (chunk) => {
    stderr += chunk;
  });
  return new Promise((resolve, reject) => {
    const deadline = setTimeout(() => {
      child.kill();
      reject(new Error("command deadline"));
    }, 10_000);
    child.once("error", (error) => {
      clearTimeout(deadline);
      reject(error);
    });
    child.once("close", (code) => {
      clearTimeout(deadline);
      resolve({ code, stdout, stderr, output: stdout + stderr });
    });
  });
}

// A session that the command's own pruning by the real clock keeps.
function liveSession(database, id, accountId) {
  database.saveSession(id, {
    accountId,
    data: "{}",
    expiresAt: Date.now() + DAY,
  });
}

test("the role command gives and takes the owner role by address beside an open connection and says which outcome it reached", async (t) => {
  // decision: D-410 "The role `owner` is given and taken by the command `account-role`, run in the `loop2` container and naming the account by its email address normalized as at login, which reports that the account was made an owner or made a player, that it already was so, or that no account has that address, which changes nothing when it refuses and ends no session and stops no link, and which only a human runs on the server (D-12)."
  // decision: D-99 "The account server normalizes email with ECMAScript trim and lowercase"
  const { path, database, raw } = await fixture(t, { now: () => Date.now() });
  const account = database.createAccount("player@example.test", "encoded-hash");
  // A signed-in browser and an unspent emailed link: a change of role must
  // end neither nor stop the link, and must not block the account.
  liveSession(database, "one", account.id);
  database.issueLink(
    {
      accountId: account.id,
      purpose: "email-confirmation",
      tokenDigest: digest("confirm"),
      lifetimeMs: DAY,
    },
    limits,
  );
  const runRole = (args) => runCommand(roleCommand, args, path);
  const roleOf = () => database.findAccountByEmail("player@example.test").role;
  const keptAsBefore = (label) => {
    assert.equal(
      database.findAccountById(account.id).blocked,
      false,
      `${label}: the account is not blocked`,
    );
    assert.deepEqual(
      sessionsOf(raw, account.id),
      ["one"],
      `${label}: the session stays`,
    );
    assert.equal(linkSpent(raw, "confirm"), 0, `${label}: the link works`);
  };
  keptAsBefore("before any change");

  // D-99: the address is normalized as login normalizes it.
  const made = await runRole(["owner", " Player@EXAMPLE.test "]);
  assert.equal(made.code, 0, made.output);
  assert.equal(roleOf(), "owner");
  keptAsBefore("made owner");

  const already = await runRole(["owner", "player@example.test"]);
  assert.equal(already.code, 0, already.output);
  assert.equal(roleOf(), "owner");
  keptAsBefore("already owner");

  const taken = await runRole(["player", "player@example.test"]);
  assert.equal(taken.code, 0, taken.output);
  assert.equal(roleOf(), "player");
  keptAsBefore("made player");

  const again = await runRole(["player", "player@example.test"]);
  assert.equal(again.code, 0, again.output);
  assert.equal(roleOf(), "player");
  keptAsBefore("already player");

  const unknown = await runRole(["owner", "nobody@example.test"]);
  assert.equal(unknown.code, 4, unknown.output);
  assert.match(
    unknown.stderr,
    /No account has the address nobody@example\.test\. Nothing changed\./,
  );
  keptAsBefore("unknown address");

  const outcomes = [made, already, taken, again].map((run) =>
    run.stdout.trim(),
  );
  for (const outcome of outcomes) {
    assert.match(outcome, /player@example\.test/, "it names the account");
  }
  assert.equal(new Set(outcomes).size, 4, "each outcome reads differently");
  assert.match(outcomes[1], /nothing changed/i, "a repeated owner says so");
  assert.match(outcomes[3], /nothing changed/i, "a repeated player says so");
});

test("the role command changes nothing on a usage error, an unknown address or an unusable database, and creates none", async (t) => {
  // decision: D-410 "The role `owner` is given and taken by the command `account-role`, run in the `loop2` container and naming the account by its email address normalized as at login, which reports that the account was made an owner or made a player, that it already was so, or that no account has that address, which changes nothing when it refuses and ends no session and stops no link, and which only a human runs on the server (D-12)."
  const { path, database, raw } = await fixture(t, { now: () => Date.now() });
  const account = database.createAccount("player@example.test", "encoded-hash");
  liveSession(database, "one", account.id);
  const unchanged = (label) => {
    assert.equal(database.findAccountById(account.id).role, "player", label);
    assert.equal(database.findAccountById(account.id).blocked, false, label);
    assert.ok(
      raw.prepare("SELECT id FROM sessions WHERE id = 'one'").get(),
      `${label}: the session stays`,
    );
  };
  const refusals = [];
  for (const [label, args, exitCode] of [
    ["no arguments", [], 2],
    ["no address", ["owner"], 2],
    ["an extra argument", ["owner", "player@example.test", "now"], 2],
    ["an unknown role", ["block", "player@example.test"], 2],
    ["an address without a valid form", ["owner", "player-example.test"], 2],
    ["an unknown address", ["owner", "nobody@example.test"], 4],
  ]) {
    const run = await runCommand(roleCommand, args, path);
    assert.equal(run.code, exitCode, label);
    assert.ok(run.output.trim() !== "", `${label}: the refusal is reported`);
    unchanged(label);
    refusals.push(run);
  }

  const absent = join(path, "..", "absent.sqlite");
  for (const [label, databasePath] of [
    ["an unset database path", undefined],
    ["an empty database path", ""],
    ["an in-memory database", ":memory:"],
    ["a database file that does not exist", absent],
  ]) {
    const run = await runCommand(
      roleCommand,
      ["owner", "player@example.test"],
      databasePath,
    );
    assert.equal(run.code, 3, label);
    assert.ok(run.output.trim() !== "", `${label}: the refusal is reported`);
    refusals.push(run);
  }
  await assert.rejects(access(absent), "the command creates no database");
  unchanged("a refused database");

  // Another connection holds the write lock past the command's busy timeout.
  raw.exec("BEGIN IMMEDIATE");
  let busy;
  try {
    busy = await runCommand(
      roleCommand,
      ["owner", "player@example.test"],
      path,
    );
  } finally {
    raw.exec("ROLLBACK");
  }
  assert.equal(busy.code, 1, busy.output);
  assert.ok(busy.output.trim() !== "", "the database failure is reported");
  unchanged("a busy database");
  refusals.push(busy);

  for (const run of refusals)
    assert.doesNotMatch(
      run.output,
      /encoded-hash|\bone\b|database is locked/i,
      "no hash, session identifier or database error detail",
    );
});

test("a database file that is no database fails with the JSON line of the failure first, and changes nothing", async (t) => {
  // decision: D-252 "A log line of its Node.js code is one JSON object on one line, written through `console` with no library and under fixed field names"
  // decision: D-354 "The sentence by which a service command of the account server, `account-block`, `account-previous-save`, `account-role` or `account-backup`, answers the operator is no log line: the log line of such a command is its JSON line of D-252 alone, and the sentence stays beside it"
  const { path } = await fixture(t, { now: () => Date.now() });
  const garbage = join(path, "..", "garbage-secret-name.sqlite");
  await writeFile(garbage, "this is not an SQLite database at all, padding");

  const run = await runCommand(
    roleCommand,
    ["owner", "player@example.test"],
    garbage,
  );

  assert.equal(run.code, 1, run.output);
  assert.match(run.stderr, /Nothing changed; run the command again\./);
  const lines = run.stderr.split(/\r?\n/);
  assert.equal(lines[0][0], "{", "the JSON line comes first");
  const { failure, kind, code, errcode, place } = JSON.parse(lines[0]);
  assert.deepEqual(
    { failure, kind, code, errcode, place },
    {
      failure: "account-role",
      kind: "Error",
      code: "ERR_SQLITE_ERROR",
      errcode: 26,
      place: "account-role.change",
    },
    "SQLite's number 26 says the file is no database",
  );
  assert.doesNotMatch(run.output, /garbage-secret-name|not a database/i);
});

test("what no code of the role command handled ends it with one line of its kind, code and place, and none of its text", async (t) => {
  // decision: D-253 "Each process that touches the data of accounts — the server, `account-block`, `account-previous-save`, `account-role` and `account-backup` — has one last-resort handler of its own, which writes the kind, the code and the place of what no code handled"
  const { path, database } = await fixture(t, { now: () => Date.now() });
  database.createAccount("player@example.test", "encoded-hash");
  const run = await runCommand(
    roleCommand,
    ["owner", "player@example.test"],
    path,
    "uncaught",
  );
  assert.equal(run.code, 1, run.output);
  assert.deepEqual(JSON.parse(run.stderr.trim()), {
    failure: "uncaught",
    kind: "RangeError",
    code: "ERR_STANDIN_FAULT",
    place: "account-role",
  });
});

test("the role command writes one event with the account's number for a change, none for no change, and no address", async (t) => {
  // decision: D-252 "A change of the role of an account and each operation of the owner panel are such changes: each leaves one line with the number of the account changed, written after a change only, and no address and no number of the account of the owner who acted."
  const { path, database } = await fixture(t, { now: () => Date.now() });
  const account = database.createAccount("player@example.test", "encoded-hash");
  database.createAccount("other@example.test", "encoded-hash");
  const eventsOf = (run) =>
    run.stdout
      .split(/\r?\n/)
      .filter((line) => line.startsWith("{"))
      .map((line) => {
        assert.doesNotMatch(line, /example\.test/);
        return JSON.parse(line);
      });
  const run = (args) => runCommand(roleCommand, args, path);
  const address = "player@example.test";

  assert.deepEqual(eventsOf(await run(["owner", address])), [
    { event: "account-owner-granted", accountId: account.id },
  ]);
  assert.deepEqual(eventsOf(await run(["owner", address])), []);
  assert.deepEqual(eventsOf(await run(["player", address])), [
    { event: "account-owner-revoked", accountId: account.id },
  ]);
  assert.deepEqual(eventsOf(await run(["player", address])), []);
  assert.deepEqual(eventsOf(await run(["owner", "nobody@example.test"])), []);
});

test("the block and the previous-save commands act on an account with the owner role as on a player's, and a refused or failed command changes nothing", async (t) => {
  // decision: D-137 "The operator blocks and unblocks a player account, named by its email address normalized as at login, with a command run in the `loop2` container, which reports that the account was blocked or unblocked, that it was already in the state asked for, or that no account has that address, and which changes nothing when it refuses"
  // decision: D-137 "The panel never blocks an account that has the owner role, the caller's own included: the transaction of the block reads the role and the server answers JSON 409 with the code `owner-not-blockable`, also where a second connection gave the role just before the block, and the command stays beside the panel as the emergency way, for a panel that does not work and for an account with the owner role that is to be blocked."
  const { path, database, raw } = await fixture(t, { now: () => Date.now() });
  const owner = database.createAccount("owner@example.test", "encoded-hash");
  assert.equal(
    database.setAccountRole("owner@example.test", "owner").outcome,
    "made-owner",
  );
  liveSession(database, "one", owner.id);
  database.issueLink(
    {
      accountId: owner.id,
      purpose: "email-confirmation",
      tokenDigest: digest("confirm"),
      lifetimeMs: DAY,
    },
    limits,
  );
  const address = "owner@example.test";
  const stored = () => database.findAccountById(owner.id);

  const blocked = await runCommand(blockCommand, ["block", address], path);
  assert.equal(blocked.code, 0, blocked.output);
  assert.match(blocked.stdout, /Blocked owner@example\.test/);
  assert.equal(stored().blocked, true);
  assert.equal(stored().role, "owner", "a block leaves the role");
  assert.deepEqual(sessionsOf(raw, owner.id), [], "a block ends the sessions");
  assert.equal(linkSpent(raw, "confirm"), 1, "a block stops the links");

  const blockedAgain = await runCommand(blockCommand, ["block", address], path);
  assert.equal(blockedAgain.code, 0, blockedAgain.output);
  assert.match(blockedAgain.stdout, /was already blocked/);

  const unblocked = await runCommand(blockCommand, ["unblock", address], path);
  assert.equal(unblocked.code, 0, unblocked.output);
  assert.match(unblocked.stdout, /Unblocked owner@example\.test/);
  assert.equal(stored().blocked, false);
  assert.equal(stored().role, "owner");
  assert.deepEqual(sessionsOf(raw, owner.id), [], "an unblock restores none");

  const granted = await runCommand(
    previousSaveCommand,
    ["grant", address],
    path,
  );
  assert.equal(granted.code, 0, granted.output);
  assert.match(
    granted.stdout,
    /Granted the previous-save privilege to owner@example\.test/,
  );
  assert.equal(stored().previousSaveAllowed, true);
  assert.equal(stored().role, "owner");

  const revoked = await runCommand(
    previousSaveCommand,
    ["revoke", address],
    path,
  );
  assert.equal(revoked.code, 0, revoked.output);
  assert.match(
    revoked.stdout,
    /Revoked the previous-save privilege of owner@example\.test/,
  );
  assert.equal(stored().previousSaveAllowed, false);
  assert.equal(stored().role, "owner");

  const unknownBlock = await runCommand(
    blockCommand,
    ["block", "nobody@example.test"],
    path,
  );
  assert.equal(unknownBlock.code, 4, unknownBlock.output);
  const unknownGrant = await runCommand(
    previousSaveCommand,
    ["grant", "nobody@example.test"],
    path,
  );
  assert.equal(unknownGrant.code, 4, unknownGrant.output);

  raw.exec("BEGIN IMMEDIATE");
  let busy;
  try {
    busy = await runCommand(blockCommand, ["block", address], path);
  } finally {
    raw.exec("ROLLBACK");
  }
  assert.equal(busy.code, 1, busy.output);
  assert.equal(stored().blocked, false, "a failed block changes nothing");
  assert.equal(stored().role, "owner");
});
