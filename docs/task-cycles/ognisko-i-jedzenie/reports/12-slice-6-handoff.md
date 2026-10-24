# Handoff — executor of Slice 6, cycle `ognisko-i-jedzenie`

## Delegation and stage

The human (the product's owner) started this task cycle with the project skill
`the-way-implement-task` and delegated the cycle's intermediate choices to its orchestrator. You are
the **executor of Slice 6** of the plan. Use the project skill **`the-way-make-change`** (read its
method and what it names, whole). Make this slice and nothing beyond it; commit on the branch by
explicit paths; return before review with status `done`, `done with concerns`, `questions`,
`returned` (an open design choice, or the slice too large — with no code) or `blocked`. Questions go
to the orchestrator in your report, never to the human.

## Where

- Worktree: `C:\Storage\repos\loop2-wt\ognisko-i-jedzenie`, branch `task/ognisko-i-jedzenie`.
- Slice base: `dfe814a6a65c6f5f2b4ced8eb5b8e5c13e9520a1` (`git rev-parse HEAD` before your work).
- Pinned the-way `.the-way` at 86b78ad.
- Frozen task: `.runs/task-cycles/ognisko-i-jedzenie/task.md`; reviewed spec:
  `.runs/task-cycles/ognisko-i-jedzenie/spec.md`; plan: `.runs/task-cycles/ognisko-i-jedzenie/plan.md`.
- Write your full report to `.runs/task-cycles/ognisko-i-jedzenie/reports/12-slice-6-report.md`;
  every check in it with its command and exit code.

## Answers of step 4

- Trust boundary: yes — `assets/icons/**` (part `browser-view`), the campfire icon from
  game-icons.net (Slice 10 only).
- Irreversible operation: no.

## Your section of the plan (word for word, `plan.md:170-195`)

### Slice 6 — what burns, its warmth and renewal

- **Goal:** The map run holds its campfires — at most one on a tile, each either burning with its minutes of burning left or extinguished — and its burning sticks, each on its tile with its minutes left; a map run starts with none. Inside the one-minute step, in the order of spec Decision 1 around the body and death of Slice 4: in step 1 the warmth on the character's tile is that of each campfire burning there and each stick burning there that had minutes left at the end of the previous minute, with the warmths of `src/browser/sim/data/campfire.ts` and `src/browser/sim/data/items.ts` (Slice 3), and the cap of 37.0 °C applies to the sum; in step 3 each burning campfire and stick loses a minute, a campfire at 0 minutes is extinguished and stays on its tile, a stick at 0 minutes is gone; in step 4, at each minute that is a whole multiple of a resource's renewal time on the map, counted from minute 0, every tile holding that resource with fewer pieces than the map's stock per tile gains one piece — a tile at 0 pieces keeps the key of its resource (`map-run-layout`). What burns and renewal are a pure module of their own, `src/browser/sim/world.ts` (unit 3). No action makes a campfire or a burning stick before Slice 8, so the tests drive `stepMinute` from hand-made map runs. Test first, in the new `tests/sim/world.test.mjs`: a campfire with 60 minutes on the character's tile warms in exactly 60 minutes, then is extinguished and stays; a character at a burning campfire stays at 37.0 °C; a stick lit with 3 minutes warms in 3 minutes and is gone; a campfire on another tile does not warm; a tile below its stock of sticks gains one piece at minute 30 and none above its stock; a tile at 0 keeps its resource.
- **Change:** `src/browser/sim/types.ts` · `src/browser/sim/world.ts` · `src/browser/sim/body.ts` · `src/browser/sim/run.ts` · `tests/sim/world.test.mjs`
- **Read:** `.runs/task-cycles/ognisko-i-jedzenie/task.md:14-30` To do ·
  `.runs/task-cycles/ognisko-i-jedzenie/task.md:84-84` Context (a tile's stock and map-run-layout) ·
  `.runs/task-cycles/ognisko-i-jedzenie/task.md:142-142` Settlements to record (row 3) ·
  `.runs/task-cycles/ognisko-i-jedzenie/task.md:151-152` Settlements to record (rows 12, 13) ·
  `.runs/task-cycles/ognisko-i-jedzenie/spec.md:52-138` Constraints ·
  `.runs/task-cycles/ognisko-i-jedzenie/spec.md:142-243` Decision 1 ·
  `.runs/task-cycles/ognisko-i-jedzenie/spec.md:379-418` Units ·
  `.runs/task-cycles/ognisko-i-jedzenie/plan.md:7-48` Foundation entries ·
  F3 · F12 · F13 · F17 · F18 ·
  `foundations/decisions.md:57-93` D-04 · `foundations/decisions.md:380-398` D-18 ·
  `foundations/decisions.md:516-541` D-24 · `foundations/decisions.md:564-589` D-26 ·
  `foundations/decisions.md:724-738` D-35 ·
  `foundations/invariants.md:155-165` map-run-repeatability ·
  `foundations/invariants.md:200-221` simulation-isolation, simulation-inputs ·
  `foundations/invariants.md:279-290` map-run-tiles · `foundations/invariants.md:379-389` map-run-layout ·
  `foundations/glossary.md:12-17` game minute ·
  `guidelines/coding.md` · `guidelines/coding-simulation-module.md` ·
  `src/browser/sim/hex.ts` · `src/browser/sim/data/maps.ts` · `tests/sim/actions.test.mjs`
- **Model:** same — the shape of campfires and burning sticks in the state is a choice of the maker that Slices 8, 9 and 12 build on.
- **Risk:** none
- **Checks:** `npm run build`; `node --test tests/sim/world.test.mjs`, first failing, then passing; `npm run typecheck`; `node --test "tests/sim/*.test.mjs" "tests/view/*.test.mjs"`; `python -B -m unittest discover -s tests/invariants -p <file name>` for `test_map_run_layout.py`, `test_map_run_tiles.py`, `test_map_run_repeatability.py`, `test_simulation_inputs.py`; `python -B -m unittest discover -s tests/quality -p test_quality_invariants.py -k eslint -k prettier`.
- **Depends on:** Slice 3 · Slice 4 · Slice 5 · F3 · F12 · F13 · F17 · F18

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

Files your slice needs beyond its *Read* (made by earlier slices): `src/browser/sim/data/campfire.ts`,
`src/browser/sim/data/items.ts`, `src/browser/sim/body.ts`, `src/browser/sim/character.ts`, and
`src/browser/sim/run.ts`, `src/browser/sim/types.ts` as they stand now.
