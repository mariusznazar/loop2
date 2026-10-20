"""Build the real image and check local font, licence and stylesheet delivery.

No Docker daemon leaves image building and container HTTP delivery unchecked.
This test establishes bytes and loading references, not rendered typography.
"""

import base64
import json
from pathlib import Path
import re
import subprocess
import time
import unittest
import uuid

from test_loop2_image_icons import (
    BUILD_TIMEOUT,
    COMMAND_TIMEOUT,
    HTTP_PROBE,
    ROOT,
    SERVE_WAIT,
    docker,
    docker_answers,
    docker_run,
)


class ImageServesFonts(unittest.TestCase):

    def test_image_serves_local_font_faces_and_exact_fonts_with_licence(self):
        fonts = Path(ROOT) / "assets" / "fonts"
        expected = {name: (fonts / name).read_bytes()
                    for name in ("Geist.woff2", "GeistMono.woff2", "OFL.txt")}
        self.assertTrue(all(expected.values()), "font and licence inputs must be nonempty")
        if not docker_answers():
            self.skipTest("no Docker daemon answers; image build, local font/style delivery "
                          "and licence bytes in the container stay unchecked")
        suffix = uuid.uuid4().hex[:12]
        tag = "loop2-image-fonts-check:" + suffix
        name = "loop2-image-fonts-check-" + suffix
        self.addCleanup(docker_run, "image", "rm", "-f", tag)
        code, output = docker_run("build", "--build-arg", "LOOP2_COMMIT=image-fonts-check",
                                  "-t", tag, ".", timeout=BUILD_TIMEOUT)
        self.assertEqual(code, 0, f"docker build failed:\n{output}")
        self.addCleanup(docker_run, "rm", "-f", name)
        code, output = docker_run("run", "-d", "--name", name, tag)
        self.assertEqual(code, 0, f"docker run failed:\n{output}")

        paths = ["/", "/design-tokens.css", "/styles.css"]
        paths.extend(f"/fonts/{filename}" for filename in expected)
        deadline = time.monotonic() + SERVE_WAIT
        while True:
            result = subprocess.run([docker(), "exec", "-i", name, "node", "-", *paths],
                                    input=HTTP_PROBE.encode("utf-8"), capture_output=True,
                                    timeout=COMMAND_TIMEOUT)
            if result.returncode == 0 or time.monotonic() > deadline:
                break
            time.sleep(1)
        self.assertEqual(result.returncode, 0,
                         f"container HTTP failed: {result.stdout!r} {result.stderr!r}")
        answers = {answer["path"]: answer for answer in
                   json.loads(result.stdout.decode("utf-8").strip().splitlines()[-1])}
        for url in paths:
            self.assertEqual(answers[url]["status"], 200, f"GET {url} must succeed")
        html = base64.b64decode(answers["/"]["body"]).decode("utf-8")
        self.assertRegex(html, r'href="/design-tokens.css"[\s\S]*href="/styles.css"')
        self.assertNotRegex(html, r"<style[\s>]")
        for url in ("/design-tokens.css", "/styles.css"):
            self.assertTrue((answers[url]["type"] or "").startswith("text/css"),
                            f"GET {url} must be CSS")
        css = base64.b64decode(answers["/design-tokens.css"]["body"]).decode("utf-8")
        urls = re.findall(r'url\("([^"\n]+)"\)', css)
        self.assertEqual(sorted(urls), ["./fonts/Geist.woff2", "./fonts/GeistMono.woff2"])
        self.assertNotRegex(css, r"https?:|@import")
        authored = base64.b64decode(answers["/styles.css"]["body"])
        self.assertEqual(authored, (Path(ROOT) / "src/browser/view/styles.css").read_bytes())
        for filename, source in expected.items():
            answer = answers[f"/fonts/{filename}"]
            with self.subTest(filename=filename):
                media = "font/woff2" if filename.endswith(".woff2") else "text/plain"
                self.assertTrue((answer["type"] or "").startswith(media),
                                f"GET /fonts/{filename}: unexpected media type")
                self.assertEqual(base64.b64decode(answer["body"]), source,
                                 f"GET /fonts/{filename}: changed source bytes")


if __name__ == "__main__":
    unittest.main()
