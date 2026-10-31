# Handoff — reviewer of the spec, task kopia-bazy

**Delegation.** The owner of this repository started this cycle and delegated intermediate choices to the cycle's orchestrator. You review a spec you did not write. Your questions go to the orchestrator in your report; never to the human.

**Worktree.** `C:\Storage\repos\loop2-wt\kopia-bazy`, branch `task/kopia-bazy`, base `95de83b98a5083c516b8fffad3237eaa64cad8d5`. Work from its root. The pinned the-way is its `.the-way`.

**Method.** Read `.the-way/task-cycle/spec/SKILL.md` whole and follow it as the reviewer. Read a file it names when its step comes.

**Stage and boundary.** Review only: no change to the spec, no code, no commit, no foundation entry. Write only your report. Do not touch the server: no `mikrus` tool, no ssh.

**Files.**
- Frozen task, whole: `docs/task-cycles/kopia-bazy/task-frozen.md`
- Spec: `docs/task-cycles/kopia-bazy/spec.md`
- The designer's report, for its *Readings to check* and *Searches not found or unclear*: `docs/task-cycles/kopia-bazy/reports/02-spec-design-report.md`
- The designer's probes: `docs/task-cycles/kopia-bazy/design-probe/`
- Your report: `docs/task-cycles/kopia-bazy/reports/04-spec-review-report.md`

**The choice the spec had to settle.** The eleven rows of the task's *Questions carried to cycle*, and two more: how the task's To do 2 capacity sentence and H3 are met given the compression choice; what a human needs from the repository for H5, H2 and H3, since no agent changes the server (D-12). The task's *Questions to settle*, *Settlements to record* and *Decisions in play* were settled before the spec.

**Answers of step 4.**
- Trust boundary: yes — `src/server/**`, `deploy/**`, and the new keys. Crafted input at that boundary includes Strych's own file listing.
- Irreversible operation: yes — deleting older backups on Strych, restoring over the server's database, changing the encryption key. The change prepares them; a human performs them.

**Read, by identifier, each whole, from `foundations/`.**
Decisions: D-01, D-05, D-09, D-10, D-11, D-12, D-13, D-15, D-16, D-17, D-49, D-73, D-79, D-84, D-103, D-104, D-111, D-112, D-114, D-137, D-163, D-205, D-209.
Invariants: loop2-deploy-trigger-input, loop2-deploy-keeps-running, loop2-host-sharing, account-save-durable-storage, account-save-sqlite-access, account-schema-lifecycle, account-startup-configuration, shellcheck-source-rules.
Environment facts: node-sqlite-database, sqlite-wal-concurrency, docker-volume-lifecycle, compose-file-secret-permissions, mikrus-host-swap, mikrus-host-docker-workloads, loop2-host-installed-command, loop2-host-forced-command-entry.
Part map: the entries `account-server`, `deployment`, `agent-workflow`, `build-tools`, *External context*.

**Guidelines, each whole.** `guidelines/coding.md`, `guidelines/coding-database-access.md`, `guidelines/testing.md`.

**Passages of the task's sources.**
- `C:\Storage\The Brain\The Brain\Notes\Projects\(P) Loop\definicja_mvp_loop2.md`: lines 83, 110, 161–162, 641–708.
- `.claude/skills/loop2-deploy/SKILL.md`, its `references/setup_and_secrets.md` and `references/troubleshooting.md`.

**Code.** As far as the spec's claims about it need: `compose.yaml`, `Dockerfile`, `deploy/loop2-deploy`, `src/server/account-block.ts`, `src/server/database.ts`, `tests/deploy/`, `tests/invariants/test_loop2_host_sharing.py`.

**Return.** `PASS` or `FAIL`, a one-line check result naming what failed or did not run, and the report's path. Findings, reaches and *Searches not found or unclear* stand in the report.
