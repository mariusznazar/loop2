# Plan — Pętla zarobkowa na mapie rozwiązanej i doliczanie czasu nieobecności

- Task: `.runs/task-cycles/petla-zarobkowa/task.md`
- Spec: `.runs/task-cycles/petla-zarobkowa/spec.md`
- Base: `4ed8fcd`

## Foundation entries

| Entry | Kind | From | What depends on it |
|---|---|---|---|
| How fast does the earning loop go? (new) | decision | projected entry of the task, whole | Slices 3, 4, 5 |
| When and how is the time away computed? (new) | decision | projected entry of the task, whole | Slice 3 |
| How does the game state hold earning loops? (new) | decision | spec section 1 | Slice 1 |
| Which clock drives an earning loop? (new) | decision | spec sections 6, 7 | Slices 3, 4 |
| How does the player start an earning loop? (new) | decision | rows 1, 2, 5 | Slices 2, 5 |
| What does the player see of an earning loop? (new) | decision | rows 3, 4 | Slices 2, 5 |
| What does „Zatrzymaj” do? (new) | decision | row 7 | Slices 2, 5 |
| What does the player read after being away? (new) | decision | rows 10, 11, 22, 23, 24, 26 | Slices 1, 3, 6 |
| When is time away computed, and how much? (new) | decision | rows 12, 25 | Slices 3, 4 |
| What is the save time? (new) | decision | row 13 | Slice 1 |
| What does a map run of an earning loop discover? (new) | decision | row 16, the exception D-118 and D-71 point to | Slice 2 |
| What does a pause or an end screen hold? (new) | decision | row 20 | Slices 3, 4 |
| How does the list of maps mark a rehearsal the loop cannot repeat? (new) | decision | row 21 | Slice 5 |
| D-22 (changed) | decision | projected "Where does the simulation's randomness come from?", row 9, spec section 5 | Slice 2 |
| D-44 (changed) | decision | spec, *Foundation entries*: „Zatrzymaj” joins the destructive buttons | Slice 5 |
| D-62, D-132 (changed) | decision | row 20 | Slices 3, 4 |
| D-71 (changed) | decision | row 16 | Slice 2 |
| D-93 (changed) | decision | row 4 | Slice 2 |
| D-164 (changed) | decision | projected "Who owns a program?", its check included | Slice 2 |
| D-183 (changed) | decision | row 7 | Slice 2 |
| D-189 (changed) | decision | projected "What pays, and what takes from the chest?" | Slices 2, 5 |
| D-190 (changed) | decision | projected "What does a character's death take?", row 8 | Slice 2 |
| D-194 (changed) | decision | To do 19: the accepted cost of the state before the loop removed | none of the code |
| D-200 (changed) | decision | row 6 | Slices 2, 5 |
| D-207 (changed) | decision | row 18, spec section 10; its *Verification* clause "a tab that has just loaded…" narrowed to no loop passing (note 2 of the spec's review); its *Rejected* touched as the task says | Slices 1, 4 |
| D-208 (changed) | decision | row 19 | Slice 4 |
| `catch-up-state` (new) | invariant | projected `catch-up-state/1`, whole. Check: test citing it in `tests/sim/catch-up.test.mjs` (spec section 16), Slice 3 | Slice 3 |
| `catch-up-minutes` (new) | invariant | row 14. Check: test citing it in `tests/sim/catch-up.test.mjs`, Slice 3 | Slice 3 |
| `catch-up-death-moment` (new) | invariant | row 15. Check: test citing it in `tests/sim/catch-up.test.mjs`, Slice 3 | Slice 3 |
| `loop-run-knowledge` (new) | invariant | row 17. Check: test citing it in `tests/sim/loop.test.mjs`, Slice 2 | Slice 2 |
| `trip-run-end` (changed) | invariant | task, *Decisions in play*: stopping an earning loop counts with ending. Check: test citing it in `tests/sim/loop.test.mjs`, Slice 2 | Slice 2 |
| `earning loop` (new) | glossary | projected entry, whole | every slice |
| `catch-up` (new) | glossary | projected entry, whole | Slices 3, 4, 6 |
| `save time` (new) | glossary | row 13; its **Not** names D-207's "moment of saving" | Slices 1, 4 |

Rows 1 to 26 of *Settlements to record* each stand above. Projected entries keep their wording, and
rows take rule P4 of the task. The four new invariants read *Method* `review` until the slice that
writes their test sets it to `test` (WAY-61); `trip-run-end` keeps `test`. `minute-span-split`,
`map-run-repeatability`, `trip-transfer`, `saved-program-edit`, `death-settled-once` and
`resurrection-renewal` keep their words and gain tests in Slices 2 and 3. The part map does not
change and no environment fact is written (spec, *Foundation entries*).

## Slices

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
  `.runs/task-cycles/petla-zarobkowa/spec.md:407-437` 16. Where the invariants are tested ·
  `.runs/task-cycles/petla-zarobkowa/spec.md:513-521` Left to the maker ·
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
  `.runs/task-cycles/petla-zarobkowa/spec.md:379-405` 15. Units and interfaces ·
  `.runs/task-cycles/petla-zarobkowa/spec.md:407-437` 16. Where the invariants are tested ·
  `.runs/task-cycles/petla-zarobkowa/spec.md:513-521` Left to the maker ·
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
  `.runs/task-cycles/petla-zarobkowa/spec.md:371-377` 14. The balance entry ·
  `.runs/task-cycles/petla-zarobkowa/spec.md:379-405` 15. Units and interfaces ·
  `.runs/task-cycles/petla-zarobkowa/spec.md:407-437` 16. Where the invariants are tested ·
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

## Coverage

| What the task requires | Slices or entries |
|---|---|
| Outcome: an earning loop on a solved map, time away computed and reported | Slices 1 to 6 |
| To do 1 | Slice 2 (`startLoop`), Slice 5 (button) |
| To do 2 | Slices 2, 3 (own functions, no read of `paused` or `pace`), Slice 3 (balance entry), Slice 4 (clock) |
| To do 3 | Slice 2 (copy, used-last, pick cleared), Slice 5 (list) |
| To do 4 | Slice 2 |
| To do 5 | Slice 2 |
| To do 6 | Slice 2 |
| To do 7 | Slice 2 |
| To do 8 | Slice 2 (`stopLoop`), Slice 5 (button, line); the line after a load: Slices 1, 5 |
| To do 9 | Slice 2 (counts untouched, „Kup”, `send` refused), Slice 5 (line, button, disabling) |
| To do 10 | Slice 1 |
| To do 11 | Slice 3 (`catchUp`, `loopSpan`), Slice 4 (after each load) |
| To do 12 | Slice 3 |
| To do 13 | Slice 3 (reads neither `run` nor `paused`), Slice 4 |
| To do 14 | Slice 3 |
| To do 15 | Slice 2 |
| To do 16 | Slice 1 (shape), Slice 3 (lines), Slice 6 (section) |
| To do 17 | Slice 4; „Puść w pętlę”, „Zatrzymaj” and „Zamknij” through `act` or its like: Slices 4, 5, 6 |
| To do 18 | Slice 5 |
| To do 19 | *Foundation entries* |
| Row 1, 2, 5 | How does the player start an earning loop?; Slices 2, 5 |
| Row 3, 4 | What does the player see of an earning loop?; D-93; Slices 2, 5 |
| Row 6 | D-200; Slices 2, 5 |
| Row 7 | What does „Zatrzymaj” do?; D-183; Slices 2, 5 |
| Row 8 | D-190; Slice 2 |
| Row 9 | D-22; Slice 2 |
| Row 10, 11, 22, 23, 24, 26 | What does the player read after being away?; Slices 1, 3, 6 |
| Row 12, 25 | When is time away computed, and how much?; Slices 3, 4 |
| Row 13 | What is the save time?; `save time`; Slice 1 |
| Row 14 | `catch-up-minutes`; Slice 3 |
| Row 15 | `catch-up-death-moment`; Slice 3 |
| Row 16 | What does a map run of an earning loop discover?; D-71; Slice 2 |
| Row 17 | `loop-run-knowledge`; Slice 2 |
| Row 18 | D-207; Slice 4 |
| Row 19 | D-208; Slice 4 |
| Row 20 | What does a pause or an end screen hold?; D-62, D-132; Slices 3, 4 |
| Row 21 | How does the list of maps mark a rehearsal the loop cannot repeat?; Slice 5 |
| Projected entries: earning loop's speed, time away, randomness, what pays, death, who owns a program, `catch-up-state`, `earning loop`, `catch-up` | *Foundation entries*; D-22, D-189, D-190, D-164; Slices 2, 3 |
| A forged or malformed loop, report or save time refused whole (spec, *Goals*) | Slice 1 |
| `SAVED_GAME_VERSION` raised (spec, *Goals*) | Slice 1 |

## Choices

| Choice | Way rejected | Cost if wrong |
|---|---|---|
| The first cut of the spec's section 17 becomes three slices: the document, the life of a loop, time and the report | One slice for the whole cut, or the shape cut from the version | Three agents instead of one; a seam between `loop.ts`'s two slices that the second has to reopen |
| The document and the stamping of saves stand in one slice with the load, so the branch never sends a document its load refuses and each changed test changes once | The stamping left to the view's cut, as section 17 lists `game-saver.ts`: a state of the branch whose saver writes what its load refuses, and the same tests changed twice | The trust-boundary slice is larger and spans two parts, ten files, the limit, so its review reads more |
| The shape is whole in Slice 1, ahead of the code that fills it, so the trust boundary has one review of its own and no later slice touches `saved-game.ts` | The reader written beside the mechanics | The shape turns out wrong when the mechanics come; the later slice returns it as a structural mismatch and Slice 1's file is reopened with a review of its own |
| The trip's clipped take list and `trip.ts` go with the mark in Slice 5, since a loop's run needs no change of `trip.ts` | `trip.ts` in the first cut, as section 17 lists it | None to the behaviour; one file moved |
| The balance entry goes with `loopSpan` in Slice 3 | In the first slice of the simulation | None to the behaviour |
| The tests of the simulation stand in two new files, `tests/sim/loop.test.mjs` and `tests/sim/catch-up.test.mjs`, each in `stryker.config.json` | One file | A shared fixture has to be drawn out or repeated |
| The view's cut becomes three slices: clock and saving, the row, the report section | One slice of many small things | `game-view.ts` and `tests/view/account-screen.test.mjs` change in three slices, one after another |
| What the page does on a click or a load is tested in `tests/view/account-screen.test.mjs`, whose document model already drives `createGameView`, and the texts in the pure tests | A new test file with its own document model | That file grows by what three slices add |
| A line of a loop that stopped keeps `practice` `{}`, by Q13 and `src/sim/chest.test.ts:550` of loop; no stopped line shows it | The gain kept up to the stop, which the spec's words "the gain in the loop's `practice`" leave open; a difference taken against a loop that is gone gives something the load refuses, with the whole save | None the player sees |
| The new invariants read *Method* `review` until the slice that writes their test sets `test`, as WAY-61 gives, so Slices 2 and 3 change `foundations/invariants.md` | `test` from the start, true only once the slice is made | One line in two slices; the mechanical check of those slices has to expect the file |
| No sentence for `guidelines/coding-saved-game.md`: the spec leaves it optional, the file's rules hold without it, and Slice 1 stands at ten files | A sentence on a loop's run in Slice 1, an eleventh file | A reader of the guideline finds no word on a loop's run; the return step can add it |
| The sentence of the styleguide on destructive buttons changes in Slice 5, with the button | In the entry agent's step, which writes foundation entries, not guidelines | None |
| Every slice but Slice 1 stays on the default class of model | A higher class for Slice 3, which holds `catch-up-state`, though it stays in one part and the spec settles its design | A failed cheaper executor is retried one class higher |
