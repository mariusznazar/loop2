from pathlib import Path
import json
root = Path('.')
for name in ('package.json', 'package-lock.json', 'node_modules/npm/package.json', 'node_modules/npm/node_modules/semver/package.json'):
    value = json.loads((root / name).read_text(encoding='utf-8'))
    record = {'file': name, 'version': value.get('version')}
    if name == 'package.json':
        record['declared_npm'] = value.get('devDependencies', {}).get('npm')
    if name == 'package-lock.json':
        record.update(lockfile_version=value.get('lockfileVersion'), locked_npm=value['packages']['node_modules/npm']['version'], package_entries=len(value['packages']))
    print(json.dumps(record))
