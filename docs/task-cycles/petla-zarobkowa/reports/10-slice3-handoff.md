# Handoff — executor of Slice 3 — Time for loops, the catch-up and its report, task `petla-zarobkowa`

## Delegation and stage

The person who requested this cycle (the product's owner) delegated the cycle's intermediate
choices to the orchestrator of `implement-task`. You are the executor of one slice, a fresh agent.
Your questions go to the orchestrator, never to the human; you return at your slice's boundary.

- Worktree (work from its root): `C:\Storage\repos\loop2-wt\petla-zarobkowa`, branch
  `task/petla-zarobkowa`, head `5791fd7`. Process pin `.the-way` at `a8dfe8a`. Pinned quality tools
  stand in `.runs/quality-venv`; `node_modules` is installed.
- Method: `.the-way/task-cycle/change/SKILL.md` in the worktree. Read it whole; read a file it names
  only when the step or variant that names it comes.
- Variant: "a slice, or the retry of a slice".
- Report path: `.runs/task-cycles/petla-zarobkowa/reports/10-slice3-report.md`
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

- Slices 1 and 2 are made, head `5791fd7`. Slice 2's `src/browser/sim/loop.ts` exports `startLoop`,
  `stopLoop`, `advanceLoopRun`, `endLoopRun`; each returns a `GameResult`, and `advanceLoopRun`
  returns `GameResult & { passed }` (type `LoopAdvance`). On a missing loop, an ended run or 0 minutes
  it returns the very state with `passed: 0`. `endLoopRun` emits one `loopRunEnded` `{ kind,
  characterId }` for each end and checks `nowMs` as a safe integer only when there is an end to
  take. `characterAfterDeath(character, nowMs)` in `game.ts` returns `{ character, resurrectionUsed }`.
  `programOf` in `game.ts` is exported and takes the skills. The executor's report:
  `.runs/task-cycles/petla-zarobkowa/reports/09-slice2-report.md`.
- `tests/sim/loop.test.mjs` hand-builds a run's last minute for a completion, as no program in the
  tests completes Las by itself. `tests/sim/completion.test.mjs` shows the same set-up, and
  `tests/sim/acceptance.test.mjs` the seed that dies of cold at game minute 243.
- Loop's tests are read with `git -C C:/Storage/repos/loop show cdc7c0d:<path>`, the tests and never
  the engine. Under the human's answer P6 they bind where they cover a case, a departure from them
  being a named decision.
- Spec section 13 now reads `saveTimeMs` as a safe integer of any sign, so a negative save time
  catches up as arithmetic gives it.
- `npm test -- <file>` builds. A direct `node --test` needs `npm run build` first.
- `foundations/invariants.md` is in your *Change* only for setting *Method* to `test` of
  `catch-up-state`, `catch-up-minutes` and `catch-up-death-moment`.
- Write each test first and see it fail by its assertion before the code; the method's order holds.

## Your slice, the plan's section word for word (`.runs/task-cycles/petla-zarobkowa/plan.md`)

### Slice 3 — Time for loops, the catch-up and its report

- **Goal:** The simulation passes time for loops in the open game and over time away, and writes
  the report. In detail:
  - `BALANCE` gains the real seconds of one game minute of an earning loop, 60, as spec section 14
    gives, and `tests/sim/data.test.mjs` holds it.
  - `loopSpan`, `passLoops` and `catchUp` as spec sections 6, 7, 8 and 15 give: whole minutes, a
    clock turned back giving zero minutes and `nowMs`, the k-th minute's own real moment, the open
    game minute by minute with the characters in the team's order, the catch-up one character at a
    time. `catchUp` reads neither `run` nor `paused`, a loop that stops does not stop the others, and
    with no loop, no whole minute or `saveTimeMs` null it returns the very state it got.
  - The report of spec section 11, written by `passLoops` and `catchUp`, and `closeAwayReport`. A
    line of a loop that stopped keeps `practice` `{}`: the loop's practice is gone (Q13,
    `src/sim/chest.test.ts:550` of loop), and whatever a line keeps has to stay a positive count, or
    the load refuses the whole save.
  - `catch-up-state`, `catch-up-minutes` and `catch-up-death-moment` take *Method* `test` in
    `foundations/invariants.md`. `tests/sim/catch-up.test.mjs` joins `stryker.config.json`; it reuses
    what `tests/sim/loop.test.mjs` from Slice 2 sets up, by a shared fixture only where that earns it.
  - This slice does not change `saved-game.ts`; a line or state the load refuses is a structural
    mismatch to report.
- **Change:** `src/browser/sim/loop.ts` · `src/browser/sim/data/balance.ts` ·
  `tests/sim/catch-up.test.mjs` · `tests/sim/data.test.mjs` · `stryker.config.json` ·
  `foundations/invariants.md`
- **Read:** `.runs/task-cycles/petla-zarobkowa/spec.md:36-55` Constraints ·
  `.runs/task-cycles/petla-zarobkowa/spec.md:98-108` 2. A manual run's time and the loops' time are apart ·
  `.runs/task-cycles/petla-zarobkowa/spec.md:136-157` 4. The end of a loop's run ·
  `.runs/task-cycles/petla-zarobkowa/spec.md:172-204` 6. The loop clock ·
  `.runs/task-cycles/petla-zarobkowa/spec.md:206-226` 7. Who goes first: live against catch-up ·
  `.runs/task-cycles/petla-zarobkowa/spec.md:228-239` 8. The catch-up is a step of its own after a load ·
  `.runs/task-cycles/petla-zarobkowa/spec.md:286-317` 11. The report ·
  `.runs/task-cycles/petla-zarobkowa/spec.md:370-376` 14. The balance entry ·
  `.runs/task-cycles/petla-zarobkowa/spec.md:378-404` 15. Units and interfaces ·
  `.runs/task-cycles/petla-zarobkowa/spec.md:406-436` 16. Where the invariants are tested ·
  `.runs/task-cycles/petla-zarobkowa/task.md:23-25` To do, item 2 ·
  `.runs/task-cycles/petla-zarobkowa/task.md:57-81` To do, items 11 to 16 ·
  `.runs/task-cycles/petla-zarobkowa/task.md:98-99` P1 ·
  `.runs/task-cycles/petla-zarobkowa/task.md:153-164` Q6 and Q7 ·
  `.runs/task-cycles/petla-zarobkowa/task.md:220-227` Q19 ·
  `.runs/task-cycles/petla-zarobkowa/task.md:239-245` Context, tests of loop ·
  `.runs/task-cycles/petla-zarobkowa/task.md:362-364` Settlements to record, rows 10 to 12 ·
  `.runs/task-cycles/petla-zarobkowa/task.md:366-367` Settlements to record, rows 14 and 15 ·
  `.runs/task-cycles/petla-zarobkowa/task.md:372-372` Settlements to record, row 20 ·
  `.runs/task-cycles/petla-zarobkowa/task.md:374-378` Settlements to record, rows 22 to 26 ·
  loop's tests as the task's *Context* names them, outside this repository and so without an address
  here: from the repository C:/Storage/repos/loop at commit cdc7c0d by git show, the tests and never the engine,
  src/sim/loop.test.ts, src/sim/sim.test.ts:1730-1910, src/sim/sim.test.ts:2008-2043,
  src/sim/chest.test.ts:491-558, src/sim/report.test.ts ·
  src/browser/sim/loop.ts as Slice 2 leaves it and tests/sim/loop.test.mjs from Slice 2, neither of
  which stands at the plan's base ·
  `foundations/decisions.md:57-118` D-04 · `foundations/decisions.md:388-406` D-18 ·
  `foundations/decisions.md:448-481` D-21 · `foundations/decisions.md:1076-1094` D-54 ·
  `foundations/decisions.md:1115-1141` D-56 · `foundations/decisions.md:1217-1231` D-62 ·
  `foundations/decisions.md:2447-2471` D-132 · `foundations/decisions.md:3359-3373` D-190 ·
  `foundations/decisions.md:3843-3880` D-212 · `foundations/decisions.md:4003-4020` D-219 ·
  `foundations/decisions.md:4036-4062` D-221 ·
  the entries of the plan's rows How fast does the earning loop go?, When and how is the time away
  computed?, Which clock drives an earning loop?, What does the player read after being away?, When
  is time away computed, and how much? and What does a pause or an end screen hold? ·
  `foundations/invariants.md:165-175` map-run-repeatability ·
  `foundations/invariants.md:198-213` player-map-run-pace ·
  `foundations/invariants.md:214-225` simulation-isolation · `foundations/invariants.md:226-235` simulation-inputs ·
  `foundations/invariants.md:528-537` minute-span-split · `foundations/invariants.md:958-967` trip-transfer ·
  `foundations/invariants.md:1048-1057` resurrection-renewal · `foundations/invariants.md:1058-1067` death-settled-once ·
  the plan's rows catch-up-state, catch-up-minutes and catch-up-death-moment ·
  `foundations/part_map.md:28-59` simulation ·
  the glossary entries of the plan's rows earning loop and catch-up ·
  `guidelines/coding.md` · `guidelines/coding-simulation-module.md` · `guidelines/coding-content-data.md` ·
  `guidelines/testing.md` · `src/browser/sim/types.ts` · `src/browser/sim/trip.ts:14-16` ·
  `src/browser/sim/game.ts:425-477` · `tests/invariants/test_minute_span_split.py:43-43` ·
  `tests/sim/data.test.mjs:1-40`
- **Model:** cheaper
- **Risk:** none
- **Checks:** First the tests: `npm test -- tests/sim/catch-up.test.mjs`, red before the code, with
  the cases of spec section 16: `catch-up-state` as a relation of `passLoops` minute by minute
  against `catchUp` through a covered and an uncovered death; `catch-up-minutes` at 90 s, exactly one
  minute, zero and a turned-back clock; `catch-up-death-moment` at game minute 243; `minute-span-split`
  and `map-run-repeatability` through `passLoops` split into calls; the order of characters, the
  chest difference of each, the adding up of row 22, the lines of rows 23 and 24, a line with
  `practice` `{}` loading back; `simulation-inputs` on frozen inputs of `passLoops`, `catchUp` and
  `closeAwayReport`, since the pool of `tests/invariants/test_simulation_inputs.py` holds no state
  with a loop; each test citing an invariant seen failing once. Then
  `npm test -- tests/sim/catch-up.test.mjs` · `npm test -- tests/sim/loop.test.mjs` ·
  `npm test -- tests/sim/data.test.mjs` · `npm test -- tests/sim/rules.test.mjs` ·
  `npm test -- tests/invariants/test_simulation_inputs.py` ·
  `npm test -- tests/invariants/test_minute_span_split.py` ·
  `npm test -- tests/quality/test_mutation_test_selection.py` ·
  `npm test -- tests/quality/test_quality_invariants.py` ·
  `python -B .the-way/elements/common/foundation_check.py`
- **Depends on:** Slice 2 · the plan's entries How fast does the earning loop go? · When and how is
  the time away computed? · Which clock drives an earning loop? · What does the player read after
  being away? · When is time away computed, and how much? · What does a pause or an end screen hold? ·
  `catch-up-state` · `catch-up-minutes` · `catch-up-death-moment`

## Current ranges

These hold where they differ from the plan's *Read*, since the foundation step moved the entries.
Files of `src/` and `tests/` the *Read* names by range: earlier slices may have changed them, so
find the passage again by its name.

- D-222 (How fast does the earning loop go?): `foundations/decisions.md:4106-4134` — written by the foundation step
- D-223 (When and how is the time away computed?): `foundations/decisions.md:4135-4160` — written by the foundation step
- D-225 (Which clock drives an earning loop?): `foundations/decisions.md:4194-4236` — written by the foundation step
- D-229 (What does the player read after being away?): `foundations/decisions.md:4322-4371` — written by the foundation step
- D-230 (When is time away computed, and how much?): `foundations/decisions.md:4372-4400` — written by the foundation step
- D-233 (What does a pause or an end screen hold?): `foundations/decisions.md:4460-4482` — written by the foundation step
- D-04: `foundations/decisions.md:57-118`
- D-18: `foundations/decisions.md:388-406`
- D-21: `foundations/decisions.md:448-481`
- D-54: `foundations/decisions.md:1089-1107`
- D-56: `foundations/decisions.md:1128-1154`
- D-62: `foundations/decisions.md:1230-1244`
- D-132: `foundations/decisions.md:2464-2488`
- D-190: `foundations/decisions.md:3376-3390`
- D-212: `foundations/decisions.md:3885-3922`
- D-219: `foundations/decisions.md:4045-4062`
- D-221: `foundations/decisions.md:4078-4105`
- `map-run-repeatability`: `foundations/invariants.md:165-175`
- `player-map-run-pace`: `foundations/invariants.md:198-213`
- `simulation-isolation`: `foundations/invariants.md:214-225`
- `simulation-inputs`: `foundations/invariants.md:226-235`
- `minute-span-split`: `foundations/invariants.md:528-537`
- `trip-transfer`: `foundations/invariants.md:958-967`
- `resurrection-renewal`: `foundations/invariants.md:1048-1057`
- `death-settled-once`: `foundations/invariants.md:1058-1067`
- `catch-up-state`: `foundations/invariants.md:1068-1077` — written by the foundation step
- `catch-up-minutes`: `foundations/invariants.md:1078-1087` — written by the foundation step
- `catch-up-death-moment`: `foundations/invariants.md:1088-1097` — written by the foundation step
- part `simulation`: `foundations/part_map.md:28-59`
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

### spec.md:98-108 — 2. A manual run's time and the loops' time are apart

### 2. A manual run's time and the loops' time are apart (To do 2, row 20, D-62, D-132)

`passRealTime`, `advanceMinutes`, `settleDeath`, `setPaused` and `setPace` keep their meaning and go
on reading `run`, `paused` and the end of the run; none of them touches `loops`. Loops pass through
functions of their own (section 15) that read neither `paused`, `pace`, `discovery` nor `run`. So a
pause, the stop at a discovery and the screen after an end hold that one run and no loop, and no
condition has to say so. The pace never reaches a loop.

`minute-span-split` and `map-run-repeatability` hold for a loop's run: one minute step, moments
counted from the loop clock and not from the reading (section 6), the next seed from the run before,
and lock-step order in the open game (section 7).

### spec.md:136-157 — 4. The end of a loop's run

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

### spec.md:206-226 — 7. Who goes first: live against catch-up

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

### spec.md:370-376 — 14. The balance entry


### 14. The balance entry (To do 2, D-18)

`BALANCE` gains the real seconds of one game minute of an earning loop, 60, beside
`gameMinutesPerRealSecond`, with its comment naming the speed control as not reaching it. Given this
way round, every real moment of section 6 stays a whole number, as `settleDeath` needs for any value
of the entry. `tests/sim/data.test.mjs` holds that it is a whole number from 1 up and is 60 (source:

### spec.md:378-404 — 15. Units and interfaces


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

### task.md:23-25 — To do, item 2

2. Pętla idzie minuta gry na minutę realną, a regulator prędkości jej nie dotyczy; ta liczba stoi w danych balansu (D-18).
   - Pauza ręcznego przejścia nie zatrzymuje pętli innych postaci (odpowiedź P1), także zatrzymanie przy odkryciu, które jest tą samą pauzą (D-122: “the map run stops in the same pause as after „Pauza””).
   - Ekran po końcu ręcznego przejścia też nie zatrzymuje pętli innych postaci (odpowiedź Q17).

### task.md:57-81 — To do, items 11 to 16

11. Po wczytaniu stanu gry — po zalogowaniu, przeładowaniu strony, po przegranej z zapisem innej przeglądarki (D-209) i po zalogowaniu na to samo konto ze stanem zachowanym w pamięci strony (D-211) — gra dolicza opuszczone minuty pętli: pełne minuty od chwili zapisu do teraz, a reszta krótsza niż minuta czeka na następną minutę pętli (test loop `src/sim/sim.test.ts:2020`).
    - Listę tych chwil niesie wiersz 25 *Settlements to record*.
    - Wczytanie samo niczego nie dolicza: doliczanie jest osobnym krokiem po nim (D-212; `guidelines/coding-saved-game.md`).
    - Doliczanie nie ma górnej granicy minut: to nazwane odejście od loop (odpowiedź Q7; testy loop `src/sim/sim.test.ts:2015`, `:2026`).
    - Zegar cofnięty przed chwilę zapisu daje zero minut i nie zabiera niczego, a zegar pętli rusza wtedy od teraz (testy loop `src/sim/sim.test.ts:2017`, `:2028`).
12. Doliczanie bierze postacie po kolei, każdą do końca, w kolejności listy postaci (D-54; test loop `src/sim/loop.test.ts:44`).
    - Postacie stykają się na granicach przejść: przedmiot trafia do skrzynki przy domknięciu, następne przejście bierze to, co w niej zastanie, a gdy miejsca starczy dla łupu jednej postaci, bierze go postać wcześniejsza na liście.
    - Pętla zatrzymana śmiercią nie zatrzymuje doliczania pozostałych postaci (test loop `src/sim/loop.test.ts:79`).
13. Doliczanie rusza od stanu wczytanego: ręczne przejście, które trwało, stoi na pauzie w minucie zapisu i się nie przesuwa, a przejście zakończone domknięciem albo śmiercią zostaje na ekranie po swoim końcu (odpowiedź P1, D-212).
14. Śmierć w doliczanej minucie zna swoją chwilę realną — chwila zapisu plus minuty od niej — więc wskrzeszenie zużyte w trakcie nieobecności odnawia się od tej chwili i może pokryć kolejną śmierć tej samej nocy (D-04, *Rationale*: “real time passed in as an argument keeps the earning loop, the catch-up and the renewal of a resurrection on one footing”; test loop `src/sim/sim.test.ts:1848`).
15. Przejście pętli dziś niczego nie odkrywa: Zrozumienie i program zostają, czas nie staje i gra nie dopisuje reguły z D-123, a gracz odkryje to w ręcznym przejściu (odpowiedź Q9).
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

### task.md:98-99 — P1

- P1. Czy doliczanie nieobecności przesuwa ręczne przejście, które trwało, gdy gra się zamknęła?
  - Answer: nie — doliczanie rusza od stanu wczytanego, w którym to przejście stoi na pauzie, a pauza ręcznego przejścia nie zatrzymuje pętli zarobkowych innych postaci. Przejście wraca w minucie zapisu, zatrzymane pauzą, z tempem z zapisu; czas nieobecności go nie przesuwa — ani przed tym zadaniem, ani po nim; gracz rusza je przyciskiem „Wznów”. Przyjęty koszt: jedno kliknięcie po każdym wczytaniu z trwającym przejściem oraz dwa wymogi dla tego zadania — kolejność „najpierw wczytanie, potem doliczanie” i pauza ręcznego przejścia, która nie zatrzymuje pętli innych postaci.

### task.md:153-164 — Q6 and Q7

- Q6. Gdzie gracz czyta raport z nieobecności, co w nim stoi i jak go zamyka?
  - Answer: Droga A — sekcja „Gdy cię nie było” w siedzibie, nad „Drużyna”, po jednej linii na postać, którą zamyka jeden przycisk „Zamknij”; brzmienia, kolejność i zasady stoją w *To do* 16. Słaby punkt nazwany w pytaniu: nowa sekcja i nowy kawałek stanu gry, a sekcja pojawia się od jednej doliczonej minuty, więc także po krótszym przeładowaniu.
  - Not chosen:
    - B — A, ale zamykanie przy każdej postaci, jak w loop — tyle kliknięć, ile postaci.
    - C — jedna linia dla całej drużyny — gracz nie wie, której postaci co się stało.
  - Source: Mariusz, 2026-10-30, „przyjmuję rekomendacje” (pakiet rundy, pozycja D19). Materiał: testy loop `src/sim/sim.test.ts:1732`–`1743`, `:1811`, `src/sim/report.test.ts:7`, `src/sim/loop.test.ts:134`, `src/sim/chest.test.ts:527`, `:535`; koncepcja §5: „zbiorczy raport z nocy (najpierw pętle, które stanęły, bo tylko one wymagają ręki gracza)”; D-39; D-96.
- Q7. Czy doliczanie ma górną granicę minut, a jeśli tak, jaką?
  - Answer: Droga B, nazwane odejście od loop — bez granicy. Słaby punkt nazwany w pytaniu: po wielu miesiącach strona stoi kilka sekund na postać (pomiar na krótkich przejściach, a telefon i dłuższe przejścia będą wolniejsze), a zegar przestawiony o lata daje postęp tylko we własnej grze, co decyzje już przyjmują. Granicę można dodać później, gdy gra dojrzeje i będzie zmieniać definicję z innego powodu.
  - Not chosen:
    - A — granica 7 dni, resztę tracimy; liczba była propozycją refinera — zmiana zatwierdzonej definicji, czyli bramka gotowości i ponowne sprawdzenie planu; do ich końca żadne zadanie nie stanie się gotowe i nie ruszy żaden cykl.
    - C — inna liczba — koszt jak w A.
  - Source: Mariusz, 2026-10-30, „przyjmuję rekomendacje” (pakiet rundy, pozycja D20). Definicja: “The catch-up takes place when the player returns and advances the missed game minutes”. Testy loop, od których zadanie odchodzi: `src/sim/sim.test.ts:2015`, `:2026`.

### task.md:220-227 — Q19

- Q19. Co stoi w miejscu „po {m} min” w linii „{imię}: pętla stanęła po {m} min …”, gdy pętla stanęła przy otwartej grze, i jaki tytuł ma wtedy sekcja?
  - Answer: Minuty — droga C: przy otwartej grze linia nie podaje minut: „{imię}: pętla stanęła — śmierć bez wskrzeszenia: postać straciła wprawę i wykupione stopnie. Teraz to pokolenie {n}.” Słaby punkt nazwany w pytaniu: jeden warunek w widoku, a gracz nie wie, ile pętla szła. Przy powrocie zostaje „po {m} min”, a {m} to minuty doliczone: pakiet powiedział wprost tylko, że przy otwartej grze nic nie było doliczane, a to znaczenie {m} niesie test loop `src/sim/sim.test.ts:1812`, który czyta przy pętli, która stanęła, ten sam licznik co test „raport z nieobecności mówi, ile minut zeszło” (`:1732`), pod odpowiedzią P6.
  - Answer: Tytuł — droga E: gdy w sekcji są tylko takie pętle, tytuł brzmi „Pętle, które stanęły”, a gdy jest w niej choć jedna linia z powrotu, zostaje „Gdy cię nie było”. Słaby punkt nazwany w pytaniu: drugi tytuł i jeden warunek.
  - Not chosen:
    - (minuty) A — wszystkie minuty tej pętli od puszczenia — liczba bywa większa niż ostatnia nieobecność, a {m} znaczy w sekcji dwie rzeczy; to wygląda też na odejście od loop.
    - (minuty) B — minuty od ostatniego doliczenia — osobny licznik w stanie gry, a liczba mówi niewiele.
    - (tytuł) D — zostaje „Gdy cię nie było” — tytuł mówi nieprawdę graczowi, który siedział przy grze.
  - Source: Mariusz, 2026-10-30, „wszystko zgodnie z rekomendacją mi pasuje” (pakiet rundy, pozycja 18-Q19). Testy loop tego przypadku nie pokrywają: żaden nie zatrzymuje pętli przy otwartej grze. Materiał: testy loop `src/sim/sim.test.ts:1732`, `:1811`–`1812`, `src/sim/loop.test.ts:93`–`94`.

### task.md:239-245 — Context, tests of loop

## Context

- Materiał z loop: definicja pozwala czytać z kodu loop pliki danych i testy, a zachowanie, którego one nie pokrywają, zadania biorą z koncepcji albo ustalają same (definicja, Inputs and constraints).
- Silnika i interfejsu loop to zadanie nie czytało.
- Commit loop: `cdc7c0d`.
- Testy loop o pętli: `src/sim/loop.test.ts` (kolejność listy postaci, raport przy każdej postaci, pętla stojąca nie zatrzymuje doliczania reszty), `src/sim/sim.test.ts:1486`–`1910` (uruchamianie, wprawa, zatrzymanie, śmierć, wskrzeszenie w trakcie nocy) i `:2008`–`2043` (zaległe minuty, zegar po wczytaniu), `src/sim/chest.test.ts:350`–`374` i `:491`–`558` (plan wyprawy w pętli, bilans skrzynki w raporcie), `src/sim/report.test.ts` (raport: najpierw pętle, które stanęły).
- Odejścia od testów loop, nazwane w odpowiedziach: Q3, Q5 (co gracz widzi), Q7, Q20 i Q21.

### task.md:362-364 — Settlements to record, rows 10 to 12

| 10 | Po powrocie gracz czyta raport w sekcji „Gdy cię nie było” w siedzibie, nad „Drużyna”, po jednej linii na postać, która miała pętlę, a jeden przycisk „Zamknij” zamyka całą sekcję: najpierw pętle, które stanęły, w `danger`, „{imię}: pętla stanęła po {m} min — śmierć bez wskrzeszenia: postać straciła wprawę i wykupione stopnie. Teraz to pokolenie {n}.”; potem pozostałe, w `text`, „{imię}: {m} min · skrzynka: {przedmiot} +{n}, {przedmiot} −{n} · wprawa: {umiejętność} +{n}”, puste części pominięte, z dopiskiem „ · wskrzeszenie zużyte”, gdy śmierć pokryło wskrzeszenie; pod nimi, gdy skrzynka jest pełna, „Skrzynka jest pełna.” w `warning`; {m} to w obu liniach minuty doliczone. | decision | pytanie Q6, droga A (pozycja D19), *Not chosen* tam; nazwane odejście od loop, gdzie raport zamyka się przy każdej postaci (`src/sim/sim.test.ts:1743`), przyjęte w pytaniu Q21, *Not chosen* tam; propozycja refinera: role (pozycja D19 mówi „ostrzegawczo”), „puste części pominięte” i warunki dopisku oraz linii o pełnej skrzynce (pozycja D19 mówi „gdy trzeba”); {m} jako minuty doliczone — pytanie Q19, droga C, *Not chosen* tam, i test loop `src/sim/sim.test.ts:1812` | gdzie stoi raport, jak go zamknąć, jakie ma teksty |
| 11 | Raport leży w stanie gry, więc przeżywa przeładowanie. | decision | pytanie Q6, droga A (pozycja D19: „nowy kawałek stanu gry”); propozycja refinera: „przeżywa przeładowanie” | czy raport przeżywa przeładowanie |
| 12 | Doliczanie liczy dziś wszystkie opuszczone minuty, a górnej granicy gra dziś nie ma. | decision | pytanie Q7, droga B, nazwane odejście od loop (pozycja D20), *Not chosen* tam | czy przepisać z loop sufit minut i jaką liczbą |

### task.md:366-367 — Settlements to record, rows 14 and 15

| 14 | Doliczanie przerabia pełne minuty od chwili zapisu, a reszta krótsza niż minuta czeka na następną minutę pętli; zegar cofnięty przed chwilę zapisu daje zero minut i nie zabiera niczego, a zegar pętli rusza wtedy od teraz. | invariant | propozycja refinera, cały wiersz, pod odpowiedzią P6: *To do* 11; testy loop `src/sim/sim.test.ts:2017`, `:2020`, `:2028`; człowiek widział w pakiecie tylko „zegar cofnięty przed chwilę zapisu daje zero doliczonych minut” | co zrobić z resztą minuty i z ujemną różnicą czasu |
| 15 | Śmierć w doliczanej minucie rozlicza się w chwili realnej tej minuty, czyli chwili zapisu plus minuty od niej. | invariant | propozycja refinera, cały wiersz, pod odpowiedzią P6: *To do* 14; test loop `src/sim/sim.test.ts:1848` | czy liczyć odnowienie wskrzeszenia od chwili powrotu |

### task.md:372-372 — Settlements to record, row 20

| 20 | Pauza ręcznego przejścia, jego zatrzymanie przy odkryciu i ekran po jego końcu nie zatrzymują pętli innych postaci, a „czas stoi” na ekranie po śmierci i po domknięciu dotyczy tego przejścia. | decision | odpowiedź P1 (pauza nie zatrzymuje pętli innych postaci); pytanie Q17 (pozycja D25), *Not chosen* tam; zmienia D-62: “After a character's death the screen stays on the state of the game minute of death and time stands still” i D-132: “After a completion the screen stays on the state of the game minute of the completion and time stands still”; propozycja refinera: „zatrzymanie przy odkryciu”, krok od D-122: “stops in the same pause as after „Pauza”” | czy jedno pole `paused` i ekran końca wstrzymują cały czas gry |

### task.md:374-378 — Settlements to record, rows 22 to 26

| 22 | Kolejny powrót przed „Zamknij” dodaje się do raportu. | decision | propozycja refinera, cały wiersz: *To do* 16 | czy nowy raport zastępuje stary, czy się z nim sumuje |
| 23 | Sekcja pokazuje się od jednej pełnej doliczonej minuty, a pętla, która stanęła, otwiera ją przy każdej liczbie minut. | decision | pytanie Q6, droga A (pozycja D19: „Pojawia się od jednej doliczonej minuty”); propozycja refinera: część o pętli, która stanęła, pod odpowiedzią P6: test loop `src/sim/loop.test.ts:91`–`92`, gdzie raport ma śmierć przy zerze minut | czy gracz dowie się o pętli, która stanęła w pierwszej minucie |
| 24 | Pętla, która stanie przy otwartej grze, trafia do tej samej sekcji, jej linia brzmi wtedy „{imię}: pętla stanęła — śmierć bez wskrzeszenia: postać straciła wprawę i wykupione stopnie. Teraz to pokolenie {n}.”, a gdy w sekcji nie ma żadnej linii z powrotu, tytuł brzmi „Pętle, które stanęły”. | decision | propozycja refinera: ta sama sekcja, *To do* 16; linia i tytuł — pytanie Q19, drogi C i E, *Not chosen* tam | czy przy otwartej grze pętla staje po cichu, co stoi w miejscu „po {m} min” i jaki tytuł ma sekcja |
| 25 | Doliczanie rusza po każdym wczytaniu stanu gry: po zalogowaniu, po przeładowaniu strony, po przegranej z zapisem innej przeglądarki i po zalogowaniu na to samo konto ze stanem zachowanym w pamięci strony. | decision | propozycja refinera, cały wiersz: *To do* 11; obok wpisu definicji “The catch-up takes place when the player returns”, D-209: “plays on from the loaded state” i D-211: “goes on from it”, które o doliczaniu po tych dwóch wczytaniach nie mówią | czy doliczać po przegranej z innym zapisem i przy stanie z pamięci strony, czy grać od razu |
| 26 | Gracz, który wraca do ręcznego przejścia, czyta raport w siedzibie po „Zakończ”. | decision | propozycja refinera, cały wiersz: *To do* 16; *Context*: siedziby nie widać, gdy w stanie gry jest przejście | czy pokazać raport na ekranie przejścia |
