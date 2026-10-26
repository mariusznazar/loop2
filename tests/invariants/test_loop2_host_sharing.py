"""Invariant loop2-host-sharing: A deployment of loop2 stops, removes, replaces or reconfigures
no container, image, network or volume on the host other than loop2's own, and neither Compose
service asks for extra host privilege apart from the connector's read-only tunnel token grant.

The check reads the server-side script `deploy/loop2-deploy` and `compose.yaml` as they stand and
runs nothing; no Docker is needed.

Reading of the sentence:
- a deployment: what `deploy/loop2-deploy` runs. It talks to the host's own Docker only: no
  `docker` global option before the subcommand (`--context`, `-H`/`--host`, `--config`, `-c`,
  `-l`, `--tls…` and any other) and no variable that points Docker or Compose elsewhere
  (`DOCKER_HOST`, `DOCKER_CONTEXT`, `DOCKER_CONFIG`, `DOCKER_TLS_VERIFY`, `DOCKER_CERT_PATH`,
  `COMPOSE_PROJECT_NAME`, `COMPOSE_FILE`, `COMPOSE_PROFILES`);
- stops, removes, replaces or reconfigures nothing but loop2's own: every Docker command the
  script runs is on a list of what a deployment may run, with the options and objects each may
  name, and any other command, alias, option or object fails. The list: `docker info` (only
  `--format`); `docker inspect --type container` or `docker container inspect` of the container
  `loop2` or, read only, `loop`; `docker logs` of `loop2` (`--tail`, `--timestamps`);
  `docker image prune` with the filter `label=org.opencontainers.image.title=loop2` (and only
  `dangling=true` beside it); `docker compose` with only `-p`/`--project-name loop2` and
  `-f`/`--file` under `/srv/loop2/` before its subcommand, the subcommands `build`, `up`,
  `logs` and `ps` with their listed options, and no object but `app` or `cloudflared`. The only exec allowance is the fixed
  bounded Node HTTP probe inside `loop2`, with no user or privilege override. Commands are
  matched after the management forms `container inspect` and `container logs` are read as
  `inspect` and `logs`; aliases (`image remove`, `container remove`, `rmi`), `tag`, `down`,
  `run`, `create` and every other command are not on the list. Nothing outside Docker names
  the old loop instance but such a read-only `inspect`. A function that wraps
  `docker … "$@"` is read at each call;
- asks the host for no privilege a default container lacks: `compose.yaml` holds at its top only
  `name`, `services` and the exact tunnel file-backed `secrets` definition; its service sets only keys that grant nothing beyond a default
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
OLD_CONTAINER = "loop"
EXPECTED_SERVICES = ("app", "cloudflared")
EXPECTED_SECRET = "cloudflare_tunnel_token"
EXPECTED_SECRET_FILE = "/etc/loop2/cloudflared-token"
INTERNAL_PROBE = 'Promise.all(["/", "/api/loop2-deploy-probe"].map(async path => { const r = await fetch("http://127.0.0.1:3000" + path, { redirect: "manual", signal: AbortSignal.timeout(10000) }); return r.status + " " + (r.headers.get("content-type") || ""); })).then(rows => { console.log(rows.join("\\n")); process.exit(0); }, () => process.exit(1));'
# The Docker commands a deployment may run, by their normalised name (management forms such as
# `container inspect` and `container logs` read as `inspect` and `logs`): for each, the options it
# may take — those taking a value as the next word mapped to True — and the objects it may name.
# Any other command, alias, option or object fails.
ALLOWED_DOCKER = {
    "info": ({"--format": True, "-f": True}, ()),
    "inspect": ({"--type": True, "--format": True, "-f": True},
                (EXPECTED_CONTAINER, "loop2-cloudflared", OLD_CONTAINER)),
    "logs": ({"--tail": True, "-n": True, "--timestamps": False, "-t": False},
             (EXPECTED_CONTAINER, "loop2-cloudflared")),
    "image prune": ({"--force": False, "-f": False, "--all": False, "-a": False,
                     "--filter": True}, ()),
}
# `docker container <x>` forms read as the top-level command they equal.
CONTAINER_FORMS = {"inspect": "inspect", "logs": "logs"}
INSPECT_TYPE = "container"
PRUNE_FILTERS = (EXPECTED_PRUNE_FILTER, "dangling=true")
# `docker compose`: options before the subcommand, and per subcommand its options (value-taking
# ones mapped to True); every other word must name one of the two loop2 services.
COMPOSE_GLOBAL = {"-p": True, "--project-name": True, "-f": True, "--file": True}
ALLOWED_COMPOSE = {
    "build": {"--pull": False, "--no-cache": False, "--quiet": False, "-q": False},
    "up": {"-d": False, "--detach": False, "--no-build": False, "--no-deps": False,
           "--remove-orphans": False, "--wait": False, "--wait-timeout": True,
           "--force-recreate": False},
    "logs": {"--no-color": False, "--tail": True, "-n": True, "--timestamps": False,
             "-t": False},
    "ps": {"--all": False, "-a": False, "--format": True, "--quiet": False, "-q": False},
}
DOCKER_ENDPOINT_VARIABLES = re.compile(
    r"(?<![A-Za-z0-9_])(?:DOCKER_HOST|DOCKER_CONTEXT|DOCKER_CONFIG|DOCKER_TLS_VERIFY|"
    r"DOCKER_CERT_PATH|COMPOSE_PROJECT_NAME|COMPOSE_FILE|COMPOSE_PROFILES)(?![A-Za-z0-9_])")
COMPOSE_TOP_KEYS = ("name", "services", "secrets")
COMPOSE_SERVICE_KEYS = ("container_name", "build", "ports", "expose", "mem_limit",
                        "memswap_limit", "cpus", "pids_limit", "restart", "init", "healthcheck",
                        "labels", "environment", "command", "entrypoint", "user", "working_dir",
                        "read_only", "stop_signal", "stop_grace_period", "logging", "depends_on", "secrets")
COMPOSE_BUILD_KEYS = ("context", "dockerfile", "args", "labels", "target")


def plain_words(words):
    """The words of a command less its options; the value of an option given as a word of its
    own stays."""
    return [w for w in words if not w.startswith("-")]


def split_options(words, allowed):
    """(problems, {option: [values]}, objects) of the words after a subcommand, against the
    options `allowed` maps to whether they take a value."""
    problems, options, objects, index = [], {}, [], 0
    while index < len(words):
        word = words[index]
        index += 1
        if not word.startswith("-") or word == "-":
            objects.append(word)
            continue
        name, equals, value = word.partition("=")
        if name not in allowed:
            problems.append(f"option `{word}`")
            continue
        if allowed[name] and not equals:
            if index >= len(words):
                problems.append(f"option `{word}` without its value")
                break
            value = words[index]
            index += 1
        elif not allowed[name] and equals:
            problems.append(f"option `{word}` takes no value")
        options.setdefault(name, []).append(value)
    return problems, options, objects


def docker_problems(words):
    """What in one Docker command (the words after `docker`) a deployment may not run."""
    if not words or words[0].startswith("-"):
        return [f"a global option or no subcommand: {words[:1]}"]
    if words[0] == "exec":
        if words == ["exec", EXPECTED_CONTAINER, "node", "-e", INTERNAL_PROBE]:
            return []
        return ["exec is not the fixed internal application probe"]
    if words[0] == "compose":
        return compose_problems(words[1:])
    if words[0] == "container" and len(words) > 1 and words[1] in CONTAINER_FORMS:
        name, rest = CONTAINER_FORMS[words[1]], words[2:]
        container_form = True
    elif words[0] == "image" and len(words) > 1:
        name, rest, container_form = "image " + words[1], words[2:], False
    else:
        name, rest, container_form = words[0], words[1:], False
    if name not in ALLOWED_DOCKER:
        return [f"`docker {' '.join(words[:2])}` is not a command a deployment may run"]
    allowed, objects_allowed = ALLOWED_DOCKER[name]
    problems, options, objects = split_options(rest, allowed)
    problems += [f"object `{o}` is not one `{name}` may name" for o in objects
                 if o not in objects_allowed]
    if name == "inspect" and not container_form and options.get("--type") != [INSPECT_TYPE]:
        problems.append(f"`inspect` without `--type {INSPECT_TYPE}`")
    if name == "inspect" and len(objects) != 1:
        problems.append(f"`inspect` names {len(objects)} objects, not one")
    if name == "image prune":
        filters = options.get("--filter", [])
        if EXPECTED_PRUNE_FILTER not in filters or any(f not in PRUNE_FILTERS for f in filters):
            problems.append(f"`image prune` filters {filters}, not `{EXPECTED_PRUNE_FILTER}`")
    return problems


def compose_problems(words):
    """What in one `docker compose` command (the words after `compose`) a deployment may not
    run."""
    problems, index, globals_ = [], 0, {}
    while index < len(words) and words[index].startswith("-"):
        name, equals, value = words[index].partition("=")
        if name not in COMPOSE_GLOBAL:
            return [f"compose option `{words[index]}` before the subcommand"]
        if not equals:
            index += 1
            value = words[index] if index < len(words) else ""
        globals_.setdefault(name, []).append(value)
        index += 1
    projects = globals_.get("-p", []) + globals_.get("--project-name", [])
    if projects != [EXPECTED_PROJECT]:
        problems.append(f"compose project {projects}, not `{EXPECTED_PROJECT}`")
    for compose_file in globals_.get("-f", []) + globals_.get("--file", []):
        if not compose_file.startswith(EXPECTED_CHECKOUT):
            problems.append(f"Compose file `{compose_file}` outside `{EXPECTED_CHECKOUT}`")
    if index >= len(words) or words[index] not in ALLOWED_COMPOSE:
        return problems + [f"compose subcommand {words[index:index + 1]} is not one a "
                           f"deployment may run"]
    subcommand = words[index]
    found, _options, objects = split_options(words[index + 1:], ALLOWED_COMPOSE[subcommand])
    problems += [f"compose {subcommand}: {p}" for p in found]
    problems += [f"compose {subcommand}: object `{o}` is not a loop2 service"
                 for o in objects if o not in EXPECTED_SERVICES]
    return problems


def secret_problems(top, services):
    """Permit exactly one file-backed secret and its connector-only short-form grant."""
    problems = []
    secret_key = top.get("secrets")
    if secret_key is None or secret_key.value:
        return ["no block mapping of the tunnel secret"]
    definitions = support._yaml_mapping(secret_key.block, secret_key.line + 1)
    if set(definitions) != {EXPECTED_SECRET}:
        return ["secrets must define only the tunnel token"]
    definition = definitions[EXPECTED_SECRET]
    if definition.value:
        return ["tunnel secret is not a block mapping"]
    fields = support._yaml_mapping(definition.block, definition.line + 1)
    if set(fields) != {"file"}:
        problems.append("tunnel secret must use only a file source")
    elif fields["file"].value != EXPECTED_SECRET_FILE or fields["file"].block:
        problems.append("tunnel secret names another host source")
    for name, keys in services.items():
        grant = keys.get("secrets")
        if name == "cloudflared":
            if grant is None or grant.value or [line.strip() for line in grant.block
                                               if line.strip()] != ["- " + EXPECTED_SECRET]:
                problems.append("connector must receive only the named short-form secret")
            for key in ("environment", "env_file", "entrypoint", "user"):
                if key in keys:
                    problems.append(f"connector overrides its credential or identity with {key}")
        elif grant is not None:
            problems.append(f"secret granted to {name}, not only the connector")
    return problems


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
        # invariant: loop2-host-sharing
        compose = [words for _n, words in self.docker if words[:1] == ["compose"]]
        self.assertTrue(compose, f"{DEPLOY_SCRIPT} runs no `docker compose` command, so the "
                                 "commands this check reads cannot be found")

    def test_every_compose_command_names_the_loop2_project(self):
        # invariant: loop2-host-sharing
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
        # invariant: loop2-host-sharing
        found = [f"line {number}: {' '.join(words)}"
                 for number, words in support.shell_commands(self.text) if "down" in words]
        self.assertEqual(found, [], f"{DEPLOY_SCRIPT} takes a Compose project down")

    def test_old_deployment_is_only_read(self):
        # invariant: loop2-host-sharing
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
                plain_words(d)[:1] in (["inspect"], ["ps"]) and set(named) <= set(d)
                and not docker_problems(d) for d in docker_lines.get(number, []))
            if not read_only:
                problems.append(f"line {number}: {' '.join(words)}")
        self.assertEqual(problems, [], f"{DEPLOY_SCRIPT} names the old loop deployment outside a "
                                       "read-only `docker inspect` or `docker ps`")

    def test_every_docker_command_is_one_a_deployment_may_run(self):
        # invariant: loop2-host-sharing
        problems = [f"line {number}: docker {' '.join(words)}: {p}"
                    for number, words in self.docker for p in docker_problems(words)]
        self.assertEqual(problems, [], f"{DEPLOY_SCRIPT} runs a Docker command, option or object "
                                       "outside the list a deployment may run")

    def test_no_variable_points_docker_elsewhere(self):
        # invariant: loop2-host-sharing
        found = [f"line {number}: {code.strip()}" for number, code in
                 support._logical_lines(self.text) if DOCKER_ENDPOINT_VARIABLES.search(code)]
        self.assertEqual(found, [], f"{DEPLOY_SCRIPT} names a variable that points Docker or "
                                    "Compose at another endpoint, configuration or project")


class ComposeServiceAsksNoPrivilege(unittest.TestCase):

    def setUp(self):
        self.text = support.read_required(COMPOSE_FILE)
        self.top, self.services = support.compose_outline(self.text)

    def test_compose_top_holds_only_project_services_and_tunnel_secret(self):
        # invariant: loop2-host-sharing
        others = sorted(k for k in self.top if k not in COMPOSE_TOP_KEYS)
        self.assertEqual(others, [], f"{COMPOSE_FILE} sets top-level keys beyond "
                                     f"{COMPOSE_TOP_KEYS}")

    def test_service_sets_only_keys_that_grant_nothing(self):
        # invariant: loop2-host-sharing
        self.assertEqual(set(self.services), set(EXPECTED_SERVICES))
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

    def test_token_file_is_granted_only_to_the_connector(self):
        # invariant: loop2-host-sharing
        self.assertEqual(secret_problems(self.top, self.services), [])

    def test_no_docker_socket(self):
        # invariant: loop2-host-sharing
        found = [f"line {number}: {line.strip()}"
                 for number, line in enumerate(code_lines(self.text), 1) if "docker.sock" in line]
        self.assertEqual(found, [], f"{COMPOSE_FILE} names the Docker socket")


class NarrowAllowances(unittest.TestCase):

    def test_exec_refuses_other_targets_programs_and_privileges(self):
        approved = ["exec", "loop2", "node", "-e", INTERNAL_PROBE]
        self.assertEqual(docker_problems(approved), [])
        cases = [
            ["exec", "loop", "node", "-e", INTERNAL_PROBE],
            ["exec", "--privileged", "loop2", "node", "-e", INTERNAL_PROBE],
            ["exec", "-u", "root", "loop2", "node", "-e", INTERNAL_PROBE],
            ["exec", "loop2", "sh", "-c", "id"],
            ["exec", "loop2", "node", "-e", "require('fs').writeFileSync('/tmp/x', '')"],
        ]
        for command in cases:
            with self.subTest(command=command):
                self.assertTrue(docker_problems(command))

    def test_secret_reader_refuses_other_files_grants_sources_and_options(self):
        approved = ("name: loop2\nservices:\n  app:\n    build: .\n  cloudflared:\n"
                    "    secrets:\n      - cloudflare_tunnel_token\nsecrets:\n"
                    "  cloudflare_tunnel_token:\n    file: /etc/loop2/cloudflared-token\n")
        self.assertEqual(secret_problems(*support.compose_outline(approved)), [])
        cases = {
            "other host file": approved.replace("/etc/loop2/cloudflared-token", "/etc/shadow"),
            "environment source": approved.replace("file: /etc/loop2/cloudflared-token",
                                                    "environment: TUNNEL_TOKEN"),
            "external source": approved.replace("file: /etc/loop2/cloudflared-token",
                                                 "external: true"),
            "additional source field": approved + "    name: shared-secret\n",
            "application grant": approved.replace("    build: .", "    secrets:\n"
                                                   "      - cloudflare_tunnel_token"),
            "another grant": approved.replace("- cloudflare_tunnel_token", "- other"),
            "root connector": approved.replace("  cloudflared:\n", "  cloudflared:\n"
                                                 "    user: root\n"),
        }
        for name, document in cases.items():
            with self.subTest(case=name):
                self.assertTrue(secret_problems(*support.compose_outline(document)))


if __name__ == "__main__":
    unittest.main()
