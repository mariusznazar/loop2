import type { AccountDatabase } from "./database.js";
import { ReasonedFailure, writeEvent, writeFailure } from "./log-line.js";

export type SessionEnd =
  | { outcome: "ended"; accountId: string; email: string }
  | { outcome: "unknown" }
  | { outcome: "failed" };

// Ends one browser's session, named by its identifier, for the owner's support
// page. A session that does not exist or has expired is "unknown" and leaves no
// line. A database failure is written once, with the account's id once the
// session has named it, and is returned as "failed"; the session identifier
// stays out of the line, since it is a secret.
export function endSession(
  database: AccountDatabase,
  sessionId: string,
): SessionEnd {
  const place = "session-end.endSession";
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
    writeFailure("sign-out", place, error, accountId ? { accountId } : {});
    return { outcome: "failed" };
  }
}
