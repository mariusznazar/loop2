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

