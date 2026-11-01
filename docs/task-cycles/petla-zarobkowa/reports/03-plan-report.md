# Plan report — task `petla-zarobkowa`

- Status: `done with concerns`
- Plan: `.runs/task-cycles/petla-zarobkowa/plan.md`
- Final size report: `.runs/task-cycles/petla-zarobkowa/plan-size.md` — exit 0, all six slices `fits`;
  largest reading about 166 000 estimated tokens (Slice 1); Slices 1 and 5 change ten files each,
  the limit.
- Checks run: `python -B .the-way/task-cycle/slice_size.py` on the plan; `foundation_check.py` on the
  base, 0 errors. Not run, as the handoff says: `npm test`. No code and no test was run or written.
- Open design choice: none found (section 2 of the method). Reading the code gave no entry beyond the
  task, the projected entries and the spec, and no way costly to turn back. No question stays open.

## The plan in short

The foundation entries come first, by the cycle's agent for them, then six slices, each after the
one before:

1. The saved document of version 3, with stamped saves — trust boundary and the raise of the version.
2. The life of a loop in the simulation: start, minutes, ends, stop.
3. Time for loops, the catch-up and its report.
4. The clock drives loops, and the saver follows.
5. The character's row in the headquarters.
6. The report in the headquarters.

## Departures from the spec's section 17, each in *Choices*

- The stamping of saves (`game-saver.ts`, `game-view.ts`, the `moment` option, `keep()`) moves from
  the view's cut into Slice 1, so the branch never holds a saver that writes what its load refuses,
  which the spec reviewer's first note named, and each changed test changes once.
- `trip.ts` moves from the simulation's cut to Slice 5, with the mark: a loop's run needs no change of
  it, as `tripLoot` takes a `Pick` of the run and `takeTrip` serves as it stands.
- The first cut is three slices and the view's cut three. Section 17's third cut is the plan's
  *Foundation entries*, save the styleguide's sentence on destructive buttons, which goes with the
  button in Slice 5, since the entries' agent writes no guideline.

## Concerns

1. **The spec reviewer's first note is incomplete.** Beyond the six lines it names, the raise and the
   refused null reach:
   - `tests/view/account-screen.test.mjs`: `VERSION = 2` at `:1060`, `saveOf` at `:1068` and
     `submission` at `:1073`, used 11 times, and the case „another version” at `:1715`, which takes 3,
     from now on the current version;
   - `tests/view/game-saver.test.mjs:174` (`submissionOf`, 7 uses) and `:274`, which compare what is
     sent with an unstamped `savedGame`;
   - `tests/sim/saved-game.test.mjs:712`–`:733`, where 3 stands for another version.
   Slice 1 carries them all, with their cause. That puts it at exactly ten files.
2. **Slices 1 and 5 stand at the limit of ten files.** One more file makes either `too large`. A slice
   that finds it needs another file should report it, and the orchestrator returns it rather than
   letting it grow. This is why no sentence goes into `guidelines/coding-saved-game.md` in Slice 1;
   the spec leaves it optional.
3. **The shape is written before the code that fills it.** Slice 1 holds a hand-written document with a
   loop; the first state the simulation really makes with a loop comes in Slice 2, and Slices 2 and 3
   test the round trip. A refusal there is a structural mismatch that reopens the trust-boundary file,
   so such a reopening needs a review of its own. This is the price of one review for the boundary.
4. **`foundations/invariants.md` changes in Slices 2 and 3.** WAY-61 says an invariant whose test is
   not written yet reads `review`, so the entries' agent writes the four new invariants with that
   *Method* and the slice that writes the test sets `test`. The entries' handoff has to say so, and the
   mechanical check of those slices has to expect the file.
5. **`tests/invariants/test_simulation_inputs.py` reaches no state with a loop.** Its pool calls new
   exports automatically, but on states without a loop, where they return at once. Slice 2 therefore
   holds `simulation-inputs` on frozen inputs in `tests/sim/loop.test.mjs`; Slice 3's functions are covered
   only by the pool unless its agent adds the same; the orchestrator may want to name that in its handoff.
6. **loop's tests stand outside the repository.** P6 makes them bind, and the spec takes them as cases,
   so Slices 2 and 3 name them in *Read* in plain text, at `C:\Storage\repos\loop`, commit `cdc7c0d`,
   which is present there. `slice_size.py` cannot count them, so those two slices read somewhat more
   than the report shows. The handoff has to pass the command, and that only tests are to be read.
7. **The browser check has no settled way to reach its states.** D-75 and D-87 give a manual check in
   a browser, yet no foundation entry or guideline says how to reach a solved map in a running game.
   Slices 5 and 6 name a crafted saved document as a way and report a state not reached as unchecked.
   Whether `npm run dev` runs in the worktree as it stands was not tried.

## Notes for the entries' agent, carried in the plan's table

- Note 2 of the spec's review stands in the row D-207: the clause of its *Verification* narrows to no
  loop passing.
- Note 3 of the spec's review became a choice: a line of a loop that stopped keeps `practice` `{}`
  (Q13, loop's `src/sim/chest.test.ts:550`), since the load refuses anything but positive counts.
  It binds Slice 3 and the entry on the report.

## Guidelines found missing or uncertain

- `guidelines/coding-simulation-module.md`, *Files of this kind*: `src/browser/sim/loop.ts` is not
  listed, and neither are `trip.ts` or `skills.ts`. Whether a new module joins the table is unclear;
  the plan does not add it. The same holds for `away-report.ts` in `guidelines/coding-browser-module.md`.
- `guidelines/coding-saved-game.md` says nothing of a loop's run; its rules hold without it.
- `guidelines/styleguide-browser-view.md`, *States of shared controls*, lists the destructive buttons
  and needs „Zatrzymaj”: Slice 5.
- `guidelines/testing.md` has no recipe for reaching a game state in a browser check (concern 7).

## The styleguide's order of work

Followed in its later half and shortened in the first: the change adds no environment, library or
token, so those steps have nothing to do. The plan goes from the machinery with no screen (Slice 4)
to one screen, the row (Slice 5), then to its other state, the report (Slice 6). No new shared
control or state, so the kitchen-sink page does not change.

## Reaches beyond the dispatch

| What | Where | Why |
|---|---|---|
| The foundation step, the planning route, a slice's reading, the UI check, cycle steps 8–9, the record's *Slices* | `.the-way/task-cycle/skill/foundation_step.md`, `.the-way/task-cycle/skill/planning.md`, `.the-way/task-cycle/change/slice.md`, `.the-way/task-cycle/change/ui_check.md`, `.the-way/task-cycle/skill/SKILL.md`, `.the-way/task-cycle/record_template.md` | To place the entries before Slice 1 and write what a slice's agent gets |
| Reading the foundation; reading guidelines; invariant *Method* | `.the-way/elements/common/way_of_working.md`, `.the-way/product-guidelines/reading.md`, `.the-way/elements/invariants/template.md` | The rules of *Read*; WAY-61 |
| The citation check | `.the-way/elements/common/foundation_check.py` | Whether an invariant needs a test at once: it does not |
| `tests/view/account-screen.test.mjs`, `tests/view/clock.test.mjs`, `tests/view/headquarters.test.mjs`, `tests/sim/rules.test.mjs`, `tests/sim/purity.test.mjs`, `tests/sim/random.test.mjs` | as named | What the raise turns red; where view behaviour is tested |
| `tests/invariants/test_simulation_inputs.py`, `tests/invariants/test_minute_span_split.py`, `tests/quality/test_mutation_test_selection.py` | as named | How new exports and a new `tests/sim` file are caught |
| `src/browser/sim/skills.ts`, `src/browser/sim/run.ts`, `src/browser/view/character-skills.ts`, `src/browser/view/program-panel.ts`, `src/browser/view/controls/button.ts` | as named | „Kup”, `stepMinute`, `nextShown`, the destructive button |
| D-42, D-53, D-75, D-87, D-88, D-119, each whole or by heading; D-204, D-97 by heading | `foundations/decisions.md` | Focus, sending, browser checks, widening repertoire. D-42, D-53 and D-119 stand in slices' *Read* |
| Invariants `content-identifiers`, `browser-view-token-values`, `browser-view-focus-outline`, `expired-session-unsaved-progress`, located by heading and not read whole | `foundations/invariants.md` | They stand in slices' *Read* for the parts touched |
| The glossary, by heading | `foundations/glossary.md` | Ranges for *Read* |
| The local run; the map of repositories | `README.md`, `C:\Storage\repos\repos_map.md` | `npm run dev`; where loop stands |
| loop's repository, only that its test files and commit exist | `C:\Storage\repos\loop` | P6; concern 6 |

**Searches not found or unclear:**

- `.the-way/task-cycle/implement/SKILL.md`, a path I guessed, does not exist; the cycle's skill is
  `.the-way/task-cycle/skill/SKILL.md`.
- A settled way to reach a solved map in a running game for a browser check: not found (concern 7).
- Whether a new module has to join a guideline's *Files of this kind*: unclear.
- The spec's words "the gain in the loop's `practice`" on a stopped line: unclear, settled as a choice.
- `tests/sim/saved-game.test.mjs:1687`, which the first note names, is the JSON round trip of the
  largest trip count; it uses `savedGame` on a state that needs stamping too, so it stays in the list.
