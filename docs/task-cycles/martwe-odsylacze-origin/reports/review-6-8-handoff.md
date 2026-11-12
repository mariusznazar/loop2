# Handoff — review of slices 6–8 (`review-change`)

You review code (here: text of the foundation) that you did not write. The human who asked for this cycle
delegated intermediate choices to the orchestrator; you ask the human nothing. Questions go to the orchestrator
in your report. Read-only: you change no file in the worktree, you commit nothing, and you never open, commit,
stash or check out anything in the vault `the author's notes` or in `the local clone of the old game's repository`.

- Worktree (work from its root): `the repository root`, branch `task/martwe-odsylacze-origin`.
- Method: read `.the-way/task-cycle/review/SKILL.md` whole and the files it names when the step that names them comes.
  This is the review of a slice (here one review for the adjacent slices 6–8): the passages of the task are
  below, word for word; the executors' selection is each slice's *Read* in `docs/task-cycles/martwe-odsylacze-origin/plan.md`
  (headings `### Slice N`). Judge the slices against the passages of the task, not the plan alone.
- Range to review: `1879a6d9..7e3aa5e8` (compute `git diff 1879a6d9..7e3aa5e8` and `git log 1879a6d9..7e3aa5e8` yourself). Decisions of the range: D-73 to D-89 (slice 6, D-77 and D-82 not in it), D-93 to D-126 (slice 7), D-128 to D-149 (slice 8).
- Executors' reports (claims to verify, not evidence):
  - slice 6: `docs/task-cycles/martwe-odsylacze-origin/reports/slice-6-report.md`
  - slice 7: `docs/task-cycles/martwe-odsylacze-origin/reports/slice-7-report.md`
  - slice 8: `docs/task-cycles/martwe-odsylacze-origin/reports/slice-8-report.md`
- Private sources for your comparison: the snapshot `the private snapshot of the notes (not committed)/` (`MANIFEST.md`, `vault/`, `old-loop/`).
  The orchestrator already ran a mechanical check: the part of every decision before *Rationale* (the *Origin* line excluded) is
  unchanged, only the decisions of the slices differ, no *Origin* of the range names a note.
- The foundation: the decisions of the range, each whole, and the entries they link to as far as you need them; the rules of an entry
  in `.the-way/elements/decisions/template.md` and `.the-way/elements/common/rules.md`; WAY-27 in `.the-way/foundations/decisions.md`.

## What this change is for, and what to check (besides what `review-change` section 2 asks)

The task moves, into the *Rationale* and *Rejected* of each decision whose *Origin* named a note of the author's vault, **the whole
reasoning that note carries for that decision**, and sets *Origin* to `none`. The failure this change exists to remove is a lost
or invented reason. For **every** decision of the range (not a sample), open the passages of the notes its old *Origin* named
(`git show 1879a6d9:foundations/decisions.md` shows the old *Origin*) in the snapshot and check:

1. **Lost**: a reason, a rejected way with its reason, an accepted cost or a number that the note gives for this decision and the
   entry does not carry. The notes' parts about the process (who asked, in which task, what the human said) are not reasoning; what
   the product gains or pays is.
2. **Invented**: a reason, a rejected way or a number in the entry that no note passage gives and that the old entry did not
   already hold. (A clause the old entry held and no note repeats is kept, not invented; say if one looks wrong.)
3. **Contradiction**: an added sentence that contradicts the decision's binding sentence or a linked entry.
4. **Pointers and leaks**: any pointer to a note, task, question number, "the definition", "the task" or a place on a disk, and any
   secret, host address, account, e-mail address or personal fact.
5. **Shape**: *Origin* `none` (or only a loop2 file at a fixed commit); *Rationale* and *Rejected* in the decisions' template
   (no list of rejected ways written as a decision of the process).
Judge each of the questions the executors raised (carried below) yourself and say which way you hold right and why.

## Questions carried from the executors and the orchestrator

From the executors (their words are in the reports):
- Slice 6, D-73: only the departure that D-77 still states was carried (no configuration file limiting the whole run); D-77's binding sentence
  allows `npm test -- <test file>` while its note keeps a full run only. D-77 is outside the slices.
- Slice 6, D-88: the note holds only the open question of what replaces the hand-made document model in tests of screens moving to React;
  the answer (jsdom) is in D-264, a later slice. Only what the passage gives was written.
- Slice 6, D-89: Q10a (code that only passes data and decides nothing) carried into the Rationale because the Origin names it and no binding sentence carries it.
- Slice 7, D-122: two Rejected ways from a note's Q5 ("(pauza)" after the condition bar; no "(pauza)" at all) carried with no cost, said so in the entry.
- Slice 7, D-124: two notes disagree on the length of the first disabled "+ reguła" period (84 seconds vs 84 game minutes); no number written.
- Slice 7, D-120: the program editor offers a branch action only in the buying character's map run (from a note's Q3).
- Slice 7: the executor did not open `task.md` or `plan.md` (the handoff copies their passages).
- Slice 8: some existing Rejected ways have no basis in the named note passages (D-129, D-137, D-139, D-141) and were left in place.
- Slice 8: costs that describe a past state or a later task were not carried (listed in the slice report).
- Slice 8, D-140: "Rozbłysk as a stronger first Iskra" carried as the note states it; the executor could not place it against the binding sentence.
- Slice 8: the notes describe a status row, the entries say header and clock; only reasoning that holds for the header was carried.
- Slice 8, D-144: "the accepted branch data" of the old Origin read as the numbers of the note's Settlements rows.
From the orchestrator: the earlier review of slices 3–5 (`reports/review-3-5-report.md`) found two kinds of defect worth a look in your range too:
a note's reason that was given about a past state written as a present-tense fact of the log (check it against the later decisions of the foundation),
and the accepted costs of the chosen option left out while the rejected options keep theirs. Also: the earlier review held that "the MVP" must not
appear as a stage name in an added clause, and that "the definition" / "the task" are not to appear.


## Passages of the task (copied word for word)

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

### task.md:100-105 Decisions in play
## Decisions in play

- D-82 — „Test expectations may come from the loop2 foundation, accepted task documents in the folder that the entry `projects` under `loop2` in the locations file names, and in its `_zadania/` directory in state ready for cycle or completed, and the approved `definicja_mvp_loop2.md` there. The draft `koncepcja_projektowa.md` is a source only in a passage quoted by an accepted document; a test comment locating a documentary expectation names its file and line.” (`foundations/decisions.md:1546` na `952fbd0`). Zmiana, którą robi zadanie (pytanie 1a): oczekiwania testów pochodzą z fundamentu; informacja ważna dla kodu stoi w fundamencie, a komentarz testu nie wskazuje źródła oczekiwania. Jej *Rejected* „Foundation alone — forces every expected number into a decision” przestaje być drogą odrzuconą.
- D-362 — „loop2 names a place on the author's disk outside the repository, such as the folder of its projects in the notes and the list of its tasks, by the entry that stands for it under `loop2` in the locations file `~/.the-way/locations.json`, which are the entries `projects` and `tasks`, and no file git tracks holds an absolute path on that disk. A file may name a note and the folder it lies in within the notes, such as `Notes/Projects/(P) Loop/_zadania`, without a path on the disk.” (`foundations/decisions.md:8080` na `952fbd0`). Zmiana, którą robi zadanie (pytania 1, 1a i 2): drugie zdanie znika — żaden plik śledzony nie nazywa notatki ani jej katalogu w notatkach; *Rejected* D-362 „removing the names of the notes altogether — decisions lose the pointer to their reasoning […]” przestaje być drogą odrzuconą, bo uzasadnienie przechodzi do wpisów.
- D-80 — „A test of a game parameter, such as survival time, progress rate or map difficulty, may check calculations on concrete numbers, but takes its expectation from an agreed requirement. Current parameters or the simulation's current result are not themselves evidence of correctness.” (`foundations/decisions.md:1520`). Zadanie nie zmienia jej brzmienia; po zmianie D-82 uzgodnione wymaganie to wpis fundamentu.
- 301 decyzji, których *Origin* wskazuje notatkę z vaultu (`grep -n "in the vault" foundations/decisions.md` w liniach `- **Origin:**` na `952fbd0`): zadanie nie zmienia ich zdań wiążących, tylko *Rationale*, *Rejected* i *Origin*; przeniesienie uzasadnienia nie zmienia znaczenia decyzji.

## Report

Write your full report to `docs/task-cycles/martwe-odsylacze-origin/reports/review-6-8-report.md`. Its first line is `PASS <sha>` or
`FAIL <sha>` (the head you reviewed), then graded findings as `review-change` gives them — **each finding names the decision, quotes
the entry's words and the note passage's words, and says what is lost, invented or wrong** — then the checks you ran (command and
exit code), how many decisions you compared against a note passage (every one of the range), **Unread material** (what this handoff
names that stayed unread or was read in part, or `none`) and **Searches not found or unclear** (or `none`). Return: the first line,
the number of findings by grade, the report path.

## Note on the working tree

Another agent is committing to the same branch while you review (a fix of decisions D-03 and D-12, outside your range). Read the entries of the
range only from the commit you review — `git show 7e3aa5e8:foundations/decisions.md` and `git diff 1879a6d9..7e3aa5e8` — never from the working tree, and
write your `PASS`/`FAIL` line with `7e3aa5e8` as the sha.
