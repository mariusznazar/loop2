# Final whole-branch review — serwer-testowy (1701186..e52937a)

Reviewer: final code reviewer (Superpowers 6.4.1 `requesting-code-review`, code-reviewer.md). Read in
passes, by myself, no sub-reviewers: requirements (task-frozen.md, spec.md rev. 2, plan.md), the
ledger, then the head tree file by file (Dockerfile, compose.yaml, .dockerignore, .gitattributes,
src/server/main.ts, README, deploy/loop2-deploy, .github/workflows/deploy.yml, both skill copies,
foundations/*.md diff, the skill test, the docstrings and outlines of the invariant and deploy
tests), then whole-diff scans. Suites were not re-run (evidence given: npm 11/11, invariants 57,
deploy 63, agent_workflow 5; guards clean but for the six `<request link>` placeholders).

## Verdict

**Ready to merge: Yes, with two cheap Minor fixes recommended before human action 3** (M1, M2
below). No Critical and no Important finding. The contract holds end to end, the five human
actions in the skill's order produce a working first deployment as far as the repository can
determine, nothing in the repository or the commit messages is an access value, and the
foundation entries are faithful to the task and the projected entries and agree with the code.

## Strengths

- **One contract, end to end.** Workflow sends exactly `github.sha` as the one remote argument
  (`.github/workflows/deploy.yml:28,47`) → sshd puts it in `SSH_ORIGINAL_COMMAND` under
  `restrict,command="/usr/local/bin/loop2-deploy"` → the script validates `^[0-9a-f]{40}$` before
  any git or Docker call (`deploy/loop2-deploy:90-111`), fetches `main` only and requires
  `merge-base --is-ancestor` against the just-fetched `refs/remotes/origin/main` (`:142-168`) →
  `docker compose -p loop2 -f /srv/loop2/compose.yaml build app` with `LOOP2_COMMIT` (`:298`) →
  Dockerfile runs `npm run typecheck` and `npm run build` in the build stage, labels the runtime
  stage with title and revision (`Dockerfile:8-15`) → `up -d --no-build --no-deps --remove-orphans
  --wait` (`:312`) against the HEALTHCHECK (`Dockerfile:25-26`) → local probe of `/` (200) and an
  unknown `/api/` path (JSON 404) on 18080 (`:328-347`) → workflow's public probes of loop2 (200,
  JSON API error) and the old game (`deploy.yml:53-81`). Names agree everywhere: project `loop2`,
  service `app`, container `loop2`, port 18080→3000, label `org.opencontainers.image.title=loop2`,
  exit codes 2–8, log `/var/log/loop2-deploy.log`, the five secret names; the skill quotes the same
  values (`SKILL.md:14-19,55-66`; `references/setup_and_secrets.md:64-74`).
- **The old game is protected by construction.** No `down`, no host-wide prune, `--remove-orphans`
  scoped to project `loop2`, image prune only with the loop2 title-label filter and only on success
  (`deploy/loop2-deploy:351-360`), `loop` read only through `docker inspect --type container`
  (`:266-275`) and logged after every run that reached the build. A static invariant
  (`loop2-container-isolation/1`) guards this.
- **Fail-safe order.** Everything that can fail before the switch (input, lock, fetch, accepted
  commit, checkout, resource gate, type check, build) leaves the running container untouched;
  only exit 8 can leave loop2 down, and it prints the exact restore command.
- **No access value leaks from the script**: git's and Docker's own output go only to the server
  log; the script reads one field of `docker info`; `umask 027`; fixed `PATH`; `LC_ALL=C`; the
  constants are `readonly` literals no input can change.
- **Tests have teeth**: a byte-identity-checked seam, stubs guarded against reaching real Docker,
  adversarial input set per WAY-48, and the invariant checks were each broken deliberately and
  caught (ledger).
- **The skill** covers every item of To do 5, including the step count of a rollback (one human
  command, or revert-and-merge), what happens to data, and the IPv4-only runner and `[host]:port`
  known_hosts traps the slice-5 review raised.

## End-to-end walk of the five human actions (skill order)

1. Cloudflare AAAA + Origin Rule 18080 + hostname-scoped Flexible — matches D-10/1 and compose's
   port. Until step 5 the public address answers 52x, which harms nothing.
2. Read-only deploy key + SSH alias — the script fetches from `origin` (no URL constant), so the
   clone in step 3 must use the alias URL; the skill says so (`setup_and_secrets.md:39-42`).
3. Clone to `/srv/loop2`, fetch the task branch, `git show <head>:deploy/loop2-deploy`, `bash -n`,
   install root-owned 0755. The installed bytes equal the checkout's (git blob, LF by
   `.gitattributes`), so `cmp` gives no warning on the first run.
4. Automation key with the `restrict,command=` prefix, five secrets, private key deleted; the skill
   tells the human to read the entry back (the real guarantee, see parked #15).
5. `loop2-deploy <head sha>` on the human path: fetch of all branch heads accepts the task-branch
   commit; `PREVIOUS_COMMIT=none` on the first run; checks of 127.0.0.1:18080, IPv6 18080, public
   HTTPS, kantarion, and `HostConfig.Memory` = 536870912.

After the merge, the forced path deploys the merge commit (on `main`, same script bytes → no
warning). Prerequisites the repository cannot prove and the human run will: Cloudflare reaching an
IPv6-only origin, Docker publishing 18080 on IPv6, `mem_limit` taking effect in the unprivileged
LXC, and `curl` and `cmp` being on the host (only `flock`, git and Docker were observed; both are
standard on Ubuntu). All of these surface at human action 5, before the merge.

## Access-value scan (acceptance criterion 2)

Scanned the review package diff (all 22 commits) and `git log` bodies/authors for: the server name
the `mikrus` MCP lists for this account and its derived SSH and service port numbers, Mikrus name
forms (`<word><digits>`, `*.mikrus.xyz|cloud`), IPv6 literals (`x:x:x…`, `::h`), `root@`,
`user@host.<tld>`, private-key and public-key markers. Positive controls (`loop2` 329 hits; a made-up
`abc123` matched the name form) confirm the patterns fire. Hits: only `::error::` (GitHub log
command) and `AbortSignal.timeout(10000)` (a test timeout) — neither is an access value. All 22
commits are authored with the private address. The tracked tree at e52937a holds no match either.
`.runs/` and `.superpowers/` are ignored. Clean.

## Foundation entries against the task and the code

- D-08/1, D-09/1: word for word the projected entries of `definicja_mvp_loop2.md` (§ Projected
  foundation changes), *Approved by* from the gate record, Scope filled. ✓
- D-05/3: exactly the projected wording ("…account and save routes in the loop2 container…"). ✓
  `loop2-one-serving-process/2`: exactly the projected wording; citations moved; no stale `/1`
  references remain in tests. ✓
- D-10/1 ← row 1: AAAA proxied, Origin Rule, HTTPS at Cloudflare, plain HTTP "only while no player
  account is served through this route" — a faithful rendering of "szyfrowane przed zadaniem 15
  (konta graczy)"; the IPv6-origin hypothesis is kept as a hypothesis, and no environment fact on it
  is written (correct per spec). ✓
- D-11/1 ← row 2, D-12/1 ← row 3, D-13/1 ← row 4, D-14/1 ← row 5: faithful, including the
  "docelowo zabezpieczyć" review condition of D-12 and the directory/port/script allowance of D-13. ✓
- `cloudflare-origin-rules/1` ← row 6: source, quotes and read date present. ✓
- `loop2-container-isolation/1`, `loop2-distinct-address/1`: exact projected sentences. ✓
- Part map: new `deployment` part with the planned files and trust boundary `deploy/**`;
  `tests/agent_workflow/**` added to `agent-workflow`; three external-context rows. ✓
- Consistency with code: every "complies" example matches what the code does (workflow probes the
  public address; container publishes the Origin Rule's port; skill has the agent read only;
  workflow reads the server address from a named secret). ✓

## Issues

### Critical

None.

### Important

None.

### Minor

**M1 — `deploy/loop2-deploy:130`: the revision-label read uses `docker inspect` without
`--type container`.** (Ledger Slice 3 and Slice 4 deferred line.) Without the type, an image,
network or volume named `loop2` is also a candidate, so on a host where one exists the start line,
the "previously" commit and the restore command could name the wrong thing. The script's other
inspect (`:269`) already passes `--type container`. *Fix:* add `--type container`; the skill's
command at `.claude/skills/loop2-deploy/SKILL.md:50` (and its `.agents` twin) should match.
Recommended **now**, because every change to `deploy/loop2-deploy` after human action 3 costs a
reinstall; after that point it can wait.

**M2 — `tests/invariants/test_account_server_typecheck.py:43`: the docstring claims "so nothing in
a step can overwrite what ssh sends", which parked finding #15 shows false** (a variable name
assembled at run time, e.g. `printf "$o" "${n}SHA"`, passes the reader). The ruling on #15 is sound
(below), but it says the limit is named "in the request" — a request text disappears after the
merge, while this docstring is the durable record of what the invariant check proves. *Fix (check
author, foundation step):* drop the overclaim and add to "Does NOT cover" (`:47`) that a workflow
which builds a variable or option name at run time can evade the static reading, and that the
server's forced command is what keeps the key to a rebuild of a commit of `main`.

**M3 — `deploy/loop2-deploy:71-76` with the forced path: a dropped SSH connection can kill a
deployment midway.** When the runner's connection goes away (a cancelled run, the 40-minute job
timeout, a network break), the script's next `printf` to the closed stdout raises SIGPIPE and bash
ends; a `docker compose up` writing to the dead command substitution can die with it. loop2 may then
be left stopped, while the old game is unaffected. This is reasoning about sshd without a pty, not
a tested behaviour. It is recoverable by re-running the workflow or the restore command, and the
spec's error table does not list it. *Possible fix:* `trap '' PIPE HUP` near the top and
`printf … 2>/dev/null || true` in `log`, so the run finishes and the server log records the
outcome. It can stand for a test server; worth a line in `troubleshooting.md` if not fixed.

**M4 — `foundations/part_map.md:88`: the `deployment` part records "Failure modes: none".** The
plan said "failure modes as the skill finds them", and the skill and spec name one: a failed start
(exit 8) leaves loop2 down until a human restores or a revert merges. Optional, through
`the-way-update-part-map`.

**M5 — `.github/workflows/deploy.yml:69`: the old game counts as "still working" on any 2xx, 3xx or
4xx.** A 404 or 410 from a broken old game passes the acceptance-criterion probe. Leniency avoids
false failures from a Cloudflare challenge (403) to a datacenter runner, so this is a trade-off, not
a defect; narrowing to 2xx/3xx would need a check that kantarion's root really answers 200 to a
runner. Can stand.

**M6 — GitHub's secret masking and the Actions log.** Because `DEPLOY_PORT` and `DEPLOY_USER` are
secrets, GitHub replaces their values with `***` wherever they appear in the log. That lowers the
Slice 5 deferred leak (ssh fatal errors) to the resolved shared IPv4 only — the SSH port is masked —
but it also masks innocent text equal to the user's login (for example a login of `root` turns the
script's "Docker's root directory" into "Docker's *** directory"). Cosmetic; one sentence in
`SKILL.md` "Seeing deployments" would spare a confused reader. Can stand.

**M7 — `deploy/loop2-deploy:298,312`: the server log grows without rotation**; each run appends the
whole build and `up` output. Small per run; a `logrotate` entry or a line in the skill would do.
Can stand.

**M8 — `.claude/skills/loop2-deploy/SKILL.md:72` (and twin): "the old game's state after a
failure"** — the script logs it after success too (`deploy/loop2-deploy:377`). Wording only.

## Triage of the ledger's deferred and parked lines

| Ledger line | Ruling | Why |
|---|---|---|
| S1 empty `LOOP2_LISTEN_HOST` → all interfaces | stands | Only a local user exporting an empty variable hits it; the image sets `0.0.0.0` anyway. A `||` would close it for free if `main.ts` is touched again. |
| S1 IPv6 host unbracketed in readiness line | stands | Cosmetic; no deployed configuration uses an IPv6 listen host. |
| S1 no occupied-address test on a non-default address | stands | Same code path (`host`/`port` variables); the invariant's check runs on the default. |
| S3 bare 40-hex checkout prefers a local branch of that name | stands | Git resolves a full 40-hex name to the object and ignores a same-named ref (it only warns); only a human with a shell could create such a branch. `^{commit}` would be harmless but is not needed. |
| S3 annotated tag ID accepted as a commit | stands | The workflow always sends a commit; a tag must still peel to a commit on `main`. The only effect is the label holding a tag ID, which still works as a restore argument. |
| S3 sshd `PermitUserEnvironment`/`AcceptEnv` unverified | stands | `restrict` disables user rc and forwarding; the script fixes `PATH` and `LC_ALL`; Ubuntu's default AcceptEnv is `LANG LC_*`. Optional: the skill's action 4 could add `sshd -T | grep -iE 'permituserenvironment|acceptenv'`. |
| S3 + S4 `docker inspect` without `--type container` | **fix now (M1)** | One word; free before human action 3, a reinstall after. |
| S3 constants-block comment inaccurate | stands (cheap) | `LC_ALL` and the pattern sit outside the block on purpose; if M1 is fixed, adjust the comment at `deploy/loop2-deploy:25-26` in the same commit. |
| S3 skipped fetch caught only by a seam check; no test of `main` rewound | stands | The forced fetch is `+`-forced and the ancestor test reads the fresh ref; a rewind changes nothing the script relies on. |
| S4 octal reading of a zero-padded number | stands | `/proc/meminfo` and `df` never pad. |
| S4 exit-8 message prints the probe's content type | stands | The header comes from loop2's own server; no access value can appear. |
| S4 test nits | stands | No effect on what the tests prove. |
| S4 container log lines only in the server log (ruled) | stands | The skill says where they are (`SKILL.md:68-71`, `troubleshooting.md:116`). |
| S3 `/run` lock for a non-root account (ruled, "Q20") | stands | Run account has the rights the script needs; the skill names the `tmpfiles.d` entry (`setup_and_secrets.md:26-28`). |
| S5 ssh fatal errors print the resolved address | stands | Masking (M6) hides the port; the shared IPv4 is not one of D-13's four values; the log of a private repository is not "the PR or the repository". If the repository ever turns public, old run logs should be deleted first. `LogLevel=QUIET` would hide it at the cost of diagnosis and would need the typecheck check's option list widened. |
| S5 file base64-encoded in ssh's argument | stands | The forced command ignores the client's command beyond the 40-hex check and never reads stdin. |
| S5 M5, M7–M10 (task-5-review.md) | stand | M7 (`ConnectTimeout`/`ServerAliveInterval`) is the most useful and touches M3; the others are style and test strength. |
| **S5 parked #15** — static workflow check evadable by a run-time-assembled variable name | **ruling sound; docstring fix M2** | Verified the premise in code: the forced command is outside the checkout, reads only `SSH_ORIGINAL_COMMAND`, accepts only a 40-hex commit on the freshly fetched `main`, and never reads stdin; `restrict` blocks forwarding, pty and user rc. Whatever a workflow edit sends, the server can only rebuild a commit of `main`, and the image is built by the repository's Dockerfile, which type-checks. So the invariant `account-server-typecheck/1` holds by the server, not by the static reading. What the ruling misses: the limit belongs in the check's own "Does NOT cover", not only in the request (M2). |

## Recommendations

- Do M1 (and the S3 comment) and M2 before human action 3; M3 is the next most valuable.
- The request body should carry the parked #15 limit and the four unverifiable prerequisites (IPv6
  origin, IPv6 publish, LXC memory limit, `curl`/`cmp` on the host) as checks of human action 5.
- After human action 5, the correction that writes the IPv6-origin environment fact should also
  record the observed resource values from the first log line, as the spec's threshold rationale
  promises.

## Declined to judge

- Real `flock` serialization, real sshd behaviour of the forced command, and Docker on the Mikrus
  LXC — not runnable here; human action 5 and the first automated run are their tests.
- Whether Cloudflare reaches an IPv6-only origin and Docker publishes 18080 on IPv6 — the spec
  leaves these to the human's observation.
- Adequacy of the 1024 MiB / 4 GiB thresholds and of `mem_limit: 512m` — the spec accepts them as
  expectations to be tuned from logged values.
- Port 18080 answering anyone over IPv6 in plain HTTP, and a stolen automation key switching loop2
  to an older commit of `main` — accepted by D-09/D-10 and the spec until task 15.
- The contents of the owner's private note and of the GitHub secrets — outside the repository.
- The internals of `.the-way` and the format guards — evidence was supplied, not re-run.
- Line-by-line correctness of the 771-line invariant shell reader — reviewed through its
  docstrings, the slice reviews' deliberate breaks and the passing suite, not re-derived.

## Re-review after 6bba3d2

Scope: e52937a..6bba3d2 (6643314 for M1, 6bba3d2 for M2). Only the fix diff was read, and no suite
was re-run.

- **M1 — ADDRESSED.** `deploy/loop2-deploy:130` now reads `docker inspect --type container …`. The
  stub matchers in `tests/deploy/deploy_script_support.py:369-372` and the pinned arguments in
  `tests/deploy/test_loop2_deploy_commit.py:50` were moved to match. No other stub or test of the
  deployment script still matches the old form; the remaining `inspect --format` hits in
  `tests/invariants/test_loop2_container_isolation.py:152,156` are its made-up reader fixture, not
  the script. Residue, which does not block: the skill's read command at
  `.claude/skills/loop2-deploy/SKILL.md:50` and its `.agents` twin still has no `--type container`,
  so the same ambiguity remains for a human or agent who runs it by hand. It is a one-line change
  in both copies. The S3 constants-block comment was left unchanged, which is acceptable.
- **M2 — ADDRESSED.** The overclaim "so nothing in a step can overwrite what ssh sends" is gone.
  The workflow bullet now says the reading is static and fails closed. "Does NOT cover" now names
  run-time-assembled variable and option names, with the #15 example, and puts the guarantee where
  it lives: the forced command outside the repository, which no test here checks. The change is
  confined to the docstring, so no code changed.
- **New breakage in the fix diff:** none found. The pinned argument order (`inspect --type
  container --format <tmpl> loop2`) matches the script's call. The old-game matcher
  `inspect --type container * loop` cannot catch the loop2 call, because it needs the last word to
  be `loop`, and the rule order is unchanged.

Verdict: both fixes are addressed. The branch remains ready to merge.
