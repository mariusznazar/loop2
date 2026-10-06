"""The browser and server have distinct TypeScript compilation layouts."""

import json
from pathlib import Path
import shutil
import unittest

import loop2_invariant_support as support


class ApplicationBuildLayout(unittest.TestCase):

    def test_browser_and_server_configs_are_distinct(self):
        # invariant: application-build-layout/1
        configs = []
        tracked = set(support.listed_files())
        for filename, source in (("tsconfig.browser.json", "src/browser"),
                                 ("tsconfig.server.json", "src/server")):
            # data: tsconfig.browser.json
            # data: tsconfig.server.json
            path = Path(support.ROOT, filename)
            self.assertIn(filename, tracked, f"{filename} is not tracked")
            self.assertTrue(path.is_file(), f"{filename} is missing")
            config = json.loads(path.read_text(encoding="utf-8"))
            # Let TypeScript resolve include, exclude, files and inherited settings.
            node = shutil.which("node")
            self.assertIsNotNone(node, "node is not on PATH")
            code, output = support.run([node, "-e", """
const ts = require('typescript');
const path = require('node:path');
const filename = path.resolve(process.argv[1]);
const config = ts.readConfigFile(filename, ts.sys.readFile);
if (config.error) throw new Error(ts.flattenDiagnosticMessageText(config.error.messageText, ' '));
const parsed = ts.parseJsonConfigFileContent(config.config, ts.sys, path.dirname(filename));
console.log(JSON.stringify(parsed.fileNames));
""", filename], support.ROOT)
            self.assertEqual(code, 0, f"cannot resolve {filename}: {output}")
            included = {Path(name).resolve() for name in json.loads(output)}
            sources = {Path(support.ROOT, name).resolve() for name in tracked
                       if name.startswith(source + "/")
                       and name.endswith((".ts", ".mts", ".cts"))
                       and not name.endswith((".d.ts", ".d.mts", ".d.cts"))}
            self.assertTrue(sources & included,
                            f"{filename} does not include a tracked TypeScript source from {source}")
            configs.append(config)

        paths = [Path(support.ROOT, name) for name in
                 ("tsconfig.browser.json", "tsconfig.server.json")]
        roots = [config["compilerOptions"]["rootDir"] for config in configs]
        outputs = [config["compilerOptions"]["outDir"] for config in configs]
        self.assertTrue(all(roots), "both configurations need rootDir")
        self.assertTrue(all(outputs), "both configurations need outDir")
        resolved_roots = {(path.parent / value).resolve()
                          for path, value in zip(paths, roots)}
        resolved_outputs = {(path.parent / value).resolve()
                            for path, value in zip(paths, outputs)}
        self.assertEqual(len(resolved_roots), 2, "browser and server rootDir must differ")
        self.assertEqual(len(resolved_outputs), 2, "browser and server outDir must differ")


if __name__ == "__main__":
    unittest.main()
