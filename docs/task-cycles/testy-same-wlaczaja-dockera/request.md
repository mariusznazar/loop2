**State: ready** — two items under *Fix or let through* wait for your answer; nothing else needs you, and neither blocks the merge.

## What you will see

When a game test needs Docker and no Docker answers, the test run now starts Docker Desktop on its own and waits for it, at most 3 minutes, instead of skipping the test. This holds for the full `npm test` and for a run of one test file. If Docker Desktop does not come up in those 3 minutes, the tests that need it skip with a message saying that the start was tried and what stays unchecked, and the run waits for Docker only once, however many tests need it. On a computer with no Docker Desktop (Linux, a cloud container) the tests skip at once, as before. Docker Desktop that the run started stays on afterwards; the run never turns it off.

The cycle also checked this for real on this computer: it turned Docker Desktop off with nothing else using it, ran the full `npm test`, and the run started Docker Desktop itself. All 553 tests ran, none was skipped, and the run ended green.

### Underneath

The eight test files that need Docker no longer carry their own copy of "does a Docker daemon answer?"; they ask one shared helper, which does the start and remembers a failed start for the rest of the run.

## For you to decide

### Needed from you

none

### Fix or let through

1. Three smaller findings were left unfixed; you can fix them here, make a task of any of them, or let them through. (a) One sentence the change added to the description of the build part is easy to misread: it can read as if the test run also started the mutation analysis, and it leaves out "where Docker Desktop is installed". Whoever reads that description will see it; the cost of fixing it here is one correction round (a fix and its review), and the cost of leaving it is a sentence that is slightly off. (b) If Docker does not refuse the connection but hangs, the first test that needs Docker can wait up to about one minute beyond the 3 minutes. You would feel it only on a run where Docker hangs; fixing it here is a correction round with a change to the helper and its tests, and leaving it means that rare run is up to a minute longer than the rule says. (c) If someone starts the process's own test runner directly instead of `npm test`, the wait happens once for each test folder that needs Docker, so up to 3 minutes each. The project asks for `npm test`, so you would meet this only by running the runner by hand, and it cannot be fixed here because that runner belongs to the pinned process. I recommend making a task of (b), which can add real time to a run, and letting (a) and (c) through. For each of the three: fix it in this request, make a task of it, or let it through?
2. The review of the whole change read 13 of the 92 decisions it selected in full and went through the other 79 by title; it named seven of them (on failure logging, the restore trial, test ports, the container and the memory limit of document tests) as not read in full and judged that none concerns Docker or the test run. If it was wrong, a conflict would show up later in a test or a review, not now. Having a fresh reviewer read those seven costs another review round and some minutes; leaving it costs nothing today, and the full test run, the foundation check and a search of the whole foundation for Docker found no conflict. I recommend letting it through. Have a fresh reviewer read them in this request, or let it through?

### You accept by merging

Merging accepts these items; if one does not suit you, say which.

3. The cycle chose where the start of Docker lives: in a shared helper that each Docker test asks when it needs a daemon, not in the test script alone. Only a test can know that it needs Docker, so this serves the single-file run too; starting in the test script before the stages would have served only the full run. The cycle also chose that Docker Desktop is recognised by its command being present on the computer, not by the operating system's name; that after a failed start later tests skip at once without asking Docker again, even if Docker came up by hand a moment later; that the 3-minute limit can be changed for a single run with an environment setting, which the tests use to wait seconds, not minutes; and that the guidelines for writing tests now say that a test needing Docker asks the helper instead of keeping its own check, written directly by the author of the change, because it only repeats what a decision already says.
4. The cycle wrote two foundation entries you did not see at the task. One records, as a fact about the Docker tool, that starting Docker Desktop with the "detach" option does not wait for it to finish, which is why the helper polls the daemon itself; its source is the Docker documentation page, checked against the live page. The other is one sentence in the description of the build part of the project, saying that its test run starts Docker Desktop for a test that needs a daemon where none answers.
5. One new rule is recorded as an invariant: in one test run, a start that did not finish in time is waited for once, and later tests that need Docker skip at once. A new test file proves it by running the real test script with a stand-in for Docker. The eight Docker test files keep what they check; only the way they get a daemon changed. No invariant is marked violated.

## Cost

The cycle's own stages took 0:50:58 of working time and 35.6 million tokens in all (mostly cached input), all on one model family (Sonnet 5.5): one author, one review of the whole change, one fix, one review of the fix, one return step with its review. Two full test runs on this computer are on top: about 30 minutes on the unchanged project at the start and about 41 minutes on the final tree. The table of stages is in the committed record: https://github.com/mariusznazar/loop2/blob/RECORD_SHA/docs/task-cycles/testy-same-wlaczaja-dockera/stages.md

## How to merge

Merge with a merge commit so that the commits stay, since the link to the record of the cycle survives only then. Nothing here waits for a review of the foundation.

<details>
<summary>W Twoim języku</summary>

**Stan: gotowe** — dwie pozycje w „Popraw albo przepuść” czekają na Twoją odpowiedź; nic poza tym nie wymaga Ciebie i żadna nie blokuje scalenia.

## Co zobaczysz

Gdy test gry potrzebuje Dockera, a żaden Docker nie odpowiada, przebieg testów sam włącza teraz Docker Desktop i czeka na niego najwyżej 3 minuty, zamiast pomijać test. Dotyczy to pełnego `npm test` i uruchomienia jednego pliku testu. Jeśli Docker Desktop nie wstanie w tych 3 minutach, testy, które go potrzebują, pomijają się z komunikatem, że start był próbowany i co zostaje niesprawdzone, a przebieg czeka na Dockera tylko raz, niezależnie od liczby takich testów. Na komputerze bez Docker Desktop (Linux, kontener w chmurze) testy pomijają się od razu, jak dotąd. Docker Desktop włączony przez przebieg zostaje włączony po nim; przebieg go nigdy nie wyłącza.

Cykl sprawdził to też naprawdę na tym komputerze: wyłączył Docker Desktop, gdy nic innego z niego nie korzystało, puścił pełne `npm test` i przebieg sam włączył Docker Desktop. Wykonało się wszystkie 553 testy, żaden nie został pominięty, a przebieg skończył się na zielono.

### Pod spodem

Osiem plików testów potrzebujących Dockera nie ma już własnej kopii pytania „czy demon Dockera odpowiada?”; pytają jednego wspólnego pomocnika, który włącza Dockera i zapamiętuje nieudany start do końca przebiegu.

## Do rozstrzygnięcia

### Potrzebne od Ciebie

none

### Popraw albo przepuść

1. Trzy drobniejsze uwagi zostały niepoprawione; możesz je poprawić tutaj, zrobić z którejś zadanie albo przepuścić. (a) Jedno zdanie dodane do opisu części budowania w projekcie łatwo źle odczytać: da się je zrozumieć, jakby przebieg testów włączał też analizę mutacji, i brakuje w nim „tam, gdzie jest Docker Desktop”. Zobaczy to każdy, kto czyta ten opis; poprawa tutaj to jedna runda korekty (poprawka i jej przegląd), a zostawienie to zdanie trochę nieścisłe. (b) Jeśli Docker nie odrzuca połączenia, tylko się zawiesza, pierwszy test potrzebujący Dockera może poczekać do około minuty ponad te 3 minuty. Poczujesz to tylko w przebiegu, w którym Docker się zawiesza; poprawa tutaj to runda korekty ze zmianą pomocnika i jego testów, a zostawienie oznacza, że taki rzadki przebieg trwa do minuty dłużej, niż mówi reguła. (c) Jeśli ktoś uruchomi własny skrypt testów procesu bezpośrednio zamiast `npm test`, czekanie zdarzy się raz dla każdego katalogu testów potrzebującego Dockera, czyli do 3 minut dla każdego. Projekt wymaga `npm test`, więc spotkasz to tylko przy ręcznym uruchomieniu tego skryptu, i nie da się tego poprawić tutaj, bo ten skrypt należy do przypiętego procesu. Polecam zrobić zadanie z (b), które może dodać realny czas do przebiegu, a (a) i (c) przepuścić. Dla każdej z trzech: poprawić w tej prośbie, zrobić zadanie czy przepuścić?
2. Przegląd całej zmiany przeczytał w całości 13 z 92 wybranych decyzji, a pozostałe 79 przejrzał po tytułach; siedem z nich (o zapisie awarii, próbie odtworzenia, portach testów, kontenerze i limicie pamięci testów dokumentu) nazwał nieprzeczytanymi w całości i uznał, że żadna nie dotyczy Dockera ani przebiegu testów. Jeśli się mylił, konflikt wyjdzie później w teście albo w przeglądzie, nie teraz. Przeczytanie tych siedmiu przez świeżego recenzenta kosztuje kolejną rundę przeglądu i kilka minut; zostawienie nic dziś nie kosztuje, a pełny przebieg testów, kontrola fundamentu i przeszukanie całego fundamentu pod kątem Dockera nie znalazły konfliktu. Polecam przepuścić. Dać świeżemu recenzentowi do przeczytania te decyzje w tej prośbie, czy przepuścić?

### Przyjmujesz przez scalenie

Scalenie przyjmuje te pozycje; jeśli któraś Ci nie odpowiada, powiedz która.

3. Cykl wybrał, gdzie mieszka start Dockera: we wspólnym pomocniku, o którego pyta każdy test potrzebujący Dockera, a nie w samym skrypcie testów. Tylko test wie, że potrzebuje Dockera, więc to obsługuje także uruchomienie jednego pliku; start w skrypcie przed etapami obsłużyłby tylko pełny przebieg. Cykl wybrał też, że Docker Desktop rozpoznaje się po obecności jego polecenia na komputerze, a nie po nazwie systemu; że po nieudanym starcie kolejne testy pomijają się od razu, bez ponownego pytania Dockera, nawet gdyby chwilę później ktoś włączył go ręcznie; że limit 3 minut można zmienić na jeden przebieg ustawieniem środowiska, z którego korzystają testy, by czekać sekundy, nie minuty; oraz że wytyczne pisania testów mówią teraz, że test potrzebujący Dockera pyta pomocnika zamiast trzymać własne sprawdzenie, co autor zmiany zapisał bezpośrednio, bo to tylko powtarza to, co mówi już jedna decyzja.
4. Cykl zapisał dwa wpisy fundamentu, których nie widziałeś przy zadaniu. Jeden zapisuje jako fakt o narzędziu Docker, że włączenie Docker Desktop z opcją „detach” nie czeka na zakończenie, dlatego pomocnik sam odpytuje demona; źródłem jest strona dokumentacji Dockera, sprawdzona z żywą stroną. Drugi to jedno zdanie w opisie części budowania w projekcie, mówiące, że jej przebieg testów włącza Docker Desktop dla testu potrzebującego demona, gdy żaden nie odpowiada.
5. Zapisano jedną nową regułę jako niezmiennik: w jednym przebiegu testów start, który nie zdążył, jest czekany raz, a kolejne testy potrzebujące Dockera pomijają się od razu. Dowodzi tego nowy plik testu, który uruchamia prawdziwy skrypt testów ze stand-inem Dockera. Osiem plików testów Dockera sprawdza to samo co dotąd; zmieniło się tylko, skąd biorą demona. Żaden niezmiennik nie jest oznaczony jako naruszony.

</details>

## Technical changes

The change adds a start of Docker Desktop for a test that needs a daemon, and moves the eight Docker test files onto it. In more detail:

- `7fc5d456` — adds `scripts/docker_gate.py` (the helper: `require_daemon`, the start by `docker desktop start --detach`, polling of `docker version` until a 180 s limit that `LOOP2_DOCKER_START_LIMIT` can lower, the record of a start that did not finish in a state file named by `LOOP2_DOCKER_RUN_STATE`, which `scripts/test.py` creates for each run and the per-directory processes inherit), wires it into `scripts/test.py`, and adds the stand-in `docker` (`tests/quality/docker_standin.py`), its tests (`tests/quality/test_docker_gate.py`, 11 cases) and a change to `tests/quality/gate_fixture.py`.
- `4328f44b` — the eight test files that skipped without a daemon (`tests/deploy/test_account_storage.py`, `test_account_backup_stream.py`, `test_loop2_image_icons.py`, `test_loop2_tunnel_image.py`, `test_restore_trial.py`, and `tests/invariants/test_loop2_container_icons.py`, `test_loop2_container_sprites.py`, `test_loop2_one_serving_process_container.py`) ask the helper; the five copies of `docker_answers` and the tunnel-image test's own check are gone.
- `fe779640` — foundation entries (see below).
- `dfd039ed` — fix of the whole-change review's Minor findings 1 and 4: the skip says the gate "tried to start" Docker Desktop, and the timing bounds of the new tests are looser.
- `39f54705` — fix of Minor findings 2 and 3: the unsourced claim about the Docker Desktop status is removed from D-390's rationale and a docstring, and `guidelines/testing.md` says how a test asks the gate for a daemon.
- `20517ed8` — return step: one sentence in the `build-tools` entry of `foundations/part_map.md`.

## Checks

- Gate: `npm test` on the final tree (head `20517ed8`), run with Docker Desktop turned off beforehand → exit 0, 553 tests in 4 directories, every directory passed, `0 errors` from the foundation check, 0 skipped lines (its summary is in the record; the full log is kept outside it). On the unchanged base the same command exited 1 for two tests (`test_ruff_source_rules`, `test_shellcheck_source_rules`) only because the fresh working copy had no `.runs/quality-venv`; with it those pass (5 tests, exit 0), and the foundation check gave 0 errors. Nothing failed and passed again; nothing did not run.
- The real start (task To do 6): before the run, `docker desktop stop` exit 0 with no container in `docker ps` and no other loop2 gate running (the cycle waited until two other working copies' gates had ended); `docker version` then failed (daemon pipe missing); after the run the daemon answered (`29.7.2`), so the run started Docker Desktop and left it on (To do 5). The time the start took was not recorded.
- Own-work check of the author: `test_one_run_of_the_whole_gate_waits_for_a_docker_that_does_not_rise_once` runs the real `scripts/test.py` and the pinned runner over two test directories with a stand-in `docker` that never answers: exit 0, exactly one `desktop start`, two skips; with the recorded-gap check removed it fails (`2 != 1`), shown by the author and again by the reviewer.
- The stand-in does not prove the real start; the real start is the run above. The default 180 s limit is not exercised by any test.
- Not user-interface work; no screenshot.
- Form check, private-paths check and image check on this description and on the copy of the record: filled in with the record's link.
- Remarks check: filled in with the record's link.

## Foundation entries

- D-390 (`row 1`) — a test needing a daemon, finding none on a computer with Docker Desktop, starts it and waits at most 3 minutes, in a full run and in a single-file run; it skips only if none answers; with no Docker Desktop it skips at once.
- D-391 (`row 2`) — Docker Desktop started by the gate stays running; the gate does not stop it.
- D-392 (`row 3`) — the gate starts Docker Desktop whatever the free memory; no memory threshold.
- `gate-docker-start-waits-once` (`row 4`, invariant) — in one gate run a start that did not finish in its limit is waited for once; later tests needing a daemon skip at once.
- `docker-desktop-start-detach` (`the cycle's`, environment fact) — `docker desktop start` starts Docker Desktop and with `--detach` does not synchronously wait.
- `build-tools` entry of `foundations/part_map.md` (`the cycle's`, return step) — the part's test run starts Docker Desktop for a test that needs a daemon where none answers.
- Invariant test: `tests/quality/test_docker_gate.py` carries `gate-docker-start-waits-once` (new, failing run and passing run shown by the author). Altered tests that cite invariants — `tests/deploy/test_account_storage.py` (`account-schema-lifecycle`) and the container tests above — changed only how they obtain a daemon. No surface altered; no *Violated* mark set or cleared.

## Minor findings

- Return-step review (`PASS 20517ed8…`), Minor, `foundations/part_map.md:86`: "the relative clause sits in the middle of a list. The sentence reads 'installs dependencies, runs the test gate, which starts Docker Desktop for a test that needs a Docker daemon where none answers, and mutation analysis, checks code quality and types, ...'. The clause 'which starts ... answers' is closed by a comma, and the next words, 'and mutation analysis', can be read as continuing it ('which starts Docker Desktop ..., and [starts] mutation analysis'). The reading is false, because the gate does not start mutation analysis. A reader still gets the right sense from the rest of the list, so this does not block. Suggested form: move the clause after 'mutation analysis' ... or make it two list items."
- Return-step review, Minor, same line: the sentence "does not carry 'where Docker Desktop is installed'" that D-390 states; the reviewer graded it Minor because "Docker Desktop cannot be started where it is absent, so the sentence does not claim anything the code or D-390 contradicts", "an optional wording remark".
- Review of the fix, a note, no finding: "the whole-run no-plugin case now uses a 120-second limit and a 100-second bound, so its bound is loose by design; its real guard is the count of starts (0) and of the skip lines (2), and the wait is shown by the other cases. It costs nothing to leave." No place in the code beyond `tests/quality/test_docker_gate.py`.

## Findings outside the task's scope

- Review of the whole change, outside the task, `scripts/docker_gate.py:15-17` and `state_file()`: "the 'waits once per run' guarantee holds for `npm test`, not for a run of the-way's Python runner started alone ... `python .the-way/gate/run_tests.py` waits once per directory (up to 3 minutes each). The invariant and the task's acceptance criterion speak of 'one run of the gate', which is `npm test`, so I do not count this against the change; mentioned because the pinned `.the-way` cannot be edited here."
- Review of the whole change, outside the task, `scripts/docker_gate.py:120-133` (`daemon_gap`): "the first `daemon_answers()` (up to 30 s) and `desktop_present()` (up to 30 s) run before `deadline` is taken, and `start_desktop()` (up to 60 s) is inside it. With a daemon that hangs rather than refuses, a first test can wait 3 minutes + up to 60 s. D-390 says 'at most 3 minutes'. The ordinary case (a stopped Docker Desktop refuses at once) is unaffected; I could not produce the hanging case without the real Docker."
- No check of a file outside the task's parts failed in a cycle run and passed again.

## Course of the cycle

- **Task and sources:** the task document "Testy gry same włączają Dockera, gdy nie odpowiada" (independent task, accepted 2026-11-13); the product foundation and guidelines at base `1b0c8ad4`.
- **Process pin:** `55afa8e57aa1b83c77108576a36642722e0dda15`; not moved.
- **Spec:** none; no open design choice (the choice where the start lives was carried to the cycle within settled answers).
- **Route:** one author without a plan, class `same` as the orchestrator; the change touches build-tools, deployment, test-helpers and the foundation entries.
- **Plan:** none.
- **Choices:** 3 choices in the cycle's questions table (where the start lives, the author's unread material carried to the reviewer, the environment fact the task did not carry), plus the author's own choices named in its report; table in the record.
- **Blocking findings left:** none.
- **Record:** https://github.com/mariusznazar/loop2/tree/RECORD_SHA/docs/task-cycles/testy-same-wlaczaja-dockera
