PASS 4d6e4b44

# Review of the fix of the second-merge findings (range 413aae29..4d6e4b44)

Head confirmed: `git rev-parse HEAD` = 4d6e4b4426ad2848d75c1ce8f9acebac1fbe96da; one commit; worktree clean. The diff touches `tests/sim/previous-programs.test.mjs` and `tests/view/previous-save.test.mjs` only (29 insertions, 11 deletions). Nothing was run beyond git, grep and `node --check`; every claim that a test passes is by reading the code.

## The findings, one by one

1. `previous-programs.test.mjs`, version 6 used as "above the current" — **fixed**. The unreadable-version loop now starts with `7` (line 400). `readableVersion` in `src/browser/sim/previous-programs.ts` accepts a safe integer from 1 to `SAVED_GAME_VERSION` (6), so 7 gives `{ ok: false }` and the assertion holds. A case for the current version was added: document `6` in the "each version" test (title now "from 1 to 6, the current one included") with its expected two items written out; the reader returns `ok: true` with both programs read (EXPLORE and LAS are accepted as in version 5). `DOCUMENT` ("the document of the current version") now carries `version: 6`. Its users (the sweep with hostile values, the frozen document, the no-share check, the proxy fault) do not depend on the number: the hostile list has no integer from 1 to 6 for the version place, and the fault tests use their own proxies. Mutation by reading: `<=` to `<` makes version 6 unreadable and fails the document-6 assertion; a bound raised to 7 is caught by the loop value 7. The remaining `version: 5` documents (items, holes, ids, proxy reads) are readable older versions and unrelated to the bound.
2. `previous-save.test.mjs`, `previous(..., 6)` among the unreadable documents — **fixed**: now `previous([...], 7)`, which the reader refuses, so the page gives the sentence of no readable program, appends and saves nothing, as the test expects. The case `{ version: 5, game: {} }` became `version: 6` (still unreadable because the game has no program list). The default version of `previous` is now 6; every pull case reads the current version, which the reader accepts. No `5` as a version remains in the file (grep).
3. `going()` sending to Las from a game without Skraj lasu solved — **fixed**. `going()` now builds `createCharacter(withEdgeSolved(twoPrograms()), "Ala")`. `withEdgeSolved` (`tests/sim/understanding-fixture.mjs`, tracked) returns the state with `solvedMaps: ["forestEdge", ...]`, so `canSendMap(solvedMaps, "forest")` is true (`opensAfter: "forestEdge"`) and `send` does not throw. The rest of the game is unchanged: `twoPrograms()` still holds programs 1 and 2, `createCharacter` makes character 1 "Ala", and `programId: 1` exists, so the run's copy is built as before. The test then passes the state straight to `createGameView` (no load through `loadSavedGame`, so no check of the solved-map list is involved), and its assertions (the pull appends "Las" after "Program" and "Program 2", the held run equals the run before, one save) do not read the solved maps. The `ended()` variant and the paused one are built on `going()`, so they follow.
4. Minor labels "versions 3 to 5" — **fixed** in both files ("3 to 6"), and the comment above the each-version test names the current version.

## New findings from the fix diff

None Critical or Important. Notes (not blocking):
- Minor: the bound is now tested with the numbers 6 and 7 written out, so the next raise of `SAVED_GAME_VERSION` will make the tests fail until they are moved on; this is what the test file's rule (expected values written out) asks and it is what exposed the present problem.
- Not from the fix: the other `version: 5` documents in `previous-programs.test.mjs` (older, readable) are fine as they are.

## Formatter (by reading)

`prettier.config.mjs` is `export default {}`. The touched code lines are within 80 columns or are test-title lines (`test("...", () => {`, which Prettier keeps on one line and does not wrap, as the existing lines 273, 301 and others in the same file show); the added comments (one over 80 columns, on `going()`) are not reflowed by Prettier. The new object literal for document 6 and the `assert.deepEqual(readPreviousPrograms(documents[6]), {...})` block have the layout of their neighbours; `createCharacter(withEdgeSolved(twoPrograms()), "Ala").state,` fits at its indentation; the new import line is 66 columns and Prettier does not reorder imports. I found no line Prettier would change; the formatter was not run.

## Checks run

- `git rev-parse HEAD`; `git status --short`; `git log --oneline 413aae29..HEAD`; `git diff 413aae29..4d6e4b44` (and `--stat`) — exit 0.
- `node --check tests/sim/previous-programs.test.mjs` — exit 0. `node --check tests/view/previous-save.test.mjs` — exit 0.
- `grep` for `version: 5` and `, 5)` in the view test (none), `awk` for lines over 80 columns outside comments (only test titles and string lines of the earlier code) — exit 0.
- `git ls-files --error-unmatch tests/sim/understanding-fixture.mjs` — exit 0.
- Not run (hard limit): `npm`, any test, build, typecheck, formatter, linter. Whether the two files pass is judged by reading, not observed.

## Reach beyond the dispatch

- `src/browser/sim/previous-programs.ts` (`readableVersion`, `readPreviousPrograms`), `src/browser/sim/game.ts` (`canSendMap`, `send`), `tests/sim/understanding-fixture.mjs` (`withEdgeSolved`): to confirm that the changed tests agree with the code.
- `tests/view/previous-save.test.mjs` lines 127-160 (`viewOf`, `heldState`) and 730-760: the path of the state into the view.
- `tests/sim/previous-programs.test.mjs` lines 455-495, 620-715: the tests that use `DOCUMENT` and the version.

## Unread material

- The findings file `reports/merge2-findings.md` was not opened separately; its three blocking findings and the Minor one are those of my own report `reports/merge2-reviewer-report.md`, which I wrote, and the fix report lists the same four. The rest of `tests/view/previous-save.test.mjs` beyond the lines named above was not re-read; it was not changed by the fix.
- The Python tests and the server tests: not in the fix range.

## Searches not found or unclear

none
