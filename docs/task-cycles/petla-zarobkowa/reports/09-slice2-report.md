# Report — Slice 2, the life of a loop in the simulation, task `petla-zarobkowa`

**Status:** done

## Files and commits

Base head `3f99110`. Commits are listed at the end of this file (filled after the commit).

| File | Added / removed |
|---|---|
| `src/browser/sim/loop.ts` (new) | +348 / 0 |
| `src/browser/sim/game.ts` | `programOf` exported and takes skills; `characterAfterDeath` pulled out of `settleDeath`; `send` throws for a character in a loop and clears its `stoppedLoops` entry |
| `src/browser/sim/run.ts` | +2 (`GameEvent` gains `loopRunEnded`) |
| `src/browser/sim/random.ts` | +11 / -1 (fifth stream `next`, `nextSeed`) |
| `tests/sim/loop.test.mjs` (new) | 36 tests, 1047 lines |
| `tests/sim/random.test.mjs` | +4 tests |
| `stryker.config.json` | +1 line |
| `foundations/invariants.md` | `loop-run-knowledge` Method `review` -> `test` |

`saved-game.ts` is not changed.

## Checks (command, exit code)

Red before the code: the code was written first by mistake of order, so the red run was made against
a stub (`startLoop`, `stopLoop`, `advanceLoopRun`, `endLoopRun` returning the state as it came;
`nextSeed` returning 0), then the real code restored:

- `npm test -- tests/sim/loop.test.mjs` on the stub: exit 1, 31 of 35 tests failed (log kept in
  `.runs/scratch-slice2/red-loop.log`).
- `npm test -- tests/sim/random.test.mjs` on the stub `nextSeed`: exit 1, 2 failed (the two `nextSeed` tests).
- On the stub most tests stopped on a TypeError (no loop in the state), not on an assertion. So each
  invariant's test was also seen failing for its assertion by mutating the real code for a moment
  and restoring it (every mutation below: `npm test -- tests/sim/loop.test.mjs` exit 1, restored, exit 0):
  - `trip-transfer`: deposit removed (2 tests fail); the take list ignoring the chest (4).
  - `trip-run-end`: a stop returning carried berries to the chest (1).
  - `death-settled-once`: the end leaving the ended run in the state (7); an uncovered death keeping the loop (2).
  - `map-run-repeatability`: next seed from `Math.random` (4).
  - `loop-run-knowledge`: a pass of minutes adding to the Understanding (7).
  - `saved-program-edit`: the next map run taking the program of the list instead of the loop's content (1).
  - `simulation-inputs`: `stopLoop` writing into `state.stoppedLoops` before copying (2).
  - also: a dead map run paid at a stop (1); the pick not cleared (1); `lastSeed` not written (1); a
    completion not counted (1) or its practice not summed (1); a covered death resetting the loop's
    practice (1); a stop keeping the loop (4); a start allowed for a character in a loop (1) and on
    an unsolved map (fails); the moment not checked (1); the repertoire read from the manual map run's skills (1).

Passing, after the code (all exit 0):

- `npm test -- tests/sim/loop.test.mjs` (36 tests)
- `npm test -- tests/sim/random.test.mjs` (12)
- `npm test -- tests/sim/death.test.mjs` (26)
- `npm test -- tests/sim/saved-game.test.mjs` (25)
- `npm test -- tests/sim/rules.test.mjs` (6)
- `npm test -- tests/invariants/test_simulation_inputs.py`
- `npm test -- tests/invariants/test_simulation_isolation.py`
- `npm test -- tests/invariants/test_simulation_randomness.py`
- `npm test -- tests/quality/test_mutation_test_selection.py`
- `npm test -- tests/quality/test_quality_invariants.py`
- `python -B .the-way/elements/common/foundation_check.py` (0 errors)
- Extra: `npm run typecheck`, `npx prettier --check` and `npx eslint --max-warnings 0` on the changed files (exit 0);
  `node --test tests/sim/*.test.mjs` (588 pass) and `node --test tests/view/*.test.mjs` (260 pass) after `npm run build`.

Not run: the product's gate (`npm test` with no argument), as instructed; StrykerJS (the reviewer's).

## Own-work check

Requirement most likely unmet: "the repertoire is computed from the run's skills, not from
`state.run`" (spec 3) and "a state the simulation makes with a loop loads back at every minute".
Checks written: a test where Ala loops and Ola has the manual map run, with the rank bought by one or
the other, picking `patrol` only by Ala's own rank (fails when `advanceLoopRun` reads the manual
run's skills: seen); and a load of every state over 520 minutes of a map run that lives
(`SURVIVING` program) plus the states through a death, its settling, the next map run, two loops and a
stop. All loaded (`ok: true`, equal to the stamped state). No refusal of `saved-game.ts`, so no
structural mismatch.

## Choices (way rejected, cost if wrong)

- Signatures beyond the spec table: `startLoop` and `stopLoop` and `endLoopRun` return `GameResult`;
  `advanceLoopRun` returns `GameResult & { passed }` (type `LoopAdvance`, exported). `events` of
  `startLoop`, `stopLoop` and `advanceLoopRun` are `[]`; only `endLoopRun` emits one `loopRunEnded`
  `{ kind, characterId }` per end. Rejected: `passed` in a separate value or an events field. Cost: Slice 3 adapts a call site.
- `endLoopRun` checks `nowMs` (safe integer, else RangeError) only when there is an end to take, like
  `settleDeath`; it is not read for a completion's content but is checked for it too. Rejected:
  checking for a death only. Cost: none visible.
- `advanceLoopRun` on a missing loop, an ended map run or 0 minutes returns the very state, `passed: 0`;
  `minutes` that is no whole number from 0 up is a RangeError (as `advanceMinutes`).
- The program of a map run is `programOf` of the run's own skills, recomputed at every `advanceLoopRun`
  call and at every run's start (spec 3).
- `stopLoop` pays the run's practice unless the run ended in death (a state `advanceLoopRun` leaves
  with a death unsettled); a run ended in completion but not yet taken pays its practice too (not
  reachable through the cycle's calls).
- The sum in `stoppedLoops` is the practice as gathered (loop's plus run's); a created character's archetype
  holds every skill, so nothing paid is left out.
- `nextSeed` = the first draw `Math.floor(value * 2^32)` of the generator of the stream `next`
  (constant `0x4e455854`, "NEXT"), which equals the raw uint32 of the draw. Rejected: using the generator's
  state after the draw (a constant shift of the stream state).
- `characterAfterDeath(character, nowMs)` is exported from `game.ts` and returns
  `{ character, resurrectionUsed }`; `settleDeath` uses it. `settleDeath`'s behaviour is unchanged.
- Tests for completions hand-build the last minute (healthy body, streak 479, an exploration ending in
  the next minute), as `tests/sim/completion.test.mjs` does; no program in the tests completes Las
  by itself, as the solving streak of 480 needs no health lost at all.

## Reaches beyond the dispatch

- `foundations/invariants.md`: the `loop-run-knowledge` entry only (in the dispatch's *Change*).
- Read `tests/sim/completion.test.mjs:1-110` and `tests/sim/acceptance.test.mjs` for the last-minute
  setup and the seed that dies of cold at minute 243; `src/browser/sim/understanding.ts` for the
  repertoire; `src/browser/sim/saved-game.ts:860-1260` for what a loop's state must meet at the load. Nothing else.

## Searches not found or unclear

- none. (Unclear: the dispatch says the tests of loop bind where they cover a case; the engine of loop is
  not read, so only the cases listed in the dispatch were taken from their tests.)

## Departures from the plan, and problems

- The order "red before the code" was not kept: the code was written before the tests; compensated as
  recorded above (stub red run and mutation runs). Mismatch of method only.
- `trip.ts` "the clipped take list" in the spec's section 15 is not in this slice's *Change* and was not touched.
- No problem found in the code of earlier slices.

## Commits

- 5791fd7 feat: :sparkles: add the life of an earning loop to the simulation
- aed7f2c feat: :sparkles: add the fifth random stream for the next seed of an earning loop
