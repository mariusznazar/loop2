# Handoff - reviewer of slice(s) 7 of the task `zapas-i-wskrzeszenie`

The person who requested the cycle has delegated intermediate choices to the orchestrator; no answer you get is that person's approval. Your reply goes to the orchestrator only.

## Where and what

- Worktree (work from its root, never from the main checkout): `the root of the task's worktree`, branch `task/zapas-i-wskrzeszenie`. The pinned the-way stands in `.the-way` there. Dependencies are installed (`npm ci` ran).
- Your method: `.the-way/task-cycle/review/SKILL.md` by its path in the worktree's `.the-way`; read it whole, and a file it names only when the step or variant that names it comes. Do not call a skill. Your variant: "a planned slice, the whole change, ... (the review of the range below)".
- Your stage and its boundary: Review the range below with `review-change`. Read-only: change no file of the repository.
- Base of the range: `20e6eaab`.
- Frozen task: `.runs/task-cycles/zapas-i-wskrzeszenie/task.md` (the passages your section needs are copied below; read the rest of it only if a passage sends you to it). Plan: `.runs/task-cycles/zapas-i-wskrzeszenie/plan.md` (its other slices are not yours). Spec: none.
- Answers of step 4 of the cycle: trust boundary - **yes** (`src/browser/sim/saved-game.ts`: the saved shape of the team's resurrection and the load's checks; check crafted input there: counts above the data's, negative or non-finite numbers, a moment standing with no use spent or missing with some spent, wrong types); irreversible operation - **no**. No open design choice; no reserved choice. The pin of the-way is not moved.
- Your directory for working copies: `.runs/review-s07/` (directly under the ignored `.runs/` of the worktree).
- Your report: `.runs/task-cycles/zapas-i-wskrzeszenie/reports/review-s07-report.md`. The report file is the input of the cycle's scripts (`task-cycle/remarks_check.py` reads it), the case the harness's note about files named `report...` leaves open. Where you are refused the write all the same, return the report whole as your answer. Its first line is yours as your method gives it; it holds besides what your method gives **Unread material** (what this handoff names that stayed unread or was read in part, or `none`) and **Searches not found or unclear** (each thing looked for and not found or unclear, or `none`).
- `cycle.md` and the other files of the cycle's record directory - other agents' handoffs, reports and findings - are not yours to read unless this handoff names them.
- Other tools of the cycle: the product's guidelines say tests run as `npm test -- <one test file>`; never run `npm test` bare.

Working copies - copied word for word from the cycle:

> An agent of the cycle that makes a working copy to check something — a worktree of a commit, a clone, a script, a screenshot, a prepared input of a test — makes it in a directory of its own directly under the ignored `.runs/` of the task's worktree, the directory its handoff names; never in the system's temporary directory, in the scratch directory of a session or in the main checkout of the repository. The screenshot that a screenshot tool, such as the Playwright server, saves by itself under its session's directory is moved into the agent's directory and the original removed, except a screenshot that is shown to the human: that one goes where `task-cycle/change/ui_check.md` says, to the place the product's foundation settles for screenshots, and into the agent's directory only where no such place is settled. The files that a product's own tools and tests make by themselves are no working copy of the agent and stay outside this rule. Before the agent returns, each time it returns, it removes its copy — a worktree with `git worktree remove --force`, then `git worktree prune` — keeps in `reports/` beside its report what the report needs, and states in the report where each copy stood and that it was removed. Where a removal fails, the agent finishes all the same and names in the report the remainder, with its full path and the reason it stayed. It removes a copy, as any directory, by its path written out in full in the command, never through a shell variable: an empty variable turns the removal on the directory the shell stands in.

## The slice (copied word for word from the plan)

### Slice 7 — The tests of the load hold the shape of version 8

- **Goal:** `tests/sim/saved-game.test.mjs` holds the document of version 8, every optional branch
  filled with the team's uses spent and the moment of the next return, loading into the state it
  describes; the document of version 7 is kept and refused as another version; and crafted documents
  of version 8 are refused whole as `shape`: a count of uses spent that is no whole number from 0,
  above the data's count, a moment that stands with none spent or is missing with some spent, a
  moment that is no safe integer, the old key `resurrectionReadyAtMs`, and the settlement of a death
  that spent a use with its uses left missing, out of range or above the data's count (question 15,
  `guidelines/coding-saved-game.md`). Where a case shows the load of Slice 6 admitting what it
  should refuse, fix `saved-game.ts` in this slice and say so. Each `decision:` line quoting a
  sentence Slice 1 rewrote quotes it as it stands now.
- **Change:** `tests/sim/saved-game.test.mjs` · `src/browser/sim/saved-game.ts`
- **Read:** `guidelines/coding.md` · `guidelines/testing.md` · `guidelines/coding-saved-game.md` ·
  `src/browser/sim/types.ts` · `src/browser/sim/data/balance.ts` ·
  `.runs/task-cycles/zapas-i-wskrzeszenie/task.md:31-31` To do (item 3) ·
  `.runs/task-cycles/zapas-i-wskrzeszenie/task.md:142-147` Questions to settle (question 15) ·
  `.runs/task-cycles/zapas-i-wskrzeszenie/task.md:165-165` Context · Foundation entries row D-190 · row
  D-214 · row solved-map-manual-run · `foundations/decisions.md:3888-3932` D-206 ·
  `foundations/decisions.md:4231-4245` D-386 · `foundations/invariants.md:1048-1057` save-version ·
  `foundations/part_map.md:33-64` simulation
- **Model:** cheaper
- **Risk:** trust boundary — `src/browser/sim/saved-game.ts`, the refusals of a crafted document of
  the new shape
- **Checks:** `npm test -- tests/sim/saved-game.test.mjs` · `npm test -- tests/sim/team.test.mjs`
- **Depends on:** Slice 6

## The plan's table of foundation entries (copied; 'Foundation entries row X' in the slice means this table's row X)

## Foundation entries

| Entry | Kind | From | What depends on it |
|---|---|---|---|
| (new) — May the progression require the player's absence? | decision, new | projected entry of the definition carried by the task ("Decisions in play", "Zadanie zapisuje"); To do 7; plan item `zapas-i-wskrzeszenie` | written by Slice 1; Slices 3, 4 realize it; D-189 and D-190 derive from it |
| D-189 — What pays, and what takes from the chest? | decision, changed | Settlements row 1; To do 1, 2, 7 | written by Slice 1; Slices 2, 3, 15, 16, 18 |
| D-179 — How do items go into a map run and out of it? | decision, changed | "Decisions in play" (D-179); To do 1 | written by Slice 1; Slice 3 |
| D-214 — When is a map run a manual run of a solved map? | decision, changed | Settlements row 1; To do 1 | written by Slice 1; Slices 2, 3, 8 |
| D-190 — What does a character's death take? | decision, changed | Settlements rows 2, 3, 4; To do 3 | written by Slice 1; Slices 5, 6, 7, 8, 9, 13 |
| D-220 — What generation number and resurrection does a new character have? | decision, changed | Settlements row 5; To do 3 | written by Slice 1; Slices 6, 8 |
| D-240 — When and how is the time away computed? | decision, changed | "Decisions in play" (D-240); To do 3 | written by Slice 1; Slices 9, 18 |
| D-242 — Which clock drives an earning loop? | decision, changed | "Decisions in play" (D-242); To do 3 | written by Slice 1; Slices 9, 13 |
| D-428 — What does the map check of the balance instrument print? (*Verification*) | decision, changed | Settlements row 10; To do 5 | written by Slice 1; Slice 10 |
| `solved-map-manual-run` | invariant, changed; its check: the cases of `tests/sim/trip.test.mjs` and `tests/sim/saved-game.test.mjs` that cite it | "Decisions in play"; To do 1, 2 | written by Slice 1; Slices 2, 3 |
| `trip-transfer` | invariant, changed; its check: the cases of `tests/sim/trip.test.mjs`, `tests/sim/catch-up.test.mjs` and `tests/sim/loop.test.mjs` that cite it | "Decisions in play"; To do 1 | written by Slice 1; Slices 3, 9 |
| `trip-run-end` | invariant, changed; its check: the cases of the same three files that cite it | "Decisions in play"; To do 2 | written by Slice 1; Slices 3, 9 |
| `resurrection-renewal` | invariant, changed; its check: the cases of `tests/sim/team.test.mjs`, `death.test.mjs`, `completion.test.mjs`, `catch-up.test.mjs`, `loop.test.mjs` and of `tests/view/team-lines.test.mjs`, `character-screen.test.mjs`, `clock.test.mjs` that cite it | Settlements rows 3, 4; To do 3 | written by Slice 1; Slices 6, 8, 9, 12, 13 |
| `resurrection` | glossary term, changed | Settlements row 9 | written by Slice 1; Slices 6, 12, 14 |
| D-215 — Where does the player read that a manual run of a solved map pays and takes nothing? | decision, changed | Settlements row 8; To do 4 | written by Slice 11; Slice 17 |
| D-216 — Where does the player read what a death took and what a completion renewed? | decision, changed | Settlements row 7; To do 4 | written by Slice 11; Slices 14, 15 |
| D-217 — What does the game show of a character's resurrection? | decision, changed | Settlements row 6; To do 4 | written by Slice 11; Slices 12, 15, 18 |
| D-329 — What stands at each character in the section „Kto idzie”? (*Verification*, rationale) | decision, changed | "Decisions in play" (D-329); To do 4, 7 | written by Slice 11; Slice 15 |
| D-251 — How does the card of a map mark a rehearsal the earning loop cannot repeat? | decision, withdrawn, no successor | To do 7 | withdrawn by Slice 11; its references rewritten by Slices 1 (D-189), 11 (D-329), 15, 16, 18 |

## Reading note added by the orchestrator at the plan's review

Every slice that changes a test file reads, besides its *Read*, each decision its altered cases quote by a `decision:` line and each invariant they cite by an `invariant:` line, where that entry is not already named in its *Read*: find them by searching the file, write the index with `python -B .the-way/elements/common/decision_index.py --output <working directory>/index.md --decision N` and open whole those whose sentence the case holds (step 2 of 'Reading the foundation'). Slices 8, 9, 12 and 14 in particular, whose files quote many unchanged decisions. A slice that edits a file larger than it can read edits it by searching and reading ranges, not whole.

## Passages of the frozen task named in the slice's *Read* (copied word for word, line numbers of `task.md`)

### task.md lines 31-31

3. Wskrzeszenie konta ma liczbę użyć i czas odnowienia jednego użycia, obie w danych gry: nowa gra zaczyna z pełną liczbą użyć, śmierć postaci z wprawą zużywa jedno użycie, póki jakieś zostało, śmierć postaci z wprawą, gdy żadne nie zostało, zabiera wprawę i wykupione stopnie jak dziś, a śmierć postaci bez wprawy nie zużywa żadnego. Na start w danych gry: 3 użycia i 4 godziny czasu realnego odnowienia jednego użycia (pytanie 4). Zużyte użycia wracają po kolei, jedno naraz, na jednym zegarze: śmierć, która zużywa użycie przy pełnym zapasie, puszcza zegar, a śmierć przy zegarze już biegnącym go nie przestawia; jedno użycie wraca po czasie odnowienia od chwili, w której zegar ruszył, każde następne po czasie odnowienia od powrotu poprzedniego, a gdy zapas jest pełny, zegar staje (pytanie 3). Pierwsze rozwiązanie mapy, której konto jeszcze nie rozwiązało, przywraca jedno użycie, póki zapas nie jest pełny, a zegar biegnie dalej bez przestawiania i staje, gdy zapas się zapełni; kolejne rozwiązanie tej samej mapy nic nie przywraca (pytanie 5). Kształt stanu i jego wczytanie — pytanie 15; rozliczenie śmierci, która zużyła użycie, trzyma liczbę użyć, które po niej zostały, bo okno końca mówi o chwili śmierci (pytanie 6), a wczytanie sprawdza ją wobec liczby użyć w danych gry. W nadrabianiu czasu nieobecności śmierci rozlicza się w kolejności listy postaci (D-240): śmierć każdej postaci zastaje liczbę użyć i zegar takie, jakie zostawiły postacie wyżej na liście, także gdy zginęła wcześniej w czasie realnym, a zegar puszczony przez śmierć rozliczoną wcześniej nie cofa się.

### task.md lines 142-147

- Pytanie 15. Jak stan gry trzyma użycia wskrzeszenia i co robi wczytanie zapisu, który nie zgadza się z danymi gry?
  - Answer: Stan gry trzyma liczbę użyć zużytych i jeszcze niewróconych oraz chwilę powrotu następnego, która stoi wtedy i tylko wtedy, gdy ta liczba jest większa od zera. Wczytanie odmawia zapisowi z liczbą zużytych większą niż liczba użyć w danych gry albo z chwilą niezgodną z tą liczbą, jak każdej wartości spoza granic danych (`guidelines/coding-saved-game.md`: „a wszystko, czego nie dopuszczają typy stanu gry, listy zamknięte i dane, to `shape`”; „Wolno odmówić więcej, niewolno mniej.”), a lista granic danych w tych wytycznych („Wczytanie sprawdza też wobec danych: …”) dostaje liczbę użyć wskrzeszenia. Skutek dla gracza przy późniejszej poprawce liczb: podniesienie liczby użyć zachowuje każdy zapis i od razu daje każdemu dodatkowe użycie; obniżenie odrzuca jako uszkodzony tylko zapis, w którym zużytych jest więcej niż nowa liczba.
  - Not chosen:
    - Stan trzyma liczbę użyć pozostałych — przy każdej zmianie liczby użyć w danych gra odrzuca zapisy, przy podniesieniu wszystkie z pełnym zapasem.
    - Wczytanie przycina liczbę do danych zamiast odmówić — naprawia stan, czego wytyczne zapisu zabraniają („Brakujących kluczy nie uzupełniaj. … Przy błędzie nie zwracaj części stanu.”).
  - Source: human, 2026-11-20, przez doradcę dnia jak przy pytaniu 13: „24: …, 3 ok, …”, „Przy 3: pamiętanie zużytych użyć jest tańsze dla zapisów graczy przy strojeniu w zadaniu 6.” — ustalenie domyślne bez weta (pokazane jako 24.3 w turze 10, odpowiedź w turze 11); odmowa przy niezgodności z danymi wynika z wytycznych zapisu; lista decyzji, pozycja 3.

### task.md lines 165-165

- Zmiana kształtu stanu gry sprawia, że gra odrzuci zapisy sprzed niej w całości; definicja projektu to przyjęła: „każda zmiana kształtu stanu w tym projekcie kasuje zapis” (D-206, D-386).

## Foundation, guidelines and code named in *Read*

Read each guideline file named whole. Each foundation entry named by its identifier or its heading is read whole by the range from its heading to the next heading of any level. The line ranges in the plan's *Read* are those of the base commit `46cfec71`; earlier slices and the foundation step may have moved them, so find each entry by its identifier or heading, and where the numbers differ the entry you find holds.

## Extra from the orchestrator

- Range to review: `20e6eaab..f2707957` (one commit, `tests/sim/saved-game.test.mjs` only, +202 / -57). Slice 7. Its *Risk* names a trust boundary, so this is the slice's own review.
- The executor's report: `.runs/task-cycles/zapas-i-wskrzeszenie/reports/slice-07-executor-report.md` (read it whole; four concerns: the load checks a death's `usesLeft` only against the data's count, not against the team's spent count; the load admits a `resurrectionUsed` settlement on a character with no practice where the game writes `noPractice`; the marked completion's expected `berry` 2 taken from one run of the game; `dead()` defaulting to `usesLeft: 0`). Judge each: allowed, defect, or a divergence from the task (question 15: the load refuses a count above the data's, a moment inconsistent with the count; settlement's uses left above the data's count; `guidelines/coding-saved-game.md`).
- Judge: that the file holds the document of version 8 with every optional branch filled and loading into the state it describes; that the document of version 7 is kept and refused as another version; that every crafted refusal the slice lists (count of uses spent that is no whole number from 0 / above the data's count; a moment standing with none spent or missing with some spent; a moment that is no safe integer; the old key `resurrectionReadyAtMs`; a settlement whose uses left is missing, out of range or above the data's count) is a real case that fails when the matching check of `saved-game.ts` is broken (try breaking each bound in your own working copy under `.runs/review-s7/` and see the case fail; a mutation run of `saved-game.ts` with StrykerJS on the load's ranges is welcome if `tests/sim` allows it now); that every `decision:` / `invariant:` quotation of the altered cases is word for word what the foundation says now (the foundation check reports test files of later slices only; check it reports none for this file); that the case of `tests/sim/saved-game.test.mjs` about the marked completion (line ~3128 before) expects what the game does under D-189 and not merely what one run printed; that no test comment points outside the foundation; and that it leaves unchanged everything else the file held.
- Craft your own hostile documents against `loadSavedGame` as well (the probe of the earlier reviewer is in `.runs/task-cycles/zapas-i-wskrzeszenie/reports/review-s56-fix-probe.mjs`; you may read it, it is a script, not the cycle's record).
- Your report's first line is `PASS <sha>` or `FAIL <sha>`; grade findings; mark a finding that contradicts a settlement of the task with `Contradiction: yes`.
