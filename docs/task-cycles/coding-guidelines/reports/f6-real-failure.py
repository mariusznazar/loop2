"""Exercise process observation using real failed child-process results."""

from pathlib import Path
import subprocess
import sys
from unittest.mock import patch

sys.path.insert(0, str(Path(__file__).resolve().parents[4] / "tests/invariants"))
import test_loop2_one_serving_process as observation

real_run = subprocess.run
cases = (
    ("windows processes", observation._processes, "nt", b"42 7 1700000000000 node.exe\r\n"),
    ("unix processes", observation._processes, "posix", b"42 7 node\n"),
    ("windows listeners", observation.tcp_listeners, "nt", b"42 127.0.0.1 3000\r\n"),
    ("unix listeners", observation.tcp_listeners, "posix", b"p42\nn127.0.0.1:3000\n"),
)
for name, reader, platform, plausible in cases:
    for output in (plausible, b""):
        def invoke(command, **options):
            script = f"import sys; sys.stdout.buffer.write({output!r}); sys.exit(7)"
            return real_run([sys.executable, "-B", "-c", script], **options)

        with patch.object(observation.os, "name", platform):
            with patch.object(observation.subprocess, "run", side_effect=invoke):
                try:
                    reader()
                except AssertionError:
                    print(name + (": plausible stdout" if output else ": empty stdout")
                          + " rejected real exit 7")
                else:
                    raise AssertionError(name + " accepted a failed real subprocess")
print("8/8 failed real subprocess observations rejected")
