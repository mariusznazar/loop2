"""Invariant loop2-container-icons: The loop2 container built from the repository serves each SVG
icon file directly in `assets/icons/` at the path `/icons/<file name>`, with the same bytes as that
icon file.

Reading of the sentence:
- the loop2 container built from the repository: the image `docker build` builds from the working
  tree's `Dockerfile`, with the working tree as the build context and only read, run as a
  container with `docker run`;
- each SVG icon file directly in `assets/icons/`: every file standing directly in `assets/icons/` of the working
  tree whose name ends in `.svg` in any letter case; subdirectories and their files are not
  counted. The set must not be empty: an empty directory fails the check instead of passing it
  vacuously;
- serves ... at `/icons/<file name>`: from inside the running container, a GET of
  `/icons/<file name>` (the name percent-encoded as a URL path segment) on the one TCP port the
  container listens on answers with status 200;
- with the same bytes as that icon file: the body of that answer equals, byte for byte, the file as it
  stands in the working tree. The expected bytes are read from the working tree, never from the
  image, the build output or the server.

The check builds the image with `docker build --build-arg LOOP2_COMMIT=invariant-check`, runs it
detached, waits for a listening TCP socket in the container's `/proc/net/tcp` and `tcp6`, makes
the GETs with the container's own Node.js through `docker exec`, and removes the container and
the image afterwards; each removal is registered before the command it undoes. Where no Docker
daemon answers, the test is skipped, so the run gives this invariant no `pass`: whether the
container serves the icons stays unchecked, never passed.

Does NOT cover: the container on the server; requests other than GET; headers of the answer
(media type, caching); paths under `/icons/` that name no file of `assets/icons/`; files of
`assets/icons/` that are not SVG.
"""

import base64
import json
import os
import shutil
import subprocess
import time
import unittest
import urllib.parse
import uuid

import loop2_invariant_support as support

DOCKERFILE = "Dockerfile"
ICONS_DIRECTORY = "assets/icons"
ICON_SUFFIX = ".svg"
URL_PREFIX = "/icons/"
EXPECTED_STATUS = 200

DAEMON_TIMEOUT = 30     # seconds for `docker version` to answer
BUILD_TIMEOUT = 1200    # seconds for the image build
LISTEN_WAIT = 60        # seconds for the started container to hold a listening socket

# Run inside the container by its own Node.js: the ports of the listening sockets (state 0A) in
# the container's TCP tables.
LISTEN_PROBE = r"""
const fs = require("fs");
const ports = new Set();
for (const table of ["/proc/net/tcp", "/proc/net/tcp6"]) {
  let text = "";
  try { text = fs.readFileSync(table, "utf8"); } catch {}
  for (const line of text.split("\n").slice(1)) {
    const c = line.trim().split(/\s+/);
    if (c.length > 3 && c[3] === "0A") ports.add(parseInt(c[1].split(":").pop(), 16));
  }
}
console.log(JSON.stringify([...ports]));
"""

# Run inside the container: the status and the base64 of the body of a GET of each path given.
HTTP_PROBE = r"""
const [port, ...paths] = process.argv.slice(2);
Promise.all(paths.map(async (path) => {
  const response = await fetch(`http://127.0.0.1:${port}${path}`,
                               { signal: AbortSignal.timeout(10000) });
  const body = Buffer.from(await response.arrayBuffer());
  return { path, status: response.status, body: body.toString("base64") };
})).then((r) => console.log(JSON.stringify(r)),
         (e) => { console.error(String(e)); process.exit(1); });
"""


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


def node_in_container(name, script, *arguments):
    """(exit code, stdout, stderr) of a script run by the container's own Node.js, the script
    given on standard input."""
    result = subprocess.run([docker(), "exec", "-i", name, "node", "-", *arguments],
                            input=script.encode("utf-8"), capture_output=True,
                            timeout=support.COMMAND_TIMEOUT)
    return (result.returncode, result.stdout.decode("utf-8", "replace"),
            result.stderr.decode("utf-8", "replace"))


def working_tree_icons():
    """{file name: bytes} of the SVG files standing directly in assets/icons/ of the working
    tree."""
    directory = os.path.join(support.ROOT, *ICONS_DIRECTORY.split("/"))
    if not os.path.isdir(directory):
        raise AssertionError(f"{ICONS_DIRECTORY}/ does not exist in the working tree")
    icons = {}
    for name in sorted(os.listdir(directory)):
        path = os.path.join(directory, name)
        if os.path.isfile(path) and name.lower().endswith(ICON_SUFFIX):
            with open(path, "rb") as handle:
                icons[name] = handle.read()
    return icons


class ContainerServesIcons(unittest.TestCase):

    def test_container_serves_each_icon_with_the_file_bytes(self):
        # invariant: loop2-container-icons
        support.read_required(DOCKERFILE)
        icons = working_tree_icons()
        self.assertTrue(icons, f"{ICONS_DIRECTORY}/ holds no file ending in {ICON_SUFFIX}")
        if not docker_answers():
            self.skipTest("no Docker daemon answers; whether the loop2 container serves the "
                          "icons of assets/icons/ (loop2-container-icons) stays unchecked")
        tag = "loop2-invariant-check:" + uuid.uuid4().hex[:12]
        name = "loop2-invariant-check-" + uuid.uuid4().hex[:12]
        self.addCleanup(docker_run, "image", "rm", "-f", tag)
        code, output = docker_run("build", "--build-arg", "LOOP2_COMMIT=invariant-check",
                                  "-t", tag, ".", timeout=BUILD_TIMEOUT)
        self.assertEqual(code, 0, f"`docker build` failed:\n{output}")
        self.addCleanup(docker_run, "rm", "-f", name)
        code, output = docker_run("run", "-d", "--name", name, tag)
        self.assertEqual(code, 0, f"`docker run` failed:\n{output}")

        deadline = time.monotonic() + LISTEN_WAIT
        while True:
            code, output, errors = node_in_container(name, LISTEN_PROBE)
            self.assertEqual(code, 0, f"reading the container's sockets failed:\n{output}{errors}")
            ports = json.loads(output.strip().splitlines()[-1])
            if ports or time.monotonic() > deadline:
                break
            time.sleep(1)
        self.assertTrue(ports, f"nothing listens in the container within {LISTEN_WAIT} s; "
                               f"container log:\n{docker_run('logs', name)[1]}")
        self.assertEqual(len(ports), 1, f"the container listens on several ports, so its "
                                        f"listening port is not one: {ports}")

        paths = {URL_PREFIX + urllib.parse.quote(icon, safe=""): icon for icon in icons}
        code, output, errors = node_in_container(name, HTTP_PROBE, str(ports[0]), *paths)
        self.assertEqual(code, 0, f"the HTTP probe in the container failed:\n{output}{errors}")
        answers = {a["path"]: a for a in json.loads(output.strip().splitlines()[-1])}
        for path, icon in paths.items():
            with self.subTest(icon=icon):
                answer = answers[path]
                self.assertEqual(answer["status"], EXPECTED_STATUS,
                                 f"GET {path} in the container answers {answer['status']}")
                body = base64.b64decode(answer["body"])
                self.assertEqual(body, icons[icon],
                                 f"GET {path} in the container answers {len(body)} bytes that "
                                 f"differ from {ICONS_DIRECTORY}/{icon} ({len(icons[icon])} "
                                 "bytes) in the working tree")


if __name__ == "__main__":
    unittest.main()
