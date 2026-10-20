"""Run real Windows observation commands with a native partial-read error."""

import importlib.util
import json
from pathlib import Path
import subprocess
import sys

ROOT = Path(__file__).resolve().parents[4] / ".runs/final-review-scratch"
sys.path.insert(0, str(ROOT / "tests/invariants"))
import loop2_invariant_support as support

spec = importlib.util.spec_from_file_location(
    "reviewed_processes", ROOT / "tests/invariants/test_loop2_one_serving_process.py"
)
observation = importlib.util.module_from_spec(spec)
spec.loader.exec_module(observation)
real_run = subprocess.run
records = []


def native_failed_read(command, **kwargs):
    original = list(command)
    changed = list(command)
    # The first query returns a real process; the second query raises a real CIM
    # non-terminating error. The original formatting pipeline still runs in PowerShell.
    changed[-1] = changed[-1].replace(
        "Get-CimInstance Win32_Process",
        "@(Get-CimInstance Win32_Process | Select-Object -First 1; "
        "Get-CimInstance ReviewerMissingClass)",
    )
    result = real_run(changed, **kwargs)
    records.append(
        {
            "original_command": original,
            "executed_command": changed,
            "exit": result.returncode,
            "stdout": result.stdout.decode("utf-8", "replace"),
            "stderr": result.stderr.decode("utf-8", "replace"),
        }
    )
    return result


subprocess.run = native_failed_read
accepted = []
for name, operation in (
    ("_processes", observation._processes),
    ("_windows_descendants", lambda: support._windows_descendants(2147483647, 0)),
):
    try:
        result = operation()
    except AssertionError as error:
        print(name, "REJECTED", str(error))
    else:
        print(name, "ACCEPTED", repr(result))
        accepted.append(name)
print(json.dumps(records, indent=2))
if accepted:
    print("FAIL: actual native query errors were accepted by " + ", ".join(accepted))
    raise SystemExit(1)
