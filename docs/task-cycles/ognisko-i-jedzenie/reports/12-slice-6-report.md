# Report — Slice 6 (what burns, its warmth and renewal), cycle `ognisko-i-jedzenie`

**Status:** done

Slice base `dfe814a6a65c6f5f2b4ced8eb5b8e5c13e9520a1`; branch `task/ognisko-i-jedzenie`.

## Commits

- `cc0669d` feat: burn campfires and lit sticks each game minute, warm the character on their tile and renew tiles' stock

## Files changed (added / removed lines)

| File | + | − |
|---|---|---|
| `src/browser/sim/types.ts` | 19 | 0 |
| `src/browser/sim/world.ts` (new) | 67 | 0 |
| `src/browser/sim/run.ts` | 16 | 10 |
| `tests/sim/world.test.mjs` (new) | 314 | 0 |

`src/browser/sim/body.ts`, named in *Change*, needed no change: `bodyMinute` already takes the
warmth as an argument and caps the sum `temperature + warmth − cooling` at 37.0 °C (Slice 4).

## What the slice makes

- `types.ts`: `Campfire = { at: Hex; minutesLeft: number }` — `minutesLeft` 0 means extinguished,
  standing on its tile unlit; `BurningItem = { item: ItemId; at: Hex; minutesLeft: number }`
  (`minutesLeft` > 0). `MapRun` gains `campfires: Campfire[]` and `burningItems: BurningItem[]`,
  both empty at start.
- `world.ts` (unit 3, pure): `warmthAt(world, at)` — the sum of `CAMPFIRE.warmth` for each campfire
  with minutes left on `at` and `ITEMS[item].lightable.warmth` for each burning item on `at`;
  `worldMinute({ campfires, burningItems, tiles }, map, minute)` — steps 3–4 of Decision 1: each
  burning campfire and item loses a minute, a campfire at 0 stays, an item at 0 is dropped; for each
  map resource with `minute % renewMinutes === 0`, every tile whose stock has that key and fewer
  pieces than the map's stock gains one (no key is ever added, a key at 0 stays).
- `run.ts`: `newMapRun` starts with `campfires: []`, `burningItems: []`; `stepMinute` passes
  `warmthAt(run, run.character.at)` (the state at the end of m − 1) to `bodyMinute`, returns at death
  before `worldMinute` (what burns and the tiles stay as at m − 1), otherwise applies `worldMinute`,
  and an exploring that ends in m reveals its tile on the renewed tiles.

## Checks

| Command | Exit | Note |
|---|---|---|
| `npm run build` (after writing the test, before the code) | 0 | |
| `node --test tests/sim/world.test.mjs` (before the code) | 1 | 8 of 9 tests failing at their assertions (campfires `undefined`, temperature 4.976 vs 5.476, 36.976 vs 37, stock `[10, 0, 12]` vs `[11, 1, 12]`, …); the data guard test passed |
| `npm run build` | 0 | |
| `node --test tests/sim/world.test.mjs` | 0 | 11 tests pass (9 first-written plus 2 added after the mutation pass, below) |
| `npm run typecheck` | 0 | |
| `node --test "tests/sim/*.test.mjs" "tests/view/*.test.mjs"` | 0 | 204 tests, 204 pass |
| `python -B -m unittest discover -s tests/invariants -p test_map_run_layout.py` | 0 | 3 tests |
| `python -B -m unittest discover -s tests/invariants -p test_map_run_tiles.py` | 0 | 6 tests |
| `python -B -m unittest discover -s tests/invariants -p test_map_run_repeatability.py` | 0 | 3 tests |
| `python -B -m unittest discover -s tests/invariants -p test_simulation_inputs.py` | 0 | 2 tests |
| `python -B -m unittest discover -s tests/quality -p test_quality_invariants.py -k eslint -k prettier` | 0 | 2 tests |
| `npx eslint --max-warnings 0` on the four files | 0 | extra |
| `python -B .the-way/elements/common/foundation_check.py` (after the commit) | 0 | extra; 0 errors — the new files are claimed by a part |

Not run: the full suite (`npm test`) — the cycle's run before the request, not the slice's. No
invariant test was written or changed in this slice, so no invariant test had to be seen failing.

### Mutations tried (each built, run against `tests/sim/world.test.mjs`, then reverted)

| Mutation | Caught by |
|---|---|
| exploring reveals on `run.tiles` instead of the renewed tiles | "an exploring that ends in a minute of renewal …" |
| `worldMinute` writes the campfire in place (`Object.assign`) | "the one-minute step changes no campfire, burning item or tile passed to it" |
| an extinguished campfire still warms | the 60-minute campfire test; the 37.0 °C test |
| warmth read after step 3 (from the state already burnt down) | the 60-minute campfire, 37.0 °C and 3-minute stick tests |
| renewal without the stock cap | the renewal test (minute 90) |
| renewal adding a missing key (`?? 0`) | the renewal test (tile without sticks) |
| renewal one minute early (`(minute + 1) % …`) | the renewal test, the death test, the input test |

The first two were not caught by the first-written tests; the two tests named were added for them.

## Own-work check (section 3)

- **Requirement most likely unmet:** the order of Decision 1 around death — that in the minute of
  death nothing burns down and no tile renews (step 2 stops before steps 3–4) — and that the warmth
  counts what had minutes left at the end of m − 1, not after step 3.
- **Check:** the test "in the minute of death nothing burns down and no tile renews" (health 10.5,
  chilled, dies in minute 30, a renewal minute, with a campfire and a burning stick on a
  neighbouring tile and a stick tile below its stock); the mutation "warmth read after step 3".
- **Showed:** at minute 30 the death stands `{ minute: 30, cause: "cold" }`, campfires, burning items
  and tiles equal those of minute 29; the mutation fails three tests.

## Reaches beyond the dispatch

- `src/browser/sim/program.ts` (grep for `export function` / `RunView`): to see that `RunView` reads
  only `tiles` and `character`, so this slice leaves the program's view unchanged (Slice 9's).
- `src/browser/sim/game.ts` (grep for `MapRun`/`run`): to find every place a `MapRun` is built — only
  `newMapRun` and `stepMinute`, so no other file needed the new fields.
- `tests/sim/rules.test.mjs:237-260` and `tests/invariants/test_content_identifiers.py:1-60`: how the
  content-identifier checks match, to pick field names (`burningItems`, `item`) that name no content.
- `tests/invariants/test_simulation_inputs.py:1-50`: to see whether its pool reaches campfires (it
  does not — its map runs have none), which is why `world.test.mjs` adds its own frozen-input test.
- `tests/sim/body.test.mjs:1-110`: the style of hand-worked numbers for the body on Las.

## Choices made

- **A campfire's state is one number, `minutesLeft`, with 0 for extinguished** — rejected: a union
  `{ state: "burning", minutesLeft } | { state: "extinguished" }`. The number makes feeding "add 20
  to the minutes left, 0 included" (Decision 1, step 5) and the condition "Zostało mniej niż N min"
  (0 when extinguished) plain arithmetic for Slices 8 and 9; an unlit, freshly crafted campfire is
  `minutesLeft: 0` as well. Cost if wrong: Slice 12's tile row must tell "never lit" from "burnt
  out" — the task's row shows both as „ognisko — wygasłe”, so nothing needs it today; adding a flag
  later touches `types.ts`, `world.ts` and the row.
- **Burning sticks are held as `burningItems` with an `item` key**, not as `burningSticks` without
  one — rejected: a stick-specific list. The warmth comes from `ITEMS[item].lightable.warmth`, so
  the simulation never names the stick (D-18, `content-identifiers`), and Slice 8 records which item
  it lit. Cost if wrong: a rename in Slices 8, 9 and 12.
- **At most one campfire on a tile is not enforced by the state's type or by `worldMinute`**; it is
  the crafting action's feasibility (Slice 8, D-26). `warmthAt` would add two campfires' warmth if
  faulty state held two, the cap of 37.0 °C still applying.
- **Renewal counts the minute of the step** (`minute % renewMinutes === 0`), for every tile, revealed
  or not, and a resource whose `renewMinutes` were 0 in faulty data never renews (`m % 0` is NaN).
- **`stepMinute` keeps the tiles array when no resource renews in the minute**, and keeps each
  unchanged tile and extinguished campfire object; nothing is written in place.

## Adaptations (section 4)

- `body.ts`: no change needed (above). One line.

## Observations

- `guidelines/coding-simulation-module.md` lists the simulation modules in *Files of this kind*;
  `body.ts`, `character.ts` (Slices 4, 5) and now `world.ts` are not in it. Not in this slice's
  *Change*; left for the orchestrator to place (the `the-way-maintain-coding-guidelines` skill, or
  the return step).
