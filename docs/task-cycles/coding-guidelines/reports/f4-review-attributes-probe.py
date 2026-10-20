"""Probe repository attribute provenance without changing product files."""

import importlib.util
import json
from pathlib import Path
import subprocess
import sys

root = Path(__file__).resolve().parents[4]
sys.path.insert(0, str(root / "scripts"))
spec = importlib.util.spec_from_file_location(
    "formatter_fixture", root / "tests/quality/test_format_check.py")
fixture_module = importlib.util.module_from_spec(spec)
spec.loader.exec_module(fixture_module)

for mode in ("repository-control", "absent-control", "local-info", "global-file"):
    fixture = fixture_module.FormatChecks("test_default_format_passes")
    fixture.setUp()
    try:
        if mode != "repository-control":
            fixture.write(".gitattributes", "")
        if mode == "local-info":
            fixture.write(".git/info/attributes", "*.ts text eol=lf\n")
        if mode == "global-file":
            attributes = fixture.write(".runs/user.attributes", "*.ts text eol=lf\n")
            subprocess.run(["git", "-C", str(fixture.root), "config",
                            "core.attributesFile", str(attributes)], check=True,
                           capture_output=True)
        code, record = fixture.verdict()
        print(json.dumps({"case": mode, "adapter_exit": code, "record": record}))
    finally:
        fixture.doCleanups()
