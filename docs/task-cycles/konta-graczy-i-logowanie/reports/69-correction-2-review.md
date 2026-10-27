PASS c175fadbb0d3145c2898ace7abf6170c17231ee9

# Review of the second correction after the human's remarks on request #32

- **Range:** 5b65e69f8dfe5397a872afa95593d776c854346b..c175fadbb0d3145c2898ace7abf6170c17231ee9. It is one commit, c175fad, changing three files: `foundations/decisions.md` +3/-5, `foundations/invariants.md` +1/-1, `guidelines/coding-password-hashing.md` +2/-2. `git rev-parse HEAD` returns c175fad…, the head I was given. The tree is clean.
- **Pin:** the `.the-way` checkout and the gitlink are both at 574a37b9ab9572f876298f4cc10754581222d3f0.
- **Method:** `.claude/skills/the-way-review-change/SKILL.md` → `.the-way/task-cycle/review/SKILL.md`, section 4 (a correction for the human's remarks: each remark made or not, then the diff as in section 2). I applied the user's code-review playbook for the format and for the trap of line anchors that drift.
- **Binding input:** `reports/67-human-remarks-2.md`, read first, in place of a findings file.

**Counts:** 0 blocking, 1 Minor, 1 out of scope.

## The remarks, each made or not

### 1. Clear the *Violated* mark of `player-argon2-deployment-check` with the server evidence: **made**

`foundations/invariants.md:650` changes from `yes` to `no`. The sentence (`:644`), the method, *Rests on*, *Derives from* and *Part* are unchanged. I checked each clause of the sentence against the server report the remarks quote:

| Clause of `:644` | Evidence in `reports/67-human-remarks-2.md` | Holds |
|---|---|---|
| "The deployed loop2 container image" | image `sha256:fa8654a3…` = the deployed container's image (the image id matches); label and `git rev-parse HEAD` both 5b65e69; deployment of 5b65e69 by `loop2-deploy`, exit 0, both services `running healthy` | yes |
| "after warmup" | warmup 2 hashes and 2 verifies | yes |
| "at least 20 hashes and 20 verifications … two at a time" | 20 hashes, 20 verifies, concurrency 2, `maxActive` 2 | yes |
| "with the configured Argon2id cost settings" | argon2id, 65536 KiB, t=3, p=1, 32 bytes. That equals `src/server/passwords.ts:5-8` at the head; the report reads them from the image's own `PASSWORD_HASH_PROFILE` (`src/server/measure-passwords.ts:274-278`) | yes |
| "a correct and a wrong password check" | correct accepted, wrong rejected | yes |
| "the refusal of a third concurrent operation" | 2 admitted together, the third refused, both admitted after release | yes |
| "in a container limited, without swap, to at most 80% of its 512 MiB deployment limit" | `memoryBytes` 536870912; limit 428867584 ≤ 0.8 × 536870912 = 429496729.6; memory+swap 428867584 and cgroup swap limit 0 | yes |
| "which did not restart" | `restartCount` 0, `oomKilled` false, container exit 0 | yes |
| "whose cgroup counted no hit of that limit and no out-of-memory kill" | cgroup v2, `limitHitEvents` 0, `oomKillEvents` 0 | yes |

- **The counters are the ones the sentence means.** The measurement reads `limitHitEvents` and `oomKillEvents` from `memory.events` `max` and `oom_kill` (`src/server/measure-passwords.ts:142-143`). The launcher fails on either being nonzero and on possible swap (`scripts/measure-passwords.mjs:133`, `:179-187`). The fact `cgroup-memory-accounting` (`foundations/environment_facts.md:298-302`, Linux 5.15) gives those counters this meaning, and the server's kernel is 5.15.158.
- **Peak memory `null` is no gap.** The sentence no longer names a peak; 66a156f reworded it to the limit-hit count, and review 65 accepted that.
- **The evidence also covers the head.** The range 5b65e69..c175fad changes only `foundations/` and `guidelines/` (`git diff --stat`). The image copies only `package*.json`, `tsconfig.*.json`, `scripts/`, `src/` and `assets/` (`Dockerfile:3-9`, `.dockerignore`). So an image built from this head or from its merge has the same inputs as the measured one, except its revision label.
- **WAY-51.** The request must name the clearing, as the correction report says.

### 2. Remove *Review when* from D-12 and D-16: **made**

- **What changed.** Exactly two lines are removed, at the former `foundations/decisions.md:243` (D-12) and `:319` (D-16). Nothing else in either entry changed. `grep -n "Review when" foundations/decisions.md` now finds nothing, and `git grep "Review when"` over the product, `docs/` and `.the-way` excluded, finds nothing either.
- **Nothing points to the removed review.** I searched `foundations/`, `guidelines/`, both `loop2-deploy` skill copies, `AGENTS.md`, `README.md` and `deploy/` for "public launch", "public use", "phase", "access review" and "review(s) agent / the automation". The only hits are the two rationales (D-12 `:245`, D-16 `:323`). They keep the first half of K13 ("the test server is intended to hold only the owner's account before public account launch") and do not mention a review. That is what the remarks ordered: "this request only removes the two fields".
- **What the request must name.** The second half of K13 now has no place in the foundation, by the human's decision. The correction report lists this for the request.

### 3. Correct any text that still says the measurement is outstanding: **made**

- **What changed.** D-113's binding sentence, *Rationale* and *Rejected* (`foundations/decisions.md:1906`, `:1914-1915`), and the example of `guidelines/coding-password-hashing.md:29-31`.
- **Nothing else says it is outstanding.** `git grep -i "provisional|candidate profile|Argon2id candidate|not yet measured|until .{0,40}measur|deployment-check|unmeasured|…"` over the tracked product files finds no other text saying the measurement is outstanding.
  - The skill's "The request stays a blocked draft until the password measurement and the public journey have been done on its head commit" (`references/setup_and_secrets.md:231`) is the procedure for any head and stays true.
  - The test comment "The provisional candidate of the spec, section 5" (`tests/password-measurement.test.mjs:81`) names the spec's candidate, which that section does call provisional. It does not state the product's current state.
- **The skill copies are untouched** and byte-identical (`cmp`, exit 0). `guidelines/testing.md` holds no statement of the measurement's state.

## The reworded D-113 and guideline example

- **D-113's binding sentence** ("use one explicit Argon2id profile, measured with that gate in the deployed container image") is now true.
  - The profile is `src/server/passwords.ts:5-8`, and the one gate of two is `MAX_ACTIVE_PASSWORD_OPERATIONS = 2` (`:11`, `:24`).
  - Both are what the deployed image was measured with (remark 1).
  - The sentence claims no more than the evidence: one profile, that gate, that image.
- **The new rationale** ("two slots of this profile fit within 80% of its memory limit; a different profile or gate carries no such evidence") says exactly what a pass under a 409 MiB limit with no limit hit shows.
- **The guideline's "a changed profile or gate needs that measurement again"** adds no new meaning (WAY-172).
  - `player-argon2-deployment-check` already binds the configured cost settings, two at a time, and the refusal of a third.
  - A changed profile or gate leaves its sentence unproven for the new image.
  - D-106's binding sentence already requires cost parameters set "after measuring … in the intended Mikrus container image".
- **The meaning change stays within the evidence.** It goes from "provisional until measured" to "measured". The request must name it as a changed meaning of D-113, as the correction report says.

## Findings

### Important / Critical (blocking)

None.

### Minor

#### 1. The skill tells the human the measurement loads the server "for a few seconds"; on the server it took 16 s (new thread)

**Anchor:** `.claude/skills/loop2-deploy/references/setup_and_secrets.md:333-334` and the same lines of `.agents/skills/loop2-deploy/references/setup_and_secrets.md` ("The extra load is two password operations at a time for a few seconds; locally, the 40 measured operations took 3.4 s.").

**To paste:** On the test server the 40 measured operations took 16.2 s (total 16158 ms, median hash 770.5 ms, median verify 706.3 ms), almost five times the local 3.4 s. "For a few seconds" understates the load a human starts on a one-CPU host shared with `loop` and `foundryvtt`. Could the sentence give the server figure, about a quarter of a minute?

**Why I report it:**

- This paragraph is there so that the human knows what the launcher costs the shared host before running it.
- "Locally … 3.4 s" is literally true, but "a few seconds" is the claim a reader takes for the server, and the server's own run contradicts it. The figure comes from the server report quoted in `reports/67-human-remarks-2.md`. The context is `task.md`, Context: host 1 CPU, `loop` and `foundryvtt` beside loop2.
- The harm is small. The load is bounded at two operations and 409 MiB, it has already run once without incident, and the deadline stops it. So: Minor.
- It lies within the task (To do 16), outside this correction's diff and remarks. It does not reopen the review (section 4).
- A fix touches both copies byte-identically and needs the full Linux gate, since `tests/agent_workflow/test_loop2_deploy_skill.py` reads them.
- The correction author reported the same statement ("Returned to the orchestrator" 1). I grade it myself.

### Out of scope

#### 2. The test comment's anchors into `foundations/decisions.md` point at the wrong lines, and were wrong on `main` already (new thread)

**Anchor:** `tests/sim/program-counts.test.mjs:16` ("D-92 and D-93 (foundations/decisions.md:1619,1641)").

**To paste:** D-92 and D-93 now stand at `foundations/decisions.md:1597` and `:1619`. On `main` (2c1d64c) they stood at `:1599` and `:1621`, and at this task's base 7012abc at `:1597` and `:1619`. So `:1619` points to D-93's heading and `:1641` into D-93's rationale. Naming the decisions without line numbers would stop the drift.

**Why I report it:**

- An anchor by line number drifts whenever lines are added or removed above it, and no check compares it.
- This correction removes two lines above it, as every change to the log does.
- It is wrong on the target branch before this request, and no remark covers it, so it is out of scope. It is a comment, so no test result depends on it.

## Declined to judge

- The measurement report itself, `/tmp/measure-5b65e69….txt` on the server: reading it needs a server command, which I may not run. I judged it as quoted in the binding remarks, which the orchestrator read.

## Checks

| # | Command | Exit | Result |
|---|---|---:|---|
| 1 | `git rev-parse HEAD`; `git status --porcelain \| wc -l`; `git -C .the-way rev-parse HEAD`; `git ls-files --stage -- .the-way` | 0 | c175fad…; 0; 574a37b… twice |
| 2 | `git log --format='%H %ae%n%B' 5b65e69..c175fad`; `git diff 5b65e69..c175fad`; `git diff --stat 5b65e69..c175fad` | 0 | one commit, three files, +6/-8 |
| 3 | `python -B .the-way/elements/common/foundation_check.py` at c175fad | 0 | `0 errors` |
| 4 | `git ls-files --eol foundations/decisions.md foundations/invariants.md guidelines/coding-password-hashing.md` | 0 | `i/lf w/lf` for all three |
| 5 | `git grep -n -E "decisions\.md\|invariants\.md\|coding-password-hashing" -- tests` | 0 | only the comment of out-of-scope finding 2; no test reads the three files |
| 6 | `git grep -n -i -E "provisional\|candidate profile\|Argon2id candidate\|not yet measured\|until .{0,40}measur\|deployment-check\|unmeasured\|before closing\|accounts-on-the-test-server\|Review when" -- . ':!docs' ':!.the-way'` | 0 | no stale statement besides those judged above |
| 7 | `git grep -n -i -E "public (account )?launch\|public use\|close[sd]? the phase\|phase\|access review\|review(s\|ed)? (agent\|the automation)" -- foundations guidelines .claude/skills/loop2-deploy .agents/skills/loop2-deploy AGENTS.md README.md deploy` | 0 | only the D-12 and D-16 rationales, and an unrelated "phases" (of a test case) at `foundations/decisions.md:1406` |
| 8 | `cmp .claude/skills/loop2-deploy/references/setup_and_secrets.md .agents/skills/loop2-deploy/references/setup_and_secrets.md` | 0 | identical |
| 9 | `git show <rev>:foundations/decisions.md \| grep -n "^### D-92 \|^### D-93 "` for 5b65e69, 2c1d64c and 7012abc | 0 | as in finding 2 |
| 10 | Manual: `src/server/passwords.ts:1-30`, `src/server/measure-passwords.ts:118-161`, `:270-280`, `scripts/measure-passwords.mjs:21`, `:120-190`, `Dockerfile`, `.dockerignore`, against the sentence and the remarks | — | as under remark 1 |

I did not run the full `npm test`. No file a test reads changed (check 5), and the foundation check, the one check that reads these files, ran (check 3). No command was refused.

## Reading and reaches

- **Read whole:** `reports/69-correction-2-review-handoff.md`, `reports/67-human-remarks-2.md`, `reports/68-correction-2-handoff.md`, `reports/68-correction-2-report.md`.
- **Read at the head:** `player-argon2-deployment-check`, `cgroup-memory-accounting`, D-12 (`:232-250`), D-16 (`:306-330`), D-113 (`:1904-1915`), `guidelines/coding-password-hashing.md` whole, and `.claude/skills/loop2-deploy/references/setup_and_secrets.md:225-334`.
- **Reaches beyond the handoff**, each with its reason:
  - `src/server/passwords.ts`, `src/server/measure-passwords.ts`, `scripts/measure-passwords.mjs`: to check that the reported counters and profile are the ones the sentence names.
  - `Dockerfile` and `.dockerignore`: to check that the evidence from 5b65e69 covers an image built from this head.
  - `tests/sim/program-counts.test.mjs:14-18` and three revisions of `foundations/decisions.md`: the anchor trap of the playbook.
- **Not read:** `cycle.md`, as instructed.
