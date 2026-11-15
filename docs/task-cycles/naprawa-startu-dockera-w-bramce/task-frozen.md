<!-- Frozen copy. Original: the task's note in the author's backlog ; approval: Settlements candidates accepted 2026-11-14 (document updated 2026-11-14), read at the start of the cycle -->
---
title: "loop2: naprawa startu Docker Desktop w bramce przy katalogach Pythona obok siebie"
status: draft
created: 2026-11-14T20:59
updated: 2026-11-14
tags: [zadanie]
related: "the project's note in the author's notes"
---

# loop2: naprawa startu Docker Desktop w bramce przy katalogach Pythona obok siebie

Status: ready for cycle
Project relation: independent
Defect introduced by: none

## Description

### Need

- Pełna bramka testów (`npm test`) uruchamia dziś katalogi testów Pythona po kolei i trwa 23–31 minut; z katalogami obok siebie trwała 18–20 minut.
- Po kolei biegną dlatego, że przy katalogach obok siebie dwa procesy zastają Docker Desktop zatrzymany w tej samej chwili i oba go uruchamiają i na niego czekają, więc padają dwa testy, które pilnują jednego startu (D-406).
- Odczuwa to Mariusz i agent prowadzący cykl zadania: każdy cykl czeka na bramkę co najmniej raz, zwykle trzy razy, więc różnica 5–10 minut wraca przy każdym czekaniu, a przy kilku cyklach naraz bramki wydłużają się nawzajem.
- Bez zmiany nic się nie psuje: bramka zostaje na 23–31 minutach, a powód stoi w dzienniku decyzji.

### To do

1. Start Docker Desktop, który zaczął jeden proces bramki, jest widoczny dla pozostałych procesów tego samego przebiegu, zanim zaczną własny start, tak że przebieg z katalogami testów Pythona obok siebie uruchamia Docker Desktop najwyżej raz i czeka na niego najwyżej raz, bez względu na to, które katalogi potrzebują demona (warunek z D-406). Usterka stoi w `scripts/docker_gate.py`, w funkcji `daemon_gap` (około linii 125–150): zapis o starcie, który się nie skończył, powstaje dopiero po końcu czekania, a proces czyta go przed własnym startem.
2. Sprawdzenie, czy testy używające Dockera w `tests/deploy` i `tests/invariants` mogą się zderzyć, gdy oba katalogi biegną naraz — nazwy kontenerów, obrazów, wolumenów i sieci; zderzenie, które się znajdzie, prośba wymienia z nazwą testu.
3. Trzy pełne przebiegi `npm test` z katalogami obok siebie, czyli bez `--jobs 1`, na tym komputerze takim, jaki jest, mierzone jak w #130: `python -B .the-way/task-cycle/gate_times.py --output … -- npm.cmd test`. Każdy test, który padnie, biegnie jeszcze raz na tym samym drzewie przy `--jobs 1`. Prośba podaje czasy trzech przebiegów i każdą porażkę z wynikiem jej powtórki.
4. Gdy żadna porażka trzech przebiegów nie występuje tylko przy katalogach obok siebie: D-406 dostaje nową odpowiedź na swoje pytanie, że pełna bramka uruchamia katalogi testów Pythona naraz (wiersz 1 w „Settlements to record”), a razem z nią schodzi `--jobs 1` z etapu testów Pythona w `scripts/test.py` (komentarz zaczynający się od „One directory at a time”), testu, który przypina ten argument (`tests/quality/test_test_gate.py`, przypadek `test_the_whole_gate_runs_its_stages_and_gives_the_python_runner_one_job`, z linią `decision: D-406`), i zdania o biegu po kolei w `README.md`, w akapicie o `npm test` („przez `python -B .the-way/gate/run_tests.py --jobs 1`, więc katalogi biegną jeden po drugim”); w tej samej zmianie cykl poprawia ostatnie zdanie uzasadnienia D-405 („the full gate now runs them one after another (D-406)”), które wtedy przestaje być prawdą — zmienia się tylko uzasadnienie, odpowiedź D-405 zostaje. Gdy taka porażka jest: `--jobs 1` i D-406 zostają, prośba idzie do scalenia z samą naprawą startu i wymienia padające testy do osobnego zadania (pytanie 1).

### Acceptance criteria

- Testy klasy `GateRuns` w `tests/quality/test_docker_gate.py`, w tym `test_one_run_of_the_whole_gate_waits_for_a_docker_that_does_not_rise_once` i `test_a_whole_run_that_finds_docker_stopped_starts_it_once_and_skips_nothing`, przechodzą, gdy bramka uruchamia katalogi obok siebie.

### Questions to settle

- 1. Co robi zadanie, jeśli trzy przebiegi po naprawie startu pokażą porażki, które występują tylko przy katalogach obok siebie (przy `--jobs 1` przechodzą)?
  - Answer: a — zadanie scala samą naprawę startu; bieg po kolei (`--jobs 1`) i D-406 zostają, a padające testy prośba wymienia do osobnego zadania.
  - Not chosen:
    - b) zadanie naprawia też te porażki — zakres nieznany, cykl może urosnąć kilkukrotnie; z tego samego powodu odrzucone w #130.
    - c) cykl staje i otwiera wstrzymaną prośbę z wynikami, decyzja zapada wtedy — dodatkowa tura z człowiekiem.
  - Source: doradca dnia w imieniu Mariusza, 2026-11-14: „pytanie 1 — a. Scal samą naprawę startu, bieg po kolei i D-406 zostają, a padające testy prośba wymienia do osobnego zadania. Podstawa: przypadek mało prawdopodobny, naprawa startu i tak ma wartość, a b to nieznany zakres (odrzucony już w #130).”

## Context

- Źródło zadania: pull request #130 repozytorium loop2 (https://github.com/mariusznazar/loop2/pull/130), sekcja „Findings outside the task's scope”, pozycja 1.
- Zapis cyklu #130, usunięty z końcowego drzewa: `git show c7900a9b5735b055e95e5ea80cf816c2051d3b65:docs/task-cycles/krotsza-bramka-procesu/cycle.md`; dzienniki przebiegów (`reports/gate-pin-run1.log`–`run3.log`, `gate-final.log`) leżą w tym samym katalogu tego commita.
- Dowód usterki: trzy pełne przebiegi `npm test` na commicie `6b4487d1` (katalogi obok siebie) padły za każdym razem na tych samych dwóch testach z `GateRuns`, oba `AssertionError: 2 != 1` (dwa starty zamiast jednego); ten sam plik testów przy `--jobs 1` przechodzi w całości (12 testów).
- Oba padające testy uruchamiają w środku własną, mniejszą bramkę z prawdziwym `scripts/test.py` i podstawionym `docker` (`tests/quality/docker_standin.py`) na dwóch katalogach; padały, bo ta wewnętrzna bramka puszczała swoje dwa katalogi naraz, nie przez prawdziwy Docker.
- W tych trzech przebiegach z #130 wszystkie prawdziwe testy Dockera w `tests/deploy` i `tests/invariants` biegły z katalogami obok siebie i przeszły; jedyne wiersze `skipped:` w dziennikach to wyjście wewnętrznej bramki z padających testów (revision `c7900a9b`, `reports/gate-pin-run1.log`–`run3.log`).
- Pomocnicy testów nadają kontenerom, obrazom i wolumenowi danych nazwy z losowym przyrostkiem (`uuid.uuid4().hex`), np. `tests/invariants/account_container_support.py:75`–`76`, `tests/deploy/test_loop2_tunnel_image.py:37`–`38`, `tests/deploy/test_account_storage.py:101`–`102` (revision `9e13af95`); testy nie tworzą sieci Dockera. Według karty D1 w notatce o usprawnieniach the way Dockera używa 18 z 20 plików `tests/deploy` i 16 z 57 plików `tests/invariants`.
- Stan startu jest jednym plikiem na cały przebieg bramki: `scripts/test.py` daje go przez `docker_gate.shared_state()`, a procesy katalogów dziedziczą zmienną `LOOP2_DOCKER_RUN_STATE`.
- `Defect introduced by: none`: gdy wchodził start Docker Desktop (commit `7fc5d456`, D-390), przypięty the-way (`55afa8e`) uruchamiał katalogi po kolei, więc kod spełniał swoje wymaganie; katalogi naraz przyniosło przesunięcie przypięcia w #130, które od razu dodało `--jobs 1`. Zadanie jest nową potrzebą: krótszą bramką.
- Punkt odniesienia z #130. Katalogi obok siebie: 1117,6 s, 1099,4 s, 1176,3 s (18,3–19,6 min); `tests/invariants` 1016–1068 s, `tests/deploy` 848–925 s; w szczycie komputer zużywał 3,7–5,6 GB ponad stan z początku przebiegu, najmniej wolnej pamięci 8,4 GB z 31,8 GB. Katalogi po kolei: 1836,7 s (30,6 min), w tym `tests/invariants` 817,5 s, `tests/deploy` 831,6 s, `tests/quality` 95,9 s.
- Wcześniejszy pomiar z 12.11 (notatka poza repozytorium): 23–24 min na wolnej maszynie, 24,0–28,0 min z jednym cyklem obok; czemu ostatni przebieg po kolei był dłuższy, nie ustalono.
- Rozważone i odrzucone wcześniej: naprawa w samym zadaniu #130 (odrzucona w jego pytaniu 2, bo zakres był nieznany); testy Node obok katalogów Pythona (odrzucone w D-405).
- Na tym komputerze bramki cykli idą po jednej: przed każdym pełnym przebiegiem testów cykl pisze do sesji koordynującej komputer (doradca dnia) i czeka na jej sygnał `start`.
- Zapis sesji, w której powstała notatka źródłowa (cykl #130), plik lokalny poza repozytorium, wygasa ~2027-02-12: `the session transcript of the cycle of the earlier task (a local file outside the repository)`; czytany tylko jako tekst z `python "the author's session-extraction script (outside the repository)" --session 324d980c-a7d6-40a0-b3ff-183f5cb3e0a7 --format text --out <katalog roboczy>/zapis_sesji.txt`.

## Questions carried to cycle

- Jak start w toku staje się widoczny dla innych procesów (blokada pliku stanu, osobny zapis „start w toku” albo inny sposób) i co się dzieje z zapisem procesu, który zginął w trakcie startu — wybór sposobu należy do cyklu; od niego zależy, o jakie przypadki trzeba rozszerzyć `tests/quality/test_docker_gate.py`.
- Czym nowa odpowiedź D-406 zastępuje test przypinający `--jobs 1`, gdy D-406 ją dostaje (punkt 4 „To do”).

## Human actions

none

## Decisions in play

- D-406 — „Does the full gate run the directories of Python tests one after another or at the same time?”: „The full gate runs the directories of Python tests one after another, giving the runner of the Python tests `--jobs 1`, and does not run them at the same time. `--jobs 1` is withdrawn only together with a repair of the isolation of the tests that need Docker, after which a run of the gate with the directories at the same time starts Docker Desktop at most once and waits for it at most once, whichever directories need a daemon, so that `gate-docker-start-waits-once` holds in it.” Zmiana, którą niesie zadanie: gdy żadna porażka trzech przebiegów nie występuje tylko przy katalogach naraz, D-406 dostaje w miejscu nową odpowiedź — pełna bramka uruchamia katalogi naraz (wiersz 1); gdy taka porażka jest, D-406 zostaje (pytanie 1).
- D-390 — „Who starts Docker Desktop when a test of the gate needs a Docker daemon that does not answer?”: „A test of the gate that needs a Docker daemon, finding none answering on a computer that has Docker Desktop, starts Docker Desktop and waits until a daemon answers, for at most 3 minutes, in a run of the whole gate and in a run of one test file alike. The test is skipped only when no daemon has answered by then, and its message says that the start was tried and did not finish and what stays unchecked; once a start has not finished in its limit, every later test of that run that needs a daemon is skipped at once, with no new start. On a computer with no Docker Desktop, such as one running Linux or a container in a cloud, the test is skipped at once, with a message that says what stays unchecked.” Naprawa startu go spełnia przy katalogach naraz; zdanie o jednym starcie także udanym to wiersz 2.
- D-391 — „What becomes of the Docker Desktop that the gate started, once the run is over?”: „The Docker Desktop that the gate started stays running after the run; the gate does not stop it.”
- D-392 — „Does the gate start Docker Desktop only where the free memory of the computer allows?”: „The gate starts Docker Desktop whatever the free memory of the computer is; it keeps no threshold of memory below which it does not start it.”
- D-405 — „In which order does the full gate run its stages, and where does it stop?”: „The full gate runs its stages one after another: the build, the Node tests, the directories of Python tests and the foundation check, in this order, and ends at the first stage that fails. The Node tests do not run at the same time as the directories of Python tests.” Zadanie jej nie zmienia; jej uzasadnienie kończy się zdaniem „the full gate now runs them one after another (D-406)”, które przestaje być prawdą, gdy D-406 dostaje nową odpowiedź.
- Niezmiennik `gate-docker-start-waits-once` (Derives from: D-390; Part: build-tools · deployment): „In one run of the gate, a start of Docker Desktop that has not finished in its time limit is waited for once: every later test of that run that needs a Docker daemon is skipped at once, with no new start.”

## Settlements to record

Candidates: 3 shown, 2 accepted — 2026-11-14

| # | Settlement | Goes to | Source | What the cycle would otherwise guess |
|---|---|---|---|---|
| 1 | Pełna bramka uruchamia katalogi testów Pythona naraz, bez `--jobs 1`, gdy trzy przebiegi po naprawie startu nie pokazują porażki występującej tylko przy katalogach naraz. | sentence of D-406 | notatka źródłowa zadania (2026-11-14), „Co po naprawie”, punkt 3: „Nowa decyzja w dzienniku, która wycofuje D-406”; „To do” 4; przyjęte przez doradcę dnia w imieniu Mariusza, 2026-11-14: „1 a” | czy po udanych przebiegach zapisać zmianę jako nowy numer z wycofaniem D-406, czy jako nową odpowiedź w miejscu D-406, i czy jej sens czeka na akceptację przy scaleniu |
| 2 | W jednym przebiegu bramki Docker Desktop jest uruchamiany najwyżej raz także wtedy, gdy start się udaje, a test, który prosi o demona w trakcie startu zaczętego przez inny proces, czeka na ten sam start, w jego limicie czasu, bez własnego. | sentence of D-390 | D-406, zdanie: „starts Docker Desktop at most once and waits for it at most once, whichever directories need a daemon”; „To do” 1; przyjęte przez doradcę dnia w imieniu Mariusza, 2026-11-14: „2 a” | czy zasada jednego startu przeżywa przepisanie D-406 — dziś stoi tylko w jego warunku, a D-390 i niezmiennik `gate-docker-start-waits-once` mówią o jednym czekaniu na start nieudany; i czy test udanego startu (`test_a_whole_run_that_finds_docker_stopped_starts_it_once_and_skips_nothing`) dostaje znacznik niezmiennika |

## Out of scope

- Zmiana decyzji D-405 (kolejność etapów bramki), D-77, D-83, D-49, D-73 i D-28.
- Reguły rozmiaru funkcji i pliku w `guidelines/coding.md` (osobne zadanie gry „struktura kodu”).
- Równoległość plików testów w obrębie jednego katalogu (osobny, późniejszy krok z zadania #130).
