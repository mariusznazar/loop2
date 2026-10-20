from pathlib import Path
path = Path("tests/quality/test_eslint_checks.py")
source = path.read_bytes().decode("utf-8")
old = 'self.assertIn(recorded["description"], diagnostics[:-1])'
new = 'self.assertIn(recorded["description"], "\\n".join(diagnostics[:-1]))'
assert source.count(old) == 2
path.write_bytes(source.replace(old, new).encode("utf-8"))
assert new in path.read_bytes().decode("utf-8")
