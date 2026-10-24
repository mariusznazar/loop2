# Report — executor of Slice 7 (gathering), cycle `ognisko-i-jedzenie`

- **Status:** done with concerns (one concern: the status row shows „Zbiera” without the resource's
  name — see *Concerns*).
- **Slice base:** `cc0669d8b8aac2bfd0972644b251aaf3137291ae`; pinned `.the-way` at 86b78ad (checked:
  `git -C .the-way rev-parse HEAD` equals the gitlink).
- **Commit:** `006616f` — feat: gather a resource of the map's tile into the backpack, with one draw
  from a gathering generator of its own.

## Files changed (added / removed lines)

| File | + | − |
|---|---|---|
| `src/browser/sim/data/actions.ts` | 1 | 0 |
| `src/browser/sim/random.ts` | 2 | 1 |
| `src/browser/sim/types.ts` | 4 | 1 |
| `src/browser/sim/program.ts` | 6 | 0 |
| `src/browser/sim/run.ts` | 59 | 2 |
| `src/browser/sim/game.ts` | 5 | 0 |
| `src/browser/view/program-editor.ts` | 22 | 14 |
| `tests/sim/gather.test.mjs` (new) | 355 | 0 |
| `tests/invariants/test_program_closed_lists.py` | 6 | 4 |
| `tests/view/program-editor.test.mjs` | 27 | 2 |

All ten are the slice's *Change*; no file outside it was touched.

## What was made

- **Data** (`actions.ts`): `gather: { label: "Zbierz", status: "Zbiera", minutes: 10 }`.
  **Status text written by the maker: „Zbiera”**, after „Eksploruje”, „Wędruje”, „Idzie po”.
- **Generator** (`random.ts`): stream `"gather"` with its own constant `0x47415448` ("GATH"); the
  existing constants are unchanged. `MapRun.gatherRandom` (`types.ts`) holds its state, set by
  `newMapRun` to `streamState(seed, "gather")`, so a send and a restart start it anew, as the
  wander stream.
- **Action** (`types.ts`): `{ kind: "gather"; resource: ResourceId }`, shaped as „Idź”.
- **Feasibility** (`program.ts`, `actionFeasible`): the character's tile is revealed and holds more
  than 0 of the resource, and `backpackCount < backpackCap` (D-57, D-58). Reads only `RunView`
  (tiles, character); it cannot draw.
- **Effect** (`run.ts`): the start takes `ACTIONS.gather.minutes` and draws nothing; at the end, in
  step 5 of D-64 (after body, death, what burns and renewal), `finishGathering` draws once from
  `gatherRandom`; a hit (`value < BALANCE.gatherChance`) moves one piece from the tile into the
  backpack as the item of the same identifier (`ItemId = ResourceId` in `items.ts`); a miss
  changes neither (D-59). The tile keeps the key at 0. A gathering that ends in the death minute
  does not land and does not draw (the step stops at death, as before).
- **Program check** (`game.ts`, `checkAction`): `gather` with `checkResource`, as `walkTo`.
- **Editor** (`program-editor.ts`): the action select lists „Zbierz” from the data; the resource
  select shows for „Idź” and „Zbierz” (`takesResource` / `namesResource`); `withActionKind` and
  `withActionResource` take both kinds.
- **Invariant test** `test_program_closed_lists.py` (changed): `ACTION_KINDS` gains `gather`;
  `VALID` gains a rule `Zawsze → gather(moss)`; `gather` left `UNLISTED_ACTION_KINDS` and the
  made-up `collect`, `gatherAll`, `Gather` took its place; `gather` joined
  `UNLISTED_CONDITION_KINDS` as one of "the other list's kinds". The test keeps proving the same
  sentence.

## Checks (command → exit code)

Test first:

- `node --test tests/sim/gather.test.mjs` before the code (after `npm run build` → 0) → **1**:
  13 of 15 failing at their assertions (e.g. `actionFeasible` gave `undefined` for `true`); the 2
  passing then were the guard tests where nothing is expected to change.
- `python -B -m unittest discover -s tests/invariants -p test_program_closed_lists.py` after the
  test change, before the data change → **1**: the tripwire, "the data lists the action kinds
  ['explore', 'walkTo', 'wander'], the check writes out ['explore', 'gather', 'walkTo', 'wander']".

After the code (before commit; the code is unchanged since except one test case and one comment
wrap):

- `npm run typecheck` → 0
- `npm run build` → 0
- `node --test tests/sim/gather.test.mjs` → 0 (15, then 16 tests after the own-work check)
- `node --test "tests/sim/*.test.mjs" "tests/view/*.test.mjs"` → 0 (220 tests)
- `python -B -m unittest discover -s tests/invariants -p <file>` → 0 for each of
  `test_program_closed_lists.py` (2 tests), `test_simulation_randomness.py` (4),
  `test_map_run_repeatability.py` (3), `test_map_run_layout.py` (3), `test_restart_seed.py` (2),
  `test_program_world_reference.py` (2), `test_content_identifiers.py` (2),
  `test_simulation_inputs.py` (4); none skipped.
- `python -B -m unittest discover -s tests/quality -p test_quality_invariants.py -k eslint -k prettier` → 0

At the commit `006616f`:

- `npm run build` → 0; `npm run typecheck` → 0
- `node --test tests/sim/gather.test.mjs` → 0 (16 tests)
- `node --test "tests/sim/*.test.mjs" "tests/view/*.test.mjs"` → 0 (221 tests)
- `python -B -m unittest discover -s tests/invariants -p test_program_closed_lists.py` → 0
- `python -B -m unittest discover -s tests/quality -p test_quality_invariants.py -k eslint -k prettier` → 0

Not run:

- Ruff on `tests/invariants/test_program_closed_lists.py` — Ruff is not installed on this machine
  (`ruff --version` → command not found), as the plan says. Unchecked.
- The full suite (`npm test`) — the cycle's run, not the slice's.
- A screenshot of the editor with „Zbierz” — the foundation settles no screenshot route (no entry
  of `foundations/` names one); the editor's states were checked in code only: the resource select
  is hidden unless the action names a resource, filled from the offered resources as for „Idź”,
  and every program the editor builds with „Zbierz” passes `setProgram`
  (`tests/view/program-editor.test.mjs`). Rendered appearance unchecked.

## What the tests of `tests/sim/gather.test.mjs` catch

Expected values are written out by hand (10 minutes, 0.7, 15 pieces); the gathering draw is
computed in the test by its own mulberry32 step from the run's `gatherRandom`, not by `random.ts`.

- not feasible: tile not revealed; tile without the resource; tile with 0 of it; backpack of 15 of
  mixed items (and 16); feasible with 14 — catches a dropped revealed, stock or cap check.
- start: 10 minutes, no draw from either stream, nothing taken.
- start state: `gatherRandom = streamState(seed, "gather")`, differing from wander and layout.
- hit: one piece from tile to backpack, one draw, wander untouched; miss: nothing changes, one
  draw; 100 states: hit exactly where the worked-out draw is below 0.7 (catches an inverted or
  wrong threshold, a draw from another stream, a lost generator state).
- every resource of Las lands as its own item and leaves the other resources of the tile.
- 0 pieces left keep the key; the gathering is then not feasible.
- the end takes nothing from a tile at 0 or into a full backpack (crafted states; unreachable by
  the program but guards "najwyżej tyle, ile na nim leży").
- the wander stream's states over 200 minutes are the same with and without gathering, and equal
  the worked-out mulberry32 chain; gathering moved the gather stream only.
- restart resets `gatherRandom` to the seed's start; `setProgram` takes „Zbierz” with a resource
  of the map and refuses it without one, with an unknown one or a number.

## Own-work check

- **Requirement most likely missed:** that a gathering puts the piece in as *the item of that
  resource* for every resource, not only the stick every other test uses.
- **Check:** a test over the four resources of Las, on a tile holding 3 of each: after a hit only
  the gathered resource drops to 2 and only its item stands at 1 in the backpack.
- **Showed:** passing (`node --test tests/sim/gather.test.mjs` → 0); kept in the test file.

## Reaches beyond the dispatch

- `src/browser/view/status-row.ts` and `tests/view/status-row.test.mjs` read (the *Read* names
  `status-row.ts`; read to see how the status text is shown).
- `src/browser/sim/world.ts`, `hex.ts`, `character.ts`, `data/*.ts`, `tests/sim/actions.test.mjs`,
  `tests/sim/data.test.mjs`, `tests/sim/random.test.mjs`, `tests/sim/traits.test.mjs`,
  `tests/sim/world.test.mjs` — read to write the test in the existing style.
- `foundations/` searched for "screenshot" — to know whether a screenshot route is settled (none).

## Choices made

- **Gathering's end re-checks the tile and the backpack** (takes nothing where the tile holds 0 or
  the backpack is full, but still draws). Rejected: trusting the start's feasibility. Cost if
  wrong: none today — nothing else takes from a tile or fills the backpack during a gathering; a
  later task that does (a second character) keeps "never more than lies on the tile".
- **The draw happens at every gathering's end, hit or not, guard or not**, so the gather stream
  counts finished gatherings. Rejected: skipping the draw when the guard blocks. Cost if wrong:
  only which draw a later gathering gets after an unreachable case.
- **No event for a gathering.** Rejected: a `gathered` event with hit/miss. Nothing reads events
  of effects yet; a later chronicle can add one. Cost if wrong: one event added later.
- **The editor knows which actions name a resource by a list in the editor** (`walkTo`, `gather`),
  typed against `Action`. Rejected: a field in `ActionDef` marking it — would change the data shape
  of every action for two entries. Cost if wrong: a new resource-taking action must be added to
  the list (the type guard's `Extract` makes TypeScript flag a wrong entry, not a missing one).
- **The item of a resource is `ItemId = ResourceId`**, written once in `finishGathering` with a
  comment pointing at `items.ts`; no mapping function, since `items.ts` is outside the *Change*.

No adaptation of section 4 was needed.

## Concerns

- **The status row shows „Minuta N · Zbiera” without the resource.** `status-row.ts` appends the
  resource only for `walkTo` („Idzie po: patyk”) and is outside this slice's *Change*. The status
  text in data is „Zbiera”, so a later slice that touches the status row (Slice 11, say) could show
  „Zbiera: patyk” by treating `gather` as `walkTo` there — one condition plus a test line.
  Recommended answer: add it in the slice that next changes `status-row.ts`; no foundation entry
  is affected.
- `tests/invariants/test_simulation_inputs.py` lists streams `["layout", "wander"]` among the
  inputs it passes unchanged-checking through `streamState`; it does not list `gather`. Its
  invariant (inputs not changed) holds for any stream name, so it still proves its sentence; it was
  not in this slice's *Change* and was left as is.
- `tests/sim/data.test.mjs` pins the data of `explore`, `wander`, `walkTo` but not of `gather`
  (outside the *Change*); the 10 minutes are covered by behaviour in `gather.test.mjs`.

## Problems observed

None. Already-failing checks named by the handoff (`test_loop2_one_serving_process.py`,
`test_ruff_source_rules`, `test_shellcheck_source_rules`) were not run by this slice.
