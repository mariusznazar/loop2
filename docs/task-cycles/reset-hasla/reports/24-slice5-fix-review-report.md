PASS 8fe869d88cdcf40801d9b1198d4fa9ee836a5fb8

# Review of the fix of Slice 5

- Task `reset-hasla`, range `b966a74..8fe869d` (one commit, `8fe869d`), reviewed as `.the-way/task-cycle/review/fix.md` gives. `git rev-parse HEAD` is `8fe869d`.
- Process pin: `git -C .the-way rev-parse HEAD` shows `a8dfe8a`, the commit `git ls-files --stage -- .the-way` records.
- Bounded by `reports/23-slice5-fix-findings.md`; the author's claims are in `reports/23-slice5-fix-report.md`.
- Paths below are relative to the worktree root `C:\Storage\repos\loop2-wt\reset-hasla`.

**Verdict in short.** Both blocking findings are fixed: on the new head, the faults they describe fail a test. The fix changes `tests/http.test.mjs` alone and broke nothing I could find. No finding was contested. Counts: 0 blocking, 2 Minor notes, 0 new out-of-scope.

## The findings

### 1. Nothing fails when the work on an account moves before the answer — **fixed**

The new test at `tests/http.test.mjs:2634` records the order of the response's `finish` event and of the two hooks. Run on my own mutants at `8fe869d`:

| Mutant | `tests/http.test.mjs` | Failing test |
|---|---|---|
| `workBeforeAnswer`: the work, then the 204 (the finding's first mutant) | exit 1, 56 of 57 | the new test |
| `workSameTurn`: the 204, then the work with no `setImmediate` (its second) | exit 1, 56 of 57 | the new test |
| `lookupBeforeAnswer`: only the lookup before the 204, the recording after (new) | exit 1, 55 of 57 | the new test, and the failed-lookup test |

The third mutant is the partial form of the fault: it shows the test holds the lookup and the recording apart. The output on it reads `lookup, answer, lookup, record` against the expected `answer, lookup, record`.

The test's expected order comes from D-214, *Verification*, *violates*: "a lookup of the account or the recording of a link before the response has ended", as its comment says. The comments of the two earlier tests no longer claim the fault, so the claim stands where it is checked.

**Stability, checked because the test rests on when `finish` fires:** 40 of 40 runs passed, in four loops of ten side by side so that they ran under load, each run holding three orderings.

**A mutant that passes, and why it does not reopen the finding.** `workNextTick` keeps the 204 first and moves the work into `process.nextTick` instead of `setImmediate`. It stays green at 57 of 57. I expected it to fail, so I looked at why it passed: the order assertion passing means `answer` was recorded first, so the response had finished before the lookup. That is what D-214 requires, and the timing of this answer is not exposed. `setImmediate` is how Decision 2 gets there, and a test holding that exact call would pin an implementation detail against `guidelines/testing.md`, *Behaviour, not implementation*. I read it as equivalent under D-214, not as a gap.

### 2. The route may send the confirmation message's text with a reset link — **fixed**

`tests/http.test.mjs:2891` now asserts the subject of every message the route handed on. With `compose: composeConfirmationMessage` in the `reset` row, `tests/http.test.mjs` exits 1 at 56 of 57, and the failing test is the one holding that assertion, "a recorded reset link lives one hour…". The expected value is the decision's own: `foundations/decisions.md:4074`, inside D-219 (`:4071`), says „Ustaw nowe hasło w loop2”. The subject comes only from the composer, and two composers exist, so the subject tells them apart.

## The fix diff

No new Critical or Important finding. Checked:

- `listening` joins the object `accountFixture` returns (`tests/http.test.mjs:360`). It is the variable the fixture already holds, and no other test uses it.
- The listener the new test adds only pushes to a list.
- `order.length = 0` before each request keeps each run's order its own.
- Neither assertion was weakened. The only removed lines are the two comment claims, whose faults the new test now holds, and the old wording of the third comment.
- `src/server/account-routes.ts` is unchanged in the range. The review of Slice 5 stands for it.

## Minor notes (none blocking, outside what the findings required)

- The new test covers a request with no session. The scratch variant with a valid session of the sender, which passed at `b966a74`, was not added, and the finding named it only as evidence. That path goes through express-session's wrapped `response.end()`. It ends the response in the same turn only because the store's `touch` is synchronous (`src/server/session-store.ts:156-188`), and no test holds that order.
- `tests/http.test.mjs:2892`, the `confirm-email` check, stays. It is an unchanged line and harmless, but it still cannot fail on its own: a wrong fragment fails `resetTokenOf` first. Nothing claims otherwise any more.

## Earlier findings not part of this fix

Findings 3 and 4 of `22-slice5-review-report.md` and its one out-of-scope item stay as graded, as the dispatch gives. `tests/http.test.mjs:2878-2883` moved with the added lines; their content is unchanged.

## Checks

All runs were in a detached scratch worktree of `8fe869d`, with `node_modules` linked from the reviewed worktree. It has been removed; the reviewed worktree's head is `8fe869d` and its `git status --short` is empty. The linked `node_modules` was checked intact after removal.

| Check | Result |
|---|---|
| `npm test -- tests/http.test.mjs` at head | exit 0 (57 of 57) |
| `npm test -- tests/transport.test.mjs` at head | exit 0 |
| `npm run typecheck` at head | exit 0 |
| `npm test -- tests/quality/test_quality_invariants.py` at head | exit 1, see below |
| `node --test --test-name-pattern="the answer to a request for a reset link ends" tests/http.test.mjs`, 4 parallel loops of 10 | 40 of 40 passed |
| The five mutants above, each with `npm test -- tests/http.test.mjs` | four exit 1, `workNextTick` exit 0 |

**Could not run:** `test_ruff_source_rules` and `test_shellcheck_source_rules` errored in the scratch worktree, as they did in the review of Slice 5: `FileNotFoundError` on launching the tool through `venv_tool(...)`, which says nothing about the code. `test_eslint_source_rules`, `test_prettier_source_format` and `test_introduced_npm_vulnerabilities` passed there. The fix changes no Python or shell file. The author's exit 0 for this file in the reviewed worktree was therefore not reproduced in full.

The product's gate and `foundation_check.py` were not run, as the dispatch gives. The mutants ran against `tests/http.test.mjs` only, because `tests/transport.test.mjs` is unchanged in the range.

## Reaches beyond the dispatch

- `foundations/decisions.md:4071-4074` (D-219): the source of the subject the new assertion expects.
- `tests/quality/test_quality_invariants.py:40-68`: the names of the five quality tests, to say which of them ran.
- `src/server/session-store.ts:156-188`, read in the review of Slice 5: for the first Minor note.

## Searches not found or unclear

- Where `venv_tool` resolves its tools: not looked up, as in the review of Slice 5; see *Could not run*.
