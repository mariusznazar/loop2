FAIL 25345f1b8680d93754eeaa36c68633e9f17a3dda

# Review — Slice 1, task `reset-hasla`

Range `95de83b..25345f1` (commits `d6bbc02`, `e8755e8`, `25345f1`). `git rev-parse HEAD` is the head
given. `.the-way` at `a8dfe8a`, not moved.

The code of the slice is correct: every requirement of the Goal was read in the code and checked by
running it, and nothing below is a defect in `src/server/database.ts`. The one blocking finding is a
sentence of a foundation entry, repeated in a test's comment. Counts: **1 blocking, 4 Minor, 0 out of
scope.**

## Critical

none

## Important

### I-1. D-160 now says a player signs in to ask for a password-reset link

- **Where:** `foundations/decisions.md:2902`, last sentence; its echo in
  `tests/account-storage.test.mjs:1346`.
- **What is wrong:** the sentence reads "A link that a block stopped stays stopped after the account
  is unblocked, and the player, signed in again, asks for a new confirmation message with „Wyślij
  ponownie”, or asks for a new password-reset link with „Wyślij odnośnik”." At the base "signed in
  again" belonged to the confirmation message alone; commit `e8755e8` hung the reset clause on the
  same subject, so the participle now governs both.
- **Why it matters:** this is a binding sentence and it is false for the player it speaks of.
  „Wyślij odnośnik” stands only on the form „Nie pamiętam hasła”, which the button under „Zaloguj się”
  opens on the signed-out screen (D-96 as this range changes it, To do 1: "prośbę wysyła odwiedzający
  bez sesji"). A signed-in player has no such button, and a player who forgot the password cannot sign
  in, which is the reason the link exists. So D-160 restates who asks for a link differently from
  D-96, an entry the same commit changes; by WAY-263 that is Important. Slices 6 and 9 are listed as
  depending on D-160, and later agents read the entry as what binds.
- **It also has no source.** The clause is in no row and no To do. Row 10 and the spec's table give
  D-160 only "the refusal's sentence and place hold for a reset link too"; the task's *Decisions in
  play* says the same. The writer's report (`06-foundation-report.md`) does not name it among its
  *Choices and concerns*. Search for "signed in again" in `task.md`, `spec.md`, `plan.md`: 0 hits,
  with the positive control of the same phrase found in the base's `foundations/decisions.md:2898`.
- **Evidence:** reading of the three passages above; the test's comment at `:1346` copies the claim
  ("Signed in again, the player asks for a new link, whose reset works."), and its neighbouring
  confirmation case at `:1171`, where the phrase is true, shows where the wording came from.
- **The way out:** through `the-way-record-decision`, either drop the clause (row 10 asks nothing
  more), or separate the two ways, for example "…and the player asks anew: signed in again, for a
  confirmation message with „Wyślij ponownie”; on the form „Nie pamiętam hasła”, for a password-reset
  link with „Wyślij odnośnik”." Reword the comment at `:1346` to match; the session the test stores
  there is worth keeping, since it proves a session made after the unblock also ends. The assertions
  need no change.

## Minor

### M-1. No test can tell that `resetPassword` is one transaction, or that it reads inside it

- **Where:** `src/server/database.ts:541-543`; the slice's tests in `tests/account-storage.test.mjs`.
- **What:** two mutants pass all 56 cases of the file:
  `reset-no-transaction` (the `transaction` helper replaced by a plain call) and
  `reset-read-before-transaction` (the read moved before `BEGIN IMMEDIATE`). The plan's Risk and the
  slice's Goal both name exactly this. The case at `:1320` proves the link is read again in
  `resetPassword`, which the mutant `reset-no-reread` shows, not that the read holds the write lock:
  its block commits before `resetPassword` starts.
- **Why it matters:** with the second mutant, a block that holds the write lock at the moment a reset
  starts ends with a password set on a blocked account, and nothing goes red.
- **Why Minor and not Important:** the code is right today, proved by run, not by reading alone: on
  the unmutated code a block holding the lock in a worker thread is waited for and seen (`invalid`,
  password unchanged), and a failure forced by an SQLite trigger inside the reset rolls back password,
  sessions and links. D-112 carries the two-transactions clause as an agent's comparison, which this
  review made and which complies. The plan's *Checks* and the spec's *Proved by* do not ask for more,
  and the case they name is present. What is missing is protection against a later change.
- **If wanted:** both probes are small and both mutants die to them. They stand in
  `C:\Users\Mariusz\AppData\Local\Temp\claude\C--Storage-repos-loop2\b53bd467-98b7-4854-82f4-f3b0f2c4c4c9\scratchpad\zz-probe.test.mjs`,
  first and third cases; that file also holds probes that need not be kept. The worker pattern already
  stands in the test file (`simultaneousInserts`).

### M-2. A reset case pins the schema's version number

- **Where:** `tests/account-storage.test.mjs:1232-1236`.
- **What:** `assert.equal(... user_version, 4, "no schema step is added")` inside the success case.
- **Why it matters:** a later, correct schema step breaks a test about password reset, which is the
  question `guidelines/testing.md` "Behaviour, not implementation" asks of each assertion. "No schema
  step" is a property of this change, seen in the diff (`schemaSteps` untouched), and the version is
  already pinned by the migration cases.

### M-3. An assertion about a state the product cannot reach

- **Where:** `tests/account-storage.test.mjs:1230`; the fixture account of the case at `:1198`.
- **What:** the case resets an account whose address is unconfirmed, then asserts `emailConfirmed`
  stays `false`. The executor's report says this was not asked for. A link goes only to a confirmed
  address (`password-reset-verified-email`, Slice 5), so no reset of an unconfirmed account happens in
  the product, and no requirement says what it would do; the case also carries that invariant's mark.
- **Why it matters:** small. The value's source cannot be named ("skąd ta wartość?"), and a reader
  could take the case to show that resets of unconfirmed accounts are expected. The single-use half of
  the invariant is proved properly by the same case.

### M-4. The private read's signature differs from the spec, and the executor reports no mismatch

- **Where:** `src/server/database.ts:508`.
- **What:** spec Decision 6 says the private read "takes a token digest and the time"; the code takes
  the digest and reads `this.now()` itself. `07-slice1-report.md` says "No mismatch".
- **Why it matters:** no effect on behaviour: the clock is read after `BEGIN IMMEDIATE`, which is what
  the spec's reasoning needs, and a probe of expiry between the check and the transaction passes.
  Named so that the report's claim stands corrected, not for a change.

## Declined to judge

- The session write that names a password hash, and `D-112`'s clause about it: Slice 2 (the executor
  says the same).
- Token forms, origin and body guards, enumeration through content or time, and tokens in logs at the
  routes: no route exists in this range; Slices 5 and 6. At this layer the digest is a bound
  parameter, crafted strings are plain misses, and the two new `Error` messages hold no value.
- `Method: test` on invariants whose tests arrive with later slices, against the template's WAY-61
  (writer's concern 3): the orchestrator's ruling and the plan give it; `password-reset-ends-sessions`,
  `account-session-storage`, `account-attempt-limits` and others stand as `Violated: no` before their
  code does. The whole-change review is the place to check every one has its test.
- No critique of the set of entries (writer's concern 8): a process matter named for the orchestrator.
- `guidelines/testing.md`, the styleguide and `guidelines/coding-mail-sending.md` lagging behind the
  entries: Slices 10 and 11.
- What `transaction` does when `ROLLBACK` itself fails, and `BEGIN IMMEDIATE` outside its `try`: base
  code the change only calls. A probe with a held lock showed the reset throwing, changing nothing and
  leaving the link working, which D-218's "any other failure writes nothing" needs.

## The foundation entries, as judged

Read against rows 1-19, To do 5 and 12, the spec's table and the code of this slice. Apart from I-1 no
finding.

- **The code against them:** `D-112`, `D-114`, `D-137`, `D-138`, `D-155`, `D-160`,
  `password-reset-link`, `password-reset-ends-sessions` (its reset half), `player-server-session`,
  `unblock-restores-no-link` and `account-database-schema` all say what `database.ts` does.
- **Projected in full:** D-152, D-153, D-154, `password-reset-verified-email` and the changed sentences
  of `account-email-via-outsider` and `account-email-nodemailer-starttls` match the task's quotations
  word for word. D-152's *derives from D-202* matches the definition (`definicja_mvp_loop2.md:250`,
  "Who can create and use a player account?" is D-202).
- **F1, F2:** all 16 quoted passages found once each in the installed express-session 1.19.0, and both
  sentences agree with that code. The spec's "leaves `save` unwrapped" and F2's citing `wrapmethods`
  do not conflict: the citation serves the case of a request that came without a cookie.
- **D-100, outside the plan's table** (writer's concern 1): carried by spec Decision 7, and its binding
  sentence is needed; no collision with D-139 found.
- **D-218's sentence beyond the plan's label** (concern 4) and **D-215's condition** (concern 2): each
  keeps its source's meaning.
- **Stale lists:** searches for routes and for the lists a reset joins found none left behind.

## The executor's claims

| Claim | Result |
|---|---|
| +63 and +204 lines, one commit | holds |
| 56 tests pass after the code | holds |
| Against empty stubs 4 of 5 new cases fail, the refusal case passes by nature | holds, reproduced with a stub of my own |
| Each condition of the read is load-bearing; seven mutants caught | holds, and the failures it did not read are now read: each mutant failed in the case meant for it. Each of the five new cases has been seen failing, as *Checks* asks. |
| Own-work check names the weakest requirement | partly: it tested the read's conditions and left out the transaction the plan's Risk names, see M-1 |
| ESLint covered by the quality test | holds |
| "No mismatch" with the plan | holds for the plan; see M-4 for the spec |

No invariant test changed: the range only adds cases to the test file. New cases carry the changed
invariants `player-server-session` and `unblock-restores-no-link`.

## Checks run

Unless noted, in a separate detached worktree of `25345f1`, removed afterwards.

| Check | Result |
|---|---|
| `node scripts/test-node-file.mjs tests/account-storage.test.mjs` (the file `npm test -- <file>` runs, after `node scripts/build.mjs`, exit 0) | exit 0, 56 pass, 0 fail |
| 16 mutants of the slice's code, each compiled (`tsc` exit 0) and run against that file | 14 killed, with the failing cases and reasons read; 2 survived, see M-1 |
| Stub of both operations, the executor's first run | exit 1, 4 of 5 new cases fail. My first version did not compile, so its "survived" meant nothing, and it was redone (`tsc` exit 0) |
| Six scratch probes on real SQLite | exit 0, 6 pass after one fix to a probe's own setup: rollback by a forced failure; a held lock; a block holding the lock, through a worker thread; a reset link at `confirmEmailAddress`, and a confirmation stopping no reset link; saved game state and message-count rows kept; expiry between the check and the transaction |
| The same probes against the 2 survivors | both killed (exit 1) |
| `node scripts/build.mjs --check` | exit 0 |
| `node node_modules/eslint/bin/eslint.js --max-warnings 0` on both changed files | exit 0 |
| `npx prettier --check --no-config --no-editorconfig --ignore-path .gitignore` on both files, reviewed worktree, read-only | exit 0 |
| `python -B scripts/test.py tests/quality/test_quality_invariants.py`, reviewed worktree (needs its `.runs/quality-venv`), read-only | exit 0, 5 OK. In the scratch worktree 2 of the 5 could not start, Ruff and ShellCheck having no venv there; not a product failure |
| `python -B .the-way/elements/common/foundation_check.py`, reviewed worktree, read-only | exit 0, `0 errors` |
| `grep -cF` of the 16 quoted passages of F1 and F2 in `node_modules/express-session` | 1 hit each |
| `git status --short` of the reviewed worktree after all of the above | empty; HEAD still `25345f1` |

**Not run:** `npm test` in full, as the handoff says; it is the cycle's own. The route-level behaviour
of a reset cannot be run yet: no route exists in this range.

## Reaches beyond the dispatch

- `.runs/task-cycles/reset-hasla/plan.md:1-58`, *Foundation entries*: the handoff has them judged here.
- `.runs/task-cycles/reset-hasla/task.md` and `spec.md`, whole: to judge the entries against rows 1-19
  and the spec's table.
- `foundations/decisions.md`: the full word-level diff of the range, and D-44, D-98, D-100, D-102,
  D-158, D-211 whole, D-202's heading. `foundations/invariants.md`: `account-session-authorization`,
  `account-session-storage`, `account-attempt-limits`. These are the entries the range changes.
- `C:\Storage\The Brain\The Brain\Notes\Projects\(P) Loop\definicja_mvp_loop2.md:240-252`: D-152's
  projected relation.
- `node_modules/express-session/index.js`, `session/store.js`, `session/session.js`: F1 and F2.
- `tests/quality/test_quality_invariants.py`, `scripts/test.py`, `scripts/build.mjs`,
  `scripts/test-node-file.mjs`: how to run the checks outside the reviewed worktree.

## Searches not found or unclear

- "signed in again" in `task.md`, `spec.md`, `plan.md`: not found (I-1).
- The handoff says change no file, and the method asks for a separate worktree for checks that change
  files. The separate worktree stood under the scratchpad, wrote only git's worktree record in the
  shared repository while it existed, and is removed. Nothing but this report was written in the
  reviewed worktree.
- Otherwise none.
