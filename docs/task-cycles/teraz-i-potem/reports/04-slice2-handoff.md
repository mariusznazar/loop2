# Handoff 04 — slice 2 (make-change)

## Delegation

The human (Mariusz) started the-way task cycle for this task with `/the-way-implement-task` and delegated intermediate choices to the cycle's orchestrator. You are a fresh executor of the cycle. Send every question to the orchestrator by returning `questions`; never ask the human, never start the next slice or stage.

## Where you work

- Worktree (work from its root): `the worktree's root`, branch `task/teraz-i-potem`. The slice's base is the branch's head when you start (`git rev-parse HEAD`); the orchestrator recorded it.
- Pinned the-way: `.the-way` at `294af7fde45323ac1851c014a03071a97fc38d96`.
- Method: read `.the-way/task-cycle/change/SKILL.md` whole and follow it. You make **a slice, or the retry of a slice**; read a file it names (such as `slice.md` or `ui_check.md`) when the step or variant that names it comes.
- Class of model: cheaper (Sonnet), by the plan.
- Boundary: make slice 2 of the plan and nothing else; change only the files its *Change* names (a file outside it is a reach you name in your report, or a question). Commit by path (`git add <file> …`, never `-A`), English commit messages in the repository's form (`feat: :sparkles: …`, `test: …`, `docs: :memo: …`). Do not run the product's whole gate (`npm test` with no argument); run the focused checks of the slice's *Checks*.
- Report path: `.runs/task-cycles/teraz-i-potem/reports/04-slice2-report.md`. Return your status (`done`, `done with concerns`, `questions`, `returned`, `reserved` or `blocked`), your commits, a one-line check result naming what failed or did not run, and the report path. The report holds each check with its command and exit code, your own-work check, every reach beyond this handoff, your questions and concerns, and the section **Searches not found or unclear** (each thing looked for and not found or unclear, or `none`).

## Task, spec, plan and answers of step 4

- Frozen task: `.runs/task-cycles/teraz-i-potem/task.md` (the human's task note, accepted 2026-11-07). Read the passages your slice's *Read* names.
- Spec: none. Plan: `.runs/task-cycles/teraz-i-potem/plan.md`.
- Trust boundary: no. Irreversible operation: no. No slice touches `src/browser/sim/saved-game.ts`, `src/browser/sim/types.ts` or `assets/**`; if yours would have to, return the question.
- The plan's *Foundation entries* are written (commit `bd44c39`): rows 1, 4 and 8 of *Settlements to record* stand in D-334, row 2 in D-335, row 3 in D-336, row 7 in D-337, rows 5 and 6 in D-133. Where the *Read* says "Foundation entries row N", read the entry named here.

## Your slice — copied word for word from `plan.md`

### Slice 2 — The minutes each need lasts, in the simulation

- **Goal:** `src/browser/sim/body.ts`, beside `bodyMinute`, exports three functions, named by the
  slice: (a) the game minutes a body lasts on a map with no warmth before the game minute in which
  it is first chilled, counted by stepping `bodyMinute` with no warmth from that body, as
  `minutesWithoutFire` counts today from the starting body, and null where the map does not cool
  the body below the threshold of chill; (b) the game minutes a body's satiety lasts before the game
  minute in which the character first starves, counted by the same step; (c) for a map run on its
  map, the note of each need, in this order (To do 4): temperature — chilled where the body is below
  the threshold of chill, otherwise by fire where something burns on the character's tile
  (`warmthAt` of `src/browser/sim/world.ts` above 0, as the body's step reads it), otherwise not
  cooling where (a) is null, otherwise the minutes of (a); satiety — starving where the satiety is
  below the threshold of hunger, otherwise the minutes of (b). Minutes are whole, rounded down, by
  the counting itself. `minutesWithoutFire` of `src/browser/sim/map-card.ts` becomes (a) from the
  starting body, so the cooling of the body is counted in one place (D-333 and its *Rejected*); the
  cases of `tests/sim/map-card.test.mjs` stay as they are and pass. Write the failing cases in
  `tests/sim/body.test.mjs` first, with the task's values: from 37.0 °C 83 minutes in Las and 33 in
  Las — głębiej, from full satiety 116 (Context; Pytanie 6), from 36.9 °C in Las 79 minutes and from
  82 % 86 (To do 6, the example of D-178); the notes at 35.0 and 34.99 °C and at satiety 30 and just
  below it; a stick or a campfire burning on the character's tile giving by fire, a chilled body
  by the fire still chilled; a map at the body's starting temperature giving not cooling. Inputs
  are not changed (`simulation-inputs`).
- **Change:** `src/browser/sim/body.ts` · `src/browser/sim/map-card.ts` · `tests/sim/body.test.mjs`
- **Read:** `.runs/task-cycles/teraz-i-potem/task.md:44-57` To do, items 4 to 6 ·
  `.runs/task-cycles/teraz-i-potem/task.md:86-92` Questions to settle, Pytanie 6 ·
  `.runs/task-cycles/teraz-i-potem/task.md:129-148` Context · Foundation entries row 7 ·
  `foundations/decisions.md:52-120` D-04 · `foundations/decisions.md:1163-1177` D-57 ·
  `foundations/decisions.md:1178-1192` D-58 · `foundations/decisions.md:1223-1237` D-61 ·
  `foundations/decisions.md:7085-7099` D-327 · `foundations/decisions.md:7175-7188` D-333 ·
  `foundations/invariants.md:214-225` simulation-isolation ·
  `foundations/invariants.md:226-235` simulation-inputs · `foundations/glossary.md:12-24` game
  minute, map run · `foundations/part_map.md:30-61` simulation · `guidelines/coding.md` ·
  `guidelines/coding-simulation-module.md` · `guidelines/testing.md` · `src/browser/sim/world.ts` ·
  `src/browser/sim/data/balance.ts` · `src/browser/sim/data/maps.ts` ·
  `src/browser/sim/types.ts:194-289` Body to MapRun · `src/browser/sim/run.ts:413-475`
  minuteBeforePick · `tests/sim/map-card.test.mjs` · `src/browser/AGENTS.md`
- **Model:** cheaper
- **Risk:** none
- **Checks:** `npm test -- tests/sim/body.test.mjs` (its new cases failing first) ·
  `npm test -- tests/sim/map-card.test.mjs` · `npm test -- tests/invariants/test_simulation_inputs.py` ·
  `npm test -- tests/invariants/test_simulation_isolation.py` · `npm run typecheck`
- **Depends on:** row 7

## Current ranges of the foundation entries your *Read* names

The ranges in the *Read* above are from the plan; the foundation step has moved them. These hold now (an entry runs from its heading to the next one):

| Entry | Range now |
|---|---|
| D-04 | `foundations/decisions.md:52-120` |
| D-57 | `foundations/decisions.md:1163-1177` |
| D-58 | `foundations/decisions.md:1178-1192` |
| D-61 | `foundations/decisions.md:1223-1237` |
| D-327 | `foundations/decisions.md:7111-7125` |
| D-333 | `foundations/decisions.md:7201-7215` |
| D-337 | `foundations/decisions.md:7320-7353` |
| `simulation-isolation` | `foundations/invariants.md:214-225` |
| `simulation-inputs` | `foundations/invariants.md:226-235` |

Line ranges of the task, guidelines and code in the *Read* stand as the plan gives them, except where an earlier slice changed a file: find the passage again by its name.
