# Plan report — zapis-stanu-na-serwerze

- Status: done with concerns
- Plan: `.runs/task-cycles/zapis-stanu-na-serwerze/plan.md`
- Size report: `.runs/task-cycles/zapis-stanu-na-serwerze/plan-size.md` — `slice_size.py` exit 0,
  every slice `fits` (largest: Slice 6, about 117 000 estimated tokens; most files: Slice 9, 6)
- Method: `.the-way/task-cycle/plan/SKILL.md` at pin `a8dfe8a`; base `dce2970`. No code, no
  commit, no `npm test` run.

## Open design choice (section 2)

None. The spec settles every choice the task leaves; what the plan takes beyond it is how to make
it, listed under the plan's *Choices*.

## Slices

| Slice | Goal | Model | Risk |
|---|---|---|---|
| 1 | `src/browser/sim/saved-game.ts`: version, document, load; its test; Stryker list; part-map trust boundary | strongest | trust boundary — `src/browser/sim/saved-game.ts` |
| 2 | schema step 4 and the two database operations | same | trust boundary — `src/server/**` · cannot be undone — schema step 4 |
| 3 | `GET`/`PUT /api/saved-game`, per-route body limit of `mutationGuards`, direct refusal tests | cheaper | trust boundary — `src/server/**` |
| 4 | the client's two save methods, keepalive and the measured 64 KiB | cheaper | none |
| 5 | `src/browser/view/game-saver.ts` | same | none |
| 6 | the page: `app.ts`, `game-view.ts`, the page's tests | same | none |
| 7 | coding guidelines: the kind `saved-game` and the passages made untrue | cheaper | none |
| 8 | the testing guideline's trust boundaries | cheaper | none |
| 9 | the deploy skill, both copies | cheaper | cannot be undone — the text about schema step 4 and the merge window |

To do 14 (the violated mark of `account-save-durable-storage`) is planned as "Work after H2",
outside the slices made before the request.

## Concerns

1. To do 12 says the new kind's guideline meaning is approved by the human (WAY-172). Slice 7
   writes only the meanings of the task and spec; the foundation step should name the approval
   question (the boundary of `saved-game` against `simulation-module`, the bump rule) so it is
   shown at the blocked draft request, as the handoff gives.
2. Files that earlier slices create stand in later slices' *Read* without backticks, marked "(made
   in Slice N)" — the script cannot measure a file that does not exist yet, and the cycle
   `potwierdzenie-adresu` used the same form. So the sizes of Slices 5–8 leave out
   `src/browser/sim/saved-game.ts`, `tests/sim/saved-game.test.mjs` and
   `src/browser/view/game-saver.ts`. All of them are small next to the reading the slices already
   carry.
3. Foundation entries row 20, the exemplar decision of kind `saved-game`, goes to the foundation
   step through `the-way-record-decision`, before the file exists. My reading is that the coding
   skill's table gives entries to the foundation step and guideline files to the author. The
   handoff's wording ("through their maintain skills where a slice makes them") could also mean
   Slice 7 writes it. Orchestrator's call; plan *Choices* row 2.
4. Row 35 (the `simulation` trust boundary) has to be written in Slice 1, not in the foundation
   step: `foundation_check.py` reports a *Trust boundary* pattern that matches no tracked file.
5. `tests/deploy/test_account_storage.py` (container replacement keeps accounts and sessions;
   needs Docker) stays about accounts and sessions only. No source asks to extend it, and D-17's
   *Verification* gives H2 the clearing of `account-save-durable-storage`.

## Guidelines found missing or uncertain

- `guidelines/coding.md` names no kind for `src/server/account-routes.ts` (the route handlers).
  Slice 3 reads `guidelines/coding-http-application.md` as the nearest kind. The spec designer
  named this too.
- `guidelines/coding-browser-module.md`, *Files of this kind*, leaves out several view modules that
  exist (`account-screen.ts`, `game-view.ts`, `email-confirmation.ts`, `email-status.ts`,
  `body-row.ts`, `combat-line.ts`). This is a discrepancy under WAY-200 and I name it only. The plan
  does not add `game-saver.ts` alone (plan *Choices*).
- `guidelines/coding-database-access.md`, rule „Otwarcie schematu bez utraty danych”, says a step
  keeps "każdy wiersz kont i sesji", but task 20 also added emailed links. Slice 7 adds saved game
  states as the spec asks. Whether it also names emailed links is left to its maintainer under
  WAY-172.
- `guidelines/styleguide-browser-view.md` has no rule for the order of the header lines. Spec
  decision 6 settles it (the save sentence above the D-157 row).
- The kind `saved-game` has no guideline until Slice 7. Slice 1 reads
  `guidelines/coding-simulation-module.md`, whose *When to read* still matches the file at that
  point.

## The styleguide's order-of-work example

The example's order is fonts and library, then values in their source, then one screen, then its
states. This change adds no font, token, role, shared control or state. So the order doesn't
apply, and the browser-view slices follow their dependencies: client (4), saver (5), page (6). The
kitchen-sink page is left unchanged (plan *Choices*).

## Reaches beyond the dispatch

- Decisions D-18, D-34, D-73, D-168, D-175, D-176 (`foundations/decisions.md`). D-18: content
  identifiers the load checks. D-168: the copy whose program was deleted, which spec decision 2
  lists. D-175/D-176: the mage's nature energy, now part of the state the load admits. D-34: the
  form of an exemplar decision of a simulation-side kind. D-73: the testing discipline, for Slice 8.
- Invariants `program-closed-lists`, `program-world-reference`, `map-run-layout`,
  `nature-energy-range` (`foundations/invariants.md`), so the load refuses what these hold.
- the-way's glossary at the pin: `exemplar` (`.the-way/foundations/glossary.md:163-167`) and
  `human action` (`:79-83`), as WAY-226 asks.
- the-way files: `.the-way/task-cycle/slice_size.py`, `.the-way/task-cycle/skill/planning.md`,
  `.the-way/task-cycle/skill/foundation_step.md`, the docstring of
  `.the-way/elements/common/foundation_check.py` (whether a trust boundary may name an untracked
  file, and whether `invariant:` markers must name existing entries), `.the-way/product-guidelines/reading.md`,
  the headings of `.the-way/product-guidelines/coding/SKILL.md` and both templates, and
  `.the-way/elements/common/way_of_working.md` § Reading the foundation — to cut slices and name
  their reading.
- Product files read to cut slices: `stryker.config.json`, `tests/quality/test_mutation_test_selection.py`,
  `tests/invariants/test_simulation_inputs.py` (docstring), `tests/agent_workflow/test_loop2_deploy_skill.py`,
  `tests/startup.test.mjs:488-512`, `tests/deploy/test_account_storage.py:95-125`, the headings of
  the deploy skill's files, `src/browser/view/app.ts`, `src/browser/view/game-view.ts`, parts of
  `src/server/transport.ts`, `src/server/account-routes.ts`, `src/server/database.ts`,
  `src/browser/sim/types.ts`, and the test names of `tests/view/account-screen.test.mjs`.
- `C:\Storage\repos\loop2-wt\potwierdzenie-adresu\.runs\task-cycles\potwierdzenie-adresu\plan.md`:
  how an earlier plan of this product names files that earlier slices make.
- Entries the dispatch named that no slice reads: D-06, D-75, D-77, D-81, D-83, D-84, D-102, D-103,
  D-130, D-172. D-75 is the human's H1. D-77/D-81/D-83/D-84 come to the slices through
  `guidelines/testing.md`. D-102/D-103 limit login and registration attempts, not saving. D-130 and
  D-172 are not touched by any slice. The orchestrator may add them.

## Searches not found or unclear

- `startApp` has no test file of its own. Its tests, with their controlled client and hand-made
  document, stand in `tests/view/account-screen.test.mjs`, so Slice 6 changes that file.
- No test reads the guideline files' good/bad cases. Slices 7 and 8 check only through
  `foundation_check.py`.
- Whether the saver or the page renders the header sentence is left to the maker (spec *Left to
  maker*). Slice 5 offers the sentence and Slice 6 places it.
- I didn't find a statement in the-way of whether a plan's *Read* may name a file a previous slice
  creates. I followed the earlier plan's form (concern 2).

## Questions still open

None blocking. Concern 3 is an orchestrator's choice: proposed answer, the foundation step writes
row 20 (evidence: `.the-way/product-guidelines/coding/SKILL.md:37-40`, the cycle's author writes
"the product's entries, through the skill of each element, in the foundation step").
