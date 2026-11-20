# Handoff - executor of slice(s) 15 of the task `zapas-i-wskrzeszenie`

The person who requested the cycle has delegated intermediate choices to the orchestrator; no answer you get is that person's approval. Your reply goes to the orchestrator only.

## Where and what

- Worktree (work from its root, never from the main checkout): `the root of the task's worktree`, branch `task/zapas-i-wskrzeszenie`. The pinned the-way stands in `.the-way` there. Dependencies are installed (`npm ci` ran).
- Your method: `.the-way/task-cycle/change/SKILL.md` by its path in the worktree's `.the-way`; read it whole, and a file it names only when the step or variant that names it comes. Do not call a skill. Your variant: "a slice, or the retry of a slice".
- Your stage and its boundary: Make the slice below, commit it by path (`git add <file> ...`, never `git add -A`; commit messages in English, like the commits of the repository, with its `type: :emoji:` form), run the focused checks of its *Checks* and return. Make no other slice and no change outside the slice's *Change*, and run **no full gate** (`npm test` without a file): the gate is the orchestrator's or CI's.
- Base of your slice: `16625f50`.
- Frozen task: `.runs/task-cycles/zapas-i-wskrzeszenie/task.md` (the passages your section needs are copied below; read the rest of it only if a passage sends you to it). Plan: `.runs/task-cycles/zapas-i-wskrzeszenie/plan.md` (its other slices are not yours). Spec: none.
- Answers of step 4 of the cycle: trust boundary - **yes** (`src/browser/sim/saved-game.ts`: the saved shape of the team's resurrection and the load's checks; check crafted input there: counts above the data's, negative or non-finite numbers, a moment standing with no use spent or missing with some spent, wrong types); irreversible operation - **no**. No open design choice; no reserved choice. The pin of the-way is not moved.
- Your directory for working copies: `.runs/slice-15-executor/` (directly under the ignored `.runs/` of the worktree).
- Your report: `.runs/task-cycles/zapas-i-wskrzeszenie/reports/slice-15-executor-report.md`. The report file is the input of the cycle's scripts (`task-cycle/remarks_check.py` reads it), the case the harness's note about files named `report...` leaves open. Where you are refused the write all the same, return the report whole as your answer. Its first line is yours as your method gives it; it holds besides what your method gives **Unread material** (what this handoff names that stayed unread or was read in part, or `none`) and **Searches not found or unclear** (each thing looked for and not found or unclear, or `none`).
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

## Foundation, guidelines and code named in *Read*

Read each guideline file named whole. Each foundation entry named by its identifier or its heading is read whole by the range from its heading to the next heading of any level. The line ranges in the plan's *Read* are those of the base commit `46cfec71`; earlier slices and the foundation step may have moved them, so find each entry by its identifier or heading, and where the numbers differ the entry you find holds.

## Extra from the orchestrator

- Slices 1-14 are made and fixes are in (code up to `16625f50`). Slice 11 rewrote D-215, D-216, D-217, D-329 and withdrew D-251 in `foundations/decisions.md`: read them as they stand and quote them in tests word for word from the start of a sentence. Slice 14 reported stale prose at `guidelines/styleguide-browser-view.md` near line 1050 (the end-of-run window's line): correct it with your other edits of the style guide (the end-window role of the line in `danger` speaks of no use left; the form of the line in `text-secondary` after a death that spent a use). The style guide keeps its form; edit it by the sentences the plan names, in the part "The screen Mapy" (remove the warning under „Wejdź” and D-251 from its list of decisions and text) and where the role of the resurrection line is said (zero uses in `danger`).
- A manual run of a solved map now takes from the chest, so „Wejdzie: …” at a solved map counts with the chest like at every other map; the take-from-nowhere functions in `src/browser/sim/trip.ts` stay for slice 16 to remove (the view no longer calls them after your change).
- The state check of the changed components is the jsdom tests of your files; the walk through the running game with screenshots of the card of a solved map is a dedicated step after slice 17 — say so in your report.
- Run the foundation check at the end (`python -B .the-way/elements/common/foundation_check.py --skip-test-citations`): no error may remain for the files of your *Change* (no reference to D-251 may remain in them); errors in files of slices 16-18 stand by the plan. `decision_index.py` takes `--decision D-217`, with the `D-` prefix. A test comment must not point outside the foundation. Test-first: write the case of „Wejdzie: …” cut by the chest at a solved map first and see it fail.
