"""Focused reviewer probe for lock source identity; no product writes or requests."""

import json
from pathlib import Path
import subprocess
import sys

ROOT = Path(__file__).resolve().parents[4]
sys.path.insert(0, str(ROOT / "tests/quality"))
from test_dependency_audit import DependencyAudit


def probe(label, resolved):
    fixture = DependencyAudit()
    fixture.setUp()
    try:
        fixture.lock["packages"]["node_modules/a"]["resolved"] = resolved
        fixture.save()
        fixture.write(".runs/response.json", "NETWORK_FAILURE")
        code, record = fixture.verdict()
        print(json.dumps({"case": label, "resolved": resolved, "actual_exit": code,
                          "record": record,
                          "network_request": (fixture.root / ".runs/payload.json").exists()}))
    finally:
        fixture.doCleanups()


probe("same-name-different-tarball-version", "https://registry.npmjs.org/a/-/a-1.5.0.tgz")
probe("dot-segments-change-real-name", "https://registry.npmjs.org/a/-/../../other/-/other-1.5.0.tgz")
script = r'''
const versionFromTgz = require('C:/Program Files/nodejs/node_modules/npm/node_modules/@npmcli/arborist/lib/version-from-tgz.js');
for (const url of ['https://registry.npmjs.org/a/-/a-1.5.0.tgz',
                  'https://registry.npmjs.org/a/-/../../other/-/other-1.5.0.tgz'])
  console.log(JSON.stringify({url, normalized:new URL(url).href, actual:versionFromTgz('a', url)}));
'''
result = subprocess.run(["node", "-e", script], capture_output=True)
sys.stdout.write(result.stdout.decode("utf-8"))
sys.stderr.write(result.stderr.decode("utf-8"))
sys.exit(result.returncode)
