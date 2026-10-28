# Handoff — review of the reconciliation with the target branch, task `blokada-konta`

The person who requested this cycle (the product's owner) delegated the cycle's intermediate
choices to the orchestrator of `implement-task`. You are a **fresh reviewer** that made none of the
change. Read-only: write only your report; no other edits, no commits, never deploy or reach the
test server. Questions go to the orchestrator, never to the human. Do not run `npm test` without
arguments; focused checks run as `npm test -- <test file>`.

- Worktree (work from its root): `C:\Storage\repos\loop2-wt\blokada-konta`, branch
  `task/blokada-konta`, head `abf2e54`.
- Method: `.the-way/task-cycle/review/SKILL.md` — read it whole; a file it names only when the
  step that names it comes.
- What is reviewed: **the reconciliation with the target branch** — the merge commit `abf2e54`,
  parents `017c860` (the task branch, reviewed: whole change `PASS 81cb7c6`, return step and its fix
  `PASS 017c860`) and `519bb8c` (`origin/main`, PR #35 `rozwiazanie-lasu`). Judge what the merge
  changes against both parents: `git diff 017c860 abf2e54` (what `main` brought, plus the
  resolution) and `git diff 519bb8c abf2e54` (this task's change as it now lands on `main`).
- The merge renumbered this branch's decisions because `main` wrote its own D-129 … D-136: the
  branch's D-129 → D-137 (operator blocks and unblocks), D-130 → D-138 (how a login is kept
  between requests, projected), D-131 → D-139 (login of a blocked account). Check that `main`'s
  D-129 … D-136 stand exactly as on `519bb8c`, that every reference to the branch's three decisions
  uses the new numbers, and that no conflict resolution dropped or changed either side's meaning.
- The author's report of the merge: `.runs/task-cycles/blokada-konta/reports/09-merge-report.md`.
- Frozen task: `.runs/task-cycles/blokada-konta/task.md`; spec: `.runs/task-cycles/blokada-konta/spec.md`.
- Trust boundary and irreversible operation as before: `src/server/**` is the trust boundary; the
  change prepares, never performs, the first migration of `loop2_accounts`.
- Report path: `.runs/task-cycles/blokada-konta/reports/10-merge-review-report.md`

Return only the report's first line (`PASS <sha>`, `FAIL <sha>` or `questions`) and its path.
