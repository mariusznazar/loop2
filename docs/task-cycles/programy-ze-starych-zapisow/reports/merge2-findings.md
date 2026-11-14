# Findings of the review of the second merge `413aae29` (renumbering `bfe7fe06`), in the reviewer's words

Source report: `docs/task-cycles/programy-ze-starych-zapisow/reports/merge2-reviewer-report.md` (`FAIL 413aae29`). The three blocking findings and the one Minor finding, which the fix of this merge review fixes together (the Minor one is inside the same two files).

## Blocking findings

### 1. Important — `tests/sim/previous-programs.test.mjs:383`: version 6 is still used as "a version above the current one"

Test "a document of another version or with no whole version is unreadable" (invariant save-version) loops `for (const version of [6, 0, 1.5, -1, "5", 2 ** 53, null, undefined])` and expects `{ ok: false }` for each. The reader's bound is `value <= SAVED_GAME_VERSION` (`src/browser/sim/previous-programs.ts`, `readableVersion`), and `SAVED_GAME_VERSION` is now 6 (`src/browser/sim/saved-game.ts:80`, raised by the target). So `{ version: 6, game: { programs } }` is now readable and returns `{ ok: true, items: [...] }`; the assertion for 6 fails. Why it matters: the gate (`npm test`) fails on the merged tree, and the one boundary the invariant save-version protects (versions above the current one are refused) is left with no case that is actually above the current version.
Evidence: sed of the test lines 380-392; `readableVersion` lines in previous-programs.ts; `git diff bfe7fe06 413aae29 -- src/browser/sim/saved-game.ts` (`5` -> `6`).
Expected fix (for the author): use 7 in the list (better, derive nothing from the source: write 7 out, as the test file says every expected value is written out) and add a case that version 6, the current one, is readable (the document on line 72 is called "the document of the current version" but carries `version: 5`; make it 6 or rename it). Without a case for the current version, replacing `<=` by `<` in `readableVersion` is not caught by any test (the test at 131 reads versions 1 to 5 only).

### 2. Important — `tests/view/previous-save.test.mjs:524`: the same assumption in the view test

`previous([item(1, "Las", LAS)], 6)` is listed among the "unreadable document" cases (comment on line 518: "a version above the game's"). With the current version 6 the pull reads it, appends "Las", and the test's expectation (`listed(view)` equals `[ [1, "Program"]]`, the sentence of no readable program, nothing saved) fails. Same consequence as finding 1. Fix: 7 in place of 6 on line 524. The default `version = 5` of `previous` (line 243) and `{ version: 5, ... }` on line 525 are still readable and need no change (they would read better as 6 for the current version, Minor).
Evidence: lines 242-246 and 515-535 of the file; reader bound as in finding 1.

### 3. Important — `tests/view/previous-save.test.mjs:259-265`: `going()` sends the character to Las from a game in which Skraj lasu is not solved

```
const going = () =>
  send(createCharacter(twoPrograms(), "Ala").state,
    { mapId: "forest", characterId: 1, programId: 1 }, 0).state;
```
`twoPrograms()` is `createProgram(newGame()).state`, so `solvedMaps` is empty. The target made Las open only after Skraj lasu (`MAPS.forest.opensAfter = "forestEdge"`, `src/browser/sim/data/maps.ts`), and `send` throws `send: map forest is not available` when `canSendMap(state.solvedMaps, mapId)` is false (`src/browser/sim/game.ts:451`). `going()` is called in the test "the pull works while a manual map run goes on and while one has ended" (line 730 onward, three cases), which therefore throws. The target adapted every test of its own tree that sends to Las (`withEdgeSolved` in `tests/sim/understanding-fixture.mjs`, `solvedMaps: ["forestEdge", "forest"]` in `account-screen.test.mjs`, `tests/sim/program-list.test.mjs`); this change's new file was not on the target and so was not adapted by it, and the merge could not show it as a conflict.
Fix: send to `forestEdge`, or build from `withEdgeSolved(twoPrograms())` (the fixture already exists), and keep the comment on line 259 true. The assertions of that test (`after.run` equals `before.run`, the programs appended) do not depend on the map.
Evidence: grep for `mapId: "forest"` in this change's tests (only previous-save.test.mjs:263 is one this change added without the fixture; `tests/sim/program-list.test.mjs:28` uses `MAP_ID = "forest"` but its `team()` was adapted by the target with `withEdgeSolved`).

## Minor

- `tests/sim/previous-programs.test.mjs:70-72` and `tests/view/previous-save.test.mjs:199`: "the document of the current version" / "a program of versions 3 to 5" now name 5 as the latest version; the programs' shape is unchanged in 6, so the content is right but the label is stale (see finding 1 for the test that this lets slip through).
