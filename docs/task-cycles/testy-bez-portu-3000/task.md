---
title: Testy loop2 bez stałego portu 3000 i przepięcie the way
status: accepted
created: 2026-10-23
updated: 2026-10-23
tags: []
related: ["[[(P) Loop]]"]
---

# Testy loop2 bez stałego portu 3000 i przepięcie the way

Status: ready for cycle
Project relation: independent

## Description

### Need

- Dwa cykle zadań loop2 w dwóch osobnych worktree mają móc uruchamiać bramkę testów (`npm test`) jednocześnie na jednym komputerze; wkrótce pójdą równolegle dwa cykle zadań planu MVP i to zadanie jest warunkiem tej pracy.
- Dziś testy mają port 3000 wpisany na sztywno, więc gdy jeden przebieg trzyma port, drugi pada na zajętym porcie i przechodzi dopiero przy powtórce — tak było przy równoległych cyklach „serwer testowy” i „mag w lesie”.
- Przy okazji loop2 przechodzi na aktualną wersję the way, żeby równoległe cykle planu MVP pracowały już na niej.

### To do

1. Testy niezmienników, które uruchamiają zbudowany serwer przez `npm start`, uruchamiają go i odpytują na wolnym porcie wskazanym przez system, podanym serwerowi w `LOOP2_LISTEN_PORT`, zamiast stałego 3000.
2. Test błędu startu na zajętym adresie w `tests/startup.test.mjs` i jego odpowiednik w `tests/invariants/test_account_server_occupied_address.py` zajmują wolny port wskazany przez system i podają go serwerowi w `LOOP2_LISTEN_PORT`, zamiast zajmować stały 3000.
3. Jeden test uruchamia serwer bez `LOOP2_LISTEN_HOST` i `LOOP2_LISTEN_PORT` i przechodzi wtedy i tylko wtedy, gdy serwer zgłasza gotowość linią `Loop: http://127.0.0.1:3000` albo kończy się kodem niezerowym z komunikatem wskazującym zajęty `127.0.0.1:3000`; w pierwszym przypadku test od razu zamyka serwer.
4. README w opisie `npm test` nie mówi o teście „przy zajętym porcie 3000”, tylko opisuje testy startu zgodnie z nowym wyborem portu.
5. Przypięcie the way w loop2 przechodzi z `1bc9a16` na `86b78ad` instalatorem the way (`installation/install.py` z checkoutu the way na `86b78ad`), razem z tym, co instalator przepisuje; to pierwszy commit gałęzi zadania, a `npm test` przechodzi na nowym przypięciu.

### Acceptance criteria

- `npm test` przechodzi, gdy port 3000 na 127.0.0.1 przez cały przebieg trzyma inny proces.
- Dwa przebiegi `npm test` uruchomione jednocześnie w dwóch worktree tego repozytorium przechodzą oba.

### Questions to settle

- Jak testy wybierają port serwera?
  - Answer: wolny port od systemu przy każdym starcie serwera — test prosi system o wolny port, zwalnia go i podaje serwerowi w `LOOP2_LISTEN_PORT`; zostaje krótkie okno, w którym port może zająć ktoś inny, co da się złagodzić jedną ponowną próbą startu.
  - Source: Mariusz, 2026-10-23, „A” — wybór wariantu A spośród: A wolny port od systemu, B port ze zmiennej `LOOP2_TEST_PORT` z domyślnym 3000, C wariant A z nadpisaniem zmienną.
- Czy któryś test zostaje przy porcie 3000, bo sprawdza domyślny adres serwera?
  - Answer: tak, jeden mały test domyślnego adresu, który przechodzi niezależnie od tego, czy port 3000 jest wolny — uruchamia serwer bez zmiennych i przyjmuje albo gotowość na `127.0.0.1:3000` (wtedy od razu go zamyka), albo błąd startu wskazujący zajęty `127.0.0.1:3000`.
  - Source: Mariusz, 2026-10-23, „B” — wybór wariantu B spośród: A żaden test nie sprawdza domyślnego adresu, B jeden test domyślnego adresu odporny na zajęty port 3000.
- Czy przepięcie the way na aktualną wersję idzie w tym zadaniu, czy osobnym pull requestem?
  - Answer: w tym zadaniu, jako pierwszy commit gałęzi, na `86b78ad` — głowę gałęzi `foundations` the way po scaleniu PR #40.
  - Source: Mariusz, 2026-10-23, „przy okazji w ramach tego zadania możemy zrobić przepięcie the way na aktualną wersję” i „poproszę A” — wybór wariantu A spośród: A przepięcie jako punkt tego zadania, B osobny PR z samym przepięciem przed cyklem.

## Context

- Serwer bierze adres ze zmiennych `LOOP2_LISTEN_HOST` i `LOOP2_LISTEN_PORT`, domyślnie 127.0.0.1:3000 (`src/server/main.ts:3-4`, `main` @ db3253c); README opisuje 3000 jako domyślny adres i ten opis zostaje.
- Port 3000 jest dziś wpisany w `tests/invariants/loop2_invariant_support.py` (`PORT = 3000`), w `tests/startup.test.mjs` (pierwszy test), w `tests/invariants/test_account_server_occupied_address.py` (`READY_LINE`) i w opisach `test_loop2_api_error_route.py` oraz `test_loop2_one_serving_process.py`; testy jakości w `tests/quality/test_invariant_support.py` podmieniają `port_in_use`.
- `tests/invariants/test_loop2_one_serving_process.py` czeka do 300 s na zwolnienie portu 3000 (`PORT_WAIT`) — częściowe obejście tego samego problemu.
- Drugi test w `tests/startup.test.mjs` już bierze wolny port od systemu (`freePort()`, nasłuch na porcie 0), a `tests/http.test.mjs` nasłuchuje na porcie 0.
- Testy kontenerów (`test_loop2_container_icons.py`, `test_loop2_one_serving_process_container.py`, `tests/deploy/test_loop2_image_icons.py`) nadają obrazom i kontenerom losowe nazwy i nie publikują portów na hoście; testy wdrożenia sprawdzają port 18080 tylko w treści skryptów.
- Niezmiennik `account-server-occupied-address` mówi o zajętym „listening address” bez numeru portu; jego *Derives from* cytuje tytuł testu „exits with an error instead of reporting ready when port 3000 is occupied” z `tests/startup.test.mjs`, więc zmiana tytułu tego testu zmienia cytat w fundamencie.
- Żaden niezmiennik ani decyzja fundamentu nie wiąże portu 3000 w swoim brzmieniu (`foundations/invariants.md`, `foundations/decisions.md` @ db3253c).
- Między `1bc9a16` a `86b78ad` the way zmienia sześć plików, wszystkie o dzieleniu projektu na zadania: `project-level/plan_check.py` z testem, skill i szablon planu projektu oraz własne decyzje i niezmienniki the way; cykl zadania i `elements/common/foundation_check.py` zostają bez zmian.
- Przepięcie opisuje `installation/README.md` the way, sekcja „Moving the pin”: podgląd `install.py <repozytorium>`, potem `--apply` z potwierdzeniem `y`; po przepięciu bramka produktu biegnie na nowej wersji i jej wynik idzie do opisu pull requesta.

## Questions carried to cycle

none

## Human actions

none

## Decisions in play

- D-05 — What serves the built game and account requests in the container? — „One Node.js process running Express 5 serves both the built game's static files and the `/api/` account and save routes in the loop2 container. An unmatched `/api/` request receives an API error, not the game's HTML page.” Jej *Verification* to niezmienniki `loop2-one-serving-process` i `loop2-api-error-route`, których testy zmieniają port; brzmienie decyzji zostaje.

## Settlements to record

Candidates: 3 shown, 2 accepted — 2026-10-23

| # | Settlement | Kind | Source | What the cycle would otherwise guess |
|---|---|---|---|---|
| 1 | Test loop2, który uruchamia proces serwera, podaje mu w `LOOP2_LISTEN_PORT` wolny port wskazany przez system przy każdym starcie, nie stały port; wyjątkiem jest jeden test domyślnego adresu, uruchamiający serwer bez `LOOP2_LISTEN_HOST` i `LOOP2_LISTEN_PORT`. | decision | Mariusz, 2026-10-23, „A” (pytanie 1 w *Questions to settle*); *Need*, pierwszy punkt; wiersz przyjęty przez Mariusza 2026-10-23, „przyjmujemy tak jak rekomendujesz” | czy cykl zapisuje wybór portu jako regułę dla wszystkich testów uruchamiających serwer, czy tylko poprawia dzisiejsze testy, zostawiając następnym zadaniom wolną rękę co do stałego portu |
| 2 | Serwer uruchomiony bez `LOOP2_LISTEN_HOST` i `LOOP2_LISTEN_PORT` bierze adres 127.0.0.1:3000: zgłasza gotowość linią `Loop: http://127.0.0.1:3000` albo kończy się kodem niezerowym z komunikatem wskazującym zajęty 127.0.0.1:3000. | invariant | Mariusz, 2026-10-23, „B” (pytanie 2 w *Questions to settle*); stan kodu: `src/server/main.ts:3-4` @ db3253c; wiersz przyjęty przez Mariusza 2026-10-23, „przyjmujemy tak jak rekomendujesz” | czy test domyślnego adresu z punktu 3 *To do* jest sprawdzeniem niezmiennika z linią `invariant:`, czy zwykłym testem, który późniejsza zmiana domyślnego portu może po prostu przepisać |

## Out of scope

- Domyślny adres serwera 127.0.0.1:3000 w `src/server/main.ts` i jego opis w README.
