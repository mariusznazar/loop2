PASS 8c2168084542d5f37b4a234aae5682cc56f43b5b

## Scope and findings

Independent review of revised slice 4, from c9af9d4521895fe6fe98ae96ccbc7035e4cea350 to 8c2168084542d5f37b4a234aae5682cc56f43b5b. I authored none of the change. The range contains two commits and changes only tests/invariants/test_loop2_container_icons.py, +11/-9. The reviewed tree was clean and HEAD matched the dispatch. Process checkout and gitlink both equal 574a37b9ab9572f876298f4cc10754581222d3f0.

Critical: none. Important: none. Minor: none. Out-of-scope findings: none.

## Review evidence

- Changed invariant test: loop2-container-icons, tests/invariants/test_loop2_container_icons.py:133. The change replaces only container preparation and updates its description/import. At lines 137 and 149-175 the nonempty source set, real socket probe, exactly one listening port, every icon's status 200 and exact source-byte equality remain unchanged. Expected bytes still come from assets/icons in the working tree, independently of the built image and HTTP response. The URL path remains percent-encoded per filename.
- Production preparation: tests/invariants/test_loop2_container_icons.py:147 calls the existing helper with this test instance, freshly generated image tag and container name. tests/invariants/account_container_support.py:57-108 creates unique disposable volumes, generates a synthetic key inside an isolated setup container, grants the application only its own secret volume read-only and data volume writable, and runs the image's normal command under 512 MiB. It supplies all four account settings without supplying secret contents through argv/environment/output. Dockerfile:18-31 retains production mode, node user and the normal application command. Compose grants remain unchanged.
- Real resource checks: account_container_support.py:26-45 and 85-105 read actual file metadata, read the mounted signing file, write and remove a data probe, open the actual database, and inspect actual mounts, ports and memory configuration. They require uid/gid 1000, data ownership 1000:1000, signing-file ownership root:1000 and mode 0440, a 32-byte key, production mode, the required origin/proxy configuration, no published port and exactly the two expected mounts. This fixture does not claim to prove future invalid-configuration refusal or persistence across replacement.
- Cleanup and bounds: test_loop2_container_icons.py:143 registers image removal before building. The helper registers each volume's cleanup before creation, setup-container cleanup before setup and application-container cleanup before startup. unittest's reverse cleanup order removes the application and setup container before their volumes and the image. Resource names are generated for this run; no shared prune or target resource removal is introduced. Docker calls are bounded by 120 seconds in the helper; the image build retains its 1200-second limit, socket polling its 60-second deadline with bounded subprocess calls, and HTTP requests their 10-second abort signal. Source inspection establishes registered cleanup and bounded calls; it is not a separate post-run inventory proving every removal succeeded.
- The author's own-work check addresses this slice's weakest requirement: valid production resource preparation while preserving icon coverage. The plausible defects listed correspond to real helper/fixture assertions. The first run's missing import is an execution failure before icon assertions, not deliberate behavioral fail-once evidence. The final commit supplies the import, matching the existing one-serving-process fixture. No new invariant or changed assertion requires a new deliberate-mutation claim in this preparation slice.

## Declined to judge

None.

## Checks executed by this reviewer

All commands ran from C:/Storage/repos/loop2/.runs/worktrees/konta-graczy-i-logowanie. Source/log reads are inspection, not new test execution.

| Command or manual method | Exit/result |
|---|---|
| git rev-parse HEAD | 0; exact dispatched head |
| git status --short | 0; empty tracked/untracked status |
| git -C .the-way rev-parse HEAD | 0; pinned process commit |
| git ls-files --stage -- .the-way | 0; same pinned process commit |
| git diff c9af9d4521895fe6fe98ae96ccbc7035e4cea350..8c2168084542d5f37b4a234aae5682cc56f43b5b -- tests/invariants/test_loop2_container_icons.py | 0; reviewed every hunk |
| git log --oneline c9af9d4521895fe6fe98ae96ccbc7035e4cea350..8c2168084542d5f37b4a234aae5682cc56f43b5b | 0; two expected commits |
| git diff --numstat c9af9d4521895fe6fe98ae96ccbc7035e4cea350..8c2168084542d5f37b4a234aae5682cc56f43b5b | 0; one file, +11/-9 |
| git diff --check c9af9d4521895fe6fe98ae96ccbc7035e4cea350..8c2168084542d5f37b4a234aae5682cc56f43b5b | 0; no whitespace errors |
| Read selected source files and compare assertions, resource setup and cleanup ordering against task/spec/foundation | Completed; findings above |
| Inspect retained first/final logs with rg and Get-Content; compare verifier script and Linux skip guards | Completed; results below |

## Existing execution evidence and limitations

I did not repeat npm test: the unchanged exact-head full-gate evidence is supplied, and the dispatch and review method prohibit rerunning that full suite merely to advance. No selected tests or target operations were run.

The author's exact final command was:

```powershell
docker run --name loop2-task15-fixture-8c21680 --network container:loop2-task15-dind -e DOCKER_HOST=tcp://127.0.0.1:2375 --mount 'type=bind,source=C:/Storage/repos/loop2/.runs/worktrees/konta-graczy-i-logowanie/.runs/account-linux-inputs,target=/inputs,readonly' loop2-task22-verifier:latest bash /inputs/verify.sh 8c2168084542d5f37b4a234aae5682cc56f43b5b 7012abcfb55b4ba2b2836b574a2275eb1551df28
```

Author-reported command exit: 0. Retained reports/27-fixture-final.log independently shows the requested checkout, matching process pin, npm test entry point, 366 Node passes, Python directory totals 5 + 65 + 176 + 32 = 278 with every directory successful, and foundation result 0 errors. The invariant directory has no skips; both expected production-resource messages appear there before its success. The fixture's real Docker/status/byte assertions therefore ran, rather than disappearing behind a daemon skip. The script uses set -euo pipefail and ends with npm test. This is inspection of retained execution evidence, not a claim that I ran the gate.

The initial command was the same verifier invocation with runner loop2-task15-fixture-d116c20 and application SHA d116c203b941c70a7101adcf8366b2f6f12ba96d. Its author-reported exit was 1. reports/27-fixture-first.log records the missing-helper-import NameError and Ruff F821; it does not prove any icon assertion failed correctly, and did not reach the foundation check.

Three native-Windows checks remain unchecked at this head by the Linux run: test_native_windows_readers_reject_nonterminating_cim_errors, test_native_windows_readers_keep_owned_child_in_healthy_observation, and test_failed_descendant_query_still_terminates_known_main_process. Their source guards match the three quality-suite skips. I did not rerun the known native-Windows listener-enumeration baseline.

Secret provisioning/private copies, host setup, deployment, exact target-image measurement and the public browser journey remain human-only and unchecked. This fixture-only PASS does not clear those task gates or the later startup-refusal requirement. No browser state or rendering change occurs here, so this review supplies no screenshot or public-journey evidence.

## Reading reaches

I read the dispatch, author handoff/selection/report, complete selected guidelines, selected task/spec quotations, complete selected foundation entries, mapped helper, icon fixture, selected neighbouring-fixture and process-support passages, Dockerfile, compose.yaml, Linux verification description and retained first/final logs. I read the F11, F14 and F22 rows at plan.md:23,26,42; an identifier search also returned other plan lines mentioning those rows, which were not used to broaden the review. I did not read cycle.md or discarded historical startup code.

Additional reads beyond the selected source passages:

- .the-way/elements/common/way_of_working.md and .the-way/product-guidelines/reading.md, complete: references of the pinned review method; to follow its selection/reach rules. The project skill, pinned review method and user code-review playbook were read as expressly required.
- tests/invariants/loop2_invariant_support.py:143-171: inspected the run implementation immediately after the selected passage to verify timeout handling and cleanup of command processes; the following temporary-copy helper opening was incidental.
- .runs/account-linux-inputs/verify.sh, complete: verify detached requested-head checkout, process pin, fail-fast shell behavior and sole repository-test entry point.
- tests/quality/test_process_observation.py:16-64 and tests/quality/test_invariant_support.py:206-220: verify the names and native-Windows-only guards behind the three retained skips. An rg search additionally located test_failed_descendant_query_rejects_partial_stdout; it was not treated as skipped.

Only this requested report was written. No product, foundation, process, vault/global or target file was changed.
