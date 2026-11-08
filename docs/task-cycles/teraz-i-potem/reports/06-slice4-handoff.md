# Handoff 06 — slice 4 (make-change)

## Delegation

The human (Mariusz) started the-way task cycle for this task with `/the-way-implement-task` and delegated intermediate choices to the cycle's orchestrator. You are a fresh executor of the cycle. Send every question to the orchestrator by returning `questions`; never ask the human, never start the next slice or stage.

## Where you work

- Worktree (work from its root): `the worktree's root`, branch `task/teraz-i-potem`. The slice's base is the branch's head when you start (`git rev-parse HEAD`); the orchestrator recorded it.
- Pinned the-way: `.the-way` at `294af7fde45323ac1851c014a03071a97fc38d96`.
- Method: read `.the-way/task-cycle/change/SKILL.md` whole and follow it. You make **a slice, or the retry of a slice**; read a file it names (such as `slice.md` or `ui_check.md`) when the step or variant that names it comes.
- Class of model: cheaper (Sonnet), by the plan.
- Boundary: make slice 4 of the plan and nothing else; change only the files its *Change* names (a file outside it is a reach you name in your report, or a question). Commit by path (`git add <file> …`, never `-A`), English commit messages in the repository's form (`feat: :sparkles: …`, `test: …`, `docs: :memo: …`). Do not run the product's whole gate (`npm test` with no argument); run the focused checks of the slice's *Checks*.
- Report path: `.runs/task-cycles/teraz-i-potem/reports/06-slice4-report.md`. Return your status (`done`, `done with concerns`, `questions`, `returned`, `reserved` or `blocked`), your commits, a one-line check result naming what failed or did not run, and the report path. The report holds each check with its command and exit code, your own-work check, every reach beyond this handoff, your questions and concerns, and the section **Searches not found or unclear** (each thing looked for and not found or unclear, or `none`).

## Task, spec, plan and answers of step 4

- Frozen task: `.runs/task-cycles/teraz-i-potem/task.md` (the human's task note, accepted 2026-11-07). Read the passages your slice's *Read* names.
- Spec: none. Plan: `.runs/task-cycles/teraz-i-potem/plan.md`.
- Trust boundary: no. Irreversible operation: no. No slice touches `src/browser/sim/saved-game.ts`, `src/browser/sim/types.ts` or `assets/**`; if yours would have to, return the question.
- The plan's *Foundation entries* are written (commit `bd44c39`): rows 1, 4 and 8 of *Settlements to record* stand in D-334, row 2 in D-335, row 3 in D-336, row 7 in D-337, rows 5 and 6 in D-133. Where the *Read* says "Foundation entries row N", read the entry named here.

## Your slice — copied word for word from `plan.md`

### Slice 4 — Each requirement of the solving condition, in the simulation

- **Goal:** `src/browser/sim/run.ts` exports, beside `meetsSolving`, a function, named by the slice,
  that gives for a map run on its map each requirement present in the map's solving condition, in
  the order streak, then beaten attacks, with the map run's count of it, the number required and
  whether it is met; `meetsSolving` reads it, so that a requirement counts as met in one place (the
  numbers that follow a rule of the game are the simulation's, D-04, D-333). After the end it gives
  the state of the stopped minute, such as the streak 0 after a death of cold (row 6). Write the
  failing cases first in `tests/sim/completion.test.mjs`: Las with one requirement, 120 of 480 not
  met and 480 of 480 met; Las — głębiej with both requirements in their order, one met and one not;
  a requirement the data leaves out not given; after a death of cold the streak at 0. Inputs are not
  changed.
- **Change:** `src/browser/sim/run.ts` · `tests/sim/completion.test.mjs`
- **Read:** `.runs/task-cycles/teraz-i-potem/task.md:39-43` To do, item 3 ·
  `.runs/task-cycles/teraz-i-potem/task.md:78-85` Questions to settle, Pytanie 5 ·
  `.runs/task-cycles/teraz-i-potem/task.md:218-231` Settlements to record ·
  Foundation entries rows 5 and 6 and D-133 · `foundations/decisions.md:52-120` D-04 ·
  `foundations/decisions.md:2465-2498` D-131 · `foundations/decisions.md:2525-2546` D-133 ·
  `foundations/decisions.md:2566-2584` D-135 · `foundations/decisions.md:7175-7188` D-333 ·
  `foundations/invariants.md:214-235` simulation-isolation, simulation-inputs ·
  `foundations/glossary.md:136-155` completion, solved map, streak ·
  `foundations/glossary.md:162-167` beaten attack · `foundations/part_map.md:30-61` simulation ·
  `guidelines/coding.md` · `guidelines/coding-simulation-module.md` · `guidelines/testing.md` ·
  `src/browser/sim/data/maps.ts` · `src/browser/sim/types.ts:232-289` Death to MapRun ·
  `src/browser/AGENTS.md`
- **Model:** cheaper
- **Risk:** none
- **Checks:** `npm test -- tests/sim/completion.test.mjs` (its new cases failing first) ·
  `npm test -- tests/sim/streak.test.mjs` · `npm test -- tests/invariants/test_simulation_inputs.py` ·
  `npm test -- tests/invariants/test_simulation_isolation.py` · `npm run typecheck`
- **Depends on:** row 5 · row 6 · D-133

## Current ranges of the foundation entries your *Read* names

The ranges in the *Read* above are from the plan; the foundation step has moved them. These hold now (an entry runs from its heading to the next one):

| Entry | Range now |
|---|---|
| D-133 | `foundations/decisions.md:2527-2560` |
| D-04 | `foundations/decisions.md:52-120` |
| D-131 | `foundations/decisions.md:2466-2499` |
| D-135 | `foundations/decisions.md:2580-2598` |
| D-333 | `foundations/decisions.md:7201-7215` |
| `simulation-isolation` | `foundations/invariants.md:214-225` |
| `simulation-inputs` | `foundations/invariants.md:226-235` |

Line ranges of the task, guidelines and code in the *Read* stand as the plan gives them, except where an earlier slice changed a file: find the passage again by its name.
