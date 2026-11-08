import type { AccountDatabase } from "./database.js";
import { ReasonedFailure, writeEvent, writeFailure } from "./log-line.js";

export type SessionEnd =
  | { outcome: "ended"; accountId: string; email: string }
  | { outcome: "unknown" }
  | { outcome: "failed" };

// Ends one browser's session of an account, named by the session's identifier.
// A session that is missing or expired is "unknown" and leaves no log line. A
// database failure is written once, with the account's number once it is known
// (the session identifier is a credential and no line carries it), and
// answered as "failed"; nothing is thrown.
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
    if (!account) throw new ReasonedFailure("ACCOUNT_MISSING");
    database.destroySession(sessionId);
    writeEvent("signed-out", { accountId });
    return { outcome: "ended", accountId, email: account.email };
  } catch (error) {
    writeFailure(
      "logout",
      "session-end.endSession",
      error,
      accountId === undefined ? {} : { accountId },
    );
    return { outcome: "failed" };
  }
}
