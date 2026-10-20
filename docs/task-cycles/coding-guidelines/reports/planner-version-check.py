import json, urllib.request
from pathlib import Path
items = [('eslint','10.12.0'),('@eslint/js','10.0.1'),('typescript-eslint','8.71.2'),('globals','17.13.0'),('@typescript/typescript6','6.0.2'),('typescript','7.0.2'),('prettier','3.9.10'),('npm','11.13.0')]
results = []
for name, version in items:
    url = 'https://registry.npmjs.org/' + name.replace('/', '%2f') + '/' + version
    try:
        request = urllib.request.Request(url, headers={'User-Agent':'loop2-toolchain-check','Accept':'application/json'})
        with urllib.request.urlopen(request, timeout=30) as response:
            data = json.load(response)
        results.append({'url':url,'status':200,'name':data['name'],'version':data['version'],'engines':data.get('engines'), 'peerDependencies':data.get('peerDependencies'), 'integrity_present':bool(data.get('dist',{}).get('integrity'))})
    except Exception as error:
        results.append({'url':url,'error':str(error)})
for url in ['https://pypi.org/pypi/ruff/0.17.1/json','https://api.github.com/repos/koalaman/shellcheck/releases/tags/v0.11.0']:
    try:
        request = urllib.request.Request(url, headers={'User-Agent':'loop2-toolchain-check','Accept':'application/json'})
        with urllib.request.urlopen(request, timeout=30) as response:
            data = json.load(response)
        results.append({'url':url,'status':200,'version':data.get('info',{}).get('version',data.get('tag_name')), 'artifacts':[item.get('filename',item.get('name')) for item in data.get('urls',data.get('assets',[]))]})
    except Exception as error:
        results.append({'url':url,'error':str(error)})
output = Path('.runs/task-cycles/coding-guidelines/reports/planner-versions.json')
output.write_text(json.dumps(results,indent=2),encoding='utf-8')
print('items=' + str(len(results)))
print('failures=' + str(sum('error' in item for item in results)))
