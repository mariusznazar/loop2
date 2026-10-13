# Return-step review: 6bba3d2..1d0a2e8

What this covers:

- The two new invariant checks, added in d82996c.
- The skill and README fixes in 1d0a2e8.
- A reviewer's reading of the foundation diff against the code.

The independent assessment of the foundation is separate and not done here. The worktree was read only. All breaks ran on a scratch copy at 1d0a2e8 (`git archive`), and the script was restored afterwards, byte-identical to the worktree's (`cmp`).

## Verdict

**Needs one fix.**

- **The trigger-input check is sound.** All 4 breaks are caught.
- **The keeps-running check misses one break.** A break that stops the container through a Compose command missing from its word list passes (Important 1).
- **The skill and README changes match the script**, hold no access value, and the README sentence is correct Polish.
- **The foundation entries agree with the code.** There are two wording points (Minor 3 and 4).

## Deliberate breaks (WAY-69, WAY-08)

Each break is written from the invariant's sentence and applied to `deploy/loop2-deploy` by the scratchpad script `retbreaks.py`. Command: from `tests/invariants`, `python -B -m unittest test_loop2_deploy_trigger_input` or `test_loop2_deploy_keeps_running`.

**Baseline:** unbroken, both files pass, 23 tests.

**`loop2-deploy-trigger-input/1`** ("refuses every input but one commit name of 40 lowercase hexadecimal characters before it fetches, builds or changes a container, and deploys only a commit that belongs to `main` as just fetched"):

| Break | Result |
|---|---|
| R1 the pattern accepts uppercase (`^[0-9a-fA-F]{40}$`) | check FAILED: the `uppercase` and `one uppercase letter` inputs |
| R2 the forced input has its white space removed before the match | check FAILED: 7 white-space and newline inputs |
| R3 the forced path accepts a commit of any fetched branch (it falls into the human path's loop) | check FAILED: `test_commit_of_another_branch_the_clone_already_holds_refused` |
| R4 the forced path skips the fetch when the clone already holds the commit (`main` not "as just fetched") | check FAILED: `test_commit_main_no_longer_holds_refused` |

**`loop2-deploy-keeps-running/1`** ("A deployment that stops before it starts the new container … leaves the running loop2 container in service"):

| Break | Result |
|---|---|
| K1 when the memory gate refuses, `docker compose … stop app` runs "to free memory" | check FAILED: `test_stop_at_the_memory_reading` |
| K2 after a failed build, `docker compose … up -d --no-build app` runs "to restore" | check FAILED: the type-check and build tests |
| K3 `docker rm -f loop2` at the start of the build stage | check FAILED: 3 tests |
| K4 when the memory gate refuses, `docker compose … scale app=0` runs | **check PASSED (missed)** |

## Issues

### Critical

None.

### Important

1. **The keeps-running check misses a Compose command that stops the container.** `tests/invariants/test_loop2_deploy_keeps_running.py:40`.
   - `STOPPING_WORDS` lists `up, down, rm, stop, kill, restart, create, pause, remove, run`. It leaves out `scale`. Compose v2's `docker compose scale app=0` stops and removes the service's container, so break K4 takes loop2 out of service at exit 5 and every test passes.
   - The list approach is open-ended: any command outside it goes unseen.
   - The fix belongs to the check author. Invert the reading: allow, before the switch stage, only the docker calls that read or build (`inspect`, `info`, `compose … build`, `compose … logs`, `image prune` with the loop2 filter). Or at least add `scale` and `update`.
   - An allowed list makes the next missing word a failure instead of a silent pass.

### Minor

1. **The two checks' docstrings name four stubs.** `tests/invariants/test_loop2_deploy_keeps_running.py:7` and `test_loop2_deploy_trigger_input.py:7` say "recording stubs for docker, curl, flock and df". The seam also stubs `hostname` and `uname`.
2. **Two keeps-running tests make the same failure.** `tests/invariants/test_loop2_deploy_keeps_running.py:126,134`: the "type check" and "build" stops are the same stubbed build failure, differing only in the output text. The type check runs inside the image build, so the script cannot tell them apart. This is acceptable, but the docstring should say that the type check stop is the build's failure.
3. **D-17 says more than the build allows.** `foundations/decisions.md:435`: "changes nothing on the host but loop2's own checkout, image, container, log and lock".
   - A build also adds BuildKit cache and pulls its base image into the Docker store shared with the other workloads, and the script never reclaims either (spec § 5 "Never").
   - The base image tag can be one another workload uses.
   - Suggested: name "the build cache and the base image it pulls" among what a deployment adds, or reword to "removes or replaces nothing of another workload".
4. **The glossary term `deployment` and the part `deployment` read alike** (format guard warning, glossary `foundations/glossary.md:13`; part map `foundations/part_map.md:74`).
   - The glossary defines the act of deploying; the part is the files that do it. By the guard's own rule, two meanings mean one side is renamed.
   - The meaning that has to stay, and the rename, are to be settled through `the-way-record-glossary-term` or `the-way-update-part-map`.
5. **The glossary's test server says accounts are served there now.** `foundations/glossary.md:23`: "where loop2 runs for its players, accounts included".
   - D-10 and D-12 say no player account is served there while Cloudflare connects to the server over plain HTTP.
   - The definition reads as if accounts are served today. Suggested: "accounts included once they are served there", or drop the clause.
6. **The README sentence groups the skill's test as a deployment test.** `README.md:23`: "Testy wdrożenia: … tests/deploy i … tests/agent_workflow". `tests/agent_workflow` holds the test of the deployment skill, not of the deployment. Suggested: "Testy wdrożenia i skilla `loop2-deploy`: …". The Polish is correct.
7. **The trigger-input check pins the step-3 call exactly.** `tests/invariants/test_loop2_deploy_trigger_input.py:82`: `READ_RUNNING_REVISION` copies that argument list. Any rewording of step 3 fails the check, loudly. Acceptable as a literal expected value; noted so the check author knows.

## Checks of facts and code

**Skill (`.claude/skills/loop2-deploy/`, `.agents/skills/loop2-deploy/`):**

- The two copies are identical (`diff -r`).
- The running-commit command now carries `--type container`, as the script does since 6643314 (`deploy/loop2-deploy:130`).
- The memory limit 512 MiB matches `compose.yaml:13` (`mem_limit: 512m`).
- "Any other workload must stay untouched" matches D-17 and the part map.
- No server name, SSH port, user or IP address appears; a search for addresses and five-digit ports finds none but 18080.
- One line runs long after the edit (`references/setup_and_secrets.md`, step 5). Cosmetic.

**Foundation against the code:**

- **D-11** ("a newer push replacing a deployment still waiting to run") matches `.github/workflows/deploy.yml:11-13` (`concurrency: deploy-loop2`, `cancel-in-progress: false`).
- **D-15 and D-16** match the script:
  - exits 2–7 stop before `up`;
  - the human path accepts any branch, the forced path only `main`;
  - the installed copy is compared with the source and only warns (`compare_installed_script`);
  - the prune keeps no earlier image.
- **The account-server failure mode** "port not a whole number from 1 to 65535" matches `src/server/main.ts:7-8`.
- **The `deployment` part's failure modes** match the script's stages and exit codes. "Lock file gone after a restart" matches Slice 3's open concern about `/run` and the run account.

**Format guards** (`--base` merge-base with `main`, `--merge-onto` `main`):

| File | Errors | Warnings | Note |
|---|---|---|---|
| `environment_facts.md` | 0 | 0 | |
| `invariants.md` | 0 | 0 | |
| `glossary.md` | 0 | 1 | Minor 4 |
| `part_map.md` | 0 | 2 | criticality propagated to `account-server`; 1 unchecked (no dependency-graph command) |
| `decisions.md` | 8 | 8 | |

`decisions.md`'s 8 errors are all the placeholder "Approved by: merge of <request link>" in D-10 to D-17, which a merge onto `main` does not take. That is the expected state before the merge; it stays unchecked until the link is filled in.

## Re-review after 5e85eb0

Range 1d0a2e8..5e85eb0:

- **051a269** is the check author's fix of the keeps-running check.
- **5e85eb0** is the entries author's fix of D-17 and the glossary.

The breaks ran on a scratch copy at 5e85eb0 (`git archive`) with the same anchors as before. The script was restored and is byte-identical to the worktree's (`cmp`).

**Baseline:** unbroken, both checks pass (23 tests).

**Keeps-running breaks repeated:**

| Break | Result | Failing test |
|---|---|---|
| K1 the memory gate runs `compose … stop app` | check FAILED | `test_stop_at_the_memory_reading` |
| K2 a failed build runs `compose … up -d --no-build app` | check FAILED | `test_stop_at_the_build_or_its_type_check` |
| K3 `docker rm -f loop2` at the start of the build stage | check FAILED | 2 tests |
| K4 the memory gate runs `compose … scale app=0` (missed before) | check FAILED | `test_stop_at_the_memory_reading` |

### Findings

| Finding | Verdict | Where it stands |
|---|---|---|
| Important 1: the keeps-running check missed `scale` | **ADDRESSED** | `tests/invariants/test_loop2_deploy_keeps_running.py` now checks every recorded docker call against an allow-list of read-only calls (`READ_ONLY_DOCKER`, `READ_ONLY_COMPOSE`), plus `compose build` only for a stop at the build stage (`off_the_list`). A made-up list of calls pins the reader (`test_reader_on_written_out_calls`: `scale`, `update`, `--dry-run rm`, the filtered prune, a bare `compose`). The positive control now requires the `up` to be found off the list. |
| Minor 1: the docstrings named four stubs | **ADDRESSED** | Both checks now name `hostname` and `uname`. |
| Minor 2: two keeps-running tests made the same failure | **ADDRESSED** | Merged into `test_stop_at_the_build_or_its_type_check`; the docstring explains it. |
| Minor 3: D-17 left out the build cache and base image | **ADDRESSED** | `foundations/decisions.md:435-439` names the build cache and the base image, never pruned, and "removes or replaces nothing of another workload". `invariants.md`'s fingerprint is moved to `D-17@c332eebd`. The guards with `--base`/`--merge-onto` give invariants 0 errors; decisions keeps only the 8 expected "merge of <request link>" placeholders. |
| Minor 5: the test server read as serving accounts now | **ADDRESSED** | `foundations/glossary.md:23-24`: "where player accounts are served once the game has them". |
| Minor 4: glossary `deployment` vs. part `deployment` | **NOT ADDRESSED** | The guard warning remains (`foundations/glossary.md:13`). Not claimed by this range. |
| Minor 6: README groups the skill's test as a deployment test | **NOT ADDRESSED** | Not claimed by this range. |
| Minor 7: the trigger check pins the step-3 call | **NOT ADDRESSED** | Acceptable as a literal; not claimed by this range. |

**Nothing broken in the fix diff.**

- The allow-list is stricter than the old word list: a stop before the build may not even call `build`.
- Unknown forms fail rather than pass: a docker call starting with a global option such as `--context`, and a compose option outside `COMPOSE_OPTIONS_WITH_VALUE`.
- No assertion was dropped: the merged test keeps the build-failure stop, and the positive control still requires the `up` to be found.

**Verdict:** the Important finding is addressed. The return-step range is acceptable. Minors 4, 6 and 7 are open and none of them blocks.
