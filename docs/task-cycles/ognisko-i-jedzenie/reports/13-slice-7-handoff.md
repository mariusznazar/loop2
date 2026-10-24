# Handoff — executor of Slice 7, cycle `ognisko-i-jedzenie`

## Delegation and stage

The human (the product's owner) started this task cycle with the project skill
`the-way-implement-task` and delegated the cycle's intermediate choices to its orchestrator. You are
the **executor of Slice 7** of the plan. Use the project skill **`the-way-make-change`** (read its
method and what it names, whole). Make this slice and nothing beyond it; commit on the branch by
explicit paths; return before review with status `done`, `done with concerns`, `questions`,
`returned` (an open design choice, or the slice too large — with no code) or `blocked`. Questions go
to the orchestrator in your report, never to the human.

## Where

- Worktree: `C:\Storage\repos\loop2-wt\ognisko-i-jedzenie`, branch `task/ognisko-i-jedzenie`.
- Slice base: `cc0669d8b8aac2bfd0972644b251aaf3137291ae` (`git rev-parse HEAD` before your work).
- Pinned the-way `.the-way` at 86b78ad.
- Frozen task: `.runs/task-cycles/ognisko-i-jedzenie/task.md`; reviewed spec:
  `.runs/task-cycles/ognisko-i-jedzenie/spec.md`; plan: `.runs/task-cycles/ognisko-i-jedzenie/plan.md`.
- Write your full report to `.runs/task-cycles/ognisko-i-jedzenie/reports/13-slice-7-report.md`;
  every check in it with its command and exit code.

## Answers of step 4

- Trust boundary: yes — `assets/icons/**` (part `browser-view`), the campfire icon from
  game-icons.net (Slice 10 only).
- Irreversible operation: no.

## Your section of the plan (word for word, `plan.md:197-224`)

### Slice 7 — gathering

- **Goal:** The closed list of actions gains „Zbierz — <zasób mapy>”, an action that takes a resource of the run's map, as „Idź” does, with its label, status text and 10 minutes in `src/browser/sim/data/actions.ts`. It can be carried out only on a revealed tile the character stands on that holds at least one piece of that resource now, with a backpack not full — its count of pieces below the character's carrying capacity (Slice 5) —; `actionFeasible` never draws. At the end of the action (spec Decision 1, step 5) it draws once from a new gathering generator — a new stream of `src/browser/sim/random.ts` with its own constant, seeded from the map run's seed and kept in the map run's state as the wander stream's state is, so a restart starts it anew —; a hit, with the chance in `src/browser/sim/data/balance.ts` (Slice 3), moves one piece from the tile into the backpack as the item of that resource (`src/browser/sim/data/items.ts`); a miss changes neither. A tile gathered to 0 pieces keeps the key of its resource. `checkAction` in `src/browser/sim/game.ts` takes the new kind with its resource as it takes „Idź”. The program editor offers the new kind with its resource select, as it offers „Idź”. The status text is the maker's, written after the existing actions' texts and named in the report. `tests/invariants/test_program_closed_lists.py` lists the new kind among the kinds the data gives, and its made-up unlisted kinds stay unlisted (it lists `gather` among them today). Test first, in the new `tests/sim/gather.test.mjs`: not feasible on a tile not revealed, on a tile without the resource or with 0 of it, and with a full backpack; a hit takes one piece and a miss takes none, by the gathering generator's draws worked out apart from the code; 0 pieces left keep the key; the wander stream gives the same draws with and without gathering.
- **Change:** `src/browser/sim/data/actions.ts` · `src/browser/sim/random.ts` · `src/browser/sim/types.ts` · `src/browser/sim/program.ts` · `src/browser/sim/run.ts` · `src/browser/sim/game.ts` · `src/browser/view/program-editor.ts` · `tests/sim/gather.test.mjs` · `tests/invariants/test_program_closed_lists.py` · `tests/view/program-editor.test.mjs`
- **Read:** `.runs/task-cycles/ognisko-i-jedzenie/task.md:14-30` To do ·
  `.runs/task-cycles/ognisko-i-jedzenie/task.md:41-49` Questions to settle (Q7–Q9) ·
  `.runs/task-cycles/ognisko-i-jedzenie/task.md:148-150` Settlements to record (rows 9–11) ·
  `.runs/task-cycles/ognisko-i-jedzenie/spec.md:52-138` Constraints ·
  `.runs/task-cycles/ognisko-i-jedzenie/spec.md:142-243` Decision 1 ·
  `.runs/task-cycles/ognisko-i-jedzenie/spec.md:379-418` Units ·
  `.runs/task-cycles/ognisko-i-jedzenie/spec.md:482-504` Left to the maker ·
  `.runs/task-cycles/ognisko-i-jedzenie/plan.md:7-48` Foundation entries ·
  F9 · F10 · F11 · F16 · F18 ·
  `foundations/decisions.md:380-398` D-18 · `foundations/decisions.md:464-589` D-22 to D-26 ·
  `foundations/decisions.md:724-753` D-35, D-36 · `foundations/decisions.md:859-873` D-44 ·
  `foundations/invariants.md:155-176` map-run-repeatability, simulation-randomness ·
  `foundations/invariants.md:222-245` content-identifiers, program-rule-pick ·
  `foundations/invariants.md:291-300` restart-seed ·
  `foundations/invariants.md:346-389` program-closed-lists to map-run-layout ·
  `foundations/glossary.md:25-31` program · `foundations/glossary.md:53-58` program rule ·
  `guidelines/coding.md` · `guidelines/coding-simulation-module.md` ·
  `guidelines/coding-content-data.md` · `guidelines/coding-browser-module.md` ·
  `guidelines/styleguide-browser-view.md` · `src/browser/AGENTS.md` ·
  `src/browser/sim/hex.ts` · `src/browser/view/status-row.ts` · `tests/sim/actions.test.mjs`
- **Model:** same — a new generator stream, an action taking a target and the editor's offer of it are decisions of code across the simulation and the view.
- **Risk:** none
- **Checks:** `npm run build`; `node --test tests/sim/gather.test.mjs`, first failing, then passing; `npm run typecheck`; `node --test "tests/sim/*.test.mjs" "tests/view/*.test.mjs"`; `python -B -m unittest discover -s tests/invariants -p <file name>` for `test_program_closed_lists.py`, `test_simulation_randomness.py`, `test_map_run_repeatability.py`, `test_map_run_layout.py`, `test_restart_seed.py`, `test_program_world_reference.py`, `test_content_identifiers.py`, `test_simulation_inputs.py`; `python -B -m unittest discover -s tests/quality -p test_quality_invariants.py -k eslint -k prettier`. The Ruff check of the changed Python file cannot run on this machine — Ruff is not installed; name it as unchecked.
- **Depends on:** Slice 5 · Slice 6 · F9 · F10 · F11 · F16 · F18

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

Files your slice needs beyond its *Read* (made by earlier slices): `src/browser/sim/data/items.ts`,
`src/browser/sim/data/campfire.ts`, `src/browser/sim/data/balance.ts`, `src/browser/sim/character.ts`,
`src/browser/sim/world.ts`, `src/browser/sim/body.ts`, as they stand now.
