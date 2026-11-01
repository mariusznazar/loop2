# Handoff — executor of Slice 6 — The report in the headquarters, task `petla-zarobkowa`

## Delegation and stage

The person who requested this cycle (the product's owner) delegated the cycle's intermediate
choices to the orchestrator of `implement-task`. You are the executor of one slice, a fresh agent.
Your questions go to the orchestrator, never to the human; you return at your slice's boundary.

- Worktree (work from its root): `C:\Storage\repos\loop2-wt\petla-zarobkowa`, branch
  `task/petla-zarobkowa`, head `395b6f3`. Process pin `.the-way` at `a8dfe8a`. Pinned quality tools
  stand in `.runs/quality-venv`; `node_modules` is installed.
- Method: `.the-way/task-cycle/change/SKILL.md` in the worktree. Read it whole; read a file it names
  only when the step or variant that names it comes.
- Variant: "a slice, or the retry of a slice".
- Report path: `.runs/task-cycles/petla-zarobkowa/reports/13-slice6-report.md`
- Do not run the product's gate (`npm test` with no file argument); it is the orchestrator's. Each
  check you report carries its command and exit code. Commands of the plan's *Checks* in the form
  `npm test -- <file>` run that one file.
- Before writing any script read `C:\Storage\The Brain\The Brain\.ai\rules\scripts.md`.
- Code is written in English; texts the game shows stay in Polish, word for word from the task.

## Git

Commit on the task branch, in the worktree, by explicit paths (never `git add -A`, `.` or
`commit -a`). Messages in English in the form of the repository's commits, for instance
`feat: :sparkles: …`, `test: :white_check_mark: …`, `fix: :bug: …`. Do not push. Check that the
commits' address is `the owner's address` (`git log -1 --format='%h %ae'`). `.runs/` is ignored and
stays out of commits. Leave the worktree clean.

## Answers of step 4

- Trust boundary: **yes**. The part map names `src/browser/sim/saved-game.ts` as the trust boundary
  of `simulation`. A forged or malformed value in a document from outside must refuse it whole.
  The plan gives no later slice that file; a state the load refuses is a structural mismatch to
  report, not to patch.
- Irreversible operation: **yes**. Raising `SAVED_GAME_VERSION` makes the game discard every older
  saved game state in full at load (D-206) once the merge deploys `main` (D-11). The cycle only
  prepares the raised number and performs nothing on the server; the human performs it by merging.

## What the cycle already knows

- Slices 1 to 5 are made, head `395b6f3`. `closeAwayReport` in `src/browser/sim/loop.ts` returns a
  `GameResult`. Lines of `awayReport` are the type `AwayReportLine` in `types.ts`; a line closed by a
  stop keeps its `minutes` and `chest`, with `practice` `{}`, and the view reads a line of a live stop
  without minutes by its `away` being false: its earlier chest and practice are not shown.
- In `game-view.ts` „Zatrzymaj” goes `clock.flush()` then `act(stopLoop)`, and „Puść w pętlę” through
  `clock.startLoop` then `saver.moment()`. `act` is the path for „Zamknij” too.
- `tests/view/account-screen.test.mjs` `onPage` fixes `Date.now` by `mock.method`.
- The browser check has a harness left by Slice 5 in `.runs/harness/`, ignored by git: a static
  server on `127.0.0.1:4455` over `dist/public` and a page building `createGameView` from a crafted
  state. Use it or your own; run `npm run build` first. The plugin's Playwright tools
  (`mcp__plugin_playwright_playwright__*`) are loaded by ToolSearch. Report the method, each state
  reached with its screenshot inspected, and each state not reached as unchecked. Stop any server you
  start before you return.
- Focus: spec, *Left to the maker*, leaves where focus goes when „Zamknij” removes itself to you,
  within D-42. Do not let it fall to the page body.
- Read each guideline file the *Read* names whole; a part of one is not a reading.
- Write each test first and see it fail by its assertion before the code; the method's order holds.

## Your slice, the plan's section word for word (`.runs/task-cycles/petla-zarobkowa/plan.md`)

### Slice 6 — The report in the headquarters

- **Goal:** The section of To do 16 stands in the headquarters above „Drużyna”. In detail:
  - `src/browser/view/away-report.ts`, a new browser module with nothing touching the DOM at import,
    draws the section from `awayReport` and exports its pure texts: the two titles, the lines of a
    loop that stopped in `danger` with and without „po {m} min”, the other lines in `text` with empty
    parts left out and „ · wskrzeszenie zużyte”, „Skrzynka jest pełna.” in `warning`, read from the
    chest at drawing. Stopped lines come first, then the others, each in the team's order, parts of a
    line in the order of the data, names from the data.
  - „Zamknij” goes through `act` with `closeAwayReport` and closes the whole section; focus goes
    where D-42 allows when the button leaves the screen. The section stands while the list is not
    empty, and a manual run standing hides it with the headquarters, so it shows after „Zakończ”.
- **Change:** `src/browser/view/away-report.ts` · `src/browser/view/headquarters.ts` ·
  `src/browser/view/game-view.ts` · `src/browser/styles.css` · `tests/view/away-report.test.mjs` ·
  `tests/view/account-screen.test.mjs`
- **Read:** `.runs/task-cycles/petla-zarobkowa/spec.md:36-55` Constraints ·
  `.runs/task-cycles/petla-zarobkowa/spec.md:286-317` 11. The report ·
  `.runs/task-cycles/petla-zarobkowa/spec.md:379-405` 15. Units and interfaces ·
  `.runs/task-cycles/petla-zarobkowa/spec.md:407-437` 16. Where the invariants are tested ·
  `.runs/task-cycles/petla-zarobkowa/spec.md:513-521` Left to the maker ·
  `.runs/task-cycles/petla-zarobkowa/task.md:68-81` To do, item 16 ·
  `.runs/task-cycles/petla-zarobkowa/task.md:153-158` Q6 ·
  `.runs/task-cycles/petla-zarobkowa/task.md:220-227` Q19 ·
  `.runs/task-cycles/petla-zarobkowa/task.md:233-237` Q21 ·
  `.runs/task-cycles/petla-zarobkowa/task.md:362-363` Settlements to record, rows 10 and 11 ·
  `.runs/task-cycles/petla-zarobkowa/task.md:374-376` Settlements to record, rows 22 to 24 ·
  `.runs/task-cycles/petla-zarobkowa/task.md:378-378` Settlements to record, row 26 ·
  src/browser/sim/loop.ts as Slice 3 leaves it, which does not stand at the plan's base ·
  `foundations/decisions.md:825-839` D-39 · `foundations/decisions.md:870-884` D-42 ·
  `foundations/decisions.md:900-914` D-44 · `foundations/decisions.md:1076-1094` D-54 ·
  the entry of the plan's row What does the player read after being away? ·
  `foundations/invariants.md:236-247` content-identifiers · `foundations/invariants.md:458-467` browser-view-token-values ·
  `foundations/invariants.md:468-477` browser-view-focus-outline ·
  `foundations/part_map.md:3-27` browser-view ·
  `foundations/glossary.md:87-93` headquarters · the glossary entries of the plan's rows earning loop
  and catch-up ·
  `guidelines/coding.md` · `guidelines/coding-browser-module.md` · `guidelines/styleguide-browser-view.md` ·
  `guidelines/testing.md` · `src/browser/view/status-row.ts` · `src/browser/view/trip-lines.ts`
- **Model:** cheaper
- **Risk:** none
- **Checks:** First the test: `tests/view/away-report.test.mjs`, red before the code, with the
  wordings written out from To do 16, the title by the lines' `away`, the order, empty parts, the
  chest's signs, and the import touching no DOM; in `tests/view/account-screen.test.mjs` the section
  shown from a loaded report, gone at „Zamknij” with a save, staying after a reload, hidden during a
  manual map run. Then `npm test -- tests/view/away-report.test.mjs` ·
  `npm test -- tests/view/account-screen.test.mjs` · `npm test -- tests/quality/test_quality_invariants.py` ·
  `npm run typecheck`. A check in a browser by `npm run dev`, as D-75 and D-87 give: the section with
  each title, a stopped and an other line, the line of a full chest, each with a screenshot inspected,
  and focus by the keyboard after „Zamknij”. A state not reached is reported as unchecked.
- **Depends on:** Slice 3 · Slice 5 · the plan's entry What does the player read after being away?

## Current ranges

These hold where they differ from the plan's *Read*, since the foundation step moved the entries.
Files of `src/` and `tests/` the *Read* names by range: earlier slices may have changed them, so
find the passage again by its name.

- D-229 (What does the player read after being away?): `foundations/decisions.md:4322-4371` — written by the foundation step
- D-39: `foundations/decisions.md:838-852`
- D-42: `foundations/decisions.md:883-897`
- D-44: `foundations/decisions.md:913-927`
- D-54: `foundations/decisions.md:1089-1107`
- `content-identifiers`: `foundations/invariants.md:236-247`
- `browser-view-token-values`: `foundations/invariants.md:458-467`
- `browser-view-focus-outline`: `foundations/invariants.md:468-477`
- part `browser-view`: `foundations/part_map.md:3-27`
- glossary `headquarters`: `foundations/glossary.md:87-93`
- glossary `earning loop`: `foundations/glossary.md:218-223` — written by the foundation step
- glossary `catch-up`: `foundations/glossary.md:224-229` — written by the foundation step

## Passages of the task and the spec, copied word for word

### spec.md:36-55 — Constraints

## Constraints

- The task binds: its answers are the human's. Tests of loop bind as its data does (P6); the named
  departures are Q3, Q5, Q7, Q20 and Q21.
- D-04: real time enters the simulation as an argument; a game state stores the moment of an event,
  never the clock's reading at each reading. D-221: functions that pass game time leave a death
  unsettled and take no real moment; whoever passes game time settles at once, the catch-up included.
- D-207, as the rhythm and the hidden page compare by identity of the game state held; D-209, D-211,
  D-212, D-213; D-206 with `guidelines/coding-saved-game.md`: strict reading, version raised with the
  shape, the load takes no time passed. `saved-game.ts` takes no real time in this design.
- D-55, D-56, D-54: one manual map run, a run names its character by number, list in creation order.
- `simulation-isolation`, `simulation-inputs`, `map-run-repeatability`, `minute-span-split`,
  `trip-transfer`, `trip-run-end`, `death-settled-once`, `resurrection-renewal`, `save-version`.
- The code as it stands at `4ed8fcd`, where it differs from the task's citations at `95de83b`:
  `GameState.run` is `src/browser/sim/types.ts:361`, `paused` `:364`; `passRealTime`
  `src/browser/sim/game.ts:487`; `send` `:306`; skills taken from the replaced run `:170`;
  `SAVED_GAME_VERSION` is 2, at `src/browser/sim/saved-game.ts:71`; the headquarters hidden during a
  run `src/browser/view/game-view.ts:244`; the saver's rhythm `src/browser/view/game-saver.ts:207`.
- A saved game state on the test server is lost at the merge's deployment (D-206, D-11). The human
  accepted it in the task; the cycle only raises the number.

### spec.md:286-317 — 11. The report

### 11. The report (To do 16, rows 10, 11, 22–24, 26)

An `awayReport` line holds `characterId`, `minutes` (whole minutes caught up), `chest` (this
character's change, signed, by item, no zero kept), `practice` (the gain in the loop's `practice`),
`resurrectionUsed`, and `stop`: null, or `{ generation, away }`.

- A line per character is what the task asks. **One reading picked:** a line closes when its loop
  stops, and a later loop of that character, started before „Zamknij”, opens a new one. Two lines of
  one character then stand for two loops. Keeping one would give either a wrong {m} or a lost return.
- At each catch-up, for each loop with a whole minute passed: its character's open line takes the
  minutes, the chest difference and the practice gain, or a new line opens, which gives row 22. Taking
  characters one at a time makes the chest's difference across one character's turn
  that character's own change (`src/sim/loop.test.ts:134`). Practice counts `practice` before and
  after, so a run still going adds nothing (`src/sim/sim.test.ts:1592`, `chest.test.ts:535`).
- A covered death in a catch-up sets `resurrectionUsed`. A covered death in the open game writes
  nothing: the headquarters' resurrection line shows it.
- A stop in a catch-up sets `stop` with `away: true`, {m} being the line's minutes. A stop in the open
  game sets `away: false`, on the character's open line if there is one, and on a new line with 0
  minutes otherwise. The place of the stop decides the wording, so a line with minutes from an earlier
  return that stops live reads without minutes (Q19); the earlier chest and practice of that line are
  not shown, as no stopped line shows them.
- The section stands when the list is not empty (row 23). A stop in a catch-up always has at least
  one minute, because a loop's death happens in a minute; a line with no minute and no stop is never
  written.
- Title: „Gdy cię nie było” when some line is open or stopped with `away`, else „Pętle, które
  stanęły” (Q19).
- „Skrzynka jest pełna.” is read from the chest at drawing, not stored: the sentence is in the present
  tense, it is true as drawn, and it takes no field.
- Order at drawing: stopped lines, then the others, each in the team's order; parts of a line in the
  order of the data; items and skills named from the data.
- A manual run standing hides the headquarters, so the section shows after „Zakończ” (row 26).
- `closeAwayReport` empties the list; on an empty list it returns the very state.

### spec.md:379-405 — 15. Units and interfaces

### 15. Units and interfaces

`src/browser/sim/loop.ts`, a new simulation module, depending on `game.ts`, `run.ts`, `trip.ts`,
`skills.ts`, `random.ts` and the data:

| Function | What it does |
|---|---|
| `startLoop(state, { mapId, characterId, programId? }, realMs)` | The first run, as To do 1, 3, 4 give; the row's program when no number is given. Returns the very state, not throwing, on a map unknown or unsolved, a character not in the team, in a loop or in the manual run, a program not on the list (`src/sim/sim.test.ts:1509`, `:1520`) |
| `stopLoop(state, characterId)` | Pays the loop's practice and the run's, drops the loop, writes `stoppedLoops`. With no loop, the very state |
| `closeAwayReport(state)` | Section 11 |
| `loopSpan(fromMs, nowMs)` | `{ minutes, clockMs }`, section 6. Pure |
| `passLoops(state, fromMs, nowMs)` | The open game's passing: `GameResult` with `clockMs`, section 7 |
| `catchUp(state, nowMs)` | The catch-up: `GameResult` with `clockMs`, sections 7, 8, 11 |
| `advanceLoopRun(state, characterId, minutes)` | Game time only: up to `minutes` of that run, stopping at its end, and how many passed. No moment, end left as it is |
| `endLoopRun(state, characterId, nowMs)` | Section 4 |

`game.ts`: `send` throws for a character in a loop and clears its `stoppedLoops` entry; `programOf`
takes skills; `settleDeath` shares the character's settling; `withSaveTime`; `newGame` holds the new
keys. `run.ts`: `GameEvent` gains `loopRunEnded` with the character's number, one for each end, a
stop by death included. `random.ts`: section 5. `trip.ts`: the clipped take list. `types.ts`: section 1.
`saved-game.ts`: section 13.

`src/browser/view/clock.ts` gains `startLoop(ids)` and `catchUp()`, and the loop clock.
`game-saver.ts` gains the options `moment` and the rhythm's predicate. `game-view.ts`: the controls
and `store.apply`, the catch-up as the last step of building. `src/browser/view/away-report.ts`, a new
browser module: the section, its pure texts exported for tests, nothing touching the DOM at import.
`headquarters.ts`, `trip-lines.ts`: section 12. `app.ts` does not change.

### spec.md:407-437 — 16. Where the invariants are tested

### 16. Where the invariants are tested (`guidelines/testing.md`)

All are unit tests of the simulation unless named, marked `// invariant: <id>` as in
`tests/sim/death.test.mjs`, in a new `tests/sim/loop.test.mjs` (or more than one file):

- `catch-up-state`: one state, two characters, the second with an empty trip plan and no reach on the
  chest. `passLoops` minute by minute against `catchUp` over the same span: the same `Character` and
  loop of the first and the same chest, through a covered death and an uncovered one. A relation, so
  no value comes from today's run.
- Row 14: `loopSpan` and `catchUp` at 90 s, at exactly one minute, at zero, with the clock turned back:
  written-out minutes and `clockMs`, the state the same object where nothing passed, chest and skills
  untouched.
- Row 15: an empty program dies in game minute 243 (`tests/invariants/test_minute_span_split.py`
  gives the number), so the moment is save time plus 243 minutes and the readiness that plus the
  renewal, in one call and split; a program living past the renewal has the second death covered
  (`src/sim/sim.test.ts:1848`).
- Row 17: deep equality of `understanding` and `programs` across a span in which a manual run of the
  same game would discover, for instance the first chill, and an empty copy staying empty.
- `minute-span-split`, `map-run-repeatability`: `passLoops` split into calls against one call, and two
  runs from one state, through a run's end. `trip-transfer`, `trip-run-end`: take at each run, deposit
  at completion, nothing back at a death or a stop, and the marked rule untouched. `death-settled-once`:
  section 4.
- `save-version`, the trust boundary: each condition of section 13 joins the crafted documents of
  „a crafted document of the current version is refused whole as shape”. Every review of the cycle
  checks crafted input there.
- View: `tests/view/clock.test.mjs` for the order of section 6, minutes never passed twice, the
  catch-up's use of its moment; `tests/view/game-saver.test.mjs` for the rhythm, each document holding
  a save time that loads, and no send after a load of an unchanged paused state;
  `tests/view/headquarters.test.mjs`, `tests/view/trip.test.mjs` and a new test of the report's pure
  texts for the wordings, the title and the order.
- Tests of loop this spec departs from are named in the task; the rest are taken as cases.

### spec.md:513-521 — Left to the maker

## Left to the maker

- Names of private helpers, how `loop.ts` divides inside, and field order in types.
- The exact class names and rules in `src/browser/styles.css`, reading tokens only.
- Where the row's lines stand among the row's elements, keeping To do 18's mark under „Wyślij”.
- Where focus goes when „Zamknij” removes itself from the screen, within D-42.
- How tests divide into files, and listing a new `tests/sim` file in `stryker.config.json`.
- A sentence for `guidelines/coding-saved-game.md` on a loop's run, if the change makes one earn its
  place; the file's rules hold without it.

### task.md:68-81 — To do, item 16

16. Po powrocie gracz dostaje raport w sekcji „Gdy cię nie było” w siedzibie, nad „Drużyna”, po jednej linii na postać, która miała pętlę (odpowiedź Q6).
    - Najpierw pętle, które stanęły, w `danger`: „{imię}: pętla stanęła po {m} min — śmierć bez wskrzeszenia: postać straciła wprawę i wykupione stopnie. Teraz to pokolenie {n}.”
    - Potem pozostałe, w `text`: „{imię}: {m} min · skrzynka: {przedmiot} +{n}, {przedmiot} −{n} · wprawa: {umiejętność} +{n}”, puste części pominięte, z dopiskiem „ · wskrzeszenie zużyte”, gdy śmierć pokryło wskrzeszenie.
    - Pod nimi, gdy skrzynka jest pełna, „Skrzynka jest pełna.” w `warning`.
    - Jeden przycisk „Zamknij” zamyka całą sekcję: to nazwane odejście od loop, gdzie zamyka się raport każdej postaci (odpowiedź Q21; test loop `src/sim/sim.test.ts:1743`).
    - Raport leży w stanie gry, więc przeżywa przeładowanie.
    - Kolejny powrót przed „Zamknij” dodaje się do raportu (wiersz 22 *Settlements to record*).
    - Sekcja pokazuje się od jednej pełnej doliczonej minuty, a pętla, która stanęła, otwiera ją przy każdej liczbie minut (test loop `src/sim/loop.test.ts:91`–`92`; wiersz 23 *Settlements to record*).
    - Pętla, która stanie przy otwartej grze, trafia do tej samej sekcji (wiersz 24 *Settlements to record*), a jej linia nie podaje minut: „{imię}: pętla stanęła — śmierć bez wskrzeszenia: postać straciła wprawę i wykupione stopnie. Teraz to pokolenie {n}.” (odpowiedź Q19).
    - Gdy w sekcji stoją same takie pętle, tytuł brzmi „Pętle, które stanęły”, a gdy jest w niej choć jedna linia z powrotu, zostaje „Gdy cię nie było” (odpowiedź Q19).
    - Gracz, który wraca do ręcznego przejścia, zobaczy raport w siedzibie po „Zakończ” (wiersz 26 *Settlements to record*).
    - W linii pętli, która idzie dalej, {m} to minuty doliczone (test loop `src/sim/sim.test.ts:1732`).
    - W linii pętli, która stanęła po powrocie, {m} to też minuty doliczone, czyli tyle, ile pętla przerobiła w doliczaniu, zanim stanęła, nie ile minęło od zapisu (odpowiedź Q19; test loop `src/sim/sim.test.ts:1811`).
    - Każda postać liczy własną zmianę w skrzynce (test loop `src/sim/loop.test.ts:134`), a przyrost wprawy pochodzi z tego doliczania (testy loop `src/sim/sim.test.ts:1592`, `src/sim/chest.test.ts:535`).

### task.md:153-158 — Q6

- Q6. Gdzie gracz czyta raport z nieobecności, co w nim stoi i jak go zamyka?
  - Answer: Droga A — sekcja „Gdy cię nie było” w siedzibie, nad „Drużyna”, po jednej linii na postać, którą zamyka jeden przycisk „Zamknij”; brzmienia, kolejność i zasady stoją w *To do* 16. Słaby punkt nazwany w pytaniu: nowa sekcja i nowy kawałek stanu gry, a sekcja pojawia się od jednej doliczonej minuty, więc także po krótszym przeładowaniu.
  - Not chosen:
    - B — A, ale zamykanie przy każdej postaci, jak w loop — tyle kliknięć, ile postaci.
    - C — jedna linia dla całej drużyny — gracz nie wie, której postaci co się stało.
  - Source: Mariusz, 2026-10-30, „przyjmuję rekomendacje” (pakiet rundy, pozycja D19). Materiał: testy loop `src/sim/sim.test.ts:1732`–`1743`, `:1811`, `src/sim/report.test.ts:7`, `src/sim/loop.test.ts:134`, `src/sim/chest.test.ts:527`, `:535`; koncepcja §5: „zbiorczy raport z nocy (najpierw pętle, które stanęły, bo tylko one wymagają ręki gracza)”; D-39; D-96.

### task.md:220-227 — Q19

- Q19. Co stoi w miejscu „po {m} min” w linii „{imię}: pętla stanęła po {m} min …”, gdy pętla stanęła przy otwartej grze, i jaki tytuł ma wtedy sekcja?
  - Answer: Minuty — droga C: przy otwartej grze linia nie podaje minut: „{imię}: pętla stanęła — śmierć bez wskrzeszenia: postać straciła wprawę i wykupione stopnie. Teraz to pokolenie {n}.” Słaby punkt nazwany w pytaniu: jeden warunek w widoku, a gracz nie wie, ile pętla szła. Przy powrocie zostaje „po {m} min”, a {m} to minuty doliczone: pakiet powiedział wprost tylko, że przy otwartej grze nic nie było doliczane, a to znaczenie {m} niesie test loop `src/sim/sim.test.ts:1812`, który czyta przy pętli, która stanęła, ten sam licznik co test „raport z nieobecności mówi, ile minut zeszło” (`:1732`), pod odpowiedzią P6.
  - Answer: Tytuł — droga E: gdy w sekcji są tylko takie pętle, tytuł brzmi „Pętle, które stanęły”, a gdy jest w niej choć jedna linia z powrotu, zostaje „Gdy cię nie było”. Słaby punkt nazwany w pytaniu: drugi tytuł i jeden warunek.
  - Not chosen:
    - (minuty) A — wszystkie minuty tej pętli od puszczenia — liczba bywa większa niż ostatnia nieobecność, a {m} znaczy w sekcji dwie rzeczy; to wygląda też na odejście od loop.
    - (minuty) B — minuty od ostatniego doliczenia — osobny licznik w stanie gry, a liczba mówi niewiele.
    - (tytuł) D — zostaje „Gdy cię nie było” — tytuł mówi nieprawdę graczowi, który siedział przy grze.
  - Source: Mariusz, 2026-10-30, „wszystko zgodnie z rekomendacją mi pasuje” (pakiet rundy, pozycja 18-Q19). Testy loop tego przypadku nie pokrywają: żaden nie zatrzymuje pętli przy otwartej grze. Materiał: testy loop `src/sim/sim.test.ts:1732`, `:1811`–`1812`, `src/sim/loop.test.ts:93`–`94`.

### task.md:233-237 — Q21

- Q21. Czy zostaje odpowiedź Q6, że jeden „Zamknij” zamyka całą sekcję raportu, teraz nazwana odejściem od loop?
  - Answer: Droga A, nazwane odejście od loop — zostaje jeden „Zamknij”. Słaby punkt nazwany w pytaniu: gracz nie zamknie raportu jednej postaci, zostawiając drugą.
  - Not chosen:
    - B — zamykanie przy każdej postaci, jak w loop — tyle kliknięć, ile postaci.
  - Source: Mariusz, 2026-10-30, „wszystko zgodnie z rekomendacją mi pasuje” (pakiet rundy, pozycja 18-Q21). Test loop, od którego zadanie odchodzi: `src/sim/sim.test.ts:1743`.

### task.md:362-363 — Settlements to record, rows 10 and 11

| 10 | Po powrocie gracz czyta raport w sekcji „Gdy cię nie było” w siedzibie, nad „Drużyna”, po jednej linii na postać, która miała pętlę, a jeden przycisk „Zamknij” zamyka całą sekcję: najpierw pętle, które stanęły, w `danger`, „{imię}: pętla stanęła po {m} min — śmierć bez wskrzeszenia: postać straciła wprawę i wykupione stopnie. Teraz to pokolenie {n}.”; potem pozostałe, w `text`, „{imię}: {m} min · skrzynka: {przedmiot} +{n}, {przedmiot} −{n} · wprawa: {umiejętność} +{n}”, puste części pominięte, z dopiskiem „ · wskrzeszenie zużyte”, gdy śmierć pokryło wskrzeszenie; pod nimi, gdy skrzynka jest pełna, „Skrzynka jest pełna.” w `warning`; {m} to w obu liniach minuty doliczone. | decision | pytanie Q6, droga A (pozycja D19), *Not chosen* tam; nazwane odejście od loop, gdzie raport zamyka się przy każdej postaci (`src/sim/sim.test.ts:1743`), przyjęte w pytaniu Q21, *Not chosen* tam; propozycja refinera: role (pozycja D19 mówi „ostrzegawczo”), „puste części pominięte” i warunki dopisku oraz linii o pełnej skrzynce (pozycja D19 mówi „gdy trzeba”); {m} jako minuty doliczone — pytanie Q19, droga C, *Not chosen* tam, i test loop `src/sim/sim.test.ts:1812` | gdzie stoi raport, jak go zamknąć, jakie ma teksty |
| 11 | Raport leży w stanie gry, więc przeżywa przeładowanie. | decision | pytanie Q6, droga A (pozycja D19: „nowy kawałek stanu gry”); propozycja refinera: „przeżywa przeładowanie” | czy raport przeżywa przeładowanie |

### task.md:374-376 — Settlements to record, rows 22 to 24

| 22 | Kolejny powrót przed „Zamknij” dodaje się do raportu. | decision | propozycja refinera, cały wiersz: *To do* 16 | czy nowy raport zastępuje stary, czy się z nim sumuje |
| 23 | Sekcja pokazuje się od jednej pełnej doliczonej minuty, a pętla, która stanęła, otwiera ją przy każdej liczbie minut. | decision | pytanie Q6, droga A (pozycja D19: „Pojawia się od jednej doliczonej minuty”); propozycja refinera: część o pętli, która stanęła, pod odpowiedzią P6: test loop `src/sim/loop.test.ts:91`–`92`, gdzie raport ma śmierć przy zerze minut | czy gracz dowie się o pętli, która stanęła w pierwszej minucie |
| 24 | Pętla, która stanie przy otwartej grze, trafia do tej samej sekcji, jej linia brzmi wtedy „{imię}: pętla stanęła — śmierć bez wskrzeszenia: postać straciła wprawę i wykupione stopnie. Teraz to pokolenie {n}.”, a gdy w sekcji nie ma żadnej linii z powrotu, tytuł brzmi „Pętle, które stanęły”. | decision | propozycja refinera: ta sama sekcja, *To do* 16; linia i tytuł — pytanie Q19, drogi C i E, *Not chosen* tam | czy przy otwartej grze pętla staje po cichu, co stoi w miejscu „po {m} min” i jaki tytuł ma sekcja |

### task.md:378-378 — Settlements to record, row 26

| 26 | Gracz, który wraca do ręcznego przejścia, czyta raport w siedzibie po „Zakończ”. | decision | propozycja refinera, cały wiersz: *To do* 16; *Context*: siedziby nie widać, gdy w stanie gry jest przejście | czy pokazać raport na ekranie przejścia |
