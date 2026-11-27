PASS 75df8a09d5f3f0f92633f3ede79763ae26427b0d

# Review-9 report: Slice 9, the icon of „Załóż”

Range `04a81323..75df8a09` (one commit, `75df8a09`), branch `task/wyposazenie-postaci`; `git rev-parse HEAD` = `75df8a09d5f3f0f92633f3ede79763ae26427b0d`, the head given. `.the-way` at `6ed3cb364adedacea214d2a0df690cea32f2e72f`, equal to the gitlink. Variant: a planned slice touching the trust boundary `assets/icons/**`.

## Findings

### Critical

none

### Important

none

### Minor

none

### Outside the task's scope

none

## What was verified

- **The icon file against its source.** I fetched `delapouite/gloves.svg` from `raw.githubusercontent.com/game-icons/icons/82d948812bfe3f269ef8f731dcdb07b08160edc4/` (HTTP 200). This is the commit that `ICON_SOURCE_COMMIT` in `src/browser/view/credits.ts:21` names. I removed its background path `<path d="M0 0h512v512H0z"/>`, replaced `fill="#fff"` with `fill="#f4f4f5"` and compared the result with `assets/icons/gloves.svg` using `cmp`: identical, byte for byte. The source has no trailing newline either. So the credit's statement of change, `zmienione (bez tła, jasny kolor)` (`credits.ts:12`), is true of the file. The other icon files were changed the same way, for example `assets/icons/dodge.svg`.
- **Trust boundary `assets/icons/**` (icon-file-content, D-27).** The file holds one `svg` element with `xmlns` and `viewBox`, and one `path` with `fill` and `d`. It has no `script` or `foreignObject`, no attribute whose name begins with `on`, and no reference outside the file except the SVG namespace. `tests/invariants/test_icon_file_content.py` scans every file directly in the directory, the new one included, and passes. Its control case `test_control_the_scan_flags_each_forbidden_form` is the boundary's refusal test, as `guidelines/testing.md` (Trust boundaries) names it. The fill `#f4f4f5` in an icon file is exempt from `browser-view-token-values`, because the styleguide rule "No value in place of a design token" (`guidelines/styleguide-browser-view.md:119-120`) excludes the content of a file in `assets/icons/`. Of the crafted inputs the handoff lists (saved state, stored value, slot, count, prototype key), none reaches this slice: the range does not touch `saved-game.ts` or `judging-cache.ts`. The icon file is static data, and the build copies it.
- **Credit (icon-credits, F34, D-27).** `ICON_CREDITS.gloves` (`src/browser/view/credits.ts:205-209`) gives the author Delapouite, the page `https://game-icons.net/1x1/delapouite/gloves.html` and the shared statement of change. The title „Gloves icon” comes from the data (`src/browser/sim/data/actions.ts:236`) and agrees with F33 (`foundations/environment_facts.md:247-251`). The order of the section comes from `credit-lines.ts`: `actionIcons()` walks `ACTIONS` in their order. `equip` stands after `dodge`, and `craft`, which comes after it, merges into the earlier `claw-hammer` line. So the line „Załóż” stands right after „Odskocz”, which is what the slice's Goal requires ("in the order of the data"). The place of the entry inside the `ICON_CREDITS` object does not affect the order.
- **Test lists.** `tests/view/icons.test.mjs:183` and `:221` add the title and the line `{ name: "Załóż", icon: "gloves" }` at the end of `ACTION_ICONS`. The position checks (`ACTIONS_AT + ACTION_ICONS.length` for the creatures and archetypes) then expect the following lines one place later, and the data agree. `tests/invariants/test_icon_credits.py:91,127` add the author and title, and its comment lists the fact `game-icons-gloves-title`. The test reads the title from `TITLES`, which is written out by hand and not computed from the product. The page and the folder it checks come from the rendered section and are compared with the folder named in the text. An expectation that comes from F33 is independent of the code. No assertion is weakened and nothing is removed: the change only adds entries. No invariant test changes its checking logic. Only the data lists of `test_icon_credits.py` (the test of `icon-credits`) grow.
- **Code made only to pass a test (WAY-409).** None: the product change is one data entry, and it has no branch.
- **Reserved choices.** None taken: the icon comes from the source D-27 settles, and no dependency is added.
- **The executor's walk.** The walk judged that the change alters what a user sees: one more line in the credits and an icon in the cell „Załóż”. That agrees with the change. It drew its cases from D-27 and D-291: the credit line, the icon in the pick cell, and the file served. The cases it left unchecked (over the mage's head, the discovery band, the phone layout) give a reason. All of those draw the same file through the same mask, which D-291 holds and which this slice does not change. No screenshot file is among the commits of the range.
- **The slice's Goal: view tests failing with `credit-lines: no credit for the icon gloves`.** I ran every test file of `tests/view/` at the head in one run, `node --test "tests/view/*.test.mjs"`. The message `no credit for the icon` appears 0 times, so no view file still fails for it. The run had 6 failures, none of them from this slice (see Declined to judge).

## Declined to judge

- 6 failures in `tests/view/program-editor.test.mjs` (lines 801, 1066, 1116) and `tests/view/rule-editor.test.mjs` (lines 1564, 1696, 1826). Their expected lists of groups and sections of the pick lack „Załóż” and „Puste”. The cause is data that Slices 6–7 added before this range. Slice 13 (`program-editor.test.mjs`) and Slice 14 (`rule-editor.test.mjs`) of the plan change these files. This range does not touch them, and none of the failures names an icon or a credit.
- 2 errors of `foundation_check.py` in `tests/view/character-screen.test.mjs:134` (D-446) and `:400` (D-445). These are `decision:` citation errors of a test file outside this range, of the kind the handoff calls known. Slice 18 of the plan changes that file's surroundings. This range adds no error.

## Checks run

- `npm test -- tests/view/icons.test.mjs`: exit 0 (45 of 45 pass).
- `npm test -- tests/view/account-screen.test.mjs`: exit 0 (132 of 132).
- `npm test -- tests/view/end-window-game.test.mjs`: exit 0 (27 of 27).
- `npm test -- tests/invariants/test_icon_file_content.py`: exit 0 (2 tests OK).
- `npm test -- tests/invariants/test_icon_credits.py`: exit 0 (3 tests OK).
- `python -B .the-way/elements/common/foundation_check.py`: exit 1, with 2 errors, both in `tests/view/character-screen.test.mjs` (see Declined to judge). No error comes from a file of the range.
- `node --test "tests/view/*.test.mjs"` (on the `dist/` the runs above built): exit 1. 1831 tests, 1825 pass, 6 fail (see Declined to judge). 0 occurrences of `no credit for the icon`.
- Manual check: the committed icon compared with the upstream file at the pinned commit, transformed as described above (background removed, fill `#fff` → `#f4f4f5`): `cmp` reports them identical.
- `.runs/quality-venv/Scripts/ruff.exe format --check --config ruff.toml tests/invariants/test_icon_credits.py`: exit 0. `ruff.exe check --config ruff.toml` on the same file: exit 0. This is Ruff 0.17.1 from the main checkout's quality environment, the version `ruff.toml` requires. The executor's report left this check unchecked.
- `npx prettier --check src/browser/view/credits.ts tests/view/icons.test.mjs`: exit 0.
- Not run: the full `npm test` and `check_instructions.py`. They belong to the cycle's own run before the request, per the method.

## Reaches beyond the dispatch

- `src/browser/view/credit-lines.ts` (whole, first 80 lines of the logic): to check that the section's order follows the data and not `ICON_CREDITS`.
- `tests/invariants/test_icon_credits.py` lines 1-70 and 128-260, and `tests/view/icons.test.mjs` lines 185-240: to judge what the added list entries are checked against.
- `scripts/test.py`: how `npm test -- <file>` runs, so I could run all view tests in one go.
- `docs/task-cycles/wyposazenie-postaci/task_frozen.md`: lines matching `Załóż` and `ikon`, to see whether the task names a particular icon. It names none, and D-291 applies without change (line 223).
- `docs/task-cycles/wyposazenie-postaci/plan.md`: the slice headings and the lines naming `program-editor.test.mjs` and `rule-editor.test.mjs`, to attribute the 6 view failures to Slices 13 and 14.
- `foundations/invariants.md` `browser-view-token-values` (whole) and `guidelines/styleguide-browser-view.md:100-149`: whether `fill="#f4f4f5"` in an icon file breaks the token rule. It does not.
- `ruff.toml` (head): its width and required version, for the Ruff check.

## Working copies

- `.runs/review-9/` held the upstream icon, the transformed comparison file and the logs of the checks. It is removed (`rm -rf` on that full path). No git worktree was made, because the head equals the reviewed worktree's clean HEAD and the checks change no tracked file. `git status --short` is empty after the runs. No probe shows a finding, so nothing is kept in `reports/`. The `dist/` that the test runs rebuilt is the product's own build output.

## Unread material

- `guidelines/styleguide-browser-view.md` (1896 lines): not read whole. I read lines 100-149 (the token rule and its exemption for icon files) and the lines matching `assets/icons`, `.svg`, `SVG` and `ikon`. The slice changes no style or screen, only an icon file and a credit entry.
- `guidelines/testing.md`: read whole, in two parts. `guidelines/coding.md`, `guidelines/coding-browser-module.md` and `src/browser/AGENTS.md`: read whole.
- `src/browser/sim/data/actions.ts`: read the lines with `icon:` and the `equip` and `craft` entries (lines 225-250), not the whole file.
- `foundations/part_map.md` browser-view (lines 1-32), D-27, D-291, `icon-file-content`, `icon-credits` and F33: read whole.

## Searches not found or unclear

- `.runs/quality-venv` is absent in the task's worktree. I used the main checkout's `.runs/quality-venv` (Ruff 0.17.1) for the Ruff check.
