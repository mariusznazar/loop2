"""Verify bounded source preservation, settlement fidelity, ownership and criticality."""
import importlib.util
import json
from pathlib import Path
import re
import subprocess
import sys

START = '52bd7f7f1608774113cdc3039a9e49b51e87bc97'
BASE = 'c379207bfd8bd148d3589ea75604ba5165915d01'
ALLOWED = {'foundations/decisions.md', 'foundations/part_map.md', 'guidelines/coding.md'}

def git(*args):
    result = subprocess.run(['git', *args], capture_output=True, check=True)
    if result.stderr and not result.stderr.startswith(b'warning: in the working copy'):
        raise AssertionError(result.stderr)
    return result.stdout.decode('utf-8')

def current(path):
    return Path(path).read_text(encoding='utf-8')

def historical(commit, path):
    return git('show', commit + ':' + path).replace('\r\n', '\n')

changed = set(git('diff', '--name-only', START).splitlines())
assert changed == ALLOWED, changed
print(json.dumps({'changed_paths': sorted(changed), 'all_other_tracked_sources_unchanged': True}))

def d28(text):
    return re.search(r'(?m)^### D-28/1 .*?\n\n(.*?)\n\n- \*\*Change:', text, re.S).group(1)

before = d28(historical(START, 'foundations/decisions.md'))
after = d28(current('foundations/decisions.md'))
old_second = ('The introduction of the adopted linters uses full compliance before merge instead of '
              'the transitional per-file no-regression invariant, and a repair exceeding the accepted '
              'scope returns to a decision rather than leaving a violation or weakening the rule set.')
new_second = ('For the adopted linters, full-compliance source invariants apply without a '
              'transitional per-file no-regression invariant.')
assert before.count(old_second) == 1
assert before.replace(old_second, new_second) == after
print(json.dumps({'d28_first_last_sentences_preserved': True, 'only_second_binding_sentence_replaced': True}))
sys.path.insert(0, str(Path('.the-way/relation-model').resolve()))
from fingerprint import fingerprint
assert fingerprint(before) == '719c9a67'
assert fingerprint(after) == '550e88d6'
references = []
for folder in ('foundations', 'guidelines'):
    for path in Path(folder).glob('*.md'):
        for line, value in enumerate(current(path).splitlines(), 1):
            if 'D-28@' in value:
                assert 'D-28@550e88d6' in value
                references.append([path.as_posix(), line])
assert references == [['guidelines/coding.md', 10]]
print(json.dumps({'d28_old_fingerprint': fingerprint(before), 'd28_new_fingerprint': fingerprint(after),
                  'all_dependent_references': references}))

cases = 0
for path in sorted(Path('guidelines').glob('*.md')):
    pattern = r'^```(?:good|bad) [^\n]*\n.*?^```[ \t]*$'
    old_cases = re.findall(pattern, historical(START, path.as_posix()), re.M | re.S)
    new_cases = re.findall(pattern, current(path), re.M | re.S)
    assert old_cases == new_cases, path
    cases += len(new_cases)
assert cases == 26
print(json.dumps({'guideline_case_blocks_preserved': cases, 'executable_methods_invariants_configs_tests_unchanged': True}))

plan = current('.runs/task-cycles/coding-guidelines/plan.md')
assert 'every adopted blocking violation is removed before PR16 merges' in plan
assert 'If a repair exceeds the accepted task scope, return to a decision' in plan
assert 'rather than weakening the rule set or leaving a violation' in plan
rows = re.findall(r'^\| Settlement ([0-9]+) \|', plan, re.M)
assert rows == [str(number) for number in range(1, 23)]
assert 'The introduction of the adopted linters' not in after
assert 'a repair exceeding the accepted scope' not in after
assert 'Naprawa przekraczaj' not in current('guidelines/coding.md')
assert 'pełnej zgodności kodu, bez przejściowej kontroli' in current('guidelines/coding.md')
print(json.dumps({'settlement_rows_preserved': len(rows), 'execution_only_obligations_retained_in_plan': True}))

spec = importlib.util.spec_from_file_location('settlement_map_guard', '.the-way/elements/part-map/format_guard.py')
guard = importlib.util.module_from_spec(spec)
sys.modules[spec.name] = guard
spec.loader.exec_module(guard)
rules = guard.read_rules()
maps = {
    'base': historical(BASE, 'foundations/part_map.md'),
    'start': historical(START, 'foundations/part_map.md'),
    'settled': current('foundations/part_map.md'),
}
parsed = {label: guard.parse_map(text, rules) for label, text in maps.items()}
computed = {label: guard.criticality(*value) for label, value in parsed.items()}
assert computed['base'] == computed['start'] == computed['settled']
old_entries = {entry.identifier: entry for entry in parsed['start'][0]}
new_entries = {entry.identifier: entry for entry in parsed['settled'][0]}
assert old_entries.keys() == new_entries.keys()
for identifier, entry in old_entries.items():
    other = new_entries[identifier]
    assert entry.binding == other.binding
    for name in entry.fields:
        if identifier == 'build-tools' and name == 'Depends on':
            assert other.fields[name][0] == entry.fields[name][0] + ' · product-foundation'
        else:
            assert entry.fields[name][0] == other.fields[name][0]
tracked = git('ls-files', '-z').rstrip('\0').split('\0')
claims = {}
for label in ('start', 'settled'):
    report = guard.Report('foundations/part_map.md')
    answer = guard.check_files(*parsed[label], report, str(Path.cwd()), tracked)
    assert not report.errors, report.errors
    claims[label] = {path: [entry.identifier for entry in owners] for path, owners in answer.items()}
assert claims['start'] == claims['settled']
print(json.dumps({'computed_criticality': computed, 'criticality_delta': {},
                  'ownership_preserved_for_tracked_paths': len(claims['settled']),
                  'all_part_bindings_other_fields_preserved': True}, sort_keys=True))
