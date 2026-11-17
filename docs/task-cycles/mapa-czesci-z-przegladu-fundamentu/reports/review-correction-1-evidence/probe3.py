"""Check correction 1 of tests/deploy/test_deploy_workflow.py against variants of deploy.yml.

Usage: python -B -I probe3.py <repo root> <output file>
"""

import importlib.util
import os
import re
import sys
import unittest

root, out_path = sys.argv[1], sys.argv[2]
here = os.path.dirname(os.path.abspath(__file__))

spec = importlib.util.spec_from_file_location(
    "deploy_case", os.path.join(root, "tests", "deploy", "test_deploy_workflow.py"))
module = importlib.util.module_from_spec(spec)
spec.loader.exec_module(module)
real_script_expressions = module.script_expressions

with open(os.path.join(root, ".github", "workflows", "deploy.yml"), encoding="utf-8", newline="") as f:
    base = f.read()

DEPLOY_NAME = "      - name: Deploy the commit on the server\n"
PROBE_STEP = "      - name: Probe the public addresses\n        run: |\n"
SCRIPT_FIRST = "          set -euo pipefail\n"
EVENT = "${{ github.event.head_commit.message }}"
CALL = '          ssh -i "$key_file" -p "$SSH_PORT" \\\n'
REAL_OPTS = "-o StrictHostKeyChecking=yes -o UserKnownHostsFile="


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
    # honest forms: the sha case must pass
    "H0 file as it stands": base,
    "H1 YAML comment with an expression outside any script": base.replace(
        "permissions: {}\n", "permissions: {}\n# see " + EVENT + "\n"),
    "H2 uses step whose with holds an expression": before_probe(
        "      - uses: actions/cache@v4\n        with:\n          key: ${{ runner.os }}\n"),
    "H3 if with an expression after '- run: |' at the key's column": before_probe(
        "      - run: |\n          echo hello\n        if: ${{ success() }}\n"),
    "H4 deploy step as '- run: |' first, honest": deploy_step_run_first(base, ""),
    # comment forms: the sha case must fail
    "K1 run: | block, expression after # at the end of a command": in_deploy_script(
        "          umask 022 # " + EVENT + "\n"),
    "K2 run: | block, comment-only line": in_deploy_script("          # was " + EVENT + "\n"),
    "K3 run: | block, '#' inside a string": in_deploy_script('          echo "Deploying #' + EVENT + '"\n'),
    "K4 - run: | first key, comment-only line": deploy_step_run_first(base, "          # " + EVENT + "\n"),
    "K5 run: > block, comment-only line": before_probe(
        "      - name: Echo\n        run: >\n          echo hi\n          # " + EVENT + "\n"),
    "K6 one-line run with expression after #": before_probe(
        "      - name: Echo\n        run: echo hi # " + EVENT + "\n"),
    "K7 continued plain run, next line after #": before_probe(
        "      - name: Echo\n        run: echo hi\n          more # " + EVENT + "\n"),
    "K8 - run: one line after #": before_probe("      - run: echo hi # " + EVENT + "\n"),
    # forms the row lists as unread: the sha or ssh case passes
    "R1 decoy ': ssh -o ...=yes -o BatchMode=yes' before a call setting no first": base.replace(
        CALL, "          : ssh -o StrictHostKeyChecking=yes -o BatchMode=yes\n" + CALL).replace(
        REAL_OPTS, '-o "StrictHostKeyChecking no" ' + REAL_OPTS),
    "R2 bare decoy 'command -v ssh' before the call": base.replace(
        CALL, "          command -v ssh >/dev/null\n" + CALL),
    "R3 bundled -4o no": base.replace(REAL_OPTS, '-4o "StrictHostKeyChecking no" ' + REAL_OPTS),
    "R4 script line starting run: then expression": in_deploy_script(
        "          cat <<'NOTE'\n          run: note\n          NOTE\n          echo " + EVENT + "\n"),
    "R5 inline mapping step": before_probe("      - { name: Echo, run: 'echo " + EVENT + "' }\n"),
    "R6 quoted key": before_probe('      - name: Echo\n        "run": echo ' + EVENT + "\n"),
    # forms the row does not name: does the sha case read them?
    "U1 key with a space before the colon 'run :'": before_probe(
        "      - name: Echo\n        run : echo " + EVENT + "\n"),
    "U2 double-quoted value with \\u0024 escape": before_probe(
        '      - name: Echo\n        run: "echo ' + chr(92) + 'u0024{{ github.event.head_commit.message }}"\n'),
}


def stripping_script_expressions(text):
    """The logic as it was before the correction: comments cut before reading."""
    stripped = "\n".join(re.sub(r"(^|\s)#.*$", "", line) for line in text.splitlines())
    return real_script_expressions(stripped)


def run_case(name):
    result = unittest.TestResult()
    module.DeployWorkflow(name).run(result)
    return "pass" if not result.failures and not result.errors else "FAIL"


lines = []
for name, text in variants.items():
    if text == base and not name.startswith("H0"):
        lines.append(f"{name}: VARIANT NOT APPLIED")
        continue
    path = os.path.join(here, f"variant-{name.split(' ')[0]}.yml")
    with open(path, "w", encoding="utf-8", newline="") as f:
        f.write(text)
    module.WORKFLOW = path
    module.script_expressions = real_script_expressions
    sha_new = run_case("test_sha_reaches_the_script_only_through_env")
    ssh_new = run_case("test_ssh_is_strict_and_batch")
    whole = unittest.TestResult()
    unittest.defaultTestLoader.loadTestsFromTestCase(module.DeployWorkflow).run(whole)
    module.script_expressions = stripping_script_expressions
    sha_old = run_case("test_sha_reaches_the_script_only_through_env")
    module.script_expressions = real_script_expressions
    lines.append(f"{name}: sha new={sha_new} sha old-logic={sha_old} ssh={ssh_new}; whole run={whole.testsRun} "
                 f"failures={len(whole.failures)} errors={len(whole.errors)} "
                 f"[{', '.join(t.id().split('.')[-1] for t, _ in whole.failures + whole.errors)}]")

# the mutation case on the real file, with the real logic and with the logic as it was
module.WORKFLOW = os.path.join(root, ".github", "workflows", "deploy.yml")
module.script_expressions = real_script_expressions
mut_new = run_case("test_an_expression_after_a_comment_mark_in_a_script_is_refused")
module.script_expressions = stripping_script_expressions
mut_old = run_case("test_an_expression_after_a_comment_mark_in_a_script_is_refused")
module.script_expressions = real_script_expressions
lines.append(f"mutation case on deploy.yml: new logic={mut_new} old logic={mut_old}")
# the mutation case when the real file holds a violation: its control fails too
module.WORKFLOW = os.path.join(here, "variant-K2.yml")
lines.append(f"mutation case on K2: {run_case('test_an_expression_after_a_comment_mark_in_a_script_is_refused')}")

with open(out_path, "w", encoding="utf-8") as f:
    f.write("\n".join(lines) + "\n")
print(len(lines))
