"""Invariant loop2-container-isolation/1: The loop2 deployment runs in a container separate from
the existing loop deployment.

The check reads the repository's deployment files as they stand — `compose.yaml`, `Dockerfile`
and the server-side script `deploy/loop2-deploy` — and runs nothing; no Docker is needed.

Reading of the sentence:
- the loop2 deployment runs in a container of its own: `compose.yaml` names its own Compose
  project `loop2`, its service `app` and the container `loop2`;
- separate from the existing loop deployment: nothing in `compose.yaml` or the Dockerfile reaches
  into the old deployment — no volume, no external network or volume, no network, PID or IPC
  namespace shared with another container or the host, no link to another container, no Docker
  socket, and no name of the old deployment (`loop`, `loop-…`, `loop_…`, `/srv/loop`);
- and the script that deploys loop2 acts on loop2 alone: every `docker compose` command names
  the project `loop2` and no Compose file outside `/srv/loop2/`; no command takes the project
  down; nothing names the old deployment except a read-only `docker inspect` or `docker ps` of
  it; no host-wide prune, no image removed but by an image prune carrying the filter
  `label=org.opencontainers.image.title=loop2`; no state-changing command on a container other
  than `loop2`, none on a network or volume, and no container made outside Compose
  (`docker run`, `docker create`). A function that wraps `docker … "$@"` is read at each call.

Does NOT cover: what really runs on the server (the check runs nothing there); a command the
script builds at run time out of values it does not assign on a line of its own; a command run
through a function that wraps another function, or through `eval`; whether the old game still
answers (the workflow's probe of it, after a deployment).

A file this check reads that does not exist makes its test fail: until the deployment files are
written, this is the check's failing test. The shell reader these tests rest on is itself checked
on a made-up script below: `<<` in a comment or in quotes, a here-string `<<<`, a quoted string
over two lines and a real heredoc must not hide the commands after them, and a heredoc or quote
never closed must make the reader fail rather than skip the rest.
"""

import re
import unittest

import loop2_invariant_support as support

COMPOSE_FILE = "compose.yaml"
DOCKERFILE = "Dockerfile"
DEPLOY_SCRIPT = "deploy/loop2-deploy"

EXPECTED_PROJECT = "loop2"
EXPECTED_SERVICE = "app"
EXPECTED_CONTAINER = "loop2"
EXPECTED_CHECKOUT = "/srv/loop2/"
EXPECTED_PRUNE_FILTER = "label=org.opencontainers.image.title=loop2"

# A name of the old deployment, in the text of a file: `loop` standing alone or followed by `-`,
# `_`, `/` or `.`, never `loop2`.
OLD_NAME_IN_TEXT = re.compile(r"(?<![A-Za-z0-9])loop(?![A-Za-z0-9])")
# A word of a command that names the old deployment: its container or project `loop`, a Compose
# name `loop-…` or `loop_…`, or a path in its directory `/srv/loop`.
OLD_NAME_WORD = re.compile(r"^(?:loop|loop[-_].*|.*/srv/loop(?:/.*)?)$")

# Keys of a Compose service that share a namespace, a file or a socket with something outside
# the container.
SHARING_SERVICE_KEYS = ("volumes", "volumes_from", "network_mode", "pid", "ipc", "links",
                        "external_links", "uts", "userns_mode", "cgroup", "devices")
READ_ONLY_DOCKER = (("inspect",), ("ps",), ("container", "inspect"), ("container", "ls"),
                    ("container", "ps"), ("container", "list"))
HOST_WIDE_PRUNES = (("system", "prune"), ("builder", "prune"), ("buildx", "prune"),
                    ("volume", "prune"), ("network", "prune"), ("container", "prune"))
# Docker commands that change a container: every container they name must be loop2's, and those
# that make a new container outside Compose are not run at all.
EVERY_TARGET = ("rm", "stop", "kill", "restart", "start", "pause", "unpause", "wait", "attach")
FIRST_TARGET = ("exec", "update", "rename", "cp", "commit")
NEW_CONTAINER = ("run", "create")
# Options of those commands that take a value as the next word.
VALUE_OPTIONS = ("-t", "--time", "--timeout", "-s", "--signal", "-u", "--user", "-w",
                 "--workdir", "-e", "--env", "--env-file", "--detach-keys")


def code_lines(text):
    """The lines of a YAML file or Dockerfile, each less its comment, a comment line left empty
    so that the numbers of the lines stay."""
    return ["" if line.lstrip().startswith("#") else support._strip_comment(line)
            for line in text.splitlines()]


def old_names(text):
    return [f"line {number}: {line.strip()}" for number, line in enumerate(code_lines(text), 1)
            if OLD_NAME_IN_TEXT.search(line)]


def plain_words(words):
    """The words of a command less its options; the value of an option given as a word of its
    own stays."""
    return [w for w in words if not w.startswith("-")]


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


# A made-up script for the shell reader, and the Docker commands it must find in it.
READER_SCRIPT = """#!/usr/bin/env bash
# <<< constants <<<
PROJECT=loop2
# a comment naming cat <<EOF does not open a heredoc
echo "<<EOF in double quotes" 'and <<EOF in single quotes'
read -r first <<< "a here-string"
message="a string over
two lines # with no comment in it"
cat <<'BODY'
docker compose --project-name loop down
BODY
docker compose --project-name "$PROJECT" -f /srv/loop2/compose.yaml build app 2>&1
docker inspect --format '{{.State.Status}}' loop >>"$LOG"
"""
READER_EXPECTED = [
    (12, ["compose", "--project-name", "loop2", "-f", "/srv/loop2/compose.yaml", "build", "app"]),
    (13, ["inspect", "--format", "{{.State.Status}}", "loop"]),
]
READER_UNREADABLE = (
    "#!/usr/bin/env bash\ncat <<EOF\ndocker compose --project-name loop down\n",
    "#!/usr/bin/env bash\necho \"never closed\ndocker compose --project-name loop down\n",
)


class ShellReaderReadsTheWholeScript(unittest.TestCase):

    def test_shell_reader_reads_past_comments_quotes_and_heredocs(self):
        # invariant: loop2-container-isolation/1
        self.assertEqual(support.docker_commands(READER_SCRIPT), READER_EXPECTED)

    def test_shell_reader_fails_on_what_it_cannot_read(self):
        # invariant: loop2-container-isolation/1
        for script in READER_UNREADABLE:
            with self.subTest(script=script):
                with self.assertRaises(AssertionError):
                    support.docker_commands(script)


class DeployScriptActsOnLoop2Alone(unittest.TestCase):

    def setUp(self):
        self.text = support.read_required(DEPLOY_SCRIPT)
        self.docker = support.docker_commands(self.text)

    def test_script_runs_docker_compose(self):
        # invariant: loop2-container-isolation/1
        compose = [words for _n, words in self.docker if words[:1] == ["compose"]]
        self.assertTrue(compose, f"{DEPLOY_SCRIPT} runs no `docker compose` command, so the "
                                 "commands this check reads cannot be found")

    def test_every_compose_command_names_the_loop2_project(self):
        # invariant: loop2-container-isolation/1
        problems = []
        for number, words in self.docker:
            if words[:1] != ["compose"]:
                continue
            options, _subcommand, _rest = support.compose_parts(words[1:])
            projects = options.get("-p", []) + options.get("--project-name", [])
            if projects != [EXPECTED_PROJECT]:
                problems.append(f"line {number}: project {projects}: {' '.join(words)}")
            for compose_file in options.get("-f", []) + options.get("--file", []):
                if not compose_file.startswith(EXPECTED_CHECKOUT):
                    problems.append(f"line {number}: Compose file {compose_file!r}: "
                                    f"{' '.join(words)}")
        self.assertEqual(problems, [], f"{DEPLOY_SCRIPT} runs `docker compose` on a project "
                                       f"other than `{EXPECTED_PROJECT}`")

    def test_nothing_takes_a_project_down(self):
        # invariant: loop2-container-isolation/1
        found = [f"line {number}: {' '.join(words)}"
                 for number, words in support.shell_commands(self.text) if "down" in words]
        self.assertEqual(found, [], f"{DEPLOY_SCRIPT} takes a Compose project down")

    def test_old_deployment_is_only_read(self):
        # invariant: loop2-container-isolation/1
        problems = []
        docker_lines = {}
        for number, words in self.docker:
            docker_lines.setdefault(number, []).append(words)
        for number, words in support.shell_commands(self.text):
            named = [w for w in words if OLD_NAME_WORD.match(w)
                     and not re.fullmatch(r"[A-Za-z_]\w*=.*", w)]
            if not named:
                continue
            read_only = any(support.is_docker(w) for w in words) and any(
                tuple(plain_words(d)[:len(r)]) == r
                for d in docker_lines.get(number, []) for r in READ_ONLY_DOCKER
                if set(named) <= set(d))
            if not read_only:
                problems.append(f"line {number}: {' '.join(words)}")
        self.assertEqual(problems, [], f"{DEPLOY_SCRIPT} names the old loop deployment outside a "
                                       "read-only `docker inspect` or `docker ps`")

    def test_no_host_wide_prune_and_images_pruned_only_by_the_loop2_label(self):
        # invariant: loop2-container-isolation/1
        problems = []
        for number, words in self.docker:
            plain = tuple(plain_words(words))
            if any(plain[:len(p)] == p for p in HOST_WIDE_PRUNES):
                problems.append(f"line {number}: host-wide prune: {' '.join(words)}")
            if plain[:2] == ("image", "prune") or plain[:1] == ("rmi",) or plain[:2] == (
                    "image", "rm"):
                filters = [words[i + 1] for i, w in enumerate(words[:-1]) if w == "--filter"]
                filters += [w.split("=", 1)[1] for w in words if w.startswith("--filter=")]
                if plain[:2] != ("image", "prune") or EXPECTED_PRUNE_FILTER not in filters:
                    problems.append(f"line {number}: image removal not limited to "
                                    f"`{EXPECTED_PRUNE_FILTER}`: {' '.join(words)}")
        self.assertEqual(problems, [], f"{DEPLOY_SCRIPT} removes what is not loop2's")

    def test_no_state_change_on_another_container_network_or_volume(self):
        # invariant: loop2-container-isolation/1
        problems = []
        for number, words in self.docker:
            words = words[1:] if words[:1] == ["container"] else words
            if not words or words[0] == "compose":
                continue
            targets, skip = [], False
            for word in words[1:]:
                if skip:
                    skip = False
                elif word.startswith("-"):
                    skip = word in VALUE_OPTIONS
                else:
                    targets.append(word)
            command = words[0]
            if command in ("network", "volume") or command in NEW_CONTAINER:
                problems.append(f"line {number}: {' '.join(words)}")
            elif command in EVERY_TARGET and targets != [EXPECTED_CONTAINER] * len(targets):
                problems.append(f"line {number}: {' '.join(words)}")
            elif command in FIRST_TARGET and (
                    not targets or targets[0].split(":")[0] != EXPECTED_CONTAINER):
                problems.append(f"line {number}: {' '.join(words)}")
        self.assertEqual(problems, [], f"{DEPLOY_SCRIPT} changes a container, network or volume "
                                       f"other than `{EXPECTED_CONTAINER}`, or makes a container "
                                       "outside Compose")


if __name__ == "__main__":
    unittest.main()
