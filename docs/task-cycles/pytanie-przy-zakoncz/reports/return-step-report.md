# Return step — Pytanie „Zapisać, odrzucić, wrócić?” przy „Zakończ”

Status: **done**. One commit written, head `6a02418` (on top of `cb9d5e7`; address `mariusznn@gmail.com`; not pushed).

- `6a02418` docs: :memo: say in D-324 which edit takes the question away as D-171 measures the copy, and in D-173 where it stands while another program is shown (also `tests/view/end-question.test.mjs`, see below)

Read whole: `.the-way/task-cycle/skill/return_step.md`, `foundation_step.md`; the decisions skill and template as in the earlier foundation step (this round writes only edits of D-173 and D-324 in place). Gate not run.

## Foundation compared with code

Compared with the code at `cb9d5e7`:

| Entry | Compared with | Result |
|---|---|---|
| D-173 | `game-view.ts` (`end`, `saveAndEnd`, `discardAndEnd`, `back`, `endRun`), `program-panel.tsx` (place), `end-question.tsx`, `sim/programs.ts` (`saveCopyIntoProgram`, `saveCopyAsNewProgram`, `suggestedProgramName`, `copyHasUnsavedChanges`), `sim/game.ts` (`end`) | Everything matched except one case the code makes: while the panel shows another saved program (the player picked one on the list „Program:” with the question standing) there is no heading of the copy, and the question stays standing after „Nowy program”, where the heading would be. D-173 said only "just above the heading of the copy". **Corrected**: "…just above the heading of the copy, or, while the panel shows another program, where that heading would stand, …". The claim "the program editor shows the program the copy belongs to, the new program where „Zapisz” made one" was not asserted by any test (the test title said so); I verified it (`countsProgram` = the new program) and added the assertion to the test case of the save of a copy whose program was deleted; it passes. |
| D-324 | `game-view.ts` (`end`, `back`, `closeQuestion`, `togglePause`, `restart`, `show`, `store.apply` reconcile), `clock.ts`, tests | One imprecise word: "an edit after which the copy equals its program". The code (and D-171) measures the copy against the program as the copy was taken from it or last saved into it (`copyHasUnsavedChanges` compares with the copy's base, not the program's present content). **Corrected**: "…an edit after which the copy no longer differs from its program as D-171 gives". Rest matched: pause as „Pauza”, `resume` only if the map run went on, „Wznów” (header and band) and „Restart” close the question, leaving the screen closes it with the map run left paused, page memory only. |
| D-44 | `end-question.tsx` (`kind="destructive"` on „Odrzuć”), styleguide rule | Matches; none. |
| D-53, D-62, D-132 (task names) | `endRun` → `show({ kind: "character" … }, "go")` | Match: „Zakończ”, after the answer where there is one, leads to Postać. Not changed. |
| D-164, D-168, D-171, D-172 (task names) | `saveCopyAsNewProgram` with the first free name, the line of D-172 in the question, `programHasChangesCopyLacks` | Match; none. |
| D-21, D-122, D-283, D-284, D-212, D-129, D-130, D-132, D-311, D-323, D-303, D-308, D-312, D-313 (task names) | code of the header, the band, `show`, `pauseOnLeaving`, `halted` | Match; D-323: after `halt()` the question's handlers return first, so the game state held changes no more (test "after halt() …"). D-311 sentence on the header stays true („Zakończ” stays in the header). None changed. |
| D-174, D-180, D-250, D-275, D-280, D-281, D-287, D-322 (search found) | the places naming „Zakończ” or D-173 | Match: D-174's violating example ("a question … before the switch") concerns the switch, which asks nothing; D-180 and D-281 stay true; none changed. D-212's *Rejected* still says the line „Niezapisane zmiany w kopii.” "warns before „Zakończ”" — it does (the line stands beside the question). |
| Invariant `copy-save` | `saveCopyIntoProgram`/`saveCopyAsNewProgram` unchanged; the question's „Zapisz” calls them and then `end` | Matches; its test (`tests/invariants/test_copy_save.py`) passed in the earlier rounds. |
| Part map: `browser-view`, `simulation`, `product-foundation`, `agent-workflow` | `python -B .the-way/elements/common/foundation_check.py` → `0 errors`; `src/browser/view/end-question.tsx` falls under `src/browser/view/**`, `tests/view/end-question.test.mjs` under `tests/view/**`; `guidelines/styleguide-browser-view.md` under `guidelines/**`; `foundations/decisions.md` under `foundations/**`; `simulation` untouched | Every file claimed; **no change** to the part map. |
| Glossary | entries „map run”, „copy”, „map run restart”, „manual map run”, „program” read | Used in their meanings; the work coins no word of a field's own; **none written**. |

## Written

- **Decisions:** D-173 and D-324 edited in place (the two corrections above); no new decision. D-173, D-324 and D-44 as written in the foundation step stand otherwise.
- **Invariants:** none. No rule of the task, of a decision or of the human asks for one (D-173 and D-324 *Verification* name none).
- **Environment facts:** none. The change rests on no source outside the product (*Based on* of D-173, D-324 is `none`).
- **Glossary terms:** none.
- **Part-map changes:** none.
- **Choices that bind after the merge:** the two corrections above are the ones the code makes that no entry stated (the question stands while another program is shown; the measure of „the copy no longer differs"). The other choices of the cycle (the question is a memory of the view, the save and the end are one result, focus on „Zapisz”, a halted game's „Zakończ” with unsaved changes does nothing) are how-to-make choices that D-323 and D-324 already cover or that bind nothing later; they stay in the reports.
- **Projected entries written whole or in part:** none (the task's projected D-173 was written in the foundation step; the other „new” entries of the task, the layout and „What does the end of a map run explain?”, belong to tasks 14 and 16 and this code does not make them true).

## Rows of *Settlements to record*

All eight were written in the foundation step; at this step each was compared with the final code and still stands:

| Row | Entry | Compared |
|---|---|---|
| 1 | D-173 | matches (answers of the three buttons) |
| 2 | D-173 | matches („Zapisz” with the program deleted: new program, first free name, no name field, ends at once) |
| 3 | D-173 (the line of D-172 under the sentence, „Zapisz” replaces) | matches |
| 4 | D-173 (sentence in `warning`, three buttons; place: in the panel just above the heading of the copy, as the review fix settled it, now also stating the other-program case) | matches |
| 5 | D-324 | matches |
| 6 | D-324 | matches |
| 7 | D-324 (measure of „no unsaved changes” made exact) | matches |
| 8 | D-173 (the question under the band of a discovery, above the heading of the copy and its line) | matches |

## Checks (command → exit code)

- `npm test -- tests/view/end-question.test.mjs` → 0 (the case of the save of a copy whose program was deleted now also asserts that Programy shows the new program)
- `npx eslint --max-warnings 0 tests/view/end-question.test.mjs` → 0
- `npx prettier --check --no-config --no-editorconfig tests/view/end-question.test.mjs` → 0
- `python -B .the-way/elements/common/foundation_check.py` → 0 (`0 errors`), before and after the edit
- The gate (`npm test` with no argument) not run, as told.

## Searches not found or unclear

- None found missing. A search of `foundations/decisions.md`, `invariants.md`, `glossary.md`, `environment_facts.md` and `part_map.md` for „Zakończ”, `D-173`, "unsaved" and the question's wording found no entry other than those listed that the code now contradicts.
- Unclear, not a defect: D-62 and D-132 say „Zakończ” "returns to the screen D-53 gives"; with unsaved changes it first asks. I read both as true (the return follows the answer) and, as the task says, left them unchanged.
- The edit of the test file is no foundation entry; it makes the test say what its title and D-173 claim. It stands in the same commit.
