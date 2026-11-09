# Handoff 01 — designer of the spec

You are the designer for the task cycle `skad-wiem-o-awarii` (task: where the owner learns that the running game of loop2 failed, and how long its logs live).

## Delegation and place

- The person who requested this cycle (the product's owner) has delegated intermediate choices to the cycle's orchestrator, who answers your questions from the task, its sources, the foundation and the code. Nothing you receive is the owner's approval.
- Work from the worktree root `the root of the repository` (branch `task/skad-wiem-o-awarii`, base `00aa818e59ab484358970f98af1f4ab61e969e4c`, pin `.the-way` at `294af7fde45323ac1851c014a03071a97fc38d96`). Write only `spec.md` and your report; change no tracked file.
- Method of your stage: `.the-way/task-cycle/spec/SKILL.md` (project skill `the-way-write-spec`). Your variant: the designer writing the spec. Read that `SKILL.md` whole, and `design.md` beside it when its step comes; read no other file of the method at the start.
- Write the spec to `.runs/task-cycles/skad-wiem-o-awarii/spec.md`. Write your full report to `.runs/task-cycles/skad-wiem-o-awarii/reports/01-designer-report.md`.

## Inputs

- Frozen task (read whole): `.runs/task-cycles/skad-wiem-o-awarii/task.md`. Its *Questions to settle* hold two settled answers (Answer, Not chosen, Based on, Lacks, Risks taken) and its *Settlements to record* hold 8 accepted rows. The cycle's foundation entries are written later by the foundation step; your spec may name them.
- Technology reports the task cites, outside the product repository (read the parts you need; they hold, for each *Risk taken*, a cheap safeguard): `the technology report `skad-wlasciciel-dowiaduje-sie-ze-gra-padla` (kept outside the repository)` and `the technology report `dokad-trafia-zapis-gry-i-jak-dlugo-zyje` (kept outside the repository)`, sections „Rekomendacja i ryzyka”. They are sources, not authority: where they disagree with the task document, the task document governs.
- Foundation entries by identifier, each whole (decisions in `foundations/decisions.md`, invariants in `foundations/invariants.md`, facts in `foundations/environment_facts.md`): decisions D-252, D-253, D-347, D-233, D-104, D-102, D-12, D-13, D-17, D-09, D-15, D-137, D-110, D-235; invariants `loop2-host-sharing`, `account-mutation-request-guards`, `account-client-requests`, `loop2-api-error-route`, `account-save-backup-failure-notice`, `loop2-deploy-keeps-running`, `loop2-deploy-trigger-input`; environment facts `mikrus-pusher-mail`, `mikrus-host-docker-workloads`. Parts touched, from `foundations/part_map.md`: deployment, account-server, browser-view, agent-workflow, build-tools (tests). The glossary entries of the terms you use.
- Guideline files whole: `guidelines/coding.md`, `guidelines/coding-http-application.md`, `guidelines/coding-browser-api-client.md`, `guidelines/testing.md`.
- Skill the change updates: `.claude/skills/loop2-deploy/SKILL.md`.
- Code the choice depends on (read to design): `src/server/log-line.ts`, `src/server/account-block.ts`, `src/server/` route setup, `src/browser/` last-chance handler and API client, `deploy/loop2-deploy`, `deploy/loop2-backup`, `deploy/loop2-backup.cron`, `compose.yaml`, `.github/workflows/deploy.yml`, `tests/invariants/test_account_server_typecheck.py` (line ~299 counts files in `.github/workflows/`), `tests/deploy/`.
- Forbidden for every agent of this cycle (the owner's instruction in the task): do not look into `the earlier 10x checkout of the repository`, into branches `10x/*` or tags `archive/10x-*` of the repository, into the vault folder `Notes/Projects/(P) Przejście 10xDEVS/`, or into session records under `the session records of the earlier 10x checkout` and `the session records of the author's notes vault`. The game's state is established from the repository on `main`.

## Answers of step 4 you must honour

- Trust boundary: yes (`src/server/**`, `deploy/**`). The spec names, for each new input path (the report route, the watcher's reading of container logs, the dumped log file), the crafted input the design refuses and where.
- Irreversible operation: none performed by the cycle. The installations on the server and the GitHub notification setting are human actions the cycle only prepares; the spec says, for each, what the repository holds so that the human can do it and check it.
- Open design choice found (the choice you settle): (1) contract of the browser-report route: path, body fields and their pattern, the guards of D-104 (Origin, JSON, size), whether the route needs a session and where `accountId` comes from, since a failure may strike before sign-in, its own limit of requests, the line it writes as a failure line; (2) the watcher: what it reads, how it skips the window of a deployment and stays out of the deploy lock, how it throttles messages and keeps its state, what its own log holds, what the fixed text of its `pusher` call is; (3) the dump of the log into `/var/log/loop2-app.log` (form, error handling, the `account-block` line writing without the sentences that carry an email address, the logrotate file); (4) the shape of the scheduled GitHub Actions workflow against the test that counts every file in `.github/workflows/` as a deployment way, and the part-map line for the new file; (5) the precise additions to the `loop2-deploy` skill and its allowed reads.
- Not open (settled by the task; do not reopen): the three ways of notification, the dump into `/var/log/loop2-app.log` rotated by logrotate, the driver `local` in `compose.yaml`, D-347 changed as the task's row 3 says.

## What the spec must make possible

The planner or one author makes the change from your spec without a design question left; the spec stands inside the task's scope and widens nothing. Say where the cycle's foundation entries (the 8 rows of *Settlements to record*) get their wording from your decisions, without writing them.

## Return

Status (`questions`, `done` or `reserved`), the spec path, your report path, and **Searches not found or unclear** in the report, as your method gives.
