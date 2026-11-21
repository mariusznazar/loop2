FAIL 8591aa8297c4a2af33a39332abc4cb515cfb007f

# Review of correction 1 — the pick of actions at 390 px (review-change, a correction for the human's remarks)

Range `921a4768eb6911f6816f29cefb0816edf8c354c5..8591aa8297c4a2af33a39332abc4cb515cfb007f`, one commit `8591aa82`; `git rev-parse HEAD` printed `8591aa8297c4a2af33a39332abc4cb515cfb007f`, and `.the-way` stands on the pinned `19e5774aed6d1d628042e23deccc110ed9f112c0`. Files of the range: `src/browser/styles.css`, `src/browser/view/controls/react-pick-cell.tsx`, `tests/view/shared-controls.test.mjs`, `tests/view/rule-editor.test.mjs`, `tests/view/item-verb-panel.test.mjs`. None of them is a trust boundary in the part map or in the table "Trust boundaries" of `guidelines/testing.md`; the change holds no operation that cannot be undone; no screenshot file is among the commits.

Counts: 1 blocking (Important), 2 Minor, 0 out of scope.

## Findings

### Important

**1. The correction fixes a look in windows below the smallest supported window, which D-396 says is not fixed, and its two new tests protect a requirement the foundation does not hold.**

- Place: `src/browser/styles.css:438-479` (the rules `.button.pick-cell`, `.pick-cell-name`, `.pick-cell-reason` and their comment), `src/browser/view/controls/react-pick-cell.tsx:59`, `tests/view/shared-controls.test.mjs:784-831` (the two new cases).
- What is wrong: D-396 (`foundations/decisions.md:5436`, scope browser-view) says: "The smallest window the game supports has a page area of 1280 × 720 px … a fault of the look in a window below the smallest, where no decision defines it, is not fixed", and its verification names as a violation "a change made only to fix a look in a window below the smallest where no decision defines it". The fault the walk found stands at 390 px, and the corrector's own wider finding at 1074–1200 px; both are below 1280. My measurements (below) show that at 1280 and 1440 px the layout of every cell, with the old rules and with the new, is the same to the pixel on both screens and in all three picks — so the change alters nothing at a supported width and is made only for windows below the smallest. No decision defines the look of the rule panel's pick in a narrower window: the decisions D-396 lists as defining narrower looks (D-280, D-282, D-311, D-349, D-370, D-389) say nothing of the pick cells, and D-288, D-290, D-291, D-293, D-306 and D-363 say nothing of a cell's width. The correction report does not name D-396 and records nothing.
  The two new cases then guard "the name of a pick cell stays inside its frame in a narrow grid", a requirement no foundation entry holds; `guidelines/testing.md`, rule "Where the expected value comes from": "Wymaganie, którego test potrzebuje, a którego fundament jeszcze nie niesie, trafia najpierw do fundamentu, dopiero potem test z niego korzysta."
- Why it matters: the code and the foundation now say opposite things. A later agent who reads D-396 is entitled to treat the narrow layout of the pick as unrequired and drop it in a refactor (and the second new case would then look like a test of nothing the foundation asks), or to cite this commit as leave to fix other narrow-window looks against D-396. The remark ("Fix what the walk finds in this request", `correction-1-remarks.md`, item 1) was written before the walk and does not name the window width; it does not settle whether a finding below 1280 px is a fault to fix under D-396.
- Evidence: D-396 text quoted above; my geometry comparison at 1280/1440 px (0 of 14 action cells, 0 of 7 condition cells and 0 of 1 target cell differ between the old and the new rules, on Programy and on the map-run screen); positive control at 390 px with the old rules reproducing the overflow of „Eksploruj”, „Obchód”, „Wytwórz — ognisko (6 patyków)”, „Zapal — ognisko (…)”, „Odskocz” and „Wytwórz”.
- The way out (the orchestrator's choice; one of two):
  - (a, recommended) keep the code and record the rule it serves, through `the-way-record-decision`, as a sentence of the decision of the pick (D-290 or D-288) such as "a cell's name and reason stay inside its frame at every width of the window, the name dropping under the icon where its longest word does not fit beside it", so that a decision defines that look and D-396's exception applies; the request then names this decision change for Mariusz's acceptance. Cost: one decision sentence and its verification line; the code, the tests and the walk's screenshot stay as they are, and narrow windows (a 1280 px laptop with a side panel open is one) keep a pick that reads.
  - (b) revert `8591aa82` and report the walk's fault as standing below the smallest window under D-396, not fixed. Cost: the working fix is thrown away, the overflow comes back in every window under about 1200 px on the map-run screen, and nothing in the foundation changes.
- Contradiction: yes — D-396 ("a fault of the look in a window below the smallest, where no decision defines it, is not fixed"; verification: "violates: … a change made only to fix a look in a window below the smallest where no decision defines it").

### Minor

**2. The second new case pins the mechanism of the layout, not the behaviour.** `tests/view/shared-controls.test.mjs:808-831` asserts `display: inline-flex`, `flex-wrap: wrap`, `overflow-wrap: break-word`, `min-width: 0px` and `flex-shrink: 1`. A correct change that keeps every name inside its frame another way (a grid with a `min-content` track, `overflow-wrap: anywhere` plus a basis of its own, container queries) fails it, which the rule "Behaviour, not implementation" of `guidelines/testing.md` asks a reviewer to name. The corrector chose it knowingly (report, choice 3: jsdom resolves the cascade, not the layout) and it fails loudly rather than passing falsely, so it blocks nothing; once finding 1 is settled by (a), the case at least stands on a requirement of the foundation.

**3. A pick cell with no width given grows by the width of its icon and name when it is greyed with a reason.** In the game every cell has `width: 100%` from `.rule-panel-cell > .pick-cell` (`src/browser/program-panel.css:491`), so the game is not affected. A cell drawn with no width set — the kitchen-sink sample of the disabled state in `src/browser/kitchen-sink/control-samples.tsx:117` is drawn by the same component — is now wider: I drew a greyed cell „Zbierz” with the reason „nie znasz jeszcze celu” outside any grid on the game's page at 1280 px and it measured 197.6 px wide with the new rules against 139.3 px with the old (height equal, 43.6 px), with empty space right of the name, because the reason's max-content width is added to the row before it wraps. Consequence: the all-states page shows the greyed cell in a shape the game never draws. I did not open the kitchen-sink page itself, so whether its container sets a width is unverified.

## Remarks of the correction

- Remark 1 (the walk's fault: at 390 px the cells of the pick of actions are narrower than their text): **made** — no cell's name or reason crosses its frame at any width I measured, on either screen, in any pick (checks below). Whether it should have been made under D-396 is finding 1.
- Remarks 2–7: need no code, and the range holds none for them.

## The handoff's questions

1. Overflow removed: yes. Programy (no map run, greyed „Obchód” with „wybierzesz w przejściu postaci, która ją kupiła”) and the map-run screen, pick of actions, 14 cells, at 320, 390, 480, 720, 1074, 1100, 1180 and 1280 px: no text line of a name or a reason outside its cell's box (checked per line with `Range.getClientRects()`), no `scrollWidth > clientWidth`, and `documentElement.scrollWidth == innerWidth` at each width. The same at all eight widths for the condition pick (7 cells, two columns) and the target pick of „Wytwórz” („Opatrunek (2 mchy)”).
2. At 1280 px nothing changed: each cell's width, height, icon box, every line box of its name and its reason box are identical with the old rules injected and with the new, at 1280 and 1440 px, on both screens and in the three picks. Text, icon, price (in the name, D-363) and time (under the cell, D-293) are where they were.
3. Tokens: the new declarations hold `var(--space-xs)`, the keywords `inline-flex`, `wrap`, `flex-start`, `break-word`, `min-content`, `0` and `100%`, and the flex factors `1 1` / `0 0`; the styleguide's list of values in place of a token counts no unitless value but line width, dash pattern, opacity and font weight ("i żadna inna wartość bez jednostki"), and exempts `0` and percentages. No colour, length, font or outline added; `tokens.css` untouched; both invariant tests pass.
4. Keyboard and focus (D-306, D-291): unchanged. The arrow keys move by index (`columnsOf`, `src/browser/view/rule-panel.tsx:105`), not by geometry, and the change touches no script. In the browser at 1280 px: the pick opened with focus on the chosen „Eksploruj”; ArrowRight → „Wędruj”, ArrowDown → „Obchód”, ArrowDown → „Zapal — ognisko (…)”, ArrowLeft → „Wytwórz — ognisko (…)”, ArrowUp → „Zbierz”; Enter on „Wytwórz” picked it and moved focus to the target cell „Opatrunek (2 mchy)”, and the field read „Wytwórz — Opatrunek (2 mchy)” with „10 min”. The icon stays in each cell and greys with it (mask).
5. Tests: the two `nameOf` helpers read `.pick-cell-name` instead of the cell's direct text nodes; on the new markup they return the same string, and every absence assertion through them (`rule-editor.test.mjs:1348`, `:1357`, `:1709`) stands beside a positive one on the same panel that would fail if the element were missing, so no case is weakened and no assertion was removed. Both new cases fail without the fix (seen, below). Finding 2 is about the second.
6. Other users of the cell: `ReactPickCell` is drawn only by `src/browser/view/rule-panel.tsx:414` (all three picks, on Programy and the map-run screen, all measured) and by the kitchen-sink sample (finding 3). `.pick-cell` is read by `src/browser/program-panel.css:491` and by the tests.
7. „wybierze/sz”: confirmed — at 390 px the reason of the greyed „Obchód” on Programy breaks as „wybierze | sz w | przejściu | postaci, | która ją | kupiła” (at 320 px also „wybie | rzesz”, and single names such as „Eksploruj” break inside the word). Not a new fault: with the old rules the same word crossed the frame; the styleguide holds no rule on breaking the game's own text (its rule "A name typed by the player breaks in its row" prefers a break inside the row to crossing it, for typed text), and the width is below D-396's smallest window. It falls under finding 1, not a finding of its own.

## Declined to judge

- At 390 and 1074–1180 px one row of the pick mixes cells whose name stands beside the icon („Idź”, „Uderz — patyk”) with cells whose name drops under it, so cells of one row differ in height: a look below the smallest window, which D-396 leaves unfixed and finding 1 leaves to the orchestrator's choice.
- Home and End doing nothing in the pick, and the walker's fourth rule with no chronicle line: observations of the walk, not of this range.

## Checks

- `npm test -- tests/view/shared-controls.test.mjs` → exit 0, 52 of 52.
- `npm test -- tests/view/rule-editor.test.mjs` → exit 0, 76 of 76.
- `npm test -- tests/view/item-verb-panel.test.mjs` → exit 0, 6 of 6.
- `npm test -- tests/view/program-panel.test.mjs` → exit 0, 60 of 60.
- `npm test -- tests/invariants/test_browser_view_token_values.py` → exit 0, 4 tests; `npm test -- tests/invariants/test_browser_view_focus_outline.py` → exit 0, 3 tests.
- Failing run without the fix: a worktree of the head with `src/browser/styles.css` and `src/browser/view/controls/react-pick-cell.tsx` checked out from `921a4768`, `npm test -- tests/view/shared-controls.test.mjs` → exit 1, 50 pass, 2 fail — exactly the two new cases ("expected ["icon-mask","pick-cell-name","pick-cell-reason"], got ["icon-mask","pick-cell-reason"]" and "expected "inline-flex", got "inline-grid"").
- `npm run typecheck` → 0. `npx eslint` on the four changed TS/JS files → 0. `npx prettier --check` on the five changed files → 0. `node tests/quality/eslint-size-rules.mjs` → 0, "0 functions and files over a threshold in 343 files". `python -B .the-way/elements/common/foundation_check.py` → 0, 0 errors.
- Manual, in the running game (D-417): `npm run local` at the head, Playwright CLI 0.1.22, made-up account at `example.test`, a composed state (the play skill's `compose-state.mjs` plus `craft` and `tend` in the Understanding's actions and `moss` and `bandage` in its items, so „Wytwórz” and „Opatrz” stand in the pick). Measurements as in questions 1, 2, 4 and 7; the old layout reproduced by injecting the base's rules (`inline-grid`, `auto minmax(0, 1fr)`, the reason spanning the row, the name element as `display: contents`), with the positive control at 390 px reproducing the walk's overflow. A screenshot of the action pick at 390 px on the map-run screen, looked at and not shown: every cell holds its text, „Wytwórz” whole in „Wytwarzanie”. Console: 0 errors on the page after the last load. Browser closed with `playwright-cli close`; `npm run local:stop` → "Local starts stopped: 1".
- Not run: the full gate and the instruction-files check (`check_instructions.py`) — reserved to the orchestrator by the handoff; the kitchen-sink page (finding 3 measured on the game's page instead); Firefox (D-396 leaves Firefox to a person's session).

## Reaches beyond the handoff

- D-396 (`foundations/decisions.md:5436`), whole: found by a search of the decisions for narrow windows ("390 px", "narrow", "wąsk"), to know whether a look at 390 px is required — it is the ground of finding 1.
- D-288 (`foundations/decisions.md:9257`) and D-311 (`foundations/decisions.md:10438`), whole: whether either defines the pick or the program column in a narrow window (neither does).
- `.claude/skills/loop2-play/SKILL.md` whole and `.claude/skills/loop2-play/compose-state.mjs`, to run and compose the game; `src/browser/sim/types.ts:171` (the Understanding) and searches in `src/browser/sim/data/actions.ts` and `items.ts`, to compose the state.
- `src/browser/program-panel.css:440-494`, `src/browser/styles.css:280-310` and `:380-495`, `src/browser/view/rule-panel.tsx:195-260` and its `columnsOf`, `src/browser/kitchen-sink/control-samples.tsx:100-127`, `tests/view/game-stylesheets.mjs`, and the uses of `nameOf`/`cellNamed` in the two changed test files.

## Working copies

- `.runs/review-correction/` under the task's worktree (the composed state, the scripts given to Playwright CLI, the measurement outputs, the logs of the checks, the screenshot looked at): removed with `rm -rf` by its full path.
- The worktree `.runs/review-correction/wt` (head with the fix reverted, `node_modules` as a junction to the task worktree's): the junction removed with `rmdir`, then `git worktree remove --force` and `git worktree prune`; `git worktree list` no longer names it, and the task worktree's `node_modules` stands.
- `.playwright-cli/` in the worktree root (the tool's own files from this check): removed. `.runs/local-start/` is the product's own file and stays, as the play skill says.
- `git status --short` in the task worktree prints nothing; nothing kept in `reports/` beside this report.

## Unread material

- `guidelines/testing.md`: read whole; the rows of the table of trust boundaries and the table of the server's permissions were read through, not checked row by row against this change, which touches none of them.
- `foundations/part_map.md`: not read; the trust-boundary claim was checked against the boundary table of `guidelines/testing.md` and the handoff's statement.
- Everything else the handoff names: read whole (the method and `fix.md`, the handoff, the correction report, the remarks, the walker report's "Faults found" and the parts before it, D-289, D-290, D-291, D-293, D-306, D-363, D-425, the invariants `browser-view-token-values` and `browser-view-focus-outline`, `src/browser/AGENTS.md`, `guidelines/styleguide-browser-view.md`, `guidelines/coding-browser-module.md`).

## Searches not found or unclear

- A decision that defines how the pick of the rule panel, or the program column, looks in a window narrower than 1280 px: not found (searched the decisions for "390 px", "narrow", "wąsk" and read D-288, D-311).
- Whether the remark "Fix what the walk finds in this request" was meant to reach a fault below D-396's smallest window: unclear; the remark predates the walk and names no width.
