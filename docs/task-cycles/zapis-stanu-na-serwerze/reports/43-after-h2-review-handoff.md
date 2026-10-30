# Handoff — reviewer of the work after H2, task `zapis-stanu-na-serwerze`

## Delegation and stage

The person who requested this cycle (the product's owner) delegated the cycle's intermediate
choices to the orchestrator of `implement-task`. You are a fresh **reviewer** that made none of the
change. Read-only: change no file other than your report. Questions go to the orchestrator, never
to the human.

- Worktree (work from its root): `C:\Storage\repos\loop2-wt\zapis-stanu-na-serwerze`, branch
  `task/zapis-stanu-na-serwerze`. Process pin `.the-way` at `a8dfe8a`.
- Method: `.the-way/task-cycle/review/SKILL.md` — read it whole; you review a later change to the
  open request #43.
- Range: `bd02985..df5b31f` — `e95a8b1` (the violated mark of `account-save-durable-storage`
  removed, `foundations/invariants.md`) and `df5b31f` (the docstring of
  `tests/deploy/test_account_storage.py` corrected to match).
- The work it makes: the frozen task's To do 14 (`.runs/task-cycles/zapis-stanu-na-serwerze/task.md`,
  line 32) and the plan's § Work after H2 (`.runs/task-cycles/zapis-stanu-na-serwerze/plan.md`).
- The agent's handoff and report: `.runs/task-cycles/zapis-stanu-na-serwerze/reports/42-violated-mark-handoff.md`
  (it holds the evidence of H1 and H2 the orchestrator recorded), `.runs/task-cycles/zapis-stanu-na-serwerze/reports/42-violated-mark-report.md`.
- Read the invariant whole, the decisions it derives from (D-17, D-205) and the environment fact it
  rests on (`docker-volume-lifecycle`), and the element's rules for a *Violated* mark in
  `.the-way` as the record-invariant skill names them.
- Report path: `.runs/task-cycles/zapis-stanu-na-serwerze/reports/43-after-h2-review-report.md`,
  first line `PASS <sha>` or `FAIL <sha>`.
- Do not run the whole gate; run `python -B .the-way/elements/common/foundation_check.py` and
  `npm test -- tests/deploy/test_account_storage.py` if you need them. Touch no server.

## Answers of step 4

- Trust boundary: **yes** for the cycle; this range touches none (a foundation line and a test
  docstring).
- Irreversible operation: **yes** for the cycle — the schema step 4, which the human has now run
  on the test server (H1); this range only records what H2 showed.

## Return

Return the report's first line, the report path, a one-line check result and one line per
Critical or Important finding.
