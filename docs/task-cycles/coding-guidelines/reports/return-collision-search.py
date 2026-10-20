"""Search the complete current foundation; retain identifiers, not source copies."""
from pathlib import Path
import json
import re

groups = {
    'tools-and-suppressions': r'eslint|ruff|shellcheck|prettier|linter|formatter|suppress|noqa|inline directive',
    'versions-and-audit': r'npm|package|lockfile|advisory|vulnerab|TypeScript|compiler|Python',
    'examples-and-guidelines': r'exemplar|guideline|content-data|browser-module|simulation-module|http-application',
    'observations-and-cleanup': r'process|cleanup|cleaning|log|initializ|observation|failure|socket',
    'boundaries-and-world': r'trust|registry|Index|external|catalogue|catalog|focus|factory|seed|time',
}
for path in sorted(Path('foundations').glob('*.md')):
    text = path.read_text(encoding='utf-8')
    sections = re.split(r'(?m)(?=^#{2,3} )', text)
    print(json.dumps({'file': path.as_posix(), 'characters_searched': len(text)}))
    for name, pattern in groups.items():
        headings = [part.splitlines()[0] for part in sections if re.search(pattern, part, re.I)]
        print(json.dumps({'file': path.as_posix(), 'group': name, 'headings': headings}, ensure_ascii=True))
