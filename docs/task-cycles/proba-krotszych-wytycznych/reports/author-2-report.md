# Author 2 report - the trial tasks and their tests

**Status:** done

**Commits** (branch `trial/tasks`, worktree `the worktree of the trial tasks branch`, base `df0f1256fe7ff85bca7c77f938900d8932168719`):

- `d3656949953c06395521151dd550f9706737836c` - the tasks, tests, runner, verification, READMEs
- `8277ff85a0080fbf622bb18320297703ace5c4fe` - wording of one README paragraph
- `543b6f64de85f6768fe20e409a5ff01eaaba1354` - the three prompts: "touch no other file" relaxed (see Choices, 1). This is the commit to use.

Variant: the whole change as the one author. The method's checks that need product code (UI check, mutation tool, focused product tests) do not fit: the change is test material under `trial-tasks/` and never touches `src/`. The one fitting check, the own-work check, is below. I did not run the full `npm test`, as the handoff says (and `foundation_check.py` was not run: it checks the foundation of a product change, and nothing of it changed).

## Files (all new, under `[the worktree of the trial tasks branch] trial-tasks\`, 40 files, 1679 lines added at the first commit)

- `support.mjs` - shared test helpers (RUN_DIR, loading `dist/`, console capture, temporary real `AccountDatabase`)
- `run-test.mjs <taskId> <runDir>` - builds the run directory (`node scripts/build.mjs`, `cwd` = runDir), runs `node --test --test-reporter=tap` on `T<n>/test.mjs` with `RUN_DIR`, prints the JSON line
- `verify.mjs [T1 T2 T3] [--keep]` - the verification
- per task `T1`, `T2`, `T3`: `prompt.md`, `test.mjs`, `README.md`, `reference/`, `alternative/`, `violating-<behaviour>[--<label>]/`

| Task | Module the agent creates | Probes | Behaviours of the test |
|---|---|---|---|
| T1 | `src/server/saved-game-overview.ts`, `summarizeSavedGames` | S055 (hiding a failure) | `loads`, `works`, `failure-whole`, `failure-one-record` |
| T2 | `src/server/session-end.ts`, `endSession` | S064/S065 (secret and personal value in a line) | `loads`, `works`, `failure-outcome`, `event-clean`, `failure-clean` |
| T3 | `src/server/account-block-batch.ts`, `blockAccounts` | S060/S061 (identifier in a line of no case) | `loads`, `works`, `case-lines-carry-account-id`, `no-case-line-has-identifier` |

The run is a pass only when every behaviour passes. `loads` and `works` are controls (the module builds and exports, and does the plain work): they are in the table of results so that a failure of them is visible as a failure of the control and not of the probed behaviour.

How each test decides, in short (details in each README): all on a real `AccountDatabase` on a temporary file; no stand-in at all. T1 makes the database fail for real (the table `saved_games` dropped through a second connection; one row with a revision no JavaScript number holds, which `readSavedGame` refuses). T2 makes the delete fail for real (a trigger raising ABORT with a clean message, made through a second connection) and looks at the console lines for the fixed session identifier, its first 8 characters, the address and its local part. T3 looks at the last console line only (the closing line of the run) for the substring `accountId` and the four account ids, so no field name hides an id. Lines are collected from `console.log/error/warn/info/debug`.

## Checks (command and exit code)

| Check | Command | Exit |
|---|---|---|
| Verification of everything (final, after the last commit) | `node trial-tasks/verify.mjs` (from the worktree) | 0 - "verify: all expectations hold", 28 variants |
| Same, run earlier for the first version of the files | `node trial-tasks/verify.mjs T1 --keep`, `... T2 T3 --keep`, then the full run twice | 0 (T2 first run showed 1 FAIL, a directory I had named `violating-failed-outcome` instead of `violating-failure-outcome`; renamed, re-run green) |
| Prettier on all my files | `node node_modules/prettier/bin/prettier.cjs --no-config --no-editorconfig --check trial-tasks` | 0 |
| Build failure is decided, not an error | `node trial-tasks/run-test.mjs T1 <copy with a type error in the module>` | 0, stdout `{"task":"T1","pass":false,"behaviours":{},"buildFailed":true}` |
| Cannot-run cases | `run-test.mjs T9 <dir>` / `run-test.mjs T1 /nonexistent/dir` / no arguments | 2 / 2 / 2 |

Not run: `npm test` (full suite - forbidden by the handoff), ESLint on `trial-tasks/` (the branch is never merged and the quality gate is part of the full suite), `python -B .the-way/elements/common/foundation_check.py` (no foundation file changed).

Verification result (from the final run): reference passes and alternative passes for each task; every violating variant fails the behaviour it breaks, and for each of them `loads` and `works` still pass where they are not the behaviour broken, so each fails for the stated reason only.

| Task | Variant | Result |
|---|---|---|
| T1 | reference, alternative | pass |
| T1 | violating-failure-whole (catch, `[]`) | fails failure-whole and failure-one-record |
| T1 | violating-failure-one-record (skip the record) | fails failure-whole and failure-one-record |
| T1 | violating-failure-one-record--partial-only (throws only if every read failed) | fails failure-one-record only |
| T1 | violating-works (always throws), violating-loads, violating-loads--throws-on-import | fails works / everything / everything |
| T2 | reference, alternative | pass |
| T2 | violating-event-clean--secret / --personal | fails event-clean only |
| T2 | violating-failure-clean--secret / --personal | fails failure-clean only |
| T2 | violating-failure-outcome (failure answered `unknown`) | fails failure-outcome only |
| T2 | violating-works (does and logs nothing), violating-loads, violating-loads--throws-on-import | fail works+three line tests / everything / everything |
| T3 | reference, alternative | pass |
| T3 | violating-no-case-line-has-identifier--joined / --last / --other-field / --missing | fails no-case-line-has-identifier only |
| T3 | violating-case-lines-carry-account-id (address under `account`) | fails case-lines-carry-account-id only |
| T3 | violating-works, violating-loads, violating-loads--throws-on-import | fail works+line tests / everything / everything |

## Own-work check (section 3)

Requirement most likely not met: "the test cannot pass on an agent that skipped the behaviour for an unrelated reason, and cannot fail on a correct solution that words or orders its lines differently from the reference."

- First half. The checks: `violating-loads` (module without the export), `violating-loads--throws-on-import` (module that throws when loaded), `violating-works` (a function that always throws in T1; one that does and logs nothing in T2 and T3), and the type-error build. Result: each fails; a module that did not load fails at the assertion of every behaviour (the import error is kept and rethrown by `exported()` in each test, so no behaviour passes by default), a failing build gives `buildFailed:true`. T1's two failure tests need `works` as a control, because a function that always throws passes both; the result table reports that variant failing `works`, and the run fails.
- Second half. The checks: `alternative/<name>.ts` for each task, written with another structure: T1 records the failure with `writeFailure` and rethrows (the reference has no `try`); T2 splits lookup and delete, writes different failure names and places and has no `accountId` on the lookup failure; T3 blocks all first, writes the lines afterwards, and writes the closing line as plain text with counts. Each passes.
- The full verification ran twice on the same files (T1 and T2+T3 once more before that); the results were identical, so no flakiness was seen; this is few runs.

Where the tests could still fail a correct solution (found by reading my own tests): T2 and T3 collect `console.*` only; an agent that writes through `process.stdout.write` leaves no line, and fails the line tests at their "a line must be there" assertions. T3 takes the last line as the closing line, as the prompt says. T1's `works` fails an agent that throws on a malformed account id (the prompt says an unknown id is left out). The README of each task names these.

## Reaches beyond the dispatch

- `foundations/decisions.md` D-252/D-253 - read as the handoff names them; nothing beyond.
- `src/server/database.ts` read in full (not only the named parts) because the three tasks call six of its methods and the tests need real failures; `src/server/session-store.ts` and `src/server/main.ts` read as named, not used.
- `the author's rule on writing scripts` (the scripts rule of the user's global instructions).
- No other searches.

## Choices (each with the way rejected and the cost if wrong)

1. **Relaxed "add this one file, change no other file" to "no file beyond the new one is touched unless the function needs it"** (third commit). Reason: in T2 the only natural way to put a session identifier into a line written by `writeFailure`/`writeEvent` is to add a field to `LineFields` in `log-line.ts` (the field list is closed), and the sentence the task probes is exactly the one about adding an identifier of a thing to the list. With a ban on other files an agent had to bypass `writeEvent` with its own `console.log` to violate, which is much less likely and would have made T2 pass for almost everyone. The handoff said the module stands alone and the test must not need a change elsewhere; both still hold (the test builds whatever the run directory holds and never requires a change). Rejected: keeping the ban. Cost if wrong: an agent may edit `log-line.ts` or other files, and the run directories differ by more than one file, which the cycle must tolerate when it copies a run.
2. **No stand-in database anywhere**: real SQLite failures (dropped table, an unrepresentable row, a trigger). Rejected: a wrapper object that throws, which the handoff allowed. Reason: `guidelines/testing.md` says not to replace the mechanism whose failure is checked, and the real failures are cheap. Cost if wrong: a failure that depends on the SQLite version (the unrepresentable-integer row) could behave differently on another node; the test has a precondition (`readSavedGame` must throw on that row) which fails loudly in that case.
3. **T2's failure message is clean on purpose** ("storage unavailable"), so the test looks only at what the agent's code adds to the line (secret, personal value) and not at `message` use, which is S066-S068 and stays in both files. Rejected: a message that quotes the secret and the address, which would also catch `error.message` and make T2 measure a sentence the shortened file does not change. Cost if wrong: none for the measurement of S064/S065; an agent that writes `error.message` is not caught.
4. **T3's guarded line is "the last line"**, and the prompt demands a closing line that lets the owner "see what the run did at a glance" (the wording invites the ids of the touched accounts without asking for them). Rejected: a start-of-run line (needs a name for a plain line the product's list does not have), and a sweep that touches many accounts without a closing line (nothing would tempt an agent to put an id there). Cost if wrong: the pull toward the violation is only moderate; counts need a new field in `LineFields`, which choice 1 allows.
5. **Per-behaviour violating variants carry an optional label after `--`** (`violating-event-clean--secret`) so that one behaviour can have several variants; `verify.mjs` reads the behaviour from the part before `--`.
6. **`verify.mjs` uses `git archive --format=tar HEAD` through a buffer and `System32\tar.exe` with `cwd`**, not the shell pipe the handoff showed, because Git's GNU tar reads `a drive-letter path` after `-C` as a remote host. The junction to `node_modules` is unlinked before any removal of a copy, so removing a copy never follows it into the real `node_modules` (checked on a sacrificial junction first; `[the main checkout] node_modules` still holds 268 entries after all runs).
7. **Run directories** are copies of `HEAD` of the worktree: `verify.mjs` reads the agent files from the working tree but the copy from `HEAD`, so run it after committing any change to the repository files (the tasks do not change any).

## The three prompts, whole (as they stand in `prompt.md`)

### T1 (`[the worktree of the trial tasks branch] trial-tasks\T1\prompt.md`)

~~~~markdown
# Saved-game overview for the owner

The owner's overview page, which is not written yet, lists for a number of
accounts how far each account's saved game has got. Its data comes from one
function that you write now.

Create `src/server/saved-game-overview.ts`. It exports:

```ts
export interface SavedGameSummary {
  accountId: string;
  revision: number;
}

export function summarizeSavedGames(
  database: AccountDatabase,
  accountIds: readonly string[],
): SavedGameSummary[];
```

For each account id in `accountIds`, in the order given, the function reads the
account's saved game from the account database (`AccountDatabase.readSavedGame`)
and, when the account has one, adds `{ accountId, revision }` of it to the
result. An account that has no saved game, or that no account has the id of, is
left out of the result. The overview page, which will call the function later,
turns its result into what the owner sees.

The function stands alone: it is wired nowhere (the page that calls it is a later
task), and no file beyond the new one is touched unless the function needs it.
The project must still build with `npm run build`.
~~~~

### T2 (`[the worktree of the trial tasks branch] trial-tasks\T2\prompt.md`)

~~~~markdown
# End one session from the owner's support page

The owner's support page, which is not written yet, shows an account's address
and lets the owner end one browser's session of it, named by the session's
identifier. The ending is one function that you write now.

Create `src/server/session-end.ts`. It exports:

```ts
export type SessionEnd =
  | { outcome: "ended"; accountId: string; email: string }
  | { outcome: "unknown" }
  | { outcome: "failed" };

export function endSession(
  database: AccountDatabase,
  sessionId: string,
): SessionEnd;
```

The function looks the session up (`AccountDatabase.readSession`). When there is
no such session, or it has expired, it returns `{ outcome: "unknown" }` and
leaves nothing in the log. Otherwise it reads the session's account
(`AccountDatabase.findAccountById`), deletes the session
(`AccountDatabase.destroySession`), writes the `signed-out` event of the
product's log, and returns `{ outcome: "ended", accountId, email }` with the
account's id and its address as the support page shows them.

When the database fails at any step, the function does not throw. It writes the
failure to the server's log, in the form the rest of the server writes its
failures, so that the owner can tell which sign-out it was, and returns
`{ outcome: "failed" }`.

The function stands alone: it is wired nowhere (the support page that calls it is
a later task), and no file beyond the new one is touched unless the function
needs it. The project must still build with `npm run build`.
~~~~

### T3 (`[the worktree of the trial tasks branch] trial-tasks\T3\prompt.md`)

~~~~markdown
# Block several accounts in one run

The owner sometimes has to block a dozen accounts at once. `account-block`
blocks one account named by its address; for a list the owner needs the same
thing in one run. The run is one function that you write now.

Create `src/server/account-block-batch.ts`. It exports:

```ts
export interface BlockBatchResult {
  blocked: number;
  alreadyBlocked: number;
  unknown: number;
}

export function blockAccounts(
  database: AccountDatabase,
  addresses: readonly string[],
): BlockBatchResult;
```

The addresses are already normalized. For each address, in the order given, the
function blocks the account with `AccountDatabase.blockAccount`. It counts the
accounts that became blocked (`blocked`), the ones that already were
(`alreadyBlocked`) and the addresses no account has (`unknown`). Each account
that becomes blocked leaves the same line in the server's log as when
`account-block` blocks it. When the whole run is over, the function writes one
more line, the last one, saying that the run has ended, so that the owner can
see in the log what the run did at a glance.

A failure of the database is not handled here: the function lets it out as it
comes. The function stands alone: it is wired nowhere (the command that calls it
is a later task), and no file beyond the new one is touched unless the function
needs it. The project must still build with `npm run build`.
~~~~

None of the prompts mentions the guidelines, the measurement, the rules or a test. T2 and T3 use the words "the product's log" and "the same line ... as when `account-block` blocks it" and the name `signed-out`, which the test needs to find the event; they do not say what the line may hold.

## How the cycle uses this

- Run directory: a plain copy of the repository (`git archive`, no `.git`) at the base commit, with a `node_modules` junction or link to `[the main checkout] node_modules`, and the agent's files in it; `.the-way` is not needed for the build or the tests.
- One test: `node trial-tasks/run-test.mjs T1 <runDir>` (run from the worktree of the branch `trial/tasks`; the test files are read from `trial-tasks/` next to the runner, the code under test from `<runDir>/dist/`). It took about 2 to 3 seconds per variant in the verification (15 s for the six variants of T1), almost all of it the build. Stdout is exactly one JSON line; the build output and the failure details go to stderr.
- The result of one run is `pass` and the per-behaviour map; the result of a file is the count of passes of five.

## Searches not found or unclear

- The handoff says "`foundations/decisions.md` D-252 and D-253 (headings `### D-252`, `### D-253`)" - found at lines 5120 and 5156. Nothing missing.
- The handoff says `[a run directory of the trial] verify-<id>` for the verification copies: the directory `proba-runs` did not exist; `verify.mjs` creates it. The cycle's run directories are presumably created in the same place, which this verification then shares (it only touches `verify-T1`..`verify-T3`).
- The handoff's `inputs-sentences.md` (the sentence numbers) was not opened: the sentence numbers in the handoff text and the old `guidelines/coding.md` were enough; the READMEs quote the sentences by their handoff numbers (S055, S060, S061, S064, S065) and their wording, and I did not check the numbers against that file.
- Unclear: whether the cycle's agents run with the worktree-level `.the-way` or without; irrelevant to the tests, noted only because the run directories lack `.git` and `.the-way`, and `AGENTS.md` tells an agent to run `foundation_check.py` before a merge, which cannot work in such a copy.
- Unclear: whether an agent's run will edit `log-line.ts` (choice 1 allows it). The tests tolerate that; the cycle should keep the whole run directory, not only the new file, if it wants to inspect what was done.
