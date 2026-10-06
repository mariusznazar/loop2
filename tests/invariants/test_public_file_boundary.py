"""Invariant public-file-boundary/1: static files come only from the built public directory,
even when the server starts in another working directory.

The check requires real built public bytes and probes files planted outside that directory,
including direct paths and encoded traversal paths. Response page wording is unconstrained.
"""

from pathlib import Path
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
            Path(foreign, "outside-public.txt").write_bytes(marker)
            Path(copy.file("outside-public.txt")).write_bytes(marker)
            Path(copy.file("dist/server/outside-public.txt")).write_bytes(marker)
            server = support.Server(copy, working_directory=foreign)
            try:
                for path, expected in (("/", public_html), ("/main.js", public_script)):
                    with self.subTest(public=path):
                        status, _headers, body = support.request("GET", path)
                        self.assertEqual(status, 200)
                        self.assertEqual(body, expected)

                for path in ("/outside-public.txt", "/package.json", "/../package.json",
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
