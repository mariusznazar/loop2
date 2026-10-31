# Slice 3 report — the nightly backup script and its schedule

**Status:** done with concerns (see *Concerns for the orchestrator*).

**Commit:** `354ae7cd5a225ef8a950153ec930d36d77b830bc` on `task/kopia-bazy`, on top of `acb7aee`. Not pushed.

## Files changed

| File | Added | Removed |
|---|---|---|
| `deploy/loop2-backup` | 256 | 0 |
| `deploy/loop2-backup.cron` | 7 | 0 |
| `tests/deploy/backup_script_support.py` | 318 | 0 |
| `tests/deploy/test_loop2_backup.py` | 272 | 0 |
| `tests/invariants/test_account_save_backup_encrypted.py` | 147 | 0 |
| `tests/invariants/test_account_save_backup_failure_notice.py` | 211 | 0 |
| `tests/invariants/test_account_server_typecheck.py` | 16 | 2 |
| `tests/quality/test_quality_invariants.py` | 1 | 1 |
| `foundations/part_map.md` | 2 | 0 |

## Checks

Failing runs first, each against a skeleton of the script with the real constants block and the naive pipe into `rsync` (no gate, no handler), so the tests reached their assertions:

- `npm test -- tests/invariants/test_account_save_backup_encrypted.py`: exit 1, 13 failures, one for each way the encryption does not finish (`rsync` was called, or the run did not end within 45 s). The positive control passed.
- `npm test -- tests/invariants/test_account_save_backup_failure_notice.py`: exit 1, 26 failures (no call of `pusher`, or the run did not end). The control passed.

Final runs, on the staged tree that became the commit:

| Command | Exit | Result |
|---|---|---|
| `npm test -- tests/invariants/test_account_save_backup_encrypted.py` | 0 | 2 tests, 13 ways in one of them |
| `npm test -- tests/invariants/test_account_save_backup_failure_notice.py` | 0 | 4 tests, 24 failed ends in one of them |
| `npm test -- tests/deploy/test_loop2_backup.py` | 0 | 25 tests |
| `npm test -- tests/quality/test_quality_invariants.py` | 0 | 5 tests: ESLint, Ruff, ShellCheck, Prettier, the audit |
| `npm test -- tests/invariants/test_account_server_typecheck.py` | 0 | 9 tests |
| `npm test -- tests/invariants/test_account_server_runtime.py` | 0 | 5 tests |
| `npm test -- tests/deploy/test_loop2_deploy_input.py` | 0 | 8 tests; the shared seam file is unchanged, run as a control |
| `npm test -- tests/agent_workflow/test_loop2_deploy_skill.py` | 0 | 5 tests |
| `python -B .the-way/elements/common/foundation_check.py` | 0 | 0 errors; run again after the commit, exit 0 |
| `.runs/quality-venv/Scripts/ruff.exe check --config ruff.toml --ignore-noqa --no-fix --no-cache` on the changed Python files and `tests/deploy` | 0 | an earlier run exited 1 on RUF015 in the encrypted test, fixed in the file |
| `.runs/quality-venv/Scripts/shellcheck.exe --norc --shell=bash --extended-analysis=true deploy/loop2-deploy deploy/loop2-backup` | 0 | an earlier run exited 1 on SC2329, see *Choices* |

ESLint and Prettier ran only inside the quality test; this slice changes no file of theirs.

Changed tests of invariants, each seen failing once and restored:

- `test_no_other_deployment_route` with `NOT_ROUTES = ()`: `npm test -- tests/invariants/test_account_server_typecheck.py`, exit 1, that test failing.
- `test_backup_script_starts_no_image` with `docker pull example` added to the script: same command, exit 1, that test failing.
- `test_shellcheck_source_rules` with `echo $1` added to the script: `npm test -- tests/quality/test_quality_invariants.py`, exit 1, that test failing.

Mutants of `deploy/loop2-backup`, run one at a time by the test file named, each `npm test -- <file>` exit 1, the script restored after each (`restored: True`, compared by bytes):

- Encrypted test: the gate ignores the command's status · the gate ignores `age`'s status · an empty file passes · the key is not checked · the temporary directory stays · no time limit on `age`.
- Notice test: no notice at the exit · a notice on success too · the notice names the stage · no TERM handler · no time limit on `pusher` · no time limit on `rsync`.
- Backup test: the descriptor stays open in the send · `rsync`'s text in the log · `rsync`'s text on the terminal · the local date · a terminal for `docker` · the size logged after the send · a deleting option · no strict host key · the lock released after the send · an argument ignored.

22 of 22 caught.

**Not run:** full `npm test`, by the method and the handoff (the gate is the orchestrator's). `tests/deploy/test_account_backup_stream.py`, since nothing it reads changed. Anything against Strych, `pusher` or the server, by the handoff. The schedule under a real cron, which is H2.8; the test reads the file as cron's format gives it.

## The own-work check

**Requirement I judged likeliest unmet:** that the script works at all with the real tools. Every test uses stand-ins, so a wrong flag of `age`, `rsync` or `flock` would pass them all and fail every night.

**Check:** `deploy/loop2-backup`, byte-identical (`cmp`) and with its real constants, in a throwaway `ubuntu:22.04` container with the real `age` 1.0.0-1ubuntu0.1 (the version the spec reads as the server's candidate), `rsync` 3.2.7, `flock`, `timeout`, bash 5.1.16. Only `docker`, `pusher` and `ssh` were stand-ins, the last running the rsync server locally. Nothing reached Strych. `docker run ... bash /check/check.sh` exit 0.

**What it showed:**
- A whole run exits 0; the file on the stand-in Strych decrypts with `age --decrypt` to the database, `cmp` equal; nothing stays in `/tmp`; no `pusher` call.
- A second run replaces the same weekday file with the new content and time.
- Wrong key content: exit 6, `age exit 1`, `ssh` never called, the file on the stand-in Strych unchanged, one notice.
- A cut-off stream with the real `age` ending well: exit 6 with `docker exit 1, age exit 0`, nothing sent. This is the case the status gate exists for.
- A refused login through the real `rsync`: exit 8, `rsync exit 255`, the sentinel login in neither the log, the screen output nor the notice.
- The lock is free during a send and held during a stream (real `flock --nonblock`).
- A real TERM during the stream: exit 143, one notice, temporary directory gone.
- A real lock held past a shortened wait: exit 4, one notice.
- The real `ssh -G` (no connection, host `example.invalid`) reads all five options as written.

Also a one-off: the three new test files under `python3 -m unittest` on Linux, in the same image, from a read-only mount: 25, 2 and 4 tests, each exit 0.

The image `ubuntu:22.04` was pulled for this and stays on the computer. Nothing of these runs is in the commit.

## Reach beyond the dispatch

- `rsync.1.md` § EXIT VALUES, at the commit D-216 cites, downloaded to the scratchpad, as the handoff asks.
- `spec.md` H2 rows (`/etc/cron.d/loop2-backup`, 0644, no dot) and `plan.md:227-229`, by grep, for the installed path the schedule's comment names.
- `tests/invariants/loop2_invariant_support.py` `kill_tree`, `popen` and the shell reader, to reuse the first two and call the third.
- `tests/invariants/test_account_server_runtime.py:198-222`, to see how it reads `deploy/*`.
- `tests/deploy/test_account_backup_stream.py`, `Dockerfile` (`WORKDIR /app`) and `src/server/account-backup.ts` (exit codes), for the form of the command.
- `.the-way/elements/part-map/template.md`, `examples.md`, `skill/decide_entry.md`, `skill/write.md`, `elements/common/way_of_working.md`, and `elements/common/rules.md` by search for the part map, for the part-map change below.

## The part-map change

I applied `.the-way/elements/part-map/skill/SKILL.md` myself. The change is two lines in *Files* of `deployment`, claiming the two new invariant tests, as the plan says. They name files one by one as that entry's other invariant tests do. No part's sentence, *Depends on* or trust boundary changes; `deploy/**` and `tests/deploy/**` already claim the other new files. Nothing follows from it.

## Choices

| Choice | Way rejected | Cost if wrong |
|---|---|---|
| The script refuses any argument, exit 2, with a notice | Ignoring it: a hand run with `--dry-run` would replace a backup | One false message after a typo |
| `GlobalKnownHostsFile=/dev/null` beside the options the spec names, so only the design's own file counts | Leaving the system file in play | None seen; `ssh -G` reads it |
| `umask 027`, as `deploy/loop2-deploy`, so a lock file the backup creates first after a reboot has the mode the deployment gives it (real run: 640 root). `mktemp --directory` is private by itself | `umask 077` | None |
| `flock --unlock 9`, then the descriptor closed, before the send | Closing alone: the unlock would not show to a stand-in | One more call |
| A failed unlock is a failed night, exit 4 | Sending anyway | A false message in a case not seen to happen |
| The weekday is read after the gate, where it is used | At the start | None; at 03:17 a wait cannot cross UTC midnight |
| Time limits: stream 300 s, under the deployment's 900 s, which a test holds; send 1800 s overall, 120 s input, 30 s connect; notice 60 s; KILL 10 s after TERM | Longer stream limit: a deployment could outwait its lock | A slow 25 MB send would fail with a message |
| Exit codes 2 input, 3 key, 4 lock, 5 temporary directory, 6 stream, 7 encrypted file, 8 send, 9 weekday, signals 129, 130, 143 | — | The skill names them |
| The notice is ASCII English: subject `loop2_backup_failed`, text `The loop2 database backup failed.` `pusher` puts the subject in a URL path and turns underscores into spaces | Polish text | Mariusz may want Polish; it is one constant |
| `log` also prints to standard output, as in `deploy/loop2-deploy`, so a hand run shows its lines; cron's mail is off | Log file only | None |
| `main` ends without `exit 0`: ShellCheck 0.11 reads a function called only by `trap` as never invoked (SC2329) when the script's end cannot be reached | A disabling directive, which D-31 forbids | None; the script's status is `send_file`'s |
| The seam imports the block reader and helpers of `deploy_script_support.py`; its failure messages name `deploy/loop2-deploy` | A copy of that code | A slightly misleading message |
| Standard output and error of a test run go to files, and a run past 45 s has its tree stopped by `kill_tree` | `subprocess.run` with a pipe: on Windows it waits for the pipes after a kill, so a left process could hang the run (D-84) | None |
| The tripwire gains `NOT_ROUTES` plus a new test that the script runs Docker only by `exec` | Naming the two files in `ROUTE_FILES` alone, which holds files the check reads, and would leave "deploys nothing" unchecked | One more test |

**Changed existing tests, under *Changing an existing test*:** `test_no_other_deployment_route` no longer counts the two named files. The cause is the requirement: `deploy/*` counts them and neither deploys anything (plan, Slice 3 *Checks*), and the claim is now held by `test_backup_script_starts_no_image`. `BASH_SCRIPTS` gains the script.

**Adaptations:** none of the plan's shape.

## Concerns for the orchestrator

1. **An empty stream with exit 0 passes the gate.** If `docker exec` exits 0 with nothing on standard output, real `age` writes a valid file of about 250 bytes for the empty input, the file is "not empty", and it replaces that weekday's backup. The task and plan name exactly this gate, and the command's exit 0 means the whole file was written, so I built what they say and did not add a minimum size. A size floor in the script would cost one constant and a test. Recommendation: leave it; the logged size would show it.
2. **`age`'s text can echo a piece of a malformed key.** With a garbled key, real `age` 1.0.0 logged `malformed secret key: separator '1' at invalid...`, one character of the file's content. The spec sends `age`'s text to the log, so I kept that. It takes a damaged key file and shows one character. Recommendation: accept.
3. **What the skill of Slice 6 should know.** The manual's exit values for the log's reading: 11 file I/O, 12 protocol stream, 23 partial transfer, 30 input timeout. 124 and 137 come from `timeout`. The manual lists no 255; the real run gave `rsync exit 255` when the stand-in `ssh` exited 255, so a refused login or a changed host key reads as 255 there.
4. **A killed send can leave a file on Strych.** If `timeout` reaches KILL during a send, `rsync` cannot remove its temporary file by itself; I did not test what the receiving side does. `rsync`'s own input limit of 120 s fires first in the ordinary case.
5. **Where the tools live on the server is not read.** The script's `PATH` is the deployment's. Whether `pusher`, `age` and `rsync` stand on it is H2's to show. A missing one gives exit 127 in the log, with a notice unless `pusher` is the one missing.

## Left unprotected

- `trap '' HUP INT TERM` in the handler: a signal landing during the handler is a matter of timing, and no test holds it.
- `trap - EXIT` in the handler changes nothing in bash, since `exit` inside an EXIT trap does not run it again; it is defensive.
- The warning when the temporary directory cannot be removed, and its text.
- `mktemp`, `stat`, `date` and `rm` have no time limit of their own: they are local and quick.
- A SIGKILL of the script itself reaches no handler, which the notice test's *Does NOT cover* says.

## Searches not found or unclear

- `pusher`'s install path on the server: not in the foundation, the spec or the plan; not looked for on the server, by the handoff.
- The `rsync` manual's exit values hold no 255, see concern 3.
- Whether the real `flock`, `age` and `rsync` are on the server's `PATH`: unclear until H2.
- `.the-way/elements/common/rules.md` was searched for the part map, not read whole; the change touches no field its other rules govern.
- Two multi-line edits through a heredoc in Bash failed here (an assertion, then a quoting error), so I wrote the edit script through the Write tool. Cause not verified.

## After the answer

The orchestrator answered the notice's words before the review, on the owner's rule that text the code puts before its reader stays in Polish. This replaces the row about the notice's language in *Choices*. Nothing else of the slice changed, and the log's lines stay English.

**Commit:** `45eaf4b57ae6ff6924d82514f4f0377e97828cac`, on top of `354ae7c`, `git add` by path. Changed: `deploy/loop2-backup` (+2, -2), `tests/deploy/test_loop2_backup.py` (+12, -0).

- `NOTICE_SUBJECT=kopia_bazy_loop2_nieudana`, ASCII, because `pusher` puts it in a URL path.
- `NOTICE_TEXT='Kopia bazy loop2 nie udała się.'`, UTF-8.
- Only those two constants held the old words, by a search of `deploy`, `tests`, `foundations`, `guidelines`, `.claude` and `.agents`, so no stand-in and no invariant test changed.
- New test `test_pusher_gets_the_polish_notice_as_these_bytes`: through the seam, the `pusher` stand-in gets the one argument `kopia_bazy_loop2_nieudana` and on standard input exactly `Kopia bazy loop2 nie uda\xc5\x82a si\xc4\x99.\n`. The expected bytes are written out by hand in the test.

| Check | Exit | Result |
|---|---|---|
| `npm test -- tests/deploy/test_loop2_backup.py`, the new test against the old constants | 1 | 26 tests, the new one failing: `[['loop2_backup_failed']] != [['kopia_bazy_loop2_nieudana']]` |
| The same command with the text changed to CP1250 bytes, restored after (`restored: True`) | 1 | the new test failing; three tests that read the constants block also error, as the file no longer decodes |
| `npm test -- tests/invariants/test_account_save_backup_encrypted.py` | 0 | 2 tests |
| `npm test -- tests/invariants/test_account_save_backup_failure_notice.py` | 0 | 4 tests |
| `npm test -- tests/deploy/test_loop2_backup.py` | 0 | 26 tests, on this Windows machine, through Git's bash under the script's `LC_ALL=C` |
| `.runs/quality-venv/Scripts/shellcheck.exe --norc --shell=bash --extended-analysis=true deploy/loop2-deploy deploy/loop2-backup` | 0 | no report |
| `.runs/quality-venv/Scripts/ruff.exe check --config ruff.toml --ignore-noqa --no-fix --no-cache tests/deploy/test_loop2_backup.py` | 0 | all checks passed |
| `python -B .the-way/elements/common/foundation_check.py` | 0 | 0 errors, before and after the commit |
| `python3 -B -m unittest` of the same three test files, on Linux in `ubuntu:22.04`, bash 5.1 | 0 | 26, 2 and 4 tests |

**Encoding of the file:** it decodes as UTF-8 by Python's strict decoder, has no byte order mark and no carriage return, `git ls-files --eol` gives `i/lf w/lf`, and the text's line holds `C5 82` and `C4 99`.

**Not run:** the quality test as a whole and full `npm test`; the slice's other focused checks, since neither of the two changed files is theirs beyond the two constants; anything against `pusher` itself.

**Concern added:** the stand-in proves the bytes `pusher` reads, not how the mail shows them. The published script sends them through `curl --data-urlencode`, and which character set the mail then carries is no source's to say. If `ł` and `ę` arrive broken, only the human sees that, at the first real notice; the check belongs to H2.
