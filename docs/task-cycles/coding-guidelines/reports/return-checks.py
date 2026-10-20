"""Capture safe return-step guards and source-completeness evidence."""
import json
from pathlib import Path
import subprocess
import sys

root = Path.cwd()
reports = root / '.runs/task-cycles/coding-guidelines/reports'
base = 'c379207bfd8bd148d3589ea75604ba5165915d01'
commands = []
for element, filename in [('decisions', 'decisions.md'), ('invariants', 'invariants.md'),
                          ('environment-facts', 'environment_facts.md'), ('part-map', 'part_map.md')]:
    command = [sys.executable, '-B', f'.the-way/elements/{element}/format_guard.py',
               f'foundations/{filename}', '--base', base]
    if element != 'part-map':
        command += ['--merge-onto', base]
    commands.append((element, command))
commands += [('guidelines-form', [sys.executable, '-B', '.the-way/product-guidelines/form_check.py']),
             ('guidelines-reference', [sys.executable, '-B', '.the-way/product-guidelines/form_check.py',
                                       '--merge-onto', base]),
             ('diff-check', ['git', 'diff', '--check', base, 'HEAD'])]
results = []
for label, command in commands:
    output = reports / f'return-{label}.log'
    with output.open('wb') as stream:
        result = subprocess.run(command, stdout=stream, stderr=subprocess.STDOUT)
    item = {'command': command, 'cwd': str(root), 'exit_code': result.returncode,
            'output': str(output)}
    output.with_suffix('.log.json').write_text(json.dumps(item, indent=2), encoding='utf-8')
    results.append(item)
    print(json.dumps(item))
(reports / 'return-check-results.json').write_text(json.dumps(results, indent=2), encoding='utf-8')
sys.exit(int(any(item['exit_code'] for item in results)))
