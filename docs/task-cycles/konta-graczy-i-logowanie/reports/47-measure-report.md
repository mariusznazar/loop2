# Slice 12 report: image password measurement and account durability across container replacement

**Status:** done with concerns (the concerns are listed at the end; none blocks the slice).

- Base: 9c2173da4bef58b5f8d0c25ba2db20f9499a0a44. Head: 19695d670a69ea6d005a3795541b57ba4fe5a3f6. Branch task/konta-graczy-i-logowanie. Process gitlink and checkout: 574a37b9ab9572f876298f4cc10754581222d3f0 (both checked).
- Method: `.claude/skills/the-way-make-change/SKILL.md` → `.the-way/task-cycle/change/SKILL.md`. I did not read cycle.md, ask the human, dispatch an agent or start a review.

## Commits

| Commit | Content |
|---|---|
| 730f4e24f68c100458d730ea348b2552137e509d | Measurement entrypoint, launcher, their test, the container-replacement test, the container helper split into steps, foundation entries. |
| 8e06a3975730bb38136a23ea8d267b93efeade85 | The replacement test takes the database path and the volume's mount point from compose.yaml (see Choices 4). |
| 19695d670a69ea6d005a3795541b57ba4fe5a3f6 | The entrypoint also reads cgroup v1 (the local daemon is cgroup v1); a measurement stopped early is reported by its own reason; the fact widened to v1. |

Author address on all three: the owner's private address. Staged by explicit paths.

## Changed paths (base..head, added/removed)

| Path | + | − |
|---|---:|---:|
| `src/server/measure-passwords.ts` (new) | 384 | 0 |
| `scripts/measure-passwords.mjs` (new) | 275 | 0 |
| `tests/password-measurement.test.mjs` (new) | 333 | 0 |
| `tests/deploy/test_account_storage.py` (new) | 183 | 0 |
| `tests/invariants/account_container_support.py` | 38 | 9 |
| `foundations/environment_facts.md` | 6 | 0 |
| `foundations/invariants.md` | 2 | 2 |
| `foundations/part_map.md` | 3 | 2 |

8 of the 9 Change paths. **`Dockerfile` is unchanged**: the build stage already compiles every `src/server/**/*.ts`, so `dist/server/measure-passwords.js` lands in the image next to `node_modules/argon2`; `/app/data` already belongs to node. No path outside the nine changed.

## What was made

**Entrypoint `src/server/measure-passwords.ts`** (in the image as `node dist/server/measure-passwords.js`). It imports `hashPassword`, `verifyPassword`, `PasswordCapacityError` and `PASSWORD_HASH_PROFILE` from `passwords.ts`, so it measures the production gate and profile, not copies of them. Passwords are random, in memory only; it opens no database and reads no session secret, and prints no password or hash. Steps:
1. Reads the container's memory accounting before starting: cgroup v2 (`memory.max`, `memory.peak`, `memory.current`, `memory.events`, optional `memory.swap.max`) or cgroup v1 (`memory/` with `memory.limit_in_bytes`, `memory.max_usage_in_bytes`, `memory.usage_in_bytes`, `memory.failcnt`, `memory.oom_control`, optional `memory.memsw.limit_in_bytes`). If neither layout is there, or the peak file is missing, it fails at once.
2. Hash, then check the right password (must pass) and a wrong one (must fail).
3. Gate: starts two operations, a third one must be refused at once with `PasswordCapacityError`, then two more must be admitted after the first two release.
4. Warmup: 2 hashes and 2 verifications, two at a time. Measured: 20 hashes and 20 verifications from one list, run by two workers. It records the highest number running at once, and the minimum, median and maximum time per kind.
5. Reads the cgroup again and the process's highest resident memory (`maxRSS`).
6. Prints one JSON line. Exit 0 only when every functional check holds; exit 1 for a failed check, an error or the deadline (120 s by default, `--deadline-ms` from 1 to 600000); exit 2 for a usage error. It does not judge the memory budget itself: the launcher does that, because it knows the deployment's limit.

**Launcher `scripts/measure-passwords.mjs`**: `node scripts/measure-passwords.mjs --image <image id or name> --commit <40 lowercase hex> --memory 512m`. It talks to whatever daemon the docker CLI points at (DOCKER_HOST or the current context).
- It refuses unknown or repeated arguments, a commit that is not 40 lowercase hex, and a limit under 6m or over 512m (the `mem_limit` in compose.yaml). A smaller limit is allowed; it only makes the run stricter.
- **Image label first:** `docker image inspect`. If the image is not labelled `loop2` or its revision label is not the commit, it reports that and **runs nothing**.
- It runs the inspected image id with `--network none --memory X --memory-swap X --restart no --read-only --cap-drop ALL --security-opt no-new-privileges --entrypoint node`, with no environment, volume, mount or secret, under a unique `loop2-password-measure-<hex>` name. `docker wait` is bounded at 300 s (after that `docker kill`). Then `docker inspect` and `docker logs`, and `docker rm --force` in a `finally` on every path.
- **Verdict (PASS / exit 0 only if no problem):**
  - the container ran the inspected image;
  - Memory and MemorySwap equal the requested limit;
  - OOMKilled is false, RestartCount is 0 and ExitCode is 0;
  - the result is ok with no errors and the profile is Argon2id;
  - the right password passes and the wrong one fails;
  - two operations are admitted, the third is refused and two are admitted again after release;
  - at least 20 hashes and 20 verifications ran, two at a time;
  - the cgroup shows the requested limit and no swap;
  - the oom and oom_kill counts are 0 (on v1, the limit-hit count and oom_kill);
  - the cgroup peak is below 0.8 × 536870912 = 429496729.6 bytes. This budget is fixed at 80 % of 512 MiB whatever `--memory` says.
- Output: the full JSON report, then `PASS` or `FAIL: <problems>`.

**Replacement test `tests/deploy/test_account_storage.py`** (`# invariant: account-schema-lifecycle`):
1. Builds the image from the working tree and creates fresh data and secret volumes; the secret is synthetic.
2. Container 1 runs the normal command with production settings under 512 MiB. Node writes the fresh volume and the database opens on it.
3. Inside the container, over HTTP, with the Cloudflare headers and the public Origin, it registers a synthetic account (201 plus the session cookie), then `GET /api/account` with that cookie returns 200 with the account.
4. `docker rm --force` removes container 1; the data volume must still exist.
5. Container 2 starts from the same image on the same volumes; ownership and writes are checked again.
6. The same cookie still returns the same account (200); the password still signs in (`POST /api/session` 200, same account); registering the same address again gives 409.

The database path and the mount point of the `accounts` volume are read from the `app` service in compose.yaml. The password and the cookie reach the container only through the probe's standard input and are never printed.

**Container helper `tests/invariants/account_container_support.py`**: `start_production_container` keeps its interface and behaviour and now calls three steps: `create_account_volumes`, `start_application` and `verify_account_resources`. Database path and mount point are parameters whose defaults are compose.yaml's values. New check: the data mount carries the named data volume.

## Checks (command, exit)

All repository tests ran only as full `npm test` in the Linux harness (reports/linux-verification.md). COMMON is `--network container:loop2-task15-dind -e DOCKER_HOST=tcp://127.0.0.1:2375 --mount type=bind,source=C:/Storage/repos/loop2/.runs/worktrees/konta-graczy-i-logowanie/.runs/account-linux-inputs,target=/inputs,readonly loop2-task22-verifier:latest`, run from Git Bash with `MSYS_NO_PATHCONV=1` and target ref 7012abcfb55b4ba2b2836b574a2275eb1551df28. Before each run at a new head: `git bundle create .runs/account-linux-inputs/product.bundle task/konta-graczy-i-logowanie origin/main` (exit 0; heads checked with `git bundle list-heads`).

| # | Command | Exit | Result |
|---|---|---:|---|
| 1 | local: `npm run build`, `node --test tests/password-measurement.test.mjs`, eslint `--max-warnings 0`, prettier, `node scripts/build.mjs --check`, ruff on both Python files | 0 | Quick feedback only, not the evidence of record. |
| 2 | `docker run --name loop2-task15-measure47-red COMMON bash /inputs/verify-session34-overlay.sh 9c2173d… 7012abc… measure47-red.tar` | 1 | `47-measure-red.log`: first failing run (below). |
| 3 | (discarded) two mutation runs at 730f4e2, removed with `docker rm -f` a few seconds after start | — | I had designed mutations that also break Node tests, so `npm test` would stop before Python and never reach the container test. No result is claimed from them. Their logs were overwritten by row 4. |
| 4 | `docker run --name loop2-task15-measure47-mutation-A COMMON bash /inputs/verify-measure47-mutation.sh 8e06a39… 7012abc… A` | 1 | `47-measure-mutation-A.log` (below). |
| 5 | same, mode B | 1 | `47-measure-mutation-B.log` (below). |
| 6 | `docker run --name loop2-task15-measure47-final COMMON bash /inputs/verify.sh 8e06a39… 7012abc…` | 0 | `47-measure-final.log`: restores both mutations. 428 Node tests pass; Python 279 tests in 4 directories, every directory passed (skipped=3); foundation check 0 errors. |
| 7 | `docker run --name loop2-task15-measure47-local … bash /inputs/measure47-local.sh 8e06a39… 512m 64m` | 1 | First local measurement: both runs FAIL, failing closed, because the local daemon has cgroup v1 and the code then read only v2 (`cgroup file memory.max is unavailable`). This led to commit 19695d6. The log was overwritten by row 8; the run is recorded here. |
| 8 | `docker run --name loop2-task15-measure47-local … bash /inputs/measure47-local.sh 19695d6… 512m 64m` | 1 (the 64m run, by design) | `47-measure-local.log`: **512m PASS (launcher exit 0); 64m FAIL (launcher exit 1, real OOM kill)**. Values in "Local measurement". |
| 9 | `docker run --name loop2-task15-measure47-final2 COMMON bash /inputs/verify.sh 19695d6… 7012abc…` | **0** | `47-measure-final2.log`: **final head**. 429 Node tests pass, 0 fail, 0 skipped. Python 5+66+176+32 tests, every directory passed, `skipped=3` (the three Windows-only tests). `foundation_check.py` inside npm test: 0 errors. The replacement test ran: both containers' resource lines are in the log. |
| 10 | `python -B .the-way/elements/common/foundation_check.py` locally at 19695d6 | 0 | `0 errors`. Before commit 730f4e2 it reported 1 error, the new part-map pattern matching no tracked file; that was expected until the commit. |
| 11 | `git diff --cached --check` before each commit | 0 | clean |

**Not run or unchecked:**
- The Windows full gate.
- The three Linux-skipped Windows tests: no pass is attributed to them.
- The measurement on the deployed Mikrus image, the proxy settings and the public browser journey.
- The real Compose stack and the deployment command: the replacement test runs `docker run` with compose.yaml's path and mount, not `docker compose up --force-recreate`.
- The unchanged base was not rerun.

Run inputs live under `.runs/account-linux-inputs/` and are git-ignored: `measure47-red.tar`, `verify-measure47-mutation.sh`, `mutate-measure47.py`, `measure47-local.sh`.

## Failing first and mutation evidence

**Red run (row 2).** The overlay on base 9c2173d held:
- the new test files, the helper and the foundation files;
- an entrypoint shell that prints `{"ok":false,"errors":["not implemented"]}` and exits 1;
- a launcher shell whose `parseArguments` throws, whose `measure` returns `ok:false` and which never calls docker.

428 Node tests: 421 pass, 7 fail. Six fail on an `AssertionError`:
- "the entrypoint measures …": status `1 !== 0`;
- "… no peak memory": `'not implemented'` does not match `/memory\.peak/`;
- "… deadline passes first": does not match `/exceeded 1 ms/`;
- "the launcher passes …": `['not implemented']` vs `[]`;
- "… label names another commit": deepEqual against the label problem;
- "… breaks one bound …": `killed for lack of memory: no container was run`.

The seventh, "the launcher takes only a commit name …", stopped on the shell's own `Error: not implemented` thrown by `parseArguments`, not on an assertion. I count it as red only through the shell's behaviour, not as a clean assertion failure.

`npm test` stops after the Node failures, so the Python tests did not run in the red run. The replacement test checks behaviour the code already had, so its failure is shown by the mutations below.

**Not seen failing first:** the cgroup v1 test and the table case "a result without measurements" came in 19695d6, after the red run. Mental mutations:
- reading `memory.usage_in_bytes` as the peak: the test expects 222222222, not 111111111;
- swap taken as `memsw` itself: 536870912, not 0;
- `failcnt` ignored: 3;
- `oom_kill` ignored: 1;
- the early return in `judge` without its own problem line: the `{ok:true, errors:[]}` case would PASS, and the test asserts `ok === false`.

None of these was executed.

**Mutations of the replacement invariant test** (head 8e06a39). Node: 428/428 passed in both modes, so the Python tests ran.

| Mode | Mutation | Failing test and assertion | Other failures (expected) |
|---|---|---|---|
| A | compose.yaml `- accounts:/app/data` → `- accounts:/app/storage`: the database stays at `/app/data/accounts.sqlite` in the container's writable layer | `test_replaced_container_keeps_accounts_and_sessions`, `test_account_storage.py:145`: `(401, {'code': 'unauthenticated', …}) != (200, {'email': 'replacement-check@example.com', 'id': …})` — "the session of the replaced container no longer names its account". The first container had passed every resource check. | host-sharing `test_account_volume_is_owned_and_mounted_only_by_the_application` and isolation `test_compose_shares_nothing_with_another_deployment`, both "application must mount only accounts at /app/data" |
| B | Dockerfile `RUN mkdir -p /app/data && chown node:node /app/data` → `RUN mkdir -p /app/data` | the same test, via `verify_account_resources` at `account_container_support.py:114`: `1 != 0 : node cannot use fresh account resources: Error: EACCES: permission denied, open '/app/data/node-write-probe'` | image icons, container icons, one-serving-process container: the same EACCES |

Restoration: the mutations ran only in disposable clones; the task worktree was never mutated. Row 6, the same commit unmutated, exits 0 and the test passes, and row 9 at the final head passes too.

**Mutations not executed** (the cases table and the tests catch each; reasoned, not run):
- the OOMKilled check removed: case "killed for lack of memory";
- restart count ignored: "restarted";
- the peak compared with the whole limit instead of 80 % of it: "peak at 80% of 512 MiB", with 429496730 against a budget of 429496729.6;
- oom_kill ignored: "an OOM kill in the cgroup";
- the label check removed: the label test asserts that no `run` happens;
- `--memory-swap` dropped: the happy-path test reads the flag's value;
- `rm --force` outside `finally`: every case asserts it comes last;
- the entrypoint opening the account runtime: the database file would exist;
- the third gate operation admitted: the entrypoint's `thirdRefused` is false and the launcher case "a third operation admitted" fails.

## Local measurement (LOCAL ONLY: this does not satisfy player-argon2-deployment-check)

Source: `47-measure-local.log`, run 8. This is a local Docker-in-Docker daemon on WSL2, not Mikrus.

- Application commit 19695d670a69ea6d005a3795541b57ba4fe5a3f6; image sha256:11c5a9409e4acfaf54d6166a44515bbb7d7a9e395ad5dbe336088472c09c0ef9, built on the task's daemon. The launcher checked its revision label first.
- Daemon: Docker 29.9.2 linux/amd64, cgroup **v1**, cgroupfs, kernel 5.15.167.4-microsoft-standard-WSL2, 16651759616 bytes of host memory.
- In the image: Node v24.22.1 (base `node:24-slim`), argon2 0.45.1, linux-x64.
- Profile: Argon2id, m=65536 KiB, t=3, p=1, 32 bytes. Gate: 2 admitted together, the 3rd refused, 2 admitted after release. Right password accepted, wrong one rejected.

**Run at 512m (limit 536870912, swap limit = limit):**
- Warmup: 2 hashes and 2 verifications. Measured: 20 hashes and 20 verifications, two at a time (highest running at once: 2), 3367 ms in total.
- Hash: min 137.2 ms, median 157.3 ms, max 253.2 ms. Verification: min 137.6 ms, median 158 ms, max 281.2 ms.
- **cgroup peak: 152920064 bytes (145.8 MiB, 28.5 % of the limit; the budget is 429496729.6).**
- cgroup memory at the end: 18427904 bytes; highest process resident memory 193425408 bytes.
- OOMKilled false; restarts 0; exit 0; limit-hit count 0; oom_kill 0; no errors. **PASS.**

**Run at 64m (fail-closed control):** OOMKilled true, exit 137, no result printed. The launcher reported "the container was killed for lack of memory; the measurement exited with 137; the measurement printed no result". **FAIL**, launcher exit 1, as intended.

After both runs: 0 leftover measurement containers. The image was removed by the script's trap.

The first local attempt (row 7, at 8e06a39) failed closed on the v2-only reader, as described above.

## Procedure for the human: measuring the deployed image (third Human action of the task)

Replaced in the fix round. The procedure that stood here quoted a Docker format string that Windows PowerShell 5.1 breaks (review finding 1, reports/48-measure-review.md). The corrected text, which slice 13 copies into the loop2-deploy skill, is reports/49-target-measurement-procedure.md. The fix and its evidence are in reports/49-slice12-fix-report.md.

## Own-work check (section 3)

**Requirement most likely unmet:** "native-inclusive cgroup/container peak". `heapUsed` would miss native Argon2 memory; a cgroup reading includes it.
- Check: the real 64m run. Argon2's 64 MiB native buffer on top of Node did push the cgroup over its limit, and the kernel killed it. This shows the cgroup counts the native allocation.
- At 512m the cgroup peak was 145.8 MiB. That is more than Node's own baseline (cgroup memory at the end was 17.6 MiB) by roughly two 64 MiB Argon2 buffers, which fits two native operations at once.
- What it showed, and a limit: the v1 cgroup peak (152.9 MB) was below the process's highest resident memory (193.4 MB). Resident memory also counts shared file pages (the Node binary, libraries) that the kernel charged to another cgroup that touched them first. So the cgroup peak is the quantity the limit applies to, but on a fresh host where this container touches those pages first it can be higher. See concern 1.

**Second check:** "image and commit identity". The label test shows nothing is run on a mismatch. The real run printed the inspected id and ran exactly that id.

**Actual reading reached:**
- the real image on the local daemon (two measurements and three replacement-test runs);
- real HTTP inside the container with real SQLite on a named volume.

**Explicitly none:** the deployed Mikrus image, cgroup v2 in a real run (only the crafted test layout), the Compose stack, a screenshot (no user interface changed).

## Reaches beyond the dispatch

- `plan.md`, grep for the rows F14, F16, F20e, F20h, F24a, F24b and F25 (the lines of the foundation table only). The Read names these rows, but the selection did not carry their text.
- `.the-way/elements/invariants/skill/SKILL.md` and `template.md`, `.the-way/elements/environment-facts/skill/SKILL.md`, `.the-way/elements/part-map/skill/SKILL.md`: the record skills' pinned files. I followed them by hand.
- `.the-way/elements/common/foundation_check.py`, grep for its rules: whether a fact must have something resting on it.
- `src/server/transport.ts`, `src/server/account-routes.ts` and `src/server/main.ts`: what a valid account request needs inside the container.
- `tests/passwords.test.mjs:1-60`, `tests/startup.test.mjs:1-40`, `tests/quality/test_quality_invariants.py:1-60`, `eslint.config.mjs`: style and lint scope.
- `tests/invariants/loop2_invariant_support.py:554-636` and `tests/invariants/test_loop2_host_sharing.py:251-300,437-449`: the compose reader I reuse.
- `deploy/loop2-deploy` (grep) and `.claude/skills/loop2-deploy/**` (grep): the server's checkout path and how the server runs Node, for the human procedure.
- Kernel documentation at tag v6.12: `Documentation/admin-guide/cgroup-v2.rst` and `cgroup-v1/memory.rst`, fetched with curl to the scratchpad. Every quoted passage was matched word for word after whitespace normalisation.
- Not read: cycle.md, the whole plan, the whole task.

## Foundation, guideline and surface consequences

- **Environment fact `cgroup-memory-accounting` (new)**, sourced from Linux 6.12 cgroup v2 and v1 documentation. Meaning: „Kontroler pamięci Linuksa zapisuje najwyższe zużycie pamięci grupy (v2: memory.peak, razem z grupami potomnymi; v1: memory.max_usage_in_bytes), liczy procesy grupy zabite przez OOM killer (oom_kill) i w v1 liczy, ile razy zużycie dotknęło limitu (memory.failcnt).” It is an outside document, not a local observation. No local measurement result was written as a fact (F24a).
- **Invariant `player-argon2-deployment-check` (changed sentence, Rests on, Violated unchanged).**
  - Old: "The deployed loop2 container image has passed concurrent password hash and verify checks using the configured Argon2id cost settings within its memory budget."
  - New: "The deployed loop2 container image has passed, under its 512 MiB memory limit and after warmup, at least 20 hashes and 20 verifications with the configured Argon2id cost settings two at a time, a correct and a wrong password check and the refusal of a third concurrent operation, with no out-of-memory kill or restart and with the peak memory of its container's cgroup below 80% of that limit."
  - Meaning: „Wdrożony obraz kontenera loop2 przeszedł, przy limicie 512 MiB i po rozgrzewce, co najmniej 20 skrótów i 20 sprawdzeń haseł po dwa naraz z ustawionymi kosztami Argon2id, sprawdzenie poprawnego i błędnego hasła oraz odmowę trzeciej równoczesnej operacji, bez zabicia z braku pamięci i bez restartu, a szczytowa pamięć grupy cgroup kontenera była poniżej 80% tego limitu.”
  - **Rests on:** cgroup-memory-accounting. **Method:** review (unchanged); no test cites it.
  - **Violated: stays yes.** Meaning: „Nie spełnione dziś: pomiaru na obrazie wdrożonym na Mikrusie z commitu tego zadania jeszcze nie było; pomiar lokalny tego nie zastępuje.” Only the human's run on the deployed image can clear it, through an accepted foundation change.
- **Invariant `account-save-durable-storage`: unchanged, Violated stays yes.** Meaning: „Wymiana kontenera zachowuje bazę kont i zapisanych stanów gry — nie spełnione, bo zapisów gry jeszcze nie ma; nowy test pokazuje zachowanie tylko kont i sesji.” Its test is not written, because its sentence covers saved games (F20h).
- **Invariant `account-schema-lifecycle`: unchanged; one more test cites it** (`tests/deploy/test_account_storage.py`, the clause "preserves existing version-1 accounts and sessions" in the built image across replacement). Meaning: „Otwarcie bazy kont zakłada nowy schemat w transakcji, zachowuje istniejące konta i sesje wersji 1 i odmawia nieznanego nowszego schematu przed gotowością.” Violated no.
- **Part map.**
  - account-server's sentence adds "measures its own password work in the image it runs in". Meaning: „Część mierzy też własną pracę haseł w obrazie, w którym działa.”
  - build-tools' sentence adds "launches the password measurement of a built application image and judges it". Meaning: „Narzędzia budowania uruchamiają pomiar haseł na zbudowanym obrazie i oceniają jego wynik.”
  - build-tools gains `tests/password-measurement.test.mjs`. The other new paths are already claimed: `src/server/**` (account-server), `scripts/**` (build-tools), `tests/deploy/**` (deployment).
  - No dependency, trust boundary, external-context row or new part. The launcher takes only the human's arguments and the answers of the docker daemon it is pointed at.
- **Decisions:** none changed (decisions.md is not a Change path). D-17's verification still names account-save-durable-storage; the new replacement test serves D-17 and D-110 through account-schema-lifecycle, which D-110's verification already lists. D-104 needs no change.
- **Guidelines (outside my paths, for the orchestrator):** `guidelines/testing.md` should list `tests/password-measurement.test.mjs` among the integration test files. Its trust-boundary table is unaffected. The entrypoint and the launcher belong to the deferred entrypoint and build kinds, so no new kind, exemplar or coding.md row.
- **Surface consequence for slice 13:** the loop2-deploy skill (both copies) should carry the procedure in reports/49-target-measurement-procedure.md.

## Choices (rejected way, cost if wrong)

1. **The launcher judges memory; the entrypoint judges only the functional checks.** Rejected: the entrypoint judging 80 % of its own cgroup limit, which would let a run with a bigger `--memory` pass on a bigger budget. Cost: two places hold checks; the launcher repeats the functional ones.
2. **The budget is fixed at 80 % of 512 MiB; `--memory` may be smaller but not larger.** Rejected: free `--memory`, which could hide a candidate that does not fit 512 MiB. Cost: changing the deployment's limit needs a code change here as well as in compose.yaml.
3. **Remote daemon over `DOCKER_HOST=ssh://…`** for the target. Rejected: a launcher that needs Node on the Mikrus host (not checked) or a Node container with the Docker socket. Cost: the human needs SSH and the Docker CLI on the computer, and an SSH login allowed to use Docker.
4. **The replacement test reads the database path and mount point from compose.yaml.** Rejected: fixed values, which would not notice compose.yaml moving the database out of the volume; mutation A shows the difference. Cost: the test now fails on Compose layouts the shared reader does not handle, as host-sharing already does.
5. **The replacement test cites `account-schema-lifecycle`; no new invariant.** Rejected:
   - a new account/session durability invariant: it would need D-17's or D-110's verification changed, outside my paths;
   - citing `account-save-durable-storage`: its Violated `yes` requires an expected-failure test, and the sentence covers saves.

   Cost: the durability of accounts and sessions across replacement has no invariant of its own; the reviewer or orchestrator may prefer one.
6. **The invariant sentence of `player-argon2-deployment-check` now states its numbers** (bound, statistic and population, as the invariant template's measured-quantity rule WAY-60 asks). Rejected: keeping "within its memory budget", which states no bound. Cost: the sentence is task-assigned (F20e); if the owner wants the original wording, revert the sentence and keep the Rests on.
7. **cgroup v1 support**, added after the local daemon proved to be v1. Rejected: v2 only, which leaves no local numbers and nothing to judge on a v1 host. Cost: the v1 limit-hit count is stricter than v2's oom count, since a hit that reclaim satisfied also fails the run.
8. **Red evidence by overlay on the base**, with the existing `verify-session34-overlay.sh`, instead of a red commit. Cost: none to history; the red tar stays in the ignored inputs.

**Adaptations (section 4):**
- Dockerfile needed no change (small).
- The helper was split into steps rather than given a new function next to the old one (small).

**Changed invariant tests:**
- New: `tests/deploy/test_account_storage.py::AccountsSurviveContainerReplacement::test_replaced_container_keeps_accounts_and_sessions` (account-schema-lifecycle).
- Changed helper used by invariant tests: `tests/invariants/account_container_support.py`, used by loop2-one-serving-process (`test_loop2_one_serving_process_container.py`) and loop2-container-icons. Their behaviour is unchanged; one assertion was added (the data mount names the named volume). Both passed in rows 6 and 9 and failed in mode B on EACCES.

## Problems observed

- **I deleted a leftover test image.** Before the second mutation run, the task's daemon held `loop2-invariant-check:7253d31f1fb2`, created 2026-10-27T00:42:39Z with revision label `invariant-check`. That is the disposable tag the one-serving-process test uses; it was left by an earlier run of this task, not by my runs. I removed it (`docker image rm`) on the task's own daemon. I report it because I did not create it.
- My first two mutation runs were wrong (row 3) and were stopped. They created nothing on the task's daemon that remained: it was later empty of containers, volumes and images.
- The final state of the task's daemon: no containers, volumes or images. Every verifier container I started (`loop2-task15-measure47-*`) was removed by name. `loop2-task15-dind` was left running.
- Local `__pycache__` folders that my own import check created in `tests/deploy/` and `tests/invariants/` were removed. The worktree is clean.

## Concerns (for the orchestrator)

1. **The cgroup peak can be lower than the process's resident memory** (local v1: 152.9 MB against 193.4 MB), because shared file pages can be charged to another cgroup. The verdict follows the invariant sentence (the cgroup peak). Both numbers are in the report, so the human and the reviewer see both. Making the launcher require the larger of the two below the budget would be a one-line tightening plus a sentence change.
2. **On Mikrus, `memory.peak` may be missing** (an LXC host whose kernel or cgroup does not show it). The launcher then fails closed. Whether the target shows it is unknown until the human runs it.
3. **There is no invariant for account and session preservation alone** (choice 5).
4. **The cgroup v1 test and the "a result without measurements" case were not seen failing in the harness** (they came after the red run); mental mutations are listed above.
5. `guidelines/testing.md` should list the new test file (outside my paths).
