# Setup observations for PR 11

Observed by the orchestrator through read-only tools on 2026-10-13. Access values and key material are deliberately absent. This is evidence, not an explanation of mechanisms.

## Human reports

The owner confirms configuring a proxied AAAA record for loop2.mariusznazar.com to the host's IPv6, a hostname-scoped Origin Rule to destination port 18080, and a hostname-scoped Configuration Rule using Flexible SSL. The owner generated a repository key, added it read-only in GitHub, configured the github-loop2 SSH alias, cloned /srv/loop2, installed the script and generated a distinct automation key. The owner created all five Actions secrets and ran the first deployment, reporting `deployed 1dcc5cdef49fa80a6b9057ea2152677ab13db7c1, previously none`.

## Independent observations

- `gh api repos/<repository>/keys`: the deployment key is read-only.
- `gh secret list --repo <repository>`: DEPLOY_HOST, DEPLOY_PORT, DEPLOY_USER, DEPLOY_SSH_KEY, DEPLOY_KNOWN_HOSTS exist; secret contents were not read.
- The automation key has exactly one authorized_keys entry, equal to `restrict,command="/usr/local/bin/loop2-deploy"` plus its public half. Key values were not copied into this report.
- Installed script: 0755, root:root. Its SHA256 equals deploy/loop2-deploy from 1dcc5cdef49fa80a6b9057ea2152677ab13db7c1. `bash -n` passed.
- Before deployment, checkout status and `git clean -n -ffdx` were empty. MemAvailable was 3503 MiB; Docker filesystem had 22221 MiB available. Port 18080 was unused.
- Tools observed on the host: Docker 28.1.1 build 4eba377; Docker Compose v2.35.1; curl 7.81.0 x86_64-pc-linux-gnu; Ubuntu 22.04.5 LTS; Linux 5.15.158-2-pve x86_64.
- `docker ps`: loop2 healthy, loop healthy, foundryvtt healthy.
- `docker inspect --type container` for loop2: revision 1dcc5cdef49fa80a6b9057ea2152677ab13db7c1; HostConfig.Memory=536870912; health=healthy.
- `docker stats --no-stream` for loop2: 46.27 MiB / 512 MiB. A subsequent direct read, `docker inspect --type container --format '{{.State.Pid}}' loop2 | xargs -I PID cat /proc/PID/root/sys/fs/cgroup/memory.max`, returns 536870912. This independently reads the container's cgroup hard-limit setting; no deliberate memory-exhaustion stress test was run.
- On-host `curl` to http://127.0.0.1:18080/: 200 text/html; unknown /api/ route: 404 application/json.
- On-host curl -6 to the host's global IPv6 at port 18080: 200 text/html. This is an on-host probe, not an independent external IPv6 probe.
- Independent public requests from Windows: https://loop2.mariusznazar.com/ returns 200 text/html; /api/unknown-path-probe returns 404 application/json; https://kantarion.bieda.it/ returns 200 text/html.
- Repeated public API request with a unique query: 404 application/json, X-Powered-By Express, Server cloudflare, cf-cache-status DYNAMIC. This demonstrates a dynamic Cloudflare public route; inference of its IPv6 upstream also uses the owner's DNS/rule report, since the private Cloudflare dashboard was not read by the agent.
- Further direct network observation: `curl --silent --show-error --max-time 20 --output /dev/null --write-out 'public-api %{http_code}\n' 'https://loop2.mariusznazar.com/api/unknown-path-probe?ipv6-evidence=1' && ss -6 -nt 'sport = :18080' && ss -V` through mikrus returns public API 404 and one ESTAB IPv6 connection to local port 18080. The peer is in 2400:cb00::/32, which Cloudflare lists at https://www.cloudflare.com/ips-v6 (read 2026-10-13). Local and peer addresses are withheld. ss reports iproute2-5.15.0; curl version and host platform above apply. This is direct evidence of an incoming Cloudflare IPv6 connection, not merely a self-request to the host's global address. Private dashboard settings and the connection's HTTP/TLS contents remain separate observations.
- Public DNS query for DEPLOY_HOST returns a public IPv4. IPv4 SSH keyscan from the host to its own external mapping did not return a key; external runner reachability has not been tested. The pinned host key was read directly from /etc/ssh/ssh_host_ed25519_key.pub instead.

## Still pending

- The owner confirms removing the temporary private automation-key file; read-only test independently confirms it is absent.
- The owner chooses to finish PR 11 with present routing and carry TLS/origin restriction context to task 15, with Cloudflare Tunnel as a proposed solution to weigh there. The public-origin projected entry remains assigned to task 15 by the approved plan; no change to that assignment was requested.
- First real GitHub Actions run is after the merge. No code changed during setup.
- Correction started on the existing task worktree; git merge origin/main reported already up to date, base 170118680abec6760291df5d13f908c58409f867. Gitlink and submodule pin match d04c3feb1a47e0ffc9a3b2354c23aacafe25c74b. Installed Superpowers plugin.json confirms 6.4.1.
