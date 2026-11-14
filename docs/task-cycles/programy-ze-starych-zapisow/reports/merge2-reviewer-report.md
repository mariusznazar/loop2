FAIL 413aae29

# Review of the second merge of the target branch (merge 413aae29, renumbering bfe7fe06)

Head confirmed: `git rev-parse HEAD` = 413aae29e4ba65821516f982583987a5bc0d9f5d; first parent bfe7fe06, second parent ee2835a3 (origin/main). Worktree clean.

Summary: the foundation side holds together (renumbering is mechanical and complete; both sides of decisions.md and invariants.md survive field by field). The test side does not: the target raised `SAVED_GAME_VERSION` to 6 and made Las open only after Skraj lasu, and three places of this change's tests still assume the old state. Nothing was run (hard limit), so the failures below are shown by reading the code, not by a test run.

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

## Checked and found sound

- Renumbering: `git show bfe7fe06` has 129 changed lines in 22 files; a script comparing each removed line with its added line after applying "D-397..D-400 -> +2" found 0 mismatches and 0 changed lines without such a number. In the merged tree (`git grep` of D-397..D-402, excluding `.runs`) every D-399..D-402 reference means this change's decision (previous save, privilege, pull, reset), and the target's own D-397 and D-398 references (decisions.md D-397/D-398 headers and rationale, invariants `first-map-stock` and `first-map-balance`, `tests/invariants/test_map_run_tiles.py:42`, `tests/sim/data.test.mjs:32`) are untouched. No leftover of the form "D 399", "D-398..D-400" or a range.
- Conflict resolution in `foundations/decisions.md` and `foundations/invariants.md`: split into entries (by D-number and by `## id`), each entry of the merged file compared with the three-way expectation from merge base f0814d77, the task branch at bfe7fe06 and origin/main. Decisions: 403 entries (399 target + D-399..D-402 of this change, 397 base); every entry equals the side that changed it; D-121 equals the target's, D-210 equals this change's (title and text); D-396 and D-398 differ from the target only by one trailing blank line between entries. Both sides changed none of the same entry. The preamble before the first entry equals both sides. Order: D-397, D-398 (target), then D-399..D-402. Invariants: 136 entries (134 target + 2 of this change); every entry equals the changed side; `first-map-balance` has `- **Part:** simulation` and `- **Violated:** no`; order is the target's entries first, then `previous-save-slot` and `previous-save-programs-reader`, then the withdrawn table.
- Foundation text that names versions: D-206 says the game loads only a saved game state of its current version; D-210, D-399 use "a save of version 6 accepted over a stored saved game state of version 5" as an example, which is now the real case; D-401 uses "a document of version 2". No sentence says the current version is 5 or that the schema version equals the saved-game version. The invariants `previous-save-slot`, `previous-save-programs-reader` and `save-version` name no number. The "version 5" sentences in `.claude/skills/loop2-deploy` (and the `.agents` twin) and `tests/account-storage.test.mjs:185` are about the database schema (5), which this merge did not change; `SAVED_GAME_VERSION` and the schema version are kept apart.
- The reader's bound: `readableVersion` accepts 1 to `SAVED_GAME_VERSION` and reads the constant, so it reads versions 1 to 6 now (the code is right; the tests are the problem, findings 1 and 2).
- Server and deploy tests (`tests/account-storage.test.mjs`, `tests/http.test.mjs`, `tests/account-api.test.mjs`, `tests/transport.test.mjs`, `tests/account-backup.test.mjs`, `tests/deploy/test_account_storage.py`, `tests/deploy/test_account_backup_stream.py`): the server stores the document opaquely and compares version numbers it is given; none imports `SAVED_GAME_VERSION`, none writes a document of "the current version" of the game; schema version 5 is unchanged. Nothing to adapt.
- `tests/view/previous-save.test.mjs:1109` builds the saved document with `savedGame(...)`, which writes the current version, and the other view builders use `newGame()` (the target's change to the saved document for a game that reached Las does not reach them).
- `stryker.config.json`: the merged file differs from origin/main by one line only, `tests/sim/previous-programs.test.mjs`; `tests/sim/first-map-balance.test.mjs` (target) is present too. Both lists kept.
- Guideline text about what raises the version of the saved game state: `git diff bfe7fe06 413aae29 -- guidelines` is empty, so the target changed no guideline; the rule is the comment above `SAVED_GAME_VERSION` (shape of `GameState`, items of the data, ordinary actions of the data). This change does not change the shape of the saved game state, so it needs no raise. (The comment does not name maps, which the target's new map relies on a raise for; that is the target's, outside this task.)
- `loop2-play` skill and its `.agents` twin: changed identically by the target (diff of both is the same hunks); nothing of this change touches them.
- The target's `offeredResources` change in `src/browser/view/program-editor.ts` does not reach this change's files.

## Declined to judge

- The target's own decisions D-397 and D-398, the first-map balance test and the rest of the 80 files of the target's diff: outside this task; read only where they bear on this change.
- Whether the comment above `SAVED_GAME_VERSION` should name maps: the target's, outside this task.

## Checks run

- `git rev-parse HEAD` — 413aae29e4ba65821516f982583987a5bc0d9f5d, exit 0.
- `git status --short` — empty, exit 0.
- `git log`, `git diff --stat bfe7fe06 413aae29`, `git diff bfe7fe06 413aae29 -- src stryker.config.json README.md .claude .agents`, `git diff origin/main HEAD -- ...`, `git show bfe7fe06 --stat`, `git grep` for D-397..D-402 and for the version words, `git show <rev>:<file>` of decisions.md and invariants.md at origin/main, bfe7fe06, 413aae29 and f0814d77 — exit 0 each.
- Two Python scripts (read-only, in the scratchpad `...\scratchpad\merge2rv\`): the renumbering comparison (129 lines, 0 mismatches) and the entry-by-entry three-way comparison of both foundation files (output summarised above) — exit 0.
- `python -B .the-way/elements/common/foundation_check.py` — exit 0, "0 errors". The-way pin verified: `git -C .the-way rev-parse HEAD` equals `git ls-files --stage -- .the-way` = 55afa8e57aa1b83c77108576a36642722e0dda15.
- Not run (hard limit): every `npm` command, `npm test`, the build, typecheck, formatter, linter and any single test. The three failures above are inferred from reading the reader, `send`, `canSendMap` and the tests; they are not observed.

## Reach beyond the dispatch

- `src/browser/sim/game.ts:84-92, 445-455` (`canSendMap`, `send`): to confirm that sending to Las without Skraj lasu solved throws (finding 3).
- `src/browser/sim/previous-programs.ts` whole and `src/browser/sim/saved-game.ts:70-80`: the reader's bound and the version constant (findings 1, 2).
- `src/browser/sim/data/maps.ts` diff and `tests/sim/understanding-fixture.mjs` tail: `opensAfter` and `withEdgeSolved`.
- `tests/view/account-screen.test.mjs` and `tests/sim/program-list.test.mjs` diffs: how the target adapted its own sends to Las.
- decisions D-206, D-210, D-399..D-402, D-213, D-112: only the lines naming a version (not whole); D-397 and D-398 whole; invariants `previous-save-slot`, `previous-save-programs-reader`, `save-version`, `first-map-stock`, `first-map-balance` whole.

## Unread material

- Everything the handoff named for the merge itself was read; the handoff whole, `.the-way/task-cycle/review/SKILL.md` whole.
- Not read whole: D-206, D-210, D-399, D-400, D-401, D-402, D-213, D-112 (only their version-bearing lines; their field-by-field equality with the sources was compared by script, not by reading). Guideline files (`guidelines/coding.md`, `testing.md`, `styleguide-browser-view.md`, `coding-simulation-module.md`) not read; only `git diff origin/main HEAD -- guidelines` and a grep. The tests of the target (`tests/sim/saved-game.test.mjs`, `first-map-balance.test.mjs`) and `tests/sim/previous-programs.test.mjs` / `tests/view/previous-save.test.mjs` were read in the parts named above, not whole. The server source and `src/browser/view/*` of this change not re-read (reviewed before the merge; outside the question of the merge).
- The decision screening of section 1 (counts by title) belongs to the review of the whole change, not this one.

## Searches not found or unclear

- The handoff's item (6), "the guideline text about what raises the version of the saved game state (target)": no guideline file holds such text, the target changed no guideline, and the only such rule found is the comment above `SAVED_GAME_VERSION` in `src/browser/sim/saved-game.ts`. I took that as the text meant; if a different file was meant, it is unread.
- The handoff's item (3) names a helper or fixture the target changed ("the saved document of the current version and its headquarters variant the maps of a game that reached Las"): I found the target's change in `tests/sim/saved-game.test.mjs` and `understanding-fixture.mjs` (`withEdgeSolved`) but no fixture of that description that this change's tests use; the closest is the break of finding 3.
