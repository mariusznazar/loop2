# Report — executor of slice 8: the saved game: a character numbered as the next number is refused

**Status:** done

**Commit:** `4f75e190fe824fc420f15df6eaa7d087fb7ea018` (base `cac04185766066e163fed8049f57d17a171daf67`)

**Files changed:** `tests/sim/saved-game.test.mjs` (+23, -0). Nothing under `src/` changed (`git status --short -- src` empty).

## Step 1 — the existing cases on the changed comparison

Changed `id >= nextCharacterId` to `id > nextCharacterId` at `src/browser/sim/saved-game.ts:521` (in `team`) and ran the file before adding anything.

- `npm.cmd test -- tests/sim/saved-game.test.mjs` with the change: exit 0, `tests 39, pass 39, fail 0` (output kept in `.runs/executor-8-mut1.txt`). `dist/browser/sim/saved-game.js:393` showed `id > nextCharacterId`, so the build used the change.
- So no existing case or variant of `CRAFTED` fails on it. The variant `"a character's number reaching the next one"` (`tests/sim/saved-game.test.mjs:1388`, sets `nextCharacterId = 2` on `DOCUMENT`) is not enough: `DOCUMENT` holds characters 1, 2 and 3, so with the comparison changed Ewa (number 3) is still refused by `3 > 2`, and character 2 passes unseen. The variant fails to isolate the number equal to the counter, so the slice added a case.

## Step 2 — the case added

`a character whose number is the next character number is refused as shape, the rest of the document sound` in `tests/sim/saved-game.test.mjs`, placed beside the case of two characters of one number, marked `// invariant: save-version`, in the pattern of the existing program case (`a program whose number is not below the next program number ...`).

- Input: `HEADQUARTERS` (one character, number 1, next number 2, a loop only for character 1) plus a second character, number 2, "Ewa", copied from the first.
- Precondition: the same document with `nextCharacterId = 3` loads (`ok === true`), so the document is sound apart from the number.
- Assertion: with `nextCharacterId = 2` the load gives `{ ok: false, reason: "shape" }`, through `assertRefused`.
- Break it catches: `>=` made `>` (a bug: a character numbered as the next number would load, and the next character the game creates would take a number already held). Expected values are literals; the source is D-56 (verification: "a character's number reaching the next one, refused") and `save-version`.

## Checks

| Check | Command | Exit code | Result |
|---|---|---|---|
| Changed comparison, before the case (step 1) | `npm.cmd test -- tests/sim/saved-game.test.mjs` | 0 | 39 pass, 0 fail (no case caught the change) |
| New case, source as committed | `npm.cmd test -- tests/sim/saved-game.test.mjs` | 0 | 40 pass, 0 fail |
| New case, comparison changed to `>` (red) | `npm.cmd test -- tests/sim/saved-game.test.mjs` | 1 | 39 pass, 1 fail: the new case, `AssertionError: a character numbered as the next character number`, actual `{ ok: true, state: ... }`, expected `{ ok: false, reason: 'shape' }` |
| New case, comparison restored (green) | `npm.cmd test -- tests/sim/saved-game.test.mjs` | 0 | 40 pass, 0 fail |
| `git status --short -- src` after restoring | `git status --short -- src` | 0 | empty |
| Format | `npx.cmd prettier --check tests/sim/saved-game.test.mjs` | 0 | passes |
| Lint | `npx.cmd eslint tests/sim/saved-game.test.mjs` | 0 | passes |

The source file was restored with `git checkout -- src/browser/sim/saved-game.ts` after each change (`git diff --stat -- src` empty both times) and was never committed in changed form. I did not run the gate (`npm.cmd test` without a file) or `gate_times.py`.

## Own-work check

Requirement most likely not met: To do 3 — a case that fails when `>=` becomes `>`, not one that fails for another reason. The check: the red run above fails with the document loading (`ok: true`) where `shape` was expected, and the precondition line shows the document is sound without the equal number; the red run fails only the new case and no other. The earlier run (step 1) showed why the existing variant could not serve.

Mutation in the head of the neighbouring behaviour: `ids.has(id)` removed is caught by the existing case of two characters of one number; a missing `refuse` for a number below zero is out of this slice (`identity` reads it).

## Reaches beyond the handoff

None.

## Working copies

None made. The files `.runs/executor-8-mut1.txt`, `.runs/executor-8-green1.txt`, `.runs/executor-8-red.txt`, `.runs/executor-8-green2.txt` are test outputs under the ignored `.runs/` of the worktree (not committed); the worktree is clean.

## Choices

- Chose `HEADQUARTERS` with a pushed second character over editing the `DOCUMENT` variant of `CRAFTED`: `DOCUMENT` has three characters and a manual map run, so a document of it sound but for one number would need several edits; the program case beside it uses the same route. Rejected: changing the existing `CRAFTED` variant (would weaken or reshape a passing variant without cause). Cost if wrong: one extra case remains.

## Concerns

None. Note for the reviewer: the plan's Read ranges for the foundation shifted (as the handoff gave them); I read the current ones.

**Unread material:** `tests/sim/saved-game.test.mjs` was read in part, not whole: lines 1-1288 (whole documents and the start of `CRAFTED`), 1375-1404, 2320-2369, and the greps for `nextCharacterId` and `CRAFTED`; the rest (about 1,800 lines of other cases) was not read. Everything else the handoff names I read whole, `guidelines/testing.md` in two pages.

**Searches not found or unclear:** none
