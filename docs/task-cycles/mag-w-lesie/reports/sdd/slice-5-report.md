# Slice 5 report — game functions, time flow and the simulation's code rules

Status: DONE · Commit: `64c522d` feat(sim): add the game functions, time flow and checks of simulation code rules S1 and S2 (branch `task/mag-w-lesie`)

## Implemented

`src/browser/sim/game.ts` (spec § 4.3), every function pure, returning `{ state, events }` (`newGame` the state alone); `GameEvent` re-exported from `run.ts`, plus `GameResult` type.

- `newGame()` — empty program, `run: null`, `lastSeed: INITIAL_SEED`, `paused: false`, `realMsCarry: 0`.
- `setProgram(state, program)` — validates against the closed list (§ 4.5) and stores a **copy built from the closed list** (so later changes of the caller's object do not reach the state); resources allowed: with a run, the run's map's `resources` list in `MAPS`; without, the union of all maps' lists; `hereBelow.value` an integer in `CONDITIONS.hereBelow` [min, max]; empty program valid; throws `Error` otherwise; never touches `run`.
- `send(state, { mapId, archetypeId }, realMs)` — throws with a run present or on ids that are not own keys of `MAPS` / `ARCHETYPES` (`Object.hasOwn`, so `toString`/`__proto__` are refused); `seed = mixSeed(lastSeed, realMs)`, `lastSeed = seed`, `paused: false`, `realMsCarry: 0`; events `mapRunStarted {seed}` then the `activityStarted` of `newMapRun`.
- `restart(state)` — throws without a run; new run of the same map, archetype and `run.seed` with the current program; `paused: false`, `realMsCarry: 0`, `lastSeed` unchanged; events `mapRunEnded`, `mapRunStarted`, `activityStarted`.
- `end(state)` — throws without a run; `run: null`, `paused: false`, `realMsCarry: 0`; program and `lastSeed` kept; event `mapRunEnded`.
- `setPaused(state, paused)` — no-op without a run.
- `passRealTime(state, realMs)` — ignored with no run, paused, or `realMs` not a finite number > 0 (non-numbers included); `total = carry + realMs × gameMinutesPerRealSecond`, `minutes = floor(total / 1000)`, carry = rest; then `advanceMinutes`.
- `advanceMinutes(state, minutes)` — repeats `stepMinute` with the current program; works while paused; no-op without a run or with 0.

## Autonomous choice (not settled by spec or orchestrator)

- `advanceMinutes` throws `RangeError` when `minutes` is not a non-negative integer (negative, fractional, NaN, Infinity, non-number). The spec says only "repeats the minute step `minutes` times"; `Infinity` would loop forever and a fraction has no meaning, so I treated it as a programming error like § 8's other throws. Cost if wrong: swap the throw for a no-op in one line and its test.

## Tests and results

New/changed files: `tests/sim/time.test.mjs` (13), `tests/sim/flow.test.mjs` (9), `tests/sim/purity.test.mjs` (3), `tests/sim/rules.test.mjs` (5), `tests/sim/data.test.mjs` (+6 validation cases; the new cases import `game.js` dynamically so the existing data tests stay runnable on their own).

- time: 1000 ms → 1 minute; carry across calls (400/599/1/2500); paused → state and events unchanged, carry included; resume continues; 3 600 000 ms → 3600 minutes at once; 1000 ms once = 1000 × 1 ms (state and events); ignored 0, negative, NaN, ±Infinity, string, undefined; no run ignored; events of a covered span in order; `advanceMinutes` while paused; 0 minutes no-op; invalid spans throw; `advanceMinutes`/`setPaused` without run no-op.
- flow: `newGame` shape; send seed = `mixSeed(INITIAL_SEED, realMs)` and the exact two events; send with a run refused; program edit at minute 5 during the 20-minute explore leaves `current` unchanged minutes 5–19, applies at 20 (wander by rule 0); Restart → minute 0, same seed and tiles, current program, `paused: false`, carry 0, `lastSeed` kept, events `mapRunEnded`, `mapRunStarted {seed}`, `activityStarted`; Restart with the starting program equals the sent state; Zakończ exact state and `[mapRunEnded]`; next send with later `realMs` → new seed `mixSeed(previous, later)`; restart/end without run throw.
- purity: every public function called on deep-frozen inputs (writes would throw) and inputs deep-equal a JSON copy taken before; the stored program does not follow later mutation of the passed object; a mid-run state is plain JSON.
- data (validation): every resource of the map data list accepted in `hereBelow` and `walkTo`, with and without a run; empty program, explore/wander, min and max accepted; resources `granite`, `toString`, `''`, undefined refused with and without a run; unknown kinds, null/`{}`/non-array rules, missing action, value min−1, max+1, 1.5, `'3'`, NaN refused; a refused program leaves the game unchanged; send refuses `nowhere`, `toString`, `knight`, `__proto__`, undefined ids.
- rules: S1 scan of `src/browser/sim/**` (comments removed; string, template text and regex contents removed, with import specifiers kept through markers) — only relative specifiers resolving inside `sim/`, no dynamic import of a computed name, none of `document`, `window`, `navigator`, `localStorage`, `sessionStorage`, `indexedDB`, `requestAnimationFrame`, `cancelAnimationFrame`, `fetch`, `XMLHttpRequest`, `WebSocket`, `globalThis`, `process`, `Buffer`, `require`, `__dirname`, `__filename`, `global`, timers (`setTimeout`, `setInterval`, `setImmediate`, the `clear*`s, `queueMicrotask`), `Date`, `performance`, `crypto`, `Math.random`/`Math[`; property accesses (`x.date`) are not flagged. S2 scan of `sim/**` outside `sim/data/` plus `view/**` (zero view files today → passes, a missing directory gives `[]`): no string/template literal equal to a map, resource or archetype id or name, and no identifier token equal to such an id (catches `MAPS.forest`), all read from the built data modules. Both scans have control tests with made-up sources (each forbidden form flagged; same names in comments/strings/regex/property access not flagged).

Commands and results:
- `npm run typecheck` — exit 0, no output from tsc.
- `npm test` — before the slice 67 tests; after: `ℹ tests 103 · pass 103 · fail 0`.

## TDD evidence

RED — after writing the five test files, before `game.ts` existed (`npm run build` then `node --test tests/sim/time.test.mjs tests/sim/flow.test.mjs tests/sim/purity.test.mjs tests/sim/rules.test.mjs tests/sim/data.test.mjs`):

```
✖ setProgram accepts every resource of the map data list, in conditions and in walks
✖ setProgram accepts the empty program, both actions without a resource and the ends of the range
✖ setProgram rejects a resource id outside the map data list
✖ setProgram rejects kinds outside the closed list and values outside the data range
✖ a refused program leaves the game unchanged
✖ send rejects a map or an archetype id not in the data
Error [ERR_MODULE_NOT_FOUND]: Cannot find module '...\dist\public\sim\game.js' imported from ...\tests\sim\flow.test.mjs
✖ tests\sim\flow.test.mjs
✖ tests\sim\purity.test.mjs
✖ tests\sim\time.test.mjs
ℹ tests 19 · pass 10 · fail 9
```

The rules tests passed at once because they scan code that already obeys S1/S2. To show the real-file scans can fail, a temporary probe `src/browser/sim/zz-probe.ts` (`Date.now()`, `'forest'`, `import … from '../view/app.js'`) was written, the rules test run, and the probe deleted (never committed):

```
✖ S1: ... actual: [ 'src/browser/sim/zz-probe.ts imports ../view/app.js', 'src/browser/sim/zz-probe.ts names Date' ]
✖ S2: ... actual: [ 'src\\browser\\sim\\zz-probe.ts holds the literal "forest"' ]
ℹ pass 3 · fail 2
```

GREEN — after `game.ts`: first full `npm test` showed `tests 103 · pass 102 · fail 1`; the failure was my test's mistake (`advanceMinutes(…, 25)` with an explore-only program expects one finish, but after minute 20 the character waits minute by minute, so five more wait events are correct per § 4.5). I changed the test to 20 minutes (code unchanged); then `ℹ tests 103 · pass 103 · fail 0`.

## Invariant gate

`python -B .the-way/gate/run_tests.py tests/invariants --record .runs/invariant-tests.jsonl` — `Ran 44 tests in 63.718s — OK`, exit 0. Per check file (from the record):

| File | Result |
|---|---|
| test_account_server_express_http.py | 7 pass |
| test_account_server_occupied_address.py | 1 pass |
| test_account_server_runtime.py | 5 pass |
| test_account_server_typecheck.py | 3 pass |
| test_action_in_progress.py | 2 pass |
| test_application_build_output.py | 5 pass |
| test_application_package_layout.py | 1 pass |
| test_browser_view_framework.py | 6 pass |
| test_loop2_api_error_route.py | 2 pass |
| test_loop2_one_serving_process.py | 5 pass |
| test_map_run_repeatability.py | 3 pass |
| test_player_map_run_pace.py | 2 pass |
| test_simulation_randomness.py | 4 pass |

No invariant check was edited. Not run in this slice: format guards of the foundation files (no foundation file changed).

## Files changed

- `src/browser/sim/game.ts` (new)
- `tests/sim/time.test.mjs`, `tests/sim/flow.test.mjs`, `tests/sim/purity.test.mjs`, `tests/sim/rules.test.mjs` (new)
- `tests/sim/data.test.mjs` (validation cases appended)

## Self-review

- Purity: every function builds new objects with spreads; `setProgram` stores a rebuilt program; `passRealTime`/`setPaused` return the same state reference when ignored (no mutation). Checked by the frozen-input test and by the invariant checks' two-process comparison.
- S1/S2: `game.ts` imports only `./data/*`, `./random.js`, `./run.js`, `./types.js`; no ids or names written (ids read through `Object.hasOwn`, `MAPS[run.mapId]`, `Object.values(MAPS)`).
- Error messages are English (programming errors, never shown to the player).
- Floating carry: `333.5 + 666.5` sums exactly; inputs whose sum is not exact in binary floating point may leave a carry like 999.9999 — spec states "for integer inputs" only.

## Concerns

- The `advanceMinutes` `RangeError` on a non-whole or negative span is my choice (see above).
- `send` does not validate `realMs` (spec does not ask); a non-number gives some uint32 seed through `mixSeed`'s coercion rather than an error.
- The S2 identifier scan (no identifier token equal to a content id, e.g. a local variable named after a resource id) is stricter than "literal" in the spec's wording; a future view variable named like an id would fail it.
- Git warns the new files' LF will become CRLF in the working copy (repo's autocrlf); same as earlier slices.
