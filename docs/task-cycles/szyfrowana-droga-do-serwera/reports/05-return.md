# Return step — szyfrowana-droga-do-serwera

Status: done with concerns. No correction or product commit was required by this comparison. Head remains `581b71a139f9dd9ab24fa21549e9a19a77a18ab0`; the worktree is clean. The concerns are the already reported Windows observation failure and the human deployment acceptance that remains outstanding. This report stops before publication.

## Comparison and outcome

I resumed as the implementation author with the pinned make-change method, read the complete return-step instruction and foundation-step paragraphs, the frozen task and reviewed spec, and the completed author and whole-change review reports. The review is PASS with no findings of any grade or scope. I read the orchestrator's exact-head Linux gate result; I did not rerun tests to advance the process.

| Compared foundation or requirement | Code and instruction evidence | Discrepancy / correction |
|---|---|---|
| D-05, loop2-one-serving-process and loop2-api-error-route | The unchanged application Dockerfile still starts one Node Express server; the connector is another container. The new transient Node client checks root 200 and unknown API JSON 404. The real container test executes that exact client and checks serving-process ownership afterward. | None. No change to the application server contract. |
| D-08, loop2-container-isolation and loop2-distinct-address | Compose names app/loop2 and cloudflared/loop2-cloudflared. The public hostname remains loop2's, separate from the old game's. Operations on `loop` are read-only and no command changes `foundryvtt`. | None. Actual neighbor and public-route observations remain human acceptance. |
| D-09, D-11, D-16 and loop2-deploy-trigger-input | The input/commit checks and main-only forced-command path remain before build/switch. The unchanged workflow sends only a commit. Installed-script replacement and secret provisioning are human actions; the script does neither. | None. Existing crafted-input and wrong-branch refusals remain in the complete gate. |
| D-10 and loop2-application-port | Compose publishes no port, adds no host or external network, selects HTTP/2 IPv4, and waits for the real connector ready command. The wrapper pins the official version and digest. H5 replaces the direct-origin route with the published tunnel hostname. | None. Source configuration is checked permanently; no source check is presented as proof of actual external routing. |
| D-12 and D-13 | Both operator-skill copies separate bounded reads from human mutations. The token is sourced from the selected host file and granted only to the connector, never put in repository environment/arguments. The host owner/group/modes and private backup match the chosen image identity. Rotation deploys the running application revision and recreates both services. | None. No token was read or supplied locally. |
| D-15 and loop2-deploy-keeps-running | The combined build precedes the single switch. Failures before it cannot reach a container mutation. Rollback guidance restores the installed script and external route as well as code; no historic product image is a recovery mechanism. | None. The unchanged workflow's public probe is separate from the internal H4 gate; durable rollback needs its later external-route checks. |
| D-17 and loop2-host-sharing | The resource check precedes the combined build, both containers have separate limits, cleanup is still only dangling loop2-labelled images, and the only added host-file grant is the connector token. Tests allow only the two roles and fixed internal exec. | None. Chosen bounds remain 512 MiB and 256 MiB, not measured demand; enforced limits are H4/H5 observations. |
| D-01 / account-server-runtime and account-server-typecheck | The application remains Node 24 and typechecked before its image exists. The named connector wrapper is explicitly recognized as the approved external executable, without a general non-Node or third-service exemption. | None. |
| D-28 and the selected coding/testing guidelines | No new guideline discipline or exemplar is selected. The small wrapper remains the existing deployment code kind. All tests use the repository's complete command; no UI surface changes. | None. No additional guideline became applicable. |

The whole-foundation search found no additional dependent requiring correction. No independent lasting choice was left unrecorded: the new route, transport, image pinning, readiness, credential interface/permissions/rotation, two-service isolation and recovery are represented by D-10/D-13/D-15/D-17 and their invariants. Helper names, one combined build invocation, two concurrent GETs, concrete probe path and the selected tunable memory values are implementation of those choices, not extra product rules. No invariant was inferred merely from incidental behavior.

## Every foundation entry changed by the whole task

The following are Polish meaning sentences for the request. This return step changes none of their text.

| Identifier | Meaning |
|---|---|
| D-10 | Gracz używa dotychczasowego adresu HTTPS, a Cloudflare dociera do aplikacji szyfrowanym tunelem przez osobny kontener; aplikacja nie publikuje portu hosta. |
| D-13 | Token tunelu leży w pliku na serwerze i w prywatnej kopii, tylko konektor dostaje plik do odczytu, a wymiana tokenu kończy się odtworzeniem kontenera. |
| D-15 | Oba obrazy powstają przed wymianą kontenerów; cofnięcie przez zmianę drogi ruchu przywraca także właściwy zainstalowany skrypt i ustawienia Cloudflare, bez obietnicy odzyskania danych z Gita. |
| D-17 | Aplikacja i konektor używają własnych zasobów loop2 i osobnych limitów pamięci; wdrożenie nie zmienia sąsiadów ani wspólnego cache, a plik tokenu przygotowuje człowiek. |
| loop2-deploy-keeps-running | Błąd przed uruchamianiem nowych kontenerów pozostawia dotychczasowe kontenery loop2 w pracy. |
| loop2-application-port | Port aplikacji nie jest dostępny z Internetu z pominięciem Cloudflare. |
| loop2-host-sharing | Wdrożenie zmienia wyłącznie zasoby loop2, a jedynym dodatkowym dostępem kontenera do pliku hosta jest odczyt tokenu przez konektor zgodnie z D-13. |
| cloudflare-tunnel-transport | Cloudflare Tunnel tworzy szyfrowane połączenie wychodzące z serwera bez publicznego portu przychodzącego. |
| cloudflare-tunnel-token-file | Cloudflared od wersji 2025.4.0 potrafi uruchamiać tunel zarządzany zdalnie, czytając token z pliku. |
| cloudflared-image-identity | Oficjalny obraz cloudflared 2026.10.4 działa z UID i GID 65532 oraz wyłączoną samoczynną aktualizacją. |
| cloudflared-connection-readiness | Gotowość cloudflared 2026.10.4 wymaga co najmniej jednego aktywnego połączenia z Cloudflare; polecenie ready odmawia przy innym wyniku niż HTTP 200. |
| compose-file-secret-permissions | Plikowy sekret Compose jest montowany tylko do odczytu, a jego prawa pozostają prawami pliku hosta, bo Compose nie przepisuje dla niego UID, GID ani trybu dostępu. |
| mikrus-tunnel-outbound-tcp | Odczyt z 2026-10-26 potwierdza połączenie hosta przez IPv4/TCP do region1.v2.argotunnel.com:7844, bez dowodu UDP ani połączenia z kontenera. |
| cloudflare-origin-rules — withdrawn | Fakt o dawnej regule kierowania na port został wycofany, bo obecna decyzja o drodze ruchu już na nim nie stoi; instrukcja cofnięcia nadal opisuje tę regułę. |
| cloudflare-configuration-rules — withdrawn | Fakt o dawnej regule trybu szyfrowania został wycofany z powodu braku zależnego wpisu; pozostaje opis przywrócenia tej reguły przy cofaniu. |
| cloudflare-test-origin-ipv6 — withdrawn | Fakt o dawnym bezpośrednim adresie origin został wycofany, bo bieżąca droga używa tunelu; prywatny adres nadal służy człowiekowi do sprawdzenia zamknięcia i ewentualnego cofnięcia. |
| deployment — part map | Mapa przypisuje nowy test zamknięcia portu do wdrożenia; dodatkowy Dockerfile i test obrazu mieszczą się w istniejących zakresach deploy/** i tests/deploy/**. |

Dependency reconciliation: D-10 names transport, token-file, connection-readiness and host-TCP facts; D-13 names token-file, file-secret permissions and image identity. No new fact is orphaned. Searching all foundation files for the three withdrawn identifiers finds only their withdrawal rows, not active dependents. Existing host/Docker and forced-command facts continue to serve D-14/D-16/D-17 and the input boundary.

## Settlements, map, terms and sources

| Accepted settlement | Final entry / verification |
|---|---|
| Row 1: encrypted tunnel as separately limited second Compose service, no published application port; rejected host service and Origin CA alternatives | Revised D-10 contains the complete choice and both rejected alternatives; configuration and tests implement it. |
| Row 2: no Internet access to the application port outside Cloudflare | loop2-application-port, permanent source test and independently crafted exposure cases; actual IPv6 closure remains H5. |
| Row 3: token file outside checkout, supplied to connector, with private backup | Revised D-13; exact secret grant and operator provisioning/rotation instructions. |

No projected entry is assigned to this plan item. The existing public-address meaning and D-05 continue to preserve one public HTTPS origin for the game and API; the projected entry assigned to tasks 2/15 is not appropriated here. No settlement row is deferred or replaced by a different meaning.

Touched parts are deployment, build-tools, agent-workflow and product-foundation. Their responsibilities, allowed dependencies and trust boundaries remain accurate: deployment owns Compose, both Dockerfiles, script and deployment tests; build-tools owns the two adjusted account-server invariant tests; agent-workflow owns both skill copies; product-foundation owns entries. External context already names Cloudflare, Mikrus, the image registry and deployment GitHub surfaces. No partner or trust boundary is missing. The deployment boundary remains deploy/**; the application boundary is unchanged.

Glossary comparison: deployment still means building and starting one commit on its server, not the running instance; public address still means the player's HTTPS origin, not the host IP/port; test server keeps its existing meaning. Connector, token file, readiness and Compose secret use their ordinary technical meanings, with explanations in the operating instructions. No term is used against an entry and no new product-specific meaning needs recording.

External-source coverage was checked under the environment-fact template's “Which facts are written”, as well as step 11. The six new facts capture the external conditions supporting the revised foundation choices. The identity fact and its D-13 dependency correctly capture the author's additional reach. Frozen cloudflared URLs use the verified peeled commit `dc3b264da64a801bc3a8d5301a6db21401910ad5`, not the annotated tag object. The current source text agrees with the direct publisher checks already performed during authoring and independently during review; no product version moved afterward.

The other publisher citations in the spec/operating instructions describe use of the chosen tools: exact Compose options, DNS record transition and the possible 1016 symptom, or why a refreshed token's existing connection may persist. They remain source-backed operational instructions. They do not add an independent condition requiring a different foundation choice: a DNS syntax/coexistence or diagnostic change would alter the procedure, and different token-refresh disconnection behavior would still permit the chosen recreation. Likewise the repository does not infer actual host port closure from a generic Docker default; H5 must observe it. No additional environment fact or deferred entry results from this comparison. The old direct-origin facts are not revived solely to document rollback instructions.

## Invariant tests and violated marks

The whole task changes these standing-test files:

- tests/invariants/test_account_server_runtime.py — only the named official connector wrapper gets the non-Node role.
- tests/invariants/test_account_server_typecheck.py — two exact service/build roles, with application typechecking still mandatory.
- tests/invariants/test_loop2_application_port.py — new guard against publication and network bypass, with crafted negative inputs.
- tests/invariants/test_loop2_container_isolation.py — exact distinct names for both services.
- tests/invariants/test_loop2_deploy_keeps_running.py — both containers protected before switch, with a connector mutation refusal example.
- tests/invariants/test_loop2_host_sharing.py — exact secret/recipient and fixed exec allowances, with negative reader controls.
- tests/invariants/test_loop2_one_serving_process_container.py — application-only process contract plus real execution of the new internal probe.

No test was changed or executed again in this return step. Existing trigger-input refusals remain unchanged. No existing Violated mark was set or cleared; changed invariants and the new port invariant stand at `no`. This states no known committed-code violation, not completion of the pending human runtime observations. The Windows observation failure is a failed check, not a weakened expectation or a product exception.

## Commands and existing evidence

Commands below are this return step's read-only checks, from the dispatched worktree:

| Command | Exit and result |
|---|---|
| git ls-files --stage -- .the-way | 0; gitlink is 2895e0e7860ec1f48ddc7dacd15ef6b26e731c5c. |
| git -C .the-way rev-parse HEAD | 0; same pinned commit. |
| git rev-parse HEAD | 0; 581b71a139f9dd9ab24fa21549e9a19a77a18ab0. |
| git diff --name-only 7b3d450c143492fa93efbb5e53705e32838622af HEAD | 0; same 24 changed product files reported by the author. |
| git diff --check 7b3d450c143492fa93efbb5e53705e32838622af HEAD | 0; no whitespace error. |
| git status --short | 0; empty. |
| git diff --name-only 581b71a139f9dd9ab24fa21549e9a19a77a18ab0 HEAD | 0; empty, no return-step commit. |
| rg -n 'cloudflare-origin-rules\|cloudflare-configuration-rules\|cloudflare-test-origin-ipv6' foundations | 0; only the three withdrawal rows. The actual command uses ripgrep alternation bars without escaping them; the table escapes are Markdown separators only. |
| rg -n 'cloudflare-tunnel-\|cloudflared-\|compose-file-secret\|mikrus-tunnel\|D-10\|D-13\|D-15\|D-17' foundations --glob '*.md' | 0; dependents and entries reconciled above; same Markdown-only bar escaping convention. |

Reading used Get-Content -Encoding UTF8 for the handoff, reports, method, frozen task/spec, entries, map, glossary and selected code. One initial read accidentally omitted `/skill/` from `.the-way/elements/environment-facts/skill/SKILL.md` and failed with exit 1; the corrected exact path was then read completely with exit 0. This was a source-path typo, not a product/check failure. Other source-read batches exited 0. No public source was mutated or remote server action performed.

Preserved execution evidence, not rerun here: author red `npm test` exit 1 with the intended port assertion plus the pre-existing Get-NetTCPConnection setup error; author exact-commit Linux `npm test` exit 0; orchestrator exact-commit Linux `npm test` exit 0 in reports/orchestrator-linux.log. The latter shows 343 Node tests and 275 Python tests, three existing Windows-only quality skips, and foundation 0 errors. The three platform checks ran in the earlier Windows quality suite; they are not claimed as final Linux passes. No deploy or invariant test was skipped in either final Linux run.

Reading reaches reused from authoring/review and checked for this comparison: YAML/shell readers and trigger-input refusal coverage; root application Dockerfile and public workflow; the exact-commit verifier/logs; publisher ready/image/token/Compose/DNS contracts. The environment-fact template was reread to decide source coverage rather than create entries for every incidental API detail. No additional applicable guideline, glossary correction or missed settlement was found.

Still unchecked and required from the human: H1 tunnel creation, H2 secret provision/private backup, H3 exact script installation with recovery copy and no-other-merges window, H4 authenticated deployment/readiness and real secret permissions/limits, H5 public page/API, external IPv6 closure and untouched neighbors. Local checks do not replace any of those. No tests were repeated merely to advance; no new commit needs another review.
