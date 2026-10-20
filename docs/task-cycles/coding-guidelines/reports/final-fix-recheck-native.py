"""Independent native acceptance of the final observation methods; owned servers only."""
import base64
import importlib.util
import json
from pathlib import Path
import subprocess
import sys
import time
from types import SimpleNamespace
from unittest.mock import patch
from urllib.request import urlopen

ROOT = Path(__file__).resolve().parents[4]
SCRATCH = ROOT / ".runs/final-fix-recheck"
SCRATCH.mkdir(exist_ok=True)
sys.path.insert(0, str(ROOT / "tests/invariants"))
import loop2_invariant_support as support

spec = importlib.util.spec_from_file_location(
    "rechecked_observation", ROOT / "tests/invariants/test_loop2_one_serving_process.py")
observation = importlib.util.module_from_spec(spec)
spec.loader.exec_module(observation)
real_run = subprocess.run
records = []
stage = "initial"
omit = None


def native_run(command, **options):
    actual = list(command)
    if omit is not None and "Get-CimInstance Win32_Process" in actual[-1]:
        actual[-1] = actual[-1].replace(
            "Get-CimInstance Win32_Process",
            "@(Get-CimInstance Win32_Process | Where-Object { $_.ProcessId -ne "
            + str(omit) + " }; Get-CimInstance RecheckMissingCimClass)")
    result = real_run(actual, **options)
    records.append({"stage": stage, "requested_argv": list(command), "argv": actual,
                    "exit": result.returncode,
                    "stdout": result.stdout.decode("utf-8", "replace"),
                    "stderr": result.stderr.decode("utf-8", "replace"),
                    "stdout_base64": base64.b64encode(result.stdout).decode("ascii"),
                    "stderr_base64": base64.b64encode(result.stderr).decode("ascii")})
    return result


child_code = ('const s=require("http").createServer((q,r)=>r.end("child"));'
              's.listen(0,"127.0.0.1",()=>console.log(JSON.stringify({port:s.address().port})));')
parent_code = ('const s=require("http").createServer((q,r)=>r.end("parent"));let c;'
               's.listen(0,"127.0.0.1",()=>console.log(JSON.stringify({port:s.address().port})));'
               'require("readline").createInterface({input:process.stdin}).on("line",line=>{'
               'if(line==="spawn"){c=require("child_process").spawn(process.execPath,["-e",'
               + json.dumps(child_code) + '],{stdio:["ignore","pipe","inherit"]});'
               'c.stdout.once("data",d=>console.log(JSON.stringify({child:c.pid,port:JSON.parse(d).port})));}'
               'if(line==="restore"){c.once("exit",()=>console.log(JSON.stringify({restored:true})));c.kill();}});')
parent_argv = ["node", "-e", parent_code]
started = time.time()
parent = subprocess.Popen(parent_argv, cwd=SCRATCH, stdin=subprocess.PIPE,
                          stdout=subprocess.PIPE, stderr=subprocess.PIPE)
parent_stdout = []
try:
    with patch.object(subprocess, "run", side_effect=native_run):
        ready_line = parent.stdout.readline()
        parent_stdout.append(ready_line)
        ready = json.loads(ready_line)
        support.PORT = ready["port"]
        case = observation.OneExpressProcessServesGameAndApi()
        case.server = SimpleNamespace(process=SimpleNamespace(pid=parent.pid, loop2_started=started))

        def process_assertion(label, should_pass):
            global stage
            stage = label
            case.table = observation._processes()
            case.tree = observation.descendants(case.table, parent.pid, started)
            case.tree_and_root = [parent.pid] + case.tree
            case.listeners = observation.tcp_listeners()
            try:
                case.test_one_process_of_the_started_tree_listens_and_starts_nothing()
            except AssertionError as error:
                print(label, "REJECTED", str(error))
                assert not should_pass, label
            else:
                print(label, "ACCEPTED")
                assert should_pass, label

        process_assertion("BASELINE_ONE_SERVER", True)
        parent.stdin.write(b"spawn\n")
        parent.stdin.flush()
        child_line = parent.stdout.readline()
        parent_stdout.append(child_line)
        child = json.loads(child_line)
        print("OWNED_SERVERS", json.dumps({"parent": parent.pid, "parent_port": ready["port"],
                                          "child": child["child"], "child_port": child["port"]}))
        for port, expected in ((ready["port"], b"parent"), (child["port"], b"child")):
            with urlopen(f"http://127.0.0.1:{port}/", timeout=10) as response:
                body = response.read()
                print("ACTUAL_HTTP", port, response.status, repr(body))
                assert response.status == 200 and body == expected
        process_assertion("REAL_SECOND_SERVER", False)
        stage = "HEALTHY_DESCENDANTS"
        assert child["child"] in support._windows_descendants(parent.pid, started)
        print("HEALTHY_DESCENDANTS", "contains actual owned child")
        omit = child["child"]
        for label, reader in (("PARTIAL_PROCESS_READ", observation._processes),
                              ("PARTIAL_CLEANUP_READ", lambda: support._windows_descendants(parent.pid, started))):
            stage = label
            try:
                reader()
            except AssertionError as error:
                print(label, "REJECTED", str(error))
                assert "Get-CimInstance failed" in str(error)
            else:
                raise AssertionError(label + " accepted failed observation")
            result = records[-1]
            assert result["exit"] == 0 and result["stdout"].strip()
            assert "Get-CimInstance" in result["stderr"]
            assert not any(line.split()[0] == str(child["child"])
                           for line in result["stdout"].splitlines() if line.split())
        omit = None
        parent.stdin.write(b"restore\n")
        parent.stdin.flush()
        restored_line = parent.stdout.readline()
        parent_stdout.append(restored_line)
        assert json.loads(restored_line)["restored"]
        process_assertion("RESTORED_ONE_SERVER", True)
        stage = "RESTORED_DESCENDANTS"
        assert child["child"] not in support._windows_descendants(parent.pid, started)
        print("RESTORED_DESCENDANTS", "no child")
        print("PASS: native failed partial reads rejected, real second server detected, baseline/restored accepted")
finally:
    omit = None
    stage = "OWNED_CLEANUP"
    try:
        native_run(["taskkill", "/PID", str(parent.pid), "/T", "/F"],
                   stdout=subprocess.PIPE, stderr=subprocess.PIPE, timeout=30)
        parent.wait(timeout=30)
    finally:
        parent.stdin.close()
        parent_stdout.append(parent.stdout.read())
        parent_error = parent.stderr.read()
        parent.stdout.close()
        parent.stderr.close()
        records.append({"stage": "OWNED_NODE_PARENT", "argv": parent_argv,
                        "exit": parent.returncode,
                        "stdout": b"".join(parent_stdout).decode("utf-8", "replace"),
                        "stderr": parent_error.decode("utf-8", "replace")})
        target = ROOT / ".runs/task-cycles/coding-guidelines/reports/final-fix-recheck-native-calls.json"
        target.write_text(json.dumps(records, indent=2, ensure_ascii=True) + "\n", encoding="utf-8")
