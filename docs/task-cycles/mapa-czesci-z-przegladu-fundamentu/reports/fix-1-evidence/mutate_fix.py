"""One crafted change at a time to deploy.yml in the scratch worktree: run the marked case
`test_ssh_is_strict_and_batch` and the whole test file with it, restore, run the case again.
Arguments: the scratch worktree, the output JSON. ASCII on stdout."""

import json
import subprocess
import sys

WT = sys.argv[1]
OUT = sys.argv[2]
WORKFLOW = WT + "/.github/workflows/deploy.yml"
CASE = "tests.deploy.test_deploy_workflow.DeployWorkflow.test_ssh_is_strict_and_batch"
WHOLE = "tests.deploy.test_deploy_workflow"

STRICT = "-o StrictHostKeyChecking=yes"
KNOWN = '-o UserKnownHostsFile="$known_hosts_file"'
BATCH = "-o BatchMode=yes"

# (name, old, new); R3 is built apart because it changes two places.
MUTATIONS = [
    ("R0 no change", STRICT, STRICT),
    ("R1 -o \"StrictHostKeyChecking no\" before the =yes", STRICT, '-o "StrictHostKeyChecking no" ' + STRICT),
    ("R1b -oStrictHostKeyChecking=no before the =yes", STRICT, "-oStrictHostKeyChecking=no " + STRICT),
    ("R1c -o StrictHostKeyChecking=no before the =yes", STRICT, "-o StrictHostKeyChecking=no " + STRICT),
    ("R1d strictHostKeyChecking=Accept-New (other case of the name) before the =yes", STRICT,
     "-o strictHostKeyChecking=accept-new " + STRICT),
    ("R2 BatchMode=no before BatchMode=yes", BATCH, "-o BatchMode=no " + BATCH),
    ("R3 both options off the ssh call, written into an echo of the probe step", None, None),
    ("R6 StrictHostKeyChecking removed from the ssh call", STRICT + " ", ""),
]


def run(target):
    done = subprocess.run(
        [sys.executable, "-B", "-m", "unittest", target],
        cwd=WT, capture_output=True, text=True, encoding="utf-8", errors="replace",
    )
    return done.returncode, done.stderr[-900:]


def main():
    with open(WORKFLOW, encoding="utf-8", newline="") as handle:
        original = handle.read()
    results = {}
    for name, old, new in MUTATIONS:
        if name.startswith("R3"):
            mutated = original.replace(" " + STRICT, "").replace(" " + BATCH, "")
            mutated = mutated.replace(
                "          failed=0\n",
                '          echo "StrictHostKeyChecking=yes BatchMode=yes"\n          failed=0\n',
            )
            assert mutated != original
        else:
            assert original.count(old) == 1, name
            mutated = original.replace(old, new)
        try:
            with open(WORKFLOW, "w", encoding="utf-8", newline="") as handle:
                handle.write(mutated)
            case, whole = run(CASE), run(WHOLE)
        finally:
            with open(WORKFLOW, "w", encoding="utf-8", newline="") as handle:
                handle.write(original)
        restored = run(CASE)
        results[name] = {"case_exit": case[0], "case_tail": case[1], "whole_exit": whole[0],
                         "restored_case_exit": restored[0]}
        print(name.split(" ")[0], case[0], whole[0], restored[0])
    with open(OUT, "w", encoding="utf-8") as handle:
        json.dump(results, handle, indent=1, ensure_ascii=False)


main()
