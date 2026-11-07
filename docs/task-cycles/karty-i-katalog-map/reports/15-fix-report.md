# Fix report — review of the whole change of `karty-i-katalog-map` (fix of the findings in `14-findings.md`)

**Status:** done with concerns (the concerns are the points for the request in M4, in I2 and in the Concerns list at the end; nothing blocks).

Base of the fix: `f0f3b0752e035cb1d8ae69a0242cc632f92a0ab1`. The-way: `.the-way` at `294af7fde45323ac1851c014a03071a97fc38d96` (`git -C .the-way rev-parse HEAD` read at the start).

## Commits

| Commit | Concern | Files |
|---|---|---|
| `a76c4e5` | I2 — foundation entries | `foundations/decisions.md` (+13 -17) |
| `3c9b2f3` | I1, M3, M5 — guidelines | `guidelines/styleguide-browser-view.md` (+7 -7), `guidelines/coding-browser-module.md` (+2 -1) |
| `c2a7853` | M1, M2, M6, M7 — code and tests | `src/browser/styles.css`, `src/browser/view/map-lines.ts`, `src/browser/view/maps-screen.tsx`, `src/browser/view/team-lines.ts`, `src/browser/view/trip-lines.ts`, `tests/view/map-lines.test.mjs`, `tests/view/maps-screen.test.mjs`, `tests/view/uncaught-failure.test.mjs` |

The worktree is clean after the three commits (`git status --short` empty). Each message ends with the `Claude-Session` line. No path or title of the private definition is in a message or in `foundations/` text; the entries hold only its wording (their `Origin` lines were already there).

## Findings

### I1 — fixed (`3c9b2f3`)
`guidelines/styleguide-browser-view.md`, rule „The screen Mapy”, item „Sekcja „Kto idzie””: the clause „a po zatrzymaniu wiersz „Pętla zatrzymana …” w `text-secondary`” is deleted. The sentence now reads „… przy postaci w pętli zarobkowej wiersz pętli w `text` z „Zatrzymaj” (D-244); „Program:” w `text-label` z listą programów; …”. This matches the code (`maps-screen.tsx`, `CharacterRow`: the loop line and „Zatrzymaj” only while `loop` exists, no stopped-loop line) and D-245 as the task keeps it. Check: the foundation check (`foundation_check.py`, exit 0) and the quality invariants (exit 0); no test reads the styleguide text.

### I2 — fixed, with the entries compared (`a76c4e5`)
I read the approved definition (the private note named in the handoff) and copied its *Rationale* and *Rejected* into each entry the plan's *Foundation entries* lists as written whole. What I changed:

- **D-326** *Rationale* and *Rejected* now are the definition's; `unknown` is gone, and the rejected way „a new program bringing everything by default — a less conscious choice of what to bring.” stands.
- **D-325** *Rationale* gains „and numbers on the card tell that a map takes supplies. Empty places wait for maps the game does not have yet.”; *Rejected* gains „empty places for maps that do not exist yet — they promise content that is not there”.
- **D-53** *Rationale* and *Rejected* are the definition's, including „two buttons „Wejdź”, as in loop” and „sending from the headquarters beside each character — it needs a long row for each character and the map's demands stand nowhere”. The word „headquarters” stays: it names the rejected way, which was sending from the headquarters.
- **D-149** *Rationale* keeps the definition's clause „the end of the map run that opens a map names the way to it” (kept as approved, as the handoff says; the request has to name that this clause runs ahead of the game until task 16). *Rejected* drops „a new-map message on completion — adds another announcement”.
- **D-170** *Rationale* loses the clause „a character that has not gone yet takes the program the team went with last”; *Rejected* loses „a list for each map — the same pick repeated once for each map”.
- **D-180** *Rationale* loses the sentence the writer added („The card of a map shows what of the plan enters, so the player reads before a send what the map lets in.”).
- **D-188** *Rejected* reads „a warning confined to the card — omits the next restart.” as the definition has it (the writer had „the card of a map”).
- **D-243** *Rationale* and *Rejected* are the definition's (no „Accepted with it”; „a section „Pętle” with a pick of character, map and program — a second place for sending characters”; „… one click silently loses the backpack.”).

Compared and left as they are:
- **D-134**, **D-165**: both fields equal the definition's after the change above (D-134's *Rationale* is now the definition's „so the player sees where maps stand which of them a program has solved.”, which reads awkwardly; I copied it as approved, per the handoff).
- **D-251**: its *Rationale* and *Rejected* differ from the definition's (the entry adds „(D-189)”, „It stands where the line of D-188 stands, in the same role.” and „— the game speaks of a loop it does not have yet”). I did not change it: the writer of this change did not touch those two fields (the diff against the base shows only the *Origin*, the binding sentence and the verification changed), so the difference comes from the earlier task that wrote the entry, with its own sources. The finding I2 does not list D-251. Point for the request or the human: whether D-251 also goes back to the definition's text.
- **D-327 to D-332** (Settlements 1–6) untouched, as the handoff says.

A script compared the *Rationale* and *Rejected* of D-53, D-134, D-149, D-165, D-170, D-180, D-188, D-243, D-251, D-325 and D-326 with the definition's after normalising white space and the apostrophe: all equal but D-251 (above).

**Information I dropped that the base entries (before this change) held and the definition does not have** — the handoff's rule makes me drop them; I list them so the request can ask the human if any should come back: D-149 „a new-map message on completion — adds another announcement”; D-170 „a character that has not gone yet takes the program the team went with last” and „a list for each map — …”; D-243 „Accepted with it: one more button in a long row, and one click more before a send.” and „several times the view”. The first two of D-170 and the D-243 ones were in the entries on the main branch before this change, written by earlier tasks.

### M1 — fixed (`c2a7853`)
`maps-screen.tsx`: before „rozwiązana” and before „odsłania ją {mapa}” a separator „ · ” stands in a span `maps-card-sep` (`text-secondary`, `styles.css`), so the heading reads „Las — głębiej · odsłania ją Las” and „Las · rozwiązana”. Test first: two assertions on `.maps-card-heading` text in `tests/view/maps-screen.test.mjs`; the run before the change failed with `expected "Las · rozwiązana", got "Lasrozwiązana"`.

### M2 — fixed (`c2a7853`)
`styles.css` comment („under „Wejdź””), `team-lines.ts` comment („why „Wejdź” and „Puść w pętlę” are inactive”), `trip-lines.ts` comment (`entersLine`: „The line above „Wejdź””), and the case name in `tests/view/map-lines.test.mjs` („the list of maps hides maps until …”). Nothing else read these words.

### M3 — fixed (`3c9b2f3`)
In the styleguide: the sentence on the disabled „Wejdź” now reads „Wyłączony „Wejdź” (D-287) traci główny wygląd i wygląda jak każdy wyłączony przycisk (reguła States of shared controls)” (facts: `styles.css` `.button.main:disabled`; the rule States of shared controls); D-330 is no longer cited in the item „Sekcja „Kto idzie”” (it stays in the rule Menu bar, where it belongs); the run sentence reads „pod wyłączonymi przyciskami każdej postaci, w `text-secondary` (D-287)” (the code: `.maps-who-run-note` is `text-secondary`; D-287 as written settles the place and the words, not the role, so the role is stated from the code).

### M4 — contested, nothing changed
The statuses `copy` of the new rows and the change of `away-report.ts` are not settled by the task, and the template does **not** let the author of the cycle decide them: `.the-way/product-guidelines/coding/template.md` says to take every status "from the task's settlements" (line 308) and that "a choice the task did not settle is a question that stops the cycle at a blocked draft request, never a rule or a row" (line 314). The task (To do 10) asks for rows only. The statuses came from the way the file is used in the table and from the guideline's own rule „Nowy ekran i moduły w DOM” (`do not copy` = a file that builds elements through the DOM API; React and pure files are `copy`): `headquarters.tsx`, `maps-screen.tsx` (React), `map-lines.ts`, `team-lines.ts`, `map-card.ts` (pure), `away-report.ts` (pure only since this change). The table is not uniform: the pure `trip-lines.ts` stays `do not copy`, unchanged. This is a point for the request, as the handoff says; the human should confirm the statuses or the template's question.

### M5 — fixed (`3c9b2f3`)
`guidelines/coding-browser-module.md`, example „Kontrolki w DOM i ich aktualizacja”: „… a akcja poboczna, zakładka i główny wygląd poza formularzem („Wejdź” w „Kto idzie”) to rodzaje `secondary`, `tab` i `main`.” (`main` exists in both forms: `button.ts`, `react-button.tsx`).

### M6 — fixed (`c2a7853`)
`terrainLines` in `map-lines.ts` now returns `{ text, note }` lines (`TerrainLine`), the step note apart (`null` where there is none), as `resourceLines` returns the renewal. The regular expression `STEP_NOTE` in `maps-screen.tsx` is gone; the screen draws `text` and, where it exists, the note in `maps-card-note`. Test first: `tests/view/map-lines.test.mjs` now expects the new shape and failed before the change (`expected … { text: 'krok 9 min', note: ' — drożej niż zwykle' }`, got the string). The screen case with the made-up step (`tests/view/maps-screen.test.mjs`, „a step other than the usual one …”) passes unchanged, so the drawn result is the same.

### M7 — fixed (`c2a7853`)
New case in `tests/view/uncaught-failure.test.mjs` („after an error nothing handled, the buttons of the screen Mapy change no state, start no save and open no map run”, marked `invariant: uncaught-failure-game-state`): the page on `#/mapy/forest` with a solved Las and one character, an error reported to the window, then „Puść w pętlę” and „Wejdź” pressed; it asserts no save waits, „Puść w pętlę” is still there (no earning loop took it) and the address did not move. It passes (exit 0). Control run: with the error report removed from the case it fails (`no act started a save: expected [], got ["saveGame"]`), so it does catch an act that gets through; I restored the case before committing.

## Checks

All from the worktree root `the root of the task worktree` after the last edit.

| Command | Exit |
|---|---|
| `npm test -- tests/view/map-lines.test.mjs` (before the code change, to see the failure) | 1 (shape of `terrainLines`, as expected) |
| `npm test -- tests/view/maps-screen.test.mjs` (before the code change) | 1 (`expected "Las · rozwiązana", got "Lasrozwiązana"`) |
| `npm test -- tests/view/map-lines.test.mjs` | 0 |
| `npm test -- tests/view/maps-screen.test.mjs` | 0 |
| `npm test -- tests/view/uncaught-failure.test.mjs` (control run without the error report) | 1 (`no act started a save`) |
| `npm test -- tests/view/uncaught-failure.test.mjs` | 0 (14 pass) |
| `npm test -- tests/invariants/test_browser_view_token_values.py` | 0 |
| `npm test -- tests/invariants/test_browser_view_focus_outline.py` | 0 |
| `npm test -- tests/invariants/test_content_identifiers.py` | 0 |
| `npm test -- tests/quality/test_quality_invariants.py` | 0 |
| `npm run typecheck` | 0 |
| `python -B .the-way/elements/common/foundation_check.py` | 0 (0 errors) |
| `npx prettier --write` on the changed source and test files | 0 (one source file reformatted before the checks) |

Not run: the full `npm test` (the cycle's gate); the real browser (the heading separator and the note drawing are covered by jsdom cases only; the look of the separator in a real browser is for the human at the request); `tests/view/account-screen.test.mjs` and the other screen tests, which do not touch the changed functions (`terrainLines` is used only by `maps-screen.tsx`).

## Own-work check

The requirement most likely unmet: I2's "written whole as the definition approved it" — a copy done by hand can leave a clause. Check: a script took the *Rationale* and *Rejected* of 11 entries from the definition and from `foundations/decisions.md`, normalised white space and the apostrophe, and compared them. Result: all equal except D-251 (left as it is, above). Second: the heading must read as To do 4 gives it — the new heading assertions in `maps-screen.test.mjs` read „Las · rozwiązana” and „Las — głębiej · odsłania ją Las”, and both failed before the change and pass after. Third: M7's case was seen failing in the control run.

## Reaches beyond the handoff

- The approved definition (private note), read as the handoff allows, for I2.
- `.the-way/product-guidelines/coding/template.md` lines 214–316, for M4.
- `src/browser/styles.css` (`.button.main`, `.maps-who-run-note`, `.maps-card-*`), `src/browser/view/maps-screen.tsx`, `src/browser/view/map-lines.ts`, `team-lines.ts`, `trip-lines.ts` (the files the findings name), `tests/view/maps-screen.test.mjs` and `tests/view/uncaught-failure.test.mjs` whole or the parts around the cases, and `guidelines/styleguide-browser-view.md`, `guidelines/coding-browser-module.md` whole (the files I changed).
- `git -C old-loop-repo show cdc7c0d:src/components/probe/MapPage.tsx` lines 95–115, for M1: the old Loop joins the marks with „ · ” after the name.
- Changed two tests beyond the new cases: `tests/view/map-lines.test.mjs` (the terrain cases to the new shape; one case name) — both follow from M6 and M2.
- I did not run the skills `the-way-maintain-styleguide` and `the-way-maintain-coding-guidelines` for the three-line edits of the guidelines; I edited the files directly as the fix method asks.

## Searches not found or unclear

- none for the code; one unclear point: the handoff rule for I2 ("copy the definition's *Rationale* and *Rejected*") makes the fix also drop base clauses of D-149, D-170 and D-243 that earlier tasks wrote and the definition lacks (listed above); I followed the rule and report it. The definition's *Rationale* of D-134 reads awkwardly („the player sees where maps stand which of them a program has solved”); I copied it as approved.

## Choices

- Separator as its own span `maps-card-sep` in `text-secondary`: rejected a separator inside the following mark's span (it would take the role `positive` for the dot of „rozwiązana”). Cost if wrong: one CSS class.
- `TerrainLine` carries `note: string | null`: rejected an empty string for no note (the screen would test the empty string). Cost if wrong: one type.
- D-251 and the pre-existing clauses: see I2 above.

## Concerns / for the request

1. D-149: the definition's *Rationale* clause „the end of the map run that opens a map names the way to it” runs ahead of the game until task 16; the request names it to the human.
2. D-170, D-243 (and D-149): clauses of the main branch dropped to match the definition (list under I2).
3. D-251 still differs from the definition in its *Rationale* and *Rejected* (older text); decide whether it follows the definition too.
4. M4: statuses of the coding-guideline rows — the template wants them from the task's settlements and the task has none.
5. Look of the separator „ · ” in the heading and the gap between „Wejdź” and „Puść w pętlę” (the reviewer's "Declined to judge") are for the human to see.
6. M8 and M9 are not fixed (outside the task, as the findings file says).

## Questions

none
