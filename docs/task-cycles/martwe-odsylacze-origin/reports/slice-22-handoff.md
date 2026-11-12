# Handoff — slice 22 (`make-change`, a slice, or the retry of a slice)

The human who asked for this cycle delegated intermediate choices to the orchestrator; you ask the
human nothing. Questions go to the orchestrator in your report (status `questions`). A value, count or
wording in the task or the plan may be wrong; if it does not survive your own check, say so in the
report instead of fitting your change to it.

- Worktree (work from its root): `the repository root`, branch
  `task/martwe-odsylacze-origin`. Slice base (`git rev-parse HEAD` when this handoff was written):
  `1eec81dcb80bac856577bf0e565d788f844c90d6`; check that HEAD is still it and write it in your report. The worktree must be clean when you start.
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
- Report to `docs/task-cycles/martwe-odsylacze-origin/reports/slice-22-report.md`. Return: status
  (`done`, `done with concerns`, `questions`, `returned`, `reserved` or `blocked`), commits, a one-line check
  result naming what failed or did not run, and the report path. The report carries each check with its command
  and exit code, the own-work check, **Unread material** (what this handoff or the slice's *Read* names that
  stayed unread or was read in part, or `none`) and **Searches not found or unclear** (each thing looked
  for and not found or unclear, or `none`), and the one line per changed entry or comment that the slice asks.

## The slice (copied word for word from `plan.md`)

### Slice 22 — simulation tests of death, catch-up and the loop point to no note and no old Loop file

- **Goal:** In the files of *Change* no comment, docstring or test title points to a vault note or task document, or to a file of the private repository of the old Loop. A pointer is: a note's file name; a task named by its name or slug ("task plomyk", the task "odkrywanie", "the task"); a numbered item of a task document — To do N, Q N or question N, a row of Settlements to record, Acceptance criteria — or a line of the project concept; a file, line or test of the old Loop's repository (a path under `src/sim/` or `src/components/`, a `*.test.ts`, anything "at commit cdc7c0d"). For each pointer: information the code needs that the foundation already holds — the comment names the entry by its identifier, or goes where the code or the test's name already says it; information the code needs that the foundation does not hold — first written as a new decision through the project skill `the-way-record-decision` (the cycle's entry, *Origin* `none`, its reasoning from the passage of the note or of the old Loop's test, read from `the private snapshot of the notes (not committed)/`), then named by the comment; no information the code needs — the pointer, or the whole comment, goes. The headers of `tests/sim/death.test.mjs`, `tests/sim/catch-up.test.mjs` and `tests/sim/loop.test.mjs` say that the old Loop's tests at `cdc7c0d` bind these tests where they cover a case: what of that binding the code needs stands in the foundation, or the sentence goes. A pointer to a record of a loop2 cycle alone (a spec's decision, a slice, a plan) stays, unless removing the task's name leaves it unfindable; then it follows the same rule. The running game loop at https://kantarion.bieda.it/ is public and may stay named. Nothing but comments, docstrings and test titles changes, and every test passes as before. Never open, commit, stash or check out anything in the vault or in the old Loop's repository yourself; a source missing from the snapshot is a question to the orchestrator. The report gives, per changed line, the old pointer, the outcome (entry named, entry written, removed) and the entry.
- **Change:** `tests/sim/death.test.mjs` · `tests/sim/catch-up.test.mjs` · `tests/sim/loop.test.mjs` · `tests/sim/saved-game.test.mjs` · `tests/sim/flow.test.mjs` · `tests/sim/time.test.mjs` · `tests/sim/team.test.mjs` · `tests/sim/world.test.mjs` · `tests/sim/streak.test.mjs` · `foundations/decisions.md`
- **Read:** `docs/task-cycles/martwe-odsylacze-origin/task.md:17-27` Need · `docs/task-cycles/martwe-odsylacze-origin/task.md:29-40` To do · `docs/task-cycles/martwe-odsylacze-origin/task.md:50-57` Questions to settle, Pytanie 1a · `docs/task-cycles/martwe-odsylacze-origin/task.md:107-115` Settlements to record · `foundations/decisions.md:1520-1532` D-80 · Foundation entries row 1 (D-82 as changed) · Foundation entries row 2 (D-362 as changed) · Foundation entries row 3 (the new invariant) · `.claude/skills/the-way-record-decision/SKILL.md` · `.the-way/elements/decisions/skill/SKILL.md` · `.the-way/elements/decisions/skill/read.md` · `.the-way/elements/decisions/skill/decide_entry.md` · `.the-way/elements/decisions/template.md` · `.the-way/elements/common/rules.md` · `.the-way/elements/common/way_of_working.md` · `.the-way/task-cycle/skill/foundation_step.md` · `guidelines/testing.md` · `guidelines/coding.md` · the passages and old Loop tests the pointers name, in the snapshot of private sources (outside the measure)
- **Model:** same — each pointer needs a judgment whether the foundation holds what it points to, and a missing requirement becomes a decision
- **Risk:** none
- **Checks:** `npm test -- tests/sim/death.test.mjs`, and the same for each other test file of *Change* · `node node_modules/eslint/bin/eslint.js --max-warnings 0 tests/sim/death.test.mjs tests/sim/catch-up.test.mjs tests/sim/loop.test.mjs tests/sim/saved-game.test.mjs tests/sim/flow.test.mjs tests/sim/time.test.mjs tests/sim/team.test.mjs tests/sim/world.test.mjs tests/sim/streak.test.mjs` · `node node_modules/prettier/bin/prettier.cjs --check --no-config --no-editorconfig` on the same files · `python -B .the-way/elements/common/foundation_check.py` exits 0 · S1: `git grep -nIE '[a-z0-9_]+_loop2\.md|koncepcja_[a-z_]+\.md|rozpoznanie_[a-z_]+\.md|technologia_[a-z_]+\.md|zadanie_[a-z0-9_]+\.md|research_[a-z_]+\.md|in the vault|w vaulcie|Notes/Projects|_zadania|mariusznazar/loop/|cdc7c0d|8072ce6|loop repository|old Loop repository|loop .[A-Za-z/._-]+\.tsx?:|(^|[^/a-z])src/(sim|components)/|[a-z-]+\.test\.ts\b' -- tests/sim/death.test.mjs tests/sim/catch-up.test.mjs tests/sim/loop.test.mjs tests/sim/saved-game.test.mjs tests/sim/flow.test.mjs tests/sim/time.test.mjs tests/sim/team.test.mjs tests/sim/world.test.mjs tests/sim/streak.test.mjs` prints no line (exit 1) · S2: `git grep -nIE '[Tt]ask .?[a-z]+(-[a-z]+)+|[Tt]ask [a-z]+[,(]|accepted task|[Tt]he task\b|To do [0-9]|\bQ[0-9]+[a-z0-9]*\b|[Qq]uestions? [0-9]|[Ss]ettlements? (to record|row)|[Ss]ettlement row|Acceptance criteria|concept line|[Hh]andoff question|[Cc]arried question'` on the same files: each line it prints is listed in the report with why it points to nothing outside the repository
- **Depends on:** Slice 21


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

- `foundations/decisions.md:1651-1663` D-80
- `foundations/decisions.md:1677-1691` D-82
- `foundations/decisions.md:8825-8839` D-362
- `foundations/decisions.md:8915-8929` D-368
- `foundations/decisions.md:1651-1663` D-80
- `foundations/decisions.md:1558-1570` D-73
- `foundations/invariants.md:1288-1297` invariant tracked-file-private-names
- `foundations/invariants.md:948-957` invariant action-duration-minimum

Foundation entries made before your slice, by identifier: D-82 and D-362 changed, D-368 new, the invariant `tracked-file-private-names` new and `action-duration-minimum` changed (commit ccc03bcf). Decisions and invariants are found by their heading; a range of an earlier slice's file may have moved.

Orchestrator's addition to *Read* (plan, last section): read whole each invariant that a test file of your *Change* cites by an `invariant: <identifier>` line, and the part-map entry (`foundations/part_map.md`) of the part your files belong to.

## Additional instructions

- Make every edit with your editor tool, not with a script. Change only comments, docstrings and test titles of the files of *Change*, and `foundations/decisions.md` only to add a decision the slice's *Goal* allows (a requirement that only a note held). A test must pass as before; run each focused check of your slice and report its command and exit code.
- A new decision gets the next free number after the highest `### D-` heading of `foundations/decisions.md` at the head (the highest is D-372 or higher; check), the template's shape, *Origin* `none`, and its reasoning taken from the note passage in the snapshot; it is written through `the-way-record-decision` (do its steps and say which). Where an existing decision already carries what the comment points to, name the decision by its identifier or drop the pointer.
- A comment that points to a task document by the task's name or slug ("task plomyk"), by "the task", by a numbered item ("To do 3", "Q11", "question 4"), by a row of a task's settlements, by a line of the project concept, or to a file or test of the old Loop's repository is a pointer in the sense of the slice's *Goal* even when it names no file; so is "the definition", "the concept", "the spec" of a task that lives in the author's notes. A pointer to a record of a loop2 cycle alone stays.
- `origin/main` has been merged into the branch and may have added pointers of this kind since the plan was written; the searches in your *Checks* find them — fix every hit in the files of *Change*.

