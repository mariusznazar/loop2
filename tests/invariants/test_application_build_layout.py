"""The browser and server have distinct TypeScript compilation layouts."""

import json
from pathlib import Path
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
            includes = config["include"]
            self.assertTrue(any(source in pattern.replace("\\", "/")
                                for pattern in includes),
                            f"{filename} does not include {source}")
            self.assertTrue(any(p.startswith(source + "/") and p.endswith(".ts")
                                for p in tracked), f"{source} has no TypeScript source")
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
