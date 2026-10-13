"""Invariant loop2-container-isolation/1: The loop2 instance runs in a container separate from
the existing loop instance.

The check reads the repository's `compose.yaml` and `Dockerfile` as they stand and runs nothing;
no Docker is needed.

Reading of the sentence:
- the loop2 instance runs in a container of its own: `compose.yaml` names its own Compose project
  `loop2`, its service `app` and the container `loop2`;
- separate from the existing loop instance: nothing in `compose.yaml` or the Dockerfile reaches
  into the old instance or shares with another container — no volume, no external network or
  volume, no network, PID, IPC, UTS or user namespace set to share (`network_mode`, `pid`, `ipc`,
  `uts`, `userns_mode`, `cgroup`), no link to another container, no device, no Docker socket,
  and no name of the old instance (`loop`, `loop-…`, `loop_…`, `/srv/loop`).

Does NOT cover: what really runs on the server (the check runs nothing there); what a deployment
does to other containers, images, networks or volumes, and the privileges the service asks the
host for — loop2-host-sharing's, checked in `test_loop2_host_sharing.py`; whether the old game
still answers (the workflow's probe of it, after a deployment).

A file this check reads that does not exist makes its test fail.
"""

import re
import unittest

import loop2_invariant_support as support

COMPOSE_FILE = "compose.yaml"
DOCKERFILE = "Dockerfile"

EXPECTED_PROJECT = "loop2"
EXPECTED_SERVICE = "app"
EXPECTED_CONTAINER = "loop2"

# A name of the old deployment, in the text of a file: `loop` standing alone or followed by `-`,
# `_`, `/` or `.`, never `loop2`.
OLD_NAME_IN_TEXT = re.compile(r"(?<![A-Za-z0-9])loop(?![A-Za-z0-9])")

# Keys of a Compose service that share a namespace, a file or a socket with something outside
# the container.
SHARING_SERVICE_KEYS = ("volumes", "volumes_from", "network_mode", "pid", "ipc", "links",
                        "external_links", "uts", "userns_mode", "cgroup", "devices")


def code_lines(text):
    """The lines of a YAML file or Dockerfile, each less its comment, a comment line left empty
    so that the numbers of the lines stay."""
    return ["" if line.lstrip().startswith("#") else support._strip_comment(line)
            for line in text.splitlines()]


def old_names(text):
    return [f"line {number}: {line.strip()}" for number, line in enumerate(code_lines(text), 1)
            if OLD_NAME_IN_TEXT.search(line)]


class ComposeIsolation(unittest.TestCase):

    def test_compose_names_its_own_project_service_and_container(self):
        # invariant: loop2-container-isolation/1
        top, services = support.compose_outline(support.read_required(COMPOSE_FILE))
        self.assertIn("name", top, f"{COMPOSE_FILE} names no Compose project")
        self.assertEqual(top["name"].value, EXPECTED_PROJECT,
                         f"{COMPOSE_FILE} names the project {top['name']!r}")
        self.assertIn(EXPECTED_SERVICE, services,
                      f"{COMPOSE_FILE} has no service `{EXPECTED_SERVICE}`: {sorted(services)}")
        for name, keys in services.items():
            with self.subTest(service=name):
                self.assertIn("container_name", keys, f"service `{name}` names no container")
                self.assertEqual(keys["container_name"].value, EXPECTED_CONTAINER,
                                 f"service `{name}` names the container "
                                 f"{keys['container_name']!r}")

    def test_compose_shares_nothing_with_another_deployment(self):
        # invariant: loop2-container-isolation/1
        text = support.read_required(COMPOSE_FILE)
        top, services = support.compose_outline(text)
        problems = []
        for key in ("volumes", "include", "extends"):
            if key in top:
                problems.append(f"top-level `{key}` {top[key]!r}")
        for name, keys in services.items():
            for key in SHARING_SERVICE_KEYS + ("extends",):
                if key in keys:
                    problems.append(f"service `{name}` sets `{key}` {keys[key]!r}")
        for number, line in enumerate(code_lines(text), 1):
            if re.search(r"^\s*external\s*:", line):
                problems.append(f"line {number}: an external network or volume: {line.strip()}")
            if "docker.sock" in line:
                problems.append(f"line {number}: the Docker socket: {line.strip()}")
        problems += old_names(text)
        self.assertEqual(problems, [], f"{COMPOSE_FILE} reaches outside the loop2 container")

    def test_dockerfile_names_nothing_of_another_deployment(self):
        # invariant: loop2-container-isolation/1
        text = support.read_required(DOCKERFILE)
        support.dockerfile_stages(text)
        problems = old_names(text)
        problems += [f"line {number}: the Docker socket: {line.strip()}"
                     for number, line in enumerate(code_lines(text), 1) if "docker.sock" in line]
        self.assertEqual(problems, [], f"{DOCKERFILE} reaches outside the loop2 container")



if __name__ == "__main__":
    unittest.main()
