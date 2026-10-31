# Handoff — planner, task kopia-bazy

**Delegation.** The owner of this repository started this cycle and delegated intermediate choices to the cycle's orchestrator. You are the planner. Questions go to the orchestrator in your report; never to the human. Nothing here is the human's approval.

**Worktree.** `C:\Storage\repos\loop2-wt\kopia-bazy`, branch `task/kopia-bazy`, base `95de83b98a5083c516b8fffad3237eaa64cad8d5`. Work from its root. The pinned the-way is its `.the-way`.

**Method.** Read `.the-way/task-cycle/plan/SKILL.md` whole and follow it. Read a file it names when its step comes.

**Stage and boundary.** Divide the change into slices. No code, no commit, no foundation entry. Write nothing outside `docs/task-cycles/kopia-bazy/`. Do not touch the server.

**Files.**
- Frozen task, whole: `docs/task-cycles/kopia-bazy/task-frozen.md`
- Reviewed spec, whole, its *Decisions* included: `docs/task-cycles/kopia-bazy/spec.md`
- Plan: `docs/task-cycles/kopia-bazy/plan.md`
- Size report: `docs/task-cycles/kopia-bazy/plan-size.md`
- Report: `docs/task-cycles/kopia-bazy/reports/10-plan-report.md`

**Answers of step 4.**
- Trust boundary: yes — `src/server/**`, `deploy/**`, and the new keys. A slice touching those files is marked so.
- Irreversible operation: yes — replacing older backups on Strych, restoring over the server's database, changing the encryption key. The change only prepares them; a human performs them. A slice holding one is marked so.

**What the cycle has found.**
- The base passes the gate: exit 0, 898 Node tests, 315 Python tests, foundation check 0 errors, nothing skipped, Docker's engine 29.7.2 answering. A fresh worktree needs `.runs/quality-venv` (README lines 28-31); this worktree has it.
- *Foundation entries* in the spec lists what the change writes. The projected entries stand whole; of a row of *Settlements to record*, the meaning is the row's and the wording the writer's. `account-save-backup` is recorded with *Violated: yes*.
- H5, H2 and H3 are the human's and stand in no slice. Clearing the *Violated* mark comes after them, by a later commit outside this plan.
- `guidelines/testing.md` changes through `the-way-maintain-testing-guidelines`, and its meaning needs the human's approval (WAY-172), which the request carries.
- Task-specific order: To do 6, the release check, stands apart from the backup except for the one `AccountDatabase` method both use.

**Read, by identifier, each whole, from `foundations/`.**
Decisions: D-01, D-05, D-10, D-12, D-13, D-15, D-16, D-17, D-73, D-79, D-84, D-112, D-114, D-137, D-163, D-205.
Invariants: loop2-deploy-trigger-input, loop2-deploy-keeps-running, loop2-host-sharing, account-save-durable-storage, account-save-sqlite-access, account-schema-lifecycle, shellcheck-source-rules.
Part map: `account-server`, `deployment`, `build-tools`, `agent-workflow`, `product-foundation`, *External context*.

**Guidelines, each whole.** `guidelines/coding.md`, `guidelines/coding-database-access.md`, `guidelines/testing.md`.

**Code,** as far as the slices need: `compose.yaml`, `Dockerfile`, `deploy/loop2-deploy`, `src/server/account-block.ts`, `src/server/database.ts`, `tests/deploy/`, `tests/agent_workflow/test_loop2_deploy_skill.py`, `tests/quality/test_quality_invariants.py`, `scripts/measure-passwords.mjs`, `.claude/skills/loop2-deploy/`, `.agents/skills/loop2-deploy/`.

**Return.** Your status, a one-line check result naming what failed or did not run, and the report's path.
