"""The scheduled check of the public address, `.github/workflows/check-address.yml` (D-356).

Text checks read the workflow as text, like `test_deploy_workflow.py`; the run script of its one
step is also run by Git's bash, with stand-ins for `curl` and `sleep`, to see what the step does on
each answer. No real run is possible before the merge, and no test reaches the network.
"""

import os
import re
import shutil
import subprocess
import tempfile
import unittest

import deploy_script_support as support

ROOT = os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
WORKFLOW = os.path.join(ROOT, ".github", "workflows", "check-address.yml")
DEPLOY_WORKFLOW = os.path.join(ROOT, ".github", "workflows", "deploy.yml")
STEP_NAME = "Open the public address"
ATTEMPTS = 6
SECONDS_BETWEEN_ATTEMPTS = 20
ATTEMPT_TIMEOUT_SECONDS = 15
JOB_TIMEOUT_MINUTES = 5


def read(path):
    with open(path, encoding="utf-8", newline="") as handle:
        return handle.read()


def code_lines():
    return [re.sub(r"(^|\s)#.*$", "", line) for line in read(WORKFLOW).splitlines()]


def code():
    return re.sub(r"\\\n\s*", " ", "\n".join(code_lines()))


def declared_public_address(text):
    """The value of the one LOOP2_PUBLIC_URL declaration of a workflow file."""
    found = re.findall(r"(?m)^\s*(LOOP2_PUBLIC_URL):\s*(\S+)\s*$", text)
    assert len(found) == 1, f"expected one LOOP2_PUBLIC_URL declaration, found {found}"
    return found[0][1]


def minutes_of(field):
    """The minutes of a cron minute field of the form `low-high/step`."""
    assert re.fullmatch(r"\d+-\d+/\d+", field), f"unexpected minute field {field!r}"
    span, step = field.split("/")
    low, high = (int(v) for v in span.split("-"))
    return set(range(low, high + 1, int(step)))


def run_script():
    """The run script of the step, dedented, as the text of the file."""
    lines = read(WORKFLOW).splitlines()
    names = [i for i, line in enumerate(lines) if line.strip() == f"- name: {STEP_NAME}"]
    if not names:
        raise AssertionError(f"no step named {STEP_NAME!r}")
    body = []
    start = None
    for line in lines[names[0] + 1:]:
        if start is None:
            if re.match(r"^\s*run:\s*\|\s*$", line):
                start = len(line) - len(line.lstrip())
            continue
        if line.strip() and len(line) - len(line.lstrip()) <= start:
            break
        body.append(line)
    if start is None:
        raise AssertionError(f"the step {STEP_NAME!r} has no run script")
    indents = [len(l) - len(l.lstrip()) for l in body if l.strip()]
    cut = min(indents) if indents else 0
    return "\n".join(l[cut:] for l in body) + "\n"


class CheckAddressWorkflow(unittest.TestCase):

    def test_triggers_are_the_schedule_and_the_manual_run_only(self):
        match = re.search(r"^on:\s*\n((?:[ \t]+.*\n?|\n)+)", code(), re.MULTILINE)
        self.assertIsNotNone(match, "no `on:` block")
        block = match.group(1)
        triggers = re.findall(r"(?m)^  (\w[\w-]*):", block)
        self.assertEqual(sorted(triggers), ["schedule", "workflow_dispatch"])
        self.assertNotRegex(block, r"push|pull_request")

    def test_schedule_runs_every_five_minutes_off_the_hour(self):
        cron = re.findall(r"cron:\s*[\"']([^\"']+)[\"']", code())
        self.assertEqual(len(cron), 1, f"expected one cron expression, found {cron}")
        fields = cron[0].split()
        self.assertEqual(len(fields), 5, cron[0])
        self.assertEqual(fields[1:], ["*", "*", "*", "*"], cron[0])
        minutes = sorted(minutes_of(fields[0]))
        # Minutes 3, 8, ..., 58: every five minutes, never 0, where GitHub delays the top of the hour.
        self.assertEqual(minutes, list(range(3, 59, 5)))
        gaps = {(minutes[(i + 1) % len(minutes)] - minutes[i]) % 60 for i in range(len(minutes))}
        self.assertEqual(gaps, {5})

    def test_manual_run_has_one_boolean_input_that_forces_failure(self):
        match = re.search(r"(?m)^  workflow_dispatch:\s*\n((?:[ \t]{4,}.*\n?)+)", code())
        self.assertIsNotNone(match, "no workflow_dispatch inputs")
        inputs = re.findall(r"(?m)^      (\w+):\s*$", match.group(1))
        self.assertEqual(inputs, ["force_failure"])
        self.assertRegex(match.group(1), r"(?m)^        type:\s*boolean\s*$")

    def test_no_token_permissions(self):
        self.assertRegex(code(), r"(?m)^permissions:\s*\{\s*\}\s*$")

    def test_no_checkout_no_secret_no_ssh(self):
        text = code()
        self.assertNotIn("actions/checkout", text)
        self.assertNotIn("secrets.", text)
        self.assertNotRegex(text, r"(?<![\w./-])ssh\s")

    def test_it_deploys_nothing(self):
        # Its one step runs curl and sleep only: no Docker, no Compose, no deploy script, no git.
        script = run_script()
        for word in ("docker", "compose", "loop2-deploy", "git ", "ssh", "npm"):
            self.assertNotIn(word, script)

    def test_expressions_reach_a_run_script_only_through_env(self):
        lines = code_lines()
        in_run, indent = False, 0
        for line in lines:
            stripped = line.strip()
            if re.match(r"^\s*run:\s*[|>]", line):
                in_run, indent = True, len(line) - len(line.lstrip())
                continue
            if in_run:
                if stripped and len(line) - len(line.lstrip()) <= indent:
                    in_run = False
                elif "${{" in line:
                    self.fail(f"expression inside a run script: {stripped}")
        for line in lines:
            if "${{" in line:
                self.assertRegex(line, r"^\s+[A-Z_][A-Z0-9_]*:\s*\$\{\{\s*inputs\.force_failure\s*\}\}\s*$")

    def test_own_concurrency_group_cancels_an_older_run(self):
        text = code()
        self.assertRegex(text, r"(?m)^concurrency:\s*\n\s+group:\s*(?!deploy-loop2\s*$)\S+\s*\n\s+cancel-in-progress:\s*true\s*$")

    def test_job_is_bounded_to_five_minutes_and_has_one_step(self):
        text = code()
        self.assertRegex(text, rf"(?m)^\s+timeout-minutes:\s*{JOB_TIMEOUT_MINUTES}\s*$")
        steps = re.findall(r"(?m)^\s+- name:", text)
        self.assertEqual(len(steps), 1, steps)

    def test_only_host_is_the_declared_public_address(self):
        text = code()
        deployed = declared_public_address(read(DEPLOY_WORKFLOW))
        self.assertEqual(declared_public_address(text), deployed)
        hosts = set(re.findall(r"https?://([A-Za-z0-9.-]+)", text))
        self.assertEqual(hosts, {re.match(r"https?://([^/]+)", deployed).group(1)})

    def test_probe_retries_six_times_twenty_seconds_apart_each_bounded(self):
        script = run_script()
        self.assertIn(f"for attempt in {' '.join(map(str, range(1, ATTEMPTS + 1)))}; do", script)
        self.assertRegex(script, rf"--max-time {ATTEMPT_TIMEOUT_SECONDS}\b")
        self.assertRegex(script, rf"sleep {SECONDS_BETWEEN_ATTEMPTS}\b")
        self.assertIn("::error::", script)
        self.assertRegex(script, r"exit 1")

    def test_forced_failure_input_fails_the_step_before_any_request(self):
        script = run_script()
        self.assertIn('"$FORCE_FAILURE" = "true"', script)
        self.assertLess(script.index('"$FORCE_FAILURE" = "true"'), script.index("curl"))


class RunScriptOnStandIns(unittest.TestCase):
    """The step's run script, run by Git's bash with `curl` and `sleep` replaced by stand-ins:
    `curl` answers the codes of a list, one per call, and `sleep` only records its argument."""

    @classmethod
    def setUpClass(cls):
        cls.bash = support.git_bash()

    def setUp(self):
        self.tmp = tempfile.mkdtemp(prefix="check-address-")
        self.calls = os.path.join(self.tmp, "curl.calls")
        self.codes = os.path.join(self.tmp, "codes")
        self.sleeps = os.path.join(self.tmp, "sleep.calls")
        self.script_path = os.path.join(self.tmp, "run.sh")
        with open(self.script_path, "w", encoding="utf-8", newline="\n") as handle:
            handle.write(self._preamble() + run_script())

    def tearDown(self):
        shutil.rmtree(self.tmp, ignore_errors=True)

    def _preamble(self):
        """Stand-ins as shell functions, defined before the run script: `curl` answers the line of
        the codes file that matches its call number, `sleep` records its argument. Functions need
        no lookup on PATH, which Git's bash does not give an extensionless script."""
        calls, codes, sleeps = (support.shell_path(p) for p in (self.calls, self.codes, self.sleeps))
        return ("CALLS_FILE='" + calls + "'\n"
                "CODES_FILE='" + codes + "'\n"
                "SLEEPS_FILE='" + sleeps + "'\n"
                'curl() { echo call >> "$CALLS_FILE"; n=$(wc -l < "$CALLS_FILE"); '
                'sed -n "${n}p" "$CODES_FILE"; }\n'
                'sleep() { echo "$1" >> "$SLEEPS_FILE"; }\n')

    def run_step(self, answers, force_failure="false"):
        with open(self.codes, "w", encoding="utf-8", newline="\n") as handle:
            handle.write("".join(f"{a}\n" for a in answers))
        url = declared_public_address(read(WORKFLOW))
        env = {
            "PATH": "/usr/bin:/bin",
            "LOOP2_PUBLIC_URL": url,
            "FORCE_FAILURE": force_failure,
            "HOME": support.shell_path(self.tmp),
        }
        result = subprocess.run([self.bash, "--noprofile", "--norc", "-eo", "pipefail",
                                 support.shell_path(self.script_path)],
                                env=env, capture_output=True, text=True, timeout=60)
        calls = read(self.calls).count("call") if os.path.exists(self.calls) else 0
        sleeps = read(self.sleeps).split() if os.path.exists(self.sleeps) else []
        return result, calls, sleeps

    def test_status_200_passes_at_once(self):
        result, calls, sleeps = self.run_step(["200"])
        self.assertEqual(result.returncode, 0, result.stdout + result.stderr)
        self.assertEqual(calls, 1)
        self.assertEqual(sleeps, [])

    def test_a_non_200_fails_after_six_attempts_twenty_seconds_apart(self):
        result, calls, sleeps = self.run_step(["404"] * ATTEMPTS)
        self.assertNotEqual(result.returncode, 0, result.stdout + result.stderr)
        self.assertEqual(calls, ATTEMPTS)
        self.assertEqual(sleeps, [str(SECONDS_BETWEEN_ATTEMPTS)] * (ATTEMPTS - 1))
        self.assertIn("::error::", result.stdout + result.stderr)

    def test_a_non_200_then_200_passes_after_a_retry(self):
        result, calls, sleeps = self.run_step(["503", "000", "200"])
        self.assertEqual(result.returncode, 0, result.stdout + result.stderr)
        self.assertEqual(calls, 3)
        self.assertEqual(sleeps, [str(SECONDS_BETWEEN_ATTEMPTS)] * 2)

    def test_forced_failure_fails_at_once_without_a_request(self):
        result, calls, sleeps = self.run_step(["200"], force_failure="true")
        self.assertNotEqual(result.returncode, 0, result.stdout + result.stderr)
        self.assertEqual(calls, 0)
        self.assertEqual(sleeps, [])

    def test_input_false_leaves_the_check_to_the_address(self):
        result, calls, _sleeps = self.run_step(["200"], force_failure="false")
        self.assertEqual(result.returncode, 0, result.stdout + result.stderr)
        self.assertEqual(calls, 1)


if __name__ == "__main__":
    unittest.main()
