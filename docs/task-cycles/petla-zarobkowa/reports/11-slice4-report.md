# Report — Slice 4, The clock drives loops, and the saver follows

**Status:** done

## Commits

- one commit on `task/petla-zarobkowa`, message "feat: :sparkles: drive earning loops from the view's clock, catch up after a load and follow with the saver", address `the owner's address`; worktree clean.

## Files changed

- `src/browser/view/clock.ts` (loop clock, `startLoop(ids)`, `catchUp()`, a reading goes manual run, settling, loops, one `store.apply`; the loop clock takes its value before the hand-over)
- `src/browser/view/game-saver.ts` (option `runPasses`, rhythm checks only when it is true, the too-large sentence of To do 17)
- `src/browser/view/game-view.ts` (`apply` calls `saver.moment()` once for a result holding `loopRunEnded`; `runPasses` predicate; `clock.catchUp()` as the last step of building)
- `tests/view/clock.test.mjs` (+232), `tests/view/game-saver.test.mjs` (+49/-?), `tests/view/account-screen.test.mjs` (+63)
- Total 6 files, about 416 added and 14 removed lines.

## Checks (command, exit code)

- `npm test -- tests/view/clock.test.mjs` 0
- `npm test -- tests/view/game-saver.test.mjs` 0
- `npm test -- tests/view/account-screen.test.mjs` 0
- `npm test -- tests/quality/test_quality_invariants.py` 0 (first run 1: prettier on two test files; ran prettier --write, then 0)
- `npm run typecheck` 0
- Not run: the full gate (`npm test` with no file), as instructed.

## Tests seen failing first

- clock tests: with empty stubs of `startLoop` and `catchUp` on the clock, 6 of the new tests failed by assertion (`npm test -- tests/view/clock.test.mjs`, exit 1); after the code, one test failed from my own mistake (compared by identity against a separately computed state), fixed in the test, then exit 0.
- game-saver tests: the rhythm test and the too-large test failed by assertion before the saver change (exit 1), then passed (exit 0).
- account-screen tests: written after the code was in place (the order slipped), so their red run is by mutation: with `clock.catchUp()` removed from `createGameView` both new tests fail; with `loopEnded` removed from `apply` the first fails (exit 1 each); restored, exit 0.
- Mutation on the clock: the loop clock assigned after `store.apply` makes "minutes of a loop are never passed twice when apply reads the clock again" fail; restored.

## Own-work check

- Requirement most likely missed: "one save per result, and none for a catch-up that ended no run" and "minutes never passed twice". Checks: the two account-screen tests (one `saveGame` call, `awayReport[0].minutes === 1`, no call after 90 s of mocked time and one at hiding) and the nested-flush clock test. They showed the expected values.

## Choices

- `runPasses` is a required option of the saver (a caller cannot forget it); the test helper `saverOf` derives it from the game held. Cost if wrong: another caller of `createGameSaver` must pass it (only `game-view.ts` exists).
- `catchUp()` on the clock is a reading: it sets `moment` to `Date.now()` and calls `onReading`; it does not move the manual run's elapsed measure (`previous`), as the loaded run is paused.
- `startLoop(ids)` on the clock flushes first, as `send` does, and takes the reading's moment for the seed. The view does not call it yet (no control on screen in this slice), so the view does not call `saver.moment()` for it; the slice with the controls must (via `act`-like path).
- A catch-up that ended no run leaves the saver's baseline at the loaded state, so the hidden page and an act send it; the rhythm does not (runPasses false). This is the spec section 10 behaviour.

## Reaches beyond the dispatch

- `src/browser/sim/loop.ts` exports and `src/browser/sim/game.ts` `GameResult` / `loopRunEnded` in `run.ts` (signatures), the existing `tests/view/game-saver.test.mjs` helpers; `package.json` scripts and `git ls-files --eol` for line endings. No guideline file beyond the named ones was read except `guidelines/testing.md` partly (first 60 lines).

## Searches not found or unclear

- none. Note: the handoff says the saver's `moment` option and `withSaveTime` were still to do; they were already in the code (earlier slice), so only the predicate and the sentence were added.

## Problems

- none.
