PASS d946a58bf5d71da001f9919b9b16331c31b4699a

# Slice 3 review: the operator command that grants and revokes the previous-save privilege

Range reviewed: `41d80c2e..d946a58b` (one commit, `d946a58b`); `git rev-parse HEAD` is `d946a58bf5d71da001f9919b9b16331c31b4699a`, as the handoff gave. Files: `src/server/account-previous-save.ts` (new), `tests/account-storage.test.mjs`, `guidelines/coding.md`. Worktree status was clean before and after my checks.

## Findings

### Critical
none

### Important
none

### Minor
1. `guidelines/coding.md:131` and `:146` (not blocking). The two edited lines were extended in place and are now much longer than the paragraphs around them, which are hard-wrapped at about 80 columns (line 131 about 108 characters, line 146 about 110). The content is correct (the command is named beside `account-block` and `account-backup` in both places of *Recording a failure*, and the two events are listed in *Logging scope*, `:233-234`). A reflow would keep the file's shape. No effect on a reader.
2. `src/server/account-previous-save.ts:61-65` (not blocking; equivalent mutant). Removing `database.close()` is not caught by any test (mutant `noclose`: 0 failures). The process exits right after, so the connection closes with it; the block command has the same property. Nothing to fix here.

## What I checked against the handoff's trust-boundary list

- Address named as at login, nothing else read from the command line: `normalizeEmail(address)` (`account-previous-save.ts:35`); the argument vector is read once, destructured as `[action, address, ...rest]`; an extra argument, an unknown action or a missing address ends with exit 2 and the usage line plus "Nothing changed."; an address without a single `@` with text on both sides ends with exit 2. The only other input is `LOOP2_DATABASE_PATH`. The test uses `" Player@EXAMPLE.test "`. Mutant without normalization fails 2 tests.
- Every non-zero exit changes nothing and creates no file: usage (2), no database (3), unknown address (4) and a database failure (1) are all decided before or inside the one transaction of `setPreviousSavePrivilege` (`src/server/database.ts`, near line 770), which returns `unknown` without writing; a busy database rolls back. The file is found with `statSync(...).isFile()` before the database is opened (as in `account-block.ts`), so an absent path is never created; the test asserts `access(absent)` rejects. Mutant `nofilecheck` fails 1 test.
- Exit codes 0 to 4 are the block command's (`account-previous-save.ts:21-24` against `account-block.ts:24-27`); mutants swapping 3 or 4 fail 1 and 2 tests.
- The sentence is no log line (D-354): sentences go through `console.error` (refusals) and `console.log` (outcomes) as in the block command; the JSON lines are `writeEvent` and `writeFailure` alone. The event test treats any stdout line starting with `{` as an event and compares the whole object with `deepEqual` to `{ event, accountId }`; the sentences carry the address (as the block command's do) and do not start with `{`.
- Events carry the account's identifier and no address: `writeEvent("account-previous-save-granted"|"...-revoked", { accountId })`; the names begin with `account-`, so the skill's filter passes them (the filter is outside this slice). A no-change run and an unknown address write none (tested; mutant writing the event for `already-granted` fails 1 test; mutant adding `email` to the event fails 1 test).
- Failure line holds kind and code only: `writeFailure("account-previous-save", "account-previous-save.change", error)`; the test feeds a garbage file and checks `failure`, `kind`, `code`, `errcode`, `place` and that neither the file name nor SQLite's message reaches the output. `installLastResort("account-previous-save")` is the first call after the constants; the stand-in test checks the one-line `uncaught` output with place `account-previous-save`; mutant without it fails 1 test.
- Ends no session and stops no link: `setPreviousSavePrivilege` updates one column of `accounts` only; the constructor's pruning of expired sessions and links is the same as the block command's and is by expiry, not by account. The last test grants beside a live session and a live link and asserts both stay, then blocks, then revokes and asserts the block, the ended session and the spent link stay as they were.
- Opening: `new AccountDatabase(path)` with default options, exactly as `account-block.ts:57`; the constructor runs `initializeSchema`, which reads `user_version` inside the transaction, refuses a newer schema (`UNSUPPORTED_SCHEMA`, reported as exit 1 with kind and code) and applies steps after an older version, as it does for the block command. The command adds nothing of its own to that.

## Against the spec, the task and the foundation

- Spec section 5 (file, name, usage, mechanics, sentences, events, what it does not do) and D-394, D-354, D-355, D-112, D-137: the code does what they say; no difference found between the foundation entries and the spec for this command. The wording of the sentences is not fixed by the spec; the executor chose English as in the block command (judged against `account-block.ts:80-85` and the block tests: consistent). The revoke sentence adds "the previous save stays in place", true by D-394 and the spec (`setPreviousSavePrivilege` touches no previous save).
- `guidelines/coding.md` matches the plan's Change line: the command named in *Recording a failure* (D-354 sentence, and last-resort list) and the two events in *Logging scope*. Template comparison (`product-guidelines/template.md`) not needed for a two-line addition to an existing list; the additions follow the neighbouring entries' form.
- Reserved choice: none settled by the change (no language, framework, library, store, login or place to run); I did not open `reserved_choices.md`.
- Tests: written to fail without the code (executor reports red runs; I confirmed the behaviours with mutants below). They do not compute the expected value from the code: exit codes, event objects and failure fields are literals. The helper change (`runBlockCommand` delegating to `runOwnerCommand`) changes one line of the old helper and keeps the block tests green (82 of 82). A changed invariant test: none.

## Declined to judge

- The `loop2-deploy` skill section, its filter and `references/troubleshooting.md`: slices 4 onward, outside this range.
- Whether a grant to a blocked account should be allowed: the spec and D-394 are silent and the code allows it, as the block does not read the flag; outside the task as written.
- The Minor findings of slices 1 and 2: outside this range, per the handoff.

## Checks run

| Check | Result |
|---|---|
| `git rev-parse HEAD` in the worktree | `d946a58bf5d71da001f9919b9b16331c31b4699a`, exit 0 |
| `git log 41d80c2e..d946a58b`, `git diff 41d80c2e..d946a58b` | one commit, three files, exit 0 |
| `npm test -- tests/account-storage.test.mjs` (worktree root) | exit 0; `tests 82`, `pass 82`, `fail 0` |
| `npm run typecheck` | exit 0 |
| Mutants of the built `dist/server/account-previous-save.js`, in a scratch copy of `tests/` and `dist/` outside the repository, run as `node --test --test-name-pattern="previous-save command" tests/account-storage.test.mjs`; baseline: 6 pass, 0 fail | no last resort: 1 fail; no normalization: 2; address in the event: 1; exit 3 changed: 1; exit 4 changed: 1; wrong failure place: 1; always grant: 3; event for an already-granted run: 1; extra argument allowed: 1; no file check: 1; `database.close()` removed: 0 (survives, equivalent, Minor 2) |

Not run: the product's gate (`npm test` without a file), `foundation_check.py` and ESLint/prettier (the orchestrator's, per the handoff); a second-process race test of my own (the existing busy-database test covers the rollback path).

I did not change any tracked file or make a commit. The scratch directory `the cycle's scratch directory/mut` already existed when I started (a copy of a worktree with a linked `node_modules`, not mine); I overwrote its `tests/`, `dist/` and `package.json` with the head's and left `dist/server/account-previous-save.js` restored to the unmutated build.

## Reach beyond the dispatch

- `src/server/database.ts` lines 205-310 (constructor, `transaction`, `initializeSchema`) and 327 (`findAccountByEmail` signature), `src/server/account-policy.ts` (`normalizeEmail`, grep only): to confirm the opening rules and the normalization the command relies on, which the handoff said the executor had not read.
- `foundations/decisions.md` D-394 (`9650-9664`), D-354 and D-355 (`8945-8985`), D-112 (`2177-2191`), `foundations/glossary.md:255-268`, `foundations/part_map.md` (grep of the `account-server` entry): read to compare the command with the entries the change relies on; all already named by the handoff except D-394, which is E10.
- `guidelines/testing.md:172` and `grep` for `account-block` across `guidelines/`, `src/`, `tests/`, `scripts/`, `deploy/`: to find other places that should name the new command; found none inside this slice's scope.

## Unread material

- `guidelines/coding-database-access.md`: not read whole by me; I judged the command against `src/server/account-block.ts`, the existing code that follows it, and `database.ts` as above. Nothing in the diff opens a connection another way.
- `src/server/log-line.ts`: read only through use (`installLastResort`, `writeEvent`, `writeFailure` signatures as the command and tests exercise them); not read whole.
- `src/server/database.ts`: read in the parts named under Reach; the rest not read.
- `foundations/invariants.md:858-867` (blocked-account-access) and `foundations/decisions.md:2870-2889` (D-137): not read separately; the block command and D-354/D-394 stand for them.
- `foundations/part_map.md`: the `account-server` entry only by grep for the new command's name (line 65); not read whole. The `simulation` entry not read.
- The spec's other sections, `task.md`, `plan.md`, the executor's mentioned `.the-way/task-cycle/change/slice.md`: not read.
- Entries E4 to E22 beyond those listed above: not read separately.

## Searches not found or unclear

- None unfound. Unclear: the handoff and the executor's report give two different line ranges for D-354 and D-355 (the plan's `8926-8966` is stale; the worktree has `8945-8985`); I used the worktree's.
- Unclear: a scratch directory `scratchpad\mut` existed before I used it (see Checks); its origin is not known to me.
