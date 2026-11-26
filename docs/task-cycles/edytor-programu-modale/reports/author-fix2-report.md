# Report of the fix of the shadow finding — task `edytor-programu-modale`

**Status:** done

## Commit (range `dace1f39..83f6bf6a`)

- `83f6bf6a` — fix: the window casts no shadow; its frame alone sets it off.

| File | + | − |
|---|---|---|
| `src/browser/tokens.css` | 0 | 1 |
| `src/browser/program-panel.css` | 3 | 3 |
| `tests/view/rule-window.test.mjs` | 6 | 5 |
| `foundations/decisions.md` | 2 | 2 |
| `guidelines/styleguide-browser-view.md` | 8 | 7 |

One commit carries the code and the entries together, so the foundation check is green at it: `foundation_check.py` reports „0 errors” at `83f6bf6a`.

## The finding — fixed, by the frame alone

**Reproduced first.** I composed a game state with a program of 14 rules in „Grupa 1” and 6 in „Ogień”, so the window of rule 1.1 is shorter than the rest of the program. In Chromium at 1600 × 1000, on the paused screen of a map run of Skraj lasu, with the head `dace1f39`:
- the window stood at 312..660;
- row 1.13 stood at 673..700, not `inert`, so in reach.

I measured with the reviewer's method: the pixel on the bare column at x = 1280 under the window's lower edge, and the factor k = green / 24 applied to the panel and to each text role:

| d (px below the edge) | k | `text` | `text-secondary` | `text-label` |
|---|---|---|---|---|
| 3 | 0.58 | 4.63:1 | 2.95:1 | 2.49:1 |
| 12 | 0.71 | 6.39:1 | 3.89:1 | 3.21:1 |
| 21 | 0.83 | 8.60:1 | 4.96:1 | 4.09:1 |
| 30 | 0.96 | — | — | 5.03:1 |

Row 1.13, at d = 13..40, held its condition and its counts below 4.5:1. The finding stands as the reviewer gave it.

**What I chose, and why.** I chose the frame alone: no shadow at all.
- Keeping a shadow at 4.5:1 for `text-label` would need k ≥ about 0.9 at every point it falls on. That is a shadow too faint to read, so it would add nothing to the frame.
- I looked at the frame alone in the running game, at 1600 × 1000 and at 360 × 740 with touch, on the window of a rule and of a group, with rows standing under the lower edge. The light frame (`window-frame`, 3.67:1 on `panel`, 3.09:1 on `highlight`) closes the window on all four sides in both layouts. The window plainly stands off the column, and the rows under it read as they do elsewhere.
- The cost: the window looks flatter than loop's window over the screen. D-40's *Rationale* now says so.

**Measured again, the same places** after the fix, at `83f6bf6a` built: at x = 1280, from 3 to 42 px under the lower edge, every pixel reads (24, 24, 27), the panel, so k = 1.00.

| Text role | Ratio |
|---|---|
| `text` | 11.99:1 |
| `text-secondary` | 6.75:1 |
| `text-label` | 5.39:1 |

These are the roles' own values on `panel`, and all keep 4.5:1. The computed `box-shadow` of the window in the game is `none`.

**Every place that named the shadow now follows the choice:**
- `src/browser/tokens.css`: `--window-shadow` removed.
- `src/browser/program-panel.css`: `box-shadow` removed from the window's rule, and its comment now says why the window casts none.
- D-40 *Verification*: „framed in `window-frame` and casting no shadow”.
- D-40 *Rationale*: no shadow, with the measured cause; „told apart by the size of the window” in place of „and its shadow”. Its binding sentences named no shadow and stand as they were.
- The styleguide: the row of `window-frame` in the table Roles, the bullet of "Every value with its source", the Bad example (a shadow that darkens the rows under the edge is now a Bad example), and the look bullet of "The window of a rule and of a rule group".
- `tests/view/rule-window.test.mjs`: the test now asserts `box-shadow` is `none`.
- The kitchen-sink page carried no sample of the shadow (only the role `window-frame`), so it needed no change.
- `git grep window-shadow` finds nothing.

**What a test holds and what only the browser showed.** jsdom lays nothing out and paints no shadow. The test holds that the window's computed `box-shadow` is `none`. I saw it fail with the stylesheet of `dace1f39` (exit 1, 1 fail: „var(--window-shadow)”) and pass with the fix. The darkening and the contrast of the covered text were measured only in the browser, as above.

## Checks (command — exit code)

- `npm run typecheck` — 0
- `npx eslint tests/view/rule-window.test.mjs` — 0
- `npx prettier --check src/browser/tokens.css src/browser/program-panel.css tests/view/rule-window.test.mjs` — 0
- `npm test -- tests/view/rule-window.test.mjs` — 0 (10 pass). Failing run with the old stylesheet: exit 1, 1 fail.
- `npm test -- tests/view/program-panel.test.mjs` — 0 (60); `tests/view/rule-editor.test.mjs` — 0 (82)
- `npm test -- tests/invariants/test_design_token_contrast.py` — 0; `test_design_token_sources.py` — 0; `test_browser_view_token_values.py` — 0
- `python -B .the-way/elements/common/foundation_check.py` — 0 („0 errors”), at the commit
- `python -B .the-way/instruction-files/check_instructions.py` — 0 („0 error, 0 warn”)
- Not run: the product's gate (`npm test` with no file) — the orchestrator's or CI's.

## Own-work check

The requirement most likely unmet after removing the shadow was the human's remark: the window must still stand off the column plainly. I looked at four states with rows standing below the window's lower edge:
- the window of rule 1.1 and of group 2 at 1600 × 1000;
- the window of rule 1.1 and of group 2 at 360 × 740 with touch.

In each, the light frame closes the window and tells it from the column and the rows under it. The row cut by the lower edge stays `inert`, as before; the next row below is in reach, at the panel's own contrast.

## Screenshots (branch `loop2/edytor-programu-modale`, commit `23c0929e314f0da011eb21b22e3dc355731685bf`)

- Before the fix: the window of rule 1.1 at 1600 × 1000 with its shadow laid over rows 1.12–1.13 under its lower edge (the finding's state): `https://github.com/mariusznazar/screenshots/blob/23c0929e314f0da011eb21b22e3dc355731685bf/loop2/edytor-programu-modale/loop2_okno_cien_wiersze_pod_1600.png?raw=true`
- After, the same state, frame alone: `https://github.com/mariusznazar/screenshots/blob/23c0929e314f0da011eb21b22e3dc355731685bf/loop2/edytor-programu-modale/loop2_okno_ramka_wiersze_pod_1600.png?raw=true`
- After, the window of rule 1.1 at 360 × 740, its bar and the rows under it: `https://github.com/mariusznazar/screenshots/blob/23c0929e314f0da011eb21b22e3dc355731685bf/loop2/edytor-programu-modale/loop2_okno_ramka_wiersze_pod_360.png?raw=true`
- After, the window of group 2 „Ogień” at 1600 × 1000: `https://github.com/mariusznazar/screenshots/blob/23c0929e314f0da011eb21b22e3dc355731685bf/loop2/edytor-programu-modale/loop2_okno_ramka_grupy_1600.png?raw=true`
- After, the window of group 2 at 360 × 740: `https://github.com/mariusznazar/screenshots/blob/23c0929e314f0da011eb21b22e3dc355731685bf/loop2/edytor-programu-modale/loop2_okno_ramka_grupy_360.png?raw=true`

The earlier after-shots with the shadow (`loop2_okno_po_*.png`, commit `e3dee7a7`) no longer show the code; these replace them in the request.

## Reach beyond the handoff

`reports/review-remarks-shadow-probe.txt`, named by the handoff as allowed: I took its method and its formulas for my measures.

## Unread material

`reports/review-remarks-report.md` was not read: the findings file and the probe carried the evidence.

## Searches not found or unclear

none

## Working copies

`.runs/author-fix2/` held the composed state and its scripts, the screenshots, the probe script, the copy of the stylesheet for the failing run, the clone of `mariusznazar/screenshots` and the log of `npm run local`. It is removed, and so is `.playwright-cli/`. The browser session is closed and the local start stopped. Left: `.runs/local-start/<process>-52431-<mark>/`, the start's database, which `loop2-play` counts as no leftover.
