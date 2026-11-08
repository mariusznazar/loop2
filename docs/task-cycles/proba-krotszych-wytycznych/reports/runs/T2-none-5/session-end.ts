import type { Account, AccountDatabase } from "./database.js";
import { ReasonedFailure, writeEvent, writeFailure } from "./log-line.js";

export type SessionEnd =
  | { outcome: "ended"; accountId: string; email: string }
  | { outcome: "unknown" }
  | { outcome: "failed" };

// Ends one browser's session, named by its identifier, for the owner's support
// page. The identifier is the session cookie's value, so it never reaches a log
// line (D-252 allows no secret in a log); a failure line names the account
// instead, once the session has told whose it is.
export function endSession(
  database: AccountDatabase,
  sessionId: string,
): SessionEnd {
  let accountId: string | undefined;
  let account: Account | null;
  try {
    const session = database.readSession(sessionId);
    if (!session) return { outcome: "unknown" };
    accountId = session.accountId;
    account = database.findAccountById(accountId);
    if (!account) throw new ReasonedFailure("ACCOUNT_MISSING");
    database.destroySession(sessionId);
  } catch (error) {
    writeFailure(
      "session-end",
      "session-end.endSession",
      error,
      accountId ? { accountId } : {},
    );
    return { outcome: "failed" };
  }
  writeEvent("signed-out", { accountId: account.id });
  return { outcome: "ended", accountId: account.id, email: account.email };
}
