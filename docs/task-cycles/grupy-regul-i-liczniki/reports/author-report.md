# Author report — groups and rule counters

## Status

returned — the complete change is larger than I can safely hold as one author stage (make-change section 5, WAY-136). No product code or foundation entry was changed. No exploratory edit was made. No commit was created; the worktree remains at its dispatch base. This report is an ignored working file, not a code diff.

## Why the one-author assumption did not hold

The group model is not confined to the editor and the rule picker. `Program.rules` is the state shape used by many existing simulation tests, by the view's pure edit functions, and by independent Python invariant drivers. `Activity.ruleIndex` is also asserted as part of complete activity objects. An identity change must preserve behaviour while removing inappropriate position assertions; blindly updating those expected objects would conflict with D-73 and the testing guidelines.

The editor is 574 lines with all edit callbacks and focus recovery closed over a flat row index. It must gain group controls, a condition editor shared by groups and rules, inter-group and intra-group drag/drop, and a counter-only update path which cannot rewrite an unfinished number or text entry on clock ticks. These changes should be verified as a coherent view slice after the simulation contract settles.

The first search for `rules:|.rules|ruleIndex` found 25 files under `src/browser` and `tests`, including styles.css (a selector, not a model use). That search is not a complete Python inventory: double-quoted dictionary keys in the invariant fixtures require a separate search. The invariant drivers are local to their individual test files, not a shared representation adapter. `loop2_invariant_support.py` supplies build/process support, not the program fixture model.

## Suggested planning boundaries

These are observations for the plan author, not an approved plan.

1. Grouped program representation, validation and ordered choice, with stable rule identity agreed as an implementation choice, and migration of existing input fixtures/assertions across Node and Python tests. The new game owns one empty Program group. Existing view code needs enough migration to compile against the grouped contract; a temporary flat compatibility surface should not become product behaviour. Assign the program-shape/group-choice foundation entries to this slice where its code makes them true.
2. Rule counters attached to stable rule identity through lifecycle operations. Count activityStarted events, including the immediate first pick at minute zero; reset before that pick so a starting applicable rule displays one, not zero. Keep values after end/death, hide before the first run, reset on content edit, preserve on group edits and transfers. Assign counter foundation entries to this slice.
3. Full group editor, drag/drop and counter refresh, including focus/unfinished-input preservation; state review and real browser checks/screenshots. Group ordering, deleting the final group, monotonic default group numbering, empty groups as drop targets, and same-group downward drops need explicit test examples.

The plan author may combine (1) and (2) if its author can hold the fixture migration and lifecycle checks together. The point of splitting is bounded verification and deliberate migration, not a new design choice for the human.

## Concrete code findings

- `src/browser/sim/types.ts:34`: ProgramRule currently has only condition/action; `:36` Program is a flat rules array; `:52` Activity retains ruleIndex plus an action copy.
- `src/browser/sim/program.ts:226`: chooseActivity scans rules and returns the first true/feasible rule. It needs outer group-condition filtering and fallthrough. Condition checking itself already handles every required kind and can serve group conditions unchanged.
- `src/browser/sim/game.ts:174`: checkProgram reconstructs canonical rule content, so counter reset should compare validated content rather than raw property order. `setProgram` preserves the running activity, as required. startRun sees the first activityStarted; advanceMinutes gathers subsequent events. end clears run, so last-run counts cannot live only inside run unless copied out deliberately.
- `src/browser/sim/run.ts`: startActivity returns activityStarted for either a wait or a rule. Counting must filter the latter. Finishing uses the action copy in CurrentActivity, so deleting/editing/moving the originating rule must not change completion of the current action.
- `src/browser/view/program-editor.ts`: pure transforms all address flat indices; row callbacks capture those indices. showRule writes the number input value whenever it differs, so calling current update on every tick would destroy uncommitted edits. A counter-only refresh path or identity-keyed reconciliation that skips content writes for unchanged content is necessary.
- `src/browser/view/app.ts`: the editor currently updates only on program or map changes; counter changes require an additional update path.
- `tests/view/program-editor.test.mjs`: tests pure edit transforms and field rules; this is not browser event/focus evidence. Preserve number-step, clamping, resource and item selection checks during migration.
- `tests/sim/flow.test.mjs`: checks complete GameState objects and activity structures; migrate expected state only with stated task justification and keep behavioural action-completion and Restart checks.
- `tests/invariants/test_program_rule_pick.py`: checks ruleIndex at free minutes, with hand-written expected pick logic. Update the invariant sentence and checker to group-aware observable choices, preserving its free-minute and continuation checks.
- `tests/invariants/test_program_closed_lists.py`: checks every listed condition/action and refusal of unlisted kinds. Add equivalent group-condition refusal and positive controls; model migration must not turn every offered program into a refusal.

## Implementation choices considered, not implemented

Stable rule IDs in program state, independent of group or position, are preferable to content hashes or indices: identical rules must have independent counts, and both reorder and content changes have specified but different effects. Keeping counts separately from rule content in GameState allows them to survive Stop and avoids considering count increments a content edit. Rejected alternatives: position keys misattribute counts after edits; content keys collapse duplicates; counters only in MapRun lose the required post-Stop values. These remain suggestions for the plan, not new foundation decisions.

## Checks

- `git ls-files --stage -- .the-way`: exit 0, pinned commit 2895e0e7860ec1f48ddc7dacd15ef6b26e731c5c.
- `git -C .the-way rev-parse HEAD`: exit 0, same commit.
- `git status --short`: exit 0, no tracked/untracked output before this report (the report directory is ignored).
- Initial attempted read `.the-way/make-change/skill/SKILL.md`: path did not exist (exit 1); immediately read the actual delegated `.the-way/task-cycle/change/SKILL.md` in full. This was an incorrect read path, not a repository problem.
- No npm test run by this author. The orchestrator owns a still-running baseline and asked for no source mutations until it finishes. No claim of passing tests is made here.
- No invariant failing-before run, own-work implementation check, UI state check or screenshot: no implementation exists to check. They remain required for subsequent slices.
- No new API/library/network source was used.

## Readings

Read the handoff and frozen task in full; project skill wrapper and pinned make-change method in full; AGENTS.md and src/browser/AGENTS.md; coding/testing/simulation-module/browser-module/styleguide guidelines (truncated combined outputs reread in smaller segments); selected decisions, invariants, part entries and glossary/process glossary; complete product files types.ts, game.ts, program.ts, run.ts, program-editor.ts, app.ts, text-field.ts and status-row.ts; flow.test.mjs, program.test.mjs and program-editor.test.mjs. Read the decision/invariant/glossary project wrappers and their element methods, and the assigned projected source entries (How does a character act by its program?, What does a program rule show the player?, rule group). Read the Obsidian rulebook before original source reads; the truncated middle was reread separately. Searches were limited to the worktree and the assigned plan/definition.

The full required-reading exercise was stopped when returning for size. In particular the element templates/common working rules, complete invariant test files where combined output was truncated, full remaining fixture files, stylesheet and browser playbooks were not yet read. A later author must read the files it changes in full. No outside-repository file was written.

## Foundation step

Not started. All five task settlement rows and assigned projected entries remain to write through their element skills, together with the changed program-rule-pick invariant/test. No foundation identifiers allocated, no task-row mapping claimed, no return step started.
