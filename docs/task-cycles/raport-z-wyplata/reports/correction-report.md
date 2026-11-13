# Correction report — the human's remarks on the request (#88)

**Status:** done

**Commits** (range `2c0472a8..76389bff`):
- `950f0751` docs: remark 2 (the invariant, its links, the test tag)
- `76389bff` docs: remark 3 (the guideline of the browser modules)
Remark 1 changed nothing in the repository: nothing was off.

## Remark 1 (as made): "Look at the three things not seen in a real browser … the report together with the camp picture on the merged headquarters screen, the page of sample controls with the new button, and the moment the button comes back after the loop gathers more practice … Attach the images to the description. If something is off, correct it in this request."

**Method.** `npm run build`, `npm run local` (HTTPS), an account through the login card (made-up `agent@example.test`), a game state composed with the built simulation (three characters: Ala and Ola in earning loops on Las, Ela at generation 2 with her loop stopped by a death; a report of three lines; Ala's loop holding practice and its map run one game minute from the end of an exploration; the save time 45 s in the past), checked with `loadSavedGame` before it was sent, sent by the ordinary save request, then a reload; operated with Playwright CLI (`snapshot`, `eval`, `click`, `screenshot`); the console read with `playwright-cli console error`. The kitchen-sink page with `npm run kitchen-sink` (`http://127.0.0.1:…`). Both stopped and the browser closed at the end (`npm run local:stop` → 1 start stopped; the kitchen-sink process killed); `.playwright-cli/` and the clone `.runs/screenshots/` deleted, no image file in the repository or the record.

**(a) The report together with the camp, merged headquarters screen — seen.** Band of the camp over the panel (a mage at the fire and the chest; Ela is the one character in Siedziba, Ala and Ola are in loops), the heading „Siedziba” under it, the report under the heading: Ela's stopped line in `danger` without a button; „Ala: 480 min · skrzynka: patyk +3, jagoda −2 · wprawa do odebrania: Jedzenie +4” with the green „Odbierz” beside it; „Ola: 480 min · wskrzeszenie zużyte” without a button; „Zamknij” under the lines; „Drużyna” below. The camp band carried `aria-hidden="true"`. Nothing overlapped, the report and the buttons stood inside the panel. Screenshot: ![the report with „Odbierz” under the camp band on the merged Siedziba](https://github.com/mariusznazar/screenshots/blob/dc34f817ee3f75bfe2cde7aa0d2ef6adff74bdb0/loop2/raport-z-wyplata/a-report-camp.png?raw=true)

**(b) The page of sample controls — seen, by state.** The row "Przycisk w zieleni" (class `button positive`), read from computed styles on the page: *zwykły* — text `rgb(0,188,125)` = `--positive` (#00bc7d), no fill, frame `control-border`; *pod kursorem* — the same text colour on the fill `rgb(39,39,42)` = `--highlight`; *z fokusem* — the same text, the outline `solid rgb(244,244,245)` of the one focus rule; *wyłączony* — text `rgb(82,82,92)` = `--text-disabled` (#52525c), `disabled: true`; *błąd*, *pusty*, *ładowanie* — the reasons "Nie dotyczy …" as the styleguide says. The only console error was the page's missing `favicon.ico` (404), no failure of the game. Screenshot: ![the page of sample controls, the row of the green button in its states](https://github.com/mariusznazar/screenshots/blob/dc34f817ee3f75bfe2cde7aa0d2ef6adff74bdb0/loop2/raport-z-wyplata/b-kitchen-sink.png?raw=true)

**(c) The button coming back after the loop gathers more — seen, live.** With the state above (the save time 45 s back, so the open game's next whole game minute fell about 10 s after the load, no catch-up minute at load): I clicked „Odbierz”; at t+2 s the line read „Ala: 480 min · skrzynka: patyk +3, jagoda −2”, no button, the loop line „minuta 0”; at t+7 s, with the loop at „minuta 1”, the line read „… · wprawa do odebrania: Eksploracja +1” and „Odbierz” stood beside it again, with the focus ring on „Zamknij” from the earlier focus move. Polled once a second by `eval`; the second screenshot taken at the moment the button was back. Console: no `uncaught` line. Screenshot: ![the report after the loop gathered one more practice: „Odbierz” is back beside „Eksploracja +1”](https://github.com/mariusznazar/screenshots/blob/dc34f817ee3f75bfe2cde7aa0d2ef6adff74bdb0/loop2/raport-z-wyplata/c-button-back.png?raw=true)

The screenshots lie in the public repository `mariusznazar/screenshots`, branch `loop2/raport-z-wyplata`, commit `dc34f817ee3f75bfe2cde7aa0d2ef6adff74bdb0` (the commit earlier screenshots of this cycle, `report-waiting.png` and `report-after.png`, also sit in); the description can embed the three links above. Pushed with the owner's `gh` account, not to `main`; they show only the made-up characters and account.

**Not reached:** the report with the camp at a narrow window width (not asked); the closed-menu states of the camp. **If something was off:** nothing was; no code, test, entry or styleguide change followed from this remark.

## Remark 2 (as made): "Fix the three small remarks on the rule that paid practice is never paid twice: rewrite the sentence (the reviewer's version is fine) so that only „Odbierz” and „Zatrzymaj” pay into skills and a finished map run only adds to the loop, and say "at most once" as the tests check; add the links to the other decisions that say the rule; move the test tag to the test that carries the rule."

Carried out through the project skills' rules (`the-way-record-invariant`: `.the-way/elements/invariants/skill/SKILL.md`, `decide_entry.md`, `draft.md`, `write.md`, `template.md`, read; the decision fields edited in place as `record-decision` and `elements/decisions/template.md` give):
- `foundations/invariants.md`, `loop-practice-payment`, the sentence on `2c0472a8` was "The practice an earning loop gathers is added to its character's skills once, whichever of „Odbierz”, the completion of the map run it was gathered in and the stop of the loop pays it." and is now the reviewer's: "The practice an earning loop gathers is never added to its character's skills twice, whichever of „Odbierz” and the stop of the loop pays it and whether the completion of the map run it was gathered in came between." Only „Odbierz” and the stop pay; the completion is only something that may come between. *Method* `test`, *Rests on* none, *Part* simulation, *Violated* no stay.
- *Derives from*: `D-189 · D-241 · D-245 · D-246` (was `D-189`). The mirror the template asks (a decision's *Verification* names the invariants that derive from it, each naming the decision): D-189 already named it; added `loop-practice-payment` to the *Verification* of D-241, D-245 (beside `trip-run-end`) and D-246, where the field read "an agent compares …" or "invariants: trip-run-end. …"; their examples are untouched.
- The tests that cite it, checked against the new wording (step 4.2 of the skill: the wording before beside the new): "practice taken is paid once: the completion … adds only what came after, and so does the stop" (a completion between „Odbierz” and the stop, nothing paid twice) and "taking the practice twice in a row pays it once …" (a second „Odbierz” pays nothing): both check "never twice"; the new wording is true of both.
- Tag: `tests/sim/loop.test.mjs`, the case "taking the practice pays what the loop and its map run going on gathered, empties both and changes nothing else" now carries `// invariant: loop-practice-payment` in place of `// invariant: trip-run-end` (as the review judged; `trip-run-end` stays at the stop's, the completion's and the death's tests that check items).
- Checks: `python -B .the-way/elements/common/foundation_check.py` → `0 errors`, exit 0; `npm test -- tests/sim/loop.test.mjs` → exit 0, 44 pass; `npx eslint tests/sim/loop.test.mjs` → exit 0.
- The invariant's test seen failing once with the command that shows it passing was recorded in the return step (mutation of `takeLoopPractice`, exit 1, then 0); the sentence changed, the tests did not, so I did not repeat it.

## Remark 3 (as made): "Add the green kind of the shared button to the guideline of the code of the screens that lists the kinds of the shared button, in this request, through the guideline's own maintenance skill."

`guidelines/coding-browser-module.md`, section "Kontrolki w DOM i ich aktualizacja" (under `## Examples`, where nothing binds): the sentence now reads "… to rodzaje `secondary`, `tab` i `main`, a zwykły przycisk z tekstem w `positive` („Odbierz” w raporcie Siedziby) to rodzaj `positive` (D-44)." One sentence, in the file's language and style, citing D-44, stating only what D-44 settles. `python -B .the-way/elements/common/foundation_check.py` → `0 errors`; `npx prettier --check guidelines/coding-browser-module.md` → exit 0.

**Skill steps that need the human and cannot run in a cycle.** `the-way-maintain-coding-guidelines` (`.the-way/product-guidelines/coding/SKILL.md`) leads the *refinement* with the human (steps 1 recognize, 2 starting set, 3 trial run and audit, 4 settle with the human, 5 hand back); it "never writes the guideline itself", the cycle's author writes the files "as `product-guidelines/coding/template.md` gives" (section "Writing the files"). I read both and `template.md` whole; none of the five steps ran, since nothing here is a standing check, an exemplar, an invariant or a rule to settle: the sentence extends an example the template calls non-binding, from what the task's foundation step wrote (D-44) — "Take every … from the decisions the task's foundation step wrote". No decision was invented, no rule or row added.

## Remarks 4 and 5

Let through; nothing done (the nine decisions and the `cross-part-imports` gap untouched).

## Checks (command → exit code)

- `python -B .the-way/elements/common/foundation_check.py` → `0 errors`, exit 0 (after both commits)
- `npm test -- tests/sim/loop.test.mjs` → 0 (44 pass); `npx eslint tests/sim/loop.test.mjs` → 0
- `npx prettier --check src tests guidelines/coding-browser-module.md` → 0
- Browser: `npm run build` → 0; `npm run local` started ("Local game: https://127.0.0.1:60715"); `PUT /api/saved-game` → 200 for each composed state; `npm run local:stop` → "Local starts stopped: 1"; `npm run kitchen-sink` started ("Kitchen-sink page: http://127.0.0.1:49277/") and stopped.
- Not run: the full `npm test`.

## Unread material

Read whole: `correction-handoff.md`, `correction-remarks.md`, `.the-way/product-guidelines/coding/SKILL.md`, `.the-way/product-guidelines/coding/template.md`, the invariants element's skill files and `template.md` (read earlier in the cycle), D-189, D-241, D-245, D-246 (the fields edited; read whole earlier in the cycle). Not read: `request.md`, `return-review-report.md`, `whole-review-report.md`, `merge-review-report.md` (the remarks and the handoff quote what I needed); `product-guidelines/template.md` and the other files beside the coding skill (`recognize.md`, `settle.md`, `kinds.md`, `hand_back.md`, …), since no refinement step ran; `.the-way/task-cycle/change/ui_check.md` and `.claude/skills/loop2-play/SKILL.md` were read earlier in the cycle and used as read then.

## Searches not found or unclear

- The correction row of `the-way-make-change` gives no rule for where the screenshots of a correction go when the human asked for them "attached to the description": I used the foundation's one route (`loop2-play`, "Show a screenshot to the human"), the public screenshots repository under this cycle's directory, and give the three embed links here for the description.
- Unclear whether a skill that "never writes the guideline" and leads only a refinement should have been run at all in a cycle; I read it and its template and said above which steps did not run and why.
- The kitchen-sink page's console shows a 404 for `favicon.ico`; ordinary, not a failure of the game, as `loop2-play` says of the favicon.
