"""The workflow that runs the one command of tests on every pull request into `main`,
`.github/workflows/tests.yml` (D-413, D-412).

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
        # decision: D-413 "The workflow starts on the event `pull_request`, never on `pull_request_target`"
        # decision: D-413 "On every pull request into `main`, GitHub Actions runs the one command of tests"
        # Breaking it: add a trigger, such as `pull_request_target` or `push`, or aim the pull
        # request at another branch.
        text = code()
        match = re.search(r"^on:\s*\n((?:[ \t]+.*\n?|\n)+)", text, re.MULTILINE)
        self.assertIsNotNone(match, "no `on:` block")
        block = match.group(1)
        self.assertEqual(re.findall(r"(?m)^  (\w[\w-]*):", block), ["pull_request"])
        self.assertRegex(block, r"(?m)^    branches:\s*\[\s*main\s*\]\s*$")
        self.assertNotIn("pull_request_target", text)

    def test_the_token_reads_and_the_job_holds_no_secret(self):
        # decision: D-413 "The workflow starts on the event `pull_request`, never on `pull_request_target`, and its token only reads and it holds no secret"
        # Breaking it: widen `permissions` or name a secret.
        text = code()
        self.assertRegex(text, r"(?m)^permissions:\s*\n  contents:\s*read\s*$")
        self.assertEqual(len(re.findall(r"(?m)^\s*permissions:", text)), 1)
        self.assertNotIn("secrets", text)
        self.assertNotIn("write", text)

    def test_the_text_of_the_request_reaches_no_command(self):
        # decision: D-413 "No text of the request stands in a command"
        # Breaking it: put an expression of the request, such as its title, inside a command.
        for line in code_lines():
            if "${{" in line:
                self.assertRegex(line, r"^\s+group:\s*tests-\$\{\{\s*github\.ref\s*\}\}\s*$")
        for step in steps():
            self.assertNotIn("${{", step.get("run", ""))

    def test_the_one_command_of_tests_is_the_last_step_and_no_checking_command_stands_beside_it(self):
        # decision: D-413 "On every pull request into `main`, GitHub Actions runs the one command of tests on a Linux machine, in a job named `tests`, a name that stays as it is, and no other checking command stands beside it"
        # decision: D-413 "The steps before the one command only set the machine up"
        # decision: D-412 "The CI of the repository and the one command of tests add no scanner of secrets"
        # Breaking it: add a step that runs a linter or a scanner of secrets, or an action that is
        # none of the three the file uses.
        commands = [step["run"] for step in steps() if "run" in step]
        self.assertEqual(commands[-1], ONE_COMMAND)
        self.assertEqual(commands.count(ONE_COMMAND), 1)
        self.assertEqual(commands[:-1], list(SET_UP_COMMANDS))
        self.assertEqual(steps()[-1].get("run"), ONE_COMMAND)
        used = {step["uses"].split("@")[0] for step in steps() if "uses" in step}
        self.assertEqual(used, ACTIONS)

    def test_no_step_and_not_the_job_lets_the_run_pass_when_it_fails(self):
        # decision: D-413 "No text of the request stands in a command, and no step or job lets a failing run pass"
        # Breaking it: put `continue-on-error: true` on the step of `npm test` or on the job.
        self.assertNotIn("continue-on-error", code())

    def test_the_actions_stand_at_the_commits_of_their_releases(self):
        # decision: D-413 "The actions stand at the commits of their releases"
        # Breaking it: name an action by a tag.
        for step in steps():
            if "uses" in step:
                self.assertRegex(step["uses"], r"^[\w./-]+@[0-9a-f]{40}$")

    def test_the_checkout_takes_the_submodule_at_its_gitlink_and_the_whole_history(self):
        # decision: D-413 "The job has `.the-way` at the commit the gitlink of the repository records and never moves it to a branch of the-way, the whole history of the request's branch and of `main`"
        # Breaking it: drop `submodules: true` or `fetch-depth: 0`, or move the submodule to a branch.
        checkout = [s for s in steps() if s.get("uses", "").startswith("actions/checkout@")]
        self.assertEqual(len(checkout), 1)
        self.assertEqual(checkout[0]["with"].get("submodules"), "true")
        self.assertEqual(checkout[0]["with"].get("fetch-depth"), "0")
        self.assertEqual(checkout[0]["with"].get("persist-credentials"), "false")
        self.assertNotIn("--remote", code())
        self.assertNotIn("git submodule", code())

    def test_origin_head_names_main_after_the_checkout_and_before_the_tests(self):
        # decision: D-413 "The job has `.the-way` at the commit the gitlink of the repository records and never moves it to a branch of the-way, the whole history of the request's branch and of `main`, `refs/remotes/origin/HEAD` naming `main` before the one command runs"
        # Breaking it: set `origin/HEAD` after `npm test`, or not at all.
        order = [step.get("uses", "").split("@")[0] or step.get("run") for step in steps()]
        head = order.index("git symbolic-ref refs/remotes/origin/HEAD refs/remotes/origin/main")
        self.assertEqual(order.index("actions/checkout") + 1, head)
        self.assertLess(head, order.index(ONE_COMMAND))

    def test_python_is_the_version_the_pinned_process_declares(self):
        # decision: D-413 "The job has `.the-way` at the commit the gitlink of the repository records and never moves it to a branch of the-way, the whole history of the request's branch and of `main`, `refs/remotes/origin/HEAD` naming `main` before the one command runs, the Python that `.the-way/.python-version` declares"
        # Breaking it: name a version in the file.
        setup = [s for s in steps() if s.get("uses", "").startswith("actions/setup-python@")]
        self.assertEqual(len(setup), 1)
        self.assertEqual(setup[0]["with"], {"python-version-file": ".the-way/.python-version"})
        self.assertTrue((ROOT / ".the-way/.python-version").is_file())

    def test_node_is_the_release_package_json_asks_for(self):
        # decision: D-413 "The job has `.the-way` at the commit the gitlink of the repository records and never moves it to a branch of the-way, the whole history of the request's branch and of `main`, `refs/remotes/origin/HEAD` naming `main` before the one command runs, the Python that `.the-way/.python-version` declares, the Node.js release that `engines` of `package.json` asks for"
        # Breaking it: name a version in the file or lose `engines` from `package.json`.
        setup = [s for s in steps() if s.get("uses", "").startswith("actions/setup-node@")]
        self.assertEqual(len(setup), 1)
        self.assertEqual(setup[0]["with"], {"node-version-file": "package.json"})
        package = json.loads((ROOT / "package.json").read_text(encoding="utf-8"))
        self.assertIn("node", package["engines"])

    def test_the_job_has_the_fixed_name_on_a_linux_machine_and_a_limit_of_time(self):
        # decision: D-413 "On every pull request into `main`, GitHub Actions runs the one command of tests on a Linux machine, in a job named `tests`, a name that stays as it is"
        # decision: D-413 "The job has `.the-way` at the commit the gitlink of the repository records and never moves it to a branch of the-way, the whole history of the request's branch and of `main`, `refs/remotes/origin/HEAD` naming `main` before the one command runs, the Python that `.the-way/.python-version` declares, the Node.js release that `engines` of `package.json` asks for, and a time limit"
        # Breaking it: rename the job, run it on Windows or drop the time limit.
        text = code()
        self.assertRegex(text, r"(?m)^  tests:\s*\n    name: tests\s*$")
        self.assertRegex(text, r"(?m)^    runs-on: ubuntu-[\d.]+\s*$")
        self.assertRegex(text, r"(?m)^    timeout-minutes: \d+\s*$")
        self.assertEqual(len(re.findall(r"(?m)^  \w[\w-]*:\s*$", text.split("jobs:")[1])), 1)


if __name__ == "__main__":
    unittest.main()
