"""Build the source-only package for the independent foundation assessment."""
from pathlib import Path
import json
import subprocess

root = Path.cwd().resolve()
base = 'c379207bfd8bd148d3589ea75604ba5165915d01'
head = subprocess.check_output(['git', 'rev-parse', 'HEAD'], text=True).strip()
paths = subprocess.check_output(['git', 'diff', '--name-only', base, head], text=True).splitlines()
allowed = [p for p in paths if p.startswith(('src/', 'scripts/', 'tests/', 'foundations/')) or p in {'.gitattributes', 'eslint.config.mjs', 'prettier.config.mjs', 'package.json', 'package-lock.json', 'requirements-quality.in', 'requirements-quality.txt'}]
folder = root / '.runs/foundation-assessment'
folder.mkdir(exist_ok=True)
(folder / 'input.diff').write_bytes(subprocess.check_output(['git', 'diff', '-U10', base, head, '--', *allowed]))
metadata = {'base': base, 'head': head, 'files': allowed, 'excluded_files': [p for p in paths if p not in allowed]}
(folder / 'range.json').write_text(json.dumps(metadata, indent=2) + '\n', encoding='utf-8')
report = root / '.runs/task-cycles/coding-guidelines/reports/foundation-assessment-range.json'
report.write_text(json.dumps(metadata, indent=2) + '\n', encoding='utf-8')
print(json.dumps({'base': base, 'head': head, 'files': len(allowed), 'diff_bytes': (folder / 'input.diff').stat().st_size}))
