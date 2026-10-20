"""Compare frozen exact redirects with the final fact and pinned upstream table."""

import json
from pathlib import Path
import re
import sys
import urllib.request

root = Path(__file__).resolve().parents[4]
sys.path.insert(0, str(root / "scripts"))
import check_ruff

fact = (root / "foundations/environment_facts.md").read_text(encoding="utf-8")
sentence = fact.split("## ruff-default-rules/1\n\n", 1)[1].split("\n\n", 1)[0]
adopted = set(re.findall(r"`([A-Z]+[0-9]+)`", sentence)) - set(
    "PLW1510 I001 ISC004 UP031 RUF059 PIE808 RUF007 RUF012 PLR0402 FURB167 RUF100 "
    "SIM117 FURB192 SIM102".split())
url = "https://raw.githubusercontent.com/astral-sh/ruff/0.17.1/crates/ruff_linter/src/rule_redirects.rs"
with urllib.request.urlopen(url, timeout=30) as response:
    source = response.read().decode("utf-8")
all_redirects = dict(re.findall(r'\("([A-Z]+[0-9]*)", "([A-Z]+[0-9]*)"\)', source))
expected = {alias: target for alias, target in all_redirects.items() if target in adopted}
assert len(adopted) == 393
assert set(check_ruff.BLOCKING) == adopted
assert check_ruff.BLOCKING_REDIRECTS == expected, (check_ruff.BLOCKING_REDIRECTS, expected)
assert all_redirects["M001"] == "RUF100" and "RUF100" not in adopted
print(json.dumps({"source": url, "blocking_rules": len(adopted),
                  "blocking_redirects": len(expected), "nonblocking_control": "M001 -> RUF100",
                  "verdict": "pass"}))
