"""Run the sha case (and the whole file) of tests/deploy/test_deploy_workflow.py against variants of deploy.yml.

Usage: python -B -I probe2.py <repo root> <output file>
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

DEPLOY_NAME = "      - name: Deploy the commit on the server\n"
PROBE_STEP = "      - name: Probe the public addresses\n        run: |\n"
SCRIPT_FIRST = "          set -euo pipefail\n"
EVENT = "${{ github.event.head_commit.message }}"


def deploy_step_run_first(text, extra_script_line):
    head, rest = text.split(DEPLOY_NAME, 1)
    step, tail = rest.split("\n      - name: Probe the public addresses\n", 1)
    env_part, script = step.split("        run: |\n", 1)
    script = extra_script_line + script
    new_step = ("      - run: |\n" + script + "\n"
                "        name: Deploy the commit on the server\n" + env_part.rstrip("\n") + "\n")
    return head + new_step + "\n      - name: Probe the public addresses\n" + tail


def before_probe(step_text):
    return base.replace(PROBE_STEP, step_text + PROBE_STEP)


def in_deploy_script(line):
    return base.replace(SCRIPT_FIRST, SCRIPT_FIRST + line, 1)


variants = {
    # honest forms: the case must pass
    "H0 file as it stands": base,
    "H1 deploy step with '- run: |' first, no expression": deploy_step_run_first(base, ""),
    "H2 step with if: and env: holding expressions at the key's column, after '- run: |'": before_probe(
        "      - run: |\n          echo hello\n        if: ${{ success() }}\n        env:\n"
        "          HOST: ${{ secrets.DEPLOY_HOST }}\n"),
    "H3 step 'uses:' with 'with:' expression": before_probe(
        "      - uses: actions/cache@v4\n        with:\n          key: ${{ runner.os }}\n"),
    "H4 job-level defaults.run with working-directory expression": base.replace(
        "    timeout-minutes: 40\n",
        "    timeout-minutes: 40\n    defaults:\n      run:\n        shell: bash\n"
        "        working-directory: ${{ github.workspace }}\n"),
    # crafted forms: the case must fail
    "C1 deploy step '- run: |' first with an event expression": deploy_step_run_first(
        base, "          echo " + EVENT + "\n"),
    "C2 new step '- run: |' with a secret": before_probe(
        "      - run: |\n          echo ${{ secrets.DEPLOY_HOST }}\n"),
    "C3 one-line '- run:' with a secret": before_probe(
        "      - run: echo ${{ secrets.DEPLOY_HOST }}\n"),
    "C4 one-line 'run:' after name with a secret": before_probe(
        "      - name: Echo\n        run: echo ${{ secrets.DEPLOY_HOST }}\n"),
    "C5 empty 'run:' then plain script on the next line": before_probe(
        "      - name: Echo\n        run:\n          echo " + EVENT + "\n"),
    "C6 '- run: >-' block": before_probe(
        "      - run: >-\n          echo " + EVENT + "\n"),
    "C7 expression in the deploy script after ' #' inside a string": in_deploy_script(
        '          echo "Deploying #' + EVENT + '"\n'),
    "C8 expression in a shell comment of the deploy script": in_deploy_script(
        "          # was " + EVENT + "\n"),
    "C9 heredoc line starting 'run:' then an expression": in_deploy_script(
        "          cat <<'NOTE'\n          run: note\n          NOTE\n          echo " + EVENT + "\n"),
    "C10 flow-mapping step with run": before_probe(
        "      - { name: Echo, run: 'echo " + EVENT + "' }\n"),
    "C11 quoted key 'run'": before_probe(
        "      - name: Echo\n        \"run\": echo " + EVENT + "\n"),
}

lines = []
for name, text in variants.items():
    if text == base and not name.startswith("H0"):
        lines.append(f"{name}: VARIANT NOT APPLIED")
        continue
    path = os.path.join(here, "variant.yml")
    with open(path, "w", encoding="utf-8", newline="") as f:
        f.write(text)
    module.WORKFLOW = path
    case = unittest.TestResult()
    module.DeployWorkflow("test_sha_reaches_the_script_only_through_env").run(case)
    whole = unittest.TestResult()
    unittest.defaultTestLoader.loadTestsFromTestCase(module.DeployWorkflow).run(whole)
    case_ok = not case.failures and not case.errors
    lines.append(f"{name}: sha case={'pass' if case_ok else 'FAIL'}; whole file run={whole.testsRun} "
                 f"failures={len(whole.failures)} errors={len(whole.errors)}")
    safe = name.split(" ")[0]
    os.replace(path, os.path.join(here, f"variant-{safe}.yml"))

with open(out_path, "w", encoding="utf-8") as f:
    f.write("\n".join(lines) + "\n")
print(len(lines))
