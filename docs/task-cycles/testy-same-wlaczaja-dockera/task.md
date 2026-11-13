---
title: Testy gry same włączają Dockera, gdy nie odpowiada
status: draft
created: 2026-11-12T21:30
updated: 2026-11-13
tags: [zadanie]
related: "the author's project note for the game"
---

# Testy gry same włączają Dockera, gdy nie odpowiada

Status: ready for cycle
Project relation: independent

## Description

### Need

- Część testów gry potrzebuje Dockera: osiem plików testów części wdrożenia, w katalogach `tests/deploy` i `tests/invariants`.
- Gdy Docker Desktop nie jest włączony, te testy się pomijają zamiast upaść, a pełna bramka testów przechodzi na zielono.
- Agent cyklu zapisuje wtedy sprawdzenie jako niewykonane, a pytanie trafia do opisu prośby o scalenie.
- Odczuwa to Mariusz, który czasem zapomina włączyć Dockera po starcie komputera i potem dostaje w prośbie sprawdzenie do zrobienia ręcznie albo do przepuszczenia.
- W rejestrze problemów audytu procesu jest jeden taki przypadek wprost, wyceniony jako czas człowieka; Mariusz mówi, że zdarza się częściej, niż widać w rejestrze.
- Jeśli nic się nie zmieni, każde zapomnienie dalej kończy się niesprawdzonym testem w prośbie.

### To do

1. Gdy test potrzebujący Dockera nie dostaje odpowiedzi demona Dockera, a na komputerze jest Docker Desktop, bramka uruchamia Docker Desktop i czeka, aż demon odpowie, najwyżej 3 minuty.
2. Dzieje się to przy pełnym `npm test` i przy uruchomieniu jednego pliku testu (`npm test -- <plik>`).
3. Test pomija się dopiero wtedy, gdy demon nie odpowie w limicie, a komunikat pominięcia mówi, że start Dockera był próbowany i nie zdążył, oraz co zostaje niesprawdzone.
4. Na komputerze bez Docker Desktop, na przykład na Linuksie albo w kontenerze w chmurze, test pomija się od razu, jak dziś, z informacją, co zostaje niesprawdzone.
5. Docker Desktop włączony przez bramkę zostaje włączony po przebiegu; bramka go nie wyłącza.
6. Cykl sprawdza raz na tym komputerze, że pełny `npm test` rozpoczęty przy wyłączonym Docker Desktop sam go włącza i testy potrzebujące Dockera biegną bez pominięcia. Agent cyklu sam wyłącza w tym celu Docker Desktop (`docker desktop stop`), ale dopiero gdy `docker ps` nie pokazuje żadnego kontenera i żadna inna bramka testów loop2 nie biegnie w innym katalogu roboczym; inaczej czeka.

### Acceptance criteria

- Gdy Docker Desktop nie wstanie w limicie, jeden przebieg bramki czeka na niego najwyżej raz; pozostałe testy potrzebujące Dockera w tym przebiegu pomijają się bez ponownego czekania.

### Questions to settle

- Kto włącza Dockera, gdy testy go potrzebują, a nie odpowiada?
  - Answer: skrypt testów gry, bo robi to za każdym razem, niezależnie od pamięci agenta, a Dockera używa dziś tylko gra.
  - Not chosen:
    - reguła w the way pozwalająca agentowi włączyć lokalną usługę potrzebną do sprawdzeń — zależy od tego, czy agent o niej pamięta, a Dockera używa dziś tylko gra
    - nic — każde zapomnienie dalej kończy się niesprawdzonym testem w prośbie
  - Source: Mariusz, 2026-11-12, przy doprecyzowaniu zadania the way o krokach „sprawdź sam” w prośbie; zapisane w pierwszej wersji tej notatki.
- 1. Jak długo bramka czeka, aż uruchomiony Docker Desktop odpowie?
  - Answer: 3 minuty — ponad trzykrotny zapas wobec szacunku startu (pół minuty do minuty, niezmierzony), a przy Dockerze, który nie wstaje, kosztuje 3 minuty raz na przebieg.
  - Not chosen:
    - 2 minuty — mniejszy zapas; wolny start, np. po aktualizacji Windowsa, kończy się pominięciem jak dziś
    - 5 minut — przy Dockerze, który nie wstaje, przebieg wydłuża się o 5 minut
  - Source: doradca dnia w imieniu Mariusza (Mariusz poza komputerem, decyzje przekazane doradcy), 2026-11-13: „1 b”.
- 2. Czy bramka włącza Dockera także przy uruchomieniu jednego pliku testu (`npm test -- <plik>`), czy tylko przy pełnym `npm test`?
  - Answer: przy obu — agenci uruchamiają pojedyncze pliki, gdy szukają przyczyny błędu, a taki plik bez Dockera dziś i tak pada.
  - Not chosen:
    - tylko przy pełnym `npm test` — jeden plik dalej pada jak dziś, a Dockera włącza ręcznie agent albo Mariusz
  - Source: doradca dnia w imieniu Mariusza, 2026-11-13: „2 a”.
- 3. Co dzieje się z Docker Desktop po przebiegu, który go włączył?
  - Answer: zostaje włączony — to ten sam stan, co po włączeniu go ręcznie, a kolejne przebiegi w cyklu nie czekają na start; pamięć zostaje zajęta, dopóki Mariusz go nie zamknie.
  - Not chosen:
    - bramka go wyłącza — pamięć wraca, ale każdy z kilku przebiegów w cyklu znowu czeka na start
  - Source: doradca dnia w imieniu Mariusza, 2026-11-13: „3 a”.
- 4. Czy start Dockera w trakcie bramki ma jakiś warunek pamięci komputera?
  - Answer: bez warunku — zadanie nie dokłada nowego obciążenia, tylko zmienia to, kto włącza Dockera; bramka z włączonym Dockerem to stan, w którym te testy i tak mają biec.
  - Not chosen:
    - bez startu, gdy wolnej pamięci jest mniej niż próg — trzeba ustalić liczbę i dochodzi nowy powód pominięcia testu
  - Source: doradca dnia w imieniu Mariusza, 2026-11-13: „4 a”.
- 5. Kto sprawdza w cyklu, że bramka naprawdę włącza wyłączony Docker Desktop?
  - Answer: agent cyklu sam wyłącza Docker Desktop (`docker desktop stop`) i puszcza bramkę — zmiana tylko na tym komputerze, łatwa do odwrócenia; zanim go wyłączy, sprawdza, że nic innego z niego nie korzysta: `docker ps` bez kontenerów i żadna inna bramka testów loop2 nie biegnie w innym katalogu roboczym — inaczej czeka.
  - Not chosen:
    - Mariusz przy prośbie o scalenie, jako krok człowieka w cyklu — prośba otwiera się jako zablokowany szkic do czasu jego sprawdzenia
    - nikt — zostają testy na podstawionym `docker`, a prawdziwy start pozostaje niesprawdzony
  - Source: doradca dnia w imieniu Mariusza, 2026-11-13: „5 a. Do 5 a warunek: zanim agent wyłączy Docker Desktop, niech sprawdzi, że nic innego z niego nie korzysta (docker ps bez kontenerów, żadna inna bramka testów loop2 nie biegnie w innym katalogu roboczym) — inaczej czeka.”

## Context

- Pliki testów, które dziś pomijają się bez demona Dockera: `tests/deploy/test_account_storage.py`, `tests/deploy/test_account_backup_stream.py`, `tests/deploy/test_loop2_image_icons.py`, `tests/deploy/test_loop2_tunnel_image.py`, `tests/deploy/test_restore_trial.py`, `tests/invariants/test_loop2_container_icons.py`, `tests/invariants/test_loop2_container_sprites.py`, `tests/invariants/test_loop2_one_serving_process_container.py`; odczyt `git grep` na commicie `2b4d760c`, 2026-11-13.
- Funkcja `docker_answers`, która pyta demona przez `docker version` z limitem 30 sekund, stoi w pięciu kopiach (`tests/deploy/test_account_storage.py:89`, `tests/deploy/test_loop2_image_icons.py:70`, `tests/invariants/test_loop2_container_icons.py:91`, `tests/invariants/test_loop2_container_sprites.py:94`, `tests/invariants/test_loop2_one_serving_process_container.py:139`); `tests/deploy/test_loop2_tunnel_image.py:26` sprawdza demona po swojemu, a `test_account_backup_stream.py` i `test_restore_trial.py` biorą funkcję z `test_account_storage.py`.
- Jeden plik testu uruchomiony bez Dockera kończy się już dziś porażką „No test executed in the selected file.”, bo same pominięte testy nie są sukcesem (`scripts/test.py:36`, D-77).
- Bramka uruchamia katalogi testów Pythona po kolei, każdy w osobnym procesie (`.the-way/gate/run_tests.py:93`), więc to, że start Dockera już się nie udał, samo nie przechodzi z jednego katalogu do drugiego.
- Na tym komputerze jest polecenie `docker desktop start` z opcjami `--timeout` i `--detach` (wtyczka Docker Desktop CLI v0.4.3; odczyt `docker desktop start --help`, 2026-11-13).
- `docker desktop status` pokazało `stopped`, choć demon w tej samej chwili odpowiadał na `docker version` (2026-11-13), więc ten status nie mówi, czy demon odpowiada.
- Komputer ma 31,8 GiB pamięci, a maszyna wirtualna Docker Desktop ma do dyspozycji do 15,5 GiB (`docker info`, pole `MemTotal`, 16651759616 bajtów; odczyt 2026-11-13).
- W rejestrze problemów audytu procesu trzy razy narzędzie agenta przerwało pełną bramkę loop2 z braku pamięci (wpis `air-539`, odrzucony jako poprawka poza the way); nie wiadomo, czy Docker był wtedy włączony.
- Odpowiedzi na pytania 1–5, wiersz 4 tabeli ustaleń i przyjęcie całego dokumentu dał 2026-11-13 doradca dnia w imieniu Mariusza, który był wtedy poza komputerem i przekazał mu decyzje; Mariusz nie widział dokumentu przed przyjęciem.

## Questions carried to cycle

- Gdzie w kodzie stoi start Dockera: w skrypcie bramki `scripts/test.py`, we wspólnym pomocniku testów, czy w obu — wybór cyklu, w granicach odpowiedzi na pytania 1–3 i kryterium jednego czekania na przebieg (źródło: pierwsza wersja tej notatki, wątek „Gdzie włączać”).

## Human actions

none

## Decisions in play

- D-77 — How are tests selected and limited as a whole? — „`npm test` without arguments runs the full gate; `npm test -- <test file>` accepts exactly one test file and runs only it, building the game first for Node but not for Python, without other tests or the foundation check. A focused run with no executed test or a file that is not a test fails, and only the full gate suffices before a request. There is no configuration file limiting the whole run; a whole-run limit is reconsidered on a concrete problem with diagnosis time or a hanging run, while new or changed tests still bound their own waiting.”
- D-84 — Which real mechanisms do new or changed tests exercise? — „A test of file or HTTP failure uses real temporary files or a real local server, waits for a readiness event or condition with a time limit and error handling, and cleans up its files, servers and processes even after failure; polling a condition is allowed, and controlled responses test reactions to forced failures without proving the replaced operation.”

## Settlements to record

Candidates: 7 shown, 4 accepted — 2026-11-13

| # | Settlement | Kind | Source | What the cycle would otherwise guess |
|---|---|---|---|---|
| 1 | Test potrzebujący Dockera, gdy demon nie odpowiada, a na komputerze jest Docker Desktop, sam go uruchamia i czeka najwyżej 3 minuty, przy pełnym `npm test` i przy jednym pliku; pomija się dopiero, gdy Docker nie wstanie, a bez Docker Desktop pomija się od razu. | decision | Questions to settle: „Kto włącza Dockera…”, pytania 1 i 2; To do 4 | czy nowy test potrzebujący Dockera ma korzystać ze startu, czy wolno mu pominąć się od razu, i jaki limit czekania przyjąć |
| 2 | Docker Desktop włączony przez bramkę zostaje włączony po przebiegu. | decision | Questions to settle, pytanie 3 | czy bramka ma po sobie wyłączyć Dockera, którego włączyła |
| 3 | Bramka włącza Dockera bez względu na wolną pamięć komputera. | decision | Questions to settle, pytanie 4 | czy dodać próg wolnej pamięci, poniżej którego bramka nie włącza Dockera |
| 4 | Gdy Docker Desktop nie wstanie w limicie, jeden przebieg bramki czeka na niego najwyżej raz. | invariant | Acceptance criteria; przyjęte przez doradcę dnia w imieniu Mariusza, 2026-11-13: „4 tak” | czy kolejne testy w tym samym przebiegu mogą znów czekać pełny limit — przy ośmiu plikach nawet 24 minuty |

## Out of scope

- Docker na serwerze testowym i wdrożenie — zadanie dotyczy tylko bramki testów na komputerze, na którym biegnie.
