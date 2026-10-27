# Slice 3 implementation report

Status: done. Implementation and required local checks complete; stopped before independent review.

Base: c85518a544f1a8c695195d6cb6f95235935c4c1a. Worktree: C:/Storage/repos/loop2/.runs/worktrees/konta-graczy-i-logowanie. Branch: task/konta-graczy-i-logowanie. Process gitlink and checkout: 574a37b9ab9572f876298f4cc10754581222d3f0. No cycle.md read; no subagent dispatched.

## Delivered behavior

The application image creates /app/data owned by node before switching to USER node. Compose fixes all four account settings, grants only the session-signing file to app, and mounts its own Docker-managed loop2_accounts volume at /app/data. The tunnel keeps its connector-only credential, private application connection, transport and memory settings. No installed deploy-script change is required.

The two existing image probes use shared account_container_support.py. Each builds the real application image and creates genuinely fresh, independently named data/secret volumes in the disposable daemon. A short-lived root setup container writes synthetic random session material into the secret volume with root:1000 ownership and 0440 permissions, without passing its value in arguments/environment/output. The application starts through its unchanged production command as node, with the secret volume read-only, no published port and a 512 MiB memory bound. A probe verifies uid/gid and directory ownership, performs a write/read/delete in the fresh data volume, and opens/closes the real built AccountDatabase at /app/data/accounts.sqlite. This establishes fresh-volume use and real disposable SQLite resources, not account persistence across replacement. The original one-serving-process, internal deploy HTTP probe and every-icon byte checks remain.

Host-sharing checks require exactly the two file-backed secret definitions and consumer grants and exactly the own account-volume definition/mount. Crafted variants cover other host files, environment/external sources, extra definition fields, swapped/additional/long grants, root connector, host directories, another named volume, wrong mount destination, extra mounts, connector mount, foreign volume identity, external volumes and driver options. Existing arbitrary privilege/key/build restrictions remain.

## Checks already run

All repository tests were invoked only through npm test. Linux verification used the existing isolated loop2-task15-dind daemon, with no host Docker socket and no published daemon API. verify.sh clones the exact committed task head from a newly rebuilt product.bundle, establishes origin/main at 7012abcfb55b4ba2b2836b574a2275eb1551df28, checks out the pinned process, installs pinned dependencies/quality tools, prints identities and runs npm test. The verifier image is test infrastructure, not the application image.

- Red head b5d5d313744c0991cf916d7e7683f979a87b84a3: docker runner and npm test exit 1. Node 366 passed. Python 278 cases, 5 intended failures: missing app volume, missing fixed app settings, missing app-only secret, and fresh-volume EACCES in both real image probes. Each failure reached an assertion; no missing module/import failure was treated as proof. Quality passed with the three native Windows cases skipped. Full log: reports/19-slice3-red.log.
- Implementation head e4a46c7dc2af0b342529722ba92884a780c4b6c8 with disposable mutation /etc/loop2/session-secrets -> /etc/other/session-secrets: npm test exit 1. The amended host-sharing assertion reported the wrong host source. It also exposed the isolation test's old blanket-volume prohibition and a helper-output ordering defect: buffered identity output followed unittest's terminal OK, which the pinned runner refuses. flush=True fixes the latter without altering any assertion or runner. Both production resource probes themselves passed in this run. Full log: reports/19-slice3-mutation.log.
- Mutation restore: git restore --source=HEAD -- compose.yaml in the isolated detached clone; original/restored blob e8834a4a38b8f80af1acc07a6b860d8cff81b984 matched, and git diff --exit-code -- compose.yaml exited 0. The task worktree was never mutated for this fault.
- python -B .the-way/elements/common/foundation_check.py after assigning the helper: exit 0, 0 errors. Repeated on e4a46c7: exit 0, 0 errors.
- git diff --check: exit 0.

## Scope discovery

The unplanned tests/invariants/test_loop2_container_isolation.py forbids any top-level/service volumes, not merely sharing another deployment. The approved own account volume therefore fails its unchanged assertion. The file was read after the real gate reported this failure. The orchestrator authorized the narrow addition in reports/19a-slice3-isolation-answer.md and refreshed the exact selection; both were read before editing. The isolation test now reuses volume_problems, retaining all other refusals and requiring exactly the approved own-volume definition and application mount. Its explanatory reading is amended. No invariant sentence changed. This is a test interpretation inconsistent with the accepted D-17 requirement, not evidence that another workload was touched.

## Foundation and boundaries

D-13 and D-17 already contain the approved session-file and volume policy at this slice's base; loop2-host-sharing already expresses their narrow allowances. They need no duplicate or artificial wording change. No decision or invariant is added, removed or renamed. loop2-host-sharing's test changes; loop2-one-serving-process retains its sentence and probes with valid production resources. loop2-container-isolation retains its sentence, with its blanket-volume interpretation reconciled to approved D-17; both host-sharing and isolation reject a foreign volume in an actual mutated Compose document.

The part map assigns tests/invariants/account_container_support.py exactly once to build-tools, next to the existing shared invariant support. Meaning: „Wspólne przygotowanie lokalnych kontenerów testowych należy do narzędzi budowania; testy wdrożenia korzystają z niego przez już dozwoloną zależność.” No ownership transfer, new part, dependency permission, surface or external-context row is needed. The part's responsibility, dependencies and trust boundary remain unchanged.

Meaning of D-13 applied here: „Aplikacja dostaje wyłącznie plik podpisu sesji, a pośrednik tunelu wyłącznie swój token; wartości nie trafiają do konfiguracji środowiska ani logów.” Meaning of D-17 applied here: „Wdrożenie zakłada własny wolumen kont, dostępny dla użytkownika gry, i nie sięga po zasoby innych aplikacji.” Meaning of unchanged durability limitation: „Zapis do świeżego wolumenu nie dowodzi zachowania kont po wymianie kontenera ani zachowania zapisanych gier.”

No violated flag is set or cleared. In particular account-save-durable-storage, account-startup-configuration and account-schema-lifecycle stay violated: this slice does not establish their complete sentences. Later startup validation and replacement/saved-game work retain those obligations.

## Choices and own-work reasoning

- Daemon-local disposable volumes for the synthetic secret avoid relying on bind paths visible only to the verifier when Docker is remote. A host tempfile would be simpler only for a local daemon and could silently test the wrong filesystem. Root is used only in the temporary secret-preparation container; the application itself remains node throughout.
- Exact approved short-form resources keep arbitrary host mounts, external volumes and secret sources refused. A broad volumes/secrets allowance would be less work but would lose the resource boundary. Correct alternative Compose syntax requires an intentional test update.
- One named helper prevents fixture drift between one-process and icons probes; duplicating the setup would let later production startup changes repair only one path. The helper opens the real database module rather than a substitute, and emits only safe identities/ownership/limits.
- The weakest requirement was the ownership actually copied onto a new volume, not just the image's directory declaration. Both real-image probes directly write as uid/gid 1000 and open the real SQLite database there under 512 MiB. A missing chown was observed failing, rather than inferred from Dockerfile text.
- Plausible faults: remove chown (fresh-volume write fails); run application as root (uid/gid assertions fail); forget production settings/secret grant (Compose assertions fail and later mandatory startup validation refuses); give a secret to the wrong consumer or use another host source (crafted refusal and actual mutation); bind another volume or host path (exact volume refusal); remove memory bound or publish a port in the test fixture (inspect assertions fail); drop static assets/start another server (existing icon/process probes remain).

## Unchecked and limits

No target-server changes, secret creation/rotation, deployment, target Argon2 measurement or public browser journey. No saved-game or account replacement-persistence claim. Production validation itself belongs to the next slice. The Linux gate skips test_native_windows_readers_reject_nonterminating_cim_errors, test_native_windows_readers_keep_owned_child_in_healthy_observation, and test_failed_descendant_query_still_terminates_known_main_process; no new Windows baseline run or pass is claimed. No UI code or deliberately excluded rendered category changed. No mutation tool adopted; the existing computational-testing gap remains outside this connection-based slice. Independent review has not run.

## Reaches

- tests/invariants/test_loop2_container_isolation.py, whole: actual npm-test failure revealed the omitted blanket-volume guard.
- .the-way/gate/run_tests.py lines 1–110: verified why trailing buffered metadata after OK is correctly rejected, before fixing helper output flushing.
- .the-way part-map method, template, shared rules/way of working, examples and example entries; complete product map: required prerequisites to assigning the new helper. No process files were changed.

## Completed boundary proof on final code

Head c9af9d4521895fe6fe98ae96ccbc7035e4cea350 was cloned into loop2-task15-slice3-boundaries. The disposable copy changed the session-secret file source to /etc/other/session-secrets and the own volume name to other_accounts. Full npm test exited 1 with exactly three failures:

- test_compose_shares_nothing_with_another_deployment: foreign volume identity rejected by loop2-container-isolation.
- test_account_volume_is_owned_and_mounted_only_by_the_application: foreign volume identity rejected by loop2-host-sharing.
- test_runtime_secrets_are_granted_only_to_their_consumers: foreign session-file source rejected by loop2-host-sharing.

All 366 Node cases passed. All other Python cases passed, with the same three Windows skips among 278 cases. Both real-image probes passed, and their output now precedes unittest's final OK, so the runner accepts the completed deploy directory. Restoration succeeded with identical compose.yaml blob e8834a4a38b8f80af1acc07a6b860d8cff81b984 and git diff --exit-code exit 0. Full log: reports/19-slice3-boundaries.log. The task worktree remained unchanged by the mutation.

## Commits and files

- b5d5d313744c0991cf916d7e7683f979a87b84a3 — test: require isolated production account resources in container probes (intentional red evidence).
- e4a46c7dc2af0b342529722ba92884a780c4b6c8 — feat: provision durable account volume and application-only session secret.
- c9af9d4521895fe6fe98ae96ccbc7035e4cea350 — test: preserve isolation while allowing the own account volume.

All commits explicitly staged their named paths on the existing task branch; author email checked as the private-repository address. No push, branch reset/rebase, PR or target operation. Eight changed files, +282/-49 relative to the dispatch base:

| File | Added | Removed |
|---|---:|---:|
| [Dockerfile](C:/Storage/repos/loop2/.runs/worktrees/konta-graczy-i-logowanie/Dockerfile) | 1 | 0 |
| [compose.yaml](C:/Storage/repos/loop2/.runs/worktrees/konta-graczy-i-logowanie/compose.yaml) | 15 | 0 |
| [foundations/part_map.md](C:/Storage/repos/loop2/.runs/worktrees/konta-graczy-i-logowanie/foundations/part_map.md) | 1 | 0 |
| [tests/deploy/test_loop2_image_icons.py](C:/Storage/repos/loop2/.runs/worktrees/konta-graczy-i-logowanie/tests/deploy/test_loop2_image_icons.py) | 5 | 4 |
| [tests/invariants/account_container_support.py](C:/Storage/repos/loop2/.runs/worktrees/konta-graczy-i-logowanie/tests/invariants/account_container_support.py) | 108 | 0 |
| [tests/invariants/test_loop2_container_isolation.py](C:/Storage/repos/loop2/.runs/worktrees/konta-graczy-i-logowanie/tests/invariants/test_loop2_container_isolation.py) | 7 | 5 |
| [tests/invariants/test_loop2_host_sharing.py](C:/Storage/repos/loop2/.runs/worktrees/konta-graczy-i-logowanie/tests/invariants/test_loop2_host_sharing.py) | 139 | 35 |
| [tests/invariants/test_loop2_one_serving_process_container.py](C:/Storage/repos/loop2/.runs/worktrees/konta-graczy-i-logowanie/tests/invariants/test_loop2_one_serving_process_container.py) | 6 | 5 |

The shared helper is ordinary test/build support within the existing testing/deferred build-tools kinds; it introduces no new product code kind or exemplar. The production server/database/Store implementation is unchanged. Dockerfile/Compose are the existing deferred deployment kind. The actual image tests run Docker directly with equivalent isolated application settings, not the whole production Compose stack or a live Cloudflare connector; static Compose/invariant checks establish the grants and topology declarations.

## Exact gate commands and exits

Preparation before each changed committed head: `git bundle create .runs/account-linux-inputs/product.bundle task/konta-graczy-i-logowanie origin/main` (exit 0). Each command below ran from the task worktree, with complete combined output redirected to its named log. Every harness invokes full npm test; there was no file/case selection.

```powershell
docker run --name loop2-task15-slice3-red --network container:loop2-task15-dind -e DOCKER_HOST=tcp://127.0.0.1:2375 --mount 'type=bind,source=C:/Storage/repos/loop2/.runs/worktrees/konta-graczy-i-logowanie/.runs/account-linux-inputs,target=/inputs,readonly' loop2-task22-verifier:latest bash /inputs/verify.sh b5d5d313744c0991cf916d7e7683f979a87b84a3 7012abcfb55b4ba2b2836b574a2275eb1551df28 *> docs/task-cycles/konta-graczy-i-logowanie/reports/19-slice3-red.log
```

Docker runner/npm-test exit: 1.

```powershell
docker run --name loop2-task15-slice3-mutation --network container:loop2-task15-dind -e DOCKER_HOST=tcp://127.0.0.1:2375 --mount 'type=bind,source=C:/Storage/repos/loop2/.runs/worktrees/konta-graczy-i-logowanie/.runs/account-linux-inputs,target=/inputs,readonly' loop2-task22-verifier:latest bash /inputs/verify-slice3-mutation.sh e4a46c7dc2af0b342529722ba92884a780c4b6c8 7012abcfb55b4ba2b2836b574a2275eb1551df28 *> docs/task-cycles/konta-graczy-i-logowanie/reports/19-slice3-mutation.log
```

Docker runner/npm-test exit: 1.

```powershell
docker run --name loop2-task15-slice3-boundaries --network container:loop2-task15-dind -e DOCKER_HOST=tcp://127.0.0.1:2375 --mount 'type=bind,source=C:/Storage/repos/loop2/.runs/worktrees/konta-graczy-i-logowanie/.runs/account-linux-inputs,target=/inputs,readonly' loop2-task22-verifier:latest bash /inputs/verify-slice3-boundaries.sh c9af9d4521895fe6fe98ae96ccbc7035e4cea350 7012abcfb55b4ba2b2836b574a2275eb1551df28 *> docs/task-cycles/konta-graczy-i-logowanie/reports/19-slice3-boundaries.log
```

Docker runner/npm-test exit: 1.

```powershell
docker run --name loop2-task15-slice3-final --network container:loop2-task15-dind -e DOCKER_HOST=tcp://127.0.0.1:2375 --mount 'type=bind,source=C:/Storage/repos/loop2/.runs/worktrees/konta-graczy-i-logowanie/.runs/account-linux-inputs,target=/inputs,readonly' loop2-task22-verifier:latest bash /inputs/verify.sh c9af9d4521895fe6fe98ae96ccbc7035e4cea350 7012abcfb55b4ba2b2836b574a2275eb1551df28 *> docs/task-cycles/konta-graczy-i-logowanie/reports/19-slice3-final.log
```

Docker runner/npm-test exit: 0.

The scripts verify-slice3-mutation.sh and verify-slice3-boundaries.sh are ignored test-run inputs only. They make the named substitutions after checkout, run npm test, restore the original Compose file and require the original/restored Git blob IDs and clean diff to agree before returning the captured npm exit.

Additional final-source checks: `python -B .the-way/elements/common/foundation_check.py` exited 0 with 0 errors on c9af9d4; `git diff --check c85518a544f1a8c695195d6cb6f95235935c4c1a HEAD` exited 0. No altered foundation entry is unchecked by the main npm command, which also runs the foundation check.

## Resulting part-map entry

This full entry changes only the added helper path; it claims that new file, takes no file from another part, and keeps the allowed dependency/trust-boundary fields intact.

```markdown
## build-tools

The part installs dependencies, checks code quality and types, audits introduced dependency versions and builds and launches the application, and builds and serves the browser view's kitchen-sink page on the developer's machine.

- **Files:** /package.json
  /package-lock.json
  tsconfig.browser.json
  tsconfig.server.json
  tsconfig.kitchen-sink.json
  scripts/**
  tests/quality/**
  eslint.config.mjs
  prettier.config.mjs
  ruff.toml
  requirements-quality.in
  requirements-quality.txt
  .gitignore
  README.md
  tests/invariants/loop2_invariant_support.py
  tests/invariants/account_container_support.py
  tests/invariants/test_account_server_runtime.py
  tests/invariants/test_account_server_typecheck.py
  tests/invariants/test_application_build_output.py
  tests/invariants/test_application_package_layout.py
  tests/invariants/test_application_build_kitchen_sink.py
- **Depends on:** browser-view · simulation · account-server · product-foundation
- **Trust boundary:** package-lock.json
  scripts/audit_dependencies.py
  scripts/kitchen-sink.mjs
```

## Final exact-head result

Full npm test on committed c9af9d4521895fe6fe98ae96ccbc7035e4cea350 exited 0: 366 Node cases passed; 278 Python cases in four directories completed, with exactly three native Windows skips; foundation check reported 0 errors. Docker runner exit was 0, additionally confirmed by inspecting its stopped state. Log: reports/19-slice3-final.log. Working tree is clean for tracked files at that head.

Final application image identities printed by the genuine running probes:

- Icon/image probe: sha256:f6ec189d51f398993ede227f3f332ff5c2f2af4906d592694499a5160fa41f98, container loop2-image-icons-check-79210b135b17, fresh data volume loop2-account-data-check-e77a3889a7f54bf0bd916991c5615749.
- Serving-process/deploy-probe check: sha256:043b937264535712404f1019c7b03ac47c7b82018715a1f0c5db22e206294756, container loop2-invariant-check-5e512fb46835, fresh data volume loop2-account-data-check-bacf1ab785a8449f8010d10feef84783.

Both report application uid/gid 1000 and memory 536870912 after the fresh-volume write, SQLite-open and secret permissions/read-only mount assertions. Image IDs differ because the existing two tests use different LOOP2_COMMIT test labels; both build the exact source cloned at the final head. These are local application images, not the target deployed image. The verifier image independently resolves to sha256:75d0c821fa0c6a4d7b7aee56748bb958439ae82b536c4145c252febf7697b524. Harness versions: Node v24.22.1, Python 3.14.9, Docker daemon 29.9.2.

The changed invariant checks are:

- loop2-host-sharing: ComposeServiceAsksNoPrivilege.test_compose_top_holds_only_project_services_and_own_resources (renamed top-key check), test_service_sets_only_keys_that_grant_nothing (narrow resource exceptions backed by validators), test_runtime_secrets_are_granted_only_to_their_consumers (renamed and expanded token check), and new test_account_volume_is_owned_and_mounted_only_by_the_application.
- loop2-container-isolation: ComposeIsolation.test_compose_shares_nothing_with_another_deployment, exact volume allowance replacing the blanket refusal; demonstrated failing on the foreign identity and passing restored.
- loop2-one-serving-process: RunningContainerHasOneServingProcess.test_running_container_has_one_listening_node_process, configured production resources/512 MiB in its setup, original serving-process/HTTP assertions retained; demonstrated failing on the missing directory ownership and passing after restoration of required behavior.

The image/icons test and untagged fixed-configuration/refusal-control cases complement those invariant checks. No old assertion was relaxed merely for a passing result: the volume interpretation changed only because the approved task and D-17 require the own volume, and both direct mutated-product refusals and crafted-resource controls remain.

Cleanup: the tests removed their own images, containers and random data/secret volumes. Read-only docker ps and docker volume ls inside the task daemon returned no remaining inner containers or volumes after the final image probes. The four owned stopped verifier containers were removed by their exact names (docker rm exit 0); loop2-task15-dind and its shared build cache were left available. No host-wide prune or other workload cleanup ran. Logs and ignored harness inputs remain for review.

Final decision/foundation consequence: all changes fit the accepted source and refreshed slice. There is no unanswered question, proposed invariant waiver, unrecorded dependency permission or target-server action. The preserved broader account/saved-game/startup/target-measurement obligations are limitations of this slice, not claimed passes.
