"""Prepare a sanitized cycle archive without mutating the working record."""
from pathlib import Path
import argparse
import json
import posixpath
import re
import shutil

parser=argparse.ArgumentParser()
parser.add_argument('--head',required=True)
parser.add_argument('--apply',action='store_true')
parser.add_argument('--resume',action='store_true')
args=parser.parse_args()
root=Path.cwd().resolve()
source=root/'.runs/task-cycles/coding-guidelines'
target=root/'docs/task-cycles/coding-guidelines'
assert root.as_posix()=='C:/Storage/repos/loop2/.runs/worktrees/coding-guidelines'
if target.exists():
    assert args.resume, 'Archive target already exists; explicit resume required'
    assert {p.relative_to(target).as_posix() for p in target.rglob('*') if p.is_file()} == {'amendment-npm12.md', 'cycle.md'}, 'Unexpected partial archive'
    assert not any(p.is_symlink() for p in target.rglob('*'))
excluded={'reports/s1-resume-foundation-selected.md','reports/pr-body-draft.md','reports/pr-body-final.md','reports/blocked-install-package.json','reports/blocked-install-package-lock.json'}
files=[]
for p in source.rglob('*'):
    if not p.is_file(): continue
    relative=p.relative_to(source).as_posix()
    if relative in excluded or '__pycache__' in p.parts or p.suffix=='.pyc': continue
    files.append((p,relative))
files.append((root/'.superpowers/sdd/plan/progress.md','reports/sdd-progress.md'))
by_relative={relative:p for p,relative in files}
files=[(p,relative) for relative,p in by_relative.items()]
credential=re.compile(rb'(?:ghp_[A-Za-z0-9]{20,}|github_pat_[A-Za-z0-9_]{20,}|sk-[A-Za-z0-9]{20,}|Bearer\s+[A-Za-z0-9._-]{20,})')
for p,_ in files:
    assert not p.is_symlink(), 'Unexpected symbolic link'
    assert not credential.search(p.read_bytes()), 'Credential pattern candidate in '+p.name
if args.apply:
    target.mkdir(parents=True, exist_ok=args.resume)
    for p,relative in files:
        output=target/relative
        output.parent.mkdir(parents=True,exist_ok=True)
        if p.suffix!='.md':
            shutil.copyfile(p,output)
            continue
        data=p.read_bytes()
        encoding='utf-16' if data.startswith((b'\xff\xfe', b'\xfe\xff')) else 'utf-8-sig'
        text=data.decode(encoding)
        def rewrite(match):
            label,href=match.group(1),match.group(2).strip('<>')
            norm=href.replace('\\','/')
            line=re.search(r':(\d+)$',norm)
            anchor='#L'+line.group(1) if line else ''
            if line: norm=norm[:line.start()]
            if not re.match(r'^[A-Za-z]+:',norm) and not norm.startswith('#'):
                for base in (p.parent,source,root):
                    try:
                        candidate=(base/norm).resolve()
                    except (OSError,ValueError):
                        continue
                    if candidate.is_file() and candidate.is_relative_to(root):
                        norm=candidate.as_posix()
                        break
            if norm.startswith(source.as_posix()+'/'):
                suffix=norm[len(source.as_posix())+1:]
                if suffix in excluded:
                    return label+' (transient reading snapshot; committed sources are named in the report)'
                href=posixpath.relpath(suffix,posixpath.dirname(relative) or '.')+anchor
            elif norm==root.as_posix()+'/.superpowers/sdd/plan/progress.md':
                href=posixpath.relpath('reports/sdd-progress.md',posixpath.dirname(relative) or '.')+anchor
            elif norm.startswith(root.as_posix()+'/.superpowers/'):
                return label+' (transient review material; use the assessed commit range in this report)'
            elif norm.startswith(root.as_posix()+'/.runs/'):
                return label+' (scratch input; see the authoritative guideline or recorded probe source in this report)'
            elif norm.startswith(root.as_posix()+'/'):
                suffix=norm[len(root.as_posix())+1:]
                href='https://github.com/mariusznazar/loop2/blob/'+args.head+'/'+suffix+anchor
            return '['+label+']('+href+')'
        text=re.sub(r'\[([^\]]+)\]\(([^\n]+?)\)',rewrite,text)
        with output.open('w',encoding='utf-8',newline='') as f: f.write(text)
    manifest=[(target/relative).relative_to(root).as_posix() for _,relative in files]
    (source/'reports/archive-paths.json').write_text(json.dumps(manifest,indent=2),encoding='utf-8')
print(json.dumps({'apply':args.apply,'files':len(files),'bytes':sum(p.stat().st_size for p,_ in files),'target':target.as_posix(),'excluded':sorted(excluded)}))
