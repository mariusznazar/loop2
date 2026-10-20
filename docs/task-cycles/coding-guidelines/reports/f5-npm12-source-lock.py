import json
from pathlib import Path
import urllib.request
base = Path('.runs/task-cycles/coding-guidelines/reports')
url = 'https://raw.githubusercontent.com/npm/cli/v12.2.1/package-lock.json'
with urllib.request.urlopen(urllib.request.Request(url, headers={'User-Agent': 'dependency-audit-source-check'}), timeout=30) as response:
    data = response.read()
(base / 'npm12-lock.txt').write_bytes(data)
packages = json.loads(data)['packages']
for path in ('node_modules/semver', 'node_modules/make-fetch-happen', 'node_modules/npm-registry-fetch', 'node_modules/@npmcli/metavuln-calculator'):
    print(json.dumps({'path': path, 'version': packages.get(path, {}).get('version'), 'resolved': packages.get(path, {}).get('resolved')}))
