import type { AccountDatabase } from "./database.js";
import { ReasonedFailure, writeEvent, writeFailure } from "./log-line.js";

// The owner ends one browser's session of an account, named by the session's
// identifier. The identifier is a secret (D-252), so no log line carries it; a
// failure names the account once the session has told which it is.
export type SessionEnd =
  | { outcome: "ended"; accountId: string; email: string }
  | { outcome: "unknown" }
  | { outcome: "failed" };

export function endSession(
  database: AccountDatabase,
  sessionId: string,
): SessionEnd {
  const place = "session-end.endSession";
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
