---
title: "loop2: struktura kodu — reguła rozmiaru, duże funkcje, narzędzie nieużywanego kodu"
status: draft
created: 2026-11-13
updated: 2026-11-13
tags: [zadanie]
related: "notatka autora o projekcie Loop"
---

# loop2: struktura kodu — reguła rozmiaru, duże funkcje, narzędzie nieużywanego kodu

Status: ready for cycle
Project relation: independent

## Description

### Need

- Nic w bramce nie zatrzymuje rośnięcia plików i funkcji: linter (D-29) nie ma żadnej reguły rozmiaru, więc agent dopisujący kolejny ekran albo regułę do istniejącej funkcji nie dostaje żadnego sygnału, a przegląd zmiany widzi tylko różnicę, nie sumę.
- W kodzie aplikacji (`src/`) przy `fc00c406` dziewięć funkcji ma ponad 150 linii kodu (bez komentarzy i pustych linii), siedem ponad 200, a piętnaście plików ponad 500; trzy z największych funkcji to edytor programu (`RuleListView`, `RulePanelView`, `ProgramPanelView`), środek gry, i żadne zadanie ich nie dzieli.
- Nieużywany kod (eksporty bez użytkownika, nieużywane pliki i zależności) znajdowało dotąd tylko ręczne liczenie; próbny przebieg knip w doprecyzowaniu tego zadania jest jednorazowym przeglądem narzędziem.
- Źródło: grupa G-9 przeglądu fundamentu z 13.11.2026 — notatka autora o przeglądzie fundamentu z 13.11.2026, sekcja „G-9”.

### To do

1. Reguła rozmiaru funkcji i pliku w loop2, z progami i wyjątkami z odpowiedzi niżej: funkcja najwyżej 200 linii kodu w całym kodzie objętym lintowaniem (aplikacja, skrypty, testy), plik najwyżej 800 linii kodu w kodzie aplikacji i skryptach (testy poza regułą pliku), liczone bez komentarzy i pustych linii, z linią funkcji zagnieżdżonych wliczaną do funkcji, która je zawiera; wyjątki: funkcja `accountRoutes` (`src/server/account-routes.ts`) i plik `src/browser/sim/saved-game.ts`.
2. Test reguły w pakiecie testów produktu, uruchamiający ESLint produktu osobno od przebiegu z `eslint.config.mjs`, z samymi regułami rozmiaru; przy porażce wymienia każdą funkcję i każdy plik ponad progiem z miejscem i rozmiarem; jego konfiguracja wymienia tylko wyjątki decyzji; test widziany raz jako padający.
3. Niezmiennik reguły oznaczony jako naruszony, z testem oznaczonym jako oczekiwana porażka, dopóki ponad progiem stoją `createGameView` (`src/browser/view/game-view.ts`) i `startApp` (`src/browser/view/app.ts`), które dzielą inne zadania; zmiana, w której test zaczyna przechodzić, zdejmuje oba oznaczenia (WAY-51).
4. Podział, bez zmiany tego, co widzi gracz, funkcji `Scene` (`src/browser/view/scene.tsx`), `ProgramPanelView` (`src/browser/view/program-panel.tsx`), `RuleListView` (`src/browser/view/rule-list.tsx`) i `RulePanelView` (`src/browser/view/rule-panel.tsx`) oraz funkcji testu w `tests/transport.test.mjs:517` tak, by każda część mieściła się w progu funkcji.
5. Reguła wytycznych w `guidelines/coding.md` pod nagłówkiem `### Size of a function and a file`, nazywająca decyzję reguły i jej niezmiennik, bez powtarzania progów i wyjątków, które stoją tylko w decyzji.
6. Plik konfiguracji testu reguły, jeśli stoi poza `tests/quality/`, przypisany do części build-tools przez `the-way-update-part-map`.

### Questions to settle

- Jakie narzędzia mają mierzyć rozmiar i szukać nieużywanego kodu — preferencje człowieka?
  - Answer: rozmiar funkcji i plików — reguły wbudowane w ESLint, który produkt już uruchamia, bez nowego narzędzia; nieużywany kod — knip, sprawdzany jako jedyne narzędzie, bez porównania z innymi.
  - Source: doradca dnia w imieniu Mariusza, 2026-11-13: „rozmiar funkcji i plików — reguły wbudowane w ESLint, bez nowego narzędzia. Nieużywany kod — knip; sprawdź tylko to jedno narzędzie (bez porównania przez dwóch agentów)”
- Jaki limit długości funkcji i dla jakiego kodu?
  - Answer: 200 linii kodu (bez komentarzy i pustych linii, z funkcjami zagnieżdżonymi wliczanymi do zawierającej), dla całego kodu: aplikacji, skryptów i testów. Łamią go dziś w `src/`: `createGameView`, `startApp` (inne zadania), `accountRoutes` (wyjątek), `Scene`, `ProgramPanelView`, `RuleListView`, `RulePanelView` (podział w tym zadaniu); w testach jedna funkcja (`tests/transport.test.mjs:517`, 233 linie), w skryptach żadna. Każdy próg od 200 do 295 łamie ten sam zestaw; 200 to dolna granica, a `TripPlanView` (199) przy następnej dopisanej linii każe się podzielić albo prosić o wyjątek.
  - Not chosen:
    - 150 linii — łamie 9 funkcji, dochodzą `TripPlanView` i `EndWindowView` ocenione „zostawić”, więc trzy wyjątki, a funkcje z wyjątkiem rosną bez limitu.
    - inna miara (liczba rozgałęzień albo instrukcji w funkcji) — nie widzi długich płaskich funkcji (`createGameView` ma 3 rozgałęzienia), a po przesunięciu przypiętej wersji the way na wersję z WAY-360 (rozmiar to liczba linii) wymaga zapisanego odstępstwa.
  - Source: doradca dnia w imieniu Mariusza, 2026-11-13: „1 a”
- Jaki limit długości pliku i dla jakiego kodu?
  - Answer: 800 linii kodu w kodzie aplikacji i skryptach; testy poza regułą pliku (19 plików testów ma ponad 800 linii i rośnie z każdym przypadkiem). Łamie go dziś tylko `src/browser/sim/saved-game.ts` (1119), który dostaje wyjątek z powodem: to granica zaufania — całe przekładanie dokumentu zapisu na stan gry albo odmowę stoi w jednym sprawdzanym pliku, wzorcu swojego rodzaju kodu. Próg dobrany tak, że dziś łamie go jeden plik; najbliżej progu są `program-editor.ts` (719) i `scene.tsx` (717).
  - Not chosen:
    - 500 linii — łamie 16 plików, reguła oznaczona jako naruszona, bramka nie zatrzymuje żadnego wzrostu plików, dopóki wszystkie nie zostaną podzielone.
    - bez limitu pliku — przegląd zmiany w przypiętej wersji the way nie patrzy na rozmiar, więc wzrostu plików nie pilnuje nic, a po przesunięciu przypięcia potrzebne jest odstępstwo.
  - Source: doradca dnia w imieniu Mariusza, 2026-11-13: „2 a”
- Co z funkcjami ponad limitem funkcji?
  - Answer: to zadanie dzieli `Scene`, `ProgramPanelView`, `RuleListView` i `RulePanelView` i dopisuje wyjątek `accountRoutes` (jedna funkcja rejestrująca trasy serwera; jej własnego kodu jest 37 linii z 408). Reguła wchodzi teraz, oznaczona jako naruszona do scalenia podziału obu sterowników widoku w innych zadaniach. Funkcji, której nie da się zejść pod próg bez psucia kodu, cykl nie wpisuje sam jako wyjątku: proponuje wyjątek przy zablokowanej prośbie o scalenie. Estymata zadania rośnie z 3 do 5.
  - Not chosen:
    - czekać na zadania obu sterowników i wejść z regułą niezłamaną — reguła blokuje od pierwszego dnia, ale później.
    - sama reguła i wyjątek, podziały jako osobne zadania — do ich scalenia reguła jest złamana i pilnuje jej tylko przegląd.
  - Source: doradca dnia w imieniu Mariusza, 2026-11-13: „3 a”
- Czy knip zostaje w bramce?
  - Answer: nie. Próbny przebieg z doprecyzowania jest jednorazowym przeglądem; loop2 nie trzyma narzędzia nieużywanego kodu w bramce, bo przebieg znalazł jedną martwą funkcję (już usuwaną w innym zadaniu), a utrzymanie narzędzia jest stałe.
  - Not chosen:
    - knip w bramce — nowa paczka, lista punktów startowych do dopisywania przy każdym nowym poleceniu serwera i skrypcie, budowanie kodu przed knipem, bo 96 plików testów importuje zbudowany kod; zysk: nowy nieużywany eksport zatrzymuje zmianę.
    - bez knipa w bramce plus jednorazowe usunięcie 13 zbędnych `export` — mała kosmetyka.
  - Source: doradca dnia w imieniu Mariusza, 2026-11-13: „4 b (knip poza bramką — przyjmuję Twoje odradzenie)”

## Context

- Dane przeglądu: notatka autora o przeglądzie fundamentu z 13.11.2026 — G-9; pozycje „architektura D2b”, „weryfikacja 4.4”, „propozycja 6 z dopisku (M24)” raportów z 12.11 — raport autora o architekturze loop2 (karta D2), weryfikacja autora tego raportu (punkt 4.4).
- Zadanie zmienia pliki widoku `scene.tsx`, `program-panel.tsx`, `rule-list.tsx` i `rule-panel.tsx`, więc nie idzie równolegle z zadaniami Drobne porządki kodu loop2 przed pierwszą mapą, zadanie autora o podziale sterownika widoku ani zadanie autora o sesji w prawdziwej przeglądarce (Mariusz przez doradcę dnia, 2026-11-13).
- Strona the way (reguła rozmiaru w szablonie wytycznych kodu, karta D2a) jest w zadaniu the way; przypięta wersja the way (`55afa8e`) nie ma w szablonie reguły rozmiaru.
- Nowsza wersja the way (`f749cfc`, jeszcze nieprzypięta w loop2; przesunięcie przypięcia niesie zadanie zadanie autora o przesunięciu przypięcia procesu) wymaga reguły `### Size of a function and a file` (WAY-360, WAY-361): rozmiar to liczba linii; decyzja produktu podaje próg funkcji i próg pliku, ustalone po próbie na istniejącym kodzie, oraz wyjątki z nazwy i powodem; test działa osobno od przebiegu lintera, wymienia przy porażce każdą funkcję i plik ponad progiem z rozmiarem, a jego konfiguracja listuje tylko wyjątki decyzji; kod ponad progiem spoza wyjątków oznacza niezmiennik jako naruszony (WAY-51). Zadanie idzie za tym kształtem, żeby po przesunięciu przypięcia nic nie trzeba było przerabiać.
- Osobny przebieg zamiast reguł w `eslint.config.mjs`: tamten zestaw ma jeden niezmiennik (`eslint-source-rules`), a test niezmiennika oznaczonego jako naruszony staje się oczekiwaną porażką — oznaczenie wspólnego zdjęłoby z bramki całe sprawdzanie lintera; nowa wersja the way wymaga przebiegu osobnego od lintera.
- Pomiar przy `fc00c406` (ESLint produktu z regułami rozmiaru, liczone linie kodu bez komentarzy i pustych): wynik w `.runs/coding/size-trial-summary.txt` repozytorium loop2, skrypt w `.runs/coding/size-trial-measure.mjs`.
  - funkcje w `src/`: ponad 100 linii — 18, ponad 150 — 9, ponad 200 — 7, ponad 300 — 6 (z 1425 funkcji);
  - funkcje ponad 150 w `src/`: `createGameView` 596 (`game-view.ts:220`), `RuleListView` 513 (`rule-list.tsx:213`), `accountRoutes` 408 (`account-routes.ts:371`), `startApp` 359 (`app.ts:157`), `Scene` 347 (`scene.tsx:550`), `RulePanelView` 338 (`rule-panel.tsx:209`), `ProgramPanelView` 296 (`program-panel.tsx:338`), `TripPlanView` 199 (`trip-plan.tsx:82`), `EndWindowView` 189 (`end-window.tsx:59`);
  - pliki w `src/`: ponad 500 linii kodu — 15, ponad 800 — 1 (`saved-game.ts`, 1119);
  - skrypty: żadna funkcja ponad 150, żaden plik ponad 800 (największy `scripts/restore-trial.mjs`, 517); testy: funkcje ponad 200 — 1 (`tests/transport.test.mjs:517`, 233), ponad 150 — 3, pliki ponad 800 — 19 (największy `tests/view/account-screen.test.mjs`, 5238).
- Ocena siedmiu funkcji ponad 150 linii przez agenta, który ich nie pisał: `.runs/coding/size-trial-verdict.md` repozytorium loop2 — warto dzielić `RuleListView` (przeciąganie reguł do osobnego hooka), `Scene` (stan sceny w jeden obiekt pamięci i jedną czystą funkcję kroku), `ProgramPanelView` (nagłówek przejścia z polem nazwy jako osobny komponent); na granicy `RulePanelView` (wyjąć `changed` i pole nazwy grupy); zostawić `accountRoutes`, `TripPlanView`, `EndWindowView` (ich długość to głównie funkcje zagnieżdżone). Testy tych komponentów sprawdzają je przez DOM, nie przez wnętrze.
- `Scene` (347 linii, złożoność 92 — najwyższa w kodzie) nie jest nazwana w raportach z 12.11; `scene.tsx` zmieniało od 12.11 kilka scaleń (efekty zatrzymania, wilk, obóz w Siedzibie, ostatnie `e05f7b2b`).
- Próbny przebieg knip 6.44.2 przy `fc00c406`, na kopii poza repozytorium (wyniki i konfiguracja próby w `.runs/coding/knip-trial-*` repozytorium loop2):
  - bez konfiguracji knip nie zna punktów wejścia (budowanie przez `scripts/build.mjs`, testy uruchamiane przez Pythona) i zgłasza 229 plików jako nieużywane — wynik bez wartości;
  - z punktami wejścia (strona, kitchen-sink, pięć poleceń serwera, skrypty, testy) i z importami testów z `dist/` przepisanymi na `src/` w kopii: 1 funkcja naprawdę martwa (`createTripPlan`, `trip-plan.tsx:325`, którą usuwa już zadanie Drobne porządki kodu loop2 przed pierwszą mapą), 13 eksportów i 39 typów oznaczonych `export`, choć używa ich tylko ich własny plik, 1 plik i 4 paczki zgłoszone fałszywie (`memory-limit-child.mjs` uruchamiany po ścieżce; `npm`, `prettier`, `typescript-compiler`, `jsdom` używane po ścieżce albo z Pythona);
  - w trybie samej aplikacji (bez testów): 45 eksportów, których używają tylko testy;
  - 96 plików testów `.mjs` importuje zbudowany kod z `dist/`, nie źródła; knip w bramce nie zobaczy przez to użyć z testów bez budowania przed nim i obejścia w konfiguracji, a import źródeł wprost wymagałby w testach ładowania plików `.tsx`, których Node sam nie uruchamia.
- Zestaw propozycji progów, podziałów i knipa przeczytał przed pokazaniem niezależny krytyk (13 uwag, wszystkie przyjęte; najważniejsza: kształt reguły z WAY-360 nowszej wersji the way).

## Questions carried to cycle

none

## Human actions

none

## Decisions in play

- D-29 — Which rules check TypeScript and JavaScript? „Every application, script and test TypeScript and JavaScript file of browser-view, simulation, account-server and build-tools passes local pinned ESLint 10.12.0 run with `--max-warnings 0` on `eslint.config.mjs`, which applies @eslint/js 10.0.1 `recommended` and, for TypeScript, typescript-eslint 8.71.2 flat `recommendedTypeChecked` unchanged, […] review, in place of a check of the effective configuration, keeps its rules to those sets and its file patterns to that scope. Changing the rule set takes a human-accepted change of this decision.” — zadanie go nie zmienia: reguła rozmiaru odpowiada na inne pytanie (jak duża może być funkcja i plik), działa poza `eslint.config.mjs` i jego zestawem; nowa decyzja mówi o tym w swoich *Relations*, żeby przegląd nie wziął drugiej konfiguracji za złamanie D-29.
- D-267 — What keeps the rules of hooks and of effects in the browser view's code? „No tool guards the rules of hooks and of effects: `guidelines/coding-browser-module.md` holds them, review keeps them, and they are that a Hook is called only at the top level of a function component or of a custom Hook, before any early return and never inside a loop, a condition, a nested function or a `try`/`catch`/`finally` block; that every reactive value an Effect's code uses is declared as a dependency; that an Effect connecting to a system outside React returns a cleanup function that disconnects from it; and that an Effect serves to synchronize with such a system, never to transform data for rendering or to handle a user event. […]” — wiąże podziały komponentów Reacta z To do 4, bez zmiany.

## Settlements to record

Candidates: 3 shown, 3 accepted — 2026-11-13

| # | Settlement | Kind | Source | What the cycle would otherwise guess |
|---|---|---|---|---|
| 1 | Funkcja ma najwyżej 200 linii kodu w całym kodzie objętym lintowaniem (aplikacja, skrypty, testy), a plik najwyżej 800 linii kodu w kodzie aplikacji i skryptach, liczone bez komentarzy i pustych linii, z wyjątkami `accountRoutes` (jedna funkcja rejestrująca trasy serwera) i `src/browser/sim/saved-game.ts` (granica zaufania w jednym pliku); reguła działa osobnym przebiegiem ESLint obok D-29. | decision | pytania „Jaki limit długości funkcji…”, „Jaki limit długości pliku…”, „Co z funkcjami ponad limitem…” (wybory człowieka, warianty niewybrane tam) | progi, zasięg kodu, miara (linie czy rozgałęzienia) i które funkcje są wyjątkami |
| 2 | Żadna funkcja i żaden plik objęte regułą rozmiaru nie przekraczają progów decyzji poza jej wyjątkami; niezmiennik oznaczony jako naruszony, dopóki `createGameView` i `startApp` stoją ponad progiem. | invariant | To do 2–3; pytanie „Co z funkcjami ponad limitem…” (wybór człowieka) | czy reguła ma test i czy wchodzi oznaczona jako naruszona, czy czeka |
| 3 | loop2 nie trzyma narzędzia nieużywanego kodu w bramce; przebieg knip z 13.11.2026 był jednorazowym przeglądem i znalazł jedną martwą funkcję. | decision | pytanie „Czy knip zostaje w bramce?” (wybór człowieka, warianty niewybrane tam) | czy dodać knip do bramki przy okazji tego albo następnego zadania |

## Out of scope

- Podział `createGameView` (zadanie zadanie autora o podziale sterownika widoku) oraz `startApp` i arkusza stylów (zadanie zadanie autora o przejściu widoku na React).
- Reguła rozmiaru w szablonie the way (zadanie the way).
- Usunięcie `createTripPlan` (zadanie Drobne porządki kodu loop2 przed pierwszą mapą).
