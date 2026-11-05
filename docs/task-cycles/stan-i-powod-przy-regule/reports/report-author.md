<!-- Copied by the orchestrator word for word from the text the one author returned: the harness refused the author's own write of this file ("subagents should return findings as text"). Only the HTML escapes `&lt;`/`&gt;` of the returned text were turned back into `<`/`>`. -->

**Status:** `done with concerns`.

The harness refused the write of the report file at `C:\Storage\repos\loop2-wt\stan-i-powod-przy-regule\docs\task-cycles\stan-i-powod-przy-regule\reports\report-author.md` ("subagents should return findings as text"). I did not work around it, so the full report is below instead. The worktree is clean and all work is committed on `task/stan-i-powod-przy-regule`.

**Commits** (base `18fca47`)
- `0a5ee3e` feat: the signs at each rule of the copy: judging function, view, tokens, styles, kitchen-sink page and tests.
- `2c59e0e` docs: foundation entries and styleguide.
- `908c03e` test: `rule-signs.test.mjs` added to `stryker.config.json`. `tests/quality/test_mutation_test_selection.py` failed (exit 1) until I did.

**Check result:** nothing failed in my focused checks and the full `npm test` was not run (that is the orchestrator's run). Details under "Checks run".

# Report of the one author: state and reason at the rule in a manual map run

## What was made
- **One judging function.** `judgeProgram` in `src/browser/sim/program.ts` judges every group and rule.
  - It checks the repertoire first, then the condition, then the refusal of the action.
  - It returns a bar (`go`, `blocked` or `unmet`), a reason and the winner for each.
  - `chooseActivity` and `chooseCombatRule` now take their result from it, with `throughWinner` keeping them lazy. All existing pick tests pass.
  - `actionFeasible` is `actionRefusal(...) === null`.
- **`ruleSigns(state)` in `game.ts`.** It judges the whole copy with the editor's repertoire. In the minutes of an attack it uses the first turn's health context. It also gives the rule whose action is going on, when another rule wins.
- **View.** `rule-list.tsx` takes an optional `signs`.
  - Rows get `winning` or `running` plus `bar-go`, `bar-blocked` or `bar-unmet`.
  - Headers get a bar class and blocked rows get a `.rule-reason`.
  - The program panel gives signs only when the copy is shown. A saved program opened during a run and the Programy screen get none.
- **Tokens and styles.** `rule-winning` `#152a26`, `rule-running` `#152a37` and `condition-unmet` `#27272a` are in `tokens.css`, each with a `Source:` comment. `styles.css` and the kitchen-sink page are updated.
- **Foundation, with a gap in process.**
  - D-39, D-40, D-42, D-126 and `design-token-contrast` are edited. D-308, D-309 and D-310 and the invariant `rule-state-from-pick` are new.
  - I read the three skills and their templates and followed them by hand, but did not run them as separate invocations.
  - The set-critique that `way_of_working.md` asks for before a collective review was not run, because this stage may not dispatch a subagent. The review stage should take it.
- **Not changed:** the saved game, its version and `.the-way`. There is no glossary or part-map change.
- **Styleguide:** the three roles, five backgrounds in the two rules, the exception to D-279, and the signs in "Program editor".

## Checks run (all exit 0 unless noted)
- `npm run typecheck`; eslint on `src` and the two new tests; prettier on `src`, `tests` and `stryker.config.json`; ruff on the altered Python test.
- `npm test -- tests/sim/rule-signs.test.mjs` (26 cases) and `npm test -- tests/view/rule-signs.test.mjs` (6 cases).
- Every other `tests/sim/*.test.mjs` and `tests/view/*.test.mjs`, one by one.
- Invariant tests, each by `python -B -m unittest discover -s tests/invariants -p test_<name>.py`:
  - `program_rule_pick`, `content_identifiers`, `browser_view_token_values`, `browser_view_focus_outline`, `design_token_contrast`, `design_token_sources`
  - `simulation_isolation`, `simulation_inputs`, `browser_view_framework`, `application_build_kitchen_sink`
  - `saved_program_edit`, `copy_save`, `streak_program_change`, `action_in_progress`
- `python -B -m unittest discover -s tests/quality` (40 cases) and `tests/agent_workflow` (13 cases).
- `foundation_check.py`: 0 errors after each foundation edit and after the last commit.
- Not run:
  - Full `npm test`, orchestrator's.
  - Docker and account-database invariants, which the change does not touch.
  - The mutation tool, which the reviewer runs.

**Failing runs seen.**
- `design-token-contrast` after the test change and before the tokens: `FAILED (failures=1)`, `--rule-winning is declared 0 times`. After the three tokens: exit 0.
- `test_mutation_test_selection.py`: exit 1, then exit 0 after the stryker edit.
- I wrote the simulation code before its tests, so those tests did not fail first. In their place I broke the code on purpose and saw each test fail, then restored it with a clean `diff`. Each broken run exited 1, each restored run exited 0.
  - Simulation: nature energy before the world; condition before the repertoire; wolf health minus one; `running` not dropped when it is the winner; a finished activity counted as running after a completion; the group bar always green.
  - View: signs given to a saved program; the open-row rule placed before the states in the stylesheet.

**Own-work check.** The requirement I judged most likely unmet is that the two backgrounds are counted on the stopped minute after the end. Three cases cover it (death of cold, completion, death in combat), and the real screen below, all passing on the first run.

## UI states
- **Method:** `loop2-play` route, with `npm run local`, Playwright CLI 0.1.22, composed states sent by `PUT /api/saved-game`. I took and read screenshots at 1366×1000; they are not committed, and the working files were deleted.
- **Winning:** computed background `rgb(21,42,38)` with a green bar.
- **Running:** computed background `rgb(21,42,55)`.
- **Three bars and reasons:** green, amber and dark bars; reasons seen: „brakuje 1 × jagoda”, „gałąź niewykupiona”, „tylko w walce”, „tu nie leży mech”. A rule in the unmet group has a dark bar and no reason.
- **Open row:** classes `open winning bar-go`, background `highlight`, green bar kept.
- **Row under the pointer:** the winning row keeps its state background; a plain row gets `highlight`. I read these from `getComputedStyle`; the hover itself was not viewed as an image.
- **Screen after the end:** the signs stand after a death of cold, with „Restart” and „Zakończ”.
- **Minutes of an attack:** ordinary rules are amber „trwa walka”, one combat rule is winning, none is running.
- **No signs where none belong:** saved-program rows and the hidden Programy panel carry no `bar-*` class and no reason.
- **Kitchen-sink page:** shows the three new roles.
- **Not checked:** a narrow window.

## Where the base differs from the task
- The row the task cites at `program-editor.ts:867-925` is now drawn by `rule-list.tsx`. The old `program.ts:207-311` is now on `judgeProgram`.
- Task 5 already gave the open row and the hovered row `highlight`. I added a transparent 2 px left border to every row and header, which shifts unsigned rows on Programy by 2 px.
- Nothing in the task changes meaning.

## Reaches beyond the handoff
- **`stryker.config.json`:** changed, because the new test must be on the mutation tool's list.
- **`program-editor.ts`:** `knownActions` and the text „gałąź niewykupiona” now come from the simulation, so the row and the greyed cell cannot drift apart.
- **Also read:** `understanding.ts`, `hex.ts`, `combat.ts`, `run.ts`, `skills.ts`, the data files, `test_simulation_inputs.py` and `test_browser_view_token_values.py`. Neither test's lists need extending. I also read old Loop `RulesPanel.tsx` at `cdc7c0d`.
- **Handoff entries read only in part:** D-23 (head), D-132, D-140, D-141, D-151, D-173, D-174, D-279, D-289, D-300, D-302 (heading and binding sentences, after the code was written). No collision found.
- **Guidelines not read:** `coding-content-data.md` and `coding-saved-game.md` (no data file and no saved-game file changed).

## Choices
1. The dark-bar role is `condition-unmet`, placed in D-40. A rename would touch tokens, styleguide, two decisions, the kitchen-sink page and the contrast test.
2. Three decisions, not one: D-308 is the approved entry; D-309 and D-310 are rows 3 and 4 of *Settlements to record*.
3. `rule-state-from-pick` keeps Method `review`, because the sentence says where values come from. The agreement of winner and pick is tested but cites no invariant.
4. For an outside-repertoire rule, the branch reason comes before „jeszcze nieodkryte”. Undiscovered parts go in row order (condition, its target, action, its target). Labels keep their data form; targets are lower case.
5. „brakuje {ile}” is the deficit, as in old Loop. Energy is shown rounded down, as the status row shows it.
6. The first combat turn is judged at the mage's current health and the wolf's full data health (24), without the wolf's first strike. The sign can differ from the real turn at a health-condition edge.
7. An action is „running” while the minute is before its end, and always after a death of cold or hunger. After a completion a finished activity is not running, so that row has no blue background.
8. A group with no rule that can start, an empty group included, is amber and shows no reason.
9. The altered invariant test is `tests/invariants/test_design_token_contrast.py` (five backgrounds, new controls, no assertion weakened).
10. The kitchen-sink page shows the roles only, not a sample rule row.

## Problems as observed
- The dark bar is barely visible on the panel and vanishes on `highlight`, as the task's question 2 accepted.
- The panel now runs `judgeProgram` over the whole copy on every render with the copy shown. I did not measure it; I guess it is cheap.
- A shell slip wrote a stray file `all-go` at the repo root during the mutation loop. I removed it before any commit.

## Searches not found or unclear
- The bar of a group whose only rules lie outside the repertoire while its condition holds: the task is silent, and I made it amber.
- Which part „jeszcze nieodkryte: {nazwa}” names when several are undiscovered, and in what case (choice 4).
- Whether a finished activity at a completion is „running”; question 5 covers death only (choice 7).
- The set-critique before collective review was not run (no subagent in this stage).
- No file the handoff names was missing.
