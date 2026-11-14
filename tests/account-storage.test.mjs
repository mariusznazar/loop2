import assert from "node:assert/strict";
import { createHash } from "node:crypto";
import { access, mkdtemp, rm, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { test } from "node:test";
import { DatabaseSync } from "node:sqlite";
import { fileURLToPath } from "node:url";
import { Worker } from "node:worker_threads";
import { spawn } from "node:child_process";
import session from "express-session";
import {
  AccountDatabase,
  BlockedSessionRefusal,
} from "../dist/server/database.js";
import { SqliteSessionStore } from "../dist/server/session-store.js";

async function fixture(t, options = {}) {
  const directory = await mkdtemp(join(tmpdir(), "loop2-storage-"));
  const path = join(directory, "accounts.sqlite");
  let now = 1000;
  const database = new AccountDatabase(path, { now: () => now, ...options });
  const raw = new DatabaseSync(path);
  const store = new SqliteSessionStore(database);
  const connections = [database];
  t.after(async () => {
    for (const connection of connections) connection.close();
    raw.close();
    await rm(directory, { recursive: true, force: true });
  });
  const account = database.createAccount("player@example.test", "encoded-hash");
  assert.ok(account, "precondition: a persisted account owns the sessions");
  return {
    path,
    database,
    store,
    raw,
    account,
    track: (connection) => {
      connections.push(connection);
      return connection;
    },
    advance: (time) => {
      now = time;
    },
  };
}

function data(accountId, expiresAt = 2000) {
  return {
    accountId,
    cookie: new session.Cookie({
      expires: new Date(expiresAt),
      originalMaxAge: 1000,
      httpOnly: true,
      secure: true,
      sameSite: "strict",
      path: "/",
    }),
  };
}

function call(store, method, ...args) {
  return new Promise((resolve, reject) => {
    store[method](...args, (error, value) =>
      error ? reject(error) : resolve(value),
    );
  });
}

async function simultaneousInserts(path) {
  const signal = new Int32Array(new SharedArrayBuffer(4));
  const source = `
    import { parentPort, workerData } from "node:worker_threads";
    const { AccountDatabase } = await import(workerData.moduleUrl);
    const database = new AccountDatabase(workerData.path);
    const signal = new Int32Array(workerData.signal);
    try {
      parentPort.postMessage("ready");
      if (Atomics.wait(signal, 0, 0, 5000) === "timed-out") throw new Error("start deadline");
      parentPort.postMessage(database.createAccount("race@example.test", workerData.hash));
    } finally { database.close(); }
  `;
  const workers = ["first", "second"].map(
    (hash) =>
      new Worker(
        new URL(`data:text/javascript,${encodeURIComponent(source)}`),
        {
          workerData: {
            path,
            hash,
            signal: signal.buffer,
            moduleUrl: new URL("../dist/server/database.js", import.meta.url)
              .href,
          },
        },
      ),
  );
  let ready = 0;
  try {
    return await Promise.all(
      workers.map(
        (worker) =>
          new Promise((resolve, reject) => {
            const deadline = setTimeout(
              () => reject(new Error("insert worker deadline")),
              10_000,
            );
            const fail = (error) => {
              clearTimeout(deadline);
              reject(error);
            };
            worker.once("error", fail);
            worker.once("exit", (code) => {
              if (code !== 0) fail(new Error(`insert worker exited ${code}`));
            });
            worker.on("message", (message) => {
              if (message === "ready") {
                ready += 1;
                if (ready === 2) {
                  Atomics.store(signal, 0, 1);
                  Atomics.notify(signal, 0);
                }
              } else {
                clearTimeout(deadline);
                resolve(message);
              }
            });
          }),
      ),
    );
  } finally {
    await Promise.all(workers.map((worker) => worker.terminate()));
  }
}

test("an account insertion returns an opaque identity and persists across reopen", async (t) => {
  const directory = await mkdtemp(join(tmpdir(), "loop2-accounts-"));
  const connections = [];
  t.after(async () => {
    for (const connection of connections) connection.close();
    await rm(directory, { recursive: true, force: true });
  });
  const path = join(directory, "accounts.sqlite");
  const database = new AccountDatabase(path, { now: () => 1000 });
  connections.push(database);
  const account = database.createAccount("player@example.test", "encoded-hash");
  assert.ok(account, "inserting a new account returns its persisted identity");
  assert.match(account.id, /^[0-9a-f-]{36}$/);
  database.close();
  const reopened = new AccountDatabase(path, { now: () => 1000 });
  connections.push(reopened);
  assert.deepEqual(reopened.findAccountByEmail("player@example.test"), account);
  assert.deepEqual(reopened.findAccountById(account.id), account);
  assert.equal(reopened.findAccountById("missing"), null);
});

test("two connections cannot insert the same normalized email and SQL characters remain data", async (t) => {
  const { database, path, account } = await fixture(t);
  const outcomes = await simultaneousInserts(path);
  assert.equal(outcomes.filter(Boolean).length, 1);
  assert.ok(
    ["first", "second"].includes(
      database.findAccountByEmail("race@example.test").passwordHash,
    ),
  );
  const hostile = "quote'); DROP TABLE accounts; --@example.test";
  assert.equal(database.createAccount(hostile, "hash").email, hostile);
  assert.equal(database.findAccountByEmail("' OR 1=1 --"), null);
  assert.equal(database.findAccountById(account.id).email, account.email);
});

// invariant: account-database-schema
test("schema reopen preserves accounts and sessions and rejects a newer version without rewriting it", async (t) => {
  const { path, database, store, raw, account, track } = await fixture(t);
  await call(store, "set", "browser-one", data(account.id));
  database.close();
  const reopened = track(new AccountDatabase(path, { now: () => 1000 }));
  assert.equal(reopened.readSession("browser-one").accountId, account.id);
  assert.equal(
    reopened.findAccountById(account.id).passwordHash,
    "encoded-hash",
  );
  reopened.close();
  // Version 5 is the current schema version (D-112, D-398), so 6 is the first
  // version this code does not know.
  raw.exec("PRAGMA user_version = 6");
  assert.throws(() => new AccountDatabase(path), /Unsupported.*schema/);
  assert.equal(raw.prepare("PRAGMA user_version").get().user_version, 6);
  assert.equal(
    raw.prepare("SELECT count(*) AS count FROM accounts").get().count,
    1,
  );
  assert.equal(
    raw.prepare("SELECT count(*) AS count FROM sessions").get().count,
    1,
  );
});

// invariant: account-database-schema
test("a schema initialization failure rolls back every new table and version", async (t) => {
  const directory = await mkdtemp(join(tmpdir(), "loop2-schema-"));
  const path = join(directory, "accounts.sqlite");
  const raw = new DatabaseSync(path);
  let repaired;
  t.after(async () => {
    repaired?.close();
    raw.close();
    await rm(directory, { recursive: true, force: true });
  });
  raw.exec(
    "CREATE TABLE sessions (marker TEXT); INSERT INTO sessions VALUES ('keep')",
  );
  assert.throws(() => new AccountDatabase(path), /already exists/);
  assert.equal(raw.prepare("PRAGMA user_version").get().user_version, 0);
  assert.equal(
    raw.prepare("SELECT name FROM sqlite_schema WHERE name = 'accounts'").get(),
    undefined,
  );
  assert.equal(raw.prepare("SELECT marker FROM sessions").get().marker, "keep");
  raw.exec("DROP TABLE sessions");
  repaired = new AccountDatabase(path);
  assert.ok(repaired.createAccount("after@example.test", "hash"));
});

// The version-1 schema exactly as loop2 6540e4c created it on a new database
// (src/server/database.ts:105-121 there), the schema the test server's database
// holds. It is written out here, not produced by the code under test, so a
// migration that only fits the code's own idea of version 1 is caught.
const versionOneSchema = `
  CREATE TABLE accounts (
    id TEXT PRIMARY KEY NOT NULL,
    email TEXT NOT NULL UNIQUE,
    password_hash TEXT NOT NULL,
    created_at INTEGER NOT NULL
  ) STRICT;
  CREATE TABLE sessions (
    id TEXT PRIMARY KEY NOT NULL,
    account_id TEXT NOT NULL REFERENCES accounts(id) ON DELETE CASCADE,
    data TEXT NOT NULL,
    expires_at INTEGER NOT NULL
  ) STRICT;
  CREATE INDEX sessions_expiry ON sessions(expires_at);
  CREATE INDEX sessions_account ON sessions(account_id);
`;

const versionOneRows = `
  INSERT INTO accounts VALUES ('account-a', 'a@example.test', 'hash-a', 100);
  INSERT INTO accounts VALUES ('account-b', 'b@example.test', 'hash-b', 200);
  INSERT INTO sessions VALUES ('browser-a1', 'account-a', '{"n":1}', 9000);
  INSERT INTO sessions VALUES ('browser-a2', 'account-a', '{"n":2}', 9500);
  INSERT INTO sessions VALUES ('browser-b1', 'account-b', '{"n":3}', 8000);
`;

const versionOneAccounts = [
  { id: "account-a", email: "a@example.test", hash: "hash-a", created: 100 },
  { id: "account-b", email: "b@example.test", hash: "hash-b", created: 200 },
];

const versionOneSessions = [
  { id: "browser-a1", account: "account-a", data: '{"n":1}', expires: 9000 },
  { id: "browser-a2", account: "account-a", data: '{"n":2}', expires: 9500 },
  { id: "browser-b1", account: "account-b", data: '{"n":3}', expires: 8000 },
];

function rows(raw, sql) {
  return raw
    .prepare(sql)
    .all()
    .map((row) => ({ ...row }));
}

function storedVersionOneRows(raw) {
  return {
    accounts: rows(
      raw,
      "SELECT id, email, password_hash AS hash, created_at AS created FROM accounts ORDER BY id",
    ),
    sessions: rows(
      raw,
      "SELECT id, account_id AS account, data, expires_at AS expires FROM sessions ORDER BY id",
    ),
  };
}

async function versionOneFixture(t, extraSchema = "") {
  return olderDatabaseFixture(
    t,
    versionOneSchema + versionOneRows + extraSchema,
    1,
  );
}

async function olderDatabaseFixture(t, sql, version) {
  const directory = await mkdtemp(join(tmpdir(), "loop2-migration-"));
  const path = join(directory, "accounts.sqlite");
  const raw = new DatabaseSync(path);
  const connections = [];
  t.after(async () => {
    for (const connection of connections) connection.close();
    raw.close();
    await rm(directory, { recursive: true, force: true });
  });
  raw.exec(sql);
  raw.exec(`PRAGMA user_version = ${version}`);
  return {
    path,
    raw,
    track: (connection) => {
      connections.push(connection);
      return connection;
    },
  };
}

// invariant: account-database-schema
// invariant: account-schema-lifecycle
// A database may still be at version 1 when version 5 arrives, so it moves
// through steps 2, 3, 4 and 5 in one opening.
test("a version-1 database opens as version 5 with every account and session intact, no account blocked, no address confirmed and no account privileged", async (t) => {
  const { path, raw, track } = await versionOneFixture(t);
  const database = track(new AccountDatabase(path, { now: () => 1000 }));
  assert.equal(raw.prepare("PRAGMA user_version").get().user_version, 5);
  assert.deepEqual(storedVersionOneRows(raw), {
    accounts: versionOneAccounts,
    sessions: versionOneSessions,
  });
  for (const account of versionOneAccounts)
    assert.deepEqual(database.findAccountByEmail(account.email), {
      id: account.id,
      email: account.email,
      passwordHash: account.hash,
      createdAt: account.created,
      blocked: false,
      emailConfirmed: false,
      previousSaveAllowed: false,
    });
  for (const session of versionOneSessions)
    assert.deepEqual(database.readSession(session.id), {
      accountId: session.account,
      data: session.data,
      expiresAt: session.expires,
    });
  // A migrated account takes the blocked state, and it outlasts a reopen.
  assert.equal(database.blockAccount("b@example.test").outcome, "blocked");
  database.close();
  const reopened = track(new AccountDatabase(path, { now: () => 1000 }));
  assert.equal(raw.prepare("PRAGMA user_version").get().user_version, 5);
  assert.equal(reopened.findAccountByEmail("b@example.test").blocked, true);
  assert.equal(reopened.findAccountByEmail("a@example.test").blocked, false);
  assert.equal(reopened.readSession("browser-a1").accountId, "account-a");
});

// invariant: account-database-schema
test("a failing migration step leaves a version-1 database at version 1 with its rows unchanged", async (t) => {
  // A column of that name already there makes the step that adds the blocked
  // state fail after the transaction has begun.
  const { path, raw } = await versionOneFixture(
    t,
    "ALTER TABLE accounts ADD COLUMN blocked TEXT;",
  );
  assert.throws(
    () => new AccountDatabase(path, { now: () => 1000 }),
    /duplicate column/,
  );
  assert.equal(raw.prepare("PRAGMA user_version").get().user_version, 1);
  assert.deepEqual(storedVersionOneRows(raw), {
    accounts: versionOneAccounts,
    sessions: versionOneSessions,
  });
});

// A version-2 database as loop2 7a633a7 leaves it: the version-1 schema and
// rows moved by the blocked state step of src/server/database.ts:38-41 there.
// Account c is blocked, so the move is seen to keep a blocked state as well as
// a cleared one.
const versionTwoDatabase = `${versionOneSchema + versionOneRows}
  ALTER TABLE accounts
    ADD COLUMN blocked INTEGER NOT NULL DEFAULT 0 CHECK (blocked IN (0, 1));
  INSERT INTO accounts VALUES ('account-c', 'c@example.test', 'hash-c', 300, 1);
`;

const versionTwoAccounts = [
  ...versionOneAccounts.map((account) => ({ ...account, blocked: 0 })),
  {
    id: "account-c",
    email: "c@example.test",
    hash: "hash-c",
    created: 300,
    blocked: 1,
  },
];

function storedVersionTwoRows(raw) {
  return {
    accounts: rows(
      raw,
      "SELECT id, email, password_hash AS hash, created_at AS created, blocked FROM accounts ORDER BY id",
    ),
    sessions: storedVersionOneRows(raw).sessions,
  };
}

const HOUR = 3_600_000;
// D-155: a confirmation link works for 24 hours from the moment it is recorded.
const DAY = 86_400_000;
// D-105: at most 30 account messages per hour in total, three per address.
const limits = { windowMs: HOUR, total: 30, perAccount: 3 };

function digest(token) {
  return createHash("sha256").update(token).digest("base64url");
}

function confirmationLink(accountId, token, lifetimeMs = DAY) {
  return {
    accountId,
    purpose: "email-confirmation",
    tokenDigest: digest(token),
    lifetimeMs,
  };
}

function resetLink(accountId, token) {
  return {
    accountId,
    purpose: "password-reset",
    tokenDigest: digest(token),
    lifetimeMs: HOUR,
  };
}

function storedLink(raw, token) {
  const row = raw
    .prepare("SELECT * FROM emailed_links WHERE token_digest = ?")
    .get(digest(token));
  return row ? { ...row } : undefined;
}

function storedLinkCount(raw) {
  return raw.prepare("SELECT count(*) AS n FROM emailed_links").get().n;
}

// invariant: account-database-schema
// invariant: account-schema-lifecycle
test("a version-2 database opens as version 5 with every account, blocked state and session intact, no address confirmed and no account privileged", async (t) => {
  const { path, raw, track } = await olderDatabaseFixture(
    t,
    versionTwoDatabase,
    2,
  );
  const database = track(new AccountDatabase(path, { now: () => 1000 }));
  assert.equal(raw.prepare("PRAGMA user_version").get().user_version, 5);
  assert.deepEqual(storedVersionTwoRows(raw), {
    accounts: versionTwoAccounts,
    sessions: versionOneSessions,
  });
  for (const account of versionTwoAccounts)
    assert.deepEqual(database.findAccountByEmail(account.email), {
      id: account.id,
      email: account.email,
      passwordHash: account.hash,
      createdAt: account.created,
      blocked: account.blocked === 1,
      emailConfirmed: false,
      previousSaveAllowed: false,
    });
  for (const session of versionOneSessions)
    assert.deepEqual(database.readSession(session.id), {
      accountId: session.account,
      data: session.data,
      expiresAt: session.expires,
    });

  // A moved account takes links and a confirmation, and they outlast a reopen.
  assert.equal(
    database.issueLink(confirmationLink("account-a", "moved"), limits),
    "issued",
  );
  assert.equal(
    database.issueLink(confirmationLink("account-c", "blocked"), limits),
    "blocked",
  );
  assert.equal(
    database.confirmEmailAddress(digest("moved")).outcome,
    "confirmed",
  );
  database.close();
  const reopened = track(new AccountDatabase(path, { now: () => 1000 }));
  assert.equal(raw.prepare("PRAGMA user_version").get().user_version, 5);
  assert.equal(reopened.findAccountById("account-a").emailConfirmed, true);
  assert.equal(reopened.findAccountById("account-b").emailConfirmed, false);
  assert.equal(reopened.findAccountById("account-c").blocked, true);
  assert.equal(reopened.readSession("browser-b1").accountId, "account-b");
});

// invariant: account-database-schema
test("a failing step 3 leaves a version-2 database at version 2 with its rows and columns unchanged", async (t) => {
  // A table of that name already there makes step 3 fail after it has added
  // the confirmation column, which the rollback has to take away again.
  const { path, raw } = await olderDatabaseFixture(
    t,
    `${versionTwoDatabase}
      CREATE TABLE emailed_links (marker TEXT);`,
    2,
  );
  assert.throws(
    () => new AccountDatabase(path, { now: () => 1000 }),
    /already exists/,
  );
  assert.equal(raw.prepare("PRAGMA user_version").get().user_version, 2);
  assert.deepEqual(storedVersionTwoRows(raw), {
    accounts: versionTwoAccounts,
    sessions: versionOneSessions,
  });
  assert.deepEqual(
    rows(raw, "SELECT name FROM pragma_table_info('accounts') ORDER BY cid"),
    ["id", "email", "password_hash", "created_at", "blocked"].map((name) => ({
      name,
    })),
  );
});

// A version-3 database as loop2 589f4d7 leaves it: the version-2 database
// moved by the step of src/server/database.ts:62-75 there, the schema the test
// server's database holds before this version. Account a has confirmed its
// address and c is blocked; of the links one still works and one is used, so
// the move is seen to keep every value of the step's columns.
const versionThreeDatabase = `${versionTwoDatabase}
  ALTER TABLE accounts ADD COLUMN email_confirmed_at INTEGER;
  CREATE TABLE emailed_links (
    token_digest TEXT PRIMARY KEY NOT NULL,
    account_id TEXT NOT NULL REFERENCES accounts(id) ON DELETE CASCADE,
    purpose TEXT NOT NULL
      CHECK (purpose IN ('email-confirmation', 'password-reset')),
    created_at INTEGER NOT NULL,
    expires_at INTEGER NOT NULL,
    spent INTEGER NOT NULL DEFAULT 0 CHECK (spent IN (0, 1))
  ) STRICT;
  CREATE INDEX emailed_links_account ON emailed_links(account_id);
  CREATE INDEX emailed_links_created ON emailed_links(created_at);
  UPDATE accounts SET email_confirmed_at = 150 WHERE id = 'account-a';
  INSERT INTO emailed_links
    VALUES ('digest-b', 'account-b', 'email-confirmation', 400, 90000, 0);
  INSERT INTO emailed_links
    VALUES ('digest-a', 'account-a', 'password-reset', 500, 4100, 1);
`;

const versionThreeAccounts = [
  { ...versionTwoAccounts[0], confirmed: 150 },
  { ...versionTwoAccounts[1], confirmed: null },
  { ...versionTwoAccounts[2], confirmed: null },
];

const versionThreeLinks = [
  {
    digest: "digest-a",
    account: "account-a",
    purpose: "password-reset",
    created: 500,
    expires: 4100,
    spent: 1,
  },
  {
    digest: "digest-b",
    account: "account-b",
    purpose: "email-confirmation",
    created: 400,
    expires: 90000,
    spent: 0,
  },
];

function storedVersionThreeRows(raw) {
  return {
    accounts: rows(
      raw,
      "SELECT id, email, password_hash AS hash, created_at AS created, blocked, email_confirmed_at AS confirmed FROM accounts ORDER BY id",
    ),
    sessions: storedVersionOneRows(raw).sessions,
    links: rows(
      raw,
      "SELECT token_digest AS digest, account_id AS account, purpose, created_at AS created, expires_at AS expires, spent FROM emailed_links ORDER BY token_digest",
    ),
  };
}

// invariant: account-database-schema
// invariant: account-schema-lifecycle
test("a version-3 database opens as version 5 with every row and value kept, no saved game state and no previous save", async (t) => {
  const { path, raw, track } = await olderDatabaseFixture(
    t,
    versionThreeDatabase,
    3,
  );
  const database = track(new AccountDatabase(path, { now: () => 1000 }));
  assert.equal(raw.prepare("PRAGMA user_version").get().user_version, 5);
  assert.deepEqual(storedVersionThreeRows(raw), {
    accounts: versionThreeAccounts,
    sessions: versionOneSessions,
    links: versionThreeLinks,
  });
  assert.equal(raw.prepare("SELECT count(*) AS n FROM saved_games").get().n, 0);
  for (const account of versionThreeAccounts) {
    assert.deepEqual(database.findAccountByEmail(account.email), {
      id: account.id,
      email: account.email,
      passwordHash: account.hash,
      createdAt: account.created,
      blocked: account.blocked === 1,
      emailConfirmed: account.confirmed !== null,
      previousSaveAllowed: false,
    });
    assert.equal(database.readSavedGame(account.id), null, account.id);
  }
  for (const session of versionOneSessions)
    assert.deepEqual(database.readSession(session.id), {
      accountId: session.account,
      data: session.data,
      expiresAt: session.expires,
    });

  // A moved account takes a saved game state, a moved block still refuses
  // one, and both outlast a reopen.
  assert.deepEqual(
    database.writeSavedGame("account-a", {
      version: 1,
      basedOn: 0,
      game: '{"moved":true}',
    }),
    { outcome: "saved", revision: 1 },
  );
  assert.deepEqual(
    database.writeSavedGame("account-c", {
      version: 1,
      basedOn: 0,
      game: '{"blocked":true}',
    }),
    { outcome: "blocked" },
  );
  database.close();
  const reopened = track(new AccountDatabase(path, { now: () => 1000 }));
  assert.equal(raw.prepare("PRAGMA user_version").get().user_version, 5);
  assert.deepEqual(reopened.readSavedGame("account-a"), {
    version: 1,
    revision: 1,
    game: '{"moved":true}',
  });
  assert.equal(reopened.readSavedGame("account-c"), null);
  assert.deepEqual(storedVersionThreeRows(raw), {
    accounts: versionThreeAccounts,
    sessions: versionOneSessions,
    links: versionThreeLinks,
  });
});

// A version-4 database as the code of version 4 writes it: the version-3
// database moved by the saved game state step, the schema the test server holds
// before this version. Account a holds a saved game state, which must outlast
// the move unchanged.
const versionFourDatabase = `${versionThreeDatabase}
  CREATE TABLE saved_games (
    account_id TEXT PRIMARY KEY NOT NULL
      REFERENCES accounts(id) ON DELETE CASCADE,
    version INTEGER NOT NULL CHECK (version >= 1),
    revision INTEGER NOT NULL CHECK (revision >= 1),
    game TEXT NOT NULL CHECK (length(CAST(game AS BLOB)) <= 65536)
  ) STRICT;
  INSERT INTO saved_games VALUES ('account-a', 2, 3, '{"kept":true}');
`;

// invariant: account-database-schema
// invariant: account-schema-lifecycle
test("a version-4 database opens as version 5 with every row kept, every account unprivileged and no previous save", async (t) => {
  const { path, raw, track } = await olderDatabaseFixture(
    t,
    versionFourDatabase,
    4,
  );
  const database = track(new AccountDatabase(path, { now: () => 1000 }));
  assert.equal(raw.prepare("PRAGMA user_version").get().user_version, 5);
  assert.deepEqual(storedVersionThreeRows(raw), {
    accounts: versionThreeAccounts,
    sessions: versionOneSessions,
    links: versionThreeLinks,
  });
  assert.deepEqual(
    rows(raw, "SELECT account_id, version, revision, game FROM saved_games"),
    [
      {
        account_id: "account-a",
        version: 2,
        revision: 3,
        game: '{"kept":true}',
      },
    ],
  );
  for (const account of versionThreeAccounts) {
    assert.equal(
      database.findAccountByEmail(account.email).previousSaveAllowed,
      false,
      account.id,
    );
    assert.equal(database.readPreviousSavedGame(account.id), null, account.id);
  }
  assert.deepEqual(database.readSavedGame("account-a"), {
    version: 2,
    revision: 3,
    game: '{"kept":true}',
  });
});

// invariant: account-schema-lifecycle
test("a failing step 5 leaves a version-4 database at version 4 with its rows, columns and tables unchanged", async (t) => {
  // A table of the new name already there makes step 5 fail after it has added
  // the privilege column, which the rollback has to take away again.
  const { path, raw } = await olderDatabaseFixture(
    t,
    `${versionFourDatabase}
      CREATE TABLE previous_saves (marker TEXT);
      INSERT INTO previous_saves VALUES ('keep');`,
    4,
  );
  assert.throws(
    () => new AccountDatabase(path, { now: () => 1000 }),
    /already exists/,
  );
  assert.equal(raw.prepare("PRAGMA user_version").get().user_version, 4);
  assert.deepEqual(storedVersionThreeRows(raw), {
    accounts: versionThreeAccounts,
    sessions: versionOneSessions,
    links: versionThreeLinks,
  });
  assert.deepEqual(
    rows(raw, "SELECT name FROM pragma_table_info('accounts') ORDER BY cid"),
    [
      "id",
      "email",
      "password_hash",
      "created_at",
      "blocked",
      "email_confirmed_at",
    ].map((name) => ({ name })),
  );
  assert.deepEqual(tableNames(raw), [
    "accounts",
    "emailed_links",
    "previous_saves",
    "saved_games",
    "sessions",
  ]);
  assert.deepEqual(rows(raw, "SELECT marker FROM previous_saves"), [
    { marker: "keep" },
  ]);
});

function tableNames(raw) {
  return rows(
    raw,
    "SELECT name FROM sqlite_schema WHERE type = 'table' ORDER BY name",
  ).map((row) => row.name);
}

// invariant: account-database-schema
test("a failing step 4 leaves a version-3 database at version 3 with its rows and tables unchanged", async (t) => {
  // A table of that name already there makes step 4 fail.
  const { path, raw } = await olderDatabaseFixture(
    t,
    `${versionThreeDatabase}
      CREATE TABLE saved_games (marker TEXT);
      INSERT INTO saved_games VALUES ('keep');`,
    3,
  );
  assert.throws(
    () => new AccountDatabase(path, { now: () => 1000 }),
    /already exists/,
  );
  assert.equal(raw.prepare("PRAGMA user_version").get().user_version, 3);
  assert.deepEqual(storedVersionThreeRows(raw), {
    accounts: versionThreeAccounts,
    sessions: versionOneSessions,
    links: versionThreeLinks,
  });
  assert.deepEqual(tableNames(raw), [
    "accounts",
    "emailed_links",
    "saved_games",
    "sessions",
  ]);
  assert.deepEqual(rows(raw, "SELECT * FROM saved_games"), [
    { marker: "keep" },
  ]);
});

// invariant: account-schema-lifecycle
test("a failing step 4 also takes back step 3 on a version-2 database, which stays at version 2 unchanged", async (t) => {
  // Steps 3 and 4 run in one transaction, so step 3's column and table must
  // go again when step 4 fails after them.
  const { path, raw } = await olderDatabaseFixture(
    t,
    `${versionTwoDatabase}
      CREATE TABLE saved_games (marker TEXT);`,
    2,
  );
  assert.throws(
    () => new AccountDatabase(path, { now: () => 1000 }),
    /already exists/,
  );
  assert.equal(raw.prepare("PRAGMA user_version").get().user_version, 2);
  assert.deepEqual(storedVersionTwoRows(raw), {
    accounts: versionTwoAccounts,
    sessions: versionOneSessions,
  });
  assert.deepEqual(tableNames(raw), ["accounts", "saved_games", "sessions"]);
  assert.deepEqual(
    rows(raw, "SELECT name FROM pragma_table_info('accounts') ORDER BY cid"),
    ["id", "email", "password_hash", "created_at", "blocked"].map((name) => ({
      name,
    })),
  );
});

function storedSave(raw, accountId) {
  const row = raw
    .prepare(
      "SELECT version, revision, game FROM saved_games WHERE account_id = ?",
    )
    .get(accountId);
  return row ? { ...row } : undefined;
}

function savedGameCount(raw) {
  return raw.prepare("SELECT count(*) AS n FROM saved_games").get().n;
}

// invariant: account-save-sqlite-store
test("a save is stored only on the revision it names, one of a lower version is refused before its revision is compared, and every refusal changes nothing", async (t) => {
  const { database, raw, account } = await fixture(t);
  const other = database.createAccount("other@example.test", "hash");
  const save = (accountId, version, basedOn, game) =>
    database.writeSavedGame(accountId, { version, basedOn, game });
  assert.equal(database.readSavedGame(account.id), null);

  // D-209: no saved game state counts as revision 0, and the first save is 1.
  assert.deepEqual(save(account.id, 2, 1, '{"n":0}'), { outcome: "conflict" });
  assert.equal(savedGameCount(raw), 0);
  assert.deepEqual(save(account.id, 2, 0, '{"n":1}'), {
    outcome: "saved",
    revision: 1,
  });
  assert.deepEqual(database.readSavedGame(account.id), {
    version: 2,
    revision: 1,
    game: '{"n":1}',
  });
  assert.deepEqual(save(account.id, 2, 1, '{"n":2}'), {
    outcome: "saved",
    revision: 2,
  });

  // A browser that did not see revision 2, and one that saw none.
  assert.deepEqual(save(account.id, 2, 1, '{"stale":1}'), {
    outcome: "conflict",
  });
  assert.deepEqual(save(account.id, 2, 0, '{"stale":0}'), {
    outcome: "conflict",
  });
  // D-210: a lower version is outdated on the current basis and on a stale
  // one alike, since the version is compared first.
  assert.deepEqual(save(account.id, 1, 2, '{"old":2}'), {
    outcome: "outdated",
  });
  assert.deepEqual(save(account.id, 1, 1, '{"old":1}'), {
    outcome: "outdated",
  });
  assert.deepEqual(storedSave(raw, account.id), {
    version: 2,
    revision: 2,
    game: '{"n":2}',
  });

  // A higher version on the current basis replaces it.
  assert.deepEqual(save(account.id, 3, 2, '{"n":3}'), {
    outcome: "saved",
    revision: 3,
  });
  assert.deepEqual(database.readSavedGame(account.id), {
    version: 3,
    revision: 3,
    game: '{"n":3}',
  });

  // The other account has its own row and its own revisions.
  assert.equal(database.readSavedGame(other.id), null);
  assert.deepEqual(save(other.id, 1, 0, '{"theirs":1}'), {
    outcome: "saved",
    revision: 1,
  });
  assert.deepEqual(save(other.id, 1, 3, '{"theirs":2}'), {
    outcome: "conflict",
  });
  assert.deepEqual(storedSave(raw, account.id), {
    version: 3,
    revision: 3,
    game: '{"n":3}',
  });
  assert.equal(savedGameCount(raw), 2);
});

// invariant: account-save-sqlite-store
test("a block committed through another connection before a save makes it store nothing, and blocking and unblocking keep the saved game state", async (t) => {
  const { path, database, raw, account, track } = await fixture(t);
  const save = (version, basedOn, game) =>
    database.writeSavedGame(account.id, { version, basedOn, game });
  assert.deepEqual(save(1, 0, '{"kept":1}'), { outcome: "saved", revision: 1 });

  // The second connection stands in for the owner's command beside the server.
  const operator = track(new AccountDatabase(path, { now: () => 1000 }));
  assert.equal(operator.blockAccount("player@example.test").outcome, "blocked");
  assert.deepEqual(save(1, 1, '{"after":1}'), { outcome: "blocked" });
  // The block comes before the version and the revision.
  assert.deepEqual(save(1, 0, '{"stale":1}'), { outcome: "blocked" });
  assert.deepEqual(storedSave(raw, account.id), {
    version: 1,
    revision: 1,
    game: '{"kept":1}',
  });

  assert.equal(
    operator.unblockAccount("player@example.test").outcome,
    "unblocked",
  );
  assert.deepEqual(database.readSavedGame(account.id), {
    version: 1,
    revision: 1,
    game: '{"kept":1}',
  });
  assert.deepEqual(save(1, 1, '{"after":1}'), {
    outcome: "saved",
    revision: 2,
  });

  // A blocked account without a saved game state gets none either.
  const fresh = database.createAccount("fresh@example.test", "hash");
  assert.equal(operator.blockAccount("fresh@example.test").outcome, "blocked");
  assert.deepEqual(
    database.writeSavedGame(fresh.id, { version: 1, basedOn: 0, game: "{}" }),
    { outcome: "blocked" },
  );
  assert.equal(storedSave(raw, fresh.id), undefined);
});

// invariant: account-save-sqlite-store
test("the stored game text holds at most 65 536 bytes, counted in UTF-8 bytes rather than characters, and a longer one changes nothing", async (t) => {
  const { database, raw, account } = await fixture(t);
  // D-104: at most 64 KiB, 65 536 bytes, stored per player. "ż" is two bytes
  // in UTF-8, so 32 768 of them are 65 536 bytes in half as many characters.
  const full = "ż".repeat(32_768);
  assert.deepEqual(
    database.writeSavedGame(account.id, { version: 1, basedOn: 0, game: full }),
    { outcome: "saved", revision: 1 },
  );
  assert.equal(database.readSavedGame(account.id).game, full);
  assert.throws(
    () =>
      database.writeSavedGame(account.id, {
        version: 1,
        basedOn: 1,
        game: `${full}a`,
      }),
    /CHECK constraint/,
  );
  assert.deepEqual(storedSave(raw, account.id), {
    version: 1,
    revision: 1,
    game: full,
  });

  // The table holds the limit itself, also against a write past the operation.
  const other = database.createAccount("other@example.test", "hash");
  assert.throws(
    () =>
      raw
        .prepare("INSERT INTO saved_games VALUES (?, 1, 1, ?)")
        .run(other.id, `${full}a`),
    /CHECK constraint/,
  );
  assert.throws(
    () =>
      raw
        .prepare("UPDATE saved_games SET game = ? WHERE account_id = ?")
        .run(`${full}a`, account.id),
    /CHECK constraint/,
  );
  assert.equal(storedSave(raw, other.id), undefined);
  assert.equal(storedSave(raw, account.id).game, full);
});

// invariant: account-save-sqlite-store
test("a saved game state goes with its account, and a save for an unknown account or with an unusable field stores nothing", async (t) => {
  const { database, raw, account } = await fixture(t);
  const other = database.createAccount("other@example.test", "hash");
  for (const owner of [account, other])
    database.writeSavedGame(owner.id, { version: 1, basedOn: 0, game: "{}" });
  raw.prepare("DELETE FROM accounts WHERE id = ?").run(other.id);
  assert.equal(storedSave(raw, other.id), undefined);
  assert.ok(storedSave(raw, account.id), "another account's row stays");

  assert.throws(
    () =>
      database.writeSavedGame("absent", { version: 1, basedOn: 0, game: "{}" }),
    /Unknown account/,
  );
  for (const [label, given] of [
    ["version 0", { version: 0, basedOn: 1, game: "{}" }],
    ["a fractional version", { version: 1.5, basedOn: 1, game: "{}" }],
    ["an unsafe version", { version: 2 ** 53, basedOn: 1, game: "{}" }],
    ["a negative basis", { version: 1, basedOn: -1, game: "{}" }],
    ["a fractional basis", { version: 1, basedOn: 0.5, game: "{}" }],
    ["a game that is not text", { version: 1, basedOn: 1, game: {} }],
  ])
    assert.throws(
      () => database.writeSavedGame(account.id, given),
      /Invalid saved game/,
      label,
    );
  assert.deepEqual(storedSave(raw, account.id), {
    version: 1,
    revision: 1,
    game: "{}",
  });
  assert.equal(savedGameCount(raw), 1);
});

function storedPreviousSave(raw, accountId) {
  const row = raw
    .prepare(
      "SELECT version, revision, game FROM previous_saves WHERE account_id = ?",
    )
    .get(accountId);
  return row ? { ...row } : undefined;
}

// invariant: previous-save-slot
test("a save of a higher version moves the stored save into the previous slot, a second move replaces it, and a first or same-version save moves nothing", async (t) => {
  const { database, account } = await fixture(t);
  const save = (version, basedOn, game) =>
    database.writeSavedGame(account.id, { version, basedOn, game });
  assert.deepEqual(save(1, 0, '{"v":1}'), { outcome: "saved", revision: 1 });
  assert.equal(
    database.readPreviousSavedGame(account.id),
    null,
    "a first save moves nothing",
  );
  assert.deepEqual(save(1, 1, '{"v":1,"second":true}'), {
    outcome: "saved",
    revision: 2,
  });
  assert.equal(
    database.readPreviousSavedGame(account.id),
    null,
    "a save of the same version moves nothing",
  );

  assert.deepEqual(save(2, 2, '{"v":2}'), { outcome: "saved", revision: 3 });
  assert.deepEqual(database.readPreviousSavedGame(account.id), {
    version: 1,
    revision: 2,
    game: '{"v":1,"second":true}',
  });
  assert.deepEqual(database.readSavedGame(account.id), {
    version: 2,
    revision: 3,
    game: '{"v":2}',
  });

  assert.deepEqual(save(3, 3, '{"v":3}'), { outcome: "saved", revision: 4 });
  assert.deepEqual(
    database.readPreviousSavedGame(account.id),
    { version: 2, revision: 3, game: '{"v":2}' },
    "the second move replaces the first",
  );
});

// invariant: previous-save-slot
test("a save refused as blocked, outdated or conflicting moves nothing, neither the current save nor the previous one", async (t) => {
  const { path, database, account, track } = await fixture(t);
  const save = (version, basedOn, game) =>
    database.writeSavedGame(account.id, { version, basedOn, game });
  save(1, 0, '{"v":1}');
  save(2, 1, '{"v":2}');
  const previous = { version: 1, revision: 1, game: '{"v":1}' };
  const current = { version: 2, revision: 2, game: '{"v":2}' };
  assert.deepEqual(database.readPreviousSavedGame(account.id), previous);

  assert.deepEqual(save(3, 1, '{"stale":3}'), { outcome: "conflict" });
  assert.deepEqual(save(1, 2, '{"old":1}'), { outcome: "outdated" });
  const operator = track(new AccountDatabase(path, { now: () => 1000 }));
  assert.equal(operator.blockAccount("player@example.test").outcome, "blocked");
  assert.deepEqual(save(3, 2, '{"blocked":3}'), { outcome: "blocked" });

  assert.deepEqual(database.readPreviousSavedGame(account.id), previous);
  assert.deepEqual(database.readSavedGame(account.id), current);
});

// invariant: previous-save-slot
test("a save whose write fails after its move leaves both the previous save and the current save as they were", async (t) => {
  const { database, account } = await fixture(t);
  const save = (version, basedOn, game) =>
    database.writeSavedGame(account.id, { version, basedOn, game });
  save(1, 0, '{"v":1}');
  save(2, 1, '{"v":2}');
  const full = "ż".repeat(32_768);
  // The move copies the current save into the slot first; the text over the
  // limit then fails the write, and the transaction takes the copy back.
  assert.throws(() => save(3, 2, `${full}a`), /CHECK constraint/);
  assert.deepEqual(database.readPreviousSavedGame(account.id), {
    version: 1,
    revision: 1,
    game: '{"v":1}',
  });
  assert.deepEqual(database.readSavedGame(account.id), {
    version: 2,
    revision: 2,
    game: '{"v":2}',
  });
});

// invariant: previous-save-slot
test("a reset of a privileged, unblocked account moves the current save into the previous slot and leaves no current save", async (t) => {
  const { database, raw, account } = await fixture(t);
  database.writeSavedGame(account.id, {
    version: 1,
    basedOn: 0,
    game: '{"programs":["Las"]}',
  });
  assert.deepEqual(
    database.setPreviousSavePrivilege("player@example.test", true),
    { outcome: "granted", accountId: account.id },
  );
  assert.deepEqual(database.resetSavedGame(account.id), { outcome: "moved" });
  assert.equal(database.readSavedGame(account.id), null);
  assert.equal(savedGameCount(raw), 0);
  assert.deepEqual(database.readPreviousSavedGame(account.id), {
    version: 1,
    revision: 1,
    game: '{"programs":["Las"]}',
  });
});

// invariant: previous-save-slot
test("a reset replaces the previous save the earlier moves left, and the next save of the new game starts at revision 1", async (t) => {
  const { database, account } = await fixture(t);
  const save = (version, basedOn, game) =>
    database.writeSavedGame(account.id, { version, basedOn, game });
  database.setPreviousSavePrivilege("player@example.test", true);
  save(1, 0, '{"first":1}');
  save(2, 1, '{"second":2}');
  assert.deepEqual(database.resetSavedGame(account.id), { outcome: "moved" });
  assert.deepEqual(database.readPreviousSavedGame(account.id), {
    version: 2,
    revision: 2,
    game: '{"second":2}',
  });
  // D-209: after a reset the account has no save, so a save based on 0 starts at 1.
  assert.deepEqual(save(2, 0, '{"new":1}'), { outcome: "saved", revision: 1 });
  assert.deepEqual(database.resetSavedGame(account.id), { outcome: "moved" });
  assert.deepEqual(database.readPreviousSavedGame(account.id), {
    version: 2,
    revision: 1,
    game: '{"new":1}',
  });
});

// invariant: previous-save-slot
test("a reset moves nothing without the privilege, for a blocked account, and with no current save", async (t) => {
  const { path, database, raw, account, track } = await fixture(t);
  database.writeSavedGame(account.id, {
    version: 1,
    basedOn: 0,
    game: '{"kept":1}',
  });
  assert.deepEqual(database.resetSavedGame(account.id), {
    outcome: "unprivileged",
  });
  assert.deepEqual(database.readSavedGame(account.id), {
    version: 1,
    revision: 1,
    game: '{"kept":1}',
  });
  assert.equal(database.readPreviousSavedGame(account.id), null);

  // The block is read before the privilege: the account never got the
  // privilege, and once blocked it answers blocked, not unprivileged.
  const operator = track(new AccountDatabase(path, { now: () => 1000 }));
  assert.equal(operator.blockAccount("player@example.test").outcome, "blocked");
  assert.deepEqual(database.resetSavedGame(account.id), { outcome: "blocked" });
  assert.deepEqual(database.readSavedGame(account.id), {
    version: 1,
    revision: 1,
    game: '{"kept":1}',
  });
  assert.equal(database.readPreviousSavedGame(account.id), null);
  assert.equal(storedPreviousSave(raw, account.id), undefined);

  const empty = database.createAccount("empty@example.test", "hash");
  database.setPreviousSavePrivilege("empty@example.test", true);
  assert.deepEqual(database.resetSavedGame(empty.id), {
    outcome: "nothing-to-move",
  });
  assert.equal(database.readPreviousSavedGame(empty.id), null);
  assert.equal(storedPreviousSave(raw, empty.id), undefined);

  // Nothing to move after a move: the second reset leaves the slot holding the
  // document the first one put there.
  const moved = database.createAccount("moved@example.test", "hash");
  database.setPreviousSavePrivilege("moved@example.test", true);
  database.writeSavedGame(moved.id, {
    version: 1,
    basedOn: 0,
    game: '{"first":1}',
  });
  assert.deepEqual(database.resetSavedGame(moved.id), { outcome: "moved" });
  const slot = { version: 1, revision: 1, game: '{"first":1}' };
  assert.deepEqual(database.readPreviousSavedGame(moved.id), slot);
  assert.deepEqual(database.resetSavedGame(moved.id), {
    outcome: "nothing-to-move",
  });
  assert.deepEqual(database.readPreviousSavedGame(moved.id), slot);
  assert.equal(database.readSavedGame(moved.id), null);
});

// invariant: previous-save-slot
test("blocking, unblocking, granting and revoking the privilege leave the previous save as it is", async (t) => {
  const { database, account } = await fixture(t);
  database.writeSavedGame(account.id, {
    version: 1,
    basedOn: 0,
    game: '{"v":1}',
  });
  database.writeSavedGame(account.id, {
    version: 2,
    basedOn: 1,
    game: '{"v":2}',
  });
  const previous = { version: 1, revision: 1, game: '{"v":1}' };
  assert.deepEqual(database.readPreviousSavedGame(account.id), previous);
  assert.equal(database.blockAccount("player@example.test").outcome, "blocked");
  assert.deepEqual(database.readPreviousSavedGame(account.id), previous);
  assert.equal(
    database.unblockAccount("player@example.test").outcome,
    "unblocked",
  );
  assert.deepEqual(database.readPreviousSavedGame(account.id), previous);
  database.setPreviousSavePrivilege("player@example.test", true);
  assert.deepEqual(database.readPreviousSavedGame(account.id), previous);
  database.setPreviousSavePrivilege("player@example.test", false);
  assert.deepEqual(database.readPreviousSavedGame(account.id), previous);
});

// invariant: previous-save-slot
test("the privilege write answers granted, already granted, revoked, not granted and unknown, and the account reads it back", async (t) => {
  const { database, account } = await fixture(t);
  assert.equal(database.findAccountById(account.id).previousSaveAllowed, false);
  assert.deepEqual(
    database.setPreviousSavePrivilege("player@example.test", true),
    { outcome: "granted", accountId: account.id },
  );
  assert.equal(database.findAccountById(account.id).previousSaveAllowed, true);
  assert.deepEqual(
    database.setPreviousSavePrivilege("player@example.test", true),
    { outcome: "already-granted", accountId: account.id },
  );
  assert.deepEqual(
    database.setPreviousSavePrivilege("player@example.test", false),
    { outcome: "revoked", accountId: account.id },
  );
  assert.equal(database.findAccountById(account.id).previousSaveAllowed, false);
  assert.deepEqual(
    database.setPreviousSavePrivilege("player@example.test", false),
    { outcome: "not-granted", accountId: account.id },
  );
  assert.deepEqual(
    database.setPreviousSavePrivilege("absent@example.test", true),
    { outcome: "unknown" },
  );
});

// invariant: player-save-isolation
// invariant: previous-save-slot
test("the move, the reset and the privilege write touch only the account they name, and another account's saves and privilege stay as they were", async (t) => {
  const { database, account } = await fixture(t);
  const neighbour = database.createAccount(
    "neighbour@example.test",
    "neighbour-hash",
  );
  const save = (accountId, version, basedOn, game) =>
    database.writeSavedGame(accountId, { version, basedOn, game });
  // The neighbour holds a current save and a previous save of its own, and no
  // privilege; both are written before the first account does anything.
  save(neighbour.id, 1, 0, '{"b":1}');
  save(neighbour.id, 2, 1, '{"b":2}');
  assert.deepEqual(database.readPreviousSavedGame(neighbour.id), {
    version: 1,
    revision: 1,
    game: '{"b":1}',
  });
  save(account.id, 1, 0, '{"a":1}');

  // The first account is granted the privilege, saves a higher version, which
  // moves its own save, and resets, which moves its current save.
  assert.deepEqual(
    database.setPreviousSavePrivilege("player@example.test", true),
    { outcome: "granted", accountId: account.id },
  );
  assert.deepEqual(save(account.id, 2, 1, '{"a":2}'), {
    outcome: "saved",
    revision: 2,
  });
  assert.deepEqual(database.readPreviousSavedGame(account.id), {
    version: 1,
    revision: 1,
    game: '{"a":1}',
  });
  assert.deepEqual(database.resetSavedGame(account.id), { outcome: "moved" });
  assert.deepEqual(database.readPreviousSavedGame(account.id), {
    version: 2,
    revision: 2,
    game: '{"a":2}',
  });

  // The neighbour's current save, previous save and privilege are as they were,
  // and its own reset still refuses for want of the privilege.
  assert.deepEqual(database.readSavedGame(neighbour.id), {
    version: 2,
    revision: 2,
    game: '{"b":2}',
  });
  assert.deepEqual(database.readPreviousSavedGame(neighbour.id), {
    version: 1,
    revision: 1,
    game: '{"b":1}',
  });
  assert.equal(
    database.findAccountById(neighbour.id).previousSaveAllowed,
    false,
  );
  assert.deepEqual(database.resetSavedGame(neighbour.id), {
    outcome: "unprivileged",
  });
  assert.deepEqual(database.readSavedGame(neighbour.id), {
    version: 2,
    revision: 2,
    game: '{"b":2}',
  });
});

// invariant: previous-save-slot
test("the table of previous saves holds at most 65 536 bytes of text, counted in bytes, a longer one changes nothing, and it goes with its account", async (t) => {
  const { database, raw, account } = await fixture(t);
  const other = database.createAccount("other@example.test", "hash");
  // D-104: the previous save has the limit of the saved game state, so "ż"
  // counts two bytes and 32 768 of them fill the limit exactly.
  const full = "ż".repeat(32_768);
  raw
    .prepare("INSERT INTO previous_saves VALUES (?, 1, 1, ?)")
    .run(account.id, full);
  assert.equal(database.readPreviousSavedGame(account.id)?.game, full);
  assert.throws(
    () =>
      raw
        .prepare("INSERT INTO previous_saves VALUES (?, 1, 1, ?)")
        .run(other.id, `${full}a`),
    /CHECK constraint/,
  );
  assert.throws(
    () =>
      raw
        .prepare("UPDATE previous_saves SET game = ? WHERE account_id = ?")
        .run(`${full}a`, account.id),
    /CHECK constraint/,
  );
  assert.equal(storedPreviousSave(raw, other.id), undefined);
  assert.equal(database.readPreviousSavedGame(account.id)?.game, full);

  raw.prepare("DELETE FROM accounts WHERE id = ?").run(account.id);
  assert.equal(storedPreviousSave(raw, account.id), undefined);
});

// invariant: account-message-limits
test("an account is admitted three messages within an hour; the fourth is refused, records nothing and stops no link, until the first is an hour old", async (t) => {
  const { database, raw, account, advance } = await fixture(t);
  const issue = (token) =>
    database.issueLink(confirmationLink(account.id, token), limits);
  for (const [time, token] of [
    [1000, "first"],
    [1000 + 20 * 60_000, "second"],
    [1000 + 40 * 60_000, "third"],
  ]) {
    advance(time);
    assert.equal(issue(token), "issued", token);
  }
  // The first and second were stopped by the later ones and still count.
  advance(1000 + HOUR - 1);
  assert.equal(issue("fourth"), "limited");
  assert.equal(storedLink(raw, "fourth"), undefined);
  assert.equal(
    storedLink(raw, "third").spent,
    0,
    "the newest link still works",
  );

  // From exactly an hour after it, the first message no longer counts.
  advance(1000 + HOUR);
  assert.equal(issue("fifth"), "issued");
  assert.equal(issue("sixth"), "limited", "second, third and fifth count");
});

// invariant: account-message-limits
test("confirmation and password-reset messages count against one account's limit together", async (t) => {
  const { database, raw, account } = await fixture(t);
  assert.equal(
    database.issueLink(resetLink(account.id, "reset-1"), limits),
    "issued",
  );
  assert.equal(
    database.issueLink(resetLink(account.id, "reset-2"), limits),
    "issued",
  );
  assert.equal(
    database.issueLink(confirmationLink(account.id, "confirm-1"), limits),
    "issued",
  );
  assert.equal(
    database.issueLink(confirmationLink(account.id, "confirm-2"), limits),
    "limited",
  );
  assert.equal(
    database.issueLink(resetLink(account.id, "reset-3"), limits),
    "limited",
  );
  assert.equal(storedLinkCount(raw), 3);
});

// invariant: account-message-limits
test("thirty messages within an hour across accounts refuse the thirty-first for any account until the hour has passed", async (t) => {
  const { database, raw, account, advance } = await fixture(t);
  const accounts = [account];
  for (let index = 1; index < 10; index += 1)
    accounts.push(database.createAccount(`player${index}@example.test`, "h"));
  for (const [index, owner] of accounts.entries())
    for (const copy of [1, 2, 3])
      assert.equal(
        database.issueLink(
          confirmationLink(owner.id, `${index}-${copy}`),
          limits,
        ),
        "issued",
      );
  assert.equal(storedLinkCount(raw), 30, "precondition: thirty messages");
  const fresh = database.createAccount("fresh@example.test", "h");
  advance(1000 + HOUR - 1);
  assert.equal(
    database.issueLink(confirmationLink(fresh.id, "late"), limits),
    "limited",
  );
  assert.equal(storedLinkCount(raw), 30);
  advance(1000 + HOUR);
  assert.equal(
    database.issueLink(confirmationLink(fresh.id, "late"), limits),
    "issued",
  );
});

// invariant: account-message-limits
test("the hour's count of messages survives closing and reopening the database", async (t) => {
  const { path, database, account, track } = await fixture(t);
  for (const token of ["one", "two", "three"])
    database.issueLink(confirmationLink(account.id, token), limits);
  database.close();
  // The reopened database stands in for the server after a deployment.
  const restarted = track(new AccountDatabase(path, { now: () => 2000 }));
  assert.equal(
    restarted.issueLink(confirmationLink(account.id, "four"), limits),
    "limited",
  );
});

test("issuing refuses a window longer than the hour links are kept for, an unusable lifetime or limit, and an unknown account, and records nothing", async (t) => {
  const { database, raw, account } = await fixture(t);
  for (const [label, request, given] of [
    [
      "a window past the hour",
      confirmationLink(account.id, "a"),
      { ...limits, windowMs: HOUR + 1 },
    ],
    ["no lifetime", confirmationLink(account.id, "b", 0), limits],
    [
      "no account limit",
      confirmationLink(account.id, "c"),
      { ...limits, perAccount: 0 },
    ],
    ["an unknown account", confirmationLink("absent", "d"), limits],
  ])
    assert.throws(() => database.issueLink(request, given), Error, label);
  assert.equal(storedLinkCount(raw), 0);
});

// invariant: email-confirmation-link
test("a confirmation link confirms its account once, stops the account's other confirmation links, and leaves its other kind of link working", async (t) => {
  const { database, raw, account, advance } = await fixture(t);
  const other = database.createAccount("other@example.test", "hash");
  database.issueLink(confirmationLink(account.id, "mine"), limits);
  database.issueLink(resetLink(account.id, "reset"), limits);
  database.issueLink(confirmationLink(other.id, "theirs"), limits);
  // Issuing never leaves two working confirmation links of one account, so a
  // second one is written directly to reach the confirmation's own rule.
  raw
    .prepare(
      "INSERT INTO emailed_links VALUES (?, ?, 'email-confirmation', 1000, ?, 0)",
    )
    .run(digest("stray"), account.id, 1000 + DAY);

  advance(5000);
  assert.equal(
    database.confirmEmailAddress(digest("mine")).outcome,
    "confirmed",
  );
  assert.equal(database.findAccountById(account.id).emailConfirmed, true);
  assert.equal(
    raw
      .prepare("SELECT email_confirmed_at FROM accounts WHERE id = ?")
      .get(account.id).email_confirmed_at,
    5000,
  );
  assert.equal(storedLink(raw, "stray").spent, 1);
  assert.equal(storedLink(raw, "reset").spent, 0);

  advance(6000);
  assert.equal(database.confirmEmailAddress(digest("mine")).outcome, "invalid");
  assert.equal(
    database.confirmEmailAddress(digest("stray")).outcome,
    "invalid",
  );
  assert.equal(
    raw
      .prepare("SELECT email_confirmed_at FROM accounts WHERE id = ?")
      .get(account.id).email_confirmed_at,
    5000,
    "a refused link changes nothing",
  );
  assert.equal(database.findAccountById(other.id).emailConfirmed, false);
  assert.equal(
    database.confirmEmailAddress(digest("theirs")).outcome,
    "confirmed",
  );
});

// invariant: email-confirmation-link
test("an unknown link or a link of another kind confirms nothing and changes nothing", async (t) => {
  const { database, raw, account } = await fixture(t);
  database.issueLink(confirmationLink(account.id, "confirm"), limits);
  database.issueLink(resetLink(account.id, "reset"), limits);
  for (const token of ["unknown", "reset"])
    assert.equal(
      database.confirmEmailAddress(digest(token)).outcome,
      "invalid",
      token,
    );
  assert.equal(database.confirmEmailAddress("").outcome, "invalid");
  assert.equal(database.findAccountById(account.id).emailConfirmed, false);
  assert.equal(storedLink(raw, "reset").spent, 0);
  assert.equal(storedLink(raw, "confirm").spent, 0);
  assert.equal(
    database.confirmEmailAddress(digest("confirm")).outcome,
    "confirmed",
  );
});

// invariant: email-confirmation-link
test("a confirmation link works until the millisecond before its expiry and not at it", async (t) => {
  const { database, account, advance } = await fixture(t);
  const other = database.createAccount("other@example.test", "hash");
  database.issueLink(confirmationLink(account.id, "in-time"), limits);
  database.issueLink(confirmationLink(other.id, "too-late"), limits);
  advance(1000 + DAY - 1);
  assert.equal(
    database.confirmEmailAddress(digest("in-time")).outcome,
    "confirmed",
  );
  advance(1000 + DAY);
  assert.equal(
    database.confirmEmailAddress(digest("too-late")).outcome,
    "invalid",
  );
  assert.equal(database.findAccountById(other.id).emailConfirmed, false);
});

// invariant: email-confirmation-link
test("issuing a confirmation link stops the account's earlier one at once, before its message is handed on, so a failed sending leaves no earlier link working", async (t) => {
  const { database, raw, account } = await fixture(t);
  const other = database.createAccount("other@example.test", "hash");
  database.issueLink(confirmationLink(account.id, "earlier"), limits);
  database.issueLink(confirmationLink(other.id, "neighbour"), limits);
  assert.equal(
    database.issueLink(confirmationLink(account.id, "later"), limits),
    "issued",
  );
  // The database learns nothing of how the later message's sending went:
  // whatever its outcome, the earlier link is already stopped.
  assert.equal(storedLink(raw, "earlier").spent, 1);
  assert.equal(
    database.confirmEmailAddress(digest("earlier")).outcome,
    "invalid",
  );
  assert.equal(database.findAccountById(account.id).emailConfirmed, false);
  assert.equal(
    database.confirmEmailAddress(digest("later")).outcome,
    "confirmed",
  );

  // Another account's link and a link of the other kind are not stopped.
  database.issueLink(resetLink(other.id, "reset"), limits);
  assert.equal(
    database.confirmEmailAddress(digest("neighbour")).outcome,
    "confirmed",
  );
});

// invariant: email-confirmation-link
test("a confirmation link of a blocked account changes nothing, also one the block did not stop", async (t) => {
  const { database, raw, account } = await fixture(t);
  database.issueLink(confirmationLink(account.id, "link"), limits);
  // Blocked without blockAccount, so the link stays unstopped and only the
  // confirmation's own reading of the block can refuse it.
  raw.prepare("UPDATE accounts SET blocked = 1 WHERE id = ?").run(account.id);
  assert.equal(database.confirmEmailAddress(digest("link")).outcome, "invalid");
  assert.equal(storedLink(raw, "link").spent, 0);
  assert.equal(database.findAccountById(account.id).emailConfirmed, false);
  raw.prepare("UPDATE accounts SET blocked = 0 WHERE id = ?").run(account.id);
  assert.equal(
    database.confirmEmailAddress(digest("link")).outcome,
    "confirmed",
  );
});

// invariant: unblock-restores-no-link
// invariant: email-confirmation-link
test("a block committed through another connection stops every link issued before it, which confirms nothing after unblocking, and a block before an issue records nothing", async (t) => {
  const { path, database, raw, account, track } = await fixture(t);
  const other = database.createAccount("other@example.test", "hash");
  database.issueLink(confirmationLink(account.id, "before"), limits);
  database.issueLink(resetLink(account.id, "reset"), limits);
  database.issueLink(confirmationLink(other.id, "theirs"), limits);
  // The second connection stands in for the owner's command beside the server.
  const operator = track(new AccountDatabase(path, { now: () => 1000 }));
  assert.equal(operator.blockAccount("player@example.test").outcome, "blocked");
  assert.equal(storedLink(raw, "before").spent, 1);
  assert.equal(storedLink(raw, "reset").spent, 1);
  assert.equal(storedLink(raw, "theirs").spent, 0);
  assert.equal(
    database.confirmEmailAddress(digest("before")).outcome,
    "invalid",
  );

  assert.equal(
    database.issueLink(confirmationLink(account.id, "during"), limits),
    "blocked",
  );
  assert.equal(storedLink(raw, "during"), undefined);

  assert.equal(
    operator.unblockAccount("player@example.test").outcome,
    "unblocked",
  );
  assert.equal(
    database.confirmEmailAddress(digest("before")).outcome,
    "invalid",
  );
  assert.equal(storedLink(raw, "reset").spent, 1);
  assert.equal(database.findAccountById(account.id).emailConfirmed, false);
  // Signed in again, the player asks for a new message, whose link works.
  assert.equal(
    database.issueLink(confirmationLink(account.id, "after"), limits),
    "issued",
  );
  assert.equal(
    database.confirmEmailAddress(digest("after")).outcome,
    "confirmed",
  );
});

// Everything a password reset may change, read straight from the file so a
// refusal can be compared with the state before it.
function resetState(raw) {
  const all = (sql) =>
    raw
      .prepare(sql)
      .all()
      .map((row) => ({ ...row }));
  return {
    accounts: all("SELECT * FROM accounts ORDER BY id"),
    sessions: all("SELECT * FROM sessions ORDER BY id"),
    links: all("SELECT * FROM emailed_links ORDER BY token_digest"),
  };
}

// invariant: password-reset-link
// invariant: password-reset-verified-email
// invariant: password-reset-ends-sessions
// invariant: player-server-session
test("a working reset link replaces the password, deletes every session of its account, stops its reset links and nothing else, and works once", async (t) => {
  const { database, store, raw, account, advance } = await fixture(t);
  const other = database.createAccount("other@example.test", "other-hash");
  database.issueLink(confirmationLink(account.id, "confirm"), limits);
  database.issueLink(resetLink(account.id, "reset"), limits);
  database.issueLink(resetLink(other.id, "theirs"), limits);
  // Issuing never leaves two working reset links of one account, so a second
  // one is written directly to reach the reset's own rule.
  raw
    .prepare(
      "INSERT INTO emailed_links VALUES (?, ?, 'password-reset', 1000, ?, 0)",
    )
    .run(digest("stray"), account.id, 1000 + HOUR);
  for (const id of ["one", "two"])
    await call(store, "set", id, data(account.id, 100_000));
  await call(store, "set", "other", data(other.id, 100_000));
  assert.equal(database.resetLinkWorks(digest("reset")), true);

  advance(5000);
  assert.deepEqual(database.resetPassword(digest("reset"), "new-hash"), {
    outcome: "reset",
    accountId: account.id,
    email: "player@example.test",
  });

  assert.equal(database.findAccountById(account.id).passwordHash, "new-hash");
  assert.equal(await call(store, "get", "one"), null);
  assert.equal(await call(store, "get", "two"), null);
  assert.equal((await call(store, "get", "other")).accountId, other.id);
  assert.equal(storedLink(raw, "reset").spent, 1);
  assert.equal(storedLink(raw, "stray").spent, 1);
  assert.equal(storedLink(raw, "confirm").spent, 0, "confirmation untouched");
  assert.equal(storedLink(raw, "theirs").spent, 0, "other account untouched");
  assert.equal(database.findAccountById(account.id).emailConfirmed, false);
  assert.equal(database.findAccountById(other.id).passwordHash, "other-hash");
  assert.equal(
    raw.prepare("PRAGMA user_version").get().user_version,
    5,
    "the schema stays at its current version 5",
  );

  // The link is spent with the password: neither it nor the link left over
  // from before works a second time, and the new hash stays.
  assert.equal(database.resetLinkWorks(digest("reset")), false);
  const after = resetState(raw);
  for (const token of ["reset", "stray"])
    assert.deepEqual(
      database.resetPassword(digest(token), "again"),
      { outcome: "invalid" },
      token,
    );
  assert.deepEqual(resetState(raw), after);
  assert.deepEqual(database.resetPassword(digest("theirs"), "theirs-hash"), {
    outcome: "reset",
    accountId: other.id,
    email: "other@example.test",
  });
});

// invariant: password-reset-link
test("a reset link that is unknown, of another kind, spent or of a blocked account sets no password and changes nothing", async (t) => {
  const { database, store, raw, account } = await fixture(t);
  const spentOwner = database.createAccount("spent@example.test", "hash");
  const blockedOwner = database.createAccount("blocked@example.test", "hash");
  database.issueLink(confirmationLink(account.id, "confirm"), limits);
  database.issueLink(resetLink(spentOwner.id, "spent"), limits);
  database.issueLink(resetLink(blockedOwner.id, "blocked"), limits);
  raw
    .prepare("UPDATE emailed_links SET spent = 1 WHERE token_digest = ?")
    .run(digest("spent"));
  await call(store, "set", "one", data(account.id));
  await call(store, "set", "blocked-one", data(blockedOwner.id));
  // Blocked without blockAccount, so the link and the session stay and only
  // the reset's own reading of the block can refuse it.
  raw
    .prepare("UPDATE accounts SET blocked = 1 WHERE id = ?")
    .run(blockedOwner.id);
  const before = resetState(raw);

  for (const token of ["confirm", "spent", "blocked", "unknown"]) {
    assert.equal(database.resetLinkWorks(digest(token)), false, token);
    assert.deepEqual(
      database.resetPassword(digest(token), "new-hash"),
      { outcome: "invalid" },
      token,
    );
  }
  for (const nonDigest of ["", "not a digest", "%", "'; DROP TABLE accounts"]) {
    assert.equal(database.resetLinkWorks(nonDigest), false, nonDigest);
    assert.deepEqual(database.resetPassword(nonDigest, "new-hash"), {
      outcome: "invalid",
    });
  }
  assert.deepEqual(resetState(raw), before);
});

// invariant: password-reset-link
test("a reset link works until the millisecond before its expiry and not at it, also when the hour passes between the check and the reset", async (t) => {
  const { database, raw, account, advance } = await fixture(t);
  const other = database.createAccount("other@example.test", "hash");
  database.issueLink(resetLink(account.id, "in-time"), limits);
  database.issueLink(resetLink(other.id, "too-late"), limits);

  advance(1000 + HOUR - 1);
  assert.equal(database.resetLinkWorks(digest("in-time")), true);
  assert.equal(database.resetLinkWorks(digest("too-late")), true);
  assert.deepEqual(database.resetPassword(digest("in-time"), "new-hash"), {
    outcome: "reset",
    accountId: account.id,
    email: "player@example.test",
  });

  // The hour ends while the password is being hashed.
  advance(1000 + HOUR);
  const before = resetState(raw);
  assert.equal(database.resetLinkWorks(digest("too-late")), false);
  assert.deepEqual(database.resetPassword(digest("too-late"), "late-hash"), {
    outcome: "invalid",
  });
  assert.deepEqual(resetState(raw), before);
  assert.equal(database.findAccountById(other.id).passwordHash, "hash");
});

// invariant: password-reset-link
// invariant: unblock-restores-no-link
test("a block committed through another connection between the check and the reset leaves the password, and an unblock brings the link back to no one", async (t) => {
  const { path, database, store, raw, account, track } = await fixture(t);
  database.issueLink(resetLink(account.id, "link"), limits);
  // The second connection stands in for the owner's command beside the server.
  const operator = track(new AccountDatabase(path, { now: () => 1000 }));

  assert.equal(database.resetLinkWorks(digest("link")), true);
  assert.equal(operator.blockAccount("player@example.test").outcome, "blocked");
  const blocked = resetState(raw);
  assert.deepEqual(database.resetPassword(digest("link"), "new-hash"), {
    outcome: "invalid",
  });
  assert.deepEqual(resetState(raw), blocked);
  assert.equal(
    database.findAccountById(account.id).passwordHash,
    "encoded-hash",
  );

  assert.equal(
    operator.unblockAccount("player@example.test").outcome,
    "unblocked",
  );
  assert.equal(database.resetLinkWorks(digest("link")), false);
  const unblocked = resetState(raw);
  assert.deepEqual(database.resetPassword(digest("link"), "new-hash"), {
    outcome: "invalid",
  });
  assert.deepEqual(resetState(raw), unblocked);

  // A link recorded after the unblock works and ends a session made since.
  await call(store, "set", "one", data(account.id));
  assert.equal(
    database.issueLink(resetLink(account.id, "after"), limits),
    "issued",
  );
  assert.deepEqual(database.resetPassword(digest("after"), "new-hash"), {
    outcome: "reset",
    accountId: account.id,
    email: "player@example.test",
  });
  assert.equal(await call(store, "get", "one"), null);
});

// invariant: password-reset-link
test("a later reset link recorded between the check and the reset stops the earlier one, which sets no password", async (t) => {
  const { database, raw, account } = await fixture(t);
  database.issueLink(resetLink(account.id, "first"), limits);
  assert.equal(database.resetLinkWorks(digest("first")), true);
  assert.equal(
    database.issueLink(resetLink(account.id, "second"), limits),
    "issued",
  );
  const before = resetState(raw);
  assert.deepEqual(database.resetPassword(digest("first"), "new-hash"), {
    outcome: "invalid",
  });
  assert.deepEqual(resetState(raw), before);
  assert.equal(
    database.findAccountById(account.id).passwordHash,
    "encoded-hash",
  );
  assert.deepEqual(database.resetPassword(digest("second"), "new-hash"), {
    outcome: "reset",
    accountId: account.id,
    email: "player@example.test",
  });
});

// invariant: account-message-limits
test("cleanup removes, in bounded batches, only links both expired and an hour old, so pruning never readmits a message", async (t) => {
  const { path, database, raw, account, advance, track } = await fixture(t);
  const other = database.createAccount("other@example.test", "hash");
  for (const token of ["short-1", "short-2", "short-3"])
    database.issueLink(confirmationLink(account.id, token, 60_000), limits);
  database.issueLink(confirmationLink(other.id, "long"), limits);

  // Expired, but still within the hour that counts them.
  advance(1000 + 120_000);
  database.pruneExpiredLinks();
  assert.equal(storedLinkCount(raw), 4);
  assert.equal(
    database.issueLink(confirmationLink(account.id, "short-4"), limits),
    "limited",
  );

  // An hour old and expired: gone; an hour old and still working: kept.
  advance(1000 + HOUR);
  database.pruneExpiredLinks();
  assert.equal(storedLink(raw, "short-1"), undefined);
  assert.equal(storedLink(raw, "short-3"), undefined);
  assert.ok(storedLink(raw, "long"));

  const insert = raw.prepare(
    "INSERT INTO emailed_links VALUES (?, ?, 'email-confirmation', 0, 0, 1)",
  );
  raw.exec("BEGIN");
  for (let index = 0; index < 1001; index += 1)
    insert.run(digest(`old-${index}`), account.id);
  raw.exec("COMMIT");
  database.pruneExpiredLinks();
  assert.equal(storedLinkCount(raw), 2, "one old link and the long one remain");
  database.close();

  // Opening prunes one batch too, and the periodic cleanup the rest.
  raw.exec("BEGIN");
  for (let index = 0; index < 1001; index += 1)
    insert.run(digest(`older-${index}`), account.id);
  raw.exec("COMMIT");
  const failures = [];
  const reopened = track(
    new AccountDatabase(path, {
      now: () => 1000 + HOUR,
      cleanupIntervalMs: 10,
      onCleanupError: (error) => failures.push(error),
    }),
  );
  assert.equal(
    storedLinkCount(raw),
    3,
    "of 1002 old links and the long one, opening pruned a batch of 1000",
  );
  await new Promise((resolve, reject) => {
    const deadline = setTimeout(() => {
      clearInterval(poll);
      reject(new Error("cleanup deadline"));
    }, 2000);
    const poll = setInterval(() => {
      if (storedLinkCount(raw) === 1) {
        clearInterval(poll);
        clearTimeout(deadline);
        resolve();
      }
    }, 5);
  });
  assert.ok(storedLink(raw, "long"));
  reopened.close();
  assert.deepEqual(failures, []);
});

// invariant: unblock-restores-no-session
test("blocking deletes every session of that account and no other, and unblocking brings none back", async (t) => {
  const { store, database, raw, account } = await fixture(t);
  const other = database.createAccount("other@example.test", "hash");
  for (const id of ["one", "two"])
    await call(store, "set", id, data(account.id));
  await call(store, "set", "other", data(other.id));
  const sessionsOf = (id) =>
    raw
      .prepare("SELECT count(*) AS n FROM sessions WHERE account_id = ?")
      .get(id).n;
  assert.equal(sessionsOf(account.id), 2, "precondition: two browsers");

  assert.equal(database.blockAccount("player@example.test").outcome, "blocked");
  assert.equal(sessionsOf(account.id), 0);
  assert.equal(database.findAccountById(account.id).blocked, true);
  assert.equal((await call(store, "get", "other")).accountId, other.id);
  assert.equal(database.findAccountById(other.id).blocked, false);
  assert.equal(
    database.blockAccount("player@example.test").outcome,
    "already-blocked",
  );

  assert.equal(
    database.unblockAccount("player@example.test").outcome,
    "unblocked",
  );
  assert.deepEqual(database.findAccountById(account.id), {
    ...account,
    blocked: false,
  });
  for (const id of ["one", "two"])
    assert.equal(await call(store, "get", id), null, id);
  assert.equal(sessionsOf(account.id), 0);
  assert.equal(
    database.unblockAccount("player@example.test").outcome,
    "not-blocked",
  );

  assert.equal(database.blockAccount("nobody@example.test").outcome, "unknown");
  assert.equal(
    database.unblockAccount("nobody@example.test").outcome,
    "unknown",
  );
  assert.equal(sessionsOf(other.id), 1);
});

// invariant: account-session-storage
test("a session write for a blocked account stores nothing, also under an identifier it held", async (t) => {
  const { store, database, raw, account } = await fixture(t);
  await call(store, "set", "held", data(account.id));
  database.blockAccount("player@example.test");
  for (const id of ["held", "new"]) {
    await assert.rejects(call(store, "set", id, data(account.id, 3000)), id);
    await call(store, "touch", id, data(account.id, 3000));
    assert.equal(
      raw.prepare("SELECT id FROM sessions WHERE id = ?").get(id),
      undefined,
      id,
    );
  }
  // The guard reads the state at the write: once unblocked, a new login stores.
  database.unblockAccount("player@example.test");
  await call(store, "set", "after", data(account.id));
  assert.equal((await call(store, "get", "after")).accountId, account.id);
  assert.equal(await call(store, "get", "held"), null);
});

// invariant: account-session-storage
// invariant: password-reset-ends-sessions
test("a session write whose expected password hash still holds stores, also a second time with the same session object, and the payload stays as it was", async (t) => {
  const { store, raw, account } = await fixture(t);
  const stored = (id) =>
    raw.prepare("SELECT data, expires_at FROM sessions WHERE id = ?").get(id);
  const value = data(account.id);
  store.expectPasswordHash(value, "encoded-hash");

  await call(store, "set", "browser", value);
  assert.equal(stored("browser").expires_at, 2000);
  value.cookie = data(account.id, 3000).cookie;
  await call(store, "set", "browser", value);
  assert.equal(stored("browser").expires_at, 3000, "the second store lands");
  assert.equal(
    stored("browser").data,
    JSON.stringify({ accountId: account.id, cookie: value.cookie }),
    "the expectation is no part of the stored payload",
  );
  assert.ok(!stored("browser").data.includes("encoded-hash"));
  assert.deepEqual(
    Object.keys(await call(store, "get", "browser")).sort(),
    ["accountId", "cookie"],
    "a session read back carries no expectation",
  );
});

// invariant: account-session-storage
// invariant: password-reset-ends-sessions
test("a session write whose expected password hash no longer holds stores nothing under a held or a new identifier, also when the reset came through the store's own connection", async (t) => {
  const { store, database, raw, account } = await fixture(t);
  database.issueLink(resetLink(account.id, "reset"), limits);
  const value = data(account.id);
  store.expectPasswordHash(value, "encoded-hash");
  await call(store, "set", "browser", value);

  // The first store is deleted by the reset, as a login's first store is;
  // the library then stores the same object a second time.
  assert.deepEqual(database.resetPassword(digest("reset"), "new-hash"), {
    outcome: "reset",
    accountId: account.id,
    email: "player@example.test",
  });
  assert.equal(raw.prepare("SELECT count(*) AS n FROM sessions").get().n, 0);
  value.cookie = data(account.id, 3000).cookie;
  for (const id of ["browser", "other-identifier"]) {
    await assert.rejects(call(store, "set", id, value), id);
    assert.equal(
      raw.prepare("SELECT id FROM sessions WHERE id = ?").get(id),
      undefined,
      id,
    );
  }

  // Another session object of the account, given the new hash, stores.
  const fresh = data(account.id);
  store.expectPasswordHash(fresh, "new-hash");
  await call(store, "set", "after", fresh);
  assert.equal((await call(store, "get", "after")).accountId, account.id);
});

// invariant: account-session-storage
// A block is meant to stop the account's sessions (D-137), so the refusal of a
// session write it causes is told from a refusal for any other cause (D-353):
// by the error's type, from the state the writing statement saw.
test("a session write refused because the account is blocked says so; one refused for another cause does not", async (t) => {
  const { store, database, raw, account } = await fixture(t);
  const other = database.createAccount("other@example.test", "other-hash");
  const refusal = async (id, value) => {
    try {
      await call(store, "set", id, value);
    } catch (error) {
      return error;
    }
    assert.fail(`the write of ${id} stored`);
  };

  // A password replaced meanwhile: refused, and no block to blame.
  const replaced = data(account.id);
  store.expectPasswordHash(replaced, "an-older-hash");
  const hash = await refusal("replaced", replaced);
  assert.ok(!(hash instanceof BlockedSessionRefusal), "password hash");
  assert.ok(hash instanceof Error, "an error refused it");

  // A held identifier of another account: refused, and no block to blame.
  await call(store, "set", "held", data(other.id));
  const held = await refusal("held", data(account.id));
  assert.ok(!(held instanceof BlockedSessionRefusal), "identifier of another");
  assert.ok(held instanceof Error, "an error refused it");

  // The block, with or without an expectation, also when the hash has moved.
  assert.equal(database.blockAccount("player@example.test").outcome, "blocked");
  const bare = await refusal("blocked-bare", data(account.id));
  assert.ok(bare instanceof BlockedSessionRefusal, "no expectation");
  assert.ok(bare instanceof Error, "an error refused it");
  const guarded = data(account.id);
  store.expectPasswordHash(guarded, "encoded-hash");
  assert.ok(
    (await refusal("blocked-guarded", guarded)) instanceof
      BlockedSessionRefusal,
    "an expectation that holds",
  );
  const moved = data(account.id);
  store.expectPasswordHash(moved, "an-older-hash");
  assert.ok(
    (await refusal("blocked-moved", moved)) instanceof BlockedSessionRefusal,
    "an expectation that no longer holds",
  );
  assert.equal(
    raw
      .prepare("SELECT count(*) AS n FROM sessions WHERE id LIKE 'blocked-%'")
      .get().n,
    0,
    "nothing is stored for the blocked",
  );

  // Unblocked, the same write is refused for the hash alone.
  assert.equal(
    database.unblockAccount("player@example.test").outcome,
    "unblocked",
  );
  assert.ok(
    !(
      (await refusal("unblocked-moved", moved)) instanceof BlockedSessionRefusal
    ),
    "unblocked",
  );
});

// invariant: account-session-storage
// invariant: password-reset-ends-sessions
test("a session write whose expected password hash was changed through a second connection stores nothing and leaves a held row as it was; one with no expectation behaves as before", async (t) => {
  const { store, raw, account } = await fixture(t);
  const value = data(account.id);
  store.expectPasswordHash(value, "encoded-hash");
  await call(store, "set", "held", value);
  raw
    .prepare("UPDATE accounts SET password_hash = ? WHERE id = ?")
    .run("changed-elsewhere", account.id);

  value.cookie = data(account.id, 3000).cookie;
  await assert.rejects(call(store, "set", "held", value));
  await assert.rejects(call(store, "set", "new", value));
  assert.equal(
    raw.prepare("SELECT expires_at FROM sessions WHERE id = ?").get("held")
      .expires_at,
    2000,
    "the held row is not rewritten",
  );
  assert.equal(
    raw.prepare("SELECT id FROM sessions WHERE id = ?").get("new"),
    undefined,
  );

  // No expectation: the write is the base's, whatever the hash is.
  await call(store, "set", "bare", data(account.id));
  assert.equal((await call(store, "get", "bare")).accountId, account.id);
  // An expectation names one session object and no other.
  const other = data(account.id);
  await call(store, "set", "other-object", other);
  assert.equal(
    (await call(store, "get", "other-object")).accountId,
    account.id,
  );
});

// invariant: account-session-storage
test("missing and expired records authorize nothing, including equality to expiry", async (t) => {
  const { store, account, advance } = await fixture(t);
  assert.ok(store instanceof session.Store);
  assert.equal(await call(store, "get", "missing"), null);
  await call(store, "set", "browser", data(account.id));
  advance(1999);
  assert.equal((await call(store, "get", "browser")).accountId, account.id);
  advance(2000);
  assert.equal(await call(store, "get", "browser"), null);
  await call(store, "touch", "browser", data(account.id, 4000));
  assert.equal(await call(store, "get", "browser"), null);
});

// invariant: account-session-storage
test("out-of-order renewal preserves the later expiry and never changes identity", async (t) => {
  const { store, database, account, advance } = await fixture(t);
  const other = database.createAccount("other@example.test", "hash");
  await call(store, "set", "browser", data(account.id));
  await call(store, "touch", "browser", data(account.id, 5000));
  await call(store, "touch", "browser", data(account.id, 3000));
  await call(store, "touch", "browser", data(other.id, 9000));
  advance(4000);
  const restored = await call(store, "get", "browser");
  assert.ok(restored, "a later expiry survives an earlier delayed renewal");
  assert.equal(restored.accountId, account.id);
  assert.equal(restored.cookie.expires.getTime(), 5000);
  assert.equal(restored.cookie.originalMaxAge, 1000);
  const loaded = await call(store, "load", "browser");
  assert.ok(loaded instanceof session.Session);
  assert.equal(loaded.accountId, account.id);
  advance(5000);
  assert.equal(await call(store, "get", "browser"), null);
});

// invariant: account-session-storage
test("a delayed touch after destroy cannot recreate a session or revoke another browser", async (t) => {
  const { store, raw, account } = await fixture(t);
  await call(store, "set", "one", data(account.id));
  await call(store, "set", "two", data(account.id));
  const delayed = await call(store, "get", "one");
  delayed.cookie.expires = new Date(4000);
  delayed.cookie.originalMaxAge = 1000;
  await call(store, "destroy", "one");
  await call(store, "touch", "one", delayed);
  assert.equal(await call(store, "get", "one"), null);
  assert.equal(
    raw.prepare("SELECT id FROM sessions WHERE id = 'one'").get(),
    undefined,
  );
  assert.equal((await call(store, "get", "two")).accountId, account.id);
});

test("set rejects unknown accounts and replacement of an existing session identity", async (t) => {
  const { store, database, account } = await fixture(t);
  await assert.rejects(
    call(store, "set", "missing-account", data("absent")),
    /FOREIGN KEY/,
  );
  await call(store, "set", "one", data(account.id));
  const other = database.createAccount("other@example.test", "hash");
  await assert.rejects(
    call(store, "set", "one", data(other.id)),
    /cannot be replaced/,
  );
  const updated = data(account.id, 3000);
  updated.cookie.originalMaxAge = 2000;
  await call(store, "set", "one", updated);
  const stored = await call(store, "get", "one");
  assert.equal(stored.accountId, account.id);
  assert.equal(stored.cookie.originalMaxAge, 2000);
});

// invariant: account-session-storage
test("crafted persisted payloads fail through Store callbacks before package hydration", async (t) => {
  const { store, raw, account } = await fixture(t);
  await call(store, "set", "one", data(account.id));
  const valid = JSON.stringify(data(account.id));
  const variants = [
    ["invalid JSON", "{"],
    ["array", "[]"],
    ["missing cookie", JSON.stringify({ accountId: account.id })],
    ["identity mismatch", JSON.stringify(data("different-account"))],
    [
      "cookie prototype",
      valid.replace('"cookie":{', '"cookie":{"__proto__":{},'),
    ],
    ["invalid date", valid.replace("1970-01-01T00:00:02.000Z", "invalid")],
    [
      "credentials",
      valid.replace('"cookie":', '"password":"secret","cookie":'),
    ],
    [
      "invalid max age",
      valid.replace('"originalMaxAge":1000', '"originalMaxAge":null'),
    ],
  ];
  for (const [name, payload] of variants) {
    raw.prepare("UPDATE sessions SET data = ? WHERE id = 'one'").run(payload);
    await assert.rejects(
      call(store, "load", "one"),
      /Invalid stored|identity mismatch/,
      name,
    );
  }
  raw.prepare("UPDATE sessions SET data = ? WHERE id = 'one'").run(valid);
  assert.equal((await call(store, "load", "one")).accountId, account.id);
});

// invariant: account-session-storage
test("persisted cookies must be usable after database expiry replacement and package renewal", async (t) => {
  for (const [name, corrupt] of [
    [
      "invalid path",
      (payload) => {
        payload.cookie.path = "/;bad";
      },
    ],
    [
      "invalid domain",
      (payload) => {
        payload.cookie.domain = "bad domain";
      },
    ],
    [
      "unrepresentable renewal age",
      (payload) => {
        payload.cookie.originalMaxAge = Number.MAX_SAFE_INTEGER;
      },
    ],
    [
      "unrepresentable database expiry",
      (_payload, raw) => {
        raw
          .prepare("UPDATE sessions SET expires_at = ? WHERE id = 'one'")
          .run(Number.MAX_SAFE_INTEGER);
      },
    ],
  ]) {
    await t.test(name, async (t) => {
      // The library's Cookie copy reads the clock twice (maxAge, then expires),
      // so a real clock lets a millisecond between the reads move the expiry
      // A frozen clock keeps the expected value exact.
      t.mock.timers.enable({ apis: ["Date"], now: 1000 });
      const { store, raw, account } = await fixture(t);
      const valid = data(account.id);
      valid.cookie.path = "/accounts";
      valid.cookie.domain = "example.test";
      await call(store, "set", "one", valid);
      const renewed = data(account.id, 5000);
      await call(store, "touch", "one", renewed);
      const before = await call(store, "load", "one");
      assert.equal(
        before.cookie.expires.getTime(),
        5000,
        "database expiry replaces older JSON expiry",
      );
      assert.doesNotThrow(() => before.cookie.serialize("sid", "synthetic"));
      before.touch();
      assert.doesNotThrow(() => before.cookie.serialize("sid", "synthetic"));

      const payload = JSON.parse(JSON.stringify(valid));
      corrupt(payload, raw);
      raw
        .prepare("UPDATE sessions SET data = ? WHERE id = 'one'")
        .run(JSON.stringify(payload));
      await assert.rejects(
        call(store, "load", "one"),
        /Invalid stored session cookie/,
      );

      raw
        .prepare(
          "UPDATE sessions SET data = ?, expires_at = 5000 WHERE id = 'one'",
        )
        .run(JSON.stringify(valid));
      const after = await call(store, "load", "one");
      assert.equal(after.accountId, account.id);
      assert.doesNotThrow(() => after.cookie.serialize("sid", "synthetic"));
      after.touch();
      assert.doesNotThrow(() => after.cookie.serialize("sid", "synthetic"));
    });
  }
});

// invariant: account-session-storage
test("set and touch refuse unusable cookie input without changing stored sessions", async (t) => {
  for (const [name, corrupt] of [
    [
      "invalid path",
      (cookie) => {
        cookie.path = "/;bad";
      },
    ],
    [
      "invalid domain",
      (cookie) => {
        cookie.domain = "bad domain";
      },
    ],
    [
      "unrepresentable renewal age",
      (cookie) => {
        cookie.originalMaxAge = Number.MAX_SAFE_INTEGER;
      },
    ],
  ]) {
    await t.test(name, async (t) => {
      // Frozen clock, as in the loop above: the load's expiry must stay exact.
      t.mock.timers.enable({ apis: ["Date"], now: 1000 });
      const { store, raw, account } = await fixture(t);
      await call(store, "set", "one", data(account.id));
      const invalid = data(account.id, 5000);
      corrupt(invalid.cookie);
      await assert.rejects(
        call(store, "set", "two", invalid),
        /Invalid stored session cookie/,
      );
      assert.equal(
        raw.prepare("SELECT id FROM sessions WHERE id = 'two'").get(),
        undefined,
      );
      await assert.rejects(
        call(store, "touch", "one", invalid),
        /Invalid stored session cookie/,
      );
      assert.equal(
        (await call(store, "get", "one")).cookie.expires.getTime(),
        2000,
      );
      await call(store, "touch", "one", data(account.id, 5000));
      const valid = await call(store, "load", "one");
      assert.equal(valid.cookie.expires.getTime(), 5000);
      valid.touch();
      assert.doesNotThrow(() => valid.cookie.serialize("sid", "synthetic"));
    });
  }
});

test("Store callback failures are delivered once and callback exceptions are not swallowed", async (t) => {
  const { store, account } = await fixture(t);
  const sentinel = new Error("caller exception");
  assert.throws(
    () =>
      store.get("missing", () => {
        throw sentinel;
      }),
    (error) => error === sentinel,
  );
  assert.throws(
    () =>
      store.set("one", data(account.id), () => {
        throw sentinel;
      }),
    (error) => error === sentinel,
  );
  store.close();
  for (const [method, args] of [
    ["get", ["one"]],
    ["set", ["two", data(account.id)]],
    ["touch", ["one", data(account.id)]],
    ["destroy", ["one"]],
  ]) {
    let calls = 0;
    store[method](...args, (error) => {
      calls += 1;
      assert.ok(error instanceof Error, method);
    });
    assert.equal(calls, 1, method);
  }
  const errors = [];
  store.on("error", (error) => errors.push(error));
  store.destroy("one");
  assert.equal(errors.length, 1);
});

test("busy writes fail within a bound and keep the valid account for a later retry", async (t) => {
  const { store, raw, account, database } = await fixture(t, {
    busyTimeoutMs: 20,
  });
  raw.exec("BEGIN IMMEDIATE");
  try {
    const before = performance.now();
    await assert.rejects(call(store, "set", "one", data(account.id)), /locked/);
    assert.ok(performance.now() - before < 2000, "the busy wait terminates");
    assert.equal(database.findAccountById(account.id).id, account.id);
  } finally {
    raw.exec("ROLLBACK");
  }
  await call(store, "set", "one", data(account.id));
  assert.equal((await call(store, "get", "one")).accountId, account.id);
});

test("startup and bounded periodic cleanup remove expired rows and disposal stops its timer", async (t) => {
  const { path, database, raw, account, track } = await fixture(t);
  database.saveSession("expired", {
    accountId: account.id,
    data: "{}",
    expiresAt: 2000,
  });
  database.saveSession("live", {
    accountId: account.id,
    data: "{}",
    expiresAt: 9000,
  });
  database.close();
  const failures = [];
  const reopened = track(
    new AccountDatabase(path, {
      now: () => 3000,
      cleanupIntervalMs: 10,
      onCleanupError: (error) => failures.push(error),
    }),
  );
  assert.equal(
    raw.prepare("SELECT id FROM sessions WHERE id = 'expired'").get(),
    undefined,
  );
  const insert = raw.prepare("INSERT INTO sessions VALUES (?, ?, '{}', 1000)");
  raw.exec("BEGIN");
  for (let index = 0; index < 1001; index += 1)
    insert.run(`expired-${index}`, account.id);
  raw.exec("COMMIT");
  reopened.pruneExpiredSessions();
  assert.equal(
    raw
      .prepare(
        "SELECT count(*) AS count FROM sessions WHERE expires_at <= 3000",
      )
      .get().count,
    1,
  );
  await new Promise((resolve, reject) => {
    const deadline = setTimeout(() => {
      clearInterval(poll);
      reject(new Error("cleanup deadline"));
    }, 2000);
    const poll = setInterval(() => {
      if (
        raw
          .prepare(
            "SELECT count(*) AS count FROM sessions WHERE expires_at <= 3000",
          )
          .get().count === 0
      ) {
        clearInterval(poll);
        clearTimeout(deadline);
        resolve();
      }
    }, 5);
  });
  assert.ok(raw.prepare("SELECT id FROM sessions WHERE id = 'live'").get());
  reopened.close();
  await new Promise((resolve) => setTimeout(resolve, 30));
  assert.deepEqual(failures, []);
});

// Another process holding a write lock on a new database while this one opens
// it is what two processes starting on one fresh database meet: the account
// container's start and a second process opening its database.
async function heldWriteLock(t, path, holdMs) {
  // The holder waits for its own commit as every AccountDatabase connection
  // does; without a busy timeout its COMMIT would fail whenever the opener's
  // retry briefly reads the file.
  const source = `
    const { DatabaseSync } = require("node:sqlite");
    const connection = new DatabaseSync(process.argv[1], { timeout: 5000 });
    connection.exec("BEGIN IMMEDIATE");
    console.log("held");
    setTimeout(() => {
      connection.exec("COMMIT");
      connection.close();
    }, Number(process.argv[2]));
  `;
  const child = spawn(process.execPath, ["-e", source, path, String(holdMs)], {
    stdio: ["ignore", "pipe", "inherit"],
  });
  t.after(() => child.kill());
  const finished = new Promise((resolve, reject) => {
    child.once("error", reject);
    child.once("exit", (code) =>
      code === 0 ? resolve() : reject(new Error(`lock process exited ${code}`)),
    );
  });
  // A failure before the lock is held is reported by the wait below.
  finished.catch(() => {});
  await new Promise((resolve, reject) => {
    const deadline = setTimeout(
      () => reject(new Error("lock process deadline")),
      10_000,
    );
    child.stdout.once("data", () => {
      clearTimeout(deadline);
      resolve();
    });
    finished.catch((error) => {
      clearTimeout(deadline);
      reject(error);
    });
  });
  // Wrapped, so that awaiting the lock does not also await its release.
  return { released: finished };
}

test("opening a new database waits within the busy timeout for another connection's write lock", async (t) => {
  const directory = await mkdtemp(join(tmpdir(), "loop2-storage-"));
  t.after(() => rm(directory, { recursive: true, force: true }));
  const path = join(directory, "accounts.sqlite");
  new DatabaseSync(path).close();
  // The lock lasts 300 ms, well inside the 2000 ms busy timeout (D-112).
  const { released } = await heldWriteLock(t, path, 300);
  const database = new AccountDatabase(path, { busyTimeoutMs: 2000 });
  try {
    await released;
    const raw = new DatabaseSync(path);
    try {
      assert.equal(
        raw.prepare("PRAGMA journal_mode").get().journal_mode,
        "wal",
      );
    } finally {
      raw.close();
    }
    assert.ok(database.createAccount("player@example.test", "encoded-hash"));
  } finally {
    database.close();
  }
});

test("opening a new database fails within the busy timeout when another connection's write lock outlasts it", async (t) => {
  const directory = await mkdtemp(join(tmpdir(), "loop2-storage-"));
  t.after(() => rm(directory, { recursive: true, force: true }));
  const path = join(directory, "accounts.sqlite");
  new DatabaseSync(path).close();
  const { released } = await heldWriteLock(t, path, 1000);
  let opened;
  t.after(() => opened?.close());
  const before = performance.now();
  assert.throws(() => {
    opened = new AccountDatabase(path, { busyTimeoutMs: 100 });
  }, /locked/);
  const waited = performance.now() - before;
  await released;
  // The open waited for the configured 100 ms rather than failing at once. It
  // stops after one more attempt, which SQLite's busy handler bounds by the
  // same 100 ms, so 500 ms leaves room while a bound other than the
  // configured one, or none, waits the 1000 ms lock out.
  assert.ok(waited >= 100, `the open gave up after ${waited} ms`);
  assert.ok(waited < 500, `the open waited ${waited} ms`);
});

const blockCommand = fileURLToPath(
  new URL("../dist/server/account-block.js", import.meta.url),
);

const previousSaveCommand = fileURLToPath(
  new URL("../dist/server/account-previous-save.js", import.meta.url),
);

// Runs the owner's command as `docker exec loop2 node dist/server/account-block.js`
// does: its own process, with the database path its only setting. `mode` runs
// it under the stand-in for `node:sqlite`, which acts as the mode says.
function runBlockCommand(args, databasePath, mode) {
  return runOwnerCommand(blockCommand, args, databasePath, mode);
}

function runOwnerCommand(script, args, databasePath, mode) {
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
      reject(new Error("block command deadline"));
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

const standin = new URL("./account-database-check-standin.mjs", import.meta.url)
  .href;

// The command opens its own connection and prunes by the real clock, so its
// sessions expire a day from now.
const liveExpiry = () => Date.now() + 86_400_000;

test("the owner's command blocks and unblocks by address beside an open connection and says which outcome it reached", async (t) => {
  // The fixture's open AccountDatabase stands in for the running server's.
  const { path, database, store, raw, account } = await fixture(t);
  const other = database.createAccount("other@example.test", "hash");
  for (const id of ["one", "two"])
    await call(store, "set", id, data(account.id, liveExpiry()));
  await call(store, "set", "other", data(other.id, liveExpiry()));
  const sessionsOf = (id) =>
    raw
      .prepare("SELECT count(*) AS n FROM sessions WHERE account_id = ?")
      .get(id).n;

  // D-99: the address is normalized as login normalizes it.
  const blocked = await runBlockCommand(
    ["block", " Player@EXAMPLE.test "],
    path,
  );
  assert.equal(blocked.code, 0, blocked.output);
  assert.equal(database.findAccountById(account.id).blocked, true);
  assert.equal(sessionsOf(account.id), 0, "every browser's session ended");
  assert.equal(sessionsOf(other.id), 1, "another account keeps its session");
  assert.equal(database.findAccountById(other.id).blocked, false);

  const again = await runBlockCommand(["block", "player@example.test"], path);
  assert.equal(again.code, 0, again.output);
  assert.equal(database.findAccountById(account.id).blocked, true);

  const unblocked = await runBlockCommand(
    ["unblock", "player@example.test"],
    path,
  );
  assert.equal(unblocked.code, 0, unblocked.output);
  assert.equal(database.findAccountById(account.id).blocked, false);
  assert.equal(sessionsOf(account.id), 0, "unblocking brings no session back");

  const notBlocked = await runBlockCommand(
    ["unblock", "player@example.test"],
    path,
  );
  assert.equal(notBlocked.code, 0, notBlocked.output);
  assert.equal(database.findAccountById(account.id).blocked, false);

  const outcomes = [blocked, again, unblocked, notBlocked].map((run) =>
    run.stdout.trim(),
  );
  for (const outcome of outcomes) {
    assert.ok(outcome !== "", "each outcome is reported");
    assert.match(outcome, /player@example\.test/, "it names the account");
  }
  assert.equal(new Set(outcomes).size, 4, "each outcome reads differently");
  for (const run of [blocked, again, unblocked, notBlocked])
    assert.doesNotMatch(run.output, /encoded-hash|\bone\b|\btwo\b/);
});

// D-252, business events of the guidelines' list. Faults: no line for a
// change, a line for a command that changed nothing, the wrong account's
// number, the address in the line.
test("the owner's command writes one event with the account's number for a change, none for no change, and no address", async (t) => {
  const { path, database, account } = await fixture(t);
  database.createAccount("other@example.test", "hash");
  const eventsOf = (run) =>
    run.stdout
      .split(/\r?\n/)
      .filter((line) => line.startsWith("{"))
      .map((line) => {
        assert.doesNotMatch(line, /example\.test/);
        return JSON.parse(line);
      });
  const run = (action) =>
    runBlockCommand([action, "player@example.test"], path);

  assert.deepEqual(eventsOf(await run("block")), [
    { event: "account-blocked", accountId: account.id },
  ]);
  assert.deepEqual(eventsOf(await run("block")), []);
  assert.deepEqual(eventsOf(await run("unblock")), [
    { event: "account-unblocked", accountId: account.id },
  ]);
  assert.deepEqual(eventsOf(await run("unblock")), []);
  assert.deepEqual(
    eventsOf(await runBlockCommand(["block", "nobody@example.test"], path)),
    [],
  );
});

// D-252, D-354. Faults: the failure's reason left out, so the owner only
// hears to try again; SQLite's message or the file's path in the output; a
// sentence dropped, so the owner no longer reads what happened.
test("a database failure of the owner's command adds the error's kind and code and nothing of its text", async (t) => {
  const { path } = await fixture(t);
  const garbage = join(path, "..", "garbage-secret-name.sqlite");
  await writeFile(garbage, "this is not an SQLite database at all, padding");

  const run = await runBlockCommand(["block", "player@example.test"], garbage);

  assert.equal(run.code, 1, run.output);
  assert.match(run.stderr, /Nothing changed; run the command again\./);
  const [line] = run.stderr.split(/\r?\n/).filter((text) => text[0] === "{");
  const { failure, kind, code, errcode, place } = JSON.parse(line);
  assert.deepEqual(
    { failure, kind, code, errcode, place },
    {
      failure: "account-block",
      kind: "Error",
      code: "ERR_SQLITE_ERROR",
      errcode: 26,
      place: "account-block.change",
    },
    "SQLite's number 26 says the file is no database",
  );
  assert.doesNotMatch(run.output, /garbage-secret-name|not a database/i);
});

// D-253. Faults: no handler, so the default print writes the
// message and the stack; a handler that goes on after what no code handled.
test("what no code of the owner's command handled ends it with one line of its kind, code and place, and none of its text", async (t) => {
  const { path } = await fixture(t);
  const run = await runBlockCommand(
    ["block", "player@example.test"],
    path,
    "uncaught",
  );
  assert.equal(run.code, 1, run.output);
  assert.deepEqual(JSON.parse(run.stderr.trim()), {
    failure: "uncaught",
    kind: "RangeError",
    code: "ERR_STANDIN_FAULT",
    place: "account-block",
  });
});

// D-112's cleanup runs in a timer, so no caller could ever see its failure. The
// fault: the failure's reason dropped from the line (D-252).
test("a cleanup that fails in the background writes one line of its kind and code, and nothing of its text", async (t) => {
  const { path, raw, account } = await fixture(t);
  const logged = t.mock.method(console, "error", () => {});
  // Opened first: the opening prunes too, and its failure is the caller's.
  const database = new AccountDatabase(path, {
    now: () => 1000,
    cleanupIntervalMs: 5,
  });
  t.after(() => database.close());
  raw.exec(`
    CREATE TRIGGER refuse_cleanup BEFORE DELETE ON sessions
    BEGIN SELECT RAISE(ABORT, 'synthetic player@example.test'); END;
  `);
  raw
    .prepare("INSERT INTO sessions VALUES ('old', ?, '{}', 1)")
    .run(account.id);
  await new Promise((resolve, reject) => {
    const deadline = setTimeout(() => {
      clearInterval(poll);
      reject(new Error("cleanup failure deadline"));
    }, 2000);
    const poll = setInterval(() => {
      if (logged.mock.callCount() > 0) {
        clearInterval(poll);
        clearTimeout(deadline);
        resolve();
      }
    }, 2);
  });
  database.close();
  const line = String(logged.mock.calls[0].arguments[0]);
  assert.deepEqual(JSON.parse(line), {
    failure: "database-cleanup",
    kind: "Error",
    code: "ERR_SQLITE_ERROR",
    errcode: 1811,
    place: "database.cleanup",
  });
});

// invariant: unblock-restores-no-link
test("the owner's command stops every emailed link of the account it blocks, and its unblock brings none back", async (t) => {
  // The command prunes by the real clock, so the server's connection uses it
  // too and its links are recorded now, not at the fixture's fixed time.
  const { path, database, raw, account } = await fixture(t, {
    now: () => Date.now(),
  });
  const other = database.createAccount("other@example.test", "hash");
  database.issueLink(confirmationLink(account.id, "confirm"), limits);
  database.issueLink(resetLink(account.id, "reset"), limits);
  database.issueLink(confirmationLink(other.id, "theirs"), limits);

  const blocked = await runBlockCommand(["block", "player@example.test"], path);
  assert.equal(blocked.code, 0, blocked.output);
  assert.equal(storedLink(raw, "confirm").spent, 1);
  assert.equal(storedLink(raw, "reset").spent, 1);
  assert.equal(storedLink(raw, "theirs").spent, 0);

  const unblocked = await runBlockCommand(
    ["unblock", "player@example.test"],
    path,
  );
  assert.equal(unblocked.code, 0, unblocked.output);
  assert.equal(
    database.confirmEmailAddress(digest("confirm")).outcome,
    "invalid",
  );
  assert.equal(storedLink(raw, "reset").spent, 1);
  assert.equal(database.findAccountById(account.id).emailConfirmed, false);
  assert.equal(
    database.confirmEmailAddress(digest("theirs")).outcome,
    "confirmed",
  );
});

test("the owner's command changes nothing on a usage error, an unknown address or an unusable database, and creates none", async (t) => {
  const { path, database, store, raw, account } = await fixture(t);
  await call(store, "set", "one", data(account.id, liveExpiry()));
  const unchanged = (label) => {
    assert.equal(database.findAccountById(account.id).blocked, false, label);
    assert.ok(
      raw.prepare("SELECT id FROM sessions WHERE id = 'one'").get(),
      `${label}: the session stays`,
    );
  };
  const refusals = [];
  for (const [label, args] of [
    ["no arguments", []],
    ["no address", ["block"]],
    ["an extra argument", ["block", "player@example.test", "now"]],
    ["an unknown action", ["delete", "player@example.test"]],
    ["an address without a valid form", ["block", "player-example.test"]],
    ["an unknown address", ["block", "nobody@example.test"]],
    ["an unknown address to unblock", ["unblock", "nobody@example.test"]],
  ]) {
    const run = await runBlockCommand(args, path);
    assert.notEqual(run.code, 0, label);
    assert.ok(run.output.trim() !== "", `${label}: the refusal is reported`);
    unchanged(label);
    refusals.push(run);
  }

  const directory = join(path, "..");
  const absent = join(directory, "absent.sqlite");
  for (const [label, databasePath] of [
    ["an unset database path", undefined],
    ["an empty database path", ""],
    ["an in-memory database", ":memory:"],
    ["a database file that does not exist", absent],
  ]) {
    const run = await runBlockCommand(
      ["block", "player@example.test"],
      databasePath,
    );
    assert.notEqual(run.code, 0, label);
    assert.ok(run.output.trim() !== "", `${label}: the refusal is reported`);
    refusals.push(run);
  }
  await assert.rejects(access(absent), "the command creates no database");
  unchanged("a refused database");

  // Another connection holds the write lock past the command's busy timeout.
  raw.exec("BEGIN IMMEDIATE");
  let busy;
  try {
    busy = await runBlockCommand(["block", "player@example.test"], path);
  } finally {
    raw.exec("ROLLBACK");
  }
  assert.notEqual(busy.code, 0, busy.output);
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

// D-398 and the operator command of the spec's section 5.
test("the previous-save command grants and revokes by address beside an open connection and says which outcome it reached", async (t) => {
  // The fixture's open AccountDatabase stands in for the running server's.
  const { path, database } = await fixture(t);
  const runCommand = (args) => runOwnerCommand(previousSaveCommand, args, path);
  const flagOf = () =>
    database.findAccountByEmail("player@example.test").previousSaveAllowed;

  // D-99: the address is normalized as login normalizes it.
  const granted = await runCommand(["grant", " Player@EXAMPLE.test "]);
  assert.equal(granted.code, 0, granted.output);
  assert.equal(flagOf(), true);

  const again = await runCommand(["grant", "player@example.test"]);
  assert.equal(again.code, 0, again.output);
  assert.equal(flagOf(), true);

  const revoked = await runCommand(["revoke", "player@example.test"]);
  assert.equal(revoked.code, 0, revoked.output);
  assert.equal(flagOf(), false);

  const notGranted = await runCommand(["revoke", "player@example.test"]);
  assert.equal(notGranted.code, 0, notGranted.output);
  assert.equal(flagOf(), false);

  const unknown = await runCommand(["grant", "nobody@example.test"]);
  assert.equal(unknown.code, 4, unknown.output);
  assert.match(
    unknown.stderr,
    /No account has the address nobody@example\.test\. Nothing changed\./,
  );

  const outcomes = [granted, again, revoked, notGranted].map((run) =>
    run.stdout.trim(),
  );
  for (const outcome of outcomes) {
    assert.ok(outcome !== "", "each outcome is reported");
    assert.match(outcome, /player@example\.test/, "it names the account");
  }
  assert.equal(new Set(outcomes).size, 4, "each outcome reads differently");
  assert.match(outcomes[1], /nothing changed/i, "a repeated grant says so");
  assert.match(outcomes[3], /nothing changed/i, "a repeated revoke says so");
  for (const run of [granted, again, revoked, notGranted, unknown])
    assert.doesNotMatch(run.output, /encoded-hash/);
});

// D-252, business events of the guidelines' list. Faults: a line for a command
// that changed nothing, no line for a change, the wrong account's number, the
// address in the line.
test("the previous-save command writes one event with the account's number for a change, none for no change, and no address", async (t) => {
  const { path, database, account } = await fixture(t);
  database.createAccount("other@example.test", "hash");
  const eventsOf = (run) =>
    run.stdout
      .split(/\r?\n/)
      .filter((line) => line.startsWith("{"))
      .map((line) => {
        assert.doesNotMatch(line, /example\.test/);
        return JSON.parse(line);
      });
  const run = (action, address = "player@example.test") =>
    runOwnerCommand(previousSaveCommand, [action, address], path);

  assert.deepEqual(eventsOf(await run("grant")), [
    { event: "account-previous-save-granted", accountId: account.id },
  ]);
  assert.deepEqual(eventsOf(await run("grant")), []);
  assert.deepEqual(eventsOf(await run("revoke")), [
    { event: "account-previous-save-revoked", accountId: account.id },
  ]);
  assert.deepEqual(eventsOf(await run("revoke")), []);
  assert.deepEqual(eventsOf(await run("grant", "nobody@example.test")), []);
});

// D-252, D-354. Faults: the failure's reason left out, so the owner only hears
// to try again; SQLite's message or the file's path in the output; a sentence
// dropped, so the owner no longer reads what happened.
test("a database failure of the previous-save command adds the error's kind and code and nothing of its text", async (t) => {
  const { path } = await fixture(t);
  const garbage = join(path, "..", "garbage-secret-name.sqlite");
  await writeFile(garbage, "this is not an SQLite database at all, padding");

  const run = await runOwnerCommand(
    previousSaveCommand,
    ["grant", "player@example.test"],
    garbage,
  );

  assert.equal(run.code, 1, run.output);
  assert.match(run.stderr, /Nothing changed; run the command again\./);
  const [line] = run.stderr.split(/\r?\n/).filter((text) => text[0] === "{");
  const { failure, kind, code, errcode, place } = JSON.parse(line);
  assert.deepEqual(
    { failure, kind, code, errcode, place },
    {
      failure: "account-previous-save",
      kind: "Error",
      code: "ERR_SQLITE_ERROR",
      errcode: 26,
      place: "account-previous-save.change",
    },
    "SQLite's number 26 says the file is no database",
  );
  assert.doesNotMatch(run.output, /garbage-secret-name|not a database/i);
});

// D-253. Faults: no handler of its own, so the default print writes the message
// and the stack; a handler that goes on after what no code handled.
test("what no code of the previous-save command handled ends it with one line of its kind, code and place, and none of its text", async (t) => {
  const { path } = await fixture(t);
  const run = await runOwnerCommand(
    previousSaveCommand,
    ["grant", "player@example.test"],
    path,
    "uncaught",
  );
  assert.equal(run.code, 1, run.output);
  assert.deepEqual(JSON.parse(run.stderr.trim()), {
    failure: "uncaught",
    kind: "RangeError",
    code: "ERR_STANDIN_FAULT",
    place: "account-previous-save",
  });
  assert.doesNotMatch(run.stderr, /quoting/);
});

// Faults: a change made by a refused run, a refusal with another exit code than
// the block command's, a database created by a run that found no file.
test("the previous-save command changes nothing on a usage error, an unknown address or an unusable database, and creates none", async (t) => {
  const { path, database, store, raw, account } = await fixture(t);
  await call(store, "set", "one", data(account.id, liveExpiry()));
  const unchanged = (label) => {
    const stored = database.findAccountById(account.id);
    assert.equal(stored.previousSaveAllowed, false, label);
    assert.equal(stored.blocked, false, label);
    assert.ok(
      raw.prepare("SELECT id FROM sessions WHERE id = 'one'").get(),
      `${label}: the session stays`,
    );
  };
  const refusals = [];
  for (const [label, args, exitCode] of [
    ["no arguments", [], 2],
    ["no address", ["grant"], 2],
    ["an extra argument", ["grant", "player@example.test", "now"], 2],
    ["an unknown action", ["block", "player@example.test"], 2],
    ["an address without a valid form", ["grant", "player-example.test"], 2],
    ["an unknown address", ["grant", "nobody@example.test"], 4],
    ["an unknown address to revoke", ["revoke", "nobody@example.test"], 4],
  ]) {
    const run = await runOwnerCommand(previousSaveCommand, args, path);
    assert.equal(run.code, exitCode, label);
    assert.ok(run.output.trim() !== "", `${label}: the refusal is reported`);
    unchanged(label);
    refusals.push(run);
  }

  const directory = join(path, "..");
  const absent = join(directory, "absent.sqlite");
  for (const [label, databasePath] of [
    ["an unset database path", undefined],
    ["an empty database path", ""],
    ["an in-memory database", ":memory:"],
    ["a database file that does not exist", absent],
  ]) {
    const run = await runOwnerCommand(
      previousSaveCommand,
      ["grant", "player@example.test"],
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
    busy = await runOwnerCommand(
      previousSaveCommand,
      ["grant", "player@example.test"],
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

// Faults: the command ends a session or stops a link, or a privilege change
// lifts a block or brings a link back.
test("the previous-save command leaves a block, a session and an emailed link as they were", async (t) => {
  // The command prunes by the real clock, so the server's connection uses it
  // too and its links are recorded now, not at the fixture's fixed time.
  const { path, database, store, raw, account } = await fixture(t, {
    now: () => Date.now(),
  });
  await call(store, "set", "one", data(account.id, liveExpiry()));
  database.issueLink(confirmationLink(account.id, "confirm"), limits);
  const sessionCount = () =>
    raw
      .prepare("SELECT count(*) AS n FROM sessions WHERE account_id = ?")
      .get(account.id).n;
  const runCommand = (args) => runOwnerCommand(previousSaveCommand, args, path);

  const granted = await runCommand(["grant", "player@example.test"]);
  assert.equal(granted.code, 0, granted.output);
  assert.equal(
    database.findAccountById(account.id).previousSaveAllowed,
    true,
    "a grant sets the privilege",
  );
  assert.equal(sessionCount(), 1, "a grant ends no session");
  assert.equal(storedLink(raw, "confirm").spent, 0, "a grant stops no link");

  const blocked = await runBlockCommand(["block", "player@example.test"], path);
  assert.equal(blocked.code, 0, blocked.output);
  assert.equal(sessionCount(), 0);
  assert.equal(storedLink(raw, "confirm").spent, 1);

  const revoked = await runCommand(["revoke", "player@example.test"]);
  assert.equal(revoked.code, 0, revoked.output);
  const stored = database.findAccountById(account.id);
  assert.equal(stored.previousSaveAllowed, false);
  assert.equal(stored.blocked, true, "a revoke leaves the block");
  assert.equal(sessionCount(), 0, "a revoke brings no session back");
  assert.equal(
    storedLink(raw, "confirm").spent,
    1,
    "a revoke brings no link back",
  );
});
