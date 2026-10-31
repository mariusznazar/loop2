PASS 08df410

# Review of the fix of Slice 2, task `reset-hasla` — range `0fdaffe..08df410`

Blocking: 0. Minor: 0 new. Out of scope: 1 note.

`git rev-parse HEAD` is `08df410`, the given head. The range holds one commit, one file,
`src/server/account-routes.ts`. The reviewed worktree is clean and was not changed. The review is
bounded by `13-slice2-fix-findings.md`, as `.the-way/task-cycle/review/fix.md` gives.

## Findings file

**1. A login stores its session under the hash it read after the check: fixed.**

- `src/server/account-routes.ts:615` passes `checkedHash`, the hash read before `verifyPassword`, and
  `establishSession` hands the caller's value to the store at line 197; the re-read
  account no longer supplies it. The registration at line 542 passes `account.passwordHash`, which
  for an account `createAccount` has just returned is the hash it made (`src/server/database.ts:249-267`).
- The comment on `establishSession` now says the caller names the hash, which is what the code does.
- The design's independence holds, shown on the fix head with a scratch case that reports what a login
  answers and leaves when a reset commits during its password work:

| State of the code | Answer | Sessions | Cookie |
|---|---|---|---|
| F0, the fix head | 401 | 0 | none |
| F1, comparison disabled | 503 | 0 | none |
| F2, comparison disabled and the hash comparison removed from the SQL | 200 | 1 | issued |

  F1 is what spec Decision 7 and D-100 *Rejected* say: the comparison chooses the answer, and the guard
  alone leaves no session. F2 attributes that to the guard: take it away too and the old password
  signs in. At the reviewed head of the first review, the F1 state answered 200 (M1 there), so the
  defect is gone, not merely tried.

No finding was contested by the author.

## What the fix itself broke

Nothing found.

- `signIn` and `establishSession` have no other callers; their two call sites are the ones changed.
- Line order, ticket settlement and answers of both routes are unchanged. Both test files pass at
  the head.
- Its one type effect, named in the fix report's *Observation*, is true and harmless: `checkedHash` is
  narrowed to `string` at line 615 only by the comparison at line 602. A removal of the comparison
  therefore fails the build and has to be decided, which helps.
- `establishSession` now takes `accountId` and the hash, where the plan's Goal and the spec say it
  "takes the account". The fix direction asked for the hash as an argument, and the behaviour the
  sentence exists for is met. It is no defect; the slice's text and the code differ in that word only.

## Out-of-scope note

- Still no committed test tells naming `checkedHash` from naming the re-read hash, since at the head the
  two are equal when the store runs (M3 of the first review). The first review recorded this under the
  finding's limits. Only F1 by hand shows it, plus the build error above. It stays a note: a test for
  it would have to reach an unreachable state.

My Minor findings 2 and 3 of `12-slice2-review-report.md` are not part of this fix and stand as graded.

## Declined to judge

- Everything outside the diff `0fdaffe..08df410`, as `fix.md` bounds this review.

## Checks run

All in a scratch detached worktree of `08df410`, removed afterwards, with `node_modules` linked from the
reviewed worktree. The product's gate was not run, as the message gives.

| Check | Result |
|---|---|
| `git rev-parse HEAD`, `git log 0fdaffe..HEAD`, `git diff 0fdaffe..08df410` | head matches; one commit |
| `node scripts/build.mjs --check` (the `typecheck` script) | exit 0 |
| ESLint `--max-warnings 0` on `src/server/account-routes.ts` | exit 0 |
| Prettier `--check` with the guideline's flags on the same file | exit 0 |
| `node scripts/test-node-file.mjs tests/http.test.mjs` | exit 0, 41 pass, 0 fail |
| `node scripts/test-node-file.mjs tests/account-storage.test.mjs` | exit 0, 59 pass, 0 fail |
| F0 `node --test --test-name-pattern=…` on the login case and a scratch observing case | exit 0; observed 401, 0 sessions, no cookie |
| F1 comparison disabled, `checkedHash!` for the type | exit 1 on the login case, `503 !== 401`; observed 503, 0 sessions, no cookie |
| F2 as F1, with the hash comparison removed from the SQL | exit 1, `200 !== 401` and `1 !== 0`; observed 200, 1 session, cookie issued |

**Could not run / not run:** `tests/quality/test_quality_invariants.py`: its Ruff and ShellCheck cases
need `.runs/quality-venv`, which a fresh worktree lacks, and the fix touches no Python or shell, so I ran
its ESLint and Prettier rules on the changed file directly instead. The fix report's exit 0 for that file
is its own record.

## Reaches beyond the dispatch

- `src/server/database.ts:249-267`, known from the first review: that `createAccount` returns the hash
  it was given, for the registration's argument.

## Searches not found or unclear

none
