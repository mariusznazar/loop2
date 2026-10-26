# Designer report

Status: done

Spec: `.runs/task-cycles/szyfrowana-droga-do-serwera/spec.md`

## Result

The spec settles all choices carried by the frozen task: a minimal product-owned image derived from official cloudflared 2026.10.4 pinned by digest; a file-backed Compose secret with explicit host permissions; internal Node probing; native connector readiness; HTTP/2 over IPv4; 256 MiB connector limit; and forced recreation on deployment/rotation. It retains the human H1-H5 sequence and the full cross-transition rollback. No product code, foundation, server or Cloudflare configuration was changed.

## Questions and answers

One design issue was raised directly with the orchestrator while reading: using the official registry image directly would not give the existing restricted image cleanup a loop2 ownership label, whereas D-15 does not retain earlier product images for rollback. The proposed small wrapper Dockerfile preserves existing label-scoped cleanup without touching shared base images. The orchestrator answered: provisional go-ahead, task-bounded and an existing deployment code kind, recorded by the orchestrator as Q3. This is an intermediate design choice within the delegated cycle, not human approval. No unresolved question remains.

The orchestrator supplied the available local Docker evidence and the previously authorized host-memory reading. The designer did not repeat server reads or execute authenticated operations.

## Alternatives and costs

- Direct registry image loses the existing product-only cleanup interface; a tag/image-ID lifecycle adds cleanup code. A metadata-only Dockerfile costs one small file and keeps the existing scoped prune. Floating tags cannot keep the chosen release content fixed.
- env_file is simpler to provision but puts the secret into the Docker environment. A Compose file secret avoids that exposure, at the cost of explicit owner/group permissions and narrow source-reader support. Arbitrary bind mounts are unnecessary.
- A loopback-published application port retains another host socket; a probe container adds a third image/unit. The existing Node binary can probe inside the application container.
- Running-state checks accept a disconnected connector; public-URL readiness cannot precede the approved H5 route publication. Native connector readiness plus internal application HTTP separates those facts correctly.
- QUIC has no observed host route; auto tries it before fallback. Explicit HTTP/2 IPv4 matches the evidence but loses QUIC's transport/PQ characteristics and still needs container-level confirmation.
- 128 MiB may be too small without measurement; a larger-than-256 MiB cap grants more shared-host memory without evidence. The selected 256 MiB is a chosen limit, not measured demand.
- A separate token-only restart is cheaper but can operate from a checkout left at a failed commit and can preserve a bind-mounted old inode. Redeploying the running commit with forced recreation costs a rebuild and the ordinary outage while providing one established operation.

## Four self-checks

1. Placeholders/empty sections: checked; no TBD or empty section. Names that safely remain the maker's (new fact and invariant identifiers, helper organization) are explicitly listed.
2. Contradictions: checked against all three settlements, all To do items and acceptance criteria, the selected foundation entries and code. The wrapper image resolves D-15 cleanup tension. Readiness works before H5. Secret permissions account for nonroot deployment and upstream UID/GID. Application-only Node/typecheck checks remain mandatory.
3. Independent changes: none. Compose, deploy script, protection tests, both skill copies and their foundation updates are inseparable parts of this route change. No accounts, application behaviour, UI, host firewall or automation-access redesign is added.
4. Ambiguity: resolved health as active Cloudflare connections, not merely a running process; transport as HTTP/2 IPv4; the token file readers and rotation operation explicitly; all app host-port publication removed; image pin exact; cross-transition rollback includes the script and DNS/rules. Public-route and container connectivity are not claimed from host TCP evidence.

## Reading and reaches

Read the complete project write-spec wrapper and pinned spec method, frozen task, coding/testing guidelines, dispatched decisions/invariants/environment facts and the three named part entries. Product glossary entries deployment, test server, public address, unit test and integration test and pinned-process entries environment fact, foundation, foundation step, gate, guidelines, human action, invariant, invariant test, open design choice, part and part map were read. No cycle.md was read.

Read the current Compose file, application Dockerfile and deploy script, both deployment-reference copies, and skill content; hashes confirm both complete skill trees' three corresponding files are identical. Inspected the existing deployment/invariant readers and switch-test fixture as needed to design the new commands without an unbounded exemption.

Selective reaches beyond the dispatch's entry list:

- `tests/invariants/test_account_server_runtime.py` around NodeMajorInDeployment and node_mentions: adding a connector Dockerfile reveals an existing every-Dockerfile-must-name-Node assumption.
- `tests/invariants/test_account_server_typecheck.py` documentation and Compose/deploy checks: every service is assumed to use the application's Dockerfile, and route files are bounded. These need application-versus-connector recognition, not removal of application type checking.
- D-01 whole and `foundations/part_map.md` account-server/build-tools entries whole: establishes the runtime rule concerns the application and identifies build-tools as an additional affected test-owning part. Its coding/testing guidelines were already read in full and apply; no new code kind is selected.
- `tests/invariants/loop2_invariant_support.py` Compose and shell-reader passages, `.dockerignore`, `tests/deploy/deploy_script_support.py` fixture description: verifies full-source reading and how the internal probe/build tests can remain bounded.
- Official Cloudflare and Docker public documentation and tagged upstream source, cited at each decision in spec: verifies CLI readiness, UID/GID, file-secret permissions, transport, token rotation, DNS exclusivity and Docker behaviour. No identity, local path, server access value or secret was sent in a public search.

## Evidence and checks

Designer executed only read commands, hash comparison and writes of the two ignored cycle artifacts. Pin checks both exited 0 and agreed on 2895e0e7860ec1f48ddc7dacd15ef6b26e731c5c:

- `git ls-files --stage -- .the-way`
- `git -C .the-way rev-parse HEAD`

`Get-FileHash` of the paired skill and two reference files completed successfully with equal hashes in each pair. `rg` found the three obsolete Cloudflare facts referenced only by current D-10 among foundation dependents. No tests were run by the designer; the orchestrator is handling the baseline, and implementation tests belong to the author.

Non-successful read attempts, corrected immediately: an initial guessed spec-method path under task-cycle/skill did not exist (exit 1), after which the exact wrapper target task-cycle/spec/SKILL.md was read whole; one guessed deployment helper filename caused rg exit 1, resolved through rg --files to deploy_script_support.py. Broad outputs that were truncated were followed by focused reads of the needed passages. A guessed upstream ready.go URL returned 404; tagged subcommands.go and metrics/readiness.go supplied the actual implementation. None of these failures was interpreted as absent product behaviour.

Orchestrator-supplied local evidence (not run by designer): `docker pull cloudflare/cloudflared:2026.10.4`, exit 0; image inspection of RepoDigests/Config.User, exit 0, digest c6c7ae1d5dfdcb094ad344ed68ccffc26635c9c6be80965664c33baf064b0515 and 65532:65532; `docker run --rm cloudflare/cloudflared:2026.10.4 tunnel --metrics 127.0.0.1:2000 ready`, exit 1 with local connection refused, a valid negative capability check. These establish the published image and CLI, not an authenticated working tunnel.

## Concerns carried forward

The external observations remain outstanding: token provisioning/readability on the Linux host, actual container connection to Cloudflare, applied/enforced limit, public page/API forwarding, closed external IPv6 application port and unchanged neighbouring workloads. The connector health endpoint does not prove public routing. The script's switch is not atomic. The maker must keep failure-before-switch evidence for both builds and use the complete protection readers, not broad exemptions. The foundation step must use the project skills and author must read vault skill conventions before changing the deployment skill copies. No new server permission is inferred from local Docker availability.
