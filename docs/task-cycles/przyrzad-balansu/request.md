**State: blocked** — a review finding remained after its one fix

## What you will see

The game itself looks and plays exactly as before. What the request adds is a balance instrument that now lives in the repository, so every question about balance and every new map is one command instead of a copy of the game built by hand outside it.

- **One command.** The instrument runs the game's own simulation outside the browser, many seeds in a second or two. It sweeps seeds for one program on one map, traces one run minute by minute, measures the earning loop for real hours, plays a whole player's campaign over days, and lists the reference programs in the words the game shows the player. It builds the game itself first, so a fresh clone needs only `npm install`. On the same commit it gives the same numbers as the instrument kept in your notes: for the best program of Las on seeds 1 to 500, 359 of 500 solved with a median of 754 minutes, the same in a fresh clone.
- **Map check.** One command takes an overlay (a file that changes the game's data only in memory for one measurement, for example one that adds a map) and prints one table: for each map of the overlay and each reference program, the share solved on seeds 1 to 500, the median minutes of the solved runs, the failures by cause, and the balance of the earning loop (what a run takes from the chest, what it puts back, how often the character dies). The table shows no program's rules; programs appear as `P1` to `P23`, and the list the instrument prints for the agent is the key. The three maps of the old game that the critique of progression used come as overlays.
- **A test that Las can be solved.** The acceptance test of the simulation now runs a program built only of the game's own conditions and actions on Las, on a seed the test names, and checks that the map is solved, with the mage paying nature energy for its fires; the empty program dies there. Before, it only checked that a program stayed alive. The first-map and first-pass tests read their programs from the same single file the instrument reads.
- **A skill and a line in the instructions** tell an agent how to use the instrument, how to check a map before a package is defined, and what it may show you.

### Underneath

The instrument imports the game's compiled simulation and copies none of its numbers; it lives in a new part of the code map with its own tests, which put a seed through the game and through the instrument and demand the same run.

## For you to decide

### Needed from you

1. After the one fix the review allowed, its review found that a sentence the fix added to the skill has the agent tell you which skill branch one reference program needs on the map Pustkowie. That is the kind of hint the table was built to keep from you: whoever checks Pustkowie for you would hand you a part of the solution. The cycle can fix it with one sentence in the skill (the agent says only that the row was measured with the skills the program needs, naming none); that costs one round of correction and a short review. Keeping the sentence costs nothing now and leaves the hint in every check of that map and of any later map whose reference program depends on a branch. I recommend fixing it, since the fix is one sentence. Fix it as the finding says, or keep the code despite it? (Blocking findings left, 1)
2. The same review found that the decision about the size limit now says a test checks that the limit reaches the instrument's code, but no such test exists. Today the limit does reach it (the reviewer's run read 314 files instead of 297), yet nobody would notice if a later change of the linter's configuration dropped it, and the decision would be saying something the product does not do. Fixing it by adding one control file under the instrument's directory to the size test costs a round and a case in a Python test; taking the words back out of the decision costs a round and leaves the limit on the instrument unguarded. I recommend adding the control file, since the decision names the instrument's part among those the limit guards. Add the test, take the words out, or keep it as it is? (Blocking findings left, 2)
3. Two stages did not run because the cycle stopped here: the comparison of the foundation with the code, and bringing the branch up to date with the target branch. Without the comparison a later agent that reads the foundation by part may miss rules that apply to the instrument: about twenty decisions that bind every part of the code list parts one by one and do not name the new part, the dependency line of the build part does not name the new part though its npm script runs the instrument, and one decision was edited by hand instead of through the project's skill. Running both costs one agent and one review after your decision, in the correction. I recommend running both in the correction that follows your answers to items 1 and 2. Run them there, or let the request go on without them? (Skipped steps, 1)

### Fix or let through

4. The review of the whole change opened whole only 8 of the 53 decisions listed in full for it and named seventeen decisions that bear on the instrument as read only by their sentences or headings (on the game's data, the randomness of the simulation, the placing of tests, the imports between parts, the earning loop and the maps). If one of them says something the instrument breaks, you would feel it as a wrong number or a refused measurement; the tests of the instrument, the gate and the comparison with your instrument all passed. A fresh reviewer reading them in the correction costs a session and a round of review; making a task of it leaves them unread; letting it through accepts the risk. I recommend doing it in the correction, since a correction is going to run anyway. Do it in this request, make a task of it, or let it through? (Checks, 5)
5. The time of a map check with all three overlays together was never measured; one map with 23 programs took about a minute. If it is slow, whoever checks a package waits several minutes at every check, and nothing breaks. Measuring it costs a few minutes of a computer; making a task of it leaves the time unknown; letting it through accepts that. I recommend letting it through, since the time can be seen on the first real check. Measure it in this request, make a task of it, or let it through? The steps of the check by hand, whose result you write down as a remark:
   1. In the repository's directory, run the map check on one of the three overlay files of the instrument with `npm run --silent balance -- check-map --overlay <the overlay file>` (their names stand in the lower part, under Checks) and note how long it takes.
   2. Do the same with the other two overlay files and note both times.
   3. Each time you should see one table with 23 rows and a column of the program label, with no rules in it.

   (Checks, 6)

### You accept by merging

Merging accepts these items; if one does not suit you, say which.

6. Only three of the eleven player descriptions of your notes came: the three that start on Skraj lasu. The game now sends a player to Las only after Skraj lasu is solved, so the eight that start on Las describe a road the game no longer has. They can be brought later from the same notes.
7. The acceptance test no longer checks that the winning program feeds a campfire or that it holds every kind of condition and action: the program that solves Las does neither, and the decision about it now asks for a program of the closed lists that solves Las, not for one that holds every kind. The price is a weaker check of the kinds a program holds.
8. The map check measures every reference program on every map of the overlay with the skills of a new character and a chest from the program's own take list, and the earning loop over 24 real hours on seeds 1 to 100. A program that needs a bought skill branch therefore shows near zero on a map that needs it, unless the agent reruns it with the skills it needs; the skill says so. The price is rows that can look like "the map cannot be passed".
9. The cycle added the new part to the decisions and invariants that define which files the linter, the formatter and the size limit reach, so the instrument's files are held to the same rules as the rest of the code; no rule or option changed. It also changed three invariant tests to follow: the two quality tests that keep those file lists, and the quotation in the formatter's test. (Foundation entries, 1)
10. Three tests of the simulation changed what they take from the code: the first-map and first-pass tests now read their programs from the one shared file, and the first-pass test's precondition narrowed from "brings nothing" to "takes nothing from the chest", because the shared best program brings everything out. The counts of the seeds each program solves on those tests' named seeds were checked equal before and after. No invariant is marked violated by this change. (Foundation entries, 2)

## Cost

About 1 hour 52 minutes of work in all (1 hour 29 minutes without waiting for tools), about 138 million tokens, nearly all of them re-read cached input: 37 million on the strongest model (the plan and the three review turns), 71 million on the middle model (the entries, the slices of the engine, the guidelines, the campaign, the command line, the fix and this orchestration) and 30 million on the cheapest one (the overlays, the loop and trace, the map check and the skill). Review rounds: the whole change once (blocking: one, Minor: six), the fix once, and the review of that fix once (blocking: two, Minor: one). The table of stages stands in the committed record (link below). A copy of an executor's check stayed in the working directory of the task and one empty directory in the main checkout of the repository, made by a mistake in a path; nothing waits for them, and they are removed by hand or go when the task's directory goes.

## How to merge

Do not merge yet. Answer items 1 to 4; a correction then fixes what you choose, runs the comparison of the foundation with the code and the update from the target branch, and has the result reviewed. When it is ready, merge it keeping the commits (a merge commit, not a squash or a rebase), since the link to the record of the cycle survives only then.

<details>
<summary>W Twoim języku</summary>

**Stan: zablokowane** — po jedynej dozwolonej poprawce przeglądu została uwaga blokująca

## Co zobaczysz

Sama gra wygląda i działa dokładnie jak przedtem. Zmiana dodaje przyrząd do balansu, który teraz leży w repozytorium, więc każde pytanie o balans i każda nowa mapa to jedno polecenie, a nie kopia gry budowana ręcznie poza repozytorium.

- **Jedno polecenie.** Przyrząd uruchamia prawdziwą symulację gry poza przeglądarką, wiele ziaren w sekundę czy dwie. Przemiata ziarna dla jednego programu na jednej mapie, śledzi jedno przejście minuta po minucie, mierzy pętlę zarobkową przez godziny realne, gra całą kampanię gracza przez dni i wypisuje programy wzorcowe słowami, którymi gra pokazuje je graczowi. Sam najpierw buduje grę, więc świeży klon potrzebuje tylko `npm install`. Na tym samym commicie daje te same liczby co przyrząd z Twoich notatek: dla najlepszego programu na Lesie, ziarna 1–500, 359 z 500 rozwiązanych, mediana 754 minuty, tak samo w świeżym klonie.
- **Sprawdzanie mapy.** Jedno polecenie bierze nakładkę (plik, który zmienia dane gry tylko w pamięci na czas jednego pomiaru, na przykład dokłada mapę) i wypisuje jedną tabelę: dla każdej mapy nakładki i każdego programu wzorcowego odsetek rozwiązań na ziarnach 1–500, medianę minut rozwiązanych przejść, porażki według przyczyny i bilans pętli zarobkowej (ile przejście bierze ze skrzynki, ile do niej oddaje i jak często postać ginie). Tabela nie pokazuje reguł żadnego programu; programy występują jako `P1`–`P23`, a kluczem jest lista, którą przyrząd wypisuje dla agenta. Trzy mapy starej gry z krytyki progresji wchodzą jako nakładki.
- **Test, że Las da się rozwiązać.** Test akceptacyjny symulacji puszcza teraz na Lesie, na ziarnie, które sam nazywa, program zbudowany wyłącznie z warunków i akcji samej gry i sprawdza, że mapa jest rozwiązana, a mag płaci energią natury za ogień; pusty program tam ginie. Wcześniej sprawdzał tylko, że program przeżywa. Testy pierwszej mapy i pierwszego przejścia czytają programy z tego samego jednego pliku, z którego czyta przyrząd.
- **Skill i linia w instrukcjach** mówią agentowi, jak używać przyrządu, jak sprawdzić mapę przed definicją paczki i co wolno mu Ci pokazać.

### Pod spodem

Przyrząd importuje skompilowaną symulację gry i nie przepisuje żadnej jej liczby; mieszka w nowej części mapy kodu z własnymi testami, które puszczają to samo ziarno drogą gry i drogą przyrządu i żądają tego samego przejścia.

## Do rozstrzygnięcia

### Potrzebne od Ciebie

1. Po jedynej poprawce, którą pozwala przegląd, jego kolejny przegląd znalazł, że zdanie dodane do skilla każe agentowi powiedzieć Ci, jakiej gałęzi umiejętności potrzebuje jeden program wzorcowy na mapie Pustkowie. To dokładnie ten rodzaj podpowiedzi, przed którym tabela miała Cię chronić: kto sprawdzi Pustkowie dla Ciebie, poda Ci część rozwiązania. Cykl może to naprawić jednym zdaniem w skillu (agent mówi tylko, że wiersz zmierzono z umiejętnościami, których program potrzebuje, żadnej nie nazywając); to jedna runda poprawki i krótki przegląd. Zostawienie zdania nic dziś nie kosztuje i zostawia podpowiedź przy każdym sprawdzeniu tej mapy i każdej późniejszej, na której program wzorcowy zależy od gałęzi. Rekomenduję naprawę, bo to jedno zdanie. Naprawić tak, jak mówi uwaga, czy zostawić kod mimo niej? (Blocking findings left, 1)
2. Ten sam przegląd znalazł, że decyzja o limicie rozmiaru mówi teraz, że test sprawdza, czy limit obejmuje kod przyrządu, a takiego testu nie ma. Dziś limit go obejmuje (przebieg recenzenta przeczytał 314 plików zamiast 297), ale nikt by nie zauważył, gdyby późniejsza zmiana konfiguracji lintera go wyrzuciła, a decyzja mówiłaby coś, czego produkt nie robi. Dopisanie jednego pliku kontrolnego w katalogu przyrządu do testu rozmiaru kosztuje rundę i przypadek w teście w Pythonie; wycofanie tych słów z decyzji kosztuje rundę i zostawia limit na przyrządzie bez straży. Rekomenduję dopisanie pliku kontrolnego, bo decyzja wymienia część przyrządu wśród tych, które limit pilnuje. Dopisać test, wycofać słowa, czy zostawić jak jest? (Blocking findings left, 2)
3. Dwa etapy nie odbyły się, bo cykl tu stanął: porównanie fundamentu z kodem i doprowadzenie gałęzi do stanu gałęzi docelowej. Bez porównania późniejszy agent czytający fundament po częściach może pominąć reguły, które dotyczą przyrządu: około dwudziestu decyzji wiążących każdą część kodu wymienia części jedna po drugiej i nie wymienia nowej, wiersz zależności części budującej nie wymienia nowej, choć jej skrypt npm uruchamia przyrząd, a jedna decyzja została poprawiona ręcznie, nie przez skill projektu. Oba etapy kosztują jednego agenta i jeden przegląd po Twojej decyzji, w poprawce. Rekomenduję uruchomić oba w poprawce, która pójdzie po Twoich odpowiedziach na punkty 1 i 2. Uruchomić je tam, czy puścić zmianę dalej bez nich? (Skipped steps, 1)

### Napraw albo przepuść

4. Przegląd całej zmiany otworzył w całości tylko 8 z 53 decyzji wypisanych dla niego w całości i nazwał siedemnaście decyzji dotyczących przyrządu jako przeczytane tylko po zdaniach albo nagłówkach (o danych gry, losowaniu symulacji, rozmieszczeniu testów, importach między częściami, pętli zarobkowej i mapach). Gdyby jedna z nich mówiła coś, co przyrząd łamie, poczułbyś to jako zły wynik albo odmówiony pomiar; testy przyrządu, bramka i porównanie z Twoim przyrządem przeszły. Świeży recenzent czytający je w poprawce kosztuje sesję i rundę przeglądu; zrobienie z tego zadania zostawia je nieprzeczytane; przepuszczenie przyjmuje ryzyko. Rekomenduję zrobić to w poprawce, bo poprawka i tak pójdzie. Zrobić w tym PR-ze, zrobić z tego zadanie, czy przepuścić? (Checks, 5)
5. Czasu sprawdzania mapy ze wszystkimi trzema nakładkami naraz nikt nie zmierzył; jedna mapa z 23 programami trwała około minuty. Jeśli jest wolno, kto sprawdza paczkę, czeka kilka minut przy każdym sprawdzeniu, i nic się nie psuje. Zmierzenie kosztuje kilka minut komputera; zrobienie z tego zadania zostawia czas nieznany; przepuszczenie to przyjmuje. Rekomenduję przepuścić, bo czas zobaczysz przy pierwszym prawdziwym sprawdzeniu. Zmierzyć w tym PR-ze, zrobić z tego zadanie, czy przepuścić? Kroki sprawdzenia ręcznego, którego wynik zapisz jako uwagę:
   1. W katalogu repozytorium uruchom sprawdzanie mapy na jednym z trzech plików nakładek przyrządu poleceniem `npm run --silent balance -- check-map --overlay <plik nakładki>` (ich nazwy stoją w dolnej części, w Checks) i zanotuj, ile trwa.
   2. To samo zrób z dwoma pozostałymi plikami nakładek i zanotuj oba czasy.
   3. Za każdym razem powinna wyjść jedna tabela z 23 wierszami i kolumną z etykietą programu, bez żadnych reguł.

   (Checks, 6)

### Akceptujesz przez scalenie

Scalenie akceptuje te punkty; jeśli któryś Ci nie odpowiada, powiedz który.

6. Z jedenastu opisów graczy z Twoich notatek przyszły tylko trzy: te, które zaczynają na Skraju lasu. Gra posyła teraz gracza do Lasu dopiero po rozwiązaniu Skraju lasu, więc osiem zaczynających na Lesie opisuje drogę, której gra już nie ma. Można je dołożyć później z tych samych notatek.
7. Test akceptacyjny nie sprawdza już, że zwycięski program karmi ognisko ani że zawiera każdy rodzaj warunku i akcji: program, który rozwiązuje Las, nie robi żadnej z tych rzeczy, a decyzja o nim prosi teraz o program z zamkniętych list, który rozwiązuje Las, nie o taki, który zawiera każdy rodzaj. Ceną jest słabsze sprawdzenie rodzajów, które program zawiera.
8. Sprawdzanie mapy mierzy każdy program wzorcowy na każdej mapie nakładki z umiejętnościami nowej postaci i skrzynką z listy zabieranych rzeczy programu, a pętlę zarobkową przez 24 godziny realne na ziarnach 1–100. Program, który potrzebuje wykupionej gałęzi umiejętności, pokazuje więc blisko zera na mapie, która jej wymaga, chyba że agent puści go ponownie z potrzebnymi umiejętnościami; skill tak mówi. Ceną są wiersze, które mogą wyglądać jak „tej mapy nie da się przejść”.
9. Cykl dopisał nową część do decyzji i niezmienników, które określają, jakie pliki obejmują linter, formatter i limit rozmiaru, żeby pliki przyrządu podlegały tym samym regułom co reszta kodu; żadna reguła ani opcja się nie zmieniła. Zmienił też trzy testy niezmienników, żeby za tym nadążały: dwa testy jakości, które pilnują tych list plików, i cytat w teście formatera. (Foundation entries, 1)
10. Trzy testy symulacji zmieniły to, co biorą z kodu: testy pierwszej mapy i pierwszego przejścia czytają teraz programy z jednego wspólnego pliku, a warunek wstępny testu pierwszego przejścia zawęził się z „nic nie wynosi” do „nic nie bierze ze skrzynki”, bo wspólny najlepszy program wynosi wszystko. Liczby ziaren rozwiązywanych przez każdy program na nazwanych ziarnach tych testów sprawdzono przed zmianą i po niej: równe. Ta zmiana nie oznacza żadnego niezmiennika jako naruszonego. (Foundation entries, 2)

## Koszt

Łącznie około 1 godziny 52 minut pracy (1 godzina 29 minut bez czekania na narzędzia), około 138 milionów tokenów, prawie wszystkie to ponownie czytane tokeny z pamięci podręcznej: 37 milionów na najsilniejszym modelu (plan i trzy tury przeglądu), 71 milionów na średnim (wpisy, silnik, wytyczne, kampania, wiersz poleceń, poprawka i ta orkiestracja) i 30 milionów na najtańszym (nakładki, pętla i ślad, sprawdzanie mapy i skill). Rundy przeglądu: cała zmiana raz (blokująca: jedna, drobnych: sześć), poprawka raz i przegląd tej poprawki raz (blokujące: dwie, drobna: jedna). Tabela etapów stoi w zatwierdzonym zapisie (link niżej). Kopia sprawdzenia jednego wykonawcy została w katalogu roboczym zadania i jeden pusty katalog w głównym checkoucie repozytorium, powstały przez pomyłkę w ścieżce; nic na nie nie czeka i usuwa się je ręcznie albo znikają z katalogiem zadania.

## Jak scalić

Jeszcze nie scalaj. Odpowiedz na punkty 1–4; poprawka naprawi to, co wybierzesz, uruchomi porównanie fundamentu z kodem i doprowadzenie do stanu gałęzi docelowej i zleci przegląd wyniku. Gdy będzie gotowa, scal z zachowaniem commitów (merge commit, bez squasha i rebase), bo link do zapisu cyklu przetrwa tylko tak.

</details>

## Technical changes

The change is made in the commit groups below (the range of the request is `6a7b0acb..73d19b04` on top of the target branch):

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
- **Fix of the whole-change review, `a53f0f22`, `314deced`, `73d19b04`.** The table of the map check names programs by `P<n>` (the key is the list `programs` prints), the test of the table checks that no identifier of a reference program appears and that a row's sweep keeps the program's chest, the trace starts through the engine's `startOf`, three comments no longer cite `instrument-game-agreement` for what it does not hold, the skill says how to rerun a program that needs a branch and what to tell the person about the agent's own attempts, and D-425's sentence lists the balance instrument. The fix is not accepted by its review (see *Blocking findings left*), and none of it has been reverted.

## Checks

- **Gate:** `python -B .the-way/task-cycle/gate_times.py --output .runs/task-cycles/przyrzad-balansu/gate_times.md -- npm.cmd test` on `73d19b04`, exit 0, 782.240 s, started after the signal `start` of the adviser of the day: Node 2665 of 2665 passed (0 failed, 0 cancelled, 0 skipped); Python 703 tests in 4 directories, all OK (`tests/quality` with `OK (expected failures=1)`); foundation check `0 errors`; check of the instruction files `0 error, 144 warn, 7 info`. No check failed or did not run. The base had no failing check: the list was taken from the final gate of the earlier cycle (`docs/task-cycles/struktura-kodu/cycle.md`, added in `9a160ee5`; its gate on `6cc90484` exit 0).
- **CI:** the result of the run on the request's page was not waited for, since the code is unfinished (blocked request).
- **Own-work checks:** each slice's executor mutated what its test guards and saw the test fail: three deliberate breaks of the engine (agreement test), two mutations of the overlay module, two of the loop and trace, a mutant that ignored the resurrection flag in the command line and another in the map check (the first versions of both tests let them through and were rewritten), a byte mutant of one copy of the skill; the fix re-ran the mutant of the finding M-1 (a row's sweep without the chest) and the test failed on it.
- **Comparison with the notes' instrument** (acceptance criterion, once, by the executor of slice 8): the summaries are identical, 359 of 500, median 754 (summaries compared, not per-seed rows); in a fresh clone `npm ci` (23 s) and the one command gave the same. The reviewer of the whole change ran the sweep itself and found the summary identical; it did not repeat the fresh clone.
- **Campaigns:** on seeds 1 to 100 the three player descriptions give the notes' results except six campaigns of the two decent players, which end one final point higher (18 instead of 17); the executor explains it by thresholds of the combat trees in the game's data lowered since the notes' results were made, not by running the old game.
- **Not run on this code:** the return step, the reconciliation with the target branch (nothing came to the target branch since the base: `origin/main` stood at `6a7b0acb` at the last fetch), the review of the return step. The map check on all three overlays together was not timed; the real run on one overlay (`forest-pack`, 23 rows) took 58.3 s with the build.
- **The overlay files of the instrument** (for the steps of item 5): `balance/overlays/forest-pack.json`, `balance/overlays/wasteland.json` and `balance/overlays/dead-zone.json`.
- **Form check of this description:** `python -B .the-way/task-cycle/request_check.py .runs/task-cycles/przyrzad-balansu/request.md --task .runs/task-cycles/przyrzad-balansu/task-frozen.md`; check of private paths on it: `python -B .the-way/task-cycle/private_paths_check.py .runs/task-cycles/przyrzad-balansu/request.md`; the last runs of both, of the process remarks check (39 items, 0 not in the remarks) and the checks on the copy of the record are filled in with the record's link, below.
- **Working copies left:** `.runs/orchestrator/` and `.runs/gate-run-1.log` of the task's worktree (the orchestrator's own scripts, notes and the gate's log); the empty directory `.runs/task-cycles/przyrzad-balansu/reports/` in the main checkout of the repository, made by the executor of slice 5, whose removal the safety check refused. Nothing waits for them.
- **Directories of earlier tasks kept:** none; the script removed the worktree of the merged task `struktura-kodu` at the start.

## Foundation entries

- **D-427** (row 1): the reference programs have one place, `tests/sim/reference-programs.mjs`, which the instrument and the tests of the simulation read.
- **D-428** (row 2): the map check prints, for each map of an overlay and each reference program, the share solved on seeds 1 to 500, the median game minutes of the solved runs, the failures by cause and the balance of the earning loop, and no program's rules.
- **D-429** (row 3): the results of the instrument's measurements do not enter the repository; the instrument prints them or writes them to a file a flag names.
- **Section of the decision log opened:** *Balance measurement* (the three decisions above).
- **Glossary term `overlay`** (row 4): a file that changes the game's data in memory for the time of a measurement, the data files left untouched.
- **Invariant `instrument-game-agreement`** (row 5): the same seed sent through the game and run through the instrument gives the same map run; its test is `tests/balance/agreement.test.mjs`, written by slice 2.
- **D-378, changed** (Question 2): on Las a program of the closed lists solves the map, paying nature energy for its lightings, on a seed that a test of the simulation names, and the empty program dies there. Its *Verification* and *Rationale* follow.
- **D-29, D-32, D-425 and the invariants `eslint-source-rules`, `prettier-source-format`, `function-and-file-size`** (the cycle's): the new part `balance-tools` joins their *Scope* or *Part*; D-425's sentence also lists the balance instrument, edited in place by the fix and not through the project skill `the-way-record-decision` (finding N-3). No rule set, option or threshold changed.
- **Part `balance-tools`** (part map, by slice 2): claims `balance/**` and `tests/balance/**`, depends on `simulation`, has no trust boundary.
- **Invariant tests altered:** `tests/sim/acceptance.test.mjs` (quotes the changed D-378 by its `decision:` lines), `tests/quality/test_quality_invariants.py` (the quotation of D-32 and the Prettier patterns), `tests/quality/test_source_tool_scope.py` (`SCOPE_PARTS`). No *Violated* mark is set or cleared and no surface is altered.
- **The `foundation_check.py` run without `--skip-test-citations` on the finished change** (`python -B .the-way/elements/common/foundation_check.py`, exit 0): `0 errors`, no `listed:` line.

## Minor findings

- **N-3 (Minor, from the review of the fix, kept):** D-425 was edited without the project skill `the-way-record-decision`; the reviewer: "The new sentence is right; I suggest the return step takes D-425 through that skill." Place: `foundations/decisions.md`, the entry D-425 (its sentence and *Verification*, commit `73d19b04`).
- The six Minor findings of the review of the whole change (M-1 to M-6) were fixed by the fix commits and found fixed by its review; none remains.

## Findings outside the task's scope

none

## Course of the cycle

- **Task and sources:** an independent task: move the balance instrument into the repository as a standing tool with a map-check mode and an acceptance test in which a program solves Las; sources: the task document (accepted by the human on 2026-11-13 with its five questions and five settlements) and the foundation at the base `6a7b0acb`. The task's use of the withdrawn decision D-80 was read as the rule now held by the testing guidelines and D-73 and D-82 (record, Q1).
- **Process pin:** `bfb2e109735b5fff98802b8be0ff3c43c799262a`, not moved.
- **Spec:** none: no open design choice and no reserved choice; the questions carried to the cycle were choices of how to make what the task settles.
- **Route:** planned slices (the change crosses five parts); ten slices, executors on the classes `cheaper` (slices 5, 6, 9, 10) and `same` (slices 1, 2, 3, 4, 7, 8; the orchestrator raised slices 1, 7 and 8 from `cheaper`, reasons in the plan); no slice had a review of its own (risk none); the whole-change review judged all.
- **Plan:** `plan.md` and `plan-size.md` in the record; ten slices, every one fits the size limit.
- **Choices:** 12 choices of the plan and 13 of the orchestrator, in the questions table of the record.
- **Blocking findings left:** (1) N-1, `.claude/skills/loop2-balance/SKILL.md:108-113` and its copy in `.agents/skills/loop2-balance/SKILL.md`: the sentence the fix of the finding M-5 added has the agent tell the person which skill branch one reference program needs on one map, which gives the person the hint the finding I-1 took out of the table; the fix tried to make the table anonymous and to tell the agent how to rerun a program that needs a branch, and the new sentence came with it; what would close it: the agent says only that the row was measured with the skills the program needs. (2) N-2, `foundations/decisions.md`, the *Verification* clause of D-425 (commit `73d19b04`): it says a test checks that the size limit reaches the balance instrument, but the size test (`tests/quality/test_function_and_file_size.py`) plants no file under `balance/`; the fix tried to add the instrument to the decision's list as the finding M-2 asked and also added it to the clause; what would close it: one control file under `balance/` in the size test, or the words taken out of the clause.
- **Record:** by the SHA of the commit that adds it (link added after the copy is committed).
