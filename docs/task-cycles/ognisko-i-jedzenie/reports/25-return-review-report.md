FAIL 105e4b9a27ba495bbc1de5da6bf33fb130659aee

# Review of the return step — cycle `ognisko-i-jedzenie`

Range `4dc4ca442f963e490db204d332495473c0f478f0..105e4b9a27ba495bbc1de5da6bf33fb130659aee` (589ee33,
105e4b9), branch `task/ognisko-i-jedzenie`; `git rev-parse HEAD` = the head given. Reviewed against
the frozen task (`task.md`, read whole), the reviewed spec's Decision 1 steps 4–5 and its weighed
ways (`spec.md:163`–`:177`, `:204`–`:230`), step 11 and the foundation step's paragraph of
`.the-way/task-cycle/skill/SKILL.md`, and the code at the head.

Blocking: 1 (Important). Minor: 3. Out of scope: 0.

## Critical

none

## Important

### I-1 — glossary `extinguished campfire` is built from an MVP choice but does not open with "In the MVP"

- Place: `foundations/glossary.md`, entry `extinguished campfire` (new, 589ee33):
  "An extinguished campfire is a campfire standing on its tile with no minutes of burning left,
  whether it has burnt out or has not been lit yet."
- What is wrong: the entry records a choice made for the MVP, but it is worded as a permanent
  meaning of the word. The return step's report says it writes the cycle's choice "a never-lit
  campfire and a burnt-out one share one state, shown „ognisko — wygasłe”" as this term. That choice
  comes from the MVP choices: *To do* 15 (Q11, part 2, way A) gives a campfire's row only the
  two forms „ognisko — płonie, zostało 42 min” and „ognisko — wygasłe”, so a crafted campfire that
  has never been lit (*To do* 7, „niepłonące ognisko”) reads „wygasłe”. The human's rule for the
  round (task, *Context*) says: „Kandydat zbudowany z wyboru na MVP mówi, co gra robi teraz, zaczyna
  się od „W MVP” …”. Its purpose is the human's reservation under Q9: „to są elementy na potrzeby
  mvp / docelowo się zmienią, więc chciałbym uniknąć sytuacji w której decyzje będą kategorycznie
  zabraniać alternatyw”. The glossary entry this cycle built from row 7 already follows that rule
  (`map run restart`: "In the MVP, a map run restart is …"), and D-61 and D-63, which use the
  word, open with "In the MVP" as well. This entry does not.
- Why it matters: task 9 (Płomyk) remakes lighting, and later tasks may want an unlit campfire
  as a state of its own. Without the marker, the glossary tells them that a never-lit campfire *is*
  an extinguished one, as a standing meaning of the word, so a separate "unlit" state would read
  as a use against the entry instead of as the next choice. The human asked for exactly this to be
  avoided.
- Evidence: the entry's text at the head; `foundations/glossary.md`, entry `map run restart`; task
  *Context*, the paragraph "Brzmienie kandydatów…"; *To do* 7 and 15; return-step report, *Judged,
  nothing written*, "Never-lit and burnt-out campfire sharing one state — written as the glossary
  term above". Code: `src/browser/sim/types.ts:86` ("0 means extinguished, standing on its tile
  unlit"), `src/browser/view/tile-list.ts:49`.
- Recommended fix: through `the-way-record-glossary-term`, "In the MVP, an extinguished campfire is
  a campfire standing on its tile with no minutes of burning left, whether it has burnt out or has
  not been lit yet." The meaning stays the same. The definition holds no excluding word.

## Minor

### M-1 — D-60's first complies example reads as two pieces for a tile that may be only one short

- Place: `foundations/decisions.md`, D-60, *Verification*, complies: "a tile of Las whose sticks fall
  below its starting stock in game minute 45 gaining a stick in game minute 60 and another in game
  minute 90".
- What is wrong: the gain in minute 90 happens only where the tile is still below its starting
  stock after minute 60, which means it was at least two pieces short. The code renews only up to
  `resource.stock` (`src/browser/sim/world.ts:59`–`:63`). A tile one stick short, as one
  gathering leaves it, is full again in minute 60 and gains nothing in minute 90. Read that way, the
  example says the opposite of the decision's own bound ("up to its starting stock").
- Why it matters: an agent that checks a change against this example could expect a gain above
  the starting stock, or could take a correct change for a violation.
- Evidence: `worldMinute`, `src/browser/sim/world.ts:41`–`:69`; Las sticks `stock: 12,
  renewMinutes: 30` (`src/browser/sim/data/maps.ts:35`). Suggested wording: "whose sticks fall two
  below its starting stock in game minute 45".

### M-2 — `test_action_in_progress.py`'s new reading line gives the wrong length for its map runs

- Place: `tests/invariants/test_action_in_progress.py:21`–`:22`: "the map runs below pass at most 45
  game minutes, and none ends within them".
- What is wrong: no map run in the file passes more than 25 game minutes. The calls are
  `scenario(MAIN, 25)`, `scenario({0: PA_HOLDS}, 0)`, `scenario({0: PA}, 20)` and
  `scenario({0: PA, 5: PA_HOLDS}, 25)` (`:189`, `:229`, `:233`, `:237`). 45 is the end minute of
  the expected `EXPLORATION_FROM_25`, which is never reached. The statement is not false (25 ≤ 45),
  but it misstates what the test covers.
- Why it matters: a later reader who sizes a scenario change on "45" gets a figure that does not
  come from the test.

### M-3 — `test_player_map_run_pace.py`'s new reading line says none of its map runs ends, though the scenario ends two

- Place: `tests/invariants/test_player_map_run_pace.py:21`–`:22`: "the map runs below pass at most
  212 game minutes, and none ends within them".
- What is wrong: the scenario replaces its first map run with `restart` at minute 212 and ends the
  second with `end` (`:97`, `:100`). What actually holds is narrower: none of its map runs ends in
  death, and the scenario passes no real time to a map run after it has ended. The figure 212 is
  right, and the claim about death holds. On my count of the Las numbers, the character loses at
  most about 79 health by minute 212: chilled from minute 84, hungry from minute 117, at 0.35 each.
- Why it matters: this line is the test's reading of the clause "until it ends", which is the one
  part of the sentence this range adds. The line should say what the scenario does to that clause.

## Invariants changed (WAY-03)

- `action-in-progress`: "lasts its full duration" became "lasts its full duration unless its map
  run ends first". A decision calls for this: D-54 / row 5, death "także w trakcie trwającej akcji".
  The meaning the task gives is kept. Task *Context* already reads the invariant as being about an
  action in a map run that is still going on, and the new clause states that reading. It also covers
  the „Zakończ” that already ended a run mid-action before this task (`end`,
  `src/browser/sim/game.ts`). Altered invariant test: `tests/invariants/test_action_in_progress.py`.
  Only its docstring changed (the quoted sentence and one reading line); the assertions are the
  same.
- `player-map-run-pace`: "until it ends" was added. A rule of the task calls for it: *To do* 3, „po
  śmierci czas staje”, and D-55. The code matches: `passRealTime` returns nothing for a run ended in
  death, and a span stops at the death minute and drops the carried part of a second
  (`src/browser/sim/game.ts:307`–`:352`). Splitting a span past death is covered by
  `minute-span-split`, including `passRealTime` (`tests/invariants/test_minute_span_split.py:8`,
  `:23`–`:24`, `:140`–`:147`, `:327`–`:333`). Altered invariant test:
  `tests/invariants/test_player_map_run_pace.py`, docstring only.

Both altered tests go before the human at the merge.

## Entries judged against the code at the head — no finding

- **D-60** (the binding sentence): the code renews at whole multiples of `renewMinutes` of the run's
  `minute`, counted from 0, up to the map's stock per tile, and a tile below that stock gets the
  map's full `stock` when it is laid out (`src/browser/sim/layout.ts:39`, `:48`). No renewal
  happens in the minute of death (`run.ts`, `stepMinute`, the body is stepped before
  `worldMinute`), which fits D-64. The violates example (first gain at minute 75) is right. Row 12
  keeps its meaning, sharpened as spec Decision 1 step 4 settles it (`spec.md:163`, `:225`–`:230`).
  The Rationale and *Rejected* match the spec's weighed ways.
- **D-62**: feasibility needs the campfire to be burning at the start (`program.ts:215`–`:219`).
  At the end, `finishUse` adds the fuel's minutes to whatever is left after that minute's burning,
  zero included (`run.ts:228`–`:243`, after `worldMinute` at `run.ts:325`). I traced both complies
  examples on the code: 3 minutes left at the start of a 5-minute feeding, 0 by the 3rd minute, 20
  after the end; 150 left at the end, 170 after it. Row 14 and *To do* 9 keep their meaning; the
  timing is spec Decision 1 step 5 (`spec.md:171`–`:177`). The rationale's "fewer sticks than
  „Zapal — ognisko” uses" is 1 against 2, as the data has it. It agrees with D-64's *Accepted with
  it*.
- **D-23** (*Verification* only): the condition `temperatureBelow` has the default 36.5 and the
  minimum 30.0 (`src/browser/sim/data/conditions.ts:29`–`:33`), and the program check takes values
  on the step's grid (`game.ts:69`–`:96`). The example agrees with D-50's complies example (35.5).
  The binding sentences are unchanged.
- **Glossary `free game minute`**: in the minute of death, `stepMinute` stops before any finish
  and any pick (`run.ts:300`–`:323`). So the added "and the map run goes on" says what the code
  does. Its uses keep their meaning: D-20 (`decisions.md:438`), D-23 (`:492`), `program-rule-pick`
  (`invariants.md:236`–`:238`), and the readings in `test_program_rule_pick.py:12` and
  `test_walk_feasibility.py:12`, none of which reaches a minute of death.
- **Glossary `extinguished campfire`**: its meaning matches the code (crafting puts
  `minutesLeft: 0`, `run.ts:199`; burnt out stays at 0, `world.ts:42`–`:46`; the row reads
  „wygasłe” at 0, `tile-list.ts:49`). Its wording is finding I-1.
- **Human's rule for MVP candidates**: D-60 and D-62 still open with "In the MVP", and neither
  binding sentence holds "only", "never", "always", "without" or another word that excludes the
  alternative.

## Declined to judge

- The renumbering of this branch's D-50–D-65 against `main`'s D-50–D-56. The dispatch names it as
  known, for the reconciliation, and it is outside this range.
- The return step's concern 1, task 8's projected entry "What is a map made of?". The orchestrator
  settled it in the dispatch; it is outside the entries this range writes.
- The return step's judgements that wrote nothing (D-21, D-22, `minute-span-split`, environment
  facts, part map, the words "chilled", "starving", "carrying capacity", "trait"). Nothing in the
  range writes them, and the dispatch lists them as outside what I review. I did read the
  `minute-span-split` test, as evidence for `player-map-run-pace`, above.
- The Minor and out-of-scope findings of the review of the whole change. They are not part of this
  range.

## Checks

| Check | Result |
|---|---|
| `git rev-parse HEAD` in the worktree | `105e4b9a27ba495bbc1de5da6bf33fb130659aee`, the head given |
| `git diff` / `git log` `4dc4ca4..105e4b9` | 2 commits, 5 files: decisions, glossary, invariants, two invariant tests |
| `python -B .the-way/elements/common/foundation_check.py` (worktree root) | exit 0, "0 errors" |
| `python -B -m unittest test_action_in_progress test_player_map_run_pace` (in `tests/invariants`) | exit 0, 4 tests OK; they build in a temporary copy, and `git status --short` was empty after the run |
| Manual: D-62's complies examples traced through `stepMinute` → `worldMinute` → `finishUse` | both hold |
| Manual: D-60's examples traced through `worldMinute` | violates example holds; the first complies example is ambiguous (M-1) |
| Manual: map-run lengths and endings in both altered tests | M-2, M-3; no death within 212 minutes on the Las numbers |

Not run: the full `npm test`, which is the cycle's own run. The range changes only Markdown entries
and two docstrings. I did not see the two altered tests fail, since their assertions did not change.

## Reaches beyond the dispatch

- `src/browser/sim/world.ts`, `run.ts`, `program.ts`, `game.ts`, `layout.ts`, `types.ts`,
  `data/maps.ts`, `data/conditions.ts`, `src/browser/view/tile-list.ts`, and a grep of
  `program-editor.ts`: to compare each entry with the code at the head.
- D-61, D-63, D-64 and D-65 whole, plus D-50's *Verification* lines found by search: D-61 and D-63
  use "extinguished", D-64 sets the order of a minute that D-60 and D-62 depend on, and D-50 sits
  beside D-23's new example.
- Glossary entries `map run restart` and `free game minute`, and the places that use "free game
  minute", found by search: to check I-1 against the precedent and to check that the uses keep their
  meaning.
- `tests/invariants/test_minute_span_split.py`, found by search: to confirm that the clause the
  altered docstrings pass to `minute-span-split` is covered there.
- `spec.md:163`–`:230`, found by search: the source of D-60's and D-62's new wording.
