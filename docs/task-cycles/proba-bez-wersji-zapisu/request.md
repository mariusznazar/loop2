**State: ready** — one question waits for your answer (item 1 of *Fix or let through*); everything else is accepted by merging.

## What you will see

Nothing changes in the running game. The change is in the rule and in the instruction for trying a database backup on the operator's computer. Before, the rule said to repeat the trial every month, after each change of the database's schema version, and after each change of the saved game's version. Now it says every month and after each change of the database's schema version, and nothing else. The trial never read the version of the saved game, so a repeat after such a change showed the same as the trial before it; the game itself already drops a saved game state of another version and starts a new game, so a restore adds no loss of its own.

The instruction gets one new short paragraph before the numbered steps. It says what a change of the saved game's version does to the trial: it erases the marker name in the test account's saved game state, so before the next trial the operator gives a new marker, lets the game save it, writes it down, and takes the backup for the trial from a night after that. It is a hint for preparing the trial, not a condition for repeating it. The decision's reasons for leaving the condition out, and the two ways it did not take (keep the condition as it was, or teach the trial script to read the version of the saved game), are written into the decision.

### Underneath

The decision on what a checked restore of the database means is rewritten in four places, with its *Rejected* line extended; five tests that quote that decision's sentence word for word now quote the new sentence. The two copies of the instruction stay identical, byte for byte.

## For you to decide

### Needed from you

none

### Fix or let through

1. Another step of the instruction, the one for restoring over the server's database, still points to the marker name "written down at install". After the new hint is followed, that is the older marker, not the one the saved game state holds now. Whoever restores the server on a real bad day would not find it and has to fall back on the step's own second way (log in and check that the test account holds a saved game state they recognise), so they lose a few minutes and nothing else; nothing goes wrong silently. Fixing it in this request costs one more round of correction with its review (about the same as the fix of the two small findings this cycle already made); making a task of it leaves the stale pointer until someone does the task; letting it through leaves it for good. I recommend fixing it in this request, since it is the same stale pointer the new hint creates and the sentence to change is one phrase in two copies. Fix it in this request, make a task of it, or let it through? (Findings outside the task's scope, 1)

### You accept by merging

Merging accepts these items; if one does not suit you, say which.

2. The decision's line that gives an example of keeping the rule also named the saved game's version, although the task said that line needed no change; the task was written when the line did not name it, and since then the log was edited. I took the version out of that line too, since the decision would otherwise contradict itself. The other way, leaving the line, would have kept the removed condition in the decision.
3. Five tests quote the decision's sentence word for word in a comment line. I changed those five lines to the new sentence and changed nothing else in the tests; the foundation check stands behind this, and the reviewer showed that it fails when one such line is put back to the old sentence. The tests themselves are as they were.
4. Beyond the task's own words, the author added three small things, which the reviewer judged to be within the task: a sentence in the decision's reasons saying that the game drops a saved game state of another version at its first load, so a restore adds no loss of its own; the clause "take the backup for the trial from a night after that" at the end of the new paragraph, since a marker given after a backup was made is not in that backup; and in step 5 of the trial the name of the marker now reads "written down last", so the step does not send the operator back to the old marker. I did not take the task's bare wording, because it would let an operator give a new marker and then try an older backup without it.

## Cost

About 17 minutes of agent working time, and a full gate run of 13 minutes and 15 seconds on top, started on the signal of the day advisor. Tokens: about 13.5 million on the class of the cycle's own work, which the author shared (Sonnet), and about 6.7 million on the strongest class available (the reviewer of the whole change and of its fix). One review round of the whole change, one fix of two small findings, one review of that fix; the return step found nothing to correct, so it made no commit and needed no review. The table of stages stands in the record, linked under *Course of the cycle*.

Directories of earlier tasks still stand because the script could not tell they were no longer needed; nothing in this request waits for them, and you may remove them by hand. Their names, branches and reasons stand in *Checks*.

## How to merge

Merge with a merge commit, not by squash or rebase: the link to the record of this cycle survives only when the commits are kept.

<details>
<summary>W Twoim języku</summary>

**Stan: gotowe** — jedno pytanie czeka na Twoją odpowiedź (punkt 1 w „Napraw albo przepuść”); resztę przyjmujesz przez scalenie.

## Co zobaczysz

W działającej grze nic się nie zmienia. Zmiana jest w regule i w instrukcji próby odtworzenia kopii bazy na komputerze operatora. Wcześniej reguła kazała powtarzać próbę co miesiąc, po każdej zmianie wersji schematu bazy i po każdej zmianie wersji zapisu gry. Teraz mówi: co miesiąc i po każdej zmianie wersji schematu bazy, i nic poza tym. Próba nigdy nie czytała wersji zapisu, więc powtórzenie po takiej zmianie pokazywało to samo co próba przed nią; gra sama odrzuca zapis o innej wersji i zaczyna nową grę, więc odtworzenie kopii nie dokłada własnej straty.

Instrukcja dostaje jeden nowy krótki akapit przed ponumerowanymi krokami. Mówi, co zmiana wersji zapisu robi z próbą: kasuje znacznik w zapisie konta testowego, więc przed następną próbą operator nadaje nowy znacznik, daje grze go zapisać, zapisuje go u siebie i bierze do próby kopię z nocy po tym. To wskazówka przygotowania próby, nie warunek jej powtarzania. Powody, dla których decyzja zostawia warunek, i dwie drogi, których nie wybrała (zostawić warunek, jak był, albo nauczyć skrypt próby czytać wersję zapisu), są wpisane do decyzji.

### Pod spodem

Decyzja o tym, co znaczy sprawdzone odtworzenie bazy, jest przepisana w czterech miejscach, a jej linia *Rejected* — rozszerzona; pięć testów, które cytują zdanie tej decyzji słowo w słowo, cytuje teraz nowe zdanie. Dwie kopie instrukcji pozostają identyczne bajt w bajt.

## Do rozstrzygnięcia

### Potrzebne od ciebie

brak

### Napraw albo przepuść

1. Inny krok instrukcji, ten o odtwarzaniu na bazie serwera, nadal wskazuje znacznik „zapisany przy instalacji”. Po zastosowaniu nowej wskazówki to znacznik starszy, a nie ten, który trzyma teraz zapis. Kto odtwarza serwer w prawdziwy zły dzień, go nie znajdzie i musi sięgnąć po drugą drogę tego kroku (zalogować się i sprawdzić, że konto testowe ma zapis, który rozpoznaje), więc traci kilka minut i nic więcej; nic nie psuje się po cichu. Poprawka w tym requeście kosztuje jeszcze jedną rundę poprawki z recenzją (mniej więcej tyle, ile dwie drobne uwagi, które ten cykl już poprawił); zadanie zostawia stary wskaźnik, aż ktoś je zrobi; przepuszczenie zostawia go na stałe. Polecam poprawić to w tym requeście, bo to ten sam stary wskaźnik, który tworzy nowa wskazówka, a do zmiany jest jedno wyrażenie w dwóch kopiach. Poprawić w tym requeście, zrobić z tego zadanie czy przepuścić? (Findings outside the task's scope, 1)

### Akceptujesz przez scalenie

Scalenie przyjmuje te punkty; jeśli któryś Ci nie odpowiada, powiedz który.

2. Linia decyzji z przykładem zachowania reguły też wymieniała wersję zapisu, choć zadanie mówiło, że tej linii nie trzeba zmieniać; zadanie powstało, gdy linia jej jeszcze nie wymieniała, a od tego czasu dziennik poprawiono. Usunąłem wersję zapisu także z tej linii, bo inaczej decyzja przeczyłaby sama sobie. Druga droga, zostawienie linii, zostawiłaby w decyzji usunięty warunek.
3. Pięć testów cytuje zdanie decyzji słowo w słowo w linii komentarza. Zmieniłem te pięć linii na nowe zdanie i nic poza tym w testach; za tym stoi kontrola fundamentu, a recenzent pokazał, że ona zawodzi, gdy jedną z takich linii cofnąć do starego zdania. Same testy są takie jak były.
4. Poza słowami zadania autor dodał trzy drobne rzeczy, które recenzent uznał za mieszczące się w zadaniu: zdanie w uzasadnieniu decyzji, że gra odrzuca zapis o innej wersji przy pierwszym wczytaniu, więc odtworzenie nie dokłada własnej straty; fragment „weź do próby kopię z nocy po tym” na końcu nowego akapitu, bo znacznik nadany po zrobieniu kopii nie jest w tej kopii; oraz w kroku 5 próby nazwę znacznika jako „zapisany ostatnio”, żeby krok nie odsyłał operatora do starego znacznika. Nie wziąłem gołego brzmienia z zadania, bo operator mógłby nadać nowy znacznik, a potem próbować starszą kopię, która go nie ma.

## Koszt

Około 17 minut czasu pracy agentów i pełny przebieg bramki 13 minut 15 sekund ponad to, ruszony na sygnał doradcy dnia. Tokeny: około 13,5 mln na klasie własnej pracy cyklu, którą dzielił autor (Sonnet), i około 6,7 mln na najmocniejszej dostępnej klasie (recenzent całej zmiany i jej poprawki). Jedna runda recenzji całej zmiany, jedna poprawka dwóch drobnych uwag i jedna recenzja tej poprawki; krok powrotny nic nie znalazł do poprawienia, więc nie zrobił commita i nie potrzebował recenzji. Tabela etapów stoi w zapisie, odnośnik w „Course of the cycle”.

Katalogi wcześniejszych zadań nadal stoją, bo skrypt nie mógł stwierdzić, że już nie są potrzebne; nic w tym requeście na nie nie czeka i możesz je usunąć ręcznie. Ich nazwy, gałęzie i powody stoją w „Checks”.

## Jak scalić

Scal commitem scalającym, nie przez squash ani rebase: odnośnik do zapisu tego cyklu przetrwa tylko wtedy, gdy commity zostają.

</details>

## Technical changes

- Two commits by the one author and one fix commit. `9d8cfce3` rewrites the decision on a checked restore of the database in `foundations/decisions.md` — its binding sentence, the "complies" and "violates" lines of its *Verification* and its *Rationale* lose the version of the saved game; its *Rejected* gains the two ways of the task's *Not chosen* — and changes the five `# decision: D-234 "…"` quotation lines in `tests/deploy/test_restore_trial.py` (comments only, +5 −5). `ca90b465` changes the sentence on repeating the trial and adds the short paragraph before step 1 in "Trying a backup on the operator's computer", in both `.claude/skills/loop2-deploy/references/backup_and_restore.md` and `.agents/skills/loop2-deploy/references/backup_and_restore.md`. `509961a1` is the fix of the two Minor findings of the review of the whole change: the hint also says to write the new marker down, step 5's placeholder reads "the marker name written down last, as in the install step 8", and the *Rationale* says the loss comes "at the first load after its deployment" (+3 −3 in each copy, +1 −1 in the decision).
- Changed files in the range `e3295528..509961a1`: the decision log, the test file's comments and the two instruction copies; nothing else. `scripts/restore-trial.mjs` and the game are untouched, as the task's *Out of scope* asks.

## Checks

- The gate: `python -B .the-way/task-cycle/gate_times.py --output .runs/task-cycles/proba-bez-wersji-zapisu/gate_times.md -- npm.cmd test` on `509961a1`, started 2026-11-16 04:53:36 UTC on the signal `start` of the day advisor: exit 0, 795 s, 0 other gate runs at the same time; 617 Python tests in 4 directories, every directory passed; 2537 Node tests passed, none skipped; the container tests ran against a Docker daemon (server 29.7.2); foundation check `0 errors`; check of the instruction files `0 error, 140 warn, 7 info`. Nothing failed or did not run.
- Failing on the base: none. The base `e3295528` is a merge commit with the tree of the merged branch's head, so no gate ran on it; the list of failing tests (none) was taken from the final gate of the earlier cycle, `docs/task-cycles/security-notes/cycle.md` as added by commit `717fb717` (run on `73818b23`: 617 tests passed, foundation check `0 errors`, `0 error, 140 warn, 7 info`).
- Own-work checks: the author's — `python -B .the-way/elements/common/foundation_check.py` exit 0 (`0 errors`), `python -B -m unittest tests.agent_workflow.test_loop2_deploy_skill` exit 0 (5 tests), `python -B -m unittest tests.deploy.test_restore_trial -v` exit 0 (19 tests, no skip), `python -B .the-way/instruction-files/check_instructions.py` exit 0 (`0 error, 143 warn, 7 info`); its weakest-point check (a place that still names the saved game's version as a condition) found none. The reviewer's positive control: one quotation in the test file put back to the old sentence made the foundation check exit 1 (`the quotation stands in no binding sentence of D-234`). The fix's checks: foundation check exit 0, deploy skill test exit 0 (5 tests).
- The foundation check on the final head, without `--skip-test-citations`: exit 0, `0 errors`, no `listed:` line. `git fetch origin --tags`, `git merge-base --is-ancestor origin/main HEAD`: exit 0 (`origin/main` = `e3295528` is an ancestor, no merge needed, the final tree is the tree the gate ran on). `python -B .the-way/task-cycle/review_reminder.py origin/main`: exit 0 (`merges: 24`, `threshold: 60`, `reminder: no`).
- The remarks check on the original: run 1 exit 1 (3 items from the reports not in the process remarks), run 2 exit 0 after the 3 were appended word for word. On the copy of the record, the check of private paths, the check of images, the form check of this description and its check of private paths, and the CI run on the last head: written after the copy is committed.
- Working copies left: none. Directories of earlier tasks kept (name | branch | reason): `przewodnik-testow` | `task/przewodnik-testow` | holds fail-node, which stays: uncommitted changes: a tracked file changed or a new file that git does not ignore; holds fail-python, which stays: uncommitted changes: a tracked file changed or a new file that git does not ignore. `coding-guidelines` | `task/coding-guidelines` | uncommitted changes: a tracked file changed or a new file that git does not ignore.
- The reviewer of the whole change read the index of its whole selection (11 decisions listed in full, 71 by heading) and opened whole the decisions concerning the change; it read about 40 invariants of the touched parts that hold no backup, restore or instruction rule only by title. No item for an incomplete reading arises.

## Foundation entries

- The decision on what a checked restore of the database means (settlement row 1, `row 1`): the operator repeats the trial every month and after each change of the database's schema version, not after a change of the saved game's version, which the trial does not check and which the game already handles when it discards a save of another version; its *Rejected* carries the two ways not chosen. No new entry; the decision's origin stays `none`. No invariant is altered, no surface, no *Violated* mark. Five tests that hold the decision's sentence by a line `decision:` have that line changed to the new sentence and are otherwise as they were: `test_a_daemon_gone_at_the_cleanup_is_exit_4_naming_what_was_made`, `test_a_listing_that_failed_shows_nothing_gone_though_each_removal_exited_0`, `test_a_removal_that_failed_shows_nothing_gone_though_the_listings_are_empty`, `test_a_volume_docker_still_lists_is_named_and_the_container_it_removed_is_not` and `test_pass_fail_on_wrong_password_fail_on_absent_marker_and_interruption` in `tests/deploy/test_restore_trial.py`.

## Minor findings

none

## Findings outside the task's scope

- Found by the review of the fix (`reports/review-fix-report.md`, "Note outside the fix diff"), in the reviewer's words, and named again by the return step: "Step 7 of "Restoring over the server's database" (`backup_and_restore.md:493-497`, both copies) still names the marker as "the name given … in step 8 of "Installing and reinstalling" and written down then". After a new marker given by the hint, that is the older one. The step has its own fallback ("If it was not written down, log in and check that the test account holds a saved game state the operator recognises"), and it belongs to the restore over the server, which the task does not touch. This is a note only; it reopens nothing." The place is `.claude/skills/loop2-deploy/references/backup_and_restore.md` and its copy under `.agents/skills/loop2-deploy/references/`. It stands as item 1 of *Fix or let through*.

## Course of the cycle

- **Task and sources:** repeat the restore trial every month and after a change of the database's schema version, with no condition of a change of the saved game's version; an independent task, accepted 2026-11-14 at revision `be597c41` of the repository, reconciled at the base `e3295528` (record question Q1).
- **Process pin:** `bfb2e109735b5fff98802b8be0ff3c43c799262a`; the task did not move the pin; the gate on it is the gate run above.
- **Spec:** none — no open design choice: settlement row 1 settles the decision and the task gives the hint's content.
- **Route:** one author without a plan, on the same class as the orchestrator (the change writes a decision through the decision skill and has to keep the foundation check green).
- **Plan:** none.
- **Choices:** 5 in the questions table of the record (Q1 reconciliation with the log, Q2 the wait for the day advisor's signal before each gate, Q3 the model class of reviewers, A1 and A2 on unread material); the ones beyond the task's content stand in items 2 to 4 of *You accept by merging*.
- **Blocking findings left:** none.
- **Record:** written after the copy is committed.
