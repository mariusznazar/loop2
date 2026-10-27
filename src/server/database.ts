import { randomUUID } from "node:crypto";
import { DatabaseSync } from "node:sqlite";

export interface Account {
  id: string;
  email: string;
  passwordHash: string;
  createdAt: number;
}

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
      this.connection.exec(
        "PRAGMA foreign_keys = ON; PRAGMA journal_mode = WAL; PRAGMA synchronous = FULL;",
      );
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

  private initializeSchema(): void {
    this.connection.exec("BEGIN IMMEDIATE");
    try {
      const version = this.connection
        .prepare("PRAGMA user_version")
        .get()?.user_version;
      if (version === 0) {
        this.connection.exec(`
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
          PRAGMA user_version = 1;
        `);
      } else if (version !== 1) {
        throw new Error("Unsupported account database schema");
      }
      this.connection.exec("COMMIT");
    } catch (error) {
      this.connection.exec("ROLLBACK");
      throw error;
    }
  }

  createAccount(email: string, passwordHash: string): Account | null {
    const account = {
      id: randomUUID(),
      email,
      passwordHash,
      createdAt: this.now(),
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
      typeof row.created_at !== "number"
    ) {
      throw new Error("Invalid stored account");
    }
    return {
      id: row.id,
      email: row.email,
      passwordHash: row.password_hash,
      createdAt: row.created_at,
    };
  }

  saveSession(id: string, session: StoredSession): void {
    if (
      !Number.isSafeInteger(session.expiresAt) ||
      session.expiresAt <= this.now()
    ) {
      throw new Error("Invalid session expiry");
    }
    const result = this.connection
      .prepare(
        `
      INSERT INTO sessions (id, account_id, data, expires_at) VALUES (?, ?, ?, ?)
      ON CONFLICT(id) DO UPDATE SET data = excluded.data,
        expires_at = MAX(sessions.expires_at, excluded.expires_at)
      WHERE sessions.account_id = excluded.account_id AND sessions.expires_at > ?
    `,
      )
      .run(id, session.accountId, session.data, session.expiresAt, this.now());
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
