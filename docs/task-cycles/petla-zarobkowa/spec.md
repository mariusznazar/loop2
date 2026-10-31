# Spec — Pętla zarobkowa na mapie rozwiązanej i doliczanie czasu nieobecności

- Task: `.runs/task-cycles/petla-zarobkowa/task.md`
- Open choice: the five *Questions carried to cycle* — how the game state holds the map runs of
  several characters beside one manual map run; which generator draws the next run's seed; how the
  view's clock gives the simulation a loop's time; how many saves a catch-up sends; how the
  comparison "since the save last sent" treats the save time — and the mechanism under the task's
  *To do* and *Settlements to record* where they leave it open.

## Intent

A player whose program solved a map lets a character go on earning there with no one watching: one
game minute per real minute, on a frozen copy of the program, run after run, side by side with other
characters and beside the one manual map run. Time the game was closed is computed on return and
reported. Without this, after task 14 a character has nothing to grow from once a map is solved.

## Goals and non-goals

Goals: every *To do* item of the task, 1 to 19, with the answers of *Questions to settle* as they
stand; the invariants of rows 14, 15, 17 and `catch-up-state/1` true and tested; a forged or
malformed loop, report or save time in a document refused whole; `SAVED_GAME_VERSION` raised.

Non-goals:

- No change on the server: no column, no route, no change of what it reads (To do 10).
- No screen of a loop's run, no rule counts, no discovery and no switch of program in a loop
  (Q2, Q9, Q20, P2).
- No cap on catch-up minutes and no cap on the number of loops (Q7, Q12).
- No slimming of the save beyond the shape below (Q12, way C not chosen).
- No report for time that passes while the game is open, a computer asleep or a hidden tab included,
  except the line of a loop that stopped (row 24). The catch-up is what was computed for a game that
  was closed.
- Nothing of what a manual run of a solved map pays or takes, nor of the resurrection outside a loop
  and the catch-up (task, *Out of scope*).

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

## Decisions

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

### 2. A manual run's time and the loops' time are apart (To do 2, row 20, D-62, D-132)

`passRealTime`, `advanceMinutes`, `settleDeath`, `setPaused` and `setPace` keep their meaning and go
on reading `run`, `paused` and the end of the run; none of them touches `loops`. Loops pass through
functions of their own (section 15) that read neither `paused`, `pace`, `discovery` nor `run`. So a
pause, the stop at a discovery and the screen after an end hold that one run and no loop, and no
condition has to say so. The pace never reaches a loop.

`minute-span-split` and `map-run-repeatability` hold for a loop's run: one minute step, moments
counted from the loop clock and not from the reading (section 6), the next seed from the run before,
and lock-step order in the open game (section 7).

### 3. A loop's run goes by the code of a manual run

A loop's run starts with `newMapRun` and `takeTrip`, passes by `stepMinute`, deposits by `tripLoot`.
What differs, each named:

- No discovery, no pause and no game-written rule: `stepMinute` is the minute without `discover` and
  without `withFirstChillRule` (To do 15, rows 16, 17). `understanding` and `programs` are not touched.
- No rule counts: `countStarts`, `ruleCounts` and `countsProgram` are not reached, the start included
  (row 4).
- No `mapRunStarted` and no run-level events leave these functions, so the program panel does not
  turn to a copy (`nextShown` in `src/browser/view/program-panel.ts`). Their events are loop-level
  (section 15).
- No pay on the manual path: `advanceMinutes` is not used, so its payment and solved-map record
  cannot reach a loop.
- A run is not marked: it takes from the chest on a solved map, what is lacking does not go in, and
  the loop goes on cut (To do 5). The plan binds anew at each run against the chest as it then stands.
- Skills are those of the team's character at each run's start, so a rank bought during the loop acts
  from the next run and the run going on keeps its own (`newMapRun` copies them; To do 9, Q4).
- The repertoire is computed from the run's skills, not from `state.run`: `programOf` in
  `src/browser/sim/game.ts:116` reads the manual run's skills and takes them as an argument instead.
  It is computed on each call that passes minutes and at each run's start, so what a manual run
  discovers meanwhile widens a loop's repertoire, as D-119 gives.

`buyBranch` and the disabling in `src/browser/view/character-skills.ts` already test `state.run`
alone, so „Kup” works at a character in a loop with no code change; only D-200's words change.

### 4. The end of a loop's run

Each end is dealt with at once, in the same step, and the next run starts at game minute 0 at the
same real moment with no minute lost:

- **Completion.** The loot goes to the chest through `tripLoot` with the copy's bring list, unmarked.
  The run's practice is summed into the loop's `practice`, `completed` grows, the next run starts.
- **Covered death.** Settled at the minute's real moment. The resurrection is used up, the run pays
  nothing, the character keeps everything, the loop's `practice` stays, the next run starts (Q16).
- **Uncovered death.** Settled at the minute's real moment: skills reset, generation up, moment of
  readiness unchanged. The loop is removed, its `practice` with it (Q13). The carried items are gone,
  the chest stays as it stood (D-190). A report line is written (section 11).

Settling uses one function with `settleDeath`: what a death does to a `Character`, given a moment,
is pulled out of `settleDeath` so that the rule stands in one place.

Settled once (`death-settled-once`, D-221): the end is consumed in the call that met it, no state
leaves that call with a loop's run ended, and a load refuses a loop's run that holds an end. There is
no second chance to settle, and nothing a load could settle.

D-221 holds: `advanceLoopRun` passes game time, takes no moment and leaves the end as it found it;
`endLoopRun` is the settling caller, given the moment by whoever knows it.

### 5. The next seed (carried question 2)

A fifth kind of draw, a generator of its own in `Stream`, with a constant of its own: the next run's
seed is one draw from that generator as `streamState` starts it from the ended run's seed, as a
uint32. Adding it changes no other stream's values. `lastSeed` is not touched by a loop's later runs.

The first run takes `mixSeed(lastSeed, realMs)` and writes `lastSeed`, as `send` does (Q10).

Rejected: drawing from `gatherRandom`, `wanderRandom` or `attackRandom` as they stand at the run's
end — a draw of one kind in the generator of another, which D-22 names as a breach, and a seed that
depends on what the program did; the seed plus one — not a draw, and D-22's entry says a draw.
Cost if wrong: small; only later runs' seeds move, and no saved field depends on it.

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

### 7. Who goes first: live against catch-up (To do 12, `catch-up-state/1`)

- **The open game:** minute by minute, within each minute the characters in the team's order, however
  many whole minutes a reading brings, a computer waking included. So `minute-span-split` holds for
  every split, two loops reaching one chest included.
- **The catch-up:** one character at a time, each through the whole span, in the team's order; the
  chest as the one before left it. A loop that stops does not stop the others
  (`src/sim/loop.test.ts:44`, `:79`; definition, *Verification*).

`catch-up-state/1` is true because: one minute step serves both; a run's end is dealt with by the
same function at the same real moment; a next seed depends on the run before alone; a loop's run
leaves the Understanding and the programs alone (row 17); a manual run stands still in a catch-up.

Where the open game can differ, each outside the invariant's words: two loops reaching one chest
("no other character's map run reaches"), since live they alternate minute by minute and the catch-up
does not; and what the player does in the open game — a rank bought, a discovery made by a manual run
widening a repertoire. A manual run reaching the chest is another character's map run too.

Rejected: the catch-up in lock-step — the definition's *Verification* names it as a breach; the open
game one at a time in a multi-minute reading — a span's split would change who gets the chest, and
`minute-span-split` would need an exception.

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

### 13. The saved document (To do 10, `guidelines/coding-saved-game.md`)

`SAVED_GAME_VERSION` becomes 3. `GAME_KEYS` gains the four keys. `mapRun` splits into the reading of a
`MapRun` and the tail of a `GameMapRun`, so a loop's run is read by the same checks with its own keys.
The test document is rewritten with the raise; the version 2 document stays in the test, refused as
another version, like version 1.

Every condition, each refused as `shape`:

- `saveTimeMs`: a safe integer of any sign, read as `resurrectionReadyAtMs` is read, so null is
  refused. Every document is stamped. Settled at the review of Slice 1 (finding I-1): a device clock
  before 1970 is the player's own, and a refusal here would discard a save the game itself wrote.
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

### 14. The balance entry (To do 2, D-18)

`BALANCE` gains the real seconds of one game minute of an earning loop, 60, beside
`gameMinutesPerRealSecond`, with its comment naming the speed control as not reaching it. Given this
way round, every real moment of section 6 stays a whole number, as `settleDeath` needs for any value
of the entry. `tests/sim/data.test.mjs` holds that it is a whole number from 1 up and is 60 (source:
the definition). Reading the number from the data leaves no 60 in code.

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

### 17. The natural cuts

Three, each building on the one before:

1. Simulation and document: `types.ts`, `balance.ts`, `random.ts`, `trip.ts`, `run.ts`, `game.ts`,
   `loop.ts`, `saved-game.ts` and their tests. The shape and the version cannot be cut apart, since the
   strict load test goes red at any shape change.
2. View: `clock.ts`, `game-saver.ts`, `game-view.ts`, `headquarters.ts`, `away-report.ts`,
   `trip-lines.ts`, `styles.css` and their tests.
3. Foundation and guidelines, by the cycle's foundation step.

The first is the largest and holds the risk; the second is many small things. One agent could not
hold both comfortably.

## Foundation entries

Numbers are the next free from D-222; *Scope* words come from the part map. Projected entries keep
their wording; rows take rule P4.

Decisions, new:

| Entry | Source | Meaning |
|---|---|---|
| How fast does the earning loop go? | projected | As the definition has it, whole |
| When and how is the time away computed? | projected | As the definition has it, whole |
| How does the game state hold earning loops? | section 1 | Beside the one manual run, by character number, each with its copy's content |
| Which clock drives an earning loop? | section 6, 7 | The browser's date, whole minutes from one loop clock, each minute's own real moment, a turned-back clock, the order in the open game |
| How does the player start an earning loop? | rows 1, 2, 5 | „Puść w pętlę”, what it counts as for „Program:”, the controls inactive at a character in a loop |
| What does the player see of an earning loop? | rows 3, 4 | The row's line; no map, no counts, counts left by a manual run stay |
| What does „Zatrzymaj” do? | row 7 | The stop, what it pays, the line after it |
| What does the player read after being away? | rows 10, 11, 22, 23, 24, 26 | The section, its state, adding up, when it shows, stops at an open game, after „Zakończ” |
| When is time away computed, and how much? | rows 12, 25 | All minutes, at each of the four loads |
| What is the save time? | row 13 | The browser's clock, in the game state, written on the way to the document |
| What does a map run of an earning loop discover? | row 16 | Nothing, with no stop and no rule written; carries the exception D-118 and D-71 point to |
| What does a pause or an end screen hold? | row 20 | That map run, and no other character's loop |
| How does the list of maps mark a rehearsal the loop cannot repeat? | row 21 | The mark, its condition and place |

Decisions, changed:

| Entry | Change |
|---|---|
| D-22 | To the projected wording, the fifth generator in its verification, and row 9 |
| D-44 | „Zatrzymaj” joins the destructive buttons, which the task's *Decisions in play* does not list; `guidelines/styleguide-browser-view.md`, states of the button, follows |
| D-62, D-132 | Row 20: time stands still for that map run |
| D-71 | Row 16: discoveries of a manual run |
| D-93 | Row 4: the manual map run |
| D-164 | The projected parts on an earning loop and its check |
| D-183 | Row 7: a stop ends a run the same way |
| D-189 | To the projected "What pays" wording |
| D-190 | The projected "a death without one stops the character's earning loop", and row 8 |
| D-194 | The accepted cost of the state before the loop removed (To do 19) |
| D-200 | Row 6 |
| D-207 | Row 18; the three acts added to its list; one save for a result that ended runs; a save time is no change of the game state. Its *Rejected* touched as the task says |
| D-208 | Row 19, the sentence and that the game does not limit loops |

Invariants:

| Entry | Kind | Meaning |
|---|---|---|
| `catch-up-state` (the definition's `catch-up-state/1`) | new, projected | As the definition has it, whole |
| `catch-up-minutes` | new, row 14 | Whole minutes from the save time, the rest waiting, a turned-back clock giving zero and taking nothing |
| `catch-up-death-moment` | new, row 15 | A death in a caught-up minute settles at the save time plus its minutes |
| `loop-run-knowledge` | new, row 17 | A loop's run leaves the Understanding and the player's programs as it found them |
| `trip-run-end` | changed | Stopping an earning loop counts with ending, with its test (*Decisions in play*) |

`minute-span-split`, `map-run-repeatability`, `trip-transfer`, `saved-program-edit`,
`death-settled-once` and `resurrection-renewal` keep their words; tests are added.

Glossary, new: `earning loop` and `catch-up`, projected; `save time`, row 13, whose **Not** names
D-207's "moment of saving". `manual map run`, `completion`, `solved map`, `copy`, `practice` stay.

The part map does not change: both new files fall under `src/browser/sim/**` and `src/browser/view/**`.
No environment fact: section 6 rests on no claim about a platform.

## Left to the maker

- Names of private helpers, how `loop.ts` divides inside, and field order in types.
- The exact class names and rules in `src/browser/styles.css`, reading tokens only.
- Where the row's lines stand among the row's elements, keeping To do 18's mark under „Wyślij”.
- Where focus goes when „Zamknij” removes itself from the screen, within D-42.
- How tests divide into files, and listing a new `tests/sim` file in `stryker.config.json`.
- A sentence for `guidelines/coding-saved-game.md` on a loop's run, if the change makes one earn its
  place; the file's rules hold without it.
