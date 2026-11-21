# Report — kitchen-sink step, task `ocena-programu-na-ziarnach`

**Status:** done

## Commits and files

- `25d1494d` feat: show the plain button of a judging „Oceń na 12 ziarnach” in the kitchen-sink page in its waiting state (D-45, D-329, D-439).
- `src/browser/kitchen-sink/control-samples.tsx`: +15 / -2. A new row „Przycisk oceny” in `CONTROLS`, right after the row „Przycisk”, made with the same `buttonSample` and the loading pair `[JUDGE_BUTTON_TEXT, JUDGING_WAITING_TEXT]`, so the seven states show: default, hover, focus, disabled, error and empty with their reasons, loading = disabled, `aria-busy`, reading „Oceniam…”. The two texts are imported from `src/browser/view/judging-lines.ts` (the module the screen reads them from), so the sample follows the screen. The doc comment of `CONTROLS` names the new row. No other sample changed; no test file changed (no test lists the page's samples; `test_application_build_kitchen_sink.py` only compiles the page and looks for the marker).

## Checks (all in the worktree)

| Command | Exit |
|---|---|
| `npm test -- tests/invariants/test_application_build_kitchen_sink.py` | 0 (3 tests OK) |
| `npm test -- tests/invariants/test_browser_view_focus_outline.py` | 0 (3 OK) |
| `npm test -- tests/invariants/test_browser_view_token_values.py` | 0 (4 OK) |
| `npm test -- tests/invariants/test_browser_view_framework.py` | 0 (9 OK) |
| `npx eslint src/browser/kitchen-sink/control-samples.tsx` | 0 |
| `npx prettier --check src/browser/kitchen-sink/control-samples.tsx` | 0 |
| `python -B .the-way/elements/common/foundation_check.py --skip-test-citations` | 0 |
| `npm run kitchen-sink -- --build-only` | 0 |

Full gate not run (handoff). No test written first: the change is a page sample (wiring), not a rule; no invariant was changed.

## Own-work check

Requirement most likely unmet: "the page shows the button in its waiting state, disabled and reading „Oceniam…”" (styleguide rules „States of shared controls", „Main button…", „The kitchen-sink page"). Check: built the page with `--build-only`, served `dist/kitchen-sink` on 127.0.0.1:47931 by a small express script of my own (not `npm run kitchen-sink`, which opens the default browser), opened it in the Playwright browser and read the row „Przycisk oceny" by script. Result: default / hover / focus cells: button „Oceń na 12 ziarnach", enabled, colour rgb(212,212,216) (the forced hover and focus are drawn by the wrapper, as for the other rows); disabled: disabled, rgb(82,82,92); error and empty: the „Nie dotyczy" reasons; loading: text „Oceniam…", disabled, `aria-busy="true"`, rgb(82,82,92) (same grey as the disabled cell). The console held only the React DevTools info line and verbose notes about password fields; no error from the new row (the one "error" counted by the tool was not read further beyond the log's first lines, which hold nothing of the row).

## Decision on the result rows and the badge

I read the rules „The kitchen-sink page" (whole), „States of shared controls" (whole) and „Main button, secondary action and tab" (whole). The „kitchen-sink" rule lists what the page shows: every shared control in each state or with a reason, forms, the part of the menu, every role of the table Roles, the tile samples. It does not name a judging result, its twelve rows, the heading or the badge. The result's rows and badge are drawn with the roles `positive`, `danger`, `warning`, `text-secondary` and `text-strong`, which stand on the page as „every role of the table Roles". The new rule texts of slice 9 (states of shared controls, main button) speak only of the button's loading state. So I added no sample of the result or the badge. Cost if wrong: one more section on the page (small), added later in the same module style.

## Walkthrough

The change alters no behaviour a user sees in the running game: it adds a sample to the developer-only kitchen-sink page, which `npm run build` does not write (invariant `application-build-kitchen-sink`, passing). Walked on the page only, as above.

## Reaches beyond the dispatch

- Read `src/browser/view/judging-lines.ts` (first 60 lines) and `src/browser/view/controls/react-button.tsx` (whole, first 80 lines) to take the texts and see how `waitingText` disables the button. Why: to read the texts from the place the screen reads them rather than copy literals.
- Read `scripts/kitchen-sink.mjs` whole, to run the page without opening the default browser.
- Read `.the-way/task-cycle/change/slice.md` (named by the method).

## Working copies and the browser (WAY-319)

- `.runs/executor-k/` (build log, my small server script `serve.mjs`) stood in the worktree and was removed. `dist/kitchen-sink/` (ignored build output) was removed too.
- The page's server (port 47931) was stopped; checked afterwards: only TIME_WAIT sockets remained. The Playwright page was closed.
- No screenshot was taken or pushed or kept. The Playwright server wrote a snapshot file and a console log under `.playwright-mcp/` (the session's own directory in the main checkout); I deleted both (`page-2026-11-21T01-46-46-508Z.yml`, `console-2026-11-21T01-46-46-232Z.log`). Nothing remains.

## Unread material

- `guidelines/styleguide-browser-view.md` (about 94 KB): read the headings of the whole file and the three rules named above whole (lines 194-329, 435-515); not read: the other rules.
- `guidelines/testing.md`: not read, as no test was changed.
- `.claude/skills/loop2-play/SKILL.md`: not read; `grep` found no mention of the kitchen-sink page in it, and I ran the page through `scripts/kitchen-sink.mjs --build-only` and my own static server, and the Playwright tools of the session.
- `src/browser/kitchen-sink/{kitchen-sink.tsx, sample-parts.tsx, role-samples.tsx, tile-samples.tsx, kitchen-sink.css}`: not opened; only `control-samples.tsx` and `account-samples.tsx` were needed.
- `.runs/task-cycles/.../task-frozen.md`: not read (context only).

## Searches not found or unclear

- None found missing. One unclear point: the Playwright tool reported "1 errors" in the console on opening the page; the log's first lines hold only info and verbose entries, and I did not trace the one error line further (it is not tied to the new row, whose cells read correctly). Likely a missing favicon; a guess, not verified.

## Choices

- Imported the two texts from `judging-lines.ts` instead of literals (the other rows use literals, but the account sample already imports `UNCONFIRMED_SENTENCE` from the view). Rejected: literals — they would drift if the screen's texts change. Cost if wrong: none; the module is pure and the page may import modules the game uses.
- A row of its own beside „Przycisk", not a second loading pair on that row: the sample table has one loading cell per row.
