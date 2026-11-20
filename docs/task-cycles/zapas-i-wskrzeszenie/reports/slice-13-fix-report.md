**Status:** `done`

# Slice 13 fix report: the two-deaths case of the clock

Findings: `reports/findings-s1114.md`, one finding, I-1 (Important, blocking). Fix range `25223337..` on branch `task/zapas-i-wskrzeszenie`, worktree `the root of the task's worktree`. The Minor findings of the file were not part of this fix.

## Commit

- `16625f50` test: :white_check_mark: start the two-deaths case of the clock from a stock the game holds, with the clock running to an hour after the reading. File: `tests/view/clock.test.mjs`, 16 added, 3 removed.

## Finding I-1: fixed

The finding holds. The load refuses a stock with spent uses and no moment of the next return, or the reverse: `src/browser/sim/saved-game.ts`, function `resurrectionUses`, line 510, `if ((nextValue === null) !== (spent === 0)) refuse();`. The case set two uses spent with `resurrectionNextReturnAtMs: null`, so its Ola death fell into the branch that starts a clock (`nextReturnMs ?? momentAfter(...)` in `teamAfterDeath`, `game.ts`) and the moment assertion held only on that impossible state.

Fix:
- The fixture now sets two uses spent and a moment of the next return an hour after the reading (`T0 + 2 * 3_600_000`). That is a state a game can hold: the clock runs from an earlier death.
- The moment assertion now expects that moment unchanged (`T0 + 2 * 3_600_000`), with the message "a death while the clock runs leaves it as it runs". This is what D-190 says.
- The generation and `progressLost` assertions are unchanged: Ola (character 2 in the loop) takes the last use, Ala's manual death finds none.
- Decision lines: added the D-190 sentence "The used uses return one at a time on one clock: a death that uses up a use of a full stock starts the clock, a death while the clock runs leaves it as it runs, …", which the new assertion rests on. The D-242 quote was kept; it is still the sentence of the order of the two deaths.
- The helper `withUses` now asserts that a moment of the next return stands exactly while a use is spent. This closes the default `null` that let the impossible fixture through. Every other call site passes a valid pair (checked below).

## Other cases checked for an impossible team state

Every fixture that sets the team's uses, in `tests/view/clock.test.mjs`:
- `lastMinute()`, default `(0, null)`: valid.
- `lastMinute(3, flushMoment + offset)`, in the death-settled-against-the-reading case: valid (three spent, moment set).
- `lastMinute(0, null, false)` and `lastMinute(3, T0 + 10·R, false)`, in the no-practice case: both valid.
- `oneMinuteFromSolving(2, T0 + 1000)`, the completion that returns a use: valid.
- `oneMinuteFromSolving(0, null)`, the full-stock completion: valid.
- The two-deaths case: fixed as above.
- The earning-loop end case (`loopingOla` on a full stock, then one death): the game produces the state; valid.
- No fixture has a moment with no use spent, or spent uses with no moment.

## Checks

- `npx prettier --check tests/view/clock.test.mjs`: passes, after `prettier --write` on the file.
- `npm test -- tests/view/clock.test.mjs`: exit 0, 27 tests, 27 pass, 0 fail.
- `python -B .the-way/elements/common/foundation_check.py --skip-test-citations`: exit 1, 23 errors, none in `tests/view/clock.test.mjs` or `src/browser/view/clock.ts`. The errors are in files of later slices.
- `python -B .the-way/elements/common/foundation_check.py` (with citations): exit 1, the same 23 errors, none for the clock files. So the two new decision quotes stand in their binding sentences.
- Observation: the count was 33 errors at my slice's commit `fd5eb418`; it is 23 now at `16625f50`. The eleven that left were in `tests/view/end-window*.test.mjs` and in files I did not touch. My commit changes only `tests/view/clock.test.mjs`, so I did not verify why they left.
- Not run: the full gate (`npm test` without a file), as instructed.

## Own-work check

- Requirement (the finding): the two-deaths case must start from a state the game can hold, and assert only what D-190 says; the other fixtures of the file must hold the same.
- Check: the case now runs on spent 2 with a moment an hour after the reading; the moment assertion expects that moment unchanged; the generation and `progressLost` assertions are unchanged. I checked each fixture by hand against `saved-game.ts` line 510 and `teamAfterDeath`.
- Result: the test passes (27 of 27). The moment assertion would fail if a death restarted the clock: the `??` branch would set a moment at the death, not keep the hour after the reading. I did not run that mutation; the reasoning is from the code.

## Unread material

- `src/browser/sim/saved-game.ts`: read only lines 495-520 (the function `resurrectionUses` and its comment), not the rest of the file.
- `.the-way/task-cycle/change/fix.md` and the findings file: read whole.
- The review report `reports/review-s1114-report.md`: not read; the findings file holds what the fix needs.

## Searches not found or unclear

- None of the things I looked for was missing. The eleven foundation errors that left between runs (see Checks) are unexplained by me; I did not search for their cause.

## Working copies

- `.runs/slice-13-fix/` held my check logs (the test log and two foundation-check logs). It is removed by its full path; the results are in this report.
