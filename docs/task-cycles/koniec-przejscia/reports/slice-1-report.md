# Report — slice 1 of the task koniec-przejscia

**Status:** done with concerns. The slice's goal is met and every check of its *Checks* passes; the concerns are four tests outside the slice's *Change* list that the version bump and the new record break (section "Problems as observed"), two of them in `tests/view/`, which I left alone.

## Commit

- `41abf1f` — `feat: :sparkles: keep the longest streak, the game minutes by action and what the character entered with in a manual map run, and save the game as version 4` (one commit: the types, the saved-game reader and the wiring in `game.ts` do not typecheck apart).

## Files changed (added / removed lines)

| File | + / - |
|---|---|
| `src/browser/sim/run-record.ts` (new) | 82 / 0 |
| `src/browser/sim/types.ts` | 31 / 0 |
| `src/browser/sim/game.ts` | 5 / 0 |
| `src/browser/sim/saved-game.ts` | 39 / 2 |
| `tests/sim/run-record.test.mjs` (new) | 372 / 0 |
| `tests/sim/saved-game.test.mjs` | about 245 / 20 |
| `tests/sim/loop.test.mjs` | 3 / 0 |
| `tests/sim/skills.test.mjs` (beyond the Change list, see reaches) | 4 / 0 |
| `tests/sim/encounters.test.mjs` (beyond the Change list) | 9 / 1 |
| `stryker.config.json` (beyond the Change list) | 1 / 0 |

`src/browser/sim/run.ts` is not changed.

## What was made

- `types.ts`: `GameMapRun` gains `longestStreak`, `minutesByAction` and `enteredWith`; new types `MinuteKind` (the kinds of `Action` that are not combat actions, `"wait"`, `"combat"`), `MinutesByAction = Record<MinuteKind, number>` and `RunRecord` (the three fields, `Pick` of `GameMapRun`).
- `run-record.ts`: `MINUTE_KINDS` (the closed list, read from the data: `ACTIONS` entries with no `combat` effect, then `wait`, `combat`), `startRecord(backpack)`, `recordOf(run)`, `minuteKind(before)` and `nextRecord(record, before, after)`.
- `game.ts`: `startRun` binds `startRecord(equipment.backpack)` (so `send` and `restart` both bind it); `advanceMinutes` keeps a `record`, updates it after every game minute with the map run before and after the minute, and writes it into the map run it returns. `restart` rebinds through `startRun`; `end`, `settleDeath` and the editing functions are untouched and leave the record as they find it (they spread the map run).
- `saved-game.ts`: `SAVED_GAME_VERSION = 4`; the three keys are in `GAME_MAP_RUN_KEYS` (and so not in `MAP_RUN_KEYS`: a loop's map run holding one is refused); a new `record` reader checks `longestStreak` (count, from `streak` to `minute`), `minutesByAction` (exactly the keys of `MINUTE_KINDS`, each a count, the sum equal to `minute`), `enteredWith` (read by `tripList`).

## Checks (command, exit code)

Failing runs of the tests written first (before the code that satisfies them; the build was kept compiling with a stub `nextRecord` that returned the record unchanged, a `startRecord` that returned an empty list, and an empty spread in the load):

- `npm test -- tests/sim/run-record.test.mjs` — exit 1, 10 of 15 failed on their assertions (counts at 0 instead of 20/10, 2, 480, 83, 10 and 5; `enteredWith` `[]` instead of the entries); the 5 that passed are the start at zero, a split of a span (both sides empty), a settled death and an edit leaving the record (both sides empty), an empty entry list and a loop's map run with no record. The split test then got a precondition (`combat` is 5), so it fails on a record that counts nothing.
- `npm test -- tests/sim/saved-game.test.mjs` — exit 1, 25 of 36 failed: the document of version 4 was refused as `version` by the loader still at 3. The sweep and the versions 1 and 2 cases passed.
- `npm test -- tests/sim/loop.test.mjs` with the three keys taken out of `MANUAL_ONLY` again — exit 1, 2 failed ("the first map run of a loop ... holds ... nothing of its copy", "a loop's map run is the map run of a manual send ..."); with the keys in — exit 0.

Passing runs after the change:

- `npm test -- tests/sim/run-record.test.mjs` — exit 0, 15 passed
- `npm test -- tests/sim/saved-game.test.mjs` — exit 0, 36 passed
- `npm test -- tests/sim/loop.test.mjs` — exit 0, 37 passed
- `npm test -- tests/sim/death.test.mjs` — exit 0, 26 passed
- `npm test -- tests/sim/time.test.mjs` — exit 0, 19 passed
- `npm test -- tests/sim/catch-up.test.mjs` — exit 0, 28 passed
- `npm test -- tests/invariants/test_minute_span_split.py` — exit 0 (9 tests)
- `npm test -- tests/invariants/test_map_run_repeatability.py` — exit 0 (3)
- `npm test -- tests/invariants/test_simulation_isolation.py` — exit 0 (5)
- `npm test -- tests/invariants/test_simulation_inputs.py` — exit 0 (2)
- `npm test -- tests/invariants/test_content_identifiers.py` — exit 0 (4)
- `npm run typecheck` — exit 0
- `node node_modules/eslint/bin/eslint.js --max-warnings 0 src/browser/sim tests/sim` — exit 0
- `node node_modules/prettier/bin/prettier.cjs --check src/browser/sim tests/sim stryker.config.json` — exit 0

Further runs, not in the handoff (tests of the code I touched, and what the new test file touches):

- `npm test -- tests/sim/skills.test.mjs` — exit 0 (18); `npm test -- tests/sim/encounters.test.mjs` — exit 0 (29), both after the fixture fixes named in the reaches; before them each failed once (see Problems).
- `node --test tests/sim/*.test.mjs` — exit 0, 765 passed.
- `npm test -- tests/quality/test_mutation_test_selection.py` — exit 1 before `stryker.config.json` listed the new test file, exit 0 after.
- `python -B .the-way/elements/common/foundation_check.py` — exit 0, 0 errors.
- Not run: the full `npm test` (the cycle's gate), `tests/account-mail.test.mjs`, and the whole `tests/view/` directory (only five files, see Problems).

Mutations run by hand on the finished code (each built, the file's tests run, then restored; all caught except the one I removed):

- `run-record.ts`: kind read from the map run after the minute, no `Math.max` for the longest streak, the fight read from the map run after, zero entries kept, a wait counted as a fight — each fails `run-record.test.mjs` (1 to 5 tests).
- `saved-game.ts`: no lower bound of `longestStreak`, no upper bound, no sum equality, no refusal of a combat action as the activity, `enteredWith` read loosely, version left at 3 — each fails `saved-game.test.mjs` (1, 1, 1, 1, 2 and 24 tests). A running-sum bound I had first written inside the sum loop survived (no test failed); it is redundant (a sum of non-negative safe integers cannot compare equal to a safe `minute` by rounding), so I removed it.

## Own-work check

- Requirement most likely not met: "each game minute passed counts once, ..., so the counts sum to `minute`" for every way a game state is made, because the load now refuses a state where it does not hold, and a game that saves what it then refuses starts the player's game anew (D-213).
- Check: the existing test "a game state the simulation made loads back from its saved document" (every state the simulation makes there, ended and restarted ones included) passes through the strict reader, plus `node --test tests/sim/*.test.mjs`; and the new fight test counts the minutes with a watcher of every minute's start and compares (combat 5, ordinary minutes equal the minute of the attack, the sum equal to `minute`).
- Showed: that check found the one real gap: a hand-made jump of the game minute in the helper `completed()` of `saved-game.test.mjs` (it moves a map run to minute 476 without the record) made the load refuse the state; I made the helper move the record with it (476 minutes of eating, a longest streak of 476). It also found two fixtures outside the Change list that fabricate a map run (reaches below). In `tests/view/trip.test.mjs:318` the same kind of jump is still there (Problems).

## Reaches beyond the dispatch

- `tests/sim/encounters.test.mjs:547` ("stepMinute and game advancement have the same attack and combat ordering") compares `stepMinute`'s run with `advanceMinutes`'s run; `stepMinute` (run.ts, not changed) keeps no record, so the test now compares with the record the map run held before the minute. Why: the test failed after the change and is a test of code I touched.
- `tests/sim/skills.test.mjs:610` ("scout discovers ...") builds a map run by hand from a plain one and sets it into a game; `advanceMinutes` threw on its missing record (`Cannot read properties of undefined (reading 'explore')`). The fixture now takes the record of the sent map run. Why: same.
- `stryker.config.json`: the new test file `tests/sim/run-record.test.mjs` must be listed (`tests/quality/test_mutation_test_selection.py` failed without it). One line.
- Read selectively beyond the handoff: `src/browser/sim/program.ts:300-345` (a combat action is refused outside a fight, "tylko w walce", which is why a game minute outside a fight never counts to one), `src/browser/sim/programs.ts:560-640, 735-772` (the editing functions and `switchProgram` spread the map run, so none of them touches the record), `src/browser/sim/loop.ts:92-135` (`startLoop`), `scripts/build.mjs` and `scripts/test.py` (the build fails on a type error and removes `dist`).

## Unread material

- `docs/task-cycles/koniec-przejscia/task.md`: not opened; I used the passages the handoff copied.
- `src/browser/sim/run.ts`: read lines 1-130, 340-430 and 500-785 (not 130-340 and 430-500: the activity start, the landing helpers and the solving requirements).
- `src/browser/sim/data/balance.ts`: only grepped for `waitMinutes` and `combatMinutes` (1 and 5).
- `tests/sim/streak.test.mjs`: lines 1-120; `tests/sim/program-fixture.mjs` whole.
- `guidelines/testing.md`: read to its `## Where in code` (line 400); the last 63 lines not read.
- `foundations/part_map.md`: the simulation entry only; the foundation entries named in *Read*: each read whole at the current ranges the handoff gave (decisions D-71, D-135, D-136, D-179, D-189, D-190, D-206, D-207, D-208, D-212, D-213, D-214, D-221, D-339, D-348, D-362; the invariants and glossary entries named).

## Searches not found or unclear

- Whether `minutesByAction` holds every kind of the closed list (zeros included) or only the kinds with minutes: the plan says "a record over a closed list" and "the keys of `minutesByAction` from the closed list". See choices.
- The slice says `restart` "leaves it as it finds it" and also that `enteredWith` is "bound ... again at „Restart”". See choices.
- The load's reading of `enteredWith` as `tripList` reads it does not say whether the data's item order is demanded. See choices.

## Choices (rejected way, cost if wrong)

1. **`minutesByAction` is a full record: all 13 keys, zeros included; the load demands exactly those keys.** Rejected: a sparse record (absent key = 0), as the chest and the practice are. Cost if wrong: the next slice reading it gets zeros where it expected absent keys (harmless for a reader that reads `?? 0`), and the document of a sparse writer is refused; a change of the load and of the three tests of the key sets.
2. **`restart` rebinds all three fields through `startRun`** (a restart is a start). Rejected: carrying the old record through a restart; that would make `enteredWith` the entry list of the first start and the longest streak that of both attempts, against "again at Restart" and the end window of the new attempt. Cost if wrong: one line in `startRun`'s spread.
3. **The load does not demand the data's item order of `enteredWith`** (only what `tripList` demands: items of the data, each once, counts from 1). Rejected: refusing another order. Cost if wrong: a document with another order loads, and the window shows the list in that order; the game itself always writes the data's order (tested).
4. **The load refuses an activity going on that holds a combat action** (`strikeWithStick`, `kick`, `dodge`), a refusal beyond the slice's list ("Wolno odmówić więcej"). Rejected: leaving it, since then a crafted document would load and the first game minute would count to a kind outside the closed list, and the game's own next save would be refused. Cost if wrong: none for a game-made document, since the pick never starts a combat action outside a fight (`program.ts`, "tylko w walce"); a hand-made test state with such an activity would now be refused at the load.
5. **`minuteKind` casts the action kind of an activity to `MinuteKind`** instead of guarding it, on the strength of choice 4. Rejected: a thrown error for the impossible kind. Cost if wrong: a combat action as the activity of a state made by hand in a test would add a foreign key to the record instead of failing.
6. **`longestStreak` takes `after.streak` at the end of every game minute** (max with the record), so the loss in the minute of a death or by a change of the program leaves it. A streak that a hand-made state carries above its minute breaks "at most `minute`" and is refused at the load, which is the plan's rule.
7. **`GameMapRun` carries the three fields in its own object type and `RunRecord` is a `Pick` of them**, instead of `MapRun & RunRecord & {...}`: prettier reindents the whole object type under a three-part intersection, which would have touched every line of it.
8. **The old document stays as `DOCUMENT_V3` in `saved-game.test.mjs`, the new `DOCUMENT` (version 4) is that document plus a hand-written `RUN_RECORD`** (212 minutes: explore 40, wander 30, walkTo 20, walkToCampfire 10, gather 70, craftCampfire 20, lightCampfire 5, feedCampfire 5, eat 5, wait 2, combat 5 = 212; longest streak 40; entered with 4 sticks), as `guidelines/coding-saved-game.md` asks (earlier documents stay and are refused as another version). An invariant's test is not changed in its meaning: the `save-version` cases only moved to version 4 and 5 and gained cases.
9. The red phase used a compiling stub rather than a missing file, since the build fails (and removes `dist`) on a type error.

No change of an invariant's test other than the above; no adaptation of section 4 beyond the reaches.

## Problems as observed

1. **`tests/view/account-screen.test.mjs:1731` holds `const VERSION = 3;`** (and comments at 1730, 3151, 3292 say "3 is the current version"). With the version at 4, `node --test` over `tests/view/{account-screen,clock,trip,end-question,game-saver}.test.mjs` gives 43 failures of 199; with only that constant set to 4 (tried, then restored) one failure is left. Fix: `VERSION = 4` and the comments.
2. **`tests/view/trip.test.mjs:318`** (`completed()`): `{ ...state, run: { ...state.run, minute: 479, streak: 479 } }` jumps the game minute without the record; the test at `:401` ("a death not yet settled draws no settlement, and a loaded screen reads the same lines") then gets a refusal from the load (`loaded.ok` false). Fix: the jump needs `longestStreak: 479` and `minutesByAction` summing to 479 as in `completed()` of `tests/sim/saved-game.test.mjs`. This is the one failure left in point 1's run.
3. I ran only those five view files, not the whole `tests/view/`, so another view or root test with a literal version 3 or a jump of the game minute may exist. Known literal versions that are not the game's: `tests/account-api.test.mjs`, `tests/account-storage.test.mjs`, `tests/http.test.mjs:4094` use `version: 3` as an opaque value of the server's route; I did not run them.
4. The handoff's known failures on the base (`tests/account-mail.test.mjs:350`) were not run and are not touched.

## Amendment after the mechanical check

Commit `d7ac8a9` — `test: :white_check_mark: write version 4 as the current save version in the account screen test and give the completed state of the trip test the record of a manual map run`. Test files only; no product code.

**Files changed (added / removed lines)**

- `tests/view/account-screen.test.mjs` — 4 / 4: `VERSION = 4` and the three comments that said 3 is the current version (lines 1730, 3151, 3292). `OLDER_VERSION = 2` stays: it is still another version.
- `tests/view/trip.test.mjs` — 12 / 2: the helper `completed()` (line 318) sets `longestStreak: 479` and `minutesByAction` with `wait: 479` beside `minute: 479, streak: 479`, so the record sums to the minute as the load demands.

**Checks (command, exit code)**

- `npm run build` — exit 0.
- `node --test tests/view/*.test.mjs tests/*.test.mjs tests/sim/*.test.mjs` — exit 0, 2059 tests, 2059 passed, 0 failed. `tests/account-mail.test.mjs:350` (the known timing-dependent test) passed in this run; nothing failed, so nothing was left to report as base-only.
- `node node_modules/prettier/bin/prettier.cjs --check tests/view/trip.test.mjs tests/view/account-screen.test.mjs` — exit 0.
- Before the fix, the five-file run gave 43 failures of 199 (section "Problems as observed", points 1 and 2); no other file of the whole run failed, so no further literal version 3 or jump of the minute was found in `tests/view/`, `tests/*.test.mjs` or `tests/sim/`. The literal `version: 3` in `tests/account-api.test.mjs`, `tests/account-storage.test.mjs` and `tests/http.test.mjs:4094` are opaque values of the server's routes and passed unchanged.
- Not run: the Python tests of `tests/invariants/`, `tests/quality/`, `tests/deploy/` after this amendment (no product or Python file changed since the slice's runs) and the full `npm test` gate.

**Own-work check of the amendment**

- Requirement: the repaired view tests must still test what they tested, not merely pass: the trip test's loaded screen must be read from a completed state that really loads (not a refused one), and the account screen test must still treat version 2 as another version and 4 as the current one.
- Check: before the repair, the trip test at `:401` failed with `loaded.ok` false (the load refused the state, shown in the earlier run); after it, the same assertions pass with `loaded.ok` true and the loaded screen texts equal to the state's. The version cases in `account-screen.test.mjs` run through the real `loadSavedGame` of the built game (the file's `saveOf` writes `VERSION`), so a wrong constant would fail the first case that loads a save, as it did with 3.
- Showed: both held; the 43 failures went to 0, and nothing outside the two files had to change.
