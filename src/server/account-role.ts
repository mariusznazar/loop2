import { statSync } from "node:fs";
import { normalizeEmail } from "./account-policy.js";
import { AccountDatabase, type RoleOutcome } from "./database.js";
import { installLastResort, writeEvent, writeFailure } from "./log-line.js";

// The owner gives or takes the owner role of one account, named by its email
// address, from a shell in the loop2 container (D-410):
//
//   node dist/server/account-role.js owner <email>
//   node dist/server/account-role.js player <email>
//
// It opens the existing account database of LOOP2_DATABASE_PATH beside the
// running server, with the server's own opening rules, makes one change in one
// transaction and closes it. It ends no session and stops no emailed link. It
// reads no other setting and prints no password hash or session identifier, and
// of a database error its kind and code alone.

const usage =
  "Usage: node dist/server/account-role.js owner|player <email address>";

// Exit codes: 0 the account has the requested role; otherwise nothing changed.
const exitDatabaseFailure = 1;
const exitUsage = 2;
const exitNoDatabase = 3;
const exitNoAccount = 4;

installLastResort("account-role");

function stop(code: number, message: string): never {
  console.error(message);
  process.exit(code);
}

const [role, address, ...rest] = process.argv.slice(2);
if ((role !== "owner" && role !== "player") || address === undefined)
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
if (path === null)
  stop(
    exitNoDatabase,
    "LOOP2_DATABASE_PATH names no existing account database file. Nothing changed.",
  );

let result: RoleOutcome;
try {
  const database = new AccountDatabase(path);
  try {
    result = database.setAccountRole(email, role);
  } finally {
    database.close();
  }
} catch (error) {
  writeFailure("account-role", "account-role.change", error);
  stop(
    exitDatabaseFailure,
    "The account database could not be opened or changed, for example while it was busy for longer than the wait allows. Nothing changed; run the command again.",
  );
}

if (result.outcome === "unknown")
  stop(exitNoAccount, `No account has the address ${email}. Nothing changed.`);
const reports: Record<typeof result.outcome, string> = {
  "made-owner": `Made ${email} an owner: it can use the owner panel from its next request; its sessions and emailed links stay as they were.`,
  "already-owner": `${email} was already an owner; nothing changed.`,
  "made-player": `Made ${email} a player: it no longer has the owner panel from its next request; its sessions and emailed links stay as they were.`,
  "already-player": `${email} was already a player; nothing changed.`,
};
if (result.outcome === "made-owner")
  writeEvent("account-owner-granted", { accountId: result.accountId });
if (result.outcome === "made-player")
  writeEvent("account-owner-revoked", { accountId: result.accountId });
console.log(reports[result.outcome]);
