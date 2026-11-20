# Handoff - reviewer of slice(s) 15,16,17,18 of the task `zapas-i-wskrzeszenie`

The person who requested the cycle has delegated intermediate choices to the orchestrator; no answer you get is that person's approval. Your reply goes to the orchestrator only.

## Where and what

- Worktree (work from its root, never from the main checkout): `the root of the task's worktree`, branch `task/zapas-i-wskrzeszenie`. The pinned the-way stands in `.the-way` there. Dependencies are installed (`npm ci` ran).
- Your method: `.the-way/task-cycle/review/SKILL.md` by its path in the worktree's `.the-way`; read it whole, and a file it names only when the step or variant that names it comes. Do not call a skill. Your variant: "a planned slice, the whole change, ... (the review of the range below)".
- Your stage and its boundary: Review the range below with `review-change`. Read-only: change no file of the repository.
- Base of the range: `16625f50`.
- Frozen task: `.runs/task-cycles/zapas-i-wskrzeszenie/task.md` (the passages your section needs are copied below; read the rest of it only if a passage sends you to it). Plan: `.runs/task-cycles/zapas-i-wskrzeszenie/plan.md` (its other slices are not yours). Spec: none.
- Answers of step 4 of the cycle: trust boundary - **yes** (`src/browser/sim/saved-game.ts`: the saved shape of the team's resurrection and the load's checks; check crafted input there: counts above the data's, negative or non-finite numbers, a moment standing with no use spent or missing with some spent, wrong types); irreversible operation - **no**. No open design choice; no reserved choice. The pin of the-way is not moved.
- Your directory for working copies: `.runs/review-s1518/` (directly under the ignored `.runs/` of the worktree).
- Your report: `.runs/task-cycles/zapas-i-wskrzeszenie/reports/review-s1518-report.md`. The report file is the input of the cycle's scripts (`task-cycle/remarks_check.py` reads it), the case the harness's note about files named `report...` leaves open. Where you are refused the write all the same, return the report whole as your answer. Its first line is yours as your method gives it; it holds besides what your method gives **Unread material** (what this handoff names that stayed unread or was read in part, or `none`) and **Searches not found or unclear** (each thing looked for and not found or unclear, or `none`).
- `cycle.md` and the other files of the cycle's record directory - other agents' handoffs, reports and findings - are not yours to read unless this handoff names them.
- Other tools of the cycle: the product's guidelines say tests run as `npm test -- <one test file>`; never run `npm test` bare.

Working copies - copied word for word from the cycle:

> An agent of the cycle that makes a working copy to check something — a worktree of a commit, a clone, a script, a screenshot, a prepared input of a test — makes it in a directory of its own directly under the ignored `.runs/` of the task's worktree, the directory its handoff names; never in the system's temporary directory, in the scratch directory of a session or in the main checkout of the repository. The screenshot that a screenshot tool, such as the Playwright server, saves by itself under its session's directory is moved into the agent's directory and the original removed, except a screenshot that is shown to the human: that one goes where `task-cycle/change/ui_check.md` says, to the place the product's foundation settles for screenshots, and into the agent's directory only where no such place is settled. The files that a product's own tools and tests make by themselves are no working copy of the agent and stay outside this rule. Before the agent returns, each time it returns, it removes its copy — a worktree with `git worktree remove --force`, then `git worktree prune` — keeps in `reports/` beside its report what the report needs, and states in the report where each copy stood and that it was removed. Where a removal fails, the agent finishes all the same and names in the report the remainder, with its full path and the reason it stayed. It removes a copy, as any directory, by its path written out in full in the command, never through a shell variable: an empty variable turns the removal on the directory the shell stands in.

## The slice (copied word for word from the plan)

### Slice 15 — The card of a solved map counts with the chest and has no mark of a rehearsal

- **Goal:** At a character in „Kto idzie” of a solved map, „Wejdzie: …” counts what enters from the
  chest as at any other map, and the mark under „Wejdź” is gone with its function, constant,
  stylesheet rule and the comments that speak of it (To do item 4; D-251 withdrawn, Foundation
  entries row D-329). `guidelines/styleguide-browser-view.md` says the same: in "The screen Mapy" the
  mark and D-251 leave the list of decisions and the text, the role of the resurrection line speaks
  of zero uses (row D-217), and in "The end-of-run window" the role of the line in `danger` speaks of
  no use left (row D-216); the guidelines keep their form. The comments of `maps-screen.css`,
  `maps-screen.tsx` and `trip-lines.ts` that name D-251 or the mark are rewritten, and the comment of
  `maps-screen.css` on the role of the resurrection line speaks of zero uses. In
  `tests/view/trip.test.mjs` and `tests/view/maps-screen.test.mjs` the cases of the mark go with
  their reason (D-251 withdrawn), a case holds that a solved map counts „Wejdzie: …” from the chest,
  the cases that set the old field read the uses, and their `decision:` lines of D-189, D-214, D-217
  and D-329 quote them as they stand now, none of D-251 left.
- **Change:** `src/browser/view/trip-lines.ts` · `src/browser/view/maps-screen.tsx` ·
  `src/browser/maps-screen.css` · `guidelines/styleguide-browser-view.md` ·
  `tests/view/trip.test.mjs` · `tests/view/maps-screen.test.mjs`
- **Read:** `guidelines/coding.md` · `guidelines/testing.md` · `guidelines/coding-browser-module.md`
  · `src/browser/AGENTS.md` · `.runs/task-cycles/zapas-i-wskrzeszenie/task.md:29-35` To do (items
  1–7) · `.runs/task-cycles/zapas-i-wskrzeszenie/task.md:81-81` Questions to settle (question 6, the
  warning) · Foundation entries row D-189 · row D-214 · row D-216 · row D-217 · row D-329 · row
  D-251 · `foundations/decisions.md:8490-8509` D-188 · `foundations/decisions.md:9812-9857` D-326 ·
  D-327 · `foundations/part_map.md:3-31` browser-view · `foundations/part_map.md:139-157`
  agent-workflow
- **Model:** cheaper
- **Risk:** none
- **Checks:** first a case of `tests/view/trip.test.mjs` in which „Wejdzie: …” at a solved map is
  cut by the chest; then `npm test -- tests/view/trip.test.mjs` ·
  `npm test -- tests/view/maps-screen.test.mjs` ·
  `npm test -- tests/invariants/test_browser_view_token_values.py` · `npm run typecheck`
- **Depends on:** Slice 12 · Slice 14

### Slice 16 — Nothing in the simulation takes from nowhere

- **Goal:** With the view no longer calling them, `takeFromNowhere`, the branch of `sendTake` with
  no chest and `clippedTake` leave `trip.ts`, `sendTake` taking a chest always; the cases of
  `tests/sim/trip.test.mjs` that hold them go with their reason (Foundation entries row D-189) and
  the comment naming D-251 goes with them. No behaviour of the game changes.
- **Change:** `src/browser/sim/trip.ts` · `tests/sim/trip.test.mjs`
- **Read:** `guidelines/coding.md` · `guidelines/testing.md` ·
  `guidelines/coding-simulation-module.md` · `src/browser/view/trip-lines.ts` · Foundation entries
  row D-189 · row D-251 · row trip-transfer · `foundations/part_map.md:33-64` simulation
- **Model:** cheaper
- **Risk:** none
- **Checks:** `npm run typecheck` · `npm test -- tests/sim/trip.test.mjs` ·
  `npm test -- tests/view/trip.test.mjs`
- **Depends on:** Slice 3 · Slice 15

### Slice 17 — The screen of a run of a solved map says what holds now

- **Goal:** On the screen of a manual run of a solved map the line of D-215 reads as question 6
  gives it (Foundation entries row D-215), from game minute zero until „Restart” or „Zakończ”, in the
  same place and role. The cases of `tests/view/trip.test.mjs` and `tests/view/world-area.test.mjs`
  that hold the line, and those of `world-area.test.mjs` that set the old field of the resurrection
  or expect the old rule of the run (no deposit, no preview „Wyniesie: …”), read the new ones with
  their reason, and their `decision:` lines of D-215 quote it as it stands now.
- **Change:** `src/browser/view/trip-lines.ts` · `tests/view/trip.test.mjs` ·
  `tests/view/world-area.test.mjs`
- **Read:** `guidelines/coding.md` · `guidelines/testing.md` · `guidelines/coding-browser-module.md`
  · `guidelines/styleguide-browser-view.md` · `src/browser/AGENTS.md` ·
  `.runs/task-cycles/zapas-i-wskrzeszenie/task.md:80-80` Questions to settle (question 6, the screen of
  the run) · Foundation entries row D-215 · row D-189 · row D-190 ·
  `foundations/decisions.md:8455-8474` D-186 · `foundations/part_map.md:3-31` browser-view
- **Model:** cheaper
- **Risk:** none
- **Checks:** first the case of `tests/view/trip.test.mjs` that holds the new line; then
  `npm test -- tests/view/trip.test.mjs` · `npm test -- tests/view/world-area.test.mjs`
- **Depends on:** Slice 6 · Slice 11 · Slice 15

### Slice 18 — The test of the page holds the change

- **Goal:** In `tests/view/account-screen.test.mjs` the version of the saved shape is 8 and the one
  before it 7 (Slice 6); the states it builds set the team's uses, not the old field; the cases of
  the resurrection line expect the lines of question 6; the settlement of a death that spent a use
  holds its uses left; the case of the mark of a rehearsal goes with its reason (D-251 withdrawn) and
  the comment naming D-251 is rewritten; a case that expects a run of a solved map to leave the chest
  as it was expects what Slice 3 made; and each `decision:` line of D-189, D-217, D-240 and D-251
  quotes a sentence as it stands now, none of D-251 left. Edit the file by searching it, not by
  reading it whole: it holds about 359 000 characters. Then the foundation check reports nothing.
- **Change:** `tests/view/account-screen.test.mjs`
- **Read:** `guidelines/coding.md` · `guidelines/testing.md` · `guidelines/coding-browser-module.md`
  · `guidelines/styleguide-browser-view.md` · `src/browser/AGENTS.md` ·
  `.runs/task-cycles/zapas-i-wskrzeszenie/task.md:73-81` Questions to settle (question 6) ·
  Foundation entries row D-189 · row D-217 · row D-240 · row D-251 · `foundations/part_map.md:3-31`
  browser-view
- **Model:** same - the orchestrator raised it from `cheaper` at the plan's review: the executor edits a file of about 143 000 tokens by search, with 20 or so local edits, and a slip there fails a gate nobody runs per slice.
- **Risk:** none
- **Checks:** `npm test -- tests/view/account-screen.test.mjs` ·
  `python -B .the-way/elements/common/foundation_check.py`, which reports nothing
- **Depends on:** Slice 6 · Slice 11 · Slice 15 · Slice 17

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

### task.md lines 29-35

1. Ręczne przejście mapy już rozwiązanej bierze zapas ze skrzynki jak każde inne wejście na mapę: listę „Zabierz” programu przyciętą tym, co leży w skrzynce, udźwigiem postaci i pułapem wejścia mapy, zdjętą ze skrzynki przy starcie przejścia, także przy „Restart”.
2. Przy domknięciu takie przejście wynosi do skrzynki to, co nazywa zamrożona lista „Wynieś”, przycięte jak przy każdym innym domknięciu, a wprawy dalej nie płaci; okno końca pokazuje po takim domknięciu wiersz D-185 z tym, co trafiło do skrzynki, jak po każdym domknięciu; śmierć, „Zakończ” i „Restart” zabierają to, co postać niosła, jak w każdym przejściu.
3. Wskrzeszenie konta ma liczbę użyć i czas odnowienia jednego użycia, obie w danych gry: nowa gra zaczyna z pełną liczbą użyć, śmierć postaci z wprawą zużywa jedno użycie, póki jakieś zostało, śmierć postaci z wprawą, gdy żadne nie zostało, zabiera wprawę i wykupione stopnie jak dziś, a śmierć postaci bez wprawy nie zużywa żadnego. Na start w danych gry: 3 użycia i 4 godziny czasu realnego odnowienia jednego użycia (pytanie 4). Zużyte użycia wracają po kolei, jedno naraz, na jednym zegarze: śmierć, która zużywa użycie przy pełnym zapasie, puszcza zegar, a śmierć przy zegarze już biegnącym go nie przestawia; jedno użycie wraca po czasie odnowienia od chwili, w której zegar ruszył, każde następne po czasie odnowienia od powrotu poprzedniego, a gdy zapas jest pełny, zegar staje (pytanie 3). Pierwsze rozwiązanie mapy, której konto jeszcze nie rozwiązało, przywraca jedno użycie, póki zapas nie jest pełny, a zegar biegnie dalej bez przestawiania i staje, gdy zapas się zapełni; kolejne rozwiązanie tej samej mapy nic nie przywraca (pytanie 5). Kształt stanu i jego wczytanie — pytanie 15; rozliczenie śmierci, która zużyła użycie, trzyma liczbę użyć, które po niej zostały, bo okno końca mówi o chwili śmierci (pytanie 6), a wczytanie sprawdza ją wobec liczby użyć w danych gry. W nadrabianiu czasu nieobecności śmierci rozlicza się w kolejności listy postaci (D-240): śmierć każdej postaci zastaje liczbę użyć i zegar takie, jakie zostawiły postacie wyżej na liście, także gdy zginęła wcześniej w czasie realnym, a zegar puszczony przez śmierć rozliczoną wcześniej nie cofa się.
4. Napisy gry o ręcznym przejściu mapy rozwiązanej i o wskrzeszeniu mówią to, co po zmianie obowiązuje: wiersz na ekranie takiego przejścia, wiersz wskrzeszenia przy postaci na karcie w Siedzibie, na ekranie Postać i w „Kto idzie” na karcie mapy oraz wiersze o wskrzeszeniu w oknie końca przejścia; wiersz „Wejdzie: …” nad „Wejdź” na mapie rozwiązanej liczy, jak na każdej innej, z tym, co leży w skrzynce; ostrzeżenie pod „Wejdź” na mapie rozwiązanej, że próba weźmie zapas, którego pętla nie dostanie, znika, bo próba i pętla biorą teraz ze skrzynki to samo. Brzmienia stoją w odpowiedzi na pytanie 6, a forma liczby godzin z danych gry — w odpowiedzi na pytanie 16. Wytyczne wyglądu `guidelines/styleguide-browser-view.md` mówią to samo co napisy po zmianie: w części o ekranie Mapy znika ostrzeżenie pod „Wejdź” i numer D-251 z jej listy decyzji, a zdania o roli wiersza wskrzeszenia („a gdy wskrzeszenie nie jest gotowe, w `danger` (D-217)”) i o wierszu okna końca („`danger`, gdy wskrzeszenie nie było gotowe (D-185, D-216)”) mówią o użyciach.
5. Przyrząd balansu liczy wskrzeszenie z liczbą użyć funkcjami gry, bez własnego liczenia powrotów: pętla i sprawdzenie mapy startują z pełną liczbą użyć, jak nowa gra; przełącznik `--no-resurrection` startuje bez żadnego — wszystkie użycia zużyte, zegar puszczony w chwili startu pętli — a potem użycia wracają jak w grze, tak jak dziś wraca zużyte wskrzeszenie; gracz kampanii, który przed próbą następnej mapy czeka na wskrzeszenie, próbuje, gdy zostało choć jedno użycie. Opis przełącznika w `balance/cli.mjs` i w obu kopiach skilla `loop2-balance` mówi o użyciach. Kod przyrządu zmieniany w pozycjach 5 i 6 trzyma się wytycznych rodzaju `balance-instrument` w znaczeniach z odpowiedzi na pytanie 11, a każdy nowy plik kodu w `balance/` dostaje wiersz w tabeli „Files of this kind” w `guidelines/coding-balance-instrument.md`.
6. Pomiar przyrządem balansu na trzech mapach gry — Skraj lasu, Las i Las — głębiej — pokazuje, czy każdą da się rozwiązać tym, co dały mapy przed nią: wprawą z pierwszych rozwiązań wcześniejszych map, zapasem wyniesionym z map rozwiązanych ręcznymi przejściami i najlepszym programem wzorcowym, bez pętli zarobkowej; Mariusz dostaje wynik jako tabelę bez treści programów. Mapa „da się rozwiązać”, gdy najlepszy program wzorcowy rozwiązuje ją na co najmniej 20% z 500 ziaren; ten próg jest tylko warunkiem zatrzymania tego zadania (pytanie 7). Stan, z którym pomiar wchodzi na każdą mapę, i wybór najlepszego programu — pytanie 13; postać tabeli — pytanie 14.
7. Fundament dostaje wpis rzutowany „(new) — May the progression require the player's absence?” w brzmieniu przytoczonym w „Decisions in play”, a decyzje, niezmienniki i hasło słownika wymienione tam jako zmieniane mówią to, co ta zmiana wprowadza. D-251 wychodzi z dziennika decyzji na listę wycofanych numerów, bez następcy, a ta sama zmiana przepisuje każde odwołanie do niego — w D-189 i D-329, w wytycznych wyglądu, w komentarzach `src/browser/maps-screen.css`, `src/browser/view/maps-screen.tsx` i `src/browser/view/trip-lines.ts` oraz w testach, które go wymieniają albo trzymają wierszem `decision:` (szablon decyzji the-way, `.the-way/elements/decisions/template.md`: „A decision no longer needed leaves the log in the change that ends it: its number goes to the list of withdrawn numbers, and that change rewrites every reference to it”).

### task.md lines 81-81

    - Ostrzeżenie pod „Wejdź” na mapie rozwiązanej, „Próba weźmie zapas, którego nie ma w skrzynce — pętla zarobkowa go nie dostanie.”, znika (pokazane Mariuszowi do wiadomości, bez weta).

### task.md lines 80-80

    - Ekran ręcznego przejścia mapy już rozwiązanej, w miejscu dzisiejszego wiersza D-215: „Mapa jest już rozwiązana: to przejście nie płaci wprawy; zapas bierze ze skrzynki i wynosi do niej jak każde inne.”

### task.md lines 73-81

- Pytanie 6. Jakie brzmienia mają napisy z pozycji 4 listy „To do”?
  - Answer: Jedno słowo w napisach: drużyna ma jedno „wskrzeszenie drużyny”, które ma „użycia”. Liczby 3 i 4 w napisach pochodzą z danych gry.
    - Wiersz przy postaci — na karcie w Siedzibie, na ekranie Postać i w „Kto idzie” na karcie mapy: przy pełnym zapasie „Wskrzeszenie drużyny: użycia 3 z 3” w `text-secondary`; przy części „Wskrzeszenie drużyny: użycia 1 z 3, następne za 3 godz. 10 min czasu realnego” w `text-secondary`; przy zerze „Wskrzeszenie drużyny: użycia 0 z 3, następne za 3 godz. 10 min czasu realnego — śmierć zabierze wprawę i wykupione stopnie” w `danger`. Czas poniżej godziny i zaokrąglanie minut — jak dziś w D-217.
    - Okno końca przejścia, po śmierci, która zużyła użycie, w `text-secondary`: „Zużyte jedno użycie wskrzeszenia drużyny: wprawa z tego przejścia przepada, wcześniejsza i wykupione stopnie zostają. Po tej śmierci zostały użycia 2 z 3; zużyte wracają po kolei, jedno co 4 godziny czasu realnego, a jedno od razu przy pierwszym rozwiązaniu nowej mapy.” Liczba użyć mówi o chwili śmierci, a nie o chwili czytania, bo okno stoi do „Restart” albo „Zakończ”, także po ponownym wczytaniu gry; bieżącą liczbę pokazuje wiersz przy postaci.
    - Okno końca, po śmierci, gdy żadne użycie nie było gotowe, w `danger`: „Wskrzeszenie drużyny nie miało żadnego użycia: postać straciła całą wprawę i wykupione stopnie. Teraz to pokolenie {n}.”
    - Okno końca, po śmierci postaci bez wprawy, w `text-secondary`: „Postać nie miała jeszcze wprawy, więc śmierć nie zabrała drużynie żadnego użycia wskrzeszenia.”
    - Okno końca, po pierwszym rozwiązaniu, które przywróciło użycie, w `text-secondary`: „Wróciło jedno użycie wskrzeszenia drużyny: pierwsze rozwiązanie tej mapy.”; rozwiązanie, które zastaje pełny zapas, nie pokazuje żadnego wiersza.
    - Ekran ręcznego przejścia mapy już rozwiązanej, w miejscu dzisiejszego wiersza D-215: „Mapa jest już rozwiązana: to przejście nie płaci wprawy; zapas bierze ze skrzynki i wynosi do niej jak każde inne.”
    - Ostrzeżenie pod „Wejdź” na mapie rozwiązanej, „Próba weźmie zapas, którego nie ma w skrzynce — pętla zarobkowa go nie dostanie.”, znika (pokazane Mariuszowi do wiadomości, bez weta).

## Foundation, guidelines and code named in *Read*

Read each guideline file named whole. Each foundation entry named by its identifier or its heading is read whole by the range from its heading to the next heading of any level. The line ranges in the plan's *Read* are those of the base commit `46cfec71`; earlier slices and the foundation step may have moved them, so find each entry by its identifier or heading, and where the numbers differ the entry you find holds.

## Extra from the orchestrator

- Range to review: `16625f50..ad90dd33` — slice 15 (`0f810761`: `src/browser/view/trip-lines.ts`, `maps-screen.tsx`, `src/browser/maps-screen.css`, `guidelines/styleguide-browser-view.md`, `tests/view/trip.test.mjs`, `maps-screen.test.mjs`), slice 16 (`114189c5`: `src/browser/sim/trip.ts`, `tests/sim/trip.test.mjs`), slice 17 (`0419a56e`: `trip-lines.ts`, `tests/view/trip.test.mjs`, `world-area.test.mjs`), slice 18 (`ad90dd33`: `tests/view/account-screen.test.mjs`). None had a review of its own; this is the orchestrator's grouped review of them; name for each blocking finding the slice it comes from.
- The executors' reports: `.runs/task-cycles/zapas-i-wskrzeszenie/reports/slice-15-executor-report.md`, `slice-16-…`, `slice-17-…`, `slice-18-executor-report.md` (read all four whole). Concerns to judge: slice 15 — two pre-existing reds fixed inside `tests/view/trip.test.mjs` outside the handoff's list ("six screens" preview, the case of a death not yet settled), the solved-run text left for slice 17; slice 16 — `tests/view/trip.test.mjs` passed 9/9 at its base; slice 17 — the world-area case expected `Wyniesie: nic` where the code gives `patyk 3` (changed per D-186/D-189), the preview; slice 18 — no case of a solved-map run leaving the chest as it was exists in the file (the plan's Goal expected one), `usesSpent` followed instead of the plan's "uses left" (a human's decision on request 166: the settlement of a death stores the uses spent after it; the window's uses left is the data's count minus it).
- Judge against the task's To do 1, 2, 4, 7 and question 6 (the line of a solved-map run: „Mapa jest już rozwiązana: to przejście nie płaci wprawy; zapas bierze ze skrzynki i wynosi do niej jak każde inne.”; the warning under „Wejdź” gone with its function, constant, style rule and comments; „Wejdzie: …” at a solved map counts from the chest like at any other map; the style guide `guidelines/styleguide-browser-view.md` says the same: in "The screen Mapy" the warning and D-251 leave the list of decisions and the text, the role of the resurrection line speaks of zero uses (D-217), the role of the line in the end-of-run window in `danger` speaks of no use left (D-216), the guidelines keep their form), D-215, D-216, D-217, D-329 as slice 11 left them, D-189/D-214; the withdrawal of D-251: every reference to it outside the log gone from the changed files (`grep` the repository: only the list of withdrawn numbers may name it); `takeFromNowhere`, `sendTake` with no chest and `clippedTake` gone from `trip.ts` with nothing else calling them (search `src/`, `balance/`, `tests/`, `scripts/`); no behaviour change in slice 16.
- Run the focused tests of every changed test file one at a time, `npm run typecheck`, `npm test -- tests/invariants/test_browser_view_token_values.py`, and `python -B .the-way/elements/common/foundation_check.py` WITHOUT the skip switch (expected: 0 errors). The browser-view change has user-visible effects: the walk through the running game with screenshots is a dedicated step after this review; do not count its absence against these slices.
- Your report's first line is `PASS <sha>` or `FAIL <sha>`; grade findings; mark a finding that contradicts a settlement of the task with `Contradiction: yes`.
