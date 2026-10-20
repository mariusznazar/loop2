import ast
import hashlib
import importlib.util
import json
from pathlib import Path
import re
import subprocess
import sys

BASE = "a9080ce"
rows = []
for filename, names in (("scripts/check_eslint.py", ("JS_RULES", "TS_ADDITIONS", "TS_DISABLED")),
                        ("scripts/check_ruff.py", ("BLOCKING",))):
    original = subprocess.run(["git", "show", BASE + ":" + filename], check=True,
                              capture_output=True).stdout.decode("utf-8")
    current = Path(filename).read_bytes().decode("utf-8")
    before, after = ast.parse(original), ast.parse(current)
    for name in names:
        old = next(node for node in before.body if isinstance(node, ast.Assign)
                   and any(isinstance(target, ast.Name) and target.id == name
                           for target in node.targets))
        new = next(node for node in after.body if isinstance(node, ast.Assign)
                   and any(isinstance(target, ast.Name) and target.id == name
                           for target in node.targets))
        old_values = old.value.func.value.value.split()
        new_values = ast.literal_eval(new.value)
        assert old_values == new_values, name
        assert len(set(new_values)) == len(new_values), name
        rows.append({"name": name, "count": len(new_values), "ordered_values_equal": True,
                     "sha256": hashlib.sha256(json.dumps(new_values).encode()).hexdigest()})
        old.value = new.value
    assert ast.dump(before) == ast.dump(after), filename
    print(filename + ": all other code AST unchanged")
print(json.dumps(rows, indent=2))

sys.path.insert(0, str(Path("scripts").resolve()))
import check_ruff
facts = Path("foundations/environment_facts.md").read_text(encoding="utf-8")
ruff_fact = facts.split("## ruff-default-rules/1\n", 1)[1].split("\n- **Holds for:**", 1)[0]
all_rules = set(re.findall(r"`([A-Z]+[0-9]+)`", ruff_fact))
examples = {"PLW1510", "I001", "ISC004", "UP031", "RUF059", "PIE808", "RUF007",
            "RUF012", "PLR0402", "FURB167", "RUF100", "SIM117", "FURB192", "SIM102"}
assert len(all_rules) == 407
assert set(check_ruff.BLOCKING) == all_rules - examples
print("Ruff authoritative fact: 407 defaults minus 14 examples = exact 393 blockers")

unchanged = ["foundations", "package.json", "package-lock.json", "eslint.config.mjs",
             "prettier.config.mjs", "requirements-quality.in", "requirements-quality.txt"]
subprocess.run(["git", "diff", "--exit-code", BASE, "--", *unchanged], check=True)
print("Foundation sentences/methods and product tool configuration unchanged")
assert '"import sys' + chr(92) + 'n"' in Path("tests/quality/test_quality_support.py").read_text(encoding="utf-8")
print("New test subprocess newline escape found literally")
print("guidelines present: " + str(Path("guidelines").exists()))
