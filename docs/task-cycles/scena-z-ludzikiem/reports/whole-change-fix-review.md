PASS 6ee3c4d3a6cdcae3dc169fd2d338fd05b8c65938

# Review of the fix — whole-change review, task `scena-z-ludzikiem`

- Fix range: `c6dd7c3..6ee3c4d`, one commit (`6ee3c4d docs: :memo: give D-43's example of a sprite's frames and positions as percentages from TypeScript, the form its guard lets through`). `git rev-parse HEAD` = `6ee3c4d3a6cdcae3dc169fd2d338fd05b8c65938`, as given. Worktree clean before and after.
- Method: `.the-way/task-cycle/review/SKILL.md` and `.the-way/task-cycle/review/fix.md`. Read: the findings file `reports/whole-change-findings.md`, the fix report `reports/whole-change-fix-report.md` (as claims), and the diff `git diff c6dd7c3..6ee3c4d` — `foundations/decisions.md`, 1 line added, 1 removed.

## Findings of the findings file

**I1 — fixed.** D-43's *Verification* complies example (`C:\Storage\repos\loop2-wt\scena-z-ludzikiem\foundations\decisions.md:914`) no longer says "written in `px` in the stylesheet of the scene"; it reads "the frames and positions of the mage's sprite given from TypeScript as percentages of the scene's width and height". The guard lets that form through and refuses the old one. This matches the code (`src/browser/view/scene.tsx`, `boxOf`: `left`, `top`, `width`, `height` as percentages of the frame's width and height, set from TypeScript) and the styleguide (`guidelines/styleguide-browser-view.md:122-126`). No other entry the change writes still says `px` in the stylesheet: `grep` for "written in `px`" in `foundations/decisions.md` finds nothing. The binding sentence of D-43 is unchanged, as the finding asked. Its gap with the guard for a stylesheet stays for the request to name to the human.

## What the fix itself brought

No new Critical or Important finding.

- Minor note, inside the fix diff: the new example is a little narrower than what the code does. The places and sizes are percentages of the scene's width and height. The walk's starting offset `--walk-start` is a percentage of the mage's own frame (`scene.tsx:218`). The stepping of the frames is `translate: -100%` in the stylesheet, which is CSS and not TypeScript (`styles.css`, `@keyframes scene-frames`). Neither is refused by the guard (probe below). So no agent following the example can get a red gate, and an agent reading it narrowly misses nothing it would need to do. No action needed.

## Declined to judge

none

## Checks run

| Command | Exit | Result |
|---|---|---|
| `git rev-parse HEAD`; `git log --oneline c6dd7c3..HEAD`; `git diff --stat c6dd7c3..6ee3c4d`; `git diff c6dd7c3..6ee3c4d` | 0 | one commit, one line of `foundations/decisions.md` |
| `python -B .the-way/elements/common/foundation_check.py` | 0 | 0 errors |
| `python -B -c` probe of `value_findings` in `tests/invariants/` (`left: 42px`, `translate: -64px`, `height: 32px`, `left: 12.5%`, `translate: -100%`) | 0 | `['the length 42px']`, `['the length -64px']`, `[]`, `[]`, `[]` — the old example's form refused, the new example's form let through |
| `npm test -- tests/invariants/test_browser_view_token_values.py` | 0 | 4 tests OK |
| `grep -n` for "written in `px`" and the new phrase in `foundations/decisions.md` | 0 | only the new phrase, at line 914 |
| `git status --short` | 0 | empty |

## Reaches beyond the dispatch

- `src/browser/view/scene.tsx` (`boxOf`, `--walk-start`) and the `scene-frames` keyframes of `src/browser/styles.css`, already read in the whole-change review: to check that the new example says what the code does.

## Searches not found or unclear:

none
