"""Invariant loop2-one-serving-process: One Express 5 process in the loop2 container serves both
the built game and `/api/` account and save requests.

This file checks the loop2 container; `test_loop2_one_serving_process.py` checks the same server
as `npm start` starts it outside any container.

Reading of the sentence:
- the loop2 container: the one service of `compose.yaml`, built from the repository's
  `Dockerfile`. Whether Compose adds an init process (`init: true`) is not read: the Docker part
  runs the image with an init process of its own, and an init process is not counted either way;
- one process: the image's last stage starts `node` directly — an exec-form `CMD` whose program
  is `node`, no `ENTRYPOINT` of the Dockerfile's own (the Node.js image's entrypoint script
  replaces itself with the command it is given), and no `command` or `entrypoint` set in Compose —
  and Compose runs one container of it: one service, with no `scale` or `replicas` above 1;
- in the running container, counted where a Docker daemon answers: among the container's
  processes exactly one holds a listening TCP socket, before the requests below and after them,
  it is `node`, and it has started no process of its own. The init process and the health
  probe are not serving processes: they hold no listening socket and are not children of the
  listening process, so they are not counted;
- serves the built game and `/api/` requests: from inside the container, a GET of `/` on the
  listening port returns 200 with an HTML page, and a GET of an `/api/` path made up so that no
  route can mean it is answered with an HTTP status; what that answer must be is
  loop2-api-error-route's;
- Express 5: the `express` package the listening process loads from its working directory is of
  major version 5.

The Docker part builds the image from the working tree (`docker build`, the tree is only read),
runs it with `docker run --init` (the init process Compose's `init: true` would add, which the
check does not require), reads the processes through
`/proc` inside the container as the image's own user (the user the container runs as, as a
`docker exec` without `-u` does; root without `CAP_SYS_PTRACE` may be refused another user's
`/proc/<pid>/fd`), and removes the container and the image afterwards. Every listening socket in
the container's TCP tables must belong to a process the probe can read: a socket whose owner it
cannot see fails the check instead of going uncounted. Where no Docker
daemon answers, that test is skipped, so the run gives this invariant no `pass`: the container
part stays unchecked, never passed. A deployment file that does not exist makes every test here
fail, the Docker part included, before the daemon is asked.

Does NOT cover: the container on the server (its first real run is the first deployment); a second
process started later than the probes; requests other than the two GETs.
"""

import json
import os
import re
import shutil
import subprocess
import time
import unittest
import uuid

import loop2_invariant_support as support

COMPOSE_FILE = "compose.yaml"
DOCKERFILE = "Dockerfile"
EXPECTED_PROGRAM = "node"
EXPECTED_EXPRESS_MAJOR = 5
UNMATCHED_API_PATH = "/api/one-serving-process-container-check-no-such-route"

DAEMON_TIMEOUT = 30     # seconds for `docker version` to answer
BUILD_TIMEOUT = 1200    # seconds for the image build
LISTEN_WAIT = 60        # seconds for the started container to hold a listening socket

# Run inside the container by its own Node.js: the listening sockets of the container's TCP
# tables (state 0A in /proc/net/tcp and tcp6), and every process with its parent, command line,
# working directory, whether its descriptors could be read, and the listening sockets it holds.
PROCESS_PROBE = r"""
const fs = require("fs");
const listening = new Map();
for (const table of ["/proc/net/tcp", "/proc/net/tcp6"]) {
  let text = "";
  try { text = fs.readFileSync(table, "utf8"); } catch {}
  for (const line of text.split("\n").slice(1)) {
    const c = line.trim().split(/\s+/);
    if (c.length > 9 && c[3] === "0A") listening.set(c[9], parseInt(c[1].split(":").pop(), 16));
  }
}
const sockets = [...listening].map(([inode, port]) => ({ inode, port }));
const processes = [];
for (const entry of fs.readdirSync("/proc")) {
  if (!/^\d+$/.test(entry)) continue;
  let stat, cmd;
  try {
    stat = fs.readFileSync(`/proc/${entry}/stat`, "utf8");
    cmd = fs.readFileSync(`/proc/${entry}/cmdline`, "utf8").split("\0").filter(Boolean);
  } catch { continue; }
  const ppid = parseInt(stat.slice(stat.lastIndexOf(")") + 2).split(" ")[1], 10);
  const ports = new Set();
  const inodes = new Set();
  let descriptors = true;
  try {
    for (const fd of fs.readdirSync(`/proc/${entry}/fd`)) {
      try {
        const m = /^socket:\[(\d+)\]$/.exec(fs.readlinkSync(`/proc/${entry}/fd/${fd}`));
        if (m && listening.has(m[1])) { ports.add(listening.get(m[1])); inodes.add(m[1]); }
      } catch { descriptors = false; }
    }
  } catch { descriptors = false; }
  let cwd = null;
  try { cwd = fs.readlinkSync(`/proc/${entry}/cwd`); } catch {}
  let express = null;
  try {
    const manifest = `${cwd}/node_modules/express/package.json`;
    express = JSON.parse(fs.readFileSync(manifest, "utf8")).version;
  } catch {}
  processes.push({ pid: Number(entry), ppid, cmd, cwd, express, descriptors,
                   ports: [...ports], inodes: [...inodes] });
}
console.log(JSON.stringify({ self: process.pid, sockets, processes }));
"""

# Run inside the container: the status and media type of a GET of each path given.
HTTP_PROBE = r"""
const [port, ...paths] = process.argv.slice(2);
Promise.all(paths.map(async (path) => {
  const response = await fetch(`http://127.0.0.1:${port}${path}`,
                               { headers: { accept: "text/html" },
                                 signal: AbortSignal.timeout(10000) });
  const body = await response.text();
  return { path, status: response.status, type: response.headers.get("content-type"),
           html: /^\s*<!doctype html|^\s*<html/i.test(body) };
})).then((r) => console.log(JSON.stringify(r)),
         (e) => { console.error(String(e)); process.exit(1); });
"""


def final_stage(text):
    stages = support.dockerfile_stages(text)
    return stages, stages[-1]


def docker():
    return shutil.which("docker")


def docker_answers():
    if docker() is None:
        return False
    try:
        result = subprocess.run([docker(), "version", "--format", "{{.Server.Version}}"],
                                capture_output=True, timeout=DAEMON_TIMEOUT)
    except (OSError, subprocess.TimeoutExpired):
        return False
    return result.returncode == 0 and result.stdout.strip() != b""


def docker_run(*arguments, timeout=support.COMMAND_TIMEOUT):
    return support.run([docker(), *arguments], support.ROOT, timeout=timeout)


def node_in_container(name, script, *arguments, user=None):
    """(exit code, stdout, stderr) of a script run by the container's own Node.js, the script
    given on standard input."""
    command = [docker(), "exec", "-i"] + (["-u", user] if user else []) + [
        name, "node", "-", *arguments]
    result = subprocess.run(command, input=script.encode("utf-8"), capture_output=True,
                            timeout=support.COMMAND_TIMEOUT)
    return (result.returncode, result.stdout.decode("utf-8", "replace"),
            result.stderr.decode("utf-8", "replace"))


class ContainerStartsOneNodeProcess(unittest.TestCase):

    def test_image_command_is_exec_form_node(self):
        # invariant: loop2-one-serving-process
        stages, last = final_stage(support.read_required(DOCKERFILE))
        commands = [args for keyword, args, _h in last.instructions if keyword == "CMD"]
        self.assertTrue(commands, f"the last stage of {DOCKERFILE} sets no CMD")
        command = support.exec_form(commands[-1])
        self.assertIsNotNone(command, f"the CMD of {DOCKERFILE}'s last stage is not in exec form: "
                                      f"{commands[-1]!r}")
        self.assertTrue(command, f"the CMD of {DOCKERFILE}'s last stage is empty")
        self.assertEqual(command[0].rsplit("/", 1)[-1], EXPECTED_PROGRAM,
                         f"the CMD of {DOCKERFILE}'s last stage runs {command[0]!r}")
        self.assertGreater(len(command), 1, f"the CMD of {DOCKERFILE}'s last stage gives `node` "
                                            "no script to run")
        for stage in support.stage_chain(stages, last):
            entrypoints = [a for k, a, _h in stage.instructions if k == "ENTRYPOINT"]
            with self.subTest(stage=repr(stage)):
                self.assertTrue(all(support.exec_form(a) == [] for a in entrypoints),
                                f"{stage!r} of {DOCKERFILE} sets ENTRYPOINT {entrypoints}")

    def test_compose_runs_one_service_with_the_image_command(self):
        # invariant: loop2-one-serving-process
        _top, services = support.compose_outline(support.read_required(COMPOSE_FILE))
        self.assertEqual(len(services), 1, f"{COMPOSE_FILE} has {len(services)} services: "
                                           f"{sorted(services)}")
        for name, keys in services.items():
            for key in ("command", "entrypoint"):
                self.assertNotIn(key, keys, f"service `{name}` overrides the image with `{key}`")
            if "scale" in keys:
                self.assertEqual(keys["scale"].value, "1",
                                 f"service `{name}` scale {keys['scale']!r}")
            if "deploy" in keys:
                replicas = re.findall(r"^\s*replicas\s*:\s*(\S+)",
                                      support.block_text(keys["deploy"]), re.MULTILINE)
                self.assertTrue(all(r.strip("\"'") == "1" for r in replicas),
                                f"service `{name}` deploys {replicas} replicas")


class RunningContainerHasOneServingProcess(unittest.TestCase):

    def test_running_container_has_one_listening_node_process(self):
        # invariant: loop2-one-serving-process
        support.read_required(DOCKERFILE)
        support.read_required(COMPOSE_FILE)
        if not docker_answers():
            self.skipTest("no Docker daemon answers; the container part of "
                          "loop2-one-serving-process/2 stays unchecked")
        tag = "loop2-invariant-check:" + uuid.uuid4().hex[:12]
        name = "loop2-invariant-check-" + uuid.uuid4().hex[:12]
        code, output = docker_run("build", "--build-arg", "LOOP2_COMMIT=invariant-check",
                                  "-t", tag, ".", timeout=BUILD_TIMEOUT)
        self.addCleanup(docker_run, "image", "rm", "-f", tag)
        self.assertEqual(code, 0, f"`docker build` failed:\n{output}")
        code, output = docker_run("run", "-d", "--init", "--name", name, tag)
        self.addCleanup(docker_run, "rm", "-f", name)
        self.assertEqual(code, 0, f"`docker run --init` failed:\n{output}")

        deadline = time.monotonic() + LISTEN_WAIT
        while True:
            table = self.processes(name)
            listeners = [p for p in table["processes"] if p["ports"] and p["pid"] != table["self"]]
            if listeners or table["sockets"] or time.monotonic() > deadline:
                break
            time.sleep(1)
        if not listeners:
            self.fail(f"no process the probe can read listens within {LISTEN_WAIT} s; listening "
                      f"sockets of the container: {table['sockets']}; container "
                      f"log:\n{docker_run('logs', name)[1]}")
        self.assertEqual(len(listeners), 1, f"processes listening in the container before the "
                                            f"requests: {listeners}")
        port = listeners[0]["ports"][0]

        code, output, errors = node_in_container(name, HTTP_PROBE, str(port), "/",
                                                 UNMATCHED_API_PATH)
        self.assertEqual(code, 0, f"the HTTP probe in the container failed:\n{output}{errors}")
        answers = {a["path"]: a for a in json.loads(output.strip().splitlines()[-1])}
        self.assertEqual(answers["/"]["status"], 200, f"GET / in the container: {answers['/']}")
        self.assertTrue(answers["/"]["html"] or "html" in (answers["/"]["type"] or ""),
                        f"GET / in the container returns no HTML page: {answers['/']}")
        self.assertTrue(100 <= answers[UNMATCHED_API_PATH]["status"] <= 599,
                        f"GET {UNMATCHED_API_PATH} in the container: {answers[UNMATCHED_API_PATH]}")

        table = self.processes(name)
        others = [p for p in table["processes"] if p["pid"] != table["self"]]
        held = {inode for p in others for inode in p["inodes"]}
        unowned = [s for s in table["sockets"] if s["inode"] not in held]
        unreadable = [p for p in others if not p["descriptors"]]
        self.assertEqual(unowned, [], f"listening sockets of the container that no process the "
                                      f"probe can read holds; processes whose descriptors it "
                                      f"could not read: {unreadable}")
        listeners = [p for p in others if p["ports"]]
        self.assertEqual(len(listeners), 1, f"processes listening in the container: {listeners}")
        listener = listeners[0]
        self.assertEqual(os.path.basename(listener["cmd"][0]) if listener["cmd"] else None,
                         EXPECTED_PROGRAM, f"the listening process is {listener}")
        children = [p for p in others if p["ppid"] == listener["pid"]]
        self.assertEqual(children, [], f"the listening process {listener['cmd']} has started "
                                       f"processes of its own: {children}")
        found = re.match(r"v?(\d+)", listener["express"] or "")
        self.assertIsNotNone(found, f"the listening process loads no express from "
                                    f"{listener['cwd']}/node_modules")
        self.assertEqual(int(found.group(1)), EXPECTED_EXPRESS_MAJOR,
                         f"the listening process loads express {listener['express']!r}")

    def processes(self, name):
        code, output, errors = node_in_container(name, PROCESS_PROBE)
        self.assertEqual(code, 0, f"reading the container's processes failed:\n{output}{errors}")
        return json.loads(output.strip().splitlines()[-1])


if __name__ == "__main__":
    unittest.main()
