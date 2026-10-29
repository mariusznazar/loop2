# Review fix report

Status: done

Base: `c39e10ca539ee79048d6989f1287582119751c8c`.
Head: `0533a13aa5ac9a147f81da768227d101dbace033` — `test: :white_check_mark: cover minimum trip item count`.
Worktree: `C:/Storage/repos/loop2-wt/plan-wyprawy`, branch `task/plan-wyprawy`.
Pinned `.the-way` HEAD and gitlink both verified as `a8dfe8ac62885e88bc8f463e93ab16b621d48e92`.

Changed file: `tests/sim/trip.test.mjs`, +16 / -0. No production or foundation changes. The temporary mutation in `programs.ts` was restored before green verification and has no diff. Working tree clean after commit.

## I1 response

Fixed Important I1, “Test poprawnego planu pomija minimalną dozwoloną liczbę 1”, from `review-findings.md`. The new test executes the real `editProgram` operation with one stick on both take and bring lists, explicitly asserts the operation does not throw, and checks the saved plan retains both entries with count 1. This is the simulation operation used when adding to a saved program; no UI replacement or assertion on diagnostic wording was introduced.

Own-work check / weakest point: a direct validator-only test might miss that the accepted value actually reaches the saved program. The new test checks the state returned by the real edit operation. Temporarily changing exactly `count < 1` to `count <= 1` makes the new assertion fail, while the other 13 trip tests pass. Restoring the condition yields 14 passing tests. The test would also fail if edit silently discarded or changed the count. This directly addresses surviving Stryker mutant 53 without running reviewer-owned Stryker.

## Exact commands and results

All commands below ran from the worktree root. Logs live under `.runs/task-cycles/plan-wyprawy/`. No command listed as a check was repeated to reconstruct evidence.

First regression probe after adding the behavioral case, with temporary `<= 1` mutation:

```powershell
npm test -- tests/sim/trip.test.mjs > .runs/task-cycles/plan-wyprawy/fix-count-one-red.log 2>&1; $result = $LASTEXITCODE; Get-Content -Tail 28 .runs/task-cycles/plan-wyprawy/fix-count-one-red.log; exit $result
```

Exit **1**: 14 tests, 13 pass, new test fails with validator exception. At this point the unexpected exception occurred before the state assertion. To make the required rejection proof an explicit assertion failure, wrapped the operation and state assertion in `assert.doesNotThrow`, then ran:

```powershell
npm test -- tests/sim/trip.test.mjs > .runs/task-cycles/plan-wyprawy/fix-count-one-assertion-red.log 2>&1; $result = $LASTEXITCODE; Get-Content -Tail 28 .runs/task-cycles/plan-wyprawy/fix-count-one-assertion-red.log; exit $result
```

Exit **1**: same single failed test, now `AssertionError [ERR_ASSERTION]: Got unwanted exception.` The actual operation rejects the minimum count. No diagnostic text is asserted.

Restored production `count < 1`, then:

```powershell
npm test -- tests/sim/trip.test.mjs > .runs/task-cycles/plan-wyprawy/fix-count-one-green.log 2>&1; $result = $LASTEXITCODE; Get-Content -Tail 10 .runs/task-cycles/plan-wyprawy/fix-count-one-green.log; exit $result
```

Exit **0**: 14 tests pass, zero fail.

```powershell
npm test -- tests/quality/test_quality_invariants.py > .runs/task-cycles/plan-wyprawy/fix-quality.log 2>&1; $result = $LASTEXITCODE; Get-Content -Tail 8 .runs/task-cycles/plan-wyprawy/fix-quality.log; exit $result
```

Exit **0**: 5 quality tests pass, including formatting/lint. No separate formatting invocation needed.

```powershell
git diff --check; git diff --stat; git diff -- src/browser/sim/programs.ts tests/sim/trip.test.mjs
```

Combined exit **0**, output contains only the +16-line test. Because that combined command retains only the last exit, whitespace check was also run separately:

```powershell
git diff --check
```

Exit **0**, no output.

```powershell
git add tests/sim/trip.test.mjs
git commit -m "test: :white_check_mark: cover minimum trip item count"
git rev-parse HEAD
git status --short
```

These were four separate tool invocations, each exit **0**. Commit produced the head above; status had no output.

## Choices, scope and unrun checks

Chosen saved-program edit API rather than a direct checkProgram-only assertion to cover acceptance and persisted edited content together. A browser automation addition would increase maintenance for this validator boundary without improving the targeted regression proof; existing manual UI evidence already demonstrates the actual Add action supplies 1. Cost: the test intentionally does not claim to exercise the DOM event path.

No reaches beyond selected simulation tests and existing coding/testing guidelines; no new foundation meaning, invariant, dependency or trust boundary. No new UI or product behavior to inspect. Minor M1 and declined/future-task matters were not changed. Full gate remains parent scope; Stryker and fix verdict remain reviewer scope. No unresolved concern within I1; earlier report limitations remain as recorded.

## Searches not found or unclear

None during this fix. The named test, validator condition and review finding were found directly.
