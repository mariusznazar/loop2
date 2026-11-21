# Report — executor of slice 1 (correction 1), task `ocena-programu-na-ziarnach`

## Status

`done`

## Commits (base `4d813606`)

- `056c2545` feat: :sparkles: give each program of the player's list a content revision ... and the game state the moment it was made ... (D-442, D-04, D-386)
- `730863c3` test: :white_check_mark: quote D-442 and D-386 in the tests of the content revision from the beginning of their sentences

## Files changed (added / removed lines, `git diff --stat 4d813606 HEAD`)

| File | + / - |
|---|---|
| `src/browser/sim/types.ts` | `SavedProgram.contentRevision`, `GameState.madeAtMs` |
| `src/browser/sim/programs.ts` | `contentDiffers` (new, private), `withProgramContent` raises the revision, 0 in `createProgram`, `appendPrograms`, `saveCopyAsNewProgram` (41 lines changed) |
| `src/browser/sim/game.ts` | `newGame(madeAtMs = 0)`, revision 0 of the first program (15) |
| `src/browser/sim/saved-game.ts` | the item of the list holds exactly `id`, `name`, `program`, `contentRevision` (a safe integer from 0, `count`); `madeAtMs` among the game's keys, `integer` (14) |
| `tests/sim/content-revision.test.mjs` | new, 428 / 0 |
| `tests/sim/program-list.test.mjs` | 20 changed |
| `tests/sim/copy.test.mjs` | 15 changed |
| `tests/sim/copy-actions.test.mjs` | 5 changed |
| `stryker.config.json` | +1 (outside nothing: it is in the *Change*) |

Total 9 files, 530 insertions, 27 deletions.

## What was made

- The field is named `contentRevision` (on the saved program) and `madeAtMs` (on the game state). The version stays 9 (`SAVED_GAME_VERSION` untouched).
- `withProgramSaved` still gives `programs` and `judgings` as before; its `programs` now come from `withProgramContent`, which adds 1 to `contentRevision` where `sameData([groups, tripPlan])` differs (the counters `nextGroupId`, `nextRuleId` left out; key order counts for nothing). `editProgram`, `saveCopyIntoProgram`, `setProgram` and the first-chill write of `advanceMinutes` raise it with no code of their own. `renameProgram`, `pickProgram`, `deleteProgram`, `send` and the others spread the saved program and keep it.
- `newGame(madeAtMs = 0)` stores the argument; nothing in the simulation reads it. The default 0 keeps the 237 calls as they are.
- The strict load builds the item from new values and reads the revision with `count` (safe integer from 0) and the moment with `integer` (any sign); nothing compares either with anything. The save needs no code (it is a JSON copy of the state).
- `judgings` in the game state and in `GAME_KEYS` stay (Slice 9 takes them out), as the handoff says.

## Tests first

`tests/sim/content-revision.test.mjs` (37 cases) was written before the code and run red:

- `npm test -- tests/sim/content-revision.test.mjs` before the code: exit 1, 5 passed and 32 failed, each failing at an assertion (`contentRevision: 3` against the expected `4`, `undefined` against `0`, the load refusing a document it should read). The five that passed are the "left as it is" cases, which hold at the base only because the case's own seed carries the field. Output: `reports/slice-c1-01-red-run.txt`.
- One case failed for a reason of the test, not of the code, and was corrected before the code: the first-chill case used a knowing game, which has no chill discovery; it now starts from `newGame()` as `tests/sim/copy.test.mjs` does.
- Cases: 0 for the first program, a created, an appended and a copy-saved-as-new program; one rise by one for each of eight changes (rule's action, rule added, rule removed, two rules swapped, two groups swapped, a group's condition, the take list, the bring list) by each of `editProgram`, `setProgram` and `saveCopyIntoProgram` (24 cases); the first-chill rule (program of the copy raised 2 to 3, another program kept at 5); A to B to A raised twice, content the first again; a rename; `editProgram` and `setProgram` with the same content and with the counters alone changed; `saveCopyIntoProgram` with a copy equal to the program or differing in counters alone, the keys of every object made in another order; a pick, a send and the deletion of another program; a deep-frozen state; the moment of a new game; the save and the load of both fields (moment at 0, -5, a present moment, `MAX_SAFE_INTEGER`; refused at 1.5, 2^53, text, null and missing; revision at 0, 1, 3, `MAX_SAFE_INTEGER`; refused at -1, 1.5, 2^53, text, null and missing).
- Cases of the other three test files that expected a saved program as a number, a name and a content: exactly the seven named by the handoff (`copy-actions.test.mjs:213`, `copy.test.mjs:62` and `:241`, `program-list.test.mjs:89`, `:264`, `:510`, `:527`) failed on the base with the fields added, no others. Their cause is this change's requirement (the saved program now holds a content revision); the fixtures (`team()`, `twoPrograms()`, `withOthers()`, `listed()`) and the expected programs carry `contentRevision`. Two expectations are stronger than a mere addition and say so in a comment: `program-list.test.mjs` "an edit replaces ..." now expects revision 1 for program 3 (it held wandering and takes exploring), and `copy.test.mjs` "the first chill writes ..." expects revision 1 for program 3 and 0 for program 1. No assertion was weakened, no case removed or skipped.
- `decision:` lines of the new file quote D-442 (first sentence in two lengths, the sentence of the rename, the sentence of the copy), D-04 (second paragraph) and D-386 (second paragraph), each from the beginning of its sentence. The first run of the foundation check showed 5 errors in them (mid-sentence starts); corrected in `730863c3`; the check now shows none in my files. The existing `decision:` lines of D-165 and D-386 in the three other files stand in the new text as they were (the check shows no error there).

## Checks (command and exit code)

| Command | Exit |
|---|---|
| `npm test -- tests/sim/content-revision.test.mjs` (first, red) | 1 |
| `npm test -- tests/sim/content-revision.test.mjs` (final) | 0 |
| `npm test -- tests/sim/program-list.test.mjs` | 0 (was 1 before the fixtures followed) |
| `npm test -- tests/sim/copy.test.mjs` | 0 (was 1) |
| `npm test -- tests/sim/copy-actions.test.mjs` | 0 (was 1) |
| `npm test -- tests/sim/death.test.mjs` | 0 |
| `npm test -- tests/sim/loop.test.mjs` | 0 |
| `npm test -- tests/sim/catch-up.test.mjs` | 0 |
| `npm test -- tests/sim/loop-record.test.mjs` | 0 |
| `npm test -- tests/sim/discovery.test.mjs` | 0 |
| `npm test -- tests/sim/previous-programs.test.mjs` | 0 |
| `npm test -- tests/quality/test_mutation_test_selection.py` | 0 |
| `npm test -- tests/invariants/test_simulation_inputs.py` | 0 |
| `npm test -- tests/invariants/test_simulation_isolation.py` | 0 |
| `npm test -- tests/invariants/test_saved_program_edit.py` | 0 |
| `npm test -- tests/invariants/test_copy_save.py` | 0 |
| `npx eslint <the 8 changed ts/mjs files>` | 0 |
| `npx prettier --check <the 9 changed files>` | 0 |
| `node tests/quality/eslint-size-rules.mjs` | 0 (0 functions and files over a threshold) |
| `tsc -p tsconfig.browser.json --noEmit`, `tsconfig.sim.json`, `tsconfig.kitchen-sink.json` | 0, 0, 0 |
| `python -B .the-way/elements/common/foundation_check.py --skip-test-citations` | 1: 12 errors, none in a file of mine |
| `python -B .the-way/elements/common/foundation_check.py` (after the commits) | 1: 13 errors, none in a file of mine; 12 are the quotation errors the orchestrator named at the lines of Slices 2, 3, 4 and 9 (`judging-record.test.mjs`, `previous-programs.test.mjs`, `saved-game-judgings.test.mjs`, `saved-game.test.mjs`, `previous-save.test.mjs`) and the 13th is `judging-cache-reading` with no test yet (Slice 9's or later's) |

Not run, by the rules of the handoff: the full gate (`npm test` with no file), and `tests/sim/saved-game.test.mjs` (red here by design; Slice 2 rewrites it).

## Own-work check (section 3)

- **Requirement most likely unmet:** the content revision rises exactly where rules, groups with their order or the trip plan differ, "A to B to A included", and never at a rename, a save that changes none of the three, the counters alone, or a key made in another order (spec Decision 2, Goal 3), and the strict load of both new fields (Decision 3, `save-version`, trust boundary).
- **Check:** the 37 cases above, then four mutations of the code run against `content-revision.test.mjs` and restored with `git checkout` (the committed code is unchanged):
  - the counters added to the comparison: exit 1, 7 cases failed;
  - the trip plan left out of the comparison: exit 1, 13 cases failed;
  - the comparison by `JSON.stringify` (key order counts): exit 1, 3 cases failed;
  - the load reading the revision with `integer` (negative admitted): exit 1, 3 cases failed.
  Every mutation was caught; the tests were re-run on the restored code (exit 0).
- **What it showed:** the weakest point was the first-chill case, which first passed for the wrong reason would not have; it failed on the knowing game (no discovery) and was fixed in the test. Nothing else surfaced.

## Walk of the running product

This change alters no behaviour a user sees in the running product: the revision and the moment are stored fields that no screen reads yet (the page passes the clock in Slice 8, the cache reads them in the slices after this one); `newGame()` with no argument behaves as before.

## Reaches beyond the dispatch

- `stryker.config.json`: one line added for `tests/sim/content-revision.test.mjs` (it is in the slice's *Change*; `tests/quality/test_mutation_test_selection.py` passes).
- A `grep -rn "withProgramContent"` over the repository (to see its callers) also returned lines of other agents' reports under `.runs/task-cycles/ocena-programu-na-ziarnach/reports/` (planner, reviewers, slice 7 executor, spec designer). I did not open those files and used nothing from them; the callers I relied on are the ones the grep found in `src/`.
- I read three other test-file fixtures around the seven cases (`tests/sim/copy.test.mjs:1-75`, `tests/sim/copy-actions.test.mjs:1-80`, `tests/sim/program-list.test.mjs:1-70`) and `tests/sim/understanding-fixture.mjs`, `tests/sim/program-fixture.mjs`, `src/browser/sim/understanding.ts:446-471`, `src/browser/sim/judging-record.ts:100-141`, `tests/quality/eslint-size-rules.mjs:1-80`, to see how fixtures and the first-chill rule are made. The handoff names the test files as changed files; the others were reads only.
- `previous-programs.ts` and `tests/sim/previous-programs.test.mjs` were not touched; the check on the latter passes (the reader accepts the version-9 document of this change as it stands). Spec Decision 6 says the reader reads a version-9-and-above item only with the keys `id`, `name`, `program`, `contentRevision`; that is not in my *Change* and I left it, so the reader is still as it was (a later slice's, if it is planned).

## Unread material

- `.the-way/task-cycle/change/SKILL.md` and `slice.md`: read whole.
- `guidelines/coding.md`, `coding-simulation-module.md`, `coding-saved-game.md`, `testing.md`, `src/browser/AGENTS.md`: read whole.
- Foundation entries: D-442, D-165 (first paragraphs), D-04 (first paragraph and the stored-moment paragraph), D-386, D-123, D-213, D-399/D-401 only by their heading region where shown, invariants `save-version`, `simulation-isolation`, `simulation-inputs`, `saved-program-edit`, glossary `program`, `copy` and `content revision`, part map `simulation`: read at the ranges named. D-401's body and the invariant `previous-save-programs-reader` were not read whole (not in this slice's *Read*; the reader is outside it). D-165 was read to the end of its entry, D-04 to the end of its second paragraph and the beginning of its *Verification* (the remainder of that field is outside the slice).
- `src/browser/sim/types.ts`, `programs.ts`, `game.ts`, `saved-game.ts` (each a file of the *Change*): read in the ranges that matter (types 80-110 and 440-546, programs 1-60 and 295-800, game 355-490 and 860-910, saved-game 1-260, 440-520 and 1265-1493), not whole (the files run to 546, 836, 983 and 1493 lines).
- `tests/sim/program-list.test.mjs`, `copy.test.mjs`, `copy-actions.test.mjs`: read in the ranges around the seven cases and the fixtures, not whole.

## Searches not found or unclear

- The handoff names my directory for working copies twice with different names (`.runs/executor-1/` in the handoff's text, `.runs/executor-c1-1/` in the dispatching message); I used `.runs/executor-c1-1/`.
- The `--skip-test-citations` flag of the foundation check: the handoff asks to run it "after your change", but the check with the flag skips the citation of test lines, so it cannot show an error of a `decision:` line of mine. I therefore also ran the check without the flag, after committing (a file git does not yet track is not scanned), and found 5 errors of mine, which `730863c3` fixed.
- Nothing else not found.

## Choices (with the way rejected and its cost if wrong)

- The revision is raised in `withProgramContent`, which `withProgramSaved` calls, not in `withProgramSaved` itself: after Slice 9 `withProgramSaved` goes back to giving the list alone, and the raising then stays where it is. Rejected: raising in `withProgramSaved` and leaving `withProgramContent` a plain replacement; it would have to move in Slice 9. Cost if wrong: a rename of one function.
- `withProgramSaved` computes the comparison once for the programs, and `judgingsAfterSave` still compares by `JSON.stringify` for the judgings (first run's code, which Slice 9 removes); the two comparisons differ in the order of keys, which the revision does not count and the judgings do. Left as it is; both go away or agree by Slice 9. No visible effect now, since `checkProgram` builds a program in one key order.
- The load round-trip and refusal cases of both new fields stand in `tests/sim/content-revision.test.mjs` as well as in the file Slice 2 rewrites (`saved-game.test.mjs`), because the slice touches the trust boundary and its file is red by design. Cost: a few duplicated assertions that Slice 2 may fold into its own file.
- `contentRevision` read with `count` (safe integer from 0), `madeAtMs` with `integer`: the same functions the file uses for counts and the save time.

## Problems observed

- None beyond those above. `tests/sim/saved-game.test.mjs` is red as the handoff foretold (not run, not changed).

## Working copies

- `.runs/executor-c1-1/` (outputs of runs, a one-off debug script, a copy of `programs.ts`), directly under the ignored `.runs/` of the worktree: removed before returning, except the red run, which is kept as `reports/slice-c1-01-red-run.txt`. No worktree or clone was made.

---

# Fix of review rc11 (finding 1: `newGame` stored any number as the moment the game was made)

## Status

`done`

## Commit (base `aaef0873`)

- `7b1779fd` fix: :bug: refuse with a RangeError a moment of a new game that is no safe integer, which the load of a saved game state would refuse, and say two identity counters in the comment of the test that changes two (D-386)

## What was changed

- `src/browser/sim/game.ts`: `newGame(madeAtMs = 0)` throws `RangeError("newGame: <value> is not a safe integer moment")` where `Number.isSafeInteger(madeAtMs)` is false, in the style of `withSaveTime`; the default 0 and every existing call stand. The doc comment says so.
- `tests/sim/content-revision.test.mjs`: one new case, "a new game refuses with a RangeError a moment that is no safe integer, which its own load would refuse": `1.5`, `NaN`, `+Infinity`, `-Infinity`, `2**53`, `-(2**53)`, `"5"` and `null` throw `RangeError`; `MAX_SAFE_INTEGER` and its negative are held as given. Its `decision:` line quotes the first sentence of D-386 from its beginning, word for word; the full foundation check shows no error in this file.
- The reviewer's Minor about the comment at `content-revision.test.mjs:117` (it said three counters, the object changes two): corrected in the same commit, as the coordinator allowed ("A difference in the two identity counters alone ..."). The other Minor (`balance/campaign.mjs`, Slice 12) is not touched.

## Red then green

- Red, before the code: `npm test -- tests/sim/content-revision.test.mjs` exit 1, 37 passed and 1 failed, the new case at its assertion ("Missing expected exception (RangeError): 1.5"). Output: `reports/slice-c1-01-fix-red-run.txt`.
- Green, after the code: the same command, exit 0.

## Checks (command and exit code)

| Command | Exit |
|---|---|
| `npm test -- tests/sim/content-revision.test.mjs` | 0 |
| `npm test -- tests/sim/saved-game.test.mjs` | 0 |
| `npm test -- tests/sim/program-list.test.mjs` | 0 |
| `npm test -- tests/sim/copy.test.mjs` | 0 |
| `npx eslint src/browser/sim/game.ts tests/sim/content-revision.test.mjs` | 0 |
| `npx prettier --check` the same two files | 0 |
| `npm run typecheck` | 0 |
| `node tests/quality/eslint-size-rules.mjs` | 0 |
| `python -B .the-way/elements/common/foundation_check.py --skip-test-citations` | 1: 7 errors, all in `tests/sim/judging-record.test.mjs` (2) and `tests/sim/saved-game-judgings.test.mjs` (5), none in my files |
| `python -B .the-way/elements/common/foundation_check.py` (full, before the commit) | 1, no error in `tests/sim/content-revision.test.mjs` |

Not run: the full gate.

## Unread material (current)

As in the first section, and in addition: `reports/rc11-findings.md` read whole; `reports/review-rc11-report.md` and `reports/review-rc11-probe-load.*` not opened (the findings file carries the evidence); `src/browser/sim/game.ts:772-790` and the `RangeError` lines of `game.ts` and `loop.ts` found by grep were read only as far as the grep and the `withSaveTime` body show.

## Searches not found or unclear

None new. (The handoff's `--skip-test-citations` remark stands as in the first section; I again ran the check without the flag.)

## Working copies

`.runs/executor-c1-1/` made again for run outputs; removed before returning, except the red run kept as `reports/slice-c1-01-fix-red-run.txt`.
