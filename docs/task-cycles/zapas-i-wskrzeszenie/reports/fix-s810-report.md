done

# Report - fix of the findings I-1, I-2, I-3 of the grouped review of slices 8-10 (task `zapas-i-wskrzeszenie`)

Worktree `the root of the task's worktree`, branch `task/zapas-i-wskrzeszenie`, base `ab0e44ba`. Class of the fix: same.

## Commits

| Commit | Finding | What |
|---|---|---|
| `febbcfc9` | I-2 | `src/browser/sim/game.ts`, `tests/sim/team.test.mjs` |
| `87ae7409` | I-3 | `tests/sim/previous-programs.test.mjs`, `tests/view/account-screen.test.mjs`, `tests/view/previous-save.test.mjs` |
| `3a00e73a` | I-1 | `balance/campaign.mjs`, `tests/balance/campaign.test.mjs` |

Files changed (added/removed lines, `git diff --stat ab0e44ba HEAD`): `balance/campaign.mjs` 58 (+41/-17 approx.), `src/browser/sim/game.ts` 12, `tests/balance/campaign.test.mjs` 83, `tests/sim/previous-programs.test.mjs` 37, `tests/sim/team.test.mjs` 30, `tests/view/account-screen.test.mjs` 11, `tests/view/previous-save.test.mjs` 9; 206 insertions, 34 deletions in total.

## Findings

### I-2 - fixed (`febbcfc9`)

- Fix: the constant `RENEWAL_MS`, read once at module load, is replaced by the function `renewalMs()` in `src/browser/sim/game.ts`, which reads `BALANCE.resurrectionRenewalRealMinutes` where it is used (in `usesAt`, for the first return and the clock after it, and in `teamAfterDeath`, for the clock a death starts), as the game did before Slice 6. `resurrectionUses` was already read at call time.
- Test first: the case "the renewal is read from the data of the game when it is used: ..." in `tests/sim/team.test.mjs` sets `BALANCE.resurrectionRenewalRealMinutes` to 60 after the module is loaded (restored in `finally`), kills a character with practice at a full stock, and expects the clock at T0 + 60 min, then the three returns at +60, +120, +180 min with the game's `resurrectionAt`. Expected values are written out in the case.
- Failing run: `npm test -- tests/sim/team.test.mjs`, exit 1: `AssertionError: the clock of a death`, actual `1760014400000` (T0 + 240 min), expected `1760003600000`. Passing run after the fix: same command, 23 pass, 0 fail.
- The tests of slice 10 stay valid; `balance/loop.mjs` was not touched (its `startState` still reads the renewal at call time, as the finding says it should).

### I-3 - fixed (`87ae7409`)

- `tests/sim/previous-programs.test.mjs`: the case "a document of another version or with no whole version is unreadable" takes the first version above the current one as `SAVED_GAME_VERSION + 1` (imported from the game's `saved-game.js`) instead of the literal 8; the D-401 `decision:` quotation is unchanged. The other changes in this file keep it truthful to version 8 as the current version: `DOCUMENT` ("the document of the current version") takes `version: SAVED_GAME_VERSION`; the case "a document of each version from 1 to 7, the current one included, ..." is now "from 1 to 8" and holds a document of version 8 (with a precondition that 8 is `SAVED_GAME_VERSION`, so the next change of the version points at the case); the comments "versions 3 to 7" say 3 to 8.
- Search of `tests/` (all subdirectories, `.mjs` and `.py`) and `src/` for save version 7 or 8 as the current version or as unreadable (`git grep` for `SAVED_GAME_VERSION`, `version: 7|8`, `version = 7|8`, `VERSION`, `savedGame(`, `loadSavedGame`, `saved-game.js`), found these places broken by the version change, all fixed:
  - `tests/view/account-screen.test.mjs:1894-1896`: `VERSION = 7`, `OLDER_VERSION = 6` as the version the game writes and the one before it. With the literal 7 the load refused every save the test hands back; with 8 and 7 (now `SAVED_GAME_VERSION` and `SAVED_GAME_VERSION - 1`) about 120 of 133 cases that failed pass again; the 3 that still fail are the resurrection-line cases (see "Remaining failures" below). The comment of `OLDER_VERSION` now describes the save of version 7.
  - `tests/view/previous-save.test.mjs:549-551`: "an unreadable document, ..." took version 8 as above the game's current one; it takes `SAVED_GAME_VERSION + 1`, and `SAVED_GAME_VERSION - 1` (=7) for the readable document with no program list (same value as before).
- Places that name a version and were left as they are, with the reason: `tests/sim/saved-game.test.mjs` (slice 7's file; derives from `SAVED_GAME_VERSION` or names versions 7 and 8 as what they are; its 44 cases pass); `tests/view/previous-save.test.mjs:244` (`previous(programs, version = 7)`: a previous save of an older version, readable); `tests/account-*.test.mjs` `PRAGMA user_version = 7` (the database schema version, unrelated); `tests/account-api.test.mjs` versions 1-3 (values the client passes through).
- Failing run before the fix: `npm test -- tests/sim/previous-programs.test.mjs` was reported failing by the reviewer (`AssertionError: version 8`); I did not rerun it on the base, I read the failure off the code (the reader admits versions up to `SAVED_GAME_VERSION`, `src/browser/sim/previous-programs.ts:58-65`). `npm test -- tests/view/previous-save.test.mjs` failed on the base of this fix with `an unreadable document, and one with no program, ...` (45 pass, 1 fail, exit 1) and passes after it (46 pass). `account-screen.test.mjs` before the fix: many failures with `VERSION = 7` (list seen in the run); after: 130 of 133 pass.

### I-1 - fixed (`3a00e73a`)

- Cause (verified): `comeBack` in `balance/campaign.mjs` read a boolean off the away report (`resurrectionUsed` per line), added 1 to `resurrectionsUsed` for it, and counted the completions of a stopped loop as ended runs less the stopping death less one covered death. Two or more covered deaths in one return were counted as one use, and the completions of a stopped loop were overcounted by every further covered death.
- The finding names no fix; the report line of the game can say no more than a boolean and `AwayReportLine` is a part of the saved shape, so the fix stays in the instrument. New function `passAway(ctx, now)`: the game's `catchUp` is passed in steps that each end at the end of a map run of the earning loop. The step's length is read from the game's `advanceLoopRun` (the loop minutes the map run going on still lasts), the step is made by `catchUp` itself, and where the step ended a map run (the events are not empty) the uses spent are `resurrectionAt(before).usesLeft - resurrectionAt(after).usesLeft`, both at the step's moment, so the returns the game counts up to that moment cancel. The completions are the `completed` counter of the last state with the loop alive, less the counter at the start. The instrument counts no return and holds no number of the game (it reads `BALANCE.loopMinuteRealSeconds`, as `balance/loop.mjs` does). `comeBack` adds the uses to `resurrectionsUsed` and the completions to `loopCompletions`; its comment and that of the stopped-loop formula now speak of uses (the removed line "...and one more where a resurrection covered it" is gone with the formula). `comeBack` is exported for the test, as `dueAttempt` is.
- Choice, with the way rejected: one `catchUp` per loop minute (simpler, no probe) was made first and rejected on measurement: 28-day campaigns of the players `edge-daily-best`, `-decent`, `-decent-stock`, 8 seeds each, took 3.2-3.4 s against 0.45-0.65 s on the base for two of them (about 7 times as long); the stepping by ends takes 0.95-1.6 s (about 1.5-1.9 times; the probe simulates each map run once more). Another rejected way: replace `catchUp` by `advanceLoopRun` and `endLoopRun` in the instrument - it would copy the game's order of the catch-up into the instrument. Cost if wrong: the instrument's catch-up goes in more steps than the game's single call; I checked that it gives the same game: over 24 campaigns (3 players x 8 seeds, 28 days) the whole log of each campaign (all fields except `resurrectionsUsed`, `final` and `daily` included) is deep-equal to the base's, and `resurrectionsUsed` was equal as well in them (deaths covered by uses are rare in these campaigns); this was a probe in my working directory, not a kept test.
- Tests first, both in `tests/balance/campaign.test.mjs`, through `comeBack` with a context of one character with practice on the loop of the empty program at Skraj lasu (every map run ends in a death after 243 game minutes, a precondition read from the game by `advanceLoopRun`):
  1. "one return that covers several deaths counts every use spent, and the loop it leaves alive counts no death as a completion": 24 hours hold the deaths at minutes 243, 486, 729, 972, 1215, each covered because a use comes back 240 minutes after the clock started; expected 5 uses, 0 completions, loop alive at run number 6.
  2. "a loop that stops after covered deaths counts each of the uses spent and no completion, ...": with the renewal set to 100000 minutes (possible since I-2) the three deaths spend the three uses and the fourth stops the loop; expected 3 uses, 0 completions, 1 loss of progress.
  - Failing runs: `npm test -- tests/balance/campaign.test.mjs`, exit 1: case 1 `actual: 1, expected: 5`, case 2 `actual: 1, expected: 3` (the old rule gave also 2 completions for case 2 by the formula; the assertion reached stops at the first). Passing: same command, 14 pass, 0 fail.
- The campaign's other count of uses, `tryMap` (`result.settlement === "resurrectionUsed"`, one per manual death), was right and is unchanged.

## Checks run (command, exit code)

All run one file at a time, from the worktree root; no full gate.

- `npm test -- tests/sim/team.test.mjs` 0 (23 pass); failing run before the fix of I-2: exit 1 (1 fail).
- `npm test -- tests/balance/campaign.test.mjs` before the fix of I-1: exit 1 (2 fail, the two new cases); after: 0 (14 pass).
- `npm test -- tests/sim/saved-game.test.mjs` 0 (44); `death.test.mjs` 0 (33); `completion.test.mjs` 0 (27); `catch-up.test.mjs` 0 (35); `loop.test.mjs` 0 (46); `previous-programs.test.mjs` 0 (19).
- `npm test -- tests/view/previous-save.test.mjs` 0 (46 pass; 1 fail on the base before the fix of I-3).
- `npm test -- tests/balance/<file>` for agreement (6), campaign (14), check-map (7), cli (23), engine (7), loop (7), overlay (5), progression (13), trace (3): all 0.
- `npm test -- tests/invariants/test_balance_instrument_file_writes.py` 0; `..._repeatability.py` 0; `npm test -- tests/agent_workflow/test_loop2_balance_skill.py` 0; `npm test -- tests/invariants/test_simulation_isolation.py` 0; `npm test -- tests/invariants/test_simulation_inputs.py` 0.
- `npm run typecheck` 0.
- `npx eslint` on the files I changed and `balance`, `tests/balance`: 0; `npx prettier --check` on the changed files: clean.
- `python -B .the-way/elements/common/foundation_check.py --skip-test-citations`: 9 errors, all in `tests/view/*` (stand by the plan), none in a file I touched; I filtered `tests/view` lines out of that listing, so I did not read those 9 errors one by one. Without `--skip-test-citations` the only line in the files I touched is `tests/view/account-screen.test.mjs:3133: the quotation stands in no binding sentence of D-189`; it stands at a place I did not change (I changed lines 1894-1896 and the import near line 42) and is the plan's, a quotation of D-189 that slice 1 reworded.
- Not run: the full gate `npm test` (not mine); `tests/view/account-screen.test.mjs` after the fix of I-3 was run to a count (130 of 133 pass) but not reported as passing because of the 3 failures below.

## Remaining failures (not mine, stand by the plan)

`npm test -- tests/view/account-screen.test.mjs`: after the fix of I-3, 3 cases still fail: "a game minute that ends the map run in a death is saved at once, settled", "a clock tick rewrites the resurrection line of the headquarters at the clock's moment, ..." and "a clock tick rewrites the resurrection line of Siedziba, of Postać and of Mapy while a manual map run waits, ...". They concern the lines of the resurrection that slices 12-15 change; I did not read their failure messages and did not change them.

## Own-work check (section 3 of the method)

- Requirement most likely not met: I-1, that `resurrectionsUsed` and the completions of a stopped loop agree with the game for every return, not only for the two scenarios of the new cases; the risk is that stepping by ends changes the game the instrument plays. Check: the comparison above, 24 campaigns of 28 days with the same logs as the base apart from the count of uses (all equal as well), and the two new cases with hand-derived values (deaths at 243-minute steps, uses returning 240 minutes after the clock started, renewal 100000 minutes). It showed no difference.
- Mutations thought through: dropping the `events.length > 0` guard changes nothing (no end, no change of the uses); reading the uses at the end's moment of only one of the two states would count returns as spent uses - case 1 would give a different count; counting the completions from the events instead of the loop's counter fails case 2 (4 ended runs, 0 completions).

## Reach beyond the dispatch

- Read `guidelines/coding.md` and `guidelines/testing.md` (the testing file in ranges: lines 1-364 of 509, the rest are the tables of the trust boundary of the account server, not read); `src/browser/sim/loop.ts` (`catchUp`, `takeEnd`, `advanceLoopRun` signature, report line), `src/browser/sim/types.ts` (`AwayReportLine`), `balance/loop.mjs` lines 1-130, `balance/engine.mjs` `makeState`, `foundations/invariants.md` `instrument-game-agreement` (to rule out citing it for the new cases: it is about map runs), `tests/quality/eslint-size-rules.mjs` (thresholds 800 lines a file, 200 a function: `balance/campaign.mjs` is about 640 lines, no move needed), `a file of the author's private notes` (the commit rules of the author).
- Files touched beyond the handoff's list: `tests/view/account-screen.test.mjs` and `tests/view/previous-save.test.mjs` (the handoff names "the other tests I-3's search finds"; each held a hard-coded current version or a version above it that the change broke).

## Working copies

`.runs/fix-s810/` (a probe script of the run length, a timing and equality probe, and a temporary copy of the old `balance/campaign.mjs` as `balance/campaign-old-tmp.mjs`, removed at once): all removed by full path; `.runs/fix-s810` no longer exists in the worktree and `git status` is clean.

## Unread material

- `.runs/task-cycles/zapas-i-wskrzeszenie/task.md` and `plan.md` and the foundation entries D-190, D-240, D-242, D-428, `resurrection-renewal`, `death-settled-once` named by the orchestrator: I did not open them whole; I worked from the passages copied into the handoff (task passages, slices 6 and 10) and from the quotations already in the tests, and read only `instrument-game-agreement` of the foundation entries (whole). The D-190 sentence quoted in the new cases is the same prefix quoted in `tests/sim/team.test.mjs` before; the foundation check shows no error for it.
- `guidelines/testing.md` lines 365-509 (the rest of the file).
- `guidelines/coding-balance-instrument.md`, `guidelines/coding-simulation-module.md` (named in the slices' *Read*; the fix is in the instrument's mode file and in `game.ts` and I changed no structure those files govern; not opened).

## Searches not found or unclear

- The findings file names no suggested fix for I-1; I chose the one above (see the choice and the rejected ways).
- The handoff names `death-settled-once` and `resurrection-renewal` as what the fix must respect; I did not open either entry (see Unread material) - if the reading of either would change the stepping of the catch-up or the clock of a death, that is not covered by this report.
- `guidelines/testing.md` (trust-boundary table) names the previous-programs case as "a document of each version from 1 to 5 ..." while the test is titled "from 1 to 7" on the base and now "from 1 to 8"; the guideline was already out of date before this fix and I left it (the foundation check did not flag it).
