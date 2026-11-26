# Report of the two changes before the request — task `edytor-programu-modale`

**Status:** done

## Commits (range `dc058bbc..dace1f39`)

| Commit | What | Files (+/−) |
|---|---|---|
| `3c748e42` | feat: the window's frame in a new role `window-frame` and loop's shadow under it; the role on the kitchen-sink page; the window test holds the frame and the shadow; the contrast test holds the new pairs | `src/browser/tokens.css` +2 −0; `src/browser/program-panel.css` +4 −1; `src/browser/kitchen-sink/role-samples.tsx` +2 −1; `tests/view/rule-window.test.mjs` +21 −2; `tests/invariants/test_design_token_contrast.py` +16 −5 |
| `dace1f39` | docs: D-40 (meaning of the role), D-42 (its threshold), the invariant `design-token-contrast`, the styleguide, and „gains” restored in D-166 | `foundations/decisions.md` +6 −4; `foundations/invariants.md` +1 −1; `guidelines/styleguide-browser-view.md` +12 −6 |

`3c748e42` alone holds a test line `decision: D-40` whose sentence first stands in `dace1f39`. The foundation check runs on the head, where both stand.

## Change 1 — the window set off from the column under it

**The value.** Two tokens in `src/browser/tokens.css`, used only by the rule `.rule-list-panel .rule-panel` in `src/browser/program-panel.css`, so they apply to the window of a rule and of a group in both layouts:

- `--window-frame: #71717b` — a new role, of the kind *other*: the frame of the window (`border-color`, at the width `--frame-width`).
  - Source, at the value: the agent's choice, which the human's remark leaves to it, dated 2026-11-26.
  - Loop's frame of a window over the screen is `border-zinc-700`, `#3f3f46`, in `src/components/probe/Sheet.tsx` of branch `origin/test` (`715026e`) of the repository loop. That frame misses 3:1 of D-42 (1.70:1 on `panel`, 1.43:1 on `highlight`).
  - So the frame takes the grey of labels of loop that `control-border` already takes for the same threshold.
- `--window-shadow: 0 12px 28px rgb(0 0 0 / 60%)` — a value of look, no role.
  - Source: loop's shadow of the same window, `shadow-[0_12px_28px_rgba(0,0,0,0.6)]` in `src/components/probe/Sheet.tsx` of `origin/test` `715026e`, and the agent's choice under the remark.

**Why this value.** Before the change, the window stood on `panel` with a frame in `divider` (`#27272a`), over a column also on `panel`. So it read as a continuation of the column. The remark offered „mocniejsza ramka albo cień”, and I took both, as loop's own window over the screen has both.
- The frame alone at `#71717b` makes the window's edges visible in the phone layout. In the phone layout the window is as wide as the area, so the shadow shows only below it.
- The shadow shows that the window lies over the rows in the computer layout, where it falls on the list below.
- I compared the lightest candidate `#9f9fa9` (6.75:1) on paper only; I did not put it into the game. I chose the darkest grey of loop's palette that keeps the threshold, so the window stays close to loop's darker frame. The cost: the window's frame and the frame of a control share one grey. Size and shadow tell them apart, and D-40's *Rationale* says so.

**Contrast by D-42** (WCAG 2.2 formula, computed by the test's own function):

| Pair | Ratio |
|---|---|
| `window-frame` on `panel` | 3.67:1 |
| `window-frame` on `highlight` | 3.09:1 |

Both are held by `design-token-contrast` at 3:1. `panel` is the window's own background and the column under it; `highlight` is the open row it touches. The shadow is no role and has no pair, as D-42 gives no threshold to a shadow.

**Entries changed (foundation step), each meaning in English / Polish:**
- **D-40**, new paragraph: „`window-frame` means that this block is a window lying over the screen beneath it, the frame of the window of a rule or of a rule group (D-288), at a contrast ratio of at least 3:1 against `panel` and `highlight` (D-42).” *Rationale* gains why: the frame in `divider` let the window read as the column, and loop sets its window off by a lighter frame and a shadow; accepted, one grey shared with `control-border`. *Verification* `tests:` gains „the window of a rule framed in `window-frame` with a shadow under it, through the real stylesheet”. Meaning: the role says „this is a window over the screen”. Znaczenie: rola mówi „to okno nad ekranem”. Marked the cycle's (from the human's remark, not a row).
- **D-42**, first paragraph: the frame of the window of a rule, `window-frame`, keeps 3:1 against `panel` and `highlight`. Meaning: the frame keeps the non-text threshold. Znaczenie: ramka okna trzyma próg 3:1. Marked the cycle's.
- **Invariant `design-token-contrast`**: its sentence gains „and `window-frame`, the frame of the window of a rule or of a rule group, has at least 3:1 against `panel` and against `highlight`”. The test's docstring has the same wording, and its pairs, its passing made-up tokens and two flagged cases are extended (1.846:1 on `panel`, 1:1 on `highlight`). D-40 and D-42 already name it in *Verification*.
- **Styleguide** `guidelines/styleguide-browser-view.md`:
  - a row of the table Roles for `window-frame`;
  - a bullet of "Contrast of every pair";
  - in "The window of a rule and of a rule group", the frame in `window-frame` with the shadow under it and why, plus a Bad example of a window in `divider` with no shadow;
  - in "Every value with its source", a value the human's remark leaves to the agent now counts with those a task leaves, the frame and shadow of the window among them.
- **Kitchen-sink page:** `window-frame` added to its list of roles, in the table's order (after `condition-unmet`).

## Change 2 — D-166

In D-166's *Rationale*, „costs it no width” is back to „gains it no width”. The sentence now reads „Programy keeps two columns, the list and the editor, and the window of a rule opens under its row (D-288), so the editor opens it in one way on both screens; Programy did not lack width when this was chosen (2026-11-08), so opening the window under its row there gains it no width.” It is true to the code, where the window opens under its row on both screens. Nothing else in the sentence changed.

## Checks (command — exit code)

- `npm run typecheck` — 0
- `npx eslint src/browser/kitchen-sink/role-samples.tsx tests/view/rule-window.test.mjs` — 0
- `npx prettier --check src/browser/tokens.css src/browser/program-panel.css src/browser/kitchen-sink/role-samples.tsx tests/view/rule-window.test.mjs` — 0
- `ruff format --check` and `ruff check` with `--config ruff.toml` on `tests/invariants/test_design_token_contrast.py` — 0 and 0. Ruff 0.17.1 from the main checkout's `.runs/quality-venv`; the worktree has none of its own.
- `npm test -- tests/invariants/test_design_token_contrast.py` — 0. Failing run on the token file of `dc058bbc`: exit 1, „--window-frame is declared 0 times, not once”.
- `npm test -- tests/invariants/test_design_token_sources.py` — 0
- `npm test -- tests/invariants/test_browser_view_token_values.py` — 0
- `npm test -- tests/invariants/test_browser_view_focus_outline.py` — 0
- `npm test -- tests/view/rule-window.test.mjs` — 0 (10 pass). Failing run with the stylesheet of `dc058bbc`: exit 1, 1 fail (the dialog case, whose frame read `var(--divider)`).
- `npm test --` with `tests/view/program-panel.test.mjs` (60), `shared-controls.test.mjs` (63), `body-row-cells.test.mjs` (9), `rule-editor.test.mjs` (82) — 0 each
- `python -B .the-way/elements/common/foundation_check.py` — 0 („0 errors”). A first run reported D-40 at 628 words of binding sentences; I shortened its new paragraph before writing it down.
- `python -B .the-way/instruction-files/check_instructions.py` — 0 („0 error, 0 warn”)
- Not run: the product's gate (`npm test` with no file) — the orchestrator's or CI's. The kitchen-sink page was not built (`npm run kitchen-sink`); its module's type is checked by `npm run typecheck`.

## Own-work check

- The requirement most likely unmet was „the window must plainly stand off the list” in both layouts. I looked at the game (Chromium, `npm run local`, a composed game state of the earlier screenshots: „Grupa 1” with three rules, „Ogień” with two, Skraj lasu, paused) before and after, the same states in the same session:
  - the window of rule 1.1 and of group 2 at 1600 × 1000;
  - the window of rule 1.2 and of group 2 at 360 × 740 with touch.
- Before, the window reads as the column continued. After, at 1600 its light frame closes it on all four sides and the shadow darkens the list under its lower edge. At 360 the frame marks its sides and top against the area.
- The values on the page: the frame's computed colour comes from the token through the real stylesheet (test), and the shadow's is `var(--window-shadow)` (test).
- No layout changed. The frame stays 1 px and the shadow takes no space, so nothing moves.

## Screenshots (branch `loop2/edytor-programu-modale`, commit `e3dee7a7b99c05acfb61ca85c6850852ae867dd5`)

The „before” shots were taken now, at the head `dc058bbc`, in the same state and session as the „after” ones, so the pairs match exactly.

- Before, window of rule 1.1, 1600 × 1000: `https://github.com/mariusznazar/screenshots/blob/e3dee7a7b99c05acfb61ca85c6850852ae867dd5/loop2/edytor-programu-modale/loop2_okno_przed_rule_1600.png?raw=true`
- After, the same: `https://github.com/mariusznazar/screenshots/blob/e3dee7a7b99c05acfb61ca85c6850852ae867dd5/loop2/edytor-programu-modale/loop2_okno_po_rule_1600.png?raw=true`
- Before, window of group 2 „Ogień”, 1600 × 1000: `https://github.com/mariusznazar/screenshots/blob/e3dee7a7b99c05acfb61ca85c6850852ae867dd5/loop2/edytor-programu-modale/loop2_okno_przed_group_1600.png?raw=true`
- After, the same: `https://github.com/mariusznazar/screenshots/blob/e3dee7a7b99c05acfb61ca85c6850852ae867dd5/loop2/edytor-programu-modale/loop2_okno_po_group_1600.png?raw=true`
- Before, window of rule 1.2 under its row, 360 × 740: `https://github.com/mariusznazar/screenshots/blob/e3dee7a7b99c05acfb61ca85c6850852ae867dd5/loop2/edytor-programu-modale/loop2_okno_przed_rule_360.png?raw=true`
- After, the same: `https://github.com/mariusznazar/screenshots/blob/e3dee7a7b99c05acfb61ca85c6850852ae867dd5/loop2/edytor-programu-modale/loop2_okno_po_rule_360.png?raw=true`
- Before, window of group 2, 360 × 740: `https://github.com/mariusznazar/screenshots/blob/e3dee7a7b99c05acfb61ca85c6850852ae867dd5/loop2/edytor-programu-modale/loop2_okno_przed_group_360.png?raw=true`
- After, the same: `https://github.com/mariusznazar/screenshots/blob/e3dee7a7b99c05acfb61ca85c6850852ae867dd5/loop2/edytor-programu-modale/loop2_okno_po_group_360.png?raw=true`

## Reach beyond the handoff

- `.the-way/elements/invariants/skill/SKILL.md`, `write.md`, and the template's lines on the sentence — for the change of `design-token-contrast`.
- The repository loop at `origin/test` `715026e`: `src/components/probe/Sheet.tsx` (the window's frame and shadow) and `RulesPanel.tsx` (`SidePanel`, a frame `border-zinc-800`) — the source of the values.
- `tests/view/body-row-cells.test.mjs` — how a view test reads a role through the real stylesheet in jsdom.
- `src/browser/kitchen-sink/role-samples.tsx` — the page's list of roles.

## Unread material

- `foundations/decisions.md`: D-40 and D-42 read whole; D-41 read whole; no other decision of the section "Look of the browser view" read.
- `.the-way/elements/invariants/template.md`: read in part (the lines on the sentence), not whole.
- `.the-way/elements/invariants/skill/decide_entry.md` and `draft.md`: not read. The change rewords a sentence of an existing invariant and changes neither its *Method*, its links nor its *Part*.

## Searches not found or unclear

- A threshold for a shadow in D-42: none. I gave it none and wrote that it is no role.
- No `.runs/quality-venv` in the worktree; I used the main checkout's, for the Ruff check alone.

## Working copies

`.runs/author-remarks/` held the composed state and its scripts, the screenshots before and after, the copies of the stylesheet and the token file used for the failing runs, the clone of `mariusznazar/screenshots` and the log of `npm run local`. It is removed, and so is `.playwright-cli/`. The browser session is closed and the local start stopped. Left: `.runs/local-start/<process>-56473-<mark>/`, the start's database, which `loop2-play` counts as no leftover.
