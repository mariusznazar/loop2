# Design-revision report — serwer-testowy

## Dispatch, skill and boundary

Dispatch: `reports/design-revision-prompt.md` (fresh design agent, Claude Code, claude-opus-5-5).
Skill: Superpowers `brainstorming` 6.4.1, read from the installed plugin; the task stays
classified **architectural**, written-spec path. Under the cycle's delegation the orchestrator's
rulings stand in for the human's conversational approval; questions go to the orchestrator.
Boundary reached: the self-reviewed revised spec. No plan, code, test or foundation entry was
written; nothing was changed on any server, in Cloudflare or on GitHub; the server was not read by
this agent (the orchestrator's read is in the dispatch). Files written: `spec.md` (rewritten in
place) and this report.

Read: the frozen task; the first spec, `reports/design.md` and `reports/spec-review.md`;
`cycle.md`; the definition's projected decisions "Where does the MVP run?", "What serves the built
game and account requests in the container?", "How does a change reach the server?", the
invariants `loop2-container-isolation/1`, `loop2-distinct-address/1`, `loop2-one-serving-process/1`
and the gate record; `plan_mvp_loop2.md` row 2, Projected entries and change log;
`wdrozenie_na_mikrusie.md` as pattern only (no value copied); `AGENTS.md`, `foundations/*.md`,
`src/server/*.ts`, `package.json`, `scripts/build.mjs`, `tests/startup.test.mjs`, the invariant
support module and the typecheck, runtime and one-serving-process checks; WAY-13, WAY-48, WAY-69,
WAY-126, WAY-134, WAY-135, WAY-140 at the pinned `.the-way` commit (checkout equals the gitlink);
`konwencje_skilli_i_commandow.md`.

## What changed and why

| Finding / ruling | Change in the spec |
|---|---|
| F1 — map settlements and projected entries | New section *Foundation entries*: every row of the orchestrator's mapping with the entry's meaning; D-01/1 added to the runtime/typecheck row since those invariants verify it; deferred entries (task 15) named in one line; the IPv6-reachability fact explicitly kept out of this request. |
| F2, F3 — drop release history | Approaches table rewritten: approach B with build-before-switch chosen, the first spec's approach A recorded as narrowed and dropped. Release directories, image-ID history and `rollback N` removed. One clone `/srv/loop2`, detached checkout, `git clean -ffdx`, ancestor-of-`origin/main` test. Rollback = rebuild of an earlier commit of `main` (revert on `main`, or one command on the server); the log names the previously running commit, read from the container's revision label. Stable host port 18080 and the note that a rollback across a port change needs the Origin Rule changed. Lock plus GitHub concurrency group without cancelling a running deployment. |
| F4 — installed script versus source | Source `deploy/loop2-deploy`; root-owned copy `/usr/local/bin/loop2-deploy` named by the forced command; step 7 compares installed copy with the checked-out source, warns in log and workflow output, continues; reinstall (keeping the previous copy) is a human action in the skill. |
| F5 — resource gate | Step 8: abort before build when `MemAvailable` < 1024 MiB or free space on Docker's filesystem < 4 GiB, with the reasoning from the observed numbers; both values logged on every run and again after the build. 512 MiB runtime limit kept. `loop` container state (name, status, health — never its port) logged after the switch and after any build-or-later failure. |
| Other settled points | Skill placed in `.claude/skills/` and `.agents/skills/`, written per the skill-convention note; agent read-only through `mikrus` MCP, every change a human's; the kept parts of the first spec (listen config, Node 24 multi-stage image, non-root, health check, `.dockerignore`, workflow and secret names, strict host key, hostname-scoped Flexible, blocked draft with five human actions). Observed server state added. |

## Choices this revision made within the rulings

| Choice | Why | Alternative and its cost |
|---|---|---|
| One script reads the commit from `SSH_ORIGINAL_COMMAND` when set, otherwise from one argument; both present is refused | One installed file serves the automation and the human's rollback, so there is one thing to compare and reinstall | Two scripts (trigger + deploy): a second installed copy to keep in sync for no extra protection |
| Lock waits up to 15 minutes instead of failing at once | A human run and an automation run then serialize instead of the automation silently failing | Immediate failure (the loop pattern): the merged tip may stay undeployed until the next push |
| Fixed exit codes per stage (2–8) | The skill and the Actions log can name the failed stage without reading the script | Free-form messages only: harder to read from the workflow result |
| No automatic restore after a failed start | Follows the ruling (no image history); the type check and build already stop most bad commits | Tagging one "previous" image would give an instant restore, but reintroduces the image-history state the ruling removed; cost accepted: loop2 is down until one human command or a revert |
| Prune only dangling images labelled `org.opencontainers.image.title=loop2`, only on success; never build cache | Keeps disk bounded without a host-wide prune | No prune: disk fills by one image per deployment; host-wide prune: forbidden |
| `.dockerignore` as an allow-list | A stray secret or local file cannot enter the build context | Deny-list: every new local file is included until someone excludes it |
| `init: true` in Compose | The stop signal reaches Node.js, so each deployment does not wait out Docker's stop timeout | Signal handling in `main.ts`: touches the trust-boundary code for no other gain |
| `LOOP2_COMMIT` with a default in Compose, not a required variable | Read-only `docker compose ps|logs` keep working on the server without the variable | Required variable: every read command on the server fails |
| Workflow probes the public address after deploying; the address is declared once there | Makes To do 2 observable on each deployment and gives `loop2-distinct-address/1` a concrete repository value to check | No probe: the public route is only checked by hand at setup |
| `permissions: {}` in the workflow | It neither checks out code nor uses the token | `contents: read`: a token with a permission nothing uses |
| Skill in English, model-invocable | Matches the repository's other skills; reading is safe to trigger automatically | Polish: mixes conventions in `.claude/skills`; disabled invocation: the agent would not find it when asked about a deployment |

## Questions for the orchestrator

None blocking: every ruling holds against the frozen task and the approved sources. Points for the
orchestrator to weigh or carry to the request:

1. **Downgrade by a stolen key.** The literal ancestor test lets a stolen automation key switch
   loop2 to any earlier commit of `main` until the next push (no code can be brought in). Accepted
   here for a test server without data; the spec marks it to revisit before task 15. The projected
   decision "How does a change reach the server?" is written whole with *Review when: none*, so the
   reminder lives only in the spec and the request unless a later task carries it.
2. **Twin-copy registration.** The two identical skill copies live inside one repository; the
   owner's convention registers twin sets in a vault file outside this task's write boundary. Not
   done here; the human may decide whether a same-repository pair needs registering.
3. **Unverified routing.** Cloudflare reaching an IPv6-only origin and Docker publishing 18080 on
   the host's IPv6 remain unobserved; the human's setup check 5 decides, and a failure returns to
   the cycle.

## Spec self-review

- **Placeholders:** none; angle-bracketed `<sha>` appear only as parts of log lines and commands.
- **Internal consistency:** approach B everywhere; no remaining reference to release directories,
  image history or `rollback N`; the port 18080, paths, project/service/container names and exit
  codes agree across components, error table, skill and human actions; the ancestor test is used in
  the protocol, the trust paragraph and the foundation mapping alike.
- **Scope:** one plan's worth — application listen config, image, Compose, workflow, one script,
  skill, foundation entries and checks. Accounts, data, origin encryption and the shared-origin
  entries stay with later tasks.
- **Ambiguity:** resolved by fixing values — thresholds (1024 MiB, 4 GiB), lock wait (15 min),
  health wait (120 s), image base `node:24-slim`, input source precedence, prune filter.
- **Sensitive values:** searched the spec and this report for server names, SSH ports, user and
  IPv6 patterns; none present. The second workload on the host is not named.

Verdict: **ready for the orchestrator's review** (and an independent re-review if the orchestrator
requires one before planning).

## Revision 2

Dispatch: `reports/design-revision-2-prompt.md`, the orchestrator's rulings on the re-review
`reports/spec-re-review.md` (two blocking findings, ten notes). Same agent, same write boundary;
no plan, code, test or foundation entry written; nothing changed outside the two files.

| Ruling | Change in `spec.md` |
|---|---|
| B1, way (b) | The script has two input paths: the forced command (unchanged — fetch `main`, ancestor of `origin/main`) and the human path (`SSH_ORIGINAL_COMMAND` unset, one argument — fetch every branch head, accept a commit of any branch). The spec states why the automation key cannot reach the human path (the forced command replaces the client's command, so no argument exists; with no client command the variable is unset and the run is refused for lack of input), and that the forced path tests only the freshly fetched `origin/main`, so refs left by a human run never widen it. Human actions rewritten in order, all before the merge: install the script from the request head commit; key and secrets before the merge because the merge starts the workflow; first deployment by the human path with the request head commit; checks include the applied memory limit. The IPv6-origin environment fact is now written by a correction of this request from the human's reported observation (foundation table updated). What happens when the first automated run after the merge fails is stated in the spec and the skill. |
| B2 | One marked constants block at the top of the script (PATH, checkout, installed path, log, lock, meminfo source, thresholds, waits, port, branch, project/service/container). Tests replace only that block in a temporary copy, assert the rest byte-identical to `deploy/loop2-deploy`, use recording stubs for `docker`, `curl`, `flock`, `df`, and abort if any resolves outside the stub directory. Free disk is now read with `df`. The seam is unreachable from the forced command. Adversarial tests added: forced path with a commit only on another branch (exit 3, while the human path accepts it), forced path with no command, both inputs, two arguments — refused before any stub or git call. |
| Note 1 | "Run account" paragraph: one unnamed account owns the clone, holds the GitHub alias and runs both paths; needs Docker and write access to checkout, log and lock. |
| Note 2 | Container part of the one-serving-process check counts listening processes and their children; health probe and init are not serving processes; local runs use `--init`. |
| Note 3 | Verification line: the orchestrator's pre-request scan for access values; script output rule (never whole `docker info`, `hostname`, `uname -n`). |
| Note 4 | Workflow probe also requests `https://kantarion.bieda.it/`; a failure fails the run naming the address. |
| Note 6 | Action 5 reads the applied memory limit (`HostConfig.Memory`). |
| Note 7 | Trust boundary `deploy/**` only; the workflow is described as security-sensitive without untrusted input. The cycle record's Sharpness row still lists the workflow as a trust-boundary file — the orchestrator may align it. |
| Note 8 | README's last sentence changes together with the listen-variable line, in Polish. |
| Note 9 | Test that the two skill copies are identical, in part `agent-workflow`. |
| Note 10 | Step 7 warns, never crashes, when the checked-out commit has no `deploy/loop2-deploy`; such a commit then fails at the build (exit 7) with the container in service. |

**Questions for the orchestrator:** none. Earlier point 3 (unverified routing) is now carried by
human action 5 and the correction that writes the environment fact; points 1 and 2 stand. One
remark: the cycle record's Sharpness row names the workflow as a trust-boundary file, which the
spec (note 7) no longer does.

**Self-review (revision 2):**
- Placeholders: none; `<request head sha>`, `<sha>` are command arguments only.
- Consistency: "commit of `main`" now stands only where the forced path is meant; exit 3 reads
  "commit on no accepted branch" in the skill and the error table; the first-deployment row of the
  error table and the human actions both name the request head commit; the IPv6 fact row, the
  Cloudflare section and action 5 agree that a correction of this request writes it; no sentence
  still says nothing can select another mode.
- Scope: unchanged — one plan's worth; the human path is a branch in the same script.
- Ambiguity: input precedence (both present refused), which refs each path fetches and tests, and
  what the test seam may replace are explicit.
- Sensitive values: spec and report searched again; none present.

Verdict: **ready for the orchestrator's review.**
