"""Independently inject real failed child commands into every changed reader."""

import importlib.util
import json
from pathlib import Path
import subprocess
import sys
from types import SimpleNamespace

ROOT = Path(__file__).resolve().parents[4] / ".runs/final-review-scratch"
sys.path.insert(0, str(ROOT / "tests/invariants"))
import loop2_invariant_support as support

spec = importlib.util.spec_from_file_location(
    "reviewed_processes", ROOT / "tests/invariants/test_loop2_one_serving_process.py"
)
observation = importlib.util.module_from_spec(spec)
spec.loader.exec_module(observation)
records = []


def failed(command, **kwargs):
    text = "31 17 1790000000000 node"
    if command[0] == "ps":
        text = "31 17 node"
    elif command[0] == "lsof":
        text = "p31\nn127.0.0.1:3000"
    elif len(command) > 1 and "{3}" not in command[-1]:
        text = "31 17 1790000000000"
    executed = [
        sys.executable, "-B", "-c",
        "import sys; print(" + repr(text)
        + "); print('reviewer injected read error',file=sys.stderr); sys.exit(7)",
    ]
    result = subprocess.run(executed, **kwargs)
    records.append(dict(
        requested=command, executed=executed, exit=result.returncode,
        stdout=result.stdout.decode(), stderr=result.stderr.decode(),
    ))
    return result


observation.subprocess = SimpleNamespace(run=failed)
support.subprocess = SimpleNamespace(run=failed)
passed = 0
for label, platform, operation in (
    ("Windows process list", "nt", observation._processes),
    ("Windows descendants", "nt", lambda: support._windows_descendants(17, 0)),
    ("Unix process list branch", "posix", observation._processes),
    ("Unix listener list branch", "posix", observation.tcp_listeners),
):
    observation.os = SimpleNamespace(name=platform)
    try:
        operation()
    except AssertionError as error:
        print(label, "REJECTED", str(error))
        passed += 1
    else:
        print(label, "ACCEPTED_FAILED_READ")
print(json.dumps(records, indent=2))
print("Windows execution of real failed-child injection; not native Unix evidence.")
raise SystemExit(0 if passed == 4 else 1)
