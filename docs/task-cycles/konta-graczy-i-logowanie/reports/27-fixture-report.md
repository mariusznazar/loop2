# Slice 4 — production resources for the container icon fixture

**Status:** done

**Worktree:** `C:/Storage/repos/loop2/.runs/worktrees/konta-graczy-i-logowanie`

**Base:** `c9af9d4521895fe6fe98ae96ccbc7035e4cea350`

**Final commit:** `8c2168084542d5f37b4a234aae5682cc56f43b5b`

**Commits:**

- `d116c203b941c70a7101adcf8366b2f6f12ba96d` — `test: 🧪 prepare icon fixture with production resources`
- `8c2168084542d5f37b4a234aae5682cc56f43b5b` — `test: 🧪 import the production fixture helper`

## Change

Changed only `tests/invariants/test_loop2_container_icons.py` (11 lines added, 9 removed from the base). The container description now explains that the fixture prepares a fresh writable database volume and read-only synthetic signing-secret volume, starts the image's normal production command under 512 MiB, and cleans up its container, both volumes and image. The test uses the already existing `start_production_container` helper and imports it from `tests.invariants.account_container_support`.

The helper's real checks confirmed uid/gid 1000, writable database storage, root:1000 mode 0440 signing file with a 32-byte synthetic key, production mode and explicit origin/proxy settings, both expected mounts with the secret read-only, no published ports and the 512 MiB memory limit. No helper, application, image, Compose or foundation file changed.

The icon contract remains intact: the working-tree SVG set must be nonempty; every direct SVG receives an HTTP 200 assertion and its response body must equal the exact working-tree bytes. The test still probes the listening socket and uses the container's own Node.js for requests. Cleanup remains registered before the resources it removes are created.

## Checks

| Command | Exit | Result |
|---|---:|---|
| `python -B .the-way/task-cycle/slice_size.py 'docs/task-cycles/konta-graczy-i-logowanie/reports/27-fixture-selection.md'` | 0 | One changed file; 108,015 characters, estimated 43,206 tokens; slice fits. |
| `git diff --check` | 0 | No whitespace errors before commit. |
| `docker run --name loop2-task15-fixture-d116c20 --network container:loop2-task15-dind -e DOCKER_HOST=tcp://127.0.0.1:2375 --mount 'type=bind,source=C:/Storage/repos/loop2/.runs/worktrees/konta-graczy-i-logowanie/.runs/account-linux-inputs,target=/inputs,readonly' loop2-task22-verifier:latest bash /inputs/verify.sh d116c203b941c70a7101adcf8366b2f6f12ba96d 7012abcfb55b4ba2b2836b574a2275eb1551df28` | 1 | First exact-head full gate. Node passed 366 tests. Python failed because the fixture called the helper without importing it (`NameError`); Ruff also reported the undefined name. This stopped before the icon HTTP/status/byte assertions and before the foundation check, so this run proves neither. |
| `docker run --name loop2-task15-fixture-8c21680 --network container:loop2-task15-dind -e DOCKER_HOST=tcp://127.0.0.1:2375 --mount 'type=bind,source=C:/Storage/repos/loop2/.runs/worktrees/konta-graczy-i-logowanie/.runs/account-linux-inputs,target=/inputs,readonly' loop2-task22-verifier:latest bash /inputs/verify.sh 8c2168084542d5f37b4a234aae5682cc56f43b5b 7012abcfb55b4ba2b2836b574a2275eb1551df28` | 0 | Rebuilt the exact-head bundle and ran the full repository gate in the task-owned daemon. `npm test` passed: 366 Node tests; 278 Python tests across four directories; foundation check reported 0 errors. The icon fixture ran against the real production image and its assertions passed. Three native-Windows quality checks were skipped on Linux: `test_native_windows_readers_reject_nonterminating_cim_errors`, `test_native_windows_readers_keep_owned_child_in_healthy_observation`, and `test_failed_descendant_query_still_terminates_known_main_process`. |

The runner output also showed the deployment smoke image and two invariant images verifying disposable account resources. No target server, host Docker socket or published daemon port was used. No secret value was emitted.

## Reading reaches and retained logs

Beyond the inputs listed in `reports/27-fixture-selection.md`, I read `.the-way/task-cycle/change/SKILL.md` because the dispatch required its pinned make-change method, and `.the-way/task-cycle/slice_size.py` because the dispatch required remeasuring the selected slice. I also read only the F11, F14 and F22 rows of `docs/task-cycles/konta-graczy-i-logowanie/plan.md` to identify the selected foundation rows and their slice scope. The dispatch file `reports/27-fixture-handoff.md` supplied the execution boundaries.

The full verifier output remains available from the task-owned runner containers: `docker logs loop2-task15-fixture-8c21680` is the passing exact-head run, and `docker logs loop2-task15-fixture-d116c20` is the initial failed run. The file `reports/linux-baseline-gate.log` is the earlier reviewed baseline, not either of these slice runs.

## Own-work check

Requirement: prepare this fixture with explicit production account resources while preserving `loop2-container-icons` and cleaning only its disposable resources. Check: the second full `npm test` run through the Linux verifier built and started the production image, verified its fresh account resources through the existing helper, and passed the icon fixture among all 176 invariant tests. The response-status and byte-equality assertions were unchanged. The helper registers cleanup before creating each disposable volume and the fixture registers image cleanup before building it.

Plausible faults checked by the fixture/helper are missing or incorrect production settings, an unreadable signing file, a non-writable database volume, wrong node identity, writable secret mount, missing listener, non-200 icon response, changed icon bytes, and an empty SVG set. A future D-109 refusal is intentionally not demonstrated at this base: the selected slice prepares the fixture before mandatory refusal lands, and the production settings are deliberately not weakened to manufacture that failure.

The weakest remaining point is that this preparation alone cannot prove the later startup-refusal behavior; that belongs to the dependent startup slice. The full gate does prove this fixture now exercises a real production-mode image with the required isolated resources and preserves the icon assertions.

## Choices, changes in evidence, and limits

Reused the existing production helper instead of duplicating Docker setup or switching the fixture to a development mode. Duplicated setup would create another resource contract to maintain; a development bypass would stop checking the production image. If the helper's resource contract is wrong, its direct uid/gid, permission, mount, configuration, write and memory assertions fail. No helper expansion was needed.

The first gate run exposed a missing import rather than a behavioral assertion failure. I added the explicit import used by the existing one-serving-process container test, committed it, rebuilt the bundle and reran the full gate. The initial failure remains recorded above and is not presented as icon assertion evidence. No assertion was changed or weakened, so no deliberate fail-once mutation/restoration was required for this slice.

No additional paths were needed beyond the dispatch. No separate or selected test command was run; repository tests were run only through `npm test`. The three named Windows-only tests remain unchecked on Linux as skips. The known Windows listener-enumeration baseline was not rerun. No browser screenshot or public journey applies to this test-only fixture change. No target deployment, benchmark or server operation was performed.
