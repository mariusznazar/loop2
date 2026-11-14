# Handoff — the review of the fix, task pierwsza-akcja-od-startu

You are the reviewer of the whole change, resumed for the review of the fix of your findings. You did not make the change or the fix. Read-only; work from the worktree root `the root of the task's worktree`.

## Method

`.the-way/task-cycle/review/SKILL.md` and its file `fix.md` (read whole, as it names for a review of a fix); the review is bounded as `fix.md` gives.

## What is reviewed

- Range of the fix: `17d830188d8469a55518eefa1ab313e5cd41b08f..d925d5ca` (one commit; compute the diff yourself and confirm `git rev-parse HEAD` is `d925d5ca…`). Changed: `foundations/decisions.md`, `foundations/invariants.md`, `tests/sim/new-account-first-pass.test.mjs`; no code of `src/`.
- The findings file the fix was given: `docs/task-cycles/pierwsza-akcja-od-startu/reports/findings-1.md` (F1, M1, M2, M3 from your report), and the fix handoff `reports/fix-handoff.md`.
- The fix report: `reports/fix-report.md` (claims to verify, not evidence).
- **A decision of the human came between your review and the fix**, recorded in `reports/fix-handoff-addendum.md` (read it): the human accepted the measurement 289 of 300 for now; the fix therefore also wrote the decision D-404, rewrote the invariant `new-account-first-pass` to "at least 289 of 300 seeds" and changed the test to assert that figure (one constant) while still reporting the count of the account with everything discovered. Review these as part of the fix: that D-404 is written as the decision template and skill require, that the invariant and the test say the same figure, that nothing else still quotes the old threshold ("at least as many as…"), and that the human's decision is carried faithfully and not widened (it says: 289 of 300 accepted for now, revised in the balance work; the orchestrator's added sentence on the cause in D-404's *Rationale*, "the condition „Sytość poniżej” is revealed only by the first gathered berry (D-121)", is the one you traced on seed 297 — check it matches what you found).
- Your M3 (no real-browser check) was left unfixed by the orchestrator's choice C6: the human's instruction holds heavy local runs until a start signal. Do not grade its absence in the fix as a new finding.
- Findings of yours that the fix had to fix: F1 (D-312 and D-345 now say what the code does), M1 (D-403 *Verification*), M2 (the two invariants derive from D-121 and D-404 only). Judge each: fixed, or not, and whether the fix opened a new fault. A new Critical or Important finding in the fix fails the review; a Minor one does not block.

## Checks you may run and the one you must not

Focused only: `npm test tests/sim/new-account-first-pass.test.mjs` (one file), `npx eslint`/prettier on the changed test, `python -B .the-way/elements/common/foundation_check.py` as your own check. **Not** `npm test` with no argument, no mutation analysis, no real-browser run. Name each check not run, with the reason.

## Report

Write the report to `docs/task-cycles/pierwsza-akcja-od-startu/reports/review-fix-report.md`; its first line `PASS <sha>` or `FAIL <sha>`; every check with command and exit code; **Unread material**; **Searches not found or unclear**. Return the first line, the changed files with line counts, a one-line check result and the report's path.
