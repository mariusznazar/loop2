# Report — executor of Slice 3 — A death is settled once, on the browser's clock

**Status:** `done with concerns`

The concern is one line: the spec's decision 7 also names a moment accessor and an after-flush hook on the clock contract, which this slice's Goal and Checks do not; I left them out (see *Searches not found or unclear*). Everything the slice's section asks for is made and every check ran green.

## Files and commits

Commit `8737dba` (`feat: :sparkles: a death is settled once, on the browser's clock`), address `mariusznn@gmail.com`, on `task/rozliczenie-przejsc`, not pushed. One commit: the load refuses a death unsettled, so `tests/view/account-screen.test.mjs` is red between a load change and a clock change, and no split leaves each commit green. Worktree clean.

| File | Added | Removed |
|---|---|---|
| `src/browser/sim/game.ts` | 67 | 4 |
| `src/browser/sim/saved-game.ts` | 55 | 10 |
| `src/browser/sim/types.ts` | 13 | 0 |
| `src/browser/view/clock.ts` | 23 | 9 |
| `tests/sim/death.test.mjs` | 442 | 4 |
| `tests/sim/saved-game.test.mjs` | 156 | 17 |
| `tests/view/account-screen.test.mjs` | 12 | 4 |
| `tests/view/clock.test.mjs` | 195 | 2 |

The 4 lines removed in `tests/sim/death.test.mjs` are its header comment, rewritten. Its four cases of Slice 2 stand unchanged (see *Problems as observed*). No test outside the slice's *Change* was touched. `tests/invariants/test_minute_span_split.py` is unchanged (`git diff --stat` empty). `SAVED_GAME_VERSION` stays 2.

## Checks

Final runs, on the code committed:

| Command | Exit | Result |
|---|---|---|
| `npm run typecheck` | 0 | |
| `npm test -- tests/sim/death.test.mjs` | 0 | 26 pass, 0 fail |
| `npm test -- tests/sim/saved-game.test.mjs` | 0 | 17 pass, 0 fail |
| `npm test -- tests/sim/skills.test.mjs` | 0 | 18 pass, 0 fail |
| `npm test -- tests/sim/trip.test.mjs` | 0 | 22 pass, 0 fail |
| `npm test -- tests/view/clock.test.mjs` | 0 | 11 pass, 0 fail |
| `npm test -- tests/view/account-screen.test.mjs` | 0 | 35 pass, 0 fail |
| `npm test -- tests/view/game-saver.test.mjs` | 0 | 17 pass, 0 fail |
| `npm run build` | 0 | |
| `node --test tests/sim/*.test.mjs tests/view/*.test.mjs` (the handoff's sweep, after the build) | 0 | 784 pass, 0 fail |
| `npm test -- tests/invariants/test_minute_span_split.py` | 0 | 9 tests OK, file unchanged |
| `npm test -- tests/invariants/test_restart_seed.py` | 0 | 2 tests OK |
| `npm test -- tests/invariants/test_simulation_inputs.py` | 0 | 2 tests OK |
| `npm test -- tests/invariants/test_simulation_isolation.py` | 0 | 5 tests OK |
| `python -B .the-way/elements/common/foundation_check.py` | 0 | 0 errors |
| Prettier `--check` on the 8 files, the flags of `guidelines/coding.md` | 0 | |
| ESLint `--max-warnings 0` on the 8 files | 0 | |

Not run: the product's gate, `npm test` with no file argument — the orchestrator's, as the handoff gives. StrykerJS on `src/browser/sim/` — the reviewer's by `guidelines/testing.md`, so the simulation files had no mutation pass from me; `clock.ts` had one in my head (the reading not stored in `flush`, the start reading used instead, `send` reading again, the settled state dropped: each breaks a case of `tests/view/clock.test.mjs`).

### Failing runs of the tests written first

All on the stubs (`settleDeath` returning its state, the load passing `deathSettlement` on unchecked, `clock.ts` unchanged); each fails on an assertion unless noted.

- `npm test -- tests/sim/death.test.mjs` — exit 1, 9 pass, 13 fail. Of the failures, two were my fixture, not the code: the precondition of the `Restart` cases and of the gathering case failed because „Obchód” and gathering are not possible on the entrance tile of that seed. Fixed by a program that explores first and by comparing the actions started over the whole run. Several failures read `.kind` of the stub's null, a `TypeError`, which is the stub's missing settlement reached through the assertion's own expression.
- `death-settled-once` passed against the stub, which proves nothing, as the stub never changes a state. So I broke the code: `if (!run?.death) return …`, dropping the guard, with `const lost = false` in `restart` in the same run. `npm test -- tests/sim/death.test.mjs` — exit 1, 18 pass, 4 fail: „a death settled is not settled again, however late” and „a settled death saved and loaded on its screen is left as it stood by a later settling” on `Expected "actual" to be reference-equal`, and the two `Restart` cases that read the team. Then restored from a copy; passing with the same command, exit 0.
- `resurrection-renewal`: failed in the first run above, with the same command passing after.
- `npm test -- tests/sim/saved-game.test.mjs` — exit 1, 16 pass, 1 fail: „a crafted document of the current version is refused whole as shape”. A temporary copy of the test (removed) listing every row the lenient load admitted: 30 admitted of 198 rows, which are 30 of the 31 new rows; the 31st, the key missing, was already refused by `fields`. Passing after the strict load, exit 0. This is the invariant `save-version` seen failing at this boundary.
- `npm test -- tests/view/clock.test.mjs` — exit 1, 6 pass, 5 fail: the five new cases that need the change. The sixth new case, an unchanged game handing back the very state, passed before and after: it pins D-207's condition the change must keep.

## Own-work check

- **Requirement most likely not met:** "the store, the saver and the screen never see a death unsettled", with what is saved coming back. The unit tests hold each link, not the chain, and a later death with no resurrection ready after a `Restart` is the hardest path.
- **Check:** a one-off script in the scratchpad (`own_check.mjs`) drove the real `startClock` over a real game with the real `Date`, only `performance` by hand: a store that records any unsettled death it receives, then three deaths in a row, „Zakończ” and a send between the first two and `Restart` between the last two. After each, `savedGame` through `JSON.stringify` and `JSON.parse` into `loadSavedGame`, then a further `flush`.
- **What it showed (exit 0):** first death `resurrectionUsed`, generation 1; second `progressLost` 2; restart with null settlement; third `progressLost` 3. Each loaded (`ok` true) and each further flush kept the very state. The moment of readiness stayed unchanged through the two deaths with none ready. The store saw 0 unsettled deaths. Also, `grep` shows `passRealTime` and `advanceMinutes` called in `src/` only from `clock.ts` and `game.ts`, so no other path reaches the store with game time.

## Reaches beyond the dispatch

- `src/browser/sim/run.ts:334-381` `newMapRun` — to confirm a restart's skills go through `copySkills`.
- `src/browser/sim/data/balance.ts` — the field names `gameMinutesPerRealSecond` and `resurrectionRenewalRealMinutes`.
- `src/browser/sim/data/archetypes.ts` — one archetype exists, so the case "archetype stays" compares it and cannot show a change of archetype.
- `tests/invariants/test_simulation_inputs.py` — to learn that it calls an exported function its table does not name through a pool of values, so `settleDeath` needs no change there. It ran unchanged.
- `tests/sim/understanding-fixture.mjs`, `stryker.config.json` — the fixture for a game that discovers nothing, and that `tests/sim/death.test.mjs` is already listed.
- `tests/view/status-row.test.mjs`, `tests/view/program-panel.test.mjs`, by grep — they build a death by hand and do not save it, so they need no settlement.

## Searches not found or unclear

- Spec decision 7 says "Clock contract adds: the moment of its latest reading, read at the start too, and a call after each flush that tells the view a reading was made", and spec decision 10's row for `tests/view/clock.test.mjs` names a "hook after a flush". The slice's Goal and Checks name neither. I read that as a later slice's work and left both out; I did not open the plan beyond my section. Only the reading at the start went in (`let moment = Date.now()`), as it is what a flush overwrites; it is the shape decision 7 gives, and it costs one read at the start that nothing yet uses. If the hook was meant here, it is two small additions.
- The line numbers of the slice's *Checks* in `tests/sim/saved-game.test.mjs` have moved. Adapted to the code: `:547` is „a map run that ended comes back as it ended” (was at 589 before my edit), `:766` „a cause of death off its list” (893), `:865` „a death in another game minute than the map run's” (992), `:1271` „a death in combat” (1440). The account-screen ones `:1179` and `:1546` stood where the plan says.

## Choices made

- **`restart` passes `{ ...state, run: null }` to `startRun` after `progressLost`.** `startRun` and `programOf` both read `state.run?.character.skills ?? the team's`, so one condition serves the run's skills and its repertoire alike, as decision 6 asks. Rejected: a skills argument through `startRun` and `programOf` — two signatures for one case. Cost if wrong: the state passed to `startRun` differs from the state given, in that one key; `startRun` reads nothing else of `run`, and replaces `run` in what it returns.
- **`Records.characters` became a map to the read `Character`**, in place of a map to the archetype. Rejected: a second map for the generation — two maps over one list. Cost if wrong: none outside `saved-game.ts`.
- **The moment lives in one `let moment` of the clock**, written in `flush` and read by `send`. Rejected: `flush` returning the moment — it would change the public `flush(): void`, and the store would still need the private reading.
- **A single commit**, for the reason under *Files and commits*.
- The load's upper bound for `generation` reads the current generation of the run's character; a test row gives another character a higher one, so a read of the wrong character is refused.

Changed invariant tests: none of `tests/invariants/`. Tests marked `// invariant: save-version` gained rows; two crafted rows at the boundary (`a cause of death off its list`, `a death in another game minute than the map run's`) now build a settled death, so each stays refused for the reason its name gives, as the plan's *Checks* require: the base they build on, `dead(document)`, loads in „a map run that ended comes back as it ended”, so the one value each row changes is what refuses it.

## Problems as observed

- **I deleted four tests and put them back.** Writing `tests/sim/death.test.mjs` with the file-writing tool replaced the file of Slice 2, so its four cases were gone from my working tree; I saw it in `git diff --stat` before any commit. Restored word for word, with the helper `readyAt`. Check: the `test(` lines of `git show HEAD:tests/sim/death.test.mjs` against the new file, 0 missing. Nothing reached a commit, and the 26 pass above include them.
- Bash refused one heredoc for an unmatched quote; I moved the edit script into a scratchpad file. No effect on the code.
- `guidelines/coding-saved-game.md`, „Przebieg mapy po wczytaniu”, says nothing of `deathSettlement`, and the plan does not list it in my *Change*; I left it. Whether a later slice takes it I did not check.
- A forged `generation` of `Number.MAX_SAFE_INTEGER` loads (decision 9 admits it), and a death with none ready then writes an unsafe number, which the next load refuses. It costs only the player who forged it (D-07, the same reasoning as decision 9's far-future moment). No handling added; named for the reviewer of the trust boundary.
