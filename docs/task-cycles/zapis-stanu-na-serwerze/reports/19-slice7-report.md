# Slice 7 report

**Status:** done with concerns (meanings for the human's approval below)

**Commit:** `483f5dc` — guidelines only.

## Files changed
- `guidelines/coding-saved-game.md` (new, ~140 lines): kind file, exemplar `src/browser/sim/saved-game.ts` (D-190); rules: simulation isolation, unchanged arguments, refusal instead of throw, version raised with the shape (M3 carried).
- `guidelines/coding.md`: index row `saved-game`; simulation-module row narrowed; the deferred sentence now says the kind exists.
- `guidelines/coding-simulation-module.md`: *When to read* excludes the file.
- `guidelines/coding-browser-module.md`: § „Gra na stronie i odpowiedzi serwera” rewritten to the page of Slice 6 (also the `createGameView` return value and the wait for the saved game state, the points from Slice 6).
- `guidelines/coding-database-access.md`: rule „Otwarcie schematu bez utraty danych” (text and *Good*) names saved game states.

## Checks
- `python -B .the-way/elements/common/foundation_check.py` — exit 0, "0 errors".
- Not run: `check_instructions.py` (needs a repo root argument; not in the slice's checks); `npm test` (forbidden).

## Own-work check
Requirement most likely missed: the kind boundary drawn "as content-data does" and every rule of decision 5. Checked by comparing the new file's form with `coding-content-data.md` and the template; foundation_check passes (decision numbers, invariants `simulation-isolation`, `simulation-inputs`, `save-version`, part `simulation`).

## Reach beyond the dispatch
`foundations/decisions.md` D-183, D-184, D-185, D-189 (named by text of D-186/D-96 and needed for sentences and the pause); `tests/sim/saved-game.test.mjs` test names and `save-version` markers (grep) to choose the invariants; `src/browser/view/game-saver.ts` whole.

## Choices
- Invariant for rules 3 and 4: `save-version` (its tests cover version, archetype, crafted current-version documents); the pinned-document pair is checked by review, said in the text. Rejected: `none` for both — loses the real tests.
- Fenced good/bad blocks for the two simulation rules use invented paths as in sibling files. No test reads them (grep found none).
- The browser-module section says 401 on a save is recognised by the saver and reported by `onSignedOut` (the code's shape), where the old text said the page recognises it.

## Searches not found or unclear
- The M3 fix in the code comment of `SAVED_GAME_VERSION` (`saved-game.ts:53-56`) is code, not mine; the guideline carries M3, the comment still says less.
- The plan's "Foundation entries rows 3, 9 ..." were found at the ranges the handoff gave; none missing.

## Meanings needing the human's approval (WAY-172)
1. `coding-saved-game.md` as a whole: the new kind, its four rules, and its *When to read* that replaces `coding-simulation-module.md` for the file.
2. In rule „Wersja podnoszona razem z kształtem”: changing paces, map width/height, identifiers or the nature-energy cap does not raise the version and makes saves of the current version refused as damaged („Zapis był uszkodzony…”). Source: spec decision 2 (identifiers) and M3 (the rest, executor's choice 4). Options: keep as written; or require a raised version for those changes too (then they are refused as another version). Recommendation: keep as written.
3. `coding-browser-module.md`: the sentence that a failed session or saved-game request is one warning with retry while save failures have own sentences — from spec decision 10.
