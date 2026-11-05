# Handoff — slice 14 of the task `edytor-programu`

## Delegation

The person who requested this cycle delegated every intermediate choice to the orchestrator of
`implement-task`. You never ask the human. A question goes back to the orchestrator in your report
with status `questions`; a fact or permission nobody supplies makes you `blocked`. Nothing here is the human's approval.

## Where you work

- Worktree (work from its root): `C:/Storage/repos/loop2-wt/edytor-programu`, branch `task/edytor-programu`.
  Your base (the head when you start): `3664173`. Commit your work on this branch; push nothing.
- Pinned process: the worktree's `.the-way` at `f45ca40724251a46965aed69f733d0a35c430048`.
- You make: **a slice, or the retry of a slice** — slice 14. Read in full `.the-way/task-cycle/change/SKILL.md` (project skill
  `the-way-make-change`) and `.the-way/task-cycle/change/slice.md`; read `.the-way/task-cycle/change/ui_check.md` when the slice changes a user interface (the step that names it comes).
- Report: `docs/task-cycles/edytor-programu/reports/report-slice-14.md` (if your tool refuses the file, return the whole report as text).
- Commit by paths with `git add <paths>` only (never `-A`, `.`, `-a`); messages in English in the repository's form (see `git log --oneline -8`, e.g. `feat: :sparkles: …`, `docs: :memo: …`). Do not run the product's gate (`npm test` with no argument); run the focused checks your section names, each with command and exit code in the report.

## Answers of the start

- Trust boundary: the change touches `assets/icons/**` (files from game-icons.net) in slices 3 and 4 only; the review of those slices checks crafted input there.
- Irreversible operation: none. Open design choice: none; a choice of how to make what the task and the foundation settle is yours to make and name in the report; a real open design choice makes you return `returned` with no code.
- The foundation step has run: the entries D-288 to D-307 and the changed ones (D-03, D-27, D-39, D-43, D-44, D-91, D-93, D-124, D-166, D-180, D-196, D-245, D-255, D-282, icon-credits, the icon title facts, game-icons-licence) are written. Entry ranges below are current ones; they hold where they differ from the plan's.
- The base gate already fails on `tests/quality/test_quality_invariants.py::test_ruff_source_rules` and `::test_shellcheck_source_rules` (`FileNotFoundError`: ruff and shellcheck are not installed on this computer). That is the base's state: report any other failure of that file as yours.
- Two of the 11 icons are not by Delapouite or Lorc (see the foundation step's report): `logging` is by Skoll (https://game-icons.net/1x1/skoll/logging.html) and `dodge` by Felbrigg (https://game-icons.net/1x1/felbrigg/dodge.html); the foundation names them in `game-icons-licence`. Relevant only to slices 3 and 4.

## Your section of the plan, word for word (`docs/task-cycles/edytor-programu/plan.md`)

### Slice 14 — The coding guidelines of browser modules name the new files

- **Goal:** `guidelines/coding-browser-module.md`, written as `.the-way/product-guidelines/template.md` and `.the-way/product-guidelines/coding/template.md` give a file of coding guidelines in the task cycle, tells the truth about the files the change left: in *Files of this kind* the row of `program-panel.ts` becomes that of `program-panel.tsx`, and rows stand for `rule-list.tsx`, `rule-panel.tsx`, `trip-plan.tsx`, `controls/pick-cell.ts`, `controls/react-pick-cell.tsx`, `controls/react-select-list.tsx` and `controls/react-number-field.tsx`, each React file and each shared control with the status `copy`, as the rows of the React files task 4 added stand; and the sentence of the example *Kontrolki w DOM i ich aktualizacja* that lists the React forms names the new ones. No rule is added and no status of an existing row changes; a status or a rule that seems wrong goes to the report.
- **Change:** `guidelines/coding-browser-module.md`
- **Read:** `docs/task-cycles/edytor-programu/task.frozen.md:40-40` To do · `docs/task-cycles/edytor-programu/task.frozen.md:201-202` Context
  `.the-way/product-guidelines/template.md` · `.the-way/product-guidelines/coding/template.md` · `guidelines/coding.md`
  `foundations/part_map.md:3-28` browser-view · `foundations/part_map.md:118-133` agent-workflow
  `foundations/decisions.md:39-50` D-03 · `foundations/decisions.md:792-805` D-36 · `foundations/decisions.md:5392-5432` D-265 · `foundations/decisions.md:5536-5560` D-269
  made by earlier slices, named without backticks as they do not exist at the base: src/browser/view/program-panel.tsx (Slice 12) · src/browser/view/rule-list.tsx (Slice 9) · src/browser/view/rule-panel.tsx (Slice 10) · src/browser/view/trip-plan.tsx (Slice 11) · the four control files of Slices 6 and 7
- **Model:** cheaper
- **Risk:** none
- **Checks:** `python -B .the-way/elements/common/foundation_check.py` reports nothing the change caused; `npm test -- tests/invariants/test_browser_view_framework.py`
- **Depends on:** Slice 13

## Passages of the task named in your *Read*, word for word (`docs/task-cycles/edytor-programu/task.frozen.md`)

### task.frozen.md:40-40

12. Komórka wyboru jest nową, ósmą wspólną kontrolką. Lista wyboru i pole liczby, których potrzebują panel reguły, lista z „Kopia w przejściu” i plan wyprawy, dostają postać React obok postaci DOM. Każda z tych kontrolek stoi w obu postaciach (D-265), ma przypadki w teście porównującym obie i swoje stany na stronie wszystkich stanów w postaci DOM (D-269), a komórka wyboru dostaje wpis w `guidelines/styleguide-browser-view.md`, wprowadzony przez `the-way-maintain-styleguide`.

### task.frozen.md:201-202

- Wzorcem ekranu w React jest `src/browser/view/account-card.tsx` (D-36), a `program-editor.ts` i `program-panel.ts` mają w `guidelines/coding-browser-module.md` status `do not copy`.
- W `src/browser/view/controls/` są dziś postaci React tylko przycisku (`react-button.tsx`) i pola tekstowego (`react-text-field.tsx`); postać React przycisku niszczącego przynosi zadanie 4.

## Foundation entries of your *Read*: current ranges in the worktree

The identifier is the address; the range is its size now. Read each whole, with its rationale and rejected options.

- `foundations/part_map.md:3-28` browser-view
- `foundations/part_map.md:118-133` agent-workflow
- `foundations/decisions.md:39-50` D-03
- `foundations/decisions.md:792-805` D-36
- `foundations/decisions.md:5411-5451` D-265
- `foundations/decisions.md:5555-5579` D-269

Where the plan's *Read* names a guideline file, a source file, a test or a file made by an earlier slice, open it by that path (whole, as *Read* says) — the paths in your section above are relative to the worktree root. Files made by earlier slices exist now in the worktree.

## Report

Write the full report: status (`done`, `done with concerns`, `questions`, `returned`, `reserved`, `blocked`), your commits, what each check showed with command and exit code, your own-work check (the weakest point of your slice, how you checked it and what it showed), for a user-interface slice the states and screenshot evidence as `ui_check.md` gives (or a screenshot unchecked, with its reason), each reach beyond this handoff, **Searches not found or unclear:** each thing looked for and not found or unclear, or `none`, and concerns. Return only: status, commits, a one-line check result naming what failed or did not run, and the report path.
