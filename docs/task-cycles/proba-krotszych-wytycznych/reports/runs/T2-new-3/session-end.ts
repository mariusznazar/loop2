import type { AccountDatabase } from "./database.js";
import { ReasonedFailure, writeEvent, writeFailure } from "./log-line.js";

export type SessionEnd =
  | { outcome: "ended"; accountId: string; email: string }
  | { outcome: "unknown" }
  | { outcome: "failed" };

// The owner ends one browser's session of an account, named by the session's
// identifier. A missing or expired session leaves no log line. A database
// failure is written as one failure line and returned, never thrown. The
// session identifier is a credential, so no line carries it: the line names the
// account once the session has been read, and before that the database error's
// kind and code alone.
export function endSession(
  database: AccountDatabase,
  sessionId: string,
): SessionEnd {
  let accountId: string | undefined;
  try {
    const session = database.readSession(sessionId);
    if (!session) return { outcome: "unknown" };
    accountId = session.accountId;
    const account = database.findAccountById(accountId);
    if (!account) throw new ReasonedFailure("UNKNOWN_ACCOUNT");
    database.destroySession(sessionId);
    writeEvent("signed-out", { accountId });
    return { outcome: "ended", accountId, email: account.email };
  } catch (error) {
    writeFailure(
      "session-end",
      "session-end.endSession",
      error,
      accountId === undefined ? {} : { accountId },
    );
    return { outcome: "failed" };
  }
}
