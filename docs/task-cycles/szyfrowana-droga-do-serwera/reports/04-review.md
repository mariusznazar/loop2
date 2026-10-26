PASS 581b71a139f9dd9ab24fa21549e9a19a77a18ab0

# Whole-change review

Range: `7b3d450c143492fa93efbb5e53705e32838622af..581b71a139f9dd9ab24fa21549e9a19a77a18ab0`. One author commit, no slices. Reviewed HEAD matches the dispatched head. Process checkout and gitlink both name `2895e0e7860ec1f48ddc7dacd15ef6b26e731c5c`.

This verdict covers the repository change and the prepared operational procedure. It does not assert that the tunnel is deployed or that the human acceptance observations have passed. Those remain required at the blocked draft request.

## Findings by grade

- Critical: none.
- Important: none.
- Minor: none.
- Out-of-scope findings: none.

## Declined to judge

None. The human-only deployment observations below are unrun required checks, not findings silently excluded from the task.

## Review against the whole task

I reviewed code/tests first and operational documentation separately, then reconciled them with the whole frozen task and reviewed spec.

| Required result | Review evidence |
|---|---|
| Two services, versioned connector and separate memory bound | `compose.yaml` names exactly app and cloudflared with separate names, 512m and 256m limits; `deploy/cloudflared.Dockerfile` pins the official tag and digest and adds only the product ownership label. The wrapper inherits its nonroot entrypoint. |
| No direct application port | Compose publishes no port and supplies no host/external network. `tests/invariants/test_loop2_application_port.py` rejects publication and network bypasses, including a crafted IPv6 publication and external default network. It explicitly leaves actual host routing to external observation. Its potentially empty service set cannot silently pass the whole gate: the isolation, host-sharing and typecheck checks independently require exactly the two named services. |
| Both images prepared before either service switches | `deploy/loop2-deploy` performs its resource gate and combined build before the one `up`; a preparation error reaches exit 7 without a start or prune. The combined command names both images. Controlled build answers cover app typecheck/build, connector pull and connector build errors. These prove the script's response, not real Docker failure semantics. |
| Health and internal application probe | The switch explicitly names both services, uses `--no-build --force-recreate --wait --wait-timeout 120`, and reports exit 8 plus recovery guidance on failure. The connector uses the real ready command, not process existence. The fixed Node client uses two GETs to its own loopback, refuses redirect following, bounds requests at 10 seconds and Docker execution at 15 seconds. Root must return 200; the unknown API route must return 404 with application/json, rejecting application/jsonp. No persistent second server was added. |
| Token location and rotation | Exactly one file-backed secret points outside the checkout to `/etc/loop2/cloudflared-token`, granted only to the connector. No token value or token environment variable is introduced. The source guard rejects alternative files, secret sources/grants and connector identity/environment overrides. Host owner/group/modes and private backup are documented. Redeploying the running application SHA force-recreates both services, remounting a replaced file. |
| Continued isolation and limited cleanup | Existing input validation and fresh-main ancestry checks remain unchanged and precede the build/switch. The source reader permits only the fixed internal exec and the two service names. Cleanup remains dangling images bearing the loop2 ownership label, without shared-base/cache pruning or operations on neighbours. |
| Foundation settlements | Settlement 1 is revised D-10, settlement 2 is loop2-application-port and its permanent test, settlement 3 is revised D-13. D-15, D-17, loop2-host-sharing and loop2-deploy-keeps-running describe both services. The part map assigns the new invariant test. New source-backed facts support transport, file secrets, image identity and readiness. The observed host TCP fact retains its limited scope; it is not upgraded to container or UDP evidence. Withdrawn direct-origin facts have no remaining active foundation dependent. |
| Operator skill in both copies | All three file pairs are byte-identical. They retain provisioning, key separation, the installed root-owned script and human-only changes. They explain H1-H5, preserve the original recovery copy across corrections, install from the exact request SHA before deploying it, retain the no-other-merges window, and require the four external acceptance observations before merge. |
| Rollback and diagnosis | Fast rollback, durable revert and abandonment each restore the matching installed script and route. They remove the tunnel hostname/CNAME before restoring AAAA and the two hostname-specific rules, keep the old game's settings untouched, count the actions and acknowledge the outage. The ordinary public workflow probe remains separate from H4. For a durable revert its public probe cannot be assumed successful while the external route still points to the tunnel; the procedure's subsequent external checks are still necessary. Diagnostics distinguish application HTTP, connector readiness and hostname routing; 1016 is not treated as a unique diagnosis. |
| Safe reads | Memory reads print only HostConfig.Memory and scoped stats. The fixed internal probe and bounded host TCP/IPv4 check are allowed; the latter requires a Connected line, not timeout 124 alone. Full inspection/configuration dumps, token reads, restarts and mutations remain forbidden to the agent. |

Changed invariant-test files reviewed: `test_account_server_runtime.py`, `test_account_server_typecheck.py`, `test_loop2_application_port.py`, `test_loop2_container_isolation.py`, `test_loop2_deploy_keeps_running.py`, `test_loop2_host_sharing.py`, and `test_loop2_one_serving_process_container.py`. The application-only assertions were narrowed to the named application role because the accepted task adds a separate official connector; they were not replaced by a general exemption for arbitrary services or non-Node images. The connector smoke exercises the real pinned image and derives its ready command from actual Compose configuration. It cannot claim authenticated connectivity from a disconnected failure.

The author's own-work check targets the weak point correctly: the exact internal probe executes against a real application container without a published port; the actual connector image supports readiness under its expected identity. I inspected that implementation and the exact-commit gate log. The expected HTTP statuses come from the required root/API contract; the secret path, identity and limits come from the accepted design and foundation. No UI, browser-event or whole-game automation return condition is triggered.

## Checks performed by this reviewer

Commands below ran from `C:/Storage/repos/loop2/.runs/worktrees/szyfrowana-droga-do-serwera` unless stated otherwise.

| Command / manual method | Result |
|---|---|
| `git rev-parse HEAD` | Exit 0; dispatched head confirmed. |
| `git log --oneline 7b3d450c143492fa93efbb5e53705e32838622af..581b71a139f9dd9ab24fa21549e9a19a77a18ab0` | Exit 0; one implementation commit. |
| `git diff 7b3d450c143492fa93efbb5e53705e32838622af..581b71a139f9dd9ab24fa21549e9a19a77a18ab0 -- compose.yaml deploy tests` and the same range separately for `foundations` and `.agents/skills/loop2-deploy/` | Exit 0; reviewed the complete changed files to fill truncated diff output. The other skill copy was checked byte for byte. |
| `git -C .the-way rev-parse HEAD`; `git ls-files --stage -- .the-way` | Both exit 0; matching pin above. |
| `git diff --check 7b3d450c143492fa93efbb5e53705e32838622af..581b71a139f9dd9ab24fa21549e9a19a77a18ab0` | Exit 0, no whitespace errors. |
| `git status --short` | Exit 0, no tracked/untracked product changes. |
| `docker compose -f compose.yaml config --quiet` | Exit 0; actual Compose parser accepts the configuration. No token or configuration dump printed. |
| `docker run --rm --network none cloudflare/cloudflared:2026.10.4@sha256:c6c7ae1d5dfdcb094ad344ed68ccffc26635c9c6be80965664c33baf064b0515 tunnel --protocol http2 --edge-ip-version 4 --metrics 127.0.0.1:2000 run --token-file /run/secrets/cloudflare_tunnel_token` | Exit 1 as expected: the configured command and flags are accepted, then the real binary refuses the absent token file. No token supplied, no network, temporary container removed by `--rm`. This is a capability/refusal observation, not authentication evidence. |
| `python -B .the-way/elements/common/foundation_check.py` | Exit 0, 0 errors. |

Byte comparison was part of the following PowerShell here-string piped to `python -`; exit 0 printed `Three skill pairs byte-identical`:

```python
from pathlib import Path
for name in ['SKILL.md', 'references/setup_and_secrets.md', 'references/troubleshooting.md']:
    assert Path('.agents/skills/loop2-deploy/' + name).read_bytes() == Path('.claude/skills/loop2-deploy/' + name).read_bytes(), name
print('Three skill pairs byte-identical')
```

The command also extracted selected environment-fact entries into ignored review scratch for reading; it changed no product file.

Manual methods: traced all deployment exits and the cleanup path against the full script; compared the frozen H1-H5 sequence and each settlement with the new instructions/foundation; inspected the permanent negative cases and their assertions; checked the actual Dockerfile/application listening environment and public workflow; inspected the author's Linux log and runner rather than accepting the report's totals alone. The log names head 581b71a, the matching process pin, 343 Node passes, 275 Python tests with three existing Windows-specific skips, and final foundation 0 errors. The runner clones the bundle and checks out the exact requested commit before unchanged `npm test`. This is verification of the author's evidence, not a reviewer-run full suite.

Primary-source checks, opened and read during review:

- [Pinned cloudflared readiness implementation](https://raw.githubusercontent.com/cloudflare/cloudflared/dc3b264da64a801bc3a8d5301a6db21401910ad5/metrics/readiness.go) and [ready CLI](https://raw.githubusercontent.com/cloudflare/cloudflared/dc3b264da64a801bc3a8d5301a6db21401910ad5/cmd/cloudflared/tunnel/subcommands.go): active connection count controls 200; the CLI returns failure for non-200 or request failure.
- [Pinned upstream Dockerfile](https://raw.githubusercontent.com/cloudflare/cloudflared/dc3b264da64a801bc3a8d5301a6db21401910ad5/Dockerfile): numeric runtime identity and inherited executable match the documented group/readiness arrangement.
- [Pinned Compose specification](https://raw.githubusercontent.com/compose-spec/compose-spec/3a4a6995e4a971f6173dff9130cb3e38e6738651/container_spec.md): the secrets section confirms read-only mounting and the file-backed uid/gid/mode caveat.
- [Pinned token-file parameters](https://raw.githubusercontent.com/cloudflare/cloudflare-docs/1603d9d13a2889c5792a287f2452440594fac225/src/content/partials/cloudflare-one/tunnel/run-parameters.mdx), [token rotation](https://developers.cloudflare.com/cloudflare-one/networks/connectors/cloudflare-tunnel/configure-tunnels/remote-tunnel-permissions/), [tunnel DNS](https://developers.cloudflare.com/cloudflare-one/networks/connectors/cloudflare-tunnel/routing-to-tunnel/dns/) and [same-name DNS restriction](https://developers.cloudflare.com/dns/manage-dns-records/troubleshooting/records-with-same-name/): the prepared file-token, recreation and DNS transition instructions agree with the publisher's contract. These were read-only web checks, with no shell exit code or external mutation.

## Unrun checks and limitations

- No full-suite rerun or selected repository test in review. The review method reserves the full gate for the cycle, and D-77 forbids selecting a repository test. The author supplied the exact-commit full Linux run; the cycle still owns its own pre-request run.
- Final changed code was not executed on Windows by this reviewer. The supplied clean-base and author-red evidence names the existing Get-NetTCPConnection setup failure; a Linux pass does not establish that Windows observation now works. Three Windows-specific quality cases are skipped in the final Linux evidence and are not claimed as Linux passes.
- No token exists here; authenticated readiness, actual token readability on the target host, public HTTPS and unknown-API routing, outside-host IPv6 port refusal, applied/enforced server memory limits, and unchanged old-game/neighbour state remain unverified until H4/H5. Local source guards and the absent-token refusal do not replace them.
- No server, Cloudflare, DNS, key, token or firewall mutation was performed. Script installation and both rollback paths were reviewed, not enacted.

## Reading reaches

Selected the foundation and guidelines independently for deployment, build-tools, agent-workflow and product-foundation, reading every selected entry whole and the complete coding/testing guidelines. No applicable kind guideline or UI guideline is omitted; deployment exemplars remain deferred by D-28. Read both product/process glossaries, the full frozen task/spec/author report, the pinned review method and its reading procedures, and the user's code-review playbook after the vault rulebook. The broad every-part invariants were read as required; unrelated implementation details were not audited.

Additional reaches beyond the dispatch's concrete file list:

- `tests/invariants/loop2_invariant_support.py`, YAML outline/mapping and shell/Docker readers: establish what the new narrow allowances really parse, including refusal of aliases/duplicate keys/unreadable mappings and extraction of the embedded exec command.
- `tests/invariants/test_loop2_deploy_trigger_input.py`: verify the existing crafted-input and wrong-branch checks remain direct refusals, with positive controls, rather than only assertions about source text.
- Root `Dockerfile`: verify listening on 0.0.0.0:3000, internal health, nonroot application, and the one-process contract behind the new probe.
- `.github/workflows/deploy.yml`: verify public probing remains outside the installed script and therefore does not block H4 before the hostname switch; assess durable revert against that separation.
- `.runs/linux-verification/verify.sh` and `reports/author-linux-1.log`: verify the exact-commit gate's scope, process pin and skips.
- Primary publisher source bodies above: independently verify connector readiness, runtime identity, file-secret permissions and token/DNS semantics instead of treating the author's causal explanation as proof.

No product edit, index change or commit was made by the reviewer. Only ignored reading scratch and this report were written. The review stops here, before fixes or the return step.
