# Slice 1 report

Implemented: `src/browser/sim/types.ts`, `sim/data/{maps,resources,actions,conditions,archetypes,balance}.ts`, `tests/sim/data.test.mjs`, `package.json` test script (adds `"tests/sim/*.test.mjs"`).
Export names: MAPS, RESOURCES, ACTIONS, CONDITIONS, ARCHETYPES, BALANCE (`gameMinutesPerRealSecond`, `waitMinutes`), INITIAL_SEED. Id types (MapId, ResourceId, ArchetypeId) derive from the data and are re-exported by types.ts. Numbers confirmed against loop's maps.ts, activities.ts, conditions.ts, items.ts (hereBelow range per spec Q8).

TDD: RED `npm test` -> tests/sim/data.test.mjs failed with ERR_MODULE_NOT_FOUND for dist/public/sim/data/maps.js (module missing, expected); suite 6 tests, 5 pass, 1 fail.
GREEN `npm test` -> 10 tests, 10 pass, 0 fail (5 new). `npm run typecheck` clean.
Invariants: 9 failures, all in test_simulation_randomness / test_action_in_progress / test_player_map_run_pace / map_run_repeatability (no built sim/game.js; expected until Slice 5). Others pass.

Commit: f1c57cc feat(sim): add content data and state types for the map Las.
Self-review: no concerns; BALANCE is an object (spec lists the keys, not the shape). Git warns of LF->CRLF only.
