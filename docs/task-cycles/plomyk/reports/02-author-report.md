# Author report — task `plomyk`, the whole change as the one author

**Status:** done with concerns — the concerns: the screenshot of the changed body row is unchecked (no route in the foundation, see *Checks*), and four *Rejected* fields hold ways whose source keeps no cost beside them (see *Foundation entries*).

## Commits

On `task/plomyk`, after the orchestrator's `1d25143`:

- `bf99953` feat: :sparkles: make lighting the spell Płomyk, paid with the mage's nature energy
- `c12faa3` docs: :memo: record Płomyk and the mage's nature energy in the foundation

## Files changed (`git diff --numstat 1d25143..HEAD`, added / removed)

| File | + | − |
|---|---:|---:|
| foundations/decisions.md | 135 | 31 |
| foundations/glossary.md | 7 | 0 |
| foundations/invariants.md | 10 | 0 |
| src/browser/sim/body.ts | 24 | 0 |
| src/browser/sim/data/actions.ts | 10 | 0 |
| src/browser/sim/data/balance.ts | 9 | 0 |
| src/browser/sim/data/conditions.ts | 9 | 0 |
| src/browser/sim/program.ts | 13 | 2 |
| src/browser/sim/programs.ts | 4 | 2 |
| src/browser/sim/run.ts | 41 | 7 |
| src/browser/sim/types.ts | 6 | 0 |
| src/browser/view/body-row.ts | 15 | 11 |
| src/browser/view/program-editor.ts | 1 | 0 |
| tests/invariants/test_program_closed_lists.py | 7 | 4 |
| tests/invariants/test_simulation_inputs.py | 3 | 2 |
| tests/sim/acceptance.test.mjs | 10 | 0 |
| tests/sim/body.test.mjs | 121 | 0 |
| tests/sim/campfire.test.mjs | 146 | 0 |
| tests/sim/conditions.test.mjs | 14 | 0 |
| tests/sim/data.test.mjs | 2 | 2 |
| tests/sim/discovery.test.mjs | 3 | 2 |
| tests/sim/encounters.test.mjs | 45 | 0 |
| tests/view/body-row.test.mjs | 34 | 12 |
| tests/view/program-editor.test.mjs | 8 | 0 |

No file outside the globs the part map already gives `simulation`, `browser-view` and `product-foundation`; the part map is unchanged.

## What the code does

- `MapRun.natureEnergy` (types.ts) holds the mage's nature energy; `newMapRun` starts it at the cap (`startingNatureEnergy`), so a send and a „Restart” (through `startRun` → `newMapRun`) start full (To do 1).
- Numbers in data (D-18): `BALANCE.natureEnergy` in balance.ts — `max: 100`, `regain: 0.5`, `wellFedFrom: 60`; the price on each action, `natureEnergy: 10` on `lightCampfire` and `lightItem` in actions.ts (new optional field of `ActionDef`).
- `actionFeasible` (program.ts) refuses any action whose data price exceeds `run.natureEnergy`, so the program passes over the rule as over any infeasible action (To do 3).
- `minuteBeforePick` (run.ts) computes `regainedNatureEnergy(energy, satiety after the fall)` right after `bodyMinute`, before the ending action lands, also in the minute of death; combat minutes skip it, so energy stands (To do 4, Q10, Q3).
- `finishUse` (run.ts) wraps the old landing (`landUse`): the price is taken only where the effect takes hold and the energy reaches the price, together with the sticks; an interrupted lighting never lands, so it pays nothing (To do 2).
- Condition `natureEnergyBelow` in conditions.ts: label „Energia natury poniżej”, 0–100 step 1, default 30, `revealedBy: { kind: "lit" }` — a change of data alone for the reveal (D-128); `conditionHolds`, `checkCondition` (programs.ts) and the editor's `newCondition` gain the kind (To do 5).
- `bodyValues(body, natureEnergy)` (body-row.ts) adds `{ text: "Energia natury {floor}", danger: false }` as the fourth value; the row makes four spans (To do 6).

## Outputs the handoff asks for

### To do 7 — the program of `tests/sim/acceptance.test.mjs`

The program did not change. With the price in force it still passes 480 game minutes alive on the named seed (`ALIVE_REAL_MS = 1760000800000`, seed 1946377216). An exploratory run of that test's setup, minute by minute: it finishes three „Zapal — ognisko”, in minutes 190, 300 and 435, and the energy reads 90, 80 and 70 after them; from about minute 66 the satiety never reaches 60 again (the program eats below 35 and a berry gives 25), so no energy comes back, yet 70 is left at minute 480. No rule was passed over for want of energy. The test gained one assertion that the price was in effect (`state.run.natureEnergy < 100` at minute 480) and a header comment naming To do 7; its survival assertions are unchanged.

### To do 8 — the 20-seed measurement on Las — głębiej

Report: `C:\Storage\repos\loop2-wt\plomyk\.runs\task-cycles\plomyk\reports\measurement-20-seeds.md`, script beside it: `C:\Storage\repos\loop2-wt\plomyk\.runs\task-cycles\plomyk\reports\measurement.mjs` (also `measurement-20-seeds.json`). Command: `node .runs/task-cycles/plomyk/reports/measurement.mjs` after `npm run build`, exit 0.

| Seed | Before: result, minute | After: result, minute | Cause | Energy at that minute | Passed over „Zapal” for energy |
|---:|---|---|---|---:|---:|
| 1 | died, 247 | died, 247 | cold | 90 | 0 |
| 2 | died, 258 | died, 258 | combat | 100 | 0 |
| 3 | died, 256 | died, 256 | cold | 100 | 0 |
| 4 | died, 202 | died, 202 | cold | 100 | 0 |
| 5 | died, 253 | died, 253 | combat | 100 | 0 |
| 6 | died, 306 | died, 306 | cold | 100 | 0 |
| 7 | died, 276 | died, 276 | combat | 100 | 0 |
| 8 | died, 223 | died, 223 | combat | 100 | 0 |
| 9 | died, 256 | died, 256 | cold | 100 | 0 |
| 10 | died, 252 | died, 252 | cold | 100 | 0 |
| 11 | died, 202 | died, 202 | cold | 90 | 0 |
| 12 | died, 243 | died, 243 | combat | 90 | 0 |
| 13 | died, 272 | died, 272 | cold | 100 | 0 |
| 14 | died, 247 | died, 247 | cold | 90 | 0 |
| 15 | died, 229 | died, 229 | combat | 100 | 0 |
| 16 | died, 247 | died, 247 | cold | 90 | 0 |
| 17 | died, 722 | died, 722 | combat | 40 | 0 |
| 18 | died, 253 | died, 253 | combat | 100 | 0 |
| 19 | died, 202 | died, 202 | cold | 100 | 0 |
| 20 | died, 249 | died, 249 | combat | 100 | 0 |

Completed 0/20 before and after; every seed dies in the same minute as before. The program lights at most six times (seed 17) and never runs short of energy, so the price did not speed up any death. The report file adds the lowest energy, the lightings and the beaten attacks per seed.

Adaptation of the task-8 script: since task 12 a map run carries the copy of its program (D-164), which the older script did not give `advanceMinutes` (it threw `Cannot read properties of undefined (reading 'program')`); the script now sets the copy of program 1, holding the same program. The "before" column comes from the task-8 report (lines 232–251 at `1933a3f`), not from a rerun; the "after" minutes equal it on all 20 seeds, which also shows the adaptation changed nothing else. The task-8 report gives no cause of death, so the cause is given for "after" alone.

How "passed over" is counted: at each pick (an `activityStarted` event), every „Zapal” rule standing before the rule picked, in a group whose condition holds, whose own condition holds, and which is feasible with unlimited energy but not with the run's — read from the run after the minute, which the pick leaves as it stands. Control of the counter (own-work check below): with `START_ENERGY=0` the same script counts 4 such picks on seed 17.

## Foundation entries written (foundation step)

Each through its element's pinned skill steps (`record-decision`, `record-invariant`, `record-glossary-term`); `python -B .the-way/elements/common/foundation_check.py` → `0 errors`, exit 0, after the last entry.

| Entry | Meaning in Polish |
|---|---|
| D-63 (changed) „How does a character light a campfire or a stick?” | Mag zapala ognisko i patyk czarem Płomyk — zwykłymi akcjami postaci „Zapal — ognisko” i „Zapal — patyk”, wykonalnymi poza walką — płaconym patykami i energią natury, które schodzą razem, gdy zapalenie się dokona; zapalenie przerwane napaścią nie zabiera ani jednego, ani drugiego. |
| D-71 (changed) „In what order does a game minute of a map run take effect?” | W kolejności minuty gry poza walką energia natury dobrze najedzonego maga wraca zaraz po spadku sytości, do pułapu, przed skutkiem kończącej się akcji; w minutach walki ciało i energia natury stoją. |
| D-121 (changed) „What brings each action, item and condition of Las into the Understanding?” | Pierwsze dokonane „Zapal”, ogniska albo patyka, wnosi do Zrozumienia „Zasil — ognisko” i warunek „Energia natury poniżej”. |
| D-141 (changed) „When do combat turns take effect?” | W minutach M+1…M+5 starcia stoją potrzeby, samoistny powrót zdrowia i energia natury. |
| D-175 (new, the projected entry, binding sentences, Rationale and Rejected as approved) „What does a mage pay for spells with?” | Każdy czar kosztuje maga energię natury, która wraca sama tylko wtedy, gdy mag jest dobrze najedzony; pusta energia zamyka czary i nie odbiera zdrowia; postać bez energii natury nie ma czarów i nic za nie nie płaci. |
| D-176 (new) „With how much nature energy does a mage start a map run?” | Każde przejście mapy, nowe i zaczęte przez „Restart”, mag zaczyna z energią natury na pułapie. |
| D-177 (new) „What does too little nature energy do to Płomyk?” | Mag rzuca Płomyk, gdy jego energia natury sięga ceny czaru; przy mniejszej program przechodzi nad regułą z „Zapal” do następnej, jak nad każdą niewykonalną akcją, a reguła zostaje w programie. |
| D-178 (new) „What does the body row show of a mage's nature energy?” | Wiersz ciała kończy się „Energia natury {n}”, liczbą uciętą do całości, od minuty zero, w roli `text` przy każdej wartości, także przy zerze. |
| glossary „well fed” (new) | Mag jest dobrze najedzony w minucie gry, w której jego sytość po spadku w tej minucie sięga progu z danych. |
| invariant `nature-energy-range` (new; Method `test`, Derives from D-63 · D-71 · D-177, Part simulation) | W każdej minucie przejścia energia natury maga mieści się między 0 a pułapem z danych, oba włącznie. |

Rows of *Settlements to record* and the entry carrying each:

| Row | Entry |
|---|---|
| 1 | D-63 |
| 2 | D-176 |
| 3 | D-177 |
| 4 | glossary „well fed” |
| 5 | D-71 |
| 6 | D-141, and D-71's sentence on combat minutes |
| 7 | D-121 (one line of discoveries: D-121 with D-122, which already gives one line per game minute; D-121's *Verification* names it) |
| 8 | D-178 |
| 9 | `nature-energy-range` |

The projected entry „What does a mage pay for spells with?” is D-175, written whole. Its *Scope*, `TODO` in the definition, reads `simulation` (the cost, the regain, feasibility and health all live there). Its approved *Verification* (examples only) is kept as it is, so the invariant does not derive from D-175. The definition's fields *Change*, *Review when* and *Approved by* are not in the log's template and are left out; *Origin* names the concept's D52 and the full approved entry, as D-118 does.

Wording (Q8): the new and changed sentences use no excluding word; the approved D-175 keeps its „only” and the other sentences do not repeat it. „up to its cap” in D-71 comes from To do 4 („nie rośnie ponad pułap”); it gives the invariant's upper bound a decision to derive from.

Concerns in *Rejected* (template, rows of *Settlements to record*): D-176 and D-177 list Q2's way B („inne liczby albo inne odpowiedzi podane punkt po punkcie”), D-178 lists Q5's way B, D-141 lists Q3's way B and D-121 lists Q6's way B, each with no cost, because the source keeps none beside those ways; no cost was derived. For D-63 the reasons beside the ways come from Q1's answer („gałąź „Czysty płomień” … zachowuje sens”), Q1's source quoting loop (energy taken „w chwili, w której czar się dokonał, nie przy rozpoczęciu”) and Q7's source (the concept and loop name the verb „Zapal”). For D-71 the cost of Q10's way B is the 90.5 the source gives for it.

Search of the whole foundation (step 2), what it found: D-123, D-143 and D-147 name changed decisions in *Relations* and are unaffected; `minute-span-split` derives from D-71 and its sentence holds (its test passes); D-128's example („Zasil — ognisko” revealed by the first finished „Zapal” through data) still holds; D-60 and D-140 say the needs stand still in combat, and energy, which is no need, is covered by D-141. No collision. No word of the-way's glossary is used bare in a new sentence („the body's step”, not „step”; „action of the character”).

## Choices with the way rejected and the cost if wrong

1. Energy as its own field of the map run, `MapRun.natureEnergy`, not a fourth field of `Body`. Rejected: `Body.natureEnergy` — every hand-made body in tests and views (three fields) would lose the energy, and the task keeps the body as temperature, satiety and health with energy as „no third need”. Cost if wrong: moving one field; no save format holds it (task 16 not merged).
2. Energy numbers in `BALANCE.natureEnergy` (balance.ts), next to `BALANCE.body`. Rejected: archetype data, where loop keeps them — the run does not carry its archetype today and the game has one archetype. Cost if wrong: when an archetype without energy comes, the numbers move to archetype data, a change of data (D-18).
3. Price on each action (`natureEnergy: 10` on both „Zapal”), not on the character skill „Rzucanie czaru Płomyk”. The task gives the price per lighting, and the feasibility check reads any priced action, so another spell is data alone. Cost if wrong: small move in data.
4. Energy regains also in the game minute of death (it is part of the body's step, which precedes death in D-71). Unobservable except in the frozen state after a death of cold while well fed.
5. A lighting that takes no hold (no sticks left, campfire already burning) pays no energy, as it pays no sticks — „patyki i energia schodzą razem”.
6. The condition's unit is „pkt”, following the health conditions; the task does not settle a unit. It shows in the discovery line as „Energia natury poniżej … pkt”. Cost if wrong: one data field.
7. The condition stands after „Sytość poniżej” in the data, so the editor lists it there.
8. Decision numbers D-175–D-178, the projected entry first so the others can derive from it.

## Checks run (command → exit code)

Tests written first and seen failing:

- `node --test tests/view/body-row.test.mjs` before the view code → 1 (3 failing for the expected reason: the row lacked „Energia natury …”); after → 0 (10 pass).
- The simulation code was written before its tests. Each test was seen failing against the behaviour broken for a moment: source backed up, mutated, `npm run build`, run, restored (`cmp` showed every file restored):
  - M1 feasibility check removed → `node --test tests/sim/campfire.test.mjs tests/sim/body.test.mjs tests/sim/encounters.test.mjs tests/sim/acceptance.test.mjs tests/sim/conditions.test.mjs` exit 1 (the feasibility test and the pass-over test fail).
  - M2 cap removed → exit 1 (the cap test, the Q10 test, the acceptance test, and the invariant test `nature energy stays between 0 and its cap of 100 at every game minute`).
  - M3 both floor guards removed → exit 1 (the invariant test, feasibility, pass-over).
  - M4 paying where the effect takes no hold → exit 1 (`a lighting that takes no hold takes no nature energy`).
  - M5 well-fed read before satiety falls → exit 1 (the regain test).
  - M6 no payment → exit 1 (payment, Q10, "taken when it finishes", acceptance, and the invariant test through its control).
  - M7 regain after the ending action → `node --test tests/sim/campfire.test.mjs tests/sim/body.test.mjs tests/sim/encounters.test.mjs` exit 1 (the Q10 test).
  - M8 regain in combat minutes → same command, exit 1 (`nature energy stands through the five combat minutes and comes back after them`).
- Invariant `nature-energy-range`: failing under M2 and M3 (above); passing with `node --test tests/sim/body.test.mjs` → 0.

Focused checks on the final commit `c12faa3`:

- `npm run build` → 0; `npm run typecheck` → 0
- `node --test tests/sim/*.test.mjs tests/view/*.test.mjs` → 0 (654 tests, 654 pass)
- `python -B .the-way/elements/common/foundation_check.py` → 0 (`0 errors`)
- ESLint on the changed TS/MJS files, `node node_modules/eslint/bin/eslint.js --max-warnings 0 --suppressions-location <empty file> <files>` → 0
- Prettier `--no-config --no-editorconfig --ignore-path .gitignore --check <files>` → 0
- Ruff `check --config ruff.toml --ignore-noqa --no-fix --no-cache` on the two changed Python tests → 0
- `python -B .the-way/gate/run_tests.py tests/invariants` (on the code before the foundation commit; that commit touched only `foundations/` — the citing comment is in `bf99953`) → 0, 204 tests, 2 skipped (not identified; the report does not name them).
- Earlier, `python -B -m unittest test_program_closed_lists test_simulation_inputs test_minute_span_split test_map_run_repeatability test_simulation_randomness` in `tests/invariants` → 1: `test_group_conditions_accept_listed_values_and_refuse_unlisted_kinds`, because the group added to the fixture got id 10 with `nextGroupId: 10` („an identity is duplicated or reaches its next counter”). Fixed the fixture's counter to 11; `python -B -m unittest test_program_closed_lists` → 0. A fault of the test's data, not flaky.
- The 20-seed measurement → 0 (above).

Not run: `npm test` (the cycle's gate, the orchestrator's, as the handoff and method give); `tests/quality`, `tests/deploy`, `tests/agent_workflow` and the Node tests under `tests/*.test.mjs` (no file of theirs changed; the quality rules were run on the changed files directly); StrykerJS (the reviewer's tool for `simulation`, D-94, so the mental mutation pass is skipped there; the M1–M8 trials were for seeing tests fail). Screenshot of the running game: unchecked — the foundation settles no route to a screenshot of the running product (D-75 and D-88 give a manual check in a real browser, for a human). States checked in code instead: the fourth `body-value` span is never given `danger`, so it reads the inherited `text` (`styles.css:464` colours only `.body-value.danger`), and `.body-row` wraps (`flex-wrap: wrap`) for the longer row.

## Own-work check

- Requirement most likely unmet: To do 8's count of passes over „Zapal” for want of energy — 0 on every seed, which a counting fault would also give.
- Check: the same script with every run starting at 0 energy (`START_ENERGY=0 node .runs/task-cycles/plomyk/reports/measurement.mjs`, exit 0, no file written).
- Result: seed 17 counts 4 such picks and dies in minute 484 instead of 722; on the other seeds the energy comes back to 33 in the first well-fed minutes and they light as before. The counter counts; the 0s of the measurement are the program's, not the counter's.

## Tests changed

Invariant tests altered, to be named in the request (WAY-03):

- `tests/invariants/test_program_closed_lists.py` (`program-closed-lists`): `CONDITION_KINDS` gains `natureEnergyBelow`, which its tripwire requires for a kind added to the data. `VALID` and the group fixture gain a valid rule and group of the kind; `nextGroupId` 10 → 11 for the added group; docstring „nine” → „ten” condition kinds.
- `tests/invariants/test_simulation_inputs.py` (`simulation-inputs`): the input pool gains `natureEnergyBelow` conditions (0, 30, 100) and the kind.
- New citing test: `tests/sim/body.test.mjs`, „nature energy stays between 0 and its cap of 100 at every game minute” (`// invariant: nature-energy-range`).

Other existing tests whose expectations changed, each from the task's requirement: `tests/sim/data.test.mjs` and `tests/sim/discovery.test.mjs` (the row of `lit` reveals `natureEnergyBelow`, To do 5); `tests/view/program-editor.test.mjs` (the list of condition kinds, default 30 and range 0–100 of the new kind, To do 5); `tests/view/body-row.test.mjs` (the row's fourth value, To do 6 and its example). The task-4 example string „Temperatura 36,8 °C · Sytość 82 % · Zdrowie 100” became To do 6's „… 36,9 °C … · Energia natury 90”. New tests in `campfire.test.mjs`, `body.test.mjs`, `encounters.test.mjs`, `conditions.test.mjs`; `acceptance.test.mjs` gained one assertion.

## Reaches beyond the dispatch

- D-39 and D-40 (`foundations/decisions.md`), whole: D-178's rationale relies on what `danger` and `text` mean.
- D-72 and D-128, found by the step-2 search for „Zapal”/„lighting”, read for collisions.
- The-way's examples the skills require: WAY-03 (decisions), `instruction-file-imports` and `script-imports` (invariants) at the pinned commit.
- loop at `cdc7c0d`, `src/sim/data/conditions.ts` and `src/sim/data/activities.ts`: to see whether loop gives the condition a unit (it does not).
- `stryker.config.json`: to decide where the new tests go. They went into existing files, because a new `tests/sim` file would need an entry in Stryker's list, which `tests/quality/test_mutation_test_selection.py` checks.
- `src/browser/styles.css` body-row rules, for the UI check.

## Searches not found or unclear

- A route to a screenshot of the running product in the foundation: not found (see *Checks*).
- A cost beside the rejected ways of Q2, Q3, Q5 and Q6: the task keeps none; *Rejected* lists those ways with no cost.
- The unit of „Energia natury poniżej”: not in the task or the foundation; „pkt” chosen (choice 6).
- The cause of death in the task-8 report: not given; "before" has result and minute alone.
- The two tests skipped in the `tests/invariants` run: not identified.
- The task-8 measurement script as written no longer runs on the current simulation (no copy, D-164): adapted, as above.
