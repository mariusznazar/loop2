PASS 52772de3e7a3d605703d73916839c9268b854124

# Review of the fix of the three Minor findings

Variant: review of a fix (`.the-way/task-cycle/review/fix.md`). Range `8f8b911c21c4eb3b76efc2bfeae6e7cdb093557b..52772de3` (one commit, `52772de3e7a3d605703d73916839c9268b854124`, `foundations/decisions.md`, +3 / −3). `git rev-parse HEAD` in `the worktree's root` is that commit. Read-only; worktree status empty after my checks.

Counts: 3 findings fixed, 0 remain; new findings in the fix: 0 Critical, 0 Important, 0 Minor.

## Each finding of `reports/findings-whole-minor.md`

1. **D-144 over-claims the ranks as the predecessor game's: fixed.** `foundations/decisions.md` (D-144, heading at line 2995), *Rationale* now reads „…are those of the predecessor game, loop, taken as the requirement, except the ranks of the two combat branches „Mocniejszy cios” and „Cięższy kop”, which D-379 sets.” That is the clause the finding suggested. Evidence: the word-level diff shows only that addition in D-144; the binding sentence, bases (6, 3, 5), wolf and *Verification* are unchanged. The two named branches are exactly those whose rank counts differ in `src/browser/sim/data/skills.ts` (`costs` at lines 163 and 171). D-144's *Rejected* line („another initial balance — departs from the accepted predecessor numbers”) is untouched; read with the new exception in the *Rationale* it no longer contradicts D-379. I do not count that as a remaining defect, since the finding named the *Rationale* sentence and the suggested fix was one clause.
2. **D-379 *Rejected* dropped the old line: fixed.** *Rejected* now opens „other numbers for the other skills given by the human instead of the old loop game's data;” followed by the unchanged list of the task's rejected combat ways. The restored line is narrowed to the five skills whose numbers did not change, as the finding proposed. It agrees with the binding paragraph and the *Rationale* (the five skills keep the old game's numbers), and does not contradict the combat numbers (they are not „other numbers for the other skills”).
3. **D-379 *Rationale* „no longer”: fixed.** „are no longer the old loop game's” became „are not the old loop game's”; the rest of the sentence is unchanged (word diff: `-no longer +not`).

## The fix diff itself

`git diff --word-diff` of the range shows exactly these changes and no other: one clause in D-144's *Rationale*, one word in D-379's *Rationale*, one lead-in in D-379's *Rejected*. The D-379 binding paragraph and *Verification* are unchanged, so the numbers match the code and tests I reviewed before. No code or test file is in the range. The entries still describe the decision as it stands (WAY-07); no count of files or tests was added (template rule on *Rationale* and *Rejected*).

## Checks I ran (command, exit code)

| Command (cwd `the worktree's root`) | Exit |
|---|---|
| `git rev-parse HEAD` (equals `52772de3e7a3d605703d73916839c9268b854124`) | 0 |
| `git diff --word-diff=porcelain --word-diff-regex='[^ ]+' 8f8b911c..52772de3 -- foundations/decisions.md` | 0 |
| `python -B .the-way/elements/common/foundation_check.py` | 0 ("0 errors") |
| `git status --short` after the checks | empty |

No test was run: the range holds no code or test file, and the earlier focused tests of the unchanged code stand from my previous report.

## Declined to judge

- The author's claim that the six neighbour decisions (D-143, D-144, D-145, D-146, D-189, D-329) hold no further stale numbers: I did not re-read D-143, D-145, D-146, D-189 and D-329 whole in this review. In the earlier review my text search of the log for the old values found only D-379 and its own new text, and the fix report states each was read whole with no change due. I accept that as the author's claim and have not verified it beyond that search.

## Unread material

- Fix review, not a whole-change review, so no decision counts. Read whole: D-144 and D-379 in the fix diff (word-level), the findings file, the fix report, `.the-way/task-cycle/review/fix.md`.
- Not read in this review: D-143, D-145, D-146, D-189, D-329 (see Declined to judge); guideline files (the fix touches no code, test or screen; I read them whole in the earlier review).
- `reports/review-whole-report.md` is my own earlier report.

## Searches not found or unclear

- none
