"""Independent source and preservation audit; not a product invariant check."""
import hashlib
import json
from pathlib import Path
import re
import subprocess
import urllib.request

root = Path.cwd()
reports = Path(__file__).parent
base = 'c379207bfd8bd148d3589ea75604ba5165915d01'
entries = json.loads((reports/'foundation-entries.json').read_text(encoding='utf-8'))
evidence = json.loads((reports/'foundation-source-evidence.json').read_text(encoding='utf-8'))
source_by_url = {item['url']:(reports/('foundation-source-'+item['name'])).read_text(encoding='utf-8') for item in evidence}
result = {'base':base, 'actor':'foundation_author', 'checks':[], 'input_sha256':{}}

def check(description, condition):
    assert condition, description
    result['checks'].append(description)

def flat(text):
    return ' '.join(text.split())

for path in ['.runs/task-cycles/coding-guidelines/task.md','.runs/task-cycles/coding-guidelines/plan.md']:
    result['input_sha256'][path]=hashlib.sha256(Path(path).read_bytes()).hexdigest()

for name in ['decisions.md','environment_facts.md','invariants.md']:
    old = subprocess.check_output(['git','show',base+':foundations/'+name]).decode('utf-8')
    new = (root/'foundations'/name).read_text(encoding='utf-8')
    check('all existing '+name+' bytes preserved modulo repository LF normalization',all(part in new for part in re.split(r'(?=^#{2,3} )',old,flags=re.M) if part.strip()))

for entry in entries['facts']:
    matches = re.findall(r'(https://\S+) § ([^—]+) — “(.*?)”; read (\d{4}-\d{2}-\d{2})',entry['source'])
    check(entry['id']+' has parsed direct publisher citations',len(matches)>0)
    for url,place,passage,date in matches:
        check(entry['id']+' passage at '+place.strip()+' reproduced word for word after whitespace collapse', flat(passage) in flat(source_by_url[url]))

facts_text = (root/'foundations/environment_facts.md').read_text(encoding='utf-8')
js_source = (reports/'foundation-source-eslint-recommended.js').read_text(encoding='utf-8')
js_rules = re.findall(r'"([^"\n]+)": "error"',js_source)
js_sentence = re.search(r'^## eslint-recommended-rules/1\n\n(.*)',facts_text,re.M).group(1)
check('JS membership equals complete publisher rule list, not only its count',set(re.findall(r'`([^`]+)`',js_sentence)) - {'recommended','error'} == set(js_rules))
ts_sentence = re.search(r'^## typescript-eslint-typechecked-rules/1\n\n(.*)',facts_text,re.M).group(1)
ts_enabled,ts_disabled=ts_sentence.split('enabling ',1)[1].split(' at `error` with no configured options and disabling ')
ts_rules = dict.fromkeys(js_rules,'error')
for filename in ['foundation-source-ts-eslint-raw.ts','foundation-source-ts-recommended.ts']:
    ts_rules.update(dict(re.findall(r"'([^']+)': '(off|error)'",(reports/filename).read_text(encoding='utf-8'))))
check('TS membership resolves to exactly 92 active rules after all overrides',sum(level=='error' for level in ts_rules.values())==92)
check('TS compatibility positive control: no-undef off and assertion check error',ts_rules['no-undef']=='off' and ts_rules['@typescript-eslint/no-unnecessary-type-assertion']=='error')
check('TS sentence includes every non-core enabled rule and every disabled rule',set(re.findall(r'`([^`]+)`',ts_enabled))=={rule for rule,level in ts_rules.items() if level=='error' and rule not in js_rules} and set(re.findall(r'`([^`]+)`',ts_disabled))=={rule for rule,level in ts_rules.items() if level=='off'})
ruff_source=(reports/'foundation-source-ruff-settings.rs').read_text(encoding='utf-8')
ruff_codes=re.findall(r'// ([A-Z]+\d+)',ruff_source.split('pub const DEFAULT_SELECTORS:',1)[1].split('\n];',1)[0])
ruff_sentence=re.search(r'^## ruff-default-rules/1\n\n(.*)',facts_text,re.M).group(1)
check('Ruff sentence exact set equality with individually named source defaults',set(re.findall(r'`([^`]+)`',ruff_sentence))==set(ruff_codes) and len(ruff_codes)==407)
check('Ruff adopted 14 exclusions are members and leave 393 distinct rules',set(entries['ruff_excluded']) <= set(ruff_codes) and len(set(ruff_codes)-set(entries['ruff_excluded']))==393)

template=(root/'.the-way/product-guidelines/template.md').read_text(encoding='utf-8')
inv_text=(root/'foundations/invariants.md').read_text(encoding='utf-8')
for identifier in ['guidelines-form','guidelines-reference-current']:
    sentence=re.search(r'^## '+identifier+r'/1\n\n(.*)',template,re.M).group(1)
    check(identifier+' sentence copied byte-for-byte from pinned template',sentence==re.search(r'^## '+identifier+r'/1\n\n(.*)',inv_text,re.M).group(1))

old_log=subprocess.check_output(['git','show',base+':foundations/decisions.md']).decode('utf-8')
latest={}
for match in re.finditer(r'^### (D-\d+)/(\d+) — .*?\n(.*?)(?=^### |\Z)',old_log,re.S|re.M):
    identifier,version,body=match.groups()
    scope=re.search(r'^- \*\*Scope:\*\* (.*(?:\n  [^\n]+)*)',body,re.M).group(1)
    latest[identifier]={'version':int(version),'scope':flat(scope),'line':old_log[:match.start()].count('\n')+1}
parts={'browser-view','simulation','account-server','build-tools','deployment','agent-workflow','product-foundation'}
expected=sorted(identifier for identifier,entry in latest.items() if set(re.split(r'\s*,\s*',entry['scope'])) & parts)
check('whole-current-Scope selection is all D-01 through D-27',expected==['D-'+str(n).zfill(2) for n in range(1,28)])
result['scope_selection']=latest
result['expected_scope_matches']=expected
result['row_mapping']={str(row): entries['decisions'][row-1]['id'] for row in range(1,11)}
result['row_mapping'].update({str(row): entries['facts'][row-11]['id'] for row in range(11,15)})
result['row_mapping'].update({str(row): entries['invariants'][row-15]['id'] for row in range(15,23)})
check('all 22 accepted rows map once to distinct entries',len(result['row_mapping'])==22 and len(set(result['row_mapping'].values()))==22)
check('product write set is exactly authorized foundation files',set(subprocess.check_output(['git','diff','--name-only',base]).decode().splitlines())=={'foundations/decisions.md','foundations/environment_facts.md','foundations/invariants.md','foundations/part_map.md'})
result['release_existence']=[]
for url in ['https://registry.npmjs.org/@eslint%2fjs/10.0.1','https://registry.npmjs.org/typescript-eslint/8.71.2','https://pypi.org/pypi/ruff/0.17.1/json','https://api.github.com/repos/koalaman/shellcheck/releases/tags/v0.11.0']:
    with urllib.request.urlopen(url,timeout=30) as response:
        data=json.load(response)
        status=response.status
    version=data.get('version') or data.get('info',{}).get('version') or data.get('tag_name')
    result['release_existence'].append({'url':url,'status':status,'version':version})
(reports/'foundation-verification.json').write_text(json.dumps(result,ensure_ascii=False,indent=2),encoding='utf-8')
print(str(len(result['checks']))+' source/preservation assertions passed; four release endpoints read')
