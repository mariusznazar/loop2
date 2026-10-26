import session from "express-session";
import { AccountDatabase } from "./database.js";

declare module "express-session" {
  interface SessionData {
    accountId?: string;
  }
}

type Completion = (error?: Error) => void;

function object(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function validateCookie(cookie: session.Cookie): void {
  try {
    cookie.serialize("sid", "validation");
    // Exercise the library's renewal without changing the stored cookie.
    const renewed = Object.assign(new session.Cookie(), cookie);
    renewed.maxAge = cookie.originalMaxAge;
    renewed.serialize("sid", "validation");
  } catch {
    throw new Error("Invalid stored session cookie");
  }
}

function decode(data: string): session.SessionData {
  let value: unknown;
  try {
    value = JSON.parse(data);
  } catch {
    throw new Error("Invalid stored session data");
  }
  if (
    !object(value) ||
    typeof value.accountId !== "string" ||
    !value.accountId ||
    Object.keys(value).some((key) => key !== "accountId" && key !== "cookie") ||
    !object(value.cookie)
  ) {
    throw new Error("Invalid stored session data");
  }
  const cookie = value.cookie;
  const keys = [
    "expires",
    "originalMaxAge",
    "secure",
    "httpOnly",
    "path",
    "sameSite",
    "domain",
    "partitioned",
    "priority",
  ];
  if (
    Object.keys(cookie).some((key) => !keys.includes(key)) ||
    typeof cookie.expires !== "string" ||
    !Number.isFinite(Date.parse(cookie.expires)) ||
    typeof cookie.originalMaxAge !== "number" ||
    !Number.isSafeInteger(cookie.originalMaxAge) ||
    cookie.originalMaxAge <= 0 ||
    typeof cookie.path !== "string" ||
    typeof cookie.httpOnly !== "boolean" ||
    (cookie.secure !== undefined && typeof cookie.secure !== "boolean") ||
    (cookie.domain !== undefined && typeof cookie.domain !== "string") ||
    (cookie.partitioned !== undefined &&
      typeof cookie.partitioned !== "boolean") ||
    (cookie.priority !== undefined &&
      cookie.priority !== "low" &&
      cookie.priority !== "medium" &&
      cookie.priority !== "high") ||
    (cookie.sameSite !== undefined &&
      typeof cookie.sameSite !== "boolean" &&
      cookie.sameSite !== "lax" &&
      cookie.sameSite !== "strict" &&
      cookie.sameSite !== "none")
  ) {
    throw new Error("Invalid stored session cookie");
  }
  const restored = Object.assign(new session.Cookie(), {
    expires: new Date(cookie.expires),
    originalMaxAge: cookie.originalMaxAge,
    path: cookie.path,
    httpOnly: cookie.httpOnly,
    secure: cookie.secure,
    domain: cookie.domain,
    partitioned: cookie.partitioned,
    priority: cookie.priority,
    sameSite: cookie.sameSite,
  });
  validateCookie(restored);
  return { accountId: value.accountId, cookie: restored };
}

export class SqliteSessionStore extends session.Store {
  constructor(private readonly database: AccountDatabase) {
    super();
  }

  override get(
    id: string,
    callback: (error: Error | null, value?: session.SessionData | null) => void,
  ): void {
    let value: session.SessionData | null = null;
    try {
      const row = this.database.readSession(id);
      if (row) {
        value = decode(row.data);
        if (value.accountId !== row.accountId)
          throw new Error("Stored session identity mismatch");
        const maxAge = value.cookie.originalMaxAge;
        value.cookie.expires = new Date(row.expiresAt);
        value.cookie.originalMaxAge = maxAge;
        validateCookie(value.cookie);
      }
    } catch (error) {
      callback(this.failure(error));
      return;
    }
    callback(null, value);
  }

  override set(
    id: string,
    value: session.SessionData,
    callback?: Completion,
  ): void {
    this.complete(() => {
      const data = JSON.stringify(value);
      const decoded = decode(data);
      this.database.saveSession(id, {
        accountId: decoded.accountId!,
        data,
        expiresAt: decoded.cookie.expires!.getTime(),
      });
    }, callback);
  }

  override touch(
    id: string,
    value: session.SessionData,
    callback?: Completion,
  ): void {
    this.complete(() => {
      const decoded = decode(JSON.stringify(value));
      this.database.renewSession(
        id,
        decoded.accountId!,
        decoded.cookie.expires!.getTime(),
      );
    }, callback);
  }

  override destroy(id: string, callback?: Completion): void {
    this.complete(() => this.database.destroySession(id), callback);
  }

  close(): void {
    this.database.close();
  }

  private complete(operation: () => void, callback?: Completion): void {
    let error: Error | undefined;
    try {
      operation();
    } catch (failure) {
      error = this.failure(failure);
    }
    if (callback) callback(error);
    else if (error) this.emit("error", error);
  }

  private failure(value: unknown): Error {
    return value instanceof Error ? value : new Error("Session storage failed");
  }
}
