# Handoff — designer of the spec, task kopia-bazy

**Delegation.** The owner of this repository started this cycle and delegated intermediate choices to the cycle's orchestrator. You are the designer. Send questions to the orchestrator in your report; never to the human. Nothing here is the human's approval of your design.

**Worktree.** `C:\Storage\repos\loop2-wt\kopia-bazy`, branch `task/kopia-bazy`, base `95de83b98a5083c516b8fffad3237eaa64cad8d5`. Work from its root. The pinned the-way is its `.the-way`.

**Method.** Read `.the-way/task-cycle/spec/SKILL.md` whole and follow it as the designer. Read a file it names when its step comes.

**Stage and boundary.** Write the spec; no plan, no code, no commit, no foundation entry. Write nothing outside `docs/task-cycles/kopia-bazy/`. Do not touch the server: no `mikrus` tool, no ssh. Where a fact only the server holds is needed, ask.

**Files.**
- Frozen task, whole: `docs/task-cycles/kopia-bazy/task-frozen.md`
- Spec: `docs/task-cycles/kopia-bazy/spec.md`
- Report: `docs/task-cycles/kopia-bazy/reports/02-spec-design-report.md`

**The open choice.** The task's section *Questions carried to cycle*, all eleven rows, read from the frozen task. Settle each. Two more, which the same reading raises:
- how the task's To do 2 capacity sentence and H3 are met given the compression choice;
- what a human needs from the repository for H5, H2 and H3 (what is installed, from which source, in which order), since no agent changes the server (D-12).

The task's *Questions to settle*, *Settlements to record* and *Decisions in play* are settled: design inside them. Name every foundation entry the change will write or change; the writing itself comes later.

**Answers of step 4.**
- Trust boundary: yes — `src/server/**`, `deploy/**`, and the new keys. Crafted input at that boundary includes Strych's own file listing, since a retention step that deletes by a remote listing takes its names from a shared server.
- Irreversible operation: yes — deleting older backups on Strych, restoring over the server's database, changing the encryption key. The change prepares them; a human performs them.

**Read, by identifier, each whole, from `foundations/`.**
Decisions: D-01, D-05, D-09, D-10, D-11, D-12, D-13, D-15, D-16, D-17, D-49, D-73, D-79, D-84, D-103, D-104, D-111, D-112, D-114, D-137, D-163, D-205, D-209.
Invariants: loop2-deploy-trigger-input, loop2-deploy-keeps-running, loop2-host-sharing, account-save-durable-storage, account-save-sqlite-access, account-schema-lifecycle, account-startup-configuration, shellcheck-source-rules.
Environment facts: node-sqlite-database, sqlite-wal-concurrency, docker-volume-lifecycle, compose-file-secret-permissions, mikrus-host-swap, mikrus-host-docker-workloads, loop2-host-installed-command, loop2-host-forced-command-entry.
Part map: the entries `account-server`, `deployment`, `agent-workflow`, *External context*.

**Guidelines, each whole.** `guidelines/coding.md`, `guidelines/coding-database-access.md`, `guidelines/testing.md`.

**Passages of the task's sources.**
- `C:\Storage\The Brain\The Brain\Notes\Projects\(P) Loop\definicja_mvp_loop2.md`: lines 83, 110, 161–162, 641–708.
- Deployment skill: `.claude/skills/loop2-deploy/SKILL.md`, its `references/setup_and_secrets.md` and `references/troubleshooting.md`.
- Refinement conversation, where a task sentence needs its origin: `.runs/project-refinement/kopia-bazy.md` in the main checkout `C:\Storage\repos\loop2`.

**Code the choice depends on.** `compose.yaml`, `Dockerfile`, `deploy/cloudflared.Dockerfile`, `deploy/loop2-deploy`, `src/server/account-block.ts`, `src/server/database.ts`, `tests/deploy/`, `tests/agent_workflow/test_loop2_deploy_skill.py`.

**Environment.** Docker's engine does not run on this computer today; the local Node is 24.17.0.

**Return.** Your status (`questions` or `done`), a one-line check result naming what failed or did not run, and the report's path. Questions, reaches and *Searches not found or unclear* stand in the report.
