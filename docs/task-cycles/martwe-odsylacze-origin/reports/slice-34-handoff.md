# Handoff — slice 34 (`make-change`, a slice, or the retry of a slice)

The human who asked for this cycle delegated intermediate choices to the orchestrator; you ask the
human nothing. Questions go to the orchestrator in your report (status `questions`). A value, count or
wording in the task or the plan may be wrong; if it does not survive your own check, say so in the
report instead of fitting your change to it.

- Worktree (work from its root): `the repository root`, branch
  `task/martwe-odsylacze-origin`. Slice base (`git rev-parse HEAD` when this handoff was written):
  `ff93642b61d79c1276c724d9444f470780c1d41f`; check that HEAD is still it and write it in your report. The worktree must be clean when you start.
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
- Report to `docs/task-cycles/martwe-odsylacze-origin/reports/slice-34-report.md`. Return: status
  (`done`, `done with concerns`, `questions`, `returned`, `reserved` or `blocked`), commits, a one-line check
  result naming what failed or did not run, and the report path. The report carries each check with its command
  and exit code, the own-work check, **Unread material** (what this handoff or the slice's *Read* names that
  stayed unread or was read in part, or `none`) and **Searches not found or unclear** (each thing looked
  for and not found or unclear, or `none`), and the one line per changed entry or comment that the slice asks.

## The slice (copied word for word from `plan.md`)

### Slice 34 — the Pixel Crawler terms from a place readers reach

- **Goal:** The *Source* of the environment fact `pixel-crawler-terms` points to the terms of the Pixel Crawler pack in a place a reader of the public repository reaches — the pack's public page by its author, or an archived copy of it — with the quotes of the four points the fact rests on and the date of reading, written through the project skill `the-way-record-environment-fact`; the fact's sentence stays. Where the reachable terms say something other than the four quoted points, or no such place is found, change nothing and return `blocked` with each place searched and what it held, for the orchestrator to ask Mariusz (task To do 9); never take the terms from memory or from the old Loop's private repository.
- **Change:** `foundations/environment_facts.md`
- **Read:** `docs/task-cycles/martwe-odsylacze-origin/task.md:29-40` To do · `docs/task-cycles/martwe-odsylacze-origin/task.md:81-90` Context · `foundations/environment_facts.md:642-647` pixel-crawler-terms · `foundations/decisions.md:5696-5742` D-271 · `foundations/invariants.md:1289-1298` sprite-credits · Foundation entries row 2 (D-362 as changed) · `.claude/skills/the-way-record-environment-fact/SKILL.md` · `.the-way/elements/environment-facts/skill/SKILL.md` · `.the-way/elements/environment-facts/skill/read.md` · `.the-way/elements/environment-facts/skill/decide_entry.md` · `.the-way/elements/environment-facts/skill/draft.md` · `.the-way/elements/environment-facts/skill/write.md` · `.the-way/elements/environment-facts/template.md` · `.the-way/elements/common/rules.md` · `.the-way/elements/common/way_of_working.md` · `.the-way/task-cycle/skill/foundation_step.md`
- **Model:** cheaper
- **Risk:** none
- **Checks:** `python -B .the-way/elements/common/foundation_check.py` exits 0 · `npm test -- tests/invariants/test_icon_credits.py` · `python -B .the-way/task-cycle/tracked_private_paths_check.py tracked-file-private-paths` lists nothing · whole-repository S1: `git grep -nIE '[a-z0-9_]+_loop2\.md|koncepcja_[a-z_]+\.md|rozpoznanie_[a-z_]+\.md|technologia_[a-z_]+\.md|zadanie_[a-z0-9_]+\.md|research_[a-z_]+\.md|in the vault|w vaulcie|Notes/Projects|_zadania|mariusznazar/loop/|cdc7c0d|8072ce6|loop repository|old Loop repository|loop .[A-Za-z/._-]+\.tsx?:|(^|[^/a-z])src/(sim|components)/|[a-z-]+\.test\.ts\b' -- . ':(exclude).the-way'` prints no line (exit 1)
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


## Current ranges (the plan's line numbers were written at the base; where they differ, these hold)

- `foundations/decisions.md:6146-6193` D-271
- `foundations/decisions.md:1677-1691` D-82
- `foundations/decisions.md:8825-8839` D-362
- `foundations/decisions.md:8915-8929` D-368
- `foundations/decisions.md:1651-1663` D-80
- `foundations/decisions.md:1558-1570` D-73
- `foundations/invariants.md:1288-1297` invariant tracked-file-private-names
- `foundations/invariants.md:948-957` invariant action-duration-minimum

Foundation entries made before your slice, by identifier: D-82 and D-362 changed, D-368 new, the invariant `tracked-file-private-names` new and `action-duration-minimum` changed (commit ccc03bcf). Decisions and invariants are found by their heading; a range of an earlier slice's file may have moved.

## Additional instructions

- Web access and privacy: you may read public pages with the WebFetch tool or `curl` only. Put no data of the repository's owner, of the author of the notes, of this machine or of this cycle in any request — no name, e-mail address, user name, path, repository address or task name in a URL, parameter, header or body; any `User-Agent` is generic (`research-agent/1.0`). Do not use a logged-in tool (`gh`, an MCP connected to an account, `git` with a credential helper) and do not clone anything; if a page cannot be fetched without logging in, write "not fetched" in the report. The pack is "Pixel Crawler" by Anokolisa (the pack's name and author appear in the fact and in `assets/sprites/` credits; read `foundations/environment_facts.md` `pixel-crawler-terms`, `smoke-fire-particle-licence`, D-271 and the footer credits to see how the pack is named and from where it was taken); search for its public page (the creator's page on itch.io or on another store) and read the terms there; the snapshot `the private snapshot of the notes (not committed)/old-loop/8072ce6/assets/pixel-crawler/Terms.txt` holds the terms file of the old private repository as the author's source — compare the page's terms with it, but the *Source* you write points only to the public place (with the date you read it), never to the old repository.
- If the public page carries the four points the fact rests on ("It is not necessary to credit…", "The arts present can be altered…", "These arts cannot be sold as a final product…", "You can use these assets in creating commercial products…") in the same sense, write them as the *Source* with quotes and the date of reading (2026-11-12). If it says something other, or no public place states the terms, change nothing and return `blocked` with each place searched and what it held (the orchestrator then asks the human).

