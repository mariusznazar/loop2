"""The test seam of the failure watcher `deploy/loop2-watch`.

It stands on the seam of `backup_script_support.py`, which it imports and does not change: each test
runs a temporary copy of the script in which only the marked constants block is replaced, the copy's
`PATH` puts a directory of stand-ins first and its paths point into a temporary directory. The
fixture is a subclass of `BackupFixture`, so the stand-ins' machinery (answers by pattern, a hang,
a signal sent to the script, the guard that no stand-in resolves outside its directory) is the
backup's own. Everything outside the block is checked to be byte-identical to the repository's
script before any run.

What a run gets:
- stand-ins for `docker`, `pusher`, `flock` and `date`, written at run time with LF endings; each
  records its arguments in one ordered file and answers as the test sets (`WatchFixture.answer`).
  They prove the script's reaction to an answer, never a delivery and never what Docker's `inspect`
  and `logs` really return (D-235): nothing here reaches `pusher` or a Docker daemon;
- stand-ins for `age`, `rsync`, `ssh`, `scp`, `sftp` and `curl`, which the watcher never calls, so a
  call of one shows in `WatchResult.tools()` and a real one is never reached;
- a `docker` that answers `inspect` with the line a test put in the container's file and `logs`
  with the text a test put in the log file, and the same two on the standard error; a container
  with no file does not exist;
- a `date` that gives the clock the test set (`set_clock`), as whole seconds since the epoch, and a
  second later at each further ask of the same run, so a script that reads the time again for the
  end of its window shows it;
- a `flock` that, besides the answers by pattern, refuses a shared lock from the Nth look at the
  deployment's lock on (`hold_deploy_lock_from`), so a deployment that begins between the two looks
  of one run can be made;
- a `pusher` that keeps what it read from each call, one record per call;
- `timeout`, `mkdir`, `mv` and `rm` of the machine, so a time limit and a missing directory are real;
- the state directory, the log, the watcher's own lock and the deployment's lock under the
  temporary directory, the deployment's lock file present and empty as a deployment leaves it;
- standard output and standard error written to files, so a process left behind cannot hold a pipe
  of the test open; a run past RUN_TIMEOUT has its whole process tree stopped and fails the test.

A machine without Git or Git's bash skips the test, so it reports itself unchecked, never passed.
"""

import os
import shutil
import subprocess

import backup_script_support as backup_support

deploy_support = backup_support.deploy_support
process_support = backup_support.process_support

ROOT = deploy_support.ROOT
SCRIPT = os.path.join(ROOT, "deploy", "loop2-watch")
SCHEDULE = os.path.join(ROOT, "deploy", "loop2-watch.cron")

GAME = "loop2"
TUNNEL = "loop2-cloudflared"
KINDS = ("down", "unhealthy", "restarted", "failures", "browser")
RECORD_SEPARATOR = b"\x1e"

# 2026-11-09T00:00:00Z as seconds since the epoch, by hand: from 1970-01-01 to 2026-01-01 are
# 56 years of 365 days and 14 leap days (1972 to 2024), 20454 days, which is 1767225600 seconds;
# 9 November is the 313th day of 2026, so 312 days more: 312 * 86400 = 26956800.
T0 = 1794182400
MINUTES = 60

GAME_ID = "0123456789abcdef" * 4
TUNNEL_ID = "fedcba9876543210" * 4
OTHER_ID = "abcdef0123456789" * 4
STARTED = "2026-11-08T22:00:00.123456789Z"
RESTARTED = "2026-11-09T00:03:00.000000000Z"

# The notices as the script words them (D-356 fixes only that they say which kind of trouble was
# found): the subject goes into a URL path, so it is ASCII; the text is one sentence line in
# UTF-8, and it differs per kind. The test of the invariant failure-watcher-message holds these words fixed.
NOTICES = {
    "down": ("loop2_gra_nie_dziala",
             "Gra loop2 nie działa: kontener gry albo tunelu nie jest uruchomiony. "
             "Co dalej: skill loop2-deploy."),
    "unhealthy": ("loop2_usluga_niezdrowa",
                  "Usługa gry loop2 jest niezdrowa: kontrola zdrowia kontenera zawodzi. "
                  "Co dalej: skill loop2-deploy."),
    "restarted": ("loop2_ponowny_start",
                  "Kontener gry albo tunelu loop2 wystartował od nowa. "
                  "Co dalej: skill loop2-deploy."),
    "failures": ("loop2_awarie_serwera",
                 "Serwer gry loop2 zapisał awarie w logu. Co dalej: skill loop2-deploy."),
    "browser": ("loop2_awarie_przegladarek",
                "Przeglądarki graczy zgłosiły awarie gry loop2. "
                "Co dalej: skill loop2-deploy."),
}

STAND_INS = ("docker", "pusher", "flock", "date")
NEVER_CALLED = ("age", "rsync", "ssh", "scp", "sftp", "curl")

BEFORE = {
    "pusher": 'cat >>"$stubs/calls/pusher-input"; printf "\\036" >>"$stubs/calls/pusher-input"',
    "flock": """if [[ $* == *--shared* ]]; then
  looks=$(( $(cat "$stubs/calls/shared-looks" 2>/dev/null || echo 0) + 1 ))
  printf '%s' "$looks" >"$stubs/calls/shared-looks"
  if [[ -f $stubs/hold-shared-from ]] && (( looks >= $(<"$stubs/hold-shared-from") )); then
    exit 1
  fi
fi""",
}

DEFAULT = {
    "docker": """case $1 in
  inspect)
    for last in "$@"; do :; done
    if [[ -f $stubs/containers/$last ]]; then
      cat "$stubs/containers/$last"
      exit 0
    fi
    printf 'Error: No such object: %s\\n' "$last" >&2
    exit 1 ;;
  logs)
    cat "$stubs/log-output"
    cat "$stubs/log-error" >&2
    exit 0 ;;
esac""",
    "date": """if [[ $* == *%s* ]]; then
  asked=$(cat "$stubs/calls/date-asked" 2>/dev/null || echo 0)
  printf '%s' "$(( asked + 1 ))" >"$stubs/calls/date-asked"
  printf '%s\\n' "$(( $(cat "$stubs/clock") + asked ))"
else
  printf '%s\\n' '2026-11-09T00:00:00Z'
fi""",
}


class WatchResult:
    def __init__(self, code, stdout, stderr, calls, log, pusher_inputs):
        self.code = code
        self.stdout = stdout
        self.stderr = stderr
        self.calls = calls                  # [[tool, argument, ...], ...] in the order of the calls
        self.log = log                      # the watcher's log file after the run
        self.pusher_inputs = pusher_inputs  # [bytes read by each pusher call, ...], in order

    def of(self, tool):
        """The argument lists of a tool's calls, in order."""
        return [call[1:] for call in self.calls if call[0] == tool]

    def tools(self):
        return [call[0] for call in self.calls]

    def messages(self):
        """[(subject, text)] of the pusher calls: the subject is the call's only argument, the text
        what the call read from its standard input, one line."""
        return [(arguments[0] if len(arguments) == 1 else tuple(arguments),
                 data.decode("utf-8", "replace"))
                for arguments, data in zip(self.of("pusher"), self.pusher_inputs, strict=True)]

    def __repr__(self):
        return (f"exit {self.code}\n--- stdout ---\n{self.stdout}\n--- stderr ---\n{self.stderr}"
                f"\n--- log ---\n{self.log}\n--- calls ---\n{self.calls}"
                f"\n--- pusher inputs ---\n{self.pusher_inputs}")


class WatchFixture(backup_support.BackupFixture):
    """A temporary directory holding the copy of the watcher, its stand-ins and the files its
    constants block points at."""

    def _build(self):
        shell_path = deploy_support.shell_path
        self.stubs = self.path("stubs")
        for tool in backup_support.STUBBED_TOOLS:
            stub = backup_support.STUB.format(
                tool=tool, stubs=shell_path(self.stubs), hang=backup_support.HANG_SECONDS,
                reader_tries=backup_support.READER_TRIES, before=BEFORE.get(tool, ""),
                default=DEFAULT.get(tool, "")).encode()
            deploy_support.write_bytes(os.path.join(self.stubs, tool), stub)
            os.chmod(os.path.join(self.stubs, tool), 0o755)
            os.makedirs(os.path.join(self.stubs, "answers", tool), exist_ok=True)
        for name in ("log-output", "log-error"):
            deploy_support.write_bytes(os.path.join(self.stubs, name), b"")
        os.makedirs(os.path.join(self.stubs, "containers"))
        self.set_clock(T0)
        self.launcher = self.path("launcher.sh")
        deploy_support.write_bytes(self.launcher, backup_support.LAUNCHER.encode())
        self.guard = self.path("guard.sh")
        deploy_support.write_bytes(self.guard, deploy_support.GUARD.encode())

        self.log_file = self.path("var", "log", "loop2-watch.log")
        self.state_directory = self.path("var", "lib", "loop2-watch")
        self.state_file = os.path.join(self.state_directory, "state")
        self.own_lock = self.path("run", "loop2-watch.lock")
        self.deploy_lock = self.path("run", "loop2-deploy.lock")
        os.makedirs(os.path.dirname(self.log_file))
        os.makedirs(os.path.dirname(self.state_directory))
        os.makedirs(os.path.dirname(self.own_lock))
        deploy_support.write_bytes(self.deploy_lock, b"")

        if os.name == "nt":
            self.copy_path_value = shell_path(self.stubs) + ":/mingw64/bin:/usr/bin:/bin"
        else:
            self.copy_path_value = self.stubs + ":/usr/bin:/bin"
        self.copy = self.path("copy", "loop2-watch")
        self.write_copy()
        self.healthy()

    def write_copy(self, **extra):
        """Write the copy: the repository's script with only the block's paths, its PATH and the
        constants named in `extra` replaced; everything outside the block stays byte-identical."""
        source = deploy_support.read_bytes(SCRIPT)
        shell_path = deploy_support.shell_path
        overrides = {
            "PATH": self.copy_path_value,
            "LOG_FILE": shell_path(self.log_file),
            "STATE_DIRECTORY": shell_path(self.state_directory),
            "OWN_LOCK_FILE": shell_path(self.own_lock),
            "DEPLOY_LOCK_FILE": shell_path(self.deploy_lock),
        }
        overrides.update(extra)
        deploy_support.write_bytes(self.copy, deploy_support.replace_block(source, overrides))
        os.chmod(self.copy, 0o755)
        source_head, _lines, source_tail = deploy_support.split_script(source)
        copy_head, _lines, copy_tail = deploy_support.split_script(
            deploy_support.read_bytes(self.copy))
        if (source_head, source_tail) != (copy_head, copy_tail):
            raise AssertionError("the copy differs from deploy/loop2-watch outside the constants "
                                 "block")

    # --- what the stand-ins answer ----------------------------------------------------------------

    def set_clock(self, epoch):
        deploy_support.write_bytes(os.path.join(self.stubs, "clock"), f"{epoch}\n".encode())

    def set_container(self, name, container_id, status="running", health="none", started=STARTED):
        """The line `docker inspect` prints for a container, in the shape the watcher's format
        gives: the full id, the status, the health status or `none`, the start time."""
        self.set_container_output(name, f"{container_id} {status} {health} {started}\n")

    def set_container_output(self, name, text):
        deploy_support.write_bytes(os.path.join(self.stubs, "containers", name), text.encode())

    def remove_container(self, name):
        os.remove(os.path.join(self.stubs, "containers", name))

    def healthy(self):
        """Both containers running, the game healthy, the tunnel with no health check."""
        self.set_container(GAME, GAME_ID, health="healthy")
        self.set_container(TUNNEL, TUNNEL_ID)

    def set_log(self, text, errors=""):
        """What `docker logs` prints on its standard output and on its standard error."""
        deploy_support.write_bytes(os.path.join(self.stubs, "log-output"), text.encode())
        deploy_support.write_bytes(os.path.join(self.stubs, "log-error"), errors.encode())

    def hold_deploy_lock_from(self, look):
        """From the `look`-th ask for a shared lock of one run on, the lock is held: 1 is held at
        the first look, 2 is free at the first and held at the second."""
        deploy_support.write_bytes(os.path.join(self.stubs, "hold-shared-from"),
                                   f"{look}\n".encode())

    def release_deploy_lock(self):
        path = os.path.join(self.stubs, "hold-shared-from")
        if os.path.exists(path):
            os.remove(path)

    def clear_answers(self, tool):
        directory = os.path.join(self.stubs, "answers", tool)
        for rule in os.listdir(directory):
            shutil.rmtree(os.path.join(directory, rule))

    # --- the state and the log ----------------------------------------------------------------------

    def state_text(self):
        """The state file's text, or None when there is none."""
        if not os.path.exists(self.state_file):
            return None
        return deploy_support.read_bytes(self.state_file).decode("utf-8", "replace")

    def write_state(self, text):
        deploy_support.write_bytes(self.state_file, text.encode())

    def every_file(self, outside=()):
        """{path: bytes} of every file of the temporary directory but those under `outside`
        (paths of this fixture)."""
        found = {}
        for directory, _names, files in os.walk(self.root):
            if any(os.path.commonpath([directory, skipped]) == skipped for skipped in outside):
                continue
            for name in files:
                path = os.path.join(directory, name)
                found[path] = deploy_support.read_bytes(path)
        return found

    # --- a run --------------------------------------------------------------------------------------

    def _pusher_inputs(self):
        data = self._call_file("pusher-input") or b""
        return data.split(RECORD_SEPARATOR)[:-1]

    def run(self, arguments=()):
        """Run the copy once and return its WatchResult. A run past RUN_TIMEOUT has its process
        tree stopped and raises AssertionError."""
        self.guard_stubs()
        shell_path = deploy_support.shell_path
        command = [self.bash, shell_path(self.launcher), shell_path(self.copy), *arguments]
        calls = os.path.join(self.stubs, "calls")
        shutil.rmtree(calls, ignore_errors=True)
        os.makedirs(calls)
        out_path, err_path = self.path("stdout.txt"), self.path("stderr.txt")
        with open(out_path, "wb") as out, open(err_path, "wb") as err:
            process = process_support.popen(command, cwd=self.root, stdout=out, stderr=err)
            try:
                code = process.wait(timeout=backup_support.RUN_TIMEOUT)
            except subprocess.TimeoutExpired:
                process_support.kill_tree(process)
                raise AssertionError(f"the run did not end within {backup_support.RUN_TIMEOUT} s;"
                                     " its processes were stopped") from None
        return WatchResult(code, deploy_support.read_bytes(out_path).decode("utf-8", "replace"),
                           deploy_support.read_bytes(err_path).decode("utf-8", "replace"),
                           self._read_calls(), self.log_text(), self._pusher_inputs())

    def run_at(self, epoch, arguments=()):
        """Set the clock, then run once."""
        self.set_clock(epoch)
        return self.run(arguments)

    def prime(self, epoch=T0):
        """The first run on a clean machine: it writes the state and reports nothing."""
        result = self.run_at(epoch)
        if result.code != 0 or result.of("pusher") or self.state_text() is None:
            raise AssertionError(f"the first run did not end quietly with a state\n{result}")
        return result
