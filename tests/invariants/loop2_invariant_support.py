"""Shared support for loop2's invariant checks: the repository root, the product's own npm
commands run in a temporary copy of the working tree, the built server started on its port, and
the deployment files the repository holds.

Nothing here computes a value a check expects; the checks write their expected values out as
literals (WAY-69). This module only runs the product and hands its output back.
"""

import atexit
import fnmatch
import http.client
import os
import shutil
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
