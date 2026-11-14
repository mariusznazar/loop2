FAIL 6cb19fb6b90b97ecbfb636a5c46efd7d441aa460

# Reading of what the review of the whole change left unread (correction for remark 5), task cycle `serwer-odczyty-i-straznik`

Reviewer: a fresh reviewer, who did not make the change and did not write the review of the whole change. Worktree `the root of the worktree`, `git rev-parse HEAD` = `6cb19fb6b90b97ecbfb636a5c46efd7d441aa460` (the head the handoff gives). Range: `f0814d77..6cb19fb6`. Read-only; I changed no file but this report, made no commit, ran no `npm test`.

Counts: blocking 1 (Important), Minor 2, out of scope 0.

## Result per decision

| Decision | Result |
|---|---|
| D-15 (recovery when a deployment goes wrong) | No contradiction. Relied on, see below. |
| D-82 (which documents supply test expectations) | No contradiction in the wording; one Minor (finding M2) on requirements the new tests expect that no foundation entry holds. |
| D-85 (exemplars of the test levels) | No contradiction. |
| D-229 (SQLite access of the account and save server) | No contradiction in its own sentences; the change's reading of the database log (finding I1) touches what D-229's Rationale tells the reader to watch. |
| D-236 (how the consistent backup is made) | No contradiction. |
| D-347 (how an agent learns what went wrong in the game running in the browser) | No sentence of it is made false, but the change's reading of the game's log (finding I1) uses a search text the log never holds, which is the very thing D-347's last-but-one clause (what reaches the server's log, read by D-355) says an agent must know. |

## Findings

### Important (blocking, within the task)

**I1. The reading `loop2-app-log-sqlite-busy-lines` looks for a text that the game's log never writes, so its empty result cannot show that there was no busy failure; D-205's new remark carries it as if it could.**

Place: `foundations/environment_facts.md`, entry `loop2-app-log-sqlite-busy-lines` (the sentence and its *Source*); `foundations/decisions.md:3989-3991`, the added sentence of D-205's *Rationale* ("On 2026-11-14 neither the game's dump file on the server nor its one rotated copy held a line with `SQLITE_BUSY` ..."); D-205 *Based on* names the fact. The task asked for it (`docs/task-cycles/serwer-odczyty-i-straznik/task.md:37`, "linie `failure` z `SQLITE_BUSY` (D-205)").

What is wrong: what a failure line of the game holds is fixed by `src/server/log-line.ts:7-9` and `:33-44`: of an error it writes only `name` as `kind`, `code` and SQLite's number `errcode`, never the message. `SQLITE_BUSY` is only the name of the constant in `src/server/database.ts:197` (`const SQLITE_BUSY = 5;`), which the code compares with `errcode`. A busy failure of `node:sqlite` therefore reaches the log as `"kind":"Error","code":"ERR_SQLITE_ERROR","errcode":5`, and the text `SQLITE_BUSY` is on no line. The repository's own tests show the real shape: `tests/account-storage.test.mjs:2818-2828` and `:2884-2890` expect `kind: "Error"`, `code: "ERR_SQLITE_ERROR"` and a number in `errcode` (26 and 1811 there). So `grep -F -m 50 -- 'SQLITE_BUSY'` of the dump has no line it could ever match, whatever the server met; "no output" is the only result it can give. The reading has no positive control either (nothing shows the needle can match).

Why it matters: the fact itself is literally true, but the sentence added to D-205 sits beside "is to be looked at again on observed database write failures or unacceptable waits", and a reader, the next loop2 task included (the one that touches the backups and the server's entries again), takes "no line with `SQLITE_BUSY`" as "no busy failure seen". D-236's Rationale rests the one-step backup on the busy timeout of D-112 holding, so the reading is also the one a later check of "does the game meet busy errors beside the nightly backup" would reach for. An absence that is guaranteed is not evidence; this is the case "a fact whose result is fixed in advance".

Evidence: `src/server/log-line.ts`, `src/server/database.ts:197-206`, `tests/account-storage.test.mjs:2818-2828`, `tests/account-storage.test.mjs:2884-2890`. The skill's list already allows the right reading: `grep -F -m 50 -- '<fixed string>'` of the dump and `.1` (`.claude/skills/loop2-deploy/SKILL.md`, "Allowed, the failure record"), and `"errcode":5` is a fixed string.

Fix, either one: (a) read again with `grep -F -m 50 -- '"errcode":5' /var/log/loop2-app.log` and the same on `.1`, rename or re-word the fact for the number and keep the sentence of D-205 in step with it; or (b) keep the present fact but make the sentence of D-205 and the fact say what it cannot show (the text never stands in a failure line; the kind of line a busy failure leaves is `"errcode":5`), so nothing in the foundation reads it as a clean result. Note for the author: `tests/deploy/test_loop2_watch.py:44` builds a failure line with `"code":"SQLITE_BUSY"` which the server never writes; it was there before this change (commit `048264e1`), it only feeds the watcher's counting, and is left alone here (see Declined to judge).

### Minor

**M1. The skill still tells the reader to look for "a run at 03:17" in the backup log, while the log's stamps are UTC and the new fact shows the runs at 02:17.**

Place: `.claude/skills/loop2-deploy/references/backup_and_restore.md:89-92` and `:145` (and the same in `.agents/skills/...`); `foundations/environment_facts.md`, `loop2-backup-log-nightly-sends` ("written at about 02:17 UTC"); `deploy/loop2-backup:87` writes the stamps with `date -u`.
What: D-231 and the skill say the schedule runs at 03:17 by the server's clock; the log shows 02:17Z for each of 14 nights, so the server's clock is one hour ahead of UTC at present. The change rewrote the paragraph at line 89-92 (it added the sentence on the 26 hours) but left "finding a run at 03:17 in the log the next morning", and the reader who follows it looks for a stamp the log does not hold, and may take a good night for a missing one. The foundation does not say what the server's time zone is (see Searches).
Why it matters little: the instruction is pre-existing and the reader sees the 02:17 line at once; it becomes wrong only through the new fact. Grade Minor.
Fix: say in those places "03:17 by the server's clock, which the log shows as 02:17 UTC in November" or name the stamp as UTC, and keep the time zone out of D-231.

**M2. The tests of the watcher's sixth kind expect behaviour that no entry of the foundation holds, which D-82 asks to be entered "in the same change".**

Place: `tests/deploy/test_loop2_watch.py` (`LOOK_ALIKES`, `TheBackupLogAsInput`, `test_a_log_that_never_gives_its_lines_is_cut_off_and_counts_as_no_send`, `test_a_log_far_longer_than_the_part_read_is_read_from_its_end`, `test_a_day_that_is_not_on_the_calendar...`); the reasons stand in the docstrings of those classes and in the header of `deploy/loop2-watch`.
What: D-233 and D-356 say the watcher raises the kind "when the log holds no successful send of a backup from the last 26 hours". The tests also fix that a line counts only when it is exactly the script's end line with a UTC stamp, that a stamp later than the run's clock or on a day that is not on the calendar counts for nothing, that only the last 2000 lines are read, each cut to 200 bytes, and that a log that cannot be read or not read within 60 seconds is "no send" and raises the kind. None of this is in a decision or an invariant; the foundation holds only the 26 hours and the once a day. D-82: "a requirement that only a document held has to be entered into the foundation before a test may expect it" and a comment that tells the code something the foundation does not is to be matched by an entry "in the same change". The task's own text (`task.md:31`, `:51`, `:105`) holds the 26 hours and the once a day, not these rules, so the source is the script's header, the author's own reasoning, not a document outside the foundation; D-82's *violates* clause (a comment naming a task document or a note) is not met.
Why Minor: the extra rules are hardening of "no successful send" at a trust boundary (the log is data written by `docker`, `age` and `flock`), no test expects a value that a document outside the foundation holds, and a reader can reach them from the test docstrings. The unreadable-log case is the one with a visible effect (the owner gets "no backup for over a day" for a log nobody could read), and it is worth one sentence.
Fix: one sentence in D-233 or D-356 naming what counts as a send (the exact end line, in the window, from the last lines) and that a log that cannot be read counts as none; or a sentence in the testing guidelines' row for `deploy/`.

## Where the change relies on each decision, and what I compared

- **D-15.** The change relies on it in the skill: `references/troubleshooting.md` ("A rollback deploys earlier code (D-15). The data does not move with it", schema version 5, "the data has no way back ... except a nightly backup made earlier, which the human's restore may bring back with everything after it lost") and in `SKILL.md` ("Rollback", the paragraph on version 5): all say that a rollback is a deployment of an earlier commit, restores code and never data, and that a restore is a human's separate procedure. The new text on the backup kind says it works only after a human reinstalls `loop2-watch` from the merge commit; that matches D-15's Rationale ("crossing a deployment-route change also requires the matching installed command") and the fact `loop2-host-installed-copies-agree` (installed copies equal their sources at `f0814d77`). The new D-11 sentence (the two marks 9 to 11 seconds apart) sits with D-15's order (images prepared first, containers replaced after) and `loop2-deploy-stage-exit-lines` (no exit 5 or 7 in the last 8000 lines; one fetch failure at exit 6, which is a stop before the containers). The monthly restore trial (D-234, `backup_and_restore.md:282-284`) is the owner's trial on his computer; it does not restore over the server, so "never the data of that time" is not touched. The watcher runs no Docker command that changes a container. No sentence of D-15 is made false.
- **D-82.** Comparison of the new tests (`tests/deploy/test_loop2_watch.py`, `test_loop2_watch_message.py`, `watch_script_support.py`) with it: expected values are written out in the test (`26 * HOUR`, `DAY`, the notices in `NOTICES`, `calendar.timegm` for the leap day) and not computed by the code under test; the cross-check `test_the_log_the_watcher_reads_is_the_one_the_backup_script_writes` compares two scripts' constants, a relation the watcher does not compute; the comments name decisions (D-233, D-356) and invariants, never a task document, a note or the record of a cycle (I grepped the added lines of `tests/`, `deploy/` and `guidelines/` for `task-cycles`, `.runs/`, `task.md`, "private note", "ticket": none). The four narrowed invariants' tests changed only their docstrings, and those name facts of the foundation (`loop2-containers-published-ports`, `mikrus-host-docker-workloads`). Only M2 above.
- **D-85.** The exemplars (`tests/sim/traits.test.mjs`, `tests/http.test.mjs`, `tests/invariants/test_account_server_occupied_address.py`) are unchanged in `guidelines/testing.md` (lines 353, 365, 377). The new watcher tests are of the integration and smoke levels with stand-ins for `docker`, `pusher`, `flock` and `date` (D-235) and the machine's own `tail`, `cut`, `tr`, `timeout` and a real named pipe; they carry controls in the manner of the smoke exemplar (the fresh default log, `test_all_the_look_alikes_beside_one_exact_line_do_not_hide_it`, the exact line beside the marker, a positive run of the real backup script's output). Nothing of D-85 is departed from; the testing guidelines' `deploy/` row counts the sixth kind (`guidelines/testing.md:181`, "każdy z sześciu rodzajów").
- **D-229.** The change reads no database and runs no `node:sqlite` command; the new allowed readings of the skill are `systemctl`, `ls`, `docker compose version` and `gh`. The skill's sentence that an agent never runs the backup command through `mikrus` is unchanged. D-229's own sentences (module, release check before deploy) are untouched and `loop2-deploy-stage-exit-lines` agrees with the release check (no exit 7). Reliance: D-205 and D-236 rest on D-229; see I1 for the one weak spot (the busy reading).
- **D-236.** Not touched. The change relies on it in `backup_and_restore.md` ("a consistent backup", the trial restores the file whole) and the fact `loop2-backup-log-nightly-sends` (a file of 90328 bytes each night, so no "size near 200 bytes" empty backup as the skill warns). The watcher counts the `end: sent` line only and neither opens a backup nor the database, which keeps D-236's "no restart to suffer" untouched. The monthly trial and the new "after each change of the schema version or of the saved game's version" fit the one-step backup: the trial restores the file, it does not test the `rate`, which D-237's build step does.
- **D-347.** The change relies on it through D-355 and D-356 (what the server writes, how an agent reads it). The skill's allowed readings of the dump (`grep -F -m 50`, bounded `tail`, `zgrep`, `ls -1` of names only, and the new `--event schedule` form of `gh run list`) stay inside "an agent reads the log with bounded commands through `mikrus`". The fact `loop2-app-log-password-reset-mail-events` quotes dump lines with the account number replaced, in keeping with D-252. No clause of D-347 (console, screen, chronicle, no outside service) is touched; the only trouble is I1: a reading of the game's log with a search text the log's line format (`kind`, `code`, `errcode`, `place`) never holds.

## Declined to judge

- `tests/deploy/test_loop2_watch.py:44` builds a failure line with `"kind":"SqliteError","code":"SQLITE_BUSY"`, a shape the server never writes. It is from commit `048264e1`, before this change, and only feeds the watcher's count of lines that begin as a failure object; outside this task.
- Whether the server's clock is CET and how the nightly gap behaves at the change of summer time (23 or 25 hours, inside the 26-hour limit; a lock wait of up to 900 s on a 25-hour gap still leaves 45 minutes): I checked the arithmetic only; the time zone is not established in the foundation.
- The content of the 14 environment facts' quoted outputs (the server's real state): not verifiable from the repository, and no tool of the server is allowed to me here.

## Checks I ran

- `git rev-parse HEAD` printed `6cb19fb6b90b97ecbfb636a5c46efd7d441aa460`, the head given.
- `git diff f0814d77 HEAD --stat`, and the diffs of `deploy/loop2-watch`, `foundations/invariants.md`, `foundations/environment_facts.md`, `.claude/skills/loop2-deploy/` (SKILL.md and both references), `guidelines/testing.md` (partly), `tests/deploy/test_loop2_watch.py`, `test_loop2_watch_message.py`, `watch_script_support.py`, and the hunk list of `foundations/decisions.md` (`git diff -U0`, then the hunks that bear on the six decisions): read.
- `python -B .the-way/elements/common/foundation_check.py`: exit 0, "0 errors".
- A manual check of the log format against the code: `src/server/log-line.ts`, `src/server/database.ts:190-215`, `tests/account-storage.test.mjs:2810-2835`, `:2880-2895`, `grep -rn "SQLITE\|errcode\|errstr" src/server`: the text `SQLITE_BUSY` stands only as a constant's name in `database.ts`.
- Not run: `npm test` and the slow tests (the handoff forbids it); no command on the server (no `mikrus` tools used; the readings of the facts were not repeated).

## Reaches beyond the dispatch (what, where, why)

- `foundations/decisions.md` D-205 (`:3975-4000`), D-112 (`:2195`), D-230, D-231, D-233, D-234, D-237, D-355, D-356: to see what each of the six rests on and what the change wrote into them.
- `src/server/log-line.ts`, `src/server/database.ts`, `tests/account-storage.test.mjs`: to settle the form of a busy failure line (I1).
- `deploy/loop2-backup`, `.claude/skills/loop2-deploy/references/backup_and_restore.md`: the time of the run and the log's stamps (M1).
- `docs/task-cycles/serwer-odczyty-i-straznik/task.md`, `reports/whole-change-review.md`, `reports/fix-report.md`, `reports/fix-review.md`: to see what the task asked and what earlier reviews already said about the busy fact (they judged its coverage, not its needle).
- `guidelines/testing.md`: only the lines named above (the exemplar lines, the `deploy/` row, the diff); not read whole, which the handoff did not ask for.

## Unread material

All six decisions were read whole, each from its heading to the next heading with its rationale and *Rejected*:

- D-15 (`foundations/decisions.md:391-410`): read whole.
- D-82 (`:1696-1712`): read whole.
- D-85 (`:1737-1752`): read whole.
- D-229 (`:4742-4771`): read whole.
- D-236 (`:5014-5043`): read whole.
- D-347 (`:8737-8797`): read whole (the heading to D-348's heading).

Not read whole, outside the six: `foundations/decisions.md` as a file (only the hunks and entries named above); `guidelines/testing.md` (lines named above only); the whole of the 14 new facts' quoted outputs I read, but their truth on the server I did not verify.

## Searches not found or unclear

- The server's time zone: looked for it in the foundation, the skill and `deploy/` (`grep` for `03:17`, `02:17`, `UTC`, `TZ`): not stated anywhere; the only evidence is the 02:17 UTC stamps of the backup log against "03:17 by the server's clock" (M1).
- A foundation entry for the watcher's rules of what counts as a send (exact line, window, unreadable log, bounded read): looked in D-233, D-356, the invariant `failure-watcher-message`, and the `deploy/` row of the testing guidelines: not found (M2).
- A real line of the game's log with a busy failure, or any line holding the text `SQLITE_BUSY`: not found in the repository (the text occurs only in `src/server/database.ts` as a constant's name, in D-205/D-229-area foundation text, and in the watcher test's crafted line); a real dump line I could not read (no server access allowed to me), so the form `"errcode":5` is concluded from the code and the tests, not from a reading of the dump.
- Whether the dump holds any `"errcode":5` line: unknown; that is what the corrected reading in I1 would show.
