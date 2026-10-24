# Handoff — executor of Slice 13, cycle `ognisko-i-jedzenie`

## Delegation and stage

The human (the product's owner) started this task cycle with the project skill
`the-way-implement-task` and delegated the cycle's intermediate choices to its orchestrator. You are
the **executor of Slice 13** of the plan. Use the project skill **`the-way-make-change`** (read its
method and what it names, whole). Make this slice and nothing beyond it; commit on the branch by
explicit paths; return before review with status `done`, `done with concerns`, `questions`,
`returned` (an open design choice, or the slice too large — with no code) or `blocked`. Questions go
to the orchestrator in your report, never to the human.

## Where

- Worktree: `C:\Storage\repos\loop2-wt\ognisko-i-jedzenie`, branch `task/ognisko-i-jedzenie`.
- Slice base: `8c7db070d3d7aff132e3f3e45d3e017eaccc38d6` (`git rev-parse HEAD` before your work).
- Pinned the-way `.the-way` at 86b78ad.
- Frozen task: `.runs/task-cycles/ognisko-i-jedzenie/task.md`; reviewed spec:
  `.runs/task-cycles/ognisko-i-jedzenie/spec.md`; plan: `.runs/task-cycles/ognisko-i-jedzenie/plan.md`.
- Write your full report to `.runs/task-cycles/ognisko-i-jedzenie/reports/19-slice-13-report.md`;
  every check in it with its command and exit code.

## Answers of step 4

- Trust boundary: yes — `assets/icons/**` (part `browser-view`), the campfire icon from
  game-icons.net (Slice 10 only).
- Irreversible operation: no.

## Your section of the plan (word for word, `plan.md:365-390`)

### Slice 13 — the closed list end to end: acceptance, the split of a span, every kind

- **Goal:** Three things show the change as a whole. (a) The task's acceptance criterion, in the new `tests/sim/acceptance.test.mjs`: on Las a program drawn from the closed list as this task leaves it — „Zawsze”, „Eksploruj”, „Wędruj”, „Idź — <zasób>” and „Tu leży mniej niż” included — passes 480 game minutes alive on a seed the test names, and the empty program dies (in minute 243, of cold). The maker finds the program and the seed, names both in the test and the report, and returns without code, status `returned`, if no seed tried passes. (b) The invariant `minute-span-split` (F19) gets its test, the new `tests/invariants/test_minute_span_split.py`, built and driven as `tests/invariants/test_map_run_repeatability.py` drives the simulation: a map run advanced by a span of game minutes reaches the same game state, with the same events in the same order, at every game minute, however the span is split into calls, up to and including death — with the acceptance program, which gathers, eats, builds, lights and feeds a campfire, and with a program that dies; it cites `invariant: minute-span-split` and is seen failing once against behaviour broken for a moment. F24 is written with it, through the pinned skill `the-way-update-part-map`. (c) The three invariant tests whose programs claim every kind — `test_map_run_repeatability.py` (its starting program: every condition kind and every action kind), `test_simulation_inputs.py` (a program using every condition kind and every action kind; the streams it feeds gain the gathering stream) and `test_simulation_randomness.py` (a program mixing every action; the gathering's draws come from the generator seeded from the map run's state) — use the closed list as this task leaves it, within 240 minutes or with a program that keeps the mage alive, still proving their sentences. (d) `tests/invariants/test_walk_feasibility.py`, whose case "a stock of zero is no stock" writes a tile's stock over to 0 and advances one minute, keeps proving its sentence now that tiles renew (D-60, Slice 6): the minute it advances into is no whole multiple of the resource's renewal time on the map, or the case otherwise keeps renewal from giving the piece back before the program picks (orchestrator's amendment after Slice 8: the test fails from Slice 6 on — `zero here did not come about at minute 120`, 120 being a multiple of every renewal time of Las).
- **Change:** `tests/sim/acceptance.test.mjs` · `tests/invariants/test_minute_span_split.py` · `foundations/part_map.md` · `tests/invariants/test_map_run_repeatability.py` · `tests/invariants/test_simulation_inputs.py` · `tests/invariants/test_simulation_randomness.py` · `tests/invariants/test_walk_feasibility.py`
- **Read:** `.runs/task-cycles/ognisko-i-jedzenie/task.md:14-34` To do, Acceptance criteria ·
  `.runs/task-cycles/ognisko-i-jedzenie/task.md:56-58` Questions to settle (Q12) ·
  `.runs/task-cycles/ognisko-i-jedzenie/spec.md:22-50` Goals and non-goals ·
  `.runs/task-cycles/ognisko-i-jedzenie/spec.md:119-138` Constraints (Readings of the task) ·
  `.runs/task-cycles/ognisko-i-jedzenie/spec.md:142-243` Decision 1 ·
  `.runs/task-cycles/ognisko-i-jedzenie/spec.md:420-480` Foundation entries ·
  `.runs/task-cycles/ognisko-i-jedzenie/spec.md:482-504` Left to the maker ·
  `.runs/task-cycles/ognisko-i-jedzenie/plan.md:7-48` Foundation entries ·
  F18 · F19 · F24 ·
  `foundations/decisions.md:57-93` D-04 · `foundations/decisions.md:464-515` D-22, D-23 ·
  `foundations/invariants.md:155-176` map-run-repeatability, simulation-randomness ·
  `foundations/invariants.md:212-221` simulation-inputs ·
  `foundations/invariants.md:357-367` walk-feasibility ·
  `foundations/part_map.md:27-51` simulation ·
  `foundations/glossary.md:12-24` game minute, map run ·
  `guidelines/coding.md` ·
  `tests/invariants/loop2_invariant_support.py` · `src/browser/sim/data/actions.ts` ·
  `src/browser/sim/data/conditions.ts`
- **Model:** same — finding a program and a seed that live 480 minutes, and an invariant test with its deliberate break.
- **Risk:** none
- **Checks:** `npm run build`; `node --test tests/sim/acceptance.test.mjs`; `python -B -m unittest discover -s tests/invariants -p test_minute_span_split.py`, first failing against the break, then passing; `python -B -m unittest discover -s tests/invariants -p <file name>` for `test_map_run_repeatability.py`, `test_simulation_inputs.py`, `test_simulation_randomness.py`, `test_walk_feasibility.py`; `python -B .the-way/elements/common/foundation_check.py`; `python -B -m unittest discover -s tests/quality -p test_quality_invariants.py -k eslint -k prettier`. The Ruff check of the changed Python files cannot run on this machine — Ruff is not installed; name it as unchecked.
- **Depends on:** Slice 1 · Slice 2 · Slice 9 · F18 · F19 · F24

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

## What earlier slices made (read as they stand now)

- Slice 3 (7a273ae) added the content data files `src/browser/sim/data/items.ts`,
  `src/browser/sim/data/campfire.ts`, `src/browser/sim/data/traits.ts` and numbers in
  `src/browser/sim/data/balance.ts`, `src/browser/sim/data/maps.ts`.
- Slice 4 (46ec64d) added `src/browser/sim/body.ts` and put the character's body on the map run as
  `MapRun.body` — not inside `MapRun.character`, since `tests/sim/actions.test.mjs:115` compares
  `character` across minutes; the program's view of the run (`RunView`) does not carry the body yet
  (Slice 9 adds what conditions read). When a span reaches death `passRealTime` drops the leftover
  part of a real second (`realMsCarry` = 0). `mapRunEnded` is still given at „Zakończ” and
  „Restart”, not at death.
- Slice 5 (dfe814a) added `src/browser/sim/character.ts` (a new character's traits from the data;
  the backpack's count and cap) and put the traits and the backpack in `MapRun.character`;
  `newMapRun` and `stepMinute` keep their arguments, a new one optional.
- Slice 6 (cc0669d) added `src/browser/sim/world.ts` (what burns, its warmth, renewal) and the map
  run's campfires and burning items in `types.ts`: a campfire is `{ at, minutesLeft }`, 0 meaning
  extinguished — a crafted, never-lit campfire also stands at 0; burning sticks are `burningItems`
  keyed by `item`, so no code names the stick.
- `guidelines/coding-simulation-module.md` and `guidelines/coding-content-data.md` list no row for
  the new files; by the pinned template a file added after the audit takes no row until the
  guidelines are refreshed — not a gap of your slice.
- Slice 7 (006616f) added the action kind `gather` (data `actions.ts`, `program.ts`, `run.ts`,
  `game.ts`), the gathering stream in `random.ts`, and the editor's offer of it in
  `program-editor.ts`. Its status text in the data is „Zbiera”; `status-row.ts` appends the target's
  name for „Idź” only, so the status row reads „Minuta N · Zbiera” until Slice 11, whose goal makes
  every action that takes a target show its name.
- Slice 8 (612404f) added the action kinds of the campfire, the burning stick, eating and „Idź —
  ognisko” (`actions.ts`, `program.ts`, `run.ts`, `game.ts`, `program-editor.ts`) and `eatenBody`
  in `body.ts` (eating's satiety, rounded and capped like the body minute).
- `tests/invariants/test_walk_feasibility.py` fails from Slice 6 on (renewal at minute 120 gives a
  zeroed tile its piece back); Slice 13 adapts it. Do not treat that failure as yours.
- Slice 9 (ab1558b) added the five new condition kinds with their numbers' ranges and steps
  (`conditions.ts`, `program.ts`, `game.ts`, `program-editor.ts`); labels „Zostało mniej niż N min
  — ognisko” and „Z dala od — ognisko”.
- Slice 10 (6981b7f) added `assets/icons/campfire.svg` (Lorc, "Campfire icon"), the campfire's
  `icon` and `iconTitle` in `src/browser/sim/data/campfire.ts`, its credit in `credits.ts` and its
  footer line in `footer.ts`; its review passed.
- Slice 11 (eca1fb1) added `src/browser/view/body-row.ts` (the body and backpack row, placed by
  `app.ts`), the status row at death and the target's name for every action that takes one
  (`status-row.ts`), with styles in `styles.css`.
- Slice 12 (8c7db07) drew the campfire's icon on its tile and put the campfire's and the burning
  stick's state in a new last column of the tile's row (`terrain-picture.ts`, `terrain-panel.ts`,
  `tile-list.ts`).

Files your slice needs beyond its *Read* (made by earlier slices), as patterns and as they stand now:
`tests/sim/body.test.mjs`, `tests/sim/world.test.mjs`, `tests/sim/gather.test.mjs`,
`tests/sim/campfire.test.mjs`, `tests/sim/conditions.test.mjs`, `tests/sim/traits.test.mjs`;
`src/browser/sim/game.ts`, `src/browser/sim/run.ts`, `src/browser/sim/random.ts` (the gathering
stream), `src/browser/sim/program.ts`.

Part (d) of your goal was added by the orchestrator after Slice 8 (plan amendment): the case "a
stock of zero is no stock" of `tests/invariants/test_walk_feasibility.py` fails from Slice 6 on —
`zero here did not come about at minute 120` — because the case zeroes a tile in the state of
minute 119 and advances into minute 120, a whole multiple of every renewal time of Las (stick 30,
berry 40, moss 60, fibre 60), and renewal (step 4 of D-64) gives the piece back before the program
picks (step 5).

This is the plan's last slice; the full `npm test` and the whole-change review follow it.
