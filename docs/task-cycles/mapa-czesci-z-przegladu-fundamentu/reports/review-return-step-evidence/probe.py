"""Run two cases of tests/deploy/test_deploy_workflow.py against variants of deploy.yml.

Usage: python -B probe.py <repo root> <output file>
Writes, per variant, whether each case passed or failed.
"""

import importlib.util
import os
import sys
import unittest

root, out_path = sys.argv[1], sys.argv[2]
here = os.path.dirname(os.path.abspath(__file__))

spec = importlib.util.spec_from_file_location(
    "deploy_case", os.path.join(root, "tests", "deploy", "test_deploy_workflow.py"))
module = importlib.util.module_from_spec(spec)
spec.loader.exec_module(module)

with open(os.path.join(root, ".github", "workflows", "deploy.yml"), encoding="utf-8", newline="") as f:
    base = f.read()

REAL_OPTS = "-o StrictHostKeyChecking=yes -o UserKnownHostsFile="
CALL = '          ssh -i "$key_file" -p "$SSH_PORT" \\\n'

variants = {
    "baseline": base,
    # an option bundled behind another short flag, placed before the real one
    "bundled -4o first, value no": base.replace(REAL_OPTS, '-4o "StrictHostKeyChecking no" ' + REAL_OPTS),
    # a line that holds the word ssh but is no call, before the call
    "non-call ssh line first (command -v)": base.replace(CALL, "          command -v ssh >/dev/null\n" + CALL),
    # a non-call line holding ssh with good options, the call itself setting no first
    "non-call echo with yes, call with no first": base.replace(
        CALL, "          : ssh -o StrictHostKeyChecking=yes -o BatchMode=yes\n" + CALL).replace(
        REAL_OPTS, '-o "StrictHostKeyChecking no" ' + REAL_OPTS),
    # control: the call alone setting `no` first in the space form
    "call with space-form no first (control)": base.replace(
        REAL_OPTS, '-o "StrictHostKeyChecking no" ' + REAL_OPTS),
    # a step whose script is written as `- run: |` (run as the step's first key)
    "secret expression in a '- run: |' step": base.replace(
        "      - name: Probe the public addresses\n        run: |\n",
        "      - run: |\n          echo ${{ secrets.DEPLOY_HOST }}\n"
        "      - name: Probe the public addresses\n        run: |\n"),
    # the deployment step itself with `run: |` as its first key and the commit message inside
    "deploy step as '- run: |' with an event expression": None,
    # the step script written as a folded block `run: >`
    "secret expression in a 'run: >' block": base.replace(
        "      - name: Probe the public addresses\n        run: |\n",
        "      - name: Probe the public addresses\n        run: >\n          echo ${{ secrets.DEPLOY_HOST }}\n"),
    # a secret expression in an inline run
    "secret expression in an inline run": base.replace(
        "      - name: Probe the public addresses\n        run: |\n",
        "      - name: Echo\n        run: echo ${{ secrets.DEPLOY_HOST }}\n      - name: Probe the public addresses\n        run: |\n"),
}

def deploy_step_run_first(text):
    """The deployment step rewritten with `run: |` as its first key, an event expression added."""
    head, rest = text.split("      - name: Deploy the commit on the server\n", 1)
    step, tail = rest.split("\n      - name: Probe the public addresses\n", 1)
    env_part, script = step.split("        run: |\n", 1)
    script = "          echo ${{ github.event.head_commit.message }}\n" + script
    new_step = ("      - run: |\n" + script + "\n"
                "        name: Deploy the commit on the server\n" + env_part.rstrip("\n") + "\n")
    return head + new_step + "\n      - name: Probe the public addresses\n" + tail


variants["deploy step as '- run: |' with an event expression"] = deploy_step_run_first(base)
with open(os.path.join(here, "variant-deploy-step.yml"), "w", encoding="utf-8", newline="") as f:
    f.write(variants["deploy step as '- run: |' with an event expression"])

cases = ["test_ssh_is_strict_and_batch", "test_sha_reaches_the_script_only_through_env", "test_one_ssh_call"]
lines = []
for name, text in variants.items():
    if text == base and name != "baseline":
        lines.append(f"{name}: VARIANT NOT APPLIED")
        continue
    path = os.path.join(here, "variant.yml")
    with open(path, "w", encoding="utf-8", newline="") as f:
        f.write(text)
    module.WORKFLOW = path
    results = []
    for case in cases:
        result = unittest.TestResult()
        module.DeployWorkflow(case).run(result)
        ok = not result.failures and not result.errors
        results.append(f"{case}={'pass' if ok else 'FAIL'}")
    lines.append(f"{name}: " + ", ".join(results))
    os.remove(path)

with open(out_path, "w", encoding="utf-8") as f:
    f.write("\n".join(lines) + "\n")
print(len(lines))
