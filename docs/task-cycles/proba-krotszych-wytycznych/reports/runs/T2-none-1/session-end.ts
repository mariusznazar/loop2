import type { AccountDatabase } from "./database.js";
import { ReasonedFailure, writeEvent, writeFailure } from "./log-line.js";

export type SessionEnd =
  | { outcome: "ended"; accountId: string; email: string }
  | { outcome: "unknown" }
  | { outcome: "failed" };

// Ends one browser's session, named by its identifier, for the owner's support
// page. The identifier is the session's credential, so no line of the log
// quotes it; a failure names the step in `place` and, once the session has
// been read, the account in `accountId`. The address is not written either: it
// points to a person (D-252).
export function endSession(
  database: AccountDatabase,
  sessionId: string,
): SessionEnd {
  let accountId: string | undefined;
  let place = "session-end.read-session";
  try {
    const session = database.readSession(sessionId);
    if (!session) return { outcome: "unknown" };
    accountId = session.accountId;

    place = "session-end.find-account";
    const account = database.findAccountById(accountId);
    // A session of no account cannot be shown on the support page, and it is
    // left in place for the owner to look at.
    if (!account) throw new ReasonedFailure("ACCOUNT_MISSING");

    place = "session-end.destroy-session";
    database.destroySession(sessionId);

    writeEvent("signed-out", { accountId });
    return { outcome: "ended", accountId, email: account.email };
  } catch (error) {
    writeFailure("session-end", place, error, accountId ? { accountId } : {});
    return { outcome: "failed" };
  }
}
