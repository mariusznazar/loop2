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
  // The address given at registration has been confirmed through an emailed
  // link (D-156); it never changes (D-159).
  emailConfirmed: boolean;
}

export type BlockOutcome = "blocked" | "already-blocked" | "unknown";
export type UnblockOutcome = "unblocked" | "not-blocked" | "unknown";

export type LinkPurpose = "email-confirmation" | "password-reset";
export type IssueOutcome = "issued" | "limited" | "blocked";
export type ConfirmOutcome = "confirmed" | "invalid";

export interface LinkRequest {
  accountId: string;
  purpose: LinkPurpose;
  tokenDigest: string;
  lifetimeMs: number;
}

export interface MessageLimits {
  windowMs: number;
  total: number;
  perAccount: number;
}

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
  `
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
  `,
];

const currentVersion = schemaSteps.length;

// An emailed link stays recorded until it has expired and is this old, because
// its row also counts an account message against D-105's hourly limits (D-112,
// D-161); no window of those limits may be longer.
const linkRecordAgeMs = 3_600_000;

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
      this.pruneExpiredLinks();
    } catch (error) {
      this.connection.close();
      throw error;
    }
    this.cleanupTimer = setInterval(() => {
      try {
        this.pruneExpiredSessions();
        this.pruneExpiredLinks();
      } catch (error) {
        const failure =
          error instanceof Error
            ? error
            : new Error("Account database cleanup failed");
        if (options.onCleanupError) options.onCleanupError(failure);
        else console.error("Account database cleanup failed");
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
      emailConfirmed: false,
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
      (row.blocked !== 0 && row.blocked !== 1) ||
      (row.email_confirmed_at !== null &&
        !Number.isSafeInteger(row.email_confirmed_at))
    ) {
      throw new Error("Invalid stored account");
    }
    return {
      id: row.id,
      email: row.email,
      passwordHash: row.password_hash,
      createdAt: row.created_at,
      blocked: row.blocked === 1,
      emailConfirmed: row.email_confirmed_at !== null,
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

  // Marks the account of a normalized address blocked, deletes every session
  // of it and stops every emailed link of it in the same transaction; already
  // blocked, it does so again.
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
      this.connection
        .prepare("UPDATE emailed_links SET spent = 1 WHERE account_id = ?")
        .run(account.id);
      return account.blocked ? "already-blocked" : "blocked";
    });
  }

  // Clears the blocked state only; the sessions deleted and the links stopped
  // by the block stay so.
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

  // Records a link before its message is handed to the mail service. Its row
  // counts against the limits whatever the sending's outcome (D-161), so the
  // count and the insert share one transaction. The block is read there too:
  // a block committed by the owner's command either comes first, and nothing
  // is recorded or sent, or comes after and stops the recorded link. Recording
  // stops every earlier link of the account and purpose at once, so a sending
  // that then fails leaves no earlier link working (D-155).
  issueLink(request: LinkRequest, limits: MessageLimits): IssueOutcome {
    const lifetime = boundedInteger(request.lifetimeMs, 2 ** 31 - 1);
    const window = boundedInteger(limits.windowMs, linkRecordAgeMs);
    const total = boundedInteger(limits.total, 2 ** 31 - 1);
    const perAccount = boundedInteger(limits.perAccount, 2 ** 31 - 1);
    return this.transaction(() => {
      const now = this.now();
      const account = this.connection
        .prepare("SELECT blocked FROM accounts WHERE id = ?")
        .get(request.accountId);
      if (!account) throw new Error("Unknown account");
      if (account.blocked !== 0) return "blocked";
      const counted = this.connection
        .prepare(
          `
      SELECT count(*) AS total, count(CASE WHEN account_id = ? THEN 1 END) AS own
      FROM emailed_links WHERE created_at > ?
    `,
        )
        .get(request.accountId, now - window);
      if (
        typeof counted?.total !== "number" ||
        typeof counted.own !== "number"
      ) {
        throw new Error("Invalid message count");
      }
      if (counted.total >= total || counted.own >= perAccount) return "limited";
      this.connection
        .prepare(
          `
      UPDATE emailed_links SET spent = 1
      WHERE account_id = ? AND purpose = ? AND spent = 0
    `,
        )
        .run(request.accountId, request.purpose);
      this.connection
        .prepare(
          `
      INSERT INTO emailed_links
        (token_digest, account_id, purpose, created_at, expires_at, spent)
      VALUES (?, ?, ?, ?, ?, 0)
    `,
        )
        .run(
          request.tokenDigest,
          request.accountId,
          request.purpose,
          now,
          now + lifetime,
        );
      return "issued";
    });
  }

  // A link confirms while it is unspent, before its expiry (equal to now is
  // expired, as for sessions) and while its account is not blocked, the block
  // read in the same transaction. Every refusal changes nothing. A confirmation
  // stops every confirmation link of the account, the one used included.
  confirmEmailAddress(tokenDigest: string): ConfirmOutcome {
    return this.transaction(() => {
      const now = this.now();
      const link = this.connection
        .prepare(
          `
      SELECT emailed_links.account_id AS account_id FROM emailed_links
      JOIN accounts ON accounts.id = emailed_links.account_id
      WHERE token_digest = ? AND purpose = 'email-confirmation'
        AND spent = 0 AND expires_at > ? AND accounts.blocked = 0
    `,
        )
        .get(tokenDigest, now);
      if (!link) return "invalid";
      if (typeof link.account_id !== "string") {
        throw new Error("Invalid stored link");
      }
      this.connection
        .prepare(
          `
      UPDATE accounts SET email_confirmed_at = ?
      WHERE id = ? AND email_confirmed_at IS NULL
    `,
        )
        .run(now, link.account_id);
      this.connection
        .prepare(
          `
      UPDATE emailed_links SET spent = 1
      WHERE account_id = ? AND purpose = 'email-confirmation' AND spent = 0
    `,
        )
        .run(link.account_id);
      return "confirmed";
    });
  }

  // Removes, in a bounded batch, links that have expired and no longer count
  // against the hourly limits.
  pruneExpiredLinks(): void {
    const now = this.now();
    this.connection
      .prepare(
        `
      DELETE FROM emailed_links WHERE token_digest IN (
        SELECT token_digest FROM emailed_links
        WHERE created_at <= ? AND expires_at <= ?
        ORDER BY created_at LIMIT 1000
      )
    `,
      )
      .run(now - linkRecordAgeMs, now);
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
