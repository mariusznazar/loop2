"""Test a potential pin revision only in an ignored isolated installation."""
import json
import os
from pathlib import Path
import subprocess
import sys
import time

root = Path.cwd().resolve()
probe = root / '.runs/npm-candidate-12.2.1'
assert probe.resolve().is_relative_to(root / '.runs')
probe.mkdir(exist_ok=True)
manifest = json.loads((root / 'package.json').read_text(encoding='utf-8'))
manifest['devDependencies']['npm'] = '12.2.1'
(probe / 'package.json').write_text(json.dumps(manifest, indent=2) + '\n', encoding='utf-8')
for name in ['user.npmrc', 'global.npmrc']:
    (probe / name).write_text('', encoding='utf-8')
reports = root / '.runs/task-cycles/coding-guidelines/reports'
environment = {key: value for key, value in os.environ.items() if not key.upper().startswith(('NPM_', 'NODE_'))}
cli = root / 'node_modules/npm/bin/npm-cli.js'
common = ['--registry=https://registry.npmjs.org', '--userconfig=' + str(probe / 'user.npmrc'), '--globalconfig=' + str(probe / 'global.npmrc')]
commands = [
    ('candidate-install', ['node', str(cli), 'install', '--ignore-scripts', '--no-audit', '--no-fund', *common]),
    ('candidate-version', ['node', str(probe / 'node_modules/npm/bin/npm-cli.js'), '--version']),
    ('candidate-audit', ['node', str(probe / 'node_modules/npm/bin/npm-cli.js'), 'audit', '--json', *common]),
]
for label, command in commands:
    destination = reports / (label + '.txt')
    started = time.monotonic()
    with destination.open('wb') as output:
        result = subprocess.run(command, cwd=probe, env=environment, stdout=output, stderr=subprocess.STDOUT)
    metadata = {'command': command, 'cwd': str(probe), 'exit_code': result.returncode, 'seconds': round(time.monotonic() - started, 2), 'output': str(destination)}
    destination.with_suffix('.txt.json').write_text(json.dumps(metadata, indent=2), encoding='utf-8')
    print(json.dumps(metadata), flush=True)
    if label == 'candidate-install' and result.returncode:
        sys.exit(result.returncode)
