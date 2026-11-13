# Handoff — review of the merge of the target branch into the task branch, `review-change`

You are a fresh reviewer; you did not make the change or the merge. Method: `review-change` (read whole
`.the-way/task-cycle/review/SKILL.md` in the worktree). Read-only; run no full `npm test`; do not stop or start
Docker Desktop.

- Worktree `.` (the repository's root of the task's worktree, `the repository's root`),
  branch `task/testy-same-wlaczaja-dockera`. Review the merge commit `50bb46a2ddb25bca8e3a7fd8cd6324ab25b8ece8`
  (first parent `33944bea…`, the reviewed tree of the task; second parent `fc00c406…`, `origin/main` with the merged request #88).
  Confirm `git rev-parse HEAD`; compute `git diff 33944bea..50bb46a2` and the conflict's resolution yourself.
- The dispatch's question: **do the two sides still hold together?** The task's change (the Docker start by the gate;
  frozen task `.runs/task-cycles/testy-same-wlaczaja-dockera/task.md`; reviewed whole change `PASS`, fix `PASS`, return
  step `PASS`) lives in `scripts/docker_gate.py`, `scripts/test.py`, `tests/quality/`, eight Docker test files, the guideline
  `guidelines/testing.md` and the foundation entries D-390, D-391, D-392, `gate-docker-start-waits-once`,
  `docker-desktop-start-detach` and one sentence of `build-tools` in `foundations/part_map.md`. The other side brought a
  change to the browser view and simulation (`src/browser/**`, `tests/view/**`, `tests/sim/**`), the guidelines
  `guidelines/coding-browser-module.md` and `guidelines/styleguide-browser-view.md`, and in the foundation: decisions
  D-241, D-245, D-246, D-189 and others (D-380..D-389 are older), and the invariant `loop-practice-payment`.
- The one conflict: `foundations/invariants.md` (both sides appended an entry at the end of the list). The cycle kept both
  entries, and restored `- **Violated:** no` for `gate-docker-start-waits-once`, which git had left after the conflict.
  Judge that resolution entry by entry (the two entries must be whole and each keep its own fields), and judge whether the
  automatic merge of `foundations/decisions.md` left every decision whole and the numbering without collision.
- Foundation entries of the merge that bear on the parts the change touches (build-tools, deployment, test-helpers): none
  of the added decisions or invariants names those parts, by the cycle's reading; verify that, by the `Scope` and `Part`
  lines of the entries the merge added, and read whole any that does.
- Checks you may run: `python -B .the-way/elements/common/foundation_check.py`;
  `python -B scripts/test.py tests/invariants/test_cross_part_imports.py`; `python -B scripts/test.py tests/quality/test_docker_gate.py`.
  Each with its command and exit code in the report.
- Report: `.runs/task-cycles/testy-same-wlaczaja-dockera/reports/review_merge_report.md`, first line `PASS <sha>` or `FAIL <sha>`;
  **Unread material**, **Searches not found or unclear** (`none` where none). Return its first line, files with line counts,
  the report path, questions and concerns.
