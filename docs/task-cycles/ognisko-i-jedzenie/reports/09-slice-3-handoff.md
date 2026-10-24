# Handoff — executor of Slice 3, cycle `ognisko-i-jedzenie`

## Delegation and stage

The human (the product's owner) started this task cycle with the project skill
`the-way-implement-task` and delegated the cycle's intermediate choices to its orchestrator. You are
the **executor of Slice 3** of the plan. Use the project skill **`the-way-make-change`** (read its
method and what it names, whole). Make this slice and nothing beyond it; commit on the branch by
explicit paths; return before review with status `done`, `done with concerns`, `questions`,
`returned` (an open design choice, or the slice too large — with no code) or `blocked`. Questions go
to the orchestrator in your report, never to the human.

## Where

- Worktree: `C:\Storage\repos\loop2-wt\ognisko-i-jedzenie`, branch `task/ognisko-i-jedzenie`.
- Slice base: `6a443eea7e3292fa2a95d6cc16886cd847148044` (`git rev-parse HEAD` before your work).
- Pinned the-way `.the-way` at 86b78ad.
- Frozen task: `.runs/task-cycles/ognisko-i-jedzenie/task.md`; reviewed spec:
  `.runs/task-cycles/ognisko-i-jedzenie/spec.md`; plan: `.runs/task-cycles/ognisko-i-jedzenie/plan.md`.
- Write your full report to `.runs/task-cycles/ognisko-i-jedzenie/reports/09-slice-3-report.md`;
  every check in it with its command and exit code.

## Answers of step 4

- Trust boundary: yes — `assets/icons/**` (part `browser-view`), the campfire icon from
  game-icons.net (Slice 10 only).
- Irreversible operation: no.

## Your section of the plan (word for word, `plan.md:93-115`)

### Slice 3 — the change's numbers and names in the content data

- **Goal:** The data files of `src/browser/sim/data/` hold every number and name of the change other than those of the program's actions and conditions, which come with their kinds in Slices 7–9; nothing outside the tests reads them yet. They hold: Las's ambient temperature, 25 °C, as a number of the map's data (F2); the body's starting values, which are also its caps — temperature 37.0 °C, satiety 100, health 100 —, its cooling of 0.002 °C a minute for each degree the ambient temperature lies below 37.0 °C (none at 37.0 or above), satiety's fall of 0.6 a minute, the thresholds — chilled below 35.0 °C, starving below 30 —, health's loss of 0.35 a minute for being chilled and 0.35 for starving, and its regain of 0.05 a minute; the gathering chance, 0.7; the starting traits of a new character in `src/browser/sim/data/traits.ts` — one trait, carrying capacity, 15, the same for every new character and not on the archetype (spec Decision 2, *Data*); the items the backpack holds, in `src/browser/sim/data/items.ts` — the four resources of Las gathered as items (patyk, jagoda, mech, włókno) — with, per item, whether it is fuel and how many minutes of burning it adds (patyk 20), whether it is food and how much satiety it gives (jagoda 25), and whether it can be lit and how long and how warmly it burns (patyk 3 minutes, 0.15 °C a minute); the campfire, in `src/browser/sim/data/campfire.ts` — its name „ognisko”, the item and count crafting it uses (6 patyki), the item and count lighting it uses (2 patyki), its minutes of burning when lit (60) and its warmth (0.5 °C a minute). The shapes, types and field names are the maker's, typed as `resources.ts` (the exemplar, D-34) is; mech and włókno are items with no use (task *Context*). `tests/sim/data.test.mjs` shows the new numbers as the task gives them and that every item and the campfire's items name items of the data.
- **Change:** `src/browser/sim/data/maps.ts` · `src/browser/sim/data/balance.ts` · `src/browser/sim/data/items.ts` · `src/browser/sim/data/campfire.ts` · `src/browser/sim/data/traits.ts` · `tests/sim/data.test.mjs`
- **Read:** `.runs/task-cycles/ognisko-i-jedzenie/task.md:14-30` To do ·
  `.runs/task-cycles/ognisko-i-jedzenie/task.md:66-87` Context ·
  `.runs/task-cycles/ognisko-i-jedzenie/task.md:134-154` Settlements to record ·
  `.runs/task-cycles/ognisko-i-jedzenie/spec.md:245-290` Decision 2 ·
  `.runs/task-cycles/ognisko-i-jedzenie/spec.md:379-418` Units ·
  `.runs/task-cycles/ognisko-i-jedzenie/spec.md:482-504` Left to the maker ·
  `.runs/task-cycles/ognisko-i-jedzenie/plan.md:7-48` Foundation entries ·
  F1 · F2 · F3 · F4 · F9 ·
  `foundations/decisions.md:57-93` D-04 · `foundations/decisions.md:380-398` D-18 ·
  `foundations/decisions.md:516-541` D-24 · `foundations/decisions.md:709-723` D-34 ·
  `foundations/invariants.md:200-233` simulation-isolation, simulation-inputs, content-identifiers ·
  `foundations/invariants.md:279-290` map-run-tiles ·
  `guidelines/coding.md` · `guidelines/coding-content-data.md` ·
  `src/browser/sim/data/resources.ts` · `src/browser/sim/data/archetypes.ts` ·
  `src/browser/sim/data/actions.ts` · `src/browser/sim/data/conditions.ts`
- **Model:** cheaper
- **Risk:** none
- **Checks:** `npm run typecheck`; `npm run build`; `node --test tests/sim/data.test.mjs tests/sim/rules.test.mjs tests/sim/layout.test.mjs`; `python -B -m unittest discover -s tests/invariants -p test_content_identifiers.py`; `python -B -m unittest discover -s tests/invariants -p test_map_run_tiles.py`; `python -B -m unittest discover -s tests/quality -p test_quality_invariants.py -k eslint -k prettier`.
- **Depends on:** F1 · F2 · F3 · F4 · F9

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
