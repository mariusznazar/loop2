"""Exercise the independent live method against a weakened owned configuration."""
import json
from pathlib import Path
import subprocess
import sys

root = Path(__file__).resolve().parents[4]
config = root / "eslint.config.mjs"
original = config.read_bytes()
old = b"...js.configs.recommended,"
new = b'...js.configs.recommended, rules: { ...js.configs.recommended.rules, "no-debugger": "off" },'
assert original.count(old) == 1
record = Path(__file__).with_name("s1-resume-config-negative.jsonl")
try:
    config.write_bytes(original.replace(old, new))
    result = subprocess.run([sys.executable, "-B", "scripts/check_eslint.py", "--configuration", "--record", str(record)], cwd=root)
    assert result.returncode == 1, result.returncode
    entry = json.loads(record.read_text(encoding="utf-8"))
    assert entry["verdict"] == "fail" and entry["invariant"] == "eslint-configuration-rules/1", entry
finally:
    config.write_bytes(original)
assert config.read_bytes() == original
print("Independent live configuration method rejects no-debugger=off; exact config bytes restored.")
