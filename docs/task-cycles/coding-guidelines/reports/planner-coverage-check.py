from pathlib import Path
import json,re,subprocess
root=Path('.')
plan=(root/'.runs/task-cycles/coding-guidelines/plan.md').read_text(encoding='utf-8')
tracked=subprocess.check_output(['git','ls-files','-z']).decode('utf-8').split('\0')
covered=sorted(p for p in tracked if (p.startswith(('src/','tests/','scripts/')) and p.endswith(('.ts','.js','.mjs','.cjs','.mts','.cts'))) or [])
covered+=['src/browser/index.html']
changes=[]
for line in plan.splitlines():
    if line.startswith('- **Change:**'):
        changes+=re.findall(r'`([^`]+)`',line)
missing=sorted(set(covered)-set(changes))
rows={int(x) for x in re.findall(r'\| Settlement row (\d+) \|',plan)}
todo={int(x) for x in re.findall(r'\| To do (\d+) \|',plan)}
result={'original_format_targets':len(covered),'paths':covered,'missing_format_targets':missing,'settlement_coverage':sorted(rows),'todo_coverage':sorted(todo),'all_scoped':not missing and rows==set(range(1,23)) and todo==set(range(1,11))}
print(json.dumps(result,indent=2))
raise SystemExit(0 if result['all_scoped'] and len(covered)==45 else 1)
