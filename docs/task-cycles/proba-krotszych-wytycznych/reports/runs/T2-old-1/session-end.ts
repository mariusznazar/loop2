import type { AccountDatabase } from "./database.js";
import { ReasonedFailure, writeEvent, writeFailure } from "./log-line.js";
import type { LineFields } from "./log-line.js";

export type SessionEnd =
  | { outcome: "ended"; accountId: string; email: string }
  | { outcome: "unknown" }
  | { outcome: "failed" };

// Ends one browser's session of an account, named by the session's identifier,
// for the owner's support page. A session that is not there or has expired is
// `unknown` and leaves no line. A database failure at any step is written as a
// failure line and answered as `failed`; it never throws. The identifier of the
// session is a secret and stays out of the line (D-252), so the line names the
// sign-out by the account's number once the session has been read, and by the
// step that failed.
export function endSession(
  database: AccountDatabase,
  sessionId: string,
): SessionEnd {
  let place = "session-end.readSession";
  let fields: LineFields = {};
  try {
    const session = database.readSession(sessionId);
    if (!session) return { outcome: "unknown" };
    fields = { accountId: session.accountId };

    place = "session-end.findAccount";
    const account = database.findAccountById(session.accountId);
    if (!account) throw new ReasonedFailure("UNKNOWN_ACCOUNT");

    place = "session-end.destroySession";
    database.destroySession(sessionId);

    writeEvent("signed-out", fields);
    return { outcome: "ended", accountId: account.id, email: account.email };
  } catch (error) {
    writeFailure("logout", place, error, fields);
    return { outcome: "failed" };
  }
}
