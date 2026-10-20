"""Capture current primary advisory data for the two documented fixture versions."""
from pathlib import Path
import json
import sys

root = Path.cwd()
sys.path.insert(0, str(root / "scripts"))
import check_dependencies as audit

answer = audit._node(root, {
    "action": "compare", "pairs": [["minimist", "1.2.8"], ["minimist", "1.2.5"]],
    "requirements": [], "introduced": {"minimist": ["1.2.8", "1.2.5"]}})
advisories = json.loads(answer["body"])
matches, severities = audit._advisories(advisories, {"minimist": ["1.2.8", "1.2.5"]})
matched = audit._node(root, {"action": "match", "advisories": matches})
assert matched["matches"] == [False, True]
assert severities == ["critical", "critical"]
output = root / ".runs/task-cycles/coding-guidelines/reports/s11-fixture-primary-source.json"
output.write_text(json.dumps({"response": answer, "matches": matched}, indent=2), encoding="utf-8")
print(json.dumps({"primary_source": str(output), "safe": "minimist/1.2.8",
                  "vulnerable": "minimist/1.2.5", "severity": "critical",
                  "advisory": advisories["minimist"][0]["url"]}))
