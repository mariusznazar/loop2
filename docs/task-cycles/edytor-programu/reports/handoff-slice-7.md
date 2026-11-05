# Handoff — slice 7 of the task `edytor-programu`

## Delegation

The person who requested this cycle delegated every intermediate choice to the orchestrator of
`implement-task`. You never ask the human. A question goes back to the orchestrator in your report
with status `questions`; a fact or permission nobody supplies makes you `blocked`. Nothing here is the human's approval.

## Where you work

- Worktree (work from its root): `C:/Storage/repos/loop2-wt/edytor-programu`, branch `task/edytor-programu`.
  Your base (the head when you start): `69158b7`. Commit your work on this branch; push nothing.
- Pinned process: the worktree's `.the-way` at `f45ca40724251a46965aed69f733d0a35c430048`.
- You make: **a slice, or the retry of a slice** — slice 7. Read in full `.the-way/task-cycle/change/SKILL.md` (project skill
  `the-way-make-change`) and `.the-way/task-cycle/change/slice.md`; read `.the-way/task-cycle/change/ui_check.md` when the slice changes a user interface (the step that names it comes).
- Report: `docs/task-cycles/edytor-programu/reports/report-slice-7.md` (if your tool refuses the file, return the whole report as text).
- Commit by paths with `git add <paths>` only (never `-A`, `.`, `-a`); messages in English in the repository's form (see `git log --oneline -8`, e.g. `feat: :sparkles: …`, `docs: :memo: …`). Do not run the product's gate (`npm test` with no argument); run the focused checks your section names, each with command and exit code in the report.

## Answers of the start

- Trust boundary: the change touches `assets/icons/**` (files from game-icons.net) in slices 3 and 4 only; the review of those slices checks crafted input there.
- Irreversible operation: none. Open design choice: none; a choice of how to make what the task and the foundation settle is yours to make and name in the report; a real open design choice makes you return `returned` with no code.
- The foundation step has run: the entries D-288 to D-307 and the changed ones (D-03, D-27, D-39, D-43, D-44, D-91, D-93, D-124, D-166, D-180, D-196, D-245, D-255, D-282, icon-credits, the icon title facts, game-icons-licence) are written. Entry ranges below are current ones; they hold where they differ from the plan's.
- The base gate already fails on `tests/quality/test_quality_invariants.py::test_ruff_source_rules` and `::test_shellcheck_source_rules` (`FileNotFoundError`: ruff and shellcheck are not installed on this computer). That is the base's state: report any other failure of that file as yours.
- Two of the 11 icons are not by Delapouite or Lorc (see the foundation step's report): `logging` is by Skoll (https://game-icons.net/1x1/skoll/logging.html) and `dodge` by Felbrigg (https://game-icons.net/1x1/felbrigg/dodge.html); the foundation names them in `game-icons-licence`. Relevant only to slices 3 and 4.

## Your section of the plan, word for word (`docs/task-cycles/edytor-programu/plan.md`)

### Slice 7 — The select list and the number field in React

- **Goal:** the select list and the number field get React forms beside their DOM forms (To do item 12, D-265): `src/browser/view/controls/react-select-list.tsx` and `src/browser/view/controls/react-number-field.tsx`, drawing the same tree, classes and attributes as `createSelectList` and `createNumberField`, written as React with controlled values, not wrapping the DOM functions. The number field holds the text typed into it as its own state while it has the focus, commits the number on Enter or on leaving the field through the rule `readNumberField` of `program-editor.ts` gives, and takes a new value from its props only while it has no focus, so a screen that redraws five times a second leaves the typed text and the cursor in place (acceptance criterion 1). The DOM forms change only where an attribute has to stand in both. `tests/view/react-controls.test.mjs` gets cases comparing both forms of each, with options, with none, disabled, with an error under the number field, and a case of a number field keeping its typed text through ten renders with other values and committing it on Enter. The kitchen-sink page already shows both DOM forms in their states and stays as it is.
- **Change:** `src/browser/view/controls/react-select-list.tsx` · `src/browser/view/controls/react-number-field.tsx` · `tests/view/react-controls.test.mjs` · `src/browser/view/controls/select-list.ts` · `src/browser/view/controls/number-field.ts`
- **Read:** `docs/task-cycles/edytor-programu/task.frozen.md:40-40` To do · `docs/task-cycles/edytor-programu/task.frozen.md:47-49` Acceptance criteria · `docs/task-cycles/edytor-programu/task.frozen.md:283-287` Obecne wpisy, które zadanie stosuje bez zmiany
  `guidelines/coding.md` · `guidelines/coding-browser-module.md` · `guidelines/styleguide-browser-view.md` · `guidelines/testing.md` · `src/browser/AGENTS.md`
  `foundations/part_map.md:3-28` browser-view
  `foundations/decisions.md:39-50` D-03 · `foundations/decisions.md:912-925` D-44 · `foundations/decisions.md:5360-5390` D-264 · `foundations/decisions.md:5392-5432` D-265 · `foundations/decisions.md:5462-5489` D-267 · `foundations/decisions.md:5491-5534` D-268
  Foundation entries row E3
  `foundations/invariants.md:35-43` browser-view-framework · `foundations/invariants.md:1189-1197` document-test-memory-limit
  `src/browser/view/controls/text-field.ts` · `src/browser/view/controls/react-text-field.tsx` · `src/browser/view/program-editor.ts:220-258` · `tests/view/page-document.mjs`
- **Model:** cheaper
- **Risk:** none
- **Checks:** start from the failing case of the number field keeping its typed text through renders; `npm test -- tests/view/react-controls.test.mjs`; `npm run typecheck`; `npm test -- tests/invariants/test_browser_view_framework.py`; `npm test -- tests/quality/test_quality_invariants.py`
- **Depends on:** Slice 6 · E3

## Passages of the task named in your *Read*, word for word (`docs/task-cycles/edytor-programu/task.frozen.md`)

### task.frozen.md:40-40

12. Komórka wyboru jest nową, ósmą wspólną kontrolką. Lista wyboru i pole liczby, których potrzebują panel reguły, lista z „Kopia w przejściu” i plan wyprawy, dostają postać React obok postaci DOM. Każda z tych kontrolek stoi w obu postaciach (D-265), ma przypadki w teście porównującym obie i swoje stany na stronie wszystkich stanów w postaci DOM (D-269), a komórka wyboru dostaje wpis w `guidelines/styleguide-browser-view.md`, wprowadzony przez `the-way-maintain-styleguide`.

### task.frozen.md:47-49

### Acceptance criteria

- Liczba wpisywana w panelu i fokus zostają na miejscu, gdy przejście idzie przy 16× (D-03: „the screen of a map run changes up to five times a second beside fields in which the player types”; ryzyko z tej decyzji: „a number field whose value the game clips may lose its cursor”).

### task.frozen.md:283-287

- D-264 — What does a test of a screen built with React run on?: „A test of a screen built with React runs on jsdom, a development dependency pinned exactly, and only the test files of such screens leave their stand-ins for the document.”
- D-265 — How does a shared control stand in a screen built with React while other screens stay in DOM?: „a shared control that a React screen uses has two forms in `src/browser/view/controls/`, a React component and a DOM function, drawing one tree of DOM elements with the same classes and attributes”.
- D-267 — What keeps the rules of hooks and of effects in the browser view's code?: „No tool guards the rules of hooks and of effects: `guidelines/coding-browser-module.md` holds them, review keeps them”.
- D-268 — What keeps a test on a document imitation from taking the machine's memory?: „More than ten test files on a document imitation, or memory running away in a test on none, reopens how the limit is held.”
- D-269 — Does the kitchen-sink page hold React?: „it shows each shared control in its DOM form”.

## Foundation entries of your *Read*: current ranges in the worktree

The identifier is the address; the range is its size now. Read each whole, with its rationale and rejected options.

- `foundations/part_map.md:3-28` browser-view
- `foundations/decisions.md:39-50` D-03
- `foundations/decisions.md:912-925` D-44
- `foundations/decisions.md:5379-5409` D-264
- `foundations/decisions.md:5411-5451` D-265
- `foundations/decisions.md:5481-5508` D-267
- `foundations/decisions.md:5510-5553` D-268
- `foundations/invariants.md:35-43` browser-view-framework
- `foundations/invariants.md:1189-1197` document-test-memory-limit

Where the plan's *Read* names a guideline file, a source file, a test or a file made by an earlier slice, open it by that path (whole, as *Read* says) — the paths in your section above are relative to the worktree root. Files made by earlier slices exist now in the worktree.

## Report

Write the full report: status (`done`, `done with concerns`, `questions`, `returned`, `reserved`, `blocked`), your commits, what each check showed with command and exit code, your own-work check (the weakest point of your slice, how you checked it and what it showed), for a user-interface slice the states and screenshot evidence as `ui_check.md` gives (or a screenshot unchecked, with its reason), each reach beyond this handoff, **Searches not found or unclear:** each thing looked for and not found or unclear, or `none`, and concerns. Return only: status, commits, a one-line check result naming what failed or did not run, and the report path.
