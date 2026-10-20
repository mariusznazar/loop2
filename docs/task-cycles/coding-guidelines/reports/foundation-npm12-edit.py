"""Apply only the human-approved npm pin amendment to the branch foundation."""
import importlib.util
import json
from pathlib import Path
import re
import subprocess

root = Path.cwd()
reports = Path(__file__).parent
start = 'b9d99e12eeb5b68f2374d2431457e2a8d886ac7d'
base = 'c379207bfd8bd148d3589ea75604ba5165915d01'
assert subprocess.check_output(['git','rev-parse','HEAD']).decode().strip() == start
assert not subprocess.check_output(['git','status','--porcelain']).strip()
base_log = subprocess.check_output(['git','show',base+':foundations/decisions.md']).decode('utf-8')
assert '### D-33/' not in base_log
spec = importlib.util.spec_from_file_location('npm12_fingerprint',root/'.the-way/relation-model/fingerprint.py')
module = importlib.util.module_from_spec(spec)
spec.loader.exec_module(module)

def read(path):
    with path.open(encoding='utf-8',newline='') as stream:
        return stream.read()

def write(path,text):
    with path.open('w',encoding='utf-8',newline='') as stream:
        stream.write(text)

log_path = root/'foundations/decisions.md'
log = read(log_path)
entry = re.search(r'(?ms)^### D-33/1 .*?(?=^### |\Z)',log).group()
assert entry.count('npm 11.13.0') == 1
assert '- **Approved by:** Mariusz, merge of https://github.com/mariusznazar/loop2/pull/16' in entry
revised_entry = entry.replace('npm 11.13.0','npm 12.2.1',1)
old_sentence = entry.splitlines()[2]
new_sentence = revised_entry.splitlines()[2]
old_fingerprint = module.fingerprint(old_sentence)
new_fingerprint = module.fingerprint(new_sentence)
assert old_fingerprint == 'fce481a6'
assert revised_entry.replace('npm 12.2.1','npm 11.13.0',1) == entry
assert 'low, moderate, high or critical' in new_sentence
new_log = log.replace(entry,revised_entry,1)
assert new_log.replace('npm 12.2.1','npm 11.13.0',1) == log

inv_path = root/'foundations/invariants.md'
invariants = read(inv_path)
invariant = re.search(r'(?ms)^## introduced-npm-vulnerabilities/1.*?(?=^## |\Z)',invariants).group()
link = 'D-33@'+old_fingerprint
assert invariant.count(link) == 1 and invariants.count(link) == 1
new_invariants = invariants.replace(link,'D-33@'+new_fingerprint,1)
assert new_invariants.replace('D-33@'+new_fingerprint,link,1) == invariants
write(log_path,new_log)
write(inv_path,new_invariants)
result = {
    'start':start,'base':base,'old_decision_fingerprint':old_fingerprint,
    'new_decision_fingerprint':new_fingerprint,'invariant_sentence_fingerprint':module.fingerprint(invariant.splitlines()[2]),
    'decision_version':'D-33/1','invariant_version':'introduced-npm-vulnerabilities/1',
    'versioning':'Both entries are absent at the original fork/main. The branch-only decision remains its new /1 entry; invariant wording and /1 are unchanged. Only its deriving fingerprint moves.',
    'approved_amendment':'Mariusz: tak, zmieńmy na 12.2.1; only npm pin changes; low+ and all other policy retained',
    'checks':['exactly one token substitution in D-33 binding text','all other decision fields/entries unchanged byte-for-byte','one dependent link substitution in invariants; sentence, method, parts, correction and every other entry unchanged byte-for-byte','request approval URL preserved','original main has no D-33 entry'],
}
(reports/'foundation-npm12-edit.json').write_text(json.dumps(result,ensure_ascii=False,indent=2),encoding='utf-8')
print(json.dumps({'old':old_fingerprint,'new':new_fingerprint,'changed_files':2}))
