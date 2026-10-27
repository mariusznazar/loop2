PASS 66a156fd5e52a189236aadd83b1f8d43d6a48abc

# Review of the correction after the human's remarks on request #32 (kernel 5.15 measurement)

- Range: b018ee54f51bf307c272771d78c488fbb995812d..66a156fd5e52a189236aadd83b1f8d43d6a48abc. It is one commit, 66a156f by the owner's private address, touching nine paths (+230/-164). `git rev-parse HEAD` is 66a156f. The tree is clean. The pin and the gitlink both show 574a37b9ab9572f876298f4cc10754581222d3f0.
- Method: `.claude/skills/the-way-review-change/SKILL.md` -> `.the-way/task-cycle/review/SKILL.md`. Section 4 applies to a correction: the human's remarks take the place of a findings file, and the correction's diff is reviewed as section 2 gives. The user's playbook `C:/Storage/The Brain/The Brain/Notes/Areas/(A) Claude code/playbook_code_review.md` gives the format.
- Inputs read whole:
  - `reports/65-correction-review-handoff.md`
  - `reports/63-human-remarks.md` (binding)
  - `reports/64-correction-handoff.md`
  - `reports/64-correction-report.md`
  - `reports/49-target-measurement-procedure.md`
  - the full diff of the range, and the head's `src/server/measure-passwords.ts` and `scripts/measure-passwords.mjs`
- Counts: 0 blocking, 1 Minor, 0 out of scope. My earlier Minor findings 2–7 and out-of-scope finding 8 (`reports/48-measure-review.md`) were not in this round. Finding 7 still describes the head, because build-tools' *Trust boundary* (`foundations/part_map.md:103-105`) still does not list `scripts/measure-passwords.mjs`. The rest of them I did not re-judge.

## The remarks: made

The human chose A: measure under a limit equal to the budget, and require no limit hit, no OOM kill and the functional checks, on kernel 5.15, without `memory.peak`. The correction makes this.

- **Limit equal to the budget, no swap.** `scripts/measure-passwords.mjs:50-52` gives the measurement container's limit as `measurementLimit(512 MiB)`, which is floor(0.8 × 512) MiB = 409 MiB = 428867584 bytes, at most 80 %. `--memory` and `--memory-swap` both take that value (`:208-223`). The verdict requires HostConfig Memory and MemorySwap and the cgroup's own limit to equal it, and a swap limit that is null or 0 (`:130-133,176-179`).
- **Judged by counts the kernel has, peak not required.**
  - On v2, the entrypoint reads `max` and `oom_kill` from `memory.events` (`src/server/measure-passwords.ts:142-143`).
  - On v1, it reads `memory.failcnt` and the `oom_kill` line of `memory.oom_control` (`:160-165`).
  - The peak is optional and only reported (`:126-133,145,167`).
  - The launcher fails on any limit hit or OOM kill, on OOMKilled, on a restart, on a nonzero exit or on any functional failure (`scripts/measure-passwords.mjs:134-187`). It does not judge the peak.
- **Reasoning, checked against the kernel source (Check 3).** In `try_charge_memcg` of Linux v5.15, `memcg_memory_event(mem_over_limit, MEMCG_MAX)` runs on every charge that does not fit under the limit and may block, before reclaim. So `max 0` means that no ordinary charge ever met the 409 MiB limit, and usage stayed at or below 409 MiB, which is below 409.6 MiB. The declined list names the kernel's few unrecorded paths.
- **Fail closed on missing data.**
  - A missing or unparsable `max` or `oom_kill` line makes the entrypoint fail with its own reason (`cgroupCount`, `:92-102`). The test "does not count hits of its limit" protects the `max` case.
  - In the launcher, an undefined count fails (`!== 0`), and so does a missing limit or a missing result.
  - A cgroup that shows another limit fails, which also catches a container that reads its parent's cgroup.
  - The v1 path has a gap; see finding 1.
- **Node 20.** The launcher imports only `node:child_process`, `node:crypto` and `node:url`, and uses nothing newer than Node 20. The local run under the official `node:20` image (v20.20.2) passed (`64-correction-local.log:142-221`). The server's v20.19.0 had already run the previous launcher to a full JSON report (remarks item 3).
- **Tests protect the new verdict.** The new cases are:
  - kernel 5.15 cgroup files without `memory.peak`, where `max 2` is read as limitHitEvents 2;
  - `memory.events` without `max`, which must fail;
  - one limit hit, no count of limit hits, the deployment's limit used instead of 80 %, another limit seen in the cgroup;
  - a passing run with a null peak;
  - `measurementLimit` arithmetic;
  - `--memory 7m` refused.

  A real red run on the base failed 8 tests on assertions (`64-correction-report.md`). A mutation run at the head failed 3 tests on assertions (`64-correction-mutation.log:500-552`): reading `oom` instead of `max`, and dropping the limit-hit check. The unmutated head passes: 432/432 Node tests, 287 Python tests, `0 errors` (`64-correction-final.log:2,494-532`).
- **Foundation.**
  - `player-argon2-deployment-check` (`foundations/invariants.md:644`) now names the container limit of at most 80 % of 512 MiB without swap, no restart, and no limit hit or OOM kill counted by the cgroup. That is what `judge` checks. The meaning the human kept, memory below 80 %, follows from it, and the Polish meaning in report 64 says so.
  - Violated stays `yes` and Method stays `review`. No test claims the invariant, so local evidence clears nothing.
  - `cgroup-memory-accounting` (`foundations/environment_facts.md:300-302`) now cites the v5.15 documentation. Every quoted passage is in the fetched files (Check 2): cgroup-v2.rst:1227 "hierarchical", :1247-1248 `max`, :1260-1261 `oom_kill`; cgroup-v1/memory.rst:614-615 failcnt, :854-856 `oom_kill`. Its v1 clause shares finding 1.
- **The human procedure** (`reports/49-target-measurement-procedure.md` = the skill section `references/setup_and_secrets.md` "Measuring the password work", both skill copies byte-identical, Check 4):
  - It runs in bash as root in `/srv/loop2`, which is `CHECKOUT_DIR` in `deploy/loop2-deploy:30`. The deployment leaves that checkout detached at the requested commit (`:188`), so the `.git/HEAD` fallback is right.
  - The label template with nested double quotes is correct in bash.
  - An unset `sha` reaches the launcher as an empty `--commit`, which it refuses with exit 2. A label that differs is refused before any run.
  - `$?` after `node … > file` is node's exit code.
  - D-12 holds: a human action, and agents do not run it.
  - D-17 holds: one loop2-named container under its own 409 MiB limit, after the deployment's MemAvailable threshold, removed in `finally`. It builds and pulls nothing and touches no other workload. `loop2`, its volume and its secrets are not mounted or touched.
  - The JSON it asks to be copied into the request holds versions, counts, times and the kernel string, and no password, hash, cookie or secret.
  - No remaining text points to `memory.peak` as a requirement or to the removed PowerShell route (Check 5).

## Blocking

None.

## Minor

### 1. Minor — on cgroup v1 with swap accounting, the kernel counts limit hits in `memory.memsw.failcnt`, which the entrypoint does not read

**Anchor:** `src/server/measure-passwords.ts:160` (and the fact's v1 clause, `foundations/environment_facts.md:300`; the v1 test fixture, `tests/password-measurement.test.mjs:121-127`)

**To paste:** When the measurement container has `--memory-swap` equal to `--memory`, a cgroup v1 kernel tries the memory+swap counter first. A charge that would exceed the limit therefore increments `memory.memsw.failcnt`, and `memory.failcnt` stays 0. On v1, a run whose memory reached the limit and was reclaimed would PASS. Should v1 add `memory.memsw.failcnt` when that file is present?

**Why I report it:**
- What the code is for: the human's rule A fails a run on any hit of the limit, including one that reclaim recovered. On v1 the entrypoint takes `limitHitEvents` from `memory.failcnt` alone.
- How it breaks (Linux v5.15 `mm/memcontrol.c`, `try_charge_memcg`, Check 3):
  ```
  if (!do_memsw_account() ||
      page_counter_try_charge(&memcg->memsw, batch, &counter)) {
          if (page_counter_try_charge(&memcg->memory, batch, &counter)) ...
  } else {
          mem_over_limit = mem_cgroup_from_counter(counter, memsw);
  ```
  `page_counter_try_charge` increments the failing counter's `failcnt` (`mm/page_counter.c:129`). The launcher sets both limits to 428867584. Memory+swap usage is never below memory usage, so the memsw counter refuses first, and the memory counter is never tried for that charge. The v1 documentation lists both files ("memory.failcnt and memory.memsw.failcnt", `cgroup-v1/memory.rst:613`).
- Example with the values of this change: a v1 run reaches 409 MiB, and reclaim frees page cache. Then `memory.memsw.failcnt` = 1, `memory.failcnt` = 0, `oom_kill` = 0, and the launcher prints PASS.
- Evidence that it applies locally: the local daemon has swap accounting. `cgroupSwapLimitBytes` is 0, which the code computes only when `memory.memsw.limit_in_bytes` exists (`64-correction-local.log:74,211`; `src/server/measure-passwords.ts:152-155`). So the local "limit hits 0" in report 64 says nothing about limit hits. The v1 test fixture includes `memory.memsw.limit_in_bytes` but no `memory.memsw.failcnt`, so it fixes the incomplete reading in place.
- Why only Minor: the test server is cgroup v2 (remarks item 4), where `memory.events` `max` counts the event whatever counter refused. v1 serves only the local harness, whose evidence clears nothing. The invariant concerns the deployed image, so the defect does not reach the server's verdict. It would matter if the launcher were run on a v1 host.
- Fix: in `readVersion1`, when `memory.memsw.failcnt` is present, set `limitHitEvents` to the sum of both counts. Add `memory.memsw.failcnt` to the v1 fixture with a nonzero value. In the fact, name both v1 counters, from the same § 5.4 sentence.

## Out of scope

None.

## Declined to judge

- **Kernel charges that pass the limit without a `max` event.** In v5.15, forced charges (`__GFP_ATOMIC`, `PF_MEMALLOC`, dying or OOM-killed tasks) may go over the limit for a moment and skip `memcg_memory_event(…, MEMCG_MAX)`. A container without network does almost none of these. Treating them as a gap in the human's rule A would be a kernel detail outside the task.
- **The measurement does not take the deployment lock.** A deployment started during the measurement reads MemAvailable with the measurement's memory already counted. Nothing in the task requires mutual exclusion.
- **The source-code comment** "which cgroup v2 has on every kernel" (`src/server/measure-passwords.ts:113-114`) is loose: `oom_kill` appeared in 4.13. It does not affect behaviour.
- **The server run and the persistence check across redeployment** are the human's; no server command is allowed.

## Checks

| # | Check | Command | Exit / result |
|---|---|---|---|
| 1 | Head, tree, pin, range | `git rev-parse HEAD`; `git status --short`; `git -C .the-way rev-parse HEAD`; `git ls-files --stage -- .the-way`; `git log --format='%h %ae %s' b018ee5..66a156f`; `git diff --stat b018ee5..66a156f`; `git diff b018ee5..66a156f -- foundations tests/password-measurement.test.mjs .claude/skills/loop2-deploy/SKILL.md .claude/skills/loop2-deploy/references/setup_and_secrets.md` | 0; 66a156f, clean, 574a37b twice, 1 commit, 9 paths +230/-164 |
| 2 | The fact's source at v5.15 | `curl -sSfL -o v515-v2.rst https://raw.githubusercontent.com/torvalds/linux/v5.15/Documentation/admin-guide/cgroup-v2.rst`; same for `cgroup-v1/memory.rst` (into the scratchpad); `grep`/`sed` for each quoted passage | 0, 0; each quoted passage found at the lines named above |
| 3 | Kernel charge path at v5.15 | `curl -sSfL -o v515-memcontrol.c https://raw.githubusercontent.com/torvalds/linux/v5.15/mm/memcontrol.c`; `curl … mm/page_counter.c`; `sed -n` from `try_charge_memcg` (line 2524), `grep -n failcnt v515-page_counter.c` | 0, 0; memsw is tried before memory, MEMCG_MAX is raised before reclaim, failcnt++ at page_counter.c:129 |
| 4 | Skill twins | `cmp .claude/skills/loop2-deploy/SKILL.md .agents/skills/loop2-deploy/SKILL.md && cmp …/references/setup_and_secrets.md …` | 0; identical |
| 5 | Leftover references | `git grep -n "memory\.peak\|429496729\|oomEvents\|PowerShell" -- .claude/skills/loop2-deploy .agents/skills/loop2-deploy scripts src tests foundations guidelines`; `grep -n "peak\|80%\|memory budget" foundations/decisions.md` | 0; only the optional-peak code and test, and the bash-only label note; D-103's "within the container memory budget" still holds |
| 6 | Procedure file against the skill section | `diff` of whitespace-normalised `reports/49-target-measurement-procedure.md` and the skill section | the same text; the only difference is the heading levels |
| 7 | Foundation check at head | `python -B .the-way/elements/common/foundation_check.py` | 0; `0 errors` |
| 8 | Executor's logs (read, their evidence) | `grep` of `64-correction-final.log`, `64-correction-mutation.log`, `64-correction-local.log` | final: HEAD 66a156f, 432/432, 287 tests every directory passed, 0 errors; mutation: 3 assertion failures; local: v1, swap limit 0, PASS at 512m under Node 24 and Node 20, 64m OOM-killed FAIL |
| 9 | Source inspection (not executed evidence) | whole `src/server/measure-passwords.ts` and `scripts/measure-passwords.mjs` at head; the test diff; `deploy/loop2-deploy:30-33,188` | — |

Not run:
- Full `npm test`: the evidence is not disputed, and the executor's run at this head exits 0.
- A local measurement: finding 1 rests on the kernel source, and a test of it would need a crafted reclaim-recovered hit on v1.
- Anything on the server.
- A real cgroup v2 run: neither I nor the executor had one. Remarks item 4 shows the server's `memory.events` with `max` and `oom_kill`.

## Reaches beyond the dispatch

- Linux v5.15 `mm/memcontrol.c` (`try_charge_memcg`) and `mm/page_counter.c`: to confirm what `max` and `failcnt` count, for the verdict and for finding 1.
- `reports/64-correction-local.log`: the v1 swap value that shows swap accounting on the local daemon.
- `deploy/loop2-deploy:30-33,188`: the checkout path and the detached checkout the procedure relies on.
- `foundations/part_map.md:103-105`: whether my earlier finding 7 still describes the head.
- `foundations/decisions.md` (grep for peak/80 %/budget): whether a decision still names the peak.
