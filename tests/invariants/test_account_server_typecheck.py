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
  - `.github/workflows/deploy.yml`: the workflow ships no files to the server. It is written in
    a plain YAML subset and holds only the keys the deployment needs, case counting — so no
    action or reusable workflow (`uses:`, whose doing is not in the repository to read). Its
    steps run in bash or sh and run only commands that work on the runner or, for `ssh` and
    `curl`, reach another host without sending it files: curl with no option that sends data
    and no `file:` URL; ssh in one shape only — options from a short list, the destination
    `$USER@$HOST` and one remote argument, each a variable the workflow's `env` sets from the
    secrets `DEPLOY_USER`, `DEPLOY_HOST`, `DEPLOY_PORT` and from `github.sha`, no other
    variable, alone at the top of the step, its input untouched or `</dev/null`, no pipe or
    redirection on its line. Input redirections, heredocs and here-strings, process
    substitution and base64 encoding are refused anywhere in a step, and so are ANSI-C and
    locale quoting and a backslash ending a line without whitespace before it (every rule reads
    a step with its backslash-newlines removed, as bash removes them); a step names a variable
    the workflow's `env` sets only as `$NAME` or `${NAME}`, and `printf` and `local` take no
    option, so nothing in a step can overwrite what ssh sends. Anything outside this
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
# `curl`, reach another host without sending it files. A command, builtin or construct outside
# the list fails the check — `eval`, `source`, `.`, `bash -c`, `sh -c`, `env`, `xargs` and any
# program not named here among them — since the check cannot tell that it sends nothing; adding
# one is a change of this check. `trap` is read through its action, which must pass the same rules.
WORKFLOW_COMMANDS = ("set", "umask", "printf", "echo", "base64", "chmod", "mkdir", "rm",
                     "test", "[", "[[", "exit", "return", "sleep", "local", "true", "false", ":",
                     "for", "case", "ssh", "curl")
TRAP = "trap"
WORKFLOW_SHELLS = ("bash", "sh")
# Variables that make the shell or the runner run something else, as YAML `env` keys or as
# assignments in a step.
RUN_CHANGING_VARIABLES = ("BASH_ENV", "ENV", "PATH", "LD_PRELOAD", "LD_LIBRARY_PATH",
                          "PROMPT_COMMAND", "SHELLOPTS", "BASHOPTS", "IFS")
RUN_CHANGING_ASSIGNMENT = re.compile(r"(?<![\w$])(?:" + "|".join(RUN_CHANGING_VARIABLES)
                                     + r")\+?=")
# Text of a step that reaches past its commands: files that change later steps' environment or
# PATH, bash's network pseudo-files, and expressions GitHub puts into the script before it runs.
RUN_FORBIDDEN_TEXT = (
    (re.compile(r"GITHUB_ENV|GITHUB_PATH"), "writes the environment or PATH of later steps"),
    (re.compile(r"/dev/(?:tcp|udp)/"), "opens a network connection through a redirection"),
    (re.compile(r"\$\{\{"), "holds a GitHub expression, put into the script before it runs"),
)
# Constructs outside quotes that feed a command or run one where the command reader does not
# look: heredocs and here-strings, and process substitution.
RUN_FORBIDDEN_CONSTRUCTS = (
    (re.compile(r"<<"), "feeds a command through a heredoc or here-string"),
    (re.compile(r"[<>]\("), "runs a command through process substitution"),
)
# Options with which curl sends data or a file, or takes its options from a file.
CURL_SENDING = re.compile(r"^(?:--upload-file|--data(?:-[\w-]+)?|--form(?:-[\w-]+)?|--json|"
                          r"--config|--request|--url-query)(?:=.*)?$")
CURL_SENDING_SHORT = set("TdFKX")
# The one shape of an ssh call: options only from these, the destination `$USER@$HOST` and one
# remote argument, each a variable the step's `env` sets to the value named here, and its input
# untouched or `</dev/null`. No other variable may stand in its arguments.
SSH_VALUE_OPTIONS = ("-i", "-p", "-o")
SSH_LITERAL_OPTIONS = re.compile(r"StrictHostKeyChecking=yes|BatchMode=yes|IdentitiesOnly=yes|"
                                 r"LogLevel=(?:QUIET|FATAL|ERROR|INFO|VERBOSE)|"
                                 r"ConnectTimeout=\d+|ServerAliveInterval=\d+|"
                                 r"ServerAliveCountMax=\d+")
SSH_PATH_OPTIONS = ("UserKnownHostsFile",)
SSH_PORT_VALUE = "${{secrets.DEPLOY_PORT}}"
SSH_USER_VALUE = "${{secrets.DEPLOY_USER}}"
SSH_HOST_VALUE = "${{secrets.DEPLOY_HOST}}"
SSH_COMMIT_VALUE = "${{github.sha}}"
SSH_STDIN_NONE = "</dev/null"
# A path on the runner's temporary directory, the only value a path variable of ssh may hold.
RUNNER_PATH = re.compile(r"\$\{?RUNNER_TEMP\}?/[\w.-]+")
SHELL_VARIABLE = re.compile(r"\$(?:([A-Za-z_]\w*)|\{([A-Za-z_]\w*)\})")
# Keys a workflow may hold, by the key above them; any other key fails, case counting.
WORKFLOW_KEYS = {
    None: ("name", "on", "concurrency", "permissions", "env", "jobs"),
    "on": ("push",),
    "push": ("branches",),
    "concurrency": ("group", "cancel-in-progress"),
}
JOB_KEYS = ("name", "runs-on", "timeout-minutes", "env", "steps")
STEP_KEYS = ("name", "env", "run", "shell", "timeout-minutes")
ENV_NAME = re.compile(r"[A-Z_][A-Z0-9_]*")
JOB_NAME = re.compile(r"[A-Za-z_][A-Za-z0-9_-]*")
TRAP_DEPTH = 2


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


def outside_single_quotes(code):
    """A line of shell code with the text inside single quotes (outside double quotes) blanked;
    double-quoted text stays, since `$(...)` and the like run inside it."""
    result, quote, index = [], None, 0
    while index < len(code):
        char = code[index]
        if quote == "'":
            if char == "'":
                quote = None
            result.append(char if quote is None else " ")
        elif quote == '"':
            if char == "\\":
                result.append(code[index:index + 2])
                index += 2
                continue
            if char == '"':
                quote = None
            result.append(char)
        else:
            if char == "\\":
                result.append(code[index:index + 2])
                index += 2
                continue
            if char in "\"'":
                quote = char
            result.append(char)
        index += 1
    return "".join(result)


def curl_sends(word):
    if CURL_SENDING.match(word) or "file:" in word.lower():
        return True
    if word.startswith("-") and not word.startswith("--"):
        letters = re.match(r"-([A-Za-z]*)", word).group(1)
        return bool(set(letters) & CURL_SENDING_SHORT)
    return False


def variable(word):
    found = SHELL_VARIABLE.fullmatch(word)
    return (found.group(1) or found.group(2)) if found else None


def compact(value):
    return re.sub(r"\s+", "", value)


def bare_names(code, name):
    """How many times a line of shell code names a variable other than as the expansion `$NAME`
    or `${NAME}`: an assignment, `printf -v`, `read`, `for`, `local`, `unset`, a function or a
    nameref given the name, or an expansion that may assign (`${NAME:=…}`)."""
    count = 0
    for found in re.finditer(r"(?<![A-Za-z0-9_])" + re.escape(name) + r"(?![A-Za-z0-9_])", code):
        start, end = found.start(), found.end()
        if code[start - 1:start] == "$" and code[start - 2:start] != "\\$":
            continue
        if code[start - 2:start] == "${" and code[end:end + 1] == "}":
            continue
        count += 1
    return count


def ssh_shape(words, env, paths):
    """What in the words after `ssh` leaves the one allowed shape."""
    def holds(word, value):
        return env.get(variable(word)) == {value}

    def path(word):
        return variable(word) in paths or bool(RUNNER_PATH.fullmatch(word))

    index = 0
    while index < len(words) and words[index].startswith("-"):
        option = words[index]
        value = words[index + 1] if index + 1 < len(words) else ""
        name, _, setting = value.partition("=")
        if option == "-i" and path(value) or option == "-p" and holds(value, SSH_PORT_VALUE) or \
                option == "-o" and (SSH_LITERAL_OPTIONS.fullmatch(value)
                                    or name in SSH_PATH_OPTIONS and path(setting)):
            index += 2
            continue
        return [f"the option `{option} {value}` is not one of the allowed shape"]
    rest = words[index:]
    if len(rest) != 2:
        return [f"{len(rest)} words after the options, not a destination and one argument: {rest}"]
    problems = []
    destination = re.fullmatch(SHELL_VARIABLE.pattern + "@" + SHELL_VARIABLE.pattern, rest[0])
    if not destination or env.get(destination.group(1) or destination.group(2)) != \
            {SSH_USER_VALUE} or env.get(destination.group(3) or destination.group(4)) != \
            {SSH_HOST_VALUE}:
        problems.append(f"the destination `{rest[0]}` is not the user and host from the secrets")
    if not holds(rest[1], SSH_COMMIT_VALUE):
        problems.append(f"the remote argument `{rest[1]}` is not the variable holding github.sha")
    return problems


def merged_lines(script):
    """The logical lines of a step, a line ending in `|`, `||` or `&&` joined to the next."""
    merged = []
    for number, code in support._logical_lines(script):
        if merged and re.search(r"(?:\|\|?|&&)\s*$", merged[-1][1]):
            merged[-1] = (merged[-1][0], merged[-1][1] + " " + code)
        else:
            merged.append((number, code))
    return merged


def outside_quotes(code):
    """A line of shell code with all quoted text blanked."""
    blanked = outside_single_quotes(code)
    return re.sub(r'"(?:[^"\\]|\\.)*"', lambda m: '"' + " " * (len(m.group(0)) - 2) + '"',
                  blanked)


def ssh_lines(script):
    """[(line, problem)] of what in the lines of a step that run ssh lets something reach ssh's
    input: ssh not first
    on its line or nested in a group, loop, condition or function, a pipe, any redirection but
    `</dev/null`."""
    problems = []
    depth, cases = 0, 0
    for number, code in merged_lines(script):
        outer, _inner = support._command_substitutions(code)
        tokens = support._tokens(outer, number)
        if "ssh" in tokens:
            bare = outside_quotes(outer).replace(SSH_STDIN_NONE, "")
            if tokens[0] != "ssh" or depth:
                problems.append((number, f"ssh is not a command of its own at the top of the "
                                         f"step: {code.strip()}"))
            if re.search(r"(?<!\|)\|(?!\|)|[<>]", bare):
                problems.append((number, f"ssh's line holds a pipe or a redirection: "
                                         f"{code.strip()}"))
        for token in tokens:
            if token == "case":
                cases += 1
            elif token == "esac":
                cases = max(0, cases - 1)
            elif token in ("{", "(", "do", "then"):
                depth += 1
            elif token in ("}", "done", "fi") or token == ")" and not cases:
                depth = max(0, depth - 1)
    return problems


def joined_continuations(script, first_line):
    """(the text of a step with each backslash-newline removed, as bash removes it, the lines it
    joined followed by as many empty lines so that line numbers stay; the problems found): a
    backslash ending a line without whitespace before it, or after another backslash, which can
    split or hide a word, is refused."""
    problems, lines, pending, joined = [], [], "", 0
    for number, raw in enumerate(script.split("\n"), 1):
        trailing = len(raw) - len(raw.rstrip("\\"))
        if trailing > 1 or trailing == 1 and raw[-2:-1] not in (" ", "\t"):
            problems.append(f"line {first_line + number - 1}: a backslash ends the line without "
                            f"whitespace before it, which can split a word: {raw.strip()}")
        if trailing % 2 == 1:
            pending += raw[:-1]
            joined += 1
            continue
        lines.append(pending + raw)
        lines += [""] * joined
        pending, joined = "", 0
    if pending:
        lines.append(pending)
        lines += [""] * (joined - 1)
    return "\n".join(lines), problems


def run_shipping(script, first_line, env, depth=0):
    """What in the text of a `run:` step (its first line at `first_line` of the workflow, its
    variables from the workflow's `env` in `env`) could ship files or run what this check does
    not read. Every rule reads the step with its backslash-newlines removed first."""
    script, problems = joined_continuations(script, first_line)
    for number, raw in enumerate(script.split("\n"), 1):
        if re.search(r"\$['\"]", outside_single_quotes(raw)):
            problems.append(f"line {first_line + number - 1}: the step uses ANSI-C or locale "
                            f"quoting (`$'…'`, `$\"…\"`), which can hide a word: {raw.strip()}")
    for pattern, what in RUN_FORBIDDEN_TEXT:
        if pattern.search(script):
            problems.append(f"line {first_line}: the step {what}")
    if RUN_CHANGING_ASSIGNMENT.search(script):
        problems.append(f"line {first_line}: the step sets a variable that changes what runs")
    logical = support._logical_lines(script)
    for line, code in logical:
        where = f"line {first_line + line - 1}"
        for name in sorted(env):
            if bare_names(code, name):
                problems.append(f"{where}: the step names `{name}`, set by the workflow's env, "
                                f"other than as `${name}` or `${{{name}}}`: {code.strip()}")
        for pattern, what in RUN_FORBIDDEN_CONSTRUCTS:
            if pattern.search(outside_single_quotes(code)):
                problems.append(f"{where}: the step {what}: {code.strip()}")
        if "<" in outside_single_quotes(code).replace(SSH_STDIN_NONE, ""):
            problems.append(f"{where}: the step redirects a command's input: {code.strip()}")
    paths = set()
    for name in {m.group(1) for _l, c in logical
                 for m in re.finditer(r"(?<![\w$])([A-Za-z_]\w*)=", c)}:
        assigned = [c for _l, c in logical if bare_names(RUNNER_PATH.sub("", c), name)]
        if len(assigned) == 1 and bare_names(RUNNER_PATH.sub("", assigned[0]), name) == 1 and \
                re.fullmatch(r"\s*" + name + r"=\"?" + RUNNER_PATH.pattern + r"\"?\s*",
                             assigned[0]):
            paths.add(name)
    problems += [f"line {first_line + n - 1}: {m}" for n, m in ssh_lines(script)]
    functions = support.shell_functions(script)
    for line, words in support.shell_commands(script):
        where = f"line {first_line + line - 1}"
        name = words[0]
        if name == TRAP:
            actions = [w for w in words[1:] if not w.startswith("-")][:1]
            if depth >= TRAP_DEPTH:
                problems.append(f"{where}: a trap inside a trap: {' '.join(words)}")
            for action in actions:
                problems += run_shipping(action, first_line + line - 1, env, depth + 1)
        elif name not in WORKFLOW_COMMANDS and name not in functions:
            problems.append(f"{where}: command `{name}` is not one this check reads as "
                            f"sending nothing: {' '.join(words)}")
        elif name == "curl" and any(curl_sends(w) for w in words[1:]):
            problems.append(f"{where}: curl sends data or reads a file: {' '.join(words)}")
        elif name in ("printf", "local") and any(w.startswith("-") for w in words[1:2] + [
                w for w in words[1:] if name == "local"]):
            problems.append(f"{where}: `{name}` with an option, which can set a variable by "
                            f"name: {' '.join(words)}")
        elif name == "base64" and not ({"-d", "--decode"} & set(words[1:]) and all(
                w.startswith("-") for w in words[1:])):
            problems.append(f"{where}: base64 reads a file or encodes: {' '.join(words)}")
        elif name == "ssh":
            problems += [f"{where}: ssh: {p}" for p in ssh_shape(words[1:], env, paths)]
    return problems


def key_allowed(path, key):
    parent = path[-1] if path else None
    if parent == "env":
        return bool(ENV_NAME.fullmatch(key))
    if parent == "jobs":
        return bool(JOB_NAME.fullmatch(key))
    if len(path) >= 2 and path[-2] == "jobs":
        return key in JOB_KEYS
    if parent == "steps":
        return key in STEP_KEYS
    return key in WORKFLOW_KEYS.get(parent, ())


def workflow_shipping(text):
    """What in a workflow could ship files or images to another host. The workflow must be in the
    plain YAML subset `support.strict_workflow` reads, or that reader fails. Then: any key that
    is not one of the keys the workflow needs (`uses:` among them — an action does what the
    repository does not show), compared with case; a `shell:` other than bash or sh; an `env`
    key that changes what runs; and in each `run:` step what `run_shipping` finds."""
    entries = support.strict_workflow(text)
    problems = [f"line {n}: key `{k}` under {'/'.join(p) or 'the top'} is not one this check "
                f"allows" for n, p, k, _v in entries if not key_allowed(p, k)]
    problems += [f"line {n}: uses: {v}" for n, _k, v in support.workflow_keys(text, ("uses",))]
    problems += [f"line {n}: shell: {v}" for n, _k, v in support.workflow_keys(text, ("shell",))
                 if v.strip() not in WORKFLOW_SHELLS]
    problems += [f"line {n}: {k} is set" for n, k, _v in
                 support.workflow_keys(text, RUN_CHANGING_VARIABLES)]
    env = {}
    for _n, path, key, value in entries:
        if path and path[-1] == "env":
            env.setdefault(key, set()).add(compact(support._unquote(value)))
    for number, _key, script in support.workflow_keys(text, ("run",)):
        problems += run_shipping(script, number, env)
    return problems


def workflow_problems(text):
    """workflow_shipping, with a workflow the reader refuses reported as a problem."""
    try:
        return workflow_shipping(text)
    except AssertionError as error:
        return [f"not read: {error}"]


# A made-up workflow that ships nothing, and steps each of which ships files.
SAFE_WORKFLOW = """on:
  push:
    branches: [main]
jobs:
  deploy:
    runs-on: ubuntu-24.04
    steps:
      - name: Deploy
        env:
          SHA: ${{ github.sha }}
          HOST: ${{ secrets.DEPLOY_HOST }}
          PORT: ${{ secrets.DEPLOY_PORT }}
          LOGIN: ${{ secrets.DEPLOY_USER }}
          KEY: ${{ secrets.DEPLOY_SSH_KEY }}
        run: |
          set -euo pipefail
          key="$RUNNER_TEMP/key"
          trap 'rm -f "$key"' EXIT
          printf '%s' "$KEY" | base64 -d > "$key"
          ssh -i "$key" -p "$PORT" -o BatchMode=yes "$LOGIN@$HOST" "$SHA" </dev/null
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
    "      - \"uses\": appleboy/scp-action@v0.1.7\n        with:\n          source: dist\n",
    "      - { name: Copy, uses: appleboy/scp-action@v0.1.7, with: { source: dist } }\n",
    "      - run: |\n          trap 'scp dist.tgz \"$USER@$HOST:/srv/loop2/\"' EXIT\n",
    "      - run: |\n          echo \"BASH_ENV=$RUNNER_TEMP/x\" >> \"$GITHUB_ENV\"\n",
    "      - run: |\n          diff <(scp dist \"$USER@$HOST:/srv/\") /dev/null\n",
    "      - run: |\n          curl -sS \"$URL\" -o /dev/null <<< \"$(base64 dist.tgz)\"\n",
    "      - run: |\n          printf '%s' x > /dev/tcp/example.org/80\n",
    "      - run: |\n          eval \"scp dist host:\"\n",
    "      - run: |\n          bash -c 'scp dist host:'\n",
    "      - run: ${{ format('scp {0} host:', 'dist') }}\n",
    "      - run: |\n          ssh host \"$(base64 -w0 dist.tgz)\"\n",
    "      - uses: &copy appleboy/scp-action@v0.1.7\n",
    "    env:\n      PATH: /tmp/bin\n",
    "      - Uses: appleboy/scp-action@v0.1.7\n",
    "      - with:\n          source: dist\n",
    "      - run: |\n          ssh -p \"$PORT\" \"$LOGIN@$HOST\" \"$SHA\" 0<dist.tgz\n",
    "      - run: |\n          printf '%s' x |\n"
    "          ssh -p \"$PORT\" \"$LOGIN@$HOST\" \"$SHA\"\n",
    "      - run: |\n          data=\"$(base64 -w0 dist.tgz)\"\n"
    "          ssh -p \"$PORT\" \"$LOGIN@$HOST\" \"$data\"\n",
    "      - run: |\n          printf '%s' x | {\n"
    "          ssh -p \"$PORT\" \"$LOGIN@$HOST\" \"$SHA\"\n          }\n",
    "      - run: |\n          ssh -p \"$PORT\" \"$LOGIN@$HOST\" \"$SHA\" \"$KEY\"\n",
    "      - run: |\n          curl -sS -o /dev/null \"file:///etc/hosts\"\n",
    "      - run: |\n          printf -v SHA '%s' \"$(curl -sS \"$URL\")\"\n",
    "      - run: |\n          for SHA in \"$(curl -sS \"$URL\")\"; do\n          ssh -p \"$PORT\""
    " \"$LOGIN@$HOST\" \"$SHA\"\n          done\n",
    "      - run: |\n          SHA() { :; }\n",
    "      - run: |\n          f() {\n            local -n target=S\"\"HA\n"
    "            target=\"$(curl -sS \"$URL\")\"\n          }\n          f\n",
    "      - run: |\n          : \"${SHA:=$(curl -sS \"$URL\")}\"\n",
    "      - run: |\n          for S\\\n          HA in \"$(curl -sS \"$URL\")\"; do :; done\n",
    "      - run: |\n          printf $'\\x2dv' SHA '%s' \"$(curl -sS \"$URL\")\"\n",
    "      - run: |\n          printf $\"-v\" SHA '%s' x\n",
    "      - run: |\n          echo \"GITHUB_\\\n          ENV\"\n",
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
        problems = workflow_problems(text)
        self.assertEqual(problems, [], f"{WORKFLOW} can ship files or images to the server, or "
                                       "is written in a form this check does not read")

    def test_workflow_reader_refuses_file_copying_steps(self):
        # invariant: account-server-typecheck/1
        self.assertEqual(workflow_problems(SAFE_WORKFLOW), [])
        for step in SHIPPING_STEPS:
            with self.subTest(step=step):
                self.assertNotEqual(workflow_problems(SAFE_WORKFLOW + step), [],
                                    "a step that ships files passes")

    def test_no_other_deployment_route(self):
        # invariant: account-server-typecheck/1
        others = [p for p in support.deployment_route_files() if p not in ROUTE_FILES]
        self.assertEqual(others, [], "deployment files exist that this check does not read; "
                                     "extend it to show their route runs the type check first")


if __name__ == "__main__":
    unittest.main()
