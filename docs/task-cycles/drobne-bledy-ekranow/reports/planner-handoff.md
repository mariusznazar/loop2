# Handoff — planner of the cycle `drobne-bledy-ekranow`

## Delegation

The person who requested this cycle (the human, through the adviser of the day) has delegated the intermediate choices to the orchestrator of `implement-task`. You do not ask the human anything. Questions go to the orchestrator in your report with status `questions`; the orchestrator answers from the task, its sources, the foundation and the code. Nothing the orchestrator answers is the human's approval.

## Where you work

- Worktree (your working directory; work from its root): `.`, branch `task/drobne-bledy-ekranow`, base `bd82d394e8ea08c77c8c8afb695bd931706f1644` (merge of PR #145; target branch `main`).
- Process: the-way pinned as `.the-way` at `bfb2e109735b5fff98802b8be0ff3c43c799262a`, checked against the gitlink.
- Your stage: **planner**, method `plan-task`, file `.the-way/task-cycle/plan/SKILL.md`. Read it whole and follow it. Read a file it names only when the step or variant that names it comes. You write no code and no foundation entry; you write `plan.md` and its size report `plan-size.md`.
- Your boundary: you return after the plan and its size report are written and committed nowhere (they live in the ignored record directory); you do not start any slice and you do not seek human approval.
- Variant: not applicable to `plan-task` (no table of variants); the whole change is planned.
- Your report path: `.runs/task-cycles/drobne-bledy-ekranow/reports/planner-report.md`. Write `plan.md` and `plan-size.md` to `.runs/task-cycles/drobne-bledy-ekranow/`.
- Your directory for working copies: `.runs/planner/`.

## Working copies (first paragraph of the cycle's rule, word for word)

An agent of the cycle that makes a working copy to check something — a worktree of a commit, a
clone, a script, a screenshot, a prepared input of a test — makes it in a directory of its own
directly under the ignored `.runs/` of the task's worktree, the directory its handoff names; never
in the system's temporary directory, in the scratch directory of a session or in the main checkout
of the repository. The screenshot that a screenshot tool, such as the Playwright server, saves by
itself under its session's directory is moved into the agent's directory and the original removed,
except a screenshot that is shown to the human: that one goes where `task-cycle/change/ui_check.md`
says, to the place the product's foundation settles for screenshots, and into the agent's directory
only where no such place is settled. The files that a product's own tools and tests make by
themselves are no working copy of the agent and stay outside this rule. Before the agent returns,
each time it returns, it removes its copy — a worktree with `git worktree remove --force`, then
`git worktree prune` — keeps in `reports/` beside its report what the report needs, and states in
the report where each copy stood and that it was removed. Where a removal fails, the agent finishes
all the same and names in the report the remainder, with its full path and the reason it stayed.

## The task

The frozen task (read it whole; it is the source and the only authority): `.runs/task-cycles/drobne-bledy-ekranow/task.md` — 25 points of *To do*, *Questions to settle* with answers, *Decisions in play*, *Settlements to record* (17 rows), *Out of scope*. Project relation: independent. Human actions: none. Questions carried to cycle: none.

Nothing in this handoff restates a value or requirement of the task; where this handoff and the task differ, the task holds.

## Answers of step 4 (the orchestrator's)

- Trust boundary: no. The part map's trust boundary of browser-view is `assets/icons/**`, `assets/fonts/**`, `assets/sprites/**`; of simulation, `src/browser/sim/saved-game.ts` and `src/browser/sim/previous-programs.ts`. Mark a slice with a trust-boundary *Risk* if its files include any of these.
- Irreversible operation: no.
- Open design choice: none. Points 11 and 12 of *To do* are conditions the executor judges in the running game (look, then narrow or keep the scroll; replay, then fix only where the practice is lost against the rules); they leave no way open, and each needs a slice whose executor has the local start of the game and a real browser (`.claude/skills/loop2-play/SKILL.md`).
- Reserved choice: none.
- Route: planned slices (already decided; you divide the change).
- Checks the move of the pin carried: none (the pin did not move). Checks failing on the base: none (`cycle.md` of the merged cycle of the base, final gate green).
- Slice classes: the model classes of the harness are `cheaper` = haiku, `same` = sonnet (the orchestrator's), `strongest` = opus; fable is disabled. Set each slice's *Model* by the measure `plan-task` gives, with a reason for a class other than `cheaper`.
- Gate: no slice runs the full gate; each slice's *Checks* are focused checks only. The full gate is the orchestrator's alone (WAY-160), and this cycle's human has asked that it wait for a signal from the adviser of the day before every full run.

## What to read

Foundation entries (by identifier; the log is `foundations/decisions.md`):

- the 22 decisions of the task's *Decisions in play*: D-04, D-41, D-172, D-207, D-208, D-285, D-294, D-297, D-306, D-316, D-318, D-319, D-322, D-336, D-342, D-348, D-350, D-370, D-371, D-381, D-396 and D-421 — and, for each one the task changes (D-04, D-172, D-207, D-285, D-297, D-306, D-342, D-350, D-381), its whole entry with *Rejected*.
- The index of the selection made by "Reading the foundation" for the parts the work touches (browser-view, simulation, product-foundation, agent-workflow): `.runs/task-cycles/drobne-bledy-ekranow/decision-index.md` (168 entries; open whole the decisions the work changes, goes against or whose binding sentences leave open what to do). `--sections` listed the sections in `.runs/task-cycles/drobne-bledy-ekranow/sections.md`.
- Parts: `foundations/part_map.md` (whole), `foundations/glossary.md` (whole).
- Invariants: read by step 3 of "Reading the foundation" those whose *Part* names browser-view, simulation or `every`; at least these likely bear on the work: `browser-view-framework`, `browser-view-token-values`, `browser-view-focus-outline`, `design-token-contrast`, `design-token-sources`, `terrain-drawing-numbers`, `program-rule-pick`, `program-closed-lists`, `program-world-reference`, `walk-target`, `walk-feasibility`, `move-reach`, `action-in-progress`, `account-client-requests`, `account-client-outcomes`, `focused-test-execution`, `node-test-selection`. Add what you find and list it in the plan's *Read*.

Guidelines (each whole): `guidelines/coding.md`, `guidelines/coding-browser-module.md`, `guidelines/coding-browser-api-client.md`, `guidelines/coding-content-data.md`, `guidelines/coding-simulation-module.md`, `guidelines/styleguide-browser-view.md`, `guidelines/testing.md`, and `src/browser/AGENTS.md` (the product's rule for work in `src/browser/`). Name in your report any other guideline file you reach.

The foundation entries the task writes (rows 1–17 of *Settlements to record*, including the changes to D-04, D-172, D-207, D-285, D-294, D-297, D-306, D-342, D-350, D-381 and the styleguide rows) are written by the foundation step: read `.the-way/task-cycle/skill/foundation_step.md` to see how, and give them in the plan's *Foundation entries* as the method says.

## What the plan must keep in view

- Every item of *To do* 1–25 appears in some slice, and every row of *Settlements to record* is covered by *Foundation entries* or a slice. Say so row by row.
- After PR #145 the style sheet `src/browser/styles.css` was split into files of the screens (`src/browser/*.css`, `tests/view/game-stylesheets.mjs` and the decision D-421). The rules of points 2, 8, 9 and 22 may stand in the file of a screen; find them by their content.
- Points 11 and 12 are decided in the running game: plan a slice for each whose executor runs the game locally and looks; for point 12, the condition (fix only where the practice is lost against the rules) belongs to the slice's judgment, and its report says whether it fixed anything.
- Point 17 is about the save rhythm in the browser; D-207 and D-208 bind the one request in flight and the at-once send; the slice's tests must show the rhythm does not duplicate the planned retry.
- Point 3 adds the unit to the data of conditions (`src/browser/sim/data/conditions.ts`) with a test that every condition with a number has one; the three places that show the number read it from the data.
- A UI change's executor reads the styleguide's example of the order of work (WAY-213) and, for a change of look, `task-cycle/change/ui_check.md`; the plan's *Read* names them for those slices.
- Keep each slice small enough that a `cheaper` executor can hold it where the work allows; a slice that changes a decision's sentence must come with the code that makes the sentence true, or follow it, so that no commit leaves the foundation check red where the plan lets a slice end with it green.

## Your report

Write the report as `plan-task` gives it: status (`done`, `done with concerns`, `questions`, `returned` or `reserved`), the plan and size-report paths, a one-line check result naming what failed or did not run, your questions and concerns, **Unread material** (what this handoff names that stayed unread or was read in part, or `none`), **Searches not found or unclear** (each thing looked for and not found or unclear, or `none`), and the line on working copies.
