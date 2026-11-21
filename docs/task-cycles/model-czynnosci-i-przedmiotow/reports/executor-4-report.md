Status: done

# Executor report — slice 4: the row of one field moves out of `RulePanelView`

## Status

`done`. One commit on `task/model-czynnosci-i-przedmiotow`: `9976d7366ec6f72ea22500771d395ddaf53f5245` (base was `76c50d86606c6fb2432e61166d38f16903dd7778`). Worktree is clean.

One-line check result: all focused checks, the typecheck, ESLint, Prettier and the size rule run passed (exit 0); the full gate was not run, as the handoff requires.

## Files changed

- `src/browser/view/rule-panel.tsx`: +103 / -60 lines, one commit.

## What changed

- The nested `renderField` closure of `RulePanelView` is gone. Its body is now `FieldRow`, a component of the same file (declared after `NumberRow`), with a typed props object `FieldRowProps`. It takes what it reads as props: `state`, `field`, `condition`, `action`, `fields`, `active`, `cursor`, `tabbable`, `grid`, `numberInput`, `moveTo`, `onCursor`, `onChoose(field, value)`, `onCommitNumber`.
- `RulePanelView` maps `fields` to `<FieldRow key={field} …>`. The handlers it passes are the same functions as before (`setCursor`, `choose`, `commitNumber`, `moveTo`), so the panel draws, focuses and commits the same way.
- No test changed. No foundation entry changed.

## Size after the move (D-425)

- `RulePanelView`: 200 code lines before, 161 after. Measured by an ad-hoc counter (blank lines and comment-only lines not counted, lines of nested functions counted in the function that holds them), not by ESLint.
- `FieldRow`: about 65 code lines by the same counter, under the limit.
- The rule run `node tests/quality/eslint-size-rules.mjs` reports `0 functions and files over a threshold in 338 files` before and after the change.
- Sorting for the model of actions and items (To do 14), as the plan asks: `src/browser/view/rule-panel.tsx` is sorted as **one-time**. The change is a move with no change of behaviour, made for the size limit; it is not part of the model change itself.

## Checks

Each check, with its command and exit code:

| Check | Command | Exit | Result |
|---|---|---|---|
| Typecheck | `node scripts/build.mjs --check` | 0 | passed (this is the repo's `typecheck` script) |
| ESLint on the changed file | `npx eslint src/browser/view/rule-panel.tsx` | 0 | no findings |
| Prettier on the changed file | `npx prettier --check src/browser/view/rule-panel.tsx` | 0 | passed |
| Size rule run | `node tests/quality/eslint-size-rules.mjs` | 0 | 0 over threshold in 338 files, before and after |
| Focused test | `npm test -- tests/view/rule-editor.test.mjs` | 0 | 76 pass, 0 fail |
| Focused test | `npm test -- tests/view/program-panel.test.mjs` | 0 | 60 pass, 0 fail |
| Focused test | `npm test -- tests/quality/test_function_and_file_size.py` | 0 | 2 tests, OK |

Checks that did not pass on the first try:

- `npx tsc --noEmit -p .` exited 1 with `TS5081: Cannot find a tsconfig.json`. The repo has no root tsconfig; this is a wrong command on my part, not a failing check. The typecheck above is the repo's own.

Checks not run, with the reason:

- The full gate (`npm test` with no argument, or the folder-wide `node --test`) — not run, per the handoff; it waits for the orchestrator's signal.
- Browser or screenshot check — not run. The slice changes no visible output and no behaviour; the plan asks for a state check by code and tests.

No test was written first and none was changed, so there is no failing run to report and no invariant test to see fail.

## Own-work check (section 3)

- Requirement (the slice's Goal): nothing the panel draws, focuses or commits changes; `RulePanelView` falls well under the limit.
- Check: the two focused view tests and the size test above, plus the size run. These exercise the panel's drawing, focus and commit paths and the size limit.
- What it showed: all pass. `RulePanelView` went from 200 to 161 code lines.

## Choices made

- **A component, not a plain function, for `FieldRow`.** Chosen so the row has one props object and its own name in React's tree. Cost if wrong: none seen; the tree shape is the same DOM. Rejected: keeping `renderField` as a closure and moving only `NumberRow` out. It would not bring `RulePanelView` under the plan's goal with room left for slice 14.
- **`condition` typed as `Condition`, not `Condition | undefined`.** `RulePanelView` returns early when `condition` is undefined, so the row never sees undefined. The `condition === undefined` guard and the `?? { kind: "always" }` fallback in the old closure were unreachable, so I removed them. Cost if wrong: if a later change lets the row render without a condition, the type will flag it at compile time, which is the intent.
- **`key` moved from the inner elements to the `<FieldRow>` in the map.** The inner elements are no longer in an array. Keys stay stable per field, so React reconciles the rows as before.
- **Adaptation of section 4 (plan and code disagree):** none. The plan's shape matched the code.

## Reaches beyond the handoff

- Read `guidelines/coding.md` (named by the handoff), `guidelines/coding-browser-module.md`, `guidelines/styleguide-browser-view.md` (read whole; it has no rule touched by this change), `src/browser/AGENTS.md` (read whole), `foundations/decisions.md` D-425 (lines 841–860 printed; the entry runs to the D-426 heading), `foundations/invariants.md` `function-and-file-size` (read whole).
- Two Bash calls were stopped by the rules hook (`rules-on-demand.sh`) before they ran. The hook showed `.ai/rules/scripts.md` and `.ai/rules/git.md`; I read them from its output and retried the same commands unchanged. Noted as an observation only; it cost one retry each.

## Unread material

- `guidelines/testing.md`: not read. I wrote and changed no test, so the rule that reads it before a test change did not apply.
- `.the-way/task-cycle/change/ui_check.md`: not read. The slice changes no visible output (see Checks).
- `.the-way/task-cycle/change/walkthrough.md`: not read. The slice alters no behaviour a user sees; the walkthrough applies only to such a change.
- `foundations/decisions.md` D-426 and the rest of that file: not read beyond the heading; not named by the slice.
- `tests/view/rule-editor.test.mjs`, `tests/view/program-panel.test.mjs`, `tests/quality/test_function_and_file_size.py`: run, not read whole.

## Searches not found or unclear

- A root `tsconfig.json`: looked for it (by running `tsc -p .`), not found. The repo's typecheck is `scripts/build.mjs --check`; I used that.
- Otherwise: none.

## Working copies

- `.runs/executor-4/`: held a copy of the file before the change (`before.tsx`), a one-off measure script (`measure.mjs`) and the check outputs. Not a worktree. Removed by its full path after this report was written; no remainder.

## Questions for the orchestrator

- None.
