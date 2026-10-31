# Spec — Rozliczenie przejść: co płaci domknięcie, co kosztuje powtórka mapy i co zabiera śmierć

- Task: `.runs/task-cycles/rozliczenie-przejsc/task.md`
- Open choice: how a real moment of death reaches the simulation with `minute-span-split` kept;
  how the headquarters knows a resurrection is ready and refreshes its time while D-04 holds; where
  a map run holds that it does not pay; where the game state holds how a death was settled — and
  the mechanism the task's *To do* and *Settlements to record* rows 1–12 rest on.

## Intent

Today every completion pays, every start takes from the chest and a death costs only what the
character carried. After this change the first completion of a map pays, a manual run of a map
already solved neither pays nor takes, and each death is settled against a resurrection that renews
on the browser's clock. The earning loop (task 18) stands on this settlement.

## Goals and non-goals

Goals: every item of *To do*, 1–22, and the settlements of rows 1–12.

Non-goals: the earning loop, its payment and its stop on death, the mark on the list of maps
(task 18, Q5); the computing of time away; any server change; a change of when the game saves
(D-207); a new design token, role or shared control.

## Constraints

- The human's answers in *Questions to settle* are closed. W1 binds the tests of loop named in
  *Context*; the departure from „postać nr 2” is named in Q8.
- D-04: real time enters the simulation as an argument; `simulation-isolation` holds, and
  `src/browser/view/clock.ts` stays the one place that reads a clock.
- `minute-span-split`: the states and events of a span stay independent of how it is split, and the
  check of that invariant stays as it is.
- D-207: the 30-second check and the hidden page send a state that changed since the last save, and
  a tab that has just loaded sends nothing until the player acts. The saver finds a change by the
  identity of the state, so the passing of real time at the headquarters may not make a new state.
- D-212, `coding-saved-game.md`: no real time enters the load, and nothing settles at the load.
- D-200, test `tests/sim/skills.test.mjs:284`: a restart keeps the skills of the run it replaces.
  Test `tests/sim/trip.test.mjs:95` pins the same for the practice of a run after its completion.
- D-55: one manual map run at a time, so a map becomes solved through the run on the screen alone.
- Trust boundary: `src/browser/sim/saved-game.ts`. Each new value is read strictly, and a forged or
  malformed one refuses the document whole, as `shape`. Every code review of the cycle checks
  crafted input there.
- Irreversible: raising `SAVED_GAME_VERSION` discards every older saved game state once the merge
  deploys `main` (D-206, D-11; accepted in Q4 and *Context*). The cycle prepares the number and
  performs nothing on the server.
- `foundations/` is written through the project skills, in the foundation step.

## Decisions

### 1. The run carries a mark set at its start (third open question)

`GameMapRun` gains `solvedMapRun: boolean`, bound in `startRun` from
`state.solvedMaps.includes(mapId)`, and carried unchanged to the run's end, the saved document and
back. `restart` goes through `startRun`, so a restart after the completion that solved the map
takes the mark (To do 3, Q2). Every run today is manual; task 18 sets the mark false for a run of an
earning loop (loop: `src/sim/chest.test.ts`, „przejście pętli pobiera ze skrzynki”).

Rejected: reading `solvedMaps` at the completion — the list already holds the map on the screen
after the completion that solved it, and the rule turns on the state at the start (Q2); a further
`payout` value as loop has — nothing here reads it. Cost if wrong: a rename of a key together with
the raised version, before the merge.

### 2. One rule for what a run takes and pays

- `src/browser/sim/trip.ts` gains `takeFromNowhere(plan, capacity, map)`: a backpack of the take
  list clipped from the top by the smaller of the character's carrying capacity and the map's entry
  cap, the list's own counts standing in for the stock. `startRun` calls it on a marked run and
  leaves the chest as it is; an unmarked run calls `takeTrip` as today (To do 5).
- `tripLoot` reads the mark and gives an empty list on a marked run. It already drives both the
  preview and the deposit, so `advanceMinutes` deposits nothing and sets `deposited` to `[]`, and
  `tripTexts` needs no change: the preview and the deposit line of To do 7 (D-185, D-186) follow
  from it.
- `advanceMinutes` calls `paidPractice` on a completion of an unmarked run. A marked run keeps
  `run.practice` as it stands (To do 2). The list of solved maps grows as today.
- The entry cap and `tripWarning` stay as they are, since `tripEntryCut` ignores stock (D-188).
- Discoveries on a marked run enter the Understanding and pause the run as on any other (Q1).

Settling once: a completion is settled in the game minute it happens; `advanceMinutes` returns an
ended run unchanged and the load does not call it.

Rejected: a branch in `tripTexts` and a second one in `advanceMinutes` — two places would hold one
rule; a `takeTrip` called with an unlimited chest — it would return a changed chest to be dropped.

### 3. A character holds its generation and the moment its resurrection is ready

`Character` gains `generation: number`, 1 at creation, and `resurrectionReadyAtMs: number`, 0 at
creation (To do 8; loop `readyAtMs: 0`). `RunCharacter` gains nothing. `BALANCE` gains
`resurrectionRenewalRealMinutes: 480` (To do 9, D-18; loop `src/sim/data/balance.ts:125`).

`resurrectionReady(character, nowMs)`, exported from `game.ts`, is the one comparison: true from the
moment of readiness on, that moment included (To do 12). The view and the settlement both call it.

The number is a plain value of the typed `BALANCE`, pinned by a data test. Neither the guideline of
content data nor the load has a check for it, and none is added: a stored moment says nothing of
the renewal it came from, and a changed renewal applies to the next death.

### 4. A death is settled by its own function, beside the passing of game time (first open question)

`settleDeath(state, nowMs): GameResult` in `game.ts`, the function loop has under the same name
(`src/sim/death.ts`), called by whoever knows real time:

- With no run, a run with no death, or a death already settled, it returns the very state it got,
  without reading `nowMs`. Otherwise a `nowMs` that is no safe integer is a `RangeError`.
- With a ready resurrection: `resurrectionReadyAtMs` becomes `nowMs` plus the renewal in
  milliseconds; practice, ranks and generation stay (To do 10).
- Without one: `skills` become `newSkills` of the archetype's predispositions, `generation` grows by
  one, `resurrectionReadyAtMs` stays (To do 11). The name, archetype and place in the team stay.
- Both set the run's settlement of decision 5. The chest, programs, Understanding and solved maps
  are out of its reach (To do 15). The run's own skills stay (To do 17, D-200).
- The mark of decision 1 plays no part: a death on a marked run costs the same (Q1, To do 14).

`advanceMinutes` and `passRealTime` keep their signatures, and neither settles a death, so
`minute-span-split` compares what it compared before. `clock.ts` composes the two:
on each reading it passes the elapsed time to `passRealTime`, gives the state returned to
`settleDeath` with the same reading, and hands the store one result, the events of `passRealTime`
with the settled state. So the store, the saver and the screen never see a death unsettled, and
the game minute of death and its settlement are one step of the clock (To do 16). `settleDeath`
returns the same state on an unchanged game, so `store.apply` stays silent as it does today.

A death unsettled is a value of `advanceMinutes` and `passRealTime` alone. The load refuses it
(decision 9), so a saved game state cannot carry a death past its settlement.

Rejected:

- The moment as a third argument of `advanceMinutes` — about 200 lines of tests across 30 files and
  Python invariant checks take a value that means nothing to them, or a default fake moment, which
  hides a caller that forgot it; and D-04 gives functions that pass game time a span of game minutes.
- The moment as a third argument of `passRealTime` alone, settling there —
  `tests/invariants/test_minute_span_split.py` compares `passRealTime` splits with an `advanceMinutes`
  reference at the minute of death, and they would differ, or the check would change.
- The current reading kept in the game state — see decision 7.

Cost if wrong: task 18's catch-up has to call `settleDeath` itself with a computed moment, as loop
does. A later caller of `advanceMinutes` that forgets it saves a death the next load refuses, which
discards that game state, so its review has to look for that call.

### 5. The run holds how its death was settled (fourth open question)

`GameMapRun` gains `deathSettlement: DeathSettlement | null`, null until settled, beside `deposited`,
which does the same for a completion. `DeathSettlement` is `{ kind: "resurrectionUsed" }` or
`{ kind: "progressLost"; generation: number }`, the second holding the number the line of Q7 names
(To do 18). This key is also what makes the settlement run once: `settleDeath` is called on every
reading, a retained death included, and a loaded screen after death passes through it unchanged.

Rejected: the number read from the team's character — it could move under a retained screen once
other map runs exist, and the line would then name a later number; the sentence kept in the state —
its words belong to the view; the moment of death stored instead — the line reads no time (Q7).

### 6. „Restart” after a death that took everything starts from the team

`restart` takes the skills from the team's character when the run it replaces holds a
`progressLost` settlement, and from that run in every other case, as today. The same skills give
the repertoire in `programOf`, so a branch action drops out of the new run and stays in the
Understanding and in the copy (loop `death.test.ts:113`–`127`). A new run starts with no settlement
(To do 17).

Rejected: every restart reads the team — the expected values of the two tests in *Constraints*
change with no requirement behind them, D-200's sentence is about a run keeping its skills, and only
this case needs the difference; the retained run's skills wiped along with the team — against
To do 17 and D-200's *Verification*. Cost if wrong: one condition in `restart`.

### 7. One reading of the browser's clock, with the current reading staying out of the game state (second open question)

`clock.ts` reads `Date.now()` once on each flush, beside `performance.now()`, and uses that one
reading for `settleDeath` and for `send`. Elapsed time stays measured by `performance.now()`, so a
wall clock that jumps changes no pace. Clock contract adds: the moment of its latest reading, read
at the start too, and a call after each flush that tells the view a reading was made.

A clock that goes backwards, forwards or below zero needs no handling: the moment is a safe integer
of any sign, stored as it comes, and the view shows what the arithmetic gives (Q11 accepts the
cost). The renewal runs while the game is closed because the state holds a moment, not a countdown
(To do 13).

D-04 changes: the view draws the game from the game state, the content data and this moment, and
D-03, which repeats the sentence, follows. See *Foundation entries*. A moment the game state stores
of an event, as `resurrectionReadyAtMs` is, stands apart from this: it is written once, at the event.

Rejected: the current reading stored in the game state on every reading, which keeps D-04's
sentence — each tick makes a new state, so the saver sends a save every 30 real seconds at an idle
headquarters and after a load, against D-207, and a stale moment enters the saved document; a sim
function that takes the moment and returns text to draw — D-04's sentence stays false in substance,
with content in the simulation; a second timer in the headquarters — a second reader of the clock.

Cost if wrong: one clause of D-04 and of D-03 to write back, and no change of the saved document.

### 8. What the screens show

Map-run screen, from the top, in `game-view.ts`; `createTripLines` gains two elements and
`trip-lines.ts` two pure functions of the state, `tripTexts` staying as it is:

| Screen | Above the body row | Below it, in order |
|---|---|---|
| going on, unmarked run | as today | practice line; preview |
| going on, marked run | as today | line of To do 6; practice line; preview, reading nothing |
| completion, unmarked | deposit line | practice line |
| completion, marked | deposit line, reading nothing | line of To do 6; practice line |
| death, unmarked | line of To do 18 | practice line |
| death, marked | line of To do 18 | line of To do 6; practice line |

„Above the body row” keeps today's order: the discovery line and the last-encounter paragraph first,
then the line of the end. A loaded screen is the same screen, read from the same keys.

- The line of To do 6 stands whenever `run.solvedMapRun` is true, from minute zero, on the ends and
  after a load; „Restart” on a solved map starts a run that shows it again. In `text-secondary`.
- The line of To do 18 stands at `deposited`'s place, read from `deathSettlement` alone: `text-secondary`
  for `resurrectionUsed`, `danger` for `progressLost`. A class on the existing `.trip-result`, as
  `.body-value.danger` does, carries the role. It draws nothing while the settlement is null.

Headquarters, in `headquarters.ts`, each row:

- `generationLabel(generation)`, a pure function, gives the label of To do 20 from 2 up and nothing
  at 1; a span right after the name, in `text-secondary`, the role of the archetype beside it. No
  source names this role; D-40 gives notes this one. `generation` enters `teamKey`, so the row
  rebuilds.
- `resurrectionLine(character, nowMs)`, a pure function, gives the text and whether it is `danger`
  (To do 19). It rounds the time left up to whole minutes, then divides. Below 60 minutes the hours
  drop out of the time phrase and the rest of the sentence stands, the warning after the dash
  included. So 30 seconds left reads as one minute, and a clock set back reads as more than 8 hours.
- The line stands on a row of its own under the name and archetype, above „Program:”.
- `Headquarters.update(state, nowMs)` draws it with the rest, and a second method rewrites these
  lines alone, writing an element only when its text or role changed.

Rhythm: on every clock tick, 200 ms, while the headquarters shows; no game state changes, so nothing
is saved and `store.apply` is not involved. A line changes at most once a minute, and the change to
ready shows within a tick, with no second timer.

Rejected: one line element shared by the death and the deposit — a role to reset and a name that
fits neither; the time left kept in a per-row timer — see decision 7.

### 9. The saved document

`SAVED_GAME_VERSION` becomes 2; the document of version 1 stays in `tests/sim/saved-game.test.mjs`
and is refused as `version` (To do 21, `coding-saved-game.md`). `savedGame` needs no change.

The load reads, strictly, in `saved-game.ts`:

| Key | Admits |
|---|---|
| `Character.generation` | an identity, from 1 up |
| `Character.resurrectionReadyAtMs` | a safe integer of any sign (decision 7); no check against any clock |
| `solvedMapRun` | a boolean; a run with no completion has it equal to whether `solvedMaps` holds the map; a run with a completion requires the map in `solvedMaps` |
| `deposited` | as today, and `[]` at a completion of a marked run |
| `deathSettlement` | null exactly when the run has no death; a closed list of kinds, each with exactly its keys; a `generation` from 2 up to the current generation of the run's character |

`solvedMaps` is read before the run. `Records` gains what these checks need. No key is filled in.
The equality of the `solvedMapRun` row rests on D-55; task 18 may relax it for runs of an earning
loop. A forged far-future moment is admitted: it costs its own player alone (D-07).

### 10. Tests

| What | Where | Marker and source |
|---|---|---|
| rows 9, 10; To do 10–17; `Restart` after wiping | new `tests/sim/death.test.mjs`, listed in `stryker.config.json` | `// invariant: resurrection-renewal`, `// invariant: death-settled-once`; loop `death.test.ts`. Row 10's load case: `loadSavedGame(savedGame(state))` on a settled death, then `settleDeath` at a later moment, change nothing |
| To do 1–5, 14 | `tests/sim/trip.test.mjs` | `// invariant: solved-map-manual-run`, `trip-transfer`, `trip-run-end`; loop `chest.test.ts`, `skills.test.ts`, with its lines |
| To do 9 | `tests/sim/data.test.mjs` | the number 480, citing loop |
| the load | `tests/sim/saved-game.test.mjs` | the document of version 2 fills each branch; each row of decision 9 joins the table of crafted documents under `// invariant: save-version` |
| To do 6, 7, 18 | `tests/view/trip.test.mjs` | a pure-function table of the screens of decision 8, a loaded one included |
| To do 19, 20, Q12 | `tests/view/headquarters.test.mjs` | Q12's three examples, the moment of readiness, a clock set back, the label at 1 and 2 |
| one reading; settled state to the store; hook after a flush | `tests/view/clock.test.mjs` | mocked `Date` |
| death saved settled | `tests/view/account-screen.test.mjs:1546` | an added assertion |

Tests whose expectations change, each by requirement, among them: `tests/sim/skills.test.mjs:537`
(To do 2; its run holds no mark, so that case still pays, and its name stops being true),
`tests/sim/trip.test.mjs:109` (To do 3, 5: that restart stops taking from the chest),
`tests/sim/trip.test.mjs:333` (To do 5: its run starts on a solved map and takes from the chest),
`tests/sim/trip.test.mjs:361` (To do 3, 5: its restart follows a completion),
`tests/sim/team.test.mjs:53` (To do 8), and the helpers that save a death made by
`advanceMinutes`, such as `tests/view/account-screen.test.mjs:1179`, which call `settleDeath` before
saving. `tests/invariants/test_minute_span_split.py` stays as it is.

### 11. D-190 takes the approved *Rationale* less its sentence on rebuilding

Settled by the cycle's orchestrator after the reviewed revision, on the finding of
`reports/04-spec-rereview-report.md`. The approved *Rationale* of „What does a character's death
take?” says a new character sent to a solved map grows practice. After this change it does not:
a manual run of a solved map pays nothing and the earning loop does not exist yet (Q4, row 2,
To do 2). To do 22 gives the foundation step the parts this task's code makes true, so that
sentence waits for task 18, as the clauses cut from D-189 do. The rest of the approved *Rationale*
joins D-190's present sentence, which stays true; the approved *Rejected* takes the place of
`unknown`.

Rejected: the approved *Rationale* whole — D-190 and D-194 would state opposites side by side.
Cost if wrong: one sentence of D-190, restored by task 18 in any case.

## Foundation entries

Decision numbers are the next free ones at the time of writing; D-213 is the last today. Rows 1–12
keep the wording rule of Q9: no „only”, „never”, „always”, „without” or other word that excludes an
alternative, and a lasting exclusion says what the game does not have today („currently”). The
approved projected wording stays as it stands. *Scope* words come from the part map. The *Origin*
of a new decision cites `rozliczenie_przejsc_loop2.md in the vault (Notes/Projects/(P) Loop/_zadania)`,
as earlier entries do, with its section and its question or row.

| Entry | Kind | Change | Meaning | Source |
|---|---|---|---|---|
| D-214 | decision, simulation | new | A map run is a manual run of a solved map by the map's state at the start of that run, a restart after the completion that solved it included. | row 1 |
| D-215 | decision, browser-view | new | Where, for how long and in which role the map-run screen says that the run pays and takes nothing. | row 3 |
| D-216 | decision, browser-view | new | Where and in which role the screen after a death says what it took, after a load too. | row 4 |
| D-217 | decision, browser-view | new | The headquarters' resurrection line, its roles and its rounding. | row 5 |
| D-218 | decision, browser-view | new | The label of To do 20 beside the name from 2 up, in `text-secondary`; the role is this spec's choice, which the human's row leaves open. | row 6 |
| D-219 | decision, simulation · browser-view | new | The browser's clock counts the renewal. | row 7 |
| D-220 | decision, simulation | new | A new character has generation 1 and a ready resurrection. | row 8 |
| D-04 | decision | changed | The view draws from the game state, the content data and the moment of the browser's clock, which it reads and passes to the simulation. *Verification* gains, as complying, the headquarters line drawn from a stored moment of readiness and the clock's reading, and as violating, the clock's current reading written into the game state on each reading. A stored moment of an event, such as a resurrection's readiness or the moment of a save in task 18, complies. Its sentences on the simulation stay. Not in the task's list: added by this spec. | decision 7 |
| D-03 | decision | changed | Its *Rationale* repeats D-04's sentence on what the view draws from, citing D-04, and takes the wording D-04 takes. Nothing else changes. Not in the task's list: added by this spec. | decision 7 |
| D-179 | decision | changed | Its *Verification*, violates, „a backpack filled beyond what the chest held”, is narrowed to a run that is not a manual run of a map already solved, as its body already says. Nothing else changes. Not in the task's list: added by this spec. | To do 5 |
| D-189 | decision | changed | Its body takes the sentences of „What pays, and what takes from the chest?” this code makes true, in their approved wording: the first manual completion, the manual run of a solved map, earned loot on completion, equipment from nowhere; the mark and earning-loop sentences stay for task 18. Its *Rationale*, which says repeats pay, goes. In its place stands the approved *Rationale* less the clause on the mark and the clause on the earning loop's practice, and *Rejected* takes the approved „a trial cut by the chest's contents”. *Verification* gains `solved-map-manual-run` and the approved violating examples the task quotes. | To do 22 |
| D-190 | decision | changed | Takes „What does a character's death take?” in its approved wording, less „and a death without one stops the character's earning loop”, and says what „Restart” starts from after such a death (To do 17). *Rationale* keeps its sentence and gains the approved one less the sentence „Rebuilding goes through work: a new character sent to a solved map grows practice as a side effect, and better programs and a fuller chest shorten it each time.”, which stays for task 18 (decision 11); *Rejected* takes the approved one in place of `unknown`; *Verification* gains `resurrection-renewal`, `death-settled-once` and the approved examples the task quotes. | To do 22 |
| D-194 | decision | changed | Practice is paid at the completion of a run that first solves its map, and the entry carries the cost of row 2. Its sentence on a death or a run cut short loses the death: what a death takes stands in D-190, and a run cut short by „Restart” or „Zakończ” before completion stays as written. *Rationale*, *Rejected* and *Verification* turned, with Q4's ways as its *Rejected*. | row 2 |
| `solved-map-manual-run` | invariant, new | new | As approved; *Method* test, *Rests on* none, *Derives from* D-189 · D-214, *Part* every, *Violated* no. | To do 22 |
| `resurrection-renewal` | invariant, new | new | Row 9; *Method* test, *Rests on* none, *Derives from* D-190 · D-219, *Part* simulation, *Violated* no. | row 9 |
| `death-settled-once` | invariant, new | new | Row 10; *Method* test, *Rests on* none, *Derives from* D-190 · D-212, *Part* simulation, *Violated* no. | row 10 |
| `trip-transfer` | invariant | changed | Its removal and deposit hold for every run but a manual run of a solved map, on which the chest stays as it was at start and at completion. *Derives from* gains D-214. | To do 22 |
| `trip-run-end` | invariant | changed | Its completion clause yields to the same exception. *Derives from* gains D-214. | To do 22 |
| `resurrection` | glossary | new | Row 11, with a *Not* for a character coming back on the map. | row 11 |
| `generation number` | glossary | new | Row 12, with a *Not* for the character's number of D-56. | row 12 |

Unchanged, read and still true: D-61, D-62, D-71, D-96, D-119, D-132, D-185, D-186, D-187,
D-188, D-199, D-200, D-201, D-206, D-207, D-212, `minute-span-split`, `simulation-isolation`,
`simulation-inputs`, `map-run-repeatability`, `restart-seed`, `save-version`, `character-team`,
`manual map run`, `solved map`, `map run restart`, `completion`, `practice`. The part map does not
change: the new test falls under `tests/sim/**`.

`foundation_check.py` asks of a decision *Scope*, *Based on*, *Relations*, *Verification*, *Origin*,
*Rationale* and *Rejected*; of an invariant *Method*, *Rests on*, *Derives from*, *Part*, *Violated*;
of a term *Not*; and that each comment `invariant: <identifier>` names an entry, so the entries
stand in the same commit as their markers.

## Left to the maker

- The division into slices, and the names of the view's hook and the clock's reading.
- The class names, and the spacing of the new lines, from existing tokens.
- Where `resurrectionReady` and `settleDeath` stand within `game.ts`, and the helper that turns real
  minutes into milliseconds.
- Whether `coding-saved-game.md` § *Examples* gains a paragraph on the new keys; what it says today
  stays true.
- Comments and doc comments of the functions touched: `passRealTime`'s „the only way real time
  enters”, which `settleDeath` makes false, and `createGameView`'s „draws only from it”
  (`src/browser/view/game-view.ts:81`), which the headquarters line makes false.
- Whether a case in `tests/view/account-screen.test.mjs` follows a clock tick to the rewritten
  headquarters line; `tests/view/headquarters.test.mjs` covers the pure functions alone.
