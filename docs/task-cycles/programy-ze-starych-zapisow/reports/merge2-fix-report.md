# Report — the fix of the review of the second merge (`FAIL 413aae29`)

Commit: `4d6e4b44` (on `task/programy-ze-starych-zapisow`, range from `413aae29`). Files changed: `tests/sim/previous-programs.test.mjs`, `tests/view/previous-save.test.mjs` only.

Check line: ran `node --check` on both files (syntax ok), reading, grep. Did NOT run: `npm`, either test file, build, typecheck, formatter, linter. The formatter invariant of the gate was not run; the edits keep Prettier's layout (`prettier.config.mjs` is `export default {}`, so defaults), the only lines over the width are a test-title string and a doc comment, which Prettier does not wrap.

## Findings

1. `previous-programs.test.mjs` version 6 as "above the current" — fixed. The unreadable-version loop now starts with `7` (written out). A case for the current version: document `6` added to the "each version" test, whose title now reads "from 1 to 6, the current one included", with its expectation (both programs read) written out. `DOCUMENT` (the "document of the current version") now carries `version: 6`, so the sweep, frozen, no-share and proxy tests run on the current version.
   Mutation bound: `readableVersion` `value <= SAVED_GAME_VERSION` changed to `<` makes version 6 unreadable (`{ ok: false }`), so the document `6` assertion in the "each version" test fails (it expects `ok: true` with two items); the frozen/no-share tests on `DOCUMENT` (now 6) fail too. Changed to `<=` of a higher bound (for example `<= 7`) is caught by the loop value `7`. By reading only; not run.
2. `previous-save.test.mjs` line 524 — fixed: `previous([...], 7)` in the unreadable cases; the `{ version: 5, game: {} }` case became `version: 6` (current), and the default of `previous` is now `6`, so every pull case reads the current version, and the version 6 case is read in the view.
3. `going()` — fixed: `createCharacter(withEdgeSolved(twoPrograms()), "Ala")`, with `withEdgeSolved` imported from `../sim/understanding-fixture.mjs` (as `account-screen.test.mjs` does); the comment says Skraj lasu is solved. Assertions untouched (they do not depend on the map).
4. Minor labels — fixed: "versions 3 to 5" became "3 to 6" in both files, the comment above the each-version test names the current version.

## Other assumptions searched for in both files

- Hard-coded version as the latest: remaining `version: 5` in `previous-programs.test.mjs` (lines of the item, hole, empty-list, id, hostile, proxy tests, and the Map/class-instance case) are older versions, still readable and unrelated to the bound; left unchanged on purpose (the reader's behaviour for them does not depend on the version). In the view file no `5` as version remains.
- A map id a new game cannot enter: only `going()` (the one `mapId: "forest"`); `previous-programs.test.mjs` has no map. The view file has no other `send` call or `#/mapy` route.
- Picking by position: `held.saves[0]` and `programs[1]` in the checks are positions in the result of the pull / list the test itself builds (program order is the thing under test); no character, item or map picked by position from game data. None changed.
- `savedGame(...)` at line 1110 of the view test takes its version from the constant, so it follows.

## Reach / Unread material / Searches

- Reach: the two test files only; no reader or view file changed (not needed).
- Unread material: the reviewer's report `merge2-reviewer-report.md` (the findings file held its evidence); the rest of `account-screen.test.mjs`; the full view test body beyond the lines grepped.
- Searches not found or unclear: none unclear; `withEdgeSolved` is not yet used in any other view test except `account-screen.test.mjs` and `body-row.test.mjs` (imports), as expected.

## Own-work check

Each finding read against its line after the edit; both files parse. Version 6 is read and 7 refused in both files by reading; no test was run.
