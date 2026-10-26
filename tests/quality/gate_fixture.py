"""Temporary repository with the real gate and cheap stand-ins for its other stages."""

import json
from pathlib import Path
import shutil
import subprocess
import tempfile

ROOT = Path(__file__).resolve().parents[2]
NPM = ROOT / "node_modules/npm/bin/npm-cli.js"


class GateFixture:

    def __init__(self, case):
        temporary = tempfile.TemporaryDirectory(prefix="loop2-gate-")
        case.addCleanup(temporary.cleanup)
        self.root = Path(temporary.name)
        package = json.loads((ROOT / "package.json").read_text(encoding="utf-8"))
        self.write("package.json", json.dumps({"type": "module", "scripts": {
            "test": package["scripts"]["test"], "build": package["scripts"]["build"]}}))
        (self.root / "scripts").mkdir()
        for name in ("test.py", "test-node-file.mjs"):
            shutil.copyfile(ROOT / "scripts" / name, self.root / "scripts" / name)
        self.write("scripts/build.mjs",
                   'import { writeFileSync } from "node:fs"; writeFileSync("built", "yes");\n')
        for path, marker in ((".the-way/gate/run_tests.py", "python-stage"),
                             (".the-way/elements/common/foundation_check.py", "foundation-stage")):
            self.write(path, f'from pathlib import Path\nPath("{marker}").touch()\n')

    def write(self, name, content):
        path = self.root / name
        path.parent.mkdir(parents=True, exist_ok=True)
        path.write_text(content, encoding="utf-8")
        return path

    def run(self, *arguments):
        return subprocess.run(["node", str(NPM), "test", "--", *arguments], cwd=self.root,
                              capture_output=True, text=True, encoding="utf-8",
                              errors="backslashreplace", timeout=60, check=False)

    def node_test(self, name):
        marker = name + ".ran"
        self.write(name, 'import test from "node:test";\n'
                   'import { writeFileSync, existsSync } from "node:fs";\n'
                   'import assert from "node:assert/strict";\n'
                   f'test({json.dumps(name)}, () => {{ assert.ok(existsSync("built")); '
                   f'writeFileSync({json.dumps(marker)}, "yes"); }});\n')
