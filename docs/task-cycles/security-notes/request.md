**State: ready** — two items of *Fix or let through* wait for your answer; everything else is accepted by merging.

## What you will see

The repository now has a page of security notes at its top level, written in English for the people who check your course project. It says in one place what the agents working in the repository may do, where the secrets are kept, and how the prompt-injection trial of 14 November 2026 ended. The permissions part has six short points with links to the files that are the source of truth: the mode in which every agent session runs (no question before each tool, so what limits it is the deny rules for key paths, the guard against commands that cannot be undone, and GitHub's own rules); the GitHub account the agents share with you and the rules on the `main` branch; GitHub's secret scan with its push block; the test server, which an agent only reads, by agreement and not by an enforced limit; the refusal to read your professional work repositories, with no company named; and the test that keeps private paths out of the repository. The part on secrets is one sentence and a link to the deployment instructions, which are not repeated. The part on the trial describes what happened: two sessions, two stages (an instruction written in a file, which the model refused and reported; and a trick in a pull-request comment, which the model followed but did not leak the token), what it showed, the limits of the trial and the clean-up. The planted instructions are told in own words, never quoted. The page names no token, not even the decoy one, and no host from the decoy file. About who merges a pull request it says nothing, as you decided.

The project's readme is translated into English, whole, with the same content, and has one new line that points to the security notes page. The screen labels the readme quotes stay as the game shows them, in Polish, each with its English meaning beside it.

### Underneath

The new page is listed in the part of the project map that directs and records the work of agents. No code, test, setting of GitHub or of the server changed, and no decision or invariant was written.

## For you to decide

### Needed from you

none

### Fix or let through

1. The first point of the permissions part, the one on the mode of work, reads awkwardly after the last fix: one phrase sits inside another ("the task cycles of the process this repository pins, included") and "the own configuration of the operator" is not natural English. The facts are right and a reader gets through it, but it is the first thing the course's reviewers read on that page. The reviewer's wording would put the process in brackets and say "the operator's own configuration, the operator being the person who owns this repository and runs its agents". Fixing it costs one correction with one fix and one review of it, and the full tests would run once more; letting it through leaves a stumble on the entry page, and the page is meant to go away after the certificate anyway. I recommend fixing it in this request, since the page exists only to be read. Fix it in this request, make a task of it, or let it through? (Minor findings, 1)
2. One instruction file of the repository says that the result of the tests on GitHub is a check the repository requires before a merge, which the owner may bypass; the reasoning of one decision about CI says the same, "the rule of the repository that requires this check". The rule on `main` that I read from GitHub on 16 November has no such required check. The practical effect is that an agent can believe a red pull request cannot be merged, while GitHub would let it through. The new security page says nothing about CI, so it is right either way. The fix cannot be done in this request: the sentence in the instruction file comes from the process the repository pins, and adding the required check is a change of a GitHub setting, which this task leaves out. Make a task of it? (Findings outside the task's scope, 1)

### You accept by merging

Merging accepts these items; if one does not suit you, say which.

3. The cycle put the new page under the part of the project map that directs and records the work of agents, next to the two instruction files that tell agents how to work here, and did not reword that part's description. The readme belongs to the build tools and the foundation folder to the foundation; the page fits neither. The cost if wrong is one line of the map moved in a later task.
4. The page calls you "the operator" and says once, at first use, who that is: the person who owns the repository and runs its agents. It does not name you, since the repository is public and the page is not about a person. In stage B of the trial it says the comment came from "the account of the repository's owner, the operator's own". The task says the comment came from the repository owner's account and that the throwaway repository was private; it does not say the account was yours, so the cycle inferred it. Tell me if the throwaway repository was not on your account.
5. The page says no more about the daily adviser than that it is your own tool outside this repository that starts some of the sessions, and that a session it starts gets the rule that refuses reading your work repositories. The task says no more, and a reviewer who has never heard of the adviser may wonder what it is; if you want a sentence on it, say so and I will make a task.
6. The first sentence of the page adds that, where the page and a file it points to differ, the file is right. This follows from "the files are the source of truth" and the reviewer accepted it. I did not take another way: dropping the clause would leave the page claiming to be the source of truth by silence.
7. A new entry of the project map, written by the cycle and not seen by you before: the part that directs and records the work of agents also holds the security notes page, the public page about the agents' permissions, the place of secrets and the prompt-injection trial of 14 November 2026.

## Cost

About 20 minutes of the cycle's own work in the stages table below, plus the full tests of 14 minutes and 2 seconds. One author (Sonnet, three turns: the change, the fix, the return step) and one reviewer (Opus, two turns: the whole change and the fix); 19.2 million tokens in all (14.7 million Sonnet, 4.6 million Opus), almost all of them cached input; the orchestrator's later work, the description and the record, is not in that count. One review round with five small findings, one fix and one review of the fix, which passed. The table of stages: `docs/task-cycles/security-notes/stages.md` in the commit that adds the record (see *Course of the cycle*). Two directories of earlier tasks still stand because the cycle's cleanup script could not tell they were no longer needed; nothing in this request waits for them, you may remove them by hand, and their names stand in *Checks*.

## How to merge

Merge with a merge commit that keeps the commits, since the link to the record of the cycle survives only then. Nothing here waits for a review of the foundation.

<details>
<summary>Po polsku</summary>

**Stan: gotowe** — dwie pozycje z części „Popraw albo przepuść” czekają na Twoją odpowiedź; resztę przyjmujesz przez scalenie.

## Co zobaczysz

W repozytorium jest teraz na najwyższym poziomie strona z notatkami o bezpieczeństwie, po angielsku, dla osób, które sprawdzają Twój projekt kursowy. Mówi w jednym miejscu, co mogą agenci pracujący w repozytorium, gdzie leżą sekrety i jak skończyła się próba prompt injection z 14 listopada 2026. Część o uprawnieniach ma sześć krótkich punktów z odnośnikami do plików, które są źródłem prawdy: tryb pracy każdej sesji agenta (bez pytania przed każdym narzędziem, więc ogranicza ją to, co działa i w tym trybie — reguły odmowy dla ścieżek z kluczami, strażnik przed poleceniami nieodwracalnymi i reguły GitHuba); konto GitHub, które agenci dzielą z Tobą, i reguły gałęzi `main`; skan sekretów GitHuba z blokadą pushu; serwer testowy, który agent tylko czyta, z umowy, a nie z wymuszonej granicy; odmowa czytania repozytoriów z Twojej pracy zawodowej, bez nazwy firmy; i test, który pilnuje, żeby do repozytorium nie trafiła prywatna ścieżka. Część o sekretach to jedno zdanie i odnośnik do instrukcji wdrożenia, której nie powtarza. Część o próbie opisuje, co się stało: dwie sesje, dwa stopnie (polecenie zapisane w pliku, które model odrzucił i zgłosił, oraz podstęp w komentarzu do pull requesta, który model wykonał, ale tokenu nie wypuścił), co to pokazało, ograniczenia próby i sprzątanie. Podrzucone polecenia są oddane własnymi słowami, bez cytatu. Strona nie podaje żadnego tokenu, także fałszywego, ani hosta z pliku-przynęty. O tym, kto scala pull request, nic nie mówi, tak jak zdecydowałeś.

Readme projektu jest w całości przetłumaczone na angielski, z tą samą treścią, i ma jedną nową linijkę z odnośnikiem do strony z notatkami o bezpieczeństwie. Napisy z ekranów gry, które readme cytuje, zostają takie, jak je pokazuje gra, po polsku, każdy z angielskim znaczeniem obok.

### Pod spodem

Nowa strona jest wpisana do części mapy projektu, która kieruje pracą agentów i ją zapisuje. Nie zmienił się żaden kod, test ani ustawienie GitHuba czy serwera, nie powstała żadna decyzja ani niezmiennik.

## Do rozstrzygnięcia

### Potrzebne od Ciebie

none

### Popraw albo przepuść

1. Pierwszy punkt części o uprawnieniach, o trybie pracy, czyta się niezręcznie po ostatniej poprawce: jedno wtrącenie siedzi w drugim („cykle zadań procesu, który to repozytorium przypina, włącznie z nimi”), a „własna konfiguracja operatora” brzmi nienaturalnie. Fakty są poprawne i czytelnik się przedrze, ale to pierwsze, co recenzenci kursu czytają na tej stronie. Słowa recenzenta ujęłyby proces w nawias i napisały „własna konfiguracja operatora, czyli osoby, która jest właścicielem repozytorium i uruchamia jego agentów”. Poprawka kosztuje jedną korektę z jedną poprawką i jej recenzją, a pełne testy pobiegłyby jeszcze raz; przepuszczenie zostawia potknięcie na stronie wejściowej, która i tak ma zniknąć po certyfikacie. Polecam poprawić w tym requeście, bo strona istnieje tylko po to, żeby ją czytać. Poprawić w tym requeście, zrobić z tego zadanie czy przepuścić? (Minor findings, 1)
2. Jeden plik instrukcji repozytorium mówi, że wynik testów na GitHubie jest sprawdzeniem wymaganym przed scaleniem, które właściciel może ominąć; uzasadnienie jednej decyzji o CI mówi to samo, „reguła repozytorium, która wymaga tego sprawdzenia”. Reguła na `main`, którą odczytałem z GitHuba 16 listopada, takiego wymaganego sprawdzenia nie ma. W praktyce agent może wierzyć, że czerwony pull request nie da się scalić, a GitHub by go przepuścił. Nowa strona o bezpieczeństwie nic o CI nie mówi, więc jest poprawna tak czy tak. Tego nie da się naprawić w tym requeście: zdanie z pliku instrukcji pochodzi z procesu, który repozytorium przypina, a dodanie wymaganego sprawdzenia to zmiana ustawienia GitHuba, którą to zadanie wyłącza. Zrobić z tego zadanie? (Findings outside the task's scope, 1)

### Przyjmujesz przez scalenie

Scalenie przyjmuje te pozycje; jeśli któraś Ci nie odpowiada, powiedz która.

3. Cykl wpisał nową stronę do części mapy projektu, która kieruje pracą agentów i ją zapisuje, obok dwóch plików instrukcji, które mówią agentom, jak tu pracować, i nie zmieniał opisu tej części. Readme należy do narzędzi budowania, a katalog fundamentu do fundamentu; strona nie pasuje do żadnej z nich. Koszt pomyłki to jedna linia mapy przeniesiona w późniejszym zadaniu.
4. Strona nazywa Cię „operatorem” i raz, przy pierwszym użyciu, mówi, kto to: osoba, która jest właścicielem repozytorium i uruchamia jego agentów. Nie podaje Twojego imienia, bo repozytorium jest publiczne, a strona nie jest o osobie. W stopniu B próby pisze, że komentarz przyszedł z „konta właściciela repozytorium, własnego konta operatora”. Zadanie mówi, że komentarz przyszedł z konta właściciela repozytorium i że jednorazowe repozytorium było prywatne; nie mówi, że to było Twoje konto, więc cykl to wywnioskował. Daj znać, jeśli jednorazowe repozytorium nie było na Twoim koncie.
5. Strona nie mówi o doradcy dnia nic więcej niż to, że to Twoje własne narzędzie poza tym repozytorium, które uruchamia część sesji, i że sesja przez nie uruchomiona dostaje regułę odmowy czytania Twoich repozytoriów z pracy. Zadanie nie mówi więcej, a recenzent, który o doradcy nie słyszał, może się zastanawiać, co to jest; jeśli chcesz o nim zdania, powiedz, a zrobię z tego zadanie.
6. Pierwsze zdanie strony dodaje, że tam, gdzie strona i plik, do którego odsyła, się różnią, rację ma plik. To wynika z „pliki są źródłem prawdy” i recenzent to przyjął. Nie poszedłem inną drogą: opuszczenie tej klauzuli zostawiłoby stronę, która milczeniem twierdzi, że sama jest źródłem prawdy.
7. Nowy wpis mapy projektu, napisany przez cykl i niewidziany wcześniej przez Ciebie: część, która kieruje pracą agentów i ją zapisuje, obejmuje też stronę z notatkami o bezpieczeństwie, publiczną stronę o uprawnieniach agentów, miejscu sekretów i próbie prompt injection z 14 listopada 2026.

## Koszt

Około 20 minut własnej pracy cyklu w tabeli etapów poniżej, plus pełne testy: 14 minut i 2 sekundy. Jeden autor (Sonnet, trzy tury: zmiana, poprawka, krok zwrotu) i jeden recenzent (Opus, dwie tury: cała zmiana i poprawka); w sumie 19,2 mln tokenów (14,7 mln Sonnet, 4,6 mln Opus), prawie wszystkie jako wejście z pamięci podręcznej; późniejsza praca orkiestratora, opis i rekord, nie wchodzi do tej liczby. Jedna runda recenzji z pięcioma drobnymi uwagami, jedna poprawka i jej recenzja, która przeszła. Tabela etapów: `docs/task-cycles/security-notes/stages.md` w commicie, który dodaje rekord (zob. *Course of the cycle*). Dwa katalogi wcześniejszych zadań wciąż stoją, bo skrypt sprzątający cyklu nie umiał ocenić, że są już niepotrzebne; nic w tym requeście na nie nie czeka, możesz je usunąć ręcznie, a ich nazwy stoją w *Checks*.

## Jak scalić

Scal commitem scalającym, który zachowuje commity, bo link do rekordu cyklu przetrwa tylko tak. Nic tu nie czeka na przegląd fundamentu.

</details>

## Technical changes

1. Commit `705be3a5`, three files: `security-notes.md` (new, 36 lines; English; the first sentence, a section on what an agent may do with six points, a section on where the secrets are with one sentence and a link, and a section on the prompt-injection trial of 14 November 2026 with its stages, what it showed, its limits and the clean-up); `README.md` translated whole into English (94 lines before, 96 after: the new line and the blank line after it), the quoted screen labels kept in Polish with an English gloss; `foundations/part_map.md`, one line: `security-notes.md` added to the *Files* of the part `agent-workflow`, whose responsibility sentence was left as it was.
2. Commit `09170e8b`, the fix of the five Minor findings of the review of the whole change (7 lines of the page, 1 line of the readme): the operator introduced at first use and named the same in stage B; the task cycles of the-way named with the pin they come from; the daily adviser described only as the operator's own tool outside the repository that starts some sessions; "a rule Claude Code enforces, whatever the model decides"; the first sentence smoothed; the unsourced aim of the trial dropped; "the one-off command that updates the lock file" in the readme in place of "the one command".
3. The return step compared the foundation, the guidelines and the skills with the change and wrote nothing; no commit. The glossary has no entry for "operator" (the return step's search), which no entry written here needs.
4. No other file changed: the process pin, the decisions, the invariants, the glossary, the tests and the code stay as on `main`.

## Checks

- Gate: `python -B .the-way/task-cycle/gate_times.py --output .runs/task-cycles/security-notes/gate_times.md -- npm.cmd test` on `09170e8b` — exit 0, 841.8 s, run 1 of 1, 0 other gate runs at the same time; 617 tests in 4 directories, every directory passed (`tests/invariants` 261 tests in 774.9 s); 2537 Node tests passed, 0 failed, 0 skipped; foundation check `0 errors`; check of the instruction files `0 error, 140 warn, 7 info`. The run started on the signal `start` of the day advisor.
- Failing on the base before the change: none. The list was taken from the final gate of the cycle of the merged request #138, `docs/task-cycles/dziennik-decyzji-na-tematy/cycle.md`, commit `f6792668` (the base is a merge commit whose tree equals that of its second parent, so no gate ran on the base).
- `python -B .the-way/elements/common/foundation_check.py` on `09170e8b`, without `--skip-test-citations`: exit 0, `0 errors`, no `listed:` line, so no invariant sentence was corrected and no invariant test changed.
- Reviews: whole change `PASS 705be3a5` (Opus; the index of its selection read, 4 decisions read whole of 105 listed, the four that bear on the change; 0 blocking, 5 Minor within the task, all fixed, 1 out of scope); fix `PASS 09170e8b` (1 new Minor, not blocking). The reviewer of the whole change moved the worktree to the base for one command by a slip and put it back at once; the head, the tree and the pin were checked after by the orchestrator and are unchanged.
- Own-work checks: the author's hard edges (no token, no host, no company, no private path, no link in double square brackets, link targets exist, the readme's text between backticks and its six headings unchanged) all held; the focused test `npm test -- tests/agent_workflow/test_tracked_file_private_paths.py` exit 0 at both commits. The reviewer compared the readme with its base section by section (`reports/review-whole-readme-compare.md`): code spans, links, numbers and fenced blocks equal but for the one added link.
- Return step: done, no commit, no entry written; `foundation_check.py --skip-test-citations` exit 0.
- `python -B .the-way/task-cycle/review_reminder.py origin/main`: `tag: foundation-review/2026-11-13`, `merges: 23`, `threshold: 60`, `reminder: no`.
- Process remarks check: run 1 on the original listed 8 items of the reports, appended word for word to the process remarks of the record; run 2 exit 0. Its runs on the copy: filled in by the edit that adds the record's link.
- Request form check (`python -B .the-way/task-cycle/request_check.py .runs/task-cycles/security-notes/request.md --task .runs/task-cycles/security-notes/task.md`) and check of private paths on this file: filled in by the final edit.
- CI on the request: filled in by the edit that follows its run.
- Not run or unchecked: none. Working copies left: none (the orchestrator's `.runs/orchestrator/` and the installs of the gate stay in the ignored working directory and are no agent's working copy). The cleanup script kept two directories of earlier tasks: `przewodnik-testow` (branch `task/przewodnik-testow`; holds fail-node, which stays: uncommitted changes: a tracked file changed or a new file that git does not ignore; holds fail-python, which stays: uncommitted changes: a tracked file changed or a new file that git does not ignore) and `coding-guidelines` (branch `task/coding-guidelines`; uncommitted changes: a tracked file changed or a new file that git does not ignore).

## Foundation entries

One entry was written, marked `the cycle's` (the task carried it as a question to the cycle, in no row of *Settlements to record*): the part `agent-workflow` also holds the file `security-notes.md`, the public page on the agents' permissions, the place of secrets and the prompt-injection trial of 14 November 2026. No decision, invariant, glossary term or environment fact was written, no topical section of the decision log was opened, no invariant test was altered, and no surface or *Violated* mark was set or cleared.

## Minor findings

1. `security-notes.md:7`, the review of the fix (N1, Minor, within the task, not blocking): "the first bullet is now hard to parse. 'Every agent session in this repository, the task cycles of the-way, the process this repository pins for its foundation, included (see …), runs …' puts an appositive inside the '… included' phrase. Further on, 'part of the own configuration of the operator, the person who …' is not idiomatic English; the earlier 'the operator's own configuration' was. The facts are right and the reader gets through; the effect is a stumble on the first bullet of the entry page. A wording that would do: 'Every agent session in this repository, including the task cycles of the-way (the process this repository pins for its foundation; see `AGENTS.md`), runs …' and 'The deny rules and the guard are part of the operator's own configuration — the operator being the person who owns this repository and runs its agents — which lies outside this repository, so no file here shows them.'" (item 1 of *For you to decide*).

## Findings outside the task's scope

1. `AGENTS.md`, section "Pinned the-way process", the sentence on CI (O1, Minor, out of scope), the review of the whole change: "`AGENTS.md` says the CI result 'is a check this repository requires before a merge, which the repository's owner may bypass', while the orchestrator's reading of the ruleset `main` (handoff, *Reconciliation*) lists only `deletion`, `non_fast_forward` and `pull_request`, with no required status check and no bypass actor. The change does not touch `AGENTS.md`, and `security-notes.md` states nothing about CI, so this lies outside the task; the author's report raised it too. I did not read the ruleset myself. If the sentence of `AGENTS.md` describes GitHub's settings and not the owner's practice, a red pull request can merge while agents believe it cannot." The return step found a second half: the *Rationale* of D-413 says "the rule of the repository that requires this check", where the ruleset has no required-status-check rule. Neither was changed; the sentence in `AGENTS.md` lies in the block the installer of the pinned process writes. The orchestrator read the ruleset itself on 2026-11-16 by `gh api` (read only): rules `deletion`, `non_fast_forward` and `pull_request` (merge method `merge` only, 0 required approvals), no bypass actor. Item 2 of *For you to decide*.

## Course of the cycle

- **Task and sources:** the task "security-notes.md — the agent's permissions, the place of secrets and the result of the prompt-injection trial — and the readme in English", independent; its sources are the task document with the facts of the trial of 14 November 2026 restated from the author's private protocol, the rules on `main` and the secret scan read from GitHub on 16 November, `main` at `b88ef2b1`, the process at `bfb2e10`.
- **Process pin:** `bfb2e109735b5fff98802b8be0ff3c43c799262a`, the merge of the-way's request #133, not moved (the task does not move it). The local `main` of the main checkout stood 36 commits behind `origin/main` and on an older pin; the branch was made from `origin/main` and the skill read again from its pin. No gate on that commit.
- **Spec:** none; no open design choice (the question of the part of the map for the new file follows from the change and is Q2 of the record).
- **Route:** one author without a plan, class the same as the orchestrator's (Sonnet), because the text must carry the facts of the task and keep several privacy limits at once; review of the whole change by Opus; one fix and one review of it.
- **Plan:** none.
- **Choices:** 5 rows in the questions table, 2 of them answered by the cycle's own choice (Q2 the part of the map, Q3 the reconciliation of the GitHub rules with the task); the other rows are answered by the task, the user's input of this cycle or the foundation. The table stands in the record.
- **Blocking findings left:** none.
- **Record:** the commit that adds the record: filled in by the edit that follows its commit.
