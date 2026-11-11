# Planner report — koniec-przejscia

- Status: done with concerns
- Plan: `.runs\task-cycles\koniec-przejscia\plan.md` (7 slices)
- Size report (last run): `.runs\task-cycles\koniec-przejscia\plan-size.md` — every slice fits (largest: slice 1 at about 158 000 estimated tokens, slice 4 at about 157 000, against the limit of 250 000; no slice changes more than 7 files). Both heavy slices are heavy mostly because of the two big test files they change (`tests/sim/saved-game.test.mjs`, 2500 lines; `tests/view/end-question.test.mjs`, 908 lines).
- Check result of the plan: size script exit 0, no slice too large or unchecked. Nothing of the product was run (the gate is the orchestrator's); no code, test or foundation entry written.

## What the plan is

1. Slice 1 (simulation, trust boundary `src/browser/sim/saved-game.ts`, review of its own): three new fields of `GameMapRun` (`longestStreak`, `minutesByAction`, `enteredWith`), a new file `src/browser/sim/run-record.ts`, counting in `advanceMinutes`, `startRun` binding, version 4 and the strict reader.
2. Slice 2 (view, pure): `src/browser/view/end-window-lines.ts` (every text of the window) and a way in `chronicle.ts` to read the last entries up to the death.
3. Slice 3 (view): `src/browser/view/end-window.tsx` and its rules in `src/browser/styles.css`.
4. Slice 4 (view): window on the run screen, header button „Koniec przejścia”, the memory of the window and the destinations of „Zakończ” and „Otwarte: {mapa} →” in `game-view.ts`.
5. Slice 5 (view): the lines of the end leave the world area; the discovery band yields.
6. Slice 6: the styleguide rule through `the-way-maintain-styleguide`.
7. Slice 7: the two tables of coding guidelines through `the-way-maintain-coding-guidelines`.

The foundation rows are in the plan's table, to be written before slice 1; none needs a change of the part map (every new file stands under an existing pattern of `foundations/part_map.md`: `src/browser/sim/**`, `src/browser/view/**`, `tests/sim/**`, `tests/view/**`), the glossary or the invariants.

No open design choice and no reserved choice found; the five *Questions carried to cycle* are taken in *Choices* (size and shape of the window, focus and keyboard, place of the paragraph, fields and counting of the state, roles and values for the bar of time and the backdrop).

## How the invariants were chosen (the orchestrator's selection is mine)

By "Reading the foundation" step 3: I listed every invariant of `foundations/invariants.md` whose *Part* names `browser-view`, `simulation` or `every` (about 60) and kept those that bear on the end of a map run, the state of the map run, the save, the view's tokens and controls, or a test the change alters; each read whole at the lines named in the plan:
browser-view-framework, content-identifiers, map-run-repeatability, player-map-run-pace, simulation-isolation, simulation-inputs, eslint-source-rules, prettier-source-format, browser-view-token-values, browser-view-focus-outline, design-token-contrast, design-token-sources, minute-span-split, node-test-selection, streak-program-change, saved-program-edit, copy-save, trip-transfer, trip-run-end, save-version, solved-map-manual-run, resurrection-renewal, death-settled-once, catch-up-state, document-test-memory-limit, rule-state-from-pick, uncaught-failure-game-state, cross-part-imports.
Judged not to bear and not read whole beyond their one-line statement: the account-, deploy-, container-, loop2-, icon-, sprite-, font- and email-invariants, application-build-*, program-closed-lists, program-world-reference, walk-*, move-reach, exploring-reveal, map-run-tiles, map-run-layout, restart-seed, simulation-randomness, action-in-progress, action-duration-minimum, nature-energy-range, trip-plan-progress, loop-run-knowledge, catch-up-minutes, catch-up-death-moment, terrain-drawing-numbers, character-team, application-build-kitchen-sink (the window is no shared control, so no sample on the kitchen-sink page is planned — see the styleguide uncertainty below).
In slice checks I named the test files of the invariants a slice reaches. Caution: `rule-state-from-pick` has method `review`; no test guards it.

## Reaches beyond the dispatch (each read whole)

- D-292 (`foundations/decisions.md:6322-6339`): the numbering of rules, which „Nie zadziałały ani razu” shows; the code that numbers rules (`ruleNumber` in `src/browser/view/program-editor.ts`) cites it.
- Glossary entries beyond those a slice names: map run restart, copy, chronicle, resurrection (read in the file I read whole).
- Source files read to cut the slices: `src/browser/sim/types.ts` (whole), `run.ts` (63-195, 353-422, 495-785), `game.ts` (195-846), `loop.ts` (255-335), `saved-game.ts` (60-120, 740-1000), the views `run-screen.tsx`, `world-area.tsx`, `run-header.tsx`, `trip-lines.ts`, `end-question.tsx`, `discovery-band.tsx`, `discovery-band-text.ts`, `status-row.ts`, `now-lines.ts`, `game-view.ts` (whole), `chronicle.ts` (whole), `chronicle-entries.ts` (20-80, 340-411), `right-area.tsx`, `screen-address.ts`, `program-editor.ts` (785-857), `program-panel.tsx` (140-160, 750-796), `rule-panel.tsx` (535-575), `styles.css` (1-70, 170-350, 1380-1530), `tokens.css`, `data/maps.ts`, `data/actions.ts`, `data/balance.ts`, `app.ts` (380-460), and, by grep and headings, the test files named in the checks. `.the-way/task-cycle/slice_size.py` (header) for the limits.
- Searched for any existing dialog, modal or overlay in `src/browser`: none (the window is the first, as the task says).

## Guidelines found missing or uncertain

- `guidelines/styleguide-browser-view.md`: no rule about a window, a layer, a close button or Escape on a game screen (slice 6 adds it); the Roles table has no role for the pieces of a bar of time or for a backdrop, and a role's text may stand as a fill only where D-39/D-40 say so (`positive` and `text` already stand as fills of the requirement bar) — so the pieces of the bar cannot be told apart by colour without a new value; the rule "The kitchen-sink page" requires a sample for every shared control, state and role, and it is unclear whether a window, which is no shared control, needs one (the plan says no).
- `guidelines/coding-browser-module.md`: no rule about focus handling in a component that is not a screen; the rule on Effects asks for a cleanup function for an Effect that connects to a layout outside React, and moving focus when the window appears is such a case without anything to clean up — the executor of slice 3 must read it narrowly. The *Examples* describe `createCharacterScreen`-style boundaries for screens only.
- `guidelines/coding-saved-game.md`: its example "Przebieg mapy po wczytaniu" does not mention the record the manual run now holds; the task changes the tables of the two coding files only (To do 13), so the example stays as it is — noted for the review of the foundation.
- `guidelines/testing.md`: focus, Escape and real layout are listed as "not tested on purpose" (D-88) on jsdom, so slices 3 and 4 are checked in jsdom for structure and callbacks and need a manual check in a real browser (the plan says so in their *Checks*; this is unchecked work of the plan, not of a command).
- Both `the-way-maintain-styleguide` and `the-way-maintain-coding-guidelines` are described as "leading … the matters of a task's refinement with the human": slices 6 and 7 give them to executors who cannot ask the human; if a skill needs a human answer the executor must return a question instead of deciding.

## The chosen order against the styleguide's example

The example "Plan of a user-interface change" (environment, values in their source, one screen, its states, shared controls and kitchen-sink page) is followed in spirit: no new font, token or shared control is needed, so the first two steps do not occur; the screen's parts come in the order texts (slice 2), component and its stylesheet rules (slice 3), the screen and the view (slice 4), the removal from the old place (slice 5), the rule of the styleguide last (slice 6). The departure: the simulation and the save come first (slice 1) because the window reads fields that do not exist yet, which the example does not cover.

## Unread material

- Every decision of the dispatch's two lists (the 29 and the 39 listed; D-342 and D-343 and the rest of D-339 to D-348 included): read whole by heading to the next heading. **Unread: none.**
- Invariants: the ones named above read whole; the others judged irrelevant and unread beyond their statement and *Part* lines in the filtered list (see above).
- `guidelines/*`: the seven files of the dispatch read whole.
- `foundations/part_map.md` and `foundations/glossary.md`: read whole.
- Source and tests: read in the parts listed under "Reaches beyond the dispatch"; the rest of `game.ts` (1-195), `saved-game.ts` (1-60, 120-740, 1000-1321), `programs.ts`, `loop.ts` (rest), `app.ts` (rest), `styles.css` (rest), `program-panel.tsx` (rest), `rule-list.tsx`, `maps-screen.tsx` and all test files except the parts named were not read; slices name those they need, and the executors read their *Change* files whole.

## Searches not found or unclear

- Not found: any existing window, dialog or overlay pattern in the product (grep for `dialog`, `modal`, `overlay`, `popup`, `aria-modal` in `src/browser`: no hit).
- Unclear: the base gate. The cycle record says the base gate failed on `tests/account-mail.test.mjs` "a server that stops answering yields failed within the shortened deadline and loses the connection" (2040 of 2041 passed); the Python gate and the foundation check were still running when I wrote the plan. I did not run the gate. A slice's focused check can therefore not be read as "the whole gate is green".
- Unclear: whether „Koniec przejścia” in the header stands before „Restart” or after „Zakończ”; the task says "Do „Restart” albo „Zakończ”" and gives no position — the plan puts it before „Restart” (a *Choices* row).
- Unclear: the task gives the hours as the wording "po 8 godzinach czasu realnego" and says the hours come from the balance data; for another number the plural form would be wrong (the plan reads `BALANCE.resurrectionRenewalRealMinutes`, now 480, and keeps the task's wording; named in *Choices*).
- Unclear: the task asks for „Ostatnie minuty” to end with the death entry and also gives the chronicle edits after the end (D-342); the plan reads the entries up to and including the death entry (a *Choices* row).

## Questions open for the orchestrator (with proposed answers)

1. **Colours of the pieces of the bar of time.** The token file has no value that tells up to six pieces apart, and `src/browser/AGENTS.md` lets a value enter only with its source settled with the human. Proposed: take the plan as it is (pieces filled in `text` on a `highlight` track, parted by a gap of `--frame-width`, the legend in the same order), and put the missing values to the human in the request description with a preview; slice 3's executor names what it lacks. Evidence: `src/browser/tokens.css` (roles listed there), styleguide "No value in place of a design token" and "Every value with its source".
2. **Covered screen hidden or layered.** The plan hides the covered header and areas while the window stands and draws the window as a block under the menu bar; it reads "przykrywa ekran" as what the player sees. A positioned layer would match the letter more closely but needs the unknown height of the menu bar and the warning row. Proposed: keep the plan; if the human wants the screen to stay drawn beneath, slices 3 and 4 move to a layer (*Choices*, row 7). Evidence: `src/browser/styles.css:187-292`, `src/browser/view/app.ts:405-425`.
3. **Role of the death title.** `text-strong` (a heading) in the plan, against `text` in „Teraz” (D-334). Proposed: keep; the styleguide rule of slice 6 names it, and the human sees it in the request.
4. **Size of slices 1 and 4.** Each fits the script but is the largest of the plan; if an executor returns one as too large, the proposed cut is slice 1 into "record in the simulation" and "version 4 and the reader" taken together with a test that the saved round trip is red in between (hence one slice now), and slice 4 into the screen's modules and the game view. I did not split them because a split leaves a red build or a red round trip between the halves.
5. **Review of the window's behaviour in a real browser** (Escape, focus after closing, the menu bar working above the window, the window at 1280 × 720 and under 1074 px) is not a command of any slice; proposed: the orchestrator or the human does it with the skill `loop2-play` before the request.
