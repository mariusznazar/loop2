# Plan — Ekran Mapy z listą otwartych map, kartą mapy i sekcją „Kto idzie”

- Task: `docs/task-cycles/karty-i-katalog-map/task.md`
- Spec: none
- Base: 213670952542816b8dd86117f815c3869cc090d5 (the task branch's HEAD is the pin move
  58d48490ef7a61b37e04d1cc09b3c7f5e21ff96c, which changed only `.the-way`; every range below is
  read at that commit)

## Foundation entries

| Entry | Kind | From | What depends on it |
|---|---|---|---|
| Settlement 1 — the card of a map follows the card of the old Loop: its parts, numbers from the map's data, parts the map lacks absent, and the five departures | decision | Settlements to record, row 1 | Slices 1, 2, 5, 7 |
| Settlement 2 — the card shows all of the map's data whatever the player discovered, and the Understanding does not change by it | decision | Settlements to record, row 2 | Slices 5, 7 |
| Settlement 3 — the order of the lines at each character in „Kto idzie”, „Wejdzie: …” always, the sentence of an empty team, „Wejdź” opening the screen of the map run and „Puść w pętlę” leaving the player on the card | decision | Settlements to record, row 3 | Slices 1, 5, 7, 8 |
| Settlement 4 — the first of the three clicks is „Mapy” on the menu bar, and no button at a character in Siedziba leads to the screen Mapy | decision | Settlements to record, row 4 | Slices 1, 8, 9 |
| Settlement 5 — „Wybierz mapę z listy.” on the right under `#/mapy` before a pick, and the row of the list as a link with „rozwiązana”, picked as a program on the list of programs | decision | Settlements to record, row 5 | Slices 1, 7 |
| Settlement 6 — `{map}` of `#/mapy/{map}` is the map's identifier in the game's data as it stands | decision | Settlements to record, row 6 | Slice 6 |
| (new) What does the screen Mapy show? | decision | projected, written whole | Slices 1, 7, 8 |
| (new) What does the game say before an earning loop that earns nothing? | decision | projected, written whole | Slices 1, 5, 7 |
| D-53 — sending from the card of the map on the screen Mapy | decision, changed | projected, written whole | Slice 8 |
| D-134 — „rozwiązana” on the list and the card of the screen Mapy | decision, changed | projected, written whole | Slices 5, 7 |
| D-149 — a map whose opener is unsolved absent from the screen Mapy | decision, changed | projected, written whole | Slices 6, 7 |
| D-165 — „the program picked for a character” in place of the headquarters row | decision, changed | projected, written whole | Slices 7, 8, 10 |
| D-170 — the list „Program:” at the character in „Kto idzie” | decision, changed | projected, written whole | Slices 7, 8, 10 |
| D-180 — „and the card of a map shows what of it enters” | decision, changed | projected, written whole | Slices 2, 5, 7 |
| D-188 — the line of a clipped trip plan at a character on the card of a map | decision, changed | projected, written whole | Slices 5, 7 |
| D-243 — „Puść w pętlę” at each character in „Kto idzie” of a solved map, beside „Wejdź” | decision, changed | projected, written whole | Slices 7, 8 |
| D-251 — the rehearsal mark under „Wejdź” in „Kto idzie” | decision, changed | projected, written whole | Slices 5, 7 |
| D-280 — the part of this task: the screen Mapy, the item „Mapy” on the menu bar and the sentence of three clicks (task 22 writes Wiedza) | decision, changed in part | projected, the part the code makes true | Slices 1, 6, 8 |
| D-281 — the part of this task: `#/mapy` and `#/mapy/{map}`, a map off the list falling under „and any other Siedziba” | decision, changed in part | projected, the part the code makes true | Slice 6 |
| D-282 — the part of this task: the list of maps and the card as areas of their own, and the section „Drużyna” with its heading in Siedziba in React; the writer ties it to the present sentence or adds an example to *Verification* | decision, part | projected, the part the code makes true | Slices 7, 9 |
| D-133 — the part of this task: the card of each open map shows the sentence of its solving condition (task 14 writes the rest) | decision, changed in part | projected, the part the code makes true | Slices 5, 7 |
| D-03 — the screen Mapy and Siedziba as `.tsx` components; the projected wording equals the present one, so the writer ties it and writes no change | decision, unchanged | projected, the part the code makes true | Slices 7, 9 |
| D-287 — in the wording of *Decisions in play*: the screen Mapy beside Siedziba and Postać, „Wejdź” in place of „Wyślij”, the sentence under the inactive buttons of each character in „Kto idzie”, and the two examples of *Verification* | decision, changed | the task's *Obecne decyzje, które zadanie zmienia poza przydziałami planu* (question 3) | Slices 1, 7, 8, 9 |
| D-274 — in the wording of *Decisions in play*: the new heading, „Wejdź” in the main look at each character, the example of *Verification* and *Rejected* way B | decision, changed | the same section (question 6) | Slices 1, 3, 7 |
| D-217 — its first sentence with „and that character in the section „Kto idzie” of the card of a map” | decision, extended | the task's *Wpisy zadania 4, które zadanie rozszerza* (question 4) | Slice 7 |
| D-244 — its first sentence with „and at that character in the section „Kto idzie” of the card of a map” | decision, extended | the same section (question 5) | Slice 7 |
| D-55 — the example of *Verification* moved to „Wejdź” in „Kto idzie”, naming the state after the end of a map run too | decision, example corrected | the task's *Przykłady do poprawy w tym zadaniu* (question 12) | Slice 8 |
| D-171 — the example of *Verification* moved to the list „Program:” at the character in „Kto idzie” | decision, example corrected | the same section (question 12) | Slice 8 |

No invariant, glossary term, environment fact or change of the part map: every file the change adds
falls under `src/browser/view/**`, `src/browser/sim/**`, `tests/view/**` or `tests/sim/**`, which
the part map already gives to `browser-view` and `simulation`.

## Slices

### Slice 1 — Styleguide of the screen Mapy and of the main look of „Wejdź”

- **Goal:** `guidelines/styleguide-browser-view.md` carries the look of what this task adds (To do
  9), written as the column „The cycle's author, in `implement-task`” of the project skill
  `the-way-maintain-styleguide` gives — the file written from the task document after
  `.the-way/product-guidelines/template.md` and `.the-way/product-guidelines/styleguide/template.md`,
  each rule citing its decisions by the identifiers the plan's *Foundation entries* got. The rule
  "Menu bar, the menu „Konto” and the list of programs" holds the item „Mapy” between „Siedziba” and
  „Programy”, a link to `#/mapy`, marked on `#/mapy` and on `#/mapy/{map}` (To do 1). A rule of the
  screen Mapy gives the look of its two areas: the list of maps — each row a link with the map's name
  and, for a solved map, „rozwiązana” in `positive` after it; the picked row as the picked program on
  the list of programs, text in `text-strong` and a bar in `selected` on its left; the right area
  before a pick, „Wybierz mapę z listy.” in `text-secondary`; the card of a map with its heading and
  parts as To do 4 gives them; and the section „Kto idzie” with its lines at each character as To do
  5 and 6 give them. Where the task names no role for a part, the rule takes the role whose meaning
  D-39 or D-40 already gives (a name of a section in `text-label`, a description in
  `text-secondary`, what fails to happen in `warning`), never a new role, meaning or token value. The
  rules "Main button, secondary action and tab" and "States of shared controls" take the settlement
  the first left to the task of the screen: „Wejdź” at each character in „Kto idzie” has the main look
  though it sends no form, drawn by the new kind `main` of the shared button
  (`createButton(text, { kind: "main" })`, `<ReactButton kind="main">`, the class `main`), which
  slice 3 adds, and „Puść w pętlę” beside it stays the plain button (D-274 as rewritten). A look the
  task and the decisions do not settle is no rule: the agent names it in its report.
- **Change:** `guidelines/styleguide-browser-view.md`
- **Read:** `docs/task-cycles/karty-i-katalog-map/task.md:27-73` To do ·
  `docs/task-cycles/karty-i-katalog-map/task.md:112-127` Questions to settle, questions 6 to 8 ·
  `docs/task-cycles/karty-i-katalog-map/task.md:167-176` Context ·
  `docs/task-cycles/karty-i-katalog-map/task.md:193-281` Decisions in play ·
  `docs/task-cycles/karty-i-katalog-map/task.md:283-294` Settlements to record ·
  `docs/task-cycles/karty-i-katalog-map/plan.md:641-660` Choices ·
  Foundation entries: Settlements 1, 3, 4 and 5, (new) What does the screen Mapy show?, (new) What
  does the game say before an earning loop that earns nothing?, D-134, D-188, D-251, D-280, D-281,
  D-287, D-274, D-217 and D-244 as written ·
  `foundations/decisions.md:831-845` D-38 · `foundations/decisions.md:846-860` D-39 ·
  `foundations/decisions.md:861-875` D-40 · `foundations/decisions.md:906-920` D-43 ·
  `foundations/decisions.md:921-935` D-44 · `foundations/decisions.md:3048-3067` D-166 ·
  `foundations/decisions.md:5743-5777` D-274 · `foundations/decisions.md:5778-5804` D-275 ·
  `foundations/decisions.md:5805-5842` D-276 · `foundations/decisions.md:5843-5862` D-277 ·
  `foundations/decisions.md:5886-5909` D-279 · `foundations/decisions.md:5910-5953` D-280 ·
  `foundations/decisions.md:5954-5986` D-281 · `foundations/decisions.md:5987-6011` D-282 ·
  `foundations/part_map.md:3-28` browser-view · `foundations/part_map.md:118-133` agent-workflow ·
  `.claude/skills/the-way-maintain-styleguide/SKILL.md` ·
  `.the-way/product-guidelines/styleguide/SKILL.md` · `.the-way/product-guidelines/template.md` ·
  `.the-way/product-guidelines/styleguide/template.md` · `src/browser/AGENTS.md` ·
  `src/browser/view/menu-bar.tsx:60-82` · `src/browser/styles.css:660-800` ·
  `src/browser/view/controls/button.ts`
- **Model:** cheaper
- **Risk:** none
- **Checks:** `python -B .the-way/elements/common/foundation_check.py`
- **Depends on:** the plan's *Foundation entries*

### Slice 2 — Numbers of the card and what a send takes, in the simulation

- **Goal:** a new module `src/browser/sim/map-card.ts` exports pure functions over a map's
  definition (`MapDef`) that give the card its numbers (carried question 1): the whole game minutes
  a body at the data's start temperature, with no warmth, stays at or above the chill threshold at
  the map's ambient temperature, as `bodyMinute` of `body.ts` cools it, and null where the body does
  not cool below that threshold (Las 83, Las — głębiej 33); for a resource of the map, the tiles
  expected to hold it — its density times the map's tiles, rounded to the nearest whole — with the
  number of tiles (Las, patyk: 11 of 16; Las — głębiej, patyk: 18 of 25); for an attacker, the mean
  game minutes between attacks with the cooldown, the cooldown plus the reciprocal of the chance,
  rounded to whole minutes (wolf: 280, D-142); and the usual step, the step most maps of `MAPS`
  give, the first of the data's order on a tie (5 today). `src/browser/sim/trip.ts` exports one pure
  function giving the entries a send takes into a manual map run — at a map not solved the take list
  clipped by the chest, the carrying capacity and the map's entry cap, at a solved map the take list
  from nowhere as `clippedTake` gives it (D-189, D-214) — and `takeTrip` and `takeFromNowhere` take
  their entries through it, so the line „Wejdzie: …” of slice 5 and the send cannot differ (To do 5,
  item 4). The new test file enters the list of `stryker.config.json`. No field of the game state
  changes. Each expected value is written out in its case from To do 4 or the task's *Context*, with
  the line it comes from.
- **Change:** `src/browser/sim/map-card.ts` · `src/browser/sim/trip.ts` ·
  `tests/sim/map-card.test.mjs` · `tests/sim/trip.test.mjs` · `stryker.config.json`
- **Read:** `docs/task-cycles/karty-i-katalog-map/task.md:40-64` To do, items 4 and 5 ·
  `docs/task-cycles/karty-i-katalog-map/task.md:148-180` Context ·
  `docs/task-cycles/karty-i-katalog-map/task.md:182-187` Questions carried to cycle ·
  `docs/task-cycles/karty-i-katalog-map/task.md:283-294` Settlements to record ·
  `docs/task-cycles/karty-i-katalog-map/plan.md:641-660` Choices ·
  Foundation entries: Settlement 1 and D-180 as written ·
  `foundations/decisions.md:52-120` D-04 · `foundations/decisions.md:390-408` D-18 ·
  `foundations/decisions.md:786-800` D-35 · `foundations/decisions.md:1176-1190` D-58 ·
  `foundations/decisions.md:1206-1220` D-60 · `foundations/decisions.md:1509-1521` D-80 ·
  `foundations/decisions.md:2696-2710` D-142 · `foundations/decisions.md:3272-3286` D-179 ·
  `foundations/decisions.md:3378-3390` D-187 · `foundations/decisions.md:3404-3418` D-189 ·
  `foundations/decisions.md:3978-3995` D-214 ·
  `foundations/invariants.md:214-225` simulation-isolation ·
  `foundations/invariants.md:226-235` simulation-inputs ·
  `foundations/invariants.md:959-968` trip-transfer ·
  `foundations/invariants.md:1039-1048` solved-map-manual-run ·
  `foundations/invariants.md:579-588` node-test-selection ·
  `foundations/invariants.md:599-608` mutation-test-selection ·
  `foundations/part_map.md:30-60` simulation · `foundations/part_map.md:84-116` build-tools ·
  `foundations/glossary.md:142-147` solved map · `foundations/glossary.md:199-203` trip plan ·
  `guidelines/coding.md` · `guidelines/coding-simulation-module.md` · `guidelines/testing.md` ·
  `src/browser/sim/data/maps.ts` · `src/browser/sim/data/balance.ts` · `src/browser/sim/body.ts` ·
  `src/browser/sim/layout.ts` · `src/browser/sim/data/creatures.ts` ·
  `src/browser/sim/data/resources.ts` · `src/browser/sim/run.ts:640-670` ·
  `src/browser/sim/game.ts:189-251` · `src/browser/sim/loop.ts:60-110` ·
  `tests/quality/test_mutation_test_selection.py`
- **Model:** cheaper
- **Risk:** none
- **Checks:** `npm test -- tests/sim/map-card.test.mjs` (written first, failing) ·
  `npm test -- tests/sim/trip.test.mjs` · `npm test -- tests/sim/loop.test.mjs` ·
  `npm test -- tests/quality/test_mutation_test_selection.py` ·
  `npm test -- tests/quality/test_node_test_selection.py` ·
  `npm test -- tests/invariants/test_simulation_isolation.py` ·
  `npm test -- tests/invariants/test_simulation_inputs.py` · `npm run typecheck` ·
  `npm test -- tests/quality/test_quality_invariants.py`
- **Depends on:** the plan's *Foundation entries*

### Slice 3 — The main look of the shared button outside a form

- **Goal:** the shared button gains the kind `main` in both its forms (D-265):
  `createButton(text, { kind: "main" })` in `src/browser/view/controls/button.ts` and
  `<ReactButton kind="main">` in `src/browser/view/controls/react-button.tsx` draw one element of
  the type `button`, never `submit`, with the class `main`. `src/browser/styles.css` draws
  `.button.main` with the main look the rules of `.button[type="submit"]` give — at rest, under the
  pointer, at the focus and disabled — from the same declarations, with no new value (D-274 as
  rewritten, D-43). `tests/view/react-controls.test.mjs` compares the two forms of the kind at rest
  and disabled. The kitchen-sink page shows the DOM form of the kind beside its main button of a
  form, its samples staying in DOM (D-269). The report holds the state check of the control: the
  component, the states drawn, the method — the kitchen-sink page in a real browser through
  `npm run kitchen-sink` — and the evidence.
- **Change:** `src/browser/view/controls/button.ts` · `src/browser/view/controls/react-button.tsx` ·
  `src/browser/styles.css` · `tests/view/react-controls.test.mjs` ·
  `src/browser/kitchen-sink/kitchen-sink.ts`
- **Read:** `docs/task-cycles/karty-i-katalog-map/task.md:66-67` To do, item 7 ·
  `docs/task-cycles/karty-i-katalog-map/task.md:112-116` Questions to settle, question 6 ·
  `docs/task-cycles/karty-i-katalog-map/task.md:252-254` Decisions in play, D-274 ·
  `docs/task-cycles/karty-i-katalog-map/plan.md:641-660` Choices ·
  Foundation entries: D-274 as written ·
  `foundations/decisions.md:906-920` D-43 · `foundations/decisions.md:921-935` D-44 ·
  `foundations/decisions.md:936-950` D-45 · `foundations/decisions.md:966-980` D-47 ·
  `foundations/decisions.md:5453-5494` D-265 · `foundations/decisions.md:5597-5622` D-269 ·
  `foundations/decisions.md:5743-5777` D-274 · `foundations/decisions.md:5886-5909` D-279 ·
  `foundations/invariants.md:459-468` browser-view-token-values ·
  `foundations/invariants.md:469-478` browser-view-focus-outline ·
  `foundations/invariants.md:499-508` application-build-kitchen-sink ·
  `foundations/part_map.md:3-28` browser-view ·
  `guidelines/coding.md` · `guidelines/coding-browser-module.md` · `guidelines/testing.md` ·
  `guidelines/styleguide-browser-view.md` · `src/browser/AGENTS.md` ·
  `src/browser/kitchen-sink/index.html` · `src/browser/kitchen-sink/kitchen-sink.css` ·
  `.claude/skills/loop2-play/SKILL.md`
- **Model:** cheaper
- **Risk:** none
- **Checks:** `npm test -- tests/view/react-controls.test.mjs` (the case of the kind written first,
  failing) · `npm test -- tests/invariants/test_browser_view_token_values.py` ·
  `npm test -- tests/invariants/test_browser_view_focus_outline.py` ·
  `npm test -- tests/invariants/test_application_build_kitchen_sink.py` · `npm run typecheck` ·
  `npm test -- tests/quality/test_quality_invariants.py` · `npm run kitchen-sink`, the page looked
  at in a real browser as `.claude/skills/loop2-play/SKILL.md` gives
- **Depends on:** Slice 1

### Slice 4 — The pure lines leave headquarters.ts

- **Goal:** the pure functions of `src/browser/view/headquarters.ts` that other screens use move to
  two modules that import no DOM, no React and no `.tsx` file, with no change of behaviour (carried
  question 3): `src/browser/view/team-lines.ts` holds `generationLabel`, `resurrectionLine` with
  `ResurrectionLine`, `loopLine`, `stoppedLoopLine`, `runWaitingSentence`, `programPositions` with
  `ProgramPositions`, and `chestLines`; `src/browser/view/map-lines.ts` holds `sendMaps` and
  `solvingSentence`. `headquarters.ts` imports them and keeps `mapLabel` and
  `EMPTY_NAME_MESSAGE`. `character-screen.tsx` and `program-editor.ts` import from the new modules,
  and the comment of `offeredResources` names the first map of the list of maps rather than the
  headquarters. The cases of `tests/view/headquarters.test.mjs` move with their expectations
  unchanged: those of the moved functions to `tests/view/team-lines.test.mjs` and
  `tests/view/map-lines.test.mjs`, each of which imports in Node with no document as the old file
  did; `headquarters.test.mjs` keeps the case of `mapLabel` and the case of an import touching no DOM.
- **Change:** `src/browser/view/team-lines.ts` · `src/browser/view/map-lines.ts` ·
  `src/browser/view/headquarters.ts` · `src/browser/view/character-screen.tsx` ·
  `src/browser/view/program-editor.ts` · `tests/view/headquarters.test.mjs` ·
  `tests/view/team-lines.test.mjs` · `tests/view/map-lines.test.mjs`
- **Read:** `docs/task-cycles/karty-i-katalog-map/task.md:164-165` Context ·
  `docs/task-cycles/karty-i-katalog-map/task.md:182-187` Questions carried to cycle ·
  `docs/task-cycles/karty-i-katalog-map/plan.md:641-660` Choices ·
  `foundations/decisions.md:390-408` D-18 · `foundations/decisions.md:801-815` D-36 ·
  `foundations/decisions.md:3113-3127` D-170 · `foundations/decisions.md:4034-4046` D-217 ·
  `foundations/decisions.md:4047-4063` D-218 · `foundations/decisions.md:4863-4881` D-244 ·
  `foundations/decisions.md:4882-4909` D-245 · `foundations/decisions.md:5453-5494` D-265 ·
  `foundations/decisions.md:5597-5622` D-269 ·
  `foundations/invariants.md:236-247` content-identifiers ·
  `foundations/invariants.md:1049-1058` resurrection-renewal ·
  `foundations/invariants.md:579-588` node-test-selection ·
  `foundations/part_map.md:3-28` browser-view ·
  `guidelines/coding.md` · `guidelines/coding-browser-module.md` · `guidelines/testing.md` ·
  `guidelines/styleguide-browser-view.md` · `src/browser/AGENTS.md`
- **Model:** cheaper
- **Risk:** none
- **Checks:** `npm test -- tests/view/team-lines.test.mjs` · `npm test -- tests/view/map-lines.test.mjs` ·
  `npm test -- tests/view/headquarters.test.mjs` · `npm test -- tests/view/character-screen.test.mjs` ·
  `npm test -- tests/view/program-editor.test.mjs` · `npm test -- tests/view/account-screen.test.mjs` ·
  `npm test -- tests/quality/test_node_test_selection.py` ·
  `npm test -- tests/invariants/test_content_identifiers.py` · `npm run typecheck` ·
  `npm test -- tests/quality/test_quality_invariants.py`
- **Depends on:** none

### Slice 5 — The lines of the card of a map and of „Kto idzie”

- **Goal:** `src/browser/view/map-lines.ts` gains pure functions that give the parts of the card of
  a map from its definition and the numbers slice 2 put in `src/browser/sim/map-card.ts`, each part
  in the words of To do 4 (Settlements 1 and 2): the heading — the map's name, „rozwiązana” for a
  solved map, „odsłania ją {mapa}” with the opener's name from the data; „Żąda” — the sentence of
  `solvingSentence`; „Teren” — „siatka {w} × {h}”, „wejście stałe” or „wejście losowe”, „krok {n}
  min” with „— drożej niż zwykle” or „— taniej niż zwykle” for a step above or below the usual, and
  „bez ognia {m} min — otoczenie {t} °C”, the item left out where the map does not cool the body
  below the chill threshold; „Leży tu” — for each resource its identifier, for its icon, and „{name}
  — ≈ {k} z {n} kafelków, po {stock}, +1 co {r} min”, or, for a resource that does not renew, „nie
  odnawia się” in place of „+1 co …”, given apart so that it stands in `warning`; „Czyha” — for each
  attacker „{name} · {health} zdrowia · cios {damage}” and „{p} % szansy na minutę, {c} min spokoju
  od wejścia i po każdej walce — średnio co ≈ {s} min”, {p} in Polish notation with at most one
  decimal; „Odbiera” — „wnosisz najwyżej {n}” and „wynosisz najwyżej {n}”, each marked to stand in
  `warning`. A part the map does not have comes back empty, so the card leaves it out. Each function
  takes a map's definition, so a case can give a made-up map: a step other than the usual, a resource
  that does not renew, both caps, no attacker. `src/browser/view/trip-lines.ts` gains the line
  „Wejdzie: {item} {n}, …” or „Wejdzie: nic”, from the function slice 2 put in `trip.ts`, and „Pętla
  nic nie zarobi do skrzynki” for a program whose bring list is empty (To do 6); the comment of
  `rehearsalMark` names „Wejdź” (D-251 as rewritten). No name or identifier of a map, resource or
  creature stands in the code (content-identifiers). The expected texts of Las and Las — głębiej are
  written out in the cases from To do 4.
- **Change:** `src/browser/view/map-lines.ts` · `src/browser/view/trip-lines.ts` ·
  `tests/view/map-lines.test.mjs` · `tests/view/trip.test.mjs`
- **Read:** `docs/task-cycles/karty-i-katalog-map/task.md:40-65` To do, items 4 to 6 ·
  `docs/task-cycles/karty-i-katalog-map/task.md:81-93` Questions to settle, questions 1 and 2 ·
  `docs/task-cycles/karty-i-katalog-map/task.md:158-176` Context ·
  `docs/task-cycles/karty-i-katalog-map/task.md:283-294` Settlements to record ·
  `docs/task-cycles/karty-i-katalog-map/plan.md:641-660` Choices ·
  Foundation entries: Settlements 1, 2 and 3, (new) What does the screen Mapy show?, (new) What
  does the game say before an earning loop that earns nothing?, D-133, D-134, D-180, D-188 and D-251
  as written · src/browser/sim/map-card.ts and src/browser/sim/trip.ts as slice 2 left them ·
  `foundations/decisions.md:390-408` D-18 · `foundations/decisions.md:846-860` D-39 ·
  `foundations/decisions.md:1509-1521` D-80 · `foundations/decisions.md:2104-2127` D-118 ·
  `foundations/decisions.md:2314-2336` D-125 · `foundations/decisions.md:2523-2544` D-133 ·
  `foundations/decisions.md:2545-2564` D-134 · `foundations/decisions.md:2584-2612` D-136 ·
  `foundations/decisions.md:2696-2710` D-142 · `foundations/decisions.md:2801-2815` D-149 ·
  `foundations/decisions.md:3287-3299` D-180 · `foundations/decisions.md:3378-3390` D-187 ·
  `foundations/decisions.md:3391-3403` D-188 · `foundations/decisions.md:3404-3418` D-189 ·
  `foundations/decisions.md:3978-3995` D-214 · `foundations/decisions.md:5075-5097` D-251 ·
  `foundations/invariants.md:236-247` content-identifiers ·
  `foundations/part_map.md:3-28` browser-view ·
  `foundations/glossary.md:117-122` Understanding · `foundations/glossary.md:142-147` solved map ·
  `foundations/glossary.md:199-203` trip plan ·
  `guidelines/coding.md` · `guidelines/coding-browser-module.md` · `guidelines/testing.md` ·
  `guidelines/styleguide-browser-view.md` · `src/browser/AGENTS.md` ·
  `src/browser/sim/data/maps.ts` · `src/browser/sim/data/creatures.ts` ·
  `src/browser/sim/data/resources.ts` · `src/browser/sim/data/items.ts`
- **Model:** cheaper
- **Risk:** none
- **Checks:** `npm test -- tests/view/map-lines.test.mjs` (the cases of the card written first,
  failing) · `npm test -- tests/view/trip.test.mjs` ·
  `npm test -- tests/invariants/test_content_identifiers.py` · `npm run typecheck` ·
  `npm test -- tests/quality/test_quality_invariants.py`
- **Depends on:** Slice 2 · Slice 4

### Slice 6 — The addresses of the screen Mapy

- **Goal:** `src/browser/view/screen-address.ts` names two more screens (To do 2, Settlement 6,
  D-281 as written): `{ kind: "maps" }` at `#/mapy` and `{ kind: "map", mapId }` at `#/mapy/{map}`,
  `{map}` being an own key of `MAPS` as it stands — `#/mapy/forest`, `#/mapy/forestDeep` — read as
  `location.hash` gives it and never decoded, so any other text after `#/mapy/` names no screen.
  `resolveScreen` gives Siedziba for a map off the list of open maps, one whose opener is unsolved
  (`canSendMap` over the game's solved maps, D-149), so that a reload at it lands on `#/`;
  `screenAddress` writes both addresses; the type `MenuItem` holds `maps`, which `markedMenuItem`
  gives both screens (To do 1). `src/browser/view/game-view.ts` gives the two kinds no DOM holder,
  as Postać has none, since slice 8 builds the screen Mapy on entering; nothing else of the page
  changes, and nothing links to the addresses before slice 8. No identifier or name of a map stands
  in the code (content-identifiers).
- **Change:** `src/browser/view/screen-address.ts` · `tests/view/screen-address.test.mjs` ·
  `src/browser/view/game-view.ts`
- **Read:** `docs/task-cycles/karty-i-katalog-map/task.md:29-34` To do, items 1 and 2 ·
  `docs/task-cycles/karty-i-katalog-map/task.md:128-138` Questions to settle, questions 9 and 10 ·
  `docs/task-cycles/karty-i-katalog-map/task.md:283-294` Settlements to record ·
  `docs/task-cycles/karty-i-katalog-map/plan.md:641-660` Choices ·
  Foundation entries: Settlement 6, D-149, D-280 and D-281 as written ·
  `foundations/decisions.md:390-408` D-18 · `foundations/decisions.md:2801-2815` D-149 ·
  `foundations/decisions.md:5843-5862` D-277 · `foundations/decisions.md:5910-5953` D-280 ·
  `foundations/decisions.md:5954-5986` D-281 ·
  `foundations/invariants.md:236-247` content-identifiers ·
  `foundations/part_map.md:3-28` browser-view ·
  `guidelines/coding.md` · `guidelines/coding-browser-module.md` · `guidelines/testing.md` ·
  `guidelines/styleguide-browser-view.md` · `src/browser/AGENTS.md` ·
  `src/browser/sim/game.ts:79-88` · `src/browser/sim/data/maps.ts`
- **Model:** cheaper
- **Risk:** none
- **Checks:** `npm test -- tests/view/screen-address.test.mjs` (the cases of the two addresses
  written first, failing) · `npm test -- tests/view/account-screen.test.mjs` ·
  `npm test -- tests/invariants/test_content_identifiers.py` · `npm run typecheck` ·
  `npm test -- tests/quality/test_quality_invariants.py`
- **Depends on:** the plan's *Foundation entries*

### Slice 7 — The screen Mapy in React

- **Goal:** `src/browser/view/maps-screen.tsx` is the screen Mapy (To do 3 to 7), written after the
  exemplar `account-card.tsx` (D-36) with the boundary of `character-screen.tsx`:
  `createMapsScreen({ controls, props })` returns `element`, `update(props)`, `focus()` and
  `dispose()`, its first render synchronous; `props` are the game state, the clock's moment `nowMs`
  and the map the address names or null; `controls` are `pick(characterId, programId)`,
  `enter(characterId, mapId, programId)`, `startLoop(characterId, mapId, programId)` and
  `stop(characterId)`, which the page turns into the simulation's calls. It draws two areas of their
  own (D-282): on the left the list of open maps — `sendMaps` over the solved maps, in the data's
  order, each row a link to `screenAddress({ kind: "map", mapId })` with the map's name and, for a
  solved map, „rozwiązana”, the row of the map named marked as picked; on the right, with no map
  named, „Wybierz mapę z listy.”, and with one, the card from slice 5's lines, each resource with its
  icon `/icons/{icon}.svg` from the data, and under it the section „Kto idzie”. „Kto idzie” holds the
  team's characters in the order of their creation (D-54), each, from the top (To do 5): its name as
  a link to its screen Postać; its resurrection line (D-217 as extended) and, in an earning loop, its
  loop line with „Zatrzymaj” as the destructive button (D-244 as extended); „Program:” with the
  shared select list of `programPositions` over `rowProgram`, whose change calls `pick` (D-170);
  „Wejdzie: …”; the clipped-plan line (D-188); „Wejdź” of the kind `main` and, at a solved map,
  „Puść w pętlę” as the plain button with „Pętla nic nie zarobi do skrzynki” beside it where the bring
  list is empty, the button still active; the rehearsal mark under „Wejdź” (D-251); and, while the
  game state holds a manual map run, the run sentence under the buttons of every character (D-287 as
  written). „Wejdź” stands inactive while the game state holds a manual map run and at a character
  in an earning loop; „Puść w pętlę” at the manual map run's character and at a character in an
  earning loop. An empty team reads „Drużyna nie ma jeszcze postaci. Załóż ją w Siedzibie.”.
  „Pętla zatrzymana …” does not stand here (D-245). Each button and the list carry an accessible name
  with the character's name, as Siedziba's do today. After „Puść w pętlę” the keyboard's focus goes
  to that character's „Zatrzymaj”, and after „Zatrzymaj” to its „Wejdź”. `src/browser/styles.css`
  draws the screen: the two areas as the columns of Programy, one under the other in a window under
  720 px, and each part in the role the styleguide of slice 1 gives. The test file runs on jsdom
  through `tests/view/page-document.mjs` (D-264) and covers each state below. The report holds the
  state check of the screen: its components (list, empty right area, card, „Kto idzie”), the states
  — no map named; Las not solved; Las solved, with „Puść w pętlę”, the rehearsal mark and the
  sentence of an empty bring list; Las — głębiej once Las is solved, with „odsłania ją Las” and
  „Czyha”; a character in an earning loop; a manual map run going on, waiting and ended;
  a resurrection not ready; an empty team; „Wejdzie: nic” — the method (the test on jsdom; the real
  browser in slice 8) and the evidence, the clipped-plan line named as a state no map reaches today,
  which the cases of `tripWarning` cover.
- **Change:** `src/browser/view/maps-screen.tsx` · `tests/view/maps-screen.test.mjs` ·
  `src/browser/styles.css`
- **Read:** `docs/task-cycles/karty-i-katalog-map/task.md:35-67` To do, items 3 to 7 ·
  `docs/task-cycles/karty-i-katalog-map/task.md:75-77` Acceptance criteria ·
  `docs/task-cycles/karty-i-katalog-map/task.md:94-111` Questions to settle, questions 3 to 5 ·
  `docs/task-cycles/karty-i-katalog-map/task.md:122-127` Questions to settle, question 8 ·
  `docs/task-cycles/karty-i-katalog-map/task.md:283-294` Settlements to record ·
  `docs/task-cycles/karty-i-katalog-map/plan.md:641-660` Choices ·
  Foundation entries: Settlements 1, 2, 3 and 5, (new) What does the screen Mapy show?, (new) What
  does the game say before an earning loop that earns nothing?, D-134, D-149, D-165, D-170, D-180,
  D-188, D-243, D-251, D-217, D-244, D-282, D-287 and D-274 as written · src/browser/view/map-lines.ts,
  src/browser/view/team-lines.ts and src/browser/view/trip-lines.ts as slices 4 and 5 left them ·
  `foundations/decisions.md:39-51` D-03 · `foundations/decisions.md:390-408` D-18 ·
  `foundations/decisions.md:801-815` D-36 · `foundations/decisions.md:846-860` D-39 ·
  `foundations/decisions.md:861-875` D-40 · `foundations/decisions.md:921-935` D-44 ·
  `foundations/decisions.md:1095-1113` D-54 · `foundations/decisions.md:1114-1133` D-55 ·
  `foundations/decisions.md:2545-2564` D-134 · `foundations/decisions.md:2801-2815` D-149 ·
  `foundations/decisions.md:3113-3127` D-170 · `foundations/decisions.md:3391-3403` D-188 ·
  `foundations/decisions.md:4034-4046` D-217 · `foundations/decisions.md:4834-4862` D-243 ·
  `foundations/decisions.md:4863-4881` D-244 · `foundations/decisions.md:4882-4909` D-245 ·
  `foundations/decisions.md:5075-5097` D-251 · `foundations/decisions.md:5421-5452` D-264 ·
  `foundations/decisions.md:5453-5494` D-265 · `foundations/decisions.md:5523-5551` D-267 ·
  `foundations/decisions.md:5552-5596` D-268 · `foundations/decisions.md:5743-5777` D-274 ·
  `foundations/decisions.md:5987-6011` D-282 · `foundations/decisions.md:6096-6121` D-287 ·
  `foundations/invariants.md:35-44` browser-view-framework ·
  `foundations/invariants.md:236-247` content-identifiers ·
  `foundations/invariants.md:459-468` browser-view-token-values ·
  `foundations/invariants.md:1189-1198` document-test-memory-limit ·
  `foundations/invariants.md:579-588` node-test-selection ·
  `foundations/part_map.md:3-28` browser-view ·
  `foundations/glossary.md:130-134` manual map run · `foundations/glossary.md:142-147` solved map ·
  `foundations/glossary.md:199-209` trip plan, resurrection ·
  `foundations/glossary.md:217-221` earning loop ·
  `guidelines/coding.md` · `guidelines/coding-browser-module.md` · `guidelines/testing.md` ·
  `guidelines/styleguide-browser-view.md` · `src/browser/AGENTS.md` ·
  `src/browser/view/account-card.tsx` · `src/browser/view/character-screen.tsx` ·
  `src/browser/view/program-list.tsx` · `src/browser/view/controls/react-button.tsx` ·
  `src/browser/view/controls/react-select-list.tsx` · `src/browser/view/headquarters.ts` ·
  `src/browser/view/trip-plan.tsx:195-220` · `src/browser/view/screen-address.ts` ·
  `src/browser/sim/programs.ts:346-372` · `tests/view/page-document.mjs` ·
  `tests/view/character-screen.test.mjs`
- **Model:** cheaper
- **Risk:** none
- **Checks:** `npm test -- tests/view/maps-screen.test.mjs` (written first, failing) ·
  `npm test -- tests/quality/test_node_test_selection.py` ·
  `npm test -- tests/invariants/test_browser_view_framework.py` ·
  `npm test -- tests/invariants/test_browser_view_token_values.py` ·
  `npm test -- tests/invariants/test_content_identifiers.py` · `npm run typecheck` ·
  `npm test -- tests/quality/test_quality_invariants.py`
- **Depends on:** Slice 3 · Slice 4 · Slice 5 · Slice 6

### Slice 8 — Sending moves to the screen Mapy

- **Goal:** `src/browser/view/game-view.ts` builds the screen Mapy on entering `#/mapy` or
  `#/mapy/{map}` and disposes it on leaving, as it does Postać; it gives the screen the game state
  and the clock's moment at each change of the state and at each reading of the clock, so its
  resurrection lines move with real time (D-217); and it turns the screen's acts into the
  simulation's, each an act whose changed state is saved (D-207): `pick` into `pickProgram`;
  `enter` into the clock's send as „Wyślij” does today, after which Przejście opens with a new entry
  of the history and takes the focus (D-53 as written); `startLoop` into the clock's start of a loop,
  the player staying on the screen Mapy (To do 7); `stop` into `stopLoop`. `src/browser/view/menu-bar.tsx`
  holds „Mapy” between „Siedziba” and „Programy”, a link to `#/mapy`, marked on both addresses (To
  do 1, D-277). `src/browser/view/headquarters.ts` loses all that sends — the list „Program:”, „Mapa:
  …”, the sentences of the conditions, „Wyślij”, „Puść w pętlę”, the clipped-plan and rehearsal
  lines and the run sentence — with `mapLabel` and its file `tests/view/headquarters.test.mjs`; its
  rows keep the name, the generation, the archetype, the resurrection line, the loop line with
  „Zatrzymaj” and the line of a stopped loop. The cases of `tests/view/account-screen.test.mjs` that
  send from Siedziba drive „Kto idzie” instead, their expectations unchanged where the behaviour
  stands: the table of acts saved at once, the loop's start and stop, the inactive buttons with the
  run sentence, the rehearsal mark, a send leading to Przejście and „Zakończ” to Postać. New cases
  hold: the bar's „Mapy” leading to `#/mapy` and marked there and on `#/mapy/forest`; a reload at
  `#/mapy/forest` staying there; `#/mapy/forestDeep` before Las is solved, and a map the data lacks,
  opening Siedziba with the fragment replaced and no new entry; the acceptance criterion — a player
  with one character who picked nothing goes from Siedziba through „Mapy”, the row of Las and „Wejdź”
  to the screen of the map run in three clicks; „Puść w pętlę” leaving the player on the screen Mapy.
  Then the screen is checked in a real browser as `.claude/skills/loop2-play/SKILL.md` gives — the
  three clicks, the focus after each button, the link of the name, the two areas side by side and one
  under the other — and the report holds that state check: components, states, method, evidence.
- **Change:** `src/browser/view/game-view.ts` · `src/browser/view/menu-bar.tsx` ·
  `src/browser/view/headquarters.ts` · `tests/view/menu-bar.test.mjs` ·
  `tests/view/account-screen.test.mjs` · `tests/view/headquarters.test.mjs`
- **Read:** `docs/task-cycles/karty-i-katalog-map/task.md:29-34` To do, items 1 and 2 ·
  `docs/task-cycles/karty-i-katalog-map/task.md:52-70` To do, items 5 to 8 ·
  `docs/task-cycles/karty-i-katalog-map/task.md:75-77` Acceptance criteria ·
  `docs/task-cycles/karty-i-katalog-map/task.md:117-121` Questions to settle, question 7 ·
  `docs/task-cycles/karty-i-katalog-map/task.md:134-143` Questions to settle, questions 10 and 11 ·
  `docs/task-cycles/karty-i-katalog-map/task.md:283-294` Settlements to record ·
  `docs/task-cycles/karty-i-katalog-map/plan.md:641-660` Choices ·
  Foundation entries: Settlements 3 and 4, (new) What does the screen Mapy show?, D-53, D-55, D-165,
  D-170, D-171, D-243, D-251, D-280, D-281 and D-287 as written · src/browser/view/maps-screen.tsx as
  slice 7 left it ·
  `foundations/decisions.md:801-815` D-36 · `foundations/decisions.md:1074-1094` D-53 ·
  `foundations/decisions.md:1114-1133` D-55 · `foundations/decisions.md:3113-3127` D-170 ·
  `foundations/decisions.md:3716-3777` D-207 · `foundations/decisions.md:4834-4862` D-243 ·
  `foundations/decisions.md:5421-5452` D-264 · `foundations/decisions.md:5523-5551` D-267 ·
  `foundations/decisions.md:5843-5862` D-277 · `foundations/decisions.md:5910-5953` D-280 ·
  `foundations/decisions.md:5954-5986` D-281 · `foundations/decisions.md:6012-6050` D-283, D-284 ·
  `foundations/decisions.md:6096-6121` D-287 · `foundations/decisions.md:7011-7025` D-323 ·
  `foundations/invariants.md:1229-1238` uncaught-failure-game-state ·
  `foundations/invariants.md:1189-1198` document-test-memory-limit ·
  `foundations/part_map.md:3-28` browser-view ·
  `guidelines/coding.md` · `guidelines/coding-browser-module.md` · `guidelines/testing.md` ·
  `guidelines/styleguide-browser-view.md` · `src/browser/AGENTS.md` ·
  `src/browser/view/clock.ts` · `src/browser/view/screen-address.ts` ·
  `src/browser/view/character-screen.tsx` · `tests/view/page-document.mjs` ·
  `.claude/skills/loop2-play/SKILL.md`
- **Model:** same — it rewires `game-view.ts`, whose screens, clock, saving and address history hang
  together, and moves cases across a page test of 5,700 lines
- **Risk:** none
- **Checks:** `npm test -- tests/view/account-screen.test.mjs` (the cases of the three clicks and of
  the addresses written first, failing) · `npm test -- tests/view/menu-bar.test.mjs` ·
  `npm test -- tests/view/maps-screen.test.mjs` · `npm test -- tests/view/screen-address.test.mjs` ·
  `npm test -- tests/view/uncaught-failure.test.mjs` ·
  `npm test -- tests/view/character-screen.test.mjs` ·
  `npm test -- tests/invariants/test_content_identifiers.py` · `npm run typecheck` ·
  `npm test -- tests/quality/test_quality_invariants.py` · the browser check of the Goal, through
  `npm run local` as `.claude/skills/loop2-play/SKILL.md` gives
- **Depends on:** Slice 7

### Slice 9 — Siedziba in React

- **Goal:** `src/browser/view/headquarters.tsx` replaces `src/browser/view/headquarters.ts`, which
  goes (To do 8, question 11), written after the exemplar `account-card.tsx` (D-36) with the boundary
  of `character-screen.tsx`: `createHeadquarters` takes the acts `create`, `stop` and `closeReport`
  and the props — the game state and the clock's moment — and returns `element`, `update(props)`,
  `focus()` and `dispose()`. Siedziba holds its heading; the report „Gdy cię nie było” or „Pętle,
  które stanęły” above „Drużyna” with „Zamknij” (D-246), drawn in React from the pure functions of
  `away-report.ts`, from which `createAwayReport` and its DOM go; the section „Drużyna” with its
  heading (D-282), and in it at each character its name as a link to its screen Postać, „pokolenie
  {n}” (D-218), its archetype, its resurrection line (D-217), its loop line with „Zatrzymaj” or the
  line of its stopped loop (D-244, D-245), „Drużyna nie ma jeszcze postaci.” for an empty team
  (D-51), and the creation of a character — its label, the field „Imię nowej postaci”, „Załóż” and
  `EMPTY_NAME_MESSAGE` under a name empty once trimmed — whose field keeps its text and its focus
  and whose button keeps its focus at every refresh of the game state; and the section „Skrzynka
  {n}/{cap}” with its lines or „Skrzynka jest pusta.” (D-184). Nothing in it sends a character, and
  no button at a character leads to the screen Mapy (Settlement 4). After „Zamknij” the focus goes to
  the heading „Drużyna” where the report leaves the screen, as today. The screen keeps the class names
  and accessible names `tests/view/account-screen.test.mjs` reads, so that file passes unchanged.
  `src/browser/view/game-view.ts` takes the new boundary and draws Siedziba's resurrection lines at
  each reading of the clock. `src/browser/styles.css` loses the rules only the sending of Siedziba
  used and keeps the others. A new test file on jsdom covers the screen's sections, the empty team
  and chest, the report and its „Zamknij”, the field and button keeping focus through an update, and
  the absence of anything that sends. Then Siedziba is checked in a real browser as
  `.claude/skills/loop2-play/SKILL.md` gives, and the report holds that state check: components,
  states, method, evidence.
- **Change:** `src/browser/view/headquarters.tsx` · `src/browser/view/headquarters.ts` ·
  `src/browser/view/away-report.ts` · `src/browser/view/game-view.ts` · `src/browser/styles.css` ·
  `tests/view/headquarters-screen.test.mjs`
- **Read:** `docs/task-cycles/karty-i-katalog-map/task.md:68-70` To do, item 8 ·
  `docs/task-cycles/karty-i-katalog-map/task.md:139-143` Questions to settle, question 11 ·
  `docs/task-cycles/karty-i-katalog-map/task.md:164-165` Context ·
  `docs/task-cycles/karty-i-katalog-map/plan.md:641-660` Choices ·
  Foundation entries: Settlement 4, D-282 and D-287 as written · src/browser/view/team-lines.ts as
  slice 4 left it ·
  `foundations/decisions.md:39-51` D-03 · `foundations/decisions.md:801-815` D-36 ·
  `foundations/decisions.md:846-875` D-39, D-40 · `foundations/decisions.md:921-935` D-44 ·
  `foundations/decisions.md:1031-1049` D-51 · `foundations/decisions.md:1095-1113` D-54 ·
  `foundations/decisions.md:3339-3351` D-184 · `foundations/decisions.md:3716-3777` D-207 ·
  `foundations/decisions.md:4034-4063` D-217, D-218 · `foundations/decisions.md:4863-4963` D-244,
  D-245, D-246 · `foundations/decisions.md:5421-5452` D-264 · `foundations/decisions.md:5453-5494` D-265 ·
  `foundations/decisions.md:5523-5551` D-267 · `foundations/decisions.md:5552-5596` D-268 ·
  `foundations/decisions.md:5597-5622` D-269 · `foundations/decisions.md:5987-6011` D-282 ·
  `foundations/decisions.md:6096-6121` D-287 · `foundations/decisions.md:7011-7025` D-323 ·
  `foundations/invariants.md:35-44` browser-view-framework ·
  `foundations/invariants.md:1229-1238` uncaught-failure-game-state ·
  `foundations/invariants.md:1189-1198` document-test-memory-limit ·
  `foundations/invariants.md:579-588` node-test-selection ·
  `foundations/part_map.md:3-28` browser-view ·
  `foundations/glossary.md:87-91` headquarters · `foundations/glossary.md:205-221` resurrection,
  generation number, earning loop ·
  `guidelines/coding.md` · `guidelines/coding-browser-module.md` · `guidelines/testing.md` ·
  `guidelines/styleguide-browser-view.md` · `src/browser/AGENTS.md` ·
  `src/browser/view/account-card.tsx` · `src/browser/view/character-screen.tsx` ·
  `src/browser/view/controls/react-text-field.tsx` · `tests/view/away-report.test.mjs` ·
  `tests/view/page-document.mjs` · `tests/view/account-screen.test.mjs:240-260` ·
  `tests/view/account-screen.test.mjs:2520-2570` · `tests/view/account-screen.test.mjs:2660-2870` ·
  `tests/view/account-screen.test.mjs:2895-2980` · `tests/view/account-screen.test.mjs:3337-3545` ·
  `.claude/skills/loop2-play/SKILL.md`
- **Model:** cheaper
- **Risk:** none
- **Checks:** `npm test -- tests/view/headquarters-screen.test.mjs` (written first, failing) ·
  `npm test -- tests/view/away-report.test.mjs` · `npm test -- tests/view/account-screen.test.mjs` ·
  `npm test -- tests/view/uncaught-failure.test.mjs` · `npm test -- tests/view/maps-screen.test.mjs` ·
  `npm test -- tests/view/character-screen.test.mjs` ·
  `npm test -- tests/quality/test_node_test_selection.py` ·
  `npm test -- tests/invariants/test_browser_view_framework.py` ·
  `npm test -- tests/invariants/test_browser_view_token_values.py` ·
  `npm test -- tests/invariants/test_content_identifiers.py` · `npm run typecheck` ·
  `npm test -- tests/quality/test_quality_invariants.py` · the browser check of the Goal, through
  `npm run local` as `.claude/skills/loop2-play/SKILL.md` gives
- **Depends on:** Slice 4 · Slice 8

### Slice 10 — Guidelines and instructions follow the change

- **Goal:** the coding guidelines describe the files as they stand (To do 10), written as the column
  „The cycle's author, in `implement-task`” of the project skill `the-way-maintain-coding-guidelines`
  gives, after `.the-way/product-guidelines/template.md` and
  `.the-way/product-guidelines/coding/template.md`: `guidelines/coding-browser-module.md` holds rows
  of `headquarters.tsx`, `maps-screen.tsx`, `team-lines.ts` and `map-lines.ts`, no row of the gone
  `headquarters.ts`, the row of `away-report.ts` with the status its pure content now has; its example
  „Ekran w Reactcie: Postać” names `loopLine` of `team-lines.ts`; its example „Kontrolki w DOM i ich
  aktualizacja” stands on a module still built in DOM after the change, such as `app.ts`, no longer on
  `headquarters.ts`; and its *Where in code* names no gone file. `guidelines/coding-simulation-module.md`
  holds the row of `map-card.ts`. The instructions that walk an agent into a map run say the new way:
  steps 3 and 5 of „The way into a map run” in both byte-identical copies of the skill `loop2-play`
  lead through „Mapy”, the row of Las and „Wejdź”, and the manual check of `README.md` sends a
  character the same way. The comments of the simulation that place the pick of a program in the
  headquarters row — `game.ts` at `send`, `programs.ts` at `rowProgram` and `pickProgram`, `types.ts`
  at `pickedPrograms`, and `data/maps.ts` at `solvingText` — name the character and the card of the
  map instead (D-165, D-170 and D-133 as written); no code, type or field changes.
- **Change:** `guidelines/coding-browser-module.md` · `guidelines/coding-simulation-module.md` ·
  `.claude/skills/loop2-play/SKILL.md` · `.agents/skills/loop2-play/SKILL.md` · `README.md` ·
  `src/browser/sim/game.ts` · `src/browser/sim/programs.ts` · `src/browser/sim/types.ts` ·
  `src/browser/sim/data/maps.ts`
- **Read:** `docs/task-cycles/karty-i-katalog-map/task.md:72-73` To do, items 10 and 11 ·
  `docs/task-cycles/karty-i-katalog-map/plan.md:641-660` Choices ·
  Foundation entries: D-133, D-165 and D-170 as written · src/browser/view/headquarters.tsx,
  src/browser/view/maps-screen.tsx, src/browser/view/team-lines.ts, src/browser/view/map-lines.ts and
  src/browser/sim/map-card.ts as the earlier slices left them ·
  `foundations/decisions.md:685-699` D-28 · `foundations/decisions.md:771-815` D-34, D-35, D-36 ·
  `foundations/decisions.md:5453-5494` D-265 ·
  `foundations/part_map.md:3-60` browser-view, simulation · `foundations/part_map.md:84-133`
  build-tools, agent-workflow ·
  `.claude/skills/the-way-maintain-coding-guidelines/SKILL.md` ·
  `.the-way/product-guidelines/coding/SKILL.md` · `.the-way/product-guidelines/template.md` ·
  `.the-way/product-guidelines/coding/template.md` ·
  `guidelines/coding.md` · `guidelines/coding-content-data.md` · `guidelines/testing.md` ·
  `src/browser/view/app.ts` · `src/browser/view/away-report.ts` ·
  `tests/agent_workflow/test_loop2_play_skill.py`
- **Model:** cheaper
- **Risk:** none
- **Checks:** `python -B .the-way/elements/common/foundation_check.py` ·
  `npm test -- tests/agent_workflow/test_loop2_play_skill.py` · `npm run typecheck` ·
  `npm test -- tests/sim/saved-game.test.mjs` ·
  `npm test -- tests/invariants/test_content_identifiers.py` ·
  `npm test -- tests/quality/test_quality_invariants.py`
- **Depends on:** Slice 2 · Slice 4 · Slice 7 · Slice 9

## Coverage

| What the task requires | Slices or entries |
|---|---|
| To do 1 — „Mapy” between „Siedziba” and „Programy”, a link to `#/mapy`, marked on each address; no button at a character in Siedziba | Slice 6 (marked item), slice 8 (item on the bar), slice 9 (no button); Settlement 4; D-280 |
| To do 2 — `#/mapy` and `#/mapy/{map}`, a reload staying; `{map}` the data's identifier; a map off the list opening Siedziba | Slice 6, slice 8 (reload and fallback cases); Settlement 6; D-281 |
| To do 3 — two areas, the list of open maps in the data's order, „rozwiązana” in `positive`, the picked row's look, „Wybierz mapę z listy.” | Slices 1, 7; Settlement 5; D-134, D-149, D-282; (new) What does the screen Mapy show? |
| To do 4 — the card: heading, „Żąda”, „Teren”, „Leży tu”, „Czyha”, „Odbiera”, absent parts, the five departures, all of the data whatever was discovered | Slices 2, 5, 7; Settlements 1, 2; D-133 |
| To do 5 — „Kto idzie”: the order of lines at each character, „Wejdzie: …”, the warnings, the run sentence, the resurrection and loop lines, the empty team | Slices 2 (what enters), 5 (lines), 7 (section); Settlement 3; D-170, D-180, D-188, D-217, D-243, D-244, D-251, D-287 |
| To do 6 — „Pętla nic nie zarobi do skrzynki” in `warning` beside „Puść w pętlę”, the button acting | Slices 5, 7; (new) What does the game say before an earning loop that earns nothing? |
| To do 7 — „Wejdź” opens the screen of the map run as „Wyślij” did; „Puść w pętlę” leaves the player on Mapy; „Wejdź” in the main look, „Puść w pętlę” plain | Slices 3, 7, 8; D-53, D-274 |
| To do 8 — Siedziba in React, without anything that sends; what stays in it; the field and „Załóż” keeping focus | Slices 8 (sending leaves), 9 (React); Settlement 4; D-282 |
| To do 9 — the styleguide: „Mapy” in the rule of the menu bar, the look of the list, the card and „Kto idzie”, the main look of „Wejdź” | Slice 1 |
| To do 10 — rows of the new files, the example on a module still in DOM, the row of the simulation's new file | Slice 10 |
| To do 11 — every entry *Decisions in play* marks, D-287, D-274, D-217, D-244 in their wording, the accepted rows, the corrected examples of D-55 and D-171 | the plan's *Foundation entries* |
| Acceptance criterion — three clicks from Siedziba to the first map run | Slice 8 (case of the page test and browser check) |
| Settlement 1 | Foundation entries; slices 2, 5, 7 |
| Settlement 2 | Foundation entries; slices 5, 7 |
| Settlement 3 | Foundation entries; slices 5, 7, 8 |
| Settlement 4 | Foundation entries; slices 8, 9 |
| Settlement 5 | Foundation entries; slices 1, 7 |
| Settlement 6 | Foundation entries; slice 6 |
| Projected entries written whole — (new) screen Mapy, (new) earning nothing, D-53, D-134, D-149, D-165, D-170, D-180, D-188, D-243, D-251 | Foundation entries; slices named in their rows |
| Projected entries in part — D-280, D-281, D-282, D-133, D-03 | Foundation entries; slices named in their rows |
| Carried question 1 — where the card's numbers are computed | Choices; slice 2 |
| Carried question 2 — the widths of the list and the card | Choices; slice 7 |
| Carried question 3 — where the pure functions of `headquarters.ts` go | Choices; slice 4 |
| Carried question 4 — the version of the saved game | Choices: no bump, no field of the game state changes; no slice touches `src/browser/sim/saved-game.ts` or the game state's type |
| Words of the repository that place sending in Siedziba (the skill `loop2-play`, `README.md`, comments of the simulation and the view) | Slices 4, 5, 8, 10 |

## Choices

| Choice | Way rejected | Cost if wrong |
|---|---|---|
| The card's numbers are pure functions of a new simulation module, `src/browser/sim/map-card.ts`, beside the rules they follow (carried question 1) | the view computing them — the cooling of `body.ts` and the spacing of attacks of `run.ts` written twice, drifting apart at the next change of balance | moving pure functions between two modules |
| The usual step is the step most maps of the data give, the first of the data's order on a tie, as the old Loop's `TYPICAL_STEP` counted it; no new value in the data | a balance value „usual step” — a number no settled source gives; a constant in the view — a number of the game's content outside its data | one dopisek at a later map, which that map's task may settle otherwise |
| „bez ognia {m} min” counts the whole game minutes a body at its start temperature, with no warmth, stays at or above the chill threshold (83 and 33, as To do 4 gives); where the map does not cool the body below that threshold, the item is left out | a text such as the old Loop's „nie stygnie”, which the task does not give | one item of the card at a future warm map |
| „≈ {k} z {n}” rounds the density times the tiles to the nearest whole; „średnio co ≈ {s} min” is the cooldown plus the reciprocal of the chance, rounded to whole minutes (D-142: the first eligible minute is 181); the chance in Polish notation with at most one decimal | the old Loop's mean gap after the cooldown in hours — the task chose one number in minutes (question 1, A1) | the wording of one line |
| What a send takes is one pure function of `trip.ts`, through which `takeTrip` and `takeFromNowhere` take, and from which the view writes „Wejdzie: …” | the view clipping the take list itself — the line could drift from what the send takes, which To do 5, item 4, forbids | a refactor of two functions whose cases guard `trip-transfer` |
| „Wejdź” takes the main look from a new kind `main` of the shared button in both forms, the class `main`, drawn by the rules of the main look of a form's button | `submit: true` outside a form — a submit button that submits nothing, and the main look would keep saying it sends a form; a class the screen sets — a screen styling a button of its own (D-44) | one kind of the shared control and its samples |
| The pure functions of `headquarters.ts` move to `team-lines.ts` and `map-lines.ts`, modules with no DOM and no React (carried question 3) | leaving them in `headquarters.tsx` — Postać, Mapy and the DOM module `program-editor.ts` would import a React screen for text, and their pure test would load React | renaming two modules |
| The list of maps and the card take the columns of Programy — the list `minmax(200px, 1fr)`, the card `minmax(320px, 3fr)`, one column under 720 px — layout dimensions D-43 leaves out (carried question 2) | widths of the old Loop's page, not read in this repository; a new width with no source | a rule of the stylesheet |
| The screen Mapy is built on entering its addresses and disposed on leaving, as Postać is, the map coming from the address through `game-view.ts` | a screen built once and hidden, as the DOM Siedziba was — a root and its state living while unseen | the wiring of one screen |
| After „Puść w pętlę” the focus goes to that character's „Zatrzymaj”, and after „Zatrzymaj” to its „Wejdź”, since each button turns inactive or leaves under the keyboard | leaving the focus to fall on the page's body | two lines of the screen |
| Siedziba's report is drawn in React from the pure functions of `away-report.ts`, whose DOM part goes | the DOM report mounted inside the React screen — two kinds of drawing in one screen, which D-265 rejects | one section of one screen |
| Siedziba in React keeps the class names and accessible names the page test reads, so `tests/view/account-screen.test.mjs` holds unchanged through slice 9 | new names — changes to a large test with no change of behaviour | renaming in one test file |
| The saved game's version stays: no field of the game state changes; the picked map lives in the address (D-281) and the card is derived from the data (carried question 4) | a bump „to be safe” — a refused load of every saved game for no change | none found: no slice touches `saved-game.ts` or the type of the game state |
| The styleguide's rules come first, so the slices that draw read them; the coding guidelines last, when the files they name exist | the styleguide after the screens — screens drawn before their rule | the order of two documents |
| The stale words that send from Siedziba — the skill `loop2-play`, `README.md`, comments of the simulation and view — follow the change in its own slices | leaving them — an agent following the skill clicks „Wyślij”, which is gone | a few lines of text |
| The kind `main` gets its DOM sample on the kitchen-sink page, as a new state of a shared control does | no sample — the page would not show every look of the shared button | one sample |

## Orchestrator's notes

Added in the review of the plan (provisional go-ahead, not the human's approval).

- Coverage checked against every item of *To do* 1–11, the *Acceptance criteria*, the six rows of *Settlements to record*, the projected entries and changed entries of *Decisions in play*, the corrected examples and the four carried questions: each stands in the Coverage table. *Risk* is `none` for every slice, as both answers of step 4 are no; each *Checks* line names focused checks and no run of the gate; slice 8 is `same` with its reason.
- D-169's *Rationale* (it names „the select lists of the program panel and of the headquarters”) and D-265's *Verification* example („a new section of the headquarters built in DOM”) become untrue by this change. The task does not list them, but the return step corrects in the same change whatever no longer matches the code, so the return step corrects both: the plan's *Foundation entries* agent leaves them, the return step does not.
- `guidelines/coding-browser-module.md` has no row for the existing React file `src/browser/view/end-question.tsx`; slice 10 adds that row beside the rows it writes, since the same table is edited and a row left out would stay untrue.
- The blank screen between slices 6 and 8 (addresses resolve, nothing draws) is accepted: nothing links to them and no test uses them before slice 8.
- If a slice's executor reaches a file outside its *Change*, it names the reach in its report and the mechanical check passes the mismatch to the review.
- For slice 10 (reported by slice 4): `guidelines/coding-browser-module.md` line 237 says the screen Postać takes `loopLine` from `headquarters.ts`; after slice 4 it lives in `team-lines.ts`. Slice 10 corrects that sentence together with the rows it writes. Slice 2 left no row for `src/browser/sim/map-card.ts` in `guidelines/coding-simulation-module.md`; slice 10 writes it.
- For slice 10 (reported by slices 4 and 5): the table "Files of this kind" of `guidelines/coding-browser-module.md` has no rows for `src/browser/view/map-lines.ts` and `src/browser/view/team-lines.ts` (pure modules, no DOM, no React); slice 10 writes them.
- For slice 10 (reported by slice 7): the rule of the section "Kto idzie" in `guidelines/styleguide-browser-view.md` (around lines 517-523, written by slice 1) says that after a stop the line "Pętla zatrzymana …" in `text-secondary` stands at the character in "Kto idzie". The task (To do 5, item 2 and the paragraph on "Zatrzymaj") and D-245 put that line on the card and the screen of the character only. Slice 10 removes that clause from the styleguide rule and adds the file to its changed files (the only change it makes there).
- For slice 10 (reported by slice 9): after slice 9 `src/browser/view/headquarters.ts` is gone and `headquarters.tsx` is the React screen; `guidelines/coding-browser-module.md` still has a row for `headquarters.ts`, no row for `headquarters.tsx`, `away-report.ts` is now pure only, the example "Kontrolki w DOM i ich aktualizacja" still stands on `headquarters.ts`, and "Where in code" names `src/browser/view/headquarters.ts`. Slice 10 corrects all of these with the example the task item 10 asks for (a module that is still in DOM), and adds the row of `src/browser/view/end-question.tsx`.
