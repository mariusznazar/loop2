# Handoff — slice 8 (`make-change`, a slice, or the retry of a slice)

The human who asked for this cycle delegated intermediate choices to the orchestrator; you ask the
human nothing. Questions go to the orchestrator in your report (status `questions`). A value, count or
wording in the task or the plan may be wrong; if it does not survive your own check, say so in the
report instead of fitting your change to it.

- Worktree (work from its root): `the repository root`, branch
  `task/martwe-odsylacze-origin`. Slice base (`git rev-parse HEAD` when this handoff was written):
  `e08574f97115b8e53673aba407ea5634288fd321`; check that HEAD is still it and write it in your report. The worktree must be clean when you start.
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
- Report to `docs/task-cycles/martwe-odsylacze-origin/reports/slice-8-report.md`. Return: status
  (`done`, `done with concerns`, `questions`, `returned`, `reserved` or `blocked`), commits, a one-line check
  result naming what failed or did not run, and the report path. The report carries each check with its command
  and exit code, the own-work check, **Unread material** (what this handoff or the slice's *Read* names that
  stayed unread or was read in part, or `none`) and **Searches not found or unclear** (each thing looked
  for and not found or unclear, or `none`), and the one line per changed entry or comment that the slice asks.

## The slice (copied word for word from `plan.md`)

### Slice 8 — reasoning of D-128 to D-149 into the entries

- **Goal:** Each of D-128, D-129, D-130, D-131, D-132, D-133, D-134, D-135, D-136, D-137, D-138, D-139, D-140, D-141, D-144, D-147 and D-149 carries in its *Rationale* and *Rejected* the whole reasoning that the vault notes its *Origin* names hold for it, and its *Origin* reads `none` (or keeps only a loop2 file at a fixed commit it already names). Its question, binding sentences, *Scope*, *Based on*, *Relations* and *Verification* stay as they are. Each entry is changed through the project skill `the-way-record-decision`. Read the notes from the snapshot `the private snapshot of the notes (not committed)/vault/` (its `MANIFEST.md` gives each note, whether it still exists and the vault commit a deleted one was read from): in a note read the passage the *Origin* names — the question with its answer, the ways not chosen and why, the projected entry — and what that passage refers to, not the whole note. A note missing from the snapshot is a question to the orchestrator; never open, commit, stash or check out anything in the vault yourself. Nothing an entry gains names a note, a task, a To do item or question number of a task document, a path on a disk, or a copy of a task document in loop2's history; no secret, host address, account, e-mail address or personal fact of a note enters an entry — where the reasoning rests on one, say what it is without it. A reason the note does not give is not added; a *Rejected* the note does not give follows the decisions' template. Where a note contradicts the binding sentences, change nothing in them and return the question. The report gives one line per decision: what moved, from which passage.
- **Change:** `foundations/decisions.md`
- **Read:** `docs/task-cycles/martwe-odsylacze-origin/task.md:29-40` To do · `docs/task-cycles/martwe-odsylacze-origin/task.md:64-74` Questions to settle, Pytanie 3 and Pytanie 4 · `docs/task-cycles/martwe-odsylacze-origin/task.md:81-90` Context · `docs/task-cycles/martwe-odsylacze-origin/task.md:100-105` Decisions in play · `.claude/skills/the-way-record-decision/SKILL.md` · `.the-way/elements/decisions/skill/SKILL.md` · `.the-way/elements/decisions/skill/read.md` · `.the-way/elements/decisions/skill/decide_entry.md` · `.the-way/elements/decisions/template.md` · `.the-way/elements/decisions/examples.md` · `.the-way/foundations/decisions.md:68-94` WAY-03 · `.the-way/foundations/decisions.md:718-752` WAY-27 · `.the-way/elements/common/rules.md` · `.the-way/elements/common/way_of_working.md` · `.the-way/task-cycle/skill/foundation_step.md` · `foundations/decisions.md:2399-2839` D-128 to D-149 · Foundation entries row 2 (D-362 as changed) · the passages the *Origin* fields name, in the snapshot of private sources (outside the measure): odkrywanie, rozwiazanie_lasu, definicja_mvp2, koncepcja_projektowa, programy_gracza, petla_zarobkowa, teraz_i_potem, ekran_przejscia, karty_i_katalog_map, definicja_mvp, blokada_konta, potwierdzenie_adresu, reset_hasla, plomyk, wprawa_i_drzewa, kronika_z_filtrami
- **Model:** same — moving reasoning from Polish notes into English entries without adding or losing any is judgment over sources, where a cheaper model is likelier to fill gaps
- **Risk:** none
- **Checks:** `python -B .the-way/elements/common/foundation_check.py` exits 0 · `git grep -nIE 'in the vault|_loop2\.md|koncepcja_|rozpoznanie_|technologia_|zadanie_|Notes/Projects|_zadania' -- foundations/decisions.md` prints no line inside the slice's decisions · `git diff <the slice's base> -- foundations/decisions.md`, read whole: every changed line is a *Rationale*, *Rejected* or *Origin* line, or a line continuing one, of one of the slice's decisions
- **Depends on:** Slice 7


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

### task.md:64-74 Questions to settle, Pytanie 3 and Pytanie 4

- Pytanie 3: Co z 15 dokumentami wskazywanymi w *Origin*, które nie są dokumentami zadań i dalej istnieją — definicje MVP i MVP2, koncepcja projektowa, zakres i plan MVP2, dokumenty rozpoznania i technologii, research edytora programu, `mag_w_lesie_loop2.md`, `serwer_testowy_loop2.md`?
  - Answer: opisać we wpisach, tak jak notatki zadań (A): to, co dokument wnosi do decyzji, przechodzi do *Rationale* i *Rejected*, a *Origin* czyta `none`; żaden dokument z vaultu nie przechodzi do repozytorium.
  - Not chosen:
    - B. dokumenty rozpoznania i technologii przenieść do repozytorium (np. `docs/research/`) i wskazywać w *Origin* — robocze notatki badawcze stają się publiczne, a w repozytorium powstaje drugi zbiór dokumentów obok fundamentu;
    - C. przenieść wszystko, także definicje i koncepcję — publiczne repozytorium dostaje warsztat Mariusza i drugie źródło prawdy obok fundamentu.
  - Source: Mariusz, 2026-11-11: „A” — na pytanie „Którą drogę wybierasz?” o dokumenty, które dalej istnieją.
- Pytanie 4: Jedna zmiana czy kilka partiami?
  - Answer: jedno zadanie i jeden request (A); podział pracy na części, np. według notatki źródłowej, zostaje planowi cyklu.
  - Not chosen:
    - B. kilka zadań według grup notatek (np. MVP1, MVP2, serwer i konta, reszta z D-82 i testami) — mniejsze requesty, ale tyle pełnych cykli, ile grup.
  - Source: Mariusz, 2026-11-11: „A” — na pytanie „Którą drogę wybierasz?” o jedną zmianę albo kilka.

### task.md:81-90 Context

## Context

- Przypięcie `.the-way` w loop2 stoi od PR #76 na `52f8164`, które zawiera nową regułę *Origin* (the way PR #97, `024f486`).
- Reguła pola w szablonie decyzji the way (`.the-way/elements/decisions/template.md`, sekcja „Origin”, `52f8164`): „*Origin* points to where the full reasoning lives: a research document, a design document, a merge request, a ticket, or a file at a fixed commit — never to anything deleted when its task closes. When the whole reasoning is in the entry, it is `none`. Documents go in *Origin*; *Based on* names sources about the world. The task a decision was made in is not recorded, and a task document is never named in *Origin*, wherever the product keeps its tasks: the place of tasks is where work is found, never a source an entry points to (WAY-27). What it holds of the reasoning goes into the entry's *Rationale* and *Rejected*; *Origin* then reads `none`.”
- WAY-27 the way: „Nothing in this repository points to a source outside it that its readers cannot reach: every entry carries its whole reasoning, and what is seen only in such a source is described in the entry instead of being pointed to.”; jego *Verification* podaje jako naruszenie „*Origin* points to a private note”.
- Jedna decyzja (`foundations/decisions.md:998`) wskazuje w *Origin* obok notatki także plik `docs/task-cycles/styleguide-loop2/spec.md` na commicie `b0c4d44` repozytorium loop2 — to jest „file at a fixed commit”, które reguła dopuszcza.
- Notatki `zadanie_odtwarzanie_bazy_z_kopii_loop2.md` (2 wskazania) i `zadanie_loop2_lokalizacje_poza_repozytorium.md` (*Origin* D-362) jeszcze istnieją, ale ich zadania zamknięto 2026-11-11, więc znikną jak pozostałe.
- Cykl kopiuje dokument zadania do zapisu `docs/task-cycles/<nazwa>/task.md` w loop2; kopia znika z drzewa przy zamknięciu cyklu, ale zostaje w historii gita — takie kopie ma ponad 40 cykli (sprawdzone 2026-11-11).
- Niezmiennik `tracked-file-private-paths` (z PR #76) łapie tylko ścieżki bezwzględne i, w plikach Markdown, linki `…`; nazwy notatek w rodzaju `plomyk_loop2.md` przepuszcza.
- Historia gita loop2 zachowuje usunięte nazwy notatek.

### task.md:100-105 Decisions in play

## Decisions in play

- D-82 — „Test expectations may come from the loop2 foundation, accepted task documents in the folder that the entry `projects` under `loop2` in the locations file names, and in its `_zadania/` directory in state ready for cycle or completed, and the approved `definicja_mvp_loop2.md` there. The draft `koncepcja_projektowa.md` is a source only in a passage quoted by an accepted document; a test comment locating a documentary expectation names its file and line.” (`foundations/decisions.md:1546` na `952fbd0`). Zmiana, którą robi zadanie (pytanie 1a): oczekiwania testów pochodzą z fundamentu; informacja ważna dla kodu stoi w fundamencie, a komentarz testu nie wskazuje źródła oczekiwania. Jej *Rejected* „Foundation alone — forces every expected number into a decision” przestaje być drogą odrzuconą.
- D-362 — „loop2 names a place on the author's disk outside the repository, such as the folder of its projects in the notes and the list of its tasks, by the entry that stands for it under `loop2` in the locations file `~/.the-way/locations.json`, which are the entries `projects` and `tasks`, and no file git tracks holds an absolute path on that disk. A file may name a note and the folder it lies in within the notes, such as `Notes/Projects/(P) Loop/_zadania`, without a path on the disk.” (`foundations/decisions.md:8080` na `952fbd0`). Zmiana, którą robi zadanie (pytania 1, 1a i 2): drugie zdanie znika — żaden plik śledzony nie nazywa notatki ani jej katalogu w notatkach; *Rejected* D-362 „removing the names of the notes altogether — decisions lose the pointer to their reasoning […]” przestaje być drogą odrzuconą, bo uzasadnienie przechodzi do wpisów.
- D-80 — „A test of a game parameter, such as survival time, progress rate or map difficulty, may check calculations on concrete numbers, but takes its expectation from an agreed requirement. Current parameters or the simulation's current result are not themselves evidence of correctness.” (`foundations/decisions.md:1520`). Zadanie nie zmienia jej brzmienia; po zmianie D-82 uzgodnione wymaganie to wpis fundamentu.
- 301 decyzji, których *Origin* wskazuje notatkę z vaultu (`grep -n "in the vault" foundations/decisions.md` w liniach `- **Origin:**` na `952fbd0`): zadanie nie zmienia ich zdań wiążących, tylko *Rationale*, *Rejected* i *Origin*; przeniesienie uzasadnienia nie zmienia znaczenia decyzji.


## Current ranges (the plan's line numbers were written at the base; where they differ, these hold)

- `foundations/decisions.md:2534-2974` D-128 to D-149
- `foundations/decisions.md:1658-1672` D-82
- `foundations/decisions.md:8238-8252` D-362
- `foundations/decisions.md:8328-8339` D-368
- `foundations/decisions.md:1632-1644` D-80
- `foundations/decisions.md:1539-1551` D-73
- `foundations/invariants.md:1289-1298` invariant tracked-file-private-names
- `foundations/invariants.md:949-958` invariant action-duration-minimum

Foundation entries made before your slice, by identifier: D-82 and D-362 changed, D-368 new, the invariant `tracked-file-private-names` new and `action-duration-minimum` changed (commit ccc03bcf). Decisions and invariants are found by their heading; a range of an earlier slice's file may have moved.

## Additional instructions

- "Through the project skill `the-way-record-decision`" means doing the skill's steps for each entry — the
  reading of its `read.md`, the decision what the entry is, the draft, the write and the check — and the write
  is an edit of `foundations/decisions.md` made with your editor tool. Say in the report which steps you did.
  Do not edit anything but *Rationale*, *Rejected* and *Origin* lines (and their continuation lines) of the
  slice's decisions. Where a rejected way of a note cannot be placed against the decision's current binding
  sentence, carry it as the note states it and list it as a question; do not drop it.
- The orchestrator's mechanical check after your slice compares every decision of the repository before and after
  your commits: the part of each entry before *Rationale* (the *Origin* line excluded) must be unchanged, and
  only the slice's decisions may differ.

