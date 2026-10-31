FAIL d8b1482

# Review of the whole change — kopia-bazy

Range `95de83b..d8b1482`, `git rev-parse HEAD` = `d8b14826d0d7aab5c524c9b4d45123990cec2b8d`. Four blocking findings, 37 Minor, 22 out of scope (the declined lines below).

The backup itself holds: the command, the script, the encryption, the retention, the notice, the release check and the comparison of installed copies all do what the task and the spec ask, and I found no way to send a plain file, delete on Strych or end a failed run in silence. All four blocking findings lie at the seams: one error the launcher swallows, one proof the procedure cannot show, and restatements of entries this change writes.

## Important (blocking)

### I1. The launcher says PASS and exit 0 when it could not tell that its volumes are gone

- **From:** slice 5, commit `46614c6`. This review is its only one.
- **Place:** `scripts/restore-trial.mjs:492-530`, the listing at `:500-512`; the contract at `:27-28`.
- **What is wrong:** `cleanup()` reads no status. `rm`, `volume rm`, `ps` and `volume ls` may all fail; a failed listing has empty output, so `left` is empty, the first attempt returns "nothing left", and the verdict stands. Exit 4, "a container or volume could not be removed and is named", is reached only while Docker still answers.
- **Why it matters:** the data volume holds the plain database, every address and password hash. To do 5 ends in removing the backup from the computer, the plan's Goal says "after every end", and step 8 of the skill's trial removes only the files it names, so the owner has no other sign. This repository's rule is that a check that did not run is never a pass. A daemon that stops or restarts between the probe and the cleanup is enough.
- **Evidence:** a run of the launcher in `node:24-slim` with a stand-in `docker` that answers the trial and fails every removal and listing with "Cannot connect to the Docker daemon": `PASS`, `launcher exit 0`.
- **Fix:** a listing that did not exit 0 means unknown, not empty: exit 4, naming what was made. One test with a stand-in `docker`.

### I2. The trial's procedure cannot show that it ran the same commit

- **From:** spans slice 5 (`46614c6`) and slice 6 (`0ea27e1`). Regraded from M3 of slice 6's first review.
- **Place:** `.claude/skills/loop2-deploy/references/backup_and_restore.md:212`, and its copy in `.agents`; `scripts/restore-trial.mjs:358-364`; `Dockerfile:15`.
- **What is wrong:** step 4 reads "Build the image from a clean checkout of the same commit: `docker build -t <image> .`". No commit stands before it, and without `--build-arg LOOP2_COMMIT=<sha>` the label reads `unknown`, so the launcher prints `image revision: unknown`. Slice 5's report says that line exists "so H3 can tie the run to the commit"; the skill's command defeats it. The launcher's test builds with the argument, so it does not show this.
- **Why it matters:** "uruchomienie tego samego commitu" is part of what To do 5, settlement 12 and D-220's *complies* call a checked restore. H3 runs once, its report goes into the request's record at step 7, and with H2 it clears `account-save-backup`. A record reading `unknown` proves no commit, and a build at another commit passes unnoticed.
- **Evidence:** the lines above; `tests/deploy/test_restore_trial.py:298-300` passes the argument.
- **Fix:** name the commit, the head H5 deployed, and give `docker build --build-arg LOOP2_COMMIT=<sha> -t <image> .`, with a sentence that the report's revision must read that sha.

### I3. The skill restates D-218 without its qualification and D-13 more broadly

- **From:** slice 6, commit `0ea27e1`; the first half meets slice 1's command. Regraded from M7, under WAY-263: both entries are this change's.
- **Place:** `backup_and_restore.md:31-32` and `:23`, both copies.
- **What is wrong:**
  - `:31-32` says "so the plain database exists only inside the pipe". D-218 says "exists on the host only in that pipe", and D-217 says it rests in the container's writable layer for the run.
  - `:23` says "The key and the known-hosts file are secrets or access values (D-13)". D-13 does not name that file, and `:117` of the same file rightly calls its fingerprint no secret.
- **Why it matters:** the first is more than wording. A run killed by a signal leaves the plain database in the container's `/tmp` until the container is replaced (Minor 1), and the one reference a human reads says no such file can exist, so nobody looks. The second cites a decision for what it lacks and contradicts its own file.
- **Evidence:** in a container of this head, a SIGTERM to the command while it streamed: `command exit 143`, and `/tmp/loop2-backup-*/backup.sqlite` stayed, 6 225 920 bytes, directory 0700, file 0644.
- **Fix:** "exists on this host only inside the pipe; in the container it lies in `/tmp` for the seconds of the run, and a killed run can leave it there until the container is replaced". `:23`: the key is a secret (D-13); the known-hosts file holds none.

### I4. The command's guard is cited to decisions that do not hold it, and no entry holds it

- **From:** spans slice 1 (`49bfb74`), slice 7 (`d8b1482`) and the plan's *Foundation entries* (E4). It takes up Minor 3 of slice 1's first review and Minor 3 of its fix review.
- **Place:** `guidelines/testing.md:168`; `src/server/account-backup.ts:16-18`; D-217 and D-222 in `foundations/decisions.md`.
- **What is wrong:**
  - The guideline's row reads "Odmowa polecenia kopii bazy (D-217, D-222; bez niezmiennika)". Neither names the fixed word or any refusal, and `:156` of that guideline says "Oczekiwanie bierze się z decyzji uprawnień".
  - The code's comment cites D-217 for removing the directory "on every end". D-217 says no such thing, and I3's run disproves "every end".
  - Spec decision 2's fixed word and its "Only a human or the installed backup script runs the command" stand only in the skill. A search of `foundations/decisions.md` finds neither. D-137 holds exactly this for the block command, with a *violates* line for an agent running it through the `mikrus` MCP server. D-12 forbids an agent changes, not reads, and no entry names this command, so only the skill keeps an agent from sending every address and hash into its transcript.
- **Why it matters:** this is F3's fault again, which slice 1's review graded Important: a restatement broader than the entry (WAY-263). The rule "the command prints nothing without one word" guards the widest read of player data in the product, and once `.runs` is gone a reader following either citation finds nothing.
- **Evidence:** the texts of D-217 and D-222 at this head; the search named under *Checks*; slice 7's report, which names the citation as a choice.
- **Fix:** through `the-way-record-decision`, D-217 or an entry of its own gains the fixed word, the refusal before the database opens, and who may run the command, with D-137's *violates* line. The comment then says what the code does: a failure and a reader that goes away, not "every end". This may come with the return step's entries, but the row and the comment are false until it does.

## Minor

Grades of the slice reviews' findings as findings of this review, then new ones. "Stands" means I checked it at this head.

**Slice 1, first review**

1. Minor 1, a signal leaves a plain copy. Stands, reproduced under I3. It stays Minor: the same user reads the live database, the lock keeps a deployment away, and `timeout` ends the client, not the command (Docker's behaviour, not run here). The plan's "every end" is not literally met. The skill's silence is I3, the false citation I4.
2. Minor 2, D-217's "peaks at 58 MiB". Stands at `foundations/decisions.md`, D-217 *Rationale*: the figure is the backup step's; slice 1's reviewer measured the command at about 73 MiB, within the room of about 100 MiB. Not re-measured. The return step corrects it.
3. Minor 4, the host key and the release check's rejected ways: see *What the cycle holds open*.
4. Minor 5, `Method: test` before the tests. Closed: each of the three invariants has a citing test at this head.
5. Minor 6, `mikrus-pusher-mail` holds two sources. Stands.
6. Minor 7, the vanished-reader test does not pin exit 4. Stands, `tests/account-backup.test.mjs:404`.
7. Minor 8, a failed cleanup reports "No backup was made". Stands, `src/server/account-backup.ts:85-93`.
8. Minor 9, the part-map line by hand, and D-216's 385 beside the *Rejected* ways' 220, 110 and 1000. Stands; name it in the request. 25 000 000 / 65 536 gives 381, a difference in the source.

**Slice 1, review of the fix**

9. Minor 1, the step test has no time limit. Stands.
10. Minor 2, `rate: 5000` passes the test. Stands.
11. Minor 4, copying three files and a `sqlite3` tool are not in D-222. Stands; the return step adds them.

**Slice 2**

12. Minor 2 and the fix review's Minor 4, `copy` for the backup. Stands, `src/server/account-database-check.ts:69-73`, `tests/account-database-check-standin.mjs:35-41`.
13. Minor 3, the citation. Partly closed: the tests of the fix cite it at `:91` and `:109`; the two original tests do not.
14. Minor 4, a pattern that decides nothing. Stands.
15. Minor 5, the one-step assertion on a small database. Stands; no change needed.
16. Minor 6, H5.2's reading. Closed by `backup_and_restore.md:102-105`.
17. Fix review Minor 2, a variant cannot tell a difference from a broken stand-in. Stands.
18. Fix review Minor 3, two mutants survive. Stands.
19. Fix review Minor 5, a line of 141 characters. Stands.

**Slice 3**

20. Minor 2, the empty stream. Settled by Q14; the skill says it at `:71`, but `:72`'s "The script's checks stop an empty file" reads against it (M7).
21. Minor 3, no test holds `--kill-after`. Stands.
22. Minor 4, `tests/deploy/test_loop2_backup.py:17` names the wrong authority. Stands: Q13 is the orchestrator's choice.
23. Minor 5. Closed by the fix.
24. Fix review Minor 2, the branch "failure wins over the mark". Stands; leave it.
25. Fix review Minor 3, a signal no trap names keeps the lock until the stream's limit. Stands, bounded by 300 s.
26. Fix review Minor 4 with M7's fourth bullet: 138 to 142 are in the table, but a logged 1 is missing from the table at `backup_and_restore.md:50-61`.

**Slice 6 and the correction** (all stand)

27. M1 and N4, no mode at restore step 5; `install` gives 0755. State 0600.
28. M2, the fetch has no command and no comparison with the fingerprint on the owner's computer; "newest by time on Strych" names no way to read a time, beside `:12`'s "nothing lists Strych", which D-216 says of the script.
29. M4, two procedures name no actor. `:4-5` and `:187-189` cover them, so no agent is told to act.
30. M5, a restore across a key change names one key. `age` refuses loudly.
31. M6, nothing guards the time of a restore against a push to `main`.
32. M7's remaining bullets: `:144-146`'s code block lost its `\n` and continuations. It runs.
33. N1, N2, N3: the host whose message does not arrive; the session keys "by its section", which followed literally signs every player out; "the line before it".
34. C1 and C2: two lines lost their wrap; a second attempt from step 1 can overwrite the kept database.

**New**

35. Slice 5, tests. No test holds `--network none`, the memory limit, `--init`, the size comparison at `:398` or the label check at `:359`. Each is plain in the code; the size comparison would otherwise show as a failed start.
36. Slice 7. `guidelines/testing.md:149`'s *Decision* field lacks D-218, which the `deploy/` row at `:172` cites.
37. Slice 6. `backup_and_restore.md:106-109` states the no-merge window in a section titled for reinstalling: "this request's merge", and "Any other deployment replaces the image with one that has no backup command", which stops being true at this request's merge. It costs a later reader a needless window. D-216's *violates* "a name that leaves an eighth file there" also meets `loop2-send-trial.txt` at `:151`; the spec accepts that file, and the entry could say so. D-214's *Origin* says "the full approved entry", while Q9 changed "copy" to "backup" in its *Rationale*, *Rejected* and *Verification*; the decision's sentences stand word for word.

## What the cycle holds open

- **Spec decisions 6 and 9.** Judged: the return step owes both, and neither can be left out. Decision 6's choice stands in no entry: the strict check against `/etc/loop2/strych-known-hosts`, with `accept-new`, a disabled check and root's default `known_hosts` rejected. Without it `accept-new` can be proposed again. Decision 9 needs its own entry, as D-215 stands whole. Add the two ways of Minor 11, D-217's figure of Minor 2, and the source of cron's rule on a dot in a file name, which rests on no fact.
- **`account-save-backup`.** Correct: *Violated: yes*, *Method: review*. It must be cleared only after H2 and H3, by a commit changing that one field. I2 bears on what H3 can show.
- **Questions carried to cycle.** All eleven answered:

| Row | Answer in the change |
|---|---|
| Keeping the Node.js sentence | Check in the image build, `Dockerfile:29`, D-215; no pin |
| What makes the backup | `backup()`, D-222; `node-sqlite-database` extended |
| How the file leaves | `docker exec` standard output, D-217; `tests/deploy/test_account_backup_stream.py` |
| Encryption | `age` with the identity file, in the script's pipe, D-218 |
| How it reaches Strych, compression | `rsync`, none, D-216, D-218 |
| Host key | Strict check, `deploy/loop2-backup:233`; no entry yet, owed above |
| Older backups | Seven weekday files, D-216 |
| Hour, a deployment | 03:17, the shared lock, D-217 |
| Result of each try | `/var/log/loop2-backup.log`, D-219 |
| Comparing installed copies | Yes, `deploy/loop2-deploy`, D-217 |
| *Scope*, *Method*, *Rests on* | Set from the part map |

- **To do and settlements.** To do 1 to 4, 6, 8 and 9 are met by the commits; 5 is prepared, short of I1 and I2; 7 is met short of I3. Rows 1 to 12 stand in D-216, D-217, D-112, D-218, `account-save-backup-encrypted`, D-13, D-219, `account-save-backup-failure-notice`, `mikrus-pusher-mail` and D-220, each with the row's meaning. The four projected entries stand word for word. H5, H2 and H3 are the human's and have not run.
- **Questions of step 4.** Trust boundary: the command refuses every argument but its word before opening anything; the script takes no argument, reads nothing from Strych and sends only what `age` wrote; a stand-in-free run of the launcher's refusals shows no value it was given. Irreversible operations: the script holds no deleting option, and a restore and a key change are the human's written steps; no instruction has an agent perform one.
- **Altered invariant tests.** `test_no_other_deployment_route` (`account-server-typecheck`), narrowed by `NOT_ROUTES` and paired with the new `test_backup_script_starts_no_image`; `BASH_SCRIPTS` of `test_shellcheck_source_rules`. Both are sound; the request names them.
- **Own-work checks.** Slice 5's names the right weak point and its four ends hold, but it cannot catch I1, where Docker itself fails. Slice 7's checks that names exist, not that the cited decisions hold them, which is I4.

## Declined to judge

Out of scope or settled, each counted as out of scope:

1. A zero-byte file at `LOOP2_DATABASE_PATH`: same rule as the block command and D-112.
2. Strych's host name in the script's constants: spec decision 6 settles it.
3. `pusher` exiting 0 on an HTTP error: its own limit, which the script says at `deploy/loop2-backup:101-102`.
4. Prettier's patterns not covering new Node test files: a quality check older than this task.
5. `runBackup`'s deadline not waiting for the killed child.
6. A rollback to a commit from before this change builds an image without the step: the skill names it, and D-15 allows it.
7. The unpinned Node.js image: spec decision 9.
8. H3's image standing on another 24.x than the server's: spec decision 9.
9. What the server's real cron does with output or SIGPIPE: H2.8 is the human's.
10. SIGQUIT and signals landing during the handler: timing, with no sender here.
11. Whether a real `docker exec` can exit 0 on a cut stream: H3 holds that path.
12. A hostile game container flooding the log or temporary disk: a taken container is outside this task.
13. No rotation of `/var/log/loop2-backup.log`: nothing asked for it.
14. A source that is a symbolic link to the installed copy hides drift: merged code is trusted under D-16.
15. A directory at an installed path warns "differs".
16. The name `compare_installed_script` covering three copies, and "copy" in "installed copy": the plan's and D-16's words.
17. "Rotation — human sequences" in `setup_and_secrets.md` not listing the encryption key: `SKILL.md` points to the reference.
18. "About 385 accounts": the source's figure, Minor 8.
19. Whether Strych gives up a replaced file, how `pusher` delivers: H2 and H4.
20. Whether `rsync` installs from `apt` on a new host, and `/root` on another host.
21. A lost volume on a live host: a deployment makes an empty database, and nightly backups replace good ones within a week. Question 1 accepted that a fault noticed after a week has no clean backup.
22. Stripping a leading mark from a password that really begins with one: the human decided it.

## Checks

| Command or method | Result |
|---|---|
| `python -B .the-way/elements/common/foundation_check.py` | exit 0, 0 errors |
| `npm test -- tests/deploy/test_loop2_backup.py` | exit 0 |
| `npm test -- tests/invariants/test_account_save_backup_encrypted.py` | exit 0 |
| `npm test -- tests/invariants/test_account_save_backup_failure_notice.py` | exit 0 |
| `npm test -- tests/invariants/test_account_save_sqlite_upgrade.py` | exit 0 |
| `npm test -- tests/agent_workflow/test_loop2_deploy_skill.py` | exit 0 |
| `npm test -- tests/account-backup.test.mjs` | exit 0, 7 tests |
| `npm test -- tests/account-database-check.test.mjs` | exit 0 |
| `npm test -- tests/deploy/test_account_backup_stream.py` | exit 0, 1 test, a real build, no skip |
| `npm test -- tests/deploy/test_restore_trial.py` | exit 0, 13 tests, no skip |
| `npm test -- tests/deploy/test_loop2_deploy_build.py` | exit 0 |
| `npm test -- tests/invariants/test_account_server_typecheck.py` | exit 0 |
| `npm test -- tests/quality/test_quality_invariants.py` | exit 0 |
| Signal during streaming, in a container of this head, by a fifo with a slow reader | exit 143, the plain file stayed (I3) |
| The launcher with a stand-in `docker` whose cleanup fails, in `node:24-slim` | `PASS`, exit 0 (I1) |
| `cmp` of the four skill files in both copies | identical |
| `git diff --stat 67620ff~1 fa7eedb` | empty: the record's commits cancel out |
| Every `tests/...` path in `guidelines/testing.md`, and its quoted case names | present |
| Projected entries against `definicja_mvp_loop2.md:641-699`, `:1929-1969` | decision and invariant sentences word for word |
| Search of `foundations/decisions.md` for the fixed word and who runs the command | no hit |

Could not run, or not run: the full `npm test` at this head, which is the orchestrator's, the last at `e9350ae`. The other deploy and invariant test files, `test_loop2_host_sharing.py` among them, were not run by me: slice 7 and the correction changed none of what they read. H5, H2 and H3 and anything on the server or Strych: not allowed here. Mutants of slices 5 and 7: none run; the launcher's test gaps are read from its code. My Docker image and containers are removed, no process is left, and the worktree is clean.

## Reaches beyond the dispatch

- `foundations/decisions.md`: a script listed 99 decisions whose *Scope* names a touched part. **I read 30:** whole D-05, D-08 to D-17, D-31, D-84, D-110 to D-112, D-137, D-153, D-158, D-205, D-214 to D-222, and D-73 by its changed sentence. The other 69 cover HTTP, mail, passwords and the testing discipline, which the change does not reach; I did not read them whole, which falls short of step 2 of "Reading the foundation".
- `foundations/invariants.md`: the entries this change writes or changes, read whole; the others by name only, through the tests that cite them. `foundations/part_map.md`: the changed passages.
- `guidelines/coding.md` and `guidelines/coding-database-access.md`, whole. `guidelines/testing.md`: its diff, lines 1 to 162, and from 174 on with lines cut to 400 characters; lines 300 to 339, the recipes, in part. That falls short of "whole".
- `definicja_mvp_loop2.md` in the vault, for the fidelity of the projected entries.
- `.the-way/task-cycle/skill/return_step.md` and `SKILL.md`, for what the return step owes.
- The owner's rule files `scripts.md` and `search.md`, before the scratch scripts.

## Searches not found or unclear

- `foundations/` holds no entry for the fixed word, for who runs the command, for `/etc/loop2/strych-known-hosts` or for the strict host-key check (I4, and the return step's list).
- Whether the launcher's marker search meets a marker with a quote or a backslash: `body.save.game` is searched as given; not tried.
- Whether Docker Desktop's stop between probe and cleanup happens in practice: not measured. I1 rests on the code's contract.
- The command's peak memory: not re-measured.
- `test_restore_trial.py` took 28 s here against the author's 105 s. It reports no skip, and the build was cached; I take the difference to be that, unverified.
