# Plan — Wysłać maga żywiołów na mapę Las, po której chodzi według programu reguł

- Task: .runs/task-cycles/mag-w-lesie/task.md
- Spec: .runs/task-cycles/mag-w-lesie/spec.md
- Base: 170118680abec6760291df5d13f908c58409f867

## Order of work

1. **Foundation step 1** (orchestrator, before Slice 1): every entry of the table below except the
   part-map change, including the two invariant checks, each written by an agent that wrote
   neither the invariant's sentence nor any code of this task, from the sentence and its method
   (spec § 9.3) alone (WAY-69).
2. **Slices 1–6**, in order.
3. **Foundation step 2** (orchestrator, with `the-way-update-part-map`, right after Slice 6 is
   committed and reviewed, before Slice 7): the part-map changes of spec § 10. After Slice 6 every
   Files and trust-boundary pattern the change names matches a tracked file: `src/browser/sim/**`
   and `tests/sim/**` (Slice 1), `src/browser/view/**`, `assets/icons/**` and `tests/view/**`
   (Slice 6), the two invariant checks (foundation step 1), `src/browser/*.ts` and
   `src/browser/index.html` (already tracked). The part-map guard rejects a pattern that matches
   no tracked file, so the change cannot land earlier; it lands before Slices 7–10 so that their
   files are reviewed under their final owners and the trust boundary `assets/icons/**` stands in
   the map from the commit after the icons arrive.
4. **Slices 7–10**, in order.
5. **Step 10 of the cycle**: the full gate and the check in the running product (below *Coverage*).

Each slice is made by its own fresh agent and reviewed by another; no agent reviews a slice it made.
The two invariant checks are read-only from foundation step 1 on.

Expected interim states, none of them a pass:

- From foundation step 1 to Slice 5, `test_map_run_repeatability.py` and
  `test_simulation_randomness.py` may fail, because `dist/public/sim/game.js` does not exist yet;
  every other invariant test passes. From Slice 5 on, all invariant tests pass.
- From foundation step 1 to foundation step 2, the part-map guard reports the new D-04 version's
  Scope naming `simulation`, which is not yet a part, and reports the files added by foundation
  step 1 and Slices 1–6 as claimed by no part. Foundation step 2 clears both. The part-map guard
  is not one of the checks of foundation step 1 or of Slices 1–6.
- `node --test` with a glob that matches no file exits 0 with no tests; each slice that adds test
  files therefore checks that the count of tests `npm test` reports grew by its tests.

## Foundation entries

| Entry | Kind | From | What depends on it |
|---|---|---|---|
| D-04 new version, "What is the game built with?", the projected entry whole, Scope `browser-view, build-tools, simulation` | decision | definition `definicja_mvp_loop2.md`, projected "What is the game built with?" (approved 2026-10-13); task *Decisions in play*; spec § 11 | Slices 1–5 (a simulation of pure functions, real time only as an argument); Slices 7–10 (the view draws only from the state and changes it only through simulation functions); written in foundation step 1 |
| D-03 new version, *Relations* following D-04's new fingerprint (WAY-31); its sentences unchanged, so its own fingerprint and `browser-view-framework/1`'s `D-03@fb5aa3b0` stay | decision | task *Decisions in play*; spec § 11 | no slice's code; Slices 8–10 are built under it; written in foundation step 1, after D-04 |
| "Where does the game's content live?", new decision, the projected entry whole | decision | definition, projected "Where does the game's content live?"; spec § 4.2, § 11 | Slice 1 (content in `sim/data/`), Slice 5 (validation read from data), Slice 6 (icon names from `resources.ts`), Slices 7–10 (names and icons from data); foundation step 1 |
| `map-run-repeatability/1`, the projected entry whole, Method `python -B .the-way/gate/run_tests.py tests/invariants --record .runs/invariant-tests.jsonl`, *Derives from* in the `TODO — <decision, where expected>` form naming "Where does the simulation's randomness come from?" (task 18); check `tests/invariants/test_map_run_repeatability.py`, method of spec § 9.3 | invariant | definition, projected `map-run-repeatability/1`; spec § 9.3, § 11 | covers the code of Slices 3, 4 and 5; its check fails until Slice 5; foundation step 1 |
| `simulation-randomness/1`, the projected entry whole, same Method and *Derives from* form; check `tests/invariants/test_simulation_randomness.py`, method of spec § 9.3 | invariant | definition, projected `simulation-randomness/1`; task *Questions carried to cycle* (which files: `src/browser/sim/**`, spec § 10, Q4); spec § 9.3, § 11 | covers the code of Slices 3, 4 and 5 and every later file under `src/browser/sim/`; its check may fail until Slice 5; foundation step 1 |
| term `program rule` | glossary term | definition, projected `program rule` | Slices 1, 4, 9; foundation step 1 |
| term `map run` | glossary term | definition, projected `map run` | Slices 3, 4, 5, 8; foundation step 1 |
| term `game minute` | glossary term | definition, projected `game minute` | Slices 4, 5, 8; foundation step 1 |
| Row 1: the terrain drawing is a picture, hover linking a tile and its list row its only interaction, stock numbers in the list | decision | *Settlements to record* row 1 | Slices 7, 10; foundation step 1 |
| Row 2: a restart is a new map run of the same character on the same map, which the player starts in place of the map run in progress | glossary term | *Settlements to record* row 2 | Slices 5, 8; foundation step 1 |
| Row 3: neither a program change nor another rule's condition interrupts a running action | decision | *Settlements to record* row 3 | Slices 4, 5; foundation step 1 |
| Row 4: a map run the player starts passes at one game minute per real second and can be paused and resumed — worded with "map run" restricted to map runs the player starts, without the term "manual map run" (Q20) | decision | *Settlements to record* row 4; spec § 11 | Slices 1 (pace in `balance.ts`), 5, 8; foundation step 1 |
| Part-map changes of spec § 10: new part `simulation` (Files `src/browser/sim/**`, `tests/sim/**`, the two invariant checks); `browser-view` narrowed to `src/browser/*.ts`, `src/browser/index.html`, `src/browser/view/**`, `assets/icons/**`, `tests/view/**`, `tests/invariants/test_browser_view_framework.py`, depending on `simulation`, trust boundary `assets/icons/**`; `build-tools` keeps its Files (`README.md` stays in it); External context row game-icons.net; failure modes as Q15 | part map | spec § 10; cycle Q4, Q15, Q21 | Slices 7–10 are reviewed under it; the part-map guard passes only from here on; written in foundation step 2, after Slice 6 |

## Slices

### Slice 1 — content data and state types

- **Goal:** the map Las, its four resources, the three actions, the two conditions, the archetype
  „Mag żywiołów” and the pace stand in `src/browser/sim/data/` with the numbers of task item 1 and
  spec § 4.2, the id types are derived from the data, the state types of spec § 4.1 exist, and
  `npm test` runs `tests/sim/*.test.mjs`.
- **Change:** `src/browser/sim/types.ts` · `src/browser/sim/data/maps.ts` ·
  `src/browser/sim/data/resources.ts` · `src/browser/sim/data/actions.ts` ·
  `src/browser/sim/data/conditions.ts` · `src/browser/sim/data/archetypes.ts` ·
  `src/browser/sim/data/balance.ts` · `tests/sim/data.test.mjs` · `package.json`
- **Read:** `.runs/task-cycles/mag-w-lesie/task.md` · `.runs/task-cycles/mag-w-lesie/spec.md` ·
  `foundations/decisions.md` · `foundations/glossary.md` · `tsconfig.browser.json` ·
  `tests/http.test.mjs`
- **Reads outside the repository:** loop's `src/sim/data/maps.ts` (map `forest`), `activities.ts`,
  `conditions.ts`, `balance.ts`, `items.ts` under `C:\Storage\repos\loop`, to confirm the numbers
  spec § 4.2 transcribes; nothing else of loop's `src`.
- **Checks:** the failing test first: `tests/sim/data.test.mjs` (Las numbers equal task item 1;
  resource order stick, berry, moss, fiber; explore 20; `hereBelow` default 1, range 0–50, step 1;
  pace 1); then `npm run typecheck`; `npm test` (its count of tests includes the data tests);
  `python -B .the-way/gate/run_tests.py tests/invariants --record .runs/invariant-tests.jsonl`
  (all pass except the two new checks, which may fail until Slice 5).
- **Depends on:** "Where does the game's content live?" · Row 4 · term `program rule`

### Slice 2 — hex geometry and nearest tile

- **Goal:** `src/browser/sim/hex.ts` gives the coordinate conversion, neighbours in tile-list order,
  hex distance, the nearest qualifying tile by minutes of walking with its first step, centres,
  corners and the tile label of spec § 4.3 and § 4.5 (assumption A2).
- **Change:** `src/browser/sim/hex.ts` · `tests/sim/hex.test.mjs`
- **Read:** `.runs/task-cycles/mag-w-lesie/spec.md`
- **Also reads (made by earlier slices, not measured):** `src/browser/sim/types.ts`,
  `src/browser/sim/data/maps.ts`
- **Reads outside the repository:** loop's `src/sim/terrain.test.ts` and `src/sim/movement.test.ts`.
- **Checks:** the failing test first: `tests/sim/hex.test.mjs` (spec § 9.1 hex); then
  `npm run typecheck`; `npm test` (count grew); the invariant tests as in Slice 1.
- **Depends on:** Slice 1

### Slice 3 — seeded generators and the drawn layout

- **Goal:** `random.ts` gives the mulberry32 step, the per-stream generator states and `mixSeed`
  of spec § 4.4; `layout.ts` draws the tiles of a map from a seed in the contracted order with
  the minimum guarantee and the fixed entrance.
- **Change:** `src/browser/sim/random.ts` · `src/browser/sim/layout.ts` ·
  `tests/sim/random.test.mjs` · `tests/sim/layout.test.mjs`
- **Read:** `.runs/task-cycles/mag-w-lesie/spec.md`
- **Also reads (made by earlier slices, not measured):** `src/browser/sim/types.ts`,
  `src/browser/sim/data/maps.ts`, `src/browser/sim/data/resources.ts`, `src/browser/sim/hex.ts`
- **Reads outside the repository:** loop's `src/sim/resources.test.ts`.
- **Checks:** the failing tests first: `tests/sim/random.test.mjs` and `tests/sim/layout.test.mjs`
  (spec § 9.1 random and layout, minimum guarantee for seeds 1–20); then `npm run typecheck`;
  `npm test` (count grew); the invariant tests as in Slice 1.
- **Depends on:** Slice 2 · `simulation-randomness/1` · term `map run`

### Slice 4 — program choice, actions and the minute step

- **Goal:** `program.ts` evaluates conditions, checks feasibility without drawing and chooses the
  first applicable rule or a one-minute wait; `run.ts` starts a map run at minute 0 and steps it
  one game minute at a time, finishing explore, Wędruj and Idź as spec § 4.5–4.6 describe, with
  the next activity chosen in the finishing minute by the current program.
- **Change:** `src/browser/sim/program.ts` · `src/browser/sim/run.ts` ·
  `tests/sim/program.test.mjs` · `tests/sim/actions.test.mjs`
- **Read:** `.runs/task-cycles/mag-w-lesie/spec.md` · `.runs/task-cycles/mag-w-lesie/task.md`
- **Also reads (made by earlier slices, not measured):** `src/browser/sim/types.ts`,
  `src/browser/sim/data/*.ts`, `src/browser/sim/hex.ts`, `src/browser/sim/random.ts`,
  `src/browser/sim/layout.ts`
- **Reads outside the repository:** loop's `src/sim/movement.test.ts` and `src/sim/data/conditions.ts`.
- **Checks:** the failing tests first: `tests/sim/program.test.mjs` and `tests/sim/actions.test.mjs`
  (spec § 9.1 program and actions); then `npm run typecheck`; `npm test` (count grew); the
  invariant tests as in Slice 1.
- **Depends on:** Slice 3 · Row 3 · term `program rule` · term `game minute`

### Slice 5 — game functions, time flow and the simulation's code rules

- **Goal:** `game.ts` gives `newGame`, `setProgram`, `send`, `restart`, `end`, `setPaused`,
  `passRealTime` and `advanceMinutes` of spec § 4.3 as pure functions returning state and events;
  tests check time, flow, purity, the program and id validation, and spec rules S1 and S2 by
  scanning `src/browser/sim/**` and `src/browser/view/**`; both new invariant checks pass.
- **Change:** `src/browser/sim/game.ts` · `tests/sim/time.test.mjs` · `tests/sim/flow.test.mjs` ·
  `tests/sim/purity.test.mjs` · `tests/sim/rules.test.mjs` · `tests/sim/data.test.mjs`
- **Read:** `.runs/task-cycles/mag-w-lesie/spec.md` · `.runs/task-cycles/mag-w-lesie/task.md` ·
  `foundations/decisions.md` · `foundations/glossary.md` ·
  `tests/invariants/loop2_invariant_support.py`
- **Also reads (made by earlier slices, not measured):** every file under `src/browser/sim/`;
  `tests/invariants/test_map_run_repeatability.py` and
  `tests/invariants/test_simulation_randomness.py`, made by foundation step 1
- **Checks:** the failing tests first: `tests/sim/time.test.mjs`, `tests/sim/flow.test.mjs`,
  `tests/sim/purity.test.mjs`, `tests/sim/rules.test.mjs` and the validation cases added to
  `tests/sim/data.test.mjs` (spec § 9.1 time, flow, purity, S1, S2, data); then
  `npm run typecheck`; `npm test` (count grew);
  `python -B .the-way/gate/run_tests.py tests/invariants --record .runs/invariant-tests.jsonl` —
  every test passes, the two new checks included. The invariant checks are read-only: a failure
  of one goes back to the orchestrator, never into an edit of the check.
- **Depends on:** Slice 4 · D-04 new version · "Where does the game's content live?" ·
  `map-run-repeatability/1` · `simulation-randomness/1` · Row 2 · Row 3 · Row 4 ·
  term `map run` · term `game minute`

### Slice 6 — icon files, their credits and the build copy

- **Goal:** the four game-icons.net SVGs named in `resources.ts` (`wood-stick`, `berry-bush`,
  `fern`, `flax`) stand in `assets/icons/`, taken from the game-icons source repository at a
  pinned commit; `src/browser/view/credits.ts` holds each icon's author and that commit, taken
  from the source; `scripts/build.mjs` copies `assets/icons/*.svg` to `dist/public/icons/`; the
  icon test of spec § 9.2 checks the files as untrusted input and can fail; `npm test` runs
  `tests/view/*.test.mjs`.
- **Change:** `assets/icons/wood-stick.svg` · `assets/icons/berry-bush.svg` ·
  `assets/icons/fern.svg` · `assets/icons/flax.svg` · `src/browser/view/credits.ts` ·
  `scripts/build.mjs` · `tests/view/icons.test.mjs` · `package.json`
- **Read:** `.runs/task-cycles/mag-w-lesie/spec.md` · `tests/invariants/test_browser_view_framework.py`
- **Also reads (made by earlier slices, not measured):** `src/browser/sim/data/resources.ts`
- **Reads outside the repository:** the game-icons source repository at one commit the agent pins
  and records (fetched or cloned into the scratchpad, read only), the four SVG files and the
  record of their authors and licence there. Nothing outside this repository is changed; authors
  and the commit come from the source, never from memory.
- **Checks:** the failing test first: `tests/view/icons.test.mjs` (every icon passes spec § 6's
  rules with only the two exact namespace declarations allowed; each made-up SVG holding one
  forbidden form is rejected; each icon named in `resources.ts` exists; each has a credit); then
  `npm run typecheck`; `npm test` (count grew by the view tests);
  `npm run build` followed by a listing of `dist/public/icons/` showing the four files;
  the invariant tests as in Slice 5 (`test_browser_view_framework.py` passes with SVGs in
  `dist/public`).
- **Depends on:** Slice 1 · "Where does the game's content live?"

### Slice 7 — the terrain picture

- **Goal:** `terrainPicture(state, size)` in `src/browser/view/terrain-picture.ts` is a pure
  function giving the SVG size and, per tile, its polygon, whether it is revealed, its resource
  icons with positions and dimming at stock 0, and its outline (`character`, `stepTarget` or
  none), as spec § 5 describes; it holds no numbers of stock.
- **Change:** `src/browser/view/terrain-picture.ts` · `tests/view/terrain-picture.test.mjs`
- **Read:** `.runs/task-cycles/mag-w-lesie/spec.md` · `foundations/decisions.md` ·
  `foundations/part_map.md`
- **Also reads (made by earlier slices, not measured):** `src/browser/sim/types.ts`,
  `src/browser/sim/hex.ts`, `src/browser/sim/game.ts`, `src/browser/sim/data/resources.ts`
- **Checks:** the failing test first: `tests/view/terrain-picture.test.mjs` (spec § 9.2: 16 tiles
  from minute 0, no icons on unrevealed tiles, one icon per resource present, dimmed at stock 0,
  the two outlines); then `npm run typecheck`; `npm test` (count grew); the invariant tests as in
  Slice 5.
- **Depends on:** Slice 5 · Slice 6 · foundation step 2 (part map) · D-04 new version · Row 1 ·
  "Where does the game's content live?"

### Slice 8 — page shell, sending and run controls

- **Goal:** the page shows the header „Loop”, two columns and the footer with the icon credits; the
  map column shows the send panel („Mag żywiołów”, „Mapa: Las”, „Wyślij”) while no map run exists,
  and during a run the status row „Minuta {minute} · {activity}” with „ (pauza)” while paused and
  the buttons „Pauza”/„Wznów”, „Restart”, „Zakończ”; `view/app.ts` holds the one game state and
  replaces it only with what a simulation function returns; `view/clock.ts` passes elapsed real
  time to `passRealTime` every 200 ms and `Date.now()` to `send`; the status text comes from a
  pure function the test checks.
- **Change:** `src/browser/main.ts` · `src/browser/index.html` · `src/browser/view/app.ts` ·
  `src/browser/view/clock.ts` · `src/browser/view/send-panel.ts` ·
  `src/browser/view/status-row.ts` · `src/browser/view/footer.ts` ·
  `tests/view/status-row.test.mjs`
- **Read:** `.runs/task-cycles/mag-w-lesie/spec.md` · `.runs/task-cycles/mag-w-lesie/task.md` ·
  `foundations/decisions.md` · `tests/invariants/test_browser_view_framework.py` ·
  `tests/http.test.mjs`
- **Also reads (made by earlier slices, not measured):** `src/browser/sim/game.ts`,
  `src/browser/sim/types.ts`, `src/browser/sim/data/*.ts`, `src/browser/view/credits.ts`
- **Checks:** the failing test first: `tests/view/status-row.test.mjs` (status text for each
  activity kind from `actions.ts` and `resources.ts`, the wait text „Czeka — żadna reguła nie
  pasuje”, the pause suffix); then `npm run typecheck`; `npm test` (count grew;
  `tests/http.test.mjs` still finds `/main.js`); the invariant tests as in Slice 5; in the running
  product, `npm run dev` and http://127.0.0.1:3000: „Wyślij” starts a run, the minute grows by
  one a second, „Pauza” stops it and „Wznów” resumes, „Restart” returns to minute 0, „Zakończ”
  returns to the send panel, the footer shows the four credits, the console holds no error.
- **Depends on:** Slice 5 · Slice 6 · foundation step 2 (part map) · D-04 new version ·
  D-03 new version · Row 2 · Row 4 ·
  term `game minute` · term `map run`

### Slice 9 — the program editor

- **Goal:** the program panel, always visible, edits one ordered list of rules with conditions
  „Zawsze” and „Tu leży mniej niż N <zasób>” and actions „Eksploruj”, „Wędruj” and „Idź — <zasób>”
  chosen from lists read from data, with „↑”, „↓”, „Usuń” and „Dodaj regułę”; each edit commits a
  whole new program through `setProgram` on `change`, numbers rounded and clamped to the data's
  range and kept when invalid; focus stays on the edited control and returns after structural
  edits; the commit rules are pure functions the test checks.
- **Change:** `src/browser/view/program-editor.ts` · `src/browser/view/app.ts` ·
  `src/browser/index.html` · `tests/view/program-editor.test.mjs`
- **Read:** `.runs/task-cycles/mag-w-lesie/spec.md` · `.runs/task-cycles/mag-w-lesie/task.md` ·
  `foundations/decisions.md` · `foundations/glossary.md`
- **Also reads (made by earlier slices, not measured):** `src/browser/sim/game.ts`,
  `src/browser/sim/types.ts`, `src/browser/sim/data/*.ts`, `src/browser/view/app.ts`,
  `src/browser/index.html`
- **Checks:** the failing test first: `tests/view/program-editor.test.mjs` (the number field's
  commit rule — empty or not a number keeps the previous value, else rounded and clamped to the
  data's range; switching to a kind that names a resource takes the map's first resource and the
  data's default N; „Dodaj regułę” appends „Zawsze → Eksploruj”; every built program passes
  `setProgram`); then `npm run typecheck`; `npm test` (count grew); the invariant tests as in
  Slice 5; in the running product: a program written before „Wyślij” drives the run (the status
  row shows „Eksploruje”, then „Wędruje” or „Idzie po: …”), typing „12” in the number field keeps
  focus and commits 12, an edit during a 20-minute exploration changes the status only after it
  ends, the program stays after „Restart” and „Zakończ”.
- **Depends on:** Slice 8 · D-04 new version · term `program rule` · Row 3

### Slice 10 — terrain panel, tile list and README

- **Goal:** the terrain panel draws `terrainPicture` as SVG through `document.createElementNS`
  with no click handling; the tile list beside it shows one row per revealed tile with the stock
  of each resource of the map („—” where absent), columns headed by the icons and names from
  `resources.ts`; hovering a tile highlights its row and hovering a row highlights its tile; the
  list's rows come from a pure function the test checks; `README.md` describes what the page now
  shows instead of the empty page, and names `assets/icons` and the footer credits.
- **Change:** `src/browser/view/terrain-panel.ts` · `src/browser/view/tile-list.ts` ·
  `src/browser/view/app.ts` · `src/browser/index.html` · `tests/view/tile-list.test.mjs` ·
  `README.md`
- **Read:** `.runs/task-cycles/mag-w-lesie/spec.md` · `.runs/task-cycles/mag-w-lesie/task.md` ·
  `foundations/decisions.md` · `tests/invariants/test_browser_view_framework.py`
- **Also reads (made by earlier slices, not measured):** `src/browser/view/terrain-picture.ts`,
  `src/browser/view/app.ts`, `src/browser/index.html`, `src/browser/sim/hex.ts`,
  `src/browser/sim/types.ts`, `src/browser/sim/data/resources.ts`
- **Checks:** the failing test first: `tests/view/tile-list.test.mjs` (rows only for revealed
  tiles in tile-list order, labels `(col, row)`, stock per resource, „—” where absent); then
  `npm run typecheck`; `npm test` (count grew); the invariant tests as in Slice 5 (README still
  places the browser view in `src/browser`); in the running product, the whole check of task
  items 1–8 below.
- **Depends on:** Slice 7 · Slice 9 · Row 1 · "Where does the game's content live?"

## Coverage

| What the task requires | Slices or entries |
|---|---|
| Outcome: the player sends the mage to Las laid out from the map run's seed and sees it explore and step on the hex grid by its program; a restart restores the same layout | Slices 1–10; check in the running product |
| *To do* 1 — Las in the game's data: 4 × 4, entrance (1, 1), step 5 min, four resources with their numbers | Slice 1; "Where does the game's content live?" |
| *To do* 2 — one ready elementalist named „Mag żywiołów”, no creation screen, no own name | Slice 1 (`archetypes.ts`), Slice 5 (`send` with the archetype id), Slice 8 (send panel) |
| *To do* 3 — layout drawn from the seed before minute 0; „Restart” from minute 0 with the same seed and current program; „Zakończ” back to sending; a new seed on each send | Slice 3 (layout, `mixSeed`), Slice 5 (`send`, `restart`, `end`), Slice 8 (buttons); `map-run-repeatability/1`; Row 2 |
| *To do* 4 — one program of ordered rules, actions Eksploruj, Wędruj, Idź — <zasób>, conditions „Zawsze” and „Tu leży mniej niż N <zasób>” from a closed list, beside the terrain panel, changed before and during a run, effective from the next free minute, kept on „Restart” and „Zakończ” | Slice 1 (labels and range), Slice 4 (conditions, choice), Slice 5 (`setProgram`, restart with the current program), Slice 9 (editor); Row 3; term `program rule` |
| *To do* 5 — the character acts only by the program, first rule whose condition holds and whose action is feasible, no action by hand | Slice 4 (`chooseActivity`), Slice 5, Slice 9 (no manual control exists) |
| *To do* 6 — explore 20 min, reveals, not on a revealed tile, no item; a step is an ordinary action; Idź one step towards the nearest known tile, counted in minutes | Slice 2 (`nearestTile`), Slice 4 (actions), Slice 1 (20 min in data) |
| *To do* 7 — terrain panel: whole rectangle from minute 0, dark unrevealed, icons without numbers, dimmed at 0, amber outline, dashed step target, tile list with stocks, hover the only interaction, status row with minute and activity | Slice 6 (icons), Slice 7 (picture), Slice 8 (status row), Slice 10 (panel, list, hover); Row 1 |
| *To do* 8 — one game minute per real second, pause and resume | Slice 1 (pace), Slice 5 (`passRealTime`, `setPaused`), Slice 8 (clock, buttons); Row 4; term `game minute` |
| *Settlements to record* row 1 | decision, foundation step 1; Slices 7, 10 |
| *Settlements to record* row 2 | glossary term, foundation step 1; Slices 5, 8 |
| *Settlements to record* row 3 | decision, foundation step 1; Slices 4, 5 |
| *Settlements to record* row 4 | decision, foundation step 1; Slices 1, 5, 8 |
| Projected "What is the game built with?" (D-04 new version) and D-03 following it | foundation step 1; Slices 1–5, 7–10 |
| Projected "Where does the game's content live?" | foundation step 1; Slices 1, 5, 6, 7–10 |
| Projected `map-run-repeatability/1` and `simulation-randomness/1`, each with its check | foundation step 1 (checks by an agent that wrote neither sentence nor code); Slices 3–5 make them pass |
| Projected terms `program rule`, `map run`, `game minute` | foundation step 1 |
| Projected entries realized in part, written by tasks 4, 5, 8, 18 (randomness source, acting by program, map make-up, movement, pointing at things) | Slices 3, 4, 5 make their quoted parts true; no entry written (cycle Q2) |
| *Questions carried to cycle*: which part and files hold the simulation | foundation step 2 (part `simulation`, `src/browser/sim/**`); `simulation-randomness/1` covers those files |
| *Questions carried to cycle*: where the icons come from | Slice 6 (game-icons.net, CC BY 3.0, `assets/icons/`, credits from the source), Slice 8 (footer); trust boundary in foundation step 2 |
| *Out of scope*: no saving; reload starts afresh | nothing stores state: Slices 5 and 8 keep the state in memory only |
| Success: every changed foundation file passes its format guard | foundation steps 1 and 2; step 10 gate |
| Success: visible behaviour checked in the running product | Slices 8, 9 partly; Slice 10 and step 10 in full (below) |

Checks of foundation step 1, after its entries and the two checks are written:
`python -B .the-way/elements/decisions/format_guard.py foundations/decisions.md --base 170118680abec6760291df5d13f908c58409f867 --merge-onto 170118680abec6760291df5d13f908c58409f867` ·
`python -B .the-way/elements/invariants/format_guard.py foundations/invariants.md --base 170118680abec6760291df5d13f908c58409f867 --merge-onto 170118680abec6760291df5d13f908c58409f867` ·
`python -B .the-way/elements/glossary/format_guard.py foundations/glossary.md --base 170118680abec6760291df5d13f908c58409f867 --merge-onto 170118680abec6760291df5d13f908c58409f867` ·
`python -B .the-way/gate/run_tests.py tests/invariants --record .runs/invariant-tests.jsonl`
(all pass except the two new checks, which fail for the missing `dist/public/sim/game.js`).

Checks of foundation step 2:
`python -B .the-way/elements/part-map/format_guard.py foundations/part_map.md --base 170118680abec6760291df5d13f908c58409f867` (no pattern without a tracked file, no unclaimed file, the D-04 Scope's `simulation` a part; the dependency graph may stay unchecked as at the baseline) ·
the decisions and invariants guards above (Scope and *Part* names read against the new map) ·
`python -B .the-way/gate/run_tests.py tests/invariants --record .runs/invariant-tests.jsonl`
(`test_application_package_layout.py` resolves owners from the new map: no overlap, `browser-view`
still owns application source).

Check in the running product, step 10 (task items 1–8): `npm run dev`, then
http://127.0.0.1:3000 in a browser: the send panel shows „Mag żywiołów” and „Mapa: Las” (2); the
program panel offers exactly the actions and conditions of item 4 and the four resources (4); after
„Wyślij” the whole 4 × 4 rectangle shows dark tiles and the amber outline on (1, 1) at minute 0 (1,
7); with „Tu leży mniej niż 1 patyk → Eksploruj”, „Zawsze → Idź — jagoda”, „Zawsze → Wędruj” the
status row shows „Eksploruje” for 20 minutes, the tile turns light with icons and no numbers and
appears in the list with its stocks, then the character steps with a dashed target outline (5, 6,
7); the minute grows by one a second, „Pauza” stops it and „Wznów” resumes (8); hovering a tile
highlights its row and back, a click does nothing (7); a program edit during an exploration takes
effect only after it (4); „Restart” returns to minute 0 with the same layout (compare the revealed
tiles' list after the same minutes), „Zakończ” returns to the send panel and a new „Wyślij” gives a
different layout; the program stays through both (3, 4); the footer credits the four icons; the
browser console holds no error.

## Choices

| Choice | Way rejected | Cost if wrong |
|---|---|---|
| The part-map change is a second foundation step right after Slice 6, written by the orchestrator with `the-way-update-part-map` | in foundation step 1 (the guard rejects patterns that match no tracked file); after Slice 10 (Slices 7–10 reviewed while their files are unclaimed or claimed by the wide `src/browser/**`, the icons' trust boundary missing from the map) | the part-map guard reports errors between foundation step 1 and foundation step 2; moving the step costs nothing in code |
| The simulation is cut in five slices bottom-up: data and types, hex, randomness and layout, program and run, game functions | one slice for the whole simulation (more than ten files, beyond one reviewer's judgment); one slice per file (slices without a goal a reviewer can judge alone) | more handoffs between agents; a slice proving too large is split again |
| The two invariant checks are written in foundation step 1 and fail until Slice 5 | writing them after Slice 5 (the checks would be written with the code in sight, against WAY-69's order) | Slices 1–4 report two failing invariant tests that are expected; a reviewer must not take them for a regression |
| The scans of spec rules S1 and S2 are one test in Slice 5 that scans `src/browser/sim/**` and `src/browser/view/**`, so later view slices are checked as they land | a scan per slice, or S2's view scan only in Slice 10 | a view slice that breaks S2 fails `npm test` at once rather than at the end; none |
| The view's status text, the editor's commit rules and the tile list's rows are pure exported functions with Node tests | checking these slices only by hand in the running product, since spec § 9.2 names no test for them | a few exported helpers; a view module must not touch the DOM when imported |
| `package.json`'s test script gains `tests/sim/*.test.mjs` in Slice 1 and `tests/view/*.test.mjs` in Slice 6, with the count of tests checked | both globs in Slice 1 (a glob matching nothing passes silently, 0 tests) | a mistyped glob runs no tests and still exits 0; the count check catches it |
| README is updated in Slice 10, when the page it describes is complete | a separate README slice (a slice for its own sake); updating it in Slice 8 (it would describe a page not yet there) | Slice 10 carries a second, small goal its reviewer judges alongside |
| D-03's new version changes only *Relations*; its binding sentences and so `browser-view-framework/1`'s reference `D-03@fb5aa3b0` stay | a new version of `browser-view-framework/1` too | none: a fingerprint covers binding sentences only (decisions template, WAY-31) |
