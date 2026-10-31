# Handoff — executor of Slice 5 — The character's row in the headquarters, task `petla-zarobkowa`

## Delegation and stage

The person who requested this cycle (the product's owner) delegated the cycle's intermediate
choices to the orchestrator of `implement-task`. You are the executor of one slice, a fresh agent.
Your questions go to the orchestrator, never to the human; you return at your slice's boundary.

- Worktree (work from its root): `C:\Storage\repos\loop2-wt\petla-zarobkowa`, branch
  `task/petla-zarobkowa`, head `b1302fa`. Process pin `.the-way` at `a8dfe8a`. Pinned quality tools
  stand in `.runs/quality-venv`; `node_modules` is installed.
- Method: `.the-way/task-cycle/change/SKILL.md` in the worktree. Read it whole; read a file it names
  only when the step or variant that names it comes.
- Variant: "a slice, or the retry of a slice".
- Report path: `.runs/task-cycles/petla-zarobkowa/reports/12-slice5-report.md`
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

- Slices 1 to 4 are made, head `b1302fa`. The view's clock has `startLoop(ids)`, which flushes first,
  as `send` does, and takes the reading's moment for the seed. **The view does not call it yet**, so
  nothing in `game-view.ts` calls `saver.moment()` for it: your control must go through a path that
  does, as To do 17 makes „Puść w pętlę” and „Zatrzymaj” acts of the player (D-207).
- `game-saver.ts` takes the required option `runPasses`; `game-view.ts` gives it. `apply` calls
  `saver.moment()` once for a result holding `loopRunEnded`.
- `tests/view/account-screen.test.mjs` `onPage` fixes `Date.now` by `mock.method`; a case that needs
  another date mocks it over this.
- `guidelines/styleguide-browser-view.md` line 198 stood behind D-44 until this slice: bring its list
  of destructive buttons to the entry's words.
- Slice 5 stands at ten files, the plan's limit. A file beyond its *Change* you find you need is a
  reason to return `returned` with where the size lies, not to let the slice grow.
- The browser check: the plugin's Playwright tools (`mcp__plugin_playwright_playwright__*`, loaded by
  ToolSearch) or a script of your own in `.runs/`. Whatever you use, report the method, each state
  reached with its screenshot inspected, and each state not reached as unchecked. Any `.runs/` file
  stays out of commits, and a server you start is stopped before you return.
- Read each guideline file the *Read* names whole; a part of one is not a reading.
- Write each test first and see it fail by its assertion before the code; the method's order holds.

## Your slice, the plan's section word for word (`.runs/task-cycles/petla-zarobkowa/plan.md`)

### Slice 5 — The character's row in the headquarters

- **Goal:** The player starts, watches and stops a loop in the character's row. In detail:
  - „Puść w pętlę” stands beside „Wyślij” at each solved map and goes through `clock.startLoop` with
    the program of the row's list. The row of a character in a loop shows one line in `text`, „Pętla:
    {mapa} · przejście {n} · minuta {m} · domknięte {k}”, and the destructive button „Zatrzymaj”,
    which goes through `act`, at once and with no question. „Wyślij” and „Puść w pętlę” are disabled
    for that character alone, so the disabling in `update` knows each button's character. „Kup” and
    the row's „Program:” list stay active (spec section 12).
  - The line of To do 8 stands in `text-secondary` from `stoppedLoops`, „Pętla zatrzymana · wprawa:
    {umiejętność} +{n}, …”, or the bare „Pętla zatrzymana” where the entry is empty, names from the
    data.
  - The mark of To do 18 is a new element beside `.trip-warning`, in `warning`, under „Wyślij”, shown
    by a pure function in `trip-lines.ts`. The clipped take list is pulled out of `takeFromNowhere`
    so that the mark and the run read one cut.
  - The chest leaves `teamKey`, with its list and heading drawn on their own, so a run's deposit
    does not rebuild the rows and a select list open in a row and the focus on „Zatrzymaj” stay.
  - „Zatrzymaj” joins the destructive buttons in the rule *States of shared controls* of the
    styleguide, as the change of D-44 gives. No new token, role or shared control.
- **Change:** `src/browser/view/headquarters.ts` · `src/browser/view/game-view.ts` ·
  `src/browser/view/trip-lines.ts` · `src/browser/sim/trip.ts` · `src/browser/styles.css` ·
  `guidelines/styleguide-browser-view.md` · `tests/view/headquarters.test.mjs` ·
  `tests/view/trip.test.mjs` · `tests/view/account-screen.test.mjs` · `tests/sim/trip.test.mjs`
- **Read:** `.runs/task-cycles/petla-zarobkowa/spec.md:36-55` Constraints ·
  `.runs/task-cycles/petla-zarobkowa/spec.md:319-340` 12. The headquarters ·
  `.runs/task-cycles/petla-zarobkowa/spec.md:379-405` 15. Units and interfaces ·
  `.runs/task-cycles/petla-zarobkowa/spec.md:407-437` 16. Where the invariants are tested ·
  `.runs/task-cycles/petla-zarobkowa/spec.md:513-521` Left to the maker ·
  `.runs/task-cycles/petla-zarobkowa/task.md:20-22` To do, item 1 ·
  `.runs/task-cycles/petla-zarobkowa/task.md:26-30` To do, item 3 ·
  `.runs/task-cycles/petla-zarobkowa/task.md:41-52` To do, items 8 and 9 ·
  `.runs/task-cycles/petla-zarobkowa/task.md:86-88` To do, item 18 ·
  `.runs/task-cycles/petla-zarobkowa/task.md:127-152` Q1 to Q5 ·
  `.runs/task-cycles/petla-zarobkowa/task.md:194-199` Q14 ·
  `.runs/task-cycles/petla-zarobkowa/task.md:214-219` Q18 ·
  `.runs/task-cycles/petla-zarobkowa/task.md:353-359` Settlements to record, rows 1 to 7 ·
  `.runs/task-cycles/petla-zarobkowa/task.md:373-373` Settlements to record, row 21 ·
  src/browser/sim/loop.ts and the clock's startLoop as Slices 2 and 4 leave them, which do not
  stand at the plan's base ·
  `foundations/decisions.md:825-839` D-39 · `foundations/decisions.md:870-884` D-42 ·
  `foundations/decisions.md:900-914` D-44 · `foundations/decisions.md:1053-1075` D-53 ·
  `foundations/decisions.md:1095-1114` D-55 · `foundations/decisions.md:3053-3067` D-170 ·
  `foundations/decisions.md:3212-3226` D-179 · `foundations/decisions.md:3318-3330` D-187 ·
  `foundations/decisions.md:3331-3343` D-188 · `foundations/decisions.md:3344-3358` D-189 ·
  `foundations/decisions.md:3494-3508` D-199 · `foundations/decisions.md:3509-3523` D-200 ·
  `foundations/decisions.md:3964-3985` D-217 ·
  the entries of the plan's rows How does the player start an earning loop?, What does the player see
  of an earning loop?, What does „Zatrzymaj” do? and How does the list of maps mark a rehearsal the
  loop cannot repeat? ·
  `foundations/invariants.md:236-247` content-identifiers · `foundations/invariants.md:458-467` browser-view-token-values ·
  `foundations/invariants.md:468-477` browser-view-focus-outline · `foundations/invariants.md:958-967` trip-transfer ·
  `foundations/part_map.md:3-27` browser-view · `foundations/part_map.md:28-59` simulation ·
  `foundations/glossary.md:87-93` headquarters · `foundations/glossary.md:200-205` trip plan ·
  the glossary entry of the plan's row earning loop ·
  `guidelines/coding.md` · `guidelines/coding-browser-module.md` · `guidelines/coding-simulation-module.md` ·
  `guidelines/testing.md` · `src/browser/view/character-skills.ts:105-123` ·
  `src/browser/view/controls/button.ts` · `src/browser/sim/programs.ts:330-350`
- **Model:** cheaper
- **Risk:** none
- **Checks:** First the tests, red before the code: the pure texts of the two lines and the mark in
  `tests/view/headquarters.test.mjs` and `tests/view/trip.test.mjs`, with the mark's condition at
  stock equal to and below the clipped count and after the cut by the carrying capacity and the
  entry cap; in `tests/view/account-screen.test.mjs` each click, the buttons disabled for one
  character alone and a run's deposit leaving the row's elements in place. Then
  `npm test -- tests/view/headquarters.test.mjs` · `npm test -- tests/view/trip.test.mjs` ·
  `npm test -- tests/view/account-screen.test.mjs` · `npm test -- tests/sim/trip.test.mjs` ·
  `npm test -- tests/quality/test_quality_invariants.py` · `npm run typecheck`. A check in a browser
  by `npm run dev`, as D-75 and D-87 give: the row without a loop at a solved and an unsolved map,
  the row of a character in a loop, the line after „Zatrzymaj” with and without practice and after a
  reload, the mark, each with a screenshot inspected, focus on „Zatrzymaj” by the keyboard and a
  long row at a narrow window. A state of a solved map can come from a crafted saved document of
  version 3. A state not reached is reported as unchecked.
- **Depends on:** Slice 4 · the plan's entries How does the player start an earning loop? · What does
  the player see of an earning loop? · What does „Zatrzymaj” do? · How does the list of maps mark a
  rehearsal the loop cannot repeat? · D-44 · D-200

## Current ranges

These hold where they differ from the plan's *Read*, since the foundation step moved the entries.
Files of `src/` and `tests/` the *Read* names by range: earlier slices may have changed them, so
find the passage again by its name.

- D-226 (How does the player start an earning loop?): `foundations/decisions.md:4237-4265` — written by the foundation step
- D-227 (What does the player see of an earning loop?): `foundations/decisions.md:4266-4293` — written by the foundation step
- D-228 (What does „Zatrzymaj” do?): `foundations/decisions.md:4294-4321` — written by the foundation step
- D-234 (How does the list of maps mark a rehearsal the loop cannot repeat?): `foundations/decisions.md:4483-4505` — written by the foundation step
- D-39: `foundations/decisions.md:838-852`
- D-42: `foundations/decisions.md:883-897`
- D-44: `foundations/decisions.md:913-927`
- D-53: `foundations/decisions.md:1066-1088`
- D-55: `foundations/decisions.md:1108-1127`
- D-170: `foundations/decisions.md:3070-3084`
- D-179: `foundations/decisions.md:3229-3243`
- D-187: `foundations/decisions.md:3335-3347`
- D-188: `foundations/decisions.md:3348-3360`
- D-189: `foundations/decisions.md:3361-3375`
- D-199: `foundations/decisions.md:3511-3525`
- D-200: `foundations/decisions.md:3526-3540`
- D-217: `foundations/decisions.md:4006-4027`
- `content-identifiers`: `foundations/invariants.md:236-247`
- `browser-view-token-values`: `foundations/invariants.md:458-467`
- `browser-view-focus-outline`: `foundations/invariants.md:468-477`
- `trip-transfer`: `foundations/invariants.md:958-967`
- part `browser-view`: `foundations/part_map.md:3-27`
- part `simulation`: `foundations/part_map.md:28-59`
- glossary `headquarters`: `foundations/glossary.md:87-93`
- glossary `trip plan`: `foundations/glossary.md:200-205`
- glossary `earning loop`: `foundations/glossary.md:218-223` — written by the foundation step

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

### spec.md:319-340 — 12. The headquarters

### 12. The headquarters (To do 1, 8, 9, 18, rows 1–5, 7, 21)

- „Puść w pętlę” stands beside „Wyślij” at each solved map. It goes through a clock method like
  `clock.send`, with the program of the row's list.
- A character in a loop: one line and „Zatrzymaj” in the row; „Wyślij” and „Puść w pętlę” disabled,
  each for that character alone; `send` throws for such a character as it does for a run in progress.
  The disabling loop in `update` needs each button's character.
- „Kup” works (section 3). The row's „Program:” list stays active: it is the pick of D-170, kept for
  the next send or start, and it reaches no running loop, so P2 holds. Rejected: disabling it — a new
  state and a pick the player cannot prepare; the cost of staying active is a player who takes it for
  a switch and sees nothing happen, and the row's line says what the loop does.
- The line of To do 8 stands from `stoppedLoops`, and `send` and `startLoop` clear that character's
  entry.
- The mark of To do 18 is a new element beside `.trip-warning`, in its role, shown by a pure function
  in `trip-lines.ts`. The clipped take list is pulled out of `takeFromNowhere` so that the mark and the
  run read one cut.
- The chest leaves `teamKey`, and its list and heading are drawn on their own: live deposits and takes
  must not rebuild the rows, or a select list open in a row and the focus on „Zatrzymaj” go at every
  run's end.
- Lines are updated in place; each state change redraws them, which is once a minute for a loop.
- No new token, no new role, no new shared control. „Zatrzymaj” is the destructive button; the
  pictures of the states are already on the kitchen-sink page.

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

### task.md:20-22 — To do, item 1

1. Gracz puszcza postać w pętlę zarobkową przyciskiem „Puść w pętlę”, który stoi w wierszu postaci w siedzibie przy każdej mapie rozwiązanej, obok „Wyślij”; klik od razu puszcza postać programem z listy „Program:” tego wiersza (Q1).
   - Na mapie nierozwiązanej pętli nie ma (test loop `src/sim/sim.test.ts:1509`).
   - Postać ma najwyżej jedną pętlę (test loop `src/sim/sim.test.ts:1520`), a kilka postaci chodzi w pętlach równolegle, obok jednego ręcznego przejścia (D-55; odpowiedź P3).

### task.md:26-30 — To do, item 3

3. Pętla wykonuje kopię programu wziętą na swoim starcie, z programu, który pokazuje lista „Program:” w wierszu postaci (D-170).
   - Ten program staje się programem użytym ostatnio przez postać i tym, z którym postać ostatnio weszła na mapę, a wybór w wierszu się czyści, jak przy wysłaniu.
   - Zmiana programu po starcie pętli jej nie dosięga i działa od następnego startu pętli (test loop `src/sim/loop.test.ts:157`).
   - Usunięcie programu zostawia pętlę na kopii (D-164, D-168).
   - Postaci w pętli nie da się przełączyć na inny program (odpowiedź P2), a kopii pętli nie da się poprawić, zapisać ani porzucić (test loop `src/sim/policy.test.ts:587`).

### task.md:41-52 — To do, items 8 and 9

8. Gracz zatrzymuje pętlę przyciskiem niszczącym „Zatrzymaj” (tekst w `danger`, jak „Zakończ”), a klik działa od razu, bez pytania (odpowiedź Q5).
   - Postać wraca do zwykłego wiersza, a w nim do następnego wysłania albo puszczenia tej postaci stoi w roli `text-secondary` linia „Pętla zatrzymana · wprawa: {umiejętność} +{n}, …”.
   - Linia wraca po wczytaniu stanu gry (wiersz 7 *Settlements to record*).
   - Gdy pętla nie zebrała wprawy, linia brzmi samo „Pętla zatrzymana” (odpowiedź Q18).
   - Przedmioty niesione w przejściu w toku przepadają, a jego łup nie trafia do skrzynki (definicja, *Verification* wpisu „What pays, and what takes from the chest?”: “while its loot stays out”; D-183).
   - Gracz nie ogląda przerwanego przejścia: to nazwane odejście od loop (test loop `src/sim/sim.test.ts:1622`).
9. W wierszu postaci w pętli stoi jedna linia w roli `text`, „Pętla: {mapa} · przejście {n} · minuta {m} · domknięte {k}”, i przycisk „Zatrzymaj” (odpowiedź Q2).
   - Mapy przejścia pętli nie da się otworzyć: to nazwane odejście od loop (odpowiedź Q20; testy loop `src/sim/sim.test.ts:1622`, `:1685`).
   - Licznik zadziałań reguł (D-93) nie obejmuje pętli, więc panel programu jej nie pokazuje.
   - Start pętli nie rusza liczników, które zostawiło ręczne przejście (wiersz 4 *Settlements to record*).
   - Przy postaci w pętli „Wyślij” i „Puść w pętlę” są nieczynne i gracz najpierw zatrzymuje pętlę: to nazwane odejście od loop (odpowiedź Q3; testy loop `src/sim/sim.test.ts:1667`, `:1680`).
   - Przy postaci w pętli „Kup” działa, a kupiony stopień działa od następnego przejścia tej pętli, bo trwające zachowuje umiejętności ze swojego startu (odpowiedź Q4).

### task.md:86-88 — To do, item 18

18. Lista map oznacza ręczne przejście mapy rozwiązanej, które nie przewiduje pętli (wpis „What pays, and what takes from the chest?”; odpowiedź Q14).
    - Warunek: mapa jest rozwiązana, a któraś pozycja listy „Zabierz” programu z wiersza, po przycięciu udźwigiem i pułapem wnoszenia, przekracza zapas w skrzynce.
    - W wierszu postaci przy tej mapie, pod „Wyślij”, w roli `warning`, jak linia przycięcia z D-188, stoi: „Próba weźmie zapas, którego nie ma w skrzynce — pętla zarobkowa go nie dostanie.”

### task.md:127-152 — Q1 to Q5

- Q1. Gdzie i jakim przyciskiem gracz puszcza postać w pętlę zarobkową?
  - Answer: Droga A — przy każdej mapie rozwiązanej, obok „Wyślij”, stoi przycisk „Puść w pętlę”; klik od razu puszcza postać programem z listy „Program:”. Słaby punkt nazwany w pytaniu: kolejny przycisk w długim wierszu.
  - Not chosen:
    - B — osobna sekcja siedziby „Pętle” z wyborem postaci, mapy i programu — drugie miejsce wysyłania postaci i kilka razy więcej widoku.
  - Source: Mariusz, 2026-10-30, „przyjmuję rekomendacje” (pakiet rundy, pozycja D14). Materiał: definicja, „(new) — Who owns a program?”: “a character picks a program when it enters a map — by default the one it used last”; D-53; D-170; `src/browser/view/headquarters.ts:213`–`237`, loop2 `95de83b`.
- Q2. Co gracz widzi z trwającej pętli?
  - Answer: Droga A — w wierszu postaci jedna linia „Pętla: {mapa} · przejście {n} · minuta {m} · domknięte {k}” i przycisk zatrzymania; mapy pętli nie da się otworzyć, a licznik zadziałań reguł nie obejmuje pętli. Słaby punkt nazwany w pytaniu: gracz nie zobaczy, co postać robi ani dlaczego zginęła, a reguła „licznik w każdym przejściu” dostaje wyjątek. Podgląd może dojść później bez przeróbki pętli.
  - Not chosen:
    - B — A plus przycisk „Podgląd” z mapą do oglądania — drugi rodzaj ekranu przejścia i duży kawałek cyklu.
  - Source: Mariusz, 2026-10-30, „przyjmuję rekomendacje” (pakiet rundy, pozycja D15). Materiał: test loop `src/sim/policy.test.ts:587`; D-55; D-93; koncepcja §5; `src/browser/view/game-view.ts:236`, loop2 `95de83b`.
- Q3. Co robi „Wyślij” przy postaci, która chodzi w pętli?
  - Answer: Droga A, nazwane odejście od loop — „Wyślij” i „Puść w pętlę” są nieczynne, gracz najpierw zatrzymuje pętlę. Słaby punkt nazwany w pytaniu: jedno kliknięcie więcej.
  - Not chosen:
    - B — jak w loop: „Wyślij” sam zatrzymuje pętlę, a jedno kliknięcie po cichu gubi plecak przejścia w toku.
  - Source: Mariusz, 2026-10-30, „przyjmuję rekomendacje” (pakiet rundy, pozycja D16). Testy loop, od których zadanie odchodzi: `src/sim/sim.test.ts:1667`, `:1680`.
- Q4. Co robi „Kup” przy postaci, która chodzi w pętli, i od kiedy działa kupiony stopień gałęzi?
  - Answer: Droga A — „Kup” działa, a stopień działa od następnego przejścia pętli, bo trwające zachowuje umiejętności ze swojego startu. Słaby punkt nazwany w pytaniu: drobna zmiana przyjętej reguły kupowania (D-200).
  - Not chosen:
    - B — „Kup” nieczynny: żeby wydać punkty, gracz gubi plecak przejścia w toku.
  - Source: Mariusz, 2026-10-30, „przyjmuję rekomendacje” (pakiet rundy, pozycja D17). Materiał: D-200, D-194; testy loop tego nie pokrywają.
- Q5. Co dokładnie robi zatrzymanie pętli i co gracz wtedy widzi?
  - Answer: Co płaci — cytat zostawiony przez człowieka: wprawa zebrana przy pętli i wprawa przejścia w toku wchodzą do umiejętności, a łup tego przejścia zostaje na mapie. Definicja, „(new) — What pays, and what takes from the chest?”: “Practice earned during an earning loop is gathered there and added to the character skills when the loop stops, including practice from a run stopped before its completion without death.” *Verification*, complies: “stopping an earning loop in the middle of a map run adds the practice of that map run, while its loot stays out”. *Rationale*: “Loot leaves a map in the character's backpack, so a map run that did not complete brought nothing out; paying the earning loop's practice at its stop keeps the player fixing the program rather than waiting for a completion.”
  - Answer: Co gracz widzi — droga A, nazwane odejście od loop: przycisk niszczący „Zatrzymaj” (tekst w `danger`, jak „Zakończ”), bez pytania; postać wraca do zwykłego wiersza, a w nim stoi w roli `text-secondary` „Pętla zatrzymana · wprawa: {umiejętność} +{n}, …” do następnego wysłania albo puszczenia tej postaci. Słaby punkt nazwany w pytaniu: gracz nie obejrzy przerwanego przejścia.
  - Not chosen:
    - B — jak w loop: przejście zostaje do obejrzenia, ale to trzeci rodzaj końca przejścia i zajmuje miejsce jedynego ręcznego przejścia.
  - Source: definicja (sha256 fda97782458d, Status approved 2026-10-29), linie 1457–1459, 1471–1472, 1483–1485; Mariusz, 2026-10-30, „przyjmuję rekomendacje” (pakiet rundy, pozycje C7 i D18). Test loop, od którego zadanie odchodzi: `src/sim/sim.test.ts:1622`.

### task.md:194-199 — Q14

- Q14. Czy oznaczenie na liście map, że ręczne przejście mapy rozwiązanej nie przewiduje pętli zarobkowej, robi zadanie 14, czy to zadanie, a jeśli to zadanie, jaki ma warunek, tekst i rolę? (pytanie kanoniczne: Q5 rozmowy refinementu zadania 14)
  - Answer: Droga B — to zadanie, które wnosi pętlę i może użyć jej nazwy z ekranu; warunek, tekst i rola stoją w *To do* 18. Słaby punkt nazwany w pytaniu: do scalenia tego zadania próba bierze zapas bez słowa, ale nie ma jeszcze czego przewidywać, a droga odchodzi od zdania dokumentu zadania 13, który człowiek przyjął.
  - Not chosen:
    - A — zadanie 14 robi oznaczenie — warunek: mapa rozwiązana, a któraś pozycja listy „Zabierz” programu z wiersza, po przycięciu udźwigiem i pułapem wnoszenia, przekracza zapas w skrzynce; tekst: „Próba weźmie zapas, którego nie ma w skrzynce — pętla zarobkowa go nie dostanie.”, w wierszu postaci przy tej mapie, pod „Wyślij”, w roli `warning`. Koszt: gra mówi o pętli, której jeszcze nie ma.
    - (tekst) inny tekst, podany przez człowieka — pozycja D26 pakietu; koszt nie został nazwany.
  - Source: Mariusz, 2026-10-30, „przyjmuję wszystko zgodnie z rekomendacjami” (pakiet rundy, pozycja D2) i „przyjmuję rekomendacje” (pozycja D26). Zdanie, od którego zadanie odchodzi: dokument zadania 13, zamrożona kopia, commit 1b09f80c, `docs/task-cycles/plan-wyprawy/task.md:208`. Definicja, linie 1461–1462: “the list of maps marks it as not predicting the earning loop when the chest lacks that equipment”.

### task.md:214-219 — Q18

- Q18. Jak brzmi linia po zatrzymaniu pętli, która nie zebrała wprawy?
  - Answer: Droga A — samo „Pętla zatrzymana”. Słaby punkt nazwany w pytaniu: jeden warunek w widoku; to ta sama zasada co w raporcie, gdzie puste części są pominięte.
  - Not chosen:
    - B — brak linii — nic nie mówi, że stało się to, o co gracz prosił.
    - C — „Pętla zatrzymana · wprawa: nic”, jak „Wyniesie: nic” — linia mówi o wprawie, której nie było.
  - Source: Mariusz, 2026-10-30, „wszystko zgodnie z rekomendacją mi pasuje” (pakiet rundy, pozycja 18-Q18). Materiał: D-201 `foundations/decisions.md:3511`, D-186 `:3296`; testy loop tekstu tej linii nie pokrywają.

### task.md:353-359 — Settlements to record, rows 1 to 7

| 1 | Gracz puszcza postać w pętlę przyciskiem „Puść w pętlę”, który stoi dziś w wierszu postaci w siedzibie przy każdej mapie rozwiązanej, obok „Wyślij”, bierze program z listy „Program:” tego wiersza i działa od razu po kliknięciu. | decision | pytanie Q1, droga A (Mariusz, 2026-10-30, pozycja D14), *Not chosen* tam; propozycja refinera: „działa od razu po kliknięciu”, którego pozycja D14 nie pokazała | gdzie stoi przycisk, jak się nazywa, skąd bierze program i czy pyta przed startem |
| 2 | Puszczenie w pętlę liczy się dla listy „Program:” jak wysłanie: program staje się użytym ostatnio i tym, z którym postać ostatnio weszła na mapę, a wybór w wierszu się czyści. | decision | propozycja refinera, cały wiersz: *To do* 3, krok od D-170: “The player picks the program a character enters a map with on the select list „Program: {name}””, która mówi tylko o wejściu na mapę | czy start pętli zmienia to, co wiersz pokaże przy następnym wysłaniu |
| 3 | Trwającą pętlę gracz widzi dziś w wierszu postaci: jedna linia w roli `text`, „Pętla: {mapa} · przejście {n} · minuta {m} · domknięte {k}”, i przycisk „Zatrzymaj”. | decision | pytanie Q2, droga A (pozycja D15), *Not chosen* tam; nazwane odejście od loop, którego testy zakładają, że przejście pętli da się obejrzeć (`src/sim/sim.test.ts:1622`, `:1685`), przyjęte w pytaniu Q20, *Not chosen* tam; propozycja refinera: rola `text`, czyli zwykły kolor tekstu | co i gdzie pokazać z pętli |
| 4 | Mapy przejścia pętli gra dziś nie otwiera, licznik zadziałań reguł obejmuje ręczne przejście, a start pętli zostawia liczniki po ręcznym przejściu takie, jakie były. | decision | pytanie Q2, droga A (pozycja D15), *Not chosen* tam; to samo nazwane odejście od loop co w wierszu 3, pytanie Q20; zmienia D-93: “During a map run every program rule of the copy the map run carries out shows how many times it fired in that map run”; propozycja refinera: część o starcie pętli, bo D-93 trzyma liczniki “until the next send or map run restart”, a pozycja D15 o tym nie mówi | czy budować drugi ekran przejścia, czy liczyć i pokazywać liczniki pętli i czy jej start czyści liczniki po ręcznym przejściu |
| 5 | Przy postaci w pętli „Wyślij” i „Puść w pętlę” są dziś nieczynne, a gracz najpierw ją zatrzymuje. | decision | pytanie Q3, droga A (pozycja D16), *Not chosen* tam; nazwane odejście od loop, gdzie „Wyślij” sam zatrzymuje pętlę | czy „Wyślij” sam zatrzymuje pętlę, jak w loop |
| 6 | Przy postaci w pętli „Kup” działa, a kupiony stopień działa od następnego przejścia tej pętli, gdy trwające zachowuje umiejętności ze swojego startu. | decision | pytanie Q4, droga A (pozycja D17), *Not chosen* tam; zmienia D-200: “The player currently buys a branch rank with „Kup” in the headquarters outside a map run”; propozycja refinera: „gdy trwające zachowuje umiejętności ze swojego startu”, którego pozycja D17 nie pokazała | czy wyłączyć „Kup” i czy stopień wchodzi do trwającego przejścia |
| 7 | „Zatrzymaj” to przycisk niszczący z tekstem w roli `danger`, który działa od razu po kliknięciu: przedmioty niesione w przerwanym przejściu przepadają, jego łup nie trafia do skrzynki, postać wraca do zwykłego wiersza, a w nim do następnego wysłania albo puszczenia tej postaci, także po wczytaniu stanu gry, stoi w roli `text-secondary` „Pętla zatrzymana · wprawa: {umiejętność} +{n}, …”, a gdy pętla nie zebrała wprawy, samo „Pętla zatrzymana”. | decision | pytanie Q5, droga A, nazwane odejście od loop (pozycje C7 i D18), *Not chosen* tam; zmienia D-183: “When „Zakończ” or „Restart” ends a map run before completion, its carried items — brought in and gathered — are lost.”; propozycja refinera: obie role (pozycja D18 mówi „w kolorze ostrzegawczym”), „do następnego wysłania albo puszczenia”, „także po wczytaniu stanu gry”; linia przy pętli, która nie zebrała wprawy — pytanie Q18, droga A, *Not chosen* tam | czy pytać o potwierdzenie, czy zostawić przejście do obejrzenia, jak w loop, czy pokazać, co weszło, co dzieje się z plecakiem i czy linia przeżywa przeładowanie |

### task.md:373-373 — Settlements to record, row 21

| 21 | Przy mapie rozwiązanej, gdy któraś pozycja listy „Zabierz” programu z wiersza, po przycięciu udźwigiem i pułapem wnoszenia, przekracza zapas w skrzynce, pod „Wyślij” stoi w roli `warning` „Próba weźmie zapas, którego nie ma w skrzynce — pętla zarobkowa go nie dostanie.” | decision | pytanie Q14 (pozycje D2 i D26), *Not chosen* tam; propozycja refinera: „programu z wiersza”, „po przycięciu udźwigiem i pułapem wnoszenia” i rola `warning` (pozycja D26 mówi „lista „Zabierz” przekracza zapas w skrzynce” i „kolorem ostrzegawczym”) | jaki warunek, tekst i miejsce ma oznaczenie, którego wpis nie opisuje |
