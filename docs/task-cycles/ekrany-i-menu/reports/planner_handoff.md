# Handoff — planner of the task `ekrany-i-menu`

You are the planner of a the-way task cycle. The person who requested this cycle (Mariusz, the
product's owner) has delegated every intermediate choice to the orchestrator, who has delegated this
stage to you. You ask no human anything; questions go back to the orchestrator in your report.

## Where you work

- Worktree (start every command from its root): `C:\Storage\repos\loop2-wt\ekrany-i-menu`
  (Git Bash path `/c/Storage/repos/loop2-wt/ekrany-i-menu`). Branch `task/ekrany-i-menu`, base
  commit `20d804b04ba564b578551c687cde78baadf78878`, process pin `.the-way` at
  `f45ca40724251a46965aed69f733d0a35c430048` (verified).
- Record directory (ignored by git): `docs/task-cycles/ekrany-i-menu/`. You write `plan.md` and
  `plan-size.md` there, and your full report to `docs/task-cycles/ekrany-i-menu/reports/planner.md`.
  You change nothing else and write no code, no test and no foundation entry.

## Your stage and method

- Stage: **planner** — divide the change into slices before any is made.
- Method: the project skill `the-way-plan-task`; read `.the-way/task-cycle/plan/SKILL.md` whole
  from the worktree's `.the-way`, and each file it names only when the step that names it comes.
  Use no personal or global skill of that name.
- Boundary: you return before any slice is made. Where you meet an open design choice the task and
  the foundation leave open, return `returned` with a report and no plan content that assumes it
  (the cycle then writes a spec). Where you meet a reserved choice (a language, framework,
  library, store of data, way of logging in, place to run), return `reserved`.
- Do not run the product's gate (`npm test`) or the whole test suite; its run is the orchestrator's.
  Focused checks you name for slices are named, not run, unless the method has you run a script
  (`.the-way/task-cycle/slice_size.py` for the size report).

## The answers of step 4

- Trust boundary: no. The part map names no file this change needs to touch as a boundary. The
  page-address fragment is player-controlled input: name in the slices that build the router a
  check on crafted fragments.
- Irreversible operation: no. `Human actions: none`.
- Open design choice at start: none. Execution route: planned slices (the orchestrator judged
  that one agent cannot hold the change).
- No spec was written.

## What you read

1. The whole frozen task: `docs/task-cycles/ekrany-i-menu/task.md` (copy of
   `C:\Storage\The Brain\The Brain\Notes\Projects\(P) Loop\_zadania\ekrany_i_menu_loop2.md`, sha256
   prefix `ebb78ed12f587c20`). Its *Decisions in play* and *Settlements to record* are binding for
   what the foundation step writes; plan where it is written (the plan's *Foundation entries*).
2. The foundation, read as "Reading the foundation" in `.the-way/elements/common/way_of_working.md`
   gives it:
   - `foundations/part_map.md` and `foundations/glossary.md`, whole. Parts the change touches:
     `browser-view` (code, tests, kitchen-sink page), `agent-workflow` (the two guideline files
     under `guidelines/`), `product-foundation` (`foundations/**`). `simulation` only if you find
     the change cannot be made without it; name any such reach.
   - The decisions the task's *Decisions in play* names, by identifier, whole: D-96, D-97, D-157,
     D-199, D-200, D-208, D-212, D-217, D-244, D-245, D-246, D-44, D-53, D-166, D-246, D-03, D-55,
     D-122, D-129, D-156, D-164, D-170, D-188, D-243, D-251, D-149, D-180, D-207, D-213, D-250,
     D-262, D-27, D-265, D-264, D-269, D-270, D-276, D-277, D-75, D-88, D-254, D-42, D-47, D-196,
     D-225, D-275.
   - Besides those, the decisions whose *Scope* names `browser-view` that you need to divide the
     work: their titles are in `docs/task-cycles/ekrany-i-menu/reports/browser_view_decision_titles.txt`
     (177 entries, produced by the search of "Reading the foundation" step 2); pick by title the
     ones about screens, the menu bar, addresses, the login card and waiting screens, saving and
     its line, the program list and panel, controls and their tokens, and testing of the view
     (D-73 to D-89), and read those whole. The whole log is not read.
   - The invariants whose *Part* names `browser-view` or `every` and which concern the screens,
     the controls, the tokens, focus or the framework; the entries your decisions link to as far as
     you need them.
3. The product's guidelines, each whole: `guidelines/coding.md`, `guidelines/coding-browser-module.md`,
   `guidelines/styleguide-browser-view.md`, `guidelines/testing.md`, and `src/browser/AGENTS.md`.
   The guideline files will be changed by this task through the project skills
   `the-way-maintain-styleguide` and `the-way-maintain-coding-guidelines` (task items 15 and 16);
   foundation entries only through the `the-way-record-*` and `the-way-update-part-map` skills
   (task item 17). Plan those as the plan's *Foundation entries* or as slices as your method gives.
4. The code the change reshapes: `src/browser/view/app.ts`, `game-view.ts`, `headquarters.ts`,
   `program-panel.ts`, `status-row.ts`, `character-skills.ts`, `email-status.ts`,
   `account-card.tsx` (the exemplar), `controls/`, `src/browser/styles.css`, `src/browser/main.ts`,
   `src/browser/kitchen-sink/`, and the tests under `tests/view/` that cover them (notably
   `tests/view/page-document.mjs`, `page-document.test.mjs`, `headquarters.test.mjs`,
   `character-skills.test.mjs`, `react-controls.test.mjs`, `account-screen.test.mjs`,
   `email-status.test.mjs`). Read the real files to establish what is there; the task's line
   numbers are from `20d804b`.
5. How an agent runs the game on this computer and operates it in a real browser (task item 18,
   D-254): `.claude/skills/loop2-play/SKILL.md`. A slice's check may need it; the plan names where.

## What the orchestrator asks you to keep in view

- Every item (1 to 18) of the task's *To do*, every row of *Settlements to record*, and every
  entry of *Decisions in play* marked "Zadanie zapisuje w całości", "Zadanie urzeczywistnia część"
  or "Przykłady i zdania do poprawy w tym zadaniu" must land in some slice or in the plan's
  *Foundation entries*; the orchestrator reviews the plan for that coverage.
- Question 4 fixes which screens are React and which stay DOM; D-265 and the rule "Nowy ekran i
  moduły w DOM" in `guidelines/coding-browser-module.md` say how they meet. D-270 forbids a router
  library, so the router is product code.
- Slices that touch the real browser or the screen's rendered appearance need a check that can
  actually run (jsdom-based tests exist in `tests/view/`; the task also requires an agent's walk
  through the real browser with screenshots, item 18).
- Every slice's *Checks* name focused checks, never the gate.
- Per slice: *Model*, *Risk*, *Read* as the method gives; a *Model* other than `cheaper` carries
  its reason. "Cheaper" means cheaper than the orchestrator's model (Sonnet 5.5).

## Your report

Write the full report to `docs/task-cycles/ekrany-i-menu/reports/planner.md` as your method gives
it, with every check you ran by command and exit code, your reaches beyond this handoff, and
**Searches not found or unclear** (each thing looked for and not found or unclear, or `none`).
Return only: your status (`done`, `done with concerns`, `questions`, `returned` or `reserved`),
your commits (none — you commit nothing), a one-line check result naming what failed or did not
run, and the report's path.
