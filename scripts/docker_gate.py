"""Docker for the tests that need a Docker daemon: start Docker Desktop when it is not answering
(D-390, D-391, D-392).

A test that needs a daemon calls `require_daemon`. Where a daemon answers, the test goes on.
Where none answers and this computer has Docker Desktop (the `docker desktop` command exists),
the first such test starts Docker Desktop and waits for a daemon to answer, at most
`START_LIMIT` seconds; Docker Desktop stays running afterwards, whatever came of it. Where none
answers and there is no Docker Desktop to start, the test is skipped at once.

A start that did not finish in the limit is written to a state file named by the environment
variable `LOOP2_DOCKER_RUN_STATE`. `scripts/test.py` gives one file to a whole run (`shared_state`),
and the processes the run starts, one for each directory of Python tests, inherit the variable, so
every later test of the run is skipped at once and the run waits at most once. A process that finds
no variable makes a file of its own for itself and the processes it starts.

A start in progress is known to the other processes of the run by a lock the process that starts
holds beside the state file, from before it asks Docker Desktop to start until it has the answer.
A process that finds no daemon and the lock held waits for the lock instead of starting, and then
goes by what the start left: a gap recorded, a daemon answering, or, where the process that
started died, neither, and then it starts itself. The operating system releases the lock of a
process that died, so a dead start holds no one.

`LOOP2_DOCKER_START_LIMIT` (seconds) replaces the limit; the tests of this module use it to wait
seconds, not minutes.
"""

import atexit
import contextlib
import json
import os
import shutil
import subprocess
import sys
import tempfile
import time

START_LIMIT = 180        # seconds the first test that needs Docker waits for a daemon to answer
ANSWER_LIMIT = 30        # seconds for one `docker version` to answer
START_COMMAND_LIMIT = 60  # seconds for `docker desktop start` itself to return
POLL_INTERVAL = 1        # seconds between two asks of the daemon while waiting

if sys.platform == "win32":
    import msvcrt

    def try_lock(descriptor):
        """True when this process now holds the lock of the open file `descriptor`."""
        try:
            msvcrt.locking(descriptor, msvcrt.LK_NBLCK, 1)
        except OSError:
            return False
        return True
else:
    import fcntl

    def try_lock(descriptor):
        """True when this process now holds the lock of the open file `descriptor`."""
        try:
            fcntl.flock(descriptor, fcntl.LOCK_EX | fcntl.LOCK_NB)
        except OSError:
            return False
        return True

STATE_VARIABLE = "LOOP2_DOCKER_RUN_STATE"
LIMIT_VARIABLE = "LOOP2_DOCKER_START_LIMIT"


def docker_command():
    return shutil.which("docker")


def daemon_answers(timeout=ANSWER_LIMIT):
    """True when `docker version` names a server version. Only an answer of the daemon counts."""
    docker = docker_command()
    if docker is None:
        return False
    try:
        result = subprocess.run([docker, "version", "--format", "{{.Server.Version}}"],
                                stdin=subprocess.DEVNULL, capture_output=True, timeout=timeout)
    except (OSError, subprocess.TimeoutExpired):
        return False
    return result.returncode == 0 and result.stdout.strip() != b""


def desktop_present(timeout=ANSWER_LIMIT):
    """True when this computer's `docker` has the `desktop` command, which Docker Desktop installs."""
    try:
        result = subprocess.run([docker_command(), "desktop", "--help"],
                                stdin=subprocess.DEVNULL, capture_output=True,
                                timeout=timeout)
    except (OSError, subprocess.TimeoutExpired):
        return False
    return result.returncode == 0


def start_limit():
    try:
        return float(os.environ[LIMIT_VARIABLE])
    except (KeyError, ValueError):
        return START_LIMIT


def state_file():
    path = os.environ.get(STATE_VARIABLE)
    if not path:
        folder = tempfile.mkdtemp(prefix="loop2-docker-run-")
        atexit.register(shutil.rmtree, folder, ignore_errors=True)
        path = os.path.join(folder, "state.json")
        os.environ[STATE_VARIABLE] = path
    return path


def recorded_gap():
    try:
        with open(state_file(), encoding="utf-8") as handle:
            return json.load(handle)["gap"]
    except (OSError, ValueError, KeyError):
        return None


def record_gap(gap):
    with open(state_file(), "w", encoding="utf-8") as handle:
        json.dump({"gap": gap}, handle)


@contextlib.contextmanager
def shared_state():
    """One state file for the processes started inside the block: a whole run of the gate."""
    previous = os.environ.get(STATE_VARIABLE)
    with tempfile.TemporaryDirectory(prefix="loop2-docker-run-") as folder:
        os.environ[STATE_VARIABLE] = os.path.join(folder, "state.json")
        try:
            yield
        finally:
            if previous is None:
                del os.environ[STATE_VARIABLE]
            else:
                os.environ[STATE_VARIABLE] = previous


@contextlib.contextmanager
def start_lock():
    """Held by the one process of a run that is starting Docker Desktop. Yields whether the
    process had to wait for another to let go. The lock is the operating system's, on a file
    beside the state file, and is let go of when its holder ends, however it ends."""
    descriptor = os.open(state_file() + ".lock", os.O_RDWR | os.O_CREAT)
    try:
        waited = False
        while not try_lock(descriptor):
            waited = True
            time.sleep(POLL_INTERVAL)
        yield waited
    finally:
        os.close(descriptor)


def start_desktop(timeout=START_COMMAND_LIMIT):
    """Asks Docker Desktop to start, without waiting for it and without keeping its output."""
    with contextlib.suppress(OSError, subprocess.TimeoutExpired):
        subprocess.run([docker_command(), "desktop", "start", "--detach"],
                       stdin=subprocess.DEVNULL, stdout=subprocess.DEVNULL,
                       stderr=subprocess.DEVNULL, timeout=timeout)


def within(deadline, cap):
    """The time limit of one call of `docker`: its own cap, or what remains until the deadline
    where that is less, and never under a second."""
    return max(1, min(cap, deadline - time.monotonic()))


def daemon_gap():
    """None when a Docker daemon answers, after starting Docker Desktop if that was needed and
    possible; otherwise the sentence that says why no daemon answers. The limit is counted from
    the first ask, or from the end of the wait for another process's start where this process,
    after that wait, must start Docker Desktop itself; every call of `docker` here is held to
    what remains of it."""
    gap = recorded_gap()
    if gap:
        return gap
    limit = start_limit()
    deadline = time.monotonic() + limit
    if daemon_answers(timeout=within(deadline, ANSWER_LIMIT)):
        return None
    if docker_command() is None:
        return "no Docker daemon answers: `docker` is not on PATH"
    if not desktop_present(timeout=within(deadline, ANSWER_LIMIT)):
        return "no Docker daemon answers, and this computer has no Docker Desktop to start"
    with start_lock() as waited:
        gap = recorded_gap()
        if gap:
            return gap
        if waited:
            deadline = time.monotonic() + limit
            if daemon_answers(timeout=within(deadline, ANSWER_LIMIT)):
                return None
        return started_gap(limit, deadline)


def started_gap(limit, deadline):
    """Starts Docker Desktop and waits for a daemon until `deadline`: None when one answers,
    otherwise the gap, which is recorded for the run. Called with the start lock held."""
    start_desktop(timeout=within(deadline, START_COMMAND_LIMIT))
    while True:
        if daemon_answers(timeout=within(deadline, ANSWER_LIMIT)):
            return None
        if time.monotonic() >= deadline:
            break
        time.sleep(min(POLL_INTERVAL, max(0, deadline - time.monotonic())))
    gap = (f"no Docker daemon answers: the gate tried to start Docker Desktop and no daemon "
           f"answered within {limit:g} seconds")
    record_gap(gap)
    return gap


def require_daemon(case, unchecked):
    """Returns when a Docker daemon answers; otherwise skips `case`, saying why and what stays
    unchecked (`unchecked` is that sentence, such as "whether X works stays unchecked")."""
    gap = daemon_gap()
    if gap:
        case.skipTest(f"{gap}; {unchecked}")
