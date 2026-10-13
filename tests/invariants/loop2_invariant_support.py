"""Shared support for loop2's invariant checks: the repository root, the product's own npm
commands run in a temporary copy of the working tree, the built server started on its port, and
the deployment files the repository holds, and readers that take those files apart.

Nothing here computes a value a check expects; the checks write their expected values out as
literals (WAY-69). This module only runs the product and hands its output back.
"""

import atexit
import fnmatch
import http.client
import json
import os
import re
import shutil
import shlex
import signal
import socket
import subprocess
import sys
import tempfile
import time

ROOT = os.path.abspath(os.path.join(os.path.dirname(__file__), "..", ".."))

# The address and port README.md gives for the started server.
HOST = "127.0.0.1"
PORT = 3000

COMMAND_TIMEOUT = 300  # seconds for one npm command (ci, build, typecheck)
START_TIMEOUT = 30     # seconds for the started server to accept a connection
HTTP_TIMEOUT = 10      # seconds for one HTTP request

# Paths of the working tree left out of a copy: the-way's own checkout and run records.
COPY_LEFT_OUT = (".the-way", ".runs")


def npm():
    path = shutil.which("npm")
    if path is None:
        raise AssertionError("npm is not on PATH; the product's commands cannot run")
    return path


def read_text(path):
    with open(path, encoding="utf-8", errors="replace") as handle:
        return handle.read()


def listed_files(root=ROOT):
    """Relative paths, with '/', of the files git tracks or would track in the working tree."""
    result = subprocess.run(
        ["git", "-C", root, "ls-files", "--cached", "--others", "--exclude-standard", "-z"],
        capture_output=True, timeout=60)
    if result.returncode != 0:
        raise AssertionError("git ls-files failed: " + result.stderr.decode("utf-8", "replace"))
    paths = [p for p in result.stdout.decode("utf-8", "surrogateescape").split("\0") if p]
    return [p for p in paths if os.path.isfile(os.path.join(root, p))]


def files_under(directory, root):
    """Relative paths, with '/', of every file below root/directory, read from disk."""
    found = []
    base = os.path.join(root, directory)
    for current, _dirs, files in os.walk(base):
        for name in files:
            found.append(os.path.relpath(os.path.join(current, name), root).replace(os.sep, "/"))
    return sorted(found)


# --- running commands -----------------------------------------------------------------------


def _windows_descendants(root_pid, since):
    """Process ids below root_pid, created no earlier than `since` (seconds since the epoch, less
    a margin), found through each process's recorded parent id — which Windows keeps after the
    parent has exited, so a child that outlived npm is still found."""
    script = ("Get-CimInstance Win32_Process | ForEach-Object { '{0} {1} {2}' -f "
              "$_.ProcessId, $_.ParentProcessId, "
              "([DateTimeOffset]$_.CreationDate).ToUnixTimeMilliseconds() }")
    result = subprocess.run(["powershell", "-NoProfile", "-NonInteractive", "-Command", script],
                            capture_output=True, timeout=60)
    children = {}
    for line in result.stdout.decode("ascii", "replace").splitlines():
        parts = line.split()
        if len(parts) == 3 and all(p.lstrip("-").isdigit() for p in parts):
            pid, parent, created = (int(p) for p in parts)
            if created >= (since - 2) * 1000 and pid != parent:
                children.setdefault(parent, []).append(pid)
    found, queue = [], [root_pid]
    while queue:
        for child in children.get(queue.pop(), []):
            if child not in found:
                found.append(child)
                queue.append(child)
    return found


def kill_tree(process):
    """Kill a started process and everything it started, also when it has already exited and
    left a child running (npm exits; the node server it started may not)."""
    if os.name == "nt":
        since = getattr(process, "loop2_started", time.time())
        descendants = _windows_descendants(process.pid, since)
        for pid in [process.pid] * (process.poll() is None) + descendants:
            subprocess.run(["taskkill", "/PID", str(pid), "/T", "/F"],
                           stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL, timeout=60)
    else:
        try:
            os.killpg(process.pid, signal.SIGKILL)  # the whole session, alive parent or not
        except (ProcessLookupError, PermissionError):
            pass
    if process.poll() is None:
        try:
            process.wait(timeout=30)
        except subprocess.TimeoutExpired:
            process.kill()


def popen(args, cwd, env=None, stdout=subprocess.PIPE, stderr=subprocess.STDOUT):
    kwargs = {}
    if os.name != "nt":
        kwargs["start_new_session"] = True
    started = time.time()
    process = subprocess.Popen(args, cwd=cwd, env=env, stdin=subprocess.DEVNULL,
                               stdout=stdout, stderr=stderr, **kwargs)
    process.loop2_started = started
    return process


def run(args, cwd, timeout=COMMAND_TIMEOUT):
    """Run a command to its end; return (exit code, combined output). Kills it on timeout."""
    process = popen(args, cwd)
    try:
        output, _ = process.communicate(timeout=timeout)
    except subprocess.TimeoutExpired:
        kill_tree(process)
        raise AssertionError(f"{' '.join(args)} in {cwd} did not end within {timeout} s")
    finally:
        kill_tree(process)
    return process.returncode, output.decode("utf-8", "replace")


# --- a temporary copy of the working tree ---------------------------------------------------


def _link_directory(target, link):
    if os.name == "nt":
        import _winapi
        _winapi.CreateJunction(target, link)
    else:
        os.symlink(target, link, target_is_directory=True)


def _unlink_directory(link):
    if os.path.lexists(link):
        if os.name == "nt":
            os.rmdir(link)
        else:
            os.unlink(link)


class TreeCopy:
    """A copy, in a temporary directory, of the files git tracks or would track in the working
    tree, with the real node_modules linked in. The real tree is never written."""

    def __init__(self):
        self.path = tempfile.mkdtemp(prefix="loop2-invariant-")
        try:
            for relative in listed_files():
                if relative.split("/")[0] in COPY_LEFT_OUT:
                    continue
                destination = os.path.join(self.path, *relative.split("/"))
                os.makedirs(os.path.dirname(destination), exist_ok=True)
                shutil.copy2(os.path.join(ROOT, *relative.split("/")), destination)
            modules = os.path.join(ROOT, "node_modules")
            if not os.path.isdir(modules):
                raise AssertionError("node_modules is missing; run `npm ci` first")
            _link_directory(modules, os.path.join(self.path, "node_modules"))
        except BaseException:
            self.remove()
            raise

    def file(self, relative):
        return os.path.join(self.path, *relative.split("/"))

    def npm(self, *arguments, timeout=COMMAND_TIMEOUT):
        return run([npm(), *arguments], self.path, timeout=timeout)

    def remove(self):
        try:
            _unlink_directory(os.path.join(self.path, "node_modules"))
        finally:
            shutil.rmtree(self.path, ignore_errors=True)


_built = {}


def built_copy():
    """One copy per test run, built by `npm run build`; removed when the run ends."""
    if "error" in _built:
        raise AssertionError(_built["error"])
    if "copy" not in _built:
        copy = TreeCopy()
        atexit.register(copy.remove)
        code, output = copy.npm("run", "build")
        if code != 0:
            _built["error"] = f"`npm run build` exited {code}:\n{output}"
            raise AssertionError(_built["error"])
        _built["copy"] = copy
    return _built["copy"]


# --- the started server ---------------------------------------------------------------------


def port_in_use(host=HOST, port=PORT):
    with socket.socket(socket.AF_INET, socket.SOCK_STREAM) as probe:
        probe.settimeout(1)
        return probe.connect_ex((host, port)) == 0


class Server:
    """Start a built copy through `npm start` in its root. stdout and stderr go to files;
    stop() kills the whole process tree."""

    def __init__(self, copy, extra_env=None):
        if port_in_use():
            raise AssertionError(
                f"port {PORT} on {HOST} is already in use before the server starts; "
                "stop whatever holds it and run again")
        self.copy = copy
        env = dict(os.environ)
        env.update(extra_env or {})
        self.log_dir = tempfile.mkdtemp(prefix="loop2-server-log-")
        self.stdout_path = os.path.join(self.log_dir, "stdout.txt")
        self.stderr_path = os.path.join(self.log_dir, "stderr.txt")
        self._stdout = open(self.stdout_path, "wb")
        self._stderr = open(self.stderr_path, "wb")
        self.process = popen([npm(), "start"], copy.path, env=env,
                             stdout=self._stdout, stderr=self._stderr)
        try:
            deadline = time.monotonic() + START_TIMEOUT
            while True:
                if self.process.poll() is not None:
                    raise AssertionError(
                        f"`npm start` exited {self.process.returncode} before accepting "
                        f"connections:\n{self.output()}")
                if port_in_use():
                    break
                if time.monotonic() > deadline:
                    raise AssertionError(
                        f"`npm start` accepted no connection on {HOST}:{PORT} within "
                        f"{START_TIMEOUT} s:\n{self.output()}")
                time.sleep(0.2)
        except BaseException:
            self.stop(report_held_port=False)
            raise

    def output(self):
        self._stdout.flush()
        self._stderr.flush()
        return ("--- stdout ---\n" + read_text(self.stdout_path)
                + "\n--- stderr ---\n" + read_text(self.stderr_path))

    def stderr(self):
        self._stderr.flush()
        return read_text(self.stderr_path)

    def stop(self, report_held_port=True):
        try:
            kill_tree(self.process)
        finally:
            self._stdout.close()
            self._stderr.close()
            shutil.rmtree(self.log_dir, ignore_errors=True)
            deadline = time.monotonic() + 15
            while port_in_use() and time.monotonic() < deadline:
                time.sleep(0.2)
        if report_held_port and port_in_use():
            raise AssertionError(f"port {PORT} on {HOST} is still held 15 s after the server "
                                 "and everything it started were killed")


def request(method, path, headers=None, body=None):
    """(status, headers as a lower-cased dict, body bytes) of one request to the server."""
    connection = http.client.HTTPConnection(HOST, PORT, timeout=HTTP_TIMEOUT)
    try:
        connection.request(method, path, body=body, headers=headers or {})
        response = connection.getresponse()
        data = response.read()
        return response.status, {k.lower(): v for k, v in response.getheaders()}, data
    finally:
        connection.close()


# --- deployment files -----------------------------------------------------------------------

# Names of files that deploy or run the product somewhere other than a developer's machine,
# matched against a file's base name, or its path for the CI entries.
DEPLOYMENT_NAME_PATTERNS = (
    "Dockerfile", "Dockerfile.*", "*.Dockerfile", "*.dockerfile", "Containerfile",
    "Containerfile.*", "docker-compose*.yml", "docker-compose*.yaml", "compose*.yml",
    "compose*.yaml", ".nvmrc", ".node-version", ".tool-versions", "Procfile", "fly.toml",
    "render.yaml", "app.yaml", "vercel.json", "netlify.toml", "railway.json", "railway.toml",
    "nixpacks.toml", "heroku.yml", "app.json", ".gitlab-ci.yml", "azure-pipelines.yml",
    "bitbucket-pipelines.yml", "skaffold.yaml", "Chart.yaml",
)
DEPLOYMENT_PATH_PATTERNS = (
    ".github/workflows/*.yml", ".github/workflows/*.yaml", ".circleci/config.yml",
    "k8s/*", "kubernetes/*", "deploy/*", "deployment/*", "helm/*", "infra/*",
)


def deployment_files(root=ROOT):
    """Relative paths of the deployment files git tracks or would track in the working tree."""
    found = []
    for relative in listed_files(root):
        if relative.split("/")[0] in COPY_LEFT_OUT or relative.startswith("node_modules/"):
            continue
        base = relative.rsplit("/", 1)[-1]
        if any(fnmatch.fnmatchcase(base, p) for p in DEPLOYMENT_NAME_PATTERNS) or \
                any(fnmatch.fnmatchcase(relative, p) for p in DEPLOYMENT_PATH_PATTERNS):
            found.append(relative)
    return sorted(found)


# Files that pin a Node.js version but deploy nothing: the runtime check reads them, the
# typecheck check's deployment tripwire does not count them.
VERSION_PIN_NAMES = (".nvmrc", ".node-version", ".tool-versions")


def deployment_route_files(root=ROOT):
    """The deployment files, less the version-pin files: the routes a deployment can take."""
    return [p for p in deployment_files(root) if p.rsplit("/", 1)[-1] not in VERSION_PIN_NAMES]


# --- readers of the deployment files --------------------------------------------------------
#
# The readers below only take a deployment file apart into its instructions, keys or commands;
# what a check expects of them stands written out in the check. A form a reader cannot take apart
# is reported as unreadable, so that the check fails instead of passing on what it did not read.


def read_required(relative):
    """The text of a file of the working tree; an AssertionError when it does not exist."""
    path = os.path.join(ROOT, *relative.split("/"))
    if not os.path.isfile(path):
        raise AssertionError(f"{relative} does not exist in the working tree")
    return read_text(path)


def _strip_comment(line, marker="#"):
    """A line less a comment that begins outside quotes at a marker standing at the start of the
    line or after white space."""
    quote = None
    index = 0
    while index < len(line):
        char = line[index]
        if quote:
            if char == "\\" and quote == '"':
                index += 1
            elif char == quote:
                quote = None
        elif char in "\"'":
            quote = char
        elif char == marker and (index == 0 or line[index - 1] in " \t"):
            return line[:index].rstrip()
        index += 1
    return line.rstrip()


# Dockerfile ---------------------------------------------------------------------------------


class DockerStage:
    def __init__(self, index, base, name):
        self.index = index
        self.base = base
        self.name = name
        self.instructions = []   # (keyword in upper case, arguments, heredoc body or None)

    def __repr__(self):
        return f"stage {self.index} ({self.name or 'unnamed'}, FROM {self.base})"


def dockerfile_stages(text):
    """The stages of a Dockerfile, in order, each with its instructions; continuation lines
    joined, comment lines dropped, the body of a heredoc kept apart from its instruction."""
    lines = text.splitlines()
    stages = []
    index = 0
    while index < len(lines):
        line = lines[index]
        index += 1
        if not line.strip() or line.lstrip().startswith("#"):
            continue
        logical = line
        while logical.rstrip().endswith("\\") and index < len(lines):
            following = lines[index]
            index += 1
            if following.lstrip().startswith("#"):
                continue
            logical = logical.rstrip()[:-1] + " " + following.strip()
        keyword, _, arguments = logical.strip().partition(" ")
        keyword = keyword.upper()
        arguments = arguments.strip()
        heredoc = None
        delimiters = _shell_line(arguments)[2] if keyword in ("RUN", "COPY", "ADD") else []
        if delimiters:
            body = []
            for delimiter in delimiters:
                while index < len(lines) and lines[index].strip() != delimiter:
                    body.append(lines[index])
                    index += 1
                if index >= len(lines):
                    raise AssertionError(f"the heredoc `{delimiter}` of {logical.strip()!r} is "
                                         "never closed, so the Dockerfile cannot be read")
                index += 1
            heredoc = "\n".join(body)
        if keyword == "FROM":
            words = [w for w in arguments.split() if not w.startswith("--")]
            if not words:
                raise AssertionError(f"a FROM line without an image: {logical.strip()!r}")
            name = words[2].lower() if len(words) >= 3 and words[1].upper() == "AS" else None
            stages.append(DockerStage(len(stages), words[0], name))
            continue
        if not stages:
            if keyword == "ARG":
                continue
            raise AssertionError(f"an instruction before the first FROM: {logical.strip()!r}")
        stages[-1].instructions.append((keyword, arguments, heredoc))
    if not stages:
        raise AssertionError("the Dockerfile holds no FROM line")
    return stages


def _stage_reference(stages, reference, before):
    """The stage a FROM base, a COPY --from or a mount's from names, among the stages before
    index `before`; None when it names an image instead."""
    reference = reference.strip("\"'").lower()
    for stage in stages[:before]:
        if stage.name == reference or str(stage.index) == reference:
            return stage
    return None


def stage_dependencies(stages, stage):
    """The stages a stage cannot be built without: the stage it is built FROM, the stages it
    copies from or mounts from, and theirs, transitively."""
    found, queue = [], [stage]
    while queue:
        current = queue.pop()
        names = [current.base]
        for keyword, arguments, _heredoc in current.instructions:
            if keyword in ("COPY", "ADD"):
                names += re.findall(r"--from=(\S+)", arguments)
            if keyword == "RUN":
                names += re.findall(r"--mount=\S*?\bfrom=([^,\s]+)", arguments)
        for name in names:
            dependency = _stage_reference(stages, name, current.index)
            if dependency is not None and dependency not in found:
                found.append(dependency)
                queue.append(dependency)
    return found


def stage_chain(stages, stage):
    """A stage and the stages it is built FROM, nearest first."""
    chain = [stage]
    while True:
        base = _stage_reference(stages, chain[-1].base, chain[-1].index)
        if base is None or base in chain:
            return chain
        chain.append(base)


def exec_form(arguments):
    """The list an exec-form instruction gives, or None when it is in shell form."""
    try:
        value = json.loads(arguments)
    except ValueError:
        return None
    if isinstance(value, list) and all(isinstance(item, str) for item in value):
        return value
    return None


def run_command(arguments):
    """The command a RUN instruction runs, less its leading `--` options."""
    return re.sub(r"^(?:--\S+\s+)*", "", arguments.strip())


# Compose ------------------------------------------------------------------------------------


class ComposeKey:
    def __init__(self, value, block, line):
        self.value = value      # the scalar after the colon, unquoted, or "" when a block follows
        self.block = block      # the lines below the key, indented further
        self.line = line

    def __repr__(self):
        return f"line {self.line}: {self.value!r}"


def _unquote(value):
    value = value.strip()
    if len(value) >= 2 and value[0] == value[-1] and value[0] in "\"'":
        return value[1:-1]
    return value


def _yaml_mapping(lines, first_number):
    """The keys of a block-style YAML mapping whose lines are given, at their least indentation,
    as {key: ComposeKey}. Raises AssertionError for a form not read here."""
    meaningful = [(n, l) for n, l in enumerate(lines, start=first_number)
                  if l.strip() and not l.lstrip().startswith("#")]
    if not meaningful:
        return {}
    indent = min(len(l) - len(l.lstrip(" ")) for _n, l in meaningful)
    mapping = {}
    current = None
    for number, line in meaningful:
        if "\t" in line[:len(line) - len(line.lstrip())]:
            raise AssertionError(f"line {number}: a tab in the indentation")
        depth = len(line) - len(line.lstrip(" "))
        if depth == indent:
            if line.lstrip().startswith("- "):
                raise AssertionError(f"line {number}: a list where a mapping is read")
            found = re.match(r"^\s*(\"[^\"]*\"|'[^']*'|[^:#\s][^:#]*?)\s*:(?:\s+(.*))?$", line)
            if not found:
                raise AssertionError(f"line {number}: not a `key: value` line: {line.strip()!r}")
            key = _unquote(found.group(1))
            if key == "<<":
                raise AssertionError(f"line {number}: a YAML merge key, not read here")
            value = _strip_comment(found.group(2) or "")
            if value.startswith(("&", "*", "!")) or value.startswith(("{", "[")) and \
                    key == "services":
                raise AssertionError(f"line {number}: an anchor, alias, tag or flow mapping "
                                     f"under `{key}`, not read here")
            if key in mapping:
                raise AssertionError(f"line {number}: key `{key}` given twice")
            current = ComposeKey(_unquote(value), [], number)
            mapping[key] = current
        elif depth > indent and current is not None:
            current.block.append(line)
        else:
            raise AssertionError(f"line {number}: indentation not read here")
    return mapping


def compose_outline(text):
    """(top-level keys, {service name: its keys}) of a block-style Compose file."""
    lines = text.splitlines()
    if any(line.strip() == "---" for line in lines):
        raise AssertionError("a Compose file of several YAML documents, not read here")
    top = _yaml_mapping(lines, 1)
    services = {}
    if "services" in top:
        if top["services"].value:
            raise AssertionError("`services` is not a block mapping")
        for name, key in _yaml_mapping(top["services"].block, top["services"].line + 1).items():
            if key.value:
                raise AssertionError(f"service `{name}` is not a block mapping")
            services[name] = _yaml_mapping(key.block, key.line + 1)
    return top, services


def block_text(key):
    return "\n".join(_strip_comment(line) for line in key.block)


# Shell scripts ------------------------------------------------------------------------------

_ASSIGNMENT = re.compile(r"^\s*(?:(?:readonly|export|local|declare(?:\s+-\w+)*)\s+)?"
                         r"([A-Za-z_]\w*)=(\"[^\"$`]*\"|'[^']*'|[^\s\"'$`;|&()]*)\s*$")
_HEREDOC = re.compile(r"<<-?[ \t]*(?:'([^']+)'|\"([^\"]+)\"|\\?([A-Za-z_]\w*))")


def _shell_line(line, quote=None):
    """(the line less its comment, the quote still open at its end or None, the delimiters of the
    heredocs it opens), read as bash reads them: quotes, backslash escapes, a comment only where a
    word begins outside quotes, a heredoc only at `<<` outside quotes and comments (`<<<` is a
    here-string). `quote` is the quote left open by the line before."""
    delimiters = []
    index = 0
    while index < len(line):
        char = line[index]
        if quote == "'":
            if char == "'":
                quote = None
        elif quote == '"':
            if char == "\\":
                index += 1
            elif char == '"':
                quote = None
        elif char == "\\":
            index += 1
        elif char in "\"'":
            quote = char
        elif char == "#" and (index == 0 or line[index - 1] in " \t;|&("):
            return line[:index].rstrip(), None, delimiters
        elif line.startswith("<<<", index):
            index += 3
            continue
        elif line.startswith("<<", index):
            found = _HEREDOC.match(line, index)
            if found:
                delimiters.append(next(g for g in found.groups() if g))
                index = found.end()
                continue
            index += 2
            continue
        index += 1
    return line.rstrip(), quote, delimiters


def _logical_lines(text):
    """[(first line number, code)] of a shell script: comments left out, lines continued by a
    backslash joined, a quoted string spanning lines kept whole, heredoc bodies left out. A quote
    or heredoc never closed raises AssertionError, so that a check fails instead of passing on
    what it did not read."""
    lines = text.splitlines()
    logical = []
    index = 0
    while index < len(lines):
        number = index + 1
        if lines[index].startswith("#!") and index == 0:
            index += 1
            continue
        code, quote, delimiters = "", None, []
        while True:
            if index >= len(lines):
                raise AssertionError(f"line {number}: a quote opened here is never closed, so "
                                     "the script cannot be read")
            part, quote, found = _shell_line(lines[index], quote)
            index += 1
            delimiters += found
            if quote is not None:
                code += part + "\n"
                continue
            trailing = len(part) - len(part.rstrip("\\"))
            if trailing % 2 == 1 and index < len(lines):
                code += part[:-1]
                continue
            code += part
            break
        for delimiter in delimiters:
            while index < len(lines) and lines[index].strip() != delimiter:
                index += 1
            if index >= len(lines):
                raise AssertionError(f"line {number}: the heredoc `{delimiter}` opened here is "
                                     "never closed, so the script cannot be read")
            index += 1
        logical.append((number, code))
    return logical


def shell_assignments(text):
    """{name: value} of the variables a script assigns a fixed value on a line of its own —
    the first such value of each name; comments and heredoc bodies are not read."""
    values = {}
    for _number, code in _logical_lines(text):
        found = _ASSIGNMENT.match(code)
        if found and found.group(1) not in values:
            values[found.group(1)] = _unquote(found.group(2))
    return values


def _expand(text, values):
    def replace(match):
        name = match.group(1) or match.group(3)
        default = match.group(2)
        if name in values:
            return values[name]
        return default if default is not None else match.group(0)
    for _ in range(5):
        expanded = re.sub(r"\$\{([A-Za-z_]\w*)(?::?-([^}]*))?\}|\$([A-Za-z_]\w*)", replace, text)
        if expanded == text:
            break
        text = expanded
    return text


def _command_substitutions(line):
    """(the line with each `$(...)` and backquoted part replaced by a placeholder, the commands
    inside them), nested ones included."""
    inner = []
    result = []
    index = 0
    while index < len(line):
        if line.startswith("$(", index) and not line.startswith("$((", index):
            depth, cursor, quote = 1, index + 2, None
            while cursor < len(line) and depth:
                char = line[cursor]
                if quote:
                    if char == quote:
                        quote = None
                elif char in "\"'":
                    quote = char
                elif char == "(":
                    depth += 1
                elif char == ")":
                    depth -= 1
                cursor += 1
            if depth:
                raise AssertionError(f"a `$(` is not closed on its line, so the reader cannot "
                                     f"read it: {line!r}")
            body = line[index + 2:cursor - 1]
            replaced, nested = _command_substitutions(body)
            inner += [replaced] + nested
            result.append(" __SUBSTITUTION__ ")
            index = cursor
        elif line[index] == "`":
            end = line.find("`", index + 1)
            if end < 0:
                raise AssertionError(f"a backquote is not closed on its line, so the reader "
                                     f"cannot read it: {line!r}")
            replaced, nested = _command_substitutions(line[index + 1:end])
            inner += [replaced] + nested
            result.append(" __SUBSTITUTION__ ")
            index = end + 1
        else:
            result.append(line[index])
            index += 1
    return "".join(result), inner


SEPARATORS = (";", ";;", "&", "&&", "|", "||", "|&", "(", ")", "{", "}")
KEYWORDS = ("if", "then", "else", "elif", "fi", "do", "done", "while", "until", "!", "time",
            "{", "}", "exec", "command")


def _tokens(line, number):
    lexer = shlex.shlex(line, posix=True, punctuation_chars=";&|()<>")
    lexer.whitespace_split = True
    lexer.commenters = ""
    try:
        return list(lexer)
    except ValueError as error:
        raise AssertionError(f"line {number}: cannot be read ({error}): {line!r}")


def _drop_descriptors(line):
    """The line less each file descriptor number written against a redirection operator outside
    quotes (`2>&1`, `9>>file`); a number standing apart (`5 >file`) is a word and stays."""
    result = []
    quote = None
    index = 0
    while index < len(line):
        char = line[index]
        if quote == "'":
            if char == "'":
                quote = None
        elif quote == '"':
            if char == "\\":
                result.append(char)
                index += 1
                char = line[index] if index < len(line) else ""
            elif char == '"':
                quote = None
        elif char == "\\":
            result.append(char)
            index += 1
            char = line[index] if index < len(line) else ""
        elif char in "\"'":
            quote = char
        elif char.isdigit() and (index == 0 or line[index - 1] in " \t;|&("):
            end = index
            while end < len(line) and line[end].isdigit():
                end += 1
            if end < len(line) and line[end] in "<>":
                index = end
                continue
        result.append(char)
        index += 1
    return "".join(result)


def _is_redirection(token):
    return bool(token) and set(token) <= set("<>&") and bool(set(token) & set("<>"))


def shell_commands(text):
    """[(line number, words)] of every simple command a shell script holds, its own variables'
    fixed values put in, command substitutions read as commands of their own, and comments,
    heredoc bodies and redirections (with their targets) left out. The patterns of a `case`
    are left out; its header comes out as a command `case WORD in`. `[[ ]]` tests and the like
    come out as commands too; a check reads only the commands it looks for. What the reader
    cannot read raises AssertionError."""
    values = shell_assignments(text)
    commands = []
    outer_cases = []   # per open `case`: "pattern" while its patterns are read, else "body"
    for number, line in _logical_lines(text):
        outer, inner = _command_substitutions(_expand(line, values))
        for part in [outer] + inner:
            cases = outer_cases if part is outer else []
            words = []
            tokens = _tokens(_drop_descriptors(part), number) + [";"]
            position = 0
            while position < len(tokens):
                token = tokens[position]
                position += 1
                if cases and cases[-1] == "pattern":
                    if token == "esac":
                        cases.pop()
                    elif token == ")":
                        cases[-1] = "body"
                    continue
                if _is_redirection(token):
                    position += 1     # the target
                elif cases and token in (";;", ";&", ";;&"):
                    if words:
                        commands.append((number, words))
                    words = []
                    cases[-1] = "pattern"
                elif cases and not words and token == "esac":
                    cases.pop()
                elif words[:1] == ["case"] and len(words) == 2 and token == "in":
                    commands.append((number, words + [token]))
                    words = []
                    cases.append("pattern")
                elif token in SEPARATORS or token and set(token) <= set(";&|"):
                    if words:
                        commands.append((number, words))
                    words = []
                elif not words and (token in KEYWORDS
                                    or re.fullmatch(r"[A-Za-z_]\w*=.*", token, re.DOTALL)):
                    continue
                else:
                    words.append(token)
    return commands


# GitHub Actions workflow -------------------------------------------------------------------

_WORKFLOW_KEY = re.compile(r"^(\s*)(?:-\s+)?([A-Za-z_][\w-]*)\s*:(?:\s+(.*))?$")


_YAML_KEY = r"[A-Za-z_][A-Za-z0-9_.-]*"
_PLAIN_SCALAR = re.compile(r"[^\s{}\[\]&*!|>%@`'\",?#-][^#]*|-[^\s#][^#]*")
_FLOW_ITEM = re.compile(r"\s*(?:[A-Za-z0-9_.$/*-][A-Za-z0-9_.$/* -]*|\"[^\"]*\"|'[^']*')\s*")


def _workflow_scalar(value):
    """Whether a value on a key's line, or a sequence item, is one of the forms read here: a plain
    scalar, a closed quoted scalar, the empty mapping `{}`, or a flow sequence of plain or quoted
    scalars. Anything else — a flow mapping, a nested flow form, an anchor, an alias, a tag — is
    not."""
    value = value.strip()
    if value == "{}":
        return True
    if value.startswith("[") and value.endswith("]"):
        inner = value[1:-1]
        return not inner.strip() or all(_FLOW_ITEM.fullmatch(i) for i in inner.split(","))
    if len(value) >= 2 and value[0] == value[-1] == '"':
        return '"' not in value[1:-1].replace('\\"', "")
    if len(value) >= 2 and value[0] == value[-1] == "'":
        return "'" not in value[1:-1].replace("''", "")
    return bool(_PLAIN_SCALAR.fullmatch(value)) and ": " not in value


def strict_workflow(text):
    """Raise AssertionError, naming the line, unless a workflow is written in the plain YAML subset
    read here: unquoted keys, block mappings and sequences, literal block scalars (`|`, `|-`,
    `|+`), and on a key's line only the values `_workflow_scalar` accepts. A quoted key, a flow
    mapping, a nested flow form, an anchor, an alias, a tag, a folded scalar, a value continued
    on the lines below, a tab in the indentation or a second document is refused, so that no key
    can stand where the readers of this module do not look.

    Returns [(line number, the keys above it from the top, key, value)] of every key, the value
    being the scalar on its line, `|` for a literal block, or "" for a block below."""
    lines = text.splitlines()
    block = None   # the column of the key whose literal block is being skipped
    previous_key = None
    stack = []     # (column, key) of the keys above the current line
    entries = []
    for number, raw in enumerate(lines, 1):
        depth = len(raw) - len(raw.lstrip(" "))
        if block is not None:
            if not raw.strip() or depth > block:
                continue
            block = None
        if not raw.strip() or raw.lstrip().startswith("#"):
            continue
        if raw[depth:depth + 1] == "\t":
            raise AssertionError(f"workflow line {number}: a tab in the indentation")
        line = _strip_comment(raw)
        found = re.match(r"^( *)(- +)?(.*)$", line)
        indent, dash, rest = found.group(1), found.group(2) or "", found.group(3)
        key = re.fullmatch(rf"({_YAML_KEY}):(?: +(.*))?", rest)
        if key:
            value = (key.group(2) or "").strip()
            column = len(indent) + len(dash)
            while stack and stack[-1][0] >= column:
                stack.pop()
            entries.append((number, tuple(k for _c, k in stack), key.group(1), value))
            stack.append((column, key.group(1)))
            if re.fullmatch(r"\|[-+]?", value):
                block = len(indent) + len(dash)
            elif value and not _workflow_scalar(value):
                raise AssertionError(f"workflow line {number}: the value of `{key.group(1)}` is "
                                     f"not in the YAML subset read here: {raw.strip()!r}")
            previous_key = (len(indent) + len(dash), bool(value) and block is None)
        elif dash and rest and _workflow_scalar(rest) and ": " not in rest:
            previous_key = None
        else:
            raise AssertionError(f"workflow line {number}: not a line of the YAML subset read "
                                 f"here (unquoted keys, block mappings and sequences, literal "
                                 f"blocks): {raw.strip()!r}")
        if previous_key and previous_key[1] and number < len(lines):
            following = lines[number] if number < len(lines) else ""
            if following.strip() and not following.lstrip().startswith("#") and \
                    len(following) - len(following.lstrip(" ")) > previous_key[0] and \
                    not re.match(r"^ *(?:- +)?" + _YAML_KEY + r":(?: |$)", following):
                raise AssertionError(f"workflow line {number + 1}: a value continued on the "
                                     f"next line, not read here: {following.strip()!r}")
    return entries


def workflow_keys(text, names):
    """[(number of the line the value begins on, key, value)] of every key of a GitHub Actions
    workflow named in `names`, at any depth. A block scalar (`|`, `|-`, `|+`) gives its lines,
    less their common indentation;
    a plain or quoted value on the key's line gives that value. A folded scalar (`>`) or a value
    continued on the lines below raises AssertionError, as a form not read here."""
    strict_workflow(text)
    lines = text.splitlines()
    found = []
    block = None
    for index, line in enumerate(lines):
        if block is not None:
            if not line.strip() or len(line) - len(line.lstrip(" ")) > block:
                continue
            block = None
        if line.lstrip().startswith("#"):
            continue
        match = _WORKFLOW_KEY.match(line)
        if match and re.fullmatch(r"\|[-+]?", _strip_comment(match.group(3) or "")):
            block = line.index(match.group(2))
        if not match or match.group(2) not in names:
            continue
        column = line.index(match.group(2))
        value = _strip_comment(match.group(3) or "")
        following = []
        for later in lines[index + 1:]:
            if later.strip() and len(later) - len(later.lstrip(" ")) <= column:
                break
            following.append(later)
        while following and not following[-1].strip():
            following.pop()
        if re.fullmatch(r"\|[-+]?\d?", value):
            indent = min(len(l) - len(l.lstrip(" ")) for l in following if l.strip()) \
                if any(l.strip() for l in following) else 0
            found.append((index + 2, match.group(2), "\n".join(l[indent:] for l in following)))
        elif not value and following and all(
                re.match(r"^\s*[A-Za-z_][\w-]*\s*:(?:\s|$)", l) for l in following
                if l.strip() and not l.lstrip().startswith("#")):
            continue   # a mapping, such as `defaults: run: shell: bash`, not a value
        elif value.startswith(">") or not value and following or value and any(
                l.strip() and not l.lstrip().startswith("#") for l in following):
            raise AssertionError(f"line {index + 1}: `{match.group(2)}` has a folded, empty or "
                                 f"continued value, not read here: {line.strip()!r}")
        else:
            found.append((index + 1, match.group(2), _unquote(value)))
    return found


def is_docker(word):
    return word.rsplit("/", 1)[-1] in ("docker", "docker-compose")


_FUNCTION = re.compile(r"^\s*(?:function\s+)?([A-Za-z_][\w-]*)\s*\(\s*\)\s*(.*)$")
ALL_ARGUMENTS = ("$@", "${@}", "$*", "${*}")


def shell_functions(text):
    """{name: (first line, last line)} of the functions a script defines, a one-line body or one
    closed by a `}` standing alone on its line."""
    lines = text.splitlines()
    found = {}
    for index, line in enumerate(lines):
        match = _FUNCTION.match(line)
        if not match:
            continue
        if _shell_line(match.group(2))[0].endswith("}"):
            found[match.group(1)] = (index + 1, index + 1)
            continue
        for end in range(index + 1, len(lines)):
            if lines[end].strip() == "}":
                found[match.group(1)] = (index + 1, end + 1)
                break
    return found


def _after_docker(words):
    for position, word in enumerate(words):
        if is_docker(word):
            rest = words[position + 1:]
            if word.rsplit("/", 1)[-1] == "docker-compose":
                rest = ["compose"] + rest
            return rest
    return None


def _wrappers(commands, functions):
    wrappers = {}
    for name, (first, last) in functions.items():
        for number, words in commands:
            rest = _after_docker(words)
            if first <= number <= last and rest and rest[-1] in ALL_ARGUMENTS:
                wrappers[name] = rest[:-1]
    return wrappers


def _docker_of(commands, functions, wrappers):
    found = []
    for number, words in commands:
        if words[0] in functions and words == [words[0]] and \
                functions[words[0]][0] == number:
            continue  # the line that defines the function
        if words[0] in wrappers:
            found.append((number, wrappers[words[0]] + words[1:]))
            continue
        rest = _after_docker(words)
        if rest is not None and not (rest and rest[-1] in ALL_ARGUMENTS):
            found.append((number, rest))
    return found


def docker_commands(text):
    """[(line number, words after `docker`)] of the Docker commands a shell script holds, in the
    order they stand in the file; `docker-compose ...` comes out as `compose ...`. A function
    whose body runs a Docker command ending in `"$@"` is a wrapper: each call of it comes out as
    that command with the call's words in place of `"$@"`, and the body's command itself does
    not come out."""
    commands = shell_commands(text)
    functions = shell_functions(text)
    return _docker_of(commands, functions, _wrappers(commands, functions))


def executed_docker_commands(text):
    """The Docker commands of a shell script, as `docker_commands` gives them, in the order the
    script runs them: its top-level commands in order, each call of a function it defines
    replaced by that function's body, the calls in that body replaced in turn (a function already
    being read is not entered again). The branches of an `if` or `case` are read one after the
    other, as they stand; a function the run never calls gives nothing."""
    commands = shell_commands(text)
    functions = shell_functions(text)
    wrappers = _wrappers(commands, functions)

    def owner(number):
        holding = [(last - first, name) for name, (first, last) in functions.items()
                   if first <= number <= last]
        return min(holding)[1] if holding else None

    bodies = {name: [] for name in functions}
    top = []
    for number, words in commands:
        name = owner(number)
        if name is not None and words == [name] and functions[name][0] == number:
            continue  # the line that defines the function
        (bodies[name] if name is not None else top).append((number, words))
    order = []

    def walk(sequence, entered):
        for number, words in sequence:
            order.append((number, words))
            called = words[0]
            if called in bodies and called not in wrappers and called not in entered:
                walk(bodies[called], entered + [called])

    walk(top, [])
    return _docker_of(order, functions, wrappers)


# Options of `docker compose` that take a value, before its subcommand.
COMPOSE_VALUE_OPTIONS = ("-f", "--file", "-p", "--project-name", "--project-directory",
                         "--env-file", "--profile", "--ansi", "--progress", "--parallel")


def compose_parts(words):
    """For the words after `docker compose`: ({option: [values]}, subcommand or None, the words
    after the subcommand)."""
    options = {}
    index = 0
    while index < len(words):
        word = words[index]
        if not word.startswith("-"):
            return options, word, words[index + 1:]
        name, equals, value = word.partition("=")
        if equals:
            options.setdefault(name, []).append(value)
        elif name in COMPOSE_VALUE_OPTIONS and index + 1 < len(words):
            options.setdefault(name, []).append(words[index + 1])
            index += 1
        else:
            options.setdefault(name, []).append("")
        index += 1
    return options, None, []
