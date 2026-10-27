# Planner report — task cycle odkrywanie

- Status: done with concerns
- Plan: `.runs/task-cycles/odkrywanie/plan.md`
- Size report: `.runs/task-cycles/odkrywanie/plan-size.md` — `python -B .the-way/task-cycle/slice_size.py .runs/task-cycles/odkrywanie/plan.md`, exit 0, all 12 slices `fits` (largest: Slice 7, about 99 000 tokens to read, 6 files; Slices 4 and 5 change 10 files each, at the limit)
- Check result: the slice-size script passed; no product test and no `foundation_check.py` ran — the planner writes no code and no foundation entry
- Method: `.the-way/task-cycle/plan/SKILL.md` at the pinned commit 574a37b (gitlink and checkout verified equal)

## Open design choice

None found. Reading the code showed no entry the change needs beyond rows O1–O9, the projected
entries and terms the task carries, and one entry that follows from O8 (below, concern 1). Every
other choice is a choice of how to make what the task and the foundation settle; each stands in
the plan's *Choices* with the way rejected and its cost.

## The cut

Twelve slices, made one after another:

1. Data: five skills, the mage's predispositions, the chain of revelations, the campfire's identifier.
2. The Understanding in `GameState` and the repertoire computed from it (no gating yet).
3–7. Mechanical test moves: every existing test that sends a character and passes game time starts
   from a game whose Understanding holds everything the data lists — 15 simulation test files, 5
   view test files, 19 invariant test files and two fixtures, behaviour-neutral, cut at the limit
   of 10 changed files.
8. The simulation carries out only the repertoire (gating in `game.ts` through a reduced program).
9. Discoveries in D-71's order, the Understanding growing, the rule at the first chill, a
   `discovered` event.
10. Time stops after a discovery minute; `GameState.discovery`; O4 and O5 rewritten with their tests.
11. The editor offers the repertoire; „Dodaj regułę” inactive until an action is known.
12. The `discovery` line under the status row.

Why the move of the tests stands apart: once a new game knows "Zawsze" alone, every existing test
whose program acts from minute 0 waits until minute 84 and then stops for a discovery. About
forty test files would change inside the gating slice. Moving them first to a fully knowing game —
where nothing is ever discovered and every rule is in the repertoire — keeps them testing what
they test, and lets Slices 8–10 change only the files of their own behaviour. Keeping the
signatures of `newMapRun`, `stepMinute`, `chooseActivity`, `actionFeasible` and `conditionHolds`
(*Choices*, rows 1 and 3) spares about a hundred direct calls in eight simulation test files.

## Concerns

1. **An entry beyond the rows: `program-rule-pick`.** Its sentence (`foundations/invariants.md:244-257`)
   has the character start "the first program rule whose condition holds and whose action the
   character can carry out then". After O8, a rule whose condition is outside the repertoire is
   passed over even where it holds, so the sentence becomes false. O8 settles the meaning (pass
   over, as an action that cannot be carried out), so this is no open design choice; the plan's
   *Foundation entries* lists the changed invariant as following O8, with its check in Slice 8.
   The foundation step has to write it beside O8. Proposed: yes, written in the same step as O8.
2. **D-23 and its example.** The task (`task.md:121`) says task 5 wrote D-23 anew with the
   example "a condition picker listing the conditions of the repertoire". The current D-23
   (`foundations/decisions.md:466-501`) reads "the conditions of the closed list". After this
   task, the picker lists the repertoire. O8 also narrows D-23's first sentence the way it
   narrows `program-rule-pick`. Proposed: the writer of O8 sets O8's relation to D-23 and judges
   whether D-23's wording follows. The return step compares D-23 with the code. No slice
   depends on it.
3. **The test moves are only proven by Slice 8.** Until the gating exists, a missed test passes
   in Slices 3–7 anyway. The rule for what moves is mechanical (a game that is sent and passes
   game time), and Slice 8's *Checks* tell its executor to return a missed test, not change it.
   Residual cost: a return and a small fix slice.
4. **Files created by earlier slices cannot be named in *Read*.** `slice_size.py` counts only
   files that exist at the plan's base, so a slice that needs a file an earlier slice creates
   (`skills.ts`, `revelations.ts`, `understanding.ts`, `tests/sim/understanding-fixture.mjs`,
   `tests/sim/repertoire.test.mjs`, `tests/sim/discovery.test.mjs`) names the creating slice's
   section of the plan instead. Proposed: at dispatch, the orchestrator adds those paths to the
   handoff's *Read*.
5. **The base gate is red on three tests, for a missing tool.**
   `reports/00-baseline-gate.log` shows errors in `test_loop2_one_serving_process` (setUpClass),
   `test_ruff_source_rules` and `test_shellcheck_source_rules`, each a `FileNotFoundError`.
   Every slice's *Checks* says "nothing beyond the base's three failures". The Ruff check of the
   Python test changes in Slices 5–8 and 10 therefore stays unchecked on this machine.
6. **Manual browser checks.** Slices 11 and 12 name a manual check in a real browser (D-88). An
   executor without a browser leaves it unchecked and must say so.
7. **Cost.** Five of the twelve slices are mechanical test moves on the cheaper class. Under the
   human's instruction for this cycle, every slice runs on sonnet anyway, since none has a
   *Risk*.

## Guidelines found missing or uncertain

- `guidelines/coding-content-data.md` § Files of this kind leaves out `campfire.ts`, `items.ts`
  and `traits.ts`. `guidelines/coding-simulation-module.md` leaves out `body.ts`,
  `character.ts` and `world.ts`. It is unclear whether those tables must list every file of
  their kind. If they must, the new `skills.ts`, `revelations.ts` and `understanding.ts` join
  them. The plan does not add them. The tables are guideline files of the part
  agent-workflow, not in any slice's *Change*.
- `guidelines/testing.md` does not say where a fixture shared by test files belongs. The plan
  follows the existing `tests/sim/program-fixture.mjs` and `tests/invariants/program_fixture.py`.
- `guidelines/testing.md` § Not tested on purpose leaves real-browser checks manual (D-88), so the
  editor's disabled button and the discovery line have no automatic check in a real browser.

## The styleguide's order of work

The example "Plan of a user-interface change" (`guidelines/styleguide-browser-view.md:295-302`)
goes from environment and library, through values in their source, to one screen and then its
states. This change needs no new font, token, control or role: `--discovery` already stands in
`src/browser/tokens.css:31`, and the disabled state of the shared button exists. The plan
therefore starts the interface at "one screen", after the simulation it draws from: the editor
(Slice 11), then the status row's line (Slice 12). That follows the example's order, with its
first two steps already done.

## Reaches beyond the dispatch

- `.the-way/product-guidelines/reading.md` and `.the-way/elements/common/way_of_working.md`
  § Reading the foundation: the selection method the plan skill names.
- `foundations/decisions.md`: D-61 (death in the minute, Slice 9), D-43 (values in place of
  tokens, Slice 12), D-34, D-35 and D-36 read for the kinds of code the slices change. D-34–D-36
  were named by the dispatch; D-61 and D-43 were not.
- `foundations/invariants.md`: every invariant whose test a slice alters (the moves of Slices
  5–7): map-run-repeatability, simulation-randomness, exploring-reveal, move-reach,
  walk-target, map-run-tiles, restart-seed, terrain-drawing-numbers, walk-feasibility,
  program-world-reference, map-run-layout; plus browser-view-framework,
  browser-view-token-values and mutation-test-selection for the slices touching those rules.
- `foundations/glossary.md`, read whole (it is short).
- `tests/sim/rules.test.mjs:225-250` (rule S2: no content identifier outside `src/browser/sim/data/`),
  which forces the chain into data.
- `stryker.config.json`: a new `tests/sim/*.test.mjs` must be listed for
  `tests/quality/test_mutation_test_selection.py`.
- `tests/invariants/test_simulation_inputs.py` header: it calls every exported function, also ones
  not in its table.
- `scripts/test.py:11`: `tests/sim/*.test.mjs` and `tests/view/*.test.mjs` enter `npm test` by
  pattern.
- `reports/00-baseline-gate.log`, for the base's failures.
- The cycle record `.runs/task-cycles/odkrywanie/cycle.md`, for Q-C1–Q-C3 and the human's
  instruction on models.

## Questions still open

None blocks the plan. Concerns 1 and 2 are for the foundation step, with the proposed answers
given there.
