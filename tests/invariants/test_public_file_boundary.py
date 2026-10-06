"""Invariant public-file-boundary/1: static files come only from the built public directory,
even when the server starts in another working directory.

The check requires real built public bytes and probes files planted outside that directory,
including direct paths and encoded traversal paths. Response page wording is unconstrained.
It also records every Express static root created by the built application, independently of
the URL prefix at which its middleware is mounted.
Direct literal GET routes registered on the app are requested too; successful sendFile calls
(including Express download) are checked by their actual filesystem target. This is finite
runtime coverage: nested/parameterized routes, authentication or other request conditions,
request-time registrations and file bytes sent through other APIs need separate review.
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
            code, output = support.run([node, "--input-type=module", "-e", r"""
import express from 'express';
import fs from 'node:fs';
import { resolve } from 'node:path';
import { pathToFileURL } from 'node:url';
const appUrl = pathToFileURL(resolve('dist/server/app.js'));
const roots = [];
const files = [];
const streamFiles = new WeakMap();
const originalReadStream = fs.createReadStream;
fs.createReadStream = function (file, ...options) {
  // Observe send's actual selected file, including root and extension/index options.
  const stream = originalReadStream.call(this, file, ...options);
  streamFiles.set(stream, file);
  return stream;
};
const originalStatic = express.static;
express.static = function (root, ...options) {
  roots.push(resolve(root));
  return originalStatic.call(this, root, ...options);
};
const originalSendFile = express.response.sendFile;
express.response.sendFile = function (file, options, callback) {
  const opts = typeof options === 'function' ? {} : options;
  const done = typeof options === 'function' ? options : callback;
  const targets = [];
  const observePipe = stream => {
    if (streamFiles.has(stream)) targets.push(streamFiles.get(stream));
  };
  // Internal reads are allowed: only a stream piped to this response is a transfer.
  this.prependListener('pipe', observePipe);
  const completed = error => {
    this.removeListener('pipe', observePipe);
    // An error-status response can carry file bytes; a failed transfer carries an error.
    if (!error) {
      for (const target of targets) {
        files.push({ url: this.req.originalUrl, target: fs.realpathSync(target) });
      }
    }
    if (done) return done(error);
    // Preserve Express 5's default sendFile error handling when no callback was supplied.
    if (error?.code === 'EISDIR') return this.req.next();
    if (error && error.code !== 'ECONNABORTED' && error.syscall !== 'write') {
      this.req.next(error);
    }
  };
  try {
    return originalSendFile.call(this, file, opts, completed);
  } catch (error) {
    this.removeListener('pipe', observePipe);
    throw error;
  }
};
process.chdir(process.argv[1]);
const { createApp } = await import(appUrl.href);
const app = await createApp();
const paths = new Set(['/']);
// Express 5 exposes its router stack here. Do not guess a leaking route's URL.
for (const layer of app.router.stack) {
  const route = layer.route;
  if (!route || !(route.methods.get || route.methods._all)) continue;
  for (const path of [route.path].flat()) {
    if (typeof path === 'string' && !/[:*{}()[\]\\?+]/.test(path)) paths.add(path);
  }
}
const server = app.listen(0, '127.0.0.1');
await new Promise((accept, reject) => {
  server.once('listening', accept);
  server.once('error', reject);
});
try {
  for (const path of paths) {
    const response = await fetch(`http://127.0.0.1:${server.address().port}${path}`, {
      redirect: 'manual', signal: AbortSignal.timeout(10000)
    });
    await response.arrayBuffer();
  }
} finally {
  await new Promise((accept, reject) => server.close(error => error ? reject(error) : accept()));
}
console.log('LOOP2_FILE_AUDIT=' + JSON.stringify({ roots, files }));
""", foreign], copy.path)
            self.assertEqual(code, 0, f"cannot inspect built application file responses:\n{output}")
            # Application logs (including ordinary 404 errors) are not audit records.
            records = [line.removeprefix("LOOP2_FILE_AUDIT=") for line in output.splitlines()
                       if line.startswith("LOOP2_FILE_AUDIT=")]
            self.assertEqual(len(records), 1, f"missing or ambiguous file audit:\n{output}")
            audit = json.loads(records[0])
            roots = audit["roots"]
            self.assertTrue(roots, "the built application created no Express static middleware")
            expected_root = Path(copy.file("dist/public")).resolve()
            for root in roots:
                with self.subTest(static_root=root):
                    self.assertTrue(Path(root).resolve().is_relative_to(expected_root),
                                     "Express static middleware exposes a directory outside "
                                     "the built public directory")
            for file in audit["files"]:
                with self.subTest(file_response=file):
                    self.assertTrue(Path(file["target"]).resolve().is_relative_to(expected_root),
                                    "a direct file response serves outside the built public directory")

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
