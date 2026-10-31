# Slice 5 report — the launcher of the restore trial

**Status:** done

## Files and commits

- `scripts/restore-trial.mjs` (new, about 550 lines after Prettier)
- `tests/deploy/test_restore_trial.py` (new, about 300 lines)
- Commit: see the commit line in the return message (one commit on `task/kopia-bazy`, base `f451316`).

## The command the owner runs, and its exit codes

```
<password> | node scripts/restore-trial.mjs --image <image> --database <decrypted file> --marker <text> --email <address>
```

The password must be one line on standard input (for example piped from a file); a terminal as standard input is
refused. Typing it into a command line would leave it in the shell history.

Exit codes: 0 PASS · 1 FAIL (the trial ran and judged the backup: login not 200, no saved game state, or
marker absent) · 2 refused (bad or missing argument, password as an argument, empty password, database not a
decrypted SQLite file; nothing was started) · 3 FAIL, the trial could not run to a judgement (docker missing,
image absent or not labelled loop2, copy not whole, server did not start or answer, probe gave no answer) ·
4 a container or volume could not be removed, its name printed after "left behind, remove by hand:" ·
130 interrupted (SIGINT, SIGTERM, SIGBREAK, SIGHUP), cleanup done.

Output lines, in order: `Node.js vX.Y.Z`, `image revision: <label>`, `login status: N`, `save revision: N|none`,
`marker in the saved game state: yes|no|not read`, then `PASS` or `FAIL: <reason>`. All lines are printed after the
cleanup, so the verdict is the last word.

## How it works (choices left to the maker)

- The file reaches the volume through a throw-away root container (`--network none`, `--entrypoint node`) that
  reads the database from its standard input and writes it into the data volume; it also makes the synthetic session
  key and SMTP password in the second volume per run. The container prints the byte count and the launcher compares
  it with the file's size, so a truncated copy is `NOT RUN`, not a login failure. No host path is bind-mounted, and
  the launcher writes no temporary file on the owner's computer.
- The server container runs with `--network none`: no mail can leave, a login sends none anyway. Mail settings are
  synthetic (`example.test`); the database path, secret file paths, public origin and proxy mode are those of
  `compose.yaml`, and a test compares them.
- The probe runs inside the container by its own Node.js, logs in with Cloudflare's headers, reads
  `GET /api/saved-game`, searches every string of the game for the marker and prints only numbers and booleans.
  Game text never leaves the container.
- Refusals precede every Docker call. The launcher never echoes an unknown argument (a password given by mistake
  would be shown). Docker's own error text is cut to 600 characters with address, password and marker replaced by
  `[hidden]`; the log tail (10 lines) is shown only when the server container exited at start.
- Cleanup removes container, setup container and both volumes, up to three attempts, then lists by name what
  remains (exit 4). Signals set a flag, kill the running docker client and make the main flow stop; cleanup runs
  with its own uninterruptible commands.

## Checks (command and exit code)

- Failing first: `npm test -- tests/deploy/test_restore_trial.py` against a stub launcher that exits 0 — exit 1,
  `failures=33, errors=1`, every failure an assertion on a missing refusal, output line or exit code (the error: the
  settings test, which found no `PRODUCTION_ENVIRONMENT` export).
- Passing: `npm test -- tests/deploy/test_restore_trial.py` — exit 0, 10 tests, 105 s, Docker 29.7.2 answered, none skipped.
- Broken once and caught, code restored byte-for-byte after each (checked with `cmp`):
  - the volume removal replaced by `volume ls` — exit 1, the leftover check and the verdict failed in all four
    run steps;
  - the marker judgement replaced by "found" — exit 1, only the absent-marker step failed.
- The refusals (password as an argument and the other cases) were seen failing in the first run; they were not
  broken separately.
- `npm test -- tests/quality/test_quality_invariants.py` — exit 0, 5 tests (ESLint, Ruff, Prettier, ShellCheck, audit).
- `npm test -- tests/invariants/test_loop2_host_sharing.py` — exit 0, 18 tests; `npm test -- tests/invariants/test_account_server_typecheck.py` — exit 0, 9 tests.
  Neither reads `scripts/`, so no list needed extending.
- `python -B .the-way/elements/common/foundation_check.py` — exit 0, "0 errors".
- No `loop2-restore-trial-*` container or volume was left after any run (`docker ps -a` and `docker volume ls`).

Not run: the full `npm test` (the gate is the orchestrator's); a run against a real Windows PowerShell
pipe with a non-ASCII password; the interruption test on Windows used `CTRL_BREAK_EVENT` (SIGBREAK), a Ctrl+C in a
terminal was not pressed by hand.

## Own-work check

Requirement most likely unmet: "removes its container and volumes after every end, a failure and Ctrl+C included, and
prints no game text, address or password." The test asserts, after PASS, wrong password, absent marker and an
interruption, that no container or volume with the launcher's prefix remains and that the output holds none of the
synthetic password, address, marker or another game text. All four held; the first mutation shows the check can fail.

## Part map

The part map already named the launcher in `build-tools` (E22, written before this slice) and `scripts/**`,
`tests/deploy/**` are claimed; I changed no part-map entry, so I did not apply `the-way-update-part-map`.

## Reaches beyond the dispatch

None beyond the files listed in the handoff plus `tests/invariants/loop2_invariant_support.py` and
`tests/deploy/test_account_storage.py` helpers imported by the test (read only).

## Searches not found or unclear

- The plan says "the production settings of `compose.yaml`"; the mail settings of compose point at the real SMTP
  host. I read this as the settings that decide the database and sessions, and kept mail synthetic and the network
  off. If the owner wants the real mail values, that contradicts "sends no mail".
- How PowerShell should hand the password to standard input is not settled by the task; the skill of the next slice
  must choose (a prompt, or a file piped in with `Get-Content`). Windows PowerShell 5.1 pipes through the console
  code page, so a non-ASCII password may arrive altered; the test account's password should be ASCII.
- Whether `image revision` belongs to the printed set: the plan lists other items; I added it so H3 can tie the
  run to the commit. Remove it if unwanted.

## Choices with the rejected way

- `--network none` for the server container (rejected: default bridge, as `test_account_storage.py`): costs nothing
  seen; if a future server start needs the network, it fails as NOT RUN with the server's log tail.
- Two kinds of failure exit (1 and 3), both printed as `FAIL`: the owner must not read exit 3 as a bad backup.
- Marker match is "any string value of the saved game state contains the marker", not equality, so a name inside a
  longer text counts.

## Problems observed

None unresolved.
