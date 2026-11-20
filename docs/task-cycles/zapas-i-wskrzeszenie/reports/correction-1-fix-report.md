done

# Report - correction 1 (remarks (1) and (2) on request 166), task `zapas-i-wskrzeszenie`

Worktree `the root of the task's worktree`, branch `task/zapas-i-wskrzeszenie`, code head before: `3a00e73a`.

## Commits

- `fae769a4` - remark (1), finding N-1: `balance/loop.mjs`, `balance/campaign.mjs`, `tests/balance/campaign.test.mjs`, `tests/balance/campaign-fixture.mjs` (new).
- `14f9b8da` - remark (2): `src/browser/sim/types.ts`, `src/browser/sim/game.ts`, `src/browser/sim/saved-game.ts`, `guidelines/coding-saved-game.md`, `tests/sim/team.test.mjs`, `tests/sim/saved-game.test.mjs`, `tests/sim/death.test.mjs`.

## (1) N-1, way A - done

- Cause (verified): `passAway` in `balance/campaign.mjs` read `BALANCE.loopMinuteRealSeconds` at call time, while the game's catch-up (`src/browser/sim/loop.ts`) and `balance/loop.mjs` read it when their files load. Under an overlay that shortens the minute after load, the campaign's step to "the end of the map run" falls inside one game loop minute, `catchUp` passes no whole minute, the save time does not move, and the loop never ends.
- Fix: `balance/loop.mjs` exports `MS_PER_LOOP_MINUTE` (it was a private constant of that file, the one place the instrument keeps the loop minute); `balance/campaign.mjs` imports it and no longer reads `BALANCE.loopMinuteRealSeconds`. The game's `loop.ts` is not touched.
- Case first: "a loop minute that an overlay shortens after the instrument is loaded changes no step of a return: ..." in `tests/balance/campaign.test.mjs`. A synchronous endless loop cannot be stopped by the test runner's timeout, so the case runs the return in a child process (`spawnSync`, `--input-type=module --eval`, `timeout: 20_000`): it loads the campaign, sets `BALANCE.loopMinuteRealSeconds = 30` after the load, calls `comeBack(ctx, 24)` and prints the log; the case asserts the process ended within its limit and the log (5 uses, 0 completions, no loss: the same as without an overlay, since neither the game nor the instrument reads the minute again). The context builder (`emptyLoopContext`, `minutesOfAnEmptyRun`) moved from the test file into `tests/balance/campaign-fixture.mjs` so the child process and the test share it (new helper file; the part map's glob `tests/balance/**` claims it).
- Failing run on the code of `3a00e73a`: `npm test -- tests/balance/campaign.test.mjs`, exit 1, 14 pass 1 fail, the new case after 20025 ms: `AssertionError: the return ended within its limit ... spawnSync ... ETIMEDOUT`. After the fix: same command, exit 0, 15 pass.
- Cost if wrong: if a later change makes the game read the minute at call time, the instrument's constant (read at load) disagrees again; the new case would then fail on the count or hang to its 20 s limit, not hang the run.

## (2) The settlement of a death holds the uses spent - done

My choice: the recommended way. `DeathSettlement` `{ kind: "resurrectionUsed", usesSpent }` instead of `usesLeft`.

- `types.ts`: the field and its comment (spent after the death, from 1 up to the data's count; the uses left are the count less these).
- `game.ts` `teamAfterDeath`: `usesSpent: spent + 1` (was `BALANCE.resurrectionUses - spent - 1`); the doc comment says spent.
- `saved-game.ts` `SETTLEMENTS.resurrectionUsed`: exactly the keys `kind` and `usesSpent`; `integer(value, 1)` (a safe integer from 1: the death spent one) and refused only above `BALANCE.resurrectionUses`, read when the load runs, as the team's spent count is. The old key `usesLeft` is an unknown key and refuses (`fields`). No clamp.
- `guidelines/coding-saved-game.md`: the list of what the load checks against the data now reads "zużytych użyć nie może być więcej, także w rozliczeniu śmierci, która zużyła użycie" (was "a po śmierci, która zużyła użycie, zostaje ich nie więcej niż ta liczba"). Edited by hand with the minimal sentence change, not through the skill `the-way-maintain-coding-guidelines`.
- `balance/campaign.mjs` does not read the field (it reads `resurrectionAt(...).usesLeft`, the game's function, unchanged). The view reads no settlement field (`end-window-lines.ts` reads only the kind, the wording is slice 14's); no foundation entry says what the settlement holds (searched `foundations/` for "uses left", "settlement" with use/resurrection/spent: only a D-240 rationale sentence that speaks of uses left in general), so no foundation entry was changed.
- Shape: version 8 stays, as the shape is new in this request and no document of version 8 stands on any server; no document in the tests holds a settlement (the `DOCUMENT` constants do not), so the exception comment of the guidelines is not needed.
- Tests (first, run before the source change: `tests/sim/team.test.mjs` 8 fail, `saved-game.test.mjs` 5 fail, `death.test.mjs` 1 fail, exit 1 each; after: 24, 44, 33 pass, exit 0):
  - New case in `team.test.mjs`: "a count lowered from 3 to 1 after the save refuses a game with two uses spent and none with one, an open end-of-run window after a first death included": a game saved at the open end of a run after the first death from a full stock (1 spent, settlement 1 spent) loads with `BALANCE.resurrectionUses` set to 1 after the save; the same game after a second death (2 spent in the team and the settlement) is refused as `shape`, and loads again at count 2 (restored in `finally`). Its failing run before the source change stopped at its precondition (the settlement then still held `usesLeft`), so it did not reach the load; the property itself I checked by mutation: with the settlement's check changed to `>=` the case failed (and with it the other two cases of that test file that touch the load), exit 1; restored. The expected values are written out in the case.
  - `team.test.mjs`, `death.test.mjs`, `saved-game.test.mjs`: every settlement literal rewritten to `usesSpent` with hand-derived values (1 after the first death of a full stock, 2, 3 with the last, and so on); the case "a settlement whose uses left equal the data's count loads, ..." is now "...uses spent equal the data's count loads, and one above it is refused".
  - Hostile variants (refused as `shape`), in both `team.test.mjs` ("a crafted team of the resurrection...") and the closed list of `saved-game.test.mjs`: spent above the count (4, 10, `2 ** 53 - 1`, `2 ** 53`), none spent (0, as the death spent one), negative, fractional, `Infinity`, a text, `null`, missing, the old key `usesLeft` instead of and beside `usesSpent`, a settlement on a map run going on. The case that loads each value from 1 to the data's count (1, 2, 3) replaces the one that loaded 0 to 3 of uses left. All earlier refusals of the team's own count and moment stay.
- Own-work check: the requirement most likely not met is "the load refuses ONLY a save with more used than the new count". Check: the new case (a lowered count with one spent loads, two spent refuses, count 2 loads two spent) and the mutation above. Another thought-through mutation: dropping the `integer(.., 1)` minimum would let a settlement of 0 spent load; the zero case of both files refuses it.
- Choice and rejected ways: (a) clamp the stored number to the new count - not allowed (the saved-game guideline forbids repairing a state; Q15 rejected it); (b) keep the uses left and check them against a lowered count in some other way - any check of "left" against the data's count refuses a first-death window when the count is lowered, which is what the human ruled out; (c) drop the number from the settlement and compute it at display time - the window would then say the uses of the moment of reading, not of the death, against D-216/question 6 ("the number speaks of the moment of death"). Cost if wrong: slice 14 (the window's wording) must compute "uses left after this death" as the data's count minus `usesSpent` at display time; if the count is lowered below `usesSpent` the load has refused the save already, so the subtraction cannot go negative.

## Checks run (command, exit code; each file on its own)

- `npm test -- tests/sim/team.test.mjs` 0 (24); `saved-game.test.mjs` 0 (44); `death.test.mjs` 0 (33); `catch-up.test.mjs` 0 (35); `loop.test.mjs` 0 (46); `completion.test.mjs` 0 (27); `previous-programs.test.mjs` 0 (19).
- `npm test -- tests/balance/campaign.test.mjs` 0 (15); `loop.test.mjs` 0 (7); `check-map.test.mjs` 0 (7); `cli.test.mjs` 0 (23, run after (1)).
- `npm test -- tests/view/previous-save.test.mjs` 0 (46).
- `npm test -- tests/invariants/test_balance_instrument_file_writes.py` 0; `..._repeatability.py` 0 (after (1)).
- `npm run typecheck` 0; `npx eslint src/browser/sim tests/sim tests/balance balance` 0; `npx prettier --check` on the changed files clean.
- `python -B .the-way/elements/common/foundation_check.py --skip-test-citations`: 9 errors, all in `tests/view/*` (I filtered those lines out and did not read them); with citations, no line for any file I touched.
- Not run: the full gate; `tests/invariants/test_simulation_isolation.py` and `..._inputs.py` after (2) (the source change adds no import and no input); `tests/view/account-screen.test.mjs` (not touched in this correction).

## Reach beyond the dispatch

- Read `src/browser/sim/loop.ts` (the loop-minute constant, earlier), `foundations/decisions.md` around the D-240 rationale sentence that mentions uses left (to rule it out), `src/browser/view/end-window-lines.ts` (to confirm it reads no settlement field), `tests/quality/eslint-size-rules.mjs` (earlier). Files touched beyond the dispatch's list: `tests/balance/campaign-fixture.mjs` (new helper, see (1)) and `tests/balance/campaign.test.mjs`, `balance/loop.mjs` (the export).

## Working copies

`.runs/correction-1-fix/` was created and stayed empty (the child process of the case runs from the repository files); removed by its full path, it no longer exists. The worktree is clean (`git status`).

## Unread material

- `correction-1-remarks.md`: read whole. The task's question 15 and the foundation entries D-190, D-216, `resurrection-renewal`, `death-settled-once`: not opened; I relied on the passages in your message and the earlier handoff. `.claude/skills/the-way-maintain-coding-guidelines` and the skills `the-way-record-decision` / `-invariant`: not read (no foundation entry needed a change; the guideline edit was one phrase).

## Searches not found or unclear

- No foundation decision or invariant sentence says what the settlement of a death holds (searched `foundations/` for "uses left", "settlement" with use/resurrection/spent): nothing to reword; if the orchestrator knows one, it was not found by those searches.
- The "end-of-run window computes the uses left at display time" part of your recommendation is slice 14's wording; I did not touch `src/browser/view/`.
- The first failing run of the new lowering case stopped at its own precondition, not at the refusal (see above); I covered it by mutation instead.
