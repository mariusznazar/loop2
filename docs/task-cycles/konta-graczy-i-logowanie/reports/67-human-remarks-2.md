# The human's remarks on request #32, second round (correction after review)

Request: https://github.com/mariusznazar/loop2/pull/32, head 5b65e69f8dfe5397a872afa95593d776c854346b (correction 66a156f plus the record pair). The target branch has not moved (origin/main 2c1d64ca287d014eb4b6f86be03849b55838428e, already merged).

## Human actions completed (2026-10-27)

1. The human deployed 5b65e69 with `loop2-deploy`: exit 0. Orchestrator reads: application label 5b65e69, both containers newly started (14:54:14Z) and `running healthy`; deploy log `deployed 5b65e69f8dfe5397a872afa95593d776c854346b, previously b018ee54f51bf307c272771d78c488fbb995812d`; checkout `/srv/loop2` at 5b65e69; volume `loop2_accounts` created 2026-10-27T14:55:37+01:00, i.e. at the first deployment, before this one.
2. Persistence across container replacement: in the browser session signed in during the public journey on b018ee5, the human reloaded `https://loop2.mariusznazar.com/` after the redeployment and saw the headquarters at once, without signing in; then logged out and logged in again with the same address and password, which worked.
3. Target measurement, run by the human on the server in bash as root from `/srv/loop2` with the host's Node.js, per the skill's procedure: `MemAvailable: 3815344 kB`; `git rev-parse HEAD` and the container label both `5b65e69f8dfe5397a872afa95593d776c854346b`; `exit=0`; last line `PASS`. The full report `/tmp/measure-5b65e69f8dfe5397a872afa95593d776c854346b.txt`, read by the orchestrator, says:
   - request: image `sha256:fa8654a3318ede381b173184b3b463ea539a129da0859e72680de3f1377ef973`, commit 5b65e69, `memoryBytes` 536870912, `limitBytes` 428867584; the image id matches;
   - container: exit 0, `oomKilled` false, `restartCount` 0, memory 428867584, memory+swap 428867584;
   - versions: node 24.22.1, argon2 0.45.1, linux-x64, kernel `5.15.158-2-pve`; errors none;
   - profile argon2id, 65536 KiB, t=3, p=1, 32 bytes; gate: 2 admitted together, third refused, both admitted after release; correct password accepted, wrong rejected; warmup 2 hashes and 2 verifies;
   - measured: concurrency 2, maxActive 2, 20 hashes (min 596.8 ms, median 770.5 ms, max 1299.1 ms), 20 verifies (min 586.1, median 706.3, max 1222.6 ms), total 16158 ms;
   - memory: cgroup version 2, limit 428867584, swap limit 0, `limitHitEvents` 0, `oomKillEvents` 0, current 15454208 bytes, peak `null` (kernel 5.15 records none), process max RSS 184827904 bytes;
   - no measurement container left behind.

## The human's decision on the request's question (binding)

On *Review when* in D-12 and D-16: **remove both fields.** The human said the review should move to the plan, and added that he does not intend to change this access for now and is not sure it belongs in the plan either. Placing (or not placing) a line in the project plan is the human's own action outside the repository; this request only removes the two fields. The task row K13's settlement ("przegląd dostępu agenta i klucza automatu wraca przed zamknięciem fazy") therefore no longer has a place in the foundation; that is the human's choice and is named in the request.

## What the correction must do

- `player-argon2-deployment-check`: the measurement on the deployed image of the request's head passed; clear its *Violated* mark through the-way-record-invariant, with this evidence. The sentence stays as it is unless the evidence shows it no longer matches.
- D-12 and D-16: remove the *Review when* field from each through the-way-record-decision; change nothing else in them unless the removal leaves a dangling reference (check their rationale, Verification and any entry, guideline or skill text that points to the review).
- Any other place that says the deployment check or the human's measurement is still outstanding (for example the loop2-deploy skill or guidelines/testing.md), corrected to what is now true, in both skill copies byte-identically.
