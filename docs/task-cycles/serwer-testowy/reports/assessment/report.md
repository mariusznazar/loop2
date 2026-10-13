# Independent assessment (WAY-10) — serwer-testowy

Assessor: fresh agent, Claude Code, model sonnet (the authors of the entries and checks ran on
opus). The assessor's Write call was refused by the harness ("subagents must return findings as
text"); it returned the report in its reply, and the orchestrator saved it here verbatim, without
edits.

## Summary (under 150 words)

Something can be cut:
- **C1:** the workflow reader under `account-server-typecheck/1`, about 565 lines. It blocks harmless workflow edits such as `workflow_dispatch` or `if:`, and its own docstring admits it passes constructs it cannot read.
- **C2:** the duplicate `RUN npm run typecheck` at `Dockerfile:8`. `npm run build` already fails on type errors.
- **C3:** the script half of `loop2-container-isolation/1`. Its sentence does not state it, and two bypasses passed in my scratch breaks.
- **C4:** `loop2-distinct-address/1`, which checks only the probe variable.

Other findings:
- The trigger-input invariant names `main` but does not derive from D-11.
- D-16 and D-17 overlook that a commit's own Compose file runs as root.
- State kept outside the repository is stated but not recorded as facts.
- Reader self-tests cite invariants, against WAY-61.

Format guards: 0 errors. D-13 values: none found in the files I read.

## Full report

Assessed commit 5e85eb0f68fc20e66839edf3f2f613e172f31c79, base 1701186. I advise; I approve nothing.

**Read:**
- `assessed.diff`.
- In the assessed tree: `foundations/*`, `tests/invariants/*`, `deploy/loop2-deploy`, `Dockerfile`, `compose.yaml`, `.dockerignore`, `.gitattributes`, `.github/workflows/deploy.yml`, `package.json`, `scripts/build.mjs` and `README.md`.
- Under `.the-way/`: WAY-10, 22, 56, 60, 61, 62, 65, 69, 73, 81, 82, 84, 90, 95, 139 and 140, plus the invariants and glossary templates.

**Not read, because the dispatch does not list them:** `tests/deploy/*` (file names only) and `tests/agent_workflow/*`. I also did not open `.runs/` other than the dispatch files, `docs/`, the skills, vault notes or history messages.

**Not run:** `loop2-deploy-trigger-input` and `loop2-deploy-keeps-running`, which need the `tests/deploy` seam. I also did not run the Docker part of `loop2-one-serving-process/2`.

**Run, with nothing written to the repository (`git status` stayed clean):**
- All five foundation format guards.
- The static invariant tests in a scratch copy outside the repo, against the unchanged copy and against 26 deliberate breaks.

### 1. What can be cut

| # | Candidate | Size |
|---|---|---|
| C1 | Workflow reader under `account-server-typecheck/1`: `workflow_shipping`, `run_shipping`, `ssh_shape`, `strict_workflow`, `workflow_keys`, `SAFE_WORKFLOW`, `SHIPPING_STEPS` and two tests | `test_account_server_typecheck.py` 99-155, 284-638, 726-740 (~430 lines); `loop2_invariant_support.py` 837-970 (~135 lines) |
| C2 | `Dockerfile:8` and the rule demanding that literal (`typecheck_runs`, `UNSAFE_OPERATORS`, `takes_built_output`, the Dockerfile test) | `test_account_server_typecheck.py` 211-250, 645-672 |
| C3 | Script half of `loop2-container-isolation/1` (`test_loop2_container_isolation.py:193-291`) and its shell parser (`loop2_invariant_support.py:575-836, 971-1102`) | ~100 test lines, ~390 support lines |
| C4 | `loop2-distinct-address/1`: entry at `invariants.md:115-123`, the 84-line test, and D-08's level-1 reference | |
| C5 | The two failure modes added to `account-server` (`part_map.md:26-27`). They are unrelated to deployment and do not clear the guard warnings at `part_map.md:46` and `:91` | |
| C6 | `# invariant:` citations on reader self-tests (O6) | |

Nothing else can be cut. D-08 to D-17, the three glossary terms, the three environment facts, `loop2-deploy-trigger-input/1`, `loop2-deploy-keeps-running/1` and the static part of `loop2-one-serving-process/2` do what they state, except where listed below.

### 2. Observations

**O1. `account-server-typecheck/1` now also locks the workflow's shape.**
- *Checked:* the sentence (`invariants.md:17`) against the new tests and eight edits of the workflow.
- *Evidence:*
  - `test_account_server_typecheck.py:726-731` fails when the workflow holds any key outside `WORKFLOW_KEYS`, `JOB_KEYS` or `STEP_KEYS` (lines 150-155).
  - In my scratch copy these edits each made `test_workflow_ships_no_files` fail: `uses: actions/checkout`, a job `if:`, a step `if:` and `workflow_dispatch:`. None of them ships anything.
  - `scp -r dist` and `ssh < dist.tgz` also failed, as intended.
  - The test docstring admits that assembled-at-run-time constructs still pass.
  - The harm is already blocked server-side, because the script builds from its own checkout after `git checkout --force` and `git clean -ffdx` (`deploy/loop2-deploy:188-196`). D-09 also covers it at level 2.
- *Change:* take C1, keeping the Dockerfile, Compose and script reads (lines 639-724). If the workflow stays guarded, give it its own entry derived from D-09, not a clause of the types entry.

**O2. The `typecheck` line duplicates the build.**
- *Checked:* `package.json`, `scripts/build.mjs:8-15`, `Dockerfile:8-9`, and test lines 183-208.
- *Evidence:* `npm run build` runs `tsc -p` for both configurations and exits non-zero on error. The existing tests prove a server type error fails it and leaves no `dist/server/main.js`. The extra pass costs memory and time on the host D-17 calls short of memory.
- *Change:* accept `npm run build` as the checking RUN and delete `Dockerfile:8`. Or keep it deliberately and say so in D-17.

**O3. The sentence of `loop2-container-isolation/1` is narrower than its check.**
- *Checked:* `invariants.md:107`, D-08, D-17, `part_map.md:101` and the 12 tests.
- *Evidence:*
  - `ComposeIsolation` (lines 92-141) tests the sentence.
  - `DeployScriptActsOnLoop2Alone` (193-291) tests D-17's "changes nothing of another workload", which the sentence does not state.
  - `part_map.md:101` says a deployment harming another workload is "detected by loop2-container-isolation", and that holds only through the unstated half.
  - Under WAY-56 the fingerprint covers the sentence alone.
  - Scratch breaks caught: `docker rm -f loop`, `docker system prune -af`, `docker -H ... stop loop`, and `network_mode: host`.
  - Scratch breaks missed:
    - `docker --context x rm -f other`, because a global option hides the subcommand (`test_loop2_container_isolation.py:264-290`).
    - `bash -c '...'`, which is documented.
    - Compose `privileged: true` and `cap_add: [SYS_ADMIN]`, because the blocklist at line 58 omits them.
- *Change:* widen the sentence and raise the entry to /2, or split the second half into an entry derived from D-17 (my preference), or cut it (C3). If it stays, extend the lists.

**O4. D-16's reassurance and D-17's isolation claim overlook the commit's own Compose file.**
- *Checked:* D-16 and D-17 rationale, `deploy/loop2-deploy:293-312`, the workflow, and `AGENTS.md` ("nothing runs these checks automatically").
- *Evidence:*
  - "No pushed commit changes what the key runs" is true of the script.
  - The script then runs `docker compose -f $CHECKOUT_DIR/compose.yaml build` and `up` on the commit it just checked out (lines 298, 312). That is root on the shared host, so a mount, `privileged` or `network_mode: host` in any commit of `main` would be obeyed.
  - The workflow runs no tests (`deploy.yml:75-100`).
  - `part_map.md:119` marks the repository as trusted, and the trust boundary is `deploy/**` only (`part_map.md:102`).
- *Change:* state in D-16 and D-17 that a commit's `Dockerfile` and `compose.yaml` are trusted code, and widen the trust boundary to include them. A deploy-time `docker compose config` check would be a separate task.

**O5. `loop2-distinct-address/1` does not test the address players use.**
- *Checked:* the sentence (`invariants.md:117`), `test_loop2_distinct_address.py`, D-08, D-10 and the workflow.
- *Evidence:* it reads `LOOP2_PUBLIC_URL` (`deploy.yml:18`), the probe's target. The real address is a Cloudflare record and Origin Rule, and the test's docstring says so. It `Part: every`, so it runs on every change.
- *Change:* cut it (C4), or reword the sentence to what is checked: the workflow probes loop2 at an address that differs from `kantarion.bieda.it`.

**O6. Made-up-input tests cite invariants about real data (WAY-61).**
- *Evidence:* `test_account_server_typecheck.py:641-643, 722-724, 733` and `test_loop2_container_isolation.py:176-190` feed invented scripts or workflows to the readers. They cite sentences about the real Dockerfile, Compose file and script. They can only add failures, never a false pass, but they mix subjects.
- *Change:* move them to `tests/deploy/` or drop the citation. Most vanish with C1 and C3.

**O7. `loop2-deploy-trigger-input/1` names `main` but does not derive from D-11.**
- *Evidence:*
  - It derives only from D-09@20be369f.
  - D-11 (`decisions.md:289`) chose `main` and has a Review-when.
  - If D-11 moves to another branch, the invariant is not flagged.
  - D-11 also binds the trigger branch and concurrency setting (`deploy.yml:54-62`). A commit can falsify those, and WAY-22 asks for an invariant, but D-11 has none.
- *Change:* add D-11 to `Derives from`. Decide whether D-11 gets a small invariant on `on.push.branches`, in place of C1.

**O8. State kept outside the repository is stated but not recorded as a fact (WAY-84, WAY-90).**
- *Evidence:*
  - The three new facts are documentation facts only.
  - Nothing records: the key's forced-command entry and the installed script's state (D-09, D-16); the Cloudflare record, Origin Rule and encryption mode (D-10); Docker, memory and no swap on the host (D-14, D-17).
  - The typecheck docstring itself says the key restriction is "checked by no test here".
  - `Method: TODO` on all three new facts means the clock never watches them.
  - D-10 quotes the Cloudflare ports passage raw while naming the other two citations as facts.
- *Change:* add facts for those three states, with a method `TODO` or a note the owner re-reads. Or say in the rationale of D-10 and D-16 that the outside state is not recorded.

**O9. `loop2-one-serving-process/2` becomes `unchecked` without a Docker daemon.**
- *Evidence:* the Docker test calls `skipTest` at `test_loop2_one_serving_process_container.py:206`. A previously passing entry now has no `pass` on such machines. The build timeout is 1200 s (line 59).
- *Docstring claim not asserted:* it says the container runs with `init: true`, but nothing asserts that in `compose.yaml`. The test passes `--init` itself (line 113), and the listener count does not depend on it.
- *Change:* none required if accepted. Alternatively, keep the old entry's check as it was and put the container test under an entry of its own.

**O10. Failure modes in `part_map.md:92-101`.**
- *Missing:* build cache is never pruned (D-17) and the script refuses below 4 GiB of free disk (`deploy/loop2-deploy:36, 259-261`). Eventually every deployment exits 5. No failure mode names this.
- *Cannot happen as written:* "lock file gone after restart and cannot be created again" (`part_map.md:97`). The script recreates the lock on every run (line 117).
- *Change:* add the disk-fill mode and reword or drop the lock one.

**O11. Words.**
- `deployment` is both the glossary's act and the name of a part and a `Part:` value.
- Bare `server` means both the account and save server and the host.
- `test server`, `public address` and `instance` are consistent with their uses.

**O12. Smaller points.**
- `test_account_server_runtime.py:17-19` still says "the skeleton has none" about deployment files; the repository now holds several.
- D-09 and D-14 say "Rejected: none considered". D-09 has obvious rivals.
- The old-game probe (`deploy.yml:80`) fails the run after a good deployment if the old game is down.
- Port 18080 stands in `compose.yaml:12`, `deploy/loop2-deploy:39` and the Cloudflare rule. I found no check in the files I was allowed to read that ties them.
- Eight `Approved by` placeholders are expected before merge.
- About 2,900 lines of Python checks were added for a 383-line script, a 27-line Dockerfile, a 15-line Compose file and an 81-line workflow. `tests/deploy` has four more files on the same script (input, commit, build, switch). The author should state which assertions the invariant tests add that those do not; I could not compare them.

### 3. Entries that state what the code does not do

| Entry | Statement | What the repository shows |
|---|---|---|
| D-09 (`decisions.md:218`) | "the key can only start a rebuild of a commit of that branch" | The script enforces it on the forced path (`loop2-deploy:159-168`). The key's restriction is unrecorded state (O8). |
| D-16 (`decisions.md:407`) | "no pushed commit changes what the key runs" | True of the script; the commit's Compose file runs as root (O4). |
| D-17 (`decisions.md:433`) | "changes nothing on the host but ..." | Not enforced for the commit's Compose file (O4). The memory limit is level 2 only, by design. |
| `part_map.md:101` | "detected by loop2-container-isolation" | Holds only through the unstated half (O3). |
| Container test docstring | "init: true" | Not asserted (O9). |

### 4. Fidelity of each invariant check to its sentence

| Invariant | Verdict |
|---|---|
| `loop2-container-isolation/1` | Partial. The first half is faithful; the second is beyond the sentence (O3). |
| `loop2-distinct-address/1` | Tests the probe variable, not the address (O5). |
| `loop2-deploy-trigger-input/1` | Faithful on the forced path. Evidence: 31 literal crafted inputs, a both-inputs case, a no-command case and a positive control (`test_loop2_deploy_trigger_input.py:76-118`). A bash probe confirmed the script's pattern refuses a trailing newline. The derivation link to D-11 is missing (O7). Not run. |
| `loop2-deploy-keeps-running/1` | Faithful within its stated limit, an allow-list of read-only docker calls recorded by a stub. Every stage in the sentence is stopped in turn and a positive control sees `up`. A container ended by a signal or the kernel is documented as not covered. Not run. |
| `loop2-one-serving-process/2` | Faithful, the strongest of the set; the cost is `unchecked` without Docker (O9). |
| `account-server-typecheck/1` | The Dockerfile, Compose and script reads are faithful. The workflow read goes beyond the sentence (O1). The explicit `typecheck` line is stricter than needed (O2). |

### 5. Checks that find no concern

- **Format guards:** 0 errors on all five foundation files, run without `--base` or `--merge-onto`.
  - The decisions guard gave 8 warnings, all the `Approved by` placeholders.
  - The part-map guard gave 2 criticality warnings and 1 unchecked item.
  - The checks against the main branch did not run, and that is not a pass.
- **D-13 values:** I searched `foundations`, `src`, `deploy`, the Docker files, the workflow, `scripts`, `README.md`, `package.json` and `tests/invariants` for the server name, an IPv6 address and the mikrus host names. No hits. The workflow holds the host, port and user only as references to named secrets.
- **D-15 against the script:** a stop at input, lock, start line, fetch, accept, checkout, resource gate or build leaves the container alone. The first command that touches it is `compose up` (`deploy/loop2-deploy:312`). The forced path accepts only `main` and the human path any fetched branch (lines 159-181). "No earlier image kept" matches the prune at line 354.
- **D-16 against the script:** the installed-copy comparison is a warning only (lines 201-215).
- **D-11 against the workflow:** it matches `deploy.yml:54-62`.
- **D-12 and D-14:** no contradiction with the code read.
- **D-05/3:** matches `Dockerfile:27`, which has one `CMD` and no `ENTRYPOINT`, and Compose has one service.
- **Environment facts:** each quotes its passage with address and date. The OpenSSH fact names the release it holds for.
- **Glossary terms `test server` and `public address`:** every use I found matches.
- **WAY-69 expected values:** written out as literals in the checks I read.
- **`.gitattributes`:** `deploy/loop2-deploy` is stored as LF with `text eol=lf`.

### 6. Scratch breaks (static tests, copy outside the repository)

On the unchanged copy, 21 of 22 tests passed. The 22nd needs a git work tree, which the copy is not.

- **Caught as intended:** a volume on the old game's path; `container_name: loop`; `docker rm -f loop`; `docker system prune -af`; `docker -H ... stop loop`; `network_mode: host`; no type check in the Dockerfile; `typecheck || true`; workflow `uses:`, `scp`, `ssh < file`, `if:` and `workflow_dispatch`; `up` without `--no-build`; the probe variable pointing at the old game, including capitals with a trailing dot; the probe variable renamed.
- **Passed undetected:** `docker --context x rm -f other`; `bash -c 'docker rm -f loop'` (documented); Compose `privileged: true`; Compose `cap_add: [SYS_ADMIN]`; Compose host port `80:3000`; no `mem_limit` (level 2 by D-17's design); a second `LOOP2`-named variable with a non-http value (documented).

### 7. Requested changes, in order

1. Decide C1: cut the workflow reader, or give it its own entry derived from D-09.
2. Fix the sentence/check gap of `loop2-container-isolation/1` (O3).
3. Add D-11 to `Derives from` of `loop2-deploy-trigger-input/1` (O7).
4. State in D-16 and D-17 that the commit's `Dockerfile` and `compose.yaml` are trusted code, and widen the trust boundary (O4).
5. Decide whether the outside state is recorded as facts or declared unrecorded (O8).
6. Decide C2 and C4.
7. Move the reader self-tests off invariant citations (O6), update the stale docstring (O12), and fix the failure modes (O10).
