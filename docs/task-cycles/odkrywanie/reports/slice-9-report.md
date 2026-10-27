# Slice 9 report — discoveries in the order of the game minute

**Status:** done. The two repertoire tests the first version of this report named were fixed after the orchestrator added `tests/sim/repertoire.test.mjs` to *Change*.

**Commits:** `f7fef76` (slice) and `3b03486` (the two fixes in `tests/sim/repertoire.test.mjs`: the death test starts from an Understanding holding the first chill's row and expects it unchanged; the pass-over test advances 80 minutes, before the chill at minute 84, with comments saying so) on `task/odkrywanie`, base `0044ccb`. Worktree clean.

## Final checks on the committed tests (command, exit code)

- `npm test`: exit 1. Node stage 494 pass, 0 fail. Python stage failed only the three base failures: `test_loop2_one_serving_process` setUpClass, `test_ruff_source_rules`, `test_shellcheck_source_rules` (environment, same as `reports/00-baseline-gate.log`). Nothing else failed. (A first full run hit my 590 s foreground timeout, exit 124, and was repeated in the background.)
- `python -B .the-way/elements/common/foundation_check.py`: exit 0, 0 errors.
- `node node_modules/@stryker-mutator/core/bin/stryker.js run --mutate "src/browser/sim/understanding.ts,src/browser/sim/run.ts,src/browser/sim/game.ts"`: exit 0, 803 killed, 1 timeout, 90 survived, 5 no coverage; same survivors as classified below.

## Files (added/removed lines are from `git show --stat f7fef76`)

- `src/browser/sim/run.ts`: `stepMinute` split into `minuteBeforePick` (minute up to the pick, returns `{run, events, picks}`; `run.current` is the finished activity while `picks` is true) and `pickActivity`; `stepMinute` is both, same signature and meaning; new `GameEvent` kind `discovered` (`{kind, minute} & Understanding`).
- `src/browser/sim/understanding.ts`: `discover(understanding, before, after, events)` returns `{understanding, revealed, chill}` or null; `withFirstChillRule(program)`.
- `src/browser/sim/game.ts`: `advanceMinutes` threads Understanding, program and counts through the minutes: `minuteBeforePick` → `discover` → (first chill: rule appended, counts reconciled, reduced program recomputed) → `pickActivity`. `discovered` event stands between the finish and the pick.
- `tests/sim/discovery.test.mjs` (25 cases), `stryker.config.json` (lists it).
- `src/browser/sim/types.ts`: not changed (the `Understanding` type already had the needed shape).

## Checks (command, exit code)

- Red first: `npm test -- tests/sim/discovery.test.mjs` → exit 1, 15 of 21 failed (log `reports/slice-9-red.log`). The 6 that passed are negative cases (a miss, a lighting or crafting without sticks, a known item, a chill revealing nothing, inputs unchanged) that hold trivially before the code.
- Green: `npm test -- tests/sim/discovery.test.mjs` → exit 0, 25 pass.
- (earlier, before the repertoire fixes) `npm test` → exit 1: 492 pass, 2 fail, both in `tests/sim/repertoire.test.mjs` (see Problems). Python stage did not run (the script stops after Node failures), so I ran the 18 Python invariant files that use `advanceMinutes`/`stepMinute`/`passRealTime` one by one with `npm test -- tests/invariants/test_<name>.py` (action_in_progress, character_team, exploring_reveal, map_run_layout, map_run_repeatability, map_run_tiles, minute_span_split, move_reach, player_map_run_pace, program_rule_pick, program_world_reference, restart_seed, simulation_inputs, simulation_isolation, simulation_randomness, terrain_drawing_numbers, walk_feasibility, walk_target): all exit 0. The rest of the Python stage (including the 3 base failures) was not run: unchecked.
- `python -B .the-way/elements/common/foundation_check.py` → exit 0, 0 errors.
- `npx eslint --max-warnings 0 src/browser/sim/*.ts tests/sim/discovery.test.mjs` → exit 0; `npx prettier --check ... --no-config --no-editorconfig` on the four changed files → exit 0.
- Stryker: `node node_modules/@stryker-mutator/core/bin/stryker.js run --mutate "src/browser/sim/understanding.ts,src/browser/sim/run.ts,src/browser/sim/game.ts"`. Its dry run needs a green suite, so exit 1 with the committed tests (first failing test: repertoire "a character's death..."). To get a result I temporarily patched the two failing repertoire tests in the worktree (not committed, restored with `git checkout`), then it ran: exit 0, 803 killed, 1 timeout, 90 survived, 5 no coverage. After I added tests for the first run's gaps (threshold, Zawsze, partial row, dead run) the survivors in code of this slice are:
  - `understanding.ts:165` `[]` → `["Stryker was here"]`: equivalent (a string has no `kind` that matches any revealing event).
  - `understanding.ts:168` `if (after.death) return found` → false: equivalent (a death minute's events hold no `activityFinished`, so the next lines return the same).
  - `understanding.ts:201` removal of `default:` case: equivalent.
  - `understanding.ts:138` empty string in an error text: pre-existing (slice 2), message wording.
  - `game.ts:557` `if (run.death) break` → false: equivalent (later iterations step a dead run, which passes no minute and reveals nothing already known).
  - `game.ts:484,487,489,493,497` (`passRealTime`) and `game.ts:510,515,518` (guards at the head of `advanceMinutes`, error text, early return): lines unchanged by this slice; they and the other survivors in `game.ts` (validation of programs, `setPaused`, etc.) and in `run.ts` before line 280 (`finishGathering`, `finishUse`) were survivors on the base code, untouched.
  Killed by added tests that were survivors in the first run: `<` → `<=` at the chill threshold, `revealedBy !== undefined` guard, `isEmpty` arithmetic, dead-run guard of `minuteBeforePick`.

## Own-work check

Requirement most likely missed: "in a minute in which the character dies the effect of the ending action does not take hold, so it reveals nothing (D-71); the first chill follows the body step". Check: test "a gathering ending in the minute of the character's death reveals nothing, and the same gathering without death does" (control with health 50 reveals; health 0.2 gives events `[characterDied]`, Understanding unchanged) and "the first chill in the minute of death still reveals what the body step reveals". Both pass; the control was seen revealing.

Second: the pick sees the rule written at the same minute. Test 1 shows minute 84 exploring with count `{1:1}`.

## Choices

- Rule at the first chill is written when the chill itself reveals something new (`Discovered.chill`); a chill that reveals nothing new (everything known) writes none. Rejected: writing on every chill (would duplicate the rule each minute) or on "minute 84" logic. Cost if wrong: a game whose Understanding already holds the chill row never gets the rule.
- The rule is appended even if the program already holds an identical "Zawsze → Eksploruj" (O1 says so; it shows as a second rule in "Understanding stands after death..." test: counts `{1:1, 2:0}`).
- `discovered` event: flat fields `actions`, `conditions`, `items` beside `minute`. The Understanding lists grow by appending the new ones in data order of the minute; items list the campfire after the `ITEMS` entries.
- Detection of effects from before/after state, not from event payloads: gathering = a backpack count rose; crafting = `campfires.length` rose; lighting = backpack total fell (a lighting that took no hold uses no sticks); exploring = `tileRevealed` event, items read from that tile's `stock` keys.
- The reduced program is recomputed per minute only after a discovery.

## Reaches beyond the handoff

None beyond the files named. Temporary patch of `tests/sim/repertoire.test.mjs` for the Stryker run only (restored).

## Problems

The two repertoire tests that failed (their games did not know what the first chill reveals) are fixed in `3b03486`; no open problem.

## Foundation entries that may no longer match

- `minute-span-split` and `player-map-run-pace` still have their old wording; the task assigns their rewrite and tests to slice 10 (time stops after the discovery minute). `advanceMinutes` today does not stop at a discovery, so `minute-span-split` holds as before.
- D-71 (changed sentence), D-123, D-121, D-118, D-119 match the code as far as read.
