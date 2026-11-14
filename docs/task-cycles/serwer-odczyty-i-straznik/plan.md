# Plan — loop2: serwer — odczyty człowieka, strażnik awarii czyta log kopii, kopia klucza, fakty o serwerze zamiast niezmienników

- Task: `docs/task-cycles/serwer-odczyty-i-straznik/task.md`
- Spec: none
- Base: `f0814d77`

## Foundation entries

| Entry | Kind | From | What depends on it |
|---|---|---|---|
| Row 1 — the watcher reads the backup log and, when no successful send stood in it for 26 hours, sends a message of a new kind at most once a day; D-233 loses its sentence about a review before the opening of accounts and speaks of this signal; D-356 knows the new kind | decision (changes D-233 and D-356) | Settlements to record, row 1 | Slice 2 · Slice 3 · Slice 4 |
| Row 2 — a server without a working `flock` leaves the watcher ending with success and a line `skipped:` in its own log, sending nothing; D-356 lists this case among those in which nothing comes | decision (changes D-356) | Settlements to record, row 2 | Slice 3 · Slice 7 |
| Row 3 — the owner repeats the restore trial on his computer every month and after each change of the database's schema version or of the saved game's version; D-234 says so instead of "one trial before the merge" | decision (changes D-234) | Settlements to record, row 3 | Slice 4 |
| Row 4 — the paths of the restore instruction listed as "Not tried", `umask 077` included, stay untried as an accepted cost; D-234 says so | decision (changes D-234) | Settlements to record, row 4 | Slice 4 |

These four rows are written first, in the cycle's foundation step, before any slice: the code and the
instructions depend on their words.

**Entries that wait for the slices — written at the return step, not in a slice.** The log of
decisions, `foundations/decisions.md`, is about a million characters, more than any slice may read
(the size script counts every file a slice changes whole), so no slice changes it, and a slice may not
withdraw an invariant that a decision still names (the check of the foundation reports the dangling
name). Everything that edits a decision, or withdraws an invariant, therefore waits for what the
slices read, and is written by the return step through the project skills `the-way-record-decision`
and `the-way-record-invariant`, from the facts the slices wrote and from the reports of the slices
(each slice's report ends with a part "For the return step", which says, for each fact it wrote or
result it carries, which entry should name it or hold a remark, in plain words and with the date).
The slices write the environment facts themselves (`foundations/environment_facts.md` is small enough),
through `the-way-record-environment-fact`; a fact stands without a dependant until the return step names
it, and no later.

| Entry written at the return step | Kind | From | Waits for |
|---|---|---|---|
| D-09 names the fact of the real break at a deployment; its *Rationale* "a dozen or so seconds" is corrected | decision edit | To do 9 | Slice 5 |
| D-17 and D-237 name the facts of the `resources:` lines and the exit 5, and of exit 7 | decision edits | To do 9 | Slice 5 |
| D-10 names the facts of `docker stats` and of the published ports, and holds the human's reading of the Cloudflare panel as a remark | decision edit | To do 9, 11 | Slice 6 · the human's result in *Human actions* (Cloudflare) |
| D-205 names the fact about `SQLITE_BUSY` lines | decision edit | To do 9 | Slice 6 |
| D-355 names the facts of the Compose version, the daily `logrotate` and the log files; its *Rationale*, which says nobody has checked them, is corrected | decision edit | To do 9 | Slice 6 |
| D-16, D-231 and D-355 name the fact of the installed copies; D-14, D-16, D-17, D-231 and D-238 keep the facts they name, whose *Source* slice 7 re-read | decision edits | To do 9 | Slice 7 |
| D-228 names the fact of the backup log; the invariant `account-save-backup` is withdrawn, its list entry kept as the template gives | decision edit and invariant withdrawal | To do 2, 9 | Slice 7 |
| D-356 names the fact that `flock` works and the fact of GitHub's rhythm, and says in its sentence what rhythm GitHub gives, with its *Rationale* corrected; the human's reading of GitHub's mail is a remark | decision edit | To do 4, 11, 12 | Slice 7 · Slice 9 · the human's result (GitHub's mail) |
| D-232, D-110 and D-153 hold the human's results as remarks (the copy of the encryption key, the cookie and the client address through the tunnel, the reset message); D-153 also names the delivery fact of slice 11 | decision edits | To do 11, 2 | Slice 11 · the human's results in *Human actions* |
| D-12, D-16, D-223 (only the owner has accounts) and D-206 (only the owner's saved games) hold the human's count — 5 accounts, none of another person; 5 saved games, all the owner's — as a fact where the command the human ran and its output arrive word for word, otherwise as a remark; their words do not change | decision edits | To do 11 | the human's result (the count) |
| D-106 and D-113 hold the human's measurement of the password work (2026-11-14: the commit and image, the command, exit 0, the verdict `PASS` and the figures, as *Human actions* of the frozen task gives them) as a remark; the invariant `player-argon2-deployment-check` is **not** withdrawn in this cycle, because no output of the measurement word for word exists for a fact (the template's *Source* takes no summary); the request names this under what the human decides | decision edits | To do 11 | the human's result in *Human actions* |
| D-08 and D-10 name the facts that carry the server parts removed from the three invariants of item 1 | decision edits | To do 1 | Slice 6 · Slice 10 |

## Slices

### Slice 1 — A test for the second look at the deployment's lock with a broken `flock`

- **Goal:** the watcher looks at the deployment's lock twice in a run. The test file already shows
  that a broken `flock` (status 2 and 127) at the first look ends the run with a `skipped:` line that
  names the status and does not say the lock is held; the second look (the line that starts
  `dropped:`, in `deploy/loop2-watch`) has the same test only for a held lock (status 1). Add, in the
  class of the deployment's lock beside the held-lock case, a test in which the first look is free and
  the second look fails with `flock` status 2 and with 127: the run sends nothing, leaves the state file
  as it was so that the window stays open, writes one line that begins `dropped:` and names the status,
  and does not say the lock is held. The fixture can today only make the Nth look fail with status 1:
  extend that facility with a chosen status, the default and every existing call unchanged. The test
  cites no invariant (this is the watcher's own behaviour, loop2#71-23). Do not change
  `deploy/loop2-watch`. The test is written and seen to pass against the unchanged script (it describes
  behaviour that already exists); then show it failing once against a temporary change of
  `deploy/loop2-watch` that makes the second look treat every non-zero status as a held lock, and restore
  the file with `git checkout -- deploy/loop2-watch` before committing; `git diff` of that file is empty at
  the commit.
- **Change:** `tests/deploy/test_loop2_watch.py` · `tests/deploy/watch_script_support.py`
- **Read:** `guidelines/coding.md` · `guidelines/testing.md` · `deploy/loop2-watch` · `docs/task-cycles/serwer-odczyty-i-straznik/task.md:33-33` To do, item 5 · `foundations/decisions.md:9006-9019` D-356 · `foundations/decisions.md:4935-4957` D-235
- **Model:** cheaper
- **Risk:** none
- **Checks:** `python -B scripts/test.py tests/deploy/test_loop2_watch.py` · `python -B scripts/test.py tests/deploy/test_loop2_watch_message.py` (it shares the changed fixture) · `python -B scripts/test.py tests/quality/test_quality_invariants.py` · the failing run against the temporary mutation, shown in the report
- **Depends on:** none

### Slice 2 — The watcher's sixth kind: no successful backup send for 26 hours

- **Goal:** `deploy/loop2-watch` reads `/var/log/loop2-backup.log` and, when that log holds no
  successful send of a backup (`end: sent …`) dated within the last 26 hours before the run's start,
  raises a sixth kind of trouble, `backup`, which goes to `pusher` as one message with a fixed ASCII
  subject and one fixed Polish sentence in the manner of the other five (it names the kind and sends
  the reader to the skill `loop2-deploy`; no data of a player, no number, no output of a tool), at most
  once in 24 hours for this kind. The words are the executor's; the subject differs from the other
  five and from the backup script's own subject `kopia_bazy_loop2_nieudana`. Order inside the slice:
  first the tests, run and seen failing for the right reason, then the script.
  Tests (in the three test files; every test of the message cites `failure-watcher-message` as the
  guidelines' trust-boundary rule asks, and the author asks of each test which simple wrong change of
  the script it would catch):
  (a) the fixture gets a backup log of its own under its temporary directory, the path in the
  script's marked constants block and in the fixture's overrides, and by default that log holds a
  successful send dated shortly before whatever clock a test sets, so that every existing test stays
  about its own kinds; a helper writes a chosen text into it;
  (b) the kind: a send 26 hours old or less counts, one second older does not; a missing, empty or
  unreadable log counts as no send; once the kind stands it is sent once, held for 24 hours (a pair
  of times around the boundary), counts in the day's budget of six messages, goes after `failures`
  and before `browser` in the order of the kinds, and is not evaluated at a first run or after a
  damaged state, as for the other kinds; a lock of the deployment held at the first look ends the run
  before the log is read, and held at the second look drops the reading as for the other kinds;
  (c) crafted input — the content of the log is data and may hold anything, for the error text of
  `docker`, `age` and `flock` is written into it: a line counts only if it is exactly a timestamp in
  UTC, the program name `loop2-backup:` and `end: sent loop2-accounts-<1..7>.sqlite.age`; shown not to
  count: a failed end line, a line that only contains the words after other text, another program
  name, another file name, a timestamp of another shape, a timestamp after the run's clock, a line
  with no timestamp, a successful send older than the limit beside many newer failed nights, and a
  log much longer than the part the watcher reads; the watcher reads only a bounded number of the
  file's last lines and never copies a line's content anywhere;
  (d) the message tests of the invariant: the sixth notice is one fixed subject (ASCII, URL-path
  characters) and one fixed sentence whatever the log held; a marker made to look like a player's
  address, put in valid-looking and look-alike lines of the backup log, reaches no argument or input
  of `pusher`, no log, no state file and no other file of the run; the six notices differ from each
  other and from the backup script's; all six kinds due in one run go in the order of the table;
  (e) the state: `last backup <time>` is a line the strict reading accepts and the next run writes;
  a line of any other kind is still refused;
  (f) the watcher and the backup script agree: the line the backup script writes at a successful end
  is the line the watcher counts — preferably by feeding the watcher the log that a run of the backup
  script under its own stand-ins writes (the backup fixture exists), otherwise a test that pins both
  formats against each other; say in the report which was possible;
  (g) the constants test names the backup log's path, and the log line of an eventful run holds a
  status word for the backup log and nothing read from it.
  Script: the new constants (path, 26 hours, 24 hours, subject, sentence) stand in the marked block;
  the header comment of the script is brought to six kinds and says it reads the backup log and what
  it never copies from it. In `guidelines/testing.md`, the row of the table of trust boundaries for
  `deploy/` says "each of the five kinds" for the watcher's message: change that count to six and
  nothing else. The change touches the files only; the installed copy on the server changes when a human
  reinstalls it.
- **Change:** `deploy/loop2-watch` · `tests/deploy/watch_script_support.py` · `tests/deploy/test_loop2_watch.py` · `tests/deploy/test_loop2_watch_message.py` · `guidelines/testing.md`
- **Read:** `guidelines/coding.md` · `guidelines/testing.md` · `deploy/loop2-backup` · `tests/deploy/backup_script_support.py` · `docs/task-cycles/serwer-odczyty-i-straznik/task.md:31-31` To do, item 3 · `docs/task-cycles/serwer-odczyty-i-straznik/task.md:50-55` Questions to settle, how often the watcher reminds · `docs/task-cycles/serwer-odczyty-i-straznik/task.md:105-105` Context, the threshold of 26 hours · `docs/task-cycles/serwer-odczyty-i-straznik/task.md:153-153` Settlements to record, row 1 · `foundations/decisions.md:4867-4904` D-233 · `foundations/decisions.md:9006-9019` D-356 · `foundations/decisions.md:4770-4828` D-231 · `foundations/decisions.md:4935-4957` D-235 · `foundations/invariants.md:1258-1266` failure-watcher-message · `foundations/invariants.md:1128-1136` account-save-backup-failure-notice · `foundations/environment_facts.md:486-490` mikrus-pusher-mail · row 1 of the plan's Foundation entries, written as D-233 and D-356 before this slice
- **Model:** same — a Bash script that takes a file's content as input at a trust boundary and tests across four files, where a slip in the parsing is a hole and not a bug
- **Risk:** trust boundary — `deploy/loop2-watch` is in `deploy/**`, the trust boundary of the part `deployment`; it takes a new input, the content of `/var/log/loop2-backup.log`, which also receives the error text of `docker`, `age` and `flock`, so the review checks crafted input there
- **Checks:** `python -B scripts/test.py tests/deploy/test_loop2_watch.py` · `python -B scripts/test.py tests/deploy/test_loop2_watch_message.py` · `python -B scripts/test.py tests/deploy/test_loop2_backup.py` · `python -B scripts/test.py tests/quality/test_quality_invariants.py` (ShellCheck, Ruff and Prettier rules over the changed files) · the new tests shown failing before the script changes and passing after
- **Depends on:** Slice 1 · row 1

### Slice 3 — The skill `loop2-deploy`: the allowed readings, the new kind and the accepted gaps

- **Goal:** in the skill's `SKILL.md`, in both copies, which stay byte for byte the same:
  (1) the list in "Agent or human" gains three readings for the agent — `docker compose version`;
  whether `logrotate` runs every day on the server (its timer or its entry in cron, a fixed read-only
  form the writer names); the names of the files `/var/log/loop2-app.log*`, without their content — and
  the form `gh run list --workflow check-address.yml --event schedule` (with a limit and the fields that
  give the times) next to the `gh` forms already there; each with the output it expects where that is
  fixed, as the neighbouring items do; nothing else of the list changes (D-12 does not change);
  (2) the table of the watcher's kinds in "The failure record and alerts" gains the sixth kind with
  its subject, the words copied from the constants of `deploy/loop2-watch` as slice 2 wrote them, and
  what an agent reads; the sentences on the throttle and the order say that this kind goes at most once
  in 24 hours, and that the browser kind still comes last;
  (3) "Accepted gaps of the watcher" says what the new signal covers and what it does not (a schedule of
  the backup that did not start is heard after about a day; the watcher reads only the line `end: sent`
  of the backup log, so the wording of that line is not changed without the watcher), names the case of
  a server without a working `flock` (the watcher ends with success and writes a line `skipped:` in its
  own log, nothing comes), and says the new kind works only once a human reinstalls `loop2-watch` from
  the merge commit, as "Installing a script from an exact commit" gives;
  (4) the sentence in "Database backups" that a cron that did not start writes nothing says that the
  watcher now reports a night without a send after 26 hours.
  Edit one copy and copy its bytes to the other with `cp`, never by two hand edits. The skill's test
  refuses an IPv6 literal and the host name of the provider's service (the text `mikr.us` and the
  provider's server names) in any file of the skill: use the words the neighbouring text uses.
  The rhythm of GitHub's scheduled runs (the same section) belongs to a later slice.
- **Change:** `.claude/skills/loop2-deploy/SKILL.md` · `.agents/skills/loop2-deploy/SKILL.md`
- **Read:** `.claude/skills/loop2-deploy/references/backup_and_restore.md:44-97` The log · `tests/agent_workflow/test_loop2_deploy_skill.py` · `deploy/loop2-watch:41-73` the constants of the watcher · `docs/task-cycles/serwer-odczyty-i-straznik/task.md:31-32` To do, items 3 and 4 · `docs/task-cycles/serwer-odczyty-i-straznik/task.md:36-36` To do, item 8 · `docs/task-cycles/serwer-odczyty-i-straznik/task.md:40-40` To do, item 12 (only the form of the gh command it names) · `foundations/decisions.md:333-351` D-12 · `foundations/decisions.md:9081-9094` D-361 · rows 1 and 2 of the plan's Foundation entries, written as D-233 and D-356 before this slice
- **Model:** cheaper
- **Risk:** none
- **Checks:** `python -B scripts/test.py tests/agent_workflow/test_loop2_deploy_skill.py` (it fails unless the two copies hold the same files byte for byte) · `python -B scripts/test.py tests/agent_workflow/test_tracked_file_private_paths.py`
- **Depends on:** Slice 2 · row 1 · row 2

### Slice 4 — The instruction of the restore trial: the rhythm and the list "Not tried"

- **Goal:** in `references/backup_and_restore.md`, in both copies, byte for byte the same:
  (1) the instruction of the trial on the owner's computer ("Trying a backup on the owner's computer")
  says that the owner repeats the trial every month and after each change of the database's schema
  version or of the saved game's version, instead of one trial before the change that brings the backups
  merges, in the words D-234 now has (row 3); (2) the list "Not tried" of "Restoring over the server's
  database" names also the `( umask 077; … )` subshells of step 2, of step 2 for the old key and of the
  secrets file in step 8, and says the paths of the list stay untried as an accepted cost (row 4); (3) the bullet
  of "The log" that says a cron that did not start writes nothing, and that the notice comes only
  from a run that started, says also that the watcher reports a night without a send after 26 hours.
  Touch nothing else in the file: another task changes its restore procedure and D-360 later. Edit one
  copy and copy its bytes to the other with `cp`. No IPv6 literal and no provider host name in the
  file (the skill's test refuses them).
- **Change:** `.claude/skills/loop2-deploy/references/backup_and_restore.md` · `.agents/skills/loop2-deploy/references/backup_and_restore.md`
- **Read:** `tests/agent_workflow/test_loop2_deploy_skill.py` · `docs/task-cycles/serwer-odczyty-i-straznik/task.md:34-35` To do, items 6 and 7 · `docs/task-cycles/serwer-odczyty-i-straznik/task.md:56-65` Questions to settle, the schedule of the trial and the untried paths · `docs/task-cycles/serwer-odczyty-i-straznik/task.md:154-156` Settlements to record, rows 2 to 4 · `foundations/decisions.md:4906-4933` D-234 · `foundations/decisions.md:9066-9079` D-360 (read, never changed here) · rows 3 and 4 of the plan's Foundation entries, written as D-234 before this slice
- **Model:** cheaper
- **Risk:** none
- **Checks:** `python -B scripts/test.py tests/agent_workflow/test_loop2_deploy_skill.py` · `python -B scripts/test.py tests/agent_workflow/test_tracked_file_private_paths.py`
- **Depends on:** Slice 3 · row 3 · row 4

### Slice 5 — Server readings from the deploy log: the break at a deployment, the resource gate, the build exit

- **Goal:** the agent reads the server and writes down what it read as environment facts. This slice
  needs the `mikrus` MCP tools (`servers` and `exec`) — deferred tools whose schemas must be loaded
  first — and reads only within the list "Agent or human" of the skill `loop2-deploy` as slice 3 left it,
  by bounded commands; if a reading seems to need something not on the list, stop and return. It copies
  the server's id, name, SSH port, user, address or any secret into no file and no request, and changes
  nothing on the server. Readings, from the deploy log: (D-09) the interval, by the log's own times,
  between the line `dump:` and the line `deployed` of the recent deployments — the real break in access
  of a deployment; (D-17) the `resources:` lines of the recent deployments (available memory and free
  Docker space against the thresholds) and whether any run ended at exit 5; (D-237) whether any run ended
  at exit 7 and what the log names then. Each result is written, through the project skill
  `the-way-record-environment-fact`, as a fact whose source is the reading: the command, the host, the
  tool and its version, the output (the lines the sentence rests on) word for word, and the date it ran.
  The slice changes only the facts' file: it edits no decision (the return step names the facts in
  *Based on* and corrects the *Rationale* of D-09, which says "a dozen or so seconds") and withdraws no
  invariant. The slice's report ends with the part "For the return step": for each fact, the decisions that
  should name it and, in plain words with the date, what the reading shows against what the decision says.
  Where a reading contradicts an entry in a way the writer cannot resolve, return with it.
- **Change:** `foundations/environment_facts.md`
- **Read:** `deploy/loop2-deploy` · `.claude/skills/loop2-deploy/SKILL.md:45-107` Agent or human · `.claude/skills/loop2-deploy/SKILL.md:109-165` Seeing deployments and Log stages and exit codes · `docs/task-cycles/serwer-odczyty-i-straznik/task.md:37-37` To do, item 9 · `docs/task-cycles/serwer-odczyty-i-straznik/task.md:97-103` Context, the readings of 2026-11-13 and 2026-11-14 · `foundations/decisions.md:273-293` D-09 · `foundations/decisions.md:432-455` D-17 · `foundations/decisions.md:4992-5023` D-237 · `foundations/decisions.md:333-351` D-12
- **Model:** same - a fact quotes the server's output word for word; a mis-transcription is a false fact in the foundation, and the report must hold the raw output (secrets removed) so that the whole-change review can compare it
- **Risk:** none
- **Checks:** `python -B .the-way/elements/common/foundation_check.py` · `python -B scripts/test.py tests/agent_workflow/test_tracked_file_private_paths.py` · the executor searches `git diff` for the server's id, name, port and user it saw and finds none
- **Depends on:** Slice 3

### Slice 6 — Server readings of the running containers, the game's log and `logrotate`: ports, memory, `SQLITE_BUSY`, Compose, rotation

- **Goal:** the same conditions as slice 5 (the `mikrus` MCP tools; only the allowed readings, which now
  include the three of slice 3; no copy of the server's id, name, port, user, address or a secret; nothing
  changed on the server; each result a fact whose source is the reading word for word, written through
  the project skill `the-way-record-environment-fact`; no decision edited). Readings: (D-10, and the
  invariant `loop2-application-port`) `docker stats --no-stream` of the two containers, and the ports the
  containers publish, from `docker ps` and `docker compose -p loop2 ps` — write the published ports as a
  fact of their own, because slice 10 takes the server part out of `loop2-application-port` and the
  return step makes D-10 name this fact; (D-205) the failure lines with `SQLITE_BUSY` in the game's log, by
  a bounded `grep -F` of the running containers' log, the dump and its rotated files, and how many there
  are; (D-355) the version of Compose, whether `logrotate` runs every day, and the names of the files
  `/var/log/loop2-app.log*` (D-355's *Rationale* says nobody has checked the daily run and the version; the
  return step corrects it from these facts). Besides: slice 3 added to the skill's list of readings three expectations that were not read on the server - `systemctl is-enabled logrotate.timer` expects `enabled`, `systemctl cat logrotate.timer` holds the line `OnCalendar=daily`, and `ls /etc/cron.daily/logrotate` and the names of `/var/log/loop2-app.log*`; read each of them on the server and bring the skill's text in "Agent or human" to what the reading shows (a different expectation, or the reading removed from the list where the server answers otherwise), in both copies of `SKILL.md`: edit one and copy it over the other with `cp`, then `cmp`; that is the only change to the skill here. The report ends with "For the return step" as in slice 5.
- **Change:** `foundations/environment_facts.md` · `.claude/skills/loop2-deploy/SKILL.md` · `.agents/skills/loop2-deploy/SKILL.md`
- **Read:** `compose.yaml` · `deploy/loop2-app.logrotate` · `.claude/skills/loop2-deploy/SKILL.md:45-107` Agent or human · `.claude/skills/loop2-deploy/SKILL.md:251-342` The failure record and alerts · `docs/task-cycles/serwer-odczyty-i-straznik/task.md:36-37` To do, items 8 and 9 · `docs/task-cycles/serwer-odczyty-i-straznik/task.md:97-103` Context, the readings of 2026-11-13 and 2026-11-14 · `foundations/decisions.md:295-308` D-10 · `foundations/decisions.md:3965-3986` D-205 · `foundations/decisions.md:8991-9004` D-355 · `foundations/decisions.md:333-351` D-12 · `foundations/environment_facts.md:312-316` mikrus-tunnel-outbound-tcp · `foundations/invariants.md:145-153` loop2-application-port
- **Model:** same - a fact quotes the server's output word for word; a mis-transcription is a false fact in the foundation, and the report must hold the raw output (secrets removed) so that the whole-change review can compare it
- **Risk:** none
- **Checks:** `python -B scripts/test.py tests/agent_workflow/test_loop2_deploy_skill.py` · `python -B .the-way/elements/common/foundation_check.py` · `python -B scripts/test.py tests/agent_workflow/test_tracked_file_private_paths.py` · a search of `git diff` for the server's id, name, port and user finds none
- **Depends on:** Slice 5

### Slice 7 — Server readings of the host's facts, the installed copies, the backup log and `flock`

- **Goal:** the same conditions as slice 5; the facts' file only. Readings: (1) the six facts about the
  server (`loop2-host-forced-command-entry`, `loop2-host-installed-command`,
  `loop2-host-ssh-host-key-options`, `mikrus-host-docker-workloads`, `mikrus-host-swap`,
  `mikrus-tunnel-outbound-tcp`) are read again with the command each fact's *Source* names, within the
  allowed list (the counting command for root's SSH configuration is the one of "What an agent may read"
  in `references/backup_and_restore.md`), and each entry's *Source* is brought to the new run — edited in
  place, the sentence unchanged where the output says the same; a changed output changes the sentence,
  and the report names every decision and invariant that names the fact, for the return step;
  (2) the agreement of the six installed files (the deploy script, the backup script and its schedule, the
  watcher and its schedule, the logrotate file) with their sources in `/srv/loop2/deploy` by `cmp`, with the
  commit of that checkout named: one new fact; (3) the backup log: a bounded tail showing the nightly
  `made:` and `end: sent` lines of the recent nights: one new fact, the one that replaces the invariant
  `account-save-backup`, which the return step withdraws; (4) `flock`: that it works on the test server,
  shown by a bounded tail of `/var/log/loop2-watch.log` with a `skipped:` line for a held lock and
  `flock exit 1`: one new fact for D-356 (row 2 wrote D-356's sentence on a server without a working `flock`
  before this slice). Write nothing of the server's id, name, port or user that is not already in a fact.
  The report ends with "For the return step" as in slice 5.
- **Change:** `foundations/environment_facts.md`
- **Read:** `foundations/environment_facts.md:15-69` the facts of the server's host, from the forced command to the swap · `foundations/environment_facts.md:312-316` mikrus-tunnel-outbound-tcp · `foundations/decisions.md:295-308` D-10 · `foundations/decisions.md:369-383` D-14 · `foundations/decisions.md:406-430` D-16 · `foundations/decisions.md:432-455` D-17 · `foundations/decisions.md:4681-4706` D-228 · `foundations/decisions.md:4770-4828` D-231 · `foundations/decisions.md:5025-5058` D-238 · `foundations/decisions.md:8991-9004` D-355 · `foundations/decisions.md:9006-9019` D-356 · `foundations/invariants.md:1098-1106` account-save-backup · `foundations/environment_facts.md:480-484` sqlite-online-backup · `.claude/skills/loop2-deploy/references/backup_and_restore.md:44-97` The log · `.claude/skills/loop2-deploy/references/backup_and_restore.md:189-249` What an agent may read · `.claude/skills/loop2-deploy/SKILL.md:45-107` Agent or human · `deploy/loop2-watch:168-188` the watcher's own lock · `docs/task-cycles/serwer-odczyty-i-straznik/task.md:32-32` To do, item 4 · `docs/task-cycles/serwer-odczyty-i-straznik/task.md:37-37` To do, item 9 · `docs/task-cycles/serwer-odczyty-i-straznik/task.md:97-103` Context, the readings of 2026-11-13 and 2026-11-14 · row 2 of the plan's Foundation entries, written as D-356 before this slice
- **Model:** same - a fact quotes the server's output word for word; a mis-transcription is a false fact in the foundation, and the report must hold the raw output (secrets removed) so that the whole-change review can compare it
- **Risk:** none
- **Checks:** `python -B .the-way/elements/common/foundation_check.py` · `python -B scripts/test.py tests/agent_workflow/test_tracked_file_private_paths.py` · a search of `git diff` for the server's id, name, port and user finds none
- **Depends on:** Slice 6 · row 2

### Slice 8 — Facts read again: the visibility of two repositories through `gh`, the two licences by the human

- **Goal:** the agent runs, locally, `gh` (authorised on the owner's account; the query carries the account
  name, which the human allowed) on the repositories `mariusznazar/loop2` and `mariusznazar/screenshots`,
  and writes the *Source* of the facts `loop2-repository-visibility` and `screenshots-repository-visibility`
  anew — edited in place, the output's passage word for word and the date read, in the form the two facts
  already use. If either repository is not public, change no entry and return with the reading, since D-356,
  D-357 and D-358 rest on the fact being true. The two licence facts, `smoke-fire-particle-licence` and
  `lpc-wolf-licence`, get the human's reading of 2026-11-14 as their new *read* date: the human read the
  live pages in an ordinary browser and found they say what the facts quote (the entry in *Human actions*
  names both); the sentences and the passages stay as they are. The report ends with "For the return step"
  as in slice 5 (nothing is expected unless a fact changed).
- **Change:** `foundations/environment_facts.md`
- **Read:** `foundations/environment_facts.md:690-694` loop2-repository-visibility · `foundations/environment_facts.md:774-778` screenshots-repository-visibility · `foundations/environment_facts.md:780-790` smoke-fire-particle-licence and lpc-wolf-licence · `foundations/decisions.md:9006-9019` D-356 · `foundations/decisions.md:9021-9034` D-357 · `foundations/decisions.md:9036-9049` D-358 · `docs/task-cycles/serwer-odczyty-i-straznik/task.md:38-39` To do, items 10 and 11 · `docs/task-cycles/serwer-odczyty-i-straznik/task.md:71-75` Questions to settle, who checks the visibility · `docs/task-cycles/serwer-odczyty-i-straznik/task.md:125-125` Human actions, the licences
- **Model:** cheaper
- **Risk:** none
- **Checks:** `python -B .the-way/elements/common/foundation_check.py` · `python -B scripts/test.py tests/agent_workflow/test_tracked_file_private_paths.py`
- **Depends on:** Slice 7

### Slice 9 — The rhythm of the scheduled check of the address, as GitHub gives it

- **Goal:** the agent reads locally, through `gh` (`gh run list --workflow check-address.yml --event schedule`,
  with a limit and the fields that give the run's times; the form slice 3 put on the list), the times of the
  most recent scheduled runs and the gaps between them, and writes them as an environment fact with its
  date, in the form of the template for a source that is a service's public answer; if the template gives no
  form for it, say so in the report and write the result for the return step as a remark for D-356. In the
  skill, in both copies, byte for byte the same: the second of "The three ways the owner learns the game
  failed" (the scheduled check) and "The four limits of the scheduled check" speak of the rhythm GitHub
  gives, and say that with the server or the tunnel down the alarm of GitHub may come only after hours; the
  cause of the gaps is not established, and the text says so. The workflow `check-address.yml` does not
  change, and neither does its schedule (the comment in it that says "every five minutes" states what the
  schedule asks for; leave it and mention it in the report). Edit one skill copy and copy its bytes to the
  other with `cp`; no provider host name and no IPv6 literal in the skill. D-356 is not edited here: its
  sentence about the rhythm and its *Rationale* are corrected by the return step from the fact. The report
  ends with "For the return step" as in slice 5.
- **Change:** `foundations/environment_facts.md` · `.claude/skills/loop2-deploy/SKILL.md` · `.agents/skills/loop2-deploy/SKILL.md`
- **Read:** `.github/workflows/check-address.yml` · `tests/agent_workflow/test_loop2_deploy_skill.py` · `docs/task-cycles/serwer-odczyty-i-straznik/task.md:40-40` To do, item 12 · `docs/task-cycles/serwer-odczyty-i-straznik/task.md:86-91` Questions to settle, the rhythm of the check · `docs/task-cycles/serwer-odczyty-i-straznik/task.md:103-103` Context, the reading of 2026-11-14 · `foundations/decisions.md:9006-9019` D-356 · `foundations/environment_facts.md:720-724` github-schedule-shortest-interval · `foundations/environment_facts.md:684-688` github-scheduled-workflow-disabling
- **Model:** cheaper
- **Risk:** none
- **Checks:** `python -B .the-way/elements/common/foundation_check.py` · `python -B scripts/test.py tests/agent_workflow/test_loop2_deploy_skill.py` · `python -B scripts/test.py tests/agent_workflow/test_tracked_file_private_paths.py` · `python -B scripts/test.py tests/deploy/test_check_address_workflow.py` (the workflow is unchanged; it must still pass)
- **Depends on:** Slice 8 · Slice 3

### Slice 10 — The invariants about the application port, the container and the address say only what their tests check

- **Goal:** `loop2-application-port`, `loop2-container-isolation` and `loop2-distinct-address` are
  re-worded, through the project skill `the-way-record-invariant`, to say only what their test checks in
  the files of the repository (the Compose file and the Dockerfile publish no application port, bypass no
  private network and share nothing with the old instance; the deployment workflow declares one public address
  that is not the old game's); the part that spoke of the server leaves each sentence, to stand as the facts
  that already carry it (the published ports of slice 6; that the old game runs as another container) — the
  return step makes D-08 and D-10 name them. The three tests keep their cases and their behaviour: only the
  words of their module docstrings that quote the old sentences or name the acceptance that "also requests
  the old port" change, to the new sentences and to a pointer to the fact; nothing in the assertions
  changes and the `# invariant:` lines keep the identifiers. Search the repository for another use of the
  old wording and repoint it. Where no fact carries a removed part, say so in the report (the return step
  then keeps it in the decision's rationale as the human's check). The report ends with "For the return
  step" as in slice 5.
- **Change:** `foundations/invariants.md` · `tests/invariants/test_loop2_application_port.py` · `tests/invariants/test_loop2_container_isolation.py` · `tests/invariants/test_loop2_distinct_address.py`
- **Read:** `guidelines/coding.md` · `guidelines/testing.md` · `compose.yaml` · `docs/task-cycles/serwer-odczyty-i-straznik/task.md:29-29` To do, item 1 · `docs/task-cycles/serwer-odczyty-i-straznik/task.md:122-122` Human actions, the Cloudflare panel · `foundations/decisions.md:253-271` D-08 · `foundations/decisions.md:295-308` D-10 · `foundations/environment_facts.md:59-63` mikrus-host-docker-workloads · `foundations/environment_facts.md:312-316` mikrus-tunnel-outbound-tcp
- **Model:** same — turning an invariant into what its test checks takes judgment about what stays and what leaves
- **Risk:** none
- **Checks:** `python -B scripts/test.py tests/invariants/test_loop2_application_port.py` · `python -B scripts/test.py tests/invariants/test_loop2_container_isolation.py` · `python -B scripts/test.py tests/invariants/test_loop2_distinct_address.py` · `python -B .the-way/elements/common/foundation_check.py` · `python -B scripts/test.py tests/quality/test_quality_invariants.py`
- **Depends on:** Slice 6 · Slice 9

### Slice 11 — The delivery of mail: from an invariant's part to a fact

- **Goal:** `account-email-via-outsider` keeps only the part a file of the repository decides — the sender
  address and the mail service named in `compose.yaml` — and its sentence is narrowed through
  `the-way-record-invariant` (its method as the skill's rule gives it; no test is written here); the part about
  delivery to a mailbox leaves it. The human's result of 2026-11-14 (the reset message from the public address
  reached an external inbox; the log of the service `app` has the events `link-issued` and `message-sent` with
  `linkPurpose: password-reset` for it and no line with `"failure":"mail"`) becomes a fact where the agent
  can read those lines again by a bounded reading the skill allows of the game's log (the `mikrus` MCP tools
  `servers` and `exec`; the same conditions as slice 5) and quote them word for word, written through
  `the-way-record-environment-fact`; otherwise nothing is written as a fact, and the human's result goes to
  the return step as a remark for D-153. The confirmation message is not in the human's result: do not claim
  it, and say in the report what D-153 stays unsettled on. The report ends with "For the return step" as in
  slice 5; D-153 names the fact there.
- **Change:** `foundations/invariants.md` · `foundations/environment_facts.md`
- **Read:** `compose.yaml` · `docs/task-cycles/serwer-odczyty-i-straznik/task.md:30-30` To do, item 2 · `docs/task-cycles/serwer-odczyty-i-straznik/task.md:120-120` Human actions, the reset message · `foundations/invariants.md:918-926` account-email-via-outsider · `foundations/decisions.md:3138-3151` D-153 · `foundations/environment_facts.md:432-436` mikrus-outsider-mail · `.claude/skills/loop2-deploy/SKILL.md:45-107` Agent or human · `.claude/skills/loop2-deploy/SKILL.md:201-250` Account mail
- **Model:** same — an invariant narrowed so that the entries that rest on it keep their meaning
- **Risk:** none
- **Checks:** `python -B .the-way/elements/common/foundation_check.py` · `python -B scripts/test.py tests/agent_workflow/test_tracked_file_private_paths.py` · a search of `git diff` for the server's id, name, port and user finds none
- **Depends on:** Slice 10 · Slice 9

## Coverage

| What the task requires | Slices or entries |
|---|---|
| To do 1 — the three invariants of the application port, the container and the address say only what their tests check; the server part becomes facts with a reading and date | Slice 6 (the published ports) · Slice 7 (the old game's container) · Slice 10 (the invariants and the tests' words) · return step (D-08 and D-10 name the facts) |
| To do 2 — `account-save-backup`, `player-argon2-deployment-check` and the delivery part of `account-email-via-outsider` become facts; the entries that stood on them point to the facts | Slice 7 (backup log fact) · Slice 11 (delivery) · return step (D-228 and D-153 point to the facts and `account-save-backup` is withdrawn; the measurement has no output word for word, so it is a remark at D-106 and D-113 and `player-argon2-deployment-check` stays, which the request names under what the human decides) |
| To do 3 — the watcher reads the backup log, the new kind, once a day, 26 hours; D-233 and D-356; the skill; the tests of the watcher | Row 1 · Slice 2 (script and tests) · Slice 3 (skill) · Slice 4 (the bullet of the backup log) |
| To do 4 — D-356 names the server without a working `flock`; a fact that `flock` works there; no change of the watcher | Row 2 · Slice 7 (the fact) · Slice 3 (the skill's accepted gaps) · return step (D-356 names the fact) |
| To do 5 — a test of the second look at the lock with a broken `flock` (status 2 and 127) | Slice 1 |
| To do 6 — D-234: the sentence of the repeated trial; the instruction speaks of the rhythm | Row 3 · Slice 4 |
| To do 7 — the list "Not tried" names `umask 077` (both copies) | Row 4 · Slice 4 |
| To do 8 — the list of the agent's readings in the skill (both copies) | Slice 3 |
| To do 9 — the agent's readings written as facts (the break at a deployment, `docker stats`, `resources:` and exit 5, `SQLITE_BUSY`, exit 7, Compose and `logrotate`, the published ports, the backup log, the six facts, the installed copies) | Slice 5 · Slice 6 · Slice 7 · return step (the decisions name them) |
| To do 10 — the visibility of the two repositories read through `gh` | Slice 8 |
| To do 11 — the human's results into facts or entries (D-232, D-10, D-110, D-153, D-356, the two licences, the measurement, the accounts and saves) | Slice 8 (licences) · Slice 11 (reset message, as a fact if readable) · return step (D-232, D-10, D-110, D-153, D-356, D-12, D-16, D-206, D-223, and the measurement at D-106 and D-113, each as a remark) |
| To do 12 — the rhythm of the scheduled runs as a fact; D-356 and the skill speak of it; the schedule unchanged | Slice 9 (fact and skill) · return step (D-356) |
| Settlements to record, row 1 | Foundation entries, row 1 (D-233, D-356) |
| Settlements to record, row 2 | Foundation entries, row 2 (D-356) |
| Settlements to record, row 3 | Foundation entries, row 3 (D-234) |
| Settlements to record, row 4 | Foundation entries, row 4 (D-234) |
| Decisions in play marked as changed — D-233 | Row 1 |
| Decisions in play marked as changed — D-234 | Rows 3 and 4 |
| Decisions in play marked as changed — D-356 | Rows 1 and 2 · return step (Based on, the rhythm, the mail of GitHub) |
| Decisions in play without a change of words (D-09 and D-17 and D-237 and D-355 get corrections of their *Rationale*; D-10, D-12, D-16, D-110, D-153, D-205, D-206, D-223, D-232 get facts or remarks) | the return step's table above |
| The two copies of the skill stay twins | Slices 3, 4, 9 and 12, each ending with `tests/agent_workflow/test_loop2_deploy_skill.py`, which compares the files byte for byte |
| *Questions carried to cycle*: none | nothing to cover |

## Choices

| Choice | Way rejected | Cost if wrong |
|---|---|---|
| The sixth kind is called `backup`, stands after `failures` and before `browser` in the order of the kinds, has its own interval of 24 hours and counts in the day's six messages | at the end, after `browser`; a budget of its own outside the six | After `browser` a flood of browser reports could take the day's budget before the backup kind, whose message is rare; a budget of its own would let the watcher send more than six a day, against D-356 |
| A missing, empty or unreadable backup log counts as no successful send | a missing log counts as quiet | A lost or never-written log is the very silence the signal is for; counting it as quiet hides it; the cost of the choice is one message a day after a fresh installation of the watcher until the first night's backup |
| The age of a send is taken from the time written in its line (UTC), not from the file's modification time | the file's modification time | A failed night also appends lines, so the modification time would stay fresh without a send; the cost of the line's time is trust in the backup script's clock, which the watcher's own already shares |
| A time written in the future does not count as a send | any stamp counts | A log with a wrong or forged future date would hide missing nights for as long as it lies ahead; the cost of refusing is a false alarm while the clock lags |
| The watcher reads a bounded tail of the log, not the whole file | the whole file | A log that grows by error text could make a run slow or large; the cost is a send older than the tail not being seen, which a bound of many nights makes harmless |
| The default of the test fixture is a fresh successful send at any clock; tests of the new kind set their own log | every existing test sets the log | Every existing test would grow a line and the kinds under test would hide in the setup; the cost is a default that a careless test of the new kind could leave in force |
| One slice (slice 2) holds the script, its three test files and the count in the testing guidelines, in the order tests first | the tests in a slice before the script | A slice of failing tests only cannot be checked or committed whole; the cost is a larger slice, which the size report allows |
| The foundation step writes the four rows only; every edit of a decision and every withdrawal of an invariant is written at the return step | edits of decisions inside the slices | `foundations/decisions.md` is about 1,020,000 characters, more than the 250,000 tokens a slice may read, and a slice that withdrew an invariant leaves decisions naming it; the cost is a long return step, and facts that stand without a dependant between their slice and the return step |
| The slices write the environment facts (the file is small) and the invariant that is narrowed, not withdrawn (item 1 and the mail invariant), and the return step reads their reports | a slice for the return step's work, split by decision | The size script would report each such slice too large; the cost is that the return step carries about twenty edits, which its reviewer reads as one range |
| Every server and `gh` reading becomes a fact (its command and output are in hand); a human's result becomes a remark at its entry unless the command and the output arrive word for word | every result a fact | The human's results hold no command or output word for word, so a fact from them would read as evidence it is not; the cost is that a remark is weaker evidence and has no source form |
| The facts slices run one after another, each depending on the one before, because they all write `environment_facts.md` | in parallel | Parallel writers of the same file clash; the cost is a long chain |
| Each of the two copies of the skill is written by one edit and `cp`, and the skill's test compares them | two hand edits | A second hand edit drifts by a character; the test catches it, and the cost is a copy step |
| The test of the watcher and the backup script agreeing on the line `end: sent` is made through a stand-in run of the backup script if the fixtures allow | a test of the watcher on a log written by hand only | A change of the backup script's line would silence the signal without a failing test; the cost is a test that depends on two fixtures |
| `guidelines/testing.md` is changed in slice 2 in the count of kinds only | through `the-way-maintain-testing-guidelines` | That skill leads the refinement of a testing-guidelines task with the human; for a stale count it is more process than the change; the cost is that the guideline's file is edited without that skill, noted in the report |
