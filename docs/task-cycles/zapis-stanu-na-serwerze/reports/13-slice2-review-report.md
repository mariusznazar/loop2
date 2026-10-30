PASS bbf6ad2ab912804a97dd7aeb0ad95bfeddca0109

# Review — Slice 2, task `zapis-stanu-na-serwerze`

- **Reviewed:** planned Slice 2, range `b36292e..bbf6ad2` (one commit, `bbf6ad2` "feat: :sparkles: add
  schema version 4 with the saved game states and their read and guarded write"). `git rev-parse HEAD`
  in the worktree = `bbf6ad2ab912804a97dd7aeb0ad95bfeddca0109`, the head given. Process pin:
  `git -C .the-way rev-parse HEAD` = `a8dfe8ac62885e88bc8f463e93ab16b621d48e92`, the gitlink's commit.
- **Method:** `.the-way/task-cycle/review/SKILL.md`, review of a planned slice; trust boundary and
  irreversible operation both named by the dispatch.
- **Counts:** blocking 0 · Minor 2 · out of scope 4 (the lines of Declined to judge).
- Nothing was changed in the reviewed worktree; no server was touched; schema step 4 ran only on
  temporary SQLite files.

## Findings

### Critical

None.

### Important

None.

### Minor

**M1 — The table's own constraints on version and revision (STRICT, `CHECK (version >= 1)`,
`CHECK (revision >= 1)`) have no test.** `src/server/database.ts:101-107`.
The plan's goal and spec decision 4 ask for "one strict table … the version of the shape (integer
from 1), the revision (integer from 1)". The code has them, as I read it and as a scratch run shows
(`typeof(version)` integer, raw text past the limit refused). But two mutations of mine survive
`npm test -- tests/account-storage.test.mjs` (exit 0): R4, `) STRICT;` dropped from step 4, and R5,
both `CHECK (… >= 1)` dropped. Only the byte limit is tested against a write that skips the operation
(raw INSERT and UPDATE in "the stored game text holds at most 65 536 bytes …"). Today the effect is
nil, because `writeSavedGame` refuses a non-integer, unsafe or below-range version and basis before
SQL (tested, and in my crafted-input run). Where it matters: step 4 can never be edited once H1
deploys it (D-112). So if someone edits it before then and the constraints go, the database would
keep only the operation's limits and not its own, and no test would notice. One raw INSERT with
version 0 or `'1'` (text), asserted refused, would pin both. Not blocking: the deployed step is the
one in this commit, and it is correct.

**M2 — No permanent test shows that step 4 leaves every other table and column alone.**
`tests/account-storage.test.mjs:581-653` ("a version-3 database opens as version 4 …").
The spec says "No other table or column changes". The move case compares rows through named column
lists, so an extra statement in step 4 survives. My mutation R11 added
`ALTER TABLE accounts ADD COLUMN extra INTEGER;` to step 4, and the file still passes (exit 0).
Deleting or rewriting values is caught: R12 deleted sessions and R13 cleared confirmations, and both
fail the move cases. My own scratch check (below) shows the step as committed meets the
requirement: every `sqlite_schema` object other than `saved_games` and every row of a version-3
database created by `main`'s real code is byte-identical after the move. So it holds today. What is
missing is a guard against a later edit before H1. Comparing `sqlite_schema` (minus `saved_games`)
before and after the move in the version-3 case would pin it.

### Surviving mutation classified, not a finding

- **R6 — the block read moved before `BEGIN IMMEDIATE`, outside the transaction:** survives (exit 0).
  It cannot be caught without a seam. Node runs the test on one thread, so another connection cannot
  commit between the read and the write. The test "a block committed through another connection
  before a save …" proves only that the block is read at write time, not cached. This is the same
  limit the existing `issueLink` tests have. The property the dispatch asks me to check — the block,
  version and revision reads and the write in one transaction — I checked by reading. At
  `src/server/database.ts:538-561` all three reads and the upsert run inside
  `this.transaction(...)`, which opens with `BEGIN IMMEDIATE` and so holds the write lock from the
  start (`:210-221`). A thrown error, the CHECK failure included, rolls everything back (crafted
  run: `unchanged=true` on every refusal).

## Against the task, spec, plan and foundation

- **Step 4** (`src/server/database.ts:97-108`): one STRICT table `saved_games` has
  `account_id TEXT PRIMARY KEY NOT NULL REFERENCES accounts(id) ON DELETE CASCADE`, version and
  revision `INTEGER NOT NULL CHECK (>= 1)`, and
  `game TEXT NOT NULL CHECK (length(CAST(game AS BLOB)) <= 65536)`. This matches spec decision 4 and
  D-112 ("their account's identifier as key and as a foreign key that removes them with their
  account, the version of their shape, their revision and the game's text of at most 65 536
  bytes"). `currentVersion` is `schemaSteps.length` = 4. **Steps 1–3 are untouched:** I extracted
  `schemaSteps` from `main` (`dce2970`) and from head, and `diff` shows only the appended step and
  its comment. The test's version-3 schema equals step 3 at `589f4d7:src/server/database.ts:62-75`,
  and `589f4d7` is an ancestor of `main`.
- **The write's order**, `src/server/database.ts:538-548`: unknown account throws; blocked →
  `blocked`; stored version > given → `outdated`; stored revision (0 with no row) ≠ basis →
  `conflict`; otherwise revision = stored + 1. This is spec decision 1's order and D-186/D-187's
  ("comparing that number before the basis"). An equal or higher version on the current basis
  saves. Mutation R1 (`>=`) fails three cases.
- **No account reaches another's row:** both statements bind `account_id = ?` from the argument
  (`:504`, `:553-559`). The outcomes case checks that a second account has its own row and
  revisions. The executor's M11 (`OR 1`) fails it. My crafted run shows account b's row unchanged by
  every write of a.
- **Blocking and unblocking keep the row:** `blockAccount`/`unblockAccount` are unchanged, and this
  is tested ("… blocking and unblocking keep the saved game state").
- **Hostile input at the boundary** (crafted run, `dist/server/database.js` of head; each refusal
  left the table unchanged):
  - Versions: `"2"`, NaN, Infinity, `2n`, `1e300` and `-0` all throw `Invalid saved game`.
  - Bases: `"1"` throws. `Number.MAX_SAFE_INTEGER` → `conflict`.
  - Games: `null` and a Buffer throw.
  - Text at and over the limit: 65 536 ASCII bytes and 16 384 four-byte emoji (65 536 bytes) are
    stored. 65 537 ASCII bytes, emoji + 1 byte, 21 846 lone surrogates (65 538 bytes as U+FFFD,
    21 846 characters), a 65 537-byte text with a NUL inside and 10 MB are refused on the CHECK.
  - The stored text read back is 65 536 bytes.
- **Irreversible operation only prepared:** the step runs only on temporary databases in the tests
  and in my scratch runs. A failing step 4 rolls back to version 3 unchanged, and also takes step 3
  back on a version-2 database (the executor's extra case; it catches committing per step, their
  M5). The unknown newer version moved 4 → 5 and is refused unchanged. In my scratch run, `main`'s
  code refuses the moved version-4 database and leaves it at 4, which is what D-112 and the task's
  Context (H1 window, exit code 8) expect.
- **Guideline `coding-database-access.md`:**
  - The previous version is written in the test with its own schema, not with product code: ✓.
  - Refusal and rollback are shown on real SQLite files: ✓.
  - "Stan konta w instrukcji zapisu": the write reads the block inside the write lock's transaction
    rather than in the same statement. It follows `issueLink`'s pattern, which D-112's "in the
    transaction that writes it" covers. The three ordered refusals need the stored row's values. ✓
- **`testing.md`:**
  - New cases are marked with `account-save-sqlite-store` (four cases; none were marked before),
    `account-schema-lifecycle` and `account-database-schema`.
  - Expected values come from D-186/D-187/D-104 and the spec, and comments name them.
  - Changed existing tests: in "schema reopen preserves accounts and sessions and rejects a newer
    version without rewriting it", the newer version moved 4 → 5. In the version-1 and version-2
    move cases, the names and four `user_version` assertions moved 3 → 4. The cause is on the
    requirement side: D-112 now says "up to the current version 4". No assertion is weakened.
- **Own-work check:** the executor named the hand-written version-3 fixture differing from the real
  version-3 database. That is the weakest spot, and their check (base code creating the database)
  would catch it. I repeated it independently against `main`'s code (below).

## Declined to judge

- `.claude/skills/loop2-deploy/` (and its `.agents/` copy) still say the deployment moves the
  database to version 3 — Slice 9's work by the dispatch; outside this slice's files. Out of scope.
- Measuring the stored text before the write and answering 413 `save-too-large` — Slice 3's route.
  Here a text over the limit throws on the CHECK, which plan Slice 3 accepts as the last guard. Out
  of scope.
- A player crafting `version: 9007199254740991` stores it, after which their own browser's saves
  read as outdated. This is spec decision 1's contract (a positive safe integer); it touches only
  the player's own save (D-07 accepts players forging their own progress) and belongs to the route
  and spec, not this slice. Out of scope.
- The one-off failure of "set and touch refuse unusable cookie input without changing stored
  sessions" (subtest "invalid domain") under the executor's mutation M5 — that case is outside this
  slice's change. It did not recur in my 11 runs of the file (one clean, ten mutated; none listed
  that case among failures). Cause not established. Out of scope.

## Checks run

| Command / method | Exit | Result |
|---|---|---|
| `npm test -- tests/account-storage.test.mjs` (reviewed worktree, head) | 0 | 51 pass, 0 fail |
| `npm test -- tests/startup.test.mjs` | 0 | 15 pass, 0 fail |
| `npm test -- tests/invariants/test_account_server_typecheck.py` | 0 | 8 tests OK |
| `npm test -- tests/quality/test_quality_invariants.py` | 0 | 5 tests OK |
| `schemaSteps` of `main` vs head, extracted with `awk` and compared with `diff` | 1 (diff) | only step 4 and its comment added |
| Mutations in a separate detached worktree of `bbf6ad2` (node_modules linked, removed afterwards), script `C:\Users\Mariusz\AppData\Local\Temp\claude\C--Storage-repos-loop2\57822f85-5994-4aa0-ab30-2463555a5fde\scratchpad\rvmut\run.py`, each run `npm test -- tests/account-storage.test.mjs`, file restored after | — | see the table below |
| Crafted inputs, `node …\scratchpad\rvmut\crafted.mjs <head dist/server/database.js> …\crafted.txt` | 0 | every crafted value refused without change; limits as above |
| Move check, `node …\scratchpad\rvmut\move.mjs <main's src/server/database.ts via type stripping> <head dist/server/database.js> …\move.txt` | 0 | version 3 → 4; schema objects and rows other than `saved_games` identical; fresh v4 schema = moved v4 schema; save works, blocked refused; `main` code refuses v4 and leaves it at 4 |

| Mutation | Exit | Failing case(s) |
|---|---|---|
| R1 `stored.version >= save.version` | 1 | outcomes; block; byte limit |
| R2 CHECK `<= 65537` | 1 | byte limit |
| R3 upsert keeps the old version | 1 | outcomes |
| R4 step 4 without `STRICT` | 0 | none — M1 |
| R5 step 4 without the version/revision CHECKs | 0 | none — M1 |
| R6 block read before `BEGIN IMMEDIATE` | 0 | none — classified above |
| R11 step 4 also adds a column to `accounts` | 0 | none — M2 |
| R12 step 4 deletes sessions | 1 | v1, v2 and v3 move cases |
| R13 step 4 clears confirmations | 1 | v3 move case |
| R17 no safe-integer check on version | 1 | goes-with-its-account / unusable-field case |

Not run: the whole gate (`npm test` with no argument) and
`python -B .the-way/elements/common/foundation_check.py`, by the dispatch and section 2 (the cycle's
own run before the request). Stryker: not applicable (`database.ts` is not `simulation`).

## Reaches beyond the dispatch

- `git show 589f4d7:src/server/database.ts` lines 62-75 and `git merge-base --is-ancestor 589f4d7
  main` — to check that the test's version-3 schema is the deployed step 3.
- `git show main:src/server/database.ts` — to compare steps 1–3 with `main` and to create a real
  version-3 database for the move check.
- `tests/account-storage.test.mjs` fixtures `fixture`, `olderDatabaseFixture`, `versionTwoDatabase`
  (lines 15-40, 263-311, 373-398) — to read what the new cases build on.
- `scripts/test-node-file.mjs`, `package.json` scripts, `.gitignore` — to confirm that a focused
  run builds only ignored `dist/`.

## Searches not found or unclear

- `C:\Storage\repos\loop2\dist\server\database.js` (a built `main`) does not exist, so I ran `main`'s
  source through Node's type stripping instead.
- The first attempt to create my scratch worktree was blocked by a tool rule before it ran; the
  second created it, and it has been removed (`git worktree list` no longer shows it).
- Nothing else unclear.
