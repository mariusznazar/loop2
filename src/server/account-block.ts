import { statSync } from "node:fs";
import { normalizeEmail } from "./account-policy.js";
import {
  AccountDatabase,
  type BlockOutcome,
  type UnblockOutcome,
} from "./database.js";

// The owner blocks or unblocks one player account, named by its email address,
// from a shell in the loop2 container:
//
//   node dist/server/account-block.js block <email>
//   node dist/server/account-block.js unblock <email>
//
// It opens the existing account database of LOOP2_DATABASE_PATH beside the
// running server, with the server's own opening rules, makes one change in one
// transaction and closes it. It reads no other setting and prints no password
// hash, session identifier or database error.

const usage =
  "Usage: node dist/server/account-block.js block|unblock <email address>";

// Exit codes: 0 the account is in the requested state; otherwise nothing changed.
const exitDatabaseFailure = 1;
const exitUsage = 2;
const exitNoDatabase = 3;
const exitNoAccount = 4;

function stop(code: number, message: string): never {
  console.error(message);
  process.exit(code);
}

const [action, address, ...rest] = process.argv.slice(2);
if ((action !== "block" && action !== "unblock") || address === undefined)
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

let outcome: BlockOutcome | UnblockOutcome;
try {
  const database = new AccountDatabase(path);
  try {
    outcome =
      action === "block"
        ? database.blockAccount(email)
        : database.unblockAccount(email);
  } finally {
    database.close();
  }
} catch {
  stop(
    exitDatabaseFailure,
    "The account database could not be opened or changed, for example while it was busy for longer than the wait allows. Nothing changed; run the command again.",
  );
}

const reports: Record<Exclude<typeof outcome, "unknown">, string> = {
  blocked: `Blocked ${email}: it cannot sign in, and its sessions in every browser have ended.`,
  "already-blocked": `${email} was already blocked; it has no session left.`,
  unblocked: `Unblocked ${email}: it can sign in again; its earlier sessions stay ended.`,
  "not-blocked": `${email} was not blocked; nothing changed.`,
};
if (outcome === "unknown")
  stop(exitNoAccount, `No account has the address ${email}. Nothing changed.`);
console.log(reports[outcome]);
