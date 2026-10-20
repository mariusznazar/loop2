"""Run the controller's full gate and preserve every actual result."""
import argparse
import json
from pathlib import Path
import subprocess
import sys
import time

parser=argparse.ArgumentParser()
parser.add_argument('--merge-onto', required=True)
parser.add_argument('--prefix', default='final')
args=parser.parse_args()
root=Path.cwd().resolve()
reports=root/'.runs/task-cycles/coding-guidelines/reports'
base='c379207bfd8bd148d3589ea75604ba5165915d01'
commands=[]
for folder in ['invariants','deploy','agent_workflow','quality']:
    commands.append(('final-'+folder,[sys.executable,'-B','.the-way/gate/run_tests.py','tests/'+folder,'--record','.runs/final-'+folder+'.jsonl']))
for script in ['typecheck','build','test']:
    command=['npm.cmd','test'] if script=='test' else ['npm.cmd','run',script]
    commands.append(('final-npm-'+script,command))
for label, script, extra in [
    ('eslint','check_eslint.py',[]),
    ('eslint-configuration','check_eslint.py',['--configuration']),
    ('ruff','check_ruff.py',[]),
    ('shellcheck','check_shellcheck.py',[]),
    ('format','check_format.py',[]),
    ('dependency-audit','check_dependencies.py',['--fork-point',base]),
]:
    commands.append(('final-'+label,[sys.executable,'-B','scripts/'+script,*extra,'--record','.runs/final-'+label+'.jsonl']))
for element,filename in [('decisions','decisions.md'),('invariants','invariants.md'),('environment-facts','environment_facts.md'),('part-map','part_map.md')]:
    command=[sys.executable,'-B','.the-way/elements/'+element+'/format_guard.py','foundations/'+filename,'--base',base]
    if element!='part-map':
        command+=['--merge-onto',args.merge_onto]
    commands.append(('final-guard-'+element,[*command,'--record','.runs/final-guard-'+element+'.jsonl']))
commands.extend([
    ('final-guidelines-form',[sys.executable,'-B','.the-way/product-guidelines/form_check.py','--record','.runs/final-guidelines-form.jsonl']),
    ('final-guidelines-reference',[sys.executable,'-B','.the-way/product-guidelines/form_check.py','--merge-onto',args.merge_onto,'--record','.runs/final-guidelines-reference.jsonl']),
    ('final-instructions',[sys.executable,'-B','.the-way/instruction-files/check_instructions.py']),
    ('final-diff-check',['git','diff','--check',base,'HEAD']),
])
results=[]
for label,command in commands:
    label=label.replace('final-', args.prefix+'-', 1)
    command=[value.replace('.runs/final-', '.runs/'+args.prefix+'-') for value in command]
    output=reports/(label+'.txt')
    started=time.monotonic()
    with output.open('wb') as stream:
        run=subprocess.run(command,cwd=root,stdout=stream,stderr=subprocess.STDOUT)
    metadata={'command':command,'exit_code':run.returncode,'seconds':round(time.monotonic()-started,2),'output':output.as_posix()}
    output.with_suffix('.txt.json').write_text(json.dumps(metadata,indent=2),encoding='utf-8')
    results.append({'label':label,**metadata})
    (reports/(args.prefix+'-gate-results.json')).write_text(json.dumps(results,indent=2),encoding='utf-8')
    print(json.dumps({'label':label,'exit_code':run.returncode,'seconds':metadata['seconds']}),flush=True)
sys.exit(1 if any(item['exit_code'] for item in results) else 0)
