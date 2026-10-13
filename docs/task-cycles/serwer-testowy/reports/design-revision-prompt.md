# Dispatch — design revision (serwer-testowy)

You are a fresh design agent in a the-way task cycle for the product repository at
`C:/Storage/repos/loop2-serwer-testowy` (git worktree, branch `task/serwer-testowy`). The user
delegated every intermediate choice of this cycle to the orchestrator; you send questions to the
orchestrator (return them in your report), never to the human, and you never seek human approval.

## Your stage and boundary

Use Superpowers `brainstorming` (installed version 6.4.1 at
`C:/Users/Mariusz/.claude/plugins/cache/claude-plugins-official/superpowers/6.4.1/skills/brainstorming/SKILL.md`;
read it and its linked files). The task was classified as architectural: follow its written-spec
path. Your job is to **revise the existing spec** after an independent review found five blocking
issues. Your boundary is the self-reviewed revised spec: stop before the skill hands on to writing a
plan. Write no plan, no code, no test, no foundation entry. Do not change anything on any server,
in Cloudflare or on GitHub.

Write boundary: only these two files —
- `C:/Storage/repos/loop2-serwer-testowy/docs/task-cycles/serwer-testowy/spec.md` (rewrite in place)
- `C:/Storage/repos/loop2-serwer-testowy/docs/task-cycles/serwer-testowy/reports/design-revision.md`
  (your full report: what changed and why, any questions for the orchestrator, self-review result)

## Read

- Frozen task: `docs/task-cycles/serwer-testowy/task-frozen.md` (binding; Polish).
- Current spec: `docs/task-cycles/serwer-testowy/spec.md`; the first design report
  `reports/design.md`; the independent review `reports/spec-review.md`.
- Approved sources: `C:/Storage/The Brain/The Brain/Notes/Projects/(P) Loop/definicja_mvp_loop2.md`
  — § Projected foundation changes: "Where does the MVP run?", "What serves the built game and
  account requests in the container?", "How does a change reach the server?", invariants
  `loop2-container-isolation/1`, `loop2-distinct-address/1`, `loop2-one-serving-process/1`;
  § Gate record. The plan item: `plan_mvp_loop2.md` row 2 and its Projected entries table.
- Pattern only (never copy values; it contains a server name and SSH port that must not reach the
  repository): `C:/Storage/The Brain/The Brain/Notes/Projects/(P) Loop/wdrozenie_na_mikrusie.md`.
- The product: `AGENTS.md`, `foundations/*.md`, `src/server/*.ts`, `package.json`,
  `scripts/build.mjs`, `tests/startup.test.mjs`, `tests/invariants/loop2_invariant_support.py`,
  `tests/invariants/test_account_server_typecheck.py`, `tests/invariants/test_account_server_runtime.py`,
  `tests/invariants/test_loop2_one_serving_process.py`.
- Binding the-way rules (in `.the-way/foundations/decisions.md`): WAY-13, WAY-126, WAY-134,
  WAY-135, WAY-140, WAY-69, WAY-48.

## Server state (read by the orchestrator through the `mikrus` MCP, access values omitted)

4352 MiB RAM, about 3700 MiB available, no swap; 1 CPU; root filesystem 44 GB with 22 GB free;
Docker 28.1.1 and Compose v2.35.1; git 2.34.1; flock present. Running containers: `loop` (the old
game, healthy, about 56 MiB) and `foundryvtt` (another workload, healthy, about 100 MiB); each
publishes one of the two public IPv4 ports. Docker build cache holds 6.3 GB. `/srv` holds only
`loop`. Listening host ports: the DNS stub, SSH and the two published ports. Port 18080 is free.
The deployment must leave both `loop` and `foundryvtt` untouched (no host-wide prune, no
`down`, no touching other Compose projects).

## Orchestrator rulings on the review findings (binding for this revision)

**F1 — map every settlement and projected entry to its foundation entry.** Add a section
"Foundation entries" to the spec with this mapping (the foundation step writes them; you name them
and their meaning, you do not write their final wording):

| Source | Entry |
|---|---|
| projected decision "Where does the MVP run?" | new decision, written whole, *Approved by* from the gate record |
| projected decision "How does a change reach the server?" | new decision, written whole, *Approved by* from the gate record |
| projected decision "What serves the built game and account requests in the container?" | new version of D-05 adding "in the loop2 container" (the part D-05/2 lacks) |
| projected `loop2-container-isolation/1`, `loop2-distinct-address/1` | new invariants, each with a check |
| projected `loop2-one-serving-process/1` (container wording) | new version of the invariant, with its check extended to the container |
| `account-server-runtime/1`, `account-server-typecheck/1` | sentences unchanged; their checks must read the new deployment files (the typecheck check's tripwire fails on any deployment file today) |
| row 1 (address through Cloudflare, HTTP to the origin until before task 15) | own decision |
| row 2 (`main` deploys) | own decision |
| row 3 (agent reads the server through `mikrus` MCP; every change on the server is a human's) | own decision |
| row 4 (secrets and access values outside the repository; directory, container port and rebuild script may be in it) | own decision |
| row 5 (the loop2 container is a Docker container) | own decision |
| row 6 (Cloudflare Origin Rule changes the destination port, Free plan, up to 10 rules) | environment fact |
| new deployment files | part-map change: a new part for the deployment files, its trust boundary (the server-side trigger reads `SSH_ORIGINAL_COMMAND`) and external-context rows (GitHub Actions, Cloudflare, the Mikrus host) |
| whether Cloudflare reaches an IPv6-only origin | **not** in this request: the task says the fact is written only from the observation after the AAAA record exists, which is a human action |

Entries left to later tasks (name them in one line): "What public address do the game and account
server share?" and `loop2-shared-public-origin/1` (task 15).

**F2 and F3 — drop the release-history machinery; take the smallest reversible design.** The
approved decision lets the automation key start a rebuild of any commit that *belongs to* `main`.
Use that literally, as the old loop pattern does:
- One server clone of the repository (e.g. `/srv/loop2`), checked out detached at the requested
  commit; `git clean` keeps it a pure copy of git. Ancestor-of-`origin/main` test, not tip equality.
- Build first, switch second: `docker compose build` (the Dockerfile's build stage runs the type
  check and the build), and only after a successful build `docker compose up -d` of the loop2
  service. A failed fetch, check, type check or build leaves the running container in service.
- No release directories, no image-ID history, no `rollback N` command. A rollback **is** a rebuild
  of an earlier commit of `main`: either a revert merged to `main` (the ordinary path, deploys
  itself), or the human runs the installed script on the server with the earlier commit's SHA
  (one command). The script logs the commit it deployed and the previously running commit, so the
  log names the rollback target. The skill states the step count and that the skeleton has no data
  to lose; once a later task adds data, rollback of code does not roll back data.
- Compose configuration comes from the checked-out commit; keep the published host port stable
  (18080) and say in the skill that a rollback across a port change also needs the Cloudflare rule
  changed.
- Concurrency: one server lock; the workflow uses a GitHub concurrency group that does not cancel a
  run in progress.
Record that this narrows the first spec's approach A; approach B (rebuild in place, like loop) with
build-before-switch is now the chosen one.

**F4 — installed script versus repository source.** The source of the server-side script(s) lives
under `deploy/` in the repository; the human installs a root-owned copy at a fixed path outside the
checkout, and the forced command in `authorized_keys` names that copy. On each deployment the
installed script compares itself with the checked-out source and logs a clear warning when they
differ (deployment continues with the installed copy; the human reinstalls). Installing or
reinstalling is a human action the skill describes.

**F5 — resource gate.** Before building: abort (leaving the running container) when available
memory is below a threshold or free disk on the Docker filesystem is below a threshold; propose the
thresholds from the observed numbers above and say why. Runtime memory limit for the loop2
container: 512 MiB, as in the first spec. After the switch: log the state of the `loop` container
(name only, never its port) so the log shows the old game survived; the human still checks
`https://kantarion.bieda.it/`.

**Other settled points.** The agent's server access follows settlement row 3: read-only through
the `mikrus` MCP; every change on the server, in Cloudflare and on GitHub settings is a human
action. No server name, SSH port, SSH user or IPv6 address appears in the repository, the spec, or
your report. The deployment skill lives in the repository (both `.claude/skills/` and
`.agents/skills/`, matching how this repository already exposes its skills) and must be written
following `C:/Storage/The Brain/The Brain/Notes/Areas/(A) Claude code/konwencje_skilli_i_commandow.md`;
name that in the spec. Keep the rest of the current spec (application listen configuration with a
local default of `127.0.0.1:3000`, multi-stage Node.js 24 image, non-root runtime, health check,
`.dockerignore`, workflow with secret names, strict host key, Cloudflare Flexible per hostname,
blocked draft listing the five human actions) unless a ruling above changes it.

If a ruling above cannot hold against the frozen task or an approved source, do not work around it:
say so in your report as a question to the orchestrator, with the ways open.

## Report

Return a short summary (under 200 words) naming the revised spec path, the report path, any
question for the orchestrator, and your self-review verdict.
