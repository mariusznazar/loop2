# Return report — `karty-i-katalog-map` (the return step, step 11)

**Status:** done with concerns (no question for the human; the concerns are listed at the end).

Base of the range: `c2a7853e72ce464fc8b34dbbb4517de729836d0d`. The-way: `.the-way` at `294af7fde45323ac1851c014a03071a97fc38d96` (`git -C .the-way rev-parse HEAD` read at the start).

## Commits

| Commit | Files |
|---|---|
| `23d42ab` | `foundations/decisions.md` (+19 -4 lines at the first count, then one wording change inside the same commit): D-333 new; D-327 loses its third binding sentence and points to D-333; D-169 *Rationale* and D-265 *Verification* corrected |

The worktree is clean after the commit (`git status --short` empty). The message ends with the `Claude-Session` line. The commit author address read `mariusznn@gmail.com` as git.md gives for this account.

## Checks

| Command | Exit |
|---|---|
| `python -B .the-way/elements/common/foundation_check.py` (before my edits) | 0 (0 errors) |
| `python -B .the-way/elements/common/foundation_check.py` (after my edits, before the commit) | 0 (0 errors) |
| `npm test -- tests/sim/map-card.test.mjs` (the numbers of D-333 and D-327 read against the tests: 83 and 33 minutes, 11 of 16, 280 minutes, usual step) | 0 (11 pass) |
| `npm test -- tests/view/map-lines.test.mjs` | 0 (11 pass) |

Not run: the full `npm test` (the cycle's gate; the change touches `foundations/decisions.md` only); the real browser (I read the code, not the page).

## How I compared (own-work check)

The requirement most likely unmet is "each entry the change writes or changes is true of the code as it stands". I read the code of the range (`git diff 2136709..c2a7853`) against each entry: `maps-screen.tsx`, `map-lines.ts`, `team-lines.ts`, `trip-lines.ts`, `sim/map-card.ts`, `sim/trip.ts`, `screen-address.ts`, `menu-bar.tsx`, `game-view.ts`, `headquarters.tsx`, `controls/button.ts`, `react-button.tsx` and the rules of `styles.css` for the roles. I then searched the whole of `foundations/` for the words that place sending in Siedziba (`headquarters`, `Wyślij`, `row`, `list of maps`, `Mapa:`, `Program:`), and read each hit.

## The eight lines

1. **Foundation compared with code.** Compared: D-325 to D-332 (new), D-53, D-55, D-133, D-134, D-149, D-165, D-170, D-171, D-180, D-188, D-217, D-243, D-244, D-251, D-274, D-280, D-281, D-282, D-287, D-03 (the entries the change writes or changes); D-54, D-118, D-142, D-245, D-246, D-189, D-44 and the invariant `uncaught-failure-game-state` (found by the search); `foundations/glossary.md` ("headquarters"), `foundations/part_map.md`. No entry of the first group disagreed with the code in its binding sentence, its *Verification* or its roles (the order of lines at a character, the roles in `styles.css`, the list and the picked row, the addresses and the fall to Siedziba, the item "Mapy" and its place, the main look of "Wejdź", the inactive buttons and the sentence under them, the empty-loop sentence, the focus-free parts). What no longer matched, and its correction:
   - D-169 *Rationale* said the player tells programs apart "on the select lists of the program panel and of the headquarters". The list "Program:" now stands at the character in "Kto idzie" of the card of a map, and Siedziba holds no select list. Corrected to "of the program panel and of the card of a map".
   - D-265 *Verification* (`complies`) named "a new section of the headquarters built in DOM". Siedziba is a React screen (`headquarters.tsx`), so a new section of it is not built in DOM. The only screen the code still builds with the DOM controls is the waiting screen of the sign-in check (`app.ts`: `createButton`, `document.createElement`). Corrected to "a new section of the waiting screen of the sign-in check built in DOM".
   - D-327 carried a third binding sentence on the usual step that was the plan's choice, not a part of the accepted row 1 (concern 1 of the foundation report). I moved it to the new D-333 and left a pointer in D-327 (see line 2).
   - Left to task 25, as the handoff and the task document give: D-189 (its binding sentence and *Rationale* say "the list of maps marks it as not predicting the earning loop"; the mark stands on the card of a map, D-251), and D-245 and D-246 (untouched by this change).
   - Left as written: D-149 *Rationale* clause "the end of the map run that opens a map names the way to it", approved wording that runs ahead of the game until task 16 (the fix report already names it for the request); D-44 *Verification* example "the button „Wyślij” of a new screen" (it names a hypothetical new screen, not the old button; no button of the game bears that text now); D-280 binding sentence "the choice of a map, the map's row and „Wejdź”" (projected wording; D-330 names the first click as the item "Mapy" and D-280 *Verification* says the same).
   - The part map: every file the change adds falls under globs the map already gives (`src/browser/view/**`, `src/browser/sim/**`, `tests/view/**`, `tests/sim/**`; `stryker.config.json` and `README.md` under build-tools); the lines of `browser-view` ("draws the game's screens in the browser") and `simulation` ("computes the game … from the game's data", which holds `map-card.ts`: it counts from the data and the rules of the game) still describe the parts; `Depends on` holds (the view imports the simulation, the simulation imports nothing from the view). No change.
2. **Decisions written or changed.** Written: D-333 (`the cycle's`). Changed: D-327 (the third binding sentence out, two pointers to D-333 in the first), D-169 (*Rationale*), D-265 (*Verification*). The identifiers D-325 to D-332 and the others the foundation step changed stand as the foundation step and the fix wrote them.
3. **Invariants written or changed.** none (no task, decision or human sets a new rule that a test could fail on; the case the fix added to `uncaught-failure.test.mjs` serves the existing `uncaught-failure-game-state`, whose text names no screen).
4. **Environment facts.** none (the predecessor game `loop` is a model D-327 follows, as D-280 and others do without a fact; no source outside the product is newly relied on).
5. **Glossary terms.** none. "Card" has two uses, the card of a character (Siedziba, Postać) and the card of a map, plus the login card; each is qualified at every use in the foundation, and all are the field's ordinary UI "card", so no sentence is true in one and false in another (WAY-99); no entry. "Headquarters" stays true (Siedziba shows the team and the chest).
6. **Part-map changes.** none.
7. **Projected entries written whole or in part.** none by me. The projected entries were written by the foundation step and corrected by the fix: (new) the screen Mapy = D-325, (new) earning nothing = D-326, D-53, D-134, D-149, D-165, D-170, D-180, D-188, D-243, D-251 whole; D-280, D-281, D-282, D-133 in part; D-03 tied, unchanged. I changed none of them.
8. **Rows of *Settlements to record* written.** none by me. Rows 1 to 6 are D-327, D-328, D-329, D-330, D-331, D-332 (written by the foundation step). My edit of D-327 takes out of row 1's entry the one sentence that was not the row's.

## Entry meaning: D-333 and the changed D-327

Mark `the cycle's` for D-333 (no row and no projected entry carries it).

- **D-333** — EN: the numbers of the card of a map that follow a rule of the game are counted by functions of the simulation, and the view writes them out; the minutes without fire, the tiles that hold a resource, the mean gap between attacks and the usual step are defined. PL: liczby karty mapy, które idą za regułą gry, liczy symulacja, a widok je tylko zapisuje; zdefiniowane są minuty bez ognia, kafelki z zasobem, średni odstęp napaści i krok zwykły.
- **D-327** (`row 1`, now whole of the row's meaning) — EN: the same card as before, with the usual step and the minutes without fire pointing to D-333. PL: ta sama karta co przedtem, z krokiem zwykłym i minutami bez ognia odesłanymi do D-333.

## Choices of the plan: what I decided for each (`plan.md`, *Choices*)

| Choice | Decision | Why |
|---|---|---|
| Numbers of the card in `src/browser/sim/map-card.ts` | entry, D-333 (first sentence, with its *Rejected*) | The task carried this as a question; a later task that adds a number (task 14, a new map) would otherwise count it in the view, and the cooling and the spacing of attacks would be written twice. |
| Usual step = the step most maps give, first on a tie | entry, D-333 (third sentence) | A balance value or a view constant are the rejected ways; no settled source gives the number. Moved out of D-327 so that D-327 stays the accepted row. |
| "bez ognia" counting, the item left out where the map does not cool the body | entry, D-333 (second sentence) | The meaning of the number was in the task text but in no entry; a warm map would otherwise get a guessed text. |
| "≈ k z n" rounding and the mean gap = cooldown + 1/chance, rounded | entry, D-333 (second sentence) | Same reason; pinned also by `tests/sim/map-card.test.mjs`. |
| The chance in Polish notation with at most one decimal | row of the questions table | Wording of one line; `tests/view/map-lines.test.mjs` pins it. |
| What a send takes is one pure function (`sendTake`) | row | The task (To do 5, item 4) and D-180 already say the line shows what enters; the shared function is the mechanism, guarded by `trip-transfer` and the cases of `tests/sim/trip.test.mjs`. |
| The shared button's kind `main` (rejected: `submit: true` outside a form, a class set by the screen) | row | `guidelines/styleguide-browser-view.md`, rule "Main button, secondary action and tab", already holds it with both forms; D-274 holds the look. |
| Columns of the list and the card (`minmax(200px, 1fr)`, `minmax(320px, 3fr)`, one column under 720 px) | row | A layout dimension D-43 leaves out; **the styleguide rule of the screen Mapy does not hold the widths** (only `styles.css` does, beside a comment), contrary to what the handoff expected. A decision is not needed (D-282 binds the areas, not their widths); see concern 3. |
| Pure functions of `headquarters.ts` move to `team-lines.ts`, `map-lines.ts` | row | Code organisation; the rows of both files stand in `guidelines/coding-browser-module.md`. |
| Screen built on entering its addresses, disposed on leaving | row | D-281 holds the address and the reload; the pattern is the exemplar's (D-36). |
| Focus after "Puść w pętlę" to "Zatrzymaj" and after "Zatrzymaj" to "Wejdź" | row | The general rule (a disabled button loses the focus, the screen restores it) stands in the styleguide; these are its targets here, covered by `tests/view/maps-screen.test.mjs`. |
| Siedziba's report drawn in React from the pure functions of `away-report.ts` | row | D-265 already rejects two kinds of drawing in one screen. |
| Siedziba keeps the class names and accessible names the page test reads | row | Test upkeep. |
| The saved game's version stays | row | No field of the game state changes. |
| Styleguide first, coding guidelines last; stale words follow in own slices; sample of the kind `main` on the kitchen-sink page | row | Process of this change, not a rule after the merge. |

## Reaches beyond this handoff

- `a private note in the author's vault` and `scripts.md` (the user's instructions, before a commit and before a script). I wrote the one script (a replace in `foundations/decisions.md`) before reading `scripts.md`; it kept the line ends (`LF`, checked) and used no backslash, and I read the rule afterwards.
- `.claude/skills/the-way-record-decision/SKILL.md`, `.the-way/elements/decisions/skill/SKILL.md` and `.the-way/elements/decisions/template.md` (the form of D-333); `.the-way/elements/glossary/template.md` and `skill/decide_entry.md`, `read.md` (the glossary judgement).
- `foundations/glossary.md`, `invariants.md`, `environment_facts.md`, `part_map.md` (headings and greps for stale words), `guidelines/styleguide-browser-view.md` (rules "The screen Mapy" and "Main button, secondary action and tab"), `guidelines/coding-browser-module.md` and `coding-simulation-module.md` (greps), `src/browser/styles.css` (roles), `src/browser/view/app.ts` (grep, for D-265).
- D-04, D-142, D-245, D-246 (read whole, for D-333 and the stale-word check).

## Searches not found or unclear

1. The widths of the list and the card on the screen Mapy are not in `guidelines/styleguide-browser-view.md`, though the handoff says they are already in the rule of the screen Mapy. They stand only in `src/browser/styles.css:211-213`.
2. Which screens the code still builds in DOM, for D-265: I found one (`app.ts`, the waiting screen of the sign-in check, the only user of `createButton`). If the human counts other modules (`footer.ts`, `email-confirmation.ts`, `password-reset.ts`) as DOM screens too, the example in D-265 still holds, because it names a screen of the code that exists.

## Concerns and questions

Questions: none.

1. D-333 is a choice of the cycle that the human has not seen; the request should put it before the human as `the cycle's`. Its binding meaning is the plan's *Choices* (the card's numbers in the simulation; the usual step; the counting of "bez ognia"; the rounding), recorded from the plan and the code, which the tests pin (`tests/sim/map-card.test.mjs`, exit 0).
2. Code comments in `src/browser/sim/map-card.ts` (and `src/browser/view/map-lines.ts`) cite D-327 for the definitions of the minutes without fire, the tiles, the mean gap and the usual step; these definitions now stand in D-333. D-327 is still the entry of the card, so the citation is true but not the nearest. I changed no code, as the handoff says; a later change of those files can cite D-333.
3. The styleguide does not hold the widths of the areas of Mapy (search 1). I wrote no entry for them and did not edit the styleguide (not an entry of the foundation; its change goes through `the-way-maintain-styleguide`).
4. D-189 still says the list of maps marks the manual run of a solved map as not predicting the earning loop; the mark stands on the card of a map (D-251). The task and the handoff leave D-189, D-245 and D-246 to task 25, so I changed none of them.
5. D-149 *Rationale*: "the end of the map run that opens a map names the way to it" runs ahead of the game until task 16 (kept as the definition approved it).
6. From the fix report, still for the request: the clauses dropped from D-149, D-170 and D-243 to match the definition, D-251's *Rationale* and *Rejected* differing from the definition's older text, and the statuses `copy` of the new rows in `guidelines/coding-browser-module.md` (M4).
