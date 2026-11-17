"""Apply one crafted change to deploy.yml in the scratch worktree, run the two marked tests,
restore, and run them again. Results go to a UTF-8 JSON file; stdout keeps ASCII only."""

import json
import subprocess
import sys

WT = sys.argv[1]
OUT = sys.argv[2]
WORKFLOW = WT + "/.github/workflows/deploy.yml"

MARKED = [
    "tests.deploy.test_deploy_workflow.DeployWorkflow.test_ssh_is_strict_and_batch",
    "tests.deploy.test_deploy_workflow.DeployWorkflow.test_sha_reaches_the_script_only_through_env",
]
ALL = ["tests.deploy.test_deploy_workflow"]

OLD_SSH = '-o StrictHostKeyChecking=yes -o UserKnownHostsFile="$known_hosts_file"'

MUTATIONS = {
    # an earlier value of the option wins in OpenSSH (openssh-option-order)
    "R1 space form 'StrictHostKeyChecking no' before the =yes": (
        OLD_SSH,
        '-o "StrictHostKeyChecking no" ' + OLD_SSH,
    ),
    "R2 BatchMode=no before BatchMode=yes": (
        "-o BatchMode=yes",
        "-o BatchMode=no -o BatchMode=yes",
    ),
    "R3 strict and batch moved off the ssh call into an echo of the probe step": (
        OLD_SSH,
        '-o UserKnownHostsFile="$known_hosts_file"',
    ),
    "R4 secret at workflow-level env instead of the step env": (
        "  OLD_GAME_URL: https://kantarion.bieda.it/\n",
        "  OLD_GAME_URL: https://kantarion.bieda.it/\n  SSH_PORT_TOP: ${{ secrets.DEPLOY_PORT }}\n",
    ),
    "R5 untrusted event text in the step env, used by the script": (
        "          DEPLOY_SHA: ${{ github.sha }}\n",
        "          DEPLOY_SHA: ${{ github.sha }}\n          MESSAGE: ${{ github.event.head_commit.message }}\n",
    ),
}


def run(tests):
    result = subprocess.run(
        [sys.executable, "-B", "-m", "unittest", *tests],
        cwd=WT,
        capture_output=True,
        text=True,
        encoding="utf-8",
        errors="replace",
    )
    return result.returncode, result.stderr[-1500:]


def main():
    with open(WORKFLOW, encoding="utf-8", newline="") as handle:
        original = handle.read()
    results = {}
    for name, (old, new) in MUTATIONS.items():
        text = original
        if name.startswith("R3"):
            # remove the options from the ssh call and put them in an echo of the probe step
            text = text.replace(" -o BatchMode=yes", "")
            text = text.replace(
                "          failed=0\n",
                '          echo "StrictHostKeyChecking=yes BatchMode=yes"\n          failed=0\n',
            )
        assert old in text, name
        mutated = text.replace(old, new, 1)
        with open(WORKFLOW, "w", encoding="utf-8", newline="") as handle:
            handle.write(mutated)
        marked = run(MARKED)
        whole = run(ALL)
        with open(WORKFLOW, "w", encoding="utf-8", newline="") as handle:
            handle.write(original)
        restored = run(MARKED)
        results[name] = {
            "marked_exit": marked[0],
            "marked_tail": marked[1],
            "whole_file_exit": whole[0],
            "whole_file_tail": whole[1],
            "restored_exit": restored[0],
        }
        print(name.split(" ")[0], marked[0], whole[0], restored[0])
    with open(OUT, "w", encoding="utf-8") as handle:
        json.dump(results, handle, indent=2, ensure_ascii=False)


main()
