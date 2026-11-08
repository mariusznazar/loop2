// Ends one browser's session of an account on the owner's request, named by
// the session's identifier. The identifier is a secret, so no log line carries
// it (D-252); a failure names the step that failed and, once the session has
// been read, the account.

import type { AccountDatabase } from "./database.js";
import { ReasonedFailure, writeEvent, writeFailure } from "./log-line.js";

export type SessionEnd =
  | { outcome: "ended"; accountId: string; email: string }
  | { outcome: "unknown" }
  | { outcome: "failed" };

const place = "session-end.endSession";

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
    return { outcome: "ended", accountId: account.id, email: account.email };
  } catch (error) {
    writeFailure("sign-out", place, error, accountId ? { accountId } : {});
    return { outcome: "failed" };
  }
}
