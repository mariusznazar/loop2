**State: blocked** — waits for your action outside the repository: after the new check turns green on this request, you set the rule that makes it required before a merge.

## What you will see

Every pull request into the main branch now gets the repository's one command of tests run on GitHub, on a Linux machine, with the process folder at exactly the version this repository pins. The result shows on the request, so a red result is seen before the merge and not only on the computer where the change was made. The same command also runs on the computer of whoever works on the repository, as before.

The one command gains a fifth, last stage: it checks the instruction files of the repository (the agents' instructions, skills and rules). An error that check reports stops the tests; a warning does not. The tests that need Docker are skipped at once only where no Docker daemon answers and there is no Docker Desktop to start; where a daemon answers, they run. GitHub's machine with Linux is where the cycle expects them to run instead of being skipped; the run of this request shows whether they did.

The repository's scan for secrets stays GitHub's own scan with the blocking of pushes that hold a secret; the new check adds no second scanner. The version of the process the repository pins was moved first, to a newer one that describes how a repository runs its tests on every request.

### Underneath

One new workflow file for GitHub Actions starts the one command on each pull request, with read-only access and no secret, and its own test keeps those properties; the gate, the foundation entries and the process pin changed to match.

## For you to decide

### Needed from you

1. The check that this request adds is not yet a requirement for merging, and only you can make it one. After the first green run of the check on this request (its link stands under *Checks*), create in the repository settings a separate rule for the main branch that requires that check to pass, with the repository administrator role allowed to bypass it, as you did for the process repository. Leave the existing rule of the main branch as it is. The check is named `tests`. Without the rule the check still shows on every request, but a red request can be merged by oversight; with the bypass, you can still merge while GitHub Actions itself is broken, which a rule without the bypass would not allow. (Checks, 1)

### Fix or let through

2. Four small remarks of the reviews were left unfixed, and all of them are about wording that a person who later reads or changes the decision on CI will meet. First, a comment in the workflow and a line of the README say that the Docker daemon answers on GitHub's Linux machine, while the decision says only what GitHub's list of machines shows: Docker is installed there; the run of this request shows whether the daemon answers. Second, the decision's reason for choosing Linux (Docker is installed there) holds for the Windows machine too, so it does not tell the two apart; the part that would is that the game's containers are Linux containers, for which the cycle found no source. Third, the decision on scanning secrets calls the scan "Secret Protection", while GitHub's documentation says a public repository like this one gets plain secret scanning for free and names Secret Protection for private repositories of an organisation. Fourth, the reason for choosing Linux now stands in two places, the comment and the decision. Each remark leaves the facts as they are and costs only a reader a wrong impression. Fixing them in this request costs one more round of correction with its review and does not change what the check does; making a task of them leaves the wording as it is until someone opens it; letting them through accepts it. I recommend letting them through, except the second remark if the run of this request shows the Docker tests ran, since then the first remark is shown true. Fix them in this request, make a task of them, or let them through? (Minor findings, 1 to 4)
3. The review of the whole change read 24 of the 100 selected decisions whole and the other 76 only by their index line; among those it did not open whole were the decisions on the order of the gate's stages being unaffected, on starting Docker Desktop and on the other workflows. The change adds one stage at the end and touches none of what those decisions bind, and the full tests on the final tree ran green, so a contradiction would most likely have shown. If one was missed, whoever works on the gate meets it later as a surprise in the decision log. Having a fresh reviewer read them in this request costs one more review and a round of correction if it finds something; making a task of it leaves the gap; letting it through accepts it. I recommend letting it through. Read them in this request, make a task of it, or let it through? (Checks, 6)
4. One old gap stands in the foundation, which this request did not touch: the rule that no part of the repository imports from another part, except where the parts allow it, states that it rests on a fact that is not yet named, and the foundation marks it as to be filled by you. Anyone who changes the rule meets a source nobody wrote down. Writing the source now costs a short session of its own and no round of review in this request; making a task of it leaves the gap standing; letting it through accepts it on the main branch. I recommend making a task of it, since it is unrelated to this request. Write it in this request, make a task of it, or let it through? (Foundation entries, 10)

### You accept by merging

Merging accepts these items; if one does not suit you, say which.

5. The cycle chose, where the task did not: to move the process pin to the commit on which the refinement ran the foundation check and the instruction check (fifteen commits older than the newest, which nobody had checked against this repository), and not to the newest; to name the check `tests`, as in the process repository, since the rule you set will name it; to give the job a time limit of 60 minutes, since the local gate takes 15 to 30 minutes; to take Node.js from the repository's own declaration of the version it needs; and to pin the three GitHub actions it uses to the commits of their 7.x releases, so a moved tag changes nothing, as the process repository does. A different answer would change only the workflow file, one line each, before the rule is set.
6. The cycle wrote foundation entries you had not seen at the task: a decision on how CI checks a request (one job named `tests`, on Linux, running the one command and no other check beside it, with a read-only token and no secret, the history fetched in full, the actions at fixed commits and the job's name fixed because the rule names it), the four facts about GitHub's documentation and settings that the decisions on scanning and on CI rest on, the place of the workflow in the part map (the part that directs the work, and listed as a trust boundary that every change of it is reviewed for), and a row in the testing guidelines for that boundary. The workflow is a boundary because it runs the code of a request from outside on GitHub's machine. The decision on scanning also gained a relation to the decision on CI, and its sentence about GitHub was narrowed to what GitHub's documentation says.
7. One test that guards the invariant "the account server's type check" lists the files that count as a deployment route; it now also lists the new workflow as a file that deploys nothing, and the new test of the workflow separately proves it ships nothing, so the invariant is not weakened. The new test of the workflow holds eleven sentences of the new decision and of the decision on scanning, and the tests of the gate and of the Docker gate were brought up to date for the fifth stage and for the case of a daemon that answers on a computer with no Docker Desktop; each of them holds its sentence by a line naming the decision. No invariant was written and none was marked as violated.

## Cost

About 2 hours 37 minutes of working time in the cycle's stages (of which about 34 minutes without waiting for tools), plus two full runs of the tests of 15 and 20 minutes, which the orchestrator started on the day's advisor's signal. 65.8 million tokens in all: 46.6 million on Sonnet 5.5 and 19.1 million on Opus 5.5. One author, one fix round with its review, three reviews by agents that did not make the change, one return step. The table of stages stands in the committed record, linked under *Course of the cycle*. Two directories of earlier tasks still stand because the script that removes finished ones could not tell they were no longer needed; nothing in this request waits for them and you may remove them by hand; their names stand under *Checks*.

## How to merge

Merge with a merge commit, which the repository's rule allows, so that the commits and the link to the record survive; a squash or a rebase would lose the link to the record. After the merge, nothing waits except the rule of item 1, which is set before it.

<details>
<summary>W Twoim języku</summary>

**Stan: zablokowane** — czeka na Twoją czynność poza repozytorium: gdy nowe sprawdzenie zazielenieje na tej prośbie, ustawiasz regułę, która czyni je wymaganym przed scaleniem.

## Co zobaczysz

Każda prośba o scalenie do głównej gałęzi ma teraz uruchamiane na GitHubie jedno polecenie testów repozytorium, na maszynie z Linuksem, z folderem procesu dokładnie w wersji, którą repozytorium przypina. Wynik widać na prośbie, więc czerwony wynik zobaczysz przed scaleniem, a nie tylko na komputerze, na którym zrobiono zmianę. To samo polecenie dalej biegnie też na komputerze osoby pracującej nad repozytorium.

Jedno polecenie ma piąty, ostatni etap: sprawdza pliki instrukcji repozytorium (instrukcje agentów, skille i reguły). Błąd, który zgłosi, zatrzymuje testy; ostrzeżenie nie. Testy wymagające Dockera pomija się od razu tylko tam, gdzie żaden demon Dockera nie odpowiada i nie ma Docker Desktop do uruchomienia; gdzie demon odpowiada, testy biegną. Cykl oczekuje, że na maszynie GitHuba z Linuksem biegną, zamiast być pominięte; pokaże to przebieg tej prośby.

Skanem sekretów repozytorium zostaje wbudowany skan GitHuba z blokadą pushów zawierających sekret; nowe sprawdzenie nie dokłada drugiego skanera. Przypięta w repozytorium wersja procesu została najpierw przesunięta na nowszą, która opisuje, jak repozytorium uruchamia testy na każdej prośbie.

### Pod spodem

Jeden nowy plik workflow dla GitHub Actions uruchamia jedno polecenie na każdej prośbie, z dostępem tylko do odczytu i bez sekretu, a jego własny test pilnuje tych cech; bramka, wpisy fundamentu i przypięcie procesu zmieniły się odpowiednio.

## Do rozstrzygnięcia

### Potrzebne od Ciebie

1. Sprawdzenie dodane w tej prośbie nie jest jeszcze wymogiem scalenia i tylko Ty możesz nim je uczynić. Po pierwszym zielonym przebiegu sprawdzenia na tej prośbie (link stoi w sekcji *Checks*) załóż w ustawieniach repozytorium osobną regułę dla głównej gałęzi, która wymaga przejścia tego sprawdzenia, z wyjątkiem pozwalającym obejść ją roli administratora repozytorium — tak jak zrobiłeś w repozytorium procesu. Istniejącą regułę głównej gałęzi zostaw bez zmian. Sprawdzenie nazywa się `tests`. Bez reguły sprawdzenie dalej będzie widać na każdej prośbie, ale czerwoną prośbę można scalić przez przeoczenie; z wyjątkiem możesz scalać nawet wtedy, gdy sam GitHub Actions nie działa, czego reguła bez wyjątku by nie dopuściła. (Checks, 1)

### Napraw albo przepuść

2. Cztery drobne uwagi przeglądów zostały niepoprawione i wszystkie dotyczą brzmienia, na które trafi osoba czytająca lub zmieniająca później decyzję o CI. Po pierwsze, komentarz w workflow i wiersz README mówią, że demon Dockera odpowiada na maszynie GitHuba z Linuksem, a decyzja mówi tylko to, co pokazuje lista maszyn GitHuba: Docker jest tam zainstalowany; czy demon odpowiada, pokaże przebieg tej prośby. Po drugie, powód wyboru Linuksa w decyzji (Docker jest tam zainstalowany) dotyczy też maszyny z Windowsem, więc nie odróżnia jednej od drugiej; odróżniałoby to, że kontenery gry są kontenerami Linuksa, ale cykl nie znalazł na to źródła. Po trzecie, decyzja o skanowaniu sekretów nazywa skan „Secret Protection”, a dokumentacja GitHuba mówi, że publiczne repozytorium takie jak to dostaje za darmo zwykły skan sekretów, a Secret Protection nazywa dla prywatnych repozytoriów organizacji. Po czwarte, powód wyboru Linuksa stoi teraz w dwóch miejscach, w komentarzu i w decyzji. Żadna z uwag nie zmienia faktów i kosztuje tylko czytelnika mylne wrażenie. Poprawienie ich w tej prośbie kosztuje jeszcze jedną rundę poprawki z przeglądem i nie zmienia działania sprawdzenia; zrobienie z nich zadania zostawia brzmienie bez zmian, dopóki ktoś go nie otworzy; przepuszczenie je akceptuje. Rekomenduję przepuścić, z wyjątkiem drugiej uwagi, jeśli przebieg tej prośby pokaże, że testy z Dockerem biegły, bo wtedy pierwsza uwaga okaże się prawdziwa. Poprawić w tej prośbie, zrobić z tego zadanie, czy przepuścić? (Minor findings, 1 do 4)
3. Przegląd całej zmiany przeczytał w całości 24 ze 100 wybranych decyzji, a pozostałe 76 tylko po wierszu indeksu; wśród nieotwartych w całości były decyzje o niezmienności kolejności etapów bramki, o uruchamianiu Docker Desktop i o pozostałych workflow. Zmiana dodaje jeden etap na końcu i nie dotyka tego, co te decyzje wiążą, a pełne testy na końcowym drzewie przeszły na zielono, więc ewentualna sprzeczność by się pewnie ujawniła. Gdyby coś przeoczono, osoba pracująca nad bramką trafi na to później jako niespodziankę w dzienniku decyzji. Przeczytanie ich przez świeżego recenzenta w tej prośbie kosztuje jeszcze jeden przegląd i rundę poprawki, jeśli coś znajdzie; zrobienie zadania zostawia lukę; przepuszczenie ją akceptuje. Rekomenduję przepuścić. Przeczytać w tej prośbie, zrobić z tego zadanie, czy przepuścić? (Checks, 6)
4. W fundamencie stoi stara luka, której ta prośba nie dotknęła: reguła, że żadna część repozytorium nie importuje z innej, chyba że części na to pozwalają, mówi, że opiera się na fakcie, którego jeszcze nie nazwano, a fundament oznacza to jako do uzupełnienia przez Ciebie. Kto zmieni tę regułę, trafi na źródło, którego nikt nie zapisał. Zapisanie źródła teraz kosztuje własną krótką sesję i nie wymaga rundy przeglądu w tej prośbie; zrobienie zadania zostawia lukę; przepuszczenie akceptuje ją na głównej gałęzi. Rekomenduję zrobić z tego zadanie, bo nie ma związku z tą prośbą. Zapisać w tej prośbie, zrobić z tego zadanie, czy przepuścić? (Foundation entries, 10)

### Akceptujesz przez scalenie

Scalenie akceptuje te pozycje; jeśli któraś Ci nie odpowiada, powiedz która.

5. Cykl wybrał tam, gdzie zadanie nie rozstrzygało: przesunąć przypięcie procesu na commit, na którym refinacja uruchomiła kontrolę fundamentu i sprawdzenie plików instrukcji (piętnaście commitów starszy od najnowszego, którego nikt nie sprawdził na tym repozytorium), a nie na najnowszy; nazwać sprawdzenie `tests`, jak w repozytorium procesu, bo regułę, którą ustawisz, nazywa się po nazwie; dać zadaniu limit czasu 60 minut, bo lokalna bramka trwa 15–30 minut; wziąć Node.js z własnej deklaracji repozytorium o potrzebnej wersji; i przypiąć trzy używane akcje GitHuba do commitów ich wydań 7.x, żeby przesunięty tag niczego nie zmienił, tak jak w repozytorium procesu. Inna odpowiedź zmieniłaby tylko plik workflow, po jednym wierszu, zanim ustawisz regułę.
6. Cykl zapisał wpisy fundamentu, których nie widziałeś przy zadaniu: decyzję o tym, jak CI sprawdza prośbę (jedno zadanie o nazwie `tests`, na Linuksie, uruchamiające jedno polecenie i żadne inne sprawdzenie obok, z tokenem tylko do odczytu i bez sekretu, z pełną historią, z akcjami na stałych commitach i z nazwą zadania ustaloną, bo reguła ją nazywa), cztery fakty o dokumentacji i ustawieniach GitHuba, na których opierają się decyzje o skanowaniu i o CI, miejsce workflow w mapie części (część kierująca pracą, i wpisane jako granica zaufania, której każda zmiana jest sprawdzana przeglądem) oraz wiersz w wytycznych testowania dla tej granicy. Workflow jest granicą, bo uruchamia na maszynie GitHuba kod prośby z zewnątrz. Decyzja o skanowaniu dostała też relację do decyzji o CI, a jej zdanie o GitHubie zawężono do tego, co mówi dokumentacja GitHuba.
7. Jeden test pilnujący niezmiennika „sprawdzenie typów serwera kont” zawiera listę plików uznawanych za drogę wdrożenia; teraz dopisuje do niej nowy workflow jako plik niczego niewdrażający, a nowy test workflow osobno dowodzi, że niczego nie wysyła, więc niezmiennik nie został osłabiony. Nowy test workflow trzyma jedenaście zdań nowej decyzji i decyzji o skanowaniu, a testy bramki i bramki Dockera uzupełniono o piąty etap i o przypadek demona, który odpowiada na komputerze bez Docker Desktop; każdy z nich trzyma swoje zdanie wierszem wskazującym decyzję. Nie zapisano żadnego niezmiennika i żadnego nie oznaczono jako naruszonego.

## Koszt

Około 2 godzin 37 minut czasu pracy w etapach cyklu (z czego ok. 34 minuty bez oczekiwania na narzędzia), plus dwa pełne przebiegi testów po 15 i 20 minut, które orkiestrator uruchomił na sygnał doradcy dnia. Razem 65,8 mln tokenów: 46,6 mln na Sonnet 5.5 i 19,1 mln na Opus 5.5. Jeden autor, jedna runda poprawki z przeglądem, trzy przeglądy przez agentów, którzy zmiany nie robili, jeden krok powrotny. Tabela etapów stoi w zacommitowanym rekordzie, linkowanym w sekcji *Course of the cycle*. Dwa katalogi wcześniejszych zadań dalej stoją, bo skrypt usuwający zakończone nie mógł rozpoznać, że są już zbędne; nic w tej prośbie na nie nie czeka i możesz je usunąć ręcznie; ich nazwy stoją w sekcji *Checks*.

## Jak scalić

Scal commitem scalającym, na co reguła repozytorium pozwala, żeby commity i link do rekordu przetrwały; squash albo rebase zgubiłyby link do rekordu. Po scaleniu nic nie czeka poza regułą z pozycji 1, którą ustawiasz przed nim.

</details>

## Technical changes

The change is one branch of ten commits on top of the process pin move (`e5ad01fb`). It matters mostly to whoever opens the workflow or the gate later.

- **Pin move** (`e5ad01fb`): the gitlink of `.the-way` from `ec7929d` to `bfb2e109735b5fff98802b8be0ff3c43c799262a` (the commit that holds the description of running the one command in CI), the block of `AGENTS.md` and two entry points of the part-map skill, all rewritten by the installer.
- **Fifth stage and foundation entries** (`5d6c57e5`, `5d70d505`): `scripts/test.py` runs `python -B .the-way/instruction-files/check_instructions.py` after the foundation check, in the full run only; `README.md` and `guidelines/testing.md` name it; the tests of the gate (`tests/quality/test_test_gate.py`, `gate_fixture.py`, `test_node_test_selection.py`) hold its order and its stop on an error; `tests/quality/test_docker_gate.py` holds that a daemon that answers on a computer with no Docker Desktop is used. `scripts/docker_gate.py` needed no change. D-405, D-77 and D-390 were edited and D-412 added.
- **Workflow** (`51596257`): `.github/workflows/tests.yml`, job `tests` on `ubuntu-24.04`, event `pull_request` into `main`, `permissions: contents: read`, checkout with `fetch-depth: 0`, `submodules: true`, `persist-credentials: false`, then `git symbolic-ref refs/remotes/origin/HEAD refs/remotes/origin/main`, Python from `.the-way/.python-version`, Node from `package.json`, `npm ci`, the quality environment from `requirements-quality.txt` with hashes, and `npm test`. Its test is `tests/quality/test_ci_workflow.py`; `tests/invariants/test_account_server_typecheck.py` lists the file as no deployment route.
- **Fix of the Minor findings of the review of the whole change** (`419b7d1e`, `42bf3768`, `02e112f5`, `fd89c408`, `9912f0db`): a test that fails when a step or the job carries `continue-on-error`; the workflow moved in the part map from the part that builds to the part that directs the work; new decision D-413 cited by the test; the workflow listed as a trust boundary with review as its check; D-412's reason narrowed to secrets of kinds GitHub recognizes. None of these was reverted.
- **Return step** (`1c0e49eb`): four environment facts from GitHub's documentation and runner image list and one read of the repository's own settings, named in D-412 and D-413; sentences of D-412, D-413 and D-390 that the sources do not hold were corrected.

## Checks

1. **CI on this request:** *to be filled when the run on the last head ends.*
2. **Gate on the commit that moved the pin** (`e5ad01fb`): `python -B .the-way/task-cycle/gate_times.py --output .runs/task-cycles/ci-przy-pr/gate_times.md -- npm.cmd test`, exit 0, 591 tests in 4 directories, 902 s, Windows; the move broke no check.
3. **Final gate** on the tree `1c0e49eb`: the same command, exit 0, 607 tests in 4 directories (`tests/agent_workflow`, `tests/quality`, `tests/deploy`, `tests/invariants` and the Node tests), 1211 s, Windows. The fifth stage ran and reported `0 error, 140 warn, 7 info`. The script counted one other gate run at the same time in its registry, which the cycle did not identify; the day's advisor reported none. No check failed or did not run in that run.
4. **Failing on the base:** the list the cycle took from the final gate of the earlier cycle of the merged branch (`docs/task-cycles/panel-wlasciciela/cycle.md`, commit `9858bec3`): two tests of `tests/quality` (`test_ruff_source_rules`, `test_shellcheck_source_rules`) that failed there for lack of the quality environment in that worktree; here the environment was installed and they passed. The base `bdf0dbd7` is a merge commit whose tree equals that of its second parent, so no gate was run on the base.
5. **Own-work checks:** the author named the green run on Linux with the Docker tests running as the requirement most likely unmet; it checked the Linux install step in a `python:3.14-slim` container (pip exit 0, Ruff 0.17.1, ShellCheck 0.11.0), a stand-in daemon case with a mutation shown failing, and nine mutations of the workflow, all caught by `tests/quality/test_ci_workflow.py` (a tenth, `continue-on-error`, caught after the fix). Nothing on this computer shows that every other test passes on Linux; the CI run is that check.
6. **Incomplete reading, kind 14:** the review of the whole change read 24 of its 100 selected decisions whole and the rest by index line; unread whole: D-356, D-09, D-406, D-391, D-392, D-28 to D-33 (`reports/review-whole-report.md`, Unread material).
7. **Foundation check on its own** without `--skip-test-citations`: `python -B .the-way/elements/common/foundation_check.py`, exit 0, `0 errors`, no `listed:` line. `python -B .the-way/instruction-files/check_instructions.py`: exit 0, `0 error, 140 warn, 7 info` (the refinement reported 130 warnings on an earlier commit).
8. **Reviews:** whole change `PASS 5159625748f3`; fix `PASS 9912f0db9557`; return step `PASS 1c0e49ebef3c`; each with the checks it ran and exit codes in its report.
9. **Review reminder:** `python -B .the-way/task-cycle/review_reminder.py origin/main`, exit 0, 19 merges since the tag `foundation-review/2026-11-13`, threshold 60, `reminder: no`.
10. **Checks of the description and of the record:** __REQUEST_CHECKS__
11. **Working copies left:** none. **Directories of earlier tasks kept** (name | branch | reason): `przewodnik-testow` | `task/przewodnik-testow` | holds `fail-node` and `fail-python`, which stay: uncommitted changes (a tracked file changed or a new file that git does not ignore); `coding-guidelines` | `task/coding-guidelines` | uncommitted changes (a tracked file changed or a new file that git does not ignore).

## Foundation entries

1. D-412 (row 1): the scan for secrets is GitHub's built-in scan with push protection, and CI adds no scanner. Its *Based on* and *Rationale* were written by the return step from three facts (the cycle's), and its *Scope* and *Relations* by the fix (the cycle's).
2. D-405 (row 2): the check of the instruction files is the fifth and last stage after the foundation check; it stops the gate on an error, not on a warning.
3. D-77 (row 2, *Decisions in play*): the run of one file runs no check of the instruction files either.
4. D-390 (row 4): a computer with no Docker Desktop skips a test that needs Docker at once only where no daemon answers; where one answers, the test runs. Its *Rationale* sentence was made a condition (the cycle's).
5. D-413 (the cycle's, no row): one job named `tests` on Linux runs the one command on every pull request into the main branch, with a read-only token, no secret, the full history, the process folder at the pinned commit, the actions at fixed commits and the job's name fixed; its *Based on* is the fact below.
6. Environment facts (the cycle's): `github-secret-scanning-history`, `github-push-protection-blocks-push`, `loop2-secret-scanning-enabled` (a read of the repository's settings), `github-ubuntu-runner-docker`.
7. Part map (the cycle's): the workflow in `agent-workflow` (sentence, files, trust boundary); `build-tools` is as before. Row 3 (the reason for Linux) is a comment of `.github/workflows/tests.yml`, and its reason also stands in D-413.
8. Testing guidelines (the cycle's): a row for the workflow among the trust boundaries (review is its check), and the lines for the fifth stage.
9. Tests that hold a sentence of a decision by a line `decision:`, added or changed: `tests/quality/test_ci_workflow.py` (new, 11 tests; D-412, D-413), `tests/quality/test_test_gate.py` and `tests/quality/test_node_test_selection.py` (D-405, D-77), `tests/quality/test_docker_gate.py` (D-390). Invariant test altered: `tests/invariants/test_account_server_typecheck.py` (`account-server-typecheck`), as item 7 says. No invariant written, no *Violated* mark set or cleared.
10. Gap that stands and was not touched, from the invariants file: the invariant `cross-part-imports` rests on a fact marked `TODO` since 2026-11-08 (kind 16, item 4).

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
- **Choices:** 3 recorded in the questions table (the pin target, the branch name, no gate on the base) and 1 autonomous choice about the unread decisions; link: `docs/task-cycles/ci-przy-pr/cycle.md`, section *Questions and autonomous choices*. The author's nine other choices stand in `reports/author-report.md`.
- **Blocking findings left:** none.
- **Record:** __RECORD_LINK__
