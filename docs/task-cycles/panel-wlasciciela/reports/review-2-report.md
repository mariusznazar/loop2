FAIL 7fafc74325055854795e5bac9fe19f37ceb6f3fd

# Review of slice 2 (range 6e1eeef7..7fafc743) — "panel właściciela", Database operations of the panel

`git rev-parse HEAD` in the worktree is `7fafc743`, as given. Files in the range: `src/server/database.ts`, `tests/account-owner.test.mjs` (new), `foundations/part_map.md` (one line).

## Findings

Blocking: 1 Important. Minor: 2. Out of scope: 0.

### Important

**I1 — No test fails when the role read of `blockForPanel` leaves the transaction.**
Place: `tests/account-owner.test.mjs:205-232` (the test "a role given or taken by a second connection just before the block …"); the code it should protect: `src/server/database.ts:879-886`.
What is wrong: the task (slice 2 goal, *Risk*) and D-137 (*Verification* and the `violates` line: "a block of the panel that reads the role in one transaction and marks the account in another") require that the transaction of the block reads the role itself. The implementation does this correctly, but the only test of the point commits the second connection's role change *before* the call and calls `blockForPanel` afterwards, in sequence. Any implementation that reads the role before `BEGIN IMMEDIATE` (a pre-read, a cached account, a role passed in) gives the same answers on this test. The window the entry names (a role given between a check and the block) is not exercised at all.
Why it matters: this is the trust-boundary behaviour the handoff asked me to check by mutation; a plausible refactor (hoisting `findAccountByEmail` out of the transaction, or reusing the account `blockAccount`'s callers already hold) would pass every test of the slice and would let a block of an account made owner in the gap go through, locking the owner out of the panel (D-137 rationale). Slice 4's route test for 409 `owner-not-blockable` "also where a second connection gave the role just before" will have the same limit unless the database level holds it.
Evidence (mutation, run in a worktree of `7fafc743`, `npm run build` then `node --test tests/account-owner.test.mjs`):
- M2 (the role read before the transaction: `const early = this.findAccountByEmail(email)` outside `this.transaction`, and `early.role === "owner"` decides the refusal) → build exit 0, tests: **6 pass, 0 fail** — the mutant survives.
- Mutations that did get caught are listed under Checks.
Fix suggestion (one way, the author may find a better one): make the test observe where the read happens — for example, in the test replace `database.findAccountByEmail` on the instance by a wrapper that records `database.connection.isTransaction` (the connection is a plain property in the built JS) at each call, and assert it was true for the call that decided the answer; or have the wrapper call a second connection's `setAccountRole` between a pre-read and the transaction is impossible to arrange without a hook, so the recording of "read inside the transaction" is the practical check. Either way the test must fail on M2.

### Minor

**M1 — The new integration test file is not named in `guidelines/testing.md`.**
Place: `guidelines/testing.md:360` (*integration test* → *Files*, which lists `tests/account-storage.test.mjs` and the other account-server integration files by name) and the *Where in code* list (`:443-451`). `tests/account-owner.test.mjs` is a test on real SQLite files, so an integration test by the guideline's own rule ("the level follows from the resources used"), and neither list names it. It is outside the slice's *Change* list (so not a defect of the executor's work against the plan); name it in the whole-change review, when slice 4's tests join, or decide that the list is not kept per file. Effect: a reader of the guideline does not find where the owner operations are tested; nothing breaks (the foundation check and the gate selection pass).

**M2 — The list test carries no quoted decision sentence.**
Place: `tests/account-owner.test.mjs:75-111`. The executor named this gap; the test has a plain comment naming D-411 instead of a `// decision:` line. The expected values (three addresses, their roles, states and privilege) are explicit and independent of the code, and `guidelines/testing.md` (*Where the expected value comes from*) does not require a quotation (D-82), so the effect is small: the test cannot be tied to the sentence of D-411 by the foundation check. Minor.

## Against the task and the foundation

- Goal (a), list: `listAccounts()` returns `{ email, role, blocked, previousSaveAllowed }`, sorted by `ORDER BY email`, nothing else (`src/server/database.ts:837-851`); matches D-411 and the orchestrator's choice A1. The test pins the four fields with `deepEqual` and the sort with an unsorted insert order (mutants M4 sort-desc and M6 extra field are caught). The sort: `email` is `TEXT` with the default BINARY collation, so the order is by UTF-8 bytes, which is code-point order; `normalizeEmail` (`src/server/account-policy.ts:83-88`) uses `toLowerCase()` on the whole address, so the stored values are lower-cased Unicode and the sort is stable and deterministic for non-ASCII too. "Ascending" is not ambiguous for ASCII addresses; for non-ASCII it is code-point order, not a locale order. I judge that acceptable and not a finding (the executor's open question is answered).
- Goal (b), role change: one `BEGIN IMMEDIATE` transaction, the five answers, `already-*` writes nothing, no session or link touched, block and privilege untouched (`:857-873`). The test of the five outcomes and of "leaves block, privilege, sessions, links and saved games" is explicit; mutant M5 (the role change deleting sessions) is caught.
- Goal (c), panel block: `blockAccount` now calls the private `markBlocked` with the same three statements and answers (`:486-509`); `blockForPanel` reads the role in the transaction and returns `{ outcome: "owner" }` before any write (`:879-886`). `unblockAccount` and `setPreviousSavePrivilege` are unchanged; `tests/account-storage.test.mjs` passes (90 tests with the owner file). No logic of a second block path diverges from `blockAccount`: the marking, deletion and stopping are one code path.
- Trust boundary, crafted input at the database level (the routes are slices 3 and 4): the methods take a normalized address and never an identifier; the role is read from the database, never from a session; `accountFromRow` throws `Invalid stored account` on an unknown stored role (the `CHECK` of step 6 stops it from being stored; a failure is loud, not an owner by default); `listAccounts` returns no password hash, identifier, creation time or confirmation state. A role argument of another word reaches `setAccountRole` only from a caller that bypasses the type; the columns' `CHECK` would refuse the write and the transaction would roll back, so nothing is stored. No finding at this level; the callers' normalization of the address (the executor's open point) is a check for slices 3 and 4.
- Irreversible operation: none (a database method; no command runs here).
- Reserved choice: none taken.
- Foundation entries the change writes: none besides one *Files* line of `account-server` in `foundations/part_map.md:73`, which names the new test file; the foundation check passes. I did not check the part-map entry against `template.md`, `rules.md`, `examples.md` or `first_map.md` (the executor's gap; see Unread material): the change is one path added to a list in the entry's *Files*, between two neighbouring test files.
- Guidelines: `coding-database-access.md` — the new operations use prepared statements with bound values and transactions through the class's own `transaction()`; no HTTP code holds a transaction; no schema step touched. `coding.md` — Prettier, ESLint clean; no log line added by this slice (the log events for the panel belong to slices 3 and 4). No size rule exists in the files read (`database.ts` is 942 lines); no finding. `testing.md` — real SQLite files, explicit expected values, whole-state `snapshot` comparison in the owner-block test is justified by "changes nothing, own sessions and links included" (D-137); no mock of the code under test; temp directories cleaned in `t.after`.
- Executor's report claims: the red run, green run, mutation (removal of the refusal), prettier, eslint and foundation-check claims are consistent with what I reproduced; I did not read the evidence logs, only reran the checks.
- The method names `listAccounts`, `setAccountRole`, `blockForPanel` are the executor's choice; they are clear and consistent with the existing `blockAccount` / `setPreviousSavePrivilege` naming; slices 3 and 4 depend on them. No finding.
- Not in this slice (not judged): `references/troubleshooting.md` remark O1 and M1–M3 of the review of slice 1.

## Declined to judge

- The callers' normalization of the address before these methods (slices 3 and 4 and the command of slice 3): outside this slice's files.
- The log events of the panel's operations (D-252/D-354): added with the routes, not here.
- The structure of `database.ts` as a 942-line file: no rule of size in the guidelines read; below any threshold I could name.

## Checks I ran

All in a worktree of `7fafc743` in `.runs/review-2/wt` (with `node_modules` joined by a junction), except the foundation check, which ran in the reviewed worktree (it changed nothing: `git status --short` clean before and after).

| Check | Result |
|---|---|
| `node scripts/build.mjs` | exit 0 |
| `node --test tests/account-owner.test.mjs` (clean head) | exit 0, 6 pass, 0 fail |
| `node --test tests/account-owner.test.mjs tests/account-storage.test.mjs` (after restoring the head) | 90 pass, 0 fail |
| `node scripts/build.mjs --check` (what `npm run typecheck` runs) | exit 0 |
| `npx prettier --check src/server/database.ts tests/account-owner.test.mjs` | exit 0 |
| `npx eslint src/server/database.ts tests/account-owner.test.mjs` | exit 0 |
| `python -B .the-way/elements/common/foundation_check.py` (reviewed worktree) | exit 0, "0 errors" |
| Mutation M1: delete the `if (account.role === "owner") return { outcome: "owner" };` line | build 0; 4 pass, 2 fail (owner-block test, second-connection test) — caught |
| Mutation M2: read the role before the transaction (stale `early.role`) | build 0; 6 pass, 0 fail — **survives (I1)** |
| Mutation M3: panel block marks the account blocked but deletes no session and stops no link | 4 pass, 2 fail — caught |
| Mutation M4: `ORDER BY email DESC` | 5 pass, 1 fail — caught |
| Mutation M5: `setAccountRole` also deletes the account's sessions | 4 pass, 2 fail — caught |
| Mutation M6: `listAccounts` adds a `createdAt` field | 5 pass, 1 fail — caught |
| Mutation M8: the block deletes every session, not the account's | 5 pass, 1 fail — caught |

Each mutation was applied to `src/server/database.ts` in the working copy, rebuilt, run, and the file restored from a copy before the next; after the last, the copy was clean (`git status --short` empty) and the 90-test run above passed.

Not run: the full `npm test` (the cycle runs it), `npm run typecheck` through npm (I ran its command, `node scripts/build.mjs --check`, directly).

## Reach beyond the handoff

- `src/server/database.ts` around lines 299-310 (`transaction`), 340-400 (`accountFromRow`, `findAccountByEmail`), 480-530 (`blockAccount`, `unblockAccount`): to see that every operation uses `BEGIN IMMEDIATE` and what the row check refuses.
- `src/server/account-policy.ts:83-88` (`normalizeEmail`): the executor's open question on non-ASCII lower-casing and the sort.
- `guidelines/testing.md` lines 1-482, whole (the handoff names the file; its *Trust boundaries* row for `src/server/` and the integration-test *Files* list bore on M1).
- `foundations/decisions.md` D-410 and D-411 (`:10894-10936`) and D-137 (`:3082-3103`) whole, by the ranges the handoff gives.
- `scripts/test.py` lines 1-60: to see what `npm test -- <file>` and the full gate run, to choose my own commands.

## Working copies

- `.runs/review-2/wt` — a detached git worktree of `7fafc743` with a junction `node_modules` to the reviewed worktree's. I removed the junction first (so that the removal did not touch the real `node_modules`), then ran `git worktree remove --force` and `git worktree prune`; `git worktree list` no longer shows it. My scratch files in `.runs/review-2/` (mutation script, copy of `database.ts`) were deleted and the directory removed. Nothing remains.

## Unread material

- `.runs/task-cycles/panel-wlasciciela/reports/executor-2-evidence/*` (the executor's logs): not opened; I reran the checks instead.
- `.runs/task-cycles/panel-wlasciciela/plan.md` beyond the slice copied in the handoff, and `task-frozen.md` beyond the passages copied in the handoff: not read.
- The handoff's *Read* list of the plan: the invariants `foundations/invariants.md:858-907` (blocked-account-access, player-server-session, unblock-restores-no-session, unblock-restores-no-link) and decisions D-112, D-202, D-400: not read whole by me; I read D-137, D-410, D-411 whole, and relied on the handoff's quotation of D-112, D-202 and D-400. `tests/account-storage.test.mjs` read only by running it, not line by line. `.claude/skills/the-way-update-part-map/SKILL.md` and `.the-way/elements/part-map/{template,rules,examples,first_map}.md`: not read; I compared the one-line change to `foundations/part_map.md` by its diff and the passing foundation check.
- `guidelines/coding.md`, `guidelines/coding-database-access.md`, `guidelines/testing.md`: read whole.

## Searches not found or unclear

- A rule of size for `src/server/database.ts` in `guidelines/coding.md` or `coding-database-access.md`: none found (both read whole).
- Whether `guidelines/testing.md`'s integration-test *Files* list is meant to name every new test file: unclear (M1); the list names account-server files individually but `tests/startup.test.mjs` is in *Where in code* only and `tests/account-database-check-standin.mjs` is not in the *Files* list, so the list is not kept strictly per file.
- A way for a sequential test to place a write between a pre-read and the `BEGIN IMMEDIATE` without a hook in the class: not found; hence the suggestion in I1 to observe where the read happens.
