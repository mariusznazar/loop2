# Design-stage report — serwer-testowy

## Sanitized dispatch prompt

You are the fresh design agent for the-way implement-task in this task worktree. The user delegated intermediate choices to the orchestrator; ask no human directly. Read the repository's the-way implement-task adapter and pinned task-cycle skill, Superpowers 6.4.1 brainstorming, the frozen task, its approved plan and definition, foundation and relevant code. Work only in this product worktree. Classify and use architectural brainstorming to write `docs/task-cycles/serwer-testowy/spec.md`; self-review it and return before planning or implementation. Put the prompt, approaches, questions, choices, evidence and report in `docs/task-cycles/serwer-testowy/reports/design.md`. Cover deployment flow, forced-command security, isolation, rollback and future data, failures, tests and human actions. Settlement row 3 binds: the agent reads the server only and the human changes it. Human actions make the eventual request a blocked draft. Write no code or foundation, make no external changes, and put no personal server-access data in network queries. If approved sources conflict such that the outcome is impossible, return the evidence. Return paths and a summary. Do not force the design to fit an erroneous plan.

## Skill use and classification

Read the repository adapter and pinned task-cycle skill; verified the `.the-way` checkout equals gitlink `d04c3feb1a47e0ffc9a3b2354c23aacafe25c74b`. Read Superpowers 6.4.1 `brainstorming`. Classification: **architectural**. This introduces deployment automation, a trust boundary between an untrusted SSH command and host-level release authority, a Docker container and a public proxy route; no such existing flow exists in this repo. The cycle-specific the-way adapter locates the spec in the ignored cycle record and gives the orchestrator provisional intermediate approval; it does not authorize code or a final human decision.

Understanding reflected to the orchestrator: a merged `main` commit should become a Node 24 image built by the host, reachable under loop2's own HTTPS name, while the existing loop stays active. The new release path must be recoverable and explain who can change what. The task's explicit later-account boundary means no database/secret design is to be invented here. No clarification of user purpose was needed: task Need, To do and acceptance criteria supply it.

## Approaches and decision

1. **Recommended: commit-tagged image staged before replacement.** Build and check first; switch only loop2; keep a small, explicit successful-image history for `rollback N`. Adds release-state code and consumes disk, but makes failed builds harmless to the running service and failed starts recoverable.
2. **Alternative: `docker compose up -d --build` in place.** Less scripting, following the older game's shape. A start failure may already have displaced the old container and rollback needs a rebuild or an unrecorded image. This cost is material because the task explicitly asks the skill to explain N-step rollback.
3. **Excluded by approved decision: CI-built image or file upload.** Simpler host load, but it changes the approved “server pulls and builds from GitHub” path. Do not implement it without reopening the decision.

Provisional choice: approach 1. No human approval is claimed. The eventual request presents the choice and foundation entries for review.

## Questions, answers and costs

| Question | Answer and authority | Alternative / price if wrong |
|---|---|
| Where does loop2 appear and how is traffic routed? | The frozen task's accepted settlement 1 names a proxied Cloudflare AAAA, hostname-only Origin Rule and HTTPS visitor / HTTP origin route. Official Cloudflare documentation confirms destination-port override on Free, Flexible HTTP origin and per-hostname Configuration Rules. | A zone-wide Flexible change could affect other hostnames. Direct IPv6-only origin connectivity remains unverified, so the public route cannot be declared working yet. |
| Which branch deploys? | `main`, settlement 2. An older run is superseded when its SHA is no longer fetched `main` tip. | Accepting any ancestor would let a stolen key roll back to any historical release and a delayed workflow regress the deployment. Requiring tip may skip an older push, while the newer push must deploy it. |
| Who acts on the server? | Settlement 3 says agent only reads through `mikrus` MCP; human changes the host. | Acting through the root-capable MCP would violate the settlement even if the older question answer allowed freer use. The request must remain blocked until human setup and verification. |
| Where do access values live? | Settlement 4: GitHub secrets and the owner's private note. Repository files name secret identifiers; server directory and container port can be public. | Embedding host/user/SSH port/IPv6 exposes access configuration in the PR. No such value appears in spec or report. |
| What container and runtime? | Settlement 5 says Docker; D-01/1 says Node 24 and predeploy type check; D-05/2 says one Express 5 process. | Running directly on the host, adding an in-container proxy or omitting typecheck breaks binding sources. |
| How does the server bind? | Keep current local `127.0.0.1:3000` default, add explicit container `0.0.0.0:3000`, proposed host port 18080 subject to human observation. | Hard-coding `0.0.0.0` everywhere breaks current startup tests and local listening behavior; treating an unobserved host port as available could block deploy. |
| Does loop2 get a memory limit? | Start with a 512 MiB runtime container limit to bound effect on the existing loop service, then have the human inspect actual use before first switch. This is a chosen limit, not an observed minimum. | No limit allows a faulty loop2 process to compete for the whole host; too low a limit kills loop2. Build-time host memory remains a separate measured risk. |
| Where is the deploy script? | Versioned in `deploy/`, installed as a root-owned fixed copy outside `/srv/loop2` by the human. | Running the forced command directly from a mutable checkout expands its authority with each checkout. A fixed copy requires deliberate reinstallation when it changes; the skill must say so. |
| How many rollback steps? | Keep active plus two previous successful image/release-directory pairs, with N counting successful releases. | Keeping only the previous anonymous Compose image cannot promise `N=2`; keeping every image may fill the 45 GB host. Current retention is a provisional reversible operational choice to be checked against actual disk use. |
| What about future account data? | No volume now. App-image rollback never reverses database data/migrations. Task 15 must add durable storage and a compatibility/backup path. | Claiming generic rollback for data-bearing releases would conceal an incompatible schema or data-loss risk. |
| What does the current invariant check do on a Dockerfile? | `tests/invariants/test_account_server_typecheck.py::test_no_deployment_route_left_unread` fails when any deployment route appears. Extend the check through the foundation step before implementation. | Calling the existing invariant pass proof of deployment typechecking is false; it currently guards only absence of deployment files. |

## Evidence and source conflicts

- Frozen task: `docs/task-cycles/serwer-testowy/task-frozen.md`, status ready, item `serwer-testowy`, six accepted settlements and five in-cycle human-action groups.
- Plan source: approved `plan_mvp_loop2.md` item 2 depends on completed `app-skeleton`, scope item 24; projected entries table assigns deployment/location and isolation/address to item 2, shared-origin and data concerns to later tasks. Its change log records the human-approved move of mail/session/Argon2 to task 15 and backup to task 17.
- Definition source: approved `definicja_mvp_loop2.md`, deployment and deploy-branch projected decisions. Some older open-question labels still say “resolved in task: serwer testowy” for mail/session/Argon2/backup. Following those labels would expand the frozen task against the plan and explicit out-of-scope section; the spec flags this instead.
- Foundation: `foundations/decisions.md` D-01/1 and D-05/2; `foundations/invariants.md` named runtime/typecheck/serving/occupied-address invariants; `foundations/part_map.md` account-server and build-tools. Their current failure modes are `none`, so new deploy trust boundary and unknown host failure modes require reassessment.
- Code: `src/server/main.ts` hard-codes loopback:3000; `src/server/app.ts` serves `dist/public` and `/api` JSON errors; `package.json` and `scripts/build.mjs` use Node 24 and compile both TypeScript configs; `tests/startup.test.mjs` and invariant tests depend on default loopback:3000.
- Cloudflare official docs read without owner access values: [Origin Rules](https://developers.cloudflare.com/rules/origin-rules/), [SSL/TLS modes](https://developers.cloudflare.com/ssl/origin-configuration/ssl-modes/), [Flexible](https://developers.cloudflare.com/ssl/origin-configuration/ssl-modes/flexible/). Documentation supports mechanism, not reachability of this specific IPv6-only origin.
- Prior game's deployment note was read for pattern only. Its concrete server-access values were excluded from this report and spec. No server or Cloudflare observation was performed; no callable `mikrus` tool was available to this design agent.

## Spec self-review

- Placeholder scan: no open `TODO`/`TBD`. Live observations are named explicitly as pending human checks, with failure handling.
- Internal consistency: only `main` tip can be deployed through the automation key; human rollback is a separate local mode; one Node process serves HTTP; HTTP origin is temporary until task 15.
- Scope: no accounts, session, mail, database or backup implementation. Skill documentation and foundation entries are inside this task.
- Ambiguity: `rollback N` counts successful releases, not commits; only the loop2 service is switched; a failed first deployment has no prior image. Port 18080 is a proposal requiring host check, not an observed fact.

Result: wrote `docs/task-cycles/serwer-testowy/spec.md`. Boundary reached: return before the independent spec review, planning, foundation editing or implementation.
