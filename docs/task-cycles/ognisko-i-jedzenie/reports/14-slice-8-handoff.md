# Handoff — executor of Slice 8, cycle `ognisko-i-jedzenie`

## Delegation and stage

The human (the product's owner) started this task cycle with the project skill
`the-way-implement-task` and delegated the cycle's intermediate choices to its orchestrator. You are
the **executor of Slice 8** of the plan. Use the project skill **`the-way-make-change`** (read its
method and what it names, whole). Make this slice and nothing beyond it; commit on the branch by
explicit paths; return before review with status `done`, `done with concerns`, `questions`,
`returned` (an open design choice, or the slice too large — with no code) or `blocked`. Questions go
to the orchestrator in your report, never to the human.

## Where

- Worktree: `C:\Storage\repos\loop2-wt\ognisko-i-jedzenie`, branch `task/ognisko-i-jedzenie`.
- Slice base: `006616f0e165ec40d210b59aedb919b960362783` (`git rev-parse HEAD` before your work).
- Pinned the-way `.the-way` at 86b78ad.
- Frozen task: `.runs/task-cycles/ognisko-i-jedzenie/task.md`; reviewed spec:
  `.runs/task-cycles/ognisko-i-jedzenie/spec.md`; plan: `.runs/task-cycles/ognisko-i-jedzenie/plan.md`.
- Write your full report to `.runs/task-cycles/ognisko-i-jedzenie/reports/14-slice-8-report.md`;
  every check in it with its command and exit code.

## Answers of step 4

- Trust boundary: yes — `assets/icons/**` (part `browser-view`), the campfire icon from
  game-icons.net (Slice 10 only).
- Irreversible operation: no.

## Your section of the plan (word for word, `plan.md:226-254`)

### Slice 8 — the campfire, the burning stick and eating

- **Goal:** The closed list of actions gains, each with its label, status text and minutes in `src/browser/sim/data/actions.ts`, its feasibility in `src/browser/sim/program.ts`, its duration and its effect at its end in `src/browser/sim/run.ts` (spec Decision 1, step 5), its check in `src/browser/sim/game.ts` and its offer in the program editor: „Wytwórz — ognisko” (20 minutes), „Zapal — ognisko” (5), „Zapal — patyk” (5), „Zasil — ognisko” (5), „Zjedz — jagoda” (5) and „Idź — ognisko”, which takes the minutes of the tile it steps onto. Crafting can be carried out on a revealed tile without a campfire, with the pieces crafting uses in the backpack, and puts an unlit campfire on the tile; lighting a campfire needs a campfire on the character's tile that is not burning, and gives it its 60 minutes; lighting a stick needs a revealed tile and an item that can be lit, and puts it burning on the tile; feeding needs a burning campfire on the character's tile and a piece of fuel, and adds the fuel's minutes to the campfire it started on, whatever that campfire's state at the feeding's end, 0 minutes included, without a cap; eating needs a piece of food and adds its satiety, not above 100. Each action needs the pieces it uses in the backpack, and those pieces leave the backpack at its end, with its effect. Which item is fuel, food or can be lit, and how many each action uses, come from `src/browser/sim/data/items.ts` and `src/browser/sim/data/campfire.ts` (Slice 3): the simulation chooses the piece, the program does not, and no code names an item. „Idź — ognisko” takes one move toward the nearest campfire of the map run — every campfire is known —, counted in game minutes of walking, and cannot be carried out where there is none or where the character stands on a campfire's tile. The shape of each kind — whether it takes a target — is the maker's, within the closed lists and D-26; the editor offers each kind with its target where it takes one. `tests/invariants/test_program_closed_lists.py` lists the new kinds. Test first, in the new `tests/sim/campfire.test.mjs`: each action's feasibility and infeasibility as above, crafting and lighting a stick refused on a tile not revealed; the pieces leave the backpack at the end; a campfire lit in minute m warms from minute m + 1 for 60 minutes; a feeding during which the campfire burns out makes it burn 20 minutes again; feeding adds without a cap; eating stops at 100; „Idź — ognisko” steps toward the nearest campfire and is passed over on a campfire's tile.
- **Change:** `src/browser/sim/data/actions.ts` · `src/browser/sim/types.ts` · `src/browser/sim/program.ts` · `src/browser/sim/run.ts` · `src/browser/sim/game.ts` · `src/browser/view/program-editor.ts` · `tests/sim/campfire.test.mjs` · `tests/invariants/test_program_closed_lists.py` · `tests/view/program-editor.test.mjs`
- **Read:** `.runs/task-cycles/ognisko-i-jedzenie/task.md:14-30` To do ·
  `.runs/task-cycles/ognisko-i-jedzenie/task.md:36-64` Questions to settle ·
  `.runs/task-cycles/ognisko-i-jedzenie/task.md:142-153` Settlements to record (rows 3–14) ·
  `.runs/task-cycles/ognisko-i-jedzenie/spec.md:52-138` Constraints ·
  `.runs/task-cycles/ognisko-i-jedzenie/spec.md:142-243` Decision 1 ·
  `.runs/task-cycles/ognisko-i-jedzenie/spec.md:343-367` Decision 4 ·
  `.runs/task-cycles/ognisko-i-jedzenie/spec.md:379-418` Units ·
  `.runs/task-cycles/ognisko-i-jedzenie/spec.md:482-504` Left to the maker ·
  `.runs/task-cycles/ognisko-i-jedzenie/plan.md:7-48` Foundation entries ·
  F3 · F8 · F13 · F14 · F17 · F18 · F20 ·
  `foundations/decisions.md:380-398` D-18 · `foundations/decisions.md:425-445` D-20 ·
  `foundations/decisions.md:490-515` D-23 · `foundations/decisions.md:542-589` D-25, D-26 ·
  `foundations/decisions.md:724-753` D-35, D-36 · `foundations/decisions.md:859-873` D-44 ·
  `foundations/invariants.md:177-187` action-in-progress ·
  `foundations/invariants.md:222-278` content-identifiers to walk-target ·
  `foundations/invariants.md:346-378` program-closed-lists, walk-feasibility, program-world-reference ·
  `foundations/glossary.md:25-31` program · `foundations/glossary.md:53-58` program rule ·
  `guidelines/coding.md` · `guidelines/coding-simulation-module.md` ·
  `guidelines/coding-content-data.md` · `guidelines/coding-browser-module.md` ·
  `guidelines/styleguide-browser-view.md` · `src/browser/AGENTS.md` ·
  `src/browser/sim/hex.ts` · `src/browser/view/status-row.ts`
- **Model:** same — six actions with their feasibility, effects and targets, and the feeding's landing on its campfire, are decisions of code across the simulation and the view.
- **Risk:** none
- **Checks:** `npm run build`; `node --test tests/sim/campfire.test.mjs`, first failing, then passing; `npm run typecheck`; `node --test "tests/sim/*.test.mjs" "tests/view/*.test.mjs"`; `python -B -m unittest discover -s tests/invariants -p <file name>` for `test_program_closed_lists.py`, `test_program_world_reference.py`, `test_walk_target.py`, `test_walk_feasibility.py`, `test_move_reach.py`, `test_action_in_progress.py`, `test_program_rule_pick.py`, `test_content_identifiers.py`, `test_simulation_inputs.py`; `python -B -m unittest discover -s tests/quality -p test_quality_invariants.py -k eslint -k prettier`. The Ruff check of the changed Python file cannot run on this machine — Ruff is not installed; name it as unchecked.
- **Depends on:** Slice 6 · Slice 7 · F3 · F8 · F13 · F14 · F17 · F20

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

Files your slice needs beyond its *Read* (made or changed by earlier slices): `src/browser/sim/data/items.ts`,
`src/browser/sim/data/campfire.ts`, `src/browser/sim/data/balance.ts`, `src/browser/sim/character.ts`,
`src/browser/sim/world.ts`, `src/browser/sim/random.ts`, and `tests/sim/gather.test.mjs` (as the
pattern of an action's test), as they stand now.
