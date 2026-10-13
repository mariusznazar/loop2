# Settlement review: 5e85eb0..175f4f6

What this covers, in four commits:

- **4fcfc65:** foundation entries. A new invariant `loop2-host-sharing/1` derived from D-17, new rationale text, failure modes, and Derives-from changes.
- **010923f:** the workflow reader is cut from the typecheck check.
- **6eb2d7c:** the new `tests/invariants/test_loop2_host_sharing.py`.
- **175f4f6:** docstring fixes.

The worktree was read only.

The breaks ran on a scratch copy at 175f4f6 (`git archive`). The copy was made a throwaway git repository, so that `test_no_other_deployment_route` can call `git ls-files`. Each break was applied by the scratchpad script `setbreaks.py` to `deploy/loop2-deploy` or `compose.yaml`, and the files were restored afterwards; the scratch repository's `git status` is clean.

## Verdict

**Needs fixes in the new check.**

- **The host-sharing check misses 3 of my 5 script breaks** (Important 1). The script half matches Docker commands by their spelling, so alias spellings and `docker tag` slip through.
- **Its Compose half held:** all 3 Compose privilege breaks are caught.
- **The cut left the typecheck check's Dockerfile, Compose and script reads intact,** and the isolation check stays faithful to its sentence.

## 1. Deliberate breaks of `loop2-host-sharing/1`

The sentence: "A deployment of loop2 stops, removes, replaces or reconfigures no container, image, network or volume on the host other than loop2's own, and the loop2 Compose service asks the host for no privilege that a default container lacks."

Command: from `tests/invariants`, `python -B -m unittest test_loop2_host_sharing`.

**Baseline:** unbroken, it passes 15 tests. With the isolation check and the typecheck check's class it is 24 tests, on the scratch copy and on the worktree alike.

| Break | Listed in the settlement? | Result |
|---|---|---|
| HS1 script: `docker image remove node:24-bookworm-slim` (the base image, which another workload may use) | no | **check PASSED (missed)** |
| HS2 script: `docker container remove --force other-workload` | no | **check PASSED (missed)** |
| HS3 script: `docker tag loop2-app:latest loop:latest` (puts loop2's image over the old game's image name) | no | **check PASSED (missed)** |
| HS4 script: `docker container stop other-workload` | no | check FAILED: `test_no_state_change_on_another_container_network_or_volume` |
| HS5 script: `docker --host unix:///var/run/docker.sock compose … up` | yes (`-H`/`--host`) | check FAILED: `test_docker_takes_no_global_option` |
| HC1 compose: `oom_score_adj: -1000` (the kernel would kill other workloads first) | no | check FAILED: `test_service_sets_only_keys_that_grant_nothing` |
| HC2 compose: `network_mode: host` | no (named in the docstring) | check FAILED: same test |
| HC3 compose: `privileged: true` | yes | check FAILED: same test |

I also tried a fourth Compose change: a service label `com.docker.compose.project: loop`. The check passes on it, but I don't count it as a break. It would expose loop2's own container to the old game's Compose project; it does not let loop2 act on another workload, and it asks for no privilege.

## 2. The cut and the isolation check

**`account-server-typecheck/1`.**

- `test_account_server_typecheck.py` keeps three reads:
  - the Dockerfile read (`test_dockerfile_type_checks_before_the_runtime_stage_takes_dist`);
  - the Compose read (`test_compose_builds_the_image_and_names_none_to_pull`);
  - the script read (`test_deploy_script_builds_before_starting_without_building`), with the order-of-calls reading from 7edefb0.
- `test_no_other_deployment_route` still counts the workflow as a known route (`ROUTE_FILES`).
- The removed workflow helpers (`strict_workflow`, `workflow_keys`, `_workflow_scalar`) have no remaining caller.
- Earlier breaks repeated:

| Break | Result |
|---|---|
| T1 `up` without `--no-build` | check FAILED |
| T2 `main` calls `start_container` before `build_image` | check FAILED (`'up' != 'build'`) |

- The docstring states what the cut leaves to the forced command and the clean checkout, which is the settlement's reason for C1.

**`loop2-container-isolation/1`** ("runs in a container separate from the existing loop instance").

- The check now reads `compose.yaml` and the Dockerfile only:
  - its own project, service and container;
  - nothing shared with another container or the host;
  - no name of the old instance.
- That is the sentence. The script half moved to host-sharing, and the docstring says so.
- Break I1 (`pid: host` in the service): check FAILED (`test_compose_shares_nothing_with_another_deployment`).

**Foundation.**

- `foundations/invariants.md` (the new entry, D-11 added to trigger-input's Derives from): format guard 0 errors, with `--base` and `--merge-onto`.
- `decisions.md`: only the 8 expected "merge of <request link>" placeholders.
- `part_map.md`: 0 errors, 2 warnings that existed before this range.
- The two new failure modes, the lock account without write access to `/run` and the build cache filling the disk, match the script (`take_lock`; the disk gate in `check_resources`; no cache prune anywhere).
- The D-16 and D-17 rationale about trusted code merged to `main` matches the forced-command design.

## 3. Issues (in the diff)

### Critical

None.

### Important

1. **The host-sharing check matches Docker commands by spelling, so aliases and `tag` slip through.** `tests/invariants/test_loop2_host_sharing.py:58-69,202-243`.
   - Image removal is checked only as `rmi` and `image rm` (`:209-210`). Docker's alias `image remove` passes: break HS1.
   - Container changes are checked against `EVERY_TARGET`/`FIRST_TARGET` (`:64-65`), which have no `remove`. Docker's alias `container remove` (and `docker remove`) passes: break HS2.
   - `tag`, which replaces another image's name, is in no list: break HS3.
   - The old-name test catches `loop` itself, but not a tag such as `loop:latest`, nor any other workload's name.
   - This is the same open-ended deny-list pattern the keeps-running check had before 051a269.
   - Fix (for the check author): read the script's Docker commands against an allow-list of the commands a deployment may run, by their words after `docker`:
     - `inspect` (with `--type container`), `info --format …`;
     - `compose -p loop2 -f /srv/loop2/… build|up|logs|ps`;
     - `image prune` with the loop2 filter.
   - Any other command fails, with its aliases or not.

### Minor

1. **The new check repeats rules the old isolation check had.** `tests/invariants/test_loop2_host_sharing.py:57-79`: `OLD_NAME_WORD`, `READ_ONLY_DOCKER`, `HOST_WIDE_PRUNES` and the reader self-tests moved over verbatim. That is acceptable, since the isolation file no longer holds them, but an allow-list fix of Important 1 would replace most of these lists.
2. **The script's `info --format` call passes only by omission.** `tests/invariants/test_loop2_host_sharing.py:245-250` treats any first word starting with `-` as a global option. `docker info --format …` is fine because `info` is the first word, but neither `info` nor `logs` is on any list. An allow-list (Important 1) would name them.

## Re-review after 2732c2a

Range 175f4f6..2732c2a: one commit, which changes only `tests/invariants/test_loop2_host_sharing.py`.

The breaks ran on the same scratch copy, with that file replaced by its 2732c2a version. The deploy script and `compose.yaml` were restored after each break.

**Baseline:**

- Scratch copy, the three check files: 21 tests pass (the host-sharing check, the isolation check and the typecheck check's class).
- Worktree at 2732c2a, `test_loop2_host_sharing` read only: passes.

**Breaks repeated:**

| Break | Result |
|---|---|
| HS1 `docker image remove node:24-bookworm-slim` | check FAILED (missed before) |
| HS2 `docker container remove --force other-workload` | check FAILED (missed before) |
| HS3 `docker tag loop2-app:latest loop:latest` | check FAILED (missed before) |
| HS4 `docker container stop other-workload` | check FAILED |
| HS5 `docker --host unix:///var/run/docker.sock compose … up` | check FAILED |
| HC1 compose `oom_score_adj: -1000` | check FAILED |
| HC2 compose `network_mode: host` | check FAILED |
| HC3 compose `privileged: true` | check FAILED |

All the script breaks now fail `test_every_docker_command_is_one_a_deployment_may_run`. The Compose breaks fail `test_service_sets_only_keys_that_grant_nothing`.

**Important 1 (the check matched Docker commands by spelling): ADDRESSED.**

The check now runs every Docker command the script holds through `docker_problems`, against an allow-list:

- `info`, with `--format` only;
- `inspect` of `loop2` or `loop`, with `--type container` (or as `container inspect`);
- `logs` of `loop2`;
- `image prune`, with the loop2 label filter and nothing beside it but `dangling=true`;
- `compose -p loop2 -f /srv/loop2/…` with the subcommands `build`, `up`, `logs` and `ps`, each with its listed options, and the service `app` as the only object.

**Minor 1 and 2** (repeated lists; `info` passing only by omission): **ADDRESSED.** The deny-lists are gone, and `info` and `logs` are now named on the allow-list.

**Test count 84 → 81: merged, not lost.**

- The file went from 15 to 12 test methods. Four were removed, each now covered by the new `test_every_docker_command_is_one_a_deployment_may_run`:
  - host-wide prune and image removal only by the loop2 label;
  - no state change on another container, network or volume;
  - no global option;
  - compose takes only the project and file options.
- I fed `docker_problems` each form the removed tests caught. Every one is still refused:
  - `system prune`; an unfiltered `image prune`; `image prune` with a different label; `rmi`; `image rm`;
  - `network rm`; `volume prune`; `run`; `create`; `update … loop`; `rename loop …`;
  - a global `--context`; compose `--profile`; compose `-p loop`; compose `down`; a Compose file outside `/srv/loop2/`; a service other than `app`.
- Still allowed: `inspect --type container loop` and `container inspect loop`, the read-only reads of the old game the sentence permits.
- The other tests are unchanged: project naming, `down`, old-name-only-read, the variables test, the three Compose tests and the reader self-tests.

**New in the diff (Minor, it fails closed): the two old-game tests disagree on `container inspect loop`.**

- `test_old_deployment_is_only_read` treats a `loop` read as read-only only when the command's first word is `inspect` or `ps` (`plain_words(d)[:1]`).
- So `docker container inspect loop` would fail that test although the allow-list accepts it.
- `ps` is no longer on the allow-list at all.
- Nothing breaks today: the script uses `inspect --type container`. Align the two when convenient.

**Verdict:** ADDRESSED. The host-sharing check now fails on every break written from its sentence.
