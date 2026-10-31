import { createReadStream, statSync } from "node:fs";
import { mkdtemp, rm } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { pipeline } from "node:stream/promises";
import { AccountDatabase } from "./database.js";

// The backup script, or the owner, writes one consistent backup of the account
// database to standard output from a shell in the loop2 container:
//
//   node dist/server/account-backup.js --to-standard-output
//
// The output holds every address and password hash, so the command does
// nothing without that one fixed word and prints nothing to standard output
// then (D-217). It opens the existing database of LOOP2_DATABASE_PATH beside
// the running server, as account-block.ts does (D-112), backs it up into a
// private temporary directory, closes it, streams the finished file out and
// removes the directory, also after a failure and after a reader that goes
// away; a signal that kills the process leaves it. Standard output carries the
// backup's bytes and nothing else; messages go to standard error and hold no
// database error, path or address.

const usage = "Usage: node dist/server/account-backup.js --to-standard-output";
const fixedWord = "--to-standard-output";

// Exit codes: 0 only after the last byte of the backup has left; otherwise the
// output is not a backup.
const exitDatabaseFailure = 1;
const exitUsage = 2;
const exitNoDatabase = 3;
const exitOutputFailure = 4;

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
    console.error(
      "LOOP2_DATABASE_PATH names no existing account database file. Nothing was written.",
    );
    return exitNoDatabase;
  }

  let directory: string | undefined;
  try {
    try {
      // mkdtemp creates the directory readable by its owner alone.
      directory = await mkdtemp(join(tmpdir(), "loop2-backup-"));
      const backupPath = join(directory, "backup.sqlite");
      const database = new AccountDatabase(path);
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
      } catch {
        console.error("The backup could not be written out. It is not whole.");
        return exitOutputFailure;
      }
    } finally {
      if (directory !== undefined)
        await rm(directory, { recursive: true, force: true });
    }
  } catch {
    console.error(
      "The account database could not be opened or backed up, for example while it was busy for longer than the wait allows. No backup was made; run the command again.",
    );
    return exitDatabaseFailure;
  }
  return 0;
}

process.exit(await run());
