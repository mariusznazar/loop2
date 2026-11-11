# Handoff — review of the merge of the target branch (task "Zbieranie jako widowisko")

You review, as an agent that made none of this change and reviewed no earlier part of it, the merge
of the remote target branch into the task branch. You are read-only: change no tracked file, make no
commit; scratch only in your own new directory under the worktree's ignored `.runs/`.

**Do not run `npm test`, `npm run build` or any build or test that writes `dist/`:** the orchestrator is
running the product's full gate in this worktree at this moment, and two builds at once corrupt it. You
may run `git`, read files, and run `python -B .the-way/elements/common/foundation_check.py`
(read-only).

## What you review

- Method: read `.the-way/task-cycle/review/SKILL.md` whole (project skill `the-way-review-change`).
- Worktree `the worktree's root`, branch `task/zbieranie-jako-widowisko`.
  The merge commit is `1b0990ac` (confirm with `git rev-parse HEAD`; expand the SHA yourself); its
  parents are the reviewed head `d457d238…` (all code reviewed `PASS`: whole change at `6019d7a`, fix and
  return step in range `6019d7a..d457d238`) and `origin/main` at `952fbd07…` (14 commits).
  Compute: `git diff d457d238 HEAD` (what the merge brought and changed) and
  `git log d457d238..HEAD`, `git diff 211a4ea 1b0990ac` for the whole range.
- The question the dispatch asks: **do the two sides still hold together?** Check what the conflicts
  and the merge changed:
  1. `foundations/decisions.md`: main took the id D-362 ("How does loop2 point to places on the author's
     disk…"), so the task's four decisions were renumbered D-362→D-363, D-363→D-364, D-364→D-365,
     D-365→D-366 with every reference to them (the decisions' own text, *Relations*, the styleguide
     `guidelines/styleguide-browser-view.md`, the comment in `tests/view/scene.test.mjs`); search the
     whole repository for any reference left on the old numbers, any wrong one, and any reference to
     main's D-362 that the renumbering touched by mistake.
  2. `foundations/invariants.md`: both sides added an entry at the same place; the resolution keeps both
     (`tracked-file-private-paths` of main and `sprite-credits` of the task, each with its own
     *Violated* field). Check that each entry is whole and unchanged from its side.
  3. The pin of the-way: main moved `.the-way` to `52f8164a354ee1a704af0d58add2f3be8e4f0247`; the
     worktree's `.the-way` is checked out at it (the gitlink agrees). `git diff d457d238 HEAD --stat`.
  4. Under that pin's decisions template ("a task document is never named in *Origin*", WAY-27), the
     orchestrator set *Origin* of the four new decisions to `none` and removed its own added
     citations of the task document from the *Origin* of D-271 and D-317. Check that nothing else of
     the change names the task document in a tracked file and that each of those entries still holds
     its reasoning in *Rationale* and *Rejected*.
  5. `tests/view/scene-picture.test.mjs` was changed by main as well (2 lines); `AGENTS.md`,
     `guidelines/testing.md`, `tests/agent_workflow/test_tracked_file_private_paths.py`,
     `tests/deploy/deploy_script_support.py` came from main. Check that the task's code and tests do not
     collide with them, in particular with main's rule that no tracked file holds an absolute path on a
     disk (D-362 of main and the invariant `tracked-file-private-paths`, with its test): look for such a
     path or a private note link in any file the task added or changed.
- Foundation entries the merge brought in that bear on the parts the change touches (browser-view,
  simulation, product-foundation, agent-workflow): read whole main's D-362, the invariant
  `tracked-file-private-paths`, the-way's `elements/decisions/template.md` and
  `elements/invariants/template.md` as changed by the pin, and any other decision of main's 14
  commits you find touching those parts (search `git log 211a4ea..952fbd07 --stat`).
- The frozen task, for what the task requires of the foundation entries:
  `docs/task-cycles/zbieranie-jako-widowisko/task.frozen.md`.
- The trust boundary answer for this task is yes (`assets/sprites/**`): confirm the merge changes no file
  there.

## Report

Write your report to
`docs/task-cycles/zbieranie-jako-widowisko/reports/review-merge-report.md`
with the first line `PASS <sha>` or `FAIL <sha>` (or `questions`), graded findings (Minor inside and
outside the task apart), **Unread material**, **Searches not found or unclear**, each reach beyond this
handoff, and each check with command and exit code. Return the first line, the changed files with
added/removed line counts of `git diff d457d238 HEAD`, the report path and a one-line check result.
