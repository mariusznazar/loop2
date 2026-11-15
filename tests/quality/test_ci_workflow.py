"""The workflow that runs the one command of tests on every pull request into `main`,
`.github/workflows/tests.yml` (D-412, and the five points of the process the repository pins).

The workflow is read as text, like those of `tests/deploy/`: no real run is possible before the
pull request that carries it, and no test reaches GitHub.
"""

import json
import re
import unittest

from gate_fixture import ROOT

WORKFLOW = ROOT / ".github/workflows/tests.yml"
SET_UP_COMMANDS = (
    "git symbolic-ref refs/remotes/origin/HEAD refs/remotes/origin/main",
    "npm ci",
    "python -m venv .runs/quality-venv",
    ".runs/quality-venv/bin/python -m pip install --require-hashes -r requirements-quality.txt",
)
ONE_COMMAND = "npm test"
ACTIONS = {"actions/checkout", "actions/setup-python", "actions/setup-node"}


def code_lines():
    text = WORKFLOW.read_text(encoding="utf-8")
    return [re.sub(r"(^|\s)#.*$", "", line) for line in text.splitlines()]


def code():
    return "\n".join(code_lines())


def steps():
    """The steps of the job as dictionaries: `uses`, `run` and the `with` entries by name."""
    lines = code_lines()
    start = lines.index("    steps:") + 1
    found = []
    for line in lines[start:]:
        if re.match(r"^      - ", line):
            found.append({"with": {}})
            line = "        " + line[8:]
        if not line.strip() or not found:
            continue
        key = re.match(r"^        (\w[\w-]*):\s*(.*)$", line)
        entry = re.match(r"^          (\w[\w-]*):\s*(.*)$", line)
        if key and key.group(1) != "with":
            found[-1][key.group(1)] = key.group(2)
        elif entry:
            found[-1]["with"][entry.group(1)] = entry.group(2)
    return found


class TestsWorkflow(unittest.TestCase):

    def test_it_runs_on_a_pull_request_into_main_and_on_nothing_else(self):
        # Breaking it: add a trigger, such as `pull_request_target` or `push`, or aim the
        # pull request at another branch; a request from outside could then run its code with
        # a secret, or the check would not stand on the requests that reach `main`.
        text = code()
        match = re.search(r"^on:\s*\n((?:[ \t]+.*\n?|\n)+)", text, re.MULTILINE)
        self.assertIsNotNone(match, "no `on:` block")
        block = match.group(1)
        self.assertEqual(re.findall(r"(?m)^  (\w[\w-]*):", block), ["pull_request"])
        self.assertRegex(block, r"(?m)^    branches:\s*\[\s*main\s*\]\s*$")
        self.assertNotIn("pull_request_target", text)

    def test_the_token_reads_and_the_job_holds_no_secret(self):
        # Breaking it: widen `permissions` or name a secret; the code of a request from outside
        # would run with a token that writes or with a secret it could print.
        text = code()
        self.assertRegex(text, r"(?m)^permissions:\s*\n  contents:\s*read\s*$")
        self.assertEqual(len(re.findall(r"(?m)^\s*permissions:", text)), 1)
        self.assertNotIn("secrets", text)
        self.assertNotIn("write", text)

    def test_the_text_of_the_request_reaches_no_command(self):
        # Breaking it: put an expression of the request, such as its title or its branch name,
        # inside a command; a crafted text would then run as shell.
        for line in code_lines():
            if "${{" in line:
                self.assertRegex(line, r"^\s+group:\s*tests-\$\{\{\s*github\.ref\s*\}\}\s*$")
        for step in steps():
            self.assertNotIn("${{", step.get("run", ""))

    def test_the_one_command_of_tests_is_the_last_step_and_no_checking_command_stands_beside_it(self):
        # decision: D-412 "The CI of the repository and the one command of tests add no scanner of secrets"
        # Breaking it: add a step that runs a linter, a scanner of secrets or an action that is
        # none of the three the file uses; a second checking command would stand in CI beside
        # the one command.
        commands = [step["run"] for step in steps() if "run" in step]
        self.assertEqual(commands[-1], ONE_COMMAND)
        self.assertEqual(commands.count(ONE_COMMAND), 1)
        self.assertEqual(commands[:-1], list(SET_UP_COMMANDS))
        self.assertEqual(steps()[-1].get("run"), ONE_COMMAND)
        used = {step["uses"].split("@")[0] for step in steps() if "uses" in step}
        self.assertEqual(used, ACTIONS)

    def test_the_actions_stand_at_the_commits_of_their_releases(self):
        # Breaking it: name an action by a tag; a moved tag would change what runs.
        for step in steps():
            if "uses" in step:
                self.assertRegex(step["uses"], r"^[\w./-]+@[0-9a-f]{40}$")

    def test_the_checkout_takes_the_submodule_at_its_gitlink_and_the_whole_history(self):
        # Breaking it: drop `submodules: true` and `.the-way` is missing; drop `fetch-depth: 0`
        # and the foundation check has no merge base to compare with and passes without it.
        checkout = [s for s in steps() if s.get("uses", "").startswith("actions/checkout@")]
        self.assertEqual(len(checkout), 1)
        self.assertEqual(checkout[0]["with"].get("submodules"), "true")
        self.assertEqual(checkout[0]["with"].get("fetch-depth"), "0")
        self.assertEqual(checkout[0]["with"].get("persist-credentials"), "false")
        self.assertNotIn("--remote", code())
        self.assertNotIn("git submodule", code())

    def test_origin_head_names_main_after_the_checkout_and_before_the_tests(self):
        # Breaking it: set `origin/HEAD` after `npm test`, or not at all; the foundation check
        # would then skip its comparison and the run would pass without it.
        order = [step.get("uses", "").split("@")[0] or step.get("run") for step in steps()]
        head = order.index("git symbolic-ref refs/remotes/origin/HEAD refs/remotes/origin/main")
        self.assertEqual(order.index("actions/checkout") + 1, head)
        self.assertLess(head, order.index(ONE_COMMAND))

    def test_python_is_the_version_the_pinned_process_declares(self):
        # Breaking it: name a version in the file; it would drift from the one the scripts of
        # the pinned process run on.
        setup = [s for s in steps() if s.get("uses", "").startswith("actions/setup-python@")]
        self.assertEqual(len(setup), 1)
        self.assertEqual(setup[0]["with"], {"python-version-file": ".the-way/.python-version"})
        self.assertTrue((ROOT / ".the-way/.python-version").is_file())

    def test_node_is_the_release_package_json_asks_for(self):
        # Breaking it: name a version in the file or lose `engines` from `package.json`; Node
        # would drift from what the repository declares.
        setup = [s for s in steps() if s.get("uses", "").startswith("actions/setup-node@")]
        self.assertEqual(len(setup), 1)
        self.assertEqual(setup[0]["with"], {"node-version-file": "package.json"})
        package = json.loads((ROOT / "package.json").read_text(encoding="utf-8"))
        self.assertIn("node", package["engines"])

    def test_the_job_has_the_fixed_name_on_a_linux_machine_and_a_limit_of_time(self):
        # Breaking it: rename the job, and the rule that requires the check by its name stops
        # matching; run it on Windows, and the tests of containers are skipped for want of a
        # Linux daemon; drop the limit, and a hanging run holds the pull request for six hours.
        text = code()
        self.assertRegex(text, r"(?m)^  tests:\s*\n    name: tests\s*$")
        self.assertRegex(text, r"(?m)^    runs-on: ubuntu-[\d.]+\s*$")
        self.assertRegex(text, r"(?m)^    timeout-minutes: \d+\s*$")
        self.assertEqual(len(re.findall(r"(?m)^  \w[\w-]*:\s*$", text.split("jobs:")[1])), 1)


if __name__ == "__main__":
    unittest.main()
