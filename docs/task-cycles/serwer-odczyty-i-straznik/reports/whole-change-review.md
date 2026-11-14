PASS b5a316f390a7fe256d99ca7a2e74f862d138d036

# Review of the whole change of `serwer-odczyty-i-straznik` (range f0814d77..b5a316f3)

`git rev-parse HEAD` = b5a316f3 (matches the head given); 15 commits; `git status --short` empty before and after my checks. Method: `.the-way/task-cycle/review/SKILL.md` and `whole_change.md`. I changed no file but this report and made no commit; I did not run `npm test`.

Counts: blocking 0, Minor 9 (7 within the task, 2 that arise from the plan or the template rather than from a defect of a commit), out of scope 0.

## What I judged

- The frozen task (whole), the plan (whole), the diff of all 15 files, and the reports of the slices that had no review of their own (foundation step, 1, 3, 4, 5, 6, 7, 8, 9, 10, 11; reports 5 to 7, 9 to 11 read in full or by their "Own-work", "For the return step", "Unread", "Searches" parts, report 7 by its raw readings). Slice 2 has its own review (`PASS b1e8ec99`); I read it and re-checked its claims against the head script, not its conclusions.
- Required outcomes against the commits:
  - To do 3 (sixth kind): met. `deploy/loop2-watch` reads the last 2000 lines of `/var/log/loop2-backup.log`, each cut to 200 bytes, NUL turned into `?`, accepts only a line that is exactly `<UTC stamp>Z loop2-backup: end: sent loop2-accounts-[1-7].sqlite.age`, checks the calendar day and that the stamp lies from now-26 h to now, keeps nothing of a line, evaluates only on a readable state, throttles at 24 h, counts in the day's six, stands after `failures` and before `browser`. The fixed subject `loop2_brak_kopii_bazy` and sentence carry no number but the product name, no data, no tool output. D-233, D-356, the skill (table, throttle sentence, accepted gaps, "Database backups"), `backup_and_restore.md` and the tests know the kind.
  - To do 4: met in D-356 (flock case in its sentence, Rationale and Rejected) and in the skill; the fact `loop2-watch-log-flock-status` is written; watcher behaviour unchanged (the diff touches neither `take_own_lock` nor `deploy_lock_is_held`).
  - To do 5: met (`test_a_broken_flock_at_the_second_look_drops_the_readings_and_names_its_status`, status 2 and 127, fixture takes a chosen status, default unchanged).
  - To do 6 and 7: met in D-234 and both copies of `backup_and_restore.md` ("Trying a backup on the owner's computer", "Not tried", the `( umask 077; … )` places verified in the file at lines 454, 465 and 534).
  - To do 8: met (`docker compose version`, the logrotate readings, `ls -1 /var/log/loop2-app.log*`, plus the `gh run list … --event schedule` form); D-12 unchanged. The three expectations slice 3 wrote from memory were read on the server by slice 6 (all held; the text was corrected to "scheduled, not run" and "cron entry as well").
  - To do 9: facts written for the break at a deployment, `resources:` lines and exit 5, exit 7, `docker stats`, published ports, `SQLITE_BUSY` (partial, see M5), Compose version, logrotate schedule, log file names, backup log, flock, the six host facts re-read, the installed copies. Naming them in decisions is the return step's.
  - To do 10: met (both repositories public by `gh`, passage and date changed in place; licences get the human's date).
  - To do 12: met in the fact `check-address-schedule-run-times` and in the skill (second of the three ways, the four limits); the schedule and `check-address.yml` are unchanged (`git diff` of `.github` empty).
  - To do 1: invariants narrowed to what their tests check, test assertions unchanged (docstrings only), facts for the published ports and the old game's container exist; see M7.
  - To do 2 and 11: `account-email-via-outsider` narrowed and the delivery fact written; the backup-log fact written; the measurement of the password work not turned into a fact, see M8; the human's results go to the return step.
  - Settlements rows 1 to 4: met by the foundation step's D-233, D-234, D-356.
- Fidelity of facts to raw output: I compared the new facts with the raw outputs in the reports of slices 5, 6, 7, 8, 9, 11 and recomputed what could be recomputed: the ten dump-to-deployed intervals (9 to 11 s), the ten `resources:` ranges (3787 to 3840 MiB; 16047 to 16113 MiB), the 17 run times and their gaps (min 3:32:11, max 8:30:07), the 14 nights of the backup log (weekday file numbers agree with the dates), the 43 lines of the watcher's log (3 `run:` and 40 `skipped:`), the 0.454 s between the two reset-mail lines, the counts in `slice-5-deploy-log-lines.txt` (512 prefixed lines, one `(exit `, none `exit 5)` or `exit 7)`). No quotation differs from its raw output beyond the disclosed ones (runs of spaces collapsed, the tool's HTML escaping undone, `<account>` for an identifier, the ports column left out). I found no server id, name, port, user, address and no private path in the added lines (searched the whole diff).
- Trust boundary (`deploy/**`): crafted input at the backup log was checked by reading `read_backup_log`, `find_send`, `calendar_day_exists`, the pattern `BACKUP_LINE` and by the tests that feed it. A line counts only if it is exact (anchored, ranges, program name, file name `[1-7]`, `$` at the end of the string so CR does not count, NUL replaced before `read` can drop it, over-wide lines cut so they cannot match, stamp not in the future, calendar checked, bounded tail), keeps nothing of a line, and a missing, empty or unreadable log counts as no send. No way to make a forged line count that does not need a newline inside the error text of a tool, which the strict pattern cannot exclude and nothing in the task asks for. TZ and locale are fixed (`LC_ALL=C TZ=UTC`, before the first use), so the text comparison of stamps orders them in time.
- Tests: new tests state the break each catches; every message test keeps `# invariant: failure-watcher-message`; the table of look-alikes, the control "all look-alikes beside one exact line do not hide it", the leap-day case, the very long log (read from its end), the 3 MB line, the agreement test that feeds the watcher the log of a real run of the backup script, and the byte-identical backup log after a run all assert behaviour, not a copy of the computed value. The test of the first look at the lock shows the effect (no `docker` call, no message, state unchanged), which cannot show that the log is unread; the order in `main` holds that (slice 2's review said the same). Changed invariant tests, named: `tests/invariants/test_loop2_application_port.py`, `test_loop2_container_isolation.py`, `test_loop2_distinct_address.py` (module docstrings only; assertions untouched); `tests/deploy/test_loop2_watch_message.py` (the six-kind versions of the invariant `failure-watcher-message`, one new test). I read the three invariant tests against the new sentences clause by clause (`ports`, `network_mode`, `networks`, `links`, `include`, `extends`, `volumes`, `external`, `docker.sock`, old names).
- Reserved choice: none taken (Bash, `tail`, `tr`, `cut`, `flock` already used). No operation that cannot be undone: the cycle only read the server and `gh` and the new watcher kind works only after a human reinstalls it, which the skill says.

## Findings

### Critical
none

### Important
none

### Minor

M1. **No time bound on the read of the backup log.** `deploy/loop2-watch`, `read_backup_log` (the `tail … | tr | cut | find_send` pipe). Docker calls in the script run under `timeout --kill-after`; this pipe does not, and only `tail` is started with `7>&-`, so `tr` and `cut` inherit the watcher's own lock descriptor. If the log were replaced by a FIFO with no writer or sat on a stalled device, `tail` would block holding the own lock and every later run would end as "another run holds the lock": a silence that looks like "all works". Reaching it needs root on the host, so it is no hole from crafted content. Evidence: script text; the only non-regular file a test uses is a directory. Within the task (slice 2); this is slice 2's review finding 1, which I confirm; cost of fixing is a `timeout` around `tail` and a test with a FIFO. Cost of leaving it: one more way to stall that the other calls already guard against.

M2. **Comment lines too wide.** `deploy/loop2-watch:42` (108 columns) and `:55` (142), the sentences appended to old lines instead of re-wrapped; likewise one line of `tests/invariants/test_loop2_distinct_address.py` (about 135 columns, "the public address of loop2 the workflow declares …"). The base file already had 9 lines over 100 columns and the guidelines hold no width rule; polish only. Slice 2's review finding 2, confirmed. Within the task.

M3. **Stray blank line.** `tests/deploy/test_loop2_watch.py`, two blank lines before `test_a_last_backup_line_is_read_as_state_and_the_next_run_writes_it` inside `TheState`. Slice 2's review finding 3, confirmed; Ruff's blocking set passes. Within the task.

M4. **A claim in nine facts' *Source* that no output carries.** The facts `loop2-deploy-dump-to-deployed-time`, `loop2-deploy-resource-gate-lines`, `loop2-deploy-stage-exit-lines`, `loop2-app-log-file-names`, `mikrus-host-logrotate-schedule`, `loop2-backup-log-nightly-sends`, `loop2-watch-log-flock-status` say `tail` or `ls` is "from the package whose version `stat --version | head -1` prints", which the reports call an inference from the platform (same package, coreutils), not a reading (slice 5 and 6 reports, "Searches not found or unclear"). The template says an agent's memory is no source. It is true on the server's distribution and no decision rests on it, so Minor. Fix: say what was read ("tail from the package of `stat`, not read") or add `tail --version | head -1` and `ls --version | head -1` to the skill's version readings (slices 3 and 5). Within the task.

M5. **The `SQLITE_BUSY` fact reaches less than To do 9 asks, and quotes a form outside the skill's list.** `foundations/environment_facts.md`, `loop2-app-log-sqlite-busy-lines`: the fact covers the dump file and its `.1` copy only; the log of the running containers was not read (the skill's list has no `grep` of it), and the dump begins at 2026-11-11T09:59Z by the executor's control. The sentence says exactly that, so it is not false, but D-205's "observed write failures" is observed for three days of lines. The *Source* also quotes `; echo "exit=$?"`, which is not a form the list allows (read-only; slice 6 disclosed it). Arises from slices 3 and 6 together; the fix is a bounded `grep` form of `docker compose logs` on the list and a reading, or a sentence in D-205's remark saying what the facts cover. Within the task.

M6. **The skill's description of the watcher omits the backup log.** `.claude/skills/loop2-deploy/SKILL.md:292-296` (and the `.agents` copy): "It reads state and health of both containers and the fresh failure lines of the game container's log, skips a run …". The table below it and the accepted gaps name the sixth kind, but the sentence that says what the watcher reads still lists two sources. A reader who stops at it will not look for the backup log. Slice 3. Within the task.

M7. **To do 1: three removed server parts have no fact.** `loop2-distinct-address` (that the live address of loop2 differs from the old game's), the Cloudflare half of `loop2-application-port` ("inaccessible from the Internet outside Cloudflare") and the "old instance is a container of its own" half of `loop2-container-isolation` are carried only by the human's panel reading of 2026-11-14 or by `mikrus-host-docker-workloads`; slice 10 says so and sends the human's check to D-08 and D-10's rationale. The task says each such part "staje jako fakty środowiska z poleceniem odczytu i datą". The plan accepted this ("where no fact carries a removed part, say so"), so the commits follow the plan and the gap is the plan's (slices 6 and 10); it is graded Minor because no agent reading exists for the live DNS answer on the skill's list and the return step keeps the check as a remark. If the return step does not write that remark in D-08 and D-10, the three invariants will have lost a sentence nothing carries.

M8. **To do 2 for `player-argon2-deployment-check` is not met, by decision.** The task asks that it become a fact with a reading and a date; the plan (slice 12 removed by the orchestrator) keeps the invariant and records the human's measurement as a remark at D-106 and D-113, because the human's result is a summary and the template's *reading* form takes the command's output word for word. I agree with the reason: a fact from the summary would pass for evidence it is not. It is a missed requirement of the frozen task, not a defect of a commit, and nothing in the range can fix it without the human's output; the request must say it stays open, as the handoff says it will. Comes from none of the slices (a gap of the plan). Likewise D-153's confirmation message stays unsettled (slice 11 says so correctly), and D-153's *Verification* "complies" clause, which speaks of both messages and names `account-email-via-outsider`, is checked by no entry now; the return step must say so in D-153.

M9. **The template has no form for a service's public answer read through a CLI.** `check-address-schedule-run-times` uses the `reading:` form, which the template reserves for "a state of a host the product's people run"; the two visibility facts keep the page form with the output of `gh api` and do not say it was read through `gh`. Slices 8 and 9 flagged it and chose the closest form; `foundation_check.py` accepts it. Not a defect of a commit; it is a template question for the-way. Out of the task's reach, so counted here as arising from the template.

## Declined to judge

- The wording "od ponad doby" in `TEXT_BACKUP` while the threshold is 26 hours: the executor's words, nothing false.
- That the alarm for a log that never existed repeats once a day until a first backup: the task says a missing log counts as no send.
- Everything the handoff says the return step writes (D-09, D-10, D-17, D-205, D-232, D-237, D-355, D-356's rhythm and Rationale, withdrawal of `account-save-backup`, D-12, D-16, D-106, D-110, D-113, D-153, D-206, D-223): reviewed with its own range.
- The installed copy on the server and its reinstall: a human's act.
- The one `F` in slice 2's first bounded run of the watcher module (cause unknown): I did not reproduce it; the eight tests I ran passed; the cycle's own gate is where it would show again.
- The orchestrator's choice to take slice 12 out: judged only as far as M8.

## Checks I ran (each alone, from the worktree, no `npm test`)

| Check | Command | Result |
|---|---|---|
| Foundation | `python -B .the-way/elements/common/foundation_check.py` | exit 0, "0 errors" |
| Watcher, new classes (from `tests/deploy`) | `python -B -m unittest test_loop2_watch.TheBackupKind test_loop2_watch.TheDeploymentLock.test_a_broken_flock_at_the_second_look_drops_the_readings_and_names_its_status test_loop2_watch.TheLog.test_an_eventful_run_names_the_state_of_the_backup_log_and_nothing_read_from_it` | exit 0, 8 tests OK in 114 s |
| Invariant tests (from `tests/invariants`) | `python -B -m unittest test_loop2_application_port test_loop2_container_isolation test_loop2_distinct_address` | exit 0, 7 OK |
| Skill test (from `tests/agent_workflow`) | `python -B -m unittest test_loop2_deploy_skill` | exit 0, 5 OK (byte-identical copies, banned literals) |
| Quality (ShellCheck, Ruff, Prettier on the changed files; from `tests/quality`) | `python -B -m unittest test_quality_invariants` | exit 0, 5 OK in 20 s |
| Twins | `cmp` of both copies of `SKILL.md` and of `backup_and_restore.md` | exit 0 each |
| Private data in the diff | `git diff f0814d77..HEAD` searched for private paths, `C:`, `The Brain`, `.runs`, the server's id, name and port base | no match |
| Arithmetic | the intervals, ranges, gaps and counts of the facts, by hand and by a small script over the raw output in the reports | agree |

Taken from the reports, not rerun: slice 1 and 2's red runs and per-class green runs of the watcher module (98 of 98 in slice 2), the message module (8 OK), `test_loop2_backup.py`, slice 10's three mutations of `compose.yaml` and `deploy.yml` (each failing its test), the failing run of slice 1's test against a temporary mutation. Not run on purpose: `npm test`, the whole `test_loop2_watch.py` and `test_loop2_watch_message.py` modules (10 to 30 minutes each, the machine is short of memory). `python -B scripts/test.py <file>` was not tried; the executors found it did not finish in 17 minutes on this machine and used `unittest` per module, as I did.

## Reaches beyond the dispatch

- `.the-way/elements/environment-facts/template.md` ("Source", lines 95 to 150): to judge the forms of the new facts' *Source* (M4, M8, M9).
- `.the-way/task-cycle/review/SKILL.md` and `whole_change.md` (the method, as the handoff gives it).
- `foundations/part_map.md` whole and `guidelines/coding.md` whole, `guidelines/testing.md` whole (two reads): the guidelines of the parts `deployment`, `agent-workflow`, `product-foundation` by `product-guidelines/reading.md`.
- `compose.yaml`, `deploy/loop2-backup` (lines 70 to 135), `.claude/skills/loop2-deploy/SKILL.md` (lines 40 to 135 and 268 to 372), `references/backup_and_restore.md` (outline and the `umask` places), the three invariant tests and `tests/deploy/watch_script_support.py`: to compare each changed sentence or test with what it speaks of.
- `the author's private rule file on writing scripts`: a hook required it before my one scripted selection of decisions.

## Unread material

Decisions of my selection (the 71 entries whose *Scope* names `deployment`, `agent-workflow` or `product-foundation`, found by a script over the log's `- **Scope:**` lines, 184 463 characters): **29 read whole, 42 by title only.**

- Read whole: D-08, D-09, D-10, D-12, D-13, D-14, D-16, D-17, D-31, D-73, D-84, D-106, D-110, D-153, D-205, D-228, D-230, D-231, D-232, D-233, D-234, D-235, D-237, D-238, D-355, D-356, D-360, D-361, D-362.
- Run through by title, none opened: D-05, D-11, D-15, D-28, D-29, D-30, D-32, D-38, D-46, D-49, D-74, D-75, D-76, D-77, D-78, D-79, D-80, D-81, D-82, D-83, D-85, D-87, D-88, D-89, D-103, D-107, D-108, D-111, D-112, D-137, D-158, D-213, D-227, D-229, D-347, D-357, D-358, D-359, D-390, D-391, D-392, D-396 (plus D-229 and D-236 as named in others).
- Decisions that bear on the change and stayed unread: D-15 (recovery and rollback; the skill's rollback text is untouched), D-82 and D-85 (where a test's expected value comes from; I judged the tests against `guidelines/testing.md`, which carries them), D-347 (how an agent reads the game's log; the skill text I compared is its consumer), D-229 and D-236 (the database check; no change reaches them).
- Not read whole: `foundations/invariants.md` (read whole: the four narrowed entries, `failure-watcher-message`; the rest not), `foundations/environment_facts.md` (read the 24 changed or added entries and the template's Source rules, not the 882 lines), `foundations/glossary.md` (not opened; the change adds no term I could see used in another meaning), `references/setup_and_secrets.md` and `troubleshooting.md` (searched for "five minutes", "kinds" and the loop2 subjects only), the plan's slice texts for slices 1 to 4 (read in the plan, not in the handoffs), the handoffs of slices 1 to 11 (not opened; I judged against the plan and the reports), `slice-7-report.md` after its raw readings (the choices part), the raw file `slice-5-deploy-log-lines.txt` (counted and grepped, not read through), kind guidelines `guidelines/coding-*.md` (the kind index names none for a deploy script).

## Searches not found or unclear

- A kind file or rule for deployment scripts in `guidelines/coding.md`: none, patterns of deployment are deferred there (so the script was judged by D-31/ShellCheck, the testing guidelines' trust-boundary table and the plan).
- A line-width rule for comments in scripts or tests: none found (M2 is polish).
- A form of *Source* for a service's public answer read through a CLI: not in the template (M9).
- The exit status of the `exec` calls: the `mikrus` tool shows none, so `cmp` with empty output is read as "identical" (slice 7); I could not check that a `cmp` error would reach the output. Unclear whether that is enough for "prints no difference", which is all the fact claims.
- Whether the confirmation message of D-153 was ever delivered: no log line and no human result (slice 11); stays open for the return step.
- The cause of the gaps between GitHub's scheduled runs: not established and not searched, as the task says.
