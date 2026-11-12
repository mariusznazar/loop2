# Slice 37 report

**Status:** done

**Base:** `5b78e79680e1ac43cc9e975676db603cabb111fd` (HEAD at start, worktree clean).
**Commit:** `3df3ce80` on `task/martwe-odsylacze-origin`. 11 files, +42 / -43. Only comments, docstrings and the
styleguide prose changed (verified: every changed line of `src/` and `tests/` in `git diff -U0` is a comment line).
No decision, invariant or environment fact written: none was needed (see below).

## Per changed line: old pointer, outcome, entry

| File:line | Old pointer | Outcome | Entry |
|---|---|---|---|
| `src/browser/view/end-window-lines.ts:2` | `task koniec-przejscia, To do 4 to 8` | dropped, D-368 stays | D-368 |
| `src/browser/view/end-window.tsx:3` | `task koniec-przejscia, To do 1, 2, 4 to 9` | dropped, D-368 and the other cited decisions stay | D-368 |
| `src/browser/view/account-card.tsx:113` | `spec decision 8` (lock of the whole card) | named decisions: fields and button of the form disabled while it waits (D-44), the switch's tabs disabled (D-276) | D-44, D-276 |
| `src/browser/view/app.ts:418` | `spec decision 7` (refused save replaced at once) | named D-96 (its verification: a new game with the sentence above it "which a reload does not bring back") | D-96 |
| `tests/view/memory-limit.test.mjs:56` | `spec decision 10` | dropped; the sentence is true by the code (the guard reads text) | none |
| `tests/view/page-document.mjs:211` | `spec decision 10` | dropped; the comment gives its own reason | none |
| `tests/view/end-window-lines.test.mjs:1,5` | `task koniec-przejscia, To do 4 to 8`; "written out from the task" | dropped; "from the decisions" | D-368 |
| `tests/view/end-window.test.mjs:1,10` | `task ... To do 1, 2, 4 to 9`; "from the task" | dropped; D-370 added to the list | D-368, D-370 |
| `tests/view/end-window.test.mjs:164` | `task To do 4` | D-368 | D-368 |
| `tests/view/end-window.test.mjs:208` | `task To do 1` | D-368 | D-368 |
| `tests/view/end-window.test.mjs:318` | `task To do 7` | dropped (D-368 already there) | D-368 |
| `tests/view/end-window.test.mjs:395` | `task To do 7 and question 8` | D-368 (its Verification: paragraph counted twice violates) | D-147, D-368 |
| `tests/view/end-window.test.mjs:435` | `task To do 7: each only where it has content` | D-368 ("Each section of why stands only where it has content") | D-368 |
| `tests/view/end-window.test.mjs:504` | `task To do 8` | D-368 | D-368 |
| `tests/view/end-window.test.mjs:581` | `task To do 2, 8, 9` | D-368 (✕, Restart, Zakończ, Otwarte), D-313 ("Dodaj regułę z tym" in the window) | D-368, D-313 |
| `tests/view/end-window.test.mjs:604` | `task To do 2` | D-370 (Escape read in the window, not on the document) | D-370, D-285 |
| `tests/view/end-window.test.mjs:629` | `task To do 1` | D-370 (takes focus, nothing traps it) | D-370 |
| `tests/view/end-window-game.test.mjs:1` | `task koniec-przejscia, To do 1, 2, 8 and 9` | dropped; D-370, D-371 added to the list | D-368, D-370, D-371 |
| `tests/view/end-window-game.test.mjs:328` | `task To do 1` | dropped | D-368, D-62 |
| `tests/view/end-window-game.test.mjs:362` | `task To do 1 and 8` | dropped | D-132, D-368 |
| `tests/view/end-window-game.test.mjs:380` | `task To do 2` | D-371 (opens again at every entering) | D-371 |
| `tests/view/end-window-game.test.mjs:407` | `task To do 2` | dropped | D-212, D-368, D-96 |
| `tests/view/end-window-game.test.mjs:433` | `Binding answer 2 of slice 4` | D-370 ("The window takes the focus when it opens") | D-370, D-88 |
| `tests/view/end-window-game.test.mjs:517` | `task To do 2, binding answer 2` | D-371 (✕, Escape close it; "Koniec przejścia" before "Restart"), D-370 (focus to "Koniec przejścia") | D-371, D-370 |
| `tests/view/end-window-game.test.mjs:549` | `task To do 2` | D-371 ("only while the map run has ended and the window is closed") | D-371 |
| `tests/view/end-window-game.test.mjs:581` | `task To do 2` | D-368 | D-62, D-132, D-368 |
| `tests/view/end-window-game.test.mjs:608` | `task To do 2` | D-371 | D-371 |
| `tests/view/end-window-game.test.mjs:639` | `task To do 8 and question 10` | D-371 (question closes the window, "Wróć" leaves it closed) | D-173, D-371 |
| `tests/view/end-window-game.test.mjs:706` | `task To do 8` | dropped (D-53 and D-173 already name the Otwarte button) | D-53, D-173 |
| `tests/view/end-window-game.test.mjs:725` | `task To do 8 and question 10` | D-371 | D-173, D-371 |
| `tests/view/end-window-game.test.mjs:781` | `task To do 9` | dropped (D-313 says the window offers the button) | D-313, D-122 |
| `tests/view/end-window-game.test.mjs:833-838` | `task To do 10`; "sentences of To do 5 and 6 of the task" | D-369 (the longest streak and the window come back after a load); "sentences of D-368 and of D-185" | D-369, D-368, D-185 |
| `tests/view/program-panel.test.mjs:625` | `D-167` for "„Usuń” shows the first program" | D-382 for that; D-167 kept for "a program left alone stays" (D-167 says Usuń leaves it in place) | D-382, D-167 |
| `guidelines/styleguide-browser-view.md:649-652` | "the same value as the old Loop" (twice) | states the values: pause `grayscale(1) brightness(0.5)` (D-322), dead mage and extinguished fire `grayscale(1) brightness(0.55)` (D-316, D-322); old-game claim dropped | D-322, D-316 |
| `foundations/environment_facts.md` | none found | unchanged; `the-way-record-environment-fact` not used | - |

Cited decisions opened and checked against the comment: D-368, D-370, D-371, D-369, D-313, D-285, D-53, D-173, D-382, D-167, D-96, D-44, D-275, D-276, D-264, D-268, D-322, D-316, D-135 (116/480 at its verification). The invariant `document-test-memory-limit` was read whole.

## Checks (command, exit code)

- `npm test -- tests/view/end-window-game.test.mjs` exit 0 (21 pass)
- `npm test -- tests/view/end-window.test.mjs` exit 0 (13 pass)
- `npm test -- tests/view/end-window-lines.test.mjs` exit 0 (9 pass)
- `npm test -- tests/view/memory-limit.test.mjs` exit 0 (37 pass)
- `npm test -- tests/view/program-panel.test.mjs` exit 0 (53 pass)
- `npm test -- tests/view/page-document.test.mjs` exit 0 (56 pass); `page-document.mjs` is a helper, so its test was run in place of a `.test.mjs` of its own
- `npx prettier --check <changed js/ts files and the styleguide>` exit 0; `npx eslint <changed js/ts files>` exit 0
- `python -B .the-way/elements/common/foundation_check.py` exit 0 ("0 errors")
- Ruff: not run, no Python file changed.
- S1 grep over the files of Change: no line (exit 1).
- S3 grep: remaining hits are all non-pointers, listed below.
- The full gate (`npm test` with no argument) was not run, as instructed.

### S3 hits that point to nothing outside the repository

- `foundations/environment_facts.md:220, 304, 748`: public Source URLs (shellcheck, compose-spec `container_spec.md`, html.spec.whatwg.org); the words are names of public documents.
- `guidelines/styleguide-browser-view.md:805`: heading "Plan of a user-interface change", the styleguide template's example section.
- `tests/view/end-window.test.mjs:544-568`, `tests/view/end-window-game.test.mjs:838`, `tests/view/program-panel.test.mjs:205-289`: "trip plan" / "Plan wyprawy", the product's own feature (D-180, D-188).
- Test titles with "question" ("the question asked by „Zakończ”…") name the product's question „Zapisać, odrzucić, wrócić?”, not a task question.

## Own-work check

Requirement most likely missed: a pointer without the usual words (a number or a task name in a place the S3 pattern does not see). Check: a wider grep over the comment lines of the ten code files for `task|zadani|Q<n>|question <n>|to do|binding|answer <n>|decision <n>|section <n>|constraint|definition|concept|settlement|note|vault|origin|item <n>|package|cycle|report|round|loop|spec|slice|plan|mvp|brief`, then a second grep for `task|To do <n>|binding answer|decision <n>|question <n>` over the ten code files after the edits. The second printed nothing. The wider grep found pointers the S3 pattern does not match ("task koniec-przejscia", "To do N", "binding answer", "question N"); all are fixed.

## Unread material

- `tests/view/program-panel.test.mjs` (1760 lines): read in part, not whole. I read every comment line of the file (grep of `//`, `/*`, `*`) and the passage 605-690 whole; the code between comments was not read. It had one pointer (D-167, line 625).
- `foundations/decisions.md` decisions: each cited decision read whole only where listed above; the rest were not opened, since I did not change what they are cited for.
- Of the handoff's *Read* list, not read: `.the-way/elements/decisions/skill/*`, `.the-way/elements/decisions/template.md`, `.the-way/elements/common/rules.md`, `.claude/skills/the-way-record-decision/SKILL.md`, `.claude/skills/the-way-record-environment-fact/SKILL.md`, D-80, D-82, D-362, the invariant `tracked-file-private-names`, the cycle's `cycle.md` (Q9), and `task.md` outside the passages copied in the handoff. No new decision and no environment-fact entry was needed, so those skills were not run. The Q9 wording came from the handoff.
- `guidelines/styleguide-browser-view.md`, `guidelines/coding.md`, `guidelines/testing.md`, `src/browser/AGENTS.md`, `.the-way/task-cycle/change/SKILL.md` and `slice.md`: read whole. `guidelines/styleguide-browser-view.md` was read whole once before editing. `src/browser/view/*.ts(x)` and the other five test files: read whole.
- The task note `koniec_przejscia_loop2.md` from the snapshot: read lines 29-46 (To do 1-13) only, to check what each "To do N" in the comments meant.

## Searches not found or unclear

- Pointer in `foundations/environment_facts.md`: looked for notes, tasks, vault, old-Loop and `.md` references outside Source lines; none found, so no edit and no use of the environment-fact skill.
- A decision that states "the lock of the whole card while a form waits" in one place: none. D-44 (the form's fields and button), D-276 (the switch's tabs in its Rationale) and the styleguide (secondary actions) hold it in parts. The comment in `account-card.tsx:113` names D-44 and D-276 only, which say the parts they say.
- A decision that states why the document harness's `deepEqual` accepts plain data only, and the limit of the text guard (a computed dynamic import goes round it): D-268 names the harness's assert and, as accepted, that a file outside `tests/` stands on a written rule; the two claims in `memory-limit.test.mjs:56` and `page-document.mjs:211` are not there as such. I dropped the pointers and kept the sentences, which the code shows.
- D-96 states the replacement of a refused saved game state in its Verification ("which a reload does not bring back"), not in its body; I cited it for that.

## Notes for the orchestrator

- Outside my files: `src/browser/styles.css:1893` says the pause grey is "the value the old Loop gave a paused scene". It is not in this slice's Change; the styleguide no longer repeats the claim, but the comment in the CSS still does. If no other slice covers it, it needs one more line.
- Nothing in the task or plan failed my check. The handoff's line numbers matched.
