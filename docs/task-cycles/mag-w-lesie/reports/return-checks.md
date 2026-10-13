# Return step: invariant checks

Commit `b0b6274` on `task/mag-w-lesie`, "test(invariants): add checks for the return-step invariants". It adds 11 files under `tests/invariants/` and changes no other file.

## Checks

Every check states its reading of the sentence in its module docstring.

| File | What it runs | Control |
|---|---|---|
| `test_simulation_isolation.py` | Two checks. (1) A static scan of `src/browser/sim/**`: it looks for import specifiers that resolve outside the folder, host globals from a written-out list, `globalThis` members that are not language globals, and reads of the system time through `Date.now`, `Date()` or `new Date()`. (2) The built modules are loaded into a `node:vm` context that holds only the language globals; `console` and `WebAssembly` are removed and `Date` is guarded. Imports are resolved by the check, and the context drives 400+ minutes of `game.js`. | A made-up source for each forbidden form is flagged, and a clean source is not. Made-up modules (timer, `document`, `Date.now`, `new Date()`, `Date()`, `console`, `process`, an outside import, `node:fs`) each fail in the harness, and a clean one runs. |
| `test_simulation_inputs.py` | Calls every exported function of `dist/public/sim/**` with written-out inputs and with states from a 300-minute run. The arguments are deep-snapshotted before and after each call. A function the table does not name is called with combinations from a pool of values. The check makes more than 6000 calls. | Made-up mutators (top-level key, pushed rule, lowered stock, deleted key, added `undefined`, `NaN`) are each detected. A pure function is not flagged. |
| `test_content_identifiers.py` | Reads the ids and names of maps, resources and archetypes from the built data modules. Scans the `.ts` files under `src/browser/` outside `sim/data/`, with comments removed, for whole tokens. | Made-up text that names each id and name in code, strings, templates and paths is flagged. The same words in comments, in `wood-<x>`-style compounds and inside longer identifiers are not. The data read is not empty. |
| `test_program_rule_pick.py` | Literal scenarios: rule 2 is picked at minute 0, and nothing is picked at minutes 20 to 22. A program whose only condition fails picks nothing for 30 minutes. Rule order is followed. Over 4 runs of 600 minutes, every free minute is compared with the first rule that both holds and can be carried out. | Rules 1, 2 and 3 are each picked somewhere in the runs. Made-up records with a wrong rule, with an activity starting mid-way and with nothing starting on a free minute are all flagged. |
| `test_exploring_reveal.py` | At the entrance (1,1), the tile is not revealed at minute 19 and is revealed at minute 20; after that the character waits. Over 3 runs of 600 minutes, every exploring reveals its tile at its end and none starts on a revealed tile. | More than 10 explorings and more than 10 refusals happen. Made-up records with no reveal, an early reveal and an exploring on a revealed tile are flagged. |
| `test_move_reach.py` | Over 3 runs of 600 minutes, every move ends on an axial neighbour (the 6 offsets are written out). The character's tile changes only when a move ends. | More than 30 moves per run, in at least 4 directions. Made-up moves to a tile 2 away, to the same tile, off the map, and a change of tile in the middle of an exploring are flagged. |
| `test_walk_target.py` | 20 runs of 800 minutes (4 resources × 5 seeds), with "go" alternating every 40 minutes against "roam". The check computes its own shortest walking times: Dijkstra over the tiles' `stepMinutes`, any tile passable. Every going is compared against them, and so is every refusal. | Counts: 601 goings, 14 toward tiles 2 or more away, 12 refusals because no tile holds the resource, 741 refusals because the character stands on such a tile. Made-up records with a move away, a move toward a farther tile, a move that ends off its target, a going while standing on such a tile and a going where no tile holds the resource are flagged. |
| `test_map_run_tiles.py` | 36 map run starts per map: a send, a restart and a second send at each of 12 real times. Each tile's stock is compared with the stock that `MAPS` gives. | Each listed resource is both present and absent on some tile. Made-up stocks of one less, of half and off the list are flagged. |
| `test_restart_seed.py` | 4 restarts: after minutes have passed, after a pause and real time, after a program change, twice in a row, and after a second send. Each must keep the seed of the map run it replaces. | 3 sends give 3 distinct seeds. |
| `test_icon_file_content.py` | XML and regex scan of `assets/icons/*.svg`: elements, `on*` attributes, `href`/`src`/`xml:base`, `url()`, `@import`, DOCTYPE and ENTITY declarations, processing instructions, and namespaces other than SVG and XLink. | 22 made-up forbidden SVGs are flagged, and a clean SVG with both namespaces and `#` references is not. |
| `test_icon_credits.py` | Renders `createFooter()` into a stand-in `document`, then parses the HTML. Each icon file must have a credit that holds its game-icons.net page, the author's folder name, the author written out for the 4 current files (Delapouite), `CC BY 3.0` and a word stating the change. A scan checks that a built view module imports `footer.js` and calls `createFooter`. | The stand-in turns a made-up footer into the exact expected HTML. Made-up footers each missing one part are flagged, including one where the licence stands only outside the credits. |

## Gate

`python -B .the-way/gate/run_tests.py tests/invariants --record .runs/invariant-tests.jsonl` ran 74 tests and exited 0. All 25 invariants have `pass` and none has a null line.

## Sentences not checked fully as written

- **icon-credits/1**:
  - "Says how the file differs" is checked only as the presence of a change word from a written-out list. Whether the statement is true is not checked.
  - "Shows" is checked through a stand-in DOM, not a browser render. A browser tool would be needed for that.
- **walk-target/1**: "nearest in game minutes of walking" is read as allowing a path through any tile, unrevealed ones included. The code agrees on the current runs.
- **simulation-isolation/1**: the static scan flags a local variable that shadows a host name, which is stricter than the sentence.
- **content-identifiers/1**:
  - The words are matched as whole tokens, case-sensitively. A boundary includes `-`, so `wood-stick` (an icon file name) does not count as naming `stick`.
  - A name written with escape sequences is not caught.
- **simulation-inputs/1**: a change made after the function returns, through an object it kept, is not caught.

## Questions

1. **content-identifiers**: is it the intended reading that `-` bounds a token, so that icon file names such as `wood-stick` do not count as naming a resource?
2. **walk-target**: may a path pass through unrevealed tiles? The sentence is silent on this, and the current code agrees with "yes".

## Fixes after the deliberate breaks (commit `bec4d25`)

The reviewer's report `return-breaks.md` found two deliberate breaks that went unseen. Only the two checks below changed.

- **`test_simulation_isolation.py`** (break B):
  - **The scan.** It now flags `Date.now`, `performance.now`, `Date()` called without `new`, and `new Date` or `new Date()` without arguments, whether `Date` or `performance` is used by its own name or as a member (`globalThis.`, `window.`, `self.`, `global.` or any other chain).
    - Ten crafted forms were added to the scan's controls, including the exact form of break B. `new globalThis.Date(86400000)` and `globalThis.Date.UTC(...)` were added to the clean source, and the scan does not flag them.
  - **The run.** It now also calls `setPaused`, `passRealTime`, `advanceMinutes`, `setProgram`, `restart` and `end` on a game with no map run, both before the first send and after an end. It also calls them on a paused run.
    - The error of each call is recorded. A plain `Error` thrown on a path with no map run is allowed (`restart` and `end` throw one there). Any other error, or any guarded read, fails the check.
  - **Control.** Made-up `game.js` modules that read `globalThis.Date.now()`, `globalThis.performance.now()`, `new globalThis.Date()` or `setTimeout` only on paths with no map run are each judged a break. A made-up module that reads nothing passes. Each of the six functions must have been called with no map run at least once.
  - **Evidence.** I patched a copy of the built `game.js` in the scratchpad with break B. The harness then reported `read the system time by Date.now`.
- **`test_map_run_tiles.py`** (break B):
  - **New real times.** It adds 1760001609000, 1760002975000 and 1760006249000. Sent from a new game, they give berry, fiber and moss respectively on exactly one tile. I verified this myself from the public state.
  - **New control: `test_control_single_tile_starts_are_reached`.**
    - It counts the tiles whose stock of the resource is above 0, and asserts that count is 1 for each of those sends. A violation-free result is also required there.
    - Limitation: from the public state, a single tile that the draw picked looks the same as a resource placed after a draw of none. The control therefore shows that the starts reach the fallback's outcome, not that the fallback path itself ran.
    - I did not patch `layout.js` to confirm this; the reviewer's runs with the break in place are the evidence for it.

**Gate.** 76 tests ran and the exit code was 0. All 25 invariants have `pass`, and no failure is left unclaimed by a test.

## Changes after the assessment's settlement (commits `0d45acc`, `e44e053`)

The independent assessment (`assessment-report.md`) raised points A10 and A14, and its settlement (`assessment-settlement.md`) accepted both as changes.

### A10: expected values written out (these change behaviour)

The two checks below no longer read the data at run time. I transcribed the values once from the current `src/browser/sim/data/*.ts`.

- **`test_map_run_tiles.py`**
  - `MAP_RESOURCES` writes out the full stock of each resource on Las: stick 12, berry 8, moss 6, fiber 6. `ARCHETYPE` writes out `elementalMage`.
  - The driver no longer imports `maps.js` or `archetypes.js`.
  - The comparison control now flags a made-up stock one more than, one less than, or half the written-out value for every resource, and also a resource that is off the list.
  - Consequence: a stock changed in the data fails the check until it is written out again, and a new map is checked only once it is added to the check.
- **`test_content_identifiers.py`**
  - `ENTRIES` writes out these identifiers and names: forest/Las, stick/patyk, berry/jagoda, moss/mech, fiber/włókno, elementalMage/Mag żywiołów.
  - The reader of the data and `test_control_the_data_is_read` were removed.
  - The scan's control still flags every written-out identifier and name, wherever it stands in code, a string, a template or a path.
  - Consequence: content added to the data is scanned for only once it is written out in the check.

### A14 and the new action-in-progress sentence (docstrings and comments only)

- The citations of "spec §" were replaced by foundation entries and data files:
  - `test_action_in_progress.py`: D-13 and D-15; D-08 and D-14 with `actions.ts` and `maps.ts`; D-14 for the entrance.
  - `test_map_run_repeatability.py`: D-08.
  - `test_simulation_randomness.py`: D-13, D-15 and D-16, with `types.ts`.
- `test_action_in_progress.py` now quotes the new sentence of action-in-progress/1, "The character's action in progress lasts its full duration…", and its reading uses the same words.
- Commit `e44e053` only rewraps one docstring line.

### Gate

75 tests ran and the exit code was 0. All 25 invariants have `pass`, and no failure is left unclaimed by a test.

### Deliberate breaks to run again

The deliberate breaks for map-run-tiles/1 (A and B) and content-identifiers/1 need to be run again. The other three files changed only in their text.

### Not acted on

A10 also says that `SINGLE_TILE_TIMES` in map-run-tiles depends on the current seed mixing and generator. The settlement did not accept that part, so the times are unchanged.

## Tripwires for content not written out (commit `a149fbf`)

The re-run of the deliberate breaks found that a new resource added to the data and named in a view file went unseen (break C2). The cause was that the checks now hold their values as written-out literals. Both checks now have a tripwire test that reads the data only in order to fail. The data is never used as an expected value, so WAY-69 still holds.

- **`test_content_identifiers.py`**
  - `test_tripwire_every_data_entry_is_written_out` reads `MAPS`, `RESOURCES` and `ARCHETYPES` from the built data. Every (kind, id, name) must stand in `ENTRIES`; otherwise the test fails with a message telling the maintainer to add the entry there.
  - Control: made-up data with a new resource `stone`/„kamień”, or with a renamed map, makes the tripwire fail. The written-out list itself passes.
  - Evidence: I patched a copy of the built `resources.js` with `stone`/„kamień”. The reader then reported it as not written out.
- **`test_map_run_tiles.py`**
  - `test_tripwire_every_map_and_resource_is_written_out` reads the game maps of `MAPS` with each resource and its stock. Every map, and every (resource, stock) pair, must stand in `MAP_RESOURCES`; otherwise the test fails with a message telling the maintainer to write it out there.
  - Control: made-up data with a new map, a new resource or a changed stock makes the tripwire fail.

**Gate.** 79 tests ran and the exit code was 0. All 25 invariants have `pass`, and no failure is left unclaimed by a test.
