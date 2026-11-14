# Handoff - slice 2 of the task cycle `serwer-odczyty-i-straznik`

You make one slice of a planned change. The person who requested this cycle delegated intermediate
choices to the orchestrator; nothing you receive is that person's approval.

- Worktree (work from its root): `the root of the worktree`, branch `task/serwer-odczyty-i-straznik`. The slice's base is `3817a067d4178ef3e8ac6691203bb3a932e42f32`. Commit on this branch, path by path (`git add <file> ...`, never `git add -A`, `.` or `commit -a`), English commit messages in the style of `git log` of the repository. Do not push. Do NOT run the product's whole gate (`npm test`); the machine is short of memory and the gate is the orchestrator's. Run only the focused checks of the slice, one at a time.
- Method: the project skill `the-way-make-change`, whose `SKILL.md` is `.the-way/task-cycle/change/SKILL.md`; your variant is "a slice, or the retry of a slice"; read that `SKILL.md` whole, and a file it names only when the step that names it comes.
- Frozen task: `docs/task-cycles/serwer-odczyty-i-straznik/task.md` (Polish). Read the passages the slice's *Read* names. The plan: `docs/task-cycles/serwer-odczyty-i-straznik/plan.md` - the slice's section is copied below word for word; read nothing else of the plan.
- Answers of the orchestrator's step 4: the change touches a trust boundary (`deploy/**`, the watcher `deploy/loop2-watch`); no operation that cannot be undone. A slice's *Risk* is in its section.
- Report path: `docs/task-cycles/serwer-odczyty-i-straznik/reports/slice-2-report.md`. Return its status (`done`, `done with concerns`, `questions`, `returned`, `reserved` or `blocked`), commits, a one-line check result naming what failed or did not run, the report path, **Unread material** and **Searches not found or unclear**; the report has each check with its command and exit code, the own-work check your method asks for, and anything you reached beyond this handoff (name it).
- Foundation entries the earlier steps wrote: the four rows of *Settlements to record* are already written as edits of D-233, D-234 and D-356 (commit `9630fb90`); the decision ranges below are the current ones in this worktree and hold where they differ from the plan's *Read*.

## Current ranges of decisions named in the slice's *Read*

- D-231: `foundations/decisions.md:4770-4829`
- D-233: `foundations/decisions.md:4867-4916`
- D-235: `foundations/decisions.md:4956-4979`
- D-356: `foundations/decisions.md:9027-9041`

## The slice (copied word for word from `plan.md`)

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


## Note from the orchestrator on running tests on this machine

The machine is short of memory and the Git Bash child processes the tests start are slow. In the previous slice the named runner `python -B scripts/test.py <file>` did not finish in 17 minutes, and the same module run by `python -B -m unittest -v <module>` from the test file's directory (per class where a module is slow) did. Try the named runner first only with a bounded wait of about 10 minutes in the background; if it does not finish, run the substitute and report both commands and what each did, with exit codes. Run one check at a time. Never run `npm test`.
