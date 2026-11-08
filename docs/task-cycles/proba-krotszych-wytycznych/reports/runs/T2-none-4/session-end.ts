import { AccountDatabase } from "./database.js";
import { ReasonedFailure, writeEvent, writeFailure } from "./log-line.js";

export type SessionEnd =
  | { outcome: "ended"; accountId: string; email: string }
  | { outcome: "unknown" }
  | { outcome: "failed" };

// Ends one browser's session of an account, named by the session's identifier.
// The identifier is the session cookie's value, so it never reaches a log
// line; a failure line names the step and, once the session has been read,
// the account (D-252). The account's address is returned to the caller and
// is not logged.
export function endSession(
  database: AccountDatabase,
  sessionId: string,
): SessionEnd {
  let accountId: string | undefined;
  let email: string;
  try {
    const session = database.readSession(sessionId);
    if (!session) return { outcome: "unknown" };
    accountId = session.accountId;
    const account = database.findAccountById(accountId);
    if (!account) throw new ReasonedFailure("ACCOUNT_MISSING");
    email = account.email;
    database.destroySession(sessionId);
  } catch (error) {
    writeFailure(
      "session-end",
      "session-end.endSession",
      error,
      accountId === undefined ? {} : { accountId },
    );
    return { outcome: "failed" };
  }
  writeEvent("signed-out", { accountId });
  return { outcome: "ended", accountId, email };
}
