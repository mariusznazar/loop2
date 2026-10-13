"""The deployment script's input, on its two paths (spec § 5, "Input — two paths"; WAY-48).

The forced command's path: `SSH_ORIGINAL_COMMAND` set and no argument. The human path: the
variable unset and exactly one argument. The one value must be a commit name matching
`^[0-9a-f]{40}$` as a whole. Anything else ends the run with exit 2 before git or Docker is
called: no stub records a call and git traces nothing.
"""

import unittest

import deploy_script_support as support

VALID = "0123456789abcdef0123456789abcdef01234567"

# Values refused on either path, each standing in for the one input.
REFUSED_VALUES = {
    "non-hex": "0123456789abcdef0123456789abcdef0123456g",
    "39 characters": VALID[:39],
    "41 characters": VALID + "8",
    "uppercase hex": VALID.upper(),
    "leading whitespace": " " + VALID,
    "trailing whitespace": VALID + " ",
    "trailing newline": VALID + "\n",
    "embedded newline": VALID[:20] + "\n" + VALID[20:],
    "--help": "--help",
    "-c": "-c",
    "semicolon": VALID + ";id",
    "command substitution": "$(id)" + VALID,
    "backticks": "`id`" + VALID,
    "pipe": VALID + "|id",
    "and-list": VALID + "&&id",
    "two words": VALID + " " + VALID,
    "empty": "",
}


class InputRefusedBeforeGitOrDocker(unittest.TestCase):

    @classmethod
    def setUpClass(cls):
        cls.fixture = support.DeployFixture()
        cls.head_before = cls.fixture.git("-C", cls.fixture.checkout, "rev-parse", "HEAD")

    @classmethod
    def tearDownClass(cls):
        cls.fixture.remove()

    def assert_refused(self, result):
        self.assertEqual(result.code, 2, result)
        self.assertEqual(result.stub_calls(), {}, result)
        self.assertEqual(result.git_trace, "", f"git ran:\n{result.git_trace}")
        self.assertEqual(self.fixture.git("-C", self.fixture.checkout, "rev-parse", "HEAD"),
                         self.head_before)
        self.assertIn("input", self.fixture.log_text().splitlines()[-1])

    def test_forced_path_refuses_each_malformed_value(self):
        for name, value in REFUSED_VALUES.items():
            with self.subTest(value=name):
                self.assert_refused(self.fixture.run(ssh_original_command=value))

    def test_human_path_refuses_each_malformed_value(self):
        for name, value in REFUSED_VALUES.items():
            with self.subTest(value=name):
                self.assert_refused(self.fixture.run(arguments=[value]))

    def test_two_arguments_refused(self):
        self.assert_refused(self.fixture.run(arguments=[VALID, VALID]))

    def test_both_ssh_original_command_and_an_argument_refused(self):
        self.assert_refused(self.fixture.run(arguments=[VALID], ssh_original_command=VALID))

    def test_no_input_at_all_refused(self):
        # The forced command when the client asks for no command: sshd leaves the variable unset
        # and passes no argument.
        self.assert_refused(self.fixture.run())

    def test_refusal_does_not_print_the_input(self):
        marker = "$(echo-refused-value-marker)"
        result = self.fixture.run(ssh_original_command=marker)
        self.assert_refused(result)
        self.assertNotIn("refused-value-marker", result.output)
        self.assertNotIn("refused-value-marker", self.fixture.log_text())


class SeamDeliversInputAndSeesGit(unittest.TestCase):
    """Positive controls of the instruments the refusals rest on."""

    @classmethod
    def setUpClass(cls):
        cls.fixture = support.DeployFixture()

    @classmethod
    def tearDownClass(cls):
        cls.fixture.remove()

    def test_arguments_and_ssh_original_command_arrive_byte_exact(self):
        probe = ("#!/bin/bash\n"
                 "printf '%s\\0' \"$#\" \"$@\"\n"
                 "if [[ -v SSH_ORIGINAL_COMMAND ]]; then printf 'set\\0%s\\0' "
                 "\"$SSH_ORIGINAL_COMMAND\"; else printf 'unset\\0'; fi\n")
        values = list(REFUSED_VALUES.values())
        result = self.fixture.run_script_as_probe(probe, arguments=values,
                                                  ssh_original_command=REFUSED_VALUES[
                                                      "embedded newline"])
        parts = result.stdout.split("\0")[:-1]
        self.assertEqual(parts, [str(len(values))] + values
                         + ["set", REFUSED_VALUES["embedded newline"]])
        result = self.fixture.run_script_as_probe(probe, ssh_original_command="")
        self.assertEqual(result.stdout.split("\0")[:-1], ["0", "set", ""])
        result = self.fixture.run_script_as_probe(probe)
        self.assertEqual(result.stdout.split("\0")[:-1], ["0", "unset"])

    def test_a_valid_value_passes_input_and_git_is_traced(self):
        # A well-formed commit name reaches git on both paths, so an empty trace above means git
        # did not run, not that the trace was lost.
        for arguments, ssh in (([], self.fixture.first), ([self.fixture.first], None)):
            with self.subTest(arguments=arguments, ssh=ssh):
                result = self.fixture.run(arguments=arguments, ssh_original_command=ssh)
                self.assertNotEqual(result.code, 2, result)
                self.assertIn("fetch", result.git_trace, result)


if __name__ == "__main__":
    unittest.main()
