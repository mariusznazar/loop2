PASS

# Spec review

Spec: `.runs/task-cycles/szyfrowana-droga-do-serwera/spec.md`

Reviewed as a fresh agent against the whole frozen task and the selected foundation. No finding that would make the build go wrong. No product or spec file was changed; this report is the only write.

## Technical reading

- The two named services, separate containers and limits, pinned official connector base, private Compose network and removal of application port publication cover To do 1 and 2. The small metadata-only connector Dockerfile preserves the existing product-label cleanup boundary. It does not require pruning the shared upstream image or cache. The selected limit is explicitly a chosen bound, with actual enforcement left for deployment observation.
- The preparation/switch separation covers To do 3: both images must finish before either service is recreated, so a build or pull failure leaves both running containers available. The installed script remains the orchestration entry point. A start/readiness/probe failure returns exit 8 and recovery information; partial availability after the switch starts is expressly admitted rather than concealed by an atomicity claim.
- Connector health checks actual edge connections rather than process existence. In the pinned upstream source, `readyCommand` requests the selected local metrics endpoint and returns an error for a non-200 result; `ReadyServer.makeResponse` returns success only when active connections exist. Thus the proposed health check detects a disconnected running connector. Docker's health timeout bounds the CLI even though the upstream HTTP client itself has no timeout. Public routing remains a separate H5 observation, allowing the approved H4-before-H5 sequence. Sources checked: [ready command](https://raw.githubusercontent.com/cloudflare/cloudflared/2026.10.4/cmd/cloudflared/tunnel/subcommands.go), [readiness endpoint](https://raw.githubusercontent.com/cloudflare/cloudflared/2026.10.4/metrics/readiness.go).
- The internal application probe uses the existing Node executable and preserves the root-200 and unknown-API-JSON-404 outcomes, with request and process bounds. Its transient client does not create a second serving process. The unchanged public workflow probe and human IPv6 check supply evidence the internal probe cannot.
- The token decision covers To do 4 and settlement 3. Host mode 0640 with group 65532 permits the upstream process identity to read the mounted file without placing the token in the environment or arguments. The spec correctly does not rely on Compose `uid`/`gid`/`mode` remapping for a file secret. The pinned Dockerfile uses user/group 65532 and the cloudflared entrypoint; token-file handling reads the file and reports a generic invalid-token error without including its contents. Sources checked: [upstream image](https://raw.githubusercontent.com/cloudflare/cloudflared/2026.10.4/Dockerfile), [Compose secrets](https://docs.docker.com/reference/compose-file/services/#secrets), and the token-file branch in the linked upstream subcommands source.
- Force recreation makes token rotation effective even after atomic replacement of the host file. Redeploying the running application revision avoids trusting the checkout left by a failed deployment. [Compose up](https://docs.docker.com/reference/cli/docker/compose/up/) documents force recreation and the start/wait options used by the design.
- To do 5 and all three accepted settlements have identified foundation changes. The new port-closure invariant has both a standing source test and a stated limit requiring external observation. The host-sharing reader retains complete document inspection and narrow allowances. The Node/type-check reader changes are confined to the approved connector role, retaining the app's existing Node-24 and predeployment type-check protections. No arbitrary non-Node service exemption is designed.

## Separate operating-instructions reading

The designed changes to both skill copies cover To do 6: current route and observations, token placement and rotation, narrow memory inspection, bounded outbound diagnosis, failure diagnosis, and both rollback paths. The existing initial provisioning material is retained but separated from the transition.

H1-H5 preserve the frozen order and human ownership of every external mutation. H3 extracts the exact request commit's script, checks syntax, installs root-owned 0755 and preserves the pre-transition recovery copy. Later corrections must not overwrite that recovery copy. The no-other-merges window and H4-to-H5 outage are explicit. H5 changes only loop2's hostname and includes the required page, API, IPv6, resource and neighbouring-workload observations.

Rollback through the transition restores the target script before its deployment and removes the tunnel publication/CNAME before restoring AAAA and the two hostname-scoped rules. The revert path installs the script from the revert target content before merging. Abandonment distinguishes H3, H4 and H5 progress. These requirements fix the old script-only restore line's incompleteness without claiming that Git restores data. No opening of the old application port is proposed as tunnel troubleshooting.

## Checks and limits

- `git ls-files --stage -- .the-way`: exit 0.
- `git -C .the-way rev-parse HEAD`: exit 0. Both identify `2895e0e7860ec1f48ddc7dacd15ef6b26e731c5c`.
- `Get-FileHash -Algorithm SHA256` for each pair of deployment skill / setup reference / troubleshooting reference: completed successfully, exit 0; all three pairs match.
- No executable product check or test was run in this spec review. No real token, authenticated tunnel, server operation or Cloudflare mutation was used. Designer/orchestrator image-execution evidence was read as supplied evidence, not claimed as my execution.
- Read commands succeeded except a guessed process glossary path, which produced an explicit missing-file error. The actual `.the-way/foundations/glossary.md` was found with `rg --files --hidden --no-ignore` and the relevant entries read. Truncated broad reads were followed by focused reads; missing output was not treated as evidence of absence.

The implementation and its review still need to demonstrate the specified protections and run the complete gate. Token permissions on the real Linux host, authenticated connector readiness, actual public forwarding, externally closed IPv6 application port, enforced memory limits and unchanged neighbouring workloads remain required H4/H5 evidence. This PASS is a design verdict, not a deployment acceptance verdict.

## Reading scope and reaches

Read the whole frozen task, spec, designer report, both handoffs, project write-spec wrapper, pinned spec method, coding/testing guidelines, and the dispatched foundation entries: D-01, D-05, D-08 through D-17, D-28, D-30 through D-32, D-38, D-46, D-49, D-73 through D-85 and D-87 through D-89; the named invariants and environment facts; account-server/build-tools/deployment/agent-workflow/product-foundation part entries; and the relevant product and pinned-process glossary entries. Read the current Compose file, application Dockerfile, deployment script, complete deployment skill and both references, confirming equality with their other copies by hashes. Read both named runtime/type-check tests in full.

Selective external reach: the pinned Cloudflare ready-command, readiness-endpoint and Dockerfile source, plus Docker's Compose service secrets and up documentation, to independently verify the readiness, identity, file-permission and recreation claims. These are primary public sources; no owner identity, local path or access value was sent to public search. No further local scope expansion and no `cycle.md` reading.
