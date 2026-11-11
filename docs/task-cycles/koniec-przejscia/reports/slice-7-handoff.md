# Handoff — slice 7 of the task koniec-przejscia

You make one slice of a planned change. Work from the worktree  (branch `task/koniec-przejscia`; run every command from its root, never touch the main checkout `a repository on the author's disk`). Another agent reviews it afterwards; the cycle's orchestrator runs the product's gate, you do not.

## Delegation

The human who requested this cycle delegated intermediate choices to the orchestrator; your questions go to it in your report (status `questions` or `blocked`). Nothing you decide is the human's approval.

## Method and variant

Read whole `.the-way/task-cycle/change/SKILL.md`. Your variant is "a slice, or the retry of a slice": read `.the-way/task-cycle/change/slice.md` for how to read the plan and the task. Read `.the-way/task-cycle/change/ui_check.md` when you alter what a screen shows (section 3), and the other files that `SKILL.md` names only when the step that names them comes.

## Stage and boundary

Stage: slice 7 of the plan; boundary: the slice's own goal and its files (*Change*). The base of the slice is `01e6c26` (`git rev-parse HEAD`). Commit your work on this branch by path (never `git add -A`), commit messages in English in the form of the repository's history. Report path: `docs/task-cycles/koniec-przejscia/reports/slice-7-report.md`.

## Answers of the cycle's start

- Trust boundary: yes — `src/browser/sim/saved-game.ts` is a trust boundary of the part `simulation`.
- Irreversible operation: no.
- No spec; no move of the pin.
- Checks failing on the base (before any change): `tests/account-mail.test.mjs:350` "a server that stops answering yields failed within the shortened deadline and loses the connection" failed in one whole run and passes alone (a timing-dependent test, not yours); two tests of `tests/quality` failed only because the worktree had no `.runs/quality-venv` (now present). Everything else passed. Do not run the gate.
- The foundation entries of the task are written (commits `e0fd091`, `c730482`): the plan's "(new)" entry is D-362 and the changed decisions are in the tree as you read them now.

## Your slice, copied word for word from the plan

### Slice 7 — The tables of the coding guidelines know the new files

- **Goal:** The tables *Files of this kind* of `guidelines/coding-simulation-module.md` and `guidelines/coding-browser-module.md` hold the files this task added, each with its status, written through the project skill `the-way-maintain-coding-guidelines` (To do 13): `src/browser/sim/run-record.ts` in the first, `src/browser/view/end-window.tsx` and `src/browser/view/end-window-lines.ts` in the second. The executor reads the three files in the checkout, where Slices 1 to 3 made them. The statuses follow the files as built (a module of the sim or the view that a new one may copy is `copy`; one that builds elements through the DOM or is not to be copied is not); a rule or an example of those files is added only where the skill finds the guidelines wrong or missing after this change, and the executor names it in its report instead of deciding it alone. The file is changed by that skill, and its check passes (`python -B .the-way/elements/common/foundation_check.py`).
- **Change:** `guidelines/coding-simulation-module.md` · `guidelines/coding-browser-module.md`
- **Read:** `docs/task-cycles/koniec-przejscia/task.md:46-46` To do · `foundations/part_map.md:3-60` browser-view and simulation · `guidelines/coding.md` · `guidelines/coding-saved-game.md`
- **Model:** cheaper — three rows of two tables from files that stand
- **Risk:** none
- **Checks:** `python -B .the-way/elements/common/foundation_check.py` · `node node_modules/prettier/bin/prettier.cjs --check guidelines/coding-simulation-module.md guidelines/coding-browser-module.md`
- **Depends on:** Slice 1 · Slice 2 · Slice 3

## Current ranges of the foundation entries named in *Read*

The foundation step wrote entries after the plan, so the ranges in the *Read* above moved; the current ones hold. Read each whole, its identifier is its address.



## Passages of the task named in *Read*, copied word for word

#### task.md:46-46 To do

13. Tabele plików w `guidelines/coding-browser-module.md` i `guidelines/coding-simulation-module.md` znają nowe pliki tego zadania; zmiany idą przez `the-way-maintain-coding-guidelines`.

## Binding answers of the orchestrator

The plan was written before slices 1 to 6 were made. They are made (the last is commit `01e6c26`); where the plan's wording differs from the code as it stands, the code as it stands holds. The three files your slice names exist: `src/browser/sim/run-record.ts` (slice 1), `src/browser/view/end-window-lines.ts` (slice 2) and `src/browser/view/end-window.tsx` (slice 3). Read each whole, and read the tables *Files of this kind* of `guidelines/coding-simulation-module.md` and `guidelines/coding-browser-module.md` whole before you change them, with the statuses the rows already use (and what each status means, as the file says).

How you work (binding): `the-way-maintain-coding-guidelines` is written for a refinement led with the human, and you have no human. Follow its steps for reading and changing the tables, and where it would ask the human, take the smallest reversible reading that fulfils the task's item 13 (the tables know the new files), name it in your report as a choice with the way rejected and its cost if wrong, and where you cannot proceed without a human fact return the status `questions` with the question and the answer you recommend. You change the two tables and nothing else: a rule or an example of those files is added only where the skill finds the guidelines wrong or missing after this change, and you then only name it in your report instead of deciding it alone. The statuses follow the files as built (a module that a new one may copy is `copy`; one that builds elements through the DOM or is not to be copied is not): read the files and judge each, naming the reason for each status in the report.

## Report

Write the full report to the report path as `.the-way/task-cycle/change/SKILL.md` section 6 gives: status, files changed with line counts and commits, each check with its command and exit code (the failing run of each test written first included), the own-work check (requirement, check, what it showed), each reach beyond the dispatch, **Unread material:** and **Searches not found or unclear:** (each `none` if so), every choice with the way rejected and its cost if wrong, and problems as observed. Return to the orchestrator only the status, the commits, a one-line check result naming what failed or did not run, and the report path.
