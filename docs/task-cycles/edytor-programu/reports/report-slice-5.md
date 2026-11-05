# Report — slice 5 of `edytor-programu`

Saved by the orchestrator from the executor's returned text (its tool refused the file). The words are the executor's, condensed only in layout.

**Status:** done with concerns. **Commit:** `23ad6bf` (base `ad60b00`), not pushed.

## Files changed
- `src/browser/view/program-editor.ts` (+431/-13): the pick, fields, time, numbers, sentence, summary, cross-group `moveRule`, `ruleArrows`, `dropGroup`.
- `tests/view/program-editor.test.mjs` (+624): new cases, plus one existing case changed (below).
- `src/browser/sim/data/actions.ts` (+29): `group` on every action and `ACTION_GROUPS` (labels and order).
- `src/browser/sim/data/conditions.ts` (+37): `section` and `place` on every condition, and `CONDITION_SECTIONS`.
- `tests/sim/data.test.mjs` (+57).

## What was made (all new exports of `program-editor.ts` are pure)
- (a) The pick: `conditionPick`, `actionPick`, `conditionTargetPick`, `actionTargetPick`; cells `{value, label, chosen, greyed, reason}`; `PICK_REASONS` holds the four sentences. Knowledge from `repertoireOf` with all branches bought plus the archetype's predispositions; the offer from `editorRepertoire`; „Zapas poniżej” items stay bound to no map.
- (b) Groups and sections held in the data files; condition order inside a section follows the new data field `place`, not the key order of `CONDITIONS`.
- (c) Fields: `conditionFields`, `ruleFields`, `fieldAfter(fields, current)`; names `condition`, `number`, `conditionTarget`, `action`, `actionTarget`.
- (d) Time: `actionTime(state, kind)` gives `{m} min` (through `actionMinutes` during a map run), „tura” for combat, the map's step for a move during a map run, `null` for a move outside one.
- (e) Numbers: `groupNumber(i)`, `ruleNumber(g, r)`.
- (f) Sentence: `conditionSentence`, `actionSentence`, `ruleSentence` give `{condition: "Zapas poniżej 8 · Patyk", action: "Zbierz — Patyk"}`.
- (g) `groupSummary(group, counts)` returns name, condition, ruleCount, executed sum (`null` when counts are `null`; a rule with no entry counts 0); `countText(n)` gives „Wykonano {n}×”.
- (h) `moveRule` crosses group edges (↓ on the last rule to the start of the next group, ↑ on the first to the end of the previous one; `null` only when there is no group to move to); `ruleArrows(program, groupId, index)`; `dropGroup(program, id, beforeId?)` returns `null` for unknown ids, a drop before itself or no change of order; a rule dropped on a folded group is the existing `dropRule` with no `beforeId`, which appends (now with its own case). The `offered…` functions are untouched.

## Checks (command, exit code)
- `npm test -- tests/view/program-editor.test.mjs`: exit 0, 60 tests.
- `npm test -- tests/sim/data.test.mjs`: exit 0, 34 tests (first exit 1, 4 cases deep-equalling whole action and condition objects that now carry the new fields).
- `tests/sim/conditions.test.mjs`, `tests/sim/rules.test.mjs`: exit 0 each. `test_content_identifiers.py`, `test_program_closed_lists.py`: exit 0 each. `npm run typecheck`: exit 0.
- `npm test -- tests/quality/test_quality_invariants.py`: exit 1; only the ruff and shellcheck errors fail; the other 3 pass.
- `npx eslint --max-warnings 0` and `npx prettier --check` on changed files clean; `foundation_check.py` "0 errors".

**Test-first was not followed**: code written before tests; afterwards mutations were applied, tests seen failing, code restored (identical to the committed file). Mutations: branch reason swapped with „nie znasz jeszcze celu” (2 cases fail); no-target reason removed for actions (2); „nie ma go na tej mapie” never set (1); a move's time taken without the map run (1); ↓ across a group edge landing at the end instead of the start (1).

## Existing test changed
`tests/view/program-editor.test.mjs`, case "rule edits preserve other groups, group boundaries and identities": `moveRule(input, 8, 0, 1)` and `moveRule(input, 3, 0, -1)` used to expect `null`, now expect the move across the border; `(input, 8, 0, -1)` and `(input, 3, 1, 1)` stay `null`. Reason: D-297 and To do 7.

## Own-work check
Requirement most likely missed: the four reasons of E18 and the held-value rule. Check: literal-string cases written from D-289, the mutations above, a case with a map lacking a resource. Result: every mutation caught; no case lacks a reason where the task names one.

## Choices made
1. A `place` field instead of reordering `CONDITIONS` (reordering would break the revealing-event order that `data.test.mjs` pins and the order of `Understanding.conditions`).
2. For „Obchód” the branch reason wins over „nie znasz jeszcze celu” (a cell gets one reason; the task gives no precedence).
3. "Nothing to name" means no target pickable now: with a map run, no known resource on the map; for „Zapas poniżej”, no known item (as old `offeredResources`, `offeredItems`).
4. Targets show capitalised (`Patyk`) as the acceptance criterion reads; D-288 and D-306 *Verification* write „patyk”; the data name stays „patyk”.
5. `dropGroup` returns `null` for a no-op drop; `dropRule` does not.
6. With a trailing empty group, ↓ on the last rule of the last non-empty group moves it into that group ("last rule of the program" read as "no group to move to").

## Concerns
1. Held value no reason fits: a held action, condition or „Zapas poniżej” item that the Understanding or archetype does not hold is returned `chosen: true, greyed: true, reason: null`; no reason was made up; D-289 forbids a greyed cell with no reason, so Slice 10 needs a decision on what such a cell says.
2. Number text: sentences use plain `String(value)` (`36.5`, no unit, no decimal comma); nothing in the task fixes it.
3. Old editor focus: the old DOM editor's arrows now cross groups at edges and the unchanged `focusAfter` still points at the origin group; focus lands nowhere after such a move (no crash, thanks to `?.`); Slices 9 and 12 need their own focus target for a cross-group move.
4. Test mutates data: no map lacks a resource, so the „nie ma go na tej mapie” case swaps `MAPS.forest.resources` and restores it in `finally`; the test file runs in its own process.
5. If a map run has every known resource off the map, actions needing a target are greyed „nie znasz jeszcze celu” although the player knows off-map targets; no such map exists today.

## Reaches beyond the handoff
- `tests/sim/data.test.mjs` is outside the slice's *Change* list but inside its *Checks*: four cases deep-equalling whole definitions failed on the new fields; expected `group`, `section`, `place` added; one case added writing out the group of every action and the section and place of every condition from the task's order (D-290).
- Extra reading: `src/browser/sim/run.ts:70-140`; `data/items.ts`, `data/resources.ts`; `plan.md` grepped for rows E4, E18, E19, E22; the rest of `program-editor.ts` around `moveRule`'s callers and `focusTarget`.
- Not opened whole: D-18, D-23, D-90, D-118 to D-120, D-126, D-127, D-179, D-196, D-198, the invariants and the glossary entries; D-288 to D-298 and D-306 read; `understanding.ts` read directly.

## Searches not found or unclear
- Row E4's meaning of "where counts stand" reached the executor only through D-93's text; used `ruleCounts !== null`.
- E37 (D-196's *Verification* „Obchód … absent outside a run”) is false for the new pick; the foundation text not touched by this slice (the foundation step already corrected it).
- Rows E1, E21, E24, E26 taken from the handoff and from D-292, D-295, D-297; the plan's rows only grepped by id.
