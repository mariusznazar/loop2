---
title: "loop2: test, który pilnuje, że części gry importują tylko z części dozwolonych w mapie"
status: draft
created: 2026-11-06T17:00
updated: 2026-11-08
tags: [zadanie]
related: "the project note of Loop"
---

# loop2: test, który pilnuje, że części gry importują tylko z części dozwolonych w mapie

Status: ready for cycle
Project relation: independent

## Description

### Need

- Mapa części loop2 (`foundations/part_map.md`) zapisuje przy każdej części, od których części wolno jej zależeć (*Depends on*), ale poza symulacją żaden test tego nie sprawdza.
- WAY-299 w przypiętej wersji the way (`294af7f`) wymaga od produktu, którego części importują kod z innych części, jednego niezmiennika granic z testem; produkt, który takie części już ma, zakłada je osobnym zadaniem — to jest to zadanie.
- Skan importów na `01b26d5` (2026-11-08) pokazuje, że kod gry w `src/` trzyma się mapy, a importy, których mapa nie dopuszcza, stoją w testach.
- Test symulacji `tests/sim/encounters.test.mjs:19` importuje plik widoku `terrain-picture.js`, choć symulacja ma `Depends on: none`; import wszedł 2026-10-29 z PR-em #38 i przeszedł niezauważony przez 18 kolejnych scaleń.
- 30 testów niezmienników symulacji (22) i widoku (8) importuje `tests/invariants/loop2_invariant_support.py`, który mapa daje części `build-tools`, a od niej żadna z tych dwóch części zależeć nie może.
- Test widoku `tests/invariants/test_browser_view_token_values.py:77` importuje funkcję `file_owners` z testu narzędzi budowania `tests/invariants/test_application_package_layout.py`.
- Odczuwa to agent kroku zwrotnego cyklu zadania, który dziś sam musi wypatrzyć import zza granicy, a przez niego Mariusz, gdy części zaczną się splatać; bez mechanicznej bramki przeniesienie cyklu na tańsze modele jest ryzykowniejsze.

### To do

1. `foundations/invariants.md` loop2 dostaje niezmiennik granic, którego wymaga WAY-299 (*Part* `every`, *Method* `test`), a zestaw testów loop2 — jego test, który czyta mapę części, przypisuje pliki do części przez `git check-attr` i czyta importy TypeScriptu, JavaScriptu i Pythona, jak ustalają odpowiedzi na pytania 1–3.
2. Mapa części dostaje część pomocników testów, do której przechodzi `tests/invariants/loop2_invariant_support.py`, bo służy testom kilku części (WAY-44).
3. Funkcja `file_owners` przechodzi z `tests/invariants/test_application_package_layout.py` do części pomocników testów, a test widoku `tests/invariants/test_browser_view_token_values.py` nie importuje już testu narzędzi budowania (pytanie 5).
4. Test symulacji `tests/sim/encounters.test.mjs` nie importuje widoku: przypadek z wiersza 148 sprawdza brak celu kroku w stanie symulacji (pytanie 4).
5. Zdanie niezmiennika `simulation-isolation` obejmuje kod symulacji poza `tests/` i nazywa wprost import pliku, pakietu i modułu (pytanie 6).
6. `guidelines/coding.md` i `guidelines/testing.md` wymieniają nową część pomocników testów w *Applies to*.

### Questions to settle

- 1. Po czym test rozpoznaje, że plik jest testem, skoro tylko test może importować z części pomocników testów?
  - Answer: a) Testem jest każdy plik śledzony przez git pod `tests/`, także pomocniki i podróbki (np. `tests/deploy/backup_script_support.py`, `tests/account-database-check-standin.mjs`); importować z części pomocników testów nie może kod spoza `tests/` — `src/`, `scripts/`, `deploy/` i reszta. Plik pod `tests/`, który testem nie jest, też może z niej importować; obsługuje testy, więc nic nie przecieka do produktu.
  - Not chosen:
    - b) Testem jest plik o nazwie testu z D-83 (`test_*.py`, `*.test.mjs`) — `tests/deploy/backup_script_support.py` od razu staje się naruszeniem do przepisania albo zaakceptowania, a każdy przyszły plik pomocniczy w `tests/` trafia na tę samą ścianę, bez dodatkowej ochrony.
    - c) Bez rozstrzygnięcia — szablon mapy części każe zadaniu, które pisze test, to ustalić.
  - Source: Mariusz, 2026-11-08: „a”, na pytanie „Wybierasz a) czy b)?”. Miejsca: `.the-way/elements/part-map/template.md:71-74` i `:100-102` @ `294af7f`; `tests/deploy/backup_script_support.py` importuje `loop2_invariant_support` @ `01b26d5`.
- 2. Czy uruchomienie pliku innej części jako procesu liczy się jak import?
  - Answer: a) Nie — test czyta tylko importy: w TypeScripcie i JavaScripcie `import`/`export … from` i `import()` z literałem, w Pythonie `import`/`from` i katalog dopisany do `sys.path`. Uruchomienia procesów zostają pod okiem agenta kroku zwrotnego; proces innej części uruchomiony z testu przechodzi bez bramki.
  - Not chosen:
    - b) Importy plus uruchomienie pliku śledzonego przez git jako procesu (`node <plik>`, `python <plik>`, `spawn`/`subprocess` z dosłowną ścieżką) — trzeba od razu rozstrzygnąć uruchomienie `scripts/test-node-file.mjs` z `tests/view/memory-limit.test.mjs:10`; zgadywanie z list argumentów w dwóch językach, które i tak gubi ścieżki składane przez pomocnika (`copy.file("dist/server/main.js")`) i trafia fałszywie w teksty przykładowe (treść Dockerfile w `tests/invariants/test_account_save_sqlite_upgrade.py:97`).
  - Source: Mariusz, 2026-11-08: „a”, na pytanie „Wybierasz a) czy b)?”. Miejsca: WAY-299 (`.the-way/foundations/decisions.md:9179`) i `cross-part-imports` (`.the-way/foundations/invariants.md:308`) @ `294af7f`; `tests/view/memory-limit.test.mjs:10` @ `01b26d5`.
- 3. Które języki i formy importu test czyta i co robi z importem względnym, którego nie umie dopasować do pliku śledzonego przez git?
  - Answer: A1 i B1. Test czyta importy TypeScriptu, JavaScriptu i Pythona (formy z odpowiedzi na pytanie 2), bez HTML i CSS. Import pakietu i modułu spoza repozytorium nie jest plikiem żadnej części. Import względny, którego test nie dopasuje do pliku śledzonego przez git, oblewa test z nazwą pliku i wierszem; import zbudowanego pliku (`dist/…​.js`) test dopasowuje do jego źródła `.ts` albo `.tsx` w `src/`, a czyta kod, nie napisy.
  - Not chosen:
    - A2) Także HTML i CSS — test powielałby przekład adresów strony na pliki źródłowe ze skryptu budowania i psułby się z każdą jego zmianą, a dziś niczego by nie złapał, bo wszystkie pliki HTML i CSS i to, do czego się odwołują, należą do widoku.
    - B2) Niedopasowany import test pomija — cicha dziura: każdy import przez `dist/` do pliku `.tsx` przechodziłby niesprawdzony, a tą drogą przyszedł import widoku w teście symulacji.
  - Source: Mariusz, 2026-11-08: „A1 i B1 jak polecasz”, na pytanie „Wybierasz A1 czy A2 oraz B1 czy B2?”. Miejsca: `.the-way/elements/part-map/template.md:100` @ `294af7f`; `src/browser/index.html`, `src/browser/tokens.css:84`, `src/browser/styles.css:668`, `tests/sim/rules.test.mjs:271-273` @ `01b26d5`.
- 4. Co z importem widoku w teście symulacji?
  - Answer: a) Poprawić test: przypadek „an action ending in attack minute lands, while an interrupted move leaves no target or later movement” (`tests/sim/encounters.test.mjs:148`) sprawdza, że w stanie po ataku nie ma `run.current.stepTo`, zamiast pytać rysunek widoku, i nie importuje widoku. Przyczyną zmiany testu jest mapa części, która symulacji zależeć od widoku nie pozwala; rysowanie celu kroku tylko w trakcie ruchu sprawdza dalej `tests/view/terrain-picture.test.mjs:195`.
  - Not chosen:
    - b) Przenieść asercję do testu widoku, który sam uruchamia symulację — jeden przypadek rozjeżdża się na dwa pliki, a test widoku przygotowuje stan walki, który dziś zna tylko test symulacji.
    - c) Zostawić import i zapisać niezmiennik „the part `simulation` does not depend on `browser-view`” jako naruszony — trwały wpis o naruszeniu i stała spodziewana porażka dla jednej asercji, którą da się wyrazić bez widoku.
  - Source: Mariusz, 2026-11-08: „a”, na pytanie „Wybierasz a), b) czy c)?”. Miejsca: `tests/sim/encounters.test.mjs:148-180`, `src/browser/view/terrain-picture.ts:119`, `tests/view/terrain-picture.test.mjs:195` @ `01b26d5`.
- 5. Co z importem `file_owners` z testu narzędzi budowania w teście widoku?
  - Answer: a) `file_owners` przechodzi do części pomocników testów, obok `loop2_invariant_support.py`; importują ją stamtąd test widoku `test_browser_view_token_values.py`, test narzędzi budowania `test_application_package_layout.py` i nowy test granic, więc czytanie mapy części ma jedno miejsce.
  - Not chosen:
    - b) Skopiować funkcję do testu widoku — to samo czytanie mapy w trzech plikach; przy zmianie formy mapy jeden się rozjedzie, najpewniej po cichu.
    - c) Zapisać niezmiennik „the part `browser-view` does not depend on `build-tools`” jako naruszony — trwały wpis i spodziewana porażka, a wspólny test przepuszczałby każdy import widoku z `build-tools`, nie tylko ten jeden.
  - Source: Mariusz, 2026-11-08: „a”, na pytanie „Wybierasz a), b) czy c)?”. Miejsca: `tests/invariants/test_browser_view_token_values.py:77`, `tests/invariants/test_application_package_layout.py:23` @ `01b26d5`.
- 6. Co dzieje się z niezmiennikiem `simulation-isolation`?
  - Answer: a) Zdanie zawęża się do kodu symulacji i nazywa wprost to, co jego test sprawdza: „No file of the simulation outside `tests/` imports a file, a package or a module from outside the simulation, or uses the page, a timer, the system time or a global object that the browser or Node.js adds to those of the JavaScript language.” Test zostaje bez zmian; import pliku innej części przez kod symulacji pilnują odtąd dwa niezmienniki.
  - Not chosen:
    - b) Bez zmian — zdanie dalej nie pasuje do testu i do mapy, a po scaleniu dwa wpisy fundamentu mówią o tym samym imporcie co innego (testy symulacji importujące z części pomocników testów).
    - c) Zawęzić do kodu i usunąć import plików, zostawiając zakaz pakietów, modułów i obiektów hosta — większa przeróbka; test `simulation-isolation` z natury odrzuca każdy import spoza `dist/browser/sim/`, więc musiałby zmienić to, co sprawdza, albo sprawdzałby więcej, niż mówi zdanie.
  - Source: Mariusz, 2026-11-08: „a, brzmienie zostaje”, na pytanie „Wybierasz a), b) czy c)? Jeśli a), czy proponowane brzmienie zostaje?”. Miejsca: `foundations/invariants.md:214-224`, `tests/invariants/test_simulation_isolation.py:1-14` @ `01b26d5`.

## Context

- Skan: jednorazowy skrypt `a one-off script in the author's scratchpad, outside the repository` (poza repo), uruchomiony na `01b26d5` 2026-11-08; przypisuje pliki do części przez `git check-attr` i czyta importy TypeScriptu, JavaScriptu, Pythona oraz odwołania w HTML.
- Od skanu z 2026-11-06 (`18fca47`) test symulacji stracił import `status-row.js`; zostaje `terrain-picture.js`.
- Importy dozwolone dziś przez *Depends on*: `browser-view` → `simulation` (283), `deployment` → `build-tools` (13), `account-server` → `build-tools` (5), `build-tools` → `account-server` (1).
- Skan nie dopasował 43 odwołań względnych, m.in. importów `../../dist/browser/view/*.js` w `tests/view/`, których źródłem jest plik `.tsx`, adresów strony w `src/browser/index.html` (`/main.js`) i tekstów przykładowego kodu w `tests/sim/rules.test.mjs:271-273`.
- Przypisanie plików do części przez `git check-attr` ma już loop2: `file_owners` w `tests/invariants/test_application_package_layout.py:23`.
- `tests/invariants/test_simulation_isolation.py` czyta jako pliki symulacji tylko `src/browser/sim/` i zabrania im importu pakietu i modułu `node:`, więc nie widzi `tests/sim/`.
- Rysowanie celu kroku przez widok (`src/browser/view/terrain-picture.ts:119`, z `run.current.stepTo`) sprawdza test widoku `tests/view/terrain-picture.test.mjs:195`.
- Test widoku `tests/view/memory-limit.test.mjs:10` uruchamia jako proces `scripts/test-node-file.mjs` części `build-tools`.
- `tests/invariants/program_fixture.py` (symulacja) importuje też test widoku `test_terrain_drawing_numbers.py` — dozwolone, bo widok zależy od symulacji.
- `tests/invariants/account_container_support.py` (`build-tools`) importują tylko testy części `deployment`, która od `build-tools` zależeć może; nie służy testom kilku części.
- `tests/deploy/backup_script_support.py` (`deployment`) importuje `loop2_invariant_support.py`, a sam nie jest plikiem testu z nazwy.
- Wzór w the way: niezmiennik `cross-part-imports` w `.the-way/foundations/invariants.md:308` i jego test `.the-way/elements/part-map/test_cross_part_imports.py`; liczy jak import także uruchomienie pliku przez `runpy`, `exec` albo nowy proces interpretera.
- Reguła w szablonie mapy części: `.the-way/elements/part-map/template.md:88-115` (sekcja „Allowed dependencies”) i `:71-74` (pliki służące testom kilku części).
- Powiązane zadanie the way, scalone przed tym: `the related task note of the process repository in the author's private backlog`.

## Questions carried to cycle

none

## Human actions

none

## Decisions in play

- WAY-299 (the way, `.the-way/foundations/decisions.md:9179` @ `294af7f`): „A product whose parts import code from other parts holds one invariant, whose test in the product's suite reads the part map and the imports of the product's own languages, that a file of a part imports only files of its own part, of the parts its part's *Depends on* names, of a part of test helpers where the importing file is a test (WAY-44), and of a part that an invariant "the part `<X>` does not depend on `<Y>`" reading `Violated: yes` says part X depends on today. The product writes that invariant and its test in the change that brings into its map a second part holding such code, and a product that already holds such parts writes them in a task of its own. Each invariant "the part `<X>` does not depend on `<Y>`" that the shared invariant lets an import pass by is a whole entry of the foundation that a human accepted, and no list of known violations.”
- WAY-44 (the way, `.the-way/foundations/decisions.md:1082` @ `294af7f`), fragment: „Tests belong to the part they test and generated files to the part of their generator; the files that serve the whole repository — the lockfile and the build configuration — are a part of their own; the files that serve the tests of several parts are another, which its sentence describes as such with no field of its own, and which the tests of every part may import while code that is no test may not; […]”
- D-04 (`foundations/decisions.md`), *Verification* `invariants: simulation-isolation · simulation-inputs`: „The game is written in TypeScript and runs in the browser. Its simulation is a set of pure functions, of which those that pass game time take a game state and a span of game minutes and return the next game state together with the events it produced, and real time enters the simulation only as an argument. The browser view draws the game only from the game state, the game's content data, the moment of the browser's clock, which it reads and passes to the simulation, and, for the scene and the chronicle, its previous reading of the game state and the events the simulation returned, and changes the game state only through functions of the simulation, to which it passes the player's choices, the passing of real time and a saved game state the browser downloaded from the server or kept in the page's memory after a save found no session (D-211).”
- D-83 (`foundations/decisions.md`): „Tests keep Node and Python, their existing directories, and the names `*.test.mjs` and `test_*.py`. Every `*.test.mjs` file under `tests/` is selected by `npm test`, and a new `test_*.py` file is counted as covered by the gate only after its execution there is verified.”

## Settlements to record

Candidates: 6 shown, 3 accepted — 2026-11-08

| # | Settlement | Kind | Source | What the cycle would otherwise guess |
|---|---|---|---|---|
| 1 | loop2 pilnuje *Depends on* jednym niezmiennikiem granic, którego test liczy jako test każdy plik pod `tests/`, czyta importy TypeScriptu, JavaScriptu i Pythona (z `import()` z literałem i katalogiem dopisanym do `sys.path`), a nie uruchomienia procesów ani HTML i CSS, i oblewa na imporcie względnym, którego nie dopasuje do pliku śledzonego przez git. | decision | odpowiedzi na pytania 1 (a), 2 (a) i 3 (A1, B1) pod *Questions to settle*, z ich *Not chosen* | po czym rozpoznać test; czy liczyć uruchomienia procesów, HTML i CSS; czy niedopasowany import pominąć; które warianty trafiają do *Rejected* |
| 2 | Żaden plik części loop2 nie importuje pliku innej części, chyba że *Depends on* jego części ją wymienia, importujący plik leży pod `tests/`, a importowany należy do części pomocników testów, albo niezmiennik „the part `<X>` does not depend on `<Y>`” oznaczony `Violated: yes` mówi, że część importującego pliku dziś zależy od części importowanego. | invariant | WAY-299; odpowiedzi na pytania 1–3 pod *Questions to settle* | zdanie niezmiennika, jego *Part* (`every`) i co znaczy „test” w wyjątku dla pomocników |
| 3 | Zdanie `simulation-isolation` brzmi: „No file of the simulation outside `tests/` imports a file, a package or a module from outside the simulation, or uses the page, a timer, the system time or a global object that the browser or Node.js adds to those of the JavaScript language.” | invariant | odpowiedź na pytanie 6 (a) pod *Questions to settle* | czy i jak zmienić stare zdanie, które po scaleniu kłóci się z nowym niezmiennikiem |

## Out of scope

none
