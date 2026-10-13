# Invariant checks — mag-w-lesie

Commit `bb6b8fb` on `task/mag-w-lesie` — `test(invariants): add checks for the mag-w-lesie invariants` (four files, nothing else; not pushed).

Written from: the sentences in `foundations/invariants.md`, D-10/D-11/D-12 in `foundations/decisions.md`, `.the-way/elements/invariants/template.md`, spec § 4.1, 4.2 (data numbers only), 4.3, 4.5, 4.6 and § 9.3. § 4.4 (randomness and layout) was not read. No product code exists yet; none was read or written.

All four drive the built `dist/public/sim/game.js` from `support.built_copy()` through a Node `.mjs` driver written to a temp directory (steps as JSON in, records as JSON out). Map `forest`, archetype `elementalMage`, `send` real times T = 1760000000000 and T_OTHER = 1760000123456.

## Checks

| File | What it runs | Control |
|---|---|---|
| `tests/invariants/test_map_run_repeatability.py` | P1 (every condition and action) → send(T) → 625 inputs: 1000 ms ×200, setProgram(P2), ×100, pause, 1000 ms ×5 while paused, resume, 250 ms ×4, ×320 (621 minutes). Whole state and events recorded after each input. (a) Two separate Node processes must match input by input. (b) Replay: setProgram(P1), restart, the same inputs; the replay must equal the first run from minute 0 (the restart's run equals the send's, and the restart's events end with the send's events). | send(T_OTHER) gives a different `tiles` layout; the scenario reaches minute ≥ 600, reveals > 1 tile, puts the character on > 1 tile. |
| `tests/invariants/test_simulation_randomness.py` | Static: tracked `src/browser/sim/**`, with comments, strings, template text and regex removed, names none of `Math.random`, `Math?.random`, `Math[`, `crypto`, `getRandomValues`, `randomUUID`; no string literal `crypto` / `node:crypto`; no file but `random.ts` holds `0x6D2B79F5` / `1831565813`. Dynamic: Math.random, globalThis.crypto.{getRandomValues,randomUUID}, node:crypto random functions (via `syncBuiltinESMExports`) are replaced with counting throwers; each is shown to fire on a direct call (11 proofs); every `dist/public/sim/**` module is imported; send, 2260 minutes (wander-only, then a mixed program), restart, end, second send; no exception, zero calls. | Scanner flags 12 made-up forbidden forms and not a made-up clean file. Wander-only paths over 200 minutes: same T twice → same path; T vs T_OTHER → different paths. |
| `tests/invariants/test_action_in_progress.py` | PA = [stick < 0 → wander, always → explore]: explore by rule 1, minutes 0–20. At minute 5 PA_HOLDS (stick < 50: rule 0's condition now holds). Minutes 1–19: `current` unchanged, entrance (col 1, row 1; axial {q:1,r:1}) unrevealed, character on it. Minute 20: revealed; wander by rule 0, 20–25, stepTo set. At minute 22 PC = [always → explore, always → wander]. Minutes 21–24: step unchanged, character on the entrance. Minute 25: character on stepTo; explore by rule 0, 25–45. | PA_HOLDS from the start → wander by rule 0, 0–5 at minute 0. PA kept → wait 20–21 at minute 20. PA_HOLDS kept → wander by rule 0, 25–30 at minute 25. |
| `tests/invariants/test_player_map_run_pace.py` | 38 inputs, expected minute written beside each: whole seconds, 500+499+1, 250 ×4, 333.5+666.5, 1500 carrying 500; paused 1000/60000/500 → no minute and no carry (resume +499 → 9, +1 → 10); 3 600 000 ms → 3610; second pause; restart with 500 ms carried → 600 ms gives 0, +400 → 1; end, send(T_OTHER) with 700 ms carried before end → 300 → 0, 700 → 1, 5000 → 6. `paused` checked after each setPaused. | The same 13-input prefix, then the paused leg's inputs without pausing → minutes 10, 70, 71. |

## Gate run (once, after the commit)

`python -B .the-way/gate/run_tests.py tests/invariants --record .runs/invariant-tests.jsonl` → exit 1, 42 tests, failures=10, errors=1.

- New checks, all failing for the missing build output: map-run-repeatability (3 tests), simulation-randomness (3 of 4), action-in-progress (2), player-map-run-pace (2). Failure lines:
  - `AssertionError: \`npm run build\` placed no dist/public/sim/game.js, so the simulation cannot be driven` (9 tests)
  - `AssertionError: [] is not true : the working tree holds no file under src/browser/sim/, so the simulation's source cannot be scanned` (static randomness test)
  - The scanner control (`test_control_the_scan_flags_each_forbidden_form`) passes: it needs no product code. The invariant is still `fail`.
- Existing checks: all pass except `test_loop2_api_error_route` — `ERROR: setUpClass … AssertionError: port 3000 on 127.0.0.1 is already in use before the server starts`. That is outside these four files, which start no server. The checks before it (express_http, occupied_address) and after it (one_serving_process) started and stopped servers on 3000 without trouble. A rerun of that module alone (`python -B -m unittest test_loop2_api_error_route`, not the gate) gave OK. Afterwards nothing was listening on 3000. Most likely something else in the environment held the port for a while, for example a parallel run in another worktree.

## Questions

1. action-in-progress: in this task's world a condition changes only through the program or when an action ends. So "the condition of another rule comes to hold" is produced by raising that rule's `hereBelow` value with `setProgram`. Is that reading accepted, or should a later task add a scenario where a condition comes to hold without a program change?
2. simulation-randomness: the spec's static method strips string literals and still lists `node:crypto`. That name can only appear inside a string. The check therefore flags string literals equal to `crypto` / `node:crypto` (module specifiers) and adds `Math[`, which catches `Math['random']`. Please confirm that this goes beyond § 9.3 in an acceptable way.
3. player-map-run-pace: the check reads the sentence as "real time passed to an earlier map run counts for none of a later one" (carry after restart, end and send) and as "paused time does not add to the carried part of a second". Both are written as expected minutes. If either reading is not wanted, those rows have to change.
4. The checks use the data ids `forest`, `elementalMage`, `stick`, `berry`, `fiber` and the numbers from spec § 4.2 (20-minute exploration, 5-minute step, entrance (1,1)) as written-out inputs and expected values.
