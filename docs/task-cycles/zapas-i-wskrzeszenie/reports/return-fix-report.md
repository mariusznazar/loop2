# Report - the fix of the review of the return step (finding 1), task `zapas-i-wskrzeszenie`

Status: done

Worktree `the root of the task's worktree`, branch `task/zapas-i-wskrzeszenie`, head before `f1205477`, head after `ad465c76`.

## Commit

- `ad465c76` - `fix: :bug:` files: `src/browser/sim/game.ts` (+20/-5 lines, `withSaveTime`), `src/browser/sim/types.ts` (comment of `Team`), `src/browser/sim/saved-game.ts` (two comments, no logic), `foundations/decisions.md` (D-386), `tests/sim/team.test.mjs` (three new cases, quotations), `tests/sim/saved-game.test.mjs` (the round-trip case), `tests/sim/death.test.mjs` (a title).

## What was wrong and what I changed

Cause (verified by the reviewer's probe and by my failing run below): `resurrectionUsesSpent` changed only when a death or a first solving was settled, and a use that came back by the clock was only reckoned (`usesAt`), never stored. A save made hours after the second death stored 2 spent although the screen read 3 of 3, and a count lowered to 1 refused it as `shape`.

Fix: `withSaveTime` (`game.ts`) now returns the copy with the team's uses brought up to date at the save moment: `usesAt(team, nowMs)` gives the uses still spent and the moment of the next return; the copy stores them, with no moment when none is spent. A team that needs no change keeps its object. Both save paths (`src/browser/view/game-saver.ts:162` and `src/browser/view/state-store.ts:194`) already make the document through `withSaveTime`, and the live state the view holds stays the value it was (the document only is changed). The load is unchanged: it still repairs nothing and still refuses every hostile document.

D-386: the first sentence of the second paragraph now reads "...as the count spent and not yet returned at the moment of the save, with the moment the next one returns, ..." (the code now makes that true). *Verification* gained the part "a save made after spent uses came back holding only the uses still spent at the save moment and the moment of the next, the uses reckoned from the save moment on the same as from the state saved"; *Rationale* says the same count is "not yet returned at the moment of the save". The other sentences stand word for word. The three `decision:` quotations of that sentence in `tests/sim/team.test.mjs` quote it as it stands (the two older ones changed, the new cases carry it).

Old word "readiness": comment in `saved-game.ts` (`game()`: "as the moment the next use returns is") and the title `tests/sim/death.test.mjs:103` ("a spent use whose moment of return lies below zero has returned at every moment from zero on"). Not touched, because I did not touch the files: `tests/balance/loop.test.mjs:135` and `tests/balance/cli.test.mjs:135` titles ("the resurrection ready").

## The place chosen, and the places rejected

Chosen: `withSaveTime`, the one function through which both the browser's save and its retry make the document (D-248: the save time is written "on its way to the document"). It is the place where the game knows the moment of the save, and the only moment the document is made.

Checked against the entries (read whole: D-190, D-248, D-386, `resurrection-renewal`, `death-settled-once`, `catch-up-state`, `catch-up-minutes`, `catch-up-death-moment`):
- Equivalence (D-190, `resurrection-renewal`): for every moment `t` from the save moment on, `usesAt` of the normalised team equals `usesAt` of the original, because both count `min(spent, 1 + floor((t - next) / R))` returns when the first return has come, and the clock moves by whole renewals; a use due exactly at the save moment counts as returned in both. Held by the third new case (twelve moments, `resurrectionAt` and the death `teamAfterDeath`, for six save moments, including 1 ms before a return and exactly at it) and by the probe (`SAME` at all moments).
- `catch-up-minutes` / `catch-up-death-moment`: the catch-up settles deaths at moments after the save time (k real minutes after it), where the equivalence holds; the open game's deaths settle at the reading, at or after the save. `catch-up-state` and `death-settled-once` read the state, not the stored count, and are unaffected (`catch-up.test.mjs`, `loop.test.mjs`, `completion.test.mjs`, `death.test.mjs` pass).
- Where it differs, and why it is accepted: a reading of a clock set back to before the save time (another device with a slow clock) shows the uses the save stored as returned, where the old save would have shown them spent for a little longer. D-219's *Rationale* already accepts that a wrong device clock shortens or lengthens the renewal; D-248 already holds the save time to the same clock.
- `RangeError`: `usesAt` can throw only where the clock plus a renewal leaves the safe integers; `withSaveTime` already throws a `RangeError` for a moment that is no safe integer, and the entry's *Rationale* already says a number the load would refuse never reaches a document.

Rejected places:
- (b) the load reckoning the uses at the document's own `saveTimeMs` before comparing: keeps the stale stored count inside the loaded state, and the load would repair a state (`guidelines/coding-saved-game.md`: it does not).
- (c) rewording D-386 to "the count the last settled death or first solving left": makes the entry true but keeps the loss remark 3 forbids; it needs the human.
- the clock's tick or `settleDeath`/`settleCompletion` bringing the uses up to date at each reading: changes the live state at every step, breaks "a comparison by identity sees no change", and moves the catch-up's inputs.
- Bringing the uses up to date in `savedGame` (the function that copies the state): it knows no moment of its own except the stored `saveTimeMs`, so it would be the same as (b) in disguise.

## Tests (test first)

Failing first, on the code of `f1205477`: `npm test -- tests/sim/team.test.mjs` exit 1; the three new cases failed: the 13-hour save held `resurrectionUsesSpent` 2 where 0 was expected (`actual: 2, expected: 0`), the 6-hour save held 2 where 1 was expected, and the third failed on `withSaveTime(...).team !== state.team` (its equivalence assertions passed on the old code, as they must). After the fix: same command, exit 0, 27 passed.

New cases in `tests/sim/team.test.mjs` (expected values written out as hours and counts, not computed by the code under test):
- "a save made after every spent use has returned stores none spent, so a count lowered to 1 loads it": two deaths at T0 and T0 + 1 s, a save at T0 + 13 h; the document holds 0 spent and no moment; counts 3, 2 and 1 all load, and the loaded team reckons 3, 2 and 1 uses left with no next return.
- "a save made while some spent uses are back stores the ones still spent and the moment of the next, and a count lowered to the spent ones loads it": saves at T0 + 6 h and exactly T0 + 4 h hold 1 spent and the next at T0 + 8 h, loading at count 1; a save 1 ms before the first return holds 2 spent and is refused at count 1.
- "bringing the uses up to date at a save changes nothing the game reckons from the save moment on, and nothing in the state the view holds": the equivalence of `resurrectionAt` and of the death `teamAfterDeath` at every moment from the save on, for six save moments; the held state is deep-equal to its clone.

Changed case: `tests/sim/saved-game.test.mjs` "a game state the simulation made loads back from its saved document": three states hold a team with all or most uses spent and the first due a minute before the save; the document now holds the uses as they stand at the save (`STORED_AT_THE_SAVE`, hand-derived: 3 spent with the first due at REAL_MS + 1 and the save a minute later give 2 spent and the next due 14 400 000 ms later; the completion that returned one use gives 1). The helper lives outside the test function (the size rule of D-425 allows 200 lines).

## Hostile documents (trust boundary `saved-game.ts`)

The load is unchanged. The existing refusals stay in `team.test.mjs` and `saved-game.test.mjs` and pass. I crafted them again from normalised saves (13-hour and 6-hour saves, probe run against the built game, output `reports/return-fix-probe.out`): spent 2 with no moment, a moment with none spent, spent above the count (4 at count 3), spent 0 with a moment, a moment that is a text, a moment 2^53, the old key `resurrectionReadyAtMs` beside the new: each refused as `shape`. Counts: 13-hour save loads at 3, 2, 1; 6-hour save loads at 3 and 1 and is refused at 0; a 1-second save (two spent) loads at 3 and 2 and is refused at 1.

## Checks (command, exit code; one at a time)

- `npm test -- tests/sim/team.test.mjs` 0 (27), `saved-game.test.mjs` 0 (44), `death.test.mjs` 0, `catch-up.test.mjs` 0, `loop.test.mjs` 0, `completion.test.mjs` 0; `tests/view/previous-save.test.mjs` 0, `clock.test.mjs` 0, `account-screen.test.mjs` 0, `game-saver.test.mjs` 0, `state-store.test.mjs` 0; `tests/balance/loop.test.mjs` 0, `campaign.test.mjs` 0; `tests/invariants/test_simulation_isolation.py` 0, `test_simulation_inputs.py` 0; `tests/quality/test_function_and_file_size.py` 0 (it failed once, on the arrow function of the round-trip case at 211 lines against 200, before I moved the helper out; a failing run kept here by its message).
- The first run of `tests/sim/saved-game.test.mjs` after the fix exited 1 on the round-trip case (a state's team no longer equal to its stamped copy: the expectation did not know the save brings uses up to date); corrected as above, rerun exit 0.
- `npm run typecheck` 0 (run after the source changes); `npx prettier --check` and `npx eslint` on the six changed code files, exit 0.
- `python -B .the-way/elements/common/foundation_check.py` (no skip switch): "0 errors" at the head.
- Not run: the full gate, `tests/view/previous-save.test.mjs` is the only previous-save test run; `tests/balance/cli.test.mjs`, `check-map.test.mjs`.

## Own-work check

The requirement most likely not met: the stored count is always the count the game reckons at the saved moment, and nothing the game computes after the load changes. Checks: the third new case and the probe compare `resurrectionAt` and the death at several moments from the save on, for save moments before, at and after the returns, including a use due at the exact save moment (all equal); the first and second cases check the lowering to 1 for a fully returned and a partly returned stock; a save one millisecond before the first return still holds both uses spent and is refused at count 1, as the rule says.

## Reach beyond the handoff

- Read `src/browser/view/game-saver.ts` and `state-store.ts` at the calls of `withSaveTime` (the only two save paths), `src/browser/sim/loop.ts` around `catchUp`'s start from `saveTimeMs`, `tests/quality/test_function_and_file_size.py` (the 200-line rule), `foundations/decisions.md` D-248 whole, `foundations/invariants.md` `catch-up-minutes`, `catch-up-death-moment` whole.

## Working copies

`.runs/return-fix/` held the probe script `probe.mjs`, its output, the logs of the runs and the summaries. The output the report needs is kept as `reports/return-fix-probe.out`; the directory was removed by its full path before returning.

## Unread material

- `reports/review-return-report.md` was read whole; the probe outputs read whole; `tests/sim/saved-game.test.mjs` read in the ranges around the round-trip case and the helpers, not whole; `src/browser/sim/loop.ts` not read whole (only the catch-up's start).
- The Minor findings 2 and 3 of the review (D-386 `derives from D-190`, the clipped-check way in *Rejected*) were not part of this fix and not touched.

## Searches not found or unclear

- Not found: any other place that makes a saved document from the game state except through `withSaveTime` (searched `src/` for `savedGame(`, `JSON.stringify` of a state, `withSaveTime`): `game-saver.ts:162` and `state-store.ts:194` only.
- Unclear: D-248's wording "changes no game state" about the save time; the save now also brings the stored uses up to date, which changes the document's representation of the team and not what the game reckons. I left D-248 as it stands; say if it should name the uses.
- Unclear: an open end-of-run window after a second death whose save is made hours later keeps the settlement's `usesSpent` 2, so a count lowered to 1 refuses it (the settlement holds more spent than the new count, by the rule "in the team or in the settlement of a death"); the reviewer's probe expected exactly this, remark 3 names the window after the first death, and I did not change it.
