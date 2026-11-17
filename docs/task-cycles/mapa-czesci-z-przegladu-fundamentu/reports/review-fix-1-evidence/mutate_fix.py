"""Apply one change to deploy.yml in the scratch worktree, run the host-key case and the whole
test file, restore, run the case again. Breaks must fail the case; honest forms must pass.
Results go to a UTF-8 JSON file; stdout keeps ASCII only."""

import json
import subprocess
import sys

WT = sys.argv[1]
OUT = sys.argv[2]
WORKFLOW = WT + "/.github/workflows/deploy.yml"

CASE = "tests.deploy.test_deploy_workflow.DeployWorkflow.test_ssh_is_strict_and_batch"
FILE = "tests.deploy.test_deploy_workflow"

STRICT = "-o StrictHostKeyChecking=yes"
SSH_HEAD = 'ssh -i "$key_file"'
DECOY = (
    '          echo ssh -o StrictHostKeyChecking=yes -o BatchMode=yes -o LogLevel=ERROR'
    ' "$SSH_USER@$SSH_HOST" "$DEPLOY_SHA"\n'
)

# (name, kind, list of (old, new) replacements applied in order)
CHANGES = [
    ("R0 no change", "honest", []),
    ("R1 space form 'no' before the yes", "break",
     [(STRICT, '-o "StrictHostKeyChecking no" ' + STRICT)]),
    ("R2 BatchMode=no before yes", "side-check",
     [("-o BatchMode=yes", "-o BatchMode=no -o BatchMode=yes")]),
    ("R3 options moved into an echo of the probe step", "break",
     [(" -o BatchMode=yes", ""), (STRICT + " ", ""),
      ("          failed=0\n",
       '          echo "StrictHostKeyChecking=yes BatchMode=yes"\n          failed=0\n')]),
    ("R7 bundled flag -4o with the space form before the yes", "break",
     [(SSH_HEAD, 'ssh -4o "StrictHostKeyChecking no" -i "$key_file"')]),
    ("R8 decoy echo of an ssh line before the call, real call set to 'no'", "break",
     [(STRICT, '-o "StrictHostKeyChecking no"'),
      ("          status=0\n", DECOY + "          status=0\n")]),
    ("H1 honest space form 'yes'", "honest",
     [(STRICT, '-o "StrictHostKeyChecking yes"')]),
    ("H2 honest -oK=V form", "honest",
     [(STRICT, "-oStrictHostKeyChecking=yes")]),
    ("H3 honest reorder: BatchMode before StrictHostKeyChecking", "honest",
     [(STRICT + " ", ""), ("-o BatchMode=yes", "-o BatchMode=yes " + STRICT)]),
    ("H4 honest: '-o' value in single quotes", "honest",
     [(STRICT, "-o 'StrictHostKeyChecking=yes'")]),
]


def run(test):
    result = subprocess.run(
        [sys.executable, "-B", "-m", "unittest", test],
        cwd=WT, capture_output=True, text=True, encoding="utf-8", errors="replace",
    )
    return result.returncode, result.stderr[-800:]


def main():
    with open(WORKFLOW, encoding="utf-8", newline="") as handle:
        original = handle.read()
    results = {}
    for name, kind, replacements in CHANGES:
        text = original
        for old, new in replacements:
            assert old in text, (name, old)
            text = text.replace(old, new, 1)
        with open(WORKFLOW, "w", encoding="utf-8", newline="") as handle:
            handle.write(text)
        case = run(CASE)
        whole = run(FILE)
        with open(WORKFLOW, "w", encoding="utf-8", newline="") as handle:
            handle.write(original)
        restored = run(CASE)
        results[name] = {"kind": kind, "case_exit": case[0], "case_tail": case[1],
                         "file_exit": whole[0], "file_tail": whole[1],
                         "restored_case_exit": restored[0]}
        print(name.split(" ")[0], kind, case[0], whole[0], restored[0])
    with open(OUT, "w", encoding="utf-8") as handle:
        json.dump(results, handle, indent=2, ensure_ascii=False)


main()
