# Handoff — planner (stage: plan-task) — task `paski-parametrow`

## Delegation
The person who requested this cycle delegated intermediate choices to the orchestrator. The orchestrator's answers are never that person's approval. You ask no human; your questions go back to the orchestrator in your report.

## Where you work
- Worktree (your working directory, the root you run everything from): `the root of the task's worktree`, branch `task/paski-parametrow`, base commit `51667231eafb32db53eaaf662f07e728323aa2ba`. `.the-way` there is at `b502011f`, equal to the gitlink.
- Your directory for working copies: `.runs/planner/`.
- Method of your stage: `.the-way/task-cycle/plan/SKILL.md` (variant: none, no table of variants applies). Read it whole; read a file it names only when its step or variant comes. You run no gate and no full test run (the gate is the orchestrator's or CI's); focused checks you may name in the plan must be commands that can actually run.
- Stage and boundary: you write `plan.md` and `plan-size.md` into `.runs/task-cycles/paski-parametrow/` and return before any slice is made. You write no code, no test, no foundation entry.
- Report path: `.runs/task-cycles/paski-parametrow/reports/planner-report.md`. The report file is the input of the cycle's scripts (`task-cycle/remarks_check.py` reads it); if the harness still refuses the write, return the report whole as your answer. The report ends with the sections **Unread material** and **Searches not found or unclear**; `none` is an answer, a missing section is not.
- `cycle.md` and every other file in `.runs/task-cycles/paski-parametrow/` (other agents' handoffs, reports) are not yours to read, unless this handoff names them.

## Task and route
- Frozen task, read it whole: `.runs/task-cycles/paski-parametrow/task.md` (Status: ready for cycle; plan item 18 of the project plan `plan_projektu_2_loop2.md`; `Questions carried to cycle`: none; `Human actions`: none). No spec exists: the orchestrator found no open design choice. The task's *Settlements to record* (rows 1–11) are settled entries; the decisions D-337, D-311, D-178, D-39, D-40, D-42 and D-04 change as its *Decisions in play* give. The task states that a choice left to the agent (values of own roles and their sources in `src/browser/tokens.css`, duration of the fill transition, whether the amber outline takes an existing role or an own role, wording of the explanations, form of the extended shared button) is made by the executor of the slice that holds it; do not widen the task.
- Answers of step 4 (two questions at start): trust boundary — no; irreversible operation — no. So no slice carries a *Risk* mark. (The screenshots are pushed by the agent itself to the public screenshots repository as D-418 and D-419 settle; that is a settled route, not a risk.)
- Why planning: the change spans the view logic (scale of temperature, thresholds, notes, outline, blow marker from simulation events, open explanation), CSS and tokens with the contrast checks, the shared button and the kitchen-sink page, the styleguide rule, seven decisions of the foundation and the screenshots for the request. Divide it into slices each one agent can hold; propose where the foundation entries go (the plan's *Foundation entries*) and where the screenshots for the request description go (the last slice or the orchestrator — say which and why).
- Class of the planner: strongest available.

## What to read (the orchestrator's selection, WAY-150, WAY-213)
Parts the change touches: `browser-view` (src/browser/view/**, src/browser/*.css, src/browser/kitchen-sink/**, tests/view/**, the invariant tests of the part named in the part map), `product-foundation` (foundations/**) and, for the styleguide, its guideline file. `simulation` is only read (the events). No file is a trust boundary.

Guideline files, each whole: `guidelines/coding.md`, `guidelines/coding-browser-module.md`, `guidelines/styleguide-browser-view.md` (large; its order-of-work example you follow or explain the departure from), `guidelines/testing.md`, `src/browser/AGENTS.md`. Also `foundations/part_map.md` section `browser-view` and `product-foundation`. The kind index in `guidelines/coding.md` tells whether another `guidelines/coding-<kind>.md` applies to a file the change adds; name each reach.

Decisions, by identifier (read whole, or by `python -B .the-way/elements/common/decision_index.py --decision <id> --output .runs/planner/<file> .`; the index the orchestrator wrote is `.runs/task-cycles/paski-parametrow/foundation-index.md`, you may read it): D-337, D-311, D-178, D-39, D-40, D-42, D-04, D-125, D-57, D-133, D-396, D-44, D-45, D-322, D-317, D-418, D-419, D-38 (all named by the task's *Decisions in play*), and in addition D-265 (form of a shared control), D-395, D-407 (React state per screen), D-421 (stylesheets), D-274, D-275, D-279 (colour of a frame or bar), D-47, D-48, D-43, D-58, D-59, D-60, D-175–D-177, D-377, D-387, D-201, D-324, D-334–D-336, D-368–D-371, D-385.

Invariants (the part's, by identifier, in `foundations/invariants.md`): `browser-view-framework`, `browser-view-token-values`, `browser-view-focus-outline`, `design-token-contrast`, `design-token-sources`, `application-build-kitchen-sink`, `function-and-file-size`, `content-identifiers`, `cross-part-imports`, `node-test-selection`, `document-test-memory-limit`, `tracked-file-private-paths`, `tracked-file-private-names`, and the four source-format and lint ones of the part (`eslint-source-rules`, `prettier-source-format`, `ruff-source-rules`, `ruff-source-format`).

Code the task names (read to cut slices): `src/browser/view/body-row.ts`, `src/browser/view/world-area.tsx`, `src/browser/run-screen.css`, `src/browser/styles.css`, `src/browser/tokens.css`, `src/browser/character-screen.css`, `src/browser/view/controls/react-button.tsx`, `src/browser/kitchen-sink/role-samples.tsx` and the rest of `src/browser/kitchen-sink/`, `src/browser/sim/data/balance.ts`, `src/browser/sim/run.ts` (type `GameEvent`, `finishMinute`), `tests/view/body-row.test.mjs`, `tests/view/world-area.test.mjs`, `tests/invariants/test_design_token_contrast.py`, `tests/invariants/test_design_token_sources.py`.

Known neighbouring change (task 8, equipment of the character) may also rewrite the sentence of D-311 about what stands under the body row; the cycle that goes second adds its own part. It is not this task's.

## Points the plan must handle (from the orchestrator's reading of the task)
1. Every row of *Settlements to record* and every *To do* item (1–9) and the acceptance criterion must be covered by a slice or by the *Foundation entries*; coverage table in the plan.
2. Decisions are written only through the skills `the-way-record-decision`, `the-way-record-invariant`, `the-way-record-glossary-term`, `the-way-update-part-map` (the executor reads the `SKILL.md` of the element it writes, as `task-cycle/skill/foundation_step.md` gives); the styleguide only through the styleguide method of the-way (`.the-way/styleguide/`-style maintenance: check what the pinned the-way names for writing a rule of `guidelines/styleguide-browser-view.md`, and name it in the plan). State which slice writes the new rule "The body row of a map run" and edits the table of roles, "Contrast of every pair" and "States of shared controls".
3. Gate and measurement: the full gate is the orchestrator's; slices name focused checks only (for example a single `node --test` file, the contrast invariant test, `npm run typecheck`), never `npm test`.
4. Slice sizes: run `python -B .the-way/task-cycle/slice_size.py` as the plan method says; every slice must fit.
5. Mind that D-337 is rewritten (its *Rejected* and *Rationale* change), and that the task states the new pairs for the contrast test (`PAIRS` of `tests/invariants/test_design_token_contrast.py`) and the new role samples of the kitchen-sink page (D-45).
6. The task's item 8 (the side-by-side screenshots in the request, from the old Loop screenshots of 31 October in the folder `rozpoznanie_mvp2/zrzuty` beside the project definition — the folder is under the key `projects` of `loop2` in `~/.the-way/locations.json`, reading outside the worktree stays with the agent — and screenshots of loop2 at 1600 × 1000 and of the row at 360 px) is part of the change's evidence; the rules for where screenshots lie are D-418, D-419 and `task-cycle/change/ui_check.md`. Say in the plan who takes them and when (they must be taken from the finished UI).

## Working copies — copied word for word from the cycle's skill
An agent of the cycle that makes a working copy to check something — a worktree of a commit, a
clone, a script, a screenshot, a prepared input of a test — makes it in a directory of its own
directly under the ignored `.runs/` of the task's worktree, the directory its handoff names; never
in the system's temporary directory, in the scratch directory of a session or in the main checkout
of the repository. In a product, a worktree or checkout made to run checks gets its `.the-way`
populated, and the dependencies those checks need installed as the product's own rules give,
before they run; otherwise they fail for that reason. The screenshot that a screenshot tool, such as the Playwright server, saves by
itself under its session's directory is moved into the agent's directory and the original removed,
except a screenshot that is shown to the human: that one goes where `task-cycle/change/ui_check.md`
says, to the place the product's foundation settles for screenshots, and into the agent's directory
only where no such place is settled. The files that a product's own tools and tests make by
themselves are no working copy of the agent and stay outside this rule. Before the agent returns,
each time it returns, it removes its copy — a worktree with `git worktree remove --force`, then
`git worktree prune` — keeps in `reports/` beside its report what the report needs, the input and
command of a probe that shows a finding among them, and states in
the report where each copy stood and that it was removed. Where a removal fails, the agent finishes
all the same and names in the report the remainder, with its full path and the reason it stayed. It
removes a copy, as any directory, by its path written out in full in the command, never through a
shell variable: an empty variable turns the removal on the directory the shell stands in.
