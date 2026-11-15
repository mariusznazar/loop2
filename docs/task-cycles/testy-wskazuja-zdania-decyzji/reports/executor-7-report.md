# Report — executor of slice 7 (failure handling, logs and local start decisions)

**Status:** done with concerns. The concerns are remarks for the human, listed below; no check failed.

## Commits

Range `f28f53b7b74f785b010dff693dbda71a40abd8fd..174a3eff`, author `mariusznn@gmail.com` (the same as the earlier commits of the branch):

- `bf44fc68` test: :white_check_mark: mark the tests that hold the sentences of the decisions on last-resort handlers, the local start, the error nothing handled, the service command's sentence, the log of the running game and the failure watcher with lines decision:
- `174a3eff` docs: :memo: name the tests of D-253, D-255, D-256, D-257, D-258, D-323, D-347, D-354, D-355 and D-356, and rewrite their pair of examples for the part no invariant and no test holds

## Files changed (added / removed lines)

| File | + | − | In the slice's *Change* |
|---|---|---|---|
| `foundations/decisions.md` | 54 | 43 | yes |
| `tests/view/uncaught-failure.test.mjs` | 33 | 0 | yes |
| `tests/startup.test.mjs` | 1 | 0 | yes |
| `tests/account-backup.test.mjs` | 4 | 0 | yes |
| `tests/deploy/test_loop2_deploy_dump.py` | 3 | 0 | yes |
| `tests/deploy/test_loop2_log_storage.py` | 4 | 0 | yes |
| `tests/deploy/test_check_address_workflow.py` | 7 | 0 | yes |
| `tests/invariants/test_local_start_access.py` | 11 | 0 | yes |
| `tests/view/state-store.test.mjs` | 1 | 0 | no (item 5) |
| `tests/account-api.test.mjs` | 1 | 0 | no (item 5) |
| `tests/account-storage.test.mjs` | 4 | 0 | no (item 5) |
| `tests/http.test.mjs` | 6 | 0 | no (item 5) |
| `tests/deploy/test_loop2_watch.py` | 62 | 0 | no (item 5) |
| `tests/deploy/test_loop2_watch_message.py` | 7 | 0 | no (item 5) |

Files beyond the *Change* (item 5 of "Work of every slice"), one line each:

- `tests/view/state-store.test.mjs` — part `browser-view`; its guideline `guidelines/styleguide-browser-view.md` read (see Unread material); focused test run.
- `tests/account-api.test.mjs` — part `browser-view`; same guideline; focused test run.
- `tests/account-storage.test.mjs` — part `account-server`; no guideline beyond coding and testing; focused test run.
- `tests/http.test.mjs` — part `account-server`; focused test run.
- `tests/deploy/test_loop2_watch.py` — part `deployment`; focused test run.
- `tests/deploy/test_loop2_watch_message.py` — part `deployment`; focused test run.

No test's code, name or assertion changed; only comment lines `decision:` were added, each inside the test's body after its leading `invariant:` / `decision:` lines, as the earlier slices place them. Every mention of a decision number stays where it was. In the log only the *Verification* fields of the ten decisions changed.

## Checks run (command and exit code)

- `python -B .the-way/elements/common/foundation_check.py` — exit 0, `0 errors`; none of D-253, D-255, D-256, D-257, D-258, D-323, D-347, D-354, D-355, D-356 listed; 11 decisions listed `held by nothing`, all of other slices (D-181 … D-220). The handoff's base fact says 23; the drop to 11 comes from slice 3's pairs for D-73 … D-89, not from this slice.
- Control of that check: one quotation in `tests/deploy/test_loop2_log_storage.py` changed for a moment to `"`logrotate` rotates the files"`; the check then exited 1 with `tests/deploy/test_loop2_log_storage.py:99: the quotation stands in no binding sentence of `D-355``; file restored byte for byte from a copy, check run again on the final tree: exit 0 (above).
- `node node_modules/prettier/bin/prettier.cjs --check --no-config --no-editorconfig --ignore-path .gitignore tests/view/uncaught-failure.test.mjs tests/view/state-store.test.mjs tests/account-api.test.mjs tests/startup.test.mjs tests/account-backup.test.mjs tests/account-storage.test.mjs tests/http.test.mjs` — exit 0.
- `git diff -U0 f28f53b7b74f785b010dff693dbda71a40abd8fd -- foundations/decisions.md`, read: 10 hunks, each inside the *Verification* field of one of the ten decisions; no heading, binding sentence, *Scope*, *Based on*, *Relations*, *Origin*, *Rationale* or *Rejected* touched.
- `npm test -- <file>`, one run per file, all exit 0:
  - `tests/view/uncaught-failure.test.mjs` — exit 0 (17 tests, 17 pass)
  - `tests/view/state-store.test.mjs` — exit 0 (12 / 12)
  - `tests/account-api.test.mjs` — exit 0 (32 / 32)
  - `tests/startup.test.mjs` — exit 0 (18 / 18)
  - `tests/account-backup.test.mjs` — exit 0 (10 / 10)
  - `tests/account-storage.test.mjs` — exit 0 (82 / 82)
  - `tests/http.test.mjs` — exit 0 (95 / 95)
  - `tests/deploy/test_loop2_deploy_dump.py` — exit 0 (Ran 9, OK)
  - `tests/deploy/test_loop2_log_storage.py` — exit 0 (Ran 4, OK)
  - `tests/deploy/test_check_address_workflow.py` — exit 0 (Ran 17, OK)
  - `tests/invariants/test_local_start_access.py` — exit 0 (Ran 21, OK)
  - `tests/deploy/test_loop2_watch.py` — exit 0 (Ran 99, OK, none skipped)
  - `tests/deploy/test_loop2_watch_message.py` — exit 0 (Ran 9, OK, none skipped)
- Not run: the full gate (`npm test` with no file), which the method leaves to the cycle. `test_ruff_source_rules` and `test_shellcheck_source_rules` were not run; the handoff reports them failing at the base with `FileNotFoundError`.

No test was written first and no invariant test was changed, so there are no runs seen failing to report.

## Own-work check (section 3)

- **Requirement most likely missed:** "every test that holds one of its binding sentences carries a line `decision:`" (plan, *Goal*; task, To do 2), for tests found by content and not by number.
- **Check:** a search of `tests/` by the content of the sentences, not by number: `git grep -l -e "Coś w grze" -e "installLastResort" -e '"uncaught"' -e "halt()" -e "LIMITED" -e "loop2-app" -e "check-address" -e "local-start" -e "local:stop" -e "account-backup.js" -- tests`, and every file found that this slice did not change was read where it matched.
- **Result:** 24 files. Those this slice did not change hold no sentence of these decisions:
  - `tests/account-database-check-standin.mjs`, `tests/deploy/deploy_script_support.py`, `tests/deploy/test_account_backup_stream.py`, `tests/deploy/test_loop2_backup.py`, `tests/deploy/test_restore_trial.py`, `tests/password-measurement.test.mjs`, `tests/invariants/test_loop2_application_port.py`: helpers, or other decisions;
  - `tests/view/page-document.test.mjs`: tests the harness, not the page's handler;
  - `tests/invariants/test_account_server_typecheck.py`: another invariant;
  - `tests/deploy/test_loop2_deploy_build.py`: judged in the "Searches" section;
  - `tests/view/end-question.test.mjs`, `tests/view/end-window-game.test.mjs`: judged in the "Mentions" section below.

## Rows of the decisions (item 6)

Paths and lines are at `174a3eff`. The line given is the test's declaration, `test(` or `def test_…`, as a listing of the slice's diff gave it; S1, S2, S3 are the binding sentences in order.

### D-253 — last-resort handlers

- **Held whole by tests:**
  - S1 "Each process that touches the data of accounts …":
    - `tests/startup.test.mjs:613` "${origin} no code of the server handled ends it with one line of its kind, code and place" (two cases);
    - `tests/account-storage.test.mjs:2836` "what no code of the owner's command handled …";
    - `tests/account-storage.test.mjs:3106` "what no code of the previous-save command handled …";
    - `tests/account-backup.test.mjs:505` "what no code of the command handled ends it with one line …".
  - S2 "The page in the browser has one too …", by `tests/view/uncaught-failure.test.mjs`:
    - `:485` "an error and a rejection nothing handled are cancelled …";
    - `:534` "the same line is written once until the page is reloaded …".
- **Held in part by tests:**
  - S2, by `tests/view/uncaught-failure.test.mjs`:
    - `:569` "each distinct line goes to the account client once per page load …";
    - `:633` "a report the account client throws or refuses …";
    - `:910` "an error in the drawing of a root of the game reaches the page through the window";
    - `:978` "a card taken down on the page leaves the sentence alone …".
  - S3 "A script run by hand or by the test gate …": `tests/invariants/test_local_start_access.py:498` `test_stop_with_no_built_game_still_tells_every_start_and_leaves_the_missing_writer_once` (Node's default print of the stop command).
- **Held by invariants:** none.
- **Held by nothing:** S3 beyond the stop command of the local start: the other scripts that touch no account data, and the four named scripts keeping their own handling.
- ***Verification*:** clause `tests:` added; pair rewritten.

### D-255 — data an agent checks the game on

- **Held whole by tests:** none.
- **Held in part by tests:** S2 "One command of the repository starts the game locally over HTTPS":
  - `tests/invariants/test_local_start_access.py:357` `test_a_browser_signs_up_over_https_though_no_mail_can_leave`;
  - `:378` `test_the_certificate_holds_for_the_address_the_game_stands_at`.
- **Held by invariants:** `local-start-access` holds "locally" (127.0.0.1 alone) and the proxy headers.
- **Held by nothing:**
  - S1: a state built with functions of the simulation, sent by the ordinary save request to a local server with its own database; early states reached by playing;
  - S2's "a check touches neither the test server nor a player's save".
- ***Verification*:** clause `tests:` added. The pair stays word for word; only its lead-in changed to "An agent compares a change with the part no invariant and no test holds:".

### D-256 — the local start keeps no account

- **Held whole by tests:** S1, by `tests/invariants/test_local_start_access.py`:
  - `:388` `test_the_game_stands_at_a_port_of_its_own_at_each_of_two_starts_side_by_side`;
  - `:400` `test_a_start_removes_the_database_of_a_start_that_ended`;
  - `:417` `test_a_start_killed_from_outside_leaves_nothing_running_and_goes_at_the_next_start`;
  - `:431` `test_a_number_another_program_holds_keeps_no_directory_of_an_ended_start`;
  - `:447` `test_a_start_on_its_way_up_is_not_taken_for_ended`;
  - `:541` `test_no_environment_value_and_no_argument_leads_the_removal_elsewhere`.
- **Held by invariants:** none.
- **Held by nothing:** S2 "A person plays on the test server."
- ***Verification*:** clause `tests:` added; pair rewritten for S2.

### D-257 — mail at the local start

- **Held in part by tests:** S1 "At the local start the mail settings point at an address where nothing answers": `tests/invariants/test_local_start_access.py:357` `test_a_browser_signs_up_over_https_though_no_mail_can_leave` (registration answered within the mail deadline, message `failed`, address unconfirmed).
- **Held by invariants:** none.
- **Held by nothing:**
  - S1's "and the server stays as it is";
  - S2 "A person goes through the whole way with mail on the test server."
- ***Verification*:** clause `tests:` added; pair rewritten.

### D-258 — certificate at the local start

- **Held in part by tests:** "The local start makes its own certificate": `tests/invariants/test_local_start_access.py:378` `test_the_certificate_holds_for_the_address_the_game_stands_at`.
- **Held by invariants:** none.
- **Held by nothing:** "a person clicks through the browser's warning", and so that no authority is added to the trusted ones of the system.
- ***Verification*:** clause `tests:` added; pair rewritten.

### D-323 — error nothing handled

All lines below are in `tests/view/uncaught-failure.test.mjs` unless named.

- **Held whole by tests:**
  - S2 "Until the page is reloaded the sentence …":
    - `:659` on a game screen in the row under the menu bar …;
    - `:699` waiting screen, then card;
    - `:727` the card under the form, once;
    - `:784` after an error nothing handled no game is built …;
    - `:814` an error on the waiting screen before the first game …;
    - `:910` an error in the drawing of a root …;
    - `:944` a card that React takes down …;
    - `:978` a card taken down on the page leaves the sentence alone ….
  - S3 "The page writes the line of the error as D-253 gives it": `:485`, `:534`, `:910`, `:978`.
- **Held in part by tests (S1):**
  - saving goes on, with no new reading of the clock: `:357` "after an error nothing handled, in the clock's own reading, …", and `tests/view/state-store.test.mjs:353` "after halt() no result is taken, no act changes the state, and keep makes no reading";
  - no game built, a sign-in staying at the waiting screen, no catch-up: `:784` and `:814`.
- **Held by invariants:** `uncaught-failure-game-state` holds that the game state changes no more and that every save carries the state from before the error.
- **Held by nothing:**
  - the send of the state kept by D-211 not running after the error;
  - saving going on as D-207 and D-208 give it beyond the save at „Wyloguj”: the 30-second check of a change made before the error, and the retry of a failed save.
- ***Verification*:** clause `tests:` added; pair rewritten.

### D-347 — how an agent learns what went wrong

- **Held whole by tests:** S2 "An exception in the game shows on the screen as a sentence that something broke and goes to the console": `tests/view/uncaught-failure.test.mjs:910` and `:978` (screen and console).
- **Held in part by tests:** in the same file:
  - console part: `:485`, `:534`;
  - screen part: `:659`, `:699`, `:727`, `:784`, `:814`, `:944`.
- **Held by invariants:** none.
- **Held by nothing:** S1, that the agent learns from the screen, the chronicle and the console of the browser it operates, with no outside service.
- ***Verification*:** clause `tests:` added; pair rewritten.

### D-354 — the sentence of a service command

- **Held whole by tests:** S1:
  - `tests/account-storage.test.mjs:2808` "a database failure of the owner's command adds …";
  - `tests/account-storage.test.mjs:3074` "a database failure of the previous-save command adds …";
  - `tests/account-backup.test.mjs:407` "a failed backup adds the error's kind and code to standard error …";
  - `tests/account-backup.test.mjs:458` "a whole backup whose temporary directory cannot be removed …".
- **Held in part by tests:** S2 "A failure of the command written as that line and followed by that sentence is one failure recorded once": `tests/account-backup.test.mjs:458` (one JSON line and one sentence, for `account-backup` only).
- **Held by invariants:** none.
- **Held by nothing:** S2 for `account-block` and `account-previous-save`.
- ***Verification*:** clause `tests:` added; pair rewritten.

### D-355 — the log of the running game

- **Held in part by tests:**
  - S1:
    - `tests/deploy/test_loop2_deploy_dump.py:87` `test_a_deployment_appends_the_log_of_the_containers_it_replaces` (the whole log of app and connector, no `--tail`);
    - `:202` `test_a_deployment_that_stops_before_up_dumps_nothing` and `:222` `test_a_commit_of_no_accepted_branch_dumps_nothing` ("just before" the replacement);
    - `tests/deploy/test_loop2_log_storage.py:73` `test_both_services_log_to_the_local_driver_and_no_other_option` and `:83` `test_no_other_logging_key_in_the_compose_file` (the `local` driver with its default rotation);
  - S2: `tests/deploy/test_loop2_log_storage.py:98` `test_one_stanza_for_the_dump_file` and `:106` `test_the_stanza_holds_exactly_the_directives_of_a3` (weekly or sooner, four generations).
- **Held by invariants:** `loop2-deploy-log-dump` holds the append before the new containers start, and the warning on a failed append, after which the deployment goes on.
- **Held by nothing:**
  - S2's "a human's run of `account-block` or of `account-previous-save` appends to the same file the JSON lines of the command, those only";
  - S3 whole: how an agent reads the log, and the human's steps.
- ***Verification*:** clause `tests:` added; pair rewritten.

### D-356 — how the owner learns of a failure

Bare line numbers below are in `tests/deploy/test_loop2_watch.py`; `message:` is `tests/deploy/test_loop2_watch_message.py`.

- **Held by invariants:**
  - `failure-watcher-message`: the fixed subject and text that say only which kind of trouble was found, with nothing of a player or a tool;
  - `browser-failure-report`: the route writing only a kind, code and place of the allowed form, with an `accountId` taken from the session.
- **Held in part by tests (S1, the watcher):**
  - cron every few minutes: `:1340` `test_one_line_starts_the_installed_script_every_five_minutes_as_root`, `:1349` `test_cron_can_read_the_file`;
  - state and health of the containers:
    - `:149`, `:157`, `:165`, `:171`, `:194`;
    - `:1170` `test_a_docker_that_never_answers_is_cut_off_and_read_as_down`;
    - `message:258` `test_docker_text_on_a_failed_reading_reaches_nothing`, `message:270` `test_an_inspect_that_succeeds_with_an_answer_off_the_shape_reaches_nothing`;
  - a restart: `:442`, `:455`, `:462`;
  - new failure lines of the game container's log:
    - `:210`, `:216`, `:223`, `:243`, `:253`, `:272`, `:300`, `:315`, `:337`;
    - `:1125` `test_every_docker_command_is_a_read_of_the_two_containers_in_one_fixed_form`;
    - `message:165` `test_the_marker_was_put_before_the_watcher_which_asked_for_the_reading`;
  - the lack of a successful backup send:
    - `:115`, `:230`, `:503`, `:515`, `:528`, `:574`;
    - `:707`, `:717`, `:728`, `:738`, `:750`, `:766`, `:777`, `:804`, `:820`, `:1358`, `:1370`;
    - `message:142`, `message:187`, `message:204`, `message:226`;
  - passes over the window of a deployment: `:586`, `:834`, `:848`, `:868`, `:895`, `:935`, `:965`;
  - limits the messages: `:541`, `:554`, `:1027`, `:1046`, `:1055`, `:1067`, `:1081`, `:1091`, `:1103`;
  - calls `pusher`, one call per message: `:1114` `test_one_pusher_call_goes_for_each_message_and_none_for_the_watcher_itself`.
- **Held in part by tests (S2):**
  - the scheduled workflow, in `tests/deploy/test_check_address_workflow.py`:
    - `:80` `test_triggers_are_the_schedule_and_the_manual_run_only`;
    - `:89` `test_schedule_runs_every_five_minutes_off_the_hour`;
    - `:151` `test_only_host_is_the_declared_public_address`;
    - `:222` `test_status_200_passes_at_once`;
    - `:229` `test_a_non_200_fails_after_six_attempts_twenty_seconds_apart`;
    - `:237` `test_a_non_200_then_200_passes_after_a_retry`;
    - `:250` `test_input_false_leaves_the_check_to_the_address`;
  - the page sending its report:
    - `tests/view/uncaught-failure.test.mjs:569` each distinct line goes to the account client …;
    - `tests/view/uncaught-failure.test.mjs:599` a card taken down on the page is reported once …;
    - `tests/account-api.test.mjs:1187` "reportBrowserFailure posts the three words as one JSON POST …";
  - the route writes each report: `tests/http.test.mjs:5221` "a report of the allowed form …", `:5256` "the words a browser writes …";
  - the route limits the reports: `tests/http.test.mjs:5571` "a policy is refused a browser report limit …";
  - the `LIMITED` line: `tests/http.test.mjs:5597` "over its limit the route answers 429 …", `:5649` "the hour is rolling …", `:5676` "from many addresses the server accepts 30 reports …";
  - the watcher counts the browser lines: `:115`, `:202`, `:223`, `:230` of `tests/deploy/test_loop2_watch.py`.
- **Held in part by tests (S3):** a `flock` that does not work ends with success, one line and nothing sent: `:868`, `:895`, `:985` of `tests/deploy/test_loop2_watch.py`.
- **Held by nothing:**
  - S2's notice of GitHub for a failed run;
  - S3's human installing the watcher and its schedule and setting GitHub's notifications;
  - the silences S3 accepts.
- ***Verification*:** clause `tests:` added; pair rewritten.

## Pairs added or rewritten, for the human to accept at the merge

- **D-253 (rewritten):**
  - complies: a script of the test gate that touches no account data ending on an uncaught error with the default print of Node.js or Python; `account-database-check`, `measure-passwords`, `deploy/loop2-backup` and `scripts/restore-trial.mjs` keeping the last-resort handling they have
  - violates: a handler of its own added to a script that touches no account data; a script that touches no account data catching what nothing handled and ending with nothing of it written
- **D-255 (unchanged words, new lead-in "the part no invariant and no test holds"):**
  - complies: a check on an account made through the form of a game started by the command; a game state holding the verbs of combat and a bought branch, built with functions of the simulation and sent by the save request of that account
  - violates: a check that signs in to the test server; a check that opens a copy of a player's save; a game state written straight into the database of the local start
- **D-256 (rewritten):**
  - complies: a person who asks where to play sent to the test server by the description of the local start
  - violates: a description of the local start, or a skill, that offers it to a person as a place to play
- **D-257 (rewritten):**
  - complies: the server of the local start running the same mail code as on the test server, only its settings pointing where nothing answers; confirming an address and setting a new password left to a person on the test server
  - violates: a branch of the server that switches mail off for the local start; a check at the local start that claims a message arrived
- **D-258 (rewritten):**
  - complies: a warning of the browser that a person clicks through at the local start's address
  - violates: a step that adds a certificate authority to the trusted ones of the system; an instruction to install another program for the certificate
- **D-323 (rewritten):**
  - complies: a state kept by D-211 before the error left unsent at a sign-in after it; a save that failed before the error tried again as D-208 gives it, with the state from before the error
  - violates: a sign-in after the error that sends the state kept by D-211; saving stopped at the error, so that a change made before it and not yet saved, or a save that failed, is never sent
- **D-347 (rewritten):**
  - complies: an agent checking a change at 16× through Playwright CLI reading under „Passa” in the chronicle why the streak fell, and reading in the console the line of an error no code handled (D-253)
  - violates: Sentry or GlitchTip added to the game
- **D-354 (rewritten):**
  - complies: a refusal of `account-block` or of `account-previous-save` leaving its sentence in the terminal; a failure of `account-block` or of `account-previous-save` written as one JSON line and one sentence
  - violates: a second JSON line written for the sentence of a failure of `account-block` or of `account-previous-save`; the sentence of such a failure removed as a second record of it
- **D-355 (rewritten):**
  - complies: an agent looking for a failure from before the last deployment with a `grep` of the file that limits its matches, through the `mikrus` MCP server; a human's run of `account-block` or of `account-previous-save` that appends only its JSON lines to the file
  - violates: the whole output of `account-block` or of `account-previous-save`, addresses included, appended to the file; an agent that appends to, edits or rotates the file, or reads it whole with no bound
- **D-356 (rewritten):**
  - complies: the watcher and its schedule installed on the server by a human, and the owner's notifications of GitHub set so that a failed run of the scheduled check sends a mail
  - violates: a deployment or a workflow that installs or changes the watcher or its schedule on the server; the step of the scheduled check given `continue-on-error`, so that a probe that fails leaves no failed run for GitHub to notify

Items of the old pairs that the rewrite dropped, for the human's attention:

- **D-356:** these items stand in no binding sentence, only in *Rationale* and *Rejected*, so R2 leaves them no place:
  - "a scheduled workflow that deploys, checks out the code or holds a secret";
  - "Sentry or GlitchTip added to the server";
  - "a watcher that takes the deployment lock for writing or runs a Docker command that changes a container";
  - "a route … that answers without the origin guards of D-104".

  Tests still guard most of these: `test_no_checkout_no_secret_no_ssh`, `test_it_deploys_nothing`, `test_the_lock_file_is_never_opened_for_writing_or_changed` and `test_the_commands_the_script_holds_are_only_these_two_reads`. Those tests carry no D-356 line because they hold no binding sentence of it.
- **D-253:** "a new command that opens the account database installing the handler before its work". S1 names the four processes only.

## Mentions of a decision number left without a line

These tests cite a number of a slice-7 decision and hold none of its sentences beyond what an invariant states. They keep their mention and get no line:

- `tests/view/uncaught-failure.test.mjs:429` "after an error nothing handled, an act of the player changes no state and starts no save" and `:449` "… the buttons of the screen Mapy …": the part of `uncaught-failure-game-state` only (R1).
- `tests/view/uncaught-failure.test.mjs:846` "a failure the game foresees keeps its own sentence alone …": tests that a handled failure does not show the sentence. No sentence of D-323 says "only after an error nothing handled", so it is no line.
- `tests/view/end-question.test.mjs:884` "after halt() the question changes nothing …": only the invariant's part.
- `tests/view/end-window-game.test.mjs:1145` "after halt() the window's buttons change nothing" and `tests/view/run-screen-state.test.mjs:204` "after halt the question, the window and the wait change nothing …": the state of a window or a question is no game state. D-323's sentences say nothing of it.
- `tests/view/end-window-game.test.mjs:993` (D-368, D-323, D-173): D-323 is only mentioned.
- `tests/transport.test.mjs:1139` "transport refuses the browser report …": D-110 and D-104, not a sentence of D-356.
- `tests/http.test.mjs` "the guards and the gate stand before the body of a report …" and "any other method of the report path …", and the `browser-failure-report` cases on the account, the body and the form: invariant only (R1).
- `tests/deploy/test_loop2_deploy_dump.py`, the failure cases `test_a_failing_dump_warns_and_the_deployment_still_starts_the_containers`, `test_a_dump_file_that_cannot_be_written_warns_and_the_deployment_goes_on` and `test_a_stuck_docker_is_cut_off_by_the_time_limit_and_the_deployment_goes_on`: the part `loop2-deploy-log-dump` states (R1).
- The invariant cases of `tests/invariants/test_local_start_access.py` (`test_no_proxy_header_of_a_browser_reaches_the_server`, `test_both_ports_listen_on_this_computer_alone`, `test_the_proxy_says_https_also_when_no_browser_header_came`): R1.

## Remarks on the log against the code (R3, nothing changed)

- **D-355:** the comments of `tests/deploy/test_loop2_log_storage.py:74`, `:83`, `:97` and `:104` cite "A2" and "A3", and the test's name `test_the_stanza_holds_exactly_the_directives_of_a3` names "a3". These look like labels of a document outside the foundation. D-82 forbids a test comment naming a document outside the foundation as a source. Left as they are: the slice changes no test's comment or name.
- **D-354:** S2 holds for all three commands, but only `account-backup`'s test asserts a single JSON line. The `account-block` and `account-previous-save` cases take the first JSON line without counting. This is a gap of the tests, not of the log's wording; the pair covers it.
- **D-323:** S1 says saving goes on "as D-207, D-208 and D-97 give it". The tests show only the save at „Wyloguj” (D-97) after the error, and the 30-second check sending nothing while nothing changes. A test of a change saved by the check, or a retry, after the error is missing. The pair covers it.

## Choices made

- **Placement:** each line stands inside the test's body, after its leading `invariant:` and `decision:` lines and before any other comment, as slices 1–6 placed theirs. In `tests/view/uncaught-failure.test.mjs`, `// invariant:` stands above `test(`, and the new line still goes inside the body. Rejected: above the `test(` call. Cost if wrong: a move of lines, with no meaning changed.
- **Quotations:** each runs from the start of the sentence to the end of the clause the test holds. For D-356 S2 that makes long lines (up to some 700 characters), because the browser report and the `LIMITED` line come late in one sentence. Rejected: quoting only the sentence's first words ("A GitHub Actions workflow whose schedule asks for a run every five minutes"), which at an HTTP test of the report route would point a reader at the wrong clause. Cost if wrong: long lines, which Prettier and the gate accept; checked above.
- **How the lines were written:** a script read the binding sentences from the log and cut each quotation from them, so that every quotation matches the log as written. The script stood in `.runs/executor-7/`.
- **Lines on D-233's tests:** the watcher tests of the backup kind already carried D-233 lines. They also got D-356 lines, because D-356 S1 names the reading of the backup log as one of the watcher's readings. Rejected: leaving them to D-233 alone, which would have shown D-356's backup clause as held by nothing. Cost: about 25 more long lines in `tests/deploy/test_loop2_watch.py` and `test_loop2_watch_message.py`.
- **Invariant tests (R1):** an invariant's test got a line only for a part its invariant does not state. Examples: `test_a_deployment_appends_the_log_of_the_containers_it_replaces` holds the whole log of both services and no `--tail`; the `LIMITED` cases of `tests/http.test.mjs` hold the limit and its line; the watcher message cases hold the readings.

## Reaches beyond the dispatch

- `tests/view/end-question.test.mjs:875-915`, `tests/view/end-window-game.test.mjs:985-1000, 1140-1155`, `tests/view/run-screen-state.test.mjs:198-240` and `tests/view/state-store.test.mjs:345-420`: tests citing D-323 by number, read to judge them.
- `tests/transport.test.mjs:185-200, 1136-1197`: cites D-356.
- `tests/http.test.mjs:5185-5745` and `tests/account-api.test.mjs:1180-1215`: the browser report, the route and the client.
- `tests/account-storage.test.mjs:2700-3160`: last-resort and failure tests of `account-block` and `account-previous-save`.
- `tests/deploy/test_loop2_watch.py` whole and `tests/deploy/test_loop2_watch_message.py` whole: D-356's watcher.
- `tests/deploy/test_loop2_deploy_build.py:1-185`: installed copies of the watcher and the logrotate file.
- `tests/agent_workflow/test_loop2_play_skill.py` whole, and a `grep` of `tests/agent_workflow/test_loop2_deploy_skill.py`: looking for a test of D-255 S1 (the building of states) and of D-355 S3 (an agent reading the log).
- The `git grep` of `loop2-app.log` across the repository: D-355's human steps.
- The diffs of slice 6's commits `43cc52ef..f28f53b7`: the form of lines and fields, as the handoff asks.
- `.the-way/task-cycle/change/slice.md` and `.the-way/elements/decisions/template.md:105-260`: named by the method and the handoff.
- `foundations/decisions.md` D-73 and D-82 whole, and `foundations/glossary.md:32-52`.

## Working copies

- `.runs/executor-7/` (under the task's worktree) held:
  - the insertion script `insert_lines.py` and its report;
  - two outputs of the foundation check and one of its control;
  - a copy of `tests/deploy/test_loop2_log_storage.py`, made for the control and used to restore the file;
  - the logs of the thirteen focused runs.
- After the commits it was made again, to hold a listing of the diff's hunks and of the test declarations above them (used to verify every line number of the rows) and a draft of the rows section.
- Removed whole with `rm -rf .runs/executor-7` both times, the last before returning; `ls .runs/` then shows only `task-cycles/`. No worktree or clone was made; nothing remains. The commands and exit codes the report needs stand above.

## Unread material

- `guidelines/styleguide-browser-view.md`: lines 1–619 read; lines 620–986 not read. Those lines are the rules on the scene, the camp, the chronicle, the end-of-run window, mockups and the plan of a UI change. They were checked by a search for their headings and for "test" and "komentarz", which found no rule on comments or lines in test files.
- `foundations/glossary.md`: its headings, and the entries `deployment`, `test server` and `public address` (lines 32–52). The rest not read; no term of the ten decisions depends on it.
- `guidelines/testing.md`: read whole (lines 1–477). `guidelines/coding.md`: read whole.
- `foundations/part_map.md`: read whole.
- The plan and the task: read as the handoff copies them. `task-frozen.md` was read whole.
- The ten entries, D-73 and D-82, the five invariants and `.the-way/elements/decisions/skill/SKILL.md`: each read whole.

## Searches not found or unclear

- **No test of D-255 S1:** `.claude/skills/loop2-play/compose-state.mjs` builds game states, but no test runs it. `tests/agent_workflow/test_loop2_play_skill.py` tests only the copies and `save-frames.mjs`.
- **No test of D-355 S3:** no test of how an agent reads the log of the running game (`docker compose logs --tail`, bounded `tail`, `grep` or `zgrep` through the `mikrus` MCP server). `tests/agent_workflow/test_loop2_deploy_skill.py` checks only the copies, the description and private names.
- **No test of D-355 S2's last clause** (only the JSON lines of `account-block` and `account-previous-save` appended): it lives only in the skill's text at `.claude/skills/loop2-deploy/SKILL.md:382-399, 461-478`.
- **Unclear:** `tests/deploy/test_loop2_deploy_build.py` (`test_each_new_pair_differing_warns_once_and_continues` and the others of `InstalledScriptComparison`) shows that a deployment warns and asks for a reinstall when the installed watcher, its schedule or the logrotate file differ from their sources. That could hold "a human installs the watcher" (D-356 S3) and "a human … installs the rotation configuration" (D-355 S3). I judged it holds neither: the tests do not assert that the installed copy is left as it was, so a deployment that warns and then installs would still pass. A line there would change that judgment.
- **Unclear:** `tests/view/uncaught-failure.test.mjs:837` (a foreseen failure keeps its own sentence alone) holds a reading of D-323's scope ("only after an error nothing handled") that its sentences do not state. I gave it no line.
