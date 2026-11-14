# Handoff — the fix of slice 1's review findings

You made slice 1 (commit `896b7509`); its reviewer returned `FAIL`. Fix the blocking finding, with `make-change`, variant "the fix of a review's findings" (`.the-way/task-cycle/change/SKILL.md`; read `.the-way/task-cycle/change/fix.md` when the variant names it). The findings are in `reports/slice-1-findings.md` (full path `docs/task-cycles/programy-ze-starych-zapisow/reports/slice-1-findings.md`); read it whole, and the reviewer's report `reports/slice-1-reviewer-report.md` for its evidence.

- Worktree: `the task's worktree`, branch `task/programy-ze-starych-zapisow`; the fix's range runs from the reviewed head `896b750993bec754de4cf5efd3596d324ab8b355`.
- Scope: the finding I1 only. Change only the test file that finding names (`tests/account-storage.test.mjs`), plus `src/server/database.ts` only if the new case shows a real defect there. Do not fix the reviewer's Minor findings M1 and M2 (they go to the review of the whole change). No change to the plan's *Change* list beyond that.
- Do first: write the case, run it against the head code (it passes) and against the three mutations the reviewer names (`OR 1 = 1` added to the `WHERE` of the reset's delete, of the move's `INSERT … SELECT` and of the privilege write; it must fail on each), and restore the code byte for byte after each mutation. Report the command and exit code of each run.
- Checks: `npm test -- tests/account-storage.test.mjs`, `npm run typecheck`, `npx prettier --check tests/account-storage.test.mjs`. Not the product's gate and not `foundation_check.py`.
- Commit with explicit `git add <paths>`; message in English in the repository's style.
- Report: write it to `docs/task-cycles/programy-ze-starych-zapisow/reports/slice-1-fix-report.md`; return status, commits, check line, report path, questions, reach, **Unread material**, **Searches not found or unclear**, and the own-work check.
