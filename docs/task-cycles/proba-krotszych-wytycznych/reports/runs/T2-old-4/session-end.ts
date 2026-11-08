import type { AccountDatabase } from "./database.js";
import { ReasonedFailure, writeEvent, writeFailure } from "./log-line.js";

export type SessionEnd =
  | { outcome: "ended"; accountId: string; email: string }
  | { outcome: "unknown" }
  | { outcome: "failed" };

// Ends one browser's session of an account on the owner's request. The session
// identifier is a secret (D-252), so no log line carries it; a failed line names
// the account once the session has told which one it is, and the step that
// failed as its place.
export function endSession(
  database: AccountDatabase,
  sessionId: string,
): SessionEnd {
  let accountId: string | undefined;
  let place = "session-end.readSession";
  try {
    const session = database.readSession(sessionId);
    if (session === null) return { outcome: "unknown" };
    accountId = session.accountId;
    place = "session-end.findAccount";
    const account = database.findAccountById(accountId);
    if (account === null) throw new ReasonedFailure("ACCOUNT_MISSING");
    place = "session-end.destroySession";
    database.destroySession(sessionId);
    writeEvent("signed-out", { accountId });
    return { outcome: "ended", accountId, email: account.email };
  } catch (error) {
    writeFailure(
      "logout",
      place,
      error,
      accountId === undefined ? {} : { accountId },
    );
    return { outcome: "failed" };
  }
}
