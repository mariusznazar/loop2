# Handoff — executor of Slice 1 — The saved document of version 3, task `petla-zarobkowa`

## Delegation and stage

The person who requested this cycle (the product's owner) delegated the cycle's intermediate
choices to the orchestrator of `implement-task`. You are the executor of one slice, a fresh agent.
Your questions go to the orchestrator, never to the human; you return at your slice's boundary.

- Worktree (work from its root): `C:\Storage\repos\loop2-wt\petla-zarobkowa`, branch
  `task/petla-zarobkowa`, head `96d7b45`. Process pin `.the-way` at `a8dfe8a`. Pinned quality tools
  stand in `.runs/quality-venv`; `node_modules` is installed.
- Method: `.the-way/task-cycle/change/SKILL.md` in the worktree. Read it whole; read a file it names
  only when the step or variant that names it comes.
- Variant: "a slice, or the retry of a slice".
- Report path: `.runs/task-cycles/petla-zarobkowa/reports/05-slice1-report.md`
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

- Slice 1 stands at ten files, the plan's limit. A file beyond its *Change* that you find you need is
  a reason to return `returned` with where the size lies, not to let the slice grow.
- The foundation step's report, `.runs/task-cycles/petla-zarobkowa/reports/04-foundation-report.md`,
  holds what it wrote. New decisions are numbered D-222 to D-234; the section *Current ranges* below
  gives their ranges. `src/browser/view/game-saver.ts:16` and `tests/view/game-saver.test.mjs:228`
  stay behind D-207 and D-208 until Slice 4, as the plan gives: do not change them here.
- `saveTimeMs` null is refused at load, so every path that writes a document must stamp it, and every
  round trip in a test must stamp too.

## Your slice, the plan's section word for word (`.runs/task-cycles/petla-zarobkowa/plan.md`)

### Slice 1 — The saved document of version 3

- **Goal:** Every saved document the game writes is of version 3, carries a save time and loads, and
  a forged or malformed earning loop, stopped-loop entry, report line or save time is refused whole.
  In detail:
  - `GameState` holds the four keys of spec section 1 — `loops`, `stoppedLoops`, `awayReport`,
    `saveTimeMs` — with the types `EarningLoop` and the report line (spec sections 1, 11); `newGame`
    gives them empty and `saveTimeMs` null. No function fills them yet but `withSaveTime`.
  - `SAVED_GAME_VERSION` is 3. `GAME_KEYS` gains the four keys, `mapRun` splits into the reading of a
    `MapRun` and the tail of a `GameMapRun`, and every condition of spec section 13 is refused as
    `shape`. `saved-game.ts` takes no real time and `savedGame` stays as it is.
  - `withSaveTime(state, nowMs)` stands in `game.ts` (spec section 9). The saver takes the option
    `moment`, the clock's reading, and stamps each document on its way out; `keep()` makes its
    document the same way. The view's state is not replaced, and `baseline` stays the state read,
    so the comparison by identity keeps its meaning. Nothing else of the saver changes here: its
    rhythm and its too-large sentence are Slice 4's.
  - The shape is whole after this slice: no later slice changes `saved-game.ts`.
  - Each existing test that changes carries its cause, To do 10 with D-206 and row 13, as the rule
    *Changing an existing test* asks: in `tests/sim/saved-game.test.mjs` the two documents rewritten
    with the raise and filling every new branch, the version 2 document kept beside the version 1
    one and refused as `version`, the cases at `:712`–`:733` that take 3 for another version moved to
    a number that is another version now, and the stamped round trips at `:1671` and `:1687`; the
    round trips at `tests/sim/death.test.mjs:215`, `:322`, `tests/view/trip.test.mjs:241`,
    `tests/view/game-saver.test.mjs:405`; `submissionOf` (`:174`) and `:274` of
    `tests/view/game-saver.test.mjs`; in `tests/view/account-screen.test.mjs` `VERSION` (`:1060`),
    `saveOf` (`:1068`), `submission` (`:1073`) and the case „another version” at `:1715`, which takes
    3. So no test stays red for a later slice to repair.
- **Change:** `src/browser/sim/types.ts` · `src/browser/sim/game.ts` · `src/browser/sim/saved-game.ts` ·
  `src/browser/view/game-saver.ts` · `src/browser/view/game-view.ts` ·
  `tests/sim/saved-game.test.mjs` · `tests/sim/death.test.mjs` · `tests/view/game-saver.test.mjs` ·
  `tests/view/trip.test.mjs` · `tests/view/account-screen.test.mjs`
- **Read:** `.runs/task-cycles/petla-zarobkowa/spec.md:36-55` Constraints ·
  `.runs/task-cycles/petla-zarobkowa/spec.md:59-96` 1. The game state holds loops beside the one manual run ·
  `.runs/task-cycles/petla-zarobkowa/spec.md:241-265` 9. The save time ·
  `.runs/task-cycles/petla-zarobkowa/spec.md:286-317` 11. The report ·
  `.runs/task-cycles/petla-zarobkowa/spec.md:342-368` 13. The saved document ·
  `.runs/task-cycles/petla-zarobkowa/spec.md:406-436` 16. Where the invariants are tested ·
  `.runs/task-cycles/petla-zarobkowa/spec.md:512-520` Left to the maker ·
  `.runs/task-cycles/petla-zarobkowa/task.md:53-56` To do, item 10 ·
  `.runs/task-cycles/petla-zarobkowa/task.md:165-169` Q8 ·
  `.runs/task-cycles/petla-zarobkowa/task.md:363-363` Settlements to record, row 11 ·
  `.runs/task-cycles/petla-zarobkowa/task.md:365-365` Settlements to record, row 13 ·
  `foundations/decisions.md:57-118` D-04 · `foundations/decisions.md:1115-1141` D-56 ·
  `foundations/decisions.md:1757-1771` D-96 · `foundations/decisions.md:3630-3655` D-206 ·
  `foundations/decisions.md:3656-3699` D-207 · `foundations/decisions.md:3739-3782` D-209 ·
  `foundations/decisions.md:3810-3842` D-211 · `foundations/decisions.md:3843-3880` D-212 ·
  `foundations/decisions.md:3881-3906` D-213 · `foundations/decisions.md:4036-4062` D-221 ·
  the entries of the plan's rows How does the game state hold earning loops?, What is the save time?,
  What does „Zatrzymaj” do? and What does the player read after being away? ·
  `foundations/invariants.md:214-225` simulation-isolation · `foundations/invariants.md:226-235` simulation-inputs ·
  `foundations/invariants.md:1028-1037` save-version · `foundations/invariants.md:1058-1067` death-settled-once ·
  `foundations/part_map.md:3-27` browser-view · `foundations/part_map.md:28-59` simulation ·
  `foundations/glossary.md:18-24` map run · `foundations/glossary.md:131-136` manual map run ·
  `foundations/glossary.md:181-186` practice · the glossary entries of the plan's rows earning loop
  and save time ·
  `guidelines/coding.md` · `guidelines/coding-saved-game.md` · `guidelines/coding-simulation-module.md` ·
  `guidelines/coding-browser-module.md` · `guidelines/styleguide-browser-view.md` · `guidelines/testing.md` ·
  `src/browser/view/clock.ts` · `src/browser/view/app.ts:184-262` · `src/browser/sim/skills.ts`
- **Model:** same — the slice crosses two parts and holds the trust boundary and the raise of the
  version, and the writer and the reader of the document have to agree on every key.
- **Risk:** trust boundary — `src/browser/sim/saved-game.ts` reads the new fields out of a document
  from outside, where a forged or malformed value is refused whole · cannot be undone — raising
  `SAVED_GAME_VERSION` makes the game discard every older saved game state in full at load (D-206)
  once the merge deploys `main` (D-11); the slice only prepares the number and performs nothing on
  the server.
- **Checks:** First the test: the rewritten document and each condition of spec section 13 added to
  the crafted documents of „a crafted document of the current version is refused whole as shape”,
  red with `npm test -- tests/sim/saved-game.test.mjs` before the code. Then
  `npm test -- tests/sim/saved-game.test.mjs` · `npm test -- tests/sim/death.test.mjs` ·
  `npm test -- tests/view/game-saver.test.mjs` · `npm test -- tests/view/trip.test.mjs` ·
  `npm test -- tests/view/account-screen.test.mjs` · `npm test -- tests/invariants/test_simulation_inputs.py` ·
  `npm test -- tests/quality/test_quality_invariants.py` · `npm run typecheck`. A test of the saver
  and of `keep()` shows each document holding the clock's moment and loading, and no send after the
  load of an unchanged paused state.
- **Depends on:** the plan's entries How does the game state hold earning loops? · What is the save
  time? · `earning loop` · `save time`

## Current ranges

These hold where they differ from the plan's *Read*, since the foundation step moved the entries.
Files of `src/` and `tests/` the *Read* names by range: earlier slices may have changed them, so
find the passage again by its name.

- D-224 (How does the game state hold earning loops?): `foundations/decisions.md:4161-4193` — written by the foundation step
- D-228 (What does „Zatrzymaj” do?): `foundations/decisions.md:4294-4321` — written by the foundation step
- D-229 (What does the player read after being away?): `foundations/decisions.md:4322-4371` — written by the foundation step
- D-231 (What is the save time?): `foundations/decisions.md:4401-4435` — written by the foundation step
- D-04: `foundations/decisions.md:57-118`
- D-56: `foundations/decisions.md:1128-1154`
- D-96: `foundations/decisions.md:1774-1788`
- D-206: `foundations/decisions.md:3647-3672`
- D-207: `foundations/decisions.md:3673-3734`
- D-209: `foundations/decisions.md:3781-3824`
- D-211: `foundations/decisions.md:3852-3884`
- D-212: `foundations/decisions.md:3885-3922`
- D-213: `foundations/decisions.md:3923-3948`
- D-221: `foundations/decisions.md:4078-4105`
- `simulation-isolation`: `foundations/invariants.md:214-225`
- `simulation-inputs`: `foundations/invariants.md:226-235`
- `save-version`: `foundations/invariants.md:1028-1037`
- `death-settled-once`: `foundations/invariants.md:1058-1067`
- part `browser-view`: `foundations/part_map.md:3-27`
- part `simulation`: `foundations/part_map.md:28-59`
- glossary `map run`: `foundations/glossary.md:18-24`
- glossary `manual map run`: `foundations/glossary.md:131-136`
- glossary `practice`: `foundations/glossary.md:181-186`
- glossary `earning loop`: `foundations/glossary.md:218-223` — written by the foundation step
- glossary `save time`: `foundations/glossary.md:230-235` — written by the foundation step

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

### spec.md:59-96 — 1. The game state holds loops beside the one manual run

### 1. The game state holds loops beside the one manual run (carried question 1)

`GameState.run` stays the one manual map run. `paused`, `pace`, `discovery`, `realMsCarry`,
`ruleCounts` and `countsProgram` stay its alone. Four keys are added:

- `loops`, an `EarningLoop` by character number. A key names a team's character (D-56) and a
  character has at most one loop by the shape itself. Iteration goes by the team's list, never by
  this record.
- `stoppedLoops`, by character number, the practice paid at the stop: what the line of To do 8 needs
  until the next send or loop start of that character.
- `awayReport`, a list of lines, empty in a new game (section 11).
- `saveTimeMs`, a number or null (section 9).

An `EarningLoop` holds `program` (the content taken at the start, nothing else of the copy),
`run` (a plain `MapRun`, its `character.id` equal to the key), `runNumber` from 1, `completed` from
0, and `practice`, the practice gathered from completed runs.

A loop's run always goes on: in every game state the view holds or a document admits, it has no
death and no completion, because the end of a run is dealt with inside the function that reached it.
So no field like `deposited`, `deathSettlement` or `solvedMapRun` is needed. `bringPlan` is not
needed either: the copy never changes, so each run binds the same list anew from
`program.tripPlan.bring`.

Rejected:

- Runs by character replacing `run`, which task 11 foresaw. Every file that reads `state.run` changes
  (15 under `src/browser`), and D-55 keeps one manual run anyway.
- A loop holding a `GameMapRun` with a `ProgramCopy`. It reuses the load check whole, but it carries
  `base`, `programId`, `deletedName`, `bringPlan`, `deposited` and `deathSettlement` that a loop never
  reads, doubles the program in a save under 64 KiB, and makes `deleteProgram` reach into loops.
- A loop on `Character`. `team()` reads characters before the records a loop's check needs.

Cost if wrong: a later preview of a loop's run needs more of the copy, which is a shape change and a
version raise. Task Q2 says a preview can come later; that stays possible.

Deleting a program, editing it, or a rule written at a discovery reach no loop, since a loop's copy
has no link to the program (To do 3, D-164, D-168). No function offers an edit of it
(`src/sim/policy.test.ts:587`).

### spec.md:241-265 — 9. The save time

### 9. The save time (To do 10, row 13, carried question 5)

`saveTimeMs` is null in a game that never came from a save, and afterwards the moment of the save the
state came from. A small function of the simulation, `withSaveTime(state, nowMs)`, returns a copy of
the state with that moment, the moment no safe integer being a `RangeError` as in `settleDeath`. The
saver and `keep()` apply it to the state **on the way to the document only**: the view's state is not
replaced. `savedGame` stays as it is and takes no real time. The moment is the clock's reading made by
the flush that came right before.

So the save time changes at every save and no game state changes by it. The rhythm and the hidden
page compare `read()` with `baseline` by identity, so a loaded state with its run paused and nothing
passing sends nothing, and D-207's *Verification* stays true. The live `saveTimeMs` goes stale after
the first save; only `catchUp` reads it, once, on a loaded state.

A document's save time is the moment of saving, not the loop clock, so the part of a loop minute that
had passed before the save is not counted after a load: at most a minute per load. This is To do 11's
own words, "pełne minuty od chwili zapisu". Between saves the tab passes loop minutes in memory; a
tab closed with its last save lost replays them from the save before, the same way (Q11).

Rejected: stamping the live state at each save — it needs the saver to write through the store and
compare against stamped states, for a value nobody reads; a key of the document beside `game`, as
loop has it — the server keeps `version`, `revision` and `game`, so it would be lost; `savedGame`
taking the moment — it would work, and the guidelines' ban is on the load, but the handoff asks to
keep `saved-game.ts` free of real time, and the separate function costs nothing; the loop clock as the
save time — no loss at load, at the price of a "save time" that is not the moment of the save.

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

### spec.md:342-368 — 13. The saved document

### 13. The saved document (To do 10, `guidelines/coding-saved-game.md`)

`SAVED_GAME_VERSION` becomes 3. `GAME_KEYS` gains the four keys. `mapRun` splits into the reading of a
`MapRun` and the tail of a `GameMapRun`, so a loop's run is read by the same checks with its own keys.
The test document is rewritten with the raise; the version 2 document stays in the test, refused as
another version, like version 1.

Every condition, each refused as `shape`:

- `saveTimeMs`: a safe integer from 0 up, so null is refused. Every document is stamped; a clock
  cannot read below zero.
- `loops`: a key in canonical form naming a character of the team, and not the character of `run`.
  `program` by the program check. `run`: the map run's checks with exactly the `MapRun` keys;
  `character.id` equal to the key; skills by `characterSkills` for that archetype; **no death and no
  completion**, which also means an activity or combat going on; the map among `solvedMaps`.
  `runNumber` from 1, `completed` a count below `runNumber`, `practice` by `practice`.
- `stoppedLoops`: a key naming a character of the team, a character with no loop and not the
  character of `run`; a value by `practice`, empty allowed.
- `awayReport`: `characterId` in the team; `minutes` a count; `chest` keys of `ITEMS`, each a non-zero
  safe integer; `practice` by `practice`; `resurrectionUsed` a flag; `stop` null, or a generation from
  2 up to the character's current one with a flag `away`. A line with `stop` null has minutes from 1;
  `away` true has minutes from 1. At most one open line per character.

The existing rule that a manual run's mark follows `solvedMaps` stays: no loop's run adds to them.

The load reads the save time as a number, as it reads `resurrectionReadyAtMs`. A save time far in the
past with a loop means a long catch-up for the owner of that save; D-07 and Q7 accept that.

### spec.md:406-436 — 16. Where the invariants are tested

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

### spec.md:512-520 — Left to the maker

## Left to the maker

- Names of private helpers, how `loop.ts` divides inside, and field order in types.
- The exact class names and rules in `src/browser/styles.css`, reading tokens only.
- Where the row's lines stand among the row's elements, keeping To do 18's mark under „Wyślij”.
- Where focus goes when „Zamknij” removes itself from the screen, within D-42.
- How tests divide into files, and listing a new `tests/sim` file in `stryker.config.json`.
- A sentence for `guidelines/coding-saved-game.md` on a loop's run, if the change makes one earn its
  place; the file's rules hold without it.

### task.md:53-56 — To do, item 10

10. Zapis stanu gry niesie chwilę realną z zegara przeglądarki, od której liczy się nieobecność (odpowiedź Q8; test loop `src/sim/sim.test.ts:1970`).
    - Serwer zostaje bez zmian: kolumny na tę chwilę nie ma i nie przybywa.
    - Tym samym zegarem zadanie 14 liczy odnowienie wskrzeszenia.
    - Zmiana kształtu stanu gry podnosi `SAVED_GAME_VERSION` (`guidelines/coding-saved-game.md`, „Wersja podnoszona razem z kształtem”), więc zapisy starszej wersji przepadają w całości (D-206).

### task.md:165-169 — Q8

- Q8. Czyim zegarem liczy się chwilę zapisu: przeglądarki czy serwera?
  - Answer: Droga A — zegar przeglądarki, jak w loop; chwila leży w stanie gry, a tym samym zegarem zadanie 14 liczy odnowienie wskrzeszenia. Słaby punkt nazwany w pytaniu: zły zegar urządzenia dolicza za dużo albo zero minut, a gracz może oszukać, co decyzje już przyjmują dla własnego postępu.
  - Not chosen:
    - B — zegar serwera — nowa wersja bazy kont z krokiem człowieka na serwerze, zmiana dwóch decyzji, a otwarta karta i tak idzie zegarem przeglądarki, więc w grze byłyby dwa zegary.
  - Source: Mariusz, 2026-10-30, „przyjmuję rekomendacje” (pakiet rundy, pozycja D21). Materiał: D-04; D-07, *Rationale*: “Players can replace their own saved game states and forge their own progress. The MVP accepts that cost”; definicja, Out of scope; test loop `src/sim/sim.test.ts:1975`.

### task.md:363-363 — Settlements to record, row 11

| 11 | Raport leży w stanie gry, więc przeżywa przeładowanie. | decision | pytanie Q6, droga A (pozycja D19: „nowy kawałek stanu gry”); propozycja refinera: „przeżywa przeładowanie” | czy raport przeżywa przeładowanie |

### task.md:365-365 — Settlements to record, row 13

| 13 | Chwilę zapisu, po angielsku `save time`, podaje zegar przeglądarki, a leży ona w stanie gry. | decision | pytanie Q8, droga A (pozycja D21), *Not chosen* tam; propozycja refinera: „leży w stanie gry” i słowo `save time`, bo “moment of saving” w D-207 znaczy co innego: okazję do wysłania zapisu | czy dodać kolumnę w bazie kont, który zegar wskazać i jakim angielskim słowem nazwać tę chwilę |
