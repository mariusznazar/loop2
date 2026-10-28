import { randomUUID } from "node:crypto";
import { DatabaseSync } from "node:sqlite";

export interface Account {
  id: string;
  email: string;
  passwordHash: string;
  createdAt: number;
  // Cut off by the operator from signing in and playing until unblocked; not
  // the 15-minute email lock of the account policy.
  blocked: boolean;
}

export type BlockOutcome = "blocked" | "already-blocked" | "unknown";
export type UnblockOutcome = "unblocked" | "not-blocked" | "unknown";

// The schema's history, one step per version: step N turns version N - 1 into
// version N. A new database runs every step, an existing one the steps after
// its version. A step that has reached the test server is never edited, since
// databases at its version exist there; a later schema adds one step at the end.
const schemaSteps = [
  `
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
  `,
  `
    ALTER TABLE accounts
      ADD COLUMN blocked INTEGER NOT NULL DEFAULT 0 CHECK (blocked IN (0, 1));
  `,
];

const currentVersion = schemaSteps.length;

export interface StoredSession {
  accountId: string;
  data: string;
  expiresAt: number;
}

interface DatabaseOptions {
  now?: () => number;
  cleanupIntervalMs?: number;
  busyTimeoutMs?: number;
  onCleanupError?: (error: Error) => void;
}

function boundedInteger(value: number, maximum: number): number {
  if (!Number.isSafeInteger(value) || value < 1 || value > maximum) {
    throw new Error("Invalid database timing option");
  }
  return value;
}

const SQLITE_BUSY = 5;
const RETRY_PAUSE = new Int32Array(new SharedArrayBuffer(4));

function isBusy(error: unknown): boolean {
  return (
    typeof error === "object" &&
    error !== null &&
    "errcode" in error &&
    error.errcode === SQLITE_BUSY
  );
}

export class AccountDatabase {
  private readonly connection: DatabaseSync;
  private readonly now: () => number;
  private readonly cleanupTimer: ReturnType<typeof setInterval>;
  private closed = false;

  constructor(path: string, options: DatabaseOptions = {}) {
    const interval = boundedInteger(
      options.cleanupIntervalMs ?? 60_000,
      2 ** 31 - 1,
    );
    const timeout = boundedInteger(options.busyTimeoutMs ?? 1000, 5000);
    this.now = options.now ?? Date.now;
    this.connection = new DatabaseSync(path, { timeout });
    try {
      this.connection.exec("PRAGMA foreign_keys = ON");
      this.enableWriteAheadLog(timeout);
      this.connection.exec("PRAGMA synchronous = FULL");
      this.initializeSchema();
      this.pruneExpiredSessions();
    } catch (error) {
      this.connection.close();
      throw error;
    }
    this.cleanupTimer = setInterval(() => {
      try {
        this.pruneExpiredSessions();
      } catch (error) {
        const failure =
          error instanceof Error ? error : new Error("Session cleanup failed");
        if (options.onCleanupError) options.onCleanupError(failure);
        else console.error("Session cleanup failed");
      }
    }, interval);
    this.cleanupTimer.unref();
  }

  // SQLite refuses a change of journal mode at once, without its busy
  // handler, while another process holds a write lock on a new database, so
  // two processes opening one fresh database would fail regardless of the
  // busy timeout. The change is retried while the busy timeout lasts, each
  // attempt itself bounded by it, as D-112's bounded busy timeout asks.
  private enableWriteAheadLog(timeoutMs: number): void {
    const deadline = performance.now() + timeoutMs;
    for (;;) {
      try {
        this.connection.exec("PRAGMA journal_mode = WAL");
        return;
      } catch (error) {
        if (!isBusy(error) || performance.now() >= deadline) throw error;
        Atomics.wait(RETRY_PAUSE, 0, 0, 10);
      }
    }
  }

  // One write transaction: it commits whole or rolls back whole.
  private transaction<Result>(work: () => Result): Result {
    this.connection.exec("BEGIN IMMEDIATE");
    let result: Result;
    try {
      result = work();
      this.connection.exec("COMMIT");
    } catch (error) {
      this.connection.exec("ROLLBACK");
      throw error;
    }
    return result;
  }

  // Version 0 is a new database. The version is read inside the transaction
  // that migrates, so two processes opening one database cannot both migrate it.
  private initializeSchema(): void {
    this.transaction(() => {
      const version = this.connection
        .prepare("PRAGMA user_version")
        .get()?.user_version;
      if (
        typeof version !== "number" ||
        !Number.isSafeInteger(version) ||
        version < 0 ||
        version > currentVersion
      ) {
        throw new Error("Unsupported account database schema");
      }
      if (version === currentVersion) return;
      for (const step of schemaSteps.slice(version)) this.connection.exec(step);
      this.connection.exec(`PRAGMA user_version = ${currentVersion}`);
    });
  }

  createAccount(email: string, passwordHash: string): Account | null {
    const account = {
      id: randomUUID(),
      email,
      passwordHash,
      createdAt: this.now(),
      blocked: false,
    };
    const result = this.connection
      .prepare(
        `
      INSERT INTO accounts (id, email, password_hash, created_at) VALUES (?, ?, ?, ?)
      ON CONFLICT(email) DO NOTHING
    `,
      )
      .run(account.id, email, passwordHash, account.createdAt);
    return result.changes === 0 ? null : account;
  }

  findAccountByEmail(email: string): Account | null {
    return this.readAccount("SELECT * FROM accounts WHERE email = ?", email);
  }

  findAccountById(id: string): Account | null {
    return this.readAccount("SELECT * FROM accounts WHERE id = ?", id);
  }

  private readAccount(sql: string, value: string): Account | null {
    const row = this.connection.prepare(sql).get(value);
    if (!row) return null;
    if (
      typeof row.id !== "string" ||
      typeof row.email !== "string" ||
      typeof row.password_hash !== "string" ||
      typeof row.created_at !== "number" ||
      (row.blocked !== 0 && row.blocked !== 1)
    ) {
      throw new Error("Invalid stored account");
    }
    return {
      id: row.id,
      email: row.email,
      passwordHash: row.password_hash,
      createdAt: row.created_at,
      blocked: row.blocked === 1,
    };
  }

  saveSession(id: string, session: StoredSession): void {
    if (
      !Number.isSafeInteger(session.expiresAt) ||
      session.expiresAt <= this.now()
    ) {
      throw new Error("Invalid session expiry");
    }
    // The account's state is read by the statement that writes, so a block
    // committed by another connection either precedes it and stores nothing or
    // follows it and deletes what it stored. An unknown account still fails on
    // the foreign key; the WHERE clause also keeps the upsert unambiguous.
    const result = this.connection
      .prepare(
        `
      INSERT INTO sessions (id, account_id, data, expires_at)
      SELECT ?, ?, ?, ?
      WHERE NOT EXISTS (SELECT 1 FROM accounts WHERE id = ? AND blocked = 1)
      ON CONFLICT(id) DO UPDATE SET data = excluded.data,
        expires_at = MAX(sessions.expires_at, excluded.expires_at)
      WHERE sessions.account_id = excluded.account_id AND sessions.expires_at > ?
    `,
      )
      .run(
        id,
        session.accountId,
        session.data,
        session.expiresAt,
        session.accountId,
        this.now(),
      );
    if (result.changes === 0) throw new Error("Session cannot be replaced");
  }

  readSession(id: string): StoredSession | null {
    const row = this.connection
      .prepare(
        "SELECT account_id, data, expires_at FROM sessions WHERE id = ? AND expires_at > ?",
      )
      .get(id, this.now());
    if (!row) return null;
    if (
      typeof row.account_id !== "string" ||
      typeof row.data !== "string" ||
      typeof row.expires_at !== "number" ||
      !Number.isSafeInteger(row.expires_at)
    ) {
      throw new Error("Invalid stored session");
    }
    return {
      accountId: row.account_id,
      data: row.data,
      expiresAt: row.expires_at,
    };
  }

  renewSession(id: string, accountId: string, expiresAt: number): void {
    if (!Number.isSafeInteger(expiresAt) || expiresAt <= this.now()) {
      throw new Error("Invalid session expiry");
    }
    this.connection
      .prepare(
        `
      UPDATE sessions SET expires_at = MAX(expires_at, ?)
      WHERE id = ? AND account_id = ? AND expires_at > ?
    `,
      )
      .run(expiresAt, id, accountId, this.now());
  }

  // Marks the account of a normalized address blocked and deletes every
  // session of it in the same transaction; already blocked, it deletes again.
  blockAccount(email: string): BlockOutcome {
    return this.transaction(() => {
      const account = this.findAccountByEmail(email);
      if (!account) return "unknown";
      this.connection
        .prepare("UPDATE accounts SET blocked = 1 WHERE id = ?")
        .run(account.id);
      this.connection
        .prepare("DELETE FROM sessions WHERE account_id = ?")
        .run(account.id);
      return account.blocked ? "already-blocked" : "blocked";
    });
  }

  // Clears the blocked state only; the sessions deleted by the block stay gone.
  unblockAccount(email: string): UnblockOutcome {
    return this.transaction(() => {
      const account = this.findAccountByEmail(email);
      if (!account) return "unknown";
      if (!account.blocked) return "not-blocked";
      this.connection
        .prepare("UPDATE accounts SET blocked = 0 WHERE id = ?")
        .run(account.id);
      return "unblocked";
    });
  }

  destroySession(id: string): void {
    this.connection.prepare("DELETE FROM sessions WHERE id = ?").run(id);
  }

  pruneExpiredSessions(): void {
    this.connection
      .prepare(
        `
      DELETE FROM sessions WHERE id IN (
        SELECT id FROM sessions WHERE expires_at <= ? ORDER BY expires_at LIMIT 1000
      )
    `,
      )
      .run(this.now());
  }

  close(): void {
    if (this.closed) return;
    clearInterval(this.cleanupTimer);
    this.connection.close();
    this.closed = true;
  }
}
