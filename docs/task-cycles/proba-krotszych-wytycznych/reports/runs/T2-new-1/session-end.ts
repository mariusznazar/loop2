import type { AccountDatabase } from "./database.js";
import { ReasonedFailure, writeEvent, writeFailure } from "./log-line.js";

export type SessionEnd =
  | { outcome: "ended"; accountId: string; email: string }
  | { outcome: "unknown" }
  | { outcome: "failed" };

// Ends one browser's session of an account, named by the session's identifier,
// for the owner's support page. A database failure is written to the log and
// returned as an outcome, never thrown. The session's identifier is a secret
// and stays out of the log line (D-252); the line names the account once the
// session has told which it is, and the step that failed in its place.
export function endSession(
  database: AccountDatabase,
  sessionId: string,
): SessionEnd {
  let accountId: string | undefined;
  let email: string;
  let place = "session-end.read-session";
  try {
    const session = database.readSession(sessionId);
    if (!session) return { outcome: "unknown" };
    accountId = session.accountId;
    place = "session-end.find-account";
    const account = database.findAccountById(accountId);
    if (!account) throw new ReasonedFailure("UNKNOWN_ACCOUNT");
    email = account.email;
    place = "session-end.destroy-session";
    database.destroySession(sessionId);
  } catch (error) {
    writeFailure("logout", place, error, accountId ? { accountId } : {});
    return { outcome: "failed" };
  }
  writeEvent("signed-out", { accountId });
  return { outcome: "ended", accountId, email };
}
