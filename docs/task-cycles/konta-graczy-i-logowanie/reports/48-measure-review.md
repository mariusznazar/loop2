FAIL 19695d670a69ea6d005a3795541b57ba4fe5a3f6

# Review of planned slice 12: exact image measurement and durable account evidence

- Range: base 9c2173da4bef58b5f8d0c25ba2db20f9499a0a44 to head 19695d670a69ea6d005a3795541b57ba4fe5a3f6; commits 730f4e2, 8e06a39, 19695d6; eight paths, +1224/-13 (`git diff --stat`). `git rev-parse HEAD` equals the given head. `git -C .the-way rev-parse HEAD` and `git ls-files --stage -- .the-way` both show 574a37b9ab9572f876298f4cc10754581222d3f0. Worktree clean before and after the review.
- Method: `.claude/skills/the-way-review-change/SKILL.md` -> `.the-way/task-cycle/review/SKILL.md`, and the user's playbook `C:/Storage/The Brain/The Brain/Notes/Areas/(A) Claude code/playbook_code_review.md` (each finding: anchor, a short text to paste, then the full reasoning).
- Counts: 1 blocking (Important), 6 Minor, 1 out of scope.

## Blocking

### 1. Important — the human's identity check in the target-measurement procedure fails on the developer's PowerShell

**Anchor:** `docs/task-cycles/konta-graczy-i-logowanie/reports/47-measure-report.md:181` (procedure step 2, which slice 13 copies into the loop2-deploy skill)

**To paste:** In Windows PowerShell 5.1 the command `docker inspect --format '{{index .Config.Labels "org.opencontainers.image.revision"}}' loop2` stops with `template parsing error: template: :1: function "org" not defined` (exit 64) instead of printing the commit, because 5.1 drops the inner double quotes when it passes the argument to docker. Write the quotes as `\"` (or drop the line, since the launcher checks the label itself), and say which PowerShell the procedure assumes.

**Why I report it:**
- What it is for: the plan's slice 12 requires the slice to "prepare what the human runs and say exactly how". The procedure is how the human clears `player-argon2-deployment-check` and the task's acceptance criterion. The line is the human's own check, before the launcher runs, that the running `loop2` container comes from `<SHA>`.
- How it breaks: Windows PowerShell 5.1 passes a native argument that contains spaces wrapped in double quotes, without escaping the double quotes inside it. The Windows argument parser then reads `"{{index .Config.Labels "` as one quoted piece, `org.opencontainers.image.revision` as an unquoted piece, and `"}}"` as another quoted piece. So docker receives `{{index .Config.Labels org.opencontainers.image.revision}}`. Go's template parser reads `org` as a function name and rejects the template before it contacts any daemon.
- Evidence (run; see Checks 4–6): on this machine (PowerShell 5.1.26100.9711, Docker CLI 29.7.2, no PowerShell 7 installed), `node -e "console.log(JSON.stringify(process.argv.slice(1)))" '{{index .Config.Labels "org.opencontainers.image.revision"}}' loop2` prints `["{{index .Config.Labels org.opencontainers.image.revision}}","loop2"]`. With `DOCKER_HOST=tcp://127.0.0.1:1` (a closed local port, so no daemon is contacted), the procedure's exact command prints `template parsing error: template: :1: function "org" not defined` and exits 64. The same command with `\"org.opencontainers.image.revision\"` gets past template parsing and stops only at `error during connect` (exit 1). So the escaped form works on 5.1.
- Effect on the user: the step fails safe. It produces an error, not a false PASS, and the launcher checks the label anyway (`scripts/measure-passwords.mjs:106-109,188-193`). But the human running the procedure the task depends on hits an error on the second command. He may read it as "the image is not labelled", and slice 13 would put the broken line into both deploy-skill copies.
- Fix: `docker inspect --format '{{index .Config.Labels \"org.opencontainers.image.revision\"}}' loop2`, with a note that this is Windows PowerShell 5.1 syntax (in PowerShell 7.3+, `\"` would arrive as a backslash plus a quote). Or `docker inspect --type container --format '{{json .Config.Labels}}' loop2` and read the value. Or drop the line and rely on the launcher's check, which prints the label problem and runs nothing. While there: `> measure-<SHA>.txt` keeps only stdout, so the launcher's usage messages (stderr, exit 2) do not reach the file. That is acceptable, but the text could say so.

## Minor

### 2. Minor — the helper takes the mount point as a parameter, but its ownership and write probe still look at `/app/data`

**Anchor:** `tests/invariants/account_container_support.py:35-38` (probe) against `:110-112,118-131` (new `data_destination` parameter)

**To paste:** `verify_account_resources` now accepts `data_destination` from compose.yaml, but `RESOURCE_PROBE` still stats and writes `/app/data`. With a compose.yaml that mounts the volume elsewhere, the uid/gid and write assertions would check the image's own directory, not the fresh volume. Should the probe take the destination too?

**Why I report it:**
- What it is for: the slice's goal includes "fresh-volume node ownership". The probe's `directoryUid`/`written` fields are the direct evidence that node owns and can write the fresh volume.
- How it breaks: 8e06a39 made the replacement test read the mount point from compose.yaml (`tests/deploy/test_account_storage.py:70-80`) and pass it to `start_application` and `verify_account_resources`. The probe it runs still hard-codes `fs.statSync('/app/data')` and `/app/data/node-write-probe`. Example: compose.yaml says `accounts:/app/storage`, and the database path is `/app/storage/accounts.sqlite`. The volume then mounts at `/app/storage`, while `/app/data` stays the image directory the Dockerfile chowns to node. The uid/gid and write checks pass against the wrong directory.
- Why only Minor: in that example, `new AccountDatabase(path)` in the same probe still creates the database file on the volume. A root-owned fresh volume would still fail with EACCES, so writability stays covered indirectly; only the attribution of the ownership fields is wrong. Today compose.yaml mounts at `/app/data`, so nothing is wrong at the head.
- Fix: replace `/app/data` in the probe with a `LOOP2_DATA_DIRECTORY`-style value supplied through the probe's stdin, or with `path.dirname(process.env.LOOP2_DATABASE_PATH)`, and assert that the database path lies under `data_destination`.

### 3. Minor — `player-argon2-deployment-check` no longer carries the wording the readiness gate approved; the request must say so

**Anchor:** `foundations/invariants.md:624`

**To paste:** The task carries `player-argon2-deployment-check/1` to be written whole ("Zadanie zapisuje w całości", task.md:156,165). The new sentence replaces "within its memory budget" with the slice's numbers. Please name the old and new wording in the request, so the owner accepts the changed meaning at the merge.

**Why I report it:**
- The rule: `.the-way/task-cycle/skill/SKILL.md:235` and WAY-126 have a projected entry enter "whole, in the wording the readiness gate approved", or as "the part the code makes true". The executor did neither: it wrote a more specific sentence (report, Choices 6).
- Why it is not a defect of meaning: WAY-60 (`.the-way/foundations/decisions.md:1361-1368`) requires a sentence bounding a measured quantity to name "its bound or tolerance, statistic and population", and "within its memory budget" names none. Every number in the new sentence is carried by the plan's slice 12 (20+20 after warmup, two at a time, third refusal, OOM/restart, 80 % of 512 MiB) and by the spec, section 6. "Two at a time" agrees with the existing `password-operation-gate` ("at most two active native operations"). I checked the sentence against the code: `scripts/measure-passwords.mjs:102-175` enforces each clause, plus two stricter ones the sentence does not state (the v2 `oom` count and the v1 `failcnt`). Violated stays `yes`; Method stays `review`; no test claims it. So the local measurement clears nothing.
- Cost if left: the owner approved one sentence and the merge brings another. Without the request naming the difference (WAY-114), he would accept it without seeing it. That is the only consequence; it is a request-text obligation, not a code fix.

### 4. Minor — when docker fails, the launcher reports the step but not docker's reason

**Anchor:** `scripts/measure-passwords.mjs:65-86,178-187,223-232`

**To paste:** When `docker image inspect`, `run` or `wait` fails, the report says only "the image cannot be inspected" or "did not finish within 300 s", and docker's stderr is thrown away. Over `DOCKER_HOST=ssh://…` the likely failures (SSH authentication, docker permission on the server) would then be invisible. Could the report carry a trimmed stderr?

**Why I report it:** `runDocker` collects `stderr`, but `inspected()` and the callers drop it. On the target the first call goes over SSH. A rejected key, a host-key prompt or a user without docker rights all end as "the image cannot be inspected". A failed `docker wait` (for example a dropped SSH connection) is reported as a 300 s timeout even when it failed at once. Each failure still fails closed, so this is about diagnosis only. Docker's error text contains no password or hash: the synthetic passwords never leave the container, and docker's messages name hosts and objects. A trimmed (for example 500-character) stderr per failed step would let the human tell the cases apart without guessing.

### 5. Minor — an interrupted launcher leaves its container on the shared host, and the procedure does not say how to find it

**Anchor:** `scripts/measure-passwords.mjs:199-240`; `docs/task-cycles/konta-graczy-i-logowanie/reports/47-measure-report.md:192`

**To paste:** If the launcher process is stopped (Ctrl+C, closed terminal, lost SSH) during `docker wait`, its `finally` never runs. The `loop2-password-measure-<hex>` container keeps up to 512 MiB until the entrypoint's 120 s deadline, then stays as an exited container. The procedure could add `docker ps -a --filter name=loop2-password-measure-` and `docker rm -f <name>` for that case.

**Why I report it:** `finally { docker(["rm", "--force", name]) }` covers every path inside the process but not the process being killed. The container is started without `--rm`, deliberately, so it can be inspected afterwards. On the Mikrus host, which has no swap and is shared with other workloads (D-17's rationale), a leftover container is loop2's own and is bounded by its limit and by the entrypoint's deadline. So the damage is small, but the human has no instruction for it. One line in the procedure (step 4) is enough.

### 6. Minor — the label test pins the exact problem text

**Anchor:** `tests/password-measurement.test.mjs:270-272`

**To paste:** `assert.deepEqual(report.problems, ["the image's revision label is not the requested commit"])` breaks when the message is reworded, though the behaviour it protects is "only the label problem, and nothing runs". A match on `/revision label/` with a length of 1 would protect the same thing.

**Why I report it:** `guidelines/testing.md:137-140` ("Behaviour, not implementation") asks not to fix "dokładnego tekstu odmowy" without a requirement that sets it. The protective parts of the test, that no `run` call happens and that the label is the only reported problem, would survive a looser assertion. The same holds for `measure()`'s use of `startsWith("the image")` (`scripts/measure-passwords.mjs:188-190`) to pick out identity problems: rewording one message to start differently would let the run go ahead. Today the label test catches that, because it asserts that no `run` happens.

### 7. Minor — the part map does not name the launcher as a trust boundary, though it takes in the deployment's state

**Anchor:** `foundations/part_map.md:102-104` (build-tools *Trust boundary*)

**To paste:** `scripts/measure-passwords.mjs` reads the deployed image's labels and the answers of the server's Docker daemon, and its verdict is what clears an invariant. build-tools' trust boundary lists `scripts/kitchen-sink.mjs` but not this file. Should it be listed?

**Why I report it:** the part-map template (`.the-way/elements/part-map/template.md:98-103`) defines a trust boundary as files that "take in what the product does not control: data from the network, keys, the deployment". A later change there gets a crafted-input review only if the map lists it. The executor's reason for not listing it, "The launcher takes only the human's arguments and the answers of the docker daemon it is pointed at" (report, Part map), is defensible: the external context marks "the Mikrus host" as trusted. That is why this stays Minor and a question. If it is listed, `guidelines/testing.md:152-154` then asks for an invariant-tagged refusal test. The existing "label names another commit" case (`tests/password-measurement.test.mjs:263-277`) would serve, under an invariant of its own, since `player-argon2-deployment-check` is review-only.

## Out of scope

### 8. `guidelines/testing.md` does not list `tests/password-measurement.test.mjs`

**Anchor:** `guidelines/testing.md:257` (integration test, *Files*)

The new file runs a real process and real files (the entrypoint against a temporary cgroup directory), so it is an integration test. The recipe lists only four `.mjs` files. The file is outside the slice's nine Change paths, and the executor reported it (concern 5). It belongs to the testing guidelines, through `the-way-maintain-testing-guidelines`. The file does run in `npm test` (`tests/*.test.mjs` in `package.json:15`; the final log shows its cases), so coverage is not in doubt.

## Declined to judge

- Whether a 512 MiB candidate with two slots will pass on Mikrus. Only the human's run on the deployed image answers that; the slice claims nothing about it.
- Slices 8–11 and the whole change's fit to the task: the whole-change review judges them.
- The Dockerfile left unchanged: I checked that `RUN npm run build` compiles `src/server/**` (so `dist/server/measure-passwords.js` reaches the image) and that `/app/data` is already chowned (`Dockerfile:11,25`). There is nothing further to judge.

## What I checked and found sound (no finding)

- **Image and commit identity before anything runs:** `measure()` inspects the image, refuses a missing `org.opencontainers.image.title=loop2` or a revision label other than the 40-hex `--commit` before any `run`, then runs `image.Id` (not the tag) and checks `container.Image === image.Id`. The deploy script sets the label from a validated 40-hex commit (`deploy/loop2-deploy:50,107,298`). `--image` values starting with `-` are refused, and docker is spawned without a shell.
- **Memory flag bound:** 6m ≤ `--memory` ≤ 512m; the budget is fixed at 0.8 × 536870912 whatever `--memory` says; HostConfig Memory and MemorySwap must equal the request, and the cgroup limit read inside must equal it too. That last check also catches a container that reads a parent cgroup (for example the LXC's), which would show another limit.
- **cgroup v1/v2 readings and fail-closed paths:** missing controller, missing peak file and an unparsable count each throw, and the entrypoint exits 1 with its own reason. The v1 unlimited value is mapped to `max`; v1 swap is memsw minus limit. The launcher fails on any OOM/oom_kill/failcnt, a restart, a nonzero exit, a missing result, a result without measurements, fewer than 20+20, maxActive ≠ 2, gate misbehaviour and peak ≥ budget. Locally a real 64m run was OOM-killed and the launcher failed it (`47-measure-local.log:93-113`).
- **Isolation:** `--network none --read-only --cap-drop ALL --security-opt no-new-privileges --restart no`, with no `-e`/`-v`/`--mount`/env-file (asserted at `tests/password-measurement.test.mjs:257-258`); `rm --force` runs last on every in-process path (asserted per case).
- **No secret in output:** passwords come from `randomBytes(24)` and stay in memory; neither the encoded hash nor any password is printed (the test asserts no `$argon2` in stdout). The entrypoint imports only `passwords.js`, never the database or the configuration, and the test shows that production account settings in its environment open no database. The replacement test's password and cookie reach the container only through stdin; its failure messages print status and body, not the cookie.
- **Replacement test:** same data and secret volumes across `docker rm --force` of container 1 and the start of container 2 from the same image; node writes the fresh volume (but see finding 2); the cookie from registration still yields 200 with the same account after replacement, the password still signs in, and re-registration gives 409. The database path and the mount point come from compose.yaml's `app` service. Mutation A (mount moved) failed at `test_account_storage.py:145` with the 401-vs-200 assertion, and mutation B (no chown) failed at `account_container_support.py:114` with EACCES (`47-measure-mutation-A.log:510-518`, `47-measure-mutation-B.log:507-516`). Both were executed in disposable clones, and the unmutated heads passed (`47-measure-final.log`, `47-measure-final2.log`).
- **Neither obligation is cleared:** `player-argon2-deployment-check` stays Violated `yes`, Method `review`. `account-save-durable-storage` is unchanged (Violated `yes`), and no test cites it. The replacement test cites `account-schema-lifecycle`, whose clause "preserves existing version-1 accounts and sessions" it exercises across a process and container change, and whose Part includes deployment. D-17's Verification already says account/session checks cannot clear account-save-durable-storage.
- **New environment fact `cgroup-memory-accounting`:** I fetched both cited files at tag v6.12 and found each quoted passage. cgroup-v2.rst:1348-1349 (memory.peak), :1411-1413 (memory.events oom_kill); cgroup-v1/memory.rst:77 ("show max memory usage recorded"), :637-638 (failcnt "hit its limit"), and § 10 "oom_kill … killed by any" (around :899-901). The sentence says no more than the quotes.
- **Part map:** the account-server and build-tools sentences match the new files; `tests/password-measurement.test.mjs` is claimed once (build-tools); the other new paths fall under `src/server/**`, `scripts/**` and `tests/deploy/**`. `foundation_check.py` reports 0 errors.
- **D-12 and D-17 for the procedure:** the procedure is a human action (D-12 limits agents, not the human). It builds and pulls nothing, uses loop2's own image, creates and removes one loop2-named container under its own memory limit, and asks for the deployment's own MemAvailable threshold first (1048576 kB = `MIN_MEM_AVAILABLE_MIB=1024`, `deploy/loop2-deploy:35`). That fits D-17's "each loop2 container runs under its own memory limit" and leaves other workloads untouched. Not verified, and only an uncertainty: on a daemon without swap-limit support, Docker may record MemorySwap as -1, and the launcher would then fail with "may use swap". The procedure's step 4 lists only the cgroup-file failures. I have no source for whether the Mikrus daemon has this support.
- **Own-work check:** the executor named native-inclusive peak memory as the weakest point and backed it with a real OOM at 64m. That fits.

## Checks

| # | Check | Command or method | Exit / result |
|---|---|---|---|
| 1 | Head and pin | `git rev-parse HEAD`; `git -C .the-way rev-parse HEAD`; `git ls-files --stage -- .the-way`; `git status --short` | 0; head 19695d6…, pin 574a37b… both; clean |
| 2 | Range | `git log --format='%h %ae %s' 9c2173d..19695d6`; `git diff --stat 9c2173d..19695d6`; `git diff 9c2173d..19695d6 -- foundations tests/invariants/account_container_support.py` | 0; 3 commits, 8 paths +1224/-13 |
| 3 | Foundation check at head | `python -B .the-way/elements/common/foundation_check.py` (output to the scratchpad) | 0; `0 errors` |
| 4 | PowerShell 5.1 argument passing | PowerShell: `node -e "console.log(JSON.stringify(process.argv.slice(1)))" '{{index .Config.Labels "org.opencontainers.image.revision"}}' loop2` | 0; inner quotes dropped |
| 5 | The procedure's command | PowerShell: `$env:DOCKER_HOST = "tcp://127.0.0.1:1"; docker inspect --format '{{index .Config.Labels "org.opencontainers.image.revision"}}' loop2` | 64; `template parsing error: template: :1: function "org" not defined` |
| 6 | The escaped form | PowerShell, same DOCKER_HOST: `docker inspect --format '{{index .Config.Labels \"org.opencontainers.image.revision\"}}' loop2`; also the node argv probe with `\"` | 1 (`error during connect`, after template parsing); argv shows the quotes kept |
| 7 | Cited kernel docs | `curl -sSfL -o v2.rst https://raw.githubusercontent.com/torvalds/linux/v6.12/Documentation/admin-guide/cgroup-v2.rst`; same for `cgroup-v1/memory.rst`, into the scratchpad; then `grep`/`sed` | 0, 0; every quoted passage found |
| 8 | Source inspection (not executed evidence) | Read the whole of `src/server/measure-passwords.ts`, `scripts/measure-passwords.mjs`, `tests/password-measurement.test.mjs`, `tests/deploy/test_account_storage.py`, the helper diff and `RESOURCE_PROBE`, `src/server/passwords.ts`, `compose.yaml`, `Dockerfile`, `deploy/loop2-deploy:35-50,90-130,200-260,298-316` | — |
| 9 | Executor's logs (their evidence, read) | `47-measure-final2.log` (HEAD 19695d6; 429/429 Node; Python 5+66+176+32 OK, skipped=3; replacement-test resource lines for both containers; `0 errors`), `47-measure-mutation-A.log`, `47-measure-mutation-B.log`, `47-measure-local.log` | as quoted in the findings |

Not run, and why:
- Full `npm test`: the executor's final run at this head exits 0 (`47-measure-final2.log`), and no finding disputes test evidence. The handoff allows a run only for disputed evidence.
- No selected node/unittest command (forbidden by the handoff).
- No local measurement on `loop2-task15-dind`: the executor's local log suffices for this review, and finding 1 needs no daemon.
- Nothing on the server. The procedure is unverified on Mikrus; whether `memory.peak` and swap-limit support exist there is unknown.
- The new cgroup v1 test and the "a result without measurements" case were never seen failing (the executor's concern 4). These are not invariant tests, so I did not require it.

## Reaches beyond the dispatch

- `.the-way/task-cycle/skill/SKILL.md:225-245`: the projected-entry rule the handoff quotes, to judge finding 3.
- `.the-way/foundations/decisions.md` WAY-126 (:2849-2870) and WAY-60 (:1361-1383): which rule governs the rewritten invariant sentence.
- `.the-way/elements/part-map/template.md:94-135` and `.the-way/elements/part-map/skill/SKILL.md:50-60`: the definition of a trust boundary, for finding 7.
- `foundations/decisions.md` D-12 and D-17 whole, read by identifier: the handoff names them for the procedure.
- `foundations/invariants.md`, entries `account-schema-lifecycle`, `account-save-durable-storage`, `account-session-storage`, `player-argon2-deployment-check`, `password-operation-gate` whole, read by identifier at the head (the foundation changed in the range).
- `deploy/loop2-deploy` (ranges in Check 8): how the revision label is set and the MemAvailable threshold, for the attribution and D-17 checks.
- `src/server/passwords.ts`: whether gate admission is synchronous, which the third-refusal check depends on.
- `package.json:15`: whether the new test file is in `npm test`.
- Linux v6.12 cgroup documentation (Check 7): the new environment fact's source.
