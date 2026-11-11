**State: ready** — one item of *Fix or let through* waits for your answer, and merging without an answer lets it through; nothing blocks the merge.

## What you will see

The agent instructions of loop2 no longer carry their own copy of the rule for moving a task's line to Ready. In its place stands one line that points to the author's own rules for a task's line (its status when new, its move to ready, its dependencies), through the entry named `task-rules` in the author's file of places, the file that already holds the entries for the projects and the tasks. So the rule now lives in one place, the author's notes, and cannot drift from a second copy in the repository. For a task of loop2 nothing changes in practice: its line still moves to Ready when its document first reaches `ready for cycle`, only now the agent reads that rule from the notes. The decision that says how loop2 points to places outside the repository now lists this third entry beside the other two.

The version of the process loop2 uses (the-way) moved to the one of 2026-11-11, the first that reads these rules from the task place; this is the branch's first commit, and the whole test run passes on it. Nothing in the game itself changed, so there is nothing to look at on a screen.

### Underneath

The change is two edits of text, one line in the agent instructions and one decision in the foundation, plus the move of the process pin. The entry `task-rules` in the author's file of places outside the repository was added by the human before the cycle, and this change neither touches that file nor writes its path.

## For you to decide

### Needed from you

none

### Fix or let through

1. Two small mismatches in the decision about places outside the repository were left alone, because they were there before this task and lie outside it. First, the decision's pointer to its source names an old task document, which the rules of the process no longer allow in that place. Second, the decision lists three entries of the file of places, while that file also holds a fourth entry, `repository`, that the decision does not name. Nobody playing the game feels either; whoever reads the decision next may take its list for complete, and the next review of the foundation will report both. Fixing them in this request costs one more round of correction with a review, and the pointer needs your choice of what to write instead (`none` would drop the link to the earlier reasoning, a different pointer needs a source that survives the closing of tasks). A separate task costs one small task later, and letting them through costs nothing today. I recommend making one task of both, since the pointer needs your choice and the list needs a look at the file of places. Fix them in this request, make a task of it, or let it through?

### You accept by merging

Merging accepts these items; if one does not suit you, say which.

2. The decision about places outside the repository got only the new entry in its sentence and the two options the task rejected in its list of rejected ways. The longer reasons the author first wrote into it (why the rules sit with the author's other task rules, and a wider example of a correct line) were taken out after the review, since you had not settled them. The price is that the decision says less about why the rules stay in the notes.

## Cost

Working time of the cycle about 28 minutes by the table of stages, plus the waits for three full test runs (the base, the pin-move commit and the final tree), each between 17 and 36 minutes; the models were Sonnet 5.5 (orchestrator and both reviews) and Haiku 5.5 (the author), with about 16.1 million tokens in all, most of them cached input. There was one review of the whole change and one review of its fix, no blocking finding and no reverted fix. The table of stages is in the committed record (see *Record* below).

## How to merge

Merge with a merge commit that keeps the commits, since the link to the record survives only then. The foundation has waited for a review through 76 merges since the start of the history, and the script's threshold is 30; the review is the skill `the-way-review-foundation`, started in a session in this repository, and nothing in this request waits for it.

<details>
<summary>W języku zadania (po polsku)</summary>

**Stan: gotowe** — jedna pozycja z części „Napraw albo przepuść” czeka na twoją odpowiedź, a scalenie bez odpowiedzi ją przepuszcza; nic nie blokuje scalenia.

## Co zobaczysz

Instrukcje agenta w loop2 nie mają już własnej kopii zasady przestawiania linii zadania na Ready. W jej miejsce stoi jedna linia, która wskazuje własne zasady autora dla linii zadania (jej status na początku, przejście na gotową, zależności) przez wpis o nazwie `task-rules` w pliku miejsc autora, tym samym, w którym są już wpisy projektów i zadań. Zasada żyje więc w jednym miejscu, w notatkach autora, i nie rozjedzie się z drugą kopią w repozytorium. Dla zadania loop2 w praktyce nic się nie zmienia: jego linia dalej przechodzi na Ready, gdy dokument pierwszy raz dojdzie do `ready for cycle`, tylko agent czyta teraz tę zasadę z notatek. Decyzja o tym, jak loop2 wskazuje miejsca poza repozytorium, wymienia teraz ten trzeci wpis obok dwóch pozostałych.

Wersja procesu, której używa loop2 (the-way), przesunęła się na wersję z 2026-11-11, pierwszą, która czyta te zasady z miejsca zadań; to pierwszy commit gałęzi, a cały przebieg testów przechodzi na nim. W samej grze nic się nie zmieniło, więc nie ma czego oglądać na ekranie.

### Pod spodem

Zmiana to dwie poprawki tekstu, jedna linia w instrukcjach agenta i jedna decyzja w fundamencie, plus przesunięcie przypięcia procesu. Wpis `task-rules` w pliku miejsc autora poza repozytorium dopisał człowiek przed cyklem; ta zmiana nie rusza tego pliku i nie zapisuje jego ścieżki.

## Do rozstrzygnięcia

### Potrzebne od ciebie

none

### Napraw albo przepuść

1. Dwie drobne niezgodności w decyzji o miejscach poza repozytorium zostawiono, bo były tam przed tym zadaniem i leżą poza nim. Po pierwsze, wskazanie źródła w decyzji nazywa stary dokument zadania, czego zasady procesu nie dopuszczają już w tym miejscu. Po drugie, decyzja wymienia trzy wpisy pliku miejsc, a ten plik ma jeszcze czwarty, `repository`, którego decyzja nie nazywa. Nikt grający w grę tego nie odczuje; kto następny przeczyta decyzję, może wziąć jej listę za pełną, a najbliższy przegląd fundamentu zgłosi obie sprawy. Poprawa w tym requeście kosztuje jeszcze jedną turę poprawek z przeglądem i wymaga, żebyś wybrał, co wpisać zamiast wskazania (`none` odcina link do wcześniejszego uzasadnienia, inne wskazanie wymaga źródła, które przetrwa zamknięcie zadań). Osobne zadanie kosztuje jedno małe zadanie później, a przepuszczenie nie kosztuje dziś nic. Polecam zrobić z obu spraw jedno zadanie, bo wskazanie wymaga twojego wyboru, a lista — spojrzenia w plik miejsc. Poprawić to w tym requeście, zrobić z tego zadanie, czy przepuścić?

### Akceptujesz przez scalenie

Scalenie akceptuje te pozycje; jeśli któraś ci nie odpowiada, powiedz która.

2. Decyzja o miejscach poza repozytorium dostała tylko nowy wpis w zdaniu i dwa odrzucone przez zadanie warianty na liście odrzuconych dróg. Dłuższe uzasadnienia, które autor najpierw w niej zapisał (dlaczego zasady zostają przy innych zasadach zadań autora i szerszy przykład poprawnej linii), usunięto po przeglądzie, bo ich nie rozstrzygnąłeś. Cena: decyzja mówi mniej o tym, dlaczego zasady zostają w notatkach.

## Koszt

Czas pracy cyklu około 28 minut według tabeli etapów, plus czekanie na trzy pełne przebiegi testów (baza, commit z przesunięciem pinu i końcowe drzewo), każdy od 17 do 36 minut; modele to Sonnet 5.5 (koordynator i oba przeglądy) i Haiku 5.5 (autor), razem około 16,1 mln tokenów, głównie z pamięci podręcznej. Był jeden przegląd całej zmiany i jeden przegląd jej poprawki, bez uwagi blokującej i bez cofniętej poprawki. Tabela etapów leży w zatwierdzonym zapisie cyklu (zob. *Record* niżej).

## Jak scalić

Scal commitem scalającym, który zachowuje commity, bo link do zapisu cyklu przetrwa tylko wtedy. Fundament czeka na przegląd przez 76 scaleń od początku historii przy progu skryptu 30; przegląd to skill `the-way-review-foundation`, uruchamiany w sesji w tym repozytorium, a nic w tym requeście na niego nie czeka.

</details>

## Technical changes

The change is a small one in three parts. In plain words: the pin of the process moved with nothing else rewritten; one rule line of the agent instructions was swapped for a pointer; and the decision about places outside the repository was extended by one entry. Commits, in order on the task branch:

1. `8a2b3f2c` — moves the pin of `.the-way` from `52f8164a` to `e9a0f926`; the installer rewrote only the gitlink (every other path it owns read `KEEP`).
2. `59d3f8fd` — `AGENTS.md`, section `## Backlog`: the bullet that began "When a task document first reaches `Status: ready for cycle`" is replaced by the line `Task rules`, word for word the line of the-way's own `AGENTS.md` at `e9a0f92` with `loop2` for `the-way`.
3. `a46e02fc` — D-362 in `foundations/decisions.md`: the binding sentence lists `task-rules`; *Verification*, *Rationale*, *Rejected* and *Origin* extended (the *Origin* extension was an error of the cycle's first handoff, see the next commit).
4. `9bbed2f8` — D-362 *Origin* restored to its text at the base, since the decisions template forbids naming a task document there.
5. `13988e66` — the fix for the two Minor findings of the review of the whole change: the added *Rationale* sentence and the widened *Verification* `complies` example returned to their base wording. The fix was reviewed and not reverted.

The return step made no commit. The final tree differs from the base `01418389` in the gitlink, in one line of `AGENTS.md` and in the binding sentence and *Rejected* of D-362.

## Checks

- Gate: `npm test`, exit 0 on the final tree `13988e66` (544 tests in 4 directories, every directory passed, `0 errors`, which includes `foundation_check.py`). No check failed or did not run in the final run.
- On the base `01418389` the first `npm test` run exited 1: `tests/quality` failed two tests (`test_ruff_source_rules`, `test_shellcheck_source_rules`, `FileNotFoundError`) because the fresh worktree had no quality environment (`.runs/quality-venv`, which `README.md` asks for). After it was installed, `python -B .the-way/gate/run_tests.py tests/quality` exited 0 (40 tests). `foundation_check.py` did not run in that first run (the gate stops at the first failing stage); run on its own on the base it exited 0 with 0 errors. This was a gap of the worktree, not a failing check of the code.
- Gate on the pin-move commit `8a2b3f2c` alone: `npm test` exit 0, 544 tests, `0 errors`; no check fails there that passed on the base, so the move of the pin carries no work.
- Own-work checks: the author checked that no tracked file holds a path or note link (`tracked_private_paths_check.py tracked-file-private-paths`, exit 0, 436 files, 0 listed), that the `AGENTS.md` line equals the-way's line with `loop2` (identical) and that D-362 *Origin* names no task document of this task (byte-identical to the base).
- User-interface states and screenshots: not applicable, no screen changed.
- Form check of this description (`request_check.py … --task …`): pending its first run.
- Check of private paths on this description and on the record's copy, image check on the record's copy, and the process remarks check on the original and on the copy: pending, filled in with the link to the record.

## Foundation entries

- D-362 (changed, `row 1`) — English: loop2 names the rules of a task's line by the entry `task-rules` under `loop2` in the locations file, and no tracked file holds a path on the author's disk. No invariant test, surface or *Violated* mark is changed; the invariant `tracked-file-private-paths` derives from D-362 and its check passes. No row is tied to an entry already stated.

## Minor findings

none

## Findings outside the task's scope

1. `foundations/decisions.md:8113`, D-362 *Origin* names a task document, which the template (section *Origin*, WAY-27) forbids; it was so at the base. The author correctly left it. The same *Origin* also points to question numbers of an earlier task that no longer describe the whole entry, since the entry now also rests on this task's question 2. A foundation review can decide whether to turn it to `none`.
2. The locations file holds a fourth entry under `loop2`, `repository`, which D-362's "which are the entries `projects`, `tasks` and `task-rules`" does not list (the base sentence did not list it either; the `violates` example speaks of "an old copy of the repository"). The task asked only for `task-rules`. A later foundation review may reconcile the list.

No check whose file belongs to a part outside the task's parts failed in a cycle run.

## Course of the cycle

- **Task and sources:** loop2's agent instructions take the rules of a task's line from the rulebook through the entry `task-rules` instead of repeating one of them; independent task, no project; sources: the frozen task document (settlements accepted 2026-11-11) and the-way at `e9a0f92`.
- **Process pin:** moved from `52f8164a354ee1a704af0d58add2f3be8e4f0247` to `e9a0f926dc9758f6554e8c0a30925d3e4d68cfed` by the branch's first commit `8a2b3f2c`; the gate on that commit exited 0 (544 tests, `0 errors`).
- **Spec:** none — no open design choice: the task fixes the line, the move of the pin and the change of D-362.
- **Route:** one author without a plan, on the class `cheaper` (Haiku 5.5): two small text changes in two parts; no discarded attempt.
- **Plan:** none.
- **Choices:** 1 other choice (the *Origin* of D-362 is not extended, after the author's report of the conflict with the template), in the questions table of the record (link below).
- **Blocking findings left:** none.
- **Record:** the link by the SHA of the commit that adds it, filled in when the record is committed.
