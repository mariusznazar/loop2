import type { AccountDatabase } from "./database.js";
import { ReasonedFailure, writeEvent, writeFailure } from "./log-line.js";

export type SessionEnd =
  | { outcome: "ended"; accountId: string; email: string }
  | { outcome: "unknown" }
  | { outcome: "failed" };

const place = "session-end.endSession";

// Ends one browser's session of an account, named by the session's identifier,
// for the owner's support page. The database failing at any step is written to
// the log once, here, and returned as `failed`; it is never thrown. The line
// names the account once the session has told which it is; the session
// identifier is a credential and never reaches the log, so a failure of the
// lookup itself names no account.
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
    if (!account) throw new ReasonedFailure("UNKNOWN_ACCOUNT");
    email = account.email;
    database.destroySession(sessionId);
  } catch (error) {
    writeFailure("logout", place, error, accountId ? { accountId } : {});
    return { outcome: "failed" };
  }
  writeEvent("signed-out", { accountId });
  return { outcome: "ended", accountId, email };
}
