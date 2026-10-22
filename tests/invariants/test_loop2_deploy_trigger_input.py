"""Invariant loop2-deploy-trigger-input: The deployment command the automation's key runs refuses
every input but one commit name of 40 lowercase hexadecimal characters before it fetches, builds or
changes a container, and deploys only a commit that belongs to `main` as just fetched.

The check drives the repository's script `deploy/loop2-deploy` as a black box through the seam of
`tests/deploy/deploy_script_support.py`: a temporary copy in which only the marked constants block
is replaced, recording stubs for docker, curl, flock, df, hostname and uname, and a temporary Git
repository standing in for GitHub with a clone of it standing in for the server's checkout.

Reading of the sentence:
- the command the automation's key runs: the forced-command path, `SSH_ORIGINAL_COMMAND` set and no
  argument (spec § 5, "Input — two paths"); a key with a forced command also reaches the script
  with the variable unset and no argument, when the client asks for no command;
- refuses before it fetches, builds or changes a container: the run ends with the input refusal's
  exit 2, no docker call is recorded at all, git traces no fetch, and the checkout stays where it
  was;
- every input but one commit name: each crafted value below, written out as a literal, and both
  inputs at once (the variable and an argument), are refused;
- deploys only a commit that belongs to `main` as just fetched: a commit reachable only from another
  branch, or one `main` no longer holds after the fetch, ends the run with exit 3 and no docker call
  but the read-only `docker inspect` of the running container; an ancestor of the freshly fetched
  `main`, and its tip, pass the input and commit stages and are checked out.

Does NOT cover: the installed copy on the server and its `authorized_keys` entry (the check runs
nothing there); what sshd itself hands the script, which the fact openssh-authorized-keys-options
states.

A machine without Git or Git's own bash skips these tests, so the invariant reports unchecked,
never passed.
"""

import os
import sys
import unittest

sys.path.insert(0, os.path.join(os.path.dirname(os.path.abspath(__file__)), "..", "deploy"))

import deploy_script_support as support  # noqa: E402

# One well-formed commit name, standing in for an input that must get through the input stage.
WELL_FORMED = "0123456789abcdef0123456789abcdef01234567"

# Each value the forced command must refuse, written out byte for byte.
REFUSED_INPUTS = {
    "non-hex letter": "0123456789abcdef0123456789abcdef0123456g",
    "39 characters": "0123456789abcdef0123456789abcdef0123456",
    "41 characters": "0123456789abcdef0123456789abcdef012345678",
    "uppercase": "0123456789ABCDEF0123456789ABCDEF01234567",
    "one uppercase letter": "0123456789abcdeF0123456789abcdef01234567",
    "leading space": " 0123456789abcdef0123456789abcdef01234567",
    "trailing space": "0123456789abcdef0123456789abcdef01234567 ",
    "trailing tab": "0123456789abcdef0123456789abcdef01234567\t",
    "trailing newline": "0123456789abcdef0123456789abcdef01234567\n",
    "trailing carriage return and newline": "0123456789abcdef0123456789abcdef01234567\r\n",
    "leading newline": "\n0123456789abcdef0123456789abcdef01234567",
    "embedded newline": "0123456789abcdef0123\n456789abcdef01234567",
    "newline then a second command": "0123456789abcdef0123456789abcdef01234567\nid",
    "option --help": "--help",
    "option -c": "-c",
    "option-like value of 40 characters": "-123456789abcdef0123456789abcdef01234567",
    "option upload-pack": "--upload-pack=touch /tmp/loop2-pwned",
    "semicolon": "0123456789abcdef0123456789abcdef01234567;id",
    "command substitution": "$(id)0123456789abcdef0123456789abcdef01234567",
    "backticks": "`id`0123456789abcdef0123456789abcdef01234567",
    "pipe": "0123456789abcdef0123456789abcdef01234567|id",
    "and-list": "0123456789abcdef0123456789abcdef01234567&&id",
    "redirection": "0123456789abcdef0123456789abcdef01234567>/tmp/loop2-pwned",
    "single quote": "'0123456789abcdef0123456789abcdef01234567'",
    "double quote": "\"0123456789abcdef0123456789abcdef01234567\"",
    "glob": "0123456789abcdef0123456789abcdef0123456*",
    "two words": "0123456789abcdef0123456789abcdef01234567 0123456789abcdef0123456789abcdef01234567",
    "a branch name": "main",
    "a revision expression": "0123456789abcdef0123456789abcdef01234567^{commit}",
    "a non-ASCII letter": "0123456789abcdef0123456789abcdef0123456é",
    "empty": "",
}

EXIT_INPUT_REFUSED = 2
EXIT_COMMIT_REFUSED = 3
# The only docker call the script makes before the commit stage: the read-only revision label of
# the running loop2 container (spec § 5, step 3).
READ_RUNNING_REVISION = ["inspect", "--type", "container", "--format",
                         '{{ index .Config.Labels "org.opencontainers.image.revision" }}', "loop2"]


class ForcedCommandRefusesMalformedInput(unittest.TestCase):

    @classmethod
    def setUpClass(cls):
        cls.fixture = support.DeployFixture()
        cls.head_before = cls.fixture.git("-C", cls.fixture.checkout, "rev-parse", "HEAD")

    @classmethod
    def tearDownClass(cls):
        cls.fixture.remove()

    def assert_refused_before_anything(self, result):
        self.assertEqual(result.code, EXIT_INPUT_REFUSED, result)
        self.assertEqual(result.calls["docker"], [], result)
        self.assertNotIn("fetch", result.git_trace, result.git_trace)
        self.assertEqual(self.fixture.git("-C", self.fixture.checkout, "rev-parse", "HEAD"),
                         self.head_before)

    def test_each_crafted_value_refused(self):
        # invariant: loop2-deploy-trigger-input
        for name, value in REFUSED_INPUTS.items():
            with self.subTest(input=name):
                self.assert_refused_before_anything(self.fixture.run(ssh_original_command=value))

    def test_both_inputs_at_once_refused(self):
        # invariant: loop2-deploy-trigger-input
        self.assert_refused_before_anything(self.fixture.run(
            arguments=["0123456789abcdef0123456789abcdef01234567"],
            ssh_original_command="0123456789abcdef0123456789abcdef01234567"))

    def test_both_inputs_at_once_refused_with_a_real_commit(self):
        # invariant: loop2-deploy-trigger-input
        first = self.fixture.first
        self.assert_refused_before_anything(self.fixture.run(arguments=[first],
                                                             ssh_original_command=first))

    def test_no_command_from_the_client_refused(self):
        # invariant: loop2-deploy-trigger-input
        self.assert_refused_before_anything(self.fixture.run())

    def test_well_formed_value_reaches_the_fetch(self):
        # A positive control of the instruments: the same fixture sees a fetch in git's trace when
        # the value is well formed, so an empty trace above is a refusal, not a lost trace.
        # invariant: loop2-deploy-trigger-input
        result = self.fixture.run(ssh_original_command=WELL_FORMED)
        self.assertNotEqual(result.code, EXIT_INPUT_REFUSED, result)
        self.assertIn("fetch", result.git_trace, result)


class ForcedCommandDeploysOnlyCommitsOfMain(unittest.TestCase):

    def setUp(self):
        self.fixture = support.DeployFixture()
        self.addCleanup(self.fixture.remove)

    def head(self):
        return self.fixture.git("-C", self.fixture.checkout, "rev-parse", "HEAD")

    def assert_commit_refused(self, result, head_before):
        self.assertEqual(result.code, EXIT_COMMIT_REFUSED, result)
        self.assertEqual(result.calls["docker"], [READ_RUNNING_REVISION], result)
        self.assertEqual(self.head(), head_before)

    def assert_passed_input_and_commit(self, result, sha):
        self.assertNotIn(result.code, (EXIT_INPUT_REFUSED, EXIT_COMMIT_REFUSED), result)
        self.assertIn("fetch", result.git_trace, result)
        self.assertEqual(self.head(), sha)

    def test_commit_only_on_another_branch_refused(self):
        # invariant: loop2-deploy-trigger-input
        feature = self.fixture.commit("feature", "only on feature", parent=self.fixture.first)
        self.assert_commit_refused(self.fixture.run(ssh_original_command=feature),
                                   self.fixture.first)

    def test_commit_of_another_branch_the_clone_already_holds_refused(self):
        # A human run fetched the other branch, so the clone holds the commit and a
        # remote-tracking ref of it; the forced command still refuses it.
        # invariant: loop2-deploy-trigger-input
        feature = self.fixture.commit("feature", "only on feature", parent=self.fixture.first)
        self.fixture.git("-C", self.fixture.checkout, "fetch", "--quiet", "origin",
                         "+refs/heads/*:refs/remotes/origin/*")
        self.assertIn("refs/remotes/origin/feature", self.fixture.clone_refs())
        self.assert_commit_refused(self.fixture.run(ssh_original_command=feature),
                                   self.fixture.first)

    def test_commit_main_no_longer_holds_refused(self):
        # The clone fetched `main` while it held the commit; then `main` was moved back on
        # GitHub. Only `main` as just fetched counts.
        # invariant: loop2-deploy-trigger-input
        dropped = self.fixture.commit("main", "dropped from main later")
        self.fixture.git("-C", self.fixture.checkout, "fetch", "--quiet", "origin",
                         "+refs/heads/main:refs/remotes/origin/main")
        self.assertEqual(self.fixture.clone_refs().get("refs/remotes/origin/main"), dropped)
        self.fixture.git("-C", self.fixture.github, "update-ref", "refs/heads/main",
                         self.fixture.first)
        self.assert_commit_refused(self.fixture.run(ssh_original_command=dropped),
                                   self.fixture.first)

    def test_ancestor_of_main_passes(self):
        # invariant: loop2-deploy-trigger-input
        ancestor = self.fixture.commit("main", "an ancestor of main")
        self.fixture.commit("main", "the tip of main")
        result = self.fixture.run(ssh_original_command=ancestor)
        self.assert_passed_input_and_commit(result, ancestor)

    def test_tip_of_main_pushed_after_the_clone_passes(self):
        # invariant: loop2-deploy-trigger-input
        tip = self.fixture.commit("main", "pushed after the clone")
        self.assertFalse(self.fixture.clone_has_object(tip))
        result = self.fixture.run(ssh_original_command=tip)
        self.assert_passed_input_and_commit(result, tip)


if __name__ == "__main__":
    unittest.main()
