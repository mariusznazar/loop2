# Report — executor of slice 8 (the styles of the screen of accounts)

**Status:** done with concerns (concern 1 needs the orchestrator's decision; none blocks the commit).

## Commits

Base `861b6c9c`, branch `task/panel-wlasciciela`.

- `757f4a90` — `feat: :sparkles: add the styles of the screen of the list of accounts, its confirmation and the link Panel właściciela in the menu Konto (D-281, D-410, D-411, D-280)`

## Files changed

| File | Added | Removed |
|---|---|---|
| `src/browser/styles.css` | 108 | 0 |

## What was made

- Menu link (beside the rules of the menu's items, after `.account-menu-unconfirmed, .account-menu-logout`): class **`account-menu-panel-link`** (the name Slice 10 reads from the stylesheet). Text in `text`, no underline, a row under the pointer on `highlight`; focus is the one `:focus-visible` rule.
- Screen rules (beside `.program-reset-text`, before the rule of „Program:”):
  - `accounts-loading`, `accounts-empty`: `text-secondary`.
  - `accounts-retry`: column block.
  - `accounts-list`: column, no list markers, no margin or padding; `accounts-row`: padding `--space-2xs` / `--space-s` as a row of the list of programs, no bar.
  - `accounts-summary`: column, gap `--space-2xs`.
  - `accounts-email`: `text-strong` at `--font-weight-emphasis`.
  - `accounts-field`, `accounts-state`, `accounts-privilege`, `accounts-role`: `text`; `accounts-label`: `text-label`; `accounts-state.accounts-state-blocked`: `warning`.
  - `accounts-actions`: wrapping row, as `.program-actions`.
  - `accounts-confirm`: wrapping row, as `.program-reset-confirm`; `accounts-confirm-text`: `warning` with a `--bar-width` bar at its left in `currentColor`, as `.program-reset-text`.
- No token, no role, no literal colour, length, font name, stroke, dash, opacity or font weight written out. The shared button looks come from the existing `.button.destructive`, `.button.secondary` and disabled rules; the destructive and secondary buttons of a row need no rule of mine.

## Checks

| Check | Command | Exit |
|---|---|---|
| Typecheck (slice) | `npm run typecheck` | 0 |
| Invariant `browser-view-token-values` (slice) | `npm test -- tests/invariants/test_browser_view_token_values.py` | 0 (4 of 4; `reports/executor-8-evidence/test_browser_view_token_values.txt`) |
| Invariant `design-token-sources` (slice) | `npm test -- tests/invariants/test_design_token_sources.py` | 0 (2 of 2) |
| Invariant `browser-view-focus-outline` (slice) | `npm test -- tests/invariants/test_browser_view_focus_outline.py` | 0 (3 of 3) |
| Prettier on the one file changed (the handoff's check for CSS) | `npx prettier --check src/browser/styles.css` | 0 ("All matched files use Prettier code style!") |
| Foundation (handoff: must stay at 0 errors) | `python -B .the-way/elements/common/foundation_check.py` | 0 (`0 errors`; `reports/executor-8-evidence/foundation.txt`) |
| ESLint | not run: no `.ts`, `.tsx` or `.mjs` file changed | — |

The product's gate (bare `npm test`) was not run, as the handoff says.

No test was written by me and no failing run applies: the slice is a stylesheet change with no code to test beyond the checks above. The three invariant runs were made after the change, not before it.

## Own-work check (section 3)

- Requirement most likely not met: a literal value (a colour, a length, a font name or weight) written into a rule of the new block, which the token-values invariant would have to catch.
- Check: a break in the worktree, `color: #ffffff;` added to `.accounts-row`, then `npm test -- tests/invariants/test_browser_view_token_values.py`: exit 1 (`FAILED (failures=1)`; `reports/executor-8-evidence/break-token-values.txt`). The break was removed, the same test run again: exit 0 (`reports/executor-8-evidence/token-values-restored.txt`). A scan of the added lines for `#`-colours found none.
- Screenshot: **unchecked, reason: the product cannot show the screen or the link yet.** The screen has no address before Slice 9 (`#/konta`), and the link has no element before Slice 10. No screenshot is required of this slice (handoff). The states were checked in the rules' text only; reading code shows no rendered appearance.

## Concerns and questions

1. **The handoff's width rule does not fit the stylesheet (not applied; the orchestrator decides).** The handoff says `.screen.accounts-screen` joins the rule at `src/browser/styles.css:210-211`. That rule is `.screen.programs-screen, .screen.maps-screen { grid-template-columns: minmax(200px, 1fr) minmax(320px, 3fr); }`: a two-column grid, not a content width. The content width comes from `.app-main` (1344 px) for every screen. The accounts screen has one area, so, as Siedziba (one area, plain `.screen`) does, it needs no rule of its own. Adding it to that rule would put the one area in the 200 px column and leave the rest empty. I did not add it. Recommendation: no rule; if you want an explicit one-column rule, `.screen.accounts-screen { grid-template-columns: 1fr; }` would be a no-op with the same effect. Cost if wrong: one rule, no visual change expected.
2. **Rows have no hover.** Handoff says "rows as the list of programs look". The list-of-programs rows are links with a hover background; account rows are not links, so I gave them the padding only, with no bar and no hover. Cost if wrong: one `:hover` rule.
3. **The line while the list is read** takes `text-secondary`, as the handoff decided; the styleguide itself gives it no role (the class names in `accounts-screen.tsx` are as executor 7 listed them).
4. **The confirmation block** takes its rule beside `.program-reset-confirm`, as the handoff asks, under the class names `.accounts-confirm` and `.accounts-confirm-text`.

## Reach beyond the handoff (section 1)

- `.the-way/task-cycle/change/ui_check.md`: read after the change (named by `make-change` section 3); it asks a screenshot for a changed screen, which the product cannot show yet (see the own-work check).
- `src/browser/styles.css` lines 40-230, 380-560, 605-900 read by range before the edit (to find the menu, the button, the program-list and the confirmation rules); the file was then edited by exact text.
- `src/browser/view/accounts-screen.tsx` lines 1-60, 170-240, 300-335: the class names and the row markup, to check each class.
- `.runs/task-cycles/panel-wlasciciela/plan.md` lines 1-30 and 100-165 (Slice 8, Slice 10, the table of To-do), to find the link's class and what Slice 10 reads.

## Working copies

- None made. The check outputs went to `.runs/task-cycles/panel-wlasciciela/reports/executor-8-evidence/`; the directory `.runs/executor-8/` that held them while running was removed.

## Unread material

- `foundations/decisions.md` D-280 (`:7296-7365`, the current range; the handoff's `:7278-7340` is the base's range), D-410 (`:10894-10910`) and D-411 (`:10911-10936`): read whole, late in the run, after the commit. They confirmed the stylesheet's choices: D-280 gives one content width for every screen, so the accounts screen needs no width rule of its own (concern 1); D-411 fixes the fields and the four operations the rules cover.
- All other files of the Read list were read whole: `guidelines/coding.md`, `guidelines/styleguide-browser-view.md` (in two parts, the whole file), `src/browser/AGENTS.md`, `src/browser/tokens.css`, the executor-7 report, the plan (section of Slice 8 and the Slice 10 text). `.the-way/task-cycle/change/SKILL.md`, `slice.md`, `ui_check.md` read whole.

## Searches not found or unclear

- A rule for `.screen.accounts-screen` in the width rule: unclear what "the rule of the content width" names (concern 1).
- A role for the line while the list is read: not in the styleguide (concern 3).
- Where the hover of an account row, which is not a link, is given: not found in the styleguide (concern 2).
