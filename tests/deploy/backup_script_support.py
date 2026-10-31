"""The test seam of the nightly backup script `deploy/loop2-backup`.

Each test runs a temporary copy of the script in which only the marked constants block is
replaced, as `deploy_script_support.py` does for `deploy/loop2-deploy`, whose block reader this
file shares: the copy's `PATH` puts a directory of stand-ins first, and its paths point into a
temporary directory. Everything outside the block is checked to be byte-identical to the
repository's script before any run.

What a run gets:
- stand-ins for `docker`, `age`, `rsync`, `flock`, `pusher` and `date`, written at run time with LF
  endings; each records its arguments in one ordered file and answers as the test sets
  (`BackupFixture.answer`). They prove the script's reaction to an answer, never a delivery
  (D-221): nothing here reaches Mikrus Strych or the `pusher` service;
- stand-ins for `ssh`, `scp`, `sftp` and `curl`, which the script itself never calls, so a call of
  one shows in `Result.tools()` and a real one is never reached;
- a guard, before every run, that stops the test when any of these tools resolves outside the
  stand-ins' directory on the copy's `PATH`;
- by default a `docker` that writes PLAIN_DATABASE to standard output, an `age` that keeps what it
  read and writes CIPHERTEXT to its `--output`, an `rsync` that keeps the file it was given and
  the log as it found it, and notes whether the lock's file descriptor is still open, and a
  `pusher` that keeps what it read;
- on request, a reader of the script's standard output that reads some lines and leaves, closing
  its end of a real pipe, while a stand-in waits for it, so the next line the script prints raises
  a real SIGPIPE (`BackupFixture.run`);
- `timeout`, `mktemp`, `stat` and `rm` of the machine, so a time limit, a missing directory and a
  missing file are real;
- Git's own bash, found as `deploy_script_support.git_bash` finds it;
- standard output and standard error written to files, so a process left behind cannot hold a pipe
  of the test open; a run past RUN_TIMEOUT has its whole process tree stopped and fails the test
  (D-84).

A machine without Git or Git's bash skips the test, so it reports itself unchecked, never passed.
"""

import os
import shutil
import subprocess
import sys
import tempfile

sys.path.insert(0, os.path.join(os.path.dirname(os.path.abspath(__file__)), "..", "invariants"))

import deploy_script_support as deploy_support
import loop2_invariant_support as process_support

ROOT = deploy_support.ROOT
SCRIPT = os.path.join(ROOT, "deploy", "loop2-backup")
SCHEDULE = os.path.join(ROOT, "deploy", "loop2-backup.cron")

STAND_INS = ("docker", "age", "rsync", "flock", "pusher", "date")
NEVER_CALLED = ("ssh", "scp", "sftp", "curl")
STUBBED_TOOLS = STAND_INS + NEVER_CALLED

# What the docker stand-in writes as the database: the marker must stay inside the pipe.
PLAIN_MARKER = "plain-player-address-marker-5c1e"
PLAIN_DATABASE = b"SQLite format 3\x00" + PLAIN_MARKER.encode() + b"\n"
CIPHERTEXT = b"0123456789abcdef" * 64
CIPHERTEXT_SIZE = "1024"       # 16 bytes times 64, by hand
TIMESTAMP = "2026-10-31T02:17:00Z"
WEEKDAY_FILES = tuple(f"loop2-accounts-{day}.sqlite.age" for day in "1234567")

RUN_TIMEOUT = 45    # seconds for one run of the copy; a run past it fails its test
HANG_SECONDS = 120  # a hanging stand-in outlasts RUN_TIMEOUT, so only a time limit ends it
READER_TRIES = 300  # tenths of a second a stand-in waits for the reader to have left

STUB = """#!/bin/bash
# Stand-in for {tool}, written by tests/deploy/backup_script_support.py.
stubs='{stubs}'
printf -v record '%s\\037' {tool} "$@"
printf '%s\\036' "$record" >>"$stubs/calls/all"
output=''
if [[ -e $stubs/wait-for-reader/{tool} ]]; then
  for (( tries = 0; tries < {reader_tries}; tries++ )); do
    [[ -e $stubs/calls/reader-left ]] && break
    sleep 0.1
  done
fi
{before}
for rule in "$stubs/answers/{tool}"/*; do
  [[ -d $rule ]] || continue
  pattern=$(<"$rule/pattern")
  if [[ "$*" == $pattern ]]; then
    if [[ -n $output && -f $rule/output ]]; then cp "$rule/output" "$output"; fi
    cat "$rule/stdout"
    cat "$rule/stderr" >&2
    case $(<"$rule/action") in
      hang) exec sleep {hang} ;;
      kill) kill -KILL $$ ;;
      HUP | INT | USR1 | USR2 | ALRM | TERM | VTALRM)
        kill -"$(<"$rule/action")" "$LOOP2_TEST_SCRIPT" ;;
    esac
    exit "$(<"$rule/exit")"
  fi
done
{default}
exit 0
"""

BEFORE = {
    "age": """cat >>"$stubs/calls/age-input"
previous=''
for argument in "$@"; do
  [[ $previous == --output ]] && output=$argument
  previous=$argument
done""",
    "rsync": """for argument in "$@"; do
  if [[ $argument != -* ]]; then
    cp "$argument" "$stubs/calls/sent"
    break
  fi
done
if { : >&9; } 2>/dev/null; then
  : >"$stubs/calls/lock-descriptor-open"
fi
cp "$stubs/../var/log/loop2-backup.log" "$stubs/calls/log-at-send"
""",
    "pusher": 'cat >>"$stubs/calls/pusher-input"',
}

DEFAULT = {
    "docker": 'cat "$stubs/plain-database"',
    "age": 'cat "$stubs/ciphertext" >"$output"',
    "date": f"""if [[ $* == *%u* ]]; then
  if [[ $* == *-u* || $* == *--utc* ]]; then
    cat "$stubs/weekday-utc"
  else
    cat "$stubs/weekday-local"
  fi
else
  printf '%s\\n' '{TIMESTAMP}'
fi""",
}

LAUNCHER = """#!/bin/bash
# Starts the copy; the process keeps its number through exec, so a stand-in can signal it.
export LOOP2_TEST_SCRIPT=$$
script=$1
shift
exec "$BASH" "$script" "$@"
"""

READER_LAUNCHER = """#!/bin/bash
# Starts the copy with its standard output in a real pipe. The reader reads the lines it was told
# to, closes its end and only then says so, so a stand-in waiting for that knows the pipe is broken.
script=$1 lines=$2 left=$3
shift 3
"$BASH" "$script" "$@" | {
  for (( line = 0; line < lines; line++ )); do
    IFS= read -r _ignored
  done
  exec 0<&-
  : >"$left"
}
exit "${PIPESTATUS[0]}"
"""


class Result:
    def __init__(self, code, stdout, stderr, calls, log, notice_input, age_input, sent, lock_open,
                 log_at_send):
        self.code = code
        self.stdout = stdout
        self.stderr = stderr
        self.calls = calls                # [[tool, argument, ...], ...] in the order of the calls
        self.log = log
        self.notice_input = notice_input  # the bytes every pusher call read, as one
        self.age_input = age_input        # the bytes age read
        self.sent = sent                  # the bytes of the file rsync was given, or None
        self.lock_open = lock_open        # rsync found the lock's file descriptor open
        self.log_at_send = log_at_send    # the log as rsync found it when it started

    def of(self, tool):
        """The argument lists of a tool's calls, in order."""
        return [call[1:] for call in self.calls if call[0] == tool]

    def tools(self):
        return [call[0] for call in self.calls]

    def __repr__(self):
        return (f"exit {self.code}\n--- stdout ---\n{self.stdout}\n--- stderr ---\n{self.stderr}"
                f"\n--- log ---\n{self.log}\n--- calls ---\n{self.calls}")


class BackupFixture:
    """A temporary directory holding the copy of the script, its stand-ins and the files its
    constants block points at."""

    def __init__(self):
        self.bash = deploy_support.git_bash()
        self.root = tempfile.mkdtemp(prefix="loop2-backup-test-")
        try:
            self._build()
        except BaseException:
            self.remove()
            raise

    def path(self, *parts):
        return os.path.join(self.root, *parts)

    def _build(self):
        self.stubs = self.path("stubs")
        for tool in STUBBED_TOOLS:
            stub = STUB.format(tool=tool, stubs=deploy_support.shell_path(self.stubs),
                               hang=HANG_SECONDS, reader_tries=READER_TRIES,
                               before=BEFORE.get(tool, ""),
                               default=DEFAULT.get(tool, "")).encode()
            deploy_support.write_bytes(os.path.join(self.stubs, tool), stub)
            os.chmod(os.path.join(self.stubs, tool), 0o755)
            os.makedirs(os.path.join(self.stubs, "answers", tool), exist_ok=True)
        deploy_support.write_bytes(os.path.join(self.stubs, "plain-database"), PLAIN_DATABASE)
        deploy_support.write_bytes(os.path.join(self.stubs, "ciphertext"), CIPHERTEXT)
        self.set_weekday("6")
        self.launcher = self.path("launcher.sh")
        deploy_support.write_bytes(self.launcher, LAUNCHER.encode())
        self.reader_launcher = self.path("reader-launcher.sh")
        deploy_support.write_bytes(self.reader_launcher, READER_LAUNCHER.encode())
        self.guard = self.path("guard.sh")
        deploy_support.write_bytes(self.guard, deploy_support.GUARD.encode())

        self.log_file = self.path("var", "log", "loop2-backup.log")
        self.lock_file = self.path("run", "loop2-deploy.lock")
        self.key_file = self.path("etc", "loop2", "backup-encryption-key")
        self.known_hosts = self.path("etc", "loop2", "strych-known-hosts")
        self.temporary_root = self.path("tmp")
        os.makedirs(self.temporary_root)
        for file in (self.log_file, self.lock_file):
            os.makedirs(os.path.dirname(file), exist_ok=True)
        deploy_support.write_bytes(self.key_file, b"AGE-SECRET-KEY-STAND-IN\n")
        deploy_support.write_bytes(self.known_hosts, b"stand-in host key line\n")

        if os.name == "nt":
            self.copy_path_value = deploy_support.shell_path(self.stubs) + ":/mingw64/bin:/usr/bin:/bin"
        else:
            self.copy_path_value = self.stubs + ":/usr/bin:/bin"
        self.copy = self.path("copy", "loop2-backup")
        self.write_copy()

    def write_copy(self, **extra):
        """Write the copy: the repository's script with only the block's paths, its PATH and the
        constants named in `extra` replaced; everything outside the block stays byte-identical."""
        source = deploy_support.read_bytes(SCRIPT)
        shell_path = deploy_support.shell_path
        overrides = {
            "PATH": self.copy_path_value,
            "LOG_FILE": shell_path(self.log_file),
            "LOCK_FILE": shell_path(self.lock_file),
            "ENCRYPTION_KEY_FILE": shell_path(self.key_file),
            "STRYCH_KNOWN_HOSTS_FILE": shell_path(self.known_hosts),
            "TEMPORARY_ROOT": shell_path(self.temporary_root),
        }
        overrides.update(extra)
        deploy_support.write_bytes(self.copy, deploy_support.replace_block(source, overrides))
        os.chmod(self.copy, 0o755)
        source_head, _lines, source_tail = deploy_support.split_script(source)
        copy_head, _lines, copy_tail = deploy_support.split_script(
            deploy_support.read_bytes(self.copy))
        if (source_head, source_tail) != (copy_head, copy_tail):
            raise AssertionError("the copy differs from deploy/loop2-backup outside the constants "
                                 "block")

    def remove(self):
        shutil.rmtree(self.root, ignore_errors=True)

    def set_weekday(self, utc, local="9"):
        """What the date stand-in answers for the day of the week, by UTC and by local time; a
        run that uses the local one gets a name of no weekday file."""
        deploy_support.write_bytes(os.path.join(self.stubs, "weekday-utc"), (utc + "\n").encode())
        deploy_support.write_bytes(os.path.join(self.stubs, "weekday-local"),
                                   (local + "\n").encode())

    def answer(self, tool, exit_code=0, stdout=b"", stderr=b"", match="*", action="", output=None):
        """Make a stand-in answer the calls whose arguments, joined by spaces, match a bash
        pattern; rules are tried in the order given, the first match answers, and a call no rule
        matches gets the tool's default. `action` is `hang`, `kill` (the stand-in kills itself) or
        a signal's name, sent to the script. `output` is what `age` leaves at its `--output`; with
        None, a matching rule leaves no file there."""
        directory = os.path.join(self.stubs, "answers", tool)
        rule = os.path.join(directory, f"{len(os.listdir(directory)):03d}")
        deploy_support.write_bytes(os.path.join(rule, "pattern"), match.encode())
        deploy_support.write_bytes(os.path.join(rule, "exit"), str(exit_code).encode())
        deploy_support.write_bytes(os.path.join(rule, "stdout"), stdout)
        deploy_support.write_bytes(os.path.join(rule, "stderr"), stderr)
        deploy_support.write_bytes(os.path.join(rule, "action"), action.encode())
        if output is not None:
            deploy_support.write_bytes(os.path.join(rule, "output"), output)

    def guard_stubs(self):
        """Stop the test when any stubbed tool resolves outside the stand-ins' directory on the
        copy's PATH."""
        result = subprocess.run(
            [self.bash, deploy_support.shell_path(self.guard), self.copy_path_value,
             *STUBBED_TOOLS], capture_output=True, timeout=RUN_TIMEOUT, check=False)
        resolved = dict(line.split("=", 1) for line in
                        result.stdout.decode("utf-8", "replace").splitlines() if "=" in line)
        expected_prefix = deploy_support.shell_path(self.stubs) + "/"
        wrong = {tool: resolved.get(tool, "") for tool in STUBBED_TOOLS
                 if not resolved.get(tool, "").startswith(expected_prefix)}
        if result.returncode != 0 or wrong:
            raise AssertionError(f"guard: on the copy's PATH these tools resolve outside the "
                                 f"stand-ins' directory {expected_prefix}: {wrong}; the run is "
                                 "aborted")

    def _read_calls(self):
        """Each stand-in writes its record in one write, so the two stages of the pipe, which run
        at once, cannot interleave theirs."""
        path = os.path.join(self.stubs, "calls", "all")
        if not os.path.exists(path):
            return []
        text = deploy_support.read_bytes(path).decode("utf-8", "replace")
        return [record.split("\x1f")[:-1] for record in text.split("\x1e")[:-1]]

    def _call_file(self, name):
        path = os.path.join(self.stubs, "calls", name)
        return deploy_support.read_bytes(path) if os.path.exists(path) else None

    def run(self, arguments=(), reader_lines=None, reader_awaited_by="docker"):
        """Run the copy once and return its Result. A run past RUN_TIMEOUT has its process tree
        stopped and raises AssertionError. With `reader_lines`, standard output goes to a reader
        that leaves after that many lines, and the tool named by `reader_awaited_by` does not go
        on until it has left."""
        self.guard_stubs()
        shell_path = deploy_support.shell_path
        command = [self.bash, shell_path(self.launcher), shell_path(self.copy), *arguments]
        if reader_lines is not None:
            deploy_support.write_bytes(os.path.join(self.stubs, "wait-for-reader",
                                                    reader_awaited_by), b"")
            command = [self.bash, shell_path(self.reader_launcher), shell_path(self.copy),
                       str(reader_lines), shell_path(os.path.join(self.stubs, "calls",
                                                                  "reader-left")), *arguments]
        calls = os.path.join(self.stubs, "calls")
        shutil.rmtree(calls, ignore_errors=True)
        os.makedirs(calls)
        out_path, err_path = self.path("stdout.txt"), self.path("stderr.txt")
        with open(out_path, "wb") as out, open(err_path, "wb") as err:
            process = process_support.popen(command, cwd=self.root, stdout=out, stderr=err)
            try:
                code = process.wait(timeout=RUN_TIMEOUT)
            except subprocess.TimeoutExpired:
                process_support.kill_tree(process)
                raise AssertionError(f"the run did not end within {RUN_TIMEOUT} s; its processes "
                                     "were stopped") from None
        return Result(code, deploy_support.read_bytes(out_path).decode("utf-8", "replace"),
                      deploy_support.read_bytes(err_path).decode("utf-8", "replace"),
                      self._read_calls(), self.log_text(),
                      self._call_file("pusher-input") or b"", self._call_file("age-input") or b"",
                      self._call_file("sent"), self._call_file("lock-descriptor-open") is not None,
                      (self._call_file("log-at-send") or b"").decode("utf-8", "replace"))

    def log_text(self):
        return deploy_support.read_bytes(self.log_file).decode("utf-8", "replace") \
            if os.path.exists(self.log_file) else ""

    def left_in_temporary_root(self):
        return os.listdir(self.temporary_root)
