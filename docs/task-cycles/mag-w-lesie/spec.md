# Spec — mag-w-lesie: the elementalist on the map Las, driven by a program of rules

Date: 2026-10-13 · Task: `.runs/task-cycles/mag-w-lesie/task.md` (frozen, the authority) · Cycle: `cycle.md`
Classification: architectural · Approach: A (pure simulation inside the browser source), with the answers recorded in § 12.
Status: written by the design agent, self-reviewed; the orchestrator's go-ahead to write it was provisional under the user's delegation, not a human approval.

UI text shown to the player is Polish; identifiers and comments are English. Quoted Polish strings below are the exact UI texts.

## 1. Intended outcome and success criteria

The player opens the game, writes one program of rules, sends the one ready mage („Mag żywiołów”) to Las, and watches it explore and walk on a 4 × 4 hex grid at one game minute per real second, with pause, „Restart” (same layout) and „Zakończ” (back to sending; the next send gets a new layout). Task items 1–8 are the acceptance list.

Success:
- items 1–8 of the task's *To do* observable in the browser (`npm run dev`, http://127.0.0.1:3000);
- `npm test` builds and runs the server tests plus the new simulation and view tests in Node, with no browser;
- `python -B .the-way/gate/run_tests.py tests/invariants` passes, including the two new invariants' checks (written by another agent, § 9.3);
- every changed foundation file passes its format guard.

## 2. Sources, and what is assumed

- Task numbers and behaviour: `task.md` *To do* 1–8 and *Questions to settle*.
- Behaviour of Wędruj, Idź, the layout's bounds and the minimum guarantee: loop's tests `src/sim/movement.test.ts`, `src/sim/resources.test.ts`, `src/sim/terrain.test.ts` (allowed reading; loop's engine was not read).
- Numbers: loop's data `src/sim/data/maps.ts` (map `forest`), `activities.ts` (explore 20 min), `conditions.ts` (`hereBelow`: default 1, 0–50, step 1), `balance.ts` (`gameMinutesPerRealSecond: 1`), `items.ts` (icon names).
- Panel: `koncepcja_projektowa.md` §5; stack and graphics: §7.

Assumptions accepted by the orchestrator, with their source:
- A1 — a "known tile" is a revealed tile, and the program reads its true stock (concept §5, open note „Czy wiedza o kafelku ma być doskonała”: „Program widzi prawdziwy zapas odsłoniętego kafelka”).
- A2 — geometry: pointy-top hexagons, rectangle in offset coordinates with odd rows shifted right, axial `q = col − floor(row / 2)`, `r = row`; first corner straight above the centre, corners clockwise; drawing radius 24 px (loop `terrain.test.ts`; concept §5 open note „kafelek o promieniu 24 px”).
- A3 — the entrance tile starts unrevealed (loop `resources.test.ts` and `movement.test.ts`: exploring the start tile reveals it).

## 3. Architecture

Two parts in the browser source, both compiled by the existing `tsconfig.browser.json` into `dist/public/`:

```
src/browser/
  main.ts            entry: builds the page, starts the view (browser-view)
  index.html         page shell with inline <style> (browser-view)
  sim/               the simulation (part `simulation`)
    hex.ts  random.ts  layout.ts  program.ts  run.ts  game.ts  types.ts
    data/   maps.ts  resources.ts  actions.ts  conditions.ts  archetypes.ts  balance.ts
  view/              screens (part `browser-view`)
    app.ts  clock.ts  terrain-picture.ts  terrain-panel.ts  tile-list.ts
    status-row.ts  program-editor.ts  send-panel.ts  footer.ts  credits.ts
assets/icons/        four SVG files from game-icons.net (part `browser-view`)
```

Rules binding every file of `src/browser/sim/**` (spec rule S1):
- it imports only other files of `src/browser/sim/**` (relative specifiers);
- it uses no DOM or browser global (`document`, `window`, `navigator`, `localStorage`, `requestAnimationFrame`, …), no Node module or global (`node:*`, `process`, `Buffer`), and no timer (`setTimeout`, `setInterval`);
- it reads no system time (`Date`, `performance`) — real time arrives only as an argument;
- it draws random numbers only through `random.ts` from generator states kept in the map run (§ 5).

Spec rule S2 (content ids stand in data, § 4.1): no map, resource or archetype id appears as a literal or a closed union in code outside `src/browser/sim/data/`; the view takes every name and icon it shows from the data files.

`browser-view` imports from `sim/`; `sim/` imports nothing from `view/`.

Every public state-changing function of the simulation is pure: it does not mutate its arguments and returns `{ state, events }` (§ 4.3). The view holds the one current `GameState` reference in `view/app.ts`, replaces it only with the `state` a simulation function returned, and draws only from it. Hover highlighting is the only view-local state.

## 4. The simulation

### 4.1 Types (`sim/types.ts`)

Content ids are not written in code (spec rule S2, from the decision "Where does the game's content live?"): no map, resource or archetype id appears as a literal or a closed union outside `sim/data/`. The id types are derived from the data files and re-exported here:

```ts
// declared in sim/data/*.ts, derived from the data, e.g.
//   export const RESOURCES = { stick: {...}, berry: {...}, ... } as const satisfies Record<string, ResourceDef>;
//   export type ResourceId = keyof typeof RESOURCES;
// likewise MapId from MAPS and ArchetypeId from ARCHETYPES.
import type { ResourceId, MapId, ArchetypeId } from './data/…';
type Hex = { q: number; r: number };                       // axial

type Condition =
  | { kind: 'always' }
  | { kind: 'hereBelow'; resource: ResourceId; value: number };
type Action =
  | { kind: 'explore' }
  | { kind: 'wander' }
  | { kind: 'walkTo'; resource: ResourceId };
type ProgramRule = { condition: Condition; action: Action };
type Program = { rules: ProgramRule[] };

type Tile = {
  col: number; row: number; at: Hex;                        // both coordinate forms, fixed
  revealed: boolean;
  stepMinutes: number;                                      // cost of entering this tile
  stock: Partial<Record<ResourceId, number>>;               // key present = the tile has the resource
};

type Activity =                                              // what the character is doing now
  | { kind: 'rule'; ruleIndex: number; action: Action }     // ruleIndex: position in the program at the start
  | { kind: 'wait' };                                       // no rule applied
type CurrentActivity = {
  activity: Activity;
  startMinute: number;
  endMinute: number;                                        // > startMinute
  stepTo: Hex | null;                                       // target tile of a move, else null
};

type MapRun = {
  mapId: MapId;
  seed: number;                                             // uint32
  minute: number;                                           // game minutes since the start, 0 at start
  tiles: Tile[];                                            // row-major: row 0 col 0, row 0 col 1, …
  character: { archetypeId: ArchetypeId; at: Hex };
  current: CurrentActivity;                                 // always set while the run exists
  wanderRandom: number;                                     // generator state of the wander stream
};

type GameState = {
  program: Program;
  run: MapRun | null;                                       // null = sending screen
  lastSeed: number;                                         // seed of the latest send; INITIAL_SEED at start
  paused: boolean;
  realMsCarry: number;                                      // scaled real ms not yet turned into a game minute, 0 ≤ x < 1000
};
```

The state is plain JSON (numbers, strings, booleans, arrays, objects) so task 16 can save it.

### 4.2 Data files (`sim/data/`) — content in data

| File | Content | Source |
|---|---|---|
| `maps.ts` | `forest`: name „Las”, width 4, height 4, entrance `{ col: 1, row: 1 }`, stepMinutes 5, resources as an **ordered array**: stick (density 0.7, stock 12, renewMinutes 30), berry (0.5, 8, 40), moss (0.4, 6, 60), fiber (0.4, 6, 60) | task item 1; loop `maps.ts` |
| `resources.ts` | stick „patyk”, icon `wood-stick`; berry „jagoda”, `berry-bush`; moss „mech”, `fern`; fiber „włókno”, `flax` | task Q&A; loop `items.ts` icon names |
| `actions.ts` | explore: label „Eksploruj”, status „Eksploruje”, minutes 20; wander: „Wędruj”, status „Wędruje”, minutes from the target tile; walkTo: „Idź”, status „Idzie po”, minutes from the target tile | task items 4, 6; loop `activities.ts` |
| `conditions.ts` | always: „Zawsze”; hereBelow: „Tu leży mniej niż”, unit „szt.”, default 1, min 0, max 50, step 1 | task item 4; loop `conditions.ts` |
| `archetypes.ts` | elementalMage: name „Mag żywiołów” | task item 2 |
| `balance.ts` | `gameMinutesPerRealSecond: 1`, `waitMinutes: 1`, `INITIAL_SEED = 1` | task item 8; loop `balance.ts`; § 12 Q3, Q6 |

Each data file exports its records keyed by id (`MAPS`, `RESOURCES`, `ACTIONS`, `CONDITIONS`, `ARCHETYPES`) and the derived id type where one exists. Action and condition *kinds* (`explore`, `wander`, `walkTo`, `always`, `hereBelow`) are mechanics the simulation handles and stay in code; their labels, status texts, durations and value ranges stand in the data. Every name, label and icon the view shows is read from these files — „Las” in „Mapa: Las” is `MAPS[mapId].name`, „Mag żywiołów” is `ARCHETYPES[archetypeId].name`. Adding a map, resource or archetype of a kind the simulation already handles is a change of `sim/data/` alone (plus an icon file).

`renewMinutes` stands in the data (task item 1) but nothing reads it in this task: stock does not change until task 4. The order of the resource array is part of the layout's contract (§ 4.4); reordering it is a contract change, not cosmetics.

### 4.3 Public functions

`sim/game.ts` — the only functions the view calls to change the state:

| Function | Behaviour |
|---|---|
| `newGame(): GameState` | empty program, `run: null`, `lastSeed: INITIAL_SEED`, `paused: false`, `realMsCarry: 0` |
| `setProgram(state, program)` | validates against the closed list (§ 4.5) and replaces `state.program`; throws on an invalid program (the editor cannot produce one); allowed with or without a run; never touches `run.current` |
| `send(state, { mapId, archetypeId }, realMs)` | only when `run === null` (else throws); `mapId` and `archetypeId` must be keys of `MAPS` and `ARCHETYPES` (the view passes ids it read from those data files); `seed = mixSeed(state.lastSeed, realMs)`; `lastSeed = seed`; builds the map run (§ 4.4) at minute 0, `paused: false`, `realMsCarry: 0`, then chooses the first activity at minute 0; events `mapRunStarted`, `activityStarted` |
| `restart(state)` | only with a run; ends the current map run and starts a new one of the same map, archetype and `run.seed`, at minute 0, with the current program; `paused: false`, `realMsCarry: 0`; `lastSeed` unchanged; events `mapRunEnded`, then `mapRunStarted`, `activityStarted` (settlement 2: a restart is a new map run) |
| `end(state)` | only with a run; `run: null`, `paused: false`, `realMsCarry: 0`; program and `lastSeed` kept; event `mapRunEnded` |
| `setPaused(state, paused)` | sets `paused`; no-op without a run |
| `passRealTime(state, realMs)` | real time enters here only; ignored when there is no run, when paused, or when `realMs` is not a finite number > 0; `total = realMsCarry + realMs × gameMinutesPerRealSecond`; `minutes = floor(total / 1000)`; `realMsCarry = total − minutes × 1000`; then `advanceMinutes(state, minutes)` |
| `advanceMinutes(state, minutes)` | the D-04 function of a span of game minutes: repeats § 4.6's minute step `minutes` times; no-op without a run |

Every function above returns `{ state: GameState; events: GameEvent[] }` (`newGame` returns the state alone).

`GameEvent` (minute-stamped, in order of occurrence): `mapRunStarted {seed}`, `mapRunEnded {}`, `activityStarted {minute, activity, stepTo}`, `activityFinished {minute, activity}`, `tileRevealed {minute, at}`, `moved {minute, from, to}`. The view does not need events in this task; they exist because D-04's sentence requires them and the repeatability check compares them.

Other modules' exports, used by `game.ts`, the view and tests:
- `hex.ts`: `offsetToAxial(col, row)`, `sameHex(a, b)`, `hexDistance(a, b)`, `tileAt(tiles, at)`, `neighbours(tiles, at)` (in tile-list order), `nearestTile(tiles, from, predicate)` → `{ tile, minutes, next } | null`, `hexCenter(at, size)`, `hexCorners(size)`, `tileLabel(tile)` → `"(col, row)"`, 0-based offset coordinates.
- `random.ts`: `nextRandom(state)` → `{ value, state }`, `value` in [0, 1); `streamState(seed, stream)` for streams `'layout' | 'wander'`; `mixSeed(previous, realMs)` (§ 4.4).
- `layout.ts`: `drawLayout(map, seed)` → `{ tiles, entrance }`.
- `program.ts`: `conditionHolds(run, map, condition)`, `actionFeasible(run, map, action)`, `chooseActivity(run, map, program)` — none of them draws.
- `run.ts`: `newMapRun(map, seed, program)`, `stepMinute(run, map, program)` → `{ run, events }`.

### 4.4 Randomness and the layout

Generator: mulberry32 over a uint32 state (`state = (state + 0x6D2B79F5) >>> 0`, then the standard mulberry32 mixing to a value in [0, 1)). The state is one JSON number.

One generator per kind of draw, each derived from the map run's seed: `streamState(seed, stream) = fmix32(seed ^ STREAM_CONSTANT[stream])` with a distinct fixed constant per stream (`fmix32` = MurmurHash3's 32-bit finaliser). Adding a stream later (gathering, attacks) changes no existing stream.
- `layout` — used only by `drawLayout`, at the start, before minute 0; its state is not kept.
- `wander` — kept in `MapRun.wanderRandom`, advanced once per Wędruj step choice.

New seed per send (Q3): `mixSeed(previous, realMs)` is a pure hash, not a draw: `lo = realMs mod 2³²`, `hi = floor(realMs / 2³²)`, result `fmix32(previous ^ fmix32(lo ^ fmix32(hi + 0x9E3779B9)))`, uint32. The initial game state carries `INITIAL_SEED`.

`drawLayout(map, seed)` — the draw order is a contract:
1. Tiles in row-major order (row 0 col 0 … row 0 col 3, row 1 col 0, …), each `revealed: false`, `stepMinutes: map.stepMinutes`, `stock: {}`.
2. For each tile in that order, for each resource in the map's array order: one draw `u`; if `u < density`, `stock[resource] = resource.stock`.
3. Minimum guarantee (taken from loop's `resources.test.ts`, „każdy zasób o dodatniej gęstości leży na choć jednym kafelku”): for each resource in array order with density > 0 that no tile has, one draw picks `floor(u × tileCount)` and that tile gets the resource's full stock.
4. Entrance: the map's fixed entrance (no draw). A drawn entrance (task 8) is appended after step 3, so it shifts no draw of steps 2–3.

### 4.5 The program

Closed list (validation in `setProgram`): condition kinds `always`, `hereBelow`; action kinds `explore`, `wander`, `walkTo`; `resource` must be a resource of a map, read from data: with a run, one in the run's map's `resources` list in `MAPS`; without a run, one in the `resources` list of some map in `MAPS` (today both are Las's four); `value` an integer in [min, max] of `hereBelow` in `conditions.ts`. No resource id is written in the validation code. Any rule count from 0 up is valid; an empty program is valid.

Conditions (`conditionHolds`):
- `always` — holds.
- `hereBelow(resource, N)` — the stock of `resource` on the character's tile, counted 0 if the tile is unrevealed or lacks the resource; holds iff stock < N (loop `conditions.ts`: unrevealed counts as empty). N = 0 never holds.

Actions — feasibility (no draw) and what starting and finishing do:

| Action | Feasible iff | Start | Duration | Finish |
|---|---|---|---|---|
| Eksploruj | the character's tile is unrevealed | `stepTo: null` | 20 (data) | the tile becomes revealed; event `tileRevealed`; no item |
| Wędruj | the character's tile has ≥ 1 neighbour on the map | candidates = unrevealed neighbours if any, else all neighbours (tile-list order); one `wander` draw picks `candidates[floor(u × n)]` → `stepTo` | `stepTo` tile's `stepMinutes` | character moves to `stepTo`; event `moved` |
| Idź — R | `nearestTile(tiles, at, t ⇒ t.revealed && stock[R] > 0)` exists and its `minutes > 0` | `stepTo` = that result's `next` | `stepTo` tile's `stepMinutes` | character moves to `stepTo`; event `moved` |

`nearestTile`: Dijkstra over the map's tiles from `from`, the cost of a move being the entered tile's `stepMinutes`; `from` itself qualifies at 0 minutes with `next = from`; among equally near qualifying tiles the earlier in tile-list order wins; `next` is the first neighbour of `from`, in tile-list order, that lies on a cheapest path to the chosen tile. (Loop `terrain.test.ts` and `movement.test.ts` pin the same behaviour.)

`chooseActivity`: the first rule, in program order, whose condition holds and whose action is feasible → `{ kind: 'rule', ruleIndex, action }`; if none → `{ kind: 'wait' }` lasting `waitMinutes` (1). The player has no way to start an action by hand.

### 4.6 The minute step and time flow

The state always describes "at minute `run.minute` the character is doing `run.current`".
- `newMapRun` sets minute 0 and calls `chooseActivity` at minute 0 (event `activityStarted`).
- `stepMinute`: `minute += 1`; if `minute === current.endMinute`, apply the finish (§ 4.5; events `activityFinished` and `tileRevealed`/`moved`), then choose and start the next activity at this minute with the **current** program.

Consequences, all required:
- a program edit never interrupts the running activity (settlement 3); it takes effect at the next free minute, i.e. when the running activity finishes (a wait lasts one minute, so edits made while waiting apply next minute);
- the run never ends by itself in this task (no death, no completion);
- pause: `passRealTime` ignores real time while `paused`; `advanceMinutes` called directly still advances (tests use it);
- real time elapsed while the tab was hidden arrives as one long `realMs` and is turned into that many minutes at once; no cap (Q7);
- for integer inputs, `passRealTime` of 1000 ms in one call and 1000 calls of 1 ms give the same state.

## 5. The view (`src/browser/view/`, `main.ts`, `index.html`)

Page: header „Loop”; two columns — left the program panel, right the map column; footer at the bottom. Styles inline in `index.html`.

`clock.ts`: a `setInterval` of 200 ms reads `performance.now()` and passes the elapsed real ms since its previous reading to `passRealTime`; on send it passes `Date.now()` to `send`. The view re-renders the map column after every state change. Clock ticks never touch the program editor; it updates only when the program changes, as described below, so ticking cannot steal focus from its inputs.

**Program panel** (`program-editor.ts`), always visible, before sending and during a run:
- heading „Program”; one row per rule in order: condition select (labels from `conditions.ts`: „Zawsze”, „Tu leży mniej niż”), for „Tu leży mniej niż” a number input (default, min, max and step from `conditions.ts`: 1, 0, 50, 1) and a resource select, then „→”, action select (labels from `actions.ts`: „Eksploruj”, „Wędruj”, „Idź”), for „Idź” a resource select; the resource selects offer the resources of the map shown in the send panel, or of the run's map, in that map's order, with names from `resources.ts` (today patyk, jagoda, mech, włókno); buttons „↑”, „↓”, „Usuń”;
- button „Dodaj regułę” appends „Zawsze → Eksploruj”; switching a condition or action to a kind that names a resource takes the first resource of the map's list in data and, for „Tu leży mniej niż”, the data's default N;
- edits commit on the `change` event, never on `input`. A select commits when its choice changes. The number field commits on `change` (blur or Enter): its text is parsed as a number; if it holds no finite number (empty, not a number), the field gets back the previous value and nothing is committed; otherwise the value is rounded to an integer, clamped to the data's range, written back into the field, and committed if it differs from the rule's value;
- a commit builds a whole new `Program` and calls `setProgram` (D-04 complies example);
- focus: the editor keeps one row element per rule and is not rebuilt on a value edit. After `setProgram` returns, it updates the existing controls in place (it sets a control's value only when it differs and shows or hides the number field and resource selects for the chosen kinds), so the control being edited keeps focus. Structural edits re-render the rows and then put focus back: after „↑”/„↓” on the same button in the moved rule's new row; after „Usuń” on the „Usuń” of the row now at that position, or on „Dodaj regułę” when there is none; after „Dodaj regułę” on the new row's condition select.

**Send panel** (`send-panel.ts`), in the map column when `run === null`: the archetype's name from `ARCHETYPES` („Mag żywiołów”), „Mapa: ” followed by the map's name from `MAPS` („Mapa: Las”), and button „Wyślij”, which calls `send` with that map's and that archetype's ids. Today's data holds one map and one archetype; the panel shows the entries the data holds and writes no id or name itself.

**Status row** (`status-row.ts`), above the terrain panel during a run: „Minuta {minute} · {activity}”, where activity is the status text from `actions.ts` („Eksploruje”, „Wędruje”, „Idzie po: {resource name from `resources.ts`}”) or „Czeka — żadna reguła nie pasuje”, with „ (pauza)” appended while paused; buttons „Pauza”/„Wznów”, „Restart”, „Zakończ”.

**Terrain panel** (`terrain-picture.ts` + `terrain-panel.ts`): `terrainPicture(state, size = 24)` is pure (no DOM) and returns the SVG size and, per tile, its polygon points (from `hexCenter` + `hexCorners`), `revealed`, icons (resource, `/icons/<icon from resources.ts>.svg`, position, `dimmed` when stock is 0) and outline (`character` | `stepTarget` | none). `terrain-panel.ts` only draws that picture as SVG via `document.createElementNS`:
- the whole rectangle from minute 0; unrevealed tiles dark and empty; revealed tiles lighter with one icon per resource present, no numbers; icon dimmed at stock 0;
- thick amber outline on the character's tile; dashed outline on `current.stepTo` while a move runs;
- no click handling; hovering a tile highlights its list row and hovering a row highlights its tile (the only interaction, settlement 1).

**Tile list** (`tile-list.ts`), beside the drawing: one row per revealed tile in tile-list order: `tileLabel` and, per resource of the run's map (columns headed by the icon and name from `resources.ts`), its stock, „—” where the tile lacks the resource.

**Footer** (`footer.ts` + `credits.ts`): per icon, „{resource name}: {author}, game-icons.net, CC BY 3.0” (e.g. „patyk: <author from the source>, …”) with links to the icon's source and the licence. `credits.ts` holds the authors and the source commit of the icon files.

## 6. Icons

- Source: game-icons.net, licence CC BY 3.0 (commercial use allowed with credit). Four icons: `wood-stick`, `berry-bush`, `fern`, `flax`; resource icons only, actions stay text.
- Stored in `assets/icons/<name>.svg`, outside `dist/public`; `scripts/build.mjs` copies `assets/icons/*.svg` to `dist/public/icons/`. No npm package; `package-lock.json` unchanged.
- The implementer takes each icon's author and the source repository commit from the source itself (the game-icons repository at a pinned commit), never from memory, and records them in `credits.ts`.
- The SVGs are untrusted input. Before commit, and by test (§ 9.2), each file must hold no `<script>`, no `on*` attribute, no `<foreignObject>`, and no reference outside itself: no `href`/`xlink:href` other than `#…`, no `url(` other than `url(#…)`, and no `http:`, `https:`, `//` or `data:` anywhere, **except** the two namespace declarations `xmlns="http://www.w3.org/2000/svg"` and `xmlns:xlink="http://www.w3.org/1999/xlink"`, allowed with exactly these values (an SVG drawn through `<img>` needs its namespace). The test removes those two exact attributes before it scans for the forbidden strings. The files are drawn only through `<img>`/SVG `<image>`, where scripts do not run.

## 7. Build and test scripts (build-tools)

- `scripts/build.mjs`: after copying `index.html`, copy `assets/icons/*.svg` into `dist/public/icons/` (creating the directory). Nothing else changes; the two TS configurations stay as they are.
- `package.json` `test`: `npm run build && node --test tests/http.test.mjs tests/startup.test.mjs "tests/sim/*.test.mjs" "tests/view/*.test.mjs"` (Node 24 expands the globs).
- `README.md`: replace „Strona ma być pusta” and the empty-page checks with what the page now shows; mention `assets/icons` and the footer credits.

## 8. Error handling

- `setProgram` throws on a program outside the closed list; `send` throws with a run present; `restart`/`end` throw without a run. These are programming errors; the view never calls them in those states (buttons exist only in the matching screen).
- `passRealTime` ignores non-finite, zero or negative `realMs` (clock oddities).
- No storage, no network beyond loading the page and icons.

## 9. Tests

### 9.1 Simulation unit tests — `tests/sim/*.test.mjs` (node:test on `dist/public/sim/**`)

- hex: offset↔axial (`(0,0)→(0,0)`, `(1,1)→(1,1)`, `(0,2)→(-1,2)`); six neighbours inside a grid, two in the corner `(0,0)`; `hexDistance`; centres and corners as loop `terrain.test.ts`; `nearestTile` — start tile at 0 minutes, null when nothing qualifies, ties by list order, cheaper detour preferred over a costly tile.
- random: same state → same sequence; values in [0, 1); streams of one seed differ; `mixSeed` deterministic and changing with either argument.
- data: Las numbers equal task item 1; resources order stick, berry, moss, fiber; explore 20; `hereBelow` default 1, 0–50; pace 1; `setProgram` accepts every resource of the map's data list and rejects an id outside it; `send` rejects a map or archetype id not in the data.
- layout: only the map's resources; full stock; all tiles unrevealed; entrance `(1,1)` exists; same seed → same tiles, different seeds → different (on a fixed pair); minimum guarantee for seeds 1–20 (as loop's test).
- program: first rule wins; false condition skipped; infeasible action skipped; no rule → wait 1 minute; `hereBelow` reads 0 on an unrevealed tile; feasibility does not change `wanderRandom`.
- actions: explore takes 20 minutes, reveals, brings nothing, not feasible again; Wędruj prefers an unrevealed neighbour, goes to some neighbour when all are revealed, not feasible with no neighbour; Idź targets the nearest revealed tile with stock > 0 and gives the first step, not feasible with none or on the target; a step lasts the target tile's `stepMinutes`; the dashed target equals `current.stepTo`.
- time: 1000 ms → 1 minute; carry across calls; paused → no change; resume continues; one long `realMs` (real time elapsed while the tab was hidden) advances that many minutes.
- flow: a program edit during a 20-minute explore does not interrupt it and applies at minute 20; Restart → minute 0, same seed, same tiles as at the run's start, current program, events `mapRunEnded` then `mapRunStarted`; Zakończ → `run: null`, program kept, event `mapRunEnded`; next send with a later `realMs` → a different seed.
- purity of the API: no public function mutates its input (deep copy before = after).
- spec rule S1: a scan of `src/browser/sim/**` (comments and string literals removed) finds only relative imports inside `sim/` and none of the names S1 forbids.
- spec rule S2: a scan of `src/browser/sim/**` and `src/browser/view/**` outside `sim/data/`, with comments removed, finds no string literal equal to a map, resource or archetype id or name of the data files (ids and names read from the built data modules).

### 9.2 View tests — `tests/view/*.test.mjs` (node:test on `dist/public/view/terrain-picture.js` and `assets/icons`)

- `terrainPicture`: 16 tiles from minute 0; unrevealed tiles carry no icons; a revealed tile carries one icon per resource present; dimmed at stock 0 (fixture state); `character` outline on the character's tile; `stepTarget` outline only while a move runs.
- icons (the crafted-input check of the trust boundary `assets/icons/**`, § 10): every `assets/icons/*.svg` passes § 6's untrusted-input rules, with only the two exact namespace declarations allowed; a made-up SVG holding each forbidden form in turn (a `<script>`, an `onload`, a `<foreignObject>`, an external `href`, an `xmlns` with another value) is rejected by the same check, so the check can fail; each icon named in `resources.ts` exists there; every icon has a credit in `credits.ts`.

Manual check in the cycle's testing step: `npm run dev`, then items 1–8 in a browser.

### 9.3 Invariant checks — method designed here, written by an agent other than the code's author (WAY-69)

Both run under `python -B .the-way/gate/run_tests.py tests/invariants`, use `loop2_invariant_support.built_copy()` (a fresh copy of the working tree after `npm run build`), and drive the built modules `dist/public/sim/game.js` (and siblings) through a Node script the test writes to a temporary directory and runs with `node`.

`tests/invariants/test_map_run_repeatability.py` — map-run-repeatability/1:
- one fixed scenario: `newGame` → `setProgram` with a program that uses every condition and action (e.g. „Tu leży mniej niż 1 patyk → Eksploruj”, „Zawsze → Idź — jagoda”, „Zawsze → Wędruj”) → `send(T)` → a fixed list of `passRealTime` inputs of 1000 ms covering ≥ 600 minutes, with a pause and resume and one mid-run `setProgram(P2)`, where P1 is the starting program;
- the script prints, after every input, the JSON of `state.run` and the events; the test runs the script in **two separate Node processes** and requires identical output minute by minute (separate processes expose any hidden use of process-wide randomness or time);
- replay: after the scenario, the script sets the starting program P1 again (`setProgram(P1)`), then calls `restart` and feeds the same inputs, including the same mid-run `setProgram(P2)`; the replay's sequence must equal the first run's from minute 0 (restart takes the current program, so without setting P1 again the replay would start with P2 and rightly differ);
- controls, so the check can fail: a send with another `T` gives a different layout; the scenario reveals more than one tile and moves the character (the run is not trivial).
- Does not cover: inputs other than the scenario's; the view's clock.

`tests/invariants/test_simulation_randomness.py` — simulation-randomness/1:
- static: every tracked file under `src/browser/sim/` (the part `simulation`'s source), with comments and string literals removed, names none of `Math.random`, `crypto`, `getRandomValues`, `randomUUID`, `node:crypto`; only `random.ts` defines a generator step (the mulberry32 increment constant appears in no other file);
- dynamic: the Node script replaces `Math.random`, `crypto.getRandomValues` and `crypto.randomUUID` with functions that throw, first proving the stub fires (a direct call throws), then imports every module of `dist/public/sim/**` and runs a send, ≥ 2000 minutes with a Wędruj-heavy program, `restart`, `end` and a second send without an exception;
- control: two sends with different `realMs` give different Wędruj paths (draws depend on the seed's generator).
- Does not cover: a home-made generator seeded from something other than the run's state that uses none of the named sources and none of the forbidden names of S1.

## 10. Part-map changes (written in the foundation step)

- New part `simulation` — "The part computes the game: the game state, the map run, the character's program and the passing of game time, from the game's data." Files: `src/browser/sim/**`, `tests/sim/**`, `tests/invariants/test_map_run_repeatability.py`, `tests/invariants/test_simulation_randomness.py`. Depends on: none. Trust boundary: none. `simulation-randomness/1` covers its source files.
- `browser-view` — Files narrowed to `src/browser/*.ts`, `src/browser/index.html`, `src/browser/view/**`, `assets/icons/**`, `tests/view/**`, `tests/invariants/test_browser_view_framework.py`, so no file has two owners (the package-layout check fails on overlaps). Depends on: simulation. Trust boundary: `assets/icons/**` (external files from game-icons.net, untrusted; its crafted-input check is § 9.2's icon test).
- `build-tools` — unchanged files list; `scripts/build.mjs`, `package.json`, `README.md` change.
- External context: game-icons.net, them → us, untrusted, does not update with the product.
- Failure modes of the parts: decided in the foundation step.
- Not changed (choice C11): the Part fields of `application-build-output/1`, `application-package-layout/1`, `application-build-layout/1` and D-06's Scope; the simulation is browser-config source, but those checks already run on every change of the browser build.
- For planning: the part-map guard rejects a Files pattern that matches no tracked file, so each part-map change lands in the same commit as, or after, the commit that adds its files (`src/browser/sim/**`, `src/browser/view/**`, `assets/icons/**`, `tests/sim/**`, `tests/view/**`, the two invariant test files).

## 11. Foundation entries this task writes (the foundation step writes them, not this spec)

- D-04 new version, "What is the game built with?", with the projected sentences approved 2026-10-13 and Scope `browser-view, build-tools, simulation`.
- "Where does the game's content live?" (new decision).
- Invariants `map-run-repeatability/1` and `simulation-randomness/1`, Method `python -B .the-way/gate/run_tests.py tests/invariants --record .runs/invariant-tests.jsonl`, Part `every`; *Derives from* in the guard's `TODO — <decision, where expected>` form, naming "Where does the simulation's randomness come from?", which task 18 writes (no fingerprint exists yet).
- Glossary terms `program rule`, `map run`, `game minute`.
- The four rows of *Settlements to record*: terrain drawing is a picture, hover the only interaction (decision); restart is a new map run of the same character on the same map (glossary term); a running action is interrupted by neither a program edit nor another rule's condition (decision); a map run the player starts passes at one game minute per real second and can be paused and resumed (decision). The foundation step words this row with "map run" restricted to map runs the player starts (e.g. "A map run the player starts passes …"), keeping the row's meaning; it does not use "manual map run", a projected term task 14 writes, and adds no new glossary term.
- D-03 new version following D-04's new fingerprint (WAY-31).
- Part-map changes of § 10.

The entries this task only realizes in part ("Where does the simulation's randomness come from?", "How does a character act by its program?", "What is a map made of?", "How does a character move?", "How does a program point at things of the world?") are written by tasks 18, 5, 8, 4, 4; this code makes their quoted parts true.

## 12. Choices

| # | Choice | Taken | Alternative rejected | Cost if wrong |
|---|---|---|---|---|
| Q1 | Where the simulation lives | part `simulation`, `src/browser/sim/**`, compiled by the browser config; rule S1 | (b) separate `src/sim` with a third emitting config — breaks the build-layout tests' paths and strains D-06; (c) a check-only `tsconfig.sim.json` — touches build-tools and D-06's "two configurations" for a guard D-04's level-2 verification and review already cover | moving a directory and the part map |
| Q2 | Icons | 4 game-icons.net SVGs (CC BY 3.0) in `assets/icons/`, copied by the build, footer credits from the source | emoji (differ per system); drawn shapes (not a pack) | swapping 4 files and credits |
| Q3 | New seed per send | `mixSeed(lastSeed, realMs)`, pure hash; `INITIAL_SEED` fixed | `crypto` value from the view (an input D-04 does not name); a game-level seed generator (breaks simulation-randomness/1's wording) | one function |
| Q4 | Minimum guarantee | included, from loop `resources.test.ts` | density pass only | seeds without mech or włókno |
| Q5 | Pause | `paused` in the game state via `setPaused`; a new run starts running | pause kept by the view (a view-owned game state) | moving one flag |
| Q6 | No rule applies | wait 1 minute, re-check; „Czeka — żadna reguła nie pasuje” | stand still until the program changes | one branch and a text |
| Q7 | Hidden tab | real time elapsed while the tab was hidden counts, turned into minutes at once, no cap | auto-pause when hidden | one listener |
| Q8 | N of „Tu leży mniej niż” | default 1, 0–50, step 1 (loop `conditions.ts`) | another range | data change |
| Q9 | Screens | program panel left; send panel or status row + terrain panel right; hover both ways | — | layout change |
| C1 | Activity choice timing | at minute 0 and at each finish, in the same minute | choosing in the minute after a finish (a dead minute per action) | timings shift by one minute per action |
| C2 | Neighbour and tie order | tile-list (row-major) order for neighbours, nearest-tile ties and first step | fixed direction order | Wędruj/Idź paths differ per seed; no gameplay difference |
| C3 | Invalid program | `setProgram` throws | silently fix or ignore | an editor bug surfaces as an exception, not a silent change |
| C4 | Tile label in the list | `(col, row)` offset coordinates | axial `(q, r)` as loop | a text change |
| C5 | Resource absent on a tile, in the list | „—” | 0 (hides "never here" vs "used up", which task 4 needs) | a text change |
| C6 | Styles | inline `<style>` in `index.html` | a copied CSS file | moving the styles |
| C7 | Events | six minute-stamped kinds (§ 4.3), unused by the view now | no events (D-04 requires them) | adding or renaming kinds |
| C8 | Generator | mulberry32, one number of state | xoshiro128** (four numbers) | a seed-for-seed change of layouts |
| C9 | Content ids (rule S2, orchestrator's ruling) | map, resource and archetype ids derived from the data files; validation, names and icons read from data; action and condition kinds in code, their labels in data | closed unions in `types.ts` and literals in the view (adding a map or resource would need code changes, the "violates" case of "Where does the game's content live?") | type plumbing in a few signatures |
| C10 | Icon namespace (orchestrator's ruling) | the two exact `xmlns` declarations allowed, every other external reference forbidden | forbid every `http:` (real icons fail; stripping `xmlns` breaks `<img>`) | a test rule |
| C11 | Build invariants' Part and D-06 Scope (orchestrator's ruling) | unchanged | adding `simulation` to them | an extra foundation edit later |
| C12 | Program editor commits (orchestrator's ruling) | on `change`; number rounded and clamped to data, previous value kept when invalid; in-place updates keep focus, structural edits restore it | commit on `input`, rebuild on every edit (focus lost after the first digit) | editor rework |
| C13 | Trust boundary (orchestrator's ruling) | `assets/icons/**` on `browser-view`, checked by the icon test | none (the untrusted files would stand at no part's boundary) | a part-map line |
| C14 | Events of restart and end (orchestrator's ruling) | restart: `mapRunEnded`, then `mapRunStarted`; end: `mapRunEnded` | restart without `mapRunEnded` (contradicts settlement 2) | an event order |

## 13. Out of scope (later tasks)

Gathering, any change of stock, renewal, needs, health, death, backpack, campfire and eating (task 4); rule groups and firing counters (5); discovery and the clock stopping on a discovery (6); faster time, solving Las, the streak (7); a drawn entrance, creatures, attacks, combat, Las — głębiej (8); Płomyk and nature energy (9); practice and skill trees (10); headquarters, team, creating characters and names (11); several player programs and a program copy taken at a run's start (12); trip plan and chest (13); settlement of runs, death's cost, resurrection (14); accounts, saving and every server change (15–21). Also: action icons, scaling the drawing to larger maps, a log of events on screen, and saving anything in the browser.
