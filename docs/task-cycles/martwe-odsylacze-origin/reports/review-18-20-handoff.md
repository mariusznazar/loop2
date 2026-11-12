# Handoff — review of slices 18–20 (`review-change`)

You review code (here: text of the foundation) that you did not write. The human who asked for this cycle
delegated intermediate choices to the orchestrator; you ask the human nothing. Questions go to the orchestrator
in your report. Read-only: you change no file in the worktree, you commit nothing, and you never open, commit,
stash or check out anything in the vault `the author's notes` or in `the local clone of the old game's repository`.

- Worktree (work from its root): `the repository root`, branch `task/martwe-odsylacze-origin`.
- Method: read `.the-way/task-cycle/review/SKILL.md` whole and the files it names when the step that names them comes.
  This is the review of a slice (here one review for the adjacent slices 18–20): the passages of the task are
  below, word for word; the executors' selection is each slice's *Read* in `docs/task-cycles/martwe-odsylacze-origin/plan.md`
  (headings `### Slice N`). Judge the slices against the passages of the task, not the plan alone.
- Range to review: `769f5e24..9d6316c3` (compute `git diff 769f5e24..9d6316c3` and `git log 769f5e24..9d6316c3` yourself). Decisions of the range: D-323 to D-332 (slice 18), D-334 to D-349 (slice 19), D-351 to D-363 without D-362 (slice 20).
- Executors' reports (claims to verify, not evidence):
  - slice 18: `docs/task-cycles/martwe-odsylacze-origin/reports/slice-18-report.md`
  - slice 19: `docs/task-cycles/martwe-odsylacze-origin/reports/slice-19-report.md`
  - slice 20: `docs/task-cycles/martwe-odsylacze-origin/reports/slice-20-report.md`
- Private sources for your comparison: the snapshot `the private snapshot of the notes (not committed)/` (`MANIFEST.md`, `vault/`, `old-loop/`).
  The orchestrator already ran a mechanical check: the part of every decision before *Rationale* (the *Origin* line excluded) is
  unchanged, only the decisions of the slices differ, no *Origin* of the range names a note.
- The foundation: the decisions of the range, each whole, and the entries they link to as far as you need them; the rules of an entry
  in `.the-way/elements/decisions/template.md` and `.the-way/elements/common/rules.md`; WAY-27 in `.the-way/foundations/decisions.md`.

## What this change is for, and what to check (besides what `review-change` section 2 asks)

The task moves, into the *Rationale* and *Rejected* of each decision whose *Origin* named a note of the author's vault, **the whole
reasoning that note carries for that decision**, and sets *Origin* to `none`. The failure this change exists to remove is a lost
or invented reason. For **every** decision of the range (not a sample), open the passages of the notes its old *Origin* named
(`git show 769f5e24:foundations/decisions.md` shows the old *Origin*) in the snapshot and check:

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
- Slice 18: the onward passage of the scouting report `rozpoznanie_weteran.md` was carried in a second commit (`ce206f62`) into D-323, D-325, D-326, D-327, D-330; "the first completion pays loot only once" and "Las — głębiej without the chest gave 0 of 300" not carried (no conditions given, D-189 words the loot payout differently at the head);
  the report attributes the empty-places rule to the old game's "D13", which the project concept's D13 does not match; `rozpoznanie_frajda`, `rozpoznanie_material`, `zlecenia_profili`, `reguly_awarii_i_logow_loop2`, `technologia_zapis_dzialania_gry` not opened; the sentence in D-323 about a game built after the error has no source in the note.
- Slice 19: D-349 rejected way A (scene at 336 × 152 px) carries the owner's verdict and proposal and not "a program too narrow to write in" (the figures 510/606 px against 526/622 px are nearly equal); D-339 says the chronicle's size was "never measured" while the research report D-347 names measured it (median 48 entries, maximum 102, about 8 KB) — D-339's *Origin* did not name that report, left unchanged;
  D-348's origin passage holds two questions with no answers, only the premise was added; D-347 *Rejected* gained "the save read as a document" and "the map run recounted in Node" (weighed without a verdict in the research); the server's output and the server's own route for reports not carried (D-355 and D-356 took them); the old game's code files for the chronicle and the "Teraz" row are not in the snapshot.
- Slice 20: D-362 untouched (done by the Foundation entries step and the merge); D-355's "probable conflict with D-347" for Grafana Cloud left out (D-347 was narrowed to the browser); the note's "nor by the comparison of installed copies" in D-356 left out (the deploy script now compares the installed copies); the "208–304 px" column width in D-363 not confirmed at the head, not carried;
  several clauses already in the entries that no note passage read supports were left in place (listed in the report); two technology reports were read from the main checkout's `.runs/technology` outside the snapshot.
From the orchestrator: your range also contains commits that other reviews already accepted (the fix `0822d4b2`, which changes D-311–D-316); you judge only the decisions listed.
Earlier reviews found defects of these kinds in other ranges — check for them in yours: a note's statement about a past state written as a present-tense fact of the log (check it against the later decisions and the code); the accepted costs of the chosen option left out while the rejected options keep theirs; "the MVP", "the definition", "the task", "the change", "the approved project definition" or "the concept of the game" as an authority or a reason;
an invented reason for a rejected way that the note's own figures contradict; a claim attributed to a decision that does not make it; a cost written as to build that has been built; reasoning that the notes point on to the project concept (`koncepcja_projektowa.md`) or to a scouting report left behind when the pointer was cut; a sentence true of a layout or a placement that `main` has since changed (two columns on the map-run screen and no right area; credits fold into Siedziba; the end of a map run has its own window).


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

Write your full report to `docs/task-cycles/martwe-odsylacze-origin/reports/review-18-20-report.md`. Its first line is `PASS <sha>` or
`FAIL <sha>` (the head you reviewed), then graded findings as `review-change` gives them — **each finding names the decision, quotes
the entry's words and the note passage's words, and says what is lost, invented or wrong** — then the checks you ran (command and
exit code), how many decisions you compared against a note passage (every one of the range), **Unread material** (what this handoff
names that stayed unread or was read in part, or `none`) and **Searches not found or unclear** (or `none`). Return: the first line,
the number of findings by grade, the report path.

## Note on the working tree

Another agent is committing to the same branch while you review (decisions outside your range). Read the entries of the range only from the commit you review — `git show 9d6316c3:foundations/decisions.md` and
`git diff 769f5e24..9d6316c3` (old state: `git show 769f5e24:foundations/decisions.md`) — never from the working tree, and write your `PASS`/`FAIL` line with `9d6316c3` as the sha. Put scratch files in a new directory of your own under the session scratchpad.
