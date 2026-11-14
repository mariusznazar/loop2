---
title: Drobne porządki kodu loop2 przed pierwszą mapą
status: draft
created: 2026-11-13
updated: 2026-11-13
tags: [zadanie]
related: ["the project's folder note"]
---

# Drobne porządki kodu loop2 przed pierwszą mapą

Status: ready for cycle
Project relation: independent

## Description

### Need

- Zadanie 9 MVP2 dodaje nową pierwszą mapę, Skraj lasu; 33 pliki testów biorą dziś mapę jako pierwszą w danych gry, więc jeśli Skraj lasu stanie na początku danych, te pliki zaczną padać, a agent zadania 9 będzie naprawiał testy niezwiązane ze swoją zmianą.
- Przy okazji ten sam przegląd architektury znalazł w kodzie drobne pozostałości i przecieki, które kosztują każdą następną zmianę widoku: funkcje bez użytkownika w grze, parametr, którego nikt nie czyta, wspólną kontrolkę znającą reguły swoich użytkowników, moduł o nazwie, która przestała być prawdą, i pomocniki testów kopiowane z pliku do pliku.
- Czystości symulacji pilnuje dziś tylko test w Pythonie, który w bramce przychodzi po kilkunastu minutach; kompilator mógłby zgłaszać ten sam rodzaj błędu w kilka sekund.

### To do

1. Każdy test, który dziś wybiera mapę, przedmiot, zasób albo archetyp po jego miejscu w danych gry (`Object.entries(MAPS)[0]`, `Object.keys(MAPS)[1]`, `const [mapId] = Object.keys(MAPS)`, `Object.keys(ITEMS)` rozpakowane po pozycji i warianty), wybiera go po jawnym identyfikatorze wpisu, którego dotyczy.
2. Reguła „Test inputs and expected values” w `guidelines/testing.md` zyskuje na końcu akapitu zdanie i w polu *Bad* przykład w brzmieniu z pytania 3, jak daje sekcja „Writing the file” szablonu `.the-way/product-guidelines/testing/template.md`.
3. Z kodu gry znikają `createTripPlan`, `createRuleList` i `createRulePanel`, a test, który dziś woła dwie ostatnie, rysuje te części ekranu przez komponenty, których używa gra.
4. Z wyboru reguły programu w symulacji znika parametr z mapą, którego żadna funkcja nie czyta (`_map`).
5. Wspólna kontrolka liczby nie importuje reguł swoich użytkowników: regułę przyjmowanej liczby dostaje od ekranu, który jej używa, zamiast wybierać ją parametrem `rule="trip"`.
6. Moduł i komponent `right-area` nosi nazwę, która mówi, czym jest dziś (obszar pod rysunkiem ekranu przejścia z zakładkami „Kronika” i „Teren”), a wytyczne, które go wymieniają, mówią nową nazwę.
7. Pomocniki testów widoku `press` i `fire` stoją w jednym wspólnym miejscu, a pliki testów importują je zamiast trzymać własne kopie.
8. Sprawdzenie typów (`npm run typecheck`) i budowanie (`npm run build`) sprawdzają symulację osobno, bez biblioteki przeglądarki i bez typów Node.js, tak że użycie w niej strony, timera, `console` albo innej nazwy spoza języka JavaScript jest błędem kompilacji.

### Acceptance criteria

- Nic, co widzi gracz, się nie zmienia — także pole liczby na liście wyprawy przyjmuje i odrzuca te same wpisy z tym samym komunikatem co dziś (D-181).
- Testy przechodzą bez zmiany niezależnie od tego, w którym miejscu danych gry stanie nowa mapa albo nowy przedmiot.

### Questions to settle

1. Czy `actionFeasible` zostaje?
   - Answer: zostaje; testy dalej jej używają.
   - Not chosen:
     - usunąć ją — przepisanie siedmiu plików testów na inną funkcję publiczną symulacji, zadanie rośnie, a testy tracą najprostszy punkt obserwacji, czy czynność jest dozwolona.
   - Source: Mariusz, 2026-11-13, „1a” — na pytanie z dwiema drogami: (a) zostaje, (b) usunąć i przepisać siedem plików testów.
2. Czy po dodaniu sprawdzenia kompilatorem skrócić test w Pythonie pilnujący izolacji symulacji?
   - Answer: test zostaje w całości; sprawdzenie kompilatorem dochodzi obok niego.
   - Not chosen:
     - wyciąć z testu część skanu źródeł, którą przejmuje kompilator — krótszy test, ale trzeba go rozciąć precyzyjnie, by nie zgubić zegara systemowego i importów, zmienia się to, czym test sprawdza niezmiennik `simulation-isolation`, zadanie rośnie i pojawia się ryzyko luki.
   - Source: Mariusz, 2026-11-13, „2a” — na pytanie z dwiema drogami: (a) test zostaje w całości, kompilator dochodzi obok, (b) wyciąć z testu część, którą przejmuje kompilator.
3. Jak brzmi w regule „Test inputs and expected values” zasada wyboru danych testu?
   - Answer: zdanie na końcu akapitu: „Dane gry, których dotyczy test — mapę, przedmiot, stworzenie — wybieraj po identyfikatorze, nigdy po miejscu w danych gry, bo nowy wpis w danych nie może zmienić tego, czego test dotyczy.”; w polu *Bad*: „Przypadek bierze pierwszą mapę z danych gry przez `Object.entries(MAPS)[0]` i nazywa ją `forest`.” Reguła dalej cytuje D-73 · D-74; zdanie stosuje jej istniejący wymóg jawnych danych wejściowych, więc nie potrzebuje decyzji.
   - Not chosen:
     - samo zdanie, bez przykładu w *Bad* — recenzent ma mniej do porównania.
   - Source: Mariusz, 2026-11-13, „2a” — na propozycję tego zdania i przykładu z drogami: (a) oba, (b) samo zdanie, (c) inne brzmienie.
4. Czy porządek wyboru po identyfikatorze obejmuje też przedmioty, zasoby i archetypy brane po kolejności, nie tylko mapy?
   - Answer: tak — także `tests/sim/conditions.test.mjs:30`, `tests/sim/traits.test.mjs:86` i `tests/sim/rules.test.mjs:341-342`.
   - Not chosen:
     - tylko mapy — zadanie zostaje przy Skraju lasu, ale istniejące testy łamią przyjęte zdanie wytycznych od pierwszego dnia i wywrócą się przy pierwszym nowym przedmiocie na początku danych.
   - Source: Mariusz, 2026-11-13, „przyjmuję zgodnie z Twoimi rekomendacjami” — na pytanie z drogami: (a) tak, (b) tylko mapy.

## Context

- Źródło: karty D1 i D21 oraz wiersze D14, D15 i D16 tabeli działań w `the note of the architecture analysis, in the author's private notes` (sekcja 3; ustalenia P4, P6 i „Testy” w sekcji 2), mierzone na commicie `7846213c`; weryfikacja w `weryfikacja_architektura_loop2.md` obok.
- Mariusz przyjął te pięć działań jako jedno zadanie w sprawie 4 (`the note of the author's rulings on the analysis, in the author's private notes`, „Sprawa 4”, 2026-11-13); zadanie 9 MVP2 (`pierwsza_mapa_bez_loterii_loop2.md`) czeka na to zadanie przez `⛔ loop2-porzadki-przed-pierwsza-mapa`.
- Stan sprawdzony na commicie `2b4d760c`: 34 trafienia `Object.(entries|keys|values)(MAPS)[0]` w 33 plikach `tests/`, np. `tests/sim/campfire.test.mjs`, `tests/sim/acceptance.test.mjs:28`; poza nimi mapę po miejscu w danych biorą `tests/sim/completion.test.mjs:29` (`const [mapId] = Object.keys(MAPS)`) i `tests/view/scene-picture.test.mjs:874` (druga mapa, `Object.keys(MAPS)[1]`) — raport ich nie liczył.
- Test akceptacyjny symulacji sprawdza dziś, że pierwsza mapa danych to Las (`tests/sim/acceptance.test.mjs:103-104`); po zmianie sprawdza mapę, którą wybiera po identyfikatorze.
- Kolejność listy ekranu Mapy i listy map do wysłania postaci idzie za kolejnością danych (`src/browser/view/map-lines.ts:15`); to sprawa zadania 9, nie tego zadania.
- `createTripPlan` (`src/browser/view/trip-plan.tsx:325`) nie ma użytkownika ani w grze, ani w testach; `createRuleList` (`rule-list.tsx:774`) i `createRulePanel` (`rule-panel.tsx:593`) woła tylko `tests/view/rule-editor.test.mjs`; `styles.css:2665` i komentarze w `rule-list.tsx:10`, `rule-panel.tsx:14`, `trip-plan.tsx:10` o nich wspominają.
- `actionFeasible` (`src/browser/sim/program.ts:383`) woła sześć plików `tests/sim/` i `tests/invariants/test_simulation_inputs.py`, nikt w `src/`.
- `_map` stoi w `src/browser/sim/program.ts:203` i `:293`.
- Kontrolka liczby: `src/browser/view/controls/react-number-field.tsx:14-15` importuje `program-editor.ts` i `trip-editor.ts`, a `rule?: "trip"` (`:34`) wybiera między nimi; `rule="trip"` podaje tylko `trip-plan.tsx:253`. Postać DOM tej kontrolki (`number-field.ts`) reguły wyprawy nie zna.
- `right-area` występuje w `src/browser/view/right-area.tsx` (komentarz `:3-4` tłumaczy starą nazwę), `run-screen.tsx:40`, `:194`, `tests/view/right-area.test.mjs`, `guidelines/coding-browser-module.md:59` i `guidelines/styleguide-browser-view.md:811`.
- `press` jest zdefiniowana w 13 plikach `tests/view/`, `fire` w 11 (`fire` w `chronicle-entries.test.mjs:33` to inna, lokalna nazwa grupy programu); w 9 plikach obie są dosłownie takie same, a cztery pliki mają odmiany (`program-list` i `rule-editor` — `press` bez `fire`; `run-screen` — z oknem jako parametrem; `uncaught-failure` — `async`).
- `draw` (6 plików) i `mount` (5 plików) nie są kopiami: każda rysuje inny komponent z innymi właściwościami i wspólny mają tylko początek (kontener i korzeń Reacta), dlatego punkt 7 ich nie obejmuje — inaczej niż wiersz D16 raportu.
- Jedynym wspólnym modułem testów ekranów w React jest dziś `tests/view/page-document.mjs` (243 linie; D-264, D-268).
- Konfiguracje kompilatora: `tsconfig.browser.json` (`"lib": ["ES2022", "DOM"]`, `"rootDir": "src/browser"`) obejmuje dziś też `src/browser/sim/`; `scripts/build.mjs:19` sprawdza w pętli `tsconfig.browser.json` i `tsconfig.server.json`, a `npm run typecheck` to `node scripts/build.mjs --check`.
- Próba raportu na kopii commitu `7846213c`: osobna konfiguracja samych plików `src/browser/sim/` z `"lib": ["ES2022"]`, `"types": []` przechodzi na obecnym kodzie, a dopisane `document`, `setTimeout`, `console` i `structuredClone` dają cztery błędy (`architektura_loop2.md`, karta D21).
- Kompilator nie zastąpi całego testu izolacji: nie odrzuci `Date.now()` ani `new Date()` (typ `Date` należy do języka) i nie odrzuci importu pakietu, który ma własne typy; test w Pythonie (`tests/invariants/test_simulation_isolation.py`) ma część statyczną (skan źródeł) i część uruchamiającą zbudowaną symulację w odciętym środowisku.
- Zdanie do wytycznych testów ustalono bez przeglądu wszystkich poziomów testów, którego `the-way-maintain-testing-guidelines` wymaga przy każdym odświeżeniu wytycznych: Mariusz wybrał 2026-11-13 („1a” na pytanie: (a) samo zdanie bez przeglądu testów, (b) pełna procedura z przeglądem i krytyką) samo ustalenie brzmienia, bo zdanie doprecyzowuje istniejącą regułę („Zapisuj jawnie dane, których dotyczy sprawdzenie”, `guidelines/testing.md:113`), a przegląd ponad 2100 testów dałby kilka godzin pracy i uwagi niezwiązane z zadaniem. To sygnał dla procesu: zmiana o jedno zdanie nie powinna uruchamiać przeglądu całości.
- Nowy plik konfiguracji kompilatora nie należy dziś do żadnej części mapy części (`foundations/part_map.md`, część `build-tools` wymienia pliki `tsconfig.*.json` z nazwy).

## Questions carried to cycle

- Nowa nazwa modułu i komponentu `right-area`.
- Wspólne miejsce `press` i `fire`: `tests/view/page-document.mjs` czy osobny moduł obok niego, i jedna postać `press` dla czterech odmian.

## Human actions

none

## Decisions in play

- D-04 (fragment): „Its simulation is a set of pure functions, of which those that pass game time take a game state and a span of game minutes and return the next game state together with the events it produced, and real time enters the simulation only as an argument.” *Verification:* „invariants: simulation-isolation · simulation-inputs”.
- D-06: „The browser and server share one npm package and lockfile, and have separate TypeScript compilation configurations and output directories. Building the application compiles both configurations and bundles the browser's code, React included, into the files the server hands out.” *Rationale* (fragment): „The simulation is browser code, compiled by the browser's configuration and held in the shared package.” **Zmiana przez to zadanie (To do 8, pytanie 2):** budowanie i sprawdzanie typów uruchamiają poza konfiguracjami przeglądarki i serwera trzecią, tylko sprawdzającą symulację, więc „both configurations” przestaje być prawdą.
- D-73: „Loop2 adopts the testing-guideline template of its pinned the-way in full, with only the departures of D-74, D-75, D-76, D-77, D-78, D-79, D-82, D-163, D-235 and D-273. Its testing rules and the recipes of its levels stand in `guidelines/testing.md`, read before writing or changing a test.”
- D-181 (fragment): „A position's count is a safe integer from 1 up — at most 9007199254740991, the largest integer a saved game state holds exactly — […]; an invalid entry keeps the previous count in the position and stays visible in the field, whose frame and message „Wpisz liczbę całkowitą od 1.” below it take the role `warning` until the player enters a valid count.”
- D-264: „A test of a screen built with React runs on jsdom, a development dependency pinned exactly, and only the test files of such screens leave their stand-ins for the document. One harness, `tests/view/page-document.mjs`, carries those files: it is imported before React loads, gives each case a fresh window, moves focus away from a control that becomes disabled, awaits React's work through `act`, types through the input's native value setter and a bubbling `input` event, and fails a case on a report of React's development build through `console.error`.”
- D-265 (fragment): „Until its last screen in the browser's DOM APIs moves to React, a shared control that a React screen uses has two forms in `src/browser/view/controls/`, a React component and a DOM function, drawing one tree of DOM elements with the same classes and attributes […]. A test draws both forms for each kind and state the React screens use and compares their tag, attributes and text […].”
- D-268 (fragment): „A test file under `tests/` loads a document imitation only through the harness `tests/view/page-document.mjs`, takes from it an `assert` that builds no message of Node's and puts no value on its error, never `node:assert`, […].”
- Niezmiennik `simulation-isolation`: „No file of the simulation outside `tests/` imports a file, a package or a module from outside the simulation, or uses the page, a timer, the system time or a global object that the browser or Node.js adds to those of the JavaScript language.” (*Method:* test; *Derives from:* D-04)

## Settlements to record

Candidates: 8 shown, 4 accepted — 2026-11-13

| # | Settlement | Kind | Source | What the cycle would otherwise guess |
|---|---|---|---|---|
| 1 | Czystości symulacji pilnują razem kompilator — osobna konfiguracja symulacji z samą biblioteką języka JavaScript, bez biblioteki przeglądarki i bez typów Node.js — i test izolacji symulacji, który zostaje w całości. | decision | pytanie 2 (z *Not chosen*); druga droga nie wybrana: przeniesienie symulacji do własnego katalogu z własną konfiguracją — Mariusz odrzucił ją w sprawie 4 (`rozstrzygniecia_mariusza.md`, „Sprawa 4”, 2026-11-13: „A11 — odrzucone — zastąpione przez A21”); koszt z karty D11 `architektura_loop2.md`: zmiana ścieżki symulacji w testach, wytycznych, fundamencie i konfiguracji oraz przebudowa budowania, dla korzyści, którą osobna konfiguracja daje bez przeprowadzki; przeprowadzka miałaby sens, gdyby serwer miał liczyć grę, a D-07 mówi, że serwer „computes nothing of the game” | czy nowa konfiguracja to szczegół budowania bez wpisu; czy następna zmiana może skrócić test izolacji albo przenieść symulację |
| 2 | Funkcja symulacji `actionFeasible` zostaje, choć gra jej nie woła: testy używają jej jako punktu obserwacji, czy czynność jest dozwolona. | decision | pytanie 1 (z *Not chosen*) | czy funkcja publiczna wołana tylko przez testy jest pozostałością do usunięcia — dla tego cyklu i dla następnych porządków |
| 3 | Konfiguracja kompilatora symulacji obejmuje wszystkie pliki `src/browser/sim/`, ma bibliotekę samego języka JavaScript i pustą listę typów, a sprawdzanie typów i budowanie ją uruchamiają. | invariant | To do 8; wiersz 1; Mariusz, 2026-11-13, „przyjmuję zgodnie z Twoimi rekomendacjami” | czy pilnować, żeby dopisanie biblioteki przeglądarki do tej konfiguracji albo wyjęcie jej z budowania nie wyłączyło sprawdzenia po cichu |
| 4 | Wspólna kontrolka z `src/browser/view/controls/` nie importuje modułów ekranów, które jej używają; regułę właściwą jednemu ekranowi dostaje od tego ekranu. | decision | To do 5; `architektura_loop2.md`, sekcja 2.3 P6 i wiersz D15; Mariusz, 2026-11-13, „przyjmuję zgodnie z Twoimi rekomendacjami” | czy reguła wartości przechodzi przez funkcję podaną przez ekran, czy kontrolka dostaje kolejną wartość parametru `rule` przy następnym użytkowniku |

## Out of scope

- Miejsce Skraju lasu w danych map i kolejność listy ekranu Mapy — zadanie 9 MVP2.
- 211 dosłownych wystąpień `"forest"` w 61 plikach testów — wybierają mapę po identyfikatorze już dziś.