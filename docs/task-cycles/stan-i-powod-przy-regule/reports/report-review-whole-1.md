<!-- Copied by the orchestrator word for word from the text the reviewer returned: the harness refused the reviewer's own write of this file ("subagents should return findings as text"). Only the HTML escapes `&lt;`/`&amp;` of the returned text were turned back into `<`/`&`. -->

FAIL 908c03edbb0be6f070071436a4787607e3590bbc

**Counts:** 2 blocking (both Important), 2 Minor, 0 out of scope. The review has 5 lines under Declined to judge.

**Checks** (all at head `908c03e`; worktree clean before and after):

| Check | Result |
|---|---|
| `npm test -- tests/sim/rule-signs.test.mjs` | exit 0, 26 cases |
| `npm test -- tests/view/rule-signs.test.mjs` | exit 0, 6 cases |
| `python -B -m unittest discover -s tests/invariants -p "test_<name>.py"` for `design_token_contrast`, `browser_view_token_values`, `design_token_sources`, `program_rule_pick`, `application_build_kitchen_sink`, `browser_view_focus_outline` | all exit 0 |
| `python -B -m unittest discover -s tests/quality -p "test_mutation_test_selection.py"` | exit 0 |
| `python -B .the-way/elements/common/foundation_check.py` | exit 0, 0 errors |
| `npm run typecheck` | exit 0 |
| prettier `--check` on `src/browser`, the two new tests and `stryker.config.json` | exit 0 |
| eslint `--max-warnings 0` on the six changed source files and the two new tests | exit 0 |
| Stryker on the changed ranges of `program.ts`, `understanding.ts` and `game.ts` | exit 0; 27 survived, 4 no coverage; classified in finding 3 |
| WCAG contrast recomputed from `tokens.css` | matches the task's values |
| Scratch script in the scratchpad, run on `dist/` | confirms finding 1 |

Not run:
- The full `npm test`, which is the cycle's own run.
- The other `tests/sim` and `tests/view` files one by one.
- A browser run of the game.
- The Docker and account-database invariants.

# Report (full text)

## Verdict in short
The code matches the task on every item I traced: To do 1 to 8, questions A to G and 1 to 8, and the table of question 4. I recomputed the contrast ratios and the three new role values are as the task gives them. D-308, D-309, D-310 and the invariant `rule-state-from-pick` are faithful to the task and to the approved definition entry. Two things block: a test that passes for a reason other than the behaviour it is named for, and a restatement of D-308 inside D-126 that drops D-308's qualification.

## Blocking findings (Important)

### 1. The test of a group whose condition lies outside the repertoire does not fail when the check is removed
- **Place:**
  - Code: `src/browser/sim/program.ts:420-422`, the term `(!reach || conditionInRepertoire(reach.repertoire, group.condition))`.
  - Test: `tests/sim/rule-signs.test.mjs:511-535`.
- **What is wrong:**
  - The test gives group 1 the condition `temperatureBelow 36` and removes it from the Understanding.
  - The body in that run is at 37, so the condition does not hold anyway. The group is dark with or without the repertoire check, and the test passes either way.
  - No other test calls `judgeProgram` with a `reach`. The existing repertoire tests and the invariant `program-rule-pick` go through `programInRepertoire`, which filters the program before the pick and never uses this term.
- **Why it matters:**
  - This is To do 3, question 6 and the last clause of D-308: a group with a condition outside the repertoire counts as one whose condition does not hold.
  - A group whose condition holds but lies outside the repertoire would show a green or amber bar while the pick passes over it. The code is right today; nothing keeps it right.
- **Evidence:**
  - Stryker mutant `program.ts:421:8` (`(true) &&`) survived, with `rule-signs.test.mjs` among the tests run.
  - Scratch run with the body set to 34, so the condition holds: `judgeProgram` without `reach` gives `{"1":"go","2":"go"}`. `ruleSigns` gives `{"1":"unmet","2":"go"}`. A test with a holding condition would tell the two apart.
- **Slice:** none (one author, no slices).

### 2. D-126 restates D-308 without its qualification
- **Place:** `foundations/decisions.md:2337-2338`, *Rationale* of D-126: "Accepted with it: a program rule outside the repertoire stands in the program amber with the reason that it lies outside it (D-308)."
- **What is wrong:**
  - D-308 says such a rule is amber "unless the condition of its rule group does not hold", and then every rule of that group is dark with no reason.
  - The D-126 sentence drops that exception, so it is broader than the entry it cites (WAY-263).
  - The task asked only that D-126 stop saying "with no sign of why", not that it state the sign.
- **Why it matters:** D-126 has *Scope* `simulation` only. An agent working on the pick reads it alone and learns the rule is always amber.
- **Fix:** either add "unless the condition of its rule group does not hold (D-308)", or replace the sentence with a pointer that restates nothing.
- **Slice:** none.

## Minor findings

### 3. Surviving mutants that point at required behaviour no test pins
Stryker scores on the changed ranges: `game.ts` 96.15, `program.ts` 96.15, `understanding.ts` 65.57 percent.

Survivors I classified as equivalent or not worth an assertion:
- `program.ts:255`: the tile always exists.
- `program.ts:340`: same result either way.
- `program.ts:419`: the group-level break only skips later groups' bars; the rule-level break keeps the rules map the same.
- `program.ts:449` and `:465`: `throughWinner` is only laziness.
- `understanding.ts:204`: followed by an identical final `return`.
- `understanding.ts:157`: the object is spread right after.

Real gaps, each a task requirement with no test:
- `game.ts:180`, the clause `run.death !== null ||`. The death-of-cold test dies mid-activity, so `minute < endMinute` already holds. Death at the very minute the activity would have ended is untested (To do 1).
- `understanding.ts:195-196` and `:207-209`. The reason "jeszcze nieodkryte: {name}" is tested only for an `itemBelow` target and a `gather` target. A `hereBelow` target, a `walkTo` target and a `patrol` target are not, and the patrol line has no coverage at all.
- `understanding.ts:171-174` (`knownRepertoire`, the runner's archetype). Only the default archetype is tested.
- `program.ts:315`, `case "dodge"`. "tylko w walce" outside combat is tested for `kick` and `strikeWithStick`, not `dodge`. Without the case, `actionRefusal` returns `undefined`.

Minor because each is a narrow edge or one more value of a branch whose logic other cases already show.

### 4. The styleguide's *Program editor* section still says the editor adds no new role
- **Place:** `guidelines/styleguide-browser-view.md:476-478`: "Wygląd jego części bierze się z istniejących ról; edytor nie dokłada żadnej nowej barwy, roli ani wartości."
- **What is wrong:** the same change adds three roles (`rule-winning`, `rule-running`, `condition-unmet`) and the editor now draws with them, so the sentence contradicts the bullets just below it.
- **Why it matters:** a later agent reading the section whole meets the contradiction. A one-clause fix removes it.

## Declined to judge
- Whether following the record skills by hand is acceptable. The author says so for the foundation entries; for the styleguide edit through `the-way-maintain-styleguide` the report is silent. That is the orchestrator's call. I judged the entries by content, and `foundation_check.py` passes.
- The 2 px transparent left border on every row and header (`src/browser/styles.css:932`) shifts rows on Programy by 2 px. It is a layout consequence, not a sign, and the author disclosed it.
- The first combat turn is judged at the mage's current health and the wolf's data health, without the wolf's first strike. This matches the task's "present health", and the task's own cost line accepts the edge difference.
- Author choices 4, 7 and 8 (the branch reason before "jeszcze nieodkryte", a finished activity at a completion not being "running", an empty or non-startable group being amber with no reason). The task is silent on each, and none contradicts a task line.
- Visual look. I did not open the game in a browser. I read the cascade (equal specificity, later rule wins: hover, then states, then the open row) and the stylesheet-order test. The author's screenshots are not committed, and a hover as an image and a narrow window were not checked.

## Against the task, item by item
- **To do 1:** met. `ruleSigns` at `game.ts:161-187`, the classes in `rule-list.tsx`, and the cascade at `styles.css:937-955`. One edge is untested (finding 3).
- **To do 2 and 3:** met in the code. The group's repertoire clause is not pinned (finding 1).
- **To do 4:** met. All 19 rows of the table of question 4 agree with the code and with the 23 cases of the first test, including the deficit "brakuje {ile} × {rzecz}" and the energy rounded down.
- **To do 5:** met (`outsideReason`, `judgeRule`).
- **To do 6:** met.
  - `chooseActivity` and `chooseCombatRule` now come from `judgeProgram` with `throughWinner`.
  - The existing pick tests and `program-rule-pick` (8 cases) pass.
  - A new test compares the winner with `chooseActivity` over 60 minutes.
- **To do 7:** met. `signs={copyShown ? ruleSigns(state) : null}`, and Programy always shows a saved program; both cases are tested.
- **To do 8:** met.
  - Ratios on `rule-winning` and `rule-running`: `text-label` 4.59 and 4.51, `control-border` 3.13 and 3.07, `focus` 13.73 and 13.47.
  - Every other text role is at least 4.51 on both. `condition-unmet` is 1.0 to 1.34, with no threshold, as the task says.
  - The changed invariant test `tests/invariants/test_design_token_contrast.py` adds the two backgrounds and cases for them, and weakens nothing.
  - The kitchen-sink page shows the three roles.
- **To do 9:** met in content. The styleguide table, the two rules, the D-279 clause and the *Program editor* section are updated. See finding 4 and the first Declined line.
- **To do 10 and *Settlements to record* rows 3 and 4:** met, except finding 2.
  - D-308 is there, with the exceptions of questions 7 and 8 and the lower-case example.
  - D-309 is row 3 and D-310 is row 4.
  - D-39, D-40 and D-42 are updated. `design-token-contrast` matches the definition's wording character for character.
  - `rule-state-from-pick` is written for the background, bar and reason only. D-127 is untouched, as question 6 requires.
- **Acceptance criterion:** met. Signs are computed from `run.copy.program` on every draw, and a sim test and a view test show an edit changing them at once.
- **Source fidelity:**
  - D-308 agrees with the definition entry (`definicja_mvp2_loop2.md`, the entry "What state does a program rule show during a map run?") plus the additions the task orders for questions 7, 8 and 4.
  - The D-40 *Rationale* and *Rejected* sentences are in the approved definition.
  - The D-309 and D-310 *Rejected* lines are the task's "Not chosen".
  - Nothing in the entries goes beyond the sources, except the *Verification* examples the author wrote (the definition leaves them `TODO`). Each agrees with the code.

## Reaches beyond the dispatch
- **`.the-way/task-cycle/review/whole_change.md`:** read as `SKILL.md` section 1 directs.
- **Selection method:** `.the-way/elements/common/way_of_working.md` ("Reading the foundation") and `.the-way/product-guidelines/reading.md`, to select as the handoff directs.
- **Foundation read:**
  - The part map, whole.
  - D-23 and D-126, whole. D-127, heading only.
  - The full diff of D-39, D-40, D-42, D-308, D-309, D-310 and both invariants.
  - I did not read every decision whose *Scope* names `browser-view` or `simulation`; there are over 300 entries. D-43, D-62, D-132, D-140, D-141, D-151, D-173, D-174, D-279 and D-289 I reached only through entries and guidelines that cite them. A decision cited by nothing I read could be unchecked.
- **Guidelines read whole:**
  - `guidelines/coding.md`, `coding-simulation-module.md`, `coding-browser-module.md`, `testing.md` and `src/browser/AGENTS.md`.
  - From the 532-line styleguide: the Roles table, *Each role in its meaning*, *Every background with its text*, *Contrast of every pair*, the rule on lines at a text, *The kitchen-sink page*, *Program editor*, and the diff.
  - `coding-content-data.md` and `coding-saved-game.md` not read: no data or saved-game file changed.
- **Source of the foundation entries:** `C:\Storage\The Brain\The Brain\Notes\Projects\(P) Loop\definicja_mvp2_loop2.md`, lines 266-290 and 478-494, for source fidelity.
- **Code context:** `src/browser/sim/run.ts` (415-520 and 595-700), the start of `resolveCombat` in `combat.ts`, and `types.ts` (`ActiveCombat`, `MapRun`), to see what `current` holds after a death, a completion and an attack. Also `data/resources.ts`, `data/actions.ts` and `kitchen-sink.ts`.

## Searches not found or unclear
- The set-critique that `way_of_working.md` asks for before a collective review of foundation entries was not run (the author says so). I read the foundation diff against the task and the definition in its place. Whether the missing critique needs a separate note is unclear to me.
- Whether the styleguide edit went through `the-way-maintain-styleguide`: the author's report does not say.
- Foundation entries of the touched parts that I did not reach by the *Scope* search: unclear and not exhausted (see Reaches).
- The author's screenshots are not committed and not in the reports directory, so I could not look at them.
- Nothing else looked for was missing. The task, handoff, author's report, the skill files, the definition file and the code the report cites were all found.
