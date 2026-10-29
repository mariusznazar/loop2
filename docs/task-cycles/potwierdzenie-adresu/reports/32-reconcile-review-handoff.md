# Handoff — review of the reconciliation with the target branch, task `potwierdzenie-adresu`

## Delegation and stage

The person who requested this cycle (the product's owner) delegated the cycle's intermediate
choices to the orchestrator of `implement-task`. You are a fresh reviewer; you made none of this
change. Read-only: never change the worktree, its index or branch; a check needing changed files
goes in a separate worktree of the head, removed when done. Questions go to the orchestrator, never
to the human.

- Worktree: `C:/Storage/repos/loop2-wt/potwierdzenie-adresu`, branch `task/potwierdzenie-adresu`.
- Method: `.the-way/task-cycle/review/SKILL.md` (project skill `the-way-review-change`), read whole.
- What is reviewed: **the reconciliation with `main`**, range `7247c09..e07da9b`:
  - `7dea887` — this branch renumbers its own decisions D-140…D-151 to D-152…D-163 (add 12),
    because `main` wrote other decisions under D-140…D-151 in the meantime;
  - `e07da9b` — the merge of `origin/main` (`4bfb962`, PR #38 `walka-w-glebi-lasu`, 15 commits)
    into the task branch; one conflict at the end of `foundations/decisions.md`.
- The author's report: `.runs/task-cycles/potwierdzenie-adresu/reports/31-reconcile-report.md`;
  its handoff: `reports/31-reconcile-handoff.md`. Claims to verify, not evidence.
- What to check: that the renumbering is complete and exact (no mention of this branch's
  decisions left under an old number, none of main's renumbered; `git grep` over the merged tree;
  the two `loop2-deploy` skill copies byte-identical), that the merge keeps both sides' meaning in
  every file both touched (`foundations/decisions.md`, `foundations/invariants.md`,
  `src/browser/styles.css`) and nothing else, that no decision of one side now contradicts or
  should name one of the other (the same question asked twice), and that the reviewed behaviour of
  the task's change (`7a633a7..7247c09`, reviewed `PASS 28f0686` and `PASS 7247c09`) is unchanged
  by the merge — run the focused tests that tell this apart.
- Frozen task, for what the change must still do: `.runs/task-cycles/potwierdzenie-adresu/task.md`.
- Report path: `.runs/task-cycles/potwierdzenie-adresu/reports/32-reconcile-review-report.md`,
  first line `PASS e07da9b` or `FAIL e07da9b`, or `questions`.
- Do not run `npm test` without a file (the orchestrator runs the gate on this tree). Never deploy,
  touch the server or connect to `outsider.mikr.us`.

## Answers of step 4

- Trust boundary: **yes** — `src/server/**`, keys and the deployment.
- Irreversible operation: **yes** — schema step 3 of `loop2_accounts` on the test server (H4, the
  merge); only prepared. Check that `main` brought no schema step that collides with step 3.

## Return

Return only your report's first line and its path.
