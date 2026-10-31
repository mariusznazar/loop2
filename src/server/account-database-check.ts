import { mkdtemp, rm } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { AccountDatabase } from "./database.js";

// The image build checks the Node.js release it is built on (D-229,
// account-save-sqlite-upgrade): a RUN step of the Dockerfile's final stage
// runs
//
//   node dist/server/account-database-check.js
//
// It makes a temporary database through AccountDatabase, writes an account and
// a saved game state, reads them back, makes a backup of it by the method of
// the backup command, opens the backup, reads the same values, removes its
// files, prints the release it checked and exits 0. Any difference or error
// exits 1 and the build fails. It reads no setting and touches no database of
// the server; the data are made up here.

const exitCheckFailed = 1;

const email = "release-check@example.test";
const passwordHash = "release-check-hash";
const game = '{"release":"check"}';
const gameVersion = 1;

function expect(condition: boolean, what: string): void {
  if (!condition) throw new Error(`Difference found: ${what}`);
}

// Reads the account and its saved game state, which must be the ones written.
function expectContents(database: AccountDatabase, where: string): void {
  const account = database.findAccountByEmail(email);
  expect(account !== null, `${where} holds no account`);
  expect(
    account?.passwordHash === passwordHash,
    `${where} holds another password hash`,
  );
  const saved = database.readSavedGame(account?.id ?? "");
  expect(
    saved !== null &&
      saved.version === gameVersion &&
      saved.revision === 1 &&
      saved.game === game,
    `${where} holds another saved game state`,
  );
}

async function run(): Promise<void> {
  const directory = await mkdtemp(join(tmpdir(), "loop2-release-check-"));
  try {
    const original = new AccountDatabase(join(directory, "original.sqlite"));
    let steps: number;
    try {
      const account = original.createAccount(email, passwordHash);
      expect(account !== null, "the account was not created");
      const saved = original.writeSavedGame(account?.id ?? "", {
        version: gameVersion,
        basedOn: 0,
        game,
      });
      expect(saved.outcome === "saved", "the saved game state was refused");
      expectContents(original, "the database");
      steps = await original.backupTo(join(directory, "backup.sqlite"));
    } finally {
      original.close();
    }
    // D-236: the command relies on a backup taken in one step.
    expect(steps === 1, `the backup took ${steps} steps, not one`);
    const copy = new AccountDatabase(join(directory, "backup.sqlite"));
    try {
      expectContents(copy, "the backup");
    } finally {
      copy.close();
    }
  } finally {
    await rm(directory, { recursive: true, force: true });
  }
}

try {
  await run();
} catch (error) {
  console.error(
    `Node.js ${process.version}: the account database check failed. ${error instanceof Error ? error.message : String(error)}`,
  );
  process.exit(exitCheckFailed);
}
console.log(
  `Node.js ${process.version}: account database read, write and backup checked.`,
);
process.exit(0);
