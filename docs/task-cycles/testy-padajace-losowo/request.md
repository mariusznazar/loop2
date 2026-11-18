**State: ready** — one item waits for your answer (item 1: a failure under heavy load whose file nobody kept); what you only accept by merging waits for nothing.

## What you will see

The game itself plays as before. The change is in the tests and in the notes that help the next person who meets a test that fails at random.

- **One of the five tests that sometimes fail for no visible reason is repaired.** The test of the failure watcher that checks a Docker that never answers gave its Docker calls only 1 second. Under heavy load that cut off even the quick call that asks Docker whether a container runs, so the watcher said "the game is down", which the test did not expect. That variant of the test now gives Docker 5 seconds, and the variant that checks that a call which hangs is still cut off keeps working. In 30 separate runs under the same heavy load as before, all 30 passed, and none came near the 45 seconds one run of the script is allowed.
- **The test of the server's transport rules now says which request timed out.** When its 5-second deadline passes, the error names the request's method and path, so the next failure gives evidence instead of a bare "deadline exceeded".
- **A short register of tests that fail at random now lives in the repository,** in Polish, with four entries: the transport test, the watcher's time-window test, the backup script's signal test and the account-interface test. Each entry holds the test's name, the error messages copied word for word, what was already tried with the numbers of runs and the conditions, and what to look at in the next failed run. An entry leaves the register when its cause is explained. The repair above is not in the register, because its cause is known.
- **The testing guidelines now say so in one sentence,** in a rule of their own: a test that fails at random with no link to a change of the code and with no cause found gets an entry in the register.
- **The decision log gets one new decision** that says where this knowledge lives and why (the register, not a comment, not the history of Git, not a private note).

### Underneath

The watcher script that runs on the server is untouched; only the test's own Docker limit changed. The register is a plain text file next to the tests, and the new decision and the part map line make the process find it.

## For you to decide

### Needed from you

none

### Fix or let through

1. While the cycle measured the new 5-second limit, the heavy load it used also ran whole test files in 6 loops; in 5 of those 6 loops one whole-file run failed, and nobody kept which file it was. Such failures under that load were seen in the earlier cycle too, and the test the task repairs is not known to be the one that failed. If it was the watcher's test file, the 5-second limit might still be too short on a slower computer, and a full run of all tests would then fail now and then, which costs you a repeat of 15 to 35 minutes. If it was another file, it is either a test the register already lists or a new unexplained one. What the cycle did know is that the repaired variant passed 30 of 30 runs under that load and the full run of all tests on the final change passed once. The ways: (a) find out in this request by repeating the heavy load and keeping the full output of every failed run; it costs hours of the computer under load and a session, and a round of review if the code changes; (b) make a task of it, which leaves it unexamined until someone has the time; (c) let it through, which costs nothing today, and if a full run later fails in this watcher test the repair is reopened and the register gets the entry. I recommend (c), because the task's own criterion, 30 of 30 under that load, is met, and whole-file failures under that load were already seen before this change. Find out in this request, make a task of it, or let it through? (Checks)

### You accept by merging

Merging accepts these items; if one does not suit you, say which.

2. The task asked for the sentence about the register inside the existing rule about unstable tests. The cycle put it in a rule of its own, right after that one, and added to it the condition that the failure has no link to a change of the code. Two reasons: the existing rule is the text of the pinned process's template and could be dropped when the process is updated, and without the condition an agent whose own change makes a test fail now and then would write that test into the register instead of fixing it. The other way, leaving it inside the existing rule with the task's exact wording, was not taken because of those two risks.
3. The new Docker limit of the repaired variant is 5 seconds, chosen by measurement: 1 second failed 6 of 10 runs under the heavy load, 2 and 3 seconds each passed 8 of 8, and 5 seconds passed 30 of 30. It is more than twice the smallest limit that passed. A longer limit such as 8 seconds or more was not taken because the one run that hangs would then come near the 45-second limit. The price is that this one run lasts about 4 seconds longer.
4. The cycle changed a test that stays tied to the decision on how the operator learns that the running game failed: the watcher's test that cuts off a Docker that never answers (only its limit, and now two named values instead of a bare number). The tie to the decision is unchanged, and no test that guards an invariant was changed; the foundation check reports no invariant sentence corrected by this change.

## Cost

About 2 hours 12 minutes of counted working time, of which 1 hour 46 minutes is waiting for tools, mostly the author's heavy-load runs, and 26 minutes without waiting, plus a full run of all tests that took about 13 minutes. About 45.9 million tokens, nearly all of them re-read cached input: 10.7 million on the strongest model (the three reviews) and 35.2 million on the middle model (the author, the fix, the return step and the orchestrator). One fix round: the review of the whole change failed on three findings and the fix passed its review; the return step made one more small correction, also reviewed. The table of stages is in the committed record: https://github.com/mariusznazar/loop2/blob/RECORD_SHA/docs/task-cycles/testy-padajace-losowo/stages.md

## How to merge

Merge it keeping the commits (a merge commit, not a squash or a rebase), since the link to the record of the cycle survives only then.

<details>
<summary>W Twoim języku</summary>

**Stan: gotowe** — jeden punkt czeka na Twoją odpowiedź (punkt 1: porażka pod dużym obciążeniem, której pliku nikt nie zachował); to, co tylko akceptujesz przez scalenie, na nic nie czeka.

## Co zobaczysz

Sama gra działa jak przedtem. Zmiana jest w testach i w notatkach, które pomogą następnej osobie, gdy trafi na test padający losowo.

- **Jeden z pięciu testów, które czasem padają bez widocznego powodu, jest naprawiony.** Test strażnika awarii, który sprawdza Dockera niemającego nigdy odpowiedzieć, dawał wywołaniom Dockera tylko 1 sekundę. Pod dużym obciążeniem ucinało to nawet szybkie wywołanie pytające Dockera, czy kontener działa, więc strażnik pisał „gra nie działa”, czego test nie oczekiwał. Ten wariant testu daje teraz Dockerowi 5 sekund, a wariant sprawdzający, że zawieszone wywołanie nadal jest przerywane, działa dalej. W 30 osobnych uruchomieniach pod tym samym dużym obciążeniem co wcześniej przeszło wszystkie 30, a żadne nie zbliżyło się do 45 sekund, które ma jedno uruchomienie skryptu.
- **Test reguł transportu serwera mówi teraz, które żądanie przekroczyło termin.** Gdy upływa jego 5-sekundowy termin, błąd podaje metodę i ścieżkę żądania, więc następna porażka da dowód zamiast samego „deadline exceeded”.
- **W repozytorium jest teraz krótki rejestr testów padających losowo,** po polsku, z czterema wpisami: test transportu, test okna czasowego strażnika, test sygnału skryptu kopii i test interfejsu konta. Każdy wpis ma nazwę testu, komunikaty błędów przepisane dosłownie, to, co już próbowano (z liczbami uruchomień i warunkami), oraz to, na co patrzeć w następnym padniętym przebiegu. Wpis znika z rejestru, gdy jego przyczyna się wyjaśni. Naprawa powyżej nie ma wpisu, bo jej przyczyna jest znana.
- **Wytyczne testowania mówią o tym jednym zdaniem,** we własnej regule: test padający losowo bez związku ze zmianą kodu i bez ustalonej przyczyny dostaje wpis w rejestrze.
- **Dziennik decyzji dostaje jedną nową decyzję,** która mówi, gdzie ta wiedza leży i dlaczego (rejestr, a nie komentarz, historia Gita ani prywatna notatka).

### Pod spodem

Skrypt strażnika działający na serwerze nie jest zmieniony; zmienił się tylko limit Dockera w samym teście. Rejestr to zwykły plik tekstowy obok testów, a nowa decyzja i wiersz w mapie części sprawiają, że proces go znajduje.

## Do rozstrzygnięcia

### Potrzebne od Ciebie

none

### Napraw albo przepuść

1. Gdy cykl mierzył nowy 5-sekundowy limit, duże obciążenie, którego użył, uruchamiało też całe pliki testów w 6 pętlach; w 5 z tych 6 pętli jedno uruchomienie całego pliku padło i nikt nie zachował, który to był plik. Takie porażki pod tym obciążeniem widział już poprzedni cykl, a nie wiadomo, czy padł test, który zadanie naprawia. Jeśli był to plik testów strażnika, 5-sekundowy limit mógłby na wolniejszym komputerze nadal być za krótki, a pełny przebieg testów padałby wtedy od czasu do czasu, co kosztuje Cię powtórkę 15–35 minut. Jeśli był to inny plik, to albo test z rejestru, albo nowy niewyjaśniony. Cykl wiedział na pewno, że naprawiony wariant przeszedł 30 z 30 uruchomień pod tym obciążeniem, a pełny przebieg wszystkich testów na końcowej zmianie przeszedł raz. Drogi: (a) wyjaśnić w tej prośbie, powtarzając duże obciążenie i zachowując pełne wyjście każdego padniętego przebiegu; kosztuje godziny pracy komputera pod obciążeniem i sesję, a przy zmianie kodu rundę przeglądu; (b) zrobić z tego zadanie, co zostawia sprawę niezbadaną, dopóki ktoś nie znajdzie czasu; (c) przepuścić, co dziś nic nie kosztuje, a gdy pełny przebieg padnie później na tym teście strażnika, naprawa się otwiera, a rejestr dostaje wpis. Polecam (c), bo kryterium samego zadania, 30 z 30 pod tym obciążeniem, jest spełnione, a porażki całych plików pod tym obciążeniem widziano już przed tą zmianą. Wyjaśnić w tej prośbie, zrobić z tego zadanie czy przepuścić? (Checks)

### Akceptujesz przez scalenie

Scalenie akceptuje te punkty; jeśli któryś Ci nie odpowiada, powiedz który.

2. Zadanie prosiło o zdanie o rejestrze wewnątrz istniejącej reguły o niestabilnych testach. Cykl umieścił je we własnej regule, zaraz po tamtej, i dodał warunek, że porażka nie ma związku ze zmianą kodu. Dwa powody: istniejąca reguła jest tekstem szablonu przypiętego procesu i mogłaby zniknąć przy jego aktualizacji, a bez warunku agent, którego własna zmiana sprawia, że jakiś test od czasu do czasu pada, wpisałby ten test do rejestru zamiast go naprawić. Drugiej drogi, zostawienia zdania w istniejącej regule dokładnie w brzmieniu zadania, nie wybrano z powodu tych dwóch ryzyk.
3. Nowy limit Dockera naprawionego wariantu to 5 sekund, wybrany pomiarem: 1 sekunda padła w 6 z 10 uruchomień pod dużym obciążeniem, 2 i 3 sekundy przeszły po 8 z 8, a 5 sekund przeszło 30 z 30. To ponad dwa razy więcej niż najmniejszy limit, który przeszedł. Dłuższego limitu, jak 8 sekund i więcej, nie wybrano, bo jedno zawieszone uruchomienie zbliżyłoby się wtedy do limitu 45 sekund. Ceną jest to, że to jedno uruchomienie trwa o ok. 4 sekundy dłużej.
4. Cykl zmienił test, który pozostaje związany z decyzją o tym, jak operator dowiaduje się, że działająca gra się zepsuła: test strażnika odcinający Dockera, który nigdy nie odpowiada (tylko jego limit, teraz dwie nazwane wartości zamiast gołej liczby). Związek z decyzją jest bez zmian, nie zmieniono żadnego testu pilnującego niezmiennika, a kontrola fundamentu nie zgłasza żadnego zdania niezmiennika poprawionego tą zmianą.

## Koszt

Około 2 godzin 12 minut policzonej pracy, z czego 1 godzina 46 minut to czekanie na narzędzia, głównie na uruchomienia autora pod dużym obciążeniem, a 26 minut bez czekania, plus pełny przebieg wszystkich testów, który trwał ok. 13 minut. Około 45,9 miliona tokenów, prawie wszystkie to ponownie czytane tokeny z pamięci podręcznej: 10,7 miliona na najsilniejszym modelu (trzy przeglądy) i 35,2 miliona na średnim (autor, poprawka, krok zwrotny i orkiestrator). Jedna runda poprawek: przegląd całej zmiany odrzucił ją z trzech powodów, a poprawka przeszła swój przegląd; krok zwrotny zrobił jeszcze jedną drobną korektę, także przejrzaną. Tabela etapów jest w zatwierdzonym zapisie: https://github.com/mariusznazar/loop2/blob/RECORD_SHA/docs/task-cycles/testy-padajace-losowo/stages.md

## Jak scalić

Scal z zachowaniem commitów (merge commit, bez squasha i rebase), bo link do zapisu cyklu przetrwa tylko tak.

</details>

## Technical changes

The request's range is `659b1e02..145959e8` on top of the target branch, and a record pair of commits. Three groups:

- **Foundation and register, `5206fd2d`.** `foundations/decisions.md` gets D-432 at the end of the section "Testing discipline"; `tests/flaky-tests.md` is the register (Polish, a common rule and four entries a–d); `guidelines/testing.md` gets the one sentence of point 5; `foundations/part_map.md` lists `tests/flaky-tests.md` among the files of `agent-workflow`.
- **The two test changes, `4cf96da1`.** In `tests/deploy/test_loop2_watch.py` the variant "logs *" of `TheDockerCommands.test_a_docker_that_never_answers_is_cut_off_and_read_as_down` runs with `DOCKER_WAIT_SECONDS="5"` and `KILL_WAIT_SECONDS` still 1; "inspect *" keeps 1; `deploy/loop2-watch` is not in the range. In `tests/transport.test.mjs` the error of the timer of `send` reads ``HTTP deadline exceeded: ${method} ${path}``.
- **The fix of the whole-change review, `f2253fc5`.** All nine findings were fixed together: the sentence of `guidelines/testing.md` moved into its own rule `### Register of flaky tests` (Decision D-432), with the qualification "bez związku ze zmianą kodu" (I-1, M-6; the rule *Flaky tests* is back to its text at the base); entry b names its five conditions (I-2); the comment `# The break:` is gone and two named values, `wait_that_cuts_inspect` and `wait_that_leaves_inspect_time_to_answer`, carry the reason (I-3); the line, the time and three wordings of the register corrected (M-1 to M-5).
- **The return step, `145959e8`.** Two lines of `tests/flaky-tests.md`: its opening names the rule `Register of flaky tests` instead of the chapter "Flaky tests" (N-1 of the review of the fix).

## Checks

- **Gate (final tree):** `python -B .the-way/task-cycle/gate_times.py --output .runs/task-cycles/testy-padajace-losowo/gate_times.md -- npm.cmd test` on `145959e8`, exit 0, 772.567 s, started after the signal `start` of the adviser of the day: Node 2672 of 2672 passed, Python 704 tests in 4 directories all OK (`tests/quality` with `OK (expected failures=1)`), foundation check `0 errors`, check of the instruction files `0 error, 144 warn, 7 info`. No check failed or did not run in the gate.
- **Checks failing on the base:** none; the list was taken from the final gate of the cycle of the merged branch (`docs/task-cycles/cztery-usterki-recenzji/cycle.md`, added in `fc3b27d7`: exit 0, nothing failing), because the base `659b1e02` is a merge commit whose tree equals that of the branch it merged.
- **Reconciliation with the target branch:** `git fetch origin --tags` after the return step showed `origin/main` still at `659b1e02`, the base; nothing to merge. The process pin matches the gitlink (`bfb2e109`).
- **CI:** CI_PENDING
- **Own-work checks:** the author ran the variant "logs *" in 30 separate runs, each timed, under the load of the earlier cycle's executor 19 (6 loops of whole test files and 40 spinning processes): 30 passed, the longest script run 26.83 s against the 45 s limit; at the old limit 6 of 10 runs failed; the mutation that leaves the hang uncut (the "logs *" limit 200 s) fails with "the run did not end within 45 s" (`reports/author-report.md`). After the fix the author and the reviewer ran the changed case alone (exit 0) and its mutation (exit 1); the load series was not repeated, since the limit stays 5 s.
- **Not run:** nothing of the gate; the acceptance load was run once by the author and repeated by nobody (the reviewer read the kept series, `reports/author-load-series/after5.log` and `after5-script-runs.txt`).
- **Remarks check:** `python -B .the-way/task-cycle/remarks_check.py .runs/task-cycles/testy-padajace-losowo`, run 1 on the original exit 1 listing 6 items, all appended to the process remarks; run 2 on the original exit 0. The copy runs are filled in below with the record's link.
- **Whole-file runs under the load (item 1):** in 5 of the 6 loops of the author's load one whole-file run was "not ok" (`loop n: 3 file runs, 1 not ok`); the output was not kept, so the file is not established; the reviewer of the whole change declined to judge it for the same reason (`reports/review-whole-report.md`, "Declined to judge"); the earlier cycle's executor 19 saw whole-file runs fail at times under this load too.
- **Form check of this description, check of private paths, the record's copy and its checks:** filled in below with the record's link.
- **Working copies left:** the worktree's `node_modules` of the author's `npm ci` stays with the task's directory; nothing else waits for it. The reviewer of the return step wrote one stray file outside its directory and deleted it at once.
- **Directories of earlier tasks kept:** none; the script removed the worktree of the merged task `cztery-usterki-recenzji` at the start.

## Foundation entries

- **D-432** (row 1; new): a test that fails at random, with no change of the code behind the failure and with no cause found, has an entry in the register `tests/flaky-tests.md`, written in Polish, with the test's name, what was tried with numbers and conditions and what to look at; the entry leaves the register in the change that explains the cause.
- **Part map, `agent-workflow`, *Files*: `tests/flaky-tests.md`** (row 1; the sentence of the part unchanged): the register belongs to the part that directs and records the work on the repository.
- **Guidelines:** `guidelines/testing.md`: the new rule `### Register of flaky tests` (*Decision* D-432, not a rule with *Decision* `none`), and `tests/flaky-tests.md` among the files of *Where in code*; the rule *Flaky tests* is unchanged from the base.
- **Sections of the decision log:** none opened; D-432 joins "Testing discipline" (the testing discipline loop2 adopts: the levels, shape and exemplars of tests, the mechanisms they exercise and the deliberate exclusions).
- **Invariant tests altered:** none. The test `test_a_docker_that_never_answers_is_cut_off_and_read_as_down` holds a sentence of D-356 by its line `decision:`; the change alters the test (its limit) and leaves the line as it was.
- **The `foundation_check.py` run without `--skip-test-citations` on the finished change** (`python -B .the-way/elements/common/foundation_check.py`, exit 0): `0 errors`, no `listed:` line.

## Minor findings

none

The Minor findings M-1 to M-6 of the review of the whole change were fixed in `f2253fc5`, and the one Minor finding of the review of the fix (N-1) was corrected by the return step in `145959e8`; the review of the return step had no finding.

## Findings outside the task's scope

none

## Course of the cycle

- **Task and sources:** the independent task "loop2: tests that fail at random — what to check at the next failure of five tests, and a shorter Docker limit in the watcher test", accepted on 2026-11-17 by the adviser of the day on the human's behalf; sources: the task document and the earlier cycle's reports in the history of Git (`28ab60c9`, task "luki w testach z przeglądu", PR #150).
- **Process pin:** `bfb2e109735b5fff98802b8be0ff3c43c799262a`; the task does not move it.
- **Spec:** none; the task left no open design choice.
- **Route:** one author without a plan, class `same` (Sonnet), resumed for the fix and for the return step; the change fits one agent.
- **Plan:** none.
- **Choices:** 3 of the cycle's other choices in the questions table (the author's class, the rule on waiting for the adviser's signal before each full gate, and reviewers of the strongest class on Opus), plus the choices of the author named in `reports/author-report.md` and `reports/fix-report.md`; see `docs/task-cycles/testy-padajace-losowo/cycle.md` in the record.
- **Blocking findings left:** none.
- **Record:** https://github.com/mariusznazar/loop2/tree/RECORD_SHA/docs/task-cycles/testy-padajace-losowo
