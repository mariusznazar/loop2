# Domknąć pierwszy fundament loop2

Status: ready for cycle
Project relation: independent

## Description

### Need

- Trzech reguł produktu — układu budowania, katalogu, z którego serwer podaje pliki, i wyjścia serwera przy zajętym adresie — pilnują dziś tylko zwykłe testy, które wykonawca może zmienić bez sygnału z fundamentu.
- Trzy zdania fundamentu z PR #3 mają przyjęte poprawki, które nie zostały naniesione, a metoda niezmienników nie mówi, że testy wymagają najpierw instalacji zależności.

### To do

1. Dopisać do fundamentu niezmienniki odłożone w PR #3 — `application-build-layout`, `public-file-boundary` i `account-server-occupied-address` — w brzmieniu z zapisu cyklu, każdy z testem i celowym złamaniem.
2. Zmienić zdanie części `product-foundation` w mapie części na „The part holds the product's foundation.”.
3. Dopisać do D-05/1 pole *Origin*: „the full approved entry: definicja_mvp_loop2.md in the vault (Notes/Projects/(P) Loop), § Projected foundation changes, "What serves the built game and account requests in the container?"”.
4. Zawęzić przykład naruszenia w *Verification* D-04/1 do: „a part of the game written as a Godot scene, or a script of the game's own code that the browser loads, written directly in JavaScript instead of compiled from TypeScript”.
5. Nazwać `npm ci` jako warunek wstępny w metodzie niezmienników.

## Context

- Źródło: scalony PR #3 (`e1b06b4`), sekcja „Do decyzji” — U1 (pkt 2), U2 (pkt 3), U3 (pkt 4), U4 (pkt 1), U8 (pkt 5) — oraz „Do zgłoszenia w the-way”; poprawki zdań przyjęte według rekomendacji z PR, bez osobnego pytania.
- Brzmienie trzech niezmienników: zapis cyklu poprawki 1, commit `5928e7b`, plik `docs/task-cycles/app-skeleton/reports/correction-1/return/proposal-pl.md`, część C; żaden nie pochodzi z definicji MVP.
- Dziś tych reguł pilnują tylko `tests/http.test.mjs` (katalog plików) i `tests/startup.test.mjs` (zajęty port); pierwszego zdania D-06 nie pilnuje nic.
- W świeżej kopii bez `npm ci` bramka testów zgłasza błędy zamiast „niesprawdzone” (U8 w PR #3).

## Questions carried to cycle

- Czy `application-build-layout` rozbić na dwa niezmienniki — jeden pakiet i plik blokady / osobne konfiguracje i katalogi wynikowe? Rekomendacja panelu z PR #3: rozbić, bo łączy dwie reguły, które psują się osobno.
- Jak zapisać `npm ci` w metodzie niezmienników — w samym poleceniu czy jako warunek obok niego.

## Decisions in play

- D-04/1 „What is the game built with?”: “The game is written in TypeScript and runs in the browser.” — przykład naruszenia w *Verification* zmienia się według pkt 4; zdanie wiążące bez zmian.
- D-05/1 „What serves the built game and account requests in the container?”: “One Node.js process running Express 5 serves both the built game's static files and the `/api/` paths. An unmatched `/api/` request receives an API error, not the game's HTML page.” — *Origin* dziś `none`.
- D-06/1 „How are the browser and server built together?”: “The browser and server share one npm package and lockfile, and have separate TypeScript compilation configurations and output directories. Building the application compiles both configurations.” — *Verification* wymienia dziś tylko `application-build-output`.
- Mapa części, `product-foundation`: “The part holds the product rules and the map of its responsibilities.”
- Niezmienniki 1–7, *Method*: `python -B .the-way/gate/run_tests.py tests/invariants --record .runs/invariant-tests.jsonl`.

## Out of scope

- Druga część U2 — potwierdzenie, że część D-05 o kontenerze przychodzi z zadaniem wdrożenia.
- Przejście na TypeScript 7 — osobne zadanie w `(P) Loop`.
