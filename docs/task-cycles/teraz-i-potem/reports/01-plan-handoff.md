# Handoff 01 — planner (plan-task)

## Delegation

The human (Mariusz) started the-way task cycle for this task with `/the-way-implement-task` and delegated intermediate choices to the cycle's orchestrator. You are a fresh agent of the cycle. Send every question to the orchestrator by returning `questions`; never ask the human, never start the next stage.

## Where you work

- Worktree (work from its root): `the worktree's root`, branch `task/teraz-i-potem`, base `381588fbd31838b9c0075707a6588213cf6e5eaa`.
- Pinned the-way: `.the-way` at `294af7fde45323ac1851c014a03071a97fc38d96`.
- Method: read `.the-way/task-cycle/plan/SKILL.md` whole and follow it; read a file it names (such as `too_large.md`) only when the step or variant that names it comes. The size script is `.the-way/task-cycle/slice_size.py`.
- Stage and boundary: write the plan of this task's change. You write only `.runs/task-cycles/teraz-i-potem/plan.md` and its size report `.runs/task-cycles/teraz-i-potem/plan-size.md`. No code, no test, no foundation entry, no commit.
- Report path: `.runs/task-cycles/teraz-i-potem/reports/01-plan-report.md`. Return: your status (`done`, `done with concerns`, `questions`, `returned` or `reserved`), the size script's command and exit code in one line, and the report path. The report holds your questions and concerns, every reach beyond this handoff, and the section **Searches not found or unclear** (each thing looked for and not found or unclear, or `none`).

## The task

- Frozen task: `.runs/task-cycles/teraz-i-potem/task.md` (copy of the human's task note, accepted 2026-11-07; sha256 prefix c9b0814f444b3e7c). Read it whole. It is a plan item: `plan_mvp2_loop2.md — teraz-i-potem`, task 14. Its *To do* point 6 gives the binding wording of every foundation entry the task writes; take the wording from there, not from the definition.
- Spec: none — the orchestrator found no open design choice (below). If you find one in the code, return `returned` with it, as your method gives.

## Answers of step 4 and the orchestrator's settlements

- Trust boundary: no. The change does not touch `src/browser/sim/saved-game.ts` nor `assets/icons/**`, `assets/fonts/**`, `assets/sprites/**`; the shape of the saved game does not change (task, Context). If a slice would have to touch one of these, return the question instead of planning it.
- Irreversible operation: no.
- So every slice's *Risk* is `none` unless you find otherwise and say why.
- Carried question 1 (where to count the minutes of needs): in the simulation, beside the rules of cooling and hunger, and the view only writes them out — settled by D-04 and D-333 (its statement and its *Rejected*: „the view counting the numbers — the cooling of the body … would be written twice”). Look at how task 13 counted „bez ognia” for the card of a map (`src/browser/sim/map-card.ts` and what it calls) and reuse the rule of the body rather than write a third formula.
- Carried question 2 (how „Teraz” and „Potem” get what they name): from the function of the simulation that picks the rule (`judgeProgram` in `src/browser/sim/program.ts` and what derives from it), with only the D-147 exceptions — settled by the invariant `rule-state-from-pick` in the wording of To do 6 and by D-308, D-309.
- Colours: the red of „marznie”/„głoduje” and the grey of the body-row notes need no new token value: `--danger` (its source names „marznie”, „głoduje”) and `--text-secondary` stand in `src/browser/tokens.css`. Which role carries each is settled by the styleguide step of To do 5 through `the-way-maintain-styleguide`. A value the token file does not hold may not be added in this cycle (see `src/browser/AGENTS.md`).
- To do 5 sends the guideline changes through the project skills `the-way-maintain-coding-guidelines` and `the-way-maintain-styleguide`; plan the slices that make those changes so their executors use those skills. In a cycle no human is present: those skills' steps that lead a matter with the human are answered from the task (To do 5 and the answered questions); a matter the task does not settle returns to the orchestrator as a question.
- Model classes for *Model*: the orchestrator runs on Opus 5.5. `cheaper` = Sonnet, `same` = Opus, `strongest` = Opus (one class with `same`).

## What to read besides the task

Product instructions: `AGENTS.md`, `src/browser/AGENTS.md`, and for a check in a running browser `.claude/skills/loop2-play/SKILL.md` (as the source of what a UI slice's check can run).

Guidelines, each whole:
- `guidelines/coding.md`
- `guidelines/coding-browser-module.md`
- `guidelines/coding-simulation-module.md`
- `guidelines/styleguide-browser-view.md` (with its order-of-work example)
- `guidelines/testing.md`

Foundation, each entry whole (decisions from their `###` heading to the next one in `foundations/decisions.md`; invariants from their `##` heading to the next one in `foundations/invariants.md`):
- Decisions of the task's *Decisions in play*: D-133, D-147, D-122, D-132, D-39, D-40, D-57, D-62, D-135, D-178, D-130, D-125, D-188, D-308, D-309, D-310, D-311, D-320, D-42, D-46, D-58, D-43, D-265, D-03.
- Decisions of the parts touched that bear on the work: D-04, D-333, D-280, D-282, D-185, D-216, D-123, D-126, D-127, D-140, D-141.
- Invariants: `rule-state-from-pick`, `program-rule-pick`, `action-in-progress`, `simulation-isolation`, `simulation-inputs`, `map-run-repeatability`, `browser-view-token-values`, `browser-view-focus-outline`, `design-token-contrast`, `design-token-sources`, `browser-view-framework`, `content-identifiers`, `eslint-source-rules`, `prettier-source-format`, `node-test-selection`.
- `foundations/part_map.md`, the parts `browser-view`, `simulation` and `product-foundation`.

Code to read for the plan (the task's *Context* gives the line numbers at `b97fdd0`; the base `381588f` may have moved them — find them again): `src/browser/view/status-row.ts`, `src/browser/view/run-header.tsx`, `src/browser/view/world-area.tsx`, `src/browser/view/body-row.ts`, `src/browser/sim/program.ts` (`judgeProgram`, `chooseActivity`, `chooseCombatRule`), `src/browser/sim/types.ts` (`run.current`, combat), `src/browser/sim/body.ts`, `src/browser/sim/data/balance.ts`, `src/browser/sim/map-card.ts`, `src/browser/view/program-editor.ts` (`ruleNumber`, `actionSentence`), and the tests in `tests/view/` (`status-row`, `run-header`, `world-area`, `body-row`, `run-screen`, `rule-signs`) and `tests/sim/`.

Old Loop, read-only, for the words and order the task cites: `old Loop, src/components/probe/NowLine.tsx`, `RunWorld.tsx`, `MapScreen.tsx`, `old Loop, src/sim/data/maps.ts` (the task cites commit `cdc7c0d`).

## What the plan must cover

Every item of *To do* (1–6 with every bullet), every row of *Settlements to record* (1–8), every entry of *Decisions in play* the task writes whole or in part or corrects (D-311, D-122, D-132, `rule-state-from-pick`, D-133, D-147, D-39, D-40, and the *Verification* examples of D-62, D-135, D-178, D-57), and the guideline rows of To do 5. The product's gate is run by the orchestrator, not by a slice: each slice's *Checks* name focused checks only.
