# Design phase A — mag-w-lesie

Skill: superpowers:brainstorming 6.4.1, adapter rules of the cycle (no visual companion; questions go to the orchestrator).

## 1. Classification

**Architectural.** No simulation, map, program or game screen exists: `src/browser/main.ts` makes an empty `<main>`. The task adds a new subsystem (the simulation and its data), a new part on the part map, two invariants with tests, and the first real screens. So: written spec, then a plan.

## 2. Understanding

**What the sources say.** The player sees one ready-made "Mag żywiołów" and the map Las. Las is a 4×4 hex grid with its entrance at `{col:1,row:1}`, a step of 5 minutes, and four resources: patyk 0.7/12/30, jagoda 0.5/8/40, mech 0.4/6/60 and włókno 0.4/6/60. The player writes one program, an ordered list of rules. The actions are Eksploruj (20 min), Wędruj and Idź — <zasób>. The conditions are Zawsze and "Tu leży mniej niż N <zasób>". The player sends the mage. The map run draws its layout from its seed before minute 0. In each free minute the character carries out the first rule whose condition holds and whose action is feasible. The player cannot act by hand.

- Exploring reveals the tile the character stands on and cannot be repeated there. A step is an ordinary action that takes as long as the target tile's step cost. Wędruj prefers an unrevealed neighbour. Idź takes one step toward the nearest revealed tile with stock above 0, measured in minutes of walking. It is not feasible when no such tile exists or when the character already stands on one.
- A program edit takes effect at the next free minute. A running action is never interrupted (settlement 3).
- Time runs at 1 game minute per real second and can be paused and resumed. "Restart" starts a new map run at minute 0 with the same seed and the current program. "Zakończ" ends the run and goes back to sending, and the next send takes a new seed.
- The terrain panel follows concept §5. Stock never changes in this task: there is no gathering and renewal has no visible effect. Nothing is saved, so a reload gives an empty program and no map run.
- **Foundation constraints:**
  - D-04 (projected): the simulation is pure functions of state and a span of game minutes, returning the next state and events. Real time enters only as an argument. The view changes state only through simulation functions.
  - Content lives in data files.
  - D-03: DOM only, with no framework.
  - D-06: two TS configurations.
  - D-07: the server computes nothing.
  - Invariants `map-run-repeatability/1` and `simulation-randomness/1`.
  - `browser-view-framework/1` and `application-build-output/1`. Their tests pin `src/browser → dist/public` and `src/server → dist/server`, and say the built page imports only its own files.
  - The package-layout test fails when one file has two owners on the part map.

**Assumptions (mine).**
- A "known tile" means a revealed tile, and the program sees its true stock (concept §5, open note "doskonała wiedza").
- Hex geometry follows loop's tests: pointy-top hexes, odd rows shifted right, axial `q = col − floor(row/2)`, the first corner straight up, radius 24 px.
- The entrance tile starts unrevealed.

**Success criteria.**
- The game can be played in the browser through items 1–8.
- `npm test` runs the simulation tests in Node with no browser.
- The new invariant tests pass, and all existing guards and tests still pass.

## 3. Questions

**Q1 — Part and files of the simulation (carried question).**
- Options:
  - (a) A new part `simulation` owning `src/browser/sim/**`, with data in `src/browser/sim/data/`. The browser config compiles it to `dist/public/sim/`. `browser-view` Files are narrowed to `src/browser/*.ts`, `src/browser/index.html` and `src/browser/view/**`, so no file has two owners.
  - (b) A separate `src/sim` with a third emitting tsconfig or project references.
  - (c) Option (a) plus a check-only `tsconfig.sim.json` (`lib: ["ES2022"]`, `types: []`, `noEmit`) over the sim files, run by `typecheck` and `build`.
- **Recommendation: (c).**
- Evidence: under (b), changing the browser rootDir to `src` moves `main.js` and breaks `test_application_build_output.py` (its emitted-path rule) and `index.html`. That is an invariant-test change. A third emitting config also strains D-06's "both configurations". Option (c) leaves the emit layout alone and still stops the sim, at compile time, from using DOM or Node.
- `simulation-randomness/1` then covers every file of the part `simulation`. The new part depends on nothing, and `browser-view` depends on `simulation`.
- Cost if wrong: moving a directory later, plus rewriting the part map.

**Q2 — Icons (carried question).**
- Recommendation:
  - Use game-icons.net SVGs (CC BY 3.0, which allows commercial use with credit), with the names loop's data uses: `wood-stick`, `berry-bush`, `fern`, `flax`.
  - Resource icons only. Actions stay as text: no screen in this task needs action icons.
  - Keep the sources in `assets/icons/` (outside `dist/public`). `scripts/build.mjs` copies them to `dist/public/icons/`, and the page draws them with `<img>`/`<image>`, so no SVG script runs.
  - Put a line in the game's footer crediting each icon's author.
- No npm package, so `package-lock.json` is untouched.
- The implementer must take each icon's author and the source commit from the source, not from memory. The SVGs are external input and must be checked for scripts.
- Options rejected: emoji (they look different on every system, which is not the concept's "packs"); hand-drawn shapes (not a pack).
- Cost if wrong: swapping 4 files and the footer.

**Q3 — Where a new seed comes from on each send.**
- Options:
  - (a) Send passes the real time of the send. The sim mixes it with the previous seed, `seed = mix(prevSeed, realMs)`.
  - (b) The view draws `crypto.getRandomValues` and passes it with the send.
  - (c) A game-level seed generator in the state, seeded once.
- **Recommendation: (a).** D-04 lets the view pass only "player's choices and the passing of real time", and (a) uses only those. `newGame()` stays fully deterministic. `simulation-randomness/1` holds, because no draw comes from anywhere but the run's generators.
- Option (b) adds a third kind of view input that D-04 does not name. Option (c) breaks the literal `simulation-randomness/1`: the generator would not be seeded from the map run's state.
- Cost if wrong: one function. Task 16 also inherits no generator to save.

**Q4 — Minimum guarantee.** Loop's `resources.test.ts` requires every resource with density above 0 to lie on at least one tile, for every seed. The task document does not mention it.
- Recommendation: include it. After the density pass, any resource missing from the map gets one tile drawn from the layout generator, in the map's resource order.
- Cost if left out: some seeds have no włókno or mech, and tasks 4 and 6 would meet that later.

**Q5 — Pause in the game state or in the view.**
- Recommendation: a `paused` field in the game state, changed through a simulation function. Task 6 has the simulation stop time itself when something is discovered. D-04 forbids a view-owned game state.
- A new map run (send or Restart) starts running.

**Q6 — No rule applies (also the empty program).**
- Recommendation: the character waits one game minute and the program is evaluated again next minute. The status row shows „Czeka — żadna reguła nie pasuje”.
- Cost if wrong: one line of text and one branch.

**Q7 — Real time while the tab is hidden.**
- Recommendation: it counts. The view passes the elapsed real time and the simulation catches up those minutes; a 4×4 map is cheap.
- Alternative: pause automatically when the tab is hidden. That is not requested and would conflict with task 6's own stopping of time.

**Q8 — The N of "Tu leży mniej niż".**
- Recommendation: copy loop's `conditions.ts` data: default 1, range 0–50, step 1.

**Q9 — The screen before the first send.**
- Recommendation: the program panel on the left. The terrain panel's place holds the send control: „Mag żywiołów”, map „Las”, button „Wyślij”. Above the terrain panel during a run, the row reads „Minuta N · <akcja>” with the pause/resume, „Restart” and „Zakończ” buttons.
- Hover links both ways, tile ↔ list row. Hover state is view-local, not game state.

**Answered by sources (not asked):**
- The action/condition set, the resources and their numbers, the 1 min/s pace, Restart and Zakończ, no saving, and the panel's contents: task.md, "Questions to settle".
- Hex geometry: loop's `terrain.test.ts`.
- Wędruj and Idź behaviour: loop's `movement.test.ts`, as the task's Context quotes.
- Restart is a new map run: settlement 2.

## 4. Approaches

**A (recommended) — a pure simulation inside the browser source.**
- `src/browser/sim/` holds the following. Each is a pure function returning `{ state, events }`, and the editor passes whole edited programs (the D-04 "complies" example).
  - `hex.ts`: offset↔axial conversion, neighbours, minutes-of-walking search for the nearest tile, centres and corners.
  - `random.ts`: a 32-bit generator such as mulberry32 whose state is a JSON number, with one stream per kind: `layout` and `wander`, each derived from the seed.
  - `layout.ts`: tiles in row-major order, each resource in the map's list order, one draw per pair, then the minimum guarantee.
  - `program.ts`: rule selection and feasibility, with no draws.
  - `run.ts`: actions, the minute loop and `advanceMinutes(state, n)`.
  - `game.ts`: `newGame`, `setProgram`, `send(realMs)`, `restart`, `end`, `setPaused`, and `passRealTime(state, realMs)`, which keeps the millisecond remainder in the state.
  - `data/`: maps, items, actions, conditions, archetypes and balance.
- `src/browser/view/` holds DOM/SVG drawing and a pure `terrainPicture(state)` that turns state into fills, icons and outlines. Node can test it.
- Tests:
  - `tests/sim/*.test.mjs` with node:test on `dist/public/sim/`, added to `npm test`.
  - `tests/invariants/test_map_run_repeatability.py`: two runs with the same inputs give identical states minute by minute, and a different seed gives a different layout as a control.
  - `tests/invariants/test_simulation_randomness.py`: a static scan of the sim files for `Math.random`/`crypto`, plus a run with those stubbed to throw.
- Trade-off: the smallest build change and the frozen build tests stay as they are. Sim purity rests on the check config and the invariant tests, not on the compiler layout.

**B — a separately compiled simulation (`src/sim`, a third emitting config or project references).**
- The compiler keeps the sim apart from the view and the DOM.
- But: browser imports cross the rootDir, the build grows to `tsc -b`, D-06 says "both configurations", and the frozen build-layout tests would need review.
- Too heavy for the gain.

**C — A, but with one input reducer `apply(state, input)`.** Inputs are `{program}`, `{send, realMs}`, `{realTime, ms}`, and so on.
- Replay becomes trivial for the repeatability test.
- It still needs `advanceMinutes` to satisfy D-04's "span of game minutes", and it adds indirection the view does not need.
- Choose it only if the orchestrator wants replay logs now. Task 16 or 18 can add a log later.

**Recommendation: A with the Q1(c) check config.**

**Notes for the foundation step:**
- The projected D-04 has `Scope: TODO`. The scope becomes browser-view, build-tools and simulation.
- README "Strona ma być pusta" is now false and must change (build-tools part).
- Neither note is a design question.
