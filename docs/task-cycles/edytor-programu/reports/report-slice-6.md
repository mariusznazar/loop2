# Report — slice 6 of `edytor-programu`: the pick cell as the eighth shared control

Saved by the orchestrator from the executor's returned text (its tool refused the file). The words are the executor's, condensed only in layout.

**Status:** done with concerns. **Commit:** `69158b7` (base `23ad6bf`), not pushed.

## Files changed
- `src/browser/view/controls/pick-cell.ts` (new, +66): DOM form; `createPickCell({ text, icon?, chosen?, greyed?, reason?, onPick? })`, `setPickCellChosen(element, chosen)` calling `setButtonSelected`.
- `src/browser/view/controls/react-pick-cell.tsx` (new, +61): `ReactPickCell`, same tree, classes and attributes.
- `tests/view/react-controls.test.mjs` (+166): 7 new cases.
- `src/browser/styles.css` (+43): `.button.pick-cell`, `.button.pick-cell.greyed`, `.pick-cell-reason`, `.action-icon`.
- `src/browser/kitchen-sink/kitchen-sink.ts` (+33/-2): `pickCellSample`, rows "Komórka wyboru" and "Komórka wyboru wybrana", four new not-applying reasons.
- `kitchen-sink.css` not changed (the existing `.sample-hover` and `.sample-focus` rules cover the forced samples).

## What was made
The cell is a `button type="button"` with classes `button pick-cell`, plus `selected` when chosen and `greyed` when greyed; `aria-pressed` always set; a greyed cell gets `aria-disabled="true"` and never `disabled`. Children: optional `span.action-icon` (aria-hidden, `--icon: url("/icons/{file}.svg")`), the name, and when greyed with a reason `span.pick-cell-reason`. The click handler is attached only to a cell that may be picked (React passes `onClick` only when not greyed). The icon is a CSS mask in `currentColor`, so it greys with the cell. The look lives in `styles.css` only.

## Checks (command, exit code)
- `npm test -- tests/view/react-controls.test.mjs`: exit 1 on stubs (6 of 42 failing on assertions, including "a greyed pick cell with its reason is the same element in both forms"); exit 0 after implementation (42/42) and after final formatting.
- `node scripts/kitchen-sink.mjs --build-only`: exit 0; `npm run kitchen-sink` also built and served, stopped afterwards.
- `test_application_build_kitchen_sink.py`: exit 0 (3). `test_browser_view_token_values.py`: exit 0 (4). `test_browser_view_focus_outline.py`: exit 0 (3). `npm run typecheck`: exit 0.
- `npm test -- tests/quality/test_quality_invariants.py`: exit 1; only `test_ruff_source_rules` and `test_shellcheck_source_rules` fail (base state); a first run also failed `test_prettier_source_format` on the test file, fixed, rerun shows only the two base errors.
- `npx prettier --check ...` on changed files: exit 0 after fix. `npx eslint --max-warnings 0` on the four changed JS/TS files: exit 0.
- Not run: the full gate; the foundation check (not in this slice's Checks).

## Mutation checks
- `setPickCellChosen` a no-op: `react-controls` exit 1, failing "a pick cell chosen in place is the same element as one drawn chosen"; restored.
- React `onClick={onPick}` ignoring the greyed guard: exit 1, failing "a greyed pick cell is aria-disabled, not disabled, and a click on it reaches no handler in either form"; restored, files compared byte-for-byte with backups.
- The "chosen in place" case passed against the stub (which ignored `chosen`); not seen failing before implementation; the mutation shows it discriminates now.

## Own-work check
- Weakest point: the icon URL travels in an inline custom property read by CSS `mask`. The cases assert the path appears in the `style` attribute of both forms; the browser computes `mask-image` as `url("http://127.0.0.1:63939/icons/grab.svg")` and the icon renders in the screenshot.
- Requirement most likely missed: a greyed cell reachable by keyboard that reads its reason and is not `disabled`. Check: focus on the cell before the greyed one, then Tab. Result: focus on the greyed cell, `aria-disabled="true"`, no `disabled`, `:focus-visible` true, text "Zbierznie znasz jeszcze celu".

## UI check
Kitchen-sink page served at `http://127.0.0.1:63939/` and driven with playwright-cli 0.1.22 (plain HTTP, no certificate step).
- Default: text rgb(212,212,216) = `text`; frame rgb(113,113,123) = `control-border`; icon drawn.
- Under the pointer (real hover on the default cell): background rgb(39,39,42) = `highlight`.
- Visible focus: `:focus-visible` true; the forced focus sample shows the outline.
- Chosen: frame `selected`, text `text-strong`, in the "wybrana" row.
- Greyed with reason "nie znasz jeszcze celu": dashed frame, name in `text-disabled`, reason in `text-secondary` below the name, icon greyed.
- Error, empty and loading show the reason each does not apply.
- Screenshots (in the ignored record directory; inspected by eye: the table at rest; the other two confirmed by computed style):
  - `C:\Storage\repos\loop2-wt\edytor-programu\.runs\task-cycles\edytor-programu\reports\slice-6-table-rest.png`
  - `C:\Storage\repos\loop2-wt\edytor-programu\.runs\task-cycles\edytor-programu\reports\slice-6-table-hover.png`
  - `C:\Storage\repos\loop2-wt\edytor-programu\.runs\task-cycles\edytor-programu\reports\slice-6-table-greyed-focus.png`
- One pre-existing 404 for `favicon.ico`; no new console errors. Browser closed, server stopped, `.playwright-cli/` and scratch folder removed.

## Choices made
1. Icon URL in the `--icon` custom property (rejected: a CSS rule per icon file — 11 duplicated entries; an `<img>` — cannot take the text colour). Cost if wrong: a missing file shows an empty cell; tests check the path, not that the file exists.
2. Icon size `height: 1lh; aspect-ratio: 1` (rejected: `em`/`px`, which the token invariant forbids; a new token, which needs a source). `lh` passes the scanner but is a layout dimension a reviewer may want named.
3. Greyed frame in `text-disabled`, dashed (rejected: `control-border`, since a greyed cell cannot be clicked, D-40). The styleguide names the dashed frame but no colour; a reviewer should confirm.
4. A greyed cell still gets the `highlight` background under the pointer, as any control does. Cost if wrong: a non-pickable cell looks pickable on hover; one rule to change.
5. The click guard lives in the control, not in each screen. 6. `aria-pressed` always set. 7. Kitchen-sink sample "Zbierz" with icon `grab`, reason "nie znasz jeszcze celu" (D-289). 8. Two rows (not chosen, chosen).

## Reaches beyond the handoff
Read whole: `guidelines/testing.md`, `coding.md`, `coding-browser-module.md`, `styleguide-browser-view.md`; `src/browser/AGENTS.md`; `styles.css:1-370`; `kitchen-sink.ts:1-310`; `kitchen-sink.css`; `button.ts`; `react-button.tsx`; the button cases of `react-controls.test.mjs`; D-288 to D-291 and D-265; `actions.ts` icon fields; `program-editor.ts` `PICK_REASONS`; `loop2-play/SKILL.md`; the token-value invariant's scanning rules; `ui_check.md`; `scripts/kitchen-sink.mjs`; `report-slice-5.md`; `plan.md` (Slice 6 section). The mutation recipe in `testing.md` is for simulation files only; not run. Read the user's `scripts.md` and `git.md` late, after one Python heredoc edit (explicit UTF-8 and LF; the file stays LF).

## Searches not found or unclear
- The plan's Change list names `kitchen-sink.css`; not needed, not changed.
- The styleguide gives no colour for the greyed dashed frame (choice 3).
- `coding-browser-module.md`'s "Files of this kind" table has no rows for the two new files; not in this slice's Change list (Slice 14 adds them).
- The foundation check was not run (not in this slice's Checks).
