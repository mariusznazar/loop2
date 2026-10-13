# Return step analysis — serwer-testowy (WAY-11)

Analyst: fresh agent (Claude Code, claude-opus-5-5), analysis only — no foundation entry, check or
code written, nothing changed on the server, Cloudflare or GitHub, no access value written.

Read: WAY-11, WAY-36, WAY-126, WAY-134 (`.the-way/foundations/decisions.md`); `task-frozen.md`;
`cycle.md` (questions table, live events); `.superpowers/sdd/plan/progress.md` and
`final-review.md`; `spec.md`; the diff `1701186..HEAD` (6bba3d2) in the worktree; current
`foundations/*.md`; `definicja_mvp_loop2.md` § Projected foundation changes and gate record;
`plan_mvp_loop2.md` row 2 and *Projected entries*.

Guards run at 6bba3d2 (`--base 1701186 --merge-onto 1701186`): decisions 6 errors, all the
`merge of <request link>` placeholder (expected until the request exists); invariants, environment
facts, glossary 0 errors; part map 0 errors, 0 warnings, 1 unchecked (dependency graph).

## Recommendations at a glance

| # | Finding | Recommended entry | Priority |
|---|---|---|---|
| F7 | Forced-command input boundary has no invariant | new invariant, check by a fresh check author | high |
| C1 | D-12/1 sentence is false of the automated deployment | edit D-12/1 wording before the merge | high |
| F1 | Rollback = rebuild; human path accepts any branch | new decision | medium |
| F2 | Automation key runs an installed copy outside the checkout | new decision (carries the "revisit before task 15" condition) | medium |
| F4 | Deployment leaves every other workload alone; resource gate; memory limit | new decision | medium |
| F8 | A stage failing before the switch leaves loop2 in service | new invariant | medium |
| X1 | Public address entry partly made true by this code (WAY-126) | question to the human; my recommendation below | medium |
| C2 | D-11/1 "every push starts a deployment" vs concurrency | edit D-11/1 wording before the merge | medium |
| P2 | Failure modes of `deployment` known now | part-map change | medium |
| P4, P5 | Missing dependency and external partners | part-map change | medium |
| G1–G3 | `deployment`, `test server`, `public address` | glossary terms | medium |
| F10 | Origin port open to anyone over IPv6, no entry says it must close before task 15 | question to the human (extends row 1's meaning) | medium |
| E1–E4 | Facts that can be held now | environment facts, only where an entry rests on them | low–medium |
| C3, C4, C6, C8, F5, F6, F9, F11 | smaller | edits, choice-table lines, questions | low |

---

## 1. Decisions and rules that still bind after the merge (WAY-36)

### F1 — A rollback is a rebuild of an earlier commit; the human path accepts a commit of any branch

- **What.** No image history is kept; a rollback is a revert merged to `main` or a human run of
  the installed script with an earlier commit. The human path (no `SSH_ORIGINAL_COMMAND`, one
  argument) fetches every branch head and accepts a commit of any GitHub branch; the forced path
  accepts only `main`.
- **Evidence.** Q3, Q9; `deploy/loop2-deploy:8-10`, `:140-150`, `:170-181`; `spec.md:47-48`,
  `:289-295`; `.claude/skills/loop2-deploy/SKILL.md:75-85`.
- **Binds after merge.** Yes — it is how every later rollback works, and the human path is the
  route of every pre-merge first deployment of a later deployment change.
- **No entry states it.** D-09/1 constrains only the automation's key; D-11/1 names `main`; no
  entry says what a rollback is or that a human run may deploy another branch.
- **Entry.** New decision, e.g. "How is loop2 rolled back on the test server?", derives from
  D-09; level 2 (complies: a revert merged to `main`, or a human run of the installed script with
  an earlier commit; violates: a rollback that restarts a kept image, or the automation key's path
  accepting a commit of another branch). Rationale should say that the base image `node:24-slim`
  is an unpinned tag (`Dockerfile:1`, `:12`), so a rebuild restores the code, not the same image,
  and that rolling back code does not roll back data. Review when: a task stores player data
  (task 15/16).
- **Price.** Writing: one entry, meaning accepted at the merge (WAY-114). Not writing: the
  any-branch human path and the no-history choice live only in a script comment and the skill; a
  later task (backup, data migration) may assume an earlier image can be restarted, or narrow the
  human path and break the pre-merge first-deployment procedure without any foundation signal.

### F2 — The automation key runs an installed copy outside the checkout

- **What.** The forced command is a root-owned copy at `/usr/local/bin/loop2-deploy`; the checkout
  never runs as the forced command, so a pushed commit cannot change what the key executes. Each
  run compares the installed copy with the commit's source and only logs a difference;
  reinstalling is a human action.
- **Evidence.** Q5; `deploy/loop2-deploy:4-6`, `:201-215`; `spec.md:129-133`.
- **Binds after merge.** Yes — it is what keeps D-09/1's "the automation's key can only start a
  rebuild" true against a change of the script itself.
- **No entry states it.** D-09/1 says what the key may do, not how that stays true.
- **Entry.** New decision, e.g. "What does the automation's key run on the server?", derives from
  D-09 and D-12; level 2 (complies: `authorized_keys` naming the installed path, a deployment that
  logs a difference and goes on; violates: a forced command pointing into `/srv/loop2`, a
  deployment that reinstalls its own script). **Review when** should carry Q4's condition that has
  no home today: a stolen automation key can switch loop2 to any earlier commit of `main` until the
  next push — revisit before player accounts are served (task 15). D-09/1 is gate wording with
  *Review when: none*, so the condition belongs here, not in D-09.
- **Price.** Writing: one entry. Not writing: a later "simplify the setup" change can point the
  forced command at the checkout and pass every test (the tests replace the constants block), and
  the replay-older-commit risk accepted "until task 15" is recorded only in the spec and the final
  review, which disappear after the merge.

### F3 — Q4 (any ancestor of `main`, not the tip) — no new entry

D-09/1 states it literally ("a commit that belongs to that branch"). Only its review condition is
unhoused; F2 houses it. Choice-table line stays.

### F4 — loop2 leaves every other workload on the shared host alone; resource gate; memory limit

- **What.** The deployment changes nothing on the host but loop2's checkout, image, container, log
  and lock — no host-wide prune, no `down`, no other Compose project — including a third workload
  the task does not name; it builds only with at least 1024 MiB `MemAvailable` and 4 GiB free for
  Docker; the container runs with `mem_limit: 512m`.
- **Evidence.** Q6, Q8; `cycle.md:156`; `deploy/loop2-deploy:35-36`, `:248-262`, `:351-360`;
  `compose.yaml:13`; `spec.md:226-241`; the isolation check's own reading,
  `tests/invariants/test_loop2_container_isolation.py:14-20`.
- **Binds after merge.** Yes. Task 15 has the open question whether `argon2` fits the container's
  memory (`plan_mvp_loop2.md:147`) — that question now has a concrete limit no entry names.
- **No entry states it.** D-08/1 protects only "the existing loop container";
  `loop2-container-isolation/1` says "separate from the existing loop deployment", while its check
  already enforces "acts on loop2 alone".
- **Entry.** New decision, e.g. "How does loop2 share the Mikrus host?", derives from D-08;
  Verification level 1 — `loop2-container-isolation` (its check already reads this) — plus level 2
  for the gate and the limit. Thresholds stay in code as tunable values; the decision states the
  rule (gate before build, limit on the container, nothing else touched), not the numbers. Review
  when: a task needs more memory than the limit, or the logged resource values show the gate
  misfires.
- **Price.** Writing: one entry; the decision must not cite the host's observed numbers as facts
  (see E6). Not writing: the third workload's protection rests on a check broader than its
  sentence; a later edit narrowing the check to "loop" would be a faithful reading of the
  invariant and the foundation would not object; task 15 meets the 512 MiB limit only in
  `compose.yaml`.

### F5 — The script and workflow print no access value — choice-table line only

- **What.** Output discipline (`deploy/loop2-deploy:14-18`); git and Docker output to the server
  log only. ssh's own fatal errors can still print the resolved shared IPv4 (not one of D-13's
  four values; port and user are masked as secrets) — `final-review.md:157-162`, `:189`.
- **Binds after merge.** Yes in spirit, but D-13/1 covers "the repository's files and requests";
  Actions logs are outside row 4's meaning. Extending it would change a human settlement.
- **Recommendation.** Choice-table line, and one sentence in the request; if the human wants logs
  covered, that is a new version of D-13 later. Price of not writing: nothing until the repository
  turns public (old run logs would then need deleting, as the skill says).

### F6 — Choices that end with the work or are code values — choice-table lines only

Q7 (port 18080: D-13 allows it in the repository, `compose.yaml:12` holds it), Q10 (test seam),
Q11 (trust boundary `deploy/**` only — the part map holds it), Q21 (parked #15 — now in the check's
"Does NOT cover", `tests/invariants/test_account_server_typecheck.py:52-58`), Q22, P4, P6
(`.gitattributes` LF for `deploy/**`), P1–P3, P5, P7–P14. **Q20 (the `/run` lock and the run
account's rights) must stay out of the foundation**: a sentence about that account's rights points
at the SSH user, which D-13/1 keeps outside the repository; the owner's private note is its place.

## 2. Code behaviour with no invariant over it

### F7 — The forced command's input boundary (trust boundary `deploy/**`) — recommend an invariant

- **What.** Before any git or Docker call, the script refuses everything but one 40-lowercase-hex
  commit name, refuses both inputs at once, several arguments and no input; on the forced path it
  fetches only `main` and accepts only an ancestor of the freshly fetched `refs/remotes/origin/main`.
- **Evidence.** `deploy/loop2-deploy:90-111`, `:140-168`, `:364-370`; WAY-48 adversarial tests in
  `tests/deploy/test_loop2_deploy_input.py` and `test_loop2_deploy_commit.py`.
- **Existing coverage.** D-09/1 is level 2 only (`foundations/decisions.md:228-231`); the
  typecheck check states that the key restriction "is checked by no test here"
  (`tests/invariants/test_account_server_typecheck.py:55-58`). The `tests/deploy` suite was
  written by the Slice 3 implementer, so under WAY-126/WAY-69 it is not an invariant check, and no
  invariant Method runs it.
- **Binds after merge.** Yes — the single most security-relevant rule of the product today.
- **Entry.** New invariant, e.g. `loop2-deploy-trigger-input/1`: "The deployment command run by
  the automation's key refuses every input but one commit name of 40 lowercase hexadecimal
  characters before it fetches, builds or changes a container, and deploys only a commit that
  belongs to `main` as just fetched from GitHub." Derives from D-09. Rests on E1 and E2. Method:
  the invariant gate, with a check written by an agent that wrote neither the script nor the
  sentence (it can reuse the seam in `tests/deploy/deploy_script_support.py`); deliberate break by
  a reviewer. Git's bash missing → unchecked, never pass.
- **Price.** Writing: one check-author run (the cycle's checks cost ~250k tokens each) and a bash
  dependency in the invariant gate. Not writing: a later edit can weaken validation together with
  its implementer test and nothing in the foundation flags it; WAY-11's own "violates" example
  ("the return step reports nothing to add, while the diff brings in behaviour that no invariant
  covers") fits this file exactly.

### F8 — A deployment that stops before the switch leaves loop2 in service — recommend an invariant

- **What.** The error table's central property: input, commit, lock, resource gate, fetch,
  checkout, type check or build failing leaves the running container untouched (exits 2–7).
- **Evidence.** `spec.md:318-327`; `deploy/loop2-deploy:364-376`; resource gate `:248-262`.
- **Existing coverage.** `account-server-typecheck/1`'s check proves build precedes `up` and `up`
  carries `--no-build`, but excludes "that the script stops before `up` when the build fails"
  (`tests/invariants/test_account_server_typecheck.py:49-51`). The resource gate is covered only by
  implementer tests. D-08/1's level 2 covers the loop container, not loop2.
- **Entry.** New invariant, e.g. `loop2-deploy-keeps-running/1`: "A deployment that stops before
  it starts the new container — at its input, commit, lock, resource gate, fetch, checkout, type
  check or build — leaves the running loop2 container in service." Derives from F1's decision (or
  none if F1 is not written). Same check-author rule as F7; the two can share one dispatch.
- **Price.** Writing: one more check in the same dispatch as F7. Not writing: the resource gate
  can be removed with its test in one change; "a failed build keeps the old version" is a property
  later tasks (15–17, which add data) will lean on without it being stated.

### F9 — Listen configuration — choice-table lines only

`src/server/main.ts:3-10`: defaults `127.0.0.1:3000`, a non-integer or out-of-range port exits
non-zero without the readiness line; an empty `LOOP2_LISTEN_HOST` listens on every interface
(deferred minor, `progress.md:28`). `account-server-occupied-address/1` still holds (its check runs
on the default address only, `progress.md:30`). The behaviour ends at local safety; P3/P4 rows
suffice. Price of not writing: nothing beyond the deferred minor.

### F10 — The origin port answers anyone directly over IPv6 — question to the human

- **What.** `compose.yaml:11-12` publishes 18080 on every host address; the container listens on
  `0.0.0.0` (`Dockerfile:16-18`). Unless the host blocks it, loop2 answers plain HTTP on the
  server's IPv6 directly, bypassing Cloudflare. The spec says this "must be replaced by an
  encrypted, restricted origin connection before task 15" (`spec.md:264-267`).
- **No entry states it.** D-10/1's review condition names only encryption
  (`foundations/decisions.md:266`, `:275`); row 1 settled only encryption.
- **Binds after merge.** Yes — task 15 will trust proxy headers for the session cookie (plan open
  question, `plan_mvp_loop2.md:146`); with the origin open, those headers can be forged by anyone
  who reaches the port directly.
- **Recommendation.** Ask the human whether "restricted" joins D-10/1's review condition (an edit
  before the merge, since D-10/1 is unmerged). Writing it without asking would extend row 1's
  meaning (WAY-134). Price of not writing: task 15 inherits the encryption condition only and may
  meet the open origin late.

### F11 — Non-root image user and the build-context allow-list — choice-table lines

`Dockerfile:23` (`USER node`), `.dockerignore` (allow-list). Both matter after the merge (task 15
adds a session secret, which must not enter the image), but no rule is settled yet; task 15 settles
how secrets reach the container. Optional low-priority invariant "the loop2 container's serving
process runs as a non-root user" (static read of the last stage's `USER`). Price of not writing: a
later volume-permissions fix can switch to root silently.

## 3. Environment facts

Write a fact only where an entry's *Based on* or *Rests on* needs it (record-environment-fact).

**Can be held now**

- **E1 — OpenSSH forced-command semantics** (`command=` replaces the client's command, which goes
  to `SSH_ORIGINAL_COMMAND`; with no client command it is unset; `restrict` disables forwarding,
  pty and user rc). Source: the OpenSSH sshd(8) manual, AUTHORIZED_KEYS FILE FORMAT — the fact's
  writer reads and quotes it; not cited here from memory. Needed if F7 is written (Rests on).
- **E2 — the host's sshd accepts no client environment beyond the defaults and reads no user
  environment file** (`AcceptEnv`, `PermitUserEnvironment`). An agent may read it through the
  `mikrus` MCP (D-12/1 allows reading), with a filter that returns those two keys only — a whole
  `sshd -T` prints the SSH port. Deferred line `progress.md:44`, `final-review.md:180`. Needed if F7
  is written.
- **E3 — GitHub Actions concurrency replaces an older pending run with a newer one.** Doc fact;
  needed only if D-11/1 is reworded to rest on it (C2).
- **E4 — a Cloudflare Configuration Rule can set the encryption mode for one hostname on the Free
  plan.** The spec's mechanism for "plain HTTP to the server" (`spec.md:255-258`); D-10/1's
  *Based on* cites only Origin Rules and the port list. Doc fact, can be written now if D-10/1
  should rest on it; whether it is applied is human action 1.
- **E5 — both public IPv4 service ports of the host are used by other workloads** (D-10/1's
  rationale rests on it). Can be held now **only without port numbers**: Mikrus derives those
  numbers from the server's identifier, so writing them would reveal the server and its SSH port.
  Recommend not writing it; C3 fixes the rationale instead.
- **E6 — host memory, swap, CPU, disk, tool versions** (`cycle.md:156`, Q12). Basis of the
  thresholds, but they change by themselves and the script logs them on every run
  (`deploy/loop2-deploy:252`). Recommend no fact; the final review's suggestion (record the first
  run's logged values in the correction) is enough.

**Wait for the human's observation at human action 5**

- **W1** Cloudflare reaches this IPv6-only origin (already planned; `spec.md:262-264`).
- **W2** Docker publishes host port 18080 on the host's IPv6 inside this LXC container.
- **W3** Docker enforces `mem_limit` inside the unprivileged LXC container. Note for the method:
  `docker inspect … HostConfig.Memory` (`spec.md:422-423`, `SKILL.md:52-53`) shows only the
  requested limit; enforcement shows in the container's cgroup `memory.max` (or the limit column of
  `docker stats`). The correction should observe the latter.
- **W4** the hostname-scoped encryption rule is in effect (human action 1, seen at action 5).

**Wait for the first automated run (after the merge — cannot enter this request)**

- **W5** a GitHub-hosted runner reaches the server's SSH through the shared IPv4 name
  (`progress.md:63-64`). Name it in the request as an unverified prerequisite; it becomes a fact in
  a later correction or the next deployment task's return step.

## 4. Glossary

- **G1 `deployment`** — two meanings in binding sentences: the act ("checked before deployment",
  `foundations/invariants.md:17`; "starts a deployment", `foundations/decisions.md:291`) and the
  installed thing ("The loop2 deployment runs in a container…", `invariants.md:107`; "the existing
  loop deployment"). Recommend a term with *Not* separating the two (or a second word for the
  installation). Price of not writing: a later invariant about "the deployment" can be read either
  way; with F7/F8 written, the act meaning carries security rules.
- **G2 `test server`** — `decisions.md:291`, `:300`; elsewhere "the server", "on Mikrus". A reader
  of the field takes a test server to be one players do not use; here it is the only place loop2
  runs and where accounts go public (plan phase, `plan_mvp_loop2.md:158`). Recommend a term.
- **G3 `public address`** — D-08/1, `loop2-distinct-address/1`, and task 15's projected "What
  public address do the game and account server share?". Its check reads the hostname of
  `LOOP2_PUBLIC_URL`; with F10 the server's IPv6 and 18080 are also a publicly reachable address of
  loop2. Recommend a term (the HTTPS origin players use, not the server's IP address) — it settles
  task 15's entry too.
- **G4 `deploy branch`** — D-11/1's sentence defines it (`decisions.md:290`). Low; D-11 also
  chooses, so it can stay a decision. Optional term.
- Low, no entry: "loop container", "loop deployment", "old game" name the same thing across D-08,
  the invariants and the skill.

## 5. Part map

- **P1 guard.** `python -B .the-way/elements/part-map/format_guard.py foundations/part_map.md
  --base 1701186`: 0 errors, 0 warnings, 1 unchecked (dependency graph). Every tracked file is
  claimed.
- **P2 failure modes of `deployment`** (`part_map.md:88`, "none") — known now from the spec's
  error table (`spec.md:318-327`) and the reviews: refused input/commit/lock (exit 2–4, nothing
  changed); resource gate (5); fetch or checkout (6, deploy key or GitHub reachability); type check
  or build (7, running loop2 untouched); unhealthy start or failed probe (8, loop2 down until a
  human restore or a revert); installed script differing from the source (warning, stale validator
  runs on); lock file under `/run` gone after a reboot for an account without rights to recreate it
  (exit 4 until the skill's `tmpfiles.d` entry); a dropped SSH connection killing a run midway
  (`final-review.md:136-144`, untested); Cloudflare 521/522 during a start; host memory exhaustion
  without swap (the gate's reason). Recommend writing through `the-way-update-part-map`. Price of
  not writing: criticality stays "unknown = highest" and the next deployment task re-derives them.
- **P3 failure modes of `account-server`** — invalid `LOOP2_LISTEN_PORT` and occupied address both
  end the process with a non-zero exit. Low.
- **P4 dependency.** `agent-workflow` restates deployment facts (paths, exit codes, secret names,
  port, memory limit — `SKILL.md:14-19`, `:57-66`), so it depends on `deployment`; today it
  depends only on `product-foundation` (`part_map.md:59`). Recommend adding. Price of not writing: a
  change to the script's exit codes does not show the skill as affected.
- **P5 external context** (`part_map.md:93-101`). Missing: the container image registry
  (`node:24-slim`, an unpinned tag pulled at every build — them → us, untrusted). The "GitHub
  Actions" row does not cover the GitHub repository the server fetches over its read-only deploy
  key (them → us). Recommend two rows or a widened GitHub row.
- **P6** `tests/invariants/loop2_invariant_support.py` sits in `build-tools` while most of its new
  readers serve deployment checks. Low; a change to it shows only `build-tools` as touched.
- **P7** `tests/deploy/**` and `tests/agent_workflow/**` run by no command a later task reads
  (`npm test` does not; the invariants Method runs `tests/invariants` only); the command lives in
  the plan. Low; a README line would do.

## 6. Foundation compared with the code in the touched parts

- **C1 D-12/1 is false as written** (`decisions.md:311-312`): "every change on the server is made
  by a human", while D-09/1 and D-11/1 make every push to `main` change the server automatically
  (`deploy.yml:5-7`). Row 3's meaning is agent versus human. Recommend rewording before the merge,
  keeping the meaning (WAY-134), e.g. "An agent reads the server only through the `mikrus` MCP
  server and changes nothing on it; every change on the server other than the automated
  deployment is made by a human." Price of not writing: a binding sentence the product contradicts
  on its first merge.
- **C2 D-11/1 "every push to `main` … starts a deployment"** (`decisions.md:290-291`) vs
  `deploy.yml:9-13`: a pending run is replaced by a newer one, so an intermediate push deploys
  nothing of its own (its content arrives in the newer commit). Row 2's meaning ("każdy scalony PR
  sam trafia na serwer") holds. Recommend rewording, e.g. "…deploys that commit, or a later commit
  of `main` that contains it, with no manual step"; optionally rests on E3.
- **C3 D-10/1 rationale** (`decisions.md:281`) says the host's public IPv4 ports "stay with the
  existing loop deployment"; observed: one is the old game's, the other a third workload's
  (`cycle.md:156`). Edit before the merge, without port numbers.
- **C4** `account-server-typecheck/1`'s check carries D-09/1's rule "the workflow ships no files"
  (`tests/invariants/test_account_server_typecheck.py:29-47`) while D-09/1 stays level 2. It is a
  defensible reading of the typecheck sentence (shipped files would bypass the check), but D-09's
  "the server pulls the code itself" is protected only incidentally. Optional: a D-09-derived
  invariant ("the deployment workflow sends the server only the commit name") taking that part.
  Price of not writing: if the typecheck invariant is ever reworded, D-09's protection goes with
  it unnoticed.
- **C5** the isolation check is broader than its sentence — handled by F4.
- **C6** the skill names only `loop` as the workload to keep untouched (`SKILL.md:17-19`), while Q8
  extends it to every other workload. Wording fix; low.
- **C7** `SKILL.md:50` (both copies) reads the label without `--type container` — the deferred
  minor (`progress.md:87`).
- **C8 *Approved by* against the gate record.** WAY-126 transcribes *Approved by* from the gate
  record. D-08/1 and D-09/1 carry "Mariusz, 2026-10-04" (`decisions.md:210`, `:234`); the gate
  record now reads "Mariusz, 2026-10-13", fingerprint 9e480247 (`definicja_mvp_loop2.md:2347-2351`).
  The definition was re-approved after the foundation step (file modified ~03:00, foundation
  commits 01:32; plan change log `plan_mvp_loop2.md:185`: only "What is the game built with?"
  changed). D-05/3 now holds the projected wording whole yet carries `merge of <request link>`
  (`decisions.md:253`), following D-05/2's precedent. Question for the orchestrator: keep the dates
  the entries' own lines carry, or transcribe the current gate record. Price either way: one line
  each; leaving it unasked risks a reviewer reading a mismatch as an unapproved entry.

## 7. Projected entries and *Settlements to record*

| Source entry (plan row 2) | Foundation now | Status |
|---|---|---|
| "Where does the MVP run?" | D-08/1, whole | ✓ (date: C8) |
| "How does a change reach the server?" | D-09/1, whole | ✓ (date: C8) |
| "What serves the built game and account requests in the container?" | D-05/3, whole wording | ✓ (*Approved by*: C8) |
| "What runs the account and save server?" | D-01/1, whole (task 1) | ✓ deployment part made true; nothing to write |
| `loop2-container-isolation/1` | same sentence | ✓ |
| `loop2-distinct-address/1` | same sentence | ✓ |
| `loop2-one-serving-process/1` (container wording) | `loop2-one-serving-process/2` | ✓ |
| `account-server-runtime/1`, `account-server-typecheck/1` | unchanged sentences, checks read deployment files | ✓ |
| "What public address do the game and account server share?" | absent | **X1** |
| `loop2-shared-public-origin/1` | absent | ✓ correctly absent — no browser sends account requests yet |

### X1 — the public-address decision is partly made true by this code

- **What.** Its first sentence, "The built game and the account and save server use one public
  HTTPS origin at loop2's address", becomes true with this change once human actions 1 and 5 hold:
  one container serves `/` and `/api/` at `https://loop2.mariusznazar.com/`, and the workflow probes
  both there (`deploy.yml:18`, `:78-79`). The second sentence (browser requests) is not true yet.
- **Sources.** WAY-126: the first task whose code makes a projected entry true writes it, "where
  the code makes only part of it true, the agent writes that part"; its complies example: "a plan
  member whose code would make another item's entry true returns to the plan first". The plan says
  realized by 2 and 15, written by 15 (`plan_mvp_loop2.md:54`); the frozen task repeats "zapisuje
  zadanie 15" (`task-frozen.md:91`); the spec leaves it to task 15 (`spec.md:354-355`).
- **Two ways.** (a) Write sentence 1 now as a partial decision, *Approved by* the merge, level 2
  verification until task 15 adds the invariant; the plan's *Written by* stays 15 for the rest.
  Cost: one entry; its truth rests on W1/W2 like D-10/1, and F10's open origin makes "one public
  HTTPS origin" arguable until it is closed. (b) Return to the plan: the human confirms task 15
  writes it whole, with a plan change-log line saying why. Cost: the foundation lags the code by
  one sentence until task 15, which WAY-126's *Rejected* names as the price.
- **Recommendation.** (b), asked in the request: the sentence's "one HTTPS origin" is not yet
  fully true while the origin answers plain HTTP directly (F10), and the human placed the entry
  with task 15 twice. If the human closes F10 within task 15 anyway, (b) loses nothing.

### Settlements to record — rows 1–6

| Row | Entry | Status |
|---|---|---|
| 1 | D-10/1 | ✓ meaning kept; C3 rationale fix; F10 question |
| 2 | D-11/1 | ✓ meaning kept; C2 wording fix |
| 3 | D-12/1 | ✓ meaning kept; **C1 wording is false of the automated deployment** |
| 4 | D-13/1 | ✓; F5 choice-table line for logs |
| 5 | D-14/1 | ✓ |
| 6 | `cloudflare-origin-rules/1` | ✓ (read date 2026-10-13, Q14) |

## Questions for the orchestrator (and through the request, the human)

1. X1: write sentence 1 of the public-address decision now, or keep it with task 15? (recommend:
   keep, confirmed in the plan's change log)
2. F10: does "restricted" (no direct access to the origin port) join D-10/1's review condition
   next to "encrypted"?
3. C8: which *Approved by* do D-08/1, D-09/1 and D-05/3 carry after the definition's re-approval
   on 2026-10-13?
4. W3: should human action 5 observe the enforced memory limit (cgroup) instead of the requested
   one?
