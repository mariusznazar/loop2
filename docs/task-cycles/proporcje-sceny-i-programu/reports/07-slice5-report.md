# Slice 5 report — What the move leaves behind goes

**Status:** done with concerns (concerns listed below; none blocks the slice's Checks).

**Commit:** `df84a1d` on `task/proporcje-sceny-i-programu` (base `d737a1a`). Not pushed.

## Files changed (added / removed lines)

| File | + | − |
|---|---|---|
| `.claude/skills/loop2-play/SKILL.md` | 4 | 3 |
| `src/browser/view/chronicle.ts` | 1 | 1 |
| `src/browser/view/program-panel.tsx` | 7 | 46 |
| `src/browser/view/rule-panel.tsx` | 6 | 5 |
| `src/browser/view/scene.tsx` | 1 | 1 |
| `src/browser/view/tile-table.tsx` | 1 | 1 |
| `src/browser/view/world-area.tsx` | 1 | 1 |
| `tests/view/program-panel.test.mjs` | 16 | 89 |
| `tests/view/scene.test.mjs` | 2 | 4 |
| `tests/view/world-area.test.mjs` | 1 | 1 |

Full paths are under `the worktree's root`.

## What changed

- `program-panel.tsx`: removed `placeRulePanel` from the type and the body, the `ruleHost` and `onRuleOpen` props, the `createPortal` import and portal, the `onRuleOpen` effect, the `onRuleOpen(false)` call in `dispose`, and the host part of `commitEditor`. `RuleListView` now always gets `panel={rulePanel}`. Header comment and the `addDiscoveredRule` doc now say the panel opens under the row.
- `rule-panel.tsx`: header comment says the panel stands in the rule list under its row or header; the `createRulePanel` sentence is corrected (the rule list draws the panel through `RulePanelView`; `createRulePanel` is kept, it is used by `tests/view/rule-editor.test.mjs`).
- Comment-only fixes: `scene.tsx` ("right at either scale" → "at its one size"), `world-area.tsx` and `tile-table.tsx` and `chronicle.ts` ("right area" → "area with the tabs").
- Tests:
  - `program-panel.test.mjs`: deleted `withHost` and the case "a rule panel given a host stands in it..." (tested only the host; its player-visible parts, opening under the row, focus, ✕ and Escape, are covered by the case at the top of the rule-panel section). Deleted "a number typed into the rule panel in its host..." — an exact duplicate of "a number typed into the panel on the screen of a map run at 16×..." which stays. Rewrote the chill case and the "no discovery" case without host, told or host assertions. Fixed comments/names at the rule-panel section and "no layout gives the panel a column of its own".
  - `scene.test.mjs`: removed both `placeRulePanel: () => {}` stubs; fixed "scale 2" and "either scale" comments.
  - `world-area.test.mjs`: one comment.
- `loop2-play/SKILL.md` step 5: the panel opens under the row of that rule; the tabs stay as they were.

## Checks (command → exit code)

- `npm test -- tests/view/program-panel.test.mjs` → 0 (50 pass, 0 fail)
- `npm test -- tests/view/scene.test.mjs` → 0 (19 pass, 0 fail)
- `npm test -- tests/view/world-area.test.mjs` → 0 (21 pass, 0 fail)
- `npm test -- tests/view/run-screen.test.mjs` → 0 (13 pass, 0 fail)
- `npm test -- tests/view/rule-signs.test.mjs` → 0 (6 pass, 0 fail)
- `npm test -- tests/view/account-screen.test.mjs` → 0 (128 pass, 0 fail)
- `npm run typecheck` → 0
- `npx eslint --max-warnings 0 <six view sources>` → 0
- `npx prettier --check --no-config --no-editorconfig --ignore-path .gitignore <nine files>` → 0 after one fix (a collapsed `if` in `commitEditor`, the only hunk prettier reported)
- `git grep -n "placeRulePanel\|ruleHost\|createPortal" -- src tests` → no lines (grep exit 1)
- `git grep -n -i "right area" -- src tests` → only lines of the screen Mapy (`maps-screen.tsx`, `maps-screen.test.mjs`)

Not run:
- Full `npm test` (not run per the handoff; the orchestrator's gate).
- `python -B .the-way/elements/common/foundation_check.py` (not run by me; no foundation file changed).
- Real-browser check and screenshot: no shown screen changes in this slice, since no caller placed a host (`game-view.ts` never called `placeRulePanel`); the removed path was dead. `ui_check.md` therefore finds nothing new to inspect; I did not run the game.

## Own-work check (section 3)

- Requirement: no comment or test name still speaks of a rule panel beside the rows, a right area, or two scales; and no host path remains.
- Check: the two `git grep` commands above, plus a grep for `beside|either scale|scale 2|two scales|onRuleOpen|host` over the changed files.
- Result: clean apart from `rule-panel-host`, the class name of the element `createRulePanel` builds (not a placement host; kept).
- Mutation thought: a test that still expected the host would now fail, since the host is gone; the remaining panel-under-row cases assert the row's `nextElementSibling` contains the panel, so a regression that drew it beside the rows fails them.

## Searches not found or unclear

- None unresolved for the slice's own list.

## Concerns for the orchestrator (outside my Change list, not touched)

1. `guidelines/styleguide-browser-view.md` still has the stale wording the task's To do 5 names: lines 128–129 and 596–597 (scale of the scene: "two scales") and 626–628 ("right area" of the chronicle); line 646 also names `src/browser/view/right-area.tsx`, the file that still holds the tabs component (`RightArea`). Not in this slice's Change list; another slice or the foundation step must take it.
2. `src/browser/view/game-view.ts:647` says "so no host is placed for it here" — refers to the removed host; comment only. Not in my list.
3. `src/browser/view/game-view.ts:161–164` mentions "beside the column of the map run" — likely still true; not checked in depth.
4. `src/browser/styles.css:1865` comment names `createRulePanel`; styles.css is excluded by the handoff.
5. `right-area.tsx` file and `RightArea` component keep the old name (the handoff keeps them; renaming is a separate decision).
6. The `styleguide` "Main button…" and "The chronicle of a map run" sections, and D-311/D-288 texts, were not reviewed for this slice.

## Reads

- Whole: all changed files, the handoff, `make-change` SKILL.md, `slice.md`, `ui_check.md`, `guidelines/coding.md`, `coding-browser-module.md`, `testing.md`, `styleguide-browser-view.md`, `src/browser/AGENTS.md`, `browser-view` part entry and `browser-view-token-values` invariant ranges, decisions D-288, D-311, D-349, `tests/view/page-document.mjs`, `.claude/skills/loop2-play/SKILL.md`.
- In parts: `tests/view/program-panel.test.mjs` (1715 lines) read in two calls (lines 1–1258 and 1259–1715); the other test files and sources in one call each.
- Searches beyond the handoff: `createRulePanel` users (only `tests/view/rule-editor.test.mjs`), `createTileTable`/`RightArea` users (run-screen, world-area test); both checked.
- Vault `.ai/rules/git.md` read before the commit.

## Choices made

- Deleted the duplicate host-number case instead of rewriting it, since the same player-visible behaviour is already tested without a host (rejected: rewriting it under the row, which would have duplicated the existing case).
- Kept `createRulePanel` and its tests (not a host path; used by `rule-editor.test.mjs`, outside this slice's list).
