PASS 88e26b9b3fcc09aa6278cc008a6865a368b8ae22

# Review of the second merge of the target branch, task cycle `serwer-odczyty-i-straznik`

Range: first parent `5ac9493a` to merge `88e26b9b3fcc09aa6278cc008a6865a368b8ae22` (`git rev-parse HEAD` confirmed; the worktree is clean; `.the-way` is at the commit the gitlink records, `55afa8e5`). Second side `origin/main` `e6a95a9b`. Merge base `ee2835a3`. Method: `.the-way/task-cycle/review/SKILL.md`, reconciliation review. This is not a review of the whole change.

Blocking findings: 0. Minor: 2 (both out of scope). Out of scope in all: 2.

## Findings

None Critical or Important.

### Minor (out of scope: the target branch's own change, not the reconciliation)

1. `foundations/decisions.md` D-228, the sentence at line 4786 (rationale), "the limit on Strych is 25 MB for each backup, about 385 accounts at the full limit of D-104", and `.claude/skills/loop2-deploy/references/backup_and_restore.md:82` with its twin in `.agents/`, "about 385 accounts at the full limit of each saved game state, against the 440 expected". D-399 (new in the target) keeps for every account a second document held to the same limit of D-104, so an account at the full limit now holds up to two such documents and the account count of that worst case is about half. Neither side edited these two sentences in this merge (the task's diff to D-228 and to this file does not touch them; the target's change did not update them). Effect: a reader doing the capacity arithmetic gets a worst case twice too generous; the real figures (the measured size on each `made` line of the backup log) are unaffected. Evidence: `grep -n "385"` in both files; D-399 text "held to the limit of D-104". Suggested: one dated remark in D-228 or a separate decision, as the owner chooses. Not blocking.
2. `.claude/skills/loop2-deploy/SKILL.md:185` ("The database holds the accounts, the sessions and the players' saved game states") and `references/backup_and_restore.md:3` ("accounts, sessions, saved game states") do not name the previous saves, which the target's change put in the same database and so also in the backup. Trivial; the sentences remain true as far as they go. Not blocking.

## Judgement of what the dispatch asked

(1) The two conflict resolutions.
- D-206. The merged entry (`foundations/decisions.md:3998`) is the target's `e6a95a9b` text for the decision, its Verification, its Rationale and its Rejected, byte for byte as a sentence comparison shows, plus one sentence appended at the end of the Rationale, "The owner counted on 2026-11-13 ... to no account of another person." The task branch's text before the merge had the same sentence in the same place (end of the Rationale, after "...hold saved game states on the server."). No sentence lost, none doubled. The remark does not contradict the target's new rationale ("an account without the privilege loses its progress"); it is a count, and it keeps its point.
- D-355. Compared by sentence: the merged text equals the target's text plus exactly the task's replacements: the `Based on` list gains `mikrus-host-docker-compose-version`, `mikrus-host-logrotate-schedule`, `loop2-app-log-file-names`, `loop2-host-installed-copies-agree`; "two things nobody has checked, that `logrotate` runs daily there and which release of Compose the server has" becomes the readings of 2026-11-14 (timer enabled with `OnCalendar=daily`, a daily cron entry, "that is a schedule, not an observed run", Compose v2.35.1); and the sentence "on 2026-11-14 the server holds the file and one rotated copy of it and no older generation" follows "chosen bounds, not measured needs". Every place where the target added `account-previous-save` (first paragraph, Verification "violates", the `account-block` and `account-previous-save` sentences of the rationale, "Lacks", "Risks taken") is present. Against the first parent the only differences are the target's additions of `account-previous-save` and its "may carry" for the address, which does not contradict the task's text. Nothing lost, nothing doubled. The rest of both entries is the target's.
- A direct check that the merge brought nothing foreign into the task's change: for each of the 16 files the task changed, `git diff -U0 <merge-base> 5ac9493a` and `git diff -U0 e6a95a9b 88e26b9b` carry the same added and removed lines, except `foundations/decisions.md`, where the only difference is the line wrapping of the last line of D-206's rationale before the appended remark (the remark itself is identical).

(2) Files both sides changed, merged without a conflict.
- `foundations/decisions.md`: D-399 to D-402 (new), D-210, D-206, D-112, D-252, D-253, D-354, D-355 read (see section 3). The task's decisions (D-228 and its neighbours, D-356, D-355) say nothing the target's change made false apart from Minor 1. The watcher counts the lines with `"failure":"` of the game container's log; the target's new server code (`src/server/account-routes.ts`) writes the business event `saved-game-reset` only through `writeEvent` and answers the expected refusals (403 `previous-save-forbidden`, 400, 401) with no failure line, so the watcher's kinds are not touched. The watcher does not read the dump, so the `account-previous-save` lines in the dump reach no message.
- The log of `account-previous-save` and `account-block` lines, D-355 and the skill's "The failure record and alerts": the skill's section "Where the game's log lies" names both commands (SKILL.md:273-275, 289), the new section "The previous-save privilege" (SKILL.md:446-509) gives the same filter as the block's, and the code agrees with it: `src/server/account-previous-save.ts` writes `{"event":"account-previous-save-granted"|"-revoked"` through `writeEvent` and `{"failure":"account-previous-save"` through `writeFailure`, both of which pass the filter `'{"event":"account-'*'}' | '{"failure":"account-previous-save"'*'}'`; its sentences carry the email address (`Granted ... to ${email}`, `No account has the address ${email}`) and are filtered out; the `installLastResort` crash line is not appended, as for the block. The skill keeps "Only the human runs it; an agent never does (D-400)", and the "Agent or human" list of allowed commands holds no `docker exec` of the command, so D-400's "violates" (an agent runs the command through the `mikrus` MCP server) is not met.
- The skill and its twin: `diff -r .claude/skills/loop2-deploy .agents/skills/loop2-deploy` shows no difference (SKILL.md and the three references byte for byte equal). The skill reads coherently: the schema 5 paragraphs of the target sit beside the task's rotation, watcher and gh-run additions with no overlap, and the "first deployment of the commit with previous saves" paragraph agrees with `references/troubleshooting.md` (also the target's) and with D-112 (current version 5, privilege column, table of previous saves).
- `foundations/part_map.md`: the `account-server` sentence (target) names the previous save and the privilege command; the `deployment` sentence (task) names the watcher's backup kind. Disjoint and coherent; no sentence of the task says what the target made false.
- `foundations/invariants.md`: the target's `previous-save-slot` and `previous-save-programs-reader` and its changes to `account-session-authorization`, `account-mutation-request-guards`, `account-schema-lifecycle`, `account-database-schema`, `account-client-outcomes`, `player-save-isolation`, `save-version` sit beside the task's rewrites of `loop2-container-isolation`, `loop2-distinct-address`, `loop2-application-port`, `account-email-via-outsider` and the withdrawal of `account-save-backup`. No identifier of the target's depends on the withdrawn one; a search for `account-save-backup` outside the withdrawn-identifiers table finds nothing in the repository (decisions, guidelines, tests, skills). The two new invariants rest on nothing and derive from D-399 to D-402, none of which the task changed.
- `guidelines/testing.md`: the target's added rows and lists (previous-save routes, `previous-save-programs-reader`, D-399, D-400 in the Decision list, twelve routes in the proxy-header row) and the task's one change (the `deploy/` row: "każdy z sześciu rodzajów", six kinds of the watcher; no "pięciu" remains) are both in the merged file. `foundation_check.py` finds every decision and invariant it names.
- `guidelines/coding.md`: the target's alone (the service commands `account-block`, `account-previous-save`, `account-backup`; the events `account-previous-save-granted` and `-revoked`); the task did not change it, and it agrees with D-354 and D-253.

(3) Foundation entries the merge brought in that bear on `deployment`, `agent-workflow`, `product-foundation`: listed under Reach below.

(4) Foundation check: `python -B .the-way/elements/common/foundation_check.py` exit 0, "0 errors".

## Declined to judge

- The code and tests of the target's change (28 commits, 40 files: previous-save routes, reader, view, database schema 5, their tests): reviewed in loop2#96, not part of this reconciliation; I read only `src/server/account-previous-save.ts` and the new routes of `src/server/account-routes.ts` to check the log lines and refusals against the task's skill and watcher.
- Whether D-399 to D-402 are the right design: outside the task.
- The wording quality of Polish text in `guidelines/testing.md`: unchanged by the merge.

## Checks run

- `git rev-parse HEAD` shows `88e26b9b3fcc09aa6278cc008a6865a368b8ae22`; `git status --short` empty.
- `git diff --check 5ac9493a 88e26b9b`: no output.
- `git ls-files --stage -- .the-way` and `git -C .the-way rev-parse HEAD`: both `55afa8e5...`.
- `python -B .the-way/elements/common/foundation_check.py`: exit 0, 0 errors.
- From `tests/agent_workflow`: `python -B -m unittest test_loop2_deploy_skill`: exit 0, 5 tests OK; `python -B -m unittest test_tracked_file_private_paths`: exit 0, 1 test OK.
- `diff -r .claude/skills/loop2-deploy .agents/skills/loop2-deploy`: identical.
- Sentence-level comparison of D-355 (`5ac9493a`, `e6a95a9b`, merge) and of D-206 (`5ac9493a`, `e6a95a9b`, merge): as described above.
- Comparison of the task's change before and after the merge, file by file: identical except the D-206 wrapping line.
- Not run, by the handoff: `npm test`. Not run: the Python tests of `tests/deploy` and `tests/invariants` (the task's own, unchanged by the merge; their files equal the task's before the merge).

## Reach beyond the dispatch

- `src/server/account-previous-save.ts` (read whole, 95 lines) and the diff of `src/server/account-routes.ts`: to check the shape of the log lines against the skill's filter and the refusals against the watcher's counting.
- `foundations/decisions.md` D-399, D-400, D-401, D-402, D-112, D-354, D-355, D-206, D-210 read whole or in their changed hunks; D-228's rationale around line 4786 (the 385-account sentence); the hunks of D-252 and D-253.
- `foundations/glossary.md`: the target's two new entries `previous save` and `previous-save privilege`, read.
- `.claude/skills/loop2-deploy/SKILL.md` read whole; `references/troubleshooting.md` and `references/backup_and_restore.md` read in the changed hunks and around line 82.
- `tests/agent_workflow/` for the two focused tests.
- Scratch files (outside the repository) in the session scratchpad `the session's scratchpad directory` (sentence comparisons of D-355, scope listing); the directory held earlier files of the cycle, which I did not read.

## Unread material

- The dispatch: read whole (the handoff, the review skill). The task `task.md`, `plan.md` and the earlier reports in `reports/` were not read; the questions the handoff asked did not need them.
- Decisions that bear on the topic and read in full: D-112, D-206, D-210, D-354, D-355, D-399, D-400, D-401, D-402. Read only in their changed hunks: D-252, D-253. D-228 read by its rationale paragraph around the 385-account sentence, not whole. D-356 (the watcher's decision, the task's own) was not re-read.
- Invariants read whole through the diff of the merge: `previous-save-slot`, `previous-save-programs-reader`, `save-version`, `account-schema-lifecycle`, `account-database-schema`, `player-save-isolation`, `account-client-outcomes`, `account-session-authorization`, `account-mutation-request-guards`; the task's invariant changes read through its diff, not their `Rests on` facts.
- Guidelines: `guidelines/testing.md` and `guidelines/coding.md` read through the diff of the merge, not whole; this is a reconciliation review and the dispatch named no guideline selection.
- The target's product code and tests (about 5,900 added lines in `src/browser`, `src/server` and `tests/`) not read, except as named above.
- `foundations/environment_facts.md` not read; the check passes and the merge changed no line of it.

## Searches not found or unclear

- Searched for a remaining reference to the withdrawn invariant `account-save-backup` outside the withdrawn-identifiers table: not found (as wanted).
- Searched for "pięciu rodzajów" in `guidelines/testing.md` (the old count of watcher kinds): not found; "sześciu rodzajów" found once.
- Unclear: the merged D-206 carries the owner's count of 2026-11-13 as a remark in the Rationale; I could not judge from the foundation whether that remark should be an environment fact instead (the task's own earlier decision, not changed by the merge).
- Unclear: the handoff's list of changed files of the merge names `guidelines/coding.md` among files "both sides changed"; the task branch did not change it (only the target did), so there was nothing of the task's to reconcile there.
