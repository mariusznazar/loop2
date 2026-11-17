# Report - executor of slice 13 (Decisions of saving the game)

**Status:** done
**Commit:** `2a2f1607` on `task/poprawki-brzmienia-fundamentu` (slice base `578d13d2`)
**Checks:** foundation check 0 errors (with and without `--skip-test-citations`); four focused test files pass; prettier clean. One line for the orchestrator: all checks run, none failed.

## Files changed

| File | Lines changed (+/-) |
|---|---|
| `foundations/decisions.md` | 3 / 3 |
| `tests/view/account-screen.test.mjs` | 8 / 8 |
| `tests/view/state-store.test.mjs` | 4 / 4 |
| `tests/view/game-saver.test.mjs` | 3 / 3 |
| `tests/view/previous-save.test.mjs` | 1 / 1 |

Total: 5 files, 19 insertions, 19 deletions. The test files use CRLF line endings; the edits are single-line substring replacements, and the diff stat stays at the changed lines only, so the line endings are kept.

## Items of the slice

1. **D-207, the sentence on the saves "among them" (To do 7.13, D-207 item).** Made. In `foundations/decisions.md` (the first binding sentence of D-207) the phrase `makes — an edit of a program or of the copy,` became `makes — among them an edit of a program or of the copy,`. The task wrote the list as `…`; the rest of the list stays as it stood.
2. **D-04 cites D-208 at its sentence on the save (To do 7.13).** Made. In D-04 the phrase `the saver's sentence for the row of saving (D-207, D-407)` became `(D-208, D-407)`.
3. **D-04 names the previous-save privilege D-400 (To do 7.13).** Made, with a wording of my own, because the task names the fact and gives no sentence. D-04 now reads: `the pull of the previous save and the reset control of Programy, which draw their buttons from the previous-save privilege the page keeps from the account's answer (D-400, D-401, D-402)`. The privilege is not in the game state; it sits in the list of the page's memories, since the page keeps it from the account's answer. Cost if the wording is wrong: a reviewer may want its own sentence instead of the list item; the binding meaning of D-04 does not change beyond naming the source.
4. **Quotations of D-207 broken by item 1 (rule 4).** Made. 15 quotation lines of `decision: D-207 "The game saves …"` changed in the four files of *Change*: `account-screen` 8, `state-store` 4, `game-saver` 2, `previous-save` 1. Each now carries the same span of the new sentence. The other D-207 quotations (`The 30-second rhythm …`, `A save whose body is larger …`) are in sentences 2 and 3 and stand unchanged, including those in `tests/account-api.test.mjs`, which is not in *Change*. The quotations of D-04 (`The game is written in TypeScript`, in `tests/invariants/test_browser_view_framework.py`) stand, since sentence 1 of D-04 is unchanged.
5. **Comment over `BREAKS` in `tests/view/game-saver.test.mjs` (To do 7.14 (d)).** Made. `each has \`breaks(), mend()\`` became `each has \`extra\` or \`client\``. The table's entries are `extra` (the read of the state and the clock's moment) and `client` (the client throwing and the client's promise being rejected).
6. **D-208 clause `tests:` says that the retry sends the game state of its moment and that the sentence goes after a successful retry (To do 7.14 (c)).** Already made. The clause in `foundations/decisions.md` (D-208 *Verification*) reads: `the retries after 5, 10 and 20 real seconds and then every 30, each with the game state of its moment, a moment of saving sending at once, until a save succeeds and the sentence goes`. No edit made.

Items of To do 7.13 and 7.14 that name other files (`src/browser/program-panel.css`, the styleguide paragraph, `tests/view/scene.test.mjs`, `tests/view/program-editor.test.mjs`, D-57, D-367, D-208 quotations beyond the clause) are outside this slice; I did not touch them.

## Checks

| Check | Command | Exit | Result |
|---|---|---|---|
| Foundation check, rule 3 (after the entry) | `python -B .the-way/elements/common/foundation_check.py --skip-test-citations` | 0 | `0 errors`; 6 `listed:` lines |
| Foundation check, end of slice | `python -B .the-way/elements/common/foundation_check.py` | 0 | `0 errors`; the same 6 `listed:` lines |
| Focused test, account-screen | `npm test -- tests/view/account-screen.test.mjs` | 0 | 133 pass, 0 fail |
| Focused test, state-store | `npm test -- tests/view/state-store.test.mjs` | 0 | 12 pass, 0 fail |
| Focused test, game-saver | `npm test -- tests/view/game-saver.test.mjs` | 0 | 25 pass, 0 fail |
| Focused test, previous-save | `npm test -- tests/view/previous-save.test.mjs` | 0 | 46 pass, 0 fail |
| Prettier | `npx prettier --check` on the four test files | 0 | All matched files use Prettier code style |

Not run: the product's full gate (`npm test` without a file), by the handoff.

**`listed:` lines.** All six name entries of `foundations/invariants.md` (lines 5, 354, 668, 978, 1158, 1288: `account-server-runtime`, `terrain-drawing-numbers`, `player-opaque-session-cookie`, `trip-plan-progress`, `loop-run-knowledge`, `sprite-credits`). None is a decision and none of them is in my commit; my commit does not touch `foundations/invariants.md`. The file differs from the fork point `f66ae6eb` by 10 lines, made by earlier slices of this branch; I did not identify which slice made each listed line.

## Own-work check

- **Requirement:** each quotation of a changed binding sentence must stand in the new sentence, and no D-207 quotation may remain on the old wording.
  **Check:** the foundation check reports quotations that stand in no binding sentence; it reported 0 errors after the edits. A `git grep` for `makes — an edit of a program or of the copy,` finds it in no test and no decision after the commit.
  **Showed:** 0 errors; the old phrase is gone from the four test files.
- **Requirement:** the BREAKS comment must match the table's keys.
  **Check:** read the table keys at `tests/view/game-saver.test.mjs` (`extra` at the read and the clock; `client` at the client's throw and rejection).
  **Showed:** the comment names exactly those two keys.
- **Requirement:** the four focused test files still pass.
  **Check:** the four `npm test -- <file>` runs above.
  **Showed:** all pass; no rerun was needed.

## Unread material

- `guidelines/styleguide-browser-view.md` lines 908–1166: the slice's *Read* names the file whole; I read lines 1–907 only. The slice changes no styleguide text, so the unread part does not bear on the change.
- `src/browser/view/game-view.ts`: named in the slice's *Read*; not read. No code changed.
- `.the-way/elements/decisions/examples.md` names WAY-03 of the-way's log; I did not open that entry (the example form is not needed for a wording edit).
- `guidelines/coding.md`, `guidelines/testing.md`: read whole (testing in two pages).
- `foundations/decisions.md`: read the ranges of *Read* whole: D-04 (59–188), D-207 and D-208 (3748–3860), D-400 to D-402 (4074–4121). Nothing else of the log was opened.
- `.runs/task-cycles/poprawki-brzmienia-fundamentu/task.md` and `plan.md`: read the named passages only.

## Searches not found or unclear

- The To do 7.14 (c) clause: I expected to find it missing, but the D-208 clause already says the retry and the sentence (see item 6). Recorded as already made.
- The task's wording for the D-04 addition of D-400 is absent; the wording in item 3 is my choice.
- `foundations/decisions.md` mentions the privilege only in D-400 to D-402 and in D-04 (now); no other decision cites it.

## Reach beyond the handoff

- `git grep` for quotations of `decision: D-207`, `D-208`, `D-04` and `D-400` across `tests/`: to find the lines rule 4 covers.
- `git diff --stat f66ae6eb..2a2f1607 -- foundations/invariants.md`: to explain the six `listed:` lines.
- `.ai/rules/git.md` (the user's git rules), read when the commit was attempted; the commit message follows the repository's `docs: :memo:` form in English, and the files were added by path.

## Working copies

- `.runs/executor-13/`: made for the foundation-check and test logs; removed (`rm -rf`) after the checks. Nothing remains.
- No worktree or clone was made.
- Nothing of the copies is kept in `reports/`; the check results are in the table above.
