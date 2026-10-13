"""Invariant loop2-host-sharing/1: A deployment of loop2 stops, removes, replaces or reconfigures
no container, image, network or volume on the host other than loop2's own, and the loop2 Compose
service asks the host for no privilege that a default container lacks.

The check reads the server-side script `deploy/loop2-deploy` and `compose.yaml` as they stand and
runs nothing; no Docker is needed.

Reading of the sentence:
- a deployment: what `deploy/loop2-deploy` runs. It talks to the host's own Docker only: no
  `docker` global option before the subcommand (`--context`, `-H`/`--host`, `--config`, `-c`,
  `-l`, `--tls…` and any other) and no variable that points Docker or Compose elsewhere
  (`DOCKER_HOST`, `DOCKER_CONTEXT`, `DOCKER_CONFIG`, `DOCKER_TLS_VERIFY`, `DOCKER_CERT_PATH`,
  `COMPOSE_PROJECT_NAME`, `COMPOSE_FILE`, `COMPOSE_PROFILES`);
- stops, removes, replaces or reconfigures nothing but loop2's own: every `docker compose` command
  names the project `loop2` and nothing but `-p`/`--project-name` and `-f`/`--file` before its
  subcommand, with any Compose file under `/srv/loop2/`; no command takes a project down; nothing
  names the old loop instance except a read-only `docker inspect` or `docker ps` of it; no
  host-wide prune, and no image removed but by an image prune carrying the filter
  `label=org.opencontainers.image.title=loop2`; no state-changing command on a container other
  than `loop2`, none on a network or volume, and no container made outside Compose
  (`docker run`, `docker create`). A function that wraps `docker … "$@"` is read at each call;
- asks the host for no privilege a default container lacks: `compose.yaml` holds at its top only
  `name` and `services`; its service sets only keys that grant nothing beyond a default
  container (`container_name`, `build`, `ports`, `expose`, `mem_limit`, `memswap_limit`, `cpus`,
  `pids_limit`, `restart`, `init`, `healthcheck`, `labels`, `environment`, `command`,
  `entrypoint`, `user`, `working_dir`, `read_only`, `stop_signal`, `stop_grace_period`,
  `logging`, `depends_on`), so `privileged`, `cap_add`, `security_opt`, `devices`,
  `device_cgroup_rules`, `pid`/`ipc`/`uts`/`network_mode`/`userns_mode`/`cgroup` set to `host`,
  `sysctls`, `volumes` and any key not listed fail; its `build` sets only `context`,
  `dockerfile`, `args`, `labels` and `target` (no `network: host`, `privileged` or
  `entitlements`); and no line names the Docker socket.

Does NOT cover: what really runs on the server (the check runs nothing there); a command the
script builds at run time out of values it does not assign on a line of its own; a command run
through a function that wraps another function, or through `eval`; the image's own content.

The shell reader these tests rest on is checked on made-up scripts below, by tests that cite no
invariant: they guard the reader, not the sentence. A file this check reads that does not exist
makes its test fail.
"""

import re
import unittest

import loop2_invariant_support as support

COMPOSE_FILE = "compose.yaml"
DEPLOY_SCRIPT = "deploy/loop2-deploy"

EXPECTED_PROJECT = "loop2"
EXPECTED_CONTAINER = "loop2"
EXPECTED_CHECKOUT = "/srv/loop2/"
EXPECTED_PRUNE_FILTER = "label=org.opencontainers.image.title=loop2"

# A word of a command that names the old loop instance: its container or project `loop`, a
# Compose name `loop-…` or `loop_…`, or a path in its directory `/srv/loop`.
OLD_NAME_WORD = re.compile(r"^(?:loop|loop[-_].*|.*/srv/loop(?:/.*)?)$")
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
COMPOSE_OPTIONS = ("-p", "--project-name", "-f", "--file")
DOCKER_ENDPOINT_VARIABLES = re.compile(
    r"(?<![A-Za-z0-9_])(?:DOCKER_HOST|DOCKER_CONTEXT|DOCKER_CONFIG|DOCKER_TLS_VERIFY|"
    r"DOCKER_CERT_PATH|COMPOSE_PROJECT_NAME|COMPOSE_FILE|COMPOSE_PROFILES)(?![A-Za-z0-9_])")
COMPOSE_TOP_KEYS = ("name", "services")
COMPOSE_SERVICE_KEYS = ("container_name", "build", "ports", "expose", "mem_limit",
                        "memswap_limit", "cpus", "pids_limit", "restart", "init", "healthcheck",
                        "labels", "environment", "command", "entrypoint", "user", "working_dir",
                        "read_only", "stop_signal", "stop_grace_period", "logging", "depends_on")
COMPOSE_BUILD_KEYS = ("context", "dockerfile", "args", "labels", "target")


def plain_words(words):
    """The words of a command less its options; the value of an option given as a word of its
    own stays."""
    return [w for w in words if not w.startswith("-")]


def code_lines(text):
    """The lines of a YAML file, each less its comment, a comment line left empty so that the
    numbers of the lines stay."""
    return ["" if line.lstrip().startswith("#") else support._strip_comment(line)
            for line in text.splitlines()]


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
    "#!/usr/bin/env bash\nout=$(docker compose --project-name loop2 down\n)\n",
)
# Redirections: a descriptor against its operator is left out, a number standing apart stays.
READER_REDIRECTIONS = """#!/usr/bin/env bash
docker stop --time 10 >/dev/null loop2 2>&1
docker logs --tail 5 loop2 9>>lock
"""
READER_REDIRECTIONS_EXPECTED = [
    (2, ["stop", "--time", "10", "loop2"]),
    (3, ["logs", "--tail", "5", "loop2"]),
]


class ShellReaderReadsTheWholeScript(unittest.TestCase):
    """Checks of the shell reader on made-up scripts; they cite no invariant."""

    def test_shell_reader_reads_past_comments_quotes_and_heredocs(self):
        self.assertEqual(support.docker_commands(READER_SCRIPT), READER_EXPECTED)

    def test_shell_reader_keeps_words_beside_redirections(self):
        self.assertEqual(support.docker_commands(READER_REDIRECTIONS),
                         READER_REDIRECTIONS_EXPECTED)

    def test_shell_reader_fails_on_what_it_cannot_read(self):
        for script in READER_UNREADABLE:
            with self.subTest(script=script):
                with self.assertRaises(AssertionError):
                    support.docker_commands(script)


class DeployScriptActsOnLoop2Alone(unittest.TestCase):

    def setUp(self):
        self.text = support.read_required(DEPLOY_SCRIPT)
        self.docker = support.docker_commands(self.text)

    def test_script_runs_docker_compose(self):
        # invariant: loop2-host-sharing/1
        compose = [words for _n, words in self.docker if words[:1] == ["compose"]]
        self.assertTrue(compose, f"{DEPLOY_SCRIPT} runs no `docker compose` command, so the "
                                 "commands this check reads cannot be found")

    def test_every_compose_command_names_the_loop2_project(self):
        # invariant: loop2-host-sharing/1
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
        # invariant: loop2-host-sharing/1
        found = [f"line {number}: {' '.join(words)}"
                 for number, words in support.shell_commands(self.text) if "down" in words]
        self.assertEqual(found, [], f"{DEPLOY_SCRIPT} takes a Compose project down")

    def test_old_deployment_is_only_read(self):
        # invariant: loop2-host-sharing/1
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
        # invariant: loop2-host-sharing/1
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
        # invariant: loop2-host-sharing/1
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

    def test_docker_takes_no_global_option(self):
        # invariant: loop2-host-sharing/1
        found = [f"line {number}: docker {' '.join(words)}" for number, words in self.docker
                 if words and words[0].startswith("-")]
        self.assertEqual(found, [], f"{DEPLOY_SCRIPT} gives `docker` a global option, which can "
                                    "point it at another Docker or configuration")

    def test_compose_takes_only_project_and_file_options(self):
        # invariant: loop2-host-sharing/1
        problems = []
        for number, words in self.docker:
            if words[:1] != ["compose"]:
                continue
            options, _subcommand, _rest = support.compose_parts(words[1:])
            problems += [f"line {number}: `{o}`: {' '.join(words)}" for o in options
                         if o not in COMPOSE_OPTIONS]
        self.assertEqual(problems, [], f"{DEPLOY_SCRIPT} gives `docker compose` an option other "
                                       f"than {COMPOSE_OPTIONS} before its subcommand")

    def test_no_variable_points_docker_elsewhere(self):
        # invariant: loop2-host-sharing/1
        found = [f"line {number}: {code.strip()}" for number, code in
                 support._logical_lines(self.text) if DOCKER_ENDPOINT_VARIABLES.search(code)]
        self.assertEqual(found, [], f"{DEPLOY_SCRIPT} names a variable that points Docker or "
                                    "Compose at another endpoint, configuration or project")


class ComposeServiceAsksNoPrivilege(unittest.TestCase):

    def setUp(self):
        self.text = support.read_required(COMPOSE_FILE)
        self.top, self.services = support.compose_outline(self.text)

    def test_compose_top_holds_only_name_and_services(self):
        # invariant: loop2-host-sharing/1
        others = sorted(k for k in self.top if k not in COMPOSE_TOP_KEYS)
        self.assertEqual(others, [], f"{COMPOSE_FILE} sets top-level keys beyond "
                                     f"{COMPOSE_TOP_KEYS}")

    def test_service_sets_only_keys_that_grant_nothing(self):
        # invariant: loop2-host-sharing/1
        self.assertTrue(self.services, f"{COMPOSE_FILE} defines no service")
        problems = []
        for name, keys in self.services.items():
            problems += [f"service `{name}` sets `{k}` {keys[k]!r}" for k in keys
                         if k not in COMPOSE_SERVICE_KEYS]
            if "build" in keys and keys["build"].block:
                build = support._yaml_mapping(keys["build"].block, keys["build"].line + 1)
                problems += [f"service `{name}` build sets `{k}` {build[k]!r}" for k in build
                             if k not in COMPOSE_BUILD_KEYS]
        self.assertEqual(problems, [], f"{COMPOSE_FILE} asks the host for more than a default "
                                       "container has")

    def test_no_docker_socket(self):
        # invariant: loop2-host-sharing/1
        found = [f"line {number}: {line.strip()}"
                 for number, line in enumerate(code_lines(self.text), 1) if "docker.sock" in line]
        self.assertEqual(found, [], f"{COMPOSE_FILE} names the Docker socket")


if __name__ == "__main__":
    unittest.main()
