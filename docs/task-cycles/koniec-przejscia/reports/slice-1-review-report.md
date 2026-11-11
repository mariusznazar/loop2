PASS d7ac8a90ee03a1eb844a34714cf5e07864a61b06

# Review of slice 1 of the task koniec-przejscia (range 211a4ea556d48f5da98fc08380b3c061b9365709..d7ac8a9)

Reviewed: `git log 211a4ea..d7ac8a9` (e0fd091, c730482, 41abf1f, d7ac8a9) and `git diff 211a4ea..d7ac8a9` (13 files); `git rev-parse HEAD` in the worktree is `d7ac8a90ee03a1eb844a34714cf5e07864a61b06`, as given.

Result: no blocking finding. Three Minor findings within the task, two out-of-scope lines (one observation, one declined to judge).

## Findings

### Blocking (Critical / Important)

none

### Minor

1. `src/browser/sim/saved-game.ts:997` (the `record` reader, `enteredWith: tripList(read.enteredWith)`), against `src/browser/sim/types.ts:314-319` (the doc comment of `enteredWith`: "in the order of the data's items").
   - What: the load reads `enteredWith` as `tripList` does (item of the data, each once, count from 1) and does not demand the data's item order that the type's comment and the slice's Goal state for what the game writes. A document with the entries in another order loads and the window would list them in that order.
   - Why it matters: only a crafted save reaches it (the game always writes the data's order; `tests/sim/run-record.test.mjs` "keeps it, in the order of the data's items" shows it). The slice's wording says "read as the lists `tripList` reads", so the executor's choice 3 follows the plan. `guidelines/coding-saved-game.md` allows refusing more and the neighbouring `deposited` reader refuses an order the type states, so a one-line refusal would match. Grade Minor: nothing is lost and no later slice depends on the order for correctness.
   - Evidence: scratch probe (method below) on a state saved at game minute 40 with `enteredWith` reversed: the load answered `LOADS`.

2. Same reader: `enteredWith` counts are bounded only by "a safe integer from 1" (`tripList`), not by what the character could carry.
   - What: a count of 9007199254740991 loads; the game itself writes at most `traits.carryingCapacity` pieces in all (15 in the probe).
   - Why it matters: only a crafted save by its own player; the window would print the number in „weszła z …”. It is outside the slice's list of refusals ("a repeated or unknown item", "a count from 1"), and `bringPlan` is read just as loosely, so it is polish, not a gap in the boundary.
   - Evidence: probe, `enteredWith[0].count = Number.MAX_SAFE_INTEGER` on a character with capacity 15: `LOADS`.

3. `tests/sim/run-record.test.mjs:196-241` (`fought()` and the test at :221): the expected counts partly repeat the product's rule.
   - What: the watcher computes the kind of each minute by the same rule as `minuteKind` (`activeCombat` first, then the activity's action kind, else wait) and the test compares `counted(run.minutesByAction)` and `run.longestStreak` with it (:239-240). `guidelines/testing.md` ("Where the expected value comes from", "Test inputs and expected values") asks for expectations not derived by the product's algorithm.
   - Why it matters: limited. The same test also pins values that are independent: `combat` is 5 (D-71 `combatMinutes`), the death comes at the attack minute + 5, the other minutes sum to the attack minute, and the sum equals `minute`; the other tests use hand-written numbers (explore 20 + wait 10; the cold streak of 83 from `streak.test.mjs`). A mutation of the rule is caught by the independent assertions (see Stryker below), so the mirror adds little but also costs little.
   - Evidence: reading of the test; Stryker on `run-record.ts` killed 27 of 29 mutants, the two survivors being equivalent (see checks).

### Out of scope

4. Observation, not a finding on this range: `foundations/decisions.md` D-339 (unchanged by this task, as Question 4 says "D-338 i D-339 bez zmian") still says in its Verification "the saved game state keeping its version" and in its Rationale "the save keeping its shape and its version". The sentences are about the chronicle adding nothing to a save, and stay true of it; but after this task's bump of the version a reader comparing a later change with D-339 alone may take the version bump for a violation. Not for this slice; for the return step, if the human wants the wording to say "the chronicle changing neither shape nor version of the save".

(Declined to judge, below, holds the second out-of-scope line.)

## The slice against its task passages (all met by the code, checked, not taken from the report)

- To do 5 (the run remembers the longest streak): `nextRecord` takes `max(record.longestStreak, after.streak)` after every game minute, the minute of a death or a completion included; bounds at the load `streak <= longestStreak <= minute`. Checked by `tests/sim/run-record.test.mjs` (83 after the loss by cold, 10 kept after a change of the program, 33 once passed, 480 at the completion) and by the probe.
- To do 7 sources (time by action, entered with): the record counts each game minute once to what the character was doing at its start (`combat` while `activeCombat`, else the activity's action kind, else `wait`), so the counts sum to `minute` (an independent watcher in the fight test and the sum assertion; my probe of a 600-minute fight run gave explore 39, wander 5, gather 170, combat 5 = the watcher's count). `enteredWith` is `startRecord(equipment.backpack)` in `startRun`, so `send` and `restart` both bind it; the take from nowhere on a solved map is covered; it stays after the backpack empties.
- To do 10 and Question 6 (one bump, 3 to 4; another version refused whole): `SAVED_GAME_VERSION = 4`; the document of version 3 is refused as `version`, also with the record in it (`tests/sim/saved-game.test.mjs` "the document of version 3 is refused ..."; probe: `v3 shape` -> `refused:version`, `version 3 w/ fields` -> `refused:version`).
- Question 4 (what comes back after a load): a map run that goes on, one that died and one that completed load back with the three fields (the test "the record loads back whole ..."; probe: death settled and restarted states round-trip through `savedGame` and `loadSavedGame`).
- Slice Goal details: `src/browser/sim/run.ts` is not changed (diff); the plain `MapRun` of an earning loop keeps none of the record (`MANUAL_ONLY` in `tests/sim/loop.test.mjs` gained the three keys; the load refuses a loop's run holding one; the "earning loop keeps none" test); `end`, `settleDeath` and the editing functions leave the record (they spread the map run; test "settling the death leaves the record ... and so does editing the program"). `restart` rebinds all three fields through `startRun` instead of "leaving them": the plan says both "leaves as it finds it" and "bound again at „Restart”", and a restarted run is at game minute 0, so counts that must sum to `minute` have to start again; the executor's choice 2 is the only reading that keeps the sum rule true. Not a finding.

## Trust boundary (`src/browser/sim/saved-game.ts`): crafted input checked

I wrote a scratch probe that saves a real game state at game minute 40 (`savedGame` after `withSaveTime`), edits the JSON and loads it. Each of these answered as shown (`refused:shape` unless stated):

missing `longestStreak`, `minutesByAction`, `enteredWith` (the three together: `refused:shape`); a foreign key in the map run; a foreign kind (`sleep`) in `minutesByAction`; a kind missing; sum 41 and sum 39 against `minute` 40; `longestStreak` at `minute + 1` and at `streak - 1` (both refused), at `minute` (loads, the edge); `longestStreak` as text; `minutesByAction` as a list; `enteredWith` as text; an unknown item (`toString`); a count of 0; a count of 1.5; a repeated item; an accessor property for `longestStreak`; a combat action (`dodge`) as the activity going on; a document of version 3 with or without the fields (`refused:version`). The 36 cases of `tests/sim/saved-game.test.mjs` added or changed by the slice cover the same list and more (mistyped, fractional, NaN, beyond the safe integers, `__proto__`, inherited keys, holes, foreign keys inside an entry, a loop's map run with each field). The no-throw sweep of that file still passes. The refusal of a combat action as the activity going on (`saved-game.ts:624`) is beyond the slice's list, allowed by "wolno odmówić więcej", and sound: `program.ts` refuses a combat action outside a fight ("tylko w walce"), and `finishMinute` sets `current: null` when an attack starts, so a game-made state never holds one (probe: a program with `kick` first never made it the activity in 300 minutes, and the death state round-trips).

## Foundation entries the range writes (D-362 new; D-53, D-62, D-122, D-132, D-135, D-147, D-173, D-185, D-212, D-216, D-311, D-313 changed)

Read against the task's rows 1-7 and the projected sentences in *Decisions in play*, and the writer's report as claims:

- D-135 (read whole): says the manual map run keeps the longest streak and the window shows it as „najdłuższa passa {longest}/{required}” with the bar of D-133; Rationale names "one more field in the game state and a bump of the version of the save". The code of this slice does exactly that (field, bump, back after a load). Verification lines ("a longest streak that a load of the saved game state loses" violates) hold.
- D-212 (read whole): "holding all it held but „Ostatnie minuty”" after a load is true of the fields this slice saves (title cause from `death` and the map's text, longest streak, time by action, entered with, counters, tiles, `deposited`, `deathSettlement`, `discovery`, `lastCombat`); the *Rejected* sentences match Question 4 (A chosen). Row 5 lands whole.
- D-362 (read whole): the order what happened / what it cost or gave / why / what next, the sections and their conditions (“Ostatnie minuty” only after a death, four entries other than the paragraph of the last encounter, 8 % and five pieces, „W drodze”, „Czeka”, „Walka”, „reszta”, no „odłożyła”), the buttons and their fixing at the bottom, „✕” and Escape, „Koniec przejścia” in the header, reopening at every entry and after a load: each matches the task's To do 1, 2, 4-9 and rows 1, 2, 7 as I read them. The heading question reworded from "What does the end of a map run explain?" to "What does the end-of-run window say, and how does it open and close?" says what the task requires (WAY-263): it follows To do 11 and Question 11 (the entries name the window, "the end of a map run" stays the moment) and covers rows 1 and 2, which the projected question did not; no meaning is added or lost. The sentences about the window and the screen are judged against the task, since the code does not exist yet.
- D-132 (statement read whole): "the completion text of the map from its data, such as „Las rozwiązany”" where the definition's template says „{mapa} rozwiązana” is what the task's To do 4 gives („Las rozwiązany”, from the map's data) and what the code's `solvingText` carries; the template would give the wrong gender for „Las — głębiej rozwiązany”, so the wording is right (WAY-263: no meaning added, one made correct).
- D-62, D-122, D-147, D-173, D-185, D-216, D-311, D-313, D-53: read in the diff (`git diff 211a4ea..d7ac8a9 -- foundations/decisions.md`) against To do 1-9 and rows 1-7; no sentence contradicts the task or this slice's code; D-216's "8 godzinach" agrees with `resurrectionRenewalRealMinutes: 480` in `src/browser/sim/data/balance.ts:42`. D-122's corrected Rationale (the game state tells a stop at a discovery from a pause by its `discovery` field) agrees with `game.ts` (`discovery: revealed, paused: !completed`). D-185/D-216/D-311/D-313 sentences about where lines and buttons stand are for later slices (see Declined to judge).
- `python -B .the-way/elements/common/foundation_check.py`: 0 errors.
- No foundation file other than `foundations/decisions.md` changed (diff stat); the plan's *Foundation entries* are all decisions.

## Guidelines

- `guidelines/coding-saved-game.md`: each rule that has no invariant compared with the change. "Odmowa zamiast wyjątku": the new reader refuses through `refuse()` and builds new values (`fields`, `count`, `tripList`); no throw for any document (sweep test passes). "Wersja podnoszona razem z kształtem": the constant is 4, `DOCUMENT` is rewritten as version 4 with a hand-written `RUN_RECORD` (212 minutes, sum shown in the comment and reproducible: 40+30+20+10+70+20+5+5+5+2+5 = 212), `DOCUMENT_V3` stays and is refused as another version, with a comment on the exception rule not needed since the version rose. The test fills every optional branch. "Ścisłe wczytanie", "Plan wyprawy i skrzynia": `enteredWith` is read by `tripList` as the list prescribes (see Minor 1-2 for what it does not demand).
- `guidelines/coding-simulation-module.md`: `run-record.ts` imports only simulation files and data; `startRecord`/`nextRecord` return new values; `advanceMinutes` gets the record through pure functions. Its table "Files of this kind" does not yet list `run-record.ts`; the plan gives that to slice 7 (To do 13), so it is not a defect of this slice.
- `guidelines/coding.md`: no log or failure rule reached; formatting and lint checked below.
- `guidelines/testing.md`: the two view tests changed in `d7ac8a9` were changed for a source (the version bump; the load's sum rule), the version cases still test another version (`OLDER_VERSION = 2`) and the trip test's loaded screen is now read from a state that really loads (checked: the test passes with `loaded.ok` true). The modified `tests/sim/encounters.test.mjs:547` and `tests/sim/skills.test.mjs:617` compare or build with the record the sent map run held; the assertions are not weakened (the same deepEqual plus the three fields). `stryker.config.json` lists the new test file (the quality test `test_mutation_test_selection.py` needs it). Trust-boundaries table: the `save-version` cases the table names still exist and run.

Changed invariant tests, named (all in `tests/sim/saved-game.test.mjs`, invariant `save-version` unless stated):
- "a document of another version is refused as version, whatever its game holds": stand-in versions 4 -> 5 (kept strict: 0, 5, -1; "version 5 of another shape"; "version 5 with an archetype absent from the data").
- "the document of version 2 is refused as version, whatever its game holds": only its comment moved.
- "a crafted document of the current version is refused whole as shape": its table `CRAFTED` gained 44 cases for the record, the combat activity and the earning loop's run (no case removed).
- "the server's save of the current version loads into the game it holds, its revision left out" (no invariant marker): versions 3 -> 4 and 4 -> 5.
- "the load changes nothing passed to it, and the state it gives shares nothing with it" (guideline invariant simulation-inputs): three lines added for the new fields.
- `completed()` helper of the same file (used by tests of death-settled-once and solved-map-manual-run): moves the record with the game minute.
- New: "the document of version 3 is refused as version ...", "the record loads back whole from a map run that goes on, one that died and one that completed", "a record at the edges of what it admits loads".
- In `tests/sim/loop.test.mjs`, the list `MANUAL_ONLY` of the fields a `GameMapRun` adds to a `MapRun` gained the three keys, as the slice says.
- Outside the slice's list: `tests/sim/encounters.test.mjs`, `tests/sim/skills.test.mjs`, `tests/view/account-screen.test.mjs`, `tests/view/trip.test.mjs` (above).

## Tests: do they fail when the behaviour breaks?

Yes for the behaviour that matters: the executor reports 24 mutants of `saved-game.ts` and `run-record.ts` caught by hand, and the independent Stryker run below killed 27 of 29 mutants of `run-record.ts`. The two survivors are `before.current?.activity` and `activity?.kind` losing their `?.` (`run-record.ts:57`, `:59`): equivalent for every state the game makes, because after the first game minute `current` is null only while `activeCombat` holds (`run.ts:765-770`), and the guard is the "wait" fallback. Classification per `guidelines/testing.md`: equivalent, a defensive guard worth keeping. No assertion without a requirement behind it was found; Minor 3 names the one place that mirrors the product's rule.

## Own-work check of the author

The executor named "each game minute counts once, so the counts sum to `minute`, for every way a game state is made" as the weakest point, and checked it with the round-trip tests and the whole `node --test tests/sim/*.test.mjs`. That would catch an unmet requirement: the load refuses a state where the sum fails, and the check found a real case (a hand-made jump of the game minute in `completed()`), which the executor fixed. The same kind of jump in `tests/view/trip.test.mjs:318` was found by the mechanical check and fixed in `d7ac8a9`. My probe adds one independent check of the whole path (send -> advance -> save -> load, a 600-minute fight run, settled death, restart, each round-trip) without a refusal.

## Declined to judge

- `src/browser/sim/saved-game.ts` `count`/`integer` (not changed by the range): they admit `-0`, which `JSON.parse("-0")` can produce, for any count of the document, the new ones included (probe: `minutesByAction.patrol = -0` loads). Existing behaviour of the shared reader, not this task's change; a change would belong to its own task. Out of scope.

(The sentences of D-62, D-122, D-173, D-185, D-216, D-311, D-313 and D-362 about how the window looks, closes, takes focus, stands over the menu bar and holds its buttons describe code that slices 2-5 will write; I judged them against the task, not against code, and set no behaviour aside.)

## Checks run

All in a separate worktree of `d7ac8a9` under `.runs/review-slice-1` of the reviewed worktree (created with `git worktree add --detach`, `node_modules` linked by a junction, removed afterwards: the junction first, then `git worktree remove --force`; `node_modules` of the reviewed worktree intact; `git status --short` clean and HEAD unchanged at `d7ac8a9` afterwards).

- `node scripts/build.mjs` — exit 0.
- `node --test tests/sim/run-record.test.mjs` — exit 0 (15 passed).
- `node --test tests/sim/saved-game.test.mjs`, `loop`, `death`, `time`, `catch-up`, `encounters`, `skills`, `streak` (each `tests/sim/<name>.test.mjs`) — exit 0 for each.
- `node --test tests/view/trip.test.mjs tests/view/account-screen.test.mjs` — exit 0.
- `python -B scripts/test.py tests/invariants/test_minute_span_split.py` — exit 0 (9 tests); `test_map_run_repeatability.py` — exit 0 (3); `test_simulation_isolation.py` — exit 0 (5); `test_simulation_inputs.py` — exit 0 (2); `test_content_identifiers.py` — exit 0 (4); `test_streak_program_change.py` — exit 0 (5); `test_restart_seed.py` — exit 0 (2); `test_cross_part_imports.py` — exit 0 (10); `test_player_map_run_pace.py` — exit 0 (9); `tests/quality/test_mutation_test_selection.py` — exit 0; `tests/quality/test_node_test_selection.py` — exit 0.
- `node scripts/build.mjs --check` (typecheck) — exit 0.
- `node node_modules/eslint/bin/eslint.js --max-warnings 0 src/browser/sim tests/sim` — exit 0.
- `node node_modules/prettier/bin/prettier.cjs --check src/browser/sim tests/sim tests/view/trip.test.mjs tests/view/account-screen.test.mjs stryker.config.json` — exit 0.
- `node node_modules/@stryker-mutator/core/bin/stryker.js run --mutate "src/browser/sim/run-record.ts"` — exit 0: 29 mutants, 27 killed, 2 survived (equivalent, above), score 93.10.
- `python -B .the-way/elements/common/foundation_check.py`, in the reviewed worktree (reads only; the pin check `git -C .the-way rev-parse HEAD` equals the gitlink `e3825a82386a61930a86f8517fc0c5f422fc2833`) — exit 0, 0 errors.
- Manual: two scratch probes of the load (`probe.mjs`, `probe2.mjs`, in `a scratch file outside the repository`, outside the repository) that import the built `game.js` and `saved-game.js`, make a state with `createCharacter`, `send`, `advanceMinutes`, save it with `savedGame(withSaveTime(...))`, edit the JSON and call `loadSavedGame`: results in "Trust boundary" and Minor 1-2.
- Not run, by the handoff: the full gate (`npm test`), `tests/account-mail.test.mjs`. Not run, for want of need: the Stryker run over `saved-game.ts` (the changed lines are covered by the crafted-case table, and the executor's by-hand mutations of them all failed a test); `tests/deploy`, `tests/agent_workflow` and the rest of `tests/quality` and `tests/invariants` (no file of theirs changed).

## Reaches beyond the dispatch

- `src/browser/sim/loop.ts:215-330` (what: `advanceLoopRun`, `endLoopRun`; why: to confirm that earning loops step through `stepMinute` and build no `GameMapRun`, so they keep none of the record).
- `src/browser/sim/run.ts:100-175, 505-785` (what: `startActivity`, `minuteBeforePick`, `finishMinute`; why: to check what the activity is at the start of each minute, the combat minutes and the attack minute, and that `current` is null only with an attack going on).
- `src/browser/sim/program.ts:285-345` (what: the refusal "tylko w walce"; why: that a game-made state never holds a combat action as its activity, which the new load refusal and the cast in `minuteKind` rely on).
- `src/browser/sim/data/actions.ts:1-60` and `data/maps.ts` grep for `solving` (what: the `combat` effect on `ActionDef` and the solving conditions; why: the closed list of kinds and that every map's condition has a streak).
- `src/browser/sim/game.ts:255-326, 436-660, 690-851` (what: `startRun`, `send`, `restart`, `end`, `settleDeath`, `advanceMinutes`; why: where the record is bound, kept and rebound).
- `foundations/invariants.md` passages for `save-version`, `minute-span-split`, `map-run-repeatability`, `death-settled-once`, `catch-up-state`, `trip-transfer` (by line from the handoff), and `foundations/glossary.md` "streak", "manual map run", "completion" (why: to check the invariants' wording against the change).
- `task.md` lines 28-50 and 86-143 (the dispatch gave only some passages): To do 1-13, Questions 6-12 and Context (why: to judge D-362, D-132, D-53, D-173 and the other changed entries against rows 1-7 as the handoff asks).
- `foundations/decisions.md` D-207, D-208, D-213, D-214, D-71 (whole), D-132, D-216, D-339, D-348 at the current ranges (named by the handoff; read for the foundation judgement above).
- `the author's rules for scripts` (before writing the scratch probes, as the user's instructions require).

## Unread material:

- `.the-way/task-cycle/review/SKILL.md`: read whole. The files it names for other kinds of review (`whole_change.md`, `fix.md`) were not needed. `product-guidelines/template.md` not read: the range writes no guidelines. `project-level/technology/reserved_choices.md` not read: no language, framework, library, store, login or place to run is chosen (the range adds one file of pure functions and a version).
- Guidelines: `guidelines/coding.md`, `coding-simulation-module.md`, `coding-saved-game.md` read whole; `guidelines/testing.md` read whole (lines 1-372 and 372-464).
- Foundation entries named by the handoff: D-71, D-135, D-136, D-179, D-189, D-190, D-206, D-207, D-208, D-212, D-213, D-214, D-221, D-339, D-348, D-362 read whole at the current ranges. D-71 read whole: the first read cut its Verification and Origin, the second read of its range gave all lines.
- The changed decisions D-53, D-62, D-122, D-132, D-147, D-173, D-185, D-216, D-311, D-313: read as the diff of the range (`git diff 211a4ea..d7ac8a9 -- foundations/decisions.md`, with every added and removed line, cut at 2500 characters per line, so the longest lines of D-173's and D-311's *Rejected* and *Origin* were read truncated) and D-132's statement in the file; I did not open each of these entries whole in the file. D-311 and D-313 I read least closely: their sentences are about the screen of later slices.
- `foundations/part_map.md` simulation entry (30-60): not read separately; `foundation_check.py` passes and it checks that every tracked file belongs to a part.
- `foundations/invariants.md` entries `eslint-source-rules`, `prettier-source-format`, `simulation-isolation`, `simulation-inputs`, `map-run-repeatability`, `minute-span-split` (the last two read; the others were checked through their tests: lint, prettier, isolation, inputs all exit 0).
- The reports: `slice-1-report.md` and `foundation-report.md` read whole; `slice-1-handoff.md` read whole. `plan.md` read only for the slice list and the lines holding the slice 1 and slice 7 goals; `docs/task-cycles/koniec-przejscia/task.md` read at lines 28-50 and 86-143 and not the rest.
- Code: `saved-game.ts` read at lines 100-340 and in the diff, not the whole 1300-line file; `run.ts` read at the ranges named above, not whole; `loop.ts`, `program.ts` at the ranges named. `tests/sim/run-record.test.mjs` read whole; `tests/sim/saved-game.test.mjs` read as the diff, not whole.

## Searches not found or unclear:

- The handoff says the foundation writer's wording "D-132's title wording reads „the completion text of the map from its data”"; D-132's *title* (heading) is unchanged ("What does the screen show, and what can the player do, after a completion?"); the reworded text is in its statement. Read as the statement.
- The plan's slice text says `restart` "leaves it as it finds it" and also that `enteredWith` is "bound ... again at „Restart”"; unclear as written, settled above by the sum rule (the executor's choice 2).
- Whether the load should demand the data's order of `enteredWith`: the slice says "read as the lists `tripList` reads" and the type comment says "in the order of the data's items"; unclear, left as Minor 1.
- Whether a fresh `.the-way` was available in the review worktree: it was not (a submodule, not initialised there), so the foundation check ran in the reviewed worktree, which holds it at the pinned commit.
- A test of `save-version` for the `savedGame` writer side beyond the round-trip tests: none found as a separate case; the round-trip of `DOCUMENT` through `savedGame` is the one the existing tests rely on.
