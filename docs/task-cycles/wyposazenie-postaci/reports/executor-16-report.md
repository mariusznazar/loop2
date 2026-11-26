done

# Executor-16 report — Slice 16, the tile, a kind of the shared button

## Commits

- `f73718f5` — feat: the shared button has the kind of the tile of a gear slot (base `883489bf`).

## Files changed (lines added / removed)

- `src/browser/view/controls/react-button.tsx` — +60 / −7 (the kind `tile`, the type `TileFace`, the part `TileFaceParts`, the accessible name)
- `src/browser/styles.css` — +41 / −0 (the rules of `.button.tile`, `.tile-slot-name`, the disabled rule)
- `tests/view/shared-controls.test.mjs` — +263 / −0 (a section "the tile of a slot of the gear", six cases)

## What was made

- `ReactButton` takes `kind: "tile"` with `tile: TileFace`, where `TileFace = { icon: string; name: string } | { slotName: string }`.
  - With an icon: the button holds one `span.icon-mask` (`aria-hidden`, `--icon: url("/icons/<icon>.svg")`, the same mask the pick cell draws) and has `aria-label` = the item's name; no visible text.
  - With a slot name: the button holds `span.tile-slot-name` with the slot's name as its text and no `aria-label`.
  - `selected` gives the class `selected` and `aria-pressed` as for every button; `disabled` disables it. The tile takes no `label` and no `waitingText` (typed out: it names itself and waits for no server).
- Look in `styles.css` alone: square (`aspect-ratio: 1`, `width: 4lh`, a layout dimension), icon in `text-strong` (the tile's own colour, mask in `currentColor`), pale name in `text-label`, disabled in `text-disabled`; frame `control-border` at rest, `selected` when chosen by the existing `.button.selected` rule (content role unchanged); hover `highlight` by the existing `.button:hover` rule. No new token, role or meaning.
- Touch target: the tile carries the class `button`, which the existing block `@media (width < 1280px)` gives `min-width` and `min-height` `var(--touch-target-min)`; the rule needed no new line, and a case reads that block for the tile.

## Checks (command, exit code)

| Check | Exit |
|---|---|
| `npm test -- tests/view/shared-controls.test.mjs` — new cases written first, failing (output kept in `reports/executor-16-failing-run.txt`: 4 of the 6 new cases failed — the icon, empty-slot and chosen cases on their assertions (missing `aria-label`, missing child), and the stylesheet case with a TypeError on a missing element, since the skeleton drew no face; the click case and the touch-target case passed on the skeleton, since a tile kind already was a `button` with `onClick`/`disabled` and the phone block covers every `.button`) | 1 |
| the same after the code (69 tests, 69 pass) | 0 |
| `npm test -- tests/invariants/test_browser_view_token_values.py` | 0 |
| `npm test -- tests/invariants/test_browser_view_focus_outline.py` | 0 |
| `npm run typecheck` | 0 |
| `npx eslint` on `react-button.tsx` and the test file | 0 |
| `npx prettier --check` on the three files | 0 |
| `python -B .the-way/elements/common/foundation_check.py` | 1 — 2 errors, both in `tests/view/character-screen.test.mjs` (lines 134, 400: quotations of D-446 and D-445), not my files; none from `tests/view/shared-controls.test.mjs` |

The first runs of the stylesheet case failed three times on my own wrong expectations about jsdom (`currentcolor` lower-cased, `border-color` of a `var()` shorthand read as `border`, `aspect-ratio` read as `1 / 1`), fixed in the test; the final run is the one above. Not run: the full suite (the cycle's run), and a real browser (Slice 17's).

Mutations tried: removing `aspect-ratio` makes the stylesheet case fail ("expected 1 / 1, got null"); removing the disabled rule makes it fail ("a disabled pale name"). Tests that fail on the slice's base: none (a new cases-only change; nothing failed that passed before).

## Own-work check

- Requirement most likely missed: "the tile's icon is drawn as a mask in the colour of the text beside it (D-43), with the item's name as its accessible name read by screen readers" and "its look stands in `styles.css` alone". Checks: the case that the button has `aria-label` = the item's name, no visible text and the icon `aria-hidden` with the mask of the named file; the stylesheet case that the icon's `background-color` rule is `currentColor` and the tile's colour `text-strong`; no `style` attribute carries a look beyond the custom property `--icon` (the same one the pick cell sets). All pass.
- `ui_check.md` and `walkthrough.md`: not read, since no screen uses the tile yet; the slice alters no behaviour a user sees in the running product (the tile enters the kitchen-sink page in Slice 17 and the screen Postać in Slices 19 and 20).

## Choices

- Name of the kind `tile` and its prop `tile` (a face: an icon with the piece's name, or a slot name), by the pattern of `value-cell` and `cell`. Rejected: a text prop for the slot name with an optional icon — it would let a tile carry both, which the task rules out. Cost if wrong: renaming in Slices 17, 19 and 20, which come after.
- The accessible name of an icon tile is the piece's name alone, as the frozen task says ("jego nazwę czyta czytnik ekranu"); the line above the pick ("Ręka główna: patyk") is a screen's (Slice 20). A caller wanting a different name would need a `label`; the type excludes it.
- Width `4lh` with `aspect-ratio: 1` for the computer layout, and the touch minimum in the phone layout through the existing block; a screen may override the width where it lays the tiles out. Cost if wrong: one rule.

## Reach beyond the dispatch

none.

## Working copies

`.runs/executor-16/` (a probe script of jsdom's reading of three declarations and a backup of `styles.css` for the mutation runs) and the run outputs `.runs/executor-16-run*.txt` stood in the worktree; all removed. Kept in `reports/`: `executor-16-failing-run.txt` (the failing first run). No worktree or clone was made.

## Unread material

- `ui_check.md` and `walkthrough.md` of the method: not read (named by section 3 of `make-change` for a change that alters a screen or a user-visible behaviour; the slice alters none).
- `docs/task-cycles/wyposazenie-postaci/task_frozen.md` and `plan.md`: read the lines the handoff names (54, 159, the slice, the plan's Slice 17 for names); the rest not opened.
- `foundations/decisions.md` D-461 not read whole (D-44 and D-265, the entries the slice names, were read whole); `tests/view/shared-controls.test.mjs` read in the ranges named plus 425–480, 630–700 and 800–940 and the whole new section.
- `guidelines/styleguide-browser-view.md`: read lines 1–480 (the roles, the rules to "A stylesheet of its own", the states of shared controls with the tile's entry); the rest after "Every value with its source" not read.

## Searches not found or unclear

none.
