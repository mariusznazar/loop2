# Handoff — slice 37 (`make-change`, a slice, or the retry of a slice)

The human who asked for this cycle delegated intermediate choices to the orchestrator; you ask the
human nothing. Questions go to the orchestrator in your report (status `questions`). A value, count or
wording in the task or the plan may be wrong; if it does not survive your own check, say so in the
report instead of fitting your change to it.

- Worktree (work from its root): `the repository root`, branch
  `task/martwe-odsylacze-origin`. Slice base (`git rev-parse HEAD` when this handoff was written):
  `5b78e79680e1ac43cc9e975676db603cabb111fd`; check that HEAD is still it and write it in your report. The worktree must be clean when you start.
- Variant (the words of the row in the table of `make-change`'s `SKILL.md`): "a slice, or the retry of a slice".
  Method: read `.the-way/task-cycle/change/SKILL.md` whole, and a file it names only when the step or
  variant that names it comes. The skills named in the slice are project skills (`the-way-record-decision`
  etc. under `.claude/skills/`), each reading its source skill in `.the-way`.
- Frozen task: `docs/task-cycles/martwe-odsylacze-origin/task.md`; plan: `docs/task-cycles/martwe-odsylacze-origin/plan.md`
  (its *Choices* table and the last section, the orchestrator's review). The passages of the task your slice
  names are copied below; you read the files of the slice's *Read* yourself when the step that needs them
  comes, whole where the product's rules say whole, by passage where the slice says passage.
- The product's `AGENTS.md` applies: read `guidelines/coding.md` before changing code or tests, `guidelines/testing.md` before
  writing or changing tests, `guidelines/styleguide-browser-view.md` before changing a file of the part `browser-view`
  (listed in `foundations/part_map.md`), and `src/browser/AGENTS.md` before working in `src/browser/`.
- Private sources: the snapshot `the private snapshot of the notes (not committed)/` (`MANIFEST.md`; `vault/`
  holds the notes, deleted ones as they were before deletion; `old-loop/` holds the old Loop's files). Never
  open, commit, stash or check out anything in the vault `the author's notes` or in
  `the local clone of the old game's repository` yourself; a note missing from the snapshot is a question to the orchestrator.
  Nothing a changed file or entry gains names a note, a task, a To do item or a question number of a task
  document, a path on a disk, or a copy of a task document in loop2's history. No secret, host address,
  account, e-mail address or personal fact of a note enters a file; where the reasoning rests on one, say
  what it is without it. A reason a note does not give is not added.
- The running game loop at https://kantarion.bieda.it/ is public and may stay named in a file (the foundation and
  the deploy workflow already record it); no other host address of a note enters a file.
- Commits: one or more commits on the task branch, messages in English in the repository's style
  (`docs: :memo: …` for foundation and guideline text, `test: …`/`refactor: …` as git log shows for code and
  tests); `git add` by path, never `git add -A`; do not push. Do not run the product's gate (`npm test` with no
  argument); the focused checks of your slice, with their commands and exit codes, are yours.
- Report to `docs/task-cycles/martwe-odsylacze-origin/reports/slice-37-report.md`. Return: status
  (`done`, `done with concerns`, `questions`, `returned`, `reserved` or `blocked`), commits, a one-line check
  result naming what failed or did not run, and the report path. The report carries each check with its command
  and exit code, the own-work check, **Unread material** (what this handoff or the slice's *Read* names that
  stayed unread or was read in part, or `none`) and **Searches not found or unclear** (each thing looked
  for and not found or unclear, or `none`), and the one line per changed entry or comment that the slice asks.

## The slice (copied word for word from `plan.md`)

### Slice 37 — residual pointers in the view files, the styleguide and the environment facts

- **Goal:** In the files of *Change* no comment, docstring or test title points to a document outside the foundation: a vault note or task document (by file name, name or slug, numbered item, settlements row or concept line), a file of the old Loop's repository, or — by Q9 of the cycle's record — a spec, a plan, a slice, a round or a report of an earlier cycle (\"Spec, decision 4\", \"spec section 7\", \"slice 3\", \"Plan, Choices\", \"docs/task-cycles/…\"; a decision number of a spec is not a decision number of the foundation). For each pointer: the requirement is in the foundation — the comment names the decision or invariant by its identifier (verify that the decision states what the comment claims; the comment must not cite a decision for something it does not say), or drops the pointer when the test title or the code already says it; the requirement is only in the pointed document and the code needs it — first written as a new decision through the project skill `the-way-record-decision` (the cycle's entry, *Origin* `none`, the next free number after the highest `### D-` heading at the head), then named by the comment; no information the code needs — the pointer, or the whole comment, goes. The running game loop at https://kantarion.bieda.it/ is public and may stay named. A hit that uses a word for something else (the product's trip plan, a variable named `spec`) is listed in the report with why. Nothing but comments, docstrings and test titles changes (the orchestrator compares each code file with comments stripped), and every test passes as before. Never open, commit, stash or check out anything in the vault; a note missing from the snapshot is a question to the orchestrator. The report gives, per changed line, the old pointer, the outcome and the entry. The end-window files came with `main`; `tests/view/program-panel.test.mjs:625` cites D-167 for \"„Usuń” shows the first program\", which D-382 says and D-167 does not; `guidelines/styleguide-browser-view.md` lines about \"the old Loop used `brightness(0.55)` for both the dead mage and the extinguished fire\" rest on a file of the old Loop's repository that is not reachable — state what the product does (the values) and drop the claim about the old game. In `foundations/environment_facts.md` change nothing but a pointer in a fact's text that names a document outside the foundation (the *Source* lines of facts name public sources and stay); for an environment fact use the project skill `the-way-record-environment-fact`.
- **Change:** `tests/view/end-window-game.test.mjs` · `tests/view/end-window.test.mjs` · `tests/view/end-window-lines.test.mjs` · `tests/view/memory-limit.test.mjs` · `tests/view/page-document.mjs` · `tests/view/program-panel.test.mjs` · `src/browser/view/end-window-lines.ts` · `src/browser/view/end-window.tsx` · `src/browser/view/account-card.tsx` · `src/browser/view/app.ts` · `guidelines/styleguide-browser-view.md` · `foundations/environment_facts.md`
- **Read:** `docs/task-cycles/martwe-odsylacze-origin/task.md:17-27` Need · `docs/task-cycles/martwe-odsylacze-origin/task.md:29-40` To do · `docs/task-cycles/martwe-odsylacze-origin/task.md:50-57` Questions to settle, Pytanie 1a · `docs/task-cycles/martwe-odsylacze-origin/task.md:107-115` Settlements to record · D-80, D-82 as changed, D-362 as changed and the invariant `tracked-file-private-names` (foundation entries) · the cycle's record, `cycle.md` question Q9 · `.claude/skills/the-way-record-decision/SKILL.md` · `.the-way/elements/decisions/skill/SKILL.md` · `.the-way/elements/decisions/skill/read.md` · `.the-way/elements/decisions/skill/decide_entry.md` · `.the-way/elements/decisions/template.md` · `.the-way/elements/common/rules.md` · `guidelines/testing.md` · `guidelines/coding.md` · `.claude/skills/the-way-record-environment-fact/SKILL.md` · `src/browser/AGENTS.md` · `guidelines/styleguide-browser-view.md`
- **Model:** same — each pointer needs a judgment whether the foundation holds what it points to
- **Risk:** none
- **Checks:** the focused test of each test file of *Change* (`npm test -- <file>` for a `.test.mjs`, one at a time; for a Python test `python -B scripts/test.py <file>` where it needs no container, otherwise `python -B -m py_compile <file>` and say so) · eslint and prettier on the changed JavaScript/TypeScript files · `the quality environment of the worktree (not committed)/Scripts/ruff.exe check <changed Python files>` · `python -B .the-way/elements/common/foundation_check.py` exits 0 · S1: `git grep -nIE '[a-z0-9_]+_loop2\.md|koncepcja_[a-z_]+\.md|rozpoznanie_[a-z_]+\.md|technologia_[a-z_]+\.md|zadanie_[a-z0-9_]+\.md|research_[a-z_]+\.md|in the vault|w vaulcie|Notes/Projects|_zadania|mariusznazar/loop/|cdc7c0d|8072ce6|loop repository|old Loop repository' -- <the files of Change>` prints no line · S3: `git grep -nIE '\b[Ss]pec\b|\b[Pp]lan\b|docs/task-cycles|\b[Ss]lice [0-9]+|\b[Rr]ound [0-9]+|\bpackage [0-9]+|\b[Tt]ask item|\b[Rr]eview finding' -- <the files of Change>`: each hit is fixed or listed in the report with why it points to nothing outside the repository
- **Depends on:** Slice 36


## Passages of the task your slice names (copied word for word)

### task.md:17-27 Need

### Need

- Repozytorium loop2 jest publiczne, a jego pliki odsyłają do miejsc, do których czytelnik nie sięga: notatek z vaultu Mariusza i prywatnego repozytorium starego Loopa.
- Na 362 decyzje w `foundations/decisions.md` 301 wskazuje w *Origin* notatkę z vaultu (dokumenty zadań, definicje MVP i MVP2, koncepcję projektową, dokumenty rozpoznania), a 61 ma `none` (loop2 `952fbd0`).
- Te 301 wpisów wskazuje razem 54 różne notatki; 38 z nich już nie istnieje, bo rulebook każe kasować notatkę zadania po jego domknięciu, więc 365 z 508 wskazań prowadzi donikąd (stan vaultu 2026-11-11); wszystkie 38 są w historii gita vaultu (sprawdzone 2026-11-11 dla każdej).
- D-82 każe testom brać oczekiwania z dokumentów zadań i definicji MVP w vaulcie, a komentarzowi testu wskazywać plik i linię, więc około 45 linii w 26 plikach poza decyzjami nazywa notatki z vaultu: komentarze testów (np. `// odkrywanie_loop2.md:21` w `tests/sim/data.test.mjs`), `guidelines/testing.md`, `guidelines/styleguide-browser-view.md`, `src/browser/tokens.css` i *Derives from* niezmiennika `action-duration-minimum`.
- Komentarz testu wskazuje notatkę także tam, gdzie fundament już niesie to samo wymaganie: wiersz `odkrywanie_loop2.md:21` mówi to, co D-121; część wymagań sprawdzanych przez testy (np. „Wędruj” woli nieodkryty sąsiedni kafelek, `tests/sim/actions.test.mjs:181`; zakres 0–100 warunku „Energia natury poniżej”, `tests/sim/conditions.test.mjs:298`) jest tylko w notatkach.
- D-362 pozwala wprost, by plik nazywał notatkę i jej katalog w notatkach.
- Komentarze w `src/browser/styles.css`, `tests/view/scene-picture.test.mjs` i `tests/view/scene.test.mjs` oraz *Source* faktu `pixel-crawler-terms` odsyłają do plików repozytorium starego Loopa, które jest prywatne (GitHub, sprawdzone 2026-11-11).
- Agent w loop2, który chce zrozumieć, dlaczego decyzja zapadła albo skąd test bierze oczekiwanie, dostaje nazwę pliku, którego nie ma albo do którego nie sięga; Mariusz, wracając do decyzji po miesiącach, znajduje uzasadnienie tylko w skasowanej notatce.
- Bez tego zadania nowe wpisy przestaną wskazywać vault, ale stare zostaną, coraz więcej z nich martwych, a D-82 i D-362 pozwalają nowym testom i wpisom dopisywać kolejne.

### task.md:29-40 To do

### To do

1. Każda decyzja, której *Origin* wskazuje notatkę z vaultu, ma w *Rationale* i *Rejected* całe uzasadnienie, jakie ta notatka niesie dla tej decyzji, a jej *Origin* czyta `none` albo wskazuje tylko to, co the way tam dopuszcza (np. plik repozytorium loop2 na ustalonym commicie). Treść skasowanej notatki bierze się z historii gita vaultu (`git log --all -- "*<nazwa>"`, potem `git show <commit>^:<ścieżka>`).
2. Punkt 1 obejmuje tak samo dokumenty wskazywane w *Origin*, które nie są dokumentami zadań i dalej istnieją (definicje MVP i MVP2, koncepcja projektowa, zakres i plan MVP2, dokumenty rozpoznania i technologii, research edytora programu, `mag_w_lesie_loop2.md`, `serwer_testowy_loop2.md`); żaden z nich nie przechodzi do repozytorium (pytanie 3).
3. D-82 mówi, że oczekiwania testów pochodzą z fundamentu; nie wskazuje dokumentów zadań, definicji MVP ani koncepcji projektowej (pytanie 1a).
4. D-362 nie pozwala już plikowi nazywać notatki i jej katalogu w notatkach; jej pierwsze zdanie, o pozycjach pliku lokalizacji i braku ścieżek bezwzględnych, zostaje (pytanie 2).
5. Każdy komentarz w testach i kodzie, który wskazuje notatkę z vaultu albo plik prywatnego repozytorium starego Loopa: informacja ważna dla kodu, której fundament nie niesie, przechodzi do fundamentu; komentarz, który nie niesie istotnej informacji, znika (pytanie 1a).
6. `guidelines/testing.md` (akapit o dokumentach źródłowych i komentarzu wskazującym plik i linię, linie 90–102 na `952fbd0`) mówi to samo co nowa D-82: oczekiwanie testu pochodzi z fundamentu, a komentarz nie wskazuje dokumentu spoza repozytorium; innych znaczeń wytycznych testów zadanie nie zmienia.
7. `guidelines/styleguide-browser-view.md:333-335` i nagłówek `src/browser/tokens.css:1-7` nie wskazują notatki `styleguide_loop2.md`; to, co z niej ważne, stoi w fundamencie albo w samym przewodniku stylu. Komentarze `Source:` w `src/browser/tokens.css` (55 z 63 kończy wskazanie „(the task, Q…)”) zachowują swoje źródło — stronę gry loop z datą odczytu albo próg z D-42 — bez wskazania notatki; komentarz `Source:` przy każdej deklaracji zostaje, bo wymaga go niezmiennik `design-token-sources`. Lista rodzajów źródła w przewodniku stylu (`guidelines/styleguide-browser-view.md:336-352` na `952fbd0`) nie nazywa zadania: „wybór Mariusza z tego podglądu, z nazwą zadania i datą wyboru” staje się wyborem Mariusza z podglądu z datą wyboru, a „ustalenie zadania” — wyborem Mariusza z datą; komentarze `Source:` tych rodzajów w `src/browser/tokens.css` idą za tym (pytanie 6).
8. *Derives from* niezmiennika `action-duration-minimum` nie wskazuje notatki `wprawa_i_drzewa_loop2.md`, tylko decyzję fundamentu; dziś żadna decyzja nie niesie zdania, z którego niezmiennik wynika („Akcja skrócona gałęziami trwa co najmniej jedną minutę gry.”, wiersz 7 *Settlements to record* tamtej notatki), więc cykl zapisuje je jako decyzję.
9. *Source* faktu `pixel-crawler-terms` wskazuje warunki paczki Pixel Crawler w miejscu, do którego czytelnik sięga; gdy takiego nie ma, cykl pyta Mariusza.
10. Zmiany wpisów fundamentu idą skillami zapisu the way (`the-way-record-decision`, `the-way-record-invariant`, `the-way-record-environment-fact`), nie ręczną edycją.

### task.md:50-57 Questions to settle, Pytanie 1a

- Pytanie 1a: Skąd po zmianie D-82 testy biorą oczekiwania i co mówi komentarz testu, który dziś wskazuje notatkę zadania (np. `// odkrywanie_loop2.md:21` w `tests/sim/data.test.mjs`)?
  - Answer: oczekiwania testów pochodzą z fundamentu. Komentarz, który niesie informację ważną dla kodu, przechodzi do fundamentu; komentarz, który nie niesie istotnej informacji, znika — kod ma być zrozumiały sam, a komentarz wskazujący źródło oczekiwania nie jest potrzebny.
  - Not chosen:
    - A. komentarz wskazuje kopię dokumentu zadania w zapisie cyklu w historii gita loop2 (`docs/task-cycles/<nazwa>/task.md:<linia> at <commit>`) — Mariusz: „przecież po to mamy fundament, decyzje, niezmienniki a odsyłamy do zadań?”;
    - B. komentarz sam streszcza wymaganie, bez wskazania — nikt nie sprawdzi, czy streszczenie jest wierne;
    - zostawić jak jest — testy wskazują notatki, które znikają po zamknięciu zadania.
  - Source: Mariusz, 2026-11-11: „kod powinien być napisany tak, żeby sam był zrozumiały - jeśli komentarz // odkrywanie_loop2.md:21 ma przekazywać jakąś informację ważną dla kodu to powinien być w fundamencie, jeśli nie niesie żadnej istotnej informacji, to nie potrzebujemy takiego gówna wcale” oraz „dla 2+2=4 zapisywalibyśmy w takim przypadku że źródłem jest funkcja w oprogramowaniu kalkulatora?”
  - Uwaga: zmienia D-82, która odrzuciła „Foundation alone — forces every expected number into a decision”, i akapit `guidelines/testing.md:90-102` o dokumentach źródłowych i komentarzu wskazującym plik i linię.

### task.md:107-115 Settlements to record

## Settlements to record

Candidates: 7 shown, 3 accepted — 2026-11-11

| # | Settlement | Kind | Source | What the cycle would otherwise guess |
|---|---|---|---|---|
| 1 | Oczekiwania testów pochodzą z fundamentu; komentarz, który niesie informację ważną dla kodu, przechodzi do fundamentu, a komentarz bez istotnej informacji znika — kod ma być zrozumiały sam (zmienia D-82). | decision | pytanie 1a | czy nowy test może dalej wskazać dokument zadania albo kopię zadania w zapisie cyklu jako źródło oczekiwania, i co D-82 mówi po zmianie |
| 2 | Żaden plik śledzony loop2 nie odsyła do miejsca, do którego czytelnik publicznego repozytorium nie sięga — notatki z vaultu Mariusza, ścieżki na jego dysku ani pliku prywatnego repozytorium; co ważne, stoi w fundamencie (zmienia D-362). | decision | pytania 1, 2 i 3 | czy następny wpis albo komentarz może znów nazwać notatkę z vaultu albo plik starego Loopa, jak dziś pozwala drugie zdanie D-362 |
| 3 | Żaden plik śledzony loop2 nie nazywa notatki z vaultu Mariusza ani pliku prywatnego repozytorium starego Loopa; sprawdza to agent przy przeglądzie zmiany (metoda `review`), bo niezmiennik `tracked-file-private-paths` łapie tylko ścieżki bezwzględne i linki `…`. | invariant | wyprowadzony z wiersza 2 i z działania `tracked_private_paths_check.py`; Mariusz, 2026-11-11: „przyjmuję tak jak rekomendujesz” | czy przegląd zmiany w ogóle sprawdza nowe komentarze w rodzaju `// plomyk_loop2.md:22`, które `tracked-file-private-paths` przepuszcza |


## Current ranges (the plan's line numbers were written at the base; where they differ, these hold)

- `foundations/decisions.md:1677-1691` D-82
- `foundations/decisions.md:8825-8839` D-362
- `foundations/decisions.md:8915-8929` D-368
- `foundations/decisions.md:1651-1663` D-80
- `foundations/decisions.md:1558-1570` D-73
- `foundations/invariants.md:1288-1297` invariant tracked-file-private-names
- `foundations/invariants.md:948-957` invariant action-duration-minimum

Foundation entries made before your slice, by identifier: D-82 and D-362 changed, D-368 new, the invariant `tracked-file-private-names` new and `action-duration-minimum` changed (commit ccc03bcf). Decisions and invariants are found by their heading; a range of an earlier slice's file may have moved.

## Additional instructions

- Make every edit with your editor tool, not with a script. Change only comments, docstrings and test titles of the files of *Change*, and `foundations/decisions.md` only to add a decision the slice's *Goal* allows (a requirement that only a note held). A test must pass as before; run each focused check of your slice and report its command and exit code.
- A new decision gets the next free number after the highest `### D-` heading of `foundations/decisions.md` at the head (the highest is D-372 or higher; check), the template's shape, *Origin* `none`, and its reasoning taken from the note passage in the snapshot; it is written through `the-way-record-decision` (do its steps and say which). Where an existing decision already carries what the comment points to, name the decision by its identifier or drop the pointer.
- A comment that points to a task document by the task's name or slug ("task plomyk"), by "the task", by a numbered item ("To do 3", "Q11", "question 4"), by a row of a task's settlements, by a line of the project concept, or to a file or test of the old Loop's repository is a pointer in the sense of the slice's *Goal* even when it names no file; so is "the definition", "the concept", "the spec" of a task that lives in the author's notes. A pointer to a record of a loop2 cycle alone stays.
- `origin/main` has been merged into the branch and may have added pointers of this kind since the plan was written; the searches in your *Checks* find them — fix every hit in the files of *Change*.
- Decision of the orchestrator (recorded in the cycle's record): D-82 as rewritten says a test comment names no document outside the foundation. The cycle records (specs, plans, slices of earlier task cycles) are no longer in the tree (they exist only in git history, without a name the reader could use), so a pointer such as "Spec, decision 4", "spec section 7", "spec constraint D-90" (a decision number of a spec is not a decision number of the foundation), "Plan, Choices", "slice 3", "plan.md", "docs/task-cycles/…" is a pointer to a document outside the foundation too and counts as a pointer of this slice. Replace it by the decision (or invariant) of the foundation that holds the same requirement, or drop it when the test title or the code already says it, or — when a requirement lives only in that spec and the code needs it — write a decision as the slice's Goal allows. S3 finds them: run
  git grep -nIE '\b[Ss]pec\b|\b[Pp]lan\b|docs/task-cycles|\b[Ss]lice [0-9]+|\b[Rr]ound [0-9]+|\bpackage [0-9]+' -- <the files of Change>
  and fix every hit that points to such a document; a hit that uses the word for something else is listed in the report with why.

