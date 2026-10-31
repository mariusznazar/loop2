# Handoff — fix of the review of slice 2, task kopia-bazy

You make: the fix of a review's findings. Read `.the-way/task-cycle/change/SKILL.md` again for that variant, and `.the-way/task-cycle/change/fix.md`.

**Findings file.** `docs/task-cycles/kopia-bazy/reports/slice-2-findings.md`. Fix that one finding; the review's Minor findings are not yours. The whole review: `docs/task-cycles/kopia-bazy/reports/slice-2-review-report.md`.

**Bound answers.**
- The fix is a test: keep the check's code as it stands unless the test shows it wrong. The named variants are the finding's: an empty backup, another value in the backup, two steps and a refused `rate`, each asserting a non-zero exit and no success line, with the pass-through control proving the stand-in was reached. Use the reviewer's way of reaching the built check, or another that needs no injection point in the product.
- Show each variant failing against a mutant in which `expect` never throws, by command and exit code, and restore it before you commit.
- These are tests of `account-save-sqlite-upgrade`, so they cite it (`// invariant: account-save-sqlite-upgrade`), and spec section 15 asks that of every new test of an invariant.
- Each test bounds its waits and stops what it started, on a failure too.

**Boundary.** As in your slice's handoff. Run the affected focused checks and the gate's own Ruff, ESLint and Prettier commands on what you change; the full `npm test` is the orchestrator's. Commit messages in English in the repository's form; `git add` by path.

**Report.** `docs/task-cycles/kopia-bazy/reports/slice-2-fix-report.md`, the finding as fixed with the check that shows it, or contested with the evidence, and **Searches not found or unclear**.

**Return.** Your status, your commits, a one-line check result naming what failed or did not run, and the report's path.
