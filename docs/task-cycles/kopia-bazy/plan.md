# Plan — Spójna kopia bazy kont i zapisów poza serwerem gry ze sprawdzonym odtworzeniem

- Task: `docs/task-cycles/kopia-bazy/task-frozen.md`
- Spec: `docs/task-cycles/kopia-bazy/spec.md`
- Base: `95de83b98a5083c516b8fffad3237eaa64cad8d5`

## Foundation entries

| Entry | Kind | From | What depends on it |
|---|---|---|---|
| E1 — "Which failure does the database backup survive?" | decision, new, projected whole | task *Decisions in play*; spec *Foundation entries* | Slices 1, 3, 5, 6 |
| E2 — "How does the account and save server access SQLite?" | decision, new, projected whole | task *Decisions in play*; spec *Foundation entries* | Slices 1, 2 |
| E3 — how often a backup is made and how many stay | decision, new | Settlements row 1; spec decision 7 | Slices 3, 6 |
| E4 — where the backup runs | decision, new | Settlements row 2; spec decisions 3, 8, 10; names D-10's *Rejected* as reversed for this case and leaves D-10 unchanged | Slices 1, 3, 4, 6 |
| E5 — how the backup is encrypted | decision, new | Settlements row 4; spec decisions 4, 5 | Slices 3, 6 |
| E6 — how the owner learns of a failed backup | decision, new | Settlements rows 8 and 9; spec decision 8 | Slices 3, 6 |
| E7 — what a checked restore means | decision, new | Settlements row 12; spec decision 12 | Slices 5, 6 |
| E8 — how the code that talks to Strych and `pusher` is tested | decision, new | spec *Foundation entries* and decision 15 | Slices 3, 7 |
| E9 — D-13 | decision, changed | Settlements rows 6 and 7; spec *Foundation entries* | Slices 3, 6 |
| E10 — D-112 | decision, changed | Settlements row 3; spec *Foundation entries* | Slice 1 |
| E11 — D-73 | decision, changed: its list of departures gains E8 | spec *Foundation entries* | Slice 7 |
| E12 — `account-save-backup` | invariant, new, projected whole, *Violated: yes*; check: method `review`, the human's H2 and H3, no test and no expected-failure marking | task *Decisions in play*; spec *Foundation entries* | Slice 6 |
| E13 — `account-save-sqlite-upgrade` | invariant, new, projected whole; check: `tests/invariants/test_account_save_sqlite_upgrade.py` and `tests/account-database-check.test.mjs` | task *Decisions in play*; spec *Foundation entries* | Slice 2 |
| E14 — `account-save-backup-encrypted`, the identifier proposed | invariant, new; check: `tests/invariants/test_account_save_backup_encrypted.py` | Settlements row 5; spec *Foundation entries* | Slice 3 |
| E15 — `account-save-backup-failure-notice`, the identifier proposed | invariant, new; check: `tests/invariants/test_account_save_backup_failure_notice.py`; names no step that does not exist, as spec decision 7 reads the row | Settlements row 10; spec decision 7 and *Foundation entries* | Slice 3 |
| E16 — `account-save-sqlite-access` | invariant, changed: *Derives from* moves to E2 | spec *Foundation entries* | none |
| E17 — `node-sqlite-database` | environment fact, changed: `backup()`, its `rate`, its restart under other connections | spec *Foundation entries* | E2, E12, Slices 1, 2 |
| E18 — SQLite's Online Backup API | environment fact, new | spec *Foundation entries* | E12, Slice 1 |
| E19 — the `pusher` fact | environment fact, new | Settlements row 11 | E6, E15, Slice 3 |
| E20 — the `age` fact | environment fact, new | spec *Foundation entries* | E5, E14, Slice 3 |
| E21 — part map, *External context*: Mikrus Strych and the `pusher` service, both directions, untrusted | part map, through `the-way-update-part-map` | To do 8; spec *Foundation entries* | Slice 3 |
| E22 — part map, responsibilities: `account-server` gains the backup command and the release check, `deployment` the backup script and its schedule, `build-tools` the launcher of the restore trial | part map, through `the-way-update-part-map` | spec *Foundation entries*; the `build-tools` sentence is the plan's reading (see *Choices*) | Slices 1, 2, 3, 5 |

The files each slice adds are claimed in the part map by that slice, not in this step. The glossary
gains nothing (spec *Foundation entries*). `copy` is a glossary term of the game: its writer's search
meets it (see the report's questions).

## Slices

### Slice 1 — The backup command

- **Goal:** `node dist/server/account-backup.js --to-standard-output`, run beside the server, writes
  one consistent backup of the existing database of `LOOP2_DATABASE_PATH` to standard output and
  nothing else there. Without that one word, or with anything else, it refuses with the usage exit
  code before it opens the database and prints nothing to standard output. A missing file creates
  nothing. `AccountDatabase` has one method that makes a backup at a given path, whole in one step,
  by a positive whole `rate` above any page count; no SQL and no `node:sqlite` import stand outside
  `src/server/database.ts`. The command backs up into a private temporary directory, closes the
  database, streams the finished file out without holding it in memory, and removes the directory
  after every end, a failure and a reader that goes away included. Exit 0 comes only after the last
  byte is out; every other exit has its own code, as in `src/server/account-block.ts`. Messages go
  to standard error and hold no database error, path of a player's data or address.
- **Change:** `src/server/database.ts` · `src/server/account-backup.ts` ·
  `tests/account-backup.test.mjs` · `tests/deploy/test_account_backup_stream.py` ·
  `foundations/part_map.md`
- **Read:** `docs/task-cycles/kopia-bazy/task-frozen.md:17-18` To do 1 ·
  `docs/task-cycles/kopia-bazy/task-frozen.md:198-198` Settlements to record, row 3 ·
  `docs/task-cycles/kopia-bazy/spec.md:33-46` Constraints ·
  `docs/task-cycles/kopia-bazy/spec.md:51-71` 1. How the consistent copy is made ·
  `docs/task-cycles/kopia-bazy/spec.md:72-87` 2. The operator command ·
  `docs/task-cycles/kopia-bazy/spec.md:88-96` 3. How the file leaves the container ·
  `docs/task-cycles/kopia-bazy/spec.md:268-280` 14. Units and their interfaces ·
  `docs/task-cycles/kopia-bazy/spec.md:281-299` 15. Tests ·
  `docs/task-cycles/kopia-bazy/spec.md:358-367` Left to the maker ·
  `foundations/decisions.md:3-15` D-01 · `foundations/decisions.md:352-375` D-17 ·
  `foundations/decisions.md:1386-1397` D-73 · `foundations/decisions.md:1492-1503` D-81 ·
  `foundations/decisions.md:1518-1529` D-83 · `foundations/decisions.md:1531-1542` D-84 ·
  `foundations/decisions.md:1985-1996` D-112 · `foundations/decisions.md:1998-2011` D-114 ·
  `foundations/decisions.md:2549-2562` D-137 · `foundations/decisions.md:3594-3613` D-205 ·
  `foundations/invariants.md:688-696` account-save-durable-storage ·
  `foundations/invariants.md:698-706` account-save-sqlite-access ·
  `foundations/invariants.md:758-766` account-schema-lifecycle ·
  `foundations/invariants.md:768-776` account-database-schema ·
  `foundations/environment_facts.md:33-37` mikrus-host-swap ·
  `foundations/environment_facts.md:250-254` node-sqlite-database ·
  `foundations/environment_facts.md:316-320` sqlite-wal-concurrency ·
  Foundation entries rows E1, E2, E4, E10, E17, E18, E22 ·
  `guidelines/coding.md` · `guidelines/coding-database-access.md` · `guidelines/testing.md` ·
  `src/server/account-block.ts` · `tests/account-storage.test.mjs:1751-1795` ·
  `tests/deploy/test_account_storage.py` · `tests/invariants/account_container_support.py` ·
  `.the-way/elements/part-map/skill/SKILL.md`
- **Model:** cheaper
- **Risk:** trust boundary — `src/server/**`: a new command that puts every address and password hash
  on standard output
- **Checks:** start from `npm test -- tests/account-backup.test.mjs`, failing: on real SQLite files,
  with a separate writer process running, the backup finishes, opens and holds what was committed
  before it started, a row only in the write-ahead log included; a backup larger than a pipe's
  buffer arrives whole; a reader that goes away gives a non-zero exit; the refusals print nothing
  and do not open the database; a missing file creates nothing; nothing stays in the temporary
  directory. Then `npm test -- tests/account-storage.test.mjs` ·
  `npm test -- tests/deploy/test_account_backup_stream.py`, the bytes of `docker exec` without a
  terminal opening as the database, skipped and reported unchecked where no daemon answers ·
  `python -B .the-way/elements/common/foundation_check.py`, `tests/account-backup.test.mjs` claimed
  by `account-server` through `the-way-update-part-map`
- **Depends on:** Foundation entries E1, E2, E4, E10, E17, E18, E22

### Slice 2 — The Node.js release check in the image build

- **Goal:** `src/server/account-database-check.ts`, built like the rest of `src/server`, creates a
  temporary database through `AccountDatabase`, writes an account and a saved game state, reads them
  back, makes a backup by the method of Slice 1, opens the backup, reads the same values, removes
  its files, prints the Node.js release it checked and exits 0; any difference or error exits
  non-zero. A `RUN` step of the final stage of `Dockerfile`, after `dist` is copied and after
  `USER node`, runs it, so no image exists without having passed on its own release, and a failure
  fails `docker compose build`. The deployment's exit 7 and the running containers are as they were.
  The Node.js image stays unpinned. Nothing of this slice names the backup script.
- **Change:** `src/server/account-database-check.ts` · `Dockerfile` ·
  `tests/account-database-check.test.mjs` · `tests/invariants/test_account_save_sqlite_upgrade.py` ·
  `foundations/part_map.md`
- **Read:** `docs/task-cycles/kopia-bazy/task-frozen.md:30-30` To do 6 ·
  `docs/task-cycles/kopia-bazy/task-frozen.md:143-143` Questions carried to cycle, first row ·
  `docs/task-cycles/kopia-bazy/task-frozen.md:135-136` Context, the Node.js release ·
  `docs/task-cycles/kopia-bazy/spec.md:33-46` Constraints ·
  `docs/task-cycles/kopia-bazy/spec.md:51-71` 1. How the consistent copy is made ·
  `docs/task-cycles/kopia-bazy/spec.md:177-195` 9. The Node.js release check ·
  `docs/task-cycles/kopia-bazy/spec.md:268-280` 14. Units and their interfaces ·
  `docs/task-cycles/kopia-bazy/spec.md:281-299` 15. Tests ·
  `docs/task-cycles/kopia-bazy/spec.md:358-367` Left to the maker ·
  `foundations/decisions.md:3-15` D-01 · `foundations/decisions.md:305-323` D-15 ·
  `foundations/decisions.md:352-375` D-17 · `foundations/decisions.md:1386-1397` D-73 ·
  `foundations/decisions.md:1531-1542` D-84 · `foundations/decisions.md:1985-1996` D-112 ·
  `foundations/decisions.md:1998-2011` D-114 ·
  `foundations/invariants.md:15-23` account-server-typecheck ·
  `foundations/invariants.md:135-143` loop2-deploy-keeps-running ·
  `foundations/invariants.md:698-706` account-save-sqlite-access ·
  `foundations/environment_facts.md:250-254` node-sqlite-database ·
  Foundation entries rows E2, E13, E17, E22 ·
  `guidelines/coding.md` · `guidelines/coding-database-access.md` · `guidelines/testing.md` ·
  `src/server/account-block.ts` · `src/server/database.ts` ·
  `tests/invariants/loop2_invariant_support.py:430-500` ·
  `tests/invariants/test_account_server_typecheck.py:125-235` ·
  `.the-way/elements/part-map/skill/SKILL.md`
- **Model:** cheaper
- **Risk:** trust boundary — `src/server/**`: a new file there that every image build runs
- **Checks:** start from `npm test -- tests/account-database-check.test.mjs`, failing: on the real
  Node.js the check passes and prints the release, and on a temporary directory that cannot be
  written it exits non-zero. Then `npm test -- tests/invariants/test_account_save_sqlite_upgrade.py`,
  citing `account-save-sqlite-upgrade` and seen failing once: `Dockerfile` as it stands has the step
  in the final stage, after `dist`. Then `npm test -- tests/invariants/test_account_server_typecheck.py`
  · `npm test -- tests/deploy/test_account_storage.py`, a real image build going through the step,
  skipped and reported unchecked where no daemon answers ·
  `python -B .the-way/elements/common/foundation_check.py`, the first test file claimed by
  `account-server` and the second by `deployment` through `the-way-update-part-map`
- **Depends on:** Slice 1 · Foundation entries E2, E13, E17, E22

### Slice 3 — The nightly backup script and its schedule

- **Goal:** `deploy/loop2-backup`, a Bash script with no argument and a marked constants block
  between the same markers as `deploy/loop2-deploy`, makes one night's backup in the order of spec
  decision 8: it checks that the key can be read, takes `/run/loop2-deploy.lock` with the
  deployment's wait of 900 seconds, streams the command of Slice 1, asked for by its fixed word
  through `docker exec` without `-t`, through `age` into one file in a private temporary directory on
  the host, and releases the lock. Only if every stage of the pipe exited 0 and the file is not empty
  does it log the weekday file and the ciphertext's size and send: `rsync` over `ssh` into the home
  directory on `strych.mikr.us`, one of seven names `loop2-accounts-<1..7>.sqlite.age` by the UTC
  date's day of the week, whole-file, keeping the file's time, in batch mode with strict host-key
  checking against `/etc/loop2/strych-known-hosts`, with no deleting option and no remote listing.
  Each step is bounded in time. `/var/log/loop2-backup.log` holds each attempt's start and end, the
  weekday file and size, and the stage and exit code of a failure; the error text of `docker`, `age`
  and `flock` goes there alone, and that of `ssh` and `rsync` reaches no file. One handler at the
  exit makes any non-zero end, from any cause, call `pusher` once with a fixed subject and fixed text
  saying only that the backup failed. `deploy/loop2-backup.cron` starts the script as root at 03:17
  daily with cron's mail off. No access value stands in either file.
- **Change:** `deploy/loop2-backup` · `deploy/loop2-backup.cron` · `tests/deploy/backup_script_support.py` ·
  `tests/deploy/test_loop2_backup.py` · `tests/invariants/test_account_save_backup_encrypted.py` ·
  `tests/invariants/test_account_save_backup_failure_notice.py` · `tests/quality/test_quality_invariants.py` ·
  `tests/invariants/test_account_server_typecheck.py` · `foundations/part_map.md`
- **Read:** `docs/task-cycles/kopia-bazy/task-frozen.md:17-26` To do 1 to 4 ·
  `docs/task-cycles/kopia-bazy/task-frozen.md:197-205` Settlements to record, rows 2 to 10 ·
  `docs/task-cycles/kopia-bazy/spec.md:33-46` Constraints ·
  `docs/task-cycles/kopia-bazy/spec.md:47-50` Decisions, the two words ·
  `docs/task-cycles/kopia-bazy/spec.md:72-87` 2. The operator command ·
  `docs/task-cycles/kopia-bazy/spec.md:88-96` 3. How the file leaves the container ·
  `docs/task-cycles/kopia-bazy/spec.md:97-114` 4. Encryption ·
  `docs/task-cycles/kopia-bazy/spec.md:115-123` 5. Compression, capacity ·
  `docs/task-cycles/kopia-bazy/spec.md:124-132` 6. Sending, access and the host key ·
  `docs/task-cycles/kopia-bazy/spec.md:133-155` 7. How older copies go ·
  `docs/task-cycles/kopia-bazy/spec.md:156-176` 8. Hour, deployment, log, notice ·
  `docs/task-cycles/kopia-bazy/spec.md:268-280` 14. Units and their interfaces ·
  `docs/task-cycles/kopia-bazy/spec.md:281-299` 15. Tests ·
  `docs/task-cycles/kopia-bazy/spec.md:300-303` 16. Settled by the orchestrator ·
  `docs/task-cycles/kopia-bazy/spec.md:358-367` Left to the maker ·
  `foundations/decisions.md:216-229` D-10 · `foundations/decisions.md:253-271` D-12 ·
  `foundations/decisions.md:273-286` D-13 · `foundations/decisions.md:326-350` D-16 ·
  `foundations/decisions.md:352-375` D-17 · `foundations/decisions.md:696-709` D-31 ·
  `foundations/decisions.md:1386-1397` D-73 · `foundations/decisions.md:1531-1542` D-84 ·
  `foundations/decisions.md:2937-2950` D-163 ·
  `foundations/invariants.md:15-23` account-server-typecheck ·
  `foundations/invariants.md:155-163` loop2-host-sharing ·
  `foundations/invariants.md:428-436` shellcheck-source-rules ·
  `foundations/environment_facts.md:33-37` mikrus-host-swap ·
  Foundation entries rows E1, E3, E4, E5, E6, E8, E9, E14, E15, E19, E20, E21, E22 ·
  `guidelines/coding.md` · `guidelines/testing.md` · `deploy/loop2-deploy` ·
  `tests/deploy/deploy_script_support.py` · `tests/invariants/test_loop2_deploy_keeps_running.py:1-60` ·
  `tests/invariants/loop2_invariant_support.py:355-392` ·
  `.the-way/elements/part-map/skill/SKILL.md`
- **Model:** same — one wrong exit status in a pipe or in the exit handler sends a plain file or
  ends in silence, and the slice reaches deployment, build-tools and the part map together.
- **Risk:** trust boundary — `deploy/**` and the new keys: a script that names the paths of the
  encryption key and of the file of Strych's host key, and talks to Strych and `pusher` · cannot be
  undone — replacing the seven-day-old backup on Strych, which only the schedule a human installs
  ever does; no test, and no agent, reaches Strych or runs the script on the server
- **Checks:** with stand-ins for `docker`, `age`, `rsync`, `flock`, `pusher` and `date` through a
  seam of the kind of `tests/deploy/deploy_script_support.py`, start from these two, each citing its
  invariant and seen failing once: `npm test -- tests/invariants/test_account_save_backup_encrypted.py`,
  where a failing or absent key or `age` means `rsync` never runs, and
  `npm test -- tests/invariants/test_account_save_backup_failure_notice.py`, where each failing step,
  a stopped container and the send among them, gives exactly one `pusher` call with the fixed text.
  Then `npm test -- tests/deploy/test_loop2_backup.py`: the order of the steps; `docker exec` with the
  fixed word and without `-t`; a marker fed as the database reaches neither `pusher`, nor the log, nor
  `rsync`; a sentinel login on `rsync`'s standard error with a failing exit is absent from the log
  and the notice, while the log holds the stage, that exit code and the ciphertext's size; no
  deleting option and one of exactly seven names over a week; no remote listing; the host-key options
  stand; the schedule's file starts once a day at 03:17 as root with mail off. Then
  `npm test -- tests/quality/test_quality_invariants.py`, `deploy/loop2-backup` named in its list of
  Bash scripts · `npm test -- tests/invariants/test_account_server_typecheck.py`, its tripwire for
  deployment files extended by the two new files under *Changing an existing test*, since `deploy/*`
  counts them and neither deploys anything · `npm test -- tests/invariants/test_account_server_runtime.py`
  · `python -B .the-way/elements/common/foundation_check.py`, the two new files of
  `tests/invariants/` claimed by `deployment` through `the-way-update-part-map`
- **Depends on:** Slice 1 · Slice 2, for `foundations/part_map.md` · Foundation entries E1, E3, E4,
  E5, E6, E8, E9, E14, E15, E19, E20, E21, E22

### Slice 4 — Three installed copies compared at each deployment

- **Goal:** `compare_installed_script` in `deploy/loop2-deploy` compares three pairs instead of one:
  the installed deploy script, the installed `/usr/local/bin/loop2-backup` and the installed
  `/etc/cron.d/loop2-backup`, each with its source at the deployed commit (`deploy/loop2-deploy`,
  `deploy/loop2-backup`, `deploy/loop2-backup.cron`). A difference, an unreadable installed copy or a
  commit without the source only warns, in the same words of kind, and the run goes on. Nothing else
  of the deployment changes. The new paths stand in the constants block.
- **Change:** `deploy/loop2-deploy` · `tests/deploy/deploy_script_support.py` ·
  `tests/deploy/test_loop2_deploy_build.py`
- **Read:** `docs/task-cycles/kopia-bazy/spec.md:33-46` Constraints ·
  `docs/task-cycles/kopia-bazy/spec.md:196-201` 10. Comparing the installed copies ·
  `docs/task-cycles/kopia-bazy/spec.md:268-280` 14. Units and their interfaces ·
  `docs/task-cycles/kopia-bazy/spec.md:281-299` 15. Tests ·
  `docs/task-cycles/kopia-bazy/spec.md:358-367` Left to the maker ·
  `foundations/decisions.md:305-323` D-15 · `foundations/decisions.md:326-350` D-16 ·
  `foundations/decisions.md:352-375` D-17 · `foundations/decisions.md:1386-1397` D-73 ·
  `foundations/decisions.md:1531-1542` D-84 ·
  `foundations/invariants.md:125-133` loop2-deploy-trigger-input ·
  `foundations/invariants.md:135-143` loop2-deploy-keeps-running ·
  `foundations/invariants.md:155-163` loop2-host-sharing ·
  `foundations/invariants.md:428-436` shellcheck-source-rules ·
  Foundation entries row E4 · `guidelines/coding.md` · `guidelines/testing.md`
- **Model:** cheaper
- **Risk:** trust boundary — `deploy/**`: the script the automation's key runs
- **Checks:** start from a failing case in `npm test -- tests/deploy/test_loop2_deploy_build.py`: each
  of the two new pairs, differing, warns and the deployment goes on; all three equal gives no
  warning. `deployable_commit` and `install` of the fixture now carry the three pairs from the
  repository's own files. A commit without the sources warns for each pair; the change of
  `test_commit_without_the_script_warns_then_fails_the_build_with_7` follows *Changing an existing
  test*, its reason being spec decision 10. Then each of `npm test -- tests/deploy/test_loop2_deploy_switch.py`
  · `npm test -- tests/deploy/test_loop2_deploy_commit.py` · `npm test -- tests/deploy/test_loop2_deploy_input.py`
  · `npm test -- tests/invariants/test_loop2_deploy_keeps_running.py` ·
  `npm test -- tests/invariants/test_loop2_deploy_trigger_input.py` ·
  `npm test -- tests/invariants/test_loop2_host_sharing.py` ·
  `npm test -- tests/quality/test_quality_invariants.py`
- **Depends on:** Slice 3, whose two files the fixture commits · Foundation entries E4

### Slice 5 — The launcher of the restore trial

- **Goal:** `scripts/restore-trial.mjs`, Node.js built-ins only, run by the owner on his computer,
  takes the built image, the decrypted database file, a marker text and the test account's address
  as arguments and the password on standard input, never as an argument. It starts one container
  from the image on a fresh temporary volume holding that file, on a synthetic session key and SMTP
  password file, with the production settings of `compose.yaml`. Through the server's HTTP port, from
  inside the container, with Cloudflare's headers, it logs in and reads `GET /api/saved-game`. It
  prints the Node.js release, the login's status, the save's revision, whether the marker stands in
  the saved game state, and PASS or FAIL, with an exit code that says which. It prints no game text,
  no address and no password, sends no mail, and removes its container and volumes after every end,
  a failure included.
- **Change:** `scripts/restore-trial.mjs` · `tests/deploy/test_restore_trial.py`
- **Read:** `docs/task-cycles/kopia-bazy/task-frozen.md:27-29` To do 5 ·
  `docs/task-cycles/kopia-bazy/task-frozen.md:207-207` Settlements to record, row 12 ·
  `docs/task-cycles/kopia-bazy/spec.md:33-46` Constraints ·
  `docs/task-cycles/kopia-bazy/spec.md:214-214` 11, step H2.4a ·
  `docs/task-cycles/kopia-bazy/spec.md:225-247` 12. The restore trial ·
  `docs/task-cycles/kopia-bazy/spec.md:268-280` 14. Units and their interfaces ·
  `docs/task-cycles/kopia-bazy/spec.md:281-299` 15. Tests ·
  `docs/task-cycles/kopia-bazy/spec.md:358-367` Left to the maker ·
  `foundations/decisions.md:1386-1397` D-73 · `foundations/decisions.md:1531-1542` D-84 ·
  `foundations/decisions.md:964-977` D-49 · `foundations/decisions.md:1944-1957` D-110 ·
  `foundations/decisions.md:1959-1970` D-111 ·
  `foundations/invariants.md:748-756` account-startup-configuration ·
  Foundation entries rows E1, E7, E22 · `guidelines/coding.md` · `guidelines/testing.md` ·
  `scripts/measure-passwords.mjs` · `compose.yaml` · `tests/deploy/test_account_storage.py` ·
  `tests/invariants/account_container_support.py`
- **Model:** cheaper
- **Risk:** none
- **Checks:** start from `npm test -- tests/deploy/test_restore_trial.py`, failing: its refusals run
  without Docker, a password given as an argument among them; its run, where a daemon answers,
  otherwise skipped and reported unchecked, takes a database the test makes with a synthetic account
  and a saved game state holding a marker, and gives PASS, FAIL on a wrong password and FAIL on an
  absent marker, with neither address, password nor game text in the output and no container or
  volume left. Then `npm test -- tests/quality/test_quality_invariants.py` for ESLint and Prettier on
  `scripts/**`
- **Depends on:** Slice 2, whose image it runs · Foundation entries E1, E7, E22

### Slice 6 — The loop2-deploy skill

- **Goal:** both copies of the skill, byte-identical, describe all of the above. A new
  `references/backup_and_restore.md` holds every item of spec decision 13's list. `SKILL.md` gains its
  resource table rows, its agent lists and a description that names backups, and it and
  `references/troubleshooting.md` read exit 7 with the release check's failure. The sentences at
  `references/setup_and_secrets.md:299`–`300` and `references/troubleshooting.md:101`–`102` and
  `:128`–`129` stop saying that nothing copies the database off the server. The skill names no Mikrus
  host or address, web pages included: it points to the constants block of `deploy/loop2-backup` and
  names Mikrus's pages in words. Every procedure is a human's: no instruction has an agent install,
  run the backup, restore, change a key, make the hand run of the send, or list Strych.
  `tests/agent_workflow/test_loop2_deploy_skill.py` gains the new file in its list and keeps its
  pattern.
- **Change:** `.claude/skills/loop2-deploy/SKILL.md` ·
  `.claude/skills/loop2-deploy/references/backup_and_restore.md` ·
  `.claude/skills/loop2-deploy/references/setup_and_secrets.md` ·
  `.claude/skills/loop2-deploy/references/troubleshooting.md` · `.agents/skills/loop2-deploy/SKILL.md` ·
  `.agents/skills/loop2-deploy/references/backup_and_restore.md` ·
  `.agents/skills/loop2-deploy/references/setup_and_secrets.md` ·
  `.agents/skills/loop2-deploy/references/troubleshooting.md` ·
  `tests/agent_workflow/test_loop2_deploy_skill.py`
- **Read:** `docs/task-cycles/kopia-bazy/task-frozen.md:31-33` To do 7 ·
  `docs/task-cycles/kopia-bazy/task-frozen.md:137-138` Context, what a restore undoes ·
  `docs/task-cycles/kopia-bazy/task-frozen.md:157-161` Human actions ·
  `docs/task-cycles/kopia-bazy/task-frozen.md:201-202` Settlements to record, rows 6 and 7 ·
  `docs/task-cycles/kopia-bazy/spec.md:6-11` Intent ·
  `docs/task-cycles/kopia-bazy/spec.md:47-50` Decisions, the two words ·
  `docs/task-cycles/kopia-bazy/spec.md:72-87` 2. The operator command ·
  `docs/task-cycles/kopia-bazy/spec.md:97-114` 4. Encryption ·
  `docs/task-cycles/kopia-bazy/spec.md:115-123` 5. Compression, capacity ·
  `docs/task-cycles/kopia-bazy/spec.md:124-132` 6. Sending, access and the host key ·
  `docs/task-cycles/kopia-bazy/spec.md:133-155` 7. How older copies go ·
  `docs/task-cycles/kopia-bazy/spec.md:156-176` 8. Hour, deployment, log, notice ·
  `docs/task-cycles/kopia-bazy/spec.md:177-195` 9. The Node.js release check ·
  `docs/task-cycles/kopia-bazy/spec.md:196-201` 10. Comparing the installed copies ·
  `docs/task-cycles/kopia-bazy/spec.md:202-224` 11. What is installed, from where, in what order ·
  `docs/task-cycles/kopia-bazy/spec.md:225-247` 12. The restore trial ·
  `docs/task-cycles/kopia-bazy/spec.md:248-267` 13. The skill ·
  `foundations/decisions.md:253-271` D-12 · `foundations/decisions.md:273-286` D-13 ·
  `foundations/decisions.md:305-323` D-15 · `foundations/decisions.md:326-350` D-16 ·
  `foundations/decisions.md:352-375` D-17 · `foundations/decisions.md:2549-2562` D-137 ·
  `foundations/decisions.md:3724-3766` D-209 ·
  Foundation entries rows E1, E3, E4, E5, E6, E7, E9, E12 ·
  `guidelines/coding.md` · `guidelines/testing.md` · the files Slices 1 to 5 made, by name:
  src/server/account-backup.ts, deploy/loop2-backup, deploy/loop2-backup.cron and
  scripts/restore-trial.mjs, for the names of stages, exit codes and arguments
- **Model:** cheaper
- **Risk:** cannot be undone — the skill holds the human's procedures for restoring over the server's
  database and for changing the encryption key; the slice only writes them, and no instruction of an
  agent performs them
- **Checks:** `npm test -- tests/agent_workflow/test_loop2_deploy_skill.py`, its list of files
  extended first, so that both copies, the new file included, stay byte-identical and hold neither
  an IPv6 address nor a Mikrus server name and the description stays short and safe
- **Depends on:** Slice 1 · Slice 2 · Slice 3 · Slice 4 · Slice 5 · Foundation entries E1, E3, E4,
  E5, E6, E7, E9, E12

### Slice 7 — The testing guideline

- **Goal:** `guidelines/testing.md`, changed through `the-way-maintain-testing-guidelines` and in its
  own language, knows the code that talks to Strych and `pusher`. The row at line 56 gains the
  answer of spec decision 15: no test reaches them, the script's reactions are shown with stand-ins
  that prove reactions and not delivery, and a human checks the real contact when the way of talking
  to them changes. The count of departures at line 10 takes the decision of row E8, and the rule's
  *Decision* field names it. The trust-boundary rows of `src/server/` and `deploy/` name the
  command's refusals and the script's refusal to send with the test cases that show them. The
  recipes' files and *Where in code* name the new test files. Its meaning goes to the human through
  the request (WAY-172), and the executor's report gives the changed meaning in one sentence for that.
- **Change:** `guidelines/testing.md`
- **Read:** `docs/task-cycles/kopia-bazy/task-frozen.md:37-37` To do 9 ·
  `docs/task-cycles/kopia-bazy/spec.md:281-299` 15. Tests ·
  `docs/task-cycles/kopia-bazy/spec.md:304-357` Foundation entries ·
  `foundations/decisions.md:1386-1397` D-73 · `foundations/decisions.md:1466-1477` D-79 ·
  `foundations/decisions.md:1531-1542` D-84 · `foundations/decisions.md:2937-2950` D-163 ·
  Foundation entries rows E8, E11, E13, E14, E15 · `guidelines/coding.md` ·
  `.the-way/product-guidelines/testing/SKILL.md` · `.the-way/product-guidelines/testing/template.md`
  · the test files Slices 1, 2, 3 and 5 made, by name: tests/account-backup.test.mjs,
  tests/account-database-check.test.mjs, tests/deploy/test_account_backup_stream.py,
  tests/deploy/test_loop2_backup.py, tests/invariants/test_account_save_sqlite_upgrade.py,
  tests/invariants/test_account_save_backup_encrypted.py,
  tests/invariants/test_account_save_backup_failure_notice.py and tests/deploy/test_restore_trial.py,
  for the names of their cases
- **Model:** cheaper
- **Risk:** none
- **Checks:** `python -B .the-way/elements/common/foundation_check.py`, every identifier and invariant
  the guideline names resolving
- **Depends on:** Slice 1 · Slice 2 · Slice 3 · Slice 5 · Foundation entries E8, E11, E13, E14, E15

## Coverage

| What the task requires | Slices or entries |
|---|---|
| Need: a completed, consistent backup outside the game server, with a checked restore | E1, E12, Slices 1, 3, 5; the human's H2 and H3 clear E12's mark by a later commit outside this plan |
| To do 1 — nightly by cron, a short command in the running `loop2` container; only a complete, consistent backup counts | Slice 1 (the command), Slice 3 (the schedule and the pipe's exit statuses), E3, E4 |
| To do 2 — a script outside the checkout sends each finished backup to Strych; source in the repository; 7 stay; older ones go | Slice 3, E3, E4; the human installs it in H2 |
| To do 2 — the capacity sentence | spec decision 5: the skill states the 25 MB limit per backup (Slice 6), the log records each size (Slice 3), the sum stands in the human's H3 |
| To do 3 — encrypted on the game server before it leaves; the key outside the checkout with a private copy | Slice 3, E5, E9, E14, E20; the human makes the key in H2 |
| To do 4 — on failure the script outside the container calls `pusher`, which carries no player's data | Slice 3, E6, E15, E19 |
| To do 5 — restore checked without the old server, on the owner's computer, once, before the merge | Slice 5 (the launcher), Slice 6 (the order of the steps), E7; the human's H3 performs it |
| To do 6 — each Node.js release deployed has passed read, write and backup checks | Slice 2, E2, E13 |
| To do 7 — the skill, in both copies, with the sentences that stop being true | Slice 6 |
| To do 8 — the foundation entries | E1 to E22; the file claims in Slices 1, 2, 3 |
| To do 9 — the testing guideline, through its skill, with the human's approval | Slice 7, E8, E11; the approval through the request |
| Settlements row 1 | E3, Slice 3 |
| Settlements row 2 | E4, Slice 3 |
| Settlements row 3 | E10, Slice 1 |
| Settlements row 4 | E5, Slice 3 |
| Settlements row 5 | E14, Slice 3 |
| Settlements row 6 | E9, Slice 3, Slice 6 |
| Settlements row 7 | E9, Slice 6 |
| Settlements row 8 | E6, Slice 3 |
| Settlements row 9 | E6, Slice 3 |
| Settlements row 10 | E15, Slice 3 |
| Settlements row 11 | E19 |
| Settlements row 12 | E7, Slices 5, 6 |
| Projected "Which failure does the database backup survive?" | E1 |
| Projected "How does the account and save server access SQLite?" | E2 |
| Projected `account-save-backup/1` | E12 |
| Projected `account-save-sqlite-upgrade/1` | E13, Slice 2 |
| Spec: the comparison of the installed copies (carried row 10) | Slice 4 |
| Spec: the entries it adds — E8, E11, E16, E17, E18, E20, E21, E22 | those rows |
| Human actions H1, H4 | done before the cycle; no slice |
| Human actions H5, H2, H3 and clearing E12's mark | the human's and a later commit; no slice; Slices 3, 5 and 6 prepare what they need |

## Choices

| Choice | Way rejected | Cost if wrong |
|---|---|---|
| The foundation entries come before Slice 1, the invariants among them, because a test's `invariant:` line must name an existing entry | Writing each invariant in the slice of its test — a decision's *Verification* would name an invariant that does not yet exist until that slice | The invariants of E13 to E15 read true for a few commits on the task branch; nothing merges before the slices |
| Each slice claims its own new files in the part map; responsibilities and *External context* go with the entries | All part-map changes with the entries — a claim of a file that does not yet exist, against the skill's rule | Three slices touch `foundations/part_map.md`, so Slice 3 waits on Slice 2 |
| The `build-tools` responsibility gains the launcher, as it names the password measurement's | Leaving that sentence as the spec's "keeps `scripts/**`" reads — the file is claimed, but the part's sentence stops saying what it launches | One clause in the part map |
| Proposed identifiers E14 and E15, so the slices can name their test files | Leaving the paths open — *Change* needs a path, and the mechanical check compares it | The writer picks another identifier and the test file's name follows it |
| One slice for the command, its method and both of its tests, the smoke test included | A slice of its own for the smoke test — one goal, the stream of `docker exec`, cut in two | A Docker build in Slice 1's checks |
| The release check after the command, standing alone from the script | The check first, holding the method — the method's hardest case, a writer beside the backup, belongs to the command's test | Slice 2 waits on Slice 1 for one method |
| The check's `RUN` after `USER node`, the server's own user | Before it, as root — passes on files the server could not touch | One line's place in `Dockerfile` |
| A new `tests/deploy/backup_script_support.py` that imports helpers from `tests/deploy/deploy_script_support.py` without changing it | Generalizing the existing seam — a change under every deployment test, in a slice already at risk | Some stub code repeated |
| The two new deploy files added to the tripwire's list in `tests/invariants/test_account_server_typecheck.py` | Narrowing `deploy/*` in the shared reader — it also feeds the Node.js version check, which should keep reading the new files | The list holds two files that are no deployment route; the request names this altered invariant test (WAY-03) |
| The comparison after the script, since the fixture commits the real sources | Before it, with invented sources — a test fixture that names files the repository lacks | Slice 4 waits on Slice 3 |
| The launcher's tests in Python at `tests/deploy/test_restore_trial.py`, reusing the container helpers, the file already claimed by `tests/deploy/**` | A Node test as for the password measurement — it would rebuild the helpers for volumes and synthetic secrets, and its fake `docker` proves no real restore | A Python test for a Node script; refusals run by a subprocess |
| The skill before the guideline, each after the code it describes | The guideline with its tests in Slices 1 and 3 — it names cases of several slices and goes to the human as one meaning | None; the two are independent |
| Both copies of the skill in one slice | One slice per copy — they must be byte-identical at every commit | None |
