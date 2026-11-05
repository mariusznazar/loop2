# Handoff — slice 13 of the task `edytor-programu`

## Delegation

The person who requested this cycle delegated every intermediate choice to the orchestrator of
`implement-task`. You never ask the human. A question goes back to the orchestrator in your report
with status `questions`; a fact or permission nobody supplies makes you `blocked`. Nothing here is the human's approval.

## Where you work

- Worktree (work from its root): `C:/Storage/repos/loop2-wt/edytor-programu`, branch `task/edytor-programu`.
  Your base (the head when you start): `3d81280`. Commit your work on this branch; push nothing.
- Pinned process: the worktree's `.the-way` at `f45ca40724251a46965aed69f733d0a35c430048`.
- You make: **a slice, or the retry of a slice** — slice 13. Read in full `.the-way/task-cycle/change/SKILL.md` (project skill
  `the-way-make-change`) and `.the-way/task-cycle/change/slice.md`; read `.the-way/task-cycle/change/ui_check.md` when the slice changes a user interface (the step that names it comes).
- Report: `docs/task-cycles/edytor-programu/reports/report-slice-13.md` (if your tool refuses the file, return the whole report as text).
- Commit by paths with `git add <paths>` only (never `-A`, `.`, `-a`); messages in English in the repository's form (see `git log --oneline -8`, e.g. `feat: :sparkles: …`, `docs: :memo: …`). Do not run the product's gate (`npm test` with no argument); run the focused checks your section names, each with command and exit code in the report.

## Answers of the start

- Trust boundary: the change touches `assets/icons/**` (files from game-icons.net) in slices 3 and 4 only; the review of those slices checks crafted input there.
- Irreversible operation: none. Open design choice: none; a choice of how to make what the task and the foundation settle is yours to make and name in the report; a real open design choice makes you return `returned` with no code.
- The foundation step has run: the entries D-288 to D-307 and the changed ones (D-03, D-27, D-39, D-43, D-44, D-91, D-93, D-124, D-166, D-180, D-196, D-245, D-255, D-282, icon-credits, the icon title facts, game-icons-licence) are written. Entry ranges below are current ones; they hold where they differ from the plan's.
- The base gate already fails on `tests/quality/test_quality_invariants.py::test_ruff_source_rules` and `::test_shellcheck_source_rules` (`FileNotFoundError`: ruff and shellcheck are not installed on this computer). That is the base's state: report any other failure of that file as yours.
- Two of the 11 icons are not by Delapouite or Lorc (see the foundation step's report): `logging` is by Skoll (https://game-icons.net/1x1/skoll/logging.html) and `dodge` by Felbrigg (https://game-icons.net/1x1/felbrigg/dodge.html); the foundation names them in `game-icons-licence`. Relevant only to slices 3 and 4.
- Orchestrator's notes (autonomous choices, recorded in the cycle record, not the human's); read the reports they come from (`docs/task-cycles/edytor-programu/reports/report-slice-9.md` … `report-slice-12.md`):
  - Slice 12 made `src/browser/view/program-panel.tsx` (one React root per panel; `RuleListView`, `RulePanelView`, `TripPlanView` are components inside it; `createFolding` store given by the game view). On the screen of a map run the rule panel stands UNDER the rows (the grid `repeat(auto-fit, minmax(300px, 1fr))` always stacks it there); your task is to move it into the place of the table of revealed tiles, beside the drawing of the map, as your Goal says. On Programy it stands at the right of the editor already.
  - `src/browser/view/controls/react-number-field.tsx` imports `tripCount` from `src/browser/view/trip-editor.ts`. You remove `createTripEditor` and the DOM editor: **keep `tripCount` alive** — move it to a module that stays (e.g. `src/browser/view/program-editor.ts` beside the other pure functions, or another file already in your *Change* list) and update the import in `react-number-field.tsx` and in `tests/view/trip.test.mjs`/the tests that use it; name the move in the report. `src/browser/view/controls/react-number-field.tsx` is thus also yours for the import line only.
  - The rule panel's number field: slice 12 added `event.preventDefault()` on Enter in the number field's wrapper in `rule-panel.tsx` (a real-browser defect: Chromium delivered the same Enter to the cell of the next pick). Keep it.
  - „+ dodaj grupę” stands in a footer below the groups in `rule-list.tsx` (slice 9 choice 2); the whole-change review judges it; do not move it.
  - The area claims of the task: on Programy the list, the editor and the rule panel are three areas of the screen that a narrower layout can rearrange (D-282); check it at a width above and below 1344 px.
  - Real-browser work: `.claude/skills/loop2-play/SKILL.md` (playwright-cli installed), `compose-state.mjs` for states playing does not reach, `frames.js` for motion; stop every process you start, delete `.playwright-cli/`; put screenshots under `docs/task-cycles/edytor-programu/reports/` named `slice-13-*.png` and list their full paths in the report.

## Your section of the plan, word for word (`docs/task-cycles/edytor-programu/plan.md`)

### Slice 13 — The editor in its place on both screens, and the DOM editor gone

- **Goal:** on the screen of a map run, while a rule or a group is open in the rule panel, the panel stands in the place of the table of revealed tiles, beside the drawing of the map, which stays, and the table comes back when the panel closes (To do item 3, question 3): `run-screen.ts` and `terrain-panel.ts` give a host element in that place, the program panel draws its rule panel there through its own React tree (a portal) and tells the screen whether it is open, so the screen hides the table meanwhile. On Programy the list, the editor and the rule panel stand as three areas of the screen that a narrower layout can rearrange (row E2). The DOM editor leaves: `createProgramEditor` and every non-pure part of `program-editor.ts` from line 534, `createTripEditor` of `trip-editor.ts`, and every pure function no file uses any more, the pure rules that stay keeping their cases; the cases of `tests/view/program-editor.test.mjs` that drew the DOM editor leave, each with its reason and the case of the new tests that carries its behaviour named. The cases of `tests/view/account-screen.test.mjs` that read the table of revealed tiles beside an open rule panel change with their reason.
- **Change:** `src/browser/view/run-screen.ts` · `src/browser/view/terrain-panel.ts` · `src/browser/view/program-panel.tsx` · `src/browser/view/game-view.ts` · `src/browser/view/program-editor.ts` · `tests/view/program-editor.test.mjs` · `src/browser/view/trip-editor.ts` · `tests/view/account-screen.test.mjs` · `src/browser/styles.css`
- **Read:** `docs/task-cycles/edytor-programu/task.frozen.md:29-31` To do · `docs/task-cycles/edytor-programu/task.frozen.md:47-52` Acceptance criteria · `docs/task-cycles/edytor-programu/task.frozen.md:68-74` Questions to settle · `docs/task-cycles/edytor-programu/task.frozen.md:129-134` Questions to settle · `docs/task-cycles/edytor-programu/task.frozen.md:193-211` Context · `docs/task-cycles/edytor-programu/task.frozen.md:217-219` Human actions · `docs/task-cycles/edytor-programu/task.frozen.md:225-232` Wpisy projektowane, które zadanie urzeczywistnia i pisze · `docs/task-cycles/edytor-programu/task.frozen.md:320-328` Out of scope
  `guidelines/coding.md` · `guidelines/coding-browser-module.md` · `guidelines/styleguide-browser-view.md` · `guidelines/testing.md` · `src/browser/AGENTS.md`
  `foundations/part_map.md:3-28` browser-view
  `foundations/decisions.md:402-426` D-19 · `foundations/decisions.md:443-475` D-21 · `foundations/decisions.md:1433-1444` D-75 · `foundations/decisions.md:1604-1615` D-88 · `foundations/decisions.md:2283-2302` D-125 · `foundations/decisions.md:2407-2427` D-130 · `foundations/decisions.md:3012-3030` D-166 · `foundations/decisions.md:5126-5153` D-254 · `foundations/decisions.md:5392-5432` D-265 · `foundations/decisions.md:5841-5883` D-280 · `foundations/decisions.md:5918-5937` D-282 · `foundations/decisions.md:5939-5956` D-283
  Foundation entries rows E1, E2, E5, E6, E38
  `foundations/invariants.md:198-212` player-map-run-pace · `foundations/invariants.md:35-43` browser-view-framework · `foundations/invariants.md:459-467` browser-view-token-values · `foundations/invariants.md:469-477` browser-view-focus-outline · `foundations/invariants.md:1189-1197` document-test-memory-limit
  `src/browser/view/tile-list.ts` · `src/browser/view/terrain-picture.ts` · `tests/view/tile-list.test.mjs` · `tests/view/trip.test.mjs` · `tests/view/page-document.mjs` · `.claude/skills/loop2-play/SKILL.md`
  made by earlier slices, named without backticks as they do not exist at the base: tests/view/rule-editor.test.mjs (Slices 9 and 10) · tests/view/trip-plan.test.mjs (Slice 11) · tests/view/program-panel.test.mjs as Slice 12 left it · src/browser/view/rule-panel.tsx (Slice 10)
- **Model:** same — the screen of a map run, its table of tiles and the program panel meet in DOM and React at once, and the removal of the DOM editor must take no behaviour with it.
- **Risk:** none
- **Checks:** start from the failing case of the table of revealed tiles hidden while the rule panel is open on the screen of a map run; `npm test -- tests/view/account-screen.test.mjs`; `npm test -- tests/view/program-editor.test.mjs`; `npm test -- tests/view/program-panel.test.mjs`; `npm test -- tests/view/rule-editor.test.mjs`; `npm test -- tests/view/trip-plan.test.mjs`; `npm test -- tests/view/tile-list.test.mjs`; `npm test -- tests/view/trip.test.mjs`; `npm run typecheck`; `npm test -- tests/invariants/test_browser_view_framework.py`; `npm test -- tests/invariants/test_browser_view_token_values.py`; `npm test -- tests/invariants/test_browser_view_focus_outline.py`; `npm test -- tests/quality/test_quality_invariants.py`; in a real browser on `npm run local`, screenshots of: the screen of a map run with the rule panel in place of the table, beside the drawing, and the table back after „✕”; Programy with three areas in a wide window and in one narrower than 1344 px; the number typed at 16× on the screen of a map run with the panel in its new place, text and cursor kept over three seconds of frames; a drag between groups and a cancelled drag, the line gone after each; the rule of the acceptance criterion written in six actions; the report lists what each screenshot shows and what failed — the request carries them, and Mariusz's own writing of rules at the request stays outside the cycle (*Human actions*: none)
- **Depends on:** Slice 12 · E1 · E2 · E5

## Passages of the task named in your *Read*, word for word (`docs/task-cycles/edytor-programu/task.frozen.md`)

### task.frozen.md:29-31

1. Na ekranie Programy i na ekranie przejścia stoi jeden nowy edytor, zbudowany w React; dzisiejsze wiersze z natywnymi listami znikają z obu miejsc. Na ekranie Programy zadanie wymienia środek, który zostawia zadanie 4 obok listy programów, i dokłada panel reguły po prawej (pytanie 4). Edytor na Programach pokazuje zawsze zapisany program, a gdy ręczne przejście trwa albo czeka po końcu na „Restart” albo „Zakończ”, nad edytorem stoi „Zmiany tutaj nie dotykają przejścia na mapie {mapa}.”, a „Przełącz postać na ten program” stoi tylko na ekranie przejścia (pytanie 13).
2. Wiersz reguły czyta się jak zdanie, na przykład „Zapas poniżej 8 · Patyk → Zbierz — Patyk”, i służy do czytania, nie do zmiany. Przy regule stoi numer, na przykład „2.1”, a przy grupie „2”, oraz czas jednego wykonania: „10 min”, „tura” w walce, dla ruchu w przejściu krok tej mapy, a poza przejściem przy ruchu nic (pytanie 6); ten sam czas stoi też w panelu, przy czynności (pytanie 17).
3. Panel reguły stoi obok wierszy, a nie nad nimi, i to w nim gracz zmienia regułę: na ekranie Programy po prawej od edytora, a na ekranie przejścia na czas edycji w miejscu tabeli odsłoniętych kafelków, obok rysunku mapy, aż zadanie 6 zbuduje trzy obszary (pytanie 3).

### task.frozen.md:47-52

### Acceptance criteria

- Liczba wpisywana w panelu i fokus zostają na miejscu, gdy przejście idzie przy 16× (D-03: „the screen of a map run changes up to five times a second beside fields in which the player types”; ryzyko z tej decyzji: „a number field whose value the game clips may lose its cursor”).
- Po każdym przeciągnięciu reguły albo grupy, także między grupami i także przerwanym, linia upuszczenia znika (ryzyko z D-03: „a rule dragged between groups may leave the drop line on the screen”).
- Regułę „Zapas poniżej 8 · Patyk → Zbierz — Patyk” gracz pisze od kliknięcia wiersza w 6 działaniach: wiersz, „Zapas poniżej”, liczba 8 z Enterem, „Patyk”, „Zbierz”, „Patyk”.
- Przed scaleniem Mariusz pisze kilka reguł w nowym edytorze na gałęzi prośby o scalenie, uruchomionej przez `npm run local`; prośba o scalenie niesie zrzuty i przebieg sprawdzenia agenta (pytanie 10).

### task.frozen.md:68-74

- Pytanie 3. Gdzie stoi panel reguły na ekranie przejścia, dopóki zadanie 6 nie zbuduje trzech obszarów?
  - Answer: A — panel na czas edycji zajmuje miejsce tabeli odsłoniętych kafelków, obok rysunku mapy. Koszt przyjęty: tabela znika na czas edycji. Rysunek i potrzeby zostają, a to docelowe zachowanie, które zadanie 6 tylko przenosi.
  - Not chosen:
    - B, osobna trzecia kolumna — „program i świat oddają 344 px, a reguły układu są do skasowania w zadaniu 6”
    - C, trzy obszary już teraz — „największa część zadania 6 w i tak dużym zadaniu, zmiana planu”
    - D, panel pod wierszem — „przeczy zdaniu o panelu obok i przesuwa reguły”
  - Source: human, 2026-11-03, „poza tym nie mam zastrzeżeń do rekomendacji”, pakiet rundy, B8, rekomendacja A.

### task.frozen.md:129-134

- Pytanie 10. Jak człowiek sprawdza zmianę przed scaleniem?
  - Answer: Y — Mariusz pisze kilka reguł przez `npm run local` na gałęzi przed scaleniem; agent i tak przechodzi każdy ekran w przeglądarce, ale to Mariusza nie zastępuje. Powód: „„nie będę się krzywił” nie pokaże żaden zrzut”. Przy tej drodze sekcja *Human actions* mówi `none`.
  - Not chosen:
    - X, zrzuty w prośbie o scalenie, Mariusz gra po scaleniu — „nikt nie sprawdza pisania przed scaleniem”
    - Z, wdrożenie gałęzi na serwer testowy przed scaleniem — „to samo plus wdrożenie”
  - Source: human, 2026-11-03, „poza tym nie mam zastrzeżeń do rekomendacji”, pakiet rundy, B17, wiersz zadania 5.

### task.frozen.md:193-211

## Context

- Szkic edytora i jego osiem zasad stoją w `C:\Storage\The Brain\The Brain\Notes\Projects\(P) Loop\rozpoznanie_mvp2\rozpoznanie_projektant.md`, część B.3, a układ ekranu Programy w części A.3; szkic jest materiałem, nie specyfikacją.
- Część „Pisanie” w `C:\Storage\The Brain\The Brain\Notes\Projects\(P) Loop\research_edytor_programu_wow.md` mówi, skąd biorą się te zasady: skargi graczy dotyczą mechaniki edycji, nie modelu reguł.
- Stary edytor, punkt wyjścia i minimum według definicji: `C:\Storage\repos\loop\src\components\probe\RulesPanel.tsx`, `C:\Storage\repos\loop\src\components\probe\Pickers.tsx`, zrzuty `C:\Storage\The Brain\The Brain\.playwright-mcp\rozpoznanie\loop_09_edycja_reguly.png` i `C:\Storage\The Brain\The Brain\.playwright-mcp\rozpoznanie\loop_10_lista_akcji.png`.
- Definicja mówi o nim: „Projekt bierze z nich podział na ekrany, układ i rozwiązania interakcji, a odchodzi od nich tylko wtedy, gdy wychodzi lepiej, nigdy gorzej.”
- Ikony starego Loop leżą w `C:\Storage\repos\loop\public\icons\` przy commicie cdc7c0d.
- Czyste funkcje edycji w `src/browser/view/program-editor.ts:37-532` nie rysują niczego; do wymiany jest część od wiersza 534.
- Wzorcem ekranu w React jest `src/browser/view/account-card.tsx` (D-36), a `program-editor.ts` i `program-panel.ts` mają w `guidelines/coding-browser-module.md` status `do not copy`.
- W `src/browser/view/controls/` są dziś postaci React tylko przycisku (`react-button.tsx`) i pola tekstowego (`react-text-field.tsx`); postać React przycisku niszczącego przynosi zadanie 4.
- Przeciąganie stoi dziś na natywnym przeciąganiu przeglądarki (`src/browser/view/program-editor.ts:883`), więc zadanie nie potrzebuje biblioteki, a biblioteka na Reacta wymagałaby zmiany D-270.
- Grupy przestawia się dziś strzałkami (`src/browser/view/program-editor.ts:77`); po tym zadaniu tylko uchwytem.
- Ryzyko z D-254: „a drag may catch a select list instead of a handle”, więc sprawdzenie przeciągania w prawdziwej przeglądarce chwyta uchwyt.
- `offeredResources` czyta mapę z `sendMaps` w `src/browser/view/headquarters.ts:33` (`src/browser/view/program-editor.ts:212`), a zadanie 4 rozbija `headquarters.ts`; dziś edytor ukrywa „Idź”, „Zbierz”, „Obchód”, „Tu leży mniej niż” i „Zapas poniżej”, gdy nie ma celu do wskazania (`src/browser/view/program-editor.ts:132-135`, `:166-193`).
- Jedyną czerwienią w spoczynku na kontrolce jest dziś `.button.destructive` (`src/browser/styles.css:159-161`).
- Zatwierdzona definicja zamknęła rozjazdy z D-44, D-93, D-166 i wpisem o pisaniu reguły, które dziennik planu trzymał do 2026-11-03; zadanie bierze brzmienie z definicji o odcisku 9641f804, nie z tamtych linii dziennika.
- Projektowany D-180 przyjmuje, że plan kopii nie zmienia się w trakcie przejścia, a D-131, D-186, uzasadnienie D-179 i niezmiennik trip-plan-progress mówią o takiej zmianie jak o możliwej; nie stają się fałszywe, bo funkcje symulacji zostają, więc to rzecz do przeszukania fundamentu w cyklu.
- Stan gry nie zmienia kształtu, bo zwinięcie grup zostaje poza zapisem, więc zadanie nie podbija wersji zapisu.
- „Dodaj regułę z tym” zadania 6 otworzy ten sam panel na polu, które wypełniło odkrycie, a nie zawsze na warunku (pytanie 19).

### task.frozen.md:217-219

## Human actions

none

### task.frozen.md:225-232

### Wpisy projektowane, które zadanie urzeczywistnia i pisze

- (new) — How does the player write a program rule?: „One program editor stands on Programy and on the screen of a map run. A rule's row reads as a sentence and a rule panel beside the rows changes it: each pick moves on to the next field, conditions, actions and targets stand as cells in groups that the keyboard can reach, the conditions in two columns, and what the player may not pick stands greyed with its reason. Rules move by a handle with a line showing where they land, by arrows, and between groups, and whole rule groups move by a handle with such a line, with no arrows in the header of a rule group.”
- (new) — What do the screens leave room for from the start?: „Each column of a screen is an area of its own that a narrower layout can rearrange, Siedziba draws the team as a section with a heading, and the rule panel offers its pick in steps, the action first and its target after it.” Zadanie czyni prawdziwą część o panelu reguły i o obszarach ekranu Programy; Siedzibę daje zadanie 4, a pozostałe ekrany zadania 6, 13 i 22.
- D-44 — Which controls do the screens of the browser view build on?: „The screens of the browser view build every button, select list, number field, text field and cell of a pick from the eight shared controls of `src/browser/view/controls/` — the button, the destructive button, the button selected in its group, the secondary action (D-275), the select list, the number field, the text field and the pick cell — and the buttons „Zakończ”, „Usuń”, „Restart”, „Porzuć zmiany”, „Przełącz postać na ten program” and „Zatrzymaj” are destructive buttons, neutral until the pointer or the focus reaches them and then in `danger`.” Reszta wpisu stoi w definicji; „Wyślij ponownie” bez słowa o nagłówku czyni prawdziwym zadanie 4, a zadanie 5 zapisuje wpis w całości (pytanie 15).
- D-93 — What does a program rule show the player?: „On Programy and on the screen of a map run the list of rules stands under the heading „sprawdzane od góry”, and during a manual map run every program rule of the copy the map run carries out shows how many times it fired in that map run, written as „Wykonano {n}×”, such as „Wykonano 3×”, wherever rules show counts the header of their rule group shows their sum in the same form, such as „Wykonano 21×”, and the rules of a saved program the program editor shows then show no count. The count starts from zero at the start of each manual map run, a map run restart included, at a switch of the character to another program, and when the program rule's condition or action changes; it survives reordering the rule, moving it to another rule group, changing its group's condition or name, and a save of the copy. Before the game's first manual map run the rules show no counts; after a manual map run ends in death or in a completion its counts remain beside the copy's rules, and after „Zakończ” beside the rules of the program the copy belongs to, each rule there showing the count of the same rule of the copy where the two have the same condition and action and „Wykonano 0×” otherwise, and beside the rules of no other program, until the next send or map run restart, subject to the same reset on a change of a rule's content.”
- D-166 — Where does the player see the player's programs and pick the one to edit?: „The screen Programy holds on the left the list of the player's programs and in the middle the program editor with the program picked there. That program is always a saved one, never the copy: while a manual map run goes on, or has ended and waits for „Restart” or „Zakończ”, „Zmiany tutaj nie dotykają przejścia na mapie {mapa}.” stands above the editor, and „Przełącz postać na ten program” stands on the screen of a map run alone. On the screen of a map run the program panel shows the copy, and its select list holds „Kopia w przejściu” at its top and the player's saved programs below it.” Listę po lewej stawia zadanie 4 (pytanie 4).
- D-255 — Where does the data an agent checks the game on come from?: „An agent builds the game state a check needs with functions of the simulation and sends it by the ordinary save request to a local server with a database made for that check, and it reaches early states by playing. One command of the repository starts the game locally over HTTPS, and a check touches neither the test server nor a player's save.” W fundamencie stoi część o graniu, napisana przez zadanie 1, więc zadanie zmienia D-255.

### task.frozen.md:320-328

## Out of scope

- Tła `rule-winning` i `rule-running`, pasek przy regule i grupie oraz powód daje zadanie 11, które idzie zaraz po tym zadaniu, razem z tłem otwartego wiersza, który wygrywa albo trwa (pytanie 20).
- Cenę przy czynności daje zadanie 23.
- Trzy obszary ekranu przejścia daje zadanie 6.
- „Eksploruj” od startu i „+ reguła” nigdy nie wyłączone daje zadanie 10.
- Zwinięcie wzmianek i rysowanie maską pozostałych ikon daje zadanie 24.
- Listę programów po lewej, menu i adresy ekranów daje zadanie 4.
- Ikonę zajęcia nad głową maga daje zadanie 7, z ikonami czynności z tego zadania.

## Foundation entries of your *Read*: current ranges in the worktree

The identifier is the address; the range is its size now. Read each whole, with its rationale and rejected options.

- `foundations/part_map.md:3-28` browser-view
- `foundations/decisions.md:402-426` D-19
- `foundations/decisions.md:443-475` D-21
- `foundations/decisions.md:1433-1444` D-75
- `foundations/decisions.md:1604-1615` D-88
- `foundations/decisions.md:2297-2316` D-125
- `foundations/decisions.md:2421-2441` D-130
- `foundations/decisions.md:3026-3044` D-166
- `foundations/decisions.md:5140-5167` D-254
- `foundations/decisions.md:5411-5451` D-265
- `foundations/decisions.md:5860-5902` D-280
- `foundations/decisions.md:5937-5960` D-282
- `foundations/decisions.md:5962-5979` D-283
- `foundations/invariants.md:198-212` player-map-run-pace
- `foundations/invariants.md:35-43` browser-view-framework
- `foundations/invariants.md:459-467` browser-view-token-values
- `foundations/invariants.md:469-477` browser-view-focus-outline
- `foundations/invariants.md:1189-1197` document-test-memory-limit
- `foundations/decisions.md:6072-6106` D-288
- `foundations/decisions.md:5169-5198` D-255

Where the plan's *Read* names a guideline file, a source file, a test or a file made by an earlier slice, open it by that path (whole, as *Read* says) — the paths in your section above are relative to the worktree root. Files made by earlier slices exist now in the worktree.

## Report

Write the full report: status (`done`, `done with concerns`, `questions`, `returned`, `reserved`, `blocked`), your commits, what each check showed with command and exit code, your own-work check (the weakest point of your slice, how you checked it and what it showed), for a user-interface slice the states and screenshot evidence as `ui_check.md` gives (or a screenshot unchecked, with its reason), each reach beyond this handoff, **Searches not found or unclear:** each thing looked for and not found or unclear, or `none`, and concerns. Return only: status, commits, a one-line check result naming what failed or did not run, and the report path.
