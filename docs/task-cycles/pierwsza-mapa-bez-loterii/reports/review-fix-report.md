PASS 3b378a8b05774980d6726a9940704d629adc2066

# Review of the fix of the Minor findings M1-M4

Range `23981674..3b378a8b` (`git rev-parse HEAD` = `3b378a8b05774980d6726a9940704d629adc2066`, as given). Three commits: `c6a1c17b`, `fb85bf26`, `3b378a8b`; 4 files, +9 −6 (`tests/sim/saved-game.test.mjs`, `src/browser/view/program-editor.ts`, `tests/view/program-editor.test.mjs`, `foundations/invariants.md`). I computed the diff myself. Bounded by the findings file (`reports/findings-whole-minor.md`: M1-M4); read-only; `git status --short` empty after my checks. No new Critical or Important finding in the fix diff.

## Each finding

**M1 — fixed.** `tests/sim/saved-game.test.mjs:668` (`DOCUMENT`) now reads `solvedMaps: ["forestEdge", "forest"]` and `:710` (`HEADQUARTERS`) the same, so the docstring and header comment (`:54-55`, `:665`) are true. Evidence: `grep -n solvedMaps` on the new head shows both lines; the case that loads `DOCUMENT` and `HEADQUARTERS` passes (below). The two `["forest"]` left at `:447` (`DOCUMENT_V2`, an old document kept as it was) and `:2487` (a game sent to Las — głębiej) are not what M1 named and are right to stay.

**M2 — fixed.** `src/browser/view/program-editor.ts:177-182`: the comment now ends "…since while the game holds no map run every discovered target may be picked (D-289)", which is D-289's binding sentence. The test (`tests/view/program-editor.test.mjs:694-`) starts from `newKnowingGame()`, asserts `game.solvedMaps` is `[]`, expects all four resources, then sends from `withEdgeSolved(game)` to Las (four) and from the unsolved game to Skraj lasu (two). With nothing solved only Skraj lasu is open, so a variant offering the open maps' resources would give two and fail; the author's red run (`[MAPS.forestEdge]` instead of `Object.values(MAPS)`, exit 1, then exit 0) is consistent with that, and I judged it from the code rather than repeating it. Code change is a comment only; behaviour untouched.

**M3 — fixed.** `foundations/invariants.md` `first-map-balance` now reads "…a decent program of twelve rules solves the map in at least 95 % of several hundred map runs that its test names, and a naive program of six rules in at most 50 % of them." The count, the clock constant and the entrance-tile clause are gone; this matches the approved row ("kilkuset ziaren, które sam wymienia") and no longer states a claim no test asserts. *Derives from* D-396 · D-397, *Method* `test`, citing tests unchanged. `foundation_check.py` exit 0, "0 errors". One leftover, new and Minor, no block: the comment at the head of `tests/sim/first-map-balance.test.mjs` still says the naive program "never leaves the entrance tile"; the author names it in the fix report. It is a statement in a test comment about the program (the file's header), not in the foundation, and the six-rule program in the test has no walking rule, so it is true of the program as written; it is not asserted.

**M4 — answered; nothing owed within the task.** The fix report describes five screenshots taken by the `loop2-play` route (new-game list holding „Skraj lasu” alone with „Wybierz mapę z listy.”; the card of Skraj lasu; the list after Skraj lasu solved; the card of Las with „odsłania ją Skraj lasu”; the editor's target pick with four resources). They lie only in `.runs/task-cycles/pierwsza-mapa-bez-loterii/screenshots/` (ignored: `git check-ignore -v` names `.gitignore:1:.runs/`; `git ls-files` shows no such file tracked). I opened two of them (`the screenshot of the new game's screen Mapy`, `the screenshot of the card of Las`) and they show what the report says: a one-row list in a new game with the right area saying to pick; the card of Las with the heading „Las · odsłania ją Skraj lasu” (opener in the secondary colour), „Żąda”, „Teren” (`bez ognia 83 min — otoczenie 25 °C`), four resources with icons, and „Kto idzie”; "rozwiązana" in green after Skraj lasu in the list; nothing clipped. The description therefore answers M4. Still unchecked, as the report says: the editor with nothing solved in a real browser (only the jsdom test of M2 covers it; the rendering is the same list, so I do not ask for more), and the screen of a map run on Skraj lasu (never in the findings). Where the foundation settles a place for screenshots shown to the human: none outside the repository was settled, so the request must say the screenshots were inspected and are not shown (WAY-317); the author did the same.

## Fix diff, what it could have broken

Comment, a test and a foundation sentence only; no behaviour of the game changes. The test still passes for the right reason: the first assertion now fails if the function reads only the first or only the open maps.

## Checks (command, exit code)

| Command | Exit | Reading |
|---|---|---|
| `npm run build` | 0 | |
| `node --test tests/sim/saved-game.test.mjs tests/view/program-editor.test.mjs tests/sim/first-map-balance.test.mjs` | 0 | 102 tests, 102 pass, 0 fail (same count as before the fix; no test added or lost) |
| `python -B .the-way/elements/common/foundation_check.py` | 0 | "0 errors" |
| `git check-ignore -v .runs/task-cycles/pierwsza-mapa-bez-loterii/screenshots/the screenshot of the card of Las` | 0 | ignored by `.gitignore:1:.runs/` |
| `git ls-files | grep -i "png" | grep -i "mapy\|screenshot"` | 1 (no match) | no screenshot is tracked |

Not run: `npm test` (the cycle's), the mutation tool (the fix changes no file of the simulation), the red run of M2 (taken from the author's report), any browser check.

## Reaches beyond the dispatch

None beyond opening two screenshots of the ignored directory to compare them with the fix report's description.

## Unread material

The other three screenshots (`the screenshot of the card of Skraj lasu`, `the screenshot of the list after Skraj lasu is solved`, `the screenshot of the program editor's resource pick`) were not opened; the report's description of them is unverified. D-289 beyond its binding sentence and *Verification* (read in the first review) was not re-read. The decisions and guideline files are as in `review-whole-report.md`; nothing new was selected.

## Searches not found or unclear

none.
