# Handoff - executor of slice(s) 6 of the task `zapas-i-wskrzeszenie`

The person who requested the cycle has delegated intermediate choices to the orchestrator; no answer you get is that person's approval. Your reply goes to the orchestrator only.

## Where and what

- Worktree (work from its root, never from the main checkout): `the root of the task's worktree`, branch `task/zapas-i-wskrzeszenie`. The pinned the-way stands in `.the-way` there. Dependencies are installed (`npm ci` ran).
- Your method: `.the-way/task-cycle/change/SKILL.md` by its path in the worktree's `.the-way`; read it whole, and a file it names only when the step or variant that names it comes. Do not call a skill. Your variant: "a slice, or the retry of a slice".
- Your stage and its boundary: Make the slice below, commit it by path (`git add <file> ...`, never `git add -A`; commit messages in English, like the commits of the repository, with its `type: :emoji:` form), run the focused checks of its *Checks* and return. Make no other slice and no change outside the slice's *Change*, and run **no full gate** (`npm test` without a file): the gate is the orchestrator's or CI's.
- Base of your slice: `fc64661c`.
- Frozen task: `.runs/task-cycles/zapas-i-wskrzeszenie/task.md` (the passages your section needs are copied below; read the rest of it only if a passage sends you to it). Plan: `.runs/task-cycles/zapas-i-wskrzeszenie/plan.md` (its other slices are not yours). Spec: none.
- Answers of step 4 of the cycle: trust boundary - **yes** (`src/browser/sim/saved-game.ts`: the saved shape of the team's resurrection and the load's checks; check crafted input there: counts above the data's, negative or non-finite numbers, a moment standing with no use spent or missing with some spent, wrong types); irreversible operation - **no**. No open design choice; no reserved choice. The pin of the-way is not moved.
- Your directory for working copies: `.runs/slice-06-executor/` (directly under the ignored `.runs/` of the worktree).
- Your report: `.runs/task-cycles/zapas-i-wskrzeszenie/reports/slice-06-executor-report.md`. The report file is the input of the cycle's scripts (`task-cycle/remarks_check.py` reads it), the case the harness's note about files named `report...` leaves open. Where you are refused the write all the same, return the report whole as your answer. Its first line is yours as your method gives it; it holds besides what your method gives **Unread material** (what this handoff names that stayed unread or was read in part, or `none`) and **Searches not found or unclear** (each thing looked for and not found or unclear, or `none`).
- `cycle.md` and the other files of the cycle's record directory - other agents' handoffs, reports and findings - are not yours to read unless this handoff names them.
- Other tools of the cycle: the product's guidelines say tests run as `npm test -- <one test file>`; never run `npm test` bare.

Working copies - copied word for word from the cycle:

> An agent of the cycle that makes a working copy to check something — a worktree of a commit, a clone, a script, a screenshot, a prepared input of a test — makes it in a directory of its own directly under the ignored `.runs/` of the task's worktree, the directory its handoff names; never in the system's temporary directory, in the scratch directory of a session or in the main checkout of the repository. The screenshot that a screenshot tool, such as the Playwright server, saves by itself under its session's directory is moved into the agent's directory and the original removed, except a screenshot that is shown to the human: that one goes where `task-cycle/change/ui_check.md` says, to the place the product's foundation settles for screenshots, and into the agent's directory only where no such place is settled. The files that a product's own tools and tests make by themselves are no working copy of the agent and stay outside this rule. Before the agent returns, each time it returns, it removes its copy — a worktree with `git worktree remove --force`, then `git worktree prune` — keeps in `reports/` beside its report what the report needs, and states in the report where each copy stood and that it was removed. Where a removal fails, the agent finishes all the same and names in the report the remainder, with its full path and the reason it stayed. It removes a copy, as any directory, by its path written out in full in the command, never through a shell variable: an empty variable turns the removal on the directory the shell stands in.

## The slice (copied word for word from the plan)

### Slice 6 — The team's resurrection has uses

- **Goal:** The team holds the count of uses spent and not yet returned, and the real moment the
  next one returns, which stands exactly while that count is above zero (question 15); the game's
  data hold the count of uses, 3, and the renewal of one use, 240 real minutes (question 4), the
  renewal keeping its key `resurrectionRenewalRealMinutes` and the count a key of its own; a new game
  starts with the full count (row 5). The rules of To do item 3 and questions 3 and 5 hold in
  `game.ts`: the uses that returned up to a moment, that moment included, count before anything is
  settled at it; the death of a character with practice spends one use while one is left, the
  death that spends one with the stock full starting the clock at its moment and a death with the
  clock running leaving it as it is; at zero it takes everything as today; a character with no
  practice spends none; each use returns the renewal after the clock started or after the use before
  it, and the clock stops when the stock is full; a first solving of a map the account has not solved
  returns one use while the stock is not full and leaves the clock running, and stops it when the
  stock fills; the settlement of a death that spent a use holds the uses left after it (question 6);
  a death settled later in the catch-up never moves back a clock an earlier-settled death started
  (D-240). The function of Slice 5 and `resurrectionReady` (a use left at the moment) follow the new
  shape, so the view and the instrument still compile and run. The load reads the new team strictly
  and refuses a count above the data's count, a moment standing with no use spent or missing with
  one spent, and a settlement whose uses left exceed the data's count; `SAVED_GAME_VERSION` goes from
  7 to 8; the list of what the load checks against the data in `guidelines/coding-saved-game.md`
  gains the count of uses (question 15). The new rules are tested first in
  `tests/sim/team.test.mjs`, among them a game state these rules make loading back from its saved
  document, and its `decision:` lines of D-220 quote the sentence as Slice 1 left it. Tests that set the old field or expect one resurrection fail until their slices: Slice 7
  (`tests/sim/saved-game.test.mjs`), Slice 8, Slice 9, Slice 10 (`tests/balance/`), Slices 12–15,
  17 and 18 (`tests/view/`).
- **Change:** `src/browser/sim/types.ts` · `src/browser/sim/data/balance.ts` ·
  `src/browser/sim/game.ts` · `src/browser/sim/saved-game.ts` · `tests/sim/team.test.mjs` ·
  `guidelines/coding-saved-game.md`
- **Read:** `guidelines/coding.md` · `guidelines/testing.md` ·
  `guidelines/coding-simulation-module.md` · `guidelines/coding-content-data.md` ·
  `.runs/task-cycles/zapas-i-wskrzeszenie/task.md:27-31` To do (items 1–3) ·
  `.runs/task-cycles/zapas-i-wskrzeszenie/task.md:45-79` Questions to settle (questions 2–6) ·
  `.runs/task-cycles/zapas-i-wskrzeszenie/task.md:142-147` Questions to settle (question 15) ·
  `.runs/task-cycles/zapas-i-wskrzeszenie/task.md:154-169` Context · Foundation entries row D-190 ·
  row D-220 · row D-240 · row D-242 · row resurrection-renewal · row resurrection ·
  `foundations/decisions.md:6308-6386` D-219 · D-220 (base) · D-221 ·
  `foundations/decisions.md:4231-4245` D-386 · `foundations/invariants.md:1048-1057` save-version ·
  `foundations/invariants.md:1078-1087` death-settled-once · `foundations/invariants.md:1148-1157`
  catch-up-state · `foundations/part_map.md:33-64` simulation · `foundations/part_map.md:139-157`
  agent-workflow
- **Model:** same — a new shape of the game state across its type, its rules, its data and its load
  at a trust boundary, with returns that depend on the order deaths are settled in.
- **Risk:** trust boundary — `src/browser/sim/saved-game.ts`, the load's check of the team's uses
  and of the settlement of a death against the game's data
- **Checks:** first the cases of `tests/sim/team.test.mjs` that fail on the base (the rules above
  and the round trip of a saved state); then `npm test -- tests/sim/team.test.mjs` ·
  `npm run typecheck` · `npm test -- tests/invariants/test_simulation_isolation.py` ·
  `npm test -- tests/invariants/test_simulation_inputs.py`
- **Depends on:** Slice 2 · Slice 5

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

### task.md lines 27-31

### To do

1. Ręczne przejście mapy już rozwiązanej bierze zapas ze skrzynki jak każde inne wejście na mapę: listę „Zabierz” programu przyciętą tym, co leży w skrzynce, udźwigiem postaci i pułapem wejścia mapy, zdjętą ze skrzynki przy starcie przejścia, także przy „Restart”.
2. Przy domknięciu takie przejście wynosi do skrzynki to, co nazywa zamrożona lista „Wynieś”, przycięte jak przy każdym innym domknięciu, a wprawy dalej nie płaci; okno końca pokazuje po takim domknięciu wiersz D-185 z tym, co trafiło do skrzynki, jak po każdym domknięciu; śmierć, „Zakończ” i „Restart” zabierają to, co postać niosła, jak w każdym przejściu.
3. Wskrzeszenie konta ma liczbę użyć i czas odnowienia jednego użycia, obie w danych gry: nowa gra zaczyna z pełną liczbą użyć, śmierć postaci z wprawą zużywa jedno użycie, póki jakieś zostało, śmierć postaci z wprawą, gdy żadne nie zostało, zabiera wprawę i wykupione stopnie jak dziś, a śmierć postaci bez wprawy nie zużywa żadnego. Na start w danych gry: 3 użycia i 4 godziny czasu realnego odnowienia jednego użycia (pytanie 4). Zużyte użycia wracają po kolei, jedno naraz, na jednym zegarze: śmierć, która zużywa użycie przy pełnym zapasie, puszcza zegar, a śmierć przy zegarze już biegnącym go nie przestawia; jedno użycie wraca po czasie odnowienia od chwili, w której zegar ruszył, każde następne po czasie odnowienia od powrotu poprzedniego, a gdy zapas jest pełny, zegar staje (pytanie 3). Pierwsze rozwiązanie mapy, której konto jeszcze nie rozwiązało, przywraca jedno użycie, póki zapas nie jest pełny, a zegar biegnie dalej bez przestawiania i staje, gdy zapas się zapełni; kolejne rozwiązanie tej samej mapy nic nie przywraca (pytanie 5). Kształt stanu i jego wczytanie — pytanie 15; rozliczenie śmierci, która zużyła użycie, trzyma liczbę użyć, które po niej zostały, bo okno końca mówi o chwili śmierci (pytanie 6), a wczytanie sprawdza ją wobec liczby użyć w danych gry. W nadrabianiu czasu nieobecności śmierci rozlicza się w kolejności listy postaci (D-240): śmierć każdej postaci zastaje liczbę użyć i zegar takie, jakie zostawiły postacie wyżej na liście, także gdy zginęła wcześniej w czasie realnym, a zegar puszczony przez śmierć rozliczoną wcześniej nie cofa się.

### task.md lines 45-79

- Pytanie 2. Czy czekanie na wskrzeszenie (osiem godzin realnych, D-190) zostaje, skoro nieobecność nie może być wymagana?
  - Answer: Wskrzeszenie zmienia kształt w dwóch etapach. W tym projekcie konto dostaje od początku gry wskrzeszenie o liczbie użyć i czasie odnowienia jednego użycia, zapisanych w danych gry; to liczby konta, nie przedmiot w plecaku ani w wyposażeniu postaci, a słowo „artefakt” jest sprawą nazwy i wyglądu. Liczby ustala doprecyzowanie tego zadania (pytania 3, 4 i 5). Drugi etap — przywracanie użycia wytwarzaniem — nie wchodzi do tego projektu.
  - Not chosen:
    - Zostaje bez zmian, osiem godzin realnych albo pierwsze rozwiązanie nowej mapy — po każdej śmierci na ścianie ostrożny gracz czeka do ośmiu godzin, a ocena programu na ziarnach zmniejsza liczbę porażek, ale nie czekanie po porażce.
    - Stawka tylko w pętli: śmierć w przejściu ręcznym zabiera to, co postać niosła, i nic więcej — zmienia D-190, które ten wariant odrzuciło („one event would be two different deaths, everything risky would be done by hand and the stake would vanish where it matters most”), oraz D-216 i D-217; ręczna próba ściany traci stawkę dorobku, a jedno zdarzenie, śmierć, ma dwa różne skutki.
    - Krótszy zegar: reguła zostaje, zmienia się jedna liczba w danych gry — czekanie zostaje, tylko krótsze, więc czas realny dalej jest ceną postępu.
    - Kształt Mariusza bez dalszej drogi przez wytwarzanie — jedna zmiana i koniec; zegar zostaje ceną na stałe.
    - Od razu pełny wytwarzany przedmiot — da się dopiero po zadaniach 5 i 10, a do tego czasu obowiązuje dzisiejsze osiem godzin.
    - Wskrzeszenie jako prawdziwy przedmiot z własnymi liczbami — czekałby na zadania 8 i 10.
  - Source: human, 2026-11-20: „2d, ale nie jestem pewny jak by miało być to wytwarzane - raczej nie będzie na to zasobów na tak początkowym etapie gry i może to być np. przedmiot z ograniczoną ilością użyć i czasem odnowienia, który dostajemy z odpowiednimi parametrami na początku gry; co myślisz?”; „1. nie sądzę, żeby później nastąpiło w ramach tego projektu; wskrzeszenie to bardzo potężny artefakt nie? nie może być craftowany na poczatku gry z piórek i jajek ale tak, dwa etapy, tylko drugi nie będzie robiony teraz”; „4 niech będzie a, chociaż mam wrażenie, że próbowałeś mnie przekonać do czegoś odwrotnego” (pytanie, czy wskrzeszenie jest w tym projekcie przedmiotem). Pytanie stoi w planie przy tym zadaniu (plan_projektu_2_loop2.md, „Open questions”, sha256 94b740a8feff35d2, pierwsze 16 znaków).
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
- Pytanie 6. Jakie brzmienia mają napisy z pozycji 4 listy „To do”?
  - Answer: Jedno słowo w napisach: drużyna ma jedno „wskrzeszenie drużyny”, które ma „użycia”. Liczby 3 i 4 w napisach pochodzą z danych gry.
    - Wiersz przy postaci — na karcie w Siedzibie, na ekranie Postać i w „Kto idzie” na karcie mapy: przy pełnym zapasie „Wskrzeszenie drużyny: użycia 3 z 3” w `text-secondary`; przy części „Wskrzeszenie drużyny: użycia 1 z 3, następne za 3 godz. 10 min czasu realnego” w `text-secondary`; przy zerze „Wskrzeszenie drużyny: użycia 0 z 3, następne za 3 godz. 10 min czasu realnego — śmierć zabierze wprawę i wykupione stopnie” w `danger`. Czas poniżej godziny i zaokrąglanie minut — jak dziś w D-217.
    - Okno końca przejścia, po śmierci, która zużyła użycie, w `text-secondary`: „Zużyte jedno użycie wskrzeszenia drużyny: wprawa z tego przejścia przepada, wcześniejsza i wykupione stopnie zostają. Po tej śmierci zostały użycia 2 z 3; zużyte wracają po kolei, jedno co 4 godziny czasu realnego, a jedno od razu przy pierwszym rozwiązaniu nowej mapy.” Liczba użyć mówi o chwili śmierci, a nie o chwili czytania, bo okno stoi do „Restart” albo „Zakończ”, także po ponownym wczytaniu gry; bieżącą liczbę pokazuje wiersz przy postaci.
    - Okno końca, po śmierci, gdy żadne użycie nie było gotowe, w `danger`: „Wskrzeszenie drużyny nie miało żadnego użycia: postać straciła całą wprawę i wykupione stopnie. Teraz to pokolenie {n}.”
    - Okno końca, po śmierci postaci bez wprawy, w `text-secondary`: „Postać nie miała jeszcze wprawy, więc śmierć nie zabrała drużynie żadnego użycia wskrzeszenia.”
    - Okno końca, po pierwszym rozwiązaniu, które przywróciło użycie, w `text-secondary`: „Wróciło jedno użycie wskrzeszenia drużyny: pierwsze rozwiązanie tej mapy.”; rozwiązanie, które zastaje pełny zapas, nie pokazuje żadnego wiersza.

### task.md lines 142-147

- Pytanie 15. Jak stan gry trzyma użycia wskrzeszenia i co robi wczytanie zapisu, który nie zgadza się z danymi gry?
  - Answer: Stan gry trzyma liczbę użyć zużytych i jeszcze niewróconych oraz chwilę powrotu następnego, która stoi wtedy i tylko wtedy, gdy ta liczba jest większa od zera. Wczytanie odmawia zapisowi z liczbą zużytych większą niż liczba użyć w danych gry albo z chwilą niezgodną z tą liczbą, jak każdej wartości spoza granic danych (`guidelines/coding-saved-game.md`: „a wszystko, czego nie dopuszczają typy stanu gry, listy zamknięte i dane, to `shape`”; „Wolno odmówić więcej, niewolno mniej.”), a lista granic danych w tych wytycznych („Wczytanie sprawdza też wobec danych: …”) dostaje liczbę użyć wskrzeszenia. Skutek dla gracza przy późniejszej poprawce liczb: podniesienie liczby użyć zachowuje każdy zapis i od razu daje każdemu dodatkowe użycie; obniżenie odrzuca jako uszkodzony tylko zapis, w którym zużytych jest więcej niż nowa liczba.
  - Not chosen:
    - Stan trzyma liczbę użyć pozostałych — przy każdej zmianie liczby użyć w danych gra odrzuca zapisy, przy podniesieniu wszystkie z pełnym zapasem.
    - Wczytanie przycina liczbę do danych zamiast odmówić — naprawia stan, czego wytyczne zapisu zabraniają („Brakujących kluczy nie uzupełniaj. … Przy błędzie nie zwracaj części stanu.”).
  - Source: human, 2026-11-20, przez doradcę dnia jak przy pytaniu 13: „24: …, 3 ok, …”, „Przy 3: pamiętanie zużytych użyć jest tańsze dla zapisów graczy przy strojeniu w zadaniu 6.” — ustalenie domyślne bez weta (pokazane jako 24.3 w turze 10, odpowiedź w turze 11); odmowa przy niezgodności z danymi wynika z wytycznych zapisu; lista decyzji, pozycja 3.

### task.md lines 154-169

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

## Foundation, guidelines and code named in *Read*

Read each guideline file named whole. Each foundation entry named by its identifier or its heading is read whole by the range from its heading to the next heading of any level. The line ranges in the plan's *Read* are those of the base commit `46cfec71`; earlier slices and the foundation step may have moved them, so find each entry by its identifier or heading, and where the numbers differ the entry you find holds.

## Extra from the orchestrator

- Slices 1-5 are made: foundation (`3647bb19`, `f30dffb7`), slice 2 `814cb8b1`, slice 3 `74652031` + `a007dd9b`, slice 4 `0fde9df0`, slice 5 `fc64661c` (`resurrectionAt(team, nowMs)` in `game.ts`, returning `{ usesLeft, nextReturnMs }`; `resurrectionLine` in `team-lines.ts` reads the team only through it). Your *Goal* says "the function of Slice 5 and `resurrectionReady` follow the new shape": keep `resurrectionAt`'s result type and name unless a rule of the plan cannot be made through it.
- `tests/view/team-lines.test.mjs` still builds a team as a plain object with `resurrectionReadyAtMs`; it is slice 12's (the cases that set the old field), not yours; but make sure the view and the instrument compile and the files of your *Checks* pass.
- Trust boundary: `saved-game.ts` is yours here; the review of your slice will craft hostile documents against the load of the team's uses (a count above the data's, a negative or fractional or non-finite count, a moment standing with zero used or missing with some used, a moment that is no safe integer, a settlement whose uses left exceed the data's count). Slice 7 writes the load's refusal tests, but build the refusals here and test the rules of the game's functions first in `tests/sim/team.test.mjs` as your *Checks* say.
- `decision_index.py` takes `--decision D-190`, with the `D-` prefix. Line numbers in the plan are of the base commit: find entries by identifier or heading.
- Failing tests that stand by the plan until later slices: `tests/sim/saved-game.test.mjs` (3128 and every case that sets the old field: slice 7), `tests/sim/death|completion|flow|data` (slice 8), `catch-up|loop` (slice 9), `tests/balance/*` (slice 10), `tests/view/*` (slices 12-15, 17, 18). Your focused checks are those of your *Checks*.
