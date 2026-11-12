# Handoff — review of slices 3–5 (`review-change`)

You review code (here: text of the foundation) that you did not write. The human who asked for this cycle
delegated intermediate choices to the orchestrator; you ask the human nothing. Questions go to the orchestrator
in your report. Read-only: you change no file in the worktree, you commit nothing, and you never open, commit,
stash or check out anything in the vault `the author's notes` or in `the local clone of the old game's repository`.

- Worktree (work from its root): `the repository root`, branch `task/martwe-odsylacze-origin`.
- Method: read `.the-way/task-cycle/review/SKILL.md` whole and the files it names when the step that names them comes.
  This is the review of a slice (here one review for the adjacent slices 3–5): the passages of the task are
  below, word for word; the executors' selection is each slice's *Read* in `docs/task-cycles/martwe-odsylacze-origin/plan.md`
  (headings `### Slice N`). Judge the slices against the passages of the task, not the plan alone.
- Range to review: `4605f7e2..1879a6d9` (compute `git diff 4605f7e2..1879a6d9` and `git log 4605f7e2..1879a6d9` yourself). Decisions of the range: D-03 to D-27 (slice 3), D-38 to D-55 (slice 4), D-57 to D-71 (slice 5).
- Executors' reports (claims to verify, not evidence):
  - slice 3: `docs/task-cycles/martwe-odsylacze-origin/reports/slice-3-report.md`
  - slice 4: `docs/task-cycles/martwe-odsylacze-origin/reports/slice-4-report.md`
  - slice 5: `docs/task-cycles/martwe-odsylacze-origin/reports/slice-5-report.md`
- Private sources for your comparison: the snapshot `the private snapshot of the notes (not committed)/` (`MANIFEST.md`, `vault/`, `old-loop/`).
  The orchestrator already ran a mechanical check: the part of every decision before *Rationale* (the *Origin* line excluded) is
  unchanged, only the decisions of the slices differ, no *Origin* of the range names a note.
- The foundation: the decisions of the range, each whole, and the entries they link to as far as you need them; the rules of an entry
  in `.the-way/elements/decisions/template.md` and `.the-way/elements/common/rules.md`; WAY-27 in `.the-way/foundations/decisions.md`.

## What this change is for, and what to check (besides what `review-change` section 2 asks)

The task moves, into the *Rationale* and *Rejected* of each decision whose *Origin* named a note of the author's vault, **the whole
reasoning that note carries for that decision**, and sets *Origin* to `none`. The failure this change exists to remove is a lost
or invented reason. For **every** decision of the range (not a sample), open the passages of the notes its old *Origin* named
(`git show 4605f7e2:foundations/decisions.md` shows the old *Origin*) in the snapshot and check:

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
- Slice 3, D-27: the MVP2 definition rejects "credits open in a footer of every screen"; the executor did not carry it because
  the binding sentence puts credits in the game's footer and in a folded section of the login card, and it is unclear whether the
  footer is folded. The rule of the task: a rejected way of a note is carried, not dropped. Decide whether it should be carried and how.
- Slice 3, D-03: the old "lit-html — templates not checked by types" was kept beside the technology note's own facts, although the note says
  lit-html's types are in the package. Decide whether the old clause is wrong against the note and must change.
- Slice 3, D-03: the human's reason for choosing React over Preact (MVP2 definition, Technology section) is not carried because the old *Origin*
  did not name that section. Decide whether a note the old *Origin* names but not that section holds reasoning for D-03 that should be carried.
- Slice 4, D-44: ways the notes did not choose are left out because they belong to other decisions' binding sentences.
- Slice 4, D-40: two *Rejected* items restate process costs of the notes in product terms; decide whether they are reasoning of the product or of the process.
- Slice 4: the spec at `b0c4d44` named by D-48's *Origin* was not opened by the executor (D-48 keeps that pointer, which the rule allows).
- Slice 5, D-64: "The MVP definition" / "the definition" were replaced by "the scope accepted for the first version of the game".
- Slice 5: several old *Rejected* clauses are not in any note's "Not chosen" (the notes name only the chosen way); the executor left them in place.
- Slice 5, D-70: a later note changed the campfire icons from one to two; the entry follows the later note.
From the orchestrator: slices 3–5 were done by executors who edited `foundations/decisions.md` directly (the skill's write is an edit); slices 4 and 5
were told what "through the skill" means. Report whether any entry shows a skipped step of `the-way-record-decision`'s reading (`read.md`) that matters.


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

Write your full report to `docs/task-cycles/martwe-odsylacze-origin/reports/review-3-5-report.md`. Its first line is `PASS <sha>` or
`FAIL <sha>` (the head you reviewed), then graded findings as `review-change` gives them — **each finding names the decision, quotes
the entry's words and the note passage's words, and says what is lost, invented or wrong** — then the checks you ran (command and
exit code), how many decisions you compared against a note passage (every one of the range), **Unread material** (what this handoff
names that stayed unread or was read in part, or `none`) and **Searches not found or unclear** (or `none`). Return: the first line,
the number of findings by grade, the report path.

## Note on the working tree

Another executor may be committing to the same branch while you review. Read the entries of the range only from the commit you
review — `git show 1879a6d9:foundations/decisions.md` (and `git diff 4605f7e2..1879a6d9`) — never from the working tree, and
write your `PASS`/`FAIL` line with `1879a6d9` as the sha.
