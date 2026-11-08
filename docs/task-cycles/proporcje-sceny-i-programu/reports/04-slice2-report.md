# Report 04 — slice 2 (Programy keeps two columns and opens the panel in the list)

## Status

`done`

## Commits

- `6ee2e7f` feat: :sparkles: keep two columns on Programy and draw the rule panel in the list
  (base `a5aa424`; branch `task/proporcje-sceny-i-programu`; not pushed)

## Files changed

| File | Added | Removed |
|---|---|---|
| `src/browser/view/game-view.ts` | 3 | 10 |
| `src/browser/styles.css` | 2 | 33 |
| `tests/view/account-screen.test.mjs` | 28 | 19 |

What changed:

- `game-view.ts`: the rule-panel area (`rule-panel-area`) and its `placeRulePanel` host are gone; Programy's program panel gets no host, so the panel draws in the rule list. The toggling of `with-rule-panel` on the screen is gone. The comment is rewritten for two areas.
- `styles.css`: the `.with-rule-panel` rules (three-area grid, the under-1100 px rule, the `> .rule-panel-area` rules) and the `.screen-area.rule-panel-area` rule are gone. The 720 px rule keeps the Programy and Mapy lines; its comment is rewritten.
- `account-screen.test.mjs`: the case at line 4280 is rewritten (name and assertions); other cases untouched, including the `saved-program-edit` one.

## Test written first

Test: "on Programy the list and the editor are the two areas, and an open group draws its panel inside the program panel, directly under its header" (`tests/view/account-screen.test.mjs:4280`).

Run before the code change: `npm test -- tests/view/account-screen.test.mjs`, exit 1, failing at the first assertion: `no area of its own for the panel: expected 0, got 1`. This is the expected reason (the area still exists).

Run after the change: same command, exit 0, 128 of 128 pass.

Break the test catches: a third area for the panel (area count and two-area check); the panel drawn beside the header or at the list's end instead of directly under it (`nextElementSibling` check); the panel outside the program panel. The row case is not in this case; it is covered by slice 1's `tests/view/rule-editor.test.mjs` (panel under the row) and by the manual check below.

## Checks

| Check | Command | Exit |
|---|---|---|
| Focused test file | `npm test -- tests/view/account-screen.test.mjs` | 0 (red run before the change: 1) |
| Typecheck | `npm run typecheck` | 0 |
| Lint | `npx eslint --max-warnings 0 src/browser/view/game-view.ts` | 0 |
| Format | `npx prettier --check --no-config --no-editorconfig --ignore-path .gitignore src/browser/view/game-view.ts src/browser/styles.css tests/view/account-screen.test.mjs` | 0 |
| Invariant token values | `npm test -- tests/invariants/test_browser_view_token_values.py` | 0 (4 tests OK) |
| Invariant focus outline | `npm test -- tests/invariants/test_browser_view_focus_outline.py` | 0 (3 tests OK) |
| Neighbour: rule panel | `npm test -- tests/view/rule-editor.test.mjs` | 0 (69 pass) |
| Neighbour: program panel | `npm test -- tests/view/program-panel.test.mjs` | 0 (52 pass) |
| Manual state check | `loop2-play` (see below) | performed |

Not run: the full `npm test` (the orchestrator's run, per the handoff). No invariant test was written or changed in this slice, so no "seen failing once" record applies.

Note on the invariant tests: no new value entered `styles.css` or `game-view.ts`; the only removed CSS is layout and one empty-area rule.

## Manual state check (loop2-play)

- `npm run local` started; game at `https://127.0.0.1:52352`. Browser viewport set to 1280 × 800 with `playwright-cli resize` (the skill's example uses 1280 × 720; the width is what the check needs).
- Account made through the login card (`agent@example.test`); a character „Agent” created in Drużyna.
- A state built by `.claude/skills/loop2-play/compose-state.mjs` was sent with `PUT /api/saved-game` (answer `200 {"revision":2}`), to the local start's database only.
- Programy at `#/programy`:
  - Open group header („sprawdzane od góry” → group 1): two areas, the list 306 px wide and the program panel 918 px wide. The panel stands directly under `rule-list-header open`, inside `.program-panel`. No third area and no `.rule-panel-area` element.
  - Rule: „+ reguła” added rule 1.1, which opened its panel directly under `rule-list-row open`, inside `.program-panel`. Still two areas.
  - Fold the group holding the open rule („Zwiń grupę”): two areas still; the panel stays under the group's header (`rule-list-header`), as slice 1 made it.
- `playwright-cli console error` showed no `uncaught` or `saved-game-load` line during the check.
- Evidence screenshots were taken and checked by eye; they were deleted with `.playwright-cli/` after the check.
- Stopped: `playwright-cli close` (browser gone, `playwright-cli list` shows no browsers); `npm run local:stop` printed `Local starts stopped: 1`.

## Own-work check (section 3)

- Requirement: on Programy an open rule or group adds no third area; the panel stands under its row or header inside the program panel; the window under 1100 px no longer sets a rule panel under the editor, so nothing in that window is left with a dangling rule.
- Check: the rewritten test, plus the browser check at 1280 px above. Result: as the requirement says.
- The width test under 1100 px was not run in the browser; the rule that set the panel under the editor is removed, and the remaining grid is the one Programy had before any panel opened (`minmax(200px, 1fr) minmax(320px, 3fr)`), so the narrow window has nothing to rearrange on Programy. This is reasoning from the code, not a browser check.

## Reaches beyond the dispatch

- `tests/view/rule-editor.test.mjs:1571-1620` — slice 1's panel-under-row test, read as the pattern for the new assertions.
- `tests/view/account-screen.test.mjs:108-165` — helpers `childrenOf`, `byClass`, `shown`.
- `src/browser/view/program-panel.tsx:430-450` and `:518-528` — `panelStands` and the rule panel's state, to confirm the host-less path.
- `src/browser/view/rule-list.tsx` and `rule-panel.tsx` — grep for class names (`rule-list-row`, `rule-list-header`, `rule-list-panel`, `rule-panel` root).
- `foundations/part_map.md:3-28`, `foundations/invariants.md:459-478` and `:839-848` — read as the Read list names.
- `tests/view/page-document.mjs:1-60` — read as the Read list names (the rest not read).
- `guidelines/coding-browser-module.md` read whole, as named; `guidelines/styleguide-browser-view.md`, `guidelines/testing.md`, `guidelines/coding.md` read whole.

## Deviations from the method

- The changed files (`styles.css`, `game-view.ts`, `account-screen.test.mjs`) were not read whole, as `make-change` section 1 asks. I read the regions the change touches, and I grepped the whole files and the whole `src/` and `tests/` trees for every removed class and callback (`with-rule-panel`, `rule-panel-area`, `placeRulePanel`, `ruleHost`). No other reference remains that the slice touches.
- `src/browser/view/program-panel.tsx` (835 lines) was read in the regions named above, not whole.

## Foundation sentences

No sentence of the entries I read (D-288, D-282, D-43, D-306, D-295, D-349, the part map and the invariant entries) is wrong for this slice's code. Left as they stand for slices 3 and 4:

- `styles.css` comment above `.run-screen-areas` (lines near 195–203, 255–320) still describes the screen of a map run as three areas; that stays true until its own slice.
- `styleguide-browser-view.md` (The chronicle of a map run; Main button, secondary action and tab) still describes the right area of the map run; slice 3's concern.
- `game-view.ts:161-164` describes the map run's column; unchanged here.

## Choices made

- The Programy comment and the stylesheet comment were rewritten to say what the screen has now; no decision text was changed.
- The 720 px rule keeps its `.screen.programs-screen` and `.screen.maps-screen` lines and gets a one-line comment, since its old comment described the removed rules.
- Test name and comments are in English; the test keeps the header case only (the row case is covered as above). I did not add a row case to this file: I did not check whether the `twoPrograms()` fixture holds rule rows, so a row case there would have needed a fixture change I did not verify.

## Searches not found or unclear

- None unclear in the code. The slice's `Read` names `tests/view/page-document.mjs` and `program-panel.tsx` as whole files; see deviations.

## Questions

None.
