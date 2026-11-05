# Handoff — slice 10 of the task `edytor-programu`

## Delegation

The person who requested this cycle delegated every intermediate choice to the orchestrator of
`implement-task`. You never ask the human. A question goes back to the orchestrator in your report
with status `questions`; a fact or permission nobody supplies makes you `blocked`. Nothing here is the human's approval.

## Where you work

- Worktree (work from its root): `C:/Storage/repos/loop2-wt/edytor-programu`, branch `task/edytor-programu`.
  Your base (the head when you start): `2bf7d42`. Commit your work on this branch; push nothing.
- Pinned process: the worktree's `.the-way` at `f45ca40724251a46965aed69f733d0a35c430048`.
- You make: **a slice, or the retry of a slice** — slice 10. Read in full `.the-way/task-cycle/change/SKILL.md` (project skill
  `the-way-make-change`) and `.the-way/task-cycle/change/slice.md`; read `.the-way/task-cycle/change/ui_check.md` when the slice changes a user interface (the step that names it comes).
- Report: `docs/task-cycles/edytor-programu/reports/report-slice-10.md` (if your tool refuses the file, return the whole report as text).
- Commit by paths with `git add <paths>` only (never `-A`, `.`, `-a`); messages in English in the repository's form (see `git log --oneline -8`, e.g. `feat: :sparkles: …`, `docs: :memo: …`). Do not run the product's gate (`npm test` with no argument); run the focused checks your section names, each with command and exit code in the report.

## Answers of the start

- Trust boundary: the change touches `assets/icons/**` (files from game-icons.net) in slices 3 and 4 only; the review of those slices checks crafted input there.
- Irreversible operation: none. Open design choice: none; a choice of how to make what the task and the foundation settle is yours to make and name in the report; a real open design choice makes you return `returned` with no code.
- The foundation step has run: the entries D-288 to D-307 and the changed ones (D-03, D-27, D-39, D-43, D-44, D-91, D-93, D-124, D-166, D-180, D-196, D-245, D-255, D-282, icon-credits, the icon title facts, game-icons-licence) are written. Entry ranges below are current ones; they hold where they differ from the plan's.
- The base gate already fails on `tests/quality/test_quality_invariants.py::test_ruff_source_rules` and `::test_shellcheck_source_rules` (`FileNotFoundError`: ruff and shellcheck are not installed on this computer). That is the base's state: report any other failure of that file as yours.
- Two of the 11 icons are not by Delapouite or Lorc (see the foundation step's report): `logging` is by Skoll (https://game-icons.net/1x1/skoll/logging.html) and `dodge` by Felbrigg (https://game-icons.net/1x1/felbrigg/dodge.html); the foundation names them in `game-icons-licence`. Relevant only to slices 3 and 4.
- Orchestrator's answers (autonomous choices, recorded in the cycle record, not the human's):
  - Q7: for a held value that no reason of D-289 fits (reported by slice 5: the pick returns `chosen: true, greyed: true, reason: null` for a held action, condition or „Zapas poniżej” item the Understanding or archetype does not hold), the panel shows it chosen and greyed with no reason text. Make up no reason sentence; name the case in your report.
  - Slice 5 (`src/browser/view/program-editor.ts`) holds the pure functions the panel draws: `conditionPick`, `actionPick`, `conditionTargetPick`, `actionTargetPick`, `PICK_REASONS`, `conditionFields`, `ruleFields`, `fieldAfter`, `actionTime`, `ruleSentence`; read their exports and `docs/task-cycles/edytor-programu/reports/report-slice-5.md`. Targets show capitalised (`Patyk`). Number text is plain `String(value)`.
  - Slice 9 (`src/browser/view/rule-list.tsx`, `tests/view/rule-editor.test.mjs`) is made; its report is `docs/task-cycles/edytor-programu/reports/report-slice-9.md`. It asks to open a panel through a callback (`onOpen`) and keeps no panel state; the open row/header is a prop. The rule-panel cases go into the same test file.
  - The pick cell (slice 6) is `src/browser/view/controls/react-pick-cell.tsx`; the React select list and number field (slice 7) are `react-select-list.tsx`, `react-number-field.tsx` (the number field commits on Enter or on leaving the field and keeps its typed text while focused).

## Your section of the plan, word for word (`docs/task-cycles/edytor-programu/plan.md`)

### Slice 10 — The rule panel in React

- **Goal:** a new `src/browser/view/rule-panel.tsx` holds the rule panel as a React component the program panel will hold (Slice 12): for a rule, its fields in the order of row E35 — condition, number, condition's target, action, action's target — each field standing only where the rule's condition or action has it (Slice 5 c); for a rule group, its name (`ReactTextField`) and its condition with its number and target (row E25). Each field's pick is a grid of pick cells (Slice 6) in the groups and sections of row E19, the conditions in two columns, the sections parted by a line in `divider`, each cell as Slice 5 (a) gives it, with the time of one execution beside each action (row E22) and no search, no row „ostatnio” and no current value of a condition (rows E28, E29). Each pick changes the rule at once through a callback carrying a whole new program, and moves to the next field, also a pick of the value already chosen; the number commits on Enter or on leaving its field (the React number field of Slice 7) and moves on; after the last field the panel stays open; „✕”, Esc and the opening of another rule close it (row E35). In a grid the arrow keys move among the cells, a greyed cell included so its reason can be read, Enter picks and does nothing on a greyed cell, and Tab leaves the grid (To do item 4). The panel opens on the field its opener names, the condition unless told, so task 6's „Dodaj regułę z tym” can open it on another (question 19). The panel of the copy during a map run shows „Zmiana zeruje passę tego przejścia.”, with no word of the count (row E31). The look follows the styleguide's rule of Slice 1 in `src/browser/styles.css`: the panel on `panel` with a frame in `divider`, the labels of its fields in `text-label`. `tests/view/rule-editor.test.mjs`, the jsdom file Slice 9 made, gets the panel's cases: the acceptance criterion's rule written from the open panel in five actions after the click on the row — „Zapas poniżej”, 8 with Enter, „Patyk”, „Zbierz”, „Patyk” — giving „Zapas poniżej 8 · Patyk → Zbierz — Patyk”; each reason of row E18 standing beside its cell; a held value outside the pick shown chosen and greyed and changeable; the keys of the grid; the fields that stand and the order; the panel of a group; the sentence of the copy; and a number typed and kept through renders with other game states before Enter (acceptance criterion 1).
- **Change:** `src/browser/view/rule-panel.tsx` · `tests/view/rule-editor.test.mjs` · `src/browser/styles.css`
- **Read:** `docs/task-cycles/edytor-programu/task.frozen.md:29-38` To do · `docs/task-cycles/edytor-programu/task.frozen.md:41-41` To do · `docs/task-cycles/edytor-programu/task.frozen.md:47-51` Acceptance criteria · `docs/task-cycles/edytor-programu/task.frozen.md:56-74` Questions to settle · `docs/task-cycles/edytor-programu/task.frozen.md:90-117` Questions to settle · `docs/task-cycles/edytor-programu/task.frozen.md:162-191` Questions to settle · `docs/task-cycles/edytor-programu/task.frozen.md:225-292` Decisions in play · `docs/task-cycles/edytor-programu/task.frozen.md:294-318` Settlements to record
  `guidelines/coding.md` · `guidelines/coding-browser-module.md` · `guidelines/styleguide-browser-view.md` · `guidelines/testing.md` · `src/browser/AGENTS.md`
  `foundations/part_map.md:3-28` browser-view
  `foundations/decisions.md:39-50` D-03 · `foundations/decisions.md:516-550` D-23 · `foundations/decisions.md:792-805` D-36 · `foundations/decisions.md:852-865` D-40 · `foundations/decisions.md:882-895` D-42 · `foundations/decisions.md:957-970` D-47 · `foundations/decisions.md:2085-2107` D-118 · `foundations/decisions.md:2109-2133` D-119 · `foundations/decisions.md:2262-2281` D-124 · `foundations/decisions.md:2429-2461` D-131 · `foundations/decisions.md:3473-3486` D-196 · `foundations/decisions.md:5360-5390` D-264 · `foundations/decisions.md:5392-5432` D-265 · `foundations/decisions.md:5462-5489` D-267 · `foundations/decisions.md:5491-5534` D-268 · `foundations/decisions.md:5918-5937` D-282
  Foundation entries rows E1, E2, E7, E13, E18, E19, E20, E22, E25, E28, E29, E31, E35, E37, E39
  `foundations/invariants.md:35-43` browser-view-framework · `foundations/invariants.md:459-467` browser-view-token-values · `foundations/invariants.md:469-477` browser-view-focus-outline · `foundations/invariants.md:829-837` streak-program-change · `foundations/invariants.md:1189-1197` document-test-memory-limit
  `foundations/glossary.md:117-122` Understanding · `foundations/glossary.md:124-128` repertoire · `foundations/glossary.md:149-154` streak · `foundations/glossary.md:174-178` copy
  `src/browser/view/program-editor.ts` · `src/browser/view/account-card.tsx` · `src/browser/view/controls/react-button.tsx` · `src/browser/view/controls/react-text-field.tsx` · `tests/view/page-document.mjs` · `tests/sim/understanding-fixture.mjs`
  outside the repository, named without backticks: C:\Storage\repos\loop\src\components\probe\Pickers.tsx, as far as the grid needs, and the screenshot C:\Storage\The Brain\The Brain\.playwright-mcp\rozpoznanie\loop_10_lista_akcji.png
  made by earlier slices, named without backticks as they do not exist at the base: src/browser/view/controls/react-pick-cell.tsx (Slice 6) · src/browser/view/controls/react-number-field.tsx (Slice 7) · src/browser/view/rule-list.tsx (Slice 9) · tests/view/rule-editor.test.mjs (Slice 9)
- **Model:** strongest — the panel is what the project is judged by, and its keyboard grid, its order of fields, its greyed reasons and its number under a fast game meet in one component.
- **Risk:** none
- **Checks:** start from the failing case of the acceptance criterion's rule written in five actions from the open panel; `npm test -- tests/view/rule-editor.test.mjs`; `npm test -- tests/view/program-editor.test.mjs`; `npm run typecheck`; `npm test -- tests/invariants/test_browser_view_framework.py`; `npm test -- tests/invariants/test_browser_view_token_values.py`; `npm test -- tests/invariants/test_browser_view_focus_outline.py`; `npm test -- tests/quality/test_quality_invariants.py`; screenshots: none yet — the panel stands on no screen until Slice 12, so the report marks them unchecked with that reason and the states checked in its test
- **Depends on:** Slice 9 · E1 · E2 · E18 · E19 · E22 · E25 · E28 · E29 · E31 · E35 · E37

## Passages of the task named in your *Read*, word for word (`docs/task-cycles/edytor-programu/task.frozen.md`)

### task.frozen.md:29-38

1. Na ekranie Programy i na ekranie przejścia stoi jeden nowy edytor, zbudowany w React; dzisiejsze wiersze z natywnymi listami znikają z obu miejsc. Na ekranie Programy zadanie wymienia środek, który zostawia zadanie 4 obok listy programów, i dokłada panel reguły po prawej (pytanie 4). Edytor na Programach pokazuje zawsze zapisany program, a gdy ręczne przejście trwa albo czeka po końcu na „Restart” albo „Zakończ”, nad edytorem stoi „Zmiany tutaj nie dotykają przejścia na mapie {mapa}.”, a „Przełącz postać na ten program” stoi tylko na ekranie przejścia (pytanie 13).
2. Wiersz reguły czyta się jak zdanie, na przykład „Zapas poniżej 8 · Patyk → Zbierz — Patyk”, i służy do czytania, nie do zmiany. Przy regule stoi numer, na przykład „2.1”, a przy grupie „2”, oraz czas jednego wykonania: „10 min”, „tura” w walce, dla ruchu w przejściu krok tej mapy, a poza przejściem przy ruchu nic (pytanie 6); ten sam czas stoi też w panelu, przy czynności (pytanie 17).
3. Panel reguły stoi obok wierszy, a nie nad nimi, i to w nim gracz zmienia regułę: na ekranie Programy po prawej od edytora, a na ekranie przejścia na czas edycji w miejscu tabeli odsłoniętych kafelków, obok rysunku mapy, aż zadanie 6 zbuduje trzy obszary (pytanie 3).
4. Warunki, czynności i cele stoją w panelu jako komórki w grupach, do których dochodzi klawiatura, warunki w dwóch kolumnach. Czynności stoją w grupach Ruch (Eksploruj, Wędruj, Idź, Idź — ognisko), Zbieranie (Zbierz, Obchód), Ogień (Wytwórz — ognisko, Zapal — ognisko, Zapal — patyk, Zasil — ognisko) oraz Żywność i walka (Zjedz — jagoda, Uderz — patyk, Kopnij, Odskocz); warunki bez nazw grup, rozdzielone kreską: Zawsze; Temperatura, Sytość, Zdrowie, Energia natury; Zapas, Tu leży, Zostało mniej niż — ognisko, Z dala od — ognisko; Przeciwnik ma poniżej (pytanie 2). Klik wiersza otwiera panel na warunku, kolejne pola to warunek, liczba, cel warunku, czynność i cel czynności, każdy wybór od razu zmienia regułę i przechodzi do następnego pola, a po ostatnim polu panel zostaje otwarty, a zamyka go „✕”, Esc albo otwarcie innej reguły (pytanie 7). W siatce klawisze strzałek chodzą po komórkach, a Enter wybiera; strzałki dochodzą też do komórki wyszarzonej, żeby dało się przeczytać powód, a Enter nic na niej nie robi. Wybór wartości już wybranej też przechodzi do następnego pola, liczbę zatwierdza Enter albo wyjście z pola, a pole liczby i pole celu stoją tylko wtedy, gdy warunek albo czynność je ma (pytanie 17).
5. Rzecz nieodkryta w ogóle nie stoi w wyborze. To, czego nie wolno wybrać, stoi wyszarzone z powodem przy komórce: czynność gałęzi poznana, której postać w przejściu nie kupiła — „gałąź niewykupiona”; ta sama czynność, gdy w grze nie ma przejścia — „wybierzesz w przejściu postaci, która ją kupiła”; „Idź”, „Zbierz”, „Obchód”, „Tu leży mniej niż” i „Zapas poniżej” bez celu do wskazania — „nie znasz jeszcze celu”; cel poznany, którego nie ma na mapie przejścia — „nie ma go na tej mapie”. Gdy w grze nie ma przejścia, do wyboru są wszystkie poznane cele; czynności walki zostają do wyboru także poza walką. Reguła, która trzyma wartość spoza tego, co wolno wybrać, pokazuje ją w panelu jako wybraną i wyszarzoną, z powodem, i da się ją zmienić (pytania 1 i 16). Oferta czynności w edytorze Programów idzie za postacią w przejściu, dopóki ręczne przejście trwa, czeka albo po końcu czeka na „Restart” albo „Zakończ”, jak dziś (pytania 13 i 18).
6. Grupy reguł się zwijają. Grupa zwinięta pokazuje nazwę, warunek i liczbę reguł, a reguła upuszczona na nią ląduje na końcu grupy, która zostaje zwinięta. Zwinięcie trwa w pamięci strony, przy chodzeniu po ekranach, i znika po odświeżeniu; zapis gry go nie trzyma. „zwiń wszystkie” i „rozwiń wszystkie” to zwykły przycisk (pytanie 6). Na starcie wszystkie grupy są rozwinięte, a ten przycisk stoi tylko przy więcej niż jednej grupie (pytanie 17).
7. Reguły przestawia się uchwytem, z linią pokazującą, gdzie wylądują, i strzałkami „↑” i „↓”, także przez granicę grupy: „↓” na ostatniej regule grupy przenosi ją na początek następnej grupy, a „↑” na pierwszej regule na koniec poprzedniej; strzałki są wyłączone tylko na pierwszej („↑”) i ostatniej („↓”) regule programu (pytania 6 i 17). Całe grupy przestawia się tylko uchwytem z taką linią: nagłówek grupy nie ma strzałek, a grup nie przestawia się klawiaturą (pytanie 6).
8. Klik nagłówka grupy otwiera ten sam panel, z nazwą i warunkiem grupy, a „✕” grupy stoi w nagłówku. „+ dodaj grupę” zastępuje „Dodaj grupę” i stoi obok „+ reguła”. Reguła i grupa kasują się od razu, bez pytania. Pusta grupa mówi „Pusta grupa — przepuszcza dalej.”, a panel reguły kopii w przejściu mówi „Zmiana zeruje passę tego przejścia.”, bez słowa o liczniku. Nagłówek kopii, „Niezapisane zmiany w kopii.” i trzy przyciski kopii zostają jak dziś (pytanie 6).
9. Na obu ekranach lista reguł stoi pod nagłówkiem „sprawdzane od góry” (pytanie 14). W ręcznym przejściu każda reguła kopii pokazuje „Wykonano {n}×”, a nagłówek grupy sumę jej reguł w tej samej postaci, na przykład „Wykonano 21×”; reguły programu zapisanego otwartego w przejściu licznika nie pokazują; pozostałe zasady licznika stoją w D-93.
10. „+ reguła” zastępuje „Dodaj regułę”: dodaje regułę na końcu grupy i otwiera jej panel na warunku. Do zadania 10 przycisk zostaje wyłączony, dopóki Zrozumienie nie ma żadnej czynności (pytanie 12).

### task.frozen.md:41-41

13. Wygląd edytora nie dokłada żadnej nowej barwy, roli ani wartości (pytanie 8), a części biorą role tak (pytanie 17): komórka w spoczynku ma ramkę `control-border` i tekst `text`, pod kursorem tło `highlight`, wybrana wygląda jak przycisk wybrany w grupie, z ramką `selected` i tekstem `text-strong`, a wyszarzona ma ramkę przerywaną, nazwę w `text-disabled` i powód w `text-secondary`; fokus rysuje wspólna obwódka (D-47). W wierszu warunek stoi w `text-secondary`, czynność w `text-strong`, a numer, czas i licznik w `text-label`; wiersz otwarty i wiersz pod kursorem stoją na tle `highlight`. W nagłówku grupy nazwa stoi w `text-strong`, warunek w `text-secondary`, a liczba reguł i suma „Wykonano” w `text-label`. Panel stoi na tle `panel` z ramką `divider`, a podpisy jego pól są w `text-label`. Linia upuszczenia ma napis „tu wyląduje” w `text-strong`, a sama linia bierze kolor tego napisu (D-279). Ten opis idzie do `guidelines/styleguide-browser-view.md` przez `the-way-maintain-styleguide`.

### task.frozen.md:47-51

### Acceptance criteria

- Liczba wpisywana w panelu i fokus zostają na miejscu, gdy przejście idzie przy 16× (D-03: „the screen of a map run changes up to five times a second beside fields in which the player types”; ryzyko z tej decyzji: „a number field whose value the game clips may lose its cursor”).
- Po każdym przeciągnięciu reguły albo grupy, także między grupami i także przerwanym, linia upuszczenia znika (ryzyko z D-03: „a rule dragged between groups may leave the drop line on the screen”).
- Regułę „Zapas poniżej 8 · Patyk → Zbierz — Patyk” gracz pisze od kliknięcia wiersza w 6 działaniach: wiersz, „Zapas poniżej”, liczba 8 z Enterem, „Patyk”, „Zbierz”, „Patyk”.

### task.frozen.md:56-74

- Pytanie 1. Co w panelu reguły stoi wyszarzone z powodem, a co w ogóle się nie pokazuje?
  - Answer: Rzecz nieodkryta nie stoi wcale, co rozstrzyga cytat: „every other action, item, condition, creature and branch enters the Understanding only when discovered in play” (D-118), „the tuning screen holds as many choices as have been found, so it never starts overwhelming, and the growing list is visible progress.” (jego *Rationale*), a jego *Verification* jako naruszenie podaje „a program editor listing every condition from the first game minute”. Reszta: droga A, cała tabela — b. czynność gałęzi poznana, postać w przejściu jej nie kupiła: wyszarzona, „gałąź niewykupiona”, jak w starym Loop; c. ta sama czynność, gdy w grze nie ma przejścia: wyszarzona, „wybierzesz w przejściu postaci, która ją kupiła”; d. „Idź”, „Zbierz”, „Tu leży mniej niż”, „Zapas poniżej” bez celu do wskazania: wyszarzone, „nie znasz jeszcze celu”; e. cel poznany, którego nie ma na mapie przejścia: wyszarzony, „nie ma go na tej mapie”; f. cel poznany, gdy w grze nie ma przejścia: do wyboru wszystkie poznane; g. czynności walki poza walką: zostają do wyboru; h. czynność, której archetyp nie uczy: na razie nic, jedyny archetyp uczy wszystkiego. „Reguła z wartością spoza wyboru pokazuje ją jako wybraną i wyszarzoną, z powodem, i da się ją zmienić.”
  - Not chosen:
    - B, tylko wiersze b i c — „reszta znika bez słowa, a po zadaniu 9 mech i włókno znikną z Programów”
    - bez decyzji — „cykl sam wymyśli powody”
  - Source: wiersz a: definicja_mvp2_loop2.md@efc19197, D-118; foundations/decisions.md@20d804b, D-118. Reszta: human, 2026-11-03, „poza tym nie mam zastrzeżeń do rekomendacji”, na pakiet rundy zadań 4–7, B6, rekomendacja A.
- Pytanie 2. Jak gracz wybiera warunek i jakie grupy mają komórki?
  - Answer: A — warunki też jako komórki, w dwóch kolumnach, z grupami czynności Ruch (Eksploruj, Wędruj, Idź, Idź — ognisko), Zbieranie (Zbierz, Obchód), Ogień (Wytwórz — ognisko, Zapal — ognisko, Zapal — patyk, Zasil — ognisko), Żywność i walka (Zjedz — jagoda, Uderz — patyk, Kopnij, Odskocz) i warunkami kreskami: Zawsze; Temperatura, Sytość, Zdrowie, Energia natury; Zapas, Tu leży, Zostało mniej niż — ognisko, Z dala od — ognisko; Przeciwnik ma poniżej. Koszt przyjęty: długie nazwy zawijają się w dwa wiersze.
  - Not chosen:
    - B, lista wyboru w panelu — „dwa kliknięcia i wygląd formularza; w React to też nowa kontrolka, tyle że i tak potrzebna przy programach i planie wyprawy”
    - C, własna lista jak w starym Loop — „druga kontrolka i druga obsługa klawiatury”
  - Source: human, 2026-11-03, „poza tym nie mam zastrzeżeń do rekomendacji”, pakiet rundy, B7, rekomendacja A; zatwierdzona definicja niesie to w wpisie o pisaniu reguły: „conditions, actions and targets stand as cells in groups that the keyboard can reach, the conditions in two columns” (definicja_mvp2_loop2.md@efc19197).
- Pytanie 3. Gdzie stoi panel reguły na ekranie przejścia, dopóki zadanie 6 nie zbuduje trzech obszarów?
  - Answer: A — panel na czas edycji zajmuje miejsce tabeli odsłoniętych kafelków, obok rysunku mapy. Koszt przyjęty: tabela znika na czas edycji. Rysunek i potrzeby zostają, a to docelowe zachowanie, które zadanie 6 tylko przenosi.
  - Not chosen:
    - B, osobna trzecia kolumna — „program i świat oddają 344 px, a reguły układu są do skasowania w zadaniu 6”
    - C, trzy obszary już teraz — „największa część zadania 6 w i tak dużym zadaniu, zmiana planu”
    - D, panel pod wierszem — „przeczy zdaniu o panelu obok i przesuwa reguły”
  - Source: human, 2026-11-03, „poza tym nie mam zastrzeżeń do rekomendacji”, pakiet rundy, B8, rekomendacja A.

### task.frozen.md:90-117

- Pytanie 6. Które elementy starego edytora i szkicu wchodzą do nowego edytora?
  - Answer: Zostają: numer „2.1” przy regule i „2” przy grupie; czas wykonania „10 min”, „tura” w walce, dla ruchu w przejściu krok mapy, poza przejściem nic; „Wykonano 21×” w nagłówku grupy; „zwiń wszystkie” / „rozwiń wszystkie” jako zwykły przycisk; pamięć zwinięcia w pamięci strony, znika po odświeżeniu; grupa zwinięta pokazuje nazwę, warunek i liczbę reguł, upuszczona reguła ląduje na końcu, grupa zostaje zwinięta; klik nagłówka grupy otwiera ten sam panel, a „✕” stoi w nagłówku; strzałka na granicy grupy przenosi regułę do następnej albo poprzedniej grupy; „Pusta grupa — przepuszcza dalej.”; „Zmiana zeruje passę tego przejścia.” w panelu, bez słowa o liczniku; kasowanie reguły i grupy od razu, bez pytania; nagłówek kopii i trzy przyciski jak dziś, nie jak w szkicu; „+ dodaj grupę” obok „+ reguła”. Nie wchodzą: szukajka w wyborze, bo wszystko mieści się bez przewijania, i wraca z treścią Projektu 2; rząd „ostatnio”, z tego samego powodu; bieżąca wartość przy warunku, „teraz 3”, która jest tylko w szkicu; znak ⊘, „N reguł nie zadziała” i bursztynowe „0×”, bo stan reguły daje zadanie 11. Całe grupy się przeciąga, wbrew propozycji: „nie podoba mi się, że wykluczylismy drag and drop'a dla grup, bo również uważam, że zmiana kolejności strzałkami się zwyczajnie nie sprawdza - można ich użyć żeby przesunąć pojedynczą regułę w górę czy w dół”; strzałki stoją więc tylko przy regułach, a nagłówek grupy ich nie ma. Grup nie przestawia się z klawiatury: droga A pytania kontrolnego, z kosztem „gracz na klawiaturze nie przestawi grupy; D-42 tego nie wymaga”. Ze zdania o akcjach pobocznych wynika, że „zwiń wszystkie” jest zwykłym przyciskiem: „Tekst dostają wyłącznie akcje, które otwierają albo opuszczają stan formularza, stojące pod formularzem; reszta gry zostaje przy zwykłych przyciskach.”
  - Not chosen:
    - bez numerów — „„reguła 2.1” przy „Teraz” nie ma odniesienia”
    - bez czasu — „gracz nie porówna czynności bez grania”
    - bez sumy w nagłówku grupy — „zwinięta grupa nic nie mówi”
    - bez „zwiń wszystkie” — „przy pięciu grupach pięć kliknięć”
    - pamięć zwinięcia w przeglądarce albo w zapisie — „w przeglądarce: nowe przechowywanie; w zapisie: podbicie wersji zapisu”
    - rozwijanie grupy przy upuszczeniu — „lista ucieka spod kursora”
    - listy w nagłówku grupy — „zostaje formularz”
    - strzałki tylko w grupie — „między grupami przenosi tylko mysz”
    - grupy na samych strzałkach, bez przeciągania — odrzucone przez Mariusza słowami wyżej
    - droga z klawiatury dla grup bez strzałek w nagłówku, na przykład klawisze na uchwycie — „osobna obsługa klawiatury w zadaniu 5 i jedno zdanie więcej we wpisie”
    - szukajka — „pole zabiera klawiaturę siatce”
    - rząd „ostatnio” — „trzy komórki nad siatką”
    - bieżąca wartość przy warunku — „dodatkowy odczyt i pytanie, co pokazać poza przejściem”
    - bez „Pusta grupa — przepuszcza dalej.” — „pusta grupa nic nie mówi”
    - bez „Zmiana zeruje passę tego przejścia.” — „passa znika bez uprzedzenia”
    - pytanie przy kasowaniu — „kliknięcie więcej”
    - nagłówek kopii według szkicu — „zmiana dwóch decyzji poza tym zadaniem”
    - znak ⊘, „N reguł nie zadziała”, „0×” — „dubluje zadanie 11”
    - „Dodaj grupę” bez zmiany — „dwa zapisy obok siebie”
  - Source: human, 2026-11-03, „poza tym nie mam zastrzeżeń do rekomendacji” i słowa o przeciąganiu grup cytowane wyżej, pakiet rundy, T9–T26; human, 2026-11-03, „zgodnie z rekomendacjami”, pytanie kontrolne o klawiaturę przy grupach (rozmowa zadania 4, Q21, droga A); zadanie_hierarchia_przyciskow_i_karta_logowania.md, pytanie 1b; zatwierdzona definicja niesie przeciąganie grup i brak strzałek w nagłówku w wpisie o pisaniu reguły (definicja_mvp2_loop2.md@efc19197); human, 2026-11-03, „wszystko przyjmuję zgodnie z rekomendacjami”, drugi pakiet rundy, pytanie kontrolne E5 do wyborów z tej tabeli: żaden wybór nie zmieniony.
- Pytanie 7. Jak przebiega wybór w panelu i jak się kończy?
  - Answer: A — klik wiersza otwiera panel na warunku; kolejne pola: warunek, liczba, cel warunku, czynność, cel czynności; każdy wybór od razu zmienia regułę; panel zostaje otwarty po ostatnim polu, zamyka go „✕”, Esc albo inna reguła; w kryteriach akceptacji 6 działań na regułę „Zapas poniżej 8 · Patyk → Zbierz — Patyk”.
  - Not chosen:
    - B, panel sam się zamyka po ostatnim polu — „poprawka wymaga otwarcia od nowa”
  - Source: human, 2026-11-03, „poza tym nie mam zastrzeżeń do rekomendacji”, pakiet rundy, T27; human, 2026-11-03, „wszystko przyjmuję zgodnie z rekomendacjami”, drugi pakiet rundy, pytanie kontrolne E5: wybór nie zmieniony.

### task.frozen.md:162-191

- Pytanie 16. Czy „Obchód” bez celu do wskazania stoi wyszarzone z powodem „nie znasz jeszcze celu”, jak cztery nazwy z wiersza d pytania 1?
  - Answer: Tak, z powodem „nie znasz jeszcze celu”, jak cztery nazwy z wiersza d. To, że „Obchód” stoi wyszarzony z powodem, a nie znika, rozstrzyga cytat z zatwierdzonego wpisu o pisaniu reguły: „what the player may not pick stands greyed with its reason”, a jego *Rejected*: „hiding what may not be picked — the player asks where it went”. Dopisanie „Obchodu” do wiersza d, z jego powodem, jest odczytaniem agenta, pokazanym człowiekowi do sprzeciwu; sprzeciwu nie było.
  - Source: definicja_mvp2_loop2.md@efc19197 (approved 2026-11-03, fingerprint 9641f804), wpis „How does the player write a program rule?”; round-4-7-package-2.md, A3 i część F; human, 2026-11-03, „wszystko przyjmuję zgodnie z rekomendacjami”: cytat nieskreślony, odczyt bez sprzeciwu.
- Pytanie 17. Czy wchodzą szczegóły pisania, których pierwszy pakiet rundy nie pokazał: czas w panelu, grupy na starcie, warunek pokazania „zwiń wszystkie”, lądowanie reguły przeniesionej strzałką przez granicę grupy, klawisze w siatce i wygląd edytora?
  - Answer: A — wszystkie, w brzmieniu drugiego pakietu: „a. Czas jednego wykonania stoi w wierszu i w panelu, przy czynności.” „b. Na starcie wszystkie grupy są rozwinięte.” „c. „zwiń wszystkie” / „rozwiń wszystkie” stoi tylko przy więcej niż jednej grupie.” „d. „↓” na ostatniej regule grupy przenosi ją na początek następnej grupy, a „↑” na pierwszej na koniec poprzedniej; strzałki są wyłączone tylko na skrajach programu.” „e. W siatce strzałki chodzą po komórkach, Enter wybiera; strzałki dochodzą też do komórki wyszarzonej, żeby przeczytać powód, a Enter nic na niej nie robi; wybór już wybranej wartości przechodzi dalej; liczbę zatwierdza Enter albo wyjście z pola; pole liczby i celu stoją tylko, gdy warunek albo czynność je ma.” „f. Wygląd: komórka w spoczynku ma zwykłą ramkę i tekst, pod kursorem podświetlenie, wybrana wygląda jak przycisk wybrany w grupie, wyszarzona ma ramkę przerywaną z nazwą wyszarzoną i czytelnym powodem. W wierszu warunek jest drugoplanowy, czynność mocna, a numer, czas i licznik w kolorze podpisów; otwarty wiersz ma tło podświetlenia. Panel stoi na tle panelu. Linia upuszczenia ma napis „tu wyląduje” i kolor tego napisu.” Nazwy ról w *To do* 13 przekładają te słowa według znaczeń ról z przewodnika stylu (D-40); role wiersza pod kursorem, powodu, nagłówka grupy, ramki i podpisów panelu oraz napisu „tu wyląduje” stoją tylko w tym dokumencie, który Mariusz przyjmuje w całości.
  - Not chosen:
    - B, żaden, szczegóły zostają cyklowi — pakiet nie podał kosztu poza tym, że wybiera wtedy cykl
    - C, skreślić albo zmienić wybrane wiersze — pakiet nie podał kosztu
    - a, czas tylko w wierszu — „w panelu przy wyborze czasu nie widać”
    - b, grupy zwinięte na starcie — „nowy gracz nie widzi swoich reguł”
    - c, „zwiń wszystkie” zawsze — pakiet nie podał kosztu
    - d, lądowanie na końcu następnej grupy — „reguła przeskakuje całą grupę”
    - e, komórki wyszarzone poza zasięgiem klawiatury — pakiet nie podał kosztu poza samą drogą
    - f, role wybiera cykl — pakiet nie podał kosztu poza samą drogą
  - Source: round-4-7-package-2.md, C9; human, 2026-11-03, „wszystko przyjmuję zgodnie z rekomendacjami” (C:\Storage\repos\loop2\.runs\project-refinement\ekrany-i-menu.md, tura 28).
- Pytanie 18. Co oferuje edytor w Programach po końcu przejścia, do „Restart” albo „Zakończ”?
  - Answer: A — czynności postaci z przejścia, do „Restart” albo „Zakończ”, jak dziś w kodzie i jak przyjęte „Kup” po końcu („one that has ended counting as a map run”). Koszt przyjęty: D-196 trzeba doprecyzować; robi to zadanie 4, którego przyjęty wiersz kandydatów 11 zmienia D-196.
  - Not chosen:
    - B, oferta archetypu po końcu, jak D-196 czytana dosłownie — „kod do zmiany, a w Programach po śmierci oferta zmienia się, choć przejście jeszcze stoi”
  - Source: round-4-7-package-2.md, C1, pytanie dla zadań 4 i 5; human, 2026-11-03, „wszystko przyjmuję zgodnie z rekomendacjami”. Fakt z kodu, osobno: edytor bierze repertuar postaci z przejścia, dopóki przejście stoi w stanie gry (`src/browser/sim/understanding.ts:138-150` przy 20d804b).
- Pytanie 19. Co stoi w regule dodanej przez „Dodaj regułę z tym” i na którym polu otwiera się panel?
  - Answer: A — „Przy czynności warunek „Zawsze”; gdy czynność potrzebuje celu, celem jest pierwszy pasujący przedmiot z tego samego odkrycia, a bez takiego pierwszy cel z siatki. Przy samym warunku reguła to „{warunek} → Eksploruj”. Panel otwiera się na polu, które przycisk wypełnił z odkrycia.” Koszt przyjęty: jedno zdanie zasady. Przycisk buduje zadanie 6; to zadanie daje panel, który ten przycisk otwiera. Pytanie kanoniczne leży w rozmowie zadania 6 (ekran-przejscia, Q8).
  - Not chosen:
    - B, jak A, ale cel zawsze pierwszy w siatce — „„Odkryto: Zbierz, Patyk.” może dać „Zbierz — jagoda””
  - Source: round-4-7-package-2.md, C2; human, 2026-11-03, „wszystko przyjmuję zgodnie z rekomendacjami”.
- Pytanie 20. Jakie tło ma otwarty wiersz, gdy jest też regułą „wygra teraz” albo „trwa”?
  - Answer: A — jak w Loop: tło otwarcia wygrywa, a znak „wygra teraz” na czas edycji znika z tego wiersza; pasek zostaje. Koszt przyjęty: przy edytowanej regule nie widać tła stanu. Tła stanu i pasek daje zadanie 11, więc to ono stosuje tę zasadę; to zadanie daje tło otwartego wiersza.
  - Not chosen:
    - B, tło stanu zostaje, a otwarcie oznacza ramka — „nowy znak do ustalenia”
  - Source: round-4-7-package-2.md, C5; human, 2026-11-03, „wszystko przyjmuję zgodnie z rekomendacjami”.

### task.frozen.md:225-292

### Wpisy projektowane, które zadanie urzeczywistnia i pisze

- (new) — How does the player write a program rule?: „One program editor stands on Programy and on the screen of a map run. A rule's row reads as a sentence and a rule panel beside the rows changes it: each pick moves on to the next field, conditions, actions and targets stand as cells in groups that the keyboard can reach, the conditions in two columns, and what the player may not pick stands greyed with its reason. Rules move by a handle with a line showing where they land, by arrows, and between groups, and whole rule groups move by a handle with such a line, with no arrows in the header of a rule group.”
- (new) — What do the screens leave room for from the start?: „Each column of a screen is an area of its own that a narrower layout can rearrange, Siedziba draws the team as a section with a heading, and the rule panel offers its pick in steps, the action first and its target after it.” Zadanie czyni prawdziwą część o panelu reguły i o obszarach ekranu Programy; Siedzibę daje zadanie 4, a pozostałe ekrany zadania 6, 13 i 22.
- D-44 — Which controls do the screens of the browser view build on?: „The screens of the browser view build every button, select list, number field, text field and cell of a pick from the eight shared controls of `src/browser/view/controls/` — the button, the destructive button, the button selected in its group, the secondary action (D-275), the select list, the number field, the text field and the pick cell — and the buttons „Zakończ”, „Usuń”, „Restart”, „Porzuć zmiany”, „Przełącz postać na ten program” and „Zatrzymaj” are destructive buttons, neutral until the pointer or the focus reaches them and then in `danger`.” Reszta wpisu stoi w definicji; „Wyślij ponownie” bez słowa o nagłówku czyni prawdziwym zadanie 4, a zadanie 5 zapisuje wpis w całości (pytanie 15).
- D-93 — What does a program rule show the player?: „On Programy and on the screen of a map run the list of rules stands under the heading „sprawdzane od góry”, and during a manual map run every program rule of the copy the map run carries out shows how many times it fired in that map run, written as „Wykonano {n}×”, such as „Wykonano 3×”, wherever rules show counts the header of their rule group shows their sum in the same form, such as „Wykonano 21×”, and the rules of a saved program the program editor shows then show no count. The count starts from zero at the start of each manual map run, a map run restart included, at a switch of the character to another program, and when the program rule's condition or action changes; it survives reordering the rule, moving it to another rule group, changing its group's condition or name, and a save of the copy. Before the game's first manual map run the rules show no counts; after a manual map run ends in death or in a completion its counts remain beside the copy's rules, and after „Zakończ” beside the rules of the program the copy belongs to, each rule there showing the count of the same rule of the copy where the two have the same condition and action and „Wykonano 0×” otherwise, and beside the rules of no other program, until the next send or map run restart, subject to the same reset on a change of a rule's content.”
- D-166 — Where does the player see the player's programs and pick the one to edit?: „The screen Programy holds on the left the list of the player's programs and in the middle the program editor with the program picked there. That program is always a saved one, never the copy: while a manual map run goes on, or has ended and waits for „Restart” or „Zakończ”, „Zmiany tutaj nie dotykają przejścia na mapie {mapa}.” stands above the editor, and „Przełącz postać na ten program” stands on the screen of a map run alone. On the screen of a map run the program panel shows the copy, and its select list holds „Kopia w przejściu” at its top and the player's saved programs below it.” Listę po lewej stawia zadanie 4 (pytanie 4).
- D-255 — Where does the data an agent checks the game on come from?: „An agent builds the game state a check needs with functions of the simulation and sends it by the ordinary save request to a local server with a database made for that check, and it reaches early states by playing. One command of the repository starts the game locally over HTTPS, and a check touches neither the test server nor a player's save.” W fundamencie stoi część o graniu, napisana przez zadanie 1, więc zadanie zmienia D-255.

### Wpisy projektowane, które zadanie urzeczywistnia w części, a pisze inne zadanie

Część, którą kod tego zadania czyni prawdziwą, cykl tego zadania zapisuje sam (WAY-126).

- D-03 — How is the browser view built? (zapisany, zadanie 2): „The browser view is built in TypeScript with React, its screens written as `.tsx` components that draw from the game state, and no other UI framework stands in its code or its runtime dependencies.”
- D-27 — Where do the game's icons come from? (pisze zadanie 24): „The game's icons are SVG files from game-icons.net, kept in `assets/icons/` outside the directory the account and save server serves and copied into that directory when the application is built.” Zadanie stosuje to do 11 nowych ikon; zwinięte wzmianki w Siedzibie daje zadanie 24.
- icon-credits (pisze zadanie 24): „For each SVG icon file directly in `assets/icons/`, the game's section of credits holds a credit that names the icon's title as its page on game-icons.net gives it, the icon's author, that page and the licence CC BY 3.0, and says how the icon file differs from its source.”
- D-43 — What counts in the browser view as a value written in place of a design token? (pisze zadanie 24): „or the content of an icon file in `assets/icons/`, which is drawn as a mask and takes its colour from the text beside it.” Zadanie rysuje maską 11 ikon czynności; pozostałe ikony zostają przy kolorze w pliku do zadania 24.
- D-39 — What do the signal colours of the browser view mean? (pisze zadanie 11): *Verification*: „the text of the button „Zakończ” in `danger` under the pointer”. Zadanie czyni prawdziwym ten przykład; tła przy regule daje zadanie 11.
- D-245 — What does „Zatrzymaj” do? (pisze zadanie 25): „„Zatrzymaj” is a destructive button that acts at once on the click”. Zadanie czyni prawdziwym to, że „Zatrzymaj” traci tekst w `danger` w spoczynku.
- D-124 — What does „+ reguła” do? (pisze zadanie 10): „„+ reguła” adds a program rule at the end of its rule group and opens its rule panel on the condition, „Zawsze → Eksploruj” standing there until the player picks otherwise, and it is never disabled.” Zadanie daje napis, dodawanie i otwieranie panelu; „never disabled” daje zadanie 10 (pytanie 12).
- D-180 — Where does the player arrange the trip plan? (pisze zadanie 13): „The screen Programy shows a section „Plan wyprawy” folded to a line of icons between the program's name and its rules, with the lists „Zabierz” and „Wynieś”, and the card of a map shows what of it enters. Each position holds an item select list, a number field, „↑”, „↓” and „Usuń”, and „Dodaj przedmiot” stands below each list.” Zadanie daje część o ekranie Programy; kartę mapy daje zadanie 13.

### Obecne wpisy, które zadanie zmienia

- D-91 — What program does a new game start with? (*Verification*): „complies: a new game showing the empty „Program” group with its „Dodaj regułę” control and the condition „Zawsze””; odpowiedź z planu: „D-91 w zadaniu 5”.
- D-43 (zmieniana część): „or the content of an icon file in `assets/icons/`, whose colour stands in the file and is changed by hand when the value of `text-strong` changes”.
- D-44 (dziś): „from the seven shared controls of `src/browser/view/controls/` — the button, the destructive button, the button selected in its group, the secondary action (D-275), the select list, the number field and the text field”.
- D-39 (*Verification*, dziś): „the text of the button „Zakończ” in `danger`”.
- D-245 (dziś): „„Zatrzymaj” is a destructive button with its text in the role `danger`”.
- D-255 (dziś): „An agent reaches the early states a check needs by playing, on a local server with a database made for that check. One command of the repository starts the game locally over HTTPS, and a check touches neither the test server nor a player's save.”

### Obecne wpisy, które zadanie stosuje bez zmiany

- D-18 — Where does the game's content live?: „The game's content — game maps, items, creatures, character skills and their numbers — stands in data files.”
- D-23 — How does a character act by its program?: „Conditions are chosen from a closed list, never written as expressions, rule groups stand one level deep, and the player has no way to carry out a character's action by hand.”
- D-40 — What do the neutral roles of the browser view mean?: „`control-border` that something can be clicked or typed into, and `selected` that this is the one chosen in its group”; „`text-disabled` that this cannot be used now”.
- D-42 — Which accessibility requirements does the browser view keep?: „keeps three success criteria of WCAG 2.2, the W3C Recommendation of 12 December 2024 — 1.4.3 Contrast (Minimum), 1.4.11 Non-text Contrast and 2.4.7 Focus Visible — and no other requirement of WCAG”.
- D-45 — Where does the browser view's kitchen-sink page stand?: „The page shows every shared control in each of its states or the reason a state does not apply, every role, and samples of tiles in each state drawn with the roles, never a drawing of the game from a game state.”
- D-47 — Which elements of the browser view are controls, and how does their focus show?: „One `:focus-visible` rule of the game's stylesheet draws the focus of every control from the role `focus`”.
- D-75 — When are complete player journeys tested in a real browser?: „Permanent tests of complete player journeys in a real browser are deferred, and a changed journey is checked manually.”
- D-88 — How are real browser events, focus and SVG checked?: „Real browser events, focus and SVG rendering are checked manually after a change and are not automated”.
- D-90 — Where do the program rules of a program belong?: „A program holds an ordered list of rule groups, and every program rule belongs to exactly one of those groups”.
- D-92 — What counts as one firing of a program rule?: „One firing of a program rule is the start of its action”.
- D-118 — When does the player learn what the world holds?: „every other action, item, condition, creature and branch enters the Understanding only when discovered in play”; *Verification*: „violates: a program editor listing every condition from the first game minute”.
- D-119 — Whose is the knowledge of the world, and what may a character use of it?: „That one computation is at once what the program editor offers and what the simulation lets the character carry out.”
- D-126 — What does the simulation do with a program rule outside the character's repertoire?: „The simulation passes over a program rule whose condition, action or the target of either lies outside the character's repertoire to the next program rule”.
- D-127 — What does the simulation do with a rule group whose condition lies outside the character's repertoire?: „The simulation passes over a rule group whose condition, or the target of that condition, lies outside the character's repertoire”.
- D-131 — Which changes of the program a map run carries out reset its solving progress?: „an edit after which the copy's rules or rule groups differ from those before it, the discard of the copy's unsaved changes included, sets the streak and the number of beaten attacks of the map run in progress to zero”.
- D-164 — Who owns a program?: „A change made during a map run goes into the copy and reaches the program only when the player saves it there or as a new program”.
- D-167 — What can the player do with the list of programs?: „The list of programs offers „Nowy program”, „Zmień nazwę” and „Usuń””; listę stawia zadanie 4 (pytanie 4).
- D-168 — What becomes of a map run whose copy's program the player deletes?: „Deleting the program the copy of the map run belongs to leaves the map run going on with the copy”.
- D-171 — How does the program panel show the copy and its unsaved changes?: „During a map run the program panel shows the copy under the heading „Kopia: {program name}”.”
- D-172 — How does the game announce a save of the copy over a program that changed?: „„Zapisz w programie” then saves at once, in one click, and after the save the line is gone”.
- D-173 — What can the player do with the copy after a map run ends?: „On the screens after a character's death and after a completion, editing the copy, „Zapisz w programie”, „Zapisz jako nowy program” and „Porzuć zmiany” act as during the map run until the player picks „Restart” or „Zakończ”.”
- D-174 — How does the player switch the character to another program during a map run?: „During a map run, picking a saved program on the program panel's list opens it for editing”.
- D-196 — Which branch actions does the program editor offer outside a map run?: „Outside a map run the program editor currently offers the repertoire computed from the Understanding through the archetype’s predispositions; bought branches currently contribute no actions to that editor's offer. During a map run, both the copy editor and the saved-program editor use the running character’s repertoire, including its bought branches.” Stan po końcu przejścia nazywa przy tym wpisie zadanie 4 (dziennik planu, 2026-11-03): oferta postaci z przejścia do „Restart” albo „Zakończ” (pytanie 18).
- D-244 — What does the player see of an earning loop?: „what the map-run view and the program panel show during a map run stands for a manual map run”.
- D-254 — How does an agent operate the game as a player does?: „This inspection adds to the checks D-75 and D-88 leave with a person and replaces none of them.”
- D-264 — What does a test of a screen built with React run on?: „A test of a screen built with React runs on jsdom, a development dependency pinned exactly, and only the test files of such screens leave their stand-ins for the document.”
- D-265 — How does a shared control stand in a screen built with React while other screens stay in DOM?: „a shared control that a React screen uses has two forms in `src/browser/view/controls/`, a React component and a DOM function, drawing one tree of DOM elements with the same classes and attributes”.
- D-267 — What keeps the rules of hooks and of effects in the browser view's code?: „No tool guards the rules of hooks and of effects: `guidelines/coding-browser-module.md` holds them, review keeps them”.
- D-268 — What keeps a test on a document imitation from taking the machine's memory?: „More than ten test files on a document imitation, or memory running away in a test on none, reopens how the limit is held.”
- D-269 — Does the kitchen-sink page hold React?: „it shows each shared control in its DOM form”.
- D-270 — Which libraries built on React may the browser view take?: „A library built on React — a package other than `react` and `react-dom` whose entry in `package-lock.json` declares a peer dependency on `react` — counts as another UI framework under D-03”.
- D-275 — Which actions of the browser view stand as text rather than as buttons?: „Every other action of the browser view keeps the button D-44 gives it.”; *Verification*, naruszenie: „„Usuń” of a program rule drawn as underlined text”.
- D-279 — What colour does a frame or a bar that sets a text apart take?: „A frame or a bar drawn at a text to set it apart”, „takes the colour of that text and is part of it, so the text's role keeps the meaning D-39 and D-40 give it.”; linia upuszczenia przy napisie bierze więc jego kolor.
- Fakt środowiska game-icons-licence: „The game-icons/icons repository provides the icons of its contributors Delapouite and Lorc under Creative Commons 3.0 BY.”
- Niezmienniki, których zadanie dotyka bez zmiany: streak-program-change, saved-program-edit, copy-save, trip-plan-progress, program-rule-pick, program-closed-lists, content-identifiers, browser-view-framework, browser-view-token-values, browser-view-focus-outline, design-token-contrast, design-token-sources, icon-file-content, icon-credits, loop2-container-icons, document-test-memory-limit, local-start-access.

### task.frozen.md:294-318

## Settlements to record

Candidates: 23 shown, 19 accepted — 2026-11-03

| # | Settlement | Kind | Source | What the cycle would otherwise guess |
|---|---|---|---|---|
| 1 | W panelu reguły wyszarzone z powodem stoją: czynność gałęzi poznana, której postać w przejściu nie kupiła — „gałąź niewykupiona”; ta sama czynność, gdy w grze nie ma przejścia — „wybierzesz w przejściu postaci, która ją kupiła”; „Idź”, „Zbierz”, „Obchód”, „Tu leży mniej niż”, „Zapas poniżej” bez celu do wskazania — „nie znasz jeszcze celu”; cel poznany, którego nie ma na mapie przejścia — „nie ma go na tej mapie”; gdy w grze nie ma przejścia, do wyboru są wszystkie poznane cele, czynności walki zostają do wyboru poza walką, a reguła z wartością spoza wyboru pokazuje ją jako wybraną i wyszarzoną, z powodem, i da się ją zmienić. | decision | Pytanie 1; „Obchód” według pytania 16 | które przypadki ukryć, a które wyszarzyć, i jakie zdania powodów napisać |
| 2 | Czynności stoją w siatce w grupach Ruch, Zbieranie, Ogień oraz Żywność i walka, a warunki bez nazw grup, rozdzielone kreską: Zawsze; Temperatura, Sytość, Zdrowie, Energia natury; Zapas, Tu leży, Zostało mniej niż — ognisko, Z dala od — ognisko; Przeciwnik ma poniżej. | decision | Pytanie 2 | grupy i kolejność komórek, także dla czynności dodanych później |
| 3 | Jedna czynność ma w grze jedną ikonę: tę samą w wierszu reguły, w komórce i nad głową maga. | decision | Pytanie 5 | czy komórka i wiersz biorą ikonę czynności, czy rzeczy, którą czynność wskazuje |
| 4 | Przy regule stoi numer „2.1”, a przy grupie „2”. | decision | Pytanie 6 | czy wiersze mają numery, do których odwoła się „Teraz” |
| 5 | Przy regule stoi czas jednego wykonania: „10 min”, „tura” w walce, dla ruchu w przejściu krok mapy, poza przejściem przy ruchu nic. | decision | Pytanie 6; miejsce, także w panelu, według pytania 17, wiersz a | czy i jaki czas pokazać, zwłaszcza przy ruchu poza przejściem |
| 6 | Zwinięcie grup trwa w pamięci strony i znika po odświeżeniu, poza zapisem gry. | decision | Pytanie 6 | czy trzymać zwinięcie w przeglądarce albo w zapisie gry, z podbiciem wersji |
| 7 | Grupa zwinięta pokazuje nazwę, warunek i liczbę reguł; reguła upuszczona na nią ląduje na końcu, a grupa zostaje zwinięta. | decision | Pytanie 6 | czy grupa rozwija się przy upuszczeniu |
| 8 | Klik nagłówka grupy otwiera ten sam panel, z nazwą i warunkiem grupy, a „✕” grupy stoi w nagłówku. | decision | Pytanie 6 | pola nazwy i warunku w samym nagłówku |
| 9 | „↓” na ostatniej regule grupy przenosi ją na początek następnej grupy, a „↑” na pierwszej na koniec poprzedniej. | decision | Pytanie 17, wiersz d; przejście strzałką przez granicę grupy według pytania 6 | czy reguła przeniesiona strzałką przez granicę grupy ląduje na początku, czy na końcu sąsiedniej grupy |
| 10 | „zwiń wszystkie” / „rozwiń wszystkie” stoi jako zwykły przycisk. | decision | Pytanie 6; warunek pokazania według pytania 17, wiersz c | czy przycisk w ogóle jest |
| 11 | Wybór w panelu nie ma szukajki ani rzędu „ostatnio”, bo wszystko mieści się bez przewijania; wracają z treścią Projektu 2. | decision | Pytanie 6 | szukajkę i rząd „ostatnio” przepisane ze starego Loop |
| 12 | Przy warunku nie stoi jego bieżąca wartość. | decision | Pytanie 6 | „teraz 3” ze szkicu |
| 13 | Pusta grupa mówi „Pusta grupa — przepuszcza dalej.” | decision | Pytanie 6 | pustą grupę bez zdania |
| 14 | Panel reguły kopii w przejściu mówi „Zmiana zeruje passę tego przejścia.”, bez słowa o liczniku. | decision | Pytanie 6 | brak ostrzeżenia albo zdanie, że zmiana zeruje też licznik |
| 15 | Reguła i grupa kasują się od razu, bez pytania. | decision | Pytanie 6 | pytanie przed kasowaniem |
| 16 | „+ dodaj grupę” stoi obok „+ reguła”. | decision | Pytanie 6 | napis „Dodaj grupę” obok „+ reguła” |
| 17 | Edytor nie ma znaku ⊘, licznika „N reguł nie zadziała” ani bursztynowego „0×”; stan reguły daje zadanie 11. | decision | Pytanie 6 | znaki przepisane ze starego Loop obok paska z zadania 11 |
| 18 | Klik wiersza otwiera panel na warunku; pola idą kolejno: warunek, liczba, cel warunku, czynność, cel czynności; każdy wybór od razu zmienia regułę; panel zostaje otwarty po ostatnim polu, a zamyka go „✕”, Esc albo inna reguła. | decision | Pytanie 7; klawisze i pola według pytania 17, wiersz e | czy panel zamyka się sam po ostatnim polu i czy zmiana czeka na zatwierdzenie |
| 19 | Pusta linia planu wyprawy mówi „Plan wyprawy: pusty”. | decision | Pytanie 11 | sam nagłówek przy pustym planie |

## Foundation entries of your *Read*: current ranges in the worktree

The identifier is the address; the range is its size now. Read each whole, with its rationale and rejected options.

- `foundations/part_map.md:3-28` browser-view
- `foundations/decisions.md:39-50` D-03
- `foundations/decisions.md:516-550` D-23
- `foundations/decisions.md:792-805` D-36
- `foundations/decisions.md:852-865` D-40
- `foundations/decisions.md:882-895` D-42
- `foundations/decisions.md:957-970` D-47
- `foundations/decisions.md:2095-2117` D-118
- `foundations/decisions.md:2119-2143` D-119
- `foundations/decisions.md:2272-2295` D-124
- `foundations/decisions.md:2443-2475` D-131
- `foundations/decisions.md:3487-3500` D-196
- `foundations/decisions.md:5379-5409` D-264
- `foundations/decisions.md:5411-5451` D-265
- `foundations/decisions.md:5481-5508` D-267
- `foundations/decisions.md:5510-5553` D-268
- `foundations/decisions.md:5937-5960` D-282
- `foundations/invariants.md:35-43` browser-view-framework
- `foundations/invariants.md:459-467` browser-view-token-values
- `foundations/invariants.md:469-477` browser-view-focus-outline
- `foundations/invariants.md:829-837` streak-program-change
- `foundations/invariants.md:1189-1197` document-test-memory-limit
- `foundations/glossary.md:117-122` Understanding
- `foundations/glossary.md:124-128` repertoire
- `foundations/glossary.md:149-154` streak
- `foundations/glossary.md:174-178` copy
- `foundations/decisions.md:6072-6106` D-288
- `foundations/decisions.md:6108-6140` D-289
- `foundations/decisions.md:6142-6165` D-290
- `foundations/decisions.md:6167-6190` D-291
- `foundations/decisions.md:6211-6229` D-293
- `foundations/decisions.md:6268-6285` D-296
- `foundations/decisions.md:6326-6342` D-299
- `foundations/decisions.md:6344-6359` D-300
- `foundations/decisions.md:6376-6393` D-302
- `foundations/decisions.md:6443-6469` D-306

Where the plan's *Read* names a guideline file, a source file, a test or a file made by an earlier slice, open it by that path (whole, as *Read* says) — the paths in your section above are relative to the worktree root. Files made by earlier slices exist now in the worktree.

## Report

Write the full report: status (`done`, `done with concerns`, `questions`, `returned`, `reserved`, `blocked`), your commits, what each check showed with command and exit code, your own-work check (the weakest point of your slice, how you checked it and what it showed), for a user-interface slice the states and screenshot evidence as `ui_check.md` gives (or a screenshot unchecked, with its reason), each reach beyond this handoff, **Searches not found or unclear:** each thing looked for and not found or unclear, or `none`, and concerns. Return only: status, commits, a one-line check result naming what failed or did not run, and the report path.
