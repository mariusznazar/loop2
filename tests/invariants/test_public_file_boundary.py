"""Invariant public-file-boundary/1: static files come only from the built public directory,
even when the server starts in another working directory.

The check requires real built public bytes and probes files planted outside that directory,
including direct paths and encoded traversal paths. Response page wording is unconstrained.
It also records every Express static root created by the built application, independently of
the URL prefix at which its middleware is mounted.
"""

import json
from pathlib import Path
import shutil
import tempfile
import unittest

import loop2_invariant_support as support


class PublicFileBoundary(unittest.TestCase):

    def test_only_built_public_files_are_served_from_a_foreign_working_directory(self):
        # invariant: public-file-boundary/1
        copy = support.built_copy()
        public_html = Path(copy.file("dist/public/index.html")).read_bytes()
        public_script = Path(copy.file("dist/public/main.js")).read_bytes()
        # data: package.json
        root_manifest = Path(copy.file("package.json")).read_bytes()
        marker = b"loop2-invariant-outside-public-asset"

        with tempfile.TemporaryDirectory(prefix="loop2-foreign-cwd-") as foreign:
            node = shutil.which("node")
            self.assertIsNotNone(node, "node is not on PATH")
            # Patch before importing the app so module-level registrations and aliases are
            # observed too. Resolve relative roots at registration time, as Express does.
            code, output = support.run([node, "--input-type=module", "-e", """
import express from 'express';
import { resolve } from 'node:path';
import { pathToFileURL } from 'node:url';
const appUrl = pathToFileURL(resolve('dist/server/app.js'));
const roots = [];
const originalStatic = express.static;
express.static = function (root, ...options) {
  roots.push(resolve(root));
  return originalStatic.call(this, root, ...options);
};
process.chdir(process.argv[1]);
const { createApp } = await import(appUrl.href);
await createApp();
console.log(JSON.stringify(roots));
""", foreign], copy.path)
            self.assertEqual(code, 0, f"cannot inspect built application static roots:\n{output}")
            roots = json.loads(output)
            self.assertTrue(roots, "the built application created no Express static middleware")
            expected_root = Path(copy.file("dist/public")).resolve()
            for root in roots:
                with self.subTest(static_root=root):
                    self.assertTrue(Path(root).resolve().is_relative_to(expected_root),
                                     "Express static middleware exposes a directory outside "
                                     "the built public directory")

            Path(foreign, "outside-public.txt").write_bytes(marker)
            Path(copy.file("outside-public.txt")).write_bytes(marker)
            Path(copy.file("src/server/outside-public.txt")).write_bytes(marker)
            Path(copy.file("dist/server/outside-public.txt")).write_bytes(marker)
            server = support.Server(copy, working_directory=foreign)
            try:
                for path, expected in (("/", public_html), ("/main.js", public_script)):
                    with self.subTest(public=path):
                        status, _headers, body = support.request("GET", path)
                        self.assertEqual(status, 200)
                        self.assertEqual(body, expected)

                # A second static root mounted at /source must not expose repository src.
                for path in ("/source/server/outside-public.txt", "/outside-public.txt",
                             "/package.json", "/../package.json",
                             "/%2e%2e/package.json", "/..%2f..%2fpackage.json",
                             "/..%5c..%5c/package.json"):
                    with self.subTest(outside=path):
                        _status, _headers, body = support.request("GET", path)
                        self.assertNotIn(marker, body)
                        self.assertNotEqual(body, root_manifest)
            finally:
                server.stop()


if __name__ == "__main__":
    unittest.main()
