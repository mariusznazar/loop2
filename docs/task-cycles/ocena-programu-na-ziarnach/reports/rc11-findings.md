# Findings of review rc11 (correction 1, slice 1, range `4d813606..730863c3`) — blocking, in the reviewer's words

From `reports/review-rc11-report.md`, first line `FAIL 730863c3`. The finding comes from slice 1.

### Important

**1. `newGame` stores any number as the moment the game was made, so the simulation can make a game state that its own load refuses**

- Place: `src/browser/sim/game.ts:385` (`export function newGame(madeAtMs = 0): GameState`) and `:421` (`madeAtMs,`).
- What is wrong: the strict load reads `madeAtMs` with `integer` (`src/browser/sim/saved-game.ts:1431`) and refuses any value that is not a safe integer. `newGame` takes the moment with no check and stores it as given. A game made with `newGame(1.5)`, `newGame(NaN)`, `newGame(Infinity)` or `newGame(2 ** 53)` is saved without complaint and refused as `shape` at the next load. D-206 then discards it and the player starts again.
- Why it matters: D-386 opens with „The load of a saved game state admits every game state the game's own functions make, so the game never writes a saved game state that its own load discards.” Its *Rationale* gives the means: „The moment a function stores is checked where it enters the game state, because a number the load would refuse must never reach a document.” Every other function that stores a real moment follows this: `withSaveTime` (`game.ts:778-783`), `momentAfter` (`game.ts:88-95`), the death settlements (`game.ts:698-705`, `:732-739`) and the loop functions (`loop.ts:410-445`, `:456`) all throw a `RangeError` on a moment that is not a safe integer. `newGame` is the one new entry point of a real moment, and it skips the check. Today only tests and the default 0 call it. In Slice 8 the page passes the clock's reading on three paths, where a fractional reading (a `performance.now()`-style value, or a computed moment) would type-check as `number`. It would cost the player the whole save one load later, with nothing visible at the moment the game is made. The plan says „`newGame` takes it as an optional argument and stores it”. That is the shape the plan asks for, and it is still a defect against D-386.
- Evidence: the review probe `reports/review-rc11-probe-load.mjs`, output in `reports/review-rc11-probe-load.txt`. `newGame(1.5)`, `newGame(NaN)`, `newGame(Infinity)`, `newGame(9007199254740992)` and `newGame("5")`, each followed by `withSaveTime`, `savedGame`, a JSON round trip and `loadSavedGame`, gave `refused shape` with no throw at `newGame`. The test `tests/sim/content-revision.test.mjs:345-351` checks only whole numbers.
- What would close it: `newGame` refuses a moment that is not a safe integer with a `RangeError`, as `withSaveTime` does, and one case shows the refusal.

Contradiction: yes — D-386 (first sentence of its binding text, „The load of a saved game state admits every game state the game's own functions make …”, and its *Rationale* on checking a stored moment where it enters the game state).

Slice: 1.
