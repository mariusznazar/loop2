# Handoff 28 — correction: the other items worth fixing

You make a correction for the human's remarks on the open request of the task cycle `skad-wiem-o-awarii`. Variant of `make-change`: "a correction for the human's remarks".

## The remarks (they bind)

The human wrote: "you may fix those 4 outdated sentences in passing, and anything else you see that is worth fixing". The four guideline sentences were fixed by the previous correction (`494b349`, `d41832d`). This handoff lists the other items the cycle's reviewers left open and the orchestrator judged worth fixing now. Fix exactly these nine and nothing else.

## Delegation and place

- The orchestrator has delegated intermediate choices to itself. Questions go to it.
- Work from the worktree root `the root of the repository` (branch `task/skad-wiem-o-awarii`, head `d41832d`), you alone writing in it. Pin `.the-way` at `294af7fde45323ac1851c014a03071a97fc38d96`. Method: `.the-way/task-cycle/change/SKILL.md` (project skill `the-way-make-change`), read whole, and `.the-way/task-cycle/change/fix.md`. Commits on the task branch, explicit paths, English messages in the repository's style (`type: :emoji: summary`), no push. Foundation entries are changed through the pinned project skills: `the-way-record-decision` for the decisions, `the-way-record-environment-fact` for the fact, `the-way-update-part-map` for the part map; read the skill of an element whole when you change an entry of it, and run `python -B .the-way/elements/common/foundation_check.py` after each.
- Report: `.runs/task-cycles/skad-wiem-o-awarii/reports/28-correction-rest-report.md` (per item: the old and the new text or code, the check; checks with command and exit code; own-work check; reaches beyond this handoff; **Searches not found or unclear**).
- Forbidden for every agent of this cycle: the earlier 10x checkout of the repository (the directory next to this one ending in `-10x`), branches `10x/*`, tags `archive/10x-*`, the vault folder of the earlier 10x transition, and the session records of the earlier 10x checkout and of the author's notes vault.

## The nine items

Sources are review reports in `.runs/task-cycles/skad-wiem-o-awarii/reports/`: `25-review-return-step-report.md` (Minor findings), `26-review-merge-report.md`, `16-review-slice5-report.md` (M4), `13-review-slice3-report.md` (Minor 2), `07-review-slice1-report.md` (Minor 2). The decisions are D-355 and D-356 (this change's; D-352 to D-354 are another task's, on `main`).

1. **D-356 names the one failure line of the report route** (merge review, Minor 1). The route writes a single failure line with the `failure` word `browser` at the first refusal of an hour (`LIMITED`). It does not violate D-353 (expected refusals leave no failure line), but a later cleanup in the name of D-353 could remove it. Add one sentence to D-356 saying that this one line is the notice that reports were dropped and why it is kept. Entry: `the-way-record-decision`.
2. **D-355 *Rationale* overclaims** (return-step review, Minor 4). It says the append "depends on nothing … unchecked", yet the daily run of `logrotate` and the server's Compose release are unread. Reword it to say what is true: it depends on nothing about the server that this repository does not carry, except the two things named as unchecked.
3. **"Leaves room" hides the number** (return-step review, Minor 3). In D-356 and in the `loop2-deploy` skill (both copies, `.claude/skills/loop2-deploy/` and `.agents/skills/loop2-deploy/`, byte-identical) say plainly that in a flood of browser reports the browser kind takes at most four of the day's six messages and leaves two for the server kinds. Read `deploy/loop2-watch` for the real rule and say only what it does.
4. **Part map, "the last two"** (return-step review, Minor 5): the `deployment` sentence of `foundations/part_map.md` says "the last two" ambiguously; name what is meant. Entry: `the-way-update-part-map`.
5. **Fact `logrotate-rotation-rules`** (return-step review, Minor 1) joins three claims in one sentence and drops "or mailed". Split it into sentences that each say one thing the source says, keeping the quotation and the source as they stand (read the source again; do not take the wording from memory). Entry: `the-way-record-environment-fact`. Leave the archive capture of `github-schedule-shortest-interval` as it is.
6. **D-347 *Rationale* wrapping** (slice 1 review, Minor 2): one line of the *Rationale* is wrapped unevenly; rewrap that paragraph to the width of its neighbours, changing no word. (D-347 may have been changed on `main`; take it as it stands.)
7. **The `account-block` command refuses an address with a line break** (the executor of the skill slice and the whole-change review, N4). The skill's command that appends the block lines of an account to the dump file filters the lines the command prints, but an address with a line break inside it can carry a forged JSON line past the filter. Add to the command, in both skill copies, a check that refuses to run when the address holds a line feed or a carriage return, with a message; keep the filter; then rewrite the sentence naming the residual risk to what still remains (an address that reaches the command another way). Try the new command by hand in Git Bash on made-up addresses (a normal one, one with a line break, one with a carriage return) and put the trial in the report. The test `tests/agent_workflow/test_loop2_deploy_skill.py` must still pass (the two copies identical, no IPv6 literal, no `mikr.us` name, the description under 400 characters).
8. **Watcher: a missing `flock` is logged as a held lock** (slice 5 review, M4). In `deploy/loop2-watch` (near the two places of the lock look and of its own lock) make the log line name the status of the `flock` call, so a missing or broken `flock` is not read as "held". Add or extend a test in `tests/deploy/test_loop2_watch.py` on the stand-in tools that shows both: a held lock and a missing or failing `flock`. Run it red first. The script must stay clean under shellcheck (`npm test -- tests/quality/test_quality_invariants.py`) and must not change what the message or the state hold (`tests/deploy/test_loop2_watch_message.py` must still pass).
9. **The constructor check of the report limit has no test** (slice 3 review, Minor 2): `src/server/account-policy.ts` throws `Invalid browser report limit` for a bad value, untested. Add the case where its sibling checks are tested (search `tests/` for the sibling messages and put it beside them), red first against a policy built with a bad value.

## Checks

Per item the checks named above, each with command and exit code, and at the end `python -B .the-way/elements/common/foundation_check.py`, `npm test -- tests/agent_workflow/test_loop2_deploy_skill.py`, `npm test -- tests/deploy/test_loop2_watch.py`, `npm test -- tests/deploy/test_loop2_watch_message.py`, `npm test -- tests/quality/test_quality_invariants.py` and the test file of item 9. Not the whole gate.

## Return

Status (`done`, `done with concerns`, `questions`, `blocked`), your commits, a one-line check result naming what failed or did not run, the report path.
