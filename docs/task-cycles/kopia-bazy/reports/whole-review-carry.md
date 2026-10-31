# Minor and out-of-scope findings of the slice reviews, word for word

# Slice 1 and the foundation entries, first review — `reports/slice-1-review-report.md`

## Minor

1. **A signal leaves a plain copy of the database behind.** `src/server/account-backup.ts:56-88`. SIGTERM during streaming, in a 512 MiB container on node 24.22.1, left `/tmp/loop2-backup-*/backup.sqlite` at 33 058 816 bytes, and it stayed. The plan says "after every end". I graded it Minor on my own evidence, not on the author's reason: the directory is 0700 and owned by the same user who can read the live database, and a client that dies does not reach the command (see check 8). Handlers would also not cover SIGKILL, out-of-memory or a stopped container; the last I reason from Docker's behaviour and did not run. If the orchestrator reads "every end" literally this rises to Important. A sweep of stale `loop2-backup-*` directories at the start of a run would cover more of these paths than handlers. The author's reason, that handlers cannot be tested on this computer, is not true: the check above ran in a container from this computer.
2. **D-217's memory figure is not the command's.** `foundations/decisions.md:4008-4009` says the command "peaks at 58 MiB". The spec's figure is for the backup step of a separate measurement. The real command, streaming a 33 MB database to a slow reader, peaked at 74 984 KiB, about 73 MiB (VmHWM, 512 MiB container, node 24.22.1). That is still inside the room of about 100 MiB, so the design holds, but the entry should carry the measured number.
3. **D-217 does not say who may run the command.** Spec decision 2 says only a human or the installed script runs it, and only the skill forbids it to agents (Slice 6). D-12 lets an agent read the server, and D-137 holds this limit in the decision for the block command. One clause in D-217 would close this. Concern 1 of the foundation report does not list it. Check it again in the whole-change review.
4. **Concern 1, the host key and the release check's rejected ways.** See the judgement below. They belong to Slices 3 and 2, so they do not block here, but they must be written at the return step at the latest.
5. **`Method: test` before the tests exist.** `foundations/invariants.md`, E13, E14, E15. The template says an invariant whose test is not written reads `review` (WAY-61). The plan mandates this ordering and it becomes true by Slice 3, so it is a defect of the range only. The whole-change review should confirm each has a citing test seen failing once.
6. **`mikrus-pusher-mail` holds two sources.** `foundations/environment_facts.md:364-368`. A wiki page and a script are not pages of one edition (WAY-80, WAY-76), and each changes alone. Settlement row 11 is one row, so splitting needs care that the row's meaning stays. No reader is misled today.
7. **The vanished-reader test does not pin its exit code.** `tests/account-backup.test.mjs:352` asserts non-zero, not 4, while the plan gives each exit its own code and the other tests pin theirs.
8. **A failed cleanup reports the wrong thing.** `src/server/account-backup.ts:85-93`. If `rm` throws after the bytes went out, or after an output failure, the outer catch prints "No backup was made" and exits 1, while a plain copy may remain. The non-zero exit is the safe side; the text is wrong. Found by reading, not run.
9. **The part-map line was written by hand.** `foundations/part_map.md:70`. The plan and `AGENTS.md` route this through `the-way-update-part-map`. The line itself is correct, it claims the right file for the right part, and `foundation_check.py` passes. Name it in the request; nothing needs redoing. D-216's capacity figures are a related note for the human: `:3960` uses 385 accounts, counting the eighth file during a send, while the *Rejected* ways at `:3966` keep the task's 220, 110 and 1000, which do not. The template keeps those costs as the source gave them, so they stay, but they are not comparable with the 385.

## Judgement of the foundation report's concern 1

The recommendation, to leave the three matters out and name them in the request, does not stand, for two reasons. `return_step.md` says the return step writes "a choice that binds after the merge" and "No entry is deferred: one this request does not write is neither proposed nor listed for later." And the recommendation's premise, that the slices' tests hold the behaviour, is false for `rate` (F2).

| Matter | Judgement |
|---|---|
| Decision 1: one step, `VACUUM INTO`, default `rate`, `rate: -1` | Write now: its code is in this range and cites a decision that lacks it (F3) |
| Decision 6: strict host-key check against its own file, `accept-new` and the rest rejected | Write with Slice 3 or at the return step. It is a choice at a trust boundary, and `*Rejected*` exists to stop `accept-new` being proposed again |
| Decision 9: rejected ways of the release check | Write with Slice 2 or at the return step. D-215 stands whole as approved, so this needs an entry of its own |

## Declined to judge

- A zero-byte file at `LOOP2_DATABASE_PATH` is initialized and backed up as an empty database. It is the same rule as the block command and D-112, and no path on a running server produces one, so I set it aside.
- Strych's host name in the constants block of `deploy/loop2-backup` against this cycle's rule on server names: spec decision 6 settles it and the file belongs to Slice 3.
- `pusher` exiting 0 on an HTTP error: Slice 3's matter, as the foundation report says.

# Slice 1, review of the fix — `reports/slice-1-fix-review-report.md`

## Minor

1. **The new step test has no time limit.** `tests/account-backup.test.mjs:289-311`. With a hang placed inside `backupTo`, this test stalled in-process and the run did not end before my 150 s limit, on Windows and on Linux. D-84 asks for a time limit on such waits. It is Minor because that hang was artificial: the test has no writer, so nothing can restart its backup, and I know of no real path to it. A `timeout` option on the test closes it in one line.
2. **A `rate` below the real limit passes.** `rate: 5000` gave exit 0, 7 of 7, because the test's database has about 3000 pages. D-222 calls a `rate` a database can exceed a violation, and Strych's limit of 25 MB is roughly 6100 pages, so this one is within reach. The fix report names this limit itself. The rejected way F2 was about now fails, so F2 stays fixed. The constant at `src/server/database.ts:143` and D-222's comparison by an agent hold the rest.
3. **`src/server/account-backup.ts:18` has F3's fault, outside the fix diff.** It cites D-217 for removing the directory "on every end". D-217 does not say that, and a signal disproves "every end" (Minor 1 of the first review). My first review should have caught this with F3. It does not reopen the review.
4. **Two rejected ways of spec decision 1 are not in D-222.** Copying the three files, and a `sqlite3` tool (the fix report's concern 2). The handoff bound the entry to three ways, so this is no departure. The cost is small, but `*Rejected*` is what stops such a way being proposed again, and the return step can add them cheaply.

## Declined to judge

- The gate's Prettier patterns do not cover `tests/account-backup.test.mjs` (`tests/quality/test_quality_invariants.py:17-20`): it stood before this fix and changes a quality check. The file passes Prettier when checked directly.
- `runBackup` rejecting at its deadline without waiting for the killed child to close: the fix report's note. No `EBUSY` appeared in any run of mine.

# Slice 2, first review — `reports/slice-2-review-report.md`

## Minor

### 2. `copy` used for the backup

`src/server/account-database-check.ts:69,71,73`, `const copy = new AccountDatabase(...)`. The cycle binds "backup" in new code; `copy` is a game term (`foundations/glossary.md:175`). A local name, so no behaviour follows. Rename it to `backup` or `opened`.

### 3. The check's test does not cite the invariant

`tests/account-database-check.test.mjs:53,64` have no `// invariant: account-save-sqlite-upgrade` comment; the name appears only in the prose at line 9. Spec section 15: "Every new test of an invariant cites it", and row E13 names this file as a check. `foundation_check.py` passes through the Python test's citation, so nothing fails, but a search for the invariant misses the test that matters most. Cite it on the tests of finding 1.

### 4. A pattern in the invariant test decides nothing

`tests/invariants/test_account_save_sqlite_upgrade.py:31,51`. `text.split() == CHECK_COMMAND` already refuses every joined form. With `UNSAFE_OPERATORS` emptied, `&&`, `;` and tight `;` are still refused. The comment and the docstring credit it with a protection the equality gives. Remove it.

### 5. The one-step assertion cannot tell the `rate` on a database this small

`src/server/account-database-check.ts:67-68`. With `rate` removed by a stand-in, the check still exits 0: the database has fewer pages than the default of 100. It does catch what spec decision 1 names as the cost if wrong, a refused `rate` (shown in a real build below), and a release that reports steps differently. The one step under a real load is held by Slice 1's test. The comment promises slightly more than the line checks; no code change is needed.

### 6. H5.2's reading (not this slice's files)

`spec.md:209`, and later the human's procedure in `references/backup_and_restore.md`. See the judgment below: the release is in `/var/log/loop2-deploy.log`, not on the terminal, and not after a repeat of the same commit. The procedure should say so.

## Declined to judge

- A rollback to a commit from before this change builds an image without the step, so "no image without the check" does not reach across it: outside this slice, and rollback's effects are spec section 13's and the later slices'.
- The unpinned Node.js image: settled by spec decision 9.
- Running on the release that H3's image gets, rather than the server's: settled in the same table.

# Slice 2, review of the fix — `reports/slice-2-fix-review-report.md`

## Minor

### 2. A variant cannot tell a difference from a broken stand-in

`tests/account-database-check.test.mjs:107-120`, the assertion at `:113`. The variants assert a non-zero exit, and any error inside the stand-in gives one too. With the SQL of `other-hash` pointed at a table that does not exist, the Linux run stays green, exit 0, 8 pass. (On Windows it fails, only because the unclosed connection stops `rm`.) Today the `expect` mutant shows these variants fail for the right reason. After a schema change that renames a column, one of them could turn into a test of nothing, on Linux, unseen. A stand-in that catches its own failure and exits with a code of its own closes this.

### 3. Two parts of the check stay unprotected

`src/server/account-database-check.ts:62` and `:41-42`. Two mutants survive, exit 0: no read of the original database, and a revision not compared. The version is not compared by any variant either. Reading the backup covers the same read path, so the first costs little; the slice's Goal does say "reads them back". Worth one more variant at most, and outside what the finding required.

A third mutant, a swallowed backup error, also survives, and is equivalent: the missing file opens as an empty database and the check still fails on "holds no account".

### 4. `copy` used for the backup, again

`tests/account-database-check-standin.mjs:35-37,39-41`. The cycle binds "backup" in new code, tests and text; `copy` is a game term (`foundations/glossary.md:175`). New in this diff, beside the same word left at `src/server/account-database-check.ts:69,71,73`. No behaviour follows.

### 5. A line of 141 characters in a wrapped docstring

`tests/invariants/test_account_save_sqlite_upgrade.py:17`. The docstring around it wraps at 100. Ruff has no line-length rule that catches it, and no behaviour follows.

## Declined to judge

- The Minor findings of the first review not touched by this fix (4, 5 and 6 there, and the citation on the two original tests): not fixed by rule, and outside the fix diff.
- The new test files fall outside the ESLint and Prettier patterns of `tests/quality/test_quality_invariants.py`, which list `tests/{sim,view,quality}` and `tests/{http,startup}.test.mjs`: true of every Node test at `tests/` of this kind, not of this fix. I ran both tools on the files directly.

# Slice 3, first review — `reports/slice-3-review-report.md`

## Minor

### 2. The empty stream that exits 0 passes the gate (the executor's concern 1; mandated by the plan and D-218)

- **Place:** `deploy/loop2-backup:193-205`.
- **What it does.** With `docker` exiting 0 and writing nothing, real `age` wrote a valid file of 200 bytes, the gate passed, the run exited 0, no notice went, and the file replaced that weekday's backup. The report's "about 250 bytes" is 200 here. So "the file is not empty" never sees an empty input with the real `age`; it sees only an `age` that exits 0 and writes nothing.
- **Why only Minor.** The script's trust in exit 0 is the design, and the command earns it: `src/server/account-backup.ts:71-84` exits 0 only after the last byte has left, and any other end has another code. No way to exit 0 with nothing written shows in that code. A size floor would catch only the empty case, not a stream cut short with exit 0.
- **Left as it is:** nothing changes today, and a persistent fault of this kind would replace all seven files within a week with no message. **With a floor:** one constant and one test, and a threshold to keep below any real database. I recommend leaving the script and having the skill of Slice 6 say that a logged size near 200 bytes is an empty backup. This is the plan's text, so it stays the orchestrator's to settle.

### 3. No test holds `--kill-after` on any of the three calls

- **Place:** `deploy/loop2-backup:101`, `:169-171`, `:223`.
- **Evidence.** Removing it from the stream, the send and the notice in turn left the test files that exercise each call at exit 0. The stream was tried under all three files, the send and the notice under the notice test. The hanging stand-ins die on TERM, so the KILL is never reached.
- **It works today.** A `docker` stand-in that ignores TERM ended the run in 4.0 s with a 2 s limit and 2 s of kill wait: exit 6, `docker exit 137`, one notice. Spec decision 8 wants each step bounded, and only a tool that ignores TERM needs this option, so a stand-in that ignores TERM would hold it. The report's *Left unprotected* does not name it.

### 4. The comment naming the notice's source overstates it

- **Place:** `tests/deploy/test_loop2_backup.py:17`, "The notice as the owner settled it, on 2026-10-31 through the cycle's orchestrator."
- **What is wrong.** `cycle.md:109`, question Q13, records the orchestrator's answer resting on the owner's rule about language. The words themselves are the orchestrator's choice, and spec *Left to the maker* gives them to the cycle. `guidelines/testing.md` wants such a comment to name who settled the value, and this one names the wrong authority for the exact bytes the test pins.

### 5. The notice test's docstring names one way it does not make happen

- **Place:** `tests/invariants/test_account_save_backup_failure_notice.py:11`, "the reading of the file's size".
- **What is wrong.** `FAILED_ENDS` has a file of size 0, where `stat` succeeds, but no run where `stat` fails. The encrypted test has that run (`age_ends_well_on_no_file`) and does not count notices. The path ends in the same `fail`, so the risk is small. The docstring should match the list, or the list should gain the case. Finding 1 changes this docstring anyway.

## Declined to judge

- What the server's real cron does with the job's output and whether its reader can die: the server is out of bounds; H2.8 is the human's.
- SIGQUIT: my run started the script in the background, where bash leaves it ignored, so it showed nothing either way.
- Whether a real `docker exec` can exit 0 on a cut stream: Slice 1's command and H3 hold that path, not this slice.
- A hostile game container writing without limit to its standard error, which reaches the log, or to its output, which fills the temporary disk for up to 300 s: spec decision 8 sends that text to the log, and a taken container is outside this task.
- No rotation of `/var/log/loop2-backup.log`: nothing asked for it, and it grows by a few lines a night.

# Slice 3, review of the fix — `reports/slice-3-fix-review-report.md`

## Minor

### 2. The branch "failure wins over the mark" has no test

- **Place:** `deploy/loop2-backup:127`, the `(( code == 0 ))` half.
- **What it is.** Replacing the condition with `[[ $SENT == yes ]]` alone leaves the notice test at exit 0. The fix report's *Choices* names this rule. The branch differs only for a signal landing between `SENT=yes` and the end of `main`, a window of two lines, so the mutant is close to equivalent. **Left as it is:** nothing changes for any run I could make. **With a test:** it needs a contrived signal at that exact moment. I recommend leaving it.

### 3. A signal no trap names leaves the deployment's lock held for up to the stream's limit

- **Place:** `deploy/loop2-backup:125`, `exec 9>&-`, against the `timeout` processes that inherited descriptor 9.
- **Evidence.** With a stream limit of 6 s, VTALRM ended the script at once (exit 154, one notice, `failed (exit 1)`), and the lock stayed held for 5 s more. That confirms the fix report's *Left open*. It is bounded by the 300 s limit, under the deployment's 900 s wait, and only a signal nothing here sends takes this path.

### 4. Slice 6 must take the new exit codes

- **Place:** the header, `deploy/loop2-backup:26-28`. The skill's reading of the log must now name 138, 140, 141 and 142, and that a logged 1 can stand for a process status of a signal. The earlier list in the slice's report is out of date. This is a note for Slice 6, not a change to this one.

The review's Minor findings 2, 3 and 4 stand unchanged, as the handoff of the fix said they should. Minor finding 5 is closed by `encryption_leaves_no_file`, which the docstring's new sentence needed.

## Declined to judge

- Whether the server's real cron keeps the job's output open or passes SIGPIPE ignored: the server is out of bounds; H2.8 is the human's.
- HUP, INT, USR1, USR2, ALRM or TERM landing during the handler: a matter of timing, named in the fix report; removing ALRM from the ignore list leaves the test at exit 0; I did not try the others.

# Slice 4 — `reports/slice-4-review-report.md`

## Declined to judge

- A commit whose source is a symbolic link to the installed copy gets no warning for that pair, so it hides drift (`link_to_the_installed_backup`). Merged code is trusted under D-16, and the deploy script's pair behaved the same before this slice.
- A directory at an installed path warns "differs" rather than "cannot be read". The wording of a case no procedure produces; the same shape stood before.
- The name `compare_installed_script` now covers three copies. The plan keeps the name.
- "copy" in `compare_installed_copy` and the warnings, a game term at `foundations/glossary.md:175`. The cycle's binding word "backup" is for the database backup. "installed copy" is the plan's and D-16's own phrase for another thing.
- The warnings' pointer to the loop2-deploy skill and the skill's lack of the new warnings. Slice 6 writes that.
- `deploy/loop2-backup` and `deploy/loop2-backup.cron` themselves: slice 3.

# Slice 6, first review — `reports/slice-6-review-report.md`

## Minor

**M1 — The mode of the restored file (the executor's open search).** The reference, line 242, gives no mode. Judged: state 0600. The launcher proves that mode runs the application, `scripts/restore-trial.mjs:260–265`. No code in `src/server` sets or checks the file's mode. The word "Install" invites `install`, whose default is 0755, world-readable and executable, on a file of addresses and password hashes; the application would still run, and Docker's data directory normally shuts other users out, so this is exposure in depth, not a break. Unverified on the server.

**M2 — The fetch with a temporary key (the executor's open search).** The reference, lines 203–205 and 234–235. Judged: the facts suffice for the owner's path, since the seven names, the home directory, the host and the login are all reachable from the text and the note, and H3 will exercise it before the merge; a failure there is visible. What is missing:
- No command, though every other step has one. H1 fetched one named file without `-p` (`task-frozen.md:124`), so `-p` and several files are untried. A form such as `scp -p -i <temporary key> <login>@<host>:loop2-accounts-*.sqlite.age .` would close it; that exact form is untried and could not be tried here.
- No comparison with the fingerprint. The first connection from another computer asks about the host key, and the fingerprint stands only at Installing step 6. Spec decision 6 rejected trusting whoever answers first; `age` still protects the content, so this is Minor.
- Nothing on the temporary key file's own permissions or line ending on Windows.
- Server path, step 1: no tool, and no `UserKnownHostsFile=/etc/loop2/strych-known-hosts`, and "the newest by time on Strych" has no way given to read a time (H1 used `rsync --list-only`; the script never lists, but the human may).

**M3 — "The same commit" points at nothing, and the image cannot show it.** The reference, line 210. No commit was named before it. `docker build -t <image> .` leaves `LOOP2_COMMIT` at `unknown` (`Dockerfile:15`), so the launcher prints `image revision: unknown` (`scripts/restore-trial.mjs:358–361`), and the report written into the request cannot show what D-220 requires. Name the commit and add `--build-arg LOOP2_COMMIT=<sha>`.

**M4 — Two procedures name no actor.** "Changing the encryption key" (lines 153–167) and "Trying a backup on the owner's computer" (lines 198–225) are bare imperatives, while Installing and Restoring say "the human". Lines 4–5 and 185–187 cover them, so no instruction has an agent act; but agents hold a tool that can run any command and run on the owner's computer. D-12 and D-220 name both acts. One sentence in each.

**M5 — A restore across a key change.** The reference, lines 236 and 208, name one key. A backup older than a key change needs the old one, and the note holds two during that time. `age` then refuses it. One sentence: use the old key from the note for a backup made before the change.

**M6 — Nothing guards the time of a restore.** The reference, lines 234–248. A push to `main` during steps 3–6 deploys and starts the application on the half-replaced volume, after step 4 on no database. The section does not say to merge nothing until step 7. If the data was damaged before the human acts, each night until then replaces the oldest backup with damaged data; the newest good one survives a week, so the cost is small.

**M7 — Small wording.**
- Line 72, "The script's checks stop an empty file": the check stops a zero-byte file only (`deploy/loop2-backup:209`), so a file near 200 bytes passes it. The sentence reads against the one before it, which rightly says such a file would replace the weekday file.
- Line 31, "the plain database exists only inside the pipe": D-218 says on the host; it rests in the container's writable layer too (D-217).
- Line 23: D-13 does not name the known-hosts file, and line 116 rightly calls its fingerprint no secret.
- Exit 1 of the script (`deploy/loop2-backup:28`) is missing from the table.
- Lines 142–144: the code block lost its `\n` and its line continuations, leaving a literal line break in `printf` and three spaces where a backslash stood. It runs, but reads as broken.

## Declined to judge

- `age` 1.0.0's `--encrypt --identity` and the rest of `deploy/loop2-backup`'s behaviour: earlier slices, read here only as the source of the skill's claims.
- Where the fix of I5 belongs: the launcher is slice 5's file; that routing is the orchestrator's.
- "Rotation — human sequences" in `setup_and_secrets.md:439–457` does not list the encryption key: the plan's *Change* names only three sentences in that file, and `SKILL.md` points to the reference.
- "About 385 accounts": taken from spec decision 5 and D-216; 25 000 000 / 65 536 gives 381, which is a difference in the source, not in this slice.
- Whether Strych can give up a replaced file, or how `pusher` delivers: human actions H2 and H4.

# Slice 6, review of the fix — `reports/slice-6-fix-review-report.md`

## Minor notes (these do not reopen anything)

**N1 — A host with `pusher` whose message does not arrive.** "With no server", step 4. The list says "check that it arrives", then speaks only of a host with no `pusher`. The advice "take the missing notice to the owner" is addressed to someone who is the owner. Say what to do when the message does not come, and "decide" in place of "take to the owner".

**N2 — The session keys "by its section".** Line 281. The section's sequence, "Creating the file", generates a new key and does not put the note's content in place, so followed literally it signs every player out. No data is lost; a sentence would say to write the note's content with owner root, group 1000, mode 0440.

**N3 — "the line before it".** Line 57. A missing script makes Node print several lines, so "the lines before it".

**N4 — `umask 077` went with the old step 1.** The decrypted file now takes root's default umask, likely 0644. Inside the 0700 directory that is harmless, but M1 of the first review (no mode at step 5, line 255) now has a little more weight, since a `mv` carries that mode into the volume.

## Declined to judge

- M1 to M7 of the first review: not in the findings file, so not fixed, and by `fix.md` not reopened; N4 only notes how the fix touched M1.
- Whether `rsync` installs from `apt` on a new host: the fix report calls it unverified, and no source settles it.
- Whether `/root` on another host is a private home directory: taken as ordinary.

# Correction 1 — `reports/correction-1-review-report.md`

## Minor notes (neither blocks)

**C1 — Two lines lost their wrap.** The reference, lines 244 and 252, run to 109 and 114 characters in a part of the file wrapped near 100. Polish only. Grade: Minor.

**C2 — A second attempt can overwrite the kept database. Outside this diff; it comes from the earlier fix's steps.** If step 7 fails and the human, instead of the way back, tries another backup from step 1, `mkdir` fails with "File exists", which can be passed over, and step 4 then moves the restored `accounts.sqlite` onto the one kept in `previous`. `mv` replaces a same-named file without a word, exit 0, as the walk's last row of moving files back showed. The reference covers failure with the way back only and does not speak of trying another backup. One sentence would close it: to try another backup, take the way back first. Grade: Minor, out of this correction, reported for the orchestrator. It needs the human to pass over an error and to leave the written way.

**Evidence for M1 of the first review, not reopened:** step 5's `install` gave mode 755 in the walk, as that note predicted.

## Declined to judge

- N1 to N4 and M1 to M7: outside the remarks, by the handoff.
- Whether stripping every leading mark could harm a password that really begins with one: the human decided it, and the reference keeps this password ASCII.
