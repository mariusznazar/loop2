import { AccountDatabase } from "./database.js";
import { ReasonedFailure, writeEvent, writeFailure } from "./log-line.js";

export type SessionEnd =
  | { outcome: "ended"; accountId: string; email: string }
  | { outcome: "unknown" }
  | { outcome: "failed" };

// Ends one browser's session of an account on the owner's order. The session
// identifier is a credential, so no line holds it; a failure names the step
// that failed by its place and, once the session has named it, the account.
export function endSession(
  database: AccountDatabase,
  sessionId: string,
): SessionEnd {
  let accountId: string | undefined;
  let place = "session-end.read";
  try {
    const session = database.readSession(sessionId);
    if (!session) return { outcome: "unknown" };
    accountId = session.accountId;

    place = "session-end.account";
    const account = database.findAccountById(accountId);
    if (!account) throw new ReasonedFailure("ACCOUNT_MISSING");

    place = "session-end.destroy";
    database.destroySession(sessionId);

    writeEvent("signed-out", { accountId });
    return { outcome: "ended", accountId, email: account.email };
  } catch (error) {
    writeFailure("logout", place, error, accountId ? { accountId } : {});
    return { outcome: "failed" };
  }
}
