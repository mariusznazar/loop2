# Handoff — executor of Slice 2 — The life of a loop in the simulation, task `petla-zarobkowa`

## Delegation and stage

The person who requested this cycle (the product's owner) delegated the cycle's intermediate
choices to the orchestrator of `implement-task`. You are the executor of one slice, a fresh agent.
Your questions go to the orchestrator, never to the human; you return at your slice's boundary.

- Worktree (work from its root): `C:\Storage\repos\loop2-wt\petla-zarobkowa`, branch
  `task/petla-zarobkowa`, head `3f99110`. Process pin `.the-way` at `a8dfe8a`. Pinned quality tools
  stand in `.runs/quality-venv`; `node_modules` is installed.
- Method: `.the-way/task-cycle/change/SKILL.md` in the worktree. Read it whole; read a file it names
  only when the step or variant that names it comes.
- Variant: "a slice, or the retry of a slice".
- Report path: `.runs/task-cycles/petla-zarobkowa/reports/09-slice2-report.md`
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

- Slice 1 is made and reviewed, head `3f99110`. It left the types `EarningLoop`, `AwayReportLine`
  and `LoopStop` in `src/browser/sim/types.ts`, `withSaveTime` in `game.ts`, and the load in
  `saved-game.ts`. Spec section 13 now reads `saveTimeMs` as a safe integer of any sign.
- Loop's tests are read with `git -C C:/Storage/repos/loop show cdc7c0d:<path>`, the tests and never
  the engine. Under the human's answer P6 they bind where they cover a case, a departure from them
  being a named decision.
- `npm test -- <file>` builds. A direct `node --test` needs `npm run build` first, or it runs the
  old `dist`.
- `foundations/invariants.md` is in your *Change* only for setting `loop-run-knowledge`'s *Method* to
  `test`. New decisions are numbered D-222 to D-234; *Current ranges* below gives theirs.

## Your slice, the plan's section word for word (`.runs/task-cycles/petla-zarobkowa/plan.md`)

### Slice 2 — The life of a loop in the simulation

- **Goal:** `src/browser/sim/loop.ts` exists with `startLoop`, `stopLoop`, `advanceLoopRun` and
  `endLoopRun`, so a loop starts, passes game minutes and takes each end of a run, and stops. In detail:
  - `startLoop` as spec section 15 gives, returning the very state on each refusal; the first run
    takes `mixSeed(lastSeed, realMs)` and writes `lastSeed`; the program becomes the used-last and
    last-entered one, the row's pick is cleared and the character's `stoppedLoops` entry goes.
    `ruleCounts` and `countsProgram` stay as they are, and no `mapRunStarted` leaves the function
    (row 4, spec section 3).
  - A run goes by `newMapRun`, `takeTrip`, `stepMinute`, `tripLoot`, with the differences of spec
    section 3: no discovery, no game-written rule, no rule counts, no pay on the manual path, skills
    from the team's character at each run's start, the repertoire computed from the run's skills.
    `programOf` in `game.ts` takes the skills as an argument and is exported.
  - `advanceLoopRun` passes game time and leaves an end as it found it. `endLoopRun` takes the three
    ends of spec section 4 at once, starting the next run at game minute 0 with the next seed from
    the fifth generator of spec section 5. An uncovered death drops the loop and its `practice`
    (Q13); its report line comes with Slice 3. What a death does to a `Character` is pulled out of
    `settleDeath` into one function both use.
  - `stopLoop` pays the loop's `practice` and the run's, drops the loop, writes the sum into
    `stoppedLoops` (`{}` where none) and deposits nothing.
  - `send` throws for a character in a loop and clears its `stoppedLoops` entry. `GameEvent` gains
    `loopRunEnded` with the character's number, one for each end.
  - A state the simulation makes with a loop, at every minute of a run, loads back through
    `savedGame` and `withSaveTime`; this slice does not change `saved-game.ts`, and a refusal of such
    a state is a structural mismatch to report.
  - `tests/sim/loop.test.mjs` joins `stryker.config.json`, and `loop-run-knowledge` takes *Method*
    `test` in `foundations/invariants.md`.
- **Change:** `src/browser/sim/loop.ts` · `src/browser/sim/game.ts` · `src/browser/sim/random.ts` ·
  `src/browser/sim/run.ts` · `tests/sim/loop.test.mjs` · `tests/sim/random.test.mjs` ·
  `stryker.config.json` · `foundations/invariants.md`
- **Read:** `.runs/task-cycles/petla-zarobkowa/spec.md:36-55` Constraints ·
  `.runs/task-cycles/petla-zarobkowa/spec.md:59-96` 1. The game state holds loops beside the one manual run ·
  `.runs/task-cycles/petla-zarobkowa/spec.md:110-134` 3. A loop's run goes by the code of a manual run ·
  `.runs/task-cycles/petla-zarobkowa/spec.md:136-157` 4. The end of a loop's run ·
  `.runs/task-cycles/petla-zarobkowa/spec.md:159-170` 5. The next seed ·
  `.runs/task-cycles/petla-zarobkowa/spec.md:378-404` 15. Units and interfaces ·
  `.runs/task-cycles/petla-zarobkowa/spec.md:406-436` 16. Where the invariants are tested ·
  `.runs/task-cycles/petla-zarobkowa/spec.md:512-520` Left to the maker ·
  `.runs/task-cycles/petla-zarobkowa/task.md:20-22` To do, item 1 ·
  `.runs/task-cycles/petla-zarobkowa/task.md:26-46` To do, items 3 to 8 ·
  `.runs/task-cycles/petla-zarobkowa/task.md:52-52` To do, item 9, „Kup” ·
  `.runs/task-cycles/petla-zarobkowa/task.md:67-67` To do, item 15 ·
  `.runs/task-cycles/petla-zarobkowa/task.md:142-152` Q4 and Q5 ·
  `.runs/task-cycles/petla-zarobkowa/task.md:170-178` Q9 and Q10 ·
  `.runs/task-cycles/petla-zarobkowa/task.md:191-193` Q13 ·
  `.runs/task-cycles/petla-zarobkowa/task.md:206-208` Q16 ·
  `.runs/task-cycles/petla-zarobkowa/task.md:239-245` Context, tests of loop ·
  `.runs/task-cycles/petla-zarobkowa/task.md:354-361` Settlements to record, rows 2 to 9 ·
  `.runs/task-cycles/petla-zarobkowa/task.md:368-369` Settlements to record, rows 16 and 17 ·
  loop's tests as the task's *Context* names them, outside this repository and so without an address
  here: from the repository C:/Storage/repos/loop at commit cdc7c0d by git show, the tests and never the engine,
  src/sim/sim.test.ts:1464-1730, src/sim/chest.test.ts:350-374, src/sim/loop.test.ts:157-170,
  src/sim/policy.test.ts:587 ·
  `foundations/decisions.md:57-118` D-04 · `foundations/decisions.md:482-507` D-22 ·
  `foundations/decisions.md:1095-1114` D-55 · `foundations/decisions.md:1115-1141` D-56 ·
  `foundations/decisions.md:1367-1381` D-71 · `foundations/decisions.md:1679-1726` D-93 ·
  `foundations/decisions.md:2069-2092` D-118 · `foundations/decisions.md:2093-2118` D-119 ·
  `foundations/decisions.md:2177-2212` D-122 · `foundations/decisions.md:2213-2245` D-123 ·
  `foundations/decisions.md:2963-2977` D-164 · `foundations/decisions.md:3023-3037` D-168 ·
  `foundations/decisions.md:3053-3067` D-170 · `foundations/decisions.md:3212-3226` D-179 ·
  `foundations/decisions.md:3266-3278` D-183 · `foundations/decisions.md:3344-3358` D-189 ·
  `foundations/decisions.md:3359-3373` D-190 · `foundations/decisions.md:3374-3388` D-191 ·
  `foundations/decisions.md:3419-3433` D-194 · `foundations/decisions.md:3509-3523` D-200 ·
  `foundations/decisions.md:3907-3924` D-214 · `foundations/decisions.md:4003-4020` D-219 ·
  `foundations/decisions.md:4036-4062` D-221 ·
  the entries of the plan's rows How does the player start an earning loop?, What does the player see
  of an earning loop?, What does „Zatrzymaj” do? and What does a map run of an earning loop discover? ·
  `foundations/invariants.md:165-175` map-run-repeatability ·
  `foundations/invariants.md:176-186` simulation-randomness ·
  `foundations/invariants.md:214-225` simulation-isolation · `foundations/invariants.md:226-235` simulation-inputs ·
  `foundations/invariants.md:309-318` restart-seed · `foundations/invariants.md:518-527` character-team ·
  `foundations/invariants.md:838-847` saved-program-edit · `foundations/invariants.md:958-967` trip-transfer ·
  `foundations/invariants.md:968-977` trip-run-end · `foundations/invariants.md:1038-1047` solved-map-manual-run ·
  `foundations/invariants.md:1048-1057` resurrection-renewal · `foundations/invariants.md:1058-1067` death-settled-once ·
  the plan's row loop-run-knowledge ·
  `foundations/part_map.md:28-59` simulation ·
  `foundations/glossary.md:137-149` completion and solved map · `foundations/glossary.md:175-186` copy and practice ·
  `foundations/glossary.md:200-216` trip plan, resurrection and generation number ·
  the glossary entry of the plan's row earning loop ·
  `guidelines/coding.md` · `guidelines/coding-simulation-module.md` · `guidelines/testing.md` ·
  `src/browser/sim/types.ts` · `src/browser/sim/trip.ts` · `src/browser/sim/skills.ts` ·
  `src/browser/sim/programs.ts:330-350` · `src/browser/sim/saved-game.ts:69-95` ·
  `tests/sim/death.test.mjs:1-90` · `tests/sim/trip.test.mjs:330-345` · `tests/sim/program-fixture.mjs` ·
  `tests/sim/understanding-fixture.mjs` · `tests/sim/purity.test.mjs:29-45`
- **Model:** cheaper
- **Risk:** none
- **Checks:** First the tests: `npm test -- tests/sim/loop.test.mjs`, red before the code, each test
  citing an invariant (`loop-run-knowledge`, `trip-transfer`, `trip-run-end`, `death-settled-once`,
  `saved-program-edit`, `map-run-repeatability`, `simulation-inputs` on frozen inputs of every
  function of the slice, since the pool of `tests/invariants/test_simulation_inputs.py` holds no state
  with a loop) seen failing once. Then `npm test -- tests/sim/loop.test.mjs` ·
  `npm test -- tests/sim/random.test.mjs` · `npm test -- tests/sim/death.test.mjs` ·
  `npm test -- tests/sim/saved-game.test.mjs` · `npm test -- tests/sim/rules.test.mjs` ·
  `npm test -- tests/invariants/test_simulation_inputs.py` ·
  `npm test -- tests/invariants/test_simulation_isolation.py` ·
  `npm test -- tests/invariants/test_simulation_randomness.py` ·
  `npm test -- tests/quality/test_mutation_test_selection.py` ·
  `npm test -- tests/quality/test_quality_invariants.py` ·
  `python -B .the-way/elements/common/foundation_check.py`
- **Depends on:** Slice 1 · the plan's entries How does the player start an earning loop? · What does
  „Zatrzymaj” do? · What does a map run of an earning loop discover? · `loop-run-knowledge` ·
  `trip-run-end` · D-22 · D-189 · D-190

## Current ranges

These hold where they differ from the plan's *Read*, since the foundation step moved the entries.
Files of `src/` and `tests/` the *Read* names by range: earlier slices may have changed them, so
find the passage again by its name.

- D-226 (How does the player start an earning loop?): `foundations/decisions.md:4237-4265` — written by the foundation step
- D-227 (What does the player see of an earning loop?): `foundations/decisions.md:4266-4293` — written by the foundation step
- D-228 (What does „Zatrzymaj” do?): `foundations/decisions.md:4294-4321` — written by the foundation step
- D-232 (What does a map run of an earning loop discover?): `foundations/decisions.md:4436-4459` — written by the foundation step
- D-04: `foundations/decisions.md:57-118`
- D-22: `foundations/decisions.md:482-520`
- D-55: `foundations/decisions.md:1108-1127`
- D-56: `foundations/decisions.md:1128-1154`
- D-71: `foundations/decisions.md:1380-1394`
- D-93: `foundations/decisions.md:1692-1743`
- D-118: `foundations/decisions.md:2086-2109`
- D-119: `foundations/decisions.md:2110-2135`
- D-122: `foundations/decisions.md:2194-2229`
- D-123: `foundations/decisions.md:2230-2262`
- D-164: `foundations/decisions.md:2980-2994`
- D-168: `foundations/decisions.md:3040-3054`
- D-170: `foundations/decisions.md:3070-3084`
- D-179: `foundations/decisions.md:3229-3243`
- D-183: `foundations/decisions.md:3283-3295`
- D-189: `foundations/decisions.md:3361-3375`
- D-190: `foundations/decisions.md:3376-3390`
- D-191: `foundations/decisions.md:3391-3405`
- D-194: `foundations/decisions.md:3436-3450`
- D-200: `foundations/decisions.md:3526-3540`
- D-214: `foundations/decisions.md:3949-3966`
- D-219: `foundations/decisions.md:4045-4062`
- D-221: `foundations/decisions.md:4078-4105`
- `map-run-repeatability`: `foundations/invariants.md:165-175`
- `simulation-randomness`: `foundations/invariants.md:176-186`
- `simulation-isolation`: `foundations/invariants.md:214-225`
- `simulation-inputs`: `foundations/invariants.md:226-235`
- `restart-seed`: `foundations/invariants.md:309-318`
- `character-team`: `foundations/invariants.md:518-527`
- `saved-program-edit`: `foundations/invariants.md:838-847`
- `trip-transfer`: `foundations/invariants.md:958-967`
- `trip-run-end`: `foundations/invariants.md:968-977`
- `solved-map-manual-run`: `foundations/invariants.md:1038-1047`
- `resurrection-renewal`: `foundations/invariants.md:1048-1057`
- `death-settled-once`: `foundations/invariants.md:1058-1067`
- `loop-run-knowledge`: `foundations/invariants.md:1098-1107` — written by the foundation step
- part `simulation`: `foundations/part_map.md:28-59`
- glossary `completion`: `foundations/glossary.md:137-142`
- glossary `solved map`: `foundations/glossary.md:143-149`
- glossary `copy`: `foundations/glossary.md:175-180`
- glossary `practice`: `foundations/glossary.md:181-186`
- glossary `trip plan`: `foundations/glossary.md:200-205`
- glossary `resurrection`: `foundations/glossary.md:206-211`
- glossary `generation number`: `foundations/glossary.md:212-217`
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

### spec.md:110-134 — 3. A loop's run goes by the code of a manual run

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

### spec.md:159-170 — 5. The next seed

### 5. The next seed (carried question 2)

A fifth kind of draw, a generator of its own in `Stream`, with a constant of its own: the next run's
seed is one draw from that generator as `streamState` starts it from the ended run's seed, as a
uint32. Adding it changes no other stream's values. `lastSeed` is not touched by a loop's later runs.

The first run takes `mixSeed(lastSeed, realMs)` and writes `lastSeed`, as `send` does (Q10).

Rejected: drawing from `gatherRandom`, `wanderRandom` or `attackRandom` as they stand at the run's
end — a draw of one kind in the generator of another, which D-22 names as a breach, and a seed that
depends on what the program did; the seed plus one — not a draw, and D-22's entry says a draw.
Cost if wrong: small; only later runs' seeds move, and no saved field depends on it.

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

### spec.md:512-520 — Left to the maker


## Left to the maker

- Names of private helpers, how `loop.ts` divides inside, and field order in types.
- The exact class names and rules in `src/browser/styles.css`, reading tokens only.
- Where the row's lines stand among the row's elements, keeping To do 18's mark under „Wyślij”.
- Where focus goes when „Zamknij” removes itself from the screen, within D-42.
- How tests divide into files, and listing a new `tests/sim` file in `stryker.config.json`.
- A sentence for `guidelines/coding-saved-game.md` on a loop's run, if the change makes one earn its

### task.md:20-22 — To do, item 1

1. Gracz puszcza postać w pętlę zarobkową przyciskiem „Puść w pętlę”, który stoi w wierszu postaci w siedzibie przy każdej mapie rozwiązanej, obok „Wyślij”; klik od razu puszcza postać programem z listy „Program:” tego wiersza (Q1).
   - Na mapie nierozwiązanej pętli nie ma (test loop `src/sim/sim.test.ts:1509`).
   - Postać ma najwyżej jedną pętlę (test loop `src/sim/sim.test.ts:1520`), a kilka postaci chodzi w pętlach równolegle, obok jednego ręcznego przejścia (D-55; odpowiedź P3).

### task.md:26-46 — To do, items 3 to 8

3. Pętla wykonuje kopię programu wziętą na swoim starcie, z programu, który pokazuje lista „Program:” w wierszu postaci (D-170).
   - Ten program staje się programem użytym ostatnio przez postać i tym, z którym postać ostatnio weszła na mapę, a wybór w wierszu się czyści, jak przy wysłaniu.
   - Zmiana programu po starcie pętli jej nie dosięga i działa od następnego startu pętli (test loop `src/sim/loop.test.ts:157`).
   - Usunięcie programu zostawia pętlę na kopii (D-164, D-168).
   - Postaci w pętli nie da się przełączyć na inny program (odpowiedź P2), a kopii pętli nie da się poprawić, zapisać ani porzucić (test loop `src/sim/policy.test.ts:587`).
4. Każde przejście pętli jest osobnym przejściem i zaraz po domknięciu albo po śmierci z gotowym wskrzeszeniem startuje następne, na tej samej kopii (odpowiedź Q16).
   - Ziarno następnego przejścia pochodzi z losowania przejścia poprzedniego, z generatora tego rodzaju losowania, nigdy z czasu realnego (test loop `src/sim/sim.test.ts:1720`).
   - Pierwsze przejście pętli bierze nowe ziarno, jak każde wysłanie postaci, z ostatniego ziarna i czasu realnego (odpowiedź Q10).
5. Na każdym starcie przejścia pętli plan wyprawy kopii wiąże się od nowa: lista „Zabierz” bierze ze skrzynki drużyny, także na mapie rozwiązanej, a to, czego w skrzynce brakuje, nie wchodzi (D-179; testy loop `src/sim/chest.test.ts:350`, `:369`).
   - Pętla idzie dalej przycięta.
6. Przejście pętli płaci łupem przy domknięciu, według zamrożonej listy „Wynieś” (D-179).
   - Wprawa domkniętych przejść zbiera się przy pętli, poza umiejętnościami postaci, i wchodzi do nich przy zatrzymaniu pętli, razem z wprawą przejścia w toku, jeśli postać żyje (odpowiedź Q5; testy loop `src/sim/sim.test.ts:1630`, `:1645`).
   - Przejście zakończone śmiercią nie płaci ani łupem, ani wprawą, a to, co pętla zebrała wcześniej, zostaje przy pętli, gdy śmierć pokryje wskrzeszenie (test loop `src/sim/sim.test.ts:1561`).
7. Śmierć w pętli liczy się jak każda śmierć (wpis „What does a character's death take?”): gotowe wskrzeszenie nie ratuje przejścia, które kończy się śmiercią, tylko zużywa się, a pętla idzie dalej następnym przejściem (odpowiedź Q16).
   - Śmierć bez gotowego wskrzeszenia zatrzymuje pętlę i zabiera też wprawę zebraną przy pętli (odpowiedź Q13).
8. Gracz zatrzymuje pętlę przyciskiem niszczącym „Zatrzymaj” (tekst w `danger`, jak „Zakończ”), a klik działa od razu, bez pytania (odpowiedź Q5).
   - Postać wraca do zwykłego wiersza, a w nim do następnego wysłania albo puszczenia tej postaci stoi w roli `text-secondary` linia „Pętla zatrzymana · wprawa: {umiejętność} +{n}, …”.
   - Linia wraca po wczytaniu stanu gry (wiersz 7 *Settlements to record*).
   - Gdy pętla nie zebrała wprawy, linia brzmi samo „Pętla zatrzymana” (odpowiedź Q18).
   - Przedmioty niesione w przejściu w toku przepadają, a jego łup nie trafia do skrzynki (definicja, *Verification* wpisu „What pays, and what takes from the chest?”: “while its loot stays out”; D-183).
   - Gracz nie ogląda przerwanego przejścia: to nazwane odejście od loop (test loop `src/sim/sim.test.ts:1622`).

### task.md:52-52 — To do, item 9, „Kup”

   - Przy postaci w pętli „Kup” działa, a kupiony stopień działa od następnego przejścia tej pętli, bo trwające zachowuje umiejętności ze swojego startu (odpowiedź Q4).

### task.md:67-67 — To do, item 15

15. Przejście pętli dziś niczego nie odkrywa: Zrozumienie i program zostają, czas nie staje i gra nie dopisuje reguły z D-123, a gracz odkryje to w ręcznym przejściu (odpowiedź Q9).

### task.md:142-152 — Q4 and Q5

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

### task.md:170-178 — Q9 and Q10

- Q9. Co dzieje się, gdy postać w przejściu pętli spotka coś, czego gracz jeszcze nie odkrył?
  - Answer: Droga A — przejście pętli niczego nie odkrywa, a gracz odkryje to w ręcznym przejściu. Definicja zostaje. Słaby punkt nazwany w pytaniu: postać spotkała głód, a gra tego nie zapisała. Na rozwiązanej mapie odkryć jest mało, a nic ich nie traci.
  - Not chosen:
    - B — odkrycie wchodzi od razu, a raport je nazywa — niezmiennik doliczania przestaje być prawdziwy, więc potrzebna jest zmiana definicji z bramką.
    - C — odkrycia czekają w raporcie i wchodzą przy jego zamknięciu; pomysł krytyka, spoza źródeł — kolejny kawałek stanu gry; definicja zostaje.
  - Source: Mariusz, 2026-10-30, „przyjmuję rekomendacje” (pakiet rundy, pozycja D22). Materiał: D-118, D-119, D-122, D-123; definicja, `catch-up-state/1`; testy loop tego nie pokrywają.
- Q10. Skąd bierze ziarno pierwsze przejście pętli?
  - Answer: Nowe, jak przy każdym wysłaniu postaci. Zdanie definicji, że przejście pętli bierze ziarno z poprzedniego, dotyczy dalszych przejść, bo pierwsze poprzedniego nie ma, więc definicja nie wymaga zmiany.
  - Source: pozycja C8 pakietu rundy, zostawiona przez człowieka (Mariusz, 2026-10-30, „przyjmuję rekomendacje”), pod odpowiedzią P6. Test loop `src/sim/sim.test.ts:1464`: „`startLoop` bierze ziarno pierwszego przejścia z `freshSeed()`, czyli z prawdziwego losu”. Pokazana jako odpowiedź ze źródła, bez dróg, więc *Not chosen* nie ma.

### task.md:191-193 — Q13

- Q13. Co dzieje się z wprawą zebraną przy pętli, gdy śmierć bez wskrzeszenia ją zatrzyma?
  - Answer: Przepada razem z resztą.
  - Source: pozycja C9 pakietu rundy, zostawiona przez człowieka (Mariusz, 2026-10-30, „przyjmuję rekomendacje”), pod odpowiedzią P6. Test loop `src/sim/chest.test.ts:550`: „noc zatrzymana śmiercią bez wskrzeszenia nie niesie przyrostu wprawy”; `src/sim/death.test.ts:48`. Definicja, linia 1526: “so a night can be lost”. Pokazana jako odpowiedź ze źródła, bez dróg, więc *Not chosen* nie ma.

### task.md:206-208 — Q16

- Q16. Czy gotowe wskrzeszenie ratuje przejście, czy przejście kończy się śmiercią jak dziś, a wskrzeszenie chroni wprawę, wykupione stopnie i numer pokolenia? (pytanie kanoniczne: Q3 rozmowy refinementu zadania 14)
  - Answer: Gotowe wskrzeszenie nie ratuje przejścia: przejście kończy się śmiercią jak dziś, postać traci to, co niosła, a przejście nie płaci niczym. Wskrzeszenie chroni przed tym, co śmierć zabiera „też”: całą wprawą, każdym wykupionym stopniem i wzrostem numeru pokolenia, a samo się przy tym zużywa. Definicja, „(new) — What does a character's death take?”: “A character's death takes what it carried and pays nothing of its map run; when the character has no resurrection ready, it also takes all its practice and every rank of branch it bought, and the character's generation number grows by one, its archetype unchanged. The programs, the chest, the Understanding and the solved maps survive every death. Each character has one resurrection, used up by a death and renewed after a span of real time set in the balance data, eight hours to start, and a death without one stops the character's earning loop.” D-61: “A character dies in the game minute in which its health reaches zero, also during the character's action in progress, and the map run then ends in death with its cause.” Definicja, „(new) — What pays, and what takes from the chest?”: “a run that ends in death pays neither loot nor practice”. Definicja, „(new) — How fast does the earning loop go?”: “Each map run of an earning loop is a map run of its own, followed at once by the next as long as the earning loop goes on.” Rozjazd, którego pozycja C3 nie pokazała: definicja, In scope, linia 44, mówi „śmierć zabiera postać”, co czytane dosłownie sięga szerzej niż cytat wyżej, więc to zdanie czyta się przez ten cytat.
  - Source: definicja `definicja_mvp_loop2.md` (sha256 fda97782458d, Status approved 2026-10-29), linie 44, 1505–1510, 1456, 1376–1377; fundament na `95de83b`: D-61 `foundations/decisions.md:1193`; cytat zostawiony przez człowieka (Mariusz, 2026-10-30, „przyjmuję wszystko zgodnie z rekomendacjami”, pakiet rundy, pozycja C3).

### task.md:239-245 — Context, tests of loop

## Context

- Materiał z loop: definicja pozwala czytać z kodu loop pliki danych i testy, a zachowanie, którego one nie pokrywają, zadania biorą z koncepcji albo ustalają same (definicja, Inputs and constraints).
- Silnika i interfejsu loop to zadanie nie czytało.
- Commit loop: `cdc7c0d`.
- Testy loop o pętli: `src/sim/loop.test.ts` (kolejność listy postaci, raport przy każdej postaci, pętla stojąca nie zatrzymuje doliczania reszty), `src/sim/sim.test.ts:1486`–`1910` (uruchamianie, wprawa, zatrzymanie, śmierć, wskrzeszenie w trakcie nocy) i `:2008`–`2043` (zaległe minuty, zegar po wczytaniu), `src/sim/chest.test.ts:350`–`374` i `:491`–`558` (plan wyprawy w pętli, bilans skrzynki w raporcie), `src/sim/report.test.ts` (raport: najpierw pętle, które stanęły).
- Odejścia od testów loop, nazwane w odpowiedziach: Q3, Q5 (co gracz widzi), Q7, Q20 i Q21.

### task.md:354-361 — Settlements to record, rows 2 to 9

| 2 | Puszczenie w pętlę liczy się dla listy „Program:” jak wysłanie: program staje się użytym ostatnio i tym, z którym postać ostatnio weszła na mapę, a wybór w wierszu się czyści. | decision | propozycja refinera, cały wiersz: *To do* 3, krok od D-170: “The player picks the program a character enters a map with on the select list „Program: {name}””, która mówi tylko o wejściu na mapę | czy start pętli zmienia to, co wiersz pokaże przy następnym wysłaniu |
| 3 | Trwającą pętlę gracz widzi dziś w wierszu postaci: jedna linia w roli `text`, „Pętla: {mapa} · przejście {n} · minuta {m} · domknięte {k}”, i przycisk „Zatrzymaj”. | decision | pytanie Q2, droga A (pozycja D15), *Not chosen* tam; nazwane odejście od loop, którego testy zakładają, że przejście pętli da się obejrzeć (`src/sim/sim.test.ts:1622`, `:1685`), przyjęte w pytaniu Q20, *Not chosen* tam; propozycja refinera: rola `text`, czyli zwykły kolor tekstu | co i gdzie pokazać z pętli |
| 4 | Mapy przejścia pętli gra dziś nie otwiera, licznik zadziałań reguł obejmuje ręczne przejście, a start pętli zostawia liczniki po ręcznym przejściu takie, jakie były. | decision | pytanie Q2, droga A (pozycja D15), *Not chosen* tam; to samo nazwane odejście od loop co w wierszu 3, pytanie Q20; zmienia D-93: “During a map run every program rule of the copy the map run carries out shows how many times it fired in that map run”; propozycja refinera: część o starcie pętli, bo D-93 trzyma liczniki “until the next send or map run restart”, a pozycja D15 o tym nie mówi | czy budować drugi ekran przejścia, czy liczyć i pokazywać liczniki pętli i czy jej start czyści liczniki po ręcznym przejściu |
| 5 | Przy postaci w pętli „Wyślij” i „Puść w pętlę” są dziś nieczynne, a gracz najpierw ją zatrzymuje. | decision | pytanie Q3, droga A (pozycja D16), *Not chosen* tam; nazwane odejście od loop, gdzie „Wyślij” sam zatrzymuje pętlę | czy „Wyślij” sam zatrzymuje pętlę, jak w loop |
| 6 | Przy postaci w pętli „Kup” działa, a kupiony stopień działa od następnego przejścia tej pętli, gdy trwające zachowuje umiejętności ze swojego startu. | decision | pytanie Q4, droga A (pozycja D17), *Not chosen* tam; zmienia D-200: “The player currently buys a branch rank with „Kup” in the headquarters outside a map run”; propozycja refinera: „gdy trwające zachowuje umiejętności ze swojego startu”, którego pozycja D17 nie pokazała | czy wyłączyć „Kup” i czy stopień wchodzi do trwającego przejścia |
| 7 | „Zatrzymaj” to przycisk niszczący z tekstem w roli `danger`, który działa od razu po kliknięciu: przedmioty niesione w przerwanym przejściu przepadają, jego łup nie trafia do skrzynki, postać wraca do zwykłego wiersza, a w nim do następnego wysłania albo puszczenia tej postaci, także po wczytaniu stanu gry, stoi w roli `text-secondary` „Pętla zatrzymana · wprawa: {umiejętność} +{n}, …”, a gdy pętla nie zebrała wprawy, samo „Pętla zatrzymana”. | decision | pytanie Q5, droga A, nazwane odejście od loop (pozycje C7 i D18), *Not chosen* tam; zmienia D-183: “When „Zakończ” or „Restart” ends a map run before completion, its carried items — brought in and gathered — are lost.”; propozycja refinera: obie role (pozycja D18 mówi „w kolorze ostrzegawczym”), „do następnego wysłania albo puszczenia”, „także po wczytaniu stanu gry”; linia przy pętli, która nie zebrała wprawy — pytanie Q18, droga A, *Not chosen* tam | czy pytać o potwierdzenie, czy zostawić przejście do obejrzenia, jak w loop, czy pokazać, co weszło, co dzieje się z plecakiem i czy linia przeżywa przeładowanie |
| 8 | Gdy postać nie ma gotowego wskrzeszenia, śmierć zabiera też wprawę zebraną przy pętli. | decision | pytanie Q13 (pozycja C9, zostawiona przez człowieka) | która z dwóch reguł definicji idzie pierwsza |
| 9 | Pierwsze przejście pętli bierze nowe ziarno, jak każde wysłanie postaci. | decision | pytanie Q10 (pozycja C8, zostawiona przez człowieka) | skąd wziąć ziarno, którego wpis o losie nie nazywa |

### task.md:368-369 — Settlements to record, rows 16 and 17

| 16 | Przejście pętli dziś niczego nie odkrywa, więc czas nie staje i gra nie dopisuje do programu reguły przy odkryciu, a gracz odkrywa to w ręcznym przejściu. | decision | pytanie Q9, droga A (pozycja D22), *Not chosen* tam; zmienia D-71: “Discoveries enter the Understanding where their cause occurs”; propozycja refinera: „czas nie staje” i część o regule, wnioski z tej drogi przy D-123: “A program rule the game writes at a discovery goes into the first rule group of the copy” | czy przejście pętli staje, pisze do Zrozumienia i dopisuje regułę przy odkryciu |
| 17 | Przejście pętli zostawia dziś Zrozumienie i programy gracza takie, jakie zastało. | invariant | propozycja refinera, cały wiersz: pytanie Q9, droga A; stoi na tym niezmiennik `catch-up-state/1` z definicji | czy pilnować tego testem, na którym stoi prawdziwość `catch-up-state/1` |
