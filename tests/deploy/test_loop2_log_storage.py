"""Static checks of the log storage of the running game (decision D-352): both Compose services
write their logs to Docker's `local` driver with no other logging option, and the repository holds
the one logrotate stanza of the dump file `/var/log/loop2-app.log`. Standard library only: both
files are read as text, not parsed as YAML, and nothing runs."""

import os
import re
import unittest

ROOT = os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
COMPOSE = os.path.join(ROOT, "compose.yaml")
LOGROTATE = os.path.join(ROOT, "deploy", "loop2-app.logrotate")

SERVICES = ("app", "cloudflared")
LOCAL_DRIVER_ONLY = ["driver: local"]
LOGROTATE_HEADER = "/var/log/loop2-app.log {"
# Weekly, or sooner past 100 MiB; four rotated files; copy and truncate, so the file stays where
# the deployment appends to it; no `create` and no user name in the file (D-13).
LOGROTATE_DIRECTIVES = sorted([
    "weekly",
    "maxsize 100M",
    "rotate 4",
    "compress",
    "delaycompress",
    "missingok",
    "notifempty",
    "copytruncate",
    "su root root",
])


def read_lines(path):
    with open(path, encoding="utf-8", newline="") as handle:
        return handle.read().splitlines()


def is_code(line):
    return bool(line.strip()) and not line.lstrip().startswith("#")


def service_logging(lines):
    """Map each service of the `services:` key to the stripped lines under its `logging:` key;
    a service without that key maps to None."""
    found = {}
    service = None
    in_logging = False
    for line in lines:
        if not is_code(line):
            continue
        indent = len(line) - len(line.lstrip(" "))
        if indent == 0:
            service, in_logging = None, False
        elif indent == 2 and line.strip().endswith(":"):
            service, in_logging = line.strip()[:-1], False
            if service in SERVICES:
                found.setdefault(service, None)
        elif indent == 4 and service in SERVICES:
            in_logging = line.strip() == "logging:"
            if in_logging:
                found[service] = []
        elif in_logging and indent > 4:
            found[service].append(line.strip())
        else:
            in_logging = False
    return found


class ComposeLogDriver(unittest.TestCase):

    def setUp(self):
        self.lines = read_lines(COMPOSE)

    def test_both_services_log_to_the_local_driver_and_no_other_option(self):
        # D-352, A2: Docker's own defaults of the `local` driver bound each log
        logging = service_logging(self.lines)
        for service in SERVICES:
            with self.subTest(service=service):
                self.assertIn(service, logging, f"{COMPOSE} has no service {service}")
                self.assertEqual(logging[service], LOCAL_DRIVER_ONLY,
                                 f"service {service} does not log to the `local` driver alone")

    def test_no_other_logging_key_in_the_compose_file(self):
        # D-352, A2: one `logging:` key per service, and no legacy `log_driver`
        keys = [line for line in self.lines if is_code(line)
                and re.match(r"\s*(logging|log_driver|log_opt)\s*:", line)]
        self.assertEqual(len(keys), len(SERVICES),
                         f"{COMPOSE} holds {len(keys)} logging keys, not one per service")
        self.assertNotIn("log_driver", "\n".join(self.lines))


class LogrotateStanza(unittest.TestCase):

    def setUp(self):
        self.lines = [line.strip() for line in read_lines(LOGROTATE) if is_code(line)]

    def test_one_stanza_for_the_dump_file(self):
        # D-352, A3: the file holds one stanza, for /var/log/loop2-app.log only
        self.assertTrue(self.lines, f"{LOGROTATE} holds no stanza")
        self.assertEqual(self.lines[0], LOGROTATE_HEADER)
        self.assertEqual(self.lines[-1], "}")
        self.assertEqual(self.lines.count(LOGROTATE_HEADER), 1)

    def test_the_stanza_holds_exactly_the_directives_of_a3(self):
        # D-352, A3: weekly or past 100 MiB, four files, copy and truncate, owner root, and no
        # create and no user name
        body = self.lines[1:-1]
        self.assertEqual(sorted(body), LOGROTATE_DIRECTIVES)


if __name__ == "__main__":
    unittest.main()
