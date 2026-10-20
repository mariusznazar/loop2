"""Capture formatter coverage without modifying product check methods."""
import json
from pathlib import Path
import subprocess
import sys

root = Path.cwd()
sys.path.insert(0, str(root / 'scripts'))
from check_format import PARTS, SCRIPT_SUFFIXES
from quality_support import discover_files

current = discover_files(root, PARTS)
browser = set(discover_files(root, ('browser-view', 'simulation')))
covered = {p for p in current if Path(p).suffix.lower() in SCRIPT_SUFFIXES
           or p in browser and Path(p).suffix.lower() in {'.html', '.css'}}
original = set(subprocess.check_output(
    ['git', 'ls-tree', '-r', '--name-only', 'c379207bfd8bd148d3589ea75604ba5165915d01'],
    text=True).splitlines())
original_covered = {p for p in original if (
    p.startswith(('src/', 'scripts/', 'tests/')) and Path(p).suffix.lower() in SCRIPT_SUFFIXES
    or p.startswith('src/browser/') and Path(p).suffix.lower() in {'.html', '.css'})}
assert len(original_covered) == 45
assert original_covered <= covered
assert 'tests/view/icons.test.mjs' in covered
assert (root / 'tests/view/icons.test.mjs').read_text(encoding='utf-8').startswith('// Icon files')
print(json.dumps({'original_count': len(original_covered), 'current_count': len(covered),
                  'new_covered': sorted(covered-original_covered),
                  'original_covered': sorted(original_covered)}, indent=2))
