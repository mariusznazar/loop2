"""Probe unhandled pinned Ruff suppression syntax without installing tools."""

import json
from pathlib import Path
import sys

root = Path(__file__).resolve().parents[4]
sys.path.insert(0, str(root / "tests/quality"))
sys.path.insert(0, str(root / "scripts"))

import check_ruff
from test_python_shell_checks import PythonShellChecks

cases = {
    "noqa_control": "value = 1  # noqa: F821\n",
    "ignore": "value = 1  # ruff: ignore[F821]\n",
    "file_ignore": "# ruff: file-ignore[F821]\nvalue = 1\n",
    "disable_enable": "# ruff: disable[F821]\nvalue = 1\n# ruff: enable[F821]\n",
}

for name, source in cases.items():
    fixture = PythonShellChecks()
    fixture.setUp()
    try:
        fixture.write("build-tools/new.py", source)
        code, record = fixture.run_check("ruff")
        print(json.dumps({"case": name, "suppresses_blocking": check_ruff.suppresses_blocking(
            source.encode("utf-8")), "adapter_exit": code, "record": record}))
    finally:
        fixture.doCleanups()
