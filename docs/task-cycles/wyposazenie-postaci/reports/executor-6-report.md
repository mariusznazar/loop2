**Status:** `done with concerns`

Slice 6 — the condition „Puste — {miejsce}” in the simulation. Concerns: one file outside the slice's *Change* list was edited (see "Files", the reach); the two view files named in the plan as left failing do fail, as the plan says, and the same checks show this on the base.

## Commits

- `78fd5cbf` feat: the condition „Puste — {miejsce}” (branch `task/wyposazenie-postaci`, base `5d72724c`).

## Files changed (added / removed lines)

- `src/browser/sim/types.ts` (+4 / −2): `Condition` gains `{ kind: "emptyPlace"; place: GearPlace }`.
- `src/browser/sim/data/conditions.ts` (+8 / −2): row `emptyPlace` — label „Puste”, section `body`, place 5 (after „Energia natury poniżej”, place 4), `revealedBy` `{ kind: "attacked", creature: "wolf" }`; no number, so no `defaultValue`. Doc comment of the closed list names the new kind.
- `src/browser/sim/program.ts` (+33 / −1): `fittedPlaces()` (the places of `GEAR_PLACES` that some item's `fits` names, read at each call); `placeHasEmptySlot(gear, place)` (some slot of the place is `null`); the `emptyPlace` case in `conditionHolds`. Import line widened to `GEAR_PLACES`, `GEAR_SLOTS`, `GearPlace`, `GearSlot`, and `Gear` added to the type import.
- `src/browser/sim/programs.ts` (+20 / −1): `checkPlace` (refuses any place not in `fittedPlaces()`, with `ProgramCheckError`), and the `emptyPlace` case of `checkCondition`.
- `stryker.config.json` (+1): `tests/sim/gear-condition.test.mjs` listed between `gear-combat` and `gear-state`.
- `tests/sim/data.test.mjs` (+4 / −2): the section table gets `emptyPlace: ["body", 5]`; the wolf row's conditions get `"emptyPlace"` (order as `CONDITIONS` keys); a comment names D-459.
- `tests/sim/gear-condition.test.mjs` (new, +132): four tests (see checks).
- `tests/invariants/test_program_closed_lists.py` (+1): `"emptyPlace"` appended to the transcribed `CONDITION_KINDS` tuple. **Outside the *Change* list.** Reason: the tripwire in that test fails when the data's condition keys differ from the tuple ("update CONDITION_KINDS through a foundation step"), and the slice's own *Checks* name this test; the Goal cannot pass the check without the tuple. The change is the transcription of the data's new key only; no expectation or assertion was weakened. The orchestrator should decide whether this needs its own foundation step, as the file's docstring suggests.

Totals of the commit: 8 files, +203 / −8.

Not changed, on purpose: `src/browser/sim/gear.ts` (the places' targets sit in `program.ts`, which already reads the conditions and the items' data), `src/browser/sim/understanding.ts` (`conditionInRepertoire` already returns true for any condition kind it holds, and a place lies in every repertoire; discovery follows `revealedBy` on its own), `src/browser/sim/character.ts`, `src/browser/view/*` (the view's switches have their own default branch, so typecheck passes).

## Choices made

- Kind name `emptyPlace`, label „Puste”; the place is a `GearPlace` (kind), never a slot, so a pocket's number is refused by the check. Rejected: one condition kind per place (would need a new kind per place, against D-443's logic for targets).
- "Holds" = some slot of the place is empty. For a single-slot place (the main hand) this is the plain reading; for „Kieszeń” it is "at least one of three pockets empty", as D-459 says. Rejected: "all slots empty" (would make „Puste — Kieszeń” hold only with three empty pockets, against D-459).
- Targets are read at each call from `ITEMS[..].fits`, so a place gains its target when an item starts to fit it (as `itemTargets` does for actions).
- Undiscovered-part text (`undiscoveredPart` in `understanding.ts`) shows the kind's label, i.e. „Puste” with no place. Left as it is; if the orchestrator wants „Puste — Kieszeń” there, it is a small follow-up in `understanding.ts`.

## Checks (run in the worktree after the final edits; exit codes)

- `npm test -- tests/sim/gear-condition.test.mjs` — written first, run before the implementation: exit 1, 4 of 4 fail (first run failed on the assertion; after the closed-list kind was added but before the implementation, the first run failed with `program: condition kind emptyPlace is not on the closed list`, an expected reason in a test that reaches it). After the implementation: exit 0, 4 pass. Log: `.runs/executor-6/before-gear-condition.log`, `.runs/executor-6/final-gear-condition.log`.
- `npm test -- tests/sim/data.test.mjs` — exit 0 (after the table and the wolf row changed).
- `npm test -- tests/sim/conditions.test.mjs` — exit 0.
- `npm test -- tests/sim/program.test.mjs` — exit 0.
- `npm test -- tests/sim/repertoire.test.mjs` — exit 0.
- `npm test -- tests/invariants/test_program_world_reference.py` — exit 0.
- `npm test -- tests/invariants/test_program_closed_lists.py` — invariant's tripwire seen failing first (exit 1, `the data lists the condition kinds [... 'emptyPlace' ...] ... update CONDITION_KINDS`), then exit 0 after the tuple change (4 tests OK). Logs: `after-tests_invariants_test_program_closed_lists_py.log`, `after2-...`, `final-...`.
- `npm test -- tests/invariants/test_program_rule_pick.py` — exit 0.
- `npm test -- tests/quality/test_mutation_test_selection.py` — exit 0. Mutation run (StrykerJS) not done by me: the simulation part adopts the mutation tool, so the reviewer runs it (per the method).
- `npm run typecheck` — exit 0.

Additional focused checks (not in the slice's list, run because the change touches what they read):
- `npm test -- tests/sim/discovery.test.mjs` — exit 0, 50/50 pass after my change (plan expected possible failures until Slice 8; none appeared).
- `npm test -- tests/view/program-editor.test.mjs` — exit 1, 61 pass / 2 fail after my change. Failing: "every program the editor builds passes setProgram, before sending and during a run" (its literal list of condition kinds lacks `emptyPlace`, line 805) and "the conditions of the pick stand in four sections with no names, in the order of D-290". Both come from the new kind in the data. The plan's *Goal* names this file as left failing until Slice 13.
- `npm test -- tests/view/rule-editor.test.mjs` — exit 1, 80 pass / 2 fail after my change. Failing: "in a grid the arrow keys move among the cells, two columns of conditions, a greyed cell reached and Enter on it doing nothing" and "the conditions stand in two columns in their sections, parted by a line, with no names; no search, no row „ostatnio” and no current value". The plan's *Goal* names this file as left failing until Slice 14.
- `npx eslint` on the six changed TS/MJS files — exit 0 (one unused constant in my new test was found and removed before the final run).
- Prettier `--check` on the changed TS/MJS files — passes (program.ts and the new test were reflowed by `prettier --write`; logic unchanged).
- `npm test -- tests/quality/test_function_and_file_size.py` — exit 0 (after the change).
- `python -B .the-way/elements/common/foundation_check.py` — exit 1, 2 errors, both `tests/view/character-screen.test.mjs` (D-446, D-445 quotations). The same 2 errors appear on the base `5d72724c`; the slice adds none. Note: the handoff said 14 errors; the count here is 2 on both base and after — unclear why, not investigated.

## Failing tests on the slice's base (`5d72724c`)

Measured in a working copy of the base (since removed):
- `tests/view/program-editor.test.mjs`: 63 of 63 pass on the base; 2 fail after my change (listed above).
- `tests/view/rule-editor.test.mjs`: 82 of 82 pass on the base; 2 fail after my change (listed above).
- `tests/sim/gear-condition.test.mjs`: new file; fails on the base as a missing condition kind (expected).
- `tests/sim/data.test.mjs` and `tests/invariants/test_program_closed_lists.py`: pass on the base; pass after.

## Own-work check (section 3)

- Requirement that my work most likely does not meet: "the program check refuses any other place; a place lies in every repertoire" and "a pocket named by its number or position refused". Check: `gear-condition.test.mjs` test 3 refuses `secondHand`, `head`, `torso`, `legs`, `pocket1`, `pocket2`, `Kieszeń`, `""`, `undefined`, and accepts `mainHand` and `pocket`. Result: pass (4 of 4).
- Requirement: the condition holds where the place holds nothing; „Kieszeń” with one empty pocket among three. Check: tests 1 and 2. Result: pass.
- Requirement: in combat the gear is read as the turns before left it. Check: test 4 (judgeProgram with a combat context; empty hand with a stick in the backpack → `go`; stick in the hand → `unmet`). Result: pass.
- Mutations thought through: a wrong place check (accepting `pocket1`) is caught by test 3; an "all slots empty" reading is caught by test 2; a condition reading the backpack instead of the gear is caught by test 1 (the pocket-only case).

## Working copies

- A base worktree `.runs/executor-6/base-wt` at `5d72724c`, with the pinned `.the-way` and `node_modules` as directory junctions to the worktree's own. Before its removal I unlinked both junctions with `Item.Delete()` (link only; the targets were verified present afterwards), then `git worktree remove --force` and `git worktree prune`. Removed; `git worktree list` no longer shows it.
- Scratch copies of my own two files before Prettier, kept in `.runs/executor-6/`, removed.
- Logs kept in `.runs/executor-6/` (command outputs, not copies): `before-gear-condition.log`, `final-*.log`, `after-*.log`, `base-*.log`, `foundation-*.log`, `eslint-after.log`, `size-after.log`, `commit-msg.txt`, `commit-out.txt`.

## Reach beyond the dispatch

- Read `guidelines/testing.md` whole (named by the handoff; it is 510 lines, read in four ranges), `guidelines/coding.md`, `guidelines/coding-simulation-module.md`, `guidelines/coding-content-data.md` whole.
- Read foundation entries by their ranges, not whole files: D-459, D-290, D-143, D-443, D-376, D-26, D-126, D-127 (each entry read whole); invariants `program-world-reference`, `program-closed-lists`, `program-rule-pick`; glossary `repertoire`; part map `simulation`.
- Read the frozen task lines 36–39, 143–146 and 273–278 (the rows of Q14 and the settlements 19–24 that carry Slice 6's sentences).
- Read `src/browser/sim/types.ts`, `data/conditions.ts`, `data/gear.ts`, `data/items.ts`, `program.ts`, `programs.ts`, `understanding.ts`, `action-targets.ts`, the head of `gear.ts`, and the test files `data.test.mjs` (the relevant parts), `conditions.test.mjs`, `action-targets.test.mjs` (the part on checks), `program-fixture.mjs`, `understanding-fixture.mjs`, `program-editor.test.mjs` (the relevant parts).
- Did not read `walkthrough.md` or `ui_check.md`: see the next section.

## Walkthrough (`walkthrough.md`) — not walked

The change alters what the player sees in one way: after the first wolf attack the condition „Puste” enters the Understanding, so it shows in the pick of the rule panel as a kind. The pick's sections and cells (the place's name in the row, the pick's sections) are not changed by this slice; Slices 13 and 14 do that. I did not walk the running product in a browser; the new kind's appearance in the pick was not checked by me. The walk belongs with those slices.

## Unread material

- `docs/task-cycles/wyposazenie-postaci/plan.md`: not read; the slice text in the handoff was taken as given (the handoff says it is copied word for word).
- `guidelines/testing.md`: read in full (510 lines) as above.
- Foundation entries not read: decisions D-26's Verification text was read; D-376 read; D-127/D-126 read; the glossary entry `repertoire` read only in its range.
- `project-level/technology/reserved_choices.md`: not read; no language, library, store or place to run was needed.

## Searches not found or unclear

- The handoff's table of foundation ranges and the plan's: the current ranges of the foundation entries matched the file; no unclear range.
- The handoff said `foundation_check.py` reports 14 errors; it reports 2 on both base and after. Unclear, not investigated.
- `undiscoveredPart` in `understanding.ts` would show "Puste" with no place name; whether the orchestrator wants the place in that text is open (see Choices).

## Problems as observed, with evidence

- Once, I edited `tests/invariants/test_program_closed_lists.py` at the main checkout path (`tests/...`) instead of the worktree path. I reverted the edit at once and re-applied it in the worktree. The main checkout's `git status` was clean afterwards, and its `git diff` on that file is empty; the revert is not a commit anywhere. Reported for transparency.
- Two Bash calls were blocked by the rules hook (`rules-on-demand.sh`) before running; each was re-run unchanged after the hook's rules file was read.
