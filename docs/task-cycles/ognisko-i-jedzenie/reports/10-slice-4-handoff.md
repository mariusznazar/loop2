# Handoff — executor of Slice 4, cycle `ognisko-i-jedzenie`

## Delegation and stage

The human (the product's owner) started this task cycle with the project skill
`the-way-implement-task` and delegated the cycle's intermediate choices to its orchestrator. You are
the **executor of Slice 4** of the plan. Use the project skill **`the-way-make-change`** (read its
method and what it names, whole). Make this slice and nothing beyond it; commit on the branch by
explicit paths; return before review with status `done`, `done with concerns`, `questions`,
`returned` (an open design choice, or the slice too large — with no code) or `blocked`. Questions go
to the orchestrator in your report, never to the human.

## Where

- Worktree: `C:\Storage\repos\loop2-wt\ognisko-i-jedzenie`, branch `task/ognisko-i-jedzenie`.
- Slice base: `7a273aefbe6363b62ed1bc628fa1154713695d90` (`git rev-parse HEAD` before your work).
- Pinned the-way `.the-way` at 86b78ad.
- Frozen task: `.runs/task-cycles/ognisko-i-jedzenie/task.md`; reviewed spec:
  `.runs/task-cycles/ognisko-i-jedzenie/spec.md`; plan: `.runs/task-cycles/ognisko-i-jedzenie/plan.md`.
- Write your full report to `.runs/task-cycles/ognisko-i-jedzenie/reports/10-slice-4-report.md`;
  every check in it with its command and exit code.

## Answers of step 4

- Trust boundary: yes — `assets/icons/**` (part `browser-view`), the campfire icon from
  game-icons.net (Slice 10 only).
- Irreversible operation: no.

## Your section of the plan (word for word, `plan.md:117-143`)

### Slice 4 — the body and death in the one-minute step

- **Goal:** In each game minute, inside the one-minute step `stepMinute` of `src/browser/sim/run.ts`, the character's body changes and death falls by steps 1 and 2 of spec Decision 1, from the numbers Slice 3 put in `src/browser/sim/data/balance.ts` and `src/browser/sim/data/maps.ts`: temperature changes by the warmth on the character's tile less the cooling of the map's ambient temperature, capped at 37.0 °C on the sum; satiety falls, not below 0; the character is chilled and starving by the values just computed; health falls for each, or rises where neither, not above 100; where health reaches 0 or less it stands at 0, the character dies in that minute — cause cold where chilled in that minute, otherwise hunger — and the step stops: the action in progress stays in the state as it stood, gives no `activityFinished` and no program rule is picked. The death — its minute and cause — stands in the map run's state and is given as an event. Nothing burns before Slice 6, so the warmth on the tile is 0 here; the body's computation takes it as an input, so that Slice 6 supplies it. The map run starts at 37.0 °C, satiety 100, health 100, and nothing of the body changes at minute 0. After each change temperature, satiety and health are rounded to six decimal places (*Decimal exactness*). `advanceMinutes` given a span that reaches death returns the state of the death minute and the events up to it; `advanceMinutes` and `passRealTime` given a map run ended in death change nothing; `restart` and `end` take such a map run as they take one in progress. The body's computation is a pure module of its own, `src/browser/sim/body.ts` (unit 2). `newMapRun` and `stepMinute` keep the arguments the tests call them with. Test first, in the new `tests/sim/body.test.mjs`: on Las a program of today's closed list dies in minute 243 of cold and is alive in minute 242, with values at named minutes worked out by hand from the task's numbers (34.984 °C at minute 84, satiety 29.8 at minute 117, health 88.45 at minute 116); a hand-made map run that is warm but hungry dies of hunger; a span split into calls gives the same state and events at every minute up to and including death; a map run ended in death passes no minute; a value the decimal arithmetic puts exactly on a threshold does not cross it.
- **Change:** `src/browser/sim/types.ts` · `src/browser/sim/body.ts` · `src/browser/sim/run.ts` · `src/browser/sim/game.ts` · `tests/sim/body.test.mjs`
- **Read:** `.runs/task-cycles/ognisko-i-jedzenie/task.md:14-30` To do ·
  `.runs/task-cycles/ognisko-i-jedzenie/task.md:85-86` Context (action-in-progress, map run) ·
  `.runs/task-cycles/ognisko-i-jedzenie/task.md:140-146` Settlements to record (rows 1–7) ·
  `.runs/task-cycles/ognisko-i-jedzenie/spec.md:22-50` Goals and non-goals ·
  `.runs/task-cycles/ognisko-i-jedzenie/spec.md:52-138` Constraints ·
  `.runs/task-cycles/ognisko-i-jedzenie/spec.md:142-243` Decision 1 ·
  `.runs/task-cycles/ognisko-i-jedzenie/spec.md:379-418` Units ·
  `.runs/task-cycles/ognisko-i-jedzenie/spec.md:482-504` Left to the maker ·
  `.runs/task-cycles/ognisko-i-jedzenie/plan.md:7-48` Foundation entries ·
  F1 · F2 · F3 · F4 · F5 · F6 · F7 · F18 · F19 ·
  `foundations/decisions.md:57-93` D-04 · `foundations/decisions.md:425-515` D-20, D-21, D-22, D-23 ·
  `foundations/decisions.md:724-738` D-35 ·
  `foundations/invariants.md:155-245` map-run-repeatability to program-rule-pick ·
  `foundations/invariants.md:291-300` restart-seed ·
  `foundations/glossary.md:12-31` game minute, map run, program ·
  `foundations/glossary.md:53-71` program rule, map run restart, free game minute ·
  `guidelines/coding.md` · `guidelines/coding-simulation-module.md` ·
  `src/browser/sim/data/balance.ts` · `src/browser/sim/data/maps.ts` · `src/browser/sim/program.ts` ·
  `tests/sim/actions.test.mjs` · `tests/sim/time.test.mjs`
- **Model:** same — the place of the body in the step, the stop at death across `run.ts` and `game.ts` and the decimal rounding are decisions of code the spec leaves to the maker.
- **Risk:** none
- **Checks:** `npm run build`; `node --test tests/sim/body.test.mjs`, first failing, then passing; `npm run typecheck`; `node --test "tests/sim/*.test.mjs" "tests/view/*.test.mjs"`; `python -B -m unittest discover -s tests/invariants -p <file name>` for `test_action_in_progress.py`, `test_player_map_run_pace.py`, `test_restart_seed.py`, `test_map_run_repeatability.py`, `test_program_rule_pick.py`, `test_simulation_inputs.py`, `test_simulation_isolation.py`, `test_simulation_randomness.py`; `python -B -m unittest discover -s tests/quality -p test_quality_invariants.py -k eslint -k prettier`.
- **Depends on:** Slice 1 · Slice 2 · Slice 3 · F1 · F2 · F3 · F4 · F5 · F18

## Current ranges

The foundation step wrote the plan's F1–F20 and moved some ranges of `foundations/`. Read
`.runs/task-cycles/ognisko-i-jedzenie/reports/foundation-map.md`: it maps each F-entry your *Read*
names to its identifier and current range, and gives the current range of each range of
`foundations/` that moved. Where it differs from the plan's, the current one holds.

## Known checks already failing on the base (a945cf1)

`npm test` exits 1 on this machine for three checks unrelated to this change:
`tests/invariants/test_loop2_one_serving_process.py` (setUpClass: `Get-NetTCPConnection` finds no
listening connection) and `tests/quality` `test_ruff_source_rules`, `test_shellcheck_source_rules`
(Ruff and ShellCheck are not installed). Name any of them you meet as already failing, not as yours.
