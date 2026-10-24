# Handoff — executor of Slice 9, cycle `ognisko-i-jedzenie`

## Delegation and stage

The human (the product's owner) started this task cycle with the project skill
`the-way-implement-task` and delegated the cycle's intermediate choices to its orchestrator. You are
the **executor of Slice 9** of the plan. Use the project skill **`the-way-make-change`** (read its
method and what it names, whole). Make this slice and nothing beyond it; commit on the branch by
explicit paths; return before review with status `done`, `done with concerns`, `questions`,
`returned` (an open design choice, or the slice too large — with no code) or `blocked`. Questions go
to the orchestrator in your report, never to the human.

## Where

- Worktree: `C:\Storage\repos\loop2-wt\ognisko-i-jedzenie`, branch `task/ognisko-i-jedzenie`.
- Slice base: `612404fe542bce7a0e89d2712e34d651853881cc` (`git rev-parse HEAD` before your work).
- Pinned the-way `.the-way` at 86b78ad.
- Frozen task: `.runs/task-cycles/ognisko-i-jedzenie/task.md`; reviewed spec:
  `.runs/task-cycles/ognisko-i-jedzenie/spec.md`; plan: `.runs/task-cycles/ognisko-i-jedzenie/plan.md`.
- Write your full report to `.runs/task-cycles/ognisko-i-jedzenie/reports/15-slice-9-report.md`;
  every check in it with its command and exit code.

## Answers of step 4

- Trust boundary: yes — `assets/icons/**` (part `browser-view`), the campfire icon from
  game-icons.net (Slice 10 only).
- Irreversible operation: no.

## Your section of the plan (word for word, `plan.md:256-283`)

### Slice 9 — the new conditions and their numbers

- **Goal:** The conditions' data, `src/browser/sim/data/conditions.ts`, gains „Temperatura poniżej N °C”, „Sytość poniżej N %”, „Zapas poniżej N szt. <przedmiot w plecaku>”, „Zostało mniej niż N min — ognisko” and „Z dala od — ognisko”, each that takes a number with its unit, default, minimum, maximum and step by the table of spec Decision 3; „Tu leży mniej niż” keeps its row. `conditionHolds` in `src/browser/sim/program.ts`: the body's temperature or satiety below N; the backpack's count of the item below N; the minutes of burning left to the nearest campfire, in game minutes of walking, below N — 0 where there is none or it is extinguished —; no campfire on the character's tile. `checkCondition` in `src/browser/sim/game.ts` takes, for every kind that takes a number, a finite number from the kind's minimum to its maximum that lies on the kind's step counted from the minimum, allowing a difference far below the step, and holds it as the decimal with as many places as the step has (36.6, never 36.60000000000001); 36.55 or a number outside the range is refused; for a step of 1 it takes the whole numbers it takes today. „Zapas poniżej” takes an item of the data, not bound to the map (spec, *Left to the maker*, recommended). The program editor: the rule's number field takes the minimum, maximum and step of the chosen kind's data and changes them when the kind changes; `readNumberField` takes the kind's data, rounds the text's number to the kind's step, clamps it to its range and commits the decimal form the check keeps; choosing a kind puts in its default; the module constant `NUMBER` goes; „Zapas poniżej” offers the items. `tests/invariants/test_program_closed_lists.py` lists the new kinds. Test first, in the new `tests/sim/conditions.test.mjs`: each condition holding and not holding at its boundary; the check taking 36.6 and 30.0, refusing 36.55, 29.9 and 37.1, and taking the whole numbers of „Tu leży mniej niż” as today; and in `tests/view/program-editor.test.mjs` the field's range and step following the kind and `readNumberField` by the kind's step.
- **Change:** `src/browser/sim/data/conditions.ts` · `src/browser/sim/types.ts` · `src/browser/sim/program.ts` · `src/browser/sim/game.ts` · `src/browser/view/program-editor.ts` · `tests/sim/conditions.test.mjs` · `tests/view/program-editor.test.mjs` · `tests/invariants/test_program_closed_lists.py`
- **Read:** `.runs/task-cycles/ognisko-i-jedzenie/task.md:14-30` To do ·
  `.runs/task-cycles/ognisko-i-jedzenie/task.md:41-46` Questions to settle (Q7, Q8) ·
  `.runs/task-cycles/ognisko-i-jedzenie/task.md:89-93` Questions carried to cycle ·
  `.runs/task-cycles/ognisko-i-jedzenie/spec.md:52-138` Constraints ·
  `.runs/task-cycles/ognisko-i-jedzenie/spec.md:292-341` Decision 3 ·
  `.runs/task-cycles/ognisko-i-jedzenie/spec.md:379-418` Units ·
  `.runs/task-cycles/ognisko-i-jedzenie/spec.md:482-504` Left to the maker ·
  `.runs/task-cycles/ognisko-i-jedzenie/plan.md:7-48` Foundation entries ·
  F1 · F17 ·
  `foundations/decisions.md:380-398` D-18 · `foundations/decisions.md:490-515` D-23 ·
  `foundations/decisions.md:564-589` D-26 · `foundations/decisions.md:724-753` D-35, D-36 ·
  `foundations/decisions.md:784-798` D-39 · `foundations/decisions.md:859-873` D-44 ·
  `foundations/invariants.md:222-245` content-identifiers, program-rule-pick ·
  `foundations/invariants.md:346-356` program-closed-lists ·
  `foundations/invariants.md:368-378` program-world-reference ·
  `foundations/glossary.md:25-31` program · `foundations/glossary.md:53-58` program rule ·
  `guidelines/coding.md` · `guidelines/coding-simulation-module.md` ·
  `guidelines/coding-content-data.md` · `guidelines/coding-browser-module.md` ·
  `guidelines/styleguide-browser-view.md` · `src/browser/AGENTS.md` ·
  `src/browser/view/controls/number-field.ts` · `src/browser/view/controls/text-field.ts`
- **Model:** same — the check by the step's grid with its decimal form and the editor's field following the kind are decisions of code in the simulation and the view.
- **Risk:** none
- **Checks:** `npm run build`; `node --test tests/sim/conditions.test.mjs`, first failing, then passing; `npm run typecheck`; `node --test "tests/sim/*.test.mjs" "tests/view/*.test.mjs"`; `python -B -m unittest discover -s tests/invariants -p <file name>` for `test_program_closed_lists.py`, `test_program_world_reference.py`, `test_program_rule_pick.py`, `test_content_identifiers.py`, `test_simulation_inputs.py`; `python -B -m unittest discover -s tests/quality -p test_quality_invariants.py -k eslint -k prettier`. The Ruff check of the changed Python file cannot run on this machine — Ruff is not installed; name it as unchecked.
- **Depends on:** Slice 8 · F1 · F17

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

Files your slice needs beyond its *Read* (made or changed by earlier slices): `src/browser/sim/body.ts`,
`src/browser/sim/character.ts`, `src/browser/sim/world.ts`, `src/browser/sim/data/items.ts`,
`src/browser/sim/data/campfire.ts`, `src/browser/sim/data/balance.ts`, and
`tests/sim/campfire.test.mjs` (as the pattern of a test of the new kinds), as they stand now. The
program's view of the run (`RunView` in `program.ts`) does not carry the body or the backpack's
counts yet where your conditions need them: add what they read.
