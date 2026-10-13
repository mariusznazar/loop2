# Setup environment-fact correction

Final correction commit: `0d92d2ee7c01a630d4cae659a49b6390c68f7f8a` (`docs: separate deployment evidence from environment premises`). Initial observation commit: `252665d4b2db34ea5a37dafad682821ea5a5dcab`. No push performed. This report describes the resulting set, superseding its earlier wording.

## Scope and settlement

Only `foundations/environment_facts.md` and `foundations/decisions.md` are committed. This ignored report is the sole retained artifact written by this correction. No server mutation, code, invariant, skill, plan or PR-question edit was made. The stage stops before the next review.

The gitlink and submodule match `d04c3feb1a47e0ffc9a3b2354c23aacafe25c74b`. Work follows the project record-environment-fact and record-decision skills and their pinned rules, templates and examples already read in this stage. The full independent assessment and updated primary setup observations were read before applying the orchestrator's settlement.

All three assessment findings are accepted:

1. Public-response and Docker memory-configuration results are verification evidence, not premises for keeping the architecture choices. Their two new facts and citations are removed. Neither identifier reached main, so no withdrawn identifier is required. The host-workloads sentence no longer includes the transient health state; its fingerprint changes to `f130b704` and both dependent citations follow it.
2. One-time unperformed-test and unread-setting chronology is removed from decision rationales. Present design reasons remain. No approved binding sentence changes.
3. Headers-only curl results establish HTTP status and the declared Content-Type, not a JSON body. No body-content claim is retained in the foundation or made in this report.

## Resulting facts and dependants

- `loop2-host-forced-command-entry/1` -> D-16: the exact restricted forced-command prefix occurs once in authorized_keys. This fact does not independently identify the entry's key as the Actions key.
- `loop2-host-installed-command/1` -> D-16: the installed command is root-owned with mode 0755.
- `mikrus-host-docker-workloads/1` -> D-14 and D-17: the other workloads run as Docker containers, without binding a decision to their transient health.
- `mikrus-host-swap/1` -> D-17: the host reports no swap.
- `cloudflare-test-origin-ipv6/1` -> D-10: Cloudflare establishes IPv6 TCP connections to the test server's published port 18080.

Every new fact has a dependant. No invariant depends on the changed fact fingerprints. The four dependent decision entries remain version 1 because none exists on current main. Their approval remains the human's merge of PR 11. A mechanical comparison of all 21 decision-version binding paragraphs before and after the correction, with whitespace normalized, reports them unchanged.

## Independent observations

Primary setup evidence: `docs/task-cycles/serwer-testowy/reports/setup-observations.md`. Independent assessment: `docs/task-cycles/serwer-testowy/reports/setup-assessment.md`. Commands are read-only; server selection came from the servers tool, and no access addresses or key material are retained here.

The initial correction independently repeated the forced-command-prefix count, installed ownership and mode, other containers' presence, SwapTotal, Docker memory configuration, versions and public response headers. Tools: Docker 28.1.1 build 4eba377, Docker Compose v2.35.1, Python 3.10.12, GNU coreutils 8.32, curl 7.81.0, Ubuntu 22.04.5 LTS and Linux 5.15.158-2-pve x86_64; public Windows curl is 8.21.0.

Headers-only public probes returned 404, `Content-Type: application/json; charset=utf-8`, `Server: cloudflare` and `cf-cache-status: DYNAMIC`; the root returned 200 with declared text/html. Bodies were discarded, so those commands do not establish valid JSON content or the identity of a response body. These results remain deployment evidence only. The on-host request to the host's global IPv6 is still an on-host probe, distinct from observing an external peer.

For the new capability fact, the exact Source command printed in its final entry was run twice through Mikrus MCP. It fetches Cloudflare's published IPv6 ranges using curl, makes the public API request, reads established IPv6 TCP connections whose local port is 18080 using ss, and checks each peer against the fetched ranges using Python ipaddress. Both runs returned:

```
public-api 404; Cloudflare IPv6 origin connections: 1
```

No local or peer address was emitted. The published range list at `https://www.cloudflare.com/ips-v6` was also opened independently; it lists `2400:cb00::/32` as well as the other Cloudflare IPv6 ranges. Host curl returned that same list. Python urllib initially received HTTP 403 when reading the published URL; that failed attempt is not the Source command and supplies no positive evidence. The successful command uses host curl for the list. ss reports iproute2-5.15.0; Python, curl and host versions were read directly again. The observed established connection demonstrates the narrow IPv6 TCP capability, not private DNS/rules, a particular origin IP or HTTP/TLS contents. If that capability ceases to hold, D-10's direct Cloudflare-to-IPv6 publication route needs reassessment; a single public API response failing does not by itself establish that loss.

The direct command `docker inspect --type container --format '{{.State.Pid}}' loop2 | xargs -I PID cat /proc/PID/root/sys/fs/cgroup/memory.max` independently returned `536870912`. This reads the cgroup hard-limit setting, in addition to the earlier Docker HostConfig and stats observations. No memory-exhaustion stress test ran. The numeric bound remains verification of the deployed Compose setting, not a decision premise that would force architectural review whenever the chosen bound changes.

## Checks and unchecked work

Real base and merge target are both current main commit `170118680abec6760291df5d13f908c58409f867`, read from git. The guards' --help was read. Final runs:

```
python -B .the-way/elements/environment-facts/format_guard.py foundations/environment_facts.md --base 170118680abec6760291df5d13f908c58409f867 --merge-onto 170118680abec6760291df5d13f908c58409f867
note: there is no human_verdicts.md; no human verdict is given
0 error(s), 0 warning(s), 0 unchecked

python -B .the-way/elements/decisions/format_guard.py foundations/decisions.md --base 170118680abec6760291df5d13f908c58409f867 --merge-onto 170118680abec6760291df5d13f908c58409f867
note: who approves a version is checked only in the-way's own log
0 error(s), 0 warning(s), 0 unchecked
```

Both final guards exit 0; git diff --check exits 0. An intermediate decision guard found Rejected accidentally joined to the preceding rationale line; the newline was restored before both final checks and commit. No product tests ran because this correction changes only foundation documentation and references.

Each of the five new facts has Method TODO and remains unchecked. Passing format guards establishes shape and reference integrity, not a passed fact method. The observation commands are not declared citing checks producing fact verdict records. No probe infrastructure, human-verdict row or deliberate-break claim is introduced. A TODO method hands on no check; whether WAY-08's deliberate break binds fact methods remains the pinned template's unresolved question.

## Boundaries and open verification

No required field of the five written facts is blocked; the missing ordinary methods remain explicit TODO. Private Cloudflare settings are not recorded as observed facts. The owner reports the configured AAAA and hostname-scoped rules, but an established IPv6 connection does not reveal the dashboard state or whether its contents are HTTP or TLS. The pinned template's Source form for setter-only settings remains unresolved and is not forced into a fact here.

The external GitHub Actions runner's SSH connectivity and the key's complete authentication path are still untested. Its first real workflow run follows the merge. The owner confirms temporary private automation-key cleanup and the primary observations record independent absence verification. The owner keeps current routing for PR 11 and carries TLS plus direct-origin restriction to task 15; Cloudflare Tunnel is a proposed approach to weigh there, not an architecture switch approved by this correction. The orchestrator updated the existing plan's task-15 question and reports plan_check passing; this stage did not edit that plan.

Keeping only the setting/world premises and the narrow IPv6 capability reduces unnecessary dependency churn. Deployment health, response headers and the configured memory value stay as verification evidence instead of causing decision changes with ordinary operational state. The resulting five fact methods still need ordinary checks in later work.

## Full final wording: facts added during setup

## loop2-host-forced-command-entry/1

The test server's authorized_keys contains exactly one entry beginning with `restrict,command="/usr/local/bin/loop2-deploy"`.

- **Holds for:** the test server's authorized_keys on Ubuntu 22.04.5 LTS
- **Source:** observed: `python3 -c 'from pathlib import Path; lines=(Path.home()/".ssh/authorized_keys").read_text().splitlines(); print(sum(line.startswith("restrict,command="+chr(34)+"/usr/local/bin/loop2-deploy"+chr(34)+" ") for line in lines))'` on Python 3.10.12, Ubuntu 22.04.5 LTS; run 2026-10-13
- **Method:** TODO

## loop2-host-installed-command/1

The installed `/usr/local/bin/loop2-deploy` is owned by root:root with mode 0755.

- **Holds for:** the installed deployment command on Ubuntu 22.04.5 LTS
- **Source:** observed: `stat -c '%a %U:%G' /usr/local/bin/loop2-deploy` on GNU coreutils 8.32, Ubuntu 22.04.5 LTS; run 2026-10-13
- **Method:** TODO

## mikrus-host-docker-workloads/1

The old loop game and foundryvtt run as Docker containers on the test server's host.

- **Holds for:** Docker 28.1.1 build 4eba377 on Ubuntu 22.04.5 LTS, Linux 5.15.158-2-pve x86_64
- **Source:** observed: `docker ps --format '{{.Names}} {{.Status}}'` on Docker 28.1.1 build 4eba377, Ubuntu 22.04.5 LTS; run 2026-10-13
- **Method:** TODO

## mikrus-host-swap/1

The test server's host reports zero total swap in `/proc/meminfo`.

- **Holds for:** Ubuntu 22.04.5 LTS, Linux 5.15.158-2-pve x86_64
- **Source:** observed: `cat /proc/meminfo` on GNU coreutils 8.32, Ubuntu 22.04.5 LTS, Linux 5.15.158-2-pve x86_64; run 2026-10-13
- **Method:** TODO

## cloudflare-test-origin-ipv6/1

Cloudflare establishes IPv6 TCP connections to port 18080 on the test server.

- **Holds for:** the test server's published origin port 18080 on Ubuntu 22.04.5 LTS, Linux 5.15.158-2-pve x86_64
- **Source:** observed: `python3 -c 'import ipaddress, subprocess; ranges=[ipaddress.ip_network(line) for line in subprocess.check_output(["curl", "--silent", "--show-error", "--fail", "--max-time", "20", "https://www.cloudflare.com/ips-v6"], text=True).splitlines()]; subprocess.run(["curl", "--silent", "--show-error", "--max-time", "20", "--output", "/dev/null", "--write-out", "public-api %{http_code}", "https://loop2.mariusznazar.com/api/unknown-path-probe?ipv6-evidence=3"], check=True); rows=subprocess.check_output(["ss", "-6", "-nt", "state", "established", "sport = :18080"], text=True).splitlines()[1:]; peers=[ipaddress.ip_address(row.split()[-1].rsplit(":", 1)[0].strip("[]")) for row in rows]; print("; Cloudflare IPv6 origin connections:", sum(any(peer in network for network in ranges) for peer in peers))'` on Python 3.10.12, curl 7.81.0 and ss from iproute2-5.15.0, Ubuntu 22.04.5 LTS; run 2026-10-13
- **Method:** TODO

## Full final wording: dependent decisions

### D-10/1 — How do players reach loop2 on the server?

Players reach loop2 at `https://loop2.mariusznazar.com/`, which Cloudflare proxies to the server: a
proxied AAAA record points at the server's IPv6 address, and an Origin Rule sends the requests to
the port the loop2 container publishes. Players connect to Cloudflare over HTTPS, and Cloudflare
connects to the server over plain HTTP only while no player account is served through this route.

- **Change:** new decision
- **Scope:** deployment
- **Based on:** cloudflare-origin-rules@6f0ea4e4 · cloudflare-configuration-rules@939e4e91 · cloudflare-test-origin-ipv6@02f0487a · Cloudflare network ports, "By default, Cloudflare proxies traffic destined for the HTTP/HTTPS ports listed below." (https://developers.cloudflare.com/fundamentals/reference/network-ports/, read 2026-10-13)
- **Relations:** derives from D-08@e4e8a2f4
- **Verification:** level 2 — an agent compares the change with the decision:
  - complies: a change whose workflow requests `https://loop2.mariusznazar.com/` after a deployment and whose container publishes the port the Origin Rule names
  - violates: a public address on a Mikrus subdomain for loop2; a task that serves player accounts through this route while Cloudflare still connects to the server over plain HTTP
- **Review when:** a task is about to serve player accounts through this route, which needs the connection from Cloudflare to the server encrypted first · check by: 2027-01-13
- **Origin:** serwer_testowy_loop2.md in the vault (Notes/Projects/(P) Loop), § Questions to settle, "Pod jakim adresem stanie loop2 na Mikrusie?"
- **Approved by:** Mariusz, merge of https://github.com/mariusznazar/loop2/pull/11

*Rationale:* Cloudflare already holds the `mariusznazar.com` domain, gives players HTTPS without a
certificate in the container, and reaches the container's port through an Origin Rule, while both
public IPv4 service ports of the host are taken by other workloads, the old loop game and another.
Plain HTTP from Cloudflare to the server is accepted only while the test server holds no player
data, since HTTPS for players is not end-to-end encryption; a Configuration Rule sets that
encryption mode for this hostname alone, so the old game's route keeps its own. IPv6 lets
Cloudflare reach loop2 without taking a shared public IPv4 service port.
*Rejected:* a new free Mikrus subdomain — ties the game's address to the hosting provider; serving
loop2 at `kantarion.bieda.it` in place of the old game — would reopen the approved MVP definition.

### D-14/1 — What kind of container does loop2 run in?

The loop2 container is a Docker container.

- **Change:** new decision
- **Scope:** deployment
- **Based on:** mikrus-host-docker-workloads@f130b704
- **Relations:** derives from D-08@e4e8a2f4
- **Verification:** level 2 — an agent compares the change with the decision:
  - complies: a Compose file and a Dockerfile from which Docker builds and runs the loop2 container
  - violates: loop2 run as a service directly on the host, or in a container of another runtime
- **Review when:** none
- **Origin:** serwer_testowy_loop2.md in the vault (Notes/Projects/(P) Loop), § Questions to settle, "Czy kontener loop2 jest kontenerem Dockera?"
- **Approved by:** Mariusz, merge of https://github.com/mariusznazar/loop2/pull/11

*Rationale:* the host already runs Docker with Compose, and the old loop game runs there in a Docker
container, so loop2 is run with the tool the host is already operated with.
*Rejected:* none considered

### D-16/1 — What does the automation's key run on the server?

The automation's key runs only a root-owned installed copy of the deploy script, kept outside the
server's checkout, so no pushed commit changes what the key runs. Each deployment compares that copy
with the script's source at the deployed commit and only warns when they differ, and reinstalling
the copy is a human's change.

- **Change:** new decision
- **Scope:** deployment
- **Based on:** openssh-authorized-keys-options@3fd0389d · loop2-host-forced-command-entry@85efd8cc · loop2-host-installed-command@491651f8
- **Relations:** derives from D-09@20be369f · derives from D-12@d5196ed7
- **Verification:** level 2 — an agent compares the change with the decision:
  - complies: an `authorized_keys` entry whose forced command names the installed copy's path; a deployment that logs the difference between the copies and goes on
  - violates: a forced command that points into the server's checkout; a deployment that reinstalls its own script
- **Review when:** a task is about to serve player accounts through loop2, since a stolen automation key can switch loop2 to any earlier commit of `main` until the next push · check by: 2027-01-13
- **Origin:** none
- **Approved by:** Mariusz, merge of https://github.com/mariusznazar/loop2/pull/11

*Rationale:* what the key can run stays what a human installed, whatever a pushed commit holds. A
warning rather than a refusal keeps a rollback to a commit older than the last change of the source
possible. A stolen key can still redeploy an earlier commit of `main`; that is accepted while the
test server holds no player data. Code merged into `main`, its container build and service
definitions included, runs on the host with root's authority through the deployment, so it is
trusted code and whoever can merge to `main` can act on the host; the trust boundary stays with the
files that take in data the product does not trust.
*Rejected:* a forced command that runs the checkout's own copy — a pushed commit could change what
the key runs; a deployment that refuses when the copies differ — every rollback past a change of the
source would stop.

### D-17/1 — How does loop2 share the Mikrus host with other workloads?

A deployment of loop2 changes nothing on the host but loop2's own checkout, image, container, log
and lock, and the build cache and base image its build adds to the Docker store the host's
workloads share, which it never prunes; it removes or replaces nothing of another workload. It
builds only while the host's available memory and free disk stay above thresholds the repository
sets, and the loop2 container runs under a memory limit.

- **Change:** new decision
- **Scope:** deployment
- **Based on:** mikrus-host-docker-workloads@f130b704 · mikrus-host-swap@e1933cc7
- **Relations:** derives from D-08@e4e8a2f4
- **Verification:** level 1 — invariants: loop2-host-sharing. Level 2 for the thresholds and the memory limit — an agent compares the change with the decision:
  - complies: a deployment that refuses to build while available memory is below its threshold and leaves the running container untouched; a Compose service with a memory limit
  - violates: a build started without reading the host's memory and disk; a Compose service with no memory limit
- **Review when:** a task needs more memory than the container's limit, or the values each deployment logs show the thresholds refusing sound builds or letting through builds that exhaust the host · check by: 2027-04-13
- **Origin:** none
- **Approved by:** Mariusz, merge of https://github.com/mariusznazar/loop2/pull/11

*Rationale:* the host is shared with the old loop game and another workload and has no swap, so a
build that exhausts its memory can make the kernel end a process of another workload; reading
memory and disk before the build stops a deployment before it harms them. The thresholds and the
limit are chosen bounds, not measured needs, tuned in the repository from the values each
deployment logs. Code merged into `main`, its container build and service definitions included,
runs on the host with root's authority through the deployment, so these limits hold against
mistakes in trusted code, not against whoever can merge to `main`. Free memory and disk are
transient readings, so the deployment reads them again before each build.
*Rejected:* a host-wide prune to reclaim build cache — it would remove images and cache of other
workloads, and the base image may be one another workload uses; reclaiming the build cache and
base-image layers stays a human's decision.
