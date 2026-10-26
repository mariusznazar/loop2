# Slice 5 execution report

- **Status:** returned
- **Reason:** returned for size, on the orchestrator's instruction before implementation. The planned ten-file atomic switch also reaches four existing manual activity fixtures, giving fourteen changed files. The orchestrator directed a return to the planner under implement-task step 9 rather than expanding this slice.
- **Worktree:** `C:/Storage/repos/loop2-wt/grupy-regul-i-liczniki`
- **Branch:** `task/grupy-regul-i-liczniki`
- **HEAD / slice base:** `e8ab9cd53398b7f40f9f05bcca0ef07ac08f5d40`
- **Commits:** none. No implementation or test changes were made, so there is no code to commit or reset.
- **Changed tracked files:** none (`git status --short` and `git diff --numstat` both empty). Added/removed tracked lines: 0/0. This ignored report is the only artifact written.

## Exact additional reach

The planned activity contract replaces the selected rule's position with a stable positive rule identity. The current type at `src/browser/sim/types.ts:52` is `{ kind: "rule"; ruleIndex: number; action: Action }`; `src/browser/sim/program.ts:231-237` emits the same positional field. Four test setup helpers or cases independently construct that contract:

| File and line | Existing setup | Why the switch reaches it |
|---|---|---|
| `tests/sim/campfire.test.mjs:113` | `endingNext` constructs `{ kind: "rule", ruleIndex: 0, action }`. | It supplies a running rule action ending next minute to exercise crafting, lighting, feeding and eating. Leaving the field would supply an obsolete Activity after the production contract changes. |
| `tests/sim/gather.test.mjs:79` | `gatheringEndingNext` constructs `{ kind: "rule", ruleIndex: 0, action: gather(resource) }`. | It supplies an in-progress gathering to `stepMinute`; its setup must use the new identity field while keeping its action, duration and outcome expectations. |
| `tests/sim/world.test.mjs:304` | The exploration/renewal case constructs `{ kind: "rule", ruleIndex: 0, action: { kind: "explore" } }`. | It supplies an exploration ending in minute 30 to prove renewal survives exploration completion. The setup would otherwise no longer match Activity. |
| `tests/view/status-row.test.mjs:35` | `doing` constructs `{ kind: "rule", ruleIndex: 0, action }`. | The status-row cases use this helper to provide different ongoing actions. Although status text does not read the identity, retaining an invalid setup would hide future dependence on it. This fourth location was not identified in the handoff's list of three. |

These fields are setup data, not behavioral expectations of which rule wins. The proposed minimal migration was a positive `ruleId` in each setup, with all existing outcome assertions retained; it has **not** been applied. No production compatibility field or extra identity source is proposed. Removing identities from these fixtures altogether would also leave them inconsistent with the required Activity contract.

The planned ten files are `src/browser/sim/types.ts`, `src/browser/sim/game.ts`, `src/browser/sim/program.ts`, `src/browser/view/program-editor.ts`, `tests/sim/program-fixture.mjs`, `tests/invariants/program_fixture.py`, `tests/sim/program.test.mjs`, `tests/view/program-editor.test.mjs`, `tests/invariants/test_program_rule_pick.py` and `tests/invariants/test_program_closed_lists.py`. The four files above are additional to that list.

## Material for the planner

The editor currently treats `index` as a position in the flat program and `focusAfter(edit, index, ruleCount)` returns a row-local control target. A proposed grouped adaptation keeps `focusAfter` local to the affected group:

- Pure rule-edit helpers receive an explicit group id plus a rule position within that group. Existing group/rule ids and next-id metadata are preserved by each transformation; add-rule consumes `nextRuleId` and names its destination group explicitly.
- Each rendered group owns its rule list and add-rule button. Pending focus carries the group's id together with the existing `FocusTarget`; after rebuilding the affected structure, focus resolves within that group.
- Up/down use only that group's rules, so a boundary operation returns no edit. After deletion, focus goes to the next remove button in that group, otherwise that group's add-rule button. After adding, focus goes to the appended rule's condition in the destination group.
- Existing control elements remain during content-only edits, preserving the current selection, resource/item, number-field and focus semantics. A structural change rebuilds rows and applies the pending focus deliberately.

Alternative: flatten the groups for editing and focus. Rejected as a proposal because it obscures boundaries and needs a separate translation for every operation; a mistaken translation would edit or focus a neighboring group. Stable rule-id helpers instead of group-id/index helpers remain another viable implementation choice for the planner; no API has been committed.

The code inspection also confirmed that the foundation step already changed the `program-rule-pick` sentence (`foundations/invariants.md:234-247`) and D-23/D-90/D-91 to grouped semantics. The future executor should not rewrite that entry merely because the original slice says to update the grouped invariant. Its Python checker is still flat and needs the planned behavioral update. `program-closed-lists` already covers group conditions by its wording, but its acceptance/refusal cases currently offer rule conditions only.

## Checks and evidence

Every command below ran with the explicit task worktree as working directory.

| Command | Exit | Result |
|---|---:|---|
| `git -C .the-way rev-parse HEAD` | 0 | `2895e0e7860ec1f48ddc7dacd15ef6b26e731c5c` |
| `git ls-files --stage -- .the-way` | 0 | Same pinned commit. |
| `git rev-parse HEAD` | 0 | Slice base `e8ab9cd53398b7f40f9f05bcca0ef07ac08f5d40`. |
| `git status --short` | 0 | Empty; no tracked/untracked product changes. |
| `git diff --numstat` | 0 | Empty. |
| `rg -n 'ruleIndex' tests/sim/campfire.test.mjs tests/sim/gather.test.mjs tests/sim/world.test.mjs tests/view/status-row.test.mjs` | 0 | Exactly the four setup locations above. |
| `rg -n 'ruleIndex' src/browser/sim/types.ts src/browser/sim/program.ts` | 0 | Positional field is still the production contract and selection result. |

`npm test`, deliberate failing tests, separate foundation check, Docker checks and the browser inspection were **not run**: the orchestrator stopped the attempt before implementation or test changes. The known listener baseline was not reproduced in this attempt and is not represented as a pass. No statement about current Docker coverage is made. No browser evidence or screenshot was produced. The own-work weakest-point check would have been keeping per-group edits and restored focus inside the correct group after a structural edit; it remains unchecked because this attempt returned before code.

## Reads and limits

Read the dispatch and task excerpts; global/worktree/browser instructions; the pinned make-change skill; the named coding, testing, simulation, browser-module and styleguide guidelines; selected foundation entries; the simulation types, validator, picker and run module; editor, app, shared text field and status row; both fixture builders; program/editor tests; the two target invariant tests; and `package.json`. A consumer scan identified the four manual fixtures above. Their files were reached to assess the necessary contract migration, with no edits; some combined output was truncated and the stop arrived before completing that supplemental reading. No claims of a completed own-diff review or browser-skill workflow are made.

The required further reading and checks must be completed by the executor of the revised plan. No next slice, return-step work, push, PR or external write was performed. Slices 1–4 remain at the unchanged HEAD.
