# Final scoped review: setup correction to PR 11

Reviewed range: `1dcc5cdef49fa80a6b9057ea2152677ab13db7c1..0d92d2ee7c01a630d4cae659a49b6390c68f7f8a` in `C:/Storage/repos/loop2-serwer-testowy`, branch `task/serwer-testowy`. The complete correction changes only `foundations/decisions.md` and `foundations/environment_facts.md` (49 insertions, 14 deletions). Also inspected the three nested context bullets at `C:/Storage/The Brain/The Brain/Notes/Projects/(P) Loop/plan_mvp_loop2.md:147`.

Requirement: retain supported external-state premises observed during first deployment, preserve accepted binding decisions and deployment code, close the three prior assessment findings, and carry the owner's routing discussion to task 15 without selecting a new architecture or refining that whole task.

Read the code-review playbook first, then Superpowers 6.4.1 requesting-code-review and its reviewer template. This was a scoped final review, not another foundation critique or a repeat of the original PR review. No subagents, server changes, checkout/index/HEAD changes or vault changes were made. Only this ignored report was written.

## Blockers — Critical

None found in the reviewed scope.

## Warto poprawić — Important

None found in the reviewed scope.

## Nity — Minor

None reported; stylistic suggestions are outside this correction review.

## Dobre — verified results

### 1. The recorded observations stay within their evidence

**Kotwica:** `C:/Storage/repos/loop2-serwer-testowy/foundations/environment_facts.md:35` (also :43, :51, :59 and :67).

**Status:** resolved prior findings; no new review thread.

**Do wklejenia:** The five retained facts are supported by independent read-only observations. The IPv6 fact records an established incoming connection from a published Cloudflare range; it does not infer private DNS/rule configuration or response-body contents from HTTP headers.

**Dlaczego to zgłaszam:** These entries preserve reasons for decisions about external settings and the shared host. The forced-command prefix count is 1; the installed file is `755 root:root`; the two other named workloads appear in `docker ps`; `SwapTotal` is `0 kB`. The exact IPv6 Source command independently returned `public-api 404; Cloudflare IPv6 origin connections: 1`. It reads established IPv6 sockets with local port 18080 and tests their remote peers against Cloudflare's fetched published IPv6 ranges. That directly supports the narrow TCP-connectivity statement. It does not establish the dashboard's AAAA or rule settings, HTTP versus TLS payloads, or that the counted key is the Actions key. Those stronger assertions are absent from the facts.

The public-response and numeric-memory fact identifiers and their citations are absent from the final foundation; the workloads sentence no longer contains health. Their removal closes the prior concern that an ordinary status response or adjustment of the configured memory number would unnecessarily become an architecture premise. A JSON-body assertion from the headers-only command is also absent. No further correction is needed here.

### 2. The correction preserves binding decisions and removes one-run history

**Kotwica:** `C:/Storage/repos/loop2-serwer-testowy/foundations/decisions.md:270` (also :284, :366, :416, :446 and :462).

**Status:** resolved prior findings; no new review thread.

**Do wklejenia:** All 21 decision-version binding paragraphs are unchanged across the full correction range. The updated dependencies and rationales retain external-state premises while removing the chronology of unread configuration and tests not yet run.

**Dlaczego to zgłaszam:** D-10 still chooses the existing public routing and permits plain HTTP to the origin only before player accounts. D-14 still chooses Docker, D-16 the installed root-owned command, and D-17 the shared-host limits. Exact comparison of each decision heading and its text before `Change` found 21 entries on both sides, no changed binding entry and no new entry. The new fact citations are consistent with those reasons. Their fingerprints and versions pass the pinned guards against actual main. The remaining note that memory and disk are transient describes why each build reads them again, rather than reporting the outcome of a particular deployment. This closes the previous chronology finding without pretending pending checks passed.

### 3. Task 15 carries the future decision without making it now

**Kotwica:** `C:/Storage/The Brain/The Brain/Notes/Projects/(P) Loop/plan_mvp_loop2.md:147` (also :148 and :149).

**Status:** scoped context check; no new review thread.

**Do wklejenia:** The three bullets distinguish the current account-free deployment, the transport and direct-access work required before accounts, and Tunnel as a candidate to compare with an HTTPS origin. They explicitly leave the choice to task 15 and finish PR 11 with current routing.

**Dlaczego to zgłaszam:** The existing parent question concerns the session secret and trust in the HTTPS proxy, so the added routing context sits where the later account task needs it. The current app uses Express `listen`, with an HTTP startup URL, and Compose publishes `18080:3000`; these support the statement that changing the Cloudflare mode alone does not make this app serve HTTPS. The owner's report is the source of the private Flexible/AAAA/Origin Rule configuration, not an independently read dashboard. The bullets do not claim otherwise. Their requirement to encrypt and restrict direct access is stated for the future account launch; the Tunnel text remains expressly proposed and includes the certificate/proxy alternative and setup cost.

The linked [origin protection documentation](https://developers.cloudflare.com/fundamentals/security/protect-your-origin-server/) describes Tunnel's outbound connections and the need for `cloudflared`, as well as separate origin access restrictions. [Origin CA documentation](https://developers.cloudflare.com/ssl/origin-configuration/origin-ca/) describes installing and configuring the certificate before using Strict mode; [Full (strict) prerequisites](https://developers.cloudflare.com/ssl/origin-configuration/ssl-modes/full-strict/) require an HTTPS-capable origin and an appropriate certificate. These support the distinction in the bullets. No architecture selection or task-goal change is introduced by the appended text.

## Exact checks and results

All checks below were performed on 2026-10-13.

- `git rev-parse HEAD` and `git rev-parse 0d92d2e` both returned `0d92d2ee7c01a630d4cae659a49b6390c68f7f8a`. `git status --short` was empty before the report and before its creation.
- `git diff --stat`, `git diff --numstat`, `git diff --name-only`, and the full diff for the stated base/head confirmed the two-file scope. `git diff --check 1dcc5cdef49fa80a6b9057ea2152677ab13db7c1 0d92d2ee7c01a630d4cae659a49b6390c68f7f8a` exited 0 without diagnostics.
- `git ls-files --stage -- .the-way` and `git -C .the-way rev-parse HEAD` both gave `d04c3feb1a47e0ffc9a3b2354c23aacafe25c74b`.
- `git symbolic-ref --short refs/remotes/origin/HEAD` returned `origin/main`; `git merge-base HEAD origin/main` and `git rev-parse origin/main` both returned `170118680abec6760291df5d13f908c58409f867`.
- Read both guards' `--help`, the environment-facts template and common entry rules. Installed Superpowers plugin metadata reports `6.4.1`.
- `python -B .the-way/elements/environment-facts/format_guard.py foundations/environment_facts.md --base 170118680abec6760291df5d13f908c58409f867 --merge-onto 170118680abec6760291df5d13f908c58409f867`: exit 0, `0 error(s), 0 warning(s), 0 unchecked`; notes that no human-verdict file exists.
- `python -B .the-way/elements/decisions/format_guard.py foundations/decisions.md --base 170118680abec6760291df5d13f908c58409f867 --merge-onto 170118680abec6760291df5d13f908c58409f867`: exit 0, `0 error(s), 0 warning(s), 0 unchecked`; notes that approval is checked only in the-way's own log.
- A Python read-only comparison used `git show` on both full revisions, split decisions at each `### ` heading, and compared each heading and all text preceding `- **Change:**`, with outer whitespace stripped. Result: `binding_entries: 21 21`, `changed_binding_entries: []`, `new_binding_entries: []`.
- Searched both final foundation files for `loop2-public-cloudflare-route|loop2-host-memory-limit|has not run|healthy|not been read|no independent cgroup|first deployment`: no matches. The full changed hunks were read, so this is corroboration rather than a substitute for inspection.
- Read the prior assessment and settlement, the final setup-facts report, primary setup observations, the appended task-15 bullets and surrounding questions, and the small app/entry-point and Compose surfaces needed for the scoped HTTP claim.
- Used Mikrus `servers` to obtain the target, then only read-only `exec` calls. No access identifiers, key values or server addresses are reproduced here.

Independent server observations:

```text
python3 -c 'from pathlib import Path; lines=(Path.home()/".ssh/authorized_keys").read_text().splitlines(); print(sum(line.startswith("restrict,command="+chr(34)+"/usr/local/bin/loop2-deploy"+chr(34)+" ") for line in lines))'
=> 1

stat -c '%a %U:%G' /usr/local/bin/loop2-deploy
=> 755 root:root

docker ps --format '{{.Names}} {{.Status}}'
=> loop2, loop and foundryvtt are running; transient health/uptime is not promoted into a fact.

python3 -c 'from pathlib import Path; print(next(line for line in Path("/proc/meminfo").read_text().splitlines() if line.startswith("SwapTotal:")))'
=> SwapTotal: 0 kB
```

The swap re-read deliberately prints only that field, rather than all transient memory readings; it reads the same source as the entry's `cat /proc/meminfo`.

The following is the exact IPv6 Source command from the entry; it emits a status/count, never local or remote addresses:

```sh
python3 -c 'import ipaddress, subprocess; ranges=[ipaddress.ip_network(line) for line in subprocess.check_output(["curl", "--silent", "--show-error", "--fail", "--max-time", "20", "https://www.cloudflare.com/ips-v6"], text=True).splitlines()]; subprocess.run(["curl", "--silent", "--show-error", "--max-time", "20", "--output", "/dev/null", "--write-out", "public-api %{http_code}", "https://loop2.mariusznazar.com/api/unknown-path-probe?ipv6-evidence=3"], check=True); rows=subprocess.check_output(["ss", "-6", "-nt", "state", "established", "sport = :18080"], text=True).splitlines()[1:]; peers=[ipaddress.ip_address(row.split()[-1].rsplit(":", 1)[0].strip("[]")) for row in rows]; print("; Cloudflare IPv6 origin connections:", sum(any(peer in network for network in ranges) for peer in peers))'
```

Result: `public-api 404; Cloudflare IPv6 origin connections: 1`. Independently opened [Cloudflare's published IPv6 ranges](https://www.cloudflare.com/ips-v6). No owner identifier was included in external research queries; documentation reads used only publisher URLs. The application GET above is the cited source probe, not an external research query.

Tool/platform check:

```sh
python3 -c 'import subprocess, platform; commands=[["python3", "--version"],["docker", "--version"],["stat", "--version"],["curl", "--version"],["ss", "--version"],["uname", "-srmo"]]; [print(subprocess.check_output(command, text=True).splitlines()[0]) for command in commands]; print(platform.freedesktop_os_release()["PRETTY_NAME"])'
```

Confirmed Python 3.10.12; Docker 28.1.1 build 4eba377; GNU coreutils 8.32; curl 7.81.0; ss iproute2-5.15.0; Linux 5.15.158-2-pve x86_64; Ubuntu 22.04.5 LTS.

An initial Mikrus invocation used the wrong argument name and was rejected (`Brak pola 'cmd'`); a multiline batch returned `bash: -c: option requires an argument`. Neither supplied positive evidence. Each relevant observation was then successfully rerun as the single commands above. A speculative local filename `src/server/server.ts` did not exist; `rg --files src/server` located the actual `main.ts`, which was read. These tool errors do not count as successful checks.

## Limits and unchecked work

Each of the five new facts still has `Method: TODO`: its ordinary method remains unchecked. The passing guards check format, version and citation integrity; the independent Source re-reads support source fidelity but do not become recorded method passes. No human-verdict row was created.

The prefix count proves the restricted command entry exists once, not that it is the Actions key or that end-to-end authentication works. `stat` proves mode/owner, not installed program contents or byte identity. The IPv6 socket observation proves an incoming established connection from Cloudflare's published range, not exact dashboard settings, a causal one-to-one match to that particular GET, or HTTP/TLS contents. The fact's wording does not require those stronger conclusions.

Private Cloudflare settings were not independently read; the task context's current settings retain the owner's reported provenance. The external Actions runner's SSH path and first post-merge workflow run were not tested. No secrets or key material were read for this review. No direct public-origin probe, memory stress or cgroup enforcement test was run in this correction review. No product tests were rerun: the full correction changes only the two foundation documents. No invariant or invariant test changed, so no deliberate break was required or performed.

## Declined to judge

- The original PR's deployment implementation, broad regression coverage and merge readiness beyond this correction: already reviewed separately; this range adds no deployment code.
- Whether Tunnel or the certificate/proxy alternative should be selected, installed or costed fully: the owner leaves this to task 15, and the inspected bullets make no selection.
- Whether the current account-free routing should be replaced before closing PR 11: the owner explicitly chooses current routing; this review checks faithful recording and the account prerequisite.
- The complete account/session design, email setup, trust-proxy values, cookie policy and task-15 readiness: outside the three appended context bullets; no whole-task refinement was requested.
- Private Cloudflare dashboard truth, automation key identity/end-to-end use, installed script byte identity and real Actions runner reachability: not established by these fact Source commands and not asserted as independently verified by this review.
- Ordinary fact-method implementation, recorded passes and deliberate-break infrastructure: explicitly absent as `TODO`; no claim of their success was reviewed or made.
- Style-only revisions or another round of independent foundation critique: outside the correction's bounded final verification.

## Verdict

**Ready to merge this setup correction: Yes.** No actionable findings in the scoped range. The three prior findings are closed, the narrow new IPv6 premise is directly supported, binding decision text and deployment code are unchanged, and task 15 retains the future routing choice without selecting it now. This verdict does not turn the pending methods or post-merge Actions run into passes.
