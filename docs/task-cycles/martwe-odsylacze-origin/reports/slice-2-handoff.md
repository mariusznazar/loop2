# Handoff — slice 2 (`make-change`, a slice, or the retry of a slice)

The human who asked for this cycle delegated intermediate choices to the orchestrator; you ask the
human nothing. Questions go to the orchestrator in your report (status `questions`). A value, count or
wording in the task or the plan may be wrong; if it does not survive your own check, say so in the
report instead of fitting your change to it.

- Worktree (work from its root): `the repository root`, branch
  `task/martwe-odsylacze-origin`. Slice base (`git rev-parse HEAD` when this handoff was written):
  `7a92118bfc6f207212f08ffe7ba358472323d6d5`; check that HEAD is still it and write it in your report. The worktree must be clean when you start.
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
- Report to `docs/task-cycles/martwe-odsylacze-origin/reports/slice-2-report.md`. Return: status
  (`done`, `done with concerns`, `questions`, `returned`, `reserved` or `blocked`), commits, a one-line check
  result naming what failed or did not run, and the report path. The report carries each check with its command
  and exit code, the own-work check, **Unread material** (what this handoff or the slice's *Read* names that
  stayed unread or was read in part, or `none`) and **Searches not found or unclear** (each thing looked
  for and not found or unclear, or `none`), and the one line per changed entry or comment that the slice asks.

## The slice (copied word for word from `plan.md`)

### Slice 2 — styleguide and token sources name no task

- **Goal:** `guidelines/styleguide-browser-view.md` and `src/browser/tokens.css` name no task and no note. In the styleguide, the sentence before the list of source kinds (lines 333–335 at the base) names no task, no note and no question numbers; in the list (lines 336–352) "wybór Mariusza z tego podglądu, z nazwą zadania i datą wyboru" becomes Mariusz's choice from the preview with the date of the choice, and "ustalenie zadania" becomes Mariusz's choice with its date; any other pointer to a task in the file, such as "do zadania 24" at line 112, is rewritten so that it names no task while its meaning stays; what of the note is important to keep stands in the styleguide or is already in the foundation. In `src/browser/tokens.css` the header (lines 1–7) names no task, no note and no Q-numbers; each of the 55 `Source:` comments that names the task — "(the task, Q…)", "settled in the task, Q…", "the weight … settled in the task" — keeps its source by the kinds of the changed list: the running loop with its date of reading, the threshold of D-42, Mariusz's choice from the preview with its date, Mariusz's choice with its date; the three comments that name a file of the old Loop's repository at commit `cdc7c0d` keep what they say of loop's value without that file. Every declaration keeps a non-empty `Source:` comment after its `;` (invariant `design-token-sources`); no value changes. The date of each choice is the date the note's answer gives (styleguide note, questions Q9–Q11 and Q19), read from `the private snapshot of the notes (not committed)/vault/`; where the note gives no date, that is a question to the orchestrator, not a date taken from elsewhere.
- **Change:** `guidelines/styleguide-browser-view.md` · `src/browser/tokens.css`
- **Read:** `docs/task-cycles/martwe-odsylacze-origin/task.md:29-40` To do · `docs/task-cycles/martwe-odsylacze-origin/task.md:75-79` Questions to settle, Pytanie 5 · `foundations/invariants.md:489-498` design-token-sources · `foundations/decisions.md:838-1002` D-38 to D-48 · `src/browser/AGENTS.md` · `guidelines/coding.md` · `tests/invariants/test_design_token_sources.py` · Foundation entries row 2 (D-362 as changed) · the styleguide note's questions Q9–Q11 and Q19 in the snapshot of private sources (outside the measure)
- **Model:** cheaper
- **Risk:** none
- **Checks:** `npm test -- tests/invariants/test_design_token_sources.py` · `npm test -- tests/invariants/test_browser_view_token_values.py` · `npm test -- tests/invariants/test_design_token_contrast.py` · `node node_modules/prettier/bin/prettier.cjs --check --no-config --no-editorconfig src/browser/tokens.css` · `python -B .the-way/elements/common/foundation_check.py` exits 0 · `python -B .the-way/task-cycle/tracked_private_paths_check.py tracked-file-private-paths` lists nothing · `git grep -nIE 'the task|Q[0-9]+|styleguide_loop2|in the vault|w vaulcie|Notes/Projects|cdc7c0d|loop repository|zadani[aeu]' -- src/browser/tokens.css guidelines/styleguide-browser-view.md` prints only lines whose word "zadanie" names no task (each listed in the report with why)
- **Depends on:** Foundation entries row 2


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

### task.md:75-79 Questions to settle, Pytanie 5

- Pytanie 5: Czy źródło wartości w pliku tokenów może nazywać zadanie — rodzaje „wybór Mariusza z tego podglądu, z nazwą zadania i datą wyboru” i „ustalenie zadania” w `guidelines/styleguide-browser-view.md:344-351`?
  - Answer: nie (A): źródło mówi tylko, skąd wartość pochodzi — strona gry loop z datą odczytu, próg z D-42, wybór Mariusza z podglądu z datą; „ustalenie zadania” staje się wyborem Mariusza z datą.
  - Not chosen:
    - B. nazwa zadania z datą zostaje, znika tylko wskazanie numerów pytań „(the task, Q9)” — komentarz dalej odsyła do zadania, do którego czytelnik nie sięga.
  - Source: Mariusz, 2026-11-11: „A” — na pytanie „czy źródło wartości w pliku tokenów może nazywać zadanie?”


## Current ranges (the plan's line numbers were written at the base; where they differ, these hold)

- `foundations/decisions.md:838-1002` D-38 to D-48
- `foundations/decisions.md:1546-1560` D-82
- `foundations/decisions.md:8105-8119` D-362
- `foundations/decisions.md:8195-8206` D-368
- `foundations/decisions.md:1520-1532` D-80
- `foundations/decisions.md:1427-1439` D-73
- `foundations/invariants.md:1289-1298` invariant tracked-file-private-names
- `foundations/invariants.md:949-958` invariant action-duration-minimum

Foundation entries made before your slice, by identifier: D-82 and D-362 changed, D-368 new, the invariant `tracked-file-private-names` new and `action-duration-minimum` changed (commit ccc03bcf). Decisions and invariants are found by their heading; a range of an earlier slice's file may have moved.
