# Local Linux gate environment

The task owns containers loop2-task15-dind and loop2-task15-baseline. No target-server command runs. The daemon API is bound only to loopback in its own namespace, with no host-published port; the verifier shares that namespace. No host Docker socket is mounted.

The existing local verifier image loop2-task22-verifier:latest resolves to sha256:75d0c821fa0c6a4d7b7aee56748bb958439ae82b536c4145c252febf7697b524. It provides Node 24, Python 3.14, Docker CLI/Compose, git, lsof, procps and curl. This is a test harness, not the deployment image or target Argon2 evidence.

Inputs are ignored bundles and verify.sh under .runs/account-linux-inputs. The script clones the task branch, detaches at the supplied SHA, establishes origin/main at the supplied target SHA, checks out the process bundle, prints product/process/tool identity, runs npm ci, installs the pinned quality environment with hashes, then invokes every repository test solely through npm test. Logs carry the full command outcomes.

Baseline invocation:

```powershell
docker run --name loop2-task15-baseline --network container:loop2-task15-dind -e DOCKER_HOST=tcp://127.0.0.1:2375 --mount 'type=bind,source=C:/Storage/repos/loop2/.runs/worktrees/konta-graczy-i-logowanie/.runs/account-linux-inputs,target=/inputs,readonly' loop2-task22-verifier:latest bash /inputs/verify.sh 7012abcfb55b4ba2b2836b574a2275eb1551df28 7012abcfb55b4ba2b2836b574a2275eb1551df28
```

Result: Docker/verifier command exit 0; npm test exit 0, 343 Node tests and 275 Python tests, with three Windows-only quality tests skipped on Linux; foundation check 0 errors. Full output is linux-baseline-gate.log. Windows baseline already failed only at listener enumeration; its separately run foundation check passed. Linux verification resolves that platform-dependent uncertainty without changing the product's tests.

Observed tool versions: Node v24.22.1, Python 3.14.9. The three skipped native-Windows tests are test_native_windows_readers_reject_nonterminating_cim_errors, test_native_windows_readers_keep_owned_child_in_healthy_observation, and test_failed_descendant_query_still_terminates_known_main_process. They passed in the Windows baseline; no Linux pass is attributed to them.
