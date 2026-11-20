PASS 16625f50fb8560d47e4a1e1254c97252f904d76d

# Review of the fix of the grouped review of slices 11-14

Fix range `25223337..16625f50`, one commit, `16625f50` (`tests/view/clock.test.mjs`, 16 added, 3 removed).
`git rev-parse HEAD` in the worktree is `16625f50fb8560d47e4a1e1254c97252f904d76d`, the head given. Bounded by
the findings file `reports/findings-s1114.md` (one finding, I-1) and the fix report
`reports/slice-13-fix-report.md`, as `.the-way/task-cycle/review/fix.md` gives.

Counts: blocking 0; Minor 1 (new, in the fix diff); out of scope 0.

## The finding

**I-1 — fixed.**

- The case starts from a stock the game holds: `tests/view/clock.test.mjs:618-622`,
  `withUses(practised(practised(twoCharacters(), 1), 2), 2, T0 + 2 * 3_600_000)` — two uses spent with the clock
  running to a moment after the reading (the reading is at `T0 + LOOP_MINUTE_MS + 1` ms), the shape the load
  admits (`src/browser/sim/saved-game.ts:510`) and one an earlier death leaves (a death two hours before `T0`
  with the 240-minute span).
- It asserts what D-190 says: `:641-645` expects the moment unchanged, `T0 + 2 * 3_600_000`, "a death while the
  clock runs leaves it as it runs", with the D-190 sentence it rests on quoted at `:611`. The generation and
  `progressLost` assertions that show the order of the two deaths are unchanged.
- The assertion now catches the regression the old one let through: in a scratch worktree of the head, with
  `teamAfterDeath` changed to restart the clock at every death (`src/browser/sim/game.ts:649`,
  `nextReturnMs ?? momentAfter(...)` -> `momentAfter(...)`), `npm test -- tests/view/clock.test.mjs` exits 1,
  26 pass, 1 fail, exactly this case.
- The helper refuses a spent count and a moment that disagree: `withUses` (`:220-235`) asserts
  `nextReturnMs === null` equals `spent === 0` before it builds the state, the rule of the load.
- No other fixture of the file holds an impossible state. I checked every place that sets the team's uses
  (search for `resurrectionUsesSpent`, `resurrectionNextReturnAtMs`, `withUses(`, `lastMinute(`,
  `oneMinuteFromSolving(`): `lastMinute()` at `:292` and `:437` (0, null); `lastMinute(3, flushMoment + offset)`
  at `:331`; `lastMinute(spent, nextReturnMs, false)` at `:351` over (0, null) and (3, `T0 + 10 * RENEWAL_MS`);
  `oneMinuteFromSolving(2, T0 + 1000)` at `:395`; `oneMinuteFromSolving(0, null)` at `:420`. Each pair agrees, so
  each passes through the helper's new assertion, and the whole file passes. The other cases build their teams
  from a new game (`twoCharacters`, `newKnowingGame`) and change the uses only through the game's functions.
  The pair (3, `T0 + 10 * RENEWAL_MS`) puts the return 40 hours ahead, more than one span after any death; the
  load admits it (any safe integer, D-386) and a clock set back reaches it, so it is no impossible state.

## New findings in the fix diff

### Minor

**M-5 — the comment of the fixture says "an hour after the reading".**
`tests/view/clock.test.mjs:615-616`: „the clock runs to the return of the next, an hour after the reading”. The
moment is `T0 + 2 h` and the reading `T0 + 61 s`, so the return stands about two hours after the reading. The
value and the assertion are right; only the words are off. No consequence for the test.

No Critical or Important finding in the fix diff. The new D-190 quotation stands in a binding sentence (the
citation check reports nothing in the file).

## Declined to judge

- The Minor findings M-1 to M-4 of the grouped review: not in the findings file, not part of this fix (WAY-161).
- The eleven foundation-check errors that the fix report saw leave between `fd5eb418` and `16625f50`: they left
  with slice 14's commit, outside this fix's range.

## Checks run

- `git log --oneline 25223337..16625f50` and `git diff 25223337..16625f50` — one commit, one file.
- `npm test -- tests/view/clock.test.mjs` — exit 0.
- `python -B .the-way/elements/common/foundation_check.py --skip-test-citations` — exit 1, 23 errors, the same
  23 as at `25223337`, none in `foundations/` and none in `tests/view/clock.test.mjs`. By file:
  `guidelines/styleguide-browser-view.md` 2, `src/browser/maps-screen.css` 2, `src/browser/view/maps-screen.tsx` 1,
  `src/browser/view/trip-lines.ts` 2, `tests/sim/trip.test.mjs` 1, `tests/view/account-screen.test.mjs` 6,
  `tests/view/maps-screen.test.mjs` 6, `tests/view/trip.test.mjs` 3 — files of slices 15-18.
- `npx prettier --check tests/view/clock.test.mjs` — exit 0; `npx eslint tests/view/clock.test.mjs` — exit 0.
- Scratch run (above): `teamAfterDeath` restarting the clock at every death — the fixed case fails, exit 1.
- Not run: the full `npm test` (the cycle's run before the request).

## Reaches beyond the dispatch

- `src/browser/sim/game.ts:643-650` (`teamAfterDeath`), changed only in the scratch worktree, to show the new
  assertion catches a restart of the clock.

## Working copies

- `.runs/review-s1114-fix/` held a worktree of the
  head (`wt`; its node_modules junction to the reviewed worktree's removed first by itself, the target left
  untouched; then `git worktree remove --force` and `git worktree prune`) and the scratch run's output `m.txt`.
  The directory is removed; nothing is kept in `reports/`; the result is written above.

## Unread material

- `tests/view/clock.test.mjs` read through the fix diff and the search hits listed above, not whole.
- D-190 not read whole; its quoted sentence was checked by the foundation check.
- `src/browser/sim/saved-game.ts` read only at the lines named in the grouped review (`:504-516`).

## Searches not found or unclear

- none
