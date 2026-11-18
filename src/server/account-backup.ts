import { createReadStream, statSync } from "node:fs";
import { mkdtemp, rm } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { pipeline } from "node:stream/promises";
import {
  AccountDatabase,
  isDatabaseBusy,
  isNotAccountDatabase,
} from "./database.js";
import { installLastResort, writeFailure } from "./log-line.js";

// The backup script, or the operator, writes one consistent backup of the account
// database to standard output from a shell in the loop2 container:
//
//   node dist/server/account-backup.js --to-standard-output
//
// The output holds every address and password hash, so the command does
// nothing without that one fixed word and prints nothing to standard output
// then (D-231). It opens the existing database of LOOP2_DATABASE_PATH beside
// the running server, as account-block.ts does (D-112), and refuses a file in
// which the server has set up no tables as it refuses a missing file, writing
// nothing in it; it backs the database up into a
// private temporary directory, closes it, streams the finished file out and
// removes the directory, also after a failure and after a reader that goes
// away; a signal that kills the process leaves it. Standard output carries the
// backup's bytes and nothing else; messages go to standard error and hold of a
// database error its kind and code alone, and no path or address.

const usage = "Usage: node dist/server/account-backup.js --to-standard-output";
const fixedWord = "--to-standard-output";

// Exit codes: 0 only after the last byte of the backup has left and its
// temporary directory is removed. Exit 1 also ends a whole backup whose
// directory cannot be removed: the copy is left in the container, and the
// command says so once, as its own failure (D-354). Exit 3 stands for a path
// that names no account database, a missing file or a file the server never
// set up, each with a sentence of its own; exit 1 for any other failure of the
// database. The backup script treats every non-zero code as a failure and
// reads no number.
const exitDatabaseFailure = 1;
const exitUsage = 2;
const exitNoDatabase = 3;
const exitOutputFailure = 4;
const noFileSentence =
  "LOOP2_DATABASE_PATH names no existing account database file. Nothing was written.";
const noTablesSentence =
  "LOOP2_DATABASE_PATH names a file that exists but holds no account database set up by the server. Nothing was written.";

installLastResort("account-backup");

// Opening a missing file would create an empty database instead of finding it.
function existingFile(path: string | undefined): string | null {
  if (!path?.trim() || path === ":memory:") return null;
  try {
    return statSync(path).isFile() ? path : null;
  } catch {
    return null;
  }
}

async function run(): Promise<number> {
  const args = process.argv.slice(2);
  if (args.length !== 1 || args[0] !== fixedWord) {
    console.error(`${usage}\nNothing was written.`);
    return exitUsage;
  }
  const path = existingFile(process.env.LOOP2_DATABASE_PATH);
  if (path === null) {
    console.error(noFileSentence);
    return exitNoDatabase;
  }

  let directory: string | undefined;
  let whole = false;
  let outputFailed = false;
  let removal: { error: unknown } | undefined;
  try {
    try {
      // mkdtemp creates the directory readable by its owner alone.
      directory = await mkdtemp(join(tmpdir(), "loop2-backup-"));
      const backupPath = join(directory, "backup.sqlite");
      const database = new AccountDatabase(path, { existingOnly: true });
      try {
        await database.backupTo(backupPath);
      } finally {
        database.close();
      }
      // Streamed, not read whole: the container has about 100 MiB of room.
      // The read stream holds one chunk at a time; a reader that goes away
      // makes the write fail and ends the pipeline.
      try {
        await pipeline(createReadStream(backupPath), process.stdout, {
          end: false,
        });
        // Exit 0 only once the stream has taken the last byte.
        await new Promise<void>((resolve, reject) => {
          process.stdout.write("", (error) =>
            error ? reject(error) : resolve(),
          );
        });
        whole = true;
      } catch (error) {
        writeFailure("backup-output", "account-backup.run", error);
        console.error("The backup could not be written out. It is not whole.");
        outputFailed = true;
      }
    } finally {
      if (directory !== undefined) {
        try {
          await rm(directory, { recursive: true, force: true });
        } catch (error) {
          removal = { error };
        }
      }
    }
    // A removal that failed before the whole backup left is the command's
    // failure, reported as a database failure below.
    if (removal !== undefined && !whole) throw removal.error;
  } catch (error) {
    if (removal === undefined && isNotAccountDatabase(error)) {
      console.error(noTablesSentence);
      return exitNoDatabase;
    }
    const cause = removal !== undefined ? removal.error : error;
    writeFailure("backup-database", "account-backup.run", cause);
    // A second run helps only where the database was busy past the wait.
    console.error(
      isDatabaseBusy(cause)
        ? "The account database could not be opened or backed up while it was busy for longer than the wait allows. No backup was made; run the command again."
        : "The account database could not be opened or backed up. No backup was made.",
    );
    return exitDatabaseFailure;
  }
  // The whole backup has left and only its temporary directory stayed: one
  // failure, its JSON line and the sentence after it (D-354).
  if (removal !== undefined) {
    writeFailure("backup-cleanup", "account-backup.run", removal.error);
    console.error(
      "The backup went out whole to standard output; only the removal of its temporary copy failed, so that copy was left in the container.",
    );
    return exitDatabaseFailure;
  }
  return outputFailed ? exitOutputFailure : 0;
}

process.exit(await run());
