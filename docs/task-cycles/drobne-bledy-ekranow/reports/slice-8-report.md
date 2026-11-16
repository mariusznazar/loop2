# Slice 8 report — the rule panel follows its rule to another group, and „✕” under a folded group

Status: `done with concerns`

Worktree: `.`, branch `task/drobne-bledy-ekranow`, base `39ca66afdae0bfce1640c5d6d19bc0df2be151d2`.

## Summary

Both parts are done. The coordinator answered the earlier questions: yes to changing `rule-panel.tsx`, and yes to the browser check.
- (a) „✕” and Escape on a panel under a folded group's header give the focus to that header.
- (b) A rule moved across a group border by „↓”/„↑” or by its handle keeps the panel open under its new row, on the same field.

Concern: the browser check of (b) covered the arrow only. The drag-handle path is covered in jsdom only.

## Commits (range `39ca66af..85e379de`)

- `30a63b81` — `fix: :bug: give the focus to the header of a folded group when the rule panel under it closes`
  - `src/browser/view/program-panel.tsx`: after a close, focus falls back to the group's header when the rule's row is not drawn.
  - `tests/view/program-panel.test.mjs`: two cases, `✕` and Escape under a folded header.
- `85e379de` — `fix: :bug: keep the rule panel open on its field when its rule moves to another group`
  - `src/browser/view/rule-panel.tsx`: `openKey` names a rule by its number alone (`rule:${ruleId}:${field}`), not by its group, so a move keeps the field. Groups' own panels keep `group:${groupId}:${field}`.
  - `src/browser/view/program-panel.tsx`: a pure helper `holdingTarget` resolves the open target to the group that holds the rule now. The panel and the list use it; `closePanel` uses it too. A rule that is gone clears the open state (`setOpen(null)`), so a deleted rule's panel closes for good.
  - `tests/view/program-panel.test.mjs`: the cross-border case with „↓” and then the drag handle, written first and seen failing (`the panel stands under rule 1's new row`).

## Checks

| # | Command | Exit | Result |
|---|---|---|---|
| 1 | `npm test -- tests/view/program-panel.test.mjs` before the 30a63b81 fix | 1 | 2 fail, focus on `<body>` (failing first) |
| 2 | same, after 30a63b81 | 0 | 55 of 55 |
| 3 | `npm test -- tests/view/program-panel.test.mjs` before the 85e379de fix, cross-border case added | 1 | 1 fail: `the panel stands under rule 1's new row`, expected true, got false (failing first) |
| 4 | same, after 85e379de | 0 | 56 of 56 |
| 5 | `npm test -- tests/view/rule-editor.test.mjs` | 0 | 76 of 76 |
| 6 | `npm test -- tests/view/discovery-band.test.mjs` | 0 | 10 of 10 |
| 7 | `npm test -- tests/view/program-editor.test.mjs` | 0 | 54 of 54 |
| 8 | `npm test -- tests/view/discovery-rule.test.mjs` | 0 | 18 of 18 |
| — | `npm test -- tests/view/rule-panel.test.mjs` | 2 | No such file in `tests/view/`; not a check. Coverage of `rule-panel.tsx` is in `rule-editor.test.mjs` (check 5). |

The full suite was not run, as instructed.

## Browser check (`.claude/skills/loop2-play/SKILL.md`, D-88)

The local game ran (`npm run local`, `https://127.0.0.1:60033`). I drove it with `playwright-cli` 0.1.22 through a made-up account (`agent-s8@example.test`) and the character „Ala”, on „Skraj lasu” at minute 40, paused. Browser closed and the game stopped at the end.

- (a) Under a folded header. Group 2 holds the panel (`Reguła 2.1`, field „Czynność”). I folded group 2 with its „▾” button: the row of rule 1 is no longer drawn, the panel stays open under the header, field still „Czynność”. Then the panel's „✕” (click): the panel closed and `document.activeElement` is the `rule-list-header` of group 2. Seen: focus on the header, as required.
- (b) Across a border, by the arrow. Group 1 held rule 1 with the panel open on „Czynność”. „↓” on rule 1 (last of group 1, first of group 2 after the move): the panel stands under rule 1's new row in group 2, heading `Reguła 2.1`, field „Czynność” kept. The focus is on rule 1's „W górę” arrow, the correct fallback, since „W dół” is disabled on the last group.
- (b) by the drag handle: not run in the browser. It is covered in jsdom (the same test, after the arrow case) and shares the same commit path (`commit(next, focus, move)` in `rule-list.tsx`).
- The focus ring on the header in the screenshot is faint at 1280 px: the header is at the edge of the group, and I could not confirm the ring from it alone. The focus target itself was confirmed by the DOM check above.

Screenshot (kept for the request; made-up account only, no address):
- File in the cycle's branch of the public screenshots repository, commit `c4ba867babdbafa10f38992e2f0ba0153b52df9c`, path `loop2/drobne-bledy-ekranow/slice-8-focus-header.png`.
- Link for the request: `https://github.com/mariusznazar/screenshots/blob/c4ba867babdbafa10f38992e2f0ba0153b52df9c/loop2/drobne-bledy-ekranow/slice-8-focus-header.png?raw=true`
- The screenshot shows the header-focus state of (a) after „✕”, not the cross-border state of (b).

## Own-work check

- Requirement: the panel stays open on its field across a group border, and „✕” under a folded header gives the focus to the header (D-306 as amended; To do 6 and 15).
- Check: the cross-border test in `tests/view/program-panel.test.mjs` (arrow, then drag), and the two header-focus cases.
- Run: failing run 3 above; passing run 4 above, and run 2 for the header cases. The browser DOM checks above confirm both parts in the running game.

## Concerns

- Rule numbers must be unique within a program for `holdingTarget` and the new `openKey` to be right. The lookup searches all groups by rule number. This holds by construction (`nextRuleId` is program-wide, as the test helpers assume), but I did not read `program-editor.ts` to confirm it. Restart reuses the copy key `copy`; a stale open target could match a rule of the same number in a new copy. The same weakness existed within a group before.
- The `openKey` change means a rule's panel keeps its field when another panel of the same rule number reopens; the key also no longer changes when the rule moves between groups. Intended.
- The deletion case (panel closes on its rule's deletion) now clears the open state explicitly; I did not write a dedicated test for it. The existing behaviour already hid the panel.

## Unread material

- `guidelines/coding.md`, `guidelines/testing.md`, `guidelines/styleguide-browser-view.md`, `guidelines/coding-browser-module.md`, `src/browser/AGENTS.md`: read whole.
- `src/browser/view/program-panel.tsx`, `src/browser/view/rule-list.tsx`, `src/browser/view/rule-panel.tsx` (whole, as it stands): read whole.
- `tests/view/program-panel.test.mjs`: read whole.
- `foundations/decisions.md`: D-306, D-350, D-288, D-295, D-297, D-313 read at their ranges. D-420 read.
- `foundations/glossary.md` lines 53-63 and `foundations/invariants.md` lines 1188-1197, `foundations/part_map.md`: not read; not needed for this change.
- `.the-way/task-cycle/change/ui_check.md`: read. `.claude/skills/loop2-play/SKILL.md`: read whole.
- `tests/view/rule-editor.test.mjs`, `discovery-band.test.mjs`, `program-editor.test.mjs`, `discovery-rule.test.mjs`: run, not read in full.
- `a note in the author's private notes`: read (required by the commit hook).

## Searches not found or unclear

- `tests/view/rule-panel.test.mjs` does not exist (check 8 of the table is not a check).
- The method's assumption that rule-editor tests cover the real panel across a border: they draw the rule list with a probe panel. No existing test covered the real `RulePanelView` across a border before this slice.

## Reaches beyond the handoff

- `src/browser/view/rule-panel.tsx` (approved by the coordinator).
- The public `mariusznazar/screenshots` repository, branch `loop2/drobne-bledy-ekranow`: one screenshot pushed (D-419, as `loop2-play` prescribes; made-up account only).

## Working copies

- The browser session files (`.playwright-cli/`) and the screenshots clone (`.runs/screenshots/`) were removed in the worktree after the push. The local-start database under `.runs/local-start/` was left by `npm run local` and stays, as the skill says it is no leftover.
- `.runs/slice-8/` (test logs) was removed.
