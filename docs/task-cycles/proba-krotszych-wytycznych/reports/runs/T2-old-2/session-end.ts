import type { AccountDatabase } from "./database.js";
import {
  ReasonedFailure,
  writeEvent,
  writeFailure,
  type LineFields,
} from "./log-line.js";

export type SessionEnd =
  | { outcome: "ended"; accountId: string; email: string }
  | { outcome: "unknown" }
  | { outcome: "failed" };

// Ends one browser's session of an account, named by the session's identifier.
// The identifier is a secret, so no log line carries it; a failure after the
// session was read names the session's account instead, which tells the owner
// which sign-out it was. A failure of the read itself has no account to name.
export function endSession(
  database: AccountDatabase,
  sessionId: string,
): SessionEnd {
  const place = "session-end.endSession";
  let fields: LineFields = {};
  try {
    const session = database.readSession(sessionId);
    if (!session) return { outcome: "unknown" };
    fields = { accountId: session.accountId };
    const account = database.findAccountById(session.accountId);
    // A session whose account is gone is a broken record, not a missing session.
    if (!account) throw new ReasonedFailure("ACCOUNT_MISSING");
    database.destroySession(sessionId);
    writeEvent("signed-out", { accountId: account.id });
    return { outcome: "ended", accountId: account.id, email: account.email };
  } catch (error) {
    writeFailure("session-end", place, error, fields);
    return { outcome: "failed" };
  }
}
