# Slice 2 report — the pick cell: icon at the first line, no highlight when greyed, tab index from a property

## Status

`done with concerns`

Concerns, in short:
- The greyed cell under the pointer was checked on the kitchen-sink page (the styleguide's page of all states), not in the running game: the composed game state offers no greyed cell in the rule panel's picks (see Searches).
- A screenshot was pushed to the screenshots repository, outside this repository, as D-418 and D-419 direct (see Reaches beyond the handoff).

## Commits

- `f4489d36` (full `f4489d369ab9a12dca74935c8f1d0a6ad159b55a`), on `task/drobne-bledy-ekranow`, after the base `13ac5dd95e6924a82b212bcb268dc1bb49541127`. Message: `fix: :bug: keep the icon of a pick cell beside the first line of a name that breaks in two, give no highlight to a greyed cell under the pointer, and take the tab index of a pick cell from its property`.

## Files changed

| File | Added | Removed |
|---|---|---|
| `src/browser/styles.css` | 13 | 4 |
| `src/browser/view/controls/react-pick-cell.tsx` | 4 | 0 |
| `src/browser/view/rule-panel.tsx` | 8 | 7 |
| `tests/view/shared-controls.test.mjs` | 29 | 0 |

Total 52 added, 13 removed (`git show --stat HEAD`).

## What changed

- `react-pick-cell.tsx`: `ReactPickCell` takes an optional `tabIndex` property and passes it to the button. Left out, the button sets no `tabindex` attribute.
- `rule-panel.tsx`: the layout effect that set `tabIndex` on the cell elements after every commit is removed. `renderGrid` counts the cells through all sections, as `flat` does, and gives each cell `tabIndex={index === tabbable ? 0 : -1}`. The focus effect is unchanged.
- `styles.css`:
  - `.button.pick-cell` is now `inline-grid` with columns `auto minmax(0, 1fr)` and `align-items: start`, so the icon takes the first column and the name the second, and a two-line name keeps its icon beside its first line. `.pick-cell-reason` takes `grid-column: 1 / -1` in place of `flex-basis: 100%`.
  - New `.button.pick-cell.greyed:hover { background: transparent; }`, which overrides the `.button:hover:not(:disabled)` highlight for a greyed cell. Its frame is still `dashed` in `text-disabled`, as before.
- `tests/view/shared-controls.test.mjs`: new case "a pick cell takes its tab index from the property it is given, and sets none when none is given".

Choices made and the way rejected:
- Grid instead of flex. The first try in mind was `align-items: flex-start` on the existing flex row. The before-screenshot shows why it fails: a long name wraps onto its own line under the icon, so the icon stands alone on the first line. Wrapping the name in its own `span` would fix the layout too, but the helper `nameOf` in `tests/view/rule-editor.test.mjs:1083` reads only the direct text nodes of a cell, so it would return an empty name for every cell, and the rule-editor tests that read names through it would fail for a reason unrelated to the behaviour. Keeping the name as a direct text node and changing only the layout avoided touching that helper. Cost if wrong: the grid relies on the icon's width coming from `aspect-ratio` inside an `auto` track; checked in the browser at 1280×720 (see own-work check), not in other widths or browsers.

## Checks

Each run from the worktree root. Each `npm test -- <file>` builds first and runs only that file.

| # | Command | Exit | Result |
|---|---|---|---|
| 1 | `npm test -- tests/view/shared-controls.test.mjs` (new case written first, before the code) | 1 | red: 49 pass, 1 fail, the new case: `Error: expected "0", got null` at `tests/view/shared-controls.test.mjs:800` |
| 2 | `npm test -- tests/view/shared-controls.test.mjs` (after the property change) | 0 | 50 pass, 0 fail |
| 3 | `npm test -- tests/view/shared-controls.test.mjs` (final, after the CSS change) | 0 | 50 pass, 0 fail |
| 4 | `npm test -- tests/view/rule-editor.test.mjs` | 0 | 75 pass, 0 fail |
| 5 | `npm test -- tests/invariants/test_browser_view_token_values.py` | 0 | Ran 4 tests, OK |
| 6 | `npm test -- tests/invariants/test_browser_view_focus_outline.py` | 0 | Ran 3 tests, OK |
| 7 | `npx prettier --check` on the four changed files | 0 | All matched files use Prettier code style |
| 8 | `npx eslint` on `react-pick-cell.tsx`, `rule-panel.tsx`, `shared-controls.test.mjs` | 0 | no output |

Checks not run: the full suite (`npm test` without a file), per the handoff; `foundation_check.py` and `check_instructions.py`, outside the focused checks. The invariant `browser-view-token-values` passed: the new CSS uses `transparent`, `inline-grid`, `minmax` and `1 / -1`, all exempt under D-43.

Invariant test seen failing: `browser-view-token-values` and `browser-view-focus-outline` were run after the change only (both passed); the code had no behaviour they guard that I broke, and I did not break one on purpose. No changed invariant test.

## Own-work check

Requirement most likely not met: the icon of a long name (To do 8), and the greyed cell with no highlight under the pointer (To do 9), both shown in the running game, not only in code.

- Check, icon: the game at 1280×720, a rule panel open on the action pick with the cell "Wytwórz — ognisko (6 patyków)". Before the change, the icon stood alone above the name, which wrapped into three lines below it (the bug). After the change, the icon stands beside the first line of the name, the name takes its second to fourth lines. The same panel, the condition pick (no icon, cells in two columns, names not in an icon column), kept its layout. Result: passes. Screenshot pushed (see Reaches).
- Check, greyed hover: the kitchen-sink page, a greyed sample cell ("Zbierz", with its reason "nie znasz jeszcze celu"), hovered with a real pointer through Playwright CLI. Computed `background-color` of the hovered cell: `rgba(0, 0, 0, 0)` (transparent). Its `border-top-style`: `dashed`, `border-top-color`: `rgb(82, 82, 92)` = `#52525c` = `--text-disabled` in `src/browser/tokens.css`. Result: passes. Not measured before the change; the fix rests on this measurement after it and on the cascade: `.button.pick-cell.greyed:hover` (0,4,0) beats `.button:hover:not(:disabled)` (0,3,0).
- Check, tab index: `tests/view/rule-editor.test.mjs` asserts that only the cell the keyboard stands on has `tabIndex === 0` (the "Tab leaves the grid" check at line ~1393); it passes after the change.

Not checked in the game: the greyed cell under the pointer in the running game. See Searches.

## Unread material

The handoff named these; I read them as follows.

- `.runs/task-cycles/drobne-bledy-ekranow/task.md` — not opened. I used the passages of the handoff, copied word for word, instead of the file.
- `foundations/part_map.md:3-28` — not read.
- `foundations/decisions.md`: D-40 — not read in full (its roles appear only through the styleguide). D-44 — read only through the styleguide rule "States of shared controls" and the "Main button" rule. D-265 — read only its first part (the "Verification" and "Rationale" were in a truncated output). D-267 — read the first 20 lines (the statement and the Verification block), not the Rationale.
- `foundations/invariants.md` — the three invariants read whole (`browser-view-token-values`, `browser-view-focus-outline`, `document-test-memory-limit`). `document-test-memory-limit` is not the test I ran; read for its text only.
- `guidelines/styleguide-browser-view.md` — read whole (three pages).
- `guidelines/testing.md` — read whole (two pages).
- `guidelines/coding-browser-module.md` — read whole.
- `guidelines/coding.md`, `src/browser/AGENTS.md`, `.the-way/task-cycle/change/SKILL.md`, `.the-way/task-cycle/change/slice.md`, `.the-way/task-cycle/change/ui_check.md`, `.claude/skills/loop2-play/SKILL.md` — read whole.
- `src/browser/view/controls/react-pick-cell.tsx`, `src/browser/view/rule-panel.tsx` — read whole.
- `src/browser/styles.css` — read lines ~270–300, ~380–465 (button rules and the pick-cell block) only; the rest not read.
- `src/browser/program-panel.css` — read lines ~435–485 only.
- `src/browser/tokens.css` — read via grep for the four tokens of the pick cell.
- `tests/view/shared-controls.test.mjs` — read the pick-cell section (lines ~660–820) and the file's helper names only.
- `tests/view/rule-editor.test.mjs` — read the helpers (`nameOf`, `cellsIn`, `reasonOf`) and the test near line 1393 and 1370–1410; not the other 74 tests.
- `scripts/kitchen-sink.mjs` — read its first 40 lines.
- `.ai/rules/git.md` — read through the hook's notice before the commit.

## Searches not found or unclear

- A greyed pick cell in the running game: not found. The composed state of `.claude/skills/loop2-play/compose-state.mjs` (one character, the stick and berry discovered, the Obchód branch bought, the wolf met) gave greyed cells in none of the pick fields I opened: the condition pick, the action pick, and the target pick of "Idź" and of "Zbierz" (targets "Patyk" and "Jagoda", both selected or open). Unclear how to reach a greyed cell from the game without another composed state. Suspected cause, a guess: greyed cells need a discovered target the map of the run lacks, or a branch not bought; the composer discovers neither. The greyed look and hover were checked on the kitchen-sink page instead.
- `.playwright/cli.config.json`: not inspected; the Playwright CLI reached the local HTTPS game without error, so the setting was in place.

## Reaches beyond the handoff

- Pushed a screenshot to the public repository `mariusznazar/screenshots`, branch `loop2/drobne-bledy-ekranow` (new branch, created from `main`), commit `f974339f20b0a05ea68afc906a915c5de8682bc4`, file `loop2/drobne-bledy-ekranow/pick-cell-two-line-name-1280x720.png`. Basis: D-418 (place) and D-419 (the agent pushes with the owner's `gh` account), and the loop2-play skill's "Show a screenshot to the human". The handoff does not mention a push. The screenshot shows the rule panel of the made-up account at `example.test`, no real address, password or token. Reversible: the branch can be deleted in that repository. Embed link for the request: `![Rule panel: pick cell with a two-line name beside its icon, 1280×720](https://github.com/mariusznazar/screenshots/blob/f974339f20b0a05ea68afc906a915c5de8682bc4/loop2/drobne-bledy-ekranow/pick-cell-two-line-name-1280x720.png?raw=true)`.
- Built the kitchen-sink page with `node scripts/kitchen-sink.mjs --build-only`, served `dist/kitchen-sink` with `python -B -m http.server` on 127.0.0.1:8765, and stopped the server after the check.
- Ran `npm run build` and `npm run local` (game on this computer), composed a state with `.claude/skills/loop2-play/compose-state.mjs`, and created an account with the made-up address `agent.slice2@example.test`. The local start was stopped with `npm run local:stop`.
- The commit's author address is the private one that the conditional git config sets for the repository on the `mariusznazar` account (per `.ai/rules/git.md`).

## Working copies

- Working directory `.runs/slice-2/`: removed. It held the composed state (`state.json`), the send script (`send-state.js`), the before and after screenshots of the panel, the kitchen-sink greyed-hover screenshot, the condition-pick screenshot, and the check logs. All were deleted; the one screenshot the human sees is pushed (see Reaches), and the check results are in the table above.
- The clone of `mariusznazar/screenshots` at `.runs/slice-2/screenshots`: removed after the push, with `rm -rf`. It stood at `.runs/slice-2/screenshots`; no removal failed.
- `.playwright-cli/` in the worktree root (the CLI's own working files): removed. Playwright CLI sessions closed.
- Left in place, not made by this agent's copies: `dist/` (build output of `npm run build`, `npm test` and `kitchen-sink --build-only`, git-ignored), `.runs/local-start/` (the local game's database, which the start leaves until the next start, per the loop2-play skill).
