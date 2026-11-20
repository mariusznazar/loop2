# Handoff - executor of slice(s) 8 of the task `zapas-i-wskrzeszenie`

The person who requested the cycle has delegated intermediate choices to the orchestrator; no answer you get is that person's approval. Your reply goes to the orchestrator only.

## Where and what

- Worktree (work from its root, never from the main checkout): `the root of the task's worktree`, branch `task/zapas-i-wskrzeszenie`. The pinned the-way stands in `.the-way` there. Dependencies are installed (`npm ci` ran).
- Your method: `.the-way/task-cycle/change/SKILL.md` by its path in the worktree's `.the-way`; read it whole, and a file it names only when the step or variant that names it comes. Do not call a skill. Your variant: "a slice, or the retry of a slice".
- Your stage and its boundary: Make the slice below, commit it by path (`git add <file> ...`, never `git add -A`; commit messages in English, like the commits of the repository, with its `type: :emoji:` form), run the focused checks of its *Checks* and return. Make no other slice and no change outside the slice's *Change*, and run **no full gate** (`npm test` without a file): the gate is the orchestrator's or CI's.
- Base of your slice: `f2c9c335`.
- Frozen task: `.runs/task-cycles/zapas-i-wskrzeszenie/task.md` (the passages your section needs are copied below; read the rest of it only if a passage sends you to it). Plan: `.runs/task-cycles/zapas-i-wskrzeszenie/plan.md` (its other slices are not yours). Spec: none.
- Answers of step 4 of the cycle: trust boundary - **yes** (`src/browser/sim/saved-game.ts`: the saved shape of the team's resurrection and the load's checks; check crafted input there: counts above the data's, negative or non-finite numbers, a moment standing with no use spent or missing with some spent, wrong types); irreversible operation - **no**. No open design choice; no reserved choice. The pin of the-way is not moved.
- Your directory for working copies: `.runs/slice-08-executor/` (directly under the ignored `.runs/` of the worktree).
- Your report: `.runs/task-cycles/zapas-i-wskrzeszenie/reports/slice-08-executor-report.md`. The report file is the input of the cycle's scripts (`task-cycle/remarks_check.py` reads it), the case the harness's note about files named `report...` leaves open. Where you are refused the write all the same, return the report whole as your answer. Its first line is yours as your method gives it; it holds besides what your method gives **Unread material** (what this handoff names that stayed unread or was read in part, or `none`) and **Searches not found or unclear** (each thing looked for and not found or unclear, or `none`).
- `cycle.md` and the other files of the cycle's record directory - other agents' handoffs, reports and findings - are not yours to read unless this handoff names them.
- Other tools of the cycle: the product's guidelines say tests run as `npm test -- <one test file>`; never run `npm test` bare.

Working copies - copied word for word from the cycle:

> An agent of the cycle that makes a working copy to check something — a worktree of a commit, a clone, a script, a screenshot, a prepared input of a test — makes it in a directory of its own directly under the ignored `.runs/` of the task's worktree, the directory its handoff names; never in the system's temporary directory, in the scratch directory of a session or in the main checkout of the repository. The screenshot that a screenshot tool, such as the Playwright server, saves by itself under its session's directory is moved into the agent's directory and the original removed, except a screenshot that is shown to the human: that one goes where `task-cycle/change/ui_check.md` says, to the place the product's foundation settles for screenshots, and into the agent's directory only where no such place is settled. The files that a product's own tools and tests make by themselves are no working copy of the agent and stay outside this rule. Before the agent returns, each time it returns, it removes its copy — a worktree with `git worktree remove --force`, then `git worktree prune` — keeps in `reports/` beside its report what the report needs, and states in the report where each copy stood and that it was removed. Where a removal fails, the agent finishes all the same and names in the report the remainder, with its full path and the reason it stayed. It removes a copy, as any directory, by its path written out in full in the command, never through a shell variable: an empty variable turns the removal on the directory the shell stands in.

## The slice (copied word for word from the plan)

### Slice 8 — The tests of death, completion and data hold the uses

- **Goal:** In `death.test.mjs`, `completion.test.mjs`, `flow.test.mjs` and `data.test.mjs` of
  `tests/sim/`, every case that sets the team's resurrection, expects one resurrection or the
  renewal of 480 minutes reads the uses as Slice 6 made them and expects the rules of D-190 and
  D-220 as Slice 1 wrote them, with its reason; `data.test.mjs` expects 3 uses and 240 minutes as
  numbers of the game's data. Each `decision:` line quoting a sentence of D-189, D-190, D-214 or
  D-220 that Slice 1 rewrote quotes it as it stands now, and each case that cites
  `resurrection-renewal` holds the sentence as reworded. This slice changes no code: where a
  rewritten case shows a fault of Slice 6, report it with the case and stop.
- **Change:** `tests/sim/death.test.mjs` · `tests/sim/completion.test.mjs` ·
  `tests/sim/flow.test.mjs` · `tests/sim/data.test.mjs`
- **Read:** `guidelines/coding.md` · `guidelines/testing.md` · `src/browser/sim/game.ts` ·
  `src/browser/sim/types.ts` · `src/browser/sim/data/balance.ts` ·
  `.runs/task-cycles/zapas-i-wskrzeszenie/task.md:31-31` To do (item 3) ·
  `.runs/task-cycles/zapas-i-wskrzeszenie/task.md:55-72` Questions to settle (questions 3–5) ·
  Foundation entries row D-189 · row D-190 · row D-214 · row D-220 · row resurrection-renewal ·
  `foundations/decisions.md:7044-7062` D-194 · `foundations/decisions.md:6349-6386` D-221 ·
  `foundations/invariants.md:1078-1087` death-settled-once · `foundations/part_map.md:33-64`
  simulation
- **Model:** cheaper
- **Risk:** none
- **Checks:** `npm test -- tests/sim/death.test.mjs` · `npm test -- tests/sim/completion.test.mjs` ·
  `npm test -- tests/sim/flow.test.mjs` · `npm test -- tests/sim/data.test.mjs`
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

### task.md lines 55-72

- Pytanie 3. Jak wracają zużyte użycia wskrzeszenia, gdy brakuje więcej niż jednego?
  - Answer: Po kolei, jedno naraz, na jednym zegarze. Przy trzech użyciach i czterech godzinach: cztery godziny po pierwszej śmierci wraca pierwsze użycie, po kolejnych czterech drugie, po następnych czterech trzecie; pełny zapas dwanaście godzin po pierwszej śmierci. Stan gry trzyma liczbę użyć i chwilę powrotu następnego.
  - Not chosen:
    - Każde osobno: każde zużyte użycie wraca cztery godziny po śmierci, która je zużyła — dzisiejsza reguła przeniesiona dosłownie na kilka użyć; stan gry trzyma osobną chwilę dla każdego użycia, a przy tych samych liczbach gra jest łagodniejsza — zły wieczór kosztuje jedno czekanie, nie trzy — więc tę samą surowość daje dopiero dłuższy czas odnowienia.
  - Source: human, 2026-11-20, przez doradcę dnia, któremu Mariusz o 16:32 przekazał dokończenie decyzji tej rundy: „24: 1a 2a 3a 4a, reszta ok” (pytanie pokazane jako 24.1; rozmowa doprecyzowania `.runs/project-refinement/zapas-i-wskrzeszenie.md`, tura 6, Q1, odpowiedź zapisana w turze 7)
- Pytanie 4. Ile użyć ma wskrzeszenie na starcie gry i po ilu godzinach czasu realnego wraca jedno użycie?
  - Answer: 3 użycia, jedno wraca po 4 godzinach czasu realnego; obie liczby w danych gry. Przy ścianie bez swojej rzeczy, 25% na próbę, i każdej nieudanej próbie zakończonej śmiercią: ściana pada w jednym posiedzeniu na samych użyciach w 58% posiedzeń, 42% kończy się bez sukcesu i bez użyć, a następna chroniona próba czeka do 4 godzin; pełny zapas po 12 godzinach. Liczby można poprawić w zadaniu 6 planu po pomiarze pierwszej ściany.
  - Not chosen:
    - 2 użycia, jedno wraca po 8 godzinach — najbliżej dzisiejszej gry; 44% / 56%, do 8 godzin czekania, pełny zapas po 16 godzinach: częściej i dłużej czekania niż przy 3 i 4.
    - 5 użyć, jedno wraca po 2 godzinach — 76% / 24%, do 2 godzin czekania, pełny zapas po 10 godzinach: dla ostrożnego gracza wskrzeszenie prawie przestaje być stawką.
    - Liczby Mariusza — droga otwarta, bez kosztu w pytaniu.
  - Source: human, 2026-11-20, przez doradcę dnia jak przy pytaniu 3: „24: 1a 2a 3a 4a, reszta ok”, z powodem „24.2 a, bo seria prób ma koniec, a liczby to jedna linia danych do poprawy w zadaniu 6 po pomiarze pierwszej ściany” (pytanie pokazane jako 24.2; tura 6, Q2)
- Pytanie 5. Co daje wskrzeszeniu pierwsze rozwiązanie mapy, której konto jeszcze nie rozwiązało, i co wtedy dzieje się z czasem powrotu użyć, które jeszcze nie wróciły?
  - Answer: Przywraca jedno użycie, póki zapas nie jest pełny. Zegar użyć, które jeszcze wracają, biegnie dalej: gracz, który widział „następne za 3 godz. 10 min”, dalej to widzi, tylko użyć ma o jedno więcej; gdy zapas się zapełni, zegar staje. Drabina około trzydziestu map daje przez cały projekt około trzydziestu dodatkowych użyć.
  - Not chosen:
    - Przywraca wszystkie użycia, a zegar staje — gracz, który idzie naprzód po drabinie, prawie nie czeka; liczba użyć waży tylko przy ścianie, na której utknął.
    - Nic nie przywraca, tylko czas — prostsza reguła i krótsze napisy; gracz czeka po sukcesie, czego fundament dziś nie chce (D-190, *Rejected*: „the player waits for the whole span even after a success”).
  - Source: human, 2026-11-20, przez doradcę dnia jak przy pytaniu 3: „24: 1a 2a 3a 4a, reszta ok” (pytanie pokazane jako 24.3; tura 6, Q3)

## Foundation, guidelines and code named in *Read*

Read each guideline file named whole. Each foundation entry named by its identifier or its heading is read whole by the range from its heading to the next heading of any level. The line ranges in the plan's *Read* are those of the base commit `46cfec71`; earlier slices and the foundation step may have moved them, so find each entry by its identifier or heading, and where the numbers differ the entry you find holds.

## Extra from the orchestrator

- Slices 1-7 are made (slice 6: `7e3869c2` + `20e6eaab`, the shape of version 8 and the rules; slice 7: `f2707957` + `f2c9c335`). The team's state holds the count of uses spent and not yet returned and the moment of the next return; the game reads the uses at a moment through `resurrectionAt(team, nowMs)` and `resurrectionReady`; read `src/browser/sim/game.ts` and `types.ts` as they stand. The data hold 3 uses and 240 real minutes for one use's return.
- The foundation check (`python -B .the-way/elements/common/foundation_check.py --skip-test-citations`) reports a `decision:` line that quotes a sentence the foundation no longer has, or that does not begin a sentence. When you finish, run it and make sure no error remains for the four files of your *Change*; the errors of files of later slices stand by the plan. A `decision:` quotation must begin at the start of a sentence of the decision and be word for word what it says now.
- `decision_index.py` takes `--decision D-190`, with the `D-` prefix; run it for the decisions your altered cases quote and open whole those whose sentence a case holds. Test files are large: edit by searching and reading ranges. A test comment must not point to a document outside the foundation (no "question 15 of the task").
- Failing tests that stand by the plan: `tests/sim/catch-up.test.mjs` and `loop.test.mjs` (slice 9), `tests/balance/*` (slice 10), `tests/view/*` (slices 12-15, 17, 18).
