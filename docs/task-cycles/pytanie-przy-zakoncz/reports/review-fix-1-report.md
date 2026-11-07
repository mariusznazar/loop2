PASS cb9d5e74916e6f187691e988b9531206598004ef

# Review of the fix of the findings of the whole-change review

Range `eb1f864..cb9d5e7` (`15dfb9f` code and tests, `cb9d5e7` D-173). `git rev-parse HEAD` in `C:\Storage\repos\loop2-wt\pytanie-przy-zakoncz` = `cb9d5e74916e6f187691e988b9531206598004ef`. Bounded by `reports\findings-1.md` (I-1 blocking; M-1, M-2, M-3 Minor within the task) and the fix report `reports\fix-1-report.md`; method `.the-way/task-cycle/review/fix.md`. No finding is contested by the author.

## Each finding

- **I-1 (blocking) — fixed.** The question is now drawn by the program panel (`src/browser/view/program-panel.tsx`, in `ProgramPanelView` after `.program-actions` and before `.copy-section`), with `ProgramPanel.setQuestion(answers | null)`; `run-screen.tsx` no longer draws it and only calls `panel.setQuestion(open ? controls : null)`. The list „Program:” and „Nowy program” stay where they were; the band of a discovery stays above the panel, so the order is band, list, „Nowy program”, question, „Kopia: …”. Evidence: the screenshot `reports\fix1-question-under-discovery-band.png` (read by me) shows exactly that order and the question directly above „Kopia: Program”; the test asserts `program-list > program-actions > end-question > copy-section > program-editing`, and that the element after the question holds the heading „Kopia: Program”; `tests/view/run-screen.test.mjs` asserts that the question is in the panel and directly above `.copy-section`. The defect (two controls between the question and the heading) no longer exists. Draw-order risk I checked in the diff: `renderScreens` still calls `runScreen.setQuestion` before `runScreen.update`, so the panel may draw once from its previous state and then again from the new one; both draws are synchronous and the final DOM is right (tests 17 pass).
- **M-1 — fixed.** `foundations/decisions.md` D-173 binding text now reads "„Zapisz” saves the copy as „Zapisz w programie” does, replacing the changes its program holds that the copy lacks, or, where its program was deleted, …", and "in a band of the program panel just above the heading of the copy, under the band of a discovery where one stands" (row 8 now written). *Rationale* follows the new place; no derived *Rejected* line was added (WAY-134). Still three binding sentences.
- **M-2 — fixed.** `reports\fix1-programy-after-save.png` (read by me) shows Programy after „Zapisz”: the list with „Program”, the heading „Program” and its groups „Program” (one rule) and „Grupa 2”. The stale `after-save-programy.png` still lies in the git-ignored `.runs/` folder (the author left it; named as wrong in the fix report); it is not part of the repository.
- **M-3 — fixed.** The placement case in `tests/view/end-question.test.mjs` now asserts the order inside the program's area and inside the panel, and that the heading of the copy follows the question; a new case checks that the question stays in the panel while another saved program is picked and never stands on Programy. I ran two of the author's reported mutants only by reading the cases (moved above the list, moved below the copy section would fail the order asserts as written); I did not rerun mutants.

## New findings in the fix range

None Critical or Important.

- **Minor (new, within the fix, blocks nothing).** Header comments of `src/browser/view/end-question.tsx` and `src/browser/view/run-screen.tsx` have uneven line lengths after the edit (a very long line in the middle of each block, run-screen's first block carries `task ekran-przejscia, To do 1 to 8; D-173, task pytanie-przy-zakoncz, To do 1): one header — the character's name, the map's name and the` on one line). Prettier does not reformat comments, so the gate passes; the text is correct. Style only.
- Spacing of the discovery band against „Program:” (they touch in the new screenshot) is as at the base `73751e8`, as the author states; before the fix the question sat between them. Outside the fix diff; not a finding.
- Check against D-324 and the other entries: D-324 names no place and stays true; `copyLacksSentence` moved to `end-question.tsx` (the panel imports it; no import cycle; `tsc` passes).

## Declined to judge

- Look at windows narrower than 1280 px and the `danger` colour of „Odrzuć” under the pointer (not checked by the author either; unchanged by the fix).
- The out-of-scope notes O-1, O-2, O-3 of the earlier report (plan's *Projected entries*, navigation after `halt()` without unsaved changes, `coding-browser-module.md` table row): untouched by the fix and still as reported.

## Checks I ran (command, exit code)

All in the reviewed worktree; `git status --short` clean after.

| Command | Exit | Result |
|---|---|---|
| `git rev-parse HEAD`; `git log eb1f864..HEAD`; `git diff eb1f864..HEAD` read | 0 | head `cb9d5e7` as given |
| `npm test -- tests/view/end-question.test.mjs` | 0 | 17 pass |
| `npm test -- tests/view/run-screen.test.mjs` | 0 | 8 pass |
| `npm test -- tests/view/program-panel.test.mjs` | 0 | 49 pass |
| `npm test -- tests/view/account-screen.test.mjs` | 0 | 126 pass |
| `npm test -- tests/view/discovery-band.test.mjs` | 0 | 9 pass |
| `npm test -- tests/view/react-controls.test.mjs` | 0 | 53 pass |
| `npm test -- tests/view/uncaught-failure.test.mjs` | 0 | 13 pass |
| `npm test -- tests/invariants/test_browser_view_token_values.py` | 0 | pass |
| `npm test -- tests/invariants/test_copy_save.py` | 0 | pass |
| `npx tsc -p tsconfig.browser.json --noEmit` | 0 | no errors |
| `python -B .the-way/elements/common/foundation_check.py` | 0 | `0 errors` |
| `npx eslint --max-warnings 0 src/browser/view tests/view/end-question.test.mjs tests/view/run-screen.test.mjs` | 0 | clean |
| `npx prettier --check --no-config --no-editorconfig --ignore-path .gitignore src/browser tests/view` | 0 | clean |

Not run: `npm test` without an argument (the orchestrator's gate); a real browser (I read the three `fix1-*.png` screenshots only); mutants (not rerun).

## Reaches beyond the dispatch

None beyond the findings file, the fix report and `.the-way/task-cycle/review/fix.md`; `foundations/decisions.md` D-173 read whole at its changed lines.

## Searches not found or unclear

none
