# Executor report — slice 3 of correction 1, task `ocena-programu-na-ziarnach`

**Status:** done

## Commit

- `aaef0873` — feat: :sparkles: previous-save reader knows the content revision; guideline names no highest version (base `bc386205`).

## Files changed (added / removed lines)

- `src/browser/sim/previous-programs.ts` (+29 / -12 approx.; `git diff --stat` of the commit shows the exact count): `readItem` takes the document's version; keys are exactly `id`, `name`, `program`, `contentRevision` from version 9 (constant `FIRST_VERSION_WITH_REVISION`), exactly the first three before it; the revision's value is neither read nor checked and the result holds no revision (the pull makes revision 0, `appendPrograms`); `readableVersion` became a type guard.
- `tests/sim/previous-programs.test.mjs`: see below.
- `tests/view/previous-save.test.mjs`: one `decision:` line (D-401 key sentence) follows the new wording; nothing else.
- `guidelines/testing.md`: the row of `src/browser/sim/previous-programs.ts` in "Trust boundaries".

## What I wrote in the tests

- Title of the table case, now: „a document of each readable version, the current one included, gives its programs in order, a program without a trip plan skipped and named" (no version number; the body checks versions 1-8 with three-key items and version 9 with four-key items, same expectations as before; `SAVED_GAME_VERSION === 9` precondition stays in the body).
- Case „an item with a key besides id, name and program ..." retitled „an item with a key besides those of the items of its version is skipped and named, and the others go on" and extended: foreign key at version 5 and at version 9.
- New: „an item of a document of version 9 holds the content revision, which is neither read nor checked, and the result has no revision to pull" (values 0, 1, 7, 2**53-1, -1, 1.5, 2**53, "7", null, [], {} all read; result holds no revision).
- New: „an item of a document of version 9 without the content revision, and one of a version from 1 to 8 with it, is skipped and named" (also a renamed key `revision`, a missing `id`, an extra key, and an own key `__proto__` made by `JSON.parse`).
- `DOCUMENT` (current version) items now carry `contentRevision`; the "nothing beside ... is read" case now runs on version 9 with items holding `contentRevision`, so a read of that key would show.
- The `decision:` lines quoting D-401's key sentence (3 in this file, 1 in the view test) follow its new wording from the sentence's beginning; the new cases quote D-401's second paragraph ("Each program appended starts at the content revision 0, ...") and D-442's first sentence prefix.
- `guidelines/testing.md` row 177 names the renamed cases and the two new ones by their exact titles, no highest version number (it said „from 1 to 5", already stale).

## Checks (command, exit code)

- Failing first: `npm test -- tests/sim/previous-programs.test.mjs` after writing the tests, before the reader change: exit 1, 6 failing (the 4 changed or new cases, plus the frozen-document and shares-nothing cases whose document now holds four-key items), each by an assertion against the reader that still wanted three keys.
- After the change: `npm test -- tests/sim/previous-programs.test.mjs` exit 0 (21 pass, 0 fail).
- `npm test -- tests/view/previous-save.test.mjs` exit 0 (46 pass).
- `npm test -- tests/invariants/test_simulation_inputs.py` exit 0 (2 tests OK).
- `npm run typecheck` exit 0.
- `npx eslint` on the three code/test files: exit 0.
- `npx prettier --check` on the three code/test files: pass. `guidelines/testing.md` fails Prettier, and did before my change (`git show HEAD:guidelines/testing.md | npx prettier --check` exit 1); I did not reformat it.
- `python -B .the-way/elements/common/foundation_check.py --skip-test-citations`: exit 1, 7 errors, all in files not mine (`tests/sim/judging-record.test.mjs`, `tests/sim/saved-game-judgings.test.mjs`, D-440/D-165 quotations). None names `tests/sim/previous-programs.test.mjs`, `tests/view/previous-save.test.mjs` or `guidelines/testing.md`.
- `python -B .the-way/elements/common/foundation_check.py` (with citations): exit 1, 8 errors; the eighth is `foundations/invariants.md:1472` `judging-cache-reading` with no test yet (not this slice). None names my files.
- No agent test reads `guidelines/testing.md` for case titles (searched `tests` and `scripts`: only `tests/flaky-tests.md` and `tests/invariants/test_terrain_drawing_numbers.py` mention it, unrelated). Full gate not run, per handoff.

## Own-work check

Requirement most likely missed: the reader must skip a version-9 item without the revision and a version-below-9 item with it, with the boundary exactly at 9, and take no crafted shape. Check: the new skip case covers version 9 with three keys, four keys with a renamed key, a missing `id`, five keys, and an own `__proto__` key, and versions 1, 5 and 8 with the four-key item (skipped); the read case covers version 9 with every hostile revision value; the existing sweep that puts 15 hostile values at every place of a current-version document (which now includes `contentRevision`) still throws nowhere. Result: all pass. Mutation in the head: `>= 9` to `> 9` fails the version-9 documents; dropping the key check on version 9 fails the skip case; reading the revision value would fail the "nothing beside ... is read" case.

## Reaches beyond the handoff

none beyond reading the entries D-401, D-442 and invariant `previous-save-programs-reader` whole (they were named by their rows).

## Concerns / notes

- Pre-existing: `guidelines/testing.md` is not Prettier-clean at the base.
- Pre-existing errors of the foundation check in other files (list above) are for other slices.

## Unread material

- `.the-way/product-guidelines/testing/template.md:180-200`: read lines 175-205. `guidelines/coding.md`, `guidelines/coding-simulation-module.md`, `guidelines/styleguide-browser-view.md`, `src/browser/AGENTS.md`: not read whole (the change is a few lines in an already-shaped reader and tests; I followed the file's own conventions). `foundations/part_map.md:33-64` and `foundations/invariants.md:1048-1056` (save-version): not read (the reader and tests already cite them; the version bound is unchanged). `slice.md` read whole; `SKILL.md` read whole. Plan rows 2, 7, 9 read as the foundation text of D-442, D-401 and the invariant.

## Searches not found or unclear

none

## Working copies

none made; no remainder.
