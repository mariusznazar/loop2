---
title: Testy mutacyjne i uruchamianie jednego pliku testu w loop2
status: accepted
created: 2026-10-26
updated: 2026-10-26
tags: []
related: ["[[(P) Loop]]"]
---

# Testy mutacyjne i uruchamianie jednego pliku testu w loop2

Status: ready for cycle
Project relation: independent

## Description

### Need

- Przypięty the-way (`574a37b`) wymaga w przewodniku testów reguły testów mutacyjnych (WAY-252, WAY-253, WAY-254); `guidelines/testing.md` loop2 jej nie ma.
- Krok zmiany the-way każe autorowi uruchamiać testy swojej zmiany, a pełnego przebiegu zabrania (`.the-way/task-cycle/change/SKILL.md:92-93`); bramka `npm test` loop2 nie umie się zawęzić (D-77), więc autor improwizuje polecenia narzędzi, których przewodnik nie może podać (WAY-241).
- Pełne `npm test` na `main` 25.10.2026 trwało 770 s, z czego testy Node 2 s, a resztę testy Pythona (pomiar Mariusza).

### To do

1. Dodać do loop2 narzędzie mutacyjne StrykerJS dla części `simulation`, bez dodatku sprawdzającego typy (Q1, Q1a, Q2): zależności deweloperskie w dokładnych wersjach z plikiem blokady i konfiguracja, przy której przebieg na wskazanych plikach `src/browser/sim/` kończy się kodem 0 i wypisuje ocalałe kopie z plikiem i linią. Audyt zależności (D-33) ma przechodzić; nowe ostrzeżenia, które wnosi StrykerJS, usuwa się poprawionymi wersjami (Context).
2. Pliki tymczasowe i raporty StrykerJS nie trafiają do gita, a jego kopia robocza pomija `.runs/`, `.the-way/` i `dist/`.
3. Dopisać do `guidelines/testing.md`, według `.the-way/product-guidelines/testing/template.md`, regułę `### Mutation testing` między `### AI in tests` a `### Flaky tests`. Jej *Decision* to D-73 i decyzje z wierszy 1 i 2 *Settlements to record*, a *Invariant* to `none`, jak każe szablon. W treści reguły stoi polecenie, którym recenzent uruchamia narzędzie na zmienionych plikach `simulation` (WAY-254). Reguła mówi też, że w pozostałych częściach autor sprawdza testy w głowie (WAY-253).
4. Zmienić bramkę `npm test` według Q3: bez argumentu pełny przebieg jak dziś; z jednym plikiem testu Node lub Pythona tylko ten plik.
5. Zaktualizować `guidelines/testing.md` pod zawężenie: pole *Command* trzech przepisów (`unit test`, `integration test`, `smoke test`) podaje bramkę i jej zawężenie do pliku (WAY-241); regułę `### Test files in the gate` dostosować do nowego kształtu bramki i dopisać do jej *Invariant* niezmienniki z wierszy 4 i 5 *Settlements to record*; zdanie w `## When to read` o odstępstwach zgodne ze stanem po rewizji D-77.
6. Przepisać test niezmiennika `node-test-selection` (`tests/quality/test_node_test_selection.py`) pod nowy kształt bramki, tak by nadal sprawdzał, że każdy plik `*.test.mjs` pod `tests/` wchodzi do pełnego `npm test`.
7. Napisać testy niezmienników z wierszy 4 i 5 *Settlements to record*, każdy widziany raz z porażką (WAY-08).
8. Przypisać przez `the-way-update-part-map` nowe śledzone pliki (konfiguracja StrykerJS, skrypt bramki) do części `build-tools`.
9. Dopisać nowe pliki do `## Where in code` w `guidelines/testing.md`.

### Acceptance criteria

- `npm test` bez argumentu uruchamia te same testy co przed zmianą, łącznie z kontrolą fundamentu.

### Questions to settle

- Q1. Czy loop2 przyjmuje narzędzie mutacyjne StrykerJS dla części `simulation`, czy odstępuje od reguły testów mutacyjnych z podanym powodem?
  - Answer: przyjmuje StrykerJS (droga A), z obawą, że jego pakiety prędzej czy później dadzą ostrzeżenia bezpieczeństwa i narzędzie trzeba będzie usunąć. Warunek wycofania: gdy audyt zależności zgłosi ostrzeżenie w pakiecie, który wnosi StrykerJS, i nie da się go usunąć poprawioną wersją, narzędzie usuwamy z repozytorium, a reguła wraca do sprawdzania w głowie autora.
  - Source: Mariusz, 2026-10-26, po przedstawieniu kosztów StrykerJS 10 (144 pakiety deweloperskie, dwa wymuszone wydania pod audyt, pięć obejść, praca recenzenta): najpierw „kurde, brzmi grubo jak na małą gierkę jak na razie chyba jednak bym zrezygnował 144 pakiety developerskie? wtf?”; po pytaniu kontrolnym zestawiającym to z jego zdaniem o narzędziu zamiast tokenów: „albo dobra, sprawdźmy to narzędzie, chociaż przy 144 pakietach to nas security pieprznie pewnie prędzej czy później i i tak trzeba będzie to wywalić”; warunek wycofania zaproponowany przez agenta, Mariusz 2026-10-26: „przyjmujemy”.
- Q1a. Czy kopie z błędami sprawdza przed testami dodatek StrykerJS do typów (tryb eksperymentalny dla TypeScript 7, trzeci alias TypeScripta)?
  - Answer: nie; recenzent pomija ocalałą kopię, której kompilator by nie przyjął, z powodem „nie skompilowałaby się”.
  - Source: Mariusz, 2026-10-26: „A” — na drogę „bez sprawdzania typów” wobec `@stryker-mutator/typescript-checker` z `experimentalNativePreview`.
- Q2. Na jakich częściach działa narzędzie mutacyjne?
  - Answer: tylko na `simulation`. `browser-view` dołącza się zmianą decyzji, gdy błąd w wyliczaniu rysunku albo list przejdzie przez testy i recenzję. W `account-server`, `build-tools`, `deployment` i `agent-workflow`, których złożoność leży w połączeniach albo zgodności plików (`guidelines/testing.md:28-31`), autor sprawdza testy w głowie, jak każe WAY-253.
  - Source: Mariusz, 2026-10-26: „ok A” — na drogę „tylko symulacja”, z zaproponowanym warunkiem powrotu dla `browser-view`.
- Q3. Jak bramka zawęża przebieg testów (rewizja D-77)?
  - Answer: `npm test` bez argumentu działa jak dziś, czyli pełny przebieg. `npm test -- <plik testu>` z dokładnie jednym plikiem uruchamia tylko ten plik: plik `*.test.mjs` po zbudowaniu gry, plik `test_*.py` bez budowania. Zawężony przebieg nie uruchamia innych testów ani kontroli fundamentu. Kończy się porażką, gdy nie uruchomił żadnego testu albo dostał plik, który nie jest plikiem testu. Pełny przebieg zostaje jedynym przebiegiem przed requestem. Część D-77 o braku pliku z limitem czasu całego przebiegu zostaje bez zmian.
  - Source: Mariusz, 2026-10-26: „ok” — na propozycję zawężenia razem z trzema szczegółami: jeden plik, bez kontroli fundamentu, Python bez budowania. Wcześniej, w poleceniu zadania 2026-10-26: „Bramka testów dostaje zawężenie do jednego pliku testu, dla testów Node i Pythona, tak żeby autor zmiany mógł uruchomić same testy swojej zmiany, jak każe krok zmiany the way. Warunek powrotu z D-77 („konkretny problem z czasem diagnozy”) spełnia pomiar: pełne `npm test` na `main` 25.10.2026 trwało 770 s, z czego Node 2 s, reszta to testy Pythona.”
- Q4. Które nowe reguły dostają niezmiennik?
  - Answer: dwie. (a) Zawężony przebieg bramki, który nie uruchomił żadnego testu, kończy się porażką. (b) Konfiguracja StrykerJS wymienia każdy plik `tests/sim/*.test.mjs` poza `rules.test.mjs`. Reguła testów mutacyjnych i zmienione pole *Command* przepisów niezmiennika nie dostają (*Invariant*: none); zgodność z nimi sprawdza recenzja każdej zmiany (WAY-168).
  - Source: Mariusz, 2026-10-26: „a i b tak”.
- Q5. Czy zadanie bierze zarzuty z ponownego audytu istniejących testów?
  - Answer: nie. Wszystkie 12 zarzutów są odłożone i stoją w Kontekście; osobnego zadania w backlogu nie zakłada się.
  - Source: Mariusz, 2026-10-26: „chyba bym odłożył wszystkie teraz bez zadania” — przy nazwanym słabym punkcie: zarzuty znikną razem z tą notatką po zamknięciu zadania.
- Q6. Czy zmieniają się wzorcowe przypadki poziomów (D-85)?
  - Answer: nie; D-85 zostaje bez zmian.
  - Source: Mariusz, 2026-10-26: „A” — kandydat audytu `tests/sim/program-counts.test.mjs:157` odrzucony.

## Context

- Preferencje Mariusza wobec tego rozszerzenia (2026-10-26): „obecnie nie mam specjalnych preferencji w tym zakresie - to co dla mnie jest istotne, to jeśli możemy użyć narzędzia zamiast wydawać tokeny, to powinniśmy użyć narzędzia i taka myśl mi przyświeca przy dodawaniu strykera”.
- Próbę StrykerJS 10.0.0 zrobiono 2026-10-26 na kopii repozytorium (`git archive HEAD`), na Windows 11 z Node v24.17.0. Działał tap runner (https://stryker-mutator.io/docs/stryker-js/tap-runner/), a `buildCommand` wywoływał kompilator TypeScript 7 raz na przebieg (https://stryker-mutator.io/docs/stryker-js/configuration/). `--mutate <plik>` oraz `<plik>:<od>-<do>` zawężały przebieg. Wynik: `hex.ts` 138 kopii, 12 ocalałych; `run.ts` 242 kopie, 21 ocalałych, 3 bez pokrycia; ok. 40–90 s na plik.
- W próbie potrzebne były trzy obejścia. Krok budowania wywołuje kompilator bezpośrednio (`node ../../node_modules/typescript-compiler/bin/tsc -p tsconfig.browser.json`), bo StrykerJS buduje, zanim podlinkuje `node_modules` do swojej kopii roboczej (`packages/core/src/sandbox/sandbox.ts:74-78` w v10.1.1). `tests/sim/rules.test.mjs` czyta tekst źródeł i oblewa na kodzie przerobionym przez narzędzie, a wykluczenie przez `!` w `tap.testFiles` nie działało, więc pozostałe 18 plików stoi na liście. Stała współbieżność 4–8, bo przy większej część ocalałych kopii liczyła się jako przekroczenie czasu.
- Dwóch rzeczy nie wypróbowano: wykluczeń `ignorePatterns` (`.runs/` ma ok. 919 MB, w tym kopie drzewa) i położenia plików tymczasowych i raportów. Nie wypróbowano też przebiegu w prawdziwym drzewie ani plików `game.ts`, `program.ts` i `data/*.ts`.
- StrykerJS 10 z tap runnerem wnosi 144 pakiety (~50 MB), licencja Apache-2.0, Node >= 22. Bramka Dockera (`Dockerfile:4`, `npm ci` z zależnościami deweloperskimi) ściąga je przy każdym budowaniu obrazu.
- Audyt zależności (D-33, `scripts/audit_dependencies.py`) dla pliku blokady z próby zgłasza ostrzeżenia nieobecne w repozytorium:
  - `fast-uri` 3.1.8 (1243098, 1243101, 1243104, 1243107; poprawione w 3.1.9, wydanej 2026-10-19),
  - `qs` 6.15.1 pod `typed-rest-client` (1119502, 1158506, 1158507; poprawione w 6.16.0, jest 6.16.1 z 2026-10-14),
  - `typed-rest-client` przez `qs`.

  `typed-rest-client` 2.3.1 przypina `qs` `6.15.1`. Wymuszenia wersji (`overrides`) nie wypróbowano.
- Na komputerze Mariusza `~/.npmrc` ma `min-release-age=7`: StrykerJS 10.1.1 (2026-10-23) można zainstalować od ok. 2026-10-30, `fast-uri` 3.1.9 od ok. 2026-10-27; do tego czasu jest StrykerJS 10.0.0.
- Przebieg StrykerJS uruchamia tylko pliki Node `tests/sim`. 19 testów Pythona symulacji w `tests/invariants/` i 5 testów widoku, które wołają symulację (`tests/view/{icons,program-editor,status-row,terrain-picture,tile-list}.test.mjs`), w nim nie biorą udziału. Kopia, którą zabiłby taki test, pokazuje się jako ocalała.
- Zawężanie, ustalenia z 2026-10-26:
  - `npm test -- <plik>` w dzisiejszym łańcuchu `&&` dokleja plik do ostatniego polecenia (`foundation_check.py`, który przy takim argumencie kończy się kodem 2); pokazały to doświadczenia z npm 11.13.0 i 12.2.1.
  - `node --test <plik>` uruchamia jeden plik, a wzorzec bez trafień kończy się kodem 0 i zerem testów (https://nodejs.org/docs/latest-v24.x/api/test.html, v24.22.1).
  - `python -m unittest <ścieżka>` oblewa na plikach importujących moduł pomocniczy z tego samego katalogu. `python -m unittest discover -s <katalog> -p <nazwa pliku>` działa i przy braku trafienia kończy się kodem 5 (https://docs.python.org/3.14/library/unittest.html, 3.14.10).
  - `.the-way/gate/run_tests.py` zawęża tylko do katalogu (`:5-13`) i leży w przypiętym podmodule.
- `npm run build` trwał 14,8 s za pierwszym razem i 5,0 s za drugim. Według przeszukania tekstu żaden test Pythona nie czyta zbudowanej gry z `dist/` w repozytorium; testy, które jej potrzebują, budują własną kopię drzewa (`tests/invariants/loop2_invariant_support.py:176-228`).
- Polecenie narzędzia mutacyjnego stoi w regule `### Mutation testing`, a zawężenie w samej bramce. To różne miejsca z dwóch różnych reguł: WAY-254 i WAY-241.
- Ponowny audyt poziomów 2026-10-26, na `main` `db0b3b6`:
  - wzorce D-85 istnieją i pokazują to, co D-85 mówi (`tests/sim/traits.test.mjs:101`, `tests/http.test.mjs:123`, `tests/invariants/test_account_server_occupied_address.py:25`),
  - granice zaufania `assets/icons/**`, `src/server/**`, `package-lock.json`, `scripts/audit_dependencies.py`, `deploy/**` mają bezpośredni test odmowy; `assets/fonts/**` i `scripts/kitchen-sink.mjs` nie mają i nadal podlegają przeglądowi według D-76, bo nie zmieniły się od napisania przewodnika.
- Zarzuty audytu, wszystkie odłożone (Q5), bo to zadanie zmienia przewodnik i bramkę, a z istniejących testów rusza tylko test `node-test-selection`:
  1. unit, `tests/sim/program.test.mjs:142` — porównanie całej bieżącej akcji z `stepTo` (Behaviour, not implementation).
  2. unit, `tests/view/program-editor.test.mjs:812-900` — ręczny generator kombinacji pomija edycje zwracające `null` (Choosing the level, D-74; Shape, D-78).
  3. unit, `tests/sim/program.test.mjs:101`, `:111`, `:121` — oczekiwany `ruleId` równy pozycji nadanej w `program-fixture.mjs:9` (Data).
  4. unit, `tests/sim/program-counts.test.mjs:238-246` — wymagane przyjęcie nieznanego pola akcji bez wymagania (Behaviour, not implementation).
  5. unit, `tests/sim/program.test.mjs:367` — czas akcji wzięty z działania symulacji (Test inputs and expected values).
  6. integration, `tests/http.test.mjs:109` — dokładny tekst `"Not found"` (Behaviour, not implementation).
  7. integration, `tests/invariants/test_program_rule_pick.py:107-113`, porównania `:233-240` — cała akcja (Behaviour, not implementation).
  8. integration, `tests/invariants/test_program_rule_pick.py:140-166` — czysta reguła sprawdzana przez kopię drzewa i proces Node, powtarza `tests/sim/program.test.mjs:191-212` (Choosing the level); ten sam wzorzec mają inne niezmienniki symulacji, przez co ich nie widzi przebieg mutacyjny.
  9. integration, `tests/invariants/test_program_rule_pick.py:177-199` — oczekiwanie liczone kopią logiki wyboru (Shape, D-78).
  10. smoke, `tests/startup.test.mjs:48` i `tests/invariants/test_account_server_default_address.py:33` — wymagany kod `EADDRINUSE` w komunikacie (Behaviour, not implementation).
  11. smoke, `tests/invariants/test_account_server_default_address.py:66-77` — oczekiwanie wybierane po tym, czy port 3000 był wolny (Shape, D-78).
  12. smoke, `tests/startup.test.mjs:92`, `:107` — odrzucane wartości portu i format komunikatu wzięte z `src/server/main.ts:9`, bez źródła (Where the expected value comes from).
- Czego audyt nie widział: dokumentów zadań w vaulcie i definicji MVP (źródeł D-82), czy testy granic widziano kiedyś z porażką, ani pozostałych plików testów czytanych tylko częściowo.

## Questions carried to cycle

- Kształt skryptu wejścia bramki i sposób uruchomienia jednego pliku Pythona (np. `unittest discover -s <katalog> -p <nazwa>`), skoro `.the-way/gate/run_tests.py` zawęża tylko do katalogu.
- Wersja StrykerJS (10.0.0 albo 10.1.1, zależnie od dnia cyklu i `min-release-age=7`) i to, czy w 10.1.1 obejście kroku budowania jest dalej potrzebne.
- Położenie plików tymczasowych, raportów i ewentualnego pliku przyrostowego StrykerJS: wpisy w `.gitignore` albo katalog pod `.runs/`.

## Human actions

none

## Decisions in play

- D-73 — „Loop2 adopts the testing-guideline template of its pinned the-way in full, with only the departures of D-74, D-75, D-76, D-77, D-78 and D-79. Its testing rules and the recipes of its levels stand in `guidelines/testing.md`, read before writing or changing a test.” Nowa reguła `### Mutation testing` wchodzi przez to przyjęcie; lista odstępstw się nie zmienia, bo loop2 przyjmuje narzędzie, a D-77 zostaje odstępstwem w części o limicie czasu.
- D-77 — „Tests run through full `npm test`, without selection of a level, file or case and without a configuration file limiting the whole run. Selection and a whole-run limit are reconsidered on a concrete problem with diagnosis time or a hanging run; new or changed tests still bound their own waiting.” Zadanie zmienia jej część o wyborze (wiersz 3 *Settlements to record*); część o limicie zostaje.
- D-83 — „Tests keep Node and Python, their existing directories, and the names `*.test.mjs` and `test_*.py`. Every `*.test.mjs` file under `tests/` is selected by `npm test`, and a new `test_*.py` file is counted as covered by the gate only after its execution there is verified.” Zostaje; zmienia się tylko test jego niezmiennika `node-test-selection` i reguła `### Test files in the gate`.
- D-33 — „The dependency audit passes without a network request where `package-lock.json` equals its version at {fork-point}, and otherwise fails on each advisory of low, moderate, high or critical severity that local pinned npm 12.2.1 […] reports for that lockfile and not for its version at {fork-point} […]” Zostaje bez zmian; StrykerJS musi ją spełnić.
- D-85 — wzorce poziomów; bez zmian (Q6).

## Settlements to record

Candidates: 7 shown, 6 accepted — 2026-10-26

| # | Settlement | Kind | Source | What the cycle would otherwise guess |
|---|---|---|---|---|
| 1 | Loop2 przyjmuje narzędzie mutacyjne StrykerJS dla części `simulation`, bez dodatku sprawdzającego typy; recenzent zmiany uruchamia je na zmienionych plikach tej części. `browser-view` dołącza się zmianą tej decyzji, gdy błąd w wyliczaniu rysunku albo list przejdzie przez testy i recenzję. | decision | Q1, Q1a, Q2 | czy narzędzie obejmuje `browser-view`, czy instalować `typescript-checker` z trybem eksperymentalnym |
| 2 | Gdy audyt zależności zgłosi ostrzeżenie w pakiecie, który wnosi StrykerJS, i nie da się go usunąć poprawioną wersją, narzędzie usuwamy z repozytorium, a reguła wraca do sprawdzania w głowie autora. | decision | Q1 | czy przy takim ostrzeżeniu dopisać kolejne wymuszenie wersji albo poluzować audyt |
| 3 | `npm test` bez argumentu uruchamia pełny przebieg; `npm test -- <plik testu>` z dokładnie jednym plikiem uruchamia tylko ten plik — plik Node po zbudowaniu gry, plik Pythona bez budowania — bez innych testów i kontroli fundamentu, a pełny przebieg zostaje jedynym przed requestem; limitu czasu całego przebiegu nadal nie ma. | decision | Q3 | czy zawężony przebieg buduje grę dla Pythona, uruchamia kontrolę fundamentu, przyjmuje kilka plików |
| 4 | Zawężony przebieg bramki, który nie uruchomił żadnego testu albo dostał plik, który nie jest plikiem testu, kończy się porażką. | invariant | Q3, Q4 (a) | czy wzorzec bez trafień albo literówka w ścieżce może dać kod 0 |
| 5 | Konfiguracja StrykerJS wymienia każdy plik `tests/sim/*.test.mjs` poza `rules.test.mjs`. | invariant | Q4 (b) | czy nowy plik testów symulacji musi trafić na listę przebiegu mutacyjnego |
| 6 | StrykerJS 10 uruchamia testy `node:test` loop2 przez tap runner, a kompilator TypeScript 7 przyjmuje kod przez niego przerobiony (pliki oznaczone `// @ts-nocheck`), budowany raz na przebieg przez `buildCommand`. | environment fact | Context, próba 2026-10-26; https://stryker-mutator.io/docs/stryker-js/tap-runner/, https://stryker-mutator.io/docs/stryker-js/configuration/ | na czym opiera się wiersz 1; co sprawdzić po aktualizacji StrykerJS albo TypeScripta |

## Out of scope

- Poprawa 12 zarzutów ponownego audytu istniejących testów (Q5).
- Plik z limitem czasu całego przebiegu testów (D-77 w tej części bez zmian).
