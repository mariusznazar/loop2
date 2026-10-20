"""Exercise the actual process-count assertion against two real HTTP listeners."""

import importlib.util
import json
from pathlib import Path
import subprocess
import sys
import time
from types import SimpleNamespace

ROOT = Path(__file__).resolve().parents[4]
sys.path.insert(0, str(ROOT / "tests/invariants"))
import loop2_invariant_support as support

spec = importlib.util.spec_from_file_location(
    "reviewed_processes", ROOT / "tests/invariants/test_loop2_one_serving_process.py"
)
observation = importlib.util.module_from_spec(spec)
spec.loader.exec_module(observation)
child_code = (
    'const s=require("http").createServer((q,r)=>r.end("child"));'
    's.listen(0,"127.0.0.1",()=>console.log(JSON.stringify({port:s.address().port})));'
)
parent_code = (
    'const s=require("http").createServer((q,r)=>r.end("parent"));'
    's.listen(0,"127.0.0.1",()=>{'
    'const c=require("child_process").spawn(process.execPath,["-e",'
    + json.dumps(child_code)
    + '],{stdio:["ignore","pipe","inherit"]});'
    'c.stdout.once("data",d=>console.log(JSON.stringify({parent:process.pid,'
    'parentPort:s.address().port,child:c.pid,childPort:JSON.parse(d).port})));});'
)
started = time.time()
parent = subprocess.Popen(
    ["node", "-e", parent_code], cwd=ROOT, stdout=subprocess.PIPE, stderr=subprocess.PIPE
)
real_run = subprocess.run
try:
    details = json.loads(parent.stdout.readline())
    print("ACTUAL_LISTENERS", json.dumps(details), flush=True)
    support.PORT = details["parentPort"]
    case = observation.OneExpressProcessServesGameAndApi()
    case.server = SimpleNamespace(
        process=SimpleNamespace(pid=parent.pid, loop2_started=started)
    )

    def exercise(label):
        try:
            case.table = observation._processes()
            case.tree = observation.descendants(case.table, parent.pid, started)
            case.tree_and_root = [parent.pid] + case.tree
            case.listeners = observation.tcp_listeners()
            case.test_one_process_of_the_started_tree_listens_and_starts_nothing()
        except AssertionError as error:
            print(label, "REJECTED", str(error), flush=True)
            return False
        print(label, "ACCEPTED", flush=True)
        return True

    healthy_passed = exercise("HEALTHY_NATIVE_OBSERVATION")

    def partial_native_read(command, **kwargs):
        changed = list(command)
        if "Get-CimInstance Win32_Process" in changed[-1]:
            changed[-1] = changed[-1].replace(
                "Get-CimInstance Win32_Process",
                "@(Get-CimInstance Win32_Process | Where-Object { $_.ProcessId -ne "
                + str(details["child"])
                + " }; Get-CimInstance ReviewerMissingClass)",
            )
            result = real_run(changed, **kwargs)
            print("NATIVE_PARTIAL_COMMAND", json.dumps(changed), flush=True)
            print("NATIVE_PARTIAL_EXIT", result.returncode, flush=True)
            print("NATIVE_PARTIAL_STDOUT", result.stdout.decode("utf-8", "replace"), flush=True)
            print("NATIVE_PARTIAL_STDERR", result.stderr.decode("utf-8", "replace"), flush=True)
            return result
        return real_run(changed, **kwargs)

    subprocess.run = partial_native_read
    broken_passed = exercise("FAILED_PARTIAL_NATIVE_OBSERVATION")
    if healthy_passed:
        raise AssertionError("positive control invalid: normal read missed the second listener")
    if broken_passed:
        print("FAIL: two actual serving processes passed the real assertion after a query error")
        raise SystemExit(1)
finally:
    subprocess.run = real_run
    real_run(
        ["taskkill", "/PID", str(parent.pid), "/T", "/F"],
        stdout=subprocess.PIPE,
        stderr=subprocess.PIPE,
        timeout=30,
    )
    parent.wait(timeout=30)
    parent.stdout.close()
    parent.stderr.close()
