import json
import sys
import unittest
from pathlib import Path
sys.path.insert(0, str(Path.cwd() / 'tests/quality'))
from gate_fixture import GateFixture
case = unittest.TestCase()
try:
    gate = GateFixture(case)
    for name, content in {'tests/test_exit.py': 'raise SystemExit(0)\n', 'tests/test_exit_none.py': 'raise SystemExit()\n', 'tests/test_control.py': 'import unittest\nclass Case(unittest.TestCase):\n def test_real(self): self.assertEqual(1, 1)\n'}.items():
        gate.write(name, content)
        result = gate.run(name)
        print(json.dumps({'file': name, 'code': result.returncode, 'stdout': result.stdout, 'stderr': result.stderr}))
finally:
    case.doCleanups()