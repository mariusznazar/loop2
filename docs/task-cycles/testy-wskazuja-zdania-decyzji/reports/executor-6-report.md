# Report — executor of slice 6 (database backup and restore decisions)

## Status

`done with concerns` — the work is complete and every check passed. The concern: 13 comment lines `decision: D-231` stand in five test files beyond the slice's *Change*. Eight of them sit at tests of invariants derived from other decisions (see "Choices"), and the orchestrator may want a reviewer to judge them.

## Commits and files

Range `e28cc12a1acd4f664fad34542810a9a7cdc96680..f28f53b7` on `task/testy-wskazuja-zdania-decyzji`, author `mariusznn@gmail.com` (the same as the earlier commits of the branch):

- `73b40e9c` test: :white_check_mark: mark the tests that hold the sentences of the decisions on the database backup, its schedule, where it runs, its encryption, its failure notice, the restore trial, the one-step backup and the send to Strych with lines decision:
- `f28f53b7` docs: :memo: name the tests of D-228, D-230, D-231, D-232, D-233, D-234, D-236 and D-238, rewrite their pair of examples for the part no invariant and no test holds, and drop the pair of D-229, which its invariants hold whole

| File | Added | Removed |
|---|---|---|
| `foundations/decisions.md` | 69 | 25 |
| `tests/account-backup.test.mjs` | 6 | 0 |
| `tests/account-database-check.test.mjs` | 1 | 0 |
| `tests/deploy/test_account_backup_stream.py` | 2 | 0 |
| `tests/deploy/test_loop2_backup.py` | 33 | 0 |
| `tests/deploy/test_loop2_watch.py` | 17 | 0 |
| `tests/deploy/test_loop2_watch_message.py` | 4 | 0 |
| `tests/deploy/test_restore_trial.py` | 6 | 0 |
| `tests/invariants/test_account_save_backup_encrypted.py` | 3 | 0 |
| `tests/invariants/test_account_save_backup_failure_notice.py` | 8 | 0 |
| `tests/deploy/test_loop2_deploy_build.py` (beyond *Change*) | 5 | 0 |
| `tests/invariants/test_loop2_host_sharing.py` (beyond *Change*) | 3 | 0 |
| `tests/invariants/test_loop2_container_isolation.py` (beyond *Change*) | 2 | 0 |
| `tests/invariants/test_loop2_one_serving_process_container.py` (beyond *Change*) | 1 | 0 |
| `tests/invariants/test_account_server_typecheck.py` (beyond *Change*) | 2 | 0 |

Every test change is one or more comment lines `decision:`; no code, name or assertion of a test changed, no comment or mention of a decision number was removed. In the log only the *Verification* fields of D-228, D-229, D-230, D-231, D-232, D-233, D-234, D-236 and D-238 changed; D-235 and D-360 stay as at the base.

Test files beyond the slice's *Change* (item 5 of "Work of every slice"), one line each:

- `tests/deploy/test_loop2_deploy_build.py` (deployment): five comparison tests hold D-231's comparison of the installed backup script and schedule.
- `tests/invariants/test_loop2_host_sharing.py` (deployment): the two-service test holds D-231's "no third Compose service"; the secrets and volume tests hold, in part, "the key to Mikrus Strych never enters the game container".
- `tests/invariants/test_loop2_container_isolation.py` (deployment): the same two parts of D-231, by its two-service assertion and by `volume_problems`.
- `tests/invariants/test_loop2_one_serving_process_container.py` (deployment): the two-service assertion, D-231.
- `tests/invariants/test_account_server_typecheck.py` (build-tools): the two-service assertion, and `test_backup_script_starts_no_image` (the script runs Docker only by `docker exec`), D-231.

None is a file of `browser-view`, so `guidelines/styleguide-browser-view.md` was not needed; the guidelines of these parts are `guidelines/coding.md` and `guidelines/testing.md`, both read whole.

## Checks

All run in the worktree, on the final tree (commit `f28f53b7`), one run each:

- `python -B .the-way/elements/common/foundation_check.py` — exit 0, `0 errors`; 11 decisions listed as held by nothing (D-181, D-182, D-184, D-185, D-186, D-188, D-215, D-216, D-217, D-218, D-220), none of D-228, D-229, D-230, D-231, D-232, D-233, D-234, D-235, D-236, D-238, D-360.
- Positive control of the check (own-work check): one quotation broken on purpose — exit 1, `1 error`; restored, then the run above.
- `npm test -- tests/deploy/test_loop2_backup.py` — exit 0 (28 s)
- `npm test -- tests/invariants/test_account_save_backup_encrypted.py` — exit 0 (14 s)
- `npm test -- tests/invariants/test_account_save_backup_failure_notice.py` — exit 0 (43 s)
- `npm test -- tests/deploy/test_loop2_watch_message.py` — exit 0 (49 s)
- `npm test -- tests/deploy/test_loop2_watch.py` — exit 0 (233 s)
- `npm test -- tests/deploy/test_loop2_deploy_build.py` — exit 0 (62 s)
- `npm test -- tests/invariants/test_loop2_host_sharing.py` — exit 0 (18 tests)
- `npm test -- tests/invariants/test_loop2_container_isolation.py` — exit 0 (3 tests)
- `npm test -- tests/invariants/test_loop2_one_serving_process_container.py` — exit 0
- `npm test -- tests/invariants/test_account_server_typecheck.py` — exit 0 (run after its second line was added)
- `npm test -- tests/account-backup.test.mjs` — exit 0, 10 tests, 10 pass, 0 skipped
- `npm test -- tests/account-database-check.test.mjs` — exit 0, 8 tests, 8 pass, 0 skipped
- `npm test -- tests/deploy/test_account_backup_stream.py` — exit 0, 1 test, run against a Docker daemon (the image came from Docker's build cache), not skipped
- `npm test -- tests/deploy/test_restore_trial.py` — exit 0, 19 tests in 46.9 s, the Docker run included, not skipped
- `node node_modules/prettier/bin/prettier.cjs --check --no-config --no-editorconfig --ignore-path .gitignore tests/account-backup.test.mjs` — exit 0
- `node node_modules/prettier/bin/prettier.cjs --check --no-config --no-editorconfig --ignore-path .gitignore tests/account-database-check.test.mjs` — exit 0
- `git diff -U0 e28cc12a -- foundations/decisions.md`, read: every changed line lies in the *Verification* field of D-228, D-229, D-230, D-231, D-232, D-233, D-234, D-236 or D-238.

Not run: the full gate `npm test` without a file — the cycle's run, not a slice's. The failures of `test_ruff_source_rules` and `test_shellcheck_source_rules` that the handoff reports at the base were not met, since `tests/quality/test_quality_invariants.py` was not run.

## Decisions, sentence by sentence

Sentences are numbered s1, s2, s3 in the order of the binding sentences. "Tests" gives `path:line` of the test case (its `def` or `test(` line after the change) and its name.

| Decision | Held in whole or in part by tests | Held by invariants | Held by nothing | *Verification* became |
|---|---|---|---|---|
| D-228 | s1 in part (completed, consistent; stored outside the host on Strych; restorable): `tests/account-backup.test.mjs:236` "a backup made beside a separate writer finishes, opens and holds everything committed before it started, a row only in the write-ahead log included"; `tests/deploy/test_account_backup_stream.py:54` `test_bytes_of_docker_exec_without_a_terminal_open_as_the_database`; `tests/invariants/test_account_save_backup_encrypted.py:114` `test_a_run_that_does_not_finish_the_encryption_sends_nothing` (only a completed backup leaves); `tests/deploy/test_loop2_backup.py:143` `test_rsync_is_called_once_with_one_file_to_one_computed_name_and_no_login`; `tests/deploy/test_restore_trial.py:371` `test_pass_fail_on_wrong_password_fail_on_absent_marker_and_interruption`. s2 in part ("Mikrus Strych is the destination"): `tests/deploy/test_loop2_backup.py:143` (same case). | none | s1: that a backup on Strych restores after the host is lost (the trial restores a file made in the test, not one fetched from Strych). s2: the condition — Strych only when it passes a capacity and restore check with the planned retained backups, otherwise another device outside the host. | `tests:` added; pair kept as at the base, since it speaks only of the condition of s2 |
| D-229 | none: s1 and s2 are what the invariants state, so no test gets a line (ruling R1) | s1 by `account-save-sqlite-access` (review); s2 by `account-save-sqlite-upgrade` (test) | none | pair removed; `invariants:` as it stood |
| D-230 | s1 in whole (a backup each night: the 03:17 daily schedule; seven stay: seven names over a week, no eighth): `tests/deploy/test_loop2_backup.py:302` `test_one_line_starts_the_installed_script_at_03_17_daily_as_root`; `:165` `test_seven_names_over_a_week_by_the_utc_date`. s2 in whole: `:165`; `:178` `test_a_day_of_no_weekday_file_is_refused`; `:143` `test_rsync_is_called_once_with_one_file_to_one_computed_name_and_no_login`; `:127` `test_rsync_replaces_one_file_whole_keeping_its_time`. s3 in part (no command deletes, nothing lists): `:135` `test_no_option_deletes_leaves_a_broken_file_or_lists`; `:143`; `:159` `test_no_tool_reaches_strych_but_the_one_rsync`. | none | s3: "Only the schedule a human installed or a human's hand run replaces a backup" | `tests:` added; pair rewritten for that part |
| D-231 | s1 in part: schedule at 03:17, `/usr/local/bin/loop2-backup` outside the checkout — `tests/deploy/test_loop2_backup.py:302`, `:312` `test_cron_can_read_the_file`; the command in the `loop2` container through `docker exec`, its standard output the backup — `:108` `test_docker_exec_gets_the_fixed_word_and_no_terminal`, `tests/deploy/test_account_backup_stream.py:54`, `tests/invariants/test_account_server_typecheck.py:315` `test_backup_script_starts_no_image`; no third Compose service — `tests/invariants/test_loop2_host_sharing.py:423` `test_service_sets_only_keys_that_grant_nothing`, `tests/invariants/test_loop2_container_isolation.py:67` `test_compose_names_its_own_project_service_and_container`, `tests/invariants/test_loop2_one_serving_process_container.py:175` `test_compose_runs_one_application_with_the_image_command`, `tests/invariants/test_account_server_typecheck.py:254` `test_compose_builds_the_image_and_names_none_to_pull`; the key to Strych never in the game container, as far as Compose secrets and mounts go — `tests/invariants/test_loop2_host_sharing.py:438` `test_runtime_secrets_are_granted_only_to_their_consumers`, `:445` `test_account_volume_is_owned_and_mounted_only_by_the_application`, `tests/invariants/test_loop2_container_isolation.py:85` `test_compose_shares_nothing_with_another_deployment`. s2 in part (existing file only; the fixed word; refusal before opening, nothing on standard output): `tests/account-backup.test.mjs:319` "without the one fixed word, or with anything else, the command refuses before it opens the database and prints nothing to standard output"; `:366` "a missing database file creates nothing and ends with its own code"; `tests/deploy/test_loop2_backup.py:108`. s3 in part (the lock, its wait, held over command and encryption, released before the send; the comparison at each deployment that only warns): `tests/deploy/test_loop2_backup.py:49` `test_the_lock_spans_the_pipe_and_ends_before_the_send`, `:64` `test_the_send_holds_no_descriptor_of_the_lock`, `:71` `test_the_lock_and_its_wait_are_the_deployments`; `tests/deploy/test_loop2_deploy_build.py:58` `test_installed_copy_equal_to_the_source_gives_no_warning`, `:85` `test_commit_without_the_sources_warns_for_each_pair_then_fails_the_build_with_7`, `:108` `test_each_new_pair_differing_warns_once_and_continues`, `:144` `test_unreadable_installed_copy_warns_for_that_pair_only_and_continues`, `:162` `test_all_six_differing_warn_six_times`. | none | s1: installed by hand; no timer in the game server. s2: run only by a human or the installed backup script. s3: installing or reinstalling being a human's change. | `tests:` added; pair rewritten for those parts |
| D-232 | s1 in part beyond the invariant (by `age --encrypt` in the script's pipe, the identity file `/etc/loop2/backup-encryption-key`): `tests/invariants/test_account_save_backup_encrypted.py:127` `test_control_a_whole_run_sends_exactly_the_file_age_wrote`; `tests/deploy/test_loop2_backup.py:203` `test_the_constants_name_the_design_s_own_files`. s2 in part (the plain database reaches nothing but `age`; not compressed — `age` reads the stream as it came, the file sent is the one `age` wrote): `tests/invariants/test_account_save_backup_encrypted.py:127`; `tests/deploy/test_loop2_backup.py:248` `test_the_marker_of_the_database_reaches_nothing_but_age`. | s1: no backup leaves the host unencrypted, `account-save-backup-encrypted` | s2: the plain database on no disk file of the host (the tests see the log, outputs, notice, arguments, the sent file and the temporary root, not every path of the host); s1: the key kept out of the game container (as D-13) | `tests:` added; pair rewritten for that part |
| D-233 | s1 in whole beyond the invariant (once, also when `pusher` fails or hangs; fixed subject and text, the same for every failure; no tool's output, no step's name, nothing of the database): `tests/invariants/test_account_save_backup_failure_notice.py:203` `test_each_failed_end_calls_pusher_once_with_the_one_fixed_notice`, `:231` `test_a_reader_that_leaves_before_the_size_ends_the_run_with_one_notice`, `:270` `test_a_failing_pusher_is_logged_and_called_once`, `:281` `test_a_hanging_pusher_ends_the_run`; `tests/deploy/test_loop2_backup.py:116` `test_pusher_gets_the_polish_notice_as_these_bytes`, `:248`, `:266` `test_a_refused_login_reaches_no_file_and_the_log_keeps_stage_code_and_size`. s2 in part (reads `/var/log/loop2-backup.log`; no exact sent line from the last 26 hours, a missing, empty or unreadable log as none; its own kind; the same limits on content; once in 24 hours): `tests/deploy/test_loop2_watch.py:115` `test_each_kind_calls_pusher_once_with_its_own_fixed_notice`, `:136` `test_the_six_notices_differ_and_none_is_the_backup_scripts`, `:480` `test_a_send_26_hours_old_or_less_counts_and_one_second_older_does_not`, `:491` `test_a_missing_empty_or_unreadable_log_counts_as_no_send`, `:503` `test_a_log_that_never_gives_its_lines_is_cut_off_and_counts_as_no_send`, `:515` `test_the_kind_is_sent_once_and_then_held_for_24_hours`, `:677` `test_a_line_that_is_not_exactly_the_end_of_a_sent_night_counts_for_nothing`, `:686` `test_all_the_look_alikes_beside_one_exact_line_do_not_hide_it`, `:696` `test_a_send_older_than_the_limit_beside_many_newer_failed_nights_counts_for_nothing`, `:705` `test_a_day_that_is_not_on_the_calendar_does_not_count_and_a_leap_day_does`, `:716` `test_a_log_far_longer_than_the_part_read_is_read_from_its_end`, `:731` `test_a_line_of_millions_of_bytes_neither_counts_nor_stops_the_reading`, `:741` `test_a_last_line_with_no_newline_counts_when_it_is_exact`, `:767` `test_the_end_of_a_night_that_the_backup_script_sent_counts_for_26_hours`, `:782` `test_a_night_whose_send_failed_does_not_count`, `:1298` `test_the_constants_name_the_design_s_own_files_and_containers`, `:1309` `test_the_log_the_watcher_reads_is_the_one_the_backup_script_writes`; `tests/deploy/test_loop2_watch_message.py:142` `test_each_kind_sends_its_fixed_notice_and_nothing_a_tool_printed`, `:185` `test_the_log_of_the_backup_is_read_and_a_marker_beside_the_exact_line_reaches_nothing`, `:201` `test_all_six_kinds_in_one_run_send_six_fixed_notices_and_nothing_else`, `:222` `test_the_subject_is_one_word_a_url_path_takes_and_no_two_notices_are_alike`. s3 in whole: `tests/deploy/test_loop2_backup.py:90` `test_the_weekday_file_and_the_size_stand_in_the_log_before_rsync_starts`, `:203`, `:227` `test_a_whole_run_logs_its_start_its_end_the_weekday_file_and_the_size`, `:238` `test_a_failed_run_logs_its_start_its_end_its_stage_and_the_exit_code`, `:248`, `:266`; `tests/invariants/test_account_save_backup_failure_notice.py:203`, `:231`, `:245` `test_a_signal_with_a_trap_is_named_by_its_exit_code_in_the_log_too`, `:256` `test_the_line_that_meets_a_gone_reader_stands_in_the_log`; `tests/account-backup.test.mjs:407` "a failed backup adds the error's kind and code to standard error, and nothing of its text". | s1: every failed step ends in a call of `pusher`, `account-save-backup-failure-notice` | s2: "a host that is down sends no message, and delivery depends on push.mikr.us" | `tests:` added; pair rewritten for that part |
| D-234 | s1 in part (a backup run in an image of the same working tree; a login with a test account; the saved game state seen back by a name given before the backup; the trial's copy of the plain database in Docker removed, no pass until Docker shows it gone): `tests/deploy/test_restore_trial.py:371` `test_pass_fail_on_wrong_password_fail_on_absent_marker_and_interruption`, `:208` `test_a_daemon_gone_at_the_cleanup_is_exit_4_naming_what_was_made`, `:213` `test_a_listing_that_failed_shows_nothing_gone_though_each_removal_exited_0`, `:218` `test_a_removal_that_failed_shows_nothing_gone_though_the_listings_are_empty`, `:223` `test_a_volume_docker_still_lists_is_named_and_the_container_it_removed_is_not` | none | s1: repeated every month and after each change of schema or saved-game version; fetched from the destination and decrypted; the decrypted file removed from the computer. s2 whole. | `tests:` added; pair rewritten for those parts |
| D-235 | none: the seam's guard in `tests/deploy/backup_script_support.py` keeps every run off the real tools, but it is helper code, not a test case, and no case asserts that a test reaches neither Strych nor `pusher` | none | s1, s2 | unchanged |
| D-236 | s1 in part (through `backup()` of `node:sqlite`, for the database code the command and the release check share; whole, in one step, on a database the default rate backs up in many; the command's backup made beside a writer finishing whole): `tests/account-backup.test.mjs:294` "a backup takes one step, where the default rate takes many on the same database", `:236`; `tests/account-database-check.test.mjs:92` "the check passes under the pass-through stand-in, which it reached" | none | s1: "on the connection it opens"; a `rate` above any page count the database can reach (only one 9 MB database is tried) | `tests:` added; pair rewritten for that part |
| D-238 | s1 in whole (by one `rsync` over `ssh`, into the home directory of `strych.mikr.us`; batch mode, strict host-key checking, the one known-hosts file on the command line): `tests/deploy/test_loop2_backup.py:143`, `:159`, `:188` `test_the_host_key_options_stand`, `:203` | none | s2: root's and the system-wide SSH configuration setting neither `KnownHostsCommand` nor `VerifyHostKeyDNS`, and the script not giving them (the test reads only the options it names); s3 whole | `tests:` added; pair rewritten for those parts |
| D-360 | none (no test reads the restore procedure; `tests/agent_workflow/test_loop2_deploy_skill.py` checks the skill's files for addresses and names only) | none | s1, s2 | unchanged |

## Pairs added or rewritten — for the human to accept at the merge

D-229 lost its pair; D-228 keeps its pair word for word. The rewritten pairs:

- D-230
  - complies: the backup script started only by the schedule a human installed and by a human's hand run
  - violates: a deployment, a workflow or the game server that runs the backup script or writes a file under one of the seven weekday names
- D-231
  - complies: a backup script installed by a human at `/usr/local/bin/loop2-backup`, with its schedule under `/etc/cron.d/` by a file name with no dot; the backup command run only by a human or by the installed backup script
  - violates: a timer in the server's process that makes or sends a backup; a deployment that installs or reinstalls the script or the schedule; a schedule installed under a file name with a dot; a skill instruction in which an agent runs the command, through the `mikrus` MCP server or otherwise
- D-232
  - complies: the backup command's stream piped straight into `age`, whose output is the only file the script writes
  - violates: a plain database file written anywhere on the host's disk on its way to the encryption, such as a copy fetched by `docker cp` before `age` reads it; the backup encrypted inside the game container, with the key handed into it
- D-233
  - complies: a watcher and a backup script that run on the game server's host and tell the owner only through `pusher`, so that a host that is down sends no message
  - violates: a second way of telling the owner of a missing backup beside `pusher`, such as a signal to an outside service that alarms when it stays away
- D-234
  - complies: the owner repeats the trial the month after and after the next change of the database's schema version or of the saved game's version, on a backup fetched from Strych and decrypted on the owner's computer, and removes the decrypted file at its end
  - violates: an agent that fetches, decrypts or opens a backup; a change of the database's schema version or of the saved game's version taken as covered by a trial made before it; a decrypted backup left on the owner's computer after the trial; a restore over the server's database, or the building of a new server, taken as checked by the trial
- D-236
  - complies: a positive whole `rate` above the largest page count a database of this server can reach, with the backup taken on the connection the command opened
  - violates: a `rate` above the page count of the tested database that a database of this server can still exceed; a backup taken through a second connection opened beside the command's own
- D-238
  - complies: root's SSH entry for Strych holding only the login and the path of the key; a host-key line written into the file by a human after comparing its fingerprint
  - violates: a line taken into the file without its fingerprint compared; a script that writes to the file; `KnownHostsCommand` or `VerifyHostKeyDNS` given on the send's command line, or set by an installation procedure in root's SSH configuration or the system-wide one

## Choices, with the way rejected

- **Lines at tests of invariants derived from other decisions.** The two-service assertions (tests of `loop2-host-sharing`, `loop2-container-isolation`, `loop2-one-serving-process`, `account-server-typecheck`) and the secret and volume checks fail if a backup service or a grant of the key to Strych enters `compose.yaml`, so they hold parts of D-231 s1 and carry a line; R1 forbids only lines for what the invariant derived from the same decision states. Rejected: leaving them out as tests "about something else" — the sentence would then look held by nothing in those parts. Cost if wrong: eight comment lines in four files that a reviewer judges to be mentions; removing them changes nothing else.
- **Lines at the watcher's tests of `failure-watcher-message` (derived from D-356) for D-233 s2.** The same reasoning: that invariant derives from D-356, not D-233. The tests of the watcher's other kinds, its lock, window and budget got no D-233 line; `test_the_kind_counts_in_the_budget_and_stands_after_failures_and_before_browser`, `test_a_first_run_and_a_damaged_state_do_not_evaluate_it` and `test_a_deployment_lock_held_at_the_first_look_ends_the_run_and_at_the_second_drops_it` hold rules of D-356 (budget, window, lock) that D-233 does not state, and were left for slice 7.
- **D-236 line at the release check's pass-through test.** The check and the command share `AccountDatabase.backupTo`; the stand-in replaces `backup` of `node:sqlite` in `dist/server/database.js`, so the test fails if that method stops calling `backup()`. It does not see the command itself switching method, so the clause says "the backup of the server's database code". Rejected: no line, leaving "through `backup()`" held by nothing while a test does hold it for the shared code. The two-steps and refused-rate cases of the check stay D-237's alone.
- **D-228 pair kept word for word.** It speaks only of the condition of s2 (Strych when it passes, else another device), which nothing holds. Its second "violates" names a backup left only on the host; that is the case s2 answers when Strych fails, so it stays.
- **D-229 pair removed.** Both sentences are what `account-save-sqlite-access` and `account-save-sqlite-upgrade` state; the first is checked by review, which is still an invariant holding it (the template's "no invariant and no test holds"). Cost if wrong: an agent comparing a change loses the example of an external driver among the dependencies; the invariant's own sentence names it.
- **Quotations.** Each quotation runs from the start of the sentence to the end of the part the test holds; where a test holds a part in the middle of a long sentence (D-231 s1, D-233 s2), the quotation runs on to that part, as earlier slices did for D-13.
- Of the cases of `tests/deploy/test_loop2_backup.py` left without a line: `test_the_stream_is_short_enough_for_a_deployment_to_wait_it_out`, `test_an_unreadable_key_stops_the_run_before_the_lock`, `test_an_argument_is_refused_before_anything_runs`, `test_both_time_limits_of_the_send_are_asked_for`, `test_the_text_of_docker_age_and_flock_goes_to_the_log_alone` and `test_mail_is_off_before_the_schedule_line` hold no sentence of these decisions beyond what an invariant states (the key and argument cases end in `pusher`, the invariant's part). Of `tests/account-backup.test.mjs`: the cleanup-failure, uncaught, reader-gone and "no SQL" cases cite D-233, D-354, D-253 or nothing of these decisions' sentences; the D-233 in the comment of the cleanup-failure case is a mention only and stays as it is. Of `tests/deploy/test_restore_trial.py`: the refusals without Docker, the password reading, the retry case and the positive control of the cleanup hold no sentence of D-234.

## Own-work check

- Requirement most likely missed: "every test that holds a sentence carries a line" — a test holding a sentence while citing nothing, outside the files of the *Change*. Check: a search of `tests/` for the content of the sentences — `loop2-backup`, `account-backup`, `pusher`, `backupTo`, `restore-trial`, `/run/loop2-deploy.lock`, `KnownHostsCommand`, `strych`, `26 hours`, the two-service set `{"app", "cloudflared"}` and `EXPECTED_SERVICES`, `GUARD`/`NEVER_CALLED`. It showed the five files beyond the *Change* above, and, after the first commit was prepared, `test_backup_script_starts_no_image` in `tests/invariants/test_account_server_typecheck.py`, which got its line before the commit. `tests/quality/test_quality_invariants.py` names the script only for ShellCheck; `tests/deploy/test_loop2_deploy_dump.py`, `test_loop2_deploy_switch.py` and `test_loop2_log_storage.py` name the two services of a compose call or a logrotate file, not the set of services, so they got no line.
- Requirement: every quotation stands in its sentence. Check: the foundation check reads each line `decision:`; a positive control broke one quotation in `tests/deploy/test_loop2_watch.py` (`its own kind` to `its OWN kind`): `python -B .the-way/elements/common/foundation_check.py` exit 1, `tests/deploy/test_loop2_watch.py:116: the quotation stands in no binding sentence of D-233`, `1 error`; the file was restored from a copy and the check run again (see Checks).
- Requirement: nothing of the log changes outside the *Verification* fields of the slice's decisions. Check: `git diff -U0 e28cc12a -- foundations/decisions.md`, its hunks start at 4780 (D-228), 4810 (D-229), 4837 (D-230), 4881 (D-231), 4933 (D-232), 4977 (D-233), 5022 (D-234), 5082 (D-236), 5155 (D-238), each the line `- **Verification:**` of that entry and the pair under it, and nothing else.

## Remarks on the log's wording against the code (R3) — nothing changed

- D-229 s1 says "Node.js 24's built-in `node:sqlite`"; its invariant `account-save-sqlite-access` says "Node.js's built-in". The version is the runtime's (D-02); no difference in what the code does.
- D-236 s1 binds "the backup command of D-231", while the one-step method lives in `AccountDatabase.backupTo`, which the release check of D-237 shares; a test of the method is a test of both, and nothing tests that the command keeps using it.
- D-234 s1 says "the same commit run on it"; the launcher runs the image the owner names by `--image`, and nothing checks that it is of the backup's commit — the owner's part, as written.

## Reaches beyond the dispatch

- `deploy/loop2-backup` whole, `tests/deploy/backup_script_support.py` whole, `src/server/account-backup.ts` whole, `src/server/account-database-check.ts` whole, `tests/account-database-check-standin.mjs` whole, `src/server/database.ts:186-199` and `:824-840` (the `rate` and `backupTo`), the head of `scripts/restore-trial.mjs` (lines 1-80): to judge what each test would fail on.
- `tests/deploy/test_loop2_deploy_build.py:1-180`, `tests/invariants/test_loop2_host_sharing.py:200-278`, `:410-446`, `tests/invariants/test_loop2_container_isolation.py:60-99`, `tests/invariants/test_loop2_one_serving_process_container.py:172-183`, `tests/invariants/test_account_server_typecheck.py:73-90`, `:250-326`: candidate tests found by content outside the *Change*.
- `.runs/task-cycles/testy-wskazuja-zdania-decyzji/plan.md:1-16` and the slice headings of the plan (by search): to see which slice holds D-356 (slice 7), so that no D-356 line was added.
- The diff `60cd36c8..e28cc12a` of slice 5: the form of lines and fields, as the handoff asks.

## Working copies

`.runs/executor-6/` under the worktree held the insertion scripts (`insert_lines.py`, `insert_lines_rest.py`), the test runner (`run_tests.sh`), the outputs of the foundation check (`fc.txt`, `fc2.txt`), a list of the new lines (`lines.txt`) and the logs of the focused runs (`tests/`). A copy of `tests/deploy/test_loop2_watch.py` for the positive control was removed right after it. The whole directory `.runs/executor-6/` was removed after the runs (`rm -rf`); `git status` is clean. Nothing of it is kept beside the report: the test results stand in "Checks" above.

## Unread material

none — every passage of the *Read* was read whole: the plan's "Work of every slice", the task's passages, the template's sections (read 105-269), `.the-way/elements/decisions/skill/SKILL.md` whole, `guidelines/testing.md`, `guidelines/coding.md`, `foundations/part_map.md`, `foundations/glossary.md`, the entries D-228 to D-238, D-360, D-73, D-82 and the four invariants. `.the-way/task-cycle/change/SKILL.md` and `slice.md` read whole.

## Searches not found or unclear

- A test of the restore procedure of D-360 (sessions kept, the step that asks to reset again): none found; `tests/agent_workflow/` reads the deploy skill's files only for addresses and names.
- A test that a deployment never installs the backup script or schedule (D-231 s3, its last clause): none found.
- A test that the send's command line gives no `KnownHostsCommand` or `VerifyHostKeyDNS` (D-238 s2): `test_the_host_key_options_stand` reads only the options it names; none found.
- The handoff's base fact "23 decisions `listed: … held by nothing`": I did not run the check on this slice's base, so I cannot say which earlier slice lowered the count; after the slice the check lists 11 (D-181, D-182, D-184, D-185, D-186, D-188, D-215, D-216, D-217, D-218, D-220), none of them this slice's.
