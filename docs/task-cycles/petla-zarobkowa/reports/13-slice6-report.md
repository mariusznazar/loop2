# Report — Slice 6, the report in the headquarters

**Status:** done with concerns (two small ones, below)

**Commit:** `34417de` (author the owner's address). Worktree clean.

## Files (added/removed lines)
- `src/browser/view/away-report.ts` new (+161): pure texts `AWAY_TITLE`, `STOPPED_TITLE`, `CHEST_FULL_TEXT`, `reportTitle`, `reportEntries`, `reportChestFull`; `createAwayReport(close)` draws the section. Nothing touches the DOM at import.
- `src/browser/view/headquarters.ts` (+19/-1): the section above „Drużyna”, control `closeReport`, focus target.
- `src/browser/view/game-view.ts` (+5/-1): `closeReport` = `clock.flush()` then `act(closeAwayReport(state))`.
- `src/browser/styles.css` (+21): `.away-report-list`, `.away-report-line(.danger)`, `.away-report-full`, tokens only.
- `tests/view/away-report.test.mjs` new (+185), `tests/view/account-screen.test.mjs` (+190/-1).

## Checks (command, exit code)
- Test first, red by assertion: `npm test -- tests/view/away-report.test.mjs` exit 1 against a stub (empty titles, no entries, chest never full); same for the 6 new account-screen cases (assertion "the section of the report is built").
- `npm test -- tests/view/away-report.test.mjs` exit 0 (14 pass)
- `npm test -- tests/view/account-screen.test.mjs` exit 0 (51 pass)
- `npm test -- tests/view/headquarters.test.mjs` exit 0 (18 pass)
- `npm test -- tests/quality/test_quality_invariants.py` exit 0
- `npm run typecheck` exit 0
- `python -B .the-way/elements/common/foundation_check.py` exit 0 ("0 errors")
- Not run: the product's gate (`npm test` without argument), as instructed.

## Own-work check
Requirement most likely missed: focus after „Zamknij” (D-42, Left to the maker). Test: focus the button, click, assert focus is not on the body, is on a shown element inside the headquarters (the fake model keeps focus on a hidden button, so a missing focus move fails). Browser: Enter on „Zamknij” focused via keyboard -> `document.activeElement` is H3 „Drużyna”, the section gone, 1 save sent; next Tab reaches „Program: Ala” with a solid outline from the one `:focus-visible` rule.

## Browser check
Method: `npm run build`, static server `.runs/harness/serve.mjs` on 127.0.0.1:4455 with a new page `.runs/harness/h2.html`/`h2.js` (game view from crafted state, counting saves), Playwright MCP. Server stopped, browser closed.
- Reached, screenshot inspected: title „Gdy cię nie było” with a stopped line in `danger` first (with „po 7 min”) and a going line in `text` with chest +/-, practice, „wskrzeszenie zużyte”, above „Drużyna”; title „Pętle, które stanęły” with a live stop line without minutes and „Skrzynka jest pełna.” in `warning`. Screenshots: `.runs/task-cycles/petla-zarobkowa/reports/shots6/s1-away.png`, `s2-stopped-full.png`.
- Unchecked in the browser: the section after „Zakończ” of a manual run (covered only by the document-model test); a mouse click on „Zamknij” (keyboard Enter only).
- Console: one error on page load, not read (likely favicon 404; unverified).

## Choices
- Focus goes to the „Drużyna” heading, given `tabindex="-1"`, so the next Tab reaches the team's first control. Rejected: the first row's program list (arrow keys would change a program) and the name field. Cost if wrong: a one-line move; the heading carries an unmarked tabindex, which the focus-outline invariant does not forbid (quality test passed).
- „Zamknij” is a plain button (D-44 lists no destructive status for it).
- Minus sign is U+2212 as in the task's „−”.
- The section is built always and hidden when empty; shares class `headquarters-section` for spacing.
- Item/skill parts follow the order of `ITEMS`/`SKILLS` data.

## Changed existing test
`tests/view/account-screen.test.mjs` "a change of the chest redraws the chest alone…": the chest heading was found as `headquarters-section[1]`; the new report section is now section 0, so it finds the heading via the parent of `.chest-list`. Source: spec section 11/D-229 (section above „Drużyna”). Assertions unchanged.

## Reaches beyond the dispatch
- `foundation_check.py` (run to confirm the new file belongs to part `browser-view`; it does via `src/browser/view/**`).
- `guidelines/coding-browser-module.md` lists browser-module files; I did not add the new file there (the dispatch did not ask).
- `.the-way/task-cycle/change/slice.md`, `ui_check.md`.

## Searches not found or unclear
- Plan's *Read* mentions `status-row.ts`/`trip-lines.ts` as models; no pattern for moving focus after a removed control exists in the view besides `email-status.ts` (`button.focus()`); none for a heading target.
- Playwright screenshots can only be written under `C:\Storage\repos\loop2` (allowed roots); I moved them from there into the worktree's `.runs`.

## Concerns
1. The tabindex heading choice above (decision for the orchestrator).
2. The load-page console error was not read.
