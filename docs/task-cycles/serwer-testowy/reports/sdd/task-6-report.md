# Slice 6 report - deployment skill

Commit c9c85c2 "feat: add the loop2-deploy skill with its static test".

Files: .claude/skills/loop2-deploy/{SKILL.md,references/setup_and_secrets.md,references/troubleshooting.md},
identical copies under .agents/skills/loop2-deploy/, tests/agent_workflow/test_loop2_deploy_skill.py.

TDD: RED - first run of tests/agent_workflow before the skill existed: 6 tests, 1 failure + 5 errors.
GREEN - after the skill: `python -B .the-way/gate/run_tests.py tests/agent_workflow` 5 tests OK
(a sixth, a no-CR check, was dropped because a CRLF checkout would fail it). tests/deploy still 63 OK.

Read from files: exit codes 2-8, thresholds, lock/log paths, restore line, installed-script warning
(deploy/loop2-deploy); secret names, LOOP2_PUBLIC_URL / OLD_GAME_URL (deploy.yml); port 18080, mem 512m,
revision label (compose.yaml, Dockerfile). All six settled interfaces from the dispatch are stated.

Choices made: the memory limit is given as 536870912 (512 MiB); the `mikrus` MCP's `exec` tool is named
as the means of read commands; troubleshooting adds `docker builder prune` (build cache only) as the human
cache reclaim; "exit 255 / no stage line" row added for SSH-level failures.
Not run: nothing against any server. Reviewer-read items (topic coverage, match to script) are unchecked by command.
Git warned of LF-to-CRLF on the new files (no .gitattributes rule covers them); copies are byte-identical.

## Fix round 1
- troubleshooting.md: `docker builder prune` removed; now `docker system df` plus the human's decision with its effect (empties the build cache of every project on the host, old game's included; running containers unaffected).
- Exit-8 log claim now matches the script: container's last 50 lines are logged only when the start did not become healthy; after a failed probe only `docker compose -p loop2 logs` has them (SKILL.md, troubleshooting.md).
- Read-only commands: `git log` and `--no-optional-locks status`; the MCP's changing tools (upload, porty, domains, state-changing exec) named as the human's.
- Actions-log sentence clarified; unreadable-installed-script warning covered in troubleshooting.md.
- tests/agent_workflow: 5 OK; copies identical.

## Fix round 2 (return step)
- C7: SKILL.md read command now `docker inspect --type container --format ...`.
- C6: SKILL.md says the server is shared and the old game and any other workload stay untouched.
- W3: SKILL.md and setup_and_secrets.md action 5 add the enforced limit (cgroup `memory.max` or the limit column of `docker stats --no-stream loop2`) beside `HostConfig.Memory`.
- P7: README.md gains one Polish line naming the two deployment test commands (CRLF kept).
- tests/agent_workflow 5 OK; npm test 11 pass, 0 fail. Copies identical.
