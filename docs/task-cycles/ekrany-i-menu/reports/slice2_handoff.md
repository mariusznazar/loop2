# Handoff — slice 2 of the task `ekrany-i-menu`

You make **slice 2** of a planned change, as a the-way task cycle's executor. The person who
requested this cycle (Mariusz, the product's owner) has delegated every intermediate choice to the
orchestrator, who has delegated this slice to you. You ask no human anything; a question goes back
to the orchestrator in your report with the status `questions`, `returned` or `blocked`, as the
method gives.

## Where you work

- Worktree (start every command from its root): `C:/Storage/repos/loop2-wt/ekrany-i-menu`
  (Git Bash `/c/Storage/repos/loop2-wt/ekrany-i-menu`). Branch `task/ekrany-i-menu`; the branch head
  you start from is `c0211e6`. Process pin `.the-way` at `f45ca40724251a46965aed69f733d0a35c430048`.
  Task base commit `20d804b04ba564b578551c687cde78baadf78878`.
- Your class of model: cheaper than the orchestrator's (Haiku 5.5), the default class of the plan
- Report path: `docs/task-cycles/ekrany-i-menu/reports/slice2.md`.

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

(this slice names no foundation row)

## Passages of the frozen task your *Read* names (word for word; the file is the address)

#### `docs/task-cycles/ekrany-i-menu/task.md:69-70`

```
  69	14. W React powstają pasek menu, ekran Postać i lista programów; Siedziba, panel programu i ekran przejścia zostają w DOM (pytanie 4).
  70	   - Przycisk niszczący dostaje postać React z przypadkiem w teście porównującym obie postacie (D-265), bo „Zatrzymaj” na ekranie Postać i „Usuń” na liście programów stoją w React (odczyt nieskreślony przez Mariusza 2026-11-03, drugi pakiet rundy, część F).
```

#### `docs/task-cycles/ekrany-i-menu/task.md:268-268`

```
 268	- D-265 — How does a shared control stand in a screen built with React while other screens stay in DOM?: „a shared control that a React screen uses has two forms in `src/browser/view/controls/`, a React component and a DOM function”, „a screen no task has moved to React yet stays in those APIs on the DOM form”.
```

## Your section of the plan (word for word; file `docs/task-cycles/ekrany-i-menu/plan.md`)

### Slice 2 — The shared button: the destructive React form and the open state

- **Goal:** `ReactButton` takes the kind `destructive`, drawing the same element, classes and attributes `createButton(text, { kind: "destructive" })` draws (D-44, D-265; To do item 14). Both forms take an optional `expanded`: given true or false, the button carries `aria-expanded` with that value; left out, it carries none — for a button that opens and closes a block below it, the menu „Konto” first; in the DOM form it is an option of `createButton` and a function that sets it on an existing button, as `setButtonSelected` sets selection. The open state has no look of its own. `tests/view/react-controls.test.mjs` gets cases comparing both forms for the destructive button, the destructive button with an accessible name, and a button with `expanded` true and false. The kitchen-sink page already shows the destructive button in its DOM form and stays as it is.
- **Change:** `src/browser/view/controls/react-button.tsx` · `src/browser/view/controls/button.ts` · `tests/view/react-controls.test.mjs`
- **Read:** `docs/task-cycles/ekrany-i-menu/task.md:69-70` To do · `docs/task-cycles/ekrany-i-menu/task.md:268-268` Obecne decyzje, których zadanie dotyka bez zmiany
  `guidelines/coding.md` · `guidelines/coding-browser-module.md` · `guidelines/styleguide-browser-view.md` · `guidelines/testing.md` · `src/browser/AGENTS.md`
  `foundations/part_map.md:3-28` browser-view
  `foundations/decisions.md:882-895` D-42 · `foundations/decisions.md:912-925` D-44 · `foundations/decisions.md:957-970` D-47 · `foundations/decisions.md:5360-5390` D-264 · `foundations/decisions.md:5392-5432` D-265 · `foundations/decisions.md:5491-5534` D-268 · `foundations/decisions.md:5536-5560` D-269 · `foundations/decisions.md:5709-5734` D-275 · `foundations/decisions.md:5736-5772` D-276
  `foundations/invariants.md:35-43` browser-view-framework · `foundations/invariants.md:1189-1197` document-test-memory-limit
  `tests/view/page-document.mjs`
- **Model:** cheaper
- **Risk:** none
- **Checks:** start from the failing case of the destructive React form; `npm test -- tests/view/react-controls.test.mjs`; `npm run typecheck`; `npm test -- tests/quality/test_quality_invariants.py`
- **Depends on:** none


## Your report

Write the full report to `docs/task-cycles/ekrany-i-menu/reports/slice2.md` as `make-change`
gives it: what you changed and why, commits, each check as command and exit code, the own-work check
(the requirement most likely missed and the check you made for it), your reaches beyond this handoff
(what you read that it did not name, where and why), mismatches of plan and code, and
**Searches not found or unclear** (each thing looked for and not found or unclear, or `none`).
Return only: status (`done`, `done with concerns`, `questions`, `returned`, `reserved` or `blocked`),
your commits, a one-line check result naming what failed or did not run, and the report path.
