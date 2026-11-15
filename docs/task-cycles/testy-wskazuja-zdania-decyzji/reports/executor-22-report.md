# Report — executor of slice 22 (campfire and the mage's nature energy)

**Status:** done with concerns

## Commits and files

Base `3be041320c4081e38cd5df838c8c74052284fc47`; branch `task/testy-wskazuja-zdania-decyzji`; author address `mariusznn@gmail.com`, the same as the earlier slices' commits.

- `a0221e6b` test: :white_check_mark: mark the tests that hold the sentences of the decisions on lighting with Płomyk, a burnt-out campfire, feeding, where a campfire is crafted and a stick lit, the price of spells, the nature energy at the start of a map run, too little nature energy, its coming back and the program that keeps the mage alive on Las with lines decision:
- `03063270` docs: :memo: name the tests of D-63, D-68, D-69, D-72, D-175, D-176, D-177, D-377 and D-378, drop the pair of D-68, D-69, D-72, D-377 and D-378, which their tests and invariants hold whole, and rewrite the pair of D-63, D-175, D-176 and D-177 only for the part no invariant and no test holds

| File | Added | Removed |
|---|---|---|
| `foundations/decisions.md` | 53 | 35 |
| `tests/sim/campfire.test.mjs` | 26 | 0 |
| `tests/sim/body.test.mjs` | 4 | 0 |
| `tests/sim/acceptance.test.mjs` | 4 | 0 |
| `tests/sim/encounters.test.mjs` | 2 | 0 |
| `tests/sim/skills.test.mjs` | 3 | 0 |
| `tests/sim/data.test.mjs` | 1 | 0 |
| `tests/view/tile-list.test.mjs` | 3 | 0 |

Files beyond the slice's *Change* (item 5 of "Work of every slice"), one line each:

- `tests/sim/skills.test.mjs` — the case at line 413 holds D-63 (third paragraph), D-175 and D-177; simulation part, no further guidelines.
- `tests/sim/data.test.mjs` — the case at line 405 holds D-63 („with the spell Płomyk”: the skill „Rzucanie czaru Płomyk” grows the two lightings); simulation part.
- `tests/view/tile-list.test.mjs` — the cases at lines 164 and 177 hold D-72 (and 164 also D-68) by running a real map run; part `browser-view`, `guidelines/styleguide-browser-view.md` read whole before the edit.

No test's code, name or assertion changed; no mention of a decision number was removed; every line `decision:` stands as the first line of its test body, after the lines already there, as the earlier slices put them (the plan's "directly above it" read as the earlier slices read it).

## Checks

| Command | Exit |
|---|---|
| `python -B .the-way/elements/common/foundation_check.py` | 0 — `0 errors`; it lists as held by nothing D-181, D-182, D-184, D-185, D-186, D-188, D-215, D-216, D-217, D-218, D-220 and none of D-63, D-68, D-69, D-72, D-175, D-176, D-177, D-377, D-378 |
| `git diff -U0 3be041320c4081e38cd5df838c8c74052284fc47 -- foundations/decisions.md`, read; and the same output filtered for changed lines that are neither a `- **Verification:**` line nor its indented continuation | 0 — nine hunks, each beginning at the *Verification* line of D-63, D-68, D-69, D-72, D-175, D-176, D-177, D-377, D-378; the filter left only the `---`/`+++` header lines |
| `node node_modules/prettier/bin/prettier.cjs --check --no-config --no-editorconfig --ignore-path .gitignore tests/sim/campfire.test.mjs tests/sim/body.test.mjs tests/sim/acceptance.test.mjs tests/sim/encounters.test.mjs tests/sim/skills.test.mjs tests/sim/data.test.mjs tests/view/tile-list.test.mjs` | 0 — "All matched files use Prettier code style!" |
| `npm test -- tests/sim/campfire.test.mjs` | 0 — 35 tests, 35 pass |
| `npm test -- tests/sim/body.test.mjs` | 0 — 36 tests, 36 pass |
| `npm test -- tests/sim/acceptance.test.mjs` | 0 — 5 tests, 5 pass |
| `npm test -- tests/sim/encounters.test.mjs` | 0 — 29 tests, 29 pass |
| `npm test -- tests/sim/skills.test.mjs` | 0 — 19 tests, 19 pass |
| `npm test -- tests/sim/data.test.mjs` | 0 — 36 tests, 36 pass |
| `npm test -- tests/view/tile-list.test.mjs` | 0 — 15 tests, 15 pass |

The seven test runs ran one after another in one background command and all finished before this report. Not run: the full gate `npm test` without a file — the cycle's run, not the slice's. `test_ruff_source_rules` and `test_shellcheck_source_rules` were not run; the handoff gives them as failing at the base. No test was written, so there is no failing run to record.

## Own-work check

- The requirement most likely missed: "every test that holds one of its binding sentences carries a line `decision:`", either a test missed or a line at a test that does not hold the sentence.
- The check: a script mapped each added line `decision:` of D-63, D-68, D-69, D-72, D-175, D-176, D-177, D-377 and D-378 to its test case (43 lines, table below). I compared it with the judgments of every case touching nature energy, the lighting, crafting and feeding actions or a campfire with no minutes left, found by searching all of `tests/` for `natureEnergy`, `nature energy`, `craftCampfire`, `lightCampfire`, `lightItem`, `feedCampfire`, `cleanFlame`, `Czysty płomień`, `Płomyk`, `revealed: false` / `not revealed` and the decision numbers.
- Result: the 43 lines match the judgments. One line I added was wrong, and I removed it before committing: D-177 at the invariant test `tests/sim/body.test.mjs:399`. Its control `pickedAtZero` counts any `activityStarted` event, and `src/browser/sim/run.ts:108-173` sends that event for a wait too, so a program that stopped picking at zero energy would still pass. The test does not hold the pass-over.

## Rows per decision (item 6)

### D-63 — How does a character light a campfire or a stick?

- Sentence 1 („A mage lights a campfire and a stick with the spell Płomyk: … whose price is the sticks they use and nature energy.”) — held in part:
  - the names of the actions: `tests/sim/campfire.test.mjs:150` "the six actions are on the closed list with their labels and minutes";
  - the actions as the spell Płomyk: `tests/sim/data.test.mjs:405` "the character skills grow the listed pairs of verb and target, and the walks stand in none";
  - the price in sticks and nature energy: `tests/sim/campfire.test.mjs:649` "a finished lighting takes its sticks and 10 nature energy together, a campfire and a stick alike" and `tests/sim/campfire.test.mjs:738` "the price of an action names the pieces it uses up and the nature energy it takes, nothing for what takes none".
- Sentence 2 („The sticks and the nature energy leave together when the lighting finishes, and a lighting an attack interrupts takes neither.”) — held in whole by `tests/sim/campfire.test.mjs:649` (above), `tests/sim/campfire.test.mjs:676` "the energy of a lighting is taken when it finishes, not while it goes on", `tests/sim/campfire.test.mjs:705` "a lighting that takes no hold takes no nature energy", `tests/sim/campfire.test.mjs:776` "a finished action takes from the backpack and from the nature energy exactly its price, with and without „Czysty płomień”" and `tests/sim/encounters.test.mjs:240` "a lighting interrupted by an attack takes neither its sticks nor its nature energy".
- Sentence 3 („With the bought branch „Czysty płomień”, „Zapal — ognisko” requires and consumes no sticks and costs the nature energy of ordinary lighting.”) — held in whole by `tests/sim/skills.test.mjs:413` "clean flame needs no stick but still costs ten energy; item lighting still needs its piece", `tests/sim/campfire.test.mjs:738` and `tests/sim/campfire.test.mjs:776`.
- Invariants: nature-energy-range holds only that the energy stays between 0 and the cap; no sentence in words.
- Held by nothing: "ordinary actions of the character carried out outside combat" — no test shows that a lighting is never the action of a combat turn.
- *Verification:* pair rewritten.

### D-68 — What becomes of a campfire that burns out?

- The one sentence — held in whole:
  - "stays on its tile, extinguished": `tests/sim/campfire.test.mjs:335` "a campfire lit in minute m warms from minute m + 1 for 60 minutes and uses 2 sticks", `tests/sim/campfire.test.mjs:411` "a feeding during which the campfire burns out makes it burn 20 minutes again", `tests/sim/campfire.test.mjs:828` "a campfire gives its event in the game minute its last minute of burning passes, on its tile" and `tests/view/tile-list.test.mjs:164` "a tile's row gives its campfire's state: burning with the minutes left, or extinguished";
  - "can be lit again": `tests/sim/campfire.test.mjs:203` "„Zapal — ognisko” is feasible at a campfire here that is not burning, with 2 sticks" — see Concerns 1.
- Invariants: none. Held by nothing: nothing.
- *Verification:* pair removed.

### D-69 — How much does feeding add to a burning campfire?

- The one sentence — held in whole by `tests/sim/campfire.test.mjs:259` "„Zasil — ognisko” is feasible at a burning campfire here, with a piece of fuel" (only at a burning campfire), `tests/sim/campfire.test.mjs:398` "feeding a burning campfire adds 20 minutes, without a cap, and uses one stick" (150 → 169 and 1000 → 1019, at the end, no ceiling), `tests/sim/campfire.test.mjs:353` "lighting and feeding land on the campfire of the character's tile alone" (10 → 29) and `tests/sim/campfire.test.mjs:411` "a feeding during which the campfire burns out makes it burn 20 minutes again" (zero included, added at the end and not at the start, burns again).
- Invariants: none. Held by nothing: nothing.
- *Verification:* pair removed.

### D-72 — Where does a character craft a campfire and light a stick?

- The one sentence — held in whole:
  - the feasibility on a revealed tile and not on one not yet revealed: `tests/sim/campfire.test.mjs:171` "„Wytwórz — ognisko” is feasible on a revealed tile without a campfire, with 6 sticks" and `tests/sim/campfire.test.mjs:237` "„Zapal — patyk” is feasible on a revealed tile with a stick, and nowhere else";
  - the program passing over the rules that craft a campfire and light a stick on the entrance not yet revealed, then carrying them out once „Eksploruj” has revealed it: `tests/view/tile-list.test.mjs:164` (above) and `tests/view/tile-list.test.mjs:177` "a burning stick stands in its tile's row after the campfire, and only while it burns". Both run a real map run of the program craft, light a campfire, light a stick, explore, with 9 sticks. The program does not pass over a rule that is not feasible: the timeline these tests expect (row of (1, 1) with no fire at minute 30, „zostało 42 min” at 63, the stick lit at 45–50) would shift, and at minute 30 the tile would not yet be revealed.
- Invariants: none. Held by nothing: nothing.
- *Verification:* pair removed.

### D-175 — What does a mage pay for spells with?

- Sentence 1 („Each spell costs the mage nature energy, which comes back by itself only while the mage is well fed; empty nature energy closes the spells and takes no health.”) — held in whole:
  - the cost: `tests/sim/campfire.test.mjs:649`, `tests/sim/campfire.test.mjs:738` and `tests/sim/skills.test.mjs:413`;
  - coming back only while well fed: `tests/sim/body.test.mjs:366` "nature energy comes back by 0.5 in a game minute whose satiety after its fall is 60 or above";
  - empty energy closing the spells: `tests/sim/campfire.test.mjs:590` "Płomyk can be cast with nature energy reaching its price of 10, and not with less";
  - taking no health: `tests/sim/campfire.test.mjs:723` "empty nature energy takes no health".
- Sentence 2 („A character without nature energy has no spells and pays nothing for them.”) — held by nothing. The game has one archetype, `elementalMage` (`src/browser/sim/data/archetypes.ts`), and every map run holds nature energy.
- Invariants: none.
- *Verification:* pair rewritten (it spoke of sentence 1).

### D-176 — With how much nature energy does a mage start a map run?

- The one sentence — held in part by `tests/sim/body.test.mjs:356` "every map run starts with full nature energy, 100: a send, a restart and a send after „Zakończ”" (a send, „Restart” after the energy was spent, a send after „Zakończ”).
- Invariants: none.
- Held by nothing: the map runs of an earning loop, which are map runs too (`src/browser/sim/loop.ts:79` starts them with `newMapRun`). No test in `tests/sim/loop.test.mjs` or elsewhere reads their nature energy.
- *Verification:* pair rewritten.

### D-177 — What does too little nature energy do to Płomyk?

- The one sentence — held in part:
  - feasibility at energy equal to the price and not below it, for both lightings and with „Czysty płomień”: `tests/sim/campfire.test.mjs:590` and `tests/sim/skills.test.mjs:413`;
  - the program passing over a rule „Zapal — patyk” with 5 energy and picking the next one, and picking it with 10: `tests/sim/campfire.test.mjs:621` "with too little nature energy the program passes over a „Zapal” rule to the next one".
- Invariants: nature-energy-range holds the range only.
- Held by nothing: the pass-over of a rule „Zapal — ognisko” run by a program, and "the rule stays in the program". No test reads the program after a pass-over for want of energy, or shows the rule acting again once the energy has come back.
- *Verification:* pair rewritten.

### D-377 — How fast does a mage's nature energy come back?

- The one sentence — held in whole by `tests/sim/body.test.mjs:366` (60.6 → 60 gives 0.5, 60.5 → 59.9 nothing, starving nothing), `tests/sim/body.test.mjs:385` "nature energy does not come back above its cap of 100", `tests/sim/campfire.test.mjs:689` "a mage with full nature energy who finishes a lighting has 90 after that minute" (50 → 40.5 and 100 → 90: the 0.5, up to the cap) and `tests/sim/encounters.test.mjs:221` "nature energy stands through the five combat minutes and comes back after them" (outside combat, 50 → 50.5 after it).
- Invariants: nature-energy-range holds the bounds 0 and the cap.
- *Verification:* pair removed; `invariants: nature-energy-range.` kept.

### D-378 — Can a program of the closed lists keep the mage alive on Las?

- The one sentence — held in whole:
  - Las and the seed the test names: `tests/sim/acceptance.test.mjs:108` "the map is Las and the send takes the seed named here";
  - the program built of the closed lists: `tests/sim/acceptance.test.mjs:119` "the program holds every kind of condition and action of the closed list";
  - 480 game minutes alive, lighting, feeding and eating, with nature energy spent on its lightings: `tests/sim/acceptance.test.mjs:150` "on Las the program passes 480 game minutes alive on the named seed";
  - the empty program dying there: `tests/sim/acceptance.test.mjs:175` "on the same seed the empty program dies in game minute 243, of cold".
  - "as well as sticks": see Concerns 2.
- Invariants: none. Held by nothing: nothing.
- *Verification:* pair removed.

## Pairs added or rewritten, for the human to accept at the merge

D-63:

```
- **Verification:** invariants: nature-energy-range. tests: „Zapal — ognisko” and „Zapal — patyk”
  as the actions of the spell Płomyk, each priced at its sticks and 10 nature energy; the sticks and
  the nature energy leaving together when the lighting finishes, neither while it goes on, nor
  where the lighting takes no hold or an attack interrupts it; with „Czysty płomień”,
  „Zapal — ognisko” feasible with no sticks, consuming none and costing the nature energy of
  ordinary lighting. For the lightings being ordinary actions carried out outside combat, an agent
  compares a change with the part no invariant and no test holds:
  - complies: „Zapal — ognisko” and „Zapal — patyk” started by a program rule outside combat, as
    any ordinary action of the character, and never as the action of a combat turn;
  - violates: „Zapal — patyk” carried out as a combat action.
```

D-175:

```
- **Verification:** tests: each lighting costing the mage 10 nature energy, with „Czysty płomień”
  too; the energy coming back only in a game minute whose satiety after its fall reaches 60; empty
  nature energy leaving no lighting feasible and taking no health. For a character without nature
  energy, an agent compares a change with the part no test holds:
  - complies: an archetype added to the data with no nature energy, whose characters carry out no
    „Zapal — ognisko” and no „Zapal — patyk” and pay nothing for them
  - violates: a character without nature energy carrying out „Zapal — patyk”; a lighting of such a
    character paid with satiety or health in place of the energy
```

D-176:

```
- **Verification:** tests: a map run sent, one started by „Restart” after nature energy was spent,
  and one sent after „Zakończ”, each starting with nature energy at the cap of 100. For the map
  runs of an earning loop, an agent compares a change with the part no test holds:
  - complies: each map run of an earning loop starting with nature energy 100, whatever the map run
    before it ended with
  - violates: a map run of an earning loop starting with the nature energy the loop's previous map
    run ended with
```

D-177:

```
- **Verification:** invariants: nature-energy-range. tests: „Zapal — ognisko”, „Zapal — patyk” and
  „Zapal — ognisko” with „Czysty płomień” feasible with nature energy equal to the price of 10 and
  not with less; a program passing over its rule „Zapal — patyk” with 5 nature energy to pick the
  next rule, and picking it with 10. For a program rule of „Zapal — ognisko” passed over and for
  the rule staying in the program, an agent compares a change with the part no invariant and no
  test holds:
  - complies: a program rule „Zapal — ognisko” passed over with 5 nature energy and the next
    program rule carried out, the rule still standing in the program and carried out once the
    energy has come back to 10
  - violates: a program rule of Płomyk taken out of the program, or switched off, for want of
    nature energy
```

Pairs removed: D-68, D-69, D-72, D-377, D-378. Each now carries only `tests:`, and D-377 also `invariants:`.

## Concerns

1. **D-68, "can be lit again", judged held by combination.** No test lights a campfire that burnt out during the run. The line at `tests/sim/campfire.test.mjs:203` holds that „Zapal — ognisko” is feasible at a campfire with no minutes left. The tests at 335, 828 and `tests/view/tile-list.test.mjs:164` compare the burnt-out campfire with `deepEqual` to exactly `{ at, minutesLeft: 0 }`, the record the lighting tests start from. Code could break the sentence only by marking a burnt-out campfire somewhere other than the campfire's record, for example a separate list in the run; the tests would not catch that. Way rejected: keep a pair for "a campfire burnt out in the run lit again". Cost if wrong: a reviewer comparing a change has no example for that narrow case.
2. **D-378, "as well as sticks", judged held without a line of its own.** The acceptance test checks that nature energy was spent, not that sticks were. That every lighting takes its sticks is held by D-63's tests (`tests/sim/campfire.test.mjs:649`, `:776`), which run the same lighting code the acceptance program uses. I did not put a D-378 line on them: they do not hold D-378's sentence about Las. Cost if wrong: a change that dropped the sticks only from the lightings of long runs would pass the D-378 tests.
3. **The quotation runs past the part a test holds where that part lies late in the sentence.** A quotation has to begin at the start of the sentence and cannot skip. So the lines at `tests/sim/campfire.test.mjs:590` and `:723` quote D-175 up to "closes the spells" and "takes no health", and these tests do not hold "comes back by itself only while the mage is well fed", which the quotation includes. The clause `tests:` says which part is held.
4. **Tests not marked although a value in them depends on a sentence.** This is a choice of how far "holds" reaches.
   - D-377 / D-175: the cases at `tests/sim/campfire.test.mjs:649`, `:676`, `:705`, `:776` and `tests/sim/encounters.test.mjs:240` set satiety 50 so that no energy comes back. They would fail if energy came back below 60, but the rule is a fixed setting there, not what they check. I marked D-377 only where the amount that comes back is part of the expected value.
   - D-63: the editor's displayed price, `tests/view/program-editor.test.mjs:1426` and `:1457`, reads the same price function as `tests/sim/campfire.test.mjs:738`. It is D-363's display. D-63 does not name the editor, as ruling R4 asks.
   - D-177 / D-72: the signs of a rule, `tests/sim/rule-signs.test.mjs:239`, `:252`, `:149` and `:185`, give the reason text of a refusal, not the program's pass-over.
   - Way rejected: a line at every test whose value depends on the sentence. Cost: lines whose test is about something else, which would mislead a reader about what the test checks. Cost of my way if wrong: the review reads those cases as unmarked.
5. **R3 remark on wording.** D-175's second sentence, "A character without nature energy has no spells and pays nothing for them", describes a case the game does not have today: one archetype, and every map run holds nature energy. The sentence is not wrong; I changed nothing of it. Its pair is written for an archetype that may be added.
6. **Plan item 3 asks for the line "directly above" the test case.** The earlier slices put it as the first line inside the test body. I followed the earlier slices. A small mismatch, adapted.

## Reaches beyond the dispatch

- `tests/sim/skills.test.mjs:370-445` and its helpers `ready` and `landed` (lines 42-61): the case of „Czysty płomień”, found by searching for `cleanFlame`.
- `tests/sim/data.test.mjs:395-430`: the skill „Rzucanie czaru Płomyk”, found by searching for `Płomyk`.
- `tests/view/tile-list.test.mjs:27-43` and `:125-195`: found by its comment naming D-72.
- `tests/sim/rule-signs.test.mjs:225-264`, `tests/sim/new-account-first-pass.test.mjs:40-110`, `tests/sim/encounters.test.mjs:366-410` and `tests/view/program-editor.test.mjs:1418-1517`: candidates, judged not holding.
- `src/browser/sim/run.ts:100-174`: whether `activityStarted` is sent for a wait (Own-work check).
- `src/browser/sim/data/archetypes.ts` and `src/browser/sim/data/balance.ts:35-60`: the archetypes and the nature energy numbers, for D-175's second sentence.
- `grep` of `newMapRun(` in `src/browser/sim/*.ts`: earning-loop map runs, for D-176.
- `.the-way/task-cycle/change/slice.md`, named by the method, read whole.
- `the author's rules on writing scripts, outside the repository` and `the author's git rules, outside the repository`: the session's own rules before scripts and commits.

## Working copies

- `.runs/executor-22/` under the worktree held the foundation check's output, the decision log's diff, the seven test logs with their exit codes and the table of lines. Their results stand in this report. I removed the directory before returning.

## Unread material

- `tests/sim/body.test.mjs`: read lines 1-68 and 276-465, plus a listing of every case name and every `natureEnergy` line. The cases of 69-275 and 466-629 concern the body's numbers and needs, by their names and lines `decision:`; I did not read them whole.
- `tests/sim/encounters.test.mjs`: read lines 215-266 and 366-410, plus a listing of every case name, every line `decision:` and every line holding `natureEnergy`, `lightItem`, `lightCampfire` or `Zapal`. The rest is not read.
- `tests/sim/campfire.test.mjs`: read whole, in four ranges. `tests/sim/acceptance.test.mjs`: read whole.
- `tests/sim/skills.test.mjs`, `tests/sim/data.test.mjs` and `tests/view/tile-list.test.mjs`, which I changed: read only in the ranges under "Reaches beyond the dispatch", one line added to each case. This departs from the method's "every file you change, whole", following the handoff's instruction to read test files by range and case.
- The other files of the *Read* list: read whole.

## Searches not found or unclear

- No test lights a campfire after it burnt out during the run (D-68). I searched `campfire.test.mjs`, `acceptance.test.mjs`, `tile-list.test.mjs` and the cases using `lightCampfire` in `tests/`.
- No test shows that a lighting is never a combat action (D-63). I searched `tests/sim` for `combat` beside the lightings, and read the action filter of `encounters.test.mjs:366`.
- No test reads the nature energy of an earning loop's map run (D-176). I searched `tests/sim/loop.test.mjs` and the other files for `natureEnergy`.
- No test reads the program after a Płomyk rule was passed over, or shows the rule acting again once the energy has come back (D-177).
- No character without nature energy exists in the data (D-175, sentence 2).
- Unclear: whether "directly above it" in the plan's item 3 means outside the test body. Resolved by following the earlier slices (Concerns 6).

## Questions

none
