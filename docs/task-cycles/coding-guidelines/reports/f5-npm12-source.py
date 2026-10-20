from pathlib import Path
import urllib.request
base = Path('.runs/task-cycles/coding-guidelines/reports')
urls = {
    'npm12-package': 'https://raw.githubusercontent.com/npm/cli/v12.2.1/package.json',
    'npm12-audit': 'https://raw.githubusercontent.com/npm/cli/v12.2.1/workspaces/arborist/lib/audit-report.js',
    'npm12-advisory': 'https://raw.githubusercontent.com/npm/metavuln-calculator/v10.0.0/lib/advisory.js',
    'npm12-registry-fetch': 'https://raw.githubusercontent.com/npm/npm-registry-fetch/v20.0.1/lib/index.js',
    'npm12-http-options': 'https://raw.githubusercontent.com/npm/make-fetch-happen/v16.0.1/lib/options.js',
    'npm12-http-fetch': 'https://raw.githubusercontent.com/npm/make-fetch-happen/v16.0.1/lib/fetch.js',
}
for name, url in urls.items():
    with urllib.request.urlopen(urllib.request.Request(url, headers={'User-Agent': 'dependency-audit-source-check'}), timeout=30) as response:
        data = response.read()
    (base / (name + '.txt')).write_bytes(data)
    print(name, len(data), url)
