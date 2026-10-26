# Spec review handoff

Worktree: C:/Storage/repos/loop2/.runs/worktrees/szyfrowana-droga-do-serwera
Base: 7b3d450c143492fa93efbb5e53705e32838622af. Process pin: 2895e0e7860ec1f48ddc7dacd15ef6b26e731c5c.
Read .agents/skills/the-way-write-spec/SKILL.md and the complete referenced method and review requirements. You are a fresh reviewer, not the designer. User delegated intermediate review to implement-task; return findings to orchestrator, no human approval step. Do not read cycle.md or change spec/product files.

Read whole .runs/task-cycles/szyfrowana-droga-do-serwera/task-frozen.md, spec.md, reports/01-designer.md. For foundation and guideline selection, read the exact selection under 'Parts' and 'Read whole' in reports/01-designer-handoff.md; read entries and files themselves, not only that list. Whole frozen task, guidelines/coding.md and guidelines/testing.md required. Inspect implementation where necessary to check feasibility. Review task/spec coverage including all settlement rows and human-action sequencing. Task 2 delivery and plan/definition preconditions were verified by orchestrator; details in first handoff.

Trust boundary YES: deploy/**. Security-sensitive external changes are human-only, all five task actions prepared at blocked draft request. No server/Cloudflare mutation. No changed UI. Review both technical design and instructions in separate reading passes, so documentation gets attention alongside code.

Supplement to full review scope: does the designed local readiness actually detect an unavailable tunnel; does failure before switch leave both existing services available; does rollback across the route change use correct script revision and DNS/rules; do token permissions work for the selected official image without exposing the value; does image cleanup preserve shared-host boundaries? These are questions, not asserted defects.

Public source privacy: never send owner identity/email, local paths or access values to public search; use public primary sources without logged-in external-repository fallback. Docker image was pulled locally by orchestrator; exact evidence is in designer report/spec. No real token available, so authenticated connection and public switch remain human acceptance checks.

Write full report to .runs/task-cycles/szyfrowana-droga-do-serwera/reports/02-spec-review.md. Return PASS or FAIL, report path, check commands and exit codes (or explicit no executable check), concerns/reaches. Return at your stage boundary, no product edits or next dispatch.

Reading expansion from designer: build-tools part entry; D-01 whole; tests/invariants/test_account_server_runtime.py and test_account_server_typecheck.py. Their Node/typecheck requirements apply to the app, and new connector role must not become a broad exemption. Existing coding/testing guidelines cover both parts.
