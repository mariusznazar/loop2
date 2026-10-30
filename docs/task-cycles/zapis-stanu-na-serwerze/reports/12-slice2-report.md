# Report — Slice 2 executor, task `zapis-stanu-na-serwerze`

- **Status:** done with concerns (the concerns are outside this slice's files; see "Problems observed")
- **Slice base:** `b36292e` · **Commit:** `bbf6ad2` feat: :sparkles: add schema version 4 with the saved game states and their read and guarded write
- **Process pin:** `git -C .the-way rev-parse HEAD` = `a8dfe8ac62885e88bc8f463e93ab16b621d48e92`, the same as the gitlink.
- **Nothing deployed, nothing done on any server.** Schema step 4 ran only on temporary SQLite files under the system temp directory, created and removed by the tests and by the own-work check.

## Files changed

| File | Added | Removed |
|---|---|---|
| `src/server/database.ts` | 96 | 0 |
| `tests/account-storage.test.mjs` | 419 | 13 |

### `src/server/database.ts`

- Schema step 4 added at the end of `schemaSteps`; steps 1–3 untouched (the diff adds lines only):
  ```sql
  CREATE TABLE saved_games (
    account_id TEXT PRIMARY KEY NOT NULL
      REFERENCES accounts(id) ON DELETE CASCADE,
    version INTEGER NOT NULL CHECK (version >= 1),
    revision INTEGER NOT NULL CHECK (revision >= 1),
    game TEXT NOT NULL CHECK (length(CAST(game AS BLOB)) <= 65536)
  ) STRICT;
  ```
  `currentVersion` becomes 4 because it is `schemaSteps.length`.
- New exported types `SavedGame { version, revision, game }`, `SaveRequest { version, basedOn, game }`, and `SaveOutcome = { outcome: "saved"; revision } | { outcome: "blocked" | "outdated" | "conflict" }`.
- `readSavedGame(accountId): SavedGame | null` — reads only the row of that account; throws `Invalid stored saved game` on a row it cannot type.
- `writeSavedGame(accountId, save): SaveOutcome` — throws `Invalid saved game` unless `version` is a safe integer of at least 1, `basedOn` a safe integer of at least 0 and `game` a string. Then, in one `BEGIN IMMEDIATE` transaction: unknown account → throws `Unknown account`; blocked → `blocked`; stored version greater than `save.version` → `outdated`; stored revision (0 with no row) other than `basedOn` → `conflict`; otherwise upsert with revision = stored + 1 and return `{ outcome: "saved", revision }`. Every refusal writes nothing. `blockAccount` and `unblockAccount` are unchanged, so they keep the row.

### `tests/account-storage.test.mjs`

New cases (each marked with its invariant):
- `account-database-schema`, `account-schema-lifecycle` — "a version-3 database opens as version 4 with every row and value kept and no saved game state". The version-3 database is written out in the test: the version-2 database already in the file plus step 3 copied from loop2 `589f4d7` `src/server/database.ts:62-75`, with rows for a confirmed address (account a), a blocked account (c), sessions, one working link and one used link. The case also checks a save for a moved account, a refused save for the moved blocked account, and that both last through a reopen.
- `account-database-schema` — "a failing step 4 leaves a version-3 database at version 3 with its rows and tables unchanged" (an existing `saved_games` table makes step 4 fail).
- `account-schema-lifecycle` — "a failing step 4 also takes back step 3 on a version-2 database, which stays at version 2 unchanged". I added this one beyond the plan's list (see Choices).
- `account-save-sqlite-store` — the outcomes of the write: no row counts as revision 0, first save 1, then 2 and 3; a stale basis gives conflict; a lower version gives outdated on both a current and a stale basis; a higher version on the current basis replaces the row; a second account has its own row and its own revisions; every refusal leaves the row unchanged.
- `account-save-sqlite-store` — a block committed through a second `AccountDatabase` connection (standing in for the owner's command) before a save makes the save `blocked`, before both the version check and the revision check; the row survives block and unblock; after unblock a save based on the kept revision gets revision 2; a blocked account with no row gets none.
- `account-save-sqlite-store` — the byte limit: 32 768 × "ż" (65 536 UTF-8 bytes, 32 768 characters) is stored; one more byte throws `CHECK constraint` and changes nothing; a raw INSERT and a raw UPDATE past the operation are refused too.
- `account-save-sqlite-store` — the row goes with its account (`ON DELETE CASCADE`), another account's row stays; a save for an unknown account throws; six unusable inputs throw `Invalid saved game` and store nothing.

Changed existing cases (the cause is on the requirement side: D-112 now says "up to the current version 4"):
- "schema reopen preserves accounts and sessions and rejects a newer version without rewriting it": the unknown newer version moves from 4 to 5, and its comment now names version 4 as the saved game states (spec decision 4; D-112).
- "a version-1 database opens as version 3 …" and "a version-2 database opens as version 3 …" now say "version 4", and their four `user_version` assertions expect 4 instead of 3. The v1 comment says the database moves through steps 2, 3 and 4. No other assertion was weakened or removed.

## Checks run

| Command | Exit | Result |
|---|---|---|
| `npm test -- tests/account-storage.test.mjs` (the new v3→v4 case written first, before any code) | 1 | expected failure: `actual: 3, expected: 4` at the case's first assertion on `user_version` |
| `npm test -- tests/account-storage.test.mjs` (after the code) | 0 | 51 pass, 0 fail |
| `npm test -- tests/startup.test.mjs` | 0 | 15 pass, 0 fail |
| `npm test -- tests/invariants/test_account_server_typecheck.py` | 0 | 8 tests OK |
| `npm test -- tests/quality/test_quality_invariants.py` (first run) | 1 | `test_prettier_source_format`: `src/server/database.ts` — one line over 80 columns |
| `node node_modules/prettier/bin/prettier.cjs --write --no-config --no-editorconfig src/server/database.ts tests/account-storage.test.mjs` | 0 | broke one `if … return` across two lines in `database.ts`; the test file did not change |
| Final focused run on the committed code, the four commands above in order | 0, 0, 0, 0 | 51 pass · 15 pass · 8 OK · 5 OK |

Each new invariant test seen failing once. I made each change below to `src/server/database.ts` in the worktree for one run, ran `npm test -- tests/account-storage.test.mjs`, then restored the file byte for byte (script `C:\Users\Mariusz\AppData\Local\Temp\claude\C--Storage-repos-loop2\57822f85-5994-4aa0-ab30-2463555a5fde\scratchpad\mutate.py`):

| Change | Exit | Failing case(s) |
|---|---|---|
| M1 the check counts characters: `length(game) <= 65536` | 1 | byte-limit case |
| M2 the revision compared before the version | 1 | outcomes case |
| M3 no row accepts any basis | 1 | outcomes case |
| M4 the block not read | 1 | block-through-another-connection case; v3→v4 case |
| M5 each step committed in its own transaction | 1 | "a failing step 4 also takes back step 3 …" (first run also two cookie cases, see Problems) |
| M6 step 4 as `CREATE TABLE IF NOT EXISTS` | 1 | both failing-step-4 cases |
| M7 no `ON DELETE CASCADE` | 1 | goes-with-its-account case |
| M8 no input check in `writeSavedGame` | 1 | goes-with-its-account case |
| M9 revision not raised (`Math.max(stored, 1)`) | 1 | outcomes case; block case |
| M10 a no-op extra statement (badly chosen) | 0 | none, as expected for a no-op; replaced by M11 |
| M11 the read reaches any row (`WHERE account_id = ? OR 1`) | 1 | outcomes case; v3→v4 case |

The "newer unknown version" case is an existing test with its value moved. With the code at 4 steps, writing version 5 must be refused; a missing upper bound would fail it.

Not run: the whole gate (`npm test` with no argument), on purpose under WAY-160, and `python -B .the-way/elements/common/foundation_check.py`, which the whole gate runs. Both stay for the cycle's run before the request.

## Own-work check (section 3)

- **Requirement most likely not met:** the version-3 database in the test is written out by hand. If it differed from what the real code of task 20 creates, the step-4 move could pass its test and still fail on the test server's `loop2_accounts`.
- **Check:** `C:\Users\Mariusz\AppData\Local\Temp\claude\C--Storage-repos-loop2\57822f85-5994-4aa0-ab30-2463555a5fde\scratchpad\owncheck\check.mjs`. It imports the base commit's real `src/server/database.ts` (`git show b36292e:…`, run with Node's type stripping) and uses it to create a version-3 database: two accounts, a session, a confirmation link used to confirm an address, a reset link, and one account blocked. It dumps every row of `accounts`, `sessions` and `emailed_links` and every `sqlite_schema` object, opens the file with this slice's `dist/server/database.js`, and compares.
- **Runs:**
  - Exit 1, then exit 1: the check itself was faulty. The first failure was hidden by an `rmSync` EPERM while connections were still open on Windows. The second came from the check's own filter, which did not exclude the new table's automatic index `sqlite_autoindex_saved_games_1`.
  - After fixing the filter: `node …\owncheck\check.mjs …\owncheck\base-database.ts dist/server/database.js` → exit 0, `OK accounts=2 sessions=1 links=2 schemaObjects=11`. Version 4, every row, value and schema object kept, `saved_games` empty; a save for the unblocked account returned revision 1 and one for the blocked account `blocked`.
  - Its temporary directories under `C:\Users\Mariusz\AppData\Local\Temp\loop2-owncheck-*` were removed.

## Reaches beyond the dispatch

- `plan.md:221-240` (Slice 3), searched for "too-large" and "65 536". Why: to learn whether the route or the database measures the stored text, so that `writeSavedGame`'s outcomes fit Slice 3. Found: the route measures before the write ("the stored text serialized from the parsed `game` measured at most 65 536 bytes before the write"). So the database has no `too-large` outcome; its `CHECK` throws as the last guard.
- `git show 589f4d7:src/server/database.ts` (lines 62-75, step 3) and `git log -- src/server/database.ts`. Why: to write the version-3 schema in the test from its source commit, as `coding-database-access.md` asks.
- `package.json` `engines`, `Dockerfile` `FROM node:24-slim` and the local `sqlite_version()` (3.53.0, Node 24.17.0). Why: to choose between `octet_length` (SQLite 3.43+) and `length(CAST(… AS BLOB))`.

## Searches not found or unclear

- The handoff's ranges for D-07 (`decisions.md:146-171`) and D-182/D-186/D-187 matched; nothing missing.
- `environment_facts.md` `node-sqlite-database` names Node 24.21.0, while this machine runs 24.17.0 and the image takes whatever `node:24-slim` is. The step uses only SQL that every SQLite of these versions knows.
- Nothing else unclear.

## Choices made

- **The byte limit in the table as `length(CAST(game AS BLOB)) <= 65536`.** Rejected: `octet_length(game)`. It is clearer but needs SQLite 3.43+, and a step never changes once deployed (D-112). Cost if wrong: a database created in UTF-16 would count UTF-16 bytes. No code here creates one; `node:sqlite` creates UTF-8, and the test-server database was made by this code.
- **No `too-large` outcome in `writeSavedGame`; a text over the limit throws on the `CHECK`.** Rejected: measuring in the database operation and returning an outcome. Slice 3's plan has the route measure before the write and answer 413, so a second measured outcome would duplicate the rule. Cost if wrong: Slice 3 has to measure, or a 64 KiB+ text reaching the database surfaces as a thrown error (500) rather than 413.
- **Read-then-write inside `BEGIN IMMEDIATE`, as `issueLink` does.** Rejected: one guarded statement like `saveSession`. The three ordered refusals need the stored row's values. The write lock taken at `BEGIN IMMEDIATE` makes the read and the write atomic against another connection (D-112 "in the transaction that writes it").
- **Input checks in `writeSavedGame` that throw.** The route validates first. These checks keep the network's values out of the table even if a later caller skips the route. STRICT and the `CHECK`s would refuse most of them anyway, except a negative basis, which would otherwise just read as a conflict.
- **One extra test beyond the plan's list:** a version-2 database whose step 4 fails also loses step 3's column and table. This is the only case that catches steps committed one by one (M5). The plan's version-3 case cannot catch it, because step 4 is a single statement.
- **No adaptation of section 4:** the plan matched the code. `currentVersion` is `schemaSteps.length`, as the task's Context says.
- **Changed invariant tests:** the three existing cases named above (version 4 → 5; version 3 → 4 in two names and four assertions).

## Problems observed

- **One-off failure of two cookie cases under mutation M5.** In the first mutation run, besides the expected case, "set and touch refuse unusable cookie input without changing stored sessions" (subtest "invalid domain") failed. A second run with M5 alone failed only the expected case. Three clean runs of the file passed 51/51. Cause not verified; guess: timing in that case, or a side effect of M5 committing mid-migration on a fresh database. The message of the first failure was not kept.
- **Out of this slice's files:** the `loop2-deploy` skill still says the deployment moves the database to schema version 3. See `.claude/skills/loop2-deploy/SKILL.md:177`, `:226`, `references/troubleshooting.md:110-121`, `references/setup_and_secrets.md:280`, and the same lines in the `.agents/skills/loop2-deploy/` copy. With this commit the code writes version 4. I left them untouched; whichever slice or step owns the deploy instructions has to bring them to version 4 before the human's H1.
