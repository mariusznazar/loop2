# Report — Slice 5, the header of the screen of a map run

(Saved by the orchestrator from the executor's returned text: the harness refused the executor's own write.)

- **Status:** done
- **Commit:** `05cef64` feat: :sparkles: add the header of the screen of a map run in React with the character's name, the map's name and the whole status row, D-311 (base `64a2fcf`); not pushed.
- **Check result:** every check of the slice's *Checks* exit 0; the screenshot not done (no screen mounts the header until Slice 9); the whole gate and `foundation_check.py` not run, as the handoff says.

## Files
- `src/browser/view/run-header.tsx` new, +92
- `src/browser/styles.css` +38 (`.run-header`, `.run-header-name`, `.run-header-map`, `.run-header-status`, `.run-header-status.positive`)
- `tests/view/run-header.test.mjs` new, +339, 13 cases

## Checks (command, exit code)
| Check | Result |
|---|---|
| `npm test -- tests/view/run-header.test.mjs` with a stub (empty `div.run-header`) | exit 1, 13 of 13 failed (most by `TypeError` on a missing element, not an assertion) |
| same, component without stylesheet rules | exit 1, 12 pass, 1 fail: mono case expected `var(--font-family-mono)`, got `var(--font-family-text)` |
| same, component and rules | exit 0, 13 of 13 |
| `npm test -- tests/invariants/test_browser_view_token_values.py` | exit 0 |
| `npm test -- tests/invariants/test_browser_view_focus_outline.py` | exit 0 |
| `npm test -- tests/quality/test_node_test_selection.py` | exit 0 |
| `npm run typecheck` | exit 0 |
| `npm test -- tests/quality/test_quality_invariants.py` | exit 0 (5 tests, ESLint and Prettier included) |
| Prettier 3.9.10 `--check` on the three files | exit 0 |

## What the component does
- `RunHeader({ state, controls })`, no boundary of its own; returns `null` while `state.run` is `null`.
- Name from `state.team.characters` by `state.run.character.id` (the `h2` left out if the team lacks it).
- Children in order: name; map name (`MAPS[run.mapId].name`); `statusText(run, state.paused)`; the `pauseLabel` button; five pace buttons of `BALANCE.paces` as `ReactButton` with `selected`; „Restart” (destructive); `p.trip-warning` only when the warning is not null; „Zakończ” (destructive).
- When `pauseLabel` is `null` (death or completion) the pause and pace buttons are not drawn; the status text gets `positive` only when `run.completion !== null`.
- Imports `statusText`, `pauseLabel`, type `StatusRowControls` from `status-row.ts` and `tripWarning` from `trip-lines.ts`; no `document.createElement`.
- Buttons in fixed slots, so React keeps each element across updates; the focus case checks the same element and `document.activeElement` after a tick, a pause and a pace pick.

## Own-work check
- Requirement most likely unmet: the whole status row in today's order with its wording unchanged, the clock in Geist Mono (D-46), the text `positive` (D-132).
- Check: a literal list in D-311's order, the paused text and the completion text; the mono case loads the real `styles.css` into jsdom and reads the computed `font-family` of the status text (failed first, so it detects a missing rule; jsdom does not resolve custom properties, so it proves the rule reaches the element, not the face).
- Mutations considered, each caught by a case: pace buttons not hidden by `pauseLabel`; `selected` on the wrong pace; `positive` on death; „Restart” or „Zakończ” not destructive; warning misplaced or always drawn; name from the wrong character (two-character case); element remounted on update (focus case).
- Screenshot: not done — no screen mounts the header until Slice 9. Unchecked look: spacing, the 14 px name beside the 15 px map name, `trip-warning` inside a flex row.

## Trust boundary
None touched; no change under `assets/sprites/**` or in `src/browser/sim/saved-game.ts`; `SAVED_GAME_VERSION` untouched.

## Choices
- Own classes `run-header-status` (and `.positive`) instead of reusing `.status-text`, so Slice 10 can delete the DOM status row and its rules without breaking the header; a few duplicated declarations until then. The warning reuses `.trip-warning` (also used by the headquarters, which stays).
- Name an `h2` at `--font-size-heading`, map name a `p` at `--font-size-map-title`, both `text-strong` with `--font-weight-emphasis`; D-311 fixes no element types or sizes; a one-line CSS change if wrong.
- No new values; the token file lacked nothing.

## Mismatches and notes
- `guidelines/coding-browser-module.md` has no row for `src/browser/view/run-header.tsx` (`| src/browser/view/run-header.tsx | copy | — |`); outside this slice's *Change*, not added.
- `status-row.test.mjs` untouched; the discovery line and a discovery held at a completion are not the header's to carry.

## Reach beyond the handoff
`tests/sim/program-fixture.mjs`, `tests/sim/understanding-fixture.mjs`; heads of `src/browser/view/menu-bar.tsx`, `src/browser/view/program-panel.tsx`, `tests/view/trip-plan.test.mjs`.

## Guideline gaps
All read whole, except: in `guidelines/testing.md` the long trust-boundary table rows in lines 212–330 were cut at 1800 characters when read (server rows, not this part's).

## Searches not found or unclear
- D-311 does not say the element types or sizes of the name and the map name (choice above).
- Whether the `coding-browser-module.md` row belongs to this slice.
