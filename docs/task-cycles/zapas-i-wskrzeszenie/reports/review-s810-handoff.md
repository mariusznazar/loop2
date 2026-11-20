# Handoff - reviewer of slice(s) 8,9,10 of the task `zapas-i-wskrzeszenie`

The person who requested the cycle has delegated intermediate choices to the orchestrator; no answer you get is that person's approval. Your reply goes to the orchestrator only.

## Where and what

- Worktree (work from its root, never from the main checkout): `the root of the task's worktree`, branch `task/zapas-i-wskrzeszenie`. The pinned the-way stands in `.the-way` there. Dependencies are installed (`npm ci` ran).
- Your method: `.the-way/task-cycle/review/SKILL.md` by its path in the worktree's `.the-way`; read it whole, and a file it names only when the step or variant that names it comes. Do not call a skill. Your variant: "a planned slice, the whole change, ... (the review of the range below)".
- Your stage and its boundary: Review the range below with `review-change`. Read-only: change no file of the repository.
- Base of the range: `f2c9c335`.
- Frozen task: `.runs/task-cycles/zapas-i-wskrzeszenie/task.md` (the passages your section needs are copied below; read the rest of it only if a passage sends you to it). Plan: `.runs/task-cycles/zapas-i-wskrzeszenie/plan.md` (its other slices are not yours). Spec: none.
- Answers of step 4 of the cycle: trust boundary - **yes** (`src/browser/sim/saved-game.ts`: the saved shape of the team's resurrection and the load's checks; check crafted input there: counts above the data's, negative or non-finite numbers, a moment standing with no use spent or missing with some spent, wrong types); irreversible operation - **no**. No open design choice; no reserved choice. The pin of the-way is not moved.
- Your directory for working copies: `.runs/review-s810/` (directly under the ignored `.runs/` of the worktree).
- Your report: `.runs/task-cycles/zapas-i-wskrzeszenie/reports/review-s810-report.md`. The report file is the input of the cycle's scripts (`task-cycle/remarks_check.py` reads it), the case the harness's note about files named `report...` leaves open. Where you are refused the write all the same, return the report whole as your answer. Its first line is yours as your method gives it; it holds besides what your method gives **Unread material** (what this handoff names that stayed unread or was read in part, or `none`) and **Searches not found or unclear** (each thing looked for and not found or unclear, or `none`).
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

### Slice 9 — The catch-up and the earning loops spend and return uses in the list's order

- **Goal:** The catch-up and the open game settle deaths on the uses as D-240 and D-242 now give:
  the death of each character finds the count of uses and the clock of returns as the characters
  earlier on the list left them, even where it died earlier in real time, and a clock started by a
  death settled earlier does not move back; in the open game the earlier of two deaths in real time
  takes the last use. Cases of `tests/sim/catch-up.test.mjs` hold this first; `loop.ts` changes
  only where a case shows it must, and its comments speak of uses. Every case of
  `catch-up.test.mjs` and `tests/sim/loop.test.mjs` that sets the old field or expects one
  resurrection reads the uses with its reason; each `decision:` line quoting a sentence of D-189,
  D-190, D-240 or D-242 that Slice 1 rewrote quotes it as it stands now; the cases citing
  `trip-transfer`, `trip-run-end` and `resurrection-renewal` hold the sentences as reworded.
- **Change:** `src/browser/sim/loop.ts` · `tests/sim/catch-up.test.mjs` · `tests/sim/loop.test.mjs`
- **Read:** `guidelines/coding.md` · `guidelines/testing.md` ·
  `guidelines/coding-simulation-module.md` · `src/browser/sim/game.ts` ·
  `.runs/task-cycles/zapas-i-wskrzeszenie/task.md:31-31` To do (item 3) ·
  `.runs/task-cycles/zapas-i-wskrzeszenie/task.md:55-59` Questions to settle (question 3) ·
  Foundation entries row D-189 · row D-190 · row D-240 · row D-242 · row trip-transfer · row
  trip-run-end · row resurrection-renewal · `foundations/invariants.md:1148-1177` catch-up-state
  · catch-up-minutes · catch-up-death-moment · `foundations/invariants.md:1328-1337`
  loop-practice-payment · `foundations/decisions.md:8796-8871` D-246 · `foundations/part_map.md:33-64`
  simulation
- **Model:** cheaper
- **Risk:** none
- **Checks:** first the case of `tests/sim/catch-up.test.mjs` of a character later on the list that
  died earlier in real time, finding the uses and the clock as the earlier character left them; then
  `npm test -- tests/sim/catch-up.test.mjs` · `npm test -- tests/sim/loop.test.mjs`
- **Depends on:** Slice 6

### Slice 10 — The balance instrument counts the uses with the game's functions

- **Goal:** As To do item 5 and question 12 give: the earning loop and the map check start with the
  full count of uses, as a new game; `--no-resurrection` starts with none — all uses spent, the
  clock started at the start of the loop — after which they return as in the game; the campaign's
  player that waits for the resurrection before trying the next map tries while one use is left. The
  instrument counts no return itself and keeps no copy of a number of the game (question 11, "Liczba
  gry"). The description of the switch in `balance/cli.mjs` and in both copies of the skill
  `loop2-balance`, byte for byte alike, speaks of uses, and the comments of the mode files that speak
  of the one resurrection speak of uses. The player descriptions in `balance/players/` stay as they
  are: "while the team's resurrection is ready" reads as "while a use is left".
- **Change:** `balance/loop.mjs` · `balance/campaign.mjs` · `balance/check-map.mjs` ·
  `balance/cli.mjs` · `.claude/skills/loop2-balance/SKILL.md` · `.agents/skills/loop2-balance/SKILL.md`
  · `tests/balance/loop.test.mjs` · `tests/balance/check-map.test.mjs` · `tests/balance/cli.test.mjs`
  · `tests/balance/campaign.test.mjs`
- **Read:** `guidelines/coding.md` · `guidelines/testing.md` ·
  `guidelines/coding-balance-instrument.md` · `src/browser/sim/data/balance.ts` ·
  `.runs/task-cycles/zapas-i-wskrzeszenie/task.md:31-33` To do (items 3–5) ·
  `.runs/task-cycles/zapas-i-wskrzeszenie/task.md:111-128` Questions to settle (questions 11, 12) ·
  `.runs/task-cycles/zapas-i-wskrzeszenie/task.md:160-160` Context · Foundation entries row D-190 · row
  D-428 · `foundations/decisions.md:11658-11672` D-427 · `foundations/decisions.md:11688-11702` D-429
  · `foundations/decisions.md:888-902` D-437 · `foundations/invariants.md:1438-1467`
  instrument-game-agreement · balance-instrument-file-writes · balance-instrument-repeatability ·
  `foundations/part_map.md:127-157` balance-tools · agent-workflow
- **Model:** cheaper
- **Risk:** none
- **Checks:** first a case of `tests/balance/loop.test.mjs` with `resurrectionReady` false starting
  with every use spent and the first returning the renewal after the loop's start, and a case of
  `tests/balance/campaign.test.mjs` of a player waiting for the resurrection who tries with one use
  left; then `npm test -- tests/balance/loop.test.mjs` · `npm test -- tests/balance/check-map.test.mjs`
  · `npm test -- tests/balance/cli.test.mjs` · `npm test -- tests/balance/campaign.test.mjs` ·
  `npm test -- tests/balance/agreement.test.mjs` · `npm test -- tests/balance/progression.test.mjs` ·
  `npm test -- tests/invariants/test_balance_instrument_file_writes.py` ·
  `npm test -- tests/invariants/test_balance_instrument_repeatability.py` ·
  `npm test -- tests/agent_workflow/test_loop2_balance_skill.py`
- **Depends on:** Slice 4 · Slice 6

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

### task.md lines 55-59

- Pytanie 3. Jak wracają zużyte użycia wskrzeszenia, gdy brakuje więcej niż jednego?
  - Answer: Po kolei, jedno naraz, na jednym zegarze. Przy trzech użyciach i czterech godzinach: cztery godziny po pierwszej śmierci wraca pierwsze użycie, po kolejnych czterech drugie, po następnych czterech trzecie; pełny zapas dwanaście godzin po pierwszej śmierci. Stan gry trzyma liczbę użyć i chwilę powrotu następnego.
  - Not chosen:
    - Każde osobno: każde zużyte użycie wraca cztery godziny po śmierci, która je zużyła — dzisiejsza reguła przeniesiona dosłownie na kilka użyć; stan gry trzyma osobną chwilę dla każdego użycia, a przy tych samych liczbach gra jest łagodniejsza — zły wieczór kosztuje jedno czekanie, nie trzy — więc tę samą surowość daje dopiero dłuższy czas odnowienia.
  - Source: human, 2026-11-20, przez doradcę dnia, któremu Mariusz o 16:32 przekazał dokończenie decyzji tej rundy: „24: 1a 2a 3a 4a, reszta ok” (pytanie pokazane jako 24.1; rozmowa doprecyzowania `.runs/project-refinement/zapas-i-wskrzeszenie.md`, tura 6, Q1, odpowiedź zapisana w turze 7)

### task.md lines 31-33

3. Wskrzeszenie konta ma liczbę użyć i czas odnowienia jednego użycia, obie w danych gry: nowa gra zaczyna z pełną liczbą użyć, śmierć postaci z wprawą zużywa jedno użycie, póki jakieś zostało, śmierć postaci z wprawą, gdy żadne nie zostało, zabiera wprawę i wykupione stopnie jak dziś, a śmierć postaci bez wprawy nie zużywa żadnego. Na start w danych gry: 3 użycia i 4 godziny czasu realnego odnowienia jednego użycia (pytanie 4). Zużyte użycia wracają po kolei, jedno naraz, na jednym zegarze: śmierć, która zużywa użycie przy pełnym zapasie, puszcza zegar, a śmierć przy zegarze już biegnącym go nie przestawia; jedno użycie wraca po czasie odnowienia od chwili, w której zegar ruszył, każde następne po czasie odnowienia od powrotu poprzedniego, a gdy zapas jest pełny, zegar staje (pytanie 3). Pierwsze rozwiązanie mapy, której konto jeszcze nie rozwiązało, przywraca jedno użycie, póki zapas nie jest pełny, a zegar biegnie dalej bez przestawiania i staje, gdy zapas się zapełni; kolejne rozwiązanie tej samej mapy nic nie przywraca (pytanie 5). Kształt stanu i jego wczytanie — pytanie 15; rozliczenie śmierci, która zużyła użycie, trzyma liczbę użyć, które po niej zostały, bo okno końca mówi o chwili śmierci (pytanie 6), a wczytanie sprawdza ją wobec liczby użyć w danych gry. W nadrabianiu czasu nieobecności śmierci rozlicza się w kolejności listy postaci (D-240): śmierć każdej postaci zastaje liczbę użyć i zegar takie, jakie zostawiły postacie wyżej na liście, także gdy zginęła wcześniej w czasie realnym, a zegar puszczony przez śmierć rozliczoną wcześniej nie cofa się.
4. Napisy gry o ręcznym przejściu mapy rozwiązanej i o wskrzeszeniu mówią to, co po zmianie obowiązuje: wiersz na ekranie takiego przejścia, wiersz wskrzeszenia przy postaci na karcie w Siedzibie, na ekranie Postać i w „Kto idzie” na karcie mapy oraz wiersze o wskrzeszeniu w oknie końca przejścia; wiersz „Wejdzie: …” nad „Wejdź” na mapie rozwiązanej liczy, jak na każdej innej, z tym, co leży w skrzynce; ostrzeżenie pod „Wejdź” na mapie rozwiązanej, że próba weźmie zapas, którego pętla nie dostanie, znika, bo próba i pętla biorą teraz ze skrzynki to samo. Brzmienia stoją w odpowiedzi na pytanie 6, a forma liczby godzin z danych gry — w odpowiedzi na pytanie 16. Wytyczne wyglądu `guidelines/styleguide-browser-view.md` mówią to samo co napisy po zmianie: w części o ekranie Mapy znika ostrzeżenie pod „Wejdź” i numer D-251 z jej listy decyzji, a zdania o roli wiersza wskrzeszenia („a gdy wskrzeszenie nie jest gotowe, w `danger` (D-217)”) i o wierszu okna końca („`danger`, gdy wskrzeszenie nie było gotowe (D-185, D-216)”) mówią o użyciach.
5. Przyrząd balansu liczy wskrzeszenie z liczbą użyć funkcjami gry, bez własnego liczenia powrotów: pętla i sprawdzenie mapy startują z pełną liczbą użyć, jak nowa gra; przełącznik `--no-resurrection` startuje bez żadnego — wszystkie użycia zużyte, zegar puszczony w chwili startu pętli — a potem użycia wracają jak w grze, tak jak dziś wraca zużyte wskrzeszenie; gracz kampanii, który przed próbą następnej mapy czeka na wskrzeszenie, próbuje, gdy zostało choć jedno użycie. Opis przełącznika w `balance/cli.mjs` i w obu kopiach skilla `loop2-balance` mówi o użyciach. Kod przyrządu zmieniany w pozycjach 5 i 6 trzyma się wytycznych rodzaju `balance-instrument` w znaczeniach z odpowiedzi na pytanie 11, a każdy nowy plik kodu w `balance/` dostaje wiersz w tabeli „Files of this kind” w `guidelines/coding-balance-instrument.md`.

### task.md lines 111-128

- Pytanie 11. Jaki rodzaj kodu i jaki plik-wzorzec obowiązują pliki przyrządu balansu, które to zadanie zmienia (`balance/`)?
  - Answer: Rodzaj `balance-instrument` obejmuje pliki kodu `.mjs` w `balance/`, bez plików JSON nakładek i opisów graczy; jego wytyczne stoją w `guidelines/coding-balance-instrument.md`, plikiem-wzorcem jest `balance/engine.mjs` (D-437), a wiersz rodzaju stoi w tabeli rodzajów `guidelines/coding.md`. Znaczenia, których to zadanie potrzebuje, są już regułami tych wytycznych albo decyzjami fundamentu; żadne nie jest nowym ani zmienionym znaczeniem wytycznych:
    - „Liczba gry”: liczba użyć wskrzeszenia, czas odnowienia jednego użycia i pojemność skrzynki są liczbami gry („Liczba gry to liczba, która stoi w plikach danych gry (D-18) albo którą daje funkcja gry”), więc przyrząd bierze je ze zbudowanej gry i nie trzyma ich kopii — jak dziś `balance/loop.mjs` bierze `BALANCE.resurrectionRenewalRealMinutes`; ziarna 1–500, próg 20% z pytania 7 i chwila startu zegara pomiaru są liczbami pomiaru, które przyrząd trzyma sam.
    - „Przejście mapy jak w grze”: każde przejście mapy pomiaru z pozycji 6 listy „To do”, także ręczne przejście mapy rozwiązanej po zapas, jeśli przyrząd je przeprowadza, idzie funkcjami zbudowanej gry, a powroty użyć liczą funkcje gry (pozycja 5).
    - „Programy wzorcowe”: pomiar z pozycji 6 bierze programy z `tests/sim/reference-programs.mjs`.
    - „Jedno miejsce wspólnej rzeczy”: to, czego pomiar potrzebuje, a co już stoi w pliku przyrządu — `chestOf` w `balance/check-map.mjs`, `MS_PER_MINUTE` i `LOOP_START_MS` w `balance/loop.mjs`, `meanNumber`, `outcomeOf` i `DEFAULT_CAP_MINUTES` w `balance/engine.mjs` — pomiar importuje stamtąd.
    - „Zapis plików” i D-429: tabelę wyniku pomiaru tryb oddaje jako dane, plik zapisuje tylko `balance/cli.mjs` pod ścieżką z flagi `--out`, a wynik nie wchodzi do repozytorium.
    - „Zegar i losowość”: zegar pomiaru liczy od stałej chwili, losowość pochodzi z ziaren pomiaru.
    - Tabela „Files of this kind”: nowy plik kodu w `balance/` dostaje w niej wiersz ze stanem `copy` (D-437, *Verification*: „list each file of code of the instrument in the table of the kind”), zaczyna się komentarzem, który mówi, czym jest, i wskazuje niezmiennik `instrument-game-agreement`, i sam odmawia mapy, której dane gry nie mają (przykłady „Komentarz na początku pliku” i „Odmowa nieznanego identyfikatora”).
    - Przykład „Tryb zbudowany na silniku” (`balance/check-map.mjs`: stałe pomiaru nazwane i eksportowane, pomiar osobno od układania tabeli, bez własnego pułapu minut) jest wzorem nowego trybu pomiaru, nie wymogiem (D-437: „without requiring every mode of the instrument to take the shape of the engine”).
  - Not chosen (w zadaniu 23):
    - plik-wzorzec `balance/check-map.mjs` — „plik jest mały (141 wierszy) i nie pokazuje ani styku z funkcjami gry, ani odmowy błędnego wejścia; zadanie, które zmienia sam silnik, zostaje bez wzorca”
    - ten sam rodzaj z sześcioma plikami JSON w tabeli plików — „tabela rośnie z każdą nową nakładką, plików JSON nie czytają narzędzia jakości kodu, na których stoją reguły rodzaju, a rodzaj w wytycznych kodowania oznacza kod, nie dane”
    - dwa rodzaje, moduły pomiaru i osobno wiersz poleceń z własnym wzorcem — „drugi plik wytycznych i druga decyzja dla jednego pliku. Plan mówi o jednym rodzaju, więc najpierw zmiana planu. Ten wariant zmienia też decyzję D-28, która dziś odkłada osobny wzorzec dla punktów uruchomienia”
  - Source: dokument zadania 23 `wzorzec_kodu_przyrzadu_loop2.md`, pytania 1 i 5: human, 2026-11-20, „ok dla wszystkich dotychczas”, przyjęcie wariantów domyślnych „plik-wzorzec `balance/engine.mjs` (Q1 a)” i „rodzaj `balance-instrument` dla ośmiu plików kodu, pliki JSON poza nim (Q5 a)”; zadanie 23 scalone 2026-11-20 (PR #164, commit fec2ae7e): `guidelines/coding-balance-instrument.md`, sekcje „Rules”, „Examples” i „Files of this kind”, D-437 i wiersz `balance-instrument` w `guidelines/coding.md`, wszystko w commicie fec2ae7e.
- Pytanie 12. Jak przyrząd balansu liczy wskrzeszenie z liczbą użyć?
  - Answer: Tak, jak mówi pozycja 5 listy „To do”: pomiar pętli i sprawdzenie mapy startują z pełnym zapasem użyć, przełącznik „bez wskrzeszenia” startuje z zerem, a symulowany gracz kampanii, który przed próbą następnej mapy czeka na wskrzeszenie, próbuje, gdy zostało choć jedno użycie; pomiary map mówią wtedy o grze takiej, jaka będzie po zmianie.
  - Source: human, 2026-11-20, przez doradcę dnia jak przy pytaniu 3: „reszta ok” — ustalenie domyślne 8 bez weta (pokazane jako 24.8; tura 6, *Human material*); weto wymagałoby innego znaczenia tych ustawień, którego pytanie nie pokazało.

### task.md lines 160-160

- Przyrząd balansu (commit fec2ae7e): `balance/loop.mjs` w funkcji `startState` sam wpisuje do stanu drużyny chwilę gotowości wskrzeszenia, gdy pętla ma startować ze zużytym wskrzeszeniem (stała `MS_PER_MINUTE`, której przy tym używa, stoi od zadania 23 tylko w `balance/loop.mjs`, a `balance/campaign.mjs` ją stamtąd importuje), `balance/campaign.mjs` czyta gotowość przez `resurrectionReady`, `balance/cli.mjs` ma przełącznik `--no-resurrection`, `balance/check-map.mjs` startuje pętlę z gotowym wskrzeszeniem, opisy graczy w `balance/players/` mają pole `needResurrection`, a skill `.claude/skills/loop2-balance/SKILL.md` i jego kopia w `.agents/skills/loop2-balance/SKILL.md` opisują przełącznik.

## Foundation, guidelines and code named in *Read*

Read each guideline file named whole. Each foundation entry named by its identifier or its heading is read whole by the range from its heading to the next heading of any level. The line ranges in the plan's *Read* are those of the base commit `46cfec71`; earlier slices and the foundation step may have moved them, so find each entry by its identifier or heading, and where the numbers differ the entry you find holds.

## Extra from the orchestrator

- Range to review: `f2c9c335..ab0e44ba` — slice 8 (`3c621606`: `tests/sim/death|completion|flow|data.test.mjs`), slice 9 (`b0353afa`: `src/browser/sim/loop.ts` comments, `tests/sim/catch-up.test.mjs`, `tests/sim/loop.test.mjs`) and slice 10 (`55a35a33`, `ab0e44ba`: `balance/loop.mjs`, `campaign.mjs`, `check-map.mjs`, `cli.mjs`, both copies of the skill `loop2-balance`, `tests/balance/loop|campaign|check-map|cli.test.mjs`). None of the three had a review of its own in the plan; this is the orchestrator's grouped review of them; name for each blocking finding the slice it comes from.
- The executors' reports: `.runs/task-cycles/zapas-i-wskrzeszenie/reports/slice-08-executor-report.md`, `slice-09-executor-report.md`, `slice-10-executor-report.md` (read all three whole). Points to judge: slice 8 — the completion case below zero whose expectation the executor changed (a use due at that moment and the completion's own return both count: judge against D-190 and `resurrection-renewal`), `death.test.mjs` written whole (read the file, not the hunks), the uncovered case of a completion at the very moment the clock returns a use; slice 9 — the fixture starting from two uses spent and the clock at minute 10 000 for the "one use left" cases, the second half of the first death case removed as covered, `loop.ts` changed in comments only; slice 10 — the loop starting with the game's full count and `--no-resurrection` starting with every use spent and the clock started at the loop's start, both through the game's functions with no copy of a game number and no return counted by the instrument (kind `balance-instrument`: `guidelines/coding-balance-instrument.md`), the campaign player trying when at least one use is left, the export of `dueAttempt` from `balance/campaign.mjs` for a test, the overlay-based precondition tests (an overlay setting the renewal to 1e9; the executor notes the game's renewal constant is read at load, `src/browser/sim/game.ts` near line 76, so an overlay of the renewal only moves the first return — judge whether that makes `--no-resurrection` behave differently from the task's "uses return as in the game" for an overlaid game, and whether it matters), both skill copies byte-identical and describing the switch as the task asks, the four `decision:` lines of D-428's new paragraph.
- Judge each test file: every case that sets the team's resurrection reads the state of version 8; its reason; every `decision:` / `invariant:` line quotes the foundation word for word from the start of a sentence (the foundation check must report no error for these files; run it); failing tests in `tests/view/*` stand by the plan.
- Sample the rules by your own checks against the built game: the clock when the stock is full and a death spends a use (starts it), a death while the clock runs (leaves it), uses returning one at a time, a first solving returning one use while the stock is not full, a completion at the moment of a return, the order of deaths in the catch-up (D-240: the death of each character finds the uses and the clock as the characters earlier on the list left them, a clock started by a death settled earlier never moves back), the open game's earlier death in real time takes the last use (D-242). Mutation testing (StrykerJS) on `game.ts`'s changed ranges and `loop.ts`/`balance` ranges is welcome if `tests/sim` and `tests/balance` are green now.
- Your report's first line is `PASS <sha>` or `FAIL <sha>`; grade findings; mark a finding that contradicts a settlement of the task with `Contradiction: yes`.
