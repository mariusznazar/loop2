**State: ready** — four items below wait for your answer (1 to 4); everything else only needs your merge.

## What you will see

The full test gate now runs its four groups of Python tests at the same time instead of one after another, and the two groups that use Docker no longer get in each other's way when Docker Desktop is stopped. Before, two groups running together would both find Docker Desktop stopped, both start it and both wait for it, so two tests that guard "one start" failed; that is why the gate ran the groups one by one and took 23 to 31 minutes. Now one group starts Docker Desktop, and the others wait for that same start. Three full runs on this computer took 19.4, 16.9 and 16.8 minutes. The only tests that failed in them are the two that also fail on the unchanged main branch because the code-quality tools they call are not installed on this computer; no test failed only because the groups ran together.

### Underneath

A group that finds Docker stopped takes a lock on a small file next to the run's shared note before it starts Docker Desktop and lets go only when it has an answer; the others wait for the lock and then ask the daemon again. The decision that said "one after another" now says "at the same time", and the decision about starting Docker Desktop says that a start is made at most once in a run.

## For you to decide

### Needed from you

none

### Fix or let through

1. The lock is used by a different system call on a Mac or on a Linux computer that has Docker Desktop, and that branch was never run: this computer is Windows and has no way to run it. If it is wrong, on such a computer two groups of tests could each start Docker Desktop, or one could wait for ever, and whoever runs the gate there sees double starts or a hang instead of the clean single start. On this Windows computer, and wherever Docker Desktop is absent (a cloud container, plain Linux), the lock is never reached or is the tested one. Running it in this request needs a session on a Mac or Linux with Docker Desktop and a round of review; making a task leaves it untried until then; letting it through accepts that risk. I recommend letting it through, since the gate runs on this Windows computer today. Run it in this request, make a task of it, or let it through? (Checks, 5)

2. In a rare case a group of tests can stop waiting for Docker Desktop too early. It needs a first group that began a start and died, a second group that restarted the start, and a third that began waiting earlier than the second and so reaches its time limit before the restarted start finishes. Then every later Docker test of that run is skipped with the message that Docker did not come up and what stays unchecked — a skip you would see, not a false pass. Fixing it in this request costs one more round of correction with its review (the cure is to ask the daemon once more before giving up, or to give up without noting it for the whole run); making a task leaves the rare skip; letting it through accepts it. I recommend letting it through, since it needs a process that died during a start and the result is a visible skip. Fix it in this request, make a task of it, or let it through? (Minor findings, 3)

3. The review of the whole change read 13 of the 64 decisions it selected as a whole and the rest by title; it named six it did not open (decisions on how tests use stand-ins and on the choice of test level), although the change touched the stand-in for the `docker` command that tests use, and it read only the first part of the description of the build-tools part. A later review of the fix and of the return step found nothing wrong in those places. Having a fresh reviewer read them costs one more review; letting it through accepts that a conflict with one of those six decisions could stay unnoticed. I recommend letting it through, since the stand-in change was compared command by command with the old one. Have it read in this request, make a task of it, or let it through? (Checks, 8)

4. One old gap stands in the foundation that this change did not touch: the rule that no part of the code imports another part's files rests on a fact that is not named anywhere (marked as a bare gap since 2026-11-08). It affects nobody today, but whoever relies on that rule cannot see what it rests on. Writing it in this request needs you to name the fact and its source; a task leaves the gap standing; letting it through leaves it on the main branch. I recommend making a task of it, since it has nothing to do with this change. Write it in this request, make a task of it, or let it through? (Foundation entries, 7)

### You accept by merging

Merging accepts these items; if one does not suit you, say which.

5. I chose how a start in progress becomes visible to the other groups: an operating-system lock on a file next to the run's shared note, held by the group that starts Docker Desktop. I did not note "start in progress" in the shared note (it needs a check whether the writer is alive, which Windows does not offer in a safe form) and did not use a marker file (a group that died leaves it behind and the others would wait for nothing). I also replaced the test that checked the one-at-a-time setting by a test of the behaviour: two groups that pass only if they run at the same time; a test of the bare setting would fail only on a deliberate change. The wait for the lock ends at the waiting group's own time limit, with the same "Docker did not come up" skip as any unfinished start.

6. Two entries the task did not carry: the decision on starting Docker Desktop gets the sentence "if the group that began the start ended before it finished, the next test to ask starts Docker Desktop again" (the task asked only for "one start, others wait"; this is how I closed the case of a group that dies; it weakens "at most once" only where something dies), and a new environment fact says that on Windows the operating system unlocks a file lock when its process ends, and that the unlocking can be delayed. I found no source for the Mac or Linux half and no page connecting the Python call to the Windows one, so the fact says only what the Windows page says. The rationale of the decision says the same, including the delay.

7. Tests that now hold a rule or a decision sentence: three new tests of the repair carry a note of the decision on starting Docker Desktop, two of them also of the rule that a start that did not finish is waited for once (that rule is unchanged); the two older tests of a whole run now also carry a note of the decision to run the groups at the same time; the old test of the one-at-a-time setting is replaced by two tests, one of which holds the new answer. The foundation check lists the same 23 old entries "held by nothing" as before, and none of them is one this change touched.

## Cost

Agents worked 55 minutes 32 seconds in turns (of which 28 minutes 15 seconds waiting for their tools), and the three full gate runs took 19.4, 16.9 and 16.8 minutes (not counted in that figure). All agents ran on one model, `claude-sonnet-5-5`; 45.4 million tokens in all (44.2 million of them read from the cache, 221 thousand written as output). Two rounds of fix and review of the fix ran: one for the review of the whole change (one blocking finding and four Minor findings fixed), one for the review of the return step (one blocking finding: an environment fact was missing). The table of stages is in the committed record (`stages.md`), linked under *Course of the cycle*.

Directories of earlier tasks still stand because the script could not tell they were no longer needed; nothing in this request waits for them and you may remove them by hand; their names, branches and reasons stand in *Checks*.

## How to merge

Merge with a merge commit (not squash or rebase), since the link to the record of the cycle survives only when the commits are kept.

<details>
<summary>W twoim języku</summary>

**Stan: gotowe** — cztery punkty poniżej czekają na twoją odpowiedź (1–4); reszta wymaga tylko scalenia.

## Co zobaczysz

Pełna bramka testów uruchamia teraz cztery grupy testów Pythona naraz, a nie jedna po drugiej, a dwie grupy używające Dockera nie wchodzą już sobie w drogę, gdy Docker Desktop jest zatrzymany. Wcześniej dwie grupy działające razem obie zastawały Docker Desktop zatrzymany, obie go uruchamiały i obie na niego czekały, więc padały dwa testy pilnujące „jednego startu”; dlatego bramka biegła grupami po kolei i trwała 23–31 minut. Teraz jedna grupa uruchamia Docker Desktop, a pozostałe czekają na ten sam start. Trzy pełne przebiegi na tym komputerze trwały 19,4, 16,9 i 16,8 minuty. Padły w nich tylko dwa testy, które padają też na niezmienionej gałęzi main, bo narzędzia jakości kodu, które wywołują, nie są na tym komputerze zainstalowane; żaden test nie padł tylko dlatego, że grupy biegły razem.

### Pod spodem

Grupa, która zastaje Dockera zatrzymanego, zakłada blokadę na małym pliku obok wspólnej notatki przebiegu, zanim uruchomi Docker Desktop, i puszcza ją dopiero po odpowiedzi; pozostałe czekają na blokadę i pytają demona jeszcze raz. Decyzja, która mówiła „po kolei”, mówi teraz „naraz”, a decyzja o uruchamianiu Docker Desktop mówi, że start następuje w przebiegu najwyżej raz.

## Do rozstrzygnięcia

### Potrzebne od ciebie

brak

### Napraw albo przepuść

1. Na Macu albo na komputerze z Linuksem, który ma Docker Desktop, blokadę zakłada inne wywołanie systemowe i ta gałąź nigdy nie była uruchomiona: ten komputer to Windows i nie ma jak jej uruchomić. Jeśli jest błędna, na takim komputerze dwie grupy testów mogłyby obie uruchomić Docker Desktop albo jedna mogłaby czekać w nieskończoność, a kto tam uruchamia bramkę, zobaczyłby podwójne starty albo zawieszenie zamiast czystego jednego startu. Na tym komputerze z Windows i wszędzie tam, gdzie nie ma Docker Desktop (kontener w chmurze, zwykły Linux), blokada nie jest używana albo jest ta przetestowana. Uruchomienie jej w tej prośbie wymaga sesji na Macu lub Linuksie z Docker Desktop i rundy przeglądu; zadanie zostawia ją nieprzetestowaną do tego czasu; przepuszczenie przyjmuje to ryzyko. Rekomenduję przepuścić, bo bramka biegnie dziś na tym komputerze z Windows. Uruchomić w tej prośbie, zrobić z tego zadanie czy przepuścić? (Checks, 5)

2. W rzadkim przypadku grupa testów może przestać czekać na Docker Desktop za wcześnie. Potrzebna jest pierwsza grupa, która zaczęła start i zginęła, druga, która ten start zaczęła od nowa, i trzecia, która zaczęła czekać wcześniej niż druga, więc dociera do swojego limitu czasu, zanim ponowiony start się skończy. Wtedy każdy późniejszy test Dockera w tym przebiegu zostaje pominięty z komunikatem, że Docker nie wstał, i co zostaje niesprawdzone — pominięcie, które zobaczysz, a nie fałszywe zaliczenie. Naprawa w tej prośbie kosztuje jedną rundę poprawki z przeglądem (lekarstwo: zapytać demona jeszcze raz przed poddaniem się albo poddać się bez zapisywania tego dla całego przebiegu); zadanie zostawia rzadkie pominięcie; przepuszczenie je przyjmuje. Rekomenduję przepuścić, bo trzeba procesu, który zginął w trakcie startu, a wynik to widoczne pominięcie. Naprawić w tej prośbie, zrobić zadanie czy przepuścić? (Minor findings, 3)

3. Przegląd całej zmiany przeczytał w całości 13 z 64 wybranych decyzji, a resztę po tytułach; wymienił sześć, których nie otworzył (decyzje o tym, jak testy używają zastępników, i o wyborze poziomu testu), choć zmiana dotknęła zastępnika polecenia `docker` używanego przez testy, a opis części build-tools przeczytał tylko od początku. Późniejszy przegląd poprawki i kroku zwrotnego nie znalazł w tych miejscach nic złego. Przeczytanie ich przez świeżego recenzenta kosztuje jeszcze jeden przegląd; przepuszczenie przyjmuje, że sprzeczność z jedną z tych sześciu decyzji mogłaby pozostać niezauważona. Rekomenduję przepuścić, bo zmianę zastępnika porównano polecenie po poleceniu ze starym. Kazać przeczytać w tej prośbie, zrobić zadanie czy przepuścić? (Checks, 8)

4. W fundamencie stoi jedna stara luka, której ta zmiana nie dotknęła: reguła, że żadna część kodu nie importuje plików innej części, opiera się na fakcie, którego nigdzie nie nazwano (oznaczona jako goła luka od 2026-11-08). Dziś nikogo to nie dotyczy, ale kto polega na tej regule, nie widzi, na czym się opiera. Zapisanie jej w tej prośbie wymaga, żebyś nazwał fakt i jego źródło; zadanie zostawia lukę; przepuszczenie zostawia ją na głównej gałęzi. Rekomenduję zrobić z tego zadanie, bo nie ma nic wspólnego z tą zmianą. Zapisać w tej prośbie, zrobić zadanie czy przepuścić? (Foundation entries, 7)

### Akceptujesz przez scalenie

Scalenie przyjmuje te punkty; jeśli któryś ci nie odpowiada, powiedz który.

5. Wybrałem, jak start w toku staje się widoczny dla pozostałych grup: blokada systemu operacyjnego na pliku obok wspólnej notatki przebiegu, trzymana przez grupę, która uruchamia Docker Desktop. Nie zapisywałem „start w toku” we wspólnej notatce (wymaga sprawdzenia, czy piszący żyje, czego Windows nie daje w bezpiecznej postaci) i nie użyłem pliku znacznika (grupa, która zginęła, zostawia go, a pozostałe czekałyby na nic). Test sprawdzający ustawienie „po kolei” zastąpiłem testem zachowania: dwie grupy, które przechodzą tylko wtedy, gdy biegną naraz; test samego ustawienia padałby tylko przy świadomej zmianie. Czekanie na blokadę kończy się na własnym limicie czasu czekającej grupy, z tym samym pominięciem „Docker nie wstał” co każdy niedokończony start.

6. Dwa wpisy, których zadanie nie niosło: decyzja o uruchamianiu Docker Desktop dostaje zdanie „jeśli grupa, która zaczęła start, skończyła przed jego końcem, następny test, który o to poprosi, uruchamia Docker Desktop jeszcze raz” (zadanie prosiło tylko o „jeden start, pozostałe czekają”; tak zamknąłem przypadek grupy, która ginie; osłabia to „najwyżej raz” tylko tam, gdzie coś ginie), oraz nowy fakt środowiska mówi, że w Windows system operacyjny zwalnia blokadę pliku, gdy kończy się jej proces, i że zwolnienie może być opóźnione. Nie znalazłem źródła dla połowy Mac/Linux ani strony łączącej wywołanie Pythona z windowsowym, więc fakt mówi tylko to, co strona Windows. Uzasadnienie decyzji mówi to samo, razem z opóźnieniem.

7. Testy, które teraz trzymają regułę albo zdanie decyzji: trzy nowe testy naprawy niosą adnotację decyzji o uruchamianiu Docker Desktop, dwa z nich także reguły, że start, który się nie skończył, jest oczekiwany raz (ta reguła się nie zmieniła); dwa starsze testy całego przebiegu niosą teraz także adnotację decyzji o uruchamianiu grup naraz; stary test ustawienia „po kolei” zastąpiły dwa testy, z których jeden trzyma nową odpowiedź. Kontrola fundamentu wylicza te same 23 stare wpisy „nie trzyma ich nic” co przedtem i żaden z nich nie jest wpisem, którego ta zmiana dotknęła.

## Koszt

Agenci pracowali 55 minut 32 sekundy w turach (w tym 28 minut 15 sekund czekając na narzędzia), a trzy pełne przebiegi bramki trwały 19,4, 16,9 i 16,8 minuty (poza tą sumą). Wszyscy agenci działali na jednym modelu, `claude-sonnet-5-5`; w sumie 45,4 mln tokenów (44,2 mln odczytanych z pamięci podręcznej, 221 tys. napisanych jako wyjście). Odbyły się dwie rundy poprawki z przeglądem poprawki: jedna po przeglądzie całej zmiany (jedna uwaga blokująca i cztery drobne naprawione), druga po przeglądzie kroku zwrotnego (jedna uwaga blokująca: brakowało faktu środowiska). Tabela etapów jest w zatwierdzonym zapisie cyklu (`stages.md`), podlinkowanym w *Course of the cycle*.

Katalogi wcześniejszych zadań nadal stoją, bo skrypt nie mógł rozpoznać, że już ich nie trzeba; nic w tej prośbie na nie nie czeka i możesz je usunąć ręcznie; ich nazwy, gałęzie i powody są w *Checks*.

## Jak scalić

Scal zwykłym commitem scalającym (nie squash ani rebase), bo link do zapisu cyklu przetrwa tylko wtedy, gdy commity zostają.

</details>

## Technical changes

The change makes the full gate run the Python test directories at the same time, and makes that safe for Docker Desktop's start. Ten commits on the branch, base `a1306b53` (the current main; the task named `9e13af95`, and main gained one pull request since, which changed none of the files this task touches):

- `5cf9df53` — `tests/quality/docker_standin.py`: the stand-in `docker` takes turns between overlapping calls (it had a race of its own: a read of its state met a half-written file).
- `ed932e40` — `scripts/docker_gate.py`: `start_lock` (an operating-system lock, `msvcrt.locking` on Windows, `fcntl.flock` elsewhere, on `<state file>.lock`) held from before `docker desktop start` until an answer; `daemon_gap` split into `daemon_gap` and `started_gap`; a waiter re-reads the recorded gap and asks the daemon again before starting for itself. `tests/quality/test_docker_gate.py`: new class `ProcessesAtOnce` (three tests: a start in progress seen by a second process; a start that does not finish seen by a second process; a starter that died). D-390 gets a second paragraph (row 2).
- `826b2a63` (part 2, a separate commit) — `scripts/test.py`: `--jobs 1` and its comment withdrawn; `tests/quality/test_test_gate.py`: the pin test replaced by `test_the_whole_gate_runs_its_stages` and `test_the_whole_gate_runs_the_directories_of_python_tests_at_the_same_time`; `README.md`: "po kolei" sentence now says the directories run at the same time; D-406 new answer in place (row 1); D-405 rationale's last sentence only.
- `41015a29`, `d1acd7a8`, `ee6ba709`, `c1735524` — fix of the review of the whole change: the daemon is asked again after taking the lock whether or not the process waited (B1, the second start after a start finished meanwhile; new test `test_a_process_whose_first_ask_ends_after_a_start_is_done_does_not_start_again`); the wait for the lock ends at the waiter's own limit with the recorded gap (M3, `StartWaitExpired`, `unfinished_gap`; new test); the stand-in ends its call when its lock was taken over as stale (M4); one word of D-406's *Verification* (M2). To revert part 2 alone, `826b2a63` and `c1735524` revert together.
- `af061ed2`, `92fd6ce9`, `325abcbe` — return step and its fix: docstrings of `scripts/docker_gate.py` say the wait for the lock ends at the waiter's limit and that the release by the system can take time on Windows; the environment fact `windows-file-lock-release-at-process-end`; D-390 based on it.

Item 2 of the task (can the Docker tests of `tests/deploy` and `tests/invariants` collide when both directories run at once?): none found. Eight test files use a real Docker daemon (`test_account_backup_stream.py`, `test_account_storage.py`, `test_loop2_image_icons.py`, `test_loop2_tunnel_image.py`, `test_restore_trial.py`, `test_loop2_container_icons.py`, `test_loop2_container_sprites.py`, `test_loop2_one_serving_process_container.py`); all give images, containers and volumes names with a random suffix, none publishes a port, the only networks are `none` or the restore launcher's own. The one look by name pattern, `leftovers()` in `test_restore_trial.py`, cannot match a name made by another of the eight; the reviewer checked the table against the code.

## Checks

1. **The gate, three runs side by side, head `325abcbe`** (task item 3), `python -B .the-way/task-cycle/gate_times.py --output .runs/task-cycles/naprawa-startu-dockera-w-bramce/gate_times.md -- npm.cmd test`, each exit 1: run 1 1162.1 s, run 2 1013.1 s, run 3 1010.5 s (directories: `tests/invariants` 1062.4, 939.5 and 925.4 s; `tests/deploy` 1033.0, 808.1 and 842.7 s; `tests/quality` 148.0, 122.6 and 123.7 s; `tests/agent_workflow` 3.0, 2.3 and 3.2 s). Reference from the task: side by side 18.3 to 19.6 minutes before the repair, with the two failing tests; one after another 23 to 31 minutes. Each run failed on `tests/quality` with 63 tests and 2 errors, the same two in every run: `test_quality_invariants.QualityInvariants.test_ruff_source_rules` and `…test_shellcheck_source_rules` (`FileNotFoundError: [WinError 2]`, the tool binaries are absent on this computer). No `skipped:` line in any run and no `GateRuns` failure.
2. **Failing on the base** (the cycle ran no gate on the base: the base is a merge commit whose tree equals the tree of the branch it merged, so the list was taken from that branch's final gate): the same two tests, from the record of the earlier cycle of the game view's controller, `docs/task-cycles/podzial-sterownika-widoku/cycle.md` at commit `32c6e8d6` (*Verification*, the gate runs on `9e13af95` and on the heads `4f31eb16` and `85d51b70`). Not new.
3. **Rerun of the failing tests alone**, `python -B scripts/test.py tests/quality/test_quality_invariants.py` (no gate runner, so no directories side by side), exit 1, 5 tests, the same two `FileNotFoundError` errors: they fail alone, and are no failure that appears only with the directories side by side. Because of that D-406 got its new answer (task item 4, "no failure only side by side") and part 2 stayed.
4. **Left unchecked by the one command:** the gate ends at the first failed stage (`tests/quality`), so its last stage, the foundation check, did not run in it. Run on its own, `python -B .the-way/elements/common/foundation_check.py` (without `--skip-test-citations`), exit 0, `0 errors`, 23 `listed:` lines, all "held by nothing"; none names D-390, D-405, D-406 or the new fact.
5. **Not run:** the `fcntl` branch of the lock (Mac and Linux with Docker Desktop), see item 1; a real Docker Desktop was never started or stopped by an agent (the tests of the gate use the stand-in).
6. **Own-work checks:** the author ran the repair's tests five times after the repair (all green) and two mutations (skip the daemon re-ask after a wait; skip the re-read of the recorded gap in the lock), each caught; the reviewer of the fix ran two more on a copy (the old guard returned fails the late-lock test; no cap on the wait fails the M3 test by timeout, 60 s).
7. **Focused checks:** `python -B scripts/test.py tests/quality/test_docker_gate.py` exit 0 (17 tests, at the head `325abcbe`), `tests/quality/test_test_gate.py` exit 0 (9 tests, at `c1735524`), ruff with the repository's `ruff.toml` over `scripts` and `tests/quality`, exit 0.
8. **Reading of the reviews:** the review of the whole change read 13 of the 64 decisions it selected as a whole and the other 51 by title; it named six it did not open (D-163, D-235, D-74, D-81, D-82, D-85, which concern how tests use stand-ins and the choice of test level) and read the `build-tools` entry of the part map only from its heading through the start of its *Files* list; the reviews of the fix and of the return step added no decision and read the foundation anew only where the diff touched it.
9. **Working copies left:** none.
10. **Directories of earlier tasks kept:** przewodnik-testow | task/przewodnik-testow | holds fail-node and fail-python, which stay: uncommitted changes; coding-guidelines | task/coding-guidelines | uncommitted changes; wt-L1 | task/the-way-slimmed | uncommitted changes; wt-L1a | task/slim-quality-checks | uncommitted changes; wt-pin | task/update-the-way-f0b2130 | uncommitted changes.
11. Form check, private-paths check, image check and remarks check: written after the checks run (see the next edit of this description).

## Foundation entries

1. **D-390** (row 2) — in one run of the gate Docker Desktop is started at most once, also when the start succeeds; a test that asks for a daemon while another process's start has not finished waits for that start within its limit and starts none of its own. **The cycle's clause in the same paragraph:** where the process that began the start ended before it finished, the next test to ask starts Docker Desktop again. *Based on* now also names the new fact; *Verification* gains a `tests:` clause; *Rationale* gains the lock and the delay.
2. **D-406** (row 1) — the full gate runs the directories of Python tests at the same time, and a run so made starts Docker Desktop at most once and waits for it at most once; same number and question, new answer in place; *Verification* is `tests:`; *Rationale* and *Rejected* rewritten for the decision as it stands.
3. **D-405** — the last sentence of its rationale only ("the full gate runs them at the same time (D-406)"); the answer is untouched.
4. **`windows-file-lock-release-at-process-end`** (the cycle's, environment fact) — on Windows, when a process terminates with a portion of a file locked, the operating system unlocks the locks, and the time it takes depends upon available system resources (source: the Win32 `LockFile` page, read 2026-11-15; the link of `msvcrt.locking` to those locks is the product's own inference, no page found).
5. **Invariant tests:** `gate-docker-start-waits-once` is unchanged; its test lines stand on `test_one_run_of_the_whole_gate_waits_for_a_docker_that_does_not_rise_once` (kept) and on two new tests (`test_a_process_that_asks_during_a_start_that_does_not_finish_gets_its_gap_after_it`, `test_a_wait_for_a_start_that_never_lets_go_ends_in_the_limit_with_the_gap`). Lines `decision: D-390` stand on three new tests and on `test_a_whole_run_that_finds_docker_stopped_starts_it_once_and_skips_nothing`; lines `decision: D-406` on the two `GateRuns` tests and on the new `test_the_whole_gate_runs_the_directories_of_python_tests_at_the_same_time`. The pin test `test_the_whole_gate_runs_its_stages_and_gives_the_python_runner_one_job` (line `decision: D-406`) is dropped. No *Violated* mark set or cleared; no surface changed.
6. **Rows of *Settlements to record*:** row 1 → D-406, row 2 → D-390.
7. **A gap that stands and this change did not touch:** the invariant `cross-part-imports` has in its *Rests on* "TODO — the fact is not named in the foundation (a bare TODO since 2026-11-08, commit 842beb7); the human names the fact and its source"; the change neither wrote nor removed it.

## Minor findings

1. **M1 (review of the whole change, left on purpose)** — `foundations/decisions.md`, D-390's new paragraph, the clause "where the process that began the start ended before it finished, the next test to ask starts Docker Desktop again": "Settlement row 2 carries two things … The clause about a start whose process died is the author's answer to the question the task carried to the cycle … it is a binding sentence the row did not approve, and it weakens "at most once" with a stated exception. Grade Minor because the code and test agree with it and the cycle was asked to choose; the request should show the clause to the human as the cycle's own choice, not as part of the row." Shown in item 6 of *You accept by merging*.
2. **M5 (contingent)** — contingent on a revert of the second part; no revert was made (the three runs showed no failure only with the directories side by side), so it does not apply.
3. **N1 (review of the fix)** — `scripts/docker_gate.py` `daemon_gap` / `start_lock`: "the cap uses the waiter's own deadline, which can fall before the end of a holder that restarted after a dead starter. A holder that took the lock after waiting resets its deadline to its own later time, so it can still be starting when a waiter that asked earlier reaches its deadline. That waiter then records "no daemon answered within N seconds" although the holder's start may yet succeed, and the later tests of the run are skipped with a message that Docker did not rise. … Both are rare and the cost is a skip that the run reports as unchecked, not a wrong pass. … A cure would be to cap by the wait and not record the gap, or to re-ask once before recording." Item 2 above.
4. **N3 (review of the fix)** — `tests/quality/docker_standin.py`, bottom of the program: "after a stale takeover the late holder's `rmdir` (now tolerant of a missing directory) can remove the lock directory that the taker has made in the meantime. A third call could then enter beside the taker. It needs a call stalled over 5 s inside the stand-in and a third caller at that moment; before the fix the same stall crashed the holder." Stand-in only; not judged to be felt.
5. **M6 (review of the return step)** — `scripts/test.py` module docstring, lines 4-5: "says "start it and await it once"; … where the starter dies the next process starts again … and a waiter that reaches its limit records the gap. "Start it and await it once" is the D-406 clause word for word, so it is faithful to the entry; I note only that the entry and the docstring say "at most once" in the decisions and "once" in the docstring. No change required."
6. **M7 (review of the fix of the return step)** — D-390's *Rationale*: "says "where the holder ends, the operating system releases its lock" generally, then qualifies Windows only; the fact it cites covers Windows only, so the general half, for a platform the gate does not reach, rests on no cited source. No effect on any run; if the `fcntl` branch is ever reached, a fact for it would be wanted."
7. **M8 (same review)** — "The fact is about Win32 locks of a process; the code calls `msvcrt.locking`. The *Based on* of D-390 therefore names a fact whose link to the call is the product's own inference (the author's report names it under *Searches not found*; the rationale does not). It is the best the sources allow and the dead-starter test shows the behaviour on this computer; noted for the request."

## Findings outside the task's scope

none

## Course of the cycle

- **Task and sources:** an independent task from a note of the author's backlog, approved 2026-11-14 (settlement rows 1 and 2 accepted); source of the task: pull request #130 of this repository, *Findings outside the task's scope*, item 1; the base `a1306b53`, the pin `ec7929d0`.
- **Process pin:** `ec7929d02164c8754f0236d93db52624688967e6`, not moved.
- **Spec:** none — the cycle judged that the task leaves no open design choice: the two questions it carried (how a start in progress is made visible; what replaces the test of `--jobs 1`) are choices of how to make what the task and the foundation settle.
- **Route:** one author without a plan (`the-way-author`, class `same` as the orchestrator's: concurrency across processes and foundation entries in three decisions), the repair and the side-by-side run in two parts with commits of their own; the whole change reviewed (FAIL: one blocking finding, fixed, PASS), the return step reviewed (FAIL: one blocking finding, fixed, PASS); the three full runs by the orchestrator on the day's advisor's signal `start`.
- **Plan:** none.
- **Choices:** five of the cycle's other choices stand in the questions table of the record (the base, no gate on the base, the shape of the measured tree, the full-gate protocol on this computer, the unread part-map entries); the author's two choices (the lock; the replacement test) stand in its report.
- **Blocking findings left:** none.
- **Record:** the link by the SHA of the commit that adds it is written in the next edit of this description.
