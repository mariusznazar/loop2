# Design handoff

Worktree: C:/Storage/repos/loop2/.runs/worktrees/szyfrowana-droga-do-serwera
Base: 7b3d450c143492fa93efbb5e53705e32838622af, target origin/main; branch task/szyfrowana-droga-do-serwera.
Pinned process: 2895e0e7860ec1f48ddc7dacd15ef6b26e731c5c.
Read .agents/skills/the-way-write-spec/SKILL.md and its entire referenced method and required files. Stage: designer, return before code or foundation edits. The user invoked implement-task and delegated intermediate choices to orchestrator; ask me, not the human. Do not read cycle.md.

Read whole .runs/task-cycles/szyfrowana-droga-do-serwera/task-frozen.md (approved 2026-10-26), and guidelines/coding.md and guidelines/testing.md. Source path is in the frozen task context; plan item 22 is ready, definition approved 2026-10-26 fingerprint 7692b28a, plan handed over and rechecked 2026-10-26. Dependency task 2 delivered in merged PR 11: deployment run 38453849189 succeeded at d2b4687320e7b0e89306e9e5530bfc824a90627f, matching running revision, public root/API, old game and container limit verified. Current base adds task 5 unrelated to this route; deployment sources unchanged from refinement.

Parts: deployment, agent-workflow, product-foundation. Read their part-map entries; decisions D-05, D-08 through D-17, D-28, D-30 through D-32, D-38, D-46, D-49, D-73 through D-85, D-87 through D-89 whole. Read invariants account-server-runtime, account-server-typecheck, account-server-express-http, browser-view-framework, loop2-api-error-route, loop2-one-serving-process, loop2-container-isolation, loop2-distinct-address, loop2-deploy-trigger-input, loop2-deploy-keeps-running, loop2-host-sharing, ruff-source-rules, shellcheck-source-rules, prettier-source-format, node-test-selection. Linked deployment facts: cloudflare-origin-rules, cloudflare-configuration-rules, cloudflare-test-origin-ipv6, openssh-authorized-keys-options, loop2-host-forced-command-entry, loop2-host-installed-command, mikrus-host-docker-workloads, mikrus-host-swap. Read relevant glossary entries (product and pinned process).

Trust boundary YES: deploy/**; crafted inputs and failure-before-switch protection need reviews. Security-sensitive external actions YES: all five task Human actions belong to the human at blocked draft PR; no server/Cloudflare mutations. No irreversible repository operation required. No UI change.

Open design choices: token delivery and permissions (env_file versus token-file), probe with no published app port, exact pinned image and tunnel readiness, limit and transport choice. These bind foundation and operations, so write a spec. Keep implementation narrowly within task, including all three settlement rows and both deploy skill copies. No planning yet; propose coherent choices with costs and sources. If source requirement is inconsistent, report rather than distort implementation.

Evidence: orchestrator read host through authorized mikrus MCP `free -m` on 2026-10-26: total 4352 MiB, available 3707 MiB, swap 0. Task Q7 gives TCP/IPv4 port 7844 evidence only; do not claim UDP/container connectivity. No need to repeat server reads. Verify public technical claims against primary sources with web tools. Never send owner identity, email, local paths or access values to public-source searches; no authenticated gh fallback for external public research. No secrets or server access values in artifacts.

Read both deploy skill references. Before proposing edits to skills the author must read vault skill conventions; you may inspect them read-only if relevant. Local Docker/testing capability is being prepared by orchestrator.

Output spec: .runs/task-cycles/szyfrowana-droga-do-serwera/spec.md
Full report: .runs/task-cycles/szyfrowana-droga-do-serwera/reports/01-designer.md
Return questions or done, report/spec paths, checks with command and exit code if executed, concerns and any reach beyond reading selection. Do not commit product code or start next stage.
