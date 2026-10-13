"""Invariant account-server-typecheck/1: The account and save server's TypeScript types are
checked before deployment.

The sentence is about a check, so the check feeds it input made up for it (WAY-61): in a
temporary copy of the working tree, a type error written out below is appended to every
TypeScript file of the server's source (`src/server`, as README.md places it), and the product's
own commands are run on the copy. The real tree is never written. The route a deployment takes is
then read from the repository's deployment files, which are run nowhere.

Covers:
- `npm run typecheck` passes on the unchanged copy and fails once the server's source holds the
  type error;
- `npm run build` — the command that produces what `npm start` runs — passes on the unchanged
  copy, and with the type error fails and leaves no `dist/server/main.js` to start;
- the serving image exists only after `npm run typecheck` succeeded, read from the four files of
  the deployment route:
  - `Dockerfile`: a RUN of a stage the last (runtime) stage cannot be built without runs
    `npm run typecheck` as a command of its own, joined to the rest of the RUN only by `&&` — no
    `;`, `||`, `|` or `&` that would let the RUN go on after a failed type check — and the last
    stage takes `dist/` with `COPY --from` of a stage that cannot be built without that RUN;
  - `compose.yaml`: every service is built (`build:`, from the repository's `Dockerfile`) and
    names no `image:` that Compose could pull or reuse instead;
  - `deploy/loop2-deploy`: in the order the script runs its commands — its top-level flow,
    each call of a function it defines read as that function's body — the first
    `docker compose … build` or `up` is a `build` and an `up` follows; every `up` carries
    `--no-build`, and no command brings an image in by
    another way (`docker pull`, `load`, `import`, `tag`, `compose pull`, `create`, `run`, `start`,
    `restart`);
  - `.github/workflows/deploy.yml`: the workflow ships no files to the server. Its steps use no
    action and no reusable workflow (`uses:` — what an action does is not in the repository to
    read), run in bash or sh, and run only commands that work on the runner or, for `ssh` and
    `curl`, reach another host without sending it files: curl with no option that sends data,
    ssh with nothing fed through its input and no local command. A command outside that list
    fails the check, since the check cannot tell it sends nothing;
- the repository holds no deployment route file other than those four.

Does NOT cover: a deployment defined outside this repository; that the script stops before `up`
when the build fails (the script's own tests read that: whatever it does, the image `up` starts
is one Compose built from the Dockerfile, and so one whose build ran the type check). A file that
only pins a Node.js version (.nvmrc, .node-version, .tool-versions) deploys nothing and does not
count as a route.

A route file this check reads that does not exist makes its test fail: until the deployment
files are written, this is the check's failing test.
"""

import os
import re
import unittest

import loop2_invariant_support as support

# The made-up input: a value of the wrong type under TypeScript's strict checking.
DELIBERATE_TYPE_ERROR = (
    "\n// Appended by the invariant check account-server-typecheck/1.\n"
    "const invariantCheckDeliberateTypeError: number = \"not a number\";\n"
    "void invariantCheckDeliberateTypeError;\n"
)
SERVER_SOURCE = "src/server"
SERVER_ENTRY_BUILT = "dist/server/main.js"

DOCKERFILE = "Dockerfile"
COMPOSE_FILE = "compose.yaml"
WORKFLOW = ".github/workflows/deploy.yml"
DEPLOY_SCRIPT = "deploy/loop2-deploy"
ROUTE_FILES = (DOCKERFILE, COMPOSE_FILE, WORKFLOW, DEPLOY_SCRIPT)

TYPECHECK_COMMAND = ["npm", "run", "typecheck"]
BUILT_OUTPUT = "dist"
# Shell operators after which a RUN goes on although a command before them failed.
UNSAFE_OPERATORS = re.compile(r";|\|\||(?<![&|])\|(?!\|)|(?<![&>])&(?![&>])")
# Docker commands that bring an image in other than by building it.
IMAGE_IMPORTS = (("pull",), ("load",), ("import",), ("tag",), ("image", "pull"),
                 ("image", "load"), ("image", "import"), ("image", "tag"))
# The workflow's steps may run only these commands: they work on the runner or, for `ssh` and
# `curl`, reach another host without sending it files. A command outside the list fails the
# check, since the check cannot tell that it sends nothing; adding one is a change of this check.
WORKFLOW_COMMANDS = ("set", "umask", "trap", "printf", "echo", "base64", "chmod", "mkdir", "rm",
                     "test", "[", "[[", "exit", "return", "sleep", "local", "true", "false", ":",
                     "for", "case", "ssh", "curl")
WORKFLOW_SHELLS = ("bash", "sh")
# Options with which curl sends data or a file, or takes its options from a file.
CURL_SENDING = re.compile(r"^(?:--upload-file|--data(?:-[\w-]+)?|--form(?:-[\w-]+)?|--json|"
                          r"--config|--request|--url-query)(?:=.*)?$")
CURL_SENDING_SHORT = set("TdFKX")
# Options with which ssh runs a local command or reads a configuration file.
SSH_LOCAL = re.compile(r"(?i)(?:ProxyCommand|LocalCommand|PermitLocalCommand|KnownHostsCommand)")
# ssh fed through a pipe, a redirection or a heredoc.
SSH_STDIN = (
    re.compile(r"\|\s*ssh(?![\w.-])"),
    re.compile(r"(?<![\w./-])ssh(?![\w.-])[^\n]*?(?:<<|(?<![<\d])<(?![<(]))"),
)


def append_type_error(copy):
    targets = [p for p in support.files_under(SERVER_SOURCE, copy.path)
               if p.endswith((".ts", ".mts", ".cts")) and not p.endswith(".d.ts")]
    if not targets:
        raise AssertionError(f"{SERVER_SOURCE} holds no TypeScript file")
    for relative in targets:
        with open(copy.file(relative), "a", encoding="utf-8", newline="\n") as handle:
            handle.write(DELIBERATE_TYPE_ERROR)
    return targets


class ServerTypesCheckedBeforeDeployment(unittest.TestCase):

    def setUp(self):
        self.copies = []

    def tearDown(self):
        for copy in self.copies:
            copy.remove()

    def fresh_copy(self):
        copy = support.TreeCopy()
        self.copies.append(copy)
        return copy

    def test_typecheck_command_rejects_server_type_error(self):
        # invariant: account-server-typecheck/1
        clean = self.fresh_copy()
        code, output = clean.npm("run", "typecheck")
        self.assertEqual(code, 0, f"`npm run typecheck` fails on the unchanged tree:\n{output}")
        broken = self.fresh_copy()
        targets = append_type_error(broken)
        code, output = broken.npm("run", "typecheck")
        self.assertNotEqual(code, 0, f"`npm run typecheck` exits 0 although {targets} hold a "
                                     f"type error:\n{output}")

    def test_build_refuses_server_type_error(self):
        # invariant: account-server-typecheck/1
        clean = self.fresh_copy()
        code, output = clean.npm("run", "build")
        self.assertEqual(code, 0, f"`npm run build` fails on the unchanged tree:\n{output}")
        self.assertTrue(os.path.isfile(clean.file(SERVER_ENTRY_BUILT)),
                        f"`npm run build` on the unchanged tree leaves no {SERVER_ENTRY_BUILT}")
        broken = self.fresh_copy()
        targets = append_type_error(broken)
        code, output = broken.npm("run", "build")
        self.assertNotEqual(code, 0, f"`npm run build` exits 0 although {targets} hold a "
                                     f"type error:\n{output}")
        self.assertFalse(os.path.exists(broken.file(SERVER_ENTRY_BUILT)),
                         f"`npm run build` with a server type error still leaves "
                         f"{SERVER_ENTRY_BUILT} to start")


def typecheck_runs(stage):
    """The RUN instructions of a stage that run `npm run typecheck` as a command of their own, and
    those that run it in a form this check does not accept."""
    accepted, refused = [], []
    for keyword, arguments, heredoc in stage.instructions:
        if keyword != "RUN":
            continue
        command = support.exec_form(arguments)
        if command is not None:
            if command == TYPECHECK_COMMAND:
                accepted.append(arguments)
            elif "typecheck" in " ".join(command):
                refused.append(arguments)
            continue
        text = support.run_command(arguments) + ("\n" + heredoc if heredoc else "")
        if "typecheck" not in text:
            continue
        segments = [" ".join(part.split()) for part in text.split("&&")]
        if heredoc is None and not UNSAFE_OPERATORS.search(text) and \
                " ".join(TYPECHECK_COMMAND) in segments:
            accepted.append(arguments)
        else:
            refused.append(arguments)
    return accepted, refused


def takes_built_output(arguments):
    """The stage name a COPY or ADD of the built output names with --from, or None."""
    origin = re.search(r"--from=(\S+)", arguments)
    words = [w for w in arguments.split() if not w.startswith("--")]
    pattern = re.compile(r"^(?:\./)?(?:.*/)?" + BUILT_OUTPUT + r"(?:/.*)?$")
    if origin and any(pattern.match(w.strip("\"'[],")) for w in words[:-1]):
        return origin.group(1)
    return None


# A made-up script for the shell reader: a comment that looks like a heredoc opener must not hide
# the `up` after it.
READER_SCRIPT = """#!/usr/bin/env bash
# === constants <<< end
docker compose -p loop2 build app
# cat <<EOF
docker compose -p loop2 up -d app
"""
READER_EXPECTED = [
    (3, ["compose", "-p", "loop2", "build", "app"]),
    (5, ["compose", "-p", "loop2", "up", "-d", "app"]),
]


# A made-up script whose functions stand in one order and are called in the other: the reader
# must give the Docker commands in the order of the calls.
ORDER_SCRIPT = """#!/usr/bin/env bash
build_image() {
  docker compose -p loop2 build app
}
start_container() {
  if ! docker compose -p loop2 up -d --no-build app; then
    exit 8
  fi
}
main() {
  start_container
  build_image
}
main "$@"
"""
ORDER_EXPECTED = [
    (6, ["compose", "-p", "loop2", "up", "-d", "--no-build", "app"]),
    (3, ["compose", "-p", "loop2", "build", "app"]),
]


def workflow_shipping(text):
    """What in a workflow could ship files or images to another host: any `uses:` (an action, or
    a reusable workflow, does what the repository does not show), a `shell:` other than bash or
    sh, a command of a `run:` step outside WORKFLOW_COMMANDS and the functions that step defines,
    curl with an option that sends data, and ssh fed through its input or running a local
    command."""
    problems = [f"line {n}: uses: {v}" for n, _k, v in support.workflow_keys(text, ("uses",))]
    problems += [f"line {n}: shell: {v}" for n, _k, v in support.workflow_keys(text, ("shell",))
                 if v.split()[0] not in WORKFLOW_SHELLS]
    for number, _key, script in support.workflow_keys(text, ("run",)):
        functions = support.shell_functions(script)
        for line, words in support.shell_commands(script):
            where = f"line {number + line - 1}"
            name = words[0]
            if name not in WORKFLOW_COMMANDS and name not in functions:
                problems.append(f"{where}: command `{name}` is not one this check reads as "
                                f"sending nothing: {' '.join(words)}")
            elif name == "curl" and any(
                    CURL_SENDING.match(w) or re.fullmatch(r"-[A-Za-z]+", w)
                    and set(w[1:]) & CURL_SENDING_SHORT for w in words[1:]):
                problems.append(f"{where}: curl sends data: {' '.join(words)}")
            elif name == "ssh" and any(SSH_LOCAL.search(w) or w == "-F" for w in words[1:]):
                problems.append(f"{where}: ssh runs a local command: {' '.join(words)}")
        joined = re.sub(r"\\\n", " ", script)
        problems += [f"line {number}: ssh is fed files: {line.strip()}"
                     for line in joined.splitlines() if any(p.search(line) for p in SSH_STDIN)]
    return problems


# A made-up workflow that ships nothing, and steps each of which ships files.
SAFE_WORKFLOW = """on:
  push:
    branches: [main]
jobs:
  deploy:
    runs-on: ubuntu-24.04
    steps:
      - name: Deploy
        run: |
          set -euo pipefail
          printf '%s' "$KEY" | base64 -d > "$RUNNER_TEMP/key"
          ssh -i "$RUNNER_TEMP/key" -o BatchMode=yes "$USER@$HOST" "$SHA"
      - name: Probe
        run: |
          probe() {
            case "$2" in
              any) curl -sS -o /dev/null "$1" && return 0 ;;
              api-error) return 1 ;;
            esac
          }
          probe "$URL" any
"""
SHIPPING_STEPS = (
    "      - uses: appleboy/scp-action@v0.1.7\n        with:\n          source: dist\n",
    "      - uses: burnett01/rsync-deployments@7.0.1\n        with:\n          path: dist/\n",
    "      - uses: actions/checkout@v4\n",
    "      - run: rsync -az dist/ \"$USER@$HOST:/srv/loop2/\"\n",
    "      - run: scp -r dist \"$USER@$HOST:/srv/loop2/\"\n",
    "      - run: tar czf - dist | ssh \"$USER@$HOST\" tar xzf -\n",
    "      - run: curl -sST dist.tgz \"sftp://$HOST/srv/loop2/\"\n",
    "      - run: curl --upload-file dist.tgz \"https://$HOST/\"\n",
    "      - run: ssh -o ProxyCommand='scp dist host:' \"$USER@$HOST\" \"$SHA\"\n",
    "      - run: docker push ghcr.io/x/loop2\n",
    "      - shell: python {0}\n        run: print('a')\n",
)


class ServingImageBuiltOnlyAfterTypecheck(unittest.TestCase):

    def test_shell_reader_reads_past_heredoc_look_alikes(self):
        # invariant: account-server-typecheck/1
        self.assertEqual(support.docker_commands(READER_SCRIPT), READER_EXPECTED)

    def test_dockerfile_type_checks_before_the_runtime_stage_takes_dist(self):
        # invariant: account-server-typecheck/1
        stages = support.dockerfile_stages(support.read_required(DOCKERFILE))
        runtime = stages[-1]
        checking, refused = set(), []
        for stage in [runtime] + support.stage_dependencies(stages, runtime):
            accepted, bad = typecheck_runs(stage)
            refused += [f"{stage!r}: RUN {r}" for r in bad]
            if accepted:
                checking.add(stage.index)
        self.assertEqual(refused, [], f"{DOCKERFILE} runs the type check in a form whose failure "
                                      "need not stop the build")
        self.assertTrue(checking, f"no stage the last stage of {DOCKERFILE} is built from runs "
                                  f"`{' '.join(TYPECHECK_COMMAND)}`")
        sources = []
        for keyword, arguments, _heredoc in runtime.instructions:
            name = takes_built_output(arguments) if keyword in ("COPY", "ADD") else None
            source = support._stage_reference(stages, name, runtime.index) if name else None
            if source is not None:
                sources.append(source)
        self.assertTrue(sources, f"the last stage of {DOCKERFILE} takes no `{BUILT_OUTPUT}/` from "
                                 "an earlier stage")
        for source in sources:
            with self.subTest(source=repr(source)):
                upstream = [source] + support.stage_dependencies(stages, source)
                self.assertTrue(any(stage.index in checking for stage in upstream),
                                f"{source!r}, from which the last stage takes `{BUILT_OUTPUT}/`, "
                                "is built without a stage that runs the type check")

    def test_compose_builds_the_image_and_names_none_to_pull(self):
        # invariant: account-server-typecheck/1
        _top, services = support.compose_outline(support.read_required(COMPOSE_FILE))
        self.assertTrue(services, f"{COMPOSE_FILE} defines no service")
        for name, keys in services.items():
            with self.subTest(service=name):
                self.assertNotIn("image", keys, f"service `{name}` names an image to pull")
                self.assertIn("build", keys, f"service `{name}` is not built")
                build = support.block_text(keys["build"])
                files = re.findall(r"^\s*dockerfile\s*:\s*[\"']?([^\"'\s]+)", build, re.MULTILINE)
                self.assertTrue(all(f in (DOCKERFILE, "./" + DOCKERFILE) for f in files),
                                f"service `{name}` is built from {files}")
                self.assertNotRegex(build, re.compile(r"^\s*dockerfile_inline\s*:", re.MULTILINE),
                                    f"service `{name}` is built from an inline Dockerfile")

    def test_deploy_script_builds_before_starting_without_building(self):
        # invariant: account-server-typecheck/1
        text = support.read_required(DEPLOY_SCRIPT)
        builds, ups, problems = [], [], []
        for number, words in support.docker_commands(text):
            plain = tuple(w for w in words if not w.startswith("-"))
            if any(plain[:len(i)] == i for i in IMAGE_IMPORTS):
                problems.append(f"line {number}: {' '.join(words)}")
            if words[:1] != ["compose"]:
                continue
            _options, subcommand, rest = support.compose_parts(words[1:])
            if subcommand == "build":
                builds.append(number)
            elif subcommand == "up":
                ups.append(number)
                if "--no-build" not in rest:
                    problems.append(f"line {number}: `up` without `--no-build`: {' '.join(words)}")
            elif subcommand in ("pull", "create", "run", "start", "restart"):
                problems.append(f"line {number}: `compose {subcommand}`: {' '.join(words)}")
        self.assertTrue(builds, f"{DEPLOY_SCRIPT} holds no `docker compose ... build`")
        self.assertTrue(ups, f"{DEPLOY_SCRIPT} holds no `docker compose ... up`")
        self.assertEqual(problems, [], f"{DEPLOY_SCRIPT} can start an image it did not build")
        run = []
        for number, words in support.executed_docker_commands(text):
            if words[:1] == ["compose"]:
                subcommand = support.compose_parts(words[1:])[1]
                if subcommand in ("build", "up"):
                    run.append((subcommand, number))
        self.assertTrue(run, f"{DEPLOY_SCRIPT} runs no `docker compose ... build` or `up`")
        self.assertEqual(run[0][0], "build", f"{DEPLOY_SCRIPT} starts the service before it "
                                             f"builds it, in the order it runs: {run}")
        self.assertIn("up", [s for s, _n in run], f"{DEPLOY_SCRIPT} never runs its `up`: {run}")

    def test_shell_reader_follows_the_order_of_the_calls(self):
        # invariant: account-server-typecheck/1
        self.assertEqual(support.executed_docker_commands(ORDER_SCRIPT), ORDER_EXPECTED)

    def test_workflow_ships_no_files(self):
        # invariant: account-server-typecheck/1
        text = support.read_required(WORKFLOW)
        problems = workflow_shipping(text)
        self.assertEqual(problems, [], f"{WORKFLOW} can ship files or images to the server")

    def test_workflow_reader_refuses_file_copying_steps(self):
        # invariant: account-server-typecheck/1
        self.assertEqual(workflow_shipping(SAFE_WORKFLOW), [])
        for step in SHIPPING_STEPS:
            with self.subTest(step=step):
                self.assertNotEqual(workflow_shipping(SAFE_WORKFLOW + step), [],
                                    "a step that ships files passes")

    def test_no_other_deployment_route(self):
        # invariant: account-server-typecheck/1
        others = [p for p in support.deployment_route_files() if p not in ROUTE_FILES]
        self.assertEqual(others, [], "deployment files exist that this check does not read; "
                                     "extend it to show their route runs the type check first")


if __name__ == "__main__":
    unittest.main()
