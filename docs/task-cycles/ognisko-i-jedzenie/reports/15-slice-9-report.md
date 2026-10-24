# Report — executor of Slice 9, cycle `ognisko-i-jedzenie`

**Status:** done

Slice base `612404fe542bce7a0e89d2712e34d651853881cc`; one commit **ab1558b** on `task/ognisko-i-jedzenie`.

## Files changed (added / removed lines)

| File | + | − |
|---|---|---|
| `src/browser/sim/data/conditions.ts` | 42 | 1 |
| `src/browser/sim/types.ts` | 7 | 1 |
| `src/browser/sim/program.ts` | 72 | 1 |
| `src/browser/sim/game.ts` | 60 | 13 |
| `src/browser/view/program-editor.ts` | 135 | 39 |
| `tests/sim/conditions.test.mjs` (new) | 286 | 0 |
| `tests/view/program-editor.test.mjs` | 214 | 18 |
| `tests/invariants/test_program_closed_lists.py` | 7 | 1 |

## What was made

- **Data** (`conditions.ts`): new kinds `temperatureBelow` („Temperatura poniżej”, °C, 36.5 / 30.0–37.0 / 0.1),
  `satietyBelow` („Sytość poniżej”, %, 50 / 0–100 / 1), `itemBelow` („Zapas poniżej”, szt., 8 / 0–50 / 1),
  `campfireLeftBelow` („Zostało mniej niż — ognisko”, min, 20 / 0–120 / 1), `awayFromCampfire`
  („Z dala od — ognisko”, no number). The `hereBelow` row is unchanged.
- **Types**: `Condition` gains the five kinds; `itemBelow` names an `item: ItemId`.
- **`program.ts`**: `RunView` now carries `body`. `conditionHolds` reads: the body's temperature or
  satiety below N; the backpack's count of the item below N; the minutes left to the nearest campfire
  in game minutes of walking (the existing `campfireTarget`, own tile included), 0 where none or
  extinguished; no campfire on the character's tile. New exports `conditionNumber(kind)` (the kind's
  default, min, max, step from data, or null) and `onStep(value, number)` (nearest point of the step
  from the minimum, as the decimal with the step's places; -0 becomes 0).
- **`game.ts`**: `checkCondition` checks every number kind through one `checkNumber`: a finite number,
  min ≤ N ≤ max, within 1e-9 of a step from the grid; the program holds `onStep`'s decimal. 
  `itemBelow` takes any key of `ITEMS` (not bound to the map, as the spec recommends).
- **Editor**: the module constant `NUMBER` is gone. `readNumberField(text, previous, number)` rounds to
  the kind's step, clamps it to its range, and commits the decimal. `showFieldRange(input, kind)` sets
  the field's min, max and step from the chosen kind, and runs on every `showRule`. Choosing a kind
  puts in its default (`newCondition`). An item select „Przedmiot warunku” offers every item of the
  data, with `withConditionItem` behind it. `withConditionValue` now applies to any kind that takes a
  number.
- **Invariant test** `test_program_closed_lists.py`: `CONDITION_KINDS` and `VALID` list the new kinds;
  the invariant's sentence and the reading are unchanged.

## Checks (command — exit code)

Test first:
- `node --test tests/sim/conditions.test.mjs` before the code (after `npm run build` on the base code)
  — **1**: 12 of 15 failed for the expected reasons (`conditionHolds` returned `undefined` for the new
  kinds; `setProgram` threw "condition kind … is not on the closed list"). The 3 refusal and
  `hereBelow` tests passed already: the old code also refuses these values.
- `python -B -m unittest discover -s tests/invariants -p test_program_closed_lists.py` before the
  code — **1**: the tripwire failed ("the data lists the condition kinds ['always', 'hereBelow'] …").

After the code (final run, after Prettier):
- `npm run build` — 0
- `npm run typecheck` — 0
- `node --test tests/sim/conditions.test.mjs` — 0 (15/15)
- `node --test "tests/sim/*.test.mjs" "tests/view/*.test.mjs"` — 0 (263/263)
- `python -B -m unittest discover -s tests/invariants -p test_program_closed_lists.py` — 0
- `… -p test_program_world_reference.py` — 0
- `… -p test_program_rule_pick.py` — 0
- `… -p test_content_identifiers.py` — 0
- `… -p test_simulation_inputs.py` — 0
- `python -B -m unittest discover -s tests/quality -p test_quality_invariants.py -k eslint -k prettier`
  — 0. The first run exited 1 on Prettier formatting in 5 of my files. I fixed them with
  `prettier --write` and ran it again.

Not run:
- Ruff on `test_program_closed_lists.py`: Ruff is not installed on this machine.
- The full `npm test`: by the skill, the full suite is the cycle's run.

## Own-work check (section 3)

- **The requirement most likely not met:** in the running product, the editor's number field takes the
  range and step of the chosen kind, changes them when the kind changes, and „Zapas poniżej” offers the
  items. The Node tests cannot show this path (`showRule`, DOM).
- **The check:** I built the product and served it with `LOOP2_LISTEN_PORT=3917 node dist/server/main.js`,
  then drove it in Playwright: added a rule and switched its condition through every kind, reading the
  input's attributes and the selects.
- **What it showed:**
  - temperature 30/37/0.1, default 36.5; „Zapas poniżej” 0/50/1, default 8, with the item select shown
    (patyk, jagoda, mech, włókno);
  - satiety 0/100/1, default 50; campfire 0/120/1, default 20;
  - „Z dala od — ognisko” hides the number field; „Tu leży mniej niż” 0/50/1 with the resource select;
  - typing 36.57 under temperature committed and showed 36.6.
- **Screenshot:**
  `C:\Users\Mariusz\AppData\Local\Temp\claude\C--Storage-repos-loop2\d1e0cc19-26f4-410a-bc8b-e2f6c7179a11\scratchpad\slice9-editor.png`.
  It shows two rows: „Temperatura poniżej [36,6]” and „Zapas poniżej [8] [patyk]”. The foundation
  settles no screenshot route, so this was taken ad hoc. The console's only error is a 404 on
  `favicon.ico`, which predates this slice.
- **States in code:** the new item select is the shared select list (D-44); its states are those of
  `select-list.ts`. The number field is the shared number field. No new roles or tokens.

## Reaches beyond the dispatch

- `C:\Storage\repos\loop\src\sim\data\conditions.ts`: the spec says its table comes from there; I read it
  for the labels („Temperatura poniżej”, „Sytość poniżej”, „Zapas poniżej”, „Zostało mniej niż”,
  „Z dala od”) and the kind names.
- `src/browser/sim/run.ts`, `src/browser/sim/hex.ts` (`nearestTile`, `costsFrom`): to confirm that the
  run passed to `chooseActivity` carries the body of this minute, and how nearness is counted.
- `tests/sim/data.test.mjs`: it asserts the `hereBelow` row deep-equal, so that row keeps its exact
  shape.
- `tests/invariants/test_program_world_reference.py`: read to confirm it offers no new kinds and needs
  no change.
- `src/server/main.ts`: read for the port variable, for the own-work check.

## Choices made (rejected way — cost if wrong)

- **Kind names** `temperatureBelow`, `satietyBelow`, `itemBelow`, `campfireLeftBelow`,
  `awayFromCampfire`. Rejected: `stockBelow`, because `test_program_closed_lists.py` uses it as an
  unlisted kind. Cost: a rename.
- **Labels of the campfire conditions:** „Zostało mniej niż — ognisko” and „Z dala od — ognisko”, the
  campfire written into the label as in „Idź — ognisko”, since nothing in the row names the campfire.
  Rejected: loop's bare „Zostało mniej niż” / „Z dala od” with a target select. Cost: one row of
  data. **The human sees these labels in the request.**
- **The step tolerance (1e-9 of the step) applies to the grid only.** The range is checked strictly on
  the number as offered. Consequences for step-1 kinds:
  - 3.0000000001 is now taken and held as 3, where the old check refused anything but an integer
    (spec: "allowing … a difference far below the step");
  - 50.0000000001 is still refused, as out of range.

  Rejected: snapping first and checking the range on the snapped value. Cost: a few lines.
- **Where the number helpers live:** `conditionNumber`/`onStep` are in `program.ts`, so the check and
  the editor share one rounding. Rejected: copies in `game.ts` and the editor, which could drift.
- **Initial field range:** `UNSET_RANGE` (0/0/1) in the editor is the range a row's field is made with,
  before `showRule` sets the kind's range. Rejected: changing `number-field.ts`, which is outside the
  slice's file list. Cost: none visible, since every shown field gets its kind's range at once.
- **Order in the condition select:** the existing two kinds first, the new ones after, in the task's
  order.

## Adaptations (section 4)

- The plan named only `RunView`'s missing body. The backpack was already in `RunView` through
  `character`, so only `body` was added.

## Problems observed / notes for the orchestrator

- The editor shows no unit next to the number („Temperatura poniżej [36,6]” has no „°C”), as before for
  „Tu leży mniej niż … szt.”. The data carries `unit`, but no slice of mine asked to show it. This is
  for the orchestrator or review to judge (task *To do* 12 names the conditions with their units).
- The `toFixed` step of `onStep` is not separately caught by a test. For today's data (min 30 or 0,
  steps 0.1 and 1) `min + k·step` is already the exact decimal for every k in range (checked in Node
  for k = 0…70). It guards other steps, and no test can tell it apart today.
- The editor tests were written together with the editor code, not before it. The plan asks test-first
  only for `tests/sim/conditions.test.mjs`.
