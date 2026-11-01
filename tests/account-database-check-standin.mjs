import { registerHooks } from "node:module";

// A test-owned stand-in for the `backup` of `node:sqlite`, for the release
// check's tests (account-save-sqlite-upgrade). One file with two roles:
//
//   node --import tests/account-database-check-standin.mjs dist/server/account-database-check.js
//
// registers a resolve hook that gives the built `dist/server/database.js`
// this file's stand-in in place of `node:sqlite`, so the built check runs
// unchanged. The stand-in re-exports the real `DatabaseSync` and makes the real
// backup, then spoils its result as LOOP2_CHECK_STANDIN says. It writes
// "standin-reached" to standard error on every call, so that a test can tell
// a stand-in that was used from one that was not.

const role = "?standin";
const sqlite = process.getBuiltinModule("node:sqlite");

export const DatabaseSync = sqlite.DatabaseSync;

export async function backup(source, path, options) {
  const mode = process.env.LOOP2_CHECK_STANDIN;
  console.error("standin-reached");
  if (mode === "refused-rate") {
    throw Object.assign(new RangeError("The rate is out of range"), {
      code: "ERR_OUT_OF_RANGE",
    });
  }
  await sqlite.backup(source, path, options);
  if (mode === "two-steps") {
    options?.progress?.({ totalPages: 2, remainingPages: 1 });
  } else if (mode === "empty") {
    const { truncateSync } = process.getBuiltinModule("node:fs");
    truncateSync(path, 0);
  } else if (mode === "other-hash") {
    const copy = new sqlite.DatabaseSync(path);
    copy.exec("UPDATE accounts SET password_hash = 'another-hash'");
    copy.close();
  } else if (mode === "other-game") {
    const copy = new sqlite.DatabaseSync(path);
    copy.exec('UPDATE saved_games SET game = \'{"release":"other"}\'');
    copy.close();
  }
}

if (!import.meta.url.endsWith(role)) {
  const standIn = import.meta.url + role;
  registerHooks({
    resolve(specifier, context, nextResolve) {
      if (
        specifier === "node:sqlite" &&
        context.parentURL?.endsWith("/dist/server/database.js")
      )
        return { url: standIn, shortCircuit: true };
      return nextResolve(specifier, context);
    },
  });
}
