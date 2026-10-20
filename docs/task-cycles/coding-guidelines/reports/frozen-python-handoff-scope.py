from pathlib import Path
path = Path('.runs/task-cycles/coding-guidelines/reports/frozen-python-live-handoff.md')
source = path.read_bytes().decode('utf-8')
old = 'Authorized change set: the five new-method files above; tests/quality/test_quality_support.py only if meaningful behavior regression coverage is required. Any additional necessary change returns concrete evidence to root.'
new = ('Authorized change set: the five new-method files above, meaningful failure-boundary '
       'regression coverage in tests/quality/test_quality_support.py, and the two stderr assertions '
       'in tests/quality/test_eslint_checks.py; seven files total. Root authorized the final file '
       'after concrete evidence that direct traceback reporting breaks the former JSON-only stderr '
       'assumption. JSONL record schema, final JSON diagnostic, unavailable result and exit codes '
       'remain exact. Any further necessary change returns concrete evidence to root.')
assert source.count(old) == 1
path.write_bytes(source.replace(old, new).encode('utf-8'))
