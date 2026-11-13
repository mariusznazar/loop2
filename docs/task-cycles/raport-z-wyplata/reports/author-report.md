# Author report — raport-z-wyplata (the one author, the whole change)

**Status:** done with concerns (concerns listed at the end; none blocks review)

## Commits (branch `task/raport-z-wyplata`, base `2b4d760c`)

- `a9a9b257` feat: code and tests (17 files)
- `caf7bf39` docs: foundation entries and the styleguide (2 files)
- `1a4b79b8` docs: the orchestrator's ruling: the Pytanie 1 accepted-costs sentence taken out of D-246's *Rationale* (1 file)
- `be946654` docs: repair after the orchestrator's return: D-189, D-245 and D-246 brought to the approved wording; examples and reasons of mine taken out of D-39, D-44 and D-207 (1 file)

## Choice: how the state remembers that practice was paid

**Chosen: nothing is remembered; payment empties what waits.** `EarningLoop.practice` now means "practice gathered from completions since the player last took it with „Odbierz”". `takeLoopPractice` (`src/browser/sim/loop.ts`) pays `waitingPractice(loop)` (= loop practice + the practice of the map run going on, none when that run ended in death) into the character's skills and sets both `loop.practice` and `loop.run.practice` to `{}`; backpack, map run, counts, program, chest, seed stay. A completion then adds only the practice the run gathered after „Odbierz”, `stopLoop` pays `waitingPractice` and writes that to `stoppedLoops`, so nothing is paid twice and no field was added. The view reads the waiting practice from the loop whenever it draws (`reportEntries` → `waitingPractice`).

**Rejected: a second record of what was paid** (`paid` beside the gathered practice, waiting = gathered − paid). Cost: a new field in the trust boundary with its own rule (never more paid than gathered), and a covered death or a run that ends would have to subtract from it, otherwise waiting goes negative. Cost if my choice is wrong: the meaning of `loop.practice` and of `loop.run.practice` of a loop's run changed; `world-area.tsx:70` reads only the manual run (`state.run`), so nothing else read the loop run's practice (checked by grep).

**D-241 became:** the binding sentence says the loop holds "the practice gathered from those completions since the player last took the practice waiting with „Odbierz”"; the rationale sentence says the practice stays with the loop "until the player takes it with „Odbierz” or the loop stops", that „Odbierz” empties it together with the practice of the map run going on, and that a death with no resurrection ready takes what waits.

## SAVED_GAME_VERSION

Bumped once, 4 → 5. The shape changed: `AwayReportLine.practice` is removed (the reader's `fields` refuses a line that still holds it). The loop got no new field. Tests: old document of version 4 kept as `DOCUMENT_V4` and refused as `version`; the current document is version 5 with lines without practice.

## Files changed

Code: `src/browser/sim/loop.ts` (+`waitingPractice`, +`takeLoopPractice`, report line no longer holds practice, `practiceGain` removed), `sim/types.ts`, `sim/saved-game.ts`, `view/away-report.ts` (entry has `takeFor`, text „wprawa do odebrania: …”), `view/headquarters.tsx` („Odbierz” beside the line, focus moved to „Zamknij” when the button goes), `view/game-view.ts` (control `takePractice` → `act(takeLoopPractice)`, which saves at once, D-207), `view/controls/button.ts` and `react-button.tsx` (kind `positive`), `styles.css` (`.button.positive`, report line as flex), `kitchen-sink/kitchen-sink.ts` (sample "Przycisk w zieleni" in all states).
Tests: `tests/sim/loop.test.mjs`, `catch-up.test.mjs`, `saved-game.test.mjs`, `tests/view/away-report.test.mjs`, `headquarters-screen.test.mjs`, `react-controls.test.mjs`, `account-screen.test.mjs` (also `VERSION` 5 and lines without practice).
Foundation: `foundations/decisions.md` (D-189, D-245, D-246, D-241, D-207, D-39, D-44), `guidelines/styleguide-browser-view.md`.

## Foundation entries (foundation step)

Written directly (the elements' skills read; the entries are edits of existing entries, wording from the task's *Decisions in play*):
- D-189 (row: projected) — binding sentence with „Odbierz”; rationale and *Rejected* additions as the task gives; *Verification* and *Origin* left as in the foundation. EN: the player takes gathered practice with „Odbierz” without stopping the loop. PL: gracz odbiera zebraną wprawę „Odbierz” bez zatrzymywania pętli.
- D-245 (projected) — rationale „and „Odbierz” pays without that price”. EN/PL: Zatrzymaj keeps its price, Odbierz pays without it / „Odbierz” wypłaca bez tej ceny.
- D-246 (projected + row 1) — new line wording with „wprawa do odebrania” and „Odbierz” in `positive`, the sentence that the practice is read from the loop, rationale and *Rejected* additions; *Verification* example "from completions in this catch-up" corrected (the example now says waiting practice, map run going on included, read from the loop, gone after „Odbierz”). *Origin* stays `none`. *Relations* as in the definition.
- D-241 (the cycle's) — see above.
- D-207 (task item 5) — „Odbierz” in the list of the binding sentence only.
- D-39 (row 2) — `positive` also as the text of „Odbierz”, in the binding sentence only.
- D-44 (row 2) — „Odbierz” is the plain button in `positive` (binding sentence); *Rationale* "Accepted with it" and *Rejected* (the two ways the row's source keeps, with their costs).
- Styleguide: "States of shared controls" (new bullet), "Main button, secondary action and tab", "The kitchen-sink page".
`python -B .the-way/elements/common/foundation_check.py` → `0 errors`.

Repair (`be946654`) — comparison of D-189, D-245 and D-246 with the approved definition, word for word (a script unwrapped both texts and compared binding sentences, *Relations*, *Rationale*, *Rejected*): D-245 and D-189 are now identical to the definition in all four; D-246 is identical in all four after `1a4b79b8` (see the item on the removed sentence). What I found and did:
- D-246 binding: the definition says "of Siedziba", I had kept the foundation's "of the headquarters" → changed to the definition's word. (Elided parts: none left; the definition holds the whole sentence, so nothing was joined by sense.)
- D-246 *Relations*: I had added `derives from D-44` and `derives from D-189`; neither the definition nor the task holds them → removed.
- D-246 *Rationale*: the sentence "The first night decides …" stood in the wrong place (before "Accepted with it"); the definition puts it after "one button closes the section in one click." → moved. D-189 *Rationale*: "A return in the morning always pays: …" belongs before „Pays nothing” means…, and "Accepted with it: practice taken …" at the end → moved. D-246 *Rejected*: the two new ways stand at its start, as in the definition → moved.
- D-246 *Rationale*, "Accepted with it too: …" (accepted costs of Pytanie 1): **removed in `1a4b79b8`** on the orchestrator's ruling (the definition is the only source of D-246's wording). D-246 is now identical to the definition in binding sentences, *Relations*, *Rationale* and *Rejected* (script comparison; the remaining reported difference is a trailing-space artefact of the comparison).
- D-44 *Rationale*: "Accepted with it: one look more of the shared button to keep and two decisions changed, this one and the one that gives `positive` its meaning." — kept; the task holds it (Pytanie 2, Answer A, „Przyjęty koszt: jeden wygląd więcej do utrzymania i dwie zmienione decyzje”). My other D-44 rationale sentence ("pays at once and loses nothing, so it is neither …"), my D-44 *Verification* examples, my D-39 rationale sentence and *Verification* example, and my D-207 *Verification* example and rationale edit: **removed**; neither the definition nor the task holds them. D-44 *Rejected* additions: now worded from the task's *Not chosen* under Pytanie 2 (B and C, with the reasons it keeps).
- D-241 wording (the binding sentence and the rationale sentence): the task commands the correction but gives no wording; the wording is mine, its content follows from the task's description of the two ways and the way I chose.
- D-246 *Verification* complies example: the task commands the correction and gives no wording; mine.
- Styleguide additions (new bullet in "States of shared controls", the bullet and the decision list and the Good example in "Main button, secondary action and tab", the kitchen-sink sentence): written by me from the task's item 7; the task holds no wording.
Never copied: the path or the title of the definition into the foundation or a commit message (checked).

## Checks (command → exit code)

- `npm run typecheck` → 0; `npx eslint src tests` → 0; `npx prettier --check src tests` → 0
- `node --test tests/sim/*.test.mjs` (after `npm run build`) → 0, 774 pass
- `node --test tests/view/*.test.mjs` (without `memory-limit*` and `page-document.test`) → 0, 1128 pass
- `npm test -- tests/sim/loop.test.mjs` → 0 (43); `tests/sim/saved-game.test.mjs` → 0 (37); `tests/view/account-screen.test.mjs` → 0 (131); `headquarters-screen`, `react-controls`, `away-report` → 0
- Python invariants, each run again as `npm test -- tests/invariants/<f>.py > log` (exit code of `npm test`, then the unittest line):
  - `npm test -- tests/invariants/test_browser_view_token_values.py` → exit 0 (Ran 4, OK)
  - `npm test -- tests/invariants/test_design_token_contrast.py` → exit 0 (Ran 3, OK)
  - `npm test -- tests/invariants/test_cross_part_imports.py` → exit 0 (Ran 10, OK)
  - `npm test -- tests/invariants/test_browser_view_focus_outline.py` → exit 0 (Ran 3, OK)
  - `npm test -- tests/invariants/test_browser_view_framework.py` → exit 0 (Ran 9, OK)
  - `npm test -- tests/invariants/test_application_build_kitchen_sink.py` → exit 0 (Ran 3, OK)
  - `npm test -- tests/invariants/test_simulation_isolation.py` → exit 0 (Ran 5, OK)
  - `npm test -- tests/invariants/test_simulation_inputs.py` → exit 0 (Ran 2, OK)
- After the repair commit `be946654` and again after `1a4b79b8`: `python -B .the-way/elements/common/foundation_check.py` → `0 errors` (exit 0).
- Not run: the full gate `npm test` (the orchestrator's); `tests/view/memory-limit*.test.mjs`, `page-document.test.mjs`, the server tests (`tests/http`, `transport`, `account-*`), `tests/quality`, `tests/deploy` (nothing there touches the change; the server reads no game version).

Failing runs first seen:
- `save-version`: with `SAVED_GAME_VERSION` set back to 4 (the exact command `npm test -- tests/sim/saved-game.test.mjs`, exit 1) 10 tests failed, among them "the current version is the one the document of the current version is written with" and "the document of version 4 is refused as version"; restored to 5, exit 0.
- Mutation: `takeLoopPractice` leaving `loop.run.practice` as it was → `npm test -- tests/sim/loop.test.mjs` exit 1, the two tests "taking the practice pays … empties both" and "practice taken is paid once …" failed; restored, exit 0.
- Mutations in my head, not run: wrong key list of the reader (covered by the crafted cases "a line still holding its practice" etc.), „Odbierz” on a stopped line (test "a line of a loop a death stopped has no „Odbierz”"), a covered death losing the dead run's practice from waiting (test "after a death a resurrection covers …").

Trust boundary (`saved-game.ts`): crafted documents refused as `shape`, all in `tests/sim/saved-game.test.mjs` `CRAFTED`: a line still holding `practice` (filled and empty), a loop practice below 0 / beyond the safe integers / as text / fractional / 0 / absent skill, a loop run's practice absent / below 0 / fractional / beyond the safe integers / skill absent. A state that pays more than the loop gathered cannot be loaded: what is paid is exactly what the two stored `practice` records hold, both read by `practice()` (safe integers from 1).

## Own-work check (section 3)

Requirement most likely not met: "Wypłacona wprawa nie wraca drugi raz: ukończenie tego przejścia dodaje do pętli tylko wprawę zebraną po „Odbierz”, a późniejsze „Zatrzymaj” wypłaca tylko to." Check: test "practice taken is paid once: the completion of the map run it was taken in adds only what came after, and so does the stop" (map run one minute from completion, 40 in the loop + 9 in the run, take, complete, stop; skills end at +49 and exploration +1, `stoppedLoops` `{ exploration: 1 }`). Passed; and failed under the mutation above.

### Interface (ui_check)

Method: `npm run local`, account through the login card, a composed document (loops of Ala and Ola, Ela's loop stopped by a death at generation 2, report lines for the three), sent by the ordinary save request, reload, Playwright CLI snapshot, screenshots and computed styles. Console: 0 errors.
Saw:
- waiting practice with practice in the loop and in the map run going on: line "Ala: 480 min · skrzynka: patyk +3, jagoda −2 · wprawa do odebrania: Eksploracja +14, Jedzenie +4" with „Odbierz” beside it; computed text colour `rgb(0, 188, 125)` = `--positive` (#00bc7d), class `button positive`; under the pointer the same colour on the background `highlight`.
- waiting practice only in the map run going on (loop practice empty): line and button as above with the run's figures (+3, +1).
- nothing waiting: no „wprawa do odebrania” part and no button; Ola's line ("480 min · wskrzeszenie zużyte") and Ela's line (stopped by a death, `danger`) have no button in every state.
- after „Odbierz”: the part about practice and the button gone, the line stays with its minutes and chest, the loop stays ("Pętla: Las · przejście 1 · minuta 0"), focus on „Zamknij”; after a reload the line is still without the part and the save held it.
- Not seen live: the button coming back when the loop gathers more (in 75 s the loop run gathered nothing); covered by `headquarters-screen.test.mjs` ("the part about practice and „Odbierz” come back when the loop gathers more") and `away-report.test.mjs`.
- Not checked: the kitchen-sink page in a browser (built by `test_application_build_kitchen_sink`, sample added in all states; hover uses the existing `.sample-hover`).
Screenshots (public repo `mariusznazar/screenshots`, commit `4f7e1d512a4231b2495dd7c20f24833786515a18`, branch `loop2/raport-z-wyplata`, made-up characters only):
- ![the report with „Odbierz” beside a line with practice waiting](https://github.com/mariusznazar/screenshots/blob/4f7e1d512a4231b2495dd7c20f24833786515a18/loop2/raport-z-wyplata/report-waiting.png?raw=true)
- ![the report after „Odbierz”: the line without the part about practice, no button](https://github.com/mariusznazar/screenshots/blob/4f7e1d512a4231b2495dd7c20f24833786515a18/loop2/raport-z-wyplata/report-after.png?raw=true)
Browser closed (`playwright-cli close`), `npm run local:stop` → 1 start stopped, `.playwright-cli/` and the clone `.runs/screenshots/` deleted.

## Reaches beyond the dispatch

- `.claude/skills/loop2-play/SKILL.md` — read in full (the foundation's route for the screenshot, ui_check); `scripts`-level `compose-state.mjs` only read its head to compose my own state.
- `foundations/decisions.md` D-45 (kitchen-sink page) and the glossary entries `practice`, `resurrection`, `earning loop`, `catch-up`, `headquarters`, `completion`, `save time`, `loop clock` and the invariants `trip-run-end`, `catch-up-state`, `save-version`, `death-settled-once`, `loop-run-knowledge` — read as the handoff names; D-45 to decide whether the kitchen-sink decision needed a change (it does not).
- `.the-way/elements/decisions/template.md`, `decisions/skill/*.md`, `common/rules.md` — read for the write.
- `tests/view/account-screen.test.mjs`: the hand-written save version `VERSION` there and the report lines had to follow the bump.
- The approved definition in the author's notes, outside the repository (D-189, D-245, D-246 only, lines 1013–1100), read in the repair at the orchestrator's instruction; `foundations/glossary.md` entry `loop clock` was read only through its defining sentence.

## Unread material

After the repair, read whole (each entry to the next heading): D-274, D-275, D-265, D-269, D-326, D-386, D-201, D-242, D-244, D-247, D-248, D-239, D-206, D-213, D-45; `foundations/part_map.md` whole; `guidelines/styleguide-browser-view.md` lines 621–920 (the earlier read covered 1–620 and 921–945, so the file is now read whole). Also read: D-189, D-245, D-246 of the definition at lines 1013–1100 of the approved definition.

Does the change make any sentence of them untrue? No sentence found untrue; checked one by one:
- D-274: "an action of the headquarters made with the plain shared button" in *Verification* and "any other action outside a form keeps the button D-44 gives it" — „Odbierz” is the button D-44 now gives it (plain button, text in `positive`); consistent, no edit.
- D-275, D-265, D-269, D-326, D-201, D-244, D-239, D-242, D-247, D-248, D-45: nothing about the report's practice, „Odbierz”, the button kinds beyond what D-44 already says, or the version. D-265's test of both forms: a case for `positive` was added in `tests/view/react-controls.test.mjs`. D-269: the kitchen-sink sample uses the DOM form only.
- D-206: the bump 4 → 5 discards a saved game state of version 4 whole, which is what D-206 says; its "to be looked at again when … players other than the game's author hold saved game states" is the task's Pytanie 4 ("utratą zapisu przy podbiciu projekt na razie się nie przejmuje"); no edit.
- D-386: the state `takeLoopPractice` makes loads (the account-screen test saves it; practice `{}` in both records is read by `practice()`); the round trip of a state after „Odbierz” is not a separate test of its own.
- D-213: no change; the reader was changed inside its rules (strict keys, refusal as shape).
- Part map: `browser-view` depends on `simulation` (the view imports `sim/loop.ts`, as `game-view.ts` already did); no file was added or moved; no edit.
- Styleguide 621–920 (scene, chronicle, end-of-run window): touches buttons in "The end-of-run window" ("Wszystkie przyciski okna … są wspólnymi przyciskami; „Restart” i „Zakończ” niszczące, pozostałe zwykłe") — unaffected; touches `positive` in the scene bar, the title after completion, the solved map in the chronicle and the met requirement bar — unaffected by D-39's added sentence. Nothing there mentions the report or „Odbierz”.

Still unread: the skills of the invariant, glossary, part-map and environment-fact elements and `common/way_of_working.md`, `common/projected_mode.md`, `decisions/examples.md`, `decisions/skill/projected.md` of the-way: I wrote no entry of those elements and edited the decisions from the definition's own text, following `decisions/template.md` and `common/rules.md`, which I read. D-274's wording is now read whole; D-241, D-207, D-39, D-44, D-189, D-190, D-183, D-240, D-245, D-246 were read whole earlier.

## Searches not found or unclear

- The approved definition lies outside the repository; I first wrote the entries from the task's quotations, which elide parts with „[…]”, and joined the elisions by sense. The repair read the definition (D-189 at line 1058, D-245 at 1013, D-246 at 1028) and compared word for word; the result is under "Foundation entries". In the definition the *Verification* and *Origin* of the three entries read `TODO`; the foundation's fields were kept, as the task says.
- Searched for a sentence of D-274 or D-275 that would forbid a plain button in `positive`: none found (both keep "the button D-44 gives it").
- Which part of the foundation says where a screenshot of the check is shown: found in `loop2-play`, section "Show a screenshot to the human" (used).
- A decision that names the kinds of the shared button for the two forms: only `guidelines/coding-browser-module.md` ("Rodzaj przycisku ustawia `kind` … `secondary`, `tab` i `main`") lists them; not updated (see concerns).

## Concerns

1. `guidelines/coding-browser-module.md` (section "Kontrolki w DOM i ich aktualizacja") still lists the kinds `secondary`, `tab`, `main` without `positive`. It is incomplete, not false; the guideline is maintained through `the-way-maintain-coding-guidelines`, which I did not run. Suggest one sentence there.
2. No glossary entry for "practice waiting" (the practice the report names and „Odbierz” pays). It is read as ordinary English; I recorded none. A glossary term can be added if the reviewer wants it.
3. D-246 now equals the definition word for word; the accepted costs of Pytanie 1 are no longer in it (ruling). The D-44 "Accepted with it" sentence stays (the task's answer to Pytanie 2).
4. The invariants `trip-run-end`, `catch-up-state`, `save-version`: unchanged, still true; the tests carrying them were changed or added as listed (no invariant test weakened). The existing `save-version` document tests were rewritten together with the bump as the guideline says.
5. Combination of dead run and „Odbierz”: `takeLoopPractice` leaves a loop run that already ended in death untouched (it pays only the loop's own practice, as `stopLoop` does); such a state exists only transiently inside one step, the saved document refuses it.
