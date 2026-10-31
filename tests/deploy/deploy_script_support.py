"""The test seam of the server-side deployment script `deploy/loop2-deploy`.

Each test runs a temporary copy of the script in which only the marked constants block is
replaced: its `PATH` puts a directory of recording stubs first, and its paths point into a
temporary directory. Everything outside the block is checked to be byte-identical to the
repository's script before any run. The thresholds, waits and names stay as the script
writes them.

What a run gets:
- recording stubs for `docker`, `curl`, `flock` and `df`, written at run time with LF endings into
  the stub directory, the first entry of the copy's `PATH`; each records its arguments and the
  `LOOP2_COMMIT` it was given, and answers as the test sets (`DeployFixture.answer`);
- recording stubs for `hostname` and `uname` that print SENTINEL_HOST, so a test sees whether the
  script ever asked for the server's name;
- a guard, before every run, that stops the test when any stubbed tool resolves outside the stub
  directory on the copy's `PATH`, so a real Docker is never reached;
- a temporary bare Git repository standing in for GitHub and a clone of it standing in for the
  server's checkout, its remote `origin`;
- Git's own bash (on Windows the `bash.exe` of the Git installation, never another `bash` on
  `PATH` such as WSL's);
- the input handed over byte-exact: the arguments and `SSH_ORIGINAL_COMMAND` are written to files
  and a launcher run by Git's bash reads them and starts the copy, because a Windows command line
  does not carry every byte (a newline, a quote) into an MSYS program;
- every git command the copy runs traced through `GIT_TRACE` into a file of the run, and git's
  global and system configuration replaced by an empty file, so the developer's hooks and line-ending
  settings do not reach the fixture.

A tool this needs that the machine lacks (Git, Git's bash) skips the test, so it reports itself
unchecked, never passed.
"""

import os
import re
import shutil
import subprocess
import tempfile
import unittest

ROOT = os.path.abspath(os.path.join(os.path.dirname(__file__), "..", ".."))
SCRIPT = os.path.join(ROOT, "deploy", "loop2-deploy")
BACKUP_SCRIPT = os.path.join(ROOT, "deploy", "loop2-backup")
BACKUP_SCHEDULE = os.path.join(ROOT, "deploy", "loop2-backup.cron")

BLOCK_BEGIN = b"# >>> constants >>>"
BLOCK_END = b"# === end of constants ==="  # no "<<" in it: a heredoc to shell readers

STUBBED_TOOLS = ("docker", "curl", "flock", "df", "hostname", "uname")
# What the hostname and uname stubs print: a stand-in for the server's name.
SENTINEL_HOST = "sentinel-server-name-7f3a"
UNSET = "<unset>"
# The Docker root directory the docker stub reports under `answer_passing_run`.
DOCKER_ROOT = "/var/lib/docker"  # recorded for a call made without LOOP2_COMMIT in its environment
RUN_TIMEOUT = 120  # seconds for one run of the copy
GIT_TIMEOUT = 60   # seconds for one git command of the fixture

_ASSIGNMENT = re.compile(rb"^(?P<prefix>(?:export|readonly) )(?P<name>[A-Z_][A-Z0-9_]*)=(?P<value>.*)$")

STUB = """#!/bin/bash
# Recording stub for {tool}, written by tests/deploy/deploy_script_support.py.
stubs='{stubs}'
{{ printf '%s\\0' "$@"; printf '\\036\\0'; }} >>"$stubs/calls/{tool}"
printf '%s\\0' "${{LOOP2_COMMIT-{unset}}}" >>"$stubs/calls/{tool}.env"
for rule in "$stubs/answers/{tool}"/*; do
  [[ -d $rule ]] || continue
  pattern=$(<"$rule/pattern")
  if [[ "$*" == $pattern ]]; then
    cat "$rule/stdout"
    exit "$(<"$rule/exit")"
  fi
done
exit 0
"""

LAUNCHER = """#!/bin/bash
# Starts the copy with the arguments and SSH_ORIGINAL_COMMAND read byte-exact from files.
script=$1 arguments_file=$2 ssh_file=$3
mapfile -d '' -t arguments <"$arguments_file"
unset SSH_ORIGINAL_COMMAND
if [[ -e $ssh_file ]]; then
  IFS= read -r -d '' SSH_ORIGINAL_COMMAND <"$ssh_file"
  export SSH_ORIGINAL_COMMAND
fi
exec "$BASH" "$script" "${arguments[@]}"
"""

GUARD = """#!/bin/bash
PATH=$1
shift
for tool in "$@"; do
  printf '%s=%s\\n' "$tool" "$(type -P "$tool")"
done
"""


def git_executable():
    path = shutil.which("git")
    if path is None:
        raise unittest.SkipTest("git is not on PATH; the deployment script tests stay unchecked")
    return path


def git_bash():
    """Git's own bash: on Windows the one of the Git installation, never another on PATH."""
    if os.name != "nt":
        path = shutil.which("bash")
        if path is None:
            raise unittest.SkipTest("bash is not on PATH; the deployment script tests stay unchecked")
        return path
    result = subprocess.run([git_executable(), "--exec-path"], capture_output=True, text=True,
                            timeout=GIT_TIMEOUT)
    exec_path = result.stdout.strip()
    # <Git>/mingw64/libexec/git-core -> <Git>
    install = os.path.dirname(os.path.dirname(os.path.dirname(exec_path)))
    path = os.path.join(install, "bin", "bash.exe")
    if result.returncode != 0 or not os.path.isfile(path):
        raise unittest.SkipTest("Git's own bash.exe was not found next to git; the deployment "
                                "script tests stay unchecked")
    return path


def shell_path(path):
    """A path as Git's bash writes it: /c/... on Windows."""
    path = os.path.abspath(path).replace("\\", "/")
    if os.name == "nt" and re.match(r"^[A-Za-z]:/", path):
        path = "/" + path[0].lower() + path[2:]
    return path


def native_path(path):
    return os.path.abspath(path).replace("\\", "/")


def read_bytes(path):
    with open(path, "rb") as handle:
        return handle.read()


def write_bytes(path, data):
    os.makedirs(os.path.dirname(path), exist_ok=True)
    with open(path, "wb") as handle:
        handle.write(data)


def split_script(data):
    """(before the block, the block's lines, after the block) of the script's bytes; the marker
    lines belong to before and after."""
    if b"\r" in data:
        raise AssertionError("deploy/loop2-deploy holds a carriage return; it must have LF line "
                             "endings (.gitattributes: deploy/** text eol=lf)")
    begin = data.find(BLOCK_BEGIN + b"\n")
    end = data.find(b"\n" + BLOCK_END + b"\n")
    if begin < 0 or end < 0 or end < begin or data.count(BLOCK_BEGIN) != 1 or \
            data.count(BLOCK_END) != 1:
        raise AssertionError("deploy/loop2-deploy has no single marked constants block "
                             f"({BLOCK_BEGIN.decode()} ... {BLOCK_END.decode()})")
    head_end = begin + len(BLOCK_BEGIN) + 1
    return data[:head_end], data[head_end:end + 1].splitlines(), data[end + 1:]


def constants(data=None):
    """{name: value as written} of the script's constants block."""
    _head, lines, _tail = split_script(read_bytes(SCRIPT) if data is None else data)
    found = {}
    for line in lines:
        match = _ASSIGNMENT.match(line)
        if match:
            found[match.group("name").decode()] = match.group("value").decode()
    return found


def replace_block(data, overrides):
    """The script's bytes with only the named constants of its block given new values."""
    head, lines, tail = split_script(data)
    left = dict(overrides)
    replaced = []
    for line in lines:
        match = _ASSIGNMENT.match(line)
        name = match.group("name").decode() if match else None
        if name in left:
            value = left.pop(name)
            if "'" in value:
                raise AssertionError(f"a test value holds a single quote: {value!r}")
            line = match.group("prefix") + match.group("name") + b"='" + value.encode() + b"'"
        replaced.append(line)
    if left:
        raise AssertionError(f"the constants block of deploy/loop2-deploy assigns no {sorted(left)}")
    return head + b"\n".join(replaced) + b"\n" + tail


class Result:
    def __init__(self, code, stdout, stderr, calls, git_trace, commit_env=None):
        self.code = code
        self.stdout = stdout
        self.stderr = stderr
        self.calls = calls          # {tool: [[argument, ...], ...]}
        self.git_trace = git_trace  # the GIT_TRACE output of the run, "" when git never ran
        # {tool: [LOOP2_COMMIT of each call, or UNSET]}, in the order of `calls`
        self.commit_env = commit_env or {}

    def calls_with_env(self, tool):
        """[(arguments, LOOP2_COMMIT or UNSET)] of a stub's calls."""
        return list(zip(self.calls.get(tool, []), self.commit_env.get(tool, [])))

    @property
    def output(self):
        return self.stdout + self.stderr

    def stub_calls(self):
        return {tool: calls for tool, calls in self.calls.items() if calls}

    def __repr__(self):
        return (f"exit {self.code}\n--- stdout ---\n{self.stdout}\n--- stderr ---\n{self.stderr}"
                f"\n--- stub calls ---\n{self.stub_calls()}")


class DeployFixture:
    """A temporary directory holding the copy of the script, its stubs, the repository standing
    in for GitHub, the clone standing in for the server's checkout and the files the constants
    block points at."""

    def __init__(self):
        self.bash = git_bash()
        self.git_path = git_executable()
        self.root = tempfile.mkdtemp(prefix="loop2-deploy-test-")
        try:
            self._build()
        except BaseException:
            self.remove()
            raise

    def path(self, *parts):
        return os.path.join(self.root, *parts)

    def _build(self):
        self.gitconfig = self.path("gitconfig")
        write_bytes(self.gitconfig, b"")
        self.stubs = self.path("stubs")
        for tool in STUBBED_TOOLS:
            stub = STUB.format(tool=tool, stubs=shell_path(self.stubs), unset=UNSET).encode()
            write_bytes(os.path.join(self.stubs, tool), stub)
            os.chmod(os.path.join(self.stubs, tool), 0o755)
            os.makedirs(os.path.join(self.stubs, "answers", tool), exist_ok=True)
        self.launcher = self.path("launcher.sh")
        write_bytes(self.launcher, LAUNCHER.encode())
        self.guard = self.path("guard.sh")
        write_bytes(self.guard, GUARD.encode())

        self.github = self.path("github")
        self.git("init", "--quiet", "--bare", "--initial-branch=main", self.github)
        self.first = self.commit("main", "first")
        self.checkout = self.path("srv", "loop2")
        os.makedirs(os.path.dirname(self.checkout))
        self.git("clone", "--quiet", self.github, self.checkout)

        self.installed = self.path("usr", "local", "bin", "loop2-deploy")
        self.installed_backup = self.path("usr", "local", "bin", "loop2-backup")
        self.installed_schedule = self.path("etc", "cron.d", "loop2-backup")
        self.log_file = self.path("var", "log", "loop2-deploy.log")
        self.lock_file = self.path("run", "loop2-deploy.lock")
        self.meminfo = self.path("proc", "meminfo")
        for directory in (self.installed, self.installed_schedule, self.log_file, self.lock_file):
            os.makedirs(os.path.dirname(directory), exist_ok=True)
        write_bytes(self.meminfo, b"MemTotal:        4456448 kB\nMemAvailable:    3788800 kB\n")

        if os.name == "nt":
            self.copy_path_value = shell_path(self.stubs) + ":/mingw64/bin:/usr/bin:/bin"
        else:
            self.copy_path_value = self.stubs + ":/usr/bin:/bin"
        self.copy = self.path("copy", "loop2-deploy")
        self.write_copy()
        for tool in ("hostname", "uname"):
            self.answer(tool, stdout=SENTINEL_HOST + "\n")

    def write_copy(self, **extra):
        """Write the copy: the repository's script with only the block's paths and PATH replaced,
        then check that everything outside the block is byte-identical to the source."""
        source = read_bytes(SCRIPT)
        overrides = {
            "PATH": self.copy_path_value,
            "CHECKOUT_DIR": shell_path(self.checkout),
            "INSTALLED_SCRIPT": shell_path(self.installed),
            "INSTALLED_BACKUP_SCRIPT": shell_path(self.installed_backup),
            "INSTALLED_BACKUP_SCHEDULE": shell_path(self.installed_schedule),
            "LOG_FILE": shell_path(self.log_file),
            "LOCK_FILE": shell_path(self.lock_file),
            "MEMINFO_FILE": shell_path(self.meminfo),
        }
        overrides.update(extra)
        write_bytes(self.copy, replace_block(source, overrides))
        os.chmod(self.copy, 0o755)
        source_head, _lines, source_tail = split_script(source)
        copy_head, _lines, copy_tail = split_script(read_bytes(self.copy))
        if (source_head, source_tail) != (copy_head, copy_tail):
            raise AssertionError("the copy differs from deploy/loop2-deploy outside the constants "
                                 "block")

    def remove(self):
        shutil.rmtree(self.root, ignore_errors=True)

    # --- git -----------------------------------------------------------------------------------

    def git_env(self):
        env = dict(os.environ)
        for name in list(env):
            if name.startswith("GIT_") or name == "SSH_ORIGINAL_COMMAND":
                del env[name]
        env.update(GIT_CONFIG_GLOBAL=native_path(self.gitconfig), GIT_CONFIG_NOSYSTEM="1",
                   GIT_AUTHOR_NAME="test", GIT_AUTHOR_EMAIL="test@example.invalid",
                   GIT_COMMITTER_NAME="test", GIT_COMMITTER_EMAIL="test@example.invalid")
        return env

    def git(self, *arguments, cwd=None, data=None):
        result = subprocess.run([self.git_path, *arguments], cwd=cwd or self.root,
                                input=data, capture_output=True, env=self.git_env(),
                                timeout=GIT_TIMEOUT)
        if result.returncode != 0:
            raise AssertionError(f"git {' '.join(arguments)} failed:\n"
                                 + result.stderr.decode("utf-8", "replace"))
        return result.stdout.decode("utf-8", "replace").strip()

    def _tree(self, repository, files):
        """The tree object of {relative path with `/`: bytes}, subdirectories included."""
        entries, directories = [], {}
        for name, data in files.items():
            head, slash, rest = name.partition("/")
            if slash:
                directories.setdefault(head, {})[rest] = data
            else:
                blob = self.git("-C", repository, "hash-object", "-w", "--stdin", data=data)
                entries.append(f"100644 blob {blob}\t{name}\n")
        for name, content in directories.items():
            entries.append(f"040000 tree {self._tree(repository, content)}\t{name}\n")
        return self.git("-C", repository, "mktree", data="".join(entries).encode())

    def make_commit(self, repository, message, parent=None, files=None):
        """A commit object in a repository, its tree a .gitignore, one file unique to it and the
        `files` given ({relative path: bytes}); no ref is moved."""
        tree_files = {".gitignore": b"ignored.txt\n", "content.txt": (message + "\n").encode()}
        tree_files.update(files or {})
        tree = self._tree(repository, tree_files)
        parents = ["-p", parent] if parent else []
        return self.git("-C", repository, "commit-tree", tree, *parents, "-m", message)

    def commit(self, branch, message, parent=None, files=None):
        """A new commit on a branch of the repository standing in for GitHub, on top of the
        branch's tip or of `parent`; the branch is created when missing."""
        ref = f"refs/heads/{branch}"
        if parent is None:
            tip = subprocess.run([self.git_path, "-C", self.github, "rev-parse", "--verify",
                                  "--quiet", ref], capture_output=True, text=True,
                                 env=self.git_env(), timeout=GIT_TIMEOUT)
            parent = tip.stdout.strip() or None
        sha = self.make_commit(self.github, message, parent, files)
        self.git("-C", self.github, "update-ref", ref, sha)
        return sha

    # --- a deployable commit and a host that lets it through -----------------------------------

    def deployable_commit(self, message="deployable", script=None):
        """A new commit on main holding `compose.yaml` and the three installable files:
        `deploy/loop2-deploy` (by default the repository's script), `deploy/loop2-backup` and
        `deploy/loop2-backup.cron`, the last two from the repository's own files, as every commit
        of this task on does."""
        files = {"compose.yaml": b"name: loop2\n",
                 "deploy/loop2-deploy": read_bytes(SCRIPT) if script is None else script,
                 "deploy/loop2-backup": read_bytes(BACKUP_SCRIPT),
                 "deploy/loop2-backup.cron": read_bytes(BACKUP_SCHEDULE)}
        return self.commit("main", message, files=files)

    def install(self, data=None, backup=None, schedule=None):
        """Write the three installed copies: the deploy script, the backup script and the backup
        schedule (by default the repository's files)."""
        write_bytes(self.installed, read_bytes(SCRIPT) if data is None else data)
        write_bytes(self.installed_backup,
                    read_bytes(BACKUP_SCRIPT) if backup is None else backup)
        write_bytes(self.installed_schedule,
                    read_bytes(BACKUP_SCHEDULE) if schedule is None else schedule)

    def answer_passing_run(self, running=None):
        """Answers under which a deployment gets through every stage: Docker's root directory,
        22 GiB free on it, a build, a healthy start, both probes and the old game's state. Rules
        are tried in the order given, so a test makes a stage fail by answering it first.
        `running` is the revision label of the running loop2 container (None: no container)."""
        if running is None:
            self.answer("docker", exit_code=1, match="inspect --type container --format *loop2")
        else:
            self.answer("docker", stdout=running + "\n",
                        match="inspect --type container --format *loop2")
        self.answer("docker", stdout=DOCKER_ROOT + "\n", match="info --format {{.DockerRootDir}}")
        self.answer("docker", stdout="/loop running healthy\n",
                    match="inspect --type container * loop")
        self.answer("df", stdout=f" Avail\n{22 * 1024 * 1024}\n")
        self.answer("docker", stdout="200 text/html; charset=utf-8\n"
                    "404 application/json; charset=utf-8\n", match="exec loop2 node -e *")

    def delete_branch(self, branch):
        self.git("-C", self.github, "update-ref", "-d", f"refs/heads/{branch}")

    def clone_refs(self):
        """{refname: sha} of the clone's remote-tracking refs."""
        listing = self.git("-C", self.checkout, "for-each-ref",
                           "--format=%(refname) %(objectname)", "refs/remotes/")
        return dict(line.split(" ", 1) for line in listing.splitlines() if line)

    def clone_has_object(self, sha):
        result = subprocess.run([self.git_path, "-C", self.checkout, "cat-file", "-e",
                                 sha + "^{commit}"], capture_output=True, env=self.git_env(),
                                timeout=GIT_TIMEOUT)
        return result.returncode == 0

    # --- stubs ---------------------------------------------------------------------------------

    def answer(self, tool, exit_code=0, stdout="", match="*"):
        """Make a stub answer the calls whose arguments, joined by spaces, match a bash pattern;
        rules are tried in the order they were given, the first match answers. A call no rule
        matches exits 0 and prints nothing."""
        directory = os.path.join(self.stubs, "answers", tool)
        rule = os.path.join(directory, f"{len(os.listdir(directory)):03d}")
        write_bytes(os.path.join(rule, "pattern"), match.encode())
        write_bytes(os.path.join(rule, "exit"), str(exit_code).encode())
        write_bytes(os.path.join(rule, "stdout"), stdout.encode())

    def guard_stubs(self):
        """Stop the test when any stubbed tool resolves outside the stub directory on the copy's
        PATH."""
        result = subprocess.run([self.bash, shell_path(self.guard), self.copy_path_value,
                                 *STUBBED_TOOLS],
                                capture_output=True, timeout=RUN_TIMEOUT)
        resolved = dict(line.split("=", 1) for line in
                        result.stdout.decode("utf-8", "replace").splitlines() if "=" in line)
        expected_prefix = shell_path(self.stubs) + "/"
        wrong = {tool: resolved.get(tool, "") for tool in STUBBED_TOOLS
                 if not resolved.get(tool, "").startswith(expected_prefix)}
        if result.returncode != 0 or wrong:
            raise AssertionError(f"guard: on the copy's PATH these tools resolve outside the stub "
                                 f"directory {expected_prefix}: {wrong}; the run is aborted")

    def _read_calls(self):
        calls = {}
        for tool in STUBBED_TOOLS:
            path = os.path.join(self.stubs, "calls", tool)
            records = []
            if os.path.exists(path):
                current = []
                for part in read_bytes(path).split(b"\0")[:-1]:
                    if part == b"\x1e":
                        records.append(current)
                        current = []
                    else:
                        current.append(part.decode("utf-8", "replace"))
            calls[tool] = records
        return calls

    def _read_commit_env(self):
        found = {}
        for tool in STUBBED_TOOLS:
            path = os.path.join(self.stubs, "calls", tool + ".env")
            found[tool] = [part.decode("utf-8", "replace")
                           for part in read_bytes(path).split(b"\0")[:-1]] \
                if os.path.exists(path) else []
        return found

    # --- a run ---------------------------------------------------------------------------------

    def run(self, arguments=(), ssh_original_command=None):
        """Run the copy once: with `ssh_original_command` set (a string, possibly empty) the
        variable is set, with None it is unset; `arguments` are its arguments."""
        self.guard_stubs()
        run_dir = self.path("run-input")
        shutil.rmtree(run_dir, ignore_errors=True)
        shutil.rmtree(os.path.join(self.stubs, "calls"), ignore_errors=True)
        os.makedirs(os.path.join(self.stubs, "calls"))
        arguments_file = os.path.join(run_dir, "arguments")
        ssh_file = os.path.join(run_dir, "ssh")
        write_bytes(arguments_file, b"".join(a.encode() + b"\0" for a in arguments))
        if ssh_original_command is not None:
            write_bytes(ssh_file, ssh_original_command.encode() + b"\0")
        trace = os.path.join(run_dir, "git-trace.txt")
        env = self.git_env()
        env["GIT_TRACE"] = native_path(trace)
        result = subprocess.run(
            [self.bash, shell_path(self.launcher), shell_path(self.copy),
             shell_path(arguments_file), shell_path(ssh_file)],
            stdin=subprocess.DEVNULL, capture_output=True, env=env, timeout=RUN_TIMEOUT)
        git_trace = read_bytes(trace).decode("utf-8", "replace") if os.path.exists(trace) else ""
        return Result(result.returncode, result.stdout.decode("utf-8", "replace"),
                      result.stderr.decode("utf-8", "replace"), self._read_calls(), git_trace,
                      self._read_commit_env())

    def run_script_as_probe(self, probe_text, arguments=(), ssh_original_command=None):
        """Run another script through the same launcher, for a check of the seam itself."""
        saved = read_bytes(self.copy)
        try:
            write_bytes(self.copy, probe_text.encode())
            return self.run(arguments, ssh_original_command)
        finally:
            write_bytes(self.copy, saved)

    def log_text(self):
        return read_bytes(self.log_file).decode("utf-8", "replace") \
            if os.path.exists(self.log_file) else ""
