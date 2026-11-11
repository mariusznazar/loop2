# Handoff — review of the second merge of the target branch (task "Zbieranie jako widowisko")

You review, as an agent that made none of this change, the merge of the remote target branch into the
task branch, made at the human's request after another task was merged into `main`. You are
read-only: change no tracked file, make no commit; scratch only in your own new directory under the
worktree's ignored `.runs/`.

**Do not run `npm test`, `npm run build` or any build or test that writes `dist/`:** the orchestrator is
running the product's full gate in this worktree now, and two builds at once corrupt it. You may run
`git`, read files, and `python -B .the-way/elements/common/foundation_check.py` (read-only).

## What you review

- Method: read `.the-way/task-cycle/review/SKILL.md` whole (project skill `the-way-review-change`).
- Worktree `the worktree's root`, branch `task/zbieranie-jako-widowisko`.
  The merge commit is `b64354ed460636df6662e2573ad613ff9ddde496` (confirm with `git rev-parse HEAD`);
  its parents are the branch's earlier head `4bfdbe9b…` (the code, entries and the first merge were
  reviewed `PASS`: whole change, fix, return step, merge `1b0990ac`, and the correction `fa4d8bdb`) and
  `origin/main` at `3b7e4930…` (12 commits: the task "show the price of an action and draw an
  extinguished campfire", merged as PR 78). The pin of the-way is unchanged (`52f8164a…`, gitlink and
  checkout agree).
  Compute: `git diff 4bfdbe9b HEAD` (what the merge brought and changed), `git log 4bfdbe9b..HEAD`.
- The question: **do the two sides still hold together?** Check what the conflicts and the merge changed:
  1. `foundations/decisions.md`: main took the id D-363 ("Where does the player read what an action
     costs?"), so this task's four decisions were renumbered D-363→D-364, D-364→D-365, D-365→D-366,
     D-366→D-367 with every reference to them (the decisions' own text and *Relations*, the styleguide
     `guidelines/styleguide-browser-view.md` lines that name them, and the comment in
     `tests/view/scene.test.mjs`). Main's references to its own D-363 (in `src/browser/view/program-editor.ts`
     and `tests/view/rule-editor.test.mjs`) must stay untouched. Search the whole repository for a reference
     left on an old number, a wrong one, or a mix-up of main's D-363 with this task's decision.
  2. `tests/view/icons.test.mjs` — three conflicts: main changed the footer's and the credits section's tests
     (an extinguished-campfire icon, `changesOf(icon)` giving the change text per icon, `slice(6)` for the
     actions' lines); this task's side made the footer and the section end with one more line, the credit of
     the dust pack (`PACK_LINE`), so that the count of lines is `NAMED.length + 1`. The resolution keeps this
     task's loops over `NAMED` with `items[i]`, uses main's `changesOf(named.icon)`, and slices the actions'
     lines as `items.slice(6, NAMED.length)` (excluding the pack's last line). Check the whole file for
     consistency (every count of lines, the indices 4 and 5 of the campfire lines, the last-line tests),
     and read `src/browser/view/credits.ts`, `footer.ts` and `credits-section.tsx` as merged (both sides edited
     `credits.ts` and `footer.ts`: main for the wood-pile icon's credit, this task for the pack's line).
  3. `foundations/invariants.md`, `foundations/environment_facts.md`, `tests/invariants/test_icon_credits.py`
     (main changed it) auto-merged: check that this task's invariant `sprite-credits` and its fact
     `smoke-fire-particle-licence`, and main's new entries, are each whole, unchanged from their side, and
     that no decision of main's contradicts the task's entries (read main's D-363 whole and the decisions of
     main's 12 commits that bear on browser-view or simulation: `git log 4bfdbe9b..HEAD --stat`).
  4. Collisions between the two sides in the scene and its data (`src/browser/sim/data/scene.ts`,
     `src/browser/view/scene*.ts*`, `src/browser/styles.css`): main touched `terrain-picture.ts`, `program.ts`,
     `run.ts`, `program-editor.ts` — look for any effect on the scene's effects (a gathering's end, the
     backpack comparison `USES_BACKPACK`, the actions that take pieces out of the backpack: main's change in
     `run.ts` and `program.ts` may touch what `sceneEffect` reads).
- The frozen task, for what the task requires of the entries:
  `docs/task-cycles/zbieranie-jako-widowisko/task.frozen.md`.
- Trust boundary answer for this task: yes (`assets/sprites/**`); confirm the merge changes no file there
  and that `assets/icons/` changes (main's wood-pile icon) are main's, not this task's.

## Report

Write your report to
`docs/task-cycles/zbieranie-jako-widowisko/reports/review-merge-2-report.md`
with the first line `PASS <sha>` or `FAIL <sha>` (or `questions`), graded findings (Minor inside and outside the
task apart), **Unread material**, **Searches not found or unclear**, each reach beyond this handoff, and each
check with command and exit code. Return the first line, the changed files with added/removed line counts of
`git diff 4bfdbe9b HEAD`, the report path and a one-line check result.
