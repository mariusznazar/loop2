# Handoff — agent of the plan's *Foundation entries* (`make-change`, foundation step)

The human who asked for this cycle delegated intermediate choices to the orchestrator; you ask the
human nothing. Questions go to the orchestrator in your report (status `questions`). A decision, a
count or a wording in the task or the plan may be wrong: if it does not survive your own check, say so
in the report instead of fitting the entries to it.

- Worktree (work from its root): `the repository root`, branch
  `task/martwe-odsylacze-origin`. Base commit: run `git rev-parse HEAD` first and write it in your
  report (it is `83ba52b2…`, the commit that moved the pin of `.the-way` to `e9a0f92`).
- Stage: the foundation step only — the plan's *Foundation entries* below, nothing else. This stage is
  not one of the variants of the table in `make-change`'s `SKILL.md`; your stage is the one named
  here. Read `.the-way/task-cycle/change/SKILL.md` whole and `.the-way/task-cycle/skill/foundation_step.md`
  whole, and the skill of an element when you write an entry of that element
  (`.claude/skills/the-way-record-decision/SKILL.md`, `the-way-record-invariant`,
  `the-way-record-environment-fact` — each reads its source skill in `.the-way`, and the file it names
  only when the step that names it comes). Entries are written only through those skills (task To do 10).
- Frozen task: `docs/task-cycles/martwe-odsylacze-origin/task.md` (read it whole). Plan:
  `docs/task-cycles/martwe-odsylacze-origin/plan.md` — its *Foundation entries* section, copied below,
  and its *Choices* table.
- Private sources: the snapshot `the private snapshot of the notes (not committed)/` (`MANIFEST.md` lists the
  notes; `vault/` holds them, deleted ones as they were before deletion). Read only the passages you
  need (the question with its answer, ways not chosen, the projected entry) and what they refer to.
  Never open, commit, stash or check out anything in the vault `the author's notes` or in
  `the local clone of the old game's repository` yourself; a note missing from the snapshot is a question to the orchestrator.
  Nothing an entry gains names a note, a task, a To do item or question number of a task document, a
  path on a disk, or a copy of a task document in loop2's history; no secret, host address, account,
  e-mail address or personal fact of a note enters an entry.
- Foundation entries to select and read: by "Reading the foundation" in
  `.the-way/elements/common/way_of_working.md`, for the entries below: D-80, D-82, D-362, the invariants
  `tracked-file-private-paths` and `action-duration-minimum`, and what the skills of the elements ask.
  The invariants a decision's *Verification* calls for are in scope only as the rows below say.
- Commits: one or more commits on the task branch, in the repository's message style, messages in
  English; `git add` by path, never `git add -A`. Run `python -B .the-way/elements/common/foundation_check.py`
  and report its command and exit code; do not run the product's gate (`npm test`). Own-work check as
  `make-change` gives it.
- Report to `docs/task-cycles/martwe-odsylacze-origin/reports/foundation-entries-report.md`. Return:
  status, commits, one-line check result, report path. The report carries **Unread material** and
  **Searches not found or unclear** (`none` where nothing), the mark and meaning sentences of every
  entry written (the request takes them from there), the question numbers of the reasoning you moved
  and from which passage.

## Task sections (copied word for word from the task)

### To do 3, 4, 8, 10
3. D-82 mówi, że oczekiwania testów pochodzą z fundamentu; nie wskazuje dokumentów zadań, definicji MVP ani koncepcji projektowej (pytanie 1a).
4. D-362 nie pozwala już plikowi nazywać notatki i jej katalogu w notatkach; jej pierwsze zdanie, o pozycjach pliku lokalizacji i braku ścieżek bezwzględnych, zostaje (pytanie 2).
8. *Derives from* niezmiennika `action-duration-minimum` nie wskazuje notatki `wprawa_i_drzewa_loop2.md`, tylko decyzję fundamentu; dziś żadna decyzja nie niesie zdania, z którego niezmiennik wynika („Akcja skrócona gałęziami trwa co najmniej jedną minutę gry.”, wiersz 7 *Settlements to record* tamtej notatki), więc cykl zapisuje je jako decyzję.
10. Zmiany wpisów fundamentu idą skillami zapisu the way (`the-way-record-decision`, `the-way-record-invariant`, `the-way-record-environment-fact`), nie ręczną edycją.

### Settlements to record
Candidates: 7 shown, 3 accepted — 2026-11-11

| # | Settlement | Kind | Source | What the cycle would otherwise guess |
|---|---|---|---|---|
| 1 | Oczekiwania testów pochodzą z fundamentu; komentarz, który niesie informację ważną dla kodu, przechodzi do fundamentu, a komentarz bez istotnej informacji znika — kod ma być zrozumiały sam (zmienia D-82). | decision | pytanie 1a | czy nowy test może dalej wskazać dokument zadania albo kopię zadania w zapisie cyklu jako źródło oczekiwania, i co D-82 mówi po zmianie |
| 2 | Żaden plik śledzony loop2 nie odsyła do miejsca, do którego czytelnik publicznego repozytorium nie sięga — notatki z vaultu Mariusza, ścieżki na jego dysku ani pliku prywatnego repozytorium; co ważne, stoi w fundamencie (zmienia D-362). | decision | pytania 1, 2 i 3 | czy następny wpis albo komentarz może znów nazwać notatkę z vaultu albo plik starego Loopa, jak dziś pozwala drugie zdanie D-362 |
| 3 | Żaden plik śledzony loop2 nie nazywa notatki z vaultu Mariusza ani pliku prywatnego repozytorium starego Loopa; sprawdza to agent przy przeglądzie zmiany (metoda `review`), bo niezmiennik `tracked-file-private-paths` łapie tylko ścieżki bezwzględne i linki `…`. | invariant | wyprowadzony z wiersza 2 i z działania `tracked_private_paths_check.py`; Mariusz, 2026-11-11: „przyjmuję tak jak rekomendujesz” | czy przegląd zmiany w ogóle sprawdza nowe komentarze w rodzaju `// plomyk_loop2.md:22`, które `tracked-file-private-paths` przepuszcza |

### Decisions in play (D-82, D-362)
- D-82 — „Test expectations may come from the loop2 foundation, accepted task documents in the folder that the entry `projects` under `loop2` in the locations file names, and in its `_zadania/` directory in state ready for cycle or completed, and the approved `definicja_mvp_loop2.md` there. The draft `koncepcja_projektowa.md` is a source only in a passage quoted by an accepted document; a test comment locating a documentary expectation names its file and line.” (`foundations/decisions.md:1546` na `952fbd0`). Zmiana, którą robi zadanie (pytanie 1a): oczekiwania testów pochodzą z fundamentu; informacja ważna dla kodu stoi w fundamencie, a komentarz testu nie wskazuje źródła oczekiwania. Jej *Rejected* „Foundation alone — forces every expected number into a decision” przestaje być drogą odrzuconą.
- D-362 — „loop2 names a place on the author's disk outside the repository, such as the folder of its projects in the notes and the list of its tasks, by the entry that stands for it under `loop2` in the locations file `~/.the-way/locations.json`, which are the entries `projects` and `tasks`, and no file git tracks holds an absolute path on that disk. A file may name a note and the folder it lies in within the notes, such as `Notes/Projects/(P) Loop/_zadania`, without a path on the disk.” (`foundations/decisions.md:8080` na `952fbd0`). Zmiana, którą robi zadanie (pytania 1, 1a i 2): drugie zdanie znika — żaden plik śledzony nie nazywa notatki ani jej katalogu w notatkach; *Rejected* D-362 „removing the names of the notes altogether — decisions lose the pointer to their reasoning […]” przestaje być drogą odrzuconą, bo uzasadnienie przechodzi do wpisów.

### Pytanie 1, 1a, 2 (Questions to settle)
- Pytanie 1: Czy zadanie obejmuje tylko pola *Origin* decyzji, czy wszystkie wskazania notatek z vaultu w repozytorium — także D-82, która każe testom brać oczekiwania z dokumentów zadań w vaulcie, komentarze testów, `guidelines/testing.md`, `guidelines/styleguide-browser-view.md`, `src/browser/tokens.css` i *Derives from* niezmiennika `action-duration-minimum`?
  - Answer: wszystkie wskazania notatek z vaultu w plikach śledzonych loop2, w jednym zadaniu (B).
  - Not chosen:
    - A. tylko *Origin* — D-82 dalej każe nowym testom pisać komentarze z nazwą notatki, martwych wskazań w testach przybywa, WAY-27 zostaje złamane w ~25 plikach;
    - C. tutaj tylko *Origin*, D-82 i komentarze osobnym zadaniem — Mariusz: „kurde co Wy macie z tymi osobnymi zadaniami”.
  - Source: Mariusz, 2026-11-11: „B” — na pytanie „czy to zadanie obejmuje tylko pola *Origin* decyzji, czy wszystkie wskazania notatek z vaultu w repozytorium?”
- Pytanie 1a: Skąd po zmianie D-82 testy biorą oczekiwania i co mówi komentarz testu, który dziś wskazuje notatkę zadania (np. `// odkrywanie_loop2.md:21` w `tests/sim/data.test.mjs`)?
  - Answer: oczekiwania testów pochodzą z fundamentu. Komentarz, który niesie informację ważną dla kodu, przechodzi do fundamentu; komentarz, który nie niesie istotnej informacji, znika — kod ma być zrozumiały sam, a komentarz wskazujący źródło oczekiwania nie jest potrzebny.
  - Not chosen:
    - A. komentarz wskazuje kopię dokumentu zadania w zapisie cyklu w historii gita loop2 (`docs/task-cycles/<nazwa>/task.md:<linia> at <commit>`) — Mariusz: „przecież po to mamy fundament, decyzje, niezmienniki a odsyłamy do zadań?”;
    - B. komentarz sam streszcza wymaganie, bez wskazania — nikt nie sprawdzi, czy streszczenie jest wierne;
    - zostawić jak jest — testy wskazują notatki, które znikają po zamknięciu zadania.
  - Source: Mariusz, 2026-11-11: „kod powinien być napisany tak, żeby sam był zrozumiały - jeśli komentarz // odkrywanie_loop2.md:21 ma przekazywać jakąś informację ważną dla kodu to powinien być w fundamencie, jeśli nie niesie żadnej istotnej informacji, to nie potrzebujemy takiego gówna wcale” oraz „dla 2+2=4 zapisywalibyśmy w takim przypadku że źródłem jest funkcja w oprogramowaniu kalkulatora?”
  - Uwaga: zmienia D-82, która odrzuciła „Foundation alone — forces every expected number into a decision”, i akapit `guidelines/testing.md:90-102` o dokumentach źródłowych i komentarzu wskazującym plik i linię.
- Pytanie 2: Co z regułą zadania „loop2: miejsca z dysku Mariusza przenieść z plików repozytorium do pliku lokalizacji ~/.the-way/locations.json”, że nazwy notatek i ich katalogów zostają w plikach śledzonych (jego odpowiedź na pytanie 2 z 2026-11-09 i wiersz 1 *Settlements to record*)?
  - Answer: ta reguła ustępuje pytaniom 1 i 1a tego zadania (A). Mariusz wybrał 2026-11-11 wchłonięcie tamtego zadania; w trakcie tego doprecyzowania tamto zadanie przeszło jednak swój cykl i weszło do loop2 (PR #76, `952fbd0`), z regułą zapisaną jako drugie zdanie D-362, więc z wyboru zostaje zmiana D-362 (punkt 4 *To do*), a reszta tamtego zadania jest zrobiona.
  - Not chosen:
    - B. zostawić tamto zadanie osobno i je poprawić — dwa cykle kolejno ruszają `AGENTS.md`, D-82 i wytyczne testów;
    - C. zostawić tamto zadanie bez zmian — jego cykl zapisze decyzję „plik może nazwać notatkę”, którą to zadanie odwraca.
  - Source: Mariusz, 2026-11-11: „A” — na pytanie „co robimy z zadaniem o ścieżkach?”; PR #76 loop2, scalony 2026-11-11.

## Plan: Foundation entries (copied word for word)

| Entry | Kind | From | What depends on it |
|---|---|---|---|
| D-82 changed: test expectations come from the foundation; a test comment points to no source outside the repository; its *Rationale*, *Rejected* and *Origin* (`none`) carry the reasoning of its note's question Q5p and of the task's question 1a, and its old *Rejected* "Foundation alone" is no longer a way rejected | decision (change) | row 1; To do 3; Pytanie 1a | Slice 1; Slices 21–33 |
| D-362 changed: its second sentence goes — no file git tracks names a vault note or the folder it lies in, or a file of a repository its readers cannot reach; its first sentence stays; its *Verification* examples, *Rationale*, *Rejected* and *Origin* (`none`) follow | decision (change) | row 2; To do 4; Pytanie 1, 2 | every slice (the rule its output keeps); row 3 |
| New invariant: no file git tracks names a note of the author's vault or a file of the private repository of the old Loop; *Method* `review`; *Part* `every`; derives from D-362 as changed. Check: the agent reviewing a change runs the two searches the slices carry (S1 for names of notes and of the old Loop's files, S2 for pointers to task documents) and judges each hit | invariant | row 3 | Slices 21–34 run its searches |
| New decision: an action shortened by bought branches lasts at least one game minute, with the reasoning of row 7 of the note it comes from, *Origin* `none` | decision (the cycle's) | To do 8 | the change of `action-duration-minimum` below |
| `action-duration-minimum`: *Derives from* names the new decision instead of the note | invariant (change) | To do 8 | none |

Entries changed or written by slices, not by this step: the *Rationale*, *Rejected* and *Origin* of the other 300 decisions whose *Origin* names a vault note (Slices 3–20, To do 1–2); decisions of the cycle's own for information a comment carries that the foundation lacks (Slices 21–33, To do 5); the *Source* of `pixel-crawler-terms` (Slice 34, To do 9).
