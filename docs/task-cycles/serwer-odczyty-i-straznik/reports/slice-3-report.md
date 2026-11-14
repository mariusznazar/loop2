# Report - slice 3 of `serwer-odczyty-i-straznik`: the skill `loop2-deploy`

**Status:** done

## Commit and files

Base `b1e8ec99`. One commit on `task/serwer-odczyty-i-straznik`, nothing pushed:

- `f91123b3` docs: the two copies of the skill, `.claude/skills/loop2-deploy/SKILL.md` (+21 / -5) and
  `.agents/skills/loop2-deploy/SKILL.md` (+21 / -5). The copy was made with `cp` from the edited one; `cmp` agrees.

No other file changed. No foundation entry was written here (the four rows were already in D-233, D-234, D-356, commit `9630fb90`).

## What the slice changed in the skill (both copies, same bytes)

1. "Agent or human":
   - `docker compose version` added to the version readings (the bullet "for a reading in an environment fact only"; the bullet's own rule "expect no fixed value" covers it).
   - A new bullet, "the log's rotation": `systemctl is-enabled logrotate.timer` (expects `enabled`); `systemctl cat logrotate.timer` (shows `OnCalendar=daily`); `ls /etc/cron.daily/logrotate` where there is no timer; `ls -1 /var/log/loop2-app.log*` (names only, never content).
   - The `gh` form `gh run list --workflow check-address.yml --event schedule --limit 20 --json createdAt,startedAt`, added to the "Locally" clause next to the existing `gh` forms.
   - Nothing else of the list changed; D-12 untouched.
2. "The failure record and alerts": a table row `loop2_brak_kopii_bazy` (subject equal to `SUBJECT_BACKUP` in `deploy/loop2-watch:88`) placed before the browser row, with what an agent reads. The throttle sentence now says the backup kind goes at most once in 24 hours; the browser kind still comes last.
3. "Accepted gaps of the watcher": the 26-hour late report (about a day); the watcher reads only the `end: sent` line; no `flock` gives `skipped: flock could not take ...` and nothing is read; the kind works only after a human reinstalls `loop2-watch` from the merge commit (pointing to "Installing a script from an exact commit" in `references/setup_and_secrets.md`).
4. "Database backups": "A cron that did not start writes nothing" now adds that the watcher reports a night without a successful send after 26 hours.

## Checks (command, exit code)

Named runner used for both; no substitute needed (each finished well inside the bound). Run one at a time, background for the first, never `npm test`.

| Check | Command | Exit | Result |
|---|---|---|---|
| skill copies | `python -B scripts/test.py tests/agent_workflow/test_loop2_deploy_skill.py` | 0 | 5 tests OK, 0.017 s |
| private paths | `python -B scripts/test.py tests/agent_workflow/test_tracked_file_private_paths.py` | 0 | 1 test OK, 1.6 s |
| copies identical | `cmp .claude/skills/loop2-deploy/SKILL.md .agents/skills/loop2-deploy/SKILL.md` | 0 | identical |

No failing run occurred, so there is no red run to report. The slice is prose and static text; no test was written or changed.

## Own-work check (section 3 of the method)

Requirement most likely not met: the new kind's subject and sentence must be the watcher's own words, and the two copies must be identical. Check: `grep` of `SUBJECT_BACKUP=` in `deploy/loop2-watch` (line 88: `loop2_brak_kopii_bazy`) against the table row; `cmp` of the copies; the named test that asserts byte identity and the IPv6 and `mikr.us` ban. Result: the subject matches; the copies match; the named tests pass. I did not run a mutation of the copies; the byte-identity test is the mechanism that catches a one-sided edit.

## Choices and adaptations

- The sentence on the flock case says "reads nothing": that matches the watcher, which after the `flock` skip ends the run before `read_backup_log`.
- The `logrotate` timer form was chosen as the primary reading; cron is the stated alternative.
- The `gh` form is placed in the "Locally" clause of the failure-record bullet, next to the existing `gh` forms, not in a new bullet.

## Reaches beyond the handoff

- `foundations/decisions.md:4867-4916` (D-233) and `:9027-9101` (D-356), read whole, to check the words the new kind and the gap sentences must agree with; the handoff's rows were these two entries.
- `.claude/skills/loop2-deploy/references/setup_and_secrets.md:78-100` ("Installing a script from an exact commit"), named by item 3 of the slice's *Goal* through the phrase only.
- `.the-way/task-cycle/change/SKILL.md` whole (the method), and `.runs/.../reports/slice-2-report.md` whole.
- `deploy/loop2-watch` read whole (1-679), not only 1-110 and 41-73.

## Unread material

- `docs/task-cycles/serwer-odczyty-i-straznik/plan.md`: not read, as the handoff says. The slice's *Read* names its rows 1 and 2; I read the entries D-233 and D-356 that they correspond to.
- `.claude/skills/loop2-deploy/references/setup_and_secrets.md`: only lines 78-100 read; the watcher install steps at lines 520-575 not read (not named by the slice).
- `.the-way/task-cycle/tracked_private_paths_check.py`: not read; the named test ran it and passed.
- `references/backup_and_restore.md`: read at lines 40-101, covering the named 44-97.

## Searches not found or unclear

- Item (1) of the slice's *Goal* says "three readings for the agent" but names four: `docker compose version`, the `logrotate` reading, the file names, and the `gh` form. I added all four; the `gh` form sits with the existing `gh` forms, as the item says. Please confirm that this reading of "three" is what was meant.
- The `logrotate.timer` output `OnCalendar=daily` is what Debian and Ubuntu's `logrotate` package ships, from memory; I did not verify it on the server (the agent reads nothing there in this slice). Unverified: the expected line of `systemctl cat logrotate.timer`. A first real read on the server would settle it.
- The expected output of `ls -1 /var/log/loop2-app.log*` (the dump and up to `.4.gz`) is from the skill's own rotation text (four rotated files), not checked on the server.
