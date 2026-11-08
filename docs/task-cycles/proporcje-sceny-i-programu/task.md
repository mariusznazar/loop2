Frozen copy of the task document.
Original path: the task's note in the author's backlog
Approval date: 2026-11-08 (Settlements to record: "Candidates: 5 shown, 3 accepted — 2026-11-08"; front matter updated: 2026-11-08). Frozen: 2026-11-08T13:52.

---

---
title: "loop2: panel reguły na liście i dwie kolumny ekranu przejścia, żeby program był szeroki jak w oryginalnym Loop"
status: draft
created: 2026-11-07T15:03
updated: 2026-11-08
tags: [zadanie]
related: "the project note of Loop"
---

# loop2: panel reguły na liście i dwie kolumny ekranu przejścia, żeby program był szeroki jak w oryginalnym Loop

Status: ready for cycle
Project relation: independent

## Description

### Need

- Na ekranie ręcznego przejścia scena ma 672 × 304 px, a program bierze to, co zostaje między obszarem świata a prawym obszarem: 174 px w oknie 1280 px i 270 px przy pełnej szerokości treści, 1344 px (rachunek w komentarzu `src/browser/styles.css:262-282`, 01b26d5).
- W tak wąskiej kolumnie reguły i przyciski programu zawijają się do kilku wierszy, a pytanie „Zapisać, odrzucić, wrócić?” łamie się przy oknie 1280 px na trzy wiersze (zrzut `docs/task-cycles/pytanie-przy-zakoncz/reports/fix1-question-running.png`, commit 2a19a53, prośba o scalenie #63).
- Odczuwa to Mariusz, gdy układa i czyta program w trakcie przejścia; na tym ekranie gracz spędza najwięcej czasu, a projekt jest oceniany po tym, czy program pisze się bez męczenia się (D-288, *Rationale*: „Writing a program without grimacing is what the project is judged by.”).
- Mariusz chce programu szerokiego jak w oryginalnym Loop (`the original Loop repository`), gdzie program bierze resztę szerokości między kolumną świata a prawą kolumną; celem jest szerokość programu, nie sam stosunek sceny do programu, bo w oryginalnym Loop scena ma 336 × 152 px, a tu zostaje dwa razy większa (pytanie kontrolne pod *Settlements to record*, wiersz 1).
- Każda nowa linia przy regule zawija się w wąskiej kolumnie coraz bardziej, a żadne z dalszych zadań planu MVP2 nie poszerza programu; bez zmiany ekran pisania programu byłby niewygodny już w pierwszej wersji gry.
- „Edycja reguł w widoku mobilnym jest mocno średnia” (Mariusz, 2026-11-08): w wąskim oknie panel stoi dziś pod całym programem na ekranie przejścia i pod całym edytorem na Programach; edycja w miejscu na liście, jak w starym Loop w węższym oknie, służy szerokiemu i wąskiemu oknu naraz (pytanie 1).

### To do

1. Na ekranie przejścia panel reguły albo grupy otwiera się w miejscu na liście, pod wierszem reguły albo grupy, którą zmienia, a kolumny programu i prawego obszaru łączą się w jedną kolumnę programu (pytanie 1).
2. W lewej kolumnie, pod rysunkiem mapy i linią kafelka, stoi obszar z zakładkami „Kronika” i „Teren”, z kroniką, jej filtrami i tabelą odsłoniętych kafelków, jak dziś w prawym obszarze; prawego obszaru już nie ma (pytania 2 i 5).
   - Wybór zakładki trzyma się jak dziś (D-346), a otwarty panel reguły nie zabiera już miejsca zakładkom.
   - W oknie za wąskim na dwie kolumny obszary stoją jeden pod drugim w dzisiejszej kolejności: świat, program, „Kronika” i „Teren” (D-282).
3. Na ekranie Programy otwarta reguła albo grupa nie dodaje trzeciej kolumny: panel otwiera się pod wierszem reguły albo grupy, tak jak na ekranie przejścia (pytanie 3).
4. Scena zostaje 672 × 304; kod, test i przewodnik stylu przestają trzymać drugi rozmiar, 336 × 152 (pytanie 1; dokument zadania 6, To do 6: „po uwadze Mariusza poprawka zostawia jeden z nich”, zapis cyklu ekran-przejscia, `docs/task-cycles/ekran-przejscia/task.md:42`, commit 2aae30a; `src/browser/view/world-area.tsx:33-37` i `src/browser/styles.css:262-268`, 01b26d5).
5. Przewodnik stylu mówi o nowym układzie tam, gdzie mówi o starym: o prawym obszarze przy kronice (`guidelines/styleguide-browser-view.md:626-628`) i o skali sceny (`guidelines/styleguide-browser-view.md:128-129`, `:596-597`), 01b26d5.

### Questions to settle

- Pytanie 1. Jaki rozmiar ma scena na ekranie przejścia i czy zmienia się coś poza nim w podziale szerokości trzech obszarów?
  - Answer: D — scena zostaje 672 × 304, panel reguły otwiera się w miejscu na liście reguł, jak w starym Loop w węższym oknie, a kolumny programu i prawego obszaru łączą się w jedną; program ma wtedy 526 px w oknie 1280 px i 622 px przy treści 1344 px (rachunek: obszar świata 706 px, odstęp 16 px). Ta sama edycja w miejscu na liście służy też późniejszemu układowi na telefon.
  - Not chosen:
    - A. Scena 336 × 152, reszta podziału bez zmian (program 510 px w oknie 1280 px, 606 px przy treści 1344 px) — „A teraz to też jest zadanie, które nie rozwiązuje tego co chcę rozwiązać”.
    - B. Scena zostaje 672 × 304, nic się nie zmienia — program zostaje przy 174 px w oknie 1280 px i 270 px przy treści 1344 px, a każda nowa treść przy regule zawija się dalej.
    - C. Scena 3/4 albo 4/5 obecnej wielkości i treść szersza niż 1344 px, z prawą kolumną zawijaną pod świat w węższym oknie — pikselowy obraz przy skali 1,5 albo 1,6 ma nierówne piksele, a mag „drga” w ruchu; w oknie 1280 px przy trzech kolumnach program ma 342 px; zmienia limit szerokości treści z D-280; po zawinięciu panel reguły otwiera się pod całym obszarem świata.
    - Duża scena tylko w szerokim oknie, mała w węższym — pominięta w porównaniu: treść ma najwyżej 1344 px, więc przy dużej scenie program nigdy nie ma więcej niż 270 px i wariant i tak kończy się małą sceną.
  - Source: Mariusz, 2026-11-08, „D na teraz”, odpowiedź na porównanie dróg A, C i D w tej rozmowie; drogę D zaproponował Mariusz: „edycja reguł w widoku mobilnym jest mocno średnia i ostatecznie i tak trzeba ją zrealizować tak jak w oryginalnym loop w miejscu na liście - jeśli by to zastosować uniwersalnie dla widoku mobilnego i desktopowego to nie musimy zmniejszać sceny, tylko zmergować 2 i 3 kolumnę”. Stary Loop otwiera edycję pod wierszem reguły, dopóki ekran przejścia nie ma trzech kolumn, a na Programach — dwóch (`the original Loop repository, src/components/probe/RulesPanel.tsx:682-683`, cdc7c0d).
- Pytanie 2. Gdzie stoi to, co dziś pokazuje prawy obszar poza panelem reguły — zakładki „Kronika” i „Teren” z zadania 15, a potem koniec przejścia z zadania 16 — gdy kolumny programu i prawego obszaru łączą się w jedną?
  - Answer: W1 — w lewej kolumnie, pod obszarem świata, pod rysunkiem mapy i linią kafelka, stoi jeden obszar z zakładkami „Kronika” i „Teren” z zadania 15; miejsca końca przejścia to zadanie nie ustala (pytanie 6). Przyjęty koszt: w niskim oknie, np. 1280 × 720, kronika zaczyna się poniżej dolnej krawędzi okna i trzeba ją przewinąć.
  - Not chosen:
    - W2. Pod programem w połączonej kolumnie, jak stary Loop w węższym oknie — miejsce kroniki zależy od długości programu: przy kilku grupach zjeżdża daleko w dół i skacze, gdy gracz otwiera panel reguły albo zwija grupę.
    - W3. Trzy zakładki na górze połączonej kolumny, „Program | Kronika | Teren” — programu i kroniki nie widać naraz, a czyta się je razem, gdy gracz sprawdza, czemu postać zrobiła to, co zrobiła; do edycji trzeba wrócić na zakładkę „Program”.
  - Source: Mariusz, 2026-11-08, „W1”, odpowiedź na pytanie z drogami W1, W2 i W3 w tej rozmowie, z rekomendacją W1.
- Pytanie 3. Czy panel reguły w miejscu na liście obowiązuje też na ekranie Programy, gdzie dziś otwarta reguła daje trzy kolumny obok siebie — listę programów, edytor i panel — a w oknie węższym niż 1100 px panel stoi pod całym edytorem (`src/browser/styles.css:215-231`, 6f36c7a)?
  - Answer: P1 — tak, wszędzie: na Programach zostają dwie kolumny, lista programów i edytor, a panel otwiera się pod wierszem reguły albo grupy, tak samo jak na ekranie przejścia. Przyjęty koszt: na Programach szerokości dziś nie brakuje, więc ta część jest robotą bez zysku szerokości tam, a zmienia też układ Programów z D-282.
  - Not chosen:
    - P2. Na Programach panel zostaje obok edytora — edytor ma dwa sposoby otwierania panelu zależnie od ekranu, gracz widzi tę samą regułę edytowaną raz obok, raz na liście, a w wąskim oknie Programów panel dalej ląduje pod całym edytorem.
  - Source: Mariusz, 2026-11-08, „P1”, odpowiedź na pytanie z drogami P1 i P2 w tej rozmowie, z rekomendacją P1; D-288: „One program editor stands on Programy and on the screen of a map run.”
- Pytanie 4. W jakiej kolejności idą to zadanie i zadanie 15 (kronika z filtrami), którego cykl trwa na gałęzi `task/kronika-z-filtrami` i już przepisał D-311 na zakładki „Kronika” i „Teren” w prawym obszarze (commit 3ea46e8)?
  - Answer: K1 — to zadanie idzie po scaleniu zadania 15: zadanie 15 kończy się, jak zaplanowano, z zakładkami w prawym obszarze, a to zadanie przenosi potem cały obszar „Kronika | Teren” pod świat, a panel reguły na listę. Przyjęty koszt: D-311 zmienia się dwa razy z rzędu, obszar zakładek jest przenoszony w kodzie raz więcej, a to zadanie czeka na scalenie zadania 15.
  - Not chosen:
    - K2. Zmiana zakresu zadania 15 w trakcie jego cyklu, z zakładkami od razu pod światem — przerywa cykl, który już przepisał D-311 i inne decyzje, jego plan trzeba przerobić, a zadanie 15 miesza dwie zmiany.
  - Source: Mariusz, 2026-11-08, „K1, ewentualnie możemy poczekać z kontynuowaniem refinowania do czasu scalenia zadania 15”.
- Pytanie 5. Jak brzmią D-311 i inne wpisy fundamentu o ekranie przejścia oraz jak stoją zakładki „Kronika” i „Teren” w kodzie po scaleniu zadania 15?
  - Answer: Zadanie 15 scalono (prośba #66, 01b26d5). Prawy obszar pokazuje panel reguły albo grupy, gdy któraś jest otwarta, a poza tym zakładki „Kronika” i „Teren” (D-311 przy 01b26d5, cytat pod *Decisions in play*); kod zakładek i kroniki stoi w `src/browser/view/right-area.tsx`, a panel zajmuje cały prawy obszar z woli ekranu (`src/browser/view/right-area.tsx:15-16`, 01b26d5). Akapit ostatniego starcia stoi już tylko w kronice, nie w obszarze świata.
  - Source: `foundations/decisions.md` przy 01b26d5, D-311, D-346; `src/browser/view/right-area.tsx:1-17`, 01b26d5; Mariusz, 2026-11-08, „zadanie 15 scalone, wracamy”.
- Pytanie 6. Czy to zadanie ustala, gdzie stoi koniec przejścia z zadania 16, skoro D-311 odrzuca koniec przejścia nisko na ekranie: „the end of a map run below an open editor of a rule, as in loop — its buttons fall under the edge of the window”, a przy W1 koniec stałby pod całym obszarem świata, w oknie 1280 × 720 poniżej dolnej krawędzi?
  - Answer: E1 — nie; to zadanie przenosi pod świat tylko „Kronikę” i „Teren”, a miejsce końca przejścia wybiera zadanie 16, gdy będzie wiadomo, co koniec zawiera i ile zajmuje. Przyjęty koszt: zdanie definicji MVP2 „on the right one content at a time, the end of the map run first…” i tak trzeba zmienić, a miejsce końca staje się tam pytaniem otwartym dla zadania 16.
  - Not chosen:
    - E2. Koniec przejścia stoi pierwszy w obszarze pod światem, jak w pierwotnym brzmieniu W1 — w niskim oknie koniec jest pod dolną krawędzią, w miejscu, które D-311 odrzuciło przy starym Loop, a zadanie 16 dostaje to miejsce z góry.
  - Source: Mariusz, 2026-11-08, „E1”, odpowiedź na pytanie z drogami E1 i E2 w tej rozmowie, z rekomendacją E1; D-311 przy 01b26d5, *Rejected*.

## Context

- Rozmiar sceny wybierała prośba o scalenie zadania 6 (#58, punkt 1 „The size of the scene”); prośba nie ma komentarza z wyborem, a scalono ją 2026-11-06 z 672 × 304, które commit trzymał do czasu wyboru (`src/browser/view/world-area.tsx:33-37`, 01b26d5: „Committed as 2 until that choice.”).
- Kod trzyma obie skale: jedną stałą `SCENE_SCALE` (`src/browser/view/world-area.tsx:37`), podawaną ekranowi jako `data-scene-scale` (`src/browser/view/run-screen.tsx:154`), i reguły stylów osobno dla każdej skali: siatkę trzech obszarów (`src/browser/styles.css:283-302`) oraz ikonę i pasek plakietki nad magiem (`src/browser/styles.css:1768-1785`), 01b26d5.
- Scena rysuje położenia obrazków w procentach kadru, więc jest poprawna przy każdej skali (`src/browser/view/scene.tsx:8`).
- Układ Programów z otwartą regułą — trzy kolumny, a w oknie węższym niż 1100 px panel pod edytorem — stoi w `src/browser/styles.css:215-243`, 01b26d5.
- Panel reguły zajmuje dziś cały prawy obszar ekranu przejścia z woli ekranu, a zakładki i kronika stoją w `src/browser/view/right-area.tsx` (`:1-17`, 01b26d5).
- Tabela odsłoniętych kafelków i rysunek mapy dzielą podświetlony kafelek (`src/browser/view/world-area.tsx:12-13`, 01b26d5).
- Przy połączonej kolumnie program ma 526 px w oknie 1280 px i 622 px przy treści 1344 px (rachunek: treść minus obszar świata 706 px i odstęp 16 px; nie pomiar).
- W oryginalnym Loop od okna 1280 px kolumna świata ma 336 px, prawa 344 px, a program resztę, z odstępami 32 px i marginesami 32 px po bokach (`the original Loop repository, src/components/probe/MapScreen.tsx:133`, `the original Loop repository, src/app/globals.css:14`, cdc7c0d); w węższym oknie edycja reguły stoi pod jej wierszem (`the original Loop repository, src/components/probe/RulesPanel.tsx:682-683`), a scena ma 336 × 152 px w skali 1:1 (`the original Loop repository, src/components/probe/RunWorld.tsx:141`).
- Z klas starego Loop wychodzi programowi około 470 px w oknie 1280 px (rachunek, nie pomiar), a na zrzucie przy oknie 1600 px kolumna programu ma około 600 px (odczyt z obrazu `a screenshot of the original Loop in the author's notes`).
- Test obszaru świata dopuszcza obie skale i sprawdza rozmiar sceny według stałej (`tests/view/world-area.test.mjs:417-433`, 01b26d5).
- Zatwierdzona definicja MVP2 (odcisk 9641f804) mówi o prawym obszarze i o panelu obok wierszy w zdaniach, które po tym zadaniu przestają być prawdą: koniec przejścia „takes the right area” (`definicja_mvp2_loop2.md:241`, `:556`, `:691`, `:702`), „a rule panel beside the rows” (`:256`) i „panel obok” (`:33`), kronika „in the right area” (`:286`), tabela kafelków „in the right area, which the editing of a rule takes” (`:1175`); plan MVP2 — cel zadania 16 „Koniec przejścia w prawym obszarze” (`plan_mvp2_loop2.md:26`). Zmiana idzie przez `the-way-define-project` i `the-way-plan-project` przed doprecyzowaniem zadania 16, jako trzecia pozycja „Zadania 5” w `a note of the author's backlog of the process project`; to zadanie na nią nie czeka.

## Questions carried to cycle

none

## Human actions

none

## Decisions in play

Obecne decyzje fundamentu przy 01b26d5, które zadanie zmienia; cykl zapisuje zmiany z wierszy *Settlements to record* i to, co z nich wynika.

- D-311 — How is the screen of a map run laid out? Zadanie zmienia podział na trzy obszary i miejsce zakładek: „The screen of a map run has three areas under one header: the world on the left, the program in the middle, and on the right one content at a time, the editing of a program rule or a rule group while one is open and otherwise the chronicle or the table of revealed tiles, as the player picks with the tabs „Kronika” and „Teren”, „Kronika” picked when the character is sent to the map. The world holds, from the top, the scene, „Teraz” and „Potem”, the line of the end of the map run (D-185, D-216), the body row with the minutes each need lasts, with the backpack and the lines below them, the drawing of the map and the line of a tile under it.” *Verification* i *Rationale* mówią o prawym obszarze („a rule opened from its row standing in the right area in the place of the tabs”, „the rule panel opened over the program or under the tabs”, „The chronicle shares the right area with the table of revealed tiles under two tabs, so each keeps the whole height of the area”).
- D-288 — How does the player write a program rule? Zadanie zmienia miejsce panelu: „One program editor stands on Programy and on the screen of a map run. A rule's row reads as a sentence and a rule panel beside the rows changes it…”; *Verification*: „a click on the row „Zapas poniżej 8 · Patyk → Zbierz — Patyk” opening the rule panel beside the rows”; *Rationale*: „the player writes while seeing the world, so the pick stands beside the program rather than over it”.
- D-282 — What do the screens leave room for from the start? Zdanie wiążące zostaje: „Each column of a screen is an area of its own that a narrower layout can rearrange…”; zmieniają się przykłady *Verification*: „the world, the program and the right area of the screen of a map run each an area of its own” i „on Programy the list of programs, the program editor and the rule panel each an area of its own”.
- D-19 — How does the player interact with the drawing of the game map? *Verification*: „while the tab „Teren” of the right area of the screen of a map run is picked (D-311)”; *Rationale*: „The list stands in the right area, which the editing of a rule takes, so the line under the drawing keeps the numbers beside the program while the player writes.”
- D-338 — What does the chronicle of a map run hold? „The player filters it by these kinds in the right area of the screen.”
- D-343 — How does the chronicle stand in the right area, and how does the player filter it? — prawy obszar w pytaniu wpisu.
- D-345 — What does the entry of a discovery say in the chronicle? *Rationale*: „Accepted with it: a long entry that wraps over several lines in the right area.”
- D-346 — How long does the pick of „Kronika” or „Teren” hold on the screen of a map run? „The tab „Kronika” or „Teren” the player picks in the right area of the screen of a map run stays picked…”; *Verification*: „a rule panel closed with „✕” giving back „Teren””.
- D-334 — What does „Teraz” say on the screen of a map run? *Rejected*: „until the end of the map run stands in the right area, the player reads nowhere why the map run ended”.
- D-280 — Which screens does the game have, and how does the player move between them? Zadanie go nie zmienia: „all of one content width under one menu bar: at most 1344 px, and the full width of a narrower window”.

## Settlements to record

Candidates: 5 shown, 3 accepted — 2026-11-08

| # | Settlement | Kind | Source | What the cycle would otherwise guess |
|---|---|---|---|---|
| 1 | Panel reguły albo grupy otwiera się w miejscu na liście, pod wierszem reguły albo grupy, którą zmienia — na ekranie przejścia i na Programach. | decision | pytania 1 i 3; pytanie kontrolne do drogi D, 2026-11-08, z kotwicą z notatki, od której zaczęło się zadanie: „Mariusz powiedział tylko, że proporcje sceny i programu mają wyglądać jak w starym Loop” — czy celem jest szeroki program, a nie sam stosunek sceny do programu, i D zostaje? Mariusz: „tak” | czy na Programach panel zostaje obok edytora i czy na liście otwiera się pod wierszem, czy nad listą |
| 2 | Ekran przejścia ma pod nagłówkiem dwie kolumny: po lewej świat, a pod rysunkiem mapy zakładki „Kronika” i „Teren”; po prawej program. | decision | pytania 1, 2 i 6; pytanie kontrolne jak w wierszu 1 | gdzie stanąć zakładkom po zniknięciu prawego obszaru: pod światem, pod programem czy nad nim |
| 3 | Scena ma jeden rozmiar, 672 × 304, dwukrotność swojego obrazu. | decision | pytanie 1 („nie musimy zmniejszać sceny”), To do 4; pytanie kontrolne jak w wierszu 1 | czy zostawić przełącznik dwóch skal; dla jakiego rozmiaru zadania 17–20 robią efekty sceny |

## Out of scope

- Miejsce końca przejścia; wybiera je zadanie 16 (pytanie 6).
