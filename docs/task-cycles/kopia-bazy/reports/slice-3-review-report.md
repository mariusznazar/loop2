FAIL 45eaf4b57ae6ff6924d82514f4f0377e97828cac

# Slice 3 review — the nightly backup script and its schedule

Range `acb7aee..45eaf4b`, two commits, `git rev-parse HEAD` equal to the head given. Blocking findings: 1. Minor: 4. Out of scope: the five lines of *Declined to judge*.

## Critical

None.

## Important (blocks)

### 1. A run ended by a signal other than HUP, INT or TERM sends no notice, and its log says the backup was sent

- **Slice:** 3, the only one reviewed.
- **Place:** `deploy/loop2-backup:114-127` (`on_exit`, its branch at `:120`), `:251-254` (the traps), `:84` (the `printf` to standard output that raises SIGPIPE). Tests: `tests/deploy/backup_script_support.py:295`, `tests/invariants/test_account_save_backup_failure_notice.py:10-13` and `:144-150`.
- **What is wrong.** `on_exit` chooses between success and failure by `$?`. With an EXIT trap set, bash also runs that trap for a terminating signal the script has not trapped, such as SIGPIPE, SIGALRM or SIGUSR1, and `$?` is then the status of the last command that finished, usually 0. The handler takes the success branch: it writes `end: sent <file>`, calls no `pusher`, and bash then ends by the signal, with exit 141, 142 or 138. The file was never sent.
- **What it breaks.** The slice's *Goal*: "One handler at the exit makes any non-zero end, from any cause, call `pusher` once". Spec decision 8 says the same, and D-219 says "At any failed end". The invariant test's docstring claims each way the script can end non-zero, "a signal to the script" among them, is made to happen.
- **Why it matters.** The signal that can really arrive is SIGPIPE, because `log` writes every line to standard output first (`:84`, the point the handoff raised). If whatever reads that output goes away, the next log line kills the run. A hand run into `| head`, or an `ssh` without a terminal whose connection drops, does this. The night's backup is lost in silence, and the log, the one record, says it was sent. Step H2.5 reads the log for success, and the skill of Slice 6 will tell a reader to trust it. The older backup stays on Strych, so this is a missed night and a false record, not data loss.
- **How far it reaches at night.** Under cron the job's output is read by cron's own process for that job, so the script's pipe stays open unless that process dies. I did not read the server and did not run a real cron, so I claim no frequency. The finding stands on the requirement's "from any cause" and on the false log line, not on a measured rate.
- **Evidence.** Real `age` 1.0.0, `rsync` 3.2.7, `flock`, `timeout` and bash 5.1.16 in a throwaway `ubuntu:22.04`, the script unchanged but for its constants. `docker`, `pusher` and `ssh` are stand-ins, `ssh` running the `rsync` server locally.

| Run | Exit | `pusher` calls | Files on the stand-in Strych | Last log line |
|---|---|---|---|---|
| `\| true`, standard output closed at once | 141 | 0 | 0 | `end: sent ` with no file name |
| `\| head -1`, three rounds alike | 141 | 0 | 0 | `end: sent loop2-accounts-6.sqlite.age` |
| `\| head -2`, the reader leaves after the size line | 141 | 0 | 1 | `made: …`, no end line |
| SIGUSR1 during the stream | 138 | 0 | 0 | `end: sent ` |
| SIGALRM during the stream | 142 | 0 | 0 | `end: sent ` |

- **Why the tests pass.** The seam writes standard output to a file (`backup_script_support.py:295`), so no test has a reader that leaves. `FAILED_ENDS` signals only TERM, HUP and INT. The author's own-work check tried TERM alone, and its report's *Left unprotected* names SIGKILL as the only signal outside the handler.
- **A fix shown to work, for the fixer to weigh.** On a copy of the script: `trap 'exit 141' PIPE` beside the other traps, PIPE in the handler's ignore list at `:117`, and a mark set after `send_file` that the branch at `:120` requires (the copy also trapped QUIT, which showed nothing). Every run in the table except `| head -2` then gave exactly one notice and `end: failed`, and `| head -2` ended exit 0 with its file sent. The mark alone covers SIGUSR1 and SIGALRM, but those runs log `failed (exit 0)`, since `$?` is still 0. Taking standard output out of `log` would remove the SIGPIPE and not the others, and a hand run would lose its lines. A test needs a pipe whose reader leaves and one signal from outside the three, each seen failing once, and the docstring's reading must then say what it covers.

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

## Judged from the handoff

**Trust boundary.** The script takes no argument and refuses any, exit 2. No output of Strych, `rsync`, `ssh`, `docker` or `age` drives a decision: `rsync`'s and `ssh`'s output goes to `/dev/null`, `docker`'s standard output goes only to `age`, and only exit statuses are read. Three local tools give values: `stat` and `date` are checked against whole patterns (`:201`, `:211`), and `mktemp`'s path is checked as a directory. The constants are assigned over any inherited value and made read-only, `PATH` is set, and `mktemp` takes `--tmpdir`. The listing is never read, and rsync gets exactly one file and one computed name. The login never appears: `ssh`'s arguments in the real run carried only the five options and the host. A refused login (stand-in `ssh`, real `rsync`, exit 255) left the sentinel in none of the log, the screen or the notice. Host-key options reach `ssh` as separate words through the real `rsync`.

**Irreversible operation.** The change only prepares it. Tests run a temporary copy with stand-ins first on `PATH` and a guard before each run; `ssh`, `scp`, `sftp` and `curl` are stand-ins too; no test executes `deploy/loop2-backup` itself. `deploy/loop2-deploy` is not touched, so nothing installs the script or the schedule.

**Changed invariant tests, under *Changing an existing test*.** `test_no_other_deployment_route` (account-server-typecheck) and `BASH_SCRIPTS` of `test_shellcheck_source_rules` (shellcheck-source-rules). The first gives up two exact names only, its cause is on the requirement's side and stands in the plan's Slice 3 *Checks* and the test's docstring, and `test_backup_script_starts_no_image` holds what it gives up. I fed that test's reader a Docker command added seven ways: behind `timeout`, in a substitution, `compose up`, behind a pipe, on a continued line, in an `if`, through a wrapper. All seven were caught. The `.cron` file's content is pinned by `TheScheduleAsCronReadsIt`. `BASH_SCRIPTS` only widens. Both changes stand.

**The executor's concerns.**

| Concern | Judgment |
|---|---|
| 1, empty stream | Minor, finding 2 |
| 2, `age`'s text and a damaged key | Accept, no finding. Of five damages tried, one printed a value: `invalid character data part: s[14]=98`, one character. The others print `mixed case`, `invalid checksum` or a position. The report's example `separator '1'` is a literal of the message, not the file's content. A damaged key is no working credential, and D-13's wrong is an access or credential value in a log. Spec decision 8 sends this text to the log. |
| 3, what Slice 6 should know | Passes to Slice 6. The real run confirms `rsync exit 255` when `ssh` exits 255. |
| 4, a killed send and a file left on Strych | Not verified, since Strych is out of reach. `rsync`'s `--timeout` also reaches the receiving side (`--timeout=120` in the server's arguments). No finding. |
| 5, tools on `PATH` | H2 shows it. A missing tool gives 127 in the log, and step H2.6 proves the notice arrives. No finding. |
| Added, how `ł` and `ę` reach the mail | H2.6's, as the cycle's Q13 says. The bytes `pusher` reads are right on Windows and Linux. |

**`log` printing to standard output.** Cron's mail is off by the file's first active line, and those lines hold nothing the log file does not, so nothing leaks. The cost is finding 1.

**Foundation.** The script follows D-216, D-217, D-218, D-219 and D-13 apart from finding 1's departure from D-219, and the docstrings quote both new invariants' sentences. The new `part_map.md` lines are correct and `foundation_check.py` exits 0.

**The author's own-work check.** It fits a real weakness, stand-ins hiding a wrong flag, and my own run with real tools agrees with it. It looked at the tools, not at "from any cause", which is where this slice was weakest.

**Observed, no finding.** A TERM to the script waits for the running tool: it took 8.0 s with an 8 s lock wait, and 6.4 s with a 6 s send limit, each exit 143 with one notice. So the wait is bounded by the step's own limit, up to 900 s or 1800 s. TERM during the notice is ignored and leaves one notice, exit 8.

## Declined to judge

- What the server's real cron does with the job's output and whether its reader can die: the server is out of bounds; H2.8 is the human's.
- SIGQUIT: my run started the script in the background, where bash leaves it ignored, so it showed nothing either way.
- Whether a real `docker exec` can exit 0 on a cut stream: Slice 1's command and H3 hold that path, not this slice.
- A hostile game container writing without limit to its standard error, which reaches the log, or to its output, which fills the temporary disk for up to 300 s: spec decision 8 sends that text to the log, and a taken container is outside this task.
- No rotation of `/var/log/loop2-backup.log`: nothing asked for it, and it grows by a few lines a night.

## Checks

| Check | Exit | Result |
|---|---|---|
| `npm test -- tests/deploy/test_loop2_backup.py` | 0 | 24 s |
| `npm test -- tests/invariants/test_account_save_backup_encrypted.py` | 0 | 12 s |
| `npm test -- tests/invariants/test_account_save_backup_failure_notice.py` | 0 | 23 s |
| `npm test -- tests/invariants/test_account_server_typecheck.py` | 0 | 7 s |
| `npm test -- tests/invariants/test_account_server_runtime.py` | 0 | 1 s |
| `npm test -- tests/quality/test_quality_invariants.py` | 0 | 8 s; ESLint, Ruff, ShellCheck, Prettier, the audit |
| `python -B .the-way/elements/common/foundation_check.py` | 0 | |
| `python -B check/reader.py <export>`, the Docker reader on seven added commands | 0 | seven caught |
| `docker run --rm … ubuntu:22.04 bash /check/check.sh`, real tools | 0 | whole run decrypted and compared equal; the scenarios above |
| `python3 -B -m unittest` of the three new files on Linux, read-only mount | 0, 0, 0 | 26, 2, 4 tests |
| Mutants on a copy inside the container, each by its test file | see below | |
| `docker run --rm … ubuntu:22.04 bash /check/check2.sh`, signal ends | 0 | finding 1's table |

Mutants caught, each exit 1: a size check that only asks for text, `accept-new`, no `--times`, `code` taken as 1, the notice's result not logged, a failed unlock ignored.

Mutants that survived, each exit 0: `--kill-after` removed from the stream under all three test files, from the send and from the notice under the notice test (finding 3); the signals not ignored in the handler, which the report names as unprotected; the `stat` status ignored, equivalent because the size pattern refuses an empty value.

The tests ran in the reviewed worktree, which stayed clean: `git status --short` empty before and after, head unchanged. Mutations stood only in the scratch export and inside containers, which `--rm` removed. No `sleep.exe` and no `loop2-review` container remain. The image `ubuntu:22.04` was already on this computer, and `apt` ran inside the containers only.

Scripts and outputs: `C:\Users\Mariusz\AppData\Local\Temp\claude\C--Storage-repos-loop2\8602360d-b02d-44a0-8dc2-b547067927f8\scratchpad\check\check.sh`, `C:\Users\Mariusz\AppData\Local\Temp\claude\C--Storage-repos-loop2\8602360d-b02d-44a0-8dc2-b547067927f8\scratchpad\check\check2.sh`, `C:\Users\Mariusz\AppData\Local\Temp\claude\C--Storage-repos-loop2\8602360d-b02d-44a0-8dc2-b547067927f8\scratchpad\out\linux.txt`, `C:\Users\Mariusz\AppData\Local\Temp\claude\C--Storage-repos-loop2\8602360d-b02d-44a0-8dc2-b547067927f8\scratchpad\out\linux2.txt`.

**Could not run:** anything against Strych, `pusher` or the server, by the handoff; a real cron, which is H2.8; the full `npm test`, which is the cycle's own run. Delivery of the notice stays unverified.

## Reach beyond the dispatch

- `src/server/account-backup.ts`, whole: what exit 0 promises, for concern 1.
- `compose.yaml`, `container_name`: that `CONTAINER_NAME=loop2` names the application's container.
- `tests/invariants/loop2_invariant_support.py` `docker_commands`, `shell_commands` and `deployment_files`: what the new test reads, and why `deploy/*` counts.
- `tests/invariants/test_account_server_runtime.py:190-226`: how it reads the new files.
- `docs/task-cycles/kopia-bazy/cycle.md:109`, by search: the source of the notice's words.
- `foundations/decisions.md` D-13, D-84, D-214 to D-221; `foundations/invariants.md` account-server-typecheck and loop2-host-sharing: named by the slice's *Read*, read whole.
- The owner's `playbook_code_review.md` and `.ai/rules/scripts.md` in the vault, as his global instructions ask; the report's form stays the-way's.

## Searches not found or unclear

- Whether cron's job process on this server can go away while the script runs: unclear, not looked for on the server.
- Where `pusher` lives on the server: unclear, as the author's report says; H2.6 shows it.
