# Handoff — the planner of the task `ocena-programu-na-ziarnach`

## Delegation

The person who requested this cycle has delegated intermediate choices to the orchestrator; the orchestrator's answers are never that person's approval. You write the plan; you ask the orchestrator, not the human.

## Where and how

- Worktree (work from its root): `.` (branch `task/ocena-programu-na-ziarnach`, base `c36e2739883002af2b959b787eb0880b748fd7e5`, which is `origin/main` after the merge of task 24, PR #166).
- Method of your stage: `.the-way/task-cycle/plan/SKILL.md` (`plan-task`). Read it whole, and a file it names only when the step or variant that names it comes. Stage: the planner. Boundary: you write `plan.md` and `plan-size.md` and nothing else; no code, no test, no foundation entry, no run of the product's gate.
- Pinned the-way: `19e5774aed6d1d628042e23deccc110ed9f112c0` (the worktree's `.the-way`; scripts run as `.the-way/<path>` from the worktree root).
- Plan path: `.runs/task-cycles/ocena-programu-na-ziarnach/plan.md`; size report: `.runs/task-cycles/ocena-programu-na-ziarnach/plan-size.md`.
- Your report path (the input of the cycle's scripts — `task-cycle/remarks_check.py` reads it; the name begins with the role): `.runs/task-cycles/ocena-programu-na-ziarnach/reports/planner-report.md`.
- Your directory for working copies: `.runs/planner/` (directly under the ignored `.runs/` of the worktree).
- `cycle.md` and the other files of the record directory (`.runs/task-cycles/ocena-programu-na-ziarnach/`) — other agents' handoffs, reports and findings — are not yours to read unless this handoff names them. It names: the frozen task and your own report path.

## Working copies (first paragraph of "Working copies" of the cycle's skill, word for word)

An agent of the cycle that makes a working copy to check something — a worktree of a commit, a clone, a script, a screenshot, a prepared input of a test — makes it in a directory of its own directly under the ignored `.runs/` of the task's worktree, the directory its handoff names; never in the system's temporary directory, in the scratch directory of a session or in the main checkout of the repository. The screenshot that a screenshot tool, such as the Playwright server, saves by itself under its session's directory is moved into the agent's directory and the original removed, except a screenshot that is shown to the human: that one goes where `task-cycle/change/ui_check.md` says, to the place the product's foundation settles for screenshots, and into the agent's directory only where no such place is settled. The files that a product's own tools and tests make by themselves are no working copy of the agent and stay outside this rule. Before the agent returns, each time it returns, it removes its copy — a worktree with `git worktree remove --force`, then `git worktree prune` — keeps in `reports/` beside its report what the report needs, and states in the report where each copy stood and that it was removed. Where a removal fails, the agent finishes all the same and names in the report the remainder, with its full path and the reason it stayed. It removes a copy, as any directory, by its path written out in full in the command, never through a shell variable: an empty variable turns the removal on the directory the shell stands in.

## The task

- Frozen task, read whole: `.runs/task-cycles/ocena-programu-na-ziarnach/task-frozen.md`. It is a member of the project plan (`Project relation: plan item … ocena-programu-na-ziarnach`); its dependencies, task 23 (the pattern of the balance instrument's code, PR #164) and task 24 (the stock and the resurrection, PR #166), are merged at your base, so D-189, D-179, D-251, D-190 and the resurrection's numbers stand in the wording task 24 left.
- Required outcome: the whole of *To do* 1–13 and the 13 rows of *Settlements to record* and the projected entry "(new) — How does the game judge a program before an earning loop?" of *Decisions in play*. Open design choices: none at the start — everything the task settles is settled (its *Questions to settle* are answered); what is left is how to make it. Where you find an open design choice the task, its answers and the foundation do not settle, write no plan and return a report of the choice (WAY-135); where one needs a language, framework, library, store of data, way of logging in or place to run, return `reserved`.
- Remarks from the cycle's orchestrator on the task text: (a) *To do* 13 was added to the document after the plan's acceptance record (by the day advisor, on Mariusz's behalf); it is part of the required outcome. (b) The task says the cycle checks how much room the remembered judgings take in a saved game with many characters, programs and maps against the 64 KiB limit (`savedGameLimit`); make that a check in the plan. (c) The plan's slices of Python tests (*To do* 12 and 13) touch only the parts `test-helpers`, `simulation`, `balance-tools`, `build-tools` and `product-foundation` (the part map) and do not depend on the game's code; keep them apart from the slices of the game.

## Answers of step 4 of the cycle

- Trust boundary: **yes** — `src/browser/sim/saved-game.ts` (the part map's trust boundary of `simulation`) takes in a saved game; this change adds the remembered judgings to its shape and its load. Mark every slice that touches that file or `src/browser/sim/previous-programs.ts` with the risk `trust boundary` (so that it gets a review of its own aimed at crafted input).
- Irreversible operation: **no** (the version bump of the saved game discards today's saves at deployment, which the project's definition accepts; the human deploys).
- Open design choice: none found by the orchestrator. Execution route: planned slices.

## What to read (selected by the orchestrator; the reading of the foundation by "Reading the foundation" in `.the-way/elements/common/way_of_working.md` is yours too)

- Parts the work touches (the part map `foundations/part_map.md`, read whole): `simulation`, `browser-view`, `balance-tools`, `test-helpers`, `product-foundation` (the foundation entries), `agent-workflow` (`guidelines/**`, `.claude/**` are its files — the styleguide and the guidelines live there) and, for the flaky test, `build-tools` (`tests/invariants/test_local_start_access.py`).
- Guideline files, each whole: `guidelines/coding.md`, `guidelines/coding-simulation-module.md`, `guidelines/coding-saved-game.md`, `guidelines/coding-browser-module.md`, `guidelines/coding-content-data.md` (the cap and the twelve seeds are numbers in the game's data), `guidelines/coding-balance-instrument.md`, `guidelines/styleguide-browser-view.md`, `guidelines/testing.md`, and `src/browser/AGENTS.md`.
- Foundation: the decisions named in the task's *Decisions in play* (D-243, D-329, D-325, D-241, D-246, D-22, D-190, D-326, D-239, D-189, D-251, D-179, D-249, D-170, D-409, D-165, D-328, D-206, D-07, D-18, D-437) as they stand at your base; the invariants the task lists; the glossary (`foundations/glossary.md`, whole). Select the rest by the method named above; the decision log is large (about 1.3 MB), so use `decision_index.py` as that method gives it, writing its output under `.runs/planner/`.
- The code the change reaches, for slicing: `src/browser/sim/` (`run.ts`, `loop.ts`, `trip.ts`, `types.ts`, `saved-game.ts`, `game.ts` and the data files of the game), `src/browser/view/` (`maps-screen.tsx`, `trip-lines.ts`, `away-report.ts`, `counted-name.ts`, `now-lines.ts`), `src/browser/state` or wherever the store of the game state lives, `balance/engine.mjs`, `balance/trace.mjs`, `balance/campaign.mjs`, and the Python tests named in *To do* 12 and 13.
- The size of `src/browser/sim/game.ts` is limited (D-425: 800 lines of code); the previous cycle's planner flagged it at 681. If the judging or the loop record lands there, say where it fits, or place it in a module of its own.

## Notes for slicing

- The foundation entries of the task (*To do* 9 and 10: two new decisions, the changes to D-243, D-325, D-329, D-241, D-246, D-22, the sentence of D-190's rationale, two glossary terms; the styleguide) are written through the project skills (`the-way-record-decision`, `the-way-record-glossary-term`, `the-way-update-part-map`, …) by the agents the plan names; the plan names entries and never words them. List them under the plan's *Foundation entries* or inside the slices that make their code, as the method gives; the tests that quote a decision's sentence (`decision:` lines) must follow a change of that sentence in the same slice (the previous cycle's tests of screens quoted changed sentences; a foundation check reported them).
- *To do* 11 changes `balance/engine.mjs`, a file of the kind `balance-instrument` and its exemplar (D-437); read its kind guidelines; the instrument must take the default cap from the built game's data.
- *To do* 12 (the merge of four copies of the cutting of source text in `tests/invariants/` into one code in the part `test-helpers`; the part map's entry of `test-helpers` follows through `the-way-update-part-map`) must keep every control case and expected value of the five tests that use a copy unchanged; the copies differ in details the task names.
- Checks in the plan are focused checks (a test file or a script by its command); no slice runs the full gate (WAY-160), and none should start a full `npm test` — the user has told the cycle that every full gate waits for a signal. A slice's check that runs one test file is allowed.

## Report

Write the report as `task-cycle/plan/SKILL.md` gives it, with **Unread material** (what this handoff names that stayed unread or was read in part, or `none`) and **Searches not found or unclear** (each thing looked for and not found or unclear, or `none`), and return its status, a one-line check result, and the report's path.
