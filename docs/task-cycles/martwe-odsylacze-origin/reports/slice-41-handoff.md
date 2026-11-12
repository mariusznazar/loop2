# Handoff — slice 41 (`make-change`, a slice, or the retry of a slice)

The human who asked for this cycle delegated intermediate choices to the orchestrator; you ask the
human nothing. Questions go to the orchestrator in your report (status `questions`). A value, count or
wording in the task or the plan may be wrong; if it does not survive your own check, say so in the
report instead of fitting your change to it.

- Worktree (work from its root): `the repository root`, branch
  `task/martwe-odsylacze-origin`. Slice base (`git rev-parse HEAD` when this handoff was written):
  `e3bfa3a389a808405d30bfc102030951b5852b71`; check that HEAD is still it and write it in your report. The worktree must be clean when you start.
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
- Report to `docs/task-cycles/martwe-odsylacze-origin/reports/slice-41-report.md`. Return: status
  (`done`, `done with concerns`, `questions`, `returned`, `reserved` or `blocked`), commits, a one-line check
  result naming what failed or did not run, and the report path. The report carries each check with its command
  and exit code, the own-work check, **Unread material** (what this handoff or the slice's *Read* names that
  stayed unread or was read in part, or `none`) and **Searches not found or unclear** (each thing looked
  for and not found or unclear, or `none`), and the one line per changed entry or comment that the slice asks.

## The slice (copied word for word from `plan.md`)

### Slice 41 — reasoning of D-132, D-271, D-315 and D-316 after the second merge (added by the orchestrator)

- **Goal:** D-132, D-271, D-315 and D-316 were rewritten by Slices 3–35 and again changed by `origin/main`; at the second merge (`688a16be`) the *Rationale* (and for D-271, D-315, D-316 the *Rejected*) of `main` was taken whole, so the reasoning the branch had moved from the notes is missing while their *Origin* reads `none`. Each of the four carries again in its *Rationale* and *Rejected* the reasoning that `main`'s present entry holds plus the whole reasoning that the notes hold for it that is still true at the head, and its *Origin* reads `none`. What the branch had carried is in `git show 9c65ad24:foundations/decisions.md` (the entries before the second merge; mind that D-374…D-386 were D-372…D-384 there) and the sentences the merge dropped are listed in `docs/task-cycles/martwe-odsylacze-origin/reports/merge-2-report.md` (\"Decisions where I took main's Rationale/Rejected whole\"); `main`'s changes are in `git diff 4660e14a origin/main -- foundations/decisions.md`. Carry both where true at the head: a sentence about a layout, a placement or a name that `main` has changed (the end of a map run has its own window, the screen has two columns) is written in the past tense as the premise of the choice or left out; a reason of task order, of the readiness of a definition or a pointer to one is not carried; do not write \"the MVP\", \"the definition\", \"the task\", \"the change\" or \"the preview\" as an authority or reason. Its question, binding sentences, *Scope*, *Based on*, *Relations* and *Verification* stay as `main` has them. Each entry is changed through the project skill `the-way-record-decision`. Read the notes from the snapshot `the private snapshot of the notes (not committed)/vault/`: the passage the old *Origin* named (see `git show 4660e14a:foundations/decisions.md` for the old *Origin* of each) and what it refers to onward. Nothing an entry gains names a note, a task, a To do item or a question or decision number of a task document or of the concept, a path on a disk, or a copy of a task document in loop2's history; no secret, host address, account, e-mail address or personal fact of a note enters an entry. A reason the note does not give is not added. The report gives one line per decision: what moved, from which passage.
- **Change:** `foundations/decisions.md`
- **Read:** `docs/task-cycles/martwe-odsylacze-origin/task.md:17-27` Need · `docs/task-cycles/martwe-odsylacze-origin/task.md:29-40` To do · `docs/task-cycles/martwe-odsylacze-origin/task.md:50-57` Questions to settle, Pytanie 1a · `docs/task-cycles/martwe-odsylacze-origin/task.md:107-115` Settlements to record · D-80, D-82 as changed, D-362 as changed and the invariant `tracked-file-private-names` (foundation entries) · the cycle's record, `cycle.md` question Q9 · `.claude/skills/the-way-record-decision/SKILL.md` · `.the-way/elements/decisions/skill/SKILL.md` · `.the-way/elements/decisions/skill/read.md` · `.the-way/elements/decisions/skill/decide_entry.md` · `.the-way/elements/decisions/template.md` · `.the-way/elements/common/rules.md` · `guidelines/testing.md` · `guidelines/coding.md` · `.claude/skills/the-way-record-environment-fact/SKILL.md` · `src/browser/AGENTS.md` · `guidelines/styleguide-browser-view.md`
- **Model:** same
- **Risk:** none
- **Checks:** `python -B .the-way/elements/common/foundation_check.py` exits 0 · `git grep -nIE 'in the vault|_loop2\.md|koncepcja_|rozpoznanie_|technologia_|zadanie_|Notes/Projects|_zadania' -- foundations/decisions.md` prints no line inside the slice's decisions · `git diff <the slice's base> -- foundations/decisions.md`, read whole: every changed line is a *Rationale*, *Rejected* or *Origin* line, or a line continuing one, of one of the slice's decisions
- **Depends on:** Slice 40


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
- `foundations/decisions.md:8882-8896` D-362
- `foundations/decisions.md:8972-8986` D-368
- `foundations/decisions.md:1651-1663` D-80
- `foundations/decisions.md:1558-1570` D-73
- `foundations/invariants.md:1288-1297` invariant tracked-file-private-names
- `foundations/invariants.md:948-957` invariant action-duration-minimum

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
- Lessons of the reviews of earlier slices of this task (they apply to you): (1) carry the accepted costs of the option chosen, not only the
  costs of the rejected ones; (2) a reason a note gave about a past state ("today the server holds nothing…") is written as the premise the
  choice was made on, in the past tense, checked against the later decisions of the foundation — never as a present-tense fact;
  (3) do not write "the MVP", "the definition" or "the task" in added text — say what the scope fixes; (4) when you carry a figure or a fact
  about the product's state, check it against the note once more and against the other entries it touches; (5) a clause that you add
  must be traceable to a note passage you can name in the report's one line per decision.
  (6) A note passage that carries a projected entry often has its own *Origin* line pointing on to another document of the snapshot (the
  project concept `koncepcja_projektowa.md`, a section, a numbered decision "D25"). That onward passage is part of "what the passage refers to":
  read it and carry its reasoning — the accepted costs, the measured numbers, the reasons — into the decision, as you carry the note's own. Say in
  the report, per decision, which onward passages you read.
  (7) Between the time this change was planned and now, `origin/main` has moved and will be merged into the branch; do not rely on a text of a
  decision that you have read in the plan, read the decision itself at the head, and write only what is true of the product at the head.
- From the review of the second merge: for D-315 restore nothing from the merge report's list of lost sentences (main replaced that text on purpose: the night/dawn wording is superseded by main's tint — keep main's reasoning and add only what the notes hold that is still true at the head). In D-132 *Rejected* the branch's item 'while the end had no place of its own' describes a past state: the end now has its own window (D-368) — write it as the premise of the choice or leave it out.

