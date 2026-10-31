# Report — Slice 1, a manual run of a solved map neither pays nor takes

**Status:** done

**Commit:** `16f8bee` on `task/rozliczenie-przejsc` (address mariusznn@gmail.com). Worktree clean.

## Files changed (added/removed lines, whole commit: 438 / 60)

- `src/browser/sim/types.ts` — `GameMapRun.solvedMapRun: boolean` (+7 -1)
- `src/browser/sim/trip.ts` — `takeFromNowhere(plan, capacity, map)`; `tripLoot` returns `[]` for a marked run (+26 -2)
- `src/browser/sim/game.ts` — `startRun` binds the mark from `solvedMaps` and calls `takeFromNowhere` (chest untouched) on a marked run; `advanceMinutes` carries the mark in `endedRun` and calls `paidPractice` only for an unmarked run (+~35 -~23, part is Prettier re-indent)
- `src/browser/sim/saved-game.ts` — `SAVED_GAME_VERSION = 2`; reads `solvedMapRun` strictly; `solvedMaps` read before the run (`Records.solved`); rows of decision 9 (+~26 -~5)
- `tests/sim/trip.test.mjs` (+~190), `tests/sim/skills.test.mjs` (+3 -1), `tests/sim/saved-game.test.mjs` (+~150 -~26)

## Checks (command, exit code)

- Failing run first (new trip tests, with `takeFromNowhere` as an empty stub and the old game code): `npm test -- tests/sim/trip.test.mjs` exit 1, 8 failed / 14 passed. The first attempt without the stub stopped on the missing export, so it was not counted as a failure. The death case and the "started before another character solved the map" case pass on the old code, as they pin behaviour that was already right.
- `npm test -- tests/sim/trip.test.mjs` 0 (22 pass)
- `npm test -- tests/sim/skills.test.mjs` 0 (18 pass)
- `npm test -- tests/sim/saved-game.test.mjs` 0 (16 pass)
- `npm test -- tests/sim/completion.test.mjs` 0
- `npm test -- tests/view/trip.test.mjs` 0
- `npm run typecheck` 0 · `npm run build` 0
- `npm test -- tests/invariants/test_restart_seed.py` 0 · `test_simulation_inputs.py` 0 · `test_map_run_repeatability.py` 0
- `python -B .the-way/elements/common/foundation_check.py` 0 ("0 errors")
- Also `prettier --check` and `eslint --max-warnings 0` on the seven changed files: clean (not in the plan's list).
- Not run: the full gate `npm test` without argument (the orchestrator's).

## Invariant tests seen failing (save-version, solved-map-manual-run)

- Mutation 1: removed the line that checks the mark against `solvedMaps` and the line that refuses a non-empty deposit on a marked completion; `npm test -- tests/sim/saved-game.test.mjs` exit 1, `a crafted document of the current version is refused whole as shape` failed on "a mark set on a map run whose map is not solved". Restored.
- Mutation 2: only the marked-deposit line removed; same command exit 1, failed on "a deposit at the completion of a marked run". Restored.
- Mutation 3: `game.ts` pays practice for a marked run again; `npm test -- tests/sim/trip.test.mjs` exit 1, failed "completing a manual run of a solved map pays no practice…". Restored. Final run of all three files after the restore: exit 0.

## Own-work check (section 3)

Requirement most likely missed: To do 3 and Q2 — the decision is the map's state at the start, also for the restart after the completion that solved the map, and the mark is carried to the end of the run (not re-read at the completion).
Check: test "a run records at its start whether its map was solved, and a restart after the solving completion records it anew" (unmarked run completes, mark stays false, solvedMaps gains `forest`, `restart` gives a marked run, chest equal) and "a run started before another character solved the map still pays practice and deposits" (mark false, `solvedMaps` holds the map, completion pays 7 practice and deposits). Both pass; the carrying of the mark through the saved document is in the round-trip table of `saved-game.test.mjs` (marked run, marked completion with `[]`, restart after the solving completion).

## Expectations changed (each with its requirement, per `guidelines/testing.md`, Changing an existing test)

- `tests/sim/trip.test.mjs` first test (restart after completion): chest berry 6 → 9 — To do 3, 5 (the restart follows the completion that solved forest, so it takes from nowhere).
- `tests/sim/trip.test.mjs` "switching programs retains the entry snapshot…": chest stick 2 → 10 after the start, and the completion's deposit `[berry 7, stick 8]` → `[]`, chest stays 10 — To do 5 and To do 2 (its run starts on a solved map). Added the check that the backpack still holds 8 sticks. The frozen `bringPlan` check stays.
- `tests/sim/trip.test.mjs` "unlisted and clipped contents…": renamed (ends "…subsequent run that takes from the chest"), keeps marker `trip-run-end`. The later run is now `send` to `forestDeep` (unsolved, so it takes from the chest) after `end(finished)`, instead of `restart(finished)`, which no longer takes from the chest — To do 3, 5. The expected backpack and chest values are the same as before. I added `next.run.solvedMapRun === false`.
- `tests/sim/skills.test.mjs` "completion pays this minute's practice…": renamed to "…of a run begun before its map was solved…" — To do 2 (its run holds no mark, so it still pays); expectations unchanged; comment names loop `skills.test.ts:470-480`.
- `tests/sim/saved-game.test.mjs`: the old document stays as `DOCUMENT_V1` (version 1, unchanged) with a new test refusing it as `version`. `DOCUMENT` is version 2 (V1 plus `solvedMapRun: false` on its run on `forestDeep`); `HEADQUARTERS` version 2; the server save case uses version 2 and the other version 3; `[0, 2, -1]` → `[0, 3, -1]`; "version 2 of another shape" and "version 2 with an archetype absent" → 3. The completion of the "ended" case and the five crafted completions add the run's map to `solvedMaps` through the helper `solvingItsMap`, so each stays admitted or refused for the reason its name gives.
- New `CRAFTED` rows under `// invariant: save-version`: mark missing, as text, 0, null; mark set on an unsolved map; mark unset on a solved map with no completion; completion of a map absent from `solvedMaps`; non-empty deposit on a marked completion; marked completion without deposit. Positive cases: marked run, marked completion with `[]`, unmarked first completion.

## New tests (marker `solved-map-manual-run` unless noted), loop sources in each case

takeFromNowhere run (loop `chest.test.ts:316-338`), `takeFromNowhere` unit (same lines), mark at start and restart (`chest.test.ts:358-367`), marked completion pays nothing / deposits `[]` / practice stays with the run (`chest.test.ts:407-419`, `skills.test.ts:454-468`), run begun before another solved the map (`skills.test.ts:470-480`), empty preview of a marked run (`chest.test.ts:407-419`), death on a marked run (`trip-run-end`; To do 14, D-61, D-190, Q1 — no loop test cited, I read none for this case).

## Reaches beyond the dispatch

- `tests/sim/skills.test.mjs:1-60` and `:500-632` (helpers and neighbouring cases), to change the one test at `:537` safely. Reading only.
- `src/browser/sim/data/maps.ts` grep (`opensAfter`, `carryIn`): to choose `forestDeep` as the unsolved map for the `trip-run-end` case. Reading only.
- Not read whole: `foundations/*` ranges and the guideline file `guidelines/coding-simulation-module.md` etc. were read; the foundation ranges of the handoff were not opened by me (the handoff carries the task and spec passages word for word, and I worked from them). If a foundation row disagrees with the handoff text, the review should catch it.

## Choices

- `takeFromNowhere` returns the `Backpack` only (no chest), as the spec's wording "calls it … leaves the chest as it is" allows; the spec's signature `(plan, capacity, map)` is kept. Rejected: returning `{chest, backpack}` — it would hand back a chest to be dropped.
- The stock for `clipTrip` in `takeFromNowhere` is built from the take list's own counts, as the spec says; it clips by the smaller of capacity and `map.carryIn`.
- Mark check in the load: a run without a completion requires `solvedMapRun === solvedMaps.includes(map)`; a run with a completion requires the map in `solvedMaps` and any mark; a marked completion requires `deposited` to be `[]` (an unmarked completion with `[]` is admitted — the bring list may be empty or clipped to nothing). Cost if wrong: task 18 relaxes the equality for earning-loop runs (spec decision 9 already says so).
- No invariant test was changed in its assertion; only the three expectations above.

## Mismatch with the handoff / plan

- The handoff says "do not run `npm test` with no file argument"; I did not. No other mismatch. The plan's Checks list `npm test -- tests/invariants/*.py` — run as given.

## Problems and open points

- Tests outside this slice that build a `GameMapRun` by hand without `solvedMapRun` were not changed; `tripLoot` and the advance treat the missing key as an unmarked run, and `tests/view/trip.test.mjs` passes. The full gate (the orchestrator's) will show any other.
- Comment of `advanceMinutes` in `game.ts` wraps awkwardly after my edit (`…nothing; where that minute is` on its own line); content correct, only line shape.

## Searches not found or unclear

none
