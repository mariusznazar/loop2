# Report of the executor of slice 6, task `ocena-programu-na-ziarnach`

**Status:** done with concerns. The version, the document and the crafted cases are done and green. The concern is a finding of the room measure: the limit of 64 KiB is within reach (see "Room"), and one test file outside the slice's *Change* had to change (see "Reaches").

## Commits

- `7fc40efc` feat: :sparkles: raise the version of the saved game state to 9 ... (D-206, D-213, D-440, D-241, D-165)

Files changed (one commit, by path):

| File | Added | Removed |
|---|---|---|
| `src/browser/sim/saved-game.ts` | 1 | 1 |
| `tests/sim/saved-game.test.mjs` | 278 | 23 |
| `tests/sim/previous-programs.test.mjs` | 13 | 4 |

(3 files, 292 insertions, 28 deletions.) The branch is clean after the commit.

## What was done

- `SAVED_GAME_VERSION` 8 to 9, once, for both changes of the shape (the judgings of slice 4, the two counts of slice 5).
- `tests/sim/saved-game.test.mjs`:
  - The old document of version 8 is kept as `DOCUMENT_V8` and refused as `version` (new case "the document of version 8 is refused as version, whatever its game holds"), with `SAVED_GAME_VERSION === DOCUMENT_V8.version + 1`; the same game written under version 9 is refused as `shape`, as it lacks the new keys.
  - `DOCUMENT` is the document of version 9 and fills each new branch: judgings of two characters (Ala: program 1 on Skraj lasu and Las, program 3 on Las; Ola: program 3 on Las — głębiej, a map not solved), each kind of result (`solved`, `death`, `undecided`), take lists of 1 and 2 entries and one empty, one judging whose equipment the chest no longer holds; Ola's earning loop with `inARow` 2 below `loopRecord` 3.
  - `HEADQUARTERS` is version 9 with no judging and Ala's loop at `inARow` 3 equal to `loopRecord` 3.
  - The checks of the current version moved from 8 to 9 (`version: 8` of the server's save, the list of other versions `[0, 7, 8, 10, -1]`, version 10 of another shape and with an absent archetype); the assertion `SAVED_GAME_VERSION === DOCUMENT_V7.version + 1` moved from the case of version 7 to the new case of version 8 (cause: the version rose; the case of version 7 keeps refusing its documents as `version`).
  - `CRAFTED` (the table of "a crafted document of the current version is refused whole as shape") got 16 cases of the two counts (missing each, of the old shape, run in a row above the record, below 0, fractional, text, none, not a number, infinite, beyond the safe integers) and 31 cases of the judgings (missing, none, list, character/program/map the data or list lacks, a deleted program, `__proto__`, a key or a cause added, results of 11 or 13, a hole, another kind, an object with cause and minute, equipment with an absent item, an item twice, count 0, fractional, text, beyond the safe integers, a key added, an object in place of the list).
  - The edges case "a document at the edges of what the earning loops, the report and the save time admit loads" got edges: both counts 0, a run in a row equal to the record, a run in a row 0 below a record, no judging, a character with an empty record, a program with no judging left, twelve deaths, twelve undecided, every item of the data in equipment, equipment beyond the chest and carrying capacity.
  - The sweep "no value a document can hold, at any place of it, throws out of the load" runs over the new document, so it reaches the judgings and the counts.
- `tests/sim/previous-programs.test.mjs` (outside the *Change*, see Reaches): the table of documents of version 1 to 8 has a document of version 9, the precondition names 9 (it named 8 and failed after the raise).

## Checks (command and exit code)

| Command | Exit | Result |
|---|---|---|
| `npm test -- tests/sim/saved-game.test.mjs`, red, before the raise (document rewritten, constant at 8) | 1 | 45 tests, 16 pass, 29 fail; the first failures were "the current version is the one the document of the current version is written with" and every load of the document, as `DOCUMENT` was version 9 and the code read 8 |
| `npm test -- tests/sim/saved-game.test.mjs`, after the raise | 0 | 45 tests, 45 pass |
| `npm test -- tests/sim/saved-game.test.mjs`, rerun after the commit | 0 | 45 pass |
| `npm test -- tests/sim/previous-programs.test.mjs` | 0 | 19 pass (it failed on `SAVED_GAME_VERSION === 8` after the raise, before its table got version 9; the failing run was not kept) |
| `npm test -- tests/sim/saved-game-judgings.test.mjs` | 0 | 11 pass |
| `npm test -- tests/sim/loop-record.test.mjs` | 0 | 23 pass |
| `python -B .the-way/elements/common/foundation_check.py --skip-test-citations` | 1 | 5 errors, all the known `D-243` quotations in `tests/view/account-screen.test.mjs:2807`, `:2975` and `tests/view/maps-screen.test.mjs:494`, `:700` (the handoff names 7; the other two are in `tests/sim/loop.test.mjs`, which the check no longer flags); none in my files |
| `npx eslint tests/sim/saved-game.test.mjs tests/sim/previous-programs.test.mjs src/browser/sim/saved-game.ts` | 0 | clean |
| `npx prettier --check` of the three files | 0 | clean |
| `node .runs/executor-6/measure.mjs` (run from the worktree root) | 0 | output below; the script and its output are kept as `reports/slice-06-measure.mjs` and `reports/slice-06-measure-output.txt` |

The full gate (`npm test` with no argument) was not run, as the handoff says. The tests of `tests/view/` that use `SAVED_GAME_VERSION` (`account-screen.test.mjs`, `previous-save.test.mjs`) take it from the constant and were not run (not in the slice's *Checks*).

## Own-work check

The requirement most likely missed: "a crafted remembered judging and crafted counts are refused whole as `shape`" at each place of the new shape, and the version, the document and the refusal of the old version standing together. The check: the new cases of `CRAFTED` only mean something if each fails when the matching check of the load is removed, so I mutated `src/browser/sim/saved-game.ts` four ways, one at a time, and ran `npm test -- tests/sim/saved-game.test.mjs` for each:

| Mutation | Exit | Result |
|---|---|---|
| removed `if (inARow > loopRecord) refuse();` | 1 | 1 fail: "a crafted document of the current version is refused whole as shape" |
| removed `if (results.length !== BALANCE.judgingSeeds.length) refuse();` | 1 | the same case failed |
| `listedProgram(identityKey(programEntry), records)` replaced by `identityKey(programEntry)` (a judging of a program the list lacks admitted) | 1 | the same case failed |
| `rememberedJudging(judging)` replaced by `judging as RememberedJudging` (no reading of results and equipment) | 1 | the same case failed |

Each mutation was restored (`git diff` shows only the one line of the version constant before the commit). Each crafted case changes exactly one thing in a sound document, and `DOCUMENT` loads (the first case of the file), so a case is refused for the one fault it names; I did not check each of the 48 new names one by one against a mutation of its own check.

A weaker point, left as it is: the load does not refuse a `loopRecord` above `completed` (a record of 9 with 3 completions loads). D-241 and the code of slice 5 read only "run in a row not above the record"; refusing more is allowed (`guidelines/coding-saved-game.md`, "Wolno odmówić więcej"), but it is a choice of slice 5's code, not mine, and the game never writes such a state. Named for the reviewer.

## Room (64 KiB)

The server measures `Buffer.byteLength(JSON.stringify(game), "utf8")` of the game alone (`src/server/account-routes.ts:521`, `savedGameLimit` 65 536, line 66), so the script measures that. The data has 3 maps (`forestEdge`, `forest`, `forestDeep`); the load takes only those keys. The case of 5, 20 and 3 is loaded back by `loadSavedGame` (it loads); the case of 10 maps was measured on the same state with 7 synthetic map keys of the length of `forestDeep`, and is not loadable (stated in the output).

- **One remembered judging** (the bytes it adds to a state, inside the character, program and map keys that already stand): 218 bytes with mixed results and a take list of 2 items; 246 with all twelve results `undecided` (the longest word); 275 with a take list of all 4 items with 2-digit counts; 303 for both. Inside a full record, where the character and program keys are shared, a judging adds 211.9 to 296.9 bytes.
- **State with no judging**: 5 characters and 20 empty programs 6 913 bytes; the same with 20 programs of 10 rules each 20 333 bytes (the programs of players are larger than empty ones; 10 rules is my pick, not a data value).

| Judgings for every triple of | With the 20 programs | Mixed results, 2-item take list | Worst: all undecided, 4-item take list |
|---|---|---|---|
| 5 characters, 20 programs, 3 maps (300 judgings) | empty | 70 497 bytes, 107.6 % of the limit | 95 997 bytes, 146.5 % |
| the same | of 10 rules | 83 917 bytes, 128.0 % | 109 417 bytes, 167.0 % |
| 5 characters, 20 programs, 10 maps (1 000 judgings, synthetic keys) | empty | 218 597 bytes, 333.6 % | 303 597 bytes, 463.3 % |
| the same | of 10 rules | 232 017 bytes, 354.0 % | 317 017 bytes, 483.7 % |

**Finding: the limit is within reach.** A save is refused with 413 above 65 536 bytes, and the whole cross product exceeds it on the 3 maps that exist today. How many judgings fit before the limit, from the room the state without judgings leaves: with 20 empty programs 276 of the 300 (mixed, 2-item take list), 244 (all undecided), 217 (4-item take list), 197 (the worst of both); with 20 programs of 10 rules 213, 188, 168 and 152 of the 300. So about two thirds of the triples are enough to fill the limit, and the limit is reached by the judging every program on every map for every character, which is what a thorough player would do. With 10 maps the cross product is 3 to 5 times the limit; a judging per map for all characters would pass it with a fraction of the programs. The measure changes no code. For the request: whatever the request settles (a limit on remembered judgings, a shorter form of a judging such as one string of twelve letters for the results, a higher save limit through D-104 and D-207, or erasing the oldest), it is its decision; nothing in this slice cuts the size. The loop record's two counts are small (two numbers per earning loop) and are not the cause.

## Reaches beyond the handoff

- `tests/sim/previous-programs.test.mjs` is outside the slice's *Change* but inside its *Checks*; its precondition `SAVED_GAME_VERSION === 8` failed after the raise, so it got the document of version 9 and the number 9 (title "from 1 to 9", the loop `[6, 7, 8, 9]`). A small mismatch of the plan, adapted. `guidelines/testing.md` names this case as "a document of each version from 1 to 5 ..." (already out of date before my change; not touched, since the guideline is not mine to change in a slice).
- Read beyond the named material: `src/browser/sim/saved-game.ts` (whole file read for its parts that matter: lines 1-135, 1100-1492), `tests/sim/saved-game-judgings.test.mjs` whole (to mirror its crafted cases), `tests/sim/loop-record.test.mjs` lines 1-60 and its test names, `src/server/account-routes.ts:500-535` (how the limit counts), `.the-way/task-cycle/change/slice.md` and `walkthrough.md` (method files).

## Walk of the running product

Not made. The raise discards the saved games of version 8 (D-206), which a player sees as the existing sentence of the refusal of another version; no screen shows a judging yet (slices after this one), and the view's use of the constant is covered by tests that take the version from the constant. I judged it a change of the stored shape whose visible effect is the decided one and left the case "a game saved at version 8 meets the refusal sentence in a real browser" unchecked, for the walk of the slice that wires the screen.

## Unread material

- `foundations/decisions.md`: D-206 (3889-3933), D-213 (659-703), D-386 (4232-4248), D-207 (3934-4013), D-104 (2707-2729) and `foundations/invariants.md:1048-1057` (save-version) were not opened by me: the quotations of D-206, D-213 and D-386 that I use are those already in the test file and passed `foundation_check.py`; no decision text they would add was needed beyond D-440 (read whole) and D-241 (read whole). `src/browser/sim/types.ts` was read only at the judging and loop types (lines 384-425, 540), not whole. `guidelines/testing.md` was read whole; `coding.md` and `coding-saved-game.md` whole.
- `tests/sim/saved-game.test.mjs` was read whole before changing it.

## Searches not found or unclear

- None unfound. Unclear: the handoff names 7 known `D-243` quotation errors; the check shows 5 (`tests/sim/loop.test.mjs` is no longer in the list, apparently changed by slice 5).

## Choices (with the way rejected)

- One commit for the code and the tests: the raise of the version and the document stand or fall together (`guidelines/coding-saved-game.md`). Rejected: two commits (a commit with the raise alone would leave the tests red).
- The old document of version 8 is kept with the old shape of the loop (`loopOf` is unchanged, `countedLoop` adds the two counts), so the documents of versions 3 to 8 keep their shape as they were written. Rejected: adding the counts to `loopOf`, which would have rewritten the old documents.
- 10 maps: measured on synthetic keys, not extrapolated by arithmetic; the load cannot take them (stated). Cost if wrong: the keys of future maps may be shorter or longer than 10 characters, by a few bytes per judging.

## Working copies

The directory `.runs/executor-6/` (the script `measure.mjs`, its output, the output of the checks) stood under the worktree's ignored `.runs/` and is removed. What the report needs is kept in `reports/`: `slice-06-measure.mjs` and `slice-06-measure-output.txt`. Loose files of the mutation runs under `.runs/` were removed too. No remainder.

Class of model: `same` was enough.
