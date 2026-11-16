PASS d164271d2f6237c658306a72ca2ebc9fa81249c3

# Review of the fix of I1 (review of the return step's range)

- Range: `80cdb843c85a95e12773753cb47af6632e643ba5..d164271d2f6237c658306a72ca2ebc9fa81249c3` (1 commit, `d164271d`). `git rev-parse HEAD` = `d164271d2f6237c658306a72ca2ebc9fa81249c3`, the head given.
- Method: `.the-way/task-cycle/review/SKILL.md` with `fix.md`. The findings file is `reports/findings-return.md`, which holds I1 alone. The fix report is the section *Fix of I1* in `reports/return-step-report.md`.
- Result: I1 is **fixed**. The fix brings no new Critical, Important or Minor finding.

## The finding

**I1: fixed.** D-402, paragraph 2, sentence 2 (`foundations/decisions.md:3939`) now reads: "An outcome of the saver of the game a reset built is not held for the logout of the old game, which may still wait for its answer."

- **Agrees with the code.** The fix range does not change `src/` (`git diff --quiet … -- src` exits 0), so I read `app.ts:508-522` again at the head. `whenNotBusy(view, …)` holds an outcome only when the reset or the logout of the game `view` itself waits, through `gameOf(view)`, and the reset of the old game ends at 204.
  - After a reset builds the new game, the old game's logout belongs to a game the page no longer holds. The new game's own `logout` is `idle` (`:576`), so its outcome is not held for the old logout. That is what the sentence says.
  - The two holds the finding named stay outside the sentence: the new game's own logout and the new game's own second reset. The sentence now denies only the hold for the old game's logout.
- **No contradiction with paragraph 1.** During a second reset, paragraph 1 holds the outcomes of "the old game's saver", which is then the game the first reset built. Paragraph 2 no longer says those outcomes act at once.
- **No contradiction with the *Rationale*.** The *Rationale* (`:3949`) says "its outcomes are held neither with those of the old game nor until the old game's logout answers". That is the same scope.
- **The quotation.** `tests/view/previous-save.test.mjs:1498` quotes the new sentence word for word, and it begins a sentence of D-402. `git grep` finds the text only at `decisions.md:3939` and that line. The foundation check accepts it (exit 0). No other test quoted the old wording: `git grep "acts at once, also while"` finds nothing.
- **The clause `tests:`.** It is unchanged: "a conflict and a missing session answered to the saver of the game a reset built, while the logout of the old game still waits, acting at once, the conflict reloading the game and the missing session showing the forms".
  - The `HELD_OUTCOMES` cases (`previous-save.test.mjs:1494-1532`) still hold it. In them the new game's own reset and logout are idle, so "acting at once" is exact there. Both cases pass.
  - The clause is limited to the old game's logout, as the sentence is.

## New in the fix diff

None. The diff changes one sentence of D-402 and the one comment line that quotes it. No assertion changes, and no file outside `foundations/decisions.md` and `tests/view/previous-save.test.mjs` changes.

## Declined to judge

- Prettier reports a style issue in `foundations/decisions.md`. The fix did not cause it: the same check fails on the file as it stood at `80cdb843` and at `f89dbd09`. The decision file has no formatting rule in this repository's checks. The fix diff changes only text inside a paragraph.

## Checks run (from the root of the reviewed worktree)

| Check | Command | Result |
|---|---|---|
| head | `git rev-parse HEAD` | `d164271d…`, as given |
| code unchanged | `git diff --quiet 80cdb843..d164271d -- src` | exit 0 |
| foundation | `python -B .the-way/elements/common/foundation_check.py` | exit 0, `0 errors` |
| previous save | `npm test -- tests/view/previous-save.test.mjs` | exit 0, 46 tests, 46 pass |
| format, changed files | `npx prettier --check tests/view/previous-save.test.mjs foundations/decisions.md` | exit 1, a warning for `foundations/decisions.md` only; the test file passes |
| format, decision file before the fix | `git show 80cdb843:foundations/decisions.md \| npx prettier --check --stdin-filepath foundations/decisions.md`; the same at `f89dbd09` | exit 1 both: the issue is older than the fix |
| old wording left | `git grep -n "acts at once, also while" -- foundations tests src guidelines` | exit 1 (no hit) |
| quotation | `git grep -n "An outcome of the saver of the game a reset built" -- foundations tests` | `decisions.md:3939`, `previous-save.test.mjs:1498` |
| worktree state | `git status --short` | empty |

Not run: the whole `npm test`, which is the orchestrator's alone.

## Reaches beyond the dispatch

- `src/browser/view/app.ts:508-522`, `:576`, `:705-722`, read in the earlier review of this range and again now at the unchanged code: for the scope of the sentence.

## Working copies

- `.runs/review-return-fix/`: the log of the test run. Removed.
- Nothing else; `dist/` from `npm test` is the product's own output and stays.

## Unread material

- `reports/return-step-report.md`: the section *Fix of I1* read whole; the rest was read in the earlier review.
- D-402: paragraph 2, the clause `tests:` and the *Rationale* read again at the head; paragraph 1 was read whole in the earlier review, and the fix does not change it.
- Otherwise none.

## Searches not found or unclear

- None.
