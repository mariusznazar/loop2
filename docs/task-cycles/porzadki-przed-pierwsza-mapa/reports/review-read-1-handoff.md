# Handoff — a fresh reviewer reads what the review of the whole change left unread

You are a fresh reviewer, read-only, who made none of the change and did not write the earlier
reviews. Review with `review-change`; read `.the-way/task-cycle/review/SKILL.md` whole and, since
you judge the whole change against decisions, `.the-way/task-cycle/review/whole_change.md`. This is
the human's remark 2 on the open request (`reports/remarks-1.md`, remark 2) — its words: "have a fresh reviewer
read whole the decisions the review of the whole change named as not opened (the shared controls, the
tabs area, the rules of hooks and effects, and the rest of that dozen), against this change. They are
on the topic of the change, and the next task (the first new map) touches these screens."

- Worktree `the task's worktree`; the record directory
  `.runs/task-cycles/porzadki-przed-pierwsza-mapa/`; the remarks `reports/remarks-1.md`.
- The change to judge against the decisions: `git diff 6ab6a32b..7d61f0f3` — the whole change of the
  request, its foundation entries and the merge of the target branch (the two commits after `7d61f0f3`
  only add and remove the record's copy). Compute it yourself. The frozen task is `task.md` in the
  record directory.
- **Read whole**, each decision from its heading to the next `###` heading of
  `foundations/decisions.md`: D-44, D-267, D-276, D-311, D-343, D-346, D-18, D-35, D-36, D-85, D-88,
  D-89, D-130, D-263, D-269 (every one the earlier review named as not opened), and D-76, D-79, D-163,
  D-235, D-273 (read there only in part), D-06 and D-07 (D-06 was read only through the diff). Read the
  committed text with `git show 76fb7bcb:foundations/decisions.md` (a correction is writing in this
  worktree while you read; its edits are not yours to wait for), and the invariants and glossary entries
  those decisions link to as far as judging needs them, each whole.
- Judge each decision against the change: does the change break what the decision binds, or leave a
  sentence of it untrue? Open the code the decision speaks of — for the shared controls and the tabs
  area, `src/browser/view/controls/react-number-field.tsx`, `src/browser/view/tabs-area.tsx`,
  `src/browser/view/trip-plan.tsx`, `src/browser/view/rule-panel.tsx`, `src/browser/view/rule-list.tsx`,
  `src/browser/view/run-screen.tsx`, `src/browser/kitchen-sink/`; for the build and the content
  decisions, `scripts/build.mjs`, `tsconfig.sim.json`, `src/browser/sim/` — whole where a decision turns
  on a file. The test files are judged as the earlier review did; read a test file whole only where a
  decision binds its shape.
- Findings are graded as the method gives, within the task or outside it, as in every review. A
  decision the change does not touch gets one line in your report ("read whole, bears on nothing of
  the change, because …"); say so for each of the twenty-one.
- Checks: `python -B .the-way/elements/common/foundation_check.py`, and any focused check you need
  that does not write to the tree (do not run `npm test`, `npm run build` or a test that builds
  `dist/`); name each with command and exit code.
- Report: `.runs/task-cycles/porzadki-przed-pierwsza-mapa/reports/review-read-1-report.md`; first line
  `PASS <sha>` or `FAIL <sha>` (`<sha>` is `git rev-parse 76fb7bcb`); **Unread material** (the
  list of what stayed unread or read in part, or `none`); **Searches not found or unclear**.
