# Handoff - reviewer of slice(s) 11,12,13,14 of the task `zapas-i-wskrzeszenie`

The person who requested the cycle has delegated intermediate choices to the orchestrator; no answer you get is that person's approval. Your reply goes to the orchestrator only.

## Where and what

- Worktree (work from its root, never from the main checkout): `the root of the task's worktree`, branch `task/zapas-i-wskrzeszenie`. The pinned the-way stands in `.the-way` there. Dependencies are installed (`npm ci` ran).
- Your method: `.the-way/task-cycle/review/SKILL.md` by its path in the worktree's `.the-way`; read it whole, and a file it names only when the step or variant that names it comes. Do not call a skill. Your variant: "a planned slice, the whole change, ... (the review of the range below)".
- Your stage and its boundary: Review the range below with `review-change`. Read-only: change no file of the repository.
- Base of the range: `14f9b8da`.
- Frozen task: `.runs/task-cycles/zapas-i-wskrzeszenie/task.md` (the passages your section needs are copied below; read the rest of it only if a passage sends you to it). Plan: `.runs/task-cycles/zapas-i-wskrzeszenie/plan.md` (its other slices are not yours). Spec: none.
- Answers of step 4 of the cycle: trust boundary - **yes** (`src/browser/sim/saved-game.ts`: the saved shape of the team's resurrection and the load's checks; check crafted input there: counts above the data's, negative or non-finite numbers, a moment standing with no use spent or missing with some spent, wrong types); irreversible operation - **no**. No open design choice; no reserved choice. The pin of the-way is not moved.
- Your directory for working copies: `.runs/review-s1114/` (directly under the ignored `.runs/` of the worktree).
- Your report: `.runs/task-cycles/zapas-i-wskrzeszenie/reports/review-s1114-report.md`. The report file is the input of the cycle's scripts (`task-cycle/remarks_check.py` reads it), the case the harness's note about files named `report...` leaves open. Where you are refused the write all the same, return the report whole as your answer. Its first line is yours as your method gives it; it holds besides what your method gives **Unread material** (what this handoff names that stayed unread or was read in part, or `none`) and **Searches not found or unclear** (each thing looked for and not found or unclear, or `none`).
- `cycle.md` and the other files of the cycle's record directory - other agents' handoffs, reports and findings - are not yours to read unless this handoff names them.
- Other tools of the cycle: the product's guidelines say tests run as `npm test -- <one test file>`; never run `npm test` bare.

Working copies - copied word for word from the cycle:

> An agent of the cycle that makes a working copy to check something — a worktree of a commit, a clone, a script, a screenshot, a prepared input of a test — makes it in a directory of its own directly under the ignored `.runs/` of the task's worktree, the directory its handoff names; never in the system's temporary directory, in the scratch directory of a session or in the main checkout of the repository. The screenshot that a screenshot tool, such as the Playwright server, saves by itself under its session's directory is moved into the agent's directory and the original removed, except a screenshot that is shown to the human: that one goes where `task-cycle/change/ui_check.md` says, to the place the product's foundation settles for screenshots, and into the agent's directory only where no such place is settled. The files that a product's own tools and tests make by themselves are no working copy of the agent and stay outside this rule. Before the agent returns, each time it returns, it removes its copy — a worktree with `git worktree remove --force`, then `git worktree prune` — keeps in `reports/` beside its report what the report needs, and states in the report where each copy stood and that it was removed. Where a removal fails, the agent finishes all the same and names in the report the remainder, with its full path and the reason it stayed. It removes a copy, as any directory, by its path written out in full in the command, never through a shell variable: an empty variable turns the removal on the directory the shell stands in.

## The slice (copied word for word from the plan)

### Slice 11 — Foundation: what the screens say

- **Goal:** The foundation states what the screens say after the change, each entry written through
  `the-way-record-decision`, read as the files in *Read*: D-215 (row 8: the wording of the line on
  the screen of a manual run of a solved map and a question that no longer says such a run takes
  nothing); D-216 (row 7: the four lines of the end-of-run window in the wordings of question 6, the
  number of uses telling the moment of the death, the hours of the data in the form of question 16,
  the line of a returned use standing only where a first solving returned one); D-217 (row 6: the
  line at a character with the count of uses and, while the stock is not full, the time to the next
  return, rounded as today, `danger` only at zero uses); D-329 (its *Verification* and rationale
  without the warning of a rehearsal); D-251 out of the log onto the list of withdrawn numbers with
  no successor, and every reference to it in the log rewritten. Keep each sentence the task does not
  change word for word, and the start of a sentence you reword where its meaning allows. The
  references to D-251 outside the log are rewritten by Slices 15, 16 and 18. No code and no test.
- **Change:** `foundations/decisions.md`
- **Read:** `.runs/task-cycles/zapas-i-wskrzeszenie/task.md:27-35` To do ·
  `.runs/task-cycles/zapas-i-wskrzeszenie/task.md:73-86` Questions to settle (question 6) ·
  `.runs/task-cycles/zapas-i-wskrzeszenie/task.md:148-152` Questions to settle (question 16) ·
  `.runs/task-cycles/zapas-i-wskrzeszenie/task.md:203-224` Decisions in play ·
  `.runs/task-cycles/zapas-i-wskrzeszenie/task.md:241-256` Settlements to record ·
  `foundations/decisions.md:5890-5911` D-215 · `foundations/decisions.md:6216-6285` D-216 · D-217 ·
  `foundations/decisions.md:9878-9899` D-329 · `foundations/decisions.md:8999-9024` D-251 ·
  `foundations/decisions.md:11703-11712` Withdrawn identifiers · `foundations/decisions.md:8435-8454`
  D-185 · `foundations/decisions.md:10564-10602` D-368 · `foundations/decisions.md:6286-6307` D-218
  · Foundation entries row D-189 · row D-190 · `foundations/glossary.md:211-215` resurrection ·
  `foundations/part_map.md:3-31` browser-view · `.claude/skills/the-way-record-decision/SKILL.md` ·
  `.the-way/elements/decisions/skill/SKILL.md` · `.the-way/elements/decisions/skill/read.md` ·
  `.the-way/elements/decisions/skill/decide_entry.md` · `.the-way/elements/decisions/template.md` ·
  `.the-way/elements/decisions/examples.md` · `.the-way/elements/common/way_of_working.md` ·
  `.the-way/elements/common/rules.md` · `.the-way/task-cycle/skill/foundation_step.md`
- **Model:** same — four decisions of texts quoted by the tests of the view, and the withdrawal of a
  decision with its references.
- **Risk:** none
- **Checks:** `python -B .the-way/elements/common/foundation_check.py --skip-test-citations` reports
  nothing in `foundations/`; every line it reports is a `decision:` line quoting a sentence Slice 1
  or you rewrote, or a reference to D-251, in a file a later slice changes; the report lists them by
  file.
- **Depends on:** Slice 1

### Slice 12 — The resurrection line at each character speaks of uses

- **Goal:** `resurrectionLine` gives the three lines of question 6 for a full stock, a part of it
  and none left, with the count from the game's data, the time to the next return as D-217 rounds
  it, and `danger` only at zero uses (Foundation entries row D-217). The comments of the stylesheets
  of Siedziba and Postać that say when the line stands in `danger` say it of zero uses; no value of
  a style changes. `tests/view/team-lines.test.mjs` holds the lines first; the cases of
  `team-lines.test.mjs`, `character-screen.test.mjs` and `headquarters-screen.test.mjs` that set the
  old field or expect the old lines read the uses and the new lines with their reason, and their
  `decision:` lines of D-217 and citations of `resurrection-renewal` hold the sentences as they stand
  now.
- **Change:** `src/browser/view/team-lines.ts` · `src/browser/headquarters.css` ·
  `src/browser/character-screen.css` · `tests/view/team-lines.test.mjs` ·
  `tests/view/character-screen.test.mjs` · `tests/view/headquarters-screen.test.mjs`
- **Read:** `guidelines/coding.md` · `guidelines/testing.md` · `guidelines/coding-browser-module.md`
  · `guidelines/styleguide-browser-view.md` · `src/browser/AGENTS.md` · `src/browser/sim/game.ts` ·
  `src/browser/sim/data/balance.ts` · `.runs/task-cycles/zapas-i-wskrzeszenie/task.md:32-32` To do
  (item 4) · `.runs/task-cycles/zapas-i-wskrzeszenie/task.md:73-75` Questions to settle (question 6)
  · Foundation entries row D-217 · row D-190 · row resurrection-renewal · row resurrection ·
  `foundations/decisions.md:6286-6329` D-218 · D-219 · `foundations/part_map.md:3-31` browser-view
- **Model:** cheaper
- **Risk:** none
- **Checks:** first the cases of `tests/view/team-lines.test.mjs` for the three lines; then
  `npm test -- tests/view/team-lines.test.mjs` · `npm test -- tests/view/character-screen.test.mjs`
  · `npm test -- tests/view/headquarters-screen.test.mjs` ·
  `npm test -- tests/invariants/test_browser_view_token_values.py`
- **Depends on:** Slice 6 · Slice 11

### Slice 13 — The clock's tests settle deaths and first solvings on the uses

- **Goal:** Every case of `tests/view/clock.test.mjs` that sets the old field or expects one
  resurrection reads the uses as Slice 6 made them with its reason, among them the death in an
  earning loop that takes a use before the death of the manual run at the same reading; its
  `decision:` lines quoting sentences of D-190 and D-242 that Slice 1 rewrote, and its citations of
  `resurrection-renewal`, hold them as they stand now. The comments of `clock.ts` that speak of the
  team's one resurrection speak of uses; its behaviour does not change.
- **Change:** `tests/view/clock.test.mjs` · `src/browser/view/clock.ts`
- **Read:** `guidelines/coding.md` · `guidelines/testing.md` · `guidelines/coding-browser-module.md`
  · `guidelines/styleguide-browser-view.md` · `src/browser/AGENTS.md` · `src/browser/sim/game.ts` ·
  Foundation entries row D-190 · row D-242 · row resurrection-renewal ·
  `foundations/decisions.md:6349-6386` D-221 · `foundations/invariants.md:1158-1177` catch-up-minutes
  · catch-up-death-moment · `foundations/part_map.md:3-31` browser-view
- **Model:** cheaper
- **Risk:** none
- **Checks:** `npm test -- tests/view/clock.test.mjs`
- **Depends on:** Slice 6

### Slice 14 — The end-of-run window speaks of uses

- **Goal:** `end-window-lines.ts` gives the four lines of question 6 as Foundation entries row D-216
  gives them: after a death that spent a use, with the uses left that its settlement holds and the
  renewal of the data in the form of question 16, read through the forms of number of
  `counted-name.ts`; after a death with none left, in `danger`; after the death of a character with
  no practice; after a first solving that returned a use, and none where it found the stock full.
  `tests/view/end-window-lines.test.mjs` holds the lines first, the hours of a whole, a part and
  under one hour among them; the cases of `end-window.test.mjs` and `end-window-game.test.mjs` that
  expect the old lines or build a settlement without its uses left read the new ones with their
  reason, and their `decision:` lines of D-216 quote it as it stands now.
- **Change:** `src/browser/view/end-window-lines.ts` · `tests/view/end-window-lines.test.mjs` ·
  `tests/view/end-window.test.mjs` · `tests/view/end-window-game.test.mjs`
- **Read:** `guidelines/coding.md` · `guidelines/testing.md` · `guidelines/coding-browser-module.md`
  · `guidelines/styleguide-browser-view.md` · `src/browser/AGENTS.md` ·
  `src/browser/view/counted-name.ts` · `.runs/task-cycles/zapas-i-wskrzeszenie/task.md:76-79`
  Questions to settle (question 6) · `.runs/task-cycles/zapas-i-wskrzeszenie/task.md:148-152`
  Questions to settle (question 16) · Foundation entries row D-216 · row D-190 ·
  `foundations/decisions.md:8435-8454` D-185 · `foundations/part_map.md:3-31` browser-view
- **Model:** cheaper
- **Risk:** none
- **Checks:** first the cases of `tests/view/end-window-lines.test.mjs` for the four lines; then
  `npm test -- tests/view/end-window-lines.test.mjs` · `npm test -- tests/view/end-window.test.mjs`
  · `npm test -- tests/view/end-window-game.test.mjs`
- **Depends on:** Slice 6 · Slice 11

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

### task.md lines 27-35

### To do

1. Ręczne przejście mapy już rozwiązanej bierze zapas ze skrzynki jak każde inne wejście na mapę: listę „Zabierz” programu przyciętą tym, co leży w skrzynce, udźwigiem postaci i pułapem wejścia mapy, zdjętą ze skrzynki przy starcie przejścia, także przy „Restart”.
2. Przy domknięciu takie przejście wynosi do skrzynki to, co nazywa zamrożona lista „Wynieś”, przycięte jak przy każdym innym domknięciu, a wprawy dalej nie płaci; okno końca pokazuje po takim domknięciu wiersz D-185 z tym, co trafiło do skrzynki, jak po każdym domknięciu; śmierć, „Zakończ” i „Restart” zabierają to, co postać niosła, jak w każdym przejściu.
3. Wskrzeszenie konta ma liczbę użyć i czas odnowienia jednego użycia, obie w danych gry: nowa gra zaczyna z pełną liczbą użyć, śmierć postaci z wprawą zużywa jedno użycie, póki jakieś zostało, śmierć postaci z wprawą, gdy żadne nie zostało, zabiera wprawę i wykupione stopnie jak dziś, a śmierć postaci bez wprawy nie zużywa żadnego. Na start w danych gry: 3 użycia i 4 godziny czasu realnego odnowienia jednego użycia (pytanie 4). Zużyte użycia wracają po kolei, jedno naraz, na jednym zegarze: śmierć, która zużywa użycie przy pełnym zapasie, puszcza zegar, a śmierć przy zegarze już biegnącym go nie przestawia; jedno użycie wraca po czasie odnowienia od chwili, w której zegar ruszył, każde następne po czasie odnowienia od powrotu poprzedniego, a gdy zapas jest pełny, zegar staje (pytanie 3). Pierwsze rozwiązanie mapy, której konto jeszcze nie rozwiązało, przywraca jedno użycie, póki zapas nie jest pełny, a zegar biegnie dalej bez przestawiania i staje, gdy zapas się zapełni; kolejne rozwiązanie tej samej mapy nic nie przywraca (pytanie 5). Kształt stanu i jego wczytanie — pytanie 15; rozliczenie śmierci, która zużyła użycie, trzyma liczbę użyć, które po niej zostały, bo okno końca mówi o chwili śmierci (pytanie 6), a wczytanie sprawdza ją wobec liczby użyć w danych gry. W nadrabianiu czasu nieobecności śmierci rozlicza się w kolejności listy postaci (D-240): śmierć każdej postaci zastaje liczbę użyć i zegar takie, jakie zostawiły postacie wyżej na liście, także gdy zginęła wcześniej w czasie realnym, a zegar puszczony przez śmierć rozliczoną wcześniej nie cofa się.
4. Napisy gry o ręcznym przejściu mapy rozwiązanej i o wskrzeszeniu mówią to, co po zmianie obowiązuje: wiersz na ekranie takiego przejścia, wiersz wskrzeszenia przy postaci na karcie w Siedzibie, na ekranie Postać i w „Kto idzie” na karcie mapy oraz wiersze o wskrzeszeniu w oknie końca przejścia; wiersz „Wejdzie: …” nad „Wejdź” na mapie rozwiązanej liczy, jak na każdej innej, z tym, co leży w skrzynce; ostrzeżenie pod „Wejdź” na mapie rozwiązanej, że próba weźmie zapas, którego pętla nie dostanie, znika, bo próba i pętla biorą teraz ze skrzynki to samo. Brzmienia stoją w odpowiedzi na pytanie 6, a forma liczby godzin z danych gry — w odpowiedzi na pytanie 16. Wytyczne wyglądu `guidelines/styleguide-browser-view.md` mówią to samo co napisy po zmianie: w części o ekranie Mapy znika ostrzeżenie pod „Wejdź” i numer D-251 z jej listy decyzji, a zdania o roli wiersza wskrzeszenia („a gdy wskrzeszenie nie jest gotowe, w `danger` (D-217)”) i o wierszu okna końca („`danger`, gdy wskrzeszenie nie było gotowe (D-185, D-216)”) mówią o użyciach.
5. Przyrząd balansu liczy wskrzeszenie z liczbą użyć funkcjami gry, bez własnego liczenia powrotów: pętla i sprawdzenie mapy startują z pełną liczbą użyć, jak nowa gra; przełącznik `--no-resurrection` startuje bez żadnego — wszystkie użycia zużyte, zegar puszczony w chwili startu pętli — a potem użycia wracają jak w grze, tak jak dziś wraca zużyte wskrzeszenie; gracz kampanii, który przed próbą następnej mapy czeka na wskrzeszenie, próbuje, gdy zostało choć jedno użycie. Opis przełącznika w `balance/cli.mjs` i w obu kopiach skilla `loop2-balance` mówi o użyciach. Kod przyrządu zmieniany w pozycjach 5 i 6 trzyma się wytycznych rodzaju `balance-instrument` w znaczeniach z odpowiedzi na pytanie 11, a każdy nowy plik kodu w `balance/` dostaje wiersz w tabeli „Files of this kind” w `guidelines/coding-balance-instrument.md`.
6. Pomiar przyrządem balansu na trzech mapach gry — Skraj lasu, Las i Las — głębiej — pokazuje, czy każdą da się rozwiązać tym, co dały mapy przed nią: wprawą z pierwszych rozwiązań wcześniejszych map, zapasem wyniesionym z map rozwiązanych ręcznymi przejściami i najlepszym programem wzorcowym, bez pętli zarobkowej; Mariusz dostaje wynik jako tabelę bez treści programów. Mapa „da się rozwiązać”, gdy najlepszy program wzorcowy rozwiązuje ją na co najmniej 20% z 500 ziaren; ten próg jest tylko warunkiem zatrzymania tego zadania (pytanie 7). Stan, z którym pomiar wchodzi na każdą mapę, i wybór najlepszego programu — pytanie 13; postać tabeli — pytanie 14.
7. Fundament dostaje wpis rzutowany „(new) — May the progression require the player's absence?” w brzmieniu przytoczonym w „Decisions in play”, a decyzje, niezmienniki i hasło słownika wymienione tam jako zmieniane mówią to, co ta zmiana wprowadza. D-251 wychodzi z dziennika decyzji na listę wycofanych numerów, bez następcy, a ta sama zmiana przepisuje każde odwołanie do niego — w D-189 i D-329, w wytycznych wyglądu, w komentarzach `src/browser/maps-screen.css`, `src/browser/view/maps-screen.tsx` i `src/browser/view/trip-lines.ts` oraz w testach, które go wymieniają albo trzymają wierszem `decision:` (szablon decyzji the-way, `.the-way/elements/decisions/template.md`: „A decision no longer needed leaves the log in the change that ends it: its number goes to the list of withdrawn numbers, and that change rewrites every reference to it”).

### task.md lines 73-86

- Pytanie 6. Jakie brzmienia mają napisy z pozycji 4 listy „To do”?
  - Answer: Jedno słowo w napisach: drużyna ma jedno „wskrzeszenie drużyny”, które ma „użycia”. Liczby 3 i 4 w napisach pochodzą z danych gry.
    - Wiersz przy postaci — na karcie w Siedzibie, na ekranie Postać i w „Kto idzie” na karcie mapy: przy pełnym zapasie „Wskrzeszenie drużyny: użycia 3 z 3” w `text-secondary`; przy części „Wskrzeszenie drużyny: użycia 1 z 3, następne za 3 godz. 10 min czasu realnego” w `text-secondary`; przy zerze „Wskrzeszenie drużyny: użycia 0 z 3, następne za 3 godz. 10 min czasu realnego — śmierć zabierze wprawę i wykupione stopnie” w `danger`. Czas poniżej godziny i zaokrąglanie minut — jak dziś w D-217.
    - Okno końca przejścia, po śmierci, która zużyła użycie, w `text-secondary`: „Zużyte jedno użycie wskrzeszenia drużyny: wprawa z tego przejścia przepada, wcześniejsza i wykupione stopnie zostają. Po tej śmierci zostały użycia 2 z 3; zużyte wracają po kolei, jedno co 4 godziny czasu realnego, a jedno od razu przy pierwszym rozwiązaniu nowej mapy.” Liczba użyć mówi o chwili śmierci, a nie o chwili czytania, bo okno stoi do „Restart” albo „Zakończ”, także po ponownym wczytaniu gry; bieżącą liczbę pokazuje wiersz przy postaci.
    - Okno końca, po śmierci, gdy żadne użycie nie było gotowe, w `danger`: „Wskrzeszenie drużyny nie miało żadnego użycia: postać straciła całą wprawę i wykupione stopnie. Teraz to pokolenie {n}.”
    - Okno końca, po śmierci postaci bez wprawy, w `text-secondary`: „Postać nie miała jeszcze wprawy, więc śmierć nie zabrała drużynie żadnego użycia wskrzeszenia.”
    - Okno końca, po pierwszym rozwiązaniu, które przywróciło użycie, w `text-secondary`: „Wróciło jedno użycie wskrzeszenia drużyny: pierwsze rozwiązanie tej mapy.”; rozwiązanie, które zastaje pełny zapas, nie pokazuje żadnego wiersza.
    - Ekran ręcznego przejścia mapy już rozwiązanej, w miejscu dzisiejszego wiersza D-215: „Mapa jest już rozwiązana: to przejście nie płaci wprawy; zapas bierze ze skrzynki i wynosi do niej jak każde inne.”
    - Ostrzeżenie pod „Wejdź” na mapie rozwiązanej, „Próba weźmie zapas, którego nie ma w skrzynce — pętla zarobkowa go nie dostanie.”, znika (pokazane Mariuszowi do wiadomości, bez weta).
  - Not chosen:
    - Każde użycie nazywane „wskrzeszeniem” — weto pokazane przy ustaleniu domyślnym 5, niewybrane.
    - Czerwień wiersza przy postaci już przy ostatnim użyciu — weto pokazane przy ustaleniu domyślnym 5, niewybrane.
    - Wiersz ekranu przejścia mapy rozwiązanej usunięty — weto pokazane przy ustaleniu domyślnym 7; gracz mógłby myśleć, że tu zarabia wprawę.
  - Source: human, 2026-11-20, przez doradcę dnia jak przy pytaniu 3: „reszta ok” — ustalenia domyślne 5, 6 i 7 bez weta, z rzeczami do wiadomości (pokazane jako 24.5–24.7; tura 6, *Human material*)

### task.md lines 148-152

- Pytanie 16. Jak napisy podają liczbę godzin z danych gry, gdy nie jest to 4?
  - Answer: Pełne godziny w odmianie: „co godzinę”, „co 2 godziny”, „co 5 godzin”, odmiana jak w liczebnikach gry (`src/browser/view/counted-name.ts`); liczba godzin niepełna — w formie D-217: „co {g} godz. {m} min”, a poniżej godziny „co {m} min”. Przy liczbach na start (4 godziny) napisy brzmią tak, jak w odpowiedzi na pytanie 6.
  - Not chosen:
    - Zawsze skrót „co {g} godz.” bez odmiany — prostszy kod, ale zmienia przyjęte brzmienie „co 4 godziny”.
  - Source: human, 2026-11-20, przez doradcę dnia jak przy pytaniu 13: „24: …, 4 ok” — ustalenie domyślne bez weta (pokazane jako 24.4 w turze 10, odpowiedź w turze 11); lista decyzji, pozycja 6.

### task.md lines 203-224

### Obecne decyzje, które zadanie zmienia

Brzmienia z `foundations/` w commicie ba67f045, bez zmian w commicie fec2ae7e; zmianę każdej niesie odpowiedź Mariusza na pytania 1 i 2, a jej treść odpowiedzi na pytania 3–7 i 12 (zmiana decyzji wybrana przez człowieka, WAY-314).

- D-189 — What pays, and what takes from the chest?: „A manual map run that first solves its map pays practice and loot once per map for the player, whichever character completes it; a manual run of a solved map pays nothing; an earning-loop run pays loot only on completion; a run that ends in death pays neither loot nor practice. […] A manual map run of a map already solved takes nothing from the chest: it takes its equipment from nowhere, cut only by the character's carrying capacity and the map's cap, and the card of the map marks it, under „Wejdź” at the character in „Kto idzie”, as not predicting the earning loop when the chest lacks that equipment (D-251).” Zmiana: ręczne przejście mapy rozwiązanej bierze zapas ze skrzynki i wynosi przedmioty do skrzynki, a wprawy nie płaci; znika zdanie o wyposażeniu znikąd i o znaku pod „Wejdź”, a uzasadnienie i *Rejected* („a trial cut by the chest's contents — it would forbid trying a program whose supplies are not there yet”) przestają mówić o próbie z zapasem znikąd jako o regule.
- D-179 — How do items go into a map run and out of it?: „[…] Reality cuts the trip plan down and never up: outside a manual map run of a map already solved, what the chest lacks does not go into the backpack […]”. Zmiana: wyjątek dla ręcznego przejścia mapy rozwiązanej znika, także w zdaniu uzasadnienia „only a manual map run of a map already solved takes nothing from the chest (D-189)”.
- D-214 — When is a map run a manual run of a solved map?: „A manual map run is a manual run of a solved map by the state of its map when that map run starts, and it stays one to its end, on the screen after its end and after a load. A map run restart after the completion that solved the map is such a run: it takes its equipment from nowhere and pays nothing.” Zmiana: taki „Restart” bierze zapas ze skrzynki i nie płaci wprawy.
- D-215 — Where does the player read that a manual run of a solved map pays and takes nothing?: „On the screen of a manual run of a solved map, from game minute zero until „Restart” or „Zakończ”, below the body row and the backpack and above the line „Wprawa w tym przejściu”, the line „Mapa jest już rozwiązana: to przejście nic nie płaci i nic nie bierze ze skrzynki.” stands in `text-secondary`.” Zmiana: brzmienie wiersza i pytanie wpisu, który już nie mówi, że takie przejście nic nie bierze (pytanie 6).
- D-251 — How does the card of a map mark a rehearsal the earning loop cannot repeat?: „At a solved map, at a character in the section „Kto idzie”, when an item of the take list of its program, clipped by carrying capacity and the map's entry cap, exceeds the stock in the chest, „Próba weźmie zapas, którego nie ma w skrzynce — pętla zarobkowa go nie dostanie.” stands under „Wejdź” in the role `warning`.” Zmiana: znak znika, bo ręczne przejście i pętla biorą ze skrzynki to samo, a decyzja wychodzi z dziennika na listę wycofanych numerów, bez następcy (pozycja 7 listy „To do”).
- D-329 — What stands at each character in the section „Kto idzie”, and in what order?, *Verification*: „„Wejdź” with the warning of a rehearsal under it”. Zmiana: ostrzeżenie znika razem z D-251.
- D-190 — What does a character's death take?: „[…] The account has one resurrection, shared by all its characters: the death of a character with practice uses it up while it is ready, a death of a character with practice with none ready stops its earning loop, and it is renewed after a span of real time set in the balance data, eight hours to start, or at once by the first completion of a map the account has not solved yet, once for each map, a ready resurrection staying ready.” Zmiana: wskrzeszenie konta ma liczbę użyć i czas odnowienia jednego użycia w danych gry, na start 3 użycia i 4 godziny, zużyte wracają po kolei na jednym zegarze, a pierwsze rozwiązanie nowej mapy przywraca jedno użycie, póki zapas nie jest pełny (pytania 3, 4 i 5); *Verification* zamiast „its renewal 480 real minutes” mówi o liczbach z danych gry; reszta zdania wiążącego zostaje.
- D-216 — Where does the player read what a death took and what a completion renewed?: „[…] „Wskrzeszenie zużyte: wprawa z tego przejścia przepada, wcześniejsza i wykupione stopnie zostają. Następne wskrzeszenie, wspólne dla całej drużyny, po 8 godzinach czasu realnego albo po pierwszym rozwiązaniu nowej mapy.” in `text-secondary` when the death used up the resurrection, the hours coming from the balance data, „Wskrzeszenie nie było gotowe: postać straciła całą wprawę i wykupione stopnie. Teraz to pokolenie {n}.” in `danger` when no resurrection was ready, […] the line „Wskrzeszenie odnowione: pierwsze rozwiązanie tej mapy.” stands in `text-secondary`; a completion that finds the resurrection ready shows none.” Zmiana: brzmienia czterech wierszy, a wiersz po pierwszym rozwiązaniu stoi, gdy rozwiązanie przywróciło użycie, i nie stoi przy pełnym zapasie (pytania 5 i 6).
- D-217 — What does the game show of a character's resurrection?: „The card and the screen of a character, and that character in the section „Kto idzie” of the card of a map, show, from its creation, „Wskrzeszenie drużyny gotowe” in `text-secondary`, and while the resurrection is not ready „Wskrzeszenie drużyny za {g} godz. {m} min czasu realnego — śmierć zabierze wprawę i wykupione stopnie” in `danger`, the time reading „za {m} min czasu realnego” below one hour. The minutes are rounded up to a whole minute before the split into hours and minutes.” Zmiana: wiersz pokazuje liczbę użyć i, gdy zapas nie jest pełny, czas do powrotu następnego; `danger` tylko przy zerze użyć (pytanie 6).
- D-220 — What generation number and resurrection does a new character have?: „A new character has generation number 1 and brings no resurrection of its own; a new game has the account's resurrection ready.” Zmiana: nowa gra ma pełną liczbę użyć wskrzeszenia.
- D-240 — When and how is the time away computed?, zdanie: „[…] the death of each character finds the resurrection as the characters earlier on the list left it, so with one resurrection for two deaths the character earlier on the list takes it, even when it died later in real time.” Zmiana: zdanie mówi o ostatnim użyciu zamiast o jednym wskrzeszeniu; kolejność postaci zostaje, a śmierć każdej postaci zastaje także zegar powrotu użyć taki, jaki zostawiły postacie wyżej na liście (pozycja 3 listy „To do”).
- D-242 — Which clock drives an earning loop?, zdanie: „[…] so that of two deaths on the account's one resurrection in the open game the earlier in real time takes it.” Zmiana jak w D-240.
- D-428 — What does the map check of the balance instrument print?, *Verification*: „the program measured with the chest its take list asks and the earning loop started with the resurrection ready”. Zmiana: pętla startuje z pełną liczbą użyć (pytanie 12).
- Niezmiennik `solved-map-manual-run`: „A manual map run of a map already solved when the map run starts leaves the chest as it was and adds no practice to any character skill.” Zmiana: zostaje tylko to, że takie przejście nie dodaje wprawy.
- Niezmiennik `trip-transfer`: „Outside a manual run of a solved map, at each map-run start equipment is removed from the chest […], while a manual run of a solved map leaves the chest as it was at its start and at its completion.” Zmiana: wyjątek znika.
- Niezmiennik `trip-run-end`: „[…] while completion deposits the frozen bring list's clipped contents, on a manual run of a solved map nothing, and leaves the remaining items unavailable to subsequent runs.” Zmiana: wyjątek znika.
- Niezmiennik `resurrection-renewal`: „The account's resurrection used up by a death is ready again at the real moment of that death plus the renewal time in the balance data, the first completion of a map the account has not solved, and no later completion of it, makes a used-up resurrection ready at the real moment of its settling and leaves a ready one as it stood, a death with no resurrection ready or of a character with no practice leaves that moment as it stood, and a moment equal to the moment of readiness counts as ready.” Zmiana: mówi o użyciach, ich powrocie po kolei na jednym zegarze i o jednym użyciu przywracanym przez pierwsze rozwiązanie mapy (pytania 3 i 5); zostaje, że śmierć bez gotowego użycia albo postaci bez wprawy zegara nie rusza i że chwila równa chwili powrotu liczy się jako powrót.
- Hasło słownika `resurrection`: „A resurrection is what the account has, one for all its characters, ready or not at the moment of the death of a character with practice, and what then protects that practice, its bought ranks and its generation number, the map run ending in death with a resurrection ready too; the death of a character with no practice uses none up.” Zmiana: wskrzeszenie konta ma liczbę użyć; pojedynczego użycia hasło nie nazywa wskrzeszeniem (pytanie 6).

### task.md lines 241-256

## Settlements to record

Candidates: 11 shown, 10 accepted — 2026-11-20

| # | Settlement | Goes to | Source | What the cycle would otherwise guess |
|---|---|---|---|---|
| 1 | Ręczne przejście mapy już rozwiązanej bierze zapas ze skrzynki i wynosi przedmioty do skrzynki jak każde inne przejście, a wprawy dalej nie płaci. | sentence of D-189 | Pytanie 1 (wybór Mariusza; Not chosen tam) | czy takie przejście dalej bierze wyposażenie znikąd i czy wynosi łup do skrzynki, a za tym, czy ruszać wyjątki w D-179, D-214, D-251 i w niezmiennikach `trip-transfer`, `trip-run-end` i `solved-map-manual-run` |
| 2 | Wskrzeszenie to liczby konta — liczba użyć i czas odnowienia jednego użycia w danych gry — a nie przedmiot w plecaku, w wyposażeniu postaci ani w skrzynce; przywracanie użycia wytwarzaniem to dalszy kierunek, którego gra nie ma. | sentence of D-190 | Pytanie 2 (wybór Mariusza; Not chosen tam) | czy zrobić wskrzeszenie przedmiotem z licznikiem użyć w skrzynce albo w wyposażeniu i czy dodać przepis na przywrócenie użycia |
| 3 | Wskrzeszenie drużyny ma na start 3 użycia, a zużyte wracają po kolei, jedno naraz, na jednym zegarze, jedno co 4 godziny czasu realnego, aż zapas jest pełny. | sentence of D-190 | Pytania 3 i 4 (wybór Mariusza; Not chosen tam) | czy każde użycie wraca na własnym zegarze od śmierci, która je zużyła, i ile użyć oraz godzin wpisać do danych gry |
| 4 | Pierwsze rozwiązanie mapy, której konto jeszcze nie rozwiązało, przywraca jedno użycie, póki zapas nie jest pełny, a zegar powrotu pozostałych biegnie dalej i staje przy pełnym zapasie. | sentence of D-190 | Pytanie 5 (wybór Mariusza; Not chosen tam) | czy sukces przywraca wszystkie użycia albo żadne i czy przestawia zegar na nowo |
| 5 | Nowa gra zaczyna z pełnym zapasem użyć wskrzeszenia drużyny. | sentence of D-220 | Pytanie 2 („dostajemy z odpowiednimi parametrami na początku gry”) | czy nowa gra startuje z jednym użyciem, z pełnym zapasem czy bez użyć |
| 6 | Wiersz wskrzeszenia przy postaci pokazuje liczbę użyć i, gdy zapas nie jest pełny, czas do powrotu następnego, w brzmieniach z odpowiedzi na pytanie 6, a `danger` tylko przy zerze użyć. | sentence of D-217 | Pytanie 6 (ustalenie domyślne 5 bez weta; Not chosen tam) | brzmienie i kolor wiersza przy części zapasu, na przykład czerwień już przy ostatnim użyciu |
| 7 | Okno końca przejścia mówi o wskrzeszeniu czterema wierszami w brzmieniach z odpowiedzi na pytanie 6, a liczba użyć w nim mówi o chwili śmierci. | sentence of D-216 | Pytanie 6 (ustalenie domyślne 6 bez weta) | czy okno pokazuje bieżącą liczbę użyć, która po ponownym wczytaniu bywa nieprawdziwa, i jakimi słowami mówi o powrocie użyć |
| 8 | Ekran ręcznego przejścia mapy rozwiązanej mówi: „Mapa jest już rozwiązana: to przejście nie płaci wprawy; zapas bierze ze skrzynki i wynosi do niej jak każde inne.” | sentence of D-215 | Pytanie 6 (ustalenie domyślne 7 bez weta; Not chosen tam) | czy wiersz znika razem z regułą „nic nie bierze”, czy mówi tylko o wprawie |
| 9 | Drużyna ma jedno „wskrzeszenie drużyny”, które ma użycia; pojedynczego użycia nie nazywa się wskrzeszeniem. | glossary term | Pytanie 6 (ustalenie domyślne 5 bez weta; Not chosen tam) | czy hasło `resurrection` i nowe zdania wpisów nazywają wskrzeszeniem każde użycie |
| 10 | Przyrząd balansu startuje pętlę i sprawdzenie mapy z pełnym zapasem użyć, przełącznik „bez wskrzeszenia” z zerem, a gracz kampanii, który czeka na wskrzeszenie, próbuje przy choć jednym użyciu. | sentence of D-428 | Pytanie 12 (ustalenie domyślne 8 bez weta) | z iloma użyciami startuje pętla w sprawdzeniu mapy i co znaczy `needResurrection` przy kilku użyciach |

### task.md lines 32-32

4. Napisy gry o ręcznym przejściu mapy rozwiązanej i o wskrzeszeniu mówią to, co po zmianie obowiązuje: wiersz na ekranie takiego przejścia, wiersz wskrzeszenia przy postaci na karcie w Siedzibie, na ekranie Postać i w „Kto idzie” na karcie mapy oraz wiersze o wskrzeszeniu w oknie końca przejścia; wiersz „Wejdzie: …” nad „Wejdź” na mapie rozwiązanej liczy, jak na każdej innej, z tym, co leży w skrzynce; ostrzeżenie pod „Wejdź” na mapie rozwiązanej, że próba weźmie zapas, którego pętla nie dostanie, znika, bo próba i pętla biorą teraz ze skrzynki to samo. Brzmienia stoją w odpowiedzi na pytanie 6, a forma liczby godzin z danych gry — w odpowiedzi na pytanie 16. Wytyczne wyglądu `guidelines/styleguide-browser-view.md` mówią to samo co napisy po zmianie: w części o ekranie Mapy znika ostrzeżenie pod „Wejdź” i numer D-251 z jej listy decyzji, a zdania o roli wiersza wskrzeszenia („a gdy wskrzeszenie nie jest gotowe, w `danger` (D-217)”) i o wierszu okna końca („`danger`, gdy wskrzeszenie nie było gotowe (D-185, D-216)”) mówią o użyciach.

### task.md lines 73-75

- Pytanie 6. Jakie brzmienia mają napisy z pozycji 4 listy „To do”?
  - Answer: Jedno słowo w napisach: drużyna ma jedno „wskrzeszenie drużyny”, które ma „użycia”. Liczby 3 i 4 w napisach pochodzą z danych gry.
    - Wiersz przy postaci — na karcie w Siedzibie, na ekranie Postać i w „Kto idzie” na karcie mapy: przy pełnym zapasie „Wskrzeszenie drużyny: użycia 3 z 3” w `text-secondary`; przy części „Wskrzeszenie drużyny: użycia 1 z 3, następne za 3 godz. 10 min czasu realnego” w `text-secondary`; przy zerze „Wskrzeszenie drużyny: użycia 0 z 3, następne za 3 godz. 10 min czasu realnego — śmierć zabierze wprawę i wykupione stopnie” w `danger`. Czas poniżej godziny i zaokrąglanie minut — jak dziś w D-217.

### task.md lines 76-79

    - Okno końca przejścia, po śmierci, która zużyła użycie, w `text-secondary`: „Zużyte jedno użycie wskrzeszenia drużyny: wprawa z tego przejścia przepada, wcześniejsza i wykupione stopnie zostają. Po tej śmierci zostały użycia 2 z 3; zużyte wracają po kolei, jedno co 4 godziny czasu realnego, a jedno od razu przy pierwszym rozwiązaniu nowej mapy.” Liczba użyć mówi o chwili śmierci, a nie o chwili czytania, bo okno stoi do „Restart” albo „Zakończ”, także po ponownym wczytaniu gry; bieżącą liczbę pokazuje wiersz przy postaci.
    - Okno końca, po śmierci, gdy żadne użycie nie było gotowe, w `danger`: „Wskrzeszenie drużyny nie miało żadnego użycia: postać straciła całą wprawę i wykupione stopnie. Teraz to pokolenie {n}.”
    - Okno końca, po śmierci postaci bez wprawy, w `text-secondary`: „Postać nie miała jeszcze wprawy, więc śmierć nie zabrała drużynie żadnego użycia wskrzeszenia.”
    - Okno końca, po pierwszym rozwiązaniu, które przywróciło użycie, w `text-secondary`: „Wróciło jedno użycie wskrzeszenia drużyny: pierwsze rozwiązanie tej mapy.”; rozwiązanie, które zastaje pełny zapas, nie pokazuje żadnego wiersza.

## Foundation, guidelines and code named in *Read*

Read each guideline file named whole. Each foundation entry named by its identifier or its heading is read whole by the range from its heading to the next heading of any level. The line ranges in the plan's *Read* are those of the base commit `46cfec71`; earlier slices and the foundation step may have moved them, so find each entry by its identifier or heading, and where the numbers differ the entry you find holds.

## Extra from the orchestrator

- Range to review: `14f9b8da..25223337` — slice 11 (`8d0e49cb`: `foundations/decisions.md`, D-215, D-216, D-217, D-329 rewritten, D-251 withdrawn), slice 12 (`fe59bd56`: `src/browser/view/team-lines.ts`, `headquarters.css`, `character-screen.css`, `tests/view/team-lines|character-screen|headquarters-screen.test.mjs`), slice 13 (`fd5eb418`: `tests/view/clock.test.mjs`, `src/browser/view/clock.ts` comments), slice 14 (`25223337`: `src/browser/view/end-window-lines.ts`, `tests/view/end-window-lines|end-window|end-window-game.test.mjs`). None had a review of its own in the plan; this is the orchestrator's grouped review of them; name for each blocking finding the slice it comes from.
- The executors' reports: `.runs/task-cycles/zapas-i-wskrzeszenie/reports/slice-11-executor-report.md`, `slice-12-…`, `slice-13-…`, `slice-14-executor-report.md` (read all four whole; their concerns: slice 11 — D-329's binding sentence still says „Wejdź” and „Puść w pętlę” "with their warnings" although „Wejdź” has no warning now, old "ready" wording left in D-219, D-56's entry, D-04, the glossary `generation number`, D-216's heading; slice 12 — no browser walk by the handoff's rule, test-first seen red only for `team-lines`; slice 13 — renewal constant 8 h -> 4 h in the tests, no mutation run for view files; slice 14 — D-216's line for a death that spent the last use reads „zostały użycia 0 z 3” in `text-secondary` while D-217 makes zero uses `danger` on the card, followed from question 6 of the task, literal „użycia 1 z 3”, no test-first run recorded). Judge each concern: allowed, defect, or divergence from the task; decide for D-329's sentence whether it is now false and must change in this task (the human's remark 2 says the return step corrects old "resurrection is ready" wording elsewhere; a sentence made false by THIS task's withdrawal of D-251 is another matter).
- Judge slice 11 against rows 6, 7, 8 of the task's *Settlements to record* and To do 4 and 7 (D-215 wording of the line on the screen of a solved-map run; D-216 four lines in the wordings of question 6 with the hours in the form of question 16, the line of a returned use only where a first solving returned one; D-217 the line at a character with the count of uses and, while the stock is not full, the time to the next return, `danger` only at zero uses; D-329 Verification and rationale without the warning; D-251 on the list of withdrawn numbers with no successor and every reference to it in the log rewritten; every other sentence word for word; the template's rules for a withdrawn decision and the limits of a sentence/paragraph). Note one change since the plan: the settlement of a death now stores `usesSpent` (uses spent after the death, 1..the data's count), the window's uses left is the data's count minus it when the window is drawn (the human's decision on request 166; D-216 should say so).
- Judge slices 12-14 against question 6 and 16, D-216/D-217 as they stand now, the guidelines (`guidelines/coding-browser-module.md`, `guidelines/styleguide-browser-view.md`: roles `text-secondary`/`danger`, no new colour, the comment of the stylesheets), the tests (every case reads the new state; quotations word for word; reasons; failing-first where the slice says so). Hours are read from the data (3 uses, 240 minutes), never hard-coded in the view. Run the focused tests of the changed files one at a time and `python -B .the-way/elements/common/foundation_check.py --skip-test-citations` (errors in files of slices 15-18 stand by the plan: the style guide, `maps-screen`, `trip`, `world-area`, `account-screen` tests and the sources that name D-251).
- The walk through the running game with screenshots is a dedicated step after slice 17 (human's remark 4); do not count its absence against these slices.
- Your report's first line is `PASS <sha>` or `FAIL <sha>`; grade findings; mark a finding that contradicts a settlement of the task with `Contradiction: yes`.
