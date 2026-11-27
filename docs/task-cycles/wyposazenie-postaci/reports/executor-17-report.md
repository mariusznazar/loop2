done

# Executor-17 report — Slice 17: the tile on the kitchen-sink page

## Commits

- `b1ec2924` feat: :sparkles: the kitchen-sink page shows the tile of a gear slot in its states, with an item's icon and with a slot's pale name, chosen and not, made-up values, and the states that do not apply with their reason (D-45, D-269, D-44, D-461)

Base: `f73718f5`. Branch: `task/wyposazenie-postaci`.

## Files changed

- `src/browser/kitchen-sink/control-samples.tsx`: +55 / -1
  - new import of `RESOURCES` (from `../sim/data/resources.js`) and of the type `TileFace`;
  - new constants `TILE_NOT_APPLYING`, `TILE_ICON` (the icon file of the first resource, not named by hand), `ITEM_TILE`, `SLOT_TILE` (made-up name `Przykładowy przedmiot`, made-up slot name `Ręka główna`);
  - new function `tileSample(face, selected, emptyReason)`, which draws `ReactButton kind="tile"` in each state, `Forced` wrapper for hover and focus, `disabled` for disabled, and the reason text for error, loading and (for an item tile) empty;
  - four new rows in `CONTROLS`: item tile not chosen and chosen, empty-slot tile not chosen and chosen;
  - the type `ButtonLook.kind` now excludes `"tile"` as well as `"value-cell"` (the one correction, see the failing run below).
- `src/browser/kitchen-sink/kitchen-sink.css`: **not changed**. The Change named it, but the hover and focus samples of the tile are drawn by the existing `.sample-hover .button` and `.sample-focus` rules, and the tile's own look is in `src/browser/styles.css` (lines ~571-610, Slice 16). No rule was needed.

## Reach beyond the dispatch

- `tests/invariants/test_application_build_kitchen_sink.py` and `tests/invariants/test_browser_view_token_values.py` were run as the slice's checks; no test file was changed.
- The tile's look was read from `src/browser/styles.css` and the component from `src/browser/view/controls/react-button.tsx` (both read only to match the sample's props), which the Change does not name. Neither was changed.

## Checks

Each check run on the final state of the commit unless stated.

| Check | Command | Exit |
|---|---|---|
| Kitchen-sink invariant (focused) | `npm test -- tests/invariants/test_application_build_kitchen_sink.py` | 0 (3 tests OK) |
| Token values invariant (focused) | `npm test -- tests/invariants/test_browser_view_token_values.py` | 0 (4 tests OK) |
| Typecheck (named in the Checks) | `npm run typecheck` | 0 |
| Kitchen-sink TypeScript project | `npx tsc --noEmit -p tsconfig.kitchen-sink.json` | 0 |
| Browser TypeScript project | `npx tsc --noEmit -p tsconfig.browser.json` | 0 |
| Formatting | `npx prettier --check src/browser/kitchen-sink/control-samples.tsx` | 0 (after `prettier --write` on the same file, which changed only my added lines) |
| Page build (for the check in Chromium) | `npm run kitchen-sink -- --build-only` | 0 |

### The failing run (on my change, before the fix)

- The first run of `tests/invariants/test_application_build_kitchen_sink.py` failed with exit 1: `npm run build` reported `TS2322` at `control-samples.tsx:95` and `:104`. The cause: `ButtonLook.kind` excluded only `"value-cell"`, so the new kind `"tile"` could not be spread into `ReactButton`. Fixed by excluding `"tile"` too; the rerun passed (exit 0).
- Note on `npm run typecheck`: it exited 0 while the `TS2322` errors were present (it runs `node scripts/build.mjs --check`, which did not report them). The real type errors showed only in the build of the invariant test and in `tsc -p tsconfig.kitchen-sink.json`. This check does not catch type errors of the kitchen-sink page; I ran the two tsc projects to cover it. Recorded as a problem as observed, not a guessed cause.

### Tests that fail on the base

None: no test failed on my change, so nothing was run on the base for this slice.

## Own-work check (`ui_check.md`)

- Requirement: the tile of Slice 16 appears in each state, with an item's icon and with a slot's pale name, chosen and not; the states that do not apply carry their reason; the page is built with `npm run kitchen-sink`; the tile is looked at in Chromium in both layouts; nothing of the page enters `npm run build`.
- Check: built the page with `npm run kitchen-sink -- --build-only`, served `dist/kitchen-sink/` on 127.0.0.1 (python http.server, port 8765, stopped afterwards), opened it in Chromium (Playwright MCP), read the DOM and computed styles, and looked at screenshots at 1440 px and 390 px width.
- What it showed:
  - All four new rows exist. Item tiles show the icon (default, hover, focus, disabled); slot tiles show `Ręka główna` in the pale role (default, hover, focus, disabled, empty). Error and loading show reasons; empty on an item tile shows the reason that the pale slot tile is in its own row.
  - Computed styles: hover background of the tiles is `rgb(39, 39, 42)` (the `highlight` token, as the other hover samples); focus outline is `solid`; the chosen tile has its frame in `rgb(212, 212, 216)` (the `selected` role, same as other selected buttons on the page); disabled tile text is `rgb(82, 82, 92)` (`text-disabled`).
  - The 1440 px screenshot shows the four rows in the table: the icon and the pale name are drawn as squares, the chosen frame stands out, the reasons stand in their columns.
  - The 390 px screenshot shows the tile rows and the default column; the controls table scrolls horizontally inside its panel, so the hover, focus and disabled columns are not visible in that screenshot. Their states at 390 px were checked through the computed styles above, not by eye.
- Screenshots: two PNG files made in `.runs/executor-17/` for the check (`tiles-computer.png`, `tiles-phone.png`) were removed after viewing; the rule "Where the foundation settles no such place" applies, and no place is settled for screenshots, so none was kept. Removed: both files. The `.runs/executor-17/` directory was left empty and removed.
- Mutation check in my head: done for the `tileSample` branches (state order, the item-tile empty reason, the `selected` prop). No mutation run.

## Walkthrough (`walkthrough.md`)

Not walked. This change alters the kitchen-sink page, a developer's tool outside the running product, and alters no behaviour a player sees, so `walkthrough.md` does not apply.

## Working copies

- `dist/kitchen-sink/` is the page's build output, written by `npm run kitchen-sink -- --build-only`. It is git-ignored and is the product's own output of its command, not a working copy of mine; it stays in place.
- Python http.server on 127.0.0.1:8765, started for the check: stopped (listening count 0 after the stop).
- Two screenshots: removed (see above).
- Playwright MCP session: closed ("No open tabs"). The tool's own snapshot and console logs were not found in the worktree.
- No worktree or clone made.

## Unread material

- `guidelines/coding.md` (416 lines): only the first lines were shown in a persisted preview; the rules were not read in full.
- `guidelines/testing.md` (509 lines): not read. No test was written or changed, so the testing rules did not bind this slice's code change.
- `foundations/part_map.md` (lines 3-32, `browser-view`): not read. The part is named by the Change files.
- `foundations/decisions.md` D-269 (4476-4507): read only the heading and the first paragraph and the rationale; the Verification block was read too. Its rule was used as read.
- `foundations/decisions.md` D-44 (F20, 5117-5136): not read in the decision log; its rule was read through the styleguide's "States of shared controls" and the "The kitchen-sink page" rules.
- `guidelines/styleguide-browser-view.md`: lines 1-552 read (the roles table, "Each role in its meaning", "No value in place of a design token", "Visible focus", "Contrast of every pair", "States of shared controls" including the tile bullet, "A stylesheet of its own", "Every value with its source", "The kitchen-sink page" through its first half). Lines 553-1975 not read (not named by the slice).
- `docs/task-cycles/wyposazenie-postaci/task_frozen.md` line 54: the first read used a path outside the worktree and failed; the second read (sed of the file in the worktree) read line 54 in part (the first 600 characters): the tile is a shared control in `src/browser/view/controls/`, a new kind of the shared button, with tests like the other shared controls and on the page of all states in the same change.
- `.the-way/task-cycle/change/walkthrough.md`: not read (not required for this change; see Walkthrough).
- `src/browser/tokens.css`: not read (the tile's look is in `styles.css`, the sample uses tokens through `kitchen-sink.css` and `styles.css`, which were not changed).

## Searches not found or unclear

- `task_frozen.md` was first looked for at the wrong path (the repository root instead of the worktree's `.runs/`). Found in the worktree's `docs/task-cycles/wyposazenie-postaci/` on the second read.
- `npm run typecheck` exited 0 while the kitchen-sink page had type errors (see the failing run). Unclear which files it type-checks; I did not investigate `scripts/build.mjs --check`, since it is outside the slice.
- The tile's `TileFace` icon for the item sample uses the first entry of `RESOURCES`, which is the product's own data (a sample picture of the page, not a rule of a view). A made-up icon file would have shown a broken image.

## Choices made

- The item-tile row shows its empty state as "does not apply" with the reason that a pale slot tile is in its own row, and the slot-name row shows the pale name in its empty column. Alternative: a single row with both faces. Cost if wrong: the page shows two rows instead of one; no test depends on it.
- The made-up item name `Przykładowy przedmiot` and slot name `Ręka główna` are page-only text, kept in the page module (no content identifier of the game). Alternative: take a real item name from `sim/data`. Rejected: D-18 keeps content names out of views, and the page should not depend on game data it does not need.
- `kitchen-sink.css` left unchanged (see Files changed).

## Problems as observed

- `npm run typecheck` does not catch the kitchen-sink page's type errors (observed: exit 0 while `tsc -p tsconfig.kitchen-sink.json` reports TS2322 for the same file). The cause is a guess: the check runs `scripts/build.mjs --check`, which may type-check only some projects. Not verified.
