# Report — slice 14 of `edytor-programu`: the coding guidelines of browser modules name the new files

Saved by the orchestrator from the executor's returned text (its tool refused the file); layout condensed, content kept.

**Status:** done. **Commit:** `01363a5` (base `3664173`), `docs: :memo: name the new files of browser modules in their coding guidelines`, not pushed. **Pinned .the-way** checked, matches `f45ca40724251a46965aed69f733d0a35c430048`.

## Changed
`guidelines/coding-browser-module.md` only (+12/-4). In the *Files of this kind* table the row `src/browser/view/program-panel.ts` (`do not copy`) became `src/browser/view/program-panel.tsx` (`copy`); rows added with status `copy`, decision `—`: `controls/pick-cell.ts`, `controls/react-pick-cell.tsx`, `controls/react-select-list.tsx`, `controls/react-number-field.tsx`, `rule-list.tsx`, `rule-panel.tsx`, `trip-plan.tsx` (alphabetical order kept); no existing status changed, no rule added. In the example *Kontrolki w DOM i ich aktualizacja* the sentence listing the React forms now adds `ReactSelectList`, `ReactNumberField` and `ReactPickCell` (names checked against the `export function` lines); paragraph re-wrapped, rest unchanged.

## Checks
`python -B .the-way/elements/common/foundation_check.py` exit 0, `0 errors`; `npm test -- tests/invariants/test_browser_view_framework.py` exit 0 (9 tests OK); own check: the 43 `src/browser/view/...` paths of `git ls-files` and the 43 table rows identical under `diff`. Not run: the full gate. No UI changed.

## Own-work check
Every table path is tracked by git, every tracked file of `src/browser/view` has a row, statuses follow the plan: diff identical. Weakest point: the `copy` status of `controls/pick-cell.ts` and the React files follows the plan's wording and was not re-judged against D-265.

## Reaches
Read `.the-way/product-guidelines/template.md` and `coding/template.md`; grepped `guidelines/`, `foundations/`, `src/` for the new names (other mention: `guidelines/styleguide-browser-view.md:244` names `controls/pick-cell.ts`); `git show 3664173 --stat`; `program-editor.ts` row check.

## Concerns (not changed)
1. `src/browser/view/program-editor.ts` may have a stale status: commit `3664173` removed 625 lines of it; the file still exists (29 381 bytes), has no `document.` or `createElement` call, and React files import pure functions from it (`readNumberField` in `controls/react-number-field.tsx`, `offeredItems` in `program-panel.tsx`, plus imports in `rule-list.tsx` and `rule-panel.tsx`); the row stays `do not copy` (the handoff forbids changing existing statuses); the rule's own text allows importing pure functions of such files, but the row's rationale no longer matches the file; decision needed: keep `do not copy`, or re-audit.
2. `copy` for `controls/pick-cell.ts` and the new React files follows the plan; if a later audit finds the DOM form of `pick-cell.ts` does not meet D-265, revisit.

## Searches not found or unclear
None for the required paths and names; unclear: whether `program-editor.ts` should keep `do not copy` after `3664173` (concern 1).
