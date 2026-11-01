# Report — executor of Slice 1 — The saved document of version 3, task `petla-zarobkowa`

**Status:** done with concerns

The concerns are the three lines under *Concerns*: none blocks the slice; the first is a value of the
spec that does not pass my reckoning, the second a naming matter of the plan, the third a repeat run.

## Files and commits

Commit `bc8eaec` on `task/petla-zarobkowa`, base `96d7b45`, address `the owner's address`, not pushed.
One commit: the raise of the version and the tests that follow it cannot stand apart, a test would
stay red between them. Ten files, the plan's limit, none beyond its *Change*. Worktree clean.

| File | Added | Removed |
|---|---:|---:|
| `src/browser/sim/types.ts` | 52 | 0 |
| `src/browser/sim/game.ts` | 19 | 0 |
| `src/browser/sim/saved-game.ts` | 208 | 23 |
| `src/browser/view/game-saver.ts` | 8 | 2 |
| `src/browser/view/game-view.ts` | 6 | 1 |
| `tests/sim/saved-game.test.mjs` | 587 | 35 |
| `tests/sim/death.test.mjs` | 6 | 3 |
| `tests/view/game-saver.test.mjs` | 96 | 6 |
| `tests/view/trip.test.mjs` | 3 | 1 |
| `tests/view/account-screen.test.mjs` | 76 | 10 |

## Checks

On the commit, from a clean tree, each with its own build where the command builds:

| Command | Exit | Result |
|---|---:|---|
| `npm test -- tests/sim/saved-game.test.mjs` | 0 | 24 pass, 0 fail |
| `npm test -- tests/sim/death.test.mjs` | 0 | 26 pass, 0 fail |
| `npm test -- tests/view/game-saver.test.mjs` | 0 | 19 pass, 0 fail |
| `npm test -- tests/view/trip.test.mjs` | 0 | 6 pass, 0 fail |
| `npm test -- tests/view/account-screen.test.mjs` | 0 | 37 pass, 0 fail |
| `npm test -- tests/invariants/test_simulation_inputs.py` | 0 | 2 tests, OK |
| `npm test -- tests/quality/test_quality_invariants.py` | 0 | 5 tests, OK |
| `npm run typecheck` | 0 | |
| `node --test "tests/sim/*.test.mjs" "tests/view/*.test.mjs"` (the tests of the code touched, before the commit, after a rebuild) | 0 | 808 pass, 0 fail, 0 skipped |

**The failing run written first:** `npm test -- tests/sim/saved-game.test.mjs` before the code, exit 1,
21 of 24 failing, with an empty `withSaveTime` so the file reaches its assertions. The crafted test
failed at its assertion: reason `version` where `shape` was expected, because the document was of
version 3 and the game of 2. The same command after the code: exit 0, 24 pass.

**Tests written after the code, each seen failing by breaking the code for a moment and restoring it**
(same section below): the saver's two new cases and the case of `keep()`.

**Not run:**

- The product's gate, `npm test` with no file argument: the handoff keeps it for the orchestrator. So
  `foundation_check.py`, the Python tests outside the two above and the Node tests outside `tests/sim`
  and `tests/view` are unchecked by me. A search found no other test that builds or reads a game
  document; `tests/account-api.test.mjs`, `tests/http.test.mjs`, `tests/transport.test.mjs` and
  `tests/account-storage.test.mjs` hold `version: 2` as data of the server, which reads no game.
- StrykerJS: the testing guidelines give it to the reviewer.

## The own-work check

**Requirement I judged least likely met:** every condition of spec section 13 refused as `shape`, each
by a guard of its own. A list of refusals in one test passes when a case is refused for another
reason, so a guard could be missing behind a green test.

**Check:** a script in the scratchpad broke one behaviour at a time, ran the file that should catch it
and restored the source: 40 breaks of the load, the saver, `keep()` and `withSaveTime`, and one more
written so it compiles.

**What it showed:** 39 of 41 caught, each exit 1. The other two:

- `runNumber` read as a count, from 0: survived, and it is an equivalent change, since `completed` is
  a count, so a run number of 0 always meets `completed >= runNumber` and is refused the same.
- The line's character check removed: did not compile; written with `character?.generation ?? 9`
  it was caught by „a line of a character not in the team”, exit 1.

Among those caught, the three the slice's *Checks* name:

- `baseline` set to the stamped state: exit 1 in `tests/view/game-saver.test.mjs`, „a loaded paused game
  sends nothing, and a save of it changes nothing…” among the failures.
- The moment read before `read()`: exit 1 there, „each document holds the moment of the reading made
  for it…” among the failures.
- `keep()` unstamped, and `keep()` without its reading: each exit 1 in
  `tests/view/account-screen.test.mjs`, „the document kept for the same account…” alone failing.

**Writers of a document:** `git grep` finds one call of `client.saveGame` outside the client, in the
saver, and `app.ts` takes its kept document from `keep()`, so the two stamped paths are all of them.

## A run that failed and passed when run again

`node --test "tests/sim/*.test.mjs" "tests/view/*.test.mjs"`: exit 1, 807 pass, 1 fail („a crafted
document…”, at „a line of a character not in the team”). Then `npm run build`, exit 0, and the same
command: exit 0, 808 pass. **Cause verified:** this command does not build, and `dist` held my last
break: `grep -c "character?.generation" dist/public/sim/saved-game.js` gave 1 before the build and 0
after. The source was restored before that run; the fault was the build, not the code.

## Reaches beyond the dispatch

- `src/browser/sim/run.ts:395`: the signature of `mapRunEnded`, to call it on a plain `MapRun`.
- `src/browser/sim/data/maps.ts`, `data/skills.ts`, `data/archetypes.ts`: the size of Las, for the
  hand-written loop's run, and which skills an archetype lacks.
- `tests/invariants/test_simulation_inputs.py`, its header: whether `withSaveTime` needs a line in it.
  It does not; every exported function is called from a pool.
- `scripts/test.py`: what `npm test -- <file>` runs.
- `tests/view/clock.test.mjs`, a search: how view tests mock the date.
- `C:\Storage\The Brain\The Brain\.ai\rules\git.md`: the user's rule to read before a commit.

## Searches not found or unclear

- A skill in the data that the one archetype lacks: there is none, so „skills by `characterSkills` for
  that archetype” cannot be tested with another archetype; the reading passes the owner's archetype as
  the manual run's does.

## Adaptations (small mismatches of the plan and the code)

Each inside a file of the *Change*, under the same cause, To do 10 with D-206 and row 13:

- `tests/sim/saved-game.test.mjs:539` in the old numbering also took 3 for another version and 2 for
  the current one, in „the server's save…”; the plan names `:712`–`:733` only. Moved to 3 and 4.
- `tests/view/account-screen.test.mjs:1841` also takes 3 for another version; the plan names `:1715`
  only. Both now use `OLDER_VERSION`, 2.
- `tests/view/account-screen.test.mjs:1515`, the check of `ACTS`, compares a whole game, so it needed
  the stamp too; not in the plan's list.
- `onPage` in `tests/view/account-screen.test.mjs` now fixes `Date.now`: `submission` could not name
  the moment otherwise. The plan names `submission` and `saveOf`, not this.

## Choices

- **`plainMapRun(read, records)` takes the record already read**, so the manual run reads its keys once
  with the longer list. Rejected: `plainMapRun(value, …)` reading its own keys, which would refuse the
  tail of a manual run. Cost if wrong: none outside this file.
- **`lostGeneration` drawn out of `SETTLEMENTS`**, shared with the report's stop, as both are „from 2 up
  to the current one”. Rejected: repeating the two lines. Cost if wrong: the two would have to part.
- **`characterKey` shared by `loops` and `stoppedLoops`**, with the characters the record may not name
  as an argument. Rejected: one function for each. Cost if wrong: none.
- **Names:** `EarningLoop`, `AwayReportLine`, `LoopStop`, `MAP_RUN_KEYS`, `GAME_MAP_RUN_KEYS`, as the
  spec leaves them to the maker.
- **The test document:** a third character, Ewa, generation 3, since a stopped loop needs a character
  with neither a loop nor the manual run. `HEADQUARTERS` holds Ala's loop in a combat going on, with
  `solvedMaps` `["forest"]`, which fills the branch of no manual run. Its old `solvedMaps: []` changed
  with the raise. The document of version 2 stays as it was under the name `DOCUMENT_V2`.
- **`Date.now` in `onPage` is a constant through `mock.method`**, not `mock.timers` with `Date`:
  `mock.timers.tick` would move the date under `submission`. A case that needs another date mocks it
  over this, as the case at the clock tick does.
- **`withSaveTime` tested in `tests/sim/saved-game.test.mjs`**, as the slice adds no file.
- **No sentence on a loop's run in `guidelines/coding-saved-game.md`:** the spec makes it optional and
  the file is outside the *Change*.

## Changed invariant tests

No assertion was weakened; each change stamps a document, or moves a number that is no longer another
version. Each changed case carries its cause in a comment or in its helper's comment.

- `save-version`: „a document of another version is refused as version…”, its 3 moved to 4;
  „a crafted document of the current version is refused whole as shape”, 138 cases added;
  „the document of version 2 is refused as version…” added.
- `resurrection-renewal`: „a resurrection used up is ready again at its moment after a save and a
  load…”, the round trip stamped.
- `death-settled-once`: „a settled death saved and loaded on its screen…”, the round trip stamped, its
  equality now with `{ ...settled, saveTimeMs: T0 }`.
- `expired-session-unsaved-progress`: the cases of `tests/view/account-screen.test.mjs` run through
  `saveOf` and `submission`, which are stamped; their assertions did not change.

## Concerns

1. **A clock below zero.** The spec gives `withSaveTime` a RangeError only for a moment that is no safe
   integer, and section 13 refuses a save time below 0 because „a clock cannot read below zero”. A
   device clock set before 1970 makes a document the next load refuses, with the player's progress
   discarded. `tests/sim/death.test.mjs` „a moment below zero settles as any other” shows the game
   otherwise treats such a clock as the player's own (D-07). I followed the spec and pinned no behaviour
   for a negative moment. Recommended: leave it, as browsers on such a clock are rare, or have a later
   task clamp it at the saver; the change would be one line.
2. **Two meanings of „moment” in one file.** The plan's option `moment` is the clock's reading, and
   `GameSaver.moment()` in the same file is a moment of saving, the sense the glossary keeps apart. I
   kept the plan's name and doc comments separate them.
3. **`dist` after breaking the code.** See *A run that failed and passed when run again*: a reviewer
   running `node --test` directly needs a build first.

## Problems as observed

- A long heredoc given to Bash failed with „error launching git: Nazwa pliku lub jej rozszerzenie są za
  długie.”, so the edit scripts went through files in the scratchpad. Guess at the cause: the command
  line's length limit on Windows. No effect on the work.
