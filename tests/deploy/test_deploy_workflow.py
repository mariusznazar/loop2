"""Static checks of the deployment workflow (spec § 4). Standard library only: the workflow is
read as text, not parsed as YAML. No real run is possible before the merge."""

import os
import re
import unittest

ROOT = os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
WORKFLOW = os.path.join(ROOT, ".github", "workflows", "deploy.yml")

SECRETS = {"DEPLOY_HOST", "DEPLOY_PORT", "DEPLOY_USER", "DEPLOY_SSH_KEY", "DEPLOY_KNOWN_HOSTS"}
ALLOWED_HOSTS = {"loop2.mariusznazar.com", "kantarion.bieda.it", "github.com"}


def code_lines():
    with open(WORKFLOW, encoding="utf-8", newline="") as handle:
        text = handle.read()
    return [re.sub(r"(^|\s)#.*$", "", line) for line in text.splitlines()]


def code():
    return re.sub(r"\\\n\s*", " ", "\n".join(code_lines()))


class DeployWorkflow(unittest.TestCase):

    def test_triggers_on_push_to_main_only(self):
        text = code()
        match = re.search(r"^on:\s*\n((?:[ \t]+.*\n?|\n)+)", text, re.MULTILINE)
        self.assertIsNotNone(match, "no `on:` block")
        block = match.group(1)
        self.assertRegex(block, r"(?m)^\s+push:\s*$")
        self.assertRegex(block, r"(?m)^\s+branches:\s*\[\s*main\s*\]\s*$")
        triggers = re.findall(r"(?m)^  (\w[\w-]*):", block)
        self.assertEqual(triggers, ["push"])
        self.assertNotRegex(block, r"pull_request|workflow_dispatch|schedule")

    def test_concurrency_never_cancels_a_running_deployment(self):
        text = code()
        self.assertRegex(text, r"(?m)^concurrency:\s*\n\s+group:\s*deploy-loop2\s*\n\s+cancel-in-progress:\s*false\s*$")

    def test_no_token_permissions(self):
        self.assertRegex(code(), r"(?m)^permissions:\s*\{\s*\}\s*$")

    def test_no_checkout(self):
        self.assertNotIn("actions/checkout", code())

    def test_exactly_the_five_secrets(self):
        used = set(re.findall(r"secrets\.([A-Za-z0-9_]+)", code()))
        self.assertEqual(used, SECRETS)

    def test_ssh_is_strict_and_batch(self):
        text = code()
        self.assertIn("StrictHostKeyChecking=yes", text)
        self.assertIn("BatchMode=yes", text)
        self.assertNotRegex(text, r"StrictHostKeyChecking=(?!yes)")

    def test_key_file_is_private_to_the_runner(self):
        text = code()
        self.assertIn("base64 -d", text)
        self.assertRegex(text, r"umask 077|chmod 600|install -m 600")

    def test_sha_reaches_the_script_only_through_env(self):
        lines = code_lines()
        # github.sha appears only on an env mapping line, never inside a run script
        uses = [l for l in lines if "github.sha" in l]
        self.assertTrue(uses, "github.sha is not used")
        for line in uses:
            self.assertRegex(line, r"^\s+[A-Z_][A-Z0-9_]*:\s*\$\{\{\s*github\.sha\s*\}\}\s*$")
        text = code()
        self.assertRegex(text, r'ssh\b[^\n]*"\$\{?DEPLOY_SHA\}?"')
        # no expression of any kind inside the run scripts
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

    def test_server_failure_fails_the_run(self):
        text = code()
        self.assertNotRegex(text, r"continue-on-error:\s*true")
        self.assertNotRegex(text, r"\bssh\b[^\n]*\|\|\s*true")
        match = re.search(r"(?m)^(\s*)ssh\b[^\n]*$", text)
        self.assertIsNotNone(match)
        ssh_line = match.group(0)
        after = text[match.end():]
        if re.search(r"\|\|\s*(\w+)=\$\?\s*$", ssh_line):
            variable = re.search(r"\|\|\s*(\w+)=\$\?\s*$", ssh_line).group(1)
            # a captured status must end the step: a test of it followed by `exit` with it
            self.assertRegex(after, r'if \[ "\$%s" -ne 0 \]; then[^\n]*\n(?:[^\n]*\n)*?\s*exit "\$%s"'
                             % (variable, variable))
        else:
            self.assertNotRegex(ssh_line, r"\|\||;|&")
            self.assertRegex(text, r"set -[a-z]*e")

    def test_ssh_forwards_nothing_and_takes_only_the_sha(self):
        text = code()
        self.assertNotRegex(text, r"ForwardAgent|\s-A\s|\s-[a-zA-Z]*A[a-zA-Z]*\s")
        match = re.search(r"(?<![\w./-])ssh\s[^\n]*", text)
        self.assertRegex(match.group(0), r'"\$SSH_USER@\$SSH_HOST" "\$DEPLOY_SHA"(?: \|\| \w+=\$\?)?\s*$')
        self.assertIn("LogLevel=ERROR", match.group(0))

    def test_decoded_key_is_never_printed(self):
        text = code()
        self.assertNotRegex(text, r"\bcat\b[^\n]*key|echo[^\n]*(?:key|KEY)|set -[a-z]*x|xtrace")
        self.assertNotRegex(text, r"base64 -d(?![^\n]*> \"\$key_file\")")

    def test_api_probe_demands_a_json_error(self):
        text = code()
        self.assertIn("%{content_type}", text)
        self.assertRegex(text, r"application/json")
        self.assertRegex(text, r"\+json")

    def test_one_ssh_call(self):
        calls = [l for l in code_lines() if re.search(r"(?<![\w./-])ssh\s", l) and "-i" in l]
        self.assertEqual(len(calls), 1, calls)

    def test_public_address_declared_once_and_probed(self):
        text = code()
        declared = re.findall(r"(?m)^\s*(\w*LOOP2\w*):\s*https://loop2\.mariusznazar\.com/\s*$", text)
        self.assertEqual(len(declared), 1)
        self.assertIn("https://kantarion.bieda.it/", text)
        self.assertRegex(text, r"\$\{?" + declared[0] + r"\}?api/")
        self.assertIn("200", text)
        self.assertRegex(text, r"(?i)retr|attempt")

    def test_failed_probe_names_the_address(self):
        text = code()
        self.assertRegex(text, r"(?i)(fail|error)[^\n]*\$\{?url\}?")

    def test_no_ipv6_and_no_other_host(self):
        text = code()
        self.assertNotRegex(text, r"\[[0-9a-fA-F:]*:[0-9a-fA-F:]+\]|(?<![\w.])(?:[0-9a-fA-F]{1,4}:){3,}[0-9a-fA-F]{0,4}")
        hosts = set(re.findall(r"https?://([A-Za-z0-9.-]+)", text))
        self.assertLessEqual(hosts, ALLOWED_HOSTS)


if __name__ == "__main__":
    unittest.main()
