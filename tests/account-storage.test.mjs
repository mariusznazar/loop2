import assert from "node:assert/strict";
import { mkdtemp, rm } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { test } from "node:test";
import { DatabaseSync } from "node:sqlite";
import { Worker } from "node:worker_threads";
import { spawn } from "node:child_process";
import session from "express-session";
import { AccountDatabase } from "../dist/server/database.js";
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
  raw.exec("PRAGMA user_version = 2");
  assert.throws(() => new AccountDatabase(path), /Unsupported.*schema/);
  assert.equal(raw.prepare("PRAGMA user_version").get().user_version, 2);
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
