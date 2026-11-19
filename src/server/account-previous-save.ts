import { statSync } from "node:fs";
import { normalizeEmail } from "./account-policy.js";
import {
  AccountDatabase,
  isDatabaseBusy,
  isNotAccountDatabase,
  type PreviousSavePrivilegeOutcome,
} from "./database.js";
import { installLastResort, writeEvent, writeFailure } from "./log-line.js";

// The operator grants or revokes the previous-save privilege of one player
// account, named by its email address, from a shell in the loop2 container:
//
//   node dist/server/account-previous-save.js grant <email>
//   node dist/server/account-previous-save.js revoke <email>
//
// It opens the existing account database of LOOP2_DATABASE_PATH beside the
// running server, with the server's own opening rules, makes one change in one
// transaction and closes it. A file in which the server has set up no tables,
// whether empty, no SQLite database or one with no schema version, is no
// account database: the command refuses it as a missing file and writes
// nothing in it (D-112). It ends no session and stops no emailed link. It
// reads no other setting and prints no password hash or session identifier, and
// of a database error its kind and code alone.

const usage =
  "Usage: node dist/server/account-previous-save.js grant|revoke <email address>";

// Exit codes: 0 the account is in the requested state; otherwise nothing changed.
// 3 stands for a path that names no account database, a missing file or a file
// the server never set up, each with a sentence of its own; 1 for any other
// failure of the database.
const exitDatabaseFailure = 1;
const exitUsage = 2;
const exitNoDatabase = 3;
const exitNoAccount = 4;
const noFileSentence =
  "LOOP2_DATABASE_PATH names no existing account database file. Nothing changed.";
const noTablesSentence =
  "LOOP2_DATABASE_PATH names a file that exists but holds no account database set up by the server. Nothing changed.";

installLastResort("account-previous-save");

function stop(code: number, message: string): never {
  console.error(message);
  process.exit(code);
}

const [action, address, ...rest] = process.argv.slice(2);
if ((action !== "grant" && action !== "revoke") || address === undefined)
  stop(exitUsage, `${usage}\nNothing changed.`);
if (rest.length > 0) stop(exitUsage, `${usage}\nNothing changed.`);

// D-99: the address names the account as it does at login.
const email = normalizeEmail(address);
if (!email)
  stop(
    exitUsage,
    "The address needs a single @ with text on both sides of it. Nothing changed.",
  );

// Opening a missing file would create an empty database instead of finding it.
function existingFile(path: string | undefined): string | null {
  if (!path?.trim() || path === ":memory:") return null;
  try {
    return statSync(path).isFile() ? path : null;
  } catch {
    return null;
  }
}

const path = existingFile(process.env.LOOP2_DATABASE_PATH);
if (path === null) stop(exitNoDatabase, noFileSentence);

let result: PreviousSavePrivilegeOutcome;
try {
  const database = new AccountDatabase(path, { existingOnly: true });
  try {
    result = database.setPreviousSavePrivilege(email, action === "grant");
  } finally {
    database.close();
  }
} catch (error) {
  if (isNotAccountDatabase(error)) stop(exitNoDatabase, noTablesSentence);
  writeFailure("account-previous-save", "account-previous-save.change", error);
  // A second run helps only where the database was busy past the wait.
  stop(
    exitDatabaseFailure,
    isDatabaseBusy(error)
      ? "The account database could not be opened or changed while it was busy for longer than the wait allows. Nothing changed; run the command again."
      : "The account database could not be opened or changed. Nothing changed.",
  );
}

if (result.outcome === "unknown")
  stop(exitNoAccount, `No account has the address ${email}. Nothing changed.`);
const reports: Record<typeof result.outcome, string> = {
  granted: `Granted the previous-save privilege to ${email}: it can pull the programs of its previous save and start the game from zero.`,
  "already-granted": `${email} already held the previous-save privilege; nothing changed.`,
  revoked: `Revoked the previous-save privilege of ${email}: it can no longer pull its previous save or start the game from zero; the previous save stays in place.`,
  "not-granted": `${email} did not hold the previous-save privilege; nothing changed.`,
};
if (result.outcome === "granted")
  writeEvent("account-previous-save-granted", { accountId: result.accountId });
if (result.outcome === "revoked")
  writeEvent("account-previous-save-revoked", { accountId: result.accountId });
console.log(reports[result.outcome]);
