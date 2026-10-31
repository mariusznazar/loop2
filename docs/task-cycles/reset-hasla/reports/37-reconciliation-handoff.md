# Handoff — reconciliation with the target branch, task `reset-hasla`

## Delegation and stage

The person who requested this cycle (the product's owner) delegated the cycle's intermediate
choices to the orchestrator of `implement-task`. `main` moved after the request opened: PR #44 (task
14) merged as `4ed8fcd`. You reconcile the task branch with it, a fresh agent. Your stage is the
reconciliation with the target branch; you take no row of the variants table of `make-change`.
Your questions go to the orchestrator, never to the human.

- Worktree (work from its root): `C:\Storage\repos\loop2-wt\reset-hasla`, branch `task/reset-hasla`,
  head `fdfbc62`. Target `origin/main` at `4ed8fcd`, already fetched. Process pin `.the-way` at
  `a8dfe8a`, not moved on either side: verify it after the merge.
- Method: `.the-way/task-cycle/change/SKILL.md` (project skill `the-way-make-change`) for how you commit
  and report; each foundation entry you touch goes through its element's project skill.
- Report path: `.runs/task-cycles/reset-hasla/reports/37-reconciliation-report.md`.
- `.runs/` is ignored, `.runs/quality-venv` and `node_modules` stand here; run `npm ci` after the merge
  only if `package-lock.json` changed.

## What to do, in this order

1. **Renumber on the branch, in a commit of its own, before the merge.** Task 14 wrote D-214 to D-221
   on `main`, and this branch wrote D-214 to D-219. At the base `95de83b` no file names D-214 to D-219,
   so every such mention on the branch is this task's. Map them, highest first so no replacement meets
   its own output: D-219 → D-227, D-218 → D-226, D-217 → D-225, D-216 → D-224, D-215 → D-223,
   D-214 → D-222. Reach: `foundations/decisions.md`, `foundations/invariants.md`, `guidelines/`, `src/`,
   `tests/`, and any other file git tracks that names them (search, do not trust this list), in
   headings, relations, comments and test names. Keep each file's line endings.
2. **Merge `origin/main`** into the branch with a merge commit. Git reports conflicts in
   `foundations/decisions.md` and `foundations/invariants.md` only. Keep both sides' meaning: where both
   changed one entry, write the entry that carries both, and D-221's successors in number order at the
   end of the file. Nothing either side settled is dropped or reworded beyond what joining needs.
3. **Look for what merged cleanly and no longer fits.** `src/browser/styles.css` and
   `tests/view/account-screen.test.mjs` were changed on both sides. Compare also entries one side changed
   that the other side's new entries lean on (D-44, D-96, D-211, D-203, the save version D-206 and
   D-210), and the numbers in `guidelines/` tables. Correct what no longer matches in the same stage.
4. **Check that mentions of D-214 to D-221 now mean main's entries**, every one, and that D-222 to D-227
   mean this task's.

## Checks

`python -B .the-way/elements/common/foundation_check.py`, `npm run typecheck`,
`npm test -- tests/view/account-screen.test.mjs`, `npm test -- tests/view/password-reset.test.mjs`,
`npm test -- tests/http.test.mjs`, `npm test -- tests/quality/test_quality_invariants.py`, each with its
command and exit code. Do not run the full gate (`npm test` with no argument); it is the orchestrator's.

## Commits

Explicit paths in the repository's style (`git add <path>`, for the merge the paths that conflicted),
English messages. No push, no force, no rebase: the branch is pushed and two links stand on its SHAs.
Commit the merge with the repository's `merge: :twisted_rightwards_arrows:` form.

## Report

The old-to-new map as applied, each conflict and how it was joined, what step 3 and step 4 found, the
checks, your reaches and **Searches not found or unclear**. For any entry whose meaning the joining
changed, one sentence in Polish. Return your status, your commits, a one-line check result and the
report's path. Where joining would change the meaning of a decision beyond what both sides carry,
return `blocked` with the question.
