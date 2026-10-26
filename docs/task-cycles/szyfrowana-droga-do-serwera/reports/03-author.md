# Author report — szyfrowana-droga-do-serwera

Status: done with concerns. The repository change is committed and the Linux gate passes. The pre-existing Windows listener observation error and the deliberately outstanding human deployment acceptance remain explicit below.

## Scope and choices

The frozen task and independently reviewed spec are implemented as one change: private application networking, a separately limited connector, a file-backed credential, deployment preparation/readiness/internal HTTP checks, both operator-skill copies, and all three accepted foundation settlements. No application or UI behaviour changes. No server, Cloudflare, key, token, DNS, firewall or neighboring workload was changed by the author.

- One `docker compose build app cloudflared` prepares both images before one switch. Separate builds would permit per-image reporting but add a second resource check and another branch without changing the safety condition. A combined build failure leaves both old containers running; the fixture's controlled Docker answers prove this script decision, not real Docker failure semantics.
- One bounded Node invocation performs the two fixed internal GETs concurrently, returns only status/content type, refuses redirects, aborts each fetch after 10 seconds, and is itself bounded by host `timeout 15`. Two exec calls would be simpler to parse individually but duplicate process setup and broaden the command allowance. The two-line result is intentionally small; malformed or missing output cannot report success.
- Both services are force-recreated even for the same commit, so rotating an atomically replaced token remounts it. This costs the already accepted deployment interruption; a plain restart could retain the old mount and would depend on whatever commit the checkout currently contains.
- The secret allowance accepts only the exact named file, its short-form connector grant and no alternate environment/identity. This intentionally requires a test update for a future interface change; a general secret/mount allowance would weaken isolation.
- Source guards distinguish the two named roles. The account application still requires Node24 and typecheck before deployment; only the named official connector wrapper may have a non-Node base. Any third service or arbitrary Dockerfile is still rejected.
- Operator guidance keeps initial provisioning separate from H1–H5, and crossing the route transition restores both matching installed script and Cloudflare settings. Storing the pre-transition script only once prevents a corrected request head from destroying recovery. Human review of real route state remains necessary; repository source cannot establish it.

The spec's design choices remain unchanged: no host-published port rather than loopback publication; ordinary private Compose networking rather than external/host networking; official version+digest wrapper with product ownership rather than direct floating registry image; file secret rather than environment token; HTTP/2 IPv4 rather than unproved QUIC; connector256MiB and application512MiB with actual limit observation required; connection readiness rather than mere process-running or premature public-hostname gating. Their costs and rejected alternatives remain in the reviewed spec and relevant foundation decisions.

## Foundation step

Used the pinned project methods for decisions, invariants, environment facts and part map. Selected existing entries were read whole; linked fact dependents were searched before withdrawal. No new part, discipline or exemplar was selected.

Znaczenie po polsku:

- D-10: Gracz używa dotychczasowego adresu, a Cloudflare łączy się z serwerem szyfrowanym tunelem; aplikacja nie publikuje portu hosta.
- D-13: Token tunelu leży w pliku na serwerze i w prywatnej kopii; tylko konektor dostaje plik do odczytu, z uprawnieniami zgodnymi z jego grupą.
- D-15: Wdrożenie przygotowuje oba obrazy przed wymianą kontenerów; powrót przez zmianę sposobu połączenia wymaga również właściwego skryptu i ustawień Cloudflare.
- D-17 i loop2-host-sharing: Oba kontenery mają własne limity i zasoby loop2; wdrożenie nie zmienia sąsiadów, a jedyny dodatkowy odczyt hosta to plik tokenu konektora.
- loop2-application-port: Port aplikacji nie jest dostępny z Internetu poza Cloudflare; test konfiguracji uzupełnia zewnętrzne sprawdzenie człowieka.
- loop2-deploy-keeps-running: Błąd przed uruchamianiem nowych kontenerów pozostawia oba dotychczasowe kontenery w pracy.
- Fakty środowiska: publiczna dokumentacja opisuje szyfrowane połączenie wychodzące, plik tokenu, gotowość konektora, jego tożsamość i prawa plikowych sekretów; obserwacja hosta potwierdza wyłącznie IPv4/TCP do region1:7844.

Settlement coverage: row1 → revised D-10; row2 → new loop2-application-port and its standing source test; row3 → revised D-13. Consequences: D-15, D-17, host-sharing and keeps-running wording, environment facts, deployment part-map path. The three obsolete Cloudflare direct-origin facts are withdrawn because no remaining foundation entry depends on them; rollback guidance retains their operational role.

## Evidence and limitations

Commands ran from `C:/Storage/repos/loop2/.runs/worktrees/szyfrowana-droga-do-serwera`, unless the Linux runner says otherwise. Every test run used the complete `npm test`, as D-77 requires; no focused selection, test edit or skip was introduced for the environment problem.

| Check | Command and exit | Evidence |
|---|---|---|
| New invariant red, before runtime implementation | `npm test` — exit1 | `reports/author-red.log`:343 Node passed; Python agent5/deploy64/quality32 passed. Invariants165: one intended assertion failure in `test_loop2_application_port.ApplicationPort.test_compose_exposes_no_application_port_outside_its_private_network`, with `['app: ports can expose the application'] != []`, against the original published-port Compose. Its separately crafted exposure examples were also discovered. One independent pre-existing Windows setup error, below. The complete run took about26min; no product/runtime source changed during it. |
| Final exact-commit Linux gate | `git bundle create .runs/linux-verification/product.bundle task/szyfrowana-droga-do-serwera` — exit0; `docker run --rm --network container:loop2-task22-dind -e DOCKER_HOST=tcp://127.0.0.1:2375 -v C:/Storage/repos/loop2/.runs/worktrees/szyfrowana-droga-do-serwera/.runs/linux-verification:/inputs:ro loop2-task22-verifier bash /inputs/verify.sh 581b71a139f9dd9ab24fa21549e9a19a77a18ab0 7b3d450c143492fa93efbb5e53705e32838622af` — exit0 | `reports/author-linux-1.log`: exact HEAD and matching process pin printed; Node343 passed; Python agent5/deploy65/invariants173/quality32,275 total, with3 platform skips below. Final `foundation_check.py`:0 errors. The wrapper clones the exact commit, installs pinned dependencies/tools and runs unchanged `npm test`. |
| Foundation before commit | `python -B .the-way/elements/common/foundation_check.py` — exit0 | `reports/author-foundation.log`:0 errors; repeated after the image-identity fact. The final gate checks the committed foundation again. |
| Syntax and literal preservation | The exact PowerShell here-string piped to `python -` below — exit0 | Printed `Python syntax and literal backslash checked`; no syntax-driven newline corruption. Scripted rewrites preserved existing newline bytes. |
| Whitespace and clean handoff | `git diff --check` — exit0; `git status --short` — exit0, empty | All24 product files are committed; report/logs are ignored working artifacts. |

The syntax/literal check was the final portion of this pre-commit edit pass. This is the complete command that ran, recorded here without executing it again:

```powershell
@'
from pathlib import Path
import ast
changes = {
    'tests/invariants/test_loop2_deploy_keeps_running.py': [('new containers starts', 'new containers start'), ('new\ncontainer', 'new\ncontainers')],
    'tests/invariants/test_loop2_host_sharing.py': [('every other word must be the service `app`.', 'every other word must name one of the two loop2 services.')],
    'deploy/loop2-deploy': [('the running loop2 container is untouched', 'the running loop2 containers are untouched')],
}
for name, replacements in changes.items():
    p=Path(name); data=p.read_bytes()
    for old,new in replacements:
        data=data.replace(old.encode(),new.encode())
    p.write_bytes(data)
for p in Path('tests').rglob('*.py'):
    ast.parse(p.read_text(encoding='utf-8'))
probe=Path('deploy/loop2-deploy').read_bytes()
assert b'rows.join("'+bytes([92])+b'n")' in probe
print('Python syntax and literal backslash checked')
'@ | python -
```

Windows `test_loop2_one_serving_process.OneExpressProcessServesGameAndApi.setUpClass` failed because `Get-NetTCPConnection -State Listen` returned no objects. The same setup error was present in the parent's clean-base gate and direct OS-query control, while netstat showed listeners; it is not the intended invariant failure. It stayed unchanged. This failure prevented the Windows `npm test` chain from reaching its final foundation check; the standalone check above and final Linux gate did run it. The final changed product was not re-run on Windows, as directed by the orchestrator; Linux provides the final execution evidence.

The three Linux skips are existing platform restrictions, all exercised successfully among the32 quality tests in the Windows red run: `ProcessObservation.test_native_windows_readers_reject_nonterminating_cim_errors`, `ProcessObservation.test_native_windows_readers_keep_owned_child_in_healthy_observation` (native Windows CIM), and `test_failed_descendant_query_still_terminates_known_main_process` (native Windows taskkill). These are unchecked by the final Linux run, not claimed as Linux passes. No deploy or invariant test was skipped on Linux.

The own-work check targeted the requirement most exposed by this implementation: the new internal Node probe must actually reach both application endpoints without a published port, and the connector image must actually support its configured readiness command under the identity used by token permissions. The complete Linux gate ran the exact deployment probe inside a real application container started without any host port: root200, unknown API404 with JSON, still one serving process afterward. The added connector smoke built the real pinned wrapper, checked its runtime user/group65532:65532 and loop2 ownership label, then executed the exact Compose health command with networking disabled and observed a connection-refused failure. Both checks passed; the new deploy count65 and invariant count173 confirm discovery, with no skips in those directories.

These real checks are separate from controlled Docker answers for build/readiness/probe failures, which demonstrate the script's exit7/8 decisions and restore guidance. Authenticated readiness, token readability on the target Linux host, external IPv6 closure, public game/API routing, enforced memory and unaffected neighbors remain H4/H5 human observations. No token exists in the local test environment.

The deployment boundary's crafted input and wrong-branch refusal tests remain in the complete gate. New reader negative cases independently craft published IPv6 ports, host/other-container/external networks, other secret sources/grants, root override and arbitrary Docker exec programs/targets/privilege flags. A source check does not prove the running host's routing. No visual/event/whole-game automation return condition applies to this transport-only change.

## Reaches and provenance

- Public primary publisher sources were checked for frozen environment facts. Cloudflare docs commit `1603d9d13a2889c5792a287f2452440594fac225`; Compose spec commit `3a4a6995e4a971f6173dff9130cb3e38e6738651`; cloudflared2026.10.4 peeled commit `dc3b264da64a801bc3a8d5301a6db21401910ad5`. The tag is annotated: raw URLs using its tag object returned404, so final sources use the peeled commit, directly opened successfully. This is a source-address correction, not a design change.
- The upstream Dockerfile identity was reached to establish why host group65532 is appropriate; a small environment fact now supports D-13. The pinned image's actual identity is also checked by the real connector smoke test.
- Existing YAML/shell reader helpers were read selectively to keep new allowances narrow; no general parser changes were made.
- The existing real application-container test was reached and extended to exercise the exact deployment probe without adding a second application build.
- Parent's Linux runner script and isolated-Docker route were read before use. They provide an unchanged `npm test` route after the pre-existing Windows listener enumeration fault; no product test is skipped or modified for that fault.
- Source of the host-only connectivity fact is frozen task Q7 and orchestrator Q13; the report does not upgrade it to UDP/container connectivity.
- Existing quality-test skip decorators were reached after the Linux result to identify the three platform skips exactly. No quality test was changed.

All external work remains the five human actions at the blocked draft request, with no other merges during the install-to-completion window. The author stops before independent review and the cycle's return step.

## Commit and files

Commit: `581b71a139f9dd9ab24fa21549e9a19a77a18ab0` - `feat: route loop2 through an encrypted Cloudflare tunnel`. Private-repository author email checked and correct with `git log -1 --format='%H %ae'` (exit0).

| File | Added | Removed |
|---|---:|---:|
| `.agents/skills/loop2-deploy/SKILL.md` | 89 | 64 |
| `.agents/skills/loop2-deploy/references/setup_and_secrets.md` | 132 | 86 |
| `.agents/skills/loop2-deploy/references/troubleshooting.md` | 122 | 58 |
| `.claude/skills/loop2-deploy/SKILL.md` | 89 | 64 |
| `.claude/skills/loop2-deploy/references/setup_and_secrets.md` | 132 | 86 |
| `.claude/skills/loop2-deploy/references/troubleshooting.md` | 122 | 58 |
| `compose.yaml` | 31 | 2 |
| `deploy/cloudflared.Dockerfile` | 2 | 0 |
| `deploy/loop2-deploy` | 24 | 23 |
| `foundations/decisions.md` | 23 | 45 |
| `foundations/environment_facts.md` | 39 | 18 |
| `foundations/invariants.md` | 12 | 2 |
| `foundations/part_map.md` | 1 | 0 |
| `tests/deploy/deploy_script_support.py` | 3 | 3 |
| `tests/deploy/test_loop2_deploy_build.py` | 29 | 23 |
| `tests/deploy/test_loop2_deploy_switch.py` | 42 | 31 |
| `tests/deploy/test_loop2_tunnel_image.py` | 65 | 0 |
| `tests/invariants/test_account_server_runtime.py` | 10 | 1 |
| `tests/invariants/test_account_server_typecheck.py` | 7 | 4 |
| `tests/invariants/test_loop2_application_port.py` | 50 | 0 |
| `tests/invariants/test_loop2_container_isolation.py` | 4 | 3 |
| `tests/invariants/test_loop2_deploy_keeps_running.py` | 6 | 5 |
| `tests/invariants/test_loop2_host_sharing.py` | 96 | 14 |
| `tests/invariants/test_loop2_one_serving_process_container.py` | 18 | 6 |
