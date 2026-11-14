# Handoff — the review of the reconciliation with the target branch, `review-change`

## What is reviewed

- The merge of the remote target branch into the task branch: the merge commit `16fe0f5a`
  (`16fe0f5ac047eb25edbb3cbe5a2ee86ec90cc4f8`), first parent `32629e02` (the reviewed head of the task
  branch), second parent `2c477e4a` (`origin/main`, the merge of pull request #128, one commit
  `605226cd`, `README.md`, +6 lines). The range to review is `32629e02..16fe0f5a`.
- Worktree `the repository root`, read-only. You may not run any test, no
  whole gate and no focused test: the orchestrator's whole gate runs on this tree at the same time, and
  your run would disturb its timing. A check you need and cannot run is named in your report as not run.
- Method: `.the-way/task-cycle/review/SKILL.md`, the variant of the reconciliation with the target
  branch, which is not the review of the whole change; read it whole and follow it for this dispatch.
- Report path: `.runs/task-cycles/krotsza-bramka-procesu/reports/review-merge-report.md`. Your
  directory for working copies: `.runs/review-merge/`, under the rules of the earlier reviewers (a copy
  made there, removed before you return, named in your report).

## What the cycle asks

The question is whether the two sides still hold together: the task branch (the pin move, the decisions
D-405 and D-406, `--jobs 1` in `scripts/test.py` and its test, and the line of `README.md` that gives
the Python runner `--jobs 1`) and the six lines the target branch added to `README.md`.

- The merge brought in no foundation entry: the target branch's only change is `README.md`. The
  entries of the parts the change touches that bear on this are `build-tools` (`README.md` is a file of
  that part) and the decision D-406 that the README line states.
- The task: `.runs/task-cycles/krotsza-bramka-procesu/task.md` (the frozen task). The earlier reviews
  are `reports/review-whole-report.md` and `reports/review-fix-report.md`; they judged the tree
  without the target branch's six lines.
- Check: the merge is clean and changes nothing else than those six lines against `32629e02`
  (`git diff 32629e02..16fe0f5a`); the README still describes the gate as the task branch makes it
  (`--jobs 1`, the directories one after another); the added section contradicts no entry of the
  foundation and no rule of the invariants of private paths (`tracked-file-private-paths` and its
  siblings, whose tests the gate runs).
