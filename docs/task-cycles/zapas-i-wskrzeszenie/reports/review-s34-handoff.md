# Handoff - reviewer of slice(s) 3,4 of the task `zapas-i-wskrzeszenie`

The person who requested the cycle has delegated intermediate choices to the orchestrator; no answer you get is that person's approval. Your reply goes to the orchestrator only.

## Where and what

- Worktree (work from its root, never from the main checkout): `the root of the task's worktree`, branch `task/zapas-i-wskrzeszenie`. The pinned the-way stands in `.the-way` there. Dependencies are installed (`npm ci` ran).
- Your method: `.the-way/task-cycle/review/SKILL.md` by its path in the worktree's `.the-way`; read it whole, and a file it names only when the step or variant that names it comes. Do not call a skill. Your variant: "a planned slice, the whole change, ... (the review of the range below)".
- Your stage and its boundary: Review the range below with `review-change`. Read-only: change no file of the repository.
- Base of the range: `814cb8b1`.
- Frozen task: `.runs/task-cycles/zapas-i-wskrzeszenie/task.md` (the passages your section needs are copied below; read the rest of it only if a passage sends you to it). Plan: `.runs/task-cycles/zapas-i-wskrzeszenie/plan.md` (its other slices are not yours). Spec: none.
- Answers of step 4 of the cycle: trust boundary - **yes** (`src/browser/sim/saved-game.ts`: the saved shape of the team's resurrection and the load's checks; check crafted input there: counts above the data's, negative or non-finite numbers, a moment standing with no use spent or missing with some spent, wrong types); irreversible operation - **no**. No open design choice; no reserved choice. The pin of the-way is not moved.
- Your directory for working copies: `.runs/review-s34/` (directly under the ignored `.runs/` of the worktree).
- Your report: `.runs/task-cycles/zapas-i-wskrzeszenie/reports/review-s34-report.md`. The report file is the input of the cycle's scripts (`task-cycle/remarks_check.py` reads it), the case the harness's note about files named `report...` leaves open. Where you are refused the write all the same, return the report whole as your answer. Its first line is yours as your method gives it; it holds besides what your method gives **Unread material** (what this handoff names that stayed unread or was read in part, or `none`) and **Searches not found or unclear** (each thing looked for and not found or unclear, or `none`).
- `cycle.md` and the other files of the cycle's record directory - other agents' handoffs, reports and findings - are not yours to read unless this handoff names them.
- Other tools of the cycle: the product's guidelines say tests run as `npm test -- <one test file>`; never run `npm test` bare.

Working copies - copied word for word from the cycle:

> An agent of the cycle that makes a working copy to check something — a worktree of a commit, a clone, a script, a screenshot, a prepared input of a test — makes it in a directory of its own directly under the ignored `.runs/` of the task's worktree, the directory its handoff names; never in the system's temporary directory, in the scratch directory of a session or in the main checkout of the repository. The screenshot that a screenshot tool, such as the Playwright server, saves by itself under its session's directory is moved into the agent's directory and the original removed, except a screenshot that is shown to the human: that one goes where `task-cycle/change/ui_check.md` says, to the place the product's foundation settles for screenshots, and into the agent's directory only where no such place is settled. The files that a product's own tools and tests make by themselves are no working copy of the agent and stay outside this rule. Before the agent returns, each time it returns, it removes its copy — a worktree with `git worktree remove --force`, then `git worktree prune` — keeps in `reports/` beside its report what the report needs, and states in the report where each copy stood and that it was removed. Where a removal fails, the agent finishes all the same and names in the report the remainder, with its full path and the reason it stayed. It removes a copy, as any directory, by its path written out in full in the command, never through a shell variable: an empty variable turns the removal on the directory the shell stands in.

## The slice (copied word for word from the plan)

### Slice 3 — A manual run of a solved map takes from the chest and brings out to it

- **Goal:** Every manual map run, a run of a solved map and its „Restart” included, takes its
  equipment from the chest through `takeTrip`, clipped as any start; at its completion a run of a
  solved map deposits its frozen bring list clipped as every completion does, and `tripLoot` no
  longer makes an exception of it; such a run still pays no practice and its completion is not
  settled by `settleCompletion`; death, „Zakończ” and „Restart” lose what the character carried as
  in any run (To do items 1, 2). `takeFromNowhere`, `sendTake` with no chest and `clippedTake` stay
  exported and unchanged, since the view still calls them; Slice 16 removes them. The comments of
  `solvedMapRun` and `deposited` in `types.ts`, of `startRun` and `advanceMinutes` in `game.ts` and
  of `trip.ts` say what holds now. In `tests/sim/trip.test.mjs` and `tests/sim/run-record.test.mjs`
  each case that expects the old rule is rewritten with its reason (Foundation entries rows D-189,
  D-214, `solved-map-manual-run`, `trip-transfer`, `trip-run-end`), and each `decision:` line
  quoting a sentence Slice 1 rewrote quotes the sentence as it stands now.
- **Change:** `src/browser/sim/game.ts` · `src/browser/sim/trip.ts` · `src/browser/sim/types.ts` ·
  `tests/sim/trip.test.mjs` · `tests/sim/run-record.test.mjs`
- **Read:** `guidelines/coding.md` · `guidelines/testing.md` ·
  `guidelines/coding-simulation-module.md` · `.runs/task-cycles/zapas-i-wskrzeszenie/task.md:27-30`
  To do (items 1, 2) · `.runs/task-cycles/zapas-i-wskrzeszenie/task.md:39-44` Questions to settle
  (question 1) · `.runs/task-cycles/zapas-i-wskrzeszenie/task.md:154-158` Context · Foundation
  entries row D-189 · row D-179 · row D-214 · row solved-map-manual-run · row trip-transfer · row
  trip-run-end · `foundations/decisions.md:7044-7062` D-194 · `foundations/decisions.md:8407-8419`
  D-183 · `foundations/decisions.md:8435-8489` D-185 · D-186 · D-187 ·
  `foundations/glossary.md:136-153` manual map run · completion · solved map ·
  `foundations/part_map.md:33-64` simulation
- **Model:** cheaper
- **Risk:** none
- **Checks:** first the cases of `tests/sim/trip.test.mjs` that fail on the base: a run of a solved
  map takes from the chest, deposits its bring list at its completion, and a „Restart” after the
  solving completion takes from the chest; then `npm test -- tests/sim/trip.test.mjs` ·
  `npm test -- tests/sim/run-record.test.mjs` · `npm test -- tests/sim/saved-game.test.mjs` ·
  `npm test -- tests/sim/completion.test.mjs` · `npm test -- tests/balance/agreement.test.mjs`; and
  `npm test -- tests/view/trip.test.mjs` · `npm test -- tests/view/world-area.test.mjs` ·
  `npm test -- tests/view/end-window-game.test.mjs`, where a case that expects the old rule may fail
  until Slice 15, 17 or 14 changes its file; and `npm test -- <file>` for each other file of
  `tests/sim/` and `tests/view/` that starts a manual run on a solved map. The report names each
  failing case and the slice that changes its file, or names it as a case no slice of the plan
  changes, for the orchestrator to place.
- **Depends on:** Slice 1 · Slice 2

### Slice 4 — Measurement: can each map be solved with what the maps before it gave

- **Goal:** The balance instrument has a mode, through the game's own functions, that for Skraj
  lasu, Las and Las — głębiej builds the state question 13 gives — practice from the first
  solvings of the maps before, each by the best reference program of that map (median of the
  solved runs on seeds 1–500), ranks bought from that practice in the branches the measured program
  needs, and the stock of the measured program's take list brought out by manual runs of solved
  maps within the chest's capacity, with the number of such runs — and measures every reference
  program from it on seeds 1–500, the map counting by its best program; its table is the one
  question 14 gives (the columns of D-428 without the earning loop's balance, programs as `P1`,
  `P2`, …, one sentence under the table, the number of manual runs included, naming no skill,
  branch, rank or item). You choose how the mode builds that state — the campaign extended, a sweep
  from a given state, or another way through the game's functions (task "Questions carried to
  cycle") — and name the choice in your report. The new file of code follows the rules of its kind
  in the meanings of question 11: numbers of the game from the built game, reference programs from
  `tests/sim/reference-programs.mjs`, the shared things imported from where they stand, the table
  given as data and written only by `balance/cli.mjs` under `--out`, a fixed clock and the
  measurement's seeds; it opens with a comment that says what it is and names the invariant
  `instrument-game-agreement`, refuses a map the game's data lacks, and gets a row `copy` in the
  table "Files of this kind" of `guidelines/coding-balance-instrument.md`. `balance/cli.mjs` gets
  the command, and both copies of the skill `loop2-balance`, byte for byte alike, describe it. Then
  run the command for the three maps on seeds 1–500, write its table with `--out` into your working
  directory under `.runs/` that your handoff names, commit no result (D-429), and put the table and
  its sentence in your report. Stop rule: where the best program of a map solves fewer than 20% of
  the seeds (question 7), say so first in your report; the orchestrator then stops the cycle before
  Slice 5, and the matter goes back through Mariusz to the plan of the project. Change no number of
  a map.
- **Change:** `balance/progression.mjs` · `tests/balance/progression.test.mjs` · `balance/cli.mjs` ·
  `tests/balance/cli.test.mjs` · `guidelines/coding-balance-instrument.md` ·
  `.claude/skills/loop2-balance/SKILL.md` · `.agents/skills/loop2-balance/SKILL.md`
- **Read:** `guidelines/coding.md` · `guidelines/testing.md` ·
  `.runs/task-cycles/zapas-i-wskrzeszenie/task.md:27-35` To do ·
  `.runs/task-cycles/zapas-i-wskrzeszenie/task.md:87-104` Questions to settle (questions 7–9) ·
  `.runs/task-cycles/zapas-i-wskrzeszenie/task.md:111-141` Questions to settle (questions 11–14) ·
  `.runs/task-cycles/zapas-i-wskrzeszenie/task.md:154-174` Context · Questions carried to cycle ·
  `.runs/task-cycles/zapas-i-wskrzeszenie/task.md:258-262` Out of scope · `balance/engine.mjs` ·
  `balance/check-map.mjs` · `balance/loop.mjs` · `balance/campaign.mjs` ·
  `tests/sim/reference-programs.mjs` · `tests/balance/check-map.test.mjs` ·
  `src/browser/sim/skills.ts` · Foundation entries row (new) May the progression require the
  player's absence? · row D-189 · row D-428 · `foundations/decisions.md:11658-11672` D-427 ·
  `foundations/decisions.md:11688-11702` D-429 · `foundations/decisions.md:888-902` D-437 ·
  `foundations/decisions.md:5912-5930` D-388 · `foundations/decisions.md:5945-5961` D-398 ·
  `foundations/invariants.md:1438-1467` instrument-game-agreement · balance-instrument-file-writes ·
  balance-instrument-repeatability · `foundations/glossary.md:296-306` overlay · wall ·
  `foundations/part_map.md:127-157` balance-tools · agent-workflow
- **Model:** same — a new mode of measurement whose way of building the state the author chooses,
  and whose result can stop the cycle.
- **Risk:** none
- **Checks:** first `tests/balance/progression.test.mjs`, failing on the base: the state built for a
  map on a few seeds through the game's functions, and a table with no condition, action, rule,
  skill or item of a program; then `npm test -- tests/balance/progression.test.mjs` ·
  `npm test -- tests/balance/cli.test.mjs` ·
  `npm test -- tests/invariants/test_balance_instrument_file_writes.py` ·
  `npm test -- tests/invariants/test_balance_instrument_repeatability.py` ·
  `npm test -- tests/invariants/test_cross_part_imports.py` ·
  `npm test -- tests/agent_workflow/test_loop2_balance_skill.py`; then the measurement:
  `npm run balance -- <the command you add> …` for the three maps on seeds 1–500, with `--out`
  under your working directory.
- **Depends on:** Slice 3

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

### task.md lines 27-30

### To do

1. Ręczne przejście mapy już rozwiązanej bierze zapas ze skrzynki jak każde inne wejście na mapę: listę „Zabierz” programu przyciętą tym, co leży w skrzynce, udźwigiem postaci i pułapem wejścia mapy, zdjętą ze skrzynki przy starcie przejścia, także przy „Restart”.
2. Przy domknięciu takie przejście wynosi do skrzynki to, co nazywa zamrożona lista „Wynieś”, przycięte jak przy każdym innym domknięciu, a wprawy dalej nie płaci; okno końca pokazuje po takim domknięciu wiersz D-185 z tym, co trafiło do skrzynki, jak po każdym domknięciu; śmierć, „Zakończ” i „Restart” zabierają to, co postać niosła, jak w każdym przejściu.

### task.md lines 39-44

- Pytanie 1. Co kosztuje nieudana próba ściany gracza, który nie chce czekać — skąd bierze on drugi raz rzecz, o którą ściana pyta?
  - Answer: Zapas zdobywany grą. Ręczne przejście mapy już rozwiązanej bierze zapas ze skrzynki i wynosi przedmioty do skrzynki, a wprawy dalej nie płaci. Nieudana próba ściany kosztuje wniesiony zapas, a po następny gracz idzie sam na rozwiązaną mapę albo czeka na pętlę.
  - Not chosen:
    - Rzecz zawsze na samej ścianie: to, o co ściana pyta, albo jego składniki da się zebrać i zrobić w jej własnym przejściu, a skrzynka tylko ułatwia — bez zmiany reguł gry, ale nieudana próba nie kosztuje wtedy nic poza pół minuty, więc ściana pada po kilku ponowieniach bez rzeczy, o którą pyta, a ściany starego Loopa oparte na „przynieś z innej mapy” trzeba ułożyć inaczej.
    - Czas, jak dziś: zapas ponad jednorazową wypłatę daje tylko pętla, a zasada o nieobecności dotyczy pierwszej próby, nie powtórek — po każdej porażce ze stratą zapasu gracz czeka godziny, a zastrzeżenie trzeba dopisać do zatwierdzonego wpisu definicji, czyli wrócić do definicji i ją ponownie zatwierdzić.
  - Source: human, 2026-11-20, „1a” (pytanie pokazane Mariuszowi jako 1 w doprecyzowaniu zadania 1 planu; zapis w dokumencie zadania `zadanie_szkielet_progresji_loop2.md`, pytanie 3)

### task.md lines 154-158

## Context

- Kod gry (commit ba67f045; do commitu fec2ae7e, scalenia zadania 23, pliki `src/` się nie zmieniły): `startRun` w `src/browser/sim/game.ts` (około wiersza 280) bierze wyposażenie przejścia mapy rozwiązanej znikąd (`takeFromNowhere`) i oznacza przejście `solvedMapRun`; `tripLoot` w `src/browser/sim/trip.ts` zwraca dla oznaczonego przejścia pustą listę, a rozliczenie domknięcia w `game.ts` płaci wprawę i wkłada łup tylko przejściu nieoznaczonemu.
- Wskrzeszenie trzyma dziś jedna liczba stanu gry, `resurrectionReadyAtMs` w typie `Team` (`src/browser/sim/types.ts`), a czas odnowienia `resurrectionRenewalRealMinutes: 480` w `src/browser/sim/data/balance.ts`; zużycie liczy `teamAfterDeath`, a odnowienie po pierwszym rozwiązaniu `settleCompletion`, obie w `game.ts`.
- Napisy stoją w `src/browser/view/trip-lines.ts` (wiersz przejścia mapy rozwiązanej, ostrzeżenie pod „Wejdź”, wiersz „Wejdzie: …”, który dla mapy rozwiązanej liczy dziś bez skrzynki), `src/browser/view/team-lines.ts` (wiersz wskrzeszenia przy postaci) i `src/browser/view/end-window-lines.ts` (okno końca przejścia).

### task.md lines 27-35

### To do

1. Ręczne przejście mapy już rozwiązanej bierze zapas ze skrzynki jak każde inne wejście na mapę: listę „Zabierz” programu przyciętą tym, co leży w skrzynce, udźwigiem postaci i pułapem wejścia mapy, zdjętą ze skrzynki przy starcie przejścia, także przy „Restart”.
2. Przy domknięciu takie przejście wynosi do skrzynki to, co nazywa zamrożona lista „Wynieś”, przycięte jak przy każdym innym domknięciu, a wprawy dalej nie płaci; okno końca pokazuje po takim domknięciu wiersz D-185 z tym, co trafiło do skrzynki, jak po każdym domknięciu; śmierć, „Zakończ” i „Restart” zabierają to, co postać niosła, jak w każdym przejściu.
3. Wskrzeszenie konta ma liczbę użyć i czas odnowienia jednego użycia, obie w danych gry: nowa gra zaczyna z pełną liczbą użyć, śmierć postaci z wprawą zużywa jedno użycie, póki jakieś zostało, śmierć postaci z wprawą, gdy żadne nie zostało, zabiera wprawę i wykupione stopnie jak dziś, a śmierć postaci bez wprawy nie zużywa żadnego. Na start w danych gry: 3 użycia i 4 godziny czasu realnego odnowienia jednego użycia (pytanie 4). Zużyte użycia wracają po kolei, jedno naraz, na jednym zegarze: śmierć, która zużywa użycie przy pełnym zapasie, puszcza zegar, a śmierć przy zegarze już biegnącym go nie przestawia; jedno użycie wraca po czasie odnowienia od chwili, w której zegar ruszył, każde następne po czasie odnowienia od powrotu poprzedniego, a gdy zapas jest pełny, zegar staje (pytanie 3). Pierwsze rozwiązanie mapy, której konto jeszcze nie rozwiązało, przywraca jedno użycie, póki zapas nie jest pełny, a zegar biegnie dalej bez przestawiania i staje, gdy zapas się zapełni; kolejne rozwiązanie tej samej mapy nic nie przywraca (pytanie 5). Kształt stanu i jego wczytanie — pytanie 15; rozliczenie śmierci, która zużyła użycie, trzyma liczbę użyć, które po niej zostały, bo okno końca mówi o chwili śmierci (pytanie 6), a wczytanie sprawdza ją wobec liczby użyć w danych gry. W nadrabianiu czasu nieobecności śmierci rozlicza się w kolejności listy postaci (D-240): śmierć każdej postaci zastaje liczbę użyć i zegar takie, jakie zostawiły postacie wyżej na liście, także gdy zginęła wcześniej w czasie realnym, a zegar puszczony przez śmierć rozliczoną wcześniej nie cofa się.
4. Napisy gry o ręcznym przejściu mapy rozwiązanej i o wskrzeszeniu mówią to, co po zmianie obowiązuje: wiersz na ekranie takiego przejścia, wiersz wskrzeszenia przy postaci na karcie w Siedzibie, na ekranie Postać i w „Kto idzie” na karcie mapy oraz wiersze o wskrzeszeniu w oknie końca przejścia; wiersz „Wejdzie: …” nad „Wejdź” na mapie rozwiązanej liczy, jak na każdej innej, z tym, co leży w skrzynce; ostrzeżenie pod „Wejdź” na mapie rozwiązanej, że próba weźmie zapas, którego pętla nie dostanie, znika, bo próba i pętla biorą teraz ze skrzynki to samo. Brzmienia stoją w odpowiedzi na pytanie 6, a forma liczby godzin z danych gry — w odpowiedzi na pytanie 16. Wytyczne wyglądu `guidelines/styleguide-browser-view.md` mówią to samo co napisy po zmianie: w części o ekranie Mapy znika ostrzeżenie pod „Wejdź” i numer D-251 z jej listy decyzji, a zdania o roli wiersza wskrzeszenia („a gdy wskrzeszenie nie jest gotowe, w `danger` (D-217)”) i o wierszu okna końca („`danger`, gdy wskrzeszenie nie było gotowe (D-185, D-216)”) mówią o użyciach.
5. Przyrząd balansu liczy wskrzeszenie z liczbą użyć funkcjami gry, bez własnego liczenia powrotów: pętla i sprawdzenie mapy startują z pełną liczbą użyć, jak nowa gra; przełącznik `--no-resurrection` startuje bez żadnego — wszystkie użycia zużyte, zegar puszczony w chwili startu pętli — a potem użycia wracają jak w grze, tak jak dziś wraca zużyte wskrzeszenie; gracz kampanii, który przed próbą następnej mapy czeka na wskrzeszenie, próbuje, gdy zostało choć jedno użycie. Opis przełącznika w `balance/cli.mjs` i w obu kopiach skilla `loop2-balance` mówi o użyciach. Kod przyrządu zmieniany w pozycjach 5 i 6 trzyma się wytycznych rodzaju `balance-instrument` w znaczeniach z odpowiedzi na pytanie 11, a każdy nowy plik kodu w `balance/` dostaje wiersz w tabeli „Files of this kind” w `guidelines/coding-balance-instrument.md`.
6. Pomiar przyrządem balansu na trzech mapach gry — Skraj lasu, Las i Las — głębiej — pokazuje, czy każdą da się rozwiązać tym, co dały mapy przed nią: wprawą z pierwszych rozwiązań wcześniejszych map, zapasem wyniesionym z map rozwiązanych ręcznymi przejściami i najlepszym programem wzorcowym, bez pętli zarobkowej; Mariusz dostaje wynik jako tabelę bez treści programów. Mapa „da się rozwiązać”, gdy najlepszy program wzorcowy rozwiązuje ją na co najmniej 20% z 500 ziaren; ten próg jest tylko warunkiem zatrzymania tego zadania (pytanie 7). Stan, z którym pomiar wchodzi na każdą mapę, i wybór najlepszego programu — pytanie 13; postać tabeli — pytanie 14.
7. Fundament dostaje wpis rzutowany „(new) — May the progression require the player's absence?” w brzmieniu przytoczonym w „Decisions in play”, a decyzje, niezmienniki i hasło słownika wymienione tam jako zmieniane mówią to, co ta zmiana wprowadza. D-251 wychodzi z dziennika decyzji na listę wycofanych numerów, bez następcy, a ta sama zmiana przepisuje każde odwołanie do niego — w D-189 i D-329, w wytycznych wyglądu, w komentarzach `src/browser/maps-screen.css`, `src/browser/view/maps-screen.tsx` i `src/browser/view/trip-lines.ts` oraz w testach, które go wymieniają albo trzymają wierszem `decision:` (szablon decyzji the-way, `.the-way/elements/decisions/template.md`: „A decision no longer needed leaves the log in the change that ends it: its number goes to the list of withdrawn numbers, and that change rewrites every reference to it”).

### task.md lines 87-104

- Pytanie 7. Kiedy w pomiarze z pozycji 6 listy „To do” mapa „da się rozwiązać” i czy ta miara wiąże też mapy kolejnych zadań planu?
  - Answer: Co najmniej 20% ziaren, tylko jako warunek zatrzymania tego zadania. Co wpis o nieobecności poda jako swoje sprawdzenie dla następnych map, ustala cykl tego zadania, a Mariusz zobaczy to przy scaleniu. Próg 20% to wyprowadzenie z wpisu definicji o ścianie („in the order of 20–30% of its map runs”), nie zdanie definicji; mapa na samym progu przy trzech użyciach zostawia ostrożnego gracza w połowie posiedzeń (51%) bez sukcesu i bez użyć.
  - Not chosen:
    - Co najmniej 20% ziaren i ta sama miara w fundamencie dla każdej następnej mapy, wiążąca zadania 3, 4, 6, 9, 13, 14 i 16 — jedna miara na cały projekt od razu, ale ustalona przed zmierzeniem pierwszej ściany.
    - Wyższy próg, na przykład co najmniej 50% ziaren, tylko w tym zadaniu — gracz bez sukcesu i bez użyć w jednym posiedzeniu na osiem, ale praca łatwiej staje: Las — głębiej może go nie spełnić, a wtedy sprawa wraca do planu, zanim ruszą zadania czekające na to zadanie.
    - Próg Mariusza — droga otwarta, bez kosztu w pytaniu.
  - Source: human, 2026-11-20, przez doradcę dnia jak przy pytaniu 3: „24: 1a 2a 3a 4a, reszta ok” (pytanie pokazane jako 24.4; tura 6, Q5)
- Pytanie 8. Które zadanie zapisuje do fundamentu zasadę, że postęp nie wymaga nieobecności gracza?
  - Answer: To zadanie. Zasada wchodzi do fundamentu razem z regułą ręcznego przejścia, która ją spełnia; zadanie 1 planu zapisuje już tylko pojęcie ściany.
  - Not chosen:
    - Zadanie 1 planu — zadanie 24, a za nim cały łańcuch map, czeka wtedy na przyjęcie tabeli szkieletu progresji.
  - Source: human, 2026-11-20: „do pozostałych nie mam uwag”, a na odczytanie tego jako wariantu a: „3. dobrze zrozumiałeś”
- Pytanie 9. Skąd ma się brać wprawa wymagana do przechodzenia kolejnych map?
  - Answer: Wystarcza wprawa z pierwszych rozwiązań. Każda mapa wymaga wprawy, przedmiotów i wyposażenia, ale tej wprawy, którą dały wcześniejsze mapy; pętla ułatwia, ale nie jest konieczna. Zatwierdzony wpis o nieobecności gracza zostaje, jak stoi w definicji.
  - Not chosen:
    - Wprawę płaci też ręczne przejście rozwiązanej mapy — zmienia odpowiedź na pytanie 1 i D-189, którego uzasadnienie odrzuciło płacenie za każde domknięcie.
    - Wymagana wprawa z pętli, a zasada ogranicza czekanie — zmiana zatwierdzonego wpisu definicji przez jej ponowne zatwierdzenie, a w małej skali to, co Mariusz nazwał „pomyłką ogromną”.
  - Source: human, 2026-11-20, „1a”, po swoich słowach „no właśnie wprawa powinna być wymagana do przechodzenia kolejnych map razem z lepszymi przedmiotami i przygotowanym za wczasu wyposarzeniem”

### task.md lines 111-141

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
- Pytanie 13. Z jakim stanem pomiar z pozycji 6 listy „To do” wchodzi na każdą mapę i który program wzorcowy liczy się jako najlepszy?
  - Answer: Ze stanem hojnym dla mapy. Wprawa: ta, którą płacą pierwsze rozwiązania map przed nią, każde zrobione najlepszym programem wzorcowym tamtej mapy, mediana z rozwiązanych przejść na ziarnach 1–500. Stopnie: wykupione z punktów tej wprawy w gałęziach, których potrzebuje mierzony program, jak daleko punkty sięgają. Zapas: lista „Zabierz” mierzonego programu, o ile ręczne przejścia map już rozwiązanych pozwalają ją wynieść w pojemności skrzynki (60 sztuk); wynik podaje, ile takich przejść trzeba, a ich liczba nie jest warunkiem zatrzymania. Z tego stanu każdy program wzorcowy jest mierzony na ziarnach 1–500, a mapa liczy się przez najlepszy z nich. Jak cykl zbuduje ten stan w przyrządzie — rozszerzeniem kampanii czy przemiataniem z podanym stanem — wybiera cykl. Niepowodzenie przy takim stanie jest pewnym sygnałem, że mapa wymaga pętli; zaliczenie może przepuścić mapę, którą gracz bez równie dobrego programu przechodzi rzadziej.
  - Not chosen:
    - Jeden program wzorcowy dla całego łańcucha map — surowiej: mapa może nie zdać tylko dlatego, że program dobry na wcześniejszą nie pasuje do późniejszej.
    - Stan budowany osobno dla każdego ziarna, łańcuchem tych samych ziaren przez kolejne mapy — wierniejszy rozrzutowi, ale dłuższy pomiar, a wynik zależy od łączenia ziaren między mapami, którego gra nie ma (każde przejście poza pętlą bierze nowe ziarno, D-22).
    - Wprawa bez wykupionych stopni — program, który potrzebuje gałęzi, mierzy się wtedy blisko zera (skill `loop2-balance`, „A program that needs a branch of the skills measures near zero without it.”), więc pomiar mówiłby o braku stopni, nie o mapie.
  - Source: human, 2026-11-20, przez doradcę dnia (upoważnienie z 16:32): „24: 1 ok, 2 ok, 3 ok, 4 ok. Przy 1: pomiar z wprawą z pierwszych rozwiązań i zapasem wynoszonym ręcznie zgadza się z tym, co Mariusz powiedział w tej rundzie — kolejne mapy mają wymagać wprawy razem z lepszymi przedmiotami i wyposażeniem przygotowanym zawczasu; liczba ręcznych przejść potrzebnych na zapas niech stoi w zdaniu pod tabelą, bo to koszt dla gracza.” — ustalenie domyślne refinera bez weta (pokazane jako 24.1 w turze 10 rozmowy doprecyzowania `.runs/project-refinement/zapas-i-wskrzeszenie.md`, odpowiedź zapisana w turze 11); lista decyzji zostawionych wykonawcy, pozycje 8 i 9. Weto pokazane w turze 10 podawało dwie pierwsze drogi z listy *Not chosen*; trzecia jest odrzuceniem refinera, uzasadnionym tam.
- Pytanie 14. Jak wygląda tabela wyniku pomiaru z pozycji 6 listy „To do”, którą dostaje Mariusz?
  - Answer: Kolumny liczb tabeli sprawdzenia mapy z D-428 bez bilansu pętli zarobkowej — udział rozwiązanych przejść na ziarnach 1–500, mediana minut gry, porażki według przyczyny, przejścia przerwane na limicie — a programy nazwane etykietami `P1`, `P2`. Pod tabelą jedno zdanie, z czym mapa była mierzona, bez nazw umiejętności, gałęzi, stopni i przedmiotów, na przykład „z wprawą i stopniami z pierwszych rozwiązań map przed nią i z zapasem z 4 ręcznych przejść map rozwiązanych”.
  - Not chosen:
    - Tabela D-428 z kolumną bilansu pętli — pomiar jest bez pętli, więc kolumna mówiłaby o czymś, czego pomiar nie dotyczy.
    - Kolumny z wprawą i zapasem, z którymi gracz przyszedł — zdradzałyby, które umiejętności i przedmioty przechodzą mapę, czego tabela nie pokazuje (D-428, *Rationale*: „a program that solves a map would give that person the solution”; skill `loop2-balance`: „Name no branch, no skill and no rank to the person”).
  - Source: human, 2026-11-20, przez doradcę dnia jak przy pytaniu 13: „24: 1 ok, 2 ok, …”, a przy 1: „liczba ręcznych przejść potrzebnych na zapas niech stoi w zdaniu pod tabelą, bo to koszt dla gracza” — ustalenie domyślne bez weta (pokazane jako 24.2 w turze 10, odpowiedź w turze 11); lista decyzji, pozycja 10. Weto pokazane w turze 10 podawało drugą drogę z listy *Not chosen*; pierwsza jest odrzuceniem refinera.

### task.md lines 154-174

## Context

- Kod gry (commit ba67f045; do commitu fec2ae7e, scalenia zadania 23, pliki `src/` się nie zmieniły): `startRun` w `src/browser/sim/game.ts` (około wiersza 280) bierze wyposażenie przejścia mapy rozwiązanej znikąd (`takeFromNowhere`) i oznacza przejście `solvedMapRun`; `tripLoot` w `src/browser/sim/trip.ts` zwraca dla oznaczonego przejścia pustą listę, a rozliczenie domknięcia w `game.ts` płaci wprawę i wkłada łup tylko przejściu nieoznaczonemu.
- Wskrzeszenie trzyma dziś jedna liczba stanu gry, `resurrectionReadyAtMs` w typie `Team` (`src/browser/sim/types.ts`), a czas odnowienia `resurrectionRenewalRealMinutes: 480` w `src/browser/sim/data/balance.ts`; zużycie liczy `teamAfterDeath`, a odnowienie po pierwszym rozwiązaniu `settleCompletion`, obie w `game.ts`.
- Napisy stoją w `src/browser/view/trip-lines.ts` (wiersz przejścia mapy rozwiązanej, ostrzeżenie pod „Wejdź”, wiersz „Wejdzie: …”, który dla mapy rozwiązanej liczy dziś bez skrzynki), `src/browser/view/team-lines.ts` (wiersz wskrzeszenia przy postaci) i `src/browser/view/end-window-lines.ts` (okno końca przejścia).
- Dopisek „wskrzeszenie zużyte” w raporcie „Gdy cię nie było” (`src/browser/view/away-report.ts`, D-246) zostaje prawdziwy i się nie zmienia.
- Przyrząd balansu (commit fec2ae7e): `balance/loop.mjs` w funkcji `startState` sam wpisuje do stanu drużyny chwilę gotowości wskrzeszenia, gdy pętla ma startować ze zużytym wskrzeszeniem (stała `MS_PER_MINUTE`, której przy tym używa, stoi od zadania 23 tylko w `balance/loop.mjs`, a `balance/campaign.mjs` ją stamtąd importuje), `balance/campaign.mjs` czyta gotowość przez `resurrectionReady`, `balance/cli.mjs` ma przełącznik `--no-resurrection`, `balance/check-map.mjs` startuje pętlę z gotowym wskrzeszeniem, opisy graczy w `balance/players/` mają pole `needResurrection`, a skill `.claude/skills/loop2-balance/SKILL.md` i jego kopia w `.agents/skills/loop2-balance/SKILL.md` opisują przełącznik.
- Kampania przyrządu nie ma dziś kroku ręcznego przejścia mapy rozwiązanej po zapas, a jej pętla działa przez całą kampanię; stan, z którym pomiar z pozycji 6 listy „To do” wchodzi na mapę, ustala pytanie 13, a jak przyrząd go buduje, wybiera cykl.
- Pierwsze rozwiązania Skraju lasu i Lasu nie płacą wprawy walki, bo na tych mapach nikt nie napada (D-398, D-388), a Las — głębiej wymaga dwóch odpartych napaści wilka; pomiar z pozycji 6 pokaże, czy wprawa z pierwszych rozwiązań wystarcza.
- Jedyny znany pomiar Lasu — głębiej, zapisany w doprecyzowaniu zadania 1, jest starszy od Skraju lasu i od niższych progów wprawy walki: bez zapasu ze skrzynki 2–6% ziaren, z 12 patykami i 3 jagodami 35–94%, zależnie od programu.
- Jeśli pomiar pokaże, że mapy, która już stoi w grze, nie da się rozwiązać bez pętli, cykl staje, a sprawa wraca przez Mariusza do planu: to zadanie nie zmienia liczb map.
- Zmiana kształtu stanu gry sprawia, że gra odrzuci zapisy sprzed niej w całości; definicja projektu to przyjęła: „każda zmiana kształtu stanu w tym projekcie kasuje zapis” (D-206, D-386).
- Liczby wskrzeszenia zapadają, zanim jakakolwiek ściana zostanie zmierzona; każde użycie to jedna próba ściany, w której gracz ryzykuje tylko wniesiony zapas, więc liczby mogą wymagać poprawki, gdy staną ściany zadań 6, 9, 13 i 14, a poprawka to zmiana liczby w danych gry oraz zdania D-190 i testów, które tę liczbę wymieniają.
- Zadanie 2 planu (ocena programu na ziarnach) czeka na to zadanie i czyta D-189, D-179 i D-251 w brzmieniu, które to zadanie zostawi; uzasadnienie D-190 o braku oceny na wielu ziarnach poprawia zadanie 2.
- Zadania 7, 17 i 18 planu przebudowują ekran postaci, kafelek postaci w Siedzibie i ekran przejścia, na których stoją wiersze tego zadania; plan nie daje im zależności od tego zadania, a cykl, który scali się drugi, przenosi albo przeformułowuje wiersz.
- Na to zadanie czekają w planie zadania 2, 3, 6, 9, 13 i 14; zadanie 23, na które ono czekało, jest scalone (PR #164, commit fec2ae7e).

## Questions carried to cycle

- Co wpis „(new) — May the progression require the player's absence?” podaje w polu *Verification*, które definicja zostawia jako `TODO` — test przyrządu balansu, porównanie przez agenta albo oba? Wybiera cykl (pytanie 7). Test, który przypina udział 20% na mapach, zrobiłby z progu wymaganie dla dalszych map, czego pytanie 7 nie wybrało; test na 500 ziarnach trzech map wydłuża też `npm test`. Pole *Relations* nie jest otwarte: relację zapisuje wpis, który zależy od drugiego (`.the-way/elements/decisions/template.md`, „Relations and precedence”: „is written in the entry that depends on the other”), więc D-189 i D-190 dostają `derives from` nowego wpisu, a nowy wpis wymienia tylko decyzję wyższą, której służy, albo `none`.
- Jak przyrząd buduje stan z pytania 13: rozszerzeniem kampanii o ręczne przejście mapy rozwiązanej po zapas i o gracza bez pętli, przemiataniem ziaren z wprawą, stopniami i zapasem podanymi wprost, czy inaczej?

### task.md lines 258-262

## Out of scope

- Drugi etap wskrzeszenia — przywracanie użycia wytwarzaniem — nie wchodzi do tego projektu (pytanie 2).
- Zmiana liczb map, gdy pomiar z pozycji 6 listy „To do” wyjdzie źle — wraca do planu przez Mariusza.
- Poprawka uzasadnienia D-190 o braku oceny programu na wielu ziarnach — robi ją zadanie 2 planu.

## Foundation, guidelines and code named in *Read*

Read each guideline file named whole. Each foundation entry named by its identifier or its heading is read whole by the range from its heading to the next heading of any level. The line ranges in the plan's *Read* are those of the base commit `46cfec71`; earlier slices and the foundation step may have moved them, so find each entry by its identifier or heading, and where the numbers differ the entry you find holds.

## Extra from the orchestrator

- Range to review: `814cb8b1..0fde9df0` — two commits: `74652031` (slice 3, 5 files: `src/browser/sim/game.ts`, `trip.ts`, `types.ts`, `tests/sim/trip.test.mjs`, `tests/sim/run-record.test.mjs`) and `0fde9df0` (slice 4, 7 files: `balance/progression.mjs`, `tests/balance/progression.test.mjs`, `balance/cli.mjs`, `tests/balance/cli.test.mjs`, `guidelines/coding-balance-instrument.md`, both copies of `.claude/skills/loop2-balance/SKILL.md` / `.agents/skills/loop2-balance/SKILL.md`). Slices 3 and 4 had no review of their own in the plan; this is the orchestrator's grouped review of them (judge each slice against its own section above, and name for each blocking finding the slice it comes from).
- The executors' reports: `.runs/task-cycles/zapas-i-wskrzeszenie/reports/slice-03-executor-report.md` and `slice-04-executor-report.md` (read both whole; slice 4's report holds the measured table and the executor's concerns and choices).
- Slice 3: check every start of a manual map run takes from the chest through the one function (a „Restart” included), the completion of a run of a solved map deposits its frozen bring list clipped as any completion does and pays no practice, death/„Zakończ”/„Restart” lose what was carried, `takeFromNowhere`/`sendTake` with no chest/`clippedTake` stay as the plan says, comments say what holds now; the cases rewritten expect the new rule with their reason and each `decision:`/`invariant:` line quotes the foundation as Slice 1 left it. Three failing cases stand by the plan until later slices (`tests/sim/saved-game.test.mjs:3128` -> slice 7; `tests/view/trip.test.mjs:406` and `tests/view/world-area.test.mjs:239` -> slice 17); run the other focused tests of the slice's *Checks*.
- Slice 4: judge against questions 7, 11, 13, 14 of the task and the rules of the kind `balance-instrument` (`guidelines/coding-balance-instrument.md`: numbers of the game from the game, the shared things imported from where they stand, file written only by `balance/cli.mjs`, fixed clock and the measurement's seeds, comment at the top naming `instrument-game-agreement`, refusal of an unknown map, a row in "Files of this kind"), D-429, D-427. The table must name no skill, branch, rank or item and its sentence must say with what the map was measured (question 14). Check how the executor builds the state (practice from first solvings by the best program of each earlier map, ranks bought, stock by manual runs within the chest's capacity of 60) against question 13, and its three concerns in the report (reuse of the private `renderTable` of `check-map.mjs`; `--programs` changing the best program; a program needing a branch for another reason than an action). Reproduce part of the measurement in your own working copy under `.runs/review-s34/` (for example one map on seeds 1-60 for the best program only) and compare its numbers with the executor's table for plausibility; the measurement is not a gate and may be run.
- Your report's first line is `PASS <sha>` or `FAIL <sha>`; grade findings; mark a finding that contradicts a settlement of the task with `Contradiction: yes`. Note that the measured shares of the best programs (97.4%, 99.4%, 92.4%) all lie above the 20% of question 7, so the stop rule does not stop the cycle; say whether you find a reason to doubt the numbers.
