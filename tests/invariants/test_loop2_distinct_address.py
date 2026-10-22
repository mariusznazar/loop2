"""Invariant loop2-distinct-address: The public address of loop2 differs from
`kantarion.bieda.it`.

The check reads the public address of loop2 where the repository declares it — once, as a
variable of the deployment workflow `.github/workflows/deploy.yml` — and runs nothing.

Reading of the sentence:
- the public address of loop2: the value of the one variable of the workflow whose name holds
  `LOOP2` (in any case) and whose value is an absolute `http://` or `https://` address — set as
  a YAML key (`LOOP2_URL: https://…`) or as a shell assignment (`LOOP2_URL=https://…`). Exactly
  one such declaration must exist: none means the address is not declared in the repository (a
  value taken from a GitHub variable or secret is not), and two mean it is not declared once;
- differs from `kantarion.bieda.it`: the address's host name, compared without case and without
  a trailing dot, is not `kantarion.bieda.it`.

Does NOT cover: where the DNS name really points, or what answers there (Cloudflare and the server
are outside the repository); an address the workflow uses without declaring it in such a variable.

While `.github/workflows/deploy.yml` does not exist, the check fails: that is its failing test
until the workflow is written.
"""

import re
import unittest
import urllib.parse

import loop2_invariant_support as support

WORKFLOW = ".github/workflows/deploy.yml"
OLD_GAME_HOST = "kantarion.bieda.it"

YAML_DECLARATION = re.compile(r"^\s*(?:-\s+)?[\"']?([A-Za-z_][\w-]*)[\"']?\s*:\s+(\S.*)$")
SHELL_DECLARATION = re.compile(r"(?:^|[\s;])(?:export\s+)?([A-Za-z_]\w*)=(\S+)")


def unquote(value):
    value = support._strip_comment(value).strip()
    if len(value) >= 2 and value[0] == value[-1] and value[0] in "\"'":
        return value[1:-1]
    return value


def address_declarations(text):
    """[(line number, name, value)] of the variables named with LOOP2 whose value is an absolute
    http or https address."""
    found = []
    for number, line in enumerate(text.splitlines(), 1):
        if line.lstrip().startswith("#"):
            continue
        candidates = []
        yaml = YAML_DECLARATION.match(line)
        if yaml:
            candidates.append((yaml.group(1), unquote(yaml.group(2))))
        candidates += [(name, unquote(value)) for name, value in SHELL_DECLARATION.findall(line)]
        for name, value in candidates:
            if "LOOP2" in name.upper() and re.match(r"(?i)https?://", value):
                found.append((number, name, value))
    return found


class Loop2PublicAddress(unittest.TestCase):

    def test_public_address_is_declared_once(self):
        # invariant: loop2-distinct-address
        declarations = address_declarations(support.read_required(WORKFLOW))
        self.assertEqual(len(declarations), 1,
                         f"{WORKFLOW} declares loop2's public address {len(declarations)} times, "
                         f"not once: {declarations}")

    def test_public_address_host_is_not_the_old_game(self):
        # invariant: loop2-distinct-address
        declarations = address_declarations(support.read_required(WORKFLOW))
        self.assertTrue(declarations, f"{WORKFLOW} declares no public address of loop2")
        for number, name, value in declarations:
            with self.subTest(line=number, name=name):
                host = (urllib.parse.urlsplit(value).hostname or "").rstrip(".").lower()
                self.assertTrue(host, f"{WORKFLOW}:{number}: {name} = {value!r} has no host")
                self.assertNotEqual(host, OLD_GAME_HOST,
                                    f"{WORKFLOW}:{number}: {name} = {value!r} is the old game's "
                                    "address")


if __name__ == "__main__":
    unittest.main()
