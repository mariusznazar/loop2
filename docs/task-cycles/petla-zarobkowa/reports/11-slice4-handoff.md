# Handoff — executor of Slice 4 — The clock drives loops, and the saver follows, task `petla-zarobkowa`

## Delegation and stage

The person who requested this cycle (the product's owner) delegated the cycle's intermediate
choices to the orchestrator of `implement-task`. You are the executor of one slice, a fresh agent.
Your questions go to the orchestrator, never to the human; you return at your slice's boundary.

- Worktree (work from its root): `C:\Storage\repos\loop2-wt\petla-zarobkowa`, branch
  `task/petla-zarobkowa`, head `ca55922`. Process pin `.the-way` at `a8dfe8a`. Pinned quality tools
  stand in `.runs/quality-venv`; `node_modules` is installed.
- Method: `.the-way/task-cycle/change/SKILL.md` in the worktree. Read it whole; read a file it names
  only when the step or variant that names it comes.
- Variant: "a slice, or the retry of a slice".
- Report path: `.runs/task-cycles/petla-zarobkowa/reports/11-slice4-report.md`
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

- Slices 1 to 3 are made, head `ca55922`. `src/browser/sim/loop.ts` exports, beside Slice 2's
  functions, `loopSpan`, `passLoops`, `catchUp` and `closeAwayReport`. `passLoops` and `catchUp`
  return `LoopPass`, that is `GameResult & { clockMs }`; `closeAwayReport` returns a `GameResult` with
  `events: []`. `loopSpan`, `passLoops` and `catchUp` throw a `RangeError` on a moment that is no
  safe integer. With no loop `passLoops` returns the very state and `clockMs: nowMs`; `catchUp` with
  `saveTimeMs` null or no loop returns the very state and `clockMs: nowMs`, and with a loop and no
  whole minute `clockMs` is the save time, or on a turned-back clock `nowMs`. Read those exports
  from the file. The executor's report:
  `.runs/task-cycles/petla-zarobkowa/reports/10-slice3-report.md`.
- `src/browser/view/game-saver.ts:16` and `tests/view/game-saver.test.mjs:228` stood behind D-207 and
  D-208 until this slice: bring them to the entries' words. `GameSaver.moment()` is a moment of
  saving, and the option `moment` is the clock's reading.
- `tests/view/account-screen.test.mjs` `onPage` fixes `Date.now` by `mock.method`; a case that needs
  another date mocks it over this.
- `npm test -- <file>` builds. A direct `node --test` needs `npm run build` first.
- Write each test first and see it fail by its assertion before the code; the method's order holds.

## Your slice, the plan's section word for word (`.runs/task-cycles/petla-zarobkowa/plan.md`)

### Slice 4 — The clock drives loops, and the saver follows

- **Goal:** The open game passes loops and a load catches up, with saving as To do 17 gives. No new
  thing shows on a screen yet. In detail:
  - The view's clock holds the loop clock, a date read from `Date.now()`, gains `startLoop(ids)` and
    `catchUp()`, and in each reading goes: the manual run and its settling as today, then the loops,
    then one `store.apply` with the events together. It takes its new value **before** it hands the
    result to the store, so a moment of saving inside `apply`, which reads the clock again, passes
    no minute twice (spec section 6).
  - `createGameView` asks its clock to catch up as the last step of building, so all four places of
    loading go the same way and `app.ts` does not change (spec section 8).
  - `store.apply` calls `saver.moment()` once when a result's events hold a `loopRunEnded`, however
    many. The 30-second rhythm checks only while a manual map run passes, by a predicate the saver
    takes; `check()` and the hidden page keep their rule. The too-large sentence becomes the one of
    To do 17 (row 19), and its test follows, the cause being Q12.
- **Change:** `src/browser/view/clock.ts` · `src/browser/view/game-saver.ts` ·
  `src/browser/view/game-view.ts` · `tests/view/clock.test.mjs` · `tests/view/game-saver.test.mjs` ·
  `tests/view/account-screen.test.mjs`
- **Read:** `.runs/task-cycles/petla-zarobkowa/spec.md:36-55` Constraints ·
  `.runs/task-cycles/petla-zarobkowa/spec.md:172-204` 6. The loop clock ·
  `.runs/task-cycles/petla-zarobkowa/spec.md:228-239` 8. The catch-up is a step of its own after a load ·
  `.runs/task-cycles/petla-zarobkowa/spec.md:241-265` 9. The save time ·
  `.runs/task-cycles/petla-zarobkowa/spec.md:267-284` 10. Saving ·
  `.runs/task-cycles/petla-zarobkowa/spec.md:379-405` 15. Units and interfaces ·
  `.runs/task-cycles/petla-zarobkowa/spec.md:407-437` 16. Where the invariants are tested ·
  `.runs/task-cycles/petla-zarobkowa/task.md:23-25` To do, item 2 ·
  `.runs/task-cycles/petla-zarobkowa/task.md:57-61` To do, item 11 ·
  `.runs/task-cycles/petla-zarobkowa/task.md:65-65` To do, item 13 ·
  `.runs/task-cycles/petla-zarobkowa/task.md:82-85` To do, item 17 ·
  `.runs/task-cycles/petla-zarobkowa/task.md:179-190` Q11 and Q12 ·
  `.runs/task-cycles/petla-zarobkowa/task.md:370-371` Settlements to record, rows 18 and 19 ·
  `.runs/task-cycles/petla-zarobkowa/task.md:377-377` Settlements to record, row 25 ·
  src/browser/sim/loop.ts as Slice 3 leaves it, which does not stand at the plan's base ·
  `foundations/decisions.md:57-118` D-04 · `foundations/decisions.md:1757-1771` D-96 ·
  `foundations/decisions.md:3656-3699` D-207 · `foundations/decisions.md:3700-3738` D-208 ·
  `foundations/decisions.md:3739-3782` D-209 · `foundations/decisions.md:3810-3842` D-211 ·
  `foundations/decisions.md:3843-3880` D-212 · `foundations/decisions.md:4003-4020` D-219 ·
  `foundations/decisions.md:4036-4062` D-221 ·
  the entries of the plan's rows Which clock drives an earning loop?, When is time away computed, and
  how much?, What does a pause or an end screen hold? and What is the save time? ·
  `foundations/invariants.md:998-1007` expired-session-unsaved-progress ·
  `foundations/invariants.md:1048-1057` resurrection-renewal ·
  `foundations/invariants.md:1058-1067` death-settled-once ·
  `foundations/part_map.md:3-27` browser-view ·
  the glossary entries of the plan's rows earning loop, catch-up and save time ·
  `guidelines/coding.md` · `guidelines/coding-browser-module.md` · `guidelines/styleguide-browser-view.md` ·
  `guidelines/testing.md` · `src/browser/view/app.ts:184-262` · `src/browser/sim/game.ts:479-509`
- **Model:** cheaper
- **Risk:** none
- **Checks:** First the tests, red before the code: in `tests/view/clock.test.mjs` the order of a
  reading, minutes never passed twice when `apply` reads the clock again, a date turned back, the
  catch-up's use of its moment; in `tests/view/game-saver.test.mjs` the rhythm silent without a
  manual map run passing, a hidden page and an act still sending, each document holding a save time
  that loads, no send after the load of an unchanged paused state; in
  `tests/view/account-screen.test.mjs` a loaded game with a loop caught up once, one save for a
  catch-up that ended a run, none for one that ended no run. Then `npm test -- tests/view/clock.test.mjs` ·
  `npm test -- tests/view/game-saver.test.mjs` · `npm test -- tests/view/account-screen.test.mjs` ·
  `npm test -- tests/quality/test_quality_invariants.py` · `npm run typecheck`
- **Depends on:** Slice 1 · Slice 3 · the plan's entries Which clock drives an earning loop? · When
  is time away computed, and how much? · What does a pause or an end screen hold? · D-207 · D-208

## Current ranges

These hold where they differ from the plan's *Read*, since the foundation step moved the entries.
Files of `src/` and `tests/` the *Read* names by range: earlier slices may have changed them, so
find the passage again by its name.

- D-225 (Which clock drives an earning loop?): `foundations/decisions.md:4194-4236` — written by the foundation step
- D-230 (When is time away computed, and how much?): `foundations/decisions.md:4372-4400` — written by the foundation step
- D-231 (What is the save time?): `foundations/decisions.md:4401-4435` — written by the foundation step
- D-233 (What does a pause or an end screen hold?): `foundations/decisions.md:4460-4482` — written by the foundation step
- D-04: `foundations/decisions.md:57-118`
- D-96: `foundations/decisions.md:1774-1788`
- D-207: `foundations/decisions.md:3673-3734`
- D-208: `foundations/decisions.md:3735-3780`
- D-209: `foundations/decisions.md:3781-3824`
- D-211: `foundations/decisions.md:3852-3884`
- D-212: `foundations/decisions.md:3885-3922`
- D-219: `foundations/decisions.md:4045-4062`
- D-221: `foundations/decisions.md:4078-4105`
- `expired-session-unsaved-progress`: `foundations/invariants.md:998-1007`
- `resurrection-renewal`: `foundations/invariants.md:1048-1057`
- `death-settled-once`: `foundations/invariants.md:1058-1067`
- part `browser-view`: `foundations/part_map.md:3-27`
- glossary `earning loop`: `foundations/glossary.md:218-223` — written by the foundation step
- glossary `catch-up`: `foundations/glossary.md:224-229` — written by the foundation step
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

### spec.md:172-204 — 6. The loop clock

### 6. The loop clock (carried question 3)

The loop clock is one number held by the view's clock (`src/browser/view/clock.ts`), a date in
milliseconds up to which whole loop minutes have been counted. The game state does not hold it: a
state field changing with readings is what D-04 rejects, and between whole minutes the state has to
stay the very same object (section 10).

It reads `Date.now()`, not `performance.now()`. The manual run keeps its elapsed measure, so a date
that jumps changes no pace there. A loop goes by the date, because the definition's "one game minute
per real minute" is world time, and a date needs no statement about what a monotonic clock does
during sleep. A hidden tab, throttled timers and a sleeping computer all arrive as more whole minutes
at the next reading.

A pure function gives the span: the whole minutes from `fromMs` to `nowMs` in the balance's unit, and
the clock's new value, `fromMs` plus those minutes. With `nowMs` before `fromMs` it gives zero minutes
and `nowMs`: the clock runs from now and nothing is taken (row 14). With no loop in the state, the
clock is set to `nowMs`, so a first loop gets a full first minute. A loop started beside others shares
the clock, and its first minute can be shorter than a real minute; the task speaks of one "zegar
pętli", and `src/sim/sim.test.ts:2020` of one moment.

The k-th minute after `fromMs` has the real moment `fromMs + k` minutes, for a live reading as for a
catch-up (row 15, To do 14; `src/sim/sim.test.ts:1773`, where a death k minutes after T0 settles at T0
plus k minutes). A death is settled at that moment, never at the reading's.

Each reading of the clock, in order: the manual run's real time and its settling as today, then the
loops, then one `store.apply` with the events together. The clock takes its new value **before** it
hands the result to the store: a moment of saving inside `apply` reads the clock again in the same
call (`read()` flushes), and a value taken after would pass the same minutes twice.

Rejected: `performance.now()` for loops — it is what the manual run uses for pace, and it would need
a claim about sleep; a carry of milliseconds in the state, like `realMsCarry` — a new state each
reading, against D-04 and D-207; the clock's value in the state, written at each whole minute — it
would duplicate the save time, leaving two moments to say where absence starts, against row 14.

### spec.md:228-239 — 8. The catch-up is a step of its own after a load

### 8. The catch-up is a step of its own after a load (To do 11, 13, D-212, row 25)

`loadSavedGame` stays free of time. All four places of loading in `src/browser/view/app.ts` — sign-in
or reload through `loadGame`, after a conflict through `loadGame`, and kept state through `enter` —
end in `showGame` and `createGameView`, so that is the one place: the view, once built, asks its
clock to catch up. A new game and a refused save go the same way and change nothing.

`catchUp(state, nowMs)` spans from `state.saveTimeMs` by the rule of section 6, so the rest under a
minute waits for the next loop minute (`src/sim/sim.test.ts:2020`). It reads neither `run` nor
`paused`, so a run paused or on its end screen stays (P1, D-212). No upper bound (Q7). With no loop, or
no whole minute, it returns the very state it got. It is synchronous, and the page waits for it, the
cost Q7 accepted.

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

### spec.md:267-284 — 10. Saving

### 10. Saving (To do 17, row 18, D-207, carried question 4)

- A loop's run ending, in a reading or in a catch-up, is a moment of saving. **One save per result:**
  `store.apply` calls `saver.moment()` once when the result's events hold a loop's run end, however
  many. So a catch-up that ended a run or stopped a loop sends one save, at once; a catch-up that
  ended none sends nothing and waits for the hidden page or an act. Saving at each of its run ends
  would send what the last one sends. Never saving after a catch-up would leave D-207 and To do 17
  unkept where runs did end. Saving after any caught-up minute would make each reload send, and two
  open tabs refuse each other (D-209, *Rejected*).
- „Puść w pętlę”, „Zatrzymaj” and „Zamknij” go through `act` or its `send`-like path, so they save.
- The 30-second rhythm checks only while a manual map run passes: `run` present, not ended, not
  paused. The saver takes a predicate for it; `check()` itself and the hidden page keep their rule.
- The saver's too-large sentence becomes the one of To do 17; the limit stays (row 19).
- After a conflict, a load that ended a run sends once and the other tab then loses at its next save.
  It ends: the next load finds a fresh save time and nothing to end.

The saver takes a new option, the clock's moment, for the save time; `keep()` makes its document the
same way.

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

### task.md:23-25 — To do, item 2

2. Pętla idzie minuta gry na minutę realną, a regulator prędkości jej nie dotyczy; ta liczba stoi w danych balansu (D-18).
   - Pauza ręcznego przejścia nie zatrzymuje pętli innych postaci (odpowiedź P1), także zatrzymanie przy odkryciu, które jest tą samą pauzą (D-122: “the map run stops in the same pause as after „Pauza””).
   - Ekran po końcu ręcznego przejścia też nie zatrzymuje pętli innych postaci (odpowiedź Q17).

### task.md:57-61 — To do, item 11

11. Po wczytaniu stanu gry — po zalogowaniu, przeładowaniu strony, po przegranej z zapisem innej przeglądarki (D-209) i po zalogowaniu na to samo konto ze stanem zachowanym w pamięci strony (D-211) — gra dolicza opuszczone minuty pętli: pełne minuty od chwili zapisu do teraz, a reszta krótsza niż minuta czeka na następną minutę pętli (test loop `src/sim/sim.test.ts:2020`).
    - Listę tych chwil niesie wiersz 25 *Settlements to record*.
    - Wczytanie samo niczego nie dolicza: doliczanie jest osobnym krokiem po nim (D-212; `guidelines/coding-saved-game.md`).
    - Doliczanie nie ma górnej granicy minut: to nazwane odejście od loop (odpowiedź Q7; testy loop `src/sim/sim.test.ts:2015`, `:2026`).
    - Zegar cofnięty przed chwilę zapisu daje zero minut i nie zabiera niczego, a zegar pętli rusza wtedy od teraz (testy loop `src/sim/sim.test.ts:2017`, `:2028`).

### task.md:65-65 — To do, item 13

13. Doliczanie rusza od stanu wczytanego: ręczne przejście, które trwało, stoi na pauzie w minucie zapisu i się nie przesuwa, a przejście zakończone domknięciem albo śmiercią zostaje na ekranie po swoim końcu (odpowiedź P1, D-212).

### task.md:82-85 — To do, item 17

17. Rytm 30 sekund realnych obowiązuje ręczne przejście, a pętle zapisują się przy czynnościach gracza, po końcu każdego swojego przejścia i przy ukryciu strony (odpowiedź Q11).
    - „Puść w pętlę”, „Zatrzymaj” i „Zamknij” raportu są zmianami stanu, których dokonuje gracz, więc idą do listy czynności z D-207.
    - Limit 64 KiB zostaje, a gra nie ogranicza liczby pętli (odpowiedź Q12).
    - Linia z D-208 brzmi „Nie udało się zapisać postępu: stan gry jest za duży. Zatrzymaj pętle albo usuń niepotrzebne programy.”

### task.md:179-190 — Q11 and Q12

- Q11. Czy same pętle, bez ręcznego przejścia, zapisują stan gry na serwerze co 30 sekund realnych?
  - Answer: Droga A — nie: rytm 30 sekund ma ręczne przejście, a pętle zapisują się przy czynnościach gracza, po każdym swoim przejściu i przy ukryciu strony. Słaby punkt nazwany w pytaniu: zmiana jednego zdania reguły zapisu (D-207).
  - Not chosen:
    - B — bez zmian: karta zostawiona na noc to około 1440 zapisów na dobę; przy jednej pętli niczego nie chronią, bo doliczanie odtworzy ten sam przebieg.
  - Source: Mariusz, 2026-10-30, „przyjmuję rekomendacje” (pakiet rundy, pozycja D23). Materiał: D-207; `src/browser/view/game-saver.ts:24`, `:198`, loop2 `95de83b`.
- Q12. Co gra robi, gdy stan gry z wieloma pętlami przestaje mieścić się w limicie 64 KiB zapisu?
  - Answer: Droga A — limit zostaje, gra nie ogranicza liczby pętli, a komunikat brzmi „Nie udało się zapisać postępu: stan gry jest za duży. Zatrzymaj pętle albo usuń niepotrzebne programy.” Słaby punkt nazwany w pytaniu: przy kilku pętlach zapis staje, dopóki gracz którejś nie zatrzyma; limit mieści najwyżej około 10 pętli na Lesie albo 8 na Lesie — głębiej, a w praktyce mniej.
  - Not chosen:
    - B — gra dopuszcza najwyżej N pętli naraz — reguła, której definicja nie ma, i nowa liczba do ustalenia.
    - C — cykl odchudza zapis pętli — dłuższy cykl, bardziej złożone wczytanie i brak gwarancji progu.
    - D — wyższy limit — przeglądarka nie wyśle przy zamykaniu karty więcej niż 64 KiB, więc ostatni zapis by przepadał.
  - Source: Mariusz, 2026-10-30, „przyjmuję rekomendacje” (pakiet rundy, pozycja D24). Materiał: D-207, D-208, D-104; fakt `fetch-keepalive-body-quota`; definicja, In scope: „w drużynie dowolnie wiele postaci”.

### task.md:370-371 — Settlements to record, rows 18 and 19

| 18 | Rytm 30 sekund realnych dotyczy ręcznego przejścia, a pętle zapisują się przy czynnościach gracza, po końcu każdego swojego przejścia i przy ukryciu strony. | decision | pytanie Q11, droga A (pozycja D23), *Not chosen* tam; zmienia D-207: “every 30 real seconds while a map run passes”; propozycja refinera: „przy czynnościach gracza”, którego pozycja D23 nie pokazała | czy wysyłać zapis co 30 sekund przez całą noc |
| 19 | Gra dziś nie ogranicza liczby pętli, limit zapisu 64 KiB zostaje, a przy za dużym stanie gry linia o nieudanym zapisie brzmi „Nie udało się zapisać postępu: stan gry jest za duży. Zatrzymaj pętle albo usuń niepotrzebne programy.” | decision | pytanie Q12, droga A (pozycja D24), *Not chosen* tam; zmienia D-208: “the same line reads „Nie udało się zapisać postępu: stan gry jest za duży. Usuń niepotrzebne programy.””; limit stoi w D-207: “A save whose body is larger than 64 KiB is not sent” | czy ograniczyć liczbę pętli, odchudzać zapis albo podnieść limit |

### task.md:377-377 — Settlements to record, row 25

| 25 | Doliczanie rusza po każdym wczytaniu stanu gry: po zalogowaniu, po przeładowaniu strony, po przegranej z zapisem innej przeglądarki i po zalogowaniu na to samo konto ze stanem zachowanym w pamięci strony. | decision | propozycja refinera, cały wiersz: *To do* 11; obok wpisu definicji “The catch-up takes place when the player returns”, D-209: “plays on from the loaded state” i D-211: “goes on from it”, które o doliczaniu po tych dwóch wczytaniach nie mówią | czy doliczać po przegranej z innym zapisem i przy stanie z pamięci strony, czy grać od razu |
