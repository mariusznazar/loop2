# Handoff — planner of the task `scena-z-ludzikiem`

You are the planner of a the-way task cycle. The person who requested the cycle has delegated
intermediate choices to the orchestrator; you never ask the human. Send questions back to the
orchestrator in your return.

- Worktree (work from its root; write only the two files named below): `C:\Storage\repos\loop2-wt\scena-z-ludzikiem`
- Branch: `task/scena-z-ludzikiem`, base `8f9e713` (nothing committed yet)
- Method: read `.the-way/task-cycle/plan/SKILL.md` whole (pinned the-way `61c72fb`; the project skill is `the-way-plan-task`), and `.the-way/task-cycle/plan/too_large.md` only if that step comes — it does not here. Follow it. Do not use a global or personal skill of that name.
- Stage and boundary: **write the plan and its size report, no code, no foundation entry.** Return before any slice is made.
- Plan path: `docs/task-cycles/scena-z-ludzikiem/plan.md`
- Size report path: `docs/task-cycles/scena-z-ludzikiem/plan-size.md`
- Full report path: `docs/task-cycles/scena-z-ludzikiem/reports/plan-report.md`
- Spec: none (no open design choice was found at the start; see below).

## What you read

1. The frozen task, whole: `docs/task-cycles/scena-z-ludzikiem/task.frozen.md`
   (original `C:\Storage\The Brain\The Brain\Notes\Projects\(P) Loop\_zadania\scena_z_ludzikiem_loop2.md`, accepted 2026-11-03; the task document is in Polish, the plan and the report may be in English). Its sections *Decisions in play* and *Settlements to record* are the foundation entries the plan's table lists.
2. The product's instructions: `AGENTS.md`, `src/browser/AGENTS.md`, `foundations/part_map.md`.
3. The guideline files of the parts the change touches, each whole: `guidelines/coding.md`, `guidelines/coding-browser-module.md`, `guidelines/coding-content-data.md`, `guidelines/styleguide-browser-view.md`, `guidelines/testing.md`. Read `guidelines/coding-simulation-module.md` only if a slice would change a module of `src/browser/sim/` other than a data file. The styleguide's order-of-work example: follow it or explain the departure.
4. Foundation entries, each whole by its identifier (`foundations/decisions.md`, `foundations/invariants.md`, `foundations/glossary.md`): D-03, D-04, D-18, D-27, D-39, D-40, D-42, D-43, D-44, D-45, D-62, D-70, D-87, D-122, D-132, D-254, D-270, D-271, D-272, D-273, D-291, D-311, D-314, D-315; invariants `content-identifiers`, `browser-view-token-values`, `sprite-file-content`, `loop2-container-sprites`, and any invariant whose *Part* names `browser-view` or `every` that a slice would reach (search the *Part* lines); the glossary entries of the terms you use. Note that D-39, D-40, D-43, D-122 and others are written *in part* by this task while another task writes the rest — read the task's *Decisions in play* for which part, and check the current wording in `foundations/decisions.md`, since tasks 5, 6 and 11 have already merged and may have written their share.
5. Code and tests as far as needed to cut slices: at least `src/browser/view/world-area.tsx`, `src/browser/view/run-screen.tsx`, `src/browser/view/terrain-picture.ts`, `src/browser/view/clock.ts`, `src/browser/styles.css`, `src/browser/tokens.css`, `src/browser/sim/data/*.ts`, `src/browser/sim/types.ts` (`run.current`, `state.discovery`), `tests/view/world-area.test.mjs`, `tests/view/run-screen.test.mjs`, `scripts/static-files.mjs`, `scripts/build.mjs`, `assets/sprites/`, `assets/icons/`, how the rule editor draws an action's icon (task 5, D-291). The old game's scene, for the *To do* items that cite it: `C:\Storage\repos\loop\src\components\probe\Scene.tsx`, `C:\Storage\repos\loop\src\components\probe\sprites.tsx`, and the pack/cut sprites at `C:\Storage\repos\loop\public\sprites\` and `C:\Storage\repos\loop\assets\pixel-crawler\Entities\Npc's\Wizzard\` — read-only; the cycle writes only in the worktree.

Name each reach beyond this list in your report (what, where, why).

## The orchestrator's answers at the start

- **Trust boundary: yes.** `assets/sprites/**` is a trust boundary of `browser-view` (files from the Pixel Crawler pack, outside the product). Any slice that creates or changes a file there carries `Risk: trust boundary — assets/sprites/**`, so that a reviewer of its own checks that each file holds pixels alone (no `sRGB`, text or other ancillary chunk) and that only the build copies it.
- **Irreversible operation: no.**
- **Open design choice: none found.** The task's five *Questions carried to cycle* (does the frame of task 6 stay the background — D-314/D-315 say it does, with the night a layer over it; how to cut the sheets of the mage, fire and props to a common frame and whether the cutting script enters the repository; which data files hold the props' places and the mage's picture — D-18 and `content-identifiers` forbid naming resources in the view; how the bar fills smoothly at readings every 200 ms; the badge's size) are choices of how to make what the task and the foundation settle. Make them in the plan and list them under *Choices*. If reading the code shows a choice that needs a foundation entry beyond the task's rows and projected entries, or a way costly to turn back, **return it as an open design choice** instead of a plan, as the method says.
- **Reserved choice: none** (React and CSS only; no new library, language or store).
- **Route:** planned slices. The change spans `browser-view` (view, CSS, `assets/sprites/**`, tests), `simulation` (data files only), `agent-workflow` (`guidelines/**`), `product-foundation`. Cut it along what a reviewer can judge alone, and keep the number of slices as small as honest slicing allows.
- The foundation step (the plan's *Foundation entries*) is written first by its own agent; list there every row of *Settlements to record* and every projected entry or part of it the task carries. The guidelines (items 14 and 15 of *To do*) go through `the-way-maintain-styleguide` and `the-way-maintain-coding-guidelines`: give each its slice or fold it into the slice that adds the files it describes, as the order of work in the styleguide suggests.
- Visual and motion evidence: D-254 and the project skill `.claude/skills/loop2-play/SKILL.md` say how an agent runs the game and reads motion from a stream of frames; a slice that changes what is drawn names that check, and the human's own viewing of the scene at 1×, 4× and 16× (*Acceptance criteria*) stays with the human, before the merge.
- Any slice that writes a script (for example one that cuts the sprites) must read `C:\Storage\The Brain\The Brain\.ai\rules\scripts.md` first (line endings, console encoding, backslashes in Python literals).

## Boundary

Write the plan in the form the method gives, run `python -B .the-way/task-cycle/slice_size.py docs/task-cycles/scena-z-ludzikiem/plan.md`, split until every slice fits, keep the last output as `plan-size.md`, write the full report to the report path (including **Searches not found or unclear**), and return its status, a one-line check result (naming what failed or did not run), and the report's path.
