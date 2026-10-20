"""Exercise current-map discovery without declaring a product invariant verdict."""

import json
from pathlib import Path
import sys

sys.path.insert(0, str(Path.cwd()))
from scripts.quality_support import discover_files

parts = ("browser-view", "simulation", "account-server", "build-tools", "agent-workflow",
         "product-foundation", "deployment")
found = {part: discover_files(Path.cwd(), {part}) for part in parts}
assert "scripts/quality_support.py" in found["build-tools"]
assert "tests/quality/test_quality_support.py" in found["build-tools"]
assert "src/browser/sim/game.ts" in found["simulation"]
assert "src/browser/sim/game.ts" not in found["browser-view"]
assert "foundations/invariants.md" in found["product-foundation"]
print(json.dumps(found, ensure_ascii=True, indent=2))
