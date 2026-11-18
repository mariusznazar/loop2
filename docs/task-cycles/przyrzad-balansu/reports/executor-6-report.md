# Report - executor of slice 6 (the earning loop and the trace of one map run)

**Status:** done

**Commits:** `690156e1` on `task/przyrzad-balansu` (base `5d548b8b`), one commit by path: `feat: :sparkles: add the loop and the trace of one map run to the balance instrument, ...`.

## Files changed

| File | Added / removed lines |
|---|---|
| `balance/loop.mjs` (new) | +258 / 0 |
| `balance/trace.mjs` (new) | +145 / 0 |
| `tests/balance/loop.test.mjs` (new) | +146 / 0 |
| `tests/balance/trace.test.mjs` (new) | +68 / 0 |

Total: 4 files, 617 insertions. No file of `src/`, `foundations/`, `balance/engine.mjs` or `balance/overlay.mjs` changed.

## What was made

- `balance/loop.mjs` runs the game's own `startLoop` and `catchUp` (from `dist/browser/sim/loop.js`) for one character on one map, with the loop clock fixed at `LOOP_START_MS`. It exports:
  - `loopOnce` - one seed, readings at the given checkpoints (hours), each read by `catchUp` from the one before;
  - `loopSweep` - `loopOnce` over seeds, with the summary per checkpoint, the figures of the notes' instrument (stopped share, resurrection share, completions, chest mean and median, chest by item, points if stopped, pending practice);
  - `loopBalance` - per map run over real hours on each seed: pieces taken from the chest, pieces put in, share of map runs ended in death (`perSeed` counts, `summary` figures).
- `balance/trace.mjs` exports `trace`: it starts the map run as the engine's `runOnce` does and steps it with the game's `stepMinute`. It returns the lines, the `outcome`, `minute` and `cause`. Each line carries the body's temperature, satiety and health, nature energy, streak, campfire minutes, backpack, place and the event; started rule actions show the action's label from the data and, for a gathering, the resource's name; attacks show the creature's name; deaths, completions, streak losses, combat ends and the campfire going out are lines too.
- The tests were written first (see *Checks*). Each file has relations the code does not compute: a zero-hour loop leaves the chest as the take list left it; the per-seed balance agrees with the game's own completions and chest after 24 hours; the trace ends in the engine's outcome and minute; a death line names the engine's cause; labels and resource names come from the data.

## Checks

| Check | Command | Exit | Result |
|---|---|---|---|
| Loop test before the module stands (placeholder returning shapes with nulls and `alive: false`) | `npm test -- tests/balance/loop.test.mjs` | 1 | 4 of 5 failed on assertions (`false !== true`, `null !== 0`, `null !== 1`, `null !== 3`); the second test passed on the placeholder, see *Own-work check* and *Problems*. Log: `reports/executor-6-red-loop.log` |
| Trace test before the module stands (placeholder returning empty lines and nulls) | `npm test -- tests/balance/trace.test.mjs` | 1 | 3 of 3 failed on assertions (`null !== 'solved'`, `null !== 'death'`, `assert.ok(started.length > 0)`). Log: `reports/executor-6-red-trace.log` |
| Loop test after the module | `npm test -- tests/balance/loop.test.mjs` | 0 | 5 of 5 pass (final run, after formatting). Log: `reports/executor-6-green-loop.log` |
| Trace test after the module | `npm test -- tests/balance/trace.test.mjs` | 0 | 3 of 3 pass (final run, after formatting). Log: `reports/executor-6-green-trace.log` |
| ESLint | `node node_modules/eslint/bin/eslint.js --max-warnings 0 balance tests/balance` | 1 first (one error: unused `finalState` in `loopSweep`), fixed; then 0 | pass |
| Prettier | `node node_modules/prettier/bin/prettier.cjs --check --no-config --no-editorconfig --ignore-path .gitignore balance tests/balance` | 1 first (four files), then `--write` on those four files, then 0 | pass |
| Size rules | `node tests/quality/eslint-size-rules.mjs` | 0 | its output names nothing of `balance/` (grepped) |
| Own check: foundation check, not in the slice's list | `python -B .the-way/elements/common/foundation_check.py --skip-test-citations` | 0 | 0 errors |
| Own check: private names in the new files | `grep -n -i -E "analizy|symulator|krytyka|Notes|The Brain|Storage|repos|przyrzad|nakladk|fable|a drive letter and a slash |a drive letter and a slash "` on the four files | 1 | no match |

Not run: the full gate (`npm test` with no argument), as the handoff says.

## Own-work check

Requirement most likely not met: the loop's balance must agree with what the game itself does (its completions and the chest), not only with what the instrument's own arithmetic says. Check: the test `the loop balance of each seed agrees with the game's own count` (three seeds, 24 hours, `forestLoopWithStock` with 8 sticks and 7 berries in the chest) compares the balance's completions with the reading of `loopOnce` at 24 hours, and the final chest with the start chest minus what was taken plus what was put.

- Mutation A: the put formula without the take of the next map run (`+ startedNext` removed). `npm test -- tests/balance/loop.test.mjs`: exit 1; the chest test fails, the other four pass. Log: `reports/executor-6-mutant-put.log`. Restored from a saved copy; `cmp`/hash equal before the commit.
- Mutation B: the trace drops the death line (`characterDied` returns null). `npm test -- tests/balance/trace.test.mjs`: exit 1; the death test fails, the other two pass. Log: `reports/executor-6-mutant-death.log`. Restored; `cmp` against the saved copy confirmed.

The committed files are the unmutated ones.

Sanity of the figures (so that the relations are not zero-against-zero): a probe over seeds 1-5, 24 hours, `forestLoopWithStock` with 8 sticks and 7 berries gave 13 map runs begun, 8 ended, 2 deaths, 6.38 pieces taken and 5.0 put per map run begun, 25 % deaths; `forestBest` at 24 hours gave completions in 3 of 5 seeds. The probe file was removed with the working directory.

## Choices (way rejected, cost if wrong)

1. **Balance counted minute by minute** through `catchUp` (one loop minute per call), not one call per checkpoint. Rejected: a single `catchUp` over the span, which gives no count per map run. Cost: about 1440 calls per seed for 24 hours (three seeds took about 65 ms in the test).
2. **Pieces taken by a later map run** are read from the new run's backpack at its minute 0 (the game's own equipment for the run). Put pieces are the chest's change at the ending plus that take. Rejected: copying `tripLoot` or the notes' per-run function. Cost: correct only while a one-minute `catchUp` cannot advance a new run in the same call; the chest test would show a break.
3. **Completion or death** is read from the loop's `completed` counter, which rises only at a completion; a loop that is gone after an ending counts as a death (progress lost). Rejected: reading the death settlement kind, which the game does not return. Cost: none seen.
4. **Denominators:** pieces taken and put per map run begun (including a run still going at the end); death share over map runs ended. Cost: the figures are not per finished run; this is stated in the docstring.
5. **Resurrection not ready** is set on the team's `resurrectionReadyAtMs` (the game's field, read by `resurrectionReady` in `game.ts`), not on the character as the notes did. Cost: none seen; not exercised by the tests.
6. **Points if stopped** uses the game's `waitingPractice` and `paidPractice`, and `skillProgress` for the levels above 1 (the notes' `earnedPoints`). Rejected: the notes' own sum of practice. Cost: none seen.
7. **The trace repeats the engine's start** (about 20 lines: take, reduce, `newMapRun`) instead of changing `balance/engine.mjs`, a file of slice 2. Cost: a second copy to keep in step; the trace test checks its outcome and minute against `runOnce` on three seeds.
8. **The trace starts from the solved maps the engine uses** (`prerequisitesOf`), as the engine does; the notes' trace used no solved maps.
9. **Trace wording:** the frame words are English (`start`, `DEATH`, `SOLVED`, `ATTACK`, `fire out`, `streak lost`, `combat ended`); names of actions, resources, items and creatures are the data's (Polish). The death cause is the game's identifier (`cold`, `hunger`, `combat`), since no data holds a text for a cause. Cost: a reader sees English frame words beside Polish names; a Polish frame would be a change of the product's text, not of this slice.
10. **Loop starts without `programId`**, so the program is the character's row (`rowProgram`), which the tests exercise through `forestLoopWithStock` and `forestBest` and which the tests confirm is the program of the loop (the take of the start matches the engine's take).

## Reaches beyond the handoff

- `tests/balance/agreement.test.mjs` and `tests/balance/engine.test.mjs` read whole, for the test conventions (imports, the `// invariant:` form, the state built through `setProgram`). Not in the handoff's list; read to match the style.
- `src/browser/sim/game.ts` lines 80-88 and 583-628 (`resurrectionReady`, `teamAfterDeath`) and `src/browser/sim/trip.ts` lines 14-18, 57-66, 112-118 (`pieceCount`, `takeTrip`, `tripLoot`): read to confirm the signatures and the resurrection field the loop uses. Not named by the handoff.
- `src/browser/sim/run.ts` lines 70-104 (the event kinds) and `src/browser/sim/types.ts` lines 40-60, 114-120, 182, 232 (action kinds, combat outcomes, death causes): read for the names the trace shows.
- `tests/sim/reference-programs.mjs`: exports only (grep), for the programs the tests import.
- `a file of the author's private notes` and `...\rules\git.md`: read when the rules hook asked, before the first file write by script and before the commit.
- Outside the repository, under `the Loop project folder of the notes/the notes' analyses folder/the balance instrument's notes folder/przyrzad/`: `silnik.mjs` lines 142-220 and 428-542 (the loop part, as the handoff named) and `slad.mjs` whole. The notes are not named in any repository file.

## Unread material

- `guidelines/testing.md`: read whole in three Read calls and the first 2 KB of the persisted bash output; lines 1-39 were read only in that preview (the top of the file and the table of parts up to the balance row).
- `foundations/glossary.md`: read whole.
- `guidelines/coding.md`: read whole.
- `foundations/decisions.md` D-239 (8392-8454), D-240 (same range), D-249 (8783-8809), D-22 (5313-5355): read whole. `foundations/invariants.md` `catch-up-state` (1128-1137) and `loop-run-knowledge` (1158-1167): read whole.
- `src/browser/sim/loop.ts`: read whole.
- `src/browser/sim/skills.ts`: only its exports (grep) and the signatures of `skillProgress` (lines 33-36) and `paidPractice` (151); the rest not read.
- `src/browser/sim/data/actions.ts`: lines 1-62 and the label lines (grep); the action definitions from line 63 on were not read whole.
- `src/browser/sim/data/resources.ts`, `src/browser/sim/data/items.ts`: read whole.
- `balance/engine.mjs`: read whole. `balance/overlay.mjs`: read whole (not needed by the slice, read for the layout).
- `task-frozen.md:15-40` and `plan.md:157-174`: read as named.
- Notes `silnik.mjs` lines 1-141 and 221-427 (the notes' `loadSim`, `applyOverlay`, the notes' `runOnce`): not read; the slice does not take them.
- `executor-2-report.md` and `executor-5-report.md`: read whole.
- `.the-way/task-cycle/change/SKILL.md` and `slice.md`: read whole.

## Searches not found or unclear

- `rowProgram` (`src/browser/sim/programs.ts:362`): not read. The loop's program comes from it when `programId` is not given; the tests pass with the program in the row, but I did not check the rule for a character with no row.
- The initial value of `resurrectionReadyAtMs` in `newGame` (`game.ts:338`): not read; the loop's default `resurrectionReady` path relies on it being ready at the start.
- Whether a one-minute `catchUp` can ever end two map runs of one character in one call: argued from `catchUp` and `advanceLoopRun` (the span stops a run's new start from advancing), not tested directly.
- The notes' `summarize` of resurrection use (`resurrectionUsed` from the away report, which this loop never closes): kept as the notes do; the notes' intent beyond their code was not checked.

## Working copies

- `.runs/ of the main checkout/worktrees/przyrzad-balansu/.runs/executor-6/` (in the worktree's ignored `.runs/`): held the run logs, the probe script, the saved good copies of `balance/loop.mjs` and `balance/trace.mjs` used for the mutation checks, the mutant logs, the ESLint and Prettier logs and `commit-message.txt`. The logs the report names were copied to `reports/` beside this report; the directory was removed. Removed: yes.
- A probe script was first written by mistake under the main checkout, `.runs/executor-6/ of the main checkout`; it was deleted at once, and the empty directory `.runs/executor-6/ of the main checkout` that held it was removed. Removed: yes. Nothing else of mine stands in the main checkout.
- The product's `dist/` build output made by `npm test` is the product's ignored build output, not a working copy.

## Problems observed

- The loop test "on each seed the readings of a loop never fall..." passed against the placeholder in the first red run, because the placeholder reported no living loop and the test skipped those readings. I added `assert.equal(readings[0].alive, true)` before the green run. That strengthening was not re-run against the placeholder; by inspection the placeholder returns `alive: false` for every reading, so the added line fails there. Stated so the orchestrator can see the red evidence is partial for this one test.
- The trace's frame words are English while the names are Polish (Choice 9); flagged as a choice, not a defect.
