import io
from pathlib import Path
import shutil
import subprocess
import sys
import tempfile
import unittest

root = Path.cwd()
base = root / ".runs/task-cycles/first-foundation/package-review-cases"
reports = root / ".runs/task-cycles/first-foundation/reports"
sys.path.insert(0, str(root / "tests/invariants"))
import loop2_invariant_support as support
import test_application_package_layout as checks
original_listing = support.listed_files


def check(name, directory, expected):
    support.ROOT = str(directory)
    support.listed_files = lambda: original_listing(str(directory))
    stream = io.StringIO()
    result = unittest.TextTestRunner(stream=stream, verbosity=2).run(unittest.defaultTestLoader.loadTestsFromTestCase(checks.ApplicationPackageLayout))
    (reports / f"package-fix-{name}.log").write_text(stream.getvalue(), encoding="utf-8")
    print(name, result.wasSuccessful(), "expected", expected)
    assert result.wasSuccessful() == expected


for name, expected in [("known-tool", True), ("overlap", False), ("vite-browser", False), ("nested-server", False)]:
    check(name, base / name, expected)

with tempfile.TemporaryDirectory(prefix="loop2-package-dashed-") as temporary:
    target = Path(temporary)
    source = base / "known-tool"
    paths = subprocess.check_output(["git", "ls-files", "-z"], cwd=source, text=True).split("\0")
    for relative in filter(None, paths):
        destination = target / relative
        destination.parent.mkdir(parents=True, exist_ok=True)
        shutil.copy2(source / relative, destination)
    path = target / "foundations/part_map.md"
    data = path.read_bytes()
    before = b"- **Files:** - tools/review/**\n  /package.json"
    if before not in data:
        before = before.replace(b"\n", b"\r\n")
    assert before in data
    after = b"- **Files:** /package.json\n  - tools/review/**"
    path.write_bytes(data.replace(before, after))
    subprocess.run(["git", "init", "-q"], cwd=target, check=True)
    subprocess.run(["git", "add", "--", *filter(None, paths)], cwd=target, check=True, capture_output=True)
    check("dashed-continuation", target, True)
    result = subprocess.run([sys.executable, "-B", str(root / ".the-way/elements/part-map/format_guard.py"), "foundations/part_map.md", "--base", "none"], cwd=target, capture_output=True, text=True, encoding="utf-8")
    (reports / "package-fix-dashed-map-guard.log").write_text(result.stdout + result.stderr, encoding="utf-8")
    print("dashed-map-guard", result.returncode)
    print(result.stdout)
    assert result.returncode == 0
