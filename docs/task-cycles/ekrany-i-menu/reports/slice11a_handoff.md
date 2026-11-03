# Handoff — slice 11a of the task `ekrany-i-menu`

You make **slice 11a** of a planned change, as a the-way task cycle's executor. The person who
requested this cycle (Mariusz, the product's owner) has delegated every intermediate choice to the
orchestrator, who has delegated this slice to you. You ask no human anything; a question goes back
to the orchestrator in your report with the status `questions`, `returned` or `blocked`, as the
method gives.

## Where you work

- Worktree (start every command from its root): `C:/Storage/repos/loop2-wt/ekrany-i-menu`
  (Git Bash `/c/Storage/repos/loop2-wt/ekrany-i-menu`). Branch `task/ekrany-i-menu`; the branch head
  you start from is `5e305f8`. Process pin `.the-way` at `f45ca40724251a46965aed69f733d0a35c430048`.
  Task base commit `20d804b04ba564b578551c687cde78baadf78878`.
- Your class of model: cheaper than the orchestrator's (Haiku 5.5), the default class of the plan
- Report path: `docs/task-cycles/ekrany-i-menu/reports/slice11a.md`.

## Your stage

- You make: **a slice, or the retry of a slice** (the row of the `make-change` table). Read
  `.the-way/task-cycle/change/SKILL.md` whole, and `.the-way/task-cycle/change/slice.md` for how to
  read the plan and the task; read `ui_check.md` of the same directory where your slice changes what
  a screen shows (the screenshot of the running product has a settled route in `.claude/skills/loop2-play/SKILL.md`;
  where the component is not reachable on the page yet, state the check in code and mark the
  screenshot unchecked with that reason — the orchestrator's walk through the real browser covers
  the finished screens). Use no personal or global skill; project skills carry the `the-way-` prefix.
- Boundary: make only this slice; change only the files its *Change* names (a path pattern covers
  every file it matches). Commit on the task branch in English, in the style of the repository's
  recent commits (`git log --oneline`), `git add <paths>` explicitly (never `git add -A`, `git add .`
  or `git commit -a`), messages with several lines through `git commit -F <file>` placed outside the
  repository. Do not push. Leave no uncommitted tracked change.
- Run the focused checks your slice's *Checks* names, each as command and exit code. Do **not** run
  `npm test` without a file argument (the full gate) and do not run `foundation_check.py` unless the
  slice's *Checks* names it; the gate is the orchestrator's.
- If the plan and the code disagree structurally, or you meet an open design choice the task and the
  foundation leave open, return without code (`returned`) as the method gives.

## The answers of step 4

- Trust boundary: no (the part map names none of these files). The address fragment is player input:
  where your slice reads or writes it, test crafted fragments as your section says.
- Irreversible operation: no. Open design choice: none, no spec. Route: planned slices.

## Foundation entries the foundation step has written

The plan names its foundation rows by row number (`E…`); the foundation step wrote them under these
identifiers. Read each entry named in your *Read*, whole (an entry runs from its heading to the
next heading), and cite identifiers as they stand in `foundations/`. The line ranges in your section
below were recomputed at the head `f694d86` of the foundation step.

| Plan row | Identifier written by the foundation step | Commit |
|---|---|---|
| E11 | glossary `headquarters` (projected whole) | d6d3e07 |
| E12 | D-280 (new, part) | 4ba1483 |
| E16 | D-53 (part) | 95a3fea |
| E36 | D-62 (part, minimal) | 95a3fea |

## Passages of the frozen task your *Read* names (word for word; the file is the address)

#### `docs/task-cycles/ekrany-i-menu/task.md:221-221`

```
 221	- `headquarters` (definicja, słownik): „The headquarters is the screen Siedziba, which shows the player's team with its characters and its chest.”
```

## Your section of the plan (word for word; file `docs/task-cycles/ekrany-i-menu/plan.md`)

### Slice 11a — Old uses of „headquarters” in code comments and tests

> Added in the plan review (the foundation step's concern 3, WAY-97): the glossary term `headquarters` now
> means the screen Siedziba, not the part of the game outside a map run, and the author of that change
> rewrites in the same change each use whose meaning moved.

- **Goal:** each use of the word „headquarters” (and its forms) in a comment, a test's title or a string of a test whose meaning the new glossary entry `headquarters` moves is rewritten so that it is true under the new meaning; no behaviour, no identifier, no assertion and no line `invariant: <identifier>` changes. The executor searches with `git grep -i -w "headquarters"` over the files git tracks outside `foundations/` and `.runs/` and judges each use; a use that stays true as Siedziba stays. The files the foundation step found: `src/browser/sim/skills.ts` („Refuses purchases outside headquarters”), `src/browser/sim/types.ts` („null = the headquarters”), `tests/sim/body.test.mjs` („„Zakończ” after death leads to the headquarters (D-53, D-62)”, untrue now), `tests/sim/saved-game.test.mjs` (state names „the headquarters after „Zakończ””), `tests/sim/skills.test.mjs` (the `headquarters()` helper — a name of code, left if only an identifier carries the word; a comment or title near it is rewritten), `tests/sim/repertoire.test.mjs`, `tests/invariants/test_program_closed_lists.py`, `tests/invariants/test_program_world_reference.py`, `tests/view/clock.test.mjs`. A use the executor cannot decide goes to its report with its place; an identifier whose rename would be needed goes there too. One more rewrite, found by the executor of Slice 10: the header comment of `src/browser/view/run-screen.ts` (lines 4–8) and the doc of the `panel` parameter of `createRunScreen` still say the game view moves one program panel between the screens that hold it; after Slice 10 the panel is Przejście's alone (the game view holds a second one for Programy). Rewrite only those comments.
- **Change:** `src/browser/sim/skills.ts` · `src/browser/sim/types.ts` · `src/browser/view/run-screen.ts` · `tests/sim/body.test.mjs` · `tests/sim/saved-game.test.mjs` · `tests/sim/skills.test.mjs` · `tests/sim/repertoire.test.mjs` · `tests/invariants/test_program_closed_lists.py` · `tests/invariants/test_program_world_reference.py` · `tests/view/clock.test.mjs`
- **Read:** `docs/task-cycles/ekrany-i-menu/task.md:221-221` Zadanie zapisuje w całości
  `guidelines/coding.md` · `guidelines/coding-simulation-module.md` · `guidelines/testing.md`
  `foundations/part_map.md:30-60` simulation
  `foundations/glossary.md:87-91` headquarters · `foundations/decisions.md:5841-5883` D-280
  Foundation entries rows E11, E12, E16, E36 (D-53 and D-62 as the foundation step wrote them; find them by identifier)
- **Model:** cheaper
- **Risk:** none
- **Checks:** `npm run typecheck`; `npm test -- tests/sim/body.test.mjs`; `npm test -- tests/sim/saved-game.test.mjs`; `npm test -- tests/sim/skills.test.mjs`; `npm test -- tests/sim/repertoire.test.mjs`; `npm test -- tests/view/clock.test.mjs`; `npm test -- tests/invariants/test_program_closed_lists.py`; `npm test -- tests/invariants/test_program_world_reference.py`; `npm test -- tests/quality/test_quality_invariants.py`
- **Depends on:** Slice 10

## What earlier slices delivered (orchestrator's note; the files are the source)

- Slices 1–10 are made (head `5e305f8`). Line numbers named in the foundation step's report are from the
  foundation head and may have moved; find each use with `git grep -n -i -w "headquarters"` at your
  head. Slice 10 added a second program panel; `run-screen.ts`'s comments still say one panel moves
  between screens (see your section).
- The glossary entry `headquarters` (in `foundations/glossary.md`) now says: "The headquarters is the
  screen Siedziba, which shows the player's team with its characters and its chest." A use that means
  the state of the game outside a map run, or the place the player goes back to after a map run, moves
  in meaning; a use that means the screen Siedziba stays true.

## Orchestrator's rulings that bind this slice

- Rewrite comments and the text of test titles and strings only. Do not rename any identifier, change
  any assertion, expectation value or line `invariant: <identifier>`. A title that a test selector
  reads (a string the runner or another file matches on) stays; say so in your report.
- Name every use you left and why, and every use you could not decide, under *Choices made*.

## Your report

Write the full report to `docs/task-cycles/ekrany-i-menu/reports/slice11a.md` as `make-change`
gives it: what you changed and why, commits, each check as command and exit code, the own-work check
(the requirement most likely missed and the check you made for it), your reaches beyond this handoff
(what you read that it did not name, where and why), mismatches of plan and code, and
**Searches not found or unclear** (each thing looked for and not found or unclear, or `none`).
Return only: status (`done`, `done with concerns`, `questions`, `returned`, `reserved` or `blocked`),
your commits, a one-line check result naming what failed or did not run, and the report path.
