**State: ready** — the check is green on Linux and everything you answered is done; the rule that makes it required stays with you and does not block this merge, and one question of wording can be let through by merging.

## What you will see

Every pull request into the main branch now gets the repository's one command of tests run on GitHub, on a Linux machine, with the process folder at exactly the version this repository pins. The result shows on the request, so a red result is seen before the merge and not only on the computer where the change was made. The same command also runs on the computer of whoever works on the repository, as before.

The one command gains a fifth, last stage: it checks the instruction files of the repository (the agents' instructions, skills and rules). An error that check reports stops the tests; a warning does not. The tests that need Docker are skipped at once only where no Docker daemon answers and there is no Docker Desktop to start; where a daemon answers, they run. On GitHub's Linux machine they ran in both earlier runs of this request: the production images were built and no test was skipped for lack of a daemon.

The repository's scan for secrets stays GitHub's own secret scanning with the blocking of pushes that hold a secret; the new check adds no second scanner. After your answers, the decision on scanning names the scan as GitHub's documentation does for a public repository (plain secret scanning, not the paid product of private repositories). The version of the process the repository pins was moved first, to a newer one that describes how a repository runs its tests on every request.

### Underneath

One new workflow file for GitHub Actions starts the one command on each pull request, with read-only access and no secret, and its own test keeps those properties; the gate, the foundation entries and the process pin changed to match, and your round of corrections changed only wording in the foundation, the workflow's comment and the README.

## For you to decide

### Needed from you

1. The rule that makes the check `tests` required before a merge into the main branch stays with you: you set it yourself in the repository settings, as you did in the process repository (a separate rule for the main branch with the repository administrator role allowed to bypass it; the existing rule of the main branch stays as it is). It does not block the merge of this request. Without the rule the check still shows on every request, but a red request can be merged by oversight; with the bypass, you can still merge while GitHub Actions itself is broken. The check has already run green on this request (its link stands under *Checks*), so you can create the rule at any time. (Checks, 1)

### Fix or let through

2. Three small remarks of the review of your corrections were left unfixed, since a correction does not run a second round. First, the comment in the workflow and the README no longer say that the Docker daemon answers on GitHub's Linux machine; they point to the decision on CI for the reason and say that a skipped container test leaves a line with its reason in the log. They also do not say two things you asked for: that Docker is installed on GitHub's Linux machine (it stands in the decision, and the comment points there so that the reason is in one place) and that the runs of this request show the daemon answering (such a sentence about past runs in a file would go stale once the request merges; the proof is under *Checks*: the two runs ran the container tests, 253 and 261 tests, with the production images built and no skip). Second, the reasoning of the decision on CI still says a Linux machine is what the tests of containers are made for, which overstates it because the local gate runs them on Windows through Docker Desktop, and it takes "built on Linux" from a remark in another decision and not from the repository's Dockerfile. Third, the subjects of the two correction commits say a little more than their changes do (one says the comment says Docker is installed, the other leaves out "at once" before "skipped"). None of them changes what the check does or what is true; each costs a later reader a small wrong impression. Making a task of them leaves them as they are until someone opens it; letting them through accepts them. I recommend letting them through, since nothing that stands is false or unsourced and the first part is shown by the runs. Make a task of them, or let them through? (Minor findings, 1 to 3)

### You accept by merging

Merging accepts these items; if one does not suit you, say which.

3. This correction answered your answer to an item of this request, and the cycle judged that the foundation required part of what it changed (the decision on scanning named the scan wrongly) and that the task did not require the rest (the wording of the comment, the README and the reason for Linux).
4. The cycle chose, where the task did not: to move the process pin to the commit on which the refinement ran the foundation check and the instruction check (fifteen commits older than the newest, which nobody had checked against this repository), and not to the newest; to name the check `tests`, as in the process repository, since the rule you set will name it; to give the job a time limit of 60 minutes, since the local gate takes 15 to 30 minutes; to take Node.js from the repository's own declaration of the version it needs; and to pin the three GitHub actions it uses to the commits of their 7.x releases, so a moved tag changes nothing, as the process repository does; and, in your round of corrections, to leave out of the comment and the README the sentence about the runs of this request. A different answer would change only the workflow file or the comment, one line each.
5. The cycle wrote foundation entries you had not seen at the task: a decision on how CI checks a request (one job named `tests`, on Linux because the game's containers are Linux containers, which rests on the project's own setup, running the one command and no other check beside it, with a read-only token and no secret, the history fetched in full, the actions at fixed commits and the job's name fixed because the rule names it); five facts about GitHub's documentation and settings that the decisions on scanning and on CI rest on (the fifth, from your round, is that GitHub runs secret scanning on a public repository for free); the place of the workflow in the part map (the part that directs the work, and listed as a trust boundary that every change of it is reviewed for); and a row in the testing guidelines for that boundary. The workflow is a boundary because it runs the code of a request from outside on GitHub's machine. The decision on scanning also gained a relation to the decision on CI, and its sentences about GitHub were narrowed to what GitHub's documentation says.
6. One test that guards the invariant "the account server's type check" lists the files that count as a deployment route; it now also lists the new workflow as a file that deploys nothing, and the new test of the workflow separately proves it ships nothing, so the invariant is not weakened. The new test of the workflow holds eleven sentences of the new decision and of the decision on scanning, and the tests of the gate and of the Docker gate were brought up to date for the fifth stage and for the case of a daemon that answers on a computer with no Docker Desktop; each of them holds its sentence by a line naming the decision. Your round changed no test. No invariant was written and none was marked as violated.

## Cost

About 2 hours 57 minutes of working time in the cycle's stages (of which about 49 minutes without waiting for tools), plus three full runs of the tests of 15, 20 and 14 minutes, which the orchestrator started on the day's advisor's signal. 97.4 million tokens in all: 75.5 million on Sonnet 5.5 and 21.8 million on Opus 5.5. One author, one fix round with its review and one correction round with its review, four reviews by agents that did not make the change, two returns to the foundation. The table of stages stands in the committed record, linked under *Course of the cycle*. Two directories of earlier tasks still stand because the script that removes finished ones could not tell they were no longer needed; nothing in this request waits for them and you may remove them by hand; their names stand under *Checks*.

## How to merge

Merge with a merge commit, which the repository's rule allows, so that the commits and the link to the record survive; a squash or a rebase would lose the link to the record. The rule of item 1 can be set before or after the merge.

<details>
<summary>W Twoim języku</summary>

**Stan: gotowe** — sprawdzenie jest zielone na Linuksie i wszystko, co odpowiedziałeś, jest zrobione; reguła czyniąca je wymaganym zostaje u Ciebie i nie blokuje tego scalenia, a jedno pytanie o brzmienie możesz przepuścić scaleniem.

## Co zobaczysz

Każda prośba o scalenie do głównej gałęzi ma teraz uruchamiane na GitHubie jedno polecenie testów repozytorium, na maszynie z Linuksem, z folderem procesu dokładnie w wersji, którą repozytorium przypina. Wynik widać na prośbie, więc czerwony wynik zobaczysz przed scaleniem, a nie tylko na komputerze, na którym zrobiono zmianę. To samo polecenie dalej biegnie też na komputerze osoby pracującej nad repozytorium.

Jedno polecenie ma piąty, ostatni etap: sprawdza pliki instrukcji repozytorium (instrukcje agentów, skille i reguły). Błąd, który zgłosi, zatrzymuje testy; ostrzeżenie nie. Testy wymagające Dockera pomija się od razu tylko tam, gdzie żaden demon Dockera nie odpowiada i nie ma Docker Desktop do uruchomienia; gdzie demon odpowiada, testy biegną. Na maszynie GitHuba z Linuksem biegły w obu wcześniejszych przebiegach tej prośby: zbudowano obrazy produkcyjne i żaden test nie został pominięty z braku demona.

Skanem sekretów repozytorium zostaje wbudowany skan sekretów GitHuba z blokadą pushów zawierających sekret; nowe sprawdzenie nie dokłada drugiego skanera. Po Twoich odpowiedziach decyzja o skanowaniu nazywa skan tak, jak dokumentacja GitHuba dla repozytorium publicznego (zwykły skan sekretów, a nie płatny produkt repozytoriów prywatnych). Przypięta w repozytorium wersja procesu została najpierw przesunięta na nowszą, która opisuje, jak repozytorium uruchamia testy na każdej prośbie.

### Pod spodem

Jeden nowy plik workflow dla GitHub Actions uruchamia jedno polecenie na każdej prośbie, z dostępem tylko do odczytu i bez sekretu, a jego własny test pilnuje tych cech; bramka, wpisy fundamentu i przypięcie procesu zmieniły się odpowiednio, a Twoja runda poprawek zmieniła tylko brzmienie w fundamencie, w komentarzu workflow i w README.

## Do rozstrzygnięcia

### Potrzebne od Ciebie

1. Reguła czyniąca sprawdzenie `tests` wymaganym przed scaleniem do głównej gałęzi zostaje u Ciebie: ustawiasz ją sam w ustawieniach repozytorium, jak w repozytorium procesu (osobna reguła dla głównej gałęzi z wyjątkiem pozwalającym ją obejść dla roli administratora repozytorium; istniejąca reguła głównej gałęzi zostaje bez zmian). Nie blokuje to scalenia tej prośby. Bez reguły sprawdzenie dalej będzie widać na każdej prośbie, ale czerwoną prośbę można scalić przez przeoczenie; z wyjątkiem możesz scalać nawet wtedy, gdy sam GitHub Actions nie działa. Sprawdzenie już zazieleniło się na tej prośbie (link stoi w sekcji *Checks*), więc regułę możesz założyć w dowolnej chwili. (Checks, 1)

### Napraw albo przepuść

2. Trzy drobne uwagi przeglądu Twoich poprawek zostały niepoprawione, bo poprawka nie ma drugiej rundy. Po pierwsze, komentarz w workflow i README nie mówią już, że demon Dockera odpowiada na maszynie GitHuba z Linuksem; wskazują decyzję o CI dla powodu i mówią, że pominięty test kontenerów zostawia w logu linię z powodem. Nie mówią też dwóch rzeczy, o które prosiłeś: że Docker jest zainstalowany na linuksowej maszynie GitHuba (stoi w decyzji, a komentarz tam wskazuje, żeby powód był w jednym miejscu) i że przebiegi tej prośby pokazują odpowiadający demon (takie zdanie o minionych przebiegach w pliku zestarzałoby się po scaleniu; dowód stoi w sekcji *Checks*: oba przebiegi uruchomiły testy kontenerów, 253 i 261 testów, z zbudowanymi obrazami produkcyjnymi i bez pominięć). Po drugie, uzasadnienie decyzji o CI nadal mówi, że maszyna z Linuksem jest tą, do której testy kontenerów są stworzone, co przesadza, bo lokalna bramka uruchamia je na Windowsie przez Docker Desktop, a „zbudowane na Linuksie” bierze z uwagi w innej decyzji, a nie z Dockerfile repozytorium. Po trzecie, tematy dwóch commitów poprawki mówią trochę więcej niż ich zmiany (jeden mówi, że komentarz mówi o zainstalowanym Dockerze, drugi pomija „od razu” przed „pominięty”). Żadna z nich nie zmienia działania sprawdzenia ani tego, co prawdziwe; każda kosztuje późniejszego czytelnika drobne mylne wrażenie. Zrobienie z nich zadania zostawia je bez zmian, dopóki ktoś go nie otworzy; przepuszczenie je akceptuje. Rekomenduję przepuścić, bo nic, co stoi, nie jest fałszywe ani bez źródła, a pierwszą część pokazują przebiegi. Zrobić z nich zadanie, czy przepuścić? (Minor findings, 1 do 3)

### Akceptujesz przez scalenie

Scalenie akceptuje te pozycje; jeśli któraś Ci nie odpowiada, powiedz która.

3. Ta poprawka odpowiedziała na Twoją odpowiedź na pozycję tej prośby, a cykl uznał, że fundament wymagał części tego, co zmieniono (decyzja o skanowaniu błędnie nazwała skan), a reszty zadanie nie wymagało (brzmienie komentarza, README i powodu wyboru Linuksa).
4. Cykl wybrał tam, gdzie zadanie nie rozstrzygało: przesunąć przypięcie procesu na commit, na którym refinacja uruchomiła kontrolę fundamentu i sprawdzenie plików instrukcji (piętnaście commitów starszy od najnowszego, którego nikt nie sprawdził na tym repozytorium), a nie na najnowszy; nazwać sprawdzenie `tests`, jak w repozytorium procesu, bo regułę, którą ustawisz, nazywa się po nazwie; dać zadaniu limit czasu 60 minut, bo lokalna bramka trwa 15–30 minut; wziąć Node.js z własnej deklaracji repozytorium o potrzebnej wersji; przypiąć trzy używane akcje GitHuba do commitów ich wydań 7.x, żeby przesunięty tag niczego nie zmienił, tak jak w repozytorium procesu; oraz w Twojej rundzie poprawek pominąć w komentarzu i README zdanie o przebiegach tej prośby. Inna odpowiedź zmieniłaby tylko plik workflow albo komentarz, po jednym wierszu.
5. Cykl zapisał wpisy fundamentu, których nie widziałeś przy zadaniu: decyzję o tym, jak CI sprawdza prośbę (jedno zadanie o nazwie `tests`, na Linuksie, bo kontenery gry są kontenerami Linuksa, co opiera się na ustawieniu samego projektu, uruchamiające jedno polecenie i żadne inne sprawdzenie obok, z tokenem tylko do odczytu i bez sekretu, z pełną historią, z akcjami na stałych commitach i z nazwą zadania ustaloną, bo reguła ją nazywa); pięć faktów o dokumentacji i ustawieniach GitHuba, na których opierają się decyzje o skanowaniu i o CI (piąty, z Twojej rundy, to że GitHub uruchamia skan sekretów dla repozytorium publicznego za darmo); miejsce workflow w mapie części (część kierująca pracą, i wpisane jako granica zaufania, której każda zmiana jest sprawdzana przeglądem); oraz wiersz w wytycznych testowania dla tej granicy. Workflow jest granicą, bo uruchamia na maszynie GitHuba kod prośby z zewnątrz. Decyzja o skanowaniu dostała też relację do decyzji o CI, a jej zdania o GitHubie zawężono do tego, co mówi dokumentacja GitHuba.
6. Jeden test pilnujący niezmiennika „sprawdzenie typów serwera kont” zawiera listę plików uznawanych za drogę wdrożenia; teraz dopisuje do niej nowy workflow jako plik niczego niewdrażający, a nowy test workflow osobno dowodzi, że niczego nie wysyła, więc niezmiennik nie został osłabiony. Nowy test workflow trzyma jedenaście zdań nowej decyzji i decyzji o skanowaniu, a testy bramki i bramki Dockera uzupełniono o piąty etap i o przypadek demona, który odpowiada na komputerze bez Docker Desktop; każdy z nich trzyma swoje zdanie wierszem wskazującym decyzję. Twoja runda nie zmieniła żadnego testu. Nie zapisano żadnego niezmiennika i żadnego nie oznaczono jako naruszonego.

## Koszt

Około 2 godzin 57 minut czasu pracy w etapach cyklu (z czego ok. 49 minut bez oczekiwania na narzędzia), plus trzy pełne przebiegi testów po 15, 20 i 14 minut, które orkiestrator uruchomił na sygnał doradcy dnia. Razem 97,4 mln tokenów: 75,5 mln na Sonnet 5.5 i 21,8 mln na Opus 5.5. Jeden autor, jedna runda poprawki z przeglądem i jedna runda korekty z przeglądem, cztery przeglądy przez agentów, którzy zmiany nie robili, dwa powroty do fundamentu. Tabela etapów stoi w zacommitowanym rekordzie, linkowanym w sekcji *Course of the cycle*. Dwa katalogi wcześniejszych zadań dalej stoją, bo skrypt usuwający zakończone nie mógł rozpoznać, że są już zbędne; nic w tej prośbie na nie nie czeka i możesz je usunąć ręcznie; ich nazwy stoją w sekcji *Checks*.

## Jak scalić

Scal commitem scalającym, na co reguła repozytorium pozwala, żeby commity i link do rekordu przetrwały; squash albo rebase zgubiłyby link do rekordu. Regułę z pozycji 1 możesz ustawić przed scaleniem albo po nim.

</details>

## Technical changes

One branch of twelve commits on top of the process pin move (`e5ad01fb`), plus the record's pair. It matters mostly to whoever opens the workflow or the gate later.

- **Pin move** (`e5ad01fb`): the gitlink of `.the-way` from `ec7929d` to `bfb2e109735b5fff98802b8be0ff3c43c799262a` (the commit that holds the description of running the one command in CI), the block of `AGENTS.md` and two entry points of the part-map skill, all rewritten by the installer.
- **Fifth stage and foundation entries** (`5d6c57e5`, `5d70d505`): `scripts/test.py` runs `python -B .the-way/instruction-files/check_instructions.py` after the foundation check, in the full run only; `README.md` and `guidelines/testing.md` name it; the tests of the gate (`tests/quality/test_test_gate.py`, `gate_fixture.py`, `test_node_test_selection.py`) hold its order and its stop on an error; `tests/quality/test_docker_gate.py` holds that a daemon that answers on a computer with no Docker Desktop is used. `scripts/docker_gate.py` needed no change. D-405, D-77 and D-390 were edited and D-412 added.
- **Workflow** (`51596257`): `.github/workflows/tests.yml`, job `tests` on `ubuntu-24.04`, event `pull_request` into `main`, `permissions: contents: read`, checkout with `fetch-depth: 0`, `submodules: true`, `persist-credentials: false`, then `git symbolic-ref refs/remotes/origin/HEAD refs/remotes/origin/main`, Python from `.the-way/.python-version`, Node from `package.json`, `npm ci`, the quality environment from `requirements-quality.txt` with hashes, and `npm test`. Its test is `tests/quality/test_ci_workflow.py`; `tests/invariants/test_account_server_typecheck.py` lists the file as no deployment route.
- **Fix of the Minor findings of the review of the whole change** (`419b7d1e`, `42bf3768`, `02e112f5`, `fd89c408`, `9912f0db`): a test that fails when a step or the job carries `continue-on-error`; the workflow moved in the part map from the part that builds to the part that directs the work; new decision D-413 cited by the test; the workflow listed as a trust boundary with review as its check; D-412's reason narrowed to secrets of kinds GitHub recognizes. None of these was reverted.
- **Return step** (`1c0e49eb`): four environment facts from GitHub's documentation and runner image list and one read of the repository's own settings, named in D-412 and D-413; sentences of D-412, D-413 and D-390 that the sources do not hold were corrected.
- **Correction 1** (`5ae669e8`, `7da06c4f`; remarks in `reports/correction-1-remarks.md`): D-412's binding sentence names the scan as GitHub's built-in secret scanning, on a new environment fact (public repositories get it free); D-413's reason for Linux is the game's Linux containers, resting on the project's own setup, with no claim about GitHub's Windows machine; the comment of `.github/workflows/tests.yml` and a line of `README.md` point to D-413 for the reason and say, as D-390 does, that a test of containers is skipped with a message in the log where no daemon answers and there is no Docker Desktop to start.

## Checks

1. **CI on this request:** __CI__
2. **Gate on the commit that moved the pin** (`e5ad01fb`): `python -B .the-way/task-cycle/gate_times.py --output .runs/task-cycles/ci-przy-pr/gate_times.md -- npm.cmd test`, exit 0, 591 tests in 4 directories, 902 s, Windows; the move broke no check.
3. **Final gates:** the same command on `1c0e49eb` (before the correction), exit 0, 607 tests in 4 directories, 1211 s; and on the final tree `7da06c4f` (after correction 1), exit 0, 607 tests in 4 directories (`tests/agent_workflow`, `tests/quality`, `tests/deploy`, `tests/invariants` and the Node tests), 823 s, Windows, no other gate of the repository running. The fifth stage ran and reported `0 error, 140 warn, 7 info`. The script counted one other gate run at the same time in its registry in the first of the two, which the cycle did not identify; the day's advisor reported none. No check failed or did not run in either run.
4. **Failing on the base:** the list the cycle took from the final gate of the earlier cycle of the merged branch (`docs/task-cycles/panel-wlasciciela/cycle.md`, commit `9858bec3`): two tests of `tests/quality` (`test_ruff_source_rules`, `test_shellcheck_source_rules`) that failed there for lack of the quality environment in that worktree; here the environment was installed and they passed. The base `bdf0dbd7` is a merge commit whose tree equals that of its second parent, so no gate was run on the base.
5. **Own-work checks:** the author named the green run on Linux with the Docker tests running as the requirement most likely unmet; it checked the Linux install step in a `python:3.14-slim` container (pip exit 0, Ruff 0.17.1, ShellCheck 0.11.0), a stand-in daemon case with a mutation shown failing, and nine mutations of the workflow, all caught by `tests/quality/test_ci_workflow.py` (a tenth, `continue-on-error`, caught after the fix). The CI runs are the check that every other test passes on Linux: they did.
6. **Incomplete reading, kind 14:** the review of the whole change read 24 of its 100 selected decisions whole and the rest by index line; unread whole: D-356, D-09, D-406, D-391, D-392, D-28 to D-33 (`reports/review-whole-report.md`, Unread material). You answered to let it through.
7. **Foundation check on its own** without `--skip-test-citations`: `python -B .the-way/elements/common/foundation_check.py`, exit 0, `0 errors`, no `listed:` line (run on the final tree by the gate, and by each review). `python -B .the-way/instruction-files/check_instructions.py`: exit 0, `0 error, 140 warn, 7 info` (143 warnings on CI, not looked into; the refinement reported 130 on an earlier commit).
8. **Reviews:** whole change `PASS 5159625748f3`; fix `PASS 9912f0db9557`; return step `PASS 1c0e49ebef3c`; correction 1 `PASS 7da06c4fe0fe`; each with the checks it ran and exit codes in its report.
9. **Review reminder:** `python -B .the-way/task-cycle/review_reminder.py origin/main`, exit 0, 19 merges since the tag `foundation-review/2026-11-13`, threshold 60, `reminder: no`.
10. **Checks of the description and of the record:** __CHECKS__
11. **Working copies left:** none. **Directories of earlier tasks kept** (name | branch | reason): `przewodnik-testow` | `task/przewodnik-testow` | holds `fail-node` and `fail-python`, which stay: uncommitted changes (a tracked file changed or a new file that git does not ignore); `coding-guidelines` | `task/coding-guidelines` | uncommitted changes (a tracked file changed or a new file that git does not ignore).

## Foundation entries

1. D-412 (row 1): the scan for secrets is GitHub's built-in secret scanning with push protection, and CI adds no scanner. Its binding sentence names the scan as GitHub's documentation does for a public repository (correction 1); its *Based on* names three facts, then the fifth fact, and its *Rationale* says what they hold (the cycle's).
2. D-405 (row 2): the check of the instruction files is the fifth and last stage after the foundation check; it stops the gate on an error, not on a warning.
3. D-77 (row 2, *Decisions in play*): the run of one file runs no check of the instruction files either.
4. D-390 (row 4): a computer with no Docker Desktop skips a test that needs Docker at once only where no daemon answers; where one answers, the test runs. Its *Rationale* sentence was made a condition (the cycle's).
5. D-413 (the cycle's, no row): one job named `tests` on Linux runs the one command on every pull request into the main branch, with a read-only token, no secret, the full history, the process folder at the pinned commit, the actions at fixed commits and the job's name fixed; the reason for Linux is the game's Linux containers (D-14, D-263), resting on the project's own setup; its *Based on* is the runner-image fact.
6. Environment facts (the cycle's): `github-secret-scanning-history`, `github-push-protection-blocks-push`, `loop2-secret-scanning-enabled` (a read of the repository's settings), `github-ubuntu-runner-docker`, and, from correction 1, `github-secret-scanning-public-repository`.
7. Part map (the cycle's): the workflow in `agent-workflow` (sentence, files, trust boundary); `build-tools` is as before. Row 3 (the reason for Linux) went, by your answer, to D-413 alone; the comment of `.github/workflows/tests.yml` points to it.
8. Testing guidelines (the cycle's): a row for the workflow among the trust boundaries (review is its check), and the lines for the fifth stage.
9. Tests that hold a sentence of a decision by a line `decision:`, added or changed: `tests/quality/test_ci_workflow.py` (new, 11 tests; D-412, D-413), `tests/quality/test_test_gate.py` and `tests/quality/test_node_test_selection.py` (D-405, D-77), `tests/quality/test_docker_gate.py` (D-390). Invariant test altered: `tests/invariants/test_account_server_typecheck.py` (`account-server-typecheck`), as item 6 says. No invariant written, no *Violated* mark set or cleared.
10. Gap that stands and was not touched, from the invariants file: the invariant `cross-part-imports` rests on a fact marked `TODO` since 2026-11-08. You answered that it needs no task of its own, since it went into a queued task about the decisions and invariants that do not match the game.

## Minor findings

__MINOR__

## Findings outside the task's scope

none

## Course of the cycle

- **Task and sources:** run loop2's one command of tests on GitHub on every pull request into `main`, plus the scan of secrets; independent task; the task note in the author's backlog (frozen copy in the record), `origin/main` at `bdf0dbd7`.
- **Process pin:** moved from `ec7929d` to `bfb2e109735b5fff98802b8be0ff3c43c799262a` by the branch's first commit `e5ad01fb`; the gate on that commit passed (exit 0, 591 tests, 902 s), so the move carried no work for the task.
- **Spec:** none; the answers of the task settle each entry and no design choice was open.
- **Route:** one author without a plan (Sonnet 5.5, `same` class: the change crosses four parts and the Linux fixes need diagnosis); reviews on Opus 5.5.
- **Plan:** none.
- **Choices:** 4 recorded in the questions table (the pin target, the branch name, no gate on the base, the unread decisions of the review) and 1 autonomous choice of the correction (A2: the sentence about the runs left out of the comment and the README); link: `docs/task-cycles/ci-przy-pr/cycle.md`, section *Questions and autonomous choices*. The author's nine other choices stand in `reports/author-report.md`.
- **Corrections:** correction 1 (your answers of 2026-11-15 23:17 UTC, `reports/correction-1-remarks.md`): made on the branch at `4923dd0e` with no reset; the remote branch was not behind `origin/main`, so no merge was needed; its range `4923dd0e..7da06c4f`, reviewed `PASS`.
- **Blocking findings left:** none.
- **Record:** __RECORD__
