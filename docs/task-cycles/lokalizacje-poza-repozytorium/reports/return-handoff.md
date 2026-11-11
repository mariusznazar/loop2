# Handoff — the return step

You take the return step of this task's cycle, as the one author resumed (class `same`). It did not
run before: the request was blocked by a finding. That finding is now closed and reviewed (review of
the correction: `reports/review-correction-report.md`, `PASS b58ce12`), so the step runs on the
code the review accepted. The person who requested this cycle has delegated intermediate choices to
the orchestrator; nothing here is that person's approval.

- Worktree (work only here, from its root): the task's worktree, branch `task/lokalizacje-poza-repozytorium`.
- Method: `.the-way/task-cycle/skill/return_step.md` — read it whole; it writes as the foundation step writes, so also read `.the-way/task-cycle/skill/foundation_step.md` whole, and the skill of an element when you write an entry of that element. This is no row of `make-change`'s table: your stage is "the return step".
- Range of the task's change: base `211a4ea556d48f5da98fc08380b3c061b9365709` to head `b58ce12e65b68583f0a4aa5e054dfd551850ddfe` (the pin moved to `52f8164a354ee1a704af0d58add2f3be8e4f0247` in `8c7fe66`; the commits `89b2fb4` and `5317955` only add and remove the record's copy and leave the tree as it was).
- Frozen task (whole): `.runs/task-cycles/lokalizacje-poza-repozytorium/task.frozen.md`.
- Your report: `.runs/task-cycles/lokalizacje-poza-repozytorium/reports/return-report.md`.

## What you compare

The entries the change writes or changes (decision D-362, the invariant `tracked-file-private-paths`,
D-82 and the source line of `action-duration-minimum`), the decision the task names (D-82), the
entries the search of the foundation finds on places outside the repository, disk paths and the
check of tracked files, and the part map of the touched parts (`agent-workflow`, `product-foundation`;
the test lives in `tests/agent_workflow/`), each against the code as it stands at the head. Include
what the new pin changes: the invariant now reads `Violated: no` and its test passes as a plain test.
The two rows of *Settlements to record* are written (D-362 and the invariant); say in the report
whether each row's meaning holds in the code and the foundation at the head.

Known facts to use, not to re-derive: the pinned command exits 0 with 0 listed on the head; the
test `tests/agent_workflow/test_tracked_file_private_paths.py` passes; `foundation_check.py` exits 0
with 0 errors. One open point is no task of yours: *Rests on* of `cross-part-imports` reads `TODO — …`
because the new pin demands a fact after a bare TODO and none is named; **do not invent the fact**,
and do not change that entry.

## Rules

- No new entry unless the step's rules call for one; write a correction only where an entry no longer matches the code, through the project skills (`the-way-record-decision`, `the-way-record-invariant`, `the-way-update-part-map`, `the-way-record-glossary-term`, `the-way-record-environment-fact`).
- Commit by path, in English, the style of `git log`; no `git add -A`. Do not run `npm test`; the orchestrator runs the gate. Where you commit nothing, say so in the report.
- Never put a value of `~/.the-way/locations.json` in a file or a report.

## What you return

The report at the path above in the form `return_step.md` gives, with **Unread material**,
**Searches not found or unclear** and the own-work check; in your return message the status, the
commits (or none), a one-line check result and the report's path.
