# Handoff 01 — the planner (stage: plan)

## Delegation
The person who requested this cycle delegated intermediate choices to the orchestrator of
`implement-task`; the orchestrator's answers below are not that person's approval. You never ask
the human; questions go back to the orchestrator in your report.

## Where you work
- Worktree (work from its root): `the worktree's root`, branch `task/proporcje-sceny-i-programu`, base `01b26d54d1fea63de8570ca854814ff8e564048c`.
- Shell: Windows 11; Git Bash and PowerShell. Paths in the plan are relative to the worktree root.
- A base `npm test` is running in this worktree right now (log `.runs/base-gate.log`). Change no tracked file; write only the two files below under `.runs/`.

## Method and stage
- Method: `.the-way/task-cycle/plan/SKILL.md` (project skill `the-way-plan-task`). Read it whole; read a file it names (`too_large.md`) only if its step comes. Variant: none (this is the first plan; no spec was written, no earlier attempt).
- Stage and boundary: write `plan.md` and its size report `plan-size.md`, and return before any slice is made. You write no code, no test and no foundation entry.
- Plan path: `docs/task-cycles/proporcje-sceny-i-programu/plan.md`
- Size report path: `docs/task-cycles/proporcje-sceny-i-programu/plan-size.md`
- Full report path: `docs/task-cycles/proporcje-sceny-i-programu/reports/01-plan-report.md`

## Inputs
- Frozen task (read whole): `docs/task-cycles/proporcje-sceny-i-programu/task.md` (original in the author's private notes; the frozen copy is the source). No spec exists. The task is independent of any project plan; the move of the process pin does not apply.
- Answers of step 4 of the cycle:
  - Trust boundary: no (browser-view's boundary is `assets/icons/**`, `assets/fonts/**`, `assets/sprites/**`; the task changes none of them). Mark every slice's *Risk* `none` unless you find a file of the boundary in a slice's *Change*.
  - Irreversible operation: no.
  - Open design choice: none judged by the orchestrator at start. You look again (section 2 of your method); how the rule panel, now drawn through a portal into a host, is hosted under a row is a choice of how, to be listed under *Choices*, unless reading the code shows a choice that is not.
  - Route: planning, because the change spans separable work: hosting of the rule panel in the list; the layout of the screen of a map run with the tabs under the map; removal of the second scene scale; Programy; the styleguide; nine foundation decisions.
- Classes of model for *Model* (the orchestrator is Sonnet 5.5): `cheaper` = Haiku 5.5, `same` = Sonnet 5.5, `strongest` = Fable 5.1. Name a class and a reason for any class other than `cheaper`; for UI work that needs judgment in a large shared file, say honestly which class you think holds it.

## What to read (selected by the orchestrator, WAY-150, WAY-213)
- Foundation entries by identifier, each whole (heading to next heading in `foundations/decisions.md`): D-311, D-288, D-282, D-19, D-338, D-343, D-345, D-346, D-334, D-280 (the task's *Decisions in play*), and the decisions whose *Scope* names `browser-view` that bear on the rule panel, program editor, scene and the Programy screen (find them by the search "Reading the foundation" step 2 gives; D-336 and D-43 are known to bear). Part map: `foundations/part_map.md` (short; whole). Invariants whose *Part* names `browser-view` or `every`, and those cited by a test the change alters (`invariant:` line). Glossary: `foundations/glossary.md` (short; whole) and the-way's glossary at the pin.
- Guideline files, each whole: `guidelines/coding.md`, `guidelines/coding-browser-module.md`, `guidelines/testing.md`, `guidelines/styleguide-browser-view.md` (read its example of the order of work and follow it or explain the departure), `src/browser/AGENTS.md`. Name in your report anything missing or uncertain.
- Code and tests to cut slices from (read only as far as needed to name each slice's files and what its agent reads): `src/browser/view/run-screen.tsx`, `right-area.tsx`, `world-area.tsx`, `program-panel.tsx`, `rule-list.tsx`, `rule-panel.tsx`, `game-view.ts`, `scene.tsx`, `src/browser/styles.css`, `tests/view/run-screen.test.mjs`, `right-area.test.mjs`, `world-area.test.mjs`, `program-panel.test.mjs`, `rule-editor.test.mjs`, `scene.test.mjs`, `account-screen.test.mjs`, and `src/browser/kitchen-sink/**` if it shows the panel or the areas.
- Running the game in a real browser (for a slice's manual state check of a screen): project skill `loop2-play`, `.claude/skills/loop2-play/SKILL.md`; a slice that changes a screen should name that check in its *Checks* beside the focused commands.

## Notes from the orchestrator for the cut
- The task's *Settlements to record* has three accepted rows (1 panel in place on both screens; 2 two columns with the tabs under the map; 3 one scene size 672 × 304). They go under *Foundation entries* by row number; the nine decisions of *Decisions in play* change by what those rows settle. Whether a separate slice 1 base for the foundation agent is needed is for you to propose.
- The styleguide edit (To do 5) is a change of `guidelines/styleguide-browser-view.md`; the task's outcome names its places. Treat it as a slice's file or its own slice as you judge.
- Out of scope: the place of the end of the map run (question 6; task 16).
- Cover each of To do 1–5, each of the three *Settlements* rows, and *Out of scope* in *Coverage*.

## Return
Return the status, the plan's path, a one-line check result naming failed or unchecked work, and the report's path. The report carries **Searches not found or unclear** (each thing you looked for and did not find, or `none`) and each reach beyond this handoff.
