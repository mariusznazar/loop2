import type { AccountDatabase } from "./database.js";
import { ReasonedFailure, writeEvent, writeFailure } from "./log-line.js";

export type SessionEnd =
  | { outcome: "ended"; accountId: string; email: string }
  | { outcome: "unknown" }
  | { outcome: "failed" };

// Ends one session of an account, named by the session's identifier. The
// identifier is a credential, so a log line never carries it; the failure
// names the account of the session once the read has found it (D-252).
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
    if (!account) throw new ReasonedFailure("ACCOUNT_MISSING");
    email = account.email;
    database.destroySession(sessionId);
  } catch (error) {
    writeFailure(
      "session-end",
      place,
      error,
      accountId === undefined ? {} : { accountId },
    );
    return { outcome: "failed" };
  }
  writeEvent("signed-out", { accountId });
  return { outcome: "ended", accountId, email };
}
