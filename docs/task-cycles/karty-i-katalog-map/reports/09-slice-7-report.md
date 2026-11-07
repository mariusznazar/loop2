# Report - slice 7 (The screen Mapy in React)

**Status:** done with concerns

**Commits** on `task/karty-i-katalog-map` (base `6ef8213`), worktree clean after them (`.runs/` is ignored):

- `64d94de` `feat: :sparkles: add the screen Mapy in React with its list of maps, the card of a map and the section Kto idzie`
- `ee2d0a2` `feat: :sparkles: draw the screen Mapy in two areas with the roles of the styleguide`

## Files changed

| File | Added | Removed |
|---|---|---|
| `src/browser/view/maps-screen.tsx` (new) | 469 | 0 |
| `tests/view/maps-screen.test.mjs` (new) | 835 | 0 |
| `src/browser/styles.css` | 212 | 2 |

`maps-screen.tsx`: `createMapsScreen({ controls, props })` returns `element`, `update(props)`, `focus()` and `dispose()`; first render synchronous (`flushSync`), a new root per screen, as `character-screen.tsx`. Props: `state`, `nowMs`, `mapId | null`. Controls: `pick`, `enter`, `startLoop`, `stop`. Two areas of their own (`.screen.maps-screen` holding `.screen-area.maps-list-area` and `.screen-area.maps-card-area`). Components: `MapList`, `MapCard`, `CharacterRow`, `MapsView`. The pure lines come from `map-lines.ts`, `team-lines.ts`, `trip-lines.ts` as slices 4 and 5 left them; names of maps and resources come from the data only.

`styles.css`: the two grid rules of Programy (columns and the 720 px rule) now also name `.screen.maps-screen`, so the two areas have the columns of Programy and stand one under the other under 720 px; a block of `maps-*` rules at the end draws each part in the role of the styleguide's rule "The screen Mapy".

## Checks

All from the worktree root.

| Command | Exit | Result |
|---|---|---|
| `npm test -- tests/view/maps-screen.test.mjs` (written first, against an empty stub of `createMapsScreen`) | 1 | 20 of 20 cases fail on the empty screen (assertions on missing output, e.g. `expected ["Las"], got []`, `expected "Kto idzie", got undefined`; the cases that walk to a missing element fail on reading it). No failure is a missing module or a syntax error. |
| `npm test -- tests/view/maps-screen.test.mjs` (final) | 0 | 20 tests, 20 pass |
| `npm test -- tests/quality/test_node_test_selection.py` | 0 | Ran 1 test, OK |
| `npm test -- tests/invariants/test_browser_view_framework.py` | 0 | Ran 9 tests, OK |
| `npm test -- tests/invariants/test_browser_view_token_values.py` | 0 | Ran 4 tests, OK |
| `npm test -- tests/invariants/test_content_identifiers.py` | 0 | Ran 4 tests, OK |
| `npm run typecheck` | 0 | passed (an earlier attempt failed on the typing of the ref callbacks, fixed before the commit) |
| `npm test -- tests/quality/test_quality_invariants.py` (first run) | 1 | ESLint: `'MapDef' is defined but never used` in `maps-screen.tsx` |
| `npm test -- tests/quality/test_quality_invariants.py` (after removing the import) | 0 | Ran 5 tests, OK |

The four invariant tests and the typecheck were run again after the last edit (the removal of the unused import); all exit 0. No invariant test was added or changed, so no "invariant seen failing" run applies.

Not run: the full `npm test` (the orchestrator's gate), `python -B .the-way/elements/common/foundation_check.py` (not in this slice's Checks), the running game in a real browser (see state check and own-work check).

## State check of the screen (method and evidence)

Method: the test on jsdom through `tests/view/page-document.mjs` (D-264); the real browser is slice 8's. Evidence: `npm test -- tests/view/maps-screen.test.mjs`, exit 0, 20 cases; each state below names its case. The roles were read in code against `guidelines/styleguide-browser-view.md`, rule "The screen Mapy" (table at the end of this section). Reading code shows no rendered appearance; the screenshot is unchecked (see own-work check).

Components:

| Component | Class | Where it stands |
|---|---|---|
| List of open maps | `ul.maps-list-items` (accessible name „Mapy”), rows `a.maps-list-item` | left area |
| Empty right area | `p.maps-card-empty` | right area, no map named |
| Card of a map | `div.maps-card` with heading and `section.maps-card-part` for „Żąda”, „Teren”, „Leży tu”, „Czyha”, „Odbiera” | right area |
| „Kto idzie” | `section.maps-who`, `li.maps-who-member` per character, or `p.maps-who-empty` | right area under the card |

States (all by the case named):

| State | Case (name of the test) | What it shows |
|---|---|---|
| No map named | "with no map named the list holds the open maps alone and the right area says to pick from it" | list holds Las only (Las — głębiej absent while Las is unsolved), right area is the sentence „Wybierz mapę z listy.” alone, no row marked, no card, no „Kto idzie” |
| A map named off the list | "a map named whose opener is unsolved draws no card" | the sentence, no card (guard; the page resolves such an address to Siedziba) |
| Las not solved | "the card of Las holds its heading, what it asks, its terrain and what lies there, and no part Las lacks" | heading „Las”, no „rozwiązana”; „Żąda” (the condition sentence), „Teren” with the four lines (83 min, 25 °C), „Leży tu” with four resources and the four icon addresses; no „Czyha”, no „Odbiera”; and "a row is a link ..." for the row link `#/mapy/forest` and the marked row |
| Las solved, „Puść w pętlę”, rehearsal mark, sentence of an empty bring list | "„Wejdź” is the main button ...", "an empty list „Wynieś” puts ...", "a rehearsal the loop cannot repeat is marked under „Wejdź” at a solved map alone" | „rozwiązana” in the row and the heading; „Puść w pętlę” only at a solved map, the plain button; the mark under „Wejdź”; „Pętla nic nie zarobi do skrzynki” beside „Puść w pętlę” with the button active; none of it at an unsolved map |
| Las — głębiej once Las is solved | "the card of Las — głębiej names its opener, shows the wolf and the mean gap, and the Understanding stays as it was" | „odsłania ją Las”, „Czyha” with „wilk · 24 zdrowia · cios 7” and the total-number line, 5 × 5, random entrance, 33 min / 7 °C; the Understanding unchanged |
| A character in an earning loop | "a character in an earning loop shows its line and „Zatrzymaj” ..." | loop line, „Zatrzymaj” (destructive, acts through `stop`), „Wejdź” and „Puść w pętlę” inactive, no „Pętla zatrzymana …” even with a stopped loop in the state; another character is not affected |
| A manual map run going on, waiting and ended | "a manual map run going on, waiting and ended keeps „Wejdź” inactive ..." | all three states: every „Wejdź” inactive, „Puść w pętlę” inactive at the run's character alone, the sentence last under the buttons of each character |
| A resurrection not ready | "a resurrection not ready reads the time left in danger and turns ready with the clock" | the line in `danger` with the time left, ready again at the moment (the clock's `nowMs`) |
| An empty team | "a team with no character reads the sentence under the heading of „Kto idzie”" | heading and „Drużyna nie ma jeszcze postaci. Załóż ją w Siedzibie.” |
| „Wejdzie: nic” | "„Wejdzie: …” is what a send takes ..." | empty chest at an unsolved map, an empty take list, and the non-empty cases („patyk 2” cut by the chest, „patyk 6, jagoda 4” from nowhere at a solved map) |
| Clipped-plan line | "a map that cuts the plan shows the clipped-plan line and what enters cut" | No map of the data has an entry cap today, so the state is not reachable from the data. The pure line is covered by the `tripWarning` cases in `tests/view/trip.test.mjs`; this case gives Las an entry cap for its length and checks the line, its place after „Wejdzie: …”, „Wejdzie: patyk 5”, and that a fitting plan leaves no line |
| Parts no map reaches today | "a step other than the usual one, a resource that does not renew and the entry and exit caps stand in their roles" | with the data changed for the case: the step note in its own element, „nie odnawia się” in the `warning` element, the two caps in `warning` elements, no „Odbiera” where a map has no cap |
| Focus | "after „Puść w pętlę” the focus goes ...", "after „Zatrzymaj” with „Wejdź” inactive ..." | jsdom: focus to that character's „Zatrzymaj” after the loop starts, to „Wejdź” after the stop, to the list „Program:” where „Wejdź” stays inactive; a later draw pulls nothing back |

Roles in the stylesheet, read against the styleguide's rule (class: role): `maps-list-item`: `text`, picked `text-strong` + `selected` bar, hover `highlight`; `maps-list-solved`, `maps-card-solved`: `positive`; `maps-card-empty`, `maps-card-opened-by`, `maps-card-note`, `maps-who-resurrection`, `maps-who-enters`, `maps-who-run-note`, `maps-who-empty`: `text-secondary`; `maps-who-resurrection.danger`: `danger`; `maps-card-name`, `maps-who-name`: `text-strong`; `maps-card-part-name`, `maps-who-heading`, `maps-who-program-label`: `text-label`; `maps-card-warning`, `maps-who-empty-loop`, `trip-warning`, `rehearsal-mark`: `warning`; `maps-who-loop-line`: `text`; the divider above „Kto idzie” and between characters: `divider`. „Wejdź” (kind `main`) and „Zatrzymaj” (destructive) take their looks from the shared button.

## Own-work check (section 3)

- **Requirement most likely unmet:** the focus rule - "after „Puść w pętlę” the keyboard's focus goes to that character's „Zatrzymaj”, and after „Zatrzymaj” to its „Wejdź”" (To do, Choices) - because the pressed button turns inactive or leaves in the very commit that should receive the focus, and the page, not the screen, answers the click.
- **Check:** the two focus cases, which call `screen.update(...)` from inside the control as the page does, press the buttons through a real click event and read `document.activeElement`; plus five mutations of the code, each run against the whole test file:
  - M1 (the owed focus never recorded): 5 failing cases, both focus cases among them;
  - M2 („Wejdź” inactive only in a loop, not during a manual run): 5 failing, the manual-run case and the "Wejdź inactive" focus case among them;
  - M3 („Puść w pętlę” inactive for every character during a manual run): 3 failing, the manual-run case among them;
  - M4 („Wejdzie” read from the chest at a solved map): 3 failing, the "Wejdzie" case among them;
  - M5 (the sentence of an empty bring list removed): 3 failing, its case among them.
  Each mutation was reverted (the committed file is the unmutated one).
- **Result:** all five mutations caught; the unmutated file passes 20 of 20. jsdom does not prove real focus or rendering (testing guideline, "Not tested on purpose"); the real browser is slice 8's.
- **Screenshot (ui_check.md):** unchecked. This change alters what a screen shows, but no route of the running game leads to the screen yet (the page does not build it until slice 8), so no running product shows it; the states were checked in code and on jsdom, as above. Reading code shows no rendered appearance, in particular none of the layout at 720 px and none of the roles' colours as drawn.

## Choices (the way rejected, and the cost if wrong)

- **Labels of the buttons** follow Siedziba's pattern with the map: `Wejdź: {name}, mapa {map}`, `Puść w pętlę: {name}, mapa {map}`, `Zatrzymaj: {name}`, `Program: {name}`. Rejected: dropping the map (the card already names it). Cost if wrong: one string each; slice 8/9 tests that look for a label read these.
- **Focus mechanism:** the click handler records the owed focus in a ref before it calls the page; a layout effect without a dependency list consumes it after the next commit (an effect that only reads refs, like `useCardLock` of the exemplar). Rejected: focusing from the handler (the target does not exist yet / the pressed button is still enabled); a state variable (an extra render). Cost if wrong: if the page's answer comes in a later commit than the click's, the effect would run on the wrong commit; the page calls `update` synchronously from the control, as `game-view.ts` does for Postać.
- **Focus after „Zatrzymaj” when „Wejdź” stays inactive** (another character's manual run) goes to that character's list „Program:” instead of falling to the body. Not asked for in the task; added because a disabled button cannot take the focus. Rejected: leaving it. Cost if wrong: one fallback line. After „Puść w pętlę” there is no fallback: if the start did not take, the focus stays on the button.
- **The step note** („ — drożej niż zwykle” / „ — taniej niż zwykle”) comes from `terrainLines` as the end of the „krok” string, so the view splits it by a regular expression on those two literals to draw it in `text-secondary`. Rejected: changing `terrainLines` to return the note apart (outside this slice's *Change*). Cost if wrong: if the wording in `map-lines.ts` changes, the note loses its role silently (the line still reads correctly). The case "a step other than the usual one ..." guards it with the wording.
- **A map named that is not on the list** draws the sentence „Wybierz mapę z listy.” and no card, and no row is marked. The page resolves such an address to Siedziba (D-281), so this is only a guard; sending to such a map is refused by the simulation (D-149).
- **Resource icon `alt=""`** (decorative): the text beside it already names the resource. Rejected: `alt` with the name (trip-plan does that, where no text stands beside the icon); a screen reader would read the name twice.
- **Where the sentence of a waiting map run stands:** last in the character's block, under the buttons and the marks (To do 5, item 7).
- **Test data mutation:** two cases change `MAPS` (the data module the view reads) for their length and restore it in `finally`, to reach the states no map has today (a step other than the usual one, a resource that does not renew, entry and exit caps, a clipped plan). `node:test` runs each file in its own process, so nothing leaks to another file. Rejected: leaving these parts without a screen case (the pure lines are covered in `map-lines.test.mjs`, but not their roles on the screen). Cost if wrong: a field renamed in `MapDef` makes those two cases fail on a changed data shape, which is the right signal.

## Reaches beyond the handoff

- `.the-way/task-cycle/change/ui_check.md`: read, because the method names it for a change that alters what a screen shows.
- `tests/view/map-lines.test.mjs` lines 1-60, `tests\view\team-lines.test.mjs` lines 1-40, `tests\view\headquarters.test.mjs` lines 1-20 and `tests\view\trip.test.mjs` (grep for `tripWarning`): to see how the pure lines are tested and which cases cover the clipped-plan line.
- `src/browser/sim/trip.ts` (`sendTake`), `src\browser\sim\loop.ts` (`startLoop`), `src\browser\sim\game.ts` (`send`, `canSendMap`), `src\browser\sim\data\maps.ts` and `resources.ts`, `src\browser\sim\types.ts`: for the signatures and data the screen and the test states use.
- `tests/invariants/test_content_identifiers.py` lines 1-80: to know which names the view must not write (`Las`, `forest`, `stick`, `mech` ...).
- `src/browser/styles.css` (the `.app-main`, `.screen`, `.screen-area`, shared button rules and the Siedziba rules): the stylesheet is in my *Change*, but I read the rules of Programy and of Siedziba whole around the places I touched.
- `a private note in the author's vault`: read before the commits.
- The other files of the handoff's *Read* were read whole or in the named range; the task passages and the foundation entries were read as the handoff gives them (D-03, D-18, D-36, D-39, D-40, D-44, D-54, D-55, D-134, D-149, D-165, D-170, D-180, D-188, D-217, D-243, D-244, D-245, D-251, D-264, D-265, D-267, D-268, D-274, D-282, D-287, D-325 to D-332; the invariants and glossary entries and the part map entry it names).

## Searches not found or unclear

- Unclear: the styleguide's rule "The screen Mapy" (`guidelines/styleguide-browser-view.md`) says that after a stop "wiersz „Pętla zatrzymana …” w `text-secondary`" stands at the character in „Kto idzie”, while this slice's goal, the task (question 5) and D-245 say it does not stand here. I followed the slice (no such line; one case asserts that no „Pętla zatrzymana” text stands). The styleguide line is slice 1's and is untrue to the decisions; it needs correcting by the step that owns the guidelines (slice 10 or the return step).
- Unclear: the handoff gives no class names for the DOM of the screen; I chose `maps-*` (list `maps-list-*`, card `maps-card-*`, section `maps-who-*`). Slice 8 and any later test read these.
- Not performed: the screenshot of the running game (no route yet); the mutation tool (browser-view uses the in-head check, per the testing guidelines).
- Nothing else sought was missing.

## Questions and concerns

1. **Styleguide wording about „Pętla zatrzymana …”** (see Searches): decide which text is right and correct the other. Recommendation: the decisions are right (D-245 puts the line on the card and screen of the character); remove the clause from the styleguide rule "The screen Mapy". If nothing is done, a reviewer reading the styleguide against this screen will flag a missing line.
2. **The step note is cut from a string by a regular expression** (see Choices). Recommendation: when a later slice or task next touches `map-lines.ts`, make `terrainLines` return the note apart. If left, nothing breaks today (no map has a different step); a rewording of the note would silently lose its `text-secondary` role.
3. **Page wiring for slice 8:** the screen expects the page to call `update` synchronously from the control (the focus move depends on it), and to pass `mapId` from the resolved address. Siedziba's `send` is the existing refusal path for a send of a character that fails (it throws for a run going on); the screen keeps „Wejdź” inactive in the same cases, but the page's `enter` should still treat a refusal as the simulation does today.
4. **Layout widths:** the two areas take `minmax(200px, 1fr) minmax(320px, 3fr)`, the columns of Programy, as the plan's Choices give. The card with „Kto idzie” in 3fr was not looked at in a real browser; if a character's block is too cramped, slice 8's browser check will show it.
