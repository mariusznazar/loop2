"""The loop2 image carries the game's icons and serves them (D-27, D-05, D-14).

`scripts/build.mjs` copies every SVG file of `assets/icons/` into `dist/public/icons/` when the
application is built, and the image is built by `npm run build` in the Dockerfile's build stage.
This test builds the image from the working tree as `docker build` reads it (the Dockerfile and
`.dockerignore` decide what the build stage holds; the tree is only read), runs it, and, from
inside the running container, GETs `/` and `/icons/<name>` for each SVG file the working tree
holds in `assets/icons/`, on the port the container's own environment names
(`LOOP2_LISTEN_PORT`).

Covers:
- the image builds from the working tree (`docker build` exits 0);
- for each SVG file of `assets/icons/` — the list read from the working tree, never written out
  here — a GET of `/icons/<name>` answers 200 with an `image/svg+xml` media type and exactly the
  file's bytes;
- `/` still answers 200 with an HTML page;
- the container and the image the test made are removed afterwards.

Where no Docker daemon answers, the test is skipped and says what stays unchecked: the image's
build and the icons it serves.

Does NOT cover: the image built on the test server (that build is the deployment's); files of
`assets/icons/` that are not SVG (the build copies only `*.svg`); whether the icons are drawn on
the page.
"""

import base64
import json
import os
import shutil
import subprocess
import time
import unittest
import uuid

ROOT = os.path.abspath(os.path.join(os.path.dirname(__file__), "..", ".."))
ICONS = os.path.join(ROOT, "assets", "icons")

DAEMON_TIMEOUT = 30     # seconds for `docker version` to answer
BUILD_TIMEOUT = 1200    # seconds for the image build
COMMAND_TIMEOUT = 120   # seconds for any other docker command
SERVE_WAIT = 60         # seconds for the started container to answer GET /

SVG_MEDIA_TYPE = "image/svg+xml"
HTML_MEDIA_TYPE = "text/html"

# Run inside the container by its own Node.js: status, media type and body (base64) of a GET of
# each path given, on the port the container's environment names.
HTTP_PROBE = r"""
const port = process.env.LOOP2_LISTEN_PORT;
const paths = process.argv.slice(2);
Promise.all(paths.map(async (path) => {
  const response = await fetch(`http://127.0.0.1:${port}${path}`,
                               { signal: AbortSignal.timeout(10000) });
  const body = Buffer.from(await response.arrayBuffer());
  return { path, status: response.status, type: response.headers.get("content-type"),
           body: body.toString("base64") };
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


def docker_run(*arguments, timeout=COMMAND_TIMEOUT):
    """(exit code, combined output) of a docker command run from the repository root."""
    result = subprocess.run([docker(), *arguments], cwd=ROOT, stdin=subprocess.DEVNULL,
                            stdout=subprocess.PIPE, stderr=subprocess.STDOUT, timeout=timeout)
    return result.returncode, result.stdout.decode("utf-8", "replace")


def icon_files():
    """Names and bytes of the SVG files of assets/icons/ in the working tree."""
    icons = {}
    for name in sorted(os.listdir(ICONS)):
        path = os.path.join(ICONS, name)
        if name.endswith(".svg") and os.path.isfile(path):
            with open(path, "rb") as handle:
                icons[name] = handle.read()
    return icons


class ImageServesIcons(unittest.TestCase):

    def test_built_image_serves_every_icon_and_the_page(self):
        icons = icon_files()
        self.assertTrue(icons, "assets/icons/ holds no SVG file; nothing to look for in the image")
        if not docker_answers():
            self.skipTest("no Docker daemon answers; the image's build and the icons it serves "
                          "stay unchecked")
        tag = "loop2-image-icons-check:" + uuid.uuid4().hex[:12]
        name = "loop2-image-icons-check-" + uuid.uuid4().hex[:12]

        # Each cleanup is registered before the command it undoes, so a build or run that times
        # out still leaves no image or container; removing a name that does not exist is harmless.
        # Cleanups run last-registered first: the container, then the image it holds.
        self.addCleanup(docker_run, "image", "rm", "-f", tag)
        code, output = docker_run("build", "--build-arg", "LOOP2_COMMIT=image-icons-check",
                                  "-t", tag, ".", timeout=BUILD_TIMEOUT)
        self.assertEqual(code, 0, f"`docker build` failed:\n{output}")
        self.addCleanup(docker_run, "rm", "-f", name)
        code, output = docker_run("run", "-d", "--name", name, tag)
        self.assertEqual(code, 0, f"`docker run` failed:\n{output}")

        paths = ["/"] + [f"/icons/{icon}" for icon in icons]
        deadline = time.monotonic() + SERVE_WAIT
        while True:
            code, output, errors = self.probe(name, paths)
            if code == 0 or time.monotonic() > deadline:
                break
            time.sleep(1)
        self.assertEqual(code, 0, f"GET in the container failed within {SERVE_WAIT} s:\n"
                                  f"{output}{errors}\ncontainer log:\n{docker_run('logs', name)[1]}")
        answers = {a["path"]: a for a in json.loads(output.strip().splitlines()[-1])}

        page = answers["/"]
        self.assertEqual(page["status"], 200, f"GET / in the container: {page['status']}")
        self.assertTrue((page["type"] or "").startswith(HTML_MEDIA_TYPE),
                        f"GET / in the container answers media type {page['type']!r}")

        for icon, expected in icons.items():
            answer = answers[f"/icons/{icon}"]
            with self.subTest(icon=icon):
                self.assertEqual(answer["status"], 200,
                                 f"GET /icons/{icon} in the container: {answer['status']}")
                self.assertTrue((answer["type"] or "").startswith(SVG_MEDIA_TYPE),
                                f"GET /icons/{icon} answers media type {answer['type']!r}")
                self.assertEqual(base64.b64decode(answer["body"]), expected,
                                 f"GET /icons/{icon} answers bytes other than "
                                 f"assets/icons/{icon}")

    def probe(self, name, paths):
        result = subprocess.run([docker(), "exec", "-i", name, "node", "-", *paths],
                                input=HTTP_PROBE.encode("utf-8"), capture_output=True,
                                timeout=COMMAND_TIMEOUT)
        return (result.returncode, result.stdout.decode("utf-8", "replace"),
                result.stderr.decode("utf-8", "replace"))


if __name__ == "__main__":
    unittest.main()
