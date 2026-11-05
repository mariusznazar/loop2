# Handoff — planner for the task `edytor-programu`

## Delegation

The person who requested this cycle delegated every intermediate choice to the orchestrator of
`implement-task`. You never ask the human. Questions go back to the orchestrator in your report.
Nothing you receive is the human's approval of a design.

## Where you work

- Worktree (work from its root): `C:\Storage\repos\loop2-wt\edytor-programu`, branch `task/edytor-programu`, base `6fec0ea2de6033b4e46c43fc8593014b08eef542` (main).
- Pinned process: the worktree's `.the-way` (commit `f45ca40724251a46965aed69f733d0a35c430048`). Do not use any other copy or a personal skill.
- Method: read in full `.the-way/task-cycle/plan/SKILL.md` (project skill `the-way-plan-task`). Read `.the-way/task-cycle/plan/too_large.md` only if its step comes (it does not: this is the first plan).
- Stage and boundary: **the plan of slices for the whole change, the first plan, no spec** (the cycle found no open design choice). Write only `plan.md` and `plan-size.md`. Never write code, tests or foundation entries. Return before any slice is made.

## Paths

- Frozen task (read whole; it is the whole task, 329 lines — read in pages): `docs/task-cycles/edytor-programu/task.frozen.md` (source `C:\Storage\The Brain\The Brain\Notes\Projects\(P) Loop\_zadania\edytor_programu_loop2.md`).
- Plan to write: `docs/task-cycles/edytor-programu/plan.md`; size report: `docs/task-cycles/edytor-programu/plan-size.md`.
- Your full report: `docs/task-cycles/edytor-programu/reports/report-planner.md`.
- Project plan with this task's item and its *Projected entries* (read the passages for item 5 `edytor-programu` and the rows of *Projected entries* assigned to it, by heading): `C:\Storage\The Brain\The Brain\Notes\Projects\(P) Loop\plan_mvp2_loop2.md`. The approved definition it cites: `definicja_mvp2_loop2.md` in the same folder (fingerprint 9641f804; read only the *Projected foundation changes* entries the task carries).
- Foundation of the product: `foundations/` in the worktree (decisions, invariants, part map, glossary, environment facts).

## Answers of the start (step 4 of the cycle)

- Touches a trust boundary: **yes** — `assets/icons/**` of the part `browser-view` (11 SVG icon files from game-icons.net). Mark the slice(s) that add those files `trust boundary — assets/icons/**`.
- Holds an operation that cannot be undone: **no**.
- Open design choice at start: **none**. The task settles its choices in *Questions to settle* 1–20 and *Settlements to record* 1–19. If reading the code shows one (an entry the change needs beyond them, or a way the code makes costly to turn back), return `returned` as the method says, with no plan.
- Reserved choice: none (D-270 keeps drag on the browser's native drag; no library).
- Route: planned slices — the change spans editor and panel rewrite, four new controls with two forms each, drag with drop line, collapse state, 11 icons with credits, restyle of destructive buttons across the game, the simulation's action data, the agent's way to compose a game state, styleguide and foundation entries.
- The pin is not moved by this task; no checks carried by a pin move.
- The orchestrator is running the product's gate on the base in the background right now: **do not run `npm test`, `npm run build` or any test, and do not change any tracked file**. Run only `python -B .the-way/task-cycle/slice_size.py <plan>`.

## What to read (selected by the orchestrator; read each guideline file whole)

Guidelines (parts touched: browser-view, simulation, agent-workflow, product-foundation; build-tools only if you place the agent's state-composition tooling in `scripts/`):

- `guidelines/coding.md`
- `guidelines/coding-browser-module.md`
- `guidelines/coding-simulation-module.md` and `guidelines/coding-content-data.md` (the action data gains an icon field)
- `guidelines/testing.md`
- `guidelines/styleguide-browser-view.md` (read its example of the order of work; follow it or explain the departure)
- `src/browser/AGENTS.md`
- `.claude/skills/loop2-play/SKILL.md` (task item 16 changes it)

Foundation entries (read each whole by identifier; the task's *Decisions in play* names them, plus those below; find further ones for the parts by the method "Reading the foundation" in `.the-way/elements/common/way_of_working.md`, selectively): D-03, D-18, D-23, D-27, D-36, D-39, D-40, D-42, D-43, D-44, D-45, D-47, D-75, D-88, D-90, D-91, D-92, D-93, D-118, D-119, D-124, D-126, D-127, D-131, D-164, D-166, D-167, D-171, D-173, D-174, D-180, D-196, D-244, D-245, D-254, D-255, D-264, D-265, D-267, D-268, D-269, D-270, D-275, D-279; the invariants listed at the end of *Decisions in play*; the part-map entries of the parts above; the glossary entries of the terms the task uses; `icon-credits` and the environment fact `game-icons-licence`.

Code and tests to read to cut slices (as far as needed): `src/browser/view/program-editor.ts` (from line 534 is to be replaced; lines 37-532 are pure functions that stay), `src/browser/view/program-panel.ts`, `src/browser/view/program-list.tsx` and `src/browser/view/account-card.tsx` (the pattern), `src/browser/view/game-view.ts`, `src/browser/view/headquarters.ts`, `src/browser/view/run-screen.ts`, `src/browser/view/trip-editor.ts`, `src/browser/view/controls/**`, `src/browser/styles.css`, `src/browser/kitchen-sink/**`, `src/browser/sim/understanding.ts`, the action data under `src/browser/sim/`, `assets/icons/`, `tests/view/program-editor.test.mjs`, `tests/view/program-panel.test.mjs`, `tests/view/react-controls.test.mjs`, `tests/view/icons.test.mjs`, `tests/invariants/test_icon_credits.py`, `tests/invariants/test_icon_file_content.py`.

## What the plan must also carry

- *Foundation entries*: every projected entry the task carries in full or in part (the task's *Decisions in play* heading "Wpisy projektowane, które zadanie urzeczywistnia i pisze" lists the ones this task writes; the next heading lists parts of entries other tasks write, which the cycle writes only as far as this code makes them true, WAY-126), every row 1–19 of *Settlements to record* by its row number, the entries the project plan assigns to item 5, and the changes to current entries the task lists (D-91, D-43, D-44, D-39, D-245, D-255). The task's *To do* item 12 and 13 and 14 and 15 require the `the-way-maintain-styleguide` and `the-way-record-environment-fact` skills for their entries; name that in *What depends on it* and in the slice's *Goal*.
- The part-map changes the new files need belong to the slice that adds the file.
- Item 16 (agent composes a game state, `loop2-play` skill) is a slice of its own unless the code shows otherwise; its check is a real run it can name.
- User-interface slices: name the states and screenshot evidence the executor must give (`.the-way/task-cycle/change/ui_check.md` is the executor's file; you only name what is to be shown). The acceptance criteria's two checks on 16× speed and on the drop line are checks of the slice that builds them.
- Mind the trap named in the task: Mariusz's own check at the pull request is outside the cycle (*Human actions*: none).
- Order slices with the styleguide's example of order of work in mind; two slices change the same file only where one depends on the other.

## Report

Write the full report to the report path with: the status, the plan path, the final size-report path, guidelines found missing or uncertain, the chosen order's relation to the styleguide example, each reach beyond this handoff (what, where, why), **Searches not found or unclear:** each thing looked for and not found or unclear, or `none`, and any open questions with proposed answers. Return only: status, plan path, a one-line check result naming what failed or did not run, and the report path.
