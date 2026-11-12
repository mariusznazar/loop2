# Handoff — slice 1 (`make-change`, a slice, or the retry of a slice)

The human who asked for this cycle delegated intermediate choices to the orchestrator; you ask the
human nothing. Questions go to the orchestrator in your report (status `questions`). A value, count or
wording in the task or the plan may be wrong; if it does not survive your own check, say so in the
report instead of fitting your change to it.

- Worktree (work from its root): `the repository root`, branch
  `task/martwe-odsylacze-origin`. Slice base (`git rev-parse HEAD` when this handoff was written):
  `ccc03bcfb22272727db926fa3df6161f2eef2f0a`; check that HEAD is still it and write it in your report. The worktree must be clean when you start.
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
- Commits: one or more commits on the task branch, messages in English in the repository's style
  (`docs: :memo: …` for foundation and guideline text, `test: …`/`refactor: …` as git log shows for code and
  tests); `git add` by path, never `git add -A`; do not push. Do not run the product's gate (`npm test` with no
  argument); the focused checks of your slice, with their commands and exit codes, are yours.
- Report to `docs/task-cycles/martwe-odsylacze-origin/reports/slice-1-report.md`. Return: status
  (`done`, `done with concerns`, `questions`, `returned`, `reserved` or `blocked`), commits, a one-line check
  result naming what failed or did not run, and the report path. The report carries each check with its command
  and exit code, the own-work check, **Unread material** (what this handoff or the slice's *Read* names that
  stayed unread or was read in part, or `none`) and **Searches not found or unclear** (each thing looked
  for and not found or unclear, or `none`), and the one line per changed entry or comment that the slice asks.

## The slice (copied word for word from `plan.md`)

### Slice 1 — testing guidelines take expectations from the foundation

- **Goal:** The paragraph of `guidelines/testing.md` on source documents and on the comment that names a file and line (its lines 90–102 at the base, under "Where the expected value comes from") says what D-82 says after its change: a test's expectation comes from the foundation — a decision, an invariant, a glossary entry — and a comment names no document outside the repository; information the code needs stands in the foundation, and a comment without such information is not written. The example of question Q7c of the test guide's task and the sentences on access to the vault go. No other meaning of the testing guidelines changes; the section's *Decision* line keeps D-73, D-80 and D-82. The text stays in Polish, like the file.
- **Change:** `guidelines/testing.md`
- **Read:** `docs/task-cycles/martwe-odsylacze-origin/task.md:29-40` To do · `docs/task-cycles/martwe-odsylacze-origin/task.md:50-57` Questions to settle, Pytanie 1a · `docs/task-cycles/martwe-odsylacze-origin/task.md:100-105` Decisions in play · `foundations/decisions.md:1427-1439` D-73 · `foundations/decisions.md:1520-1532` D-80 · Foundation entries row 1 (D-82 as changed) · Foundation entries row 2 (D-362 as changed)
- **Model:** cheaper
- **Risk:** none
- **Checks:** `python -B .the-way/elements/common/foundation_check.py` exits 0 · `python -B .the-way/task-cycle/tracked_private_paths_check.py tracked-file-private-paths` lists nothing · `git grep -nIE 'in the vault|w vaulcie|_loop2\.md|koncepcja_|vault|plik i linię|Q7c' -- guidelines/testing.md` prints no line (exit 1)
- **Depends on:** Foundation entries row 1


## Passages of the task your slice names (copied word for word)

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

### task.md:100-105 Decisions in play

## Decisions in play

- D-82 — „Test expectations may come from the loop2 foundation, accepted task documents in the folder that the entry `projects` under `loop2` in the locations file names, and in its `_zadania/` directory in state ready for cycle or completed, and the approved `definicja_mvp_loop2.md` there. The draft `koncepcja_projektowa.md` is a source only in a passage quoted by an accepted document; a test comment locating a documentary expectation names its file and line.” (`foundations/decisions.md:1546` na `952fbd0`). Zmiana, którą robi zadanie (pytanie 1a): oczekiwania testów pochodzą z fundamentu; informacja ważna dla kodu stoi w fundamencie, a komentarz testu nie wskazuje źródła oczekiwania. Jej *Rejected* „Foundation alone — forces every expected number into a decision” przestaje być drogą odrzuconą.
- D-362 — „loop2 names a place on the author's disk outside the repository, such as the folder of its projects in the notes and the list of its tasks, by the entry that stands for it under `loop2` in the locations file `~/.the-way/locations.json`, which are the entries `projects` and `tasks`, and no file git tracks holds an absolute path on that disk. A file may name a note and the folder it lies in within the notes, such as `Notes/Projects/(P) Loop/_zadania`, without a path on the disk.” (`foundations/decisions.md:8080` na `952fbd0`). Zmiana, którą robi zadanie (pytania 1, 1a i 2): drugie zdanie znika — żaden plik śledzony nie nazywa notatki ani jej katalogu w notatkach; *Rejected* D-362 „removing the names of the notes altogether — decisions lose the pointer to their reasoning […]” przestaje być drogą odrzuconą, bo uzasadnienie przechodzi do wpisów.
- D-80 — „A test of a game parameter, such as survival time, progress rate or map difficulty, may check calculations on concrete numbers, but takes its expectation from an agreed requirement. Current parameters or the simulation's current result are not themselves evidence of correctness.” (`foundations/decisions.md:1520`). Zadanie nie zmienia jej brzmienia; po zmianie D-82 uzgodnione wymaganie to wpis fundamentu.
- 301 decyzji, których *Origin* wskazuje notatkę z vaultu (`grep -n "in the vault" foundations/decisions.md` w liniach `- **Origin:**` na `952fbd0`): zadanie nie zmienia ich zdań wiążących, tylko *Rationale*, *Rejected* i *Origin*; przeniesienie uzasadnienia nie zmienia znaczenia decyzji.


## Current ranges (the plan's line numbers were written at the base; where they differ, these hold)

- `foundations/decisions.md:1427-1439` D-73
- `foundations/decisions.md:1520-1532` D-80
- `foundations/decisions.md:1546-1560` D-82
- `foundations/decisions.md:8105-8119` D-362
- `foundations/decisions.md:8195-8206` D-368
- `foundations/decisions.md:1520-1532` D-80
- `foundations/decisions.md:1427-1439` D-73
- `foundations/invariants.md:1289-1298` invariant tracked-file-private-names
- `foundations/invariants.md:949-958` invariant action-duration-minimum

Foundation entries made before your slice, by identifier: D-82 and D-362 changed, D-368 new, the invariant `tracked-file-private-names` new and `action-duration-minimum` changed (commit ccc03bcf). Decisions and invariants are found by their heading; a range of an earlier slice's file may have moved.
