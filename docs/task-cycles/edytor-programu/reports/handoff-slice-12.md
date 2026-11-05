# Handoff — slice 12 of the task `edytor-programu`

## Delegation

The person who requested this cycle delegated every intermediate choice to the orchestrator of
`implement-task`. You never ask the human. A question goes back to the orchestrator in your report
with status `questions`; a fact or permission nobody supplies makes you `blocked`. Nothing here is the human's approval.

## Where you work

- Worktree (work from its root): `C:/Storage/repos/loop2-wt/edytor-programu`, branch `task/edytor-programu`.
  Your base (the head when you start): `9d1d5f2`. Commit your work on this branch; push nothing.
- Pinned process: the worktree's `.the-way` at `f45ca40724251a46965aed69f733d0a35c430048`.
- You make: **a slice, or the retry of a slice** — slice 12. Read in full `.the-way/task-cycle/change/SKILL.md` (project skill
  `the-way-make-change`) and `.the-way/task-cycle/change/slice.md`; read `.the-way/task-cycle/change/ui_check.md` when the slice changes a user interface (the step that names it comes).
- Report: `docs/task-cycles/edytor-programu/reports/report-slice-12.md` (if your tool refuses the file, return the whole report as text).
- Commit by paths with `git add <paths>` only (never `-A`, `.`, `-a`); messages in English in the repository's form (see `git log --oneline -8`, e.g. `feat: :sparkles: …`, `docs: :memo: …`). Do not run the product's gate (`npm test` with no argument); run the focused checks your section names, each with command and exit code in the report.

## Answers of the start

- Trust boundary: the change touches `assets/icons/**` (files from game-icons.net) in slices 3 and 4 only; the review of those slices checks crafted input there.
- Irreversible operation: none. Open design choice: none; a choice of how to make what the task and the foundation settle is yours to make and name in the report; a real open design choice makes you return `returned` with no code.
- The foundation step has run: the entries D-288 to D-307 and the changed ones (D-03, D-27, D-39, D-43, D-44, D-91, D-93, D-124, D-166, D-180, D-196, D-245, D-255, D-282, icon-credits, the icon title facts, game-icons-licence) are written. Entry ranges below are current ones; they hold where they differ from the plan's.
- The base gate already fails on `tests/quality/test_quality_invariants.py::test_ruff_source_rules` and `::test_shellcheck_source_rules` (`FileNotFoundError`: ruff and shellcheck are not installed on this computer). That is the base's state: report any other failure of that file as yours.
- Two of the 11 icons are not by Delapouite or Lorc (see the foundation step's report): `logging` is by Skoll (https://game-icons.net/1x1/skoll/logging.html) and `dodge` by Felbrigg (https://game-icons.net/1x1/felbrigg/dodge.html); the foundation names them in `game-icons-licence`. Relevant only to slices 3 and 4.
- Orchestrator's answers and notes (autonomous choices, recorded in the cycle record, not the human's); read the reports they come from:
  - Slices 9 and 10 made `src/browser/view/rule-list.tsx` (`createRuleList`, `RuleListView`) and `src/browser/view/rule-panel.tsx` (`createRulePanel`, `RulePanelView`); reports `docs/task-cycles/edytor-programu/reports/report-slice-9.md` and `report-slice-10.md`. Both keep no panel state of their own: the page passes `open`; each reports edits through `onCommit` (a whole new program).
  - Focus: `createRulePanel` draws into a detached element, so a panel created already open cannot take the focus — place the panel in the document before opening it, or hold `RulePanelView` inside the React program panel. After „✕” or Escape (`onClose`) the focus goes to the body: the program panel moves it to the closed rule's row. A focus left pending by an edit the page refuses is used at the next change of the `program` prop (small known risk).
  - „+ dodaj grupę” stands in a footer below the groups in `rule-list.tsx` (slice 9's choice 2); the plan and D-304 say beside „+ reguła”. Do not move it in this slice unless your section needs it; the whole-change review judges it.
  - Q7: a held value that no reason of D-289 fits shows chosen and greyed with no reason text.
  - The pick cell, the React select list and number field are made (slices 6, 7); the destructive button is neutral at rest (slice 8); the trip plan component is made by slice 11 (read its report `docs/task-cycles/edytor-programu/reports/report-slice-11.md`).
  - Slice 11 made `src/browser/view/trip-plan.tsx` (`createTripPlan({ onCommit, props })` returning `{ element, update, dispose }`) and the opt-in trip count rule on `ReactNumberField` (`rule="trip"`, `onReject`); its report is `docs/task-cycles/edytor-programu/reports/report-slice-11.md` (the first attempt: `report-slice-11-returned.md`). The rejected-count state lives in the trip-plan section: make a new section per program, so one program's message does not show in another's. Rows are keyed by item: an item change drops a pending invalid count (orchestrator's choice Q10: D-181 says nothing about an item change; accepted). The page must place the plan on Programy between the program's name and its rules; the screen of a map run has no plan (question 11).
  - `react-number-field.tsx` now imports `tripCount` from `src/browser/view/trip-editor.ts`; Slice 13 removes that DOM editor, so keep `tripCount` alive (do not remove or move it in this slice).

## Your section of the plan, word for word (`docs/task-cycles/edytor-programu/plan.md`)

### Slice 12 — The program panel in React

- **Goal:** `src/browser/view/program-panel.ts` gives way to `src/browser/view/program-panel.tsx`, the program panel as a React screen part behind the same boundary — `createProgramPanel(controls, mode, folding)` giving `element`, `update(state, events)` and `showProgram(programId)`, its first render synchronous (`flushSync`), as `createAccountCard` and `createProgramList` give (D-36) — with its pure exports (`programListOptions`, `nextShown`, `shownContent`, `NAME_MESSAGES`) kept for their users. Both modes hold the rule list of Slice 9 and, beside it, the rule panel of Slice 10, the open rule a state of the panel; the rule panel of the copy says the sentence of row E31. The panel of the screen of a map run keeps what it does today (D-166, D-171–D-174): the select list „Program:” in its React form (Slice 7) with „Kopia w przejściu” first, „Nowy program”, „Zmień nazwę”, the destructive „Usuń”, the copy's heading, „Niezapisane zmiany w kopii.”, the three buttons of the copy and the line of a changed program, „Przełącz postać na ten program”, the name field with its messages; counts as `shownContent` gives them, no trip plan (question 11). The panel of Programy shows always the saved program the page names, under „Zmiany tutaj nie dotykają przejścia na mapie {mapa}.” while the game state holds a map run (row E5), the program's name above its rules, and between them „Plan wyprawy”, the component of Slice 11 (rows E14, E36). On Programy the rule panel stands as an area of its own at the right of the editor (D-282); on the screen of a map run it stands beside the rows until Slice 13 moves it. The folding of rule groups is one memory of the page (row E23): the game view makes it once and gives it to both panels, keyed by the saved program's number or by the copy and by the group, so a group folded on one screen stays folded on the other for the same program, and a reload forgets it; the game view's change is that alone. `tests/view/program-panel.test.mjs` runs on jsdom (D-264): each case of its hand-made document model carries over to the React panel, each change with its reason, and new cases hold the trip plan on Programy between the name and the rules, its absence on the screen of a map run, the rule panel opened from a row and from a header, the sentence of the copy, and the folding kept across the two panels. The cases of `tests/view/account-screen.test.mjs` that reach the editor — „Dodaj grupę” become „+ dodaj grupę”, an edit of the trip plan on Programy, „Usuń” — go through the new controls, each with its reason.
- **Change:** `src/browser/view/program-panel.ts` · `src/browser/view/program-panel.tsx` · `tests/view/program-panel.test.mjs` · `tests/view/account-screen.test.mjs` · `src/browser/view/game-view.ts` · `src/browser/styles.css`
- **Read:** `docs/task-cycles/edytor-programu/task.frozen.md:29-39` To do · `docs/task-cycles/edytor-programu/task.frozen.md:47-52` Acceptance criteria · `docs/task-cycles/edytor-programu/task.frozen.md:68-80` Questions to settle · `docs/task-cycles/edytor-programu/task.frozen.md:90-112` Questions to settle · `docs/task-cycles/edytor-programu/task.frozen.md:135-161` Questions to settle · `docs/task-cycles/edytor-programu/task.frozen.md:177-181` Questions to settle · `docs/task-cycles/edytor-programu/task.frozen.md:200-211` Context · `docs/task-cycles/edytor-programu/task.frozen.md:225-292` Decisions in play · `docs/task-cycles/edytor-programu/task.frozen.md:294-318` Settlements to record
  `guidelines/coding.md` · `guidelines/coding-browser-module.md` · `guidelines/styleguide-browser-view.md` · `guidelines/testing.md` · `src/browser/AGENTS.md`
  `foundations/part_map.md:3-28` browser-view
  `foundations/decisions.md:39-50` D-03 · `foundations/decisions.md:792-805` D-36 · `foundations/decisions.md:2429-2461` D-131 · `foundations/decisions.md:2982-2995` D-164 · `foundations/decisions.md:3012-3030` D-166 · `foundations/decisions.md:3032-3045` D-167 · `foundations/decisions.md:3047-3060` D-168 · `foundations/decisions.md:3092-3105` D-171 · `foundations/decisions.md:3107-3120` D-172 · `foundations/decisions.md:3122-3135` D-173 · `foundations/decisions.md:3137-3150` D-174 · `foundations/decisions.md:3251-3262` D-180 · `foundations/decisions.md:3473-3486` D-196 · `foundations/decisions.md:4828-4845` D-244 · `foundations/decisions.md:5360-5390` D-264 · `foundations/decisions.md:5392-5432` D-265 · `foundations/decisions.md:5462-5489` D-267 · `foundations/decisions.md:5491-5534` D-268 · `foundations/decisions.md:5918-5937` D-282 · `foundations/decisions.md:5939-5956` D-283
  Foundation entries rows E1, E2, E4, E5, E7, E14, E23, E31, E36, E38
  `foundations/invariants.md:35-43` browser-view-framework · `foundations/invariants.md:459-467` browser-view-token-values · `foundations/invariants.md:829-837` streak-program-change · `foundations/invariants.md:839-847` saved-program-edit · `foundations/invariants.md:849-857` copy-save · `foundations/invariants.md:979-987` trip-plan-progress · `foundations/invariants.md:1189-1197` document-test-memory-limit
  `foundations/glossary.md:25-30` program · `foundations/glossary.md:174-178` copy · `foundations/glossary.md:199-203` trip plan
  `src/browser/view/program-list.tsx` (the boundary of the exemplar D-36 names, as a part of a screen) · `src/browser/view/run-screen.ts` · `src/browser/sim/programs.ts` · `tests/view/page-document.mjs`
  made by earlier slices, named without backticks as they do not exist at the base: src/browser/view/rule-list.tsx (Slice 9) · src/browser/view/rule-panel.tsx (Slice 10) · src/browser/view/trip-plan.tsx (Slice 11) · src/browser/view/controls/react-select-list.tsx (Slice 7) · tests/view/rule-editor.test.mjs (Slices 9 and 10)
- **Model:** same — one panel serves two screens with different rules for the copy, and a slip loses a player's unsaved copy or edits another program than the one shown.
- **Risk:** none
- **Checks:** start from the failing cases of the trip plan between the name and the rules on Programy and of no trip plan on the screen of a map run; `npm test -- tests/view/program-panel.test.mjs`; `npm test -- tests/view/rule-editor.test.mjs`; `npm test -- tests/view/trip-plan.test.mjs`; `npm test -- tests/view/program-list.test.mjs`; `npm test -- tests/view/account-screen.test.mjs`; `npm test -- tests/invariants/test_saved_program_edit.py`; `npm test -- tests/invariants/test_copy_save.py`; `npm test -- tests/invariants/test_streak_program_change.py`; `npm run typecheck`; `npm test -- tests/invariants/test_browser_view_framework.py`; `npm test -- tests/invariants/test_browser_view_token_values.py`; `npm test -- tests/quality/test_quality_invariants.py`; in a real browser on `npm run local`, as `.claude/skills/loop2-play/SKILL.md` gives, using Slice 2's composed state where playing does not reach a state, screenshots of: Programy with the list, the editor and the rule panel open on each field; cells greyed with each of the four reasons; a held value greyed in the panel; a folded group and „zwiń wszystkie”; „Plan wyprawy: pusty”, a plan with positions folded and unfolded; the sentence above the editor beside a map run; the screen of a map run with the copy, „Wykonano {n}×” at rules and headers and the sentence of the copy; the rule of the acceptance criterion written from a click on its row in six actions; a stream of frames (the skill's `frames.js`) during a rule's drag between groups, showing „tu wyląduje”, and frames after a drop and after a drag cancelled by Esc, showing no line (acceptance criterion 2); a number typed into the panel on the screen of a map run at the pace 16×, the text and the cursor in place over three seconds of frames (acceptance criterion 1)
- **Depends on:** Slice 11 · E1 · E2 · E4 · E5 · E14 · E23 · E31 · E36 · E38

## Passages of the task named in your *Read*, word for word (`docs/task-cycles/edytor-programu/task.frozen.md`)

### task.frozen.md:29-39

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
11. Ekran Programy pokazuje „Plan wyprawy” zwinięty do linii ikon między nazwą programu a jego regułami, z listami „Zabierz” i „Wynieś”, a gdy obie listy są puste, linia mówi „Plan wyprawy: pusty”. Ekran przejścia sekcji planu nie pokazuje, także przy programie zapisanym otwartym w przejściu (pytanie 11).

### task.frozen.md:47-52

### Acceptance criteria

- Liczba wpisywana w panelu i fokus zostają na miejscu, gdy przejście idzie przy 16× (D-03: „the screen of a map run changes up to five times a second beside fields in which the player types”; ryzyko z tej decyzji: „a number field whose value the game clips may lose its cursor”).
- Po każdym przeciągnięciu reguły albo grupy, także między grupami i także przerwanym, linia upuszczenia znika (ryzyko z D-03: „a rule dragged between groups may leave the drop line on the screen”).
- Regułę „Zapas poniżej 8 · Patyk → Zbierz — Patyk” gracz pisze od kliknięcia wiersza w 6 działaniach: wiersz, „Zapas poniżej”, liczba 8 z Enterem, „Patyk”, „Zbierz”, „Patyk”.
- Przed scaleniem Mariusz pisze kilka reguł w nowym edytorze na gałęzi prośby o scalenie, uruchomionej przez `npm run local`; prośba o scalenie niesie zrzuty i przebieg sprawdzenia agenta (pytanie 10).

### task.frozen.md:68-80

- Pytanie 3. Gdzie stoi panel reguły na ekranie przejścia, dopóki zadanie 6 nie zbuduje trzech obszarów?
  - Answer: A — panel na czas edycji zajmuje miejsce tabeli odsłoniętych kafelków, obok rysunku mapy. Koszt przyjęty: tabela znika na czas edycji. Rysunek i potrzeby zostają, a to docelowe zachowanie, które zadanie 6 tylko przenosi.
  - Not chosen:
    - B, osobna trzecia kolumna — „program i świat oddają 344 px, a reguły układu są do skasowania w zadaniu 6”
    - C, trzy obszary już teraz — „największa część zadania 6 w i tak dużym zadaniu, zmiana planu”
    - D, panel pod wierszem — „przeczy zdaniu o panelu obok i przesuwa reguły”
  - Source: human, 2026-11-03, „poza tym nie mam zastrzeżeń do rekomendacji”, pakiet rundy, B8, rekomendacja A.
- Pytanie 4. Co zadanie 5 zastaje na ekranie Programy po zadaniu 4?
  - Answer: A — listę programów po lewej, z „Nowy program”, „Zmień nazwę” i „Usuń”, buduje zadanie 4, a obok niej stoi stary panel; zadanie 5 wymienia środek i dokłada panel po prawej. Koszt przyjęty: razem trochę więcej pracy niż przy B, bo panel potrzebuje trybu przejściowego; gracz ma układ docelowy od razu, a największe zadanie maleje. Pytanie kanoniczne leży w rozmowie zadania 4 (ekrany-i-menu, Q5).
  - Not chosen:
    - B, listę buduje zadanie 5, od razu w nowym edytorze — „do tego czasu ekran wygląda jak wycięty panel, a `#/programy/{n}` niczego nie wybiera na liście”
    - bez decyzji — „oba dokumenty mogą założyć, że robi ją drugie zadanie”
  - Source: human, 2026-11-03, „poza tym nie mam zastrzeżeń do rekomendacji”, pakiet rundy, B5, rekomendacja A.

### task.frozen.md:90-112

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

### task.frozen.md:135-161

- Pytanie 11. Czy plan wyprawy znika z ekranu przejścia i co mówi jego pusta linia?
  - Answer: Plan wyprawy nie stoi na ekranie przejścia, co rozstrzyga cytat z definicji przy D-180: „The screen Programy shows a section „Plan wyprawy” folded to a line of icons between the program's name and its rules”, „Accepted with it: the plan of the copy is not changed during a map run.”, *Rejected*: „the section under the rule groups on the screen of a map run — it takes the space of what the player watches”, a przy układzie ekranu przejścia *Rejected*: „the trip plan under the editor during a map run.” Pusta linia: „Plan wyprawy: pusty”.
  - Not chosen:
    - sam nagłówek — „pusty plan wygląda jak niezaładowany”
  - Source: definicja_mvp2_loop2.md@efc19197, D-180 i wpis „How is the screen of a map run laid out?”; human, 2026-11-03, „poza tym nie mam zastrzeżeń do rekomendacji”, pakiet rundy, A13 nieskreślone i T28; human, 2026-11-03, „wszystko przyjmuję zgodnie z rekomendacjami”, drugi pakiet rundy, pytanie kontrolne E5: wybór T28 nie zmieniony.
- Pytanie 12. Czy „+ reguła” zostaje wyłączone przed pierwszym wychłodzeniem do czasu zadania 10?
  - Answer: Tak, co rozstrzyga cytat: plan daje to zadaniu 10, „Gracz ma „Eksploruj” od pierwszej sekundy, „+ reguła” nigdy nie jest wyłączone”, a do tej chwili obowiązuje obecny D-124: „„Dodaj regułę” is disabled while the Understanding holds no action, and once it holds one, it adds the program rule „Zawsze → Eksploruj” at the end of its rule group.” Koszt zostawienia: w grze pokazanej przy zgłoszeniu nowy gracz przez 84 minuty gry widzi wyłączony przycisk.
  - Not chosen:
    - po skreśleniu cytatu część zadania 10 przechodzi do zadania 5 — cytatu nikt nie skreślił
  - Source: plan_mvp2_loop2.md@54d8d854, cel zadania 10; foundations/decisions.md@20d804b, D-124; pakiet rundy, A4, nieskreślone (human, 2026-11-03).
- Pytanie 13. Co pokazuje ekran Programy, gdy przejście czeka albo się skończyło?
  - Answer: A — Programy pokazują zawsze zapisany program, nigdy kopię, a nad edytorem stoi zdanie: „Zmiany tutaj nie dotykają przejścia na mapie {mapa}.”; „Przełącz postać na ten program” zostaje na ekranie przejścia. Koszt przyjęty: poprawka zrobiona w Programach nie dochodzi do czekającego przejścia, chyba że gracz przełączy postać, co zeruje passę. W edytorze czekające przejście liczy się jak trwające, czyli oferta czynności idzie za postacią w przejściu, jak dziś w kodzie. Pytanie kanoniczne leży w rozmowie zadania 4 (ekrany-i-menu, Q15).
  - Not chosen:
    - B, na liście po lewej staje też „Kopia w przejściu” — „lista i adres muszą obsłużyć kopię, więcej pracy w zadaniach 4 i 5, zmiana projektowanego wpisu o programach”
    - C, gdy przejście czeka, „Programy” prowadzą na ekran przejścia — „gracz nie napisze zapisanego programu przy czekającym przejściu”
    - bez decyzji — „cykl zgadnie, a to, czy poprawka dojdzie do przejścia, gracz odkryje po fakcie”
  - Source: human, 2026-11-03, „poza tym nie mam zastrzeżeń do rekomendacji”, pakiet rundy, B2, rekomendacja A; zatwierdzona definicja niesie to w D-166 (definicja_mvp2_loop2.md@efc19197).
- Pytanie 14. Czy nagłówek „sprawdzane od góry” stoi tylko w przejściu, czy też w Programach?
  - Answer: Na obu ekranach, także w Programach, gdzie gracz pisze reguły.
  - Not chosen:
    - tylko w przejściu, jak mówiła dotąd decyzja — „Programy tego nie mówią”
  - Source: human, 2026-11-03, „poza tym nie mam zastrzeżeń do rekomendacji”, pakiet rundy, T8; zatwierdzona definicja niesie to w D-93 (definicja_mvp2_loop2.md@efc19197).
- Pytanie 15. Które zadanie zapisuje do fundamentu D-44?
  - Answer: A — D-44 zapisuje zadanie 5, a D-39 zadanie 11; zadanie 24 wychodzi z obu wierszy planu. Zadanie 5 zapisuje D-44 w całości, także część, którą czyni prawdziwą zadanie 4.
  - Not chosen:
    - B, zostaje zadanie 24 — „Słaby punkt: plan wskazuje zadanie, które nic tam nie zrobi, więc kto czyta wiersz, szuka zapisu w złym miejscu.”
  - Source: human, 2026-11-03, „A”, pytanie Q16 rozmowy zadania 4; plan_mvp2_loop2.md@54d8d854, wiersz D-44 i dziennik, 2026-11-03.

### task.frozen.md:177-181

- Pytanie 18. Co oferuje edytor w Programach po końcu przejścia, do „Restart” albo „Zakończ”?
  - Answer: A — czynności postaci z przejścia, do „Restart” albo „Zakończ”, jak dziś w kodzie i jak przyjęte „Kup” po końcu („one that has ended counting as a map run”). Koszt przyjęty: D-196 trzeba doprecyzować; robi to zadanie 4, którego przyjęty wiersz kandydatów 11 zmienia D-196.
  - Not chosen:
    - B, oferta archetypu po końcu, jak D-196 czytana dosłownie — „kod do zmiany, a w Programach po śmierci oferta zmienia się, choć przejście jeszcze stoi”
  - Source: round-4-7-package-2.md, C1, pytanie dla zadań 4 i 5; human, 2026-11-03, „wszystko przyjmuję zgodnie z rekomendacjami”. Fakt z kodu, osobno: edytor bierze repertuar postaci z przejścia, dopóki przejście stoi w stanie gry (`src/browser/sim/understanding.ts:138-150` przy 20d804b).

### task.frozen.md:200-211

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
- `foundations/decisions.md:792-805` D-36
- `foundations/decisions.md:2443-2475` D-131
- `foundations/decisions.md:2996-3009` D-164
- `foundations/decisions.md:3026-3044` D-166
- `foundations/decisions.md:3046-3059` D-167
- `foundations/decisions.md:3061-3074` D-168
- `foundations/decisions.md:3106-3119` D-171
- `foundations/decisions.md:3121-3134` D-172
- `foundations/decisions.md:3136-3149` D-173
- `foundations/decisions.md:3151-3164` D-174
- `foundations/decisions.md:3265-3276` D-180
- `foundations/decisions.md:3487-3500` D-196
- `foundations/decisions.md:4842-4859` D-244
- `foundations/decisions.md:5379-5409` D-264
- `foundations/decisions.md:5411-5451` D-265
- `foundations/decisions.md:5481-5508` D-267
- `foundations/decisions.md:5510-5553` D-268
- `foundations/decisions.md:5937-5960` D-282
- `foundations/decisions.md:5962-5979` D-283
- `foundations/invariants.md:35-43` browser-view-framework
- `foundations/invariants.md:459-467` browser-view-token-values
- `foundations/invariants.md:829-837` streak-program-change
- `foundations/invariants.md:839-847` saved-program-edit
- `foundations/invariants.md:849-857` copy-save
- `foundations/invariants.md:979-987` trip-plan-progress
- `foundations/invariants.md:1189-1197` document-test-memory-limit
- `foundations/glossary.md:25-30` program
- `foundations/glossary.md:174-178` copy
- `foundations/glossary.md:199-203` trip plan
- `foundations/decisions.md:6072-6106` D-288
- `foundations/decisions.md:1689-1749` D-93
- `foundations/decisions.md:6231-6249` D-294
- `foundations/decisions.md:6376-6393` D-302
- `foundations/decisions.md:6471-6485` D-307

Where the plan's *Read* names a guideline file, a source file, a test or a file made by an earlier slice, open it by that path (whole, as *Read* says) — the paths in your section above are relative to the worktree root. Files made by earlier slices exist now in the worktree.

## Report

Write the full report: status (`done`, `done with concerns`, `questions`, `returned`, `reserved`, `blocked`), your commits, what each check showed with command and exit code, your own-work check (the weakest point of your slice, how you checked it and what it showed), for a user-interface slice the states and screenshot evidence as `ui_check.md` gives (or a screenshot unchecked, with its reason), each reach beyond this handoff, **Searches not found or unclear:** each thing looked for and not found or unclear, or `none`, and concerns. Return only: status, commits, a one-line check result naming what failed or did not run, and the report path.
