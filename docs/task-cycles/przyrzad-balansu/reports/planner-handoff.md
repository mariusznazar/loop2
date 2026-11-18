# Handoff — planner (`plan-task`)

You are the planner of a task cycle of the-way. The orchestrator dispatches you on behalf of the
person who requested this cycle; that person delegated every intermediate choice to the
orchestrator. Nothing you read here is the human's approval of your plan.

- Worktree (work only from its root): `.runs/ of the main checkout/worktrees/przyrzad-balansu`, branch `task/przyrzad-balansu`, base `6a7b0acb4510084877e21579eaa0ab18232c9c19` (`origin/main`).
- Method: `.the-way/task-cycle/plan/SKILL.md` (read it whole; read a file it names only when its step comes).
- Stage and boundary: the planner. You write `plan.md` and `plan-size.md` in `.runs/task-cycles/przyrzad-balansu/`, and your report in `.runs/task-cycles/przyrzad-balansu/reports/planner-report.md`. You write no code, no test, no foundation entry; you ask no human; questions go back in your report.
- Your directory for working copies: `.runs/planner/` of the worktree.
- Frozen task, read whole: `.runs/task-cycles/przyrzad-balansu/task-frozen.md`. No spec was written (no open design choice). No project plan (independent task).

## Answers of step 4

- Trust boundary: no. Irreversible operation: no. So no slice needs the trust-boundary or irreversible-operation mark.
- Open design choice: none; reserved choice: none. The *Questions carried to cycle* of the task are yours to settle in the plan under *Choices*, each as the smallest reversible reading that fulfils the task.
- Route: planned slices (the change crosses five parts: a new one, `simulation`, `build-tools`, `agent-workflow`, `product-foundation`).
- Models: the orchestrator runs on Sonnet 5.5 (class `same`); the strongest class available is Opus; `cheaper` is Haiku. Set each slice's *Model* by the measure of the method (cheaper by default, with a reason for any other class).
- Checks the move of the pin carried: none (the pin does not move). Checks failing on the base: none.

## Facts the orchestrator found, which bind your plan

1. **D-80 is withdrawn.** The task cites it (in *Decisions in play* and *Acceptance criteria*); `foundations/decisions.md` (*Withdrawn identifiers*) says the rule now stands in `guidelines/testing.md`, "Where the expected value comes from", with D-73 and D-82. Read the task's use of D-80 as that rule. Never cite D-80 in a new entry, comment or test.
2. The *Acceptance criteria*'s one-time comparison of the repository instrument against the author's instrument (`las_najlepszy` on Las, seeds 1–500: 359 of 500 solved, 71.8 %, median 754 minutes) is a check of the cycle, not a standing test. Put it where it belongs as a *Checks* item of the slice that finishes the sweep command. The author's instrument lies outside the repository, at `a file of the author's private notes` (its `README.md`, and the directories `przyrzad/`, `programy/`, `nakladki/`, `polityki/`; the cross-check of agreement is modelled on `przyrzad/sprawdzenie_zgodnosci.mjs`; the three overlays of the old game are in `the notes' analyses folder/the progression critique's notes folder/nakladki/` and its programs in `programy/` and `przyrzad/wspolne.mjs`). Only a handoff may name this path; **no file of the repository, no comment, no test and no entry may name it or any file of the private notes** (D-362, invariants `tracked-file-private-paths`, `tracked-file-private-names`). Say in each slice's *Read* that the executor reads the sources there and copies from them, in the code, what the code needs in its own words.
3. The files the new part claims must not also fall under another part's pattern: `build-tools` claims `scripts/**` and `tests/quality/**`, `simulation` claims `tests/sim/**` and `src/browser/sim/**`. Decide in the plan where the instrument, the shared programs, the overlays, the player descriptions and the instrument's tests stand (and the shape of the new part's entry in `foundations/part_map.md`), keeping the dependency rule of D-351 and the invariant `cross-part-imports`: the new part depends on `simulation`; the tests of `simulation` that read the shared programs must not depend on the new part, so settle which part claims the shared programs file and how `tests/sim` reads it without a forbidden import. Name this as a *Choice* and, if no placing satisfies both, return it as an open design choice.
4. New `.mjs` files fall under ESLint and Prettier (`guidelines/coding.md`, "Linter", "Formatter"; D-29, D-32); `tests/quality/test_source_tool_scope.py` stops the gate on a file the configuration does not cover. Code is written in English (identifiers, comments, flags, docstrings); strings the tool prints for the human that name game things use the game's own words from the data. Size of functions and files: D-425 (`guidelines/coding.md`, "Size of a function and a file") — the ported code of the author's instrument must be divided where it breaks the threshold.
5. The guidelines (`guidelines/coding.md` and `guidelines/testing.md`: the *Applies to* line and, in `testing.md`, the part table) are changed "through the skills `the-way-maintain-coding-guidelines` and `the-way-maintain-testing-guidelines`" (task To do 10). Executors have no skill tool; they read a skill's `SKILL.md` as a file. Decide in the plan which slice writes them and name each skill's `SKILL.md` in its *Read*. The foundation entries (rows 1–5 of *Settlements to record*, the change of D-378, the new part in the part map) go through the foundation step (`task-cycle/skill/foundation_step.md` of the pinned the-way) as the method's *Foundation entries* of the plan; read that file and give the plan's *Foundation entries* section as `plan-task` requires.
6. The cycle's one gate (`npm test`, about 13 minutes) is run only by the orchestrator, not by any slice; no slice's *Checks* names it. A slice's checks are focused ones (`node --test <file>`, `node scripts/test-node-file.mjs`, the linter and formatter on the files, the foundation check `python -B .the-way/elements/common/foundation_check.py`).

## What you read (decided by the orchestrator, WAY-150, WAY-213)

Foundation, by identifier, each entry whole (`foundations/decisions.md`; an index of the selection is at `.runs/orchestrator/index.md` — use it to locate, and open each entry named here whole):

- The task's *Decisions in play*: D-378, D-388, D-18, D-22, D-82, D-83, D-266, D-351, D-362.
- Neighbours the change reaches: D-398, D-404 (Skraj lasu and the first pass), D-239, D-240, D-249 (earning loop and what a loop discovers), D-136 (how a map is solved), D-28, D-29, D-32, D-35 (exemplar of the simulation modules), D-73, D-81, D-84, D-85 (testing discipline), D-405 (order of the gate), D-417 (the play skill), D-425.
- Invariants (`foundations/invariants.md`, each whole): `map-run-repeatability`, `simulation-randomness`, `simulation-isolation`, `program-closed-lists`, `cross-part-imports`, `tracked-file-private-paths`, `tracked-file-private-names`, `eslint-source-rules`, `function-and-file-size`.
- `foundations/part_map.md` and `foundations/glossary.md`, whole (short).
- The rules of the product's foundation entries are the business of the foundation step; you do not read the element templates.

Guidelines, each whole: `guidelines/coding.md`, `guidelines/coding-simulation-module.md`, `guidelines/testing.md`. Name in your report what you find missing or uncertain in them (for example, a kind of code for the instrument that has no kind file yet, and an exemplar it would need).

Code and tests to read as far as you need to cut slices: `src/browser/sim/` (the exported functions the author's instrument calls: `newMapRun`, `stepMinute`, `send`, `advanceMinutes`, `settleDeath`, `startLoop`, `catchUp`, `stopLoop`, `buyBranch`), `src/browser/sim/data/` (maps, balance, scene), `tests/sim/acceptance.test.mjs`, `tests/sim/first-map-balance.test.mjs`, `scripts/build.mjs`, `scripts/test-node-file.mjs`, `package.json`, `eslint.config.mjs`, `tests/quality/test_source_tool_scope.py`, `.claude/skills/loop2-play/SKILL.md` (the model for the new skill `loop2-balance`), `AGENTS.md`.

## What the plan must deliver

Cover every item of *To do* 1–12 and *Acceptance criteria*, every row 1–5 of *Settlements to record*, the change of D-378 (*Decisions in play*, Question 2), and name for slices the files, *Read*, *Checks*, *Model* and *Risk* as `plan-task` requires. Run `task-cycle/slice_size.py` as the method gives; every slice must fit.

## Working copies (word for word, WAY-148)

An agent of the cycle that makes a working copy to check something — a worktree of a commit, a clone, a script, a screenshot, a prepared input of a test — makes it in a directory of its own directly under the ignored `.runs/` of the task's worktree, the directory its handoff names; never in the system's temporary directory, in the scratch directory of a session or in the main checkout of the repository. The screenshot that a screenshot tool, such as the Playwright server, saves by itself under its session's directory is moved into the agent's directory and the original removed, except a screenshot that is shown to the human: that one goes where `task-cycle/change/ui_check.md` says, to the place the product's foundation settles for screenshots, and into the agent's directory only where no such place is settled. The files that a product's own tools and tests make by themselves are no working copy of the agent and stay outside this rule. Before the agent returns, each time it returns, it removes its copy — a worktree with `git worktree remove --force`, then `git worktree prune` — keeps in `reports/` beside its report what the report needs, and states in the report where each copy stood and that it was removed. Where a removal fails, the agent finishes all the same and names in the report the remainder, with its full path and the reason it stayed.

## Report

Write the report at the path above as the method gives it. It must hold its status line, its **Unread material** (what this handoff names that stayed unread or was read in part, or `none`) and **Searches not found or unclear** (each thing looked for and not found or unclear, or `none`), and your reaches beyond this handoff. Return: status, a one-line check result (what failed or did not run), and the report's path.
