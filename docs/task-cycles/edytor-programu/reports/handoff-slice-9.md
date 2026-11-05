# Handoff — slice 9 of the task `edytor-programu`

## Delegation

The person who requested this cycle delegated every intermediate choice to the orchestrator of
`implement-task`. You never ask the human. A question goes back to the orchestrator in your report
with status `questions`; a fact or permission nobody supplies makes you `blocked`. Nothing here is the human's approval.

## Where you work

- Worktree (work from its root): `C:/Storage/repos/loop2-wt/edytor-programu`, branch `task/edytor-programu`.
  Your base (the head when you start): `3afd424`. Commit your work on this branch; push nothing.
- Pinned process: the worktree's `.the-way` at `f45ca40724251a46965aed69f733d0a35c430048`.
- You make: **a slice, or the retry of a slice** — slice 9. Read in full `.the-way/task-cycle/change/SKILL.md` (project skill
  `the-way-make-change`) and `.the-way/task-cycle/change/slice.md`; read `.the-way/task-cycle/change/ui_check.md` when the slice changes a user interface (the step that names it comes).
- Report: `docs/task-cycles/edytor-programu/reports/report-slice-9.md` (if your tool refuses the file, return the whole report as text).
- Commit by paths with `git add <paths>` only (never `-A`, `.`, `-a`); messages in English in the repository's form (see `git log --oneline -8`, e.g. `feat: :sparkles: …`, `docs: :memo: …`). Do not run the product's gate (`npm test` with no argument); run the focused checks your section names, each with command and exit code in the report.

## Answers of the start

- Trust boundary: the change touches `assets/icons/**` (files from game-icons.net) in slices 3 and 4 only; the review of those slices checks crafted input there.
- Irreversible operation: none. Open design choice: none; a choice of how to make what the task and the foundation settle is yours to make and name in the report; a real open design choice makes you return `returned` with no code.
- The foundation step has run: the entries D-288 to D-307 and the changed ones (D-03, D-27, D-39, D-43, D-44, D-91, D-93, D-124, D-166, D-180, D-196, D-245, D-255, D-282, icon-credits, the icon title facts, game-icons-licence) are written. Entry ranges below are current ones; they hold where they differ from the plan's.
- The base gate already fails on `tests/quality/test_quality_invariants.py::test_ruff_source_rules` and `::test_shellcheck_source_rules` (`FileNotFoundError`: ruff and shellcheck are not installed on this computer). That is the base's state: report any other failure of that file as yours.
- Two of the 11 icons are not by Delapouite or Lorc (see the foundation step's report): `logging` is by Skoll (https://game-icons.net/1x1/skoll/logging.html) and `dodge` by Felbrigg (https://game-icons.net/1x1/felbrigg/dodge.html); the foundation names them in `game-icons-licence`. Relevant only to slices 3 and 4.
- Orchestrator's answers (autonomous choices Q7, Q8, recorded in the cycle record, not the human's), from slice 5's report:
  - Slice 5 made `moveRule` cross group edges and added `ruleArrows`, `dropGroup`, the pick, sentence, number, time and group-summary functions in `src/browser/view/program-editor.ts`; read its exports and the report `docs/task-cycles/edytor-programu/reports/report-slice-5.md`.
  - `focusAfter` of the old DOM editor still points at the origin group after a rule is moved across a group edge. `focusAfter` is not in your *Change* list: do not rely on it. Compute, inside `rule-list.tsx`, the focus target of a cross-group move yourself (the moved rule's control in its new group) and keep a test for it.
  - Targets are shown capitalised in sentences (`Patyk`), as the acceptance criterion reads.
  - The pick cell (slice 6) is `src/browser/view/controls/react-pick-cell.tsx` with the mask class `.action-icon`; the React select list and number field (slice 7) exist. The destructive button is neutral at rest (slice 8).

## Your section of the plan, word for word (`docs/task-cycles/edytor-programu/plan.md`)

### Slice 9 — The rule list in React

- **Goal:** a new `src/browser/view/rule-list.tsx` holds the list of a program's rule groups and rules as a React component the program panel will hold (Slice 12), drawn from the pure functions of Slice 5 and committing each edit as a whole new program through a callback, never writing the game state. It draws, under the heading „sprawdzane od góry” (row E4): for each group a header with its handle, its number, its name, its condition, its number of rules, the sum „Wykonano {n}×” where counts are given, its fold and its „✕”, the destructive button; a folded group showing only the header (row E24); „Pusta grupa — przepuszcza dalej.” in an empty group (row E30); for each rule a row read as a sentence (row E21, Slice 5 f) with its handle, its number, its action's icon through the mask class of Slice 6 (row E20), the time of one execution (row E22), „Wykonano {n}×” where counts are given (D-93), „↑”, „↓” and the destructive „Usuń” (D-275); „zwiń wszystkie” / „rozwiń wszystkie”, a plain button, only beside more than one group (row E27), every group unfolded at the start; „+ reguła” at each group — disabled while the Understanding holds no action, as today (row E13, question 12) — adding a rule at the group's end and asking to open its panel on the condition; „+ dodaj grupę” beside it (row E33). A click on a row asks to open that rule's panel, on a header that group's (row E25); the open row and the row under the pointer stand on `highlight`. A rule and a group are deleted at once (row E32). Rules move by „↑” and „↓” across groups (row E26) and, with whole groups, by their handle on the browser's own drag (D-270), with one drop line „tu wyląduje” at the place they would land (row E1); the line leaves on a drop, at the drag's end, when the drag leaves the list and when it is cancelled (acceptance criterion 2); a rule dropped on a folded group lands at its end and the group stays folded. A group's header has no arrows, and groups do not move by the keyboard (question 6). Focus after a structural edit goes where `focusAfter` gives. Which groups are folded the component takes from its props and reports a change through a callback, holding no memory of its own (row E23). No ⊘, „N reguł nie zadziała” or „0×” (row E34). The look follows the styleguide's rule of Slice 1 in `src/browser/styles.css`. The new test `tests/view/rule-editor.test.mjs` — the one file of the rule list and of Slice 10's rule panel — runs on jsdom through `tests/view/page-document.mjs` (D-264) and holds a case for each sentence, button and state above, the drop line gone after a drop, a drag end and a cancel, between groups and on a folded group, and the arrows on the borders of groups and the ends of the program.
- **Change:** `src/browser/view/rule-list.tsx` · `tests/view/rule-editor.test.mjs` · `src/browser/styles.css`
- **Read:** `docs/task-cycles/edytor-programu/task.frozen.md:19-25` Need · `docs/task-cycles/edytor-programu/task.frozen.md:29-38` To do · `docs/task-cycles/edytor-programu/task.frozen.md:41-41` To do · `docs/task-cycles/edytor-programu/task.frozen.md:47-50` Acceptance criteria · `docs/task-cycles/edytor-programu/task.frozen.md:90-112` Questions to settle · `docs/task-cycles/edytor-programu/task.frozen.md:140-144` Questions to settle · `docs/task-cycles/edytor-programu/task.frozen.md:165-176` Questions to settle · `docs/task-cycles/edytor-programu/task.frozen.md:187-191` Questions to settle · `docs/task-cycles/edytor-programu/task.frozen.md:200-205` Context · `docs/task-cycles/edytor-programu/task.frozen.md:225-292` Decisions in play · `docs/task-cycles/edytor-programu/task.frozen.md:294-318` Settlements to record
  `guidelines/coding.md` · `guidelines/coding-browser-module.md` · `guidelines/styleguide-browser-view.md` · `guidelines/testing.md` · `src/browser/AGENTS.md`
  `foundations/part_map.md:3-28` browser-view
  `foundations/decisions.md:39-50` D-03 · `foundations/decisions.md:516-550` D-23 · `foundations/decisions.md:792-805` D-36 · `foundations/decisions.md:882-895` D-42 · `foundations/decisions.md:957-970` D-47 · `foundations/decisions.md:1630-1647` D-90 · `foundations/decisions.md:1649-1665` D-91 · `foundations/decisions.md:1689-1739` D-93 · `foundations/decisions.md:2262-2281` D-124 · `foundations/decisions.md:5360-5390` D-264 · `foundations/decisions.md:5392-5432` D-265 · `foundations/decisions.md:5462-5489` D-267 · `foundations/decisions.md:5491-5534` D-268 · `foundations/decisions.md:5562-5589` D-270 · `foundations/decisions.md:5709-5734` D-275 · `foundations/decisions.md:5817-5839` D-279
  Foundation entries rows E1, E4, E7, E10, E13, E15, E20, E21, E22, E23, E24, E25, E26, E27, E30, E32, E33, E34, E39
  `foundations/invariants.md:35-43` browser-view-framework · `foundations/invariants.md:236-246` content-identifiers · `foundations/invariants.md:459-467` browser-view-token-values · `foundations/invariants.md:469-477` browser-view-focus-outline · `foundations/invariants.md:1189-1197` document-test-memory-limit
  `foundations/glossary.md:53-57` program rule · `foundations/glossary.md:59-63` rule group · `foundations/glossary.md:130-134` manual map run · `foundations/glossary.md:174-178` copy
  `src/browser/view/program-editor.ts` · `src/browser/view/account-card.tsx` · `src/browser/view/program-list.tsx` · `src/browser/view/controls/react-button.tsx` · `tests/view/page-document.mjs` · `tests/view/program-list.test.mjs`
  outside the repository, named without backticks: C:\Storage\repos\loop\src\components\probe\RulesPanel.tsx, as far as the rows, the headers, the handle and the drop line need, and the screenshot C:\Storage\The Brain\The Brain\.playwright-mcp\rozpoznanie\loop_09_edycja_reguly.png
  made by an earlier slice, named without backticks as it does not exist at the base: src/browser/view/controls/react-pick-cell.tsx (Slice 6, for its mask class)
- **Model:** same — the browser's own drag with a drop line across groups and folded groups, the arrows across borders and the focus after each edit are where a document imitation hides slips.
- **Risk:** none
- **Checks:** start from the failing cases of the drop line gone after a drag end and of „↓” on the last rule of a group; `npm test -- tests/view/rule-editor.test.mjs`; `npm test -- tests/view/program-editor.test.mjs`; `npm run typecheck`; `npm test -- tests/invariants/test_browser_view_framework.py`; `npm test -- tests/invariants/test_browser_view_token_values.py`; `npm test -- tests/invariants/test_browser_view_focus_outline.py`; `npm test -- tests/invariants/test_content_identifiers.py`; `npm test -- tests/quality/test_quality_invariants.py`; screenshots: none yet — the list stands on no screen until Slice 12, so the report marks them unchecked with that reason and the states checked in its test
- **Depends on:** Slice 5 · Slice 8 · E1 · E4 · E13 · E15 · E21 · E22 · E23 · E24 · E25 · E26 · E27 · E30 · E32 · E33 · E34

## Passages of the task named in your *Read*, word for word (`docs/task-cycles/edytor-programu/task.frozen.md`)

### task.frozen.md:19-25

- Gracz pisze dziś program w wierszach zrobionych z natywnych list wyboru: warunek, liczba, czynność, „↑”, „↓” i czerwone „Usuń” stoją w jednym rzędzie (`src/browser/view/program-editor.ts:867`, zrzut `C:\Storage\The Brain\The Brain\.playwright-mcp\rozpoznanie\loop2_07_edytor_dwie_reguly.png`).
- Mariusz o całości: „interfejs mi się nie podoba zupełnie”, a najbardziej chodzi mu o „podział na ekrany, układ elementów, interfejs tworzenia programu, animację ludzika”.
- Licznik stoi jako samo „3×”, a nic na ekranie nie mówi, że reguły sprawdza się od góry; definicja przy D-93: „A bare „1×” reads as a limit of one, and nothing else on the screen says that rules are checked from the top, on Programy too, where the player writes them.”
- Przeciąganie reguł już działa, także między grupami, ale gracz tego nie widzi: nie ma uchwytu ani znaku, gdzie reguła wyląduje (`src/browser/view/program-editor.ts:883`).
- Czerwony przycisk kasowania stoi w spoczynku przy każdej regule, a w starym Loop ten przycisk jest szary i czerwienieje dopiero pod kursorem (`C:\Storage\repos\loop\src\components\probe\RulesPanel.tsx:835`).
- Agent nie dochodzi graniem do stanów, w których w wyborze czynności stoją czasowniki walki i wykupione gałęzie, więc bez składania stanu nie sprawdzi nowego wyboru (dziennik planu, wpis o składzie stanu gry, 2026-11-01).
- Projekt jest oceniany właśnie po edytorze; Mariusz: „rozpoznam, że się udało jak nie będę się krzywił próbując napisać program” i „najbardziej zależy mi na edytorze, ludziku i stronie logowania”.

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

### task.frozen.md:47-50

### Acceptance criteria

- Liczba wpisywana w panelu i fokus zostają na miejscu, gdy przejście idzie przy 16× (D-03: „the screen of a map run changes up to five times a second beside fields in which the player types”; ryzyko z tej decyzji: „a number field whose value the game clips may lose its cursor”).
- Po każdym przeciągnięciu reguły albo grupy, także między grupami i także przerwanym, linia upuszczenia znika (ryzyko z D-03: „a rule dragged between groups may leave the drop line on the screen”).

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

### task.frozen.md:140-144

- Pytanie 12. Czy „+ reguła” zostaje wyłączone przed pierwszym wychłodzeniem do czasu zadania 10?
  - Answer: Tak, co rozstrzyga cytat: plan daje to zadaniu 10, „Gracz ma „Eksploruj” od pierwszej sekundy, „+ reguła” nigdy nie jest wyłączone”, a do tej chwili obowiązuje obecny D-124: „„Dodaj regułę” is disabled while the Understanding holds no action, and once it holds one, it adds the program rule „Zawsze → Eksploruj” at the end of its rule group.” Koszt zostawienia: w grze pokazanej przy zgłoszeniu nowy gracz przez 84 minuty gry widzi wyłączony przycisk.
  - Not chosen:
    - po skreśleniu cytatu część zadania 10 przechodzi do zadania 5 — cytatu nikt nie skreślił
  - Source: plan_mvp2_loop2.md@54d8d854, cel zadania 10; foundations/decisions.md@20d804b, D-124; pakiet rundy, A4, nieskreślone (human, 2026-11-03).

### task.frozen.md:165-176

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

### task.frozen.md:187-191

- Pytanie 20. Jakie tło ma otwarty wiersz, gdy jest też regułą „wygra teraz” albo „trwa”?
  - Answer: A — jak w Loop: tło otwarcia wygrywa, a znak „wygra teraz” na czas edycji znika z tego wiersza; pasek zostaje. Koszt przyjęty: przy edytowanej regule nie widać tła stanu. Tła stanu i pasek daje zadanie 11, więc to ono stosuje tę zasadę; to zadanie daje tło otwartego wiersza.
  - Not chosen:
    - B, tło stanu zostaje, a otwarcie oznacza ramka — „nowy znak do ustalenia”
  - Source: round-4-7-package-2.md, C5; human, 2026-11-03, „wszystko przyjmuję zgodnie z rekomendacjami”.

### task.frozen.md:200-205

- Czyste funkcje edycji w `src/browser/view/program-editor.ts:37-532` nie rysują niczego; do wymiany jest część od wiersza 534.
- Wzorcem ekranu w React jest `src/browser/view/account-card.tsx` (D-36), a `program-editor.ts` i `program-panel.ts` mają w `guidelines/coding-browser-module.md` status `do not copy`.
- W `src/browser/view/controls/` są dziś postaci React tylko przycisku (`react-button.tsx`) i pola tekstowego (`react-text-field.tsx`); postać React przycisku niszczącego przynosi zadanie 4.
- Przeciąganie stoi dziś na natywnym przeciąganiu przeglądarki (`src/browser/view/program-editor.ts:883`), więc zadanie nie potrzebuje biblioteki, a biblioteka na Reacta wymagałaby zmiany D-270.
- Grupy przestawia się dziś strzałkami (`src/browser/view/program-editor.ts:77`); po tym zadaniu tylko uchwytem.
- Ryzyko z D-254: „a drag may catch a select list instead of a handle”, więc sprawdzenie przeciągania w prawdziwej przeglądarce chwyta uchwyt.

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
- `foundations/decisions.md:882-895` D-42
- `foundations/decisions.md:957-970` D-47
- `foundations/decisions.md:1630-1647` D-90
- `foundations/decisions.md:1649-1665` D-91
- `foundations/decisions.md:1689-1749` D-93
- `foundations/decisions.md:2272-2295` D-124
- `foundations/decisions.md:5379-5409` D-264
- `foundations/decisions.md:5411-5451` D-265
- `foundations/decisions.md:5481-5508` D-267
- `foundations/decisions.md:5510-5553` D-268
- `foundations/decisions.md:5581-5608` D-270
- `foundations/decisions.md:5728-5753` D-275
- `foundations/decisions.md:5836-5858` D-279
- `foundations/invariants.md:35-43` browser-view-framework
- `foundations/invariants.md:236-246` content-identifiers
- `foundations/invariants.md:459-467` browser-view-token-values
- `foundations/invariants.md:469-477` browser-view-focus-outline
- `foundations/invariants.md:1189-1197` document-test-memory-limit
- `foundations/glossary.md:53-57` program rule
- `foundations/glossary.md:59-63` rule group
- `foundations/glossary.md:130-134` manual map run
- `foundations/glossary.md:174-178` copy
- `foundations/decisions.md:6072-6106` D-288
- `foundations/decisions.md:897-910` D-43
- `foundations/decisions.md:6167-6190` D-291
- `foundations/decisions.md:6192-6209` D-292
- `foundations/decisions.md:6211-6229` D-293
- `foundations/decisions.md:6231-6249` D-294
- `foundations/decisions.md:6251-6266` D-295
- `foundations/decisions.md:6268-6285` D-296
- `foundations/decisions.md:6287-6306` D-297
- `foundations/decisions.md:6308-6324` D-298
- `foundations/decisions.md:6361-6374` D-301
- `foundations/decisions.md:6395-6408` D-303
- `foundations/decisions.md:6410-6423` D-304
- `foundations/decisions.md:6425-6441` D-305

Where the plan's *Read* names a guideline file, a source file, a test or a file made by an earlier slice, open it by that path (whole, as *Read* says) — the paths in your section above are relative to the worktree root. Files made by earlier slices exist now in the worktree.

## Report

Write the full report: status (`done`, `done with concerns`, `questions`, `returned`, `reserved`, `blocked`), your commits, what each check showed with command and exit code, your own-work check (the weakest point of your slice, how you checked it and what it showed), for a user-interface slice the states and screenshot evidence as `ui_check.md` gives (or a screenshot unchecked, with its reason), each reach beyond this handoff, **Searches not found or unclear:** each thing looked for and not found or unclear, or `none`, and concerns. Return only: status, commits, a one-line check result naming what failed or did not run, and the report path.
