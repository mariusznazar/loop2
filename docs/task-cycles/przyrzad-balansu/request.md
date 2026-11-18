**State: ready** — corrected for your answers to the items of the blocked request; nothing below waits for your answer, and what you accept by merging is listed.

## What you will see

The game itself looks and plays exactly as before. What the request adds is a balance instrument that now lives in the repository, so every question about balance and every new map is one command instead of a copy of the game built by hand outside it.

- **One command.** The instrument runs the game's own simulation outside the browser, many seeds in a second or two. It sweeps seeds for one program on one map, traces one run minute by minute, measures the earning loop for real hours, plays a whole player's campaign over days, and lists the reference programs in the words the game shows the player. It builds the game itself first, so a fresh clone needs only `npm install`. On the same commit it gives the same numbers as the instrument kept in your notes: for the best program of Las on seeds 1 to 500, 359 of 500 solved with a median of 754 minutes, the same in a fresh clone.
- **Map check.** One command takes an overlay (a file that changes the game's data only in memory for one measurement, for example one that adds a map) and prints one table: for each map of the overlay and each reference program, the share solved on seeds 1 to 500, the median minutes of the solved runs, the failures by cause, and the balance of the earning loop (what a run takes from the chest, what it puts back, how often the character dies). The table shows no program's rules; programs appear as `P1` to `P23`, and the list the instrument prints for the agent is the key. The three maps of the old game that the critique of progression used come as overlays. After your answers, the skill no longer has the agent tell you which skill branch a reference program needs on a map: it says only that the row was measured with the skills the program needs.
- **A test that Las can be solved.** The acceptance test of the simulation now runs a program built only of the game's own conditions and actions on Las, on a seed the test names, and checks that the map is solved, with the mage paying nature energy for its fires; the empty program dies there. Before, it only checked that a program stayed alive. The first-map and first-pass tests read their programs from the same single file the instrument reads.
- **A skill and a line in the instructions** tell an agent how to use the instrument, how to check a map before a package is defined, and what it may show you.

### Underneath

The instrument imports the game's compiled simulation and copies none of its numbers; it lives in a new part of the code map with its own tests, which put a seed through the game and through the instrument and demand the same run.

## For you to decide

### Needed from you

none

### Fix or let through

none

### You accept by merging

Merging accepts these items; if one does not suit you, say which.

1. This correction answered your answers to the items of the blocked request (fix the two findings, add the test, run the two skipped stages; let items 4 and 5 through), and the cycle judged that the task and the foundation required what it changed: the hint about the skill branch went against what the table is for, and the decision about the size limit claimed a test that did not exist.
2. Only three of the eleven player descriptions of your notes came: the three that start on Skraj lasu. The game now sends a player to Las only after Skraj lasu is solved, so the eight that start on Las describe a road the game no longer has. They can be brought later from the same notes.
3. The acceptance test no longer checks that the winning program feeds a campfire or that it holds every kind of condition and action: the program that solves Las does neither, and the decision about it now asks for a program of the closed lists that solves Las, not for one that holds every kind. The price is a weaker check of the kinds a program holds.
4. The map check measures every reference program on every map of the overlay with the skills of a new character and a chest from the program's own take list, and the earning loop over 24 real hours on seeds 1 to 100. A program that needs a bought skill branch therefore shows near zero on a map that needs it, unless the agent reruns it with the skills it needs; the skill tells the agent to do so and to say to you only that the row was measured with the skills the program needs. The price is rows that can look like "the map cannot be passed" until the agent says so. A time of a map check with all three overlays together was never measured (you let that through).
5. The cycle added the new part to the decisions and invariants that define which files the linter, the formatter and the size limit reach, so the instrument's files are held to the same rules as the rest of the code; no rule or option changed. After your answers the comparison of the foundation with the code added the new part to the scope of thirteen more decisions that bind every part of the code or every test, to the invariant that keeps every test file in the test run, and to the dependencies of two parts (the build part and the part that holds the skills), since their commands and skill run the instrument; and it made the decision about the map check say that a program is named by its label, never by its identifier, and name the tests that hold it. (Foundation entries, 1)
6. Changed invariant tests, in plain words: the acceptance test quotes the changed decision; two quality tests that keep the lists of files the linter and formatter reach follow the new part; the size test now also holds a control file under the instrument's directory, so it fails if the limit on a function stops reaching the instrument; two tests of the instrument gained comment lines that quote the sentences of the map-check decision and the results decision they hold. No invariant is marked violated. (Foundation entries, 2)
7. Three tests of the simulation changed what they take from the code: the first-map and first-pass tests now read their programs from the one shared file, and the first-pass test's precondition narrowed from "brings nothing" to "takes nothing from the chest", because the shared best program brings everything out. The counts of the seeds each program solves on those tests' named seeds were checked equal before and after. (Foundation entries, 2)

## Cost

About 2 hours 19 minutes of work in all (1 hour 52 minutes without waiting for tools), about 184 million tokens, nearly all of them re-read cached input: 44 million on the strongest model (the plan and the four reviews), 109 million on the middle model (the entries, the slices of the engine, the guidelines, the campaign, the command line, the fix, the correction, the return step and this orchestration) and 30 million on the cheapest one (the overlays, the loop and trace, the map check and the skill). Review rounds: the whole change once (blocking: one, Minor: six), the fix once, the review of that fix once (blocking: two, Minor: one), then after your answers the correction and its review (passed, one Minor) and the return step and its review (passed, five Minor). The table of stages stands in the committed record (link at the end, under the course of the cycle). A copy of an executor's check stayed in the working directory of the task and one empty directory in the main checkout of the repository, made by a mistake in a path; nothing waits for them, and they are removed by hand or go when the task's directory goes.

## How to merge

Merge it keeping the commits (a merge commit, not a squash or a rebase), since the link to the record of the cycle survives only then.

<details>
<summary>W Twoim języku</summary>

**Stan: gotowe** — poprawione według Twoich odpowiedzi na punkty zablokowanego PR-u; nic poniżej nie czeka na Twoją odpowiedź, a to, co akceptujesz przez scalenie, jest wypisane.

## Co zobaczysz

Sama gra wygląda i działa dokładnie jak przedtem. Zmiana dodaje przyrząd do balansu, który teraz leży w repozytorium, więc każde pytanie o balans i każda nowa mapa to jedno polecenie, a nie kopia gry budowana ręcznie poza repozytorium.

- **Jedno polecenie.** Przyrząd uruchamia prawdziwą symulację gry poza przeglądarką, wiele ziaren w sekundę czy dwie. Przemiata ziarna dla jednego programu na jednej mapie, śledzi jedno przejście minuta po minucie, mierzy pętlę zarobkową przez godziny realne, gra całą kampanię gracza przez dni i wypisuje programy wzorcowe słowami, którymi gra pokazuje je graczowi. Sam najpierw buduje grę, więc świeży klon potrzebuje tylko `npm install`. Na tym samym commicie daje te same liczby co przyrząd z Twoich notatek: dla najlepszego programu na Lesie, ziarna 1–500, 359 z 500 rozwiązanych, mediana 754 minuty, tak samo w świeżym klonie.
- **Sprawdzanie mapy.** Jedno polecenie bierze nakładkę (plik, który zmienia dane gry tylko w pamięci na czas jednego pomiaru, na przykład dokłada mapę) i wypisuje jedną tabelę: dla każdej mapy nakładki i każdego programu wzorcowego odsetek rozwiązań na ziarnach 1–500, medianę minut rozwiązanych przejść, porażki według przyczyny i bilans pętli zarobkowej (ile przejście bierze ze skrzynki, ile do niej oddaje i jak często postać ginie). Tabela nie pokazuje reguł żadnego programu; programy występują jako `P1`–`P23`, a kluczem jest lista, którą przyrząd wypisuje dla agenta. Trzy mapy starej gry z krytyki progresji wchodzą jako nakładki. Po Twoich odpowiedziach skill nie każe już agentowi mówić Ci, jakiej gałęzi umiejętności potrzebuje program wzorcowy na mapie: mówi tylko, że wiersz zmierzono z umiejętnościami, których program potrzebuje.
- **Test, że Las da się rozwiązać.** Test akceptacyjny symulacji puszcza teraz na Lesie, na ziarnie, które sam nazywa, program zbudowany wyłącznie z warunków i akcji samej gry i sprawdza, że mapa jest rozwiązana, a mag płaci energią natury za ogień; pusty program tam ginie. Wcześniej sprawdzał tylko, że program przeżywa. Testy pierwszej mapy i pierwszego przejścia czytają programy z tego samego jednego pliku, z którego czyta przyrząd.
- **Skill i linia w instrukcjach** mówią agentowi, jak używać przyrządu, jak sprawdzić mapę przed definicją paczki i co wolno mu Ci pokazać.

### Pod spodem

Przyrząd importuje skompilowaną symulację gry i nie przepisuje żadnej jej liczby; mieszka w nowej części mapy kodu z własnymi testami, które puszczają to samo ziarno drogą gry i drogą przyrządu i żądają tego samego przejścia.

## Do rozstrzygnięcia

### Potrzebne od Ciebie

none

### Napraw albo przepuść

none

### Akceptujesz przez scalenie

Scalenie akceptuje te punkty; jeśli któryś Ci nie odpowiada, powiedz który.

1. Ta poprawka odpowiedziała na Twoje odpowiedzi na punkty zablokowanego PR-u (naprawić dwie uwagi, dodać test, uruchomić dwa pominięte etapy; punkty 4 i 5 przepuszczone), a cykl uznał, że zadanie i fundament wymagały tego, co poprawka zmienia: podpowiedź o gałęzi umiejętności szła wbrew temu, do czego służy tabela, a decyzja o limicie rozmiaru twierdziła, że istnieje test, którego nie było.
2. Z jedenastu opisów graczy z Twoich notatek przyszły tylko trzy: te, które zaczynają na Skraju lasu. Gra posyła teraz gracza do Lasu dopiero po rozwiązaniu Skraju lasu, więc osiem zaczynających na Lesie opisuje drogę, której gra już nie ma. Można je dołożyć później z tych samych notatek.
3. Test akceptacyjny nie sprawdza już, że zwycięski program karmi ognisko ani że zawiera każdy rodzaj warunku i akcji: program, który rozwiązuje Las, nie robi żadnej z tych rzeczy, a decyzja o nim prosi teraz o program z zamkniętych list, który rozwiązuje Las, nie o taki, który zawiera każdy rodzaj. Ceną jest słabsze sprawdzenie rodzajów, które program zawiera.
4. Sprawdzanie mapy mierzy każdy program wzorcowy na każdej mapie nakładki z umiejętnościami nowej postaci i skrzynką z listy zabieranych rzeczy programu, a pętlę zarobkową przez 24 godziny realne na ziarnach 1–100. Program, który potrzebuje wykupionej gałęzi umiejętności, pokazuje więc blisko zera na mapie, która jej wymaga, chyba że agent puści go ponownie z potrzebnymi umiejętnościami; skill każe agentowi to zrobić i powiedzieć Ci tylko, że wiersz zmierzono z umiejętnościami, których program potrzebuje. Ceną są wiersze, które mogą wyglądać jak „tej mapy nie da się przejść”, dopóki agent tego nie powie. Czasu sprawdzania mapy ze wszystkimi trzema nakładkami naraz nikt nie zmierzył (przepuściłeś to).
5. Cykl dopisał nową część do decyzji i niezmienników, które określają, jakie pliki obejmują linter, formatter i limit rozmiaru, żeby pliki przyrządu podlegały tym samym regułom co reszta kodu; żadna reguła ani opcja się nie zmieniła. Po Twoich odpowiedziach porównanie fundamentu z kodem dopisało nową część do zakresu trzynastu kolejnych decyzji, które wiążą każdą część kodu albo każdy test, do niezmiennika pilnującego, żeby każdy plik testu wchodził do przebiegu testów, i do zależności dwóch części (części budującej i części ze skillami), bo ich polecenia i skill uruchamiają przyrząd; oraz sprawiło, że decyzja o sprawdzaniu mapy mówi, że program nazywa się etykietą, nigdy identyfikatorem, i wskazuje testy, które to trzymają. (Foundation entries, 1)
6. Zmienione testy niezmienników, prostymi słowami: test akceptacyjny cytuje zmienioną decyzję; dwa testy jakości, które pilnują list plików lintera i formatera, nadążają za nową częścią; test rozmiaru trzyma teraz też plik kontrolny w katalogu przyrządu, więc zawodzi, gdy limit funkcji przestanie obejmować przyrząd; dwa testy przyrządu dostały linie komentarza, które cytują zdania decyzji o sprawdzaniu mapy i decyzji o wynikach, które trzymają. Żaden niezmiennik nie jest oznaczony jako naruszony. (Foundation entries, 2)
7. Trzy testy symulacji zmieniły to, co biorą z kodu: testy pierwszej mapy i pierwszego przejścia czytają teraz programy z jednego wspólnego pliku, a warunek wstępny testu pierwszego przejścia zawęził się z „nic nie wynosi” do „nic nie bierze ze skrzynki”, bo wspólny najlepszy program wynosi wszystko. Liczby ziaren rozwiązywanych przez każdy program na nazwanych ziarnach tych testów sprawdzono przed zmianą i po niej: równe. (Foundation entries, 2)

## Koszt

Łącznie około 2 godzin 19 minut pracy (1 godzina 52 minuty bez czekania na narzędzia), około 184 milionów tokenów, prawie wszystkie to ponownie czytane tokeny z pamięci podręcznej: 44 miliony na najsilniejszym modelu (plan i cztery przeglądy), 109 milionów na średnim (wpisy, silnik, wytyczne, kampania, wiersz poleceń, poprawki, krok zwrotny i ta orkiestracja) i 30 milionów na najtańszym (nakładki, pętla i ślad, sprawdzanie mapy i skill). Rundy przeglądu: cała zmiana raz (blokująca: jedna, drobnych: sześć), poprawka raz, przegląd tej poprawki raz (blokujące: dwie, drobna: jedna), a po Twoich odpowiedziach poprawka i jej przegląd (przeszedł, jedna drobna) oraz krok zwrotny i jego przegląd (przeszedł, pięć drobnych). Tabela etapów stoi w zatwierdzonym zapisie (link na końcu, w przebiegu cyklu). Kopia sprawdzenia jednego wykonawcy została w katalogu roboczym zadania i jeden pusty katalog w głównym checkoucie repozytorium, powstały przez pomyłkę w ścieżce; nic na nie nie czeka i usuwa się je ręcznie albo znikają z katalogiem zadania.

## Jak scalić

Scal z zachowaniem commitów (merge commit, bez squasha i rebase), bo link do zapisu cyklu przetrwa tylko tak.

</details>

## Technical changes

The request's range is `6a7b0acb..64f37f21` on top of the target branch, and a record pair of commits for each of the two rounds. The change is made in these groups:

- **Foundation entries, `333b945b`.** Decisions D-427 (one place for the reference programs), D-428 (what the map check prints), D-429 (results stay out of the repository), the glossary term `overlay`, the invariant `instrument-game-agreement`, the change of D-378 (a program of the closed lists solves Las), and the new part `balance-tools` added to the *Scope* of D-29, D-32 and D-425 and the *Part* of `eslint-source-rules`, `prettier-source-format` and `function-and-file-size`.
- **Slice 1, `62b73c35`.** `tests/sim/reference-programs.mjs` holds the 23 reference programs (16 of the notes' instrument, 7 of the progression critique); the first-map, first-pass and acceptance tests read them from it, and the acceptance test solves Las on a named moment with the best program, the empty program dying of cold in minute 243.
- **Slice 2, `0d48e760`, `f6b096e1`.** The part `balance-tools` in the part map (claims `balance/**` and `tests/balance/**`, depends on `simulation`), `scripts/test.py` gains the pattern `tests/balance/*.test.mjs`, `balance/engine.mjs`, the agreement test (`tests/balance/agreement.test.mjs`) and the engine test.
- **Slice 3, `d4675de8`.** `eslint.config.mjs`, `.gitattributes`, `tests/quality/test_quality_invariants.py`, `tests/quality/test_source_tool_scope.py`: the new part under the linter, the formatter and the size rule.
- **Slice 4, `5dcd4781`.** `guidelines/coding.md` and `guidelines/testing.md` name the new part.
- **Slice 5, `5d548b8b`.** `balance/overlay.mjs`, the overlays `forest-pack`, `wasteland` and `dead-zone`, and the overlay test.
- **Slice 6, `690156e1`.** `balance/loop.mjs`, `balance/trace.mjs` and their tests.
- **Slice 7, `d78071df`.** `balance/campaign.mjs`, three player descriptions that start on Skraj lasu, the campaign test; `balance/loop.mjs` gained one `export`.
- **Slice 8, `a09d0945`.** `balance/cli.mjs`, `balance/describe.mjs`, the `balance` script in `package.json`, the command-line test.
- **Slice 9, `c2ead6ec`.** `balance/check-map.mjs`, the command `check-map` in `balance/cli.mjs`, its test.
- **Slice 10, `4caa290f`.** The skill `loop2-balance` in `.claude/skills/` and its byte-identical copy in `.agents/skills/`, its test `tests/agent_workflow/test_loop2_balance_skill.py`, the line in `AGENTS.md`.
- **Fix of the whole-change review, `a53f0f22`, `314deced`, `73d19b04`.** The table of the map check names programs by `P<n>` (the key is the list `programs` prints), the test of the table checks that no identifier of a reference program appears and that a row's sweep keeps the program's chest, the trace starts through the engine's `startOf`, three comments no longer cite `instrument-game-agreement` for what it does not hold, the skill says how to rerun a program that needs a branch and what to tell the person about the agent's own attempts, and D-425's sentence lists the balance instrument.
- **Correction for your answers, `3abba636`, `f3bc5fdf`.** The skill (both byte-identical copies) has the agent say to the person only that the row was measured with the skills the program needs, naming no branch, skill or rank, and its example row carries `P<n>`; the size test (`tests/quality/test_function_and_file_size.py`) plants a control file `balance/over-function.mjs` of 201 lines and expects the report on it, so it fails when `balance` leaves the configuration the size run reads.
- **Return step, `081f6e01`, `64f37f21`.** `foundations/decisions.md`, `foundations/invariants.md`, `foundations/part_map.md` (see *Foundation entries*), and the comment lines `decision: D-428` and `decision: D-429` in `tests/balance/check-map.test.mjs` and `tests/balance/cli.test.mjs`, which the decisions' `tests:` clauses need.

## Checks

- **Gate (final tree):** `python -B .the-way/task-cycle/gate_times.py --output .runs/task-cycles/przyrzad-balansu/gate_times.md -- npm.cmd test` on `64f37f21`, exit 0, 758.907 s, started after the signal `start` of the adviser of the day: Node 2665 of 2665 passed (0 failed, 0 cancelled, 0 skipped); Python 703 tests in 4 directories, all OK (`tests/quality` with `OK (expected failures=1)`); foundation check `0 errors`; check of the instruction files `0 error, 144 warn, 7 info`. The earlier gate run on `73d19b04` (before the correction) also passed (exit 0, 782.240 s; the same counts). No check failed or did not run. The base had no failing check: the list was taken from the final gate of the earlier cycle (`docs/task-cycles/struktura-kodu/cycle.md`, added in `9a160ee5`; its gate on `6cc90484` exit 0).
- **Reconciliation with the target branch:** `git merge origin/main` was already up to date; `origin/main` still stands at `6a7b0acb`, the base, and the process pin matches the gitlink.
- **CI:** the result of the run on the last head is written here after it ends (see the end of this section).
- **Own-work checks:** each slice's executor mutated what its test guards and saw the test fail: three deliberate breaks of the engine (agreement test), two mutations of the overlay module, two of the loop and trace, a mutant that ignored the resurrection flag in the command line and another in the map check (the first versions of both tests let them through and were rewritten), a byte mutant of one copy of the skill; the fix re-ran the mutant of the finding M-1 (a row's sweep without the chest) and the test failed on it; the correction made the size test fail by removing `balance` from the configuration it reads (three places), and its reviewer saw the same, and saw the old test pass against that change.
- **Comparison with the notes' instrument** (acceptance criterion, once, by the executor of slice 8): the summaries are identical, 359 of 500, median 754 (summaries compared, not per-seed rows); in a fresh clone `npm ci` (23 s) and the one command gave the same. The reviewer of the whole change ran the sweep itself and found the summary identical; it did not repeat the fresh clone.
- **Campaigns:** on seeds 1 to 100 the three player descriptions give the notes' results except six campaigns of the two decent players, which end one final point higher (18 instead of 17); the executor explains it by thresholds of the combat trees in the game's data lowered since the notes' results were made, not by running the old game.
- **Items you let through:** item 4 (the review of the whole change opened whole only 8 of 53 decisions): the return step then read whole each of the seventeen decisions the reviewer named as unread, and seven invariants, and compared them with the instrument's code, finding no mismatch of the code (`reports/return-step-report.md`); item 5: the map check on all three overlays together was not timed (one overlay, `forest-pack`, 23 rows, took 58.3 s with the build).
- **The overlay files of the instrument:** `balance/overlays/forest-pack.json`, `balance/overlays/wasteland.json` and `balance/overlays/dead-zone.json`.
- **Form check of this description:** the last run and the check of private paths on it are filled in with the record's link, below. **The record's copy** and its checks are filled in the same way.
- **Working copies left:** `.runs/orchestrator/`, `.runs/gate-run-1.log` and `.runs/gate-run-2.log` of the task's worktree (the orchestrator's own scripts, notes and the gates' logs); the empty directory `.runs/task-cycles/przyrzad-balansu/reports/` in the main checkout of the repository, made by the executor of slice 5, whose removal the safety check refused. Nothing waits for them.
- **Directories of earlier tasks kept:** none; the script removed the worktree of the merged task `struktura-kodu` at the start.

## Foundation entries

- **D-427** (row 1): the reference programs have one place, `tests/sim/reference-programs.mjs`, which the instrument and the tests of the simulation read.
- **D-428** (row 2, changed by the return step as the cycle's): the map check prints, for each map of an overlay and each reference program, the share solved on seeds 1 to 500, the median game minutes of the solved runs, the failures by cause and the balance of the earning loop, no program's rules, and names each program by a label (its place in the list `programs` prints), never by its identifier; its *Verification* names the tests that hold the table.
- **D-429** (row 3; its *Verification* changed by the return step): the results of the instrument's measurements do not enter the repository; the instrument prints them or writes them to a file a flag names; its `tests:` clause names the sweep and `programs` tests.
- **Section of the decision log opened:** *Balance measurement* (the three decisions above).
- **Glossary term `overlay`** (row 4): a file that changes the game's data in memory for the time of a measurement, the data files left untouched.
- **Invariant `instrument-game-agreement`** (row 5): the same seed sent through the game and run through the instrument gives the same map run; its test is `tests/balance/agreement.test.mjs`, written by slice 2.
- **D-378, changed** (Question 2): on Las a program of the closed lists solves the map, paying nature energy for its lightings, on a seed that a test of the simulation names, and the empty program dies there. Its *Verification* and *Rationale* follow.
- **D-29, D-32, D-425 and the invariants `eslint-source-rules`, `prettier-source-format`, `function-and-file-size`** (the cycle's): the new part `balance-tools` joins their *Scope* or *Part*; D-425's sentence also lists the balance instrument, and the return step took D-425 through the project skill `the-way-record-decision` and added a violating example for the limit on a file, which no test holds. No rule set, option or threshold changed.
- **The cycle's, by the return step:** `balance-tools` joins the *Scope* of D-28, D-73, D-77, D-78, D-81, D-82, D-83, D-84, D-85, D-252, D-253, D-351 and D-362 (no sentence of any changes) and the *Part* of the invariant `node-test-selection`.
- **Part `balance-tools`** (part map, by slice 2): claims `balance/**` and `tests/balance/**`, depends on `simulation`, has no trust boundary. By the return step, the parts `build-tools` and `agent-workflow` list `balance-tools` in *Depends on* and their sentences say they run the instrument (its `balance` script and the test selection, and its skill).
- **Invariant tests altered:** `tests/sim/acceptance.test.mjs` (quotes the changed D-378 by its `decision:` lines), `tests/quality/test_quality_invariants.py` (the quotation of D-32 and the Prettier patterns), `tests/quality/test_source_tool_scope.py` (`SCOPE_PARTS`), `tests/quality/test_function_and_file_size.py` (the control file under `balance/`), and the comment lines `decision: D-428` and `decision: D-429` in `tests/balance/check-map.test.mjs` and `tests/balance/cli.test.mjs`. No *Violated* mark is set or cleared and no surface is altered.
- **The `foundation_check.py` run without `--skip-test-citations` on the finished change** (`python -B .the-way/elements/common/foundation_check.py`, exit 0): `0 errors`, no `listed:` line.

## Minor findings

- **m-1 (Minor, review of the correction, kept):** the skill says to rerun a program that needs a branch with `--ranks` but no longer shows how the agent finds the branch's key and rank; a wrong guess stops the command with an error and the person learns nothing. Place: `.claude/skills/loop2-balance/SKILL.md` and its copy, step 3 of the section on checking a map.
- **R-1 (Minor, review of the return step, kept):** D-428's list of the tests that hold it names more than its binding sentences say (the chest taken from the program's take list, the resurrection being ready), and the two tests that hold those facts carry no `decision: D-428` line. Place: `foundations/decisions.md`, the entry D-428, *Verification*.
- **R-2 (Minor, review of the return step, kept):** the part map's sentence for `agent-workflow` gives reading the reference programs as a reason to depend on `balance-tools`, but that file belongs to `simulation`; the dependency itself is right. Place: `foundations/part_map.md`, the entry `agent-workflow`.
- **R-3 (Minor, review of the return step, kept):** D-74, D-89, D-31, D-268, the invariant `document-test-memory-limit` and D-30 are rules over every test or every code part, and `balance-tools` was not added to them; today's effect is small, since `guidelines/testing.md` already names D-74 for the instrument. Place: `foundations/decisions.md` and `foundations/invariants.md`, those entries' *Scope* and *Part*.
- The earlier Minor finding N-3 (D-425 edited without the project skill) is closed: the return step took D-425 through the skill. The six Minor findings of the review of the whole change (M-1 to M-6) were fixed by the fix commits and found fixed by its review.

## Findings outside the task's scope

- **R-4 (Minor, review of the return step, outside the scope):** D-425's list of the tests that hold it also names "the scripts" and "the agent-workflow directories", which the control test only partly plants; the wording was there before this task. Place: `foundations/decisions.md`, the entry D-425, *Verification*.
- **R-5 (Minor, review of the return step, within the task's range but marked outside its scope by the reviewer):** `guidelines/testing.md` lists all of `tests/balance/` as unit tests, but some of those tests read the shipped overlay files from disk, which by the glossary makes them integration tests; nothing the tests prove changes. Place: `guidelines/testing.md:363`.

## Course of the cycle

- **Task and sources:** an independent task: move the balance instrument into the repository as a standing tool with a map-check mode and an acceptance test in which a program solves Las; sources: the task document (accepted by the human on 2026-11-13 with its five questions and five settlements) and the foundation at the base `6a7b0acb`. The task's use of the withdrawn decision D-80 was read as the rule now held by the testing guidelines and D-73 and D-82 (record, Q1).
- **Process pin:** `bfb2e109735b5fff98802b8be0ff3c43c799262a`, not moved.
- **Spec:** none: no open design choice and no reserved choice; the questions carried to the cycle were choices of how to make what the task settles.
- **Route:** planned slices (the change crosses five parts); ten slices, executors on the classes `cheaper` (slices 5, 6, 9, 10) and `same` (slices 1, 2, 3, 4, 7, 8; the orchestrator raised slices 1, 7 and 8 from `cheaper`, reasons in the plan); no slice had a review of its own (risk none); the whole-change review judged all. After the blocking findings of the review of the fix, the request opened blocked; your answers started correction 1, in which the author of the earlier fix was resumed for items 1 and 2 and a fresh agent took the return step.
- **Plan:** `plan.md` and `plan-size.md` in the record; ten slices, every one fits the size limit.
- **Choices:** 12 choices of the plan and 13 of the orchestrator, in the questions table of the record.
- **Blocking findings left:** none: N-1 (the skill's hint about a skill branch) and N-2 (D-425's claim of a test) were fixed by correction 1 and its review passed.
- **Correction 1:** your remarks, word for word, in `reports/correction-1-remarks.md` of the record; there was no reset base (no discarded attempt).
- **Record:** https://github.com/mariusznazar/loop2/blob/NEW_RECORD_SHA/docs/task-cycles/przyrzad-balansu/cycle.md (the commit that adds the updated record; its table of stages is `stages.md` beside it); the first copy of the record, committed when the request was blocked, stands at `4a8e6f3b`.
