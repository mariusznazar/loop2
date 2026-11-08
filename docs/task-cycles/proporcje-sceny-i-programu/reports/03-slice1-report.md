# Report 03-slice1 — executor of slice 1

**Status:** done

## Commits
- `a5aa424` feat: draw the rule panel in the rule list under the row or header it changes (on `task/proporcje-sceny-i-programu`, on top of `189d589`)

## Files changed (added / removed lines)
- `src/browser/view/rule-list.tsx` 46 / 3
- `src/browser/view/program-panel.tsx` 21 / 31
- `src/browser/styles.css` 6 / 12
- `tests/view/rule-editor.test.mjs` 157 / 0
- `tests/view/program-panel.test.mjs` 55 / 11

## What was made
- `RuleListProps` takes an optional `panel?: ReactNode`. `RuleListView` draws it only where `open` names a place:
  - right after the open row, as its own `<li className="rule-list-panel">` in the same `<ol>`, a sibling of the row's item, never inside it (so no handler of the row sees a click, key or drag in the panel);
  - right after the header (`<div className="rule-list-panel">`) when the open target is the group's own header, or when the open rule sits in a folded group (its row is not drawn), or (defensive) when the rule is not found in its group.
- `ProgramPanelView` passes `panel={ruleHost === null ? rulePanel : null}`. The hosted path (`placeRulePanel`, portal) is unchanged. `program-editor-layout`, `with-panel`, `program-rules` and `program-rule-panel` are gone from the view and the stylesheet; the list stands directly in `.program-editing`.
- `styles.css`: the layout rules are replaced by one `.rule-list-panel` rule (`list-style: none; margin: var(--space-xs) 0;`), tokens only. The rule panel keeps its own frame and padding.
- Focus (panel takes focus on opening, "✕" and Escape give it back to the row or header) and "opening another rule moves the panel" work through the unchanged `RulePanelView` and `focusClosed` code; the panel now remounts when it changes place, and its existing mount effect focuses it.

## Tests
Written first, seen failing for the expected reason (panel not drawn / not under the row), then passing:
- `tests/view/rule-editor.test.mjs`, five new cases: panel right after the open row and not inside its item; right after the open header; right after the header of a folded group holding the open rule; nothing drawn with no panel handed over or with nothing open, and the panel moves when another rule or a header opens; a click, a key and a drag over the panel reach no handler of the row or header.
- `tests/view/program-panel.test.mjs`: the case that expected the panel beside the rows (both modes) now expects it right under the row and the header and no layout/`with-panel`; one new case: a rule open in a group that is then folded keeps its panel under the header, and under the row again after unfolding.
- Mutation seen: moving the panel inside the row's `<li>` fails three of the new rule-editor cases (restored before commit).

### Failing runs (before the code)
- `npm test -- tests/view/rule-editor.test.mjs` exit 1 (5 new cases failing: "expected 1, got 0" and a null target)
- `npm test -- tests/view/program-panel.test.mjs` exit 1 (the two modes of the rewritten case failing)

## Checks (command and exit code, after the change)
- `npm test -- tests/view/rule-editor.test.mjs` 0 (69 pass)
- `npm test -- tests/view/program-panel.test.mjs` 0 (52 pass)
- `npm test -- tests/view/run-screen.test.mjs` 0 (13 pass)
- `npm test -- tests/view/rule-signs.test.mjs` 0 (6 pass)
- `npm test -- tests/view/account-screen.test.mjs` 0 (128 pass)
- `npm run typecheck` 0
- `npx eslint --max-warnings 0 src/browser/view/rule-list.tsx src/browser/view/program-panel.tsx` 0
- `npx prettier --check --no-config --no-editorconfig --ignore-path .gitignore <the five files>` 0
- `npm test -- tests/invariants/test_browser_view_token_values.py` 0
- `npm test -- tests/invariants/test_browser_view_focus_outline.py` 0
- Extra, tests of code next to the touched code: `tests/view/end-question.test.mjs` 0, `tests/view/scene.test.mjs` 0.
- Not run: the full `npm test` (the orchestrator's run) and `foundation_check.py`. The invariant tests were not seen failing first: no code of the slice breaks them and the handoff did not ask for new invariant tests.

## Own-work check
- Requirement most likely not met: a rule open in a folded group, whose row is not drawn, must still have its panel (under the group's header), and opening another rule must move the panel instead of leaving two. Check: the folded-group case and the "moves" case in `rule-editor.test.mjs`, and the fold-while-open case in `program-panel.test.mjs`. Showed: all pass; exactly one panel stands in each state.
- UI check (`ui_check.md`): states of the affected components are in code only: the row, the header and the panel keep their classes and states; the new place has no state of its own (no hover, no focus rule: focus comes from the one `:focus-visible` rule). **Screenshot of the running product: unchecked**, as the handoff says: both screens still give the panel a host, so the player does not see the new place until slices 2 and 4, which carry the browser check. Reading code shows no rendered appearance (e.g. the gap `--space-xs` around the panel and the four-cell pick grid at the list's width are unseen).

## Reaches beyond the dispatch
- None beyond the *Read* list.

## Searches not found or unclear
- none

## Choices, adaptations, notes
- Chose `<li>` (sibling of the row's item in the `<ol>`) over a `<div>` after the `<ol>`, so the panel stands directly under its row between the rows; cost if wrong: the screen-reader count of list items includes the panel item while it is open.
- Dragging a rule over the panel behaves as dragging over the empty rest of the group (the event bubbles to the group's `section`, landing at the group's end, as for any non-row part of the group). Not blocked; a stop would leave a stale drop line.
- The panel remounts when it changes place (another row, header, or the row moving to another group by "↑"/"↓"), so its field state resets to the condition. For "↑"/"↓" across a group border the list's own focus effect runs after the panel's and leaves the focus on the arrow, as before.
- Stale wording left outside the slice's *Change* list: the header comment of `src/browser/view/rule-panel.tsx` ("It stands beside the rule list") and the comments in `styles.css` about the right area/three columns and the 276 px panel are not touched; they belong to slices 2 and 4 or to a later pass. I edited the header comments of `rule-list.tsx` and `program-panel.tsx`.
- No sentence of the foundation entries is wrong for the code (D-288, D-311, D-349 read as stands). D-282's "complies" wording about "the rule panel opening in place in the editor" matches the unhosted path now.
- Leftover class `.rule-panel-host` (the element `createRulePanel` builds) and the hosted classes (`with-rule-panel`, `rule-panel-area`) stay: slices 2 and 4 use them.
