"""Retain exact native healthy reader argv and full output for final acceptance."""
import json
import os
from pathlib import Path
import subprocess
import sys
import time
from unittest.mock import patch
ROOT = Path(__file__).resolve().parents[4]
sys.path.insert(0, str(ROOT / "tests/invariants"))
import test_loop2_one_serving_process as observation
import loop2_invariant_support as support
real_run = subprocess.run
started = time.time()
child = subprocess.Popen([sys.executable, "-c", "import time; time.sleep(60)"],
                         stdin=subprocess.DEVNULL, stdout=subprocess.DEVNULL,
                         stderr=subprocess.DEVNULL)
def traced(command, **options):
    result = real_run(command, **options)
    print(json.dumps({"argv": command, "exit": result.returncode,
                      "stdout": result.stdout.decode("utf-8", "replace"),
                      "stderr": result.stderr.decode("utf-8", "replace")}, ensure_ascii=True))
    return result
try:
    with patch.object(subprocess, "run", traced):
        table = observation._processes()
        descendants = support._windows_descendants(os.getpid(), started)
    assert table[child.pid][0] == os.getpid()
    assert child.pid in descendants
    print(json.dumps({"owned_child": child.pid, "actual_parent": table[child.pid][0],
                      "descendants_contains_child": True}))
finally:
    child.kill()
    child.wait(timeout=10)
