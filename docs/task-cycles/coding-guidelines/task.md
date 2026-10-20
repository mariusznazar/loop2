---
title: Wytyczne kodowania loop2
status: accepted
created: 2026-10-19
updated: 2026-10-20
tags: []
related: ["[[(P) Loop]]"]
---

# Wytyczne kodowania loop2

Status: ready for cycle
Project relation: source only: [[definicja_mvp_loop2]]

## Description

### Need

- Loop2 ma kod, ale brakuje mu ogólnych wytycznych kodowania ze stałymi sprawdzeniami.
- WAY-215 w przypiętym the-way zatrzymuje kolejne zadania piszące kod do scalenia zadania wytycznych; następnym zamierzonym zadaniem jest styleguide.

### To do

1. Utworzyć `guidelines/coding.md` według ogólnego i kodowego szablonu przypiętego the-way, dla części `browser-view`, `simulation`, `account-server`, `build-tools`, `deployment` i `agent-workflow`, do czytania przed zmianą kodu.
2. Utworzyć cztery krótkie pliki rodzajów kodu według Q6, z tabelami plików i ich statusami, istniejącymi zasadami oraz przykładami; dodać ich indeks do ogólnych wytycznych i umieścić tam przykład testu `tests/sim/time.test.mjs`.
3. Zainstalować i skonfigurować przyjęte narzędzia w dokładnych wersjach, z deklaracjami zależności i lockfile, oraz przygotować skrypty sprawdzeń ustalonych w Q2–Q8; sprawdzenie używa lokalnego narzędzia, bez pobierania go podczas kontroli.
4. Usunąć 16 zbędnych operatorów `!`: 12 w `src/browser/sim/hex.ts` oraz po jednym w `layout.ts`, `program.ts`, `run.ts` z tego samego katalogu i w `src/browser/view/terrain-picture.ts`; zachować potrzebne asercje i kompilator TS7.
5. Naprawić osiem wartościowych zgłoszeń Python: trzy nieużywane importy; dwa zgłoszenia dotyczące zamykania logów i sprzątania po błędzie inicjalizacji serwera testowego; trzy dotyczące sprawdzania powodzenia odczytu procesów, również gdy reguła jako całość pozostaje przykładem.
6. Jednorazowo sformatować cały kod objęty Prettier — w rozpoznanym stanie 45 plików — i zapewnić mu LF również na Windows przez wąski zapis `.gitattributes`, zachowując działanie aplikacji.
7. Zapisać przyjęte 22 ustalenia przez skille właściwych elementów fundamentu, a dla każdej nowej zasady zapewnić sprawdzenie przez agenta innego niż autor objętego kodu oraz przypadki poprawne i błędne wymagane przez szablony.
8. Powiązać sprawdzenia z częściami zawierającymi kontrolowany kod oraz konfiguracje i lockfile, tak aby sama zmiana konfiguracji także uruchamiała właściwą kontrolę; skrypty zapisują wyniki w formacie the-way, a niewykonana kontrola nie dostaje wyniku `pass`.
9. Przez `the-way-update-part-map` przypisać konfiguracje, deklaracje narzędzi, ich lockfile i skrypty kontroli do `build-tools`, a `guidelines/**` do `agent-workflow`; istniejące przypisanie `.gitattributes` do `deployment` pozostaje uwzględnione w kontroli formatowania.
10. Przez `maintain-instruction-files` dodać poza blokiem instalatora w głównych instrukcjach jedną linię kierującą do `guidelines/coding.md` przed zmianą kodu, bez osobnych komend narzędzi; utworzyć dokładne produktowe kopie `guidelines-form/1` i `guidelines-reference-current/1` z ogólnego szablonu.

### Questions to settle

- **Q1. Jakie są preferencje narzędzi i zakres wzorców?**
  - Answer: Brak początkowej preferencji narzędzi; cztery formalne wzorce i jeden przykład testu, z ograniczeniami Q6.
  - Source: Mariusz, 2026-10-19: „nie mam”; 2026-10-20: „poproszę więcej wzorców, ale w granicach rozsądku”, następnie „przyjmuję” przedstawiony zestaw.
- **Q2. Co sprawdza TypeScript i JavaScript?**
  - Answer: ESLint 10.12.0, `@eslint/js` 10.0.1 `recommended`, dla TS dodatkowo `typescript-eslint` 8.71.2 `recommendedTypeChecked` z odziedziczonymi nadpisaniami, `globals` 17.13.0 i pomocnicze API TypeScript 6.0.2; blokuje cały badany zestaw — 92 aktywne reguły TS i 64 JS — bez dodatkowych zestawów stylistycznych i bez reguł odłożonych jako przykłady.
  - Answer: Zakres obejmuje kod aplikacji, skryptów i testów TS/JS w `browser-view`, `simulation`, `account-server` i `build-tools`, także nowe pliki tych języków w objętych częściach; zależności, pliki wygenerowane, submoduł i tymczasowe wyniki pracy nie są kodem produktu objętym kontrolą.
  - Answer: Zachować kompilator TS7 i jeden główny pakiet npm z lockfile; koszt pomocniczego API TS6 jest przyjęty, tak samo jak usunięcie 16 zbędnych asercji.
  - Source: Mariusz, 2026-10-20: „eslint”, po pokazaniu próby, poprawek i kosztu API TS6 obok kompilatora TS7; „przyjmuję komplet” dla utrwalenia wyboru.
- **Q3. Co sprawdza Python i Bash?**
  - Answer: Ruff 0.17.1, domyślny zestaw 407 reguł bez preview minus `PLW1510`, `I001`, `ISC004`, `UP031`, `RUF059`, `PIE808`, `RUF007`, `RUF012`, `PLR0402`, `FURB167`, `RUF100`, `SIM117`, `FURB192`, `SIM102`; 393 reguły blokują, wymienione 14 pozostaje przykładami.
  - Answer: Ruff obejmuje wszystkie pliki Python w sześciu częściach mających kod, obecnie 45 plików testów i pomocników; istniejące `noqa:E402` nie wyłącza żadnej blokującej reguły tego zestawu.
  - Answer: ShellCheck 0.11.0 obejmuje samodzielne skrypty Bash, obecnie `deploy/loop2-deploy` w `deployment`, z domyślnymi kontrolami nieopcjonalnymi i wszystkimi poziomami komunikatów, bez reguł odłożonych jako przykłady.
  - Answer: Kontrole obejmują również nowe pliki w swoim zakresie; fragmenty poleceń w YAML i literałach testów nie są samodzielnymi skryptami Bash.
  - Answer: Wszystkie osiem wartościowych zgłoszeń Python naprawiamy w tym zadaniu; automatyczne formatowanie Python/Bash odkładamy.
  - Answer: Odłożenie formatowania Python/Bash pozostawia ich układ autorom; dodanie formatowania wymagałoby dodatkowych narzędzi i jednorazowej zmiany plików, której wielkości nie zmierzono.
  - Source: Mariusz, 2026-10-20: „tak jak rekomendujesz” dla dodania obu linterów bez formatowania; „ok” dla podziału i ośmiu poprawek, następnie „przyjmuję komplet”.
- **Q4. Jak formatujemy kod webowy?**
  - Answer: Prettier 3.9.10, ustawienia domyślne bez opcji eksperymentalnych: 2 spacje, średniki, preferowane podwójne cudzysłowy, szerokość docelowa 80 znaków, LF; ta sama jawna konfiguracja dla edytora i kontroli.
  - Answer: Zakres to TS/JS aplikacji, skryptów i testów w częściach z Q2 oraz HTML/CSS przeglądarki, również nowe pliki; wyłączone są Markdown, ikony, pliki wygenerowane, zależności, submoduł i tymczasowe wyniki pracy.
  - Answer: Jednorazowo formatujemy wszystkie objęte pliki, bez pozostawiania dawnych wyjątków; Python/Bash pozostają bez automatycznego formatowania.
  - Source: Mariusz, 2026-10-20: „przyjmuję” Prettier, zakres, ustawienia i zmianę 45 plików; późniejsze przyjęcie odłożenia Python/Bash oraz kompletu ustaleń.
- **Q5. Kiedy podatność zależności zatrzymuje zmianę?**
  - Answer: npm audit w przypiętym npm 11.13.0, baza npm/GitHub Advisory Database przez publiczny rejestr npm, poziomy `low`, `moderate`, `high`, `critical` blokują; `info` nie blokuje.
  - Answer: Porównujemy dokładne pary rzeczywista nazwa pakietu–wersja z `{fork-point}`, czyli początkiem zmiany; obejmujemy bezpośrednie, pośrednie, produkcyjne, deweloperskie, opcjonalne i peer zależności npm oraz wszystkie manifesty i lockfile w zakresie `build-tools`, także dodane pod nową ścieżką.
  - Answer: Niezmieniona wersja nie blokuje niezwiązanej pracy, lecz ten sam commit może później nie przejść po publikacji ostrzeżenia dla wersji, którą wprowadza; próg pozostaje do oceny na podstawie doświadczeń, bez automatycznej zmiany ani terminu rewizji.
  - Answer: Skrypt produktu porównuje wersje i dopasowuje konkretne ostrzeżenia oraz ich zakresy, ponieważ samo npm audit nie porównuje rewizji; nie zastępuje tego najwyższym poziomem komunikatu dla dowolnej wersji pakietu.
  - Answer: Brak odpowiedzi, niepełne lub nieobsługiwane dane oznaczają niewykonaną kontrolę; dopiero poprawne ustalenie braku nowych wersji pozwala przejść bez zapytania sieciowego.
  - Answer: Zapytanie przekazuje rejestrowi nazwy i wersje pakietów, bez kodu aplikacji; runtime, obrazy kontenerów, pakiety systemowe i zależności spoza npm nie są objęte tym audytem.
  - Source: Mariusz, 2026-10-20: „zacznijmy od niskiego i zobaczymy jak to wyjdzie”, po przedstawieniu wszystkich progów i ograniczeń; „przyjmuję komplet”.
- **Q6. Jakie wzorce i statusy plików przyjmujemy?**
  - Answer: Cztery poniższe rodzaje; ścieżki w kolumnie `copy` są względem podanego katalogu i mają ten status po przyjętych poprawkach i formatowaniu.

| Kind / plik wytycznych | Część i katalog | exemplar | copy |
|---|---|---|---|
| `content-data` / `guidelines/coding-content-data.md` | `simulation`: `src/browser/sim/data/` | `resources.ts` | `actions.ts`, `archetypes.ts`, `balance.ts`, `conditions.ts`, `maps.ts` |
| `simulation-module` / `guidelines/coding-simulation-module.md` | `simulation`: `src/browser/sim/` | `game.ts` | `hex.ts`, `layout.ts`, `program.ts`, `random.ts`, `run.ts`, `types.ts` |
| `browser-module` / `guidelines/coding-browser-module.md` | `browser-view`: `src/browser/view/` | `status-row.ts` | `app.ts`, `clock.ts`, `credits.ts`, `footer.ts`, `program-editor.ts`, `send-panel.ts`, `terrain-panel.ts`, `terrain-picture.ts`, `tile-list.ts` |
| `http-application` / `guidelines/coding-http-application.md` | `account-server`: `src/server/` | `app.ts` | none |

  - Answer: Każdy plik rodzaju czytamy przed dodaniem lub zmianą pliku tego rodzaju; tabela w wytycznych zawiera pełne ścieżki względne repozytorium, dokładnie jeden `exemplar`, a pozostałe statusy wynikają z tabeli powyżej.
  - Answer: Dane pokazują typowany katalog i identyfikatory wynikające z kluczy; regułą jest istniejąca `simulation-isolation`, a kształtu katalogu nie narzucamy każdemu plikowi danych.
  - Answer: Symulacja pokazuje jawne wejście oraz wynik jako stan i zdarzenia, bez wymuszania `GameResult` od wszystkich pomocników; reguły to istniejące `simulation-isolation` i `simulation-inputs`.
  - Answer: Widok pokazuje tworzenie kontrolek raz, aktualizację zachowującą fokus i przekazywanie działań użytkownika do aplikacji; reguły to istniejące `browser-view-framework` i `content-identifiers`, bez dodatkowego zakazu przebudowy statycznych elementów czy obowiązku `update()` w każdym module.
  - Answer: HTTP pokazuje oddzielenie tworzenia aplikacji od otwierania portu dla łatwego testowania; reguły to istniejące `account-server-express-http` i `loop2-api-error-route`, bez nowej kontroli struktury fabryki.
  - Answer: Przykład `tests/sim/time.test.mjs` w ogólnych wytycznych pokazuje konkretne wejście, oczekiwany wynik i czas przekazany jako liczba zamiast czekania; nie powstaje osobny formalny wzorzec testów.
  - Answer: Odkładamy osobne wzorce testów Node/Python, budowania, wdrożenia, punktów uruchomienia i HTML; wzorce sesji, zapisu gry i poczty powstaną przy ich pierwszych implementacjach, a odłożony istniejący rodzaj wymaga porównania jego plików, gdy wrócimy do wyboru wzorca.
  - Answer: Ograniczenie audytu zmniejsza koszt utrzymywania wzorców przed styleguide i MVP; ogólne wytyczne nadal obejmują cały kod, a wskazówki o strukturze nie stają się dodatkowymi blokadami.
  - Source: Mariusz, 2026-10-20: „przyjmuję” cztery wzorce, przykład testu i odłożenia; „przyjmuję komplet” dla decyzji o wzorcach; dokładne statusy i powiązania powyżej przedstawione do końcowej akceptacji całego dokumentu.
- **Q7. Jak chronimy reguły przed wyłączeniem?**
  - Answer: Blokującej reguły nie wyciszamy komentarzem; zmiana zestawu wymaga zaakceptowanej przez człowieka zmiany decyzji produktu.
  - Answer: Osobny skrypt sprawdza faktyczną konfigurację ESLint: listę i ustawienia reguł oraz zakres plików; dla Ruff pierwsza kontrola przekazuje wprost 393 reguły z izolacją od zewnętrznej konfiguracji, a dla ShellCheck utrzymuje domyślny zestaw przypiętego wydania bez rc i opcji środowiska zmieniających zestaw.
  - Answer: Kontrole uwzględniają dyrektywy w źródłach, które mogłyby wyciszyć blokującą regułę lub zmienić ustalony zestaw; Ruff i ShellCheck nie potrzebują osobnych niezmienników konfiguracji.
  - Source: Mariusz, 2026-10-20: „przyjmuję komplet”, po pokazaniu kosztu osobnej kontroli ESLint i wariantu przekazywania zestawu bezpośrednio przez skrypt.
- **Q8. Jak wprowadzamy reguły do istniejącego kodu?**
  - Answer: Przyjmujemy szablony wytycznych z odłożeniami Q3 i Q6 oraz jawnym odstępstwem od przejściowej pary niezmienników dla lintera: wszystkie blokujące zgłoszenia usuwamy w tym zadaniu przed scaleniem, bez kontroli „nie pogarszaj starego kodu”.
  - Answer: Odstępstwo dotyczy wprowadzenia tych linterów, nie zwalnia z żadnej przyjętej reguły; jeśli naprawa przekroczy przyjęty zakres, wracamy do decyzji zamiast pozostawić naruszenia lub osłabić zestaw.
  - Source: Mariusz, 2026-10-20: „przyjmuję komplet”, po przedstawieniu warunku pełnej zgodności i kosztu dodatkowego mechanizmu, który po tych poprawkach nie miałby długu do kontrolowania.
- **Q9. Co utrwalamy w fundamencie?**
  - Answer: Wszystkie 22 pozycje z Settlements to record: 10 decyzji, 4 fakty o wydaniach zestawów i 8 niezmienników, bez nowych pojęć słownika i bez dublowania obecnych zasad architektury.
  - Source: Mariusz, 2026-10-20: „przyjmuję komplet”.

## Context

- Końcowa akceptacja całego dokumentu: Mariusz, 2026-10-20: „tak, akceptuję”.
- Źródło celu: Mariusz, 2026-10-19: „Wytyczne kodowania loop2 — ogólny plik wytycznych kodowania ze stałymi sprawdzeniami dla produktu, który ma już kod”.
- Na prośbę Mariusza przeczytano definicję i plan MVP; definicja zatwierdzona 2026-10-13, fingerprint `9e480247`, bez usterek formatu w readiness_check i plan_check, jest źródłem bez przypisania zadania do planu.
- Zadanie nie realizuje nowych projektowanych wpisów MVP o kontach, sesjach, SQLite ani poczcie; zachowuje istniejącą architekturę i przygotowuje sprawdzenia również dla przyszłego kodu tych obszarów.
- Stary Loop, potwierdzony przez remote, przeczytano na `feat/archetypes`, `cdc7c0d65728ce10d266f47b6695e6ef068a4fba`, za zgodą „możesz zajrzeć do repo loop”; wyjątek od zwykłego ograniczenia lektury MVP do danych i testów dotyczy tylko tego zadania, a React/Next.js starego produktu nie jest wzorcem loop2.
- Obowiązuje zakaz czytania gałęzi `10x/*` oraz katalogów `C:/Storage/repos/loop2-10x` i `C:/Storage/repos/loop-10x`, także przez subagentów.
- Rozpoznany stan loop2: `c379207`; pin the-way: `d829e3aa6242a9b8901274531dd82fd5c7d87628`, zgodny z gitlinkiem.
- Brak obecnych wytycznych i przyjętych narzędzi tego rodzaju potwierdzono lekturą kodu i przeszukaniem całego fundamentu; zadanie tworzy brakujące wytyczne kodowania i nie czeka na własny wynik.
- Dotknięte są sześć części z kodem wymienionych w To do oraz `product-foundation`; wymagane zmiany kodu widoku to usunięcie zbędnej asercji i formatowanie, bez zmiany zachowania lub wyglądu interfejsu, więc zadanie nie wprowadza zasad przyszłego styleguide.
- Przegląd wzorców objął całe 26 plików TS, 18 mjs, HTML i skrypt Bash; pełny audyt wzorców Python objął tylko 3 z 45 plików, choć linter sprawdził wszystkie 45 i sędzia przeczytał miejsca zgłoszeń.
- Próba ESLint dała 16 zgłoszeń `no-unnecessary-type-assertion` w pięciu plikach, wszystkie niezależnie ocenione jako warte małej poprawki; 12 miejsc to `hex.ts:42,43,62,65,66,69`, a pozostałe `layout.ts:42`, `program.ts:49`, `run.ts:45` i `terrain-picture.ts:54`, w katalogach z To do.
- Próba Ruff dała 50 zgłoszeń w 24 plikach: F401 3, FURB167 5, FURB192 1, I001 3, ISC004 2, PIE808 1, PLR0402 1, PLW1510 22, RUF007 2, RUF012 1, RUF059 2, RUF100 2, SIM102 1, SIM115 2, SIM117 1, UP031 1; niezależna ocena wskazała 8 wartościowych i 42 niewarte poprawki.
- Każda z 14 odłożonych reguł Ruff miała co najmniej jedno nieprzydatne zgłoszenie; z 393 blokujących F401 i SIM115 zgłosiły łącznie pięć miejsc, a 391 reguł nie zgłosiło nic, co nie dowodzi ich bezbłędności dla przyszłego kodu.
- Importy do usunięcia są w `tests/deploy/test_loop2_deploy_build.py:16` (`os`), `tests/invariants/loop2_invariant_support.py:20` (`sys`) i `tests/invariants/test_loop2_api_error_route.py:24` (`os`).
- Dwa zgłoszenia `tests/invariants/loop2_invariant_support.py:239–240` wymagają zamykania logów i sprzątania po nieudanym drugim otwarciu pliku lub uruchomieniu procesu, z zachowaniem logów przez czas życia serwera i poprawnym sprzątaniem bez gotowego procesu.
- Trzy wartościowe zgłoszenia PLW1510 dotyczą `tests/invariants/loop2_invariant_support.py:81` oraz `tests/invariants/test_loop2_one_serving_process.py:70,77`: odrzucać nieudany odczyt procesów, zamiast ufać częściowemu stdout, i nadal próbować zakończyć znany proces główny, gdy odczyt dzieci zawiedzie.
- ShellCheck nie zgłosił uwag w skrypcie wdrożenia, a Prettier wymagał zmiany wszystkich 45 objętych plików bez błędu parsera; obecny kod nie jest jeszcze zgodny z nowymi kontrolami, zaś statusy Q6 opisują wymagany wynik po poprawkach i formatowaniu.
- Próby w zewnętrznej kopii potwierdziły wykrywanie celowych błędów; nie zmieniano kodu produktu ani nie odtwarzano opisanych możliwych awarii pomocników Python.
- Sprawdzona instalacja w jednym pakiecie użyła `typescript: npm:@typescript/typescript6@6.0.2` dla API i `typescript-compiler: npm:typescript@7.0.2` dla kompilacji oraz jawnej ścieżki kompilatora w budowaniu; obie kontrole typów TS7 przeszły, a ESLint zachował te same 16 zgłoszeń.
- Konfiguracje i skrypty nowych kontroli należą do `build-tools`; Prettier musi także reagować na `.gitattributes` w `deployment`, a kontrola aktualności odwołań wytycznych obejmuje `agent-workflow` i `product-foundation`.
- Przypadki zasad mają wykazywać odczyt nowego pliku pod nową ścieżką w objętej części, a dla kontroli konfiguracji zmianę jej własnego pliku; kompletne krótkie pliki przypadków muszą spełniać ograniczenia bloków kodu z szablonu.
- Badania, próby i niezależne oceny są pomocniczo w `.runs/coding/`: `linter.md`, `formatter.md`, `dependency-audit.md`, `lint-trial-verdict.md`, `python-shell-trial-verdict.md`, `patterns-proposal.md` i `complete-proposal-critique-verdict.md`; wybory potrzebne wykonawcy są zapisane w tym zadaniu i nie zależą od zachowania tych raportów.
- Źródło składu @eslint/js 10.0.1: https://unpkg.com/@eslint/js@10.0.1/src/configs/eslint-recommended.js; dla typescript-eslint 8.71.2: https://github.com/typescript-eslint/typescript-eslint/tree/v8.71.2/packages/eslint-plugin/src/configs — `flat/recommended-type-checked.ts`, `flat/eslint-recommended.ts`, `eslint-recommended-raw.ts`, `flat/base.ts`, łącznie z nadpisaniami.
- Źródło zestawu Ruff 0.17.1: https://github.com/astral-sh/ruff/blob/0.17.1/crates/ruff_linter/src/settings/mod.rs, `DEFAULT_SELECTORS`, porównane z odczytem 407 aktywnych reguł; źródło wersji: https://pypi.org/pypi/ruff/0.17.1/json.
- Źródło zestawu ShellCheck 0.11.0: https://github.com/koalaman/shellcheck/tree/v0.11.0/src/ShellCheck — `Analyzer.hs`, rejestracje `Analytics.hs`, `Checks/Commands.hs` z rozwinięciem `declaringCommands` w `Data.hs`, filtry dialektu `Checks/ShellSupport.hs`, `Checks/ControlFlow.hs`, `Checks/Custom.hs`, diagnostyka `Parser.hs`, połączenie wyników `Checker.hs` i domyślne ustawienia `Interface.hs`; źródłem jest skład tego wydania, nie wymyślona liczba kodów SC.
- Wersjonowane źródła pozostałych narzędzi: https://github.com/prettier/prettier/blob/3.9.10/docs/options.md i https://registry.npmjs.org/prettier/3.9.10; https://raw.githubusercontent.com/npm/cli/v11.13.0/docs/lib/content/commands/npm-audit.md oraz https://raw.githubusercontent.com/npm/cli/v11.13.0/workspaces/arborist/lib/audit-report.js; datą badania i prób jest 2026-10-20.

## Questions carried to cycle

none

## Human actions

none

## Decisions in play

Obowiązujące zdania z `foundations/decisions.md` w stanie `c379207`; zadanie zachowuje je i nie realizuje nowych projektowanych wpisów MVP.

### D-01/1

> The account and save server is written in TypeScript and runs on Node.js 24 LTS. Its TypeScript
> types are checked before deployment.

### D-02/1

> The account and save server uses Express 5 on Node.js 24 to route and handle HTTP requests and
> responses.

### D-03/2

> The browser view is built in TypeScript with the browser's DOM APIs, without an additional UI framework.

### D-04/3

> The game is written in TypeScript and runs in the browser. Its simulation is a set of pure
> functions that take a game state and a span of game minutes and return the next game state together
> with the events it produced, and real time enters the simulation only as an argument. The browser
> view draws the game only from the game state and the game's content data, and changes the game state
> only through functions of the simulation, to which it passes the player's choices and the passing of
> real time.

### D-05/3

> One Node.js process running Express 5 serves both the built game's static files and the `/api/`
> account and save routes in the loop2 container. An unmatched `/api/` request receives an API error,
> not the game's HTML page.

### D-06/3

> The browser and server share one npm package and lockfile, and have separate TypeScript
> compilation configurations and output directories. Building the application compiles both
> configurations.

### D-18/1

> The game's content — game maps, items, creatures, character skills and their numbers — stands in
> data files. A game map, an item or a creature of a kind the simulation already handles is added by a
> change of data alone.

### D-22/1

> Every random draw of the simulation comes from generators seeded by the seed saved in the map run's
> state, one generator for each kind of draw — the game map's layout and wandering among them — and
> the map run draws its game map's layout at its start, before the first game minute, in a fixed
> order. A map run restart keeps its seed, and any other map run takes a new seed.

## Settlements to record

Candidates: 22 shown, 22 accepted — 2026-10-20

Mariusz, 2026-10-20: „przyjmuję komplet”; numery poniżej służą wyborowi w zadaniu, nie są identyfikatorami przyszłych wpisów fundamentu.

| # | Settlement | Kind | Source | What the cycle would otherwise guess |
|---|---|---|---|---|
| 1 | Loop2 przyjmuje szablony wytycznych przypiętego the-way z odłożeniem formatowania Python/Bash i wzorców testów, budowania, wdrożenia, punktów uruchomienia oraz HTML, wyborem wzorców sesji, zapisu i poczty przy ich pierwszych implementacjach oraz odstępstwem dla wprowadzenia linterów: pełne usunięcie blokujących zgłoszeń przed scaleniem zamiast przejściowej kontroli niepogarszania kodu. | decision | Q6, Q8; przyjęcie kompletu Q9 | Czy dodawać pozostałe wzorce, formatować Python/Bash i utrzymywać dodatkową kontrolę dla usuniętych naruszeń. |
| 2 | TS/JS aplikacji, skryptów i testów sprawdza ESLint 10.12.0 z @eslint/js 10.0.1 recommended i typescript-eslint 8.71.2 recommendedTypeChecked dla TS, bez wyjątków od badanego zestawu 92 reguł TS i 64 JS, przy zachowaniu kompilatora TS7 i pomocniczego API TS6. | decision | Q2; przyjęcie kompletu Q9 | Narzędzie, zestaw, zakres i rozdzielenie kompilatora od API lintera. |
| 3 | Python sprawdza Ruff 0.17.1: 393 reguły blokują, a PLW1510, I001, ISC004, UP031, RUF059, PIE808, RUF007, RUF012, PLR0402, FURB167, RUF100, SIM117, FURB192 i SIM102 pozostają przykładami. | decision | Q3; przyjęcie kompletu Q9 | Czy wymuszać także 42 nieprzydatne poprawki z domyślnego zestawu. |
| 4 | Bash sprawdza ShellCheck 0.11.0 z domyślnymi nieopcjonalnymi kontrolami i wszystkimi poziomami komunikatów, bez reguł odłożonych jako przykłady. | decision | Q3; przyjęcie kompletu Q9 | Narzędzie i to, które komunikaty blokują zmianę. |
| 5 | Prettier 3.9.10 formatuje TS/JS aplikacji, skryptów i testów oraz HTML/CSS przeglądarki ustawieniami domyślnymi, bez opcji eksperymentalnych, z LF także na Windows. | decision | Q4; przyjęcie kompletu Q9 | Formatowanie nowego kodu i końce linii. |
| 6 | npm 11.13.0 i baza npm/GitHub Advisory blokują wprowadzane względem początku zmiany dokładne pary nazwa–wersja zależności npm od poziomu low, także zależności pośrednie i deweloperskie, bez kontroli niezmienionych wersji i bez automatycznej rewizji progu. | decision | Q5; przyjęcie kompletu Q9 | Próg, bazę i to, czy stare podatności blokują niezwiązaną zmianę. |
| 7 | Wzorcem rodzaju content-data jest src/browser/sim/data/resources.ts, a kształt katalogu pozostaje przykładem obok istniejących zasad izolacji symulacji. | decision | Q6; przyjęcie kompletu Q9 | Plik do kopiowania przy dodawaniu treści gry i granicę między przykładem a obowiązkiem. |
| 8 | Wzorcem rodzaju simulation-module jest src/browser/sim/game.ts, przy zachowaniu istniejących zasad jawnych wejść i niezmieniania danych wejściowych, bez narzucania GameResult wszystkim pomocnikom. | decision | Q6; przyjęcie kompletu Q9 | Wzór operacji gry i to, czy wszystkie funkcje mają zwracać ten sam typ. |
| 9 | Wzorcem rodzaju browser-module jest src/browser/view/status-row.ts, a organizacja tworzenia kontrolek i ich aktualizacji pozostaje przykładem obok obecnych zasad DOM i danych gry. | decision | Q6; przyjęcie kompletu Q9 | Wzór modułu widoku i to, czy kopiować jego strukturę do każdego pliku. |
| 10 | Wzorcem rodzaju http-application jest src/server/app.ts, a oddzielenie tworzenia aplikacji od otwierania portu pozostaje przykładem obok obecnych zasad Express i odpowiedzi API. | decision | Q6; przyjęcie kompletu Q9 | Wzór składania aplikacji HTTP bez wymyślania architektury przyszłych kont i zapisu. |
| 11 | Faktem będącym podstawą kontroli ESLint jest skład recommended w wydaniu @eslint/js 10.0.1. | environment fact | Q2; źródło wydania w Context; przyjęcie kompletu Q9 | Dokładną listę zamiast ruchomego znaczenia „recommended”. |
| 12 | Faktem będącym podstawą kontroli TypeScript jest skład recommendedTypeChecked wraz z odziedziczonymi nadpisaniami w typescript-eslint 8.71.2. | environment fact | Q2; źródło wydania w Context; przyjęcie kompletu Q9 | Czy uwzględniać wyłączenia reguł podstawowych zastępowanych przez TypeScript. |
| 13 | Faktem będącym podstawą kontroli Ruff jest domyślny zestaw 407 reguł bez preview w wydaniu 0.17.1. | environment fact | Q3; źródło wydania w Context; przyjęcie kompletu Q9 | Pełny zestaw, od którego odjęto przyjęte 14 przykładów. |
| 14 | Faktem będącym podstawą kontroli ShellCheck jest skład domyślnych nieopcjonalnych kontroli dla Bash w wydaniu 0.11.0. | environment fact | Q3; źródło wydania w Context; przyjęcie kompletu Q9 | Zakres kontroli bez utożsamiania opcji optional z domyślnymi. |
| 15 | Żaden objęty plik TS/JS nie narusza blokujących reguł ESLint ani nie wycisza ich komentarzami. | invariant | Q2, Q7; przyjęcie kompletu Q9 | Czy kontrola ma wykrywać wyciszenie błędu w pojedynczym pliku. |
| 16 | Żaden objęty plik Python nie narusza blokujących reguł Ruff ani nie wycisza ich komentarzami. | invariant | Q3, Q7; przyjęcie kompletu Q9 | Czy dotychczasowe noqa dla reguły spoza zestawu ma blokować i czy blokującą regułę można wyciszyć. |
| 17 | Żaden objęty plik Bash nie narusza blokujących reguł ShellCheck ani nie wycisza ich komentarzami. | invariant | Q3, Q7; przyjęcie kompletu Q9 | Czy samo dopisanie komentarza disable pozwala przejść kontroli. |
| 18 | Skrypt sprawdza, że faktyczna konfiguracja ESLint zachowuje listę i ustawienia reguł oraz pokrycie plików przyjęte w decyzji produktu. | invariant | Q7; przyjęcie kompletu Q9 | Czy wyłączenie reguły, osłabienie ustawień lub pominięcie nowego pliku daje poprawny wynik. |
| 19 | Każdy plik objęty Prettier jest zgodny z przyjętym formatowaniem. | invariant | Q4; przyjęcie kompletu Q9 | Czy dawny kod dostaje wyjątek i czy kontrola obejmuje nowy plik. |
| 20 | Zmiana nie wprowadza objętej zależności npm w wersji ze znaną podatnością low lub wyższą według bazy odczytanej podczas kontroli, a brak wiarygodnego wyniku nie oznacza przejścia. | invariant | Q5; przyjęcie kompletu Q9 | Jak porównać wersje i jak traktować awarię bazy lub niepełne dane. |
| 21 | Pliki wytycznych zachowują formę przyjętych szablonów, w tym tabele wzorców i poprawne oraz błędne przykłady dla zasad. | invariant | To do 10; szablon wytycznych; przyjęcie kompletu Q9 | Czy brak wymaganej tabeli lub przykładu zatrzymuje zmianę. |
| 22 | Odwołania wytycznych wskazują aktualne wersje decyzji i niezmienników produktu. | invariant | To do 10; szablon wytycznych; przyjęcie kompletu Q9 | Czy zmiana fundamentu bez aktualizacji wytycznych jest wykrywana. |

Wiersze 21–22 opisują znaczenie; wykonawca kopiuje dokładne identyfikatory i zdania z szablonu, nie zastępuje ich tymi parafrazami.

## Out of scope

- Wykonanie styleguide, funkcji MVP i wdrożenia na serwer.
