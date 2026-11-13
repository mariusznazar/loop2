"""A stand-in `docker` command for the tests of the gate's Docker start.

The stand-in stands first on PATH, keeps every call it gets in a log, and answers the three
questions the gate asks of the real `docker`: whether a daemon answers `version`, whether the
Docker Desktop plugin knows `desktop`, and what `desktop start` does. It never starts or stops
anything of this computer, so what it proves is the gate's reaction, not a real start.
"""

import json
import os
from pathlib import Path
import sys
import tempfile

PROGRAM = '''\
import json
import sys
from pathlib import Path

folder = Path(__file__).resolve().parent
arguments = sys.argv[1:]
with (folder / "calls.log").open("a", encoding="utf-8") as log:
    log.write(json.dumps(arguments) + "\\n")
state_file = folder / "state.json"
state = json.loads(state_file.read_text(encoding="utf-8"))

if arguments[:2] == ["desktop", "--help"]:
    if not state["plugin"]:
        sys.stderr.write("docker: unknown command: docker desktop\\n")
        sys.exit(1)
elif arguments[:2] == ["desktop", "start"]:
    if not state["plugin"]:
        sys.exit(1)
    state["started"] = True
elif arguments[:1] == ["version"]:
    if state["started"]:
        state["polls"] += 1
    rise = state["rise_after_polls"]
    if state["answers"] or (state["started"] and rise is not None and state["polls"] > rise):
        state["answers"] = True
        code = 0
    else:
        code = 1
    state_file.write_text(json.dumps(state), encoding="utf-8")
    if code:
        sys.stderr.write("error during connect: the daemon is not running\\n")
    else:
        sys.stdout.write("99.0.0\\n")
    sys.exit(code)
else:
    sys.exit(2)
state_file.write_text(json.dumps(state), encoding="utf-8")
'''


class DockerStandIn:
    """`answers`: a daemon answers from the start. `plugin`: the Docker Desktop plugin exists.
    `rise_after_polls`: after `desktop start`, the daemon answers from the call of `version`
    that follows that many calls of it; None, never."""

    def __init__(self, case, answers=False, plugin=True, rise_after_polls=None):
        temporary = tempfile.TemporaryDirectory(prefix="loop2-docker-standin-")
        case.addCleanup(temporary.cleanup)
        self.folder = Path(temporary.name)
        (self.folder / "standin_docker.py").write_text(PROGRAM, encoding="utf-8")
        (self.folder / "state.json").write_text(json.dumps({
            "answers": answers, "plugin": plugin, "rise_after_polls": rise_after_polls,
            "started": False, "polls": 0}), encoding="utf-8")
        python = sys.executable
        if sys.platform == "win32":
            (self.folder / "docker.cmd").write_text(
                f'@"{python}" "%~dp0standin_docker.py" %*\r\n', encoding="utf-8", newline="")
        else:
            launcher = self.folder / "docker"
            launcher.write_text(f'#!/bin/sh\nexec "{python}" "$(dirname "$0")/standin_docker.py" '
                                '"$@"\n', encoding="utf-8")
            launcher.chmod(0o755)

    def environment(self, **extra):
        """The environment of this process with the stand-in first on PATH."""
        environment = dict(os.environ)
        environment["PATH"] = os.fspath(self.folder) + os.pathsep + environment["PATH"]
        environment.update(extra)
        return environment

    def calls(self):
        """The arguments of each call the stand-in has got, in order."""
        log = self.folder / "calls.log"
        if not log.exists():
            return []
        return [json.loads(line) for line in log.read_text(encoding="utf-8").splitlines()]

    def starts(self):
        return [call for call in self.calls() if call[:2] == ["desktop", "start"]]

    def stops(self):
        """Every call that would take Docker Desktop down or restart it."""
        return [call for call in self.calls() if call[:2] in (["desktop", "stop"],
                                                              ["desktop", "restart"])]
