# Handoff — review of the whole change: Testy loop2 bez stałego portu 3000 i przepięcie the way

## Delegation and boundary

The person who requested this cycle delegated intermediate choices to the cycle's orchestrator. You
review, as an agent that made none of it, the **whole change** of a the-way task cycle with the
project skill `the-way-review-change` (read its SKILL.md under the worktree's
`.claude/skills/the-way-review-change/` and what it names, whole). Read-only: change no file, make
no commit, push nothing, ask the human nothing; a question goes back to the orchestrator as the
report's first line `questions`. You alone grade and scope findings.

- Worktree: `C:\Storage\repos\loop2-wt\testy-bez-portu-3000` (branch `task/testy-bez-portu-3000`)
- Range: `db3253c826d6b20a349e7b175fd30d0910051c15..ee6a941` (base = `main`; commits `b54869d` pin
  move, `254eec5` tests on a free port, `ee6a941` default-address test and foundation entries)
- Frozen task: `.runs/task-cycles/testy-bez-portu-3000/task.md` — read it **whole**
- Route: one author without a plan; no spec, no plan, no slices. Every item of the task, every row
  of *Settlements to record* (rows 1 and 2) is judged by this review.
- Author's report: `.runs/task-cycles/testy-bez-portu-3000/reports/01-author-report.md` (with its
  logs `reports/01-author-*.log` and the worktree's `.runs/*.log` it cites)
- Report path: `.runs/task-cycles/testy-bez-portu-3000/reports/02-review.md`; its first line is
  `PASS <sha>`, `FAIL <sha>` or `questions`.

## Answers of step 4

- Trust boundary: no — no file the part map names as a trust boundary is in the range
  (`src/server/**` unchanged). Should you find one, say so.
- Irreversible operation: no.

## Selection

You select your own foundation entries and guidelines by the parts of the change, as
"Reading the foundation" in `.the-way/elements/common/way_of_working.md` and
`.the-way/product-guidelines/reading.md` give it. The task's *Decisions in play* is D-05.

## What the orchestrator knows about the machine

`tests/invariants/test_loop2_one_serving_process.py` errors in setUpClass on the base `db3253c` as
well: on this machine `Get-NetTCPConnection -State Listen` and the CIM class
`MSFT_NetTCPConnection` return no objects while `netstat -ano -p tcp` lists listeners
(`reports/00-base-one-process-rerun.log`). The `npm test` chain therefore exits 1 before and after
the change, and does not reach `foundation_check.py`. Base records: `reports/00-base-*.log`.

## Return

Write the full report to the report path as `review-change` gives it, and return its first line,
the one-line check result naming what failed or did not run, and the report's path.
