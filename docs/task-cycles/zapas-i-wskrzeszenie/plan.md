# Plan — Zapas ze skrzynki przy ręcznym przejściu mapy rozwiązanej i wskrzeszenie z liczbą użyć

- Task: .runs/task-cycles/zapas-i-wskrzeszenie/task.md
- Spec: none
- Base: 46cfec71

The slices are made one after another in the order below. The change of the shape of the game
state, the texts and the many tests that quote the changed decisions cannot all move in one slice
of the size an agent holds, so several slices leave tests of other files failing until a named later
slice; each slice's *Checks* says which. The foundation check (`foundation_check.py`) reports, from
Slice 1 until Slice 18, the `decision:` lines of tests that quote a sentence Slice 1 or Slice 11
rewrote and the references to the withdrawn D-251, each in a file a later slice changes; Slice 18
is the first after which it reports nothing. The stop rule of the task stands at Slice 4.

## Reading note added by the orchestrator at the plan's review

Every slice that changes a test file reads, besides its *Read*, each decision its altered cases quote by a `decision:` line and each invariant they cite by an `invariant:` line, where that entry is not already named in its *Read*: find them by searching the file, write the index with `python -B .the-way/elements/common/decision_index.py --output <working directory>/index.md --decision N` and open whole those whose sentence the case holds (step 2 of 'Reading the foundation'). Slices 8, 9, 12 and 14 in particular, whose files quote many unchanged decisions. A slice that edits a file larger than it can read edits it by searching and reading ranges, not whole.

## Foundation entries

| Entry | Kind | From | What depends on it |
|---|---|---|---|
| (new) — May the progression require the player's absence? | decision, new | projected entry of the definition carried by the task ("Decisions in play", "Zadanie zapisuje"); To do 7; plan item `zapas-i-wskrzeszenie` | written by Slice 1; Slices 3, 4 realize it; D-189 and D-190 derive from it |
| D-189 — What pays, and what takes from the chest? | decision, changed | Settlements row 1; To do 1, 2, 7 | written by Slice 1; Slices 2, 3, 15, 16, 18 |
| D-179 — How do items go into a map run and out of it? | decision, changed | "Decisions in play" (D-179); To do 1 | written by Slice 1; Slice 3 |
| D-214 — When is a map run a manual run of a solved map? | decision, changed | Settlements row 1; To do 1 | written by Slice 1; Slices 2, 3, 8 |
| D-190 — What does a character's death take? | decision, changed | Settlements rows 2, 3, 4; To do 3 | written by Slice 1; Slices 5, 6, 7, 8, 9, 13 |
| D-220 — What generation number and resurrection does a new character have? | decision, changed | Settlements row 5; To do 3 | written by Slice 1; Slices 6, 8 |
| D-240 — When and how is the time away computed? | decision, changed | "Decisions in play" (D-240); To do 3 | written by Slice 1; Slices 9, 18 |
| D-242 — Which clock drives an earning loop? | decision, changed | "Decisions in play" (D-242); To do 3 | written by Slice 1; Slices 9, 13 |
| D-428 — What does the map check of the balance instrument print? (*Verification*) | decision, changed | Settlements row 10; To do 5 | written by Slice 1; Slice 10 |
| `solved-map-manual-run` | invariant, changed; its check: the cases of `tests/sim/trip.test.mjs` and `tests/sim/saved-game.test.mjs` that cite it | "Decisions in play"; To do 1, 2 | written by Slice 1; Slices 2, 3 |
| `trip-transfer` | invariant, changed; its check: the cases of `tests/sim/trip.test.mjs`, `tests/sim/catch-up.test.mjs` and `tests/sim/loop.test.mjs` that cite it | "Decisions in play"; To do 1 | written by Slice 1; Slices 3, 9 |
| `trip-run-end` | invariant, changed; its check: the cases of the same three files that cite it | "Decisions in play"; To do 2 | written by Slice 1; Slices 3, 9 |
| `resurrection-renewal` | invariant, changed; its check: the cases of `tests/sim/team.test.mjs`, `death.test.mjs`, `completion.test.mjs`, `catch-up.test.mjs`, `loop.test.mjs` and of `tests/view/team-lines.test.mjs`, `character-screen.test.mjs`, `clock.test.mjs` that cite it | Settlements rows 3, 4; To do 3 | written by Slice 1; Slices 6, 8, 9, 12, 13 |
| `resurrection` | glossary term, changed | Settlements row 9 | written by Slice 1; Slices 6, 12, 14 |
| D-215 — Where does the player read that a manual run of a solved map pays and takes nothing? | decision, changed | Settlements row 8; To do 4 | written by Slice 11; Slice 17 |
| D-216 — Where does the player read what a death took and what a completion renewed? | decision, changed | Settlements row 7; To do 4 | written by Slice 11; Slices 14, 15 |
| D-217 — What does the game show of a character's resurrection? | decision, changed | Settlements row 6; To do 4 | written by Slice 11; Slices 12, 15, 18 |
| D-329 — What stands at each character in the section „Kto idzie”? (*Verification*, rationale) | decision, changed | "Decisions in play" (D-329); To do 4, 7 | written by Slice 11; Slice 15 |
| D-251 — How does the card of a map mark a rehearsal the earning loop cannot repeat? | decision, withdrawn, no successor | To do 7 | withdrawn by Slice 11; its references rewritten by Slices 1 (D-189), 11 (D-329), 15, 16, 18 |

## Slices

### Slice 1 — Foundation: the rules of the change

- **Goal:** The foundation states the rules the change introduces, each entry written through its
  project skill (`the-way-record-decision`, `the-way-record-invariant`,
  `the-way-record-glossary-term`, read as the files in *Read*), from the task alone: the new
  decision "May the progression require the player's absence?" as the task quotes it, its
  *Relations* naming only a higher decision it serves or `none`, and its *Verification* chosen by
  you — a test of the balance instrument, a comparison by an agent, or both — within what the task
  allows (no test that makes the share of 20% a requirement of later maps, no run of 500 seeds of
  three maps in the gate; task "Questions carried to cycle" and question 7), the choice named in
  your report; D-189 (row 1: a manual run of a solved map takes from the chest and brings out to it
  and pays no practice; the sentence of equipment from nowhere and of the mark under „Wejdź”, with
  its reference to D-251, gone; *Rationale* and *Rejected* no longer give the try from nowhere as
  the rule; *Relations* `derives from` the new decision); D-179 (the exception for a run of a
  solved map gone, in its sentence and its rationale); D-214 (such a „Restart” takes from the chest
  and pays no practice); D-190 (rows 2, 3, 4: the account's resurrection has uses and the renewal
  of one use in the game's data, 3 and 4 hours to start, used uses returning one at a time on one
  clock, a first solving of a new map returning one use while the stock is not full; *Verification*
  naming the numbers of the data instead of „480 real minutes”; *Relations* `derives from` the new
  decision; the rest of its binding sentence kept); D-220 (row 5); D-240 and D-242 (the last use and
  the clock of returns, as To do item 3 gives); D-428 (*Verification*: the loop started with the
  full count of uses, row 10); the invariants `solved-map-manual-run`, `trip-transfer`,
  `trip-run-end` and `resurrection-renewal` as "Decisions in play" gives each; the glossary term
  `resurrection` (row 9). Keep each sentence the task does not change word for word, and keep the
  start of a sentence you reword where its meaning allows, since tests quote sentences by their
  `decision:` lines. Step 4.4 of `the-way-record-decision` makes you check the decisions that
  derive from a changed one; D-215, D-216, D-217, D-329 and D-251 are Slice 11's, not yours; any
  other entry you find stale you name in your report as a question, and change none beyond this
  list. No code and no test.
- **Change:** `foundations/decisions.md` · `foundations/invariants.md` · `foundations/glossary.md`
- **Read:** `.runs/task-cycles/zapas-i-wskrzeszenie/task.md:16-36` Description ·
  `.runs/task-cycles/zapas-i-wskrzeszenie/task.md:37-128` Questions to settle (questions 1–12) ·
  `.runs/task-cycles/zapas-i-wskrzeszenie/task.md:142-152` Questions to settle (questions 15, 16) ·
  `.runs/task-cycles/zapas-i-wskrzeszenie/task.md:154-174` Context · Questions carried to cycle ·
  `.runs/task-cycles/zapas-i-wskrzeszenie/task.md:180-262` Decisions in play · Settlements to
  record · Out of scope · `foundations/decisions.md:5420-5992` section "Maps: their content, time
  and solving", where the new decision may go, D-214 inside it · `foundations/decisions.md:8510-8531`
  D-189 · `foundations/decisions.md:8328-8343` D-179 · `foundations/decisions.md:6190-6215` D-190 ·
  `foundations/decisions.md:6330-6348` D-220 · `foundations/decisions.md:8581-8614` D-240 ·
  `foundations/decisions.md:8654-8707` D-242 · `foundations/decisions.md:11673-11687` D-428 ·
  `foundations/decisions.md:6308-6329` D-219 · `foundations/decisions.md:6349-6386` D-221 ·
  `foundations/decisions.md:4231-4245` D-386 · `foundations/invariants.md:1058-1067`
  solved-map-manual-run · `foundations/invariants.md:978-997` trip-transfer · trip-run-end ·
  `foundations/invariants.md:1068-1087` resurrection-renewal · death-settled-once ·
  `foundations/invariants.md:1148-1157` catch-up-state · `foundations/glossary.md:211-221`
  resurrection · generation number · `foundations/glossary.md:302-306` wall ·
  `foundations/part_map.md:33-64` simulation · `foundations/part_map.md:127-137` balance-tools ·
  `foundations/part_map.md:159-165` product-foundation ·
  `.claude/skills/the-way-record-decision/SKILL.md` · `.the-way/elements/decisions/skill/SKILL.md` ·
  `.the-way/elements/decisions/skill/read.md` · `.the-way/elements/decisions/skill/decide_entry.md` ·
  `.the-way/elements/decisions/template.md` · `.the-way/elements/decisions/examples.md` ·
  `.claude/skills/the-way-record-invariant/SKILL.md` · `.the-way/elements/invariants/skill/SKILL.md`
  · `.the-way/elements/invariants/skill/decide_entry.md` ·
  `.the-way/elements/invariants/skill/draft.md` · `.the-way/elements/invariants/skill/write.md` ·
  `.the-way/elements/invariants/template.md` · `.the-way/elements/invariants/examples.md` ·
  `.claude/skills/the-way-record-glossary-term/SKILL.md` · `.the-way/elements/glossary/skill/SKILL.md`
  · `.the-way/elements/glossary/skill/read.md` · `.the-way/elements/glossary/skill/decide_entry.md` ·
  `.the-way/elements/glossary/skill/write.md` · `.the-way/elements/glossary/template.md` ·
  `.the-way/elements/glossary/examples.md` · `.the-way/elements/common/way_of_working.md` ·
  `.the-way/elements/common/rules.md` · `.the-way/task-cycle/skill/foundation_step.md`
- **Model:** same — nine decisions, four invariants and a glossary term reworded together, under
  the-way's limits of a sentence, and quoted afterwards by the tests of every later slice.
- **Risk:** none
- **Checks:** `python -B .the-way/elements/common/foundation_check.py --skip-test-citations` reports
  nothing in `foundations/`; every line it reports is a `decision:` line quoting a sentence you
  rewrote, or an invariant you reworded whose citing tests do not differ yet, in a test file a later
  slice changes; the report lists those lines by file.
- **Depends on:** none

### Slice 2 — The load admits what a completed run of a solved map brought out

- **Goal:** `loadSavedGame` admits a document whose manual map run of a solved map (the mark
  `solvedMapRun`) has completed with a deposit, by the same rule as any other completion — entries
  of the frozen bring plan in its order, each at most its planned count — so that the load admits
  every game state the game makes once Slice 3 lets such a run bring items out (D-386); it refuses
  everything else it refuses today. `SAVED_GAME_VERSION` stays 7: the shape does not change here,
  and Slice 6 raises it once for the whole change. The case of `tests/sim/saved-game.test.mjs`
  that refuses such a deposit today changes, with its reason (Foundation entries row D-189,
  invariant `solved-map-manual-run`), and the comments of `saved-game.ts` on the marked run say what
  holds now.
- **Change:** `src/browser/sim/saved-game.ts` · `tests/sim/saved-game.test.mjs`
- **Read:** `guidelines/coding.md` · `guidelines/testing.md` · `guidelines/coding-saved-game.md` ·
  `src/browser/sim/types.ts` · `.runs/task-cycles/zapas-i-wskrzeszenie/task.md:27-30` To do (items
  1, 2) · `.runs/task-cycles/zapas-i-wskrzeszenie/task.md:39-44` Questions to settle (question 1) ·
  Foundation entries row D-189 · row D-214 · row solved-map-manual-run · row trip-run-end ·
  `foundations/decisions.md:4231-4245` D-386 · `foundations/decisions.md:3888-3932` D-206 ·
  `foundations/invariants.md:1048-1057` save-version · `foundations/invariants.md:214-235`
  simulation-isolation · simulation-inputs · `foundations/part_map.md:33-64` simulation
- **Model:** cheaper
- **Risk:** trust boundary — `src/browser/sim/saved-game.ts`, the load's check of a deposit on a
  completed run of a solved map
- **Checks:** first a case of `tests/sim/saved-game.test.mjs` that loads a completed run of a
  solved map holding a deposit from its bring plan and fails on the base; then
  `npm test -- tests/sim/saved-game.test.mjs`.
- **Depends on:** Slice 1

### Slice 3 — A manual run of a solved map takes from the chest and brings out to it

- **Goal:** Every manual map run, a run of a solved map and its „Restart” included, takes its
  equipment from the chest through `takeTrip`, clipped as any start; at its completion a run of a
  solved map deposits its frozen bring list clipped as every completion does, and `tripLoot` no
  longer makes an exception of it; such a run still pays no practice and its completion is not
  settled by `settleCompletion`; death, „Zakończ” and „Restart” lose what the character carried as
  in any run (To do items 1, 2). `takeFromNowhere`, `sendTake` with no chest and `clippedTake` stay
  exported and unchanged, since the view still calls them; Slice 16 removes them. The comments of
  `solvedMapRun` and `deposited` in `types.ts`, of `startRun` and `advanceMinutes` in `game.ts` and
  of `trip.ts` say what holds now. In `tests/sim/trip.test.mjs` and `tests/sim/run-record.test.mjs`
  each case that expects the old rule is rewritten with its reason (Foundation entries rows D-189,
  D-214, `solved-map-manual-run`, `trip-transfer`, `trip-run-end`), and each `decision:` line
  quoting a sentence Slice 1 rewrote quotes the sentence as it stands now.
- **Change:** `src/browser/sim/game.ts` · `src/browser/sim/trip.ts` · `src/browser/sim/types.ts` ·
  `tests/sim/trip.test.mjs` · `tests/sim/run-record.test.mjs`
- **Read:** `guidelines/coding.md` · `guidelines/testing.md` ·
  `guidelines/coding-simulation-module.md` · `.runs/task-cycles/zapas-i-wskrzeszenie/task.md:27-30`
  To do (items 1, 2) · `.runs/task-cycles/zapas-i-wskrzeszenie/task.md:39-44` Questions to settle
  (question 1) · `.runs/task-cycles/zapas-i-wskrzeszenie/task.md:154-158` Context · Foundation
  entries row D-189 · row D-179 · row D-214 · row solved-map-manual-run · row trip-transfer · row
  trip-run-end · `foundations/decisions.md:7044-7062` D-194 · `foundations/decisions.md:8407-8419`
  D-183 · `foundations/decisions.md:8435-8489` D-185 · D-186 · D-187 ·
  `foundations/glossary.md:136-153` manual map run · completion · solved map ·
  `foundations/part_map.md:33-64` simulation
- **Model:** cheaper
- **Risk:** none
- **Checks:** first the cases of `tests/sim/trip.test.mjs` that fail on the base: a run of a solved
  map takes from the chest, deposits its bring list at its completion, and a „Restart” after the
  solving completion takes from the chest; then `npm test -- tests/sim/trip.test.mjs` ·
  `npm test -- tests/sim/run-record.test.mjs` · `npm test -- tests/sim/saved-game.test.mjs` ·
  `npm test -- tests/sim/completion.test.mjs` · `npm test -- tests/balance/agreement.test.mjs`; and
  `npm test -- tests/view/trip.test.mjs` · `npm test -- tests/view/world-area.test.mjs` ·
  `npm test -- tests/view/end-window-game.test.mjs`, where a case that expects the old rule may fail
  until Slice 15, 17 or 14 changes its file; and `npm test -- <file>` for each other file of
  `tests/sim/` and `tests/view/` that starts a manual run on a solved map. The report names each
  failing case and the slice that changes its file, or names it as a case no slice of the plan
  changes, for the orchestrator to place.
- **Depends on:** Slice 1 · Slice 2

### Slice 4 — Measurement: can each map be solved with what the maps before it gave

- **Goal:** The balance instrument has a mode, through the game's own functions, that for Skraj
  lasu, Las and Las — głębiej builds the state question 13 gives — practice from the first
  solvings of the maps before, each by the best reference program of that map (median of the
  solved runs on seeds 1–500), ranks bought from that practice in the branches the measured program
  needs, and the stock of the measured program's take list brought out by manual runs of solved
  maps within the chest's capacity, with the number of such runs — and measures every reference
  program from it on seeds 1–500, the map counting by its best program; its table is the one
  question 14 gives (the columns of D-428 without the earning loop's balance, programs as `P1`,
  `P2`, …, one sentence under the table, the number of manual runs included, naming no skill,
  branch, rank or item). You choose how the mode builds that state — the campaign extended, a sweep
  from a given state, or another way through the game's functions (task "Questions carried to
  cycle") — and name the choice in your report. The new file of code follows the rules of its kind
  in the meanings of question 11: numbers of the game from the built game, reference programs from
  `tests/sim/reference-programs.mjs`, the shared things imported from where they stand, the table
  given as data and written only by `balance/cli.mjs` under `--out`, a fixed clock and the
  measurement's seeds; it opens with a comment that says what it is and names the invariant
  `instrument-game-agreement`, refuses a map the game's data lacks, and gets a row `copy` in the
  table "Files of this kind" of `guidelines/coding-balance-instrument.md`. `balance/cli.mjs` gets
  the command, and both copies of the skill `loop2-balance`, byte for byte alike, describe it. Then
  run the command for the three maps on seeds 1–500, write its table with `--out` into your working
  directory under `.runs/` that your handoff names, commit no result (D-429), and put the table and
  its sentence in your report. Stop rule: where the best program of a map solves fewer than 20% of
  the seeds (question 7), say so first in your report; the orchestrator then stops the cycle before
  Slice 5, and the matter goes back through Mariusz to the plan of the project. Change no number of
  a map.
- **Change:** `balance/progression.mjs` · `tests/balance/progression.test.mjs` · `balance/cli.mjs` ·
  `tests/balance/cli.test.mjs` · `guidelines/coding-balance-instrument.md` ·
  `.claude/skills/loop2-balance/SKILL.md` · `.agents/skills/loop2-balance/SKILL.md`
- **Read:** `guidelines/coding.md` · `guidelines/testing.md` ·
  `.runs/task-cycles/zapas-i-wskrzeszenie/task.md:27-35` To do ·
  `.runs/task-cycles/zapas-i-wskrzeszenie/task.md:87-104` Questions to settle (questions 7–9) ·
  `.runs/task-cycles/zapas-i-wskrzeszenie/task.md:111-141` Questions to settle (questions 11–14) ·
  `.runs/task-cycles/zapas-i-wskrzeszenie/task.md:154-174` Context · Questions carried to cycle ·
  `.runs/task-cycles/zapas-i-wskrzeszenie/task.md:258-262` Out of scope · `balance/engine.mjs` ·
  `balance/check-map.mjs` · `balance/loop.mjs` · `balance/campaign.mjs` ·
  `tests/sim/reference-programs.mjs` · `tests/balance/check-map.test.mjs` ·
  `src/browser/sim/skills.ts` · Foundation entries row (new) May the progression require the
  player's absence? · row D-189 · row D-428 · `foundations/decisions.md:11658-11672` D-427 ·
  `foundations/decisions.md:11688-11702` D-429 · `foundations/decisions.md:888-902` D-437 ·
  `foundations/decisions.md:5912-5930` D-388 · `foundations/decisions.md:5945-5961` D-398 ·
  `foundations/invariants.md:1438-1467` instrument-game-agreement · balance-instrument-file-writes ·
  balance-instrument-repeatability · `foundations/glossary.md:296-306` overlay · wall ·
  `foundations/part_map.md:127-157` balance-tools · agent-workflow
- **Model:** same — a new mode of measurement whose way of building the state the author chooses,
  and whose result can stop the cycle.
- **Risk:** none
- **Checks:** first `tests/balance/progression.test.mjs`, failing on the base: the state built for a
  map on a few seeds through the game's functions, and a table with no condition, action, rule,
  skill or item of a program; then `npm test -- tests/balance/progression.test.mjs` ·
  `npm test -- tests/balance/cli.test.mjs` ·
  `npm test -- tests/invariants/test_balance_instrument_file_writes.py` ·
  `npm test -- tests/invariants/test_balance_instrument_repeatability.py` ·
  `npm test -- tests/invariants/test_cross_part_imports.py` ·
  `npm test -- tests/agent_workflow/test_loop2_balance_skill.py`; then the measurement:
  `npm run balance -- <the command you add> …` for the three maps on seeds 1–500, with `--out`
  under your working directory.
- **Depends on:** Slice 3

### Slice 5 — The view reads the team's resurrection through a function of the simulation

- **Goal:** No behaviour changes. `game.ts` exports one pure function that gives, from the team and
  a real moment, what the resurrection line needs — the uses left at that moment and the moment the
  next one returns, none where none is missing (today one use at most) — and `resurrectionLine` in
  `team-lines.ts` reads the team through it and no longer names the field `resurrectionReadyAtMs`
  or picks it from `Team`, so that Slice 6 changes the shape of the team without touching the view.
  Every text and role of the line stays as it is, and no test changes.
- **Change:** `src/browser/sim/game.ts` · `src/browser/view/team-lines.ts`
- **Read:** `guidelines/coding.md` · `guidelines/testing.md` ·
  `guidelines/coding-simulation-module.md` · `guidelines/coding-browser-module.md` ·
  `guidelines/styleguide-browser-view.md` · `src/browser/AGENTS.md` ·
  `src/browser/sim/types.ts:419-428` Team · `tests/view/team-lines.test.mjs` · Foundation entries
  row D-190 · `foundations/decisions.md:6265-6285` D-217 · `foundations/decisions.md:6308-6329`
  D-219 · `foundations/part_map.md:3-64` browser-view · simulation
- **Model:** cheaper
- **Risk:** none
- **Checks:** `npm run typecheck` · `npm test -- tests/view/team-lines.test.mjs` ·
  `npm test -- tests/view/character-screen.test.mjs` ·
  `npm test -- tests/view/headquarters-screen.test.mjs` ·
  `npm test -- tests/view/maps-screen.test.mjs` · `npm test -- tests/sim/death.test.mjs`
- **Depends on:** Slice 3

### Slice 6 — The team's resurrection has uses

- **Goal:** The team holds the count of uses spent and not yet returned, and the real moment the
  next one returns, which stands exactly while that count is above zero (question 15); the game's
  data hold the count of uses, 3, and the renewal of one use, 240 real minutes (question 4), the
  renewal keeping its key `resurrectionRenewalRealMinutes` and the count a key of its own; a new game
  starts with the full count (row 5). The rules of To do item 3 and questions 3 and 5 hold in
  `game.ts`: the uses that returned up to a moment, that moment included, count before anything is
  settled at it; the death of a character with practice spends one use while one is left, the
  death that spends one with the stock full starting the clock at its moment and a death with the
  clock running leaving it as it is; at zero it takes everything as today; a character with no
  practice spends none; each use returns the renewal after the clock started or after the use before
  it, and the clock stops when the stock is full; a first solving of a map the account has not solved
  returns one use while the stock is not full and leaves the clock running, and stops it when the
  stock fills; the settlement of a death that spent a use holds the uses left after it (question 6);
  a death settled later in the catch-up never moves back a clock an earlier-settled death started
  (D-240). The function of Slice 5 and `resurrectionReady` (a use left at the moment) follow the new
  shape, so the view and the instrument still compile and run. The load reads the new team strictly
  and refuses a count above the data's count, a moment standing with no use spent or missing with
  one spent, and a settlement whose uses left exceed the data's count; `SAVED_GAME_VERSION` goes from
  7 to 8; the list of what the load checks against the data in `guidelines/coding-saved-game.md`
  gains the count of uses (question 15). The new rules are tested first in
  `tests/sim/team.test.mjs`, among them a game state these rules make loading back from its saved
  document, and its `decision:` lines of D-220 quote the sentence as Slice 1 left it. Tests that set the old field or expect one resurrection fail until their slices: Slice 7
  (`tests/sim/saved-game.test.mjs`), Slice 8, Slice 9, Slice 10 (`tests/balance/`), Slices 12–15,
  17 and 18 (`tests/view/`).
- **Change:** `src/browser/sim/types.ts` · `src/browser/sim/data/balance.ts` ·
  `src/browser/sim/game.ts` · `src/browser/sim/saved-game.ts` · `tests/sim/team.test.mjs` ·
  `guidelines/coding-saved-game.md`
- **Read:** `guidelines/coding.md` · `guidelines/testing.md` ·
  `guidelines/coding-simulation-module.md` · `guidelines/coding-content-data.md` ·
  `.runs/task-cycles/zapas-i-wskrzeszenie/task.md:27-31` To do (items 1–3) ·
  `.runs/task-cycles/zapas-i-wskrzeszenie/task.md:45-79` Questions to settle (questions 2–6) ·
  `.runs/task-cycles/zapas-i-wskrzeszenie/task.md:142-147` Questions to settle (question 15) ·
  `.runs/task-cycles/zapas-i-wskrzeszenie/task.md:154-169` Context · Foundation entries row D-190 ·
  row D-220 · row D-240 · row D-242 · row resurrection-renewal · row resurrection ·
  `foundations/decisions.md:6308-6386` D-219 · D-220 (base) · D-221 ·
  `foundations/decisions.md:4231-4245` D-386 · `foundations/invariants.md:1048-1057` save-version ·
  `foundations/invariants.md:1078-1087` death-settled-once · `foundations/invariants.md:1148-1157`
  catch-up-state · `foundations/part_map.md:33-64` simulation · `foundations/part_map.md:139-157`
  agent-workflow
- **Model:** same — a new shape of the game state across its type, its rules, its data and its load
  at a trust boundary, with returns that depend on the order deaths are settled in.
- **Risk:** trust boundary — `src/browser/sim/saved-game.ts`, the load's check of the team's uses
  and of the settlement of a death against the game's data
- **Checks:** first the cases of `tests/sim/team.test.mjs` that fail on the base (the rules above
  and the round trip of a saved state); then `npm test -- tests/sim/team.test.mjs` ·
  `npm run typecheck` · `npm test -- tests/invariants/test_simulation_isolation.py` ·
  `npm test -- tests/invariants/test_simulation_inputs.py`
- **Depends on:** Slice 2 · Slice 5

### Slice 7 — The tests of the load hold the shape of version 8

- **Goal:** `tests/sim/saved-game.test.mjs` holds the document of version 8, every optional branch
  filled with the team's uses spent and the moment of the next return, loading into the state it
  describes; the document of version 7 is kept and refused as another version; and crafted documents
  of version 8 are refused whole as `shape`: a count of uses spent that is no whole number from 0,
  above the data's count, a moment that stands with none spent or is missing with some spent, a
  moment that is no safe integer, the old key `resurrectionReadyAtMs`, and the settlement of a death
  that spent a use with its uses left missing, out of range or above the data's count (question 15,
  `guidelines/coding-saved-game.md`). Where a case shows the load of Slice 6 admitting what it
  should refuse, fix `saved-game.ts` in this slice and say so. Each `decision:` line quoting a
  sentence Slice 1 rewrote quotes it as it stands now.
- **Change:** `tests/sim/saved-game.test.mjs` · `src/browser/sim/saved-game.ts`
- **Read:** `guidelines/coding.md` · `guidelines/testing.md` · `guidelines/coding-saved-game.md` ·
  `src/browser/sim/types.ts` · `src/browser/sim/data/balance.ts` ·
  `.runs/task-cycles/zapas-i-wskrzeszenie/task.md:31-31` To do (item 3) ·
  `.runs/task-cycles/zapas-i-wskrzeszenie/task.md:142-147` Questions to settle (question 15) ·
  `.runs/task-cycles/zapas-i-wskrzeszenie/task.md:165-165` Context · Foundation entries row D-190 · row
  D-214 · row solved-map-manual-run · `foundations/decisions.md:3888-3932` D-206 ·
  `foundations/decisions.md:4231-4245` D-386 · `foundations/invariants.md:1048-1057` save-version ·
  `foundations/part_map.md:33-64` simulation
- **Model:** cheaper
- **Risk:** trust boundary — `src/browser/sim/saved-game.ts`, the refusals of a crafted document of
  the new shape
- **Checks:** `npm test -- tests/sim/saved-game.test.mjs` · `npm test -- tests/sim/team.test.mjs`
- **Depends on:** Slice 6

### Slice 8 — The tests of death, completion and data hold the uses

- **Goal:** In `death.test.mjs`, `completion.test.mjs`, `flow.test.mjs` and `data.test.mjs` of
  `tests/sim/`, every case that sets the team's resurrection, expects one resurrection or the
  renewal of 480 minutes reads the uses as Slice 6 made them and expects the rules of D-190 and
  D-220 as Slice 1 wrote them, with its reason; `data.test.mjs` expects 3 uses and 240 minutes as
  numbers of the game's data. Each `decision:` line quoting a sentence of D-189, D-190, D-214 or
  D-220 that Slice 1 rewrote quotes it as it stands now, and each case that cites
  `resurrection-renewal` holds the sentence as reworded. This slice changes no code: where a
  rewritten case shows a fault of Slice 6, report it with the case and stop.
- **Change:** `tests/sim/death.test.mjs` · `tests/sim/completion.test.mjs` ·
  `tests/sim/flow.test.mjs` · `tests/sim/data.test.mjs`
- **Read:** `guidelines/coding.md` · `guidelines/testing.md` · `src/browser/sim/game.ts` ·
  `src/browser/sim/types.ts` · `src/browser/sim/data/balance.ts` ·
  `.runs/task-cycles/zapas-i-wskrzeszenie/task.md:31-31` To do (item 3) ·
  `.runs/task-cycles/zapas-i-wskrzeszenie/task.md:55-72` Questions to settle (questions 3–5) ·
  Foundation entries row D-189 · row D-190 · row D-214 · row D-220 · row resurrection-renewal ·
  `foundations/decisions.md:7044-7062` D-194 · `foundations/decisions.md:6349-6386` D-221 ·
  `foundations/invariants.md:1078-1087` death-settled-once · `foundations/part_map.md:33-64`
  simulation
- **Model:** cheaper
- **Risk:** none
- **Checks:** `npm test -- tests/sim/death.test.mjs` · `npm test -- tests/sim/completion.test.mjs` ·
  `npm test -- tests/sim/flow.test.mjs` · `npm test -- tests/sim/data.test.mjs`
- **Depends on:** Slice 6

### Slice 9 — The catch-up and the earning loops spend and return uses in the list's order

- **Goal:** The catch-up and the open game settle deaths on the uses as D-240 and D-242 now give:
  the death of each character finds the count of uses and the clock of returns as the characters
  earlier on the list left them, even where it died earlier in real time, and a clock started by a
  death settled earlier does not move back; in the open game the earlier of two deaths in real time
  takes the last use. Cases of `tests/sim/catch-up.test.mjs` hold this first; `loop.ts` changes
  only where a case shows it must, and its comments speak of uses. Every case of
  `catch-up.test.mjs` and `tests/sim/loop.test.mjs` that sets the old field or expects one
  resurrection reads the uses with its reason; each `decision:` line quoting a sentence of D-189,
  D-190, D-240 or D-242 that Slice 1 rewrote quotes it as it stands now; the cases citing
  `trip-transfer`, `trip-run-end` and `resurrection-renewal` hold the sentences as reworded.
- **Change:** `src/browser/sim/loop.ts` · `tests/sim/catch-up.test.mjs` · `tests/sim/loop.test.mjs`
- **Read:** `guidelines/coding.md` · `guidelines/testing.md` ·
  `guidelines/coding-simulation-module.md` · `src/browser/sim/game.ts` ·
  `.runs/task-cycles/zapas-i-wskrzeszenie/task.md:31-31` To do (item 3) ·
  `.runs/task-cycles/zapas-i-wskrzeszenie/task.md:55-59` Questions to settle (question 3) ·
  Foundation entries row D-189 · row D-190 · row D-240 · row D-242 · row trip-transfer · row
  trip-run-end · row resurrection-renewal · `foundations/invariants.md:1148-1177` catch-up-state
  · catch-up-minutes · catch-up-death-moment · `foundations/invariants.md:1328-1337`
  loop-practice-payment · `foundations/decisions.md:8796-8871` D-246 · `foundations/part_map.md:33-64`
  simulation
- **Model:** cheaper
- **Risk:** none
- **Checks:** first the case of `tests/sim/catch-up.test.mjs` of a character later on the list that
  died earlier in real time, finding the uses and the clock as the earlier character left them; then
  `npm test -- tests/sim/catch-up.test.mjs` · `npm test -- tests/sim/loop.test.mjs`
- **Depends on:** Slice 6

### Slice 10 — The balance instrument counts the uses with the game's functions

- **Goal:** As To do item 5 and question 12 give: the earning loop and the map check start with the
  full count of uses, as a new game; `--no-resurrection` starts with none — all uses spent, the
  clock started at the start of the loop — after which they return as in the game; the campaign's
  player that waits for the resurrection before trying the next map tries while one use is left. The
  instrument counts no return itself and keeps no copy of a number of the game (question 11, "Liczba
  gry"). The description of the switch in `balance/cli.mjs` and in both copies of the skill
  `loop2-balance`, byte for byte alike, speaks of uses, and the comments of the mode files that speak
  of the one resurrection speak of uses. The player descriptions in `balance/players/` stay as they
  are: "while the team's resurrection is ready" reads as "while a use is left".
- **Change:** `balance/loop.mjs` · `balance/campaign.mjs` · `balance/check-map.mjs` ·
  `balance/cli.mjs` · `.claude/skills/loop2-balance/SKILL.md` · `.agents/skills/loop2-balance/SKILL.md`
  · `tests/balance/loop.test.mjs` · `tests/balance/check-map.test.mjs` · `tests/balance/cli.test.mjs`
  · `tests/balance/campaign.test.mjs`
- **Read:** `guidelines/coding.md` · `guidelines/testing.md` ·
  `guidelines/coding-balance-instrument.md` · `src/browser/sim/data/balance.ts` ·
  `.runs/task-cycles/zapas-i-wskrzeszenie/task.md:31-33` To do (items 3–5) ·
  `.runs/task-cycles/zapas-i-wskrzeszenie/task.md:111-128` Questions to settle (questions 11, 12) ·
  `.runs/task-cycles/zapas-i-wskrzeszenie/task.md:160-160` Context · Foundation entries row D-190 · row
  D-428 · `foundations/decisions.md:11658-11672` D-427 · `foundations/decisions.md:11688-11702` D-429
  · `foundations/decisions.md:888-902` D-437 · `foundations/invariants.md:1438-1467`
  instrument-game-agreement · balance-instrument-file-writes · balance-instrument-repeatability ·
  `foundations/part_map.md:127-157` balance-tools · agent-workflow
- **Model:** cheaper
- **Risk:** none
- **Checks:** first a case of `tests/balance/loop.test.mjs` with `resurrectionReady` false starting
  with every use spent and the first returning the renewal after the loop's start, and a case of
  `tests/balance/campaign.test.mjs` of a player waiting for the resurrection who tries with one use
  left; then `npm test -- tests/balance/loop.test.mjs` · `npm test -- tests/balance/check-map.test.mjs`
  · `npm test -- tests/balance/cli.test.mjs` · `npm test -- tests/balance/campaign.test.mjs` ·
  `npm test -- tests/balance/agreement.test.mjs` · `npm test -- tests/balance/progression.test.mjs` ·
  `npm test -- tests/invariants/test_balance_instrument_file_writes.py` ·
  `npm test -- tests/invariants/test_balance_instrument_repeatability.py` ·
  `npm test -- tests/agent_workflow/test_loop2_balance_skill.py`
- **Depends on:** Slice 4 · Slice 6

### Slice 11 — Foundation: what the screens say

- **Goal:** The foundation states what the screens say after the change, each entry written through
  `the-way-record-decision`, read as the files in *Read*: D-215 (row 8: the wording of the line on
  the screen of a manual run of a solved map and a question that no longer says such a run takes
  nothing); D-216 (row 7: the four lines of the end-of-run window in the wordings of question 6, the
  number of uses telling the moment of the death, the hours of the data in the form of question 16,
  the line of a returned use standing only where a first solving returned one); D-217 (row 6: the
  line at a character with the count of uses and, while the stock is not full, the time to the next
  return, rounded as today, `danger` only at zero uses); D-329 (its *Verification* and rationale
  without the warning of a rehearsal); D-251 out of the log onto the list of withdrawn numbers with
  no successor, and every reference to it in the log rewritten. Keep each sentence the task does not
  change word for word, and the start of a sentence you reword where its meaning allows. The
  references to D-251 outside the log are rewritten by Slices 15, 16 and 18. No code and no test.
- **Change:** `foundations/decisions.md`
- **Read:** `.runs/task-cycles/zapas-i-wskrzeszenie/task.md:27-35` To do ·
  `.runs/task-cycles/zapas-i-wskrzeszenie/task.md:73-86` Questions to settle (question 6) ·
  `.runs/task-cycles/zapas-i-wskrzeszenie/task.md:148-152` Questions to settle (question 16) ·
  `.runs/task-cycles/zapas-i-wskrzeszenie/task.md:203-224` Decisions in play ·
  `.runs/task-cycles/zapas-i-wskrzeszenie/task.md:241-256` Settlements to record ·
  `foundations/decisions.md:5890-5911` D-215 · `foundations/decisions.md:6216-6285` D-216 · D-217 ·
  `foundations/decisions.md:9878-9899` D-329 · `foundations/decisions.md:8999-9024` D-251 ·
  `foundations/decisions.md:11703-11712` Withdrawn identifiers · `foundations/decisions.md:8435-8454`
  D-185 · `foundations/decisions.md:10564-10602` D-368 · `foundations/decisions.md:6286-6307` D-218
  · Foundation entries row D-189 · row D-190 · `foundations/glossary.md:211-215` resurrection ·
  `foundations/part_map.md:3-31` browser-view · `.claude/skills/the-way-record-decision/SKILL.md` ·
  `.the-way/elements/decisions/skill/SKILL.md` · `.the-way/elements/decisions/skill/read.md` ·
  `.the-way/elements/decisions/skill/decide_entry.md` · `.the-way/elements/decisions/template.md` ·
  `.the-way/elements/decisions/examples.md` · `.the-way/elements/common/way_of_working.md` ·
  `.the-way/elements/common/rules.md` · `.the-way/task-cycle/skill/foundation_step.md`
- **Model:** same — four decisions of texts quoted by the tests of the view, and the withdrawal of a
  decision with its references.
- **Risk:** none
- **Checks:** `python -B .the-way/elements/common/foundation_check.py --skip-test-citations` reports
  nothing in `foundations/`; every line it reports is a `decision:` line quoting a sentence Slice 1
  or you rewrote, or a reference to D-251, in a file a later slice changes; the report lists them by
  file.
- **Depends on:** Slice 1

### Slice 12 — The resurrection line at each character speaks of uses

- **Goal:** `resurrectionLine` gives the three lines of question 6 for a full stock, a part of it
  and none left, with the count from the game's data, the time to the next return as D-217 rounds
  it, and `danger` only at zero uses (Foundation entries row D-217). The comments of the stylesheets
  of Siedziba and Postać that say when the line stands in `danger` say it of zero uses; no value of
  a style changes. `tests/view/team-lines.test.mjs` holds the lines first; the cases of
  `team-lines.test.mjs`, `character-screen.test.mjs` and `headquarters-screen.test.mjs` that set the
  old field or expect the old lines read the uses and the new lines with their reason, and their
  `decision:` lines of D-217 and citations of `resurrection-renewal` hold the sentences as they stand
  now.
- **Change:** `src/browser/view/team-lines.ts` · `src/browser/headquarters.css` ·
  `src/browser/character-screen.css` · `tests/view/team-lines.test.mjs` ·
  `tests/view/character-screen.test.mjs` · `tests/view/headquarters-screen.test.mjs`
- **Read:** `guidelines/coding.md` · `guidelines/testing.md` · `guidelines/coding-browser-module.md`
  · `guidelines/styleguide-browser-view.md` · `src/browser/AGENTS.md` · `src/browser/sim/game.ts` ·
  `src/browser/sim/data/balance.ts` · `.runs/task-cycles/zapas-i-wskrzeszenie/task.md:32-32` To do
  (item 4) · `.runs/task-cycles/zapas-i-wskrzeszenie/task.md:73-75` Questions to settle (question 6)
  · Foundation entries row D-217 · row D-190 · row resurrection-renewal · row resurrection ·
  `foundations/decisions.md:6286-6329` D-218 · D-219 · `foundations/part_map.md:3-31` browser-view
- **Model:** cheaper
- **Risk:** none
- **Checks:** first the cases of `tests/view/team-lines.test.mjs` for the three lines; then
  `npm test -- tests/view/team-lines.test.mjs` · `npm test -- tests/view/character-screen.test.mjs`
  · `npm test -- tests/view/headquarters-screen.test.mjs` ·
  `npm test -- tests/invariants/test_browser_view_token_values.py`
- **Depends on:** Slice 6 · Slice 11

### Slice 13 — The clock's tests settle deaths and first solvings on the uses

- **Goal:** Every case of `tests/view/clock.test.mjs` that sets the old field or expects one
  resurrection reads the uses as Slice 6 made them with its reason, among them the death in an
  earning loop that takes a use before the death of the manual run at the same reading; its
  `decision:` lines quoting sentences of D-190 and D-242 that Slice 1 rewrote, and its citations of
  `resurrection-renewal`, hold them as they stand now. The comments of `clock.ts` that speak of the
  team's one resurrection speak of uses; its behaviour does not change.
- **Change:** `tests/view/clock.test.mjs` · `src/browser/view/clock.ts`
- **Read:** `guidelines/coding.md` · `guidelines/testing.md` · `guidelines/coding-browser-module.md`
  · `guidelines/styleguide-browser-view.md` · `src/browser/AGENTS.md` · `src/browser/sim/game.ts` ·
  Foundation entries row D-190 · row D-242 · row resurrection-renewal ·
  `foundations/decisions.md:6349-6386` D-221 · `foundations/invariants.md:1158-1177` catch-up-minutes
  · catch-up-death-moment · `foundations/part_map.md:3-31` browser-view
- **Model:** cheaper
- **Risk:** none
- **Checks:** `npm test -- tests/view/clock.test.mjs`
- **Depends on:** Slice 6

### Slice 14 — The end-of-run window speaks of uses

- **Goal:** `end-window-lines.ts` gives the four lines of question 6 as Foundation entries row D-216
  gives them: after a death that spent a use, with the uses left that its settlement holds and the
  renewal of the data in the form of question 16, read through the forms of number of
  `counted-name.ts`; after a death with none left, in `danger`; after the death of a character with
  no practice; after a first solving that returned a use, and none where it found the stock full.
  `tests/view/end-window-lines.test.mjs` holds the lines first, the hours of a whole, a part and
  under one hour among them; the cases of `end-window.test.mjs` and `end-window-game.test.mjs` that
  expect the old lines or build a settlement without its uses left read the new ones with their
  reason, and their `decision:` lines of D-216 quote it as it stands now.
- **Change:** `src/browser/view/end-window-lines.ts` · `tests/view/end-window-lines.test.mjs` ·
  `tests/view/end-window.test.mjs` · `tests/view/end-window-game.test.mjs`
- **Read:** `guidelines/coding.md` · `guidelines/testing.md` · `guidelines/coding-browser-module.md`
  · `guidelines/styleguide-browser-view.md` · `src/browser/AGENTS.md` ·
  `src/browser/view/counted-name.ts` · `.runs/task-cycles/zapas-i-wskrzeszenie/task.md:76-79`
  Questions to settle (question 6) · `.runs/task-cycles/zapas-i-wskrzeszenie/task.md:148-152`
  Questions to settle (question 16) · Foundation entries row D-216 · row D-190 ·
  `foundations/decisions.md:8435-8454` D-185 · `foundations/part_map.md:3-31` browser-view
- **Model:** cheaper
- **Risk:** none
- **Checks:** first the cases of `tests/view/end-window-lines.test.mjs` for the four lines; then
  `npm test -- tests/view/end-window-lines.test.mjs` · `npm test -- tests/view/end-window.test.mjs`
  · `npm test -- tests/view/end-window-game.test.mjs`
- **Depends on:** Slice 6 · Slice 11

### Slice 15 — The card of a solved map counts with the chest and has no mark of a rehearsal

- **Goal:** At a character in „Kto idzie” of a solved map, „Wejdzie: …” counts what enters from the
  chest as at any other map, and the mark under „Wejdź” is gone with its function, constant,
  stylesheet rule and the comments that speak of it (To do item 4; D-251 withdrawn, Foundation
  entries row D-329). `guidelines/styleguide-browser-view.md` says the same: in "The screen Mapy" the
  mark and D-251 leave the list of decisions and the text, the role of the resurrection line speaks
  of zero uses (row D-217), and in "The end-of-run window" the role of the line in `danger` speaks of
  no use left (row D-216); the guidelines keep their form. The comments of `maps-screen.css`,
  `maps-screen.tsx` and `trip-lines.ts` that name D-251 or the mark are rewritten, and the comment of
  `maps-screen.css` on the role of the resurrection line speaks of zero uses. In
  `tests/view/trip.test.mjs` and `tests/view/maps-screen.test.mjs` the cases of the mark go with
  their reason (D-251 withdrawn), a case holds that a solved map counts „Wejdzie: …” from the chest,
  the cases that set the old field read the uses, and their `decision:` lines of D-189, D-214, D-217
  and D-329 quote them as they stand now, none of D-251 left.
- **Change:** `src/browser/view/trip-lines.ts` · `src/browser/view/maps-screen.tsx` ·
  `src/browser/maps-screen.css` · `guidelines/styleguide-browser-view.md` ·
  `tests/view/trip.test.mjs` · `tests/view/maps-screen.test.mjs`
- **Read:** `guidelines/coding.md` · `guidelines/testing.md` · `guidelines/coding-browser-module.md`
  · `src/browser/AGENTS.md` · `.runs/task-cycles/zapas-i-wskrzeszenie/task.md:29-35` To do (items
  1–7) · `.runs/task-cycles/zapas-i-wskrzeszenie/task.md:81-81` Questions to settle (question 6, the
  warning) · Foundation entries row D-189 · row D-214 · row D-216 · row D-217 · row D-329 · row
  D-251 · `foundations/decisions.md:8490-8509` D-188 · `foundations/decisions.md:9812-9857` D-326 ·
  D-327 · `foundations/part_map.md:3-31` browser-view · `foundations/part_map.md:139-157`
  agent-workflow
- **Model:** cheaper
- **Risk:** none
- **Checks:** first a case of `tests/view/trip.test.mjs` in which „Wejdzie: …” at a solved map is
  cut by the chest; then `npm test -- tests/view/trip.test.mjs` ·
  `npm test -- tests/view/maps-screen.test.mjs` ·
  `npm test -- tests/invariants/test_browser_view_token_values.py` · `npm run typecheck`
- **Depends on:** Slice 12 · Slice 14

### Slice 16 — Nothing in the simulation takes from nowhere

- **Goal:** With the view no longer calling them, `takeFromNowhere`, the branch of `sendTake` with
  no chest and `clippedTake` leave `trip.ts`, `sendTake` taking a chest always; the cases of
  `tests/sim/trip.test.mjs` that hold them go with their reason (Foundation entries row D-189) and
  the comment naming D-251 goes with them. No behaviour of the game changes.
- **Change:** `src/browser/sim/trip.ts` · `tests/sim/trip.test.mjs`
- **Read:** `guidelines/coding.md` · `guidelines/testing.md` ·
  `guidelines/coding-simulation-module.md` · `src/browser/view/trip-lines.ts` · Foundation entries
  row D-189 · row D-251 · row trip-transfer · `foundations/part_map.md:33-64` simulation
- **Model:** cheaper
- **Risk:** none
- **Checks:** `npm run typecheck` · `npm test -- tests/sim/trip.test.mjs` ·
  `npm test -- tests/view/trip.test.mjs`
- **Depends on:** Slice 3 · Slice 15

### Slice 17 — The screen of a run of a solved map says what holds now

- **Goal:** On the screen of a manual run of a solved map the line of D-215 reads as question 6
  gives it (Foundation entries row D-215), from game minute zero until „Restart” or „Zakończ”, in the
  same place and role. The cases of `tests/view/trip.test.mjs` and `tests/view/world-area.test.mjs`
  that hold the line, and those of `world-area.test.mjs` that set the old field of the resurrection
  or expect the old rule of the run (no deposit, no preview „Wyniesie: …”), read the new ones with
  their reason, and their `decision:` lines of D-215 quote it as it stands now.
- **Change:** `src/browser/view/trip-lines.ts` · `tests/view/trip.test.mjs` ·
  `tests/view/world-area.test.mjs`
- **Read:** `guidelines/coding.md` · `guidelines/testing.md` · `guidelines/coding-browser-module.md`
  · `guidelines/styleguide-browser-view.md` · `src/browser/AGENTS.md` ·
  `.runs/task-cycles/zapas-i-wskrzeszenie/task.md:80-80` Questions to settle (question 6, the screen of
  the run) · Foundation entries row D-215 · row D-189 · row D-190 ·
  `foundations/decisions.md:8455-8474` D-186 · `foundations/part_map.md:3-31` browser-view
- **Model:** cheaper
- **Risk:** none
- **Checks:** first the case of `tests/view/trip.test.mjs` that holds the new line; then
  `npm test -- tests/view/trip.test.mjs` · `npm test -- tests/view/world-area.test.mjs`
- **Depends on:** Slice 6 · Slice 11 · Slice 15

### Slice 18 — The test of the page holds the change

- **Goal:** In `tests/view/account-screen.test.mjs` the version of the saved shape is 8 and the one
  before it 7 (Slice 6); the states it builds set the team's uses, not the old field; the cases of
  the resurrection line expect the lines of question 6; the settlement of a death that spent a use
  holds its uses left; the case of the mark of a rehearsal goes with its reason (D-251 withdrawn) and
  the comment naming D-251 is rewritten; a case that expects a run of a solved map to leave the chest
  as it was expects what Slice 3 made; and each `decision:` line of D-189, D-217, D-240 and D-251
  quotes a sentence as it stands now, none of D-251 left. Edit the file by searching it, not by
  reading it whole: it holds about 359 000 characters. Then the foundation check reports nothing.
- **Change:** `tests/view/account-screen.test.mjs`
- **Read:** `guidelines/coding.md` · `guidelines/testing.md` · `guidelines/coding-browser-module.md`
  · `guidelines/styleguide-browser-view.md` · `src/browser/AGENTS.md` ·
  `.runs/task-cycles/zapas-i-wskrzeszenie/task.md:73-81` Questions to settle (question 6) ·
  Foundation entries row D-189 · row D-217 · row D-240 · row D-251 · `foundations/part_map.md:3-31`
  browser-view
- **Model:** same - the orchestrator raised it from `cheaper` at the plan's review: the executor edits a file of about 143 000 tokens by search, with 20 or so local edits, and a slip there fails a gate nobody runs per slice.
- **Risk:** none
- **Checks:** `npm test -- tests/view/account-screen.test.mjs` ·
  `python -B .the-way/elements/common/foundation_check.py`, which reports nothing
- **Depends on:** Slice 6 · Slice 11 · Slice 15 · Slice 17

## Coverage

| What the task requires | Slices or entries |
|---|---|
| To do 1 — a manual run of a solved map takes from the chest, „Restart” included | Slice 3; entries D-189, D-179, D-214, `trip-transfer`, `solved-map-manual-run`; Slice 16 removes the take from nowhere |
| To do 2 — such a run brings out to the chest, pays no practice; the window shows D-185; death, „Zakończ”, „Restart” lose what was carried | Slices 2, 3, 17; entries D-189, `trip-run-end`, `solved-map-manual-run` |
| To do 3 — uses and renewal in data (3, 4 h), full at a new game, one clock, first solving returns one, settlement holds uses left, load checks it, catch-up order | Slices 6, 7, 8, 9, 13; entries D-190, D-220, D-240, D-242, `resurrection-renewal` |
| To do 4 — texts: screen of the run, line at characters, end window, „Wejdzie: …” from the chest, warning gone, styleguide | Slices 12, 14, 15, 17, 18; entries D-215, D-216, D-217, D-329 |
| To do 5 — the instrument counts uses with the game's functions; switch and skill speak of uses; guidelines of the kind kept | Slice 10; entry D-428 |
| To do 6 — measurement on three maps, table without programs, stop rule | Slice 4 |
| To do 7 — the projected entry, the changed entries, D-251 withdrawn and every reference rewritten | Slices 1, 11; references: Slices 15, 16, 18 |
| Settlements row 1 | Slice 1 (D-189) |
| Settlements rows 2, 3, 4 | Slice 1 (D-190) |
| Settlements row 5 | Slice 1 (D-220) |
| Settlements row 6 | Slice 11 (D-217) |
| Settlements row 7 | Slice 11 (D-216) |
| Settlements row 8 | Slice 11 (D-215) |
| Settlements row 9 | Slice 1 (glossary `resurrection`) |
| Settlements row 10 | Slice 1 (D-428) |
| Question carried — *Verification* of the new decision | Slice 1, chosen by its author within the task's bounds |
| Question carried — how the instrument builds the state of question 13 | Slice 4, chosen by its author |
| Question 15 — the list of data bounds in `guidelines/coding-saved-game.md` | Slice 6 |
| Question 11 — a row for each new file of code in `guidelines/coding-balance-instrument.md` | Slice 4 |

## Choices

| Choice | Way rejected | Cost if wrong |
|---|---|---|
| The foundation entries are written in two slices of their own (Slice 1, Slice 11), before the code that needs them | each entry in the slice of its code (WAY-69) — those slices would each read the skills and templates of the foundation, and the slices of the shape of the state are already at the limit of their reading | from Slice 1 to Slice 18 the foundation check reports the `decision:` lines and D-251 references that later slices fix; a slice that stops halfway leaves them |
| The measurement (Slice 4) comes right after the rule of the manual run (Slice 3), before the uses of the resurrection | the measurement after every other slice | the measurement does not depend on the resurrection; measured last, a map that cannot be solved would stop the cycle after all the work of the view |
| The view reads the team's resurrection through one function of the simulation, introduced alone (Slice 5) before the shape changes | `team-lines.ts` changed in the slice of the shape — the build checks types, so the view must compile there, and that slice would read the guidelines of the view on top of the load and its tests | one slice more; if the function's shape does not fit the lines of question 6, Slice 12 changes it in `game.ts` too |
| The shape of the team and its rules (Slice 6) apart from the tests of the load (Slice 7), both marked trust boundary | one slice with `tests/sim/saved-game.test.mjs` (about 135 000 characters) — over the limit of reading | between Slice 6 and Slice 7 the load has no test of its refusals; the review of Slice 6 sees the code, of Slice 7 the refusals |
| The rules of the uses are tested first in the existing `tests/sim/team.test.mjs` | a new test file — `stryker.config.json` would need its row (`mutation-test-selection`) | `team.test.mjs` grows with cases of deaths and completions as well as of the team |
| The count of uses gets a new key in the game's data and the renewal keeps `resurrectionRenewalRealMinutes`, now for one use | renaming the key — `end-window-lines.ts` and the instrument would have to change in the slice of the shape | a key whose name says less than it means |
| The rules of the uses stay in `game.ts` (681 lines of code of the 800 of D-425 at the base) | a new module of the simulation with its row in `guidelines/coding-simulation-module.md` | if Slices 3, 5 and 6 bring `game.ts` over 800, the size test fails and a move becomes needed |
| The take from nowhere stays in `trip.ts` until the view stops calling it (Slice 16) | removing it in Slice 3 — the view would not compile | dead exports between Slice 3 and Slice 16 |
| The new mode of the instrument is `balance/progression.mjs` with `tests/balance/progression.test.mjs`, and both copies of the skill `loop2-balance` describe its command | the measurement as a one-time script outside the instrument, or the skill silent on it | a further mode of the instrument to keep; a name the author may find wrong — renaming is the author's to report |
| `account-screen.test.mjs` changes in one slice of its own, last (Slice 18), its agent editing by search | its changes spread over the slices of their subjects — the file counts whole in each, about 143 000 tokens | from Slice 6 on that file fails until Slice 18 |
| The player descriptions of `balance/players/`, the glossary term `generation number` and D-386 stay as they are | rewording them — "ready" reads as "with a use left", and the task does not carry those entries | a reader who takes "ready" as the one resurrection of today |
| The styleguide and the guidelines of the saved game and of the instrument are edited in the slices that change what they describe, keeping the form of their files | the skills `the-way-maintain-styleguide` and `the-way-maintain-coding-guidelines`, which lead refinement with the human, not the cycle's writing of what the task settled | a change of form a review of guidelines would ask for |
